// Biology renderers, part 2 (part 1: bio-renderers.js). Registered by scripts/diagrams/build.mjs like every
// *-renderers*.js file, and used by the lesson production pipeline (scripts/knowledge/) for the assets it generates.
//
//   osmosisbox  two solutions either side of a partially permeable membrane, drawn as particles: water molecules
//               small enough to pass through the membrane's pores, solute molecules too big to. The checks recompute
//               the biology from the particles: which side has the higher concentration of water, that the net
//               movement arrow points from it to the other side, that more water crosses that way than back, and
//               that the solute can't fit through a pore while water can.
import { register, text, line, arrow, col, check, wrap } from "./renderers.js";

// ======================================================================== osmosisbox
// spec: sides: [{ label, sub?, water, solute }, { … }] left then right (counts of water and solute molecules drawn)
//   membrane: { label, pore }   pore: the gap in the membrane, in units of a water molecule's diameter (default 2.2)
//   net: { label }              the net movement of water; its direction is worked out, never given
//   crossing: [from, to] pairs of side indexes, one per water molecule drawn passing through a pore (default:
//             three from the side with more water, one back), showing that water moves both ways
//   solute: { label }, water: { label }   legend names ("water molecule", "sugar molecule")
//   sizes: { water: 1, solute: 2.6 }      diameters in water-molecule units
//   claims: [{ type: "net", from, to }]   what the lesson says: water moves overall from side `from` to side `to`
const WATER_R = 5;
/** the share of molecules on a side that are water (GCSE: "a higher concentration of water") */
export const waterShare = (s) => s.water / (s.water + s.solute);
/** the side water moves to overall: the one with the lower concentration of water (null if equal) */
export function netWater(sides) {
  const [a, b] = sides.map(waterShare);
  return a === b ? null : a > b ? { from: 0, to: 1 } : { from: 1, to: 0 };
}

// deterministic positions on a jittered grid, no overlaps (seeded so the picture is the same every build)
function scatter(n, x0, y0, w, h, r, seed) {
  let s = seed >>> 0; const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const cell = r * 2.6, cols = Math.max(1, Math.floor(w / cell)), rows = Math.max(1, Math.floor(h / cell));
  const cells = Array.from({ length: cols * rows }, (_, i) => i).sort(() => rnd() - 0.5).slice(0, n);
  return cells.map((i) => { const cx = x0 + (i % cols + 0.5) * (w / cols), cy = y0 + (Math.floor(i / cols) + 0.5) * (h / rows); const j = (w / cols - 2 * r) / 2 * 0.6; return [cx + (rnd() - 0.5) * 2 * Math.max(0, j), cy + (rnd() - 0.5) * 2 * Math.max(0, (h / rows - 2 * r) / 2 * 0.6)]; });
}

