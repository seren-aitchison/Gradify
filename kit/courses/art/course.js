// ArtGradify Art and Design: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "ArtGradify", slug: "art", name: "Art and Design", app: "../app.html", page: "/artgradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a university fine art or art history lecturer",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#f055dd", spectrum: "linear-gradient(90deg, #f055dd, #22d3ee)" },
  notice: "<b>Study material, not a qualification or an assessment.</b> ArtGradify teaches art, design and art history for study. The lessons were drafted with AI assistance and haven't yet been reviewed by subject experts, so they may contain errors; check important points against your exam board's specification, your teacher and museum sources. Works of art are described in words rather than reproduced: look at them in person or on the holding museum's website. Nothing here is a mark or a prediction of a grade, and the copyright lessons explain general principles, not legal advice: for a real question about your rights, ask a qualified adviser.",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Interactives run a stated model or check your reasoning. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u03", "u11"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "Learn to see, make and write about art",
    intro: "Art and Design from the visual elements to the contemporary art world: drawing, colour, painting, print, sculpture, photography, graphic design and art history from the ancient world to now, built around the four assessment objectives (develop, refine, record, present) used by every GCSE and A level board.",
    sources: "the DfE subject content and the AQA, Pearson Edexcel and OCR specifications, the QAA Subject Benchmark Statements for Art and Design and History of Art, Gombrich's The Story of Art, Itten's The Art of Color, Ching's Design Drawing, Smarthistory, and the collection records of Tate, the National Gallery and other museums",
    learn: [
      ["The visual language", "Line, shape, tone, colour, texture, space and pattern, and the principles that organise them."],
      ["Drawing", "Observation, measuring, tone, perspective, the figure and expressive mark-making."],
      ["Colour and media", "Colour theory, paint, print, sculpture, photography and digital image-making."],
      ["Design", "Typography, layout, identity, illustration and the design process from brief to final."],
      ["Art history", "Movements, artists and key works from prehistory to the global present, and how to interpret them."],
      ["Practice and the art world", "Sketchbooks, critical writing, portfolios, museums, copyright and careers."],
    ],
    featured: ["visual-search", "muller-lyer", "lens"],
    tools: [["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["Learning map", "ArtGradify's subjects on one map.", "../map.html"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
