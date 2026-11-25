// Gradify Visual Learning Engine: the renderers for everything except chemistry structures (scripts/diagrams/chem.py).
// Each renderer takes a diagram spec (kit/diagrams/specs/*.json) and returns
//   { wide, narrow, checks: [{ name, ok, detail }] }
// `wide` is laid out for a desktop column and `narrow` for a phone, so text stays at about its drawn size on both.
// The checks recompute the subject itself (the image of an object through a lens, an equilibrium, a transformed
// point, which barrier is highest) and compare it with what the spec, and so the lesson, claims. A diagram that
// draws correctly but says something false fails its checks and is not published (scripts/diagrams/build.mjs).
//
// Colours are CSS custom properties with fallbacks, so a diagram follows the site's light and dark themes when it
// is inline in a lesson and still renders on its own. The design language is set out in docs/VISUAL-LEARNING-ENGINE.md.

const C = {
  ink: "var(--vx-ink, #151826)", soft: "var(--vx-soft, #5b6275)", line: "var(--vx-line, #8a92a8)",
  grid: "var(--vx-grid, #e6e8f0)", panel: "var(--vx-panel, #f4f5fb)",
  a1: "var(--vx-a1, #4f46e5)", a2: "var(--vx-a2, #db2777)", a3: "var(--vx-a3, #ea580c)", a4: "var(--vx-a4, #0d9488)",
  a5: "var(--vx-a5, #7c3aed)", good: "var(--vx-good, #16a34a)", bad: "var(--vx-bad, #dc2626)",
};
export const COLOURS = C;
// the diagram card's colour, painted under a label so a line crossing it does not cut the letters
const HALO = "var(--vx-card, #fff)";
const col = (k) => C[k] || k;
const f1 = (n) => (+n).toFixed(1);
import { esc } from "../core/text.js";
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b));
const check = (name, ok, detail = "") => ({ name, ok: !!ok, detail });

// ---------- drawing primitives ----------
function svg(W, H, alt, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f1(W)} ${f1(H)}" width="${f1(W)}" height="${f1(H)}" role="img" aria-label="${esc(alt)}" style="color:${C.ink};font-family:inherit;max-width:100%;height:auto">${body}</svg>`;
}
function text(x, y, s, { size = 14, weight = 500, anchor = "middle", fill = C.ink, italic = false, baseline = "middle", halo = false } = {}) {
  // sub/superscripts written x_{0} and x^{2}
  const parts = String(s).split(/([_^]\{[^}]*\})/).map((p) => {
    const m = p.match(/^([_^])\{([^}]*)\}$/);
    return m ? `<tspan baseline-shift="${m[1] === "^" ? "super" : "sub"}" font-size="${f1(size * 0.72)}">${esc(m[2])}</tspan>` : esc(p);
  }).join("");
  return `<text x="${f1(x)}" y="${f1(y)}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" dominant-baseline="${baseline}" fill="${fill}"${italic ? ' font-style="italic"' : ""}${halo ? ` stroke="${HALO}" stroke-width="4" stroke-linejoin="round" paint-order="stroke"` : ""}>${parts}</text>`;
}
function line(x1, y1, x2, y2, { stroke = C.ink, w = 2, dash = "", cap = "round" } = {}) {
  return `<path d="M${f1(x1)} ${f1(y1)} L${f1(x2)} ${f1(y2)}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="${cap}"${dash ? ` stroke-dasharray="${dash}"` : ""} fill="none"/>`;
}
// a straight arrow with a solid head; `head` px long
function arrow(x1, y1, x2, y2, { stroke = C.ink, w = 2.4, head = 11, dash = "", both = false } = {}) {
  const L = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / L, uy = (y2 - y1) / L;
  const hd = (x, y, sx, sy) => { const bx = x - sx * head, by = y - sy * head, k = head * 0.46; return `<path d="M${f1(x)} ${f1(y)} L${f1(bx - sy * k)} ${f1(by + sx * k)} L${f1(bx + sy * k)} ${f1(by - sx * k)} Z" fill="${stroke}"/>`; };
  const s0 = both ? head * 0.9 : 0;
  return line(x1 + ux * s0, y1 + uy * s0, x2 - ux * head * 0.9, y2 - uy * head * 0.9, { stroke, w, dash }) + hd(x2, y2, ux, uy) + (both ? hd(x1, y1, -ux, -uy) : "");
}
// rough width of a label in px (sub/superscript markup removed), to keep labels inside the picture
const textWidth = (s, size) => String(s ?? "").replace(/[_^]\{([^}]*)\}/g, (_, t) => t.slice(0, Math.ceil(t.length * 0.7))).length * size * 0.56;
const pathOf = (pts) => pts.map(([x, y], i) => `${i ? "L" : "M"}${f1(x)} ${f1(y)}`).join(" ");
function legend(items, x, y, { size = 13, gap = 22 } = {}) {
  return items.map(([label, colour, dash], i) => line(x, y + i * gap, x + 26, y + i * gap, { stroke: col(colour), w: 3, dash }) + text(x + 34, y + i * gap, label, { size, anchor: "start" })).join("");
}
function wrap(s, n) {
  const out = [""];
  for (const w of String(s).split(" ")) { const t = out.at(-1) ? `${out.at(-1)} ${w}` : w; if (t.length > n && out.at(-1)) out.push(w); else out[out.length - 1] = t; }
  return out;
}
function textBlock(x, y, s, n, opts = {}) {
  const size = opts.size || 14, lh = size * 1.28, ls = wrap(s, n);
  return { svg: ls.map((l, i) => text(x, y + i * lh - ((ls.length - 1) * lh) / 2, l, opts)).join(""), lines: ls.length, h: ls.length * lh };
}

