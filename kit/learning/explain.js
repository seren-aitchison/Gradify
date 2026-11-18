// Adaptive explanations: when a learner gets something wrong, Gradify explains it differently instead of repeating
// itself, and learns which kind of explanation actually helps this learner.
//
// The ways in, each built from the lesson's own notes (nothing invented; constitution article 1):
//   steps      Step by step: the part of the lesson the question is about, one short step at a time
//   example    Example first: a worked example, then the rule it shows
//   words      Key words first: the terms defined before the explanation that uses them
//   visual     See it: a diagram drawn from the notes, and a 3D visual or simulation of it where Gradify has one
//   mistake    The common mistake: what people get wrong here, and the right idea next to it
//   talk       Talk it through: a chain of questions, each answer revealed when you're ready
//   ai         Rewrite it for me: Gradify AI rewrites the explanation, grounded in the lesson's notes (where available)
//
// How it learns (constitution article 6: evidence, not labels): each time an explanation is shown, the learner's next
// answer in that lesson is the evidence. A strategy's record is a Beta(successes + 1, failures + 1) belief, and the
// next explanation is chosen by Thompson sampling: mostly the way that has worked best for this learner, sometimes
// another, so a learner is never stuck with a label. With consent, outcomes across learners (kit/data/outcomes.js)
// give new learners a better starting point than an even guess. Learners can always pick any way themselves.
// Pure apart from storage, so Node tests it (tests/explain.test.mjs).

