// SportGradify Sport and Exercise Science: the curriculum, notes, interactives and quality record, handed to the shared
// course engine (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "SportGradify", slug: "sport", name: "Sport and Exercise Science", app: "../app.html", page: "/sportgradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a BASES-accredited sport and exercise scientist and university lecturer",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  // the three levels every question is written at: recall, application, then evaluation and reasoning
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#4a6cf0", spectrum: "linear-gradient(90deg, #4a6cf0, #3b82f6 35%, #0ea5e9 70%, #22d3ee)" },
  notice: "<b>Education, not medical or personal training advice.</b> SportGradify teaches sport and exercise science. The lessons were drafted with AI assistance and haven't yet been reviewed by subject experts, so they may contain errors; check important points against your course materials. Nothing here assesses your own health or fitness, prescribes a training or diet plan, or replaces a qualified professional. If you have a health condition, are pregnant, or have symptoms such as chest pain, dizziness or breathlessness with exertion, check with your GP before starting new exercise; for an injury, see a physiotherapist or sports medicine doctor. In an emergency call 999.",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Simulations run a stated physiological or physical model; exercises check your reasoning. Each says what it simplifies. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "alevel-paper1", title: "Applied anatomy and physiology", sub: "Musculoskeletal and cardiorespiratory systems and energy systems, including calculations.", units: [1, 2, 3], format: "science", count: 25, minutes: 40, pass: 0.7 },
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u03", "u04", "u05", "u06", "u07", "u08", "u09", "u12"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "The science of human performance",
    intro: "Sport and exercise science explains how the body moves, fuels itself, adapts to training and learns skills, and how minds, coaches and societies shape performance and health. Learn it from bones and muscle fibres to biomechanics, nutrition, psychology and physical activity policy, run physiological and physical simulations, and practise on questions that grow from recall to evaluation and calculation.",
    sources: "the AQA and OCR A level Physical Education specifications, the QAA Subject Benchmark Statement for Events, Hospitality, Leisure, Sport and Tourism, BASES, the UK Chief Medical Officers' Physical Activity Guidelines (2019), ACSM, the NSCA's Essentials of Strength Training and Conditioning, McArdle, Katch and Katch's Exercise Physiology, Weinberg and Gould's Foundations of Sport and Exercise Psychology, and the peer-reviewed literature",
    learn: [
      ["The body in action", "Functional anatomy, the musculoskeletal and cardiorespiratory systems, and the energy systems that power movement."],
      ["Exercise physiology", "How the body responds and adapts to training, heat, cold and altitude, across ages and populations."],
      ["Biomechanics", "Newton's laws, impulse, levers, projectiles, fluid forces and angular momentum, with calculations."],
      ["Training, testing and nutrition", "Programme design, periodisation, valid fitness testing, and fuelling and hydration on the evidence."],
      ["Mind and skill", "Motivation, confidence, anxiety and groups, how skills are learned, and the craft of coaching."],
      ["Health, injury and society", "Physical activity guidelines, injury and rehabilitation, and sport's place in society."],
    ],
    featured: ["heart", "gas-exchange", "motor-neurone", "projectile", "respiration", "reaction-time"],
    tools: [
      ["Body Intelligence", "Your body in 3D: the major muscle groups, skeleton, heart and lungs, coloured by your own logged training.", "../body.html"],
      ["The athlete in 3D", "SportGradify's 3D anatomy model of the athlete.", "../3d.html"],
      ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
    ],
  },
  extras: [
    ["Body Intelligence", "Your body in 3D: muscle groups, skeleton, heart and lungs, coloured by your logged training.", "../body.html"],
    ["Learning map", "SportGradify's subjects on one map.", "../map.html"],
    ["Notes Studio", "Turn your own sport science notes and PDFs into flashcards and questions.", "../app.html#/notes"],
    ["PsychGradify", "The companion course for sport psychology's roots: psychology.", "/psychgradify/course/"],
  ],
};
