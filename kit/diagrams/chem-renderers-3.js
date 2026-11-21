// Gradify Visual Learning Engine: chemistry renderers, part 3 (see kit/diagrams/chem-renderers.js for the pattern).
//
//   vsepr      molecular shapes with wedges, hashes and lone pairs; lone pairs counted from the central atom's
//              electrons, then shape, bond angle and polarity from VSEPR
//   lattice    unit cells drawn in 3D; coordination numbers and atoms per cell counted from the generated lattice
//   flow       process and reaction flows, catalytic cycles: equations balance, cycles add up to the stated net
//              equation with the catalyst regenerated, yields and atom economies recomputed
//   apparatus  laboratory set-ups; the geometry is checked as drawn (condenser water in at the lower end,
//              thermometer bulb at the side arm, TLC baseline above the solvent, Rf measured, denser layer below)
//   phase      phase diagrams: the solid–liquid slope from the densities (Clapeyron), triple point against 1 atm,
//              boiling-point elevation and freezing-point depression from Kb and Kf
//   lobes      orbital shapes; angular and radial nodes from l and n
import { register, text, line, arrow, col, f1, esc, near, check, wrap } from "./renderers.js";
import { DATA } from "./data/chemistry.js";
import { balanced, netOf, sameNet, netText, VSEPR, polarShape, formulaMass, parseEquation, ascii } from "./chem-core.js";
import { fm, textWrap, boxLabel, CC as C } from "./chem-renderers.js";

// ======================================================================== vsepr
// spec: molecules: [{label, centre, ligands: [{el, order}], charge, lp (optional: computed), shape, angle, polar,
//   complex: true (a metal centre: no lone pair count), anglePair: [i, j], sub}]
const T = {
  "2,0": { L: [[-1, 0, "p"], [1, 0, "p"]], E: [] },
  "3,0": { L: [[0, -1, "p"], [-0.87, 0.5, "p"], [0.87, 0.5, "p"]], E: [] },
  "2,1": { L: [[-0.87, 0.5, "p"], [0.87, 0.5, "p"]], E: [[0, -1]] },
  "4,0": { L: [[0, -1, "p"], [-0.94, 0.34, "p"], [0.5, 0.78, "w"], [0.86, 0.22, "d"]], E: [] },
  "3,1": { L: [[-0.94, 0.34, "p"], [0.5, 0.78, "w"], [0.86, 0.22, "d"]], E: [[0, -1]] },
  "2,2": { L: [[-0.82, 0.57, "p"], [0.82, 0.57, "p"]], E: [[-0.6, -0.8], [0.6, -0.8]] },
  "5,0": { L: [[0, -1, "p"], [0, 1, "p"], [-1, 0.05, "p"], [0.6, 0.45, "w"], [0.72, -0.32, "d"]], E: [] },
  "4,1": { L: [[0, -1, "p"], [0, 1, "p"], [0.6, 0.45, "w"], [0.72, -0.32, "d"]], E: [[-1, 0.05]] },
  "3,2": { L: [[0, -1, "p"], [0, 1, "p"], [1, 0, "p"]], E: [[-0.6, 0.45], [-0.6, -0.45]] },
  "2,3": { L: [[0, -1, "p"], [0, 1, "p"]], E: [[-1, 0], [0.6, 0.45], [0.6, -0.45]] },
  "6,0": { L: [[0, -1, "p"], [0, 1, "p"], [-1, 0, "p"], [1, 0, "p"], [-0.55, 0.45, "w"], [0.55, -0.45, "d"]], E: [] },
  "5,1": { L: [[0, -1, "p"], [-1, 0, "p"], [1, 0, "p"], [-0.55, 0.45, "w"], [0.55, -0.45, "d"]], E: [[0, 1]] },
  "4,2": { L: [[-1, 0, "p"], [1, 0, "p"], [-0.55, 0.45, "w"], [0.55, -0.45, "d"]], E: [[0, -1], [0, 1]] },
};
const VALENCE = { H: 1, B: 3, C: 4, N: 5, O: 6, F: 7, Si: 4, P: 5, S: 6, Cl: 7, Br: 7, I: 7, Xe: 8, Be: 2, Al: 3, Se: 6 };
function lonePairs(m) {
  if (m.complex) return m.lp ?? 0;
  const used = m.ligands.reduce((a, l) => a + (l.order || 1), 0);
  return (VALENCE[m.centre] - used - (m.charge || 0)) / 2;
}
function bondPath(x1, y1, x2, y2, kind, colr = C.ink) {
  if (kind === "w") { const L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L, ny = (x2 - x1) / L; return `<path d="M${f1(x1)} ${f1(y1)} L${f1(x2 + nx * 6)} ${f1(y2 + ny * 6)} L${f1(x2 - nx * 6)} ${f1(y2 - ny * 6)} Z" fill="${colr}"/>`; }
  if (kind === "d") { let s = ""; const L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L, ny = (x2 - x1) / L; for (let i = 1; i <= 7; i++) { const t = i / 7, x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t, w = 6 * t; s += line(x - nx * w, y - ny * w, x + nx * w, y + ny * w, { stroke: colr, w: 1.6 }); } return s; }
  return line(x1, y1, x2, y2, { stroke: colr, w: 2.4 });
}
// a metal complex's shape comes from its coordination geometry, not from lone pairs on the metal
const GEOM = { linear: "2,0", tetrahedral: "4,0", "square planar": "4,2", octahedral: "6,0", "trigonal bipyramidal": "5,0" };
// 3D directions of the template positions, for cis/trans: square planar and octahedral
const DIR3 = { "4,2": [[-1, 0, 0], [1, 0, 0], [0, 0, 1], [0, 0, -1]], "6,0": [[0, 1, 0], [0, -1, 0], [-1, 0, 0], [1, 0, 0], [0, 0, 1], [0, 0, -1]] };
const keyOf = (m) => (m.complex ? GEOM[m.shape] : `${m.ligands.length},${lonePairs(m)}`);
function vsepr(spec, W, narrow) {
  const ms = spec.molecules, perRow = narrow ? (ms.length > 3 ? 2 : 1) : Math.min(ms.length, spec.perRow || 3);
  const cw = (W - 20) / perRow, ch = spec.cellHeight || (narrow && perRow === 2 ? 230 : 250), Lb = narrow && perRow === 2 ? 48 : 62;
  let s = "", H = 0;
  ms.forEach((m, i) => {
    const key = keyOf(m), t = T[key] && (m.complex ? { ...T[key], E: [] } : T[key]);
    const cx = 10 + (i % perRow) * cw + cw / 2, cy = 24 + Math.floor(i / perRow) * ch + ch / 2 - 28;
    if (!t) { s += text(cx, cy, `no template for ${key}`, { fill: col("bad") }); return; }
    t.L.forEach(([dx, dy, kind], j) => {
      const lg = m.ligands[j], x2 = cx + dx * Lb, y2 = cy + dy * Lb;
      const sh = (lg.el.length > 2 ? 0.62 : 0.8);
      if ((lg.order || 1) === 2 && kind === "p") { const L = Math.hypot(dx, dy), nx = -dy / L * 3.2, ny = dx / L * 3.2; s += line(cx + dx * 14 + nx, cy + dy * 14 + ny, cx + dx * Lb * sh + nx, cy + dy * Lb * sh + ny, { w: 2.2 }) + line(cx + dx * 14 - nx, cy + dy * 14 - ny, cx + dx * Lb * sh - nx, cy + dy * Lb * sh - ny, { w: 2.2 }); }
      else s += bondPath(cx + dx * 13, cy + dy * 13, cx + dx * Lb * sh, cy + dy * Lb * sh, kind);
      s += `<text x="${f1(x2)}" y="${f1(y2)}" font-size="${lg.el.length > 2 ? 13 : 16}" font-weight="700" text-anchor="middle" dominant-baseline="middle" fill="${lg.colour ? col(lg.colour) : C.ink}">${fmText(lg.el)}</text>`;
      if (lg.delta) s += text(x2 + 12, y2 - 13, `δ${lg.delta === "+" ? "+" : "−"}`, { size: 11.5, weight: 700, fill: lg.delta === "+" ? col("a3") : col("a1") });
    });
    for (const [dx, dy] of t.E) {
      const ang = Math.atan2(dy, dx) * 180 / Math.PI, ex = cx + dx * 30, ey = cy + dy * 30;
      s += `<ellipse cx="${f1(ex)}" cy="${f1(ey)}" rx="17" ry="10" transform="rotate(${f1(ang)} ${f1(ex)} ${f1(ey)})" fill="${col("a5")}" fill-opacity=".14" stroke="${col("a5")}" stroke-width="1.2"/>`;
      const px = -dy * 4, py = dx * 4; s += `<circle cx="${f1(ex + px)}" cy="${f1(ey + py)}" r="2.4" fill="${col("a5")}"/><circle cx="${f1(ex - px)}" cy="${f1(ey - py)}" r="2.4" fill="${col("a5")}"/>`;
    }
    s += `<text x="${cx}" y="${cy}" font-size="17" font-weight="800" text-anchor="middle" dominant-baseline="middle" fill="${C.ink}">${fmText(m.centre)}</text>`;
    if (m.centreDelta) s += text(cx - 14, cy - 15, `δ${m.centreDelta === "+" ? "+" : "−"}`, { size: 11.5, weight: 700, fill: m.centreDelta === "+" ? col("a3") : col("a1") });
    if (m.angle && m.showAngle !== false) {
      const [a, b] = m.anglePair || [0, 1], A = t.L[a], B = t.L[b], a1 = Math.atan2(A[1], A[0]), a2 = Math.atan2(B[1], B[0]);
      let d = a2 - a1; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
      const r = 28, p1 = [cx + Math.cos(a1) * r, cy + Math.sin(a1) * r], p2 = [cx + Math.cos(a1 + d) * r, cy + Math.sin(a1 + d) * r];
      s += `<path d="M${f1(p1[0])} ${f1(p1[1])} A${r} ${r} 0 0 ${d > 0 ? 1 : 0} ${f1(p2[0])} ${f1(p2[1])}" fill="none" stroke="${col("a2")}" stroke-width="1.6"/>`;
      const mid = a1 + d / 2; s += text(cx + Math.cos(mid) * (r + 17), cy + Math.sin(mid) * (r + 15), m.angle, { size: 12, weight: 700, fill: col("a2") });
    }
    if (m.dipole) { const sx = cx + (m.dipole[0] || 0) * 0, dir = m.dipole; s += arrow(cx + dir[0] * -Lb * 0.9 + 70, cy + dir[1] * -Lb * 0.9, cx + dir[0] * Lb * 0.9 + 70, cy + dir[1] * Lb * 0.9, { stroke: col("a4"), w: 2.6, head: 10 }) + text(cx + 82, cy + 4, "net dipole", { size: 11, weight: 700, anchor: "start", fill: col("a4") }); }
    const by = cy + Lb + 32;
    s += text(cx, by, fm(m.label || ""), { size: 13.5, weight: 700 });
    const shape = m.complex ? m.shape : (VSEPR[key] || [])[1];
    s += text(cx, by + 18, m.sub || `${shape}${m.angle ? `, ${m.angle}` : ""}`, { size: 12, fill: C.soft });
    if (m.polar != null) s += text(cx, by + 35, m.polar ? "polar" : "non-polar", { size: 12, weight: 700, fill: m.polar ? col("a4") : C.soft });
    H = Math.max(H, by + (m.polar != null ? 44 : 28));
  });
  return { s, H };
}
const fmT = (s) => esc(ascii(s)).replace(/\^\{?(\d*[+-]|\d+)\}?/g, (_, q) => `<tspan baseline-shift="super" font-size="70%">${q.replace("-", "−")}</tspan>`).replace(/([A-Za-z)])(\d+)/g, '$1<tspan baseline-shift="sub" font-size="70%">$2</tspan>');
const fmText = (s) => esc(ascii(s)).replace(/([A-Za-z)])(\d+)/g, '$1<tspan baseline-shift="sub" font-size="70%">$2</tspan>').replace(/\^(\d*[+-])/g, (_, q) => `<tspan baseline-shift="super" font-size="70%">${q.replace("-", "−")}</tspan>`);
function vseprChecks(spec) {
  const out = [];
  for (const m of spec.molecules) {
    const name = m.label || m.centre;
    if (m.complex) {
      const key = GEOM[m.shape];
      out.push(check(`${name}: coordination number ${m.ligands.length} fits a ${m.shape} complex`, !!key && +key.split(",")[0] === m.ligands.length));
      if (m.isomer) {
        const d = DIR3[key], same = m.ligands.map((l, i) => [l.el, i]).filter(([e]) => e === m.isomerLigand).map(([, i]) => d[i]);
        const ang = Math.round((Math.acos(same[0][0] * same[1][0] + same[0][1] * same[1][1] + same[0][2] * same[1][2]) * 180) / Math.PI);
        out.push(check(`${name}: the two ${m.isomerLigand} ligands are ${m.isomer} (${m.isomer === "cis" ? 90 : 180}° apart)`, ang === (m.isomer === "cis" ? 90 : 180), `${ang}° in the drawing`));
      }
      continue;
    }
    const lp = lonePairs(m), key = `${m.ligands.length},${lp}`, row = VSEPR[key];
    if (!m.complex) out.push(check(`${name}: ${m.ligands.length} bonding domain(s) and ${lp} lone pair(s) from the electron count`, Number.isInteger(lp) && lp >= 0 && (m.lp == null || m.lp === lp), `${m.centre} has ${VALENCE[m.centre]} outer electrons, ${m.ligands.reduce((a, l) => a + (l.order || 1), 0)} used in bonds, charge ${m.charge || 0}`));
    out.push(check(`${name}: shape ${m.shape}`, !!row && row[1] === m.shape, row ? `VSEPR gives ${row[1]} (${row[0]} electron pairs)` : `no entry for ${key}`));
    if (m.angle) out.push(check(`${name}: bond angle ${m.angle}`, !!row && row[2].replace("<", "") === m.angle.replace("<", "").replace("about ", "") || (m.angleNote && !!row), row ? `VSEPR gives ${row[2]}` : ""));
    if (m.polar != null) {
      const en = { ...DATA.enPauling.values, centre: DATA.enPauling.values[m.centre] };
      const p = polarShape(m.ligands.length, lp, m.ligands.map((l) => l.el), en);
      out.push(check(`${name}: ${m.polar ? "polar" : "non-polar"}`, p === m.polar, `symmetry and electronegativity give ${p ? "polar" : "non-polar"}`));
    }
  }
  return out;
}

