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

## Where it shows

| Address | Page |
|---|---|
| `#/spec` | Your qualification and its options (a tier, say). Three separate cards: **Mastery** (a percentage with a level and the five-stage bar), **Confidence in this figure** (a three-step meter and what it rests on) and **Coverage** (counts, "x of y"). Then your next steps (the weakest requirements, each with a 5-minute Practise; "Start here" for a new learner), the specification map (one tile per requirement, grouped by topic), and how it's worked out |
| `#/spec/<topic>` | One topic as a list (`#/spec/4.1`): every requirement with its level, figure, confidence and an action (Start, Practise or Keep it fresh). Topic switcher across the top |
| `#/spec/<point>` | One requirement (`#/spec/4.1.3.1`): breadcrumb, the topic's tiles and Previous/Next, the wording, the next step and its Practise button, the same three measure cards, what you can show and where you're struggling, 8 weeks of performance, the six kinds of evidence, and the lessons with their question and flashcard counts |
| Progress | A summary panel: the three measures in one row and the map in miniature |

### The map

- **Filled tiles** have been assessed. The stronger the colour, the more your answers show. The scale is the activity tracker's teal: `#40d4b1` in the dark theme, deepened to `#0d9488` in the light theme so that the strongest tiles keep 3:1 contrast against the page.
- **Empty tiles (outlined)** haven't been assessed yet, so they can't be mistaken for a weak result.
- **Dashed tiles** aren't taught on Gradify yet.
- **Striped tiles** are early estimates, and an **orange dot** means slipping.
- Hovering over or focusing a tile names it. Every tile is a link with a full `aria-label`, so the map works by keyboard and screen reader. Each topic page gives the same information as a list.

**Practise** opens a 5-minute target test (`#/target/…`) on the point's shakiest lessons. It focuses on application when application is the weakest kind of evidence.

## A Gradify-wide system

Nothing in the engine (`kit/learning/spec-mastery.js`) or the pages (`kit/course/spec-view.js`) names a board, qualification, subject or country, and a test enforces that. Everything specific is data in `kit/specs/<id>.js`:

| Field | What it's for |
|---|---|
| `system`, `qualification` | Where the specification sits, using the ids in `kit/curriculum/coverage.js` (for example `uk-eng` and `gcse`, `uk-sco` and `higher`). An international curriculum adds its system and qualification there first. `checkSpec` rejects unknown ids |
| `board`, `subject`, `code`, `title`, `url`, `version` | Who sets it, and which version is mapped |
| `flags` | The specification's own classifications of points: `{ ht: { short: "HT", name: "Higher tier only" } }`. Other specifications might use HL/SL, a paper, or a route |
| `options` | Choices the learner makes, and which flags each choice hides: `{ id: "tier", choices: [{ id: "higher" }, { id: "foundation", hides: ["ht"] }] }`. The first choice is the default. The pages draw a control for each option |
| `topics → groups → points` | `{ id, title, text, lessons, partial, flags }` for each point |
| lesson references | `"u02-20"` is a lesson in the specification's own `course`. `"chemistry:u05-03"` is a lesson in another course, so Combined Science can span the three science courses. Evidence is keyed by course and lesson, because lesson ids repeat across courses |

`catalogue()` lists every specification by system → qualification → board → subject. It's the basis for letting a learner pick their actual qualification. Today the course page offers the specifications mapped onto that course, and remembers the learner's choice and options per course on the device (`gradify.spec.<slug>`, which still reads the first version's `{ id, tier }`).

## Files

| File | What it does |
|---|---|
| `kit/specs/<id>.js` | One specification (see "A Gradify-wide system") |
| `kit/specs/index.js` | The registry: `specsFor`, `specById`, `catalogue`, `pointsOf`, `resolveRef`, `choicesFor`, `hiddenFlags`, `checkSpec` |
| `kit/learning/spec-mastery.js` | The model: `specMastery`, `bandOf`, `confidenceOf`, `weakestPoints`. Pure functions, with no new storage |
| `kit/course/spec-view.js` | The specification, topic, point and Progress-summary HTML |
| `tests/spec-mastery.test.mjs` | Every mapping names real lessons; the rules above; an invented international specification spanning two courses runs unchanged; the engine and pages stay generic; older attempt records; offline caching; the summary label on every page |

## Adding a specification

1. Write `kit/specs/<board>-<qualification>-<subject>-<code>.js` in the same format, and map each point to lessons.
2. Add it to `SPECS` in `kit/specs/index.js`. `npm test` checks that every lesson exists.
3. Add the file to `SHELL` in `sw.js`. A test checks this, because a missing file breaks the course page offline.

The course needs no code change. When a course has more than one specification, the page shows a picker, and the learner's choice and options are remembered per course (`gradify.spec.<slug>`).

## Honesty about the wording

The point titles, the requirement text and the classifications (Higher tier only, Biology only) are **Gradify's own summary**: the spec has `wording: "paraphrased"` and `verified: null`. Every view labels this:

- the specification page has a "Summary, not official wording" note that links to the board's specification
- the topic page and the Progress panel carry a "Summary, not official wording" tag
- each point's requirement says "Gradify's summary, not official wording"
- the classification tags say "not yet verified" in their tooltips

The labels come from `summaryNote(spec)` and disappear only when the specification records a verification. Set `wording: "verbatim"` only after someone has checked every point against the current published specification and recorded it in `verified: { date, by, version }`. `checkSpec` refuses verbatim wording without that record.

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