// ---------- a safe expression compiler for graph specs ----------
// numbers, x, + - * / ^ ( ), and a short list of functions; nothing else reaches Function()
const FN = ["sin", "cos", "tan", "asin", "exp", "log", "sqrt", "abs"];
export function compile(expr) {
  const src = String(expr).replace(/\s+/g, "");
  const tokens = src.match(/[0-9.]+|[a-z]+|[-+*/^()]/g) || [];
  if (tokens.join("") !== src) throw new Error(`unsupported characters in ${expr}`);
  for (const t of tokens) if (/^[a-z]+$/.test(t) && t !== "x" && !FN.includes(t)) throw new Error(`unknown name ${t} in ${expr}`);
  // a unary minus becomes "-1*", so "-(a)^2" means -(a²) instead of being a JavaScript syntax error
  const js = tokens.map((t, i) => (FN.includes(t) ? `Math.${t}` : t === "^" ? "**" : t === "-" && (i === 0 || /^[-+*/^(]$/.test(tokens[i - 1])) ? "-1*" : t)).join("");
  return new Function("x", `return (${js});`); // eslint-disable-line no-new-func
}

// ---------- axes for graphs ----------
function axes(spec, W, H, pad) {
  const { x: [x0, x1], y: [y0, y1] } = spec.range;
  const sx = (x) => pad.l + ((x - x0) / (x1 - x0)) * (W - pad.l - pad.r);
  const sy = (y) => H - pad.b - ((y - y0) / (y1 - y0)) * (H - pad.t - pad.b);
  let s = "";
  const step = spec.grid || [];
  if (step.length) {
    for (let x = Math.ceil(x0 / step[0]) * step[0]; x <= x1 + 1e-9; x += step[0]) s += line(sx(x), sy(y0), sx(x), sy(y1), { stroke: C.grid, w: 1 });
    for (let y = Math.ceil(y0 / step[1]) * step[1]; y <= y1 + 1e-9; y += step[1]) s += line(sx(x0), sy(y), sx(x1), sy(y), { stroke: C.grid, w: 1 });
  }
  const ax = Math.min(Math.max(0, y0), y1), ay = Math.min(Math.max(0, x0), x1);
  s += arrow(sx(x0), sy(ax), sx(x1) + 8, sy(ax), { stroke: C.ink, w: 1.6, head: 8 });
  s += arrow(sx(ay), sy(y0), sx(ay), sy(y1) - 8, { stroke: C.ink, w: 1.6, head: 8 });
  const ticks = spec.ticks || [];
  if (ticks[0]) for (const t of ticks[0]) s += line(sx(t), sy(ax) - 4, sx(t), sy(ax) + 4, { stroke: C.ink, w: 1.4 }) + text(sx(t), sy(ax) + 17, String(t), { size: 12, fill: C.soft });
  if (ticks[1]) for (const t of ticks[1]) s += line(sx(ay) - 4, sy(t), sx(ay) + 4, sy(t), { stroke: C.ink, w: 1.4 }) + text(sx(ay) - 9, sy(t), String(t), { size: 12, fill: C.soft, anchor: "end" });
  const [lx, ly] = spec.axisLabels || ["x", "y"];
  // below the axis means below the plot when the x-axis runs through the middle (y = 0 inside the range), where the
  // curves are
  s += text(W - pad.r + 2, spec.xLabelBelow ? Math.max(sy(ax) + 36, sy(y0) + 24) : sy(ax) - 14, lx, { size: 13, weight: 600, anchor: "end", fill: C.soft });
  // a y-axis at the right-hand edge (every x negative) takes its title on its left, or the title runs off the edge
  const yRight = sx(ay) + 10 + textWidth(ly, 13) > W;
  s += text(sx(ay) + (yRight ? -10 : 10), pad.t - 14, ly, { size: 13, weight: 600, anchor: yRight ? "end" : "start", fill: C.soft });
  return { s, sx, sy };
}

// ---------- graph: curves, lines, points and annotations ----------
// spec: range, ticks, grid, axisLabels, curves: [{expr, colour, dash, label, domain}], points: [{x, y, label, of}],
// marks: [{x | y, label}], checks: [{type: "point", expr, x, y} | {type: "root"...}]
function graph(spec, W, H) {
  // Chemistry graphs (and any spec with labelHalo) draw their labels after every line, each on a halo, so a curve
  // or mark drawn later never cuts through a label. Other subjects' approved graphs are drawn exactly as before.
  const halo = spec.labelHalo ?? String(spec.id || "").startsWith("chem-");
  let late = "";
  // they are also kept inside the picture: a label that would run past an edge slides back in
  const inside = (x, str, o) => { const w = textWidth(str, o.size || 14), a = o.anchor || "middle", lo = a === "start" ? x : a === "end" ? x - w : x - w / 2;
    return x + Math.max(0, 4 - lo) - Math.max(0, lo + w - (W - 4)); };
  const L = (x, y, str, o) => (halo ? ((late += text(inside(x, str, o), y, str, { ...o, halo: true })), "") : text(x, y, str, o));
  const pad = { l: 52, r: 24, t: 40, b: spec.xLabelBelow ? 58 : 40 };
  const { s: base, sx, sy } = axes(spec, W, H, pad);
  let s = base;
  const { x: [x0, x1], y: [y0, y1] } = spec.range;
  const clipId = `vx${Math.abs([...String(spec.id ?? JSON.stringify(spec))].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7))}${W}`;
  s += `<defs><clipPath id="${clipId}"><rect x="${f1(sx(x0))}" y="${f1(sy(y1))}" width="${f1(sx(x1) - sx(x0))}" height="${f1(sy(y0) - sy(y1))}"/></clipPath></defs>`;
  for (const m of spec.bands || []) s += `<rect x="${f1(sx(m.x[0]))}" y="${f1(sy(y1))}" width="${f1(sx(m.x[1]) - sx(m.x[0]))}" height="${f1(sy(y0) - sy(y1))}" fill="${col(m.colour || "a1")}" fill-opacity=".08"/>` + L((sx(m.x[0]) + sx(m.x[1])) / 2, sy(y0) - 12, m.label, { size: 12, weight: 600, fill: C.soft });
  for (const m of spec.marks || []) {
    if (m.x != null) s += line(sx(m.x), sy(y0), sx(m.x), sy(m.to ?? y1), { stroke: C.line, w: 1.4, dash: "5 5" }) + (m.label ? L(sx(m.x) + (m.dx || 0), sy(m.to ?? y1) - 10, m.label, { size: 12, fill: C.soft }) : "");
    if (m.y != null) s += line(sx(x0), sy(m.y), sx(m.to ?? x1), sy(m.y), { stroke: C.line, w: 1.4, dash: "5 5" }) + (m.label ? L(sx(x0) + 6, sy(m.y) - 10, m.label, { size: 12, fill: C.soft, anchor: "start" }) : "");
  }
  // shaded areas under a curve between two x values (a Maxwell–Boltzmann tail beyond Ea)
  for (const a of spec.areas || []) {
    const f = compile(a.expr), pts = [];
    for (let i = 0; i <= 120; i++) { const x = a.from + ((a.to - a.from) * i) / 120; pts.push([sx(x), sy(Math.max(y0, Math.min(y1, f(x))))]); }
    s += `<path d="M${f1(sx(a.from))} ${f1(sy(Math.max(y0, 0)))} ${pts.map(([x, y]) => `L${f1(x)} ${f1(y)}`).join(" ")} L${f1(sx(a.to))} ${f1(sy(Math.max(y0, 0)))} Z" fill="${col(a.colour || "a2")}" fill-opacity="${a.opacity ?? 0.22}" clip-path="url(#${clipId})"/>`;
  }
  // plotted data (measured points joined by straight lines)
  for (const sr of spec.series || []) {
    s += `<path d="${pathOf(sr.points.map(([x, y]) => [sx(x), sy(y)]))}" fill="none" stroke="${col(sr.colour || "a1")}" stroke-width="${sr.width || 2.6}" stroke-linejoin="round"${sr.dash ? ` stroke-dasharray="${sr.dash}"` : ""} clip-path="url(#${clipId})"/>`;
    if (sr.dots) for (const [x, y] of sr.points) s += `<circle cx="${f1(sx(x))}" cy="${f1(sy(y))}" r="3.5" fill="${col(sr.colour || "a1")}"/>`;
    if (sr.label) { const [lx, ly] = sr.labelAt || sr.points.at(-1); s += L(sx(lx) + 6, sy(ly), sr.label, { size: 12.5, weight: 700, anchor: sr.anchor || "start", fill: col(sr.colour || "a1") }); }
  }
  for (const c of spec.curves || []) {
    const f = compile(c.expr), [d0, d1] = c.domain || [x0, x1], pts = [];
    const N = c.samples || 240;
    for (let i = 0; i <= N; i++) { const x = d0 + ((d1 - d0) * i) / N, y = f(x); if (Number.isFinite(y) && y > y0 - (y1 - y0) && y < y1 + (y1 - y0)) pts.push([sx(x), sy(y)]); }
    s += `<path d="${pathOf(pts)}" fill="none" stroke="${col(c.colour || "a1")}" stroke-width="${c.width || 3}" stroke-linecap="round" stroke-linejoin="round"${c.dash ? ` stroke-dasharray="${c.dash}"` : ""} clip-path="url(#${clipId})"/>`;
    if (c.label) { const [lx, ly] = c.labelAt; s += L(sx(lx), sy(ly), c.label, { size: 13, weight: 700, fill: col(c.colour || "a1"), anchor: c.anchor || "start" }); }
  }
  for (const a of spec.arrows || []) s += arrow(sx(a.from[0]), sy(a.from[1]), sx(a.to[0]), sy(a.to[1]), { stroke: col(a.colour || "ink"), w: 2, head: 9, dash: a.dash || "", both: !!a.both }) + (a.label ? (a.labelAt ? L(sx(a.labelAt[0]), sy(a.labelAt[1]), a.label, { size: 12.5, weight: 600, anchor: a.anchor || "start", fill: col(a.colour || "ink") }) : L((sx(a.from[0]) + sx(a.to[0])) / 2 + (a.dx || 0), (sy(a.from[1]) + sy(a.to[1])) / 2 + (a.dy || -12), a.label, { size: 12.5, weight: 600, fill: col(a.colour || "ink") })) : "");
  for (const p of spec.points || []) {
    s += `<circle cx="${f1(sx(p.x))}" cy="${f1(sy(p.y))}" r="5" fill="${col(p.colour || "ink")}" stroke="${C.panel}" stroke-width="2"/>`;
    if (p.label) s += L(sx(p.x) + (p.dx ?? 10), sy(p.y) + (p.dy ?? -12), p.label, { size: 13, weight: 600, anchor: p.anchor || "start", fill: col(p.colour || "ink") });
  }
  s += late;
  if (spec.legend) s += legend(spec.legend, spec.legendData ? sx(spec.legendData[0]) : spec.legendAt?.[0] ?? pad.l + 14, spec.legendData ? sy(spec.legendData[1]) : spec.legendAt?.[1] ?? pad.t + 10);
  return s;
}

function graphChecks(spec) {
  const out = [];
  for (const k of spec.checks || []) {
    if (k.type === "point") {
      const y = compile(k.expr)(k.x);
      out.push(check(k.name || `(${k.x}, ${k.y}) lies on y = ${k.expr}`, near(y, k.y, 1e-3), `y(${k.x}) = ${+y.toFixed(4)}`));
    } else if (k.type === "intersect") {
      // two curves cross at the stated point (supply and demand, written as functions of the horizontal axis)
      const a = compile(k.a)(k.x), b = compile(k.b)(k.x);
      out.push(check(k.name || `curves meet at (${k.x}, ${k.y})`, near(a, k.y, 1e-3) && near(b, k.y, 1e-3), `${k.a} → ${+a.toFixed(3)}, ${k.b} → ${+b.toFixed(3)}`));
    } else if (k.type === "max") {
      // the maximum of a curve on a domain is at the stated point
      const f = compile(k.expr); let bx = k.domain[0], by = -Infinity;
      for (let i = 0; i <= 20000; i++) { const x = k.domain[0] + ((k.domain[1] - k.domain[0]) * i) / 20000, y = f(x); if (y > by) { by = y; bx = x; } }
      out.push(check(k.name || `maximum of ${k.expr} is at (${k.x}, ${k.y})`, Math.abs(bx - k.x) < 1e-2 && near(by, k.y, 1e-3), `found (${+bx.toFixed(3)}, ${+by.toFixed(3)})`));
    } else if (k.type === "min") {
      const f = compile(k.expr); let bx = k.domain[0], by = Infinity;
      for (let i = 0; i <= 20000; i++) { const x = k.domain[0] + ((k.domain[1] - k.domain[0]) * i) / 20000, y = f(x); if (y < by) { by = y; bx = x; } }
      out.push(check(k.name || `minimum of ${k.expr} is at x = ${k.x}`, Math.abs(bx - k.x) <= (k.tol ?? 1e-2) && (k.y == null || near(by, k.y, 1e-3)), `found (${+bx.toFixed(3)}, ${+by.toFixed(4)})`));
    } else if (k.type === "area") {
      // the area under a curve between two limits (a normalised distribution has area 1)
      const f = compile(k.expr), n = 20000, h = (k.to - k.from) / n; let a = 0;
      for (let i = 0; i < n; i++) a += f(k.from + (i + 0.5) * h) * h;
      out.push(check(k.name, Math.abs(a - k.value) <= (k.tol ?? 0.005), `area ${a.toFixed(4)}`));
    } else if (k.type === "tail") {
      // which curve, or which threshold, leaves more area beyond it: the fraction of molecules with E ≥ Ea
      const area = (e, from) => { const f = compile(e), n = 20000, h = (k.to - from) / n; let a = 0; for (let i = 0; i < n; i++) a += f(from + (i + 0.5) * h) * h; return a; };
      const A = area(k.a, k.fromA ?? k.from), B = area(k.b ?? k.a, k.fromB ?? k.from);
      out.push(check(k.name, A > B * (k.factor || 1), `${A.toFixed(4)} against ${B.toFixed(4)} (×${(A / B).toFixed(2)})`));
    } else if (k.type === "stats") {
      // repeated measurements: accurate if the mean is close to the true value, precise if the spread is small
      const v = k.values, m = v.reduce((a, b) => a + b, 0) / v.length, sd = Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / (v.length - 1));
      out.push(check(k.name, (Math.abs(m - k.truth) <= k.tolMean) === k.accurate && (sd <= k.tolSd) === k.precise, `mean ${m.toFixed(3)}, standard deviation ${sd.toFixed(3)}`));
    } else if (k.type === "haberYield") {
      // N2 + 3H2 ⇌ 2NH3 from a 1:3 feed: solve Kp for the extent at each pressure and compare with the plotted % NH3
      const bad = [];
      for (const [P, y] of k.points) {
        const f = (x) => { const n = 4 - 2 * x, yN = (1 - x) / n, yH = (3 * (1 - x)) / n, yA = (2 * x) / n; return (yA * yA) / (yN * yH ** 3 * P * P) - k.Kp; };
        let lo = 0, hi = 1 - 1e-12; for (let i = 0; i < 100; i++) { const m = (lo + hi) / 2; if (f(m) > 0) hi = m; else lo = m; }
        const pct = (100 * 2 * lo) / (4 - 2 * lo); if (Math.abs(pct - y) > 0.05) bad.push(`${P} bar: plotted ${y}, solved ${pct.toFixed(2)}`);
      }
      out.push(check(k.name, !bad.length, bad.join("; ") || `${k.points.length} points match Kp = ${k.Kp.toExponential(2)} bar⁻²`));
    } else if (k.type === "slope") {
      const f = compile(k.expr), d = (f(k.x + 1e-5) - f(k.x - 1e-5)) / 2e-5;
      out.push(check(k.name || `gradient of ${k.expr} at x = ${k.x} is ${k.value}`, near(d, k.value, 1e-3), `gradient ${d.toFixed(4)}`));
    } else if (k.type === "value") {
      const y = compile(k.expr)(k.x);
      out.push(check(k.name, y >= k.between[0] && y <= k.between[1], `${k.expr} at ${k.x} = ${+y.toFixed(2)}; expected ${k.between[0]}–${k.between[1]}`));
    } else if (k.type === "order") {
      // curve a lies to the right of / below curve b at a given y (used for the Bohr shift)
      const a = compile(k.a)(k.x), b = compile(k.b)(k.x);
      out.push(check(k.name, k.rel === "<" ? a < b : a > b, `${+a.toFixed(2)} ${k.rel} ${+b.toFixed(2)}`));
    }
  }
  return out;
}

