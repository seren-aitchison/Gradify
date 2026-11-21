// Gradify Visual Learning Engine: physics renderers, part 1 (part 2 is phys-renderers-2.js).
// Every renderer recomputes the physics it draws, so a spec whose numbers are wrong fails the build.
//
//   vectors   vector addition (tip to tail), forces on a body (free body, any angles) and resolution into components:
//             components = |v| cos θ, |v| sin θ; the resultant (or net force, or equilibrium) from the summed components
//   motion    x–t, v–t and a–t graphs from segments of constant acceleration: values, gradients, areas (displacement,
//             distance) recomputed from the kinematics
//   wave      a snapshot (λ, A, phase, v = fλ), superposition (amplitude of the sum, constructive or destructive),
//             standing waves on strings and in pipes (nodes, antinodes, λ and f from L, n and the ends), longitudinal
//             waves (compressions and rarefactions from the displacement)
//   sankey    energy transfers: outputs add up to the input; efficiency = useful ÷ input
//   fit       data with error bars and a least-squares line: gradient, intercept, worst-fit gradients, residuals
//
// Angles are in degrees, measured anticlockwise from the +x axis (east, or "to the right") unless a field says
// otherwise. Values in claims are the lesson's own (rounded) numbers; checks allow 1% unless `tol` says otherwise.
import { register, text, line, arrow, col, f1, check, COLOURS as C } from "./renderers.js";

// ---------------------------------------------------------------- shared helpers (also used by part 2)
const rad = (d) => (d * Math.PI) / 180, deg = (r) => (r * 180) / Math.PI;
export const close = (a, b, rel = 0.01, abs = 1e-9) => Math.abs(a - b) <= Math.max(abs, rel * Math.max(Math.abs(a), Math.abs(b)));
/** a number for a label: 3 significant figures, × 10^{n} outside 0.001–99 999 */
export function fmt(n, sig = 3) {
  if (!Number.isFinite(n)) return String(n);
  if (n === 0) return "0";
  const a = Math.abs(n);
  if (a >= 1e5 || a < 1e-3) { const e = Math.floor(Math.log10(a)), m = n / 10 ** e; return `${+m.toPrecision(sig)} × 10^{${e}}`; }
  return String(+n.toPrecision(sig)).replace("-", "−");
}
/** tick values for a range: steps of 1, 2, 2.5 or 5 × 10^k */
export function ticks(lo, hi, n = 5) {
  const raw = (hi - lo) / n || 1, p = 10 ** Math.floor(Math.log10(raw)), st = [1, 2, 2.5, 5, 10].map((k) => k * p).find((s) => s >= raw * 0.999);
  const out = [];
  for (let v = Math.ceil(lo / st - 1e-9) * st; v <= hi + 1e-9 * st; v += st) out.push(+v.toFixed(10));
  return out;
}
/** estimated drawn width of a label (sub/superscript markup removed) */
export const tw = (s, size = 13) => String(s).replace(/[_^]\{([^}]*)\}/g, "$1").length * size * 0.56;
/** Labels that avoid each other: place() tries the given offsets until the label's box overlaps nothing placed
 *  before it and stays inside the picture. reserve() blocks an area (a drawn object) for later labels. */
export function labeller(W, H, pad = 3) {
  const boxes = [];
  const hit = (b) => boxes.some((o) => b[0] < o[2] && b[2] > o[0] && b[1] < o[3] && b[3] > o[1]);
  const box = (x, y, s, size, anchor) => { const w = tw(s, size), h = size * 1.15, x0 = anchor === "start" ? x : anchor === "end" ? x - w : x - w / 2; return [x0, y - h / 2, x0 + w, y + h / 2]; };
  return {
    boxes,
    reserve(x0, y0, x1, y1) { boxes.push([Math.min(x0, x1), Math.min(y0, y1), Math.max(x0, x1), Math.max(y0, y1)]); },
    place(x, y, s, opts = {}, offsets = [[0, 0], [0, -1], [0, 1], [0, -2], [0, 2], [-1, 0], [1, 0], [0, -3], [0, 3]]) {
      const size = opts.size || 13, anchor = opts.anchor || "middle", step = size * 1.25;
      let best = null;
      for (const [dx, dy] of offsets) {
        let b = box(x + dx * step * 2, y + dy * step, s, size, anchor);
        const sh = Math.max(0, pad - b[0]) - Math.max(0, b[2] - (W - pad)), sv = Math.max(0, pad - b[1]) - Math.max(0, b[3] - (H - pad));
        b = [b[0] + sh, b[1] + sv, b[2] + sh, b[3] + sv];
        const at = [x + dx * step * 2 + sh, y + dy * step + sv];
        if (!best) best = { b, at };
        if (!hit(b)) { best = { b, at }; break; }
      }
      boxes.push(best.b);
      return halo(text(best.at[0], best.at[1], s, { ...opts, size, anchor }));
    },
  };
}
/** a white outline under a label, so it stays readable where it crosses a line (diagram cards are light) */
export const halo = (t) => t.replace("<text ", '<text paint-order="stroke" stroke="#fff" stroke-width="4" stroke-linejoin="round" ');
/** reserve a drawn line for a labeller as a chain of small boxes (a diagonal line's bounding box would block too much) */
export function reserveLine(L, x1, y1, x2, y2, r = 3) { const n = Math.max(1, Math.ceil(Math.hypot(x2 - x1, y2 - y1) / 8)); for (let i = 0; i <= n; i++) { const x = x1 + ((x2 - x1) * i) / n, y = y1 + ((y2 - y1) * i) / n; L.reserve(x - r, y - r, x + r, y + r); } }
/** A plotting frame: axes with ticks in the box (x, y, w, h). Returns the scale functions and the SVG. */
export function frame(x, y, w, h, xr, yr, { xLabel = "", yLabel = "", xt, yt, size = 11.5, zeroAxis = true } = {}) {
  const X = (v) => x + ((v - xr[0]) / (xr[1] - xr[0])) * w, Y = (v) => y + h - ((v - yr[0]) / (yr[1] - yr[0])) * h;
  const y0 = zeroAxis && yr[0] < 0 && yr[1] > 0 ? 0 : yr[0];
  let s = "";
  for (const t of yt || ticks(yr[0], yr[1], 4)) s += line(x, Y(t), x + w, Y(t), { stroke: C.grid, w: 1 }) + text(x - 6, Y(t), fmt(t), { size, anchor: "end", fill: C.soft });
  for (const t of xt || ticks(xr[0], xr[1], 5)) s += line(X(t), y, X(t), y + h, { stroke: C.grid, w: 1 }) + text(X(t), Y(yr[0]) + 13, fmt(t), { size, fill: C.soft });
  s += arrow(x, Y(y0), x + w + 10, Y(y0), { w: 1.5, head: 7 }) + arrow(x, y + h, x, y - 10, { w: 1.5, head: 7 });
  if (xLabel) s += text(x + w, Y(yr[0]) + 28, xLabel, { size: 12, weight: 600, anchor: "end", fill: C.soft });
  if (yLabel) s += text(x + 4, y - 18, yLabel, { size: 12, weight: 600, anchor: "start", fill: C.soft });
  return { s, X, Y };
}
export const poly = (pts, { stroke = C.a1, w = 2.6, dash = "", fill = "none", op = "" } = {}) =>
  `<path d="${pts.map(([a, b], i) => `${i ? "L" : "M"}${f1(a)} ${f1(b)}`).join(" ")}${fill !== "none" ? " Z" : ""}" fill="${fill}"${op ? ` fill-opacity="${op}"` : ""} stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
const dot = (x, y, r = 4, fill = C.ink) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${fill}"/>`;
const lines = (x, y, arr, opt = {}, lh = 22) => arr.map((l, i) => text(x, y + i * lh, l, { size: 13, anchor: "start", ...opt })).join("");

