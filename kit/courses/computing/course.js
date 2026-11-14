// TechGradify · ForgeLab Computer Science: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "TechGradify · ForgeLab", slug: "computing", name: "Computer Science", app: "../app.html", page: "/techgradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a university computer science lecturer",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#ff5a4d", spectrum: "linear-gradient(90deg, #ff5a4d, #f97316 25%, #f59e0b 50%, #f472b6 75%, #22d3ee)" },
  notice: "<b>Study material, not a qualification or legal advice.</b> ForgeLab teaches computer science for GCSE, A level and the first year of university, but it isn't an exam board resource or an accredited course: check the details of your own specification with your teacher or exam board. The lessons were drafted with AI assistance and haven't yet been reviewed by subject experts, so they may contain errors. Security lessons explain attacks so that you can defend against them: trying them on systems you don't own or have permission to test can be a criminal offence under the Computer Misuse Act 1990. The law lessons describe UK law for study; for a real data protection question, see the ICO or a qualified adviser.",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Code in the lessons is Python 3 unless it says otherwise: trace it by hand first, then run it yourself to check. Challenges inside interactives earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "programming", title: "Programming in Python", sub: "Tracing, writing and debugging Python: variables, selection, loops, functions, data structures, files and testing.", units: [2, 3], format: "science", count: 25, minutes: 40, pass: 0.7 },
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u03", "u04", "u05", "u06"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "How computers think, and how to make them",
    intro: "Computer science is the study of computation: what can be computed, how to do it efficiently and how to build systems people can trust. Learn it from abstraction and Boolean logic to Python, algorithms, data structures, processors, networks, databases and AI, with code traced step by step and questions that grow from recall to evaluation.",
    sources: "the AQA and OCR GCSE and A level Computer Science specifications, ACM CS2023, the Python documentation, Cormen et al.'s Introduction to Algorithms (CLRS), Isaac Computer Science, the NCSC, the ICO and UK legislation",
    learn: [
      ["Computational thinking", "Abstraction, decomposition, algorithms, pseudocode, flowcharts, trace tables and Boolean logic."],
      ["Programming in Python", "Variables, selection, loops, functions, strings, lists and dictionaries, files, testing and debugging."],
      ["Algorithms and data structures", "Searching, sorting, Big O, recursion, graphs, stacks, queues, trees and hash tables."],
      ["Inside the computer", "Binary and data representation, the processor, memory, assembly language and operating systems."],
      ["Networks, data and software", "Protocols, the internet and the web; relational databases and SQL; software engineering and OOP."],
      ["Security, AI and society", "Cyber threats and defences, machine learning, and the law and ethics of computing."],
    ],
    featured: [],
    tools: [["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["ForgeLab", "TechGradify's hands-on coding, data science and AI home.", "../index.html"],
    ["Learning map", "TechGradify · ForgeLab's subjects on one map.", "../map.html"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
