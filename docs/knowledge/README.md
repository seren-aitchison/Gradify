# The knowledge engine: from sources to qualification-specific lessons

Gradify understands a subject once, as a structured knowledge base, and assembles each lesson from it for one curriculum requirement at one level. The knowledge base is the source of truth; lessons are outputs. A correction to one piece of knowledge finds every lesson built from it; a new version of a specification finds every lesson whose statement changed.

This is the first working version, end to end, for one AQA GCSE Biology statement (4.1.3.2.a, osmosis). The same knowledge then builds a university lesson on osmosis without being duplicated.

## The layers

| Layer | What | Where |
|---|---|---|
| Sources | Where knowledge comes from, pinned to a version, with its licence and what that licence allows | `data/knowledge/registry.json` → `data/knowledge/sources/<id>.json` (raw text local only) |
| Knowledge | Reusable units of subject knowledge, written by Gradify, each valid over a range of levels, linked to the source passages that support it | `data/knowledge/<subject>/<topic>.json`, `evidence.json` |
| Curriculum | Requirements: specification statements (`kit/curriculum/`, see `docs/curriculum/`) or a Gradify course lesson's objectives | read in place, never copied |
| Templates | How a lesson is built at each level, from primary to postgraduate: components, depth, question kinds, visual rule, readability | `kit/knowledge/templates.js` |
| Assembly | Requirement + knowledge + template → a lesson in the website's notes format, with its diagram and questions | `scripts/knowledge/assemble.mjs`, `kit/knowledge/questions.js` |
| Visuals | A diagram generated from a knowledge item's visual brief at the lesson's level, or chosen from the diagram library if it fits the level, rendered and checked by the Visual Learning Engine | `kit/diagrams/` (`osmosisbox` in `bio-renderers-2.js`) |
| QA and review | Automated checks in nine dimensions, the lifecycle, a named reviewer's decision, impact analysis | `scripts/knowledge/qa.mjs`, `kit/knowledge/schema.js` |

Entities are kept separate and linked by stable ids (`kit/knowledge/schema.js`): source, knowledge item, requirement, template, lesson instance, asset, and the review record. A lesson records the id, version and fingerprint of every knowledge item and of its requirement.

## Running it

```bash
NODE_USE_ENV_PROXY=1 node scripts/knowledge/pipeline.mjs ingest   # fetch the sources (cloud sessions need the proxy flag)
node scripts/knowledge/pipeline.mjs evidence                       # link every knowledge item to supporting passages
node scripts/knowledge/pipeline.mjs check                          # sources and knowledge against the schema
node scripts/knowledge/pipeline.mjs build aqa-gcse-biology:4.1.3.2.a   # needs the AQA text imported (docs/curriculum)
node scripts/knowledge/pipeline.mjs build gradify-biology:u02-21
node scripts/knowledge/pipeline.mjs impact                         # lessons to revise after a change
node scripts/knowledge/pipeline.mjs review <lessonId> --approve --by "Name"     # or --changes "what to fix" --by "Name"
```

`build` writes `data/knowledge/lessons/<id>/`: `lesson.json` (the instance, its links, QA record and history), `notes.txt` (the lesson in the website's notes format, ready for a course), `assets/` (generated diagram specs and SVGs) and `preview.html` (the lesson rendered by the site's own `lessonHtml`, with its QA table).

## How a lesson is built

1. **Requirement.** `aqa-gcse-biology:4.1.3.2.a` is read from the local AQA import; its level (GCSE) comes from the qualification, its subject from the registry. The lesson stores only its id and the fingerprint of its text.
2. **Template.** `templateFor(level, subject)` picks `gcse-science`: objectives, prior knowledge, explanation, mechanism, diagram (required), terms, calculations, worked example, practical, mistakes, application, practice (at least 5 questions), summary, connections.
3. **Retrieval** (`retrieve`). Only items valid at GCSE are eligible (so the solutions-based definition of osmosis, not the water potential one). Items matching the statement's words are chosen; explanatory items on its main concept (mechanism, misconceptions, applications) join them; calculations and practicals join only when the statement asks for them, so the lesson stays one statement's lesson (4.1.3.2.b, 4.1.3.2.c and RP3 get their own). Prerequisites the statement names ("dilute solution", "concentrated solution") are taught; others are listed as prior knowledge. Items above the level are recorded as "where this leads".
4. **Assembly.** Items are ordered so every prerequisite comes first, then placed in the template's components. Objectives come from the items' kinds; the summary from their one-line summaries; sources from their provenance, with attribution and how each source was used.
5. **Visuals.** The mechanism item carries a visual brief: particle counts, sizes, the claim (water moves overall from side 0 to side 1), and labels and wording per level range ("dilute solution" to GCSE, "higher water potential" at A level). The renderer's checks recompute the biology from the particles. A library diagram is added only if no generated one shows the concept and it uses no term above the level: `bio-osmosis-cells` is rejected for GCSE (water potential) and chosen for university.
6. **Questions** (`generateQuestions`). From structure, not written per lesson: definitions against the lesson's other definitions and misconceptions; the mechanism's "why"; each application case; misconceptions as true or false; calculations with new numbers and computed answers. Each question has a permanent id and the objectives it tests.
7. **QA** (`qa`), then **lifecycle**: `generated → automated-qa → expert-review → approved → published`. A failed check sends the lesson back to `generated`. A pass moves it to `expert-review` with the reviewer's flags. Only a named reviewer approves; publishing is a separate later step (not built: nothing is published).

