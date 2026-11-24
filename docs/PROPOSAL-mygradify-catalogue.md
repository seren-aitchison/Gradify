# Proposal: MyGradify academic intelligence layer and education catalogue

**Status: proposal and research only. Not approved for implementation.** Revision 2, 24 November 2026.
No code, production migration, merge of feature work or deployment follows from this document until the owner approves
the relevant stage explicitly. Authentication, Stripe, payments, existing progress data and unrelated production
systems are out of scope.

**What it's for.** MyGradify is an international academic intelligence layer, not a university profile form. It should
know what a student is studying, which curriculum or programme applies, what they need to learn and how they're
assessed, so the catalogue, degree tracker, Smart Plan, lessons, diagrams and past papers work as one product.

---

## 1. The owner's decisions (authoritative)

These override anything else in this document.

1. **Catalogue: static, version-controlled JSON** (`data/catalogue/`), available offline and without signing in, with
   full provenance on every record (section 4). It must be able to move into Supabase later without the front end
   changing.
2. **Student choices: `profiles.learner.academic`**, with these safeguards:
   - Never overwrite other learner keys.
   - The whole selection is `not_independently_verified`.
   - Stable catalogue IDs are stored alongside display names.
   - Uncatalogued entries are allowed.
   - Updates are validated and sanitised server-side.
   - Changing course never deletes progress, attempts or mastery.
   - Profiles without `academic` keep working.
   - Kept separate from the catalogue.
