// Gradify Visual Learning Engine: chemistry renderers, part 2 (see kit/diagrams/chem-renderers.js for the pattern).
//
//   classify   a branching classification; every example under a leaf is checked to belong there
//   cell       electrochemical cells: E° from data, cathode = higher E°, Ecell, electron flow, balanced half-equations
//   levels     energy levels: hydrogen (Rydberg), molecular orbitals (filling, bond order, unpaired electrons),
//              crystal field splitting (d-electron count, high/low spin), Jablonski, Raman, rotational, custom
//   table      the periodic table coloured by block or highlighted; block and position recomputed for every element
//   dotcross   dot-and-cross and Lewis structures: octets, electron totals, formal charges, oxidation states
import { register, text, line, arrow, col, f1, esc, near, check, wrap } from "./renderers.js";
import { DATA } from "./data/chemistry.js";
import { parseFormula, parseEquation, balanced, configuration, position, SYMBOLS, Z, ascii, netOf, sameNet, netText } from "./chem-core.js";
import { fm, textWrap, boxLabel, CC as C } from "./chem-renderers.js";

const METALS = new Set("Li Be Na Mg Al K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Rb Sr Ag Sn Cs Ba Pt Au Hg Pb".split(" "));
const tone = (t) => col({ good: "good", bad: "bad", warn: "a3" }[t] || t || "a1");

// ======================================================================== classify
// spec: start, nodes: {id: {q, yes, no, yesLabel, noLabel} | {leaf, examples: [formula], kind, tone}}
const KINDS = {
  element: (f) => Object.keys(parseFormula(f).atoms).length === 1,
  compound: (f) => !/[+,]| and /.test(f) && Object.keys(parseFormula(f).atoms).length > 1,
  ionic: (f) => { const e = Object.keys(parseFormula(f).atoms); return e.some((x) => METALS.has(x)) && e.some((x) => !METALS.has(x)); },
  covalent: (f) => Object.keys(parseFormula(f).atoms).every((x) => !METALS.has(x)),
  metallic: (f) => Object.keys(parseFormula(f).atoms).every((x) => METALS.has(x)),
};
function treeLayout(spec) {
  const N = spec.nodes, leaves = [], depth = {};
  const walk = (id, d) => { depth[id] = d; const n = N[id]; if (n.leaf) { leaves.push(id); return; } walk(n.yes, d + 1); walk(n.no, d + 1); };
  walk(spec.start, 0);
  const x = {};
  leaves.forEach((id, i) => { x[id] = i; });
  const fill = (id) => { const n = N[id]; if (n.leaf) return x[id]; x[id] = (fill(n.yes) + fill(n.no)) / 2; return x[id]; };
  fill(spec.start);
  return { leaves, depth, x, maxD: Math.max(...Object.values(depth)) };
}
function classify(spec, W, narrow) {
  const N = spec.nodes;
  if (narrow) {
    // an indented outline: each question, then its two answers below it
    let s = "", y = 18;
    const walk = (id, ind, via) => {
      const n = N[id], x = 12 + ind * 16;
      if (via) { s += text(x, y + 8, via, { size: 11.5, weight: 700, anchor: "start", fill: col(via === "yes" || /^yes/i.test(via) ? "good" : "a3") }); y += 18; }
      if (n.leaf) {
        const lines = wrap(n.leaf, 34), ex = n.examples?.length ? `e.g. ${n.examples.join(", ")}` : "";
        const h = lines.length * 17 + (ex ? 17 : 0) + 12;
        s += `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(W - x - 12)}" height="${f1(h)}" rx="10" fill="${tone(n.tone)}" fill-opacity=".1" stroke="${tone(n.tone)}" stroke-width="1.6"/>`;
        lines.forEach((l, i) => { s += text(x + 10, y + 14 + i * 17, l, { size: 13, weight: 700, anchor: "start", fill: tone(n.tone) }); });
        if (ex) s += text(x + 10, y + 14 + lines.length * 17, fm(ex), { size: 11.5, anchor: "start", fill: C.soft });
        y += h + 8; return;
      }
      const lines = wrap(n.q, 40);
      lines.forEach((l, i) => { s += text(x, y + 10 + i * 17, l, { size: 13, weight: 600, anchor: "start", fill: C.ink }); });
      y += lines.length * 17 + 8;
      walk(n.yes, ind + 1, n.yesLabel || "yes"); walk(n.no, ind + 1, n.noLabel || "no");
    };
    walk(spec.start, 0, null);
    return { s, H: y + 6 };
  }
  const { leaves, depth, x, maxD } = treeLayout(spec);
  const colW = (W - 20) / leaves.length, rowH = spec.rowHeight || 104, bw = Math.min(colW - 12, 190);
  const X = (id) => 10 + (x[id] + 0.5) * colW, Y = (id) => 30 + depth[id] * rowH;
  let s = "";
  const boxes = {};
  for (const [id, n] of Object.entries(N)) {
    const w = n.leaf ? bw : Math.min(W * 0.42, 260), str = n.leaf || n.q, lines = wrap(str, Math.floor(w / 7.4)), ex = n.leaf && n.examples?.length ? `e.g. ${n.examples.join(", ")}` : "";
    const exLines = ex ? wrap(ex, Math.floor(w / 6.6)) : [];
    const h = lines.length * 17 + exLines.length * 15 + 16;
    boxes[id] = { w, h, lines, exLines };
  }
  for (const [id, n] of Object.entries(N)) {
    if (n.leaf) continue;
    for (const [k, lab] of [[n.yes, n.yesLabel || "yes"], [n.no, n.noLabel || "no"]]) {
      const x1 = X(id), y1 = Y(id) + boxes[id].h, x2 = X(k), y2 = Y(k);
      s += `<path d="M${f1(x1)} ${f1(y1)} C${f1(x1)} ${f1(y1 + 24)} ${f1(x2)} ${f1(y2 - 34)} ${f1(x2)} ${f1(y2 - 10)}" fill="none" stroke="${C.line}" stroke-width="1.8"/>`;
      s += arrow(x2, y2 - 12, x2, y2 - 1, { stroke: C.line, w: 1.8, head: 8 });
      s += `<text x="${f1((x1 + x2) / 2 + (x2 > x1 ? 8 : -8))}" y="${f1((y1 + y2) / 2 - 4)}" font-size="11.5" font-weight="700" text-anchor="${x2 > x1 ? "start" : "end"}" dominant-baseline="middle" fill="${col(lab === "yes" || /^yes/i.test(lab) ? "good" : "a3")}" stroke="#fff" stroke-width="4" paint-order="stroke">${esc(lab)}</text>`;
    }
  }
  for (const [id, n] of Object.entries(N)) {
    const b = boxes[id], bx = X(id) - b.w / 2, by = Y(id);
    s += `<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(b.w)}" height="${f1(b.h)}" rx="12" fill="${n.leaf ? tone(n.tone) : "#f7f8fd"}" fill-opacity="${n.leaf ? 0.1 : 1}" stroke="${n.leaf ? tone(n.tone) : C.line}" stroke-width="1.6"/>`;
    b.lines.forEach((l, i) => { s += text(X(id), by + 16 + i * 17, l, { size: 13, weight: n.leaf ? 700 : 600, fill: n.leaf ? tone(n.tone) : C.ink }); });
    b.exLines.forEach((l, i) => { s += text(X(id), by + 16 + b.lines.length * 17 + i * 15, fm(l), { size: 11.5, fill: C.soft }); });
  }
  const H = 30 + maxD * rowH + Math.max(...leaves.map((l) => boxes[l].h)) + 12;
  return { s, H };
}
function classifyChecks(spec) {
  const N = spec.nodes, out = [], seen = new Set();
  const walk = (id, d) => { if (!id || d > 20 || !N[id]) return false; seen.add(id); const n = N[id]; return n.leaf ? true : walk(n.yes, d + 1) && walk(n.no, d + 1); };
  out.push(check("every path ends in a classification", walk(spec.start, 0)));
  out.push(check("no unreachable boxes", Object.keys(N).every((k) => seen.has(k))));
  for (const [id, n] of Object.entries(N)) {
    if (!n.leaf || !n.kind) continue;
    const f = KINDS[n.kind];
    const bad = (n.examples || []).filter((e) => !(n.kind === "mixture" ? /[+,]| and /.test(e) : f(e)));
    out.push(check(`every example under "${n.leaf}" is ${n.kind === "mixture" ? "a mixture" : `${/^[aeiou]/.test(n.kind) ? "an" : "a"} ${n.kind}`}`, !bad.length, bad.length ? `not: ${bad.join(", ")}` : (n.examples || []).join(", ")));
  }
  for (const c of spec.claims || []) if (c.type === "path") {
    // following the answers for a substance reaches the stated leaf
    let id = spec.start; for (const a of c.answers) id = N[id][a];
    out.push(check(`${c.substance}: ${c.answers.join(", ")} leads to "${N[id].leaf}"`, N[id].leaf === c.leaf));
  }
  return out;
}

