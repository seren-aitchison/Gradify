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

**9 November:** the previous coordinator's builders pushed Ecology, Engineering and Literature (School 1 each) after the takeover, so those are theirs: the temporary coordinator's duplicate builds of the same three are kept on branches `feat/ecogradify-ecology`, `course/engineering` and `course/literature` (not merged; usable as reference for later schools) and their builders stopped. To avoid another collision, a coordinator claims a row here, on main, before starting its builder. Worktrees for Art, Dentistry, Design, Geography, Investing, Spanish and Veterinary (`../Gradify-wt/<slug>`, cut from `dc17242` on 8 Nov) were made by another session; nobody else touches them until their owner is known.

**10 November:** a session (branch `courses/wave1-next-schools`) claimed rows 1–8 and wrote the next school of each: Business, Ecology, Literature, Music and Engineering School 2; Finance, Medicine and Health School 3 (149 lessons, 745 questions, all passing `new-course.mjs check`, `tests/new-courses.test.mjs` and `npm run qa` with no warnings on the new schools). Not yet merged or deployed, so the Deployed and Live verified columns still refer to the earlier schools. No builder output for these schools was found on any branch before writing.

**11 November:** the 10 November schools were merged (seren-aitchison/Gradify#1) and deployed in `b962199`; each new school's first lesson was opened without console errors from a local copy of `main` (getgradify.com itself isn't reachable from this session). The same branch, restarted from `main`, then added the next school for each site: Business, Ecology, Music, Engineering and Literature School 3; Finance, Medicine and Health School 4 (136 lessons, 680 questions, all passing the checks with no warnings on the new schools).

**12 November:** round 2 was merged (seren-aitchison/Gradify#2) and deployed in `2ba5313`. The same session then wrote round 3, one school per site (134 lessons, content standard 2): Business School 4 (Marketing), Ecology School 4 (Ecosystems and Energy Flow), Engineering School 4 (Mechanics of Materials), Finance School 5 (Management Accounting: Costing), Health School 5, Literature School 4 (Prose Fiction and the Novel), Medicine School 5 (Gastroenterology and Hepatology) and Music School 4 (Voice Leading and Cadences). All pass `new-course.mjs check`, `npm test` and `npm run qa` with no hard failures in the new schools; none is academically verified.

**12 November (later):** round 3 was merged (seren-aitchison/Gradify#3) and deployed in `ff21bae`. Round 4 followed, one school per site (131 lessons, content standard 2): Business School 5 (Operations and Supply Chain Management), Ecology School 5 (Biogeochemical Cycles), Engineering School 5 (Materials Science), Finance School 6 (Management Accounting: Planning, Control and Decisions), Health School 6 (Mental Health and Wellbeing), Literature School 5 (Medieval to Eighteenth-Century Literature), Medicine School 6 (Renal, Endocrine and Metabolic Medicine) and Music School 5 (Melody and Form). All pass `new-course.mjs check`, `npm test` and `npm run qa` with no hard failures; none is academically verified.

**12 November (round 5):** round 4 stays open for review as seren-aitchison/Gradify#8. Round 5 was written on `courses/wave1-round5`, stacked on that branch so it does not conflict: Business School 6 (People Management, 15), Ecology School 6 (Biodiversity and Evolution, 18), Engineering School 6 (Thermodynamics, 16), Finance School 7 (Financial Management, 23), Health School 7 (Health Behaviour and Behaviour Change, 17), Literature School 6 (Romantic to Contemporary Literature, 14), Medicine School 7 (Neurology and Psychiatry, 24) and Music School 6 (Ear Training and Musicianship, 15): 142 lessons at content standard 2, each passing `new-course.mjs check` (length bias within limit), `tests/new-courses.test.mjs` and `npm run qa` (0 hard, 0 arithmetic, 0 NUM problems). After merging the latest `main`: `npm test` 680 pass, `npm run qa`, `audit-sites` (0 status problems) and `build-site --check` pass. The remaining length-bias warnings for these sites are in schools written before the standard-2 check.

**12 November (round 6):** rounds 4 and 5 are still open for review (seren-aitchison/Gradify#8 and seren-aitchison/Gradify#9). Round 6 was written on `courses/wave1-round6`, stacked on round 5: Business School 7 (Finance for Managers, 17), Ecology School 7 (Conservation Biology, 18), Engineering School 7 (Fluid Mechanics, 14), Finance School 8 (Audit, Assurance and Ethics, 17), Health School 8 (Disease and Long-term Conditions, 17), Literature School 7 (Literary Theory and Criticism, 16), Medicine School 8 (Infection, Haematology and Oncology, 20) and Music School 7 (Counterpoint and Texture, 15). That makes 134 lessons at content standard 2 and 1,010 lessons across the eight sites. Each school passes `new-course.mjs check`, `tests/new-courses.test.mjs` and `npm run qa` (0 hard, 0 arithmetic, 0 NUM problems). `main` has no new commits since round 5 was synced. `npm test` (680 pass), `audit-sites` (0 status problems) and `build-site --check` pass.

**12 to 13 November (round 7):** rounds 4, 5 and 6 are still open for review (seren-aitchison/Gradify#8, seren-aitchison/Gradify#9 and seren-aitchison/Gradify#10). Round 7 was written on `courses/wave1-round7`, stacked on round 6: Business School 8 (Economics for Business, 15), Ecology School 8 (Climate Change, 21), Engineering School 8 (Electrical Circuits and Electronics, 18), Finance School 9 (Taxation, 12), Health School 9 (Public Health and Epidemiology, 18), Literature School 8 (Set Texts: Drama and Nineteenth-Century Prose, 18), Medicine School 9 (Musculoskeletal, Skin and the Special Senses, 21) and Music School 8 (Sound, Instruments and Orchestration, 21). That makes 144 lessons at content standard 2 and 1,154 lessons across the eight sites. Each school passes `new-course.mjs check`, `tests/new-courses.test.mjs` and `npm run qa` (0 hard, 0 arithmetic, 0 NUM problems). `npm test` (680 pass), `audit-sites` (0 status problems) and `build-site --check` pass. Tax figures in Finance School 9 are for 2025/26 and are dated in the notes. `main` has moved on since round 5 was synced (a builder round for other sites that touches only `docs/CURRICULUM_PROGRESS.md`, `docs/ECOSYSTEM-STATUS.md` and `kit/api/v1/catalogue.json`): those three generated files will conflict when the stack is merged, and regenerating them (`npm run qa`, `node scripts/audit-sites.mjs`, `node scripts/build-api.mjs`) resolves it.

**13 November (round 8):** rounds 4 to 7 were merged into `main` and deployed on 13 November (seren-aitchison/Gradify#8, seren-aitchison/Gradify#9 and seren-aitchison/Gradify#10 closed as merged). Round 8 was written on `courses/wave1-round8`, branched from `main`: Business School 9 (Entrepreneurship and Innovation, 15), Ecology School 9 (Field Methods and Statistics, 23), Engineering School 9 (Control Systems and Signals, 14), Finance School 10 (Business and Company Law, 14), Health School 10 (Health and Social Care Systems, 18), Literature School 9 (Set Texts: Romantic, Victorian and War Poetry, 15), Medicine School 10 (Acute, Surgical and Palliative Care, 21) and Music School 9 (Music History: Medieval to Classical, 15). That makes 135 lessons at content standard 2 and 1,289 lessons across the eight sites. Each school passes `new-course.mjs check`, `tests/new-courses.test.mjs` and `npm run qa` (0 hard, 0 arithmetic, 0 NUM problems). `npm test` (680 pass), `audit-sites` (0 status problems), `qa-audit` (0 broken links) and `build-site --check` pass. Law in Finance School 10 is stated for England and Wales; NHS structure and employment law reforms in progress are flagged in the notes.

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
| 1 | EcoGradify | Ecology (`ecology`) | Psychology course + Biology labs | branch `courses/wave1-round8` (this session, from `main`): School 9 written 13 Nov; School 10 next | 11 schools, 198 lessons | 162 (Schools 1–9) | 4 reused labs | pass | yes (beta) | `ff21bae` (previous schools) | yes, 8 Nov: u01-01 opened, no errors |
| 2 | BusinessGradify | Business and Management (`business`) | Psychology course | branch `courses/wave1-round8` (this session, from `main`): School 9 written 13 Nov; School 10 next | 11 schools, 178 lessons | 146 (Schools 1–9) | 1 reused labs | pass | yes (beta) | `ff21bae` (previous schools) | yes, 9 Nov: course and u01-01 opened live, no errors |
| 3 | FinanceGradify | Accounting and Finance (`finance`) | Psychology course | branch `courses/wave1-round8` (this session, from `main`): School 10 written 13 Nov; School 11 next | 12 schools, 202 lessons | 176 (Schools 1–10) | – | pass | yes (beta) | `ff21bae` (previous schools) | yes, 9 Nov: u01-01 opened, no errors |
| 4 | MedGradify | Medicine (`medicine`) | Psychology course + Nursing/Biology labs | branch `courses/wave1-round8` (this session, from `main`): School 10 written 13 Nov; School 11 next | 12 schools, 234 lessons | 192 (Schools 1–10) | 8 reused labs | pass | yes (beta) | `ff21bae` (previous schools) | yes, 9 Nov: u01-01 opened, no errors |
| 5 | LitGradify | English Literature (`literature`) | Psychology course | branch `courses/wave1-round8` (this session, from `main`): School 9 written 13 Nov; School 10 next | 10 schools, 166 lessons | 149 (Schools 1–9) | – | pass | yes (beta) | `ff21bae` (previous schools) | yes, 8 Nov: u01-01 opened, no errors |
| 6 | MusicGradify | Music (`music`) | Psychology course | branch `courses/wave1-round8` (this session, from `main`): School 9 written 13 Nov; School 10 next | 12 schools, 201 lessons | 154 (Schools 1–9) | 2 reused labs | pass | yes (beta) | `ff21bae` (previous schools) | yes, 9 Nov: course and u01-01 opened live, no errors |
| 7 | HealthGradify | Health and Wellbeing (`health`) | Psychology course + Biology labs | branch `courses/wave1-round8` (this session, from `main`): School 10 written 13 Nov; School 11 next | 11 schools, 176 lessons | 163 (Schools 1–10) | 7 reused labs | pass | yes (beta) | `ff21bae` (previous schools) | yes, 8 Nov: u01-01 opened, no errors |
| 8 | EngineerGradify | Engineering (`engineering`) | Psychology course + Physics/Maths labs | branch `courses/wave1-round8` (this session, from `main`): School 9 written 13 Nov; School 10 next | 12 schools, 191 lessons | 147 (Schools 1–9) | 17 reused labs | pass | yes (beta) | `ff21bae` (previous schools) | yes, 8 Nov: u01-01 opened, no errors |
| 9 | InvestorGradify | Investing (`investing`) | Psychology course | coordinator (this session): builder worktree plus reused schools (scripts/borrow-school.mjs) | 12 schools, 183 lessons | 49 (3 schools: 1, 2, 7) | – | pass | yes (beta) | `2eb88e2` | yes, 12 Nov: course and u01-01 opened live, no errors |
| 10 | VetGradify | Veterinary Science (`veterinary`) | Psychology course + Biology labs | coordinator (this session): builder worktree plus reused schools (scripts/borrow-school.mjs) | 12 schools, 210 lessons | 36 (2 schools: 1, 2) | 8 reused labs | pass | yes (beta) | `2eb88e2` | yes, 12 Nov: course and u01-01 opened live, no errors |
| 11 | DentalGradify | Dentistry (`dentistry`) | Psychology course | coordinator (this session): builder worktree plus reused schools (scripts/borrow-school.mjs) | 12 schools, 200 lessons | 32 (2 schools: 1, 2) | 1 reused labs | pass | yes (beta) | `2eb88e2` | yes, 12 Nov: course and u01-01 opened live, no errors |
| 12 | ArtGradify | Art and Design (`art`) | Psychology course | coordinator (this session): builder worktree plus reused schools (scripts/borrow-school.mjs) | 12 schools, 183 lessons | 35 (2 schools: 1, 2) | 3 reused labs | pass | yes (beta) | `2eb88e2` | yes, 12 Nov: course and u01-01 opened live, no errors |
| 13 | SportGradify | Sport and Exercise Science (`sport`) | Psychology course + body tools | coordinator (this session): builder worktree plus reused schools (scripts/borrow-school.mjs) | 12 schools, 205 lessons | 104 (6 schools: 1, 2, 3, 8, 9, 12) | 8 reused labs | pass | yes (beta) | `2eb88e2` | yes, 12 Nov: course and u01-01 opened live, no errors |
| 14 | EduGradify | Teaching (`teaching`) | Psychology course | coordinator (this session): builder worktree plus reused schools (scripts/borrow-school.mjs) | 12 schools, 228 lessons | 112 (5 schools: 1, 2, 5, 11, 12) | 3 reused labs | pass | yes (beta) | `2eb88e2` | yes, 12 Nov: course and u01-01 opened live, no errors |
| 15 | UnderGradify | University Study Skills (`university`) | Psychology course | coordinator (this session): builder worktree plus reused schools (scripts/borrow-school.mjs) | 12 schools, 193 lessons | 38 (2 schools: 1, 2) | – | pass | yes (beta) | `2eb88e2` | yes, 12 Nov: course and u01-01 opened live, no errors |
| 16 | PostGradify | Research and the Dissertation (`research`) | Psychology course + research methods | coordinator (this session): builder worktree plus reused schools (scripts/borrow-school.mjs) | 12 schools, 197 lessons | 17 (1 schools: 1) | 11 reused labs | pass | yes (beta) | `2eb88e2` | yes, 12 Nov: course and u01-01 opened live, no errors |
| 17 | ProGradify | Professional Skills (`professional`) | Psychology course | coordinator (this session): builder worktree plus reused schools (scripts/borrow-school.mjs) | 10 schools, 157 lessons | 68 (4 schools: 1, 3, 8, 10) | – | pass | yes (beta) | `2eb88e2` | yes, 12 Nov: course and u01-01 opened live, no errors |
| 18 | InternshipGradify | Careers and Employability (`careers`) | Psychology course | coordinator (this session): builder worktree plus reused schools (scripts/borrow-school.mjs) | 11 schools, 139 lessons | 24 (2 schools: 1, 2) | – | pass | yes (beta) | `2eb88e2` | yes, 12 Nov: course and u01-01 opened live, no errors |
| 19 | CreateGradify | Design Thinking and Creativity (`design`) | Psychology course | coordinator (this session): builder worktree plus reused schools (scripts/borrow-school.mjs) | 12 schools, 172 lessons | 56 (4 schools: 1, 2, 3, 7) | – | pass | yes (beta) | `2eb88e2` | yes, 12 Nov: course and u01-01 opened live, no errors |
| 20 | LanguageGradify | Spanish (`spanish`) | Psychology course | coordinator (this session): builder worktree plus reused schools (scripts/borrow-school.mjs) | 10 schools, 145 lessons | 31 (2 schools: 1, 2) | – | pass | yes (beta) | `2eb88e2` | yes, 12 Nov: course and u01-01 opened live, no errors |
| 21 | YouthGradify | GCSE Core (`gcse`) | Psychology course + Maths/Science | coordinator (this session): builder worktree plus reused schools (scripts/borrow-school.mjs) | 9 schools, 149 lessons | 30 (2 schools: 1, 2) | – | pass | yes (beta) | `2eb88e2` | yes, 12 Nov: course and u01-01 opened live, no errors |
| 22 | JuniorGradify | Primary (`primary`) | Psychology course | coordinator (this session): builder worktree plus reused schools (scripts/borrow-school.mjs) | 12 schools, 167 lessons | 24 (2 schools: 1, 2) | – | pass | yes (beta) | `2eb88e2` | yes, 12 Nov: course and u01-01 opened live, no errors |
| 23 | TechGradify · ForgeLab | Computer Science (`computing`) | needs its site folder first (`npm run new-site`) | coordinator (this session): builder worktree plus reused schools (scripts/borrow-school.mjs) | 12 schools, 179 lessons | 29 (2 schools: 1, 2) | – | pass | yes (beta) | `2eb88e2` | yes, 12 Nov: course and u01-01 opened live, no errors |
| 24 | HistoryGradify | History (`history`) | new-site + new-course scaffold (standard 2), own adapter `kit/subjects/history.js` | session `claude/lawgradify-nursegradify` (not a builder worktree) | ✅ 18 schools, 301 lessons | ✅ 18 of 18 schools, 301 lessons: generated and QA verified; 0 academically verified | 4 labs | ✅ QA verified (0 warnings) | ✅ | ✅ 4c03332 | ✅ 8 November 2026 (browser check of homepage, course, a School 10 lesson, a lab, Journey link; no errors) |

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