// ======================================================================== lattice
// spec: cells: [{kind: "sc"|"bcc"|"fcc"|"nacl"|"cscl"|"perovskite", label, species: {A: {label, colour, r}}, claims:
//   {coordination: {A: n}, perCell: {A: n}}}]
function sites(kind) {
  const P = [];
  const corners = [], faces = [], body = [[0.5, 0.5, 0.5]], edges = [];
  for (const x of [0, 1]) for (const y of [0, 1]) for (const z of [0, 1]) corners.push([x, y, z]);
  for (const a of [0, 1]) { faces.push([a, 0.5, 0.5], [0.5, a, 0.5], [0.5, 0.5, a]); }
  for (const a of [0, 1]) for (const b of [0, 1]) edges.push([0.5, a, b], [a, 0.5, b], [a, b, 0.5]);
  if (kind === "sc") corners.forEach((p) => P.push([...p, "A"]));
  if (kind === "bcc") { corners.forEach((p) => P.push([...p, "A"])); body.forEach((p) => P.push([...p, "A"])); }
  if (kind === "fcc") { corners.forEach((p) => P.push([...p, "A"])); faces.forEach((p) => P.push([...p, "A"])); }
  if (kind === "nacl") { corners.forEach((p) => P.push([...p, "B"])); faces.forEach((p) => P.push([...p, "B"])); edges.forEach((p) => P.push([...p, "A"])); body.forEach((p) => P.push([...p, "A"])); }
  if (kind === "cscl") { corners.forEach((p) => P.push([...p, "B"])); body.forEach((p) => P.push([...p, "A"])); }
  if (kind === "diamond") { corners.forEach((p) => P.push([...p, "A"])); faces.forEach((p) => P.push([...p, "A"])); for (const q of [[0.25, 0.25, 0.25], [0.75, 0.75, 0.25], [0.75, 0.25, 0.75], [0.25, 0.75, 0.75]]) P.push([...q, "A"]); }
  if (kind === "perovskite") { corners.forEach((p) => P.push([...p, "A"])); body.forEach((p) => P.push([...p, "B"])); faces.forEach((p) => P.push([...p, "X"])); }
  return P;
}
function lattice(spec, W, narrow) {
  const cells = spec.cells, perRow = narrow ? 1 : Math.min(cells.length, 3), cw = (W - 20) / perRow, size = narrow ? 150 : Math.min(150, cw * 0.5), ch = size * 1.6 + 80;
  let s = "", H = 0;
  cells.forEach((c, i) => {
    const ox = 10 + (i % perRow) * cw + cw / 2 - size * 0.62, oy = 22 + Math.floor(i / perRow) * ch + size * 1.32;
    const P = ([x, y, z]) => [ox + x * size + z * size * 0.42, oy - y * size - z * size * 0.3];
    // cube edges, back ones dashed
    const E = [[[0, 0, 0], [1, 0, 0]], [[0, 0, 0], [0, 1, 0]], [[0, 0, 0], [0, 0, 1]], [[1, 1, 1], [0, 1, 1]], [[1, 1, 1], [1, 0, 1]], [[1, 1, 1], [1, 1, 0]], [[1, 0, 0], [1, 1, 0]], [[1, 0, 0], [1, 0, 1]], [[0, 1, 0], [1, 1, 0]], [[0, 1, 0], [0, 1, 1]], [[0, 0, 1], [1, 0, 1]], [[0, 0, 1], [0, 1, 1]]];
    for (const [a, b] of E) { const back = a.every((v, k) => v === [0, 0, 1][k]) || b.every((v, k) => v === [0, 0, 1][k]); const [x1, y1] = P(a), [x2, y2] = P(b); s += line(x1, y1, x2, y2, { stroke: C.line, w: 1.4, dash: back ? "4 4" : "" }); }
    const pts = sites(c.kind).sort((a, b) => b[2] - a[2]);
    if (c.bonds) {
      // bonds between nearest neighbours drawn in the cell (diamond's tetrahedral network)
      const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]), m = Math.min(...pts.flatMap((a, i) => pts.slice(i + 1).map((b) => d(a, b))));
      pts.forEach((a, i) => pts.slice(i + 1).forEach((b) => { if (Math.abs(d(a, b) - m) < 1e-6) { const [x1, y1] = P(a), [x2, y2] = P(b); s += line(x1, y1, x2, y2, { stroke: "#151826", w: 2.4 }); } }));
    }
    for (const [x, y, z, sp] of pts) {
      const st = c.species[sp] || { colour: "a1", r: 11 }, [px, py] = P([x, y, z]), r = (st.r || 11) * (narrow ? 0.9 : 1) * (1 - z * 0.12);
      s += `<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(r)}" fill="${col(st.colour)}" stroke="#151826" stroke-width="1"/><circle cx="${f1(px - r * 0.3)}" cy="${f1(py - r * 0.3)}" r="${f1(r * 0.28)}" fill="#fff" fill-opacity=".55"/>`;
    }
    const bx = 10 + (i % perRow) * cw + cw / 2, by = oy + 34;
    s += text(bx, by, c.label, { size: 13.5, weight: 700 });
    const cn = coordination(c.kind), pc = perCell(c.kind);
    // one line per species: its key colour, how many per cell and its nearest neighbours
    let ly = by + 20;
    for (const [k, st] of Object.entries(c.species)) {
      const t = `${pc[k]} per cell, ${cn[k]} neighbours`, w = (fm(st.label).replace(/[_^]\{|\}/g, "").length + t.length) * 6.4 + 24;
      s += `<circle cx="${f1(bx - w / 2 + 6)}" cy="${ly}" r="6" fill="${col(st.colour)}" stroke="#151826"/>` + text(bx - w / 2 + 16, ly, `${fm(st.label)}: ${t}`, { size: 11.5, anchor: "start", fill: C.soft });
      ly += 18;
    }
    H = Math.max(H, ly);
  });
  return { s, H: H + 4 };
}
function expand(kind) {
  const base = sites(kind).filter(([x, y, z]) => x < 1 && y < 1 && z < 1), out = [];
  for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) for (let k = -2; k <= 2; k++) for (const [x, y, z, s] of base) out.push([x + i, y + j, z + k, s]);
  return { base, out };
}
function coordination(kind) {
  const { base, out } = expand(kind), res = {};
  for (const [x, y, z, s] of base) {
    if (res[s] != null) continue;
    // ionic: count counter-ions; one species: count all neighbours
    const others = out.filter((p) => (new Set(base.map((b) => b[3])).size > 1 && kind !== "perovskite" ? p[3] !== s : true) && !(p[0] === x && p[1] === y && p[2] === z));
    const d = others.map((p) => Math.hypot(p[0] - x, p[1] - y, p[2] - z)), m = Math.min(...d);
    res[s] = d.filter((v) => Math.abs(v - m) < 1e-6).length;
  }
  return res;
}
function perCell(kind) {
  const w = (p) => [p[0], p[1], p[2]].filter((v) => v === 0 || v === 1).length, share = [1, 0.5, 0.25, 0.125], res = {};
  for (const p of sites(kind)) res[p[3]] = (res[p[3]] || 0) + share[w(p)];
  return res;
}
function latticeChecks(spec) {
  const out = [];
  for (const c of spec.cells) {
    const cn = coordination(c.kind), pc = perCell(c.kind);
    for (const [k, v] of Object.entries(c.claims?.coordination || {})) out.push(check(`${c.label}: each ${c.species[k].label} has ${v} nearest neighbours`, cn[k] === v, `counted ${cn[k]} in the generated lattice`));
    for (const [k, v] of Object.entries(c.claims?.perCell || {})) out.push(check(`${c.label}: ${v} ${c.species[k].label} per unit cell`, near(pc[k], v, 1e-9), `counted ${pc[k]} (corners ⅛, edges ¼, faces ½, body 1)`));
    if (c.claims?.formula) { const ks = Object.keys(c.claims.formula); const g = pc[ks[0]] / c.claims.formula[ks[0]]; out.push(check(`${c.label}: ratio ${ks.map((k) => `${c.species[k].label} ${c.claims.formula[k]}`).join(" : ")}`, ks.every((k) => near(pc[k] / c.claims.formula[k], g, 1e-9)))); }
  }
  return out;
}

