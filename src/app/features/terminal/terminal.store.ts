import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';
import { ProfileStore } from '../../core/state/profile.store';
import { ThemeStore } from '../../core/state/theme.store';
import {
  type CommandContext,
  type CompletionItem,
  type TermEntry,
} from '../../models/terminal.model';
import { parseCommand } from './command-parser';
import { findCommand, VISIBLE_COMMANDS } from './command-registry';

const HISTORY_KEY = 'portfolio:terminal-history';
const MAX_HISTORY = 100;

/**
 * Session state for one terminal screen. Provided by the `Terminal` component,
 * so it is created fresh on every visit and discarded on leave.
 */
@Service({ autoProvided: false })
export class TerminalStore {
  private readonly router = inject(Router);
  private readonly theme = inject(ThemeStore);
  private readonly profile = inject(ProfileStore).data;
  private readonly document = inject(DOCUMENT);
  private readonly storage = inject(StorageService);

  private nextId = 0;

  /** Commands listed by `help` and offered by Tab completion. */
  readonly commands = VISIBLE_COMMANDS;

  /** Executed lines, oldest first. Plain data only. */
  /** Starts with the welcome banner (empty `input` = not echoed as a typed command). */
  readonly entries = signal<TermEntry[]>([{ ...this.createEntry('welcome'), input: '' }]);
  /**
   * Submitted inputs, newest first, persisted in localStorage (last 100).
   * Kept separately from `entries` so `clear` doesn't wipe ↑ recall; `history -c` does.
   */
  readonly history = signal<string[]>(this.loadHistory());
  /** Current text in the prompt. */
  readonly input = signal('');
  /** fish-style completion menu shown when Tab finds several matches. */
  readonly hints = signal<CompletionItem[]>([]);
  /** Option highlighted by repeated Tab / Shift+Tab (-1 = none yet). */
  readonly hintIndex = signal(-1);
  /** Text before the word being completed, and the line as it was when the menu opened. */
  private hintBase = '';
  private hintOriginal = '';
  /** Position while browsing history with ↑/↓ (-1 = editing a fresh line). */
  private readonly pointer = signal(-1);

  /**
   * Faded inline suggestion (rest of the line) shown after the cursor:
   * most recent matching history line first, otherwise a single unambiguous completion.
   */
  readonly suggestion = computed(() => {
    const value = this.input();
    // zsh-style: only while typing freely, not while the Tab menu is open
    if (!value.trim() || this.hints().length) return '';
    const fromHistory = this.history().find((h) => h.length > value.length && h.startsWith(value));
    if (fromHistory) return fromHistory.slice(value.length);
    const { partial, matches } = this.completionsFor(value);
    return matches.length === 1 ? (matches[0]?.value ?? '').slice(partial.length) : '';
  });

  constructor() {
    effect(() => this.storage.set(HISTORY_KEY, this.history()));
  }

  submit(raw = this.input()): void {
    const line = raw.trim();
    this.input.set('');
    this.closeHints();
    this.pointer.set(-1);
    if (line && line !== this.history()[0]) {
      this.history.update((h) => [line, ...h].slice(0, MAX_HISTORY));
    }

    const entry = this.createEntry(line);
    const command = findCommand(entry.name);
    if (entry.name && !command) {
      entry.error = `command not found: ${entry.name} — type 'help' to see available commands`;
    } else if (command?.run) {
      const message = command.run(this.context(entry.args));
      if (message) entry.error = message;
    } else if (command && !command.usage && entry.args.length > 0) {
      // Commands without a `usage` take no arguments.
      entry.error = `usage: ${command.name}`;
    }

    // `clear` empties the screen and is not echoed itself.
    if (entry.name === 'clear' && !entry.error) return;
    this.entries.update((list) => [...list, entry]);
  }

  /** Ctrl+C: abandon the current line (echoed with `^C`). */
  cancel(): void {
    this.entries.update((list) => [
      ...list,
      { id: this.nextId++, input: `${this.input()}^C`, name: '', args: [] },
    ]);
    this.input.set('');
    this.closeHints();
    this.pointer.set(-1);
  }

  clear(): void {
    this.entries.set([]);
    this.closeHints();
  }

  /** ↑: step back through history into the prompt. */
  prev(): void {
    const next = this.pointer() + 1;
    const value = this.history()[next];
    if (value === undefined) return;
    this.pointer.set(next);
    this.input.set(value);
  }

