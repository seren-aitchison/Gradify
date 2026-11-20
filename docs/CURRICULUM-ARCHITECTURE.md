# Curriculum architecture: the knowledge engine

**Version 1, 19 November 2026. Status: first milestone built and tested. Awaiting the owner's review before any
content work at scale.** The code is in `kit/curriculum/`; the report it produces is
[docs/qa/curriculum-knowledge.md](qa/curriculum-knowledge.md); the tests are `tests/curriculum-engine.test.mjs`.

The aim: one shared foundation of knowledge, with each country's curricula, each qualification and each exam
board's specification layered on top through explicit mappings. An improvement to a concept is then made once and
reaches every lesson that teaches it, as a review request, never as a silent overwrite.

## 1. Audit: what already existed

Before this work, Gradify already had most of the hard parts at course level. The engine builds on them and
replaces none of them.

| What | Where | What it does | Reused how |
|---|---|---|---|
| 35 courses on one engine | `kit/courses/<slug>/`, `kit/course/` | Syllabus, notes, questions, labs, exams; one renderer | Unchanged. Lessons stay where they are, in their format |
| Permanent lesson ids | `kit/courses/<slug>/ids.js`, `kit/course/syllabus.js` | Ids never reused; retired ids reserved | Bindings name lessons by these ids |
| Lesson and question versions | `registry.js`, `scripts/curriculum-registry.mjs` | A content hash and version per lesson | Bindings record the same hash, so the engine sees when a lesson changes |
| Notes format, content standard 2 | `kit/course/notes.js`, `docs/CURRICULUM_CONTENT_STANDARD.md` | `O:` objectives, `T:` terms, `SRC:` typed and dated sources, `PRE:` | The engine reads terms and text from it; source kinds are the same vocabulary |
| Coverage claims | `kit/curriculum/coverage.js` | verified / mapped / aligned / gradify per course; the UK's systems and qualifications | Its system and qualification ids are the engine's ids; validation checks against it |
| Framework maps | `kit/courses/{maths,law,nursing,pharmacy}/map.js` | Unit → framework area (DfE GCSE maths, SQE, NMC, GPhC) | Left in place. They map at school level; the engine maps at outcome and lesson level. Migrating them is phase 6 |
| Concept graph | `kit/learning/concepts.js`, `kit/courses/maths/concepts.js` | Prerequisites between modules within one course | Left in place. The engine's prerequisites are between canonical concepts, across courses |
| QA records | `qa.js` per course, `docs/CURRICULUM_QA.md` | written → tested → reviewed → sources → sign-off | Unchanged. Concept review states follow the same rule: nothing is "verified" without a name and a date |
| Quality Constitution | `kit/quality/constitution.js` | Ten articles, including no unevidenced coverage claims (3) and no silent degradation (7) | The engine's rules are these articles, applied to knowledge |

**What was missing:** a canonical record of an idea independent of any one course; specifications at outcome level;
a way to ask "which lessons teach this, for which pathways, at what depth?"; and a way to see what a change to an
idea affects. The same idea is currently taught separately in several courses (osmosis is in Biology, Chemistry,
Physics and, in passing, Ecology, Nursing and Veterinary) with nothing connecting them.

**Not in this repository:** the "Biology Curriculum Auditor". The engine uses its four finding classes (confirmed
error, gap, editorial, curriculum-dependent) so the two stay compatible when the auditor is brought in.

## 2. The model

```
Layer 1  universal/<subject>/*.js        Canonical concepts: definition, explanation, misconceptions, sources,
                                         and per level band what is expected, which terms belong, what is beyond.
Layer 2  frameworks/<country>.js         Education systems and their stages (Reception, Year 7, P5, S4…), each
                                         placed on a neutral level band.
Layer 3  specifications/<country>/*.js   What a framework or awarding body requires, outcome by outcome, with its
                                         version, URL and whether it has been checked against the published document.
Mappings mappings/outcomes.js            Specification outcome → the concepts it needs.            (Gradify's claim)
         mappings/lessons.js             Lesson → the concept it teaches, its role and band.       (Gradify's claim)
         mappings/courses.js             Course → the specifications it offers a route through.    (Gradify's claim)
Layer 4  kit/course/, kit/learning/      The learner's experience: unchanged; reads the engine when it needs to.
```

**Specifications and mappings are separate on purpose.** A specification records what an awarding body says, and can
be checked against its published document. A mapping records Gradify's judgement about it, and needs a reviewer.
Keeping them apart means a specification can be "checked" while the mapping is still "mapped", and the report says so.

