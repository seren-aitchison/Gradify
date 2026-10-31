# Gradify Visual Studio, Body Intelligence, Mind, Astrology, News and Culture

**Codebase audit and implementation plan.** Written 31 October 2026, before any of this is built.

This answers the brief's first deliverable: inspect what exists, say what can be reused, what is new, what it costs, what is risky, and in what order to build it. **Nothing in this document is built yet.** Cost and latency figures are engineering estimates to be confirmed with real tests and current provider pricing.

---

## 1. What the codebase actually is

The brief assumes Next.js, Vercel and React. **The live Gradify site uses none of these.** It is:

| Layer | What exists | Where |
|---|---|---|
| Front end | Plain HTML + ES modules, no build step, no framework | `index.html`, `app.html`, `*gradify/` (31 sub-sites), `kit/` |
| Hosting | GitHub Pages on `getgradify.com` (static files only) | `CNAME`, `sw.js` (network-first service worker, offline shell) |
| Shared kit | Site shell, nav, colours, icons, sub-site pages, generated from one config | `kit/core/`, `gradify.config.js`, `scripts/sync-kit.mjs` |
| 3D | Vendored Three.js with bloom post-processing, a shared viewer/engine, 16 interactive models | `kit/vendor/three/`, `kit/models/` |
| Anatomy | **A real anatomy mesh**: BodyParts3D (DBCLS) via open-anatomy-3d, CC BY 4.0, 7.6 MB GLB, 147 catalogued structures including **left/right muscle groups** (quadriceps, hamstrings, gluteal, deltoid, chest, back, calf, trapezius, rotator cuff …) | `kit/vendor/anatomy/`, `kit/models/anatomy-glb.js`, `athlete.js`, `body.js` |
| Accounts and data | Supabase (Postgres + auth + RLS), with a local-browser fallback when not configured | `kit/data/store.js`, `supabase/migrations/` |
| Tables | `profiles`, `documents`, `packs`, `cards`, `reviews`, `activity`, `plan_blocks`, `waitlist`, all owner-only RLS | `supabase/migrations/20261028…`, `20261029…` |
| Server code | One Supabase Edge Function (`study-pack`) that calls Claude with the key held as a Supabase secret | `supabase/functions/study-pack/` |
| Learning engine | Course engine (road, XP, levels, streaks, SRS review, quizzes), Mastery Engine, Life OS (plan, calendar, assistant, community) | `kit/course/`, `kit/learning/`, `kit/lifeos/` |
| Tests | `node --test`, 29 passing | `tests/` |

**Recommendation: do not migrate to Next.js.** Everything below can be added alongside the current stack: new pages in the static site, new Supabase tables and Edge Functions, and separate GPU workers for heavy rendering. A framework migration would cost weeks and preserve nothing the users can see. Revisit it only if server-side rendering becomes necessary (News SEO is the most likely reason; see §7).

### What we can reuse directly

- **`kit/models/engine.js` + `viewer.js`**: orbit/zoom/pan, touch, picking, bloom, labels. This is already an interactive 3D workspace and the natural home of the Visual Studio viewer and Body Intelligence.
- **`anatomy-glb.js`**: per-structure meshes with their own pivots and UVs. Heat-mapping is a per-mesh material change, so no new geometry is needed for a first version.
- **`kit/data/store.js`**: the `LocalStore`/`CloudStore` pattern, so every new feature works signed-out (browser) and signed-in (Supabase).
- **The Edge Function pattern**: the API key stays server-side, and the browser never sees it.
- **XP, levels, streaks and badges** from the course engine, for Sport and Mind missions.

---

## 2. Gradify Visual Studio (prompt → scene → render → interactive)

### 2.1 What is and isn't feasible

The goal is *personalised productions at the quality of the reference images, on demand, within seconds*. Being straight about this:

| Output | Realistic today | Why |
|---|---|---|
| Prompt understood into a structured scene plan | **1–5 s** | One Claude call with a strict schema |
| **Interactive 3D scene in the browser** | **Seconds**, progressively loaded | Real-time Three.js, built from the scene plan plus cached assets |
| Draft animated preview (real-time render, recorded in the browser or on a worker) | **Seconds to tens of seconds** | Real-time rendering, no path tracing |
| Blender **EEVEE** 1080p, 10-second shot (240 frames) | **Minutes** on one cloud GPU | ~0.5–3 s per frame |
| Blender **Cycles** photoreal 4K, 10-second shot | **Hours** on one GPU; minutes only when spread across many GPUs | Tens of seconds to minutes per frame |
| Generative-video "cinematic" clips | Tens of seconds to minutes per clip, via third-party APIs | Beautiful, but **not** an editable or scientifically accurate 3D scene |