// ======================================================================== vectors
// spec: mode "add" | "body" | "resolve", unit, vectors: [{label, mag, angle, colour, dir?, source?, comps?: [x, y]}],
// resultant: {label, mag, angle, dir?} (for "body", the net force; mag 0 means equilibrium), compass, notes: [lines],
// claims: [{type: "ratio", a, b, value} | {type: "angleBetween", a, b, value}]
export const components = (v) => [v.mag * Math.cos(rad(v.angle)), v.mag * Math.sin(rad(v.angle))];
export function vectorSum(vs) { const x = vs.reduce((t, v) => t + components(v)[0], 0), y = vs.reduce((t, v) => t + components(v)[1], 0); return { x, y, mag: Math.hypot(x, y), angle: ((deg(Math.atan2(y, x)) % 360) + 360) % 360 }; }
const angDiff = (a, b) => { const d = (((a - b) % 360) + 540) % 360 - 180; return Math.abs(d); };

function vectorsDraw(spec, W, narrow) {
  const mode = spec.mode || "add", vs = spec.vectors, unit = spec.units ? ` ${spec.units}` : "";
  const R = vectorSum(vs), segs = [];
  let tip = [0, 0];
  for (const v of vs) {
    const [cx, cy] = components(v);
    if (mode === "add") { segs.push({ v, a: tip, b: [tip[0] + cx, tip[1] + cy] }); tip = [tip[0] + cx, tip[1] + cy]; }
    else segs.push({ v, a: [0, 0], b: [cx, cy] });
  }
  if (mode === "resolve") for (const v of vs) { const [cx, cy] = components(v); segs.push({ comp: true, v, a: [0, 0], b: [cx, 0], label: v.compLabels?.[0] }, { comp: true, v, a: [cx, 0], b: [cx, cy], label: v.compLabels?.[1] }); }
  const showR = spec.resultant && (mode === "add" || (spec.resultant.mag > 0 && spec.showResultant !== false));
  if (showR) segs.push({ res: true, a: [0, 0], b: [R.x, R.y], v: spec.resultant });
  const pts = segs.flatMap((s) => [s.a, s.b]);
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const [xmin, xmax, ymin, ymax] = [Math.min(0, ...xs), Math.max(0, ...xs), Math.min(0, ...ys), Math.max(0, ...ys)];
  // the drawing box, then the text panel beside (wide) or under (narrow) it
  const notes = [...vs.map((v) => `${v.label} = ${v.text || `${fmt(v.mag)}${unit}${v.dir ? `, ${v.dir}` : ` at ${fmt(v.angle)}°`}`}`)];
  if (spec.resultant) notes.push(spec.resultant.mag === 0 ? `${spec.resultant.label || "net force"} = 0 (in equilibrium)` : `${spec.resultant.label} = ${spec.resultant.text || `${fmt(spec.resultant.mag)}${unit}${spec.resultant.dir ? `, ${spec.resultant.dir}` : ` at ${fmt(spec.resultant.angle)}°`}`}`);
  for (const n of spec.notes || []) notes.push(n);
  const dw = narrow ? W - 40 : W * 0.56, dh = narrow ? 260 : 330, ox = 20, oy = 36;
  const k = Math.min(dw / (xmax - xmin || 1), dh / (ymax - ymin || 1)) * (mode === "body" ? 0.72 : 0.82);
  const cx0 = ox + dw / 2 - ((xmin + xmax) / 2) * k, cy0 = oy + dh / 2 + ((ymin + ymax) / 2) * k;
  const P = ([x, y]) => [cx0 + x * k, cy0 - y * k];
  // on a body, forces start at the box's edge (so a small force stays visible) and the net force is drawn beside the box
  const ends = (sg) => {
    let [x1, y1] = P(sg.a), [x2, y2] = P(sg.b);
    if (mode !== "body" || sg.comp) return [x1, y1, x2, y2];
    const len = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / len, uy = (y2 - y1) / len;
    if (sg.res) { const off = 46; return [x1 - uy * off, y1 + ux * off, x2 - uy * off, y2 + ux * off]; }
    const e = 20 / Math.max(Math.abs(ux), Math.abs(uy));
    return [x1 + ux * e, y1 + uy * e, x2 + ux * e, y2 + uy * e];
  };
  const wrapN = narrow ? 46 : 34, noteLines = notes.flatMap((n) => wrapLine(n, wrapN));
  const H = narrow ? oy + dh + 26 + noteLines.length * 22 + 10 : Math.max(oy + dh + 20, 60 + noteLines.length * 22);
  const L = labeller(W, H);
  let s = "";
  if (spec.title) s += text(16, 16, spec.title, { size: 14, weight: 700, anchor: "start" });
  if (mode === "body") { const [bx, by] = P([0, 0]); s += `<rect x="${f1(bx - 20)}" y="${f1(by - 20)}" width="40" height="40" rx="5" fill="${C.panel}" stroke="${C.ink}" stroke-width="2"/>` + dot(bx, by, 3.5); L.reserve(bx - 20, by - 20, bx + 20, by + 20); }
  else { const [bx, by] = P([0, 0]); s += dot(bx, by, 4); }
  if (spec.compass) { const x = ox + dw - 4, y = oy + 4; s += arrow(x, y + 34, x, y, { w: 1.8, head: 8, stroke: C.soft }) + text(x, y - 8, "N", { size: 12, weight: 700, fill: C.soft }); L.reserve(x - 8, y - 16, x + 8, y + 34); }
  for (const sg of segs) {
    const [x1, y1, x2, y2] = ends(sg), c = sg.comp ? C.soft : sg.res ? C.a2 : col(sg.v.colour || "a1");
    if (Math.hypot(x2 - x1, y2 - y1) < 2) continue;
    s += arrow(x1, y1, x2, y2, { stroke: c, w: sg.comp ? 1.8 : 3, dash: sg.comp || (sg.res && mode !== "add") ? "6 5" : "", head: sg.comp ? 8 : 11 });
    reserveLine(L, x1, y1, x2, y2);
  }
  for (const sg of segs) {
    const [x1, y1, x2, y2] = ends(sg), c = sg.comp ? C.soft : sg.res ? C.a2 : col(sg.v.colour || "a1");
    const lab = sg.comp ? sg.label : sg.v.label;
    if (!lab || Math.hypot(x2 - x1, y2 - y1) < 2) continue;
    const len = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / len, ny = (x2 - x1) / len, side = sg.res ? 1 : -1;
    const mx = mode === "body" ? x1 + (x2 - x1) * 0.8 : (x1 + x2) / 2, my = mode === "body" ? y1 + (y2 - y1) * 0.8 : (y1 + y2) / 2;
    s += L.place(mx + side * nx * 16, my + side * ny * 16, lab, { size: sg.comp ? 12.5 : 14.5, weight: 700, fill: c, italic: !sg.comp }, [[0, 0], [0, -1], [0, 1], [-1, 0], [1, 0], [0, -2], [0, 2]]);
  }
  const tx = narrow ? 16 : W * 0.6 + 6, ty = narrow ? oy + dh + 26 : 60;
  s += lines(tx, ty, noteLines, { fill: C.ink });
  return { s, H };
}
function wrapLine(s, n) { const out = [""]; for (const w of String(s).split(" ")) { const t = out.at(-1) ? `${out.at(-1)} ${w}` : w; if (t.replace(/[_^]\{([^}]*)\}/g, "$1").length > n && out.at(-1)) out.push(`   ${w}`); else out[out.length - 1] = t; } return out; }
export function vectorChecks(spec) {
  const out = [], vs = spec.vectors, R = vectorSum(vs), tol = spec.tol ?? 0.01, big = Math.max(...vs.map((v) => v.mag));
  for (const v of vs) if (v.comps) {
    const [x, y] = components(v);
    out.push(check(`components of ${v.label} are ${v.comps.map((c) => fmt(c)).join(", ")}`, close(x, v.comps[0], tol, tol * big) && close(y, v.comps[1], tol, tol * big), `|v| cos θ = ${fmt(x)}, |v| sin θ = ${fmt(y)}`));
  }
  if (spec.resultant) {
    const r = spec.resultant;
    if (r.mag === 0) out.push(check("the forces balance (equilibrium)", Math.hypot(R.x, R.y) <= tol * big, `sum of components (${fmt(R.x)}, ${fmt(R.y)})`));
    else out.push(check(`${r.label || "the resultant"} = ${fmt(r.mag)} at ${fmt(r.angle)}° from the summed components`, close(R.mag, r.mag, tol, tol * big) && angDiff(R.angle, r.angle) <= (spec.angleTol ?? 0.6), `Σx = ${fmt(R.x)}, Σy = ${fmt(R.y)}: ${fmt(R.mag)} at ${R.angle.toFixed(1)}°`));
  }
  if (spec.mode === "body") out.push(check("every force has a stated source", vs.every((v) => v.source), vs.map((v) => `${v.label}: ${v.source || "none"}`).join("; ")));
  const by = (l) => vs.find((v) => v.label === l) || (spec.resultant?.label === l ? { ...spec.resultant, mag: R.mag, angle: R.angle } : null);
  for (const c of spec.claims || []) {
    const a = by(c.a), b = by(c.b);
    if (!a || !b) { out.push(check(`claim names vectors that exist (${c.a}, ${c.b})`, false)); continue; }
    if (c.type === "ratio") out.push(check(c.name || `${c.a} ÷ ${c.b} = ${c.value}`, close(a.mag / b.mag, c.value, c.tol ?? 0.02), `${fmt(a.mag / b.mag)}`));
    if (c.type === "angleBetween") out.push(check(c.name || `angle between ${c.a} and ${c.b} is ${c.value}°`, Math.abs(angDiff(a.angle, b.angle) - c.value) <= 0.6, `${angDiff(a.angle, b.angle).toFixed(1)}°`));
  }
  return out;
}

