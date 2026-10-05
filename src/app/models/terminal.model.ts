import { type Type } from '@angular/core';

export interface TermOutput {
  component: Type<unknown>;
  inputs?: Record<string, unknown>;
}

export interface TermEntry {
  id: number;
  input: string;
  output?: TermOutput;
}

export interface ParsedCommand {
  name: string;
  args: string[];
  raw: string;
}

/** Side-effect hooks a command may use; filled in by the terminal feature. */
export interface CommandContext {
  parsed: ParsedCommand;
  navigateToGui(): void;
  setTheme(theme: string): boolean;
  clear(): void;
  openUrl(url: string): void;
  history(): string[];
}

export interface Command {
  name: string;
  description: string;
  usage?: string;
  complete?(args: string[]): string[];
  run(ctx: CommandContext): TermOutput | void;
}
