// Gradify Visual Learning Engine: the maths renderers for number, sequences and probability. Each draws a wide and a
// narrow layout and recomputes the mathematics the spec states, so a drawing that says something false fails:
//
//   number-line   points from their exact expressions; jumps add up; intervals match the inequality; order; rounding
//   sequence      every term from the rule (arithmetic, geometric, nth term, Fibonacci, recurrence); dot patterns
//                 hold exactly the term's dots; nth terms and sums
//   factor-tree   every branch multiplies to its parent; leaves prime; the stated factorisation is the leaves
//   bar-model     shaded fractions (exact), equivalence, ratio shares, percentages and multipliers; braces add up
//   venn          region counts for any event (∩ ∪ ′), exact probabilities, conditional ones; products of items
//                 (HCF/LCM); nested number sets with every member checked against its set
//   prob-tree     branches from a point sum to 1; outcome and event probabilities multiplied and added exactly
//
// Geometry, vectors and transformations are in maths-renderers-2.js; statistics and distributions in -3.js.
// Number labels are generated from the values (fmt), so a label cannot disagree with what is checked.
import { register, text, line, arrow, col, f1, check, near, COLOURS as C } from "./renderers.js";
import { entry } from "./maths-layout.js";
import { frac, fadd, fmul, fdiv, feq, fval, fstr, num, fmt, isPrime, readFactorisation, roundTo, readInequality, sum } from "./maths-core.js";

const minus = (s) => String(s).replace(/-/g, "−");
const signed = (v) => (v < 0 ? `−${fmt(-v)}` : `+${fmt(v)}`);
const dot = (x, y, r, fill, stroke = C.panel) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
const rect = (x, y, w, h, { fill = "none", stroke = C.ink, sw = 1.6, rx = 0, op = 1 } = {}) => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${rx}" fill="${fill}" fill-opacity="${op}" stroke="${stroke}" stroke-width="${sw}"/>`;

