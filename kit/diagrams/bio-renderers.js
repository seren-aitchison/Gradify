// Biology renderers for the Gradify Visual Learning Engine (see kit/diagrams/BUILDERS.md). Each recomputes the biology
// it draws, so a spec that claims something false fails its checks:
//   cross      a genetic cross as a Punnett square: gametes, offspring genotypes and phenotype ratios are computed
//   strand     DNA → template → mRNA → protein: base pairing, translation with the standard genetic code, mutations
//   pyramid    a pyramid of energy, biomass or numbers: energy falls at every level, transfer efficiencies recomputed
//   pedigree   a family tree: which modes of inheritance are consistent, found by searching for genotypes that fit
//   cellmap    a labelled cell: every labelled structure belongs to that kind of cell, and stated absences are true
//   membrane   transport across a membrane: passive movement only down a gradient, active transport uses ATP,
//              co-transport is paid for by another gradient, a pump's charges add up
//   tonicity   cells in solutions: water moves to the lower water potential, and the cell swells, bursts, crenates,
//              becomes turgid or flaccid, or plasmolyses accordingly
//   route      a path through the endomembrane system (drawn as a flow): every step is one cargo really takes
//   lineage    stem cell to specialised cell (drawn as a flow): potencies as classified, never widening
//   envelope   Gram-positive and Gram-negative walls to scale: thickness, outer membrane and the stain agree
//   codontable the standard genetic code: 64 codons, 61 sense, 3 stop, start AUG, degeneracy claims
//   density    Meselson–Stahl density bands: each copying model's bands are worked out and compared with what was seen
//   crossover  a crossover between linked genes: which chromatids are parental and which recombinant
//   ploidy     mitosis and meiosis from one parent cell: the chromosomes in every product are worked out
//   layers     the three germ layers and what each becomes, each tissue checked against the layer it comes from
//   drift      genetic drift from a seeded Wright–Fisher simulation, its spread checked against theory
//   carbonflow a pathway or cycle (drawn as a flow) whose carbon atoms balance at every step
//   sarcomere  relaxed and contracted sarcomeres: band lengths worked out from the filament lengths
//   cladogram  an evolutionary tree with the characters that define its clades, each character on one branch (parsimony)
// Generic biology pictures (graphs, pathways, cycles, bar charts, keys) use the shared graph, flow, trend and
// decision-tree renderers instead.
import { register, RENDERERS, text, line, arrow, wrap, textBlock, f1, esc, check, COLOURS as C } from "./renderers.js";

const TONES = ["a1", "a4", "a3", "a2", "a5"];
const tone = (i) => C[TONES[i % TONES.length]];
const tw = (s, size) => String(s).replace(/[_^]\{([^}]*)\}/g, "$1").length * size * 0.56; // estimated text width
const rect = (x, y, w, h, { fill = C.panel, stroke = C.line, sw = 1.6, rx = 8, op = 1 } = {}) =>
  `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${rx}" fill="${fill}" fill-opacity="${op}" stroke="${stroke}" stroke-width="${sw}"/>`;
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
function reduce(counts) {
  const vs = Object.values(counts).filter((v) => v > 0), g = vs.reduce((a, b) => gcd(a, b), vs[0] || 1);
  return Object.fromEntries(Object.entries(counts).filter(([, v]) => v > 0).map(([k, v]) => [k, v / g]));
}
const sameRatio = (a, b) => { const x = reduce(a), y = reduce(b), ks = new Set([...Object.keys(x), ...Object.keys(y)]); return [...ks].every((k) => x[k] === y[k]); };
const ratioText = (r) => Object.entries(reduce(r)).map(([k, v]) => `${v} ${k}`).join(" : ");

// ======================================================================== cross
// spec: loci: [{alleles: ["T", "t"], dominance: {kind: "complete", dominant: "T", traits: ["tall", "short"]}
//                 | {kind: "map", map: {"Iᴬ Iᴮ": "group AB", …}} | {kind: "sexlinked", disease: "Xʰ", recessive: true, trait}}],
//   parents: [{genotype: ["T t", …], label}, {…}] (one "a b" pair per locus; the first parent's gametes go across the top),
//   claims: [{type: "genotypes", ratio: {TT: 1, Tt: 2, tt: 1}} | {type: "phenotypes", ratio: {tall: 3, short: 1}}
//            | {type: "probability", phenotype | genotype, value}]
export function gametes(genotype) {
  let out = [[]];
  for (const pair of genotype) { const [a, b] = pair.split(" "); const next = []; for (const g of out) for (const x of [...new Set([a, b])]) next.push([...g, x]); out = next; }
  // a heterozygote at every locus gives each gamete type equally often; homozygous loci collapse
  return out;
}
const canon = (locus, a, b) => { const i = (x) => { const k = locus.alleles.indexOf(x); return k < 0 ? 99 : k; }; return i(a) <= i(b) ? [a, b] : [b, a]; };
export function phenotypeOf(locus, a, b) {
  const d = locus.dominance || {};
  const [p, q] = canon(locus, a, b);
  if (d.kind === "map") return d.map[`${p} ${q}`] ?? d.map[`${q} ${p}`] ?? "?";
  if (d.kind === "sexlinked") {
    const male = p === "Y" || q === "Y", xs = [p, q].filter((x) => x !== "Y"), n = xs.filter((x) => x === d.disease).length;
    const affected = male ? n === 1 : d.recessive ? n === 2 : n >= 1;
    if (male) return affected ? `${d.trait} male` : "unaffected male";
    return affected ? `${d.trait} female` : n ? "carrier female" : "unaffected female";
  }
  return [p, q].includes(d.dominant) ? d.traits[0] : d.traits[1];
}
export function crossOf(spec) {
  const [g1, g2] = spec.parents.map((p) => gametes(p.genotype));
  const cells = g2.map((b) => g1.map((a) => spec.loci.map((L, i) => canon(L, a[i], b[i]))));
  const geno = {}, pheno = {};
  for (const row of cells) for (const c of row) {
    const gk = c.map(([x, y]) => x + y).join(""), pk = c.map(([x, y], i) => phenotypeOf(spec.loci[i], x, y)).join(", ");
    geno[gk] = (geno[gk] || 0) + 1; pheno[pk] = (pheno[pk] || 0) + 1;
  }
  return { g1, g2, cells, geno, pheno, total: g1.length * g2.length };
}
function crossDraw(spec, W, narrow) {
  const X = crossOf(spec), n1 = X.g1.length, n2 = X.g2.length, phen = Object.keys(X.pheno);
  const cs = Math.min(narrow ? 78 : 92, Math.floor((W - 30) / (n1 + 1))), gx = (W - cs * (n1 + 1)) / 2;
  const size = n1 > 2 ? (narrow ? 12.5 : 14) : 16;
  let s = "", y = 22;
  const head = spec.parents.map((p) => `${p.genotype.map((g) => g.replace(" ", "")).join("")}${p.label ? ` (${p.label})` : ""}`);
  if (narrow || tw(head.join(" × "), 15) > W - 30) {
    s += text(W / 2, y, `${head[0]} ×`, { size: 14.5, weight: 700 }); y += 22; s += text(W / 2, y, head[1], { size: 14.5, weight: 700 }); y += 14;
  } else { s += text(W / 2, y, head.join(" × "), { size: 15, weight: 700 }); y += 14; }
  y += 12;
  s += text(gx + cs / 2, y + cs / 2, "gametes", { size: 11.5, fill: C.soft });
  X.g1.forEach((g, i) => { s += rect(gx + (i + 1) * cs + 3, y + 3, cs - 6, cs - 6, { fill: C.panel, stroke: C.a1 }) + text(gx + (i + 1.5) * cs, y + cs / 2, g.join(""), { size: size + 1, weight: 700, fill: C.a1 }); });
  X.g2.forEach((g, j) => { s += rect(gx + 3, y + (j + 1) * cs + 3, cs - 6, cs - 6, { fill: C.panel, stroke: C.a2 }) + text(gx + cs / 2, y + (j + 1.5) * cs, g.join(""), { size: size + 1, weight: 700, fill: C.a2 }); });
  X.cells.forEach((row, j) => row.forEach((c, i) => {
    const pk = c.map(([a, b], k) => phenotypeOf(spec.loci[k], a, b)).join(", "), t = tone(phen.indexOf(pk));
    s += rect(gx + (i + 1) * cs + 3, y + (j + 1) * cs + 3, cs - 6, cs - 6, { fill: t, op: 0.14, stroke: t, sw: 1.4 }) + text(gx + (i + 1.5) * cs, y + (j + 1.5) * cs, c.map(([a, b]) => a + b).join(""), { size, weight: 600 });
  }));
  y += (n2 + 1) * cs + 20;
  // the key: each phenotype's colour, count and fraction, computed from the grid
  const keys = phen.map((p, i) => [p, X.pheno[p], i]);
  for (const [p, k, i] of keys) {
    const lab = `${p}: ${k} of ${X.total}`, ls = wrap(lab, Math.floor((W - 60) / 7.4));
    s += rect(24, y - 8, 16, 16, { fill: tone(i), op: 0.3, stroke: tone(i), rx: 4 });
    ls.forEach((l, li) => { s += text(48, y + li * 18, l, { size: 13.5, anchor: "start" }); });
    y += ls.length * 18 + 6;
  }
  const rt = `ratio ${Object.values(reduce(X.pheno)).join(" : ")}`;
  s += text(24, y + 6, rt, { size: 13.5, weight: 700, anchor: "start", fill: C.soft });
  return { s, H: y + 24 };
}
function crossChecks(spec) {
  const out = [], X = crossOf(spec);
  for (const [i, L] of spec.loci.entries()) for (const p of spec.parents) { const [a, b] = p.genotype[i].split(" "); out.push(check(`parent ${p.genotype.join(" ")}: alleles ${a} and ${b} are alleles of this gene`, L.alleles.includes(a) && L.alleles.includes(b))); }
  out.push(check(`each parent's gametes: ${X.g1.map((g) => g.join("")).join(", ")} and ${X.g2.map((g) => g.join("")).join(", ")}`, X.g1.length && X.g2.length));
  for (const c of spec.claims || []) {
    if (c.type === "genotypes") out.push(check(`genotype ratio ${ratioText(c.ratio)}`, sameRatio(X.geno, c.ratio), ratioText(X.geno)));
    if (c.type === "phenotypes") out.push(check(`phenotype ratio ${ratioText(c.ratio)}`, sameRatio(X.pheno, c.ratio), ratioText(X.pheno)));
    if (c.type === "probability") {
      const k = c.phenotype ?? c.genotype, pool = c.phenotype ? X.pheno : X.geno, p = (pool[k] || 0) / X.total;
      out.push(check(`P(${k}) = ${c.value}`, Math.abs(p - c.value) < 1e-9, `${pool[k] || 0} of ${X.total}`));
    }
  }
  if (!(spec.claims || []).length) out.push(check("the spec states the ratio it teaches", false, "add a genotypes or phenotypes claim"));
  return out;
}

// ======================================================================== strand
// spec: coding: "ATG…" (5′→3′ coding strand, a multiple of three), rows: ["coding", "template", "mrna", "protein"],
//   mutant: {coding} (drawn underneath, changed bases marked), claims: [{type: "protein", value: ["Met", …]}
//   | {type: "template", value} | {type: "mrna", value} | {type: "mutation", kind: "silent" | "missense" | "nonsense"
//   | "frameshift"} | {type: "count", base, value} | {type: "hbonds", value}]
const CODE = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG", ORDERB = "UCAG";
const THREE = { F: "Phe", L: "Leu", S: "Ser", Y: "Tyr", C: "Cys", W: "Trp", P: "Pro", H: "His", Q: "Gln", R: "Arg", I: "Ile", M: "Met", T: "Thr", N: "Asn", K: "Lys", V: "Val", A: "Ala", D: "Asp", E: "Glu", G: "Gly", "*": "Stop" };
export const complement = (dna) => dna.replace(/[ATGC]/g, (b) => ({ A: "T", T: "A", G: "C", C: "G" })[b]);
export const transcribe = (coding) => coding.replace(/T/g, "U");
export function codonToAA(c) { const i = 16 * ORDERB.indexOf(c[0]) + 4 * ORDERB.indexOf(c[1]) + ORDERB.indexOf(c[2]); return THREE[CODE[i]]; }
export function translate(mrna) {
  const out = [];
  for (let i = 0; i + 3 <= mrna.length; i += 3) { const aa = codonToAA(mrna.slice(i, i + 3)); out.push(aa); if (aa === "Stop") break; }
  return out;
}
export function mutationKind(a, b) {
  if (a.length !== b.length) return (a.length - b.length) % 3 ? "frameshift" : "in-frame indel";
  const pa = translate(transcribe(a)), pb = translate(transcribe(b));
  if (pa.join() === pb.join()) return "silent";
  const k = pa.findIndex((x, i) => x !== pb[i]);
  return pb[k] === "Stop" ? "nonsense" : "missense";
}
const BASE_TONE = { A: "a1", T: "a2", U: "a2", G: "a4", C: "a3" };
function strandBlock(seq, rows, y, W, narrow, opts = {}) {
  const bw = narrow ? 24 : 27, gap = 6, labW = narrow ? 0 : 142, perRow = Math.max(1, Math.floor((W - 24 - labW) / (3 * bw + gap)));
  const codons = seq.length / 3, lines = Math.ceil(codons / perRow), rowH = narrow ? 48 : 34, mrna = transcribe(seq), tmpl = complement(seq), prot = translate(mrna);
  const NAME = { coding: "DNA coding 5′→3′", template: "DNA template 3′→5′", mrna: "mRNA 5′→3′", protein: "polypeptide" };
  let s = "";
  for (let L = 0; L < lines; L++) {
    const c0 = L * perRow, c1 = Math.min(codons, c0 + perRow), x0 = 12 + labW;
    rows.forEach((r, ri) => {
      const ry = y + ri * rowH;
      if (narrow) { if (ri === 0 && L === 0) {} }
      if (!narrow) s += text(12, ry + 13, NAME[r], { size: 12.5, weight: 600, anchor: "start", fill: C.soft });
      else s += text(12, ry - 2, NAME[r], { size: 11, weight: 600, anchor: "start", fill: C.soft });
      for (let c = c0; c < c1; c++) {
        const cx = x0 + (c - c0) * (3 * bw + gap);
        if (r === "protein") {
          const aa = prot[c]; if (aa == null) continue;
          s += rect(cx + 1, ry + (narrow ? 4 : 0), 3 * bw - 2, 26, { fill: aa === "Stop" ? C.bad : C.a5, op: 0.14, stroke: aa === "Stop" ? C.bad : C.a5, rx: 13 }) + text(cx + 1.5 * bw, ry + (narrow ? 17 : 13), aa, { size: 13, weight: 700, fill: aa === "Stop" ? C.bad : C.ink });
          continue;
        }
        const str = r === "coding" ? seq : r === "template" ? tmpl : mrna;
        for (let k = 0; k < 3; k++) {
          const i = c * 3 + k, b = str[i], bx = cx + k * bw, by = ry + (narrow ? 4 : 0), changed = opts.changed?.has(i) && r === "coding";
          s += rect(bx + 1.5, by, bw - 3, 26, { fill: C[BASE_TONE[b]], op: 0.15, stroke: changed ? C.bad : C[BASE_TONE[b]], sw: changed ? 2.6 : 1.3, rx: 5 }) + text(bx + bw / 2, by + 13, b, { size: 14, weight: 700 });
        }
      }
      // hydrogen bonds between the two DNA strands: two for A–T, three for G–C
      if (r === "template" && rows[ri - 1] === "coding") for (let i = c0 * 3; i < c1 * 3; i++) {
        const bx = x0 + Math.floor((i - c0 * 3) / 3) * (3 * bw + gap) + ((i - c0 * 3) % 3) * bw + bw / 2, n = /[GC]/.test(seq[i]) ? 3 : 2;
        for (let h = 0; h < n; h++) s += line(bx + (h - (n - 1) / 2) * 5, ry + (narrow ? -18 : -7), bx + (h - (n - 1) / 2) * 5, ry + (narrow ? -10 : -1), { stroke: C.soft, w: 1.4, dash: "2 2", cap: "butt" });
      }
    });
    y += rows.length * rowH + 18;
  }
  return { s, y };
}
function strandDraw(spec, W, narrow) {
  const rows = spec.rows || ["coding", "template", "mrna", "protein"];
  let { s, y } = strandBlock(spec.coding, rows, narrow ? 26 : 14, W, narrow);
  if (spec.mutant) {
    const a = spec.coding, b = spec.mutant.coding, changed = new Set([...b].map((x, i) => (x !== a[i] ? i : -1)).filter((i) => i >= 0));
    const kind = mutationKind(a, b);
    s += line(12, y - 6, W - 12, y - 6, { stroke: C.grid, w: 1.5 });
    s += text(12, y + 14, `${spec.mutant.label || "after the mutation"}: ${kind}`, { size: 14, weight: 700, anchor: "start", fill: C.bad });
    const r2 = strandBlock(b.slice(0, b.length - (b.length % 3)), spec.mutant.rows || ["coding", "protein"], y + (narrow ? 50 : 32), W, narrow, { changed });
    s += r2.s; y = r2.y;
  }
  return { s, H: y };
}
function strandChecks(spec) {
  const out = [], a = spec.coding;
  out.push(check("the coding strand is DNA (A, T, G, C) in whole codons", /^[ATGC]+$/.test(a) && a.length % 3 === 0, `${a.length} bases`));
  const tmpl = complement(a), mrna = transcribe(a), prot = translate(mrna);
  out.push(check("every base pairs with its complement (A–T, G–C)", [...a].every((b, i) => ({ A: "T", T: "A", G: "C", C: "G" })[b] === tmpl[i])));
  for (const c of spec.claims || []) {
    if (c.type === "protein") out.push(check(`translation gives ${c.value.join("–")}`, prot.join() === c.value.join(), prot.join("–")));
    if (c.type === "template") out.push(check(`template strand ${c.value}`, tmpl === c.value, tmpl));
    if (c.type === "mrna") out.push(check(`mRNA ${c.value}`, mrna === c.value, mrna));
    if (c.type === "mutation") out.push(check(`the mutation is ${c.kind}`, mutationKind(a, spec.mutant.coding) === c.kind, mutationKind(a, spec.mutant.coding)));
    if (c.type === "count") { const n = [...(c.strand === "both" ? a + tmpl : a)].filter((x) => x === c.base).length; out.push(check(`${c.base} appears ${c.value} times`, n === c.value, `${n}`)); }
    if (c.type === "hbonds") { const n = [...a].reduce((t, b) => t + (/[GC]/.test(b) ? 3 : 2), 0); out.push(check(`${c.value} hydrogen bonds hold the strands together`, n === c.value, `${n}`)); }
  }
  return out;
}

