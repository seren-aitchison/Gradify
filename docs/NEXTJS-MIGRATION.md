# Moving Gradify to Next.js: a plan to decide on

Status: **proposal, nothing migrated.** Written 22 November 2026; proof of concept run 23 November 2026 (below). The Apple-first design system
(`kit/design/tokens.json`, `kit/styles/system.css`, `docs/DESIGN-SYSTEM.md`) is being rolled out on the current site
now and carries straight over; this document is about the platform underneath it.

## Where Gradify is today

| | |
| --- | --- |
| Pages | 195 published HTML pages: the homepage, 30+ subject sites, 34 course pages, the app, pricing, Explore, Journey |
| Code | 1,202 ES modules in `kit/` (about 547,000 lines, most of it course notes as data), no framework |
| Build | None needed to run; CI checks generated files and minifies CSS and JS with esbuild (`scripts/build-site.mjs`) |
| Hosting | GitHub Pages, deployed from `main`; Cloudflare DNS; a service worker for offline use |
| Backend | Supabase: 24 migrations, 9 Edge Functions (billing, AI tutor, study packs, calendar, push) |
| Tests | 116 test files (`node --test`) plus Playwright scripts for the site, labs and sync |

This works, it's fast (pages load in a few hundred milliseconds), and it has no framework to upgrade. What it lacks is
what a framework gives a growing team: typed components, one way to build a screen, and an ecosystem (Radix, Motion,
React Three Fiber, ECharts) instead of hand-written equivalents.

## Recommendation