**Level bands** (`schema.js BANDS`): early, primary, lower-secondary, upper-secondary, post-16, undergraduate,
postgraduate. Every stage of every system sits on one, so "England Year 11", "Scotland S4" and "Northern Ireland Year
12" can be compared without pretending they are the same thing. A band is a depth, not a qualification.

**The same concept at different depths.** The osmosis record says that at upper-secondary a learner works with dilute
and concentrated solutions, and that water potential is *beyond* that band; at post-16, water potential and
ψ = ψs + ψp are expected. The lessons stay written for their own learners. The record lets the engine tell when a
lesson's pitch doesn't suit a pathway.

## 3. The records

All records are plain ES modules exporting data, like the rest of the kit: they load in the browser and in Node with
no build step, and comments can carry provenance. (The brief suggested JSON with JSON Schema. Plain modules fit the
repository's conventions and allow comments. The rules live in `schema.js` as code, as `kit/course/spec.js` does for
course configs. A JSON export can be generated if an external tool needs one.)

**Concept** (`universal/`). `id` is permanent and looks like `BIO-CELL-OSMOSIS-001` (subject, domain, name, serial).
Fields: `version` and `changelog`, `title`, `subject`, `domain`, `type`, `definition`, `explanation`,
`prerequisites` and `related` (concept ids), `terms.preferred` and `terms.variants` (a variant names the preferred
term and the bands where the difference matters), `levels.<band>` (`expects`, `terms`, `beyond`),
`misconceptions`, optional `perspectives` (how another subject frames it), `sources` (as `SRC:`, plus `checked`), and
`review` (`draft`, `needs_review`, `reviewed`, `verified`; the last two need `by` and `on`).

**System** (`frameworks/`). `id` (from `coverage.js`), `country`, `name`, `authority`, `curriculum`, `note`, and
`stages`: `{ id, name, group, band, ages, qualifications }`.

**Specification** (`specifications/`). `id`, `body`, `code`, `title`, `system`, `qualification`, `band`, `stages`,
`version`, `url`, `wording` ("verbatim" or "paraphrased"), `checked` (`null`, or `{ on, by }` once checked
against the published document), `scope` (which part is modelled) and `outcomes`: `{ id, ref, title, summary }`.
`ref` is the specification's own reference, or `null` where it isn't known for certain.

**Mappings.** Outcome map: `{ spec, outcome, concepts, claim, reviewed, practical? }`. Lesson binding:
`{ course, lesson, concept, role, band, covers?, checked: { conceptVersion, lessonHash, on, by } }`, where role is
`teaches`, `applies` or `mentions`. Pathway: `{ course, spec, claim }`.

## 4. The engine

`kit/curriculum/engine.js`, pure functions over data. It reads; it never writes a record or a lesson.

| Function | Answers |
|---|---|
| `validate(kb, lessons)` | Is everything sound? Broken references, prerequisite cycles, duplicate ideas, claims stronger than their evidence, specifications whose stages don't match their band, bindings to lessons that don't exist |
| `pathwaysFor(kb, concept)` | Which specification outcomes, in which systems and qualifications, need this concept? |
| `lessonsFor(kb, concept)` | Which lessons, in which courses, teach or apply it? |
| `coverage(kb, spec, lessons)` | For each outcome: **covered** (a lesson at this band teaches it), **partial** (a lesson at this band only applies it), **above-level** or **below-level** (taught, but pitched elsewhere), **gap**, or **no-course** (no Gradify course offers the specification). Practical outcomes need a lesson that covers the practical |
| `impact(kb, concept, lessons)` | If this concept changes, what is affected: each bound lesson with its state and the action it needs, every pathway, every concept that builds on it |
| `consistency(kb, lessons)` | Terminology variants in exam-facing lessons (editorial), terms beyond a lesson's band (curriculum-dependent), terms a band expects that a course's lessons never use (gap) |
| `summary(kb, lessons)` | The dashboard counts |

**Binding states.** `current`: checked against this concept version and this lesson text. `concept-changed`: the
concept's version has moved on; the lesson needs review against the changelog. `lesson-changed`: the lesson's
hash has changed; confirm the binding still holds. `lesson-missing`. A binding is *confirmed* only when `checked.by`
names a person; until then the report counts it as unconfirmed.

**Commands.**

```bash
npm run curriculum
```

Validates, then writes `docs/qa/curriculum-knowledge.md`. It also runs at the end of `npm run qa`.

```bash
node scripts/curriculum.mjs coverage aqa-8464
```

