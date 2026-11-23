# Maths diagrams: handover

Updated 23 Nov 2026 by lead session 01PJjzVE. **New here? Read `kit/diagrams/LEAD.md` first** (setup, launching agents,
landing, updating this file). Agents follow `UNIT-AGENT.md` in this folder; the bar is `kit/diagrams/BUILDERS.md`.

## Next step

1. Check the claims table below; the units in it may have landed since this was written:
   `git log origin/main --oneline -- kit/diagrams/plans/maths/` and `node scripts/diagrams/unit-status.mjs maths`.
2. Units not started and not claimed, in suggested order: u16, u18, u19, u20, u21, u22, u23, u24, u25, u26, u27, u28,
   u29, then u15. Give one agent three at a time (the owner's instruction: one maths agent and one physics agent,
   three units each, push after every unit).
3. u15 Graph Theory and Networks is mostly drawings of networks, and there is no network renderer yet (see
   "Renderers"); build that renderer before u15 if possible, otherwise its lessons become `null, "needs renderer …"`.

## Status (`node scripts/diagrams/unit-status.mjs maths`, 23 Nov 2026)

| unit | title | status | lessons | planned | diagrams (`maths-uNN-*`) | lessons with a lab | lessons with no visual | failing |
|---|---|---|---:|---:|---:|---:|---:|---:|
| u01 | Number and Arithmetic | done | 29 | 29 | 17 | 11 | 7 | 0 |
| u02 | Number Theory and Cryptography | done | 36 | 36 | 8 | 11 | 17 | 0 |
| u03 | Algebra | done | 45 | 45 | 31 | 14 | 12 | 0 |
| u04 | Abstract Algebra | done | 22 | 22 | 7 | 0 | 15 | 0 |
| u05 | Geometry | done | 50 | 50 | 32 | 6 | 16 | 0 |
| u06 | Trigonometry | done | 30 | 30 | 29 | 0 | 1 | 0 |
| u07 | Calculus | not started | 44 | 0 | 0 | 0 | 0 | 0 |
| u08 | Multivariable and Vector Calculus | done | 22 | 22 | 8 | 2 | 13 | 0 |
| u09 | Analysis | done | 14 | 14 | 8 | 0 | 6 | 0 |
| u10 | Differential Equations | done | 46 | 46 | 15 | 2 | 29 | 0 |
| u11 | Linear Algebra and Matrices | done | 50 | 50 | 13 | 6 | 33 | 0 |
| u12 | Probability | done | 50 | 50 | 36 | 7 | 12 | 0 |
| u13 | Statistics | done | 75 | 75 | 33 | 5 | 42 | 0 |
| u14 | Discrete Mathematics and Combinatorics | done | 23 | 23 | 6 | 0 | 17 | 0 |
| u15 | Graph Theory and Networks | not started | 44 | 0 | 0 | 0 | 0 | 0 |
| u16 | Logic, Sets and Foundations | not started | 52 | 0 | 0 | 0 | 0 | 0 |
| u17 | Topology and Advanced Pure Mathematics | done | 22 | 22 | 12 | 0 | 9 | 0 |
| u18 | Optimisation and Operations Research | not started | 43 | 0 | 0 | 0 | 0 | 0 |
| u19 | Numerical Analysis and Scientific Computing | not started | 37 | 0 | 0 | 0 | 0 | 0 |
| u20 | Mathematical Modelling and Applied Mathematics | not started | 51 | 0 | 0 | 0 | 0 | 0 |
| u21 | Financial Mathematics and Economics | not started | 45 | 0 | 0 | 0 | 0 | 0 |
| u22 | Time Series and Forecasting | not started | 34 | 0 | 0 | 0 | 0 | 0 |
| u23 | Information Theory and Signal Processing | not started | 24 | 0 | 0 | 0 | 0 | 0 |
| u24 | Mathematics for Machine Learning and AI | not started | 35 | 0 | 0 | 0 | 0 | 0 |
| u25 | Control Theory and Systems | not started | 30 | 0 | 0 | 0 | 0 | 0 |
| u26 | Mathematical Reasoning and Research Methods | not started | 21 | 0 | 0 | 0 | 0 | 0 |
| u27 | Mathematical Software and Tools | not started | 50 | 0 | 0 | 0 | 0 | 0 |
| u28 | School and Examination Mathematics | not started | 25 | 0 | 0 | 0 | 0 | 0 |
| u29 | Everyday and Practical Mathematics | not started | 28 | 0 | 0 | 0 | 0 | 0 |
| all | | 14 of 29 done | 1077 | 514 | 255 | 64 | 229 | 0 |

Every diagram is `validated` (its checks pass); none has had a subject review yet.

## Unit claims (read before starting a unit)

A unit listed here is being built; don't start it in another session. Remove the row when the unit is on main.

| Units | Claimed by |
|---|---|
| u07 (u04 and u06 landed) | lead session 01PJjzVE, agent M1 (worktree /home/user/wt-m1, branch diagrams/m1) |

## Unit notes

- **u01** Number: 17 diagrams; labs sieve and practice. Commit b2450b4c (with the renderers, tests and tooling).
- **u02** (agent maths-a): 8 diagrams (geometry 6, graph 1, sequence 1); labs modular and sieve; lattice and Argand
  drawn with geometry + axes. No renderer lacked.
- **u03** Algebra (agent maths-a): 30 diagrams (graph 21, geometry 5, number-line 2, sequence, venn) plus the existing
  `maths-transformations`; labs quadratics, practice, explog, grapher, complex. No renderer lacked.
