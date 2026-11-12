// InternshipGradify Careers and Employability: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "InternshipGradify", slug: "careers", name: "Careers and Employability", app: "../app.html", page: "/internshipgradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a qualified careers adviser (CDI registered) or university careers consultant",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#0aa4c9", spectrum: "linear-gradient(90deg, #0aa4c9, #22d3ee)" },
  notice: "<b>General careers guidance, not personal advice.</b> InternshipGradify teaches careers and employability for UK students and graduates. The lessons were drafted with AI assistance and haven't yet been reviewed by a qualified careers professional, so they may contain errors, and pay figures, dates and employer practices change; check them against Prospects, the National Careers Service, gov.uk and ACAS. Nothing here is legal, financial or immigration advice. For guidance on your own situation, book a session with your university or college careers service or the National Careers Service (0800 100 900, England).",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Interactives run a stated model or check your reasoning. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "Know yourself, find your route, win the job",
    intro: "Careers and Employability takes you from understanding your own skills, values and strengths to researching sectors, gaining experience, building a network and getting through CVs, applications, psychometric tests, interviews and assessment centres, then into starting work, working for yourself and managing a career for life. Every lesson is built on scenarios and worked examples.",
    sources: "the CDI Career Development Framework, the Gatsby Benchmarks, Prospects and AGCAS, the ISE Student Recruitment Survey, ONS labour market data, the National Careers Service, gov.uk and ACAS",
    learn: [
      ["Self-assessment", "Skills, values, strengths, interests and goals, and the career theories behind them."],
      ["Exploring options", "Labour market information, sectors, employers, job profiles and making decisions."],
      ["Experience and networks", "Internships, placements, insight days, volunteering, networking and LinkedIn."],
      ["Applications", "CVs, cover letters, application forms, STAR answers and psychometric tests."],
      ["Selection", "Telephone, video, case and technical interviews and every assessment centre exercise."],
      ["Starting and sustaining a career", "Graduate schemes, apprenticeships, contracts and rights, freelancing, enterprise and resilience."],
    ],
    featured: [],
    tools: [["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["National Careers Service", "Free, impartial careers advice and job profiles for England.", "https://nationalcareers.service.gov.uk/"],
    ["Learning map", "InternshipGradify's subjects on one map.", "../map.html"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
