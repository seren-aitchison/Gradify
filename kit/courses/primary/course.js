// JuniorGradify Primary: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "JuniorGradify", slug: "primary", name: "Primary", app: "../app.html", page: "/juniorgradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a qualified primary school teacher",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#7fe05a", spectrum: "linear-gradient(90deg, #7fe05a, #22d3ee)" },
  notice: "<b>For children learning with a grown-up.</b> JuniorGradify Primary is for children aged 5 to 11, working alongside a parent, carer or teacher. It follows the national curriculum in England but is not a school, doesn't replace your child's teacher and isn't official SATs material. The lessons were drafted with AI assistance and haven't yet been checked by a qualified primary school teacher, so they may contain mistakes: check anything important with your child's school. No personal data is collected: the only thing kept is progress, saved on this device.",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Interactives run a stated model or check your reasoning. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u03", "u04", "u05", "u06", "u07", "u08", "u09"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "Strong foundations, one small step at a time",
    intro: "Primary school maths, English, science, history and geography for children aged 5 to 11, following the national curriculum in England. Each lesson explains one idea in short, friendly steps, works through examples, and ends with practice questions that grow from remembering to explaining. Best done together with a grown-up.",
    sources: "the Department for Education's national curriculum programmes of study for Key Stages 1 and 2, the Standards and Testing Agency's Key Stage 2 test frameworks and multiplication tables check framework, Oak National Academy and BBC Bitesize",
    learn: [
      ["Numbers", "Counting, place value, rounding, negative numbers and Roman numerals."],
      ["Calculating", "Adding, subtracting, multiplying and dividing, in your head and on paper, and the times tables."],
      ["Fractions, measures and shapes", "Fractions, decimals and percentages, measuring, money, time, shapes, angles and graphs."],
      ["Reading and spelling", "Phonics, spelling rules, reading fluently and understanding what you read."],
      ["Writing", "Grammar, punctuation, and planning, writing and improving your own work."],
      ["Science and the world", "Living things, materials, forces, light, sound, electricity, space, history and geography."],
    ],
    featured: [],
    tools: [["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["Learning map", "JuniorGradify's subjects on one map.", "../map.html"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
