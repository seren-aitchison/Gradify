# Interactive learning roadmap

**Version 1, 7 November 2026.** An audit of every interactive across Gradify, a standard every one must meet, and a prioritised plan for what to build next. **Nothing in this document has been built yet.** The next development batch starts only on the owner's approval. Supabase configuration, authentication and secrets aren't part of this plan.

How it was produced is in §11. The counts were measured from the repository and a browser run on 7 November 2026, not taken from earlier updates.

## 1. Summary

- **161 interactives** are registered across the 9 courses, plus **18 case-based workspaces**: 6 each in Law (reasoning), Nursing (clinical simulation) and Maths (step-by-step).
- **The counts in the last update are already out of date.** Maths has **15** interactives, not 2: another session added 13 Maths labs on 7 November.
- **Correction: most interactives don't feed mastery yet.** A lab challenge becomes mastery evidence only when the lab maps each challenge to a lesson (its `evidence` map). Today **13** interactives have one, all in Maths. The other 148, including the 17 new Physics labs, award XP but record no mastery evidence. The previous update wrongly said the Physics labs counted towards mastery.
- **Law, Nursing and Pharmacy interactives never appear inside a lesson.** All 6 are linked to whole schools rather than to lessons, so they are only reachable from the Practice tab.
- **On phones, the interactives work.** All 161 open without a script error, and only one, Biology's phylogenetic tree builder, scrolls sideways (by 174 px).
- **Mathematical verification is uneven.** All 17 Physics modules have tests against textbook results; Biology has tests for 10 of its 29 modules, Chemistry 9 of 23, Psychology 8 of 24, Sociology 7 of 13 and Maths 9 of 11.
- **No interactive has had a subject-expert review.** Content reviews exist for some written schools; nothing equivalent exists for interactives.
- **The right next step is consistency, not more Physics.** The plan:
  1. Bring the 161 existing interactives up to one standard (§5) through shared foundation work (§6).
  2. Then fill the gaps in priority order: **Maths, Pharmacy, Nursing, Law**.
  3. Chemistry, Biology, Psychology and Sociology mostly need depth and verification, not new labs.

## 2. Coverage by course

"Lessons linked" counts lessons that list an interactive. "Schools with any" counts schools where at least one lesson links an interactive, or (Law, Nursing, Pharmacy) where an interactive is attached to the whole school.

| Course | Lessons (written) | Interactives | Workspace cases | Lessons linked | Schools with any | Placed in notes (`IX:` lines) |
|---|---|---|---|---|---|---|
| Physics | 1,308 (1,308) | 17 | – | 115 (8.8%) | 14 of 54 | 0 (shown at the end of lessons instead) |
| Maths | 1,077 (883) | 15 | 6 step-by-step | 54 (5.0%) | 12 of 29 | 0 |
| Pharmacy | 318 (275) | 1 | – | **0** | 2 of 19 (by school) | 0 |
| Nursing | 497 (497) | 3 | 6 clinical | **0** | 4 of 17 (by school) | 0 |
| Law | 480 (480) | 2 | 6 reasoning | **0** | 2 of 19 (by school) | 0 |
| Biology | 391 (50) | 30 | – | 91 (23.3%) | 14 of 14 | 8 |
| Chemistry | 460 (45) | 30 | – | 110 (23.9%) | 19 of 20 | 11 |
| Psychology | 393 (393) | 34 | – | 95 (24.2%) | 14 of 16 | 63 |
| Sociology | 438 (438) | 29 | – | 96 (21.9%) | 14 of 18 | 65 |
| **Total** | **5,362** | **161** | **18** | **561** | | |

**Schools with nothing yet:**
- **Maths:** u04 Abstract Algebra, u05 Geometry, u08 Multivariable Calculus, u14 Discrete Maths, u15 Graph Theory, u16 Logic, u17 Topology, u20 Modelling, u21 Financial Maths, u22 Time Series, u23 Signal Processing, u25 Control, u26–u29.
- **Pharmacy:** everything except u06 Calculations and u19 Registration Assessment.
- **Nursing:** everything except u03, u04, u06 and u09.
- **Law:** everything except u01 and u03.
- **Physics:** 40 of 54 schools.
- **Chemistry:** u11 Inorganic.
- **Psychology:** u01 Foundations, u12 Evolutionary.
- **Sociology:** u04 Culture, u07 Race and Migration, u08 Family, u12 Religion.

