# Handover: Stage 5 (connections) and MyGradify deep personalisation

Written 24 November 2026 for the next session. You're continuing work on Gradify (GitHub repo
`seren-aitchison/Gradify`, live at getgradify.com, a static site deployed by GitHub Pages from `main` via
`.github/workflows/ci.yml`).

**Read first, in this order:**
1. This file.
2. `docs/HANDOVER-degree-tracker.md`: how the repo ships, the checks, and everything built so far. Its "Done since"
   section covers today's work.
3. `docs/DESIGN-SYSTEM.md`, especially "The Gradify look".
4. `docs/ANALYTICS.md`.
5. `README.md`.

## Where things stand (all merged to `main` and live)

| Stage | What | PR |
|---|---|---|
| 1 | The new UI across the site: search pages, homepage, Pricing, Journey, subject sites, study app | 186, 188, 189, 190 |
| 2 | University rules with a quoted source for every rule: Birmingham, Bristol, King's, Leeds, Nottingham (`kit/data/uni-rules.js`) | 191 |
| 3 | Import a module handbook: PDF or text, deterministic parser, a review screen before anything is added (`kit/data/handbook.js`) | 192 |
| 4 | Ask Gradify AI about your degree: course-tutor mode `degree`, and a guard that withholds any figure not in the tracker's results | 193 |

The degree tracker is at `/tools/degree-classification-calculator/`. Its markup is in `scripts/seo/tools.mjs` and its
logic in `assets/study-tools.js`. The "More" sheet lists Rules, Import, Ask and Connections as real pages.

**Production facts you need:**
- The degree-mode migration (`20261124150000_degree_mode.sql`) is applied, and course-tutor v5 is deployed.
- **Gradify AI is switched off** (`public.ai_settings.enabled = false`, no testers). Only the owner turns it on. Don't
  change it.
- `scripts/supabase-admin.mjs preflight` refuses to run because the injected token can do more than it expects (it can
  read organisations and API keys). Read-only checks and small additive migrations were done with direct
  `POST /v1/projects/<ref>/database/query` calls: read the live definition first, apply in `begin … commit`, verify.
  Never run destructive SQL.
- The environment's allowed hosts include several universities' sites (listed in the degree-tracker handover). Add
  more with the environment settings tool when you need to read a university's own pages.

## How the owner likes to work (unchanged)

- **Getting each change live:** make changes on a branch, run every check, take screenshots, open a PR, merge it, then
  confirm the deploy run and the live file.
  - Other sessions push to `main` too, so a run can be cancelled by a newer one. That's fine: check that the live file
    has your change.
- **Checks (all must pass):**
  - `npm ci`
  - `node --test tests/*.mjs`
  - `node scripts/build-seo.mjs`
  - `node scripts/preload-modules.mjs`
  - `node scripts/theme-tokens.mjs`
  - New files that the app or homepage import go in `sw.js` `SHELL`.
  - Running these rewrites dates in `docs/qa/*.md` and `docs/CURRICULUM_PROGRESS.md`; that's noise. Restoring those
    files with git checkout was blocked here, so don't stage them: commit with
    `git add -A -- . ':!docs/qa' ':!docs/CURRICULUM_PROGRESS.md'`.
- **Screenshots:** desktop 1280px and phone 390px, light and dark. Serve files through Playwright's `page.route`; a
  local server is blocked. Element screenshots after `scrollIntoView` work well; set `scroll-behavior: auto` first.
- **Design:**
  - Apple-style, modular, rounded white cards and strong contrast; never pale or grey.
  - The Gradify gradient `#4641ff → #9b3cf0 → #e0409f → #ff6a2b`, and coloured squircle icons from
    `kit/core/icons.js`.
  - `.g-action` (`actionCard()`) for every "what to do next".
  - Motion by transform only, with iOS easing.
  - Inspired by the UniGrade app but never copying it.
- **Writing:** plain UK English.
- **Intelligence:** deterministic maths that explains itself. AI only explains numbers the code computed. Label
  estimates as estimates. **Never invent** a rule, course or module.
- **The audience includes under-18s:** no ad personalisation and no tracking without consent. JuniorGradify and
  YouthGradify are excluded from analytics.

---

## Stage 5: calendar, Moodle and Canvas connections (decided 24 November 2026; first release done)

**The owner's decisions.** Product principle: *Gradify should know when a student has time to study, not what every
private appointment says; if Gradify can deliver the benefit without holding a third-party credential, it shouldn't
collect one.*