3. **Scope: the UK and US together, at every education stage.**
   - Stages: primary/elementary, secondary/middle/high school, sixth form and college, further education, vocational and
     technical, adult and continuing, undergraduate, postgraduate and doctoral.
   - Expansion order: Canada, Australia and New Zealand; then Europe; then the rest of the world.
   - The five universities with verified rules (Birmingham, Bristol, King's, Leeds, Nottingham) are the first cohort
     for detailed verified academic rules. They don't limit the catalogue.
4. **Personal data in the first release: eight fields only.**
   - The fields: country, institution, subject, programme/qualification, start year, current year/stage, study mode and
     current modules (or equivalent courses or classes).
   - Nothing else: no age band, languages, adjustments, goals or capacity.
   - The duties to under-13s and under-18s are assessed separately (section 8).
5. **Release gate.** The owner's mandatory checklist (section 10) applies in full. Blockers are reported, never
   skipped.
6. **Calendars: the full roadmap stays.**
   - Google, Microsoft 365, Apple where feasible, `.ics`, sync, reminders, and changed, deleted and recurring events.
   - The principle stays: Gradify knows when a student is busy, not what their appointments are.
   - Personal calendar data and connection state go in protected per-user storage, never in the catalogue.
   - A legal acceptance system is required (section 9).

---

## 2. What exists today (inspected in the repository)

- **`public.profiles`** (`supabase/migrations/20261028120000_gradify_core.sql`):
  - Columns: `display_name`, `goal`, `site`, `level`, `exam_date`, `daily_minutes`, `xp`.
  - RLS is enabled, with the `own profile` policy for all operations: `using (id = auth.uid()) with check
    (id = auth.uid())`.
  - `anon` has insert, update and delete revoked (`20261113120000_client_privileges.sql`).
  - **The live database hasn't been checked against these files** (no Supabase access in this session).
- **`profiles.learner`** (jsonb, constraint `pg_column_size(learner) < 20000`):
  - Holds subjects, prior knowledge, display preferences, set-up flags and Smart Plan settings (`intel`).
  - Mirrored in the browser as `gradify.learner`.
  - `kit/data/profile.js` merges at the top level, so writing one key keeps the others.
  - A server-side merge or validation would need a database function (see D4 in section 11).
- **Set-up:** `#/start` in `kit/app/main.js` has three steps: goal, Gradify site, details.
- **Reusable pieces:**
  - `kit/data/uni-rules.js`: five universities, verified rules with sources.
  - `kit/data/handbook.js`: a module handbook import with a review screen.
  - `kit/data/connections.js`: calendar-file due dates.
  - `kit/core/sites.js`: the Gradify sites, including JuniorGradify and YouthGradify.

---

## 3. Data model: an international education hierarchy

No level is mandatory. A US high-school student, a UK Year 9 pupil, an apprentice and a PhD candidate each use only
the levels that exist for them.

```
country
 └─ education system            e.g. GB-ENG, GB-SCT, GB-WLS, GB-NIR, US, US-CA (state where it matters)
     └─ provider / institution  school, college, FE provider, university, training provider, district (US)
         ├─ campus / site       optional
         └─ offering            a programme, qualification, course of study, grade/year group, apprenticeship standard
             └─ stage           year, grade, level, part, semester (whatever the system uses; optional)
                 └─ unit        module, course, class, subject, component (optional)
                     └─ curriculum element   learning outcome, specification point, assessment (optional)
```

### Record types

Each type is its own file family. IDs are stable and namespaced.

| Type | ID scheme (examples) | Key fields | Notes |
|---|---|---|---|
| `system` | `sys:GB-ENG`, `sys:US` | country, name, stages[] (ordered, with typical ages as *ranges*, not rules), academic-year pattern (start month, terms/semesters/quarters) | Describes the shape, so the UI asks "grade" in the US and "year" in England |
| `provider` | `gb-urn:100000` (school URN), `gb-ukprn:10007786`, `us-nces:060000000000` (school), `us-ipeds:110635` | name, type (`school`, `college`, `fe`, `university`, `training`, `district`…), phase/stages offered, country, region, open/closed status, campuses | One provider can have several identifiers; `ids: { ukprn, urn, ipeds, opeid, nces }` |
| `offering` | `off:<provider>:<source id>:<effective period>` | title, kind (`programme`, `qualification`, `grade`, `course-of-study`, `apprenticeship`), qualification (free text + code, e.g. `{ label: "MChem", code: "…" }`), subject codes (scheme-tagged: `cah:`, `hecos:`, `cip:`), mode, length (value + unit), flags (sandwich, abroad, foundation) | Never a UK-only enum. `cip:` covers US fields of study |
| `structure` | `str:<offering>:<cohort start>` | stages[] → units[] with `compulsory` / option groups (`choose 40 credits from…`, `choose 2 of…`) | Keyed by **cohort start**, so 2024 and 2026 starters can differ |
| `unit` | `unit:<provider>:<code>:<period>` | code, title, size (value + unit: credits, ECTS, Carnegie units, hours), level, teaching period, prerequisites, assessment[] (kind, weight) | Optional everywhere |
| `curriculum` | `cur:<awarding body>:<spec>:<version>` | specification points, outcomes | For exam-board and national curricula (later) |

### Provenance (on every record)

```js
provenance: {
  source_type: "government_register" | "regulator_dataset" | "institution_publication" | "awarding_body" | "student_upload" | "manual_entry",
  source_name: "Get Information About Schools",
  source_url: "https://…",                 // the exact page, file or API endpoint read
  source_licence: { name: "…", url: "…", attribution: "…" } | null,   // null = not yet established: blocks publishing (section 5)
  retrieved_at: "2026-11-24",
  academic_year: "2027-28" | null, effective_from: "2027-09-01" | null, effective_to: null,
  supersedes: "off:…:2026-27" | null,
  last_checked: "2026-11-24", next_review: "2027-02-24",
  verification_status: "verified" | "partially_verified" | "unverified" | "outdated",
  verified_by: null | "person or process", verification_note: "…"
}
```

**Source authenticity and verification are kept apart.**

- `source_type` says **where** a record came from. Coming from an official register or a university's own page is not
  verification.
- `verification_status` says what was **independently checked**:
  - `verified`: every field was compared with the source by a named process or person on `last_checked`.
  - `partially_verified`: some fields were checked (the note lists which).
  - `unverified`: imported but not checked (the default for anything ingested automatically).
  - `outdated`: past `next_review` or `effective_to`, or the source has changed since.
- The UI shows the status and the source on every catalogue answer. Being listed in the catalogue never reads as
  "confirmed".
- AI never creates catalogue records.

### Student choices: `profiles.learner.academic`

These are the eight fields, nothing else:

```js
academic: {
  country: "GB",
  institution: { id: "gb-ukprn:10007786", name: "University of Bristol" } | { id: null, name: "typed by the student" },
  subject: { id: "cah:07-02", name: "Chemistry" } | { id: null, name: "…" },
  offering: { id: "off:…", name: "MChem Medicinal Chemistry", academic_year: "2027-28" } | { id: null, name: "…" },
  start_year: 2025,
  current_stage: { value: 2, label: "Year 2" },          // "Grade 10", "Year 12", "Level 3"…
  mode: "full-time" | "part-time" | "distance" | "apprenticeship" | null,
  units: [{ id: "unit:…" | null, name: "…", status: "selected" }],
  verification_status: "not_independently_verified",
  last_updated: "ISO-8601",
  history: [{ offering_id, name, until }]                // a changed course is archived here, not deleted
}
```

- Progress, attempts and mastery stay keyed to lessons and topics, not to `academic`. A change of course detaches
  links and never deletes anything.
- Tests would cover every case in brief section 9.
- Size: the eight fields fit well within the existing 20 KB limit. History is capped (for example, the last five
  changes).

---

## 4. Static catalogue layout (sized for national coverage)

```
data/catalogue/
  manifest.json                         schema version, build date, sources and their licences, counts, coverage report link
  systems/GB-ENG.json …                 one file per education system
  providers/GB/index-<region>.json      compact search rows: id, name, type, town, stages (for the institution search)
  providers/US/index-<state>.json
  providers/GB/<id>.json                full provider record + its offerings (loaded on selection)
  structures/<offering id>.json         only where a structure was read
  coverage/GB.json, coverage/US.json    what's covered, by stage and region, and what's missing
```

- **Scale.** All UK and US schools, colleges and HE providers is likely to be over 150,000 rows. The exact counts are
  set from the datasets in research (R7).
- **Search.** Region and state shards keep each search download small. A prefix index per shard is built at build time.
- **Changes over time.** Each build is a git commit, so `git log` is the version history. Records never vanish
  silently: a closed school becomes `status: closed`, and a withdrawn course gets `effective_to`.
- **Moving to Supabase later.** The same record shapes become tables (`systems`, `providers`, `provider_ids`,
  `offerings`, `structures`, `units`, `curricula`), plus `provenance` columns and public read-only RLS. The front end
  reads through one module (`kit/data/catalogue.js`), so only that module changes.
- **Validation.** Build-time tests refuse any record without provenance, or with an unknown status, a duplicate ID or
  an unpublished licence.

---

## 5. UK + US sources: what's established and what isn't

**Rule:** a source is ingested only after its licence or terms have been **read** and permit Gradify's use (a
commercial product with paid plans), including modification and redistribution of derived data. An allowed network
host is not permission.