Biology and Chemistry have notes written for only 2 schools each so far (50 and 45 lessons). Their interactives are ahead of their written content.

## 3. Quality by course

| Course | Modules with tests against reference results | Challenges feed mastery | Shown inside lessons | Phone (no sideways scroll, no errors) | Offline | Expert review |
|---|---|---|---|---|---|---|
| Physics | 17 of 17 | No | Yes (end of lesson) | 17 of 17 | After first visit | None |
| Maths | 9 of 11 | **13 of 15** | Yes (end of lesson) | 15 of 15 | After first visit | None |
| Pharmacy | Shared calculator tested | No | **No** | 1 of 1 | After first visit | None |
| Nursing | Shared tools tested | No | **No** | 3 of 3 | After first visit | None |
| Law | Shared tools tested | No | **No** | 2 of 2 | After first visit | None |
| Biology | 10 of 29 | No | Yes | 29 of 30 (`phylo-build` overflows) | After first visit | None |
| Chemistry | 9 of 23 | No | Yes | 30 of 30 | After first visit | None |
| Psychology | 8 of 24 | No | Yes | 34 of 34 | After first visit | None |
| Sociology | 7 of 13 (+2 of 3 shared social-lab modules) | No | Yes | 29 of 29 | After first visit | None |

- **Offline:** the service worker caches 3 lab toolkit files at install; each individual lab is cached the first time it's opened online. That's acceptable, but it should be stated where learners can see it, or the most-used labs precached (§6, F5).
- **Shared tools:** the 10 shared tools in `kit/interactive/` (step checking, practice generation, clinical and legal scenario engines, NEWS2, pharmacy calculations, grapher) each have tests. `mathexpr.js` is used only through the others.

## 4. Sub-sites without courses

Of the 29 sub-site folders:
- **7 have courses**: Law, Maths, Nursing, Pharmacy, Psychology, Sociology, and SciGradify with Biology, Chemistry and Physics.
- **22 don't.** They offer the shared notes tools, a learning map and LifeOS, and 19 of all 29 sites have a 3D model page. Sport also has the body explorer and Med has the anatomy page.

Interactives should arrive with each sub-site's course rather than ahead of it. A lab with no lessons to link to can't be integrated, assessed or reviewed in context. This roadmap therefore covers the 9 existing courses.

## 5. The Gradify Interactive Standard

An interactive is **complete** only when all of these hold. The Physics labs set the bar for the first four; the rest is new for every course.

1. **A real model**, with its simplifications stated under it (`note`). An illustration says it is one (`kind: Illustrative model`).
2. **Meaningful controls**: every control changes something the learner should notice. Live readouts give the numbers.
3. **At least three challenges** that require doing something, not just looking.
4. **Verification:** the model's mathematics is exported as plain functions and tested against reference results (textbook values, exact solutions, conservation laws).
5. **Lesson integration:** linked to specific lessons (`lessons`, never just `schools`), so it appears inside them.
6. **Mastery evidence:** every challenge is mapped to the lesson it is evidence for (`evidence`), so meeting it, or trying and failing, is recorded.
7. **Works everywhere:** no script errors and no sideways scrolling on a phone; usable by touch and keyboard; text labels for what colour shows; and an offline statement (precached, or available after first open).
8. **Reviewed:** a dated subject-expert review record (§8) before it's labelled reviewed. Until then it's labelled "checked against reference results, not yet expert-reviewed".

## 6. The Gradify Interactive Engine: what exists and what's missing

**Most of the engine already exists.** What's missing is consistency.

| Part | Exists today | Missing |
|---|---|---|
| Lab toolkit (`kit/labs/lab.js`): canvas, controls, challenges, plots, solvers | Yes, used by 140 labs | Theme-aware colours: the planned light theme would need the toolkit's fixed dark palette replaced by tokens |
| Case engines (`kit/interactive/scenario.js`, `clinsim.js`, `reasoning.js`) | Yes: Law and Nursing workspaces, Nursing scenarios | Linked to lessons and to mastery evidence |
| Generated practice (`stepcheck.js`, `trainers.js`, `mathgen.js`, `pharmcalc.js`) | Yes | Linked to lessons and to mastery evidence |
| Course contract: `ctx.complete`, `onComplete`, `report` | Yes | One registry schema checked for every course |
| AI tutor awareness (`kit/course/lab-state.js`) | Yes, for every lab | – |
| Mastery evidence (`labOutcome`, `evidence` maps) | Yes | Maps for 148 of 161 interactives |
| Lesson placement (`IX:` lines, and labs shown at the end of linked lessons) | Yes | Law, Nursing and Pharmacy use `schools` instead of `lessons` |
| Verification tests | Physics complete; others partial | 48 untested lab modules |
| Browser checks | Site-wide page check; interactives checked ad hoc | A committed check that opens every interactive, desktop and phone |
| Expert review record | Content QA per school | Per-interactive review records and labels |