// ======================================================================== pyramid
// spec: kind: "energy" | "biomass" | "numbers", unit, scale: "log" | "linear",
//   levels: [{label, value, sub}] from the producers up, claims: [{type: "efficiency", from, to, value, tol}
//   | {type: "inverted", level} (a level larger than the one below it, as in a pyramid of numbers on one tree)]
const fmtN = (v) => (Math.abs(v) >= 10000 ? Math.round(v).toLocaleString("en-GB").replace(/,/g, " ") : String(+(+v).toPrecision(3)));
const eff = (spec, a, b) => (100 * spec.levels[b].value) / spec.levels[a].value;
function pyramidDraw(spec, W, narrow) {
  const L = spec.levels, n = L.length, vs = L.map((l) => l.value), log = spec.scale === "log";
  const lo = log ? Math.log10(Math.min(...vs)) - 0.6 : 0, hi = log ? Math.log10(Math.max(...vs)) : Math.max(...vs);
  const maxW = narrow ? W - 40 : Math.min(360, W * 0.5), minW = 34;
  const wOf = (v) => minW + (maxW - minW) * (log ? (Math.log10(v) - lo) / (hi - lo) : v / hi);
  let s = "";
  if (!narrow) {
    const bh = 46, cx = 130 + maxW / 2, top = 20, labX = cx + maxW / 2 + 22;
    L.forEach((l, i) => {
      const y = top + (n - 1 - i) * bh, w = wOf(l.value);
      s += rect(cx - w / 2, y, w, bh - 6, { fill: tone(i), op: 0.22, stroke: tone(i), rx: 6 });
      s += text(labX, y + 12, l.label, { size: 14, weight: 700, anchor: "start" });
      s += text(labX, y + 30, `${l.sub ? `${l.sub}: ` : ""}${fmtN(l.value)} ${spec.unit}`, { size: 12.5, anchor: "start", fill: C.soft });
      if (i > 0 && spec.kind === "energy") s += text(118, y + bh - 3, `${f1(eff(spec, i - 1, i))}%`, { size: 13, weight: 700, anchor: "end", fill: C.a2 }) + arrow(124, y + bh + 8, 124, y + bh - 16, { stroke: C.a2, w: 1.6, head: 7 });
    });
    if (spec.kind === "energy") s += text(118, top + n * bh + 12, "passed on", { size: 11.5, anchor: "end", fill: C.soft });
    return { s, H: top + n * bh + 26 };
  }
  // phone: each level's name above its bar, the transfer efficiency in the gap between levels
  let y = 16;
  for (let i = n - 1; i >= 0; i--) {
    const l = L[i], w = wOf(l.value);
    s += text(20, y + 6, l.label, { size: 13.5, weight: 700, anchor: "start" });
    s += text(20, y + 24, `${l.sub ? `${l.sub}: ` : ""}${fmtN(l.value)} ${spec.unit}`, { size: 12, anchor: "start", fill: C.soft });
    s += rect(W / 2 - w / 2, y + 34, w, 26, { fill: tone(i), op: 0.22, stroke: tone(i), rx: 6 });
    y += 64;
    if (i > 0 && spec.kind === "energy") { s += text(W / 2, y + 8, `↑ ${f1(eff(spec, i - 1, i))}% passed on`, { size: 12.5, weight: 700, fill: C.a2 }); y += 22; }
  }
  return { s, H: y + 6 };
}
function pyramidChecks(spec) {
  const out = [], L = spec.levels;
  out.push(check("every level has a positive value", L.every((l) => l.value > 0)));
  if (spec.kind === "energy") out.push(check("energy falls at every level (some is lost as heat at each transfer)", L.every((l, i) => !i || l.value < L[i - 1].value), L.map((l) => fmtN(l.value)).join(" → ")));
  for (const c of spec.claims || []) {
    if (c.type === "efficiency") { const e = eff(spec, c.from, c.to); out.push(check(`${L[c.from].label} → ${L[c.to].label}: ${c.value}% transferred`, Math.abs(e - c.value) <= (c.tol ?? 0.5), `${e.toFixed(2)}%`)); }
    if (c.type === "inverted") out.push(check(`${L[c.level].label} is larger than the level below`, L[c.level].value > L[c.level - 1].value));
  }
  return out;
}

// ======================================================================== pedigree
// spec: people: [{id: "II-3", sex: "m" | "f", affected, gen: 2, x: 3, parents: ["I-1", "I-2"]}] (x is a column;
//   partners sit side by side), claims: [{type: "consistent" | "excluded", mode: "AR" | "AD" | "XR" | "XD"}
//   | {type: "genotype", id, mode, value}] (the genotype is forced in every assignment that fits)
const MODES = { AR: "autosomal recessive", AD: "autosomal dominant", XR: "X-linked recessive", XD: "X-linked dominant" };
function genotypesFor(mode, sex) { return mode[0] === "A" ? ["AA", "Aa", "aa"] : sex === "f" ? ["XᴬXᴬ", "XᴬXᵃ", "XᵃXᵃ"] : ["XᴬY", "XᵃY"]; }
function affectedBy(mode, g) {
  const a = (g.match(/a|ᵃ/g) || []).length, A = (g.match(/A|ᴬ/g) || []).length;
  if (mode === "AR") return a === 2; if (mode === "AD") return A >= 1;
  const male = g.endsWith("Y");
  if (mode === "XR") return male ? a === 1 : a === 2; return A >= 1; // XD: the disease allele is ᴬ
}
// for the dominant modes the capital letter is the disease allele, so swap the reading: AD affected = has A
const allelesOf = (g) => (g.startsWith("X") ? g.match(/X[ᴬᵃ]|Y/g) : g.split(""));
function canParent(child, mum, dad) {
  const c = allelesOf(child), m = allelesOf(mum), d = allelesOf(dad);
  if (child.startsWith("X")) {
    if (child.endsWith("Y")) return m.includes(c[0]) && d.includes("Y");
    const fromDad = d.find((x) => x !== "Y");
    return (c[0] === fromDad && m.includes(c[1])) || (c[1] === fromDad && m.includes(c[0]));
  }
  return (m.includes(c[0]) && d.includes(c[1])) || (m.includes(c[1]) && d.includes(c[0]));
}
export function pedigreeFits(spec, mode, fixed = {}) {
  const P = spec.people, byId = Object.fromEntries(P.map((p) => [p.id, p])), order = [...P].sort((a, b) => a.gen - b.gen), g = {};
  const opts = (p) => (fixed[p.id] ? [fixed[p.id]] : genotypesFor(mode, p.sex)).filter((x) => affectedBy(mode, x) === !!p.affected);
  const ok = (p) => { if (!p.parents) return true; const [a, b] = p.parents.map((id) => byId[id]); const mum = a.sex === "f" ? a : b, dad = a.sex === "f" ? b : a; return canParent(g[p.id], g[mum.id], g[dad.id]); };
  const go = (i) => { if (i === order.length) return true; const p = order[i]; for (const x of opts(p)) { g[p.id] = x; if (ok(p) && go(i + 1)) return true; } delete g[p.id]; return false; };
  return go(0);
}
function pedigreeDraw(spec, W, narrow) {
  const P = spec.people, byId = Object.fromEntries(P.map((p) => [p.id, p])), gens = Math.max(...P.map((p) => p.gen)), cols = Math.max(...P.map((p) => p.x)) + 1;
  const left = narrow ? 34 : 56, cw = Math.min(90, (W - left - 16) / cols), r = Math.min(15, cw * 0.32), rowH = narrow ? 104 : 112;
  const at = (p) => [left + (p.x + 0.5) * cw, 30 + (p.gen - 1) * rowH];
  let s = "";
  const romans = ["I", "II", "III", "IV", "V"];
  for (let gI = 1; gI <= gens; gI++) s += text(14, 30 + (gI - 1) * rowH, romans[gI - 1], { size: 14, weight: 700, anchor: "start", fill: C.soft });
  // partnerships and sibships, from the children's parents
  const fam = {};
  for (const p of P) if (p.parents) (fam[p.parents.slice().sort().join("|")] ||= []).push(p);
  for (const [k, kids] of Object.entries(fam)) {
    const [a, b] = k.split("|").map((id) => at(byId[id])), my = a[1], mx = (a[0] + b[0]) / 2, sy = my + rowH / 2;
    s += line(Math.min(a[0], b[0]) + r, my, Math.max(a[0], b[0]) - r, my, { stroke: C.ink, w: 2 });
    s += line(mx, my, mx, sy, { stroke: C.ink, w: 2 });
    const xs = kids.map((c) => at(c)[0]);
    s += line(Math.min(mx, ...xs), sy, Math.max(mx, ...xs), sy, { stroke: C.ink, w: 2 });
    for (const x of xs) s += line(x, sy, x, sy + rowH / 2 - r, { stroke: C.ink, w: 2 });
  }
  for (const p of P) {
    const [x, y] = at(p), fill = p.affected ? C.ink : "var(--vx-bg, #ffffff)";
    s += p.sex === "m" ? `<rect x="${f1(x - r)}" y="${f1(y - r)}" width="${f1(2 * r)}" height="${f1(2 * r)}" fill="${fill}" stroke="${C.ink}" stroke-width="2"/>` : `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${fill}" stroke="${C.ink}" stroke-width="2"/>`;
    if (p.carrier && !p.affected) s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r * 0.32)}" fill="${C.ink}"/>`;
    s += text(x, y + r + 13, p.id.split("-")[1], { size: 12, fill: C.soft });
  }
  const H = 30 + (gens - 1) * rowH + r + 24;
  // key
  const ky = H + 6;
  s += `<rect x="${left}" y="${ky}" width="16" height="16" fill="none" stroke="${C.ink}" stroke-width="2"/>` + text(left + 22, ky + 8, "male", { size: 12.5, anchor: "start" });
  s += `<circle cx="${left + 88}" cy="${ky + 8}" r="8" fill="none" stroke="${C.ink}" stroke-width="2"/>` + text(left + 102, ky + 8, "female", { size: 12.5, anchor: "start" });
  const kx = narrow ? left : left + 172, ky2 = narrow ? ky + 26 : ky;
  s += `<rect x="${kx}" y="${ky2}" width="16" height="16" fill="${C.ink}"/>` + text(kx + 22, ky2 + 8, "affected", { size: 12.5, anchor: "start" });
  if (P.some((p) => p.carrier)) s += `<circle cx="${kx + 106}" cy="${ky2 + 8}" r="8" fill="none" stroke="${C.ink}" stroke-width="2"/><circle cx="${kx + 106}" cy="${ky2 + 8}" r="2.6" fill="${C.ink}"/>` + text(kx + 120, ky2 + 8, "carrier", { size: 12.5, anchor: "start" });
  return { s, H: ky2 + 26 };
}
function pedigreeChecks(spec) {
  const out = [], byId = Object.fromEntries(spec.people.map((p) => [p.id, p]));
  out.push(check("every child's parents are a female and a male in the generation above", spec.people.every((p) => !p.parents || (() => { const [a, b] = p.parents.map((id) => byId[id]); return a && b && a.sex !== b.sex && a.gen === p.gen - 1 && b.gen === p.gen - 1; })())));
  for (const c of spec.claims || []) {
    if (c.type === "consistent" || c.type === "excluded") { const fits = pedigreeFits(spec, c.mode); out.push(check(`${MODES[c.mode]} inheritance is ${c.type === "consistent" ? "consistent with" : "ruled out by"} the pedigree`, c.type === "consistent" ? fits : !fits, fits ? "some set of genotypes fits" : "no set of genotypes fits")); }
    if (c.type === "genotype") {
      const p = byId[c.id], other = genotypesFor(c.mode, p.sex).filter((g) => g !== c.value && pedigreeFits(spec, c.mode, { [c.id]: g }));
      out.push(check(`if ${MODES[c.mode]}, ${c.id} must be ${c.value}`, pedigreeFits(spec, c.mode, { [c.id]: c.value }) && !other.length, other.length ? `also possible: ${other.join(", ")}` : "forced"));
    }
  }
  return out;
}