So the honest product promise is: **an interactive 3D scene within seconds, a draft animation shortly after, and cinematic renders delivered in the background.** "Photoreal 4K in two seconds for any prompt" is not achievable with any current infrastructure, and the product should never imply it.

### 2.2 Architecture

```
Prompt
  │
  ▼
Director (Supabase Edge Function, model-agnostic adapter; Claude first)
  │  structured output → SceneSpec JSON (schema-validated, versioned)
  ▼
SceneSpec ──────────────┬──────────────────────────────┬─────────────────────────────
                        ▼                              ▼                             ▼
          Browser viewer (Three.js)        Render worker (GPU, isolated)    Optional cinematic layer
          builds the scene immediately     headless Blender + a FIXED         generative video / 3D APIs
          from the spec + asset library    Python builder library             (behind the same adapter)
          → rotate, zoom, pan, select,     reads the spec, never runs          → stylised clips, textures,
            timeline, parameters             model-written code                  props; licence-checked
                        │                  → MP4/WebM + GLB to Storage
                        └──────────────┬───────────────┘
                                       ▼
                     Supabase: projects, scene_versions, render_jobs, assets (+ Storage buckets)
```

Key decisions:

1. **One source of truth: the SceneSpec.** It holds objects (from an asset library or procedural generators), materials, lights, camera shots, a timeline of keyframes and events, labels and narration, plus an explicit `simplifications[]` list for educational accuracy. The viewer and the Blender worker both read the same spec, so the video and the interactive scene always match.
2. **Never execute LLM-generated Python.** Claude outputs data, not code. The worker runs a fixed, tested Gradify library (`build_atom()`, `build_bond()`, `animate_transfer()`, `camera_dolly()` …) that maps spec fields to Blender operations. Unknown fields are rejected. The worker runs in a container with no outbound network access except to Storage, a CPU and time quota, and no secrets beyond a scoped upload token.
3. **Blender never runs on GitHub Pages, Vercel or in the browser.** Workers run on a GPU host (options to compare: Modal, RunPod, Lambda, AWS/GCP spot GPUs, or our own machine for development). Jobs go through a `render_jobs` table: queued → building → rendering → encoding → done/failed, with progress the UI can poll or subscribe to.
4. **Quality comes from assets and procedural systems, not from generating everything per prompt.** That means a curated, licence-clean library (original Gradify assets plus commercially licensed packs), Geometry Nodes generators (terrain, molecules, cells, cables, crowds), and PBR material and lighting presets.
5. **Model-agnostic director.** `director.plan(prompt, context) → SceneSpec` behind an interface; Claude is the first provider. Generative video/3D providers sit behind a separate `media` interface so they can be swapped as the market changes.

### 2.3 First milestone (proof of concept, end-to-end and real)

The hydrogen–fluorine electron transfer, exactly as the brief describes:

1. Prompt box → Director returns a SceneSpec (H and F atoms with correct relative radii, shells, the electron moving from H to F, ion charges appearing, electrostatic attraction, labels, and `simplifications`: "Bohr-style shells are a teaching model; HF is actually a polar covalent molecule, so full transfer to H⁺F⁻ is an idealisation").
2. The viewer renders it immediately: orbit, zoom, pan, object selection, timeline scrubber.
3. The same spec goes to the worker: Blender builds and renders an EEVEE 1080p MP4, uploads it, and the job completes.
4. Save → `projects` + `scene_versions`; reopen, duplicate and remix (edit the prompt or parameters → new version).

Exit criteria: all four steps work on a real GPU worker with a real Blender render, with timings measured and published internally.

### 2.4 Indicative costs (to confirm)

- **Claude planning**: a few thousand tokens per prompt, so fractions of a penny to a few pence depending on model.
- **GPU rendering**: cloud GPUs cost roughly £0.40–£3 per GPU-hour. An EEVEE 10-second 1080p shot takes a few GPU-minutes (≈ pennies). A Cycles 4K shot can take several GPU-hours (≈ pounds per shot). This is why cinematic renders should be a Pro or credit-metered feature.
- **Generative video APIs**: priced per second of output and changing quickly. Benchmark them in Phase 2 and check commercial-use terms before any user-facing use.
- **Storage/egress**: video dominates. Use Supabase Storage or object storage with a CDN.

---

## 3. Gradify Sport: Body Intelligence (buildable now)

The existing anatomy GLB already separates the muscle groups by side, so a real, interactive, tappable heat-map body can be built **in this repository without new infrastructure**.

