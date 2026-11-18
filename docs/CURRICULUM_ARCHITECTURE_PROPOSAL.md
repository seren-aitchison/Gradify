# Global curriculum and personalisation: architecture proposal

**Status: proposal for review. Nothing in this document is implemented yet**, except where a row says "exists". No
migration, no new engine code and no curriculum data has been added for it. Written 18 November 2026 against the
repository at kit version in `kit/VERSION`.

The aim: a learner anywhere tells Gradify where and what they study, and gets a curriculum-aligned learning
environment built from content Gradify already has. Adding a country, system, year, qualification or topic is a
**data change reviewed in a pull request**, never an application change.

Legend used throughout: **Exists** (in the code today) · **Extend** (exists, needs a change) · **New** (to build).

---

## 1. Audit: what the repository already has

The proposal builds on these. Most of the hard parts (concept graphs, mastery, provenance, versioned ids) already
exist inside individual courses; what is missing is one structure *above* the courses that says which country,
system, year and qualification each piece of content serves.

| Area | Where | Status | What it gives us |
|---|---|---|---|
| Static site, no build step, ES modules | whole repo | Exists | The constraint to keep: curriculum data must be plain JS/JSON modules, importable by browser and Node |
| Shared kit used by every sub-site | `kit/` | Exists | One place for the new engine; every site already consumes it |
| Course engine | `kit/course/course.js`, `kit/course/spec.js`, `kit/subjects/define.js` | Exists | `defineCourse(adapter, cfg)` is the seam where curriculum mappings will be read |
| Notes format and parser | `kit/course/notes.js` | Exists | Lessons carry `O:` objectives, `PRE:`, `LV:`, `SRC:`, `EV:`: the content-side metadata the mappings point to |
| 34 courses, ~9,980 lessons | `kit/courses/<slug>/` (syllabus, notes, ids, registry, qa) | Exists | The content. Units, modules and lessons have permanent ids (`ids.js`) and versions (`registry.js`) |
| Permanent ids and versions | `ids.js`, `registry.js`, `scripts/curriculum-registry.mjs` | Exists | Lessons and questions can be referenced stably from outside the course |
| Review stages | `kit/courses/<slug>/qa.js`, `docs/CURRICULUM_QA.md` | Exists | drafted → tested → reviewed → sources verified → signed off: the provenance states the brief asks for |
| Coverage claims | `kit/curriculum/coverage.js` | Exists (small) | `SYSTEMS` (UK nations + professional regulators), `QUALIFICATIONS`, and claim strength `verified / mapped / aligned / gradify`. **This is the seed of the curriculum engine** |
| Framework mappings | `kit/courses/maths/map.js` (DfE GCSE/A level), `docs/SQE_SPEC_MAPPING.md`, `docs/NMC_STANDARDS_MAPPING.md` | Exists, per course | Proof that specification mapping works; today each course does it its own way |
| Concept graph (prerequisites) | `kit/learning/concepts.js` | Exists | Module-level prerequisites, weakness detection, learning paths, per course |
| Evidence-weighted knowledge graph | `kit/intel/graph.js`, `kit/intel/identity.js` | Exists | Cross-source "A underpins B" links with confidence and evidence: the basis of the universal knowledge graph |
| Mastery and spaced repetition | `kit/learning/mastery.js`, `kit/learning/srs.js`, FSRS (`docs/FSRS.md`) | Exists | Student knowledge profile per topic: recall, explanation, application, confidence, retention |
| Session planner, pacing, priorities | `kit/intel/session.js`, `kit/intel/priority.js`, `kit/data/plan.js` | Exists | Recommendations with a "why" and evidence (constitution article 6) |
| Learner profile and onboarding | `kit/data/profile.js`, `kit/app/main.js` (`#/start`, steps 1–3), `profiles.learner` jsonb | Exists (simple) | Goal, site, level, exam date, daily minutes, subjects, prior knowledge, prefs. **No country, system, year or qualification** |
| Database | `supabase/migrations/` (40+ tables: profiles, course_progress, assessment_attempts, learning_events, goals…) with owner-only RLS | Exists | Progress and attempts are keyed by course slug and lesson id, which mappings can reuse unchanged |
| Quality audit and constitution | `scripts/quality-audit.mjs`, `docs/QUALITY-CONSTITUTION.md` | Exists | The regression gate: a drop in any course's score fails CI |
| Teach me / Revision notes | `revisionHtml` in `kit/course/notes.js` | Exists (this branch) | One lesson, two reading modes; the first step of the "learning format selector" |

