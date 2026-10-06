import { TERMINAL_THEMES } from '../../../models/theme.model';
import { type Command } from '../../../models/terminal.model';

const THEMES_USAGE = 'usage: themes [list | set <theme>]';

/** Terminal/system commands. Rich outputs: `outputs/index.ts`. */
export const TERMINAL_COMMANDS: Command[] = [
  { name: 'help', description: 'check available commands' },
  { name: 'welcome', description: 'display hero section' },
  {
    name: 'themes',
    description: 'check available themes',
    usage: THEMES_USAGE,
    complete: (args) =>
      args.length <= 1
        ? [
            { value: 'list', description: 'list all themes' },
            { value: 'set', description: 'switch theme' },
          ]
        : [...TERMINAL_THEMES],
    run: ({ args, setTheme }) => {
      if (args.length === 0 || (args.length === 1 && args[0] === 'list')) return undefined;
      if (args[0] !== 'set' || args.length !== 2) return THEMES_USAGE;
      const theme = args[1]?.toLowerCase() ?? '';
      if (!setTheme(theme)) return `themes: '${theme}' not found — run 'themes' to list them`;
      return undefined;
    },
  },
  {
    name: 'history',
    description: 'view command history (-c to clear it)',
    usage: 'usage: history [-c]',
    complete: (args) => (args.length <= 1 ? [{ value: '-c', description: 'clear history' }] : []),
    run: ({ args, clearHistory }) => {
      if (args.length === 0) return undefined;
      if (args.length === 1 && args[0] === '-c') {
        clearHistory();
        return undefined;
      }
      return 'usage: history [-c]';
    },
  },
  {
    name: 'echo',
    description: 'print out anything',
    usage: 'usage: echo <text>',
    text: (args) => args.join(' '),
  },
  {
    name: 'pwd',
    description: 'print current working directory',
    text: () => '/home/gaurav/portfolio',
  },
  {
    name: 'clear',
    description: 'clear the terminal (Ctrl+L)',
    run: ({ clear }) => clear(),
  },
  {
    name: 'gui',
    description: 'switch to the GUI portfolio',
    text: () => 'Switching to GUI …',
    run: ({ navigateToGui }) => navigateToGui(),
  },
  {
    name: 'exit',
    description: 'exit the terminal',
    text: () => [
      "For security reasons a browser tab can't close itself 🙂",
      "Type 'gui' to switch to the GUI portfolio instead.",
    ],
  },
  // Easter egg: works but isn't listed in `help`.
  {
    name: 'sudo',
    description: '',
    usage: 'usage: sudo <command>',
    text: () => [
      'visitor is not in the sudoers file. This incident will be reported. 😄',
      'Nice try though!',
    ],
  },
];
