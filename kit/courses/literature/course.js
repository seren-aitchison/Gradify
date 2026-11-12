// LitGradify English Literature: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "LitGradify", slug: "literature", name: "English Literature", app: "../app.html", page: "/litgradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a university English literature lecturer",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#b06ce0", spectrum: "linear-gradient(90deg, #b06ce0, #22d3ee)" },
  notice: "<b>Study material, not a qualification or an exam board resource.</b> LitGradify teaches English literature for study. The lessons were drafted with AI assistance and haven't yet been reviewed by subject experts, so they may contain errors; check important points against your set texts, your course materials and your exam board's current specification. It is not endorsed by AQA, OCR or Pearson Edexcel, it does not replace reading the texts themselves, and its model answers are illustrations, not mark schemes. Quotations are short and taken only from public-domain texts; modern works are described rather than quoted.",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Practise with the check questions in each lesson: recall first, then application to passages, then evaluation and argument. Written answers are self-assessed against marking points.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "close-reading", title: "Close reading and poetry", sub: "Language, form, metre and interpretation, applied to short passages.", units: [1, 2], format: "science", count: 25, minutes: 40, pass: 0.7 },
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u03", "u04", "u05", "u06"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "How to read, and write about, literature",
    intro: "English literature studies how poems, plays and novels make meaning, and how readers argue about it. Learn to read closely, master the forms from the sonnet to the novel, trace literary history from Beowulf to the present, use critical theory, study the classic set texts and write essays that persuade.",
    sources: "the AQA, OCR and Pearson Edexcel GCSE and A level specifications, the QAA Subject Benchmark Statement for English, the Norton anthologies, Abrams' Glossary of Literary Terms, Barry's Beginning Theory, Project Gutenberg editions and the critical literature",
    learn: [
      ["Close reading", "Diction, imagery, tone, syntax, sound, irony and allusion, and how to turn notes into an argument."],
      ["Poetry", "The speaker, metre and rhythm, rhyme, free verse and the forms from sonnet to dramatic monologue."],
      ["Drama and Shakespeare", "Tragedy and comedy, Shakespeare's theatre and language, and drama from the Restoration to now."],
      ["Prose fiction", "Narrators, point of view, character and structure, and the novel from Defoe to the postmodern."],
      ["Literary history and theory", "The periods from medieval to contemporary, and the critical approaches that shape interpretation."],
      ["Set texts and essays", "Macbeth, Frankenstein, A Christmas Carol, Jane Eyre, Romantic and war poetry, unseen and comparative essays."],
    ],
    featured: [],
    tools: [["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["Learning map", "LitGradify's subjects on one map.", "../map.html"],
    ["Project Gutenberg", "Free public-domain editions of most of the set texts studied here.", "https://www.gutenberg.org/"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
