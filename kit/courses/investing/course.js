// InvestorGradify Investing: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "InvestorGradify", slug: "investing", name: "Investing", app: "../app.html", page: "/investorgradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "an FCA-regulated investment professional or CFA charterholder educator",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#b8ba6e", spectrum: "linear-gradient(90deg, #b8ba6e, #22d3ee)" },
  notice: "<b>Education, not financial advice.</b> InvestorGradify teaches how investing works. It never tells you what to buy or sell, and nothing here is a personal recommendation. The value of investments can fall as well as rise and you may get back less than you put in: your capital is at risk. Tax rules, allowances and limits change and depend on your circumstances; figures are labelled with their tax year or marked illustrative. The lessons were drafted with AI assistance and haven't yet been reviewed by an expert, so check important points against official sources. For a decision about your own money, use a financial adviser authorised by the FCA (check the FCA Register) or free, impartial guidance from MoneyHelper.",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Interactives run a stated model or check your reasoning; every number in them is illustrative, not a forecast. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u07"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "How investing really works",
    intro: "Investing is putting money to work for the long term, knowing it can fall as well as rise. Start with the money basics that come before it, then learn how markets, assets, risk, portfolios, valuation, company accounts, funds, costs, behaviour, UK wrappers and consumer protection work, on questions that grow from recall to evaluation. Education, never a tip.",
    sources: "the CISI Fundamentals of Financial Services and Investment Operations Certificate syllabuses, CFA Institute Investment Foundations, the FCA, MoneyHelper, HMRC, the Bank of England, Bodie, Kane and Marcus's Investments, Malkiel's A Random Walk Down Wall Street and the Barclays Equity Gilt Study",
    learn: [
      ["Money foundations", "Budgets, emergency funds, debt, compound interest, inflation and the time value of money."],
      ["Markets and assets", "How the financial system and exchanges work, and what cash, bonds, shares, property and funds are."],
      ["Risk and portfolios", "Measuring risk and return, diversification, portfolio theory and asset allocation."],
      ["Valuation and accounts", "Discounted cash flow, P/E and yields, and reading a company's annual report."],
      ["Costs and behaviour", "Index funds, charges that compound, and the biases that cost investors most."],
      ["UK rules and protection", "ISAs, pensions and tax, the FCA, the FSCS, scams, ethics and ESG, and building a plan."],
    ],
    featured: [],
    tools: [["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["Learning map", "InvestorGradify's subjects on one map.", "../map.html"],
    ["MoneyHelper", "Free, impartial money and pensions guidance, backed by the UK government.", "https://www.moneyhelper.org.uk/"],
    ["FCA Register", "Check that a firm or adviser is authorised before you deal with them.", "https://register.fca.org.uk/"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
