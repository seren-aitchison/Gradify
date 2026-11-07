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

**Written:** all 29 schools, 1,077 lessons, to content standard 2. Every lesson has a lead, objectives, key terms, sections, two flashcards, check questions (2,168 in all, including numerical ones and at least 10% hard questions in each school) and two sources. Every lesson outside Schools 26 and 27 has a worked example. QA reports 29 of 29 schools passing hard checks with 0 warnings (`npm run qa`). School 27 (software) describes products as documented by their vendors: features change between versions, so check current documentation.

**Tested:** `tests/maths-tools.test.mjs` (equivalence and non-equivalence cases, answer reading, error messages; every generated problem type marks its own answer right and a wrong one wrong over 150 samples each; every step-by-step worked solution passes its own checker line by line; errors are caught at the right line; every graph challenge is reachable), plus the shared course, registry, QA and tutor tests. Checked in a browser at desktop and phone width with no errors.

**Explore (labs):** 19 interactives in `kit/courses/maths/interactives.js`: 17 labs in `kit/labs/maths/`, plus generated practice and the graph explorer. Stage B added four accessible labs (circle theorems, quadratics, the unit circle and trigonometric graphs, exponentials and logarithms; docs/INTERACTIVE-ROADMAP.md). Every lesson they link to shows them: two in full, the rest as links (Stage A, docs/INTERACTIVE-ROADMAP.md).
- *Mastery evidence.* Every challenge maps to a lesson in `kit/courses/maths/evidence.js`. Outcomes are successful, assisted, unsuccessful or attempted; the rules are in docs/INTERACTIVE-ROADMAP.md.
  - Generated practice records each problem type against the lesson that teaches it, from Fractions to Definite Integrals (18 lessons). Before 8 November, 13 of its 18 types were recorded against Fractions. A test now checks each type's lesson.
  - Exploration challenges ("run 1,000 trials", "try three functions"; 12 in maths) earn XP and show in the Mastery panel, but never count towards mastery (`EXPLORATION` in `evidence.js`; docs/LEARNING_ENGINE.md).
- *Lab-aware tutor.* A lab page has an "Ask about this lab" panel (Ask, Talk it through). On lesson pages, the tutor is told about the lab the learner last used. What the lab shows (its settings, readout, iterate tables and challenges) is read from the page by `kit/course/lab-state.js` and sent with `explain` and `socratic` requests. The server grounds the tutor in the lesson's published notes, fetched by lesson id (`kit/assess/canon.js`).
- *Placed in lessons (November 2026).* 83 lessons place a lab in their notes (85 placements; Complex Numbers and Derivatives use two). Each placement sits after the worked example and before the key point, with an **Investigate with the lab** brief that names one of the lab's own challenges, and a follow-up check question answerable from what the lab shows. 29 of the 83 lessons were newly linked to labs that genuinely demonstrate their idea (for example Matrix Inversion and Rank to the matrix lab, Population Dynamics to the logistic slope field, Robust Regression to the outlier challenge). Mastery evidence is unchanged: each lab challenge still counts for the one lesson its `evidence` map names. `npm run labs` writes `docs/qa/lab-coverage.md` for every course, and `tests/lab-coverage.test.mjs` fails if a lesson embeds an unknown lab or a maths lab link isn't placed.
- *Coverage:* 102 of 1,077 lessons (9%): the 83 above plus 19 more from Stage B's four labs (`npm run labs`). The other 975 have no suitable lab yet; Stage B's unit-circle and quadratics labs now cover part of the trigonometry and algebra estimates below. New labs worth building, with a rough count of lessons each would serve (from lesson titles, so an estimate): dynamic geometry constructions (~26), unit circle and trigonometric identities (~24), hypothesis tests and confidence intervals (~20), sequences, limits and convergence (~16), sampling, aliasing and Fourier transforms (~14), interest, annuities and loans (~14), vectors in 2D and 3D (~11), Taylor and Fourier series (~11), Bayesian updating (~7), graph algorithms (~7), linear programming feasible regions (~5), SIR epidemic models (~5), Markov chains (~4), the logistic map and chaos (~4). The tutor needs the backend switched on (docs/BACKEND-STATUS.md).
- *Tested:* every lab module's mathematics is checked against known answers (`tests/maths-labs.test.mjs`: 11 of 11 modules), as are registration, evidence and outcome rules (`tests/interactives.test.mjs`).
- *Needs the backend:* the tutor, and syncing evidence across devices (docs/BACKEND-STATUS.md).