```bash
node scripts/curriculum.mjs impact BIO-CELL-OSMOSIS-001
```

```bash
node scripts/curriculum.mjs hash biology/u02-21
```

## 5. The content workflow

Each step, what does it, and the rule it follows.

| Step | How | Rule |
|---|---|---|
| 1. Inspect | `impact` and `coverage` for the concept or specification; read the lessons, their bindings, objectives and `qa.js` stage | Start from what the lesson is for: its course, band and learners |
| 2. Research | Retrieve sources: OpenStax, NCBI Bookshelf, the specification itself, primary literature | A source is cited, with kind and date. It is `checked` only once someone has checked the claim against it. Never invent a source or a verification |
| 3. Audit | `consistency`, plus a reading against the concept record and the specification | Classify every finding: confirmed error, gap, editorial or curriculum-dependent. The engine finds only the last three; errors need evidence |
| 4. Improve | Edit the concept record (raise `version`, add a `changelog` line) and/or draft lesson changes | Change only what is needed. Keep correct material. Keep the lesson's band. Never rewrite a lesson because a check flagged it |
| 5. Validate | `npm test`, `npm run qa` (content standard, registry, this engine) | All checks pass before anything is proposed |
| 6. Review | A pull request whose description lists findings, changes, unresolved questions and confidence; the old text stays in git history | Substantive content changes need human approval before they reach `main`. Then record `checked.by` and `on` on the bindings, and `review` on the concept |

**Propagation, concretely.** A reviewer improves `BIO-CELL-OSMOSIS-001` and raises it to version 2. The engine
reports Biology u02-21, Chemistry u05-17 and Physics u34-05 as `concept-changed`, with the changelog line, and lists
the three AQA pathways that depend on the concept. Each lesson is then reviewed for its own band. Biology may
adopt the change. Chemistry may rightly not, because it teaches osmosis as a colligative property. Each binding is
re-checked with the new version. Nothing changes until a person decides. `tests/curriculum-engine.test.mjs`
"ACCEPTANCE 2" proves this with a frozen knowledge base.

## 6. First milestone: acceptance criteria

| # | Criterion | Evidence |
|---|---|---|
| 1 | The existing architecture is audited and reused, not duplicated | §1; no course file, lesson or engine file was changed |
| 2 | Universal knowledge schema | `kit/curriculum/schema.js` `checkConcept`, enforced by test |
| 3 | System, qualification, exam-board and specification schemas | `checkSystem`, `checkSpec`; qualifications and systems shared with `coverage.js` |
| 4 | Mapping and resolution engine | `kit/curriculum/engine.js` |
| 5 | Validation and review workflow | `validate`, binding states, review states, §5 |
| 6 | A working vertical slice on an existing subject | Biology cell transport: 4 concepts, 4 UK specifications, 15 outcomes, 14 bindings to 11 real lessons in 4 courses |
| 7 | One concept, many pathways, no duplicated knowledge | Test "ACCEPTANCE 1": one osmosis record → AQA 8464, 8461 and 7402 (GCSE and A level, two bands), and lessons in Biology, Chemistry and Physics |
| 8 | Improving the concept identifies the affected lessons and overwrites none | Test "ACCEPTANCE 2" |
| 9 | Claims never exceed evidence | Test: no specification checked, no mapping verified, no source checked, all concepts awaiting review, and the report says so |

## 7. What the slice found in the existing curriculum

Found by the engine on the real lessons. None of these lessons has been changed.

1. **GCSE Core has no lesson on diffusion, osmosis or active transport** (gap). Its earlier lesson, u04-04, was
   retired unwritten when School 4 became the human body. Diffusion appears only inside "Gas exchange and breathing"
   (partial). AQA 8464 section 4.1.3 is otherwise uncovered.
2. **GCSE Core promises "every required practical" but has no Biology practicals lesson** (gap). It has lessons for
   the Chemistry and Physics practicals; the osmosis practical is missing. Its Combined Science path text claims all of them.
3. **SciGradify Biology teaches transport at A level depth** (curriculum-dependent). It fully covers AQA 7402 §3.2.3.
   For a GCSE Biology learner the same lessons are pitched above: they teach osmosis through water potential, which
   GCSE doesn't use. If Biology is to serve GCSE learners, it needs a GCSE route or a GCSE-level explanation alongside.
4. **Neither the GCSE nor the A level osmosis practical has a lesson** in Biology (gap). u02-21 has one question on potato
   cylinders, but not the practical.