// ---------- energy profile ----------
// points: [{x, e, kind: "start" | "ts" | "int" | "end", label}], one panel per profile; half-cosine segments between
// extremes, so every transition state is a smooth maximum and every intermediate a smooth minimum
function profilePanel(p, x, y, w, h, opt) {
  const es = p.points.map((q) => q.e), lo = Math.min(...es) - 24, hi = Math.max(...es) + 18;
  const X = (t) => x + 34 + (0.1 + t * 0.8) * (w - 52), Y = (e) => y + h - 30 - ((e - lo) / (hi - lo)) * (h - 70);
  let s = arrow(x + 18, y + h - 30, x + 18, y + 26, { w: 1.6, head: 8 }) + arrow(x + 18, y + h - 30, x + w - 6, y + h - 30, { w: 1.6, head: 8 });
  s += text(x + 4, y + (h - 4) / 2, "energy", { size: 12, fill: C.soft, anchor: "middle" }).replace("<text", `<text transform="rotate(-90 ${f1(x + 4)} ${f1(y + (h - 4) / 2)})"`);
  s += text(x + w - 6, y + h - 12, "reaction progress", { size: 12, fill: C.soft, anchor: "end" });
  s += text(x + w / 2, y + 8, p.title, { size: 15, weight: 700 });
  const pts = [];
  for (let i = 0; i < p.points.length - 1; i++) {
    const a = p.points[i], b = p.points[i + 1];
    for (let k = 0; k <= 40; k++) { const t = k / 40, u = (1 - Math.cos(Math.PI * t)) / 2; pts.push([X(a.x + (b.x - a.x) * t), Y(a.e + (b.e - a.e) * u)]); }
  }
  const first = p.points[0], last = p.points.at(-1);
  pts.unshift([X(first.x) - 0.1 * (w - 52), Y(first.e)]); pts.push([X(last.x) + 0.08 * (w - 52), Y(last.e)]);
  s += `<path d="${pathOf(pts)}" fill="none" stroke="${col(p.colour || "a1")}" stroke-width="3.2" stroke-linejoin="round"/>`;
  const start = p.points[0];
  s += line(X(start.x) - 6, Y(start.e), X(p.points.at(-1).x) + 6, Y(start.e), { stroke: C.line, w: 1.2, dash: "4 4" });
  for (const q of p.points) {
    const lab = q.kind === "ts" ? `${q.label || "TS"} ‡` : q.label;
    const ly = q.kind === "ts" ? -14 : q.kind === "int" ? 18 : 17, lx = q.kind === "start" ? -0.1 * (w - 52) : q.kind === "end" ? 0.08 * (w - 52) : 0;
    if (lab) s += text(X(q.x) + lx, Y(q.e) + ly, lab, { size: 12.5, weight: q.kind === "int" ? 700 : 600, anchor: q.kind === "start" ? "start" : q.kind === "end" ? "end" : "middle", fill: q.kind === "ts" ? C.ink : col(q.kind === "int" ? "a3" : "soft") });
    if (q.kind === "int") s += `<circle cx="${f1(X(q.x))}" cy="${f1(Y(q.e))}" r="4.5" fill="${C.a3}"/>`;
  }
  for (const ea of p.ea || []) {
    const ts = p.points[ea.to], fromE = p.points[ea.from].e, xx = X(ts.x) + (ea.dx ?? 0);
    s += line(X(p.points[ea.from].x), Y(fromE), xx + 4, Y(fromE), { stroke: C.line, w: 1, dash: "2 3" });
    s += arrow(xx, Y(fromE), xx, Y(ts.e) + 3, { stroke: col(ea.colour || "a2"), w: 1.8, head: 7, both: false });
    s += text(xx + (ea.anchor === "start" ? 9 : -9), (Y(fromE) + Y(ts.e)) / 2 + 22, ea.label, { size: 12.5, weight: 700, anchor: ea.anchor || "end", fill: col(ea.colour || "a2") });
  }
  return s;
}
function energyProfile(spec, W, narrow) {
  const n = spec.profiles.length, ph = narrow ? 300 : 320;
  const pw = narrow ? W - 20 : (W - 20 - (n - 1) * 24) / n;
  let s = "";
  spec.profiles.forEach((p, i) => { const x = narrow ? 10 : 10 + i * (pw + 24), y = narrow ? 10 + i * (ph + 20) : 10; s += profilePanel(p, x, y, pw, ph); });
  return { s, H: narrow ? n * (ph + 20) + 10 : ph + 20 };
}
function profileChecks(spec) {
  const out = [];
  for (const p of spec.profiles) {
    const P = p.points;
    P.forEach((q, i) => {
      if (q.kind === "ts") out.push(check(`${p.title}: ${q.label || "transition state"} is a maximum`, P[i - 1].e < q.e && P[i + 1].e < q.e));
      if (q.kind === "int") out.push(check(`${p.title}: ${q.label} is a minimum between two maxima`, P[i - 1].e > q.e && P[i + 1].e > q.e && P[i - 1].kind === "ts" && P[i + 1].kind === "ts"));
    });
    const ts = P.map((q, i) => [q, i]).filter(([q]) => q.kind === "ts");
    out.push(check(`${p.title}: ${ts.length} transition state(s), ${P.filter((q) => q.kind === "int").length} intermediate(s), as stated`, ts.length === p.expect.ts && P.filter((q) => q.kind === "int").length === p.expect.int));
    if (p.expect.rds != null) {
      const top = ts.reduce((a, b) => (b[0].e > a[0].e ? b : a));
      out.push(check(`${p.title}: the highest transition state is step ${p.expect.rds}, the rate-determining step`, ts.indexOf(top) + 1 === p.expect.rds));
    }
    if (p.expect.dh) { const dh = P.at(-1).e - P[0].e; out.push(check(`${p.title}: overall ${p.expect.dh}`, p.expect.dh === "exothermic" ? dh < 0 : dh > 0, `ΔH ${dh}`)); }
    for (const ea of p.ea || []) out.push(check(`${p.title}: "${ea.label}" arrow spans from a minimum to a maximum`, P[ea.to].kind === "ts" && P[ea.to].e > P[ea.from].e));
  }
  return out;
}

