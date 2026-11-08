# Subject site production

Mass production of the remaining Gradify subject sites, by duplication and content replacement. Nothing here
redesigns a page or changes shared infrastructure: every new course is the PsychGradify course structure, run
by the shared course engine, with new subject content.

## How a site is produced

1. **Template.** Every site already has its folder (homepage, study app, map, LifeOS, often 3D) from
   `npm run new-site`. The course is duplicated from PsychGradify's (`kit/courses/psychology/`, content
   standard 2) by `node scripts/new-course.mjs scaffold <slug> …`, which also writes `<site>/course/index.html`
   and links it from the site's homepage, map and 3D pages.
2. **Content.** A subject builder writes the syllabus (every school and lesson), the course copy, and the
   notes of the first schools to standard 2. Unwritten schools appear on the path as "notes still being
   written"; nothing is filled with placeholders.
3. **Lock.** `node scripts/new-course.mjs lock <slug>` records the permanent lesson ids and question ids.
4. **Tests.** `tests/new-courses.test.mjs` checks every new course automatically (structure, ids, the lesson
   standard, question ids, interactives, page and registration).
5. **Integration** (the coordinating session only, so builders never edit shared files): status in
   `kit/core/sites.js`, `kit/learning/learner-data.js`, QA config in `scripts/qa-courses.mjs`, tutor safety
   rules, `sw.js`, the browser checks' page lists, sitemap, `npm run qa`, ecosystem status.
6. **Deploy and verify.** Push to `main` (the Test and deploy workflow), then load each course live.

## Coordination (8 November 2026)

The previous coordinator (branch `claude/lawgradify-nursegradify`) is paused. A temporary coordinator (session "Build PsychGradify and SocGradify subject sites", branch `feat/psych-soc-gradify`) took over: it found no builder output on any branch and no course folder for any of the 23 subjects, so nothing was resumed or overwritten. It owns the shared integration files until the previous coordinator returns, and integrates each course as its builder reports. Wave 1 (8 builders) started 8 November; Wave 2 starts as Wave 1 finishes.

## Tracker

"Generated" means the files exist and pass the tests. "Live verified" means the course was loaded on
getgradify.com after deployment and a lesson opened without errors. A site is never reported live until then.

**Three levels of completion, never merged.** A course counts as finished educational content only at the third:

| Level | Means | Shown in this tracker by | Who can award it |
|---|---|---|---|
| Generated | The content exists: syllabus mapped, lessons written | Curriculum, Lessons written | Any builder |
| QA verified | Automated checks pass: `new-course.mjs check`, `tests/new-courses.test.mjs`, `npm run qa` with no hard failures and no warnings | Tests | Any builder, by running the checks |
| Academically verified | A suitably qualified person has reviewed the content, checked sources and signed it off | `reviewed`, `sources` and `signoff` in the course's `qa.js` (shown in docs/CURRICULUM_PROGRESS.md) | Only a named, qualified human; never an AI session (the tests refuse an AI sign-off) |

So "18 schools generated, 5 QA verified, 0 academically verified" is a complete and honest status; "100% generated" is never "100% finished".

| # | Site | Course (slug) | Template used | Builder (branch, worktree) | Curriculum | Lessons written | Resources | Tests | Registered | Deployed | Live verified |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | EcoGradify | Ecology (`ecology`) | Psychology course + Biology labs | build-ecology: `feat/ecogradify-ecology` in `../Gradify-wt-ecology`, building | – | – | – | – | – | – | – |
| 2 | BusinessGradify | Business and Management (`business`) | Psychology course | build-business: `course/business` in `../Gradify-wt/business`, building | – | – | – | – | – | – | – |
| 3 | FinanceGradify | Accounting and Finance (`finance`) | Psychology course | build-finance: `course/finance` in `../Gradify-wt/finance`, building | – | – | – | – | – | – | – |
| 4 | MedGradify | Medicine (`medicine`) | Psychology course + Nursing/Biology labs | build-medicine: `course/medicine` in `../Gradify-wt/medicine`, building | – | – | – | – | – | – | – |
| 5 | LitGradify | English Literature (`literature`) | Psychology course | build-literature: `course/literature` in `../Gradify-wt/literature`, building | – | – | – | – | – | – | – |
| 6 | MusicGradify | Music (`music`) | Psychology course | build-music: `course/music` in `../Gradify-wt/music`, building | – | – | – | – | – | – | – |
| 7 | HealthGradify | Health and Wellbeing (`health`) | Psychology course + Biology labs | build-health: `course/health` in `../Gradify-wt/health`, continuing with School 3+ | 11 schools, 176 lessons | 31 (Schools 1–2) | 7 reused labs | pass | yes (beta) | `cd1c1d2` | yes, 8 Nov: u01-01 opened, no errors |
| 8 | EngineerGradify | Engineering (`engineering`) | Psychology course + Physics/Maths labs | build-engineering: `course/engineering` in `../Gradify-wt/engineering`, building | – | – | – | – | – | – | – |
| 9 | InvestorGradify | Investing (`investing`) | Psychology course | – | – | – | – | – | – | – | – |
| 10 | VetGradify | Veterinary Science (`veterinary`) | Psychology course + Biology labs | – | – | – | – | – | – | – | – |
| 11 | DentalGradify | Dentistry (`dentistry`) | Psychology course | – | – | – | – | – | – | – | – |
| 12 | ArtGradify | Art and Design (`art`) | Psychology course | – | – | – | – | – | – | – | – |
| 13 | SportGradify | Sport and Exercise Science (`sport`) | Psychology course + body tools | – | – | – | – | – | – | – | – |
| 14 | EduGradify | Teaching (`teaching`) | Psychology course | – | – | – | – | – | – | – | – |
| 15 | UnderGradify | University Study Skills (`university`) | Psychology course | – | – | – | – | – | – | – | – |
| 16 | PostGradify | Research and the Dissertation (`research`) | Psychology course + research methods | – | – | – | – | – | – | – | – |
| 17 | ProGradify | Professional Skills (`professional`) | Psychology course | – | – | – | – | – | – | – | – |
| 18 | InternshipGradify | Careers and Employability (`careers`) | Psychology course | – | – | – | – | – | – | – | – |
| 19 | CreateGradify | Design Thinking and Creativity (`design`) | Psychology course | – | – | – | – | – | – | – | – |
| 20 | LanguageGradify | Spanish (`spanish`) | Psychology course | – | – | – | – | – | – | – | – |
| 21 | YouthGradify | GCSE Core (`gcse`) | Psychology course + Maths/Science | – | – | – | – | – | – | – | – |
| 22 | JuniorGradify | Primary (`primary`) | Psychology course | – | – | – | – | – | – | – | – |
| 23 | TechGradify | Computer Science (`computing`) | needs its site folder first (`npm run new-site`) | – | – | – | – | – | – | – | – |
| 24 | HistoryGradify | History (`history`) | new-site + new-course scaffold (standard 2), own adapter `kit/subjects/history.js` | session `claude/lawgradify-nursegradify` (not a builder worktree) | ✅ 18 schools, 301 lessons | 7 of 18 schools, 130 lessons (Schools 1, 2, 7, 9, 10, 11, 12): generated and QA verified; 0 academically verified | 4 labs | ✅ QA verified (0 warnings) | ✅ | ✅ 4c03332 | ✅ 8 November 2026 (browser check of homepage, course, a School 10 lesson, a lab, Journey link; no errors) |

