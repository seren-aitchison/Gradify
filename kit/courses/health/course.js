// HealthGradify Health and Wellbeing: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "HealthGradify", slug: "health", name: "Health and Wellbeing", app: "../app.html", page: "/healthgradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a registered health professional or public health specialist who teaches health studies (for example a UKPHR-registered practitioner or a university lecturer in health and social care)",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#34d399", spectrum: "linear-gradient(90deg, #34d399, #22d3ee)" },
  notice: "<b>Education, not medical advice.</b> HealthGradify teaches health and wellbeing as an academic subject. The lessons were drafted with AI assistance and haven't yet been reviewed by health professionals, so they may contain errors; check important points against your course materials and official guidance (NHS, NICE, UKHSA). Nothing here can diagnose a condition, recommend a treatment or replace advice from someone who knows your health. For advice about your own health speak to your GP or a pharmacist, or call NHS 111; in an emergency call 999. If you are struggling with your mental health, Samaritans are on 116 123 (UK).",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceLabel: "Lab",
  practiceNote: "Interactives are reused from SciGradify Biology and PsychGradify: each runs a stated, simplified model of the body, so its numbers are illustrative, not clinical. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u03", "u04", "u05", "u06", "u07", "u08", "u09", "u10", "u11"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "How the body works, and what keeps people well",
    intro: "Health and Wellbeing follows health from the cell to the whole population: how the body's systems keep us alive, what nutrition, activity, sleep and mental wellbeing contribute, why people behave as they do about health, why health is unequal, and how public health and the NHS respond. It is modelled on the BTEC Nationals and T Level in Health and Social Care, the QAA Subject Benchmark Statement for Health Studies and the Faculty of Public Health's domains, and runs from Level 3 to first-year degree.",
    sources: "NHS guidance, NICE guidelines, UKHSA and the Office for Health Improvement and Disparities, the UK Chief Medical Officers' guidelines, the Office for National Statistics, the World Health Organization, OpenStax Anatomy and Physiology 2e and the peer-reviewed literature",
    learn: [
      ["The human body", "Homeostasis and the major body systems: heart, lungs, gut, liver, kidneys, immune, nervous, endocrine and musculoskeletal."],
      ["Living well", "Nutrition and the Eatwell Guide, the UK physical activity guidelines, sleep and stress, and what the evidence behind each says."],
      ["Mental health", "Mental health and illness, common problems, the Five Ways to Wellbeing, resilience and where to find help."],
      ["Behaviour and illness", "Models of health behaviour and behaviour change, risky behaviours, infection and the major long-term conditions."],
      ["Public health", "Determinants and inequalities, prevention, epidemiology from incidence to causation, outbreaks and global health."],
      ["Health and care services", "How the NHS and social care are organised, funded and regulated, with consent, confidentiality and ethics."],
    ],
    featured: ["organ-systems", "heart", "gas-exchange", "immune-response", "sleep", "stress"],
    tools: [["Notes Studio", "Turn your own health notes and PDFs into flashcards and questions.", "../app.html#/notes"], ["Your body in 3D", "HealthGradify's interactive 3D body.", "../3d.html"]],
  },
  extras: [
    ["Learning map", "HealthGradify's subjects on one map.", "../map.html"],
    ["Notes Studio", "Turn your own health notes and PDFs into flashcards and questions.", "../app.html#/notes"],
    ["SciGradify Biology", "The companion course for the biology of the body.", "/scigradify/biology/"],
  ],
};
