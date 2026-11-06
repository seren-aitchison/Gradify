// MathGradify generated practice: endless problems from number to calculus, each with a worked method.
// Answers are read by kit/interactive/mathexpr.js, so students can type 3/4, 2sqrt(3), -1.5 or
// "x = 2 or x = -3". Every problem's arithmetic is checked in tests/mathgen.test.mjs.
import { esc } from "../core/text.js";
import { numberFrom, numbersFrom, sameSet, pretty } from "./mathexpr.js";

const rng = (seed) => () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const int = (r, a, b) => a + Math.floor(r() * (b - a + 1));
const nz = (r, a, b) => { let x = 0; while (!x) x = int(r, a, b); return x; };
const pick = (r, xs) => xs[Math.floor(r() * xs.length)];
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const frac = (n, d) => { const g = gcd(n, d) || 1, s = d < 0 ? -1 : 1; n = (s * n) / g; d = (s * d) / g; return d === 1 ? `${n}` : `${n}/${d}`; };
const r2 = (x, dp = 2) => Math.round(x * 10 ** dp) / 10 ** dp;
const signed = (k, first = false) => (k < 0 ? (first ? `−${-k}` : ` − ${-k}`) : first ? `${k}` : ` + ${k}`);
const term = (c, p, first = false) => { if (!c) return ""; const s = c < 0 ? (first ? "−" : " − ") : first ? "" : " + ", a = Math.abs(c); return s + (p === 0 ? `${a}` : `${a === 1 ? "" : a}x${p === 1 ? "" : `^${p}`}`); };
const poly = (cs) => { let out = "", first = true; cs.forEach(([c, p]) => { if (c) { out += term(c, p, first); first = false; } }); return out || "0"; };

// level: "GCSE" | "A level"; topic: a label for the menu
export const KINDS = {
  fractions: { level: "GCSE", topic: "Fractions" }, percentChange: { level: "GCSE", topic: "Percentage change" }, reversePercent: { level: "GCSE", topic: "Reverse percentages" },
  standardForm: { level: "GCSE", topic: "Standard form" }, indices: { level: "GCSE", topic: "Laws of indices" }, hcfLcm: { level: "GCSE", topic: "HCF and LCM" },
  linear: { level: "GCSE", topic: "Linear equations" }, quadratic: { level: "GCSE", topic: "Quadratic equations" }, simultaneous: { level: "GCSE", topic: "Simultaneous equations" },
  nthTerm: { level: "GCSE", topic: "nth term" }, pythagoras: { level: "GCSE", topic: "Pythagoras' theorem" }, trigSide: { level: "GCSE", topic: "Right-angled trigonometry" },
  compound: { level: "GCSE", topic: "Compound interest" }, probability: { level: "GCSE", topic: "Probability" },
  gradient: { level: "A level", topic: "Differentiation" }, definite: { level: "A level", topic: "Definite integrals" }, logs: { level: "A level", topic: "Logarithms" }, geometric: { level: "A level", topic: "Geometric series" },
};

