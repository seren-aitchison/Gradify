# Proposal: MyGradify academic intelligence layer and education catalogue

**Proposal 5.** The architecture was approved in principle by the owner (24 November 2026), with Addendum A. **Stage 1
research is reported in [`docs/STAGE1-RESEARCH-REPORT.md`](STAGE1-RESEARCH-REPORT.md)**, which supersedes section 6
and section 11 below where they differ. Stage 2 isn't started; it needs G2. Each stage needs its own approval
(Addendum A, A4).

- No code, migration, change to production data, merge, branch deletion or deployment follows from this document.
- Authentication, Stripe, payments, existing progress data and Stage 5's outstanding production tasks are out of
  scope and kept separate.

**Purpose.** MyGradify is an international academic intelligence layer, not a directory and not a university profile
form. It should know what a student is studying, which curriculum or programme applies, what they need to learn and
how they're assessed, so the catalogue, degree tracker, Smart Plan, lessons, diagrams and past papers work as one
product for years without a rebuild.

---

## 1. Decisions (authoritative)

### The owner's architectural decisions

1. **Catalogue:** static, version-controlled JSON, offline and signed-out, with full provenance. It can move to
   Supabase later without changing the front-end contract.
2. **Student choices** live in `profiles.learner.academic`, with the safeguards in section 3.3.
3. **Scope:** the UK and US together, at every stage from primary to doctoral, including FE, vocational and adult
   learning.
   - Then Canada, Australia and New Zealand; then Europe; then the rest of the world.
   - The five universities with verified rules are the first cohort for verified academic rules, not the limit of the
     catalogue.
4. **Personal data in the first release:** exactly eight student-entered fields (section 3.3).
5. **Release gate:** the owner's mandatory checklist (section 10) applies in full, and the owner must approve
   explicitly.
6. **Calendars:** the full roadmap stays, under the "busy, not what" principle. Calendar data and connection state go
   in protected per-user storage, never in the catalogue. A legal acceptance system is required (section 8).

### D1–D6 (decided by the owner; recorded here)

| # | Decision |
|---|---|
| D1 | **Discover Uni:** investigate the dataset's own licence first; if commercial reuse isn't expressly permitted, request written permission. **No ingestion until cleared.** |
| D2 | **Schools are in the catalogue research and architecture**, but collecting academic profiles from children doesn't launch until a separate legal and child-safety assessment is complete. Public school records in the catalogue are a separate matter from collecting a child's personal profile. |
| D3 | **Unverified records may be shown**, clearly labelled, where the source's licence allows publication. They are **never** used as authoritative academic rules. |
| D4 | **Server-side validation** of `academic` through a controlled database function (or equivalent) that validates it and merges it without overwriting unrelated learner keys. *Needs an approved migration.* |
| D5 | **A separate, append-only `agreements` table**, with appropriate access controls. *Needs an approved migration.* |
| D6 | **Verification by named, qualified subject reviewers**, with an evidence trail, and a second reviewer for important academic rules where practical (section 5). |

---

## 2. Three kinds of data, never mixed

| Kind | What it is | Where | Who writes it | Trust |
|---|---|---|---|---|
| **Catalogue records** | Public reference data about systems, providers, offerings, structures, units and curricula, each with provenance and a verification status | `data/catalogue/` (static JSON; Supabase later) | Build scripts from licensed sources, and reviewers | As labelled: `verified`, `partially_verified`, `unverified`, `outdated` |
| **Student-entered information** | One student's choices: the eight fields | `profiles.learner.academic` (own-row RLS, validated server-side) | The student | Always `not_independently_verified`. Never written back into the catalogue |
| **Verified academic rules** | Rules that change a student's numbers: classification boundaries, year weightings, borderline and progression rules, assessment weightings | Today `kit/data/uni-rules.js`; later a `rules` record type in the catalogue | Reviewers only (two people where practical) | Only `verified` rules feed the maths; anything else is shown as information, never applied |

