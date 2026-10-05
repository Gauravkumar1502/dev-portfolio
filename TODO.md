# Portfolio — Step-by-step TODO

Full design: see the approved plan (GUI × neobrutalism, terminal like satnaing/terminal-portfolio).
Work one task at a time; tick `[x]` when done and verified with `pnpm start`.

## 1. Base setup ✅
- [x] Angular 22 + pnpm scaffold (zoneless, SCSS, no tests, `--ai-config=claude-code`)
- [x] Angular CLI MCP server (`.mcp.json`) + `CLAUDE.md` best practices
- [x] `@angular/cdk` + `@angular/aria`
- [x] Folder structure (`core`, `data`, `models`, `shared`, `features/gui`, `features/terminal`, `styles`)
- [x] Signal stores: `ProfileStore`, `UiStore` (mode, breakpoint), `ThemeStore` (data-theme + persistence)
- [x] Routes `/` (GUI) + `/terminal`, `lastModeGuard`, anchor scrolling
- [x] Style foundation: tokens, neobrutal mixins, GUI themes, 17 terminal themes
- [x] Resume at `public/resume/GK_Resume.pdf`, fonts in `index.html`

## 2. Content
- [ ] Review/extend `profile.data.ts` (about text, more projects + repo links)
- [ ] Add LeetCode URL to socials

## 3. Shared UI primitives (`shared/ui`)
- [ ] `nb-button` (variants: solid / outline / ghost; link + button)
- [ ] `nb-card`, `nb-tag`/`nb-badge`, `section-title`
- [ ] `app-icon` (inline SVG: github, linkedin, x, hackerrank, codepen, leetcode, sun, moon, menu, terminal)
- [ ] `reveal-on-scroll` directive (IntersectionObserver, reduced-motion aware)

## 4. GUI
- [ ] Header: GK logo, `.aboutMe()`-style nav, theme toggle, `>_ terminal` button (sticky)
- [ ] Side rails ≥1024px: vertical email (left) + socials (right) with lines
- [ ] Mobile menu: CDK overlay drawer with nav + socials, focus trap
- [ ] Section: Hero
- [ ] Section: About
- [ ] Section: Experience (aria tabs per company)
- [ ] Section: Projects
- [ ] Section: Skills
- [ ] Section: Education + Certifications
- [ ] Section: Contact + footer

## 5. Terminal
- [ ] `TerminalStore` (entries, history, pointer, hints) + `command-parser`
- [ ] `command-registry` + `CommandContext` wiring
- [ ] Prompt: `visitor@gaurav:~$`, click-to-focus, Tab/Ctrl+I complete, ↑/↓ history, Ctrl+L clear
- [ ] Welcome banner (ASCII art) + `help`
- [ ] Commands: about, whoami, experience, projects [go n], skills, education, certifications
- [ ] Commands: socials [go name], email, resume [--download], themes [list|set], history, echo, pwd, clear, gui, exit, sudo
- [ ] Unknown-command error + mobile layout

## 6. Polish
- [ ] Per-route titles/meta, favicon
- [ ] A11y pass (focus rings, aria labels, contrast in all themes)
- [ ] Responsive check: 375 / 768 / 1440, no horizontal scroll

## 7. Deploy
- [ ] `.github/workflows/deploy.yml` (pnpm, `pnpm build:gh`, copy index → 404.html, GitHub Pages)
- [ ] Create `dev-portfolio` repo and push
