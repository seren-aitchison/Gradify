# Measuring real learning, with consent

The quality audit (`scripts/quality-audit.mjs`) checks how lessons are *built*. It can't say whether anyone learns
from them (constitution articles 9 and 10). This is how Gradify measures that, without compromising anyone's privacy.

## Consent

- **Off by default.** A learner switches it on in Settings → Your data ("Help Gradify teach better"). Signed-in only.
- **16 or over.** The switch is disabled until the learner confirms they're 16 or over; the database refuses consent
  without it (`research_consent`, check constraint).
- **Withdrawal is instant.** Nothing is copied into a research dataset. Every measure is computed live from the
  learners who are consenting at that moment, so switching off removes them from every number at once.
- **Versioned.** Each choice records the consent wording's version (`CONSENT_VERSION` in `kit/data/outcomes.js`). If
  what's measured changes, the version changes and learners are asked again.

## What's measured

From `assessment_attempts` (answers to Gradify's own questions) and `learning_events` (explanation shown and the next
answer), for consenting learners only:

| Measure | Function | Meaning |
|---|---|---|
| First-try accuracy, per lesson | `learning_outcomes(10)` | Share of learners' first attempts at the lesson's questions that were right |
| Retention, per lesson | `learning_outcomes(10)` | Share right on a later attempt 7 or more days after the first |
| Explanation outcomes, per way | `explanation_outcomes()` | After "Explain it another way", how often the next answer in that lesson was right |
| Enough yet? | `outcomes_summary()` | Whether at least 10 learners consent |

**k-anonymity:** a lesson, or a retention figure, or a way of explaining, is reported only when at least 10 distinct
consenting learners are in it. Fewer, and it's suppressed rather than rounded. The functions return no ids, names or
individual answers, so they are public: anyone can see the same numbers on [quality.html](../quality.html#outcomes).

Tested on real PostgreSQL in `tests/outcomes-db.test.mjs` (no consent, nothing counted; 9 learners, hidden; 10,
shown; withdrawal, gone).

## How it's used

- **Adaptive explanations** (`kit/learning/explain.js`) start new learners from what has helped consenting learners
  (worth at most 10 answers, so a learner's own evidence soon takes over).
- **Lesson improvement**: lessons with low retention or first-try accuracy go to the learning-science agent's queue,
  next to the audit's structural findings. A change to a lesson is judged by whether these numbers improve
  (article 10), not by whether the audit score does.

## What it can't tell you yet

With few consenting learners, nothing is shown. The numbers are observational: learners who choose a lesson aren't a
random sample, so a difference between lessons isn't proof that one teaches better. Controlled comparisons (two
versions of a lesson, randomly assigned) would need a further, separately consented step.