// ======================================================================== number-line
// spec: range [a, b], ticks: {step, from?} | [values], narrowTicks?: {step}, tickLabels?: {value: label}, minor?: step,
//   points: [{value, expr?, label?, colour, below?}], intervals: [{from|null, to|null, closed: [l, r], inequality?, label?, colour}],
//   jumps: {from, steps: [{by, label?}], to, colour?}, checks: [{type: "order", labels} | {type: "round", value, step|dp|sf, result}
//   | {type: "value", expr, value, name?} | {type: "between", expr, from, to}]
function tickValues(t, [a, b]) {
  if (Array.isArray(t)) return t;
  const out = [], s = t.step, f = t.from ?? Math.ceil(a / s - 1e-9) * s;
  for (let v = f; v <= b + 1e-9; v += s) out.push(+v.toPrecision(12));
  return out;
}
function numberLine(spec, W, narrow) {
  const [a, b] = spec.range, pad = narrow ? 22 : 34, sx = (v) => pad + ((v - a) / (b - a)) * (W - 2 * pad);
  const iv = spec.intervals || [], pts = spec.points || [], above = pts.some((p) => !p.below), below = pts.some((p) => p.below);
  const jumpH = spec.jumps ? 64 + 22 * (spec.jumps.steps.length - 1) : 0, ivH = iv.length ? 30 + (iv.length - 1) * 34 : 0;
  // jumps arc up from the line, so intervals drawn with jumps go in rows under the tick labels instead of above
  const ivBelow = !!spec.jumps && iv.length > 0, rowsAbove = ivBelow ? [] : iv;
  const yL = 18 + jumpH + (ivBelow ? 0 : ivH) + (above ? (rowsAbove.length ? 44 : 30) : 0) + 6, yBase = yL + (below ? 58 : 36);
  let s = arrow(sx(a) - 12, yL, sx(b) + 14, yL, { stroke: C.ink, w: 1.8, head: 9, both: true });
  if (spec.minor) for (const v of tickValues({ step: spec.minor }, [a, b])) s += line(sx(v), yL - 4, sx(v), yL + 4, { stroke: C.line, w: 1 });
  const tl = spec.tickLabels || {};
  for (const v of tickValues((narrow && spec.narrowTicks) || spec.ticks || { step: 1 }, [a, b])) s += line(sx(v), yL - 7, sx(v), yL + 7, { stroke: C.ink, w: 1.5 }) + text(sx(v), yL + 21, tl[v] ?? fmt(v), { size: 13, fill: C.soft });
  iv.forEach((r, k) => {
    const c = col(r.colour || "a1");
    const yy = ivBelow ? yBase + 10 + k * 46 : (above ? yL - 44 : yL) - (iv.length - 1 - k) * 34;
    const x0 = r.from == null ? sx(a) - 10 : sx(r.from), x1 = r.to == null ? sx(b) + 10 : sx(r.to);
    s += (r.from == null || r.to == null ? arrow(r.from == null ? x1 : x0, yy, r.from == null ? x0 : x1, yy, { stroke: c, w: 5, head: 12 }) : line(x0, yy, x1, yy, { stroke: c, w: 5 }));
    for (const [v, cl] of [[r.from, r.closed?.[0]], [r.to, r.closed?.[1]]]) if (v != null) s += `<circle cx="${f1(sx(v))}" cy="${f1(yy)}" r="7" fill="${cl ? c : C.panel}" stroke="${c}" stroke-width="2.6"/>`;
    const label = r.label ?? r.inequality;
    if (label) s += text((Math.max(x0, sx(a)) + Math.min(x1, sx(b))) / 2, ivBelow ? yy + 20 : yy - 19, minus(label).replace(/<=/g, "≤").replace(/>=/g, "≥"), { size: 13.5, weight: 700, fill: c });
  });
  if (spec.jumps) {
    const J = spec.jumps, c = col(J.colour || "a2"); let v = J.from;
    for (const [i, st] of J.steps.entries()) {
      const x0 = sx(v), x1 = sx(v + st.by), mx = (x0 + x1) / 2, top = yL - 46 - 22 * i;
      s += `<path d="M${f1(x0)} ${f1(yL - 4)} Q${f1(mx)} ${f1(top - 14)} ${f1(x1)} ${f1(yL - 6)}" fill="none" stroke="${c}" stroke-width="2.4"/>`;
      const dir = Math.sign(x1 - x0); s += `<path d="M${f1(x1)} ${f1(yL - 3)} l${f1(-dir * 9)} -9 l${f1(dir * 3)} 10 Z" fill="${c}"/>`;
      s += text(mx, top - 12, st.label ?? signed(st.by), { size: 13, weight: 700, fill: c });
      v += st.by;
    }
  }
  for (const p of pts) {
    const c = col(p.colour || "a2"), x = sx(p.value);
    s += dot(x, yL, 6, c);
    s += text(x + (p.dx || 0), p.below ? yL + 44 : yL - 17, minus(p.label ?? fmt(p.value)), { size: 13.5, weight: 700, fill: c });
  }
  return { s, H: yBase + (ivBelow ? iv.length * 46 + 6 : 0) };
}
function numberLineChecks(spec) {
  const out = [], [a, b] = spec.range, pts = spec.points || [];
  for (const p of pts) {
    if (p.value < a || p.value > b) out.push(check(`${p.label ?? p.value} is on the line`, false, `${p.value} outside ${a}…${b}`));
    if (p.expr != null) { const v = num(p.expr); out.push(check(`${p.label ?? p.expr} is at ${fmt(p.value, 4)}`, Math.abs(v - p.value) <= (p.tol ?? 5e-4), `${p.expr} = ${fmt(v, 6)}`)); }
  }
  for (const r of spec.intervals || []) if (r.inequality) {
    const q = readInequality(r.inequality), same = q.from === (r.from ?? null) && q.to === (r.to ?? null) && !!q.closed[0] === !!r.closed?.[0] && !!q.closed[1] === !!r.closed?.[1];
    out.push(check(`the interval drawn is ${r.inequality}`, same, `drawn ${r.from ?? "−∞"}${r.closed?.[0] ? "]" : ")"}…${r.to ?? "∞"}; inequality gives ${JSON.stringify(q)}`));
  }
  if (spec.jumps) { const J = spec.jumps, end = J.from + sum(J.steps.map((x) => x.by)); out.push(check(`${fmt(J.from)} ${J.steps.map((x) => signed(x.by)).join(" ")} = ${fmt(J.to)}`, near(end, J.to, 1e-9), `jumps end at ${fmt(end)}`)); }
  for (const k of spec.checks || []) {
    if (k.type === "order") { const v = k.labels.map((l) => pts.find((p) => (p.label ?? fmt(p.value)) === l)?.value); out.push(check(k.name || `${k.labels.join(" < ")}`, v.every((x, i) => x != null && (i === 0 || x > v[i - 1])), v.map((x) => fmt(x, 4)).join(", "))); }
    else if (k.type === "round") { const r = roundTo(num(k.value), k); out.push(check(k.name || `${k.value} rounds to ${k.result}`, near(r, num(k.result), 1e-12), `rounds to ${r}`)); }
    else if (k.type === "value") { const v = num(k.expr); out.push(check(k.name || `${k.expr} = ${k.value}`, Math.abs(v - num(k.value)) <= (k.tol ?? 1e-9), `${fmt(v, 6)}`)); }
    else if (k.type === "between") { const v = num(k.expr); out.push(check(k.name || `${k.expr} lies between ${k.from} and ${k.to}`, v > num(k.from) && v < num(k.to), fmt(v, 6))); }
  }
  return out;
}

