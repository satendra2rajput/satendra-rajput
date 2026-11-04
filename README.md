# satendra2rajput.com — Angular 22 + SCSS

Light, bento-card portfolio: rotating hero headline, scroll reveals, a Serotask mini-preview,
a company-branded timeline with auto-calculated durations, a draggable Angular-libraries slider
with copy-to-clipboard `npm i` commands, and a light/dark toggle.

## Run

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build → dist/
```

### Requirements (Angular 22)

| | |
|---|---|
| Node.js | `^22.12.0` or `>=24` (Angular 22 dropped Node 20) — check with `node -v` |
| TypeScript | `~6.0` (installed by `npm install`; Angular 22 only accepts 6.0.x) |
| Angular | `^22.0.0` — all `@angular/*` packages must be on the same major version |
| zone.js | **not used** — the app is zoneless (Angular 22's default) |

If `npm install` complains about peer dependencies, you most likely have an older
`node_modules`/`package-lock.json` from an earlier version of this project — delete both
and run `npm install` again. If you use a global CLI, `ng version` should show 22.x.

### Troubleshooting

| Error | Cause / fix |
|---|---|
| `TS2307: Cannot find module '@angular/router'` (followed by many `NG1010 'imports' must be an array…`) | `@angular/router` isn't in `node_modules`. Run `rm -rf node_modules package-lock.json && npm install` **in this folder**. If you copied only `src/` into another project, copy this project's `package.json` too (or `npm i @angular/router@^22`). `npm start` / `npm run build` now run `scripts/check-install.mjs` first and tell you exactly what's missing. |
| `npm ERR! ERESOLVE … peer typescript` | An old `node_modules`/`package-lock.json` from the Angular 20 version of this project — delete both and `npm install`. Angular 22 needs TypeScript 6.0.x. |
| `The engine "node" is incompatible` / odd CLI errors | Use Node 22.12+ or 24+ (`node -v`). |
| UI doesn't update after changing a field | The app is zoneless — keep template state in a `signal()` (see below). |

### Zoneless, signals-first

There is no `zone.js` and no `provideZoneChangeDetection()`. Change detection is driven by
signal updates, template event listeners, `input()` changes and the `async` pipe, so **any state a template
reads must live in a `signal()`/`computed()`** — a plain field that you mutate from a timer or
a DOM listener will *not* re-render. Listeners that only write CSS variables / classes straight
to the DOM (`SpotlightDirective`, `RevealDirective`, `CountUpDirective`) deliberately use
`addEventListener` / `IntersectionObserver` so they don't schedule change detection.

Dependencies are injected with field-level `inject()` (`private readonly router = inject(Router)`)
— the recommended style; constructors are only used for setup work like `afterNextRender(...)`.

## Edit your content

Everything on the page is data-driven from **one file**:

`src/app/core/data/portfolio.data.ts`

| What | Where |
|---|---|
| Name, links (GitHub / LinkedIn / Resume / npm) | `PROFILE` |
| Timeline — companies, each with one or more roles | `TIMELINE` → `roles[]`, LinkedIn-style |
| Serotask preview tiles (category + tool count) | `SERO_TILES`, `SERO_SINCE` |
| Skills groups + "Currently learning" | `SKILL_GROUPS`, `LEARNING` |
| Serotask card (featured Work project) | `SEROTASK_PROJECT` |
| 9 npm packages (version, description, tags, icon) | `LIBRARIES` (still under the `@kudoengineer` npm scope — see note below) |
| Client & product projects | `PROJECTS` — dates same `'YYYY-MM'` format |
| About stats | `ABOUT_STATS` |
| Blog posts | `BLOG_POSTS` — newest first, `body` is one paragraph per array entry |

### Timeline (`TIMELINE`)

Each entry is a company (or a personal project) with one or more roles, newest first:

```ts
{
  org: 'Redmil Business Mall',
  kind: 'Company',
  logo: 'assets/images/redmil-logo.png',
  tile: true,            // true = logo sits in a small white tile (for logos with a light background)
  roles: [
    { title: 'Software Engineer', from: '2024-05', to: '2025-11', promoted: true, points: ['…', '…'] },
    { title: 'Angular Developer', from: '2022-04', to: '2024-04', points: ['…'] },
  ],
}
```

- Dates are `'YYYY-MM'`; leave `to` out for "Present" — its duration keeps counting up to today.
- The company's own total period/duration (shown next to the logo) is calculated automatically from its roles — earliest `from`, and the latest `to` unless a role is still running.
- A role without `roles` (just `from`/`to`/`role`/`text`) renders as a single simple entry — used for personal projects like the commented-out SeroTask example in the file.

Durations ("3 Years 5 Months") and periods ("Apr 2022 – Aug 2025") are calculated automatically
from the dates by `DurationPipe` / `PeriodPipe` — entries without `to` keep counting up to today.

## Rebranding note: KudoEngineer → Serotask

The personal project is now shown as **Serotask** everywhere (Work card, Timeline,
About badge, hero bio, favicon, meta tags) — `src/assets/images/serotask-logo.png`
is a simple placeholder "S" mark; drop in the real logo under that filename (and
`serotask-logo.svg` for the favicon) once you have one.

**The 9 published npm packages are untouched** — they're real, already live at
`https://www.npmjs.com/~kudoengineer`, and `NPM_SCOPE` / `PROFILE.links.npm` still
point there. Renaming that scope in the data file would make every "npm i" button
and npm link reference packages that don't exist under the new name. Publish under
a new scope on npm first, then update `NPM_SCOPE` and `PROFILE.links.npm` to match.

**What Serotask actually is**, now consolidated to one consistent description
everywhere it's mentioned: an all-in-one online tools platform — PDF Tools (40+),
Image Tools (50+), SEO Tools (20+), Developer Tools (40+), and a Resume Builder.
That's `SEROTASK_PROJECT` (the Work card) and `SERO_TILES` (the mini preview
inside the "4.5+" card, one entry per category with its tool count) in
`portfolio.data.ts`. The earlier duplicate `PROJECTS` entry ("Serotask —
All-in-One SaaS Platform", with its own conflicting Feb 2026 date and AI-tools
description) has been removed — the Work card is now the one place this product
is described. `SERO_SINCE` is the mini preview's "since" badge; the Resume
Builder tile has no tool count (`SeroTile.count` is optional) since none was given —
update it if there's a real number.

## Blog

A real Angular Router now runs the site: `/` is the page above, `/blog` lists
posts from `BLOG_POSTS`, `/blog/:slug` renders one post (route param bound
straight to the component via `withComponentInputBinding()` — see
`app.config.ts`). The nav's "Blog" link and its section links both work from
any page; add, edit or remove posts in `BLOG_POSTS` and both pages update.

Each post page also shows a byline with a "Copy link" button, and — when
there's a newer or older post — a "Newer / Older" nav strip at the bottom so
posts link to each other (helps readers and helps search engines crawl
through the whole blog, not just the list page).

## SEO

`core/services/seo.service.ts` keeps the tab title, meta description, canonical
link, Open Graph / Twitter tags and one JSON-LD block in sync with whatever
route is active — called from each page's constructor (`HomeComponent`,
`BlogListComponent`, `BlogPostComponent`). A post's JSON-LD is `BlogPosting`;
the blog list's is a `Blog` with a `blogPost` array (every post, for Google's
sitelinks); the `Person` schema for the home page stays static in
`index.html` since it never changes per route. A post that doesn't match any
slug gets `noindex` and no JSON-LD, instead of leaving stale post data behind.

**Important caveat:** this is a client-rendered (CSR) Angular app, not
server-rendered. Googlebot executes JavaScript and will see the per-route
tags `SeoService` sets. Most social-media link-unfurlers (Slack, X/Twitter,
iMessage, WhatsApp) do **not** run JavaScript — they only ever read
`index.html`'s static `<head>`, so a link to `/blog/some-post` shared on
those platforms will show the site's default title/description/image, not
that post's. If per-post share cards matter, the real fix is prerendering
each route at build time (`@angular/ssr`'s static prerender) or full SSR —
worth doing before relying on social previews.

- `src/robots.txt` / `src/sitemap.xml` — copied to the site root by the
  `assets` entries in `angular.json`. `sitemap.xml` is hand-written; add a
  `<url>` block for every new slug in `BLOG_POSTS` (and update `<lastmod>` on
  edits) — nothing generates it automatically yet.
- `src/assets/images/og-image.png` (1200×630) — default share image, used by
  the home page and as the article image for every blog post.
- `src/assets/images/og-blog.png` (1200×630) — share image for `/blog` itself.
- `SITE_URL` in `portfolio.data.ts` feeds every canonical URL, `og:url` and
  sitemap entry — keep it pointed at wherever the site is actually deployed.

## Images

| File | Used for |
|---|---|
| `src/assets/images/satendra.webp` | Hero + About portrait (already a transparent cutout) |
| `src/assets/images/contact-photo.webp` | Contact section portrait |
| `src/assets/images/serotask-logo.png` / `.svg` | Timeline, Work card, libraries header, About badge, favicon (placeholder "S" mark — swap in the real logo under this filename) |
| `src/assets/images/vastika-logo.png` | Timeline |
| `src/assets/images/redmil-logo.png` | Timeline |
| `src/assets/images/og-image.png` / `og-blog.png` | Social-share preview images — see SEO section above |
| `src/assets/resume.pdf` | Add this — the Contact "Resume" button points here |

## How it works

- **Theme**: `ThemeService` — a signal, persisted to `localStorage`, applied as `<html data-theme="light|dark">`.
  No saved choice = follows the OS setting. `src/index.html` has a tiny inline script that applies the saved
  choice before first paint (no flash).
- **Reveal-on-scroll**: `RevealDirective` (`appReveal`, optional delay in ms) — adds the `rv`/`on` classes;
  styling lives in `styles/_base.scss`.
- **Card spotlight**: one `SpotlightDirective` on `<main>` (event delegation) drives the mouse-follow glow on `.card`.
- **Count-up**: `CountUpDirective` (`appCountUp`) animates a number once it scrolls into view.
- **Libraries slider**: `LibrariesComponent` — native scroll-snap track, arrow buttons, keyboard, mouse-drag
  (touch swipes natively), a live "x–y of 9" counter + progress bar. Package-manager switch (npm/pnpm/yarn) is
  shared app-wide via `PackageManagerService`. Copying uses the Clipboard API with an `execCommand` fallback.
- **Styles**: `styles/styles.scss` `@use`s ordered partials in `styles/_*.scss` (tokens → base → nav → hero →
  each section → responsive overrides last).

## Accessibility & performance

- `prefers-reduced-motion` disables animations and count-ups.
- Marquee, hero role-cycling and card motifs are `aria-hidden`; real content stays in plain text/links.
- Mobile gets a slide-out menu; the libraries slider becomes single-card with native touch swipe.
