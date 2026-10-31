# Building a Gradify sub-site

How to create a new subject site, and how to add a structured course to one, using what already exists. Follow the order; each step is independently shippable.

## 1. Register the site

Add (or check) its line in `kit/core/sites.js`: name `n`, audience `who`, icon `i` (from `kit/core/icons.js`), brand colour `c`, description `d`, optional domain `u`. Add search words to `KEYWORDS`.

## 2. Write its opening copy and homepage content

- `kit/core/site-pages.js`: the hero: two-line headline `h`, `sub`, the button text `go`, three `ticks`, and the demo window `card` (file, level, question, answer, four checks). Tested: exactly 2/3/4.
- `kit/core/site-content.js`: `SITES_CONTENT[name] = { kind, exams, topics }`. `kind` picks the shared audience copy (`uni`, `pro`, `school`, `kids`, `teacher`, `self`); `topics` is exactly six `[title, line]` pairs. Only describe what Gradify does today.
- `kit/core/site-maps.js`: three subtopics for each of the six topics (the learning map).

## 3. Generate the folder

```bash
npm run new-site -- LawGradify
```

This copies `kit/templates/subsite/` into `lawgradify/` (homepage, `app.html`, `map.html`, `lifeos.html`), fills in the copy and marks the site `built: true`. It never overwrites a folder. Every page carries `<meta name="gradify-site" content="LawGradify">`, which is what makes the shared app, store and styles behave as that site.

What you get for free, unchanged: the Gradify shell and design language, sign-in, the study app (notes → checked flashcards, spaced repetition, the Mastery Engine, Today/Progress/Plan), Notes Studio, the learning map, the LifeOS preview link, and the link back to getgradify.com. Don't copy any of these into the site folder; import them from `kit/`.

## 4. Optional: a 3D model

Add an entry to `kit/models/index.js` (or reuse one: NurseGradify uses the body model) and run `npm run add-3d`. `tests/site.test.mjs` checks every part has three facts and three cards.

## 5. Add a structured course

This is how SciGradify Physics, LawGradify and NurseGradify work.

1. **Curriculum:** `kit/courses/<slug>/syllabus.js` exports `UNITS` (parsed from a numbered text list: `1. Unit title` then `* Lesson title` lines), `TRACKS` (every unit in exactly one, with banner colours) and `PATHS` (curated routes for one goal each). Copy `kit/courses/law/syllabus.js` as the template.
2. **Config:** `kit/courses/<slug>/course.js` exports `{ site, slug, name, app, units, tracks, paths, written, notes, extras }`, plus optional `unitWord` (what to call a unit, e.g. `"School"`) and `notice` (a standing notice under the title, e.g. a disclaimer; HTML).
3. **Notes:** one file per unit, `kit/courses/<slug>/notes/uNN.js`, default-exporting a template string in the notes format (`docs/CURRICULUM_CONTENT_STANDARD.md`). Add the unit id to `written` when its file exists; unwritten units still appear on the path with "notes still being written".
4. **Page:** `<site>/<course-folder>/index.html`, copied from `lawgradify/course/index.html`: loads `base.css`, `components.css`, `subsite.css`, `model.css`, `course.css`, then `mountCourse(el, config)`. Keep the sub-site nav and footer.
5. **Link it:** add a `Course` link to the nav in the site's `index.html` and `map.html` (and `3d.html` if any), and a `.sub-course` card above `<div id="sub-more">` on the homepage.
6. **Offline:** add the course's `course.js` and `syllabus.js` to `SHELL` in `sw.js` and bump `CACHE`.
7. **Tests:** add the course to `tests/courses.test.mjs` (the loop at the top). It checks numbering, tracks, paths, that `written` matches the files, and that every written lesson has a lead, at least four blocks, two flashcards and two explained check questions.

## 6. Check it

```bash
npm test
```

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/<site>/` and `/<site>/<course-folder>/` at desktop and phone widths (390px): no horizontal scroll, no console errors, the notice visible, a lesson, a school quiz and the Paths view working.

## Reuse versus site-specific

| Reuse as-is (import from `kit/`) | Write per site |
|---|---|
| Site shell, styles, icons, colours | Copy in `site-pages.js`, `site-content.js`, `site-maps.js` |
| Study app, notes pipeline, Gradify AI function | Course curriculum, tracks and paths |
| Spaced repetition, Mastery Engine | Lesson notes and question banks |
| Course engine (path, lessons, quizzes, review, problems, XP, badges, progress, saving to account) | `unitWord`, `notice`, `extras` |
| 3D viewer | A model module, if the subject needs one |
| Store, auth, activity/XP | Nothing: never create a parallel account or progress system |

## Rules

- Don't edit shared kit behaviour for one site. If a site needs something new from the engine, add it as an optional config field whose default keeps every other site exactly as it was (as `unitWord` and `notice` do).
- Don't add a framework, bundler or npm runtime dependency.
- No secrets in site code. Paid APIs go in Supabase Edge Functions.
- Regulated subjects (law, health, finance) carry a standing notice saying what the course is not.

## Course data files (law and nursing pattern)

| File | What it holds |
|---|---|
| `syllabus.js` | Schools, modules (`> Title`) and lessons (`* Title`) as text, plus tracks and paths. Parsed by the shared `kit/course/syllabus.js` |
| `ids.js` | The permanent id of every lesson. Progress, saved notes and flashcards are keyed by these ids, so lessons can be moved, regrouped or inserted without losing anyone's progress. `npm run qa` records new lessons; tests fail if a locked id disappears |
| `map.js` | Mapping of schools and modules to frameworks (SQE, NMC platforms, fields), with each framework's owner, URL, version and verification status |
| `qa.js` | Review, source verification and expert sign-off records per school |
| `notes/uNN.js` | Lesson content |
| `course.js` | The config handed to the engine: units, tracks, paths (with optional per-school module `select`), map, qa, notice, unitWord |

Another Gradify subject can adopt the same structure by creating these files; nothing in the engine is law- or nursing-specific.
