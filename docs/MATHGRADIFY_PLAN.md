# MathGradify: plan and status

MathGradify's course runs on the shared course engine (`kit/course/course.js`) like the law, nursing and pharmacy courses: one account, one progress record, one mastery engine. Its distinctive tools are built for maths: generated practice, a graph explorer, written proofs and a step-by-step checker that marks every line of working.

## The curriculum

`kit/courses/maths/syllabus.js`: **29 schools, 1,077 lessons**, built from the topic list supplied in November 2026, from everyday maths and GCSE to research-level topics, data science, finance and software. Topics that appeared under several headings (for example PCA, recurrence relations, Fourier analysis) are taught once and shared through pathways. One lesson was added to the list: "Percentage Change and Reverse Percentages" (core GCSE content).

| | Schools |
| --- | --- |
| Foundations | 1 Number and Arithmetic · 3 Algebra · 5 Geometry · 6 Trigonometry · 28 School and Examination Mathematics · 29 Everyday and Practical Mathematics |
| Calculus and analysis | 7 Calculus · 8 Multivariable and Vector Calculus · 9 Analysis · 10 Differential Equations |
| Algebra and structure | 2 Number Theory and Cryptography · 4 Abstract Algebra · 11 Linear Algebra and Matrices · 16 Logic, Sets and Foundations · 17 Topology and Advanced Pure Mathematics |
| Probability and statistics | 12 Probability · 13 Statistics · 22 Time Series and Forecasting |
| Discrete maths and computing | 14 Discrete Mathematics and Combinatorics · 15 Graph Theory and Networks · 19 Numerical Analysis and Scientific Computing · 23 Information Theory and Signal Processing · 27 Mathematical Software and Tools |
| Applied | 18 Optimisation and Operations Research · 20 Mathematical Modelling and Applied Mathematics · 21 Financial Mathematics and Economics · 24 Mathematics for Machine Learning and AI · 25 Control Theory and Systems |
| Reasoning | 26 Mathematical Reasoning and Research Methods |

**Pathways** (`PATHS`): everyday maths and Functional Skills, GCSE, A level, Further Maths, university first year, pure maths, applied maths and engineering, data science and AI, financial and actuarial maths, discrete maths and computer science, and university entrance tests (MAT, TMUA, STEP). Pathways select the modules each audience needs from shared schools.

**Mapping** (`map.js`): every school is mapped to the top-level areas of the Mathematics Subject Classification (MSC2020); school-level schools are also mapped to the DfE GCSE and A level subject content. All three frameworks are `verified: null` until checked against the published documents.

## Tools

| Tool | Where | What it does |
| --- | --- | --- |
| Expression engine | `kit/interactive/mathexpr.js` | A safe parser (no `eval`) for what students type: implicit multiplication, functions, constants, equations, lists. Checks equivalence numerically at many points (including up to a constant for integrals), reads answers like `3/4`, `2sqrt(3)`, `x = 2 or x = −3`, recognises expanded and factorised forms, and displays maths with superscripts. |
| Step by step | `#/steps` · `kit/interactive/stepcheck.js` · `kit/courses/maths/steps/` | Students solve line by line; each line is checked against the last, so feedback points to the exact line where an error crept in (a sign slip, a lost solution from dividing by x, an incomplete factorisation). Six sets, 36 problems: expanding, factorising, linear and quadratic equations, differentiation and integration. Hints and worked solutions; every problem is an attempt record for the mastery engine. |
| Practice problems | Practice tab · `kit/interactive/mathgen.js` | Endless generated GCSE and A level problems across 18 types, each with a worked method. |
| Graph explorer | Practice tab · `kit/interactive/grapher.js` | Plot any function with sliders for a, b and c, and seven transformation challenges (match the dashed graph). |
| Proofs and explanations | Write tab · `writing.js` | Four tasks (√2 is irrational, infinitely many primes, the digit-sum test, 0.999… = 1), each with a rubric and model answer, marked by self-assessment or Gradify AI. |

The course tutor has maths-specific rules (`SITE_RULES.maths` in `kit/assess/tutor.js`): show working, check arithmetic, and don't hand over answers to what looks like live assessed work.

## Status

**Written:** School 1, Number and Arithmetic (29 lessons), to content standard 2: worked examples in every lesson, 70+ check questions including numerical ones, two sources per lesson. 0 QA warnings. The other 28 schools are planned, not written.

**Tested:** `tests/maths-tools.test.mjs` (equivalence and non-equivalence cases, answer reading, error messages; every generated problem type marks its own answer right and a wrong one wrong over 150 samples each; every step-by-step worked solution passes its own checker line by line; errors are caught at the right line; every graph challenge is reachable), plus the shared course, registry, QA and tutor tests. Checked in a browser at desktop and phone width with no errors.

**Explore (labs):** 15 interactives in `kit/courses/maths/interactives.js` (13 labs in `kit/labs/maths/`, plus generated practice and the graph explorer). They're joined to the tutor and to mastery:
- *Lab-aware tutor.* A lab page has an "Ask about this lab" panel (Ask, Talk it through), grounded in the first of the lab's lessons that has notes. On lesson pages, the tutor is told about the lab the learner last used. What the lab shows (its settings, readout, iterate tables and challenges) is read from the page by `kit/course/lab-state.js` and sent as `lab` in `explain` and `socratic` requests (`labBlock` in `kit/assess/tutor.js`). No migration is needed: the modes and daily limits are unchanged.
- *Lab mastery evidence.* Each lab's `evidence` map names the challenges that show a skill and the lesson each is evidence for (38 in all). Exploration challenges ("run 1,000 trials") earn XP but aren't evidence. Each record has one of three outcomes (`labOutcome` in `kit/learning/mastery.js`):
  - **success**: met without help. Counts as Application, at half weight.
  - **assisted_success**: met after the AI tutor answered a question about the lab. Counts as Application, weighted as assisted (0.3 of that).
  - **attempt**: the learner pressed "Try this" on a challenge, worked at it (at least five separate interactions), then moved on or left without meeting it. It never lowers mastery. Two or more unmet tries since the lesson's last lab success list it under "Lab challenges to practise" in My progress, and tell the study director. Without "Try this" no failure is recorded, because the lab can't tell what the learner was aiming at.
  - Lab records never come back in Revisit, and they're kept out of "How you're answering", which is about questions.
- *Not yet:* no maths lesson embeds a lab with an `IX:` line yet (the notes are being written). Labs whose lessons have no notes yet (School 19's root-finding) show no tutor panel. The tutor needs the backend switched on (docs/BACKEND-STATUS.md).

**Deployed:** static, with the site. AI feedback on proofs needs the course-tutor function deployed and a signed-in learner.

**Awaiting expert review:** School 1 (a maths teacher or lecturer: `qa.js` reviewed, sources and sign-off are null), the step-by-step problem sets and the proof tasks. The equivalence check is numerical: very reliable for school and early university algebra, but a check, not a proof.

## Next

1. Write School 3 (Algebra) and School 7 (Calculus), the core of GCSE and A level, then Schools 5, 6, 12 and 13.
2. More step-by-step sets: simultaneous equations, inequalities, surds, logarithms, trigonometric equations, integration by substitution.
3. Proof-step checking for induction, and a written-proof workspace that checks each claimed equality.
4. Mock exams once the GCSE and A level schools are written.