// ======================================================================== motion
// spec: x0, u, segments: [{dt, a}], show: ["x", "v", "a"], units: {t, x, v, a},
// claims: [{type: "x" | "v" | "a", t, value} | {type: "displacement" | "distance", from, to, value, shade}]
export function motionAt(spec, t) {
  let x = spec.x0 || 0, v = spec.u || 0, t0 = 0;
  const segs = spec.segments;
  for (let i = 0; i < segs.length; i++) {
    const { dt, a } = segs[i];
    if (t <= t0 + dt + 1e-12 || i === segs.length - 1) { const tau = Math.min(Math.max(t - t0, 0), dt); return { x: x + v * tau + 0.5 * a * tau * tau, v: v + a * tau, a }; }
    x += v * dt + 0.5 * a * dt * dt; v += a * dt; t0 += dt;
  }
  return { x, v, a: 0 };
}
export const motionEnd = (spec) => spec.segments.reduce((t, s) => t + s.dt, 0);
export function distance(spec, from, to) { const n = 4000, h = (to - from) / n; let d = 0; for (let i = 0; i < n; i++) d += Math.abs(motionAt(spec, from + (i + 0.5) * h).v) * h; return d; }
const QN = { x: "displacement", v: "velocity", a: "acceleration" };
function motionDraw(spec, W, narrow) {
  const show = spec.show || ["x", "v"], T = motionEnd(spec), u = { t: "s", x: "m", v: "m s^{-1}", a: "m s^{-2}", ...(spec.units || {}) };
  const n = show.length, gap = 54, pw = narrow ? W - 76 : (W - 70 - (n - 1) * gap) / n, ph = narrow ? 170 : 200;
  const H = narrow ? n * (ph + 96) + 10 : ph + 108;
  let s = "";
  const L = labeller(W, H);
  show.forEach((q, i) => {
    const x = narrow ? 56 : 56 + i * (pw + gap), y = narrow ? 54 + i * (ph + 96) : 56;
    const samples = []; for (let k = 0; k <= 400; k++) { const t = (T * k) / 400; samples.push([t, motionAt(spec, t)[q]]); }
    // a–t is a step function: draw each segment flat
    if (q === "a") { samples.length = 0; let t0 = 0; for (const sg of spec.segments) { samples.push([t0, sg.a], [t0 + sg.dt, sg.a]); t0 += sg.dt; } }
    const vals = samples.map((p) => p[1]), lo = Math.min(0, ...vals), hi = Math.max(0, ...vals), padv = (hi - lo || 1) * 0.12;
    const yr = [lo < 0 ? lo - padv : 0, hi + padv];
    const F = frame(x, y, pw, ph, [0, T], yr, { xLabel: `t / ${u.t}`, yLabel: `${q} / ${u[q]}` });
    s += F.s;
    // shaded areas under v–t (displacement or distance)
    if (q === "v") for (const c of (spec.claims || []).filter((c) => (c.type === "displacement" || c.type === "distance") && c.shade !== false)) {
      const pts = [[F.X(c.from), F.Y(0)]]; for (let k = 0; k <= 80; k++) { const t = c.from + ((c.to - c.from) * k) / 80; pts.push([F.X(t), F.Y(motionAt(spec, t).v)]); } pts.push([F.X(c.to), F.Y(0)]);
      s += poly(pts, { stroke: "none", fill: C.a4, op: ".18", w: 0 });
      const mid = (c.from + c.to) / 2, vm = motionAt(spec, mid).v / 2;
      s += L.place(F.X(mid), F.Y(vm), c.label || `area = ${fmt(c.value)} ${u.x}`, { size: 12, weight: 700, fill: C.a4 });
    }
    s += poly(samples.map(([t, v]) => [F.X(t), F.Y(v)]), { stroke: col(spec.colours?.[q] || ["a1", "a2", "a3"][i % 3]), w: 3 });
    L.reserve(x - 40, y + ph, x + pw, y + ph + 32);
    s += text(x + pw / 2, y - 42, spec.titles?.[q] || `${QN[q]}–time`, { size: 13.5, weight: 700 });
    for (const c of (spec.claims || []).filter((c) => c.type === q && c.mark !== false)) {
      const px = F.X(c.t), py = F.Y(c.value);
      s += dot(px, py, 4.5, C.ink) + L.place(px + 8, py - 14, c.label || `${fmt(c.value)} ${u[q]}`, { size: 12, weight: 700, anchor: "start" });
    }
  });
  return { s, H };
}
export function motionChecks(spec) {
  const out = [], T = motionEnd(spec), tol = spec.tol ?? 0.01;
  out.push(check("the motion is made of segments of constant acceleration with positive durations", spec.segments.length > 0 && spec.segments.every((s) => s.dt > 0 && Number.isFinite(s.a)), `${spec.segments.length} segments, ${fmt(T)} s`));
  for (const c of spec.claims || []) {
    if (["x", "v", "a"].includes(c.type)) { const got = motionAt(spec, c.t)[c.type]; out.push(check(c.name || `${QN[c.type]} at t = ${c.t} is ${c.value}`, close(got, c.value, tol, tol), `kinematics gives ${fmt(got)}`)); }
    else if (c.type === "displacement") { const d = motionAt(spec, c.to).x - motionAt(spec, c.from).x; out.push(check(c.name || `area under v–t from ${c.from} to ${c.to} s (displacement) is ${c.value}`, close(d, c.value, tol, tol), `${fmt(d)}`)); }
    else if (c.type === "distance") { const d = distance(spec, c.from, c.to); out.push(check(c.name || `distance from ${c.from} to ${c.to} s is ${c.value}`, close(d, c.value, tol, tol), `${fmt(d)}`)); }
    else out.push(check(`claim type ${c.type} is known`, false));
  }
  if (!(spec.claims || []).length) out.push(check("the graph states at least one value to check", false));
  return out;
}

