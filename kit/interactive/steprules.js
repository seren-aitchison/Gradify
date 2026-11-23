// MathGradify step rules: why each line of working is valid, and what went wrong when it isn't. Used by the step
// checker (kit/interactive/stepcheck.js). No browser APIs, so Node can test it.
//
//   explainStep(p, prev, line)   → { id, title, text } for a line the checker accepted: the rule that takes the
//                                  previous line to this one (expanded the brackets, subtracted 2x from both sides,
//                                  the zero-product rule, the chain rule…)
//   diagnose(p, prev, line)      → { id, title, text } for a line the checker rejected, when the error matches a
//                                  named mistake (a sign lost in a bracket, (a + b)² written as a² + b², a term moved
//                                  across the equals sign without changing sign, the inside's derivative left out…),
//                                  or null when it doesn't match one
//   nextStep(p, lines)           → the model solution's next line after the student's furthest valid line
//
// Everything is decided deterministically, from the structure of the two lines and from evaluating them at many
// points, never by AI. `prev` is the previous valid line, or the problem's start. Rule and mistake texts explain
// the mathematics; they never give the answer to the problem being worked.
import { parse, parseEquation, compile, equivalent, samplePoints, variables, clean, numbersFrom, form as FORM, plusMinus } from "./mathexpr.js";

// ---------- trees ----------
const strip = (n) => (n && n.k === "()" ? strip(n.a) : n);
const isSum = (n) => { n = strip(n); return n.k === "+" || n.k === "-"; };
const hasVar = (n) => variables(n).size > 0;
// a + b − c → [{ s: 1, n: a }, { s: 1, n: b }, { s: −1, n: c }]; a bracketed term stays one term
function termsOf(n, s = 1, out = [], root = true) {
  if (root) n = strip(n);
  if (n.k === "+") { termsOf(n.a, s, out, false); termsOf(n.b, s, out, false); }
  else if (n.k === "-") { termsOf(n.a, s, out, false); termsOf(n.b, -s, out, false); }
  else if (n.k === "neg") termsOf(n.a, -s, out, false);
  else out.push({ s, n });
  return out;
}
// 3x(x + 2)(x − 1) → [3, x, (x + 2), (x − 1)]; a leading minus becomes the factor −1; brackets are kept
function factorsOf(n, out = [], root = true) {
  if (root) n = strip(n);
  if (n.k === "()" && strip(n).k === "*") return factorsOf(strip(n), out, false);
  if (n.k === "*") { factorsOf(n.a, out, false); factorsOf(n.b, out, false); }
  else if (n.k === "neg") { out.push({ k: "num", v: -1 }); factorsOf(n.a, out, false); }
  else out.push(n);
  return out;
}
const isBracket = (n) => n.k === "()" && isSum(n.a);
const withBracket = (n) => isBracket(n) || factorsOf(n).some((f) => isBracket(f));
const bracketBase = (n) => (n.k === "^" && isBracket(n.a) ? n.a : isBracket(n) ? n : null);
// brackets still to be multiplied out: a bracketed sum that is a factor or a power's base
function openBrackets(n) {
  let c = 0;
  const walk = (x, parent) => {
    if (!x || typeof x !== "object") return;
    if (isBracket(x) && parent && (parent.k === "*" || parent.k === "^" || parent.k === "neg" || parent.k === "-")) c++;
    for (const k of ["a", "b"]) if (x[k]) walk(x[k], x);
  };
  walk(n, null);
  return c;
}
// how many terms a full expansion has before anything is collected: 2(3(x + 1) − 1) → 6x + 6 − 2, three
function rawTerms(n) {
  n = strip(n);
  if (n.k === "+" || n.k === "-") return rawTerms(n.a) + rawTerms(n.b);
  if (n.k === "neg") return rawTerms(n.a);
  if (n.k === "*") return rawTerms(n.a) * rawTerms(n.b);
  if (n.k === "^" && strip(n.b).k === "num" && Number.isInteger(strip(n.b).v) && strip(n.b).v > 0) return rawTerms(n.a) ** strip(n.b).v;
  return 1;
}
// + and − signs anywhere, inside brackets too: collecting inside a bracket reduces it
const plusCount = (n) => { let c = 0; const w = (x) => { if (!x || typeof x !== "object") return; if (x.k === "+" || x.k === "-") c++; w(x.a); w(x.b); }; w(n); return c; };
const squaredBrackets = (n) => { let c = 0; const w = (x) => { if (!x || typeof x !== "object") return; if (x.k === "^" && isBracket(x.a) && strip(x.b).k === "num" && strip(x.b).v === 2) c++; w(x.a); w(x.b); }; w(n); return c; };
const sumOf = (ts) => ts.reduce((acc, t) => (acc ? { k: t.s < 0 ? "-" : "+", a: acc, b: t.n } : t.s < 0 ? { k: "neg", a: t.n } : t.n), null) || { k: "num", v: 0 };
const mul = (a, b) => ({ k: "*", a, b });
const sq = (a) => ({ k: "^", a: { k: "()", a }, b: { k: "num", v: 2 } });
const isConst = (n) => !hasVar(n);
const safeParse = (s) => { try { return parse(s); } catch { return null; } };
const safeEq = (s) => { try { return parseEquation(s); } catch { return null; } };

// every tree that differs from n by one local change: f(node) returns replacement trees for that node
function variants(n, f) {
  const out = [];
  const go = (node, rebuild) => {
    if (!node || typeof node !== "object") return;
    for (const r of f(node) || []) out.push(rebuild(r));
    for (const k of ["a", "b"]) if (node[k] && typeof node[k] === "object") go(node[k], (r) => rebuild({ ...node, [k]: r }));
  };
  go(n, (r) => r);
  return out;
}

