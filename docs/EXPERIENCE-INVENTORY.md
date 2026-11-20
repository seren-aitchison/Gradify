# Gradify Experience 2.0: implementation inventory

What exists, what works, what is incomplete, before building further (November 2026). Assessed from the code and from
real-browser screenshots of the pages served from this repository (getgradify.com publishes `main` through CI;
the development environment's network policy blocks getgradify.com itself, so the screenshots are of the same files).

## The real visual identity (keep it)

| | What it is | Where |
| --- | --- | --- |
| Background | `--bg: #000` (light: `#f6f6fb`), soft white aurora | `kit/styles/base.css` |
| Type | Geist and Geist Mono; white `--fg`, `--mute #a3a3a3`, `--faint #8a8a8a` (AA on black) | base.css |
| Surfaces | `--surface-rgb 20,20,20` glass panels, `--line` and `--line-strong` hairlines, `--radius 14px` | base.css |
| Brand colour | the spectrum `#4641ff → #8c27ca → #f055dd → #e52153 → #ff5600 → #ffc002 → #40d4b1`, used sparingly: hero words, rainbow edges on the top bar, progress fills | base.css `--spectrum` |
| Logo | the multicoloured G (an SVG gradient on the same spectrum) | index.html, explore.html, journey.html |
| Controls | pill buttons (`.btn.lg`, white on black), small mono uppercase kickers | base.css, components.css |
| Feedback colours | restrained green `#34d399`, amber `#fbbf24`, rose `#fda4af`; course status tokens `--s-*` | ui.css, course.css |
| Light mode | every colour is a token; `tests/theme.test.mjs` refuses hard-coded dark colours | `scripts/theme-tokens.mjs` |

Decision: no new palette. New work uses these tokens; glass only where something floats (dialogs, the palette, drawers).

## Inventory

**Works (keep, refine)**
- Courses: 34 courses, 10,112 lessons, one engine (`kit/course/course.js`). Syllabus outline, course outline sidebar
  and phone drawer, breadcrumbs, previous / up / next, exact-section resume (synced), Next up view, split screen,
  revision notes, lesson toolkit, "What would you like to do next?", focus mode, keyboard shortcuts, command palette
  over lessons and note text (`docs/NAVIGATION.md`, `docs/DESIGN-SYSTEM.md`).
- Search over every course and lesson from the homepage and subject sites (`kit/data/search-index.json`).
- Topic status from evidence (Not started → Mastered, Needs revision), Target Tests, Revise hub, topic map.
- Gamification (`kit/game/`, `docs/GAMIFICATION.md`): one XP economy read from each course's own log (first-try
  solves only, lessons once, quizzes once per pass), levels and subject ranks, daily and weekly quests chosen from the
  learner's evidence (gentler after time away), 22 achievements, a daily challenge, streaks with banked rest days,
  calendar, personal records, recent rewards (the XP history), all on the Journey page.
- Learning engine: FSRS spaced repetition, the Mastery Engine, concept graph (Maths), weakness targets.
- Notes Studio and study packs, mind maps, the AI tutor, LifeOS (Tree, Forest, Earth), 3D models, labs.
- Haptics (`kit/core/haptics.js`: Android vibration, iPhone system tick), reading and accessibility panel (Aa).

**Incomplete (this round)**
- No way to browse everything: the homepage lists sites, not courses, chapters and topics. → **Explore** (`explore.html`).
- A lesson couldn't lead to related ideas without leaving it. → **Explore related topics** drawer with previews and a
  way back.
- Haptics were used in the study app only; courses gave no felt or audible feedback, and there was no sound option.
  → **Feedback moments** (`kit/ui/feel.js`) in courses, with Sounds and Haptics in the Aa panel.
- The Journey page header lacked the G mark. → fixed.

**Done in the Mastery System round**
- Chapter prerequisites for every course; the mastery map on Explore and each course's Progress page.
- Subject-site Earth maps show the learner's course as the world: stages as regions, chapters as places that light up
  from mastery, mastered chapters as landmarks (instead of example pins).
- Today's topic quest (Understand / Remember / Apply).

**Done in the follow-up round (19 November 2026)**
- TechGradify's learning map loads: the site had no map content, places or related sites (`kit/core/site-content.js`,
  `kit/core/site-maps.js`), so the map (and the shared sections of its homepage) drew nothing. `tests/site.test.mjs` now
  checks every site with a `map.html`.
- The globe is about four times faster on a slow CPU (4× throttle: 3–4 fps → 11–17 fps) and faster at full quality too:
  the view's rotation is worked out once a frame, the backdrop is cached, land dots are filled in batches, and motion
  is timed rather than per frame. Slow devices switch to a lite tier on their own (`kit/earth/globe.js`).
- Maths Schools 28 and 29 sit after Algebra and Geometry, not after Probability and Calculus: their exam and everyday
  probability lessons teach what they use (`kit/courses/maths/concepts.js`).
- On a subject site, the LifeOS tour's Earth opens on the learner's own learning map (`kit/lifeos/my-map.js`); Alex's
  globe follows it, labelled as the example.
- Module-level concept graphs for Biology, Chemistry and Computer Science as well as Maths: "Builds on" in every lesson,
  checked against each course's chapter links (`tests/concepts.test.mjs`), which gained the links the graphs showed
  were missing.
- All of a course's labs are reachable from their lessons: the check had been stopped by the Free allowance after ten
  lessons (`scripts/check-interactives.cjs`); in the courses it reached, every lab passes.

**Incomplete (next)**
- Module-level concept graphs for the other 30 courses (1,401 modules); Physics has no modules yet, so its graph would
  be lesson-level. Chapters are covered for every course.
- The rest of the LifeOS tour (Tree, community, calendar, assistant) still runs on Alex's example data.
- On phones, the header of every subject site is a little wider than the screen (the right-hand buttons).
- Social: friends, groups, private challenges. The community tables exist (`kit/app/community.js`); no learner-facing
  challenges yet. Leaderboards wait for server-side XP (`kit/README.md` known limits).
- Pins, interface preferences and the notifications history are per device.
- Native apps: there is no Swift code. The plan (`docs/APP-STORE.md`) is a Capacitor wrapper around the same web app,
  so the shared components, feedback moments and storage carry over; native haptics would map the same moments to
  UIKit feedback generators through Capacitor's Haptics plugin.
