// EduGradify Teaching: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE, EXPLORATION } from "./evidence.js";
export default {
  site: "EduGradify", slug: "teaching", name: "Teaching", app: "../app.html", page: "/edugradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a qualified teacher and initial teacher education tutor",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#ffc002", spectrum: "linear-gradient(90deg, #ffc002, #22d3ee)" },
  notice: "<b>Study material, not a teaching qualification.</b> EduGradify is for trainee and early-career teachers. It does not award or count towards Qualified Teacher Status (QTS), and it doesn't replace your training provider, mentor or induction programme. The lessons were drafted with AI assistance and haven't yet been reviewed by teacher educators, so they may contain errors; check important points against the DfE's current guidance. Always follow your own school's policies, especially on safeguarding: if you are worried about a child, speak to your designated safeguarding lead straight away, and if a child is in immediate danger call 999.",
  interactives: INTERACTIVES, evidence: EVIDENCE, exploration: EXPLORATION,
  practiceNote: "Interactives run a stated model or check your reasoning. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u03", "u05", "u10", "u11", "u12"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "How to teach well, and why it works",
    intro: "A structured course for trainee and early-career teachers in England, built on the Initial Teacher Training and Early Career Framework and the Teachers' Standards. Learn how pupils learn, how to explain, model, question and scaffold, how to adapt teaching, assess, manage behaviour, plan a curriculum and keep children safe, with questions that grow from recall to evaluation.",
    sources: "the DfE Initial Teacher Training and Early Career Framework (2024), the Teachers' Standards, Keeping Children Safe in Education, the SEND Code of Practice (2015), Education Endowment Foundation guidance reports and the Teaching and Learning Toolkit, Ofsted, Rosenshine's Principles of Instruction (2012), Sweller (1988) and the peer-reviewed literature",
    learn: [
      ["How pupils learn", "Working and long-term memory, cognitive load, retrieval, spacing, interleaving, motivation and metacognition."],
      ["Classroom practice", "Explicit instruction, modelling, questioning, scaffolding, practice and classroom talk."],
      ["Every pupil", "Adaptive teaching, SEND and the graduated approach, assessment and feedback, and managing behaviour."],
      ["Curriculum and planning", "Subject knowledge, sequencing, lesson planning, literacy and oracy across the curriculum."],
      ["Safeguarding and the profession", "Keeping Children Safe in Education, professional conduct, induction, development and wellbeing."],
      ["Evidence and the system", "Using research and the EEF well, and how schools in England are organised, funded and inspected."],
    ],
    featured: ["digit-span", "memory-models"],
    tools: [["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["Learning map", "EduGradify's subjects on one map.", "../map.html"],
    ["PsychGradify", "The companion course: psychology, including memory and learning.", "/psychgradify/course/"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
