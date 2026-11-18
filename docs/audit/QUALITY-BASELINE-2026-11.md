# Quality baseline, November 2026

The first audit of Gradify against the [Quality Constitution](../QUALITY_CONSTITUTION.md): where it stands on
18 November 2026, measured from the repository and the generated QA reports, so that every later audit can show
what changed. It's a baseline and a work plan, not the full audit: section 4 says how the full one runs.

## 1. The headline

**Gradify has a lot of content and very little verified content.**

| Measure | Now | Source |
|---|---|---|
| Courses | 34 | `kit/api/v1/stats.json` |
| Written lessons | 9,979 | same |
| Flashcards · practice questions | 20,720 · 41,670 | same |
| School units with a QA record | 439 | `kit/courses/*/qa.js` |
| … content reviewed | **2** (law school 1, nursing school 1; both AI reviews, labelled as such) | same |
| … sources verified against primary sources | **0** | same |
| … signed off by a qualified expert | **0** | same |
| Sites' academic-quality score | 0–0.2 of 10 on every site | [QA-SCORES.md](../QA-SCORES.md) |

The one law school that was reviewed (30 lessons) had substantive errors, among them *R v R* [1991] given as an example of overruling, and *ex p Fire Brigades
Union* cited for substantive ultra vires of delegated legislation, which it isn't authority for. That's
one sample, but it's the only measurement there is, and it says unreviewed lessons should be presumed to contain
errors until checked.

Against that, the engineering is strong: 858 tests pass, the learner model is evidence-based and benchmarked, CI
checks the signed-in journey in a browser before every deploy, and browser accessibility checks pass 3,140 of
3,149 contrast checks.

## 2. Fixed in this change

| Finding | Article | Fix |
|---|---|---|
| Five courses (law, nursing, pharmacy, maths and physics: 3,637 lessons) gave learners no sign that a lesson hadn't been reviewed. Four set `publish: true`, which hides the draft label; physics had no QA record at all, so the engine treated every unit as ready. Biology and chemistry showed the draft label but not the review line. | 2 | All 34 courses now show each unit's review state ("Not yet reviewed · sources pending verification", or who reviewed it and whether it was an AI). `tests/constitution.test.mjs` fails if a course stops. Checked in a browser on nursing, physics, law and maths. |
| The agent department had no shared standard: each role had its own prompt and nothing above it. | all | `department/agent.py` puts the constitution's agent brief in front of every role's prompt, read from the constitution itself. Agents refuse to start without it. |
| An agent could write files and mark its own task complete; an answer with no tool call was recorded as **completed**. | 4 | Only QA closes tasks. Any other agent's changed files, or a prose answer, goes to QA for verification. A task that runs out of steps is marked blocked instead of being left looking active. |
| An agent could write review, source-check and sign-off records (`qa.js`). | 4 | Refused: people record those. |
| The workspace check compared path strings, so a sibling folder (`../Gradify-old/…`) passed it, and `list_dir` had no check at all. | 8 | Real-path containment on read, write and list. A role can only call the tools its role lists. |

## 3. Open findings, ranked

| # | Finding | Article | What closes it | Who |
|---|---|---|---|---|
| 1 | **No expert has reviewed any course**; nursing and pharmacy are clinical. | 1, 2, 4 | Recruit a registered nurse educator and a pharmacist for the clinical courses first, then law. Review one school each, end to end, before anything else is written in those subjects. | Owner |
| 2 | **No source verification is possible from this environment** (legislation.gov.uk, NICE, BNF, NMC and others are blocked). | 2 | Allow those hosts in the cloud environment's network settings, or verify outside it and record the result in `qa.js`. | Owner |
| 3 | AI review is the only review that scales, and it isn't running: 2 of 439 schools. | 1, 4 | Run a structured AI review per school against [CURRICULUM_QA.md](../CURRICULUM_QA.md), clinical and law first, recorded as AI review. It finds errors cheaply; it never replaces stage 5. | Workforce |
| 4 | Content is still written faster than it's reviewed: 9,979 written, 2 reviewed. | 1 | Decide the proposed rule in article 1 (no new school in a subject while more than one is waiting for review). | Owner |
| 5 | No learner-configurable reading settings (font, size, spacing, line length, background). Only the OS reduced-motion setting is respected. | 5 | One settings panel in the kit, applied by every site through CSS variables, each option independent. | Workforce, then testing with real users |
| 6 | 9 contrast failures on course pages ("level" 3.76:1, "Hide path" down to 2.61:1 on pharmacy); browser checks last ran 5 November and cover only the homepage and course page. | 5 | Fix the two shared components, rerun `scripts/check-a11y.cjs`, extend it to lessons and labs. | Workforce |
| 7 | No shared qualification → specification → learning outcome layer; older schools have no `O:` objectives. | 3 | The curriculum database described in the vision, starting with one qualification mapped completely (for example AQA GCSE Biology) rather than many partially. | Workforce, design decision first |
| 8 | Physics (1,308 lessons) has no QA record, so `npm run qa` doesn't track it. | 2, 4 | Add `kit/courses/physics/qa.js` and register it with the QA scripts. | Workforce |
| 9 | QA can approve its own edits: QA is the only role that closes tasks, including tasks where it changed files. | 4 | A second check for QA's own changes (a person, or a different reviewer role). | Owner decision |
| 10 | The local agents run a 3-billion-parameter model by default (`qwen2.5-coder:3b`). That suits routine checks; it shouldn't write or review curriculum content. | 1, 2 | Route content writing and review to a stronger model; keep the local one for mechanical work (counting, linting, link checks). | Owner |
| 11 | Course pages show leaderboards with promotion and relegation zones. | 9 | Measure, once there are learners, whether leagues help or hurt retention; make them optional. | Later |
| 12 | No learner outcome data: the AI features and accounts aren't verified in production. | 9, 10 | The owner actions in [GRADIFY_MASTER_PROGRESS.md](../GRADIFY_MASTER_PROGRESS.md). | Owner |

## 4. The full audit: how the workforce runs it

The full audit asks, of every course: what exists, what's missing, what's wrong, what's inaccessible, what's
confusing, and what could be much better. It runs as a queue, one school at a time, highest risk first, and
each school's result goes into its `qa.js` record by a person, so progress shows in
[CURRICULUM_PROGRESS.md](../CURRICULUM_PROGRESS.md) and in the review line learners see.

**Order:** nursing → pharmacy → medicine, dentistry, veterinary → law → maths and the sciences → everything else.
Clinical and legal errors can hurt someone; that sets the order, not lesson count.

**Per school:**

1. `npm run qa` hard checks and warnings (automatic).
2. Structured content review against the checklist, recorded as AI review, with every finding fixed or left open
   by name (pedagogy and subject agents, checked by QA).
3. Citation register checked against primary sources (needs finding 2).
4. Accessibility pass on a sample of lessons and the school's interactives (finding 6).
5. Expert sign-off (a person; needs finding 1).

**Measured by:** schools at each stage, errors found per school reviewed (the error rate tells us how much to trust
the rest), and, once learners are using it, retention and assessment results on reviewed versus unreviewed schools.

Rerun this baseline after the first ten schools, and compare.