// ======================================================================== cellmap
// spec: cell: "prokaryote" | "animal" | "plant" | "fungus", labels: [structure names drawn and labelled],
//   claims: [{type: "lacks", structures: [..]}]
export const STRUCTURES = {
  prokaryote: ["cell wall", "plasma membrane", "cytoplasm", "nucleoid", "plasmid", "70S ribosomes", "capsule", "flagellum", "pili"],
  animal: ["plasma membrane", "cytoplasm", "nucleus", "nucleolus", "nuclear envelope", "mitochondrion", "rough ER", "smooth ER", "Golgi apparatus", "lysosome", "80S ribosomes", "centrioles", "vesicle"],
  plant: ["cell wall", "plasma membrane", "cytoplasm", "nucleus", "nucleolus", "mitochondrion", "chloroplast", "vacuole", "tonoplast", "rough ER", "Golgi apparatus", "80S ribosomes", "plasmodesmata"],
  fungus: ["cell wall", "plasma membrane", "cytoplasm", "nucleus", "mitochondrion", "vacuole", "rough ER", "Golgi apparatus", "80S ribosomes", "septum"],
};
const ALL_STRUCT = ["nucleus", "nucleolus", "nuclear envelope", "mitochondrion", "chloroplast", "rough ER", "smooth ER", "Golgi apparatus", "lysosome", "centrioles", "cell wall", "vacuole", "tonoplast", "plasmodesmata", "nucleoid", "plasmid", "70S ribosomes", "80S ribosomes", "capsule", "flagellum", "pili", "septum", "vesicle", "plasma membrane", "cytoplasm"];
// drawing positions on a 420 × 260 canvas: [anchor x, anchor y] for each structure's leader line
const TEMPLATE = {
  prokaryote: { "cell wall": [110, 112], "plasma membrane": [131, 92], cytoplasm: [250, 170], nucleoid: [205, 125], plasmid: [290, 150], "70S ribosomes": [160, 160], capsule: [98, 146], flagellum: [400, 132], pili: [250, 46] },
  animal: { "plasma membrane": [72, 150], cytoplasm: [300, 200], nucleus: [182, 100], nucleolus: [205, 120], "nuclear envelope": [168, 92], mitochondrion: [312, 92], "rough ER": [128, 150], "smooth ER": [130, 196], "Golgi apparatus": [300, 150], lysosome: [250, 208], "80S ribosomes": [258, 70], centrioles: [262, 162], vesicle: [340, 176] },
  plant: { "cell wall": [24, 56], "plasma membrane": [34, 112], cytoplasm: [90, 222], nucleus: [82, 64], nucleolus: [96, 78], mitochondrion: [340, 214], chloroplast: [356, 70], vacuole: [230, 130], tonoplast: [130, 128], "rough ER": [70, 160], "Golgi apparatus": [372, 150], "80S ribosomes": [300, 228], plasmodesmata: [210, 22] },
  fungus: { "cell wall": [35, 71], "plasma membrane": [36, 110], cytoplasm: [110, 150], nucleus: [106, 118], mitochondrion: [180, 158], vacuole: [300, 130], "rough ER": [230, 152], "Golgi apparatus": [240, 106], "80S ribosomes": [180, 104], septum: [380, 96] },
};
function cellBody(kind, s = "") {
  const g = (d, o = {}) => `<path d="${d}" fill="${o.fill || "none"}" fill-opacity="${o.op ?? 1}" stroke="${o.stroke || C.ink}" stroke-width="${o.w || 2}" stroke-linejoin="round"/>`;
  const circ = (x, y, r, o = {}) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${o.fill || "none"}" fill-opacity="${o.op ?? 1}" stroke="${o.stroke || C.ink}" stroke-width="${o.w || 1.6}"/>`;
  const ell = (x, y, rx, ry, o = {}) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${o.fill || "none"}" fill-opacity="${o.op ?? 1}" stroke="${o.stroke || C.ink}" stroke-width="${o.w || 1.6}"/>`;
  const dots = (pts) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" fill="${C.ink}"/>`).join("");
  const mito = (x, y) => ell(x, y, 24, 12, { fill: C.a3, op: 0.18, stroke: C.a3 }) + g(`M${x - 16} ${y} q4 -8 8 0 q4 8 8 0 q4 -8 8 0 q4 8 8 0`, { stroke: C.a3, w: 1.4 });
  const golgi = (x, y) => [0, 1, 2, 3].map((k) => g(`M${x - 26 + k * 2} ${y - 10 + k * 7} q26 -8 52 0`, { stroke: C.a5, w: 2.6 })).join("") + circ(x + 32, y - 4, 4, { stroke: C.a5 }) + circ(x + 34, y + 16, 4, { stroke: C.a5 });
  const rer = (x, y) => [0, 1, 2].map((k) => g(`M${x - 30} ${y - 12 + k * 10} q15 -7 30 0 q15 7 30 0`, { stroke: C.a1, w: 1.6 })).join("") + dots([[x - 24, y - 16], [x - 6, y - 14], [x + 14, y - 8], [x - 20, y - 4], [x + 4, y + 4], [x + 22, y + 10]]);
  if (kind === "prokaryote") {
    s += `<rect x="96" y="58" width="260" height="140" rx="70" fill="${C.a4}" fill-opacity=".08" stroke="${C.a4}" stroke-width="10" stroke-opacity=".35"/>`;
    s += `<rect x="108" y="70" width="236" height="116" rx="58" fill="none" stroke="${C.ink}" stroke-width="3"/>`;
    s += `<rect x="116" y="78" width="220" height="100" rx="50" fill="${C.panel}" stroke="${C.ink}" stroke-width="1.4"/>`;
    s += g("M175 120 c10 -25 30 10 45 -8 c15 -18 30 16 18 25 c-12 9 -40 -10 -55 8 c-10 12 -18 -10 -8 -25", { stroke: C.a2, w: 2.2 });
    s += circ(290, 150, 9, { stroke: C.a2, w: 2 }) + circ(268, 104, 6, { stroke: C.a2, w: 2 });
    s += dots([[150, 150], [160, 160], [172, 152], [230, 160], [242, 150], [300, 118], [312, 128], [258, 98], [140, 112]]);
    s += g("M356 128 c14 -10 22 10 34 0 c10 -8 16 8 26 2", { w: 2 });
    for (const x of [170, 210, 250, 290]) s += line(x, 64, x + (x - 230) * 0.05, 46, { stroke: C.ink, w: 1.4 });
  } else if (kind === "animal") {
    s += g("M70 130 C60 60 160 30 230 38 C320 46 380 80 372 140 C366 200 300 236 210 232 C120 228 78 196 70 130 Z", { fill: C.panel, w: 2.4 });
    s += circ(200, 118, 32, { fill: C.a2, op: 0.12, stroke: C.a2, w: 2.6 }) + circ(205, 120, 10, { fill: C.a2, op: 0.5, stroke: C.a2 });
    s += mito(312, 92) + rer(140, 160) + golgi(298, 150);
    s += g("M110 196 q12 -10 24 0 q12 10 24 0", { stroke: C.a1, w: 1.6 });
    s += circ(250, 208, 9, { fill: C.a3, op: 0.3, stroke: C.a3 }) + circ(340, 176, 6, { stroke: C.a5 });
    s += `<rect x="256" y="156" width="6" height="14" fill="${C.ink}"/><rect x="262" y="166" width="14" height="6" fill="${C.ink}"/>`;
    s += dots([[250, 72], [262, 70], [270, 80], [150, 90], [330, 210], [180, 210]]);
  } else if (kind === "plant") {
    s += `<rect x="24" y="16" width="372" height="228" rx="6" fill="${C.a4}" fill-opacity=".12" stroke="${C.a4}" stroke-width="9"/>`;
    s += `<rect x="34" y="26" width="352" height="208" rx="4" fill="${C.panel}" stroke="${C.ink}" stroke-width="1.6"/>`;
    for (const x of [200, 220]) s += line(x, 12, x, 30, { stroke: C.ink, w: 1.6 });
    s += `<rect x="130" y="58" width="190" height="140" rx="40" fill="${C.a1}" fill-opacity=".08" stroke="${C.a1}" stroke-width="2.4"/>`;
    s += circ(96, 76, 22, { fill: C.a2, op: 0.12, stroke: C.a2, w: 2.4 }) + circ(96, 78, 7, { fill: C.a2, op: 0.5, stroke: C.a2 });
    for (const [x, y] of [[356, 70], [356, 112], [60, 196]]) { s += ell(x, y, 20, 11, { fill: C.good, op: 0.25, stroke: C.good }); for (const k of [-8, 0, 8]) s += line(x + k, y - 5, x + k, y + 5, { stroke: C.good, w: 2.4 }); }
    s += mito(340, 214) + golgi(366, 156);
    s += [0, 1].map((k) => g(`M50 ${150 + k * 10} q12 -7 24 0 q12 7 24 0`, { stroke: C.a1, w: 1.6 })).join("") + dots([[56, 146], [72, 152], [86, 158], [300, 228], [312, 222], [250, 222]]);
  } else if (kind === "fungus") {
    s += `<rect x="26" y="62" width="380" height="136" rx="30" fill="${C.a4}" fill-opacity=".12" stroke="${C.a4}" stroke-width="8"/>`;
    s += `<rect x="36" y="72" width="360" height="116" rx="22" fill="${C.panel}" stroke="${C.ink}" stroke-width="1.6"/>`;
    s += line(380, 72, 380, 120, { stroke: C.a4, w: 6 }) + line(380, 140, 380, 188, { stroke: C.a4, w: 6 });
    s += circ(120, 130, 20, { fill: C.a2, op: 0.12, stroke: C.a2, w: 2.4 }) + circ(122, 132, 6, { fill: C.a2, op: 0.5, stroke: C.a2 });
    s += mito(180, 158) + golgi(244, 104) + rer(232, 154);
    s += ell(306, 130, 34, 30, { fill: C.a1, op: 0.08, stroke: C.a1, w: 2.2 });
    s += dots([[170, 96], [182, 104], [194, 98], [300, 172], [150, 170]]);
  }
  return s;
}
// the top and bottom of each drawing on its 420-wide canvas (pili, wall and plasmodesmata included)
const SPAN = { prokaryote: [44, 202], animal: [30, 236], plant: [10, 248], fungus: [56, 204] };
function cellmapDraw(spec, W, narrow) {
  const T = TEMPLATE[spec.cell], labs = spec.labels.filter((l) => T[l]);
  if (!narrow) {
    // the cell in the middle, labels in a column either side, spread so they never touch
    const [t0, t1] = SPAN[spec.cell] || [0, 262], sc = 1, cw = 420, ox = (W - cw) / 2, oy = 20 - t0, colL = ox - 14, colR = ox + cw + 14;
    let s = `<g transform="translate(${f1(ox)} ${oy})">${cellBody(spec.cell)}</g>`;
    const items = labs.map((l) => ({ l, ax: ox + T[l][0] * sc, ay: oy + T[l][1] * sc })), side = (it) => (it.ax < ox + cw / 2 ? "L" : "R");
    let H = oy + t1 + 20;
    for (const sd of ["L", "R"]) {
      const its = items.filter((it) => side(it) === sd).sort((a, b) => a.ay - b.ay);
      let last = -1e9;
      for (const it of its) { it.ty = Math.max(it.ay, last + 24); last = it.ty; }
      const over = last - (oy + Math.max(t1, t0 + 250)); if (over > 0) for (const it of its) it.ty -= over;
      for (const it of its) {
        const tx = sd === "L" ? colL : colR;
        s += line(it.ax, it.ay, tx + (sd === "L" ? 4 : -4), it.ty, { stroke: C.soft, w: 1.2 }) + `<circle cx="${f1(it.ax)}" cy="${f1(it.ay)}" r="2.6" fill="${C.ink}"/>`;
        s += text(tx, it.ty, it.l, { size: 13, weight: 600, anchor: sd === "L" ? "end" : "start" });
        H = Math.max(H, it.ty + 16);
      }
    }
    return { s, H };
  }
  // phone: the cell scaled to the width with numbered markers, and the key underneath
  const [t0, t1] = SPAN[spec.cell] || [0, 262], sc = (W - 20) / 420, oy = 14 - t0 * sc;
  let s = `<g transform="translate(10 ${oy}) scale(${sc.toFixed(4)})">${cellBody(spec.cell)}</g>`;
  // each marker sits a little outward from the structure it marks, so it never hides a small organelle, with a short
  // leader line back to it; markers that would still touch (a nucleolus inside its nucleus) are pushed apart
  const cx0 = 10 + 210 * sc, cy0 = oy + 130 * sc;
  const mk = labs.map((l) => {
    const ax = 10 + T[l][0] * sc, ay = oy + T[l][1] * sc, d = Math.hypot(ax - cx0, ay - cy0), ux = d > 1 ? (ax - cx0) / d : 0, uy = d > 1 ? (ay - cy0) / d : -1;
    return { ax, ay, x: ax + ux * 17, y: ay + uy * 17 };
  });
  for (let it = 0; it < 60; it++) for (let i = 0; i < mk.length; i++) for (let j = i + 1; j < mk.length; j++) {
    const a = mk[i], b = mk[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy), need = 21;
    if (d >= need) continue;
    const ux = d > 0.01 ? dx / d : 0.6, uy = d > 0.01 ? dy / d : 0.8, push = (need - d) / 2;
    a.x -= ux * push; a.y -= uy * push; b.x += ux * push; b.y += uy * push;
  }
  for (const m of mk) { m.x = Math.min(W - 11, Math.max(11, m.x)); m.y = Math.max(11, m.y); }
  mk.forEach((m, i) => {
    s += line(m.ax, m.ay, m.x, m.y, { stroke: C.ink, w: 1.2 }) + `<circle cx="${f1(m.ax)}" cy="${f1(m.ay)}" r="2.2" fill="${C.ink}"/>`;
    s += `<circle cx="${f1(m.x)}" cy="${f1(m.y)}" r="9" fill="var(--vx-bg, #ffffff)" stroke="${C.ink}" stroke-width="1.4"/>` + text(m.x, m.y + 0.5, String(i + 1), { size: 10.5, weight: 700 });
  });
  let y = oy + t1 * sc + 26;
  const half = Math.ceil(labs.length / 2);
  labs.forEach((l, i) => { const c = i < half ? 0 : 1, r = i < half ? i : i - half; s += text(20 + c * (W / 2), y + r * 20, `${i + 1}  ${l}`, { size: 12.5, anchor: "start" }); });
  return { s, H: y + half * 20 + 4 };
}
function cellmapChecks(spec) {
  const out = [], has = STRUCTURES[spec.cell];
  out.push(check(`the cell type ${spec.cell} is known`, !!has));
  const bad = spec.labels.filter((l) => !has.includes(l)), undrawn = spec.labels.filter((l) => !TEMPLATE[spec.cell][l]);
  out.push(check(`every labelled structure is found in a ${spec.cell === "prokaryote" ? "prokaryotic" : spec.cell} cell`, !bad.length, bad.join(", ") || `${spec.labels.length} structures`));
  out.push(check("every labelled structure is drawn", !undrawn.length, undrawn.join(", ")));
  for (const c of spec.claims || []) if (c.type === "lacks") {
    const wrong = c.structures.filter((x) => has.includes(x) || !ALL_STRUCT.includes(x));
    out.push(check(`a ${spec.cell} cell has no ${c.structures.join(", ")}`, !wrong.length, wrong.join(", ")));
  }
  return out;
}