**Not in this clone:** the `ollama/test-setup` branch with uncommitted work mentioned in the brief. This session
works on a fresh cloud clone of `main` (branch `claude/modest-shannon-5l84a4`); that work is on your machine only and
was not touched. Anything built from this proposal should be merged with it before landing.

**Gaps the proposal fills:** no country/system/year/qualification layer above courses; no shared topic identity
across courses (biology's photosynthesis and GCSE Core's photosynthesis are unrelated lessons); mappings to
specifications live in four different shapes; onboarding can't ask "Year 10, England, AQA GCSE Biology"; pathways
are per course, not per learner.

---

## 2. The core idea: three layers joined by mappings

```
 CURRICULUM LAYER (what a system requires)          KNOWLEDGE LAYER (what there is to know)       CONTENT LAYER (how it's taught)
 country → system → stage/year → qualification  ──▶  concept (photosynthesis)                ◀──  lessons, questions, labs, cards
         → specification → spec topic/outcome   map  · prerequisites, cross-subject links    map  in kit/courses/<slug>/ (unchanged)
                                                     · depth levels (intro/core/advanced)
```

- **Concepts are shared; requirements are not.** `bio.photosynthesis` is one concept. AQA GCSE Biology 4.4.1 and SQA
  National 5 Biology "Photosynthesis" each map to it **with their own depth, objectives and wording**. A mapping
  never assumes two curricula want the same thing because the topic name matches.
- **Lessons stay where they are.** A concept lists the lessons that teach it (`physics:u12-04`, `biology:u06-11`),
  by permanent id. Improving a lesson never touches a mapping; re-mapping never touches a lesson.
- **Every mapping carries its own provenance and claim strength**, reusing `coverage.js`'s `verified / mapped /
  aligned / gradify` and `qa.js`'s review stages. Nothing is shown as officially aligned without a dated check.

---

## 3. Proposed directory structure

Extends the existing `kit/curriculum/` (today one file). Plain ES modules exporting data, so browsers import them
directly and Node validates them; no JSON loader or bundler needed. One file per small unit of ownership so many
contributors (people or agents) can work in parallel without conflicts.

```
kit/curriculum/
  coverage.js                      Exists. Kept; later reads its SYSTEMS from systems/ (no behaviour change)
  engine/                          New. Pure functions, no DOM, tested in Node
    load.js                        lazy-loads manifests and the parts a profile needs (dynamic import)
    resolve.js                     profile → systems, stages, qualifications, specifications that apply
    match.js                       specification topics → concepts → lessons (with depth checks)
    pathway.js                     builds a learner's pathway (prescribed order + recommended order)
    prereq.js                      prerequisite closure, cycle detection (reuses kit/learning/concepts.js)
    validate.js                    schema and reference checks (used by tests and a CLI)
  schema/                          New. One schema per record type (JS objects describing fields), versioned
  countries/<iso>/                 New. One folder per country, owned independently
    manifest.js                    country, its systems, regions, owners, sources, schema version
    systems/<system>.js            e.g. gb-eng.js: stages, years, ages, key stages, regions
  qualifications/<id>/             New. e.g. gcse/, a-level/, nat5/, ap/, ib-dp/
    manifest.js                    qualification, level, awarding bodies, which systems offer it
    specs/<board>-<subject>-<version>.js   e.g. aqa-biology-8461-v1.js: spec topics and outcomes, source, version
  concepts/<domain>/               New. The shared knowledge layer, by domain (biology/, physics/, maths/…)
    <area>.js                      concepts with prerequisites, cross-links, depth levels, teaching lessons
  frameworks/                      New. Non-school frameworks with the same shape (NMC, SQE, GPhC, MLA, CPD schemes)
kit/onboarding/                    New. Data-driven steps; the UI reads the curriculum, never hard-codes it
  steps.js  flow.js  view.js  glass.css
