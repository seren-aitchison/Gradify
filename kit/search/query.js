// The search query language (pure; tests/search.test.mjs). Learners type plain words; everything else is optional and
// is also what the filter chips in the Search screen write, so a typed query and a chip click are the same thing.
//
//   equilibrium                       every word must match (AND)
//   "le chatelier"                    an exact phrase
//   equilibrium -industrial           leave out anything with that word
//   type:flashcards  in:course:chemistry  board:aqa  qual:a-level  status:saved  done:no  difficulty:hard
//   after:7d  before:2026-11-01  since:month
//
// parseQuery(raw, chips?) → { raw, text, terms, phrases, not, filters, from, to, empty }
//   filters   { type: [], scope: { course, folder, lesson }, board: [], qual: [], status: [], done, difficulty: [] }
//   chips     the same filters from the UI, merged under what was typed
//
// A value may be quoted (folder:"Mock week"). Unknown keys stay in the text, so "note:" or a time like "10:30" is
// still searchable.

/** every resource type a learner can filter by, with the words they might type for it: id → [label, ...words] */
export const TYPES = {
  lesson: ["Lessons", "lesson", "lessons", "learn", "notes-lesson"],
  pack: ["Flashcards", "flashcards", "flashcard", "cards", "card", "deck", "decks", "set", "sets", "pack"],
  question: ["Questions", "question", "questions", "quiz", "quizzes", "problem", "problems", "mcq"],
  note: ["Notes", "note", "notes", "jot", "jots", "page", "pages"],
  map: ["Mind maps", "map", "maps", "mindmap", "mindmaps", "mind-map", "mind-maps"],
  collection: ["Collections", "collection", "collections", "folder", "folders"],
  task: ["Tasks", "task", "tasks", "todo", "todos", "plan", "block", "blocks"],
  curriculum: ["Curriculum", "curriculum", "spec", "specs", "specification", "specifications", "syllabus", "qualification", "qualifications"],
  course: ["Courses", "course", "courses", "subject", "subjects"],
  topic: ["Topics", "topic", "topics", "unit", "units", "module", "modules", "chapter", "chapters"],
  action: ["Actions", "action", "actions", "command", "commands", "do"],
  screen: ["Screens", "screen", "screens", "page-of-app", "go"],
};
const TYPE_BY_WORD = new Map(Object.entries(TYPES).flatMap(([id, [, ...ws]]) => [[id, id], ...ws.map((w) => [w, id])]));
/** a typed type word ("cards", "maps") → its type id, or null */
export const typeOf = (w) => TYPE_BY_WORD.get(String(w || "").toLowerCase()) || null;

export const STATUSES = [["saved", "Saved"], ["pinned", "Pinned"], ["scheduled", "Scheduled"], ["completed", "Completed"], ["in-progress", "In progress"], ["draft", "Draft"]];
const STATUS_ALIAS = { done: "completed", complete: "completed", finished: "completed", started: "in-progress", progress: "in-progress", "in progress": "in-progress", wip: "in-progress", drafts: "draft", bookmarked: "saved", booked: "scheduled", planned: "scheduled" };
export const DIFFICULTIES = [["1", "Foundation"], ["2", "Core"], ["3", "Stretch"]];
const DIFF_ALIAS = { easy: "1", foundation: "1", low: "1", medium: "2", core: "2", application: "2", hard: "3", stretch: "3", high: "3", challenging: "3" };
export const BOARDS = [["aqa", "AQA"], ["edexcel", "Pearson Edexcel"], ["ocr", "OCR"], ["wjec", "WJEC"], ["eduqas", "WJEC Eduqas"], ["sqa", "SQA"], ["ccea", "CCEA"]];
const BOARD_ALIAS = { pearson: "edexcel", "pearson edexcel": "edexcel" };
export const QUALS = [["gcse", "GCSE"], ["as", "AS level"], ["a-level", "A level"], ["nat5", "National 5"], ["higher", "Higher"], ["adv-higher", "Advanced Higher"], ["ib", "IB"], ["university", "University"]];
const QUAL_ALIAS = { "a level": "a-level", alevel: "a-level", "a-levels": "a-level", "a levels": "a-level", "as level": "as", "national 5": "nat5", n5: "nat5", "advanced higher": "adv-higher", degree: "university", uni: "university", undergraduate: "university" };

const KEYS = new Set(["type", "in", "course", "board", "qual", "level", "status", "done", "difficulty", "folder", "lesson", "before", "after", "since", "created", "modified"]);