// ======================================================================== flow
// spec: layout: "line" | "cycle" | "grid", nodes: [{id, label, sub, tone, col, row}], edges: [{from, to, label, eq, dashed}],
//   claims: [{type: "net", steps: [eq], net} | {type: "regenerated", species, steps} | {type: "yield", steps: [..], overall}
//            | {type: "atomEconomy", eq, product, value} | {type: "equation", eq}]
function flow(spec, W, narrow) {
  const N = spec.nodes, byId = Object.fromEntries(N.map((n) => [n.id, n]));
  const pos = {}, bw = narrow ? 150 : spec.boxWidth || 150;
  let H;
  if (spec.layout === "cycle") {
    const R = narrow ? 125 : spec.radius || 140, cx = W / 2, cy = R + 60;
    N.forEach((n, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / N.length; pos[n.id] = [cx + Math.cos(a) * R * (narrow ? 0.9 : 1.35), cy + Math.sin(a) * R]; });
    H = cy + R + 70;
  } else if (spec.layout === "grid") {
    const cols = Math.max(...N.map((n) => n.col)) + 1, rows = Math.max(...N.map((n) => n.row)) + 1, cw = (W - 20) / cols, rh = spec.rowHeight || 110;
    if (narrow && cols > 2) { N.forEach((n, i) => { pos[n.id] = [W / 2, 40 + i * 92]; }); H = 40 + N.length * 92; }
    else { N.forEach((n) => { pos[n.id] = [10 + (n.col + 0.5) * cw, 56 + n.row * rh]; }); H = 56 + (rows - 1) * rh + 40; }
  } else {
    if (narrow) { N.forEach((n, i) => { pos[n.id] = [W / 2, 40 + i * 96]; }); H = 40 + N.length * 96 - 30; }
    else { const cw = (W - 20) / N.length; N.forEach((n, i) => { pos[n.id] = [10 + (i + 0.5) * cw, 70]; }); H = 170; }
  }
  const lineW = narrow ? 22 : Math.max(12, Math.floor((spec.layout === "line" ? (W - 20) / N.length - 16 : bw) / 7.6));
  const dims = Object.fromEntries(N.map((n) => { const ls = wrap(n.label, lineW), sub = n.sub ? wrap(n.sub, lineW + 4) : []; return [n.id, { ls, sub, w: Math.min(spec.layout === "line" && !narrow ? (W - 20) / N.length - 18 : bw + 30, Math.max(...ls.map((l) => l.length), ...sub.map((l) => l.length * 0.86)) * 7.8 + 24), h: ls.length * 17 + sub.length * 15 + 16 }]; }));
  let s = "";
  for (const e of spec.edges || []) {
    const [x1, y1] = pos[e.from], [x2, y2] = pos[e.to], A = dims[e.from], B = dims[e.to];
    const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    const clip = (d, ux2, uy2) => Math.min(Math.abs(ux2) > 1e-6 ? d.w / 2 / Math.abs(ux2) : 1e9, Math.abs(uy2) > 1e-6 ? d.h / 2 / Math.abs(uy2) : 1e9) + 5;
    const a = clip(A, ux, uy), b = clip(B, ux, uy);
    if (spec.layout === "cycle") {
      // each step bows outwards to its own side (perpendicular to its direction), so even a two-step cycle reads as a loop
      const R0 = narrow ? 125 : spec.radius || 140, mx = (x1 + x2) / 2, my = (y1 + y2) / 2, bow = N.length === 2 ? 0.55 : 0.18, ox = -uy * R0 * bow, oy = ux * R0 * bow;
      s += `<path d="M${f1(x1 + ux * a)} ${f1(y1 + uy * a)} Q${f1(mx + ox)} ${f1(my + oy)} ${f1(x2 - ux * b)} ${f1(y2 - uy * b)}" fill="none" stroke="${C.ink}" stroke-width="2"/>`;
      s += arrow(x2 - ux * (b + 10) + ox * 0.1, y2 - uy * (b + 10) + oy * 0.1, x2 - ux * b, y2 - uy * b, { w: 2, head: 9 });
      if (e.label) s += textWrap(mx + ox * 1.25 + (ox > 0 ? 10 : ox < 0 ? -10 : 0), my + oy * 1.25, fm(e.label), narrow ? 14 : 22, { size: 11.5, weight: 700, anchor: ox > 1 ? "start" : ox < -1 ? "end" : "middle", fill: col(e.colour || "a2") });
    } else {
      s += arrow(x1 + ux * a, y1 + uy * a, x2 - ux * b, y2 - uy * b, { w: 2, head: 9, dash: e.dashed ? "6 5" : "" });
      if (e.label) {
        // horizontal arrows: the label above, ending just clear of the line; others: beside the midpoint
        const horiz = Math.abs(uy) < 0.3, ls = wrap(e.label, horiz ? 16 : 26), mx = (x1 + ux * a + x2 - ux * b) / 2, my = (y1 + uy * a + y2 - uy * b) / 2;
        ls.forEach((l, k) => { s += `<text x="${f1(horiz ? mx : mx + 8)}" y="${f1(horiz ? my - 10 - (ls.length - 1 - k) * 14 : my - ((ls.length - 1) * 14) / 2 + k * 14)}" font-size="11" font-weight="700" text-anchor="${horiz ? "middle" : "start"}" dominant-baseline="middle" fill="${col(e.colour || "a2")}" stroke="#fff" stroke-width="4" paint-order="stroke">${esc(l)}</text>`.replace(/>([^<]*)<\/text>$/, (_, t) => `>${fmT(t)}</text>`); });
      }
    }
  }
  for (const n of N) {
    const [x, y] = pos[n.id], d = dims[n.id], tc = n.tone ? col(n.tone) : C.line;
    s += `<rect x="${f1(x - d.w / 2)}" y="${f1(y - d.h / 2)}" width="${f1(d.w)}" height="${f1(d.h)}" rx="12" fill="${n.tone ? tc : "#f7f8fd"}" fill-opacity="${n.tone ? 0.12 : 1}" stroke="${tc}" stroke-width="1.6"/>`;
    d.ls.forEach((l, i) => { s += text(x, y - d.h / 2 + 16 + i * 17, fm(l), { size: 13, weight: 700, fill: n.tone ? tc : C.ink }); });
    d.sub.forEach((l, i) => { s += text(x, y - d.h / 2 + 16 + d.ls.length * 17 + i * 15, fm(l), { size: 11.5, fill: C.soft }); });
  }
  if (spec.centre) s += textWrap(W / 2, (narrow ? 125 : spec.radius || 140) + 52, fm(spec.centre), narrow ? 18 : 24, { size: 12.5, weight: 700, fill: col("a2") });
  let y = H;
  for (const nt of spec.notes || []) { s += textWrap(W / 2, y, fm(nt), narrow ? 46 : 90, { size: 12, fill: C.soft }); y += 18 * Math.ceil(nt.length / (narrow ? 46 : 90)); }
  return { s, H: y + 8 };
}
function flowChecks(spec) {
  const out = [];
  for (const e of spec.edges || []) if (e.eq) { const b = balanced(e.eq); out.push(check(`${e.eq} balances`, b.ok, b.detail)); }
  for (const c of spec.claims || []) {
    if (c.type === "equation") { const b = balanced(c.eq); out.push(check(`${c.eq} balances`, b.ok, b.detail)); }
    if (c.type === "net") { const n = netOf(c.steps); out.push(check(`the steps add up to ${c.net}`, sameNet(n, netOf([c.net])), netText(n))); for (const st of c.steps) { const b = balanced(st); out.push(check(`${st} balances`, b.ok, b.detail)); } }
    if (c.type === "regenerated") { const n = netOf(c.steps), k = ascii(c.species); out.push(check(`${c.species} is regenerated: it is not used up overall`, !(k in n.left) && !(k in n.right), netText(n))); }
    if (c.type === "yield") { const y = c.steps.reduce((a, b) => a * b, 1); out.push(check(`overall yield ${c.steps.map((v) => `${Math.round(v * 100)}%`).join(" × ")} = ${Math.round(c.overall * 100)}%`, Math.abs(y - c.overall) < 0.005, `${(y * 100).toFixed(1)}%`)); }
    if (c.type === "atomEconomy") {
      const { left, right } = parseEquation(c.eq), mr = left.reduce((a, t) => a + t.coef * formulaMass(t.species), 0), p = right.find((t) => ascii(t.species) === ascii(c.product));
      const ae = (100 * p.coef * formulaMass(p.species)) / mr;
      out.push(check(`atom economy for ${c.product} is ${c.value}%`, Math.abs(ae - c.value) < 0.6, `${ae.toFixed(1)}% from relative masses`));
      const b = balanced(c.eq); out.push(check(`${c.eq} balances`, b.ok, b.detail));
    }
  }
  if (!out.length) out.push(check("every step is linked: no box without an arrow", spec.nodes.every((n) => (spec.edges || []).some((e) => e.from === n.id || e.to === n.id))));
  return out;
}

