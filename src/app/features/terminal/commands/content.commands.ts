import { type Command } from '../../../models/terminal.model';

const PROJECTS_USAGE = 'usage: projects [go <number>]';
const SOCIALS_USAGE = 'usage: socials [go <name>]';
const RESUME_USAGE = 'usage: resume [--download]';

/** Commands that present portfolio content. Rich outputs: `outputs/index.ts`. */
export const CONTENT_COMMANDS: Command[] = [
  { name: 'about', description: 'about Gaurav Kumar' },
  {
    name: 'whoami',
    description: 'about current user',
    text: () => [
      'visitor',
      'The paradox of “Who am I?” is: we never know, but, we constantly find out.',
    ],
  },
  { name: 'experience', description: 'my work experience' },
  {
    name: 'projects',
    description: "view projects that I've coded",
    usage: PROJECTS_USAGE,
    complete: (args, profile) =>
      args.length <= 1 ? ['go'] : profile.projects.map((_, i) => String(i + 1)),
    run: ({ args, profile, openUrl }) => {
      if (args.length === 0) return undefined;
      const index = Number(args[1]) - 1;
      const project = args[0] === 'go' && args.length === 2 ? profile.projects[index] : undefined;
      const url = project?.live ?? project?.repo;
      if (!url) return PROJECTS_USAGE;
      openUrl(url);
      return undefined;
    },
  },
  { name: 'skills', description: 'my technical skills' },
  { name: 'education', description: 'my education background' },
  { name: 'certifications', description: 'certifications & achievements' },
  {
    name: 'socials',
    description: 'check out my social accounts',
    usage: SOCIALS_USAGE,
    complete: (args, profile) => (args.length <= 1 ? ['go'] : profile.socials.map((s) => s.id)),
    run: ({ args, profile, openUrl }) => {
      if (args.length === 0) return undefined;
      const social =
        args[0] === 'go' && args.length === 2
          ? profile.socials.find((s) => s.id === args[1]?.toLowerCase())
          : undefined;
      if (!social) return SOCIALS_USAGE;
      openUrl(social.url);
      return undefined;
    },
  },
  {
    name: 'email',
    description: 'send an email to me',
    text: (args, profile) => (args.length > 0 ? [] : `Opening mail to ${profile.email} …`),
    run: ({ args, profile, openUrl }) => {
      if (args.length > 0) return 'usage: email';
      openUrl(`mailto:${profile.email}?subject=${encodeURIComponent('Hello Gaurav')}`);
      return undefined;
    },
  },
  {
    name: 'resume',
    description: 'view or download my resume',
    usage: RESUME_USAGE,
    complete: (args) => (args.length <= 1 ? ['--download'] : []),
    run: ({ args, profile, openUrl, download }) => {
      if (args.length === 0) {
        openUrl(profile.resumeUrl);
        return undefined;
      }
      if (args.length === 1 && args[0] === '--download') {
        download(profile.resumeUrl, 'Gaurav_Kumar_Resume.pdf');
        return undefined;
      }
      return RESUME_USAGE;
    },
  },
];
