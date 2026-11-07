// Gradify maths expressions: a small, safe parser (no eval) for what students type, used by MathGradify's
// answer checking, graph explorer and step-by-step checker.
//   numbers 3, 0.5, 2.5e3 · variables x, y, t, n… (single letters) · constants pi (or π) and e
//   + − × ÷ * / ^ (or **), brackets, unary minus, implicit multiplication (2x, 3(x+1), (x+1)(x−2), xy, 2sqrt(x))
//   functions: sqrt, cbrt, abs, sin, cos, tan, sec, cosec/csc, cot, arcsin/asin, arccos/acos, arctan/atan,
//   ln, log (base 10), exp, sinh, cosh, tanh; powers of a function call: sin(x)^2
//   equations "lhs = rhs"; lists "x = 2 or x = -3", "2, -3"
// Equivalence is checked numerically: two expressions agree at many random points (where both are defined).
// That is how most computer algebra checks students' work; it's very reliable for school and early
// university algebra, but it's a check, not a proof.

const FUNCS = {
  sqrt: Math.sqrt, cbrt: Math.cbrt, abs: Math.abs, exp: Math.exp, ln: Math.log, log: Math.log10,
  sin: Math.sin, cos: Math.cos, tan: Math.tan, sec: (x) => 1 / Math.cos(x), cosec: (x) => 1 / Math.sin(x), csc: (x) => 1 / Math.sin(x), cot: (x) => 1 / Math.tan(x),
  arcsin: Math.asin, asin: Math.asin, arccos: Math.acos, acos: Math.acos, arctan: Math.atan, atan: Math.atan,
  sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
};
const CONSTS = { pi: Math.PI, "π": Math.PI, e: Math.E };
const NAMES = Object.keys(FUNCS).sort((a, b) => b.length - a.length);

// normalise what people type: unicode operators, superscripts, "x²", "½"
export function clean(s) {
  return String(s ?? "")
    .replace(/[−–—]/g, "-").replace(/[×·⋅]/g, "*").replace(/÷/g, "/").replace(/\*\*/g, "^")
    .replace(/√/g, "sqrt").replace(/²/g, "^2").replace(/³/g, "^3").replace(/½/g, "(1/2)").replace(/¼/g, "(1/4)").replace(/¾/g, "(3/4)")
    .replace(/\s+/g, " ").trim();
}

function tokenise(src) {
  const s = clean(src), out = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === " ") { i++; continue; }
    if (/[0-9.]/.test(c)) {
      const m = s.slice(i).match(/^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/i);
      if (!m) throw new SyntaxError(`I can't read the number at "${s.slice(i, i + 6)}"`);
      // "2e3" is a number, but "2e" or "2ex" is 2 × e × x
      const num = m[2] && /e[+-]?\d/i.test(m[2]) ? m[0] : m[1];
      out.push({ t: "num", v: Number(num) }); i += num.length; continue;
    }
    if (/[a-zA-Zπ]/.test(c)) {
      const rest = s.slice(i);
      // a function name counts only when a bracket or a power follows: "sin(x)", "sin^2(x)"
      const f = NAMES.find((n) => rest.toLowerCase().startsWith(n) && /^\s*[(^]/.test(rest.slice(n.length)));
      if (f) { out.push({ t: "fn", v: f }); i += f.length; continue; }
      if (rest.toLowerCase().startsWith("pi")) { out.push({ t: "num", v: Math.PI, name: "π" }); i += 2; continue; }
      if (c === "π") { out.push({ t: "num", v: Math.PI, name: "π" }); i++; continue; }
      out.push({ t: "var", v: c }); i++; continue;
    }
    if ("+-*/^(),=".includes(c)) { out.push({ t: c }); i++; continue; }
    if ("[{".includes(c)) { out.push({ t: "(" }); i++; continue; }
    if ("]}".includes(c)) { out.push({ t: ")" }); i++; continue; }
    throw new SyntaxError(`I don't recognise "${c}"`);
  }
  // implicit multiplication: 2x, 2(…), )(, x(…), )x, 2sqrt, x y
  const res = [];
  for (let k = 0; k < out.length; k++) {
    const a = res[res.length - 1], b = out[k];
    // …but not inside a function's power: sin^2(x) is (sin(x))^2, not sin^(2(x))
    const fnPower = res.length >= 3 && res[res.length - 2].t === "^" && res[res.length - 3].t === "fn";
    const endsValue = a && !fnPower && (a.t === "num" || a.t === "var" || a.t === ")");
    const startsValue = b.t === "num" || b.t === "var" || b.t === "(" || b.t === "fn";
    if (endsValue && startsValue) res.push({ t: "*" });
    res.push(b);
  }
  return res;
}