// ---------- numbers ----------
const H = 1e-4;
const fnOf = (t) => (typeof t === "function" ? t : compile(t));
const pointsFor = (p, n = 24) => samplePoints([p.var || "x"], n, 5, p.range || [-3.7, 4.3]).map((o) => o[p.var || "x"]);
// compare two functions of x at sample points: rel(a, b) for a relation between their values
function holds(p, f, g, rel) {
  const v = p.var || "x"; let tested = 0;
  for (const x of pointsFor(p)) {
    const a = f({ [v]: x }), b = g({ [v]: x });
    if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
    if (!rel(a, b, x)) return false;
    tested++;
  }
  return tested >= 8;
}
const near = (a, b, tol = 1e-7) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b));
const same = (p, f, g, tol) => holds(p, fnOf(f), fnOf(g), (a, b) => near(a, b, tol));
// f − g is the same constant everywhere (and returns it), or null
function constDiff(p, f, g) {
  f = fnOf(f); g = fnOf(g); let c = null;
  const ok = holds(p, f, g, (a, b) => { const d = a - b; if (c == null) { c = d; return true; } return near(d, c, 1e-6); });
  return ok ? c : null;
}
// f ÷ g is the same constant everywhere (and returns it), or null
function constRatio(p, f, g) {
  f = fnOf(f); g = fnOf(g); let c = null;
  const ok = holds(p, f, g, (a, b) => { if (Math.abs(b) < 1e-9) return Math.abs(a) < 1e-9; const r = a / b; if (c == null) { c = r; return true; } return near(r, c, 1e-6); });
  return ok ? c : null;
}
const deriv = (f, v) => (o) => { const x = o[v]; return (f({ [v]: x + H }) - f({ [v]: x - H })) / (2 * H); };
// coefficients [c0, c1, …] of a polynomial of degree ≤ 6 in one letter, or null if it isn't one
export function polyCoeffs(t, v = "x") {
  const f = fnOf(t), xs = [-3, -2, -1, 0, 1, 2, 3], ys = xs.map((x) => f({ [v]: x }));
  if (ys.some((y) => !Number.isFinite(y))) return null;
  const n = xs.length, A = xs.map((x, i) => [...Array.from({ length: n }, (_, j) => x ** j), ys[i]]);
  for (let c = 0; c < n; c++) {
    let piv = c; for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[piv][c])) piv = r;
    [A[c], A[piv]] = [A[piv], A[c]];
    for (let r = 0; r < n; r++) if (r !== c) { const m = A[r][c] / A[c][c]; for (let k = c; k <= n; k++) A[r][k] -= m * A[c][k]; }
  }
  const cs = A.map((row, i) => { const x = row[n] / row[i]; return Math.abs(x - Math.round(x)) < 1e-7 ? Math.round(x) : x; });
  for (const x of [0.5, 1.7, -2.3, 4.1]) { const y = f({ [v]: x }), q = cs.reduce((s, c, j) => s + c * x ** j, 0); if (!Number.isFinite(y) || !near(y, q, 1e-6)) return null; }
  while (cs.length > 1 && Math.abs(cs[cs.length - 1]) < 1e-9) cs.pop();
  return cs;
}
// 0.5 → "1/2", −0.333… → "−1/3", 4 → "4"
export function nice(x) {
  if (Math.abs(x - Math.round(x)) < 1e-7) return String(Math.round(x)).replace("-", "−");
  for (let d = 2; d <= 12; d++) { const n = x * d; if (Math.abs(n - Math.round(n)) < 1e-7) return `${Math.round(n)}/${d}`.replace("-", "−"); }
  return String(+x.toPrecision(3)).replace("-", "−");
}
const powerName = (j, v) => (j === 0 ? "number term" : j === 1 ? `${v} term` : `${v}${j === 2 ? "²" : j === 3 ? "³" : `^${j}`} term`);
// a polynomial as words for "did the same to both sides": [9, −2] → "subtracted 2x and added 9"
function opWords(cs, v) {
  const parts = [];
  for (let j = cs.length - 1; j >= 0; j--) {
    const c = cs[j]; if (Math.abs(c) < 1e-9) continue;
    const mag = Math.abs(c), k = nice(mag), m = j === 0 ? k : `${mag === 1 ? "" : k.includes("/") ? `(${k})` : k}${v}${j > 1 ? (j === 2 ? "²" : j === 3 ? "³" : `^${j}`) : ""}`;
    parts.push([c > 0 ? "added" : "subtracted", m]);
  }
  if (!parts.length) return "";
  if (parts.length === 1) return `${parts[0][0]} ${parts[0][1]} ${parts[0][0] === "added" ? "to" : "from"} both sides`;
  return `${parts.map(([w, m]) => `${w} ${m}`).join(" and ")}, on both sides`;
}
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// ---------- lines ----------
// what students write before the expression: "dy/dx =", "f'(x) =", "y =", and "+ c" on integrals
function bodyOf(line, kind) {
  let s = clean(line).replace(/^∫/, "");
  if (kind !== "equation" && s.includes("=")) s = s.slice(s.lastIndexOf("=") + 1).trim();
  if (kind === "integral") s = s.replace(/\+\s*[cC]\s*$/, "").replace(/\s*d[a-z]\s*$/, "").trim();
  return s;
}
// "x = 2 or x = −3", "x = −3 ± sqrt(7)", "x = 11": a finished answer (no letter on the right)
function isAnswer(line, v) {
  const s = clean(line).replace(/±/g, "+");
  const parts = s.split(/,|;|\bor\b|\band\b/i).map((x) => x.trim()).filter(Boolean);
  return parts.length > 0 && parts.every((q, i) => { const m = q.match(new RegExp(`^(?:${v}\\s*=)?\\s*([^=]+)$`)); return m && (i > 0 || new RegExp(`^${v}\\s*=`).test(q)) && !new RegExp(`\\b${v}\\b`).test(m[1].replace(/sqrt/g, "")); });
}
// "x − 1 = 3 or x − 1 = −3": two or more equations, not yet a finished answer
const partsOf = (line) => clean(plusMinus(line)).split(/\bor\b|,|;/i).map((x) => x.trim()).filter(Boolean);
const isDisjunction = (line, v) => { const ps = partsOf(line); return ps.length > 1 && ps.every((x) => x.includes("=")) && !isAnswer(plusMinus(line), v); };
const startOf = (p) => (p.kind === "derivative" || p.kind === "integral" ? p.fn : p.start);

