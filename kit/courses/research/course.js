// PostGradify Research and the Dissertation: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "PostGradify", slug: "research", name: "Research and the Dissertation", app: "../app.html", page: "/postgradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a university research supervisor or doctoral training lead",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#5aa63a", spectrum: "linear-gradient(90deg, #7cc35a, #5aa63a 35%, #2e8b57 65%, #22d3ee)" },
  notice: "<b>General guidance, not your institution's rules.</b> PostGradify teaches research skills for Master's and doctoral study. The lessons were drafted with AI assistance and haven't yet been reviewed by research supervisors, so they may contain errors. Regulations on progression, word limits, ethics review, data protection and examination differ between universities and funders and change over time: always follow your own institution's regulations, your ethics committee and your supervisor. Nothing here is legal advice on data protection or a substitute for formal ethical approval.",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Interactives run a stated model or check your reasoning; data sets are labelled as real (with their source) or simulated. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "methods", title: "Methods and statistics", sub: "Design, quantitative, qualitative and mixed methods, including calculations.", units: [4, 5, 6, 7], format: "science", count: 25, minutes: 40, pass: 0.7 },
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u07"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "From research question to viva",
    intro: "Everything a Master's or doctoral researcher needs between a first idea and a finished thesis: how the research system works, how to frame a question and review the literature, the philosophy behind methods, research design, quantitative and qualitative analysis, ethics and integrity, open research, writing, publishing, the viva and the careers that follow.",
    sources: "the Vitae Researcher Development Framework, UKRI and ESRC postgraduate training guidance, the QAA qualification frameworks, the UKRIO Code of Practice for Research, the Concordat to Support Research Integrity, Creswell and Creswell's Research Design, Braun and Clarke on thematic analysis, Phillips and Pugh's How to Get a PhD, Field's Discovering Statistics and the methods literature",
    learn: [
      ["The research degree", "How Master's, MPhil and PhD study works: supervision, progression and the skills in the Vitae RDF."],
      ["Questions and literature", "Framing answerable questions, searching systematically, appraising critically and writing a review that argues."],
      ["Philosophy and design", "Ontology, epistemology and paradigms, and how they shape a coherent, defensible design."],
      ["Methods and analysis", "Statistics from description to regression, qualitative analysis from coding to grounded theory, and mixed methods."],
      ["Ethics, integrity and open research", "Consent and harm, ethics review, the UK integrity framework, data protection, data management and reproducibility."],
      ["Writing, publishing and the viva", "The thesis chapter by chapter, journals and peer review, impact, the viva and careers."],
    ],
    featured: ["hypothesis-test", "coding", "study-critique", "sampling", "ethics", "survey-design"],
    tools: [["Notes Studio", "Turn your own reading notes and PDFs into flashcards and questions.", "../app.html#/notes"], ["PsychGradify research methods", "Psychology's schools on research methods and statistics.", "/psychgradify/course/"], ["SocGradify", "Sociology, with social research methods and statistics.", "/socgradify/course/"]],
  },
  extras: [
    ["Learning map", "PostGradify's subjects on one map.", "../map.html"],
    ["Notes Studio", "Turn your own reading notes and PDFs into flashcards and questions.", "../app.html#/notes"],
    ["PsychGradify", "Psychology, including research methods and statistics.", "/psychgradify/course/"],
    ["SocGradify", "Sociology, including social research methods.", "/socgradify/course/"],
  ],
};
