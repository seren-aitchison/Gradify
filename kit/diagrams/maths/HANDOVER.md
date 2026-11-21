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

- First maths release: see `git log -- kit/diagrams/maths-renderers.js` on main (this file is committed with it).
- Tests at release: full `npm test` (see the commit message for the result).