// ---------- free-body diagram on a slope ----------
// spec: angle (degrees), forces: [{name, label, dir: "down" | "normal" | "downslope" | "upslope" | "horizontal-in" , mag}]
function freeBody(spec, W, H) {
  const th = (spec.angle * Math.PI) / 180, base = { x: 40, y: H - 46 }, L = W - 90;
  const top = { x: base.x + L, y: base.y - L * Math.tan(th) };
  let s = `<path d="M${f1(base.x)} ${f1(base.y)} L${f1(top.x)} ${f1(base.y)} L${f1(top.x)} ${f1(top.y)} Z" fill="${C.panel}" stroke="${C.ink}" stroke-width="2"/>`;
  // hatching under the ground line
  for (let x = base.x; x < top.x; x += 14) s += line(x, base.y + 2, x - 8, base.y + 10, { stroke: C.line, w: 1.2 });
  const ar = 34; s += `<path d="M${f1(base.x + ar)} ${f1(base.y)} A${ar} ${ar} 0 0 0 ${f1(base.x + ar * Math.cos(th))} ${f1(base.y - ar * Math.sin(th))}" fill="none" stroke="${C.ink}" stroke-width="1.6"/>` + text(base.x + ar + 14, base.y - 10, "θ", { size: 15, italic: true });
  // the block: a square sitting on the slope at 58% of the way up
  const t = 0.56, cx0 = base.x + L * t, cy0 = base.y - L * t * Math.tan(th), side = Math.min(70, W * 0.13);
  const ux = Math.cos(th), uy = -Math.sin(th), nx = -Math.sin(th), ny = -Math.cos(th); // along the slope (up) and the outward normal, in screen coords
  const P = (a, b) => [cx0 + ux * a + nx * b, cy0 + uy * a + ny * b];
  const corners = [P(-side / 2, 0), P(side / 2, 0), P(side / 2, side), P(-side / 2, side)];
  s += `<path d="${pathOf(corners)} Z" fill="${C.panel}" stroke="${C.ink}" stroke-width="2.2"/>`;
  const [gx, gy] = P(0, side / 2);
  s += `<circle cx="${f1(gx)}" cy="${f1(gy)}" r="3.5" fill="${C.ink}"/>`;
  const dirs = { down: [0, 1], normal: [nx, ny], downslope: [-ux, -uy], upslope: [ux, uy], "horizontal-in": [1, 0] };
  for (const f of spec.forces) {
    const [dx, dy] = dirs[f.dir], len = f.len || 78;
    // weight from the centre of mass; contact forces from the contact face; a push drawn arriving at the block
    let x0 = gx, y0 = gy;
    if (f.dir === "normal") [x0, y0] = P(f.offset ?? 10, 0);
    if (f.dir === "downslope" || f.dir === "upslope") [x0, y0] = P(0, 0);
    if (f.dir === "horizontal-in") { const [ex, ey] = P(-side / 2, side / 2); s += arrow(ex - len - 4, ey, ex - 4, ey, { stroke: col(f.colour), w: 3.2 }) + text(ex - len / 2 - 4, ey - 14, f.label, { size: 15, weight: 700, fill: col(f.colour), italic: true }); continue; }
    const x1 = x0 + dx * len, y1 = y0 + dy * len;
    s += arrow(x0, y0, x1, y1, { stroke: col(f.colour), w: 3.2 });
    s += text(x1 + dx * 16 + (f.lx || 0), y1 + dy * 16 + (f.ly || 0), f.label, { size: 15, weight: 700, fill: col(f.colour), italic: true });
  }
  if (spec.note) { const nb = textBlock(16, 0, spec.note, Math.floor((W - 32) / 6.6), { size: 12.5, fill: C.soft, anchor: "start" }); s += `<g transform="translate(0 ${f1(16 + nb.h / 2)})">${nb.svg}</g>`; }
  return s;
}
function freeBodyChecks(spec) {
  const th = (spec.angle * Math.PI) / 180, out = [];
  const dir = { down: [0, -1], normal: [-Math.sin(th), Math.cos(th)], downslope: [-Math.cos(th), -Math.sin(th)], upslope: [Math.cos(th), Math.sin(th)], "horizontal-in": [1, 0] };
  const n = dir.normal, sl = dir.upslope;
  out.push(check("normal force is perpendicular to the slope", near(n[0] * sl[0] + n[1] * sl[1], 0, 1e-9)));
  out.push(check("every force has a stated source", spec.forces.every((f) => f.source), spec.forces.map((f) => `${f.label}: ${f.source}`).join("; ")));
  if (spec.verify) {
    // resolve perpendicular to the slope with no acceleration in that direction: N = mg cos θ + P sin θ
    const { m, g, P } = spec.verify, W_ = m * g;
    const comp = (f, mag) => mag * (dir[f.dir][0] * n[0] + dir[f.dir][1] * n[1]);
    const sum = spec.forces.filter((f) => f.dir !== "normal").reduce((s, f) => s + comp(f, f.name === "weight" ? W_ : f.name === "push" ? P : 0), 0);
    const N = -sum, claim = W_ * Math.cos(th) + P * Math.sin(th);
    out.push(check("resolving perpendicular to the slope gives N = mg cos θ + P sin θ", near(N, claim, 1e-9), `m = ${m} kg, P = ${P} N, θ = ${spec.angle}°: N = ${N.toFixed(2)} N from components, ${claim.toFixed(2)} N from the formula`));
    out.push(check("the horizontal push presses the block into the slope (it adds to N)", P * Math.sin(th) > 0));
  }
  return out;
}

