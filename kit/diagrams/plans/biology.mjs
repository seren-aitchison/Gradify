// The biology diagram plan: every written lesson in SciGradify Biology (kit/courses/biology), one file per unit in
// kit/diagrams/plans/biology/uNN.mjs. Rows (kit/diagrams/BUILDERS.md):
//   [lessonId, renderer, diagramId, what it shows] | [lessonId, "lab", labId, what it lets you do] | [lessonId, null, reason]
// scripts/diagrams/coverage.mjs biology reports planned, built and placed. Renderers: kit/diagrams/bio-renderers*.js
// (bio-levels, bio-structure, bio-scale, bio-phylo, bio-water, bio-pyramid, bio-punnett, bio-pedigree, bio-sequence,
// bio-division, bio-pathway, bio-foodweb) and graph in kit/diagrams/renderers.js. Unit agents: kit/diagrams/biology/UNIT-AGENT.md.
import u01 from "./biology/u01.mjs"; import u02 from "./biology/u02.mjs"; import u03 from "./biology/u03.mjs"; import u04 from "./biology/u04.mjs";
import u05 from "./biology/u05.mjs"; import u06 from "./biology/u06.mjs"; import u07 from "./biology/u07.mjs"; import u08 from "./biology/u08.mjs";
import u09 from "./biology/u09.mjs"; import u10 from "./biology/u10.mjs"; import u11 from "./biology/u11.mjs"; import u12 from "./biology/u12.mjs";
import u13 from "./biology/u13.mjs"; import u14 from "./biology/u14.mjs";
export const NAME = "SciGradify Biology";
export const PLAN = [...u01, ...u02, ...u03, ...u04, ...u05, ...u06, ...u07, ...u08, ...u09, ...u10, ...u11, ...u12, ...u13, ...u14];