/** split a query into tokens, keeping "quoted phrases" and key:"quoted values" whole */
export function tokens(raw) {
  // in:folder:"Mock week" has a key, a sub-key and a quoted value: the sub-key is kept with the value
  const out = [], re = /(-?)(?:([a-z]+):)?((?:[a-z]+:)?)(?:"([^"]*)"|(\S+))/gi;
  let m;
  while ((m = re.exec(String(raw || "")))) out.push({ neg: m[1] === "-", key: m[2] ? m[2].toLowerCase() : null, quoted: m[4] != null, value: `${m[3] || ""}${(m[4] ?? m[5] ?? "").trim()}` });
  return out;
}

const fold = (s) => String(s ?? "").normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase();
/** words of a string: letters and digits, accents folded (so "Le Châtelier's" → le chatelier s) */
const ASCII = /^[\x00-\x7f]*$/, WORD_A = /[a-z0-9]+(?:[.'][a-z0-9]+)*/g, WORD_U = /[\p{L}\p{N}]+(?:[.'’][\p{L}\p{N}]+)*/gu;
export function words(s) {
  const t = String(s ?? ""); if (!t) return [];
  const ascii = ASCII.test(t), m = (ascii ? t.toLowerCase() : fold(t)).match(ascii ? WORD_A : WORD_U);
  if (!m) return [];
  for (let i = 0; i < m.length; i++) if (m[i].includes("'") || m[i].includes("’")) m[i] = m[i].replace(/[’']s$/, "").replace(/[’']/g, "");
  return m;
}

/** "7d", "2w", "3m", "week", "month", "today", "2026-11-01" → a time in ms (the start of that moment), or null */
export function parseWhen(v, now = Date.now()) {
  const s = fold(v).trim(); if (!s) return null;
  const DAY = 864e5, d0 = new Date(now); d0.setHours(0, 0, 0, 0);
  if (s === "today") return d0.getTime();
  if (s === "yesterday") return d0.getTime() - DAY;
  if (s === "week") return d0.getTime() - 7 * DAY;
  if (s === "month") return d0.getTime() - 30 * DAY;
  if (s === "year") return d0.getTime() - 365 * DAY;
  const rel = /^(\d{1,3})\s*(d|w|m|y)$/.exec(s);
  if (rel) return d0.getTime() - Number(rel[1]) * { d: 1, w: 7, m: 30, y: 365 }[rel[2]] * DAY;
  const iso = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(s);
  if (iso) { const t = new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3] || 1)).getTime(); return Number.isNaN(t) ? null : t; }
  return null;
}

const add = (list, v) => { if (v && !list.includes(v)) list.push(v); };
const norm = (map, v) => { const s = fold(v).trim(); return map[s] || s; };

/** parse a typed query (and any chip filters from the UI) */
export function parseQuery(raw = "", chips = {}, { now = Date.now() } = {}) {
  const q = { raw: String(raw || ""), text: "", terms: [], phrases: [], not: [], filters: { type: [], scope: {}, board: [], qual: [], status: [], done: null, difficulty: [] }, from: null, to: null, empty: true };
  const f = q.filters, rest = [];
  const setScope = (k, v) => { if (v) f.scope[k] = v; };
  for (const t of tokens(raw)) {
    const v = t.value;
    if (t.key && KEYS.has(t.key) && !t.neg && v) {
      if (t.key === "type") { const id = typeOf(v); if (id) add(f.type, id); else rest.push(t); }
      else if (t.key === "in") {
        const [k, ...r] = v.split(":"), val = r.join(":");
        if (["course", "folder", "lesson"].includes(k) && val) setScope(k, val);
        else if (typeOf(v)) add(f.type, typeOf(v)); else setScope("course", v);
      }
      else if (["course", "folder", "lesson"].includes(t.key)) setScope(t.key, v);
      else if (t.key === "board") add(f.board, norm(BOARD_ALIAS, v));
      else if (t.key === "qual" || t.key === "level") add(f.qual, norm(QUAL_ALIAS, v));
      else if (t.key === "status") add(f.status, norm(STATUS_ALIAS, v));
      else if (t.key === "done") f.done = /^(y|yes|true|1|done|complete|completed)$/.test(fold(v)) ? true : /^(n|no|false|0|todo|unfinished|incomplete|open)$/.test(fold(v)) ? false : f.done;
      else if (t.key === "difficulty") add(f.difficulty, DIFF_ALIAS[fold(v)] || (["1", "2", "3"].includes(v) ? v : null));
      else if (t.key === "before") { const w = parseWhen(v, now); if (w != null) q.to = w; }
      else { const w = parseWhen(v, now); if (w != null) q.from = w; }   // after, since, created, modified
    } else if (t.quoted && v) {
      const ph = words(v); if (ph.length > 1) q.phrases.push(ph.join(" ")); else if (ph.length) { if (t.neg) add(q.not, ph[0]); else add(q.terms, ph[0]); }
      rest.push(t);
    } else if (t.neg && v) { for (const w of words(v)) add(q.not, w); rest.push(t); }
    else { for (const w of words(t.key ? `${t.key}:${v}` : v)) add(q.terms, w); rest.push(t); }
  }
  q.text = rest.map((t) => (t.neg ? "-" : "") + (t.quoted ? `"${t.value}"` : t.key ? `${t.key}:${t.value}` : t.value)).join(" ");
  // the UI's filters sit under what was typed
  for (const k of ["type", "board", "qual", "status", "difficulty"]) for (const v of chips[k] || []) add(f[k], v);
  if (chips.done != null && f.done == null) f.done = chips.done;
  for (const k of ["course", "folder", "lesson"]) if (chips.scope?.[k] && !f.scope[k]) f.scope[k] = chips.scope[k];
  if (chips.from != null && q.from == null) q.from = chips.from;
  if (chips.to != null && q.to == null) q.to = chips.to;
  q.empty = !q.terms.length && !q.phrases.length;
  return q;
}

