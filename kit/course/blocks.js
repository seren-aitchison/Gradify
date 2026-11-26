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
// Which block a question checks, most trusted first (each check records its basis):
//   "placed"   a v2 lesson puts the question inside its block
//   "tagged"   the block is tagged with the objective the question tests ("H: Title @2", question "M2@2:")
//   "matched"  a v1 lesson: the question's own words clearly match one block more than any other (counting only
//              words that tell the blocks apart), and if it tests an objective (M2@1:), that objective's words match the
//              same block. Anything less certain stays in practice:
//              no check is better than a wrong one (owner, 25 Nov 2026), so a block with no confident check has none.
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

// a clear match: at least two shared words that tell the blocks apart (not in the title, not in most blocks), and
// more of them than the next best block
const MIN_SHARED = 2;
function blockSets(L, blocks) {
  const sets = blocks.map((B) => new Set(words(blockText(B)))), title = new Set(words(L.title)), df = new Map();
  for (const set of sets) for (const w of set) df.set(w, (df.get(w) || 0) + 1);
  const most = Math.max(1, Math.floor(blocks.length / 2));
  return sets.map((set) => new Set([...set].filter((w) => !title.has(w) && (blocks.length === 1 || df.get(w) <= most))));
}
function bestBlock(ws, sets) {
  const sc = sets.map((set) => ws.filter((w) => set.has(w)).length), top = Math.max(0, ...sc), bi = sc.indexOf(top);
  return top >= MIN_SHARED && sc.filter((x) => x === top).length === 1 ? bi : -1;
}

/** which block teaches each objective: 1-based objective → { block, basis: "tagged" | "matched" }. Objectives with no
 * clear block are left out (their questions go to practice). */
export function objectiveBlocks(L, blocks = conceptBlocks(L)) {
  const map = new Map();
  blocks.forEach((B, bi) => { for (const o of B.obj || []) if (!map.has(o)) map.set(o, { block: bi, basis: "tagged" }); });
  const bw = blockSets(L, blocks);
  L.objectives.forEach((text, k) => {
    const o = k + 1; if (map.has(o)) return;
    const bi = bestBlock([...new Set(words(text))], bw);
    if (bi >= 0) map.set(o, { block: bi, basis: "matched" });
  });
  return map;
}
// what a question is about: its stem and its right answers (wrong options name other ideas on purpose, and an
// explanation often contrasts with them, so neither is evidence of what the question tests)
const qText = (Q) => [Q.q, Q.prompt, Q.stem, ...(Q.options || []).filter((x) => x?.correct).map((x) => x.text), typeof Q.answer === "string" ? Q.answer : null].filter((x) => typeof x === "string").join(" ");

/** the lesson as the Learn mode's flow (see the top of this file) */
export function lessonFlow(L, { checksPerBlock = 1 } = {}) {
  const blocks = conceptBlocks(L), objBlock = objectiveBlocks(L, blocks), qs = questionsOf(L), used = new Set();
  const hasSections = L.blocks.some((b) => b.t === "h"), placedInside = qs.some((q) => q.sec !== null && q.sec > 0 && q.sec < blocks.length);
  const bw = blockSets(L, blocks);
  // which block each question checks, and on what basis (see the top of this file); null: it's practice
  const home = (q) => {
    if (placedInside && q.sec !== null && q.sec > 0 && q.sec <= blocks.length) return { block: q.sec - 1, basis: "placed" };
    const own = bestBlock([...new Set(words(qText(q.Q)))], bw);
    for (const o of q.objectives) {
      const m = objBlock.get(o); if (!m) continue;
      if (m.basis === "tagged") return m;
      // a matched objective: the question itself must point at the same block
      if (own === m.block) return m;
    }
    // a question tagged with no objective: its own words must point clearly at one block
    return !q.objectives.length && own >= 0 ? { block: own, basis: "matched" } : null;
  };
  const byBlock = blocks.map(() => []);
  for (const q of qs) { const h = hasSections ? home(q) : null; if (h) byBlock[h.block].push({ ...q, basis: h.basis }); }
  const easiest = (a, b) => a.d - b.d || a.n - b.n;
  // the hardest questions are kept for the final check, so a block's check is an easier one when it has a choice
  const proveIds = new Set(qs.filter((q) => q.d >= 3).sort((a, b) => b.d - a.d || a.n - b.n).slice(0, 3).map((q) => q.n));
  // a block takes a final-check question only when it has no other and at least one stays for the final check
  let proveLeft = proveIds.size;
  const flowBlocks = blocks.map((B, bi) => {
    const pool = byBlock[bi].slice().sort(easiest), pick = pool.filter((q) => !proveIds.has(q.n)).slice(0, checksPerBlock);
    for (const q of pool) if (pick.length < checksPerBlock && proveIds.has(q.n) && proveLeft > 1) { pick.push(q); proveLeft--; }
    pick.forEach((q) => used.add(q.n));
    return { ...B, index: bi, objectives: [...objBlock].filter(([, m]) => m.block === bi).map(([o]) => o).sort((a, b) => a - b), checks: pick };
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
/** the final check's questions (the "prove" step), as indices into the lesson's questions: a lesson is complete, in
 * any mode, once each has been tried (owner, 25 Nov 2026). Empty when the lesson has no level 3 questions. */
export const finalCheck = (L) => lessonFlow(L).prove.map((q) => q.n);
/** which of those the learner hasn't tried yet: keys are the questions' progress keys, in the lesson's order */
export const untried = (keys, attempts, lesson) => { const t = new Set((attempts || []).filter((a) => a.lesson === lesson).map((a) => a.question?.id)); return keys.filter((k) => !t.has(k)); };

/** how many blocks have a check, and on what basis: the honest measure of the adapter (docs/LESSON-SCHEMA.md) */
export function checkCoverage(L) {
  const F = lessonFlow(L), by = { placed: 0, tagged: 0, matched: 0 };
  for (const B of F.blocks) for (const q of B.checks) by[q.basis]++;
  return { blocks: F.blocks.length, checked: F.blocks.filter((B) => B.checks.length).length, ...by, version: F.version };
}

export const LEARN_PILOTS = { biology: ["u02-02"], maths: ["u03-07"], pharmacy: ["u04-06"] };   // chemistry u18 (medicinal chemistry) has no notes yet: PharmaGradify's SAR lesson stands in
