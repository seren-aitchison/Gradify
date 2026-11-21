// Gradify Visual Learning Engine: physics renderers, part 2 (see phys-renderers.js for part 1 and the conventions).
//
//   field        field lines and equipotentials of point charges, masses, magnetic poles and long straight wires,
//                or a uniform field between plates: line counts ∝ |q|, directions (out of +, into −, into masses,
//                round wires by the right-hand rule), equipotentials ⟂ field lines, null points, E, V, B and V/d
//   transitions  energy levels and photon transitions: hydrogen levels from −13.6 eV/n², ΔE, λ = hc/ΔE, f = ΔE/h,
//                emission or absorption from the direction, the spectral region; an optional line spectrum
//   scale        a logarithmic scale (lengths, times, masses, the EM spectrum, SI prefixes): markers in their stated
//                regions, the span in orders of magnitude, EM bands in order with f = c/λ, prefix exponents
//   nuclear      decay chains and nuclear equations: A and Z conserved at every step, symbols from Z, α/β counts,
//                Q = Δm c² from masses; drawn as a chain of nuclides or on a chart of Z against N
//   refraction   rays at a boundary: Snell's law, reflection, bending towards or away from the normal, the
//                critical angle and total internal reflection
import { register, text, line, arrow, col, f1, check, COLOURS as C } from "./renderers.js";
import { SYMBOLS } from "./chem-core.js";
import { close, fmt, tw, labeller, frame } from "./phys-renderers.js";

const wrapWords = (str, n) => String(str).split(" ").reduce((o, w) => { const t = o.at(-1) ? `${o.at(-1)} ${w}` : w; if (t.length > n && o.at(-1)) o.push(w); else o[o.length - 1] = t; return o; }, [""]);
const rad = (d) => (d * Math.PI) / 180, deg = (r) => (r * 180) / Math.PI;
const dot = (x, y, r = 4, fill = C.ink) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${fill}"/>`;
export const CONST = { k: 8.9875517923e9, G: 6.6743e-11, mu4pi: 1e-7, h: 6.62607015e-34, c: 2.99792458e8, e: 1.602176634e-19, hc_eVnm: 1239.84198, u_MeV: 931.49410242 };

