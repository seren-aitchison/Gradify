# Proposal: MyGradify academic profile and course catalogue (for the owner's approval)

Written 24 November 2026. Nothing here is built yet. It follows the brief in `docs/HANDOVER-stage5-and-mygradify.md`
(sections 1–10) and asks for decisions before any code, table or new personal data.

## The owner's decisions (24 November 2026), which supersede the recommendations below where they differ

1. **Catalogue: static JSON in `data/catalogue/`**, version-controlled, offline, no sign-in. Every record carries
   stable IDs, `source_url`, `source_type`, `academic_year` / `effective_from` / `effective_to`, `supersedes`,
   `last_checked`, `next_review` and `verification_status` (`verified`, `partially_verified`, `unverified`, `outdated`).
   Being in the catalogue never means "confirmed". The schema must move into Supabase later without the front end
   changing.
2. **Student choices: `profiles.learner.academic`.** It must never overwrite other learner keys; the whole selection
   is `not_independently_verified`; store catalogue IDs alongside display names; allow uncatalogued programmes and
   modules; validate and sanitise **server-side**; changing course never deletes progress, attempts or mastery (detach
   or archive old module links); old profiles without `academic` keep working; separate from the catalogue.
3. **Scope: UK and US together, every stage**, primary to doctoral, plus FE, vocational and adult learning. An
   international model: country → education system → institution → qualification/programme → year/stage/level →
   subjects/modules/courses → curriculum/outcomes/assessment. It must not assume modules, UK academic years or
   universities. Then Canada, Australia and New Zealand; then Europe; then the rest of the world. The five
   universities stay as the first test of *verified rules*, not the limit of the catalogue. Sources to assess: Discover
   Uni/HESA, Get Information About Schools (GIAS), NCES Common Core of Data, IPEDS, College Scorecard. **Propose the
   UK + US acquisition architecture (coverage gaps, licences and reuse conditions, update processes, what can be
   verified automatically) before implementing.**
4. **Personal data, first release: the eight essential fields only** (country, institution, subject,
   programme/qualification, start year, current year/stage, study mode, current modules). Before launch, assess how
   under-13s and under-18s are identified and protected; leaving out an age band doesn't remove those duties.
5. **Release gate:** the owner's mandatory checklist (data collection, privacy and legal, security and permissions,
   product and usability, testing and release) must be complete, any legal review done, and the owner must approve
   explicitly **before merging or deploying**. Report blockers; never skip an item silently.
6. **Calendars:** the full roadmap stays (Google, Microsoft 365, Apple where feasible, `.ics`, sync, reminders,
   changed/deleted/recurring events), with the "busy, not what" principle. Personal calendar data and connection
   state go in protected per-user storage, never in the catalogue. A **legal acceptance system** is wanted: separate
   agreements (Terms, Privacy, per-integration permissions), with the accepted document version, timestamp and
   permission state recorded; no blanket consent; no "waive all rights" wording; solicitor review before significant
   paid growth.

## Open questions and blockers (as of 24 November 2026)

- **Source licences not yet read.** This session couldn't reach the data providers: the proxy returned 403 for
  www.hesa.ac.uk even after the owner's environment allowed it (the change hadn't reached the session), and the
  page-reading tool couldn't resolve the hosts. A new session should allow and read: www.hesa.ac.uk,
  discoveruni.gov.uk, www.officeforstudents.org.uk, get-information-schools.service.gov.uk, nces.ed.gov,
  collegescorecard.ed.gov and catalog.data.gov. Nothing about licences is assumed until read.
- **Server-side validation of `academic`** needs a database check (a constraint or trigger on `profiles.learner`, or
  a validating function), which is a production migration. Approval needed before it's written.
- **Recording legal acceptances** (document version, timestamp, permission state) needs per-user storage: possibly
  `profiles.learner`, possibly a new table. Approval needed.
- **RLS:** the migrations enable RLS on `profiles` with `own profile` (`id = auth.uid()`, for read and write) and
  revoke writes from `anon`. The live database still needs checking against this.
- **Size:** a national catalogue (all UK and US schools and providers: tens of thousands of institutions) needs
  sharding by country and region, and a search index, rather than one `index.json`. The architecture proposal will
  size it.