// ---------- ray diagram for a thin converging lens ----------
// spec: f, u (object distance, both in cm), h (object height), panels for several objects
function rayPanel(p, x, y, w, h, f) {
  const u = p.u, v = 1 / (1 / f - 1 / u), m = -v / u, ho = p.h, hi = m * ho;
  const xs = [-u, v, -2 * f, 2 * f, -f, f].filter(Number.isFinite);
  const span = Math.max(...xs.map(Math.abs)) * 1.15, scale = (w / 2 - 16) / span;
  const hmax = Math.max(ho, Math.abs(hi), 1) * 1.25, vs = (h / 2 - 34) / hmax;
  const X = (d) => x + w / 2 + d * scale, Y = (k) => y + h / 2 - k * vs;
  const clip = `vxr${Math.round(x)}${Math.round(y)}${Math.round(w)}`;
  let s = text(x + w / 2, y + 12, p.title, { size: 15, weight: 700 }) + `<defs><clipPath id="${clip}"><rect x="${f1(x)}" y="${f1(y + 24)}" width="${f1(w)}" height="${f1(h - 48)}"/></clipPath></defs><g clip-path="url(#${clip})">`;
  s += line(x + 6, Y(0), x + w - 6, Y(0), { stroke: C.line, w: 1.2 });
  // the lens: a thin double-headed line
  const lh = hmax * vs * 0.98;
  s += arrow(X(0), Y(0) + lh, X(0), Y(0) - lh, { stroke: C.a4, w: 2.4, head: 9, both: true });
  for (const [d, lab] of [[-f, "F"], [f, "F"], [-2 * f, "2F"], [2 * f, "2F"]]) if (Math.abs(d) * scale < w / 2 - 8) { const clash = Math.abs(d - v) * scale < 10; s += `<circle cx="${f1(X(d))}" cy="${f1(Y(0))}" r="3" fill="${C.ink}"/>` + text(X(d) + (clash ? -8 : 0), Y(0) + (clash && hi > 0 ? 16 : clash ? -10 : 16), lab, { size: 12.5, weight: 600, fill: C.soft, anchor: clash ? "end" : "middle" }); }
  // object
  s += arrow(X(-u), Y(0), X(-u), Y(ho), { stroke: C.a1, w: 3.2, head: 10 })  + "</g>" + text(X(-u), Y(0) + 32, "object", { size: 12.5, weight: 600, fill: C.a1 }) + `<g clip-path="url(#${clip})">`;
  const real = v > 0;
  const ray = (pts, dashedFrom) => pts.slice(0, -1).map((pt, i) => line(X(pt[0]), Y(pt[1]), X(pts[i + 1][0]), Y(pts[i + 1][1]), { stroke: C.a3, w: 2, dash: i >= dashedFrom ? "6 5" : "" })).join("");
  const far = (span * 0.98);
  // ray 1: parallel to the axis, then through F on the far side
  const r1slope = -ho / f, r1 = [[-u, ho], [0, ho], [far, ho + r1slope * far]];
  // ray 2: through the centre, undeviated
  const r2slope = -ho / u, r2 = [[-u, ho], [0, 0], [far, r2slope * far]];
  s += ray(r1) + ray(r2);
  // small arrowheads to show direction
  for (const [a, b] of [[r1[1], r1[2]], [r2[0], r2[1]]]) { const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = (b[0] - a[0]) * scale, dy = -(b[1] - a[1]) * vs, L = Math.hypot(dx, dy); s += arrow(X(mx) - (dx / L) * 6, Y(my) - (dy / L) * 6, X(mx) + (dx / L) * 6, Y(my) + (dy / L) * 6, { stroke: C.a3, w: 2, head: 9 }); }
  if (u > f) {
    // ray 3: through the near F, then parallel
    const k = ho / (u - f); const yl = ho - k * u; // height at the lens
    s += ray([[-u, ho], [0, yl], [far, yl]]);
  } else {
    // virtual image: extend the emerging rays back as dashed construction lines
    s += line(X(0), Y(ho), X(v), Y(hi), { stroke: C.a3, w: 1.6, dash: "6 5" }) + line(X(0), Y(0), X(v), Y(hi), { stroke: C.a3, w: 1.6, dash: "6 5" });
  }
  s += arrow(X(v), Y(0), X(v), Y(hi), { stroke: C.a2, w: 3.2, head: 10, dash: real ? "" : "7 5" });
  const edge = X(v) > x + w - 46 ? "end" : real ? "start" : X(v) < x + 46 ? "start" : "middle";
  const imgLabel = text(X(v) + (edge === "end" ? -8 : edge === "start" ? 8 : 0), Y(hi) + (hi < 0 ? 30 : -14), real ? "real image" : "virtual image", { size: 12.5, weight: 600, fill: C.a2, anchor: edge });
  s += "</g>" + imgLabel + text(x + w / 2, y + h - 10, p.result, { size: 12.5, fill: C.soft });
  return s;
}
function rayChecks(spec) {
  const out = [], f = spec.f;
  for (const p of spec.panels) {
    const v = 1 / (1 / f - 1 / p.u), m = -v / p.u, hi = m * p.h;
    // where rays 1 and 2 meet, found by intersecting the two lines (not from the lens equation)
    const s1 = -p.h / f, s2 = -p.h / p.u, xi = (p.h - 0) / (s2 - s1), yi = s2 * xi;
    out.push(check(`${p.title}: the drawn rays meet where the lens equation puts the image`, near(xi, v, 1e-6) && near(yi, hi, 1e-6), `rays meet at ${xi.toFixed(2)} cm, ${yi.toFixed(2)}; 1/v = 1/f − 1/u gives v = ${v.toFixed(2)} cm, m = ${m.toFixed(2)}`));
    const real = v > 0, inverted = m < 0, size = Math.abs(m) > 1.001 ? "magnified" : Math.abs(m) < 0.999 ? "diminished" : "same size";
    out.push(check(`${p.title}: stated as ${p.expect}`, p.expect === `${real ? "real" : "virtual"}, ${inverted ? "inverted" : "upright"}, ${size}`, `computed: ${real ? "real" : "virtual"}, ${inverted ? "inverted" : "upright"}, ${size}`));
  }
  return out;
}
function rays(spec, W, narrow) {
  const n = spec.panels.length, ph = narrow ? 260 : 290, pw = narrow ? W - 20 : (W - 20 - (n - 1) * 20) / n;
  let s = "";
  spec.panels.forEach((p, i) => { s += rayPanel(p, narrow ? 10 : 10 + i * (pw + 20), narrow ? 10 + i * (ph + 16) : 10, pw, ph, spec.f); });
  return { s, H: narrow ? n * (ph + 16) + 10 : ph + 20 };
}