// ======================================================================== field
// spec: kind "electric" | "gravitational" | "magnetic", range: {x: [a, b], y: [c, d]} (metres),
// charges: [{x, y, q, label}] (q in C; masses in kg; magnetic poles: q > 0 is N), wires: [{x, y, I}] (A, I > 0 out of
// the page), uniform: {V, d, plus: "top" | "bottom" | "left" | "right", n} (a uniform field between plates),
// linesPerUnit (lines per unit |q| in the spec's units, default chosen from the largest source), equipotentials:
// true | [V in SI], claims: [{type: "null" | "direction" | "E" | "V" | "lines" | "uniform", at, angle, value, charge, count}]
const SI = (spec, src) => (src.I != null ? 2 * CONST.mu4pi : spec.kind === "gravitational" ? CONST.G : spec.kind === "magnetic" ? CONST.mu4pi : CONST.k);
export function fieldAt(spec, x, y, si = false) {
  let ex = 0, ey = 0;
  for (const c of spec.charges || []) {
    const dx = x - c.x, dy = y - c.y, r2 = dx * dx + dy * dy, r3 = r2 * Math.sqrt(r2), s = (spec.kind === "gravitational" ? -c.q : c.q) * (si ? SI(spec, c) : 1);
    ex += (s * dx) / r3; ey += (s * dy) / r3;
  }
  for (const w of spec.wires || []) { const dx = x - w.x, dy = y - w.y, r2 = dx * dx + dy * dy, s = w.I * (si ? SI(spec, w) : 1); ex += (-s * dy) / r2; ey += (s * dx) / r2; }
  if (spec.uniform) { const u = spec.uniform, E = si ? u.V / u.d : 1, d = { top: [0, -1], bottom: [0, 1], left: [1, 0], right: [-1, 0] }[u.plus || "top"]; ex += E * d[0]; ey += E * d[1]; }
  return [ex, ey];
}
export function potentialAt(spec, x, y, si = false) {
  let v = 0;
  for (const c of spec.charges || []) v += ((spec.kind === "gravitational" ? -c.q : c.q) * (si ? SI(spec, c) : 1)) / Math.hypot(x - c.x, y - c.y);
  return v;
}
const span = (spec) => Math.max(spec.range.x[1] - spec.range.x[0], spec.range.y[1] - spec.range.y[0]);
/** trace every field line: {src, pts, dir (+1: arrows run along pts), end} */
export function fieldLines(spec, expand = 1) {
  const cs = spec.charges || [], S = span(spec), r0 = S * 0.035, h = (S * Math.sqrt(expand)) / 400, out = [], ex = (expand - 1) * S;
  if (!cs.length) return out;
  const qmax = Math.max(...cs.map((c) => Math.abs(c.q))), lpu = spec.linesPerUnit ?? 8 / qmax;
  const grav = spec.kind === "gravitational", pos = cs.reduce((t, c) => t + Math.max(0, c.q), 0), neg = cs.reduce((t, c) => t + Math.max(0, -c.q), 0);
  const inBox = (x, y) => x >= spec.range.x[0] - S * 0.02 - ex && x <= spec.range.x[1] + S * 0.02 + ex && y >= spec.range.y[0] - S * 0.02 - ex && y <= spec.range.y[1] + S * 0.02 + ex;
  cs.forEach((c, i) => {
    // electric and magnetic lines leave + (N) sources; gravitational lines end on every mass, so they are traced backwards
    const emits = grav ? false : c.q > 0, traceNeg = !grav && c.q < 0 && (neg > pos || !pos);
    if (!emits && !grav && !traceNeg) return;
    const n = Math.round(lpu * Math.abs(c.q)), sgn = emits ? 1 : -1, off = rad(c.start ?? spec.start ?? 0);
    for (let j = 0; j < n; j++) {
      const a = off + (2 * Math.PI * j) / n, pts = [[c.x + r0 * Math.cos(a), c.y + r0 * Math.sin(a)]];
      let end = null;
      for (let k = 0; k < 4000 * expand; k++) {
        const [x, y] = pts.at(-1), step = (px, py) => { const [ex, ey] = fieldAt(spec, px, py), m = Math.hypot(ex, ey) || 1; return [(sgn * ex) / m, (sgn * ey) / m]; };
        const [k1x, k1y] = step(x, y), [k2x, k2y] = step(x + (h / 2) * k1x, y + (h / 2) * k1y);
        const nx = x + h * k2x, ny = y + h * k2y;
        pts.push([nx, ny]);
        const hitI = cs.findIndex((o, oi) => oi !== i && Math.hypot(nx - o.x, ny - o.y) < r0 * 0.9);
        if (hitI >= 0) { end = hitI; break; }
        if (!inBox(nx, ny)) break;
      }
      // a line traced back from a negative charge that ends on a positive one was already drawn from that charge
      if (traceNeg && end != null && cs[end].q > 0) continue;
      out.push({ src: i, pts, dir: sgn, end });
    }
  });
  return out;
}
/** contour segments of f on the range (marching squares) */
function contours(spec, f, level, nx = 150) {
  const { x: [x0, x1], y: [y0, y1] } = spec.range, ny = Math.round((nx * (y1 - y0)) / (x1 - x0)), dx = (x1 - x0) / nx, dy = (y1 - y0) / ny, segs = [];
  const g = []; for (let j = 0; j <= ny; j++) { g.push([]); for (let i = 0; i <= nx; i++) g[j].push(f(x0 + i * dx, y0 + j * dy)); }
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const v = [g[j][i], g[j][i + 1], g[j + 1][i + 1], g[j + 1][i]], P = [[x0 + i * dx, y0 + j * dy], [x0 + (i + 1) * dx, y0 + j * dy], [x0 + (i + 1) * dx, y0 + (j + 1) * dy], [x0 + i * dx, y0 + (j + 1) * dy]];
    if (v.some((t) => !Number.isFinite(t) || Math.abs(t) > 1e12)) continue;
    const cut = [];
    for (let e = 0; e < 4; e++) { const a = v[e], b = v[(e + 1) % 4]; if ((a - level) * (b - level) < 0) { const t = (level - a) / (b - a), p = P[e], q = P[(e + 1) % 4]; cut.push([p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]); } }
    if (cut.length === 2) segs.push(cut); else if (cut.length === 4) segs.push([cut[0], cut[1]], [cut[2], cut[3]]);
  }
  return segs;
}
function equipotentialLevels(spec) {
  if (Array.isArray(spec.equipotentials)) return spec.equipotentials.map((v) => v / (SI(spec, spec.charges[0]))); // SI → drawing units
  const cs = spec.charges || [], S = span(spec), lv = [];
  const cx = cs.reduce((t, c) => t + c.x, 0) / cs.length, cy = cs.reduce((t, c) => t + c.y, 0) / cs.length;
  for (const c of cs) {
    let ux = c.x - cx, uy = c.y - cy; const m = Math.hypot(ux, uy); if (m < 1e-12) { ux = 1; uy = 0; } else { ux /= m; uy /= m; }
    for (const r of [0.08, 0.15, 0.27]) lv.push(potentialAt(spec, c.x + ux * r * S, c.y + uy * r * S));
  }
  if (spec.kind === "electric" && Math.abs(cs.reduce((t, c) => t + c.q, 0)) < 1e-12 * Math.max(...cs.map((c) => Math.abs(c.q)))) lv.push(0);
  return [...new Set(lv.map((v) => +v.toPrecision(6)))];
}
function fieldDraw(spec, W, narrow) {
  const { x: [x0, x1], y: [y0, y1] } = spec.range, pad = 14, top = spec.title ? 30 : 12;
  const notes = spec.notes || [], noteH = notes.length * 18 + (notes.length ? 12 : 0);
  const pw = W - 2 * pad, ph = Math.min(pw * ((y1 - y0) / (x1 - x0)), narrow ? 420 : 470), k = Math.min(pw / (x1 - x0), ph / (y1 - y0));
  const ox = pad + (pw - k * (x1 - x0)) / 2, X = (x) => ox + (x - x0) * k, Y = (y) => top + ph - (y - y0) * k, H = top + ph + 12 + noteH;
  let s = `<defs><clipPath id="fc${W}${(spec.id || "").length}"><rect x="${f1(X(x0))}" y="${f1(Y(y1))}" width="${f1(k * (x1 - x0))}" height="${f1(k * (y1 - y0))}"/></clipPath></defs>`;
  s += `<rect x="${f1(X(x0))}" y="${f1(Y(y1))}" width="${f1(k * (x1 - x0))}" height="${f1(k * (y1 - y0))}" fill="${C.panel}" rx="6"/>`;
  if (spec.title) s += text(16, 16, spec.title, { size: 14, weight: 700, anchor: "start" });
  const clip = `clip-path="url(#fc${W}${(spec.id || "").length})"`, fl = col(spec.colour || (spec.kind === "magnetic" ? "a4" : spec.kind === "gravitational" ? "a1" : "a1"));
  const head = (x, y, ux, uy, c = fl) => { const L = 9, b = 4.2; return `<path d="M${f1(x + ux * L / 2)} ${f1(y + uy * L / 2)} L${f1(x - ux * L / 2 - uy * b)} ${f1(y - uy * L / 2 + ux * b)} L${f1(x - ux * L / 2 + uy * b)} ${f1(y - uy * L / 2 - ux * b)} Z" fill="${c}"/>`; };
  if (spec.uniform) {
    const u = spec.uniform, n = u.n || 7, vert = !u.plus || u.plus === "top" || u.plus === "bottom";
    const plusSide = u.plus || "top", Lp = labeller(W, H);
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n;
      if (vert) { const x = X(x0 + t * (x1 - x0)), down = plusSide === "top"; s += line(x, Y(y1) + 8, x, Y(y0) - 8, { stroke: fl, w: 2 }) + head(x, (Y(y0) + Y(y1)) / 2, 0, down ? 1 : -1); }
      else { const y = Y(y0 + t * (y1 - y0)), right = plusSide === "left"; s += line(X(x0) + 8, y, X(x1) - 8, y, { stroke: fl, w: 2 }) + head((X(x0) + X(x1)) / 2, y, right ? 1 : -1, 0); }
    }
    for (let i = 1; i < 4; i++) { const t = i / 4; s += vert ? line(X(x0), Y(y0 + t * (y1 - y0)), X(x1), Y(y0 + t * (y1 - y0)), { stroke: C.a3, w: 1.4, dash: "6 5" }) : line(X(x0 + t * (x1 - x0)), Y(y0), X(x0 + t * (x1 - x0)), Y(y1), { stroke: C.a3, w: 1.4, dash: "6 5" }); }
    const plate = (a, b, c2, d, lab) => `<rect x="${f1(Math.min(a, c2))}" y="${f1(Math.min(b, d))}" width="${f1(Math.abs(c2 - a) || 8)}" height="${f1(Math.abs(d - b) || 8)}" fill="${C.ink}"/>` + lab;
    const pl = { top: [X(x0), Y(y1) - 4, X(x1), Y(y1) + 4], bottom: [X(x0), Y(y0) - 4, X(x1), Y(y0) + 4], left: [X(x0) - 4, Y(y1), X(x0) + 4, Y(y0)], right: [X(x1) - 4, Y(y1), X(x1) + 4, Y(y0)] };
    const opp = { top: "bottom", bottom: "top", left: "right", right: "left" }[plusSide];
    s += plate(...pl[plusSide], "") + plate(...pl[opp], "");
    const tag = (side, lab) => { const [a, b, c2, d] = pl[side]; return vert ? Lp.place(Math.max(a, c2) - 6, (side === "top" ? Math.min(b, d) + 14 : Math.max(b, d) - 14), lab, { size: 13, weight: 700, anchor: "end" }) : Lp.place((a + c2) / 2 + (side === "left" ? 16 : -16), Y(y1) + 14, lab, { size: 13, weight: 700 }); };
    s += tag(plusSide, u.plusLabel || `+${fmt(u.V)} V`) + tag(opp, u.minusLabel || "0 V");
  } else {
    if (spec.equipotentials) for (const lv of equipotentialLevels(spec)) { const sg = contours(spec, (x, y) => potentialAt(spec, x, y), lv); s += `<path d="${sg.map(([a, b]) => `M${f1(X(a[0]))} ${f1(Y(a[1]))}L${f1(X(b[0]))} ${f1(Y(b[1]))}`).join("")}" stroke="${C.a3}" stroke-width="1.5" stroke-dasharray="5 4" fill="none" ${clip}/>`; }
    for (const L of fieldLines(spec)) {
      s += `<path d="${L.pts.map(([a, b], i) => `${i ? "L" : "M"}${f1(X(a))} ${f1(Y(b))}`).join("")}" stroke="${fl}" stroke-width="1.9" fill="none" stroke-linejoin="round" ${clip}/>`;
      // the arrow part-way along the visible part of the line, pointing along the field
      const vis = L.pts.filter(([a, b]) => a >= x0 && a <= x1 && b >= y0 && b <= y1), m = Math.floor(vis.length * (L.end == null ? 0.35 : 0.5));
      if (vis.length > 4) { const [a, b] = vis[m], [c2, d] = vis[Math.min(m + 2, vis.length - 1)], ux = (X(c2) - X(a)) * L.dir, uy = (Y(d) - Y(b)) * L.dir, mm = Math.hypot(ux, uy) || 1; s += head(X(a), Y(b), ux / mm, uy / mm); }
    }
    // magnetic field lines round wires: contours of Σ I ln r, with arrows from the right-hand rule
    if (spec.wires?.length) {
      const w0 = spec.wires[0], S = span(spec), psi = (x, y) => spec.wires.reduce((t, w) => t + w.I * Math.log(Math.hypot(x - w.x, y - w.y)), 0);
      for (const r of spec.wireRadii || [0.08, 0.15, 0.24, 0.35, 0.48]) {
        const sg = contours(spec, psi, psi(w0.x + r * S, w0.y + 1e-9));
        s += `<path d="${sg.map(([a, b]) => `M${f1(X(a[0]))} ${f1(Y(a[1]))}L${f1(X(b[0]))} ${f1(Y(b[1]))}`).join("")}" stroke="${fl}" stroke-width="1.9" fill="none" ${clip}/>`;
        for (const [a] of sg.filter((_, i) => i % Math.max(1, Math.floor(sg.length / 4)) === 0).slice(0, 4)) { const [bx, by] = fieldAt(spec, a[0], a[1]), m = Math.hypot(bx, by) || 1; s += head(X(a[0]), Y(a[1]), bx / m, -by / m); }
      }
      for (const w of spec.wires) s += `<circle cx="${f1(X(w.x))}" cy="${f1(Y(w.y))}" r="11" fill="${C.panel}" stroke="${C.ink}" stroke-width="2"/>` + (w.I > 0 ? dot(X(w.x), Y(w.y), 3.2) : line(X(w.x) - 6, Y(w.y) - 6, X(w.x) + 6, Y(w.y) + 6, { w: 2 }) + line(X(w.x) - 6, Y(w.y) + 6, X(w.x) + 6, Y(w.y) - 6, { w: 2 }));
    }
    for (const c of spec.charges || []) {
      const fill = spec.kind === "gravitational" ? C.soft : c.q > 0 ? C.a2 : C.a1, r = spec.kind === "gravitational" ? 9 + 7 * Math.sqrt(Math.abs(c.q) / Math.max(...spec.charges.map((d) => Math.abs(d.q)))) : 13;
      s += `<circle cx="${f1(X(c.x))}" cy="${f1(Y(c.y))}" r="${f1(r)}" fill="${fill}" stroke="#fff" stroke-width="2"/>` + text(X(c.x), Y(c.y) + 0.5, c.label || (c.q > 0 ? "+" : "−"), { size: (c.label || "").length > 2 ? 10.5 : 14, weight: 800, fill: "#fff" });
    }
  }
  for (const c of (spec.claims || []).filter((c) => c.at && c.mark !== false)) { s += dot(X(c.at[0]), Y(c.at[1]), 4.5, C.ink); if (c.label) s += text(X(c.at[0]) + 8, Y(c.at[1]) - 12, c.label, { size: 12.5, weight: 700, anchor: "start" }); }
  notes.forEach((n, i) => { s += text(16, top + ph + 22 + i * 18, n, { size: 12.5, anchor: "start", fill: C.ink }); });
  return { s, H };
}
export function findNull(spec, at) {
  const S = span(spec); let best = at, bv = Infinity, r = S * 0.15;
  for (let it = 0; it < 7; it++) { const c = best; for (let i = -10; i <= 10; i++) for (let j = -10; j <= 10; j++) { const x = c[0] + (r * i) / 10, y = c[1] + (r * j) / 10, [ex, ey] = fieldAt(spec, x, y), v = Math.hypot(ex, ey); if (v < bv) { bv = v; best = [x, y]; } } r /= 5; }
  return { at: best, E: bv };
}
export function fieldChecks(spec) {
  const out = [], cs = spec.charges || [], S = span(spec), tol = spec.tol ?? 0.01, grav = spec.kind === "gravitational";
  if (cs.length) {
    // counted on a much larger region, so lines that leave the picture still reach their sink
    const ls = fieldLines(spec, 8), qmax = Math.max(...cs.map((c) => Math.abs(c.q))), lpu = spec.linesPerUnit ?? 8 / qmax;
    // lines touching each source (starting or ending there): their number is proportional to |q|
    const touch = cs.map((_, i) => ls.filter((l) => l.src === i || l.end === i).length);
    const expect = cs.map((c) => Math.round(lpu * Math.abs(c.q)));
    // a source the lines are traced from has exactly its share; a sink gets those that reach it (± discretisation)
    const ok = cs.every((c, i) => (grav || c.q > 0 ? touch[i] === expect[i] : Math.abs(touch[i] - expect[i]) <= Math.max(1, Math.round(expect[i] * 0.25))));
    out.push(check("the number of field lines at each source is proportional to its size", ok, cs.map((c, i) => `${c.label || (c.q > 0 ? "+" : "−")}${fmt(Math.abs(c.q))}: ${touch[i]} lines (${expect[i]} expected)`).join("; ")));
    // drawn directions: away from + sources and N poles, into − sources, S poles and every mass
    let wrong = 0;
    for (const l of ls) { const c = cs[l.src], [a, b] = l.pts[0], [p, q] = l.pts[2], out_ = ((p - a) * (a - c.x) + (q - b) * (b - c.y)) * l.dir > 0; if (out_ !== (!grav && c.q > 0)) wrong++; }
    out.push(check(grav ? "every field line points into a mass" : "field lines point away from positive (N) sources and into negative (S) ones", wrong === 0 && ls.length > 0, `${ls.length} lines, ${wrong} the wrong way`));
    const labelOk = cs.every((c) => spec.kind === "magnetic" ? (c.label || "") === (c.q > 0 ? "N" : "S") : !c.label || !/^[+−-]/.test(c.label) || (c.label[0] === "+") === c.q > 0);
    out.push(check(spec.kind === "magnetic" ? "north poles are labelled N and south poles S" : "every sign label matches the sign of its charge", labelOk));
    if (grav) out.push(check("masses are positive", cs.every((c) => c.q > 0)));
    if (spec.equipotentials) {
      let n = 0, bad = 0;
      for (const lv of equipotentialLevels(spec)) for (const [a, b] of contours(spec, (x, y) => potentialAt(spec, x, y), lv)) {
        const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, [ex, ey] = fieldAt(spec, mx, my), tx = b[0] - a[0], ty = b[1] - a[1], m = Math.hypot(ex, ey) * Math.hypot(tx, ty);
        if (!m) continue; n++; if (Math.abs((ex * tx + ey * ty) / m) > Math.sin(rad(8))) bad++;
      }
      out.push(check("equipotentials cross the field lines at right angles", n > 0 && bad / n < 0.03, `${n} segments, ${bad} more than 8° off perpendicular`));
    }
  }
  for (const w of spec.wires || []) {
    // right-hand rule: current out of the page → anticlockwise field (seen from above)
    const S2 = span(spec) * 0.05, [bx, by] = fieldAt({ ...spec, charges: [], uniform: null, wires: [w] }, w.x + S2, w.y);
    out.push(check(`field round the wire at (${w.x}, ${w.y}) circulates ${w.I > 0 ? "anticlockwise (current out of the page)" : "clockwise (current into the page)"}`, w.I > 0 ? by > 0 : by < 0, `B just to the right of the wire points ${by > 0 ? "up" : "down"} the page`));
  }
  for (const c of spec.claims || []) {
    if (c.type === "null") { const r = findNull(spec, c.at), d = Math.hypot(r.at[0] - c.at[0], r.at[1] - c.at[1]); out.push(check(c.name || `the field is zero at (${c.at.join(", ")})`, d <= S * 0.01 && r.E < 1e-6 * Math.hypot(...fieldAt(spec, c.at[0] + S * 0.1, c.at[1])), `search finds E = 0 at (${r.at.map((v) => fmt(v)).join(", ")})`)); }
    else if (c.type === "direction") { const [ex, ey] = fieldAt(spec, c.at[0], c.at[1]), a = ((deg(Math.atan2(ey, ex)) % 360) + 360) % 360, d = Math.abs((((a - c.angle) % 360) + 540) % 360 - 180); out.push(check(c.name || `the field at (${c.at.join(", ")}) points at ${c.angle}°`, d <= 2, `${a.toFixed(1)}°`)); }
    else if (c.type === "E") { const E = Math.hypot(...fieldAt(spec, c.at[0], c.at[1], true)); out.push(check(c.name || `field strength at (${c.at.join(", ")}) is ${fmt(c.value)}`, close(E, c.value, c.tol ?? tol), `${fmt(E, 4)} (SI)`)); }
    else if (c.type === "V") { const V = potentialAt(spec, c.at[0], c.at[1], true); out.push(check(c.name || `potential at (${c.at.join(", ")}) is ${fmt(c.value)}`, close(V, c.value, c.tol ?? tol), `${fmt(V, 4)} (SI)`)); }
    else if (c.type === "lines") { const n = fieldLines(spec).filter((l) => l.src === c.charge || l.end === c.charge).length; out.push(check(c.name || `${c.count} lines at source ${c.charge}`, n === c.count, `${n} drawn`)); }
    else if (c.type === "uniform") out.push(check(c.name || `E = V/d = ${fmt(c.value)} V m^{-1}`, !!spec.uniform && close(spec.uniform.V / spec.uniform.d, c.value, c.tol ?? tol), spec.uniform ? `${fmt(spec.uniform.V)} ÷ ${fmt(spec.uniform.d)} = ${fmt(spec.uniform.V / spec.uniform.d)}` : "no uniform field"));
    else out.push(check(`claim type ${c.type} is known`, false));
  }
  if (spec.uniform) out.push(check("uniform field lines run from the + plate to the − plate, evenly spaced", true, `plus plate: ${spec.uniform.plus || "top"}`));
  if (!out.length) out.push(check("the field has something to check", false));
  return out;
}

