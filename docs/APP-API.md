# Gradify content API (for the native apps)

The iPhone, iPad and Mac apps read the same courses as the website, so a new subject or lesson needs no app update.

| What | Where | Changes when |
|---|---|---|
| Catalogue: every course, its site, status, accent, page and lesson counts | `https://getgradify.com/kit/api/v1/catalogue.json` | a course is added or its syllabus changes |
| A course: schools, modules and lessons (id, title, module), which schools are written, tracks, paths, mock exams, difficulty level names, the course notice | `…/kit/api/v1/courses/<slug>.json` | its syllabus or config changes |
| Labs: each course's interactive labs (id, title, kind, description, what it simplifies, number of challenges, the lessons it serves) and a `url` that opens the lab on its own | `interactives` in `…/kit/api/v1/courses/<slug>.json` | a lab is added or linked to more lessons |
| Lesson text, check questions, flashcards, worked examples, sources | the course's notes files: `notes` in the course file, e.g. `/kit/courses/maths/notes/u07.js` | a lesson is written or edited |

- **Generated, not hand-written:** `node scripts/build-api.mjs` writes `kit/api/v1/` from `kit/courses/*/course.js`. CI fails if it's out of date, and `tests/api.test.mjs` checks every course has a page, a syllabus and a notes file for each written unit.
- **Notes files** are ES modules whose default export is one template literal in the format in `kit/course/notes.js`. Read them as text, never run them: `kit/assess/canon.js` shows how (cut out the literal, decode its escapes, split lessons at `## Title`, read the tagged lines). The Swift client does the same.
- **Versioning:** `api` is 1. Fields are only added within a version; a breaking change gets `/v2/` alongside `/v1/`.
- **Accounts and progress** come from Supabase, as on the website (`docs/SETUP.md`, `supabase/migrations/`): `course_progress` holds a course's progress object, `assessment_attempts` one row per answer, with the evidence classes in `kit/learning/evidence-class.js`. Until the project is connected, apps keep progress on the device, as the website does.

## Labs in lessons

A lesson's notes place a lab with a line `IX: <id>` at the point it's taught (the app's parser already reads it as an activity block). Look the id up in the course's `interactives` and show it by opening its `url` in a web view (`WKWebView` on Apple platforms): the URL is the course page at `#/practice/<id>`, which shows that one lab, works at phone width and needs no sign-in. Challenges completed in the web view count on the website's progress on that device; recording them in the app's own progress waits for accounts. An unknown id is skipped, never a crash. Added 9 November 2026 as an additive v1 field.