**Foundation tasks.** They come before the next large batch, and they raise every existing interactive at once.

| # | Task | Effort |
|---|---|---|
| F1 | `evidence` maps for all 148 interactives without one (challenge → lesson), so existing labs count towards mastery | 6 points |
| F2 | Law, Nursing and Pharmacy interactives linked to lessons, so they appear inside lessons | 0.5 |
| F3 | One registry test for every course, generalising `tests/physics-labs.test.mjs`: kind, note, lessons exist, evidence keys match challenges, files exist, lab styles on the page, offline list | 1 |
| F4 | `scripts/check-interactives.cjs`: every interactive opened on desktop and phone, with errors, sideways scrolling and drawing checked. Run before each deploy of interactive changes | 1 |
| F5 | Offline: precache the most-used labs, or show "available offline after first use" on the rest | 0.5 |
| F6 | Fix `phylo-build`'s phone overflow | 0.5 |
| F7 | Interactive review records: a review entry per interactive (reviewer role, date, scope, findings) and the labels in §5.8 | 2 |
| F8 | Keyboard use and text alternatives for canvas labs (a readout or table for what the drawing shows) | 3 |
| F9 | Verification tests for the 48 untested modules (Biology 19, Chemistry 14, Psychology 16, Sociology 6+1, Maths 2) | 12 |
| | **Foundation total** | **about 26 points** |

## 7. Proposed interactives by course

Each proposal is linked to lessons that exist today. They were found by searching the syllabus, and the lesson count and examples are shown. Every one is built to the standard in §5.

**Sizes:**
- **S** (0.5 points): one model, a few controls.
- **M** (1 point): a model with several modes, like most Physics labs.
- **L** (2 points): a large model or several linked views.

**Tiers:**
- **1:** high-traffic or foundational topics.
- **2:** the next layer.
- **3:** later.

### Maths (MathGradify): 28 proposed, 27 points

