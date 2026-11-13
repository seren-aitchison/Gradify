// LanguageGradify Japanese: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "LanguageGradify", slug: "japanese", name: "Japanese", app: "../app.html", page: "/languagegradify/japanese/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a qualified Japanese teacher or university Japanese lecturer",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#e05a6a", spectrum: "linear-gradient(90deg, #e05a6a, #22d3ee)" },
  notice: "<b>Study material, not a qualification or an exam board.</b> LanguageGradify teaches Japanese writing, grammar, vocabulary, pronunciation and culture for study. The lessons were drafted with AI assistance and haven't yet been reviewed by a Japanese teacher or lecturer, so they may contain errors; check important points against your course materials, your exam board's specification and a reference grammar. It isn't a Japan Foundation, JEES (JLPT) or Pearson Edexcel product, doesn't award a JLPT level, a CEFR level or any grade, and can't replace speaking practice with a teacher and with native speakers.",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Exercises check your Japanese against the forms taught in the lesson. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "From hiragana to confident N3",
    intro: "Japanese from your first kana to the intermediate level: the sounds and pitch of the language, hiragana, katakana and the kanji to around JLPT N3, particles, verb groups and every common conjugation from the masu form to the causative-passive, adjectives and counters, keigo, and the culture behind the language, with every example in kana and kanji, romaji and English and questions that grow from recall to evaluation.",
    sources: "the Japan Foundation and JEES Japanese-Language Proficiency Test (JLPT) and its official guides, the JF Standard for Japanese-Language Education, Banno, Ikeda, Ohno, Shinagawa and Tokashiki's Genki (third edition), Makino and Tsutsui's A Dictionary of Basic Japanese Grammar and A Dictionary of Intermediate Japanese Grammar, the Agency for Cultural Affairs Joyo kanji list (2010), Gendai kanazukai and Keigo no shishin, and the Pearson Edexcel GCSE Japanese specification",
    learn: [
      ["The writing system", "Hiragana, katakana and kanji: how they divide the work, stroke order, readings, radicals and compounds."],
      ["Sounds and pitch", "Morae, long vowels and double consonants, devoicing and the pitch accent of standard Tokyo Japanese."],
      ["Particles and sentences", "Wa and ga, o, ni, e, de, to, mo and no, and how Japanese builds a sentence around the verb at the end."],
      ["Verbs and adjectives", "The three verb groups, masu and plain forms, the te-form, potential, volitional, conditional, passive and causative."],
      ["Keigo and register", "Polite, honorific and humble speech, in-group and out-group, and the Japanese of shops, phone calls and emails."],
      ["Culture and exam skills", "Festivals, religion, etiquette and modern Japan, and the JLPT and GCSE papers: listening, reading, speaking and writing."],
    ],
    featured: [],
    tools: [["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["Learning map", "LanguageGradify's subjects on one map.", "../map.html"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
