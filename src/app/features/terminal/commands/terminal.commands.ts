import { TERMINAL_THEMES } from '../../../models/theme.model';
import { type Command } from '../../../models/terminal.model';

const THEMES_USAGE = 'usage: themes [list | set <theme>]';

/** Terminal/system commands (outputs are attached in steps 5.4 / 5.6). */
export const TERMINAL_COMMANDS: Command[] = [
  { name: 'help', description: 'check available commands' },
  { name: 'welcome', description: 'display hero section' },
  {
    name: 'themes',
    description: 'check available themes',
    usage: THEMES_USAGE,
    complete: (args) => (args.length <= 1 ? ['list', 'set'] : [...TERMINAL_THEMES]),
    run: ({ args, setTheme }) => {
      if (args.length === 0 || (args.length === 1 && args[0] === 'list')) return undefined;
      if (args[0] !== 'set' || args.length !== 2) return THEMES_USAGE;
      const theme = args[1]?.toLowerCase() ?? '';
      if (!setTheme(theme)) return `themes: '${theme}' not found — run 'themes' to list them`;
      return undefined;
    },
  },
  { name: 'history', description: 'view command history' },
  { name: 'echo', description: 'print out anything', usage: 'usage: echo <text>' },
  { name: 'pwd', description: 'print current working directory' },
  {
    name: 'clear',
    description: 'clear the terminal (Ctrl+L)',
    run: ({ clear }) => clear(),
  },
  {
    name: 'gui',
    description: 'switch to the GUI portfolio',
    run: ({ navigateToGui }) => navigateToGui(),
  },
  { name: 'exit', description: 'exit the terminal' },
  // Easter egg: works but isn't listed in `help`.
  { name: 'sudo', description: '' },
];
