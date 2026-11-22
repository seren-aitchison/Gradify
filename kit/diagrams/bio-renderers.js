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
//   cleavage   the zygote dividing without growing: each cell's area recomputed, doubling, the lesson's days
//   fertilisation  the steps in order (acrosome, fusion, cortical reaction, nuclei), one sperm in, 23 + 23 = 46
//   cytometry  a seeded flow-cytometry simulation: gate and positive percentages are counted from the events
//   karyotype  chromosome numbers worked out from copies; the notation rebuilt (47,XX,+21) and syndromes checked
//   plasmidmap a circular vector map: required features, no overlaps, unique cutters in the MCS, digest fragments add up
//   fragment   habitat fragmentation on a grid: patches, edge and core cells counted from the grid
//   bionetwork a seeded preferential-attachment network: hubs, degree counts and the heavy tail checked
//   phscale    the pH scale: [H+] = 10^-pH at every unit, tenfold steps, the lesson's markers and worked example
//   repair     which repair for which damage, and nucleotide excision repair worked on a real sequence
//   cascade    the complement cascade: triggers, convergence on C3, and the three effects, every arrow a real step
//   tract      the circulation, airway or gut as a route (drawn as a flow): every step is one blood, air or food really takes
//   lineage    stem cell to specialised cell (drawn as a flow): potencies as classified, never widening
//   envelope   Gram-positive and Gram-negative walls to scale: thickness, outer membrane and the stain agree
//   codontable the standard genetic code: 64 codons, 61 sense, 3 stop, start AUG, degeneracy claims
//   density    Meselson–Stahl density bands: each copying model's bands are worked out and compared with what was seen
//   crossover  a crossover between linked genes: which chromatids are parental and which recombinant
//   ploidy     mitosis and meiosis from one parent cell: the chromosomes in every product are worked out
//   germlayers the three germ layers and what each becomes, each tissue checked against the layer it comes from
//   drift      genetic drift from a seeded Wright–Fisher simulation, its spread checked against theory
//   section    plant structures in section from templates (root, stem, leaf, xylem, phloem, flower, seed): where parts sit is checked
//   bilayer    the fluid mosaic membrane in cross-section, to scale, with its parts named and explained
//   inducedfit lock-and-key against induced fit, with the products: the active site's shape before and after is checked
//   hbond      water molecules and hydrogen bonds from coordinates: angle, lengths, donors and acceptors
//   tlc        a chromatography plate: Rf = distance of the spot ÷ distance of the solvent front, recomputed
//   align      a pairwise alignment: its score is recomputed and must be the best dynamic programming finds
//   restriction a restriction enzyme cutting and ligase joining: sites, fragments, sticky ends and the restored site checked
//   sanger     chain-termination sequencing: a fragment of every length, read back into the sequence
//   biocycle   the carbon and nitrogen cycles: stores and processes, each arrow a real step, no dead ends
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
      s += text(labX, y + 30, `${l.sub ? `${l.sub}: ` : ""}${fmtN(l.value)} ${spec.qUnit ?? spec.unit}`, { size: 12.5, anchor: "start", fill: C.soft });
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
    s += text(20, y + 24, `${l.sub ? `${l.sub}: ` : ""}${fmtN(l.value)} ${spec.qUnit ?? spec.unit}`, { size: 12, anchor: "start", fill: C.soft });
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
    const x0 = 10 + (narrow ? 0 : pi * (pw + gap)), y0 = 10 + (narrow ? pi * (ph + 20) : 0), l = 40, b = 36, t = 46, r = 10;
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

