// HistoryGradify History: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
import { defineCourse } from "../../subjects/define.js";
import history from "../../subjects/history.js";
// the history adapter (kit/subjects/history.js) holds the history QA rules and reviewer flags
export default defineCourse(history, {
  site: "HistoryGradify", slug: "history", name: "History", app: "../app.html", page: "/historygradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a history teacher or university historian",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#c2833f", spectrum: "linear-gradient(90deg, #c2833f, #22d3ee)" },
  notice: "<b>Study material, not a qualification.</b> The lessons were drafted with AI assistance and haven't yet been reviewed by subject experts, so they may contain errors; check important points against your course materials and official sources.",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Interactives run a stated model or check your reasoning. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u03", "u04", "u05", "u06", "u07", "u08", "u09", "u10", "u11", "u12", "u13"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "How the past made the present, and how historians know",
    intro: "A broad history course for GCSE, A level and independent study: British history from the Anglo-Saxons to Brexit, the twentieth-century world, empires and revolutions, taught alongside the methods historians use to question sources, weigh interpretations and argue a case. Pathways follow the topics most GCSE and A level specifications study, but this is not a specification for any one exam board.",
    sources: "the Department for Education's history subject content, The National Archives, Imperial War Museums, the Historical Association, and published scholarship cited lesson by lesson",
    learn: [
      ["Historical thinking", "Sources, provenance, reliability, interpretations, cause, change and significance."],
      ["Medieval and early modern Britain", "Conquest, Magna Carta, the Black Death, the Reformation and the Civil War."],
      ["Industry, empire and reform", "The Industrial Revolution, democracy, Ireland, empire and suffrage."],
      ["The twentieth-century world", "Two world wars, revolution in Russia, Fascism and Nazism, and the Cold War."],
      ["Britain and the world since 1945", "The welfare state, decolonisation, the USA, Europe and Brexit."],
      ["Writing history", "Source and interpretation questions, essays, the A level investigation and exam technique."],
    ],
    featured: [],
    tools: [["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["Learning map", "HistoryGradify's subjects on one map.", "../map.html"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
});
