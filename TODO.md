# Portfolio — Step-by-step TODO

One task at a time. Each task lists **Files**, **Do**, and **Done when**.
Verify with `pnpm start` (and `pnpm build` must stay warning-free). Tick `[x]` when done.

Conventions (see `CLAUDE.md`): `@Service()` for new singletons, `input()/output()/model()`,
inline templates for small components, SCSS with `@use 'mixins' as nb;`, read content only via `ProfileStore`.

---

## 1. Base setup ✅ DONE

- [x] Angular 22 + pnpm scaffold (zoneless, SCSS, no tests, `--ai-config=claude-code`)
- [x] Angular CLI MCP server (`.mcp.json`) + `CLAUDE.md`
- [x] `@angular/cdk` + `@angular/aria`
- [x] Folder structure: `core`, `data`, `models`, `shared`, `features/gui`, `features/terminal`, `styles`
- [x] Stores: `ProfileStore`, `UiStore`, `ThemeStore`; `StorageService`
- [x] Routes `/` + `/terminal`, `lastModeGuard`, anchor scrolling
- [x] Styles: tokens, neobrutal mixins, GUI themes, 17 terminal themes
- [x] Resume at `public/resume/GK_Resume.pdf`, Google Fonts in `index.html`

---

## 2. Content & housekeeping

### 2.1 Migrate stores to `@Service()`

- **Files:** `core/state/*.store.ts`, `core/services/storage.service.ts`
- **Do:** replace `@Injectable({ providedIn: 'root' })` with `@Service()`.
- **Done when:** build passes, theme still applies on load.

### 2.2 Complete profile content

- **Files:** `data/profile.data.ts`, `models/profile.model.ts`
- **Do:** add `about: string[]` paragraphs (rewrite old about-me, now RedBlink), `aboutTech: string[]`,
  more projects with `repo`/`live` links, LeetCode social (URL from Gaurav), `location`.
- **Done when:** no TODO left in data file; model types match.

---

## 3. Shared UI primitives (`shared/ui`)

### 3.1 `app-icon`

- **Files:** `shared/ui/icon/icon.ts`, `shared/ui/icon/icons.ts` (name → SVG path map)
- **Do:** `name = input.required<IconName>()`, `size = input(20)`; inline `<svg>` with `currentColor`,
  `aria-hidden="true"` by default, optional `label` input → `role="img"` + `aria-label`.
  Icons: github, linkedin, x, hackerrank, codepen, leetcode, sun, moon, menu, close, terminal, external, download, mail.
- **Done when:** all icons render at size 16/24 in both GUI themes.

### 3.2 `nb-button`

- **Files:** `shared/ui/button/nb-button.ts` (+ `.scss`)
- **Do:** attribute selector `button[nbButton], a[nbButton]`; `variant = input<'solid'|'outline'|'ghost'>('solid')`,
  `size = input<'sm'|'md'>('md')`; host class bindings; `nb.surface` + `nb.pressable` + `nb.focus-ring`.
- **Done when:** works as `<a>` and `<button>`, keyboard focus visible, hover lift / active press.

### 3.3 `nb-card`, `nb-tag`, `section-title`

- **Files:** `shared/ui/card/nb-card.ts`, `shared/ui/tag/nb-tag.ts`, `shared/ui/section-title/section-title.ts`
- **Do:** card = content projection + `interactive` input (adds pressable); tag = small bordered chip;
  section-title = `index` + `label` inputs → renders `01. .experience()` style heading with rule line.
- **Done when:** all three used in a scratch view and look right in dark/light.

### 3.4 `reveal-on-scroll` directive

- **Files:** `shared/directives/reveal-on-scroll.ts`
- **Do:** `[appReveal]`; IntersectionObserver via `afterNextRender`, toggles `is-visible` host class;
  disconnect with `DestroyRef`; skip animation if `prefers-reduced-motion`. Global `.reveal` styles in `styles.scss`.
- **Done when:** sections fade/slide in once; no motion with reduced-motion on.

---

## 4. GUI (`features/gui`)

### 4.1 GUI shell layout

- **Files:** `gui-shell.ts/.scss`
- **Do:** grid: header (sticky) + `<main id="content">` (max-width `--container-max`, side padding for rails);
  skip-to-content link; host the rails + sections.
- **Done when:** empty sections stack correctly, no horizontal scroll at 375px.

### 4.2 Header