The rest of this document is the first draft (five universities, UK only), kept for reference.

## What exists today (inspected)

- **`public.profiles`** (`supabase/migrations/20261028120000_gradify_core.sql`): `display_name`, `goal`, `site`,
  `level`, `exam_date`, `daily_minutes`, `xp`. Row-level security: own row only.
- **`profiles.learner`** (jsonb, under 20 KB, `20261106120000_learner_profile.sql`): subjects, prior knowledge,
  display preferences, set-up flags, Smart Plan settings (`intel`). Mirrored in the browser (`gradify.learner`), so it
  works signed out too. `kit/data/profile.js` merges and saves it.
- **Set-up** (`#/start`, `kit/app/main.js` `renderStart`): three steps: goal → Gradify site → details.
- **University rules** (`kit/data/uni-rules.js`): five universities, ids like `"leeds"`, no UKPRN yet.
- **Handbook import** (`kit/data/handbook.js`) with a review screen: the fallback for modules.
- Auth, Stripe and payments: not touched by anything below.

## Recommendation in one paragraph

Ship the catalogue as **static, versioned JSON files in the repo** (public reference data, no database tables, no
migration), and keep each student's choices **inside the existing `profiles.learner` object** (no new per-student
table). That gives the institution → subject → real-programme dropdown with no production database change at all, works
offline and signed out, and leaves Supabase tables for later, if staff need to edit catalogue data in a back office.
Start with the five universities that already have verified rules.

## 1. Data model

### Reference data (public): `data/catalogue/`, one file per institution

```
data/catalogue/index.json              every institution: { id, ukprn, name, country, type, file, programmes: n, modules: n }
data/catalogue/10007786.json           one institution (named by UKPRN)
```

Each record carries **source, identifier, academic year, verification status, date checked and completeness**:

```js
{
  institution: { id: "ukprn:10007786", ukprn: 10007786, name: "University of Bristol", country: "GB", type: "university",
                 campuses: [], rules: "bristol",                                   // link to kit/data/uni-rules.js
                 source: { name: "Discover Uni", url: "…", licence: "…", year: "2025-26" }, checked: "2026-11-24",
                 status: "official" },
  programmes: [{
    id: "kis:…", title: "Medicinal Chemistry", qualification: "MChem", aim: "…", subjects: ["CAH07-02-01"],
    mode: "full-time", years: 4, sandwich: false, abroad: false, foundation: false, url: "…",
    academic_year: "2025-26", source: { … }, checked: "2026-11-24", status: "official",
    structure: null,                                          // year-by-year modules, only where a catalogue was read
    completeness: { modules: "none" | "partial" | "full" }
  }],
  modules: [{ code: "CHEM20011", title: "…", credits: 20, level: 5, semester: "1", assessment: [{ kind: "exam", weight: 70 }],
              academic_year: "2026-27", source: { name: "…module catalogue", url: "…" }, checked: "…", status: "official" }],
  structures: [{ programme: "kis:…", start_year: "2026-27", year: 2, credits: 120,
                 modules: [{ code: "…", compulsory: true }, { group: "Choose 40 credits", options: ["…"] }] }]
}
```

- **Status values:** `official` (read from the institution's or regulator's published data), `checked` (a person
  compared it with the source), `student` (entered or imported by a student: "not independently verified").
  Nothing generated by AI is ever stored as a programme or module.
- **Versioned by academic year:** a programme's structure is keyed by **start year**, so a 2024 starter and a 2026
  starter can follow different structures.
- **International-ready:** `country` + an `id` scheme per country (`ukprn:` for the UK, other registries later);
  qualifications are free text plus a code, not a UK enum.
- **Scale:** one file per institution keeps each download small (a large UK university is a few hundred programmes),
  so this scales to every UK provider. If it outgrows files, the same shape moves into Supabase tables (the brief's
  `institutions`, `programmes`, `programme_years`, `modules`, `programme_modules`) with public read-only RLS.

### The student's choices: `profiles.learner.academic` (no new table)