A student's own entries can **suggest** a gap in the catalogue (for example, an anonymous count of "not listed" choices
per provider), but never create or change a catalogue record by themselves.

---

## 3. Data model

### 3.1 Canonical identifiers

- **Gradify owns every ID.** Each catalogue entity gets an opaque, permanent ID, generated once and never reused:
  `gp_` (provider), `go_` (offering), `gs_` (structure), `gu_` (unit), `gc_` (curriculum element), `ga_` (assessment),
  `gy_` (system), `gr_` (rule). Each is a prefix plus a ULID, for example `gp_01JH6Z…`.
- **External identifiers are aliases**, never identity:

  ```js
  aliases: [
    { scheme: "ukprn", value: "10007786", source: "src_ukrlp", valid_from: "…", valid_to: null },
    { scheme: "urn", value: "100000", source: "src_gias" },
    { scheme: "ipeds_unitid", value: "110635", source: "src_ipeds" },
    { scheme: "nces_school", value: "060000000000", source: "src_ccd" },
    { scheme: "kiscourseid", value: "…", source: "src_discoveruni", valid_to: "2028-08-31" }
  ]
  ```

  An alias index (`aliases/<scheme>.json`, alias → Gradify ID) is built for matching at ingestion.
- **Ingestion matches on aliases first**, then on a deterministic name, address and type match for review. It never
  mints a second ID for something already known.
- **Lifecycle of an ID:**
  - A record is never deleted. It becomes `status: "closed"` (a school closes) or gets `effective_to` (a course is
    withdrawn).
  - When duplicates are found, one record survives and the other becomes a **tombstone** with `merged_into: "gp_…"`.
    The reader follows `merged_into`, so student references and history keep working.
  - When a source changes its identifiers or format, only the alias table changes; Gradify IDs stay the same.
  - When a provider is split, the old ID becomes a tombstone with `split_into: [ … ]`. The student is asked to choose,
    and nothing is guessed.
- **Students store Gradify IDs plus the display name they saw**, so a renamed or tombstoned record still reads
  sensibly.

### 3.2 Entities and relationships

**The hierarchy is for navigation:**

```
country → education system → provider → offering → stage → unit → curriculum element
```

Every level is optional per system: a US high-school student, a UK Year 9 pupil, an apprentice and a PhD candidate
each use only the levels that exist for them.

**Relationships are many-to-many**, stored as typed edges (`relations/<type>/<shard>.json`). The model isn't a strict
tree:

| Edge | From → To | Examples |
|---|---|---|
| `offers` | provider → offering | A provider runs many offerings; a jointly delivered offering has several providers |
| `has_stage` | offering → stage | Year 1–4; Grade 9–12; Level 3 |
| `includes` | structure (offering × cohort × stage) → unit, with `compulsory` / option group | One module in several programmes; option groups ("choose 40 credits from…") |
| `covers` | unit → curriculum element | One outcome taught in several units, subjects and offerings |
| `assesses` | assessment → curriculum element; assessment → unit | One exam covering several outcomes, or several units |
| `aligned_to` | curriculum element ↔ curriculum element | An outcome mapped to a national framework, or to a Gradify lesson |
| `governed_by` | offering / provider → rule | Which verified rules apply, by cohort |
| `supersedes` | any → same type | Versions across academic years |

**Entity fields (summary):**

- **`system`:** country, name, ordered stages with typical **age ranges** (guidance, not rules), and the academic-year
  pattern (start month; terms, semesters or quarters).
- **`provider`:** name(s), type (`school`, `college`, `fe`, `university`, `training`, `district`…), stages offered,
  region, status, campuses.
- **`offering`:** title, kind (`programme`, `qualification`, `grade`, `course_of_study`, `apprenticeship`),
  qualification (`{ label, code? }`), subjects (scheme-tagged: `cah:`, `hecos:`, `cip:`), mode, length
  (`{ value, unit }`), flags.
- **`structure`:** offering × **cohort start** × stage. A 2024 starter and a 2026 starter can differ.
- **`unit`:** code, title, size (`{ value, unit }`: credits, ECTS, Carnegie units, hours), level, teaching period,
  prerequisites (edges).
