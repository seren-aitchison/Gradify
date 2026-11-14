# FSRS in Gradify

Gradify schedules flashcards with **FSRS-5** (`kit/learning/srs.js`), using the published default parameters.

## Validation

`tests/srs-reference.test.mjs` compares Gradify with the reference implementation, `ts-fsrs` 4.7.1 (FSRS-5, short-term scheduling on, no fuzz; installed as a dev dependency only). Over 1,000 random review histories (about 6,500 reviews) it checks:

- **Stability:** matches to 6 decimal places.
- **Difficulty:** matches to 6 decimal places.
- **Intervals at 90% retention:** match exactly.
- **Retrievability:** matches the reference forgetting curve.

The parameters are asserted equal to the reference's defaults.

Writing this test found and fixed two divergences in the first version:

- Stability now uses the difficulty from *before* the answer.
- A lapse is capped at S / e^(w17·w18).

Elapsed time is whole calendar days (UTC), as in the reference.

## What the card columns mean now

FSRS works without a database change, so three existing columns of `cards` (and of course-progress card state, `S.cards`) carry its state:

| Column | Before (SM-2) | Now (FSRS) |
| --- | --- | --- |
| `interval_days` | Days until the next review | **Stability S**: days until recall falls to 90%. The next review can come sooner (a higher retention target, or an exam), so this is no longer the gap to `due_at`. |
| `ease` | Growth factor, 1.3–3.2 | **10 + difficulty D** (11–20). Values above 10 mark a card as FSRS; anything at or below 3.2 is an old SM-2 card. |
| `updated_at` | Last change of any kind | **The last review.** `schedule()` sets it. Editing a card's text also moves it, which slightly shortens the measured elapsed time: a known, small effect. |
| `due_at` | The next review | The next review, placed where recall falls to the learner's chosen retention (85%, 90% or 95%) and never after their exam. |
| `reps`, `lapses`, `last_rating` | As before | As before. |

## Rules for any code that reads cards

- Read memory through `memoryOf(card)` (S, D, last review), and recall through `recallNow(card)` or `recallProbability(card)`. Don't read `interval_days` or `ease` directly.
- Old SM-2 cards are read as FSRS cards: S comes from their interval, and D is mapped from their ease. They become FSRS cards on their next review. No migration is needed.
- `reviews.interval_days` stores the stability after that answer.
- If dedicated columns (`stability`, `difficulty`, `last_reviewed_at`) are ever added, only `memoryOf` and `schedule` change.