// ======================================================================== membrane
// spec: sides: [{id, label, conc: {glucose: 5, …}, psi, tone}, …] from the top of the picture down: two sides for one
//   membrane, or three for a layer of cells (gut lumen, lining cell, blood) with a membrane between each pair;
//   cell: the id of the side that is the cell's cytoplasm (default "in"), concUnit: shown once, e.g. "mmol dm^{−3}",
//   moves: [{substance, label?, count?, kind, from, to, atp, protein?, note?}]. `substance` is the key into conc;
//   `label` is what is printed ("3 Na⁺"). Moves naming the same protein (spec.proteins: {key: name}) are drawn
//   through one protein: a pump that moves two ions, or a co-transporter. kind "cotransport": one substance runs down
//   its gradient and carries another, which may go against its own; no ATP is used directly.
//   claims: [{type: "netCharge", protein, out}]  net positive charges carried out of the cell per cycle
const KIND = { simple: "simple diffusion", channel: "channel protein", carrier: "carrier protein", active: "active transport (pump)", osmosis: "osmosis (aquaporin)", endocytosis: "endocytosis", exocytosis: "exocytosis", cotransport: "co-transporter" };
export const chargeOf = (s) => { const m = /([²³]?)([⁺⁻])$/.exec(String(s)); if (!m) return 0; const n = m[1] === "²" ? 2 : m[1] === "³" ? 3 : 1; return m[2] === "⁺" ? n : -n; };
const minus = (v) => String(v).replace(/^-/, "−");
const SIDE_TONES = ["a4", "a1", "a2"];
// moves on membrane k, in order, grouped into runs that share a protein
function proteinGroups(moves) {
  const out = [];
  moves.forEach((m, i) => { const g = out.at(-1); if (g && m.protein && g.protein === m.protein) g.idx.push(i); else out.push({ protein: m.protein, idx: [i] }); });
  return out;
}
function membraneDraw(spec, W, narrow) {
  const sides = spec.sides, band = 44, gut = narrow ? 0 : 132, left = gut + 10, right = W - 10;
  const at = Object.fromEntries(sides.map((x, i) => [x.id, i]));
  const mems = sides.slice(1).map((_, k) => spec.moves.filter((m) => Math.min(at[m.from], at[m.to]) === k));
  let s = "", y = 26;
  const memY = [], labels = [];
  if (narrow) labels.push([0, 14]);
  mems.forEach((moves, k) => {
    const n = Math.max(1, moves.length), slot = (right - left) / n, y0 = y, mY = y0 + 94, top = mY - band / 2, bot = mY + band / 2;
    memY.push(mY);
    const groups = proteinGroups(moves);
    // the arrows of one protein sit close together through it; every other move is centred in its own slot
    const sp = Math.min(64, slot), xs = [], room = [];
    for (const g of groups) {
      const mid = left + ((g.idx[0] + g.idx.at(-1)) / 2 + 0.5) * slot;
      g.idx.forEach((i, j) => { xs[i] = g.idx.length > 1 ? mid + (j - (g.idx.length - 1) / 2) * sp : mid; room[i] = g.idx.length > 1 ? sp : slot; });
    }
    let kindLines = 1;
    const parts = [];
    // proteins first, so arrows and vesicles sit on top of them
    for (const g of groups) {
      const ms = g.idx.map((i) => moves[i]), m = ms[0], cxs = g.idx.map((i) => xs[i]), pw = Math.min(46, slot * 0.42) + (g.idx.length > 1 ? 14 : 0);
      const x0 = cxs[0] - pw / 2, x1 = cxs.at(-1) + pw / 2;
      if (["channel", "carrier", "active", "osmosis", "cotransport"].includes(m.kind)) {
        const t = m.kind === "active" ? C.a2 : m.kind === "osmosis" ? C.a1 : m.kind === "cotransport" ? C.a4 : C.a5;
        if (m.kind === "channel" || m.kind === "osmosis") parts.push(rect(x0, top - 6, pw * 0.38, band + 12, { fill: t, op: 0.35, stroke: t, rx: 6 }) + rect(x1 - pw * 0.38, top - 6, pw * 0.38, band + 12, { fill: t, op: 0.35, stroke: t, rx: 6 }));
        else parts.push(rect(x0, top - 8, x1 - x0, band + 16, { fill: t, op: 0.35, stroke: t, rx: 14 }));
      }
      const what = (g.protein && spec.proteins?.[g.protein]) || m.note || KIND[m.kind];
      const kt = what + (ms.some((x) => x.atp) ? ", uses ATP" : "");
      const kb = textBlock((cxs[0] + cxs.at(-1)) / 2, 0, kt, Math.max(9, Math.floor((slot * g.idx.length) / 6.9)), { size: 11.5, fill: C.soft });
      kindLines = Math.max(kindLines, kb.lines);
      g.kb = kb;
    }
    s += parts.join("");
    let botLines = 0; // names printed under the membrane, which the protein labels must clear
    moves.forEach((m, i) => {
      const cx = xs[i], down = at[m.from] < at[m.to], fromS = sides[at[m.from]], toS = sides[at[m.to]];
      let y1 = down ? y0 + 42 : bot + 30, y2 = down ? bot + 30 : y0 + 42;
      if (m.kind === "endocytosis" || m.kind === "exocytosis") {
        // the vesicle on the cytoplasm side, a ring of membrane around its cargo; the arrow runs to it or from it
        const below = at[spec.cell || "in"] > k, vy = below ? bot + 30 : top - 30, r = 16;
        s += `<circle cx="${f1(cx)}" cy="${f1(vy)}" r="${r}" fill="${C.panel}" stroke="${C.a3}" stroke-width="5" stroke-opacity=".55"/><circle cx="${f1(cx)}" cy="${f1(vy)}" r="${r}" fill="none" stroke="${C.a3}" stroke-width="1" stroke-dasharray="2 2.6"/>`;
        s += `<rect x="${f1(cx - 7)}" y="${f1(vy - 4)}" width="14" height="8" rx="4" fill="${C.a3}" fill-opacity=".8"/>`;
        const edge = below ? vy - r - 3 : vy + r + 3;
        if (m.kind === "endocytosis") { if (below) y2 = edge; else y2 = edge; } else if (below) y1 = edge; else y1 = edge;
      }
      s += arrow(cx, y1, cx, y2, { stroke: m.kind === "active" ? C.a2 : C.ink, w: 2.4, head: 10 });
      const name = textBlock(cx, 0, m.label || m.substance, Math.max(7, Math.floor(room[i] / 7.4)), { size: 12.5, weight: 700 });
      s += `<g transform="translate(0 ${f1(down ? y0 + 12 - (name.lines - 1) * 8 : bot + 66 + (name.lines - 1) * 8)})">${name.svg}</g>`;
      if (!down) botLines = Math.max(botLines, name.lines);
      const v = (side) => (m.kind === "osmosis" ? (side.psi != null ? `ψ ${minus(side.psi)}` : null) : side.conc?.[m.substance]);
      const tv = v(down ? fromS : toS), bv = v(down ? toS : fromS);
      if (tv != null && bv != null) s += text(cx, y0 + 30, minus(tv), { size: 11.5, fill: C.soft }) + text(cx, bot + 44, minus(bv), { size: 11.5, fill: C.soft });
    });
    const ky = bot + (botLines ? 66 + (botLines - 1) * 16 + 26 : 72);
    for (const g of groups) s += `<g transform="translate(0 ${f1(ky + ((g.kb.lines - 1) * 14.7) / 2)})">${g.kb.svg}</g>`;
    y = ky + (kindLines - 1) * 14.7 + 14;
    if (narrow) { labels.push([k + 1, y + 12]); y += 28; } else y += 8;
  });
  const H = y + (narrow && spec.concUnit ? 22 : 0);
  // the regions: shaded bands from membrane to membrane, drawn underneath everything
  const bounds = [0, ...memY, H];
  let bg = sides.map((sd, i) => rect(0, bounds[i], W, bounds[i + 1] - bounds[i], { fill: C[sd.tone || SIDE_TONES[i % 3]], op: 0.07, stroke: "none", rx: 0 })).join("");
  // phospholipids: two rows of heads with tails pointing inward, at each membrane
  for (const mY of memY) for (let x = gut + 6; x < W; x += 13) {
    bg += `<circle cx="${x}" cy="${mY - band / 2 + 5}" r="5" fill="${C.a3}" fill-opacity=".5" stroke="${C.a3}" stroke-width="1"/><circle cx="${x}" cy="${mY + band / 2 - 5}" r="5" fill="${C.a3}" fill-opacity=".5" stroke="${C.a3}" stroke-width="1"/>`;
    bg += line(x - 2, mY - band / 2 + 10, x - 2, mY - 3, { stroke: C.line, w: 1 }) + line(x + 2, mY - band / 2 + 10, x + 2, mY - 3, { stroke: C.line, w: 1 });
    bg += line(x - 2, mY + 3, x - 2, mY + band / 2 - 10, { stroke: C.line, w: 1 }) + line(x + 2, mY + 3, x + 2, mY + band / 2 - 10, { stroke: C.line, w: 1 });
  }
  if (!narrow) {
    // the gutter: each region's name beside it, clear of the membrane
    sides.forEach((sd, i) => { const a = i ? memY[i - 1] + band / 2 : 0, b = i < memY.length ? memY[i] - band / 2 : H; const tb = textBlock(10, (a + b) / 2, sd.label, 15, { size: 13.5, weight: 700, anchor: "start", fill: C[sd.tone || SIDE_TONES[i % 3]] }); bg += tb.svg; });
    if (spec.concUnit) bg += text(W - 10, 12, `concentrations in ${spec.concUnit}`, { size: 11.5, anchor: "end", fill: C.soft });
  } else {
    for (const [i, ly] of labels) bg += text(10, ly, sides[i].label, { size: 13, weight: 700, anchor: "start", fill: C[sides[i].tone || SIDE_TONES[i % 3]] });
    if (spec.concUnit) bg += text(10, H - 10, `concentrations in ${spec.concUnit}`, { size: 11.5, anchor: "start", fill: C.soft });
  }
  return { s: bg + s, H };
}
function membraneChecks(spec) {
  const out = [], S = Object.fromEntries(spec.sides.map((x) => [x.id, x])), cell = spec.cell || "in";
  out.push(check("every move joins two neighbouring compartments across one membrane", spec.moves.every((m) => { const i = spec.sides.indexOf(S[m.from]), j = spec.sides.indexOf(S[m.to]); return i >= 0 && j >= 0 && Math.abs(i - j) === 1; })));
  const name = (m) => m.label || m.substance;
  for (const m of spec.moves) {
    const f = S[m.from], t = S[m.to];
    if (m.kind === "osmosis") { out.push(check(`water moves by osmosis from higher to lower water potential (${f.label} → ${t.label})`, f.psi > t.psi, `ψ ${f.psi} → ${t.psi} kPa`)); continue; }
    const a = f.conc?.[m.substance], b = t.conc?.[m.substance];
    if (["simple", "channel", "carrier", "active", "cotransport"].includes(m.kind)) out.push(check(`${name(m)}: a concentration is given on both sides`, a != null && b != null, `${a} → ${b}`));
    if (["simple", "channel", "carrier"].includes(m.kind)) {
      out.push(check(`${name(m)} moves down its gradient by ${KIND[m.kind]}`, a > b, `${a} → ${b}`));
      out.push(check(`${KIND[m.kind]} needs no ATP (${name(m)})`, !m.atp));
    }
    if (m.kind === "active") { out.push(check(`active transport of ${name(m)} uses ATP`, !!m.atp)); out.push(check(`${name(m)} is pumped against its gradient`, a < b, `${a} → ${b}`)); }
    if (m.kind === "endocytosis" || m.kind === "exocytosis") { out.push(check(`${m.kind} moves ${name(m)} ${m.kind === "endocytosis" ? "into" : "out of"} the cell`, m.kind === "endocytosis" ? t.id === cell : f.id === cell)); out.push(check(`${m.kind} uses ATP`, !!m.atp)); }
  }
  // co-transport: within each co-transporter, something runs down its gradient and pays for the rest
  const byProtein = {};
  for (const m of spec.moves) if (m.protein) (byProtein[m.protein] ||= []).push(m);
  for (const [p, ms] of Object.entries(byProtein)) {
    if (!ms.some((m) => m.kind === "cotransport")) continue;
    const grad = (m) => S[m.from].conc?.[m.substance] - S[m.to].conc?.[m.substance];
    const drivers = ms.filter((m) => grad(m) > 0), uphill = ms.filter((m) => grad(m) < 0);
    out.push(check(`${spec.proteins?.[p] || p}: ${drivers.map(name).join(", ") || "nothing"} runs down its gradient and drives the transport`, drivers.length > 0, ms.map((m) => `${name(m)} ${S[m.from].conc?.[m.substance]} → ${S[m.to].conc?.[m.substance]}`).join("; ")));
    if (uphill.length) out.push(check(`${spec.proteins?.[p] || p} carries ${uphill.map(name).join(", ")} against its own gradient`, drivers.length > 0));
    out.push(check(`${spec.proteins?.[p] || p} uses no ATP directly (secondary active transport)`, ms.every((m) => !m.atp)));
  }
  for (const c of spec.claims || []) if (c.type === "netCharge") {
    const net = spec.moves.filter((m) => m.protein === c.protein).reduce((q, m) => q + (m.count || 1) * chargeOf(m.substance) * (m.from === cell ? 1 : m.to === cell ? -1 : 0), 0);
    out.push(check(`each cycle of the ${spec.proteins?.[c.protein] || c.protein} carries a net ${c.out} positive charge${Math.abs(c.out) === 1 ? "" : "s"} out of the cell, leaving the inside more negative`, net === c.out, `${net} computed from the ions moved`));
  }
  return out;
}