- **`assessment`:** kind, weight, timing.
- **`curriculum element`:** awarding body or framework, specification version, text reference (a link, not a copy,
  unless the licence allows a copy).
- **`rule`:** typed rule data, as in `uni-rules.js`. Only `verified` rules are applied.

**Provenance on every record and every edge:**

```js
provenance: {
  source_id: "src_gias",                       // → sources/<id>.json: name, owner, licence (quoted, with URL), attribution text, cadence
  source_type: "government_register" | "regulator_dataset" | "institution_publication" | "awarding_body" | "reviewer_entry",
  source_url: "…", source_record: "…",          // exact file, page or API call, and the row or anchor
  retrieved_at: "…", content_hash: "…",         // of the source extract, to detect change
  academic_year: "2027-28" | null, effective_from: "…" | null, effective_to: "…" | null, supersedes: "go_…" | null,
  verification_status: "verified" | "partially_verified" | "unverified" | "outdated",
  last_checked: "…", next_review: "…",
  review: { by: "rev_…", second_by: "rev_…" | null, fields_checked: ["title", "length"], evidence: "evd_…" } | null
}
```

Where a record came from (`source_type`) is separate from whether it was checked (`verification_status`).

### 3.3 Student profile: exactly eight student-entered fields

**The eight fields:**

| # | Field | Stored as |
|---|---|---|
| 1 | Country of study | `country` |
| 2 | Institution | `institution: { id: "gp_…" \| null, name }` |
| 3 | Subject | `subject: { id \| null, name }` |
| 4 | Programme or qualification | `offering: { id: "go_…" \| null, name }` |
| 5 | Start year | `start_year` |
| 6 | Current year or stage | `current_stage: { value, label }` |
| 7 | Study mode | `mode` |
| 8 | Current modules (or courses or classes) | `units: [{ id: "gu_…" \| null, name }]` |

**System metadata, which isn't student-entered and isn't a further field:**
- `verification_status: "not_independently_verified"` (constant).
- `last_updated` (timestamp).
- `schema_version`.
- The catalogue version the IDs were chosen from.

**`history` is removed from the first release.**
- It would keep previous course choices, which is additional personal information, and it isn't needed.
- Progress, attempts, mastery, notes, tracker rows and plans are keyed to lessons, topics and the student, never to
  `academic`, so changing course already loses nothing.
- If a future feature needs previous courses, it comes back as a separate proposal.

**Safeguards:**
- Writes go only through the D4 function, which validates types, lengths and IDs, rejects unknown keys and merges
  `academic` without touching other learner keys.
- Uncatalogued entries (`id: null` plus a typed name) are valid.
- Profiles without `academic` keep working.
- Nothing from `academic` goes to analytics, logs or error reports.
- Size stays well inside the 20 KB limit (units capped, for example, at 30).

---

## 4. Catalogue availability: never a gate

**Acceptance criterion (required for every stage that touches students):**

- No student is blocked from finishing onboarding or using **any** Gradify feature (the tracker, Smart Plan, lessons,
  flashcards, AI tools) because their institution, qualification, course or modules are missing from the catalogue.
- Every catalogue step offers **"Not listed"** with typed entry, **Import your handbook** (`kit/data/handbook.js`) and
  **Skip**.
- Features that need structure (a degree weighting, for example) fall back to the student's own settings, as the
  tracker does today.
- Tests cover a student with no catalogue match at any step.

---

## 5. Verification operations (D6)

**Who can verify.**
- **Named reviewers** in a reviewer register (`reviewers/<id>.json`: name, qualification or competence, subject
  areas, record types, appointed by the owner, date).
- Automated processes may set only `unverified` and `outdated`. They never set `verified`.

**What each status requires:**