tests/curriculum/  tests/onboarding/   New
```

Existing per-course mappings (`maths/map.js`, SQE, NMC) move in later as `qualifications/` and `frameworks/` data,
with the old files kept as thin re-exports until nothing reads them.

---

## 4. Curriculum data model

Ids are stable, lowercase, dot-separated and never reused (the same rule as lesson and question ids). Every record
has `schema` (its version) and `source` where it states an official requirement.

```js
// countries/gb/manifest.js
export default { schema: 1, id: "gb", name: "United Kingdom", owners: ["curriculum-uk"],
  systems: ["gb-eng", "gb-wls", "gb-sct", "gb-nir"], sources: [{ cite: "…", kind: "standard", date: "2026-11" }] };

// countries/gb/systems/gb-eng.js
export default { schema: 1, id: "gb-eng", country: "gb", name: "England",
  stages: [ { id: "gb-eng.ks4", name: "Key Stage 4", years: ["gb-eng.y10", "gb-eng.y11"] }, … ],
  years:  [ { id: "gb-eng.y10", name: "Year 10", ages: [14, 15], next: "gb-eng.y11" }, … ],
  qualifications: ["gcse", "a-level", "btec-l3", "t-level"],          // offered here, by id
  regions: [] };                                                      // e.g. US states, German Länder, Indian boards

// qualifications/gcse/specs/aqa-biology-8461-v1.js
export default { schema: 1, id: "aqa.gcse.biology.8461.v1", qualification: "gcse", board: "aqa", subject: "biology",
  version: "8461 v1.0", firstTeaching: 2016, systems: ["gb-eng"], tiers: ["foundation", "higher"],
  source: { cite: "AQA GCSE Biology 8461 specification", url: "https://…", checked: null },   // null = not verified
  topics: [ { id: "4.4.1", title: "Photosynthesis", order: 12, tier: "both",
      outcomes: [ { id: "4.4.1.1", text: "…as worded in the specification…", depth: "core" } ],
      concepts: [ { id: "bio.photosynthesis", depth: "core", claim: "mapped", checked: null, by: null } ] } ] };

// concepts/biology/energy.js
export default { schema: 1, domain: "biology", concepts: [
  { id: "bio.photosynthesis", name: "Photosynthesis",
    requires: ["chem.energy-changes", "bio.cell-structure"],          // prerequisites (concept ids)
    related:  ["chem.rates", "phys.energy-transfer"],                 // cross-subject links, not prerequisites
    depths: { intro: [...lessonRefs], core: ["biology:u06-11", "gcse:u03-07"], advanced: ["biology:u06-14"] } } ] };
```

Rules the validator enforces: every id unique; every reference resolves (system → qualification → spec →
concept → lesson id in `ids.js`); no prerequisite cycles; every spec topic has outcomes and at least one concept or
an explicit `gap: true`; a `claim: "verified"` needs `checked` and `by`; years chain without gaps; a mapping's depth
exists on the concept.

**Prescribed vs recommended order** are separate fields: `order` on spec topics is the specification's (or the
school's) order; the recommended order is computed from prerequisites and the learner's mastery, never stored.

**Scale.** Millions of curriculum-to-topic relationships stay manageable because content is not duplicated: a spec
topic stores a few concept ids, a concept stores a few lesson ids. Loading is lazy: a learner in England loads
`gb/`, `gcse/` and the specs they chose, never the whole world.

---

## 5. Database model (proposal only; no migration written or applied)

Curriculum data stays in git (version-controlled, reviewable, rollback by revert). The database stores only what is
**per learner**. That keeps the database small, keeps curriculum edits out of production writes, and lets every
static page read the curriculum from the CDN.

| Table | Status | Purpose | Notes |
|---|---|---|---|
| `profiles.learner` jsonb | Extend | Add `education: { country, system, region, year, quals: [{ spec, tier, examDate }], subjects: [...] , updated_at }` | Fits the existing jsonb; no new column, so no migration for phase 4 |
| `learner_pathways` | New | One row per learner per spec: `{ spec_id, spec_version, added[], removed[], order_overrides[], created_at, updated_at }` | Only the learner's *changes*; the pathway itself is recomputed from data, so curriculum updates reach everyone |
| `course_progress`, `assessment_attempts`, `learning_events` | Exists | Unchanged | Already keyed by course slug + lesson/question id + version: concepts → lessons → progress needs no new keys |
| `concept_mastery` (view or cache) | New, later | Mastery rolled up from lessons to concepts | Derived from attempts; can start as a client-side computation |

Indexes: `(user_id, spec_id)` unique on `learner_pathways`. RLS: owner-only, like every existing table. Privacy:
country and year are personal data; collect only what personalisation needs, let under-18s skip, never share
(constitution article 8). Curriculum files are cacheable by the service worker per country.

---

## 6. Onboarding architecture

**Exists:** `#/start` with three steps (goal and subject, prior knowledge, preferences) saving to
`profiles.learner`. **Proposed:** a data-driven flow in `kit/onboarding/` that replaces those steps' *content* while
keeping the route, the save function (`saveLearner`) and the "skip for now" behaviour.

