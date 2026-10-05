import { type Type } from '@angular/core';
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
  openUrl(url: string): void;
  download(url: string, fileName: string): void;
}

export interface Command {
  name: string;
  description: string;
  /** Shown on invalid arguments and in `help`, e.g. `projects [go <n>]`. */
  usage?: string;
  /** Component rendered for an entry of this command; receives `args` (and `error`) inputs. */
  output?: Type<unknown>;
  /** Tab-completion candidates for the argument being typed. */
  complete?(args: string[], profile: Profile): string[];
  /** Side effects only. Return a string to show it as an error/usage message. */
  run?(ctx: CommandContext): string | undefined | void;
}