| Status | Set by | Requires |
|---|---|---|
| `unverified` | Ingestion (automatic) | A licensed source; provenance complete |
| `partially_verified` | One reviewer | Listed fields compared with the source; evidence kept |
| `verified` | One reviewer; **a second reviewer** for academic rules, assessment weightings, progression and classification data, and programme structures | Every field compared with the source; evidence kept; second sign-off where required |
| `outdated` | Automatic or a reviewer | Past `next_review` or `effective_to`, a source change, or a source that's gone |

**Evidence kept** (`evidence/<id>.json`, in the repo):
- source URL, retrieved-at time and content hash;
- the exact quoted text or table extract the decision relied on (as `uni-rules.js` does today);
- the reviewer's notes;
- for documents, an archived copy where the licence allows, else the hash and quote.

**Re-review triggers:**
- The scheduled build re-fetches each source on its cadence and compares content hashes per record.
- A changed hash moves `verified` or `partially_verified` to `outdated`, and opens a review item listing the changed
  fields.
- Unchanged records keep their status until `next_review`.

**When a source disappears:**
- The build keeps the last good data, marks affected records `outdated` after a grace period (default 30 days, or at
  once if the source says the data was withdrawn), and opens a review item. It never empties a shard silently.
- If the data is legally withdrawn (a licence is revoked), the records are removed from publication at the next build.

**Review frequency (defaults, for the owner to adjust):**

| Record type | Next review |
|---|---|
| Rules (classification, weighting, progression) | Every academic year, before term, and whenever the source changes |
| Programme structures and units | Every academic year |
| Offerings | On each source release (Discover Uni is updated weekly; others annually) |
| Providers | On each register release (GIAS: as published; CCD: annual; PSS: every two years; IPEDS: annual) |
| Curriculum elements | When the awarding body publishes a new specification version |

---

## 6. Sources

See the Stage 1 report for the full rights and coverage matrix, quoted terms and measurements. In summary (24
November 2026):

- **Cleared:** GIAS (England), with conditions: no personal-data fields, downloads only, OGL attribution.
- **Likely usable, one confirmation each:** NCES CCD, PSS and IPEDS (does the IES public-domain statement cover
  nces.ed.gov?); NI institution search (does DE's OGL statement cover the separate apps host?); OfS Register (read
  its download notice).
- **Needs permission or the licence read:** Discover Uni (D1; draft request prepared, not sent); College Scorecard.
- **Blocked:** UKRLP, and the Scottish and Welsh registers. A person needs to read them because of bot protection or
  an unreachable host.

**Measured:** IPEDS HD2024 has 6,072 institutions (1.09 MB zipped); the GIAS "All establishment" CSV is 61.75 MB; the NI
search returned 1,116 institutions under default criteria.

**Rule unchanged:** no source is ingested until it is cleared for the rights it uses.

## 7. Catalogue files, search and performance at national scale

```
data/catalogue/
  manifest.json                       schema version, build id, sources and licences, counts, coverage links
  sources/<src>.json                  licence (quoted), attribution text, cadence, last fetch
  systems/<gy>.json
  providers/<country>/<region>/index.json   search rows: id, names, type, town, stages, status (compact)
  providers/<country>/<region>/<gp>.json    full record + offerings summary
  offerings/<go>.json, structures/<gs>.json, units/<shard>.json, curriculum/<framework>/<version>.json
  relations/<edge>/<shard>.json
  aliases/<scheme>.json               external id → Gradify id (used at build time, not shipped to browsers)
  tombstones.json                     merged_into / split_into
  coverage/<country>.json             by stage and region: counts, % with offerings, % with structures, by status
```

- **Search.** The student picks a country, then a region (England, Scotland, Wales or NI; a US state), and only that
  region's index downloads.
  - Each index row is compact: ID, display name, alternative names, type, town and stages.
  - The build pre-computes normalised tokens (lower case, accents stripped, "St"/"Saint" and "Univ"/"University"
    equivalents) for prefix and fuzzy matching in the browser.
  - **Target:** each region shard under 300 KB gzipped, with first results within 100 ms on a mid-range phone. To be
    validated against measured counts in Stage 1. A large region (Texas, California) is split by county or first
    letter if it's over budget.
  - Shards are cached by the service worker and versioned by build ID.