Each step is data: `{ id, ask, optional, options(profile, curriculum) → choices, applies(profile) → bool }`.

1. **Country** (all countries with a manifest; a "Somewhere else" option keeps today's subject-only flow).
2. **Education system / region** — shown only if the country has more than one (UK nations, US states, Länder).
3. **Stage and year** — from the system's `years`, plus University and Professional (the three divisions).
4. **Qualifications and boards** — only those the system offers at that year (Year 12 in England → A level, BTEC, T
   level; never National 5).
5. **Subjects** — from the chosen specifications, so "AQA GCSE Biology" is one tap.
6. **Topics** (optional) — "We've started these" ticks from the spec's topic list.
7. **Goals and preferences** (optional) — exam dates (pre-filled from the spec's exam series where known), daily
   time, reading and motion settings that already exist.

Adding a country adds its manifest and the steps fill themselves; the onboarding code does not change. A test
walks every path through every country's data and fails on a dead end (a year with no qualifications, a
qualification with no subjects).

**The liquid-glass interface** is a presentation layer only (`view.js`, `glass.css`): one full-screen canvas whose
refracting rainbow form morphs between steps. Constraints: CSS and SVG filters or a small WebGL shader with
three.js already vendored; honours `prefers-reduced-motion` and the learner's motion setting (falls back to a
static gradient); keyboard and screen-reader complete; no layout depends on the animation; progress ("Step 2 of
5") is real text. The flow engine is built and tested first so the visual layer can be swapped without risk.

When onboarding finishes, the dashboard is assembled (section 7). Changing school, country or year later re-runs
only the affected steps from Account and recomputes pathways; progress is kept because it belongs to lessons.

---

## 7. Pathway generation

`pathway.js` is a pure function: `(profile, curriculum, mastery, overrides) → pathway`.

1. **Resolve**: profile → system → year → chosen specs (`resolve.js`).
2. **Match**: each spec topic → concepts at the spec's depth → lessons, questions, labs (`match.js`). A topic with
   no content is shown as "Not yet on Gradify", never silently dropped.
3. **Order**: start from the prescribed order; insert missing prerequisites (`prereq.js`, closure over concept
   `requires`, cycle-safe); mark lessons the learner already masters as revision, not new work.
4. **Personalise**: apply the learner's added, removed and reordered topics; exam dates feed the existing pacing
   (`paceFor`) and session planner, so "today" works unchanged.
5. **Explain**: every recommended item carries `why` and `evidence` (constitution article 6), e.g. "Needed for
   4.4.1 Photosynthesis; your energy-changes answers are 40% correct".

Output is a list of `{ specTopic, concept, lessons[], status: new|in-progress|revise|mastered|gap, why, evidence }`
grouped by subject, which the dashboard and LifeOS views render. Pathways are recomputed on load (cheap: a few
hundred topics), cached per spec version, and invalidated when the spec version or the learner's overrides change.

---

## 8. Integration with existing sites and courses

- **No course changes are required to start.** Mappings point at existing lesson ids. Sub-sites keep their course
  pages exactly as now; a "Your specification" view is an extra view in the course engine, shown only when the
  learner's profile has a spec that maps into that course.
- `defineCourse` gains an optional `curriculum` hook (the concept domains the course teaches), following the
  existing adapter pattern in `kit/subjects/`.
- The main app (`app.html`) shows the cross-course pathway; each sub-site shows its slice of it.
- TechGradify and other external sites consume the same modules (or a generated `kit/api/v1/curriculum.json`,
  following the existing `kit/api/` build) without importing the course engine.

## 9. Migration and backwards compatibility

| Step | What changes | What stays |
|---|---|---|
| A | Add `engine/`, `schema/`, validator, tests; move `coverage.js` `SYSTEMS` into `countries/gb/` and re-export | Every page and number on `quality.html` identical (a test compares) |
| B | Add UK and US data; convert `maths/map.js`, SQE and NMC mappings into `qualifications/`/`frameworks/` data | Old files re-export the new data until unused |
| C | Concepts for the first domains (biology, chemistry, physics, maths) mapped to existing lessons | Lessons, ids, progress untouched |
| D | Onboarding steps read the curriculum; old profiles without `education` see today's flow | `profiles.learner` shape is additive |
| E | Pathways in the app and course pages | Course routes and saved progress unchanged |

Risks: (1) **false alignment claims** — mitigated by `claim` + `checked` + validator, and showing claim strength in
the UI; (2) **copyrighted specification text** — store outcome ids and short paraphrases with a link, not whole
specifications, until licensing is checked with each awarding body; (3) **data sprawl** — strict schemas, per-folder
owners and manifests; (4) **performance** — lazy per-country loading, service-worker caching; (5) **children's
data** — minimal collection, skippable steps, no new tables until needed.

## 10. Testing strategy

`tests/curriculum/`: schema validity of every file; duplicate ids; broken references (system → qualification →
spec → concept → lesson id in `ids.js`); missing outcomes; invalid qualification-for-system; year chains (every
year's `next` exists, no gaps); prerequisite cycles; claims marked verified without `checked`/`by`; each country
folder testable alone (`node --test tests/curriculum --country gb`). `tests/onboarding/`: every path through every
country ends in at least one subject; skipping works at every optional step. Regression: the existing 877 tests,
`quality-audit.mjs --check`, `build-site.mjs --check` and the signed-in browser journey (`check-sync.cjs`) run
unchanged on every phase.

## 11. Future capabilities this must not block

| Capability | What the architecture provides now | Integration point |
|---|---|---|
| Universal knowledge graph | Concept ids with `requires` and `related` across domains | `kit/intel/graph.js` reads concept links as `course` evidence (weight 0.9) |
| Student knowledge profiles | Mastery per lesson exists; roll-up to concepts | `concept_mastery`, computed from `assessment_attempts` |
| Adaptive engine | Concept depths (intro/core/advanced) and mastery status per pathway item | `pathway.js` status + `kit/intel/priority.js` |
| Universal resource engine | Lessons already render as Teach me and Revision notes; cards, questions, mind maps, glass diagrams from the same notes | Add formats as renderers of one lesson, never copies |
| Revision scheduling | FSRS, session planner, exam dates from specs | `paceFor` + spec exam series |
| AI tutor | Tutor already receives lesson context | Pass spec topic + outcomes + learner mastery; retrieve only approved lessons |
| Cross-subject recognition | `related` links (logarithms → pH, decibels) | Knowledge-debt detection in `kit/intel/debt.js` |
| Academic passport | Verified progress per lesson and concept, with dates | Read-only export of mastery + qualifications |
| Collaboration | `study_groups`, `group_members` tables exist | Groups share a spec id |
| Virtual labs | Labs already link to lessons (`interactives.js`) | Concepts list labs alongside lessons |

## 12. Phased roadmap (each phase is its own reviewed change)

| Phase | Deliverable | Depends on | Tests that gate it |
|---|---|---|---|
| 1 | Schemas, engine (`load`, `validate`, `prereq`), coverage.js moved into data | — | validator suite; quality page unchanged |
| 2 | Countries and systems: UK (4 nations) and US (national structure, states as regions) | 1 | year chains, references |
| 3 | Qualifications, specs and concept mappings: GCSE/A level sciences and maths first, mapped to existing lessons, all as `mapped` (unverified) | 2 | reference and depth checks; no claim upgraded without evidence |
| 4 | Profile `education` field and the data-driven onboarding flow (plain UI) | 2–3 | every-path onboarding test; old profiles unaffected |
| 5 | Pathway generation, dashboard and "Your specification" course view | 3–4 | pathway unit tests; signed-in journey |
| 6 | Liquid-glass onboarding interface | 4 | accessibility checks, reduced-motion fallback, visual review |

**Decisions needed from you before phase 1:** (a) whether official specification wording may be stored or only
referenced; (b) which country after the UK and US; (c) who signs off a mapping as `verified` for each subject;
(d) whether the ollama/test-setup work should be merged first.