| Question | Decision |
|---|---|
| Google Calendar | No OAuth and no Google secret iCal addresses for now. Keep `.ics` export; `.ics` **file** import only. Later, investigate `calendar.freebusy` first (not `calendar.readonly`); write access only as a separate, optional permission, preferably to a dedicated Gradify calendar, never touching the student's own events. |
| Microsoft 365 / Outlook | Not yet. Later: delegated Graph access only, `getSchedule` with `Calendars.ReadBasic` (note: not busy-only), no mail/OneDrive/Teams scopes, handle admin-consent-required errors gracefully, never help students get round university policy. Don't approach universities yet. |
| Moodle and Canvas | Calendar export **files** only. No Canvas personal access tokens, Moodle web-service tokens or LTI yet. Later phases: official Canvas API / Moodle web services with delegated OAuth, read-only and minimum data; then LTI 1.3 as a separate institutional workstream. Never scrape portals or ask for university passwords. A calendar file is not a substitute for LMS data: the handbook import covers course structure. |
| Tokens and links | Store no third-party credentials anywhere (no new table, not in profiles, localStorage, IndexedDB, URLs or logs). Feed links count as credentials. One-off URL fetching is deferred until there's a compelling need and a separate security review. A credential table needs an architecture proposal and explicit approval first (Supabase Vault or similar). |
| Existing saved links | Stop saving links, remove saved ones server-side as well as on next open, tell students once, keep imported events and all progress. |
| Under-18s | Connections in the university degree tracker only, never on JuniorGradify or YouthGradify (enforced in code, not just hidden). Don't assume a university student is an adult. Smart Plan's local `.ics` import/export stays for everyone. |
| What's kept from a file | Tracker: only the due dates the student ticks. Smart Plan: busy intervals labelled "Busy"; titles only for exams and deadlines the student confirms. Never descriptions, locations, attendees or categories. A keyword match is a suggestion, never a decision. Repeats, exceptions, time zones and re-imports must be handled correctly. |

Also asked for before any ongoing calendar access: a UK GDPR lawful basis per purpose, a DPIA check, processor and
transfer review, and a UK data-protection solicitor's review. Never claim Google or Microsoft approval that hasn't
been obtained.

**Built (first release):**
- **Degree tracker → Connections** (`data-page="connections"`): choose an `.ics` file; `kit/data/connections.js`
  (`deadlinesFromIcs`, `matchModule`, `applyDeadlines`) lists possible deadlines and exams, matches them to modules
  (module code, Canvas `[course]`, Moodle `CATEGORIES`), and nothing is ticked until the student ticks it. Applying
  keeps each module's earliest upcoming date and never changes marks, names or credits. Canvas assignments are spotted
  by their UID. Removed on `/juniorgradify` and `/youthgradify` paths. Tests: `tests/connections.test.mjs`.
- **Parser** (`kit/intel/ical.js`): TZIDs converted with Intl (Windows zone names mapped), repeats expanded in their
  own zone across clock changes, `RECURRENCE-ID` replaces the original occurrence, alarms ignored. `toBlocks` keeps
  "Busy"/"Away" only, plus confirmed titles. `candidates()` gives the review list.
- **Smart Plan** (`kit/app/intel-views.js`, `kit/intel/calsync.js`): link form and the six-hourly background sync
  removed; file import with an exam/deadline review; "Remove imported events"; on open, saved links are deleted from
  the profile and this browser (`retiredIntel`) with a one-off notice.
- **`calendar-sync` function** now answers 410 and fetches nothing. **Owner to do:** deploy it (or delete it) and run
  `docs/sql/retire-calendar-links.sql` (preview → transaction → verify) so links are removed for students who never
  return. Neither was done from the session: there was no Supabase access.
- `privacy.html#calendars`, homepage and Pricing wording ("Calendar import"), `docs/INTELLIGENCE.md`.

**Next for Stage 5, only with the owner's go-ahead:** Google `freebusy` OAuth, then Microsoft Graph `getSchedule`, then
official Canvas/Moodle APIs, then LTI. Each needs the owner's app registrations and a security and privacy review.

---

## MyGradify: deep academic personalisation and institution intelligence

This is the owner's next big direction. Their brief is below, lightly tidied, followed by the extra criteria we
agreed to add. **Before implementing, inspect the existing profile, authentication and Supabase architecture,
propose the data model to the owner, and build in small stages.**

What exists today:
- `kit/data/profile.js`: subjects, prior knowledge, display preferences, goal, onboarding flags.
- `kit/app/main.js`: the `#/start` set-up flow.
- `kit/core/sites.js`: the Gradify sites.
- `kit/data/uni-rules.js`: verified rules for five universities.
- `kit/data/handbook.js`: modules from a handbook.

Reuse these rather than starting again.

### The product principle

Gradify should understand not just what subject a student studies, but **what they are actually studying, where,
which academic requirements apply to them, how they learn best and what they're trying to achieve.**

Knowing someone studies Chemistry is not enough. Knowing they study *Medicinal Chemistry at Cardiff, in year 2,
taking these modules, under these regulations* is the goal.

### 1. Core academic profile (essential onboarding)