// ======================================================================== transitions
// spec: atom "H" (levels checked against −13.6 eV/n²), levels: [{n?, E (eV), label?}], transitions:
// [{from, to, lambda (nm), E (eV), f (Hz), region, label}] (from/to are level n when levels have n, else indices),
// spectrum: true (a line spectrum under the diagram), scale: "linear" | "sqrt" (sqrt spreads the upper levels;
// the diagram then says "not to scale"), unit "eV"
const levelOf = (spec, k) => (spec.levels.some((l) => l.n != null) ? spec.levels.find((l) => l.n === k) : spec.levels[k]);
export const photon = (dE) => ({ E: dE, lambda: CONST.hc_eVnm / dE, f: (dE * CONST.e) / CONST.h });
export const regionOf = (nm) => (nm < 0.01 ? "gamma" : nm < 10 ? "X-ray" : nm < 380 ? "ultraviolet" : nm <= 750 ? "visible" : nm < 1e6 ? "infrared" : nm < 1e9 ? "microwave" : "radio");
export function nmColour(nm) {
  if (nm < 380 || nm > 750) return C.soft;
  const stops = [[380, [120, 0, 200]], [440, [40, 40, 255]], [490, [0, 180, 230]], [530, [20, 170, 60]], [580, [230, 200, 0]], [620, [255, 120, 0]], [750, [210, 0, 0]]];
  let i = 0; while (i < stops.length - 2 && nm > stops[i + 1][0]) i++;
  const [a, ca] = stops[i], [b, cb] = stops[i + 1], t = (nm - a) / (b - a);
  return `rgb(${ca.map((v, j) => Math.round(v + t * (cb[j] - v))).join(",")})`;
}
function transitionsDraw(spec, W, narrow) {
  const lv = spec.levels, Es = lv.map((l) => l.E), lo = Math.min(...Es), hi = Math.max(...Es), sq = spec.scale === "sqrt";
  const tr = (e) => (sq ? -Math.sqrt(Math.max(0, hi - e)) : e), top = spec.title ? 56 : 30, ph = narrow ? 300 : 300;
  const specH = spec.spectrum ? 92 : 0, H = top + ph + 30 + specH + (sq ? 18 : 0);
  const Y = (e) => top + ph - ((tr(e) - tr(lo)) / (tr(hi) - tr(lo) || 1)) * ph, x0 = 60, labW = narrow ? 118 : 160, x1 = W - labW - 10;
  const L = labeller(W, H);
  let s = spec.title ? text(16, 16, spec.title, { size: 14, weight: 700, anchor: "start" }) : "";
  s += arrow(30, top + ph + 6, 30, top - 10, { w: 1.5, head: 7 }) + text(24, top - 18, `E / ${spec.units || "eV"}`, { size: 12, weight: 600, anchor: "start", fill: C.soft });
  // level labels spread apart so close levels stay readable, joined to their lines by short leaders
  const ys = lv.map((l) => Y(l.E)), order = ys.map((y, i) => i).sort((a, b) => ys[b] - ys[a]), ly = [...ys], gap = 16;
  for (let k = 1; k < order.length; k++) if (ly[order[k - 1]] - ly[order[k]] < gap) ly[order[k]] = ly[order[k - 1]] - gap;
  const shift = Math.min(0, ...ly.map((y) => y - 10)); for (const i of order) ly[i] -= shift;
  lv.forEach((l, i) => {
    s += line(x0, ys[i], x1, ys[i], { w: 2.4 }) + line(x1, ys[i], x1 + 12, ly[i], { stroke: C.line, w: 1 });
    s += text(x1 + 16, ly[i], l.label || `${l.n != null ? `n = ${l.n}` : ""}${l.n != null ? "   " : ""}${fmt(l.E)} ${spec.units || "eV"}`, { size: 12, weight: 600, anchor: "start" });
    L.reserve(x1 + 14, ly[i] - 8, W, ly[i] + 8);
  });
  const ts = spec.transitions || [], xs = ts.map((_, i) => x0 + 26 + ((x1 - x0 - 52) * (i + 0.5)) / Math.max(ts.length, 1));
  ts.forEach((t, i) => {
    const a = levelOf(spec, t.from), b = levelOf(spec, t.to); if (!a || !b) return;
    const p = photon(Math.abs(a.E - b.E)), c = t.colour ? col(t.colour) : nmColour(p.lambda);
    s += arrow(xs[i], Y(a.E), xs[i], Y(b.E), { stroke: c, w: 2.6, head: 9 });
    L.reserve(xs[i] - 3, Math.min(Y(a.E), Y(b.E)), xs[i] + 3, Math.max(Y(a.E), Y(b.E)));
  });
  ts.forEach((t, i) => {
    const a = levelOf(spec, t.from), b = levelOf(spec, t.to); if (!a || !b) return;
    const p = photon(Math.abs(a.E - b.E)), lab = t.label ?? `${fmt(t.lambda ?? p.lambda)} nm`;
    if (lab) s += L.place(xs[i] + 5, (Y(a.E) + Y(b.E)) / 2, lab, { size: 11.5, weight: 700, anchor: "start", fill: C.ink }, [[0, 0], [0, -1], [0, 1], [0, -2], [0, 2], [-1.2, 0]]);
  });
  if (sq) s += text(x0, top + ph + 22, "energy axis not to scale (upper levels spread out)", { size: 11.5, fill: C.soft, anchor: "start" });
  if (spec.spectrum) {
    const lam = ts.map((t) => photon(Math.abs(levelOf(spec, t.from).E - levelOf(spec, t.to).E)).lambda), a = Math.min(380, ...lam) * 0.95, b = Math.max(750, ...lam) * 1.03;
    const sy = top + ph + 30 + (sq ? 18 : 0), sx = (l) => 20 + ((l - a) / (b - a)) * (W - 40), absn = spec.spectrum === "absorption";
    s += `<rect x="20" y="${f1(sy)}" width="${f1(W - 40)}" height="34" fill="${absn ? C.panel : "#14151f"}" rx="3"/>`;
    if (absn) for (let l = 380; l < 750; l += 4) s += `<rect x="${f1(sx(l))}" y="${f1(sy)}" width="${f1(sx(l + 4) - sx(l) + 0.6)}" height="34" fill="${nmColour(l)}"/>`;
    const SL = labeller(W, H);
    lam.forEach((l) => { s += `<rect x="${f1(sx(l) - 1.6)}" y="${f1(sy)}" width="3.2" height="34" fill="${absn ? "#111" : nmColour(l) === C.soft ? "#9aa" : nmColour(l)}"/>`; s += SL.place(sx(l), sy + 46, `${fmt(l)}`, { size: 11, fill: C.soft }, [[0, 0], [0, 1], [0, 2]]); });
    s += text(W - 20, sy - 9, `λ / nm (${absn ? "absorption" : "emission"} spectrum)`, { size: 11.5, anchor: "end", fill: C.soft });
  }
  return { s, H };
}
export function transitionChecks(spec) {
  const out = [], tol = spec.tol ?? 0.01;
  if (spec.atom === "H") { const bad = spec.levels.filter((l) => !close(l.E, -13.6057 / l.n ** 2, 0.005, 0.01)); out.push(check("hydrogen levels follow E_{n} = −13.6 eV / n^{2}", !bad.length, bad.map((l) => `n = ${l.n}: ${l.E} against ${fmt(-13.6057 / l.n ** 2)}`).join("; ") || `${spec.levels.length} levels`)); }
  const sorted = [...spec.levels].every((l, i, a) => !i || a[i - 1].E !== l.E);
  out.push(check("levels have distinct energies", sorted));
  for (const t of spec.transitions || []) {
    const a = levelOf(spec, t.from), b = levelOf(spec, t.to);
    if (!a || !b) { out.push(check(`transition ${t.from} → ${t.to} joins two drawn levels`, false)); continue; }
    const dE = Math.abs(a.E - b.E), p = photon(dE), nm = `${t.from} → ${t.to}`, em = a.E > b.E;
    if (t.E != null) out.push(check(`${nm}: photon energy ${t.E} eV`, close(dE, t.E, tol, 0.005), `ΔE = ${fmt(dE, 4)} eV`));
    if (t.lambda != null) out.push(check(`${nm}: λ = hc/ΔE = ${t.lambda} nm`, close(p.lambda, t.lambda, tol), `${fmt(p.lambda, 4)} nm`));
    if (t.f != null) out.push(check(`${nm}: f = ΔE/h = ${fmt(t.f)} Hz`, close(p.f, t.f, tol), `${fmt(p.f, 4)} Hz`));
    if (t.kind) out.push(check(`${nm} is ${t.kind}`, (t.kind === "emission") === em, em ? "downward: a photon is emitted" : "upward: a photon is absorbed"));
    if (t.region) out.push(check(`${nm} is in the ${t.region}`, regionOf(p.lambda) === t.region, `${fmt(p.lambda)} nm is ${regionOf(p.lambda)}`));
  }
  if (!(spec.transitions || []).length && spec.atom !== "H") out.push(check("the diagram has a transition to check", false));
  return out;
}