```js
academic: {
  country: "GB",
  institution: { id: "ukprn:10007786" } | { manual: "Name typed by the student" },
  subject: "Chemistry",                       // Gradify subject site
  programme: { id: "kis:…", academic_year: "2025-26" } | { manual: "MChem Medicinal Chemistry" },
  start_year: 2025, current_year: 2, final_year_start: null,
  mode: "full-time",
  modules: [{ code, title, credits, year, compulsory, from: "catalogue" | "handbook" | "manual" }],
  verified: false,                            // always: the student's own selections
  updated_at: "…"
}
```

- Changing institution or programme **only replaces `academic`**. Tracker rows, progress, notes and plans are never
  touched (tested: brief section 9, "changing institution with saved progress").
- Personalisation can be switched off (`academic.off = true`) without deleting anything.
- Never sent to Google Analytics (`docs/ANALYTICS.md`).

## 2. Data sources

| Source | Gives | Status |
|---|---|---|
| **Discover Uni open data** (Office for Students) | Every UK HE course: provider UKPRN, title, qualification aim, mode, length, sandwich/abroad flags, course URL, subject codes | **Licence and file spec not yet verified.** This session couldn't reach officeforstudents.org.uk or hesa.ac.uk (the hosts are now allowed in the environment, but the page-reading tool still couldn't resolve them). I won't build on it until I've read the licence and spec from the source. |
| **UKRLP** | Provider identifiers (UKPRN), legal names | Discover Uni already carries UKPRN and names, so UKRLP is only needed to check them. |
| **Universities' module catalogues and programme specifications** | Year structures and modules | One university at a time. Each host must be allowed in the environment first. Start with Birmingham, Bristol, King's, Leeds and Nottingham (rules already verified). |
| **Handbook import** (`kit/data/handbook.js`) | Modules from the student's own document | Fallback whenever the catalogue has no modules: records saved as `student`. |
| UCAS | — | No open API; not used. |

A build script (`scripts/catalogue/build.mjs`) would turn the downloaded dataset into the per-institution files,
keeping source, licence, academic year and the date checked on every record, with tests that refuse any record
missing them.

## 3. Onboarding screens (progressive; everything after step 3 is skippable)

Added to `#/start` only when the student picks UnderGradify or PostGradify (or a university subject site). Each is one
card, high-contrast, with the Gradify gradient squircle and an action card for the next step.

1. **Where do you study?** Country (default from time zone, never forced).
2. **Your university.** Search the catalogue's institutions. "Not listed" → type its name (kept as `manual`).
3. **Your subject.** The Gradify subject sites, filtered to what the institution offers.
4. **Your course.** A dropdown of the programmes **that institution runs in that subject**, labelled with
   qualification, mode and length (e.g. "MChem Medicinal Chemistry · 4 years · full-time"), plus "Other / not
   listed". A line underneath gives the source and year: "From Discover Uni, 2025–26 data."
5. **When did you start, and which year are you in?** Start year, current year (and the year the final year started,
   when the university's rules switch on it, e.g. Leeds).
6. **This year's modules.** If the catalogue has the structure for that start year: compulsory modules ticked,
   optional ones to tick. If not: "Gradify doesn't have this course's modules yet." with three actions: **Import your
   handbook**, **Add modules yourself**, **Skip for now**.
7. Done → an action card into MyGradify.

**Later, in MyGradify (optional, asked in context):** languages (interface, explanations, notes, spelling, time zone),
learning and accessibility adjustments, goals, study habits, and the section 8 extras (regulations year, joint
honours, entry route, resits and extensions, exam arrangements, assessment styles, VLE, capacity, age band,
confidence per module, AI tone, sharing). A completeness indicator counts what's filled, never penalises skips.

## 4. Release plan (each step live before the next)

1. Catalogue build script + files for the five universities' **programmes** (Discover Uni), with tests. No UI yet.
2. Set-up steps 1–5 and the MyGradify "Your course" card; privacy policy updated in the same change.
3. Modules for one or two of those universities from their published catalogues; step 6, with the handbook fallback.
4. The tracker reads `academic` (programme length, start year → rules, modules → rows, with review).
5. Optional preference cards, one group at a time.

## Decisions needed

See the questions asked in the session (catalogue storage, where the student's choices live, which universities,
which personal data in the first release), and the Discover Uni licence check.
