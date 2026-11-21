// Gradify Visual Learning Engine: maths renderers for geometry, vectors and transformations. Everything is drawn from
// coordinates, and every number the picture states is measured back from those coordinates:
//
//   geometry    angles (and right angles), lengths, equal-length and parallel marks, points on circles, tangents
//               perpendicular to radii, parallel / perpendicular / collinear, angle sums, similar and congruent
//               triangles (side ratios), areas (shoelace), midpoints; vectors as arrows with their components,
//               sums (tip to tail), multiples and magnitudes
//   vectors     the same renderer on a square grid
//   transform   images of a shape under translations, reflections, rotations, enlargements and matrices, each vertex
//               recomputed; area scale factor = |det| for a matrix
import { register, text, line, arrow, col, f1, check, near, COLOURS as C } from "./renderers.js";
import { entry } from "./maths-layout.js";
import { num, fmt, dist, angleAt, cross, sub, area, transformPoint } from "./maths-core.js";

const minus = (s) => String(s).replace(/-/g, "−");

// a frame fitting the view [x0, x1] × [y0, y1] (y up) into W, at most maxH tall
function frame(view, W, maxH, pad) {
  const [x0, x1] = view.x, [y0, y1] = view.y, k = Math.min((W - 2 * pad) / (x1 - x0), (maxH - 2 * pad) / (y1 - y0));
  const ox = (W - k * (x1 - x0)) / 2, H = k * (y1 - y0) + 2 * pad;
  return { k, H, sx: (x) => ox + (x - x0) * k, sy: (y) => pad + (y1 - y) * k, P: ([x, y]) => [ox + (x - x0) * k, pad + (y1 - y) * k] };
}
function gridAxes(F, view, g) {
  let s = "";
  const [x0, x1] = view.x, [y0, y1] = view.y, st = g.step || 1;
  for (let x = Math.ceil(x0 / st) * st; x <= x1 + 1e-9; x += st) s += line(F.sx(x), F.sy(y0), F.sx(x), F.sy(y1), { stroke: C.grid, w: 1 });
  for (let y = Math.ceil(y0 / st) * st; y <= y1 + 1e-9; y += st) s += line(F.sx(x0), F.sy(y), F.sx(x1), F.sy(y), { stroke: C.grid, w: 1 });
  if (g.axes) {
    const ax = Math.min(Math.max(0, y0), y1), ay = Math.min(Math.max(0, x0), x1), ls = g.labels || 2;
    s += arrow(F.sx(x0), F.sy(ax), F.sx(x1) + 2, F.sy(ax), { stroke: C.ink, w: 1.5, head: 8 }) + arrow(F.sx(ay), F.sy(y0), F.sx(ay), F.sy(y1) - 2, { stroke: C.ink, w: 1.5, head: 8 });
    for (let x = Math.ceil(x0 / ls) * ls; x < x1 - 1e-9; x += ls) if (Math.abs(x) > 1e-9) s += text(F.sx(x), F.sy(ax) + 13, fmt(x), { size: 11.5, fill: C.soft });
    for (let y = Math.ceil(y0 / ls) * ls; y < y1 - 1e-9; y += ls) if (Math.abs(y) > 1e-9) s += text(F.sx(ay) - 6, F.sy(y), fmt(y), { size: 11.5, fill: C.soft, anchor: "end" });
    s += text(F.sx(x1) - 2, F.sy(ax) - 12, "x", { size: 13, weight: 600, fill: C.soft, italic: true }) + text(F.sx(ay) + 10, F.sy(y1) + 6, "y", { size: 13, weight: 600, fill: C.soft, italic: true, anchor: "start" });
  }
  return s;
}