| Tier | Size | Interactive | What it models | Lessons it links to |
|---|---|---|---|---|
| 1 | M | **Circle theorems** | Drag points on a circle; angles update live and each theorem is checked as you move | 4 (`u05-04` Angles; `u05-06` Triangles; `u05-11` Circles; …) |
| 1 | M | **Transformations and symmetry** | Reflect, rotate, translate and enlarge shapes; compose transformations and find the single equivalent | 2 (`u05-24` Geometric Transformations; `u05-25` Transformations and Symmetry) |
| 1 | M | **Quadratics: roots, vertex and discriminant** | Coefficients drive the parabola; completing the square shown step by step; real, repeated and complex roots | 3 (`u03-11` Quadratic Equations; `u03-12` Completing the Square; `u03-13` The Quadratic Formula) |
| 1 | M | **The unit circle and trigonometric graphs** | A point on the unit circle traces sine, cosine and tangent; radians, identities and exact values | 9 (`u06-03` Sine; `u06-04` Cosine; `u06-06` Radians and Degrees; …) |
| 1 | M | **Sequences and series** | Arithmetic and geometric sequences, partial sums, convergence and divergence plotted term by term | 7 (`u01-25` Sequences of Numbers; `u07-39` Sequences and Series; `u07-40` Infinite Series; …) |
| 1 | S | **Exponentials and logarithms** | Growth and decay, doubling time, log scales and solving exponential equations | 4 (`u03-21` Logarithms; `u03-22` Exponential Equations; `u03-23` Logarithmic Equations; …) |
| 1 | M | **Taylor series** | Polynomials of rising degree hugging a function; radius of convergence and error bounds | 3 (`u07-42` Power Series; `u07-43` Taylor Series; `u07-44` Maclaurin Series) |
| 1 | S | **Eigenvectors: the vectors that don't turn** | Drag a vector under a matrix; eigenvectors stay on their line, scaled by the eigenvalue | 3 (`u11-24` Eigenvalues; `u11-25` Eigenvectors; `u11-26` Eigenspaces) |
| 1 | M | **Gaussian elimination** | Row operations step by step to echelon form; unique, no and infinitely many solutions | 2 (`u03-10` Simultaneous Equations; `u03-17` Simultaneous Inequalities) |
| 1 | M | **Probability trees and Bayes' theorem** | Screening tests: prevalence, sensitivity and specificity in a tree and a frequency grid | 3 (`u12-03` Independent Events; `u12-04` Conditional Probability; `u12-06` Bayes' Theorem) |
| 1 | M | **Probability distributions** | Binomial, Poisson and normal side by side; when one approximates another | 35 (`u12-10` Probability Distributions; `u12-13` Cumulative Distribution Functions; `u12-21` Bernoulli Distribution; …) |
| 1 | M | **Hypothesis tests, p-values and power** | Sampling distributions under the null; type I and II errors and power as sample size changes | 5 (`u13-13` Hypothesis Testing; `u13-14` Null Hypothesis Significance Testing; `u13-15` P-Values; …) |
| 1 | S | **Confidence intervals** | Repeated samples: how often 95% intervals contain the true value | 1 (`u13-10` Confidence Intervals) |
| 1 | S | **Counting: permutations, combinations, Pascal's triangle** | Arrangements built and counted; nCr from the triangle | 4 (`u14-03` Counting Principles; `u14-04` Permutations; `u14-05` Combinations; …) |
| 1 | M | **Compound interest, loans and mortgages** | Interest compounding, APR, amortisation schedules and the cost of a loan | 10 (`u21-02` Simple Interest; `u21-03` Compound Interest; `u21-05` Present Value; …) |
| 2 | M | **Volumes and surfaces of revolution** | Rotate a curve about an axis; discs and shells summed into the integral | 2 (`u07-38` Volumes of Revolution; `u08-15` Volume Integrals) |
| 2 | M | **Surfaces, partial derivatives and the gradient** | A 3D surface with its contour map; gradient arrows and directional derivatives | 4 (`u08-01` Multivariable Calculus; `u08-02` Directional Derivatives; `u08-03` Gradient; …) |
| 2 | L | **Vector fields, divergence and curl** | Flow particles through a field; line integrals, flux, Green's and Stokes' theorems | 6 (`u08-10` Divergence; `u08-11` Curl; `u08-13` Line Integrals; …) |
| 2 | M | **Phase planes for systems of ODEs** | Trajectories, fixed points and their stability from the eigenvalues | 12 (`u10-12` Systems of Differential Equations; `u10-39` Dynamical Systems; `u10-40` Stability Analysis; …) |
| 2 | L | **Graph algorithms** | Dijkstra, BFS, DFS and minimum spanning trees run step by step on graphs you draw | 4 (`u15-10` Spanning Trees; `u15-21` Shortest Path Algorithms; `u15-22` Shortest Path Problems; …) |
| 2 | S | **Euler and Hamilton paths** | Find routes that use every edge or visit every vertex; the degree condition | 2 (`u15-15` Eulerian Paths; `u15-16` Hamiltonian Paths) |
| 2 | M | **Truth tables and logic circuits** | Build expressions or gates; truth tables, equivalence and normal forms | 11 (`u14-17` Boolean Functions; `u16-19` Boolean Lattices; `u16-20` Mathematical Logic; …) |
| 2 | S | **Sets and Venn diagrams** | Set operations shaded live; counting with inclusion–exclusion | 11 (`u14-08` Inclusion–Exclusion Principle; `u16-01` Elementary Set Theory; `u16-02` Set Theory; …) |
| 2 | M | **Fourier series** | Add harmonics to build square, saw and triangle waves; Gibbs overshoot | 3 (`u06-29` Fourier Series; `u06-30` Fourier Analysis; `u10-17` Fourier Transform Methods) |
| 2 | M | **The SIR epidemic model** | Infection and recovery rates, R₀, herd immunity and vaccination | 12 (`u20-02` Mathematical Modelling; `u20-09` Biological Modelling; `u20-13` Ecological Modelling; …) |
| 2 | M | **Time series: trend, seasonality and smoothing** | Decompose real data; moving averages and exponential smoothing forecasts | 9 (`u22-02` Time Series Decomposition; `u22-03` Trend Analysis; `u22-04` Seasonality; …) |
| 2 | M | **Control: a PID controller** | Tune P, I and D on a simple plant; overshoot, settling and steady-state error | 5 (`u25-10` Feedback Control; `u25-11` PID Control; `u25-12` Stability Theory; …) |
| 3 | M | **Fractals and iterated maps** | Mandelbrot and Julia sets, the logistic map and fractal dimension | 1 (`u10-42` Chaos Theory) |

