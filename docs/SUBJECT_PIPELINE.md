# Producing a subject: the pipeline

This was written on 8 November 2026, after HistoryGradify was produced end to end. The aim is to spend almost all of a subject's effort on content, not plumbing.

Each step below is a command or a single file edit. The checks run at every stage, not only at the end. This document doesn't replace the builders' brief and tracker in [SITE-PRODUCTION.md](SITE-PRODUCTION.md); it describes the tools that brief uses.

```
Register → Scaffold → Syllabus → Lock → Write → Check → Add → Lock → Labs → Doctor → QA and tests → Push
```

| Step | Command or file | What it does |
|---|---|---|
| Register | `kit/core/sites.js`, `site-pages.js`, `site-content.js`, `site-maps.js` | Adds the site to the directory, with its homepage copy. The homepage example card is optional: `new-site` falls back to a default card. |
| Site | `npm run new-site -- <Site>` | Makes `<folder>/` from `kit/templates/subsite/`: homepage, study app, map and LifeOS. It renders every page before creating the folder, so a problem in the copy can't leave half a site behind. |
| Scaffold | `node scripts/new-course.mjs scaffold <slug> --site … --folder … --name … --accent … --expert …` | Makes `kit/courses/<slug>/` and `<folder>/course/index.html`, and links the course from the site. |
| Syllabus | `kit/courses/<slug>/syllabus.js` | Numbered schools, `> ` modules and `* ` lessons, with stages (TRACKS), paths and blurbs. |
| Lock | `node scripts/new-course.mjs lock <slug>` | Fixes the permanent lesson ids, and later the question ids. |
| Write | plain text files | Lessons in the notes format (`## Title`, `LV:`, `S:`, `O:` …), with no question ids. |
| Check | `node scripts/new-course.mjs check <slug> --unit uNN draft.txt …` | Lists every lesson-standard problem in the draft at once, plus the predicted length-bias warning, with the questions to fix. |
| Add | `node scripts/new-course.mjs add-notes <slug> uNN draft.txt …` | Writes `notes/uNN.js`, adds the school to `written`, and creates its QA record and written date. It refuses text that would break the module: backticks, `${`, single backslashes or question ids. |
| Lock, check | `lock`, then `check <slug> --unit uNN` | Assigns question ids, then confirms the school against the standard. |
| Labs | `kit/labs/<area>/`, `interactives.js`, `evidence.js`, `IX:` in notes | Labs on the shared runtime, linked and placed in lessons, with every challenge mapped to a lesson. |
| Doctor | `node scripts/new-course.mjs doctor <slug>` | Reports any gap in registration across Gradify: the config spec, course page, learner data, built site, subject adapter, tutor rules line, sitemap and offline cache. |
| QA and tests | `npm run qa`, `npm test` | QA runs the hard checks, content checks, lab coverage and concept report; then the full test suite runs. |

**One standard, one definition.** `scripts/lesson-standard.mjs` holds content standard 2 as code. `tests/new-courses.test.mjs` and `new-course.mjs check` both use it, so the command line and the tests can't disagree. The test now lists every problem, not just the first.

**What made HistoryGradify slow, and what changed:**
- **Problems surfaced one by one.** Problems appeared one at a time after locking: thin lessons, short explanations, malformed source dates, length bias. `check` now reports them all at once, on a draft, before anything is added.
- **Hand-built notes files.** Every notes file and its registration was assembled by hand. `add-notes` now does both.
- **`new-site` crashed half-way.** It crashed on homepage copy without an example card and left an empty folder. It now falls back to a default card and renders before writing.
- **Registration gaps found by failing tests.** Gaps across Gradify showed up one failing test at a time. `doctor` now lists them together.
- **Length bias.** Writing distractors to roughly the length of the right answer from the start kept length bias under the limit first time for Schools 7 and 9. Schools 2 and 10 needed a rewrite pass.

**Parallel production.** Builders working in their own worktrees use `scaffold`, `check`, `add-notes`, `lock` and `doctor`. All of these touch only their course's folder and site folder. The shared registration steps that `doctor` reports stay with the coordinating session, as SITE-PRODUCTION.md sets out: learner data, tutor rules, sitemap and the offline cache.
