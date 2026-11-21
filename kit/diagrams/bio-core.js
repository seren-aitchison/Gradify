// Gradify Visual Learning Engine: the biology the biology renderers recompute (kit/diagrams/bio-renderers*.js).
// Pure functions, no drawing, so tests/bio-diagrams.test.mjs can check them directly:
//   genetics   gametes, Punnett offspring, reduced ratios, dominance; pedigree consistency under each inheritance mode
//   molecular  base pairing, transcription, translation (standard codon table), mutation effects, hydrogen bonds
//   division   chromosome and chromatid counts per cell at every stage of mitosis and meiosis
//   pathways   carbon atoms conserved at every step, side products tallied against stated totals
//   ecology    trophic levels from a food web, transfer efficiencies
//   transport  water potential (ψ = ψs + ψp) and the direction water moves
//   layout     every label inside the picture and clear of the others (estimated text boxes)
import { text } from "./renderers.js";

// ---------------------------------------------------------------- text and lesson ties
export const plain = (s) => String(s ?? "").replace(/[_^]\{([^}]*)\}/g, "$1");
const norm = (s) => plain(s).toLowerCase().replace(/[*_`′’']/g, "").replace(/[‐‑–—-]/g, " ").replace(/\s+/g, " ");
/** Is a term (or one of its synonyms) named in the lesson text? Plurals and a trailing "s" are tolerated. */
export function named(term, lessonText, aka = []) {
  const t = norm(lessonText);
  return [term, ...aka].some((w) => {
    const k = norm(w).trim(); if (!k) return false;
    const stems = new Set([k, k.replace(/(es|s)$/, ""), k.replace(/ies$/, "y"), k.replace(/a$/, "on"), k.replace(/on$/, "a"), k.replace(/i$/, "us"), k.replace(/us$/, "i")]);
    if (k.length <= 3) return new RegExp(`(^|[^a-z0-9])${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z0-9]|$)`).test(t);
    return [...stems].some((x) => x.length > 2 && t.includes(x));
  });
}

// ---------------------------------------------------------------- layout: labels tracked as they are drawn
const CW = { 500: 0.55, 600: 0.58, 700: 0.6 };
export const textWidth = (s, size = 14, weight = 500) => plain(s).length * size * (CW[weight] || 0.56);
/** A drawing that remembers the box of every label it writes, so the checks can test the layout. */
export class Pic {
  constructor(W) { this.W = W; this.s = ""; this.boxes = []; }
  add(s) { this.s += s; return this; }
  t(x, y, s, o = {}) {
    const size = o.size || 14, w = textWidth(s, size, o.weight || 500), a = o.anchor || "middle";
    const x0 = a === "start" ? x : a === "end" ? x - w : x - w / 2;
    if (!o.free) this.boxes.push({ s: plain(s), x0, x1: x0 + w, y0: y - size * 0.55, y1: y + size * 0.55 });
    this.s += text(x, y, s, o);
    return w;
  }
  done(H) { return { s: this.s, H, boxes: this.boxes }; }
}
/** Labels inside the viewBox and not overprinting each other, at the wide and the narrow width. */
export function layoutChecks(spec, draw, [ww, nw]) {
  const out = [];
  for (const [W, narrow] of [[ww, false], [nw, true]]) {
    const { H, boxes = [] } = draw(spec, W, narrow), tag = narrow ? `narrow (${nw}px)` : `wide (${ww}px)`;
    const outside = boxes.filter((b) => b.x0 < -0.5 || b.x1 > W + 0.5 || b.y0 < -0.5 || b.y1 > H + 0.5);
    out.push({ name: `every label inside the picture, ${tag}`, ok: !outside.length, detail: outside.map((b) => `"${b.s}" at ${b.x0.toFixed(0)}–${b.x1.toFixed(0)}, ${b.y0.toFixed(0)}`).slice(0, 4).join("; ") });
    const clash = [];
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], b = boxes[j], ox = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0), oy = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0);
      if (ox > 1 && oy > 1) clash.push(`"${a.s}" / "${b.s}"`);
    }
    out.push({ name: `no two labels overprint, ${tag}`, ok: !clash.length, detail: clash.slice(0, 4).join("; ") });
  }
  return out;
}

// ---------------------------------------------------------------- arithmetic
export const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
/** {k: count} reduced to lowest whole-number terms. */
export function reduce(counts) {
  const g = Object.values(counts).reduce(gcd, 0) || 1;
  return Object.fromEntries(Object.entries(counts).map(([k, v]) => [k, v / g]));
}
export const sameRatio = (a, b) => { const x = reduce(a), y = reduce(b), k = new Set([...Object.keys(x), ...Object.keys(y)]); return [...k].every((q) => (x[q] || 0) === (y[q] || 0)); };
export const ratioText = (r) => Object.entries(reduce(r)).map(([k, v]) => `${v} ${k}`).join(" : ");

// ---------------------------------------------------------------- Mendelian genetics
/** "AaBb" → [["A","a"],["B","b"]]; "XHXh" / "XHY" → [["XH","Xh"]]; arrays pass through. */
export function genes(g) {
  if (Array.isArray(g)) return g.map((p) => [...p]);
  const s = String(g).replace(/\s/g, "");
  if (/^X/.test(s)) { const t = s.match(/X[A-Za-z]|Y/g) || []; if (t.join("") !== s || t.length !== 2) throw new Error(`cannot read genotype ${g}`); return [t]; }
  if (!/^([A-Za-z]{2})+$/.test(s)) throw new Error(`cannot read genotype ${g}`);
  const out = []; for (let i = 0; i < s.length; i += 2) { if (s[i].toLowerCase() !== s[i + 1].toLowerCase()) throw new Error(`alleles ${s[i]}${s[i + 1]} are not of one gene`); out.push([s[i], s[i + 1]]); }
  return out;
}
// "Y" is the Y chromosome only beside an X-linked allele (XH, Xh); otherwise it is an ordinary allele (Y yellow)
const rank = (a, xl) => (xl && a === "Y" ? 3 : /^[A-Z]/.test(xl ? a.replace(/^X/, "") : a) ? 0 : 1);
const xLinked = (al) => al.some((a) => /^X./.test(a));
export const alleleOrder = (a, b, xl = false) => rank(a, xl) - rank(b, xl) || (a < b ? -1 : a > b ? 1 : 0);
export const geneKey = (pair) => { const xl = xLinked(pair); return [...pair].sort((a, b) => alleleOrder(a, b, xl)).join(""); };
/** Every gamete (independent assortment), with repeats, so equal-probability gametes keep their weight. */
export function gametes(g) {
  return genes(g).reduce((acc, pair) => acc.flatMap((x) => pair.map((a) => [...x, a])), [[]]);
}
/** Offspring of a cross: the grid (rows = parent 1's gametes), genotype counts and phenotype counts. */
export function cross(p1, p2, phenotypes) {
  const g1 = gametes(p1), g2 = gametes(p2), nG = genes(p1).length;
  if (genes(p2).length !== nG) throw new Error("the parents differ in the number of genes");
  const maps = Array.isArray(phenotypes) ? phenotypes : [phenotypes];
  const geno = {}, pheno = {}, grid = [];
  for (const a of g1) {
    const row = [];
    for (const b of g2) {
      const pairs = a.map((x, i) => [x, b[i]]), key = pairs.map(geneKey).join("");
      const ph = maps.length && maps[0] ? pairs.map((p, i) => { const m = maps[i] || {}, k = geneKey(p); if (!(k in m)) throw new Error(`no phenotype given for ${k}`); return m[k]; }).join(", ") : key;
      geno[key] = (geno[key] || 0) + 1; pheno[ph] = (pheno[ph] || 0) + 1;
      row.push({ key, ph });
    }
    grid.push(row);
  }
  return { g1, g2, grid, geno, pheno };
}
/** Does a gene's phenotype table show the stated dominance between its alleles? Returns a list of problems. */
export function dominanceProblems(map, mode, alleles) {
  const xl = xLinked(alleles), bad = [], al = [...new Set(alleles)].filter((a) => !(xl && a === "Y")).sort((a, b) => alleleOrder(a, b, xl));
  for (let i = 0; i < al.length; i++) for (let j = i + 1; j < al.length; j++) {
    const k = geneKey([al[i], al[j]]), h1 = geneKey([al[i], al[i]]), h2 = geneKey([al[j], al[j]]);
    const p = map[k], a = map[h1], b = map[h2];
    const m = typeof mode === "string" ? mode : mode?.[k];
    if (p == null || !m) continue;
    if (m === "complete" && a != null && p !== a) bad.push(`${k} should look like ${h1} (${a}), not ${p}`);
    if ((m === "incomplete" || m === "codominant") && ((a != null && p === a) || (b != null && p === b))) bad.push(`${k} (${p}) should differ from both homozygotes`);
  }
  return bad;
}

// ---------------------------------------------------------------- pedigrees
export const MODES = ["autosomal dominant", "autosomal recessive", "X-linked dominant", "X-linked recessive"];
/**
 * Every assignment of disease-allele counts consistent with a pedigree under one mode (complete penetrance, no new
 * mutations). people: [{id, sex: "m"|"f", affected, carrier?, parents?: [a, b]}], parents listed before children.
 * Returns {ok, possible: {id: Set(counts)}, solutions}.
 */
export function pedigreeSolve(people, mode, { limit = 200000 } = {}) {
  const X = mode.startsWith("X"), dom = mode.endsWith("dominant"), byId = Object.fromEntries(people.map((p) => [p.id, p]));
  const ploidy = (p) => (X && p.sex === "m" ? 1 : 2);
  const affected = (p, c) => (dom ? c >= 1 : c === ploidy(p));
  const allowed = (p) => [0, 1, 2].filter((c) => c <= ploidy(p) && affected(p, c) === !!p.affected && (!p.carrier || (c === 1 && ploidy(p) === 2 && !p.affected)));
  const passes = (p, c) => (ploidy(p) === 1 ? [c] : c === 0 ? [0] : c === 2 ? [1] : [0, 1]);
  const fromParents = (child, a, b) => {
    const [mo, fa] = a.sex === "f" ? [a, b] : [b, a], res = new Set();
    if (X && child.sex === "m") { for (const m of passes(mo, G[mo.id])) res.add(m); return res; }
    if (X) { for (const m of passes(mo, G[mo.id])) res.add(m + G[fa.id]); return res; }
    for (const m of passes(a, G[a.id])) for (const f of passes(b, G[b.id])) res.add(m + f);
    return res;
  };
  const G = {}, possible = Object.fromEntries(people.map((p) => [p.id, new Set()]));
  let solutions = 0;
  const go = (i) => {
    if (solutions >= limit) return;
    if (i === people.length) { solutions++; for (const p of people) possible[p.id].add(G[p.id]); return; }
    const p = people[i];
    let opts = allowed(p);
    if (p.parents) {
      const [a, b] = p.parents.map((q) => byId[q]);
      if (!a || !b || !(a.id in G) || !(b.id in G)) throw new Error(`${p.id}: parents must be listed first`);
      if (X && a.sex === b.sex) throw new Error(`${p.id}: parents must be a male and a female`);
      const can = fromParents(p, a, b); opts = opts.filter((c) => can.has(c));
    }
    for (const c of opts) { G[p.id] = c; go(i + 1); }
    delete G[p.id];
  };
  go(0);
  return { ok: solutions > 0, possible, solutions };
}
/** "Aa", "XAXa", "XaY" → number of disease alleles (lower case in recessive modes, capital in dominant ones). */
export function diseaseCount(g, mode) {
  const s = String(g).replace(/[XY]/g, ""), dom = mode.endsWith("dominant");
  return [...s].filter((c) => (dom ? c === c.toUpperCase() : c === c.toLowerCase())).length;
}

// ---------------------------------------------------------------- DNA, RNA and protein
const PAIR = { A: "T", T: "A", G: "C", C: "G", U: "A" };
export const complement = (dna) => [...dna.toUpperCase()].map((b) => { if (!PAIR[b] || b === "U") throw new Error(`not a DNA base: ${b}`); return PAIR[b]; }).join("");
export const transcribe = (coding) => coding.toUpperCase().replace(/T/g, "U");
const AA = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG";
export const THREE = { A: "Ala", R: "Arg", N: "Asn", D: "Asp", C: "Cys", Q: "Gln", E: "Glu", G: "Gly", H: "His", I: "Ile", L: "Leu", K: "Lys", M: "Met", F: "Phe", P: "Pro", S: "Ser", T: "Thr", W: "Trp", Y: "Tyr", V: "Val", "*": "Stop" };
export function codon(c) {
  const i = [...c.toUpperCase().replace(/T/g, "U")].map((b) => "UCAG".indexOf(b));
  if (i.length !== 3 || i.some((x) => x < 0)) throw new Error(`not a codon: ${c}`);
  return THREE[AA[i[0] * 16 + i[1] * 4 + i[2]]];
}
/** mRNA → amino acids (three-letter), reading from the first base, stopping at (and including) a stop codon. */
export function translate(mrna) {
  const out = [];
  for (let i = 0; i + 3 <= mrna.length; i += 3) { const a = codon(mrna.slice(i, i + 3)); out.push(a); if (a === "Stop") break; }
  return out;
}
export const hBonds = (dna) => [...dna.toUpperCase()].reduce((n, b) => n + (b === "G" || b === "C" ? 3 : 2), 0);
/** Effect of a change from one coding sequence to another: silent, missense, nonsense or frameshift. */
export function mutationEffect(before, after) {
  if ((after.length - before.length) % 3) return "frameshift";
  const a = translate(transcribe(before)), b = translate(transcribe(after));
  if (a.join() === b.join()) return "silent";
  const i = a.findIndex((x, k) => x !== b[k]);
  return b[i] === "Stop" ? "nonsense" : "missense";
}

// ---------------------------------------------------------------- cell division
// per cell (or per new nucleus, for telophase): chromosomes and chromatids, in units of the haploid number n
const DIV = {
  mitosis: { "interphase (G1)": [2, 2, 1], "interphase (G2)": [2, 4, 1], prophase: [2, 4, 1], metaphase: [2, 4, 1], anaphase: [4, 4, 1], telophase: [2, 2, 2], "daughter cells": [2, 2, 2] },
  meiosis: { "interphase (G1)": [2, 2, 1], "interphase (G2)": [2, 4, 1], "prophase I": [2, 4, 1], "metaphase I": [2, 4, 1], "anaphase I": [2, 4, 1], "telophase I": [1, 2, 2], "prophase II": [1, 2, 1], "metaphase II": [1, 2, 1], "anaphase II": [2, 2, 1], "telophase II": [1, 1, 2], gametes: [1, 1, 4] },
};
export const DIVISION_STAGES = Object.fromEntries(Object.entries(DIV).map(([k, v]) => [k, Object.keys(v)]));
/** {chromosomes, chromatids, nuclei} expected per cell (per nucleus at telophase) for a diploid number 2n. */
export function stageCounts(process, stage, diploid) {
  const t = DIV[process]?.[stage]; if (!t) throw new Error(`no stage "${stage}" in ${process}`);
  const n = diploid / 2; return { chromosomes: t[0] * n, chromatids: t[1] * n, nuclei: t[2] };
}

// ---------------------------------------------------------------- metabolic pathways
// carbon atoms in the side species a pathway step takes in or gives out (the carriers are counted as 0: their carbon
// skeleton is not part of the substrate being followed)
export const CARBON = {
  CO2: 1, "acetyl CoA": 2, "acetyl-CoA": 2, glucose: 6, pyruvate: 3, TP: 3, "triose phosphate": 3, GALP: 3, GP: 3, ethanol: 2, lactate: 3,
  ATP: 0, ADP: 0, Pi: 0, GTP: 0, GDP: 0, "NAD+": 0, NADH: 0, "reduced NAD": 0, "NADP+": 0, NADPH: 0, "reduced NADP": 0, FAD: 0, FADH2: 0, "reduced FAD": 0,
  H2O: 0, O2: 0, "H+": 0, "e-": 0, CoA: 0, H: 0,
};
/** Carbon balance at every step and the net (out − in) of every side species, for one pass of the pathway. */
export function pathwayTally(steps, cycle) {
  const net = {}, problems = [], carbon = steps.every((s) => s.carbons != null);
  const n = cycle ? steps.length : steps.length - 1;
  for (let i = 0; i < n; i++) {
    const a = steps[i], b = steps[(i + 1) % steps.length], ins = a.in || {}, outs = a.out || {};
    for (const [k, v] of Object.entries(ins)) net[k] = (net[k] || 0) - v;
    for (const [k, v] of Object.entries(outs)) net[k] = (net[k] || 0) + v;
    if (!carbon) continue;
    const side = (o) => Object.entries(o).reduce((c, [k, v]) => { if (!(k in CARBON)) { problems.push(`carbon in ${k} unknown`); return c; } return c + CARBON[k] * v; }, 0);
    const left = a.carbons * (a.n || 1) + side(ins), right = b.carbons * (b.n || 1) + side(outs);
    if (left !== right) problems.push(`${a.n || 1} × ${a.name} (${a.carbons}C) → ${b.n || 1} × ${b.name} (${b.carbons}C): ${left} C in, ${right} C out`);
  }
  return { net, problems: [...new Set(problems)], carbon };
}

// ---------------------------------------------------------------- ecology
/** Trophic levels of every organism: producers 1, others 1 + the levels of what they eat (min and max). */
export function trophicLevels(organisms, eats) {
  const prey = Object.fromEntries(organisms.map((o) => [o.name, []]));
  for (const [pred, py] of eats) { if (!(pred in prey) || !(py in prey)) throw new Error(`unknown organism in ${pred} eats ${py}`); prey[pred].push(py); }
  const memo = {}, stack = new Set();
  const lv = (n) => {
    if (memo[n]) return memo[n];
    if (stack.has(n)) throw new Error(`feeding loop through ${n}`);
    stack.add(n);
    const r = prey[n].length ? prey[n].map(lv).reduce((a, b) => [Math.min(a[0], b[0] + 1), Math.max(a[1], b[1] + 1)], [Infinity, -Infinity]) : [1, 1];
    stack.delete(n); return (memo[n] = r);
  };
  return Object.fromEntries(organisms.map((o) => [o.name, lv(o.name)]));
}
export const efficiency = (from, to) => (100 * to) / from;

// ---------------------------------------------------------------- water potential
export const psi = (c) => (c.psiS ?? 0) + (c.psiP ?? 0);
/** Net water movement between two compartments: "a→b", "b→a" or "none". */
export const waterFlow = (a, b) => (psi(a) > psi(b) ? "a→b" : psi(a) < psi(b) ? "b→a" : "none");
