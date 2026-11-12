// SciGradify Biology: the curriculum, notes, interactives and quality record, handed to the shared course
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
  slug: "biology", name: "Biology",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  // quality record per school (docs/CURRICULUM_QA.md); unready schools are labelled as drafts
  qa: QA,
  // names for difficulty levels 1–3 in questions, quizzes and the problem bank
  levels: ["Foundation", "Application", "Biological reasoning"],
  // the subject's colours for the course chrome (Physics keeps the original spectrum)
  theme: { accent: "#10b981", spectrum: "linear-gradient(90deg, #84cc16, #22c55e 30%, #10b981 55%, #14d4c4 80%, #06b6d4)" },
  // interactives (kit/labs/biology/): listed in the Lab tab and embedded in lessons with IX: lines
  interactives: INTERACTIVES, evidence: EVIDENCE, exploration: EXPLORATION,   // evidence: each challenge → its lesson (mastery)
  // cumulative exams (kit/assess/exam.js): one per stage and one over the whole course, drawn from written schools only
  exams: scienceExams(UNITS, TRACKS),
  // the schools whose notes are written (tests/sciences.test.mjs checks this matches notes/)
  written: ["u01", "u02"],
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
});
