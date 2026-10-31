# Assessment data: questions, versions and attempts

How Gradify identifies questions, records every answer, and keeps historical attempts meaningful when content changes. The code lives in `kit/assess/` (subject-neutral, used by any Gradify site) and `scripts/curriculum-registry.mjs`.

## Layers

| Layer | File | Responsibility |
|---|---|---|
| Data model and text format | `kit/assess/model.js` | Parses `TAG[d][#id][@objectives]: body` into a plain question object; `normalize()` accepts the older `{ right, wrong }` shape |
| Type handlers | `kit/assess/types.js` | One handler per type: `parse`, `render`, `wire` (interaction), `restore`, `mark`, `feedback`, `paint`, `answer`. A new type is one new handler; nothing else changes |
| Rendering and interaction | `kit/assess/questions.js` | Wraps any type in an accessible group, offers an optional confidence rating, wires answers, and reports `{ response, confidence, ms, attempt }` |
| Exams | `kit/assess/exam.js` | Builds and runs timed papers from the same questions; reports every answer for recording |
| Attempt records and analytics | `kit/assess/attempts.js` | `makeAttempt()` (schema 1) and `analyse()` |
| Storage | `kit/data/store.js`, `assessment_attempts` table | On the device always; in the account when signed in |
| Registry | `kit/courses/<slug>/registry.js` (generated) | Permanent question ids, versions, retired ids |

## Question types

| Tag | Type | Body | Marking |
|---|---|---|---|
| `M` | Single best answer (5+ options) or multiple choice | `question \| right \| wrong :: why it's wrong \| wrong \| wrong \| explanation` | Automatic |
| `TF` | True or false | `statement \| true or false \| explanation` | Automatic |
| `MS` | Choose all that apply | `question \| right ; right \| wrong ; wrong \| explanation` | Automatic, partial credit |
| `SEQ` | Ordering | `question \| step ; step ; step \| explanation` (steps in the correct order) | Automatic, partial credit |
| `MATCH` | Matching | `question \| item = match ; item = match \| explanation` | Automatic, partial credit |
| `SA` | Short answer | `question \| model answer \| point ; point ; point` | Self-assessed against marking points: **provisional** |

Each option can carry its own explanation after ` :: `, shown when a learner chooses it ("why this is wrong"). The overall explanation is shown after every attempt.

Difficulty `1–3` is named per course: nursing **Foundation · Application · Clinical reasoning**; law **Foundation · Application · Legal reasoning**; physics keeps Easy · Medium · Hard.

`@1,3` links a question to the lesson's learning objectives (the `O:` lines, numbered from 1). Required in schools written to content standard 2 (`npm run qa` fails otherwise, and fails if an objective number doesn't exist). Nursing School 6 is fully linked; older schools are listed as review items.

## Permanent ids

- **Lessons**: `ids.js` locks every lesson id. Ids are independent of order and position (`position` is separate data), so lessons can be moved, regrouped or inserted. Retired lesson ids are listed in `RETIRED` and never reused: a new lesson takes the next number after every id ever issued.
- **Questions**: `npm run qa` writes an id into the source the first time it sees a question: `M2#nursing-u06-24-q2@3:`. The id contains the course and the lesson it was first written in, so it is unique across Gradify. It never changes, including when the question is edited or moved to another lesson.
- **Deleted questions** are moved to `RETIRED_QUESTIONS` and their ids are reserved forever. A new question in the same lesson takes the next number after every id ever issued there (no reuse). Reusing a retired id is a hard error.
- Physics questions have no ids and keep the older position keys (`lessonId#n`); nothing about physics progress changed.

## Versions

`registry.js` holds a fingerprint (sha256 of the question line, without its id) and a version for each question and lesson. `npm run qa`:

| Change | Result |
|---|---|
| Wording, options, explanation, difficulty or objective links edited | Version + 1 |
| Question moved to another lesson | Same version; `lesson` updated and reported |
| Question deleted | Retired; id reserved |
| New question | New id, version 1 |
| Lesson text edited | Lesson version + 1 |

The test `tests/registry.test.mjs` fails if the notes have changed without the registry being updated, so an edit can't be committed without its version increase. Every attempt stores the question id **and version**, so a historical attempt always refers to the exact question the learner saw; analytics can choose to compare only like with like.

## Attempt records (schema 1)

One record per answer, in every context (lesson check, quiz, problem bank, exam):

```
{ schema: 1, id, at, site, subject, context, contextId,
  question: { id, v, type, d, objectives },
  lesson, module, unit,
  response, score (0–1), correct, attempt (1 = first try here),
  confidence (1 guessing · 2 unsure · 3 sure, optional), ms (time on the question),
  misconception (the wrong option chosen, single choice only),
  marking: { method: auto | self | human | ai-assisted, status: final | provisional } }
```

- Records are **append-only**. A later re-mark (for example by a tutor) is a new record for the same question id and version, with `method: "human"` and `status: "final"`. The table's RLS allows insert, select and delete by the owner, and no update.
- On the device: `S.attempts` in the course's progress (latest 2,000) and the local store (latest 5,000). In the account: `assessment_attempts` (migration `20261101120000_assessment_attempts.sql`), queried across all sites by the same user, which is what lets the central learning intelligence (LifeOS, the AI tutor) see weak areas across subjects.
- Exam summaries in `S.mocks` keep only the score, time and module breakdown; the answers themselves are attempt records.

## Analytics (`analyse(attempts)`)

Returns, weakest first: by lesson, module, school, learning objective, question type, level and subject; improvement (first against latest score on repeated questions); the most common misconceptions (wrong options chosen); and confidence calibration (sure-but-wrong, guessing-but-right). **Provisional marks are excluded** unless asked for.

## Short answers and AI

Short answers are self-assessed against a model answer and marking points, recorded as `method: "self", status: "provisional"`, and are never counted as final marks. When AI-assisted feedback is added (an Edge Function mode, with the rubric from the notes), its output is recorded as `method: "ai-assisted", status: "provisional"`: feedback to help the learner, not an authoritative mark. Only `auto` marks of objective questions and `human` marks are final.

## Accessibility

Every question is a labelled group (`role="group"`, `aria-labelledby` the stem). Options are real buttons with `aria-pressed`; multi-select uses checkboxes; ordering uses Move up/Move down buttons with a live region announcing the new position (no drag needed); matching uses selects; the confidence rating is a radio fieldset. Results are announced through a polite live region. Controls are at least 48 px tall, with visible focus outlines. Checked with keyboard only in the browser (Tab, Enter, Space, arrow keys).

## Backward compatibility (tested)

- `tests/compat.test.mjs`: every physics lesson parses to exactly the same check questions, in the same order, as the parser before this change (compared against the last commit), so saved `lesson#n` keys still match; the old `{ right, wrong }` question shape renders and marks.
- Browser, with saved progress in the format from before the change: physics lesson completion, solved questions and quiz bests are kept; nursing solved marks under the old `lesson#n` keys move to the permanent ids on first load; quizzes, the problem bank and exams work, and exam history keeps its shape.