// ======================================================================== sequence
// spec: terms: [numbers], rule: {kind: "arithmetic", a, d} | {kind: "geometric", a, r} | {kind: "nth", expr (in x = n)}
//   | {kind: "fibonacci"} | {kind: "recurrence", a, expr (in x = previous term)}, start (first n, default 1),
//   show: "differences" | "second" | "ratios", pattern: "triangle" | "square" | "oblong" | "odd" (dot figures),
//   more: true (draws "…"), ruleText: shown under the terms, checks: [{type: "nth", n, value} | {type: "sum", n, value}]
function ruleTerm(rule, n, prev) {
  if (rule.kind === "arithmetic") return rule.a + (n - 1) * rule.d;
  if (rule.kind === "geometric") return rule.a * rule.r ** (n - 1);
  if (rule.kind === "nth") return num(String(rule.expr).replace(/\bn\b/g, "x").replace(/x/g, `(${n})`));
  throw new Error(`rule ${rule.kind} needs the earlier terms`);
}
function ruleTerms(rule, count) {
  const out = [];
  for (let n = 1; n <= count; n++) {
    if (rule.kind === "fibonacci") out.push(n <= 2 ? (n === 1 ? rule.a ?? 1 : rule.b ?? 1) : out[n - 2] + out[n - 3]);
    else if (rule.kind === "recurrence") out.push(n === 1 ? rule.a : num(String(rule.expr).replace(/x/g, `(${out[n - 2]})`)));
    else out.push(ruleTerm(rule, n));
  }
  return out;
}
const PATTERN = {
  triangle: (n) => Array.from({ length: n }, (_, r) => Array.from({ length: r + 1 }, (_, c) => [c - r / 2, r])).flat(),
  square: (n) => Array.from({ length: n * n }, (_, i) => [(i % n) - (n - 1) / 2, Math.floor(i / n)]),
  oblong: (n) => Array.from({ length: n * (n + 1) }, (_, i) => [(i % (n + 1)) - n / 2, Math.floor(i / (n + 1))]),
  odd: (n) => [...Array.from({ length: n }, (_, i) => [-(n - 1) / 2, i]), ...Array.from({ length: n - 1 }, (_, i) => [-(n - 1) / 2 + i + 1, n - 1])],
};
function sequence(spec, W, narrow) {
  const t = spec.terms, n = t.length + (spec.more ? 1 : 0), pad = narrow ? 14 : 24, gap = narrow ? 8 : 14;
  const bw = Math.min(92, (W - 2 * pad - gap * (n - 1)) / n), start = spec.start ?? 1;
  const pat = spec.pattern && PATTERN[spec.pattern], patH = pat ? (narrow ? 84 : 104) : 0;
  const yB = 34 + patH, bh = 44;
  let s = "";
  const x0 = (W - (n * bw + (n - 1) * gap)) / 2, cx = (i) => x0 + i * (bw + gap) + bw / 2;
  if (pat) {
    const big = Math.max(...t.map((_, i) => { const d = pat(i + start); return Math.max(...d.map((p) => p[1])) + 1; }));
    const wide = Math.max(...t.map((_, i) => { const d = pat(i + start); return Math.max(...d.map((p) => p[0])) - Math.min(...d.map((p) => p[0])) + 1; }));
    const st = Math.min((patH - 16) / big, (bw - 6) / wide, 16), r = Math.max(2.2, Math.min(5.5, st * 0.36));
    t.forEach((_, i) => { for (const [px, py] of pat(i + start)) s += `<circle cx="${f1(cx(i) + px * st)}" cy="${f1(yB - 14 - (big - 1 - py) * st)}" r="${f1(r)}" fill="${col("a1")}"/>`; });
  }
  t.forEach((v, i) => {
    s += rect(cx(i) - bw / 2, yB, bw, bh, { fill: C.panel, stroke: col("a1"), sw: 2, rx: 8 });
    s += text(cx(i), yB + bh / 2, fmt(v), { size: narrow ? 15 : 17, weight: 700 });
    s += text(cx(i), yB + bh + 16, `n = ${i + start}`, { size: 12, fill: C.soft });
  });
  if (spec.more) s += text(cx(t.length), yB + bh / 2, "…", { size: 20, weight: 700, fill: C.soft });
  let y = yB + bh + 38;
  const row = (vals, label) => {
    vals.forEach((v, i) => { const xa = cx(i), xb = cx(i + 1); s += `<path d="M${f1(xa + 4)} ${f1(y - 8)} Q${f1((xa + xb) / 2)} ${f1(y + 8)} ${f1(xb - 4)} ${f1(y - 8)}" fill="none" stroke="${col("a2")}" stroke-width="1.8"/>` + text((xa + xb) / 2, y + 16, label(v), { size: 13, weight: 700, fill: col("a2") }); });
    y += 34;
  };
  const d1 = t.slice(1).map((v, i) => v - t[i]);
  if (spec.show === "differences" || spec.show === "second") row(d1, signed);
  if (spec.show === "second") { const d2 = d1.slice(1).map((v, i) => v - d1[i]), shift = (bw + gap) / 2; d2.forEach((v, i) => { const xa = cx(i) + shift, xb = cx(i + 1) + shift; s += `<path d="M${f1(xa + 4)} ${f1(y - 8)} Q${f1((xa + xb) / 2)} ${f1(y + 8)} ${f1(xb - 4)} ${f1(y - 8)}" fill="none" stroke="${col("a3")}" stroke-width="1.8"/>` + text((xa + xb) / 2, y + 16, signed(v), { size: 13, weight: 700, fill: col("a3") }); }); y += 34; }
  if (spec.show === "ratios") row(t.slice(1).map((v, i) => v / t[i]), (r) => `×${fmt(r)}`);
  if (spec.ruleText) { s += text(W / 2, y + 6, minus(spec.ruleText), { size: 14, weight: 600, fill: C.ink }); y += 26; }
  return { s, H: y + 4 };
}
function sequenceChecks(spec) {
  const out = [], t = spec.terms, start = spec.start ?? 1, R = spec.rule;
  const want = R.kind === "fibonacci" || R.kind === "recurrence" ? ruleTerms(R, t.length + start - 1).slice(start - 1) : t.map((_, i) => ruleTerm(R, i + start));
  const bad = t.map((v, i) => (near(v, want[i], 1e-9) ? null : `n = ${i + start}: drawn ${v}, rule gives ${fmt(want[i], 6)}`)).filter(Boolean);
  out.push(check(`every term follows the rule (${R.kind}${R.expr ? ` ${R.expr}` : ""})`, !bad.length, bad.join("; ") || want.map((v) => fmt(v)).join(", ")));
  if (spec.pattern) { const bad2 = t.map((v, i) => (PATTERN[spec.pattern](i + start).length === v ? null : `figure ${i + start} has ${PATTERN[spec.pattern](i + start).length} dots, term ${v}`)).filter(Boolean); out.push(check(`each ${spec.pattern} figure has exactly the term's dots`, !bad2.length, bad2.join("; "))); }
  const term = (n) => (R.kind === "fibonacci" || R.kind === "recurrence" ? ruleTerms(R, n)[n - 1] : ruleTerm(R, n));
  for (const k of spec.checks || []) {
    if (k.type === "nth") { const v = term(k.n); out.push(check(k.name || `term ${k.n} is ${k.value}`, near(v, num(k.value), 1e-9), fmt(v, 6))); }
    else if (k.type === "sum") { let s = 0; for (let n = 1; n <= k.n; n++) s += term(n); out.push(check(k.name || `the first ${k.n} terms sum to ${k.value}`, near(s, num(k.value), 1e-9), fmt(s, 6))); }
  }
  return out;
}