// ---------- rules ----------
// Each rule: a short title (shown beside the line) and the explanation (shown when the student opens it).
export const RULES = {
  "expand-single": { title: "Expanded the bracket", text: "Multiply every term inside the bracket by the term outside it. Watch the signs: a negative outside changes the sign of every term inside, so −2(x − 5) = −2x + 10." },
  "expand-double": { title: "Multiplied out two brackets", text: "Multiply each term in the first bracket by each term in the second: two brackets of two terms give four products. Then collect any like terms." },
  "square-as-product": { title: "Wrote the square as a product", text: "Squaring a bracket means multiplying it by itself: (a + b)² = (a + b)(a + b). Writing it out this way stops you missing the middle term." },
  "expand-square": { title: "Expanded the squared bracket", text: "(a + b)² = a² + 2ab + b². There are three terms: the middle term 2ab comes from the two cross products." },
  "collect": { title: "Collected like terms", text: "Terms with the same letter and power can be added together: 3x and −2x make x. Terms with different powers (x² and x) can't be combined." },
  "common-factor": { title: "Took out the common factor", text: "Find the highest common factor of every term (numbers and letters), write it outside the bracket, and divide each term by it inside. Expanding the answer should give back what you started with." },
  "factorise-quadratic": { title: "Factorised the quadratic", text: "For x² + bx + c, find two numbers that multiply to c and add to b; they are the numbers in the brackets. Expanding the brackets should give back the quadratic." },
  "difference-of-squares": { title: "Difference of two squares", text: "a² − b² = (a − b)(a + b). It works because the middle terms −ab and +ab cancel when the brackets are expanded." },
  "perfect-square": { title: "Factorised a perfect square", text: "x² + 2ax + a² = (x + a)²: the number term is the square of half the x coefficient." },
  "factorise-further": { title: "Factorised a bracket further", text: "A bracket inside a factorised answer may itself factorise (often as a difference of two squares or a quadratic). Fully factorised means no bracket can be broken down any more." },
  "split-middle": { title: "Split the middle term", text: "For ax² + bx + c, find two numbers that multiply to a × c and add to b, and use them to write bx as two terms. The four terms then factorise in pairs." },
  "factorise-pairs": { title: "Factorised in pairs", text: "Take a common factor out of the first two terms and out of the last two. If it's working, the same bracket appears in both halves." },
  "common-bracket": { title: "Took out the common bracket", text: "When every term shares the same bracket, that bracket is a common factor: 2x(x + 3) − 1(x + 3) = (2x − 1)(x + 3)." },
  "complete-square": { title: "Completed the square", text: "x² + bx = (x + b/2)² − (b/2)²: halve the x coefficient for the bracket, then subtract its square so the value is unchanged." },
  "same-add": { title: "Did the same to both sides", text: "An equation stays balanced if you add or subtract the same thing on both sides. Moving a term across the equals sign is really this, which is why it changes sign." },
  "same-multiply": { title: "Multiplied both sides by the same number", text: "Multiplying or dividing every term on both sides by the same non-zero number keeps the equation balanced. With fractions, multiplying by the lowest common denominator clears them." },
  "swap-sides": { title: "Swapped the sides", text: "a = b means the same as b = a, so the two sides can change places. It's usual to finish with the letter on the left." },
  "zero-product": { title: "Zero-product rule", text: "If two things multiply to give zero, at least one of them must be zero. So set each bracket equal to zero and solve each one: (x − 2)(x − 3) = 0 gives x − 2 = 0 or x − 3 = 0." },
  "square-root": { title: "Square-rooted both sides", text: "If something squared equals k, it equals √k or −√k. Keep both: forgetting the negative root loses a solution." },
  "quadratic-formula": { title: "Used the quadratic formula", text: "For ax² + bx + c = 0, x = (−b ± √(b² − 4ac)) ÷ 2a. Rearrange to = 0 first, and read a, b and c with their signs." },
  "rewrite": { title: "Agrees with the line before", text: "The checker found that this line agrees with the one before at many test values, but it can't name a single rule for this step. That's a strong check, not a proof. Writing one clear step per line makes working easier to follow, for you and for an examiner." },
  "rewrite-equation": { title: "Same solutions as the line before", text: "The checker found that this equation is still true for the solutions and gains no new ones at many test values, but it can't name a single rule for this step. That's a strong check, not a proof. Writing one clear step per line makes working easier to follow, for you and for an examiner." },
  "expand-collect": { title: "Expanded and collected like terms", text: "Multiply every term inside each bracket by the term outside it, then add together terms with the same letter and power. Doing both in one line saves time but makes sign slips harder to spot: write the expansion first if you're unsure." },
  "distribute-bracket": { title: "Multiplied the second bracket by each term of the first", text: "(a + b)(c + d) = a(c + d) + b(c + d). Each term of the first bracket multiplies the whole of the second; expanding these two gives the four products." },
  "multiply-expression": { title: "Multiplied both sides by an expression", text: "Multiplying both sides by an expression containing x is allowed, but only where that expression isn't zero, and it can add solutions that don't fit the original equation. Check your answers in the original." },
  "solve-each": { title: "Solved each equation", text: "Each of the equations gives one solution. Solve them separately, the same way as any linear equation." },
  "index-form": { title: "Rewrote with powers", text: "Write roots and fractions as powers of x before differentiating or integrating: √x = x^(1/2), 1/x² = x^(−2), 3/x² = 3x^(−2)." },
  "power-rule": { title: "Differentiated term by term", text: "The derivative of axⁿ is naxⁿ⁻¹: multiply by the power, then reduce the power by one. A constant term differentiates to 0." },
  "standard-derivatives": { title: "Differentiated term by term", text: "Differentiate each term separately using the standard results: xⁿ → nxⁿ⁻¹, eˣ → eˣ, ln x → 1/x, sin x → cos x, cos x → −sin x." },
  "chain-rule": { title: "Chain rule", text: "For a function of a function, differentiate the outside (leaving the inside alone), then multiply by the derivative of the inside: d/dx (3x + 1)⁵ = 5(3x + 1)⁴ × 3." },
  "product-rule": { title: "Product rule", text: "For y = uv, dy/dx = u′v + uv′: differentiate each factor in turn, keeping the other one as it is, and add." },
  "quotient-rule": { title: "Quotient rule", text: "For y = u/v, dy/dx = (u′v − uv′) ÷ v². The order of the subtraction matters: start with u′v." },
  "simplify": { title: "Simplified", text: "Same value, tidier form: multiply out the constants and collect terms so the answer is as simple as it can be." },
  "reverse-power": { title: "Integrated term by term", text: "∫ xⁿ dx = xⁿ⁺¹ ÷ (n + 1) + c, for n ≠ −1: raise the power by one, then divide by the new power. Check by differentiating your answer." },
  "reverse-chain": { title: "Reverse chain rule", text: "For a function of a linear expression ax + b, integrate as if the inside were x, then divide by a (the derivative of the inside). Differentiating your answer should give back the integrand." },
  "log-integral": { title: "Integrated to a logarithm", text: "∫ 1/(ax + b) dx = (1/a) ln|ax + b| + c. This is the n = −1 case the power rule can't handle." },
  "by-parts": { title: "Integration by parts", text: "∫ u (dv/dx) dx = uv − ∫ v (du/dx) dx. Choose u to be the factor that gets simpler when differentiated (a power of x, usually)." },
  "plus-c": { title: "Constant of integration", text: "An indefinite integral is a family of functions that differ by a constant, so add + c." },
};
const rule = (id, title) => ({ id, title: title || RULES[id].title, text: RULES[id].text });

