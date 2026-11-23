# Maths diagrams: handover

Read with `kit/diagrams/maths/UNIT-AGENT.md` (the per-unit recipe) and `kit/diagrams/BUILDERS.md`.

## Done (first release to main)

Renderer names are global: check `grep -n "register(" kit/diagrams/*-renderers*.js` before adding one.

- Renderers (each recomputes the maths it shows, plus a layout check: every label inside the viewBox and not
  overprinting, at both widths; parts of a bar must fit their label; `fromLesson` phrases must be in the lesson's notes):
  - `kit/diagrams/maths-renderers.js`: number-line, sequence, factor-tree, bar-model, venn (counts, probabilities, HCF/LCM
    products, nested ℕ⊂ℤ⊂ℚ⊂ℝ), prob-tree
  - `kit/diagrams/maths-renderers-2.js`: geometry (also draws vectors; the renderer name `vectors` is physics'), transform
  - `kit/diagrams/maths-renderers-3.js`: histogram, boxplot, scatter, barchart, distribution
  - `kit/diagrams/maths-core.js` (exact fractions, stats, distributions, geometry), `kit/diagrams/maths-layout.js`
- Tests: `tests/maths-diagrams.test.mjs` (core maths against known answers; for every renderer a correct spec passes at
  both widths and a spec with one wrong number fails).
- Tooling: `scripts/diagrams/maths/spec.mjs` (mk), `place.mjs` (D: after the worked example), `registry.mjs`
  (updateRegistry for maths), batch `u01.mjs`.
- Plan: `kit/diagrams/plans/maths.mjs` = concat of `plans/maths/u01..u29.mjs`; only u01 is filled.
- Unit 1 complete: 17 diagrams placed (`maths-u01-*`), all checks pass, status `validated` (no subject review yet).

## Coverage (`node scripts/diagrams/coverage.mjs maths`)

29 lessons assessed · 22 with a visual planned · 17 with a passing diagram · 11 with a lab (6 both) · 7 without one by
design · 0 planned but not placed · 0 failing. 18 placements of 18 ids (17 u01 + maths-transformations in u03).

## Unfinished / next steps

1. Units u02–u29: one agent per unit following UNIT-AGENT.md. Suggested order by renderer fit: u05 geometry, u12
   probability, u13 statistics, u06 trigonometry (geometry + graph), u03 algebra (graph, number-line inequalities),
   u07 calculus (graph area/slope), u11 linear algebra (transform, vectors).
2. Renderers not built yet (plan such lessons `null, "needs renderer X"`): networks/graph theory (u15), 3D solids and
   nets (u05 solid geometry), complex plane / Argand (could use geometry with axes), cumulative frequency curves
   (graph `series` works), contingency/two-way tables.
3. Subject review of the 17 u01 diagrams (record in each spec's `review`, rebuild).
4. Interactive versions: u01 uses existing labs (sieve, practice). A draggable number-line point or a slider for the
   bar model would need `kit/diagrams/visual.js` (shared): not done, proposal only.

## Commits

- b2450b4c (main): renderers, tests, tooling, Unit 1. Full `npm test` 1089/1089 pass; tests/renderer-names.test.mjs
  passes (maths renderer names are unique; do not reuse physics' `vectors`).

## Unit rows

- u02 (agent maths-a): 36 lessons assessed; 8 diagrams (geometry 6, graph 1, sequence 1), 10 lab rows (modular 8, sieve 3 incl. shared), 18 null with reasons. All checks pass. Needed renderers: none missing (lattice/Argand drawn with geometry+axes).
- u11 (Linear Algebra): 50 lessons assessed; 13 diagrams (`maths-u11-*`: geometry vectors, transform, graph), lab `matrix` on 6 lessons;
  rest null with reasons. Lacks: 3D vectors/planes (10 lessons), conics (u11-32).
## Unit u12 (Probability) — agent maths-c

50 lessons assessed · 36 diagrams (graph/distribution/barchart/venn/prob-tree/number-line/bar-model) · 7 lab rows (lln, clt, practice) · 12 with a recorded reason, 5 of them needing renderers: two-way table (u12-17), negative binomial in `distribution` (u12-24), 2D density (u12-43), matrix-variate (u12-45), empirical CDF step function (u12-47). Continuous families (gamma, beta, chi-squared, Weibull, log-normal, Pareto, Cauchy, Gumbel) are drawn with `graph` + area checks.
- u03 (agent maths-a): 45 lessons assessed; 30 diagrams (graph 21, geometry 5, number-line 2, sequence, venn; plus the existing maths-transformations), labs on 16 rows (quadratics, practice, explog, grapher, complex), 14 null with reasons. All checks pass. No missing renderer.

## Unit u13 (Statistics) — agent maths-c

75 lessons assessed · 33 diagrams (boxplot, scatter, number-line intervals, distribution, graph, barchart, bar-model) · 5 lab rows (regression, clt) · 39 with a recorded reason. Renderers needed: two-way table (u13-34), Mahalanobis ellipse contours (u13-49), points-in-region Monte Carlo (u13-60), path diagram (u13-66), Kaplan-Meier step curve (u13-70). Content note for the author: u13-50 gives eigenvalues 4.2, 1.5, 0.2, 0.1 for four standardised variables, which sum to 6, not 4. FIXED 23 Nov: eigenvalues now 2.8, 1.0, 0.16, 0.04 (sum 4).

## Content issues for the owner

- u13-50 (Multivariate Analysis): the worked example gives eigenvalues 4.2, 1.5, 0.2 and 0.1 for four standardised variables; they sum to 6, but the eigenvalues of a 4 × 4 correlation matrix sum to 4. No diagram was made. FIXED 23 Nov: eigenvalues now 2.8, 1.0, 0.16, 0.04 (sum 4).
- u05 (agent maths-a): 50 lessons assessed; 32 diagrams (geometry 22, graph 7, transform 1, number-line 1, plus...), labs on 6 rows (circles, practice, matrix), rest null with reasons. All checks pass. Missing renderers: 3D solids/nets/coordinates (u05-03, 20, 21, 23, 30), spherical (35, 36), hyperbolic (37), surfaces/torus (49), knot diagrams (50), Buffon's needle (44), curved-surface curvature (46).
- u08 (Multivariable and Vector Calculus): 22 lessons assessed; 8 diagrams (`maths-u08-*`), lab `descent` on 2; rest null with reasons.
  Lacks: 3D surfaces/fields (9 lessons), conics.

## Unit claims (read before starting a unit)

A unit listed here is being built; don't start it in another session. Remove the row when the unit is on main.
Claimed 23 Nov 2026 (the earlier claims by session 01H1szfk lapsed when its agents stopped; units on main are removed).

| Units | Claimed by |
|---|---|
| u04, u06, u07 | lead session 01PJjzVE, agent M1 |
| u09, u15, u16 | lead session 01PJjzVE, agent M2 |
| u17, u18, u19 | lead session 01PJjzVE, agent M3 |