export const STRATEGIES = {
  steps: { name: "Step by step", line: "One short step at a time." },
  example: { name: "Example first", line: "A worked example, then the rule it shows." },
  words: { name: "Key words first", line: "The words you need, then the explanation." },
  visual: { name: "See it", line: "A diagram, and a 3D visual or simulation where there is one." },
  mistake: { name: "The common mistake", line: "What people get wrong here, and the right idea." },
  talk: { name: "Talk it through", line: "Questions to answer in your head, one at a time." },
  ai: { name: "Rewrite it for me", line: "Gradify AI rewrites it, using this lesson's notes." },
};
const plain = (s) => String(s ?? "").replace(/\*\*|__|`/g, "").replace(/[_^]\{([^}]*)\}/g, "$1").replace(/\s+/g, " ").trim();
const STOP = new Set("the a an and or of to in on for with by from into is are be as at that this these those which what why how when its it was were has have does do not can will".split(" "));
const kw = (s) => plain(s).toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(" ").filter((w) => w.length > 3 && !STOP.has(w));
const sentences = (s) => plain(s).split(/(?<=[.!?])\s+(?=[A-Z0-9])/).filter((x) => x.length > 3);

/** The lesson's sections with their text, and the one a question is most about (by shared words). Pure. */
export function sectionsOf(L) {
  const out = []; let cur = { h: L.title, blocks: [] };
  for (const b of L.blocks) { if (b.t === "h") { if (cur.blocks.length) out.push(cur); cur = { h: plain(b.x), blocks: [] }; } else cur.blocks.push(b); }
  if (cur.blocks.length) out.push(cur);
  return out.map((s) => ({ ...s, text: s.blocks.map((b) => b.x || (b.items || []).join(". ") || (b.rows || []).map((r) => r.filter(Boolean).join(": ")).join(". ") || "").join(" ") }));
}
export function focusOf(L, Q) {
  const secs = sectionsOf(L); if (!secs.length) return null;
  const q = new Set(kw(`${Q?.q || ""} ${Q?.why || ""} ${(Q?.options || []).filter((o) => o.correct).map((o) => o.text).join(" ")}`));
  return secs.map((s) => ({ s, n: kw(`${s.h} ${s.text}`).filter((w) => q.has(w)).length })).sort((a, b) => b.n - a.n)[0].s;
}

/** An explanation in one strategy, from the lesson's notes: { strategy, title, parts: [{ kind, text, extra? }] } or null when the notes can't support it. Pure. */
export function explain(strategy, L, Q = null) {
  const sec = focusOf(L, Q), rel = (t) => sec && kw(t).some((w) => kw(`${sec.h} ${sec.text}`).includes(w));
  const terms = (L.terms || []).map(([t, d]) => [plain(t), plain(d)]);
  if (strategy === "steps") {
    if (!sec) return null;
    const st = sentences(sec.text).slice(0, 7); if (st.length < 2) return null;
    return { strategy, title: sec.h, parts: st.map((text, i) => ({ kind: "step", n: i + 1, text })) };
  }
  if (strategy === "example") {
    const ex = L.blocks.filter((b) => b.t === "ex"), best = ex.find((b) => rel(`${b.x} ${b.steps.join(" ")}`)) || ex[0];
    if (!best) return null;
    const rule = L.blocks.find((b) => b.t === "key" && rel(b.x)) || L.blocks.find((b) => b.t === "key");
    return { strategy, title: "Start with an example", parts: [{ kind: "example", text: plain(best.x), extra: best.steps.map(plain) }, ...(rule ? [{ kind: "rule", text: plain(rule.x) }] : [])] };
  }
  if (strategy === "words") {
    const use = terms.filter(([t, d]) => rel(`${t} ${d}`)).slice(0, 5);
    const pick = use.length ? use : terms.slice(0, 4);
    if (!pick.length || !sec) return null;
    return { strategy, title: "The key words, then the idea", parts: [...pick.map(([t, d]) => ({ kind: "term", text: d, term: t })), { kind: "para", text: sentences(sec.text).slice(0, 3).join(" ") }] };
  }
  if (strategy === "visual") {
    // the diagram and visual themselves are attached by the page (glass diagrams, the visual index)
    return { strategy, title: sec?.h || L.title, parts: [{ kind: "visual", text: sec ? sentences(sec.text)[0] || "" : "" }], query: [sec?.h, L.title, ...terms.slice(0, 3).map(([t]) => t)].filter(Boolean).join(" ") };
  }
  if (strategy === "mistake") {
    const pits = L.blocks.filter((b) => b.t === "pit"), p = pits.find((b) => rel(b.x)) || pits[0];
    if (!p) return null;
    const right = L.blocks.find((b) => b.t === "key" && rel(b.x)) || (sec && { x: sentences(sec.text)[0] });
    return { strategy, title: "Watch out for this", parts: [{ kind: "mistake", text: plain(p.x) }, ...(right?.x ? [{ kind: "right", text: plain(right.x) }] : [])] };
  }
  if (strategy === "talk") {
    if (!sec) return null;
    const qs = [];
    for (const [t, d] of terms.filter(([t, d]) => rel(`${t} ${d}`)).slice(0, 3)) qs.push({ kind: "ask", text: `What does "${t}" mean?`, answer: d });
    for (const s of sentences(sec.text).slice(0, 4)) {
      const m = s.match(/^(.{8,80}?)\s+(is|are|means|causes|leads to|because)\s+(.{6,})$/i);
      if (m) qs.push({ kind: "ask", text: `${m[1]} ${m[2]}…?`, answer: s });
    }
    return qs.length >= 2 ? { strategy, title: "Talk it through", parts: qs.slice(0, 5) } : null;
  }
  if (strategy === "ai") return { strategy, title: "Rewritten by Gradify AI", parts: [], ai: true };
  return null;
}
/** The strategies this lesson's notes can support (AI only when the page says it's available). Pure. */
export const available = (L, Q, { ai = false } = {}) => Object.keys(STRATEGIES).filter((s) => (s === "ai" ? ai : Boolean(explain(s, L, Q))));

// ---------- learning which way works ----------
const KEY = "gradify.explain";
const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || { stats: {}, pending: null }; } catch { return { stats: {}, pending: null }; } };
const write = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* fine */ } };
/** A Beta sample by the sum of uniforms' order statistic method (integer a, b), seeded by `rand`. */
function betaSample(a, b, rand) {
  const g = (k) => { let s = 0; for (let i = 0; i < k; i++) s -= Math.log(Math.max(1e-12, rand())); return s; };
  const x = g(Math.max(1, Math.round(a))), y = g(Math.max(1, Math.round(b)));
  return x / (x + y);
}
/**
 * The strategies in the order to offer them: Thompson sampling over this learner's record, starting from the prior
 * (population outcomes when there are any, otherwise even). Pure given `stats`, `prior` and `rand`.
 * @param {string[]} options @param {{ [s]: { ok, no } }} stats @param {{ [s]: { ok, no } }} prior
 */
export function rank(options, stats = {}, prior = {}, rand = Math.random) {
  return options.map((s) => {
    const p = prior[s] || { ok: 0, no: 0 }, m = stats[s] || { ok: 0, no: 0 };
    // population evidence counts, but never more than 10 answers' worth: this learner's own evidence soon outweighs it
    const w = Math.min(1, 10 / Math.max(1, p.ok + p.no));
    return { s, score: betaSample(1 + m.ok + p.ok * w, 1 + m.no + p.no * w, rand) };
  }).sort((a, b) => b.score - a.score).map((x) => x.s);
}
/** What this learner's record says, for the "why this way?" line: { ok, no, rate } per strategy. Pure. */
export const record = (stats, s) => { const m = stats[s] || { ok: 0, no: 0 }, n = m.ok + m.no; return { ...m, n, rate: n ? m.ok / n : null }; };

export const stats = () => read().stats;
/** An explanation was shown: the learner's next answer in this lesson is its evidence. */
export function shown(strategy, lesson) { const v = read(); v.pending = { strategy, lesson, at: Date.now() }; write(v); }
/** An answer: if an explanation was shown in this lesson in the last 20 minutes, it counts for (or against) that way. Returns the strategy credited, or null. */
export function answered(lesson, correct) {
  const v = read(), p = v.pending;
  if (!p || p.lesson !== lesson || Date.now() - p.at > 20 * 60e3) return null;
  const m = v.stats[p.strategy] ||= { ok: 0, no: 0 }; if (correct) m.ok++; else m.no++;
  v.pending = null; write(v);
  return p.strategy;
}