- **Offerings and structures load on selection,** never all at once.
- **The front-end contract:** one module, `kit/data/catalogue.js`, with async functions:
  - `systems(country)`
  - `searchProviders(country, region, q)`
  - `provider(id)`
  - `offerings(providerId, { subject })`
  - `structure(offeringId, cohort)`
  - `units(ids)`
  - `relations(id, type)`
  - `resolve(id)`, which follows tombstones.

  Nothing else reads the files.
- **The route to Supabase.** The same shapes become tables (`systems`, `providers`, `provider_aliases`, `offerings`,
  `structures`, `units`, `curriculum_elements`, `assessments`, `relations`, `rules`, `sources`, `evidence`), with
  public read-only RLS and search through a SQL function (trigram index). Only the internals of `catalogue.js` change.
  That move needs its own approved migration.

**Data lifecycle:**
- **Builds and releases:** each scheduled build is a commit, so `git log` is the history. Each release has a build ID
  in `manifest.json`.
- **Corrections:** a reviewer edits through a correction file (`corrections/<id>.json`, with evidence). Corrections
  override source values, survive re-ingestion and are flagged if the source later disagrees.
- **Source changes:** re-review triggers (section 5).
- **History:** superseded versions stay addressable by ID with `effective_to`. Students' stored IDs resolve through
  tombstones.

---

## 8. Legal acceptance architecture (D5)

- **Separate documents, separately recorded:**
  - Terms of Service: *accepted* (a contract).
  - Privacy Policy: *acknowledged* (information, not consent).
  - Per-feature notices: the academic profile, and each calendar integration.
  - *Consent* only where consent is the lawful basis, as a separate affirmative choice that can be withdrawn.
- **The `agreements` table** (append-only; the user can read only their own rows; inserts only through a function; no
  updates or deletes by clients):
  - `user_id`, `document`, `version`, `content_hash`, `action` (`accepted`, `acknowledged`, `consented`, `withdrawn`),
    `surface`, `permission_state` (jsonb), `created_at`.
  - Retention and deletion on account closure are to be set with legal advice, because an audit record may need to
    outlive the profile.
- **Wording:** no blanket acceptance, and no "waive all rights" or "no liability" wording.
- **Review:** a UK solicitor reviews before significant paid growth.

---

## 9. Children (D2)

- **The catalogue includes schools.** Public register data about schools is not a child's personal data.
- **Collecting a pupil's academic profile** (their school and year group) is deferred until the assessment covers:
  - the ICO Children's Code;
  - UK GDPR Article 8 and the UK digital age of consent (13);
  - COPPA for US under-13s;
  - age assurance without a date of birth;
  - whether the child sites offer it at all.