### Pharmacy (PharmaGradify): 11 proposed, 11 points

| Tier | Size | Interactive | What it models | Lessons it links to |
|---|---|---|---|---|
| 1 | L | **One-compartment pharmacokinetics** | IV bolus, infusion and oral dosing: Cmax, tmax, half-life, clearance, volume of distribution, AUC | 8 (`u03-01` Introduction to pharmacokinetics; `u03-03` Absorption and bioavailability; `u03-05` Distribution and volume of distribution; …) |
| 1 | M | **Repeated dosing and steady state** | Accumulation, time to steady state, loading doses and missed doses | 1 (`u03-13` Steady state and accumulation) |
| 1 | M | **Dose–response and receptor theory** | EC₅₀, Emax and Hill slope; full and partial agonists; competitive and non-competitive antagonists | 7 (`u02-03` Receptors and receptor families; `u02-04` Agonists and antagonists; `u02-05` Dose-response relationships; …) |
| 1 | S | **Therapeutic window and index** | Efficacy and toxicity curves; why narrow-therapeutic-index drugs need monitoring | 2 (`u02-21` Drug toxicity and overdose; `u03-17` Therapeutic drug monitoring) |
| 1 | M | **Renal function and dose adjustment** | Creatinine clearance (Cockcroft–Gault) and how it changes a renally cleared drug's levels | 4 (`u12-08` Acute kidney injury; `u12-09` Chronic kidney disease; `u15-05` Older people; …) |
| 1 | M | **Ionisation, pKa and absorption** | Henderson–Hasselbalch: the un-ionised fraction across the gut, and why it matters | 4 (`u03-03` Absorption and bioavailability; `u04-02` Acids, bases and pKa; `u04-03` Ionisation and the Henderson-Hasselbalch equation; …) |
| 2 | M | **Dissolution and drug release** | Noyes–Whitney, particle size, immediate and modified release profiles | 3 (`u05-02` Solubility and dissolution; `u05-10` Tablets; `u05-12` Modified-release dosage forms) |
| 2 | M | **Antimicrobial PK/PD** | MIC, time above MIC, AUC/MIC and Cmax/MIC for time- and concentration-dependent killing | 5 (`u11-01` Microbiology for pharmacists; `u11-02` Antibiotic classes and mechanisms; `u11-03` Antimicrobial resistance; …) |
| 2 | M | **Pharmacokinetic drug interactions** | Enzyme inhibition and induction changing another drug's clearance and levels | 2 (`u02-20` Mechanisms of drug interactions; `u17-03` Drug interactions in practice) |
| 2 | M | **Non-linear (saturable) kinetics** | Michaelis–Menten elimination: why small dose rises can cause large level rises (phenytoin) | 1 (`u03-15` Linear and non-linear kinetics) |
| 3 | S | **Antimicrobial resistance selection** | A mixed bacterial population under treatment: why incomplete courses and low doses select resistance | 2 (`u11-03` Antimicrobial resistance; `u11-04` Antimicrobial stewardship) |

### Nursing (NurseGradify): 9 proposed, 7.5 points

