import type { IconName } from '../shared/ui/icon/icons';

export interface Social {
  id: string;
  label: string;
  url: string;
  icon: IconName;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  points: string[];
}

export interface Project {
  name: string;
  featured?: boolean;
  stack: string[];
  description: string;
  repo?: string;
  live?: string;
}

export interface SkillGroup {
  label: string;
  icon: IconName;
  items: string[];
}

export interface Education {
  school: string;
  degree: string;
  location: string;
  start: string;
  end: string;
  score: string;
}

export interface Certification {
  title: string;
  detail?: string;
  url?: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  intro: string;
  /** Company name highlighted inside `intro` in the GUI hero. */
  currentCompany: string;
  location: string;
  about: string[];
  aboutTech: string[];
  /** Optional square photo in `public/images/` (e.g. `images/profile.webp`), shown in About. */
  photo?: string;
  email: string;
  resumeUrl: string;
  socials: Social[];
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  education: Education[];
  certifications: Certification[];
}
