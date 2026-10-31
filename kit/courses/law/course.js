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
  // interactive practice (kit/interactive/): legal reasoning
  practiceNote: "Legal reasoning practice: case files worked issue by issue, and the court hierarchy. Fictional facts; the law of England and Wales as at 2026.",
  interactives: [
    { id: "okoye", kind: "Legal reasoning case file", title: "Okoye v Harbour Cameras: was there a contract?", sub: "Identify the issues, apply offer, acceptance and the postal rule to a sequence of messages, and advise the client, building an IRAC analysis as you go.", schools: [3], load: () => import("./interactives/offer-acceptance.js") },
    { id: "courts", kind: "Precedent explorer", title: "Court hierarchy and precedent", sub: "Explore the courts of England and Wales and decide whether earlier decisions bind, persuade or must be taken into account.", schools: [1], load: () => import("../../interactive/trainers.js").then((m) => ({ mount: m.mountCourts })) },
  ],
  // mock exams (kit/assess/exam.js): drawn from written schools only; pass marks are practice thresholds,
  // not the SRA's (which are set for each sitting)
  exams: [
    { id: "flk1-short", title: "SQE1 FLK1 practice: 45 questions", sub: "Single best answer questions from the FLK1 schools, timed at the SQE1 pace of about 1.7 minutes a question.", path: "sqe1-flk1", format: "sba", count: 45, minutes: 77, pass: 0.6 },
    { id: "flk1-full", title: "SQE1 FLK1 practice: full paper length", sub: "90 questions in 153 minutes, the length of one SQE1 session.", path: "sqe1-flk1", format: "sba", count: 90, minutes: 153, pass: 0.6 },
    { id: "flk2-short", title: "SQE1 FLK2 practice: 45 questions", sub: "Single best answer questions from the FLK2 schools.", path: "sqe1-flk2", format: "sba", count: 45, minutes: 77, pass: 0.6 },
    { id: "obligations", title: "Contract and tort", sub: "Mixed questions on the law of obligations, for LLB and GDL revision.", units: [3, 4], format: "mixed", count: 30, minutes: 50, pass: 0.6 },
  ],
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
