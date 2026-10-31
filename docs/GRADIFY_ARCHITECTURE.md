# Gradify architecture

What the repository actually contains, checked against the code on 31 October 2026 (kit version 1.9.0). Where an older document says something different, this one describes the code.

## In one paragraph

Gradify is a **static site with no build step**: plain HTML pages, ES modules and CSS, served by GitHub Pages from the `main` branch root at `https://getgradify.com`. Every sub-site (LawGradify, NurseGradify, MedGradify…) is a folder in this one repository (`/lawgradify/`, `/nursegradify/`), and they all import the same shared library, **the Gradify Kit** (`kit/`). One Supabase project (database, auth, one Edge Function) is shared by every site, so one account and one learner's progress work everywhere. There is no framework, bundler or server of our own.

## Repository map

| Path | What it is | Shared? |
|---|---|---|
| `index.html`, `assets/` | The getgradify.com homepage: directory of sites, feature bubbles, the Gradify road, LifeOS preview, FAQ | Homepage only |
| `app.html` | The Gradify app for the whole family (no single site; sees every site's data) | Uses the kit |
| `gradify.config.js` | `SITE` (normally `null`), `SUPABASE_URL`, `SUPABASE_ANON_KEY` (both currently empty, so everything runs in "this device" mode) | Read by the kit |
| `kit/` | The Gradify Kit: everything sub-sites share (see below) | **Shared by every site** |
| `<site>gradify/` | One folder per sub-site (31 of them): `index.html`, `app.html`, `map.html`, `lifeos.html`, optionally `3d.html` and course folders | Per site |
| `scigradify/physics/` | The reference course page: mounts the course engine on the physics curriculum | Per site |
| `lawgradify/course/`, `nursegradify/course/` | The law and nursing course pages (this work) | Per site |
| `supabase/migrations/` | Database schema, row-level security, XP triggers | Shared backend |
| `supabase/functions/study-pack/` | The only server code: the Gradify AI Edge Function (notes → study pack) | Shared backend |
| `supabase/dashboard/` | A single-file build of the function for pasting into the Supabase dashboard (`npm run build:dashboard`) | Shared backend |
| `scripts/` | `new-site`, `add-3d`, `sync` (copies `kit/notes/pack.js` into the function), `eval` (pack quality), `check-body-layers` | Tooling |
| `tests/` | `node --test` unit tests (`npm test`) | Tooling |
| `sw.js`, `manifest.webmanifest` | Installable PWA; network-first service worker with an offline shell list (`SHELL`) | Whole domain |
| `docs/` | Documentation | |

## The Gradify Kit (`kit/`)

| Folder | Contents | Status in code |
|---|---|---|
| `core/` | `sites.js` (every site: name, audience, icon, colour, domain, `built`), `site.js` (which site a page is: `<meta name="gradify-site">` or folder name; `nameHtml`, `accentOf`), `site-pages.js` (each homepage's hero copy), `site-content.js` (the rest of each homepage, by audience "kind"), `site-maps.js` (learning-map subtopics), `subsite-home.js` (draws the homepage sections), `icons.js`, `colour.js` | Real |
| `styles/` | `base.css` (tokens: `--bg --fg --mute --faint --line --panel --sans --mono --spectrum`, glass, buttons, top bar), `components.css`, `subsite.css` (sub-site shell), `course.css` (course engine), `model.css`, `body.css` | Real |
| `app/` | The study app (`main.js`): setup, add notes, deck, study session, Today, Topic, Progress, Plan, Account. Hash routes `#/start`, `#/new`, `#/notes`, `#/deck/:id`, `#/study`, `#/today`, `#/topic/:key`, `#/progress`, `#/plan`, `#/account` | Real |
| `data/store.js` | `LocalStore` (browser `localStorage`) and `CloudStore` (Supabase) with the same async API; `scopeToSite` limits a store to one site's rows | Real |
| `notes/` | `engine.js` (calls the Edge Function when signed in, else the browser extractor), `pack.js` (schema, system prompt, card building; shared with the function via `npm run sync`), `studio.js` (Notes Studio: clean notes, mind map, poster, chant, audio quiz), `video3d.js` | Real |
| `learning/` | `srs.js` (spaced repetition), `mastery.js` (the Mastery Engine: recall, explanation, application, confidence, retention per topic), `topic-match.js` | Real, unit-tested |
| `course/` | **The course engine** (`course.js`), the notes format (`notes.js`) and the road graphics (`road.js`). See `docs/LEARNING_ENGINE.md` | Real |
| `courses/` | Course content: `physics/` (54 units, 1,308 lessons, all written), `law/` and `nursing/` (this work) | Content |
| `models/` | The 3D viewer and one model per site (`index.js` maps site → model). NurseGradify uses `body.js` (BodyParts3D anatomy) | Real |
| `earth/` | The 3D globe and `subject-map.js` (each site's `map.html`) | Real |
| `lifeos/` | The LifeOS window: Today, Plan, Earth, Gradify AI, Study feed, Community… | **Preview on example data** (the "Alex" learner). The Gradify AI chat here is scripted, not a model |
| `sport/` | SportGradify Body Intelligence | Real; actively developed by another stream |
| `templates/subsite/` | Templates `npm run new-site` copies | |
| `vendor/` | pdf.js, supabase-js, three.js, BodyParts3D | Third-party |

## How a page knows which site it is

`kit/core/site.js → currentSite()` reads `<meta name="gradify-site" content="LawGradify">`, then `gradify.config.js`'s `SITE`, then the first folder of the URL. The app then shows that site's brand, skips "which site?" in setup, tags new notes with the site and filters to that site's data (`scopeToSite`). getgradify.com's own `app.html` belongs to no site and sees everything.

## Accounts, data and security

- **Auth:** Supabase Auth (email link, optional Google). Because every site is on getgradify.com, one sign-in covers every site. Redirect URLs must include `https://getgradify.com/**` (`docs/SETUP.md`).
- **Tables** (`supabase/migrations/`): `profiles` (goal, level, site, daily minutes, XP), `documents`, `packs`, `cards`, `reviews` (with mastery evidence), `activity` (site, kind, XP), `plan_blocks`, `waitlist`, and Sport's `workouts`, `body_checkins`, `fitness_tests`. Every table has owner-only RLS (`user_id = auth.uid()`); `waitlist` is insert-only.
- **XP:** only changes through `activity` rows (`add_activity_xp` trigger; `guard_xp` blocks direct writes; capped at 500 per row). XP is still browser-written, so it can be inflated: move it server-side before any real leaderboard.
- **Signed out:** everything works in `LocalStore`; data moves to the account on first sign-in.
- **Secrets:** the Anthropic key exists only as a Supabase secret (`ANTHROPIC_API_KEY`). The anon key in `gradify.config.js` is public by design. No secret is in client code.

## AI

There is **one** real AI feature: the `study-pack` Edge Function. A signed-in learner's notes (text or PDF) go to Claude with a structured-output schema; the function returns a knowledge pack and cards, each card checked against a quote from the notes (`grounded: yes | partly | no | bonus`). Modes: `pack`, `card` (regenerate one), `questions` (add why/apply questions). Limits: `GRADIFY_DAILY_PACKS` (10/day), `GRADIFY_MAX_CHARS`, `GRADIFY_ALLOWED_ORIGINS`. Signed out, `kit/notes/pack.js` runs a rule-based extractor in the browser instead.

Not real yet: the Gradify AI chat (scripted preview in `kit/lifeos/assistant.js`), adaptive difficulty, AI marking of free-text answers. `docs/AI-PIPELINE.md` is the plan for the wider pipeline; most of it is unbuilt.

## Subscriptions and entitlements

**Not built.** There is no payment provider, no `subscriptions` or `entitlements` table and no gating anywhere. `docs/ECOSYSTEM.md` has the agreed plan (webhook → Edge Function with the service role → read-only rows for browsers). Courses are currently free and open, and new sites should keep their free tier working when entitlements arrive.

## Deployment

Push to `main` and GitHub Pages publishes within about a minute (`CNAME` = getgradify.com, `.nojekyll`, DNS on Cloudflare). The service worker fetches network-first; add new shell files to `SHELL` in `sw.js` and bump `CACHE`. Sub-site domains (e.g. gradifylaw.com) are meant to forward to their folder later (Cloudflare); today the directory links to the folder because each site is `built: true`.

## Things the brief assumed that aren't in this repository

- **TechGradify** is not here. It is an external, not-yet-live product (`techgradify.com`, `soon: true` in `sites.js`). The reference implementation for a structured subject site inside this repository is **SciGradify Physics** (`scigradify/physics/` + `kit/courses/physics/` + `kit/course/`).
- **LifeOS / daily intelligence briefing** belongs to the central Gradify app; sub-sites only link to their `lifeos.html` preview. Nothing for LawGradify or NurseGradify touches LifeOS.

## Testing

`npm test` runs `tests/*.mjs` with Node's test runner: site registry and homepage content, the Mastery Engine, the notes pack, questions, the 3D models, the physics course and (this work) `tests/courses.test.mjs` for law and nursing. Browser checks are ad hoc with the pre-installed Playwright (`scripts/check-body-layers.cjs` is an example).
