// The knowledge base: every record the curriculum engine (kit/curriculum/engine.js) works over, gathered from its
// layers. Add a new subject area, country or specification by importing it here; nothing else needs to change.
// Data only, so it loads in the browser and in Node alike.
import { CONCEPTS as BIO_CELL_TRANSPORT } from "./universal/biology/cell-transport.js";
import { SYSTEMS as UK } from "./frameworks/uk.js";
import { SPECS } from "./specifications/index.js";
import { OUTCOME_MAPS } from "./mappings/outcomes.js";
import { LESSON_MAPS } from "./mappings/lessons.js";
import { COURSE_PATHWAYS } from "./mappings/courses.js";
import { OUTCOME_LESSONS } from "./mappings/coverage/index.js";

export const KB = {
  concepts: [...BIO_CELL_TRANSPORT],
  systems: [...UK],
  specs: SPECS,
  outcomeMaps: OUTCOME_MAPS,
  lessonMaps: LESSON_MAPS,
  pathways: COURSE_PATHWAYS,
  // direct specification outcome → lesson mappings (mappings/coverage/), for outcomes with no canonical concept yet
  outcomeLessons: OUTCOME_LESSONS,
};