- **Files:** `layout/header/header.ts/.scss`
- **Do:** `GK` logo (`--font-logo`, routerLink `/`); nav from a `NAV_LINKS` const
  (`.aboutMe() .experience() .projects() .skills() .education() .contact()`) as `routerLink="." [fragment]`;
  theme toggle (sun/moon, `aria-label`, `ThemeStore.toggleGuiTheme`); `>_ terminal` nbButton → `/terminal`;
  below 1024px show only logo + menu button (`UiStore.mobileMenuOpen`).
- **Done when:** links scroll to sections, toggle persists across reload, terminal button routes.

### 4.3 Side rails (≥1024px)

- **Files:** `layout/side-rails/side-rails.ts/.scss`
- **Do:** left: vertical `writing-mode: vertical-rl` mailto email + line to bottom; right: socials icon column
  - line; `position: fixed`; render only when `UiStore.isDesktop()`. Tooltips via `title`/aria-label.
- **Done when:** matches screenshot layout; hidden below 1024px.

### 4.4 Mobile menu

- **Files:** `layout/mobile-menu/mobile-menu.ts/.scss`
- **Do:** CDK `Overlay` (or `cdkTrapFocus` panel) sliding from right; nav links, theme toggle, terminal button,
  socials row, email; closes on link click / Esc / backdrop; restores focus to menu button.
- **Done when:** fully keyboard operable, body doesn't scroll behind, closes on navigation.

### 4.5 Hero section

- **Files:** `sections/hero/hero.ts/.scss`
- **Do:** "Hi, I'm" (primary) → name (`--font-display`, large clamp) → tagline (muted) → intro paragraph
  (company name highlighted) → Resume nbButton (opens PDF new tab) + "Say hello" outline button.
- **Done when:** visually matches screenshot, responsive type with `clamp()`.

### 4.6 About section

- **Files:** `sections/about/about.ts/.scss`
- **Do:** `section-title` 01; paragraphs from `about`; tech list in 2 columns with `▹` markers;
  optional photo in nb-card frame (NgOptimizedImage) if an image is provided.
- **Done when:** reads from `ProfileStore`, stacks on mobile.

### 4.7 Experience section

- **Files:** `sections/experience/experience.ts/.scss`
- **Do:** `@angular/aria` tabs: company tab list (vertical desktop, horizontal scroll mobile) +
  panel nb-card with role, `@ company`, dates, location, bullet points. Selected index as `signal`.
- **Done when:** arrow-key navigation between tabs works, ARIA roles correct.

### 4.8 Projects section

- **Files:** `sections/projects/projects.ts/.scss`
- **Do:** responsive grid of interactive nb-cards: name, description, `nb-tag` stack, repo/live icon links.
- **Done when:** 1/2/3 columns at mobile/tablet/desktop.

### 4.9 Skills section

- **Files:** `sections/skills/skills.ts/.scss`
- **Do:** one nb-card per `SkillGroup` with `nb-tag` chips.
- **Done when:** wraps nicely, consistent heights in a row.

### 4.10 Education + Certifications

- **Files:** `sections/education/education.ts/.scss`
- **Do:** timeline-style nb-cards (degree, school, dates, score); certifications list with optional link.
- **Done when:** both entries + certifications shown.

### 4.11 Contact + footer

- **Files:** `sections/contact/contact.ts/.scss`, `layout/footer/footer.ts`
- **Do:** big centered nb-card "Get in touch" + mailto nbButton; footer with socials (mobile), credits,
  "try the terminal" link.
- **Done when:** mailto has subject; footer socials visible only < 1024px.

---

## 5. Terminal (`features/terminal`)

### 5.1 TerminalStore + parser (data-only entries)

- **Files:** `terminal.store.ts`, `command-parser.ts`, `models/terminal.model.ts`
- **Pattern:** state holds **plain data only**, never component classes (Angular Discord advice:
  "list of data, template decides"). Rendering resolves the component from the registry.
