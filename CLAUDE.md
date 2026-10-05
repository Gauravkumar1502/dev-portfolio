You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `model()` for two-way bound properties with `[(prop)]` syntax instead of pairing `input()` with `output()`
- Use `computed()` for derived state
- Use `linkedSignal()` for state derived from multiple reactive sources that must stay synchronized
- Prefer inline templates for small components
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- Do NOT import `CommonModule`, import only the directives and pipes the template uses, such as `AsyncPipe` or `DatePipe`
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection

## This Project

Unified portfolio: neobrutalism GUI (`/`) + terminal (`/terminal`) in one Angular 22 app. Work is tracked step by step in `TODO.md` — do one task at a time and tick it off.

- Package manager: **pnpm** (`pnpm start`, `pnpm build`, `pnpm build:gh` for GitHub Pages `/dev-portfolio/`). No unit tests.
- Styling: SCSS only, no Material / Tailwind. Behaviour from `@angular/cdk` + `@angular/aria`. In components: `@use 'mixins' as nb;` (resolved from `src/styles`).
- Theme: CSS variables keyed by `<html data-theme>`; set only through `ThemeStore` (`core/state/theme.store.ts`).
- Content: edit `src/app/data/profile.data.ts`; read it via `ProfileStore`, never import the data file in components.
- Global state lives in `core/state/*` signal stores; terminal session state stays in a component-provided `TerminalStore`.
- Icons: Font Awesome Free via `<app-icon name="…">` only (registry `shared/ui/icon/icons.ts`). Never hand-build SVG icons/images/logos — **stop and ask Gaurav** to put the asset in `public/` (e.g. `public/icons/`).
- Layout: `core/` (stores, services, guards), `data/`, `models/`, `shared/ui` (`nb-*` primitives), `features/gui`, `features/terminal`.

## Code Style & Editing Rules

Run `pnpm check` (prettier + eslint + stylelint + build) before finishing any task; it must pass with no warnings.
Auto-fix: `pnpm format`, `pnpm lint:fix`, `pnpm lint:styles:fix`.

**General** — `.editorconfig`: 2 spaces, LF, UTF-8, final newline. Prettier: width 100, single quotes, Angular HTML parser.

**TypeScript**

- `import type` / inline `type` for type-only imports (enforced).
- No `public` keyword; mark template-only members `protected`, internals `private`, injected deps `private readonly`.
- No `any`, `===` only, no `console.log` (warn/error allowed).
- Files: 2025 style guide names (`hero.ts`, `theme.store.ts`), one component/service per file.
- Selectors: `app-*` components, `nb-*` elements / `[nb-*]` attribute components (e.g. `<button nb-button>`) for shared neobrutal primitives (enforced).
- Never import `CommonModule`, `NgClass`, `NgStyle`, Angular Material, or `data/profile.data` outside `ProfileStore` (enforced).

**HTML templates**

- Native control flow only; self-closing tags for empty components; `ngSrc` for images; `type` on every `<button>` (enforced).
- No inline `style="…"` attributes; use `[style.x]` bindings or classes (enforced).
- Accessibility rules from `templateAccessibility` are errors: labels, alt text, keyboard handlers with click handlers.

**SCSS** (`.stylelintrc.json`, standard-scss + recess property order)

- Colors only via theme variables (`var(--color-*)`, `var(--nb-*)`, `var(--term-*)`); raw hex/rgb/hsl and named colors are allowed **only** in `src/styles/themes/*` and `_tokens.scss` (enforced).
- Spacing/borders/shadows via tokens (`var(--space-*)`, `nb.*` mixins); prefer `rem`, `clamp()` for fluid type.
- Class names: kebab-case BEM (`block__element--modifier`); no ID selectors; nesting ≤ 3; ≤ 4 compound selectors (enforced).
- No `::ng-deep`; style children through inputs/CSS variables. `!important` only in global reduced-motion styles.
- Load modules with `@use` (never `@import`), use `sass:` modules (`list.nth`, `math.div`) instead of global functions (enforced).
- Keep component styles under the 4 kB budget; shared patterns go into `_mixins.scss`.
