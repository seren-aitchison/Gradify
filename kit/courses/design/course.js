// CreateGradify Design Thinking and Creativity: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "CreateGradify", slug: "design", name: "Design Thinking and Creativity", app: "../app.html", page: "/creategradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a university design lecturer or practising product/UX designer",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#f0466e", spectrum: "linear-gradient(90deg, #f0466e, #22d3ee)" },
  notice: "<b>Study material, not a qualification or professional advice.</b> CreateGradify teaches design thinking, creativity and design practice for study. The lessons were drafted with AI assistance and haven't yet been reviewed by design lecturers or practitioners, so they may contain errors; check important points against your course materials and the sources cited. Accessibility lessons explain WCAG and UK law for learning, not as a compliance audit, and intellectual property lessons are not legal advice: for a real product, use the UK IPO's guidance and a registered patent or trade mark attorney.",
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
    headline: "Design for people, from first idea to finished product",
    intro: "Design thinking is a disciplined way of solving problems for real people: understand them, frame the right problem, generate many ideas, prototype, test and iterate. Learn the psychology of creativity, the methods professionals use, the principles of visual, interaction and inclusive design, materials and manufacture, services and systems, sustainability, ethics and how to pitch and protect your ideas.",
    sources: "GCSE and A level Design and Technology specifications, the Design Council's Double Diamond, Norman's The Design of Everyday Things, Brown's Change by Design, the Stanford d.school, Nielsen Norman Group, W3C WCAG 2.2, the Ellen MacArthur Foundation and the UK IPO",
    learn: [
      ["Design thinking", "What design is, the Double Diamond, d.school and iterative models, and wicked problems."],
      ["Creativity", "How creative thinking works, how it is measured, and how to break fixation and build confidence."],
      ["Research and framing", "Interviews, observation and synthesis, then briefs, specifications and well-framed problems."],
      ["Prototyping and testing", "Prototypes at every fidelity, usability testing, heuristics, experiments and iteration."],
      ["Interfaces, products and access", "Visual and interaction principles, WCAG 2.2, inclusive design, materials and manufacture."],
      ["Responsible practice", "Services and systems, circular design, ethics, collaboration, pitching and intellectual property."],
    ],
    featured: [],
    tools: [["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["Learning map", "CreateGradify's subjects on one map.", "../map.html"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