5. **Terminology.** Chemistry u05-17 says "semipermeable" where UK biology specifications say "partially permeable".
   It is pitched at undergraduate chemistry, where the term is standard, so the engine correctly doesn't flag it.
   The same lesson used on a GCSE pathway would be flagged as editorial.
6. **The membrane lessons never name carrier proteins** (gap, minor). u02-17 and u02-18 between them use every
   other post-16 term; carrier proteins first appear in the transport lessons.
7. **Key Stage 3 science has no Gradify course** (no-course). It is modelled so the gap shows on the dashboard.

## 8. Implementation plan

Each phase starts only when the one before it is approved. Dates are not promised.

| Phase | Deliverable | Depends on | Done when |
|---|---|---|---|
| 1 ✅ | Schema, engine, validation, report, one vertical slice | | §6 holds; `npm test` passes |
| 2 | Owner review of this design; decisions in §10 | 1 | Owner approves or amends |
| 3 | Check the four UK specifications in the slice against their published documents; correct references; set `checked` | 2 | Each has `checked: { on, by }`, and a subject reviewer has confirmed the 15 outcome mappings |
| 4 | Biology foundation: canonical records for the concepts in SciGradify Biology Schools 1–5, bound to their lessons | 2 | Every Biology lesson in those schools has a binding; validation clean; consistency findings triaged |
| 5 | Close the gaps found in §7: GCSE transport lessons and practicals, written to content standard 2, through the §5 workflow | 3, 4 | Coverage shows AQA 8464 §4.1.3 covered; a teacher has reviewed the new lessons |
| 6 | England, whole school range: KS1–KS4 science and maths specifications at outcome level; migrate the four `map.js` files into the engine | 3 | KS3 and GCSE science and maths outcomes all mapped; dashboard shows coverage per year group |
| 7 | GCSE and A level across boards: Pearson Edexcel, OCR, WJEC Eduqas; then CCEA in the Northern Ireland system | 6 | Every board's outcomes are mapped to the same concepts. Nothing is duplicated, and board differences are recorded in the specifications |
| 8 | Wales (WJEC, Curriculum for Wales), Scotland (SQA National 5, Higher), Northern Ireland | 6 | Each system's own specifications modelled; no cross-nation assumptions |
| 9 | Remaining subjects: Chemistry, Physics, Maths, then the rest, in the order the paying audience needs | 4 | Each subject's foundation bound to its courses |
| 10 | Universities and professional bodies: degree modules and outcomes; SQE, NMC, GPhC and MLA from the existing maps | 6 | Institutional outcomes mapped with their source documents |
| 11 | Other countries, only where coverage is real | 7–9 | As for the UK |
| 12 | The dashboard on the site (quality.html), and scheduled monitoring | 4 | The report's counts shown to learners, as coverage.js counts are now |

**Learner pathway** (for the UX work, when it wants it): country → system → stage (gives the band) → qualification →
specification → outcome → concepts → lessons. The engine already resolves every step except the first screen.

## 9. Branches and the two workstreams

- **`main`** is production: every push deploys. Content work never commits to it directly.
- **Curriculum work** happens on one integration branch, in focused commits, and reaches `main` through reviewed pull
  requests. The brief names `curriculum/global-content`. The work began on `claude/happy-darwin-0942cr` and continues on
  `claude/epic-ptolemy-pslj3f` (merged with `main` on 20 November 2026), the branch the current session was assigned. It can move to `curriculum/global-content` once the owner approves that.
- **Ownership.** The curriculum workstream owns `kit/curriculum/`, `kit/courses/*/notes/`, `syllabus.js`, `ids.js`,
  `qa.js`, `map.js`, `concepts.js`, the curriculum docs and `scripts/curriculum*.mjs`. The UX workstream owns `kit/app/`,
  `kit/ui/`, `kit/styles/`, `kit/course/` rendering and the site pages. Neither edits the other's area without
  agreeing it first.
- **The contract between them** is `kit/curriculum/engine.js` and `knowledge.js`: the UX side reads the knowledge base
  through the engine's functions and never reads mapping files directly. Changing a function's shape is agreed first.
- After the UX branch merges, the curriculum branch merges `main` in and re-runs `npm test`. Conflicts are resolved by
  hand, never by taking one side wholesale.

## 10. Decisions for the owner

1. **Branch.** Move this work to `curriculum/global-content`, or keep it on the session branch and merge by pull request?
2. **Who reviews.** Concepts, mappings and specification checks need a named reviewer, by subject (`expert` in each
   course config says who signs lessons off). Who is that for Biology, and for GCSE science?
