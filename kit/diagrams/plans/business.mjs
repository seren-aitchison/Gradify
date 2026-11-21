// The BusinessGradify diagram plan. One file per school in kit/diagrams/plans/business/, so builders of different
// schools never collide. A row is
//   [lessonId, renderer, diagramId, what it shows]   a diagram (kit/diagrams/specs/<diagramId>.json, D: line placed)
//   [lessonId, "lab", labId, what it lets you do]     an existing interactive (kit/courses/business/interactives.js)
//   [lessonId, null, reason]                          assessed, no visual, and why
// Only lessons that have been assessed have rows: a written lesson with none shows as "not yet assessed" in
// docs/visual-learning/INVENTORY.md. Renderers: kit/diagrams/business-renderers.js (matrix, layers, orgchart,
// process, bars, network, blocks, radial) and the shared graph renderer; specs are written by
// scripts/diagrams/business/uNN.py.
import { PLAN as U01 } from "./business/u01.mjs";
import { PLAN as U02 } from "./business/u02.mjs";
import { PLAN as U03 } from "./business/u03.mjs";
import { PLAN as U04 } from "./business/u04.mjs";
import { PLAN as U05 } from "./business/u05.mjs";
import { PLAN as U06 } from "./business/u06.mjs";
import { PLAN as U07 } from "./business/u07.mjs";
import { PLAN as U08 } from "./business/u08.mjs";
import { PLAN as U09 } from "./business/u09.mjs";
import { PLAN as U10 } from "./business/u10.mjs";
import { PLAN as U11 } from "./business/u11.mjs";
export const NAME = "BusinessGradify Business and Management";
export const PLAN = [...U01, ...U02, ...U03, ...U04, ...U05, ...U06, ...U07, ...U08, ...U09, ...U10, ...U11];
