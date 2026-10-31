// NurseGradify: the curriculum plus where its notes live, handed to the course engine (kit/course/course.js).
import { UNITS, TRACKS, PATHS, CORE } from "./syllabus.js";
import { MAP, FRAMEWORKS } from "./map.js";
import { QA } from "./qa.js";
export default {
  site: "NurseGradify", slug: "nursing", name: "Nursing", app: "../app.html", unitWord: "School",
  units: UNITS, tracks: TRACKS, paths: PATHS, core: CORE,
  // curriculum mapping to the NMC standards and the fields, with framework provenance (map.js)
  map: MAP, frameworks: FRAMEWORKS,
  // quality record per school (docs/CURRICULUM_QA.md); unready schools are labelled as drafts
  qa: QA,
  // shown under the title on every page of the course
  notice: "<b>Education, not clinical authorisation.</b> NurseGradify doesn't give NMC registration, replace approved practice placements or assess your competence. Practise clinical skills and give medicines only within your scope, under supervision where required, and following your local policies. NMC standards apply UK-wide; laws, policies and services that differ between England, Scotland, Wales and Northern Ireland are labelled.",
  // the schools whose notes are written so far (tests/courses.test.mjs checks this matches notes/)
  written: ["u01", "u03", "u04", "u05"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  extras: [
    ["The body in 3D", "Every body system you'll care for, in 3D.", "../3d.html"],
    ["Learning map", "Every NurseGradify subject on one map.", "../map.html"],
    ["Notes Studio", "Turn your own lecture notes and placement learning into flashcards and questions.", "../app.html#/notes"],
  ],
};
