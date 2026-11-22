# Moving Gradify to Next.js: a plan to decide on

Status: **proposal, nothing migrated.** Written 22 November 2026. The Apple-first design system
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
- **Bundle size:** React adds ~45 KB gzipped to pages that had no framework. Marketing pages can stay mostly
  server-rendered HTML with small client islands.
- **Hosting:** static export rules out Next.js server features (API routes, ISR, middleware). Gradify doesn't use
  them today; if it needs them later, that's the moment to move hosting, not before.

## Decisions for you

1. Go ahead with phase 0 (no visible change), or keep building features on the current stack for now?
2. Stay on GitHub Pages with static export (recommended), or move hosting now?
3. Who builds it: this is several months of focused work and benefits from a developer owning it.
