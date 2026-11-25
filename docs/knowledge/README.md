# The knowledge engine: from sources to qualification-specific lessons

Gradify understands a subject once, as a structured knowledge base, and assembles each lesson from it for one curriculum requirement at one level. The knowledge base is the source of truth; lessons are outputs. Every lesson records exactly which knowledge (and which level's form of it) it was built from, so a correction finds every lesson to revise, and a new specification version finds every statement that changed.

Status (2026-11-25): a validation batch of six AQA GCSE Biology statements of five different kinds, plus three university lessons reusing the same knowledge, built end to end and waiting for expert review. Nothing is reviewed, approved or published. Reports: [`PRODUCTION-AQA-GCSE-BIOLOGY.md`](PRODUCTION-AQA-GCSE-BIOLOGY.md) (coverage and production), [`REUSE.md`](REUSE.md) (what the levels share).

## The layers

| Layer | What | Where |
|---|---|---|
| Sources | Where knowledge comes from, pinned to a version, with its licence category and permitted uses | `data/knowledge/registry.json` → `data/knowledge/sources/<id>.json` (raw text local only) |
| Knowledge | Canonical items with stable ids and versions, each valid over a range of levels, with level-specific forms, linked to the passages that support them | `data/knowledge/<subject>/<topic>.json`, `evidence.json`, `retired.json` |
| Curriculum | Requirements: specification statements (`kit/curriculum/`) or a Gradify course lesson's objectives | read in place, never copied |
| Templates | How a lesson is built at each level, and for a required practical: components, depth, question kinds, visual rule, readability | `kit/knowledge/templates.js` |
| Assembly | Requirement + knowledge (in its level's form) + template → a lesson in the website's notes format, laid out in the template's component order | `scripts/knowledge/assemble.mjs`, `kit/knowledge/questions.js` |
| Visuals | Diagrams generated from an item's visual brief in its level's form (osmosis particles, magnification, a bacterial cell, lock and key, data graphs), or chosen from the diagram library if they fit the topic and level; every one checked by the Visual Learning Engine | `kit/diagrams/` (`osmosisbox`, `magnification` in `bio-renderers-2.js`) |
| QA and review | Automated checks in nine dimensions, the lifecycle, named-reviewer decisions, the publishing gate, impact analysis | `scripts/knowledge/qa.mjs`, `kit/knowledge/schema.js` |
| Reporting | Coverage and production for a specification; reuse across levels | `scripts/knowledge/report.mjs` |

## Running it

```bash
NODE_USE_ENV_PROXY=1 node scripts/knowledge/pipeline.mjs ingest   # fetch the sources (cloud sessions need the proxy flag)
node scripts/knowledge/pipeline.mjs evidence                       # link every item to its supporting passages
node scripts/knowledge/pipeline.mjs check                          # sources and knowledge against the schema
node scripts/knowledge/pipeline.mjs batch                          # build every lesson in scripts/knowledge/batch.json
node scripts/knowledge/pipeline.mjs build aqa-gcse-biology:4.1.3.2.RP3   # one lesson (AQA text must be imported locally)
node scripts/knowledge/pipeline.mjs report aqa-gcse-biology        # docs/knowledge/PRODUCTION-AQA-GCSE-BIOLOGY.md
node scripts/knowledge/pipeline.mjs reuse                          # docs/knowledge/REUSE.md
node scripts/knowledge/pipeline.mjs gate <lessonId>                # every reason a lesson can't be published yet
node scripts/knowledge/pipeline.mjs review <lessonId> --approve --by "Name"      # or --changes "what to fix" --by "Name"
node scripts/knowledge/pipeline.mjs confirm-licence <sourceId> --by "Name"       # a person confirms a source's licence
node scripts/knowledge/pipeline.mjs impact                         # lessons to revise after a change
```

Each lesson is written to `data/knowledge/lessons/<id>/`: `lesson.json` (links, QA record, history), `notes.txt` (the website's notes format), `assets/` (generated diagram specs and SVGs) and `preview.html` (rendered by the site's own `lessonHtml`, with the QA table).

## Level-specific knowledge

An item is one canonical concept with a stable id and version. Its fields are its default form; `forms` override any of them for a range of levels (`kit/knowledge/forms.js`): the explanation, the steps of a mechanism, the cases of an application, the key terms, the examples, the summary, the misconception's wording, the visual brief (a form can also remove it), the practical or the data.

```
bio.osmosis.definition  v2   levels ks3–pg
  default form (ks3–gcse)    "the net movement of water molecules … from a dilute solution into a more concentrated one"
  form alevel–pg             "… from a region of higher (less negative) water potential to … lower …"
```

`resolve(item, level)` gives the item as a lesson at that level sees it. A lesson records the fingerprint of the form it used (`formHash`), so editing the university wording flags university lessons and leaves GCSE ones alone. Ids are never reused: when two items were merged into `bio.osmosis.definition`, the old ids went to `retired.json`, and impact analysis reports lessons built on them as "replaced by". Misconceptions specific to a level are items with that level range (or forms). Prerequisites are shared.

## The validation batch

| Kind | Requirement | What it showed | QA |
|---|---|---|---|
| Baseline | AQA 4.1.3.2.a osmosis | concept, mechanism with a generated particle diagram, applications, misconceptions | pass, 3 flags |
| Factual | AQA 4.1.1.1.b prokaryotic cells | facts and definitions; a generated bacterial cell in GCSE words ("single loop of DNA", not "nucleoid") | pass, 3 flags |
| Mechanism | AQA 4.2.2.1.e enzymes and the active site | the lock and key model step by step, a generated diagram, the steps assessed in order | pass, 2 flags |
| Calculation | AQA 4.1.1.5.c magnification | formula, unit conversion, rearranging, standard form; a generated diagram whose checks recompute the magnification; three numerical questions with recomputed answers | pass, 2 flags |
| Required practical | AQA 4.1.3.2.RP3 osmosis in plant tissue | the practical template: aim, equipment, variables, a seven-step method, safety, results table, analysis with a calculation and a graph of illustrative results, evaluation; questions on variables, method order and control variables | pass, 4 flags |
| Data interpretation | AQA 4.2.2.6.h scatter diagrams and correlation | two illustrative datasets (labelled as such), graphs with least-squares lines, questions on the correlation, on causation, and a reading from the line | pass, 2 flags |
| Reuse | Gradify u02-21, u02-02, u03-24 (university) | the same items in their university forms; library diagrams chosen where they fit | pass, 2–3 flags each |

Building the batch found real faults, which were fixed in the knowledge and the engine rather than in the output:

- **Data:** the stated zero crossing of the practical's line of best fit was wrong (0.33; recomputed 0.375). The data checks caught it.
- **Coverage gaps:** the practical never mentioned the salt solutions the statement names; the calculation lesson never said "express" or "formula"; "cell wall" was used without being defined.
- **Engine faults:** a practical-only misconception leaked into a content lesson; a university lesson demoted its main definition to "prior knowledge"; the library filter rejected the right diagrams on a stemming mismatch.
- **Diagram faults:** a label ran off the edge of a diagram, and a scatter plot's axis ran to −2 hours of exercise. QA now checks that every label is inside the picture.

## QA dimensions

| Dimension | Automated checks (fail) | Left to the reviewer (flag) |
|---|---|---|
| Accuracy | items unchanged at this level; evidence linked to each item's current version; worked examples, question answers and data claims recomputed; diagram checks pass (a renderer with no checks fails) | every draft item; items whose sources hold under 30% of their distinctive vocabulary |
| Coverage | every content word of the requirement taught; the requirement unchanged; a practical lesson has a 5+ step method, IV, DV and 3+ controls, safety, a results table, analysis with a calculation and a graph, evaluation, and questions on variables and method; a data lesson has a graph and questions that need the data; a calculation lesson has 2+ computed questions | the specification's limits on the statement |
| Depth | every item valid at the level; no term taught only higher (including a higher level's form) in the prose; the right template | |
| Terminology | every key term used is defined (or a prerequisite); the requirement's own terms are defined | |
| Explanation | the template's required components are present; every section has content | readability outside the template's range; sentences over 30 words |
| Visuals | a diagram when required; caption, alt text, description; labels in the lesson's words; every label inside the picture at both widths; library diagrams fit the level | |
| Assessment | enough questions; all parsed by the course engine; unique permanent ids; every objective tested; distinct options | question variety |
| Accessibility | SVG role and aria-label; text labels, not colour alone; headings | |
| Sources | provenance for every source; licence category known; adaptation only from sources that allow commercial adaptation; illustrative data labelled as illustrative in the lesson and the caption; nothing copied (12+ words in a row) from a source the lesson may not adapt; attribution; a complete lesson record | 8–11 words in a row shared with such a source |

Passing automated QA means a lesson is ready for a person to review. It doesn't mean the content is correct: only a specialist's review establishes that.

## Licensing: categories, permitted uses and the publishing gate

| Category | Licences | Adapt | Commercial use | Verify facts against it |
|---|---|---|---|---|
| public-domain | PD, CC0 | yes | yes | yes |
| commercial-adapt | CC BY, OGL; Gradify's own courses | yes | yes | yes |
| noncommercial-only | CC BY-NC, CC BY-NC-SA | no (for Gradify) | no | yes |
| verify-only | CC BY-ND, CC BY-SA, all rights reserved | no | no | yes |
| unknown | anything not established | no | no | no |

Every knowledge item records its origin: Gradify's own writing (`original`, the default) or `adapted` from a named source and passages. The schema refuses an adaptation from a source that doesn't permit commercial adaptation.

The **publishing gate** (`publishGate` in `schema.js`, `pipeline.mjs gate`) is a hard rule, not a warning. A lesson may be published only if:

1. A named reviewer approved it, after automated QA passed.
2. Every knowledge item in it has been reviewed by a specialist and has an evidence trail.
3. No item is adapted from a source Gradify may not adapt commercially.
4. Every source it rests on has a known licence category that a person has confirmed (`confirm-licence`; Gradify's own courses excepted). A re-ingest keeps the confirmation only if neither the file nor the licence changed.
5. Attribution is given wherever required.

Similarity checks are not consulted by the gate. They can suggest copying, but they can never establish permission. Today all 9 lessons fail the gate (nothing is reviewed or approved, and no OpenStax licence is confirmed), as they should.

The four OpenStax books used (Biology 2e §4.1, 4.2, 5.2 and 6.5) are CC BY-NC-SA 4.0 at the pinned commit: noncommercial-only, so used to check facts, never adapted. Every knowledge item is Gradify's own writing. Commercially reusable sources (CC BY, CC0, OGL) are still to find.

## What it would take to cover the whole of AQA GCSE Biology

Measured today (`PRODUCTION-AQA-GCSE-BIOLOGY.md`):

- 475 statements in 97 sections.
- 64 knowledge items give 62 statements relevant knowledge and 14 complete knowledge (a word-coverage measure).
- 65 sections have no adequate knowledge.

Estimates, from this batch, for the whole specification:

- **Knowledge:** about 900–1,100 items. The batch took 64 items for 14 complete statements, with heavy sharing within a section: 8–12 items per section across 97 sections. Writing them is the largest piece of work. The engine makes it repeatable, but someone still has to write each item and a specialist has to review it.
- **Review:** every item, once, by a biology specialist, plus a review of each lesson (shorter, because its items are already reviewed). At a guess, 5–10 minutes per item and 10–15 per lesson, which comes to roughly 150–250 hours of specialist time. This is the real constraint.
- **Engine work still needed:**
  1. A "missing knowledge" worklist per section (the report already lists the gaps).
  2. AI drafting of knowledge items for review, through the website's Edge Functions. It would propose and never publish, with every claim linked to evidence.
  3. More renderers, for at least 20–30 more kinds of diagram (heart, eye, nephron, cycles, food webs, Punnett squares; some already exist in the library).
  4. Practical templates for the other 9 required practicals: the format exists, and each needs its own practical item.
  5. A publishing step that places approved lessons into a course.
- **Sources:** confirm the licences of the sources used, and find reusable ones.
- **Combined Science (Trilogy):** most of it should reuse the Biology items directly. Its statements are largely the same content without the "biology only" parts.

## Not built yet

- **Any review.** All 64 items are drafts, and the lessons are in `expert-review`.
- **Publishing.** Nothing places an approved lesson's `notes.txt` into a course, or its diagrams into `kit/diagrams/specs`.
- **AI drafting** of knowledge items.
- **Requirements with several independently assessable parts.** These are lessons with subsections. Today one statement makes one lesson, and the practical and data lessons gather their related items.
- **International curricula.**