// ---------- mistakes ----------
export const MISTAKES = {
  "bracket-sign": { title: "A sign inside the bracket", text: "A negative outside a bracket multiplies every term inside it, so it changes every sign: −2(x − 5) = −2x + 10, not −2x − 10." },
  "partial-expand": { title: "Not every term multiplied", text: "The term outside a bracket multiplies every term inside it: 3(x + 4) = 3x + 12, not 3x + 4." },
  "square-of-sum": { title: "(a + b)² isn't a² + b²", text: "Squaring a bracket gives three terms: (a + b)² = a² + 2ab + b². Write it as (a + b)(a + b) and multiply out all four products." },
  "missing-cross": { title: "Missing products", text: "Two brackets of two terms give four products, not two: (a + b)(c + d) = ac + ad + bc + bd." },
  "factor-signs": { title: "The signs in the brackets", text: "The numbers in the brackets must multiply to give the number term and add to give the x coefficient. Yours do one but not the other: check the signs." },
  "factor-check": { title: "The brackets don't expand back", text: "Expand your brackets to check them: they should give back the expression you started with. For x² + bx + c, the numbers in the brackets must multiply to c and add to b." },
  "sign-error": { title: "Sign error", text: "Everything matches except the sign of one term. Check the step that made it: a minus outside a bracket, or subtracting a negative." },
  "term-error": { title: "One term is wrong", text: "Everything matches except one term. Re-check how that term was made, or how it was collected with others." },
  "move-sign": { title: "Moved a term without changing its sign", text: "Moving a term across the equals sign is really subtracting (or adding) it on both sides, so its sign changes: x − 6 = 5 gives x = 5 + 6." },
  "one-side": { title: "Only one side changed", text: "Whatever you do to one side of an equation, do to the other side as well, or it's no longer balanced." },
  "divide-not-all": { title: "Not every term divided", text: "When you divide (or multiply) both sides by a number, every term on both sides must be divided, not just some of them." },
  "root-sign": { title: "The roots have the wrong sign", text: "x − 2 = 0 gives x = +2: each solution has the opposite sign to the number in its bracket." },
  "negative-root": { title: "The negative root is missing", text: "If something squared is k, it can be √k or −√k. Taking only the positive square root loses a solution." },
  "divided-by-variable": { title: "Divided by x", text: "Dividing both sides by x assumes x isn't 0, and loses the solution x = 0. Rearrange to = 0 and factorise instead." },
  "constant-not-zero": { title: "A constant doesn't differentiate to itself", text: "The derivative of a constant is 0, because a constant doesn't change as x changes." },
  "power-not-reduced": { title: "The power wasn't reduced", text: "The derivative of xⁿ is nxⁿ⁻¹: multiply by the power and then reduce the power by one." },
  "power-not-multiplied": { title: "Didn't multiply by the power", text: "The derivative of xⁿ is nxⁿ⁻¹: the old power comes down in front as a multiplier." },
  "chain-missing": { title: "The inside's derivative is missing", text: "With the chain rule, after differentiating the outside, multiply by the derivative of the inside." },
  "product-of-derivatives": { title: "Derivative of a product", text: "The derivative of uv isn't u′v′. Use the product rule: u′v + uv′." },
  "quotient-order": { title: "Quotient rule order", text: "The quotient rule is (u′v − uv′) ÷ v². Subtracting the other way round flips the sign of the answer." },
  "quotient-of-derivatives": { title: "Derivative of a quotient", text: "The derivative of u/v isn't u′/v′. Use the quotient rule: (u′v − uv′) ÷ v²." },
  "integrated-instead": { title: "Integrated instead of differentiated", text: "This line integrates the function. To differentiate, multiply by the power and reduce it by one." },
  "differentiated-instead": { title: "Differentiated instead of integrated", text: "This line is the derivative. To integrate, raise each power by one and divide by the new power." },
  "integral-factor": { title: "Out by a constant factor", text: "Differentiating your answer gives a multiple of the integrand. Check that you divided by the new power (and, with a function of ax + b, by a)." },
};
const mistake = (id, title, text) => ({ id, title: title || MISTAKES[id].title, text: text || MISTAKES[id].text });

