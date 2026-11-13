// UnderGradify University Study Skills: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "UnderGradify", slug: "university", name: "University Study Skills", app: "../app.html", page: "/undergradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a university academic skills or learning development lecturer",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#5b8fe0", spectrum: "linear-gradient(90deg, #5b8fe0, #22d3ee)" },
  notice: "<b>General study skills, not your university's rules.</b> UnderGradify teaches study skills that apply across UK universities and subjects. Universities set their own regulations on assessment, extensions, referencing styles, academic misconduct and the use of generative AI, and these differ between institutions, departments and even modules: always follow your own university's regulations, your module handbook and your tutors' instructions where they differ from anything here. The lessons were drafted with AI assistance and haven't yet been reviewed by an academic skills specialist, so they may contain errors. Nothing here is medical, financial or legal advice; for wellbeing, disability or money matters speak to your university's support services or your GP, and in an emergency call 999 or Samaritans on 116 123 (UK).",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Interactives run a stated model or check your reasoning. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u03", "u04", "u09", "u11", "u12"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "Learn how to learn at university",
    intro: "University asks you to learn independently, read and argue critically, write in an academic voice and manage your own time. This course teaches those skills directly, built on the science of how people learn, with questions that grow from recall to evaluation and practice you can use in your own modules.",
    sources: "the QAA Frameworks for Higher Education Qualifications and Quality Code, ALDinHE's learning development work, Cottrell's The Study Skills Handbook and Critical Thinking Skills, Cite Them Right, cognitive psychology research such as Dunlosky et al. (2013) and Roediger and Karpicke (2006), UK university library and academic skills guides, and Student Minds",
    learn: [
      ["How university works", "Credits, levels, learning outcomes, assessment, regulations and the people and services that support you."],
      ["How learning works", "Memory, retrieval practice, spacing, interleaving and metacognition: the evidence behind effective study."],
      ["Reading and thinking", "Reading academic texts with purpose, evaluating evidence and building an argument."],
      ["Writing and integrity", "Essays and reports, academic style, referencing and academic integrity, including generative AI."],
      ["Research and numbers", "Searching and judging sources, small projects, and the numeracy and data skills every degree uses."],
      ["Exams, wellbeing and careers", "Revision and exam technique, feedback and reflection, wellbeing, presentations, teamwork and employability."],
    ],
    featured: [],
    tools: [["Notes Studio", "Turn your own lecture notes and PDFs into flashcards and questions.", "../app.html#/notes"], ["PostGradify", "The next step: research and the dissertation.", "/postgradify/"]],
  },
  extras: [
    ["Learning map", "UnderGradify's subjects on one map.", "../map.html"],
    ["Notes Studio", "Turn your own lecture notes and PDFs into flashcards and questions: retrieval practice for your own modules.", "../app.html#/notes"],
  ],
};