  /** ↓: step forward; past the newest entry returns to an empty prompt. */
  next(): void {
    const next = this.pointer() - 1;
    if (next < -1) return;
    this.pointer.set(next);
    this.input.set(next === -1 ? '' : (this.history()[next] ?? ''));
  }

  /**
   * Tab (fish-style): one match → complete it; several → fill the common prefix and open the menu;
   * Tab again / Shift+Tab (`reverse`) → cycle through the options, previewing each in the prompt.
   */
  complete(reverse = false): void {
    const open = this.hints();
    if (open.length) {
      const last = open.length - 1;
      const i = this.hintIndex();
      const next = reverse ? (i <= 0 ? last : i - 1) : i >= last ? 0 : i + 1;
      this.hintIndex.set(next);
      this.input.set(this.hintBase + (open[next]?.value ?? ''));
      return;
    }

    const value = this.input();
    if (!value.trim()) return;
    const { partial, matches } = this.completionsFor(value);
    if (matches.length === 0) return;

    const base = value.slice(0, value.length - partial.length);
    if (matches.length === 1) {
      this.input.set(`${base}${matches[0]?.value} `);
      return;
    }
    const prefix = commonPrefix(matches.map((m) => m.value));
    this.hintBase = base;
    this.hintOriginal = base + (prefix.length > partial.length ? prefix : partial);
    this.input.set(this.hintOriginal);
    this.hints.set(matches);
    this.hintIndex.set(-1);
  }

  /** Enter while an option is highlighted: take it (without running the command). */
  acceptHint(): boolean {
    const hint = this.hints()[this.hintIndex()];
    if (!hint) return false;
    this.input.set(`${this.hintBase}${hint.value} `);
    this.closeHints();
    return true;
  }

  /** Esc: close the menu and restore the text from before cycling. */
  dismissHints(): void {
    if (this.hintIndex() >= 0) this.input.set(this.hintOriginal);
    this.closeHints();
  }

  closeHints(): void {
    this.hints.set([]);
    this.hintIndex.set(-1);
  }

  /** → / End / tap: take the inline suggestion. */
  acceptSuggestion(): boolean {
    const rest = this.suggestion();
    if (!rest) return false;
    this.input.update((value) => value + rest);
    this.closeHints();
    return true;
  }

  /** Candidates for the word being typed (command name or argument). */
  private completionsFor(value: string): { partial: string; matches: CompletionItem[] } {
    const endsWithSpace = /\s$/.test(value);
    const { name, args } = parseCommand(value);
    const typingName = args.length === 0 && !endsWithSpace;
    const partial = typingName ? name : endsWithSpace ? '' : (args.at(-1) ?? '');

    const candidates: CompletionItem[] = typingName
      ? this.commands.map((c) => ({ value: c.name, description: c.description }))
      : (
          findCommand(name)?.complete?.(endsWithSpace ? [...args, ''] : args, this.profile()) ?? []
        ).map((c) => (typeof c === 'string' ? { value: c } : c));
    const lower = partial.toLowerCase();
    return { partial, matches: candidates.filter((c) => c.value.startsWith(lower)) };
  }

  private loadHistory(): string[] {
    const stored = this.storage.get<unknown>(HISTORY_KEY);
    return Array.isArray(stored)
      ? stored.filter((line): line is string => typeof line === 'string').slice(0, MAX_HISTORY)
      : [];
  }

  private createEntry(raw: string): TermEntry {
    const { name, args } = parseCommand(raw);
    return { id: this.nextId++, input: raw, name, args };
  }

  private context(args: string[]): CommandContext {
    const win = this.document.defaultView;
    return {
      args,
      profile: this.profile(),
      navigateToGui: () => void this.router.navigate(['/']),
      setTheme: (name) => this.theme.setTerminalTheme(name),
      clear: () => this.clear(),
      clearHistory: () => this.history.set([]),
      openUrl: (url) => {
        if (url.startsWith('mailto:')) win?.location.assign(url);
        else win?.open(url, '_blank', 'noopener');
      },
      download: (url, fileName) => {
        const link = this.document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
      },
    };
  }
}

function commonPrefix(values: string[]): string {
  return values.reduce((prefix, value) => {
    let i = 0;
    while (i < prefix.length && prefix[i] === value[i]) i++;
    return prefix.slice(0, i);
  });
}
