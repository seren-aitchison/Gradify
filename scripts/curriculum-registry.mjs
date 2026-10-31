// The curriculum registry: permanent question ids written into the notes source, and content versions
// for every lesson and question. Used by `npm run qa` (to update) and the tests (to check).
//
//   kit/courses/<slug>/registry.js (generated; don't edit by hand)
//     LESSONS            { lessonId: { v, hash, updated } }
//     QUESTIONS          { questionId: { lesson, type, v, hash, updated } }
//     RETIRED_QUESTIONS  { questionId: { lesson, retired } }   reserved forever, never reused
//
// A version increases whenever the content's fingerprint changes, so stored attempts (which record the
// question id and version) can always be matched to the exact question the learner answered.
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { norm } from "../kit/core/text.js";

export const hash = (s) => createHash("sha256").update(s).digest("hex").slice(0, 12);
const Q_LINE = /^(\s*)((?:M|TF|MS|SEQ|MATCH|SA|NUM)[123]?)(#[a-z0-9-]+)?(@[\d,]+)?:(.*)$/;

// question lines in a notes source, with the lesson title each belongs to
export function scanQuestions(src) {
  const out = []; let lesson = null;
  src.split("\n").forEach((line, i) => {
    const t = line.trim();
    if (t.startsWith("## ")) { lesson = t.slice(3).trim(); return; }
    const m = line.match(Q_LINE); if (!m || !lesson) return;
    out.push({ i, lesson, tag: m[2], id: m[3]?.slice(1) || null, obj: m[4] || "", body: m[5].trim(), fingerprint: hash(`${m[2]}${m[4] || ""}:${m[5].trim()}`) });
  });
  return out;
}

// lesson blocks keyed by normalised title, with question ids removed so assigning an id isn't an edit
export function lessonBlocks(src) {
  const map = new Map(); let title = null, buf = [];
  const flush = () => { if (title) map.set(norm(title), buf.join("\n").replace(/^(\s*(?:M|TF|MS|SEQ|MATCH|SA|NUM)[123]?)#[a-z0-9-]+/gm, "$1").trim()); };
  for (const line of src.split("\n")) { if (line.trim().startsWith("## ")) { flush(); title = line.trim().slice(3).trim(); buf = [line.trim()]; } else if (title) buf.push(line.trimEnd()); }
  flush(); return map;
}

// load, update and save one course's registry. Returns a log of changes.
export async function updateRegistry(slug, course, { today = new Date().toISOString().slice(0, 10), write = true } = {}) {
  const regUrl = new URL(`../kit/courses/${slug}/registry.js`, import.meta.url);
  let reg = { LESSONS: {}, QUESTIONS: {}, RETIRED_QUESTIONS: {} };
  try { reg = { ...reg, ...(await import(`${regUrl.href}?t=${Date.now()}`)) }; reg = { LESSONS: { ...reg.LESSONS }, QUESTIONS: { ...reg.QUESTIONS }, RETIRED_QUESTIONS: { ...reg.RETIRED_QUESTIONS } }; } catch { /* first run */ }
  const log = [], seen = new Set();
  for (const unit of course.units.filter((u) => course.written.includes(u.id))) {
    const file = new URL(`../kit/courses/${slug}/notes/${unit.id}.js`, import.meta.url);
    let src = await readFile(file, "utf8");
    const idFor = new Map(unit.lessons.map((l) => [norm(l.title), l.id]));
    // 1. give every question a permanent id
    const lines = src.split("\n"); let changed = false;
    for (const q of scanQuestions(src)) {
      const lessonId = idFor.get(norm(q.lesson)); if (!lessonId) continue;
      if (q.id) continue;
      const prefix = `${slug}-${lessonId}-q`;
      const used = [...Object.keys(reg.QUESTIONS), ...Object.keys(reg.RETIRED_QUESTIONS), ...scanQuestions(lines.join("\n")).map((x) => x.id).filter(Boolean)].filter((x) => x.startsWith(prefix)).map((x) => Number(x.slice(prefix.length)));
      const id = `${prefix}${Math.max(0, ...used) + 1}`;
      lines[q.i] = lines[q.i].replace(Q_LINE, (_, sp, tag, _id, obj, rest) => `${sp}${tag}#${id}${obj || ""}:${rest}`);
      changed = true; log.push(`${id}: new question in ${lessonId}`);
    }
    if (changed) { src = lines.join("\n"); if (write) await writeFile(file, src); }
    // 2. versions for questions
    for (const q of scanQuestions(src)) {
      const lessonId = idFor.get(norm(q.lesson)); if (!lessonId || !q.id) continue;
      if (seen.has(q.id)) throw new Error(`${q.id} is used twice`);
      seen.add(q.id);
      if (reg.RETIRED_QUESTIONS[q.id]) throw new Error(`${q.id} is retired and must not be reused: give the question a new id`);
      const cur = reg.QUESTIONS[q.id], type = q.tag.replace(/\d$/, "");
      if (!cur) reg.QUESTIONS[q.id] = { lesson: lessonId, type, v: 1, hash: q.fingerprint, updated: today };
      else if (cur.hash !== q.fingerprint || cur.lesson !== lessonId) {
        reg.QUESTIONS[q.id] = { ...cur, lesson: lessonId, type, v: cur.hash !== q.fingerprint ? cur.v + 1 : cur.v, hash: q.fingerprint, updated: today };
        log.push(`${q.id}: ${cur.hash !== q.fingerprint ? `edited, now version ${cur.v + 1}` : `moved to ${lessonId}`}`);
      }
    }
    // 3. versions for lessons
    const blocks = lessonBlocks(src);
    for (const l of unit.lessons) {
      const b = blocks.get(norm(l.title)); if (!b) continue;
      const h = hash(b), cur = reg.LESSONS[l.id];
      if (!cur) reg.LESSONS[l.id] = { v: 1, hash: h, updated: today };
      else if (cur.hash !== h) { reg.LESSONS[l.id] = { v: cur.v + 1, hash: h, updated: today }; log.push(`${l.id}: lesson edited, now version ${cur.v + 1}`); }
    }
  }
  // 4. questions no longer in any written notes are retired (reported, never reused)
  for (const [id, q] of Object.entries(reg.QUESTIONS)) if (!seen.has(id) && course.written.includes(q.lesson.slice(0, 3))) {
    reg.RETIRED_QUESTIONS[id] = { lesson: q.lesson, retired: today }; delete reg.QUESTIONS[id]; log.push(`${id}: removed from the notes, so retired (its id won't be reused)`);
  }
  if (write) {
    const ser = (o) => JSON.stringify(Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b, "en", { numeric: true }))), null, 0).replace(/^\{/, "{\n  ").replace(/\}$/, "\n}").replace(/\},"/g, "},\n  \"");
    await writeFile(regUrl, `// Generated by npm run qa (scripts/curriculum-registry.mjs). Don't edit by hand.\n// Lesson and question versions, and retired question ids (reserved forever).\nexport const LESSONS = ${ser(reg.LESSONS)};\nexport const QUESTIONS = ${ser(reg.QUESTIONS)};\nexport const RETIRED_QUESTIONS = ${ser(reg.RETIRED_QUESTIONS)};\n`);
  }
  return { reg, log };
}