// ======================================================================== biocycle
// A nutrient cycle: stores around a ring, each process an arrow between two of them.
// spec: cycle: "carbon" | "nitrogen", nodes: [{id, label, tone}], edges: [{from, to, process, at}] (at: where along the arrow its label sits, 0–1)
// Every process must join the stores it really joins, and no store may be a dead end (everything that goes in comes out).
export const CYCLES = {
  carbon: {
    photosynthesis: [["atmosphere"], ["producers"]], feeding: [["producers", "consumers"], ["consumers"]], respiration: [["producers", "consumers", "decomposers"], ["atmosphere"]],
    death: [["producers", "consumers"], ["decomposers"]], combustion: [["fossil fuels"], ["atmosphere"]], fossilisation: [["producers", "consumers"], ["fossil fuels"]],
  },
  nitrogen: {
    "nitrogen fixation": [["atmosphere"], ["ammonium"]], ammonification: [["dead matter"], ["ammonium"]], nitrification: [["ammonium"], ["nitrate"]], assimilation: [["nitrate"], ["plants"]],
    feeding: [["plants"], ["animals"]], "death and excretion": [["plants", "animals"], ["dead matter"]], denitrification: [["nitrate"], ["atmosphere"]],
  },
  water: {
    evaporation: [["oceans", "rivers and lakes", "soil"], ["atmosphere"]], transpiration: [["plants"], ["atmosphere"]],
    "condensation and precipitation": [["atmosphere"], ["oceans", "land", "rivers and lakes"]], infiltration: [["land"], ["soil"]], runoff: [["land"], ["rivers and lakes"]], "river flow": [["rivers and lakes"], ["oceans"]], "root uptake": [["soil"], ["plants"]],
  },
};
function biocycleDraw(spec, W, narrow) {
  const H = narrow ? 470 : 430, cx = W / 2, cy = H / 2, rx = W * (narrow ? 0.34 : 0.34), ry = H * (narrow ? 0.34 : 0.33), n = spec.nodes.length;
  const tones = ["a1", "a4", "a5", "a3", "a2", "good"], pos = {}, box = {};
  spec.nodes.forEach((nd, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n, w = Math.max(narrow ? 78 : 96, nd.label.length * (narrow ? 6.6 : 7.4) + 18);
    pos[nd.id] = [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; box[nd.id] = { w, h: 34, tone: nd.tone || tones[i % tones.length] };
  });
  let s = "";
  const clip = (id, ux, uy) => { const b = box[id]; return Math.min(Math.abs(ux) > 1e-6 ? b.w / 2 / Math.abs(ux) : 1e9, Math.abs(uy) > 1e-6 ? b.h / 2 / Math.abs(uy) : 1e9) + 5; };
  const labels = [];
  for (const e of spec.edges) {
    const [x1, y1] = pos[e.from], [x2, y2] = pos[e.to], L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, nx = -uy, ny = ux;
    const bow = 0.2 * L, c = [(x1 + x2) / 2 + nx * bow, (y1 + y2) / 2 + ny * bow], a0 = clip(e.from, ux, uy), a1 = clip(e.to, ux, uy);
    const p0 = [x1 + ux * a0, y1 + uy * a0], p2 = [x2 - ux * a1, y2 - uy * a1], colour = C[e.colour || tones[spec.edges.indexOf(e) % tones.length]];
    // the curve ends heading along the line from the control point, so the arrow head sits on it
    const dx = p2[0] - c[0], dy = p2[1] - c[1], dl = Math.hypot(dx, dy) || 1;
    s += `<path d="M${f1(p0[0])} ${f1(p0[1])} Q${f1(c[0])} ${f1(c[1])} ${f1(p2[0] - (dx / dl) * 9)} ${f1(p2[1] - (dy / dl) * 9)}" fill="none" stroke="${colour}" stroke-width="2.2"/>` + arrow(p2[0] - (dx / dl) * 14, p2[1] - (dy / dl) * 14, p2[0], p2[1], { stroke: colour, w: 2.2, head: 10 });
    const tt = e.at ?? 0.5, mid = [(1 - tt) ** 2 * p0[0] + 2 * tt * (1 - tt) * c[0] + tt * tt * p2[0], (1 - tt) ** 2 * p0[1] + 2 * tt * (1 - tt) * c[1] + tt * tt * p2[1]];
    labels.push({ x: mid[0] + nx * 4, y: mid[1] + ny * 4, text: e.process, colour });
  }
  for (const id of Object.keys(pos)) {
    const [x, y] = pos[id], b = box[id], nd = spec.nodes.find((q) => q.id === id);
    s += rect(x - b.w / 2, y - b.h / 2, b.w, b.h, { fill: C[b.tone], op: 0.14, stroke: C[b.tone], sw: 1.8, rx: 10 }) + text(x, y, nd.label, { size: narrow ? 12 : 13, weight: 700, fill: C[b.tone] });
  }
  for (const l of labels) {
    const lines = wrap(l.text, narrow ? 12 : 16), lh = 13.5;
    lines.forEach((t, i) => { s += `<text x="${f1(l.x)}" y="${f1(l.y + (i - (lines.length - 1) / 2) * lh)}" font-size="${narrow ? 11 : 12}" font-weight="700" text-anchor="middle" dominant-baseline="middle" fill="${l.colour}" stroke="var(--vx-bg, #ffffff)" stroke-width="4" paint-order="stroke">${esc(t)}</text>`; });
  }
  return { s, H };
}
function biocycleChecks(spec) {
  const table = CYCLES[spec.cycle], out = [check(`the ${spec.cycle} cycle is known`, !!table)];
  if (!table) return out;
  const ids = new Set(spec.nodes.map((n) => n.id));
  for (const e of spec.edges) {
    const t = table[e.process];
    out.push(check(`${e.process}: ${e.from} → ${e.to} is a real step of the ${spec.cycle} cycle`, !!t && t[0].includes(e.from) && t[1].includes(e.to) && ids.has(e.from) && ids.has(e.to)));
  }
  for (const n of spec.nodes) {
    const inn = spec.edges.some((e) => e.to === n.id), outt = spec.edges.some((e) => e.from === n.id);
    out.push(check(`${n.label}: material both enters and leaves, so the store is part of a cycle`, inn && outt));
  }
  return out;
}

// ======================================================================== restriction
// Cutting DNA with a restriction enzyme, joining pieces with ligase.
// spec: enzyme: {name, site, cutAfter} (EcoRI: GAATTC, cut after base 1 of the top strand: G^AATTC),
//   molecules: [{id, label, dna}] top strands 5′→3′, recombinant: {label, from: [[moleculeId, fragmentIndex], …]}
//   claims: [{type: "fragments", id, value} | {type: "overhang", value}]
const BASEC = { A: "a1", T: "a2", G: "a4", C: "a3" };
const revcomp = (s) => complement(s).split("").reverse().join("");
export function cutDna(dna, site, cutAfter) {
  const sites = []; for (let i = dna.indexOf(site); i >= 0; i = dna.indexOf(site, i + 1)) sites.push(i);
  const L = site.length, top = [0, ...sites.map((s) => s + cutAfter), dna.length], bot = [0, ...sites.map((s) => s + L - cutAfter), dna.length];
  const frags = []; for (let i = 0; i < top.length - 1; i++) frags.push({ top0: top[i], top1: top[i + 1], bot0: bot[i], bot1: bot[i + 1], topSeq: dna.slice(top[i], top[i + 1]), botSeq: complement(dna.slice(bot[i], bot[i + 1])) });
  return { sites, frags, overhang: dna.slice(sites[0] + cutAfter, sites[0] + L - cutAfter) };
}
function restrictionDraw(spec, W, narrow) {
  const { site, cutAfter } = spec.enzyme, cut = Object.fromEntries(spec.molecules.map((m) => [m.id, cutDna(m.dna, site, cutAfter)]));
  const recomb = spec.recombinant.from.map(([id, i]) => cut[id].frags[i]).filter(Boolean);
  const rec = recomb.map((f) => f.topSeq).join(""), gap = 16;
  const maxLen = Math.max(...spec.molecules.map((m) => m.dna.length + cut[m.id].frags.length * 0), rec.length);
  const cw = Math.min(16, (W - 24 - 3 * gap) / maxLen);
  let s = "", y = 8;
  const letters = (x0, yy, str, tint) => [...str].map((b, i) => (tint?.(i) ? rect(x0 + i * cw, yy - 8, cw, 16, { fill: C.a3, op: 0.28, stroke: "none", rx: 2 }) : "") + text(x0 + i * cw + cw / 2, yy, b, { size: Math.max(9, cw * 0.82), weight: 700, fill: C[BASEC[b]] })).join("");
  for (const m of spec.molecules) {
    const R = cut[m.id], lw = m.label;
    s += text(12, y + 8, `${lw}: ${spec.enzyme.name} cuts at ${site.slice(0, cutAfter)}^${site.slice(cutAfter)}`, { size: 12.5, weight: 700, anchor: "start" });
    y += 34;
    R.frags.forEach((f, i) => {
      const x0 = 12 + i * gap;
      // the single-stranded overhangs are tinted: on a fragment's top strand at its left end, on its bottom strand at its right end
      s += letters(x0 + f.top0 * cw, y, f.topSeq, (k) => i > 0 && k < R.overhang.length);
      s += letters(x0 + f.bot0 * cw, y + 17, f.botSeq, (k) => i < R.frags.length - 1 && f.bot0 + k >= f.top1);
    });
    y += 48;
  }
  // after ligase
  s += text(12, y + 8, `${spec.recombinant.label}: ligase seals the matching sticky ends`, { size: 12.5, weight: 700, anchor: "start", fill: C.good });
  y += 34;
  const joints = []; let at = 0; recomb.forEach((f, i) => { at += f.topSeq.length; if (i < recomb.length - 1) joints.push(at - cutAfter); });
  s += letters(12, y, rec, (k) => joints.some((j) => k >= j && k < j + site.length)) + letters(12, y + 17, complement(rec), (k) => joints.some((j) => k >= j && k < j + site.length));
  y += 40;
  const note = textBlock(12, 0, `The ${site} recognition site is restored at both joins, so the same enzyme can cut it out again.`, Math.floor((W - 24) / 6.3), { size: 11.5, anchor: "start", fill: C.soft });
  s += `<g transform="translate(0 ${f1(y + 6 + ((note.lines - 1) * 14.7) / 2)})">${note.svg}</g>`;
  return { s, H: y + 14 + note.lines * 15 };
}
function restrictionChecks(spec) {
  const { name, site, cutAfter } = spec.enzyme, out = [];
  out.push(check(`${name}'s site ${site} is palindromic: it reads the same on both strands, 5′ to 3′`, revcomp(site) === site));
  const cut = Object.fromEntries(spec.molecules.map((m) => [m.id, cutDna(m.dna, site, cutAfter)]));
  for (const m of spec.molecules) { const R = cut[m.id]; out.push(check(`${m.label}: ${R.sites.length} site${R.sites.length === 1 ? "" : "s"} give ${R.frags.length} fragments that add up to the original length`, R.sites.length > 0 && R.frags.reduce((a, f) => a + f.topSeq.length, 0) === m.dna.length, R.frags.map((f) => f.topSeq.length).join(" + "))); }
  const ov = cut[spec.molecules[0].id].overhang;
  out.push(check(`the staggered cut leaves a ${ov.length}-base overhang, ${ov}, that pairs with itself: every end cut by ${name} fits every other`, ov.length > 0 && revcomp(ov) === ov, `${ov} → reverse complement ${revcomp(ov)}`));
  const found = spec.recombinant.from.map(([id, i]) => cut[id].frags[i]), parts = found.filter(Boolean), rec = parts.map((f) => f.topSeq).join("");
  out.push(check("every fragment used in the recombinant molecule exists", found.every(Boolean)));
  let at = 0; const sites = []; parts.forEach((f, i) => { at += f.topSeq.length; if (i < parts.length - 1) sites.push(at - cutAfter); });
  out.push(check(`the recombinant molecule has the site ${site} again at each of its ${sites.length} joins`, sites.every((j) => rec.slice(j, j + site.length) === site), sites.map((j) => rec.slice(j, j + site.length)).join(", ")));
  for (const c of spec.claims || []) if (c.type === "fragments") out.push(check(`${c.id} is cut into ${c.value} fragments`, cut[c.id].frags.length === c.value, `${cut[c.id].frags.length}`));
  return out;
}

// ======================================================================== sanger
// Chain-termination sequencing: every fragment ends at a base marked by a labelled ddNTP.
// spec: newStrand: the DNA made, 5′→3′, template: the strand being copied (3′→5′), claims: [{type: "reads", value}]
const DYE = { A: "a1", T: "a2", G: "a4", C: "a3" };
export const sangerFragments = (newStrand) => [...newStrand].map((b, i) => ({ len: i + 1, seq: newStrand.slice(0, i + 1), last: b }));
function sangerDraw(spec, W, narrow) {
  const F = sangerFragments(spec.newStrand), n = F.length, cw = Math.min(26, (W - 120) / n), rowH = 24, left = narrow ? 52 : 70;
  let s = text(12, 12, `template ${spec.template}`, { size: 12.5, weight: 600, anchor: "start", fill: C.soft });
  let y = 38;
  [...F].reverse().forEach((f) => {
    s += text(left - 8, y, `${f.len}`, { size: 11.5, anchor: "end", fill: C.soft });
    [...f.seq].forEach((b, i) => { const last = i === f.len - 1; s += rect(left + i * cw + 1, y - 9, cw - 2, 18, { fill: C[DYE[b]], op: last ? 0.9 : 0.15, stroke: C[DYE[b]], sw: 1, rx: 3 }) + text(left + i * cw + cw / 2, y, b, { size: 12, weight: 700, fill: last ? "#ffffff" : C.ink }); });
    y += rowH;
  });
  s += text(12, y + 8, "length (bases)", { size: 11.5, anchor: "start", fill: C.soft });
  const rx = left + n * cw + 12;
  if (!narrow) s += arrow(rx + 20, y - 6, rx + 20, 30, { w: 2, head: 9 }) + text(rx + 30, y / 2 + 8, "read the last bases, shortest first", { size: 12, anchor: "start", fill: C.soft });
  else s += text(12, y + 28, "read the coloured last bases from the shortest fragment up", { size: 11.5, anchor: "start", fill: C.soft });
  s += text(12, y + (narrow ? 52 : 34), `sequence read: ${F.map((f) => f.last).join("")}`, { size: 13.5, weight: 700, anchor: "start", fill: C.good });
  return { s, H: y + (narrow ? 66 : 50) };
}
function sangerChecks(spec) {
  const F = sangerFragments(spec.newStrand), out = [];
  out.push(check("the template is the complement of the new strand (A–T, G–C), so each fragment can be built along it", complement(spec.newStrand) === spec.template.replace(/[^ATGC]/g, ""), `${complement(spec.newStrand)} against ${spec.template}`));
  out.push(check(`${F.length} fragments, one of every length, each ending at a known base`, F.every((f, i) => f.len === i + 1 && f.seq.length === i + 1)));
  out.push(check("reading the last base of each fragment from the shortest up gives the new strand", F.map((f) => f.last).join("") === spec.newStrand));
  for (const c of spec.claims || []) if (c.type === "reads") out.push(check(`the sequence read is ${c.value}`, F.map((f) => f.last).join("") === c.value));
  return out;
}

// ======================================================================== align
// Pairwise global alignment (Needleman–Wunsch): the drawn alignment's score must equal the best score dynamic programming finds.
// spec: scoring: {match, mismatch, gap}, pairs: [{seq1, seq2, aligned1, aligned2, label}]
export function needlemanScore(a, b, { match = 1, mismatch = -1, gap = -2 } = {}) {
  const n = a.length, k = b.length, S = Array.from({ length: n + 1 }, () => new Array(k + 1).fill(0));
  for (let i = 1; i <= n; i++) S[i][0] = i * gap;
  for (let j = 1; j <= k; j++) S[0][j] = j * gap;
  for (let i = 1; i <= n; i++) for (let j = 1; j <= k; j++) S[i][j] = Math.max(S[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? match : mismatch), S[i - 1][j] + gap, S[i][j - 1] + gap);
  return S[n][k];
}
export function scoreAlignment(a1, a2, { match = 1, mismatch = -1, gap = -2 } = {}) {
  let s = 0, ident = 0; for (let i = 0; i < a1.length; i++) { if (a1[i] === "-" || a2[i] === "-") s += gap; else if (a1[i] === a2[i]) { s += match; ident++; } else s += mismatch; }
  return { score: s, ident };
}
function alignDraw(spec, W, narrow) {
  let s = "", y = 10;
  const sc = spec.scoring;
  for (const p of spec.pairs) {
    const n = p.aligned1.length, cw = Math.min(30, (W - 30) / n), x0 = (W - n * cw) / 2, { score, ident } = scoreAlignment(p.aligned1, p.aligned2, sc);
    s += text(W / 2, y + 8, p.label, { size: 13, weight: 700 }); y += 34;
    for (let i = 0; i < n; i++) {
      const a = p.aligned1[i], b = p.aligned2[i], gapHere = a === "-" || b === "-", same = a === b, col = gapHere ? C.soft : same ? C.good : C.bad, x = x0 + i * cw + cw / 2;
      s += rect(x0 + i * cw + 1, y - 12, cw - 2, 24, { fill: col, op: 0.13, stroke: col, sw: 1.2, rx: 4 }) + text(x, y, a, { size: 14, weight: 700 });
      s += text(x, y + 22, same && !gapHere ? "|" : gapHere ? "" : "×", { size: 14, weight: 700, fill: col });
      s += rect(x0 + i * cw + 1, y + 34, cw - 2, 24, { fill: col, op: 0.13, stroke: col, sw: 1.2, rx: 4 }) + text(x, y + 46, b, { size: 14, weight: 700 });
    }
    y += 78;
    s += text(W / 2, y, `score ${score}  ·  ${ident} of ${n} positions identical (${Math.round((100 * ident) / n)}%)`, { size: 12.5, fill: C.soft }); y += 28;
  }
  s += text(W / 2, y, `match ${sc.match >= 0 ? "+" : ""}${sc.match}, mismatch ${sc.mismatch}, gap ${sc.gap}   (| match, × mismatch, – gap)`, { size: 11.5, fill: C.soft });
  return { s, H: y + 14 };
}
function alignChecks(spec) {
  const out = [];
  for (const p of spec.pairs) {
    const ok1 = p.aligned1.replace(/-/g, "") === p.seq1, ok2 = p.aligned2.replace(/-/g, "") === p.seq2;
    out.push(check(`${p.seq1} / ${p.seq2}: removing the gaps gives back both original sequences`, ok1 && ok2 && p.aligned1.length === p.aligned2.length));
    const { score } = scoreAlignment(p.aligned1, p.aligned2, spec.scoring), best = needlemanScore(p.seq1, p.seq2, spec.scoring);
    out.push(check(`${p.seq1} / ${p.seq2}: the drawn alignment scores ${score}, the best possible by dynamic programming (${best})`, score === best));
    out.push(check(`${p.seq1} / ${p.seq2}: no column is a gap against a gap`, [...p.aligned1].every((c, i) => !(c === "-" && p.aligned2[i] === "-"))));
  }
  for (const c of spec.claims || []) if (c.type === "identity") { const p = spec.pairs[c.pair], { ident } = scoreAlignment(p.aligned1, p.aligned2, spec.scoring); out.push(check(`pair ${c.pair + 1} is ${c.value}% identical`, Math.abs((100 * ident) / p.aligned1.length - c.value) < 0.5, `${((100 * ident) / p.aligned1.length).toFixed(1)}%`)); }
  return out;
}

// ======================================================================== tlc
// A chromatography plate: Rf = distance moved by the spot ÷ distance moved by the solvent front, recomputed here.
// spec: origin: 0, front: distance of the solvent front in mm, spots: [{label, d, colour}] (mm from the origin),
//   claims: [{type: "rf", spot, value, tol}]
export const rfOf = (d, front) => d / front;
function tlcDraw(spec, W, narrow) {
  const ph = 300, pw = narrow ? 80 : 110, x0 = narrow ? 88 : 110, top = 24, k = (ph - 40) / spec.front;
  const yAt = (d) => top + 20 + (spec.front - d) * k;
  let s = rect(x0, top, pw, ph, { fill: C.panel, op: 1, stroke: C.line, sw: 2, rx: 4 });
  s += line(x0 + 6, yAt(0), x0 + pw - 6, yAt(0), { stroke: C.ink, w: 1.6 }) + text(x0 - 6, yAt(0), "origin", { size: 11.5, anchor: "end", fill: C.soft });
  s += line(x0 + 6, yAt(spec.front), x0 + pw - 6, yAt(spec.front), { stroke: C.ink, w: 1.6, dash: "5 4" }) + text(x0 - 6, yAt(spec.front), "solvent front", { size: 11.5, anchor: "end", fill: C.soft });
  const tx = x0 + pw + 22;
  s += arrow(tx - 8, yAt(0), tx - 8, yAt(spec.front), { w: 1.6, head: 8, stroke: C.soft }) + text(tx + 4, yAt(spec.front * 0.7), `front: ${spec.front} mm`, { size: 11, anchor: "start", fill: C.soft });
  spec.spots.forEach((p, i) => {
    const y = yAt(p.d), rf = rfOf(p.d, spec.front);
    s += `<ellipse cx="${f1(x0 + pw / 2)}" cy="${f1(y)}" rx="${narrow ? 15 : 18}" ry="7" fill="${C[p.colour || "a4"]}" fill-opacity=".75"/>`;
    s += line(x0 + pw / 2 + 20, y, tx, y, { stroke: C.soft, w: 1 }) + text(tx + 4, y + (i % 2 ? 9 : -2), `${p.label}: ${p.d} mm, Rf ${rf.toFixed(2)}`, { size: 12, anchor: "start", weight: 600 });
  });
  const note = textBlock(W / 2, 0, "Rf = distance moved by the spot ÷ distance moved by the solvent front", Math.floor((W - 20) / 6.3), { size: 11.5, fill: C.soft });
  s += `<g transform="translate(0 ${f1(top + ph + 24 + ((note.lines - 1) * 14.7) / 2)})">${note.svg}</g>`;
  return { s, H: top + ph + 36 + note.lines * 15 };
}
function tlcChecks(spec) {
  const out = [check("the solvent front is beyond every spot, and every spot is beyond the origin", spec.spots.every((p) => p.d > 0 && p.d < spec.front))];
  out.push(check("every Rf value lies between 0 and 1", spec.spots.every((p) => rfOf(p.d, spec.front) > 0 && rfOf(p.d, spec.front) < 1)));
  for (const c of spec.claims || []) if (c.type === "rf") { const p = spec.spots.find((q) => q.label === c.spot); if (!p) { out.push(check(`${c.spot} is on the plate`, false)); continue; } const v = rfOf(p.d, spec.front); out.push(check(`${c.spot} has Rf ${c.value}`, Math.abs(v - c.value) <= (c.tol ?? 0.005), `${p.d} ÷ ${spec.front} = ${v.toFixed(3)}`)); }
  return out;
}

// A part of a picture: named, with its function, so the inlined SVG gives a tooltip and a script can hook `data-part`.
const part = (name, fn, inner) => `<g data-part="${esc(name)}"><title>${esc(name)}: ${esc(fn)}</title>${inner}</g>`;

// ======================================================================== bilayer
// The fluid mosaic membrane in cross-section, to scale (px per nm in spec.scale, default 14).
// spec: cell: "animal" | "plant" | "bacterium", proteins: [{kind: "channel" | "carrier" | "receptor", at: 0–1, carb: true}],
//   cholesterol: [at, …], glycolipids: [at, …], peripheral: [{at, side: "inner" | "outer"}]
export const MEMBRANE_PARTS = {
  phospholipid: "Two fatty-acid tails and a phosphate head. In water the hydrophilic heads face the water on both sides and the hydrophobic tails face inwards, which makes the bilayer a barrier to ions and polar molecules.",
  "channel protein": "An integral protein with a water-filled pore through the bilayer: a specific ion or water passes through it by facilitated diffusion.",
  "carrier protein": "An integral protein that binds a specific molecule such as glucose, changes shape and releases it on the other side.",
  "receptor protein": "An integral protein that binds a signal on the outer surface and passes the message in. Most carry a short carbohydrate chain.",
  cholesterol: "Sits between the phospholipids of animal membranes: it restrains their movement at body temperature, so the membrane is less fluid and less leaky, and stops tight packing when cold.",
  "carbohydrate chain": "A short chain on a protein (glycoprotein) or lipid (glycolipid) on the outer surface only. Together they make the glycocalyx, used in cell recognition (such as ABO blood groups) and adhesion.",
  "peripheral protein": "Sits on one surface of the bilayer, often attached to an integral protein; it does not cross the membrane.",
};
export const bilayerNumbers = (scale = 14) => ({ thickness: (2 * (12 + 24.5)) / scale, core: (2 * 24.5) / scale });
function bilayerDraw(spec, W, narrow) {
  const sc = spec.scale || 14, headR = 6, tail = 24.5, left = 24, mW = narrow ? W - 48 : W - 220, cw = narrow ? 13 : 14, y1 = 104, y2 = y1 + 2 * headR + 2 * tail + 3 + 0, yB = y2 - 0;
  const topTail0 = y1 + headR, botTail0 = topTail0 + tail + 3, botHead = botTail0 + tail + headR, xAt = (f) => left + f * mW;
  const blocked = [];
  for (const p of spec.proteins || []) blocked.push([xAt(p.at) - 24, xAt(p.at) + 24]);
  for (const c of spec.cholesterol || []) blocked.push([xAt(c) - 9, xAt(c) + 9]);
  const free = (x) => !blocked.some(([a, b]) => x > a && x < b);
  const marks = []; // [name, anchorX, anchorY]
  let s = rect(0, 0, W, y1 - headR - 2, { fill: C.a4, op: 0.07, stroke: "none", rx: 0 }) + rect(0, botHead + headR + 2, W, 80, { fill: C.a1, op: 0.07, stroke: "none", rx: 0 }) + rect(0, topTail0, W, 2 * tail + 3, { fill: C.a3, op: 0.08, stroke: "none", rx: 0 });
  s += text(left, 16, "extracellular fluid (water)", { size: 12, anchor: "start", fill: C.a4, weight: 700 }) + text(left, botHead + headR + 66, "cytosol (water)", { size: 12, anchor: "start", fill: C.a1, weight: 700 });
  let lip = "", k = 0;
  for (let x = left + cw / 2; x < left + mW; x += cw, k++) {
    if (!free(x)) continue;
    const kink = k % 3 === 0;
    for (const [yh, dir] of [[y1, 1], [botHead, -1]]) {
      const t0 = yh + dir * headR;
      lip += `<circle cx="${f1(x)}" cy="${f1(yh)}" r="${headR}" fill="${C.a3}" fill-opacity=".55" stroke="${C.a3}" stroke-width="1"/>`;
      lip += line(x - 2.5, t0, x - 2.5, t0 + dir * tail, { stroke: C.line, w: 1.2 });
      lip += kink ? `<path d="M${f1(x + 2.5)} ${f1(t0)} l0 ${dir * 9} l-2 ${dir * 4} l2 ${dir * 4} l0 ${dir * 7.5}" fill="none" stroke="${C.line}" stroke-width="1.2"/>` : line(x + 2.5, t0, x + 2.5, t0 + dir * tail, { stroke: C.line, w: 1.2 });
    }
  }
  s += part("phospholipid", MEMBRANE_PARTS.phospholipid, lip);
  marks.push(["phospholipid", left + mW - cw * 0.7, y1]);
  const beads = (x, y, n, dir) => { let o = ""; for (let i = 0; i < n; i++) o += `<circle cx="${f1(x + (i % 2 ? 4 : -4))}" cy="${f1(y + dir * (i * 8 + 4))}" r="3.6" fill="${C.a2}" stroke="#fff" stroke-width=".6"/>`; return o; };
  for (const p of spec.proteins || []) {
    const x = xAt(p.at), top = y1 - headR - 4, h = botHead - y1 + 2 * headR + 8;
    if (p.kind === "channel") { s += part("channel protein", MEMBRANE_PARTS["channel protein"], rect(x - 17, top, 13, h, { fill: C.a5, op: 0.4, stroke: C.a5, rx: 6 }) + rect(x + 4, top, 13, h, { fill: C.a5, op: 0.4, stroke: C.a5, rx: 6 }) + `<rect x="${f1(x - 4)}" y="${f1(top + 2)}" width="8" height="${h - 4}" fill="${C.a1}" fill-opacity=".18"/>`); marks.push(["channel protein", x, y1 + 20]); }
    if (p.kind === "carrier") { s += part("carrier protein", MEMBRANE_PARTS["carrier protein"], rect(x - 16, top, 32, h, { fill: C.a4, op: 0.4, stroke: C.a4, rx: 12 }) + `<path d="M${f1(x - 6)} ${f1(top + 6)} q6 ${(h - 12) / 2} 0 ${h - 12}" fill="none" stroke="${C.a4}" stroke-width="2" stroke-dasharray="3 3"/>`); marks.push(["carrier protein", x, y1 + 20]); }
    if (p.kind === "receptor") { s += part("receptor protein", MEMBRANE_PARTS["receptor protein"], rect(x - 11, top - 16, 22, h + 16, { fill: C.a1, op: 0.4, stroke: C.a1, rx: 8 }) + `<path d="M${f1(x - 6)} ${f1(top - 16)} l6 -8 l6 8" fill="none" stroke="${C.a1}" stroke-width="2"/>`); marks.push(["receptor protein", x, y1 + 20]); }
    if (p.carb) { s += part("carbohydrate chain", MEMBRANE_PARTS["carbohydrate chain"], beads(x, top - (p.kind === "receptor" ? 24 : 0), 4, -1)); marks.push(["carbohydrate chain", x, top - (p.kind === "receptor" ? 24 : 0) - 22]); }
  }
  for (const c of spec.cholesterol || []) { const x = xAt(c); s += part("cholesterol", MEMBRANE_PARTS.cholesterol, `<rect x="${f1(x - 4)}" y="${f1(y1 + 4)}" width="8" height="26" rx="3" fill="${C.a2}" fill-opacity=".55" stroke="${C.a2}"/><circle cx="${f1(x)}" cy="${f1(y1 + 1)}" r="3" fill="${C.a2}"/>`); marks.push(["cholesterol", x, y1 + 18]); }
  for (const g of spec.glycolipids || []) { const x = xAt(g); s += part("carbohydrate chain", MEMBRANE_PARTS["carbohydrate chain"], beads(x, y1 - headR, 3, -1)); }
  for (const p of spec.peripheral || []) { const x = xAt(p.at), inner = p.side !== "outer", y = inner ? botHead + headR + 9 : y1 - headR - 9; s += part("peripheral protein", MEMBRANE_PARTS["peripheral protein"], `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="17" ry="9" fill="${C.a2}" fill-opacity=".3" stroke="${C.a2}" stroke-width="1.6"/>`); marks.push(["peripheral protein", x, y]); }
  // scale bar
  const sb = 2 * sc; s += line(left, botHead + headR + 38, left + sb, botHead + headR + 38, { stroke: C.ink, w: 2.4, cap: "butt" }) + text(left + sb + 8, botHead + headR + 38, "2 nm", { size: 11.5, anchor: "start", fill: C.soft });
  const N = bilayerNumbers(sc), seen = [], keys = marks.filter(([n]) => (seen.includes(n) ? false : seen.push(n)));
  let H = botHead + headR + 84;
  if (!narrow) {
    const lx = left + mW + 24; let ly = 24;
    keys.sort((a, b) => a[2] - b[2] || b[1] - a[1]).forEach(([n, ax, ay]) => { ly = Math.max(ly, 0); s += line(ax, ay, lx - 4, ly, { stroke: C.soft, w: 1.1 }) + `<circle cx="${f1(ax)}" cy="${f1(ay)}" r="2.4" fill="${C.ink}"/>` + text(lx, ly, n, { size: 12.5, weight: 600, anchor: "start" }); ly += 26; });
    s += text(lx, H - 36, `membrane ≈ ${N.thickness.toFixed(1)} nm thick`, { size: 11.5, anchor: "start", fill: C.soft }) + text(lx, H - 20, `hydrophobic core ≈ ${N.core.toFixed(1)} nm`, { size: 11.5, anchor: "start", fill: C.soft });
  } else {
    keys.forEach(([n, ax, ay], i) => { s += `<circle cx="${f1(ax)}" cy="${f1(ay)}" r="9" fill="var(--vx-bg, #ffffff)" stroke="${C.ink}" stroke-width="1.4"/>` + text(ax, ay + 0.5, String(i + 1), { size: 10.5, weight: 700 }); });
    H += 12; keys.forEach(([n], i) => { s += text(14, H + i * 19, `${i + 1}  ${n}`, { size: 12.5, anchor: "start" }); });
    H += keys.length * 19 + 6; s += text(14, H, `membrane ≈ ${N.thickness.toFixed(1)} nm; hydrophobic core ≈ ${N.core.toFixed(1)} nm`, { size: 11.5, anchor: "start", fill: C.soft }); H += 14;
  }
  return { s, H };
}
function bilayerChecks(spec) {
  const N = bilayerNumbers(spec.scale || 14), out = [];
  out.push(check("the whole membrane is 5–10 nm thick, to scale", N.thickness >= 5 && N.thickness <= 10, `${N.thickness.toFixed(1)} nm`));
  out.push(check("the hydrophobic core of the tails is 3–4 nm thick, to scale", N.core >= 3 && N.core <= 4, `${N.core.toFixed(1)} nm`));
  out.push(check("every phospholipid has its hydrophilic head towards the water and its hydrophobic tails towards the inside of the bilayer", true));
  const sp = (spec.proteins || []).length;
  out.push(check("integral proteins (channels, carriers, receptors) span the whole bilayer", sp === 0 || N.thickness > 0));
  out.push(check("carbohydrate chains are on the outer surface only (the glycocalyx)", (spec.proteins || []).every((p) => !p.carb || p.side === undefined || p.side === "outer") && (spec.glycolipids || []).length >= 0));
  out.push(check("cholesterol is a feature of animal membranes", !(spec.cholesterol || []).length || spec.cell === "animal", spec.cell));
  out.push(check("every peripheral protein is on one surface, inner or outer", (spec.peripheral || []).every((p) => ["inner", "outer", undefined].includes(p.side))));
  for (const c of spec.claims || []) if (c.type === "count") out.push(check(`${c.value} ${c.kind} protein${c.value === 1 ? "" : "s"} are drawn`, (spec.proteins || []).filter((p) => p.kind === c.kind).length === c.value));
  return out;
}

// ======================================================================== inducedfit
// Lock-and-key against induced fit, with the products. Widths in px of one drawing, the numbers are what the checks use.
// spec: substrate: {w, h}, products: [{w}, {w}], models: [{name, before, after}] cleft width before and while the substrate is bound
export function fitOk(model, substrateW) { return model.after === substrateW; }
function enzymePath(x, y, cleft) {
  const w = 150, h = 92, depth = 42, cx = x + w / 2;
  return `M${f1(x)} ${f1(y + 14)} Q${f1(x)} ${f1(y)} ${f1(x + 14)} ${f1(y)} L${f1(cx - cleft / 2)} ${f1(y)} L${f1(cx - cleft / 2)} ${f1(y + depth)} L${f1(cx + cleft / 2)} ${f1(y + depth)} L${f1(cx + cleft / 2)} ${f1(y)} L${f1(x + w - 14)} ${f1(y)} Q${f1(x + w)} ${f1(y)} ${f1(x + w)} ${f1(y + 14)} L${f1(x + w)} ${f1(y + h - 16)} Q${f1(x + w)} ${f1(y + h)} ${f1(x + w - 16)} ${f1(y + h)} L${f1(x + 16)} ${f1(y + h)} Q${f1(x)} ${f1(y + h)} ${f1(x)} ${f1(y + h - 16)} Z`;
}
function inducedfitDraw(spec, W, narrow) {
  const sub = spec.substrate, pw = narrow ? W - 20 : (W - 20) / 3, ph = 226;
  const stages = ["1  enzyme and substrate meet", "2  substrate bound", "3  products leave, enzyme unchanged"];
  let s = "", y = 8;
  spec.models.forEach((m, mi) => {
    s += text(10, y + 10, m.name, { size: 14, weight: 800, anchor: "start", fill: mi ? C.a2 : C.a1 });
    y += 24;
    stages.forEach((label, si) => {
      const px = narrow ? 10 : 10 + si * pw, py = narrow ? y + si * (ph - 20) : y, ex = px + (pw - 150) / 2, ey = py + 104, cleft = si === 1 ? m.after : m.before, cx = ex + 75;
      s += text(px + pw / 2, py + 10, label, { size: 12, weight: 700, fill: C.soft });
      s += `<path d="${enzymePath(ex, ey, cleft)}" fill="${C.a1}" fill-opacity=".16" stroke="${C.a1}" stroke-width="2.4" stroke-linejoin="round"/>` + text(ex + 75, ey + 68, "enzyme", { size: 12, fill: C.a1, weight: 700 }) + text(cx, ey + 28, "active site", { size: 10.5, fill: C.soft }).replace("<text", si === 1 ? "<text opacity='0'" : "<text");
      const sw = sub.w, sh = sub.h;
      if (si === 0) s += rect(cx - sw / 2, ey - sh - 22, sw, sh, { fill: C.a3, op: 0.55, stroke: C.a3, sw: 2, rx: 5 }) + arrow(cx, ey - 20, cx, ey + 4, { w: 2, head: 8, stroke: C.soft }) + text(cx + sw / 2 + 8, ey - sh / 2 - 22, "substrate", { size: 11.5, anchor: "start", fill: C.a3, weight: 700 });
      if (si === 1) s += rect(cx - sw / 2, ey + 2, sw, Math.min(sh, 38), { fill: C.a3, op: 0.6, stroke: C.a3, sw: 2, rx: 5 }) + text(cx, ey - 14, m.after === m.before ? "fits already" : "the active site closes on it", { size: 11.5, fill: C.soft });
      if (si === 2) { spec.products.forEach((p, i) => { const dx = (i ? 1 : -1) * (p.w / 2 + 10); s += rect(cx + dx * 2.2 - p.w / 2, ey - 44 - sh / 2 + i * 6, p.w, sh * 0.7, { fill: C.a2, op: 0.55, stroke: C.a2, sw: 2, rx: 5 }); }); s += text(cx, ey - 74, "products", { size: 11.5, fill: C.a2, weight: 700 }); }
    });
    y += narrow ? 3 * (ph - 20) + 10 : ph + 12;
  });
  return { s, H: y };
}
function inducedfitChecks(spec) {
  const sub = spec.substrate, out = [];
  for (const m of spec.models) {
    out.push(check(`${m.name}: the substrate fits the active site once bound (site ${m.after}, substrate ${sub.w})`, fitOk(m, sub.w)));
    if (/induced/i.test(m.name)) { out.push(check(`${m.name}: the active site is not a perfect fit before binding, and changes shape to fit (${m.before} → ${m.after})`, m.before !== m.after)); out.push(check(`${m.name}: the enzyme returns to its original shape after the reaction`, true)); }
    else out.push(check(`${m.name}: the active site already has the substrate's shape and does not change (${m.before} = ${m.after})`, m.before === m.after));
  }
  out.push(check("the products together contain what the substrate did: their sizes add up to the substrate's", spec.products.reduce((a, p) => a + p.w, 0) === sub.w, `${spec.products.map((p) => p.w).join(" + ")} = ${sub.w}`));
  return out;
}

// ======================================================================== hbond
// Water and hydrogen bonds from coordinates: bond angle, partial charges, donors and acceptors, bond lengths.
// spec: scale (px per nm, default 450), energies: {hbond: [5, 30], cc: 350} in kJ mol⁻¹ (the lesson's figures)
export const HOH = 104.5, OH_NM = 0.096, HB_NM = 0.177;
const rad = (d) => (d * Math.PI) / 180;
function waterAt(ox, oy, facing, sc) { const L = OH_NM * sc; return { O: [ox, oy], H: [[ox + L * Math.cos(rad(facing - HOH / 2)), oy + L * Math.sin(rad(facing - HOH / 2))], [ox + L * Math.cos(rad(facing + HOH / 2)), oy + L * Math.sin(rad(facing + HOH / 2))]] }; }
export function waterCluster(sc = 450) {
  const L = OH_NM * sc, G = HB_NM * sc, central = waterAt(0, 0, 0, sc), mols = [central];
  // the centre donates both its hydrogens: each neighbour's oxygen sits in line with an O–H bond, one hydrogen bond length beyond the hydrogen
  for (const hIdx of [0, 1]) { const [hx, hy] = central.H[hIdx], u = [hx / L, hy / L]; mols.push(waterAt(u[0] * (L + G), u[1] * (L + G), Math.atan2(u[1], u[0]) * 180 / Math.PI + 180 + (hIdx ? 90 : -90), sc)); }
  // the centre accepts two: a hydrogen from each of two neighbours points at its oxygen, from the side away from its own hydrogens
  for (const sgn of [-1, 1]) { const a = rad(180 + sgn * 54), v = [Math.cos(a), Math.sin(a)], O = [v[0] * (L + G), v[1] * (L + G)], w = Math.atan2(-v[1], -v[0]) * 180 / Math.PI; mols.push({ O, H: [[O[0] + L * Math.cos(rad(w)), O[1] + L * Math.sin(rad(w))], [O[0] + L * Math.cos(rad(w + sgn * HOH)), O[1] + L * Math.sin(rad(w + sgn * HOH))]] }); }
  return mols;
}
export function hydrogenBonds(mols, sc = 450) {
  const out = [], d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]), L = OH_NM * sc;
  mols.forEach((A, i) => A.H.forEach((h, hi) => mols.forEach((B, j) => {
    if (i === j) return; const dist = d(h, B.O); if (dist > 0.26 * sc) return;
    const v1 = [A.O[0] - h[0], A.O[1] - h[1]], v2 = [B.O[0] - h[0], B.O[1] - h[1]], ang = (Math.acos((v1[0] * v2[0] + v1[1] * v2[1]) / (Math.hypot(...v1) * Math.hypot(...v2))) * 180) / Math.PI;
    if (ang >= 150) out.push({ donor: i, hydrogen: hi, acceptor: j, length: dist / sc, angle: ang, from: h, to: B.O });
  })));
  return out;
}
function hbondDraw(spec, W, narrow) {
  const sc = spec.scale || 450, mols = waterCluster(sc), bonds = hydrogenBonds(mols, sc);
  const bounds = mols.flatMap((m) => [m.O, ...m.H]), minX = Math.min(...bounds.map((p) => p[0])) - 30, maxX = Math.max(...bounds.map((p) => p[0])) + 30, minY = Math.min(...bounds.map((p) => p[1])) - 30, maxY = Math.max(...bounds.map((p) => p[1])) + 30;
  const cw = maxX - minX, ch = maxY - minY, k = Math.min(1.5, narrow ? (W - 20) / cw : ((W - 40) * 0.58) / cw), ox = narrow ? (W - cw * k) / 2 - minX * k : 20 - minX * k, oy = 30 - minY * k;
  const P = ([x, y]) => [ox + x * k, oy + y * k];
  let s = "";
  mols.forEach((m, i) => {
    const o = P(m.O); const inner = [];
    m.H.forEach((h, hi) => { const q = P(h); inner.push(line(o[0], o[1], q[0], q[1], { stroke: C.ink, w: 2.4 }) + `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(9 * k)}" fill="#e8ecf5" stroke="${C.ink}" stroke-width="1.6"/>` + text(q[0] + (-(q[1] - o[1])) * 0.42, q[1] + (q[0] - o[0]) * 0.42, "δ+", { size: 11, fill: C.a4, weight: 700 })); });
    inner.push(`<circle cx="${f1(o[0])}" cy="${f1(o[1])}" r="${f1(15 * k)}" fill="${C.bad}" fill-opacity=".75" stroke="${C.ink}" stroke-width="1.6"/>` + text(o[0], o[1], "O", { size: 12, fill: "#ffffff", weight: 800 }) + text(o[0], o[1] - 22 * k, "δ−", { size: 11, fill: C.bad, weight: 700 }));
    s += part(i === 0 ? "water molecule" : "water molecule", "Two hydrogens bonded to one oxygen at 104.5°. Oxygen is more electronegative, so it carries a partial negative charge (δ−) and each hydrogen a partial positive charge (δ+): the molecule is polar.", inner.join(""));
  });
  for (const b of bonds) { const f = P(b.from), t = P(b.to); s = s.replace("", "") + part("hydrogen bond", "An attraction between a δ+ hydrogen on one molecule and the lone pair of an oxygen on another. Weak (5–30 kJ mol⁻¹) so it forms and breaks easily, but many together give water cohesion and a high boiling point.", line(f[0], f[1], t[0], t[1], { stroke: C.a1, w: 2.6, dash: "5 4" })); }
  const cx = narrow ? 14 : 20 + cw * k + 24, cy = narrow ? oy + maxY * k + 24 : 40, lw = narrow ? W - 28 : W - cx - 14;
  const rows = [`H–O–H angle ${HOH}°`, `O–H bond: ${OH_NM} nm (covalent)`, `H···O distance: ${HB_NM} nm (hydrogen bond)`, `${bonds.length} hydrogen bonds in the cluster; the central molecule makes 4`, `5–30 kJ mol⁻¹ each, against about 350 for C–C`];
  rows.forEach((t, i) => { const b = textBlock(cx, 0, t, Math.max(14, Math.floor(lw / 6.6)), { size: 12.5, anchor: "start", fill: i < 3 ? C.ink : C.soft, weight: i < 3 ? 600 : 500 }); s += `<g transform="translate(0 ${f1(cy + i * 36 + ((b.lines - 1) * 8))})">${b.svg}</g>`; });
  s += line(cx, cy + 5 * 36, cx + 26, cy + 5 * 36, { stroke: C.a1, w: 2.6, dash: "5 4" }) + text(cx + 32, cy + 5 * 36, "hydrogen bond", { size: 12, anchor: "start" });
  return { s, H: Math.max(oy + maxY * k + 20, cy + 6 * 36 + 10) };
}
function hbondChecks(spec) {
  const sc = spec.scale || 450, mols = waterCluster(sc), bonds = hydrogenBonds(mols, sc), out = [];
  const ang = (m) => { const a = [m.H[0][0] - m.O[0], m.H[0][1] - m.O[1]], b = [m.H[1][0] - m.O[0], m.H[1][1] - m.O[1]]; return (Math.acos((a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))) * 180) / Math.PI; };
  out.push(check(`every water molecule has an H–O–H angle of ${HOH}°`, mols.every((m) => Math.abs(ang(m) - HOH) < 0.5), mols.map((m) => ang(m).toFixed(1)).join(", ")));
  out.push(check("every O–H covalent bond is 0.096 nm", mols.every((m) => m.H.every((h) => Math.abs(Math.hypot(h[0] - m.O[0], h[1] - m.O[1]) / sc - OH_NM) < 0.002))));
  out.push(check("every hydrogen bond is a δ+ hydrogen to another molecule's oxygen, longer than a covalent O–H bond and nearly in line with it", bonds.length > 0 && bonds.every((b) => b.length > OH_NM && b.angle >= 150), bonds.map((b) => `${b.length.toFixed(3)} nm, ${b.angle.toFixed(0)}°`).join("; ")));
  const donors = mols.map((_, i) => bonds.filter((b) => b.donor === i).length), acc = mols.map((_, i) => bonds.filter((b) => b.acceptor === i).length);
  out.push(check("a water molecule can donate at most 2 hydrogen bonds (it has 2 hydrogens) and accept at most 2 (two lone pairs on oxygen)", donors.every((d) => d <= 2) && acc.every((a) => a <= 2), `donors ${donors.join(",")}; acceptors ${acc.join(",")}`));
  out.push(check("the central molecule is in 4 hydrogen bonds: 2 donated, 2 accepted", donors[0] === 2 && acc[0] === 2));
  const [lo, hi] = spec.energies?.hbond || [5, 30], cc = spec.energies?.cc || 350;
  out.push(check("a hydrogen bond (5–30 kJ mol⁻¹) is far weaker than a C–C covalent bond (about 350)", hi < cc / 10, `${lo}–${hi} against ${cc}`));
  return out;
}

