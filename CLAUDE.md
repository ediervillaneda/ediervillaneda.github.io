# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio / CV site for Edier Villaneda, built with Angular 21 (standalone components). UI text and much of the code (e.g. `cargando`, `cargarResumen`) are in Spanish — keep new user-facing text in Spanish.

## Commands

- `npm start` — dev server at http://localhost:4200
- `npm run build` — production build to `dist/` (browser output lands in `dist/browser`)
- `npm test` — Karma/Jasmine in watch mode; for a single run: `npx ng test --watch=false`
- Single spec: `npx ng test --watch=false --include src/app/services/resume.service.spec.ts`
- `npm run release` — pulls tags and bumps the **minor** version (`npm version minor`, commit message "Update to x.y.z")

There is no lint script configured.

## Architecture

- **Bootstrapping**: `src/main.ts` → `bootstrapApplication(AppComponent, appConfig)`. `app.config.ts` provides zone change detection, the router with **hash location** (`withHashLocation()`), and `HttpClient`. `app.module.ts` and `app-routing.module.ts` are legacy NgModule leftovers that are not used by the bootstrap; routes actually live in `app.routes.ts`.
- **Single-page layout**: `app.component.html` renders every section in order (header, hero, about, facts, skills, resume, portfolio, services, references, contact, footer). Routes (`home`, `about`, `contact`, `resume`) exist but the page is essentially one long scrolling document. Section components live in `src/app/pages/`, shared chrome (header/hero/footer) in `src/app/share/`.
- **Data layer**: content is not hard-coded in templates. Each `src/app/services/*.service.ts` fetches `${GlobalCostants.firebaseUrl}/<name>.json` (Firebase Realtime Database REST endpoint, configured in `src/app/global.constants.ts`) in its constructor and exposes the result as a public field plus a `cargando` loading flag. Components inject the service publicly (e.g. `public _portfolio: PortfolioService`) and read its fields directly in templates. Typings are in `src/app/interfaces/` (note several files use the misspelled suffix `.interfase.ts`).
- **`firebase-data/`**: JSON snapshots mirroring the Realtime Database nodes (`hero.json`, `resumen.json`, `portfolio.json`, ...). Changing content means updating the database; these files are the reference/seed copy and are not read by the app at runtime.
- **Theme / vendor assets**: visual styling comes from a Bootstrap-based template under `src/assets/` (vendor CSS/JS plus `assets/css/style.css` and `assets/js/main.js`). These are loaded globally via the `styles` and `scripts` arrays in `angular.json` (jQuery, Bootstrap, Isotope, AOS, Owl Carousel, etc.), so some behavior (scroll, animations, preloader) is driven by `main.js` outside Angular.

## Deployment

Two GitHub Actions workflows run on push to `master`:
- `.github/workflows/firebase-hosting-merge.yml` — builds and deploys to Firebase Hosting (project `ediervillaneda-a5ab2`; `firebase.json` serves `dist/browser` with SPA rewrites).
- `.github/workflows/deploy-gh-pages.yml` — builds with `--base-href /` and deploys `dist/browser` to GitHub Pages.

Cloudflare Workers Builds is also connected to the repo (configured in the Cloudflare dashboard, not in a workflow). `wrangler.jsonc` serves `dist/browser` as static assets with SPA fallback; validate locally with `npm run build && npx wrangler deploy --dry-run`.
