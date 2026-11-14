// MusicGradify Music: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "MusicGradify", slug: "music", name: "Music", app: "../app.html", page: "/musicgradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a university music lecturer or ABRSM examiner",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#c9a25e", spectrum: "linear-gradient(90deg, #c9a25e, #22d3ee)" },
  notice: "<b>Study material, not an exam board or a teacher.</b> MusicGradify teaches music theory, history and musicianship for study. The lessons were drafted with AI assistance and haven't yet been reviewed by a music lecturer or examiner, so they may contain errors; check important points against your course materials, the current ABRSM syllabus or your exam board's specification. It isn't an ABRSM, Trinity or exam board product, doesn't award grades or qualifications, and can't replace lessons with a qualified instrumental, vocal or theory teacher.",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Interactives run a stated physical model of sound (an ideal string, pure sine tones) or check your reasoning. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u03", "u04", "u05", "u06", "u07", "u08", "u09", "u10", "u11"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "Read it, hear it, understand it",
    intro: "Music theory and musicianship from the first note on the stave to first-year university: notation and rhythm, scales and keys, harmony and voice leading, form, counterpoint, instruments and sound, history from plainchant to film music, jazz, popular and world music, analysis and composition, with questions that grow from recall to evaluation.",
    sources: "the ABRSM Music Theory syllabus and Music Theory in Practice, Taylor's AB Guide to Music Theory, Grove Music Online, Open Music Theory, the standard tonal harmony textbooks and the AQA, Edexcel and OCR GCSE and A level specifications",
    learn: [
      ["Notation and rhythm", "The stave, clefs, accidentals, note values, simple and compound time, tempo, dynamics and ornaments."],
      ["Scales, keys and intervals", "Major and minor keys, the circle of fifths, modes and other scales, every interval and transposition."],
      ["Harmony and voice leading", "Triads, sevenths, Roman numerals, cadences, four-part writing, figured bass and chromatic chords."],
      ["Form and counterpoint", "Phrases, binary, ternary, rondo, variation and sonata forms; species counterpoint, canon and fugue."],
      ["Sound and instruments", "The harmonic series, tuning and timbre, the orchestra's families and the craft of orchestration."],
      ["History and cultures", "Western music from the medieval period to today, jazz and popular music, and music around the world."],
    ],
    featured: ["harmonics", "beats"],
    tools: [["Keyboard in 3D", "Play scales and chords on a 3D keyboard, with the stave and circle of fifths.", "../3d.html"], ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["Learning map", "MusicGradify's subjects on one map.", "../map.html"],
    ["Keyboard in 3D", "A playable 3D keyboard with the major scale, chords, a grand stave and the circle of fifths.", "../3d.html"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