**Move incrementally, not as a rewrite.** Gradify's kit is plain ES modules with `mount…(element, options)` entry
points (`mountCourse`, `mountJourney`, `mountHabits`, the study app's router). React can host those unchanged inside
client components, so pages can move one at a time while every course keeps working. A big-bang rewrite of 547,000
lines would freeze product work for months and put every URL, test and offline guarantee at risk at once.

**Start with Next.js static export (`output: "export"`) on GitHub Pages.** Same hosting, same URLs, no servers to run.
Move to Vercel (or similar) only if a real need for server rendering or server routes appears; Supabase already
covers the backend.

## The stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Language | TypeScript | New code typed from day one; kit modules gain `.d.ts` types as they're touched, not all at once |
| Framework | Next.js (App Router, static export) | One route per existing URL |
| Styling | Tailwind CSS | Theme generated from `kit/design/tokens.json` (below), so the design system has one source |
| Primitives | Radix UI | Dialogs, menus, tabs, tooltips: replaces `kit/ui/overlay.js` and `disclosure.js` over time |
| Animation | Motion | For the selective cinematic moments; reduced motion respected |
| 3D | Three.js / React Three Fiber | Anatomy, Earth, the shelf; existing Three.js code can be wrapped first |
| Icons | Lucide | Gradify's own icon names mapped to Lucide equivalents |
| Charts | Apache ECharts | Progress and analytics |
| Testing | Vitest + Playwright | The existing `node --test` suites run under Vitest with little change |

## Tokens → Tailwind

`kit/design/tokens.json` maps directly onto `tailwind.config.ts`:

```ts
import tokens from "./kit/design/tokens.json";
export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    fontFamily: { display: tokens.font.display, sans: tokens.font.text, mono: tokens.font.mono },
    fontSize: Object.fromEntries(Object.entries(tokens.type).map(([k, t]) => [k, [t.size, { lineHeight: t.line, letterSpacing: t.tracking, fontWeight: t.weight }]])),
    spacing: tokens.space, borderRadius: tokens.radius, maxWidth: tokens.width,
    colors: { /* CSS variables per theme, e.g. bg: "var(--ds-bg)", generated from tokens.colour.light/dark */ },
    transitionTimingFunction: { apple: tokens.motion.ease, out: tokens.motion["ease-out"] },
  },
};
```

The `--ds-*` CSS variables stay, so pages on the old stack and the new one look identical during the move.

## Order of work

| Phase | What moves | Why this order | Rough effort |
| --- | --- | --- | --- |
| 0. Foundations | Next.js app in the repo beside the current site; Tailwind from the tokens; Radix, Lucide; CI builds both; a page-by-page switch in the deploy | Nothing visible changes; proves the pipeline | 1–2 weeks |
| 1. Marketing | Homepage, pricing, Explore, privacy and terms as React pages | Mostly static content; biggest visual payoff; lowest risk | 2–3 weeks |
| 2. Subject sites | The 30+ subject homepages, generated from `kit/core/site-content.js` as one template | One template replaces 30 HTML files | 2 weeks |
| 3. App shell | The study app (`app.html`) and Journey as React routes, hosting the existing screens first, then rebuilding screens one by one on Radix | Highest interaction density; benefits most from components | 4–6 weeks |
| 4. Courses | The course shell (navigation, outline, palette) in React; lessons, labs and notes stay kit modules mounted inside | The course engine is the most proven code; move the frame, keep the engine | 4–6 weeks |
| 5. Tidy | Retire replaced kit modules, the HTML copies and `scripts/sync-headers.mjs`; types across what remains | Only once nothing depends on them | 2 weeks |

**About 4 to 5 months of focused work** for one experienced developer, less with two. Each phase ships on its own and
can pause without leaving the site half-broken.

## What must not break

- **URLs.** Every published path (getgradify.com/medgradify/, /scigradify/chemistry/, hash routes like
  `#/lesson/u01-02`) stays identical. Courses keep hash routing so saved links and the service worker keep working.
- **Offline.** The service worker's shell list is regenerated from the Next.js build output; `tests/offline.test.mjs`
  moves over.
- **Progress.** Course progress lives in `localStorage` under `gradify.course.<slug>` and syncs through Supabase; the
  keys and formats don't change.
- **Speed.** Static export with route-level code splitting should match today's load times; each phase is checked with
  the existing Playwright load checks before it ships.
- **The test suite.** Ported to Vitest in phase 0, so every later phase runs against the same checks.

## Risks

- **Two systems at once** for the length of the migration: a page-level switch in the deploy and one design system
  (shared tokens) keep it manageable.
- **Bundle size:** measured in the proof of concept, Next.js 16 with React 19 adds **about 136 KB of JavaScript,
  gzipped**, to every page (plus a 39 KB polyfill file that only old browsers download). The earlier estimate of
  ~45 KB was React alone and too low. Marketing pages can stay mostly
  server-rendered HTML with small client islands.
- **Hosting:** static export rules out Next.js server features (API routes, ISR, middleware). Gradify doesn't use
  them today; if it needs them later, that's the moment to move hosting, not before.

## Proof of concept (23 November 2026)

`poc/nextjs/` is a minimal Next.js 16 app (App Router, `output: "export"`, React 19, TypeScript). It is never
published (`scripts/build-site.mjs` lists `poc/` as excluded) and changes nothing on the live site. It has three
routes: a React homepage on the design-system tokens, `/privacy.html` (a content page that must keep its `.html` URL),
and `/lawgradify/course/`, the real Law course (19 schools, 480 lessons) mounted by the existing engine.

Run it, from a fresh checkout:

```bash
npm ci
```

```bash
npx playwright install chromium
```

```bash
cd poc/nextjs && npm install && npm run build && npm run verify
```

The first two install the repository's development tools, including Playwright, which the verify scripts load from
the root `node_modules`, and its Chromium browser. (Skip the second where Chromium is already installed for
Playwright.) The verify scripts serve `out/` the way GitHub Pages does and drive Chromium. Each result is a pass/fail
check, and any failure makes `npm run verify` exit non-zero: 27 checks in `verify.cjs`, 4 in `parity.cjs`.

| Question | Result |
| --- | --- |
| **Asset paths** | Pass. `public/` links to the repository's `kit/`, `assets/`, `sw.js`, `manifest.webmanifest` and `gradify.config.js`, and `next build` copies them into `out/` at their current paths. Stylesheets and `theme-boot.js` load from `/kit/…` exactly as the static pages load them; `--ds-*` tokens and the device theme apply. No failed requests. |
| **Course notes** | Pass. The course engine and the Law curriculum are loaded at runtime with `import(/* webpackIgnore: true */ "/kit/…")`, not bundled: no Next chunk contains the notes or the engine, and the whole `_next/` folder is 616 KB uncompressed for every page together. The course renders 388 elements, opens a real lesson by its own hash route (`#/lesson/u01-01`) with its notes, and navigating to it from the React homepage is client-side (no reload). |
| **Saved progress** | Pass. Progress is the same `localStorage` keys (`gradify.course.law`, `gradify.ui`) on the same origin. With the saved state from the current static course, the Next.js course home and the lesson `#/lesson/u01-01` render identically (the first 600 characters of each compared). |
| **Offline** | Pass, **with a generated service worker**. Used as it is, the existing `sw.js` would fail to install, because its list names pages the Next build doesn't produce (`app.html`, `explore.html`) and it doesn't know Next's chunk files. `postbuild.mjs` rewrites `SHELL` from the build output: the built pages (as `privacy/`, not `privacy/index.html`, so the cached key matches the URL the browser asks for), the kit files that exist and Next's `_next/static` chunks. Offline, the homepage, the Law course (fully working), `/privacy.html` and `/privacy/` all load. |
| **Existing `.html` URLs** | Pass, **with a post-build step**. No single Next setting keeps every URL. Without trailing slashes, `privacy.html` survives but the course becomes `lawgradify/course.html` (the current URL `/lawgradify/course/` would 404). With `trailingSlash: true`, folders survive but `/privacy.html` 404s. GitHub Pages can't redirect. The fix that worked: `trailingSlash: true`, then `postbuild.mjs` copies `privacy/index.html` to `privacy.html` for each legacy page. All 10 URLs checked return 200 (or GitHub Pages' usual 301 to add a slash). |