// ---------- a single-loop circuit ----------
// spec.components round a rectangle, clockwise from the top-left: {type: "cell" | "resistor", label, emf, R, plus: "left"|"right"}
function cellSym(x, y, plusLeft) {
  const g = 7; // long plate is +, short plate is −
  const [lp, sp] = plusLeft ? [x - g, x + g] : [x + g, x - g];
  return line(lp, y - 17, lp, y + 17, { w: 2.6 }) + line(sp, y - 9, sp, y + 9, { w: 5, cap: "butt" }) + text(lp + (plusLeft ? -8 : 8), y - 22, "+", { size: 14, weight: 700 }) + text(sp + (plusLeft ? 9 : -9), y - 22, "−", { size: 14, weight: 700 });
}
function circuit(spec, W, H, narrow) {
  const x0 = 50, x1 = W - 50, y0 = 70, y1 = H - 60;
  let s = "";
  const top = spec.components.filter((c) => c.side === "top"), bottom = spec.components.filter((c) => c.side === "bottom");
  const slots = (list, y) => list.map((c, i) => ({ c, x: x0 + ((i + 1) * (x1 - x0)) / (list.length + 1), y }));
  const placed = [...slots(top, y0), ...slots(bottom, y1)];
  // wires with gaps where components sit
  const wireRow = (y, ps) => { let xs = x0, out = ""; for (const p of ps.sort((a, b) => a.x - b.x)) { const half = p.c.type === "cell" ? 9 : 34; out += line(xs, y, p.x - half, y); xs = p.x + half; } return out + line(xs, y, x1, y); };
  s += wireRow(y0, placed.filter((p) => p.y === y0)) + wireRow(y1, placed.filter((p) => p.y === y1)) + line(x0, y0, x0, y1) + line(x1, y0, x1, y1);
  for (const p of placed) {
    if (p.c.type === "cell") s += cellSym(p.x, p.y, p.c.plus === "left") + text(p.x, p.y + 34, p.c.label, { size: 14, weight: 700, fill: C.a1 });
    else s += `<rect x="${f1(p.x - 34)}" y="${f1(p.y - 11)}" width="68" height="22" rx="2" fill="${C.panel}" stroke="${C.ink}" stroke-width="2.2"/>` + text(p.x, p.y + 32, p.c.label, { size: 14, weight: 700, fill: C.a4 });
  }
  // current: arrows on the side wires, in the direction the net EMF drives
  const sol = solveLoop(spec), cw = sol.I > 0;
  const ym = (y0 + y1) / 2;
  s += arrow(x1, ym + (cw ? -16 : 16), x1, ym + (cw ? 16 : -16), { stroke: C.a2, w: 3, head: 11 });
  s += arrow(x0, ym + (cw ? 16 : -16), x0, ym + (cw ? -16 : 16), { stroke: C.a2, w: 3, head: 11 });
  s += text(x1 - 12, ym, `I = ${Math.abs(sol.I)} A`, { size: 14, weight: 700, fill: C.a2, anchor: "end" });
  if (spec.note) s += textBlock(W / 2, ym, spec.note, narrow ? 28 : 44, { size: 12.5, fill: C.soft }).svg;
  return s;
}
// one loop: take clockwise as positive; a cell whose + plate faces the clockwise direction drives clockwise
function solveLoop(spec) {
  let emf = 0, R = 0;
  for (const c of spec.components) {
    if (c.type === "cell") { const plusAhead = (c.side === "top" && c.plus === "right") || (c.side === "bottom" && c.plus === "left"); emf += plusAhead ? c.emf : -c.emf; }
    else R += c.R;
  }
  return { emf, R, I: emf / R };
}
function circuitChecks(spec) {
  const sol = solveLoop(spec), out = [];
  out.push(check("loop law: net EMF = I × total resistance", near(sol.I * sol.R, sol.emf), `net EMF ${Math.abs(sol.emf)} V, R ${sol.R} Ω, I = ${Math.abs(sol.I)} A`));
  if (spec.expect) {
    out.push(check(`current is ${spec.expect.I} A, as the worked example says`, near(Math.abs(sol.I), spec.expect.I)));
    const driver = spec.components.filter((c) => c.type === "cell").reduce((a, b) => (b.emf > a.emf ? b : a));
    out.push(check(`the ${driver.label} cell drives the current`, spec.expect.driver === driver.label));
  }
  return out;
}

