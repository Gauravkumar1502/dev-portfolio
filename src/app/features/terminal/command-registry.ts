import { type Command } from '../../models/terminal.model';
import { CONTENT_COMMANDS } from './commands/content.commands';
import { TERMINAL_COMMANDS } from './commands/terminal.commands';

/** Every command, alphabetical. Adding a command = adding one object to a commands file. */
export const COMMANDS: readonly Command[] = [...CONTENT_COMMANDS, ...TERMINAL_COMMANDS].sort(
  (a, b) => a.name.localeCompare(b.name),
);

const BY_NAME = new Map(COMMANDS.map((command) => [command.name, command]));

export function findCommand(name: string): Command | undefined {
  return BY_NAME.get(name);
}

/** Commands shown in `help` (hidden ones have no description). */
export const VISIBLE_COMMANDS = COMMANDS.filter((command) => command.description);