// ======================================================================== wave
// spec.kind:
//  "snapshot":      A, lambda, phase (°), xmax, f?, v?, showLambda, showA; claims: speed, period, phase {x1, x2, value}
//  "superposition": waves: [{A, lambda, phase, label}], xmax; claims: amplitude, interference ("constructive" | "destructive")
//  "standing":      L, n (number or list), ends "fixed-fixed" | "open-open" | "closed-open", v?, A?;
//                   claims per harmonic: [{n, nodes: [x], antinodes: [x], lambda, f}]
//  "longitudinal":  A, lambda, xmax, phase; claims: compressions: [x], rarefactions: [x]
const wy = (w, x) => w.A * Math.sin((2 * Math.PI * x) / w.lambda + rad(w.phase || 0));
export function standing(L, n, ends) {
  // the displacement envelope and the allowed harmonics for each pair of ends
  if (ends === "closed-open") { if (n % 2 !== 1) return { ok: false }; const lambda = (4 * L) / n, k = (2 * Math.PI) / lambda; return { ok: true, lambda, env: (x) => Math.sin(k * x) }; }
  const lambda = (2 * L) / n, k = (2 * Math.PI) / lambda;
  return { ok: true, lambda, env: ends === "open-open" ? (x) => Math.cos(k * x) : (x) => Math.sin(k * x) };
}
export function nodesOf(L, n, ends) {
  const st = standing(L, n, ends); if (!st.ok) return null;
  const N = 20000, nodes = [], anti = [], e = (x) => Math.abs(st.env(x));
  for (let i = 0; i <= N; i++) {
    const x = (L * i) / N, v = e(x), a = i ? e((L * (i - 1)) / N) : Infinity, b = i < N ? e((L * (i + 1)) / N) : Infinity;
    const a2 = i ? e((L * (i - 1)) / N) : -Infinity, b2 = i < N ? e((L * (i + 1)) / N) : -Infinity;
    if (v < 1e-3 && v <= a && v <= b) nodes.push(+x.toFixed(6));
    if (v > 1 - 1e-6 && v >= a2 && v >= b2) anti.push(+x.toFixed(6));
  }
  const dedupe = (xs) => xs.filter((x, i) => !i || x - xs[i - 1] > L / N * 3);
  return { ...st, nodes: dedupe(nodes), antinodes: dedupe(anti) };
}
const sameList = (a, b, tol) => a.length === b.length && a.every((x, i) => Math.abs(x - b[i]) <= tol);
function waveDraw(spec, W, narrow) {
  const kind = spec.kind, padL = 50, padR = narrow ? 16 : 24, pw = W - padL - padR;
  let s = "", H;
  if (kind === "standing") {
    const ns = [].concat(spec.n), pipe = spec.ends !== "fixed-fixed", rh = (narrow ? 118 : 112) + (pipe ? 22 : 0), L0 = spec.L;
    H = 22 + ns.length * rh + 10;
    const L = labeller(W, H);
    if (spec.title) s += text(16, 14, spec.title, { size: 14, weight: 700, anchor: "start" });
    ns.forEach((n, i) => {
      const st = nodesOf(L0, n, spec.ends); const y = 30 + i * rh + rh / 2 + 8, amp = rh * 0.26;
      const X = (x) => padL + (x / L0) * pw;
      s += text(padL, y - amp - 24, spec.rowLabels?.[i] || `n = ${n}: λ = ${fmt(st?.lambda ?? NaN)} ${spec.units || "m"}${spec.v ? `, f = ${fmt(spec.v / (st?.lambda ?? NaN))} Hz` : ""}`, { size: 12.5, weight: 700, anchor: "start" });
      L.reserve(padL, y - amp - 32, padL + tw(`n = ${n}: λ = 0.000 m, f = 000 Hz`, 12.5), y - amp - 16);
      if (pipe) {
        s += line(X(0), y - amp - 8, X(L0), y - amp - 8, { w: 2.4 }) + line(X(0), y + amp + 8, X(L0), y + amp + 8, { w: 2.4 });
        if (spec.ends === "closed-open") s += line(X(0), y - amp - 8, X(0), y + amp + 8, { w: 4 });
      } else s += dot(X(0), y, 5) + dot(X(L0), y, 5) + line(X(0), y, X(L0), y, { stroke: C.grid, w: 1 });
      if (!st) { s += text(W / 2, y, `harmonic ${n} is not allowed with ${spec.ends} ends`, { size: 13, fill: C.bad }); return; }
      for (const f of [1, 0.55, -0.55, -1]) {
        const pts = []; for (let k = 0; k <= 200; k++) { const x = (L0 * k) / 200; pts.push([X(x), y - f * amp * st.env(x)]); }
        s += poly(pts, { stroke: Math.abs(f) === 1 ? C.a1 : C.line, w: Math.abs(f) === 1 ? 2.6 : 1.3, dash: Math.abs(f) === 1 ? "" : "4 4" });
      }
      for (const x of st.nodes) s += dot(X(x), y, 3.5, C.a2) + L.place(X(x), y + amp + (pipe ? 22 : 16), "N", { size: 12, weight: 700, fill: C.a2 });
      for (const x of st.antinodes) s += L.place(X(x), y + amp + (pipe ? 22 : 16), "A", { size: 12, weight: 700, fill: C.a4 });
    });
    if (spec.note) s += text(16, H - 6, spec.note, { size: 12, fill: C.soft, anchor: "start" });
    return { s, H };
  }
  if (kind === "longitudinal") {
    const xmax = spec.xmax, w = { A: spec.A, lambda: spec.lambda, phase: spec.phase || 0 }, rows = 5, top = 34, rh = 16;
    H = top + rows * rh + 70;
    const X = (x) => padL + (x / xmax) * pw, k = pw / xmax;
    if (spec.title) s += text(16, 14, spec.title, { size: 14, weight: 700, anchor: "start" });
    const ncol = narrow ? 36 : 60;
    for (let i = 0; i <= ncol; i++) { const x0 = (xmax * i) / ncol, x = x0 + wy(w, x0); for (let r = 0; r < rows; r++) if (x >= 0 && x <= xmax) s += dot(X(x), top + 8 + r * rh, 2.6, C.a1); }
    const ex = extremaOfStrain(w, xmax), yl = top + rows * rh + 16;
    const L = labeller(W, H);
    for (const x of ex.compressions) s += L.place(X(x), yl, "C", { size: 13, weight: 700, fill: C.a2 });
    for (const x of ex.rarefactions) s += L.place(X(x), yl, "R", { size: 13, weight: 700, fill: C.a4 });
    if (spec.showLambda && ex.compressions.length > 1) { const [a, b] = ex.compressions; s += arrow(X(a), yl + 22, X(b), yl + 22, { both: true, w: 1.6, head: 7, stroke: C.a3 }) + text((X(a) + X(b)) / 2, yl + 38, `λ = ${fmt(spec.lambda)} ${spec.units || "m"}`, { size: 12.5, weight: 700, fill: C.a3 }); }
    s += text(W - padR, 14, "C compression · R rarefaction", { size: 12, anchor: "end", fill: C.soft });
    return { s, H };
  }
  // snapshot and superposition share a displacement–position frame
  const waves = kind === "superposition" ? spec.waves : [{ A: spec.A, lambda: spec.lambda, phase: spec.phase || 0 }];
  const sum = (x) => waves.reduce((t, w) => t + wy(w, x), 0);
  const ymax = Math.max(waves.reduce((t, w) => t + Math.abs(w.A), 0), 1e-9) * 1.25, xmax = spec.xmax;
  const ph = narrow ? 190 : 200, top = narrow && kind === "superposition" ? 70 : 48;
  H = top + ph + 46;
  const F = frame(padL, top, pw, ph, [0, xmax], [-ymax, ymax], { xLabel: `x / ${spec.units || "m"}`, yLabel: `displacement / ${spec.yUnit || spec.units || "m"}` });
  s += F.s;
  const L = labeller(W, H);
  L.reserve(padL, top - 28, padL + tw(`displacement / ${spec.yUnit || spec.units || "m"}`, 12) + 8, top - 8);
  const curve = (f, o) => { const pts = []; for (let k = 0; k <= 400; k++) { const x = (xmax * k) / 400; pts.push([F.X(x), F.Y(f(x))]); } return poly(pts, o); };
  if (kind === "superposition") {
    waves.forEach((w, i) => { s += curve((x) => wy(w, x), { stroke: col(w.colour || ["a1", "a4", "a5"][i]), w: 1.8, dash: "6 5" }); });
    s += curve(sum, { stroke: C.a2, w: 3.2 });
    const items = [...waves.map((w, i) => [w.label || `wave ${i + 1}`, w.colour || ["a1", "a4", "a5"][i], "6 5"]), [spec.sumLabel || "sum (superposition)", "a2", ""]];
    let lx = narrow ? padL : W - padR - 12 - items.reduce((t, it) => t + tw(it[0], 12) + 44, 0), ly = narrow ? top - 22 : 18;
    if (narrow) { s += items.map((it, i) => line(16 + (i % 2) * (W / 2), 14 + Math.floor(i / 2) * 16, 40 + (i % 2) * (W / 2), 14 + Math.floor(i / 2) * 16, { stroke: col(it[1]), w: 3, dash: it[2] }) + text(46 + (i % 2) * (W / 2), 14 + Math.floor(i / 2) * 16, it[0], { size: 11.5, anchor: "start" })).join(""); }
    else for (const it of items) { s += line(lx, ly, lx + 26, ly, { stroke: col(it[1]), w: 3, dash: it[2] }) + text(lx + 32, ly, it[0], { size: 12, anchor: "start" }); lx += tw(it[0], 12) + 44; }
  } else {
    s += curve(sum, { stroke: C.a1, w: 3 });
    const w = waves[0], k = (2 * Math.PI) / w.lambda, x0 = ((Math.PI / 2 - rad(w.phase)) / k % w.lambda + w.lambda) % w.lambda; // first crest
    if (spec.showLambda !== false && x0 + w.lambda <= xmax) { const yy = F.Y(w.A) - 14; s += line(F.X(x0), F.Y(w.A), F.X(x0), yy - 4, { stroke: C.line, w: 1, dash: "3 3" }) + line(F.X(x0 + w.lambda), F.Y(w.A), F.X(x0 + w.lambda), yy - 4, { stroke: C.line, w: 1, dash: "3 3" }) + arrow(F.X(x0), yy, F.X(x0 + w.lambda), yy, { both: true, w: 1.6, head: 7, stroke: C.a3 }) + L.place((F.X(x0) + F.X(x0 + w.lambda)) / 2, yy - 12, `λ = ${fmt(w.lambda)} ${spec.units || "m"}`, { size: 12.5, weight: 700, fill: C.a3 }); }
    if (spec.showA !== false) {
      // the amplitude arrow at the first crest at least λ/2 from the axis, labelled to its right above the axis line
      let xa = x0; while (xa < w.lambda * 0.5 && xa + w.lambda <= xmax) xa += w.lambda;
      s += line(F.X(xa), F.Y(w.A), F.X(xa), F.Y(0), { stroke: C.line, w: 1, dash: "3 3" }) + arrow(F.X(xa) + 10, F.Y(0), F.X(xa) + 10, F.Y(w.A), { both: true, w: 1.6, head: 7, stroke: C.a4 });
      s += L.place(F.X(xa) + 16, F.Y(w.A * 0.25), `A = ${fmt(w.A)}`, { size: 12.5, weight: 700, fill: C.a4, anchor: "start" }, [[0, 0], [0, 1], [0, -1]]);
    }
    if (spec.f) s += text(W - padR, 18, `f = ${fmt(spec.f)} Hz${spec.v ? `, v = fλ = ${fmt(spec.v)} m s^{-1}` : ""}`, { size: 12.5, weight: 600, anchor: "end" });
  }
  return { s, H };
}
export function extremaOfStrain(w, xmax) {
  // dξ/dx = A k cos(kx + φ): compression where it is most negative (particles crowd together), rarefaction where most positive
  const k = (2 * Math.PI) / w.lambda, out = { compressions: [], rarefactions: [] };
  for (let m = -10; m <= 10 + (2 * xmax) / w.lambda; m++) {
    const xc = (Math.PI * (2 * m + 1) - rad(w.phase || 0)) / k, xr = (2 * Math.PI * m - rad(w.phase || 0)) / k;
    if (xc >= -1e-9 && xc <= xmax + 1e-9) out.compressions.push(+xc.toFixed(6));
    if (xr >= -1e-9 && xr <= xmax + 1e-9) out.rarefactions.push(+xr.toFixed(6));
  }
  out.compressions.sort((a, b) => a - b); out.rarefactions.sort((a, b) => a - b);
  return out;
}
export function waveChecks(spec) {
  const out = [], c = spec.claims || {}, tol = spec.tol ?? 0.01;
  if (spec.kind === "standing") {
    for (const h of [].concat(c.harmonics || [])) {
      const r = nodesOf(spec.L, h.n, spec.ends);
      if (!r) { out.push(check(`harmonic ${h.n} is allowed with ${spec.ends} ends`, false, "a pipe closed at one end has odd harmonics only")); continue; }
      const xt = spec.L * 1e-3;
      if (h.nodes) out.push(check(`n = ${h.n}: nodes at ${h.nodes.join(", ")}`, sameList(r.nodes, h.nodes, Math.max(xt, spec.L * tol)), `from L = ${spec.L}: ${r.nodes.map((x) => fmt(x)).join(", ")}`));
      if (h.antinodes) out.push(check(`n = ${h.n}: antinodes at ${h.antinodes.join(", ")}`, sameList(r.antinodes, h.antinodes, Math.max(xt, spec.L * tol)), `${r.antinodes.map((x) => fmt(x)).join(", ")}`));
      if (h.lambda != null) out.push(check(`n = ${h.n}: λ = ${h.lambda}`, close(r.lambda, h.lambda, tol), `${spec.ends === "closed-open" ? "4L/n" : "2L/n"} = ${fmt(r.lambda)}`));
      if (h.f != null) out.push(check(`n = ${h.n}: f = v/λ = ${h.f} Hz`, !!spec.v && close(spec.v / r.lambda, h.f, tol), spec.v ? `${fmt(spec.v / r.lambda)} Hz` : "no wave speed v given"));
    }
    for (const n of [].concat(spec.n)) out.push(check(`harmonic ${n} is allowed with ${spec.ends} ends`, standing(spec.L, n, spec.ends).ok));
  } else if (spec.kind === "longitudinal") {
    const ex = extremaOfStrain(spec, spec.xmax), t = spec.lambda * 0.01;
    if (c.compressions) out.push(check(`compressions at ${c.compressions.join(", ")}`, sameList(ex.compressions, c.compressions, t), ex.compressions.map((x) => fmt(x)).join(", ")));
    if (c.rarefactions) out.push(check(`rarefactions at ${c.rarefactions.join(", ")}`, sameList(ex.rarefactions, c.rarefactions, t), ex.rarefactions.map((x) => fmt(x)).join(", ")));
  } else if (spec.kind === "superposition") {
    let m = 0; for (let i = 0; i <= 20000; i++) { const x = (spec.xmax * i) / 20000; m = Math.max(m, Math.abs(spec.waves.reduce((t, w) => t + wy(w, x), 0))); }
    if (c.amplitude != null) out.push(check(`the sum has amplitude ${c.amplitude}`, close(m, c.amplitude, tol, tol), `largest |y| of the sum = ${fmt(m)}`));
    if (c.interference) {
      const [a, b] = spec.waves, same = a.lambda === b.lambda, d = ((((b.phase || 0) - (a.phase || 0)) % 360) + 360) % 360;
      const kind = !same ? "neither" : d < 1 || d > 359 ? "constructive" : Math.abs(d - 180) < 1 ? "destructive" : "partial";
      out.push(check(`the waves interfere ${c.interference}ly`, kind === c.interference, `same wavelength: ${same}; phase difference ${d.toFixed(1)}°`));
    }
  } else {
    if (c.speed != null) out.push(check(`v = fλ = ${c.speed}`, !!spec.f && close(spec.f * spec.lambda, c.speed, tol), `${spec.f} × ${spec.lambda} = ${fmt(spec.f * spec.lambda)}`));
    if (spec.v != null) out.push(check("the stated speed matches fλ", !!spec.f && close(spec.f * spec.lambda, spec.v, tol), `${fmt(spec.f * spec.lambda)}`));
    if (c.period != null) out.push(check(`T = 1/f = ${c.period}`, !!spec.f && close(1 / spec.f, c.period, tol), `${fmt(1 / spec.f)}`));
    if (c.phase) { const d = (360 * Math.abs(c.phase.x2 - c.phase.x1)) / spec.lambda; out.push(check(`phase difference between x = ${c.phase.x1} and ${c.phase.x2} is ${c.phase.value}°`, close(d % 360, c.phase.value % 360, tol, 0.5), `360° × Δx/λ = ${d.toFixed(1)}°`)); }
  }
  if (!out.length) out.push(check("the wave states at least one value to check", false));
  return out;
}

