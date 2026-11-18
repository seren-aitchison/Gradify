# Gradify Intelligence: technical audit and research programme

Stage 1 of the Gradify Intelligence research programme. It covers:

- what the engine does today
- what the open-source projects on the shortlist offer
- what was measured
- what to build next, in what order

Written 17 November 2026, on `feat/intelligence-bench` (branched from `feat/flashcard-engine`).

**The short version:**

- **Gradify's engine is further along than the shortlist assumes.** It already has FSRS-5 (validated against ts-fsrs), an event ledger, concept identity, an evidence-weighted knowledge graph, knowledge debt, readiness with uncertainty ranges, Autopilot and an independent AI card reviewer.
- **What it lacked was measurement.** No test asked whether the mastery, recall or readiness numbers predict what learners actually do. This change adds that (`npm run bench`, [BENCHMARKS.md](BENCHMARKS.md)) and a recorded baseline that every later change has to beat.
- **The first measurements already found five concrete problems.** Two are small bugs in the card checks. Three are modelling weaknesses with a clear, measurable fix.
- **None of the ten repositories should be added as a dependency now.** The ideas worth taking can be written in TypeScript or JavaScript inside the existing architecture: BKT, IRT, FSRS parameter fitting and claim-level fact checking. The one exception may be FSRS's optimiser, which ships under MIT inside the ts-fsrs monorepo.

---

## 1. What exists today

All of this is pure JavaScript in `kit/`, so the browser, Node tests and Supabase Edge Functions share it. It's computed in the learner's browser from their own data. Claude writes material and explains; it never decides what a learner knows.

| System | Where | How it works now |
|---|---|---|
| Event ledger | `kit/intel/ledger.js`, `learning_events` | Append-only events (answers with confidence and time, sessions, packs, plans, forgotten, stage reached). Derived from existing tables too, so history counts from day one. |
| Concept identity | `kit/intel/identity.js` | One id per idea across notes, courses and sites; conservative name matching |
| Learner Model, five dimensions | `kit/learning/mastery.js` `topicProfiles` | Per topic: recall, explain, apply, confidence and retention. Weighted averages with a 30-day half-life, pulled to 50% when thin. Mastery = quality × coverage × depth. Levels: new, learning, fading, shaky, strong, mastered. |
| Learner Model, six dimensions | `kit/learning/mastery.js` `sixProfile` | Recognition, recall, explain, apply, transfer and retention from course attempts. Weights by difficulty, independence and evidence class. Certainty comes from evidence counts. |
| Learner memory | `kit/intel/memory.js` | Concept stage (seen → applied), certainty, error history, forgetting forecast |
| Memory model | `kit/learning/srs.js` | FSRS-5 with default parameters, matched to ts-fsrs 4.7.1 to six decimal places (`docs/FSRS.md`). State is kept in existing columns, so no migration was needed. |
| Knowledge graph and debt | `kit/intel/graph.js`, `kit/intel/debt.js`, `kit/learning/concepts.js` | Links weighted by evidence (course prerequisite 0.9, shared definition 0.45, answers ±0.25, used at 0.5 or more). Weak topics are traced to their deepest insecure root. |
| Readiness | `kit/intel/readiness.js`, `memory.js` `predictions` | Per objective: a recency-weighted Beta estimate, projected to exam day with a heuristic stability. 80% range. "Not enough evidence" below two answers. |
| Card ordering | `kit/intel/order.js` | Forgetting × importance × confidence, prerequisites first, new cards capped, interleaved |
| Priorities and Smart Plan | `kit/intel/priority.js`, `schedule.js`, `autopilot.js`, `calibrate.js` | Ranked items with reasons. Greedy day planner inside availability windows with breaks. Reschedule without cramming. Learns the learner's real session lengths. |
| Ask and coach | `kit/intel/ask.js`, `coach.js` | Answers from the model with evidence. Claude may only recommend actions the priority engine offered. |
| Flashcard generation | `kit/notes/pack.js`, `supabase/functions/study-pack` | Claude builds a knowledge pack: facts with quotes, Bloom level and prerequisites. Code checks quotes and answer support, splits lists and merges near-duplicates. An independent Claude review keeps, revises or rejects each card, and code re-checks every correction. |
| Mock exams | `kit/assess/exam.js` | Random questions spread evenly across groups. Marked with weak areas. **No adaptive selection and no item difficulty model.** |
| Mind maps | `kit/notes/studio.js` (spidermap), Gradify Earth | Drawn from the pack's topics and facts with a custom renderer. The graph intelligence lives in `graph.js` and `debt.js`, separate from drawing, as the brief asks. |

