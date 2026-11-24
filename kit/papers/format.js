// Past Papers: the question bank format, its checks and its marking (docs/LEARNING-ENVIRONMENT-ROADMAP.md §4).
// Pure functions, so Node can test them (tests/papers.test.mjs).
//
// Every question is Gradify's own, written in the style of the exam board's papers and mapped to specification points.
// Official papers, mark schemes and examiner reports are never copied here: the bank links to the board's own page.
//
// bank = {
//   id, course, spec: { id, board, qualification, subject, code, title, url, papersUrl },
//   points: { "4.1.3.1": { title, lessons: ["u02-20"] } },     specification points this bank uses, with their lessons
//   topics: [{ id: "4.1", title, groups: [{ id: "4.1.3", title }] }],
//   questions: [question],
// }
// question = { id, topic, group, points: ["4.1.3.1"], marks, source: "gradify", context?, parts: [part] }
// part = { id, marks, input, prompt, model, why, mistakes: [text], lessons?, …the input's own fields }
//   input "choice"    options: [{ text, correct, why? }]                         one mark, marked automatically
//   input "short"     answer, accept: [phrase], reject: [phrase]                 a word or phrase, marked automatically
//   input "number"    answer, tolerance, unit, method: [{ id, text }]            the answer earns every mark; a wrong
//                                                                                answer can earn method marks the
//                                                                                learner ticks (self-assessed)
//   input "extended"  points: [{ id, text }]                                     any `marks` of the points, ticked by
//                                                                                the learner against the mark scheme
// Automatic marks are final; ticked marks are self-assessed and provisional, and the page says so.

export const INPUTS = ["choice", "short", "number", "extended"];