/** the filters a query has, as pills to show and remove: [{ key, value, label }] */
export function activeFilters(q) {
  const f = q.filters, out = [];
  const label = (list, v) => (list.find(([k]) => k === v) || [v, v])[1];
  for (const v of f.type) out.push({ key: "type", value: v, label: TYPES[v]?.[0] || v });
  for (const [k, v] of Object.entries(f.scope)) out.push({ key: `scope.${k}`, value: v, label: `${k === "folder" ? "In folder" : k === "lesson" ? "In lesson" : "In course"}: ${v}` });
  for (const v of f.board) out.push({ key: "board", value: v, label: label(BOARDS, v) });
  for (const v of f.qual) out.push({ key: "qual", value: v, label: label(QUALS, v) });
  for (const v of f.status) out.push({ key: "status", value: v, label: label(STATUSES, v) });
  if (f.done != null) out.push({ key: "done", value: f.done, label: f.done ? "Completed" : "Not finished" });
  for (const v of f.difficulty) out.push({ key: "difficulty", value: v, label: label(DIFFICULTIES, v) });
  if (q.from != null) out.push({ key: "from", value: q.from, label: `Since ${new Date(q.from).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}` });
  if (q.to != null) out.push({ key: "to", value: q.to, label: `Before ${new Date(q.to).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}` });
  return out;
}

/** the query written out again: the words plus its filters as typed keys (for saving, sharing and the URL) */
export function queryString(q) {
  const f = q.filters, bits = [q.text];
  const quote = (v) => (/\s/.test(v) ? `"${v}"` : v);
  for (const v of f.type) bits.push(`type:${v}`);
  for (const [k, v] of Object.entries(f.scope)) bits.push(`in:${k}:${quote(v)}`);
  for (const k of ["board", "qual", "status", "difficulty"]) for (const v of f[k]) bits.push(`${k}:${v}`);
  if (f.done != null) bits.push(`done:${f.done ? "yes" : "no"}`);
  const d = (t) => new Date(t).toISOString().slice(0, 10);
  if (q.from != null) bits.push(`after:${d(q.from)}`);
  if (q.to != null) bits.push(`before:${d(q.to)}`);
  return bits.filter(Boolean).join(" ").trim();
}

/** a copy of the query without one filter (a pill's ×) */
export function without(q, { key, value }) {
  const c = structuredClone({ ...q, filters: q.filters });
  const f = c.filters;
  if (key.startsWith("scope.")) delete f.scope[key.slice(6)];
  else if (key === "done") f.done = null;
  else if (key === "from") c.from = null;
  else if (key === "to") c.to = null;
  else f[key] = f[key].filter((x) => x !== value);
  return c;
}
/** the query's filters alone, in the shape parseQuery takes as chips */
export const chipsOf = (q) => ({ type: [...q.filters.type], board: [...q.filters.board], qual: [...q.filters.qual], status: [...q.filters.status], difficulty: [...q.filters.difficulty], done: q.filters.done, scope: { ...q.filters.scope }, from: q.from, to: q.to });