### The "wrong chemistry flashcard" chain, today

| Step | Status |
|---|---|
| 1. Ledger records the answer | ✓ `ledger.js` |
| 2. Underlying concept identified | ✓ topic level (`identity.js`). Not yet fact level for a learner's own notes. |
| 3. Learner Model updates mastery | ✓, but as weighted averages, not a probability with uncertainty (§3) |
| 4. Graph finds prerequisites | ✓ `graph.js`, `debt.js` |
| 5. Isolated slip or wider misconception? | Partly. A confident wrong answer flags the card, but nothing combines errors across cards on a concept. |
| 6. Memory model updates | ✓ FSRS |
| 7. Card order changes | ✓ `order.js` |
| 8. Smart Plan reprioritises | ✓, recomputed from the same model on load (not event-driven, which is fine in a browser model) |
| 9. Readiness updates | ✓ `readiness.js` |
| 10. Recommendation with a reason | ✓ `priority.js`, `ask.js` |

**Double counting:** the five- and six-dimension profiles both read the same reviews, but they're two views, never added together. Nothing is double counted today. The risk to watch is a future step that sums them.

---

## 2. What the benchmarks measured (baseline)

The numbers, and what they can't say, are in [BENCHMARKS.md](BENCHMARKS.md). The findings:

1. **Good maths and computing cards are deleted.** `reviewCard` treats an answer made only of single letters as "empty". So `O(n)`, `f'(g(x)) g'(x)` and `x = y` are dropped as unusable. On the labelled cards, 2 of 9 good STEM cards were removed. This hits exactly the subjects the brief cares most about (equations, notation). `kit/notes/pack.js:249`.
2. **"Plus or minus" becomes a list.** `splitList` reads "about seven items, plus or minus two" as three items and replaces one good card with three garbled fill-in-the-blank cards. `kit/notes/pack.js:213` `listItems`.
3. **The Mastery Engine's per-card recall contradicts FSRS.** `recallProbability` in `mastery.js` reads any card last rated "again" as 30% recall forever, even months later. `recallNow` in `srs.js` only does that for the first day. The benchmark shows the Mastery Engine's version is worse on every metric (log loss 0.539 against 0.475). It feeds retention, `forgetIn` and `practiceOrder`.
4. **On synthetic learners, Gradify's mastery figures predict the next answer worse than a simple running average.** BKT fitted on other learners beats both. Log loss:

   | Model | Log loss |
   |---|---|
   | gradify-dimension | 0.724 |
   | gradify-mastery | 0.690 |
   | running accuracy | 0.680 |
   | BKT (fitted on other learners) | 0.646 |

   The ranking held on three further seeds. The six-dimension values are reasonable descriptions, but as probabilities they're overconfident (ECE 0.13). Section 3 explains why that matters. This is a synthetic result: it shows the weighted averages ignore evidence a probabilistic model uses, not that BKT is best for Gradify's learners. Run the real-data benchmark (item 5 in §5) before relying on the ranking.
5. **The code checks catch only 2 of 7 factually wrong cards**, and none of the "two questions in one" cards. That's expected: code can check that a quote exists and words overlap, not meaning. It makes the AI reviewer the only real defence against wrong answers, and **the AI reviewer has never been measured.** It also runs on the same model as the generator, which the brief rules out as a sole judge.

