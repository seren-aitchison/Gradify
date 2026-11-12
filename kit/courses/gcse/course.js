// YouthGradify GCSE Core: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "YouthGradify", slug: "gcse", name: "GCSE Core", app: "../app.html", page: "/youthgradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a qualified secondary teacher and GCSE examiner",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#ffd84a", spectrum: "linear-gradient(90deg, #ffd84a, #22d3ee)" },
  notice: "<b>Study material, not a qualification or an exam board resource.</b> YouthGradify helps 13 to 16 year olds in England learn and revise for GCSEs. The lessons were drafted with AI assistance and haven't yet been reviewed by teachers or examiners, so they may contain errors: check important points with your teacher, your class notes and your exam board's current specification. It is not endorsed by AQA, Pearson Edexcel, OCR or Ofqual, and its model answers are illustrations, not mark schemes. The life skills school is general education, not financial, medical or legal advice: talk to a trusted adult, your school, your GP or a service such as Childline (0800 1111) if you need help.",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Practise with the check questions in each lesson: recall first, then application, then evaluation, the same climb as a GCSE paper. Written answers are self-assessed against marking points; interactives run a stated model.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u04", "u07", "u09"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "Learn it, remember it, show it in the exam",
    intro: "GCSE Core covers the subjects almost everyone sits at 16 in England: English Language, Combined Science and Geography, plus the revision skills that make the rest stick and the life skills school doesn't always have time for. Each lesson explains the idea clearly, shows a worked example and ends with exam-style questions. Maths lives on MathGradify.",
    sources: "the DfE GCSE subject content for English Language, Combined Science and Geography; the AQA, Pearson Edexcel and OCR specifications built on it; Ofqual's rules on assessment; BBC Bitesize; Oak National Academy; the Education Endowment Foundation's guidance on metacognition; and the DfE statutory guidance on relationships and health education",
    learn: [
      ["Revision that works", "Retrieval practice, spacing, interleaving, flashcards, past papers and command words, and how to stay calm."],
      ["Reading", "Explicit and implicit meaning, language and structure analysis, evaluation, and comparing viewpoints across centuries."],
      ["Writing", "Descriptive, narrative and viewpoint writing, with the spelling, punctuation and grammar that earn technical marks."],
      ["Combined Science", "Biology, chemistry and physics: every required practical, the equations to recall and how to use them."],
      ["Geography", "Hazards, climate, ecosystems, coasts and rivers, cities, development, resources, maps and fieldwork."],
      ["Life skills", "Budgeting, banking and scams, online safety, wellbeing and relationships, and your options after GCSEs."],
    ],
    featured: [],
    tools: [
      ["MathGradify", "GCSE maths, from number and algebra to geometry, probability and statistics.", "/mathgradify/course/"],
      ["SciGradify", "Go deeper in biology, chemistry and physics, with more labs and A level content.", "/scigradify/"],
      ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
    ],
  },
  extras: [
    ["Learning map", "YouthGradify's subjects on one map.", "../map.html"],
    ["MathGradify", "GCSE maths, taught and practised on MathGradify.", "/mathgradify/course/"],
    ["BBC Bitesize GCSE", "Free GCSE revision guides and videos for every subject, arranged by exam board.", "https://www.bbc.co.uk/bitesize/levels/z98jmp3"],
    ["Oak National Academy", "Free teacher-made lessons and videos for Key Stage 4.", "https://www.thenational.academy/"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
