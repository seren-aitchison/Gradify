// EngineerGradify Engineering: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE, EXPLORATION } from "./evidence.js";
export default {
  site: "EngineerGradify", slug: "engineering", name: "Engineering", app: "../app.html", page: "/engineergradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a chartered engineer (CEng) and university lecturer",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#ff7a2a", spectrum: "linear-gradient(90deg, #ff7a2a, #22d3ee)" },
  notice: "<b>Education, not engineering advice or design approval.</b> EngineerGradify teaches engineering for study. The lessons were drafted with AI assistance and haven't yet been reviewed by a chartered engineer, so they may contain errors; check important points against your course materials, textbooks and the relevant standards. Worked examples use simplified, illustrative numbers: never use them to size, certify or build anything real. Real designs must follow current codes and standards and be checked by a competent, appropriately qualified engineer, and work must follow health and safety law and the HSE's guidance. This course is not an accredited degree and does not lead to professional registration.",
  interactives: INTERACTIVES, evidence: EVIDENCE, exploration: EXPLORATION,
  practiceNote: "Interactives run a stated model or check your reasoning. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u03", "u04", "u05", "u06", "u07", "u08"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "Engineering",
    intro: "Engineering turns science and mathematics into things that work safely: structures, machines, circuits and systems. Learn the first and second years of an engineering degree, from units and calculus to statics, materials, thermofluids, circuits, control, design and professional practice, with worked examples in SI units, simulations and questions that build from recall to engineering judgement.",
    sources: "the Engineering Council (AHEP and UK-SPEC), Hibbeler, Callister, Çengel, Stroud, Kreyszig, OpenStax University Physics and Calculus, BIPM, NIST, the Royal Academy of Engineering and the HSE",
    learn: [
      ["Engineering mathematics", "Units, functions, complex numbers, vectors, matrices, calculus, differential equations, numerical methods and statistics."],
      ["Mechanics", "Statics, dynamics and vibration: forces, equilibrium, structures, motion, energy and momentum."],
      ["Solids and materials", "Stress, strain, bending, torsion and buckling, and how bonding and microstructure set material properties."],
      ["Thermofluids", "The laws of thermodynamics, power and refrigeration cycles, heat transfer and fluid flow."],
      ["Electrical and control", "DC and AC circuits, electronics, machines, transfer functions, stability and PID control."],
      ["Design and practice", "The design process, manufacturing, ethics, safety, sustainability, projects and professional registration."],
    ],
    featured: ["matrix", "oscillator", "ode", "complex", "circuits", "projectile"],
    tools: [["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["MathGradify", "The companion course: mathematics in depth.", "/mathgradify/course/"],
    ["SciGradify Physics", "Physics: the science underneath engineering.", "/scigradify/physics/"],
    ["Learning map", "EngineerGradify's subjects on one map.", "../map.html"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
