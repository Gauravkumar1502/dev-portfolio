import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCodepen,
  faGithub,
  faHackerrank,
  faLeetcode,
  faLinkedin,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
  faArrowUpRightFromSquare,
  faBars,
  faCode,
  faDownload,
  faEnvelope,
  faMoon,
  faSun,
  faTerminal,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

/** A single-colour SVG dropped into `public/icons/` (rendered as a mask, so it follows `currentColor`). */
export interface AssetIcon {
  asset: string;
}

/**
 * App icon registry: Font Awesome Free (solid + brands) by default.
 * Only icons listed here are bundled. For icons Font Awesome lacks, ask for an SVG
 * in `public/icons/` and register it as `{ asset: 'icons/<name>.svg' }`.
 */
export const ICONS = {
  // brands
  github: faGithub,
  linkedin: faLinkedin,
  x: faXTwitter,
  hackerrank: faHackerrank,
  codepen: faCodepen,
  leetcode: faLeetcode,
  // ui
  sun: faSun,
  moon: faMoon,
  menu: faBars,
  close: faXmark,
  terminal: faTerminal,
  external: faArrowUpRightFromSquare,
  download: faDownload,
  mail: faEnvelope,
  code: faCode,
} as const satisfies Record<string, IconDefinition | AssetIcon>;

export type IconName = keyof typeof ICONS;
