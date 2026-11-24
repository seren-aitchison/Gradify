# Reviewing a specification map

How a subject specialist turns the matcher's proposals into verified coverage, one statement at a time. AQA GCSE Biology 8461 is the first: 475 statements, all awaiting verification. Background: [`README.md`](README.md). The current state: [`AQA-GCSE-BIOLOGY-8461.md`](AQA-GCSE-BIOLOGY-8461.md).

## Who reviews

Someone who knows the subject at that level: a GCSE biology teacher or examiner for AQA 8461. Each decision carries the reviewer's name and the date; it's what Gradify's claims rest on.

## 1. Get the sheet

```bash
NODE_USE_ENV_PROXY=1 node scripts/curriculum/engine.mjs fetch aqa-gcse-biology   # once per machine: the official PDF, SHA-1 checked
node scripts/curriculum/engine.mjs import aqa-gcse-biology
node scripts/curriculum/engine.mjs review aqa-gcse-biology
```

This writes `data/curriculum/review/aqa-gcse-biology.csv`, a spreadsheet with one row per statement: the statement, AQA's limits on it, its tier and whether it's in GCSE Biology only, the PDF page, and up to three proposed lessons, each with its confidence and the words it matched. It holds AQA's text, so it stays out of the repository (don't commit or publish it). Open it in any spreadsheet app.

## 2. Decide, row by row

For each statement, open the proposed lesson(s) on the site and fill in:

| Column | What to write |
|---|---|
| `decision` | `full`: a lesson teaches all of it, at a depth a GCSE student can use. `partial`: lessons teach some of it. `missing`: no lesson teaches it. Leave blank to skip; it stays awaiting. |
| `lessons` | The lesson ids that teach it, separated by spaces. Blank means "the proposed ones". With several lessons and `full`, mark the one that teaches it fully: `u02-03=full u02-05`. Ignored for `missing`. |
| `note` | Required for `partial` (what isn't taught: "no named examples", "no calculation") and `missing` (what a lesson would need to teach). Optional for `full`. |
| `reviewer`, `reviewed_on` | Your name, and the date as YYYY-MM-DD. |

Things to watch for:

- **Depth and level.** Gradify's Biology course is a first-year university course. A lesson can be on the right topic but skip what AQA asks for: its named examples, its required practical, its calculation. That's `partial`, with a note.
- **AQA's limits** (the `aqa_limits` column, such as "Knowledge of the stages of meiosis is not required"). A lesson that goes further is fine; one that teaches less isn't `full`.
- **Likely gaps** (`matcher_confidence` = `likely gap`): the proposal columns show the nearest lessons, which are usually wrong. Confirm `missing`, or write the lesson that does teach it.
- **Skills statements** ("Students should be able to …") need the lesson to practise the skill (a worked example, practice questions), not only to mention the idea.
- **Required practicals** are `full` only if a lesson or lab walks through that practical.

Work section by section: one lesson often serves several statements in a row, and the report lists "lessons proposed for several statements" so you can review a lesson once against all of them.

## 3. Record the decisions

```bash
node scripts/curriculum/engine.mjs apply aqa-gcse-biology data/curriculum/review/aqa-gcse-biology.csv
node scripts/curriculum/engine.mjs report biology
npm test
```

`apply` checks every decided row (a real statement, real lesson ids, a reviewer and date, a note where needed) and records nothing if any row is wrong, listing the problems. Rows without a decision are untouched, so you can review in batches and apply as you go; `review` again rebuilds the sheet with your earlier decisions filled in. Commit `kit/curriculum/maps/aqa-gcse-biology.json` and the regenerated reports.

## What changes when

- A verified statement shows in the report as covered, partial or missing, with the lessons. Learners' standing (`kit/curriculum/standing.js`) starts using it.
- Missing and partial notes are the content backlog for GCSE Biology.
- Gradify may claim nothing about AQA GCSE Biology until **every** statement is reviewed; then only the measured line ("Covers 312 of 475 specification statements fully and 98 in part"). The tests enforce this.
- If AQA publishes a new version, `fetch` refuses the new file until `uk.js` records it; decisions reviewed against version 1.0 then count as awaiting again.
