# Past Papers

Exam-style practice by specification point, in each course that has a question bank: a **Past papers** tab (`#/papers`).
This is batch 3 of [the learning environment roadmap](LEARNING-ENVIRONMENT-ROADMAP.md) (§4), and version 1 covers
**AQA GCSE Biology (8461), topic 4.1 Cell biology**: 12 questions, 63 marks, one or more on each of the topic's 12
specification points.

## Gradify's own questions

Every question is written by Gradify in the style of the board's papers. No question, mark scheme or examiner report is
copied from a real paper, and the validator refuses any question whose `source` isn't `"gradify"`. The page says so,
and links to the board's own past papers and mark schemes (`spec.papersUrl`) instead of hosting them. Licensed official
papers can be added later behind the same interface; that waits for a licence (roadmap §8).

The AQA link in the bank (`papersUrlChecked: false`) couldn't be opened from the build environment: check it once in a
browser before release.

## What a learner can do

| Address | Page |
|---|---|
| `#/papers` | The bank: topics, groups and questions by specification point, with the learner's best score on each |
| `#/papers/q/<id>` | **Interactive model answer** (experience A). Answer each part, mark it, and see the mark scheme: model answer, how the marks are earned, why each wrong option is wrong, common mistakes, and *Revise this concept* links to the lessons. *Just show the mark scheme* reveals it without marking anything |
| `#/papers/practice/<topic>` | **Mini practice** (experience B): five questions, marked together at the end, with the total and the lessons behind the marks lost. `/weak` puts questions on the points the learner has lost marks on first |

## Marking

| Input | Marked by | Status |
|---|---|---|
| `choice` | Automatically: one right option | Final |
| `short` | Automatically: the answer or an accepted alternative, as words in the answer; a rejected phrase (e.g. "anaerobic") is never accepted | Final |
| `number` | Automatically: within the tolerance, every mark. A wrong answer can earn the method marks the learner ticks, never full marks | Final, or self-assessed when method marks are ticked |
| `extended` | The learner ticks each mark-scheme point their answer made, up to the part's marks | Self-assessed, provisional |

Self-assessed marks are labelled on the page and recorded with `marking.status: "provisional"`, like the course's
existing short-answer questions. AI marking of extended answers against the mark points is version 2 (roadmap §4.3, B),
on the Ultra allowance.

## Evidence

Each marked part is one attempt record (`kit/assess/attempts.js`): context `papers`, the question id as `contextId`,
question key `papers:<question>.<part>`, on the first lesson mapped to the part's specification points. Progress, the
Mastery Engine and, once it is merged, Specification Mastery read it like any other answer. Nothing new is stored and
nothing needs a migration.

## Files

| File | Role |
|---|---|
| `kit/papers/format.js` | The bank format, `checkBank` (the validator), `markPart` / `markQuestion`, `practiceSet` |
| `kit/papers/index.js` | Which course has a bank; banks load only when a learner opens Past papers |
| `kit/papers/banks/aqa-gcse-biology-8461.js` | The questions, the specification points used and their lessons (the same mapping as Specification Mastery's) |
| `kit/papers/view.js`, `kit/styles/papers.css` | The pages |
| `tests/papers.test.mjs` | The bank against the real syllabus, marking, the validator's checks, practice selection; the lesson mapping against Specification Mastery's when that file is present |
| `scripts/check-papers.cjs` | Browser check: `node scripts/check-papers.cjs --serve .` |

## Adding questions

Add questions to a bank (or a new bank in `kit/papers/banks/` and one line in `kit/papers/index.js`), then run
`node --test tests/papers.test.mjs`. The validator checks that each question uses the bank's specification points and
real lessons, that the parts' marks add up, that every part has a model answer, how its marks are earned and at least one
common mistake, that a calculation worth n marks has at least n − 1 method marks, and that no rejected phrase is part of
an accepted answer.