// ======================================================================== sankey
// spec: unit, input: {label, value} (or inputs: [...]), outputs: [{label, value, useful}], efficiency (claimed, 0–1)
export function sankeyTotals(spec) {
  const ins = spec.inputs || [spec.input], tin = ins.reduce((t, x) => t + x.value, 0), tout = spec.outputs.reduce((t, x) => t + x.value, 0);
  const useful = spec.outputs.filter((o) => o.useful).reduce((t, x) => t + x.value, 0);
  return { tin, tout, useful, eff: useful / tin };
}
function sankeyDraw(spec, W, narrow) {
  const { tin, useful: tu } = sankeyTotals(spec), unit = spec.units || "J", ins = spec.inputs || [spec.input];
  const useful = spec.outputs.filter((o) => o.useful), waste = spec.outputs.filter((o) => !o.useful), nW = waste.length;
  const lab = (o) => `${o.label}: ${fmt(o.value)} ${unit}`, x0 = narrow ? 14 : 20, splitX = narrow ? W * 0.34 : W * 0.36;
  // labels go beside the bands when there is room, above them when there is not (phones)
  const inAbove = ins.some((o) => tw(lab(o), 13) > splitX - x0 - 16), mw = Math.max(...useful.map((o) => tw(lab(o), 12.5))), outAbove = W - mw - 40 < splitX + 60;
  const endX = outAbove ? W - 34 : W - mw - 40, top = (spec.title ? 44 : 20) + (inAbove || outAbove ? 20 : 0);
  const bandH = narrow ? 92 : 120, k = bandH / tin, drop = narrow ? 70 : 64, yb = top + bandH + drop;
  const H = yb + 44 + (spec.efficiency != null ? 30 : 0);
  const L = labeller(W, H);
  let s = spec.title ? text(16, 16, spec.title, { size: 14, weight: 700, anchor: "start" }) : "", y = top;
  s += `<rect x="${f1(x0)}" y="${f1(top)}" width="${f1(splitX - x0)}" height="${f1(bandH)}" fill="${C.a1}" fill-opacity=".85"/>`;
  ins.forEach((o, i) => { s += inAbove ? text(x0, top - 10 - (ins.length - 1 - i) * 18, lab(o), { size: 12.5, weight: 700, anchor: "start" }) : text(x0 + 8, top + bandH / 2 + (i - (ins.length - 1) / 2) * 18, lab(o), { size: 13, weight: 700, anchor: "start", fill: "#fff" }); });
  // useful outputs run straight on to the right
  for (const o of useful) { const h = o.value * k; s += `<path d="M${f1(splitX)} ${f1(y)} H${f1(endX)} l20 ${f1(h / 2)} l-20 ${f1(h / 2)} H${f1(splitX)} Z" fill="${C.good}" fill-opacity=".8"/>`; s += outAbove ? L.place(endX + 20, y === top ? top - 10 : y + h / 2, lab(o), { size: 12.5, weight: 700, anchor: "end", fill: y === top ? C.ink : "#fff" }, [[0, 0]]) : L.place(endX + 26, y + h / 2, lab(o), { size: 12.5, weight: 700, anchor: "start" }, [[0, 0], [0, 1], [0, -1]]); y += h; }
  // wasted outputs turn down through a quarter circle; the lowest band turns first so no two bands cross
  const room = (endX - splitX - 10) / Math.max(nW, 1);
  waste.forEach((o, i) => {
    const h = Math.max(o.value * k, 2), ro = h + 10, xt = splitX + 6 + (nW - 1 - i) * room, xr = xt + ro, yy = y;
    s += `<path d="M${f1(splitX)} ${f1(yy)} H${f1(xt)} A${f1(ro)} ${f1(ro)} 0 0 1 ${f1(xr)} ${f1(yy + ro)} V${f1(yb)} l${f1(-h / 2)} 14 l${f1(-h / 2)} -14 V${f1(yy + ro)} A${f1(ro - h)} ${f1(ro - h)} 0 0 0 ${f1(xt)} ${f1(yy + h)} H${f1(splitX)} Z" fill="${C.a3}" fill-opacity=".78"/>`;
    s += L.place(xr - h / 2, yb + 26, lab(o), { size: 12.5, weight: 600 }, [[0, 0], [0, 1], [0, 2], [0, 3]]);
    y += o.value * k;
  });
  if (spec.efficiency != null) s += text(x0, H - 14, `efficiency = useful ÷ input = ${fmt(tu)} ÷ ${fmt(tin)} = ${fmt(spec.efficiency * 100)}%`, { size: 13, weight: 700, anchor: "start" });
  return { s, H };
}
export function sankeyChecks(spec) {
  const t = sankeyTotals(spec), out = [], tol = spec.tol ?? 0.005;
  out.push(check("energy is conserved: the outputs add up to the input", close(t.tout, t.tin, tol), `in ${fmt(t.tin)}, out ${fmt(t.tout)} ${spec.units || "J"}`));
  out.push(check("every transfer is positive and something is useful", spec.outputs.every((o) => o.value > 0) && t.useful > 0));
  if (spec.efficiency != null) out.push(check(`efficiency = ${fmt(spec.efficiency * 100)}%`, close(t.eff, spec.efficiency, 0.01, 0.001), `useful ÷ input = ${fmt(t.eff * 100)}%`));
  return out;
}

