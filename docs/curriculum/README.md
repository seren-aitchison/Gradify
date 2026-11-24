# Curriculum intelligence: mapping Gradify to UK specifications

The goal is a promise Gradify can make accurately: **"Know exactly where you stand against your entire exam specification."** That needs three things, kept strictly apart:

1. **The specification**: the awarding body's own statements, transcribed from the official document (`data/curriculum/specs/<spec>.json`). The authority. Never edited to fit Gradify.
2. **Gradify's content**: lessons, objectives, diagrams, worked examples and practice questions (`data/curriculum/inventory/<subject>.json`, built from the courses).
3. **The map between them**: Gradify's own judgement, statement by statement, reviewed by a named person (`kit/curriculum/maps/<spec>.json`).

Biology is the reference implementation. Every other subject uses the same files, code and review.

## The pieces

| Piece | What | Where |
|---|---|---|
| UK registry | Nations, awarding bodies, qualification types (GCSE, Combined Science, AS, A level, National 5, Higher, Advanced Higher) and each specification as its own entry. Nothing is `confirmed` until its code and version are checked against the official document | `kit/curriculum/uk.js` |
| Mapping rules | Statuses, claims, map checks, and where a learner stands. Pure, for the course engine, topic pages, Smart Plan and progress | `kit/curriculum/mapping.js` |
| Engine | Import a specification (official PDF, or a reviewer's CSV), propose lesson links, build the inventory, write the coverage report | `scripts/curriculum/engine.mjs` |
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

1. **Get the official document** from the awarding body's site (the `site` in `uk.js`). Record its version and the URL.
2. **Import its statements:**
   ```bash
   node scripts/curriculum/engine.mjs import aqa-gcse-biology spec.pdf --version "1.1" --source "<official URL>" --checked 2026-12-01
   ```
   A PDF is parsed from its numbered headings: a first draft. Check it against the document. If the layout doesn't parse cleanly, transcribe the statements into a CSV from `docs/curriculum/statements-template.csv` and import that instead.
3. **Confirm the specification** in `uk.js`: set `code`, `version`, `source`, `checkedOn`, `confirmed: true` and `statements: "imported"`.
4. **Propose links:** `node scripts/curriculum/engine.mjs propose aqa-gcse-biology`. The matcher ranks lessons for each statement by their titles, objectives, headings and key terms, with the words that matched. It only proposes, and marks a statement with no match as a likely gap.
5. **Review, statement by statement**, in `kit/curriculum/maps/<spec>.json`: open each proposed lesson, decide `full` or `partial` (with a note of what's missing), remove wrong links, add missed ones, and for a gap write what's missing. Then set `"status": "verified"`, `"reviewer"` and `"reviewedOn"`. Reviewers should know the subject at that level (a subject teacher or examiner).
6. **Report:** `node scripts/curriculum/engine.mjs report biology`. The gaps become the content backlog; the covered statements show which lessons, diagrams and questions serve them.
7. **Claim**, only when the report allows it: add the specification to `kit/curriculum/coverage.js` as `verified`, with the evidence, reviewer and version.

## Licensing

Specifications are the awarding bodies' copyright. The statements are kept in `data/curriculum/specs/`, which is **not published** (`scripts/build-site.mjs` excludes `data/`). The published maps hold references and lesson ids, not specification text. Before showing statement text to learners (for example in the "where you stand" view), check each awarding body's terms for reproducing specification content, or show the reference and topic with a link to the official document.

## Order of work

1. **Biology** (reference implementation): AQA GCSE Biology first (the largest entry), then AQA Combined Science: Trilogy (most GCSE students take combined science), then AQA A level, then Pearson Edexcel and OCR, then WJEC (Wales), SQA (Scotland) and CCEA (Northern Ireland).
2. **Chemistry**, then **Maths** and **Physics**: add their specifications to `uk.js` and run the same workflow. Maths and physics also need practice questions before most lessons can carry a search page (`docs/growth/CONTENT-BACKLOG.md`).
3. **Every other UK subject**, ordered by student demand (Search Console and Keyword Planner), qualification coverage and content readiness.

## Using a map in the product

`whereYouStand(statements, map, mastery)` turns a learner's per-lesson mastery into a standing for every statement of their specification: secure, developing, not started, not taught on Gradify yet, or not mapped yet. It counts only verified links. Planned uses, once a specification is verified:

- **Course and topic pages**: "This unit covers AQA GCSE Biology 4.1.1–4.1.3" (only verified links).
- **Smart Plan**: schedule the statements that are developing or not started before the exam date.
- **Progress**: a specification checklist with the learner's standing on each statement.
