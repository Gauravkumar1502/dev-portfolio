import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';
import { ProfileStore } from '../../core/state/profile.store';
import { ThemeStore } from '../../core/state/theme.store';
import { type CommandContext, type TermEntry } from '../../models/terminal.model';
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
  /** Completion candidates shown when Tab finds several matches. */
  readonly hints = signal<string[]>([]);
  /** Position while browsing history with ↑/↓ (-1 = editing a fresh line). */
  private readonly pointer = signal(-1);

  /**
   * Faded inline suggestion (rest of the line) shown after the cursor:
   * most recent matching history line first, otherwise a single unambiguous completion.
   */
  readonly suggestion = computed(() => {
    const value = this.input();
    if (!value.trim()) return '';
    const fromHistory = this.history().find((h) => h.length > value.length && h.startsWith(value));
    if (fromHistory) return fromHistory.slice(value.length);
    const { partial, matches } = this.completionsFor(value);
    return matches.length === 1 ? (matches[0] ?? '').slice(partial.length) : '';
  });

  constructor() {
    effect(() => this.storage.set(HISTORY_KEY, this.history()));
  }

  submit(raw = this.input()): void {
    const line = raw.trim();
    this.input.set('');
    this.hints.set([]);
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
    this.hints.set([]);
    this.pointer.set(-1);
  }

  clear(): void {
    this.entries.set([]);
    this.hints.set([]);
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

  /** Tab: complete the command or the argument being typed; several matches → `hints`. */
  complete(): void {
    const value = this.input();
    if (!value.trim()) return;

    const { partial, matches } = this.completionsFor(value);
    if (matches.length === 0) return;
    const completion = matches.length === 1 ? `${matches[0]} ` : commonPrefix(matches);
    this.hints.set(matches.length === 1 ? [] : matches);
    if (completion.length > partial.length) {
      this.input.set(value.slice(0, value.length - partial.length) + completion);
    }
  }

  /** → / End / tap: take the inline suggestion. */
  acceptSuggestion(): boolean {
    const rest = this.suggestion();
    if (!rest) return false;
    this.input.update((value) => value + rest);
    this.hints.set([]);
    return true;
  }

  /** Candidates for the word being typed (command name or argument). */
  private completionsFor(value: string): { partial: string; matches: string[] } {
    const endsWithSpace = /\s$/.test(value);
    const { name, args } = parseCommand(value);
    const typingName = args.length === 0 && !endsWithSpace;
    const partial = typingName ? name : endsWithSpace ? '' : (args.at(-1) ?? '');

    const candidates = typingName
      ? this.commands.map((c) => c.name)
      : (findCommand(name)?.complete?.(endsWithSpace ? [...args, ''] : args, this.profile()) ?? []);
    return { partial, matches: candidates.filter((c) => c.startsWith(partial.toLowerCase())) };
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
