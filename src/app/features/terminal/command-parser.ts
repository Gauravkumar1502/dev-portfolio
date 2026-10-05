import { type ParsedCommand } from '../../models/terminal.model';

/**
 * Splits a raw line into a lower-cased command name and arguments.
 * Double or single quotes group words: `echo "hello world"` → args `['hello world']`.
 */
export function parseCommand(raw: string): ParsedCommand {
  const tokens = [...raw.matchAll(/"([^"]*)"|'([^']*)'|(\S+)/g)].map(
    (m) => m[1] ?? m[2] ?? m[3] ?? '',
  );
  const [name = '', ...args] = tokens;
  return { name: name.toLowerCase(), args, raw };
}