// ======================================================================== tonicity
// spec: rows: [{cell: "animal" | "plant", label, psiS, psiP (0 for an animal cell), panels: [{solution, label?, outcome}]}],
//   columns: [header per panel]. Water moves from the higher to the lower water potential; the outcome follows from
//   the direction and the kind of cell: an animal cell "bursts" or "crenates"; a plant cell becomes "turgid", or
//   "flaccid" while its wall still presses on it, and "plasmolysed" once the solution is below its solute potential.
const OUTCOME = { bursts: "bursts (haemolysis)", unchanged: "no net movement", crenated: "shrinks (crenated)", turgid: "turgid", flaccid: "flaccid", plasmolysed: "plasmolysed" };
export function osmoticOutcome(cell, psiS, psiP, solution) {
  const psi = psiS + (psiP || 0);
  if (solution === psi) return "unchanged";
  if (cell === "animal") return solution > psi ? "bursts" : "crenated";
  if (solution > psi) return "turgid";
  return solution < psiS ? "plasmolysed" : "flaccid";
}
function cellShape(cell, outcome, x, y) {
  let s = "";
  if (cell === "animal") {
    if (outcome === "bursts") {
      // a swollen cell torn open, its contents spilling out
      s += `<path d="M${f1(x + 30 * Math.cos(1.2))} ${f1(y - 30 * Math.sin(1.2))} A30 30 0 1 0 ${f1(x + 30 * Math.cos(0.55))} ${f1(y - 30 * Math.sin(0.55))}" fill="${C.a2}" fill-opacity=".18" stroke="${C.a2}" stroke-width="2.4" stroke-dasharray="7 4"/>`;
      for (const [dx, dy] of [[26, -30], [33, -36], [24, -40], [36, -26]]) s += `<circle cx="${f1(x + dx)}" cy="${f1(y + dy)}" r="2.6" fill="${C.a2}" fill-opacity=".7"/>`;
    } else if (outcome === "crenated") {
      const pts = []; for (let i = 0; i < 28; i++) { const a = (i * Math.PI) / 14, r = i % 2 ? 15 : 20; pts.push([x + r * Math.cos(a), y + r * Math.sin(a)]); }
      s += `<path d="M${pts.map(([a, b]) => `${f1(a)} ${f1(b)}`).join(" L")} Z" fill="${C.a2}" fill-opacity=".35" stroke="${C.a2}" stroke-width="2" stroke-linejoin="round"/>`;
    } else s += `<circle cx="${x}" cy="${y}" r="24" fill="${C.a2}" fill-opacity=".3" stroke="${C.a2}" stroke-width="2.4"/><circle cx="${x}" cy="${y}" r="10" fill="${C.a2}" fill-opacity=".14" stroke="none"/>`;
    return s;
  }
  const w = 76, h = 56, inset = { turgid: 3, unchanged: 3, flaccid: 3, plasmolysed: 15 }[outcome] ?? 3, vac = { turgid: 8, unchanged: 11, flaccid: 17, plasmolysed: 22 }[outcome] ?? 11;
  s += rect(x - w / 2, y - h / 2, w, h, { fill: "none", stroke: C.a4, sw: 5, rx: 4 });
  s += rect(x - w / 2 + inset, y - h / 2 + inset, w - 2 * inset, h - 2 * inset, { fill: C.good, op: 0.16, stroke: C.good, sw: 1.6, rx: outcome === "plasmolysed" ? 12 : 3 });
  s += rect(x - w / 2 + vac, y - h / 2 + vac, w - 2 * vac, h - 2 * vac, { fill: C.a1, op: 0.22, stroke: C.a1, sw: 1.4, rx: 6 });
  s += `<circle cx="${f1(x - w / 2 + inset + 7)}" cy="${f1(y - h / 2 + inset + 7)}" r="4" fill="${C.a2}" fill-opacity=".6"/>`;
  return s;
}
function tonicityDraw(spec, W, narrow) {
  const head = narrow ? 0 : 150, cols = spec.columns.length, pw = (W - head - 10 - (cols - 1) * 8) / cols, ph = 150;
  let s = "", y = 8;
  spec.columns.forEach((c, j) => { const tb = textBlock(head + 5 + j * (pw + 8) + pw / 2, 0, c, Math.floor(pw / 6.8), { size: 12, weight: 700, fill: C.soft }); s += `<g transform="translate(0 ${f1(y + 8 + ((tb.lines - 1) * 15.4) / 2)})">${tb.svg}</g>`; });
  y += 8 + Math.max(...spec.columns.map((c) => wrap(c, Math.floor(pw / 6.8)).length)) * 15.4 + 6;
  for (const r of spec.rows) {
    const psi = r.psiS + (r.psiP || 0);
    if (narrow) { s += text(10, y + 10, r.cell === "plant" ? `${r.label}: ψ = ${minus(r.psiS)} + ${r.psiP} = ${minus(psi)} kPa` : `${r.label}: ψ = ${minus(psi)} kPa`, { size: 12.5, weight: 700, anchor: "start" }); y += 24; }
    else {
      // the cell's water potential, built from its solute and pressure potentials for a plant cell
      const ls = r.cell === "plant" ? [`ψs = ${minus(r.psiS)} kPa`, `ψp = +${r.psiP} kPa`, `ψ = ${minus(psi)} kPa`] : [`ψ = ${minus(psi)} kPa`];
      s += text(10, y + ph / 2 - 8 - (ls.length - 1) * 8, r.label, { size: 13.5, weight: 700, anchor: "start" });
      ls.forEach((l, i) => { s += text(10, y + ph / 2 + 12 + i * 16 - (ls.length - 1) * 8, l, { size: 12, anchor: "start", fill: i === ls.length - 1 ? C.ink : C.soft, weight: i === ls.length - 1 ? 600 : 500 }); });
    }
    r.panels.forEach((p, j) => {
      const px = head + 5 + j * (pw + 8), cx = px + pw / 2, cy = y + 74, dir = Math.sign(p.solution - psi);
      s += rect(px, y, pw, ph, { fill: C.a1, op: 0.04 + Math.min(0.2, (-p.solution / 1400) * 0.16), stroke: C.line, sw: 1.2, rx: 10 });
      s += text(cx, y + 15, `${narrow ? "" : "solution "}ψ = ${minus(p.solution)} kPa`, { size: 11, fill: C.soft });
      const k = narrow ? 0.8 : 1;
      s += `<g transform="translate(${f1(cx)} ${f1(cy)}) scale(${k}) translate(${f1(-cx)} ${f1(-cy)})">${cellShape(r.cell, p.outcome, cx, cy)}</g>`;
      // water arrows across the cell's surface, or none when there is no net movement
      const R = (r.cell === "animal" ? 34 : 44) * k;
      if (dir !== 0) for (const a of [Math.PI, 0]) {
        const ox = Math.cos(a), far = R + (narrow ? 15 : 18), near0 = R + 2;
        s += arrow(cx + ox * (dir > 0 ? far : near0), cy, cx + ox * (dir > 0 ? near0 : far), cy, { stroke: C.a1, w: 2, head: 7 });
      }
      const ob = textBlock(cx, 0, OUTCOME[p.outcome] || p.outcome, Math.floor(pw / 6.6), { size: 11.5, weight: 700, fill: C.ink });
      s += `<g transform="translate(0 ${f1(y + ph - 24 - ((ob.lines - 1) * 14.7) / 2 + (ob.lines > 1 ? 7 : 0))})">${ob.svg}</g>`;
    });
    y += ph + 12;
  }
  return { s, H: y };
}
function tonicityChecks(spec) {
  const out = [];
  for (const r of spec.rows) {
    const psi = r.psiS + (r.psiP || 0);
    out.push(check(`${r.label}: ψ = ψs + ψp = ${psi} kPa`, r.psiS <= 0 && (r.cell === "plant" || !r.psiP), `ψs ${r.psiS}, ψp ${r.psiP || 0}`));
    for (const p of r.panels) {
      const want = osmoticOutcome(r.cell, r.psiS, r.psiP, p.solution);
      const way = p.solution > psi ? "enters" : p.solution < psi ? "leaves" : "has no net movement";
      out.push(check(`${r.label} in ψ = ${p.solution} kPa: water ${way}, so it ${OUTCOME[want]}`, p.outcome === want, `drawn: ${p.outcome}`));
    }
  }
  return out;
}

// ======================================================================== route, lineage
// Flow pictures with biology checks: drawn by the shared flow renderer (layout, nodes, edges as in flow), checked here.
//   route    a path through the endomembrane system: nodes [{id, label, sub, is}], where `is` names the compartment;
//            every arrow must be a step cargo really takes, and mitochondria and chloroplasts are not on any route
//   lineage  cells from a stem cell to a specialised cell: nodes [{id, label, sub, cell, potency}]; each cell's potency
//            is as classified, and potency never widens along an arrow (unless the arrow is marked reprogram: true)
const flowDraw = (spec, W, narrow) => {
  const f = RENDERERS.flow;
  if (!f) throw new Error("the flow renderer (chem-renderers-3.js) is not loaded");
  return f.draw(spec, W, narrow);
};
export const ROUTE = {
  nucleus: ["ribosome"],                       // mRNA leaves through the nuclear pores
  ribosome: ["rough ER"],                      // a signal sequence threads the growing chain into the ER
  "rough ER": ["transport vesicle"],
  "transport vesicle": ["Golgi apparatus"],    // fuses with the cis face
  "Golgi apparatus": ["secretory vesicle", "lysosome", "transport vesicle"],
  "secretory vesicle": ["plasma membrane"],    // exocytosis
  "plasma membrane": ["outside the cell", "endocytic vesicle"],
  "endocytic vesicle": ["endosome"],
  endosome: ["lysosome"],
};
const NOT_ENDOMEMBRANE = ["mitochondrion", "chloroplast", "peroxisome"];
function routeChecks(spec) {
  const N = Object.fromEntries(spec.nodes.map((n) => [n.id, n])), known = new Set([...Object.keys(ROUTE), ...Object.values(ROUTE).flat()]);
  const out = [check("every box names a compartment of the route", spec.nodes.every((n) => known.has(n.is)), spec.nodes.filter((n) => !known.has(n.is)).map((n) => n.is).join(", "))];
  out.push(check("no mitochondrion, chloroplast or peroxisome on the route: they are not part of the endomembrane system", !spec.nodes.some((n) => NOT_ENDOMEMBRANE.includes(n.is))));
  for (const e of spec.edges) { const a = N[e.from]?.is, b = N[e.to]?.is; out.push(check(`cargo goes from the ${a} to the ${b}`, (ROUTE[a] || []).includes(b))); }
  return out;
}
const POTENCY = ["totipotent", "pluripotent", "multipotent", "unipotent", "specialised"];
export const CELL_POTENCY = { zygote: "totipotent", "inner cell mass": "pluripotent", "embryonic stem cell": "pluripotent", "induced pluripotent stem cell": "pluripotent", "haematopoietic stem cell": "multipotent", "erythroid progenitor": "unipotent", "epidermal stem cell": "unipotent", "red blood cell": "specialised", keratinocyte: "specialised", "skin fibroblast": "specialised" };
function lineageChecks(spec) {
  const N = Object.fromEntries(spec.nodes.map((n) => [n.id, n])), out = [];
  for (const n of spec.nodes) out.push(check(`a ${n.cell} is ${CELL_POTENCY[n.cell] || "?"}`, CELL_POTENCY[n.cell] === n.potency, `drawn as ${n.potency}`));
  for (const e of spec.edges) {
    const a = POTENCY.indexOf(N[e.from].potency), b = POTENCY.indexOf(N[e.to].potency);
    out.push(check(e.reprogram ? `reprogramming a ${N[e.from].cell} widens its potency` : `a ${N[e.from].cell} gives rise to a ${N[e.to].cell}: potency narrows or stays, never widens`, e.reprogram ? b < a : b >= a, `${N[e.from].potency} → ${N[e.to].potency}`));
  }
  return out;
}

// ======================================================================== envelope
// spec: panels: [{gram: "positive" | "negative", example, stain: "purple" | "pink", layers: [{kind, nm, label}]}]
//   layers from the outside in; kind: "lps" | "outer membrane" | "periplasm" | "peptidoglycan" | "plasma membrane" | "cytoplasm".
//   Layers are drawn to scale. Checks: the peptidoglycan is as thick as that kind of wall is (Gram-positive 20–80 nm,
//   Gram-negative 2–7 nm), only Gram-negative bacteria have an outer membrane, the stain follows from the wall (a thick
//   peptidoglycan layer with no outer membrane keeps crystal violet), and the example is that kind of bacterium.
export const GRAM = { Staphylococcus: "positive", Streptococcus: "positive", Bacillus: "positive", Clostridium: "positive", "E. coli": "negative", Salmonella: "negative", Neisseria: "negative", Pseudomonas: "negative" };
const PG = { positive: [20, 80], negative: [2, 7] };
function envelopePanel(p, x, y, w, narrow) {
  const sc = 2.6, bw = narrow ? 130 : 128, lx = x + 10, tx = lx + bw + 30;
  // the genus or species name in italics, as biological names are written
  let s = `<text x="${f1(x + 10)}" y="${f1(y + 12)}" font-size="13.5" font-weight="700" text-anchor="start" dominant-baseline="middle" fill="${C.ink}">Gram-${esc(p.gram)}, e.g. <tspan font-style="italic">${esc(p.example)}</tspan></text>`;
  const stainC = p.stain === "purple" ? C.a5 : C.a2;
  s += `<circle cx="${f1(x + 18)}" cy="${f1(y + 34)}" r="7" fill="${stainC}" fill-opacity=".8"/>` + text(x + 32, y + 34, p.stain === "purple" ? "keeps crystal violet: stains purple" : "loses crystal violet: counterstained pink", { size: 12, anchor: "start", fill: C.soft });
  let yy = y + 56;
  const items = [];
  for (const L of p.layers) {
    const h = Math.max(L.kind === "cytoplasm" ? 26 : 8, L.nm * sc), mid = yy + h / 2;
    if (L.kind === "peptidoglycan") {
      s += rect(lx, yy, bw, h, { fill: C.a3, op: 0.22, stroke: C.a3, sw: 1.2, rx: 0 });
      for (let k = lx + 3; k + 6 <= lx + bw - 3; k += 12) s += line(k, yy + 1, k + 6, yy + h - 1, { stroke: C.a3, w: 1 }) + line(k + 6, yy + 1, k, yy + h - 1, { stroke: C.a3, w: 1 });
    } else if (L.kind === "plasma membrane" || L.kind === "outer membrane") {
      const r = Math.min(4, h / 4);
      for (let k = lx + r; k < lx + bw; k += 2 * r + 1.6) s += `<circle cx="${f1(k)}" cy="${f1(yy + r)}" r="${f1(r)}" fill="${C.a4}" fill-opacity=".55"/><circle cx="${f1(k)}" cy="${f1(yy + h - r)}" r="${f1(r)}" fill="${C.a4}" fill-opacity=".55"/>`;
      s += line(lx, mid, lx + bw, mid, { stroke: C.line, w: 1, dash: "3 3" });
    } else if (L.kind === "lps") {
      for (let k = lx + 6; k < lx + bw; k += 11) s += `<path d="M${f1(k)} ${f1(yy + h)} q3 ${f1(-h / 3)} 0 ${f1(-h / 1.6)} q-3 ${f1(-h / 4)} 0 ${f1(-h / 2.8)}" fill="none" stroke="${C.a2}" stroke-width="1.6"/>`;
    } else if (L.kind === "cytoplasm") s += rect(lx, yy, bw, h, { fill: C.a1, op: 0.1, stroke: "none", rx: 0 });
    else s += rect(lx, yy, bw, h, { fill: C.panel, op: 1, stroke: "none", rx: 0 });
    items.push({ ay: mid, label: L.label || L.kind });
    yy += h;
  }
  // labels in a column to the right, spread so they never touch, each with a leader line to its layer
  let last = -1e9;
  for (const it of items) { it.ty = Math.max(it.ay, last + 19); last = it.ty; }
  for (const it of items) s += line(lx + bw + 2, it.ay, tx - 4, it.ty, { stroke: C.soft, w: 1 }) + text(tx, it.ty, it.label, { size: 12, anchor: "start" });
  return { s, H: Math.max(yy, last + 12) - y };
}
function envelopeDraw(spec, W, narrow) {
  let s = "", H = 0;
  if (narrow) { let y = 6; for (const p of spec.panels) { const r = envelopePanel(p, 0, y, W, true); s += r.s; y += r.H + 22; } H = y - 10; }
  else { const pw = W / spec.panels.length; spec.panels.forEach((p, i) => { const r = envelopePanel(p, i * pw, 6, pw, false); s += r.s; H = Math.max(H, r.H + 6); }); }
  // a scale bar, so the thicknesses can be read
  const sb = 10 * 2.6;
  s += line(10, H + 14, 10, H + 14 + sb, { stroke: C.ink, w: 2.4, cap: "butt" }) + text(18, H + 14 + sb / 2, "10 nm", { size: 11.5, anchor: "start", fill: C.soft });
  return { s, H: H + 14 + sb + 8 };
}
function envelopeChecks(spec) {
  const out = [];
  for (const p of spec.panels) {
    const pg = p.layers.filter((l) => l.kind === "peptidoglycan").reduce((a, l) => a + l.nm, 0), outer = p.layers.some((l) => l.kind === "outer membrane"), [lo, hi] = PG[p.gram] || [NaN, NaN];
    out.push(check(`Gram-${p.gram}: the peptidoglycan is ${lo}–${hi} nm thick`, pg >= lo && pg <= hi, `${pg} nm drawn`));
    out.push(check(`Gram-${p.gram}: ${p.gram === "negative" ? "has" : "has no"} outer membrane`, outer === (p.gram === "negative")));
    out.push(check(`Gram-${p.gram}: a plasma membrane surrounds the cytoplasm`, p.layers.some((l) => l.kind === "plasma membrane")));
    const stain = pg >= 20 && !outer ? "purple" : "pink";
    out.push(check(`Gram-${p.gram}: the stain follows from the wall (${stain})`, p.stain === stain));
    out.push(check(`${p.example} is Gram-${p.gram}`, GRAM[p.example] === p.gram, GRAM[p.example] ? `Gram-${GRAM[p.example]}` : "not in the table of known bacteria"));
  }
  return out;
}