// ======================================================================== factor-tree
// spec: tree: {n, children: [{n, children?}, …]}, result: "2^2 × 3 × 5" (shown under the tree)
function layoutTree(node, depth = 0, acc = { leaves: 0, nodes: [], depth: 0 }) {
  const me = { n: node.n, depth, kids: [] };
  acc.depth = Math.max(acc.depth, depth);
  if (node.children?.length) { for (const c of node.children) me.kids.push(layoutTree(c, depth + 1, acc).me); me.x = sum(me.kids.map((k) => k.x)) / me.kids.length; }
  else me.x = acc.leaves++ + 0.5;
  acc.nodes.push(me);
  return { me, acc };
}
function factorTree(spec, W, narrow) {
  const { me: root, acc } = layoutTree(spec.tree), dy = narrow ? 62 : 70, pad = 24;
  const X = (u) => pad + (u / acc.leaves) * (W - 2 * pad), Y = (d) => 34 + d * dy;
  let s = "";
  for (const nd of acc.nodes) for (const k of nd.kids) s += line(X(nd.x), Y(nd.depth) + 16, X(k.x), Y(k.depth) - 18, { stroke: C.line, w: 2 });
  for (const nd of acc.nodes) {
    const p = !nd.kids.length;
    if (p) s += `<circle cx="${f1(X(nd.x))}" cy="${f1(Y(nd.depth))}" r="18" fill="${col("a4")}" fill-opacity=".14" stroke="${col("a4")}" stroke-width="2.2"/>`;
    s += text(X(nd.x), Y(nd.depth), fmt(nd.n), { size: 17, weight: 700, fill: p ? col("a4") : C.ink });
  }
  let H = Y(acc.depth) + 30;
  if (spec.result) { s += text(W / 2, H + 8, `${fmt(spec.tree.n)} = ${spec.result.replace(/\*/g, "×")}`, { size: 16, weight: 700, fill: col("a1") }); H += 34; }
  return { s, H };
}
function factorTreeChecks(spec) {
  const bad = [], leaves = [];
  const walk = (nd) => {
    if (!nd.children?.length) { leaves.push(nd.n); if (!isPrime(nd.n)) bad.push(`${nd.n} is a leaf but not prime`); return; }
    const p = nd.children.reduce((a, c) => a * c.n, 1);
    if (p !== nd.n) bad.push(`${nd.children.map((c) => c.n).join(" × ")} = ${p}, not ${nd.n}`);
    if (nd.children.some((c) => c.n === 1)) bad.push(`${nd.n} splits off a factor 1`);
    nd.children.forEach(walk);
  };
  walk(spec.tree);
  const out = [check("every branch multiplies to the number above it, and every leaf is prime", !bad.length, bad.join("; ") || `leaves ${leaves.join(", ")}`)];
  if (spec.result) { const f = readFactorisation(spec.result), L = [...leaves].sort((a, b) => a - b); out.push(check(`${spec.tree.n} = ${spec.result}`, f.join() === L.join() && f.reduce((a, b) => a * b, 1) === spec.tree.n, `leaves ${L.join(" × ")}`)); }
  return out;
}