// ======================================================================== scale
// spec: quantity, unit, min, max (log10 limits), markers: [{label, value, region?, f?}], regions: [{label, from, to,
// colour}], kind: "em" | "prefix" | undefined, claims: [{type: "span", value, tol} | {type: "orders", a, b, value}]
const EM_ORDER = ["radio", "microwave", "infrared", "visible", "ultraviolet", "x-ray", "gamma"];
export const PREFIX = { quecto: -30, ronto: -27, yocto: -24, zepto: -21, atto: -18, femto: -15, pico: -12, nano: -9, micro: -6, milli: -3, centi: -2, deci: -1, deca: 1, hecto: 2, kilo: 3, mega: 6, giga: 9, tera: 12, peta: 15, exa: 18, zetta: 21, yotta: 24, ronna: 27, quetta: 30 };
function scaleDraw(spec, W, narrow) {
  const lo = spec.min, hi = spec.max, ms = spec.markers || [], rs = spec.regions || [], decades = hi - lo;
  const every = [1, 2, 3, 5, 10, 15, 20].find((s) => decades / s <= (narrow ? 12 : 13));
  let s = spec.title ? text(16, 16, spec.title, { size: 14, weight: 700, anchor: "start" }) : "", H;
  if (!narrow) {
    const x0 = 34, x1 = W - 34, X = (v) => x0 + ((Math.log10(v) - lo) / decades) * (x1 - x0);
    // markers: a stalk up from the axis to the label, staggered onto levels so labels never overprint
    const sorted = ms.map((m, i) => ({ m, i, x: Math.min(Math.max(X(m.value), x0 + tw(m.label, 12) / 2 - 30), x1 - tw(m.label, 12) / 2 + 30) })).sort((a, b) => a.x - b.x), lvl = [];
    for (const o of sorted) { let k = 0; const w = tw(o.m.label, 12) + 12; while (lvl[k] != null && lvl[k] > o.x - w / 2) k++; lvl[k] = o.x + w / 2; o.k = k; }
    const ay = (spec.title ? 44 : 20) + 34 + lvl.length * 22;
    H = ay + (rs.length ? 92 : 50);
    const L = labeller(W, H);
    s += arrow(x0, ay, x1 + 12, ay, { w: 1.8, head: 8 });
    for (let e = Math.ceil(lo / every) * every; e <= hi; e += every) { s += line(X(10 ** e), ay - 5, X(10 ** e), ay + 5, { w: 1.4 }) + text(X(10 ** e), ay + 18, `10^{${e}}`, { size: 11.5, fill: C.soft }); L.reserve(X(10 ** e) - 16, ay + 10, X(10 ** e) + 16, ay + 26); }
    s += text(W - 16, spec.title ? 16 : 12, `${spec.quantity || ""}${spec.units ? ` / ${spec.units}` : ""} (logarithmic scale)`, { size: 12, weight: 600, anchor: "end", fill: C.soft });
    rs.forEach((r, i) => { const a = X(Math.max(r.from, 10 ** lo)), b = X(Math.min(r.to, 10 ** hi)); s += `<rect x="${f1(a)}" y="${f1(ay + 32)}" width="${f1(b - a)}" height="18" fill="${col(r.colour || ["a1", "a4", "a3", "a5", "a2", "good"][i % 6])}" fill-opacity=".75"/>`; L.reserve(a, ay + 32, b, ay + 50); });
    rs.forEach((r) => { const a = X(Math.max(r.from, 10 ** lo)), b = X(Math.min(r.to, 10 ** hi)); s += L.place((a + b) / 2, ay + 62, r.label, { size: 11.5, weight: 600 }, [[0, 0], [0, 1], [0, 2]]); });
    // markers: a stalk up from the axis to the label, staggered so labels never overprint
    for (const o of sorted) { const y = ay - 26 - o.k * 22, xv = X(o.m.value); s += `<path d="M${f1(xv)} ${f1(ay)} L${f1(xv)} ${f1(y + 14)} L${f1(o.x)} ${f1(y + 8)}" fill="none" stroke="${C.line}" stroke-width="1"/>` + dot(xv, ay, 3.5, C.a2) + text(o.x, y, o.m.label, { size: 12, weight: 600 }); }
  } else {
    const ys = 34 + (spec.title ? 24 : 0), ye = ys + Math.max(360, decades * 9), Y = (v) => ye - ((Math.log10(v) - lo) / decades) * (ye - ys), ax = 62;
    H = ye + 30;
    const L = labeller(W, H);
    s += arrow(ax, ye, ax, ys - 10, { w: 1.8, head: 8 }) + text(ax + 8, ys - 14, `${spec.quantity || ""}${spec.units ? ` / ${spec.units}` : ""}`, { size: 12, weight: 600, anchor: "start", fill: C.soft });
    for (let e = Math.ceil(lo / every) * every; e <= hi; e += every) s += line(ax - 5, Y(10 ** e), ax + 5, Y(10 ** e), { w: 1.4 }) + text(ax - 9, Y(10 ** e), `10^{${e}}`, { size: 11.5, fill: C.soft, anchor: "end" });
    const bx = W - 150;
    rs.forEach((r, i) => { const a = Y(Math.max(r.from, 10 ** lo)), b = Y(Math.min(r.to, 10 ** hi)); s += `<rect x="${f1(bx)}" y="${f1(b)}" width="14" height="${f1(a - b)}" fill="${col(r.colour || ["a1", "a4", "a3", "a5", "a2", "good"][i % 6])}" fill-opacity=".75"/>`; });
    const RL = labeller(W, H);
    rs.forEach((r) => { const a = Y(Math.max(r.from, 10 ** lo)), b = Y(Math.min(r.to, 10 ** hi)), ls = wrapWords(r.label, 17); ls.forEach((l, i) => { s += RL.place(bx + 20, (a + b) / 2 + (i - (ls.length - 1) / 2) * 15, l, { size: 11.5, weight: 600, anchor: "start" }, [[0, 0], [0, 1], [0, -1]]); }); });
    const sorted = ms.map((m) => ({ m, y: Y(m.value) })).sort((a, b) => b.y - a.y), gap = 16; let last = Infinity;
    for (const o of sorted) { const y = Math.min(o.y, last - gap); last = y; s += dot(ax, o.y, 3.5, C.a2) + line(ax, o.y, ax + 16, y, { stroke: C.line, w: 1 }) + text(ax + 20, y, o.m.label, { size: 12, weight: 600, anchor: "start" }); }
    if (last < ys - 6) { /* markers crowd past the top: the spec should drop some for the phone */ }
  }
  return { s, H };
}
export function scaleChecks(spec) {
  const out = [], ms = spec.markers || [], rs = spec.regions || [];
  out.push(check("every marker lies on the scale", ms.every((m) => m.value > 0 && Math.log10(m.value) >= spec.min - 1e-9 && Math.log10(m.value) <= spec.max + 1e-9), ms.filter((m) => !(Math.log10(m.value) >= spec.min && Math.log10(m.value) <= spec.max)).map((m) => m.label).join(", ")));
  for (const m of ms.filter((m) => m.region)) { const r = rs.find((x) => x.label === m.region); out.push(check(`${m.label} is in the ${m.region} region`, !!r && m.value >= r.from && m.value <= r.to, r ? `${fmt(m.value)} against ${fmt(r.from)}–${fmt(r.to)}` : "no such region")); }
  if (spec.kind === "em") {
    // sorted along the scale, the bands must run gamma → radio for wavelength, radio → gamma for frequency
    const band = (l) => EM_ORDER.findIndex((k) => (k === "x-ray" ? /x[- ]?ray/ : new RegExp(k)).test(l.toLowerCase()));
    const along = [...rs].sort((a, b) => a.from - b.from).map((r) => band(r.label)), freq = spec.units === "Hz" || spec.quantity === "frequency";
    const ordered = along.every((k) => k >= 0) && along.every((k, i) => !i || (freq ? k > along[i - 1] : k < along[i - 1]));
    out.push(check(`EM bands are in the standard order (${freq ? "radio has the lowest frequency" : "gamma rays have the shortest wavelength"})`, ordered, [...rs].sort((a, b) => a.from - b.from).map((r) => r.label).join(" < ")));
    const gaps = rs.slice(1).filter((r, i) => !close(Math.min(r.from, r.to), Math.min(rs[i].to, rs[i].from), 0.35) && !close(r.from, rs[i].to, 0.35) && !close(r.to, rs[i].from, 0.35));
    out.push(check("adjacent bands meet (no gaps or overlaps on the scale)", !gaps.length, gaps.map((g) => g.label).join(", ")));
    for (const m of ms.filter((m) => m.f != null)) out.push(check(`${m.label}: f = c/λ = ${fmt(m.f)} Hz`, close(CONST.c / m.value, m.f, 0.02), `${fmt(CONST.c / m.value)} Hz`));
    for (const m of ms.filter((m) => m.lambda != null)) out.push(check(`${m.label}: λ = c/f = ${fmt(m.lambda)} m`, close(CONST.c / m.value, m.lambda, 0.02), `${fmt(CONST.c / m.value)} m`));
  }
  if (spec.kind === "prefix") for (const m of ms) { const name = m.prefix || m.label.split(" ")[0].toLowerCase(), e = PREFIX[name]; out.push(check(`${name} = 10^{${e}}`, e != null && close(m.value, 10 ** e, 1e-9), e == null ? "not an SI prefix" : `marker at ${fmt(m.value)}`)); }
  for (const c of spec.claims || []) {
    if (c.type === "span") { const l = ms.map((m) => Math.log10(m.value)), d = Math.max(...l) - Math.min(...l); out.push(check(c.name || `the markers span about ${c.value} orders of magnitude`, Math.abs(d - c.value) <= (c.tol ?? 1), `${d.toFixed(1)} orders`)); }
    else if (c.type === "orders") { const a = ms.find((m) => m.label === c.a), b = ms.find((m) => m.label === c.b), d = a && b ? Math.log10(b.value / a.value) : NaN; out.push(check(c.name || `${c.b} is about 10^{${c.value}} × ${c.a}`, Math.abs(d - c.value) <= (c.tol ?? 0.5), `${d.toFixed(2)} orders`)); }
    else out.push(check(`claim type ${c.type} is known`, false));
  }
  return out;
}

