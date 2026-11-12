# Gradify master progress

The one place to see where the whole ecosystem stands. Every line here was checked against the repository or the
live site on the date given; where a more detailed tracker exists, this page links to it rather than copying it.

**Last updated:** 8 November 2026, at commit `fcb114d` (live). **Tests:** 381 of 381 pass (`npm test`).

## Detailed trackers

| Area | Document | Kept current by |
|---|---|---|
| Every site's release status | [ECOSYSTEM-STATUS.md](ECOSYSTEM-STATUS.md) | `node scripts/audit-sites.mjs` |
| New subject sites | [SITE-PRODUCTION.md](SITE-PRODUCTION.md) | the site-production session |
| Backend and accounts | [BACKEND-STATUS.md](BACKEND-STATUS.md), [SETUP.md](SETUP.md) | `node scripts/verify-backend.mjs` |
| Interactives | [INTERACTIVE-ROADMAP.md](INTERACTIVE-ROADMAP.md) | `scripts/check-interactives.cjs` |
| Learning and mastery engine | [LEARNING_ENGINE.md](LEARNING_ENGINE.md) | by hand |
| Curriculum and content QA | [CURRICULUM_PROGRESS.md](CURRICULUM_PROGRESS.md), [CURRICULUM_QA.md](CURRICULUM_QA.md), `docs/qa/` | `npm run qa` |
| Commercial plan | [COMMERCIAL-PLATFORM-PLAN.md](COMMERCIAL-PLATFORM-PLAN.md) | by hand (a plan; nothing in it built except the allowlist deploy) |

## Inventory

**Platform (shared by every site, `kit/`):** one course engine (`kit/course/course.js`) runs all 9 courses: lessons, check questions, quizzes, mock exams, flashcards with spaced repetition, Revisit, interactives, the AI tutor panel and My progress. One mastery engine (`kit/learning/`) with six-dimension mastery, evidence classes, a concept graph (prerequisites; maths mapped so far) and a cross-course learner summary for LifeOS. One design system (`kit/styles/`), one service worker (`sw.js`), one data layer (`kit/data/store.js`: this device, or Supabase when configured).

**Sites:** 31 (3 live, 5 beta, 22 coming soon, 1 external). Every site homepage, study app and course page returns 200 on getgradify.com. The homepage and seven course pages (Maths, Law, Nursing, Physics, Psychology, Pharmacy, LifeOS) load with content and no JavaScript errors.

**Courses** (lessons with notes / in the syllabus):

| Course | Site | Lessons written | Interactives | Mock exams | Schools reviewed | Expert sign-off |
|---|---|---|---|---|---|---|
| Mathematics | MathGradify | 1,077 / 1,077 | 19 | 6 | 0 / 29 | 0 |
| Physics | SciGradify | 1,308 | 77 across SciGradify | 16 across SciGradify | 0 | 0 |
| Biology | SciGradify | 50 | | | 0 | 0 |
| Chemistry | SciGradify | 45 | | | 0 | 0 |
| Law | LawGradify | 480 / 480 | 2 + 6 cases | 4 | 1 / 19 | 0 |
| Nursing | NurseGradify | 497 / 497 | 3 + 6 cases | 5 | 1 / 17 | 0 |
| Pharmacy | PharmaGradify | 275 / 318 | 1 | 4 | 0 / 19 | 0 |
| Psychology | PsychGradify | 393 / 393 | 34 | 7 | 0 / 16 | 0 |
| Sociology | SocGradify | 438 / 438 | 29 | 7 | 0 / 18 | 0 |

SciGradify as a whole: 1,403 of 2,159 lessons written. 165 interactives in all, each with a code fingerprint and a review status.

**Backend (`supabase/`):** 10 migrations with row-level security on every learner table, the `course-tutor` and `study-pack` functions, and a verification script. **None of it is connected:** `gradify.config.js` has no Supabase URL or key, so every learner's progress lives in their own browser and every AI feature says it isn't switched on yet.

## State, by kind

