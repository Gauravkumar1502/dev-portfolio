import { type Type } from '@angular/core';
import { AboutOutput } from './about';
import { CertificationsOutput } from './certifications';
import { EducationOutput } from './education';
import { ExperienceOutput } from './experience';
import { HelpOutput } from './help';
import { HistoryOutput } from './history';
import { ProjectsOutput } from './projects';
import { ResumeOutput } from './resume';
import { SkillsOutput } from './skills';
import { SocialsOutput } from './socials';
import { ThemesOutput } from './themes';
import { WelcomeOutput } from './welcome';

/**
 * Rich output component per command name. Components may declare an `args` input.
 * Kept apart from the command definitions so the registry stays plain data (no import cycles).
 */
export const OUTPUTS: Readonly<Partial<Record<string, Type<unknown>>>> = {
  about: AboutOutput,
  certifications: CertificationsOutput,
  education: EducationOutput,
  experience: ExperienceOutput,
  help: HelpOutput,
  history: HistoryOutput,
  projects: ProjectsOutput,
  resume: ResumeOutput,
  skills: SkillsOutput,
  socials: SocialsOutput,
  themes: ThemesOutput,
  welcome: WelcomeOutput,
};
