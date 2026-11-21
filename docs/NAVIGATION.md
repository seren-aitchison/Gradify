# Learning navigation and progress intelligence

The interface components these use (toasts, the save indicator, the palette, shortcuts, the resource switcher, split
screen, wayfinding) are the shared Gradify UX system: see [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

Every Gradify course (all sites that call `mountCourse`, `kit/course/course.js`) shares one navigation and progress
system. The aim: a learner opens a course, knows where they are, sees what needs work, and is learning in one click.

## Headers and footers (every page)

Three headers, each the same wherever it appears. Edit them in `scripts/sync-headers.mjs` (never in a page), then run
`node scripts/sync-headers.mjs`; `tests/navigation.test.mjs` fails if any page has drifted.

| Pages | Header | Footer | Behaviour |
| --- | --- | --- | --- |
| Hub: home, Explore, Journey, Pricing, Privacy, Terms, Status, Quality, AI usage, 404 | Explore · Sites · Journey · Pricing, current page marked; search, Sign in, Open Gradify | links, legal pages, contact | `kit/core/hubnav.js` |
| Every page of a subject site (home, map, LifeOS, 3D, each course) | the site's courses · Study · Map · LifeOS · any 3D page, and More (Notes, Progress, Plan, All Gradify sites); Sign in, Start free | the family, All Gradify sites, Pricing, Privacy, Terms, Contact | `kit/core/subheader.js`, `kit/core/subnav.js` |
| The app (`app.html`, each site's `app.html`) | its own app bar (Today, Study, Notes, Progress, Plan) | — | `kit/app/main.js` |

- A site's courses and 3D pages are read from its homepage's header, so a new course appears in every header of the
  site once it's on the homepage.
- On phones every header is the logo, search and a menu; the menu holds every link, sign-in, the main button, and the
  reading and theme settings (`kit/core/menu-set.js`).
- Every page starts with one "Skip to content" link to its main content, and has one `h1`.
- Course pages keep their own lesson search (and "/"), so their header has no Gradify-wide search button.
- Planned courses without pages (`PLANNED` in `kit/learning/learner-data.js`) are never linked.

## Where things are

| Piece | File |
| --- | --- |
| Topic status (Not started, In progress, Learned, Practised, Mastered, Needs revision) | `kit/learning/topic-status.js` |
| Target Tests (time × focus × scope → a question set) | `kit/assess/target-test.js` |
| Course outline sidebar and the command palette | `kit/course/navigator.js` |
| "Continue learning" on the Gradify and subject-site homepages | `kit/core/continue.js` |
| Views: Home, Syllabus, Revise, Target Test, lesson toolbar, completion summary, topic map | `kit/course/course.js` |
| Styles (status colours are tokens on `:root`) | `kit/styles/course.css`, "Navigation & progress" section |

## Navigation

- **Tabs**: Home · Syllabus · Revise · (workspace) · Exams · Lab · Progress, with everything else under **More**. Every older address (`#/review`, `#/paths`, …) still works.
- **Home** (`#/home`): continue where you left off, sessions by time available (5–45 min), evidence-based recommendations, today's missions, strengths and weaknesses, course progress by stage, recently viewed and bookmarks. New learners land on the course overview when it has one.
- **Syllabus** (`#/learn`): stage → unit → module → lesson, numbered (3, 3.2), each lesson with its status, filterable by status. The road is still there behind the Outline/Road switch.
- **Course outline**: beside every lesson and quiz (a drawer below 1280px), current lesson highlighted with its questions, flashcards and unit quiz under it, filterable.
- **Lesson toolbar**: full breadcrumb, bookmark (B), focus mode (F), search, previous/next (← →) and lesson x of y. Under the title, a toolkit links the topic's check questions, flashcards, interactives, unit quiz and a 5-minute target test.
- **Search**: `/` or ⌘K/Ctrl+K anywhere opens the palette: lessons, units, modules, labs and actions, plus section headings and key terms inside the notes (`#/lesson/<id>/co-s<n>` lands on the section).
- **Phone**: a bottom dock (Home, Syllabus, Search, Revise, Progress; in a lesson, Outline, Previous, Search, Next, Home).

## Progress

Completion and mastery are kept apart. A lesson's status comes from evidence (`lessonSignals` over attempt records):
final marks only, the latest answer to each question, labs merely "attempted" never count, and nothing is marked as
forgotten just for not being opened. Mastered = completed and right (≥85%) across 3+ questions; Needs revision = 2+
questions with the latest answers under 60%.

Bookmarks (`S.marks`, + time on / − time off) and recently viewed (`S.recent`) sync with the rest of course progress
(`kit/course/progress.js`). Target Test answers are recorded in the `quiz` context, so they count as assessment evidence.
Missions are the shared quests (`kit/game/quests.js`); claiming one pays into the Journey's ledger (`gradify.game`).
