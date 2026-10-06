import { type Profile } from './profile.model';

/**
 * One executed line. Plain, JSON-serialisable data only: the output component is
 * resolved from the command registry at render time (never stored in state).
 */
export interface TermEntry {
  id: number;
  input: string;
  /** Lower-cased command name; empty for a blank line. */
  name: string;
  args: string[];
  /** Usage / validation message produced by `Command.run`. */
  error?: string;
}

/** One Tab-completion option (fish-style: value plus a short description). */
export interface CompletionItem {
  value: string;
  description?: string;
}

export interface ParsedCommand {
  name: string;
  args: string[];
  raw: string;
}

/** Side-effect hooks available to `Command.run`. Built by `TerminalStore`. */
export interface CommandContext {
  args: string[];
  profile: Profile;
  navigateToGui(): void;
  setTheme(name: string): boolean;
  clear(): void;
  clearHistory(): void;
  openUrl(url: string): void;
  download(url: string, fileName: string): void;
}

export interface Command {
  name: string;
  description: string;
  /** Shown on invalid arguments and in `help`, e.g. `projects [go <n>]`. */
  usage?: string;
  /**
   * Plain-text output for simple commands (rendered by `TextOutput`).
   * Rich outputs are components mapped by name in `features/terminal/outputs/index.ts`.
   */
  text?(args: string[], profile: Profile): string | string[];
  /** Tab-completion candidates for the argument being typed. */
  complete?(args: string[], profile: Profile): (string | CompletionItem)[];
  /** Side effects only. Return a string to show it as an error/usage message. */
  run?(ctx: CommandContext): string | undefined | void;
}