// ======================================================================== cell
// spec: kind: "galvanic" | "electrolytic" | "single",
//   halves: [{couple, electrode, solution, gas, role: "anode"|"cathode", half: "Zn → Zn²⁺ + 2e⁻", sign}],
//   vessel: {label} (electrolytic/single), supply: true, ecell: 1.10, net: "Zn + Cu²⁺ → Zn²⁺ + Cu", notes: [..]
const E0 = DATA.e0.values;
function e0Of(couple) { return E0[couple]; }
function electronsIn(eq) { const { left, right } = parseEquation(eq); const e = (side) => side.filter((t) => ascii(t.species) === "e^-" || ascii(t.species) === "e-").reduce((a, t) => a + t.coef, 0); return { left: e(left), right: e(right) }; }
function beaker(x, y, w, h, fillCol = "#dbeafe", fillH = 0.72) {
  const fy = y + h * (1 - fillH);
  return `<path d="M${f1(x + 3 + 4 * (fy - y) / h)} ${f1(fy)} L${f1(x + 7)} ${f1(y + h)} L${f1(x + w - 7)} ${f1(y + h)} L${f1(x + w - 3 - 4 * (fy - y) / h)} ${f1(fy)} Z" fill="${fillCol}" fill-opacity=".8"/>` +
    `<path d="M${f1(x)} ${f1(y)} L${f1(x + 7)} ${f1(y + h)} L${f1(x + w - 7)} ${f1(y + h)} L${f1(x + w)} ${f1(y)}" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linejoin="round"/>`;
}
const METAL_COL = { Zn: "#9aa3b2", Cu: "#c87533", Ag: "#c7ccd6", Pt: "#d9dce3", Fe: "#7a6a5f", Mg: "#b8c0a8", C: "#3a3f4b", Li: "#b6bcc8", Al: "#c3c8d2", Ni: "#a9a28e" };
function electrode(x, y, w, h, el) { return `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="2" fill="${METAL_COL[el] || "#9aa3b2"}" stroke="${C.ink}" stroke-width="1.6"/>`; }
function cell(spec, W, narrow) {
  const H = narrow ? 470 : 370;
  let s = "";
  const halves = spec.halves;
  if (spec.kind === "galvanic") {
    const bw = narrow ? 150 : 180, bh = 150, by = 140, xs = narrow ? [14, W - 14 - bw] : [W / 2 - bw - 90, W / 2 + 90];
    // wire and meter
    const ex = xs.map((x, i) => x + bw / 2 + (i ? -24 : 24));
    s += line(ex[0], by - 6, ex[0], 50, { w: 2 }) + line(ex[0], 50, W / 2 - 24, 50, { w: 2 }) + line(W / 2 + 24, 50, ex[1], 50, { w: 2 }) + line(ex[1], 50, ex[1], by - 6, { w: 2 });
    s += `<circle cx="${W / 2}" cy="50" r="24" fill="#fff" stroke="${C.ink}" stroke-width="2"/>` + text(W / 2, 50, "V", { size: 17, weight: 700 });
    const ec = cellE(spec);
    if (ec != null) s += text(W / 2, 88, `${ec.toFixed(2)} V`, { size: 14, weight: 700, fill: col("a2") });
    // electron flow: anode → cathode through the wire
    const ai = halves.findIndex((h) => h.role === "anode"), ci = 1 - ai;
    const dir = ex[ci] > ex[ai] ? 1 : -1;
    s += arrow(W / 2 - dir * 70, 30, W / 2 - dir * 34, 30, { stroke: col("a1"), w: 2.2, head: 8 }) + text(W / 2 - dir * 52, 18, "e⁻", { size: 13, weight: 700, fill: col("a1") });
    // salt bridge
    const sx0 = xs[0] + bw - 40, sx1 = xs[1] + 40;
    s += `<path d="M${f1(sx0)} ${by + 70} L${f1(sx0)} ${by - 20} L${f1(sx1)} ${by - 20} L${f1(sx1)} ${by + 70}" fill="none" stroke="#e8d9b0" stroke-width="18" stroke-linejoin="round"/>`;
    s += `<path d="M${f1(sx0)} ${by + 70} L${f1(sx0)} ${by - 20} L${f1(sx1)} ${by - 20} L${f1(sx1)} ${by + 70}" fill="none" stroke="${C.line}" stroke-width="1" stroke-dasharray="3 3" stroke-linejoin="round"/>`;
    s += text(W / 2, by - 36, spec.bridge || "salt bridge (KNO₃(aq))", { size: 11.5, weight: 600, fill: C.soft });
    halves.forEach((hf, i) => {
      const x = xs[i];
      s += beaker(x, by, bw, bh, hf.colour || (hf.solution?.includes("Cu") ? "#bfdbfe" : "#e0f2fe"));
      if (hf.gas) {
        s += `<rect x="${f1(ex[i] - 16)}" y="${by - 30}" width="32" height="${bh - 10}" rx="8" fill="#f8fafc" fill-opacity=".6" stroke="${C.ink}" stroke-width="1.6"/>`;
        s += arrow(ex[i] - 40, by - 20, ex[i] - 18, by - 10, { w: 1.6, head: 7 }) + text(ex[i] - 44, by - 26, hf.gas, { size: 11.5, weight: 600, anchor: "end", fill: C.ink });
        s += electrode(ex[i] - 9, by + 60, 18, 46, hf.electrode);
      } else s += electrode(ex[i] - 9, by - 8, 18, bh - 20, hf.electrode);
      const lx = x + bw / 2;
      s += text(lx, by + bh + 18, `${hf.electrode}${hf.role === "anode" ? " anode (−)" : " cathode (+)"}`, { size: 12.5, weight: 700, fill: hf.role === "anode" ? col("a3") : col("a1") });
      s += text(lx, by + bh + 36, fm(hf.solution), { size: 12, fill: C.soft });
      s += text(lx, by + bh + 56, fm(hf.half), { size: 12, weight: 600, fill: C.ink });
      if (e0Of(hf.couple) != null) s += text(lx, by + bh + 74, `E° = ${e0Of(hf.couple) >= 0 ? "+" : "−"}${Math.abs(e0Of(hf.couple)).toFixed(2)} V`, { size: 11.5, fill: C.soft });
    });
    return { s, H: by + bh + 84 };
  }
  // one vessel: electrolysis (with a supply), a fuel cell, a corrosion droplet, or a single labelled cell
  const vx = narrow ? 30 : W / 2 - 170, vw = narrow ? W - 60 : 340, vy = 110, vh = 170;
  s += beaker(vx, vy, vw, vh, spec.vessel?.colour || "#e0f2fe", spec.vessel?.fill ?? 0.78);
  s += text(vx + vw / 2, vy + vh - 18, fm(spec.vessel?.label || ""), { size: 12.5, weight: 600, fill: C.ink });
  const ex = [vx + vw * 0.27, vx + vw * 0.73];
  if (spec.supply) {
    s += line(ex[0], vy - 10, ex[0], 50, { w: 2 }) + line(ex[0], 50, W / 2 - 22, 50, { w: 2 }) + line(W / 2 + 22, 50, ex[1], 50, { w: 2 }) + line(ex[1], 50, ex[1], vy - 10, { w: 2 });
    s += line(W / 2 - 8, 34, W / 2 - 8, 66, { w: 2.6 }) + line(W / 2 + 8, 40, W / 2 + 8, 60, { w: 5 });
    s += text(W / 2 - 18, 24, "+", { size: 15, weight: 800 }) + text(W / 2 + 18, 24, "−", { size: 15, weight: 800 });
    s += text(W / 2, 84, spec.supply === true ? "d.c. supply" : spec.supply, { size: 11.5, fill: C.soft });
  }
  if (spec.load) {
    s += line(ex[0], vy - 10, ex[0], 50, { w: 2 }) + line(ex[0], 50, ex[1], 50, { w: 2 }) + line(ex[1], 50, ex[1], vy - 10, { w: 2 });
    s += `<rect x="${W / 2 - 26}" y="40" width="52" height="20" rx="4" fill="#fff" stroke="${C.ink}" stroke-width="2"/>` + text(W / 2, 50, spec.load, { size: 11, weight: 600 });
    const ai = halves.findIndex((h) => h.role === "anode"), dir = ai === 0 ? 1 : -1;
    s += arrow(W / 2 - dir * 80, 32, W / 2 - dir * 40, 32, { stroke: col("a1"), w: 2.2, head: 8 }) + text(W / 2 - dir * 60, 20, "e⁻", { size: 13, weight: 700, fill: col("a1") });
  }
  if (spec.membrane) s += line(vx + vw / 2, vy + 10, vx + vw / 2, vy + vh - 30, { stroke: col("a5"), w: 3, dash: "7 5" }) + text(vx + vw / 2, vy + 2, spec.membrane, { size: 11, weight: 600, fill: col("a5") });
  halves.forEach((hf, i) => {
    s += electrode(ex[i] - 9, vy - 14, 18, vh - 46, hf.electrode);
    const pos = (spec.supply ? (hf.role === "cathode" ? "−" : "+") : hf.role === "anode" ? "−" : "+");
    s += text(ex[i], vy + vh + 18, `${hf.label || hf.electrode} ${hf.role} (${pos})`, { size: 12.5, weight: 700, fill: hf.role === "anode" ? col("a3") : col("a1") });
    s += text(ex[i], vy + vh + 38, fm(hf.half), { size: narrow ? 10.5 : 12, weight: 600, fill: C.ink });
    if (hf.product) s += text(ex[i] + (i ? -16 : 16), vy + 40, fm(hf.product), { size: 12, weight: 700, anchor: i ? "end" : "start", fill: col("a2") });
    if (hf.ions) s += arrow(ex[i] + (i ? -70 : 70) * (narrow ? 0.5 : 1), vy + 90, ex[i] + (i ? -24 : 24), vy + 90, { stroke: col("a4"), w: 2, head: 8 }) + text(ex[i] + (i ? -56 : 56) * (narrow ? 0.6 : 1), vy + 76, fm(hf.ions), { size: 12, weight: 700, fill: col("a4") });
  });
  let y = vy + vh + 56;
  for (const n of spec.notes || []) { s += text(W / 2, y + 6, fm(n), { size: 12, fill: C.soft }); y += 18; }
  return { s, H: y + 10 };
}
function cellE(spec) {
  if (spec.kind !== "galvanic") return spec.ecell ?? null;
  const c = spec.halves.find((h) => h.role === "cathode"), a = spec.halves.find((h) => h.role === "anode");
  return e0Of(c.couple) != null && e0Of(a.couple) != null ? e0Of(c.couple) - e0Of(a.couple) : null;
}
function cellChecks(spec) {
  const out = [];
  for (const hf of spec.halves) {
    const b = balanced(hf.half); out.push(check(`${hf.half} balances`, b.ok, b.detail));
    const e = electronsIn(hf.half), red = e.left > 0 && !e.right, ox = e.right > 0 && !e.left;
    out.push(check(`${hf.role}: ${hf.role === "cathode" ? "reduction (electrons gained)" : "oxidation (electrons lost)"}`, hf.role === "cathode" ? red : ox));
    if (hf.couple) out.push(check(`E°(${hf.couple}) is in the data table`, e0Of(hf.couple) != null, `${e0Of(hf.couple)} V`));
  }
  if (spec.kind === "galvanic" || spec.compare) {
    const c = spec.halves.find((h) => h.role === "cathode"), a = spec.halves.find((h) => h.role === "anode");
    out.push(check(`the cathode (${c.couple}) has the more positive E°`, e0Of(c.couple) > e0Of(a.couple), `${e0Of(c.couple)} V against ${e0Of(a.couple)} V`));
    if (spec.ecell != null) out.push(check(`E°cell = E°(cathode) − E°(anode) = ${spec.ecell} V`, near(e0Of(c.couple) - e0Of(a.couple), spec.ecell, 1e-6), `${(e0Of(c.couple) - e0Of(a.couple)).toFixed(2)} V`));
  }
  if (spec.net) {
    // scale each half-equation so electrons cancel, add them, and compare with the stated overall equation
    const hs = spec.halves.map((h) => h.half), es = hs.map((h) => { const e = electronsIn(h); return e.left || e.right; });
    const l = es.reduce((a, b) => (a * b) / gcd(a, b));
    const steps = hs.map((h, i) => scaleEq(h, l / es[i]));
    const n = netOf(steps), want = netOf([spec.net]);
    out.push(check(`the half-equations add up to ${spec.net}`, sameNet(n, want), netText(n)));
  }
  for (const r of spec.rules || []) {
    // electrolysis products of aqueous solutions: the less reactive of metal and hydrogen at the cathode,
    // a halogen at the anode from a concentrated halide, otherwise oxygen
    if (r.type === "cathode") { const e = e0Of(`${r.metal}${r.charge}+/${r.metal}`.replace("1+", "+")); const prod = e > 0 ? r.metal : "H2"; out.push(check(`cathode product from ${r.metal}^${r.charge}+ solution is ${prod}`, prod === r.product, `E°(${r.metal}) = ${e} V`)); }
    if (r.type === "anode") { const prod = r.halide && r.concentrated ? r.halide : "O2"; out.push(check(`anode product is ${prod}`, prod === r.product)); }
  }
  return out;
}
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
function scaleEq(eq, k) {
  if (k === 1) return eq;
  const [l, r] = eq.split(/\s*(?:→|⇌|->)\s*/);
  const sc = (side) => side.split(/\s\+\s/).map((t) => { const m = t.trim().match(/^(\d+(?:\.\d+)?)?\s*(.+)$/); return `${(m[1] ? +m[1] : 1) * k}${m[2]}`; }).join(" + ");
  return `${sc(l)} → ${sc(r)}`;
}

