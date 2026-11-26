// The production standard, measured across the whole library (owner, 25 Nov 2026; config.standards): per course,
// lessons, flashcards, topics with 20+ distinct flashcards, and lessons with 3+ diagrams, both drawn by an author (D:,
// DIA:, or an IX: interactive) and with the substantive diagrams the lesson page draws from the notes themselves
// (kit/core/glass-diagrams.js: flow, formula, cycle, timeline, compare, hub, case; the section map, prerequisite
// path, mistake and summary cards aren't counted). A topic is a syllabus module (a unit when the course has none).
// Read-only: it changes no lesson.
//   gradify standards [--lessons <file.tsv>]
import { readdirSync, existsSync, writeFileSync } from "node:fs";
import { at } from "./lib.mjs";
import { CONFIG } from "./lib.mjs";

export const SUBSTANTIVE = new Set(["flow", "formula", "cycle", "timeline", "compare", "hub", "case"]);
export async function measure({ courses = null } = {}) {
  const { parseNotes } = await import(at("kit/course/notes.js").href), { diagramsFor } = await import(at("kit/core/glass-diagrams.js").href);
  const std = { flashcardsPerTopic: 20, diagramsPerLesson: 3, ...(CONFIG.standards || {}) }, rows = [], lessons = [];
  for (const c of courses || readdirSync(at("kit/courses/")).sort()) {
    const d = at(`kit/courses/${c}/`); if (!existsSync(new URL("notes/", d)) || !existsSync(new URL("syllabus.js", d))) continue;
    const { UNITS } = await import(new URL("syllabus.js", d).href);
    const topicOf = new Map(); for (const u of UNITS) for (const l of u.lessons) topicOf.set(`${u.id}|${l.title.toLowerCase()}`, `${u.id}:${l.module || u.id}`);
    const r = { course: c, lessons: 0, flashcards: 0, topics: 0, topicsMet: 0, authored: 0, lessonsMetAuthored: 0, substantiveAuto: 0, lessonsMet: 0 }, topics = new Map();
    for (const f of readdirSync(new URL("notes/", d)).filter((x) => /^u\d+\.js$/.test(x)).sort()) {
      const u = f.slice(0, 3), text = (await import(new URL(`notes/${f}`, d).href)).default, src = new Map(String(text).split(/^## /m).slice(1).map((x) => [x.slice(0, x.indexOf("\n")).trim(), x]));
      for (const L of parseNotes(text)) {
        const cards = (L.cards || []).length, authored = ((src.get(L.title) || "").match(/^(D|DIA|IX):/gm) || []).length;
        let auto = []; try { auto = diagramsFor(L) || []; } catch { auto = []; }
        const sub = auto.filter((x) => SUBSTANTIVE.has(x.kind)).length, t = topicOf.get(`${u}|${L.title.toLowerCase()}`) || `${u}:?`;
        r.lessons++; r.flashcards += cards; r.authored += authored; r.substantiveAuto += sub;
        if (authored >= std.diagramsPerLesson) r.lessonsMetAuthored++; if (authored + sub >= std.diagramsPerLesson) r.lessonsMet++;
        topics.set(t, (topics.get(t) || 0) + cards);
        lessons.push({ course: c, unit: u, topic: t, lesson: L.title, flashcards: cards, authored, substantiveAuto: sub, meets: authored + sub >= std.diagramsPerLesson });
      }
    }
    r.topics = topics.size; r.topicsMet = [...topics.values()].filter((n) => n >= std.flashcardsPerTopic).length;
    rows.push(r);
  }
  const total = rows.reduce((a, r) => { for (const [k, v] of Object.entries(r)) if (typeof v === "number") a[k] = (a[k] || 0) + v; return a; }, { course: "TOTAL" });
  return { std, rows, total, lessons };
}
export function table({ rows, total }) {
  const cols = [["course", "Course"], ["lessons", "Lessons"], ["flashcards", "Flashcards"], ["topics", "Topics"], ["topicsMet", "Topics with 20+ cards"], ["authored", "Authored diagrams"], ["lessonsMetAuthored", "Lessons with 3+ authored"], ["lessonsMet", "Lessons with 3+ incl. page diagrams"]];
  return [`| ${cols.map((c) => c[1]).join(" | ")} |`, `|${cols.map(() => "---").join("|")}|`, ...[...rows, total].map((r) => `| ${cols.map(([k]) => r[k]).join(" | ")} |`)].join("\n");
}
export function lessonsTsv(lessons) {
  return ["course\tunit\ttopic\tlesson\tflashcards\tauthored_diagrams\tsubstantive_page_diagrams\tmeets_diagram_minimum", ...lessons.map((l) => [l.course, l.unit, l.topic, l.lesson, l.flashcards, l.authored, l.substantiveAuto, l.meets ? "yes" : "no"].join("\t"))].join("\n");
}
export async function report({ lessonsFile = null } = {}) {
  const m = await measure();
  if (lessonsFile) writeFileSync(lessonsFile, lessonsTsv(m.lessons));
  return table(m);
}
