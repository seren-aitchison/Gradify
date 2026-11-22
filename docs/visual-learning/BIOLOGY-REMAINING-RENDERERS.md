# Biology: renderers still needed (audit and plan)

Written at the start of the "remaining renderers" stage. Baseline: 137 lessons with a passing diagram, 95 with a lab,
53 with both, 1,094 tests passing, 0 inventory problems. 38 plan rows said "not yet built". This file is the audit
(Stage 1); the completion report at the end lists what was built.

## The 38 lessons, grouped by what they need

| Group | Lessons | Needs | Reuse |
| --- | --- | --- | --- |
| Membrane | u02-18 | bilayer cross-section: phospholipids, proteins, cholesterol, carbohydrate chains, scale | new `bilayer`; `membrane` shows transport only |
| Hydrogen bonding | u03-02, u03-03 | water molecules, partial charges, 104.5°, donors and acceptors, bond lengths | new `hbond` |
| Enzymes | u03-24 | lock-and-key against induced fit, active-site shape change | new `inducedfit` |
| Junctions | u02-29 | tight junction, desmosome, gap junction, plasmodesma | new `junction` |
| Plant sections | u08-02 to u08-06 | stem, root, leaf sections and vascular bundles | new `section` (templates) |
| Plant cells | u08-07, u08-08 | xylem vessel and sieve tube | `section` templates |
| Flower and seed | u08-28, u08-29, u08-30 | flower and seed in section | `section` templates |
| Human tracts | u07-16, u07-17, u07-21 | circulation, airway and gut as ordered routes | `flow` + route checks (new `tract`) |
| Human anatomy needing outline art | u07-07, u07-27 | brain regions, skeleton and joints | not built: see limitations |
| Embryo | u05-16, u05-17 | fertilisation, cleavage to blastocyst | new `embryo`; `carbonflow` counts for chromosomes |
| Flow cytometry | u14-16 | scatter plot, gates, percentages | new `cytometry` |
| Cycles | u11-14 | water cycle | `biocycle` gains a `water` cycle |
| Landscapes | u11-24 | habitat fragmentation | new `fragment` |
| Chromosomes | u04-32, u04-16 | karyotype and aneuploidy; chromatin marks | new `karyotype`, `chromatin` |
| Molecular maps | u12-05 | plasmid map | new `plasmidmap` |
| Networks | u13-18 | scale-free network | new `network` |
| Microbes | u09-07, u09-08 | horizontal transfer, virion | `section` templates, `hgt` scene |
| Other | u03-04, u06-08, u04-04, u10-17 | pH on a log scale; gene flow; DNA repair; complement | `graph` for the first two; repair and complement stay in text (see limitations) |

## Rules every new renderer follows

* A subject check recomputes what the picture claims; a wrong spec fails the build.
* Wide and narrow layouts; labels inside the picture and clear of each other (`legibility.cjs`).
* Illustrative values are labelled illustrative; measured values come from the lesson text.
* Registered names are unique across subjects (checked by a test on `main`).
* Each part of a picture carries `data-part` and a `<title>` (its name and function), so the inlined SVG gives a tooltip
  now and can drive an interactive layer later without redrawing anything.

## Interactivity: what is a diagram, what is a lab

| Kind | Meaning | Where |
| --- | --- | --- |
| Diagram | communicates a concept; static SVG with part tooltips | `kit/diagrams/specs`, `plans/biology.mjs` |
| Interactive diagram | select, reveal, compare, identify | `kit/labs/biology/*.js`, registered in `interactives.js` |
| Simulation | models a process, takes parameters | labs of kind "Simulation" |
| Lab | the student performs an activity | labs of kind "Tool" and "Exercise" |

The first interactive diagram built here is the membrane explorer (`kit/labs/biology/membrane.js`): tap a phospholipid,
channel, carrier, receptor, cholesterol or carbohydrate chain for its function, or identify them in an exercise.