// ======================================================================== levels
// spec: kind, and per kind: hydrogen {levels: 6, series: ["Lyman", "Balmer", "Paschen"], balmerNm: [656, 486, 434, 410]};
//   spectrum {lines from Rydberg}; mo {molecule}; cfs {metal, ox, geometry, spin}; jablonski; raman; rotational {B, J};
//   custom {levels: [{id, label, E, x0, x1}], transitions: [{from, to, label, colour, wavy}]}
const RYD_NM = 1 / 1.0967758e-2; // 1/R_H in nm (hydrogen, reduced mass)
const lineNm = (lo, hi) => RYD_NM / (1 / lo ** 2 - 1 / hi ** 2);
function levelsDraw(spec, W, narrow) {
  const k = spec.kind;
  if (k === "hydrogen") return hydrogen(spec, W, narrow);
  if (k === "spectrum") return spectrum(spec, W, narrow);
  if (k === "mo") return mo(spec, W, narrow);
  if (k === "cfs") return cfs(spec, W, narrow);
  return custom(spec, W, narrow);
}
function hydrogen(spec, W, narrow) {
  const H = narrow ? 460 : 400, top = 40, bot = H - 30, n = spec.levels || 6;
  const E = (k) => -13.6 / k ** 2, y = (e) => top + ((0 - e) / 13.6) * (bot - top);
  const x0 = narrow ? 52 : 90, x1 = W - (narrow ? 14 : 30);
  let s = arrow(x0 - 30, bot + 6, x0 - 30, top - 20, { w: 1.6, head: 8 }) + text(x0 - 34, top - 28, "energy", { size: 12, anchor: "start", fill: C.soft });
  // the levels crowd together towards n = ∞, so only n = 1 to 4 are labelled
  for (let k = 1; k <= n; k++) s += line(x0, y(E(k)), x1, y(E(k)), { w: k === 1 ? 2.4 : 1.6 }) + (k <= 4 ? text(x0 - 8, y(E(k)) + (k === 4 ? 4 : 0), `n = ${k}`, { size: 12, weight: 600, anchor: "end", fill: C.ink }) : "");
  s += line(x0, y(0), x1, y(0), { w: 1.4, dash: "6 4", stroke: C.line }) + text(x1, y(0) - 8, "n = ∞ (ionisation)", { size: 11, anchor: "end", fill: C.soft });
  if (!narrow) for (const k of [1, 2, 3]) s += text(x1 + 2, y(E(k)) + 14, `${E(k).toFixed(2).replace("-", "−")} eV`, { size: 10.5, anchor: "end", fill: C.soft });
  const series = [["Lyman", 1, "a5", "ultraviolet"], ["Balmer", 2, "a2", "visible"], ["Paschen", 3, "a3", "infrared"]].filter(([nm]) => (spec.series || ["Lyman", "Balmer", "Paschen"]).includes(nm));
  const span = (x1 - x0) / series.length;
  series.forEach(([name, lo, c, region], i) => {
    const xs = x0 + 16 + i * span;
    for (let hi = lo + 1; hi <= Math.min(n, lo + 4); hi++) { const xx = xs + (hi - lo - 1) * (narrow ? 13 : 20); s += arrow(xx, y(E(hi)), xx, y(E(lo)) - 1, { stroke: col(c), w: 2, head: 7 }); }
    s += text(xs + 2, y(E(lo)) + 16, `${name}`, { size: 12, weight: 700, anchor: "start", fill: col(c) }) + text(xs + 2, y(E(lo)) + 31, region, { size: 11, anchor: "start", fill: C.soft });
  });
  return { s, H: H + 10 };
}
function spectrum(spec, W, narrow) {
  const x0 = 20, x1 = W - 20, lo = 380, hi = 720, X = (nm) => x0 + ((nm - lo) / (hi - lo)) * (x1 - x0), bh = 54;
  const lines = [3, 4, 5, 6].map((k) => lineNm(2, k));
  const grad = `<defs><linearGradient id="vis${W}" x1="0" x2="1">${[[380, "#7a00a8"], [430, "#3b00ff"], [480, "#00a6ff"], [520, "#00d34a"], [570, "#e6e600"], [600, "#ff9a00"], [650, "#ff2a00"], [720, "#a30000"]].map(([nm, c]) => `<stop offset="${((nm - lo) / (hi - lo)).toFixed(3)}" stop-color="${c}"/>`).join("")}</linearGradient></defs>`;
  const colAt = (nm) => (nm < 440 ? "#6b2bff" : nm < 500 ? "#00a6ff" : nm < 570 ? "#22c55e" : nm < 600 ? "#eab308" : "#ff2a00");
  let s = grad;
  const y1 = 40, y2 = y1 + bh + 56;
  s += text(x0, y1 - 12, "Emission spectrum: bright lines on black", { size: 12.5, weight: 700, anchor: "start", fill: C.ink });
  s += `<rect x="${x0}" y="${y1}" width="${x1 - x0}" height="${bh}" fill="#0b0d14" rx="4"/>`;
  for (const nm of lines) s += `<rect x="${f1(X(nm) - 2)}" y="${y1}" width="4" height="${bh}" fill="${colAt(nm)}"/>`;
  s += text(x0, y2 - 12, "Absorption spectrum: dark lines on the continuous spectrum", { size: 12.5, weight: 700, anchor: "start", fill: C.ink });
  s += `<rect x="${x0}" y="${y2}" width="${x1 - x0}" height="${bh}" fill="url(#vis${W})" rx="4"/>`;
  for (const nm of lines) s += `<rect x="${f1(X(nm) - 2)}" y="${y2}" width="4" height="${bh}" fill="#0b0d14"/>`;
  for (const nm of lines) s += text(X(nm), y2 + bh + 16, `${Math.round(nm)}`, { size: narrow ? 10 : 11.5, weight: 600, fill: C.ink });
  s += text(W - 20, y2 + bh + 34, "wavelength / nm", { size: 11.5, anchor: "end", fill: C.soft });
  return { s, H: y2 + bh + 44 };
}
// molecular orbitals of homonuclear diatomics from period 1 and 2
const MO = (light) => [["σ1s", 1, "b"], ["σ*1s", 1, "a"], ["σ2s", 1, "b"], ["σ*2s", 1, "a"], ...(light ? [["π2p", 2, "b"], ["σ2p", 1, "b"]] : [["σ2p", 1, "b"], ["π2p", 2, "b"]]), ["π*2p", 2, "a"], ["σ*2p", 1, "a"]];
function moFill(sym) {
  const z = Z[sym.replace(/2$/, "")], e = 2 * z, light = z <= 7, orbs = MO(light), fill = [];
  let left = e;
  for (const [name, deg, kind] of orbs) { const n = Math.min(left, 2 * deg); fill.push({ name, deg, kind, n }); left -= n; }
  const bonding = fill.filter((f) => f.kind === "b").reduce((a, f) => a + f.n, 0), anti = fill.filter((f) => f.kind === "a").reduce((a, f) => a + f.n, 0);
  const unpaired = fill.reduce((a, f) => a + (f.n <= f.deg ? f.n : 2 * f.deg - f.n), 0);
  return { fill, order: (bonding - anti) / 2, unpaired, z };
}
function arrowsInBox(x, y, n, w = 26, h = 22) {
  let s = `<rect x="${f1(x)}" y="${f1(y - h / 2)}" width="${w}" height="${h}" fill="#fff" stroke="${C.ink}" stroke-width="1.5"/>`;
  if (n >= 1) s += arrow(x + w / 2 - (n === 2 ? 5 : 0), y + h / 2 - 4, x + w / 2 - (n === 2 ? 5 : 0), y - h / 2 + 4, { stroke: col("a1"), w: 1.8, head: 6 });
  if (n === 2) s += arrow(x + w / 2 + 5, y - h / 2 + 4, x + w / 2 + 5, y + h / 2 - 4, { stroke: col("a2"), w: 1.8, head: 6 });
  return s;
}
function mo(spec, W, narrow) {
  const sym = spec.molecule, f = moFill(sym), el = sym.replace(/2$/, "");
  const showCore = f.z <= 2 || spec.core;
  const rows = f.fill.filter((o) => showCore || !o.name.includes("1s"));
  const H = narrow ? 460 : 420, top = 40, bot = H - 50;
  // vertical positions: bonding below its atomic orbital, antibonding above, in filling order
  const ys = {}; rows.forEach((o, i) => { ys[o.name] = bot - (i / Math.max(1, rows.length - 1)) * (bot - top); });
  const cx = W / 2, ax = narrow ? 50 : 120, bx = W - (narrow ? 50 : 120), bw = narrow ? 22 : 26;
  let s = text(ax, 18, `${el} atom`, { size: 13, weight: 700 }) + text(bx, 18, `${el} atom`, { size: 13, weight: 700 }) + text(cx, 18, sym.replace("2", "₂"), { size: 14, weight: 800 });
  const conf = configuration(f.z), aoY = {};
  const aos = f.z <= 2 ? ["1s"] : ["2s", "2p"];
  for (const ao of aos) {
    const pair = ao === "1s" ? ["σ1s", "σ*1s"] : ao === "2s" ? ["σ2s", "σ*2s"] : ["σ2p", "π*2p"];
    aoY[ao] = ao === "2p" ? (ys["π2p"] + ys["π*2p"]) / 2 : (ys[pair[0]] + ys[pair[1]]) / 2;
    const m = ao.endsWith("p") ? 3 : 1, n = conf[ao] || 0, per = Array(m).fill(0).map((_, i) => (n <= m ? (i < n ? 1 : 0) : i < n - m ? 2 : 1));
    for (const x of [ax, bx]) { for (let i = 0; i < m; i++) s += arrowsInBox(x - (m * bw) / 2 + i * bw, aoY[ao], per[i], bw); s += text(x + (x === ax ? -(m * bw) / 2 - 6 : (m * bw) / 2 + 6), aoY[ao], ao, { size: 12, weight: 700, anchor: x === ax ? "end" : "start" }); }
  }
  for (const o of rows) {
    const per = Array(o.deg).fill(0).map((_, i) => (o.n <= o.deg ? (i < o.n ? 1 : 0) : i < o.n - o.deg ? 2 : 1));
    for (let i = 0; i < o.deg; i++) s += arrowsInBox(cx - (o.deg * bw) / 2 + i * bw, ys[o.name], per[i], bw);
    s += text(cx + (o.deg * bw) / 2 + 8, ys[o.name], o.name, { size: 12, weight: 700, anchor: "start", fill: o.kind === "a" ? col("a3") : col("a4") });
    const ao = o.name.includes("1s") ? "1s" : o.name.includes("2s") ? "2s" : "2p";
    if (aoY[ao] != null) for (const x of [ax, bx]) { const m = ao === "2p" ? 3 : 1, sx = x === ax ? x + (m * bw) / 2 + 2 : x - (m * bw) / 2 - 2, ex = x === ax ? cx - (o.deg * bw) / 2 - 2 : cx + (o.deg * bw) / 2 + 2; s += line(sx, aoY[ao], ex, ys[o.name], { stroke: C.line, w: 1, dash: "3 3" }); }
  }
  s += text(cx, H - 18, `bond order = (${rows.filter((x) => x.kind === "b").reduce((a, x) => a + x.n, 0)} − ${rows.filter((x) => x.kind === "a").reduce((a, x) => a + x.n, 0)}) ÷ 2 = ${f.order}; ${f.unpaired} unpaired electron${f.unpaired === 1 ? "" : "s"}${showCore ? "" : " (1s not drawn)"}`, { size: 12.5, weight: 700, fill: C.ink });
  return { s, H };
}
function dCount(metal, ox) { const c = configuration(Z[metal], ox); return Object.entries(c).filter(([k]) => k.endsWith("d")).reduce((a, [, v]) => a + v, 0); }
function cfsFill(n, geometry, spin) {
  // octahedral: t2g (3) below eg (2); tetrahedral: e (2) below t2 (3). High spin: one in each before pairing.
  const [lowDeg, highDeg] = geometry === "tetrahedral" ? [2, 3] : [3, 2];
  const low = Array(lowDeg).fill(0), high = Array(highDeg).fill(0);
  const order = spin === "low" ? [...low.map((_, i) => ["L", i]), ...low.map((_, i) => ["L", i]), ...high.map((_, i) => ["H", i]), ...high.map((_, i) => ["H", i])]
    : [...low.map((_, i) => ["L", i]), ...high.map((_, i) => ["H", i]), ...low.map((_, i) => ["L", i]), ...high.map((_, i) => ["H", i])];
  for (let k = 0; k < n; k++) { const [w, i] = order[k]; (w === "L" ? low : high)[i]++; }
  const unpaired = [...low, ...high].filter((x) => x === 1).length;
  return { low, high, unpaired };
}
function cfs(spec, W, narrow) {
  const panels = spec.panels || [spec];
  const pw = narrow ? W - 20 : (W - 20) / panels.length, H0 = 290;
  let s = "";
  panels.forEach((p, i) => {
    const n = dCount(p.metal, p.ox), f = cfsFill(n, p.geometry || "octahedral", p.spin || "high"), ox = 10 + (narrow ? 0 : i * pw), oy = narrow ? i * (H0 + 10) : 0, cx = ox + pw / 2;
    const bw = 26, yUp = oy + 90, yDn = oy + 170, yBar = oy + 130;
    const oct = (p.geometry || "octahedral") !== "tetrahedral";
    s += text(cx, oy + 20, p.title || `${p.metal}${p.ox}+, d${n}`, { size: 13.5, weight: 700 });
    s += arrowsBoxes(cx - (f.high.length * bw) / 2, yUp, f.high, bw) + text(cx + (f.high.length * bw) / 2 + 8, yUp, oct ? "e_{g}" : "t_{2}", { size: 12.5, weight: 700, anchor: "start" });
    s += arrowsBoxes(cx - (f.low.length * bw) / 2, yDn, f.low, bw) + text(cx + (f.low.length * bw) / 2 + 8, yDn, oct ? "t_{2g}" : "e", { size: 12.5, weight: 700, anchor: "start" });
    s += arrow(cx - (Math.max(f.high.length, f.low.length) * bw) / 2 - 20, yDn - 2, cx - (Math.max(f.high.length, f.low.length) * bw) / 2 - 20, yUp + 2, { stroke: col("a2"), w: 1.8, head: 7, both: true });
    s += text(cx - (Math.max(f.high.length, f.low.length) * bw) / 2 - 26, yBar, oct ? "Δ_{o}" : "Δ_{t}", { size: 12.5, weight: 700, anchor: "end", fill: col("a2") });
    s += text(cx, oy + 210, `${p.spin === "low" ? "low" : "high"} spin: ${f.unpaired} unpaired`, { size: 12.5, weight: 600, fill: C.ink });
    if (p.moment !== false) s += text(cx, oy + 230, `μ (spin only) = √(${f.unpaired}(${f.unpaired} + 2)) = ${Math.sqrt(f.unpaired * (f.unpaired + 2)).toFixed(2)} μ_{B}`, { size: 11.5, fill: C.soft });
    if (p.note) s += text(cx, oy + 252, p.note, { size: 11.5, fill: C.soft });
  });
  return { s, H: narrow ? panels.length * (H0 + 10) - 20 : H0 - 20 };
}
function arrowsBoxes(x, y, occ, bw) { return occ.map((n, i) => arrowsInBox(x + i * bw, y, n, bw)).join(""); }
function custom(spec, W, narrow) {
  const lv = spec.levels, Es = lv.map((l) => l.E), lo = Math.min(...Es), hi = Math.max(...Es);
  const H = spec.height?.[narrow ? 1 : 0] || (narrow ? 420 : 360), top = 34, bot = H - 40;
  const y = (e) => bot - ((e - lo) / (hi - lo || 1)) * (bot - top);
  const xs = (f) => 20 + f * (W - 40);
  let s = spec.axis === false ? "" : arrow(12, bot + 10, 12, top - 16, { w: 1.6, head: 8 }) + text(18, top - 20, spec.axisLabel || "energy", { size: 12, anchor: "start", fill: C.soft });
  for (const l of lv) {
    s += line(xs(l.x0), y(l.E), xs(l.x1), y(l.E), { w: l.thin ? 1.2 : 2.2, dash: l.dash ? "5 4" : "", stroke: l.colour ? col(l.colour) : C.ink });
    if (l.label) s += text(l.labelRight ? xs(l.x1) + 6 : xs(l.x0) - 6, y(l.E), fm(l.label), { size: narrow ? 11 : 12.5, weight: 600, anchor: l.labelRight ? "start" : "end", fill: C.ink });
  }
  const byId = Object.fromEntries(lv.map((l) => [l.id, l]));
  for (const t of spec.transitions || []) {
    const a = byId[t.from], b = byId[t.to], x = xs(t.x), y1 = y(a.E), y2 = y(b.E);
    if (t.wavy) {
      const pts = []; for (let i = 0; i <= 30; i++) { const yy = y1 + ((y2 - y1) * i) / 30; pts.push(`${i ? "L" : "M"}${f1(x + Math.sin(i * 1.3) * 5)} ${f1(yy)}`); }
      s += `<path d="${pts.join(" ")}" fill="none" stroke="${col(t.colour || "a5")}" stroke-width="1.8"/>` + arrow(x, y2 - Math.sign(y2 - y1) * 9, x, y2, { stroke: col(t.colour || "a5"), w: 1.8, head: 7 });
    } else s += arrow(x, y1, x, y2, { stroke: col(t.colour || "a1"), w: 2.2, head: 8, dash: t.dash || "" });
    if (t.label) s += text(x + (t.labelLeft ? -6 : 6), (y1 + y2) / 2 + (t.dy || 0), fm(t.label), { size: narrow ? 10.5 : 11.5, weight: 700, anchor: t.labelLeft ? "end" : "start", fill: col(t.colour || "a1") });
  }
  for (const n of spec.notes || []) s += text(xs(n.x), y(n.E) + (n.dy || 0), fm(n.text), { size: 11.5, weight: n.bold ? 700 : 500, anchor: n.anchor || "middle", fill: n.colour ? col(n.colour) : C.soft });
  return { s, H };
}
function levelChecks(spec) {
  const out = [];
  if (spec.kind === "hydrogen" || spec.kind === "spectrum") {
    const got = [3, 4, 5, 6].map((k) => lineNm(2, k));
    const want = spec.balmerNm || [656, 486, 434, 410];
    out.push(check(`Balmer lines from the Rydberg equation: ${want.join(", ")} nm`, want.every((w, i) => Math.abs(got[i] - w) < 1.2), got.map((g) => g.toFixed(1)).join(", ")));
    const ie = 13.6057 * 96.485;
    out.push(check("ionisation from n = 1 is 1312 kJ mol⁻¹", Math.abs(ie - 1312) < 2, `${ie.toFixed(0)} kJ mol⁻¹`));
  }
  if (spec.kind === "mo") {
    const f = moFill(spec.molecule);
    out.push(check(`${spec.molecule}: bond order ${spec.bondOrder}`, f.order === spec.bondOrder, `computed ${f.order}`));
    out.push(check(`${spec.molecule}: ${spec.unpaired} unpaired electron(s)${spec.unpaired ? ", paramagnetic" : ", diamagnetic"}`, f.unpaired === spec.unpaired, `computed ${f.unpaired}`));
    out.push(check(`${spec.molecule}: ${2 * f.z} electrons placed`, f.fill.reduce((a, x) => a + x.n, 0) === 2 * f.z));
  }
  if (spec.kind === "cfs") for (const p of spec.panels || [spec]) {
    const n = dCount(p.metal, p.ox), f = cfsFill(n, p.geometry || "octahedral", p.spin || "high");
    if (p.d != null) out.push(check(`${p.metal}${p.ox}+ is d${p.d}`, n === p.d, `computed d${n}`));
    if (p.unpaired != null) out.push(check(`${p.title || p.metal}: ${p.unpaired} unpaired electrons`, f.unpaired === p.unpaired, `computed ${f.unpaired}`));
    if (p.moment != null && p.moment !== false) out.push(check(`spin-only moment ${p.moment} μB`, Math.abs(Math.sqrt(f.unpaired * (f.unpaired + 2)) - p.moment) < 0.01));
  }
  for (const c of spec.claims || []) {
    const byId = Object.fromEntries((spec.levels || []).map((l) => [l.id, l]));
    const dE = (t) => Math.abs(byId[t.from].E - byId[t.to].E);
    if (c.type === "lower") { const [a, b] = c.transitions.map((i) => spec.transitions[i]); out.push(check(c.name, dE(a) < dE(b), `${dE(a)} < ${dE(b)}`)); }
    if (c.type === "below") out.push(check(c.name, byId[c.a].E < byId[c.b].E));
    if (c.type === "equal") { const [a, b] = c.transitions.map((i) => spec.transitions[i]); out.push(check(c.name, near(dE(a), dE(b), 1e-9))); }
    if (c.type === "rotational") {
      // E_J = B J(J + 1): the drawn levels follow it and successive lines are 2B apart
      const ok = (spec.levels || []).every((l) => l.J == null || near(l.E, c.B * l.J * (l.J + 1), 1e-9));
      const gaps = (spec.transitions || []).map((t) => dE(t)).sort((a, b) => a - b), diffs = gaps.slice(1).map((g, i) => g - gaps[i]);
      out.push(check("levels follow E = BJ(J + 1)", ok)); out.push(check("adjacent lines are 2B apart", diffs.every((d) => near(d, 2 * c.B, 1e-9)), diffs.join(", ")));
    }
    if (c.type === "photon") {
      // a photon of wavelength λ (nm) carries N_A·hc/λ per mole: compare with the stated energy in kJ mol⁻¹
      const e = (6.02214076e23 * 6.62607015e-34 * 2.99792458e8) / (c.nm * 1e-9) / 1000;
      out.push(check(`${c.nm} nm photons carry ${c.kj} kJ mol⁻¹`, Math.abs(e - c.kj) / c.kj < 0.01, `${e.toFixed(0)} kJ mol⁻¹`));
    }
    if (c.type === "count") out.push(check(c.name, c.value === c.of.length));
    if (c.type === "conserve") out.push(check(c.name, c.before === c.after));
  }
  return out;
}

