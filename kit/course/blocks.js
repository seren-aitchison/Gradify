// The lesson flow (Lesson System Brief v2, docs/LESSON-SCHEMA.md): any parsed lesson (kit/course/notes.js), written in
// schema v1 or v2, as the eight teaching functions the Learn mode steps through. Pure, so it's tested over every
// lesson in the library: no lesson is rewritten to get the new experience.
//
//   orient       title, lead, objectives, prerequisites, time
//   diagnose     up to two easy questions on prior knowledge, asked before teaching (skipped when there are none spare)
//   blocks       concept blocks: one per headed section, each with its parts (explanation, examples, key ideas,
//                misconceptions, diagrams, interactives), its hook, its deeper detail, its written alternative
//                explanations, the objectives it teaches and its check (the question that tests those objectives)
//   practise     the questions not used elsewhere, easiest first
//   consolidate  summary, key terms, the lesson's misconceptions
//   prove        the hardest questions, as the final check
//
// Which block a question checks: a v2 lesson places it inside its block, or tags the block "H: Title @2". A v1
// lesson keeps its questions at the end, tagged with objectives (M2@1:), so each objective goes to the block whose
// words it shares most, and its questions follow it.
const STOP = new Set("the and for with that this from into what which when where how why are was were their there these those your you can its it's than then them they have has had not but use used using also more most each other about between explain describe identify compare give state show".split(" "));
const words = (s) => String(s || "").toLowerCase().replace(/\*\*|`|\^{|\}|_{/g, " ").match(/[a-z][a-z-]{2,}/g)?.filter((w) => !STOP.has(w)).map((w) => w.replace(/(ies|es|s|ing|ed|ly)$/, "")) || [];

/** every question in the lesson as { key: index into items, Q, d, objectives, sec } in lesson order */
export function questionsOf(L) {
  const qs = [...L.mcq.map((m, i) => ({ kind: "mcq", i, Q: m.Q || m, d: m.d ?? m.Q?.d ?? 2 })), ...L.tasks.map((Q, i) => ({ kind: "task", i, Q, d: Q.d ?? 2 }))];
  const at = new Map((L.placed || []).map((p) => [`${p.kind}:${p.i}`, p.sec]));
  return qs.map((q, n) => ({ ...q, n, objectives: q.Q.objectives || [], sec: at.get(`${q.kind}:${q.i}`) ?? null }));
}

/** the lesson's concept blocks: one per headed section (text before the first heading opens the first block) */
export function conceptBlocks(L) {
  const out = []; let cur = null;
  for (const b of L.blocks) {
    if (b.t === "h") { cur = { title: b.x, obj: b.obj || null, parts: [], hook: null, more: [], alts: [] }; out.push(cur); continue; }
    if (!cur) { cur = { title: null, obj: null, parts: [], hook: null, more: [], alts: [] }; out.push(cur); }
    if (b.t === "hook") cur.hook = b.x; else if (b.t === "more") cur.more.push(b.x); else if (b.t === "alt") cur.alts.push({ style: b.style, x: b.x }); else cur.parts.push(b);
  }
  // an untitled opening with nothing but a lead-in joins the first titled block
  if (out.length > 1 && !out[0].title) { out[1].parts.unshift(...out[0].parts); out[1].hook ||= out[0].hook; out.shift(); }
  return out;
}
const blockText = (B) => [B.title, B.hook, ...B.parts.map((p) => p.x || (p.items || []).join(" ") || (p.steps || []).join(" ") || (p.rows || []).map((r) => r.join(" ")).join(" ")), ...B.more].join(" ");

/** which block teaches each objective (1-based objective → block index) */
export function objectiveBlocks(L, blocks = conceptBlocks(L)) {
  const map = new Map();
  blocks.forEach((B, bi) => { for (const o of B.obj || []) if (!map.has(o)) map.set(o, bi); });
  const bw = blocks.map((B) => new Set(words(blockText(B))));
  L.objectives.forEach((text, k) => {
    const o = k + 1; if (map.has(o)) return;
    const ow = [...new Set(words(text))];
    let best = -1, bestScore = 0;
    bw.forEach((set, bi) => { const s = ow.filter((w) => set.has(w)).length; if (s > bestScore) { best = bi; bestScore = s; } });
    // nothing shared: the objectives run in teaching order, so spread them across the blocks
    map.set(o, best >= 0 ? best : Math.min(blocks.length - 1, Math.floor((k * blocks.length) / Math.max(1, L.objectives.length))));
  });
  return map;
}

/** the lesson as the Learn mode's flow (see the top of this file) */
export function lessonFlow(L, { checksPerBlock = 1 } = {}) {
  const blocks = conceptBlocks(L), objBlock = objectiveBlocks(L, blocks), qs = questionsOf(L), used = new Set();
  const hasSections = L.blocks.some((b) => b.t === "h"), placedInside = qs.some((q) => q.sec !== null && q.sec > 0 && q.sec < blocks.length);
  // which block each question belongs to
  const home = (q) => {
    if (placedInside && q.sec !== null && q.sec > 0 && q.sec <= blocks.length) return q.sec - 1;
    for (const o of q.objectives) if (objBlock.has(o)) return objBlock.get(o);
    return null;
  };
  const byBlock = blocks.map(() => []);
  for (const q of qs) { const h = home(q); if (h !== null && hasSections) byBlock[h].push(q); }
  const easiest = (a, b) => a.d - b.d || a.n - b.n;
  // the hardest questions are kept for the final check, so a block's check is an easier one when it has a choice
  const proveIds = new Set(qs.filter((q) => q.d >= 3).sort((a, b) => b.d - a.d || a.n - b.n).slice(0, 3).map((q) => q.n));
  const flowBlocks = blocks.map((B, bi) => {
    const pool = byBlock[bi].slice().sort(easiest), pick = [...pool.filter((q) => !proveIds.has(q.n)), ...pool.filter((q) => proveIds.has(q.n))].slice(0, checksPerBlock);
    pick.forEach((q) => used.add(q.n));
    return { ...B, index: bi, objectives: [...objBlock].filter(([, b]) => b === bi).map(([o]) => o).sort((a, b) => a - b), checks: pick };
  });
  const prove = qs.filter((q) => proveIds.has(q.n) && !used.has(q.n)); prove.forEach((q) => used.add(q.n));
  // a diagnostic needs questions to spare: up to two easy ones nobody else uses
  const diagnose = qs.filter((q) => !used.has(q.n) && q.d <= 1).sort(easiest).slice(0, 2); diagnose.forEach((q) => used.add(q.n));
  const practise = qs.filter((q) => !used.has(q.n)).sort(easiest);
  const pitfalls = L.blocks.filter((b) => b.t === "pit").map((b) => b.x);
  return {
    orient: { title: L.title, lead: L.lead, objectives: L.objectives, prereq: L.prereq, level: L.level },
    diagnose, blocks: flowBlocks, practise, prove,
    consolidate: { summary: L.summary, terms: L.terms, pitfalls, cards: L.cards.length },
    version: hasSections && (L.blocks.some((b) => ["hook", "more", "alt"].includes(b.t) || b.obj) || placedInside) ? 2 : 1,
  };
}

/** the Learn mode's steps, in order: each { kind, ... } (orient, diagnose, block, practise, consolidate, prove, next) */
export function lessonSteps(L, opts) {
  const F = lessonFlow(L, opts), steps = [{ kind: "orient" }];
  if (F.diagnose.length) steps.push({ kind: "diagnose", questions: F.diagnose });
  F.blocks.forEach((B, i) => steps.push({ kind: "block", block: B, n: i + 1, of: F.blocks.length }));
  if (F.practise.length) steps.push({ kind: "practise", questions: F.practise });
  steps.push({ kind: "consolidate" });
  if (F.prove.length) steps.push({ kind: "prove", questions: F.prove });
  steps.push({ kind: "next" });
  return { flow: F, steps };
}

/** the pilot lessons that offer the step-by-step Learn mode on their lesson page (Lesson System Brief v2, Stage 2).
 * Any lesson opens in it at #/step/<id>; until the pilot gate is passed, only these show the button. */
export const LEARN_PILOTS = { biology: ["u02-02"], maths: ["u03-07"], pharmacy: ["u04-06"] };   // chemistry u18 (medicinal chemistry) has no notes yet: PharmaGradify's SAR lesson stands in