### Limitations found

1. **JavaScript weight.** About 136 KB gzipped of framework on every page (above). Today's static pages load no
   framework. For marketing and content pages this is the main cost of the move; it argues for keeping them mostly
   static HTML with small client islands, and for measuring load time on real phones before phase 1 ships.
2. **The service worker must be generated.** It can't be hand-kept once Next names its chunks by content hash. The
   PoC script is a starting point; the real one also needs the deploy stamp `scripts/build-site.mjs` adds today and
   `tests/offline.test.mjs` pointed at the build output.
3. **Two copies of legacy `.html` pages.** Each legacy page exists as `x.html` and `x/index.html`. Harmless for
   visitors, but the sitemap and canonical links must name one (the `.html` URL, as today).
4. **Course pages are client-rendered.** The course appears after the engine loads, as it does today. Server-rendering
   course content would mean moving the notes into the bundler: the opposite of what keeps the bundle small.
5. **Kit modules are untyped.** Runtime imports from `/kit/…` are `any` to TypeScript. Types come from `.d.ts` files
   added as modules are touched.
6. **Not tested in the PoC:** the study app (`app.html`), Supabase sign-in and sync, subject-site homepages, Safari,
   Firefox, Android, screen readers, and load time on a deployed host. Chromium only.
7. **Build time and size.** `next build` copies the 97 MB `kit/` folder into `out/`; fine for CI, but the deploy should
   publish from `out/` instead of building the site twice.
8. **The course engine can't be unmounted.** `mountCourse` adds window listeners, a timer and the assistant's UI on
   `document.body`, and returns no way to remove them. On today's static pages that's fine: leaving the course is a full
   page load. In a React app that navigates without reloading, leaving and reopening the course would leave the old
   engine running beside a new one. Before courses move (phase 4), `mountCourse` needs to return a `dispose()` that
   removes all of it, and the React wrapper must call it on unmount. Not changed in the PoC, because that's a change to
   the production course engine.

## Decisions for you

1. Go ahead with phase 0 (no visible change), or keep building features on the current stack for now? The PoC shows
   the move is technically safe for URLs, offline use, course notes and saved progress; the open cost is ~136 KB
   of framework JavaScript per page.
2. Stay on GitHub Pages with static export (recommended), or move hosting now?
3. Who builds it: this is several months of focused work and benefits from a developer owning it.
