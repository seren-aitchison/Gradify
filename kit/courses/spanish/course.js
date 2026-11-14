// LanguageGradify Spanish: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "LanguageGradify", slug: "spanish", name: "Spanish", app: "../app.html", page: "/languagegradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a qualified Spanish teacher or university Spanish lecturer",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#e8846f", spectrum: "linear-gradient(90deg, #e8846f, #22d3ee)" },
  notice: "<b>Study material, not a qualification or an exam board.</b> LanguageGradify teaches Spanish grammar, vocabulary, pronunciation and culture for study. The lessons were drafted with AI assistance and haven't yet been reviewed by a Spanish teacher or lecturer, so they may contain errors; check important points against your course materials, your exam board's specification and a reference grammar. It isn't an Instituto Cervantes (DELE), AQA, Edexcel or Eduqas product, doesn't award a CEFR level or any grade, and can't replace speaking practice with a teacher and with native speakers.",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Exercises check your Spanish against the forms taught in the lesson. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u03", "u04", "u05", "u06", "u07", "u08"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "From hola to confident B2",
    intro: "Spanish from your first words to the threshold of fluency: pronunciation and spelling, the whole verb system from the present to the imperfect subjunctive, ser and estar, pronouns, por and para, the vocabulary of everyday life, and the cultures of Spain and Latin America, with examples translated line by line and questions that grow from recall to evaluation.",
    sources: "the Council of Europe CEFR and its Companion Volume, the Instituto Cervantes Plan Curricular, the RAE and ASALE Nueva gramática and Ortografía, the DfE GCSE French, German and Spanish subject content (2022), Butt and Benjamin's A New Reference Grammar of Modern Spanish and the A level Spanish specifications",
    learn: [
      ["Sounds and spelling", "The alphabet, vowels, stress and written accents, and the consonants that trip English speakers up."],
      ["The verb system", "Present, preterite, imperfect, perfect, future, conditional and the subjunctive, regular and irregular."],
      ["Core grammar", "Gender and agreement, ser and estar, object pronouns, reflexives, comparisons, por and para and the passive."],
      ["Everyday topics", "Family, school, food, home, town, travel, shopping, work and plans, in the vocabulary GCSE expects."],
      ["The Spanish-speaking world", "Spain, Mexico, the Andes, the Southern Cone, the Caribbean and the US: history, festivals, art and music."],
      ["Exam skills", "Listening and reading strategies, role plays, photo description, essays, translation both ways and dictation."],
    ],
    featured: [],
    tools: [["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["Learning map", "LanguageGradify's subjects on one map.", "../map.html"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
