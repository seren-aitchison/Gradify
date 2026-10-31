// SciGradify Chemistry: the curriculum, notes, interactives and quality record, handed to the shared course
// engine (kit/course/course.js), the same engine and lesson renderer that runs Physics, Law and Nursing.
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
export default {
  site: "SciGradify", slug: "chemistry", name: "Chemistry", app: "../app.html", unitWord: "School", trackWord: "Stage",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  // quality record per school (docs/CURRICULUM_QA.md); unready schools are labelled as drafts
  qa: QA,
  // names for difficulty levels 1–3 in questions, quizzes and the problem bank
  levels: ["Foundation", "Application", "Chemical reasoning"],
  // the subject's colours for the course chrome (Physics keeps the original spectrum)
  theme: { accent: "#f59e0b", spectrum: "linear-gradient(90deg, #facc15, #fbbf24 25%, #f59e0b 50%, #f97316 75%, #ea580c)" },
  // interactives (kit/labs/chemistry/): listed in the Lab tab and embedded in lessons with IX: lines
  interactives: INTERACTIVES, practiceLabel: "Lab",
  practiceNote: "Simulations run a real model, with its simplifications stated; illustrative models show a structure or process without simulating it; exercises check your answers. Challenges inside them earn XP.",
  // cumulative exams (kit/assess/exam.js): one per stage and one over the whole course, drawn from written schools only
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: `${t.name}`, sub: `Mixed questions from every written school in this stage.`, units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (tests/sciences.test.mjs checks this matches notes/)
  written: [],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "Atoms, molecules and the reactions between them",
    intro: "Chemistry explains why substances behave as they do: why salt dissolves, why some reactions release energy and others need it, how a drug finds its target and how chemists prove what a molecule is. Build atoms, turn molecules in 3D, run titrations and push curly arrows, then test yourself on worked chemical problems.",
    sources: "IUPAC, the Royal Society of Chemistry, OpenStax Chemistry, the NIST Chemistry WebBook and PubChem",
    learn: [
      ["Atoms and the periodic table", "Atomic structure, orbitals, electron configurations and the trends across the table."],
      ["Bonding and structure", "Ionic, covalent and metallic bonding, molecular shape, polarity and intermolecular forces."],
      ["Physical chemistry", "Moles, energetics, thermodynamics, kinetics, equilibrium, acids and bases, and electrochemistry."],
      ["Organic chemistry", "Functional groups, stereochemistry, reaction mechanisms and multi-step synthesis."],
      ["Analysis", "IR, NMR and mass spectrometry, chromatography and working out a structure from data."],
      ["Medicinal and computational chemistry", "Drug targets, binding, ADME and drug design; SMILES, force fields, DFT and chemical machine learning."],
    ],
    featured: ["periodic-table", "vsepr", "titration", "curly-arrows", "orbitals", "nmr", "equilibrium", "docking"],
    tools: [["Notes Studio", "Turn your own chemistry notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["Learning map", "Every SciGradify subject on one map.", "../map.html"],
    ["Notes Studio", "Turn your own chemistry notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