// ======================================================================== bar-model
// spec: bars: [{label?, cells: n, shaded: k | [indices], scale?, cellText?: true} | {label?, parts: [{value, text?, colour?, shade?}]}],
//   prefix/suffix (for part values, e.g. "£"), braces: [{bar, from, to, value, text?, above?}],
//   checks: [{type: "fraction", bar, value} | {type: "equivalent", bars: [i, j]} | {type: "order", bars} | {type: "ratio", bar, ratio, total}
//   | {type: "percent", of, percent, value} | {type: "multiplier", from, percent, to}]
const shadedOf = (b) => (Array.isArray(b.shaded) ? b.shaded : Array.from({ length: b.shaded || 0 }, (_, i) => i));
function barFraction(b) {
  if (b.cells) return frac({ n: shadedOf(b).length, d: b.cells });
  const tot = sum(b.parts.map((p) => p.value)), sh = sum(b.parts.filter((p) => p.shade).map((p) => p.value));
  return fdiv(frac(sh), frac(tot));
}
function barModel(spec, W, narrow) {
  const bars = spec.bars, labelW = narrow ? 0 : Math.min(150, Math.max(0, ...bars.map((b) => (b.label ? b.label.length * 8 + 14 : 0)))), pad = narrow ? 14 : 22;
  const full = W - 2 * pad - labelW, bh = 46, maxTot = Math.max(...bars.map((b) => (b.parts ? sum(b.parts.map((p) => p.value)) : 0)));
  const fmtv = (v) => `${spec.prefix || ""}${fmt(v)}${spec.suffix || ""}`;
  let s = "", y = 18;
  const geom = [], warn = [];
  bars.forEach((b, i) => {
    const braceAbove = (spec.braces || []).some((r) => r.bar === i && r.above);
    if (braceAbove) y += 40;
    if (narrow && b.label) { s += text(pad, y + 8, b.label, { size: 13.5, weight: 700, anchor: "start" }); y += 24; }
    else if (b.label) s += text(pad + labelW - 12, y + bh / 2, b.label, { size: 13.5, weight: 700, anchor: "end" });
    const x0 = pad + labelW, cells = [];
    if (b.cells) {
      const w = full * (b.scale ?? 1), sh = new Set(shadedOf(b));
      for (let c = 0; c < b.cells; c++) {
        const cx = x0 + (c * w) / b.cells, cw = w / b.cells; cells.push([cx, cw]);
        s += rect(cx, y, cw, bh, { fill: sh.has(c) ? col(b.colour || "a1") : C.panel, op: sh.has(c) ? 0.75 : 1, stroke: C.ink, sw: 1.6 });
        if (b.cellText) s += text(cx + cw / 2, y + bh / 2, `1/${b.cells}`, { size: 12.5, weight: 700, fill: sh.has(c) ? "#fff" : C.ink });
      }
    } else {
      const tot = sum(b.parts.map((p) => p.value)), w = full * (b.scale ?? tot / maxTot);
      let cx = x0;
      for (const p of b.parts) {
        const cw = (p.value / tot) * w; cells.push([cx, cw]);
        s += rect(cx, y, cw, bh, { fill: col(p.colour || (p.shade ? "a1" : "panel")), op: p.shade || p.colour ? 0.7 : 1, stroke: C.ink, sw: 1.6 });
        const t = p.text ?? fmtv(p.value);
        if (t && t.length * 13.5 * 0.6 + 6 > cw) warn.push(`"${t}" does not fit its ${f1(cw)}px part`);
        if (t) s += text(cx + cw / 2, y + bh / 2, t, { size: 13.5, weight: 700, fill: p.shade || p.colour ? "#fff" : C.ink });
        cx += cw;
      }
    }
    geom[i] = { y, cells };
    y += bh + ((spec.braces || []).some((r) => r.bar === i && !r.above) ? 52 : 18);
  });
  for (const r of spec.braces || []) {
    const g = geom[r.bar], xa = g.cells[r.from][0], xb = g.cells[r.to][0] + g.cells[r.to][1], up = !!r.above;
    const yb = up ? g.y - 8 : g.y + 46 + 8, h = up ? -10 : 10, m = (xa + xb) / 2;
    s += `<path d="M${f1(xa + 2)} ${f1(yb)} q0 ${h} 10 ${h} L${f1(m - 8)} ${f1(yb + h)} q8 0 8 ${h} q0 ${-h} 8 ${-h} L${f1(xb - 12)} ${f1(yb + h)} q10 0 10 ${-h}" fill="none" stroke="${col("a2")}" stroke-width="2"/>`;
    s += text(m, yb + h * 2 + (up ? -8 : 10), r.text ?? fmtv(r.value), { size: 14, weight: 700, fill: col("a2") });
  }
  return { s, H: y + 2, warn };
}
function barModelChecks(spec) {
  const out = [], bars = spec.bars;
  for (const r of spec.braces || []) {
    const b = bars[r.bar];
    if (b.parts) { const v = sum(b.parts.slice(r.from, r.to + 1).map((p) => p.value)); out.push(check(`the bracket over ${r.from + 1}–${r.to + 1} is ${fmt(r.value)}`, near(v, r.value, 1e-9), `parts add to ${fmt(v)}`)); }
    if (r.text) out.push(check(`the bracket label "${r.text}" states ${fmt(r.value)}`, r.text.replace(/,/g, "").includes(fmt(r.value).replace(/,/g, "")), r.text));
  }
  for (const k of spec.checks || []) {
    if (k.type === "fraction") { const f = barFraction(bars[k.bar]); out.push(check(k.name || `bar ${k.bar + 1} shows ${k.value}`, feq(f, k.value), `shaded ${fstr(f)}`)); }
    else if (k.type === "order") { const f = k.bars.map((i) => fval(barFraction(bars[i]))); out.push(check(k.name || `${k.bars.map((i) => fstr(barFraction(bars[i]))).join(" < ")}`, f.every((x, i) => !i || x > f[i - 1]), f.map((x) => fmt(x, 4)).join(", "))); }
    else if (k.type === "equivalent") { const [f, g] = k.bars.map((i) => barFraction(bars[i])); out.push(check(k.name || `${fstr(f)} = ${fstr(g)}`, feq(f, g), `${fstr(f)} and ${fstr(g)}`)); }
    else if (k.type === "ratio") {
      const b = bars[k.bar], R = sum(k.ratio), want = k.ratio.map((r) => (k.total * r) / R), got = b.parts.map((p) => p.value);
      out.push(check(k.name || `${k.ratio.join(" : ")} of ${fmt(k.total)} is ${want.map((v) => fmt(v)).join(" and ")}`, got.length === want.length && got.every((v, i) => near(v, want[i], 1e-9)), `parts ${got.join(", ")}`));
    } else if (k.type === "percent") { const v = (num(k.of) * num(k.percent)) / 100; out.push(check(k.name || `${k.percent}% of ${k.of} = ${k.value}`, near(v, num(k.value), 1e-9), fmt(v, 6))); }
    else if (k.type === "multiplier") { const v = num(k.from) * (1 + num(k.percent) / 100); out.push(check(k.name || `${k.from} changed by ${k.percent}% is ${k.to}`, near(v, num(k.to), 1e-9), `${k.from} × ${fmt(1 + num(k.percent) / 100, 6)} = ${fmt(v, 6)}`)); }
  }
  return out;
}

