# Gradify content API (for the native apps)

The iPhone, iPad and Mac apps read the same courses as the website, so a new subject or lesson needs no app update.

| What | Where | Changes when |
|---|---|---|
| Catalogue: every course, its site, status, accent, page and lesson counts | `https://getgradify.com/kit/api/v1/catalogue.json` | a course is added or its syllabus changes |
| A course: schools, modules and lessons (id, title, module), which schools are written, tracks, paths, mock exams, difficulty level names, the course notice | `…/kit/api/v1/courses/<slug>.json` | its syllabus or config changes |
| Lesson text, check questions, flashcards, worked examples, sources | the course's notes files: `notes` in the course file, e.g. `/kit/courses/maths/notes/u07.js` | a lesson is written or edited |

- **Generated, not hand-written:** `node scripts/build-api.mjs` writes `kit/api/v1/` from `kit/courses/*/course.js`. CI fails if it's out of date, and `tests/api.test.mjs` checks every course has a page, a syllabus and a notes file for each written unit.
- **Notes files** are ES modules whose default export is one template literal in the format in `kit/course/notes.js`. Read them as text, never run them: `kit/assess/canon.js` shows how (cut out the literal, decode its escapes, split lessons at `## Title`, read the tagged lines). The Swift client does the same.
- **Versioning:** `api` is 1. Fields are only added within a version; a breaking change gets `/v2/` alongside `/v1/`.
- **Accounts and progress** come from Supabase, as on the website (`docs/SETUP.md`, `supabase/migrations/`): `course_progress` holds a course's progress object, `assessment_attempts` one row per answer, with the evidence classes in `kit/learning/evidence-class.js`. Until the project is connected, apps keep progress on the device, as the website does.
