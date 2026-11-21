# Gradify Intelligence benchmarks

How Gradify measures its learning engines before anyone changes them. A new algorithm only goes in if it beats what's already there on these numbers. Written 17 November 2026.

```bash
npm run bench
```

That runs five benchmarks in about 2 seconds, for free, with no network. The results go to `tests/reports/bench-*.json`. `tests/bench.test.mjs` (part of `npm test`) checks that the results still match the recorded baseline in `tests/fixtures/bench/baseline.json`.

**If you change an engine and a number moves**, run `npm run bench -- --write-baseline` and commit the new baseline in the same pull request. The diff then shows the before and after, and the PR has to explain why the movement is an improvement.

| Option | What it adds |
|---|---|
| `--reviews FILE` | Recall prediction on a real, anonymised flashcard review export (see below) |
| `--attempts FILE` | Mastery prediction on a real, anonymised course-answer export |
| `--claude` | The independent AI card reviewer on the labelled cards, alone and combined with the code checks. Needs `ANTHROPIC_API_KEY` and costs a few pence. |
| `--write-baseline` | Records the synthetic results as the new baseline |

## The metrics

Every model turns a learner's history into a probability that their next answer is right. These are standard measures for that, the same ones used by the open-spaced-repetition SRS benchmark and in knowledge-tracing papers (`scripts/bench/metrics.mjs`).

| Metric | What it says | Better |
|---|---|---|
| **Log loss** | How surprised the model was by what actually happened. 0.693 is a coin toss. | Lower |
| **Brier** | Mean squared error of the probabilities. 0.25 is always saying 50%. | Lower |
| **AUC** | How well it ranks: the chance a right answer got a higher probability than a wrong one. 0.5 is chance. | Higher |
| **ECE** | Expected calibration error. Of the times it said 80%, was it right about 80% of the time? | Lower |
| **RMSE (bins)** | The root-mean-square version of ECE. The SRS benchmark's headline calibration figure. | Lower |

A model can rank well (good AUC) and still be badly calibrated (poor ECE). Gradify shows learners percentages ("you'd remember about 72%"), so calibration matters as much as ranking.

## The five benchmarks

### 1. Flashcard recall prediction (`scripts/bench/recall.mjs`)

**Question:** before each review, how likely is the learner to remember the card?

Review logs are replayed in time order. Each model predicts using only what came before, and first sightings are skipped. This is the SRS benchmark's protocol.

| Model | What it is |
|---|---|
| `fsrs5` | Gradify's scheduler: `schedule()` and `recallNow()` in `kit/learning/srs.js` |
| `mastery-card` | The per-card recall the Mastery Engine uses (`recallProbability` in `kit/learning/mastery.js`) |
| `learner-mean` | Baseline: the learner's own share of remembered reviews so far |
| `oracle` | Synthetic data only: the simulator's true probability, the ceiling for every model |

### 2. Mastery as prediction (`scripts/bench/mastery.mjs`)

**Question:** given a learner's earlier answers on a lesson, will they get the next question on it right?

A mastery estimate that means anything should predict this. Learners are split 70/30. BKT is fitted on the 70% and every model is scored on the other 30%, so nothing is scored on data it was fitted to.

| Model | What it is |
|---|---|
| `gradify-dimension` | The six-dimension profile's value for the dimension the question tests (`evidenceFromAttempts` → `sixProfile`) |
| `gradify-mastery` | What the app predicts for the next answer: the profile's BKT model with the app's fitted parameters (`kit/learning/bkt.js`, `bkt-params.js`, fitted by `scripts/fit-bkt.mjs` on a different seed from the one scored) |
| `gradify-blend` | The old overall mastery, a weighted average of the dimensions, kept for comparison |
| `running-accuracy` | Baseline: share right so far, smoothed |
| `bkt`, `bkt-forget` | Bayesian Knowledge Tracing, written from the published equations (`scripts/bench/bkt.mjs`) and fitted by grid search. Benchmark only, not in the product. |

### 3. Readiness on exam day (`scripts/bench/mastery.mjs`, `readinessBenchmark`)

**Question:** for each course objective, how likely is a right answer on exam day, 14 days after study stops? And does Gradify's "80% range" contain the truth about 80% of the time?

It compares `objectiveReadiness` (`kit/intel/readiness.js`) with a plain Beta estimate that ignores forgetting.

### 4. Card quality (`scripts/bench/cards.mjs`, `tests/fixtures/bench/cards.json`)

**Question:** does a flawed card get caught before a learner sees it, and do good cards get through?

