# Curriculum intelligence: mapping Gradify to UK specifications

The goal is a promise Gradify can make accurately: **"Know exactly where you stand against your entire exam specification."** That needs three things, kept strictly apart:

1. **The specification**: the awarding body's own statements, extracted from the official document. The authority. Never edited to fit Gradify. Its text stays local (`data/curriculum/specs/<spec>.json`, gitignored); the repository holds its index (`kit/curriculum/specs/<spec>.json`: provenance, AQA's section headings, and each statement's ref, kind, flags, page and a fingerprint of its text). See Licensing.
2. **Gradify's content**: lessons, objectives, diagrams, worked examples and practice questions (`data/curriculum/inventory/<subject>.json`, built from the courses).
3. **The map between them**: Gradify's own judgement, statement by statement, reviewed by a named person (`kit/curriculum/maps/<spec>.json`).

Biology is the reference implementation. Every other subject uses the same files, code and review.

## The pieces

| Piece | What | Where |
|---|---|---|
| UK registry | Nations, awarding bodies, qualification types (GCSE, Combined Science, AS, A level, National 5, Higher, Advanced Higher) and each specification as its own entry. Nothing is `confirmed` until its code and version are checked against the official document | `kit/curriculum/uk.js` |
| Mapping rules | Statuses, claims, map checks, and where a learner stands. Pure, for the course engine, topic pages, Smart Plan and progress | `kit/curriculum/mapping.js` |
| Engine | Fetch and import a specification (official PDF, or a reviewer's CSV), propose lesson links, write review sheets and apply decisions, build the inventory, write the reports | `scripts/curriculum/engine.mjs` |
| AQA extractor | Every assessable statement of an AQA science specification, from the PDF's layout | `scripts/curriculum/aqa.mjs`, `layout.mjs` |
| Standing | A learner's per-lesson mastery (BKT) → their standing on each statement, through verified links only | `kit/curriculum/standing.js` |
| Claims gate | What Gradify may say publicly about a qualification. Unchanged by this work: biology stays "Gradify curriculum" until a specification is verified | `kit/curriculum/coverage.js` |
| Reports | Per subject: the course, every specification, and statement-by-statement coverage | `docs/curriculum/<SUBJECT>-COVERAGE.md` |

## Coverage statuses

| Status | Meaning |
|---|---|
| **Covered** | A reviewer confirmed a lesson teaches the statement fully |
| **Partially covered** | A reviewer confirmed lessons teach part of it; the note says what's missing |
| **Missing** | A reviewer confirmed no lesson teaches it yet: a content gap, listed, never hidden |
| **Awaiting verification** | Not reviewed, or only proposed by the matcher. Proposals are never shown or counted as coverage |

A link reviewed against an older version of a specification goes back to *awaiting*. A specification may be claimed only when **every** statement is reviewed against its current version, and then only with the measured figure ("covers 412 of 455 statements fully and 31 in part"), never "covers the specification". The tests enforce this.

## Mapping a specification (the workflow)

1. **Register the official document** in `uk.js`: the PDF's URL, SHA-1, version and date, checked against the awarding body's specification page (`document`), and set `confirmed: true`. That records which document it is, nothing about coverage.
2. **Fetch and import** (in a cloud session the awarding body's host must be allowed by the environment's network, and Node's `fetch` needs the proxy):
   ```bash
   NODE_USE_ENV_PROXY=1 node scripts/curriculum/engine.mjs fetch aqa-gcse-biology   # downloads, checks the SHA-1
   node scripts/curriculum/engine.mjs import aqa-gcse-biology                        # statements (local) + index (committed)
   ```
   AQA science PDFs are read from their layout (`aqa.mjs`): one statement per content paragraph, with AQA's limits, tiers, "biology only" and skills codes. Other bodies' PDFs fall back to numbered headings (a first draft) or a CSV transcription from `statements-template.csv` (then `--version`, `--source` and `--checked` are required). Check the extraction against the document before reviewing.
3. **Propose links:** `node scripts/curriculum/engine.mjs propose aqa-gcse-biology`. Matcher v2 ranks lessons for each statement and gives each proposal a confidence (strong, moderate, or a likely gap) with the words that matched. Proposals are always "proposed" and "partial"; they never count as coverage.
4. **Review**, statement by statement, from the review sheet: [`REVIEW.md`](REVIEW.md).
5. **Report:** `node scripts/curriculum/engine.mjs report biology` writes `BIOLOGY-COVERAGE.md` and one report per imported specification (`AQA-GCSE-BIOLOGY-8461.md`), with verified coverage and proposals kept apart.
6. **Claim**, only when the report allows it: add the specification to `kit/curriculum/coverage.js` as `verified`, with the evidence, reviewer and version.

## The matcher, checked against real statements

Matcher v2 (`propose` in `engine.mjs`) is BM25 over each lesson's title, objectives, headings and key terms. The statement's own words count in full, its AQA section title at half weight, and a lesson that fits the statement's whole section gets a boost (AQA's sections usually belong to a few lessons). Its confidence comes from how much of the statement's distinctive vocabulary the lesson shares.

Checked informally on two random samples of real AQA 8461 statements (40 and 30) before any review, by reading each statement against its top proposal: the top proposal was plausible for about 28 of 40 and 25 of 30, and all 13 "strong" proposals in the samples were plausible. The misses came from generic words (a deforestation statement matched to a bioinformatics lesson) and from GCSE-specific content Gradify doesn't teach (named diseases such as gonorrhoea, the tobacco mosaic virus, mycoprotein, required practicals). This spot-check is not a review: it shows where to trust the bands and where not to. When reviewed decisions exist, compare them with the `matcherConfidence` kept on each verified link to measure the matcher properly.

## Licensing

Specifications are the awarding bodies' copyright. AQA's says: "All rights reserved. … schools and colleges registered with AQA are permitted to copy material from this specification for their own internal use." **This repository is public**, so specification text is never committed: `data/curriculum/specs/`, `data/curriculum/sources/` (the PDFs) and `data/curriculum/review/` (review sheets) are in `.gitignore`. What is committed is Gradify's own work and references: the index (refs, AQA's section headings, page numbers, flags and a SHA-256 fingerprint of each statement's text), the maps (refs, lesson ids, the matcher's evidence words) and the reports. Anyone can rebuild the text exactly with `fetch` and `import`; a test confirms the rebuilt text matches the fingerprints. Before showing statement text to learners (for example in the "where you stand" view), check each awarding body's terms for reproducing specification content, or show the reference and section title with a link to the official document.