| Tier | Size | Interactive | What it models | Lessons it links to |
|---|---|---|---|---|
| 1 | M | **Oxygen–haemoglobin dissociation** | Saturation against PO₂, and the shifts with pH, CO₂, temperature and 2,3-BPG | 3 (`u02-12` Respiratory system; `u02-13` Gas exchange; `u05-12` Respiratory disease) |
| 1 | M | **Arterial blood gases** | Interpret pH, PaCO₂ and HCO₃⁻: respiratory and metabolic causes and compensation | 3 (`u02-24` Acid-base balance; `u09-08` Acute respiratory failure; `u09-15` Oxygenation and ventilation) |
| 1 | M | **IV infusions and drip rates** | Rates in mL/h and drops per minute, infusion times and pump checks, with worked feedback | 3 (`u04-21` Intravenous medication principles; `u06-10` Fluid balance monitoring; `u06-21` Intravenous therapy principles) |
| 1 | S | **Glasgow Coma Scale** | Score eye, verbal and motor responses from described patient presentations | 2 (`u03-14` Neurological observations; `u09-10` Acute neurological conditions) |
| 1 | M | **The cardiac cycle and ECG rhythms** | Reuses the Biology heart model; sinus rhythm, tachy- and bradycardia, AF and what they do to output | 7 (`u02-10` Cardiovascular system; `u02-11` Blood and circulation; `u05-05` Cardiovascular disease; …) |
| 2 | S | **Fluid balance** | Intake, output and insensible losses over a shift; the body's water compartments | 3 (`u02-22` Fluid balance; `u02-24` Acid-base balance; `u06-10` Fluid balance monitoring) |
| 2 | M | **Infection spread on a ward** | An outbreak model where hand hygiene, isolation and cleaning change the attack rate | 9 (`u08-06` Transmission routes; `u08-07` Chain of infection; `u08-09` Hand hygiene; …) |
| 2 | M | **Blood pressure measurement** | Cuff deflation with Korotkoff sounds; common errors (cuff size, arm position, deflation rate) | 4 (`u03-07` Vital signs; `u03-11` Blood pressure; `u03-14` Neurological observations; …) |
| 2 | S | **Paediatric weight-based doses and observations** | mg/kg calculations with maximum-dose checks; age-banded normal ranges | 18 (`u11-01` Introduction to paediatric nursing; `u11-02` Child development; `u11-06` Communication with children; …) |

### Law (LawGradify): 10 proposed, 9 points

| Tier | Size | Interactive | What it models | Lessons it links to |
|---|---|---|---|---|
| 1 | M | **Statutory interpretation** | Apply the literal, golden, mischief and purposive approaches to the same provision and see outcomes diverge | 1 (`u01-12` Statutory interpretation) |
| 1 | M | **Offer and acceptance timeline** | Messages on a timeline: offers, counter-offers, revocation and the postal rule decide if and when a contract formed | 3 (`u03-02` Agreement and offer; `u03-03` Acceptance; `u03-04` Communication of acceptance) |
| 1 | M | **Negligence: duty, breach, causation, remoteness** | Work through a scenario element by element; change facts and see which element fails | 8 (`u04-02` Negligence; `u04-03` Duty of care; `u04-06` Breach of duty; …) |
| 1 | M | **Homicide and mens rea** | Facts change the offence: murder, voluntary and involuntary manslaughter, with the defences that apply | 9 (`u05-02` Actus reus; `u05-03` Mens rea; `u05-04` Coincidence of actus reus and mens rea; …) |
| 1 | S | **Contract remedies and damages** | Expectation and reliance losses, remoteness and mitigation in worked figures | 2 (`u03-29` Contractual remedies; `u03-30` Damages) |
| 2 | S | **The three certainties of a trust** | Draft a gift; see whether intention, subject matter and objects are certain enough | 4 (`u09-04` Express trusts; `u09-08` Certainty of intention; `u09-09` Certainty of subject matter; …) |
| 2 | M | **Defences: self-defence and loss of control** | Vary the threat and the response; proportionality and the statutory tests | 4 (`u05-14` Diminished responsibility; `u05-15` Loss of control; `u05-29` Defences; …) |
| 2 | M | **Limitation and civil procedure timeline** | Key CPR steps and limitation periods laid out from the date a claim arises | 5 (`u12-02` Pre-action protocols; `u12-03` Letter before claim; `u12-04` Limitation; …) |
| 2 | M | **Intestacy distribution** | Who inherits when there's no will, from family circumstances (statutory amounts to be verified at build time) | 3 (`u10-01` Introduction to succession law; `u10-09` Intestacy; `u10-19` Proprietary estoppel in succession) |
| 3 | M | **Registered land priority** | Order of registration, overriding interests and actual occupation in a dispute | 1 (`u07-09` Land registration) |

### Physics, phase 2 (SciGradify): 8 proposed, 7.5 points