// recursive descent → a tree: { k: "num" | "var" | "neg" | "+" | "-" | "*" | "/" | "^" | "fn", … }
function parseTokens(toks) {
  let p = 0;
  const peek = () => toks[p], take = (t) => { if (toks[p]?.t !== t) throw new SyntaxError(t === ")" ? "A bracket isn't closed." : `Expected "${t}".`); return toks[p++]; };
  const expr = () => { let n = term(); while (peek() && (peek().t === "+" || peek().t === "-")) { const op = toks[p++].t; n = { k: op, a: n, b: term() }; } return n; };
  const term = () => { let n = unary(); while (peek() && (peek().t === "*" || peek().t === "/")) { const op = toks[p++].t; n = { k: op, a: n, b: unary() }; } return n; };
  const unary = () => { if (peek()?.t === "-") { p++; return { k: "neg", a: unary() }; } if (peek()?.t === "+") { p++; return unary(); } return power(); };
  const power = () => { const base = atom(); if (peek()?.t === "^") { p++; return { k: "^", a: base, b: unary() }; } return base; };
  const atom = () => {
    const t = peek();
    if (!t) throw new SyntaxError("The expression ends too soon.");
    if (t.t === "num") { p++; return { k: "num", v: t.v, name: t.name }; }
    if (t.t === "var") { p++; return CONSTS[t.v] != null && t.v === "e" ? { k: "num", v: Math.E, name: "e" } : { k: "var", v: t.v }; }
    if (t.t === "fn") {
      p++;
      let pw = null;
      if (peek()?.t === "^") { p++; pw = atom(); }               // sin^2(x)
      const arg = peek()?.t === "(" ? (p++, (() => { const e = expr(); take(")"); return e; })()) : unary();
      const call = { k: "fn", f: t.v, a: arg };
      return pw ? { k: "^", a: call, b: pw } : call;
    }
    if (t.t === "(") { p++; const e = expr(); take(")"); return { k: "()", a: e }; }
    throw new SyntaxError(t.t === ")" ? "There's a closing bracket without an opening one." : `Unexpected "${t.t}".`);
  };
  const tree = expr();
  if (p < toks.length) throw new SyntaxError(toks[p].t === ")" ? "There's a closing bracket without an opening one." : `I can't read "${toks[p].t}" here.`);
  return tree;
}

export function parse(src) {
  const s = clean(src);
  if (!s) throw new SyntaxError("Nothing to read.");
  if (s.includes("=")) throw new SyntaxError("That's an equation, not an expression.");
  return parseTokens(tokenise(s));
}

export function evaluate(node, vars = {}) {
  switch (node.k) {
    case "num": return node.v;
    case "var": if (node.v in vars) return vars[node.v]; throw new ReferenceError(`Unknown letter ${node.v}`);
    case "()": return evaluate(node.a, vars);
    case "neg": return -evaluate(node.a, vars);
    case "+": return evaluate(node.a, vars) + evaluate(node.b, vars);
    case "-": return evaluate(node.a, vars) - evaluate(node.b, vars);
    case "*": return evaluate(node.a, vars) * evaluate(node.b, vars);
    case "/": return evaluate(node.a, vars) / evaluate(node.b, vars);
    case "^": { const a = evaluate(node.a, vars), b = evaluate(node.b, vars); return a < 0 && !Number.isInteger(b) ? oddRoot(a, b) : a ** b; }
    case "fn": return FUNCS[node.f](evaluate(node.a, vars));
    default: throw new Error("bad node");
  }
}
// (−8)^(1/3) = −2: real odd roots of negatives, as students expect
const oddRoot = (a, b) => { const d = Math.round(1 / b); return Math.abs(1 / b - d) < 1e-9 && d % 2 === 1 ? -((-a) ** b) : NaN; };

export function variables(node, out = new Set()) {
  if (node.k === "var") out.add(node.v);
  for (const k of ["a", "b"]) if (node[k]) variables(node[k], out);
  return out;
}

// compile once, then call with an object of values; returns NaN rather than throwing
export function compile(src) {
  const tree = typeof src === "string" ? parse(src) : src;
  return (vars) => { try { return evaluate(tree, vars); } catch { return NaN; } };
}

// split "lhs = rhs" into two trees; also accepts "y =" style
export function parseEquation(src) {
  const s = clean(src), parts = s.split("=");
  if (parts.length !== 2) throw new SyntaxError(parts.length < 2 ? "That isn't an equation: there's no equals sign." : "An equation needs exactly one equals sign.");
  if (!parts[0].trim() || !parts[1].trim()) throw new SyntaxError("One side of the equation is empty.");
  return { lhs: parseTokens(tokenise(parts[0])), rhs: parseTokens(tokenise(parts[1])) };
}

