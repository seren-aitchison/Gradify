// SciGradify Biology: the curriculum, notes, interactives and quality record, handed to the shared course
// engine (kit/course/course.js), the same engine and lesson renderer that runs Physics, Law and Nursing.
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
export default {
  site: "SciGradify", slug: "biology", name: "Biology", app: "../app.html", unitWord: "School", trackWord: "Stage",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  // quality record per school (docs/CURRICULUM_QA.md); unready schools are labelled as drafts
  qa: QA,
  // names for difficulty levels 1–3 in questions, quizzes and the problem bank
  levels: ["Foundation", "Application", "Biological reasoning"],
  // the subject's colours for the course chrome (Physics keeps the original spectrum)
  theme: { accent: "#10b981", spectrum: "linear-gradient(90deg, #84cc16, #22c55e 30%, #10b981 55%, #14d4c4 80%, #06b6d4)" },
  // interactives (kit/labs/biology/): listed in the Lab tab and embedded in lessons with IX: lines
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
    headline: "Life, from molecules to ecosystems",
    intro: "Biology explains how living things work: how a cell reads its DNA, how the heart and kidneys keep the body stable, how populations evolve and how ecosystems hold together. Learn it step by step, explore it in interactive simulations, and practise on questions that grow from recall to real reasoning.",
    sources: "OpenStax Biology, NCBI Bookshelf, NHGRI, WHO, EMBL-EBI and the primary literature",
    learn: [
      ["Cells and molecules", "Organelles, membranes, biomolecules and enzymes, and how structure explains function."],
      ["Genes and inheritance", "DNA, the genetic code, gene regulation, mutation, Mendelian genetics and genomics."],
      ["The human body", "Neurones, hormones, the heart, lungs, gut and kidneys, and how homeostasis ties them together."],
      ["Evolution and ecology", "Natural selection, speciation and phylogenetics; energy flow, populations and conservation."],
      ["Microbes and immunity", "Bacteria, viruses and the immune system, vaccination and antimicrobial resistance."],
      ["Biotechnology and data", "PCR, sequencing, CRISPR, bioinformatics, statistics and how research is done well."],
    ],
    featured: ["cell-explorer", "action-potential", "punnett", "natural-selection", "enzyme-kinetics", "crispr", "seq-align", "heart"],
    tools: [["Notes Studio", "Turn your own biology notes and PDFs into flashcards and questions.", "../app.html#/notes"], ["The cell in 3D", "SciGradify's interactive 3D cell.", "../3d.html"]],
  },
  extras: [
    ["The cell in 3D", "SciGradify's interactive 3D cell.", "../3d.html"],
    ["Learning map", "Every SciGradify subject on one map.", "../map.html"],
    ["Notes Studio", "Turn your own biology notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