| Tier | Size | Interactive | What it models | Lessons it links to |
|---|---|---|---|---|
| 2 | M | **Rotational dynamics** | Torque, moment of inertia, angular momentum and rolling races down a slope | 10 (`u05-03` Torque and moment of force; `u05-04` Moment of inertia; `u05-05` Rotational kinetic energy; …) |
| 2 | M | **Fluids: buoyancy and flow** | Archimedes, Bernoulli and viscous flow through pipes | 7 (`u08-04` Buoyancy and Archimedes' principle; `u08-08` Conservation of mass in fluid flow; `u08-09` Bernoulli's equation; …) |
| 2 | M | **Heat engines on a PV diagram** | Isothermal, adiabatic, isobaric and isochoric steps; the Carnot cycle and efficiency | 6 (`u12-09` Pressure-volume diagrams; `u12-10` Isothermal processes; `u12-11` Adiabatic processes; …) |
| 2 | M | **Electromagnetic induction and generators** | Move a magnet or coil: flux, Faraday's and Lenz's laws, AC generation | 6 (`u17-09` Magnetic flux; `u17-10` Electromagnetic induction; `u17-11` Faraday's law; …) |
| 2 | M | **AC circuits and resonance** | Phasors, reactance and impedance; RLC resonance and filters | 5 (`u16-16` Alternating current; `u16-18` Impedance and reactance; `u16-19` Phasor diagrams; …) |
| 2 | M | **Atomic spectra and energy levels** | Hydrogen transitions, emission and absorption lines, the Rydberg formula | 6 (`u21-03` Bohr model; `u21-07` Atomic energy levels; `u21-08` Hydrogen and hydrogen-like atoms; …) |
| 3 | M | **Stars on the Hertzsprung–Russell diagram** | Mass sets luminosity, temperature and lifetime; stellar evolution tracks | 11 (`u30-02` Stellar structure and evolution; `u30-03` Star formation; `u30-04` Hydrostatic equilibrium in stars; …) |
| 3 | S | **The logistic map and the Lorenz attractor** | Period doubling to chaos; sensitive dependence in a 3D flow | 5 (`u38-05` Bifurcation theory; `u38-06` Period-doubling; `u38-10` Strange attractors; …) |

### Chemistry gaps: 2 proposed, 1.5 points

| Tier | Size | Interactive | What it models | Lessons it links to |
|---|---|---|---|---|
| 2 | M | **Transition metals and crystal field splitting** | d-orbital splitting, ligand strength and the colour of complexes | 7 (`u11-05` Transition metal chemistry; `u11-07` Ligands; `u11-09` Isomerism in complexes; …) |
| 3 | S | **Born–Haber cycles and lattice energy** | Build the cycle; ionic radius and charge drive lattice energy | 2 (`u04-19` Lattice enthalpy; `u04-20` Born-Haber cycles) |

### Psychology gaps: 2 proposed, 1.5 points

| Tier | Size | Interactive | What it models | Lessons it links to |
|---|---|---|---|---|
| 2 | M | **Evolutionary game theory** | Hawks and doves: evolutionarily stable strategies and frequency-dependent selection | 10 (`u12-02` Natural selection; `u12-03` Sexual selection; `u12-06` Kin selection and inclusive fitness; …) |
| 3 | S | **The replication crisis** | Simulate many studies with small samples and flexible analysis; how false positives multiply | 1 (`u16-19` Open science and the replication crisis) |

### Sociology gaps: 2 proposed, 1.5 points

| Tier | Size | Interactive | What it models | Lessons it links to |
|---|---|---|---|---|
| 2 | M | **Migration flows** | Explore real migration data (sources to be confirmed and licensed): push and pull, net migration over time | 4 (`u07-13` International migration; `u07-14` Forced migration; `u07-17` Multiculturalism and migration; …) |
| 3 | S | **Household and family change** | Household composition, marriage and divorce trends from official data (sources to be confirmed) | 9 (`u08-01` What is a family?; `u08-02` Family structures; `u08-07` Marriage; …) |



Chemistry's and Biology's suggested topics are largely covered already. Molecular geometry (VSEPR), reaction kinetics, equilibrium, titration and thermodynamics exist in Chemistry; genetics, cellular processes, enzyme kinetics, population dynamics and physiology exist in Biology. Their work is F1, F9 and an accuracy review, plus the two Chemistry gaps above.

## 8. Subject-expert review

Passing numerical tests shows a model behaves as expected in the tested cases. It doesn't show that:
- the explanations teach well
- the simplifications suit the level
- the challenges assess the intended outcomes
- the visuals lead to the right interpretation

**Proposed process** (needs an owner decision on reviewers and budget, §10):

1. **Who reviews:**
   - **Physics, Maths, Chemistry, Biology:** a qualified teacher or university lecturer in the subject.
   - **Pharmacy:** a registered pharmacist (GPhC).
   - **Nursing:** a registered nurse (NMC), ideally a nurse educator.
   - **Law:** a solicitor or barrister for England and Wales, with a currency check of statutory figures at each review.
   - **Psychology and Sociology:** a lecturer, with a data-sources check for real-data explorers.
2. **What they check:** model accuracy at the stated level, the simplifications, the wording, the challenges against the lesson's objectives, and possible misconceptions.
3. **The record:** findings are fixed, then the interactive's review record is dated and it can be labelled reviewed.
4. **Re-review:** whenever the model changes materially, and for Law, Pharmacy and Nursing whenever the guidance or law it relies on changes.
5. **Order:** reviews follow risk:
   1. **Pharmacy and Nursing first:** clinical calculations and dosing. These are learning models, never for real patients, and labelled so.
   2. **Law:** statutory figures change.
   3. **Maths and the sciences.**

## 9. Order, effort and milestones

**Effort** is in points: 1 point ≈ one Physics-style lab including its tests and browser checks.
- The Physics batch was 17 points, built in one long working session.
- For a human developer, 1 point is very roughly half a day. This is unverified and will vary with the developer.
- Clinical and legal interactives also need careful authoring of scenarios and figures, so their estimates include 50% extra.

| Stage | What | Points | Roughly, in sessions like the Physics one |
|---|---|---|---|
| A | **Foundation** F1–F6 (evidence maps, lesson links, registry test, interactive check, offline, phone fix) | 9.5 | 0.5–1 |
| B | **Maths, tier 1** (15 interactives) | 13 | 1 |
| C | **Pharmacy, tiers 1–2** (10) | 16 (incl. 50% extra) | 1 |
| D | **Nursing, tiers 1–2** (9) | 11 (incl. 50% extra) | 0.5–1 |
| E | **Law, tiers 1–2** (9) | 12 (incl. 50% extra) | 0.5–1 |
| F | **Maths, tiers 2–3** (13) | 14 | 1 |
| G | **Verification and accessibility** F7–F9 across the existing collections | 17 | 1 |
| H | **Physics phase 2** (8) and the Chemistry, Psychology and Sociology gaps (6) | 12 | 1 |
| | **Total** | **about 104** | **about 7–8** |

**Milestones:**
- **After A:** every existing interactive counts towards mastery, appears inside its lessons, and is checked automatically on desktop and phone.
- **After B–E:** every course has substantial lesson-linked interactives (Maths 30, Pharmacy 11, Nursing 12, Law 11).
- **After F–H:** about 230 interactives, all meeting the standard apart from expert review.

Expert review runs in parallel once reviewers are found. Its timing depends on them and is unverified.

**How each batch is run:**
- Build on the shared toolkit and engines; merge other sessions' work before starting and again before pushing.
- Run the full test suite, the site check and the interactive check before deploying.
- Verify on getgradify.com afterwards.
- Supabase stays untouched unless separately approved.

## 10. Decisions for the owner

| # | Decision | Recommendation |
|---|---|---|
| I1 | Approve Stage A (foundation) before any new interactives | Yes: it raises all 161 at once and makes later batches cheaper |
| I2 | Order of Stages B–E | Maths, Pharmacy, Nursing, Law, as you proposed |
| I3 | Expert reviewers per subject, and a budget | Start with a pharmacist and a nurse educator for the clinical items |
| I4 | Whether interactives are labelled "not yet expert-reviewed" until reviewed | Yes |
| I5 | Real-data explorers (Sociology migration and family): which official sources, and their licences | Office for National Statistics data under the Open Government Licence, to be confirmed |
| I6 | Offline: precache the most-used labs (larger first download) or label as available after first use | Label for now; precache the top 20 once usage data exists |

## 11. Method

- **Counts and coverage:** read from each course's registry (`kit/courses/*/course.js` and `interactives.js`) and notes on 7 November 2026.
- **Verification counts:** lab modules imported by test files.
- **Mastery:** interactives with a non-empty `evidence` map, which is what `kit/course/course.js` needs to record lab evidence.
- **Phone:** every registered interactive opened in Chromium at iPhone 13 size on a local copy of the site, checking script errors, sideways overflow and whether it drew.
- **Proposed lesson links:** each proposal's keywords searched against lesson titles in its schools. The links are confirmed and refined when each interactive is built.

**Not covered:**
- Accessibility beyond overflow.
- Real devices other than Chromium.
- Accuracy review of existing content.