function osmosisDraw(spec, W, narrow) {
  const sz = { water: 1, solute: 2.6, ...(spec.sizes || {}) }, rw = WATER_R * sz.water, rs = WATER_R * sz.solute;
  const fs = narrow ? 12 : 14, pad = narrow ? 10 : 20, top = narrow ? 52 : 46, H0 = narrow ? 200 : 210;
  const x0 = pad, x1 = W - pad, mid = W / 2, y0 = top, y1 = top + H0;
  const pore = (spec.membrane?.pore ?? 2.2) * 2 * rw;
  let s = "";
  // the two solutions
  s += `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="12" fill="${col("panel")}" stroke="${col("line")}" stroke-width="1.5"/>`;
  spec.sides.forEach((side, i) => {
    const cx = i ? (mid + x1) / 2 : (x0 + mid) / 2, ls = wrap(side.label, narrow ? 18 : 30);
    ls.forEach((l, k) => { s += text(cx, (narrow ? 14 : 16) + k * (fs + 2), l, { size: fs + 1, weight: 700 }); });
    if (side.sub) s += text(cx, (narrow ? 14 : 16) + ls.length * (fs + 2), side.sub, { size: fs - 2, fill: col("soft") });
  });
  // membrane: wall segments with pores between them
  const nPores = 5, seg = (y1 - y0 - nPores * pore) / (nPores + 1), pores = [];
  for (let k = 0; k <= nPores; k++) {
    const a = y0 + k * (seg + pore), b = a + seg;
    s += line(mid, a, mid, b, { stroke: col("a5"), w: 6, cap: "butt" });
    if (k < nPores) pores.push(b + pore / 2);
  }
  // molecules, kept clear of the membrane
  spec.sides.forEach((side, i) => {
    const bx = i ? mid + 3 * rs : x0 + 2 * rs, bw = (i ? x1 - 2 * rs : mid - 3 * rs) - bx;
    const sol = scatter(side.solute, bx, y0 + rs + 4, bw, y1 - y0 - 2 * rs - 8, rs + 3, 7 + i * 31);
    const used = sol.map(([x, y]) => [x, y, rs]);
    for (const [x, y] of sol) s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rs}" fill="${col("a3")}" fill-opacity="0.85" stroke="${col("ink")}" stroke-width="1"/>`;
    let placed = 0, tries = 0, seed = 101 + i * 17;
    while (placed < side.water && tries < 4000) {
      tries++; const [[x, y]] = scatter(1, bx, y0 + rw + 4, bw, y1 - y0 - 2 * rw - 8, rw, seed++);
      if (used.some(([u, v, r]) => Math.hypot(u - x, v - y) < r + rw + 3)) continue;
      used.push([x, y, rw]); placed++;
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rw}" fill="${col("a1")}" fill-opacity="0.9"/>`;
    }
  });
  // water crossing through pores: short arrows, most from the side with more water
  const net = netWater(spec.sides), crossing = spec.crossing || (net ? [[net.from, net.to], [net.from, net.to], [net.from, net.to], [net.to, net.from]] : []);
  crossing.forEach(([from, to], k) => {
    const y = pores[k % pores.length], d = to > from ? 1 : -1, L = narrow ? 22 : 30;
    s += `<circle cx="${mid}" cy="${y.toFixed(1)}" r="${rw}" fill="${col("a1")}"/>`;
    s += arrow(mid - d * L * 0.4, y, mid + d * L * 0.9, y, { stroke: col("ink"), w: 1.6, head: 7 });
  });
  // the membrane's label, joined to it, then the net movement of water
  let y = y1 + (narrow ? 22 : 22);
  s += line(mid, y1, mid, y - fs * 0.7, { stroke: col("a5"), w: 1.5 });
  s += text(mid, y, spec.membrane?.label || "partially permeable membrane", { size: fs - 1, fill: col("a5"), weight: 700, halo: true });
  y += narrow ? 40 : 40;
  if (net) {
    const ax0 = net.from ? x1 - 30 : x0 + 30, ax1 = net.from ? x0 + 30 : x1 - 30;
    s += arrow(ax0, y, ax1, y, { stroke: col("a1"), w: 4, head: 14 });
    s += text(mid, y - (narrow ? 14 : 15), spec.net?.label || "net movement of water", { size: fs, weight: 700, fill: col("a1"), halo: true });
  }
  // legend
  y += narrow ? 24 : 26;
  const items = [[spec.water?.label || "water molecule", rw, "a1"], [spec.solute?.label || "solute molecule", rs, "a3"]];
  if (narrow) items.forEach(([lab, r, c], k) => { const yy = y + k * 24; s += `<circle cx="${x0 + 14}" cy="${yy}" r="${r}" fill="${col(c)}"/>` + text(x0 + 34, yy, lab, { size: fs - 1, anchor: "start" }); });
  else items.forEach(([lab, r, c], k) => { const xx = x0 + 10 + k * 220; s += `<circle cx="${xx}" cy="${y}" r="${r}" fill="${col(c)}"/>` + text(xx + 18, y, lab, { size: fs - 1, anchor: "start" }); });
  return { H: y + (narrow ? 24 + 14 : 16), s };
}

function osmosisChecks(spec) {
  const out = [], [a, b] = spec.sides, net = netWater(spec.sides), sz = { water: 1, solute: 2.6, ...(spec.sizes || {}) }, pore = spec.membrane?.pore ?? 2.2;
  out.push(check("two solutions, one each side of the membrane", spec.sides.length === 2));
  out.push(check(`the sides differ in their concentration of water (${(waterShare(a) * 100).toFixed(0)}% and ${(waterShare(b) * 100).toFixed(0)}% of molecules are water)`, net !== null));
  if (net) out.push(check(`"${spec.sides[net.from].label}" has the higher concentration of water, so the net movement is from it to "${spec.sides[net.to].label}"`, true));
  for (const c of spec.claims || []) if (c.type === "net") out.push(check(`the lesson's claim: water moves overall from "${spec.sides[c.from]?.label}" to "${spec.sides[c.to]?.label}"`, net && net.from === c.from && net.to === c.to, net ? `worked out: from side ${net.from} to side ${net.to}` : "no net movement"));
  const crossing = spec.crossing || (net ? [[net.from, net.to], [net.from, net.to], [net.from, net.to], [net.to, net.from]] : []);
  if (net && crossing.length) {
    const fwd = crossing.filter(([f, t]) => f === net.from && t === net.to).length, back = crossing.length - fwd;
    out.push(check("water crosses both ways, but more crosses down the gradient", fwd > back && back >= 1, `${fwd} one way, ${back} back`));
  }
  // the pore is drawn in units of a water molecule's diameter, so compare sizes in the same units
  const drawn = pore * sz.water;
  out.push(check("a water molecule fits through a pore", sz.water < drawn, `water ${sz.water}, pore ${drawn}`));
  out.push(check("a solute molecule doesn't fit through a pore (the membrane is partially permeable)", sz.solute > drawn, `solute ${sz.solute}, pore ${drawn}`));
  out.push(check("labels for both solutions and the membrane", a.label && b.label && spec.membrane?.label));
  return out;
}

