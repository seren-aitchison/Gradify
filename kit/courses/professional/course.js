// ProGradify Professional Skills: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "ProGradify", slug: "professional", name: "Professional Skills", app: "../app.html", page: "/progradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a chartered CIPD or CMI professional development practitioner",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#e69138", spectrum: "linear-gradient(90deg, #e69138, #22d3ee)" },
  notice: "<b>General guidance, not legal or HR advice.</b> ProGradify teaches professional skills for study and self-development. The lessons were drafted with AI assistance and haven't yet been reviewed by subject experts, so they may contain errors; check important points against official sources. It is not a CMI, CIPD, APM or PRINCE2 qualification and is not endorsed by those bodies. Lessons on employment rights and equality describe the law of Great Britain in general terms only: for a problem at work, read your employer's policies and contact ACAS (0300 123 1100), Citizens Advice, a trade union or a qualified employment adviser or solicitor. If work is affecting your health, speak to your GP.",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Practise with the check questions in each lesson: recall first, then applying a skill to a workplace scenario, then evaluating approaches. Written answers are self-assessed against marking points.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "workplace", title: "Communication and people", sub: "Writing, meetings, presenting, feedback, teams, influence, negotiation and conflict, applied to scenarios.", units: [1, 2], format: "science", count: 25, minutes: 40, pass: 0.7 },
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u03", "u04", "u05", "u06", "u07", "u08", "u10"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "The skills that make work work",
    intro: "Professional skills are how good work gets done with and through other people. Learn to write, speak and listen clearly, build teams and influence, lead and manage, run projects, prioritise, solve problems, use data, understand the business and your rights, and grow a career, practising on workplace scenarios from recall to judgement.",
    sources: "the CMI Level 5 Management and Leadership units, the CIPD Profession Map, the APM Body of Knowledge, PRINCE2 and the Agile Manifesto, the Skills Builder Universal Framework, ACAS, GOV.UK, the HSE and the management literature, including Harvard Business Review",
    learn: [
      ["Communication", "Listening, questioning, plain-English writing, emails, reports, meetings, presentations and feedback."],
      ["Working with people", "Teams, psychological safety, influence, stakeholders, negotiation and handling conflict."],
      ["Leadership and management", "What managers do, leadership theories, motivation, delegation, coaching, performance and change."],
      ["Projects and productivity", "Business cases, plans, risk, PRINCE2, Agile and Scrum, and managing your own time and focus."],
      ["Decisions, data and business", "Root causes, options, bias, evidence, spreadsheets and charts, financial statements and strategy."],
      ["Ethics, rights and career", "Professional integrity, the Equality Act 2010, employment basics, wellbeing, CPD and career planning."],
    ],
    featured: [],
    tools: [["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["Learning map", "ProGradify's subjects on one map.", "../map.html"],
    ["ACAS", "Free, impartial advice on workplace rights, rules and best practice in Great Britain.", "https://www.acas.org.uk/"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