// ======================================================================== venn
// spec: sets: [{name: "A", label}], (2 or 3; names one capital letter each), universe: {label?, n?},
//   regions: {"A": 5, "AB": 3, "B": 4, "": 2} counts, or items: {"A": ["2", "2"], "AB": ["3"], …} members,
//   nested: [{name, label, kind: "natural"|"integer"|"rational"|"real", items: [{text, expr?}]}] (innermost first),
//   checks: [{type: "count", event, n} | {type: "prob", event, given?, p} | {type: "total", n} | {type: "product", event, value}]
// Events: set names with ∩ (or &), ∪ (or |), ′ (or ') for the complement, brackets.
export function eventPredicate(expr) {
  const toks = String(expr).replace(/\s+/g, "").match(/[A-Z]|[∩&∪|′'()ξ]/g) || [];
  let i = 0;
  const atom = () => { const t = toks[i++]; if (t === "(") { const e = union(); i++; return e; } if (t === "ξ") return () => true; if (/^[A-Z]$/.test(t)) return (k) => k.includes(t); throw new Error(`cannot read event ${expr}`); };
  const factor = () => { let e = atom(); while (toks[i] === "′" || toks[i] === "'") { const f = e; e = (k) => !f(k); i++; } return e; };
  const inter = () => { let e = factor(); while (toks[i] === "∩" || toks[i] === "&") { i++; const a = e, b = factor(); e = (k) => a(k) && b(k); } return e; };
  const union = () => { let e = inter(); while (toks[i] === "∪" || toks[i] === "|") { i++; const a = e, b = inter(); e = (k) => a(k) || b(k); } return e; };
  const e = union(); if (i !== toks.length) throw new Error(`cannot read event ${expr}`);
  return e;
}
const regionKeys = (names) => { const out = []; for (let m = 0; m < 1 << names.length; m++) out.push(names.filter((_, i) => m & (1 << i)).join("")); return out; };
function isRational(x) { for (let q = 1; q <= 1000; q++) if (Math.abs(x * q - Math.round(x * q)) < 1e-9 * q) return true; return false; }
const KIND = { natural: (x, z) => Number.isInteger(x) && x >= (z ? 0 : 1), integer: (x) => Number.isInteger(x), rational: isRational, real: Number.isFinite };
function vennNested(spec, W, narrow) {
  const L = spec.nested, pad = 10, band = narrow ? 44 : 50, top = 12;
  const H = top + L.length * band + 30 + (narrow ? 40 : 30);
  let s = "";
  for (let i = L.length - 1; i >= 0; i--) {
    const k = L.length - 1 - i, x = pad + k * (narrow ? 14 : 26), y = top + k * band, w = W - 2 * x, h = H - 2 * top - k * band - k * 12;
    const c = col(["a1", "a4", "a5", "a2", "a3"][i % 5]);
    s += rect(x, y, w, h, { fill: c, op: 0.06, stroke: c, sw: 2, rx: 18 });
    s += text(x + 14, y + 20, L[i].label, { size: 14, weight: 700, anchor: "start", fill: c });
    const inner = i > 0;
    const items = L[i].items || [];
    // members sit on the band's title row (to the right of the title) for outer sets, centred for the innermost
    const ty = inner ? y + 20 : y + 50, startX = inner ? x + 14 + L[i].label.length * 8.6 + 22 : x + w / 2;
    const gapX = narrow ? 34 : 48;
    items.forEach((it, j) => { s += text(inner ? startX + j * gapX : startX + (j - (items.length - 1) / 2) * gapX, ty, it.text, { size: 14, weight: 600, anchor: inner ? "start" : "middle" }); });
  }
  return { s, H };
}
function venn(spec, W, narrow) {
  if (spec.nested) return vennNested(spec, W, narrow);
  const S = spec.sets, three = S.length === 3, pad = 12;
  const H = three ? (narrow ? 380 : 400) : narrow ? 260 : 290;
  const r = three ? Math.min(W * (narrow ? 0.24 : 0.17), 112, (H - 2 * pad - 60) / 2.6) : Math.min(W * (narrow ? 0.27 : 0.2), 118, (H - 2 * pad - 70) / 2);
  const cx = W / 2, cy = three ? H / 2 + 8 : H / 2 + 6, d = r * 0.62;
  const C3 = three ? [[cx - d, cy - d * 0.55], [cx + d, cy - d * 0.55], [cx, cy + d * 0.62]] : [[cx - d, cy], [cx + d, cy]];
  let s = rect(pad, pad, W - 2 * pad, H - 2 * pad, { fill: C.panel, stroke: C.ink, sw: 1.8, rx: 6 });
  s += text(pad + 12, H - pad - 14, spec.universe?.label ?? "ξ", { size: 14, weight: 700, anchor: "start" });
  const tones = ["a1", "a2", "a4"];
  S.forEach((st, i) => { const [x, y] = C3[i]; s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${col(tones[i])}" fill-opacity=".1" stroke="${col(tones[i])}" stroke-width="2.4"/>`; });
  S.forEach((st, i) => { const [x, y] = C3[i]; const lx = three ? (i === 0 ? x - r * 0.72 : i === 1 ? x + r * 0.72 : x + r * 0.95) : i === 0 ? x - r * 0.62 : x + r * 0.62; const ly = three ? (i < 2 ? y - r - 10 : y + r * 0.7) : y - r - 12; s += text(lx, ly, st.label ?? st.name, { size: 14, weight: 700, fill: col(tones[i]), anchor: three && i === 2 ? "start" : "middle" }); });
  // a point in each region: away from the other circles' centres
  const names = S.map((x) => x.name), pos = {};
  for (const key of regionKeys(names)) {
    if (!key) { pos[""] = [W - pad - 26, pad + 22]; continue; }
    const ins = names.map((n) => key.includes(n));
    let px = 0, py = 0, m = 0; ins.forEach((v, i) => { if (v) { px += C3[i][0]; py += C3[i][1]; m++; } }); px /= m; py /= m;
    if (m < names.length) { let ox = 0, oy = 0; ins.forEach((v, i) => { if (!v) { ox += C3[i][0]; oy += C3[i][1]; } }); const k = names.length - m; ox /= k; oy /= k; const L = Math.hypot(px - ox, py - oy) || 1; const push = m === 1 ? r * (three ? 0.5 : 0.45) : three ? r * 0.12 : 0; px += ((px - ox) / L) * push; py += ((py - oy) / L) * push; }
    else if (three) py += 2;
    pos[key] = [px, py];
  }
  const canon = (k) => names.filter((n) => k.includes(n)).join("");
  if (spec.regions) for (const [k, v] of Object.entries(spec.regions)) { const [x, y] = pos[canon(k)]; s += text(x, y, fmt(v), { size: 17, weight: 700 }); }
  if (spec.items) for (const [k, v] of Object.entries(spec.items)) {
    const [x, y] = pos[canon(k)], per = 2, rows = Math.ceil(v.length / per);
    v.forEach((it, j) => { const rw = Math.floor(j / per), inRow = Math.min(per, v.length - rw * per), c = j % per; s += text(x + (c - (inRow - 1) / 2) * 26, y + (rw - (rows - 1) / 2) * 22, it, { size: 15, weight: 700 }); });
  }
  return { s, H };
}
function vennChecks(spec) {
  const out = [];
  if (spec.nested) {
    const L = spec.nested, bad = [];
    L.forEach((lv, i) => { for (const it of lv.items || []) { const x = num(it.expr ?? it.text); if (!KIND[lv.kind](x, spec.zeroNatural)) bad.push(`${it.text} is not ${lv.kind}`); if (i && KIND[L[i - 1].kind](x, spec.zeroNatural)) bad.push(`${it.text} belongs in ${L[i - 1].label}`); } });
    out.push(check("every member is in its set and in no smaller one", !bad.length, bad.join("; ") || `${L.reduce((n, l) => n + (l.items || []).length, 0)} members checked`));
    return out;
  }
  const names = spec.sets.map((x) => x.name), canon = (k) => names.filter((n) => k.includes(n)).join("");
  const R = {}; for (const k of regionKeys(names)) R[k] = 0;
  if (spec.regions) for (const [k, v] of Object.entries(spec.regions)) R[canon(k)] = v;
  const items = {}; if (spec.items) for (const [k, v] of Object.entries(spec.items)) items[canon(k)] = v;
  const count = (ev) => { const p = eventPredicate(ev); return sum(Object.entries(R).filter(([k]) => p(k)).map(([, v]) => v)); };
  const total = sum(Object.values(R));
  if (spec.universe?.n != null) out.push(check(`the regions add up to ${spec.universe.n}`, total === spec.universe.n, `total ${total}`));
  for (const k of spec.checks || []) {
    if (k.type === "count") { const n = count(k.event); out.push(check(k.name || `n(${k.event}) = ${k.n}`, n === k.n, `counted ${n}`)); }
    else if (k.type === "total") out.push(check(k.name || `${k.n} in total`, total === k.n, `total ${total}`));
    else if (k.type === "prob") {
      const top = k.given ? count(`(${k.event})∩(${k.given})`) : count(k.event), bot = k.given ? count(k.given) : total, f = frac({ n: top, d: bot });
      out.push(check(k.name || `P(${k.event}${k.given ? ` | ${k.given}` : ""}) = ${k.p}`, feq(f, k.p), `${top}/${bot} = ${fstr(f)}`));
    } else if (k.type === "product") {
      const p = eventPredicate(k.event), v = Object.entries(items).filter(([key]) => p(key)).flatMap(([, x]) => x).reduce((a, b) => a * num(b), 1);
      out.push(check(k.name || `the product of the members of ${k.event} is ${k.value}`, near(v, num(k.value), 1e-9), `product ${fmt(v)}`));
    } else if (k.type === "members") {
      // each set's members multiply to the stated number (the prime factors of 12 in A, of 18 in B)
      const p = eventPredicate(k.event), v = Object.entries(items).filter(([key]) => p(key)).flatMap(([, x]) => x);
      out.push(check(k.name || `${k.event} holds the prime factors of ${k.of}`, v.every((x) => isPrime(num(x))) && v.reduce((a, b) => a * num(b), 1) === k.of, v.join(" × ")));
    }
  }
  return out;
}

// ======================================================================== prob-tree
// spec: tree: {children: [{label, p: "3/7" | 0.3, children?}]}, stages?: ["First pick", "Second pick"], decimal?: true,
//   outcomes: true (list each path and its probability), checks: [{type: "outcome", path: ["R", "B"], p} | {type: "event", paths: [[…]], p}]
function treeLeaves(node, path = [], p = frac(1), out = []) {
  if (!node.children?.length) { out.push({ path, p }); return out; }
  for (const c of node.children) treeLeaves(c, [...path, c.label], fmul(p, frac(c.p)), out);
  return out;
}
function probTree(spec, W, narrow) {
  const leaves = treeLeaves(spec.tree), depth = Math.max(...leaves.map((l) => l.path.length)), rowH = narrow ? 40 : 44;
  const head = spec.stages ? 30 : 8, outW = spec.outcomes ? (narrow ? 112 : 190) : 0, pad = 16;
  const colW = (W - 2 * pad - outW - 20) / depth, H = head + leaves.length * rowH + 12;
  let s = "", leaf = 0;
  const P = (v) => (spec.decimal ? fmt(fval(frac(v)), 4) : fstr(frac(v)));
  const place = (node, d) => {
    if (!node.children?.length) { node._y = head + (leaf++ + 0.5) * rowH; return node._y; }
    const ys = node.children.map((c) => place(c, d + 1)); node._y = (ys[0] + ys.at(-1)) / 2; return node._y;
  };
  place(spec.tree, 0);
  if (spec.stages) spec.stages.forEach((t, i) => { s += text(pad + 20 + (i + 0.62) * colW, 14, t, { size: 13, weight: 700, fill: C.soft }); });
  const draw = (node, d) => {
    const x0 = pad + 8 + d * colW + (d ? 16 : 0), y0 = node._y;
    if (!d) s += `<circle cx="${f1(x0)}" cy="${f1(y0)}" r="4" fill="${C.ink}"/>`;
    for (const c of node.children || []) {
      const x1 = pad + 8 + (d + 1) * colW, y1 = c._y;
      s += line(x0 + 4, y0, x1 - 4, y1, { stroke: C.line, w: 2 });
      const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, up = y1 < y0;
      s += text(mx - (narrow ? 2 : 6), my + (up ? -11 : 13), P(c.p), { size: 13, weight: 700, fill: col("a1"), anchor: "end" });
      s += text(x1 + 2, y1, c.label, { size: 14, weight: 700, anchor: "start" });
      draw(c, d + 1);
    }
  };
  draw(spec.tree, 0);
  if (spec.outcomes) {
    leaves.forEach((l, i) => { const y = head + (i + 0.5) * rowH; s += text(W - pad, y, `${narrow ? "" : `P(${l.path.join(", ")}) = `}${spec.decimal ? fmt(fval(l.p), 4) : fstr(l.p)}`, { size: 13, weight: 600, anchor: "end", fill: col("a2") }); });
  }
  return { s, H };
}
function probTreeChecks(spec) {
  const out = [], bad = [];
  const walk = (node, path) => { if (!node.children?.length) return; const t = node.children.reduce((a, c) => fadd(a, frac(c.p)), frac(0)); if (!feq(t, 1)) bad.push(`after ${path.join(", ") || "the start"}: ${fstr(t)}`); for (const c of node.children) walk(c, [...path, c.label]); };
  walk(spec.tree, []);
  out.push(check("the branches from every point add up to 1", !bad.length, bad.join("; ")));
  const leaves = treeLeaves(spec.tree), find = (p) => leaves.find((l) => l.path.join("|") === p.join("|"));
  for (const k of spec.checks || []) {
    if (k.type === "outcome") { const l = find(k.path); out.push(check(k.name || `P(${k.path.join(", ")}) = ${k.p}`, !!l && feq(l.p, k.p), l ? `multiplied: ${fstr(l.p)}` : "no such path")); }
    else if (k.type === "event") { const ls = k.paths.map(find); const t = ls.reduce((a, l) => (l ? fadd(a, l.p) : a), frac(0)); out.push(check(k.name || `P = ${k.p}`, ls.every(Boolean) && feq(t, k.p), `added: ${fstr(t)}`)); }
  }
  return out;
}

register({
  "number-line": entry(numberLine, numberLineChecks, [680, 380]),
  sequence: entry(sequence, sequenceChecks, [680, 380]),
  "factor-tree": entry(factorTree, factorTreeChecks, [560, 380]),
  "bar-model": entry(barModel, barModelChecks, [680, 380]),
  venn: entry(venn, vennChecks, [620, 380]),
  "prob-tree": entry(probTree, probTreeChecks, [680, 380]),
});
export { treeLeaves, barFraction, ruleTerms, isRational };
