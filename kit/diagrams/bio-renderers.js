// Gradify Visual Learning Engine: biology renderers, part 1 (part 2 is bio-renderers-2.js; the biology they
// recompute is in bio-core.js). Every renderer draws a wide and a narrow layout and checks the biology, the lesson
// tie and the layout (every label inside the picture, none overprinting):
//
//   bio-levels     a ranked hierarchy (levels of organisation, taxonomic ranks): the order against the vetted order,
//                  every level named in the lesson
//   bio-structure  a stylised labelled structure (cells, organelles, membrane, neurone, leaf, virus) from a vetted
//                  template: every label is a part of that structure, is named in the lesson, and the structure's
//                  defining parts are labelled. Clean schematic shapes, not to scale, no anatomical precision claimed
//   bio-scale      sizes on a logarithmic ruler: each size inside its vetted range, units converted, magnification
//                  = image size / actual size recomputed
//   bio-phylo      a cladogram: every grouping the lesson claims is a clade of the tree, every "closer than" holds
//   bio-water      water potential (ψ = ψs + ψp) or solute concentration: stated ψ and every arrow's direction
//                  recomputed, and what happens to each cell
//   bio-pyramid    a pyramid of energy, biomass or numbers: transfer efficiencies recomputed, energy always falls
import { register, line, arrow, col, f1, check, wrap, COLOURS as C } from "./renderers.js";
import { Pic, layoutChecks, named, textWidth, psi } from "./bio-core.js";

export const fx = (s) => String(s).replace(/(NADP?|H|FAD)\+/g, "$1^{+}").replace(/\b(CO|H|O|FADH|NO|NH|PO)(\d)\b/g, "$1_{$2}").replace(/\be-/g, "e^{−}");
const rect = (x, y, w, h, { f = "panel", fo = 1, s = "line", sw = 1.4, r = 8, dash = "" } = {}) =>
  `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${r}" fill="${col(f)}" fill-opacity="${fo}" stroke="${col(s)}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
const dot = (x, y, r, c, o = 1) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${col(c)}" fill-opacity="${o}"/>`;
/** Spread wanted positions apart by at least `gap` inside [lo, hi] (keeps order). */
export function spread(wants, lo, hi, gap) {
  const it = wants.map((w, i) => ({ w, i })).sort((a, b) => a.w - b.w);
  let y = lo; for (const o of it) { o.y = Math.max(o.w, y); y = o.y + gap; }
  for (let k = it.length - 1, lim = hi; k >= 0; k--) { it[k].y = Math.min(it[k].y, lim); lim = it[k].y - gap; }
  for (let k = 0, y0 = lo; k < it.length; k++) { it[k].y = Math.max(it[k].y, y0); y0 = it[k].y + gap; }
  const out = []; for (const o of it) out[o.i] = o.y; return out;
}
const termCheck = (terms, lessonText, what) => {
  const miss = terms.filter((t) => !named(t.name, lessonText, t.aka || []));
  return check(`every ${what} is named in the lesson`, !miss.length, miss.length ? `not in the lesson: ${miss.map((t) => t.name).join(", ")}` : `${terms.length} named`);
};

// ======================================================================== bio-levels
// spec: scale "organisation" | "taxonomy", levels: [{name, example}], ends: [top label, bottom label]
export const VOCAB_LEVELS = {
  organisation: ["atom", "molecule", "macromolecule", "organelle", "cell", "tissue", "organ", "organ system", "organism", "population", "community", "ecosystem", "biome", "biosphere"],
  taxonomy: ["domain", "kingdom", "phylum", "class", "order", "family", "genus", "species"],
};
const levelKey = (name, vocab) => { const n = name.toLowerCase().replace(/^the /, "").replace(/\s+and\s+.*$/, "").trim(); return vocab.findIndex((v) => n === v || n === `${v}s` || n === `${v}es` || (v === "phylum" && n === "phyla") || (v === "genus" && n === "genera") || (v === "species" && n === "species") || (v === "family" && n === "families") || (v === "class" && n === "classes") || (v === "community" && n === "communities")); };
function levels(spec, W, narrow) {
  const p = new Pic(W), L = spec.levels, bx = 46, bw = narrow ? 150 : 210, ex = bx + bw + 14, chars = Math.floor((W - ex - 12) / (13 * 0.56));
  let y = 34;
  p.t(16, 16, spec.ends?.[0] || "", { size: 12.5, weight: 600, anchor: "start", fill: C.soft });
  const top = y;
  L.forEach((l, i) => {
    const lines = l.example ? wrap(l.example, chars) : [], h = Math.max(38, lines.length * 16 + 14), cy = y + h / 2;
    const c = ["a1", "a5", "a2", "a3", "a4"][Math.floor((i / L.length) * 5)];
    p.add(rect(bx, y + 3, bw, h - 6, { f: c, fo: 0.12, s: c, sw: 1.6 }));
    p.t(bx + bw / 2, cy, l.name, { size: 14, weight: 700, fill: col(c) });
    lines.forEach((s, k) => p.t(ex, cy + (k - (lines.length - 1) / 2) * 16, s, { size: 13, anchor: "start", fill: C.ink }));
    y += h;
  });
  p.add(arrow(24, top + 4, 24, y - 4, { stroke: C.soft, w: 2, head: 10 }));
  p.t(16, y + 16, spec.ends?.[1] || "", { size: 12.5, weight: 600, anchor: "start", fill: C.soft });
  return p.done(y + 32);
}
function levelChecks(spec, lessonText) {
  const vocab = VOCAB_LEVELS[spec.scale], out = [];
  if (!vocab) return [check("the scale is a vetted hierarchy", false, `unknown scale ${spec.scale}`)];
  const idx = spec.levels.map((l) => levelKey(l.name, vocab)), unknown = spec.levels.filter((_, i) => idx[i] < 0).map((l) => l.name);
  out.push(check(`every level is a ${spec.scale} level`, !unknown.length, unknown.join(", ")));
  const bad = idx.findIndex((v, i) => i && v <= idx[i - 1]);
  out.push(check(`levels in the correct ${spec.scale} order`, !unknown.length && bad < 0, bad > 0 ? `${spec.levels[bad - 1].name} before ${spec.levels[bad].name}` : spec.levels.map((l) => l.name).join(" → ")));
  if (spec.complete) { const miss = vocab.slice(Math.min(...idx), Math.max(...idx) + 1).filter((_, k) => !idx.includes(k + Math.min(...idx))); out.push(check("no level skipped", !miss.length, miss.join(", "))); }
  out.push(termCheck(spec.levels.map((l) => ({ name: l.name.replace(/^the /i, "") })), lessonText, "level"));
  return [...out, ...layoutChecks(spec, levels, [680, 380])];
}