**Data model** (new Supabase tables, owner-only RLS, plus a local fallback):
- `exercises`: a shared catalogue with primary and secondary muscle groups and weights (e.g. back squat: quadriceps 1.0, gluteal 0.8, adductors 0.5, hamstrings 0.3, back 0.3).
- `workouts`, `workout_sets`: exercise, load, reps, RPE, date.
- `body_checkins`: optional soreness per muscle group, fatigue, body measurements.
- `fitness_tests`: measured results (5 km time, VO₂max estimate, sit-and-reach, plank, 1RM tests).

**Four modes, each with an honest label:**

| Mode | Computation | Label shown |
|---|---|---|
| Training stimulus | Σ sets × muscle weight × intensity factor, decayed with a ~7-day half-life | "Recent training stimulus (from your logs)" |
| Development | Trend in estimated 1RM per muscle group (Epley: 1RM ≈ w(1 + r/30)), volume trend | "Estimated strength progression", never "muscle size" |
| Recovery | Recent stimulus vs time since, adjusted by reported soreness | "Recovery estimate (not a medical assessment)" |
| Fitness and performance | Measured tests only, compared with the user's own baseline | "Measured" (test date shown) |

**Viewer:** per-mesh colour ramp (deep blue → teal → yellow → orange → red), with the shared viewer's rotate, pinch-zoom, pan and tap. Tapping opens a panel with anatomy, stimulus, trend chart, exercises and recovery. Tapping an exercise highlights its primary and secondary muscles. A date slider compares any two dates.

**About "4K HD":** BodyParts3D is anatomically accurate, scan-derived geometry, but it is untextured and won't look like the photoreal renders in the references. To reach that look:
1. A licensed or commissioned premium anatomy asset: high-resolution PBR textures, separated muscles, LODs for phone and desktop, and a licence that **explicitly permits embedding in an interactive app**. Many stock licences do not; this must be checked before purchase.
2. Upgrade materials (subsurface-style shading, normal maps), environment lighting and post-processing (already available: bloom and tone mapping).

Build Body Intelligence on the current mesh first so the data and interaction are real, then swap in the premium asset without changing the data layer.

---

## 4. Gradify Mind (wellbeing)

| Feature | Plan | Notes |
|---|---|---|
| Daily check-in | Mood (5-point), stress, energy, sleep, connection, optional note | 30–60 s; no streak penalties; XP never lost |
| Journal | Private entries, gratitude, intentions, letters to future self | Private by default; consider **client-side encryption** so even Gradify can't read entries |
| Sounds | Mixer with timer and favourites | White, pink and brown noise **can be synthesised now** with Web Audio. Recorded rain, ocean, forest and guided meditations need **licensed or commissioned audio**; no unlicensed downloads |
| Daily quote/affirmation | Curated list with verified attribution | Many popular quotes are misattributed, so each needs a source check; avoid toxic positivity |
| Progress tracker | Weekly, monthly and yearly trends; "patterns, not causes" wording | e.g. "Your mood was higher in weeks you slept 7 h+" |
| Missions | Walk, breathe, call a friend, screen break | XP for engagement, never penalties |

**Safety and law (non-negotiable before launch):**
- Mental-health data is **special category data under UK GDPR**: explicit consent, a Data Protection Impact Assessment, minimal retention, export and delete.
- Clear statement that this is wellbeing tracking, **not diagnosis or treatment**.
- If check-ins or journal-assist text indicate serious distress or suicidal thoughts, show supportive wording and crisis routes (UK: Samaritans 116 123, NHS 111 option 2, 999 in an emergency; localise for other regions). The AI must not try to manage a crisis itself. Any AI reflection feature needs a written safety policy and testing.
- Never share Mind data with friends, schools or institutions without explicit per-item consent.

---

## 5. Gradify Astrology (inside Mind)

- **Calculations must be deterministic and astronomical**, from an ephemeris library, never invented by the AI. Options: *astronomy-engine* (MIT licence, runs in the browser, planetary positions) plus our own house and aspect code, or the *Swiss Ephemeris* (the industry standard, but **AGPL or paid commercial licence**, a legal decision for Gradify Ltd).
- Birth data: date, exact time and place. That needs geocoding plus historical time zones and daylight-saving rules (an IANA tz database library), saved once in a private `birth_profiles` table.
- **Phase A:** natal chart wheel (planets, signs, houses with Placidus and Whole Sign, aspects with orbs), element and modality balance, tap-to-explain, learning pages.
- **Phase B:** transits calendar, secondary progressions, solar return, synastry and composite.
- **Phase C:** profections, solar arcs, astrocartography (on the existing Gradify Earth globe), draconic and harmonic charts.
- The AI interprets **computed** placements only, and every interpretation cites the placements it uses.
- Framing: a symbolic and interpretive practice, not a scientifically validated predictor, and never used for mental-health assessment.
- Reference site: I have **not** verified the astrology site named in the conversation. The feature list above stands on its own.