register({ osmosisbox: { draw: osmosisDraw, checks: osmosisChecks, widths: [700, 380] } });

// ======================================================================== magnification
// spec: object: { name, real: { value, unit } }, image: { value, unit }, scaleBar: { value, unit },
//   claims: [{ type: "magnification", value }]   what the lesson says the magnification is
// Draws the object as it appears in the image, with its measured image length, a scale bar for the real length
// it stands for, and the calculation. The checks convert units, recompute the magnification and confirm the scale
// bar is drawn in proportion to the object.
export const UM = { nm: 0.001, "µm": 1, mm: 1000, cm: 10000, m: 1e6 };
export const toUm = ({ value, unit }) => { if (!(unit in UM)) throw new Error(`unknown unit ${unit}`); return value * UM[unit]; };
export const magnificationOf = (spec) => toUm(spec.image) / toUm(spec.object.real);
const groupDigits = (n) => String(Math.round(n * 1000) / 1000).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

function magnificationDraw(spec, W, narrow) {
  const fs = narrow ? 12 : 14, pad = narrow ? 14 : 30, cellW = narrow ? 220 : 340, cellH = cellW * 0.62, cx = W / 2, top = narrow ? 70 : 74;
  let s = "";
  s += text(cx, narrow ? 16 : 18, `${spec.object.name}, as it appears in the image`, { size: fs + 1, weight: 700 });
  // the measured image length
  const x0 = cx - cellW / 2, x1 = cx + cellW / 2, yb = top - 12;
  s += line(x0, yb, x1, yb, { stroke: col("a1"), w: 1.6 }) + line(x0, yb - 6, x0, yb + 6, { stroke: col("a1"), w: 1.6 }) + line(x1, yb - 6, x1, yb + 6, { stroke: col("a1"), w: 1.6 });
  s += text(cx, yb - 12, `image length: ${groupDigits(spec.image.value)} ${spec.image.unit}`, { size: fs, weight: 700, fill: col("a1"), halo: true });
  // the cell
  s += `<ellipse cx="${cx}" cy="${top + cellH / 2}" rx="${cellW / 2}" ry="${cellH / 2}" fill="${col("panel")}" stroke="${col("ink")}" stroke-width="2"/>`;
  s += `<ellipse cx="${cx - cellW * 0.08}" cy="${top + cellH * 0.45}" rx="${cellW * 0.12}" ry="${cellH * 0.16}" fill="${col("a5")}" fill-opacity="0.35" stroke="${col("a5")}" stroke-width="1.6"/>`;
  s += text(cx - cellW * 0.08, top + cellH * 0.45, "nucleus", { size: fs - 2, fill: col("ink") });
  // the scale bar, drawn to the same scale as the cell
  const barW = (toUm(spec.scaleBar) / toUm(spec.object.real)) * cellW, by = top + cellH + (narrow ? 30 : 32), bx = pad + 4;
  s += `<rect x="${bx}" y="${by - 4}" width="${barW.toFixed(1)}" height="8" fill="${col("ink")}"/>`;
  s += text(barW < 160 ? bx : bx + barW / 2, by + 18, `scale bar = ${groupDigits(spec.scaleBar.value)} ${spec.scaleBar.unit} real length`, { size: fs - 1, anchor: barW < 160 ? "start" : "middle" });
  // the calculation
  const m = magnificationOf(spec), ln = [
    `real length: ${groupDigits(spec.object.real.value)} ${spec.object.real.unit}`,
    `magnification = image length ÷ real length`,
    `= ${groupDigits(toUm(spec.image))} µm ÷ ${groupDigits(toUm(spec.object.real))} µm = ×${groupDigits(m)}`,
  ];
  let y = by + (narrow ? 50 : 52);
  for (const [i, l] of ln.entries()) { for (const w of wrap(l, narrow ? 40 : 80)) { s += text(narrow ? pad : cx, y, w, { size: fs, weight: i === 2 ? 700 : 500, anchor: narrow ? "start" : "middle" }); y += fs + 8; } }
  return { H: y + 4, s };
}
function magnificationChecks(spec) {
  const out = [], m = magnificationOf(spec);
  out.push(check("units convert to micrometres", [spec.image, spec.object.real, spec.scaleBar].every((q) => q.unit in UM)));
  out.push(check("the image is larger than the real object (a magnification above 1)", m > 1, `×${m}`));
  for (const c of spec.claims || []) if (c.type === "magnification") out.push(check(`the lesson's magnification, ×${c.value}, is image ÷ real`, Math.abs(m - c.value) < 1e-9 * Math.max(1, m), `recomputed ×${m}`));
  out.push(check("the scale bar is drawn in proportion to the object", toUm(spec.scaleBar) < toUm(spec.object.real), `${toUm(spec.scaleBar)} µm bar against a ${toUm(spec.object.real)} µm object`));
  return out;
}
register({ magnification: { draw: magnificationDraw, checks: magnificationChecks, widths: [700, 380] } });
