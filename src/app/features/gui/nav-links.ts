export interface NavLink {
  /** Section element id the link scrolls to. */
  fragment: string;
  label: string;
}

/** GUI sections in page order; drives the header, mobile menu and section titles. */
export const NAV_LINKS: readonly NavLink[] = [
  { fragment: 'about', label: '.aboutMe()' },
  { fragment: 'experience', label: '.experience()' },
  { fragment: 'projects', label: '.projects()' },
  { fragment: 'skills', label: '.skills()' },
  { fragment: 'education', label: '.education()' },
  { fragment: 'contact', label: '.contact()' },
];