- **Do:**
  - Change `TermEntry` to `{ id: number; input: string; name: string; args: string[]; error?: string }`
    (JSON-serializable); drop `output` / `TermOutput` from state.
  - Store (provided in `Terminal` component, `providers: [TerminalStore]`): signals `entries`,
    `history` (newest first, kept separate so `clear` doesn't wipe it), `pointer`, `input`, `hints`.
  - Methods: `submit(raw)` (parse → run side effects → push entry), `clear()` = `entries.set([])`,
    `prev()/next()` history navigation, `nextId` counter for stable `track`.
  - Parser: trim, split on whitespace, lowercase command name, keep quoted strings for `echo`.
- **Done when:** entries are plain objects (`JSON.stringify` works); `clear` empties output but ↑ still recalls history.

### 5.2 Command registry + context

- **Files:** `command-registry.ts`, `commands/*.ts` (one file per command or small groups)
- **Do:**
  - `Command { name; description; usage?; output?: Type<unknown>; complete?(args); run?(ctx): string | void }`
    — `output` = component rendered for the entry (component reads `ProfileStore` itself, receives `args` input);
    `run` = side effects only (navigate, set theme, open URL, clear); returning a string = error/usage message.
  - Registry: `COMMANDS` array + `Map` by name; `outputFor(entry): Type<unknown> | null`
    (unknown name / error → `ErrorOutput`).
  - `CommandContext` built in the store (Router, ThemeStore, `window.open`, `clear`, `history`).
- **Done when:** adding a command = one object (+ one output component); no `Type` stored in signals.

### 5.3 Prompt

- **Files:** `prompt/prompt.ts/.scss`
- **Do:** `visitor@gaurav:~$` label + input (`autocomplete=off`, `spellcheck=false`, `autocapitalize=off`);
  keys: Enter submit, Tab/Ctrl+I complete (single match fills, multiple → hints), ↑/↓ history,
  Ctrl+L clear, Ctrl+C cancel line; click anywhere in terminal focuses input; caret at end.
- **Done when:** all shortcuts behave like satnaing demo.

### 5.4 Terminal screen + welcome

- **Files:** `terminal.ts/.scss`, `outputs/welcome.ts`
- **Do:** version line, ASCII name art + monitor art (from old `cli.component.html`), "type `help`" hint;
  render with `@for (e of store.entries(); track e.id)` → echoed prompt +
  `<ng-container *ngComponentOutlet="registry.outputFor(e); inputs: { args: e.args }" />`; auto-scroll to bottom.
- **Done when:** `welcome` shows on load and on command.

### 5.5 Info commands

- **Files:** `outputs/{help,about,experience,projects,skills,education,certifications}.ts`
- **Do:** each output component has `args = input<string[]>([])` and injects `ProfileStore`.
  `help` (aligned table + shortcuts), `about`, `whoami`, `experience`, `projects` (+ `projects go <n>`),
  `skills`, `education`, `certifications` — all reading `ProfileStore`.
- **Done when:** every command prints formatted output; `projects go 1` opens link.

### 5.6 Action commands

- **Files:** `outputs/{socials,themes,history,text}.ts`
- **Do:** `socials` (+ `go <name>`), `email` (mailto), `resume` (+ `--download`), `themes` (list) /
  `themes set <name>`, `history`, `echo`, `pwd`, `clear`, `gui` (navigate `/`), `exit` (friendly msg), `sudo` easter egg.
  Tab-complete args for `themes set`, `socials go`, `projects go`.
- **Done when:** `themes set espresso` persists; `gui` switches mode.

### 5.7 Errors + mobile

- **Do:** unknown command → `command not found: x — type 'help'`; invalid args → usage line;
  prompt wraps on narrow screens; font-size scales.
- **Done when:** usable at 375px.

---

## 6. Polish

### 6.1 SEO & meta

- **Do:** per-route title (already) + description via `Meta`; Open Graph tags; custom favicon (GK).

### 6.2 Accessibility pass

- **Do:** check contrast for both GUI themes + all 17 terminal themes (adjust failing ones);
  focus rings everywhere; landmarks; run axe DevTools on `/` and `/terminal`.
- **Done when:** axe reports 0 violations.

### 6.3 Responsive pass

- **Do:** check 375 / 768 / 1024 / 1440; no horizontal scroll; rails/menu switch at 1024px.

---

## 7. Deploy

### 7.1 GitHub Actions workflow

- **Files:** `.github/workflows/deploy.yml`
- **Do:** checkout → `pnpm/action-setup` → setup-node (cache pnpm) → `pnpm install --frozen-lockfile`
  → `pnpm build:gh` → `cp dist/dev-portfolio/browser/index.html dist/dev-portfolio/browser/404.html`
  → `actions/upload-pages-artifact` + `actions/deploy-pages`.
- **Done when:** workflow green on push to `main`.

### 7.2 Repo

- **Do:** create `dev-portfolio` on GitHub, push, enable Pages (source: GitHub Actions);
  update `resumeUrl`/links; optionally redirect the old portfolio + Terminal-Portfolio to the new URL.
- **Done when:** `https://gauravkumar1502.github.io/dev-portfolio/` and `/dev-portfolio/terminal` load.