There are 54 cards across chemistry, biology, medicine, mathematics, physics, computer science, law, psychology and history:

- 28 good
- 26 with one known defect each: wrong answer, ungrounded quote, answer leak, vague, yes/no, duplicate, two questions in one, ambiguous, trivial, or claims the notes don't make

Every card goes through the same code path as AI cards (`cardsFromPack`). A card is **blocked** if it's removed or marked "not in your notes", and **flagged** if it's shown with any warning.

### 5. Smart Plan feasibility (`scripts/bench/plan.mjs`)

**Question:** is every plan possible, and does it use the time well?

400 random days of availability windows, existing calendar events, ranked items and budgets go through `planDay`. Hard constraints are checked:

- inside the windows
- no clash with the calendar
- no self-overlap
- within the budget
- no long stretch without a break

Any violation fails `npm test`. The benchmark also reports time used, top-three items placed, priority inversions and items squeezed below half their time.

## Phase 1 results (20 November 2026, `feat/intelligence-phase1`)

The four engine fixes from AUDIT.md §5 (items 1, 2, 4 and 7), each measured against the baseline below. The new
numbers are the recorded baseline now (`tests/fixtures/bench/baseline.json`).

| What changed | Measure | Before | After |
|---|---|---|---|
| Card checks: notation answers aren't "empty"; "plus or minus" isn't a list; one-character answers are flagged | good cards wrongly blocked / flagged / rewritten | 7.1% / 7.1% / 3.6% | 0% / 0% / 0% |
| | flawed cards flagged (now for the right reasons) | 57.7% | 57.7% |
| One recall function (`recallProbability` is the scheduler's `recallNow`) | `mastery-card` log loss | 0.539 | 0.475 |
| Mastery is P(known) from fitted BKT | `gradify-mastery` log loss / AUC / ECE | 0.690 / 0.575 / 0.076 | 0.656 / 0.642 / 0.029 |
| Readiness from FSRS memory, fading to the fitted guessing rate | log loss / bias / 80% range holds / width | 0.719 / −0.119 / 85.6% / 0.487 | 0.667 / −0.012 / 80.2% / 0.407 |

What these can't say: all of them are on synthetic learners. The BKT parameters were fitted on the simulator too
(provisional). Fit them on real, anonymised answers with `node scripts/fit-bkt.mjs --attempts attempts.jsonl` (the
export below), which also fits each subject with enough answers, then re-run `npm run bench -- --attempts …`.

## Baseline (17 November 2026, commit on `feat/intelligence-bench`)

### Recall prediction, synthetic (6,951 reviews, 85% remembered)

| Model | Log loss | Brier | AUC | ECE | RMSE (bins) |
|---|---|---|---|---|---|
| fsrs5 | 0.475 | 0.152 | 0.551 | 0.068 | 0.169 |
| mastery-card | 0.539 | 0.182 | 0.546 | 0.119 | 0.238 |
| learner-mean | 0.421 | 0.126 | 0.557 | 0.021 | 0.034 |
| *oracle (ceiling)* | *0.377* | *0.114* | *0.718* | *0.004* | *0.013* |

### Mastery as prediction, synthetic (2,673 answers from 18 held-out learners)

| Model | Log loss | Brier | AUC | ECE |
|---|---|---|---|---|
| gradify-dimension | 0.724 | 0.253 | 0.637 | 0.132 |
| gradify-mastery | 0.690 | 0.247 | 0.575 | 0.076 |
| running-accuracy | 0.680 | 0.242 | 0.625 | 0.070 |
| bkt (fitted) | **0.646** | **0.227** | **0.661** | **0.010** |
| *oracle (ceiling)* | *0.555* | *0.187* | *0.785* | *0.022* |

### Readiness, synthetic (852 objectives, 14 days ahead)

| Model | Mean abs. error | Bias | 80% range holds truth | Range width |
|---|---|---|---|---|
| gradify | 0.164 | −0.119 | 85.6% | 0.49 |
| beta-no-forgetting | 0.133 | −0.006 | 77.6% | 0.40 |

### Card quality, code checks (54 cards)

| | Flagged | Blocked |
|---|---|---|
| Flawed cards caught | 57.7% | 23.1% |
| Good cards caught wrongly | 7.1% | 7.1% |

A further 3.6% of good cards are rewritten by the code into worse cards. By defect:

| Defect | Caught (flagged) |
|---|---|
| Ungrounded | 4/4 |
| Vague | 2/2 |
| Wrong answer | 2/7 |
| Two questions in one | 0/1 |

Every miss is listed by `npm run bench`.

### Smart Plan (400 days)

- 0 hard-constraint violations
- 97.2% of the possible time used
- top three items placed 73.6% of the time
- 0 priority inversions

The last two are measured only on days with no energy preference (`energy: "none"`, about a third of the 400). A morning or evening preference deliberately reorders items, so ranking can't be judged there.
- 10.6% of placed items cut to under half their time

The rankings above held on three further seeds (11, 12, 13). In every run:

- learner-mean beat fsrs5, and fsrs5 beat mastery-card
- BKT beat running-accuracy, which beat both Gradify mastery figures
- Gradify readiness was biased low by 8 to 14 points

## What these numbers can and can't tell you

**Synthetic learners are a test rig, not evidence about students.** `scripts/bench/simulate.mjs` explains the design. To avoid marking Gradify's homework, the simulated memory is deliberately not FSRS and the simulated knowledge is not BKT.

They can show:

- a model that's internally inconsistent (for example, `mastery-card` is worse than the FSRS state it reads)
- a model that ignores evidence a simple baseline uses
- an interval that's mis-sized against a known truth
- a regression

They can't show which model is best for real learners. That depends on how real memory and knowledge behave. In particular:

- **FSRS-5 losing to `learner-mean` here is not a finding about FSRS.** Default-parameter FSRS is miscalibrated for any learner whose forgetting differs from the population it was fitted on. The simulator's forgetting curve is exponential, while FSRS assumes a power curve. On real Anki data the SRS benchmark finds FSRS well ahead of simple baselines, especially once its parameters are fitted per learner. Gradify needs its own real-data run before acting.
- **The readiness bias depends on how the simulator forgets.** It's a prompt to check against real mock-exam results, not a verdict.
- **The labelled cards are small (54) and hand-written.** They catch specific failure modes. They don't estimate the rates you'd see across all real AI output. Add cards as new failure modes are found.

## Running on real data

Real numbers need the owner to export anonymised data from Supabase. The SQL editor runs as the service role, so treat the files as personal data:

- keep them out of the repository
- delete them after the run
- don't send them to any third party

```sql
-- flashcard reviews → reviews.jsonl
select json_build_object('user', md5(user_id::text), 'card', md5(card_id::text), 'reviewed_at', reviewed_at, 'rating', rating, 'mode', mode)
from public.reviews order by reviewed_at;
```

```sql
-- course answers → attempts.jsonl
select json_build_object('user_id', md5(user_id::text), 'id', id, 'created_at', created_at, 'site', site, 'subject', subject, 'context', context,
  'question_id', question_id, 'question_type', question_type, 'difficulty', difficulty, 'objectives', objectives, 'lesson_id', lesson_id,
  'unit_id', unit_id, 'response', json_build_object('evidence', response->>'evidence', 'outcome', response->>'outcome', 'via', response->>'via'), 'score', score, 'correct', correct, 'attempt', attempt, 'confidence', confidence, 'marking_method', marking_method, 'marking_status', marking_status)
from public.assessment_attempts order by created_at;
```

```bash
npm run bench -- --reviews reviews.jsonl --attempts attempts.jsonl
```

Two columns matter for matching the app:

- `mode`: practice reviews are scored but don't reschedule the card, as in the app
- the lab fields from `response` (`evidence`, `outcome`, `via`): exploration challenges, challenges tried and left, and failures other than a wrong answer are left out of the scored answers; assisted successes count as assisted. All as in the app. Only these three fields of `response` are exported, never the learner's own answer text

The mastery benchmark needs at least two learners.

Results are only meaningful with enough data. As a rough guide:

- a few thousand reviews from 20 or more learners for recall
- a few hundred learners with tens of answers each for mastery

Below that, the numbers are noise. Say so rather than act on them.

## Still to add

| Benchmark | Needs |
|---|---|
| Mind-map relationships | The prerequisite links Gradify infers from notes (`kit/intel/graph.js`, `debt.js`), scored against the authored course concept graphs (`kit/courses/*/` `concepts`, `kit/learning/concepts.js`). The course graphs are real gold data that already exists. |
| Adaptive question selection | Item difficulty calibrated from many learners' answers (see the audit, recommendation 7). |
| Readiness against real outcomes | Predicted readiness logged before a mock exam, compared with the mark (`exam_finished` events). |
| AI generation end to end | `npm run eval:claude` already covers key-term coverage and grounding on real notes. Its fixtures need maths, history and computing notes added (`docs/FLASHCARD-ENGINE.md` §5). |