## Order of work

1. **Biology** (reference implementation): AQA GCSE Biology first (the largest entry), then AQA Combined Science: Trilogy (most GCSE students take combined science), then AQA A level, then Pearson Edexcel and OCR, then WJEC (Wales), SQA (Scotland) and CCEA (Northern Ireland).
2. **Chemistry**, then **Maths** and **Physics**: add their specifications to `uk.js` and run the same workflow. Maths and physics also need practice questions before most lessons can carry a search page (`docs/growth/CONTENT-BACKLOG.md`).
3. **Every other UK subject**, ordered by student demand (Search Console and Keyword Planner), qualification coverage and content readiness.

## Using a map in the product

`specStanding(spec, map, attempts)` (`kit/curriculum/standing.js`) takes a learner's course attempts, works out P(known) for each lesson with the course's own Bayesian Knowledge Tracing, and passes it to `whereYouStand(statements, map, mastery)`: a standing for every statement of their specification (secure, developing, not started, not taught on Gradify yet, or not mapped yet). It counts only verified links, and works from the committed index, so it needs no specification text. Planned uses, once a specification is verified:

- **Course and topic pages**: "This unit covers AQA GCSE Biology 4.1.1–4.1.3" (only verified links).
- **Smart Plan**: schedule the statements that are developing or not started before the exam date.
- **Progress**: a specification checklist with the learner's standing on each statement.
