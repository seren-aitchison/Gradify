// VetGradify Veterinary Science: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "VetGradify", slug: "veterinary", name: "Veterinary Science", app: "../app.html", page: "/vetgradify/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "a veterinary surgeon (MRCVS) educator",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "#4fb884", spectrum: "linear-gradient(90deg, #4fb884, #22d3ee)" },
  notice: "<b>Education, not veterinary advice.</b> VetGradify teaches veterinary science for study. It isn't a veterinary qualification, doesn't replace your degree's teaching or extra-mural studies, and doesn't authorise anyone to treat animals. Only a veterinary surgeon can diagnose, prescribe and treat (Veterinary Surgeons Act 1966). Doses and figures in worked examples are illustrative, never for a real animal. If you are worried about an animal, contact your vet; out of hours, contact an emergency vet. The lessons were drafted with AI assistance and haven't yet been reviewed by a veterinary surgeon, so they may contain errors: check important points against your course materials, the BSAVA formulary and official RCVS, VMD and APHA guidance.",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Interactives run a stated physiological model or check your reasoning. Several are SciGradify Biology simulations with values from textbook (often human) physiology: the mechanisms are shared by domestic mammals, but species values differ, and the notes give the comparative detail. Challenges inside them earn XP and count as evidence for their lesson.",
  // the AI tutor in lessons: education only, never advice on a real animal
  tutor: "Answers come from Gradify AI, using this lesson's notes. It's education, not veterinary advice: it can't examine, diagnose or prescribe for a real animal, which only a veterinary surgeon can do. It can be wrong, so check it against the notes.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: `stage-${i + 1}`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: ["u01", "u02", "u08"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  overview: {
    headline: "The science and practice of animal health",
    intro: "Veterinary science is the comparative study of animal bodies, their diseases and their welfare, applied to the care of individual animals, herds and the public. Learn it as a UK veterinary degree teaches it, from the anatomy of the dog, horse and cow to clinical reasoning, herd health and the RCVS Code, with questions that grow from recall to clinical evaluation.",
    sources: "the RCVS (Day One Competences and the Code of Professional Conduct), DEFRA, APHA and the VMD, WOAH, the BSAVA manuals, Dyce, Sack and Wensing's Textbook of Veterinary Anatomy, Cunningham's Textbook of Veterinary Physiology, the Merck Veterinary Manual and the peer-reviewed literature",
    learn: [
      ["Comparative anatomy", "The dog, cat, horse, ruminants, pig and bird: skeleton, limbs, viscera and the differences that matter clinically."],
      ["Physiology", "Nerve, muscle, heart, lungs, the rumen, kidney, hormones and reproductive cycles, species by species."],
      ["Welfare and husbandry", "The Five Freedoms and Five Domains, the Animal Welfare Act 2006, pain, nutrition and biosecurity."],
      ["Disease", "Pathology, microbiology, parasitology and immunology, from cell injury to vaccination and antimicrobial resistance."],
      ["Clinical practice", "Examination, diagnostics, pharmacology and the cascade, anaesthesia, and small-animal, equine and farm practice."],
      ["Public health and the profession", "One Health, zoonoses, food safety, notifiable disease, the RCVS Code and the Day One Competences."],
    ],
    featured: ["heart", "action-potential", "synapse", "gas", "kidney"],
    tools: [["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["The dog in 3D", "VetGradify's 3D model of the dog.", "../3d.html"],
    ["Learning map", "VetGradify's subjects on one map.", "../map.html"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