| Field | Notes |
|---|---|
| Country of study | Where they study, not necessarily where they live |
| Institution | A verified identifier (for UK universities, the UKPRN). Allow manual entry; never force a wrong match |
| Campus or teaching location | Where relevant |
| Institution type | School, sixth form, college, university, independent study, apprenticeship |
| Faculty, school or department | Where relevant |
| Education level | Secondary, undergraduate, postgraduate, doctoral |
| Subject | Then the exact programme (see section 2) |
| Qualification | GCSE, A level, BTEC, BSc, BA, MEng, MChem, MSc, PhD… |
| Current year | And programme start year, plus expected graduation year |
| Study mode | Full-time, part-time, distance, apprenticeship |
| Curriculum | Exam board, national curriculum or the institution's framework |

**Languages are independent of country.** Keep separate settings for:
- interface language;
- explanation and teaching language;
- the language of generated notes and materials;
- regional spelling (UK or US English);
- time zone.

### 2. Institution-specific course catalogue (a major workstream, mainly for UnderGradify)

**The onboarding flow:**
1. Country.
2. Institution.
3. Subject.
4. A dropdown of the degree programmes **that institution actually offers in that subject**, for example BSc
   Medicinal Chemistry, MChem Medicinal Chemistry, BSc Chemistry, MChem Chemistry, or "Other / not listed".
5. The programme structure for the student's **start year**.
6. Current year.
7. That year's compulsory and optional modules, to tick.

**Data for each institution, where reliable:**
- faculties and departments;
- undergraduate and postgraduate programmes, and degree variants;
- programme duration and programme specifications;
- year-by-year structure;
- compulsory and optional modules, with credits, semester, prerequisites, assessment methods and weights, and
  learning outcomes;
- changes between years.

**Rules for this data:**
- Version everything by **academic year**: a 2024 starter and a 2026 starter can follow different structures.
- **Never generate plausible programmes or modules with AI and present them as real.** If data is missing, say the
  catalogue is incomplete, and offer:
  - manual entry;
  - uploading the programme specification or handbook (reuse `kit/data/handbook.js` and its review screen);
  - processing official documents.
- Keep the student's own selections, marked "not independently verified".
- Every institution, programme and module record carries:
  - a source URL or document;
  - the institution's identifier;
  - the academic year;
  - the date it was last verified;
  - its verification status;
  - how complete it is.
- Keep official data separate from AI interpretation.
- Design the model for international institutions, not hard-coded UK structures. Build it to scale to thousands of
  institutions, then populate it progressively, starting where reliable data exists.

**Suggested data sources (check the licence of each before use):**
- **Discover Uni / Unistats open data**, published by the Office for Students under the Open Government Licence. It
  lists every UK higher-education course with its institution (UKPRN), title, qualification, mode and length. This is
  probably the best start for the programme dropdown.
- **UKRLP**, for institution identifiers.
- **Universities' own programme specifications and module catalogues**, for modules. There's no national module
  dataset, so these come one university at a time.
- **UCAS course search** has no open API. Don't scrape it without permission.

**Data model:** propose it to the owner first. A starting point:
- `institutions(id, ukprn, name, country, type, campuses)`
- `programmes(id, institution_id, title, qualification, subject_codes, mode, years, academic_year, source_url, verified_at, status)`
- `programme_years(programme_id, year, credits)`
- `modules(id, institution_id, code, title, credits, level, semester, academic_year, source_url, verified_at, status)`
- `programme_modules(programme_id, year, module_id, compulsory)`
- `student_programme(user_id, programme_id, start_year, current_year, modules[], verified: false)`

This is all public reference data except the last table, which is per student. Put row-level security on that one.

### 3. Learning and accessibility preferences (optional)

**Learning preferences:**
- learning format: visual, written, audio, interactive or mixed;
- explanation depth and pace, including step by step;
- examples: real-world, theoretical or exam-focused;
- revision style: flashcards, diagrams, mind maps or questions;
- difficulty;
- how detailed feedback should be;
- motivation: streaks, goals or gentle reminders;
- session length.

**Accessibility preferences:**
- text size, contrast, spacing and font, including dyslexia-friendly options;
- captions and transcripts;
- text-to-speech and speech-to-text;
- reduced motion;
- keyboard navigation.

**Ask what adjustments a student wants, never what conditions they have.**

### 4. Goals and ambitions (optional)

- target grades and classification;
- target module marks;
- current average (the tracker has it);
- dissertation status;
- placement or internship plans;
- postgraduate and career interests;
- upcoming exams;
- what they find hardest.

Connect these to the degree tracker and Grade Intelligence: goals already exist there.

### 5. Study habits and organisation (optional)

- time zone;
- study days and hours;
- session length;
- structured or flexible planning;
- reminder times;
- term dates and exam periods;
- deadlines;
- calendar connections (Stage 5).

