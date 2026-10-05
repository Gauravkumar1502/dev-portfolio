import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Service, signal } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { type GuiTheme, TERMINAL_THEMES, type TerminalTheme } from '../../models/theme.model';
import { UiStore } from './ui.store';

const GUI_KEY = 'portfolio:gui-theme';
const TERM_KEY = 'portfolio:terminal-theme';

@Service()
export class ThemeStore {
  private readonly storage = inject(StorageService);
  private readonly ui = inject(UiStore);
  private readonly document = inject(DOCUMENT);

  readonly guiTheme = signal<GuiTheme>(
    this.storage.get<GuiTheme>(GUI_KEY) ?? this.preferredGuiTheme(),
  );
  readonly terminalTheme = signal<TerminalTheme>(
    this.storage.get<TerminalTheme>(TERM_KEY) ?? 'dark-forest',
  );
  readonly activeTheme = computed(() =>
    this.ui.mode() === 'gui' ? this.guiTheme() : `term-${this.terminalTheme()}`,
  );
  readonly isGuiDark = computed(() => this.guiTheme() === 'gui-dark');

  constructor() {
    effect(() => (this.document.documentElement.dataset['theme'] = this.activeTheme()));
    effect(() => this.storage.set(GUI_KEY, this.guiTheme()));
    effect(() => this.storage.set(TERM_KEY, this.terminalTheme()));
  }

  toggleGuiTheme(): void {
    this.guiTheme.update((t) => (t === 'gui-dark' ? 'gui-light' : 'gui-dark'));
  }

  /** Returns false when the name is not a known terminal theme. */
  setTerminalTheme(name: string): boolean {
    const valid = (TERMINAL_THEMES as readonly string[]).includes(name);
    if (valid) this.terminalTheme.set(name as TerminalTheme);
    return valid;
  }

  private preferredGuiTheme(): GuiTheme {
    const dark =
      this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches ?? true;
    return dark ? 'gui-dark' : 'gui-light';
  }
}
