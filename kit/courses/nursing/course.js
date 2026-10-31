// NurseGradify: the curriculum plus where its notes live, handed to the course engine (kit/course/course.js).
import { UNITS, TRACKS, PATHS } from "./syllabus.js";
export default {
  site: "NurseGradify", slug: "nursing", name: "Nursing", app: "../app.html", unitWord: "School",
  units: UNITS, tracks: TRACKS, paths: PATHS,
  // shown under the title on every page of the course
  notice: "<b>Education, not clinical authorisation.</b> NurseGradify doesn't give NMC registration, replace approved practice placements or assess your competence. Practise clinical skills and give medicines only within your scope, under supervision where required, and following your local policies. NMC standards apply UK-wide; laws, policies and services that differ between England, Scotland, Wales and Northern Ireland are labelled.",
  // the schools whose notes are written so far (tests/courses.test.mjs checks this matches notes/)
  written: [],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  extras: [
    ["The body in 3D", "Every body system you'll care for, in 3D.", "../3d.html"],
    ["Learning map", "Every NurseGradify subject on one map.", "../map.html"],
    ["Notes Studio", "Turn your own lecture notes and placement learning into flashcards and questions.", "../app.html#/notes"],
  ],
};