// one problem: { kind, q, answer (number) or answers (list), tol, unit, method, accept }
export function gen(r, kind = pick(r, Object.keys(KINDS))) {
  switch (kind) {
    case "fractions": {
      const a = int(r, 1, 7), b = int(r, a + 1, 9), c = int(r, 1, 7), d = int(r, c + 1, 9), op = pick(r, ["+", "−", "×", "÷"]);
      const [n, dd] = op === "+" ? [a * d + c * b, b * d] : op === "−" ? [a * d - c * b, b * d] : op === "×" ? [a * c, b * d] : [a * d, b * c];
      const method = op === "+" || op === "−" ? `Common denominator ${b * d}: ${a * d}/${b * d} ${op} ${c * b}/${b * d} = ${n}/${dd} = ${frac(n, dd)}.` : op === "×" ? `Multiply tops and bottoms: ${a * c}/${b * d} = ${frac(n, dd)}.` : `Dividing by ${c}/${d} is multiplying by ${d}/${c}: ${a}/${b} × ${d}/${c} = ${a * d}/${b * c} = ${frac(n, dd)}.`;
      return { kind, q: `Work out ${a}/${b} ${op} ${c}/${d}. Give your answer as a fraction in its simplest form.`, answer: n / dd, tol: 1e-9, method, show: frac(n, dd) };
    }
    case "percentChange": {
      const old = pick(r, [40, 50, 80, 120, 150, 200, 250, 400]), pct = pick(r, [-30, -25, -20, -15, -10, 5, 10, 12, 15, 20, 25, 35]), now = old * (1 + pct / 100);
      return { kind, q: `A price changes from £${old} to £${r2(now)}. What is the percentage change? (Use a negative number for a decrease.)`, answer: pct, tol: 0.01, unit: "%", method: `Change = ${r2(now)} − ${old} = ${r2(now - old)}. Percentage change = ${r2(now - old)} ÷ ${old} × 100 = ${pct}%.` };
    }
    case "reversePercent": {
      const orig = pick(r, [60, 80, 120, 150, 240, 300, 450]), pct = pick(r, [10, 15, 20, 25, 30, 40]), up = r() < 0.5, now = r2(orig * (1 + (up ? pct : -pct) / 100));
      return { kind, q: `After a ${pct}% ${up ? "increase" : "decrease"}, a price is £${now}. What was the original price?`, answer: orig, tol: 0.01, unit: "£", method: `The new price is ${up ? 100 + pct : 100 - pct}% of the original, so original = ${now} ÷ ${r2((up ? 100 + pct : 100 - pct) / 100)} = £${orig}. (Not ${now} ${up ? "−" : "+"} ${pct}% of ${now}.)` };
    }
    case "standardForm": {
      const a = int(r, 11, 95) / 10, p = int(r, 2, 6), b = int(r, 11, 95) / 10, q = int(r, -4, 3), prod = a * 10 ** p * b * 10 ** q;
      const e = Math.floor(Math.log10(prod)), m = r2(prod / 10 ** e, 4);
      return { kind, q: `Work out (${a} × 10^${p}) × (${b} × 10^${q}). Give the answer as a number (for example 3.2e5 or 320000).`, answer: prod, tol: Math.abs(prod) * 1e-6, method: `Multiply the numbers: ${a} × ${b} = ${r2(a * b, 4)}. Add the powers: 10^${p} × 10^${q} = 10^${p + q}. So ${r2(a * b, 4)} × 10^${p + q} = ${m} × 10^${e}.` };
    }
    case "indices": {
      const a = int(r, 2, 6), b = int(r, 2, 5), c = int(r, 1, 6), ans = a * b - c;
      return { kind, q: `Simplify (x^${a})^${b} ÷ x^${c} = x^n. What is n?`, answer: ans, tol: 0, method: `(x^${a})^${b} = x^${a * b} (multiply powers). Dividing by x^${c} subtracts: ${a * b} − ${c} = ${ans}.` };
    }
    case "hcfLcm": {
      const g = pick(r, [2, 3, 4, 5, 6]), a = g * pick(r, [2, 3, 5, 7]), b = g * pick(r, [3, 4, 7, 9, 11].filter((x) => gcd(x, a / g) === 1)), h = gcd(a, b), l = (a * b) / h, which = r() < 0.5 ? "HCF" : "LCM";
      return { kind, q: `Find the ${which === "HCF" ? "highest common factor" : "lowest common multiple"} of ${a} and ${b}.`, answer: which === "HCF" ? h : l, tol: 0, method: `HCF(${a}, ${b}) = ${h}: the largest number that divides both. LCM = ${a} × ${b} ÷ HCF = ${a * b} ÷ ${h} = ${l}.` };
    }
    case "linear": {
      const x = nz(r, -9, 12), a = nz(r, 2, 9), b = int(r, -15, 15), c = int(r, 1, a - 1 || 1), d = a * x + b - c * x;
      const cx = c === 1 ? "x" : `${c}x`;
      return { kind, q: `Solve ${a}x${signed(b)} = ${cx}${signed(d)}.`, answer: x, tol: 1e-9, method: `Subtract ${cx} from both sides: ${a - c === 1 ? "" : a - c}x${signed(b)} = ${d}. ${b >= 0 ? `Subtract ${b}` : `Add ${-b}`}: ${a - c === 1 ? "" : a - c}x = ${d - b}.${a - c === 1 ? "" : ` Divide by ${a - c}: x = ${x}.`}`, accept: "x" };
    }
    case "quadratic": {
      let p = nz(r, -8, 8), q = nz(r, -8, 8); if (p === q) q = -p || 3;
      const B = -(p + q), C = p * q;
      return { kind, q: `Solve x^2${B ? (B > 0 ? ` + ${B === 1 ? "" : B}x` : ` − ${B === -1 ? "" : -B}x`) : ""}${signed(C)} = 0. Give both solutions, like x = 2 or x = −3.`, answers: [p, q], tol: 1e-9, method: `Find two numbers that multiply to ${C} and add to ${B}: ${-p} and ${-q}. So (x${signed(-p)})(x${signed(-q)}) = 0, giving x = ${p} or x = ${q}.` };
    }
    case "simultaneous": {
      const x = nz(r, -6, 8), y = nz(r, -6, 8), a = nz(r, 1, 5), b = nz(r, -4, 5), c = nz(r, 1, 5), d = nz(r, -4, 5);
      if (a * d - b * c === 0) return gen(r, kind);
      return { kind, q: `Solve the simultaneous equations ${a === 1 ? "" : a}x${b < 0 ? ` − ${b === -1 ? "" : -b}y` : ` + ${b === 1 ? "" : b}y`} = ${a * x + b * y} and ${c === 1 ? "" : c}x${d < 0 ? ` − ${d === -1 ? "" : -d}y` : ` + ${d === 1 ? "" : d}y`} = ${c * x + d * y}. Enter x then y, like 2, −3.`, answers: [x, y], ordered: true, tol: 1e-9, method: `Make the x coefficients match (× ${c} and × ${a}) and subtract to eliminate x: (${b * c} − ${a * d})y = ${(a * x + b * y) * c - (c * x + d * y) * a}, so y = ${y}. Substitute back: x = ${x}.` };
    }
    case "nthTerm": {
      const d = nz(r, -6, 9), a = int(r, -10, 15), n = int(r, 20, 60), seq = [0, 1, 2, 3].map((k) => a + k * d);
      return { kind, q: `The sequence ${seq.join(", ")}, … is arithmetic. What is its ${n}th term?`, answer: a + (n - 1) * d, tol: 0, method: `The common difference is ${d}, so the nth term is ${d}n${signed(a - d)}. For n = ${n}: ${d} × ${n}${signed(a - d)} = ${a + (n - 1) * d}.` };
    }
    case "pythagoras": {
      const [p, q] = pick(r, [[3, 4], [5, 12], [8, 15], [7, 24], [6, 8], [9, 12], [20, 21]]), h = Math.hypot(p, q), findH = r() < 0.6;
      return findH ? { kind, q: `A right-angled triangle has shorter sides ${p} cm and ${q} cm. Find the hypotenuse.`, answer: h, tol: 0.01, unit: "cm", method: `h^2 = ${p}^2 + ${q}^2 = ${p * p + q * q}, so h = √${p * p + q * q} = ${h} cm.` }
        : { kind, q: `A right-angled triangle has hypotenuse ${h} cm and one side ${p} cm. Find the other side.`, answer: q, tol: 0.01, unit: "cm", method: `a^2 = ${h}^2 − ${p}^2 = ${h * h - p * p}, so a = √${h * h - p * p} = ${q} cm.` };
    }
    case "trigSide": {
      const ang = pick(r, [20, 25, 30, 35, 40, 50, 55, 60, 65]), hyp = int(r, 5, 25), f = pick(r, ["opp", "adj"]), v = f === "opp" ? hyp * Math.sin((ang * Math.PI) / 180) : hyp * Math.cos((ang * Math.PI) / 180);
      return { kind, q: `In a right-angled triangle the hypotenuse is ${hyp} cm and one angle is ${ang}°. Find the side ${f === "opp" ? "opposite" : "adjacent to"} that angle, to 2 decimal places.`, answer: r2(v), tol: 0.011, unit: "cm", method: `${f === "opp" ? "SOH: opposite = hypotenuse × sin" : "CAH: adjacent = hypotenuse × cos"} ${ang}° = ${hyp} × ${r2(f === "opp" ? Math.sin((ang * Math.PI) / 180) : Math.cos((ang * Math.PI) / 180), 4)} = ${r2(v)} cm.` };
    }
    case "compound": {
      const P = pick(r, [500, 1000, 2000, 2500, 5000]), i = pick(r, [2, 3, 3.5, 4, 5]), n = int(r, 2, 6), A = P * (1 + i / 100) ** n;
      return { kind, q: `£${P} is invested at ${i}% compound interest per year. What is it worth after ${n} years, to the nearest penny?`, answer: r2(A), tol: 0.011, unit: "£", method: `Multiplier ${1 + i / 100} each year: ${P} × ${1 + i / 100}^${n} = £${r2(A).toFixed(2)}.` };
    }
    case "probability": {
      const red = int(r, 2, 6), blue = int(r, 2, 6), t = red + blue, repl = r() < 0.5;
      const ans = repl ? (red / t) ** 2 : (red / t) * ((red - 1) / (t - 1));
      const show = repl ? frac(red * red, t * t) : frac(red * (red - 1), t * (t - 1));
      return { kind, show, q: `A bag has ${red} red and ${blue} blue counters. Two are taken at random, ${repl ? "with the first replaced" : "without replacement"}. What is the probability both are red? Give a fraction or a decimal.`, answer: ans, tol: 1e-6, method: repl ? `P(red) = ${red}/${t} each time: (${red}/${t}) × (${red}/${t}) = ${frac(red * red, t * t)}.` : `P(first red) = ${red}/${t}; then ${red - 1} red of ${t - 1} remain: (${red}/${t}) × (${red - 1}/${t - 1}) = ${frac(red * (red - 1), t * (t - 1))}.` };
    }
    case "gradient": {
      const a = nz(r, -4, 5), b = int(r, -6, 6), c = int(r, -9, 9), n = pick(r, [2, 3]), x0 = int(r, -3, 4);
      const f = poly([[a, n], [b, 1], [c, 0]]), g = a * n * x0 ** (n - 1) + b;
      return { kind, q: `Find the gradient of y = ${f} at x = ${x0}.`, answer: g, tol: 1e-9, method: `dy/dx = ${poly([[a * n, n - 1], [b, 0]])}. At x = ${x0}: ${a * n} × (${x0})${n - 1 === 1 ? "" : `^${n - 1}`}${b ? signed(b) : ""} = ${g}.` };
    }
    case "definite": {
      const a = nz(r, -3, 4), b = int(r, -5, 5), lo = int(r, -2, 1), hi = lo + int(r, 1, 3);
      const F = (x) => (a * x ** 3) / 3 + (b * x ** 2) / 2, ans = F(hi) - F(lo);
      return { kind, q: `Evaluate the integral of ${poly([[a, 2], [b, 1]])} from x = ${lo} to x = ${hi}. Give an exact fraction or a decimal.`, answer: ans, tol: 1e-6, method: `An antiderivative is F(x) = ${a === 1 ? "" : a === -1 ? "−" : a}x^3/3${b ? ` ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}x^2/2` : ""}. F(${hi}) − F(${lo}) = ${r2(F(hi), 4)} − (${r2(F(lo), 4)}) = ${r2(ans, 4)}.`, show: frac(Math.round(ans * 6), 6) };
    }
    case "logs": {
      const b = pick(r, [2, 3, 5, 10]), k = int(r, 2, 4), m = int(r, 1, 3), v = b ** (k + m);
      return { kind, q: `Find x if log_${b}(x) = log_${b}(${b ** k}) + ${m}.`, answer: v, tol: 1e-6, method: `log_${b}(${b ** k}) = ${k}, so log_${b}(x) = ${k + m} and x = ${b}^${k + m} = ${v}.` };
    }
    case "geometric": {
      const a = pick(r, [2, 3, 4, 6, 8, 10]), num = pick(r, [1, 1, 2, 3]), den = pick(r, [2, 3, 4, 5].filter((d) => d > num)), s = a / (1 - num / den);
      return { kind, show: frac(a * den, den - num), q: `Find the sum to infinity of the geometric series with first term ${a} and common ratio ${num}/${den}.`, answer: s, tol: 1e-6, method: `|r| < 1, so S∞ = a ÷ (1 − r) = ${a} ÷ (1 − ${num}/${den}) = ${a} ÷ ${frac(den - num, den)} = ${frac(a * den, den - num)}.` };
    }
    default: throw new Error(`unknown kind ${kind}`);
  }
}