// ---------- explaining a valid expression step ----------
function expressionRule(p, a, b, v) {
  const fa = (() => { try { return FORM.factorised(a); } catch { return false; } })();
  const fb = (() => { try { return FORM.factorised(b); } catch { return false; } })();
  const ta = parse(a), tb = parse(b);
  const facB = factorsOf(tb), brB = facB.filter((f) => bracketBase(f)), monoB = facB.filter((f) => !bracketBase(f) && hasVar(f));
  const nA = termsOf(ta).length, nB = termsOf(tb).length, oA = openBrackets(ta), oB = openBrackets(tb);
  const pc = polyCoeffs(ta, v);
  // factorising
  if (fb && !fa) {
    if (brB.length === 1 && (monoB.length || facB.some((f) => isConst(f) && Math.abs(strip(f).v) !== 1)) && !(brB[0].k === "^")) return rule("common-factor");
    if (brB.length === 1 && brB[0].k === "^") return rule("perfect-square");
    if (pc && pc.length === 3 && pc[1] === 0 && pc[2] * pc[0] < 0 && brB.length >= 2) return rule("difference-of-squares");
    // from a sum of bracketed terms that share a bracket: 2x(x + 3) − (x + 3)
    if (nA === 2 && termsOf(ta).every((t) => withBracket(t.n))) return rule("common-bracket");
    if (brB.length >= 2 && monoB.length) return rule("factorise-quadratic", "Took out the common factor and factorised");
    if (brB.length >= 2) return rule("factorise-quadratic");
    return rule("common-factor");
  }
  if (fb && fa) {
    if (squaredBrackets(ta) > squaredBrackets(tb) && equivalent(a, b)) return rule("square-as-product");
    if (squaredBrackets(tb) > squaredBrackets(ta) || brB.length > factorsOf(ta).filter((f) => bracketBase(f)).length) {
      const inner = factorsOf(ta).map((f) => bracketBase(f)).filter(Boolean).map((f) => polyCoeffs(f.a, v)).find((c) => c && c.length === 3 && c[1] === 0 && c[0] * c[2] < 0);
      return rule("factorise-further", inner ? "Factorised a bracket further (difference of two squares)" : undefined);
    }
  }
  // a sum of two terms each containing the same bracket, made from four terms: factorising in pairs
  if (nB === 2 && termsOf(tb).every((t) => withBracket(t.n)) && oA === 0 && nA === 4) return rule("factorise-pairs");
  // completing the square: a squared bracket appears in a sum
  if (squaredBrackets(tb) > squaredBrackets(ta) && !fb && pc && pc.length === 3) return rule("complete-square");
  if (squaredBrackets(ta) > squaredBrackets(tb)) {
    // (2x − 1)² → (2x − 1)(2x − 1)
    if (oB >= 2 && oB > oA - 1 && factorsOf(tb).filter((f) => isBracket(f)).length >= 2) return rule("square-as-product");
    if (oB < oA || oB === 0) return rule("expand-square");
  }
  if (oB < oA && oB === 0 && pc) {
    // expanded and collected at once: fewer terms than the expansion has before collecting
    const raw = rawTerms(ta);
    const cb = polyCoeffs(tb, v);
    if (cb && nB < raw && nB === cb.filter((c) => Math.abs(c) > 1e-9).length) return rule("expand-collect");
  }
  if (oB < oA) {
    // a product of two bracketed sums somewhere in the previous line → double brackets
    const dbl = variants(ta, (n) => (n.k === "*" && isBracket(strip(n.a).k === "()" ? n.a : n.a) && isBracket(n.b) ? [n] : [])).length
      || variants(ta, (n) => { if (n.k !== "*") return []; const fs = factorsOf(n); return fs.filter((f) => isBracket(f)).length >= 2 ? [n] : []; }).length;
    return rule(dbl ? "expand-double" : "expand-single", dbl ? undefined : oA - oB > 1 ? "Expanded the brackets" : undefined);
  }
  // (a + b)(c + d) → a(c + d) + b(c + d)
  const twoBr = factorsOf(ta).filter((f) => isBracket(f));
  if (nA === 1 && twoBr.length === 2 && nB === termsOf(twoBr[0].a).length && termsOf(tb).every((t) => withBracket(t.n))) return rule("distribute-bracket");
  if (oA === oB && (nB < nA || plusCount(tb) < plusCount(ta))) return rule("collect");
  if (oA === 0 && oB === 0 && nB === nA + 1 && pc && pc.length === 3) return rule("split-middle");
  return rule("rewrite");
}

// which method a function needs (for derivatives and integrals)
function method(fnTree, kind) {
  const t = strip(fnTree);
  const nonConst = factorsOf(t).filter((f) => hasVar(f));
  if (t.k === "/" && hasVar(t.b) && hasVar(t.a) && kind === "derivative") return "quotient";
  if (t.k === "/" && hasVar(t.b) && !hasVar(t.a)) {
    const d = strip(t.b);
    if (isSum(d)) return kind === "integral" ? "log" : "chain";
  }
  if (nonConst.length >= 2) return kind === "integral" ? "parts" : "product";
  const core = nonConst[0] ? strip(nonConst[0]) : t;
  if (core.k === "^" && isSum(core.a) && isConst(core.b)) return "chain";
  if (core.k === "^" && isConst(core.a) && hasVar(core.b) && strip(core.b).k !== "var") return "chain";
  if (core.k === "fn" && strip(core.a).k !== "var") return "chain";
  if (isSum(t)) {
    const plain = termsOf(t).every(({ n }) => factorsOf(n).every((f) => isConst(f) || strip(f).k === "var" || (strip(f).k === "^" && strip(strip(f).a).k === "var" && isConst(strip(f).b)) || (strip(f).k === "/" && isConst(strip(f).a)) || (strip(f).k === "fn" && strip(f).f === "sqrt" && strip(strip(f).a).k === "var")));
    return plain ? "power" : "standard";
  }
  return "power";
}
const METHOD_RULE = {
  derivative: { power: "power-rule", standard: "standard-derivatives", chain: "chain-rule", product: "product-rule", quotient: "quotient-rule" },
  integral: { power: "reverse-power", standard: "reverse-power", chain: "reverse-chain", log: "log-integral", parts: "by-parts" },
};

