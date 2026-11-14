// LanguageGradify Dutch: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "LanguageGradify", slug: "dutch", name: "Dutch", app: "../app.html", page: "/languagegradify/dutch/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a qualified Dutch teacher or university Dutch lecturer",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#f08a3c", spectrum: "linear-gradient(90deg, #f08a3c, #22d3ee)" },
  notice: "<b>Study material, not a qualification.</b> The lessons were drafted with AI assistance and haven't yet been reviewed by subject experts, so they may contain errors; check important points against your course materials and official sources.",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Interactives run a stated model or check your reasoning. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: [],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "Dutch",
    intro: "",
    sources: "",
    learn: [],
    featured: [],
    tools: [["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["Learning map", "LanguageGradify's subjects on one map.", "../map.html"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