// ======================================================================== table
// spec: colour: "block" | "none", highlight: {symbol: colour}, groups/periods labels, arrows: [[from, to]] (diagonals),
//   fSplit: true (lanthanides and actinides below), labels: {symbol: text}, claims: [{type: "block", symbols, block}
//   | {type: "group", symbol, group} | {type: "diagonal", pairs}]
const BLOCK_COL = { s: "#fde68a", p: "#bbf7d0", d: "#bfdbfe", f: "#fbcfe8" };
function table(spec, W, narrow) {
  const cw = (W - (narrow ? 24 : 40)) / 18, ch = cw * (narrow ? 1.05 : 0.92), x0 = narrow ? 16 : 28, y0 = spec.groups ? 30 : 12;
  const maxZ = spec.maxZ || 118;
  let s = "";
  const pos = (z) => { const p = position(z); if (p.block === "f") return [x0 + (3 + p.fIndex) * cw, y0 + (p.period + 1.6) * ch]; return [x0 + (p.group - 1) * cw, y0 + (p.period - 1) * ch]; };
  for (let z = 1; z <= maxZ; z++) {
    const sym = SYMBOLS[z - 1], p = position(z), [x, y] = pos(z);
    const fill = spec.highlight?.[sym] ? col(spec.highlight[sym]) : spec.colour === "block" ? BLOCK_COL[p.block] : "#f3f4f8";
    const dim = spec.dim && !spec.highlight?.[sym];
    s += `<rect x="${f1(x + 1)}" y="${f1(y + 1)}" width="${f1(cw - 2)}" height="${f1(ch - 2)}" rx="3" fill="${fill}" fill-opacity="${dim ? 0.35 : spec.highlight?.[sym] ? 0.85 : 1}" stroke="#c9cede" stroke-width=".8"/>`;
    s += `<text x="${f1(x + cw / 2)}" y="${f1(y + ch / 2 + (narrow ? 0 : 3))}" font-size="${narrow ? 7.5 : Math.min(12, cw * 0.36)}" font-weight="700" text-anchor="middle" dominant-baseline="middle" fill="${dim ? "#8a92a8" : "#151826"}">${sym}</text>`;
    if (!narrow) s += `<text x="${f1(x + 3)}" y="${f1(y + 8)}" font-size="6.5" fill="#5b6275">${z}</text>`;
  }
  if (spec.groups) for (let g = 1; g <= 18; g++) s += text(x0 + (g - 0.5) * cw, y0 - 10, String(g), { size: narrow ? 8 : 11, weight: 700, fill: C.soft });
  if (spec.periods) for (let p = 1; p <= 7; p++) s += text(x0 - 8, y0 + (p - 0.5) * ch, String(p), { size: narrow ? 8 : 11, weight: 700, anchor: "end", fill: C.soft });
  if (spec.fLabels !== false) { const [, yl] = pos(Z.Ce), [, ya] = pos(Z.Th); s += text(x0 + 2.9 * cw, yl + ch / 2, narrow ? "Ln" : "lanthanides", { size: narrow ? 7 : 10, anchor: "end", fill: C.soft }) + text(x0 + 2.9 * cw, ya + ch / 2, narrow ? "An" : "actinides", { size: narrow ? 7 : 10, anchor: "end", fill: C.soft }); }
  for (const [a, b] of spec.arrows || []) { const [xa, ya] = pos(Z[a]), [xb, yb] = pos(Z[b]); s += arrow(xa + cw * 0.7, ya + ch * 0.7, xb + cw * 0.3, yb + ch * 0.3, { stroke: col("a2"), w: 2.4, head: 8 }); }
  let H = y0 + 10 * ch + 10;
  if (spec.colour === "block") { let lx = x0; const ly = H + 6; for (const b of ["s", "p", "d", "f"]) { s += `<rect x="${f1(lx)}" y="${f1(ly - 8)}" width="16" height="16" rx="3" fill="${BLOCK_COL[b]}" stroke="#c9cede"/>` + text(lx + 22, ly, `${b} block`, { size: 12, weight: 600, anchor: "start" }); lx += narrow ? 82 : 100; } H += 26; }
  for (const n of spec.notes || []) { s += text(W / 2, H + 6, fm(n), { size: 12, fill: C.soft }); H += 18; }
  return { s, H: H + 6 };
}
function tableChecks(spec) {
  const out = [];
  out.push(check("every element sits in its period and group (computed from Z)", SYMBOLS.every((_, i) => { const p = position(i + 1); return p.period >= 1 && p.period <= 7 && (p.block === "f" || (p.group >= 1 && p.group <= 18)); })));
  for (const c of spec.claims || []) {
    if (c.type === "block") { const bad = c.symbols.filter((sy) => position(Z[sy]).block !== c.block); out.push(check(`${c.symbols.join(", ")} are in the ${c.block} block`, !bad.length, bad.join(", "))); }
    if (c.type === "group") out.push(check(`${c.symbol} is in group ${c.group}, period ${c.period}`, position(Z[c.symbol]).group === c.group && position(Z[c.symbol]).period === c.period));
    if (c.type === "diagonal") for (const [a, b] of c.pairs) { const pa = position(Z[a]), pb = position(Z[b]); out.push(check(`${a} and ${b} are diagonal neighbours`, pb.period === pa.period + 1 && pb.group === (pa.group === 2 ? 13 : pa.group + 1) || (pa.group === 2 && pb.group === 13 && pb.period === pa.period + 1))); }
  }
  return out;
}

