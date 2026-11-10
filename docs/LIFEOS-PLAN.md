# Gradify LifeOS: audit, architecture and staged plan

Written 10 November 2026 before any redesign, from the code as it stands. The rule throughout: LifeOS is the
signed-in experience on top of Gradify's existing systems, never a second application with its own data.

## 1. Inventory

### Works today (real data, in production)

| Area | What exists | Where |
|---|---|---|
| Identity | One Supabase account for every site: email link, Google, password; profile with goal, level, exam date, daily minutes, accessibility settings | `kit/data/store.js`, `kit/data/profile.js`, `profiles` |
| Subscriptions | Gradify Pro (Stripe live, not on sale), plan on the Account page, Manage billing | `kit/data/billing.js`, `subscriptions`, billing functions |
| Courses | 24 course folders, thousands of lessons, quizzes, exams, paths, problems; progress synced to the account | `kit/course/`, `kit/courses/`, `course_progress` |
| Interactives | 10 interactive engines and 11 lab sets, placed inside lessons | `kit/interactive/`, `kit/labs/` |
| Notes to flashcards | Notes Studio in the browser; decks, card checking against notes, spaced repetition | `kit/notes/`, `kit/learning/srs.js`, `documents`, `packs`, `cards`, `reviews` |
| Mastery Engine | Per-topic profile (recognition, recall, explain, apply, transfer, retention) from real answers; "what next and why" | `kit/learning/mastery.js`, `targets.js`, `concepts.js` |
| Gamification | One level curve and ranks, XP rules, streaks with rest days, daily and weekly quests, daily challenge, achievements | `kit/game/`, `activity`, `assessment_attempts` |
| Journey page | Level, streak, daily goal, quests, achievements, progress in every subject | `journey.html`, `kit/game/journey.js` |
| App | Today, add notes, decks, revision, topic mastery, Progress, a 7-day Plan with auto-planned study blocks, Account | `app.html`, `kit/app/main.js`, `plan_blocks` |
| Your Gradify | The learner's real heatmap, Tree and next steps across every site, shown above the LifeOS tour | `kit/lifeos/mine.js`, `kit/learning/learner-data.js` |
| Subject Earth | Each site's subject as a 3D globe; the learner's own topics placed with real mastery | `kit/earth/`, `<site>/map.html` |
| Sport | Workouts, body check-ins, fitness tests | `kit/sport/`, `workouts`, `body_checkins`, `fitness_tests` |
| Gradify AI | Tutor and study packs with allowances, caps and monitoring: **deployed, switched off** | `docs/AI.md` |

### Exists but incomplete or example-only

| Area | State |
|---|---|
| LifeOS window (homepage) | Today, Plan, Progress, Earth, Path, AI, Learn, Study, Notes Studio, Community, Settings: a polished **tour with an example learner**, not the signed-in product |
| Goals | The tour shows goals; the real profile has one learning goal and a daily XP goal, no goal records |
| Calendar | Real `plan_blocks` for 7 days in the app; the month calendar, deadlines and events exist only in the tour |
| Community | Tour only (made-up group and board); no friends, no social data |
| Gradify Earth (whole life) | The life-wide planet is example data; the per-subject globes are real |
| Path / career | Course paths are real per course; a life-wide path is tour only |

### Needs connecting

- The app (`app.html`), Journey and Your Gradify each show part of the same learner: they read the same data but are
  three pages with three navigations. They should become one signed-in LifeOS with sections.
- Course deadlines and exam dates (profile, course plans) don't reach the calendar.
- Quests, the daily challenge and mastery "what next" don't feed one daily plan.
- Notes decks and course flashcards are two libraries.

### Genuinely new

Goal records (milestones, habits), notifications and reminders, a library with collections, friends and challenges,
a month calendar with events, the persistent life-wide Earth, and the Academic Director's daily priorities.

## 2. Architecture: one system

- **One account and profile.** `profiles` (and its `learner` JSON) stays the identity; LifeOS reads it.
- **One progress record.** XP, levels, streaks and achievements stay in `kit/game/` over `activity`; no LifeOS copy.
- **One learning engine.** The Mastery Engine and course progress are the only source of "what you know"; the Academic
  Director and Cognitive State are views and rankings over it, not a new model.
- **One calendar.** `plan_blocks` becomes the calendar, extended with deadlines and events (additive columns).
- **New data only where nothing exists:** `goals` (with milestones and habits), `notifications`, `collections`,
  `friendships` and `challenges`. Each with row-level security limited to its owner, created by additive migrations,
  rehearsed against a backup before any production change, and only with the owner's approval.
- **Specialist sites keep their identity.** Courses, labs and subject Earths stay where they are; LifeOS links into them
  and reads their progress.
- **AI-ready, AI-off.** Every place an AI feature will plug in (Academic Director, capture, tutor) has a non-AI path now.

## 3. Stages

1. **Website (started).** Homepage that shows the product and the ecosystem, Pro visible in the navigation, hero,
   a showcase, the Free and Pro comparison and the closing call to action; real product screens; mobile-first.
2. **LifeOS dashboard.** `app.html` becomes the signed-in LifeOS: Command Centre, My Learning, Calendar, My Progress
   (the Journey content), My Library (decks and packs), Account. Built from what exists; goals and notifications
   need the first migration.
3. **Shared intelligence.** One daily plan from mastery, quests, course pacing and deadlines; cross-site library and
   calendar; course deadlines into the calendar.
4. **Advanced LifeOS.** Life-wide Gradify Earth from real progress, Academic Director, Cognitive State views,
   community, and AI hooks (still off).

## 4. Decisions needed from the owner

1. **What Gradify Pro includes.** Today Pro adds only Gradify AI allowances, and AI is off; everything else is free.
   The brief describes Pro benefits (more resources, advanced progress tools, specialist tools) that don't exist as
   Pro-only features. The website says only what's true. Before Pro is promoted harder, decide which non-AI features
   (if any) become Pro, knowing that moving something free behind Pro takes it away from current learners.
2. **Brand colour.** The brief mentions an existing blue palette; the live identity is black with the multicolour
   Gradify spectrum (blue to violet, pink, orange, gold). Stage 1 keeps the existing identity.
3. **Approval for each production change:** commits, pushes (pushing `main` publishes the site) and migrations.