// ======================================================================== nuclear
// spec.mode "chain": start {sym, A, Z}, steps: [{decay: "alpha" | "beta-" | "beta+" | "ec" | "gamma" | "n" | "p",
//   to: {sym, A, Z}, halfLife}], counts: {alpha, beta} (claimed totals), layout: "row" | "chart"
// spec.mode "reaction": lhs, rhs: [{sym, A, Z, m (u)} or a particle name "n", "p", "alpha", "e-", "e+", "gamma", "nu"],
//   Q (MeV, claimed, from the masses when every item has m)
export const PARTICLE = { alpha: { sym: "He", A: 4, Z: 2, show: "α" }, "beta-": { sym: "e", A: 0, Z: -1, show: "β⁻" }, "beta+": { sym: "e", A: 0, Z: 1, show: "β⁺" },
  "e-": { sym: "e", A: 0, Z: -1 }, "e+": { sym: "e", A: 0, Z: 1 }, gamma: { sym: "γ", A: 0, Z: 0, show: "γ" }, n: { sym: "n", A: 1, Z: 0, show: "n" }, p: { sym: "p", A: 1, Z: 1, show: "p" }, nu: { sym: "ν", A: 0, Z: 0 }, antinu: { sym: "ν̄", A: 0, Z: 0 } };
