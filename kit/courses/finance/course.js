// FinanceGradify Accounting and Finance: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "FinanceGradify", slug: "finance", name: "Accounting and Finance", app: "../app.html", page: "/financegradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a chartered accountant (ACCA, ICAEW or CIMA) or a university accounting and finance lecturer",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#10b981", spectrum: "linear-gradient(90deg, #10b981, #22d3ee)" },
  notice: "<b>Education, not financial, tax or investment advice.</b> FinanceGradify teaches accounting and finance for study and exams. The lessons were drafted with AI assistance and haven't yet been reviewed by a qualified accountant, so they may contain errors; check important points against your course materials, the current standards and HMRC guidance. Tax rates, allowances and standards change every year, and worked examples use simplified figures. Nothing here is a recommendation to buy, sell or hold any investment, or advice on your own tax or finances: for that, speak to a firm or adviser authorised by the Financial Conduct Authority, or a chartered accountant or chartered tax adviser.",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Interactives run a stated model or check your reasoning. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u03", "u04", "u05", "u06", "u07", "u08", "u09"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "How organisations record, report, manage and finance what they do",
    intro: "Accounting is the language of business; finance is how money is raised, priced and put to work. Learn double entry from the first transaction, build financial statements under IFRS, cost products and plan budgets, appraise investments, and see how audit, tax and law hold the system to account, with calculations checked at every step.",
    sources: "the IFRS Accounting Standards and Conceptual Framework (IFRS Foundation), the FRC, UK legislation (legislation.gov.uk), HMRC manuals and GOV.UK guidance, the ACCA and ICAEW syllabuses and technical articles, the QAA Subject Benchmark Statements for Accounting and Finance, and the peer-reviewed literature",
    learn: [
      ["Bookkeeping and double entry", "The accounting equation, ledgers, the trial balance, control accounts and bank reconciliations."],
      ["Financial statements", "Sole trader, partnership, company and group accounts, prepared under IFRS."],
      ["Analysis", "Ratios, cash flows and the quality of earnings: what the numbers do and do not show."],
      ["Management accounting", "Costing, CVP, budgets, standard costs, variances and performance measurement."],
      ["Financial management", "NPV and IRR, working capital, the cost of capital, valuation, markets and risk."],
      ["Audit, tax and law", "How audits work, the UK tax system and the law that governs companies and accountants."],
    ],
    featured: [],
    tools: [["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["Learning map", "FinanceGradify's subjects on one map.", "../map.html"],
    ["BusinessGradify", "The companion site: business and management.", "/businessgradify/"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