export function isRight(p, text) {
  if (p.answers) { const got = numbersFrom(text); if (got.length !== p.answers.length || got.some((x) => !Number.isFinite(x))) return false; return p.ordered ? got.every((x, i) => Math.abs(x - p.answers[i]) <= p.tol + 1e-9) : sameSet(got, p.answers, p.tol + 1e-9); }
  const v = numberFrom(String(text).replace(/^[a-z]\s*=\s*/i, "").replace(/[£%,]|cm/g, (x) => (x === "," ? "" : "")).trim());
  return Number.isFinite(v) && Math.abs(v - p.answer) <= p.tol + 1e-9;
}
export const answerText = (p) => (p.answers ? (p.ordered ? p.answers.join(", ") : p.answers.map((x) => `x = ${x}`).join(" or ")) : p.show || `${+p.answer.toFixed(6)}${p.unit && p.unit !== "£" ? ` ${p.unit}` : ""}`);

export function mountMathGen(el, { onComplete } = {}) {
  let r = rng(Date.now() >>> 0), n = 0, right = 0, topic = "mixed", level = "all";
  const kinds = () => Object.keys(KINDS).filter((k) => (topic === "mixed" || k === topic) && (level === "all" || KINDS[k].level === level));
  const go = () => {
    const c = gen(r, pick(r, kinds()));
    el.innerHTML = `<div class="tx mx-gen"><h2>Practice problems</h2>
      <div class="mx-gen-pick"><label>Level <select data-level><option value="all">GCSE and A level</option><option value="GCSE">GCSE</option><option value="A level">A level</option></select></label>
      <label>Topic <select data-topic><option value="mixed">Mixed</option>${Object.entries(KINDS).filter(([, k]) => level === "all" || k.level === level).map(([id, k]) => `<option value="${id}">${esc(k.topic)}</option>`).join("")}</select></label></div>
      <p>Question ${n + 1} of 10 · <small>${esc(KINDS[c.kind].topic)} (${esc(KINDS[c.kind].level)})</small></p><p class="tx-q">${esc(pretty(c.q))}</p>
      <label class="tx-ans">Your answer <input type="text" inputmode="text" autocomplete="off" spellcheck="false" aria-label="Your answer"></label>
      <button type="button" class="btn btn-light lg btn-sm" data-check><span>Check</span></button><p class="mx-help">You can type fractions (3/4), roots (2sqrt(3)) and lists (x = 2 or x = −3).</p><div class="tx-out" role="status"></div></div>`;
    el.querySelector("[data-level]").value = level; el.querySelector("[data-topic]").value = topic;
    el.querySelector("[data-level]").addEventListener("change", (e) => { level = e.target.value; topic = "mixed"; n = 0; right = 0; go(); });
    el.querySelector("[data-topic]").addEventListener("change", (e) => { topic = e.target.value; n = 0; right = 0; go(); });
    const input = el.querySelector(".tx-ans input");
    const check = () => {
      if (!input.value.trim()) return;
      const ok = isRight(c, input.value); right += ok; n++;
      el.querySelector(".tx-out").innerHTML = `<p class="${ok ? "ok" : "no"}"><b>${ok ? "Correct" : `Not quite: the answer is ${esc(answerText(c))}`}.</b></p><p>${esc(pretty(c.method))}</p>${n < 10 ? `<button type="button" class="btn btn-ghost lg btn-sm" data-next><span>Next</span></button>` : `<p><b>${right} out of 10.</b></p><button type="button" class="btn btn-ghost lg btn-sm" data-again><span>Another 10</span></button>`}`;
      el.querySelector("[data-check]").disabled = true; input.disabled = true;
      el.querySelector("[data-next]")?.addEventListener("click", go);
      el.querySelector("[data-again]")?.addEventListener("click", () => { n = 0; right = 0; go(); });
      if (n === 10) onComplete?.({ score: right / 10 });
    };
    el.querySelector("[data-check]").addEventListener("click", check);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
  };
  go();
}