/** The rule behind a line the checker accepted. prev: the previous valid line (or null for the problem's start). */
export function explainStep(p, prev, line) {
  const kind = p.kind || "expression", v = p.var || "x";
  try {
    if (kind === "derivative" || kind === "integral") {
      const b = bodyOf(line, kind), a = prev == null ? p.fn : bodyOf(prev, kind);
      const opts = { upToConstant: kind === "integral", range: p.range };
      if (equivalent(b, p.fn, { range: p.range }) && !equivalent(b, p.target, opts)) return rule("index-form", equivalent(b, a, { range: p.range }) && clean(b) === clean(a) ? "Wrote out the function" : undefined);
      const wasDone = prev != null && !equivalent(a, p.fn, { range: p.range }) && equivalent(a, p.target, opts);
      if (wasDone) return rule("simplify");
      const r = rule(METHOD_RULE[kind][method(parse(p.fn), kind)]);
      if (kind === "integral" && !/\+\s*[cC]\s*$/.test(clean(line))) r.text += " Add + c: an indefinite integral is only known up to a constant.";
      return r;
    }
    if (kind === "equation") {
      const a = prev == null ? p.start : prev;
      if (isDisjunction(a, v)) return rule("solve-each");
      if (isDisjunction(line, v)) {
        const e = safeEq(a); if (!e) return rule("rewrite-equation");
        const [L, R] = [strip(e.lhs), strip(e.rhs)];
        const zero = (n) => isConst(n) && Math.abs(compile(n)({})) < 1e-12;
        const prodSide = zero(R) ? L : zero(L) ? R : null;
        if (prodSide && factorsOf(prodSide).filter((f) => hasVar(f)).length >= 2) return rule("zero-product");
        if ([L, R].some((n) => n.k === "^" && isBracket(n.a) && strip(n.b).v === 2) && [L, R].some((n) => isConst(n))) return rule("square-root");
        return rule("rewrite-equation");
      }
      line = plusMinus(line);
      if (isAnswer(line, v) && (/\bor\b|,|±/i.test(line) || numbersFrom(line).length > 1)) {
        const e = safeEq(a); if (!e) return rule("rewrite-equation");
        const [L, R] = [strip(e.lhs), strip(e.rhs)];
        const zero = (n) => isConst(n) && Math.abs(compile(n)({})) < 1e-12;
        const prodSide = zero(R) ? L : zero(L) ? R : null;
        if (prodSide && factorsOf(prodSide).filter((f) => hasVar(f)).length >= 2) return rule("zero-product");
        const sqSide = [L, R].find((n) => n.k === "^" && isBracket(n.a) && strip(n.b).v === 2);
        if (sqSide && [L, R].some((n) => isConst(n))) return rule("square-root");
        if (prodSide && /sqrt|√/.test(line)) return rule("quadratic-formula");
        if (prodSide && polyCoeffs(prodSide, v)?.length === 3) return rule(/sqrt|√/.test(line) ? "quadratic-formula" : "zero-product");
        return rule("rewrite-equation");
      }
      const pe = safeEq(a), ne = safeEq(line);
      if (!pe || !ne) return rule("rewrite-equation");
      const pL = compile(pe.lhs), pR = compile(pe.rhs), nL = compile(ne.lhs), nR = compile(ne.rhs);
      const sameL = same(p, nL, pL), sameR = same(p, nR, pR);
      if (sameL && sameR) {
        // a side was rewritten: explain that side's change
        const sides = [[a.split("=")[0], line.split("=")[0]], [a.split("=")[1], line.split("=")[1]]];
        const changed = sides.filter(([x, y]) => clean(x) !== clean(y));
        const rs = changed.map(([x, y]) => expressionRule(p, x, y, v)).filter((r) => r.id !== "rewrite");
        if (!rs.length) return rule("rewrite-equation");
        const r = rs[0];
        return changed.length === 2 && rs.length === 2 && rs[0].id === rs[1].id ? { ...r, title: `${r.title} on both sides` } : r;
      }
      if (same(p, nL, pR) && same(p, nR, pL)) return rule("swap-sides");
      // the same added to, or multiplied on, both sides (perhaps after swapping them)
      const op = (L, R, swapped) => {
        const pre = swapped ? "Swapped the sides and " : "", low = (t) => (swapped ? t.charAt(0).toLowerCase() + t.slice(1) : t);
        const dL = (o) => nL(o) - L(o), dR = (o) => nR(o) - R(o);
        if (same(p, dL, dR, 1e-6)) {
          const cs = polyCoeffs(dL, v), words = cs ? opWords(cs, v) : "";
          return rule("same-add", words ? pre + low(cap(words)) : swapped ? "Swapped the sides and did the same to both" : undefined);
        }
        const rL = constRatio(p, nL, L), rR = constRatio(p, nR, R);
        if (rL != null && rR != null && near(rL, rR, 1e-6) && !near(rL, 1)) {
          const r = rL;
          const t = Math.abs(r) >= 1 && Math.abs(r - Math.round(r)) < 1e-7 ? `Multiplied both sides by ${nice(r)}` : Math.abs(1 / r - Math.round(1 / r)) < 1e-7 ? `Divided both sides by ${nice(1 / r)}` : `Multiplied both sides by ${nice(r)}`;
          return rule("same-multiply", pre + low(t));
        }
        return null;
      };
      const r = op(pL, pR, false) || op(pR, pL, true);
      if (r && r.id === "same-add") {
        // also factorised or expanded a side in the same line
        const fac = (t) => { try { return FORM.factorised(t) && /\(/.test(t); } catch { return false; } };
        const [aL, aR] = a.split("="), [bL, bR] = line.split("=");
        if ((fac(bL) && !fac(aL) && !isConst(parse(bL))) || (fac(bR) && !fac(aR) && !isConst(parse(bR)))) r.title += ", then factorised";
        else if (openBrackets(parse(aL)) + openBrackets(parse(aR)) > openBrackets(parse(bL)) + openBrackets(parse(bR))) r.title = `Expanded the bracket, then ${r.title.charAt(0).toLowerCase()}${r.title.slice(1)}`;
      }
      if (r) return r;
      // multiplied both sides by the same expression in x: 6/x = 2 → 6 = 2x
      const g = (o) => nL(o) / pL(o), h = (o) => nR(o) / pR(o);
      if (same(p, g, h, 1e-6) && constRatio(p, g, () => 1) == null) {
        const cs = polyCoeffs(g, v), mono = cs && cs.filter((c) => Math.abs(c) > 1e-9).length === 1 && cs.length > 1;
        return rule("multiply-expression", mono ? `Multiplied both sides by ${Math.abs(cs.at(-1)) === 1 ? "" : nice(cs.at(-1))}${v}${cs.length > 2 ? (cs.length === 3 ? "²" : `^${cs.length - 1}`) : ""}` : undefined);
      }
      return rule("rewrite-equation");
    }
    // expressions
    const a = prev == null ? p.start : bodyOf(prev, kind), b = bodyOf(line, kind);
    return expressionRule(p, a, b, v);
  } catch { return rule("rewrite"); }
}

// ---------- diagnosing a wrong line ----------
// local changes that turn a correct line into a typical wrong one
const MUTATIONS = [
  // −k(a − b) → −ka − kb: the sign of later terms in a bracket after a minus not changed
  ["bracket-sign", (n) => {
    if (n.k !== "-" && n.k !== "neg") return [];
    const side = n.k === "-" ? "b" : "a", inner = n[side];
    const fs = isBracket(inner) ? [inner] : factorsOf(inner), br = fs.find((f) => isBracket(f));
    if (!br) return [];
    const ts = termsOf(br.a); if (ts.length < 2) return [];
    const flipped = { k: "()", a: sumOf(ts.map((t, i) => (i ? { ...t, s: -t.s } : t))) };
    const rebuilt = fs.map((f) => (f === br ? flipped : f)).reduce((x, y) => mul(x, y));
    return [{ ...n, [side]: rebuilt }];
  }],
  // k(a + b) → ka + b
  ["partial-expand", (n) => {
    if (n.k !== "*") return [];
    const out = [];
    for (const [k, o] of [["a", "b"], ["b", "a"]]) if (isBracket(n[k]) && !isBracket(n[o])) {
      const ts = termsOf(n[k].a); if (ts.length < 2) continue;
      out.push(sumOf([{ s: ts[0].s, n: mul(n[o], ts[0].n) }, ...ts.slice(1)]));
    }
    return out;
  }],
  // (a + b)² → a² + b² (or a² − b²)
  ["square-of-sum", (n) => {
    if (!(n.k === "^" && isBracket(n.a) && strip(n.b).k === "num" && strip(n.b).v === 2)) return [];
    const ts = termsOf(n.a.a); if (ts.length !== 2) return [];
    return [sumOf(ts.map((t) => ({ s: 1, n: sq(t.n) }))), sumOf(ts.map((t) => ({ s: t.s, n: sq(t.n) })))];
  }],
  // (a + b)(c + d) → ac + bd
  ["missing-cross", (n) => {
    if (!(n.k === "*" && isBracket(n.a) && isBracket(n.b))) return [];
    const x = termsOf(n.a.a), y = termsOf(n.b.a); if (x.length !== 2 || y.length !== 2) return [];
    return [sumOf([{ s: x[0].s * y[0].s, n: mul(x[0].n, y[0].n) }, { s: x[1].s * y[1].s, n: mul(x[1].n, y[1].n) }])];
  }],
];
// a wrong expression explained as one typical slip from the previous line
function mutationOf(p, prevTree, wrong) {
  for (const [id, f] of MUTATIONS) for (const m of variants(prevTree, f)) if (same(p, compile(m), wrong)) return mistake(id);
  return null;
}
// compare two polynomials coefficient by coefficient
function coeffMistake(p, target, wrong, factorised) {
  const v = p.var || "x", t = polyCoeffs(target, v), w = polyCoeffs(wrong, v);
  if (!t || !w) return null;
  const n = Math.max(t.length, w.length), T = [...t, ...Array(n - t.length).fill(0)], W = [...w, ...Array(n - w.length).fill(0)];
  const diff = T.map((c, j) => (Math.abs(c - W[j]) > 1e-7 ? j : -1)).filter((j) => j >= 0);
  // a factorised quadratic with the right leading term: one of "multiply to c" and "add to b" right, or neither
  if (factorised && n === 3 && near(T[2], W[2]) && diff.length) {
    if (diff.length > 1) return mistake("factor-check");
    return diff[0] === 1
      ? mistake("factor-signs", undefined, "The numbers in your brackets multiply to give the number term, but don't add to give the x coefficient: check their signs.")
      : mistake("factor-signs", "The numbers in the brackets", "The numbers in your brackets add to give the x coefficient, but don't multiply to give the number term: try another pair.");
  }
  if (diff.length !== 1) return null;
  const j = diff[0];
  if (factorised && n === 3 && j === 1) return mistake("factor-signs");
  if (near(W[j], -T[j])) return mistake("sign-error", undefined, `Everything matches except the sign of the ${powerName(j, v)}. Check the step that made it: a minus outside a bracket, or subtracting a negative.`);
  return mistake("term-error", undefined, `Everything matches except the ${powerName(j, v)}. Re-check how that term was made, or how it was collected with others.`);
}

/** A named mistake for a line the checker rejected, or null. prev: the previous valid line (or null for the start). */
export function diagnose(p, prev, line) {
  const kind = p.kind || "expression", v = p.var || "x";
  try {
    if (kind === "derivative" || kind === "integral") {
      const w = compile(bodyOf(line, kind)), f = compile(p.fn), t = compile(p.target), m = method(parse(p.fn), kind);
      if (kind === "derivative") {
        const c = constDiff(p, w, t);
        if (c != null && Math.abs(c) > 1e-9) return mistake("constant-not-zero");
        if (same(p, w, deriv(t, v), 1e-4) || same(p, deriv(w, v), f, 1e-4)) {
          if (same(p, deriv(w, v), f, 1e-4)) return mistake("integrated-instead");
        }
        const pc = polyCoeffs(p.fn, v);
        if (pc && same(p, w, (o) => o[v] * t(o))) return mistake("power-not-reduced");
        if (pc && same(p, w, (o) => (f(o) - f({ [v]: 0 })) / o[v], 1e-6)) return mistake("power-not-multiplied");
        if (m === "quotient") {
          if (same(p, w, (o) => -t(o))) return mistake("quotient-order");
          const q = strip(parse(p.fn)), u = compile(q.a), vv = compile(q.b);
          if (same(p, w, (o) => deriv(u, v)(o) / deriv(vv, v)(o), 1e-4)) return mistake("quotient-of-derivatives");
        }
        if (m === "product") {
          const fs = factorsOf(parse(p.fn)), i = fs.findIndex((x) => hasVar(x));
          const u = compile(fs.slice(0, i + 1).reduce((x, y) => mul(x, y))), vv = compile(fs.slice(i + 1).reduce((x, y) => mul(x, y)));
          if (same(p, w, (o) => deriv(u, v)(o) * deriv(vv, v)(o), 1e-4)) return mistake("product-of-derivatives");
        }
        const r = constRatio(p, w, t);
        if (r != null && !near(r, 1)) {
          if (m === "chain" && Math.abs(1 / r - Math.round(1 / r)) < 1e-6) return mistake("chain-missing", undefined, `With the chain rule, after differentiating the outside, multiply by the derivative of the inside (here, ${nice(1 / r)}).`);
          if (near(r, -1)) return mistake("sign-error", undefined, "Your answer has the opposite sign to the derivative. Check the signs as each term is differentiated.");
        }
        return coeffMistake(p, t, w, false);
      }
      // integral: compare the derivative of the student's line with the integrand
      const dw = deriv(w, v);
      if (same(p, w, deriv(f, v), 1e-4)) return mistake("differentiated-instead");
      const r = constRatio(p, dw, f);
      if (r != null && !near(r, 1, 1e-4)) {
        if (m === "chain" || m === "log") return mistake("integral-factor", undefined, `Differentiating your answer gives ${nice(r)} times the integrand. With a function of ax + b, divide by a, the derivative of the inside.`);
        return mistake("integral-factor", undefined, `Differentiating your answer gives ${nice(r)} times the integrand. Check that each term was divided by its new power.`);
      }
      return null;
    }
    if (kind === "equation") {
      const a = prev == null ? p.start : prev, pe = safeEq(a);
      if (!pe) return null;
      if (isDisjunction(line, v)) {
        const sqSide = [strip(pe.lhs), strip(pe.rhs)].some((n) => n.k === "^" && isBracket(n.a));
        return sqSide ? mistake("negative-root") : null;
      }
      line = plusMinus(line);
      if (isAnswer(line, v)) {
        const got = numbersFrom(line.replace(/±/g, "+")), sols = p.solutions || [];
        const has = (x) => got.some((g) => Math.abs(g - x) < 1e-6);
        if (got.length && got.length === sols.length && sols.every((s) => got.some((g) => Math.abs(g + s) < 1e-6)) && !sols.every(has)) return mistake("root-sign");
        const missing = sols.filter((s) => !has(s));
        if (missing.length && got.every((g) => sols.some((s) => Math.abs(g - s) < 1e-6))) {
          const sqSide = [strip(pe.lhs), strip(pe.rhs)].some((n) => n.k === "^" && isBracket(n.a));
          if (missing.some((s) => Math.abs(s) < 1e-9) && !sqSide) return mistake("divided-by-variable");
          if (sqSide || missing.length === 1) return mistake(sqSide ? "negative-root" : "divided-by-variable");
        }
        if (got.length > 1) return null;
      }
      const ne = safeEq(line); if (!ne) return null;
      const pL = compile(pe.lhs), pR = compile(pe.rhs), nL = compile(ne.lhs), nR = compile(ne.rhs);
      const sameL = same(p, nL, pL), sameR = same(p, nR, pR);
      // (x − 1)² = 9 → x − 1 = 3: square-rooted, keeping only the positive root
      const sqPrev = [strip(pe.lhs), strip(pe.rhs)].some((n) => n.k === "^" && isBracket(n.a) && strip(n.b).v === 2);
      if (sqPrev && (p.solutions || []).some((x) => { try { const e = parseEquation(line); return Math.abs(compile(e.lhs)({ [v]: x }) - compile(e.rhs)({ [v]: x })) < 1e-6; } catch { return false; } })) return mistake("negative-root");
      // a term taken off one side but not the other: 5x + 7 = 2x − 8 → 3x + 7 = 2x − 8
      const oneSide = [[sameR, nL, pL, pe.rhs], [sameL, nR, pR, pe.lhs]].some(([ok, nw, pt, other]) => {
        if (!ok) return false;
        const d = (o) => nw(o) - pt(o);
        return termsOf(other).some((t) => { const tf = compile(t.n); return same(p, d, (o) => tf(o)) || same(p, d, (o) => -tf(o)); });
      });
      // one side rewritten wrongly: a typical slip on that side (checked before "only one side changed")
      const sides = [[sameR, pe.lhs, nL], [sameL, pe.rhs, nR]];
      for (const [ok, pt, nw] of sides) if (ok) { const m = mutationOf(p, pt, nw); if (m) return m; }
      if (oneSide) return mistake("one-side");
      const [lineL, lineR] = line.split("=");
      for (const [ok, pt, nw, txt] of sides.map((x, i) => [...x, i ? lineR : lineL])) if (ok) {
        let f = false; try { f = FORM.factorised(txt) && /\(/.test(txt); } catch { /* unreadable side */ }
        const c = coeffMistake(p, compile(pt), nw, f); if (c) return c;
      }
      const dL = (o) => nL(o) - pL(o), dR = (o) => nR(o) - pR(o);
      if (!same(p, dL, () => 0) && same(p, dL, (o) => -dR(o), 1e-6)) return mistake("move-sign");
      const rL = constRatio(p, nL, pL), rR = constRatio(p, nR, pR);
      if (rL != null && !near(rL, 1) && rR == null) return mistake("divide-not-all");
      if (rR != null && !near(rR, 1) && rL == null) return mistake("divide-not-all");
      return null;
    }
    const a = prev == null ? p.start : bodyOf(prev, kind), wrong = compile(bodyOf(line, kind));
    const m = mutationOf(p, parse(a), wrong); if (m) return m;
    let f = false; try { f = FORM.factorised(bodyOf(line, kind)); } catch { /* not readable */ }
    return coeffMistake(p, compile(p.target || p.start), wrong, f);
  } catch { return null; }
}

// ---------- the next step of the model solution ----------
// does a student's line reach the same point as a model line? (equal value and the same shape)
function sameStage(p, x, y) {
  const kind = p.kind || "expression", v = p.var || "x";
  try {
    if (kind === "equation") {
      if (isAnswer(x, v) || isAnswer(y, v)) return isAnswer(x, v) && isAnswer(y, v);
      const a = parseEquation(x), b = parseEquation(y);
      const sides = (e) => [e.lhs, e.rhs].map((n) => [termsOf(n).length, openBrackets(n)].join());
      const sw = equivalent(a.lhs, b.rhs) && equivalent(a.rhs, b.lhs);
      return ((equivalent(a.lhs, b.lhs) && equivalent(a.rhs, b.rhs)) || sw) && (sw || sides(a).join() === sides(b).join());
    }
    const bx = bodyOf(x, kind), by = bodyOf(y, kind), tx = parse(bx), ty = parse(by);
    return termsOf(tx).length === termsOf(ty).length && openBrackets(tx) === openBrackets(ty) && FORM.factorised(bx) === FORM.factorised(by)
      && equivalent(bx, by, { upToConstant: kind === "integral", range: p.range });
  } catch { return false; }
}
/** The model solution's next line after the furthest point the student's valid lines have reached. */
export function nextStep(p, lines = []) {
  const sol = p.solution || [];
  // after "x − 1 = 3 or x − 1 = −3" the only step left is solving each: the model's final line
  if (lines.length && (p.kind || "expression") === "equation" && isDisjunction(lines[lines.length - 1], p.var || "x")) return sol[sol.length - 1] ?? null;
  let k = -1;
  sol.forEach((s, i) => { if (lines.some((l) => sameStage(p, l, s))) k = Math.max(k, i); });
  return sol[Math.min(k + 1, sol.length - 1)] ?? null;
}