- **Older students** (post-16 and HE): the first release must still handle a student who turns out to be under 18
  (under-18s are in Gradify's audience). The assessment covers this too.

---

## 10. Release plan

Each stage is approved separately. The owner's checklist below applies to Stages 4–6.

| Stage | Deliverables | Depends on | Acceptance criteria |
|---|---|---|---|
| **1. Research and acquisition architecture** *(incomplete)* | For each source: the exact dataset, API or download; coverage by stage and region; gaps; licence and terms quoted with links; commercial use, modification, redistribution and derived-data rights; attribution text; cadence; identifiers; record counts and sizes; whether permission is needed. The S4 registers identified. Revision 4 of this proposal | Network access (hesa.ac.uk is blocked; UKRLP and the devolved registers aren't allowed yet); D1 permission request | Every licence quoted from the source; every claim marked confirmed, assumption or open; no source labelled cleared without its own terms |
| **2. Catalogue schema and validation** | JSON Schemas for every entity, edge, provenance, alias, tombstone, source, reviewer and evidence record; `catalogue.js` (the contract above) over fixtures; build-time validators; the coverage report generator | Stage 1 approved | Validators reject missing provenance, unknown statuses, duplicate or reused IDs, an edge to a missing record, and any source without cleared terms. Fixtures cover a UK university, an English school, a US public high school, a US private school and a community college, with many-to-many cases |
| **3. UK + US ingestion and coverage** | One build script per cleared source; sharded files; alias matching and de-duplication; coverage reports; scheduled re-fetch with change detection | Stage 2; each source cleared; D6 reviewers named | Every record has provenance; coverage published; nothing `verified` without a reviewer and evidence; shard size targets met; a source failure doesn't empty data |
| **4. Eight-field profile, privacy and legal** | The D4 validate-and-merge function; the D5 `agreements` table; the privacy policy and in-product notices; the post-16 and HE scope from D2 | Stages 1–3; migrations approved; legal review | The full checklist; the live RLS checked; no extra fields |
| **5. MyGradify onboarding and profile** | Adaptive onboarding (section 4's fallback on every step); profile editing; unit selection; handbook import; search | Stage 4 | The brief's section 9 tests, plus "never blocked" tests; light and dark, desktop and phone; keyboard access |
| **6. Tracker and Smart Plan integration** | Offering length and cohort feed the tracker; units become tracker rows after review; only `verified` rules apply | Stage 5 | Progress never lost; unverified data never changes the maths |
| **7. International expansion** | Canada, Australia and New Zealand; then Europe; then the rest of the world; deeper unit and curriculum coverage | Stage 6 | Stage 1-style research per country |

### Mandatory release checklist (owner's; Stages 4–6)

1. **Data collection:**
   - Only the eight fields are collected; system metadata is listed as such.
   - No sensitive data.
   - Existing profiles stay compatible and aren't overwritten.
   - Students can correct their entries.
   - Custom entries are supported.
   - Entries are labelled not independently verified.
2. **Privacy and legal:**
   - The policy matches the implementation.
   - Purpose and lawful basis are documented for each field.
   - Retention, deletion and account closure are documented and implemented.
   - Processors are disclosed.
   - The notice is shown before collection.
   - Any consent is specific and recorded.
   - Versions and timestamps are recorded.
   - UK GDPR, the DPA 2018 and children's requirements are reviewed.
   - Age assurance is assessed.
   - No wording waives statutory rights.
3. **Security and permissions:**
   - Owner-only access is verified on the live database.
   - Server-side validation is in place.
   - No academic data appears in catalogue files, logs, analytics or error reports.
   - No unnecessary transmission.
   - Deletion is tested.
4. **Product:**
   - Each field's purpose is explained.
   - Students can save and come back.
   - Missing catalogue entries never block anyone.
   - Country-specific structures are supported.
   - No unsupported "verified" claims.
   - Keyboard, mobile and error handling are checked.
5. **Testing and release:**
   - All tests pass, plus new onboarding, validation, permission and regression tests (progress, lessons, attempts,
     mastery).
   - Privacy and deletion are tested end to end.
   - CI is green on the exact release commit.
   - No unrelated changes.
   - Release notes and the policy version are recorded.
   - The live deploy is verified.

**Nothing merges or deploys until every item is checked, any required legal review is done, and the owner has
explicitly approved the release.**

---

## 11. Outstanding blockers

See section 5 of the Stage 1 report (B1–B9), with the exact action for each.

## 12. Decisions still needed from the owner

Both were resolved on 24 November 2026; see Addendum A, A2.

---

# Addendum A: final architecture requirements (24 November 2026)

The owner approved the core architecture in principle. These requirements bind the implementation specification and
take precedence over anything in sections 1–11 that conflicts with them.

## A1. Implementation requirements

**1. Evidence and copyright.** There are three separate categories, each with its own rules:

| Category | Examples | Rule |
|---|---|---|
| **Publishable catalogue data** | Provider names, offering titles, identifiers, lengths | Published only where the source's licence permits redistribution and derived data (for example, OGL v3.0 with attribution) |
| **Internal review evidence** | Short quoted extracts, content hashes, retrieval records, reviewer notes | Kept only where the source's licence or another lawful basis (for example, a statutory exception, assessed case by case) covers keeping it. Not published. Kept to the minimum extract needed and given a retention period |
| **Link-only material** | Copyright documents with no reuse grant: most university handbooks and module pages, awarding-body specifications | Referenced by URL, title, version and hash only. No copies and no extensive extracts |

- Each `sources/<src>.json` records **separately** what is permitted for ingestion, publication, retention of
  extracts and archiving.
- Permission for one never implies another.
- The build refuses to publish fields from a source whose publication right isn't recorded.

**2. Field-level verification.**
- Verification is recorded **per field** (`provenance.fields: { title: { status, review }, length: { … } }`). Facts
  that are verified on their own (a structure, a rule) are separate linked records with their own status.
- A record's overall status is derived as the **lowest** status of the fields shown. The UI labels the specific fact
  it shows (for example, "Title checked; course structure not yet checked"). A verified title never makes a programme
  read as verified.

**3. Source changes.**
- A changed content hash opens a review and **diffs the fields**.
- Only the changed fields move to `outdated`; the unchanged fields keep their status and evidence.
- The **last verified version** stays stored and addressable (`versions[]`).
- Until a reviewer accepts the change, calculations (rules, weightings, structures used by the tracker or Smart Plan)
  keep using the last verified version, or nothing, never the unreviewed value. The UI says a change is pending review.

**4. Performance and accessibility.** The shard and search targets stay: each region's index under 300 KB gzipped, and
first results within 100 ms. They become reproducible tests:

| Area | Requirement |
|---|---|
| Data | Synthetic and real shards at the **measured** UK and US volumes from Stage 1, including the largest regions (for example, England, California, Texas) |
| Devices | A throttled mid-range phone profile (4× CPU slowdown, as in the existing performance guard `scripts/perf-check.cjs`), plus a desktop baseline. Run in CI, with results recorded per build |
| Network | Slow 3G and offline: cached shards work offline through the service worker; the first search on a slow connection shows progress and stays usable, never a blank screen |
| Accessibility | A combobox following the WAI-ARIA authoring pattern; full keyboard use (arrows, Enter, Escape, Home/End); results announced to screen readers; visible focus; reduced motion; checked with axe and by hand with VoiceOver and NVDA |

**5. Custom entries.**
- A student-typed institution, programme or module **never inherits** catalogue data or rules through name matching.
- Matching may **suggest** catalogue records ("Did you mean MChem Medicinal Chemistry, University of Bristol?"). It
  links only when the student confirms.
- Even after a link, a record's rules apply only if the record itself meets the verification requirements (only
  `verified` rules change numbers).
- Unconfirmed custom entries stay `id: null`.

## A2. Decision register

| # | Decision | Status |
|---|---|---|
| 1 | Catalogue in static, version-controlled JSON, with a route to Supabase behind `kit/data/catalogue.js` | Decided |
| 2 | Student choices in `profiles.learner.academic`, with the section 3.3 safeguards | Decided |
| 3 | UK and US together, all stages, then CA/AU/NZ, Europe, the rest of the world | Decided |
| 4 | Exactly eight student-entered fields in the first release; `history` dropped | Decided |
| 5 | The owner's release checklist and explicit approval for every release | Decided |
| 6 | The full calendar roadmap kept; calendar data per-user, never in the catalogue | Decided |
| D1 | **Discover Uni:** first find out whether the dataset's own licence permits commercial reuse. If not, prepare a written permission request **for the owner's approval**. Don't send it. Don't present Gradify as an incorporated company ("Gradify Ltd" doesn't exist yet); the request names the actual individual or business seeking the rights and describes the intended commercial use accurately. **No ingestion until permission is established** | Decided; action pending (licence unread, hesa.ac.uk blocked) |
| D2 | Schools in catalogue research and architecture; no collection of children's academic profiles until the separate legal and child-safety assessment is complete | Decided |
| D3 | Unverified records may be shown, labelled, where the licence permits publication; never used as authoritative rules | Decided |
| D4 | Server-side validate-and-merge function for `academic` | Decided; migration needs approval at Stage 4 |
| D5 | Separate append-only `agreements` table | Decided; migration needs approval at Stage 4 |
| D6 | **Reviewer register.** The owner approves each appointment. Reviewers need relevant subject or regulatory competence for the record. Two-person review for important academic rules and programme structures. **With no suitable reviewer, a record can't be marked verified.** The section 5 review frequencies are initial defaults: configurable, and reviewed after the first year | Decided; no reviewers appointed yet |
| A1.1–A1.5 | Evidence and copyright categories; field-level verification; field-diff source changes; reproducible performance and accessibility tests; no inheritance by custom entries | Decided |

## A3. Product acceptance vision (long-term direction, not first-release scope)

MyGradify should eventually let Gradify answer, from the student's actual programme and curriculum:

- What qualification or programme am I studying, and under which rules?
- What should I be learning at this stage, and which specification points or learning outcomes apply to me?
- Which of my modules cover each outcome, and which assessments count towards my result?
- What should I revise next, and which Gradify lessons, diagrams, flashcards and past-paper questions match my
  course?
- How am I progressing against my programme's requirements?

The many-to-many model (offering → structure → unit → curriculum element ← assessment, with `aligned_to` edges to
Gradify content) is the foundation that connects the degree tracker, Smart Plan, Specification Mastery, lessons,
diagrams and past papers. Each capability is approved and released as its own feature.

## A4. Staged implementation plan and approval gates

Nothing starts until its gate is passed. Each gate needs the owner's explicit approval; a gate is never inferred from
an earlier one.

| Stage | Scope | Depends on | Gate to start | Gate to finish (release) |
|---|---|---|---|---|
| **1. Research completion** | Every source's licence (ingestion, publication, retention, archiving), coverage, counts, sizes, identifiers and cadence; the devolved school registers; the Discover Uni dataset licence (D1); a check of the live `profiles` RLS; a permission-request draft if needed | Network access (hesa.ac.uk, UKRLP, devolved registers, ed.gov, api.data.gov); Supabase read access for the RLS check | **G1:** owner approves the research scope and the hosts to allow | Owner accepts the research report; any D1 letter is approved by the owner (not sent by Claude) |
| **2. Schema and validation** | JSON Schemas (entities, edges, aliases, tombstones, per-field provenance, sources with separate rights, reviewers, evidence, versions); `catalogue.js` over fixtures; validators; performance and accessibility test harness. No student data, no ingestion | Stage 1 accepted | **G2:** owner approves the specification | Owner approves the release (repo-only; no production change) |
| **3. Ingestion** | Build scripts for **cleared** sources only; alias matching; coverage reports; change detection with field diffs; performance tests at measured volumes | Stage 2; each source cleared for the rights it uses | **G3:** owner approves the list of cleared sources and the rights used | Owner approves publishing the catalogue files |
| **4. Profile, privacy and legal** | D4 function and D5 table (migrations); privacy policy and notices; legal review; post-16 and HE only (D2) | Stage 3; legal review | **G4:** owner approves each migration's SQL and the legal review is done | The full release checklist; owner approval |
| **5. Onboarding and profile** | Adaptive onboarding with the "never blocked" fallback; profile editing; unit selection; handbook import; accessible search | Stage 4 live | **G5:** owner approves the designs | Release checklist; owner approval |
| **6. Tracker and Smart Plan** | Offering and cohort feed the tracker; units become rows after review; only verified rules apply; pending changes never feed calculations | Stage 5 live; at least one verified rule set with two reviewers (D6) | **G6:** owner approves the integration plan | Release checklist; owner approval |
| **7. Expansion and the A3 vision** | CA/AU/NZ, Europe, the rest of the world; curriculum alignment; Specification Mastery and content links | Stage 6 | **G7:** one gate per country or capability | Per release |

**Kept separate:** Stage 5 (calendar) production tasks, which are retiring the deployed `calendar-sync` function and
running `docs/sql/retire-calendar-links.sql` (backup, inspect, preview, verify). They are operations for the owner, not
part of MyGradify.
