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
  // mock exams (kit/assess/exam.js): one per field pathway, plus medicines safety. Practice thresholds only;
  // they don't replace university assessments or numeracy tests.
  exams: [
    { id: "adult", title: "Adult nursing practice exam", sub: "Mixed questions across the adult nursing pathway: clinical reasoning, prioritisation, safety and assessment interpretation.", path: "adult", format: "mixed", count: 40, minutes: 60, pass: 0.7 },
    { id: "children", title: "Children's nursing practice exam", sub: "Mixed questions across the children's nursing pathway.", path: "children", format: "mixed", count: 40, minutes: 60, pass: 0.7 },
    { id: "mental-health", title: "Mental health nursing practice exam", sub: "Mixed questions across the mental health nursing pathway.", path: "mental-health", format: "mixed", count: 40, minutes: 60, pass: 0.7 },
    { id: "learning-disability", title: "Learning disability nursing practice exam", sub: "Mixed questions across the learning disability nursing pathway.", path: "learning-disability", format: "mixed", count: 40, minutes: 60, pass: 0.7 },
    { id: "medicines", title: "Medicines safety", sub: "Pharmacology and medicines management. Education only: it doesn't assess your competence to give medicines.", units: [4], format: "mixed", count: 30, minutes: 45, pass: 0.8 },
  ],
  // the schools whose notes are written so far (tests/courses.test.mjs checks this matches notes/)
  written: ["u01", "u03", "u04", "u05"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  extras: [
    ["The body in 3D", "Every body system you'll care for, in 3D.", "../3d.html"],
    ["Learning map", "Every NurseGradify subject on one map.", "../map.html"],
    ["Notes Studio", "Turn your own lecture notes and placement learning into flashcards and questions.", "../app.html#/notes"],
  ],
};