// ======================================================================== codontable
// The standard genetic code as a table, drawn from the same code the translation checks use.
// spec: highlight: [{aa: "Leu", colour: "a1"}] shades every codon of that amino acid,
//   claims: [{type: "start", codon, aa} | {type: "stops", value: ["UAA", …]} | {type: "sense", value: 61}
//            | {type: "count", aa, value} | {type: "family", prefix: "GG", aa} | {type: "single", aa: ["Met", "Trp"]}]
const BASES4 = ["U", "C", "A", "G"];
export const CODONS = BASES4.flatMap((a) => BASES4.flatMap((b) => BASES4.map((c) => a + b + c)));
export const codonCount = (aa) => CODONS.filter((c) => codonToAA(c) === aa).length;
function codontableDraw(spec, W, narrow) {
  const HL = {};
  for (const h of spec.highlight || []) for (const c of CODONS) if (codonToAA(c) === h.aa) HL[c] = h.colour;
  const put = (c, x, y, size, aaDx) => {
    const aa = codonToAA(c), stop = aa === "Stop", start = c === "AUG", fill = stop ? C.bad : start ? C.good : C.ink;
    let s = HL[c] ? rect(x - 4, y - 9, aaDx + 40, 17, { fill: C[HL[c]], op: 0.2, stroke: "none", rx: 4 }) : "";
    return s + text(x, y, c, { size, weight: 700, anchor: "start", fill }) + text(x + aaDx, y, aa, { size, weight: stop || start ? 700 : 500, anchor: "start", fill: stop || start ? fill : C.ink });
  };
  let s = "";
  if (!narrow) {
    const L = 36, T = 40, cw = (W - L - 8) / 4, rh = 76;
    s += text(L + (4 * cw) / 2, 12, "second base", { size: 12, fill: C.soft }) + text(8, 12, "first base", { size: 12, anchor: "start", fill: C.soft });
    BASES4.forEach((b, j) => { s += text(L + (j + 0.5) * cw, 30, b, { size: 15, weight: 700 }); });
    BASES4.forEach((a, i) => {
      s += text(18, T + i * rh + rh / 2, a, { size: 15, weight: 700 });
      BASES4.forEach((b, j) => {
        const x0 = L + j * cw, y0 = T + i * rh;
        s += rect(x0, y0, cw, rh, { fill: "none", stroke: C.grid, sw: 1.2, rx: 0 });
        BASES4.forEach((c, k) => { s += put(a + b + c, x0 + 14, y0 + 12 + k * 16.4, 12.5, 48); });
      });
    });
    return { s, H: T + 4 * rh + 10 };
  }
  // phone: one block per first base; second base across, third base down
  const cw = (W - 20) / 4;
  let y = 8;
  BASES4.forEach((a) => {
    s += text(10, y + 8, `first base ${a}`, { size: 13, weight: 700, anchor: "start" });
    BASES4.forEach((b, j) => { s += text(10 + (j + 0.5) * cw, y + 28, `${a}${b}_`, { size: 12, weight: 700, fill: C.soft }); });
    BASES4.forEach((b, j) => BASES4.forEach((c, k) => { s += put(a + b + c, 14 + j * cw, y + 48 + k * 17, 11.5, 36); }));
    s += line(10, y + 48 + 3 * 17 + 14, W - 10, y + 48 + 3 * 17 + 14, { stroke: C.grid, w: 1.2 });
    y += 48 + 3 * 17 + 26;
  });
  return { s, H: y };
}
function codontableChecks(spec) {
  const out = [], sense = CODONS.filter((c) => codonToAA(c) !== "Stop");
  out.push(check("the table has 4³ = 64 codons", CODONS.length === 64 && new Set(CODONS).size === 64));
  for (const c of spec.claims || []) {
    if (c.type === "start") out.push(check(`${c.codon} codes for ${c.aa} and is the start codon`, codonToAA(c.codon) === c.aa, codonToAA(c.codon)));
    if (c.type === "stops") { const got = CODONS.filter((x) => codonToAA(x) === "Stop"); out.push(check(`the stop codons are ${c.value.join(", ")}`, got.join() === [...c.value].sort((a, b) => CODONS.indexOf(a) - CODONS.indexOf(b)).join(), got.join(", "))); }
    if (c.type === "sense") out.push(check(`${c.value} codons code for amino acids`, sense.length === c.value, `${sense.length}`));
    if (c.type === "amino") out.push(check(`${c.value} different amino acids are coded`, new Set(sense.map(codonToAA)).size === c.value, `${new Set(sense.map(codonToAA)).size}`));
    if (c.type === "count") out.push(check(`${c.aa} has ${c.value} codon${c.value > 1 ? "s" : ""}`, codonCount(c.aa) === c.value, `${codonCount(c.aa)}`));
    if (c.type === "family") out.push(check(`all four ${c.prefix}N codons code for ${c.aa}: the third base does not matter`, ["U", "C", "A", "G"].every((b) => codonToAA(c.prefix + b) === c.aa)));
    if (c.type === "single") out.push(check(`${c.aa.join(" and ")} have only one codon each`, c.aa.every((a) => codonCount(a) === 1)));
  }
  return out;
}

// ======================================================================== density
// Meselson and Stahl: bands of DNA in a density gradient after generations of growth in light nitrogen (¹⁴N) that
// began in heavy (¹⁵N). spec: groups: [{label, model: "semiconservative" | "conservative" | "dispersive", gens: [0, 1, 2],
// agrees: true | false}], observed: {"0": {heavy: 1}, "1": {hybrid: 1}, "2": {hybrid: 0.5, light: 0.5}}
// Each model's bands come from copying the strands: the check compares them with what was observed.
export function bandFractions(model, n) {
  if (n === 0) return { heavy: 1, hybrid: 0, light: 0 };
  if (model === "semiconservative") { const h = 2 / 2 ** n; return { heavy: 0, hybrid: h, light: 1 - h }; }
  if (model === "conservative") { const h = 1 / 2 ** n; return { heavy: h, hybrid: 0, light: 1 - h }; }
  return { heavy: 0, hybrid: 1, light: 0 }; // dispersive: every molecule mixed, getting lighter: one hybrid band, moving up
}
const BAND = { heavy: ["a2", "heavy (¹⁵N)"], hybrid: ["a5", "hybrid (one old strand, one new)"], light: ["a4", "light (¹⁴N)"] };
const fracMatch = (p, o) => ["heavy", "hybrid", "light"].every((k) => Math.abs((p[k] || 0) - (o[k] || 0)) < 1e-9);
function densityDraw(spec, W, narrow) {
  const th = 124, tw = 34, groups = spec.groups, n = groups.length;
  const gw = narrow ? W - 20 : (W - 20) / n;
  let s = "", y0 = 10, H = 0;
  const wrapAt = narrow ? 44 : Math.floor(gw / 7), maxLines = Math.max(...groups.map((g) => wrap(g.label, wrapAt).length));
  groups.forEach((g, gi) => {
    const gx = narrow ? 10 : 10 + gi * gw, gy = narrow ? y0 + gi * (th + 112) : y0;
    const lb = textBlock(gx + gw / 2, 0, g.label, wrapAt, { size: 13, weight: 700, fill: g.agrees ? C.good : C.bad });
    s += `<g transform="translate(0 ${f1(gy + 8 + ((lb.lines - 1) * 17) / 2)})">${lb.svg}</g>`;
    const top = gy + 12 + (narrow ? lb.lines : maxLines) * 17, step = Math.min(96, (gw - 20) / g.gens.length);
    g.gens.forEach((gen, k) => {
      const cx = gx + gw / 2 + (k - (g.gens.length - 1) / 2) * step;
      s += rect(cx - tw / 2, top, tw, th, { fill: "none", stroke: C.line, sw: 2, rx: 14 });
      const f = bandFractions(g.model, gen);
      [["light", 0.26], ["hybrid", 0.52], ["heavy", 0.78]].forEach(([key, at]) => {
        if (!f[key]) return;
        const bh = 5 + 20 * f[key];
        s += rect(cx - tw / 2 + 3, top + th * at - bh / 2, tw - 6, bh, { fill: C[BAND[key][0]], op: 0.85, stroke: "none", rx: 3 });
      });
      s += text(cx, top + th + 18, `gen ${gen}`, { size: 12, weight: 600, fill: C.soft });
    });
    H = Math.max(H, top + th + 30);
  });
  const ly = H + (narrow ? (n - 1) * (th + 112) : 0) + 6;
  Object.entries(BAND).forEach(([k, [t, label]], i) => {
    const yy = ly + i * 20;
    s += rect(14, yy - 6, 14, 12, { fill: C[t], op: 0.85, stroke: "none", rx: 3 }) + text(36, yy, label, { size: 12, anchor: "start" });
  });
  return { s, H: ly + 3 * 20 + 6 };
}
function densityChecks(spec) {
  const out = [];
  for (const g of spec.groups) {
    const bad = Object.entries(spec.observed).filter(([n, o]) => !fracMatch(bandFractions(g.model, +n), o)).map(([n]) => `generation ${n}`);
    out.push(check(`${g.model} copying ${g.agrees ? "gives the bands that were observed" : "does not give the bands that were observed"}`, (bad.length === 0) === !!g.agrees, bad.length ? `differs at ${bad.join(", ")}` : "matches every generation"));
  }
  return out;
}

// ======================================================================== crossover
// One crossover in prophase I between the two inner chromatids of a pair of homologues, with two linked genes.
// spec: genes: [{alleles: ["A", "a"]}, {alleles: ["B", "b"]}], crossover: "between" | "outside",
//   claims: [{type: "recombinant", value: 2} | {type: "parental", value: 2} | {type: "max", value: 0.5}]
export function chromatidsAfter(spec) {
  const [g1, g2] = spec.genes, H1 = [g1.alleles[0], g2.alleles[0]], H2 = [g1.alleles[1], g2.alleles[1]];
  const before = [H1, H1, H2, H2].map((c) => c.slice());
  const after = before.map((c) => c.slice());
  if (spec.crossover === "between") { after[1][1] = before[2][1]; after[2][1] = before[1][1]; }
  const parental = after.filter((c) => (c.join() === H1.join()) || (c.join() === H2.join())).length;
  return { before, after, parental, recombinant: 4 - parental, H1, H2 };
}
function crossoverDraw(spec, W, narrow) {
  const X = chromatidsAfter(spec), bh = 130, bw = 15, gap = 14;
  const stage = (cx, y, chromatids, title, tags) => {
    let s = textBlock(cx, 0, title, narrow ? 24 : 26, { size: 12.5, weight: 700 });
    const out = [`<g transform="translate(0 ${f1(y + ((s.lines - 1) * 16) / 2)})">${s.svg}</g>`];
    const x0 = cx - (4 * bw + 3 * gap) / 2, top = y + 12 + s.lines * 16;
    chromatids.forEach((c, i) => {
      const x = x0 + i * (bw + gap);
      // the top segment keeps the colour of its homologue; the bottom segment is coloured by where its allele came from
      const top1 = c[0] === X.H1[0] ? "a1" : "a2", bot1 = c[1] === X.H1[1] ? "a1" : "a2";
      out.push(rect(x, top, bw, bh / 2, { fill: C[top1], op: 0.8, stroke: C[top1], sw: 1, rx: 4 }) + rect(x, top + bh / 2, bw, bh / 2, { fill: C[bot1], op: 0.8, stroke: C[bot1], sw: 1, rx: 4 }));
      out.push(text(x + bw / 2, top + bh * 0.24, c[0], { size: 13, weight: 800, fill: "#ffffff" }) + text(x + bw / 2, top + bh * 0.76, c[1], { size: 13, weight: 800, fill: "#ffffff" }));
      if (tags) out.push(text(x + bw / 2, top + bh + 16, tags[i] === "recombinant" ? "R" : "P", { size: 13, weight: 800, fill: tags[i] === "recombinant" ? C.a3 : C.soft }));
    });
    return { svg: out.join(""), top, h: bh + (tags ? 34 : 12) + s.lines * 16 + 12 };
  };
  const tags = X.after.map((c) => (c.join() === X.H1.join() || c.join() === X.H2.join() ? "parental" : "recombinant"));
  let s = "", H;
  if (narrow) {
    const a = stage(W / 2, 16, X.before, "prophase I: homologues paired, two chromatids each", null);
    s += a.svg; const y2 = 16 + a.h + 30;
    s += arrow(W / 2, 16 + a.h - 6, W / 2, y2 - 8, { w: 2, head: 9 }) + text(W / 2 + 12, 16 + a.h + 8, "crossover", { size: 12, weight: 700, anchor: "start", fill: C.a3 });
    const b = stage(W / 2, y2, X.after, spec.crossover === "between" ? "after a crossover between the genes" : "after a crossover beyond both genes", tags);
    s += b.svg; H = y2 + b.h;
  } else {
    const a = stage(W * 0.25, 16, X.before, "prophase I: homologues paired, two chromatids each", null), b = stage(W * 0.75, 16, X.after, spec.crossover === "between" ? "after a crossover between the genes" : "after a crossover beyond both genes", tags);
    s += a.svg + b.svg + arrow(W * 0.25 + 90, 16 + 12 + 32 + bh / 2, W * 0.75 - 90, 16 + 12 + 32 + bh / 2, { w: 2, head: 10 }) + text(W / 2, 16 + 12 + 32 + bh / 2 - 12, "crossover", { size: 12.5, weight: 700, fill: C.a3 });
    H = 16 + Math.max(a.h, b.h);
  }
  s += text(W / 2, H + 8, "P = parental chromatid     R = recombinant chromatid", { size: 12, fill: C.soft });
  return { s, H: H + 26 };
}
function crossoverChecks(spec) {
  const X = chromatidsAfter(spec), out = [];
  out.push(check("each homologue contributes two identical chromatids before the crossover", X.before[0].join() === X.before[1].join() && X.before[2].join() === X.before[3].join()));
  out.push(check("a crossover swaps the ends of two non-sister chromatids: the allele counts stay the same", [0, 1].every((i) => X.after.filter((c) => c[i] === spec.genes[i].alleles[0]).length === 2)));
  for (const c of spec.claims || []) {
    if (c.type === "recombinant") out.push(check(`${c.value} of the 4 chromatids are recombinant`, X.recombinant === c.value, `${X.recombinant}`));
    if (c.type === "parental") out.push(check(`${c.value} of the 4 chromatids stay parental`, X.parental === c.value, `${X.parental}`));
    if (c.type === "max") out.push(check(`at most ${c.value * 100}% of the products are recombinant even with a crossover: the recombination frequency cannot pass 50%`, X.recombinant / 4 <= c.value, `${(X.recombinant / 4) * 100}%`));
  }
  return out;
}

