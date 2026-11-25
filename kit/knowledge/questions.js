// Questions generated from knowledge, not written per lesson: a definition becomes a "which describes…" question
// with the lesson's other definitions and its misconceptions as the wrong answers; a misconception becomes a true or
// false statement; each case of an application becomes "what happens?"; a mechanism becomes "why?"; a method with a
// calculation becomes a numerical question with new numbers, its answer computed (and recomputed by QA).
// Output is the website's notes format (kit/course/notes.js), with permanent ids and the objectives each tests.

import { pointsOf, linearFit, pearson, describeCorrelation, xIntercept } from "./stats.js";

const UM = { nm: 0.001, "µm": 1, mm: 1000, cm: 10000, m: 1e6 };
/** calculations a knowledge item can name; QA recomputes every answer with these */
export const COMPUTE = {
  percentChange: ({ initial, final }) => ((final - initial) / initial) * 100,
  waterPotential: ({ psiS, psiP }) => psiS + psiP,
  /** magnification = image size ÷ real size, both converted to the same unit */
  magnification: ({ image, real }) => (image.value * UM[image.unit]) / (real.value * UM[real.unit]),
  /** real size, in `unit`, from the image size and the magnification */
  realSize: ({ image, magnification, unit = "µm" }) => (image.value * UM[image.unit]) / magnification / UM[unit],
  /** a length from one unit to another */
  convert: ({ value, from, to }) => (value * UM[from]) / UM[to],
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
export function generateQuestions(items, { slug, objectiveOf = () => [], rnd = seeded(slug), max = { definition: 3, application: 3, misconception: 3, mechanism: 2 }, focus = null, priority = [] } = {}) {
  const out = [], misc = items.filter((k) => k.kind === "misconception"), defs = items.filter((k) => k.terms?.length && ["definition", "concept", "fact"].includes(k.kind));
  // the terms of the lesson's objective items first, so every objective is tested
  const rank = ({ k, t }) => (priority.includes(k.id) ? (k.terms[0] === t ? 0 : 1) : 2);
  const allDefs = defs.flatMap((k) => k.terms.map((t) => ({ k, t }))).map((x, i) => ({ ...x, i })).sort((a, b) => rank(a) - rank(b) || a.i - b.i);
  const withPrereqs = (k) => [k.id, ...(k.prereqs || []).filter((p) => items.some((x) => x.id === p))];
  const add = (type, d, body, its, extra = {}) => {
    const id = `${slug}-q${out.length + 1}`, obj = [...new Set(its.flatMap(objectiveOf))].sort((a, b) => a - b);
    out.push({ id, type, d, line: `${type}${d}#${id}${obj.length ? `@${obj.join(",")}` : ""}: ${body}`, items: its, objectives: obj, ...extra });
  };
  // definitions: the term's own definition against the lesson's other definitions and its misconceptions
  for (const { k, t } of allDefs.slice(0, focus === "practical" ? 1 : focus === "skill" ? 2 : max.definition)) {
    const wrong = shuffle([...allDefs.filter((o) => o.t.term !== t.term && o.t.definition !== t.definition).map((o) => o.t.definition), ...misc.filter((m) => m.concepts.some((c) => k.concepts.includes(c))).map((m) => clean(m.wrong).replace(/\.$/, ""))], rnd).slice(0, 3);
    if (wrong.length < 3) continue;
    add("M", 1, `Which of these best describes ${/^[A-Z]{2}/.test(t.term) ? t.term : t.term.toLowerCase()}? | ${clean(t.definition)} | ${wrong.map(clean).join(" | ")} | ${clean(t.term)}: ${sentence(t.definition)}.`, [k.id]);
  }
  // a mechanism: why does it happen?
  for (const k of items.filter((x) => x.kind === "mechanism" && x.steps?.length >= 3).slice(0, max.mechanism)) {
    const wrong = shuffle(misc.map((m) => clean(m.wrong)), rnd).slice(0, 3);
    if (wrong.length < 3) continue;
    if (/^Why /.test(k.title)) add("M", 2, `${clean(k.title).replace(/^Why /, "Why does ").replace(/water moves/, "water move")}? | ${clean(k.steps[1])} | ${wrong.join(" | ")} | ${clean(k.steps[2])}`, [k.id, ...misc.slice(0, 3).map((m) => m.id)]);
  }
  // a mechanism's steps, in order
  for (const k of items.filter((x) => x.kind === "mechanism" && x.steps?.length >= 3 && x.steps.every((s) => !/[;|]/.test(s))).slice(0, max.mechanism)) {
    add("SEQ", 2, `${clean(k.title).replace(/^How /, "How ").replace(/:.*$/, "")}: put these steps in order. | ${k.steps.map(clean).join("; ")} | ${clean(k.summary || k.steps.at(-1))}`, [k.id]);
  }
  // applications: each case, with the other cases' outcomes as the wrong answers
  for (const k of items.filter((x) => x.kind === "application")) {
    for (const c of shuffle(k.cases, rnd).slice(0, max.application)) {
      const wrong = shuffle(k.cases.filter((o) => o.outcome !== c.outcome).map((o) => o.outcome), rnd).slice(0, 3);
      if (wrong.length < 3) continue;
      add("M", 2, `${clean(c.situation)}. ${k.ask || "What happens?"} | ${clean(c.outcome)} | ${wrong.map(clean).join(" | ")} | ${clean(c.why)}`, [k.id]);
    }
  }
  // misconceptions: true or false
  for (const m of shuffle(misc, rnd).slice(0, max.misconception)) add("TF", 1, `${clean(m.wrong)} | false | ${clean(m.right)}`, [m.id]);
  // calculations: new numbers, computed answers
  for (const k of items.filter((x) => x.kind === "method" && COMPUTE[x.compute?.fn])) {
    if (k.compute.fn === "percentChange") {
      const initial = Math.round((2 + rnd() * 2) * 100) / 100, pct = Math.round((rnd() * 30 - 15) || 7), final = Math.round(initial * (1 + pct / 100) * 100) / 100;
      const ans = Math.round(COMPUTE.percentChange({ initial, final }) * 10) / 10;
      add("NUM", 2, `A piece of plant tissue has a mass of ${initial.toFixed(2)} g. After an hour in a solution its mass is ${final.toFixed(2)} g. What is its percentage change in mass, to 1 decimal place? | ${ans} | 0.1 | % | (${final.toFixed(2)} − ${initial.toFixed(2)}) ÷ ${initial.toFixed(2)} × 100 = ${ans}%: the tissue ${ans > 0 ? "gained water, so the solution had a higher concentration of water than its cells" : ans < 0 ? "lost water, so the solution had a lower concentration of water than its cells" : "had no net change in mass, so there was no net movement of water between it and the solution"}.`, [k.id], { compute: { fn: "percentChange", inputs: { initial, final }, answer: ans, dp: 1 } });
    }
  }
  for (const k of items.filter((x) => x.kind === "equation" && x.compute?.fn === "waterPotential")) {
    const psiS = -Math.round(500 + rnd() * 600), psiP = Math.round(100 + rnd() * 300), ans = COMPUTE.waterPotential({ psiS, psiP });
    const sS = Math.round(psiS / 10) * 10, sP = Math.round(psiP / 10) * 10, a2 = COMPUTE.waterPotential({ psiS: sS, psiP: sP });
    add("NUM", 2, `A plant cell has a solute potential of ${String(sS).replace("-", "−")} kPa and a pressure potential of +${sP} kPa. What is its water potential, in kPa? | ${a2} | 1 | kPa | ψ = ψs + ψp = ${String(sS).replace("-", "−")} + ${sP} = ${String(a2).replace("-", "−")} kPa.`, [k.id], { compute: { fn: "waterPotential", inputs: { psiS: sS, psiP: sP }, answer: a2, dp: 0 } });
    void ans;
  }
  // a practical: its variables, the order of its method, why steps matter
  for (const k of items.filter((x) => x.kind === "practical" && x.practical)) {
    const P = k.practical, V = P.variables, ctl = V.control || [];
    const pk = withPrereqs(k);
    add("M", 1, `In this investigation, what is the independent variable? | ${clean(V.independent)} | ${shuffle([V.dependent, ...ctl.slice(0, 2)], rnd).map(clean).join(" | ")} | The independent variable is the one you change on purpose: ${sentence(V.independent)}.`, pk);
    add("M", 1, `What is the dependent variable? | ${clean(V.dependent)} | ${shuffle([V.independent, ...ctl.slice(0, 2)], rnd).map(clean).join(" | ")} | The dependent variable is the one you measure: ${sentence(V.dependent)}.`, pk);
    if (ctl.length >= 2) add("MS", 2, `Which of these should be kept the same (control variables)? | ${ctl.slice(0, 3).map(clean).join("; ")} | ${[V.independent, V.dependent, ...(P.notControlled || [])].map(clean).join("; ")} | Everything except the independent variable must be kept the same so the test is fair; the dependent variable is what you measure.`, [k.id]);
    const steps = (P.orderable || P.method).slice(0, 6).map((x) => clean(x).replace(/;/g, ","));
    if (steps.length >= 4) add("SEQ", 2, `Put these steps of the method in order. | ${steps.join("; ")} | ${clean(P.orderWhy || "Each measurement depends on the step before it.")}`, [k.id]);
    for (const r of shuffle(P.reasons || [], rnd).slice(0, 2)) {
      const wrong = shuffle((P.reasons || []).filter((o) => o.why !== r.why).map((o) => o.why), rnd).slice(0, 3);
      if (wrong.length >= 3) add("M", 2, `Why should you ${sentence(r.step)}? | ${clean(r.why)} | ${wrong.map(clean).join(" | ")} | ${clean(r.why)}.`, [k.id]);
    }
  }
  // data: what it shows, what it doesn't, and reading from the line of best fit
  for (const k of items.filter((x) => x.kind === "dataset" && x.data?.rows?.length)) {
    const D = k.data, pts = pointsOf(D), fit = linearFit(pts), d = describeCorrelation(pearson(pts)), dk = withPrereqs(k);
    const X = D.columns.find((c) => c.key === D.x), Y = D.columns.find((c) => c.key === D.y);
    // only the correlation question needs a defined correlation; prediction and causation questions still hold
    if (D.ask?.includes("correlation") && d.sign !== "undefined") {
      const right = d.sign === "none" ? "No correlation" : `A ${d.strength} ${d.sign} correlation`;
      const opts = ["A strong positive correlation", "A strong negative correlation", "A weak positive correlation", "A weak negative correlation", "No correlation"].filter((o) => o !== right);
      add("M", 2, `${clean(k.title)}: what does the scatter diagram show? | ${right} | ${shuffle(opts, rnd).slice(0, 3).join(" | ")} | As ${X.label.toLowerCase()} increases, ${Y.label.toLowerCase()} ${d.sign === "positive" ? "tends to increase" : d.sign === "negative" ? "tends to decrease" : "shows no clear trend"}; the points lie ${d.strength === "strong" ? "close to" : "loosely around"} a straight line.`, dk, { data: { item: k.id, sign: d.sign, strength: d.strength } });
    }
    if (D.ask?.includes("causation") && D.causation) add("TF", 2, `${clean(D.causation.statement)} | false | ${clean(D.causation.why)}`, [k.id, ...items.filter((x) => x.concepts.includes("correlation") && x.kind === "fact").map((x) => x.id)]);
    if (D.ask?.includes("predict") && D.predictAt != null) {
      const y = Math.round((fit.slope * D.predictAt + fit.intercept) * 10) / 10, tol = D.predictTol ?? Math.max(0.5, Math.abs(y) * 0.1);
      add("NUM", 3, `Using the line of best fit, estimate ${Y.label.toLowerCase()} when ${X.label.toLowerCase()} is ${D.predictAt}${X.unit ? ` ${X.unit}` : ""}. | ${y} | ${tol} | ${Y.unit || ""} | Read up from ${D.predictAt} on the x-axis to the line, then across: about ${y}${Y.unit ? ` ${Y.unit}` : ""}.`, dk, { compute: { fn: "fitAt", inputs: { item: k.id, x: D.predictAt }, answer: y, dp: 1 } });
    }
    if (D.ask?.includes("xIntercept")) {
      const x0 = Math.round(xIntercept(fit) * 100) / 100;
      add("NUM", 3, `Use the line of best fit to estimate the ${X.label.toLowerCase()} at which the ${Y.label.toLowerCase()} would be zero. | ${x0} | 0.05 | ${X.unit || ""} | Where the line crosses zero, there is no net gain or loss: about ${x0}${X.unit ? ` ${X.unit}` : ""}. At that concentration the solution has the same concentration of water as the tissue.`, dk, { compute: { fn: "fitZero", inputs: { item: k.id }, answer: x0, dp: 2 } });
    }
  }
  // magnification: find it, and work back to a real size
  for (const k of items.filter((x) => (x.kind === "equation" || x.kind === "method") && x.compute?.fn === "magnification")) {
    const real = { value: Math.round(20 + rnd() * 80), unit: "µm" }, mag = [400, 500, 800, 1000, 1500, 2000][Math.floor(rnd() * 6)], image = { value: (real.value * mag) / 1000, unit: "mm" };
    add("NUM", 2, `A cell is ${real.value} µm long. In a drawing it is ${image.value} mm long. What is the magnification of the drawing? | ${mag} | 0 | × | Convert to the same unit: ${image.value} mm = ${image.value * 1000} µm. Magnification = ${image.value * 1000} ÷ ${real.value} = ×${mag}.`, [k.id], { compute: { fn: "magnification", inputs: { image, real }, answer: mag, dp: 0 } });
    const m2 = [100, 400, 1000][Math.floor(rnd() * 3)], img2 = { value: Math.round((5 + rnd() * 40) * 10) / 10, unit: "mm" }, r2 = Math.round(COMPUTE.realSize({ image: img2, magnification: m2 }) * 100) / 100;
    const re = items.find((x) => x.compute?.fn === "realSize");
    add("NUM", 3, `An image of a cell is ${img2.value} mm long at a magnification of ×${m2}. What is the cell's real length, in µm? | ${r2} | 0.01 | µm | Real size = image size ÷ magnification = ${img2.value * 1000} µm ÷ ${m2} = ${r2} µm.`, [re?.id || k.id], { compute: { fn: "realSize", inputs: { image: img2, magnification: m2, unit: "µm" }, answer: r2, dp: 2 } });
  }
  for (const k of items.filter((x) => x.compute?.fn === "convert")) {
    const um = Math.round(5 + rnd() * 90), m = COMPUTE.convert({ value: um, from: "µm", to: "m" }), mant = um / 10 ** Math.floor(Math.log10(um)), exp = Math.floor(Math.log10(um)) - 6;
    add("NUM", 2, `A cell is ${um} µm long. What is this length in metres? (You can type it as, for example, 2.5e-5.) | ${m} | ${m * 1e-6} | m | 1 µm = 0.000 001 m, so ${um} µm = ${m.toFixed(6).replace(/0+$/, "")} m = ${mant} × 10^{${exp}} m in standard form.`, [k.id], { compute: { fn: "convert", inputs: { value: um, from: "µm", to: "m" }, answer: m, dp: 12 } });
  }
  return out;
}