// ---------- decision tree (law tests, clinical escalation, classification) ----------
// spec.nodes: {id: {q, yes, no, cite} | {outcome, tone: "good" | "bad" | "warn", cite}}; spec.start
function tree(spec, W, narrow) {
  const N = spec.nodes, out = [];
  // the "yes" path runs down the main column; each "no" leads to an outcome beside its question (wide) or tucked
  // under it, with the "yes" connector running down the right-hand edge past it (narrow)
  let y = 20;
  const boxW = narrow ? W - 40 : Math.min(400, W * 0.56), mainX = narrow ? 20 : 30, sideX = mainX + boxW + 60, sideW = W - sideX - 20;
  const tone = (t) => ({ good: C.good, bad: C.bad, warn: C.a3, neutral: C.a4 })[t] || C.a1;
  let id = spec.start, guard = 0;
  while (id && guard++ < 20) {
    const n = N[id];
    if (n.outcome) {
      const b = textBlock(mainX + boxW / 2, 0, n.outcome, narrow ? 34 : 46, { size: 14, weight: 700, fill: tone(n.tone) }), h = b.h + 22 + (n.cite ? 18 : 0);
      out.push(`<rect x="${f1(mainX)}" y="${f1(y)}" width="${f1(boxW)}" height="${f1(h)}" rx="14" fill="${tone(n.tone)}" fill-opacity=".1" stroke="${tone(n.tone)}" stroke-width="2"/><g transform="translate(0 ${f1(y + (h - (n.cite ? 18 : 0)) / 2)})">${b.svg}</g>`);
      if (n.cite) out.push(text(mainX + boxW / 2, y + h - 14, n.cite, { size: 12, fill: C.soft, italic: true }));
      y += h + 10; break;
    }
    const qb = textBlock(mainX + boxW / 2, 0, n.q, narrow ? 36 : 46, { size: 14, weight: 600 }), h = qb.h + (n.cite ? 36 : 22);
    const no = N[n.no];
    const noText = no ? (no.outcome || no.q) + (no.cite ? ` (${no.cite})` : "") : "";
    const nb = no && textBlock(0, 0, noText, narrow ? 32 : Math.max(18, Math.floor(sideW / 7.6)), { size: 13, weight: 700, fill: tone(no.tone) });
    if (no && !narrow) y += Math.max(0, (nb.h + 18 - h) / 2); // room above for a tall side box
    out.push(`<rect x="${f1(mainX)}" y="${f1(y)}" width="${f1(boxW)}" height="${f1(h)}" rx="14" fill="${C.panel}" stroke="${C.a1}" stroke-width="2"/><g transform="translate(0 ${f1(y + (n.cite ? h / 2 - 8 : h / 2))})">${qb.svg}</g>`);
    if (n.cite) out.push(text(mainX + boxW / 2, y + h - 13, n.cite, { size: 12, fill: C.soft, italic: true }));
    let below = y + h;
    if (no && !narrow) {
      const nh = nb.h + 18, cx = sideX + sideW / 2;
      out.push(arrow(mainX + boxW, y + h / 2, sideX - 2, y + h / 2, { stroke: tone(no.tone), w: 2, head: 9 }) + text((mainX + boxW + sideX) / 2, y + h / 2 - 11, "no", { size: 12.5, weight: 700, fill: tone(no.tone) }));
      out.push(`<rect x="${f1(sideX)}" y="${f1(y + h / 2 - nh / 2)}" width="${f1(sideW)}" height="${f1(nh)}" rx="12" fill="${tone(no.tone)}" fill-opacity=".1" stroke="${tone(no.tone)}" stroke-width="1.8"/><g transform="translate(${f1(cx)} ${f1(y + h / 2)})">${nb.svg}</g>`);
      below = Math.max(below, y + h / 2 + nh / 2 - 10);
    } else if (no) {
      // phone: the "no" box sits under the question on the left; "yes" runs down the right edge, past it
      const bx = mainX + 22, bw = boxW - 70, nh = nb.h + 30, by = y + h + 12, cx = bx + bw / 2;
      const nb2 = textBlock(cx, 0, noText, Math.floor(bw / 7.4), { size: 13, weight: 700, fill: tone(no.tone) });
      const nh2 = nb2.h + 30;
      out.push(line(mainX + 10, y + h, mainX + 10, by + 16, { stroke: tone(no.tone), w: 1.8 }) + arrow(mainX + 10, by + 16, bx - 1, by + 16, { stroke: tone(no.tone), w: 1.8, head: 7 }));
      out.push(`<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(bw)}" height="${f1(nh2)}" rx="10" fill="${tone(no.tone)}" fill-opacity=".1" stroke="${tone(no.tone)}" stroke-width="1.6"/>` + text(cx, by + 14, "no", { size: 12, weight: 800, fill: tone(no.tone) }) + `<g transform="translate(0 ${f1(by + 16 + nh2 / 2)})">${nb2.svg}</g>`);
      const yx = mainX + boxW - 22, end = by + nh2 + 26;
      out.push(arrow(yx, y + h + 2, yx, end, { stroke: C.good, w: 2, head: 9 }) + text(yx - 6, by + nh2 / 2, "yes", { size: 12.5, weight: 700, fill: C.good, anchor: "end" }).replace("<text", `<text transform="rotate(-90 ${f1(yx - 6)} ${f1(by + nh2 / 2)})"`));
      y = end + 4; id = n.yes; continue;
    }
    y = below;
    out.push(arrow(mainX + boxW / 2, y + 2, mainX + boxW / 2, y + 34, { stroke: C.good, w: 2, head: 9 }) + text(mainX + boxW / 2 + 10, y + 18, "yes", { size: 12.5, weight: 700, fill: C.good, anchor: "start" }));
    y += 38;
    id = n.yes;
  }
  return { s: out.join(""), H: y + 10 };
}
function treeChecks(spec, lessonText = "") {
  const N = spec.nodes, out = [], seen = new Set();
  const walk = (id, depth) => { if (!id || depth > 20) return false; const n = N[id]; if (!n) return false; seen.add(id); return n.outcome ? true : walk(n.yes, depth + 1) && walk(n.no, depth + 1); };
  out.push(check("every path ends in an outcome", walk(spec.start, 0)));
  out.push(check("no unreachable nodes", Object.keys(N).every((k) => seen.has(k)), Object.keys(N).filter((k) => !seen.has(k)).join(", ")));
  const cites = Object.values(N).map((n) => n.cite).filter(Boolean);
  const key = (c) => c.split(/[[(;,]/)[0].trim().split(" v ")[0];
  const missing = cites.filter((c) => !lessonText.includes(key(c)));
  out.push(check("every authority cited on the diagram is in the lesson", !missing.length, missing.length ? `not in the lesson: ${missing.join("; ")}` : `${cites.length} citations found in the lesson text`));
  return out;
}

// ---------- the dispatcher ----------
export const RENDERERS = {
  graph: { draw: (s, W, narrow) => { const H = s.height?.[narrow ? 1 : 0] || (narrow ? 330 : 380); return { s: graph(s, W, H), H }; }, checks: graphChecks, widths: [680, 400] },
  "energy-profile": { draw: (s, W, narrow) => energyProfile(s, W, narrow), checks: profileChecks, widths: [760, 400] },
  "free-body": { draw: (s, W, narrow) => { const H = W * (narrow ? 0.98 : 0.66); return { s: freeBody(s, W, H), H }; }, checks: freeBodyChecks, widths: [620, 400] },
  rays: { draw: (s, W, narrow) => rays(s, W, narrow), checks: rayChecks, widths: [880, 400] },
  circuit: { draw: (s, W, narrow) => { const H = narrow ? 300 : 280; return { s: circuit(s, W, H, narrow), H }; }, checks: circuitChecks, widths: [560, 380] },
  "decision-tree": { draw: (s, W, narrow) => tree(s, W, narrow), checks: treeChecks, widths: [760, 380] },
};

/** Render one spec. `lessonText` is the lesson's own notes, for checks that tie the diagram to the lesson. */
export function render(spec, { lessonText = "" } = {}) {
  const R = RENDERERS[spec.renderer];
  if (!R) throw new Error(`no renderer called ${spec.renderer}`);
  const [ww, nw] = R.widths;
  const wide = R.draw(spec, ww, false), narrow = R.draw(spec, nw, true);
  return {
    wide: svg(ww, wide.H, spec.alt, wide.s),
    narrow: svg(nw, narrow.H, spec.alt, narrow.s),
    checks: R.checks(spec, lessonText),
  };
}

// ---------- for the subject modules (kit/diagrams/chem-renderers.js) ----------
export { svg, text, line, arrow, legend, wrap, textBlock, axes, pathOf, col, f1, esc, near, check, graph, graphChecks };
/** Add renderers from a subject module. */
// Renderer names are one shared namespace across every subject module. A second module registering a name that is already
// taken would silently replace the first one's drawing and checks, so it is an error (rename it, e.g. with a subject prefix).
export function register(map) {
  for (const name of Object.keys(map)) if (RENDERERS[name]) throw new Error(`renderer "${name}" is already registered: pick a unique name (e.g. prefix it with the subject)`);
  Object.assign(RENDERERS, map);
}
