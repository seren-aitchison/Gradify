# Biology: renderers that were missing (audit, what was built, what is left)

Baseline at the start of this stage: 137 lessons with a passing diagram, 95 with a lab, 53 with both, 1,094 tests
passing, 0 inventory problems, and 35 plan rows whose reason was "not yet built". This file is the audit (Stage 1),
the rules the new renderers follow, and the completion report (Stage 6).

## The 35 lessons, grouped by what they needed, and what happened

| Group | Lessons | Needed | Built |
| --- | --- | --- | --- |
| Membrane | u02-18 | bilayer cross-section to scale | `bilayer`, plus the membrane explorer and identification labs |
| Hydrogen bonding | u03-02, u03-03 | water from coordinates | `hbond` |
| Enzymes | u03-24 | lock and key against induced fit | `inducedfit` |
| Junctions | u02-29 | tight, anchoring, gap junctions, plasmodesmata | `section` template `junctions` |
| Plant sections | u08-02 to u08-06 | stem, root, leaf, vascular bundles | `section` templates `root`, `stem`, `leaf` |
| Plant cells | u08-07, u08-08 | xylem vessel, sieve tube and companion cell | `section` templates `xylem`, `phloem` |
| Flower and seed | u08-28, u08-29, u08-30 | flower and seed in section | `section` templates `flower`, `seed` |
| Human tracts | u07-16, u07-17, u07-21 | circulation, airway, gut as routes | `tract` (drawn by the shared flow renderer, checked here) |
| Embryo | u05-16, u05-17 | fertilisation, cleavage to blastocyst | `fertilisation`, `cleavage` |
| Flow cytometry | u14-16 | gating and counting | `cytometry`, plus the flow-gating simulation lab |
| Cycles | u11-14 | water cycle | `biocycle` gains a `water` cycle |
| Landscapes | u11-24 | habitat fragmentation | `fragment` |
| Chromosomes | u04-32, u04-16 | aneuploidy counts; chromatin marks | `karyotype`; `section` template `chromatin` |
| Molecular maps | u12-05 | plasmid map | `plasmidmap` |
| Networks | u13-18 | hubs and a heavy tail | `bionetwork` |
| Microbes | u09-07, u09-08 | horizontal transfer, virion | `section` templates `hgt`, `virion` |
| Evolution | u06-08 | gene flow | `graph` (two-population migration model) |
| **Not built** | u03-04, u04-04, u07-07, u07-27, u10-17 | see Limitations | (reasons in the plan) |

## Rules every new renderer follows

* A subject check recomputes what the picture claims; a wrong spec fails the build.
* Wide and narrow layouts; labels inside the picture and clear of each other (`scripts/diagrams/legibility.cjs`).
* Illustrative values are labelled illustrative (the plasmid, the landscape grid, the network and the flow-cytometry sample
  say so on the picture); measured or lesson values come from the lesson text and are checked against it (the day numbers
  in cleavage, 23 + 23 = 46, the 104.5° and bond lengths in water, the thickness of a membrane to scale).
* Units and scale are stated where there are any (nm, bp, Mb, arbitrary units for scatter and fluorescence).
* Registered names are unique across subjects (checked by a test on `main`; the network renderer is `bionetwork`
  because Business already uses `network`).
* Each part of a picture carries `data-part` and a `<title>` (its name and function), so the inlined SVG gives a tooltip
  now and can drive an interactive layer later without redrawing anything.

## Diagram, interactive diagram, simulation, lab

The inventory (`node scripts/visual/inventory.mjs`) now separates these. A static diagram is a built SVG. A lab's kind
decides the rest: an Explorer or Exercise is an *interactive diagram* (select, reveal, compare, identify); a Simulation or
Illustrative model is a *simulation* (it takes parameters and shows the outcome); a Tool, Experiment or Laboratory is a
*lab activity* the student performs. A lesson counts once under each class it has.

| Kind | Built in this stage | Where |
| --- | --- | --- |
| Interactive diagram | membrane explorer (tap a phospholipid, protein, cholesterol or carbohydrate chain), membrane identification | `kit/labs/biology/membrane.js` |
| Simulation | flow-cytometry gating (drag the gate, see its share, purity, recall and CD4 percentage) | `kit/labs/biology/gating.js` |

Interactivity was added only where it teaches something a picture cannot: the membrane explorer because fluidity
depends on three choices and every component has its own function, and the gating simulation because the number a student
reads depends on where they draw the gate. The rest stay as diagrams: a stem section, a karyotype or a plasmid map has
nothing to vary, so a tooltip on each part is enough.

## Completion report

**Renderers.** 13 new renderers: `bilayer`, `inducedfit`, `hbond`, `section` (11 templates: root, stem, leaf, xylem,
phloem, flower, seed, junctions, virion, hgt, chromatin), `tract`, `fertilisation`, `cleavage`, `cytometry`, `karyotype`,
`plasmidmap`, `fragment`, `bionetwork`; and a water cycle added to `biocycle`.

**Diagrams and lessons.** 26 new diagram ids. 30 lessons newly covered (of 35 that were waiting): lessons with a passing
diagram went from 137 to 167, and lessons with a lab from 95 to 100 (both from 53 to 57).

**Tests.** 1,094 at the start; 1,111 now, all passing (`npm test`). New tests: one per new renderer (accepting the correct
spec and rejecting specs that claim something false), the `section` templates, the registration and unit-name checks, the
two labs, and the interactive count (245). Inventory: 0 data problems and up to date; biology coverage: 0 planned but not
placed, 0 failing. Legibility (`legibility.cjs bio-`, wide and narrow widths, all 148 biology diagram ids): no clipped or
overprinted text. Regression across all 14 units: the full suite and the legibility sweep cover every biology diagram,
not only the new ones.

**Lessons still without a diagram, and why.**

| Lesson | Why not |
| --- | --- |
| u07-07 (brain and spinal cord), u07-27 (bones and joints) | Accurate anatomy needs outline art that a check cannot verify; a hand-drawn approximation would be a decorative scientific claim. |
| u10-17 (complement) | A cascade of many named proteins with several branches; the shared flow layout cannot draw its branching without crossing arrows, and an inexact cascade is worse than none. |
| u04-04 (DNA repair) | The repair pathways are described step by step in words; no single picture carries the pathways without inventing detail the lesson does not give. |
| u03-04 (pH) | The useful picture is a logarithmic-axis graph, which the graph renderer does not support yet; the worked example is in the text. |

**Inventory problems.** None: the inventory reports 0 data problems. The only generated-file noise was the registry
run stamping other courses' QA documents with today's date; those were left as on `main`.

**Limitations.**

* The `section` templates are schematic: their positions and orders are checked against the lesson, but they are not
  anatomical drawings and make no claim about proportions.
* Cleavage cells are equal-area sectors of one disc, a schematic cross-section; counts and the day numbers are the lesson's.
* The flow-cytometry sample, the network and the landscape are simulated or hand-made illustrations and are labelled as such;
  the numbers in them are not measurements.
* Plant and animal structures are drawn without scale bars except where the lesson gives a size (membrane thickness, bond
  lengths, chromosome lengths, virus size range).
* Nothing has been pushed to `main`; the work is on the approved working branches only.