// ======================================================================== ploidy
// Mitosis and meiosis from the same parent cell, with the chromosomes worked out, not drawn by hand.
// spec: pairs: 2 (homologous pairs, so 2n = 2 × pairs), crossover: true | false (one crossover in the first pair during meiosis),
//   claims: [{type: "cells", process, value} | {type: "chromosomes", process, value} | {type: "identical", process, value: true | false}
//            | {type: "divisions", process, value}]
// A chromosome is a string of two letters, the origin (m = maternal, p = paternal) of its top and bottom halves.
export function divide(process, pairs, crossover) {
  const parent = []; // after S phase: every chromosome is two identical chromatids
  for (let i = 0; i < pairs; i++) parent.push({ pair: i, chroms: ["mm", "pp"] });
  const homologues = parent.flatMap((p) => p.chroms);
  if (process === "mitosis") return { divisions: 1, cells: [homologues.slice(), homologues.slice()] };
  // meiosis I separates the homologues (all maternal to one pole, all paternal to the other: one orientation);
  // meiosis II separates the sister chromatids. A crossover in pair 0 swaps the bottom halves of one chromatid of each homologue.
  const cellsI = [parent.map(() => "mm"), parent.map(() => "pp")];
  const out = [];
  cellsI.forEach((cell, k) => {
    const sisters = [cell.slice(), cell.slice()];
    if (crossover) { sisters[0][0] = k === 0 ? "mm" : "pp"; sisters[1][0] = k === 0 ? "mp" : "pm"; }
    out.push(...sisters);
  });
  return { divisions: 2, cells: out };
}
const sig = (cell) => [...cell].sort().join("|");
function chromRod(x, y, c, w = 6, h = 24) {
  const col = (o) => (o === "m" ? C.a1 : C.a2);
  return rect(x - w / 2, y - h / 2, w, h / 2, { fill: col(c[0]), op: 0.9, stroke: "none", rx: 2 }) + rect(x - w / 2, y, w, h / 2, { fill: col(c[1]), op: 0.9, stroke: "none", rx: 2 });
}
function drawCell(cx, cy, chroms, doubled) {
  const r = 34, n = chroms.length, gap = Math.min(15, (2 * r - 20) / Math.max(1, n));
  let s = `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${r}" fill="${C.panel}" stroke="${C.line}" stroke-width="2"/>`;
  chroms.forEach((c, i) => {
    const x = cx + (i - (n - 1) / 2) * gap * (doubled ? 1.5 : 1);
    s += doubled ? chromRod(x - 3.5, cy, c, 5, 24) + chromRod(x + 3.5, cy, c, 5, 24) : chromRod(x, cy, c);
  });
  return s;
}
function ploidyDraw(spec, W, narrow) {
  const pairs = spec.pairs || 2, procs = ["mitosis", "meiosis"], rowH = narrow ? 210 : 150;
  let s = "";
  procs.forEach((p, ri) => {
    const R = divide(p, pairs, !!spec.crossover), y0 = 14 + ri * rowH, parent = R.cells.length ? [].concat(...Array.from({ length: pairs }, () => ["mm", "pp"])) : [];
    const lab = p === "mitosis" ? ["mitosis", "one division"] : ["meiosis", "two divisions"];
    if (narrow) {
      s += text(10, y0 + 6, lab[0], { size: 15, weight: 800, anchor: "start", fill: p === "mitosis" ? C.a1 : C.a2 }) + text(10 + lab[0].length * 9.5 + 10, y0 + 6, lab[1], { size: 12, anchor: "start", fill: C.soft });
      s += drawCell(52, y0 + 56, parent, true) + text(52, y0 + 104, `2n = ${2 * pairs}, copied`, { size: 11, fill: C.soft });
      s += arrow(96, y0 + 56, 130, y0 + 56, { w: 2, head: 9 });
      const k = R.cells.length, sx = (W - 150) / k;
      R.cells.forEach((cell, i) => { const cx = 150 + sx * (i + 0.5) - (k === 4 ? 6 : 0); s += drawCell(cx, y0 + 56, cell, false).replace(/r="34"/, 'r="' + (k === 4 ? 27 : 30) + '"'); s += text(cx, y0 + 104, p === "mitosis" ? `2n = ${cell.length}` : `n = ${cell.length}`, { size: 11, fill: C.soft }); });
    } else {
      s += text(10, y0 + 52, lab[0], { size: 16, weight: 800, anchor: "start", fill: p === "mitosis" ? C.a1 : C.a2 }) + text(10, y0 + 72, lab[1], { size: 12, anchor: "start", fill: C.soft });
      s += drawCell(190, y0 + 56, parent, true) + text(190, y0 + 106, `2n = ${2 * pairs}, after S phase`, { size: 11.5, fill: C.soft });
      s += arrow(240, y0 + 56, 300, y0 + 56, { w: 2, head: 10 });
      const k = R.cells.length;
      R.cells.forEach((cell, i) => { const cx = 360 + i * 92; s += drawCell(cx, y0 + 56, cell, false) + text(cx, y0 + 106, p === "mitosis" ? `2n = ${cell.length}` : `n = ${cell.length}`, { size: 11.5, fill: C.soft }); });
    }
  });
  const ky = 14 + 2 * rowH - 4;
  s += rect(10, ky - 6, 12, 12, { fill: C.a1, op: 0.9, stroke: "none", rx: 2 }) + text(28, ky, "maternal", { size: 12, anchor: "start" }) + rect(100, ky - 6, 12, 12, { fill: C.a2, op: 0.9, stroke: "none", rx: 2 }) + text(118, ky, "paternal", { size: 12, anchor: "start" });
  if (spec.crossover) { if (narrow) { s += text(10, ky + 22, "a two-coloured chromosome has crossed over", { size: 12, anchor: "start", fill: C.soft }); return { s, H: ky + 40 }; } s += text(190, ky, "a two-coloured chromosome is one that crossed over", { size: 12, anchor: "start", fill: C.soft }); }
  return { s, H: ky + 18 };
}
function ploidyChecks(spec) {
  const out = [], pairs = spec.pairs || 2, M = divide("mitosis", pairs, false), E = divide("meiosis", pairs, !!spec.crossover);
  const parentSig = sig(Array.from({ length: pairs }, () => ["mm", "pp"]).flat());
  out.push(check("mitosis: both daughters have the parent's full diploid set, so they are identical to it and to each other", M.cells.length === 2 && M.cells.every((c) => sig(c) === parentSig)));
  out.push(check(`meiosis: four cells, each with half the chromosomes (n = ${pairs}), one from each homologous pair`, E.cells.length === 4 && E.cells.every((c) => c.length === pairs)));
  out.push(check("meiosis: the cells are genetically different from the parent", E.cells.every((c) => sig(c) !== parentSig)));
  const distinct = new Set(E.cells.map(sig)).size;
  out.push(check(`meiosis: ${spec.crossover ? "with a crossover all four cells differ from each other" : "without crossing over the cells come in identical pairs"}`, spec.crossover ? distinct === 4 : distinct < 4, `${distinct} different cells`));
  for (const c of spec.claims || []) {
    const R = divide(c.process, pairs, !!spec.crossover);
    if (c.type === "cells") out.push(check(`${c.process} gives ${c.value} cells`, R.cells.length === c.value, `${R.cells.length}`));
    if (c.type === "divisions") out.push(check(`${c.process} has ${c.value} division${c.value > 1 ? "s" : ""}`, R.divisions === c.value, `${R.divisions}`));
    if (c.type === "chromosomes") out.push(check(`each ${c.process} product has ${c.value} chromosomes`, R.cells.every((x) => x.length === c.value), `${R.cells[0].length}`));
  }
  return out;
}

// ======================================================================== layers
// The three germ layers of a gastrula and what each becomes.
// spec: layers: [{name: "ectoderm" | "mesoderm" | "endoderm", items: [...]}], every item is checked against the table below.
export const GERM = {
  ectoderm: ["epidermis of the skin", "nervous system", "brain", "spinal cord"],
  mesoderm: ["muscle", "bone", "blood", "heart", "kidneys", "gonads"],
  endoderm: ["lining of the gut", "lining of the respiratory tract", "liver", "pancreas"],
};
function layersDraw(spec, W, narrow) {
  const tone = { ectoderm: "a1", mesoderm: "a3", endoderm: "a4" }, ring = { ectoderm: 1, mesoderm: 0.68, endoderm: 0.38 };
  const R = narrow ? 84 : 100, cx = narrow ? W / 2 : 14 + R, cy = (narrow ? 8 : 10) + R;
  let s = "";
  for (const L of spec.layers) s += `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(R * ring[L.name])}" fill="${C[tone[L.name]]}" fill-opacity="0.22" stroke="${C[tone[L.name]]}" stroke-width="2.4"/>`;
  s += text(cx, cy, "gut cavity", { size: 11.5, fill: C.soft });
  let y = narrow ? cy + R + 26 : 14;
  const tx = narrow ? 10 : 2 * R + 56, tw = narrow ? W - 20 : W - tx - 10;
  for (const L of spec.layers) {
    const c = C[tone[L.name]];
    s += rect(tx, y - 2, 14, 14, { fill: c, op: 0.3, stroke: c, sw: 2, rx: 4 }) + text(tx + 22, y + 5, `${L.name} (${L.position})`, { size: 14, weight: 800, anchor: "start", fill: c });
    const tb = textBlock(tx + 22, 0, L.items.join(", "), Math.floor((tw - 22) / 6.8), { size: 12.5, anchor: "start" });
    s += `<g transform="translate(0 ${f1(y + 26 + ((tb.lines - 1) * 16) / 2)})">${tb.svg}</g>`;
    y += 36 + tb.lines * 16 + 12;
  }
  return { s, H: Math.max(y, 2 * R + 24) };
}
function layersChecks(spec) {
  const out = [check("the embryo has three germ layers: it is triploblastic", spec.layers.length === 3 && new Set(spec.layers.map((l) => l.name)).size === 3)];
  for (const L of spec.layers) {
    const bad = L.items.filter((i) => !(GERM[L.name] || []).includes(i));
    out.push(check(`everything listed under ${L.name} develops from the ${L.name}`, !bad.length, bad.length ? `not from ${L.name}: ${bad.join(", ")}` : `${L.items.length} tissues`));
  }
  const all = spec.layers.flatMap((l) => l.items);
  out.push(check("no tissue is listed under two layers", new Set(all).size === all.length));
  return out;
}

