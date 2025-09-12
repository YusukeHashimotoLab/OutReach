# Repository Guidelines

> This repository is a static, multi-language website (no build step) with plain HTML/CSS/JS and helper scripts.

## Project Structure & Module Organization
- Root: entry `index.html`, shared CSS (`styles.css`, `components.css`, `variables.css`), JS (`navigation.js`, `theme-toggle.js`, `lazy-load.js`, `config.js`).
- Locales: `en/`, `jp/` contain language-specific pages. Domain-specific pages in `nanomaterial/` (with `en/` and `jp/`).
- Assets: `images/`, `templates/`, `examples/`, `docs/`.
- Tools: `webpage_generate/scripts/` shell helpers; memory/templates under `webpage_generate/` are not site assets.

## Build, Test, and Development Commands
- No build required. Open locally or serve over HTTP:
  - macOS open: `open index.html`
  - Simple server: `python3 -m http.server 8000` (serve repo root)
- Helper scripts (optional):
  - Create feature scaffolding: `bash webpage_generate/scripts/create-new-feature.sh "feature-name"`

## Coding Style & Naming Conventions
- Indentation: 2 spaces; UTF-8; Unix line endings.
- JavaScript: vanilla ES5/ES6, semicolons, IIFE/module pattern as in `navigation.js`.
- CSS: kebab-case class names; keep variables in `variables.css` and reusable parts in `components.css`.
- Filenames/paths: kebab-case (`test-mobile.html`, `theme-toggle.js`). Keep locale pages under `en/` or `jp/` mirroring structure.
- Accessibility: maintain 44px touch targets, `aria-*` where applicable, and visible focus styles.

## Testing Guidelines
- Manual verification across desktop and mobile (iOS Safari, Android Chrome): header/nav, language switch, theme toggle, and scroll behaviors.
- Use provided pages for checks: `test-mobile.html`, `test-responsive-menu.html`, `test-theme-toggle.html`.
- Verify both locales (`en/`, `jp/`) and `nanomaterial/` variants. Validate HTML and run Lighthouse locally when possible.

## Commit & Pull Request Guidelines
- Commit messages: imperative and concise (e.g., "Fix mobile header overflow"). Prefer Conventional Commits (`feat:`, `fix:`, `docs:`, with scopes like `nav`, `mobile`).
- PRs include: clear description, before/after screenshots for UI, affected pages/locales, test notes (devices/browsers), and linked issues.

## Security & Configuration Tips
- Keep `.htaccess`, `web.config`, `robots.txt`, and `sitemap.xml` in sync with route or locale changes.
- Do not expose `.claude/` or `webpage_generate/memory/` to production. Never commit secrets.
- Read `CLAUDE.md` and `MOBILE-IMPLEMENTATION-GUIDE.md` before large UI/mobile changes.

