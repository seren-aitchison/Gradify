// Questions generated from knowledge, not written per lesson: a definition becomes a "which describes…" question
// with the lesson's other definitions and its misconceptions as the wrong answers; a misconception becomes a true or
// false statement; each case of an application becomes "what happens?"; a mechanism becomes "why?"; a method with a
// calculation becomes a numerical question with new numbers, its answer computed (and recomputed by QA).
// Output is the website's notes format (kit/course/notes.js), with permanent ids and the objectives each tests.

/** calculations a knowledge item can name; QA recomputes every answer with these */
export const COMPUTE = {
  percentChange: ({ initial, final }) => ((final - initial) / initial) * 100,
  waterPotential: ({ psiS, psiP }) => psiS + psiP,
};

// a small seeded generator, so a lesson's questions are the same every time it is assembled
export function seeded(str) { let h = 2166136261; for (const c of String(str)) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909)) >>> 0) / 2 ** 32; }
const shuffle = (a, rnd) => a.map((x) => [rnd(), x]).sort((p, q) => p[0] - q[0]).map(([, x]) => x);
const first = (s) => String(s).replace(/\*\*/g, "").split(/(?<=[.!?])\s/)[0];
const clean = (s) => String(s).replace(/\*\*/g, "").replace(/\|/g, "/").trim();
const sentence = (s) => { const t = clean(s).replace(/\.$/, ""); return t[0].toLowerCase() + t.slice(1); };

/**
 * Questions for a lesson: [{ id, type, d, text (a notes-format line), items: [knowledge ids], objectives: [1-based],
 * answer?, compute? }]. `objectiveOf(itemId)` gives the objective an item serves.
 */
export function generateQuestions(items, { slug, objectiveOf = () => [], rnd = seeded(slug), max = { definition: 3, application: 3, misconception: 3, mechanism: 1 } } = {}) {
  const out = [], misc = items.filter((k) => k.kind === "misconception"), defs = items.filter((k) => k.terms?.length && ["definition", "concept", "fact"].includes(k.kind));
  const allDefs = defs.flatMap((k) => k.terms.map((t) => ({ k, t })));
  const add = (type, d, body, its, extra = {}) => {
    const id = `${slug}-q${out.length + 1}`, obj = [...new Set(its.flatMap(objectiveOf))].sort((a, b) => a - b);
    out.push({ id, type, d, line: `${type}${d}#${id}${obj.length ? `@${obj.join(",")}` : ""}: ${body}`, items: its, objectives: obj, ...extra });
  };
  // definitions: the term's own definition against the lesson's other definitions and its misconceptions
  for (const { k, t } of allDefs.slice(0, max.definition)) {
    const wrong = shuffle([...allDefs.filter((o) => o.t.term !== t.term && o.t.definition !== t.definition).map((o) => o.t.definition), ...misc.filter((m) => m.concepts.some((c) => k.concepts.includes(c))).map((m) => clean(m.wrong).replace(/\.$/, ""))], rnd).slice(0, 3);
    if (wrong.length < 3) continue;
    add("M", 1, `Which of these best describes ${/^[A-Z]{2}/.test(t.term) ? t.term : t.term.toLowerCase()}? | ${clean(t.definition)} | ${wrong.map(clean).join(" | ")} | ${clean(t.term)}: ${sentence(t.definition)}.`, [k.id]);
  }
  // a mechanism: why does it happen?
  for (const k of items.filter((x) => x.kind === "mechanism" && x.steps?.length >= 3).slice(0, max.mechanism)) {
    const wrong = shuffle(misc.map((m) => clean(m.wrong)), rnd).slice(0, 3);
    if (wrong.length < 3) continue;
    add("M", 2, `${clean(k.title).replace(/^Why /, "Why does ").replace(/water moves/, "water move")}? | ${clean(k.steps[1])} | ${wrong.join(" | ")} | ${clean(k.steps[2])}`, [k.id, ...misc.slice(0, 3).map((m) => m.id)]);
  }
  // applications: each case, with the other cases' outcomes as the wrong answers
  for (const k of items.filter((x) => x.kind === "application")) {
    for (const c of shuffle(k.cases, rnd).slice(0, max.application)) {
      const wrong = shuffle(k.cases.filter((o) => o.outcome !== c.outcome).map((o) => o.outcome), rnd).slice(0, 3);
      if (wrong.length < 3) continue;
      add("M", 2, `${clean(c.situation)}. What happens? | ${clean(c.outcome)} | ${wrong.map(clean).join(" | ")} | ${clean(c.why)}`, [k.id]);
    }
  }
  // misconceptions: true or false
  for (const m of shuffle(misc, rnd).slice(0, max.misconception)) add("TF", 1, `${clean(m.wrong)} | false | ${clean(m.right)}`, [m.id]);
  // calculations: new numbers, computed answers
  for (const k of items.filter((x) => x.kind === "method" && COMPUTE[x.compute?.fn])) {
    if (k.compute.fn === "percentChange") {
      const initial = Math.round((2 + rnd() * 2) * 100) / 100, pct = Math.round((rnd() * 30 - 15) || 7), final = Math.round(initial * (1 + pct / 100) * 100) / 100;
      const ans = Math.round(COMPUTE.percentChange({ initial, final }) * 10) / 10;
      add("NUM", 2, `A piece of plant tissue has a mass of ${initial.toFixed(2)} g. After an hour in a solution its mass is ${final.toFixed(2)} g. What is its percentage change in mass, to 1 decimal place? | ${ans} | 0.1 | % | (${final.toFixed(2)} − ${initial.toFixed(2)}) ÷ ${initial.toFixed(2)} × 100 = ${ans}%: the tissue ${ans > 0 ? "gained water, so the solution had a higher concentration of water than its cells" : "lost water, so the solution had a lower concentration of water than its cells"}.`, [k.id], { compute: { fn: "percentChange", inputs: { initial, final }, answer: ans, dp: 1 } });
    }
  }
  for (const k of items.filter((x) => x.kind === "equation" && x.compute?.fn === "waterPotential")) {
    const psiS = -Math.round(500 + rnd() * 600), psiP = Math.round(100 + rnd() * 300), ans = COMPUTE.waterPotential({ psiS, psiP });
    const sS = Math.round(psiS / 10) * 10, sP = Math.round(psiP / 10) * 10, a2 = COMPUTE.waterPotential({ psiS: sS, psiP: sP });
    add("NUM", 2, `A plant cell has a solute potential of ${String(sS).replace("-", "−")} kPa and a pressure potential of +${sP} kPa. What is its water potential, in kPa? | ${a2} | 1 | kPa | ψ = ψs + ψp = ${String(sS).replace("-", "−")} + ${sP} = ${String(a2).replace("-", "−")} kPa.`, [k.id], { compute: { fn: "waterPotential", inputs: { psiS: sS, psiP: sP }, answer: a2, dp: 0 } });
    void ans;
  }
  return out;
}
