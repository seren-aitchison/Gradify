// LawGradify: the curriculum plus where its notes live, handed to the course engine (kit/course/course.js).
import { UNITS, TRACKS, PATHS } from "./syllabus.js";
import { MAP, FRAMEWORKS } from "./map.js";
import { QA } from "./qa.js";
export default {
  site: "LawGradify", slug: "law", name: "Law", app: "../app.html", unitWord: "School",
  units: UNITS, tracks: TRACKS, paths: PATHS,
  // curriculum mapping to the SQE, with framework provenance (map.js)
  map: MAP, frameworks: FRAMEWORKS,
  // quality record per school (docs/CURRICULUM_QA.md); unready schools are labelled as drafts
  qa: QA,
  // shown under the title on every page of the course
  notice: "<b>Study material, not legal advice.</b> The law is stated for England and Wales unless a lesson says otherwise; Scotland and Northern Ireland differ (School 17). Completing a LawGradify course is not a legal qualification and does not authorise you to practise. Law changes: check current sources before you rely on anything here.",
  // the schools whose notes are written so far (tests/courses.test.mjs checks this matches notes/)
  written: ["u01", "u03", "u04", "u15", "u17", "u18", "u19"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  extras: [
    ["SQE1 pathways", "FLK1 and FLK2 as two separate routes, with single-best-answer questions in every lesson.", "#/paths"],
    ["SQE2 skills practice", "Case files, client interviews, advocacy, research, writing and drafting tasks.", "#/learn/u19"],
    ["Law across the UK", "What changes in Scotland and Northern Ireland.", "#/learn/u17"],
    ["Learning map", "Every LawGradify subject on one map.", "../map.html"],
    ["Notes Studio", "Turn your own lecture notes, cases and statutes into flashcards and questions.", "../app.html#/notes"],
  ],
};