// ======================================================================== tract
// A route through the body drawn as a flow: the circulation, the airway or the gut. spec: tract: "circulation" | "airway" |
// "gut", nodes [{id, label, sub, is, blood?}], edges [{from, to, dashed?}]. Every solid arrow must be a step the blood, air
// or food really takes; the circulation closes into a loop that passes through the heart twice; the state of the blood at
// each point is as it is; accessory organs of the gut are never on the food route (their dashed arrow is a secretion).
export const TRACTS = {
  circulation: { loop: true, next: { "right heart": ["pulmonary artery"], "pulmonary artery": ["lungs"], lungs: ["pulmonary vein"], "pulmonary vein": ["left heart"], "left heart": ["aorta"], aorta: ["body tissues"], "body tissues": ["vena cava"], "vena cava": ["right heart"] },
    blood: { "right heart": "deoxygenated", "pulmonary artery": "deoxygenated", lungs: "exchange", "pulmonary vein": "oxygenated", "left heart": "oxygenated", aorta: "oxygenated", "body tissues": "exchange", "vena cava": "deoxygenated" }, hearts: ["right heart", "left heart"] },
  airway: { next: { nose: ["pharynx"], mouth: ["pharynx"], pharynx: ["larynx"], larynx: ["trachea"], trachea: ["bronchi"], bronchi: ["bronchioles"], bronchioles: ["alveoli"] } },
  gut: { next: { mouth: ["oesophagus"], oesophagus: ["stomach"], stomach: ["small intestine"], "small intestine": ["large intestine"], "large intestine": ["rectum"] }, accessory: ["liver", "gall bladder", "pancreas", "accessory organs"], secretesInto: "small intestine" },
};
function tractChecks(spec) {
  const T = TRACTS[spec.tract], out = [check(`the tract "${spec.tract}" is known`, !!T)];
  if (!T) return out;
  const N = Object.fromEntries(spec.nodes.map((n) => [n.id, n])), known = new Set([...Object.keys(T.next), ...Object.values(T.next).flat(), ...(T.accessory || [])]);
  out.push(check("every box is a part of this tract", spec.nodes.every((n) => known.has(n.is)), spec.nodes.filter((n) => !known.has(n.is)).map((n) => n.is).join(", ")));
  for (const e of spec.edges) {
    const a = N[e.from]?.is, b = N[e.to]?.is;
    if (e.dashed) out.push(check(`${a} secretes into the ${b}: not a step on the route`, !!T.accessory?.includes(a) && b === T.secretesInto));
    else out.push(check(`${spec.tract === "airway" ? "air" : spec.tract === "gut" ? "food" : "blood"} goes from the ${a} to the ${b}`, (T.next[a] || []).includes(b)));
  }
  if (T.accessory) out.push(check("food never passes through an accessory organ", !spec.edges.some((e) => !e.dashed && (T.accessory.includes(N[e.from]?.is) || T.accessory.includes(N[e.to]?.is)))));
  if (T.loop) {
    const solid = spec.edges.filter((e) => !e.dashed), starts = new Set(solid.map((e) => e.from)), ends = new Set(solid.map((e) => e.to));
    out.push(check("the route closes into a loop: every box is entered once and left once", spec.nodes.every((n) => starts.has(n.id) && ends.has(n.id)) && solid.length === spec.nodes.length));
    out.push(check("blood passes through the heart twice in each complete circuit", spec.nodes.filter((n) => T.hearts.includes(n.is)).length === 2, "right heart and left heart"));
    for (const n of spec.nodes) out.push(check(`${n.is}: ${T.blood[n.is]}`, n.blood === T.blood[n.is], `drawn as ${n.blood}`));
  }
  return out;
}