| # | Source | Would give | Read so far (with links) | Licence status | Gaps known so far |
|---|---|---|---|---|---|
| S1 | **Discover Uni dataset** (OfS and the UK funding bodies, collected by HESA/Jisc) | UK HE undergraduate courses: provider (UKPRN), title, qualification, mode, length, course URL, subjects | Read on [discoveruni.gov.uk/information-providers](https://discoveruni.gov.uk/information-providers/): the site shows the **2026 dataset**, "information relevant to courses that will run in the 2027-28 academic year"; providers submit their "eligible undergraduate courses"; the dataset "is updated weekly"; provider names come from UKRLP. Download and coverage statement are on hesa.ac.uk | **Not established, and a real concern.** The [Discover Uni terms of use](https://discoveruni.gov.uk/terms-and-conditions-use/) say materials and data may be reproduced "provided that the source is acknowledged, the text is not altered and it is not used, wholly or in part, for commercial gain. Use for commercial gain requires the prior written permission of the copyright holders", with re-use requests under the Re-use of Public Sector Information Regulations 2015. The downloadable dataset may carry its own licence on hesa.ac.uk, which this session couldn't read (403) | Undergraduate only, and only "eligible" courses: no postgraduate, no full module data. Coverage statement unread |
| S2 | **UKRLP** (UK Register of Learning Providers) | UKPRNs, legal and trading names for UK learning providers (HE, FE, training) | Not read | Unknown | — |
| S3 | **Get Information About Schools (GIAS)**, DfE | Every school and college in England: URN, UKPRN, phase, type, status, address | Read on 24 Nov 2026. [Acceptable use policy](https://get-information-schools.service.gov.uk/AcceptableUsePolicy): you may "download bulk data via the public downloads page for offline analysis or system ingestion, observing the Open Government Licence (OGL) where stated on the site"; you must not "scrape or harvest the GIAS website user interface … for bulk or systematic extraction". [Downloads](https://get-information-schools.service.gov.uk/Downloads) footer: "All content is available under the Open Government Licence v3.0, except where otherwise stated" | **OGL v3.0 stated (subject to each download's own notice).** The [OGL v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/) permits you to "copy, publish, distribute and transmit", "adapt" and "exploit the Information commercially and non-commercially … including it in your own product or application". You must acknowledge the source, using the provider's attribution statement or else "Contains public sector information licensed under the Open Government Licence v3.0." Still to check: each chosen download's own notice | England only. Scotland, Wales and Northern Ireland have their own registers (to identify). Downloads only, never scraping |
| S4 | Scottish, Welsh and NI school registers | Schools outside England | Not identified | Unknown | — |
| S5 | **NCES Common Core of Data (CCD)** | US public elementary and secondary schools and districts | Read [About CCD](https://nces.ed.gov/ccd/aboutccd.asp): "a comprehensive, annual, national database of all public elementary and secondary schools and school districts" | **Not stated on the pages read.** US federal government works are generally public domain under US law, but no source statement was read, so this isn't assumed. The ED notices page (www.ed.gov) isn't reachable from this session | Public schools only. Private schools are in NCES PSS (S6). Annual |
| S6 | **NCES Private School Universe Survey (PSS)** | US private schools | Not read | Unknown | Biennial |
| S7 | **IPEDS** | US post-secondary institutions taking part in federal aid programmes; programmes by CIP code and award level | Not read | Unknown | Programme *titles* are by CIP field, not each institution's own course names |
| S8 | **College Scorecard** | US institutions and fields of study (CIP × credential level), with an API | Read the [data page](https://collegescorecard.ed.gov/data/): bulk downloads dated 2 November 2026 (institution and raw data) and 15 October 2026 (field of study), an API, a data dictionary, and institution and field-of-study documentation PDFs | **Not stated on the pages read.** No licence wording on the data or documentation pages; the API has its own documentation (unread). Same position as S5 | Fields of study are CIP codes × credential level, not each college's own course titles |
| S9 | Universities' own programme specifications and module catalogues | Structures and units | Five universities' regulation pages read for Stage 2 rules | Per university: each site's terms must be read | One at a time. Many are copyright with no reuse grant; may need permission or be linked, not copied |
| S10 | Awarding bodies (AQA, OCR, Pearson, WJEC, SQA, IB, College Board…) | Specifications and curriculum elements | Not read | Usually restrictive: likely link-only | Later stage |
| — | UCAS | — | — | No open API; not used | — |

**What can be checked automatically:**
- That a record matches its source at `retrieved_at` (hash, diff).
- That an identifier exists in its register.
- That a provider is open or closed.
- That a course is still in the latest dataset release.
- Date-driven `outdated` flags.

**What needs a person:**
- Year structures and module lists from university pages.
- Option rules.
- Joint-honours splits.
- Any source without machine-readable data.
- Anything marked `verified` or `partially_verified`.

**When a source disappears or changes format:**
- The build fails loudly; it never quietly empties a shard.
- The last good data is kept and marked `outdated` after `next_review`.
- A coverage report records the gap.

---

## 6. Onboarding (first release: the eight fields only)

- The screens are adaptive: the education system decides which steps appear and what they're called.
- Each screen says why the answer is needed.
- Every step except country is skippable.
- Missing catalogue entries never block anyone.

1. **Where do you study?** Country, then the education system where it matters (England, Scotland, Wales or NI; US
   state).
2. **Your school, college or university.** Search the provider index. "Not listed" → type it (`id: null`).
3. **Your subject** (for higher and further education; school pupils skip to stage).
4. **Your course or qualification.**
   - A dropdown of the offerings that provider has in that subject, showing source and status ("From Discover Uni,
     2027-28 data · Unverified").
   - Plus "Other / not listed".
5. **When did you start, and where are you now?** Start year and current year, grade or stage, in the system's own
   words.
6. **Study mode.**
7. **This year's modules, courses or classes.**
   - If a structure exists: tick them.
   - If not: "Gradify doesn't have this course's modules yet", with **Import your handbook**, **Add them yourself** and
     **Skip**.
8. **A privacy explanation before any of this is saved**, and the relevant acknowledgement (section 9).

---

## 7. What the first release does not do

- No age band, languages, adjustments, goals, capacity, joint honours, entry route or other optional fields.
- No AI-generated catalogue entries.
- No scraping of UCAS or of sites whose terms don't allow it.

---

## 8. Children and under-18s (to assess before release)

- Gradify already treats JuniorGradify and YouthGradify as child sites: no analytics or advertising measurement.
- Collecting a school and year group from a pupil is personal data about a child. Before release, assess:
  - The ICO Children's Code (Age Appropriate Design Code) and its standards (high-privacy defaults, data minimisation,
    no nudging).
  - Lawful basis for under-13s: UK GDPR Article 8 and the UK digital age of consent of 13, where consent is relied on.
  - US COPPA, for under-13s in the US.
  - How age is assured without collecting a date of birth.
  - Whether the school-stage steps are offered on the child sites at all in the first release.
- This needs legal review. It isn't settled by leaving out an age field.

---

## 9. Legal acceptance architecture (to approve)

- **Separate documents, separately recorded:**
  - Terms of Service (*acceptance*: a contract).
  - Privacy Policy (*acknowledgement*: informing the student, not consent).
  - Per-feature notices (academic profile, each calendar integration).
  - *Consent* only where consent is the lawful basis, given as a separate, affirmative choice that can be withdrawn.
- **What's recorded for each one:** document id, version, content hash, timestamp, action (`accepted`, `acknowledged`,
  `consented`, `withdrawn`), surface, and the permission state.
- **Where it's recorded:** this needs per-user storage. It could be a new `agreements` table (append-only, own-row
  read, insert through a function) or a key in `profiles.learner`. An append-only table is the better record. **This is
  a migration and needs approval.**
- **Wording rules:** no blanket acceptance, and no "you waive all rights" or "no liability whatsoever" wording.
- **Review:** a UK solicitor reviews the Terms, Privacy Policy and data-processing arrangements before significant
  paid growth.

---

## 10. Release plan (each stage approved separately)

| Stage | Deliverables | Depends on | Acceptance criteria | Known blockers |
|---|---|---|---|---|
| **1. Research and acquisition architecture** | A source-by-source report for S1–S10 and others found: exact dataset/API/download, coverage by stage and nation or state, gaps, licence and terms with quotes and links, commercial use, modification, redistribution and derived-data rights, attribution text, update frequency, identifiers and de-duplication, sizes. A revised version of this proposal | Network access to the sources | Every licence quoted from the source. No ingestion plan for a source whose terms don't allow it | **Started 24 Nov 2026** (S1, S3, S5 and S8 partly read; see section 5). hesa.ac.uk returns 403 from this environment's proxy. www.ed.gov isn't allowed. Discover Uni's terms bar commercial use without permission (**D1**) |
| **2. Catalogue schema and validation** | JSON Schemas for each record type and provenance; `kit/data/catalogue.js` reader; build-time validators; fixtures for the UK and US systems | Stage 1 approved | Validators reject missing provenance, unknown statuses, duplicate IDs and unlicensed sources. Test fixtures cover a UK university, a UK school, a US high school and a US community college | — |
| **3. UK + US ingestion and coverage reporting** | Build scripts per source, sharded files, coverage reports | Stages 1–2. Licences confirmed. Permissions obtained where needed | Every record has provenance. Coverage reports show what's missing. Nothing is shown as verified unless checked | Permission for S1 (D1) |
| **4. Eight-field academic profile, privacy and legal** | `academic` in `profiles.learner`; server-side validation; agreements storage; privacy policy and in-product notices | Stages 1–3. D2–D5 approved. Legal review | The full checklist (section 11) | Migrations need approval (D4, D5). Legal review |
| **5. MyGradify onboarding and profile management** | Adaptive onboarding, profile editing, unit selection, handbook import fallback, catalogue search | Stage 4 | Brief section 9 test cases pass, plus the release checklist. Light and dark, desktop and phone | — |
| **6. Tracker and Smart Plan integration** | Offering length and start year feed the tracker's rules; units become tracker rows after review; deadlines connect | Stage 5 | Progress never lost. Rules only from verified records | — |
| **7. International expansion** | Canada, Australia and New Zealand; then Europe; then the rest of the world; deeper unit coverage | Stage 6 | Per-country research as in stage 1 | — |

### Mandatory release checklist (from the owner; applies to stages 4–6)

1. **Data collection:**
   - Only the eight fields are collected.
   - No sensitive data.
   - Existing profiles stay compatible and aren't overwritten.
   - Students can correct their entries.
   - Custom entries are supported.
   - Student entries are labelled not independently verified.
2. **Privacy and legal:**
   - The policy matches the implementation.
   - Purpose and lawful basis are documented for each field.
   - Retention, deletion and account closure are documented and implemented.
   - Processors are disclosed.
   - The in-product explanation is shown before collection.
   - Any consent is specific and recorded.
   - Policy version and timestamp are recorded.
   - UK GDPR, the DPA 2018 and children's requirements are reviewed.
   - The age-assurance approach is assessed.
   - No wording waives statutory rights.
3. **Security and permissions:**
   - Owner-only access is verified on the live database.
   - Server-side validation is in place.
   - No academic data appears in catalogue files, logs, analytics or error reports.
   - No unnecessary third-party transmission.
   - Deletion is tested.
4. **Product and usability:**
   - Each field's purpose is explained.
   - Students can save and come back.
   - Missing entries never block a student.
   - Country-specific structures are supported.
   - No unsupported "verified" claims.
   - Keyboard, mobile and error handling are checked.
5. **Testing and release:**
   - All existing tests pass, plus new onboarding, validation, permission and regression tests (progress, lessons,
     attempts, mastery).
   - Privacy and deletion flows are tested end to end.
   - CI is green on the exact release commit.
   - No unrelated changes (auth, billing, database permissions).
   - Release notes and the privacy policy version are recorded.
   - The live deploy is verified.

**Rule:** nothing merges or deploys until every item is checked, any required legal review is done, and the owner has
explicitly approved the release.

---

## 11. Unresolved decisions (for the owner)

| # | Decision | Why it's needed |
|---|---|---|
| D1 | **Discover Uni:** request written permission or a re-use licence from the UK funding bodies (as their terms set out), or find the dataset's own licence on HESA's site first | Its terms bar commercial use without permission, and Gradify has paid plans |
| D2 | Whether the first release includes **school pupils** (UK schools, US K-12) or starts with post-16 and HE, given section 8 | Children's privacy duties are heavier |
| D3 | Whether to show **unverified** catalogue entries in the first release (labelled), or only `partially_verified` and above | The trade-off between coverage and confidence |
| D4 | **Server-side validation** of `profiles.learner.academic`: a check constraint, trigger or validating RPC, which is a migration | The owner requires server-side validation |
| D5 | **Agreements storage:** a new append-only table, or a key in the profile, which is a migration either way | The legal acceptance architecture |
| D6 | Who acts as the **human reviewer** for `verified` records, and how often | Verification needs a named process |

## 12. Evidence gaps

- **Read so far:** GIAS states OGL v3.0, which permits commercial use with attribution (still to check each download's own notice). The Discover Uni website terms bar commercial use without written permission.
- **Not yet read:**
  - The Discover Uni dataset's own licence (on hesa.ac.uk, 403).
  - UKRLP.
  - The Scottish, Welsh and NI school registers.
  - Any explicit reuse statement for CCD, PSS, IPEDS or College Scorecard (the CCD and Scorecard pages read don't state one).
  - The College Scorecard API terms.
- The Discover Uni coverage statement (which courses are "eligible") is on hesa.ac.uk: not yet read.
- Record counts and file sizes per source: not yet measured.
- Registers for Scottish, Welsh and NI schools: not yet identified.
- Whether IPEDS or College Scorecard give institution-specific programme titles, or only CIP fields.
- Whether the live `profiles` RLS matches the migrations.