3. **SciGradify Biology's audience.** It is pitched at A level and first year undergraduate. Should it also serve
   GCSE learners, through a GCSE route, or should GCSE Core carry GCSE biology on its own (§7, findings 1 and 3)?
4. **First audience.** Which pathways do paying users need complete first? That sets the order of phases 4–9.
5. **Specification text.** Outcomes are paraphrased. Quoting awarding bodies' specifications verbatim may need their
   permission. Paraphrase with references is the safe default.

## 11. Adding to it

- **A concept:** add a record to `kit/curriculum/universal/<subject>/<area>.js`, import the area in `knowledge.js`, give it a
  new permanent id, `version: 1`, `review.status: "needs_review"`, and at least one source. Run `npm run curriculum`.
- **A specification:** a file in `specifications/<country>/`, imported in `knowledge.js`. Model only the part you map
  (say so in `scope`), paraphrase unless you hold permission, and leave `checked: null` until it is checked.
- **A binding:** a line in `mappings/lessons.js` with the lesson's current hash (`node scripts/curriculum.mjs hash
  <course>/<lesson>`) and `by: null` until a person has confirmed it.
- **Never:** reuse or rename a concept id; mark anything checked, reviewed or verified without a name and a date;
  bind a lesson to a concept it only mentions with role `teaches`.

## 12. UK-wide expansion (version 2, 20 November 2026)

The owner changed the strategy on 19 November 2026: build UK-wide coverage across every level, subject,
qualification and exam board at once, and improve existing content in large batches, without stopping after each
small milestone. What was added for that:

| Piece | Where | What it does |
|---|---|---|
| UK catalogue | `kit/curriculum/catalogue/uk.js` | 687 rows: EYFS and national curricula of all four nations, GCSE (AQA, Pearson, OCR, Eduqas, WJEC, CCEA), IGCSE (Pearson, Cambridge), AS and A level, SQA National 4/5, Higher and Advanced Higher, BTEC, Cambridge Nationals, T Levels, Access to HE, QAA degree benchmarks. Listed from knowledge and **unchecked**: codes only where known with confidence |
| Course profiles | `kit/curriculum/mappings/course-profiles.js` | Which subjects, levels and nations each Gradify course teaches, and the basis for saying so |
| Matrix | `kit/curriculum/matrix.js` | Every catalogue row's strongest supported status: none, related, subject, aligned, measured, verified |
| Extracted specifications | `kit/curriculum/specifications/uk/` | Outcomes taken by machine from the published PDF, with its URL, date and SHA-256 (`extracted`), separate from a person's check (`checked`) |
| Direct mappings | `kit/curriculum/mappings/coverage/` | Specification outcome → lessons with fit "covers" or "partial", for outcomes with no canonical concept yet. A board's specification that restates national content `inherits` its mapping |
| Progress report | `scripts/curriculum-progress.mjs` → `docs/qa/uk-coverage.md` and `.json` | Content stages per lesson and the matrix, regenerated by `npm run curriculum` |
| Batch reports | `docs/qa/batches/*.json` | Every enhancement or generation batch: lessons changed, errors fixed (with the correct value), suspected errors, gaps, sources needed |
| Dashboard | the "Gradify UK Coverage" artifact; data from `scripts/curriculum-dashboard-data.mjs` | One view of every nation, level, subject group, qualification, gap, course and specification |

**Content stages, and what each claims.** *Source verified*: a specification was extracted from the published
document (fingerprint recorded). *Generated* / *enhanced*: written or improved in a recorded batch. *Automatically
validated*: passes content standard 2 now, recomputed on every run; a structural check, not proof of accuracy.
*Human reviewed*: the school's structured review is recorded in `qa.js`. *Approved for publication*: the named expert
has signed it off. Nothing is shown as verified coverage until a person has checked the specification and confirmed
its mappings, and the matrix enforces that.

**How batches run.** Parallel workers, each owning named files, follow the shared brief in `docs/qa/BATCH_BRIEF.md`
(common rules, the standard-2 upgrade, course-specific rules, the batch report format), kept in the repository so a
new session can pick it up. They never commit; the coordinator validates
(`node scripts/new-course.mjs check`, the course tests, `npm run curriculum`), commits only what passes, and
regenerates the reports. Pre-existing test failures (14 database tests needing a local Postgres) are reported
separately from anything new.

**Network.** Official specification hosts (exam boards, GOV.UK, SQA, CCEA, WJEC, Hwb, Education Scotland, QAA,
OpenStax) are allowed in the "Gradify (curriculum sources)" cloud environment, created for this work.