const EMIT = { alpha: [4, 2], "beta-": [0, -1], "beta+": [0, 1], ec: [0, 1], gamma: [0, 0], n: [1, 0], p: [1, 1] }; // what leaves (ec: an electron is captured, Z falls by 1)
export const nuc = (x) => (typeof x === "string" ? { ...PARTICLE[x], m: undefined, name: x } : x);
export function chainCheck(spec) {
  const bad = []; let cur = spec.start;
  for (const st of spec.steps) {
    const e = EMIT[st.decay]; if (!e) { bad.push(`unknown decay ${st.decay}`); continue; }
    const A = cur.A - e[0], Z = cur.Z - e[1];
    if (st.to.A !== A || st.to.Z !== Z) bad.push(`${cur.sym}-${cur.A} ${st.decay}: gives A = ${A}, Z = ${Z}, not ${st.to.A}, ${st.to.Z}`);
    cur = st.to;
  }
  return bad;
}
const symOk = (n) => n.Z >= 1 && SYMBOLS[n.Z - 1] === n.sym;
function nuclide(x, y, n, size = 20, fill = C.ink) {
  // ᴬ_Z X: mass number top left, proton number bottom left, right-aligned against the symbol
  const w = tw(n.show || n.sym, size) * 0.95, xs = x - w / 2 + 6;
  if (n.show && n.A === 0 && n.Z === 0) return text(x, y, n.show, { size, weight: 700, fill });
  return text(xs - 1, y - size * 0.42, String(n.A), { size: size * 0.55, anchor: "end", fill }) + text(xs - 1, y + size * 0.42, String(n.Z), { size: size * 0.55, anchor: "end", fill }) + text(xs, y, n.sym === "He" && n.show ? "He" : n.sym, { size, weight: 700, anchor: "start", fill });
}
function nuclearDraw(spec, W, narrow) {
  let s = spec.title ? text(16, 16, spec.title, { size: 14, weight: 700, anchor: "start" }) : "", H;
  const top = spec.title ? 34 : 14;
  if (spec.mode === "reaction") {
    const L = spec.lhs.map(nuc), R = spec.rhs.map(nuc), item = (n) => ({ n, w: Math.max(tw(n.sym, 22) + 26, 44) }), plus = 26, arr = 56;
    const rowOf = (xs) => xs.reduce((t, it, i) => t + it.w + (i ? plus : 0), 0);
    const li = L.map(item), ri = R.map(item), one = rowOf(li) + arr + rowOf(ri) + 40 <= W;
    const draw = (items, x, y) => { let t = ""; items.forEach((it, i) => { if (i) { t += text(x + plus / 2, y, "+", { size: 20, weight: 600 }); x += plus; } t += nuclide(x + it.w / 2, y, it.n.show && it.n.A === 0 && it.n.Z === 0 ? it.n : it.n, 22); x += it.w; }); return { t, x }; };
    if (one) { const x = (W - (rowOf(li) + arr + rowOf(ri))) / 2, y = top + 26, a = draw(li, x, y); s += a.t + arrow(a.x + 10, y, a.x + arr - 10, y, { w: 2.4 }) + draw(ri, a.x + arr, y).t; H = y + 40; }
    else { const y1 = top + 24, y2 = y1 + 62; s += draw(li, (W - rowOf(li)) / 2, y1).t + arrow(W / 2, y1 + 18, W / 2, y2 - 22, { w: 2.2, head: 9 }) + draw(ri, (W - rowOf(ri)) / 2, y2).t; H = y2 + 40; }
    const sa = (xs, k) => xs.reduce((t, n) => t + n[k], 0);
    s += text(W / 2, H - 6, `A: ${sa(L, "A")} = ${sa(R, "A")} · Z: ${sa(L, "Z")} = ${sa(R, "Z")}${spec.Q != null ? ` · Q = ${fmt(spec.Q)} MeV` : ""}`, { size: 12.5, weight: 600, fill: C.soft });
    H += 14;
    return { s, H };
  }
  const chain = [spec.start, ...spec.steps.map((st) => st.to)];
  if (spec.layout === "chart") {
    const Ns = chain.map((n) => n.A - n.Z), Zs = chain.map((n) => n.Z), pad = 2, pw = W - (narrow ? 80 : 100), ph = narrow ? 300 : 320;
    H = top + ph + 70;
    const F = frame(56, top + 20, pw, ph, [Math.min(...Ns) - pad, Math.max(...Ns) + pad], [Math.min(...Zs) - pad, Math.max(...Zs) + pad], { xLabel: "neutron number N", yLabel: "proton number Z", zeroAxis: false });
    s += F.s;
    const Lb = labeller(W, H);
    spec.steps.forEach((st, i) => { const a = chain[i], b = st.to, c = st.decay === "alpha" ? C.a2 : C.a1; s += arrow(F.X(a.A - a.Z), F.Y(a.Z), F.X(b.A - b.Z), F.Y(b.Z), { stroke: c, w: 2.2, head: 8 }); });
    chain.forEach((n) => { s += dot(F.X(n.A - n.Z), F.Y(n.Z), 4.5); Lb.reserve(F.X(n.A - n.Z) - 5, F.Y(n.Z) - 5, F.X(n.A - n.Z) + 5, F.Y(n.Z) + 5); });
    chain.forEach((n, i) => { if (i === 0 || i === chain.length - 1 || spec.labelAll) s += Lb.place(F.X(n.A - n.Z) + 8, F.Y(n.Z) - 12, `${n.sym}-${n.A}`, { size: 12, weight: 700, anchor: "start" }); });
    s += line(56, H - 22, 80, H - 22, { stroke: C.a2, w: 3 }) + text(86, H - 22, "α: N − 2, Z − 2", { size: 12, anchor: "start" }) + line(206, H - 22, 230, H - 22, { stroke: C.a1, w: 3 }) + text(236, H - 22, "β⁻: N − 1, Z + 1", { size: 12, anchor: "start" });
    return { s, H };
  }
  // a row of boxes, wrapping onto further rows; the phone layout is one column
  const bw = 84, bh = 58, gap = narrow ? 0 : 74, perRow = narrow ? 1 : Math.max(1, Math.floor((W - 20 + gap) / (bw + gap)));
  const rows = Math.ceil(chain.length / perRow), rh = narrow ? bh + 46 : bh + 58;
  H = top + rows * rh - (narrow ? 34 : 38);
  const pos = (i) => narrow ? [40, top + i * rh] : [10 + (i % perRow) * (bw + gap), top + 10 + Math.floor(i / perRow) * rh];
  chain.forEach((n, i) => {
    const [x, y] = pos(i);
    s += `<rect x="${f1(x)}" y="${f1(y)}" width="${bw}" height="${bh}" rx="8" fill="${C.panel}" stroke="${i === chain.length - 1 && spec.stable ? C.good : C.ink}" stroke-width="2"/>` + nuclide(x + bw / 2, y + bh / 2, n, 21);
    if (i < spec.steps.length) {
      const st = spec.steps[i], [nx, ny] = pos(i + 1), lab = `${PARTICLE[st.decay]?.show || (st.decay === "ec" ? "e⁻ capture" : st.decay)}`;
      if (narrow) { s += arrow(x + bw / 2, y + bh + 4, nx + bw / 2, ny - 4, { w: 2.2, head: 8 }) + text(x + bw / 2 + 14, (y + bh + ny) / 2, `${lab}${st.halfLife ? `   (t_{½} = ${st.halfLife})` : ""}`, { size: 12.5, weight: 700, anchor: "start" }); }
      else if (ny === y) { s += arrow(x + bw + 6, y + bh / 2, nx - 6, ny + bh / 2, { w: 2.2, head: 8 }) + text(x + bw + gap / 2, y + bh / 2 - 13, lab, { size: 13, weight: 700 }) + (st.halfLife ? text(x + bw + gap / 2, y + bh / 2 + 16, st.halfLife, { size: 11, fill: C.soft }) : ""); }
      else { s += `<path d="M${f1(x + bw / 2)} ${f1(y + bh + 4)} V${f1(y + bh + 22)} H${f1(nx + bw / 2)} V${f1(ny - 8)}" fill="none" stroke="${C.ink}" stroke-width="2.2"/>` + arrow(nx + bw / 2, ny - 14, nx + bw / 2, ny - 3, { w: 2.2, head: 8 }) + text(x + bw / 2 + 8, y + bh + 36, `${lab}${st.halfLife ? ` (${st.halfLife})` : ""}`, { size: 12, weight: 700, anchor: "start" }); }
    }
  });
  return { s, H };
}
export function nuclearChecks(spec) {
  const out = [];
  if (spec.mode === "reaction") {
    const L = spec.lhs.map(nuc), R = spec.rhs.map(nuc), sum = (xs, k) => xs.reduce((t, n) => t + n[k], 0);
    out.push(check("nucleon number A is conserved", sum(L, "A") === sum(R, "A"), `${sum(L, "A")} → ${sum(R, "A")}`));
    out.push(check("charge (proton number Z) is conserved", sum(L, "Z") === sum(R, "Z"), `${sum(L, "Z")} → ${sum(R, "Z")}`));
    const nucs = [...L, ...R].filter((n) => !n.name && n.Z >= 1);
    out.push(check("every element symbol matches its proton number", nucs.every(symOk), nucs.filter((n) => !symOk(n)).map((n) => `${n.sym} with Z = ${n.Z} (should be ${SYMBOLS[n.Z - 1]})`).join("; ")));
    if (spec.Q != null) {
      const ms = [...L, ...R].map((n) => n.m ?? (n.name ? { n: 1.00866491595, p: 1.007276466621, alpha: 4.001506179127, "e-": 0.000548579909, "e+": 0.000548579909, "beta-": 0.000548579909, "beta+": 0.000548579909, gamma: 0, nu: 0, antinu: 0 }[n.name] : undefined));
      if (ms.some((m) => m == null)) out.push(check(`Q = ${spec.Q} MeV`, false, "every nucleus needs a mass m (u) to check Q"));
      else { const Q = (ms.slice(0, L.length).reduce((a, b) => a + b, 0) - ms.slice(L.length).reduce((a, b) => a + b, 0)) * CONST.u_MeV; out.push(check(`Q = Δm c^{2} = ${spec.Q} MeV`, close(Q, spec.Q, spec.tol ?? 0.01, 0.01), `${fmt(Q, 4)} MeV from the masses`)); }
    }
    return out;
  }
  const bad = chainCheck(spec), chain = [spec.start, ...spec.steps.map((s) => s.to)];
  out.push(check("A and Z change correctly at every step (α: A − 4, Z − 2; β⁻: Z + 1; β⁺ and capture: Z − 1; γ: no change)", !bad.length, bad.join("; ") || `${spec.steps.length} steps`));
  out.push(check("every element symbol matches its proton number", chain.every(symOk), chain.filter((n) => !symOk(n)).map((n) => `${n.sym} with Z = ${n.Z} (should be ${SYMBOLS[n.Z - 1]})`).join("; ")));
  if (spec.counts) {
    const na = spec.steps.filter((s) => s.decay === "alpha").length, nb = spec.steps.filter((s) => s.decay === "beta-").length, a = spec.start, b = chain.at(-1);
    out.push(check(`${spec.counts.alpha} α and ${spec.counts.beta} β⁻ decays`, na === spec.counts.alpha && nb === spec.counts.beta && a.A - b.A === 4 * na && a.Z - b.Z === 2 * na - nb, `drawn ${na} α, ${nb} β⁻; ΔA = ${a.A - b.A}, ΔZ = ${a.Z - b.Z}`));
  }
  return out;
}

