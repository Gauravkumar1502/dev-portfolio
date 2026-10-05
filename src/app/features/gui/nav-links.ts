export interface NavLink {
  /** Section element id the link scrolls to. */
  fragment: string;
  label: string;
  /** Compact label used in the header when space is tight (1024–1279px). */
  short: string;
}

/** GUI sections in page order; drives the header, mobile menu and section titles. */
export const NAV_LINKS: readonly NavLink[] = [
  { fragment: 'about', label: '.aboutMe()', short: '.about()' },
  { fragment: 'experience', label: '.experience()', short: '.exp()' },
  { fragment: 'projects', label: '.projects()', short: '.projects()' },
  { fragment: 'skills', label: '.skills()', short: '.skills()' },
  { fragment: 'credentials', label: '.credentials()', short: '.creds()' },
  { fragment: 'contact', label: '.contact()', short: '.contact()' },
];