// ======================================================================== fit
// spec: points: [[x, y, ey?]], axisLabels: [x, y], weighted (use 1/ey² weights), fit: {m, c} claimed (and munc for
// the worst-fit half-range), showWorst, residuals (a second panel), xr/yr optional ranges
export function lsq(points, weighted = false) {
  const w = points.map((p) => (weighted && p[2] ? 1 / p[2] ** 2 : 1));
  const S = w.reduce((a, b) => a + b, 0), Sx = points.reduce((a, p, i) => a + w[i] * p[0], 0), Sy = points.reduce((a, p, i) => a + w[i] * p[1], 0);
  const Sxx = points.reduce((a, p, i) => a + w[i] * p[0] * p[0], 0), Sxy = points.reduce((a, p, i) => a + w[i] * p[0] * p[1], 0);
  const d = S * Sxx - Sx * Sx, m = (S * Sxy - Sx * Sy) / d, c = (Sy - m * Sx) / S;
  return { m, c, residuals: points.map((p) => p[1] - (m * p[0] + c)) };
}
export function worstFit(points) {
  const a = points[0], b = points.at(-1), ea = a[2] || 0, eb = b[2] || 0;
  const mMax = (b[1] + eb - (a[1] - ea)) / (b[0] - a[0]), mMin = (b[1] - eb - (a[1] + ea)) / (b[0] - a[0]);
  return { mMax, mMin, half: (mMax - mMin) / 2, lines: [[a[0], a[1] - ea, b[0], b[1] + eb], [a[0], a[1] + ea, b[0], b[1] - eb]] };
}
function fitDraw(spec, W, narrow) {
  const pts = spec.points, f = lsq(pts, spec.weighted), xs = pts.map((p) => p[0]), ys = pts.flatMap((p) => [p[1] - (p[2] || 0), p[1] + (p[2] || 0)]);
  const xr = spec.xr || [Math.min(0, ...xs), Math.max(...xs) * 1.08], yr = spec.yr || [Math.min(0, ...ys, f.c), Math.max(...ys) * 1.1];
  const pw = W - (narrow ? 70 : 90), ph = narrow ? 220 : 250, top = 50, x0 = 58;
  const rh = spec.residuals ? (narrow ? 110 : 120) : 0, H = top + ph + 50 + (rh ? rh + 50 : 0) + 10;
  const F = frame(x0, top, pw, ph, xr, yr, { xLabel: spec.axisLabels?.[0], yLabel: spec.axisLabels?.[1] });
  let s = F.s;
  const L = labeller(W, H);
  const seg = (x1, y1, x2, y2, o) => line(F.X(x1), F.Y(y1), F.X(x2), F.Y(y2), o);
  if (spec.showWorst) for (const [a, b, c2, d] of worstFit(pts).lines) s += seg(a, b, c2, d, { stroke: C.a3, w: 1.6, dash: "6 5" });
  s += seg(xr[0], f.m * xr[0] + f.c, xr[1], f.m * xr[1] + f.c, { stroke: C.a2, w: 2.6 });
  for (const [x, y, e] of pts) { if (e) s += line(F.X(x), F.Y(y - e), F.X(x), F.Y(y + e), { w: 1.6 }) + line(F.X(x) - 5, F.Y(y - e), F.X(x) + 5, F.Y(y - e), { w: 1.6 }) + line(F.X(x) - 5, F.Y(y + e), F.X(x) + 5, F.Y(y + e), { w: 1.6 }); s += dot(F.X(x), F.Y(y), 4, C.a1); L.reserve(F.X(x) - 6, F.Y(y + (e || 0)) - 2, F.X(x) + 6, F.Y(y - (e || 0)) + 2); }
  const lbl = spec.fitLabel || `best fit: gradient ${fmt(spec.fit?.m ?? f.m)}, intercept ${fmt(spec.fit?.c ?? f.c)}`;
  s += L.place(x0 + 10, top + 8, lbl, { size: 12.5, weight: 700, anchor: "start", fill: C.a2 }, [[0, 0], [0, 1], [0, 2], [0, 3]]);
  if (spec.showWorst) s += L.place(x0 + 10, top + 28, spec.worstLabel || `worst fits (dashed): ${fmt(worstFit(pts).mMin)} to ${fmt(worstFit(pts).mMax)}`, { size: 12, weight: 600, anchor: "start", fill: C.a3 }, [[0, 0], [0, 1], [0, 2], [0, 3]]);
  if (rh) {
    const ry = top + ph + 60, rm = Math.max(...f.residuals.map(Math.abs), ...pts.map((p) => p[2] || 0)) * 1.3 || 1;
    const G = frame(x0, ry, pw, rh, xr, [-rm, rm], { yLabel: "residual", yt: [-+rm.toPrecision(1), 0, +rm.toPrecision(1)].filter((v, i, a) => Math.abs(v) <= rm && a.indexOf(v) === i) });
    s += G.s;
    pts.forEach((p, i) => { s += line(G.X(p[0]), G.Y(0), G.X(p[0]), G.Y(f.residuals[i]), { stroke: C.a1, w: 2 }) + dot(G.X(p[0]), G.Y(f.residuals[i]), 3.5, C.a1); });
  }
  return { s, H };
}
export function fitChecks(spec) {
  const out = [], f = lsq(spec.points, spec.weighted), tol = spec.tol ?? 0.01;
  out.push(check("at least three data points", spec.points.length >= 3, `${spec.points.length} points`));
  if (spec.fit?.m != null) out.push(check(`least-squares gradient is ${spec.fit.m}`, close(f.m, spec.fit.m, tol, tol * Math.abs(f.m)), `${spec.weighted ? "weighted " : ""}least squares: ${fmt(f.m, 4)}`));
  if (spec.fit?.c != null) { const scale = Math.max(...spec.points.map((p) => Math.abs(p[1]))); out.push(check(`least-squares intercept is ${spec.fit.c}`, Math.abs(f.c - spec.fit.c) <= tol * scale, `${fmt(f.c, 4)}`)); }
  if (spec.fit?.munc != null) { const w = worstFit(spec.points); out.push(check(`gradient uncertainty (half the worst-fit range) is ${spec.fit.munc}`, close(w.half, spec.fit.munc, 0.05), `${fmt(w.mMin)} to ${fmt(w.mMax)}: ±${fmt(w.half)}`)); }
  if (spec.fit?.throughOrigin != null) { const scale = Math.max(...spec.points.map((p) => Math.abs(p[1]))); out.push(check(`the line ${spec.fit.throughOrigin ? "passes" : "does not pass"} through the origin`, (Math.abs(f.c) <= 0.02 * scale) === spec.fit.throughOrigin, `intercept ${fmt(f.c)}`)); }
  if (spec.fit?.withinErrors != null) { const inside = spec.points.every((p, i) => !p[2] || Math.abs(f.residuals[i]) <= p[2]); out.push(check(`the line ${spec.fit.withinErrors ? "passes through every error bar" : "misses at least one error bar"}`, inside === spec.fit.withinErrors)); }
  return out;
}

register({
  vectors: { draw: vectorsDraw, checks: vectorChecks, widths: [660, 380] },
  motion: { draw: motionDraw, checks: motionChecks, widths: [760, 380] },
  wave: { draw: waveDraw, checks: waveChecks, widths: [700, 380] },
  sankey: { draw: sankeyDraw, checks: sankeyChecks, widths: [680, 380] },
  fit: { draw: fitDraw, checks: fitChecks, widths: [640, 380] },
});
