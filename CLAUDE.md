# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio / CV site for Edier Villaneda (https://edier.me/), built with Angular 21: standalone components, signals, zoneless change detection, no router. The site is bilingual (Spanish default, English).

## Commands

- `npm start` — dev server at http://localhost:4200
- `npm run build` — production build; output in `dist/browser` (all three deploys publish that folder)
- `npm test` — Vitest in watch mode; `npm run test:ci` runs once (what CI uses)
- Single spec: `npx ng test --watch=false --include src/app/pages/portfolio/portfolio.component.spec.ts`
- `npm run lint` — angular-eslint (TS + template accessibility rules)
- `npm run format` / `npm run format:check` — Prettier (CI fails on unformatted files)
- `npm run release` — pulls tags and bumps the **minor** version (`npm version minor`, commit "Update to x.y.z")

CI (`.github/workflows/ci.yml`) runs format check, lint, build and tests on every PR.

## Architecture

- **Content lives in `firebase-data/es.json` and `firebase-data/en.json`** — one file per language with every section (`hero`, `about`, `facts`, `skills`, `resume`, `portfolio`, `services`, `references`, `contact`) plus all UI strings (`ui`) and page metadata (`meta`). `angular.json` copies them to `data/<lang>.json`. Despite the folder name, the app does not read the Firebase Realtime Database at runtime. Both files must keep the same structure (a spec enforces it), and private data (phone, birthday, age) must not be added back (also enforced by a spec).
- **`src/app/content/`**: `content.model.ts` types the JSON (`SiteContent`); `ContentService` holds the `language` signal (stored in `localStorage`, defaults to the browser language), loads the JSON with `httpResource`, keeps the previous language's content while the next one loads, and syncs `<html lang>`, the title and the meta description.
- **Components** inject `ContentService` as `protected readonly content` and render with `@if (content.content(); as site)`; sections live in `src/app/pages/`, layout pieces (header, hero, footer, back-to-top) and helpers (`InViewDirective`, `CountUp`) in `src/app/share/`.
- **Icons**: Font Awesome icons are registered one by one in `src/app/icons.ts`. Icons named in the JSON (facts, services, social links) must be added there; a spec fails otherwise.
- **Styling**: Bootstrap 5.3 and AOS come from npm; the MyResume template CSS (adapted) is `src/styles.css`. There is no jQuery: smooth scroll is CSS, and the scrollspy, mobile menu, counters, skill bars and back-to-top button are Angular code. Keep the BootstrapMade credit in the footer (template license).
- **Tests** use `src/testing/content-testing.ts`: `provideContentTesting()` (zoneless + HTTP mocks + icons), `startWithLanguage()`, and `flushContent()`, which answers `data/<lang>.json` with the real JSON. Use `TestBed.tick()` before expecting the request; `whenStable()` alone waits on the pending `httpResource`.

## Deployment

Three independent deploys publish `dist/browser` on every push to `master`; don't change how they work without asking:

- `.github/workflows/firebase-hosting-merge.yml` — Firebase Hosting (project `ediervillaneda-a5ab2`).
- `.github/workflows/deploy-gh-pages.yml` — GitHub Pages (builds with `--base-href /`).
- Cloudflare Workers Builds (configured in the Cloudflare dashboard): `npx wrangler deploy` on `master`, `npx wrangler preview` on other branches, using `wrangler.jsonc` (Worker `index`; the `previews` block is required by `wrangler preview`). Validate with `npm run build && npx wrangler deploy --dry-run`.