// ======================================================================== drift
// Genetic drift: a Wright–Fisher simulation, run with a fixed seed so the picture never changes.
// spec: seed, p0, gens, reps (lines drawn per panel), panels: [{N, label}] where N is the number of gene copies,
//   claims: [{type: "theory", N, tol}  the spread over many runs matches p0(1-p0)(1-(1-1/N)^t)
//            | {type: "moreSpread", small, large, factor} | {type: "reaches", N, value: true | false} (any drawn line fixed or lost)]
function mulberry(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
export function wrightFisher(N, p0, gens, rnd) {
  const out = [p0]; let p = p0;
  for (let g = 0; g < gens; g++) { let k = 0; for (let i = 0; i < N; i++) if (rnd() < p) k++; p = k / N; out.push(p); }
  return out;
}
const finalSpread = (N, p0, gens, runs, seed) => { const r = mulberry(seed), f = Array.from({ length: runs }, () => wrightFisher(N, p0, gens, r).at(-1)), m = f.reduce((a, b) => a + b, 0) / runs; return Math.sqrt(f.reduce((a, b) => a + (b - m) ** 2, 0) / runs); };
const theorySd = (N, p0, gens) => Math.sqrt(p0 * (1 - p0) * (1 - (1 - 1 / N) ** gens));
function driftRuns(spec, N, pi) { const r = mulberry(spec.seed + 1000 * pi); return Array.from({ length: spec.reps }, () => wrightFisher(N, spec.p0, spec.gens, r)); }
function driftDraw(spec, W, narrow) {
  const n = spec.panels.length, ph = narrow ? 230 : 260, gap = 16, pw = narrow ? W - 20 : (W - 20 - gap * (n - 1)) / n;
  const colours = ["a1", "a2", "a3", "a4", "a5", "good"];
  let s = "";
  spec.panels.forEach((P, pi) => {
    const x0 = 10 + (narrow ? 0 : pi * (pw + gap)), y0 = 10 + (narrow ? pi * (ph + 20) : 0), l = 40, b = 36, t = 34, r = 10;
    const sx = (g) => x0 + l + (g / spec.gens) * (pw - l - r), sy = (p) => y0 + t + (1 - p) * (ph - t - b);
    s += text(x0 + pw / 2, y0 + 12, P.label, { size: 13.5, weight: 700 });
    s += line(x0 + l, sy(0), x0 + pw - r, sy(0), { stroke: C.line, w: 1.6 }) + line(x0 + l, sy(0), x0 + l, sy(1), { stroke: C.line, w: 1.6 });
    for (const v of [0, 0.5, 1]) s += text(x0 + l - 6, sy(v), String(v), { size: 11.5, anchor: "end", fill: C.soft }) + (v ? line(x0 + l, sy(v), x0 + pw - r, sy(v), { stroke: C.grid, w: 1 }) : "");
    for (const g of [0, spec.gens / 2, spec.gens]) s += text(sx(g), sy(0) + 14, String(g), { size: 11.5, fill: C.soft });
    s += text(x0 + l + (pw - l - r) / 2, sy(0) + 29, "generation", { size: 11.5, fill: C.soft }) + text(x0 + 4, y0 + t - 12, "allele frequency", { size: 11.5, anchor: "start", fill: C.soft });
    driftRuns(spec, P.N, pi).forEach((run, k) => { s += `<path d="${run.map((p, g) => `${g ? "L" : "M"}${f1(sx(g))} ${f1(sy(p))}`).join(" ")}" fill="none" stroke="${C[colours[k % 6]]}" stroke-width="2.2" stroke-linejoin="round"/>`; });
    s += line(x0 + l, sy(spec.p0), x0 + pw - r, sy(spec.p0), { stroke: C.ink, w: 1.2, dash: "5 5" });
  });
  return { s, H: 10 + (narrow ? n * (ph + 20) : ph) };
}
function driftChecks(spec) {
  const out = [];
  out.push(check("every frequency stays between 0 and 1, and an allele that reaches 0 or 1 stays there", spec.panels.every((P, pi) => driftRuns(spec, P.N, pi).every((run) => run.every((p, g) => p >= 0 && p <= 1 && (g === 0 || (run[g - 1] !== 0 && run[g - 1] !== 1) || p === run[g - 1]))))));
  for (const c of spec.claims || []) {
    if (c.type === "theory") { const sim = finalSpread(c.N, spec.p0, spec.gens, 400, 7), th = theorySd(c.N, spec.p0, spec.gens); out.push(check(`N = ${c.N}: the spread of final frequencies (${sim.toFixed(3)}) matches the Wright–Fisher expectation (${th.toFixed(3)})`, Math.abs(sim - th) / th <= (c.tol ?? 0.15), `${(Math.abs(sim - th) / th * 100).toFixed(1)}% apart over 400 runs`)); }
    if (c.type === "moreSpread") { const a = finalSpread(c.small, spec.p0, spec.gens, 400, 11), b = finalSpread(c.large, spec.p0, spec.gens, 400, 13); out.push(check(`drift moves allele frequencies further in the small population (N = ${c.small}) than in the large one (N = ${c.large})`, a > b * (c.factor || 1), `spread ${a.toFixed(3)} against ${b.toFixed(3)}`)); }
    if (c.type === "reaches") { const pi = spec.panels.findIndex((P) => P.N === c.N), any = driftRuns(spec, c.N, pi).some((run) => run.at(-1) === 0 || run.at(-1) === 1); out.push(check(`N = ${c.N}: ${c.value ? "some line is lost or fixed" : "no line is lost or fixed"} within ${spec.gens} generations`, any === c.value)); }
  }
  return out;
}

// ======================================================================== cladogram
// An evolutionary tree with the characters that define its clades.
// spec: tree: nested arrays, a leaf is a taxon name, e.g. ["lancelet", ["shark", ["frog", ["lizard", "mouse"]]]],
//   characters: [{name, taxa: [...]}] (the taxa that have the derived character),
//   claims: [{type: "closer", taxa: [a, b], than: [a, c]} | {type: "oneStep"} | {type: "clade", taxa: [...]}]
const leavesOf = (t) => (typeof t === "string" ? [t] : t.flatMap(leavesOf));
const sameSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x));
function nodesOf(t, path = []) { const ls = leavesOf(t); return [{ node: t, path, leaves: ls }, ...(typeof t === "string" ? [] : t.flatMap((c, i) => nodesOf(c, [...path, i])))]; }
const depthOfMrca = (tree, a, b) => Math.max(...nodesOf(tree).filter((n) => n.leaves.includes(a) && n.leaves.includes(b)).map((n) => n.path.length));
// Fitch parsimony: the fewest changes of a binary character on this tree
function fitchSteps(tree, has) {
  let steps = 0;
  const go = (t) => { if (typeof t === "string") return new Set([has.includes(t) ? 1 : 0]); const sets = t.map(go); let inter = new Set([...sets[0]].filter((x) => sets.every((s) => s.has(x)))); if (inter.size) return inter; steps++; return new Set(sets.flatMap((s) => [...s])); };
  const root = go(tree); return steps + (root.has(0) ? 0 : 1); // the root is taken to lack the character
}
function cladogramDraw(spec, W, narrow) {
  const leaves = leavesOf(spec.tree), nodes = nodesOf(spec.tree), maxDepth = Math.max(...nodes.map((n) => n.path.length));
  const rowH = narrow ? 34 : 40, left = 18, right = narrow ? 86 : 120, top = 20, xAt = (depth) => left + (depth / maxDepth) * (W - left - right - 10);
  const yOf = new Map(), ps = (n) => n.path.join(",");
  leaves.forEach((l, i) => yOf.set(l, top + i * rowH));
  const pos = new Map();
  const place = (t, path) => { if (typeof t === "string") { pos.set(path.join(","), [W - right, yOf.get(t)]); return yOf.get(t); } const ys = t.map((c, i) => place(c, [...path, i])), y = (Math.min(...ys) + Math.max(...ys)) / 2; pos.set(path.join(","), [xAt(path.length), y]); return y; };
  place(spec.tree, []);
  let s = "";
  const stem = [xAt(0) - 14, pos.get("")[1]];
  s += line(stem[0], stem[1], pos.get("")[0], pos.get("")[1], { stroke: C.ink, w: 2.2 });
  for (const n of nodes) {
    if (typeof n.node === "string") continue;
    const [x, y] = pos.get(ps(n)), kids = n.node.map((_, i) => pos.get([...n.path, i].join(",")));
    s += line(x, Math.min(...kids.map((k) => k[1])), x, Math.max(...kids.map((k) => k[1])), { stroke: C.ink, w: 2.2 });
    for (const k of kids) s += line(x, k[1], k[0], k[1], { stroke: C.ink, w: 2.2 });
  }
  for (const l of leaves) s += text(W - right + 8, yOf.get(l), l, { size: 13, weight: 600, anchor: "start" });
  // characters: a numbered marker on the branch leading to the clade that has it; several on one branch sit side by side
  const where = spec.characters.map((ch) => nodes.find((x) => sameSet(x.leaves, ch.taxa)));
  spec.characters.forEach((ch, i) => {
    const n = where[i]; if (!n) return;
    const [x, y] = pos.get(ps(n)), px = n.path.length ? pos.get(n.path.slice(0, -1).join(","))[0] : stem[0];
    const group = where.map((m, k) => (m && ps(m) === ps(n) ? k : -1)).filter((k) => k >= 0), j = group.indexOf(i);
    const mx = (px + x) / 2 + (j - (group.length - 1) / 2) * 22;
    s += `<circle cx="${f1(mx)}" cy="${f1(y)}" r="9" fill="var(--vx-bg, #ffffff)" stroke="${C.a2}" stroke-width="1.8"/>` + text(mx, y + 0.5, String(i + 1), { size: 11, weight: 800, fill: C.a2 });
  });
  const ky = top + leaves.length * rowH + 4;
  spec.characters.forEach((ch, i) => { s += text(14, ky + 8 + i * 20, `${i + 1}  ${ch.name}`, { size: 12.5, anchor: "start" }); });
  return { s, H: ky + 8 + spec.characters.length * 20 + 6 };
}
function cladogramChecks(spec) {
  const out = [], nodes = nodesOf(spec.tree), leaves = leavesOf(spec.tree);
  out.push(check("every taxon appears once on the tree", new Set(leaves).size === leaves.length));
  for (const ch of spec.characters) {
    const fits = nodes.some((n) => sameSet(n.leaves, ch.taxa));
    out.push(check(`"${ch.name}" is shared by exactly one clade (${ch.taxa.join(", ")}) and so arose once`, fits && fitchSteps(spec.tree, ch.taxa) === 1, `${fitchSteps(spec.tree, ch.taxa)} change(s) on this tree`));
  }
  for (const c of spec.claims || []) {
    if (c.type === "closer") out.push(check(`${c.taxa.join(" and ")} share a more recent common ancestor than ${c.than.join(" and ")}`, depthOfMrca(spec.tree, ...c.taxa) > depthOfMrca(spec.tree, ...c.than)));
    if (c.type === "clade") out.push(check(`${c.taxa.join(", ")} form a clade: an ancestor and all of its descendants`, nodes.some((n) => sameSet(n.leaves, c.taxa))));
  }
  return out;
}

// ======================================================================== sarcomere
// A sarcomere relaxed and contracted: the filaments slide, they do not shorten.
// spec: thick: length of a myosin filament in µm, thin: length of an actin filament from its Z line,
//   states: [{label, L}] sarcomere length (Z line to Z line) in µm,
//   claims: [{type: "filamentsConstant"} | {type: "shorter", from, to} | {type: "bands", state, A, I, H}]
export function bandsOf(spec, L) { return { A: spec.thick, I: Math.max(0, L - spec.thick), H: Math.max(0, L - 2 * spec.thin) }; }
function sarcomereDraw(spec, W, narrow) {
  const pad = 20, k = (W - 2 * pad) / Math.max(...spec.states.map((s) => s.L)), rowH = narrow ? 168 : 176;
  let s = "";
  spec.states.forEach((st, i) => {
    const y = 14 + i * rowH, B = bandsOf(spec, st.L), x0 = pad + ((Math.max(...spec.states.map((q) => q.L)) - st.L) * k) / 2, x1 = x0 + st.L * k, mid = y + 70;
    s += text(pad, y, st.label, { size: 14, weight: 800, anchor: "start", fill: C.a1 }) + text(W - pad, y, `sarcomere ${st.L} µm`, { size: 12, anchor: "end", fill: C.soft });
    // thin filaments from each Z line (two rows), thick filament in the middle
    for (const dy of [-13, 13]) {
      s += line(x0, mid + dy, x0 + spec.thin * k, mid + dy, { stroke: C.a2, w: 4, cap: "butt" }) + line(x1, mid + dy, x1 - spec.thin * k, mid + dy, { stroke: C.a2, w: 4, cap: "butt" });
    }
    const tx = (x0 + x1) / 2 - (spec.thick * k) / 2;
    s += rect(tx, mid - 5, spec.thick * k, 10, { fill: C.a4, op: 0.85, stroke: "none", rx: 3 });
    s += line(x0, mid - 30, x0, mid + 30, { stroke: C.ink, w: 3 }) + line(x1, mid - 30, x1, mid + 30, { stroke: C.ink, w: 3 }) + text(x0, mid - 38, "Z", { size: 11.5, weight: 700 }) + text(x1, mid - 38, "Z", { size: 11.5, weight: 700 });
    // the bands, to scale, under the filaments
    const by = mid + 44;
    s += rect(tx, by - 5, B.A * k, 10, { fill: C.a4, op: 0.5, stroke: C.a4, sw: 1.2, rx: 2 });
    s += rect(x0, by - 5, (tx - x0), 10, { fill: C.a1, op: 0.3, stroke: C.a1, sw: 1.2, rx: 2 }) + rect(tx + B.A * k, by - 5, x1 - (tx + B.A * k), 10, { fill: C.a1, op: 0.3, stroke: C.a1, sw: 1.2, rx: 2 });
    if (B.H > 0) s += rect((x0 + x1) / 2 - (B.H * k) / 2, by + 9, B.H * k, 9, { fill: C.a3, op: 0.55, stroke: C.a3, sw: 1.2, rx: 2 });
    s += text(pad, by + 34, `A band ${B.A} µm  ·  I band ${+B.I.toFixed(2)} µm  ·  H zone ${+B.H.toFixed(2)} µm`, { size: 12, anchor: "start" });
  });
  const ky = 14 + spec.states.length * rowH + 6;
  s += line(pad, ky, pad + 22, ky, { stroke: C.a2, w: 4, cap: "butt" }) + text(pad + 28, ky, "actin (thin)", { size: 12, anchor: "start" }) + rect(pad + 118, ky - 5, 22, 10, { fill: C.a4, op: 0.85, stroke: "none", rx: 3 }) + text(pad + 146, ky, "myosin (thick)", { size: 12, anchor: "start" });
  return { s, H: ky + 14 };
}
function sarcomereChecks(spec) {
  const out = [], [a, b] = spec.states.map((st) => bandsOf(spec, st.L));
  out.push(check("the thick and thin filaments are the same length in both states: they slide past each other, they do not shorten", spec.thick > 0 && spec.thin > 0 && spec.states.length === 2));
  out.push(check("the contracted sarcomere is shorter than the relaxed one", spec.states[1].L < spec.states[0].L, `${spec.states[1].L} µm against ${spec.states[0].L} µm`));
  out.push(check("the A band (the length of the thick filaments) does not change", a.A === b.A, `${a.A} µm in both`));
  out.push(check("the I band (actin only) shortens on contraction", b.I < a.I, `${a.I.toFixed(2)} → ${b.I.toFixed(2)} µm`));
  out.push(check("the H zone (myosin only) shortens on contraction", b.H < a.H || (a.H > 0 && b.H === 0), `${a.H.toFixed(2)} → ${b.H.toFixed(2)} µm`));
  for (const c of spec.claims || []) if (c.type === "shortening") out.push(check(`the sarcomere shortens by ${c.value} µm while every filament keeps its length`, Math.abs(spec.states[0].L - spec.states[1].L - c.value) < 1e-9));
  return out;
}

// ======================================================================== carbonflow
// A cycle or pathway drawn by the shared flow renderer whose atoms must balance at every step.
// spec: nodes, edges (as in flow), balance: [{name, in: [[molecules, carbons each], …], out: [[…]]}]
function carbonflowChecks(spec) {
  const out = [], tot = (side) => side.reduce((a, [n, c]) => a + n * c, 0);
  for (const b of spec.balance || []) out.push(check(`${b.name}: ${tot(b.in)} carbon atoms in, ${tot(b.out)} out`, tot(b.in) === tot(b.out), b.in.map(([n, c]) => `${n}×${c}C`).join(" + ") + " → " + b.out.map(([n, c]) => `${n}×${c}C`).join(" + ")));
  if (!(spec.balance || []).length) out.push(check("the spec states the steps it balances", false));
  return out;
}

register({
  cross: { draw: crossDraw, checks: crossChecks, widths: [600, 380] },
  strand: { draw: strandDraw, checks: strandChecks, widths: [760, 380] },
  pyramid: { draw: pyramidDraw, checks: pyramidChecks, widths: [720, 380] },
  pedigree: { draw: pedigreeDraw, checks: pedigreeChecks, widths: [620, 380] },
  cellmap: { draw: cellmapDraw, checks: cellmapChecks, widths: [720, 380] },
  membrane: { draw: membraneDraw, checks: membraneChecks, widths: [720, 380] },
  tonicity: { draw: tonicityDraw, checks: tonicityChecks, widths: [720, 380] },
  route: { draw: flowDraw, checks: routeChecks, widths: [700, 380] },
  lineage: { draw: flowDraw, checks: lineageChecks, widths: [700, 380] },
  envelope: { draw: envelopeDraw, checks: envelopeChecks, widths: [700, 380] },
  codontable: { draw: codontableDraw, checks: codontableChecks, widths: [720, 380] },
  density: { draw: densityDraw, checks: densityChecks, widths: [700, 380] },
  crossover: { draw: crossoverDraw, checks: crossoverChecks, widths: [700, 380] },
  ploidy: { draw: ploidyDraw, checks: ploidyChecks, widths: [700, 380] },
  layers: { draw: layersDraw, checks: layersChecks, widths: [700, 380] },
  drift: { draw: driftDraw, checks: driftChecks, widths: [700, 380] },
  cladogram: { draw: cladogramDraw, checks: cladogramChecks, widths: [620, 380] },
  carbonflow: { draw: flowDraw, checks: carbonflowChecks, widths: [700, 380] },
  sarcomere: { draw: sarcomereDraw, checks: sarcomereChecks, widths: [660, 380] },
});