// ======================================================================== bio-structure
// Templates: unit coordinates with the height = 1 and the width = A. Each shape is {e: [cx, cy, rx, ry, rot]},
// {c: [cx, cy, r]}, {r: [x, y, w, h, radius]} or {d: "M u v L u v Q … C … Z"} with a style {f, fo, s, w, dash}.
const E = (cx, cy, rx, ry, st, rot = 0) => ({ e: [cx, cy, rx, ry, rot], st });
const Cc = (cx, cy, r, st) => ({ c: [cx, cy, r], st });
const R = (x, y, w, h, rad, st) => ({ r: [x, y, w, h, rad], st });
const Dp = (d, st) => ({ d, st });
const qp = (a, b, c, t) => [(1 - t) ** 2 * a[0] + 2 * (1 - t) * t * b[0] + t * t * c[0], (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * b[1] + t * t * c[1]];
const ribos = (pts) => pts.map(([u, v]) => Cc(u, v, 0.011, { f: "a1", fo: 0.9 }));
export const TEMPLATES = {
  "animal-cell": { A: 1.45, title: "animal cell", must: ["cell membrane", "nucleus", "cytoplasm"], shapes: () => [
    E(0.725, 0.5, 0.7, 0.47, { f: "a1", fo: 0.05, s: "ink", w: 2.4 }),
    E(0.6, 0.5, 0.17, 0.17, { f: "a5", fo: 0.13, s: "a5", w: 2.4, dash: "14 3" }), E(0.64, 0.46, 0.055, 0.05, { f: "a5", fo: 0.55 }),
    ...[[[0.37, 0.3], [0.31, 0.5], [0.37, 0.7]], [[0.32, 0.27], [0.24, 0.5], [0.32, 0.73]]].flatMap(([a, b, c]) => [Dp(`M ${a[0]} ${a[1]} Q ${b[0]} ${b[1]} ${c[0]} ${c[1]}`, { s: "a1", w: 2 }), ...ribos([0.15, 0.35, 0.55, 0.75, 0.92].map((t) => qp(a, b, c, t)))]),
    E(1.02, 0.27, 0.12, 0.055, { f: "a3", fo: 0.2, s: "a3", w: 2 }), Dp("M 0.92 0.27 L 0.95 0.24 L 0.98 0.3 L 1.01 0.24 L 1.04 0.3 L 1.07 0.24 L 1.1 0.3 L 1.12 0.27", { s: "a3", w: 1.3 }),
    E(0.47, 0.84, 0.1, 0.048, { f: "a3", fo: 0.2, s: "a3", w: 2 }), Dp("M 0.39 0.84 L 0.42 0.81 L 0.45 0.87 L 0.48 0.81 L 0.51 0.87 L 0.55 0.84", { s: "a3", w: 1.3 }),
    ...[0, 1, 2, 3].map((k) => Dp(`M ${0.95} ${0.52 + k * 0.04} Q 1.05 ${0.58 + k * 0.04} 1.15 ${0.52 + k * 0.04}`, { s: "a4", w: 3 })),
    Cc(1.19, 0.63, 0.02, { f: "a4", fo: 0.3, s: "a4", w: 1.5 }), Cc(1.22, 0.71, 0.017, { f: "a4", fo: 0.3, s: "a4", w: 1.5 }),
    Cc(0.95, 0.82, 0.035, { f: "a2", fo: 0.35, s: "a2", w: 1.6 }), ...ribos([[1.25, 0.42], [1.22, 0.36], [0.85, 0.14], [0.5, 0.17], [1.28, 0.5]]),
  ], parts: {
    "cell membrane": { at: [1.3, 0.24], aka: ["plasma membrane", "cell surface membrane"] }, cytoplasm: { at: [1.18, 0.82] },
    nucleus: { at: [0.52, 0.6] }, nucleolus: { at: [0.64, 0.46] }, "nuclear envelope": { at: [0.6, 0.33] },
    "rough endoplasmic reticulum": { at: [0.275, 0.5], aka: ["rough ER", "endoplasmic reticulum"] },
    mitochondrion: { at: [1.02, 0.27], aka: ["mitochondria"] }, "Golgi apparatus": { at: [1.05, 0.57], aka: ["Golgi body", "Golgi"] },
    vesicle: { at: [1.19, 0.63] }, lysosome: { at: [0.95, 0.82] }, ribosome: { at: [1.25, 0.42] },
  } },
  "plant-cell": { A: 1.45, title: "plant cell", must: ["cell wall", "vacuole", "chloroplast"], shapes: () => [
    R(0.02, 0.02, 1.41, 0.96, 0.06, { f: "good", fo: 0.22, s: "good", w: 2 }), R(0.06, 0.06, 1.33, 0.88, 0.04, { f: "#ffffff", fo: 1, s: "ink", w: 1.6 }),
    E(0.82, 0.5, 0.38, 0.3, { f: "a1", fo: 0.1, s: "a1", w: 1.8 }),
    E(0.22, 0.28, 0.1, 0.1, { f: "a5", fo: 0.14, s: "a5", w: 2 }), Cc(0.24, 0.26, 0.03, { f: "a5", fo: 0.55 }),
    ...[[0.25, 0.72, 0], [0.62, 0.87, 0], [1.31, 0.25, 90], [1.31, 0.74, 90], [0.8, 0.12, 0]].flatMap(([u, v, r]) => [E(u, v, 0.085, 0.042, { f: "good", fo: 0.35, s: "good", w: 1.6 }, r),
      ...(r ? [-0.03, 0, 0.03].map((k) => Dp(`M ${u - 0.015} ${v + k} L ${u + 0.015} ${v + k}`, { s: "good", w: 2 })) : [-0.035, 0, 0.035].map((k) => Dp(`M ${u + k} ${v - 0.015} L ${u + k} ${v + 0.015}`, { s: "good", w: 2 })))]),
    E(0.45, 0.14, 0.06, 0.03, { f: "a3", fo: 0.25, s: "a3", w: 1.6 }), ...ribos([[0.14, 0.5], [0.4, 0.4], [1.3, 0.5], [0.1, 0.85]]),
  ], parts: {
    "cell wall": { at: [0.04, 0.5], aka: ["cellulose cell wall"] }, "cell membrane": { at: [1.39, 0.5], aka: ["plasma membrane", "cell surface membrane"] },
    vacuole: { at: [0.82, 0.5], aka: ["central vacuole"] }, tonoplast: { at: [0.82, 0.2] }, nucleus: { at: [0.18, 0.33] },
    chloroplast: { at: [0.25, 0.72], aka: ["chloroplasts"] }, mitochondrion: { at: [0.45, 0.14], aka: ["mitochondria"] }, cytoplasm: { at: [0.14, 0.58] }, ribosome: { at: [0.4, 0.4] },
  } },
  "bacterial-cell": { A: 2.25, title: "bacterial cell", must: ["cell wall", "nucleoid"], shapes: () => [
    ...[[0.6, 0.2, 0.58, 0.09], [1.0, 0.2, 1.0, 0.07], [1.4, 0.2, 1.42, 0.09], [0.8, 0.8, 0.78, 0.92], [1.25, 0.8, 1.27, 0.93]].map(([a, b, c, d]) => Dp(`M ${a} ${b} L ${c} ${d}`, { s: "ink", w: 1.6 })),
    Dp("M 1.85 0.5 C 1.93 0.36 1.99 0.64 2.05 0.5 C 2.11 0.36 2.17 0.64 2.23 0.5", { s: "ink", w: 2 }),
    R(0.15, 0.2, 1.7, 0.6, 0.3, { f: "a4", fo: 0.1, s: "a4", w: 1.5, dash: "5 3" }), R(0.19, 0.24, 1.62, 0.52, 0.26, { f: "#ffffff", s: "good", w: 3.2 }),
    R(0.225, 0.275, 1.55, 0.45, 0.22, { f: "a1", fo: 0.05, s: "ink", w: 1.4 }),
    Dp("M 0.6 0.5 C 0.65 0.35 0.8 0.62 0.9 0.42 C 1.0 0.3 1.15 0.6 1.05 0.58 C 0.95 0.66 0.75 0.64 0.6 0.5", { s: "a5", w: 2.2 }),
    Cc(1.35, 0.42, 0.04, { s: "a2", w: 2 }), Cc(1.47, 0.6, 0.03, { s: "a2", w: 2 }), ...ribos([[0.45, 0.4], [0.5, 0.62], [1.25, 0.63], [1.6, 0.42], [0.38, 0.52]]),
  ], parts: {
    capsule: { at: [0.155, 0.5], aka: ["slime capsule", "slime layer"] }, "cell wall": { at: [1.0, 0.24], aka: ["peptidoglycan"] }, "cell membrane": { at: [1.775, 0.42], aka: ["plasma membrane", "cell surface membrane"] },
    nucleoid: { at: [0.9, 0.42], aka: ["circular DNA", "chromosome"] }, plasmid: { at: [1.35, 0.38], aka: ["plasmids"] }, ribosome: { at: [0.45, 0.4], aka: ["70S ribosomes"] },
    flagellum: { at: [2.05, 0.5], aka: ["flagella"] }, pilus: { at: [1.0, 0.1], aka: ["pili"] }, cytoplasm: { at: [1.65, 0.55] },
  } },
  mitochondrion: { A: 2.0, title: "mitochondrion", must: ["inner membrane", "matrix"], shapes: () => [
    E(1, 0.5, 0.95, 0.42, { f: "a3", fo: 0.12, s: "a3", w: 2.4 }), E(1, 0.5, 0.87, 0.34, { f: "a3", fo: 0.1, s: "a3", w: 1.8 }),
    ...[[0.35, -1], [0.6, 1], [0.85, -1], [1.1, 1], [1.35, -1], [1.6, 1]].map(([u, side]) => {
      const edge = 0.5 + side * 0.34 * Math.sqrt(1 - ((u - 1) / 0.87) ** 2) * 0.98, tip = 0.5 + side * 0.06;
      return Dp(`M ${u - 0.03} ${edge} L ${u - 0.03} ${tip} Q ${u} ${tip - side * 0.05} ${u + 0.03} ${tip} L ${u + 0.03} ${edge}`, { s: "a3", w: 1.6, f: "a3", fo: 0.12 });
    }),
    ...ribos([[0.72, 0.62], [1.24, 0.38], [0.48, 0.4]]), Cc(1.48, 0.64, 0.035, { s: "a5", w: 1.8 }),
  ], parts: {
    "outer membrane": { at: [0.3, 0.216] }, "inner membrane": { at: [1.87, 0.5] }, crista: { at: [0.85, 0.3], aka: ["cristae"] }, matrix: { at: [0.98, 0.5] },
    "intermembrane space": { at: [1.0, 0.12] }, ribosome: { at: [0.72, 0.62], aka: ["ribosomes"] }, "mitochondrial DNA": { at: [1.48, 0.64], aka: ["DNA", "circular DNA"] },
  } },
  chloroplast: { A: 2.0, title: "chloroplast", must: ["thylakoid", "stroma"], shapes: () => [
    E(1, 0.5, 0.95, 0.42, { f: "good", fo: 0.1, s: "good", w: 2.4 }), E(1, 0.5, 0.9, 0.37, { s: "good", w: 1.3 }),
    Dp("M 0.54 0.45 L 0.76 0.55 M 0.94 0.55 L 1.16 0.42 M 1.34 0.42 L 1.51 0.52", { s: "good", w: 2.2 }),
    ...[[0.45, 0.45], [0.85, 0.55], [1.25, 0.42], [1.6, 0.52]].flatMap(([u, v]) => [-2, -1, 0, 1, 2].map((k) => E(u, v + k * 0.05, 0.09, 0.02, { f: "good", fo: 0.45, s: "good", w: 1 }))),
    E(1.05, 0.74, 0.08, 0.045, { f: "#ffffff", s: "soft", w: 1.4 }), ...ribos([[0.65, 0.3], [1.4, 0.7], [0.7, 0.7]]),
  ], parts: {
    envelope: { at: [0.3, 0.216], aka: ["double membrane", "chloroplast envelope", "outer membrane", "inner membrane"] }, granum: { at: [0.45, 0.35], aka: ["grana"] },
    thylakoid: { at: [1.25, 0.52], aka: ["thylakoids", "thylakoid membrane"] }, stroma: { at: [1.05, 0.25] }, lamella: { at: [1.05, 0.485], aka: ["lamellae", "intergranal lamellae"] },
    "starch grain": { at: [1.05, 0.74], aka: ["starch"] }, ribosome: { at: [1.4, 0.7], aka: ["ribosomes"] },
  } },
  membrane: { A: 2.4, title: "cell membrane (fluid mosaic model)", must: ["phospholipid bilayer"], shapes: () => {
    const out = [], skip = (u) => (u > 0.56 && u < 0.89) || (u > 1.27 && u < 1.63) || (u > 1.88 && u < 2.12);
    for (let u = 0.1; u < 2.35; u += 0.1) if (!skip(u)) for (const [v, d] of [[0.3, 1], [0.7, -1]]) {
      out.push(Dp(`M ${u - 0.015} ${v} L ${u - 0.02} ${v + d * 0.18} M ${u + 0.015} ${v} L ${u + 0.02} ${v + d * 0.18}`, { s: "soft", w: 1.3 }), Cc(u, v, 0.04, { f: "a1", fo: 0.55, s: "a1", w: 1 }));
    }
    out.push(R(0.6, 0.18, 0.1, 0.64, 0.04, { f: "a4", fo: 0.5, s: "a4", w: 1.5 }), R(0.75, 0.18, 0.1, 0.64, 0.04, { f: "a4", fo: 0.5, s: "a4", w: 1.5 }),
      E(1.45, 0.5, 0.15, 0.36, { f: "a3", fo: 0.45, s: "a3", w: 1.5 }), E(2.0, 0.52, 0.1, 0.3, { f: "a5", fo: 0.4, s: "a5", w: 1.5 }),
      Dp("M 2.0 0.22 L 1.97 0.13 L 2.02 0.06", { s: "a2", w: 1.6 }), Cc(1.97, 0.13, 0.018, { f: "a2" }), Cc(2.02, 0.05, 0.018, { f: "a2" }),
      Dp("M 0.3 0.26 L 0.28 0.17 L 0.33 0.1", { s: "a2", w: 1.6 }), Cc(0.28, 0.17, 0.018, { f: "a2" }), Cc(0.33, 0.09, 0.018, { f: "a2" }),
      R(1.08, 0.37, 0.04, 0.11, 0.02, { f: "good", fo: 0.7 }), R(2.2, 0.53, 0.04, 0.11, 0.02, { f: "good", fo: 0.7 }));
    return out;
  }, parts: {
    "phospholipid bilayer": { at: [2.3, 0.7], aka: ["bilayer", "phospholipids"] }, "hydrophilic head": { at: [0.2, 0.3], aka: ["phosphate head", "hydrophilic heads"] },
    "hydrophobic tail": { at: [0.4, 0.42], aka: ["fatty acid tail", "hydrophobic tails"] }, "channel protein": { at: [0.65, 0.7], aka: ["channel proteins"] },
    "carrier protein": { at: [1.45, 0.6], aka: ["carrier proteins"] }, glycoprotein: { at: [2.0, 0.6], aka: ["glycoproteins"] }, glycolipid: { at: [0.33, 0.09], aka: ["glycolipids"] },
    cholesterol: { at: [1.1, 0.42] },
  } },
  neurone: { A: 3.3, title: "motor neurone", must: ["cell body", "axon"], shapes: () => {
    const out = [];
    for (const [a, l] of [[125, 0.26], [160, 0.3], [200, 0.3], [235, 0.26]]) {
      const r = (a * Math.PI) / 180, x0 = 0.42 + 0.17 * Math.cos(r), y0 = 0.5 - 0.17 * Math.sin(r), x1 = 0.42 + (0.17 + l) * Math.cos(r), y1 = 0.5 - (0.17 + l) * Math.sin(r);
      out.push(Dp(`M ${x0} ${y0} L ${x1} ${y1} M ${(x0 + x1) / 2} ${(y0 + y1) / 2} L ${(x0 + x1) / 2 - 0.08} ${(y0 + y1) / 2 - 0.1 * Math.sign(Math.sin(r) || 1)}`, { s: "a5", w: 2.2 }));
    }
    out.push(Dp("M 0.58 0.5 L 3.0 0.5", { s: "ink", w: 2.2 }), Cc(0.42, 0.5, 0.17, { f: "a5", fo: 0.15, s: "a5", w: 2 }), Cc(0.42, 0.5, 0.06, { f: "a5", fo: 0.55 }));
    for (let k = 0; k < 6; k++) out.push(R(0.72 + k * 0.36, 0.42, 0.3, 0.16, 0.07, { f: "a3", fo: 0.3, s: "a3", w: 1.5 }));
    out.push(E(0.87, 0.4, 0.05, 0.025, { f: "a3", fo: 0.8 }));
    for (const v of [0.3, 0.5, 0.7]) out.push(Dp(`M 3.0 0.5 L 3.17 ${v}`, { s: "ink", w: 2 }), Cc(3.19, v, 0.035, { f: "a2", fo: 0.5, s: "a2", w: 1.4 }));
    return out;
  }, parts: {
    dendrite: { at: [0.2, 0.17], aka: ["dendrites", "dendron"] }, "cell body": { at: [0.36, 0.4], aka: ["soma"] }, nucleus: { at: [0.42, 0.5] }, axon: { at: [2.9, 0.5] },
    "myelin sheath": { at: [1.65, 0.42], aka: ["myelin"] }, "node of Ranvier": { at: [1.38, 0.5], aka: ["nodes of Ranvier"] }, "Schwann cell": { at: [0.87, 0.4], aka: ["Schwann cells"] },
    "axon terminal": { at: [3.19, 0.3], aka: ["synaptic knob", "axon terminals", "synaptic terminal", "synaptic end bulb"] },
  } },
  leaf: { A: 1.8, title: "leaf in cross-section", must: ["palisade mesophyll", "spongy mesophyll", "stoma"], shapes: () => {
    const out = [R(0.02, 0.02, 1.76, 0.035, 0.01, { f: "a3", fo: 0.35 }), R(0.02, 0.925, 1.76, 0.03, 0.01, { f: "a3", fo: 0.35 })];
    for (let u = 0.02; u < 1.77; u += 0.125) out.push(R(u, 0.055, 0.12, 0.09, 0.02, { f: "#ffffff", s: "ink", w: 1 }));
    for (let u = 0.03; u < 1.75; u += 0.1) { out.push(R(u, 0.155, 0.085, 0.3, 0.035, { f: "good", fo: 0.22, s: "good", w: 1.2 })); for (const v of [0.21, 0.3, 0.39]) out.push(Cc(u + 0.042, v, 0.014, { f: "good", fo: 0.8 })); }
    for (const [u, v] of [[0.1, 0.55], [0.26, 0.6], [0.44, 0.54], [0.6, 0.63], [0.16, 0.73], [0.36, 0.74], [0.56, 0.78], [1.22, 0.55], [1.4, 0.62], [1.58, 0.55], [1.72, 0.68], [1.25, 0.74], [1.55, 0.77]]) out.push(E(u, v, 0.065, 0.05, { f: "good", fo: 0.15, s: "good", w: 1.1 }));
    out.push(E(0.92, 0.64, 0.17, 0.15, { f: "a1", fo: 0.06, s: "a1", w: 1.4, dash: "4 3" }));
    for (const [u, v] of [[0.86, 0.58], [0.92, 0.56], [0.98, 0.58]]) out.push(Cc(u, v, 0.028, { f: "#ffffff", s: "a1", w: 2.2 }));
    for (const [u, v] of [[0.87, 0.7], [0.92, 0.72], [0.97, 0.7]]) out.push(Cc(u, v, 0.016, { f: "a4", fo: 0.35, s: "a4", w: 1.2 }));
    for (let u = 0.02; u < 1.77; u += 0.125) if (Math.abs(u + 0.06 - 1.4) > 0.1) out.push(R(u, 0.835, 0.12, 0.09, 0.02, { f: "#ffffff", s: "ink", w: 1 }));
    out.push(E(1.355, 0.88, 0.035, 0.045, { f: "good", fo: 0.35, s: "good", w: 1.4 }), E(1.445, 0.88, 0.035, 0.045, { f: "good", fo: 0.35, s: "good", w: 1.4 }));
    return out;
  }, parts: {
    cuticle: { at: [0.3, 0.035], aka: ["waxy cuticle"] }, "upper epidermis": { at: [0.4, 0.1], aka: ["epidermis"] }, "palisade mesophyll": { at: [0.55, 0.3], aka: ["palisade"] },
    "spongy mesophyll": { at: [0.36, 0.74], aka: ["spongy"] }, "air space": { at: [0.36, 0.64], aka: ["air spaces"] }, xylem: { at: [0.92, 0.56] }, phloem: { at: [0.92, 0.72] },
    "vascular bundle": { at: [1.09, 0.64], aka: ["vein"] }, "lower epidermis": { at: [0.6, 0.88], aka: ["epidermis"] }, "guard cell": { at: [1.445, 0.88], aka: ["guard cells"] }, stoma: { at: [1.4, 0.9], aka: ["stomata"] },
  } },
  virus: { A: 1.0, title: "enveloped virus", must: ["capsid", "nucleic acid"], shapes: () => {
    const out = [];
    for (let k = 0; k < 14; k++) { const a = (k / 14) * 2 * Math.PI + 0.2, c = Math.cos(a), s = Math.sin(a); out.push(Dp(`M ${0.5 + 0.36 * c} ${0.5 + 0.36 * s} L ${0.5 + 0.43 * c} ${0.5 + 0.43 * s}`, { s: "a2", w: 2 }), Cc(0.5 + 0.445 * c, 0.5 + 0.445 * s, 0.02, { f: "a2" })); }
    out.push(Cc(0.5, 0.5, 0.36, { f: "a3", fo: 0.1, s: "a3", w: 2.6 }));
    out.push(Dp(`M ${[0, 1, 2, 3, 4, 5].map((k) => `${0.5 + 0.25 * Math.cos((k * Math.PI) / 3)} ${0.5 + 0.25 * Math.sin((k * Math.PI) / 3)}`).join(" L ")} Z`, { f: "a1", fo: 0.12, s: "a1", w: 2.2 }));
    out.push(Dp("M 0.38 0.5 C 0.4 0.38 0.48 0.62 0.5 0.5 C 0.52 0.38 0.6 0.62 0.62 0.5 C 0.6 0.4 0.52 0.58 0.5 0.62", { s: "a5", w: 2.2 }));
    return out;
  }, parts: {
    envelope: { at: [0.5, 0.86], aka: ["lipid envelope", "viral envelope"] }, "spike protein": { at: [0.5 + 0.445 * Math.cos(0.2 + (10 * Math.PI) / 7), 0.5 + 0.445 * Math.sin(0.2 + (10 * Math.PI) / 7)], aka: ["glycoprotein", "spikes", "surface protein", "attachment protein"] },
    capsid: { at: [0.75, 0.5], aka: ["protein coat"] }, "nucleic acid": { at: [0.5, 0.5], aka: ["genome", "RNA", "DNA", "genetic material"] },
  } },
};
function prim(p, X, Y, h) {
  const st = p.st || {}, a = `fill="${st.f ? col(st.f) : "none"}"${st.f ? ` fill-opacity="${st.fo ?? 1}"` : ""} stroke="${st.s ? col(st.s) : "none"}" stroke-width="${st.w ?? 1.5}"${st.dash ? ` stroke-dasharray="${st.dash}"` : ""} stroke-linecap="round" stroke-linejoin="round"`;
  const px = (u) => f1(X + u * h), py = (v) => f1(Y + v * h);
  if (p.e) { const [cx, cy, rx, ry, rot] = p.e; return `<ellipse cx="${px(cx)}" cy="${py(cy)}" rx="${f1(rx * h)}" ry="${f1(ry * h)}"${rot ? ` transform="rotate(${rot} ${px(cx)} ${py(cy)})"` : ""} ${a}/>`; }
  if (p.c) return `<circle cx="${px(p.c[0])}" cy="${py(p.c[1])}" r="${f1(p.c[2] * h)}" ${a}/>`;
  if (p.r) { const [x, y, w, hh, r] = p.r; return `<rect x="${px(x)}" y="${py(y)}" width="${f1(w * h)}" height="${f1(hh * h)}" rx="${f1(r * h)}" ${a}/>`; }
  return `<path d="${p.d.replace(/(-?[\d.]+)\s+(-?[\d.]+)/g, (_, u, v) => `${px(+u)} ${py(+v)}`)}" ${a}/>`;
}
function structure(spec, W, narrow) {
  const T = TEMPLATES[spec.structure], p = new Pic(W), labels = (spec.labels || []).map((l) => (typeof l === "string" ? { part: l } : l)).filter((l) => T?.parts[l.part]);
  if (!T) return p.done(60);
  const size = narrow ? 13 : 14, gap = narrow ? 22 : 26, top = 18;
  const lw = narrow ? 0 : Math.max(60, ...labels.map((l) => textWidth(l.text || l.part, size, 600))) + 18;
  const shapeW = narrow ? W - 32 : Math.min(W - 2 * lw - 32, (spec.maxHeight || 330) * T.A), h = Math.min(shapeW / T.A, spec.maxHeight || 330), X = narrow ? 16 : (W - h * T.A) / 2, Y = top + 8;
  for (const s of T.shapes()) p.add(prim(s, X, Y, h));
  const pts = labels.map((l) => ({ ...l, x: X + T.parts[l.part].at[0] * h, y: Y + T.parts[l.part].at[1] * h }));
  let bottom = Y + h;
  if (!narrow) {
    const left = pts.filter((q) => q.x < X + (h * T.A) / 2), right = pts.filter((q) => !left.includes(q));
    for (const [side, xs, anchor] of [[left, X - 14, "end"], [right, X + h * T.A + 14, "start"]]) {
      const ys = spread(side.map((q) => q.y), top, Math.max(Y + h, top + side.length * gap), gap);
      side.forEach((q, i) => {
        p.add(line(xs + (anchor === "end" ? 4 : -4), ys[i], q.x, q.y, { stroke: C.soft, w: 1.2 }) + dot(q.x, q.y, 3, "ink"));
        p.t(xs + (anchor === "end" ? -2 : 2), ys[i], q.text || q.part, { size, weight: 600, anchor });
        bottom = Math.max(bottom, ys[i] + 10);
      });
    }
  } else {
    // numbered markers on the parts themselves (no leader lines across the picture), numbered top to bottom
    pts.sort((a, b) => a.y - b.y || a.x - b.x);
    pts.forEach((q, i) => { p.add(`<circle cx="${f1(q.x)}" cy="${f1(q.y)}" r="9.5" fill="${C.ink}" stroke="#ffffff" stroke-width="1.5"/>`); p.t(q.x, q.y + 0.5, String(i + 1), { size: 10.5, weight: 700, fill: "#ffffff" }); });
    bottom += 14;
    pts.forEach((q, i) => { p.add(`<circle cx="26" cy="${f1(bottom + i * 21)}" r="9" fill="${C.ink}"/>`); p.t(26, bottom + i * 21 + 0.5, String(i + 1), { size: 10.5, weight: 700, fill: "#ffffff" }); p.t(42, bottom + i * 21, q.text || q.part, { size, weight: 600, anchor: "start" }); });
    bottom += pts.length * 21 - 8;
  }
  p.t(W - 12, bottom + 16, `${T.title}: schematic, not to scale`, { size: 11.5, anchor: "end", fill: C.soft, italic: true });
  return p.done(bottom + 30);
}
function structureChecks(spec, lessonText) {
  const T = TEMPLATES[spec.structure];
  if (!T) return [check("the structure is a vetted template", false, `no template ${spec.structure}; have ${Object.keys(TEMPLATES).join(", ")}`)];
  const labels = (spec.labels || []).map((l) => (typeof l === "string" ? { part: l } : l)), unknown = labels.filter((l) => !T.parts[l.part]);
  const missing = T.must.filter((m) => !labels.some((l) => l.part === m));
  return [
    check(`every label is a part of a ${T.title}`, !unknown.length, unknown.length ? `not parts of a ${T.title}: ${unknown.map((l) => l.part).join(", ")}` : `${labels.length} parts`),
    check(`the defining parts of a ${T.title} are labelled`, !missing.length, missing.join(", ")),
    termCheck(labels.filter((l) => T.parts[l.part]).map((l) => ({ name: l.text || l.part, aka: [l.part, ...(T.parts[l.part].aka || [])] })), lessonText, "labelled part"),
    check("each part labelled once", new Set(labels.map((l) => l.part)).size === labels.length),
    ...layoutChecks(spec, structure, [760, 380]),
  ];
}

// ======================================================================== bio-scale
// spec: items [{name, size | from+to, unit}], magnification {image: [v, unit], actual: [v, unit], M}
const UNIT = { nm: 1e-9, "µm": 1e-6, um: 1e-6, mm: 1e-3, cm: 1e-2, m: 1, pm: 1e-12 };
export const SIZES = { // vetted ranges in metres (typical sizes in introductory texts; OpenStax Biology 2e, 4.1)
  atom: [5e-11, 5e-10], "small molecule": [3e-10, 2e-9], "DNA double helix (width)": [1.8e-9, 2.2e-9], protein: [1e-9, 2e-8], ribosome: [2e-8, 3e-8],
  virus: [1.5e-8, 5e-7], bacterium: [2e-7, 1e-5], mitochondrion: [5e-7, 1e-5], chloroplast: [2e-6, 1e-5], nucleus: [3e-6, 2e-5], "red blood cell": [6e-6, 9e-6],
  "animal cell": [1e-5, 3e-5], "plant cell": [1e-5, 1e-4], "eukaryotic cell": [5e-6, 1.5e-4], "human egg cell": [1e-4, 1.5e-4], "electron microscope resolution": [5e-11, 2e-9],
  "light microscope resolution": [1.5e-7, 3e-7], "naked-eye resolution": [5e-5, 2e-4], organism: [1e-4, 100], "frog egg": [1e-3, 3e-3], "human": [0.5, 2.2],
};
const toM = (v, u) => { if (!(u in UNIT)) throw new Error(`unknown unit ${u}`); return v * UNIT[u]; };
const span = (it) => (it.size != null ? [toM(it.size, it.unit), toM(it.size, it.unit)] : [toM(it.from, it.unit), toM(it.to, it.unit)]);
const decade = (e) => (e >= 0 ? `${10 ** e} m` : e >= -2 ? `${10 ** (e + 2)} cm` : e === -3 ? "1 mm" : e >= -6 ? `${10 ** (e + 6)} µm` : e >= -9 ? `${10 ** (e + 9)} nm` : `${10 ** (e + 12)} pm`);
function scale(spec, W, narrow) {
  const p = new Pic(W), all = spec.items.flatMap(span), lo = Math.floor(Math.log10(Math.min(...all)) + 1e-9), hi = Math.ceil(Math.log10(Math.max(...all)) - 1e-9);
  const cols = ["a1", "a2", "a3", "a4", "a5"], items = spec.items.map((it, i) => ({ ...it, s: span(it), c: it.colour || cols[i % 5] }));
  if (!narrow) {
    const x0 = 40, x1 = W - 40, ax = 70 + items.length * 26, sx = (m) => x0 + ((Math.log10(m) - lo) / (hi - lo)) * (x1 - x0);
    p.add(line(x0, ax, x1, ax, { stroke: C.ink, w: 2 }));
    for (let e = lo; e <= hi; e++) { p.add(line(sx(10 ** e), ax - 6, sx(10 ** e), ax + 6, { stroke: C.ink, w: 1.6 })); if ((e - lo) % (hi - lo > 8 ? 2 : 1) === 0 || e === hi) p.t(sx(10 ** e), ax + 20, decade(e), { size: 12, fill: C.soft }); }
    // items as bars above the axis, one row each, label beside the bar
    items.sort((a, b) => a.s[0] - b.s[0]).forEach((it, i) => {
      const y = 30 + i * 26, a = sx(it.s[0]), b = Math.max(sx(it.s[1]), a + 6), lab = `${it.name} (${it.label || (it.size != null ? `${it.size} ${it.unit}` : `${it.from}–${it.to} ${it.unit}`)})`;
      p.add(`<rect x="${f1(a)}" y="${f1(y - 7)}" width="${f1(b - a)}" height="14" rx="5" fill="${col(it.c)}" fill-opacity=".75"/>` + line((a + b) / 2, y + 7, (a + b) / 2, ax, { stroke: col(it.c), w: 1, dash: "3 3" }));
      const right = b + 8 + textWidth(lab, 13, 600) < W - 8;
      p.t(right ? b + 8 : a - 8, y, lab, { size: 13, weight: 600, anchor: right ? "start" : "end", fill: col(it.c) });
    });
    let y = ax + 44;
    if (spec.magnification) { p.t(W / 2, y, magText(spec.magnification), { size: 13.5, weight: 600 }); y += 22; }
    return p.done(y);
  }
  const y0 = 30, y1 = 30 + Math.max(260, items.length * 46), ax = 70, sy = (m) => y1 - ((Math.log10(m) - lo) / (hi - lo)) * (y1 - y0);
  p.add(line(ax, y0, ax, y1, { stroke: C.ink, w: 2 }));
  for (let e = lo; e <= hi; e++) { p.add(line(ax - 6, sy(10 ** e), ax + 6, sy(10 ** e), { stroke: C.ink, w: 1.6 })); p.t(ax - 10, sy(10 ** e), decade(e), { size: 11.5, anchor: "end", fill: C.soft }); }
  const its = [...items].sort((a, b) => b.s[1] - a.s[1]), ys = spread(its.map((it) => sy(Math.sqrt(it.s[0] * it.s[1]))), y0, y1, 34);
  its.forEach((it, i) => {
    const a = sy(it.s[1]), b = Math.max(sy(it.s[0]), a + 6);
    p.add(`<rect x="${ax + 10}" y="${f1(a)}" width="12" height="${f1(b - a)}" rx="4" fill="${col(it.c)}" fill-opacity=".75"/>` + line(ax + 24, (a + b) / 2, ax + 40, ys[i], { stroke: col(it.c), w: 1 }));
    p.t(ax + 44, ys[i] - 8, it.name, { size: 13, weight: 700, anchor: "start", fill: col(it.c) });
    p.t(ax + 44, ys[i] + 8, it.label || (it.size != null ? `${it.size} ${it.unit}` : `${it.from}–${it.to} ${it.unit}`), { size: 12, anchor: "start" });
  });
  let y = y1 + 30;
  if (spec.magnification) for (const s of wrap(magText(spec.magnification), 44)) { p.t(W / 2, y, s, { size: 13, weight: 600 }); y += 18; }
  return p.done(y + 6);
}
const magText = (m) => `magnification = image ÷ actual = ${m.image[0]} ${m.image[1]} ÷ ${m.actual[0]} ${m.actual[1]} = ×${m.M.toLocaleString("en-GB")}`;
function scaleChecks(spec, lessonText) {
  const out = [], bad = [], unvetted = [];
  for (const it of spec.items) {
    const ref = SIZES[it.ref || it.name]; if (!ref) { unvetted.push(it.name); continue; }
    let s; try { s = span(it); } catch (e) { bad.push(e.message); continue; }
    if (s[0] < ref[0] * 0.999 || s[1] > ref[1] * 1.001) bad.push(`${it.name}: ${s.map((v) => v.toExponential(1)).join("–")} m outside ${ref.map((v) => v.toExponential(1)).join("–")} m`);
  }
  out.push(check("every item has a vetted size range", !unvetted.length, unvetted.join(", ")));
  out.push(check("every size lies inside its vetted range (units converted)", !bad.length, bad.join("; ") || `${spec.items.length} sizes`));
  if (spec.magnification) {
    const m = spec.magnification, M = toM(...m.image) / toM(...m.actual);
    out.push(check("magnification = image size ÷ actual size", Math.abs(M - m.M) / m.M < 1e-6, `${M.toPrecision(6)}`));
  }
  out.push(termCheck(spec.items.map((it) => ({ name: it.name, aka: it.aka })), lessonText, "item"));
  return [...out, ...layoutChecks(spec, scale, [720, 380])];
}

// ======================================================================== bio-phylo
// spec: tree (nested arrays of leaf names), clades: [[leaf, …]] the lesson claims are groups, closer: [[a, b, c]]
// meaning a and b share a more recent common ancestor than a and c; root label; highlight {leaf: colour}
const leaves = (t) => (Array.isArray(t) ? t.flatMap(leaves) : [t]);
const nodes = (t, acc = []) => { if (Array.isArray(t)) { acc.push(leaves(t)); t.forEach((c) => nodes(c, acc)); } return acc; };
function mrcaDepth(t, a, b, d = 0) { if (!Array.isArray(t)) return -1; for (const c of t) { const L = leaves(c); if (L.includes(a) && L.includes(b)) return mrcaDepth(c, a, b, d + 1); } return d; }
const depth = (t) => (Array.isArray(t) ? 1 + Math.max(...t.map(depth)) : 0);
function phylo(spec, W, narrow) {
  const p = new Pic(W), L = leaves(spec.tree), row = narrow ? 30 : 34, size = narrow ? 13 : 14, D = depth(spec.tree);
  const lw = Math.max(...L.map((l) => textWidth(l, size, 600))), x0 = 30, xl = W - 16 - lw - 10, top = 24;
  let k = 0; const step = (xl - x0) / D;
  const draw = (t, d) => {
    if (!Array.isArray(t)) { const y = top + k++ * row; p.t(xl + 8, y, t, { size, weight: 600, anchor: "start", fill: col(spec.highlight?.[t] || "ink") }); return { y, x: xl }; }
    const kids = t.map((c) => draw(c, d + 1)), x = x0 + d * step, y = (kids[0].y + kids.at(-1).y) / 2;
    p.add(line(x, kids[0].y, x, kids.at(-1).y, { stroke: C.ink, w: 2.2 }));
    for (const c of kids) p.add(line(x, c.y, c.x, c.y, { stroke: C.ink, w: 2.2 }));
    return { x, y };
  };
  const r = draw(spec.tree, 0);
  p.add(line(x0 - 18, r.y, x0, r.y, { stroke: C.ink, w: 2.2 }) + dot(x0, r.y, 4.5, "a2"));
  if (spec.root) p.t(x0 - 18, r.y + 18, spec.root, { size: 12, weight: 600, anchor: "start", fill: C.soft });
  const H = top + (L.length - 1) * row + (spec.root ? 40 : 24);
  if (spec.axis) p.t(W / 2, H + 4, spec.axis, { size: 12, fill: C.soft, italic: true });
  return p.done(H + (spec.axis ? 18 : 0));
}
function phyloChecks(spec, lessonText) {
  const L = leaves(spec.tree), groups = nodes(spec.tree).map((g) => [...g].sort().join("|")), out = [];
  out.push(check("every leaf appears once", new Set(L).size === L.length, L.join(", ")));
  out.push(check("every branching node has at least two descendants", (function ok(t) { return !Array.isArray(t) || (t.length >= 2 && t.every(ok)); })(spec.tree), "a node with one child"));
  for (const c of spec.clades || []) out.push(check(`${c.join(", ")} form a clade (a common ancestor and all its descendants)`, groups.includes([...c].sort().join("|"))));
  for (const [a, b, c] of spec.closer || []) out.push(check(`${a} and ${b} share a more recent common ancestor than ${a} and ${c}`, mrcaDepth(spec.tree, a, b) > mrcaDepth(spec.tree, a, c)));
  out.push(termCheck(L.map((name) => ({ name, aka: spec.aka?.[name] })), lessonText, "group in the tree"));
  return [...out, ...layoutChecks(spec, phylo, [640, 380])];
}

// ======================================================================== bio-water
// spec: compartments [{name, psiS, psiP, psi?, kind?} | {name, conc, result?}], unit ("kPa" | "mmol dm⁻³"),
//   flows [[from, to]] the stated net water movement between neighbours (both ways absent: no net movement)
const GAIN = ["swells", "bursts", "lyses", "turgid", "gains water"], LOSS = ["shrinks", "crenates", "shrivels", "plasmolysed", "loses water"], NONE = ["no net change", "unchanged", "flaccid"];
const potentialOf = (c) => (c.psiS != null ? psi(c) : -c.conc); // higher solute concentration → lower water potential
function water(spec, W, narrow) {
  const p = new Pic(W), cs = spec.compartments, n = cs.length, gapX = narrow ? 0 : 70, bw = narrow ? W - 32 : (W - 32 - gapX * (n - 1)) / n, bh = 150, gapY = narrow ? 64 : 0;
  const pos = cs.map((_, i) => (narrow ? [16, 20 + i * (bh + gapY)] : [16 + i * (bw + gapX), 20]));
  const cols = ["a1", "a4", "a3"];
  cs.forEach((c, i) => {
    const [x, y] = pos[i], k = cols[i % 3];
    p.add(rect(x, y, bw, bh, { f: k, fo: 0.07, s: k, sw: 2, r: c.cell ? 40 : 10 }));
    p.t(x + bw / 2, y + 22, c.name, { size: 14, weight: 700, fill: col(k) });
    const rows = c.psiS != null ? [`ψs = ${fmt(c.psiS)} ${spec.unit || "kPa"}`, `ψp = ${fmt(c.psiP ?? 0)} ${spec.unit || "kPa"}`, `ψ = ${fmt(psi(c))} ${spec.unit || "kPa"}`] : [`solute ${c.conc} ${spec.unit || "mmol dm⁻³"}`];
    rows.forEach((s, j) => p.t(x + bw / 2, y + 48 + j * 20, s, { size: 13, weight: j === 2 ? 700 : 500 }));
    // solute particles, more for a more concentrated solution
    const conc = c.psiS != null ? -c.psiS / 250 : c.conc / 50, m = Math.min(28, Math.round(conc));
    for (let j = 0; j < m; j++) p.add(dot(x + 16 + ((j * 37) % Math.max(10, bw - 32)), y + bh - 34 + ((j * 13) % 24), 3, k, 0.55));
    if (c.result) p.t(x + bw / 2, y + bh + (narrow ? 14 : 18), c.result, { size: 12.5, weight: 600, fill: C.soft, italic: true });
  });
  for (const [a, b] of spec.flows || []) {
    const i = cs.findIndex((c) => c.name === a), j = cs.findIndex((c) => c.name === b); if (i < 0 || j < 0) continue;
    if (!narrow) { const y = 20 + bh / 2, xa = pos[Math.min(i, j)][0] + bw + 6, xb = pos[Math.max(i, j)][0] - 6; p.add(i < j ? arrow(xa, y, xb, y, { stroke: C.ink }) : arrow(xb, y, xa, y, { stroke: C.ink })); p.t((xa + xb) / 2, y - 16, "water", { size: 12, weight: 600 }); }
    else { const x = W / 2 + 40, ya = pos[Math.min(i, j)][1] + bh + 24, yb = pos[Math.max(i, j)][1] - 6; p.add(i < j ? arrow(x, ya, x, yb, { stroke: C.ink }) : arrow(x, yb, x, ya, { stroke: C.ink })); p.t(x + 12, (ya + yb) / 2, "water", { size: 12, weight: 600, anchor: "start" }); }
  }
  const H = narrow ? 20 + n * (bh + gapY) - gapY + 30 : 20 + bh + 36;
  return p.done(H);
}
const fmt = (v) => (v < 0 ? `−${Math.abs(v).toLocaleString("en-GB")}` : v.toLocaleString("en-GB"));
function waterChecks(spec, lessonText) {
  const cs = spec.compartments, out = [], flows = spec.flows || [], byName = Object.fromEntries(cs.map((c) => [c.name, c]));
  const plant = cs.some((c) => c.psiS != null);
  if (plant) {
    out.push(check("solute potential is never positive", cs.every((c) => c.psiS <= 0)));
    out.push(check("pressure potential is not negative except in xylem", cs.every((c) => (c.psiP ?? 0) >= 0 || c.kind === "xylem")));
    const wrong = cs.filter((c) => c.psi != null && c.psi !== psi(c));
    out.push(check("ψ = ψs + ψp for every compartment", !wrong.length, wrong.map((c) => `${c.name}: stated ${c.psi}, is ${psi(c)}`).join("; ") || cs.map((c) => `${c.name} ${psi(c)}`).join(", ")));
  }
  const bad = flows.filter(([a, b]) => !(byName[a] && byName[b]) || !(potentialOf(byName[a]) > potentialOf(byName[b])));
  out.push(check(plant ? "water moves from higher to lower water potential" : "water moves towards the more concentrated solution", !bad.length, bad.map(([a, b]) => `${a} → ${b}`).join("; ")));
  const missing = []; for (let i = 0; i + 1 < cs.length; i++) { const a = cs[i], b = cs[i + 1]; if (potentialOf(a) !== potentialOf(b) && !flows.some((f) => f.includes(a.name) && f.includes(b.name))) missing.push(`${a.name}–${b.name}`); }
  out.push(check("every difference in potential has its water arrow", !missing.length, missing.join(", ")));
  for (const c of cs.filter((q) => q.result)) {
    const net = flows.reduce((s, [a, b]) => s + (b === c.name ? 1 : a === c.name ? -1 : 0), 0), r = c.result.toLowerCase();
    const ok = net > 0 ? GAIN.some((w) => r.includes(w)) : net < 0 ? LOSS.some((w) => r.includes(w)) : NONE.some((w) => r.includes(w));
    out.push(check(`${c.name}: "${c.result}" follows from its net water movement`, ok, `net ${net > 0 ? "gain" : net < 0 ? "loss" : "none"}`));
  }
  out.push(termCheck([{ name: plant ? "water potential" : "osmosis", aka: ["osmosis", "water potential"] }], lessonText, "key idea"));
  return [...out, ...layoutChecks(spec, water, [700, 380])];
}

// ======================================================================== bio-pyramid
// spec: kind "energy" | "biomass" | "numbers", unit, levels bottom first [{name, value}], efficiencies [%] stated
function pyramid(spec, W, narrow) {
  const p = new Pic(W), L = spec.levels, n = L.length, bh = narrow ? 30 : 40, logS = !!spec.log;
  const maxV = Math.max(...L.map((l) => l.value)), wmax = narrow ? W - 32 : 300, cx = narrow ? W / 2 : 16 + wmax / 2;
  const width = (v) => Math.max(36, logS ? (wmax * (Math.log10(v) + 1)) / (Math.log10(maxV) + 1) : (wmax * v) / maxV);
  const rowH = narrow ? bh + 26 : bh + 12, top = 20, cols = ["good", "a4", "a1", "a5", "a2"];
  L.forEach((l, i) => {
    const r = n - 1 - i, y = top + r * rowH + (narrow ? 20 : 0), w = width(l.value), k = cols[i % 5];
    p.add(rect(cx - w / 2, y, w, bh, { f: k, fo: 0.35, s: k, sw: 1.6, r: 4 }));
    const lab = `${l.name}: ${l.value.toLocaleString("en-GB")}${spec.unit ? ` ${spec.unit}` : ""}`;
    if (narrow) p.t(16, y - 11, lab, { size: 12.5, weight: 600, anchor: "start" });
    else p.t(16 + wmax + 20, y + bh / 2, lab, { size: 13.5, weight: 600, anchor: "start" });
    if (i > 0 && spec.efficiencies) {
      const e = `${spec.efficiencies[i - 1]}% passed up`;
      if (narrow) p.t(W - 16, y + bh + 13, e, { size: 11.5, weight: 600, anchor: "end", fill: C.soft });
      else p.t(16 + wmax + 20, y + bh + 6, `↑ ${e}`, { size: 12, weight: 600, anchor: "start", fill: C.soft });
    }
  });
  const H = top + n * rowH + (narrow ? 22 : 8);
  p.t(narrow ? W / 2 : 16 + wmax / 2, H, `pyramid of ${spec.kind}${logS ? " (bar widths on a log scale)" : " (bar widths to scale)"}`, { size: 11.5, fill: C.soft, italic: true });
  return p.done(H + 16);
}
function pyramidChecks(spec, lessonText) {
  const L = spec.levels, out = [];
  if (spec.efficiencies) {
    const bad = []; L.slice(1).forEach((l, i) => { const e = (100 * l.value) / L[i].value; if (Math.abs(e - spec.efficiencies[i]) > 0.051) bad.push(`${L[i].name} → ${l.name}: stated ${spec.efficiencies[i]}%, is ${e.toFixed(2)}%`); });
    out.push(check("every transfer efficiency = energy in the level above ÷ energy in the level below", spec.efficiencies.length === L.length - 1 && !bad.length, bad.join("; ")));
  }
  if (spec.kind === "energy") {
    out.push(check("energy falls at every level (a pyramid of energy is never inverted)", L.every((l, i) => !i || l.value < L[i - 1].value)));
    out.push(check("every transfer efficiency is ecologically plausible (0.1–30%)", L.every((l, i) => !i || ((100 * l.value) / L[i - 1].value >= 0.1 && (100 * l.value) / L[i - 1].value <= 30))));
  }
  out.push(check("kind is energy, biomass or numbers", ["energy", "biomass", "numbers"].includes(spec.kind)));
  out.push(termCheck(L.map((l) => ({ name: l.name, aka: l.aka })), lessonText, "level"));
  return [...out, ...layoutChecks(spec, pyramid, [680, 380])];
}

register({
  "bio-levels": { draw: levels, checks: levelChecks, widths: [680, 380] },
  "bio-structure": { draw: structure, checks: structureChecks, widths: [760, 380] },
  "bio-scale": { draw: scale, checks: scaleChecks, widths: [720, 380] },
  "bio-phylo": { draw: phylo, checks: phyloChecks, widths: [640, 380] },
  "bio-water": { draw: water, checks: waterChecks, widths: [700, 380] },
  "bio-pyramid": { draw: pyramid, checks: pyramidChecks, widths: [680, 380] },
});
export { levels, structure, scale, phylo, water, pyramid, levelChecks, structureChecks, scaleChecks, phyloChecks, waterChecks, pyramidChecks };
