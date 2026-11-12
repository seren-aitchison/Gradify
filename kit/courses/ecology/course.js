// EcoGradify Ecology and Environmental Science: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "EcoGradify", slug: "ecology", name: "Ecology and Environmental Science", app: "../app.html", page: "/ecogradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a university ecology lecturer",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#6aa84f", spectrum: "linear-gradient(90deg, #6aa84f, #22d3ee)" },
  notice: "<b>Study material, not a qualification or professional advice.</b> EcoGradify teaches ecology and environmental science. The lessons were drafted with AI assistance and haven't yet been reviewed by subject experts, so they may contain errors; check important points against your course materials, your exam board's specification and official sources such as the IPCC, JNCC and DEFRA. Figures for populations, emissions and policy change over time: each is given with its year. Nothing here is an ecological survey, an environmental impact assessment or legal advice on planning or wildlife law; for real sites, protected species or development, consult a qualified ecologist (for example a CIEEM member) and the relevant statutory body (Natural England, NatureScot, Natural Resources Wales or DAERA). In the field, follow your organiser's risk assessment and the Countryside Code.",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Interactives run a stated model or check your reasoning. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "methods", title: "Field methods and statistics", sub: "Study design, sampling, abundance measures and the statistical tests, including calculations.", units: [9, 2], format: "science", count: 25, minutes: 40, pass: 0.7 },
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u03", "u04"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "How living things and their environment work together",
    intro: "Ecology studies how organisms interact with each other and with their physical surroundings, and environmental science applies that knowledge to the resources, pollution and policy choices people face. Learn it from a single population to the global carbon cycle, run population and food-web models, practise field methods and statistics, and answer questions that grow from recall to evaluation.",
    sources: "OpenStax Biology 2e, Begon and Townsend's Ecology, the AQA A level Biology and Environmental Science specifications, the IPCC Sixth Assessment Report, IPBES, the IUCN Red List, JNCC, DEFRA and the peer-reviewed literature",
    learn: [
      ["Organisms and environment", "Abiotic factors, tolerance, adaptation, the niche, biomes and biogeography."],
      ["Populations and communities", "Growth, regulation and life histories; competition, predation, mutualism and succession."],
      ["Ecosystems and cycles", "Food webs, productivity and energy transfer; the carbon, nitrogen, phosphorus and water cycles."],
      ["Biodiversity and conservation", "How diversity evolves and is measured, why it is declining and what protects it."],
      ["Climate and global change", "The greenhouse effect, the evidence and projections, and the impacts on ecosystems."],
      ["Fieldwork and sustainability", "Sampling, statistics and modern methods; resources, pollution, economics and policy."],
    ],
    featured: [],
    tools: [["Notes Studio", "Turn your own ecology notes and fieldwork write-ups into flashcards and questions.", "../app.html#/notes"], ["SciGradify Biology", "The companion course: cells, genetics, physiology and evolution.", "/scigradify/biology/"]],
  },
  extras: [
    ["Learning map", "EcoGradify's subjects on one map.", "../map.html"],
    ["Notes Studio", "Turn your own ecology notes and PDFs into flashcards and questions.", "../app.html#/notes"],
    ["SciGradify Biology", "The companion course: cells, genetics, physiology and evolution.", "/scigradify/biology/"],
  ],
};