// ======================================================================== apparatus
// spec: kind and per-kind data; drawn on a 460-wide canvas, centred on wide layouts and scaled on phones
const DENSITY = { water: 1.00, "aqueous layer": 1.00, dichloromethane: 1.33, trichloromethane: 1.49, ethoxyethane: 0.71, hexane: 0.66, "ethyl ethanoate": 0.90, cyclohexane: 0.78, "1-bromobutane": 1.27 };
const lab = (x, y, s, o = {}) => text(x, y, fm(s), { size: 12.5, weight: 600, anchor: o.anchor || "start", fill: o.fill || C.ink });
const lbl = (x, y, tx, ty, s, anchor = "start") => line(x, y, tx, ty, { stroke: C.soft, w: 1 }) + lab(tx + (anchor === "start" ? 4 : -4), ty, s, { anchor });
const glass = (d, fillOpacity = 0) => `<path d="${d}" fill="#e8f1fb" fill-opacity="${fillOpacity}" stroke="${C.ink}" stroke-width="2" stroke-linejoin="round"/>`;
function rbFlask(cx, cy, r, liquid = "#dbeafe") {
  return `<path d="M${cx - r} ${cy} A${r} ${r} 0 1 0 ${cx + r} ${cy} Z" fill="${liquid}" fill-opacity=".8"/>` + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.ink}" stroke-width="2"/>` + `<rect x="${cx - 9}" y="${cy - r - 34}" width="18" height="36" fill="#fff" stroke="none"/>` + line(cx - 9, cy - r - 34, cx - 9, cy - r + 4, { w: 2 }) + line(cx + 9, cy - r - 34, cx + 9, cy - r + 4, { w: 2 });
}
function heat(cx, y) { return `<path d="M${cx - 40} ${y} h80 v18 h-80 Z" fill="#fde2d0" stroke="${C.ink}" stroke-width="1.6"/>` + `<path d="M${cx - 12} ${y - 4} q6 -14 12 0 q6 -14 12 0" fill="none" stroke="${col("a3")}" stroke-width="2"/>` + text(cx, y + 9, "heat", { size: 11, weight: 700, fill: col("a3") }); }
function condenser(x1, y1, x2, y2, inlet, outlet) {
  // a Liebig condenser: inner tube and an outer jacket; inlet/outlet as fractions along it
  const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, nx = -uy, ny = ux, j = 16, t = 7;
  const pt = (f, o) => [x1 + ux * L * f + nx * o, y1 + uy * L * f + ny * o];
  const [a, b, c2, d] = [pt(0.08, j), pt(0.92, j), pt(0.92, -j), pt(0.08, -j)];
  let s = `<path d="M${f1(a[0])} ${f1(a[1])} L${f1(b[0])} ${f1(b[1])} L${f1(c2[0])} ${f1(c2[1])} L${f1(d[0])} ${f1(d[1])} Z" fill="#e0f2fe" stroke="${C.ink}" stroke-width="2"/>`;
  s += line(...pt(0, t), ...pt(1, t), { w: 2 }) + line(...pt(0, -t), ...pt(1, -t), { w: 2 });
  const tube = (f, side, dir, label) => { const [px, py] = pt(f, side * j), [qx, qy] = [px + nx * side * 26, py + ny * side * 26]; return line(px, py, qx, qy, { w: 6, stroke: "#9fb4cc" }) + (dir === "in" ? arrow(qx + nx * side * 22, qy + ny * side * 22, qx, qy, { stroke: col("a1"), w: 2, head: 8 }) : arrow(qx, qy, qx + nx * side * 22, qy + ny * side * 22, { stroke: col("a1"), w: 2, head: 8 })) + text(qx + nx * side * 30 + (Math.abs(ny) < 0.5 ? 0 : 0), qy + ny * side * 30 + (Math.abs(nx) > 0.5 ? -12 : 0), label, { size: 11.5, weight: 700, anchor: Math.abs(nx) > 0.5 ? (nx * side > 0 ? "start" : "end") : "middle", fill: col("a1") }); };
  const pIn = pt(inlet.f, inlet.side * j), pOut = pt(outlet.f, outlet.side * j);
  s += tube(inlet.f, inlet.side, "in", "water in") + tube(outlet.f, outlet.side, "out", "water out");
  return { s, inY: pIn[1], outY: pOut[1] };
}
function apparatus(spec, W, narrow) {
  const k = spec.kind, d = APP[k] ? APP[k](spec) : { s: text(230, 40, `no drawing for ${k}`), H: 80 };
  const sc = narrow ? W / 470 : 1, dx = narrow ? 0 : (W - 460) / 2;
  return { s: `<g transform="translate(${f1(dx)} 0) scale(${f1(sc)})">${d.s}</g>`, H: d.H * sc, geom: d.geom };
}
const APP = {
  reflux(spec) {
    let s = heat(160, 372) + rbFlask(160, 320, 48, spec.liquidColour || "#fde68a");
    const c = condenser(160, 236, 160, 60, { f: 0.15, side: 1 }, { f: 0.85, side: 1 }); // water in near the bottom, out near the top
    s += c.s + line(151, 236, 151, 250, { w: 2 }) + line(169, 236, 169, 250, { w: 2 });
    s += text(160, 46, "open to the air", { size: 11.5, weight: 600, fill: C.soft });
    for (const [x, y] of [[148, 340], [170, 346], [158, 354]]) s += `<circle cx="${x}" cy="${y}" r="3.5" fill="#94a3b8"/>`;
    s += lbl(205, 336, 290, 336, spec.mixture || "reaction mixture") + lbl(166, 350, 290, 366, "anti-bumping granules");
    if (spec.funnel) s += `<path d="M110 ${250} l-30 -60 h50 Z" fill="#e8f1fb" stroke="${C.ink}" stroke-width="2"/>` + line(118, 250, 135, 286, { w: 2 }) + lab(40, 176, spec.funnel);
    return { s, H: 400, geom: { inY: c.inY, outY: c.outY, open: true } };
  },
  distillation(spec) {
    let s = heat(110, 372) + rbFlask(110, 320, 46, spec.liquidColour || "#fde68a");
    const armY = 232;
    s += line(101, 240, 101, 196, { w: 2 }) + line(119, 240, 119, 216, { w: 2 }) + `<path d="M101 196 h18 v20" fill="none" stroke="${C.ink}" stroke-width="2"/>`;
    // thermometer: bulb at the side arm
    const bulbY = spec.bulbY ?? armY;
    s += `<rect x="106" y="120" width="8" height="${bulbY - 128}" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.6"/><circle cx="110" cy="${bulbY}" r="6" fill="#ef4444" stroke="${C.ink}" stroke-width="1.6"/>`;
    s += lbl(116, 140, 190, 112, "thermometer: bulb level with the side arm");
    const c = condenser(119, armY, 360, 320, { f: 0.85, side: 1 }, { f: 0.15, side: -1 });
    s += c.s + `<path d="M350 320 l30 18" stroke="${C.ink}" stroke-width="2"/>` + `<path d="M366 330 h60 v50 h-60 Z" fill="#dbeafe" fill-opacity=".7" stroke="${C.ink}" stroke-width="2"/>` + lab(380, 398, "distillate");
    s += text(110, 404, spec.mixture || "mixture", { size: 12.5, weight: 600, fill: C.ink });
    return { s, H: 416, geom: { inY: c.inY, outY: c.outY, bulbY, armY } };
  },
  separating(spec) {
    const [top, bot] = spec.layers, dTop = DENSITY[top.name], dBot = DENSITY[bot.name];
    let s = `<path d="M180 40 Q170 60 172 80 L150 210 Q160 260 230 268 Q300 260 310 210 L288 80 Q290 60 280 40 Z" fill="none" stroke="${C.ink}" stroke-width="2"/>`;
    s += `<path d="M164 150 L150 210 Q160 260 230 268 Q300 260 310 210 L296 150 Z" fill="${bot.colour || "#bfdbfe"}" fill-opacity=".85"/>`;
    s += `<path d="M176 90 L164 150 L296 150 L284 90 Z" fill="${top.colour || "#fde68a"}" fill-opacity=".85"/>`;
    s += line(164, 150, 296, 150, { w: 1.6, dash: "5 4" });
    s += `<rect x="222" y="268" width="16" height="50" fill="#fff" stroke="${C.ink}" stroke-width="2"/><rect x="210" y="290" width="40" height="10" rx="3" fill="#94a3b8" stroke="${C.ink}" stroke-width="1.4"/>` + lab(256, 296, "tap");
    s += `<rect x="217" y="24" width="26" height="18" rx="4" fill="#94a3b8" stroke="${C.ink}" stroke-width="1.4"/>` + lab(250, 30, "stopper");
    s += lbl(290, 118, 330, 104, `${top.name} (${dTop.toFixed(2)} g cm⁻³)`) + lbl(300, 200, 330, 216, `${bot.name} (${dBot.toFixed(2)} g cm⁻³)`);
    if (top.note) s += lab(330, 122, top.note, { fill: C.soft }); if (bot.note) s += lab(330, 234, bot.note, { fill: C.soft });
    return { s, H: 330, geom: { dTop, dBot } };
  },
  tlc(spec) {
    const plates = spec.plates || [spec.plate], pw = Math.min(150, 420 / plates.length - 14), ph = 250;
    let s = "";
    const geom = [];
    plates.forEach((p, i) => {
      const x = 20 + i * (pw + 30) + (460 - plates.length * (pw + 30)) / 2, y = 30, base = y + ph - 40, front = y + 24, solvent = y + ph - 18;
      s += `<rect x="${x - 8}" y="${solvent}" width="${pw + 16}" height="${y + ph + 10 - solvent}" fill="#dbeafe" fill-opacity=".8"/>`;
      s += `<rect x="${x}" y="${y}" width="${pw}" height="${ph}" fill="#fbfbf7" stroke="${C.ink}" stroke-width="1.8"/>`;
      s += line(x, base, x + pw, base, { stroke: C.soft, w: 1.2, dash: "5 4" }) + line(x, front, x + pw, front, { stroke: col("a1"), w: 1.4, dash: "3 3" });
      const lanes = p.lanes, lw = pw / lanes.length;
      lanes.forEach((ln, j) => {
        const lx = x + lw * (j + 0.5);
        for (const rf of ln.spots) { const sy = base - rf * (base - front); s += `<ellipse cx="${f1(lx)}" cy="${f1(sy)}" rx="${f1(Math.min(9, lw * 0.3))}" ry="5.5" fill="${col(ln.colour || "a5")}" fill-opacity=".8"/>`; }
        s += text(lx, y + ph + 26, ln.label, { size: 11.5, weight: 700 });
      });
      if (p.title) s += text(x + pw / 2, y - 12, p.title, { size: 12.5, weight: 700 });
      if (i === 0) s += lab(x - 12, base, "baseline", { anchor: "end", fill: C.soft }) + lab(x - 12, front, "solvent front", { anchor: "end", fill: col("a1") }) + lab(x - 12, solvent + 8, "solvent", { anchor: "end", fill: C.soft });
      geom.push({ base, front, solvent });
    });
    if (spec.rfNote) s += text(230, 330, spec.rfNote, { size: 12.5, weight: 700, fill: col("a2") });
    return { s, H: spec.rfNote ? 344 : 320, geom };
  },
  column(spec) {
    let s = `<path d="M200 40 v250 l20 30 v30 h20 v-30 l20 -30 v-250" fill="none" stroke="${C.ink}" stroke-width="2"/>`;
    s += `<rect x="202" y="90" width="56" height="198" fill="#f1efe6"/>` + `<rect x="202" y="60" width="56" height="30" fill="#dbeafe" fill-opacity=".8"/>`;
    const bands = spec.bands; // [{label, polarity, y (0 top .. 1 bottom), colour}]
    for (const b of bands) s += `<rect x="202" y="${f1(96 + b.y * 180)}" width="56" height="14" fill="${col(b.colour)}" fill-opacity=".85"/>` + lbl(258, 103 + b.y * 180, 300, 103 + b.y * 180, `${b.label}${b.note ? ` (${b.note})` : ""}`);
    s += lab(30, 75, "eluent added at the top", { fill: C.soft }) + lab(30, 190, "silica (polar)", { fill: C.soft });
    if (spec.pressure) s += arrow(230, 4, 230, 34, { stroke: col("a1"), w: 2.2, head: 8 }) + lab(240, 16, "air pressure", { fill: col("a1") });
    s += `<path d="M206 368 h48 v40 h-48 Z" fill="${col(bands.at(-1).colour)}" fill-opacity=".35" stroke="${C.ink}" stroke-width="1.8"/>` + lab(262, 392, `first to elute: ${bands.at(-1).label}`);
    return { s, H: 420 };
  },
  titration(spec) {
    let s = `<rect x="214" y="20" width="22" height="250" fill="#fff" stroke="${C.ink}" stroke-width="2"/>`;
    s += `<rect x="216" y="${20 + 250 * (spec.initial / 50)}" width="18" height="${250 - 250 * (spec.initial / 50)}" fill="#dbeafe" fill-opacity=".9"/>`;
    for (let v = 0; v <= 50; v += 5) s += line(236, 20 + v * 5, 244, 20 + v * 5, { w: 1 }) + (v % 10 ? "" : text(250, 20 + v * 5, String(v), { size: 10, anchor: "start", fill: C.soft }));
    s += `<path d="M219 270 h12 v10 h-12 Z" fill="#94a3b8" stroke="${C.ink}" stroke-width="1.4"/><path d="M222 280 v26 h6 v-26" fill="none" stroke="${C.ink}" stroke-width="1.6"/>`;
    s += `<path d="M205 320 h40 v20 l40 60 h-120 l40 -60 Z" fill="none" stroke="${C.ink}" stroke-width="2"/><path d="M178 375 l-13 25 h120 l-13 -25 Z" fill="${spec.colour || "#fbcfe8"}" fill-opacity=".9"/>`;
    s += lbl(214, 60, 120, 50, "burette: titrant", "end") + text(225, 420, `conical flask: ${spec.analyte || "analyte + indicator"}`, { size: 12.5, weight: 600, fill: C.ink });
    s += lab(300, 120, `initial reading ${spec.initial.toFixed(2)} cm³`) + lab(300, 142, `final reading ${spec.final.toFixed(2)} cm³`) + lab(300, 168, `titre ${spec.titre.toFixed(2)} cm³`, { fill: col("a2") });
    s += lab(300, 196, "read the bottom of the meniscus at eye level", { fill: C.soft });
    s += `<rect x="0" y="0" width="0" height="0"/>`;
    return { s, H: 432 };
  },
  filtration(spec) {
    let s = `<path d="M70 60 h120 l-50 70 v60 h-20 v-60 Z" fill="none" stroke="${C.ink}" stroke-width="2"/><path d="M80 66 h100 l-50 62 Z" fill="#f8fafc" stroke="${C.soft}" stroke-width="1.2"/><path d="M98 90 h64 l-32 38 Z" fill="${spec.residueColour || "#d6c7a1"}"/>`;
    s += `<path d="M85 200 v120 h90 v-120" fill="none" stroke="${C.ink}" stroke-width="2"/><path d="M87 270 h86 v48 h-86 Z" fill="#dbeafe" fill-opacity=".9"/>`;
    s += lbl(150, 100, 210, 80, `residue: ${spec.residue}`) + lbl(170, 290, 210, 300, `filtrate: ${spec.filtrate}`) + text(130, 40, "gravity filtration", { size: 12.5, weight: 700 });
    // Büchner
    s += `<path d="M300 90 h110 v26 h-110 Z" fill="#f1f5f9" stroke="${C.ink}" stroke-width="2"/><path d="M345 116 v30 h20 v-30" fill="none" stroke="${C.ink}" stroke-width="2"/><path d="M310 100 h90" stroke="${spec.residueColour || "#d6c7a1"}" stroke-width="10"/>`;
    s += `<path d="M330 150 h50 l35 150 h-120 Z" fill="none" stroke="${C.ink}" stroke-width="2"/><path d="M302 270 h106 l7 30 h-120 Z" fill="#dbeafe" fill-opacity=".9"/>`;
    s += line(395, 180, 440, 180, { w: 5, stroke: "#9fb4cc" }) + arrow(420, 165, 455, 165, { stroke: col("a1"), w: 2, head: 8 }) + lab(400, 155, "to vacuum", { fill: col("a1") }) + text(355, 40, "Büchner (suction)", { size: 12.5, weight: 700 });
    return { s, H: 330 };
  },
  calorimeter(spec) {
    let s = `<path d="M150 120 l12 200 h136 l12 -200" fill="#fff" stroke="${C.ink}" stroke-width="2"/><path d="M155 170 l7 150 h136 l7 -150 Z" fill="#dbeafe" fill-opacity=".8"/>`;
    s += `<rect x="140" y="104" width="180" height="16" rx="4" fill="#e2e8f0" stroke="${C.ink}" stroke-width="1.6"/>`;
    s += `<rect x="226" y="30" width="8" height="250" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.6"/><circle cx="230" cy="284" r="6" fill="#ef4444" stroke="${C.ink}"/>`;
    s += lbl(150, 220, 70, 220, "expanded polystyrene cup", "end") + lbl(140, 112, 70, 112, "lid", "end") + lbl(234, 60, 300, 50, "thermometer (±0.1 °C)");
    s += lab(330, 150, spec.mixture || "acid + alkali");
    const q = spec.mass * 4.18 * spec.dT;
    s += lab(330, 190, `m = ${spec.mass} g, ΔT = ${spec.dT} °C`) + lab(330, 212, `q = mcΔT = ${spec.mass} × 4.18 × ${spec.dT}`) + lab(330, 234, `= ${Math.round(q)} J`, { fill: col("a2") });
    if (spec.moles) s += lab(330, 262, `ΔH = −${(q / 1000).toFixed(2)} ÷ ${spec.moles}`) + lab(330, 284, `= −${(q / 1000 / spec.moles).toFixed(1)} kJ mol⁻¹`, { fill: col("a2") });
    return { s, H: 340 };
  },
  fractionating(spec) {
    let s = `<path d="M180 30 h100 v300 l30 40 h-160 l30 -40 Z" fill="#f8fafc" stroke="${C.ink}" stroke-width="2"/>`;
    for (let i = 1; i < 8; i++) s += line(180, 30 + i * 38, 280, 30 + i * 38, { stroke: C.line, w: 1.4, dash: "6 4" });
    s += `<path d="M150 380 h160 v20 h-160 Z" fill="#fde2d0" stroke="${C.ink}" stroke-width="1.6"/>` + text(230, 390, "crude oil heated", { size: 11, weight: 700, fill: col("a3") });
    s += lab(60, 40, "cooler", { fill: col("a1") }) + lab(60, 330, "hotter", { fill: col("a3") }) + arrow(70, 320, 70, 52, { stroke: C.soft, w: 1.6, head: 8 });
    spec.fractions.forEach((f, i) => { const y = 50 + i * ((300) / spec.fractions.length); s += line(280, y, 310, y, { w: 5, stroke: "#9fb4cc" }) + arrow(310, y, 330, y, { w: 2, head: 7 }) + lab(336, y - 6, f.name) + lab(336, y + 10, `${f.bp} °C`, { fill: C.soft }); });
    return { s, H: 410 };
  },
  paper(spec) {
    const x = 150, y = 30, pw = 160, ph = 250, base = y + ph - 40, front = y + 22, solvent = y + ph - 18;
    let s = `<path d="M${x - 30} ${y - 10} h${pw + 60} v${ph + 30} h${-(pw + 60)} Z" fill="none" stroke="${C.ink}" stroke-width="2"/><rect x="${x - 28}" y="${solvent}" width="${pw + 56}" height="${y + ph + 18 - solvent}" fill="#dbeafe" fill-opacity=".8"/>`;
    s += `<rect x="${x}" y="${y}" width="${pw}" height="${ph}" fill="#fbfbf7" stroke="${C.ink}" stroke-width="1.4"/>` + line(x, base, x + pw, base, { stroke: C.soft, w: 1.2, dash: "5 4" }) + line(x, front, x + pw, front, { stroke: col("a1"), w: 1.4, dash: "3 3" });
    const lw = pw / spec.lanes.length;
    spec.lanes.forEach((ln, j) => { const lx = x + lw * (j + 0.5); for (const sp of ln.spots) s += `<circle cx="${f1(lx)}" cy="${f1(base - sp.rf * (base - front))}" r="6" fill="${col(sp.colour)}" fill-opacity=".85"/>`; s += text(lx, y + ph + 32, ln.label, { size: 11.5, weight: 700 }); });
    s += lab(x - 36, base, "pencil baseline", { anchor: "end", fill: C.soft }) + lab(x - 36, front, "solvent front", { anchor: "end", fill: col("a1") }) + lab(x - 36, solvent + 8, "solvent", { anchor: "end", fill: C.soft });
    // Rf measured for the marked spot
    if (spec.measure) { const [j, k] = spec.measure, lx = x + lw * (j + 0.5) + lw * 0.32, sy = base - spec.lanes[j].spots[k].rf * (base - front); s += arrow(x + pw + 14, base, x + pw + 14, sy, { stroke: col("a2"), w: 1.6, head: 7, both: true }) + arrow(x + pw + 34, base, x + pw + 34, front, { stroke: col("a1"), w: 1.6, head: 7, both: true }) + lab(x + pw + 40, (base + front) / 2, `R_{f} = ${spec.lanes[j].spots[k].rf.toFixed(2)}`, { fill: col("a2") }); }
    return { s, H: 330, geom: [{ base, front, solvent }] };
  },
};
function apparatusChecks(spec) {
  const out = [], g = APP[spec.kind] ? APP[spec.kind](spec).geom : null;
  if (spec.kind === "reflux" || spec.kind === "distillation") out.push(check("condenser: cooling water enters at the lower end and leaves at the upper end", g.inY > g.outY, `inlet y ${g.inY.toFixed(0)}, outlet y ${g.outY.toFixed(0)} (down the page is larger)`));
  if (spec.kind === "reflux") out.push(check("reflux condenser is open at the top (a sealed system would build up pressure)", g.open));
  if (spec.kind === "distillation") out.push(check("thermometer bulb is level with the side arm, where the vapour leaves", Math.abs(g.bulbY - g.armY) <= 4));
  if (spec.kind === "separating") out.push(check(`the denser liquid (${spec.layers[1].name}) is the lower layer`, g.dBot > g.dTop, `${g.dBot} against ${g.dTop} g cm⁻³`));
  if (spec.kind === "tlc" || spec.kind === "paper") {
    for (const p of g) out.push(check("the baseline is above the solvent, so the spots do not dissolve into it", p.base < p.solvent));
    const lanes = spec.kind === "paper" ? spec.lanes.map((l) => ({ ...l, spots: l.spots.map((s) => s.rf) })) : (spec.plates || [spec.plate]).flatMap((p) => p.lanes);
    out.push(check("every spot lies between the baseline and the solvent front (0 < Rf < 1)", lanes.every((l) => l.spots.every((r) => r > 0 && r < 1))));
    for (const c of spec.claims || []) {
      if (c.type === "same") { const a = lanes.find((l) => l.label === c.a), b = lanes.find((l) => l.label === c.b); out.push(check(`${c.a} and ${c.b} share a spot at Rf ${c.rf}`, a.spots.includes(c.rf) && b.spots.includes(c.rf))); }
      if (c.type === "pure") { const l = lanes.find((x) => x.label === c.lane); out.push(check(`${c.lane}: ${c.pure ? "one spot (pure)" : "more than one spot (a mixture)"}`, (l.spots.length === 1) === c.pure, `${l.spots.length} spot(s)`)); }
      if (c.type === "rf") { const l = lanes.find((x) => x.label === c.lane); const rf = c.distance / c.front; out.push(check(`Rf = ${c.distance} ÷ ${c.front} = ${c.value}`, Math.abs(rf - c.value) < 0.005 && l.spots.some((r) => Math.abs(r - c.value) < 0.005), `${rf.toFixed(3)}`)); }
      if (c.type === "gone") { const l = lanes.find((x) => x.label === c.lane); out.push(check(`${c.lane}: the starting material spot (Rf ${c.rf}) has gone`, !l.spots.includes(c.rf))); }
    }
  }
  if (spec.kind === "column") {
    const order = [...spec.bands].sort((a, b) => b.y - a.y);
    out.push(check("on polar silica the least polar compound moves fastest and elutes first", order.every((b, i) => !i || b.polarity >= order[i - 1].polarity), order.map((b) => `${b.label} (polarity ${b.polarity})`).join(" → ")));
  }
  if (spec.kind === "titration") out.push(check(`titre = final − initial = ${spec.titre.toFixed(2)} cm³`, Math.abs(spec.final - spec.initial - spec.titre) < 0.005));
  if (spec.kind === "calorimeter") {
    const q = spec.mass * 4.18 * spec.dT; out.push(check(`q = mcΔT = ${Math.round(q)} J`, Math.abs(q - spec.q) < 1, `${q.toFixed(1)} J`));
    if (spec.moles) out.push(check(`ΔH = −q ÷ n = ${spec.dH} kJ mol⁻¹`, Math.abs(-q / 1000 / spec.moles - spec.dH) < 0.15, `${(-q / 1000 / spec.moles).toFixed(2)}`));
  }
  if (spec.kind === "fractionating") { const lo = spec.fractions.map((f) => +String(f.bp).replace(/[^\d.-].*$/, "").replace("<", "") || 0); out.push(check("fractions with lower boiling points leave higher up the column", spec.fractions.every((f, i) => !i || f.order > spec.fractions[i - 1].order))); }
  if (spec.kind === "filtration") out.push(check(`the residue (${spec.residue}) is the insoluble substance`, spec.insoluble === spec.residue));
  if (!out.length) out.push(check("apparatus drawn", true));
  return out;
}