Priority: subjects with a clear published curriculum and the closest structure to an existing course first
(1–8), then the professional and specialist courses (9–13), then the stage-of-life sites (14–22), whose
curricula are skills rather than a subject specification.

## Brief for a subject builder

You build one course, in your own worktree, and touch **only** `kit/courses/<slug>/` and `<folder>/`.
Never edit shared files (`kit/core/`, `kit/course/`, `kit/learning/`, `scripts/`, `tests/`, `sw.js`, other
courses): the coordinating session registers the course.

1. `node scripts/new-course.mjs scaffold <slug> --site <Site> --folder <folder> --name "<Course name>" --accent "<#hex>" --expert "<who must sign it off>" --blurb "<one sentence for the homepage card>"`
2. **Syllabus** (`syllabus.js`): the whole curriculum, 8–12 schools, each with 12–24 lessons in at least two
   named modules (`> ` lines), modelled on a real framework (UK national curriculum, GCSE/A level
   specifications, QAA subject benchmark statements, a professional body's syllabus) and named in the
   overview. `TRACKS` put every school in exactly one stage; at least three `PATHS`; a `BLURBS` line for every
   school.
3. **Course copy** (`course.js`): a subject-specific `notice` (over 100 characters; what the course is not:
   for health, medicine, dentistry, veterinary, finance and investing it must say it is education, not
   advice, and point to the right professional), `overview` (headline, an intro over 80 characters, the
   sources it draws on, six `learn` pairs), `extras`, and `written`.
4. **Notes**: write each school as plain text, check it, then add it (docs/SUBJECT_PIPELINE.md):
   `node scripts/new-course.mjs check <slug> --unit u01 draft.txt` lists every problem with the standard at once,
   including the predicted length-bias warning, before anything is added; `node scripts/new-course.mjs add-notes
   <slug> u01 draft.txt` writes `notes/u01.js`, refusing text that would break it, and registers the school as
   written with its QA record and date. Content standard 2, exactly as
   `kit/courses/psychology/notes/u01.js`: per lesson `LV:`, `S:` (over 60 characters), three `O:`, at least
   two `H:` sections and six content blocks, a `K:`, a `!:`, an `X:` worked example where it fits, at least
   one `EV:` (established, contested or hypothetical), two `T:` terms, `SUM:`, two `SRC:` lines
   (`citation | kind | year | https-url`, kind one of legislation, case, rule, guidance, standard, primary,
   secondary, data; cite only real works you are sure of, and omit a URL rather than guess one), two `Q:`
   flashcards and at least five questions covering levels 1, 2 and 3 (`M1@1:` … `SA3@2,3:` with a marking
   rubric), every question linked to an objective. Never use `|` except as a separator; never write the
   `#id` part of a question tag. Accurate, dense, exam-relevant: no placeholders, no padding.
5. **QA record** (`qa.js`): `{ standard: 2, reviewed: null, sources: null, signoff: null }` and a
   `WRITTEN_ON` date for each written school.
6. **Interactives** (optional): reuse an existing Gradify lab only where it genuinely teaches a lesson
   (`kit/labs/*`), registered in `interactives.js` with `L("Lesson title")`.
7. `node scripts/new-course.mjs lock <slug>`, then `node scripts/new-course.mjs check <slug>` and
   `node --test tests/new-courses.test.mjs` until both pass. `node scripts/new-course.mjs doctor <slug>` lists what
   the coordinating session still has to register (learner data, tutor rules, sitemap, offline cache).
8. Commit in your worktree. Report at the three levels: generated (schools, lessons, lessons written,
   interactives), QA verified (check and test results) and academically verified (always "not yet" from a builder).