// ======================================================================== dotcross
// spec: molecules: [{label, atoms: [{id, el, x, y, lone: n, mark: "dot"|"cross", charge, bracket}], bonds: [{a, b, order, dative: "a"}],
//   style: "dotcross" | "lewis", show: "oxidation" | "formal", claims: {charge, oxidation: {id: n}, formal: {id: n}}}]
const VAL = { H: 1, He: 2, Li: 1, Be: 2, B: 3, C: 4, N: 5, O: 6, F: 7, Ne: 8, Na: 1, Mg: 2, Al: 3, Si: 4, P: 5, S: 6, Cl: 7, Ar: 8, K: 1, Ca: 2, Br: 7, I: 7, Cr: 6, Xe: 8 };
const ENEG = DATA.enPauling.values;
function shellFull(el) { return el === "H" || el === "He" || el === "Li" || el === "Be" ? 2 : 8; }
function dotcross(spec, W, narrow) {
  const mols = spec.molecules, n = mols.length, perRow = narrow ? 1 : Math.min(n, spec.perRow || n), cw = (W - 20) / perRow, scale = spec.scale?.[narrow ? 1 : 0] || (narrow ? 0.9 : 1);
  let s = "", H = 0;
  mols.forEach((m, mi) => {
    const R = 32 * scale, step = 54 * scale;
    const xs = m.atoms.map((a) => a.x), ys = m.atoms.map((a) => a.y);
    const mw = (Math.max(...xs) - Math.min(...xs)) * step + 2 * R + 30, mh = (Math.max(...ys) - Math.min(...ys)) * step + 2 * R + 30;
    const col0 = mi % perRow, row = Math.floor(mi / perRow), rowH = spec.rowHeight?.[narrow ? 1 : 0] || 230 * scale;
    const ox = 10 + col0 * cw + cw / 2 - ((Math.max(...xs) + Math.min(...xs)) / 2) * step, oy = 20 + row * rowH + rowH / 2 - 20 - ((Math.max(...ys) + Math.min(...ys)) / 2) * step;
    const P = (a) => [ox + a.x * step, oy + a.y * step];
    const byId = Object.fromEntries(m.atoms.map((a) => [a.id, a]));
    const mark = (x, y, kind) => (kind === "cross" ? `<path d="M${f1(x - 3.6)} ${f1(y - 3.6)} L${f1(x + 3.6)} ${f1(y + 3.6)} M${f1(x - 3.6)} ${f1(y + 3.6)} L${f1(x + 3.6)} ${f1(y - 3.6)}" stroke="${col("a2")}" stroke-width="2"/>` : `<circle cx="${f1(x)}" cy="${f1(y)}" r="3.3" fill="${col("a1")}"/>`);
    if (m.style !== "lewis") for (const a of m.atoms) { const [x, y] = P(a); s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${R}" fill="${a.bracket ? "#fff" : "#f7f8fd"}" fill-opacity=".6" stroke="${C.line}" stroke-width="1.4"/>`; }
    for (const b of m.bonds || []) {
      const A = byId[b.a], B = byId[b.b], [x1, y1] = P(A), [x2, y2] = P(B), mx = (x1 + x2) / 2, my = (y1 + y2) / 2, ux = (x2 - x1) / Math.hypot(x2 - x1, y2 - y1), uy = (y2 - y1) / Math.hypot(x2 - x1, y2 - y1);
      if (m.style === "lewis") {
        for (let k = 0; k < (b.order || 1); k++) { const off = ((k - ((b.order || 1) - 1) / 2) * 6); s += line(x1 + ux * 14 - uy * off, y1 + uy * 14 + ux * off, x2 - ux * 14 - uy * off, y2 - uy * 14 + ux * off, { w: 2 }); }
        if (b.dative) { const [fx, fy] = b.dative === b.a ? [x1, y1] : [x2, y2]; s += arrow(fx + (b.dative === b.a ? ux : -ux) * 14, fy + (b.dative === b.a ? uy : -uy) * 14, (b.dative === b.a ? x2 - ux * 14 : x1 + ux * 14), (b.dative === b.a ? y2 - uy * 14 : y1 + uy * 14), { w: 2, head: 8 }); }
        continue;
      }
      for (let k = 0; k < (b.order || 1); k++) {
        const off = (k - ((b.order || 1) - 1) / 2) * 11 * scale;
        const px = mx - uy * off, py = my + ux * off;
        const mA = b.dative ? byId[b.dative].mark || "dot" : A.mark || "dot", mB = b.dative ? byId[b.dative].mark || "dot" : B.mark || "dot";
        s += mark(px - ux * 5, py - uy * 5, mA) + mark(px + ux * 5, py + uy * 5, mB);
      }
    }
    for (const l of m.links || []) {
      // an intermolecular attraction (dipole–dipole, hydrogen bond) as a dashed line between atoms
      const [x1, y1] = P(byId[l.a]), [x2, y2] = P(byId[l.b]), L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
      s += line(x1 + ux * 14, y1 + uy * 14, x2 - ux * 14, y2 - uy * 14, { stroke: col(l.colour || "a4"), w: 2.2, dash: "3 5" });
      if (l.label) s += text((x1 + x2) / 2 + (l.dx ?? 0), (y1 + y2) / 2 + (l.dy ?? -12), l.label, { size: 11, weight: 700, fill: col(l.colour || "a4") });
    }
    for (const a of m.atoms) {
      const [x, y] = P(a);
      s += `<text x="${f1(x)}" y="${f1(y)}" font-size="${17 * scale}" font-weight="800" text-anchor="middle" dominant-baseline="middle" fill="${C.ink}">${esc(a.el)}</text>`;
      // lone pairs around the free side of the atom
      const nb = (m.bonds || []).filter((b) => b.a === a.id || b.b === a.id).map((b) => { const o = byId[b.a === a.id ? b.b : b.a], [x2, y2] = P(o); return Math.atan2(y2 - y, x2 - x); });
      const angles = freeAngles(nb, a.lone || 0, a.loneAt);
      angles.forEach((ang, k) => {
        const r = m.style === "lewis" ? 15 : R - 9 * scale, cx = x + Math.cos(ang) * r, cy = y + Math.sin(ang) * r, px = -Math.sin(ang) * 5, py = Math.cos(ang) * 5;
        if (m.style === "lewis") s += `<circle cx="${f1(cx + px)}" cy="${f1(cy + py)}" r="2.4" fill="${C.ink}"/><circle cx="${f1(cx - px)}" cy="${f1(cy - py)}" r="2.4" fill="${C.ink}"/>`;
        else { const extra = a.gained && k === angles.length - 1; s += mark(cx + px, cy + py, a.mark || "dot") + mark(cx - px, cy - py, extra ? (a.gainedMark || "cross") : a.mark || "dot"); }
      });
      if (a.single) { const ang = freeAngles(nb, 1, a.singleAt)[0]; s += mark(x + Math.cos(ang) * (R - 9), y + Math.sin(ang) * (R - 9), a.mark || "dot"); }
      if (a.bracket) {
        s += `<path d="M${f1(x - R - 6)} ${f1(y - R - 4)} h-6 v${f1(2 * R + 8)} h6 M${f1(x + R + 6)} ${f1(y - R - 4)} h6 v${f1(2 * R + 8)} h-6" fill="none" stroke="${C.ink}" stroke-width="2"/>`;
        s += text(x + R + 20, y - R - 4, a.charge > 0 ? `${a.charge > 1 ? a.charge : ""}+` : `${a.charge < -1 ? -a.charge : ""}−`, { size: 15, weight: 800, anchor: "start" });
      }
      if (m.show === "oxidation" || m.show === "formal") {
        const v = m.show === "oxidation" ? oxStates(m)[a.id] : formal(m)[a.id];
        if (m.show === "oxidation" || v) s += text(x + 14, y - 22, `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v)}`, { size: 12.5, weight: 800, anchor: "start", fill: col("a2") });
      }
      if (a.delta) s += text(x, y - (m.style === "lewis" ? 24 : R + 10), a.delta === "+" ? "δ+" : "δ−", { size: 13, weight: 700, fill: a.delta === "+" ? col("a3") : col("a1") });
    }
    if (m.bracket) { const minx = Math.min(...m.atoms.map((a) => P(a)[0])) - (m.style === "lewis" ? 30 : R + 8), maxx = Math.max(...m.atoms.map((a) => P(a)[0])) + (m.style === "lewis" ? 30 : R + 8), miny = Math.min(...m.atoms.map((a) => P(a)[1])) - (m.style === "lewis" ? 30 : R + 6), maxy = Math.max(...m.atoms.map((a) => P(a)[1])) + (m.style === "lewis" ? 30 : R + 6); s += `<path d="M${f1(minx + 6)} ${f1(miny)} h-6 v${f1(maxy - miny)} h6 M${f1(maxx - 6)} ${f1(miny)} h6 v${f1(maxy - miny)} h-6" fill="none" stroke="${C.ink}" stroke-width="2"/>` + text(maxx + 6, miny + 4, m.charge > 0 ? `${m.charge > 1 ? m.charge : ""}+` : `${-m.charge > 1 ? -m.charge : ""}−`, { size: 15, weight: 800, anchor: "start" }); }
    s += text(10 + col0 * cw + cw / 2, 20 + row * rowH + rowH - 12, fm(m.label || ""), { size: 13, weight: 700 });
    if (m.sub) s += text(10 + col0 * cw + cw / 2, 20 + row * rowH + rowH + 6, fm(m.sub), { size: 11.5, fill: C.soft });
    H = Math.max(H, 20 + (row + 1) * rowH + (m.sub ? 20 : 4));
  });
  if (spec.arrowBetween && !narrow) s += arrow(W / 2 - 30, 20 + (spec.rowHeight?.[0] || 230) / 2 - 20, W / 2 + 30, 20 + (spec.rowHeight?.[0] || 230) / 2 - 20, { w: 2.4, head: 10 });
  const marks = [...new Set(spec.molecules.flatMap((m) => m.atoms.map((a) => a.mark || "dot")))];
  if (spec.key !== false && spec.molecules.some((m) => m.style !== "lewis") && marks.length > 1) {
    s += `<circle cx="20" cy="${H + 8}" r="3.3" fill="${col("a1")}"/>` + text(30, H + 8, spec.keyDot || "electron from the first atom", { size: 11.5, anchor: "start", fill: C.soft });
    s += `<path d="M${W / 2 - 3.6} ${H + 4.4} l7.2 7.2 M${W / 2 - 3.6} ${H + 11.6} l7.2 -7.2" stroke="${col("a2")}" stroke-width="2"/>` + text(W / 2 + 10, H + 8, spec.keyCross || "electron from the other atom", { size: 11.5, anchor: "start", fill: C.soft });
    H += 22;
  }
  return { s, H: H + 6 };
}
function freeAngles(nb, k, given) {
  if (given) return given.slice(0, k).map((d) => (d * Math.PI) / 180);
  if (!k) return [];
  if (!nb.length) return Array.from({ length: k }, (_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / Math.max(k, 4));
  // spread lone pairs in the widest gaps between bonds
  const cand = []; for (let i = 0; i < 36; i++) cand.push((i * Math.PI) / 18);
  const out = [];
  for (let q = 0; q < k; q++) {
    let best = null, bestD = -1;
    for (const c of cand) { const d = Math.min(...[...nb, ...out].map((b) => Math.abs(Math.atan2(Math.sin(c - b), Math.cos(c - b))))); if (d > bestD) { bestD = d; best = c; } }
    out.push(best);
  }
  return out;
}
function electronsAround(m, a) {
  const shared = (m.bonds || []).filter((b) => b.a === a.id || b.b === a.id).reduce((t, b) => t + 2 * (b.order || 1), 0);
  return shared + 2 * (a.lone || 0) + (a.single ? 1 : 0);
}
function formal(m) { const out = {}; for (const a of m.atoms) { const bonds = (m.bonds || []).filter((b) => b.a === a.id || b.b === a.id).reduce((t, b) => t + (b.order || 1), 0); out[a.id] = VAL[a.el] - 2 * (a.lone || 0) - (a.single ? 1 : 0) - bonds; } return out; }
function oxStates(m) {
  // give each bond's electrons to the more electronegative atom (equal: split)
  const out = {}; const byId = Object.fromEntries(m.atoms.map((a) => [a.id, a]));
  for (const a of m.atoms) out[a.id] = VAL[a.el] - 2 * (a.lone || 0) - (a.single ? 1 : 0);
  for (const b of m.bonds || []) { const A = byId[b.a], B = byId[b.b], n = 2 * (b.order || 1), ea = ENEG[A.el] ?? 0, eb = ENEG[B.el] ?? 0; if (ea > eb) out[A.id] -= n; else if (eb > ea) out[B.id] -= n; else { out[A.id] -= n / 2; out[B.id] -= n / 2; } }
  return out;
}
function dotcrossChecks(spec) {
  const out = [];
  for (const m of spec.molecules) {
    const name = m.label || "structure";
    const atomsCharge = m.atoms.reduce((t, a) => t + (a.charge || 0), 0), charge = m.charge ?? atomsCharge;
    const total = m.atoms.reduce((t, a) => t + VAL[a.el], 0) - charge;
    const drawn = m.atoms.reduce((t, a) => t + 2 * (a.lone || 0) + (a.single ? 1 : 0), 0) + (m.bonds || []).reduce((t, b) => t + 2 * (b.order || 1), 0);
    out.push(check(`${name}: ${total} outer electrons drawn (valence electrons − charge)`, drawn === total, `drawn ${drawn}`));
    const before = m.atoms.some((a) => a.incomplete);
    const bad = m.atoms.filter((a) => !a.expanded && !a.incomplete && electronsAround(m, a) !== shellFull(a.el) && !(a.bracket && electronsAround(m, a) === 0) && !(a.bracket && a.charge > 0 && (a.lone || 0) === 0) && !(a.ion && a.charge > 0 && (a.lone || 0) === 0));
    if (!before) out.push(check(`${name}: every atom has a full outer shell (octet, or two for H)`, !bad.length, bad.map((a) => `${a.el}: ${electronsAround(m, a)}`).join(", ") || "all full"));
    if (m.claims?.formal) { const f = formal(m); const wrong = Object.entries(m.claims.formal).filter(([k, v]) => f[k] !== v); out.push(check(`${name}: formal charges ${JSON.stringify(m.claims.formal)}`, !wrong.length, JSON.stringify(f))); }
    if (m.claims?.oxidation) { const o = oxStates(m); const wrong = Object.entries(m.claims.oxidation).filter(([k, v]) => o[k] !== v); out.push(check(`${name}: oxidation states ${JSON.stringify(m.claims.oxidation)}`, !wrong.length, JSON.stringify(o))); const sum = Object.values(o).reduce((a, b) => a + b, 0); out.push(check(`${name}: oxidation states add up to the charge (${charge})`, sum === charge, `sum ${sum}`)); }
    for (const l of m.links || []) if (l.hbond) {
      // a hydrogen bond: from an H bonded to N, O or F, to a lone pair on N, O or F of another molecule
      const h = m.atoms.find((a) => a.id === l.a), acc = m.atoms.find((a) => a.id === l.b);
      const donor = (m.bonds || []).filter((b) => b.a === h.id || b.b === h.id).map((b) => m.atoms.find((a) => a.id === (b.a === h.id ? b.b : b.a)))[0];
      out.push(check(`${name}: H on ${donor.el} to a lone pair on ${acc.el} is a hydrogen bond`, h.el === "H" && ["N", "O", "F"].includes(donor.el) && ["N", "O", "F"].includes(acc.el) && (acc.lone || 0) > 0));
    }
    if (m.claims?.delta) for (const [id, sign] of Object.entries(m.claims.delta)) { const a = m.atoms.find((x) => x.id === id), nb = (m.bonds || []).filter((b) => b.a === id || b.b === id).map((b) => m.atoms.find((x) => x.id === (b.a === id ? b.b : b.a))); const ok = nb.every((o) => (sign === "+" ? ENEG[a.el] < ENEG[o.el] : ENEG[a.el] > ENEG[o.el])); out.push(check(`${name}: ${a.el} is δ${sign} (electronegativity ${ENEG[a.el]})`, ok)); }
  }
  for (const e of spec.equations || []) { const b = balanced(e); out.push(check(`${e} balances`, b.ok, b.detail)); }
  return out;
}

register({
  classify: { draw: classify, checks: classifyChecks, widths: [700, 380] },
  cell: { draw: cell, checks: cellChecks, widths: [700, 380] },
  levels: { draw: levelsDraw, checks: levelChecks, widths: [680, 380] },
  table: { draw: table, checks: tableChecks, widths: [700, 380] },
  dotcross: { draw: dotcross, checks: dotcrossChecks, widths: [680, 380] },
});
export { moFill, cfsFill, dCount, lineNm, oxStates, formal, e0Of };