// ======================================================================== phase
// spec: substance: "water" | "carbon dioxide", solution: {molality, i} (colligative), claims: {slope: "negative", sublimes: bool,
//   dTb, dTf}
const PH = { water: { ice: 0.917, liquid: 1.000, triple: [0.01, 0.00604], critical: [374, 218], mp: 0, bp: 100, Kb: 0.512, Kf: 1.86 },
  "carbon dioxide": { ice: 1.56, liquid: 1.18, triple: [-56.6, 5.11], critical: [31.0, 72.8], subl: -78.5 } };
function phase(spec, W, narrow) {
  const H = narrow ? 330 : 360, pad = { l: 46, r: 16, t: 20, b: 40 }, d = PH[spec.substance];
  const X = (u) => pad.l + u * (W - pad.l - pad.r), Y = (v) => H - pad.b - v * (H - pad.t - pad.b);
  // schematic coordinates (not to scale): triple point at (0.3, 0.3), 1 atm line at y = 0.5 for water, 0.15 for CO₂
  const water = spec.substance === "water", tp = [0.3, water ? 0.3 : 0.45], cp = [0.85, 0.82], atm = water ? 0.5 : 0.22;
  const slope = d.ice < d.liquid ? -1 : 1; // Clapeyron: dp/dT = ΔH/(TΔV); ΔV of melting = V(liquid) − V(solid)
  let s = line(pad.l, Y(0), W - pad.r, Y(0), { w: 1.6 }) + line(pad.l, Y(0), pad.l, Y(1), { w: 1.6 });
  s += text(W - pad.r, H - 12, "temperature", { size: 12, weight: 600, anchor: "end", fill: C.soft }) + text(pad.l + 4, pad.t - 4, "pressure", { size: 12, weight: 600, anchor: "start", fill: C.soft });
  const curve = (pts, c = C.ink, w = 2.6, dash = "") => `<path d="${pts.map(([u, v], i) => `${i ? "L" : "M"}${f1(X(u))} ${f1(Y(v))}`).join(" ")}" fill="none" stroke="${c}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
  const sg = [], lg = [], sl = [[tp[0], tp[1]], [tp[0] + slope * 0.05, 1]];
  for (let i = 0; i <= 20; i++) { const u = (tp[0] * i) / 20; sg.push([u, tp[1] * Math.exp(4 * (u / tp[0] - 1)) - tp[1] * Math.exp(-4) * (1 - u / tp[0])]); }
  for (let i = 0; i <= 20; i++) { const t = i / 20, u = tp[0] + (cp[0] - tp[0]) * t; lg.push([u, tp[1] + (cp[1] - tp[1]) * (Math.exp(1.6 * t) - 1) / (Math.exp(1.6) - 1)]); }
  s += curve(sg) + curve(lg) + curve(sl);
  s += `<circle cx="${f1(X(tp[0]))}" cy="${f1(Y(tp[1]))}" r="5" fill="${col("a2")}"/><circle cx="${f1(X(cp[0]))}" cy="${f1(Y(cp[1]))}" r="5" fill="${col("a2")}"/>`;
  s += text(X(tp[0]) + 8, Y(tp[1]) + 16, `triple point (${d.triple[0]} °C, ${d.triple[1]} atm)`, { size: 11, weight: 700, anchor: "start", fill: col("a2") });
  s += text(X(cp[0]) - 6, Y(cp[1]) - 12, `critical point (${d.critical[0]} °C, ${d.critical[1]} atm)`, { size: 11, weight: 700, anchor: "end", fill: col("a2") });
  s += line(pad.l, Y(atm), W - pad.r, Y(atm), { stroke: C.line, w: 1.2, dash: "5 4" }) + text(pad.l - 4, Y(atm), "1 atm", { size: 11, weight: 600, anchor: "end", fill: C.soft });
  s += text(X(0.12), Y(0.75), "solid", { size: 14, weight: 800, fill: col("a1") }) + text(X(0.55), Y(0.72), "liquid", { size: 14, weight: 800, fill: col("a4") }) + text(X(0.72), Y(0.2), "gas", { size: 14, weight: 800, fill: col("a3") });
  if (water) {
    const mpU = tp[0] + slope * 0.05 * ((atm - tp[1]) / (1 - tp[1])), bpU = lg.find(([, v]) => v >= atm)[0];
    s += `<circle cx="${f1(X(mpU))}" cy="${f1(Y(atm))}" r="4" fill="${C.ink}"/><circle cx="${f1(X(bpU))}" cy="${f1(Y(atm))}" r="4" fill="${C.ink}"/>`;
    s += text(X(mpU) - 6, Y(atm) - 12, "0 °C", { size: 11, weight: 700, anchor: "end" }) + text(X(bpU) - 8, Y(atm) - 14, "100 °C", { size: 11, weight: 700, anchor: "end" });
    if (spec.solution) {
      const sh = 0.07, lg2 = lg.map(([u, v]) => [u + sh * (0.4 + 0.6 * (v - tp[1]) / (cp[1] - tp[1])), v * 0.97]).filter(([u]) => u <= 0.98), sl2 = [[tp[0] - 0.06, tp[1] * 0.93], [tp[0] - 0.06 + slope * 0.05, 1]];
      s += curve(lg2, col("a2"), 2.2, "7 5") + curve(sl2, col("a2"), 2.2, "7 5");
      s += text(X(0.98), Y(0.94), "solution (dashed)", { size: 11.5, weight: 700, anchor: "end", fill: col("a2") });
      s += text(X(0.98), Y(0.94) + 16, `ΔT_{b} = K_{b}m = ${(d.Kb * spec.solution.molality * (spec.solution.i || 1)).toFixed(2)} K; ΔT_{f} = K_{f}m = ${(d.Kf * spec.solution.molality * (spec.solution.i || 1)).toFixed(2)} K`, { size: 11, anchor: "end", fill: C.soft });
    }
  } else s += text(X(0.15), Y(atm) - 12, `sublimes at ${d.subl} °C`, { size: 11, weight: 700, anchor: "start" });
  return { s, H };
}
function phaseChecks(spec) {
  const d = PH[spec.substance], out = [], c = spec.claims || {}, slope = d.ice < d.liquid ? "negative" : "positive";
  if (c.slope) out.push(check(`solid–liquid line slopes ${c.slope}: the solid is ${d.ice < d.liquid ? "less" : "more"} dense than the liquid`, c.slope === slope, `solid ${d.ice}, liquid ${d.liquid} g cm⁻³`));
  if (c.sublimes != null) out.push(check(`${c.sublimes ? "sublimes" : "melts"} at 1 atm: the triple point is ${d.triple[1] > 1 ? "above" : "below"} 1 atm`, c.sublimes === d.triple[1] > 1, `${d.triple[1]} atm`));
  if (spec.solution) {
    const m = spec.solution.molality * (spec.solution.i || 1);
    if (c.dTb != null) out.push(check(`ΔTb = ${d.Kb} × ${m} = ${c.dTb} K`, Math.abs(d.Kb * m - c.dTb) < 0.006));
    if (c.dTf != null) out.push(check(`ΔTf = ${d.Kf} × ${m} = ${c.dTf} K`, Math.abs(d.Kf * m - c.dTf) < 0.006));
  }
  return out;
}

// ======================================================================== lobes
// spec: orbitals: [{name: "1s"|"2s"|"2px"|"2py"|"2pz"|"3dxy"|"3dxz"|"3dyz"|"3dx2-y2"|"3dz2", claims: {angular, radial}}] | kind: "sigma-pi"
function lobe(cx, cy, ang, len, wid, c) { const a = ang * Math.PI / 180, ex = cx + Math.cos(a) * len / 2, ey = cy + Math.sin(a) * len / 2; return `<ellipse cx="${f1(ex)}" cy="${f1(ey)}" rx="${f1(len / 2)}" ry="${f1(wid / 2)}" transform="rotate(${ang} ${f1(ex)} ${f1(ey)})" fill="${c}" fill-opacity=".55" stroke="${c}" stroke-width="1.4"/>`; }
function lobes(spec, W, narrow) {
  if (spec.kind === "sigma-pi") return sigmaPi(spec, W, narrow);
  const n = spec.orbitals.length, perRow = narrow ? 2 : n <= 5 ? n : Math.ceil(n / 2), cw = (W - 20) / perRow, ch = 186;
  let s = "";
  spec.orbitals.forEach((o, i) => {
    const cx = 10 + (i % perRow) * cw + cw / 2, cy = 20 + Math.floor(i / perRow) * ch + 70, Lm = narrow ? 52 : 60, A = col("a1"), B = col("a2");
    s += line(cx - Lm - 8, cy, cx + Lm + 8, cy, { stroke: C.line, w: 1, dash: "3 3" }) + line(cx, cy - Lm - 8, cx, cy + Lm + 8, { stroke: C.line, w: 1, dash: "3 3" });
    const nm = o.name.replace(/^\d/, "");
    if (nm === "s") { const r = 18 + +o.name[0] * 9; s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${A}" fill-opacity=".45" stroke="${A}" stroke-width="1.4"/>`; if (o.name[0] === "2") s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.42}" fill="${B}" fill-opacity=".5" stroke="${B}"/>`; }
    const two = (ang) => lobe(cx, cy, ang, Lm, Lm * 0.55, A) + lobe(cx, cy, ang + 180, Lm, Lm * 0.55, B);
    const four = (ang) => lobe(cx, cy, ang, Lm, Lm * 0.45, A) + lobe(cx, cy, ang + 90, Lm, Lm * 0.45, B) + lobe(cx, cy, ang + 180, Lm, Lm * 0.45, A) + lobe(cx, cy, ang + 270, Lm, Lm * 0.45, B);
    if (nm === "px") s += two(0); if (nm === "pz") s += two(-90); if (nm === "py") s += lobe(cx, cy, -35, Lm * 0.9, Lm * 0.5, A) + lobe(cx, cy, 145, Lm * 0.9, Lm * 0.5, B);
    if (nm === "dxy") s += four(45); if (nm === "dx2-y2") s += four(0); if (nm === "dxz" || nm === "dyz") s += four(45);
    if (nm === "dz2") s += lobe(cx, cy, -90, Lm, Lm * 0.5, A) + lobe(cx, cy, 90, Lm, Lm * 0.5, A) + `<ellipse cx="${cx}" cy="${cy}" rx="${Lm * 0.55}" ry="${Lm * 0.16}" fill="${B}" fill-opacity=".55" stroke="${B}"/>`;
    const axes = { px: ["x", "z"], py: ["y (into page)", "z"], pz: ["x", "z"], dxy: ["x", "y"], "dx2-y2": ["x", "y"], dxz: ["x", "z"], dyz: ["y", "z"], dz2: ["x", "z"], s: ["x", "y"] }[nm] || ["x", "y"];
    s += text(cx + Lm + 10, cy - 8, axes[0], { size: 10.5, anchor: "start", fill: C.soft }) + text(cx + 6, cy - Lm - 10, axes[1], { size: 10.5, anchor: "start", fill: C.soft });
    s += text(cx, cy + Lm + 30, o.name.replace(/x2-y2/, "x²−y²").replace(/z2/, "z²").replace(/^(\d)([spd])(.*)$/, (_, a, b, c) => `${a}${b}${c ? `_{${c}}` : ""}`), { size: 14, weight: 700 });
    const { ang, rad } = nodes(o.name);
    s += text(cx, cy + Lm + 47, `${ang} angular, ${rad} radial node${ang + rad === 1 ? "" : "s"}`, { size: 11, fill: C.soft });
  });
  s += text(W - 12, 14, "colours: opposite signs of ψ", { size: 11, anchor: "end", fill: C.soft });
  return { s, H: 20 + Math.ceil(n / perRow) * ch };
}
function nodes(name) { const n = +name[0], l = "spdf".indexOf(name[1]); return { ang: l, rad: n - l - 1 }; }
function sigmaPi(spec, W, narrow) {
  const cx = W / 2, cy = 120, d = narrow ? 60 : 80, A = col("a1"), B = col("a2");
  let s = "";
  for (const x of [cx - d / 2, cx + d / 2]) s += lobe(x, cy, -90, 62, 34, A) + lobe(x, cy, 90, 62, 34, B);
  s += `<ellipse cx="${cx}" cy="${cy - 40}" rx="${d / 2 + 24}" ry="20" fill="${A}" fill-opacity=".2" stroke="${A}" stroke-dasharray="5 4" stroke-width="1.6"/><ellipse cx="${cx}" cy="${cy + 40}" rx="${d / 2 + 24}" ry="20" fill="${B}" fill-opacity=".2" stroke="${B}" stroke-dasharray="5 4" stroke-width="1.6"/>`;
  s += line(cx - d / 2, cy, cx + d / 2, cy, { w: 3 }) + `<circle cx="${cx - d / 2}" cy="${cy}" r="9" fill="#3a3f4b"/><circle cx="${cx + d / 2}" cy="${cy}" r="9" fill="#3a3f4b"/>`;
  for (const [x, sgn] of [[cx - d / 2, -1], [cx + d / 2, 1]]) for (const a of [-30, 30]) { const r = a * Math.PI / 180, hx = x + sgn * Math.cos(r) * 46, hy = cy + Math.sin(r) * 46; s += line(x, cy, hx, hy, { w: 2.4 }) + `<circle cx="${f1(hx)}" cy="${f1(hy)}" r="6" fill="#fff" stroke="#151826"/>`; }
  s += text(cx, cy - 72, "π bond: sideways overlap above and below the axis", { size: 12.5, weight: 700, fill: A });
  s += text(cx, cy + 82, "σ bond: end-on overlap along the C–C axis", { size: 12.5, weight: 700 });
  return { s, H: 222 };
}
function lobeChecks(spec) {
  const out = [];
  if (spec.kind === "sigma-pi") { out.push(check("ethene's C=C is one σ and one π bond (2 bonds, order 2)", spec.sigma === 1 && spec.pi === 1)); return out; }
  for (const o of spec.orbitals) { const { ang, rad } = nodes(o.name); out.push(check(`${o.name}: l angular and n − l − 1 radial nodes = ${ang} and ${rad}`, (o.claims?.angular ?? ang) === ang && (o.claims?.radial ?? rad) === rad)); }
  return out;
}

register({
  vsepr: { draw: vsepr, checks: vseprChecks, widths: [680, 380] },
  lattice: { draw: lattice, checks: latticeChecks, widths: [680, 380] },
  flow: { draw: flow, checks: flowChecks, widths: [700, 380] },
  apparatus: { draw: apparatus, checks: apparatusChecks, widths: [680, 380] },
  phase: { draw: phase, checks: phaseChecks, widths: [640, 380] },
  lobes: { draw: lobes, checks: lobeChecks, widths: [680, 380] },
});
export { coordination, perCell, lonePairs };