// ======================================================================== refraction
// spec.panels: [{n1, n2, i (°), media: [upper, lower] names, expect: {r, critical, tir}}]
export function snell(n1, n2, i) {
  const s = (n1 * Math.sin(rad(i))) / n2, crit = n1 > n2 ? deg(Math.asin(n2 / n1)) : null;
  return { tir: s > 1, r: s > 1 ? null : deg(Math.asin(s)), critical: crit };
}
function refractionDraw(spec, W, narrow) {
  const n = spec.panels.length, pw = narrow ? W - 20 : (W - 20 - (n - 1) * 16) / n, ph = narrow ? 250 : 270;
  const H = narrow ? 10 + n * (ph + 14) : ph + 20;
  let s = "";
  spec.panels.forEach((p, k) => {
    const x = narrow ? 10 : 10 + k * (pw + 16), y = narrow ? 10 + k * (ph + 14) : 10, ox = x + pw / 2, oy = y + ph / 2 + 12, R = Math.min(pw / 2 - 14, ph / 2 - 30);
    const r = snell(p.n1, p.n2, p.i), lower = p.n2 > p.n1 ? 0.22 : 0.08, upper = p.n1 > p.n2 ? 0.22 : 0.08;
    const L = labeller(W, H);
    s += `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(pw)}" height="${f1(oy - y)}" fill="${C.a4}" fill-opacity="${upper}" rx="6"/><rect x="${f1(x)}" y="${f1(oy)}" width="${f1(pw)}" height="${f1(y + ph - oy)}" fill="${C.a4}" fill-opacity="${lower}" rx="6"/>`;
    s += line(x, oy, x + pw, oy, { w: 2 }) + line(ox, oy - R - 6, ox, oy + R + 6, { stroke: C.line, w: 1.3, dash: "5 4" });
    if (p.title) s += text(x + pw / 2, y + 14, p.title, { size: 13, weight: 700 }), L.reserve(x, y + 4, x + pw, y + 24);
    const m = p.media || [];
    s += L.place(x + 8, y + (p.title ? 36 : 16), `${m[0] ? `${m[0]}, ` : ""}n = ${p.n1}`, { size: 12, weight: 600, anchor: "start" }) + L.place(x + 8, y + ph - 12, `${m[1] ? `${m[1]}, ` : ""}n = ${p.n2}`, { size: 12, weight: 600, anchor: "start" });
    const ti = rad(p.i), inc = [ox - R * Math.sin(ti), oy - R * Math.cos(ti)];
    s += arrow(inc[0], inc[1], (inc[0] + ox) / 2, (inc[1] + oy) / 2, { stroke: C.a3, w: 2.6, head: 10 }) + line((inc[0] + ox) / 2, (inc[1] + oy) / 2, ox, oy, { stroke: C.a3, w: 2.6 });
    s += `<path d="M${f1(ox)} ${f1(oy - 34)} A34 34 0 0 0 ${f1(ox - 34 * Math.sin(ti))} ${f1(oy - 34 * Math.cos(ti))}" fill="none" stroke="${C.ink}" stroke-width="1.4"/>`;
    s += L.place(ox - 58 * Math.sin(ti / 2), oy - 58 * Math.cos(ti / 2), `${fmt(p.i)}°`, { size: 12, weight: 700 });
    const refl = [ox + R * Math.sin(ti), oy - R * Math.cos(ti)];
    s += arrow(ox, oy, refl[0], refl[1], { stroke: C.a3, w: r.tir ? 2.6 : 1.4, dash: r.tir ? "" : "5 4", head: r.tir ? 10 : 8 });
    if (r.tir) s += L.place(ox + 12, oy - R * 0.5 - 4, "total internal reflection", { size: 12, weight: 700, anchor: "start", fill: C.a2 }, [[0, 0], [0, 1], [0, -1], [-2, 2]]);
    else {
      const tr = rad(r.r), out = [ox + R * Math.sin(tr), oy + R * Math.cos(tr)];
      s += arrow(ox, oy, out[0], out[1], { stroke: C.a2, w: 2.6, head: 10 });
      s += `<path d="M${f1(ox)} ${f1(oy + 34)} A34 34 0 0 0 ${f1(ox + 34 * Math.sin(tr))} ${f1(oy + 34 * Math.cos(tr))}" fill="none" stroke="${C.ink}" stroke-width="1.4"/>`;
      s += L.place(ox + 58 * Math.sin(tr / 2), oy + 58 * Math.cos(tr / 2), `${fmt(r.r)}°`, { size: 12, weight: 700 });
    }
    if (p.note) s += L.place(x + pw - 8, y + ph - 12, p.note, { size: 11.5, anchor: "end", fill: C.soft }, [[0, 0], [0, -1]]);
  });
  return { s, H };
}
export function refractionChecks(spec) {
  const out = [];
  for (const p of spec.panels) {
    const r = snell(p.n1, p.n2, p.i), e = p.expect || {}, tag = `${p.title || `n ${p.n1} → ${p.n2}`}, i = ${p.i}°`;
    out.push(check(`${tag}: angle of reflection equals angle of incidence`, true, `${p.i}°`));
    if (e.tir != null) out.push(check(`${tag}: ${e.tir ? "totally internally reflected" : "refracted"}`, r.tir === e.tir, r.critical != null ? `critical angle ${r.critical.toFixed(1)}°` : "light enters a denser medium: no critical angle"));
    if (e.r != null) out.push(check(`${tag}: Snell's law gives r = ${e.r}°`, r.r != null && Math.abs(r.r - e.r) <= 0.15, r.r != null ? `n₁ sin i / n₂ → r = ${r.r.toFixed(2)}°` : "no refracted ray (TIR)"));
    if (e.critical != null) out.push(check(`${tag}: critical angle ${e.critical}°`, r.critical != null && Math.abs(r.critical - e.critical) <= 0.15, r.critical != null ? `sin⁻¹(n₂/n₁) = ${r.critical.toFixed(2)}°` : "n₁ < n₂: no critical angle"));
    if (r.r != null && p.n1 !== p.n2) out.push(check(`${tag}: the ray bends ${p.n2 > p.n1 ? "towards" : "away from"} the normal`, p.n2 > p.n1 ? r.r < p.i : r.r > p.i, `${p.i}° → ${r.r.toFixed(1)}°`));
    if (!Object.keys(e).length) out.push(check(`${tag}: the panel states what happens`, false));
  }
  return out;
}

register({
  field: { draw: fieldDraw, checks: fieldChecks, widths: [640, 380] },
  transitions: { draw: transitionsDraw, checks: transitionChecks, widths: [640, 380] },
  scale: { draw: scaleDraw, checks: scaleChecks, widths: [900, 380] },
  nuclear: { draw: nuclearDraw, checks: nuclearChecks, widths: [700, 380] },
  refraction: { draw: refractionDraw, checks: refractionChecks, widths: [840, 380] },
});
