// SciGradify Chemistry: the curriculum, notes, interactives and quality record, handed to the shared course
// engine (kit/course/course.js), the same engine and lesson renderer that runs Physics, Law and Nursing.
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { EVIDENCE, EXPLORATION } from "./evidence.js";
import { defineCourse } from "../../subjects/define.js";
import science, { scienceExams } from "../../subjects/science.js";
// the science adapter (kit/subjects/science.js) gives the site, unit and stage words, the Lab label and note, and
// the mock exam structure shared with the other sciences
export default defineCourse(science, {
  slug: "chemistry", name: "Chemistry",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  // quality record per school (docs/CURRICULUM_QA.md); unready schools are labelled as drafts
  qa: QA,
  // names for difficulty levels 1–3 in questions, quizzes and the problem bank
  levels: ["Foundation", "Application", "Chemical reasoning"],
  // the subject's colours for the course chrome (Physics keeps the original spectrum)
  theme: { accent: "#f59e0b", spectrum: "linear-gradient(90deg, #facc15, #fbbf24 25%, #f59e0b 50%, #f97316 75%, #ea580c)" },
  // interactives (kit/labs/chemistry/): listed in the Lab tab and embedded in lessons with IX: lines
  interactives: INTERACTIVES, evidence: EVIDENCE, exploration: EXPLORATION,   // evidence: each challenge → its lesson (mastery)
  // cumulative exams (kit/assess/exam.js): one per stage and one over the whole course, drawn from written schools only
  exams: scienceExams(UNITS, TRACKS),
  // the schools whose notes are written (tests/sciences.test.mjs checks this matches notes/)
  written: ["u01", "u02"],
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
});
