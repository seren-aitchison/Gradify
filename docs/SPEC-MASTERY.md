# Specification Mastery

Specification Mastery shows a learner how well their own answers show they can do each point of the specification they're sitting. Each point links to its evidence and to what to practise next. It's a tab on any course that has a mapped specification (`#/spec`). One page per point lives at `#/spec/<point>` (for example `#/spec/4.1.3.1`), and there's a summary on Progress.

The first mapped specification is **AQA GCSE Biology (8461)**, mapped onto SciGradify Biology.

## Three measures, kept apart

| Measure | Question it answers | Comes from |
|---|---|---|
| **Coverage** | Does Gradify teach this point (fully, in part, not yet)? How many of those lessons has the learner completed? | The mapping, `cfg.written` and the lessons the learner has completed |
| **Demonstrated mastery** | How well do the learner's own answers show they can do it? | Attempt records, through the Mastery Engine's `sixProfile` (Bayesian Knowledge Tracing once two kinds of evidence are measured) |
| **Confidence** | How much evidence is that estimate built on? | Number of answers, distinct questions, kinds of evidence, days, and how recent the latest answer is |

Some rules hold throughout:

- **Completing a lesson never raises mastery.** A learner who finished every lesson and answered nothing is "Not yet assessed".
- **No evidence is "Not yet assessed", never 0%.** Unassessed points are left out of the headline and topic figures; they aren't averaged in as zero.
- **Thin evidence is shown as an early estimate** (`~51%`, hatched tile) until the Mastery Engine reports a measurement.
- **Confidence levels.**
  - *Low:* any evidence at all.
  - *Medium:* at least 6 answers, 3 different questions and 2 measured kinds of evidence.
  - *High:* at least 15 answers, 6 questions, 3 kinds and 2 different days.
  - Easy questions alone can't reach High.
  - Evidence older than 45 days drops the level by one step.
- **The headline and topic figures** average the assessed points, weighted by confidence (low 1, medium 2, high 3).

## Mastery levels

| Estimate (rounded %) | Level |
|---|---|
| 0–19 | Emerging |
| 20–39 | Building |
| 40–59 | Developing |
| 60–79 | Secure |
| 80–100 | Strong |
| no answers | Not yet assessed |

## What a point page shows

- The requirement and the specification it comes from.
- The estimate, its level, the confidence, and what the confidence rests on.
- One plain next step. For example: "You're confident on Diffusion, but your answers on Active transport are inconsistent."
- What the learner can already show, and where they're struggling. Each lesson's answers are read as one of: strong, inconsistent, weak, thin or unanswered.
- Weekly performance for the last 8 weeks, and whether it's improving, steady or slipping.
- The six kinds of evidence.
- Every mapped lesson, with its check-question and flashcard counts.

**Practise the weakest area** opens a 5-minute target test (`#/target/…`) on the point's shakiest lessons. It focuses on application when application is the weakest kind of evidence.

## Files

| File | What it does |
|---|---|
| `kit/specs/<id>.js` | One specification: topics, groups and points. Each point lists the `lessons` that teach all of it and the `partial` lessons that teach part of it. Flags: `ht` (Higher tier only) and `sep` (separate science only) |
| `kit/specs/index.js` | The registry: `specsFor(slug)`, `pointsOf`, `checkSpec` |
| `kit/learning/spec-mastery.js` | The model: `specMastery`, `bandOf`, `confidenceOf`, `weakestPoints`. Pure functions, with no new storage |
| `kit/course/spec-view.js` | The page, point and Progress-summary HTML |
| `tests/spec-mastery.test.mjs` | Every mapping names real lessons, plus the rules above |

## Adding a specification

1. Write `kit/specs/<board>-<qualification>-<subject>-<code>.js` in the same format, and map each point to lessons.
2. Add it to `SPECS` in `kit/specs/index.js`. `npm test` checks that every lesson exists.
3. Add the file to `SHELL` in `sw.js`.

The course needs no code change. When a course has more than one specification, the page shows a picker, and the learner's choice and tier are remembered per course (`gradify.spec.<slug>`).

## Honesty about the wording

The point text is **Gradify's own summary** of each requirement, so the spec has `wording: "paraphrased"`. The page says so and links to the board's specification. Set `wording: "verbatim"` only after someone has checked every point against the current published specification and recorded it in `verified: { date, by, version }`. `checkSpec` refuses verbatim wording without that record.

## Known gaps in the AQA Biology mapping

These are reported in the product as "Not on Gradify yet" or "Partly taught on Gradify":

- **No lesson yet:** 4.5.2.3 The eye.
- **Only partly covered:**
  - 4.2.2.5 Health issues
  - 4.3.1.4 Fungal diseases
  - 4.3.1.9 Drug development
  - 4.3.3 Plant disease
  - 4.4.2.2 Response to exercise
  - 4.6.1.1 Sexual and asexual reproduction
  - 4.6.1.3 Advantages and disadvantages of sexual and asexual reproduction
  - 4.6.2.3 Selective breeding
  - 4.6.2.5 Cloning
  - 4.6.3.6 Extinction
  - 4.7.3.3 Land use
  - 4.7.3.4 Deforestation
  - 4.7.5.1 Food security
  - 4.7.5.2 Farming techniques
  - 4.7.5.4 The role of biotechnology

## Not built yet

- **App flashcard decks** from uploaded notes aren't linked to specification points: their cards have no lesson id. Course flashcards already count.
- **Specification Mastery doesn't steer the rest of Gradify yet.** It should eventually drive Today, flashcard priority, generated revision sessions and LifeOS's "do next" list. `weakestPoints(model)` is the hook for that.
- **The learner's specification is chosen on the course page**, not stored in their profile. Moving it into the profile would let every site use it.
- **More specifications:** Combined Science Trilogy, Edexcel and OCR Biology, and other subjects.
