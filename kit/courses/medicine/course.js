// MedGradify Medicine: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE, EXPLORATION } from "./evidence.js";
export default {
  site: "MedGradify", slug: "medicine", name: "Medicine", app: "../app.html", page: "/medgradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a GMC-registered doctor who teaches medical students",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#4641ff", spectrum: "linear-gradient(90deg, #4641ff, #22d3ee)" },
  notice: "<b>Education for medical students, not medical advice or clinical guidance.</b> MedGradify teaches medicine for study and exam revision. The lessons were drafted with AI assistance and haven't yet been reviewed by a doctor, so they may contain errors: check important points against your medical school's teaching, current NICE guidance and the BNF. Nothing here can diagnose, treat or advise on a real person, and it gives no doses for real patients. If you or someone else is unwell, contact a doctor, call NHS 111, or in an emergency call 999.",
  interactives: INTERACTIVES, evidence: EVIDENCE, exploration: EXPLORATION,
  practiceNote: "Simulations run a stated physiological model and exercises check your reasoning with fictional patients and illustrative numbers. They build understanding; they don't assess clinical competence. Challenges inside them earn XP.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u03", "u04", "u05", "u06", "u07", "u08", "u09"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "The medical degree, from cells to clinics",
    intro: "Learn medicine the way a UK medical school teaches it: the science underneath, the consultation and examination, then every body system, acute care, the life course and the professional duties of a doctor. Each lesson has objectives, worked clinical examples, key terms, sources and questions that grow from recall to clinical reasoning. Mapped to the GMC's Outcomes for graduates and the MLA content map.",
    sources: "the GMC's Outcomes for graduates (2018), the MLA content map and Good medical practice, NICE guidance, the BNF, the Resuscitation Council UK, the Royal College of Physicians, NCBI Bookshelf, OpenStax Anatomy and Physiology 2e and the peer-reviewed literature",
    learn: [
      ["Medical science", "Cells, physiology, pathology, immunity, genetics and pharmacology: why disease happens and how drugs act."],
      ["Clinical method", "History, examination, NEWS2, clinical reasoning and the first-line tests: bloods, gases, ECGs and X-rays."],
      ["The body systems", "Cardiovascular, respiratory, gastrointestinal, renal, endocrine, neurological and musculoskeletal disease."],
      ["Mind, blood and defence", "Psychiatry, infection, haematology and oncology, with the law and risk assessment around them."],
      ["Acute care and the life course", "ABCDE, sepsis, shock and arrest; surgery; pregnancy, children, frailty and the end of life."],
      ["Being a safe doctor", "Ethics, consent, capacity, safe prescribing, patient safety, evidence-based medicine and population health."],
    ],
    featured: ["news2", "action-potential", "heart", "gas-exchange", "immune-response", "inheritance"],
    tools: [["Notes Studio", "Turn your own lecture notes and PDFs into flashcards and questions.", "../app.html#/notes"], ["Anatomy", "MedGradify's anatomy explorer.", "../anatomy.html"], ["NurseGradify", "The nursing course: care, assessment and medicines from the nursing side.", "/nursegradify/course/"]],
  },
  extras: [
    ["Anatomy", "MedGradify's anatomy explorer.", "../anatomy.html"],
    ["Learning map", "MedGradify's subjects on one map.", "../map.html"],
    ["PharmaGradify", "The companion course: pharmacy and pharmacology.", "/pharmagradify/course/"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