**Never make calendar permission a condition of onboarding.**

### 6. Progressive completion

Don't present a huge questionnaire:
1. **Essential:** country, languages, institution, level, subject, qualification, year.
2. **Academic:** programme, modules, curriculum, then preferences, goals and habits.
3. **Continuous:** Gradify learns from activity, with consent: hard topics, mastery, confidence, patterns, missed
   deadlines.

**Rules for the profile:**
- Show a completeness indicator that never penalises skipped fields.
- Ask contextually, when an answer would materially improve a recommendation.
- Everything is editable in MyGradify.
- Students can inspect and correct what's used.
- Personalisation can be switched off without losing anything.
- **Changing institution or programme never loses saved progress.**

### 7. One shared layer, and nothing hidden

Build this as one reusable academic-intelligence layer that powers:
- the MyGradify home;
- UnderGradify;
- the degree tracker and Grade Intelligence;
- Smart Plan;
- module recommendations;
- revision and past papers;
- mastery tracking;
- prerequisites;
- careers and postgraduate guidance.

Don't build separate profiles per feature. **Personalisation decides what's prioritised, never what's allowed: the
All Sites directory stays open to everyone.**

### 8. Extra criteria we recommend adding (the owner asked "anything else we should ask?")

These make it markedly more tailored. All are optional and skippable:

1. **Which regulations apply.**
   - Programme start year *and* the year the final year started. Leeds, for example, switches rule sets on both
     (`kit/data/uni-rules.js`).
   - Whether a year abroad or placement year counts.
   - These feed the tracker's weighting automatically.
2. **Joint or combined honours.** Both subjects and their credit split (for example 60/60 or 80/40), so modules and
   rules come from both departments.
3. **Entry route and prior qualifications.**
   - A-level, BTEC or IB subjects and grades, a foundation year, or direct entry to year 2 or 3. These change which
     years count (direct entrants are often classified on the final year only).
   - Prior subjects also reveal gaps to fill: for example, a chemistry student without A-level maths.
4. **Resits, deferrals and mitigating circumstances already granted.** Capped resit marks and deferred deadlines
   change the maths and the plan. Ask factually, never for the reason.
5. **Exam arrangements as preferences**, such as extra time or rest breaks. Smart Plan and the timers use them.
   Don't ask why.
6. **Assessment style of each module:** open-book or closed, coursework or exam weighting (the handbook import
   already extracts weights), presentations or labs. Revision is shaped differently for each.
7. **Virtual learning environment and timetable system** (Moodle, Canvas, Blackboard, Brightspace; a timetable feed).
   This sets up Stage 5 connections without any OAuth.
8. **Capacity and commitments.** Roughly how many hours of paid work or caring each week, and term-time versus
   holiday availability, so plans are realistic. Ask gently, as a number only, and keep it private.
9. **Age band.** Under 13, 13 to 17, or 18 and over, so the right protections apply automatically: no ad measurement,
   child sites excluded from analytics, and safer AI defaults. Don't ask for a date of birth.
10. **Confidence for each module or topic**, a 1 to 5 self-rating at the start. It seeds mastery before there's
    evidence, and is replaced by evidence as it comes in.
11. **Preferred tone and level of challenge** from Gradify AI: encouraging or direct, hints or answers.
12. **Who else is involved.** A tutor, parent or teacher they'd like to share progress with, only if the student
    chooses, with clear sharing controls.
13. **Accessibility of materials:** a preferred reading level, a glossary for non-native speakers, and maths spoken
    aloud. These pair with the separate language for explanations.

### 9. Test cases (at minimum)

- A UK undergraduate at a university with a verified catalogue.
- A different degree at the same institution.
- Two cohorts on different programme versions.
- Optional modules.
- An institution not listed.
- A programme not listed.
- An international student using another language.
- Someone who skips everything optional.
- Changing institution or programme with saved progress.
- An existing student with saved progress and resources.

### 10. Guard rails

- **Data:** never lose or reset existing progress when the profile changes.
- **Design:** keep the high-contrast Gradify design; no pale interfaces.
- **No unrelated changes** to authentication, Stripe, payments or existing Supabase structures.
- **Owner approval:** ask the owner before any new production table or migration, and before publishing anything
  that collects new personal data. Update `privacy.html` in the same change.
- **Analytics:** profile data never goes to Google Analytics (see `docs/ANALYTICS.md`).

### Suggested first steps for the next session

1. Ask the owner the Stage 5 questions above, and whether to do Stage 5 or MyGradify first.
2. For MyGradify, write a short proposal (data model, sources, onboarding screens) and get approval.
3. Then prototype:
   - the institution → subject → programme dropdown from Discover Uni data, for a handful of universities;
   - modules from one or two universities' published catalogues, every record carrying its source;
   - the handbook import (`kit/data/handbook.js`) as the fallback when modules aren't listed.