// ======================================================================== geometry / vectors
// spec: points: {A: [x, y]}, hide?: ["O"] (no label), labelAt?: {A: [dx, dy] px}, view?: {x, y}, grid?: {step, axes, labels},
//   segments: [["A", "B"] | {a, b, dash, colour, w}], polygons: [{pts, colour}], circles: [{centre, r | through, colour}],
//   angles: [{at, from, to, deg?, label?, right?, reflex?, colour, r?}], lengths: [{a, b, value?, label?, side?: ±1}],
//   unit: "cm", scale: units per coordinate unit, ticks: [{seg: [a, b], n}], parallels: [{seg: [a, b], n}],
//   vectors: [{from | to, v?, name?, label?, colour, labelSide?}], notes: [{at: [x, y], text, colour?}] (an area check names its note), height: [wide, narrow], checks: […]
const P = (spec, p) => (typeof p === "string" ? spec.points[p] : p);
function vec(spec, v) { const a = P(spec, v.from || [0, 0]); return v.v ? v.v : sub(P(spec, v.to), a); }
function viewOf(spec) {
  if (spec.view) return spec.view;
  const xs = [], ys = [];
  for (const p of Object.values(spec.points || {})) { xs.push(p[0]); ys.push(p[1]); }
  for (const c of spec.circles || []) { const o = P(spec, c.centre), r = c.r ?? dist(o, P(spec, c.through)); xs.push(o[0] - r, o[0] + r); ys.push(o[1] - r, o[1] + r); }
  for (const v of spec.vectors || []) { const a = P(spec, v.from || [0, 0]), d = vec(spec, v); xs.push(a[0], a[0] + d[0]); ys.push(a[1], a[1] + d[1]); }
  const m = 0.12 * Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
  return { x: [Math.min(...xs) - m, Math.max(...xs) + m], y: [Math.min(...ys) - m, Math.max(...ys) + m] };
}
function geometry(spec, W, narrow) {
  const view = viewOf(spec), maxH = spec.height?.[narrow ? 1 : 0] ?? (narrow ? 400 : 420), F = frame(view, W, maxH, narrow ? 26 : 32);
  const pts = spec.points || {}, all = Object.values(pts), cen = all.length ? [all.reduce((a, p) => a + p[0], 0) / all.length, all.reduce((a, p) => a + p[1], 0) / all.length] : [0, 0];
  let s = spec.grid ? gridAxes(F, view, spec.grid) : "";
  for (const g of spec.polygons || []) s += `<path d="${g.pts.map((p, i) => `${i ? "L" : "M"}${F.P(P(spec, p)).map(f1).join(" ")}`).join(" ")} Z" fill="${col(g.colour || "a1")}" fill-opacity="${g.opacity ?? 0.1}" stroke="${col(g.colour || "a1")}" stroke-width="2.4" stroke-linejoin="round"/>`;
  for (const c of spec.circles || []) { const o = P(spec, c.centre), r = c.r ?? dist(o, P(spec, c.through)); s += `<circle cx="${f1(F.sx(o[0]))}" cy="${f1(F.sy(o[1]))}" r="${f1(r * F.k)}" fill="none" stroke="${col(c.colour || "ink")}" stroke-width="2.2"/>`; }
  for (const g of spec.segments || []) { const q = Array.isArray(g) ? { a: g[0], b: g[1] } : g; const [x1, y1] = F.P(P(spec, q.a)), [x2, y2] = F.P(P(spec, q.b)); s += line(x1, y1, x2, y2, { stroke: col(q.colour || "ink"), w: q.w || 2.2, dash: q.dash || "" }); }
  for (const a of spec.angles || []) {
    const B = F.P(P(spec, a.at)), A = F.P(P(spec, a.from)), Cc = F.P(P(spec, a.to)), c = col(a.colour || "a2"), r = a.r || 26;
    let t1 = Math.atan2(A[1] - B[1], A[0] - B[0]), t2 = Math.atan2(Cc[1] - B[1], Cc[0] - B[0]), d = t2 - t1;
    while (d <= -Math.PI) d += 2 * Math.PI; while (d > Math.PI) d -= 2 * Math.PI;
    if (a.reflex) d = d > 0 ? d - 2 * Math.PI : d + 2 * Math.PI;
    if (a.right) {
      const u = [Math.cos(t1), Math.sin(t1)], v = [Math.cos(t1 + d), Math.sin(t1 + d)], q = 13;
      s += `<path d="M${f1(B[0] + u[0] * q)} ${f1(B[1] + u[1] * q)} L${f1(B[0] + (u[0] + v[0]) * q)} ${f1(B[1] + (u[1] + v[1]) * q)} L${f1(B[0] + v[0] * q)} ${f1(B[1] + v[1] * q)}" fill="none" stroke="${c}" stroke-width="1.8"/>`;
    } else {
      const e = t1 + d, big = Math.abs(d) > Math.PI ? 1 : 0, sw = d > 0 ? 1 : 0;
      s += `<path d="M${f1(B[0] + r * Math.cos(t1))} ${f1(B[1] + r * Math.sin(t1))} A${r} ${r} 0 ${big} ${sw} ${f1(B[0] + r * Math.cos(e))} ${f1(B[1] + r * Math.sin(e))}" fill="${c}" fill-opacity=".12" stroke="${c}" stroke-width="2"/>`;
    }
    const label = a.label ?? (a.deg != null ? `${fmt(a.deg, 1)}°` : "");
    if (label) { const m = t1 + d / 2, L = r + (a.labelR ?? 15) + label.length * 2.4; s += text(B[0] + L * Math.cos(m), B[1] + L * Math.sin(m), label, { size: 13.5, weight: 700, fill: c }); }
  }
  const mark = (a, b, n, kind) => {
    const [x1, y1] = F.P(P(spec, a)), [x2, y2] = F.P(P(spec, b)), L = Math.hypot(x2 - x1, y2 - y1), u = [(x2 - x1) / L, (y2 - y1) / L], nx = -u[1], ny = u[0], mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    let o = "";
    for (let i = 0; i < n; i++) {
      const off = (i - (n - 1) / 2) * 6, cx = mx + u[0] * off, cy = my + u[1] * off;
      o += kind === "tick" ? line(cx - nx * 7, cy - ny * 7, cx + nx * 7, cy + ny * 7, { stroke: C.ink, w: 1.8 }) : `<path d="M${f1(cx - u[0] * 6 - nx * 6)} ${f1(cy - u[1] * 6 - ny * 6)} L${f1(cx)} ${f1(cy)} L${f1(cx - u[0] * 6 + nx * 6)} ${f1(cy - u[1] * 6 + ny * 6)}" fill="none" stroke="${C.ink}" stroke-width="1.8"/>`;
    }
    return o;
  };
  for (const t of spec.ticks || []) s += mark(t.seg[0], t.seg[1], t.n || 1, "tick");
  for (const t of spec.parallels || []) s += mark(t.seg[0], t.seg[1], t.n || 1, "arrow");
  (spec.vectors || []).forEach((v) => {
    const a = P(spec, v.from || [0, 0]), d = vec(spec, v), [x1, y1] = F.P(a), [x2, y2] = F.P([a[0] + d[0], a[1] + d[1]]), c = col(v.colour || "a1");
    s += arrow(x1, y1, x2, y2, { stroke: c, w: 3, head: 12, dash: v.dash || "" });
    const label = v.label ?? v.name;
    if (label) { const L = Math.hypot(x2 - x1, y2 - y1) || 1, side = v.labelSide ?? 1, nx = (-(y2 - y1) / L) * side, ny = ((x2 - x1) / L) * side; s += text((x1 + x2) / 2 + nx * 16 + (v.dx || 0), (y1 + y2) / 2 + ny * 16 + (v.dy || 0), label, { size: 14, weight: 700, fill: c }); }
  });
  for (const l of spec.lengths || []) {
    const A = P(spec, l.a), B = P(spec, l.b), [x1, y1] = F.P(A), [x2, y2] = F.P(B), L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L, ny = (x2 - x1) / L;
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, [cx, cy] = F.P(cen), side = l.side ?? (nx * (mx - cx) + ny * (my - cy) >= 0 ? 1 : -1);
    const label = l.label ?? `${fmt(l.value)}${spec.unit ? ` ${spec.unit}` : ""}`, off = 17 + Math.abs(nx) * label.length * 3.4;
    s += text(mx + nx * off * side, my + ny * off * side, minus(label), { size: 13.5, weight: 700, fill: col(l.colour || "a1") });
  }
  for (const n of spec.notes || []) { const [x, y] = F.P(n.at); s += text(x, y, minus(n.text), { size: n.size || 14, weight: 700, fill: col(n.colour || "ink") }); }
  for (const [name, p] of Object.entries(pts)) {
    const [x, y] = F.P(p);
    if ((spec.hide || []).includes(name)) continue;
    s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="3.6" fill="${C.ink}"/>`;
    let dx, dy;
    if (spec.labelAt?.[name]) [dx, dy] = spec.labelAt[name];
    else { const [cx, cy] = F.P(cen), L = Math.hypot(x - cx, y - cy); [dx, dy] = L < 1 ? [0, -16] : [((x - cx) / L) * 16, ((y - cy) / L) * 16]; }
    s += text(x + dx, y + dy, name, { size: 15, weight: 700, italic: false });
  }
  return { s, H: F.H };
}
function geometryChecks(spec) {
  const out = [], u = spec.scale ?? 1, at = (p) => P(spec, p), vs = spec.vectors || [];
  const ang = (a) => { const v = angleAt(at(a.from), at(a.at), at(a.to)); return a.reflex ? 360 - v : v; };
  for (const a of spec.angles || []) {
    if (a.right) out.push(check(`the angle at ${a.at} is a right angle`, Math.abs(ang(a) - 90) < 0.05, `${fmt(ang(a), 3)}°`));
    if (a.deg != null) out.push(check(`angle ${a.from}${a.at}${a.to} = ${fmt(a.deg, 1)}°`, Math.abs(ang(a) - a.deg) <= (a.tol ?? 0.5), `measured ${fmt(ang(a), 3)}°`));
  }
  for (const l of spec.lengths || []) if (l.value != null) { const d = dist(at(l.a), at(l.b)) * u; out.push(check(`${l.a}${l.b} = ${fmt(l.value)}${spec.unit ? ` ${spec.unit}` : ""}`, Math.abs(d - l.value) <= (l.tol ?? Math.max(0.005, 0.005 * l.value)), `measured ${fmt(d, 4)}`)); }
  const groups = (list, test, what) => {
    const by = {}; for (const t of list || []) (by[t.n || 1] ||= []).push(t.seg);
    for (const [n, segs] of Object.entries(by)) if (segs.length > 1) out.push(check(`the segments marked with ${n} ${what} are ${what === "ticks" ? "equal" : "parallel"}`, segs.every((g) => test(segs[0], g)), segs.map((g) => `${g.join("")} ${fmt(dist(at(g[0]), at(g[1])) * u, 3)}`).join(", ")));
  };
  groups(spec.ticks, (g, h) => near(dist(at(g[0]), at(g[1])), dist(at(h[0]), at(h[1])), 1e-6), "ticks");
  groups(spec.parallels, (g, h) => Math.abs(cross(sub(at(g[1]), at(g[0])), sub(at(h[1]), at(h[0])))) < 1e-6 * dist(at(g[0]), at(g[1])) * dist(at(h[0]), at(h[1])), "arrows");
  const circ = (i) => { const c = spec.circles[i], o = at(c.centre); return { o, r: c.r ?? dist(o, at(c.through)) }; };
  for (const k of spec.checks || []) {
    const t = k.type;
    if (t === "onCircle") { const { o, r } = circ(k.circle ?? 0); out.push(check(k.name || `${k.points.join(", ")} lie on the circle`, k.points.every((p) => near(dist(o, at(p)), r, 1e-6)), k.points.map((p) => fmt(dist(o, at(p)), 4)).join(", "))); }
    else if (t === "tangent") { const { o, r } = circ(k.circle ?? 0), T = at(k.at), d = sub(at(k.through), T), rad = sub(T, o); const dot = (d[0] * rad[0] + d[1] * rad[1]) / (Math.hypot(...d) * Math.hypot(...rad)); out.push(check(k.name || `${k.at}${k.through} is a tangent at ${k.at} (perpendicular to the radius)`, near(dist(o, T), r, 1e-6) && Math.abs(dot) < 1e-6, `cos = ${dot.toExponential(1)}`)); }
    else if (t === "parallel" || t === "perpendicular") { const a = sub(at(k.a[1]), at(k.a[0])), b = sub(at(k.b[1]), at(k.b[0])), x = t === "parallel" ? cross(a, b) : a[0] * b[0] + a[1] * b[1]; out.push(check(k.name || `${k.a.join("")} is ${t} to ${k.b.join("")}`, Math.abs(x) < 1e-6 * Math.hypot(...a) * Math.hypot(...b), fmt(x, 6))); }
    else if (t === "collinear") { const [A, B] = k.points.map(at); out.push(check(k.name || `${k.points.join(", ")} are collinear`, k.points.slice(2).every((p) => Math.abs(cross(sub(B, A), sub(at(p), A))) < 1e-6), "")); }
    else if (t === "angleSum") { const v = k.angles.map((i) => ang(spec.angles[i])), st = k.angles.map((i) => spec.angles[i].deg); out.push(check(k.name || `the angles add up to ${k.total}°`, Math.abs(v.reduce((a, b) => a + b, 0) - k.total) < 0.01 && (st.some((x) => x == null) || Math.abs(st.reduce((a, b) => a + b, 0) - k.total) < 1e-9), `measured ${v.map((x) => fmt(x, 2)).join(" + ")}`)); }
    else if (t === "similar" || t === "congruent") {
      const n = k.a.length, side = (T, i) => dist(at(T[i]), at(T[(i + 1) % n])), r = k.a.map((_, i) => side(k.b, i) / side(k.a, i)), want = t === "congruent" ? 1 : k.k;
      out.push(check(k.name || `${k.b.join("")} is ${t === "similar" ? `${k.a.join("")} scaled by ${fmt(want)}` : `congruent to ${k.a.join("")}`}`, r.every((x) => Math.abs(x - want) < 1e-6), `side ratios ${r.map((x) => fmt(x, 4)).join(", ")}`));
    } else if (t === "area") { const A = Math.abs(area(k.polygon.map(at))) * u * u; out.push(check(k.name || `area of ${k.polygon.join("")} = ${fmt(k.value)}`, Math.abs(A - num(k.value)) <= (k.tol ?? 1e-6 * Math.max(1, A)) && (k.note == null || spec.notes[k.note].text.replace(/,/g, "").includes(fmt(num(k.value)).replace(/,/g, ""))), `shoelace ${fmt(A, 4)}${k.note != null ? `; label "${spec.notes[k.note].text}"` : ""}`)); }
    else if (t === "midpoint") { const M = at(k.m), A = at(k.a), B = at(k.b); out.push(check(k.name || `${k.m} is the midpoint of ${k.a}${k.b}`, near(M[0], (A[0] + B[0]) / 2) && near(M[1], (A[1] + B[1]) / 2), "")); }
    else if (t === "distance") { const d = dist(at(k.a), at(k.b)) * u; out.push(check(k.name || `${k.a}${k.b} = ${k.value}`, Math.abs(d - num(k.value)) <= (k.tol ?? 1e-6 * Math.max(1, d)), `measured ${fmt(d, 5)}`)); }
    else if (t === "angle") { const v = ang(k); out.push(check(k.name || `angle ${k.from}${k.at}${k.to} = ${k.deg}°`, Math.abs(v - k.deg) <= (k.tol ?? 0.5), `measured ${fmt(v, 3)}°`)); }
    else if (t === "value") { const v = num(k.expr); out.push(check(k.name || `${k.expr} = ${k.value}`, Math.abs(v - num(k.value)) <= (k.tol ?? 1e-9 * Math.max(1, Math.abs(v))), fmt(v, 6))); }
    else if (t === "components") { const d = vec(spec, vs[k.vector]); out.push(check(k.name || `${vs[k.vector].name || "the vector"} = (${k.v.join(", ")})`, near(d[0], k.v[0]) && near(d[1], k.v[1]), `(${d.map((x) => fmt(x, 4)).join(", ")})`)); }
    else if (t === "magnitude") { const m = Math.hypot(...vec(spec, vs[k.vector])); out.push(check(k.name || `|${vs[k.vector].name || "v"}| = ${k.value}`, Math.abs(m - num(k.value)) < (k.tol ?? 1e-6), fmt(m, 5))); }
    else if (t === "vecsum") {
      const [i, j] = k.vectors, a = vec(spec, vs[i]), b = vec(spec, vs[j]), c = vec(spec, vs[k.is]), A0 = P(spec, vs[i].from || [0, 0]), B0 = P(spec, vs[j].from || [0, 0]), C0 = P(spec, vs[k.is].from || [0, 0]);
      const tip = near(B0[0], A0[0] + a[0]) && near(B0[1], A0[1] + a[1]) && near(C0[0], A0[0]) && near(C0[1], A0[1]);
      out.push(check(k.name || `${vs[i].name} + ${vs[j].name} = ${vs[k.is].name}, drawn tip to tail`, near(a[0] + b[0], c[0]) && near(a[1] + b[1], c[1]) && (k.tipToTail === false || tip), `(${fmt(a[0] + b[0])}, ${fmt(a[1] + b[1])}) against (${fmt(c[0])}, ${fmt(c[1])})${tip ? "" : "; not tip to tail"}`));
    } else if (t === "multiple") { const a = vec(spec, vs[k.vector]), b = vec(spec, vs[k.of]); out.push(check(k.name || `${vs[k.vector].name} = ${k.k}${vs[k.of].name}`, near(a[0], k.k * b[0]) && near(a[1], k.k * b[1]), `(${a.map((x) => fmt(x)).join(", ")})`)); }
  }
  return out;
}

// ======================================================================== transform
// spec: view: {x, y}, grid: {step, axes, labels}, object: {name, pts: [[x, y]…], colour},
//   images: [{name, of?: name, t: {kind: "translate", v} | {kind: "reflect", line: {x}|{y}|{m, c}} | {kind: "rotate", centre, deg}
//   | {kind: "enlarge", centre, k} | {kind: "matrix", m: [[a, b], [c, d]]}, pts (stated), colour, rays?: true}],
//   checks: [{type: "areaScale", image, value}]
function shapes(spec) { const out = { [spec.object.name]: spec.object }; for (const im of spec.images) out[im.name] = im; return out; }
function transform(spec, W, narrow) {
  const view = spec.view, F = frame(view, W, spec.height?.[narrow ? 1 : 0] ?? (narrow ? 400 : 440), narrow ? 18 : 24);
  let s = gridAxes(F, view, spec.grid || { step: 1, axes: true });
  const all = shapes(spec);
  const clipLine = (L) => {
    const [x0, x1] = view.x, [y0, y1] = view.y;
    if (L.x != null) return [[L.x, y0], [L.x, y1]];
    if (L.y != null && L.m == null) return [[x0, L.y], [x1, L.y]];
    const ys = (x) => L.m * x + (L.c || 0), xs = (y) => (y - (L.c || 0)) / L.m;
    const c = [[x0, ys(x0)], [x1, ys(x1)], ...(L.m ? [[xs(y0), y0], [xs(y1), y1]] : [])].filter(([x, y]) => x >= x0 - 1e-9 && x <= x1 + 1e-9 && y >= y0 - 1e-9 && y <= y1 + 1e-9);
    return [c[0], c.at(-1)];
  };
  for (const im of spec.images) {
    const t = im.t, c = col(im.colour || "a2");
    if (t.kind === "reflect") { const [a, b] = clipLine(t.line).map(F.P); s += line(a[0], a[1], b[0], b[1], { stroke: col("a3"), w: 2.2, dash: "8 5" }); if (t.label) s += text(b[0] - 6, b[1] + 16, t.label, { size: 13, weight: 700, fill: col("a3"), anchor: "end" }); }
    if ((t.kind === "rotate" || t.kind === "enlarge") && t.centre) { const [x, y] = F.P(t.centre); s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="5" fill="${col("a3")}"/>`; if (t.label) s += text(x - 8, y + 16, t.label, { size: 13, weight: 700, fill: col("a3"), anchor: "end" }); }
    if (t.kind === "enlarge" && im.rays) { const O = F.P(t.centre); for (const p of im.pts) { const [x, y] = F.P(p); s += line(O[0], O[1], x, y, { stroke: col("a3"), w: 1.3, dash: "4 4" }); } }
    if (t.kind === "translate") { const src = all[im.of || spec.object.name].pts[0], [x1, y1] = F.P(src), [x2, y2] = F.P(im.pts[0]); s += arrow(x1, y1, x2, y2, { stroke: c, w: 2, head: 10, dash: "5 4" }); }
  }
  for (const sh of [spec.object, ...spec.images]) {
    const c = col(sh.colour || (sh === spec.object ? "a1" : "a2")), pp = sh.pts.map(F.P);
    s += `<path d="${pp.map((p, i) => `${i ? "L" : "M"}${f1(p[0])} ${f1(p[1])}`).join(" ")} Z" fill="${c}" fill-opacity=".22" stroke="${c}" stroke-width="2.4" stroke-linejoin="round"/>`;
    const g = [sh.pts.reduce((a, p) => a + p[0], 0) / sh.pts.length, sh.pts.reduce((a, p) => a + p[1], 0) / sh.pts.length], [gx, gy] = F.P(g);
    const [dx, dy] = sh.labelAt || [0, 0];
    s += text(gx + dx, gy + dy, sh.name, { size: 15, weight: 700, fill: c });
  }
  return { s, H: F.H };
}
function transformChecks(spec) {
  const out = [], all = shapes(spec);
  for (const im of spec.images) {
    const src = all[im.of || spec.object.name].pts, want = src.map((p) => transformPoint(im.t, p));
    const bad = want.map((w, i) => (im.pts[i] && near(w[0], im.pts[i][0], 1e-9) && near(w[1], im.pts[i][1], 1e-9) ? null : `(${src[i].join(", ")}) → (${w.map((x) => fmt(x, 4)).join(", ")}), drawn (${im.pts[i]?.join(", ")})`)).filter(Boolean);
    out.push(check(`${im.name} is the image of ${im.of || spec.object.name} under the ${im.t.kind === "matrix" ? "matrix" : im.t.kind}`, !bad.length && im.pts.length === src.length, bad.join("; ") || want.map((w) => `(${w.map((x) => fmt(x)).join(", ")})`).join(" ")));
  }
  for (const k of spec.checks || []) if (k.type === "areaScale") {
    const im = all[k.image], src = all[im.of || spec.object.name], r = Math.abs(area(im.pts)) / Math.abs(area(src.pts));
    const det = im.t.kind === "matrix" ? Math.abs(im.t.m[0][0] * im.t.m[1][1] - im.t.m[0][1] * im.t.m[1][0]) : null;
    out.push(check(k.name || `the area of ${k.image} is ${k.value} times the original`, near(r, k.value, 1e-9) && (det == null || near(det, k.value, 1e-9)), `area ratio ${fmt(r, 4)}${det != null ? `, |det| = ${fmt(det, 4)}` : ""}`));
  }
  return out;
}

const geo = entry(geometry, geometryChecks, [640, 380]);
register({ geometry: geo, vectors: geo, transform: entry(transform, transformChecks, [640, 380]) });
