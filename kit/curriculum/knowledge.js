// The knowledge base: every record the curriculum engine (kit/curriculum/engine.js) works over, gathered from its
// layers. Add a new subject area, country or specification by importing it here; nothing else needs to change.
// Data only, so it loads in the browser and in Node alike.
import { CONCEPTS as BIO_CELL_TRANSPORT } from "./universal/biology/cell-transport.js";
import { SYSTEMS as UK } from "./frameworks/uk.js";
import KS3_SCIENCE from "./specifications/uk/dfe-ks3-science.js";
import AQA_8464 from "./specifications/uk/aqa-8464-combined-science-trilogy.js";
import AQA_8461 from "./specifications/uk/aqa-8461-biology.js";
import AQA_7402 from "./specifications/uk/aqa-7402-biology.js";
import { OUTCOME_MAPS } from "./mappings/outcomes.js";
import { LESSON_MAPS } from "./mappings/lessons.js";
import { COURSE_PATHWAYS } from "./mappings/courses.js";

export const KB = {
  concepts: [...BIO_CELL_TRANSPORT],
  systems: [...UK],
  specs: [KS3_SCIENCE, AQA_8464, AQA_8461, AQA_7402],
  outcomeMaps: OUTCOME_MAPS,
  lessonMaps: LESSON_MAPS,
  pathways: COURSE_PATHWAYS,
};