Two findings depend on how the simulator forgets, so they're questions to answer with real data, not conclusions:

- **Readiness looks pessimistic**, biased low by 8 to 14 points across seeds, and its "80% range" held the truth 86 to 90% of the time (wider than it needs to be). The heuristic stability `S = 3 · 2^(good days − 1)` is the likely cause. Check against real mock-exam outcomes.
- **Default FSRS-5 was less well calibrated than a per-learner average.** That's what the SRS benchmark would predict for unfitted parameters. Real data will say whether Gradify's learners need fitted parameters.

The Smart Plan planner passed every hard constraint on 400 random days and used 97% of the available time. Two things to watch:

- 10.6% of placed items are cut to under half the time they asked for (a 45-minute task squeezed into 10)
- the top three items are placed only 74% of the time, mostly because of short windows

---

## 3. Repository assessments

Licences were read from each repository's metadata and `LICENSE` file on 17 November 2026. **No code was copied from any repository.** The only code read was ExamCopilot's readiness service, to understand its method. DeepStudent's code was not opened at all.

### Learner modelling

**[pyBKT](https://github.com/CAHLR/pyBKT)** (MIT; C++ and Python; maintained, last push 2 November 2026)

- What it is: Bayesian Knowledge Tracing with EM fitting, plus variants for forgetting, per-item guess and slip, multiple priors and per-learner learning rates.
- **Take:** the model. The benchmark already shows plain BKT beating Gradify's mastery as a predictor. The equations are short and well published (Corbett and Anderson, 1995), so implement them in JavaScript; the benchmark's `scripts/bench/bkt.mjs` is a first version. pyBKT's variants are the menu for later:
  - per-item guess and slip, from question type (a five-option single best answer has a guessing floor near 0.2)
  - forgetting
- **Don't:** run Python to use it.

**[pyKT toolkit](https://github.com/pykt-team/pykt-toolkit)** (MIT; Python and PyTorch)

- What it is: ten or more deep knowledge-tracing models (DKT, AKT, SAINT, GKT, DKT-Forget, uncertainty-aware) with standard data splits.
- **Don't, yet.** These models need tens of thousands of learners and millions of interactions to beat BKT or logistic models reliably, and they need a GPU training service. Gradify doesn't have that data yet.
- **Take now:** its evaluation protocol (held-out learners, next-answer AUC), which the benchmark follows.
- **Revisit** when the real-data benchmark has enough learners for a neural model to have a chance.

**[EduKTM](https://github.com/bigdata-ustc/EduKTM)** (Apache-2.0; Python; last push January 2024, so slowing)

- What it is: overlaps pyKT, with graph-based (GKT) and memory-network (DKVMN) models.
- **Take:** reference only. Use pyKT as the primary reference rather than both.

### Memory

**[ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs)** (MIT; TypeScript; very active)

- **Now at v6.0.0 (FSRS-6).** Gradify matches 4.7.1 (FSRS-5). FSRS-6 adds a learned forgetting-curve shape and better same-day reviews.
- The monorepo also contains `binding`, the Rust parameter optimiser (fsrs-rs) for Node.
- **Take:**
  - keep Gradify's dependency-free scheduler
  - upgrade the reference test to FSRS-6 only if the real-data benchmark shows FSRS-6 predicts better
  - use the optimiser to fit per-learner parameters offline or server-side; this is where the SRS benchmark finds the biggest gains
- Per-learner parameters can be stored in the learner profile's existing JSON, with no migration.

**[srs-benchmark](https://github.com/open-spaced-repetition/srs-benchmark)** (**no licence file**: all rights reserved)

- **Take ideas only:** the metrics and protocol, used here. Nothing may be copied.
- Its dataset (anki-revlogs on Hugging Face) has its own terms. Check them before using it to tune Gradify.

### Exams and adaptive testing

**[ExamCopilot](https://github.com/nobleqbit/examcopilot)** (MIT; Python and Django; one star, two commits)

- An early project. Its readiness is the expected score over the question bank from a 3PL ability estimate, compared with the pass mark, after at least 20 answers.
- It assumes every question already has calibrated difficulty, discrimination and guessing values. **Gradify's questions don't**: they have an authored level of 1 to 3.
- **Take:**
  - the shape: ability → expected score → comparison with the pass mark
  - the 20-answer floor
- **Don't take:** the code. It's small and untested at scale, and textbook IRT is easy to write directly.

### Mind maps and graphs

**[Markmap](https://github.com/markmap/markmap)** (MIT; TypeScript and D3)

- What it is: Markdown → an interactive, collapsible tree.
- It suits the hierarchy view (topic → facts). It can't show prerequisite links across branches.
- `markmap-view` works without a framework, so it fits Gradify's vanilla JavaScript front end.

**[React Flow / XYFlow](https://github.com/xyflow/xyflow)** (MIT; React and Svelte)

- What it is: the leading node-and-edge editor.
- **Gradify isn't a React app.** Adopting it means a framework island in a vanilla JavaScript codebase. The framework-free core (`@xyflow/system`) isn't a full renderer.
- Prefer a small layout library (for example dagre, MIT) for prerequisite graphs, drawn with Gradify's existing SVG. Revisit if the native app's web views move to React.

**For both:** the intelligence stays in `graph.js`, `debt.js` and `concepts.js`, with rendering separate, as the brief asks. The first mind-map step should be a mastery overlay and a relationship benchmark (BENCHMARKS.md "Still to add"), not a new renderer.

### AI evaluation

**[DeepEval](https://github.com/confident-ai/deepeval)** (Apache-2.0; Python)

- What it is: a test framework whose metrics are mostly LLM-as-judge prompts. Faithfulness, for example, extracts claims from an answer and checks each against the context.
- It's Python, and it collects telemetry unless switched off (`DEEPEVAL_TELEMETRY_OPT_OUT`).
- **Take:** the faithfulness design for the card reviewer:
  1. the reviewer breaks each answer into claims
  2. it quotes the sentence of the notes that supports each claim
  3. code checks every quote with `groundingScore`

  That turns the reviewer's opinion into checkable evidence, in the same spirit as Gradify's existing rule that code has the last word.
- **Don't** adopt the framework.

### Planning

**[Google OR-Tools](https://github.com/google/or-tools)** (Apache-2.0; C++ with Python, Java and C# wrappers)

- **Not justified.** A day has fewer than about 20 items and a week fewer than about 150. The greedy planner is feasible on every tested day and uses 97% of the time.
- The real gaps are two policies, not missing solver power:
  - squeezing items
  - spreading revision across several exams
- Both can be fixed in JavaScript: a minimum useful block, and a small allocation across exams by marginal readiness gain per minute. OR-Tools would add a WebAssembly build or a Python service for no measured benefit.

### Not to copy

**[DeepStudent](https://github.com/helixnow/deep-student)** (AGPL-3.0)

- Its code was not read and must not be copied. Its public description (agent, mind maps, flashcards, citations, learner memory in one workflow) matches what Gradify already has.

### From the earlier flashcard audit (`docs/FLASHCARD-ENGINE.md` §2)

- Docling (MIT; Python, deferred until Word and PowerPoint uploads matter)
- pdf2anki (ideas only; its PDF reader PyMuPDF is AGPL)
- FlashMind (no licence)
- QuickLearn (MIT, not needed)
- anki-llm-flashcard-generator (MIT, but depends on AGPL `pymupdf4llm`)

---

## 4. Licence register

Third-party code incorporated into Gradify by this change: **none.**

| Item | Licence | How it's used |
|---|---|---|
| ts-fsrs 4.7.1 | MIT | Dev dependency, test oracle only (unchanged) |
| BKT in `scripts/bench/bkt.mjs` | n/a | Written from the published equations (Corbett & Anderson, 1995). Benchmark only. |
| Metrics in `scripts/bench/metrics.mjs` | n/a | Standard definitions, written for Gradify |
| SRS benchmark protocol | No licence | Ideas only, no code |

When code from any project is incorporated later, add it here with its licence, version, the files it went into, and any NOTICE text the licence requires (Apache-2.0 §4).

---

## 5. What to build next, ranked

Ranked by expected improvement in what learners see, against effort and risk. Every item lands as its own pull request, has to move the benchmark the right way, and updates the baseline in the same PR.

| # | Change | Expected benefit (measured or to measure) | Effort | Migration | AI cost |
|---|---|---|---|---|---|
| 1 | **Fix the two card-check bugs**: symbol-only answers and "plus or minus" lists | Good STEM cards stop being deleted or mangled. Benchmark: good cards wrongly blocked 7.1% → 0%, rewritten 3.6% → 0%. | Small | No | None |
| 2 | **One recall function**: the Mastery Engine uses `recallNow` | Retention, the forgetting forecast and practice order agree with FSRS. Benchmark: `mastery-card` log loss 0.539 → 0.475. | Small | No | None |
| 3 | **Measure, then strengthen, the AI card reviewer**: run `--claude`; review on a different model from the generator (Sonnet 5.5); claim-by-claim quotes checked in code | Detection of wrong cards (code alone: 2 of 7), measured before and after | Medium | No | Review on Sonnet is cheaper than today's Opus review |
| 4 | **Probabilistic mastery (BKT)** under the six-dimension profile: P(knows) per objective, with an interval; guess floor from question type; parameters fitted per subject from exported data | Mastery that predicts answers (synthetic log loss 0.724 → about 0.65) and honest "guessed vs knows". The six dimensions stay as the explanation. | Medium | No (computed in the browser) | None |
| 5 | **Real-data benchmark run** (owner exports, SQL in BENCHMARKS.md) | Decides 6 and 7 on Gradify's own learners instead of simulations | Small (owner) | No | None |
| 6 | **FSRS per-learner fitting** with the MIT optimiser from the ts-fsrs monorepo; FSRS-6 if it wins | Better-timed reviews; the SRS benchmark's largest gain. Only if the real data shows default parameters are miscalibrated. | Medium | No (learner profile JSON) | None |
| 7 | **Readiness calibration**: replace the heuristic stability with FSRS or BKT state; log the prediction before each mock exam and compare it with the mark | Readiness that's neither pessimistic nor too wide, checked against real exams | Medium | No (ledger events) | None |
| 8 | **Adaptive mock exams (IRT)**: Rasch difficulty per question, starting from the authored level and calibrated nightly from all learners' anonymous answers; questions chosen by maximum information within the blueprint | Shorter, more informative mocks; ability with a standard error | Large | **Yes**: an aggregate item-statistics table, written by a server job. Needs a proposal and approval. | None |
| 9 | **Mind-map intelligence**: benchmark inferred links against authored course concept graphs; mastery overlay on the spidermap; prerequisite view | Measured link accuracy; maps that show why a weak foundation matters | Medium | No | None |
| 10 | **Smart Plan policies**: a minimum useful block; multi-exam allocation by readiness gain per minute | Fewer squeezed tasks; better spread across exams | Small to medium | No | None |

Deliberately not on the list:

- a Python service
- deep knowledge tracing (until data volume justifies it)
- OR-Tools
- React Flow
- another AI provider
- changes to network configuration, entitlements or usage accounting

## 6. Constraints this programme keeps

- **Claude stays the only AI provider.**
- **No new migrations without a written proposal and approval.** Only item 8 needs one.
- **FSRS isn't duplicated:** improvements change `kit/learning/srs.js` and its reference test.
- **Entitlements, allowances and the usage ledger are untouched.**
- **No UI redesign** is mixed with engine work.
- **Learner data stays private:**
  - real-data runs use exports anonymised with md5 and stay out of the repository
  - the only cross-learner computation proposed (item 8) uses anonymous aggregates
- **Forecasts stay forecasts:** readiness is shown as a range with its evidence, never as a predicted grade.