**Automated content checks (November 2026):** `npm run qa` also runs subject-independent content checks on every course (`scripts/qa-content.mjs`, report in `docs/qa/content-checks.md`), each with a test that plants the error:
- *Escaping:* single backslashes that JavaScript swallows.
- *Notation:* an unclosed ^{ or _{.
- *Field separators:* a " | " inside brackets, which splits a line in the wrong place.
- *NUM questions:* numerical questions the parser would drop.
- *Arithmetic:* pure-number equations that don't add up.
- *Reviewer prompts:* numerical answers their explanation doesn't show, and non-https source links.

What they found and fixed:
- *79 conditional bars.* Bars written as P(A | B) collided with the field separator. They truncated terms, flashcards and options, and silently dropped four numerical questions (Schools 11–13, 18, 21–24). They are now written with ∣ (U+2223).
- *Rounding in School 19.* A sum of rounded terms was written as =, and is now ≈.

The 42 maths numerical answers the report lists (explanations that don't spell the answer out) were checked by eye, and all are right (counts, and fractions written as words). Arithmetic left to review: 0.

These checks find display and arithmetic slips. They can't tell whether the mathematics is right.

**Concept graph (November 2026):** `kit/courses/maths/concepts.js` maps what each of the 132 modules builds on (247 links, read by the shared engine `kit/learning/concepts.js`).
- *In lessons:* every lesson shows **Builds on**, with links to the prerequisite modules. A prerequisite is marked "review first" once the learner's own answers measure their mastery there below 60%. With no evidence there is no mark.
- *Report:* `npm run qa` writes `docs/qa/maths-concepts.md`, with the sequencing findings, the most depended-on modules and a school-level map.
- *Sequencing finding:* 22 links point to something taught later. Chiefly, Sets, Relations, Logic and Proof (School 16) underpin Groups (4), Real Analysis (9), Probability (12), Counting (14) and Graphs (15), but come after all of them. School 6's Fourier series also needs School 7's integration and series.
  - Recommended: a "Foundations" path that takes School 16's Sets, Logic and Proof modules before the pure schools, rather than renumbering (lesson ids are permanent).
- The map awaits expert review like the lessons.

**Platform:** maths is defined through the maths subject adapter (`kit/subjects/maths.js`: levels, wording, tutor note, and the worked-example and bare-caret QA rules). See docs/GRADIFY_PLATFORM.md for how the same engine runs the sciences and a programming course.

**Deployed:** static, with the site. AI feedback on proofs needs the course-tutor function deployed and a signed-in learner.

**Awaiting expert review:** all 29 schools (a maths teacher or lecturer for the school and A level content; subject specialists for the university, finance, statistics and software schools). In every school's `qa.js` entry, reviewed, sources and sign-off are null, and no lesson is marked verified. Worked examples, numerical answers and cited sources need checking. The step-by-step problem sets and proof tasks also await review. The equivalence check is numerical: very reliable for school and early university algebra, but a check, not a proof.

## Next

1. Switch on the backend (docs/SETUP.md, docs/BACKEND-STATUS.md): accounts, syncing, the AI tutor, and the two-account check on the live site. Needs the site owner.
2. Expert review, school by school, starting with the GCSE and A level core (Schools 1, 3, 5, 6, 7, 12, 13 and 28).
3. AI marking of working: step-by-step feedback on a written or photographed solution.
4. Proof-step checking for induction, and a written-proof workspace that checks each claimed equality.
5. A unified mastery profile: one picture across lessons, labs, practice and exams. Weak prerequisites are already flagged in lessons (concept graph). Next: a remediation path on the Mastery page, and passing weak prerequisites to the tutor (docs/GRADIFY_PLATFORM.md §10).
6. A "Foundations" path through School 16's Sets, Logic and Proof modules before the pure schools (docs/qa/maths-concepts.md).
7. Mock exams for GCSE and A level.
8. More step-by-step sets: simultaneous equations, inequalities, surds, logarithms, trigonometric equations, integration by substitution.
9. New labs (docs/INTERACTIVE-ROADMAP.md proposes 28), once the existing 19 are reviewed.
