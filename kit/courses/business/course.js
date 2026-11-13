// BusinessGradify Business and Management: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE, EXPLORATION } from "./evidence.js";
export default {
  site: "BusinessGradify", slug: "business", name: "Business and Management", app: "../app.html", page: "/businessgradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a university business school lecturer",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  // the three levels every question is written at: recall, application, then analysis and evaluation
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#9b7fd4", spectrum: "linear-gradient(90deg, #9b7fd4, #818cf8 50%, #22d3ee)" },
  notice: "<b>Education, not business, legal, tax or financial advice.</b> BusinessGradify teaches business and management for study. The lessons were drafted with AI assistance and haven't yet been reviewed by subject experts, so they may contain errors; check important points against your course materials. Laws, tax rules, thresholds and economic figures change: for a decision about a real business, check GOV.UK, Companies House and HMRC, and speak to a qualified accountant, solicitor or business adviser (in England, your local Growth Hub can point you to free support).",
  interactives: INTERACTIVES, evidence: EVIDENCE, exploration: EXPLORATION,
  practiceNote: "Interactives run a stated model or check your reasoning. Data sets are labelled as real (with their source) or illustrative. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u03", "u04", "u05", "u06", "u07", "u08", "u09", "u10"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "How organisations work, compete and create value",
    intro: "Business and management from first principles, what a business is and who it serves, to strategy, marketing, operations, people, finance, digital business and governance. Each lesson uses real UK and international cases, the classic theories and the evidence on them, and questions that grow from recall to evaluation, as at A level and in the first year of a business degree.",
    sources: "the QAA Subject Benchmark Statement for Business and Management, the A level Business subject content, OpenStax Introduction to Business, Principles of Management and Organizational Behavior, the classic works of Taylor, Fayol, Weber, Mintzberg, Porter and Kotler, the CIPD, Companies House, GOV.UK, legislation.gov.uk, the ONS and the Bank of England",
    learn: [
      ["The business environment", "What businesses are for, their stakeholders, legal forms and the PESTLE forces around them."],
      ["Management and people", "What managers do, structure, motivation, leadership, teams, culture and change, and HRM."],
      ["Strategy", "Five forces, resources and capabilities, the value chain, generic strategies and growth options."],
      ["Marketing and operations", "Customers, the marketing mix and brands; processes, quality, lean and supply chains."],
      ["Finance and economics", "Financial statements, ratios, costs and budgets, investment appraisal, markets and the macroeconomy."],
      ["Innovation, digital and ethics", "Entrepreneurship, digital business and data, governance, ESG and corporate integrity."],
    ],
    featured: ["forecasting"],
    tools: [["Notes Studio", "Turn your own lecture notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["Learning map", "BusinessGradify's subjects on one map.", "../map.html"],
    ["Notes Studio", "Turn your own business notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
