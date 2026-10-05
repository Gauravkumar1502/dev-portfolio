export type AppMode = 'gui' | 'terminal';

export type GuiTheme = 'gui-dark' | 'gui-light';

export const TERMINAL_THEMES = [
  'dark-forest',
  'dark-day',
  'dark-ocean',
  'dark-space',
  'dark-night',
  'dark-cave',
  'dark-sea',
  'light-vanilla',
  'light-haze',
  'light-day',
  'light-sky',
  'dark',
  'light',
  'blue-matrix',
  'espresso',
  'green-goblin',
  'ubuntu',
] as const;

export type TerminalTheme = (typeof TERMINAL_THEMES)[number];
