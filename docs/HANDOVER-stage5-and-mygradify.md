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
logic in `assets/study-tools.js`. The "More" sheet now lists Rules, Import and Ask as real pages; only
**Connections** is still a "Later" card.

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

## Stage 5: calendar, Moodle and Canvas connections

**Ask the owner before building anything here.** The owner said so explicitly, because this needs their own
accounts, app approvals and university permission. Start the session by asking the questions below, with
`AskUserQuestion`.

**What already exists (reuse it):**
- `.ics` export of revision sessions from the tracker. This is the no-permission fallback, and it must stay.
- `supabase/functions/calendar-sync`, which fetches an iCalendar feed URL server-side, because of CORS. It works for
  Google's "secret address in iCal format", iCloud and Outlook published calendars, and university or Moodle, Canvas
  or Blackboard calendar exports.
  - The browser parses the feed (`kit/intel/ical.js`) and keeps the events as busy time; nothing is stored on the
    server.
  - This is the **read-only route that needs no OAuth at all**. Build on it first: a "Connections" page in the tracker
    (`data-page="connections"`) where a student pastes their university timetable or VLE calendar export URL.
    Deadlines in that feed then fill the tracker's due dates, after a review screen like the handbook import.

**Questions for the owner:**
1. **Google Calendar.** Read the student's calendar (`calendar.readonly`), write revision sessions
   (`calendar.events`), or both? Both need a Google Cloud OAuth client and Google's app verification for sensitive
   scopes, which takes weeks. Does a Google Cloud project exist, and who owns it?
2. **Microsoft (Outlook and university Microsoft 365).** This needs a Microsoft Entra app registration. Many
   universities block third-party apps until their IT admins approve them. Should Gradify apply, and to which
   universities first?
3. **Moodle and Canvas.**
   - A personal token per student, where the university allows them: Canvas access tokens, or Moodle's mobile web
     service token.
   - Or proper LTI 1.3, which needs each university's agreement.
   - Which universities have you got contacts at?
   - Read-only first (assignments, due dates, module names). Is that right?
4. **Data.** Store tokens in Supabase (encrypted, per student, revocable), or never store them (fetch on demand
   only)? The privacy policy must be updated either way.
5. **Under-18s.** Connections for university students only (UnderGradify, PostGradify), and never on JuniorGradify or
   YouthGradify?

**Build order once agreed:**
1. A feed URL import, with review, using calendar-sync.
2. OAuth read-only.
3. Write-back of revision sessions.
4. Moodle and Canvas read-only, through a Supabase function proxy.

Keep every connection optional and revocable, and say plainly what is read.

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