- **Works (verified):** studying any written lesson, check questions, quizzes and exams, flashcards and Revisit, 165 interactives with mastery evidence, six-dimension mastery, the concept graph's "Builds on" in maths lessons, LifeOS views, offline use after a first visit, the allowlisted static deploy.
- **Built, can't run yet (needs the owner):** accounts, cross-device sync, every AI feature (tutor, marking, diagnosis, study director, notes-to-cards AI), usage limits. The code is tested against a stand-in backend and real PostgreSQL in CI, not a live project.
- **Partial:** Biology and Chemistry (95 lessons of their syllabi), Pharmacy (86%), the concept graph (maths only), expert review (2 schools of 220), curriculum mapping (maths maps each school to the DfE GCSE and A level content areas in `kit/courses/maths/map.js`; other courses have their own frameworks, such as SQE and the NMC standards; there is no shared qualification → specification → outcome layer yet).
- **Inconsistent:** PsychGradify, SocGradify and MathGradify are fully written but marked beta; the audit's own rule makes a course with 300+ written lessons live. The status lives in `kit/core/sites.js`, which the site-production session owns.
- **Missing:** payments and plans (deliberately: nothing is paywalled, and nothing should be until accounts work), teacher and institution tools, curriculum mapping to qualifications (GCSE, A level, IB, AP), AI marking of photographed working.
- **Flaky:** `tests/sites-status.test.mjs` failed once in a full run and passed alone and in two further full runs. Probably reads files another test writes; worth isolating.

## Subject production line

The site-production workstream (branch `claude/lawgradify-nursegradify`, a separate session) runs the subject builders and owns the shared integration files: `kit/core/sites.js`, the offline list's course entries, `scripts/qa-courses.mjs`, `scripts/new-course.mjs` and [SITE-PRODUCTION.md](SITE-PRODUCTION.md). As of this update no builder branch has been pushed and the tracker lists all 23 new courses as not yet generated; this workstream doesn't start a second set of builders, to avoid duplicate courses and conflicts in those files.

## Owner actions (blocking)

1. **Create the Supabase project** and send the project URL and the public anon key; nothing else is needed from it here. Run the migrations and deploy the two functions as in [SETUP.md](SETUP.md).
2. **Add the Anthropic API key as a Supabase secret** (`supabase secrets set ANTHROPIC_API_KEY=…`). Never send it in chat or commit it.
3. **Create two test learners** in Supabase (Authentication → Users), so the two-account isolation and sync check can run.
4. **Find subject reviewers:** no course can lose its draft notices until a qualified reviewer signs schools off.
5. Payments, DNS and the GitHub organisation move remain the owner's decisions (see the commercial plan).

## Done in this workstream (8 November 2026)

| Change | Affects | Commit | Tests |
|---|---|---|---|
| Target my weaknesses: practice from the learner's weakest measured lessons, weak foundations first (concept graph), easier questions where weakest; in every course at `#/review/weak` | every course | `605398b` | `tests/targets.test.mjs`; browser: Definite Integrals → Differential Calculus first |
| LifeOS Do next names weak spots and the foundation to start with | LifeOS, every course | `98b3dc4` | test; browser |
| Service worker revalidates same-origin files and installs fresh, so a deploy can't leave a mix of old and new modules (which stops a course loading) | every site | `fcb114d` | suite; v60 verified live |
| Evidence classes: exploration earns XP but never mastery; assessment counts ×1.5; XP never feeds mastery; 108 exploration challenges classified | all 6 courses with labs, LifeOS | `9a1aa2c`, `5453a3c` | `tests/evidence-class.test.mjs` |
| 58 lab challenges re-pointed to the lesson that teaches them (the generator had sent them to each interactive's first lesson) | Physics, Chemistry, Biology, Psychology, Sociology, Maths | `4bc16c6` | pinned by test |
| Repeated answers to one question within a day count ½, ⅓, …, so drilling can't inflate mastery or certainty | every course | `eb7dcea` | yes |
| Declining understanding detected (recent unaided answers 20+ points below earlier ones), shown as "slipping", passed to the study director and LifeOS | every course | `eb7dcea` | yes |
| MathGradify mock exams: GCSE, A level, Further Mathematics, university entrance, first-year university and whole course; each follows its path, so it draws only on that level's modules | MathGradify | `7648061` | suite; a GCSE paper started in the browser |
| Generated practice evidence on the right lessons; every maths lab's mathematics tested | MathGradify | `c5932bc` | yes |
| Tutor reads canonical notes server-side; lab outcomes; lab-aware tutor | every course | `6c971b7`, `6cd696d` | yes |

## Next priorities

| P | Task | Blocked on |
|---|---|---|
| P0 | Connect Supabase and run the two-account live check (`scripts/check-live.cjs --ai`) | owner actions 1–3 |
| P1 | Set PsychGradify, SocGradify and MathGradify live, as the audit rule says | site-production session (owns `sites.js`) |
| P1 | Biology and Chemistry notes (about 850 lessons in their syllabi) | content sessions |
| P1 | Concept graphs for the other eight courses, so prerequisite weaknesses work everywhere | – |
| P2 | Mark my working (AI), photographed working | backend |
| P2 | Curriculum mapping layer: qualification → specification → learning outcome → lesson | – |
| P3 | Teacher and institution tools; plans and payments | backend, owner |
