# The Gradify learning engine

Gradify has two learning engines that share one account. Both are real code; this describes what they do today.

| | **The study app** (`kit/app/`) | **The course engine** (`kit/course/`) |
|---|---|---|
| Content comes from | The learner's own notes (PDF, text) | A written curriculum in `kit/courses/<slug>/` |
| Made into cards by | Gradify AI (`study-pack` Edge Function) or the browser extractor | Authors, in the notes format |
| Scheduling | `kit/learning/srs.js` | the same `srs.js` |
| Progress model | The Mastery Engine (`kit/learning/mastery.js`) | XP, levels, streaks, lessons done, quiz scores |
| Where progress lives | `LocalStore` or `CloudStore` (Supabase) | `localStorage` per course, plus every XP event logged to the account's `activity` and saved lessons/cards to the account |
| Used by | Every site's `app.html` and getgradify.com's `app.html` | SciGradify Physics, LawGradify, NurseGradify |

The bridge between them: **Save notes and cards** on any course lesson writes the lesson as a document and its flashcards as cards in the learner's account (scoped to the site), so they join the study app's daily review and the Mastery Engine.

## The course engine

`mountCourse(rootElement, config)` draws a whole course in one element, with hash routes:

| Route | View |
|---|---|
| `#/learn`, `#/learn/u03` | The road: each unit (school) as a banner and a winding path of lessons, reward chests every six lessons, the unit quiz at the end, the car parked at your next lesson. Follows the chosen path if one is set |
| `#/lesson/u03-02` | A lesson: lead, notes in sections, worked examples, key points, common mistakes, check questions with explanations, flashcards, Complete (+10 XP), Save to account |
| `#/quiz/u03` | Unit quiz: up to 10 random check questions from the unit; 75% passes (+50 XP, +20 for 100%) |
| `#/review` | Spaced review of the flashcards from completed lessons, scheduled by `kit/learning/srs.js` |
| `#/paths` | Curated pathways (`config.paths`): follow one and Learn and the next milestone follow it |
| `#/tracks` | Units grouped by theme (`config.tracks`) |
| `#/problems` | Every check question, filterable by unit, difficulty and solved state |
| `#/leaderboard` | An example weekly league (other names are made up until live leagues exist; labelled as such) |
| `#/me` | XP, level, streaks, an 18-week heatmap, the last 14 days, badges and lessons saved to the account |
| `#/features` | What the course includes, plus `config.extras` links |

**Gamification:** XP per action (lesson 10, first-try check 5, chest 15, quiz 50, perfect +20, review 2, problem 5, weekly challenge 100); levels at 50·n·(n+1) XP; daily goal; streaks; 14 badges; a rotating weekly challenge. Every award is also logged with `store.logActivity({ site, kind: "<slug>-<kind>", xp })`, so it counts in the shared XP total and LifeOS.

**Config options** (`kit/courses/<slug>/course.js`): `site`, `slug`, `name`, `app` (link to the site's study app), `units`, `tracks`, `paths`, `written`, `notes(unitId)`, `extras`, and two optional fields added for law and nursing, which default to the original behaviour:
- `unitWord`: what to call a unit in the interface (`"School"`); default `"Unit"`.
- `notice`: HTML shown under the course title on every view (a standing disclaimer).

**Loading:** notes are lazy-loaded one unit file at a time with dynamic `import()`, only for units listed in `written`. A 480-lesson curriculum costs one small syllabus file on first load.

## Question types today

| Type | Notes format | Where it appears | Marking |
|---|---|---|---|
| Flashcard | `Q: question \| answer` | Lesson flashcards, Review, saved to account | Self-rated (again, hard, good, easy) |
| Check question / single best answer | `M1:`, `M2:`, `M3:` `question \| right \| wrong \| wrong \| wrong \| … \| why` | End of lesson, unit quiz, problem bank | Automatic; the explanation shows after an answer |

For law, every check question is written as a **single best answer** (one right option and four plausible distractors, usually a short client scenario), which is the SQE1 format. For nursing, scenario-based questions use realistic patient vignettes.

## What's not built yet (and the plan)

| Need from the brief | Status | Plan, within the current architecture |
|---|---|---|
| Free-text answers marked by AI (problem questions, SQE2 writing, care plans) | Not built | A new mode on the `study-pack` Edge Function (`mode: "mark"`) taking the task, a marking rubric and the answer; returns rubric scores and feedback. Rubrics live in the notes file (new `R:` line). Rate-limited like packs |
| AI tutor / "ask about this lesson" | Not built (the LifeOS chat is scripted) | Edge Function grounded in the lesson's own notes text, with the subject's safety rules in the system prompt (no legal advice; no patient-specific clinical advice) |
| Timed mock exams (e.g. 90 SBAs) | Not built | A `#/mock` view in the course engine drawing from `paths` (e.g. FLK1 schools), with a timer and per-school breakdown. Pure front end |
| Drug calculation practice with generated numbers | Not built | A small generator module per question family, rendered as check questions; answers computed, never typed in by hand |
| Interactive simulations (client interview, deterioration scenario) | Text case files only (School 19 for law) | Branching scenario format (`B:` lines) rendered by the engine; later AI role-play through the Edge Function |
| Course progress in the cloud | Partly: XP and saved lessons sync; lesson completion is per device | A `course_progress` table (owner-only RLS) mirroring `S.done`, `S.quiz` and `S.cards` |
| Per-site entitlement (paid courses) | Not built anywhere | Check an `entitlements` row before unlocking units beyond a free set, once subscriptions exist |