- **u04** Abstract algebra (ae57d642, agent M1): 7 diagrams; full note to follow from the agent's report.
- **u05** Geometry (agent maths-a): 32 diagrams (geometry 22, graph 7, transform, number-line); labs circles, practice,
  matrix. Lacks 3D solids/nets/coordinates, spherical and hyperbolic geometry, surfaces, knots, Buffon's needle.
- **u06** Trigonometry (be069979, agent M1): 29 diagrams; full note to follow from the agent's report.
- **u08** Multivariable and vector calculus: 8 diagrams; lab descent on 2 lessons. Lacks 3D surfaces/fields (9
  lessons) and conics.
- **u09** Analysis (df08995a, agent M2): 8 diagrams (graph 7, bar-model), 6 lessons without; no renderer lacked.
- **u10** Differential equations (lead session 01H1szfk): 15 diagrams; 2 lab rows. Lacks phase portraits, cobweb diagrams, 3D surfaces.
- **u11** Linear algebra: 13 diagrams (geometry vectors, transform, graph); lab matrix on 6 lessons. Lacks 3D vectors
  and planes (10 lessons) and conics (u11-32).
- **u12** Probability (agent maths-c): 36 diagrams (graph, distribution, barchart, venn, prob-tree, number-line,
  bar-model); labs lln, clt, practice. Continuous families (gamma, beta, chi-squared, Weibull, log-normal, Pareto,
  Cauchy, Gumbel) drawn with `graph` + area checks. Cosmetic: on the narrow layout the "median" label touches the
  "density" axis label on the log-normal and Pareto diagrams.
- **u13** Statistics (agent maths-c): 33 diagrams (boxplot, scatter, number-line intervals, distribution, graph,
  barchart, bar-model); labs regression, clt.
- **u14** Discrete mathematics and combinatorics (lead session 01H1szfk): 6 diagrams; 17 lessons without, mostly for lack of a network renderer.
- **u17** Topology and advanced pure mathematics (20ac813d, agent M3): 11 diagrams in 12 lessons
  (`maths-u17-stereographic-charts` is placed in u17-16 and u17-19; `place.mjs` ignores `also`, so the second D: line
  was added by hand), 10 lessons without. Lacks surfaces/polyhedra (u17-01, 09, 14, 18), knot diagrams (u17-15),
  category diagrams (u17-22).

## Scouting notes for unbuilt units

From agent M2, which read the worked examples (X: lines) of u15 and u16 but planned nothing:
- u15: most examples are small graphs and networks (needs the network renderer). Fit existing renderers: u15-27
  bar-model (strength 16 → 13), u15-36 binomial distribution (n = 99, p = 0.1, mean 9.9), u15-41 bar-model (density
  22/66), u15-44 bar-model (mean of 2, 4, 6, 8 is 5).
- u16: candidates u16-03 set operations and u16-05 complements (venn), u16-06 Cartesian product grid and u16-15 Hasse
  diagram (geometry), u16-04 nested intervals and u16-17 lexicographic order (number-line), u16-12 f(x) = 3x − 5 (graph).

## Lesson errors

Agents report errors in a lesson's own text and leave it without a diagram; the owner decides the fix.

- Fixed: **u13-50** (Multivariate analysis) gave eigenvalues 4.2, 1.5, 0.2, 0.1 for four standardised variables (sum 6;
  must be 4). Now 2.8, 1.0, 0.16, 0.04; the 70 %, 25 %, 95 % figures are unchanged. Commit 8c1fc41f.
- Open: none.

## Renderers

Available (each recomputes what it shows and checks the layout at both widths; `fromLesson` phrases must appear in the
notes): `kit/diagrams/maths-renderers.js` number-line, sequence, factor-tree, bar-model, venn, prob-tree;
`maths-renderers-2.js` geometry (also vectors with `grid`; the name `vectors` is physics'), transform;
`maths-renderers-3.js` histogram, boxplot, scatter, barchart, distribution; shared `graph`. Core maths in
`maths-core.js`, layout in `maths-layout.js`, tests in `tests/maths-diagrams.test.mjs`. Renderer names are global:
`grep -n "register(" kit/diagrams/*-renderers*.js` before adding one.

Missing, by how many plan rows need them (`node scripts/diagrams/unit-status.mjs maths --needs` lists all 51):

| renderer | rows | where |
|---|---:|---|
| 3D vectors, planes, surfaces and fields | 19 | u05, u08, u10-23, u11 |
| network / graph theory (vertices, coloured edges, state diagrams) | 5 so far | u13-66, u14; u15 will need many |
| 3D solids and nets | 5 | u05 |
| step functions (empirical CDF, Kaplan-Meier) | 2 | u12-47, u13-70 |
| two-way tables | 2 | u12-17, u13-34 |
| ellipses / conics, ellipse contours | 3 | u08-08, u11-32, u13-49 |
| phase portraits, cobweb diagrams | 3 | u10 |
| one each: negative binomial, 2D density, matrix-variate, points in a region, spherical, hyperbolic, surfaces, knots, Buffon's needle, curvature, cellular grid, spectral coefficients | | u05, u10, u12, u13, u14 |

Building renderers is lead work (shared files, tests in `tests/maths-diagrams.test.mjs`); after one lands, revisit the
`null, "needs renderer …"` rows it covers.

## WIP branches

None live for maths. `wip/maths-c` (u12) and `wip/maths-u14` (u14) are superseded by main and can be deleted.

## Later

- Subject review of every diagram (record `review` in the spec via the batch script; `mk` keeps it).
- Interactive versions (draggable number-line point, bar-model slider) need a shared change to
  `kit/diagrams/visual.js`; proposal only.