---

## 6. Gradify Culture

An editorial magazine: long-form features, collections, a daily "discovery", and links into Learn courses.
- **Images:** prefer museum open-access collections released under CC0 or public-domain terms, keep each source and licence per image, and never hot-link copyrighted press images.
- **Writing:** commissioned or staff-written. AI can draft and research, but sophisticated cultural criticism needs named human editors to be credible.
- Data: `articles`, `collections`, `entities` (people, works, movements) with links to Learn topics. These are public tables with editor-only write access.

## 7. Gradify News

"Completely unbiased" can't be guaranteed by software. The credible version is **published impartiality standards that are enforced and auditable**:
- An editorial charter: separate facts, claims, analysis and opinion; weight evidence rather than giving false balance; show what's verified and what's unknown; disclose conflicts; keep a public corrections log; no paid placement.
- **Sources must be licensed.** Wire services and publishers license their content; scraping and AI-rewriting their articles creates copyright and defamation exposure. AI summaries must link to and quote original reporting within licence terms.
- Human editors approve stories. AI drafts explainers ("Understand this story"), timelines and links into Learn ("Go deeper").
- News needs fast, indexable pages. This is the one area where server rendering (or a static rebuild on publish) matters; a scheduled build job can generate static article pages without changing the site's architecture.

**News is last in the build order** because its blockers are licensing, editorial staff and legal review, not engineering.

---

## 8. New database tables (all with RLS)

| Area | Tables | Access |
|---|---|---|
| Visual Studio | `projects`, `scene_versions`, `render_jobs`, `assets` (+ Storage buckets `renders`, `scene-assets`) | Owner; optional share links via signed tokens |
| Sport | `exercises` (shared), `workouts`, `workout_sets`, `body_checkins`, `fitness_tests` | Owner (catalogue public read) |
| Mind | `mind_checkins`, `journal_entries` (encrypted payload), `sound_mixes`, `saved_quotes` | Owner only, never shared |
| Astrology | `birth_profiles`, `charts` (cached computations), `chart_shares` | Owner |
| Culture/News | `articles`, `collections`, `entities`, `stories`, `sources`, `corrections` | Public read; editor role write |

---

## 9. Security summary

- Keys (Anthropic, GPU provider, media APIs) live only in Supabase secrets or the worker environment, never in site code.
- The worker accepts only schema-valid SceneSpecs and runs no model-written code. It runs in a sandboxed container with resource limits and no network beyond its Storage upload.
- Per-user rate limits and credit quotas on generation, enforced server-side.
- Mind and Astrology data are private by default; journals are end-to-end encrypted if feasible.
- Licence register for every third-party asset, audio file, model and dataset (the anatomy GLB already requires CC BY 4.0 attribution, which `anatomy-glb.js` provides).

---

## 10. Phased roadmap

| Phase | Deliverable | Needs from you |
|---|---|---|
| **1** | **Body Intelligence MVP** on the current anatomy mesh: workout logging, four modes, tap-to-inspect, date slider | Nothing new; can start immediately |
| **2** | **Mind MVP**: check-ins, private journal, synthesised noise mixer, verified quotes, tracker, crisis signposting | Agreement on the safety wording; a DPIA before public launch |
| **3** | **Visual Studio PoC**: SceneSpec schema, Director function, browser viewer, Blender worker, H–F scene, save and reopen | GPU host account, Anthropic key in Supabase secrets, budget cap |
| **4** | **Astrology Phase A** (natal chart) | Ephemeris licence decision (astronomy-engine vs Swiss Ephemeris) |
| **5** | Premium visuals: licensed anatomy asset, recorded audio library, Visual Studio asset library and Geometry Nodes generators, generative-media benchmarks | Asset and audio purchases; provider shortlist |
| **6** | **Culture** editorial platform | Editors, image-rights process |
| **7** | **News** | Source licences, editorial team, legal review |
| Later | iOS/macOS apps (the engine and SceneSpec are already platform-neutral), institutional API | — |

## 11. Decisions needed

1. Stay on the static site plus Supabase (recommended), or plan a framework migration?
2. GPU provider for render workers, and a monthly budget cap.
3. Ephemeris licensing for Astrology.
4. Budget for a premium anatomy asset and for licensed audio.
5. Who owns editorial standards for News and Culture.