// seeded points for sampling: away from 0 and small integers, where coincidences happen
const rng = (seed) => () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
export function samplePoints(vars, n = 24, seed = 7, range = [-3.7, 4.3]) {
  const r = rng(seed), pts = [];
  for (let i = 0; i < n; i++) { const p = {}; for (const v of vars) p[v] = range[0] + (range[1] - range[0]) * r(); pts.push(p); }
  return pts;
}
const close = (a, b) => Math.abs(a - b) <= 1e-7 * Math.max(1, Math.abs(a), Math.abs(b));

// are two expressions equal for all values? (numerically, at points where both are defined)
// opts.upToConstant: allow them to differ by a constant (indefinite integrals)
export function equivalent(a, b, { upToConstant = false, vars = null, range } = {}) {
  const ta = typeof a === "string" ? parse(a) : a, tb = typeof b === "string" ? parse(b) : b;
  const vs = vars || [...new Set([...variables(ta), ...variables(tb)])];
  let tested = 0, shift = null;
  for (const p of samplePoints(vs.length ? vs : ["x"], 40, 11, range)) {
    let x, y; try { x = evaluate(ta, p); y = evaluate(tb, p); } catch { return false; }
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    if (upToConstant) { const d = x - y; if (shift == null) shift = d; else if (!close(d, shift)) return false; }
    else if (!close(x, y)) return false;
    tested++;
  }
  return tested >= 8;
}

// does a value (or set of values) satisfy an equation?
export function satisfies(eq, vars) {
  const e = typeof eq === "string" ? parseEquation(eq) : eq;
  try { const l = evaluate(e.lhs, vars), r = evaluate(e.rhs, vars); return Number.isFinite(l) && Number.isFinite(r) && close(l, r); } catch { return false; }
}

// a number from what someone typed: "3/4", "-2.5", "2sqrt(3)", "pi/6", "1.2e3" (not equations or letters)
export function numberFrom(src) {
  try { const t = parse(src); if (variables(t).size) return NaN; return evaluate(t); } catch { return NaN; }
}
// a list of numbers: "2, -3", "x = 2 or x = -3", "x=2, x=-3"
export function numbersFrom(src) {
  return clean(src).replace(/[a-z]\s*=/gi, "").split(/,|;|\bor\b|\band\b/i).map((x) => x.trim()).filter(Boolean).map(numberFrom);
}
export const sameSet = (xs, ys, tol = 1e-6) => xs.length === ys.length && [...xs].sort((a, b) => a - b).every((x, i) => Math.abs(x - [...ys].sort((a, b) => a - b)[i]) <= tol);

// display a tree back as tidy text (for messages)
export function show(node) {
  switch (node.k) {
    case "num": return node.name || String(+node.v.toFixed(10));
    case "var": return node.v;
    case "()": return `(${show(node.a)})`;
    case "neg": return `−${show(node.a)}`;
    case "fn": return `${node.f}(${show(node.a)})`;
    case "*": return `${show(node.a)}×${show(node.b)}`;
    default: return `${show(node.a)} ${node.k === "-" ? "−" : node.k} ${show(node.b)}`.replace(" ^ ", "^");
  }
}

// form checks for "write it in this form" tasks
const stripParens = (n) => (n.k === "()" ? stripParens(n.a) : n);
export const form = {
  // fully expanded: no brackets multiplied by anything (brackets only around single numbers)
  expanded: (src) => { const t = parse(src); const bad = (n) => n.k === "()" && n.a.k !== "num" && n.a.k !== "neg" ? true : ["a", "b"].some((k) => n[k] && bad(n[k])); return !bad(t); },
  // a product at the top level: k(…)(…), (x+1)(x−2), 3x(x+2), (x−2)^2
  factorised: (src) => { const t = stripParens(parse(src)); const isProd = (n) => n.k === "*" || (n.k === "^" && stripParens(n.a).k !== "var") || (n.k === "neg" && isProd(n.a)); return isProd(t) && /\(/.test(clean(src)); },
  // a single number, without letters
  number: (src) => { try { return !variables(parse(src)).size; } catch { return false; } },
};

// display maths nicely (input stays calculator-style): x^2 → x², x^-3 → x⁻³, sqrt → √, * → ×, - → −
const SUP = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻", "−": "⁻" };
export const pretty = (s) => String(s ?? "")
  .replace(/\^\s*([-−]?\d+)(?![\d.])/g, (_, d) => [...d].map((c) => SUP[c] || c).join(""))
  .replace(/sqrt(?=\s*\()/g, "√").replace(/\*/g, "×").replace(/(\S) - (\S)/g, "$1 − $2").replace(/(^|[\s(=])-(?=[\dx(a-z√])/g, "$1−");