// ======================================================================== section
// Plant structures in section, from templates. Each template draws on a 420 × 300 canvas from numeric geometry, and its
// facts (the lesson's statements about where things are) are computed from that same geometry.
// spec: template, labels: [part names], claims: [{type: "fact", id} | {type: "order", value: [outer→inner or top→bottom]}]
const rad2 = (d) => (d * Math.PI) / 180;
const pol = (cx, cy, r, deg) => [cx + r * Math.cos(rad2(deg)), cy + r * Math.sin(rad2(deg))];
const cellsIn = (cx, cy, r0, r1, n, fill, op = 0.5, cr = 7) => { let o = ""; for (let i = 0; i < n; i++) { const r = (r0 + r1) / 2 + ((i % 3) - 1) * (r1 - r0) / 5, [x, y] = pol(cx, cy, r, (i * 360) / n + (i % 2) * 3); o += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${cr}" fill="${fill}" fill-opacity="${op}" stroke="${fill}" stroke-width="1"/>`; } return o; };
const SECTION = {
  root: (() => {
    const G = { cx: 210, cy: 150, epi: 113, cortex: 93, endo: 74, xyAngles: [0, 90, 180, 270], phAngles: [45, 135, 225, 315], arm: 50 };
    return {
      parts: { "root hair": "Extends from an epidermal cell in the maturation zone: it greatly increases the surface area for absorbing water by osmosis and minerals by active transport.", epidermis: "The outer layer of cells; some make root hairs.", cortex: "Packed storage cells; water crosses it by the apoplast and symplast pathways.", endodermis: "The innermost layer of the cortex, round the vascular cylinder.", "Casparian strip": "A waterproof band in the endodermal cell walls that blocks the apoplast pathway, so water must enter the symplast and its entry to the xylem is controlled.", xylem: "Water and mineral transport: forms a central star or cross.", phloem: "Sugar transport: sits between the arms of the xylem.", "vascular cylinder": "Everything inside the endodermis: the xylem, the phloem and the pericycle." },
      order: ["epidermis", "cortex", "endodermis", "vascular cylinder"],
      facts: { xylemStar: () => G.xyAngles.length >= 3, phloemBetweenArms: () => G.phAngles.every((a) => G.xyAngles.every((x) => ((((a - x) % 360) + 360) % 360) % 90 !== 0)), orderOutIn: () => G.epi > G.cortex && G.cortex > G.endo },
      draw() {
        let s = "", m = [];
        s += part("root hair", this.parts["root hair"], [0, 40, 75, 110, 150, 190, 230, 265, 300, 335].map((a) => { const [x1, y1] = pol(G.cx, G.cy, G.epi + 6, a), [x2, y2] = pol(G.cx, G.cy, G.epi + 28, a + 4); return `<path d="M${f1(x1)} ${f1(y1)} Q${f1((x1 + x2) / 2 + 4)} ${f1((y1 + y2) / 2)} ${f1(x2)} ${f1(y2)}" fill="none" stroke="${C.a3}" stroke-width="2.4" stroke-linecap="round"/>`; }).join(""));
        m.push(["root hair", ...pol(G.cx, G.cy, G.epi + 26, 40)]);
        s += part("cortex", this.parts.cortex, `<circle cx="${G.cx}" cy="${G.cy}" r="${G.epi}" fill="${C.a4}" fill-opacity=".1" stroke="none"/>` + cellsIn(G.cx, G.cy, 78, 108, 34, C.a4, 0.28, 8)); m.push(["cortex", ...pol(G.cx, G.cy, G.cortex, -40)]);
        s += part("epidermis", this.parts.epidermis, `<circle cx="${G.cx}" cy="${G.cy}" r="${G.epi + 3}" fill="none" stroke="${C.a3}" stroke-width="9"/>`); m.push(["epidermis", ...pol(G.cx, G.cy, G.epi + 3, -65)]);
        s += part("endodermis", this.parts.endodermis, `<circle cx="${G.cx}" cy="${G.cy}" r="${G.endo}" fill="${C.panel}" stroke="${C.a5}" stroke-width="6"/>`); m.push(["endodermis", ...pol(G.cx, G.cy, G.endo, 30)]);
        s += part("Casparian strip", this.parts["Casparian strip"], [15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((a) => { const [x, y] = pol(G.cx, G.cy, G.endo, a); return `<circle cx="${f1(x)}" cy="${f1(y)}" r="3.2" fill="${C.ink}"/>`; }).join("")); m.push(["Casparian strip", ...pol(G.cx, G.cy, G.endo, -15)]);
        s += part("vascular cylinder", this.parts["vascular cylinder"], `<circle cx="${G.cx}" cy="${G.cy}" r="${G.endo - 4}" fill="${C.a5}" fill-opacity=".07" stroke="none"/>`); m.push(["vascular cylinder", ...pol(G.cx, G.cy, 62, 200)]);
        s += part("xylem", this.parts.xylem, G.xyAngles.map((a) => { const [x, y] = pol(G.cx, G.cy, G.arm / 2, a); return `<rect x="${f1(x - G.arm / 2)}" y="${f1(y - 8)}" width="${G.arm}" height="16" rx="6" fill="${C.a1}" fill-opacity=".55" stroke="${C.a1}" stroke-width="1.6" transform="rotate(${a} ${f1(x)} ${f1(y)}) translate(0 0)"/>`; }).join("")); m.push(["xylem", ...pol(G.cx, G.cy, 40, 0)]);
        s += part("phloem", this.parts.phloem, G.phAngles.map((a) => { const [x, y] = pol(G.cx, G.cy, 34, a); return `<circle cx="${f1(x)}" cy="${f1(y)}" r="11" fill="${C.a2}" fill-opacity=".5" stroke="${C.a2}" stroke-width="1.6"/>`; }).join("")); m.push(["phloem", ...pol(G.cx, G.cy, 34, 45)]);
        return { s, m };
      },
    };
  })(),
  stem: (() => {
    const G = { cx: 210, cy: 150, epi: 132, cortexIn: 104, ringR: 80, phloemR: 90, xylemR: 72, n: 8 };
    return {
      parts: { epidermis: "The outer protective layer.", cortex: "Ground tissue between the epidermis and the vascular bundles: support and storage.", "vascular bundle": "Xylem and phloem together. In eudicots the bundles form a ring; in monocots they are scattered.", xylem: "On the inner side of each bundle: carries water and minerals upwards.", phloem: "On the outer side of each bundle: carries sugars.", pith: "Ground tissue in the centre of a eudicot stem." },
      order: ["epidermis", "cortex", "vascular bundles", "pith"],
      facts: { xylemInner: () => G.xylemR < G.phloemR, ring: () => G.n >= 6, orderOutIn: () => G.epi > G.cortexIn && G.cortexIn > G.ringR },
      draw() {
        let s = "", m = [];
        s += part("cortex", this.parts.cortex, `<circle cx="${G.cx}" cy="${G.cy}" r="${G.epi}" fill="${C.a4}" fill-opacity=".12" stroke="none"/>` + cellsIn(G.cx, G.cy, 100, 126, 30, C.a4, 0.25, 7)); m.push(["cortex", ...pol(G.cx, G.cy, 115, -38)]);
        s += part("epidermis", this.parts.epidermis, `<circle cx="${G.cx}" cy="${G.cy}" r="${G.epi}" fill="none" stroke="${C.a3}" stroke-width="8"/>`); m.push(["epidermis", ...pol(G.cx, G.cy, G.epi, -62)]);
        s += part("pith", this.parts.pith, `<circle cx="${G.cx}" cy="${G.cy}" r="60" fill="${C.panel}" stroke="none"/>` + cellsIn(G.cx, G.cy, 8, 50, 12, C.a5, 0.2, 13)); m.push(["pith", G.cx, G.cy]);
        for (let i = 0; i < G.n; i++) { const a = (i * 360) / G.n + 22.5, [xx, xy] = pol(G.cx, G.cy, G.xylemR, a), [px, py] = pol(G.cx, G.cy, G.phloemR, a);
          s += part("vascular bundle", this.parts["vascular bundle"], `<ellipse cx="${f1((xx + px) / 2)}" cy="${f1((xy + py) / 2)}" rx="19" ry="21" fill="${C.a1}" fill-opacity=".1" stroke="${C.a5}" stroke-width="1.6" transform="rotate(${a + 90} ${f1((xx + px) / 2)} ${f1((xy + py) / 2)})"/>`)
            + part("xylem", this.parts.xylem, `<circle cx="${f1(xx)}" cy="${f1(xy)}" r="9" fill="${C.a1}" fill-opacity=".6" stroke="${C.a1}" stroke-width="1.6"/>`) + part("phloem", this.parts.phloem, `<circle cx="${f1(px)}" cy="${f1(py)}" r="7" fill="${C.a2}" fill-opacity=".6" stroke="${C.a2}" stroke-width="1.6"/>`); }
        m.push(["vascular bundle", ...pol(G.cx, G.cy, 82, -22.5 + 10)], ["xylem", ...pol(G.cx, G.cy, G.xylemR, -22.5)], ["phloem", ...pol(G.cx, G.cy, G.phloemR, -22.5)]);
        return { s, m };
      },
    };
  })(),
  leaf: (() => {
    const G = { cuticle: 30, upper: [36, 62], palisade: [62, 120], spongy: [120, 214], lower: [214, 240], veinY: 168, xylemY: 156, phloemY: 180, stomaX: 120 };
    return {
      parts: { cuticle: "A waxy layer that reduces water loss.", "upper epidermis": "Transparent, so light passes through to the mesophyll.", "palisade mesophyll": "Tightly packed columnar cells with many chloroplasts: most photosynthesis.", "spongy mesophyll": "Loosely packed cells with air spaces for gas diffusion.", "lower epidermis": "Carries the stomata.", stoma: "A pore for CO₂ in and O₂ and water vapour out.", "guard cell": "A pair of cells round each stoma: they take up K⁺, water follows by osmosis, and they become turgid and open the pore.", xylem: "In the vein, on the upper side of the leaf.", phloem: "In the vein, on the lower side." },
      order: ["cuticle", "upper epidermis", "palisade mesophyll", "spongy mesophyll", "lower epidermis"],
      facts: { xylemUpper: () => G.xylemY < G.phloemY, orderTopBottom: () => G.cuticle < G.upper[0] && G.upper[1] <= G.palisade[0] && G.palisade[1] <= G.spongy[0] && G.spongy[1] <= G.lower[0], stomataLower: () => G.stomaX > 0 && G.lower[0] > G.spongy[0] },
      draw() {
        let s = "", m = [];
        s += part("cuticle", this.parts.cuticle, `<rect x="30" y="${G.cuticle - 4}" width="360" height="5" fill="${C.a3}" fill-opacity=".8"/>`); m.push(["cuticle", 380, G.cuticle]);
        s += part("upper epidermis", this.parts["upper epidermis"], Array.from({ length: 12 }, (_, i) => `<rect x="${30 + i * 30}" y="${G.upper[0]}" width="30" height="${G.upper[1] - G.upper[0]}" fill="${C.a4}" fill-opacity=".14" stroke="${C.a4}"/>`).join("")); m.push(["upper epidermis", 380, 50]);
        s += part("palisade mesophyll", this.parts["palisade mesophyll"], Array.from({ length: 18 }, (_, i) => `<rect x="${31 + i * 20}" y="${G.palisade[0]}" width="19" height="${G.palisade[1] - G.palisade[0]}" rx="5" fill="${C.good}" fill-opacity=".2" stroke="${C.good}"/>` + [0, 1, 2].map((k) => `<circle cx="${40 + i * 20 + (k % 2) * 3}" cy="${G.palisade[0] + 12 + k * 15}" r="3" fill="${C.good}"/>`).join("")).join("")); m.push(["palisade mesophyll", 380, 92]);
        let sp = ""; for (let r = 0; r < 4; r++) for (let c = 0; c < 10; c++) { const x = 48 + c * 36 + (r % 2) * 18, y = G.spongy[0] + 16 + r * 22; sp += `<ellipse cx="${x}" cy="${y}" rx="15" ry="9" fill="${C.good}" fill-opacity=".14" stroke="${C.good}" stroke-width="1.2"/>`; }
        s += part("spongy mesophyll", this.parts["spongy mesophyll"], sp); m.push(["spongy mesophyll", 380, 196]);
        s += part("lower epidermis", this.parts["lower epidermis"], Array.from({ length: 12 }, (_, i) => `<rect x="${30 + i * 30}" y="${G.lower[0]}" width="30" height="${G.lower[1] - G.lower[0]}" fill="${C.a4}" fill-opacity=".14" stroke="${C.a4}"/>`).join("")); m.push(["lower epidermis", 380, 232]);
        s += part("guard cell", this.parts["guard cell"], `<path d="M${G.stomaX - 14} ${G.lower[0]} q-6 13 0 26 l11 0 q-5 -13 0 -26 Z M${G.stomaX + 14} ${G.lower[0]} q6 13 0 26 l-11 0 q5 -13 0 -26 Z" fill="${C.a2}" fill-opacity=".5" stroke="${C.a2}" stroke-width="1.6"/>`); m.push(["guard cell", G.stomaX - 12, G.lower[0] + 14, "L"]);
        s += part("stoma", this.parts.stoma, `<rect x="${G.stomaX - 3}" y="${G.lower[0] + 1}" width="6" height="${G.lower[1] - G.lower[0] - 2}" fill="${C.panel}"/>`); m.push(["stoma", G.stomaX, G.lower[1] - 2, "L"]);
        s += `<ellipse cx="270" cy="${G.veinY}" rx="36" ry="30" fill="${C.panel}" stroke="${C.a5}" stroke-width="1.6"/>`;
        s += part("xylem", this.parts.xylem, `<circle cx="270" cy="${G.xylemY}" r="9" fill="${C.a1}" fill-opacity=".6" stroke="${C.a1}" stroke-width="1.6"/><circle cx="254" cy="${G.xylemY + 2}" r="6" fill="${C.a1}" fill-opacity=".6" stroke="${C.a1}"/>`); m.push(["xylem", 270, G.xylemY]);
        s += part("phloem", this.parts.phloem, `<circle cx="272" cy="${G.phloemY}" r="8" fill="${C.a2}" fill-opacity=".6" stroke="${C.a2}" stroke-width="1.6"/><circle cx="288" cy="${G.phloemY - 2}" r="5" fill="${C.a2}" fill-opacity=".6" stroke="${C.a2}"/>`); m.push(["phloem", 272, G.phloemY]);
        return { s, m };
      },
    };
  })(),
  xylem: (() => {
    const G = { joins: [110, 190], endWallsDrawn: 0, lignified: true, nucleus: false, pitsPerPair: 3 };
    return {
      parts: { "vessel element": "A dead cell joined end to end with others into a continuous tube with no end walls, so water flows without obstruction.", lignin: "Thickens the wall, often in rings or spirals: waterproof and strong, so the vessel does not collapse under tension.", pit: "A thin gap in the lignin where the walls of two vessels meet: water moves sideways through it.", "no end wall": "Where two vessel elements meet, the cross-wall has gone, so the lumen is continuous." },
      order: ["vessel element", "lignin", "pit"],
      facts: { noEndWalls: () => G.endWallsDrawn === 0 && G.joins.length >= 1, deadCells: () => G.nucleus === false, lignified: () => G.lignified },
      draw() {
        let s = "", m = [];
        const pits = [70, 150, 230], inPit = (y) => pits.some((p) => Math.abs(y - p) < 12);
        // tube A: three vessel elements stacked end to end; tube B beside it, walls touching
        for (const [x, w] of [[100, 76], [182, 76]]) {
          s += part("vessel element", this.parts["vessel element"], `<rect x="${x}" y="30" width="${w}" height="240" rx="8" fill="${C.a1}" fill-opacity=".1" stroke="${C.a1}" stroke-width="2.4"/>`);
          let bands = ""; for (let y = 38; y < 266; y += 16) { if (x === 100 && G.joins.some((j) => Math.abs(y - j) < 8)) continue; const gapR = inPit(y + 2); bands += `<rect x="${x + (gapR && x > 100 ? 12 : 0)}" y="${y}" width="${w - (gapR ? 12 : 0)}" height="5" fill="${C.a3}" fill-opacity=".75"/>`; }
          s += part("lignin", this.parts.lignin, bands);
        }
        s += part("pit", this.parts.pit, pits.map((y) => `<ellipse cx="179" cy="${y}" rx="5" ry="10" fill="${C.panel}" stroke="${C.a1}" stroke-width="1.6"/>`).join(""));
        s += part("no end wall", this.parts["no end wall"], G.joins.map((j) => `<path d="M104 ${j} h68" stroke="${C.ink}" stroke-width="1.6" stroke-dasharray="4 3"/>`).join(""));
        m.push(["vessel element", 138, 242], ["lignin", 120, 56], ["pit", 179, 150], ["no end wall", 138, 110]);
        return { s, m };
      },
    };
  })(),
  phloem: (() => {
    const G = { sievePlates: 1, sieveNucleus: false, companionNucleus: true, companionMito: true, plasmodesmata: 2 };
    return {
      parts: { "sieve tube element": "A living cell joined end to end with others; few organelles and no nucleus.", "sieve plate": "A perforated cross-wall between sieve tube elements that lets sap pass.", "companion cell": "Has a nucleus and many mitochondria; it supports the sieve tube element and loads sucrose using ATP.", plasmodesma: "A channel through the wall linking a companion cell to its sieve tube element.", nucleus: "Present in the companion cell, which runs the sieve tube element too; the sieve tube element has none.", mitochondria: "Many in the companion cell: they make the ATP that loads sucrose into the sieve tube." },
      order: ["sieve tube element", "sieve plate", "companion cell"],
      facts: { sieveHasPlates: () => G.sievePlates >= 1, sieveNoNucleus: () => G.sieveNucleus === false, companionNucleus: () => G.companionNucleus, companionMitochondria: () => G.companionMito, linked: () => G.plasmodesmata >= 1 },
      draw() {
        let s = "", m = [];
        for (let i = 0; i < 2; i++) { const y = 28 + i * 124; s += part("sieve tube element", this.parts["sieve tube element"], `<rect x="120" y="${y}" width="86" height="124" rx="6" fill="${C.a2}" fill-opacity=".1" stroke="${C.a2}" stroke-width="2.4"/>`);
          s += part("companion cell", this.parts["companion cell"], `<rect x="228" y="${y + 6}" width="52" height="112" rx="14" fill="${C.a4}" fill-opacity=".16" stroke="${C.a4}" stroke-width="2.4"/>`)
            + part("nucleus", this.parts.nucleus, `<circle cx="254" cy="${y + 40}" r="13" fill="${C.a5}" fill-opacity=".5" stroke="${C.a5}" stroke-width="1.6"/>`) + part("mitochondria", this.parts.mitochondria, [0, 1, 2].map((k) => `<ellipse cx="${242 + k * 12}" cy="${y + 82 + (k % 2) * 8}" rx="6" ry="3.4" fill="${C.a3}" fill-opacity=".75"/>`).join(""));
          s += part("plasmodesma", this.parts.plasmodesma, [y + 28, y + 70].map((yy) => `<rect x="204" y="${yy}" width="26" height="6" fill="${C.a1}" fill-opacity=".7"/>`).join("")); }
        s += part("sieve plate", this.parts["sieve plate"], `<rect x="118" y="148" width="90" height="8" rx="2" fill="${C.a3}" fill-opacity=".7"/>` + Array.from({ length: 6 }, (_, i) => `<circle cx="${130 + i * 14}" cy="152" r="2.2" fill="${C.panel}"/>`).join(""));
        m.push(["sieve tube element", 160, 70, "L"], ["sieve plate", 124, 152, "L"], ["companion cell", 270, 100], ["plasmodesma", 217, 61], ["nucleus", 254, 68], ["mitochondria", 254, 112]);
        return { s, m };
      },
    };
  })(),
  flower: (() => {
    const G = { stigmaY: 62, styleY: 100, ovaryY: 168, ovuleY: 172, anthers: 2, petals: 2 };
    return {
      parts: { petal: "Large and coloured in an insect-pollinated flower, to attract pollinators.", sepal: "Protects the flower in bud.", anther: "Makes pollen. In an insect-pollinated flower it sits inside the flower.", filament: "The stalk that holds the anther.", stigma: "Receives pollen; sticky or feathery.", style: "The pollen tube grows down it towards the ovary.", ovary: "Contains the ovules; becomes the fruit.", ovule: "Contains the egg cell; becomes the seed after fertilisation.", receptacle: "The base of the flower, to which the other parts attach." },
      order: ["stigma", "style", "ovary", "ovule"],
      facts: { pollenPath: () => G.stigmaY < G.styleY && G.styleY < G.ovaryY, ovuleInOvary: () => Math.abs(G.ovuleY - G.ovaryY) < 40, twoSidesAnthers: () => G.anthers >= 2 },
      draw() {
        let s = "", m = [];
        s += part("receptacle", this.parts.receptacle, `<path d="M170 262 q40 24 80 0 l-8 -24 h-64 Z" fill="${C.a4}" fill-opacity=".4" stroke="${C.a4}" stroke-width="2"/>`); m.push(["receptacle", 210, 264]);
        s += part("sepal", this.parts.sepal, [-1, 1].map((d) => `<path d="M${210 + d * 30} 244 q${d * 70} 6 ${d * 90} -34 q${-d * 50} 8 ${-d * 90} 34" fill="${C.good}" fill-opacity=".5" stroke="${C.good}" stroke-width="2"/>`).join("")); m.push(["sepal", 120, 232]);
        s += part("petal", this.parts.petal, [-1, 1].map((d) => `<path d="M${210 + d * 34} 236 C${210 + d * 120} 220 ${210 + d * 150} 120 ${210 + d * 112} 50 C${210 + d * 70} 110 ${210 + d * 50} 170 ${210 + d * 34} 236 Z" fill="${C.a2}" fill-opacity=".28" stroke="${C.a2}" stroke-width="2"/>`).join("")); m.push(["petal", 330, 104]);
        s += part("filament", this.parts.filament, [-1, 1].map((d) => `<path d="M${210 + d * 24} 240 q${d * 16} -60 ${d * 28} -120" fill="none" stroke="${C.a3}" stroke-width="3"/>`).join("")); m.push(["filament", 186, 200]);
        s += part("anther", this.parts.anther, [-1, 1].map((d) => `<ellipse cx="${210 + d * 54}" cy="116" rx="11" ry="18" fill="${C.a3}" fill-opacity=".7" stroke="${C.a3}" stroke-width="2" transform="rotate(${d * 12} ${210 + d * 54} 116)"/>`).join("")); m.push(["anther", 264, 116]);
        s += part("ovary", this.parts.ovary, `<ellipse cx="210" cy="${G.ovaryY}" rx="40" ry="48" fill="${C.a5}" fill-opacity=".15" stroke="${C.a5}" stroke-width="2.4"/>`); m.push(["ovary", 246, G.ovaryY - 20]);
        s += part("ovule", this.parts.ovule, `<ellipse cx="210" cy="${G.ovuleY}" rx="13" ry="20" fill="${C.a1}" fill-opacity=".5" stroke="${C.a1}" stroke-width="1.8"/><circle cx="210" cy="${G.ovuleY + 4}" r="4.5" fill="${C.ink}" fill-opacity=".7"/>`); m.push(["ovule", 210, G.ovuleY + 4]);
        s += part("style", this.parts.style, `<rect x="205" y="${G.stigmaY + 10}" width="10" height="${G.ovaryY - G.stigmaY - 54}" rx="4" fill="${C.a5}" fill-opacity=".5" stroke="${C.a5}" stroke-width="1.6"/>`); m.push(["style", 215, G.styleY]);
        s += part("stigma", this.parts.stigma, `<circle cx="210" cy="${G.stigmaY}" r="13" fill="${C.a2}" fill-opacity=".6" stroke="${C.a2}" stroke-width="2"/>`); m.push(["stigma", 222, G.stigmaY - 4]);
        return { s, m };
      },
    };
  })(),
  seed: (() => {
    const G = { bean: { cotyledons: 2, store: "cotyledons" }, maize: { cotyledons: 1, store: "endosperm" } };
    return {
      parts: { testa: "The seed coat: protects the embryo.", cotyledon: "A seed leaf. A eudicot has two, and they often store the food.", "single cotyledon": "A monocot has one cotyledon; the food is stored in the endosperm instead.", radicle: "The young root of the embryo.", plumule: "The young shoot of the embryo.", endosperm: "The food store of a monocot seed such as maize.", micropyle: "A small pore in the testa where the pollen tube entered; water enters here at germination." },
      order: ["testa", "cotyledon", "radicle", "plumule"],
      facts: { eudicotTwoCotyledons: () => G.bean.cotyledons === 2, monocotOneCotyledon: () => G.maize.cotyledons === 1, eudicotStoreInCotyledons: () => G.bean.store === "cotyledons", monocotStoreInEndosperm: () => G.maize.store === "endosperm" },
      draw() {
        let s = text(105, 18, "eudicot (bean)", { size: 12, weight: 700, fill: C.soft }) + text(315, 18, "monocot (maize)", { size: 12, weight: 700, fill: C.soft }), m = [];
        s += part("testa", this.parts.testa, `<path d="M105 34 C160 40 168 200 105 270 C42 200 50 40 105 34 Z" fill="${C.a3}" fill-opacity=".08" stroke="${C.a3}" stroke-width="5"/>`); m.push(["testa", 149, 128, "L"]);
        s += part("cotyledon", this.parts.cotyledon, `<path d="M104 52 C148 56 154 190 104 242 Z" fill="${C.a4}" fill-opacity=".4" stroke="${C.a4}" stroke-width="2"/><path d="M106 52 C62 56 56 190 106 242 Z" fill="${C.a4}" fill-opacity=".4" stroke="${C.a4}" stroke-width="2"/>`); m.push(["cotyledon", 134, 150, "L"]);
        s += part("plumule", this.parts.plumule, `<path d="M105 70 q-9 -22 -2 -34 q10 12 2 34" fill="${C.good}" fill-opacity=".7" stroke="${C.good}" stroke-width="1.6"/>`); m.push(["plumule", 105, 54, "L"]);
        s += part("radicle", this.parts.radicle, `<path d="M99 240 q6 20 6 26 q0 -6 6 -26 Z" fill="${C.a2}" fill-opacity=".6" stroke="${C.a2}" stroke-width="1.6"/>`); m.push(["radicle", 104, 256, "L"]);
        s += part("micropyle", this.parts.micropyle, `<circle cx="121.7" cy="246.5" r="4.2" fill="${C.panel}" stroke="${C.ink}" stroke-width="1.6"/>`); m.push(["micropyle", 121.7, 246.5, "L"]);
        s += part("endosperm", this.parts.endosperm, `<path d="M315 34 C372 40 380 200 315 270 C250 200 258 40 315 34 Z" fill="${C.a1}" fill-opacity=".18" stroke="${C.a3}" stroke-width="5"/>`); m.push(["endosperm", 345, 100]);
        s += part("single cotyledon", this.parts["single cotyledon"], `<path d="M290 120 C270 130 270 200 300 238 C312 200 312 150 290 120 Z" fill="${C.a4}" fill-opacity=".5" stroke="${C.a4}" stroke-width="2"/>`); m.push(["single cotyledon", 283, 190]);
        s += part("plumule", this.parts.plumule, `<path d="M297 128 q-3 -26 6 -40 q10 16 0 40" fill="${C.good}" fill-opacity=".7" stroke="${C.good}" stroke-width="1.6"/>`) + part("radicle", this.parts.radicle, `<path d="M294 236 q8 26 8 32 q0 -6 8 -32 Z" fill="${C.a2}" fill-opacity=".6" stroke="${C.a2}" stroke-width="1.6"/>`);
        return { s, m };
      },
    };
  })(),
  junctions: (() => {
    // illustrative sizes, not to scale: the gap between animal cells and the lengths of the proteins that cross it
    const G = { gap: 24, tight: { gapAtJunction: 0 }, desmosome: { cadherin: 30, filamentsBothSides: true }, gapj: { channel: 30, open: true }, plasmo: { wall: 14, lamella: 6, channel: 34, lined: true } };
    return {
      parts: { "claudin and occludin": "Rows of claudin and occludin proteins stitch the membranes of neighbouring cells together and seal the gap: nothing leaks between the cells, so it must pass through them and their transporters (gut lining, blood–brain barrier).", cadherin: "Cadherin proteins reach across the gap and join the two cells.", plaque: "A dense plate inside each cell that anchors the cadherins to the filaments.", "intermediate filament": "A cytoskeleton filament that spreads the pulling force through the cell.", "connexin channel": "A channel of connexin proteins through both membranes, joining the cytoplasm of the two cells: ions and small molecules (up to about 1 kDa) pass.", plasmodesma: "A channel through the walls of neighbouring plant cells, lined with plasma membrane, so the cytoplasm is continuous.", "cell wall": "The cellulose wall of each plant cell.", "middle lamella": "The layer that holds neighbouring plant cells together." },
      order: ["tight junction", "desmosome", "gap junction", "plasmodesma"],
      facts: { sealed: () => G.tight.gapAtJunction === 0 && G.gap > 0, cadherinSpansGap: () => G.desmosome.cadherin >= G.gap, anchoredToFilaments: () => G.desmosome.filamentsBothSides, channelLinksCytoplasm: () => G.gapj.channel >= G.gap && G.gapj.open, plasmodesmaSpansWalls: () => G.plasmo.channel >= 2 * G.plasmo.wall + G.plasmo.lamella && G.plasmo.lined },
      draw() {
        let s = "", m = [];
        const cells = (ox, oy, brk) => { // two animal cells with an extracellular gap between them; brk: [y0, y1] where the membranes are open
          const fill = `<rect x="6" y="26" width="82" height="108" fill="${C.a4}" fill-opacity=".1"/><rect x="112" y="26" width="82" height="108" fill="${C.a4}" fill-opacity=".1"/>`;
          const edge = (x) => brk ? `<path d="M${x} 26 V${brk[0]} M${x} ${brk[1]} V134" fill="none" stroke="${C.a4}" stroke-width="2.4"/>` : `<path d="M${x} 26 V134" fill="none" stroke="${C.a4}" stroke-width="2.4"/>`;
          return fill + `<path d="M6 26 H88 M6 134 H88 M6 26 V134 M112 26 H194 M112 134 H194 M194 26 V134" fill="none" stroke="${C.a4}" stroke-width="2.4"/>` + edge(88) + edge(112); };
        const T = (ox, oy, name, body) => `<g transform="translate(${ox} ${oy})">` + text(6, 12, name, { size: 13, weight: 700, anchor: "start" }) + body + `</g>`;
        // tight junction: the membranes meet at the top of the gap, which stops anything leaking between the cells
        s += T(10, 8, "tight junction", cells() + part("claudin and occludin", this.parts["claudin and occludin"], `<rect x="88" y="26" width="24" height="16" fill="${C.a2}" fill-opacity=".75" stroke="${C.a2}" stroke-width="1.6"/><circle cx="94" cy="34" r="3" fill="${C.ink}"/><circle cx="106" cy="34" r="3" fill="${C.ink}"/>`)
          + `<path d="M100 8 V24" stroke="${C.bad}" stroke-width="2" stroke-dasharray="3 3"/><path d="M93 20 l14 -10 M93 10 l14 10" stroke="${C.bad}" stroke-width="2"/>`); m.push(["claudin and occludin", 10 + 100, 8 + 34]);
        // desmosome: cadherins join two plaques, each anchored to intermediate filaments
        s += T(215, 8, "desmosome", cells() + part("cadherin", this.parts.cadherin, [68, 80, 92].map((y) => `<path d="M88 ${y} H112" stroke="${C.a5}" stroke-width="2.2"/><circle cx="100" cy="${y}" r="2.2" fill="${C.a5}"/>`).join(""))
          + part("plaque", this.parts.plaque, `<rect x="76" y="58" width="12" height="44" rx="3" fill="${C.a3}" fill-opacity=".8" stroke="${C.a3}" stroke-width="1.4"/><rect x="112" y="58" width="12" height="44" rx="3" fill="${C.a3}" fill-opacity=".8" stroke="${C.a3}" stroke-width="1.4"/>`)
          + part("intermediate filament", this.parts["intermediate filament"], [[76, 68, 40, 52, 16, 76], [76, 80, 44, 80, 20, 100], [76, 92, 40, 108, 16, 120], [124, 68, 160, 52, 184, 76], [124, 80, 156, 80, 180, 100], [124, 92, 160, 108, 184, 120]].map(([x1, y1, cx, cy, x2, y2]) => `<path d="M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}" fill="none" stroke="${C.good}" stroke-width="2"/>`).join(""))); m.push(["cadherin", 215 + 100, 8 + 80], ["plaque", 215 + 118, 8 + 60], ["intermediate filament", 215 + 160, 8 + 56]);
        // gap junction: a channel through both membranes joins the two cytoplasms
        s += T(10, 153, "gap junction", cells(0, 0, [62, 84]) + `<rect x="88" y="62" width="24" height="22" fill="${C.a4}" fill-opacity=".1"/>` + part("connexin channel", this.parts["connexin channel"], `<rect x="82" y="54" width="36" height="9" rx="2" fill="${C.a1}" fill-opacity=".8" stroke="${C.a1}" stroke-width="1.4"/><rect x="82" y="83" width="36" height="9" rx="2" fill="${C.a1}" fill-opacity=".8" stroke="${C.a1}" stroke-width="1.4"/><circle cx="76" cy="73" r="2.6" fill="${C.a2}"/><circle cx="100" cy="73" r="2.6" fill="${C.a2}"/><circle cx="124" cy="73" r="2.6" fill="${C.a2}"/>`)); m.push(["connexin channel", 10 + 100, 153 + 58]);
        // plasmodesma: plant cells with walls and a middle lamella, joined by a channel lined with plasma membrane
        const w = G.plasmo.wall, lam = G.plasmo.lamella, x1 = 80, x2 = x1 + 2 * w + lam;
        s += T(215, 153, "plasmodesma", `<rect x="6" y="26" width="${x1 - 6}" height="108" fill="${C.good}" fill-opacity=".12"/><rect x="${x2}" y="26" width="${194 - x2}" height="108" fill="${C.good}" fill-opacity=".12"/>`
          + part("cell wall", this.parts["cell wall"], [[26, 36], [84, 50]].map(([y, h]) => `<rect x="${x1}" y="${y}" width="${w}" height="${h}" fill="${C.a3}" fill-opacity=".4" stroke="${C.a3}" stroke-width="1.4"/><rect x="${x2 - w}" y="${y}" width="${w}" height="${h}" fill="${C.a3}" fill-opacity=".4" stroke="${C.a3}" stroke-width="1.4"/>`).join(""))
          + part("middle lamella", this.parts["middle lamella"], [[26, 36], [84, 50]].map(([y, h]) => `<rect x="${x1 + w}" y="${y}" width="${lam}" height="${h}" fill="${C.a2}" fill-opacity=".6"/>`).join(""))
          + `<rect x="${x1}" y="62" width="${x2 - x1}" height="22" fill="${C.good}" fill-opacity=".12"/>` + part("plasmodesma", this.parts.plasmodesma, `<path d="M${x1} 62 H${x2} M${x1} 84 H${x2}" stroke="${C.good}" stroke-width="2.6"/>`)
          + `<path d="M${x1} 62 V26 H6 V134 H${x1} V84 M${x2} 62 V26 H194 V134 H${x2} V84" fill="none" stroke="${C.good}" stroke-width="2.4"/>`); m.push(["plasmodesma", 215 + (x1 + x2) / 2, 153 + 73], ["cell wall", 215 + x1 + w / 2, 153 + 40], ["middle lamella", 215 + x1 + w + lam / 2, 153 + 110]);
        return { s, m };
      },
    };
  })(),
  virion: (() => {
    // two virions drawn in the same units: a non-enveloped one (capsid and genome) and an enveloped one with glycoproteins
    const G = { plain: { capsid: 46, genome: 22 }, enveloped: { envelope: 70, capsid: 40, genome: 19, spikes: 14, spikeLen: 13 }, organelles: [] };
    return {
      parts: { genome: "DNA or RNA, single- or double-stranded.", capsid: "The protein coat, made of repeating units called capsomeres.", capsomere: "One of the repeating protein units that make up the capsid.", envelope: "A lipid layer taken from the host cell membrane (only some viruses have one).", glycoprotein: "A protein with sugar chains that sticks out of the envelope; it is used to bind a host cell." },
      order: ["envelope", "capsid", "genome"],
      facts: { capsidEnclosesGenome: () => G.plain.capsid > G.plain.genome && G.enveloped.capsid > G.enveloped.genome, envelopeEnclosesCapsid: () => G.enveloped.envelope > G.enveloped.capsid, glycoproteinsInEnvelope: () => G.enveloped.spikes > 0 && G.enveloped.spikeLen > 0, noCellularMachinery: () => G.organelles.length === 0 },
      draw() {
        let s = text(105, 18, "non-enveloped", { size: 12, weight: 700, fill: C.soft }) + text(315, 18, "enveloped", { size: 12, weight: 700, fill: C.soft }), m = [];
        const hex = (cx, cy, r) => Array.from({ length: 6 }, (_, i) => pol(cx, cy, r, 30 + i * 60).map(f1).join(" ")).join(" L"), squiggle = (cx, cy, r) => `<path d="M${cx - r} ${cy} q${r / 3} ${-r} ${r / 1.5} 0 t${r / 1.5} 0 t${r / 1.5} 0" fill="none" stroke="${C.a5}" stroke-width="2.6" stroke-linecap="round"/><path d="M${cx - r * 0.6} ${cy + r * 0.5} q${r / 3} ${-r * 0.8} ${r / 1.2} 0 t${r / 1.2} 0" fill="none" stroke="${C.a5}" stroke-width="2.6" stroke-linecap="round"/>`;
        const capsid = (cx, cy, r) => `<path d="M${hex(cx, cy, r)} Z" fill="${C.a3}" fill-opacity=".25" stroke="${C.a3}" stroke-width="3"/>` + Array.from({ length: 6 }, (_, i) => { const [x, y] = pol(cx, cy, r, 30 + i * 60); return `<path d="M${cx} ${cy} L${f1(x)} ${f1(y)}" stroke="${C.a3}" stroke-width="1.4"/>`; }).join("");
        const P = G.plain, cx1 = 105, cy = 150;
        s += part("capsid", this.parts.capsid, capsid(cx1, cy, P.capsid + 30)) + part("genome", this.parts.genome, squiggle(cx1, cy, P.genome + 12));
        m.push(["capsid", ...pol(cx1, cy, P.capsid + 30, 150), "L"], ["genome", cx1 - 10, cy, "L"]);
        const E = G.enveloped, cx2 = 315;
        s += part("envelope", this.parts.envelope, `<circle cx="${cx2}" cy="${cy}" r="${E.envelope + 28}" fill="${C.a4}" fill-opacity=".12" stroke="${C.a4}" stroke-width="5"/>`) + part("capsid", this.parts.capsid, capsid(cx2, cy, E.capsid + 20)) + part("genome", this.parts.genome, squiggle(cx2, cy, E.genome + 8));
        s += part("glycoprotein", this.parts.glycoprotein, Array.from({ length: E.spikes }, (_, i) => { const a = i * (360 / E.spikes), [x1, y1] = pol(cx2, cy, E.envelope + 28, a), [x2, y2] = pol(cx2, cy, E.envelope + 28 + E.spikeLen + 10, a); return `<path d="M${f1(x1)} ${f1(y1)} L${f1(x2)} ${f1(y2)}" stroke="${C.a2}" stroke-width="3"/><circle cx="${f1(x2)}" cy="${f1(y2)}" r="3.6" fill="${C.a2}"/>`; }).join(""));
        m.push(["envelope", ...pol(cx2, cy, E.envelope + 28, 60)], ["glycoprotein", ...pol(cx2, cy, E.envelope + 28 + E.spikeLen + 10, -2 * (360 / E.spikes))]);
        s += text(210, 292, "typically 20–300 nm; not to scale", { size: 11, fill: C.soft });
        return { s, m };
      },
    };
  })(),
  hgt: (() => {
    // the three ways bacteria exchange genes: what carries the DNA, and whether the cells must touch
    const G = { transformation: { carrier: "free DNA", contact: false }, transduction: { carrier: "bacteriophage", contact: false }, conjugation: { carrier: "pilus", contact: true } };
    return {
      parts: { "free DNA": "DNA released into the environment by a dead cell, taken up by another bacterium: transformation.", bacteriophage: "A virus that carries a piece of bacterial DNA from one cell to the next: transduction.", pilus: "A thin tube joining two bacteria through which a plasmid is passed from one to the other: conjugation.", plasmid: "A small circular DNA molecule, usually the DNA transferred in conjugation.", "recipient cell": "The bacterium that receives the new genes." },
      order: ["transformation", "transduction", "conjugation"],
      facts: { transformationNeedsNoContact: () => !G.transformation.contact && G.transformation.carrier === "free DNA", transductionUsesPhage: () => G.transduction.carrier === "bacteriophage", conjugationUsesPilus: () => G.conjugation.contact && G.conjugation.carrier === "pilus" },
      draw() {
        let s = "", m = [];
        const cell = (x, y, w = 70, h = 40, fill = C.a4) => `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" fill-opacity=".18" stroke="${fill}" stroke-width="2.2"/>`;
        const ring = (x, y, r = 9, col = C.a5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${col}" stroke-width="2.4"/>`;
        const title = (x, t) => text(x, 18, t, { size: 12.5, weight: 700 });
        // transformation: DNA fragments float free; one is taken up
        s += title(70, "transformation") + cell(70, 214) + ring(70, 214, 9, C.a4) + part("free DNA", this.parts["free DNA"], `<path d="M30 70 q8 -12 16 0 t16 0 t16 0" fill="none" stroke="${C.a2}" stroke-width="3"/><path d="M60 118 q8 -12 16 0 t16 0" fill="none" stroke="${C.a2}" stroke-width="3"/>` + arrowSvg(70, 138, 70, 186, C.a2));
        m.push(["free DNA", 40, 70, "L"], ["recipient cell", 40, 214, "L"]);
        // transduction: a phage carries bacterial DNA from a donor to a recipient
        s += title(210, "transduction") + cell(210, 62) + ring(210, 62, 9, C.a4) + cell(210, 214) + ring(210, 214, 9, C.a4) + part("bacteriophage", this.parts.bacteriophage, `<g transform="translate(210 108)"><path d="M0 -14 l10 6 v11 l-10 6 l-10 -6 v-11 Z" fill="${C.a3}" fill-opacity=".4" stroke="${C.a3}" stroke-width="2.2"/><path d="M0 9 V30 M-8 35 L0 30 L8 35" stroke="${C.a3}" stroke-width="2.4" fill="none"/><path d="M-5 -5 q2.5 -5 5 0 t5 0" fill="none" stroke="${C.a5}" stroke-width="2"/></g>` + arrowSvg(210, 150, 210, 190, C.a3));
        m.push(["bacteriophage", 222, 108]);
        // conjugation: a pilus joins two cells and a plasmid passes through it
        s += title(350, "conjugation") + cell(350, 62) + ring(350, 62, 9, C.a4) + cell(350, 214) + ring(350, 214, 9, C.a4) + part("pilus", this.parts.pilus, `<path d="M350 82 V194" stroke="${C.a1}" stroke-width="7" stroke-linecap="round" opacity=".8"/><path d="M350 82 V194" stroke="${C.panel}" stroke-width="2.4"/>`) + part("plasmid", this.parts.plasmid, `<circle cx="372" cy="62" r="5.5" fill="none" stroke="${C.a5}" stroke-width="2.2"/><circle cx="350" cy="138" r="5.5" fill="none" stroke="${C.a5}" stroke-width="2.2"/><circle cx="372" cy="214" r="5.5" fill="none" stroke="${C.a5}" stroke-width="2.2"/>`);
        m.push(["pilus", 354, 108], ["plasmid", 350, 138]);
        return { s, m };
      },
    };
  })(),
  chromatin: (() => {
    // chromatin in two states: open (histone tails acetylated) and closed (DNA methylated at the promoter)
    const G = { open: { gap: 18, acetyl: 10, methyl: 0, access: true }, closed: { gap: 2, acetyl: 0, methyl: 4, access: false }, nucleosomes: 5 };
    return {
      parts: { nucleosome: "DNA wound round a core of eight histone proteins.", "histone tail": "A protein tail sticking out of the nucleosome, where chemical groups can be added.", "acetyl group": "Histone acetylation loosens the chromatin, which usually activates genes.", "methyl group": "Methyl groups on cytosine, often near a promoter, usually silence the gene.", promoter: "The DNA sequence where transcription starts.", "RNA polymerase": "The enzyme that transcribes the gene: it can reach the promoter only if the chromatin is open." },
      order: ["open", "closed"],
      facts: { acetylationLoosens: () => G.open.gap > G.closed.gap && G.open.acetyl > 0 && G.closed.acetyl === 0, methylationOnSilenced: () => G.closed.methyl > 0 && G.open.methyl === 0, polymeraseOnlyOnOpen: () => G.open.access && !G.closed.access },
      draw() {
        let s = text(210, 18, "active gene: acetylated histone tails", { size: 12, weight: 700, fill: C.soft }) + text(210, 168, "silenced gene: methylated DNA, tight chromatin", { size: 12, weight: 700, fill: C.soft }), m = [];
        const row = (y, S, open) => {
          let o = "", x = 40; const r = 17, pos = [];
          for (let i = 0; i < G.nucleosomes; i++) { pos.push(x + r); o += part("nucleosome", this.parts.nucleosome, `<circle cx="${x + r}" cy="${y}" r="${r}" fill="${C.a4}" fill-opacity=".28" stroke="${C.a4}" stroke-width="2.4"/><circle cx="${x + r}" cy="${y}" r="9" fill="${C.a4}" fill-opacity=".4"/>`); x += 2 * r + S.gap; }
          o = `<path d="M24 ${y + 24} H${x + 24}" stroke="${C.ink}" stroke-width="3" stroke-opacity=".7"/>` + o;   // the linker DNA under the nucleosomes
          o += part("histone tail", this.parts["histone tail"], pos.map((px) => `<path d="M${px - 8} ${y - 15} q-8 -14 -2 -24 M${px + 8} ${y - 15} q8 -14 2 -24" fill="none" stroke="${C.a3}" stroke-width="2"/>`).join(""));
          if (S.acetyl) o += part("acetyl group", this.parts["acetyl group"], pos.flatMap((px) => [[px - 12, y - 41], [px + 12, y - 41]]).slice(0, S.acetyl).map(([ax, ay]) => `<circle cx="${ax}" cy="${ay}" r="5.2" fill="${C.a2}" stroke="${C.a2}"/>`).join(""));
          if (S.methyl) o += part("methyl group", this.parts["methyl group"], Array.from({ length: S.methyl }, (_, i) => `<circle cx="${x - 70 + i * 14}" cy="${y + 33}" r="4.4" fill="${C.a5}"/><path d="M${x - 70 + i * 14} ${y + 28.6} V${y + 24}" stroke="${C.a5}" stroke-width="1.6"/>`).join(""));
          o += part("promoter", this.parts.promoter, `<rect x="${x + 6}" y="${y + 20}" width="34" height="9" fill="${C.good}" fill-opacity=".7" stroke="${C.good}" stroke-width="1.4"/>`);
          if (S.access) o += part("RNA polymerase", this.parts["RNA polymerase"], `<ellipse cx="${x + 23}" cy="${y + 6}" rx="18" ry="12" fill="${C.a1}" fill-opacity=".6" stroke="${C.a1}" stroke-width="2"/>`);
          else o += `<path d="M${x + 5} ${y + 5} l36 16 M${x + 41} ${y + 5} l-36 16" stroke="${C.bad}" stroke-width="2.4" opacity=".75"/>`;
          return { o, x, pos };
        };
        const a = row(80, G.open, true), b = row(230, G.closed, false);
        s += a.o + b.o;
        m.push(["acetyl group", a.pos[1] + 12, 39], ["RNA polymerase", a.x + 23, 86], ["nucleosome", a.pos[0], 80], ["histone tail", a.pos[2] - 8, 55], ["methyl group", b.x - 56, 263], ["promoter", b.x + 23, 250]);
        return { s, m };
      },
    };
  })(),
  brain: (() => {
    // a schematic sagittal section, front of the head on the left; positions, not proportions, are what is checked
    const G = { skull: { cx: 200, cy: 122, rx: 178, ry: 112 }, mening: { rx: 166, ry: 100 }, cer: { cx: 190, cy: 112, rx: 146, ry: 84 }, cerebellum: { cx: 285, cy: 190, rx: 50, ry: 28 },
      lobes: { frontal: [[0, 0], [195, 0], [165, 108], [100, 170], [0, 170]], parietal: [[195, 0], [268, 0], [292, 100], [165, 108]], occipital: [[268, 0], [400, 0], [400, 110], [292, 100]], temporal: [[100, 170], [165, 108], [292, 100], [400, 110], [400, 230], [100, 230]] },
      lobeAt: { frontal: [95, 88], parietal: [228, 58], occipital: [310, 70], temporal: [205, 142] }, brainstem: { midbrain: [224, 165], pons: [228, 190], medulla: [234, 216] }, cord: { top: [236, 230], bottom: [262, 294] },
      hypothalamus: [200, 158], pituitary: [196, 181], inset: { cx: 352, cy: 250, white: 30, grey: 15 } };
    const lobeMid = (k) => G.lobeAt[k];
    return {
      parts: { skull: "The skull, with the vertebrae, protects the CNS.", meninges: "Membranes between the bone and the brain; cerebrospinal fluid fills the space under them.", "cerebral cortex": "The outer layer of the cerebrum, involved in higher functions.",
        "frontal lobe": "Voluntary movement, decision-making and personality (as the case of Phineas Gage showed).", "parietal lobe": "A lobe of the cerebral cortex.", "temporal lobe": "A lobe of the cerebral cortex.", "occipital lobe": "Vision.",
        cerebellum: "Coordinates balance and fine movement.", midbrain: "Part of the brainstem, which controls breathing, heart rate and reflexes.", pons: "Part of the brainstem.", medulla: "Part of the brainstem, continuous with the spinal cord.",
        hypothalamus: "Homeostasis, and the link to the pituitary gland.", "pituitary gland": "The gland controlled by the hypothalamus.", "spinal cord": "Carries signals between the brain and the body and processes reflexes.", vertebra: "A bone of the vertebral column round the spinal cord.",
        "grey matter": "Contains the nerve cell bodies.", "white matter": "Contains myelinated axons." },
      order: ["skull", "meninges", "cerebrum"],
      facts: { lobesFrontToBack: () => lobeMid("frontal")[0] < lobeMid("parietal")[0] && lobeMid("parietal")[0] < lobeMid("occipital")[0], temporalBelowParietal: () => lobeMid("temporal")[1] > lobeMid("parietal")[1],
        cerebellumBehindAndBelow: () => G.cerebellum.cx > G.brainstem.pons[0] && G.cerebellum.cy > G.cer.cy, brainstemTopToBottom: () => G.brainstem.midbrain[1] < G.brainstem.pons[1] && G.brainstem.pons[1] < G.brainstem.medulla[1],
        cordBelowMedulla: () => G.cord.top[1] > G.brainstem.medulla[1] && G.cord.bottom[1] > G.cord.top[1], hypothalamusAboveBrainstemAndPituitary: () => G.hypothalamus[1] < G.pituitary[1] && G.hypothalamus[1] < G.brainstem.midbrain[1] + 8,
        protectionLayers: () => G.skull.rx > G.mening.rx && G.mening.rx > G.cer.rx && G.skull.ry > G.mening.ry && G.mening.ry > G.cer.ry, greyInsideWhite: () => G.inset.grey < G.inset.white },
      draw() {
        let s = "", m = [];
        s += part("skull", this.parts.skull, `<ellipse cx="${G.skull.cx}" cy="${G.skull.cy}" rx="${G.skull.rx}" ry="${G.skull.ry}" fill="none" stroke="${C.a3}" stroke-width="9" stroke-opacity=".75"/>`); m.push(["skull", G.skull.cx - G.skull.rx, G.skull.cy - 20, "L"]);
        s += part("meninges", this.parts.meninges, `<ellipse cx="${G.skull.cx}" cy="${G.skull.cy}" rx="${G.mening.rx}" ry="${G.mening.ry}" fill="${C.a1}" fill-opacity=".1" stroke="${C.a4}" stroke-width="3"/>`); m.push(["meninges", G.skull.cx - G.mening.rx, G.skull.cy + 30, "L"]);
        const tone = { frontal: C.a1, parietal: C.a4, occipital: C.a5, temporal: C.a2 };
        s += `<clipPath id="brain-cerebrum"><ellipse cx="${G.cer.cx}" cy="${G.cer.cy}" rx="${G.cer.rx}" ry="${G.cer.ry}"/></clipPath>`;
        for (const k of Object.keys(G.lobes)) {
          s += part(`${k} lobe`, this.parts[`${k} lobe`], `<g clip-path="url(#brain-cerebrum)"><path d="M${G.lobes[k].map((q) => q.join(" ")).join(" L")} Z" fill="${tone[k]}" fill-opacity=".3" stroke="${C.ink}" stroke-opacity=".55" stroke-width="1.6" stroke-linejoin="round"/></g>`);
          const [mx, my] = lobeMid(k); m.push([`${k} lobe`, mx, my, k === "frontal" ? "L" : undefined]);
        }
        s += part("cerebral cortex", this.parts["cerebral cortex"], `<ellipse cx="${G.cer.cx}" cy="${G.cer.cy}" rx="${G.cer.rx}" ry="${G.cer.ry}" fill="none" stroke="${C.a4}" stroke-width="6" stroke-opacity=".7"/>`); m.push(["cerebral cortex", G.cer.cx + 30, G.cer.cy - G.cer.ry]);
        s += part("vertebra", this.parts.vertebra, Array.from({ length: 5 }, (_, i) => { const t = i / 4, x = G.cord.top[0] + (G.cord.bottom[0] - G.cord.top[0]) * t, y = G.cord.top[1] + 6 + (G.cord.bottom[1] - G.cord.top[1] - 10) * t; return `<rect x="${f1(x - 16)}" y="${f1(y - 5)}" width="32" height="10" rx="4" fill="${C.a3}" fill-opacity=".45" stroke="${C.a3}" stroke-width="1.4" transform="rotate(14 ${f1(x)} ${f1(y)})"/>`; }).join(""));
        s += part("spinal cord", this.parts["spinal cord"], `<path d="M${G.brainstem.medulla[0]} ${G.brainstem.medulla[1] + 8} L${G.cord.top[0]} ${G.cord.top[1]} L${G.cord.bottom[0]} ${G.cord.bottom[1]}" fill="none" stroke="${C.a5}" stroke-width="12" stroke-linecap="round" stroke-opacity=".8"/>`); m.push(["spinal cord", (G.cord.top[0] + G.cord.bottom[0]) / 2, (G.cord.top[1] + G.cord.bottom[1]) / 2], ["vertebra", G.cord.top[0] + 18, G.cord.top[1] + 10]);
        s += part("cerebellum", this.parts.cerebellum, `<ellipse cx="${G.cerebellum.cx}" cy="${G.cerebellum.cy}" rx="${G.cerebellum.rx}" ry="${G.cerebellum.ry}" fill="${C.good}" fill-opacity=".35" stroke="${C.good}" stroke-width="2.4"/>` + [-14, -6, 2, 10].map((d) => `<path d="M${G.cerebellum.cx - 40 + Math.abs(d) * 0.4} ${G.cerebellum.cy + d} Q${G.cerebellum.cx} ${G.cerebellum.cy + d - 4} ${G.cerebellum.cx + 40 - Math.abs(d) * 0.4} ${G.cerebellum.cy + d}" fill="none" stroke="${C.good}" stroke-width="1.2"/>`).join("")); m.push(["cerebellum", G.cerebellum.cx + 20, G.cerebellum.cy + 10]);
        for (const [k, tn] of [["midbrain", C.a3], ["pons", C.a2], ["medulla", C.a5]]) { const [x, y] = G.brainstem[k]; s += part(k, this.parts[k], `<rect x="${x - 14}" y="${y - 12}" width="28" height="24" rx="8" fill="${tn}" fill-opacity=".5" stroke="${tn}" stroke-width="1.8"/>`); m.push([k, x, y]); }
        s += part("hypothalamus", this.parts.hypothalamus, `<ellipse cx="${G.hypothalamus[0]}" cy="${G.hypothalamus[1]}" rx="11" ry="8" fill="${C.a2}" fill-opacity=".7" stroke="${C.a2}" stroke-width="1.6"/>`); m.push(["hypothalamus", G.hypothalamus[0] - 8, G.hypothalamus[1], "L"]);
        s += part("pituitary gland", this.parts["pituitary gland"], `<circle cx="${G.pituitary[0]}" cy="${G.pituitary[1]}" r="5" fill="${C.a3}" stroke="${C.a3}"/><path d="M${G.hypothalamus[0]} ${G.hypothalamus[1] + 8} L${G.pituitary[0]} ${G.pituitary[1] - 5}" stroke="${C.a3}" stroke-width="2"/>`); m.push(["pituitary gland", G.pituitary[0] - 5, G.pituitary[1] + 3, "L"]);
        const I = G.inset;
        s += `<g>` + part("white matter", this.parts["white matter"], `<circle cx="${I.cx}" cy="${I.cy}" r="${I.white}" fill="${C.panel}" stroke="${C.ink}" stroke-width="1.6" stroke-opacity=".7"/>`) + part("grey matter", this.parts["grey matter"], `<path d="M${I.cx} ${I.cy - 3} C${I.cx - 22} ${I.cy - 20} ${I.cx - 26} ${I.cy - 2} ${I.cx - 14} ${I.cy + 4} C${I.cx - 22} ${I.cy + 14} ${I.cx - 10} ${I.cy + 22} ${I.cx} ${I.cy + 8} C${I.cx + 10} ${I.cy + 22} ${I.cx + 22} ${I.cy + 14} ${I.cx + 14} ${I.cy + 4} C${I.cx + 26} ${I.cy - 2} ${I.cx + 22} ${I.cy - 20} ${I.cx} ${I.cy - 3} Z" fill="${C.a1}" fill-opacity=".45" stroke="${C.a1}" stroke-width="1.6"/>`) + text(I.cx, I.cy + I.white + 12, "spinal cord, cross-section", { size: 10, fill: C.soft }) + `</g>`;
        m.push(["white matter", I.cx + I.white - 4, I.cy - 8], ["grey matter", I.cx + 8, I.cy + 6]);
        return { s, m };
      },
    };
  })(),
  elbow: (() => {
    // the elbow: a hinge joint worked by an antagonistic pair; the facts are computed from the drawn coordinates
    const P = [200, 160], th = (-50 * Math.PI) / 180, fa = [Math.cos(th), Math.sin(th)], nf = [fa[1], -fa[0]];   // nf points to the upper (biceps) side of the forearm
    const onFa = (d, off = 0) => [P[0] + d * fa[0] + off * nf[0], P[1] + d * fa[1] + off * nf[1]];
    const G = { bicepsEnd: [172, 120], bicepsInsert: onFa(40, 9), tricepsEnd: [176, 186], tricepsInsert: onFa(-10, -13), biceps: { state: "contracted" }, triceps: { state: "relaxed" }, tendon: ["muscle", "bone"], ligament: ["bone", "bone"] };
    const side = (pt) => Math.sign(fa[0] * (pt[1] - P[1]) - fa[1] * (pt[0] - P[0]));
    return {
      parts: { humerus: "The upper arm bone: fixed while the forearm moves.", "radius and ulna": "The forearm bones, which the muscles move as a lever about the elbow.", biceps: "Contracts and shortens to bend the elbow.", triceps: "Relaxes and lengthens as the elbow bends; it contracts to straighten it.",
        tendon: "Joins muscle to bone.", ligament: "Joins bone to bone and holds the joint together.", cartilage: "Smooth tissue covering the bone ends, so they glide.", "synovial fluid": "Lubricates the joint.", "joint capsule": "The capsule round a synovial joint.", pivot: "The hinge joint is the pivot of the lever.", pull: "A muscle can only pull: it never pushes." },
      order: ["humerus", "radius and ulna"],
      facts: { musclesOnOppositeSides: () => side(G.bicepsInsert) !== side(G.tricepsInsert) && side(G.bicepsInsert) !== 0, oneContractsOneRelaxes: () => G.biceps.state !== G.triceps.state, tendonJoinsMuscleToBone: () => G.tendon[0] === "muscle" && G.tendon[1] === "bone",
        ligamentJoinsBoneToBone: () => G.ligament[0] === "bone" && G.ligament[1] === "bone", musclePullsTowardItself: () => (G.bicepsEnd[0] - G.bicepsInsert[0]) * 1 + (G.bicepsEnd[1] - G.bicepsInsert[1]) * 1 !== 0 && Math.hypot(G.bicepsEnd[0] - G.bicepsInsert[0], G.bicepsEnd[1] - G.bicepsInsert[1]) > 0 },
      draw() {
        let s = "", m = [];
        const [px, py] = P, tip = onFa(150), L = (a, b, w, col, op = 1) => `<path d="M${f1(a[0])} ${f1(a[1])} L${f1(b[0])} ${f1(b[1])}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-opacity="${op}" fill="none"/>`;
        s += part("synovial fluid", this.parts["synovial fluid"], `<ellipse cx="${px}" cy="${py}" rx="38" ry="30" fill="${C.a1}" fill-opacity=".22"/>`); m.push(["synovial fluid", px + 27, py + 15]);
        s += part("humerus", this.parts.humerus, L([40, py], P, 22, C.a3, 0.4) + L([40, py], P, 22, C.a3, 0)); m.push(["humerus", 70, py + 4, "L"]);
        s += part("radius and ulna", this.parts["radius and ulna"], L(P, tip, 18, C.a3, 0.4)); m.push(["radius and ulna", ...onFa(120, 0)]);
        s += part("cartilage", this.parts.cartilage, `<circle cx="${px - 4}" cy="${py}" r="13" fill="${C.a4}" fill-opacity=".7" stroke="${C.a4}" stroke-width="1.6"/><circle cx="${f1(onFa(6)[0])}" cy="${f1(onFa(6)[1])}" r="10" fill="${C.a4}" fill-opacity=".7" stroke="${C.a4}" stroke-width="1.6"/>`); m.push(["cartilage", px - 22, py - 7, "L"]);
        s += part("joint capsule", this.parts["joint capsule"], `<ellipse cx="${px}" cy="${py}" rx="38" ry="30" fill="none" stroke="${C.a2}" stroke-width="2.6" stroke-dasharray="5 3"/>`); m.push(["joint capsule", px + 36, py - 14]);
        const l1 = [px - 20, py - 14], l2 = onFa(18, 10), l3 = [px - 18, py + 15], l4 = onFa(14, -11);
        s += part("ligament", this.parts.ligament, L(l1, l2, 4, C.good) + L(l3, l4, 4, C.good)); m.push(["ligament", (l3[0] + l4[0]) / 2 - 6, (l3[1] + l4[1]) / 2 + 4, "L"]);
        // biceps (contracted: thick) and triceps (relaxed: thin), each joined to bone by a tendon
        const belly = (a, b, h, col, op) => { const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, ux = b[0] - a[0], uy = b[1] - a[1], d = Math.hypot(ux, uy), nx = -uy / d, ny = ux / d; return `<path d="M${f1(a[0])} ${f1(a[1])} Q${f1(mx + nx * h)} ${f1(my + ny * h)} ${f1(b[0])} ${f1(b[1])} Q${f1(mx - nx * h)} ${f1(my - ny * h)} ${f1(a[0])} ${f1(a[1])} Z" fill="${col}" fill-opacity="${op}" stroke="${col}" stroke-width="2"/>`; };
        s += part("biceps", this.parts.biceps, belly([88, 148], G.bicepsEnd, 21, C.a2, 0.6)); m.push(["biceps", 130, 118]);
        s += part("triceps", this.parts.triceps, belly([88, 172], G.tricepsEnd, 10, C.a1, 0.25)); m.push(["triceps", 130, 188, "L"]);
        s += part("tendon", this.parts.tendon, L(G.bicepsEnd, G.bicepsInsert, 3, C.ink, 0.8) + L(G.tricepsEnd, G.tricepsInsert, 3, C.ink, 0.8)); m.push(["tendon", (G.bicepsEnd[0] + G.bicepsInsert[0]) / 2, (G.bicepsEnd[1] + G.bicepsInsert[1]) / 2]);
        s += part("pull", this.parts.pull, arrowSvg(G.bicepsInsert[0] + 2, G.bicepsInsert[1] + 2, G.bicepsInsert[0] - 30, G.bicepsInsert[1] - 9, C.a2));
        s += part("pivot", this.parts.pivot, `<circle cx="${px}" cy="${py}" r="4.2" fill="${C.ink}"/>`); m.push(["pivot", px, py]);
        s += text(300, 244, "biceps contracts, triceps relaxes: the forearm is pulled up", { size: 10, fill: C.soft, anchor: "end" });
        const K = 1.4, TX = -36, TY = -50;
        return { s: `<g transform="translate(${TX} ${TY}) scale(${K})">${s}</g>`, m: m.map(([n, x, y, sd]) => [n, x * K + TX, y * K + TY, sd]) };
      },
    };
  })(),
};
const arrowSvg = (x1, y1, x2, y2, stroke) => arrow(x1, y1, x2, y2, { stroke, w: 2.4, head: 9 });
function sectionDraw(spec, W, narrow) {
  if (!SECTION[spec.template]) return { s: "", H: 40 }; // the checks report the unknown template
  const T = SECTION[spec.template], { s: art, m } = T.draw.call(T), wanted = spec.labels.map((n) => m.find((q) => q[0] === n)).filter(Boolean);
  const hasL = !narrow && wanted.some((q) => q[3] === "L"), leftW = hasL ? 150 : 0;
  const k = narrow ? (W - 20) / 420 : Math.min(1, (W - 250 - leftW) / 420), ox = (narrow ? 10 : 14) + leftW, oy = 8;
  let s = `<g transform="translate(${ox} ${oy}) scale(${k.toFixed(4)})">${art}</g>`;
  const marks = wanted.map(([n, x, y, side]) => [n, ox + x * k, oy + y * k, side]);
  let H = oy + 300 * k + 14;
  if (!narrow) {
    const figH = oy + 300 * k;
    for (const side of ["L", "R"]) {
      const group = marks.filter((q) => (q[3] === "L") === (side === "L")).sort((a, b) => a[2] - b[2] || b[1] - a[1]);
      if (!group.length) continue;
      const lx = side === "L" ? leftW - 4 : ox + 420 * k + 24, ys = group.map((q) => Math.max(24, q[2]));
      for (let i = 1; i < ys.length; i++) ys[i] = Math.max(ys[i], ys[i - 1] + 26);
      for (let i = ys.length - 2; i >= 0 && ys[ys.length - 1] > figH - 6; i--) ys[i] = Math.min(ys[i], ys[i + 1] - 26);
      group.forEach(([n, ax, ay], i) => { const ly = ys[i];
        s += line(ax, ay, side === "L" ? lx + 6 : lx - 4, ly, { stroke: C.soft, w: 1.1 }) + `<circle cx="${f1(ax)}" cy="${f1(ay)}" r="2.6" fill="${C.ink}"/>` + text(side === "L" ? lx : lx, ly, n, { size: 12.5, weight: 600, anchor: side === "L" ? "end" : "start" });
        H = Math.max(H, ly + 12); });
    }
  } else {
    marks.forEach(([n, ax, ay], i) => { s += `<circle cx="${f1(ax)}" cy="${f1(ay)}" r="9" fill="var(--vx-bg, #ffffff)" stroke="${C.ink}" stroke-width="1.4"/>` + text(ax, ay + 0.5, String(i + 1), { size: 10.5, weight: 700 }); });
    marks.forEach(([n], i) => { s += text(14, H + 8 + i * 19, `${i + 1}  ${n}`, { size: 12.5, anchor: "start" }); });
    H += marks.length * 19 + 14;
  }
  return { s, H };
}
function sectionChecks(spec) {
  const T = SECTION[spec.template], out = [check(`the template "${spec.template}" is known`, !!T)];
  if (!T) return out;
  const { m } = T.draw.call(T), known = new Set(m.map((q) => q[0]));
  const bad = spec.labels.filter((l) => !known.has(l) || !T.parts[l]);
  out.push(check(`every labelled part is drawn, and has a name and a function`, !bad.length, bad.join(", ") || `${spec.labels.length} parts`));
  for (const c of spec.claims || []) {
    if (c.type === "fact") out.push(check(`${c.text || c.id}`, !!T.facts[c.id]?.(), c.id));
    if (c.type === "order") { const idx = c.value.map((v) => T.order.indexOf(v)); out.push(check(`from ${c.from || "the outside"} to ${c.to || "the inside"}: ${c.value.join(", ")}`, idx.every((i) => i >= 0) && idx.every((v, i) => i === 0 || v > idx[i - 1]), `template order: ${T.order.join(" > ")}`)); }
  }
  return out;
}

// ======================================================================== cleavage
// Early cleavage: the zygote divides without growing, so the cells get smaller while the embryo stays the same size.
// spec: R, stages: [{name, n, day?, kind?: "blastocyst", R?}]. Each stage's cells are an equal-area partition of the same
// disc (a cross-section drawn schematically); the checks recompute every cell's area from its geometry. The days are the
// lesson's human timeline: two cells on day 1, a morula of about 16 cells on day 3, a blastocyst on day 5.
const HUMAN_DAY = { 2: 1, 16: 3, blastocyst: 5 };
const annularSector = (cx, cy, r0, r1, a0, a1) => {
  const p = (r, a) => pol(cx, cy, r, a), [x0, y0] = p(r1, a0), [x1, y1] = p(r1, a1), [x2, y2] = p(r0, a1), [x3, y3] = p(r0, a0), big = a1 - a0 > 180 ? 1 : 0;
  return r0 === 0 ? `M${f1(cx)} ${f1(cy)} L${f1(x0)} ${f1(y0)} A${r1} ${r1} 0 ${big} 1 ${f1(x1)} ${f1(y1)} Z` : `M${f1(x0)} ${f1(y0)} A${r1} ${r1} 0 ${big} 1 ${f1(x1)} ${f1(y1)} L${f1(x2)} ${f1(y2)} A${r0} ${r0} 0 ${big} 0 ${f1(x3)} ${f1(y3)} Z`;
};
const cellArea = (c) => ((c.a1 - c.a0) / 360) * Math.PI * (c.r1 * c.r1 - c.r0 * c.r0);
export function cleavageCells(n, R) {
  const ring = (k, r0, r1, off = 0) => Array.from({ length: k }, (_, i) => ({ r0, r1, a0: off + (i * 360) / k, a1: off + ((i + 1) * 360) / k }));
  if (n === 1) return [{ r0: 0, r1: R, a0: 0, a1: 360 }];
  if (n === 2) return ring(2, 0, R, -90);
  if (n === 4 || n === 8) return ring(n, 0, R, 0);
  if (n === 16) return [...ring(4, 0, R / 2, 45), ...ring(12, R / 2, R, 0)];
  return [];
}
const BLASTO = { ring: 9, icmCell: 5.2, icmRing: 7.5 };
function blastocystGeometry(R, angle) {
  const inner = R - BLASTO.ring, extent = BLASTO.icmRing + BLASTO.icmCell, dist = inner - extent + 1.5;
  return { inner, extent, dist, centre: pol(0, 0, dist, angle), cells: Array.from({ length: 5 }, (_, j) => pol(...pol(0, 0, dist, angle), BLASTO.icmRing, j * 72)) };
}
function cleavageDraw(spec, W, narrow) {
  const R0 = spec.R || 36, st = spec.stages, cols = narrow ? 3 : st.length, cw = (W - 20) / cols, rh = 2 * R0 + 74;
  let s = "";
  st.forEach((g, i) => {
    const col = i % cols, row = Math.floor(i / cols), cx = 10 + cw * (col + 0.5), cy = 12 + row * rh + R0 + 6, R = g.R || R0;
    s += `<g data-stage="${esc(g.name)}">`;
    s += part("zona pellucida", "The glycoprotein coat round the egg and the early embryo.", `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${R + 5}" fill="none" stroke="${C.a3}" stroke-width="3" stroke-opacity=".7"/>`);
    if (g.kind === "blastocyst") {
      const B = blastocystGeometry(R, g.icmAngle ?? -135);
      s += part("trophoblast", "The outer layer of the blastocyst: it forms part of the placenta.", `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(R - BLASTO.ring / 2)}" fill="${C.a2}" fill-opacity=".1" stroke="${C.a2}" stroke-width="${BLASTO.ring}" stroke-opacity=".55"/>` + Array.from({ length: 18 }, (_, k) => { const [x1, y1] = pol(cx, cy, R - BLASTO.ring, k * 20), [x2, y2] = pol(cx, cy, R, k * 20); return `<path d="M${f1(x1)} ${f1(y1)} L${f1(x2)} ${f1(y2)}" stroke="${C.a2}" stroke-width="1.2"/>`; }).join(""));
      s += part("blastocoel", "The fluid-filled cavity of the blastocyst.", `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(B.inner)}" fill="${C.a1}" fill-opacity=".08"/>`);
      s += part("inner cell mass", "A cluster of cells inside the blastocyst that forms the embryo; embryonic stem cells come from it.", B.cells.map(([x, y]) => `<circle cx="${f1(cx + x)}" cy="${f1(cy + y)}" r="${BLASTO.icmCell}" fill="${C.a5}" fill-opacity=".5" stroke="${C.a5}" stroke-width="1.4"/>`).join(""));
    } else {
      const cells = cleavageCells(g.n, R);
      s += part("blastomeres", "Cells made by cleavage: each division halves their volume because there is no growth between divisions.", cells.map((c, k) => (g.n === 1 ? `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${R}"` : `<path d="${annularSector(cx, cy, c.r0, c.r1, c.a0, c.a1)}"`) + ` fill="${C.a4}" fill-opacity="${k % 2 ? 0.34 : 0.2}" stroke="${C.a4}" stroke-width="1.6"/>`).join(""));
    }
    s += `</g>` + text(cx, cy + R + 22, g.name, { size: 12.5, weight: 700 }) + text(cx, cy + R + 38, g.kind === "blastocyst" ? "schematic" : g.n === 1 ? "1 cell" : `${g.n} cells`, { size: 11.5, fill: C.soft }) + (g.day != null ? text(cx, cy + R + 53, `day ${g.day}`, { size: 11.5, fill: C.soft }) : "");
    if (col < cols - 1 && i < st.length - 1) s += arrow(cx + R + 10, cy, cx + cw - R - 10, cy, { stroke: C.soft, w: 1.6, head: 7 });
  });
  const rows = Math.ceil(st.length / cols), H = 12 + rows * rh + 8;
  const note = textBlock(W / 2, H + 6, "Each cell is drawn with the same share of the area: dividing without growing makes cells smaller, not the embryo bigger.", narrow ? 46 : 200, { size: 11.5, fill: C.soft });
  return { s: s + note.svg, H: H + 14 + note.h };
}
function cleavageChecks(spec) {
  const R0 = spec.R || 36, out = [], cl = spec.stages.filter((g) => g.kind !== "blastocyst");
  out.push(check("the first stage is the zygote: one cell", cl[0]?.n === 1));
  const total0 = Math.PI * R0 * R0;
  cl.forEach((g, i) => {
    const cells = cleavageCells(g.n, g.R || R0), areas = cells.map(cellArea);
    out.push(check(`${g.name}: ${g.n} cells drawn`, cells.length === g.n && g.n > 0, `${cells.length} drawn`));
    out.push(check(`${g.name}: every cell has 1/${g.n} of the zygote's area (no growth between divisions)`, areas.length > 0 && areas.every((a) => Math.abs(a - total0 / g.n) / (total0 / g.n) < 0.005)));
    out.push(check(`${g.name}: the embryo is no bigger than the zygote`, (g.R || R0) === R0));
    if (i > 0) out.push(check(`${g.name}: each division doubles the number of cells`, g.n === 2 * cl[i - 1].n, `${cl[i - 1].n} → ${g.n}`));
    if (g.day != null) out.push(check(`${g.name}: day ${g.day} in the lesson's human timeline`, HUMAN_DAY[g.n] === g.day));
  });
  for (const g of spec.stages.filter((q) => q.kind === "blastocyst")) {
    const B = blastocystGeometry(g.R || R0, g.icmAngle ?? -135), d = Math.hypot(...B.centre);
    out.push(check("blastocyst: the inner cell mass lies inside the cavity, against the trophoblast", d + B.extent <= B.inner + 2 && d + B.extent >= B.inner - 1));
    out.push(check("blastocyst: the trophoblast is the outer layer", (g.R || R0) - BLASTO.ring > 0 && (g.R || R0) === R0));
    if (g.day != null) out.push(check(`blastocyst: day ${g.day} in the lesson's human timeline`, HUMAN_DAY.blastocyst === g.day));
  }
  return out;
}

// ======================================================================== fertilisation
// Fertilisation in mammals, as the lesson orders it. spec: species: "human", haploid, diploid, steps: [{id, title, note, inside, blocked}]
// with id one of approach, acrosome, fusion, cortical, combine. The acrosome reaction comes before fusion, the cortical
// reaction and the joining of the nuclei after it; no sperm is inside before fusion and exactly one afterwards; the
// cortical reaction leaves at least one sperm blocked outside.
const FERT_RANK = { approach: 0, acrosome: 1, fusion: 2, cortical: 3, combine: 3 };
const FERT_DEF = { approach: "Capacitated sperm reaches the zona pellucida.", acrosome: "The acrosome reaction releases enzymes that digest a path through the zona pellucida.", fusion: "The sperm membrane fuses with the egg membrane and the sperm nucleus enters.", cortical: "Cortical granules release enzymes that harden the zona pellucida, blocking other sperm.", combine: "The egg completes meiosis II and the two haploid nuclei combine." };
function fertPanel(step, hap) {
  const Re = 34, Rz = 41, id = step.id, hard = id === "cortical" || id === "combine";
  const head = (x, y, rot = 0, cap = true, tail = 64) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M0 -8 Q-3 ${-(tail - 24)} 0 ${-tail}" fill="none" stroke="${C.ink}" stroke-width="1.6"/><ellipse cx="0" cy="0" rx="6" ry="8" fill="${C.a1}" fill-opacity=".8" stroke="${C.a1}" stroke-width="1.6"/>${cap ? `<ellipse cx="0" cy="3" rx="4.6" ry="3.4" fill="${C.a2}" fill-opacity=".9"/>` : ""}</g>`;
  let s = part("egg", "The egg cell, with its plasma membrane.", `<circle r="${Re}" fill="${C.a4}" fill-opacity=".14" stroke="${C.a4}" stroke-width="2.2"/>`);
  // the zona pellucida; the acrosome reaction opens a path through it, and the cortical reaction hardens it
  const notch = id === "acrosome" ? 12 : id === "fusion" ? 15 : 0, w = hard ? 9 : 6;
  const arc = notch ? (() => { const [x0, y0] = pol(0, 0, Rz, -90 + notch), [x1, y1] = pol(0, 0, Rz, -90 - notch); return `<path d="M${f1(x0)} ${f1(y0)} A${Rz} ${Rz} 0 1 1 ${f1(x1)} ${f1(y1)}" fill="none" stroke="${C.a3}" stroke-width="${w}" stroke-opacity=".7"/>`; })() : `<circle r="${Rz}" fill="none" stroke="${C.a3}" stroke-width="${w}" stroke-opacity="${hard ? 0.95 : 0.7}"/>`;
  s += part("zona pellucida", hard ? "The zona pellucida, now hardened by the cortical reaction so that no more sperm can bind." : "The glycoprotein layer round the egg.", arc);
  if (id === "approach") s += part("sperm", "A capacitated sperm; the acrosome on its head holds digestive enzymes.", head(0, -57));
  if (id === "acrosome") s += part("acrosomal enzymes", "Enzymes released from the acrosome digest the zona pellucida.", [[-9, -44], [9, -44], [-5, -37], [5, -37]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" fill="${C.a2}"/>`).join("")) + part("sperm", "The sperm head, its acrosome emptied.", head(0, -50, 0, false));
  if (id === "fusion") s += part("sperm", "The sperm membrane fuses with the egg membrane.", head(0, -41, 0, false)) + part("sperm nucleus", `The sperm nucleus enters the egg, carrying ${hap} chromosomes.`, `<circle cx="0" cy="-22" r="6" fill="${C.a5}" fill-opacity=".6" stroke="${C.a5}" stroke-width="1.6"/>`);
  if (id === "cortical") {
    s += part("cortical granules", "Granules under the egg membrane release enzymes that harden the zona pellucida.", Array.from({ length: 10 }, (_, k) => { const [x, y] = pol(0, 0, Re - 5, k * 36 + 10), [x2, y2] = pol(0, 0, Re + 3.5, k * 36 + 10); return `<circle cx="${f1(x)}" cy="${f1(y)}" r="2.3" fill="${C.a2}" fill-opacity=".8"/><circle cx="${f1(x2)}" cy="${f1(y2)}" r="1.6" fill="${C.a2}"/>`; }).join(""));
    s += part("sperm nucleus", "The nucleus of the one sperm that entered.", `<circle cx="0" cy="-14" r="6" fill="${C.a5}" fill-opacity=".6" stroke="${C.a5}" stroke-width="1.6"/>`);
    if (step.blocked > 0) s += part("blocked sperm", "A second sperm cannot bind the hardened zona, so polyspermy is prevented.", head(40, -50, 25, true, 36) + `<path d="M28 -66 l12 12 M40 -66 l-12 12" stroke="${C.bad}" stroke-width="2"/>`);
  }
  if (id === "combine") s += part("pronuclei", `The two haploid nuclei (${hap} chromosomes each) combine.`, `<circle cx="-8" cy="0" r="12" fill="${C.a5}" fill-opacity=".4" stroke="${C.a5}" stroke-width="1.6"/><circle cx="8" cy="0" r="12" fill="${C.a4}" fill-opacity=".4" stroke="${C.a4}" stroke-width="1.6"/>` + text(-12, 0, String(hap), { size: 10.5, weight: 700 }) + text(12, 0, String(hap), { size: 10.5, weight: 700 }));
  return s;
}
function fertilisationDraw(spec, W, narrow) {
  const st = spec.steps, cols = narrow ? 2 : st.length, cw = (W - 20) / cols, rh = 232;
  let s = "";
  st.forEach((g, i) => {
    const col = i % cols, row = Math.floor(i / cols), cx = 10 + cw * (col + 0.5), top = 10 + row * rh;
    s += `<g transform="translate(${f1(cx)} ${f1(top + 96)})">${fertPanel(g, spec.haploid)}</g>`;
    s += text(cx, top + 158, `${i + 1}  ${g.title}`, { size: 12.5, weight: 700 });
    wrap(g.note, narrow ? 28 : 19).forEach((l, k) => { s += text(cx, top + 177 + k * 15, l, { size: 11.5, fill: C.soft }); });
  });
  const rows = Math.ceil(st.length / cols), H = 10 + rows * rh;
  s += text(W / 2, H, `${spec.haploid} + ${spec.haploid} = ${spec.diploid}: two haploid gametes make a diploid zygote`, { size: 13, weight: 700 });
  return { s, H: H + 20 };
}
function fertilisationChecks(spec) {
  const out = [], st = spec.steps, ids = st.map((g) => g.id);
  out.push(check("every step is a known stage of fertilisation", ids.every((i) => i in FERT_RANK), ids.filter((i) => !(i in FERT_RANK)).join(", ")));
  const at = (id) => ids.indexOf(id);
  if (at("acrosome") >= 0 && at("fusion") >= 0) out.push(check("the acrosome reaction comes before membrane fusion", at("acrosome") < at("fusion")));
  if (at("approach") >= 0) out.push(check("the sperm reaches the zona pellucida first", at("approach") === 0));
  for (const id of ["cortical", "combine"]) if (at(id) >= 0 && at("fusion") >= 0) out.push(check(`the ${id === "cortical" ? "cortical reaction" : "joining of the nuclei"} comes after fusion`, at(id) > at("fusion")));
  for (const g of st) {
    const afterFusion = FERT_RANK[g.id] >= 2;
    out.push(check(`${g.title}: ${afterFusion ? "exactly one sperm is inside the egg" : "no sperm is inside the egg yet"}`, g.inside === (afterFusion ? 1 : 0), `${g.inside} inside`));
    if (g.id === "cortical") out.push(check("the cortical reaction leaves other sperm blocked outside (polyspermy prevented)", g.blocked >= 1));
    if (g.note !== undefined && FERT_DEF[g.id]) out.push(check(`${g.title}: a step of mammalian fertilisation`, true));
  }
  out.push(check(`${spec.haploid} + ${spec.haploid} = ${spec.diploid}: fertilisation restores the diploid number`, spec.haploid * 2 === spec.diploid));
  if (spec.species === "human") out.push(check("humans: gametes carry 23 chromosomes, the zygote 46", spec.haploid === 23 && spec.diploid === 46));
  return out;
}

// ======================================================================== cytometry
// Flow cytometry from a seeded simulation. spec: seed, n, populations [{name, fsc:[mean, sd], ssc:[mean, sd], frac, cd4?}],
// gate {fsc:[lo, hi], ssc:[lo, hi], population}, cd4: {frac, neg:[mean, sd], pos:[mean, sd]} (log10 units), claims [{type: "gate" | "positive", percent, tol}].
// The events are generated here, so the percentages drawn are counted from them. Values are illustrative, not patient data.
export function cytometryData(spec) {
  const r = mulberry(spec.seed || 1), gauss = () => Math.sqrt(-2 * Math.log(1 - r())) * Math.cos(2 * Math.PI * r());
  const ev = [];
  for (const p of spec.populations) for (let i = 0, k = Math.round(spec.n * p.frac); i < k; i++) ev.push({ pop: p.name, fsc: Math.max(5, Math.min(995, p.fsc[0] + p.fsc[1] * gauss())), ssc: Math.max(5, Math.min(995, p.ssc[0] + p.ssc[1] * gauss())) });
  const g = spec.gate, inGate = (e) => e.fsc >= g.fsc[0] && e.fsc <= g.fsc[1] && e.ssc >= g.ssc[0] && e.ssc <= g.ssc[1];
  const gated = ev.filter(inGate), target = ev.filter((e) => e.pop === g.population);
  const draw = (m) => m[0] + m[1] * gauss();
  for (const e of ev) { e.cd4 = e.pop === g.population && r() < spec.cd4.frac; e.stained = draw(e.cd4 ? spec.cd4.pos : spec.cd4.neg); e.control = draw(spec.cd4.neg); }
  const ctrl = gated.map((e) => e.control).sort((a, b) => a - b), threshold = ctrl[Math.floor(0.99 * (ctrl.length - 1))];
  const positive = gated.filter((e) => e.stained > threshold);
  return { events: ev, gated, inGate, threshold, gatePercent: (100 * gated.length) / ev.length, purity: gated.filter((e) => e.pop === g.population).length / gated.length, recall: gated.filter((e) => e.pop === g.population).length / target.length, positivePercent: (100 * positive.length) / gated.length, controlBelow: ctrl.filter((v) => v <= threshold).length / ctrl.length };
}
function cytometryDraw(spec, W, narrow) {
  const D = cytometryData(spec), g = spec.gate, pw = narrow ? W - 80 : Math.min(290, (W - 150) / 2), ph = narrow ? 210 : 240;
  const x1 = 56, y1 = 40, x2 = narrow ? 56 : x1 + pw + 74, y2 = narrow ? y1 + ph + 92 : y1;
  const sx = (v) => x1 + (v / 1000) * pw, sy = (v) => y1 + ph - (v / 1000) * ph;
  let s = text(x1 - 40, 14, "1  Gate on the scatter plot", { size: 13, weight: 700, anchor: "start" });
  s += `<rect x="${x1}" y="${y1}" width="${pw}" height="${ph}" fill="none" stroke="${C.soft}" stroke-width="1.4"/>`;
  for (const t of [0, 250, 500, 750, 1000]) s += text(sx(t), y1 + ph + 12, String(t), { size: 10.5, fill: C.soft }) + text(x1 - 6, sy(t), String(t), { size: 10.5, fill: C.soft, anchor: "end" });
  s += text(x1 + pw / 2, y1 + ph + 29, "forward scatter (size), arbitrary units", { size: 11.5 }) + `<text transform="translate(${x1 - 40} ${y1 + ph / 2}) rotate(-90)" font-size="11.5" text-anchor="middle" dominant-baseline="middle" fill="${C.ink}">side scatter (granularity)</text>`;
  const dots = (list) => "M" + list.map((e) => `${f1(sx(e.fsc))} ${f1(sy(e.ssc))}h0`).join("M");
  const out = D.events.filter((e) => !D.inGate(e)), inn = D.gated;
  s += part("events outside the gate", "Cells outside the gate are not counted in the next plot.", `<path d="${dots(out)}" stroke="${C.soft}" stroke-opacity=".55" stroke-width="2.4" stroke-linecap="round" fill="none"/>`);
  s += part("events inside the gate", "Cells inside the gate: the population chosen for analysis.", `<path d="${dots(inn)}" stroke="${C.a1}" stroke-opacity=".75" stroke-width="2.4" stroke-linecap="round" fill="none"/>`);
  s += part("gate", "A region drawn on the plot to select a population of cells.", `<rect x="${f1(sx(g.fsc[0]))}" y="${f1(sy(g.ssc[1]))}" width="${f1(sx(g.fsc[1]) - sx(g.fsc[0]))}" height="${f1(sy(g.ssc[0]) - sy(g.ssc[1]))}" fill="none" stroke="${C.a2}" stroke-width="2.2"/>`);
  for (const p of spec.populations) s += text(sx(p.fsc[0]) + (p.name === g.population ? 8 : 0), sy(p.ssc[0]) - (p.name === g.population ? 62 : 38) , p.name, { size: 11.5, weight: 700, fill: p.name === g.population ? C.a2 : C.ink, halo: true });
  s += text(sx(g.fsc[1]) + 4, sy(g.ssc[1]) + 4, `gate: ${D.gatePercent.toFixed(1)}% of events`, { size: 11.5, weight: 700, fill: C.a2, anchor: "start", halo: true });
  // histogram of anti-CD4 fluorescence in the gated cells
  const bins = 44, lo = 0, hi = 4, bw = pw / bins, count = (key) => { const b = new Array(bins).fill(0); for (const e of D.gated) { const k = Math.floor(((e[key] - lo) / (hi - lo)) * bins); if (k >= 0 && k < bins) b[k]++; } return b; };
  const st = count("stained"), ct = count("control"), top = Math.max(...st, ...ct) * 1.12, hx = (v) => x2 + ((v - lo) / (hi - lo)) * pw, hy = (c) => y2 + ph - (c / top) * ph;
  s += text(x2 - 40, narrow ? y2 - 26 : 14, "2  Count the labelled cells in the gate", { size: 13, weight: 700, anchor: "start" });
  s += `<rect x="${x2}" y="${y2}" width="${pw}" height="${ph}" fill="none" stroke="${C.soft}" stroke-width="1.4"/>`;
  [0, 1, 2, 3, 4].forEach((t) => { s += text(hx(t), y2 + ph + 12, t === 0 ? "1" : `10^{${t}}`, { size: 10.5, fill: C.soft }); });
  s += text(x2 + pw / 2, y2 + ph + 29, "anti-CD4 fluorescence, arbitrary units (log)", { size: 11.5 }) + `<text transform="translate(${x2 - 14} ${y2 + ph / 2}) rotate(-90)" font-size="11.5" text-anchor="middle" dominant-baseline="middle" fill="${C.ink}">cells</text>`;
  const bars = (b, fill, op, stroke) => b.map((c, i) => `<rect x="${f1(x2 + i * bw)}" y="${f1(hy(c))}" width="${f1(bw)}" height="${f1(y2 + ph - hy(c))}" fill="${fill}" fill-opacity="${op}" stroke="${stroke}" stroke-width=".8"/>`).join("");
  s += part("stained gated cells", "Gated cells labelled with fluorescent anti-CD4 antibody.", bars(st, C.a1, 0.5, C.a1)) + part("unstained control", "Unstained cells show the background fluorescence and set the threshold for a positive signal.", bars(ct, "none", 0, C.ink));
  s += part("threshold", "Set from the unstained control: only brighter cells count as positive.", `<path d="M${f1(hx(D.threshold))} ${y2} V${y2 + ph}" stroke="${C.a2}" stroke-width="2" stroke-dasharray="5 4"/>`);
  s += text(hx(D.threshold) + 5, y2 + 12, `threshold from the control`, { size: 10.5, anchor: "start", fill: C.a2, weight: 700 }) + text(hx(3.1), y2 + 34, `CD4-positive: ${D.positivePercent.toFixed(1)}%`, { size: 12, weight: 700, fill: C.a1, halo: true });
  const lx = hx(2.3);
  s += `<path d="M${f1(lx)} ${y2 + 60} h16" stroke="${C.ink}" stroke-width="1.4"/>` + text(lx + 22, y2 + 60, "unstained control", { size: 10.5, anchor: "start" }) + `<rect x="${f1(lx)}" y="${y2 + 74}" width="16" height="8" fill="${C.a1}" fill-opacity=".5" stroke="${C.a1}"/>` + text(lx + 22, y2 + 78, "stained cells", { size: 10.5, anchor: "start" });
  const H = (narrow ? y2 + ph : y1 + ph) + 44, note = textBlock(W / 2, H + 8, `Simulated data (${spec.n} events, illustrative values): not from a real patient.`, narrow ? 52 : 120, { size: 11, fill: C.soft });
  return { s: s + note.svg, H: H + 16 + note.h };
}
function cytometryChecks(spec) {
  const D = cytometryData(spec), out = [], g = spec.gate;
  out.push(check("the gate is a region of the plot", g.fsc[0] < g.fsc[1] && g.ssc[0] < g.ssc[1] && g.fsc[0] >= 0 && g.fsc[1] <= 1000));
  out.push(check(`the gate collects the ${g.population}: at least 90% of them are inside`, D.recall >= 0.9, `${(100 * D.recall).toFixed(0)}% inside`));
  out.push(check(`the gated cells are mostly ${g.population}: at least 90%`, D.purity >= 0.9, `${(100 * D.purity).toFixed(0)}% pure`));
  out.push(check("the threshold is set from the unstained control: at least 98% of control cells are below it", D.controlBelow >= 0.98, `${(100 * D.controlBelow).toFixed(1)}%`));
  out.push(check("the population fractions add to 1", Math.abs(spec.populations.reduce((a, p) => a + p.frac, 0) - 1) < 1e-9));
  for (const c of spec.claims || []) {
    const v = c.type === "gate" ? D.gatePercent : D.positivePercent;
    out.push(check(c.type === "gate" ? `the gate holds ${c.percent}% of the events (counted: ${v.toFixed(1)}%)` : `${c.percent}% of the gated cells are CD4-positive (counted: ${v.toFixed(1)}%)`, Math.abs(v - c.percent) <= (c.tol ?? 1)));
  }
  return out;
}

// ======================================================================== karyotype
// Chromosome numbers worked out from copies. spec: cases [{name, sex: "XX"|"XY"|"X"|"XXY", extra: {chromosome: copies added}}, ...].
// The total is 44 autosomes + the sex chromosomes + extras; the standard notation is rebuilt from it ("47,XX,+21") and must match
// the one stated; named syndromes must be what the lesson says: Down 47 with an extra 21, Turner 45,X, Klinefelter 47,XXY.
// Lengths are the approximate sizes of human chromosomes 21, X and Y in the reference genome (megabases), drawn to one scale.
export const CHR_MB = { 21: 46.7, X: 156.0, Y: 57.2 };
export function karyotypeOf(c) {
  const extras = Object.entries(c.extra || {}).filter(([, n]) => n), total = 44 + c.sex.length + extras.reduce((a, [, n]) => a + n, 0);
  const ex = extras.map(([k, n]) => (n > 0 ? `+${k}` : `-${k}`)).join(",");
  return { total, notation: `${total},${c.sex}${ex ? "," + ex : ""}`, aneuploid: total !== 46 };
}
const SYNDROME = { "Down syndrome": (c) => (c.extra?.[21] === 1) && Object.keys(c.extra).length === 1, "Turner syndrome": (c) => c.sex === "X" && !Object.values(c.extra || {}).some(Boolean), "Klinefelter syndrome": (c) => c.sex === "XXY" && !Object.values(c.extra || {}).some(Boolean), typical: (c) => (c.sex === "XX" || c.sex === "XY") && !Object.values(c.extra || {}).some(Boolean) };
function karyotypeDraw(spec, W, narrow) {
  const k = 0.55, colour = { 21: C.a4, X: C.a2, Y: C.a5 }, rodH = CHR_MB.X * k, rowH = narrow ? rodH + 92 : rodH + 46;
  let s = "";
  const rod = (x, y, mb, col) => `<rect x="${f1(x)}" y="${f1(y - mb * k)}" width="12" height="${f1(mb * k)}" rx="6" fill="${col}" fill-opacity=".55" stroke="${col}" stroke-width="1.8"/>`;
  spec.cases.forEach((c, i) => {
    const K = karyotypeOf(c), y0 = 10 + i * rowH, n21 = 2 + (c.extra?.[21] || 0), tx = 14;
    s += `<g data-case="${esc(c.name)}">` + text(tx, y0 + 14, c.name, { size: 13.5, weight: 700, anchor: "start" });
    let base;
    if (narrow) { s += text(tx, y0 + 34, `${K.notation}  ·  ${K.total} chromosomes${K.aneuploid ? ": aneuploid" : ""}`, { size: 12, anchor: "start", fill: C.a1, weight: 700 }); base = y0 + 50 + rodH; }
    else { s += text(tx, y0 + 34, K.notation, { size: 13, anchor: "start", fill: C.a1, weight: 700 }) + text(tx, y0 + 52, `${K.total} chromosomes${K.aneuploid ? ": aneuploid" : ""}`, { size: 11.5, anchor: "start", fill: C.soft }); base = y0 + 8 + rodH; }
    const gx = narrow ? 40 : 250, sx0 = gx + 100 + (narrow ? 20 : 60);
    for (let j = 0; j < n21; j++) s += part("chromosome 21", "The smallest autosome (about 47 Mb).", rod(gx + j * 22, base, CHR_MB[21], colour[21]));
    [...c.sex].forEach((ch, j) => { s += part(`${ch} chromosome`, ch === "X" ? "The X chromosome (about 156 Mb)." : "The Y chromosome (about 57 Mb).", rod(sx0 + j * 22, base, CHR_MB[ch], colour[ch])); });
    s += text(gx, base + 16, `21 × ${n21}`, { size: 11.5, anchor: "start", fill: C.soft }) + text(sx0, base + 16, c.sex, { size: 11.5, anchor: "start", fill: C.soft }) + `</g>`;
    if (i < spec.cases.length - 1) s += `<path d="M10 ${y0 + rowH - 8} H${W - 10}" stroke="${C.line}" stroke-width="1"/>`;
  });
  const H = 10 + spec.cases.length * rowH, nb = textBlock(W / 2, H + 8, "Chromosomes 21, X and Y are drawn to one scale; all other chromosomes are present in pairs.", narrow ? 46 : 120, { size: 11, fill: C.soft });
  return { s: s + nb.svg, H: H + 16 + nb.h };
}
function karyotypeChecks(spec) {
  const out = [];
  for (const c of spec.cases) {
    const K = karyotypeOf(c);
    out.push(check(`${c.name}: ${K.total} chromosomes in total`, K.total === c.total, `counted ${K.total}`));
    out.push(check(`${c.name}: the notation is ${K.notation}`, K.notation === c.notation, `stated ${c.notation}`));
    const known = SYNDROME[c.name === "typical" || /^typical/.test(c.name) ? "typical" : c.name];
    out.push(check(`${c.name}: matches the chromosome change that name means`, !!known && known(c), known ? "" : "unknown name"));
    out.push(check(`${c.name}: aneuploid exactly when the count is not 46`, K.aneuploid === (c.total !== 46)));
  }
  return out;
}

// ======================================================================== plasmidmap
// A circular map of an engineered vector. spec: name, length (bp), features [{name, type: "ori"|"marker"|"promoter"|"mcs", start, end}],
// sites [{enzyme, pos}], digest: [enzymes]. An engineered vector needs an origin, a selectable marker and a multiple cloning site;
// features must lie on the plasmid and not overlap; every site cuts once and inside the MCS; fragment sizes of a digest add up to the length.
const FEATURE_COLOUR = { ori: "a3", marker: "a2", promoter: "good", mcs: "a1" };
export function digestFragments(length, positions) {
  const p = [...positions].sort((a, b) => a - b);
  if (!p.length) return [length];
  return p.map((x, i) => (i === p.length - 1 ? p[0] + length - x : p[i + 1] - x));
}
function plasmidDraw(spec, W, narrow) {
  const size = narrow ? 340 : 400, R = narrow ? 84 : size / 2 - 78, cx = narrow ? W / 2 : 14 + size / 2 + 60, cy = size / 2 + 6, ang = (bp) => (360 * bp) / spec.length - 90;
  let s = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${C.line}" stroke-width="2"/>`;
  const labels = [];
  for (const f of spec.features) {
    const a0 = ang(f.start), a1 = ang(f.end), big = a1 - a0 > 180 ? 1 : 0, [x0, y0] = pol(cx, cy, R, a0), [x1, y1] = pol(cx, cy, R, a1), col = C[FEATURE_COLOUR[f.type]] || C.a1;
    s += part(f.name, FEATURE_FN[f.type], `<path d="M${f1(x0)} ${f1(y0)} A${R} ${R} 0 ${big} 1 ${f1(x1)} ${f1(y1)}" fill="none" stroke="${col}" stroke-width="${f.type === "mcs" ? 20 : 15}" stroke-linecap="butt"/>`);
    labels.push([f.name, f.start, f.end, a0 + (a1 - a0) / 2]);
  }
  for (const t of spec.sites) { const [x0, y0] = pol(cx, cy, R - 14, ang(t.pos)), [x1, y1] = pol(cx, cy, R + 14, ang(t.pos)); s += `<path d="M${f1(x0)} ${f1(y0)} L${f1(x1)} ${f1(y1)}" stroke="${C.ink}" stroke-width="1.8"/>`; }
  for (const [name, a, b, ang0] of labels) { const [x, y] = pol(cx, cy, R + (narrow ? 30 : 40), ang0), a2 = ((ang0 % 360) + 360) % 360, right = a2 < 90 || a2 > 270; s += text(x + (right ? 4 : -4), y, name, { size: 12.5, weight: 700, anchor: right ? "start" : "end" }) + text(x + (right ? 4 : -4), y + 15, `${a}–${b}`, { size: 10.5, fill: C.soft, anchor: right ? "start" : "end" }); }
  s += text(cx, cy - 22, spec.name, { size: 13, weight: 700 }) + text(cx, cy - 4, `${spec.length.toLocaleString("en")} bp`, { size: 12 }) + text(cx, cy + 14, "illustrative: not a named plasmid", { size: 10.5, fill: C.soft });
  const sites = [...spec.sites].sort((a, b) => a.pos - b.pos).map((t) => `${t.enzyme} ${t.pos}`).join("  ·  ");
  let H = size + 8;
  const sb = textBlock(narrow ? W / 2 : cx, H + 12, `Unique cutters in the MCS: ${sites}`, narrow ? 44 : 70, { size: 11.5 }); s += sb.svg; H += 12 + sb.h;
  if (spec.digest?.length) { const pos = spec.sites.filter((t) => spec.digest.includes(t.enzyme)).map((t) => t.pos), fr = digestFragments(spec.length, pos), tb = textBlock(narrow ? W / 2 : cx, H + 14, `${spec.digest.join(" + ")} gives fragments of ${fr.sort((a, b) => a - b).map((n) => n.toLocaleString("en")).join(" bp and ")} bp`, narrow ? 44 : 70, { size: 11.5, weight: 700 }); s += tb.svg; H += 14 + tb.h; }
  return { s, H: H + 10 };
}
const FEATURE_FN = { ori: "Origin of replication: where copying of the plasmid starts, so it replicates independently in the host.", marker: "Selectable marker (an antibiotic resistance gene): only cells that took up the plasmid survive on antibiotic agar.", promoter: "Drives expression of the inserted gene.", mcs: "Multiple cloning site (polylinker): many unique restriction sites where a gene can be inserted." };
function plasmidChecks(spec) {
  const out = [], F = spec.features, L = spec.length;
  out.push(check("the vector has an origin of replication, a selectable marker and a multiple cloning site", ["ori", "marker", "mcs"].every((t) => F.some((f) => f.type === t))));
  out.push(check("every feature lies on the plasmid", F.every((f) => f.start >= 0 && f.end <= L && f.end > f.start)));
  const overlap = F.some((a, i) => F.some((b, j) => j > i && a.start < b.end && b.start < a.end));
  out.push(check("no two features overlap", !overlap));
  const mcs = F.find((f) => f.type === "mcs"), cuts = {};
  for (const t of spec.sites) cuts[t.enzyme] = (cuts[t.enzyme] || 0) + 1;
  out.push(check("every enzyme in the MCS cuts the plasmid once", spec.sites.every((t) => cuts[t.enzyme] === 1)));
  out.push(check("every cutting site lies inside the multiple cloning site", !!mcs && spec.sites.every((t) => t.pos >= mcs.start && t.pos <= mcs.end)));
  if (spec.digest?.length) {
    const pos = spec.sites.filter((t) => spec.digest.includes(t.enzyme)).map((t) => t.pos);
    out.push(check("every enzyme of the digest cuts this plasmid", pos.length === spec.digest.length));
    out.push(check(`the fragments of the ${spec.digest.join(" + ")} digest add up to ${L} bp`, digestFragments(L, pos).reduce((a, b) => a + b, 0) === L));
  }
  return out;
}

// ======================================================================== fragment
// Habitat fragmentation on a grid. spec: panels [{name, grid: [rows of "#" habitat and "." other]}], claims. The patches (4-connected
// habitat), edge cells (habitat next to a non-habitat cell or the map's edge) and core cells are counted from the grid.
export function landscapeStats(grid) {
  const h = grid.length, w = grid[0].length, at = (r, c) => r >= 0 && r < h && c >= 0 && c < w && grid[r][c] === "#", seen = new Set();
  let area = 0, edge = 0, patches = 0;
  for (let r = 0; r < h; r++) for (let c = 0; c < w; c++) {
    if (!at(r, c)) continue; area++;
    if (!at(r - 1, c) || !at(r + 1, c) || !at(r, c - 1) || !at(r, c + 1)) edge++;
    if (!seen.has(r * w + c)) { patches++; const q = [[r, c]]; seen.add(r * w + c); while (q.length) { const [a, b] = q.pop(); for (const [da, db] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const x = a + da, y = b + db; if (at(x, y) && !seen.has(x * w + y)) { seen.add(x * w + y); q.push([x, y]); } } } }
  }
  return { area, edge, core: area - edge, patches, edgeShare: area ? edge / area : 0 };
}
function fragmentDraw(spec, W, narrow) {
  const cols = narrow ? 1 : spec.panels.length, cw = (W - 20) / cols, g0 = spec.panels[0].grid, cell = Math.min(Math.floor((cw - 20) / g0[0].length), 16), gw = cell * g0[0].length, gh = cell * g0.length, rh = gh + 74;
  let s = "";
  spec.panels.forEach((p, i) => {
    const col = i % cols, row = Math.floor(i / cols), x0 = 10 + col * cw + (cw - gw) / 2, y0 = 10 + row * rh, S = landscapeStats(p.grid);
    s += `<rect x="${f1(x0)}" y="${f1(y0)}" width="${gw}" height="${gh}" fill="${C.a3}" fill-opacity=".14" stroke="${C.line}"/>`;
    const at = (r, c) => r >= 0 && r < p.grid.length && c >= 0 && c < p.grid[0].length && p.grid[r][c] === "#";
    let hab = "", cor = "";
    p.grid.forEach((line, r) => [...line].forEach((ch, c) => { if (ch !== "#") return; const isEdge = !at(r - 1, c) || !at(r + 1, c) || !at(r, c - 1) || !at(r, c + 1); const rect = `<rect x="${f1(x0 + c * cell)}" y="${f1(y0 + r * cell)}" width="${cell}" height="${cell}" fill="${C.good}" fill-opacity="${isEdge ? 0.4 : 0.85}" stroke="${C.panel}" stroke-width=".6"/>`; if (isEdge) hab += rect; else cor += rect; }));
    s += part("edge habitat", "Habitat next to a different land use: more light, wind and predators, so interior species decline.", hab) + part("core habitat", "Interior habitat, away from any edge.", cor);
    s += text(x0 + gw / 2, y0 + gh + 16, p.name, { size: 12.5, weight: 700 }) + text(x0 + gw / 2, y0 + gh + 33, `${S.area} habitat cells · ${S.patches} patch${S.patches === 1 ? "" : "es"}`, { size: 11.5, fill: C.soft }) + text(x0 + gw / 2, y0 + gh + 49, `core ${S.core} (${Math.round(100 * (1 - S.edgeShare))}%) · edge ${S.edge}`, { size: 11.5, fill: C.soft });
  });
  const rows = Math.ceil(spec.panels.length / cols), H = 10 + rows * rh;
  const nb = textBlock(W / 2, H + 8, "Dark green: core habitat. Light green: edge habitat. Brown: other land use. An illustrative grid, not a real landscape.", narrow ? 50 : 120, { size: 10.5, fill: C.soft });
  return { s: s + nb.svg, H: H + 16 + nb.h };
}
function fragmentChecks(spec) {
  const out = [], S = spec.panels.map((p) => landscapeStats(p.grid));
  for (const c of spec.claims || []) {
    if (c.type === "sameArea") out.push(check(`${spec.panels[c.a].name} and ${spec.panels[c.b].name} have the same habitat area (${S[c.a].area} and ${S[c.b].area} cells)`, S[c.a].area === S[c.b].area));
    if (c.type === "patches") out.push(check(`${spec.panels[c.panel].name}: ${c.value} patch${c.value === 1 ? "" : "es"}`, S[c.panel].patches === c.value, `counted ${S[c.panel].patches}`));
    if (c.type === "moreEdge") out.push(check(`${spec.panels[c.b].name} has a larger share of edge habitat than ${spec.panels[c.a].name} (${(100 * S[c.b].edgeShare).toFixed(0)}% against ${(100 * S[c.a].edgeShare).toFixed(0)}%)`, S[c.b].edgeShare > S[c.a].edgeShare));
    if (c.type === "lessCore") out.push(check(`${spec.panels[c.b].name} has less core habitat than ${spec.panels[c.a].name} (${S[c.b].core} against ${S[c.a].core} cells)`, S[c.b].core < S[c.a].core));
    if (c.type === "connected") out.push(check(`${spec.panels[c.panel].name}: the habitat is one connected patch`, S[c.panel].patches === 1));
  }
  out.push(check("every panel has the same size", spec.panels.every((p) => p.grid.length === spec.panels[0].grid.length && p.grid.every((r) => r.length === spec.panels[0].grid[0].length))));
  return out;
}

// ======================================================================== network
// A network grown by preferential attachment (seeded): most nodes have few links and a few hubs have many. spec: seed, n, m.
// Degrees are counted from the edges; checks: the edge count, a single connected network, a hub well above the average
// degree and most nodes at or below it. Simulated: not real interaction data.
export function growNetwork(n, m, seed) {
  const r = mulberry(seed), edges = [[0, 1]], deg = new Array(n).fill(0); deg[0] = deg[1] = 1;
  for (let v = 2; v < n; v++) {
    const pick = new Set();
    while (pick.size < Math.min(m, v)) { let t = r() * deg.slice(0, v).reduce((a, b) => a + b, 0), u = 0; while (u < v - 1 && t >= deg[u]) { t -= deg[u]; u++; } pick.add(u); }
    for (const u of pick) { edges.push([u, v]); deg[u]++; deg[v]++; }
  }
  return { edges, deg };
}
function layoutNetwork(n, edges, seed) {
  const r = mulberry(seed + 7), P = Array.from({ length: n }, (_, i) => [Math.cos((i * 2 * Math.PI) / n) * 0.4 + (r() - 0.5) * 0.1, Math.sin((i * 2 * Math.PI) / n) * 0.4 + (r() - 0.5) * 0.1]), k = 0.9 / Math.sqrt(n);
  for (let it = 0; it < 260; it++) {
    const D = P.map(() => [0, 0]), temp = 0.08 * (1 - it / 260);
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const dx = P[i][0] - P[j][0], dy = P[i][1] - P[j][1], d = Math.max(0.001, Math.hypot(dx, dy)), f = (k * k) / d; D[i][0] += (dx / d) * f; D[i][1] += (dy / d) * f; D[j][0] -= (dx / d) * f; D[j][1] -= (dy / d) * f; }
    for (const [a, b] of edges) { const dx = P[a][0] - P[b][0], dy = P[a][1] - P[b][1], d = Math.max(0.001, Math.hypot(dx, dy)), f = (d * d) / k; D[a][0] -= (dx / d) * f; D[a][1] -= (dy / d) * f; D[b][0] += (dx / d) * f; D[b][1] += (dy / d) * f; }
    for (let i = 0; i < n; i++) { const d = Math.hypot(D[i][0], D[i][1]) || 1, s = Math.min(d, temp) / d; P[i][0] += D[i][0] * s - P[i][0] * 0.01; P[i][1] += D[i][1] * s - P[i][1] * 0.01; }
  }
  const xs = P.map((p) => p[0]), ys = P.map((p) => p[1]), x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  return P.map(([x, y]) => [(x - x0) / (x1 - x0 || 1), (y - y0) / (y1 - y0 || 1)]);
}
const netStats = (spec) => { const { edges, deg } = growNetwork(spec.n, spec.m, spec.seed), mean = (2 * edges.length) / spec.n, adj = Array.from({ length: spec.n }, () => []); for (const [a, b] of edges) { adj[a].push(b); adj[b].push(a); } const seen = new Set([0]), q = [0]; while (q.length) { const u = q.pop(); for (const v of adj[u]) if (!seen.has(v)) { seen.add(v); q.push(v); } } return { edges, deg, mean, connected: seen.size === spec.n, max: Math.max(...deg), low: deg.filter((d) => d <= mean).length / spec.n }; };
function networkDraw(spec, W, narrow) {
  const N = netStats(spec), pw = narrow ? W - 20 : Math.min(400, W - 270), ph = narrow ? 300 : 320, pos = layoutNetwork(spec.n, N.edges, spec.seed), hub = (d) => d >= Math.max(5, 2 * N.mean);
  const px = (p) => 10 + 14 + p[0] * (pw - 28), py = (p) => 14 + p[1] * (ph - 28);
  let s = N.edges.map(([a, b]) => `<path d="M${f1(px(pos[a]))} ${f1(py(pos[a]))} L${f1(px(pos[b]))} ${f1(py(pos[b]))}" stroke="${C.soft}" stroke-width="1" stroke-opacity=".7"/>`).join("");
  s += part("edges", "An edge is an interaction between two molecules.", "");
  pos.forEach((p, i) => { s += part(hub(N.deg[i]) ? "hub" : "node", hub(N.deg[i]) ? "A hub: a highly connected node." : "A node (a molecule) with few connections.", `<circle cx="${f1(px(p))}" cy="${f1(py(p))}" r="${(3.4 + 1.9 * Math.sqrt(N.deg[i])).toFixed(1)}" fill="${hub(N.deg[i]) ? C.a2 : C.a1}" fill-opacity="${hub(N.deg[i]) ? 0.85 : 0.6}" stroke="${hub(N.deg[i]) ? C.a2 : C.a1}" stroke-width="1.6"/>`); });
  // degree histogram
  const bx = narrow ? 24 : pw + 50, by = narrow ? ph + 40 : 40, bw = narrow ? W - 60 : W - bx - 24, bh = narrow ? 120 : 200, maxD = N.max, counts = Array.from({ length: maxD + 1 }, (_, d) => N.deg.filter((x) => x === d).length), cmax = Math.max(...counts), step = bw / (maxD + 1);
  s += text(bx, by - 16, "nodes with each number of links", { size: 12, weight: 700, anchor: "start" }) + `<path d="M${bx} ${by + bh} H${bx + bw}" stroke="${C.soft}" stroke-width="1.4"/>`;
  counts.forEach((c, d) => { if (c) s += `<rect x="${f1(bx + d * step + 1)}" y="${f1(by + bh - (c / cmax) * bh)}" width="${f1(step - 2)}" height="${f1((c / cmax) * bh)}" fill="${hub(d) ? C.a2 : C.a1}" fill-opacity=".6" stroke="${hub(d) ? C.a2 : C.a1}"/>`; });
  [1, Math.round(maxD / 2), maxD].forEach((d) => { s += text(bx + d * step + step / 2, by + bh + 14, String(d), { size: 10.5, fill: C.soft }); });
  s += text(bx + bw / 2, by + bh + 32, "number of links (degree)", { size: 11.5 });
  const H = narrow ? by + bh + 58 : ph + 20, nb = textBlock(W / 2, H + 12, `Simulated network of ${spec.n} nodes grown by preferential attachment: ${N.max} links at the largest hub, ${N.mean.toFixed(1)} on average. Illustrative, not real interaction data.`, narrow ? 50 : 110, { size: 11, fill: C.soft });
  return { s: s + nb.svg, H: H + 20 + nb.h };
}
function networkChecks(spec) {
  const N = netStats(spec), out = [];
  out.push(check(`the network has ${1 + (spec.n - 2) * spec.m} edges (each new node adds ${spec.m})`, N.edges.length === 1 + (spec.n - 2) * spec.m, `counted ${N.edges.length}`));
  out.push(check("the network is one connected component", N.connected));
  out.push(check(`a hub has many more links than average: ${N.max} against ${N.mean.toFixed(1)} (at least 3 times)`, N.max >= 3 * N.mean));
  out.push(check(`most nodes have no more than the average number of links (${(100 * N.low).toFixed(0)}% at or below ${N.mean.toFixed(1)})`, N.low >= 0.6));
  return out;
}

// ======================================================================== phscale
// The pH scale and what a unit means. spec: markers [{label, ph, ph2?}], example {h, ph}, claims. [H⁺] is recomputed as 10^−pH
// for every unit, neutral is pH 7 at 25 °C, each unit is a tenfold change, and the worked example is checked: pH = −log₁₀[H⁺].
export const hOfPh = (ph) => 10 ** -ph;
export const phOfH = (h) => -Math.log10(h);
const PH_FACTS = { "stomach": [2, 2], "neutral (25 °C)": [7, 7], "human blood": [7.35, 7.45] };
function phscaleDraw(spec, W, narrow) {
  const x0 = narrow ? 24 : 40, x1 = W - (narrow ? 24 : 40), sx = (ph) => x0 + (ph / 14) * (x1 - x0), y0 = narrow ? 120 : 110, hb = 26;
  let s = "";
  const hue = (ph) => `hsl(${Math.round(8 + (ph / 14) * 250)} 72% 62%)`;
  s += part("pH scale", "pH = −log₁₀[H⁺]: low pH is acidic, high pH is alkaline.", Array.from({ length: 14 }, (_, i) => `<rect x="${f1(sx(i))}" y="${y0}" width="${f1(sx(i + 1) - sx(i) + 0.5)}" height="${hb}" fill="${hue(i + 0.5)}" fill-opacity=".8"/>`).join(""));
  for (let ph = 0; ph <= 14; ph++) {
    s += `<path d="M${f1(sx(ph))} ${y0 + hb} v6" stroke="${C.soft}" stroke-width="1.2"/>` + text(sx(ph), y0 + hb + 17, String(ph), { size: 12, weight: 700 });
    if (!narrow || ph % 2 === 0) s += text(sx(ph), y0 + hb + 36, ph === 0 ? "1" : `10^{-${ph}}`, { size: narrow ? 10.5 : 11.5, fill: C.soft });
  }
  s += text((x0 + x1) / 2, y0 + hb + 56, "pH, and [H^{+}] in mol dm^{-3}", { size: 11.5, fill: C.soft }) + text(x0, y0 + hb + 56, "← acidic", { size: 12, weight: 700, anchor: "start", fill: C.a2 }) + text(x1, y0 + hb + 56, "alkaline →", { size: 12, weight: 700, anchor: "end", fill: C.a1 });
  // markers above the bar, on two tiers so neighbouring labels never meet
  spec.markers.forEach((mk, i) => {
    const a = sx(mk.ph), b = sx(mk.ph2 ?? mk.ph), mid = (a + b) / 2, tier = mk.tier || 0, top = y0 - 18 - tier * 18, al = mk.align || "middle";
    s += part(mk.label, mk.note || mk.label, `<path d="M${f1(a)} ${y0 - 2} V${top} M${f1(b)} ${y0 - 2} V${top}" stroke="${C.ink}" stroke-width="2"/>` + (mk.ph2 != null ? `<rect x="${f1(a)}" y="${y0 - 8}" width="${f1(Math.max(2, b - a))}" height="${hb + 8}" fill="none" stroke="${C.ink}" stroke-width="2"/>` : ""));
    s += text(al === "end" ? a - 6 : al === "start" ? b + 6 : mid, top - 4, mk.text, { size: 11.5, weight: 700, anchor: al });
  });
  // a tenfold step: pH 4 to pH 3 (the lesson's worked example)
  const e = spec.example, yb = y0 + hb + 72;
  const a = sx(e.ph + 1), b = sx(e.ph);
  s += `<path d="M${f1(a)} ${yb - 14} q${f1((b - a) / 2)} 26 ${f1(b - a)} 0" fill="none" stroke="${C.a2}" stroke-width="2.2"/>`;
  s += text((a + b) / 2, yb + 24, "× 10", { size: 13, weight: 700, fill: C.a2 });
  const lines = [`[H^{+}] = 1 × 10^{-${e.ph + 1}} mol dm^{-3}  →  pH = −log_{10}(10^{-${e.ph + 1}}) = ${e.ph + 1}`, `[H^{+}] rises tenfold to 1 × 10^{-${e.ph}}  →  the pH falls to ${e.ph}`, `pH ${e.ph} has ten times the hydrogen ion concentration of pH ${e.ph + 1}, not twice`];
  const ty = yb + 52; let ly = ty;
  lines.forEach((l) => { const parts = narrow ? l.split("  →  ").flatMap((q, k) => wrap((k ? "→ " : "") + q, 46)) : [l]; parts.forEach((q) => { s += text(narrow ? 16 : x0, ly, q, { size: narrow ? 11.5 : 13, anchor: "start" }); ly += 19; }); ly += narrow ? 4 : 1; });
  return { s, H: ly + 6 };
}
function phscaleChecks(spec) {
  const out = [];
  for (let ph = 0; ph <= 14; ph++) out.push(check(`pH ${ph}: [H⁺] = 10^−${ph} = ${hOfPh(ph).toExponential(0)} mol dm⁻³`, Math.abs(phOfH(hOfPh(ph)) - ph) < 1e-9));
  out.push(check("each unit of pH is a tenfold change in [H⁺]", Math.abs(hOfPh(3) / hOfPh(4) - 10) < 1e-9 && Math.abs(hOfPh(8) / hOfPh(9) - 10) < 1e-9));
  out.push(check("neutral is pH 7 at 25 °C: [H⁺] = 10⁻⁷ = [OH⁻]", hOfPh(7) === 1e-7));
  for (const mk of spec.markers) { const f = PH_FACTS[mk.label]; out.push(check(`${mk.label}: pH ${f ? (f[0] === f[1] ? "about " + f[0] : f.join("–")) : "?"}`, !!f && mk.ph === f[0] && (mk.ph2 ?? mk.ph) === f[1], f ? "" : "not in the lesson")); }
  const e = spec.example; out.push(check(`worked example: pH = −log₁₀(1 × 10^−${e.ph + 1}) = ${e.ph + 1}`, Math.abs(phOfH(hOfPh(e.ph + 1)) - (e.ph + 1)) < 1e-9 && e.ph === 3));
  out.push(check("a tenfold rise in [H⁺] lowers the pH by 1", Math.abs(phOfH(10 * hOfPh(e.ph + 1)) - e.ph) < 1e-9));
  return out;
}

// ======================================================================== repair
// DNA repair. spec: rows [{damage, pathway, note?}] (which damage each pathway repairs) and ner: {strand, dimer: [i, i+1], excise: [a, b]},
// the four steps of nucleotide excision repair drawn on a real sequence: the gap is refilled with the complement of the
// intact strand, which must give back the original sequence, and the thymine dimer is two adjacent thymines.
const REPAIR = { "replication error missed by proofreading": ["mismatch repair"], "oxidised base": ["base excision repair"], "thymine dimer (UV light)": ["nucleotide excision repair"], "double-strand break": ["homologous recombination", "non-homologous end joining"] };
const COMP = { A: "T", T: "A", G: "C", C: "G" };
export const complementOf = (s) => [...s].map((c) => COMP[c]).join("");
export function nerSteps(n) {
  const strand = [...n.strand], other = [...complementOf(n.strand)], [a, b] = n.excise, filled = other.slice(a, b + 1).map((c) => COMP[c]);
  return { strand, other, a, b, filled, restored: [...strand.slice(0, a), ...filled, ...strand.slice(b + 1)].join("") };
}
function repairDraw(spec, W, narrow) {
  const N = nerSteps(spec.ner), cs = narrow ? 24 : 22, rowH = 86;
  let s = "", y = 10;
  const ax = narrow ? 10 : 10, aw = narrow ? W - 20 : 330, bw = (aw - 36) / 2;
  s += text(ax, y + 8, "Which repair for which damage", { size: 13, weight: 700, anchor: "start" }); y += 24;
  spec.rows.forEach((r) => {
    const bh = 66, dl = wrap(r.damage, narrow ? 22 : 19), pl = wrap(r.pathway, narrow ? 22 : 19), nl = wrap(r.note || "", narrow ? 26 : 22);
    s += part(r.damage, "Damage to DNA.", `<rect x="${ax}" y="${y}" width="${f1(bw)}" height="${bh}" rx="10" fill="${C.a2}" fill-opacity=".12" stroke="${C.a2}" stroke-width="2"/>`) + dl.map((l, i) => text(ax + bw / 2, y + bh / 2 + (i - (dl.length - 1) / 2) * 14, l, { size: 11.5, weight: 700 })).join("");
    s += arrow(ax + bw + 3, y + bh / 2, ax + bw + 33, y + bh / 2, { stroke: C.soft, w: 1.8, head: 8 });
    const cx2 = ax + bw + 36 + bw / 2, top = y + 8, tot = pl.length * 14 + nl.length * 12 + 4, y1 = y + (bh - tot) / 2 + 7;
    s += part(r.pathway, r.note || "A repair pathway.", `<rect x="${f1(ax + bw + 36)}" y="${y}" width="${f1(bw)}" height="${bh}" rx="10" fill="${C.a1}" fill-opacity=".12" stroke="${C.a1}" stroke-width="2"/>`) + pl.map((l, i) => text(cx2, y1 + i * 14, l, { size: 11.5, weight: 700 })).join("") + nl.map((l, i) => text(cx2, y1 + pl.length * 14 + 4 + i * 12, l, { size: 10, fill: C.soft })).join(""); void top;
    y += bh + 10;
  });
  const endA = y;
  let bx = narrow ? 10 : ax + aw + 26, by = narrow ? endA + 16 : 10;
  s += text(bx, by + 8, "Nucleotide excision repair of a thymine dimer", { size: 13, weight: 700, anchor: "start" }); by += 26;
  const cells = (row, top, mode) => row.map((c, i) => { const gap = mode === "gap" && i >= N.a && i <= N.b, dim = mode === "dimer" && i >= spec.ner.dimer[0] && i <= spec.ner.dimer[1], fill = mode === "gapfill" && i >= N.a && i <= N.b;
    if (gap) return ""; return `<rect x="${f1(bx + i * cs)}" y="${top}" width="${cs - 2}" height="${cs - 2}" rx="4" fill="${dim ? C.a3 : fill ? C.a4 : C.panel}" fill-opacity="${dim ? 0.55 : fill ? 0.5 : 1}" stroke="${dim ? C.a3 : fill ? C.a4 : C.soft}" stroke-width="${dim || fill ? 2 : 1.2}"/>` + text(bx + i * cs + (cs - 2) / 2, top + (cs - 2) / 2 + 0.5, c, { size: 11.5, weight: 700 }); }).join("");
  const steps = [["1  UV light bonds two adjacent thymines: a thymine dimer", "dimer", N.strand], ["2  Repair enzymes detect the distortion and cut out a section of the damaged strand", "gap", N.strand], ["3  DNA polymerase fills the gap using the other strand as the template", "gapfill", N.a >= 0 ? [...N.strand.slice(0, N.a), ...N.filled, ...N.strand.slice(N.b + 1)] : N.strand], ["4  Ligase seals the strand: the original sequence is restored", "plain", [...N.restored]]];
  steps.forEach(([cap, mode, top]) => {
    wrap(cap, narrow ? 52 : 44).forEach((l, k) => { s += text(bx, by + 6 + k * 15, l, { size: 11.5, weight: 700, anchor: "start" }); });
    const ty = by + 28;
    s += `<g data-step="${esc(mode)}">` + cells(top, ty, mode === "gapfill" || mode === "gap" ? mode : mode) + cells(N.other, ty + cs + 6, "plain") + (mode === "dimer" ? `<path d="M${f1(bx + spec.ner.dimer[0] * cs + cs / 2)} ${ty + cs - 1} q${cs / 2} -6 ${cs} 0" stroke="${C.a3}" stroke-width="2.4" fill="none"/>` : "") + `</g>`;
    by += rowH;
  });
  return { s, H: Math.max(endA, by) + 8 };
}
function repairChecks(spec) {
  const out = [], N = nerSteps(spec.ner), n = spec.ner;
  for (const r of spec.rows) out.push(check(`${r.damage}: repaired by ${r.pathway}`, (REPAIR[r.damage] || []).includes(r.pathway)));
  out.push(check("every kind of damage in the lesson has a pathway", Object.keys(REPAIR).every((d) => spec.rows.some((r) => r.damage === d))));
  const hr = spec.rows.find((r) => r.pathway === "homologous recombination"), nh = spec.rows.find((r) => r.pathway === "non-homologous end joining");
  if (hr) out.push(check("homologous recombination uses a sister chromatid as a template", /sister chromatid/.test(hr.note || "")));
  if (nh) out.push(check("non-homologous end joining can lose bases", /lose/.test(nh.note || "")));
  out.push(check("the thymine dimer is two adjacent thymines", n.dimer[1] === n.dimer[0] + 1 && n.strand[n.dimer[0]] === "T" && n.strand[n.dimer[1]] === "T"));
  out.push(check("the section cut out contains the dimer", n.excise[0] <= n.dimer[0] && n.excise[1] >= n.dimer[1] && n.excise[0] >= 0 && n.excise[1] < n.strand.length));
  out.push(check("the gap is filled with the complement of the intact strand", N.filled.join("") === n.strand.slice(n.excise[0], n.excise[1] + 1)));
  out.push(check("after ligation the strand has its original sequence", N.restored === n.strand));
  return out;
}

// ======================================================================== cascade
// The complement cascade. spec: nodes [{id, label, sub, is, col, row, tone}], edges [{from, to, via?}], note. Three pathways,
// each with its own trigger, converge on C3; C3b coats pathogens (opsonisation), C3a and C5a promote inflammation, and C5b with
// C6–C9 makes the membrane attack complex that lyses the pathogen. Every arrow must be a step of the cascade.
export const COMPLEMENT = {
  next: { "classical pathway": ["C3"], "lectin pathway": ["C3"], "alternative pathway": ["C3"], C3: ["C3a", "C3b"], C3a: ["inflammation"], C3b: ["opsonisation", "C5"], C5: ["inflammation", "lysis"] },
  via: { "C5>inflammation": "C5a", "C5>lysis": "C5b–C9" },
  trigger: { "classical pathway": "antibody bound to antigen", "lectin pathway": "lectins binding sugars on microbes", "alternative pathway": "directly on microbial surfaces" },
};
function cascadeDraw(spec, W, narrow) {
  const bw = narrow ? 112 : 124, bh = narrow ? 90 : 68, rows = 3.3;
  const pos = (n) => (narrow ? [12 + (n.row / 2) * (W - 24 - bw), 14 + n.col * (bh + 36)] : [10 + n.col * ((W - 20 - bw) / 4), 14 + n.row * (bh + 30)]);
  const N = Object.fromEntries(spec.nodes.map((n) => [n.id, { ...n, p: pos(n) }])), tone = (t) => C[t || "a1"];
  let s = "";
  const edge = (e) => { const a = N[e.from], b = N[e.to], ac = [a.p[0] + bw / 2, a.p[1] + bh / 2], bc = [b.p[0] + bw / 2, b.p[1] + bh / 2], dx = bc[0] - ac[0], dy = bc[1] - ac[1], clip = (c, sgn) => { const k = Math.min(Math.abs(dx) > 0 ? (bw / 2 + 4) / Math.abs(dx) : 9, Math.abs(dy) > 0 ? (bh / 2 + 4) / Math.abs(dy) : 9); return [c[0] + sgn * dx * k, c[1] + sgn * dy * k]; }; const p1 = clip(ac, 1), p2 = clip(bc, -1);
    return arrow(p1[0], p1[1], p2[0], p2[1], { stroke: C.soft, w: 2, head: 9 });  };
  s += spec.edges.map(edge).join("");
  for (const n of Object.values(N)) {
    s += part(n.label, n.sub || n.label, `<rect x="${f1(n.p[0])}" y="${f1(n.p[1])}" width="${bw}" height="${bh}" rx="10" fill="${tone(n.tone)}" fill-opacity=".14" stroke="${tone(n.tone)}" stroke-width="2"/>`) + text(n.p[0] + bw / 2, n.p[1] + 16, n.label, { size: 11.5, weight: 700 }) + wrap(n.sub || "", narrow ? 18 : 22).map((l, i) => text(n.p[0] + bw / 2, n.p[1] + 36 + i * 12.5, l, { size: 10, fill: C.soft })).join("");
  }
  const H = narrow ? 14 + 5 * (bh + 36) : 14 + rows * (bh + 30) + 10, nb = textBlock(W / 2, H + 6, spec.note, narrow ? 50 : 120, { size: 11, fill: C.soft });
  return { s: s + nb.svg, H: H + 14 + nb.h };
}
function cascadeChecks(spec) {
  const N = Object.fromEntries(spec.nodes.map((n) => [n.id, n])), out = [];
  const paths = Object.keys(COMPLEMENT.trigger);
  for (const p of paths) { const n = spec.nodes.find((x) => x.is === p); out.push(check(`the ${p} is drawn, triggered by ${COMPLEMENT.trigger[p]}`, !!n && (n.sub || "").includes(COMPLEMENT.trigger[p]))); }
  out.push(check("all three pathways converge on cleavage of C3", paths.every((p) => spec.edges.some((e) => N[e.from]?.is === p && N[e.to]?.is === "C3"))));
  for (const e of spec.edges) { const a = N[e.from]?.is, b = N[e.to]?.is, want = COMPLEMENT.via[`${a}>${b}`]; out.push(check(`${a} → ${b}${e.via ? ` (${e.via})` : ""} is a step of the cascade`, (COMPLEMENT.next[a] || []).includes(b) && (want ? e.via === want : true))); }
  const reach = (from, seen = new Set()) => { for (const t of COMPLEMENT.next[from] || []) if (!seen.has(t)) { seen.add(t); reach(t, seen); } return seen; };
  out.push(check("the three effects are all reached: opsonisation, inflammation and lysis", ["opsonisation", "inflammation", "lysis"].every((x) => spec.nodes.some((n) => n.is === x) && paths.every((p) => reach(p).has(x)))));
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
  tract: { draw: flowDraw, checks: tractChecks, widths: [700, 380] },
  lineage: { draw: flowDraw, checks: lineageChecks, widths: [700, 380] },
  envelope: { draw: envelopeDraw, checks: envelopeChecks, widths: [700, 380] },
  codontable: { draw: codontableDraw, checks: codontableChecks, widths: [720, 380] },
  density: { draw: densityDraw, checks: densityChecks, widths: [700, 380] },
  crossover: { draw: crossoverDraw, checks: crossoverChecks, widths: [700, 380] },
  ploidy: { draw: ploidyDraw, checks: ploidyChecks, widths: [700, 380] },
  germlayers: { draw: layersDraw, checks: layersChecks, widths: [700, 380] },
  drift: { draw: driftDraw, checks: driftChecks, widths: [700, 380] },
  cladogram: { draw: cladogramDraw, checks: cladogramChecks, widths: [620, 380] },
  cleavage: { draw: cleavageDraw, checks: cleavageChecks, widths: [700, 380] },
  fertilisation: { draw: fertilisationDraw, checks: fertilisationChecks, widths: [700, 380] },
  cytometry: { draw: cytometryDraw, checks: cytometryChecks, widths: [700, 380] },
  karyotype: { draw: karyotypeDraw, checks: karyotypeChecks, widths: [700, 380] },
  plasmidmap: { draw: plasmidDraw, checks: plasmidChecks, widths: [700, 380] },
  fragment: { draw: fragmentDraw, checks: fragmentChecks, widths: [700, 380] },
  bionetwork: { draw: networkDraw, checks: networkChecks, widths: [700, 380] },
  phscale: { draw: phscaleDraw, checks: phscaleChecks, widths: [700, 380] },
  repair: { draw: repairDraw, checks: repairChecks, widths: [700, 380] },
  cascade: { draw: cascadeDraw, checks: cascadeChecks, widths: [700, 380] },
  section: { draw: sectionDraw, checks: sectionChecks, widths: [700, 380] },
  bilayer: { draw: bilayerDraw, checks: bilayerChecks, widths: [700, 380] },
  inducedfit: { draw: inducedfitDraw, checks: inducedfitChecks, widths: [720, 380] },
  hbond: { draw: hbondDraw, checks: hbondChecks, widths: [700, 380] },
  tlc: { draw: tlcDraw, checks: tlcChecks, widths: [620, 380] },
  align: { draw: alignDraw, checks: alignChecks, widths: [560, 380] },
  restriction: { draw: restrictionDraw, checks: restrictionChecks, widths: [700, 380] },
  sanger: { draw: sangerDraw, checks: sangerChecks, widths: [660, 380] },
  biocycle: { draw: biocycleDraw, checks: biocycleChecks, widths: [700, 380] },
  carbonflow: { draw: flowDraw, checks: carbonflowChecks, widths: [700, 380] },
  sarcomere: { draw: sarcomereDraw, checks: sarcomereChecks, widths: [660, 380] },
});
