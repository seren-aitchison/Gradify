# Chemistry diagram review (November 2026)

A second pass over the chemistry diagrams in `kit/diagrams`, on branch `claude/chemistry-diagram-review-dopjaf`. Each image
in this folder shows a phone layout before (left, from commit `c2ba81e`) and after (right).

## What changed

| Area | Fault | Fix |
| --- | --- | --- |
| Notation | Charges after "/" and on polyatomic and complex ions were not superscripted (Fe3+/Fe2+, NH4+, [Cu(H2O)6]2+) | `fm()` in `chem-renderers.js`, with tests |
| Mechanisms | Ammonia and bromoethane: NH4 drawn without its +, arrows over N+ | spec and batch script |
| Graphs | Labels cut by curves; y titles and end labels off the edge; mid-plot x titles in the curves | labels drawn last on halos (chemistry only), kept in frame |
| Mass spectra | HRMS axis printed 27.990000000000002 | ticks counted by index |
| Flows | On phones, branching maps were stacked with straight arrows through other boxes, so the synthesis map implied ethanoic acid gives ethylamine | depth-first stacking, skipped steps routed in lanes |
| Cycles | Two-step cycles: labels clipped, net equation squeezed between arcs | labels outside the arc apex, net equation underneath |
| Cells | Membrane label under the electrode; electrode products colliding | drawn last on halos, wrapped |
| Levels | Raman, MO and hydrogen labels clipped; NMR and colour notes on lines; band gap as bare lines | labels kept in frame; `labelAbove`, `links`, `bands`; band gap and NMR splitting redrawn |
| Trends | Bar labels overprinted on phones; value over the title; series labels piled up | wrap, then turn only when a word does not fit; key row |
| Apparatus | Labels beyond the 460-wide canvas clipped on phones | scaled to the extent of the labels; working moved under the drawing on phones |
| Hess cycles | ΔsolH label on NaCl(s) | short steps labelled under the lower level |
| Phase, structures | ΔT working on the critical point label; carbonate note off the screen | moved under the plot; notes wrapped |
| Final pass | Dot-and-cross panels touching on phones; orbital colour key on an axis label; Boltzmann end labels on their points; ion charges crowded | per-molecule row height; key under the drawings; labels above-left and set apart; wider spacing for charged particles |

Every chemistry spec builds and passes its checks. No non-chemistry SVG changed (a full rebuild compared with `c2ba81e`).

## Coverage (from `node scripts/diagrams/coverage.mjs`)

- SciGradify Chemistry: 410 written lessons. 355 have a passing diagram and 55 have none by design, each with a recorded
  reason (31 because the idea is a definition, convention or calculation method; the rest name the lesson or text
  that carries the idea). Nothing is planned and unplaced, and nothing fails.
- 344 unique diagram ids make 358 placements. 13 diagrams are reused, one of them three times (the f-block table), so
  344 + 14 = 358. The 358 placements fall in 355 lessons, so 3 lessons carry two diagrams.
- GCSE chemistry school: 19 lessons, 17 with a diagram (the A level drawings placed again through `also`), 2 without by
  design.
- Status: 4 approved by a named reviewer, 4 AI-reviewed, 336 validated (automatic checks only).

This review improved existing diagrams. It did not change coverage.

## Scientific verification

Two different kinds of evidence. Neither is expert sign-off: no qualified human reviewer has signed off these diagrams in
this review.

**Automatic checks** (run by `scripts/diagrams/build.mjs` for every spec): mechanisms are executed arrow by arrow in RDKit
(atoms, charges and hydrogens conserved, each arrow from a real lone pair or bond, stage i + arrows = stage i + 1); R/S
against RDKit's CIP labeller; structure formulae and groups; NMR environments and n + 1 splitting; m/z from formulae; cell
E° from the data table and half-equations that balance; Hess cycles that close; titration curves from the stated
concentrations; apparatus geometry; lattice coordination numbers; Balmer lines from the Rydberg equation.

**Independently recomputed in this review** (from textbook data and relationships, outside the renderers): Daniell
1.10 V, Zn/Ag 1.56 V, Mg/Cu 2.71 V; Born–Haber lattice enthalpy of NaCl −787 kJ mol⁻¹; dissolution +17; ΔfH(CH4) −76;
C → CO2 via CO −394; ethene hydrogenation −136; H2 + Cl2 from bond enthalpies −185; calorimeter q = 2842 J and
ΔH = −56.8 kJ mol⁻¹; titre 24.15 cm³; Ar(Cl) 35.45; exact masses of CO, N2 and C2H4 (27.9949, 28.0061, 28.0313);
ΔTb 1.02 K and ΔTf 3.72 K for 1 mol kg⁻¹ NaCl; an 800 nm photon 149.5 kJ mol⁻¹; Balmer Hα 656 nm; hydrogen ionisation
1312 kJ mol⁻¹; Gibbs crossover 500 K; bond orders N2 3 and O2 2. All 24 match.

**Inspected by eye** (rendered output read against established chemistry): SN2 backside attack with inversion,
(R)-2-bromobutane to (S)-butan-2-ol; ethanol ¹H NMR (triplet 1.2, quartet 3.7, singlet 2.6, 3:2:1); the four titration
curves (equivalence pH 7.0, 8.7, 5.3 and 7.0); catalysed and uncatalysed profiles; electrode products for brine, molten
NaCl and aluminium extraction; fuel cell, lithium-ion, rusting and sacrificial protection half-equations and polarities;
MO filling for N2 and O2; band structures of a metal, silicon and diamond.

Not verified here: every one of the 344 diagrams individually. The 336 marked `validated` still need a subject reviewer.

## Tests and integration

- `npm test` after `npm ci` (as CI does): 976 pass, 0 fail. Without `npm ci` the database and billing suites fail to
  load PGlite and bcryptjs; that, not missing services, explains the 16 to 21 failures reported earlier.
- The CI steps that can run here pass: release statuses (`audit-sites.mjs`), internal links (`qa-audit.mjs`), the public
  site build (`build-site.mjs --check`), and generated files up to date (sitemap, sync, ix-manifest, api).
- Lesson pages in a real browser (`scripts/diagrams/shoot.cjs`, preview mode, 14 pilot lessons across chemistry,
  physics, maths, biology, business and law): every diagram renders, with no page overflow and no script errors, at
  desktop (707 px column) and phone (320 px) widths. The learner view (no preview flag) shows the diagrams too.
- Not in CI: the diagram build itself. CI has no RDKit and does not regenerate or compare the SVGs, so the committed SVGs
  are trusted as built. Adding a CI job with RDKit that rebuilds and runs `git diff --exit-code kit/diagrams` would
  close that gap.
- The signed-in journey (`check-sync.cjs`) and deployment run only in CI and were not run here.

## Known limitations

- The overlap scan used in this review flags text that is clipped by the viewBox or overprinted. It judges layout, not
  chemistry, and turned labels give false positives (their boxes are axis-aligned).
- Small remaining layout points: in the oxidation-state diagram, the left +1 on water touches its O–H bond, and on
  phones some apparatus drawings are scaled to about 70% so that their labels fit.
