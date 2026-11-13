// LanguageGradify Dutch: the full curriculum. Each topic is taught as one lesson, grouped into modules ("> " lines) and
// stages (TRACKS). Lesson ids are permanent (ids.js, written by node scripts/new-course.mjs lock dutch): never
// renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. First school
> First module
* First lesson
`;

export const TRACKS = [
  { name: "Stage 1 · Foundations", units: [1], from: "#f08a3c", to: "#22d3ee" },
];

export const PATHS = [
  { id: "core", name: "The core", sub: "The essential schools, in order.", units: [1] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
