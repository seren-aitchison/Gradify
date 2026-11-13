// DentalGradify Dentistry: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "DentalGradify", slug: "dentistry", name: "Dentistry", app: "../app.html", page: "/dentalgradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a registered dentist (GDC) and dental educator",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#40d4b1", spectrum: "linear-gradient(90deg, #40d4b1, #22d3ee)" },
  notice: "<b>Education, not dental advice.</b> DentalGradify teaches dentistry for study. The lessons were drafted with AI assistance and haven't yet been reviewed by a registered dentist, so they may contain errors; check important points against your course materials, the GDC and current guidance (SDCEP, NICE, Delivering Better Oral Health). Nothing here diagnoses a condition, recommends treatment or a dose for a real patient, or authorises anyone to practise. If you have a dental problem, see your dentist; for urgent dental problems call NHS 111; call 999 for swelling that affects breathing or swallowing.",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Interactives run a stated model or check your reasoning. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u03", "u04", "u06"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "The science and practice of dentistry",
    intro: "Dentistry, mapped to the GDC's Preparing for Practice learning outcomes and a UK BDS curriculum: from the anatomy of the head and neck and the tissues of the teeth to caries, periodontal disease, materials, radiography and clinical care, with check questions that grow from recall to clinical reasoning.",
    sources: "the GDC (Preparing for Practice and the Standards for the Dental Team), Delivering Better Oral Health (OHID), SDCEP guidance, NICE, HTM 01-05, IRR17 and IR(ME)R, Berkovitz, Holland and Moxham's Oral Anatomy, Histology and Embryology, Ten Cate's Oral Histology, Craig's Restorative Dental Materials, Kidd's Essentials of Dental Caries and the peer-reviewed literature",
    learn: [
      ["Anatomy and tissues", "The head and neck, every tooth, and the development and histology of enamel, dentine, pulp and periodontium."],
      ["Oral biology", "Saliva, the oral microbiome and biofilm, and infection prevention and control."],
      ["Oral disease", "Caries, periodontal disease, mucosal disease, oral cancer and orofacial pain."],
      ["Prevention and public health", "Fluoride, Delivering Better Oral Health, epidemiology and inequalities in oral health."],
      ["Clinical sciences", "Dental materials, radiography and radiation protection under IRR17 and IR(ME)R."],
      ["Clinical dentistry and professionalism", "Restorative, endodontic, prosthodontic, paediatric, orthodontic and surgical care, pain control, and the GDC Standards."],
    ],
    featured: ["action-potential"],
    tools: [["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["Learning map", "DentalGradify's subjects on one map.", "../map.html"],
    ["The mouth in 3D", "DentalGradify's interactive 3D mouth.", "../3d.html"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