// lower case, accents and punctuation gone; a decimal point inside a number is kept ("2.5"), a full stop isn't
const norm = (s) => String(s ?? "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/−/g, "-").replace(/(?<!\d)\.|\.(?!\d)/g, " ").replace(/[^a-z0-9.\-]+/g, " ").trim();
const has = (text, phrase) => ` ${norm(text)} `.includes(` ${norm(phrase)} `);

/** A typed number: spaces and commas ignored, a unicode minus and "×10^" accepted. null if it isn't a number. */
export function numberOf(v) {
  if (v == null) return null;
  const s = String(v).trim().replace(/[\s,]/g, "").replace(/−/g, "-").replace(/(?:×|x|\*)10\^?\(?(-?\d+)\)?/i, "e$1");
  return /^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(s) ? Number(s) : null;
}

/**
 * Mark one part. response: the option text (choice), the typed text (short, number) and, for self-assessment, the
 * ids of the mark points or method marks the learner ticked ({ text, ticked: [id] }).
 * → { marks, of, auto: bool, final: bool, got: [markPoint id], detail }
 */
export function markPart(part, response) {
  const of = part.marks, text = typeof response === "object" && response ? response.text : response;
  const ticked = new Set((typeof response === "object" && response?.ticked) || []);
  if (part.input === "choice") {
    const ok = part.options.some((o) => o.correct && o.text === text);
    return { marks: ok ? of : 0, of, auto: true, final: true, got: [], detail: ok ? "Correct." : "Not the right option." };
  }
  if (part.input === "short") {
    if (!norm(text)) return { marks: 0, of, auto: true, final: true, got: [], detail: "No answer." };
    const bad = (part.reject || []).find((r) => has(text, r));
    const ok = !bad && [part.answer, ...(part.accept || [])].some((a) => has(text, a));
    return { marks: ok ? of : 0, of, auto: true, final: true, got: [], detail: ok ? "Correct." : bad ? `“${bad}” isn't right here.` : "Not the expected answer." };
  }
  if (part.input === "number") {
    const n = numberOf(text);
    if (n != null && Math.abs(n - part.answer) <= (part.tolerance ?? 0) + 1e-9) return { marks: of, of, auto: true, final: true, got: (part.method || []).map((m) => m.id), detail: "Correct answer: full marks." };
    // a wrong or missing answer can still earn the method marks shown in the working, up to one less than full marks
    const got = (part.method || []).filter((m) => ticked.has(m.id)).map((m) => m.id);
    const marks = Math.min(got.length, Math.max(0, of - 1));
    return { marks, of, auto: !got.length, final: !got.length, got, detail: n == null ? "Not a number." : "Not the right answer." };
  }
  if (part.input === "extended") {
    const got = part.points.filter((p) => ticked.has(p.id)).map((p) => p.id);
    return { marks: Math.min(got.length, of), of, auto: false, final: false, got, detail: "Self-assessed against the mark scheme." };
  }
  return { marks: 0, of, auto: true, final: true, got: [], detail: "Unknown answer type." };
}

/** Mark a whole question: the parts' marks, the total, and whether any of it is self-assessed. */
export function markQuestion(q, responses = {}) {
  const parts = q.parts.map((p) => ({ id: p.id, ...markPart(p, responses[p.id]) }));
  const marks = parts.reduce((s, p) => s + p.marks, 0);
  return { parts, marks, of: q.marks, provisional: parts.some((p) => !p.final) };
}

/** The lessons that teach a part: its own list, or every lesson mapped to its question's specification points. */
export function lessonsFor(bank, q, part) {
  if (part?.lessons?.length) return part.lessons;
  return [...new Set(q.points.flatMap((id) => bank.points[id]?.lessons || []))];
}

/**
 * Everything wrong with a bank, as readable problems (none means it's sound). lessonExists(id) says whether a lesson id
 * is real; without it, lesson ids aren't checked.
 */
export function checkBank(bank, { lessonExists = null } = {}) {
  const out = [], seen = new Set();
  const say = (where, msg) => out.push(`${where}: ${msg}`);
  if (!bank?.spec?.id || !bank.spec.papersUrl) say(bank?.id || "bank", "needs a specification with a link to the board's own past papers");
  for (const [id, p] of Object.entries(bank.points || {})) {
    if (!p.title) say(id, "point needs a title");
    for (const l of p.lessons || []) if (lessonExists && !lessonExists(l)) say(id, `lesson ${l} doesn't exist`);
  }
  const groups = new Set((bank.topics || []).flatMap((t) => t.groups.map((g) => `${t.id}|${g.id}`)));
  for (const q of bank.questions || []) {
    const w = q.id || "(question without an id)";
    if (!q.id || seen.has(q.id)) say(w, "needs a unique id"); seen.add(q.id);
    if (q.source !== "gradify") say(w, "only Gradify's own questions can be in the bank (source: \"gradify\")");
    if (!groups.has(`${q.topic}|${q.group}`)) say(w, `topic ${q.topic} / group ${q.group} isn't in the bank's topics`);
    if (!q.points?.length) say(w, "needs at least one specification point");
    for (const id of q.points || []) {
      if (!bank.points?.[id]) say(w, `specification point ${id} isn't in the bank's points`);
      else if (!id.startsWith(`${q.group}.`)) say(w, `point ${id} isn't in group ${q.group}`);
    }
    if (!q.parts?.length) { say(w, "needs at least one part"); continue; }
    const sum = q.parts.reduce((s, p) => s + (p.marks || 0), 0);
    if (sum !== q.marks) say(w, `parts add up to ${sum} marks, not ${q.marks}`);
    const pids = new Set();
    for (const p of q.parts) {
      const pw = `${w} (${p.id})`;
      if (!p.id || pids.has(p.id)) say(pw, "needs a unique part id"); pids.add(p.id);
      if (!INPUTS.includes(p.input)) { say(pw, `unknown input "${p.input}"`); continue; }
      if (!(p.marks >= 1) || !Number.isInteger(p.marks)) say(pw, "needs a whole number of marks");
      if (!p.prompt || !p.model || !p.why) say(pw, "needs a prompt, a model answer and why it earns its marks");
      if (!p.mistakes?.length) say(pw, "needs at least one common mistake");
      if (p.lessons) for (const l of p.lessons) if (lessonExists && !lessonExists(l)) say(pw, `lesson ${l} doesn't exist`);
      if (!lessonsFor(bank, q, p).length) say(pw, "isn't linked to any lesson");
      if (p.input === "choice") {
        if (p.marks !== 1) say(pw, "a choice is worth one mark");
        if ((p.options || []).filter((o) => o.correct).length !== 1 || p.options.length < 3) say(pw, "needs one correct option among at least three");
        if (new Set(p.options.map((o) => o.text)).size !== p.options.length) say(pw, "options must differ");
      }
      if (p.input === "short") {
        if (!p.answer) say(pw, "needs an answer");
        // a rejected phrase must never be part of an accepted one, or the right answer would be marked wrong
        for (const r of p.reject || []) for (const a of [p.answer, ...(p.accept || [])]) if (has(a, r)) say(pw, `rejects “${r}”, which is part of the accepted “${a}”`);
      }
      if (p.input === "number") {
        if (!Number.isFinite(p.answer)) say(pw, "needs a numeric answer");
        if (!(p.tolerance >= 0)) say(pw, "needs a tolerance (0 for exact)");
        if (p.marks > 1 && (p.method || []).length < p.marks - 1) say(pw, `needs at least ${p.marks - 1} method marks for a ${p.marks}-mark calculation`);
      }
      if (p.input === "extended" && (p.points || []).length < p.marks) say(pw, `needs at least ${p.marks} mark points for ${p.marks} marks`);
      const ids = [...(p.points || []), ...(p.method || [])].map((m) => m.id);
      if (new Set(ids).size !== ids.length) say(pw, "mark point ids must differ");
    }
  }
  return out;
}

/** Questions for mini practice: up to n from a topic (or the given questions), in a stable order for a seed. */
export function practiceSet(bank, { topic = null, n = 5, seed = 1, prefer = [] } = {}) {
  let s = seed >>> 0 || 1; const r = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const pool = bank.questions.filter((q) => !topic || q.topic === topic || q.group === topic);
  // questions on the learner's weakest points first, then the rest shuffled
  const first = pool.filter((q) => q.points.some((p) => prefer.includes(p)));
  const rest = pool.filter((q) => !first.includes(q));
  for (const a of [first, rest]) for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return [...first, ...rest].slice(0, Math.min(Math.max(n, 3), 6));
}