## QA dimensions

| Dimension | Automated checks | Left to the reviewer |
|---|---|---|
| Accuracy | items unchanged since assembly; evidence linked to each item's current version; worked examples and question answers recomputed; diagram checks pass; library diagrams not failed | every draft item; items whose sources contain less than 30% of their distinctive vocabulary |
| Coverage | every content word of the requirement is taught; the requirement is the version the lesson was built for | the specification's limits on the statement |
| Depth | every item valid at the level; no term the knowledge base teaches only higher appears in the prose; the template matches | |
| Terminology | every key term used is defined (or a prerequisite); the requirement's own terms are defined | |
| Explanation | required components present; every section has content | readability outside the template's range; sentences over 30 words |
| Visuals | a diagram when required; title, caption, alt text, description; labels in the lesson's words; placed; shows an item in the lesson; library diagrams fit the level | |
| Assessment | enough questions; every one parsed by the course engine; permanent unique ids; every objective tested; distinct options | variety of question kinds |
| Accessibility | SVG role and aria-label at both widths; text labels, not colour alone; headings | |
| Sources | every source has a provenance record; no knowledge item and no lesson (its whole text, against every passage) copies 12+ words in a row from a source it may not reuse; attribution present; the lesson record is complete | 8–11 shared words (the GCSE lesson's longest is 9, a misconception quoting the common wrong phrasing) |

## Licensing, as built

Every source carries its licence and a policy derived from it (`LICENCES` in `schema.js`). Gradify is a paid product, so:

- **reuse**: public domain, CC0, CC BY, OGL, and Gradify's own courses. Text may be adapted, with attribution.
- **verify-only**: anything NonCommercial, ShareAlike or NoDerivatives, all-rights-reserved material, and any unknown licence. Read to check facts (facts belong to no one), never copied or adapted. QA measures the longest run of words each knowledge item shares with these sources.

OpenStax's biology, anatomy and chemistry books are **CC BY-NC-SA 4.0** in their source repositories (checked at the pinned commit), so they are verify-only, not reuse. The osmosis knowledge is therefore Gradify's own writing, checked against OpenStax *Biology 2e* §5.2 and Gradify's own lesson u02-21. The longest run of words any knowledge item shares with OpenStax is 6; the longest in a whole lesson is 9 (flagged to the reviewer). Raw source text stays local (`data/knowledge/raw/`, gitignored); the repository holds provenance and passage fingerprints only. Finding commercially reusable sources (CC BY, CC0, OGL) is part of scaling: they would let the engine adapt text rather than only verify against it.

## What the first version shows, and what it doesn't yet

Shown, and tested (`tests/knowledge.test.mjs`):

- **One knowledge base, two levels.** 14 items build the GCSE lesson and 10 the university lesson. Several are the same item, same version (osmosis is passive; what osmosis does to cells; two misconceptions). Neither lesson contains the other's definition of osmosis.
- **Generation and selection of a diagram, by level.**
- **Rebuilding is deterministic:** reassembling gives byte-identical notes.
- **Impact:** editing one shared item flags both lessons.
- **QA catches faults:** a wrong computed answer, a term above the level, an untested objective and missing attribution each fail a lesson.

Not yet:

- **Nothing is reviewed.** All 24 knowledge items are drafts written in one session and both lessons await expert review. A biology specialist needs to review the items once; every lesson that uses them benefits.
- **Wording per level.** A shared item has one wording. The "cells in solutions" item reads in GCSE terms ("concentration of water") even in the university lesson. Next: optional per-level phrasing on an item, so the university lesson says "higher water potential" without a second item.
- **Scale.** One topic (osmosis, 24 items), two source types, one new renderer. Next, in order:
  1. Cover the rest of AQA 4.1 with knowledge items and run `build` for each statement.
  2. Add a generic "requirement → missing knowledge" report, so authoring effort goes where statements have no items.
  3. Add more source types: OGL government material, CC BY repositories.
  4. Use AI drafting (through the website's Edge Functions, never a key in the repo) to propose knowledge items for review, never to publish.
- **Publishing step.** An approved lesson's `notes.txt` is already in the course format, but placing it in a course (and its diagram in `kit/diagrams/specs`) is not automated yet.
