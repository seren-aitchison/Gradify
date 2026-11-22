// The biology the diagram checks rely on (kit/diagrams/bio-renderers.js): crosses, the genetic code, mutations,
// pedigree reasoning, transport across membranes, osmosis, the endomembrane route, stem cell potency and Gram walls.
import { test } from "node:test";
import assert from "node:assert/strict";
import { render } from "../kit/diagrams/renderers.js";
import { gametes, crossOf, translate, transcribe, complement, mutationKind, pedigreeFits, osmoticOutcome, chargeOf, codonCount, bandFractions, chromatidsAfter, divide, wrightFisher, bandsOf, cutDna, sangerFragments, needlemanScore, scoreAlignment, rfOf, bilayerNumbers, fitOk, waterCluster, hydrogenBonds, HOH, cleavageCells, cytometryData, karyotypeOf, digestFragments, landscapeStats, growNetwork, hOfPh, phOfH, complementOf, nerSteps } from "../kit/diagrams/bio-renderers.js";
import "../kit/diagrams/chem-renderers-3.js"; // the shared flow renderer, which route and lineage draw with

const mono = { alleles: ["T", "t"], dominance: { kind: "complete", dominant: "T", traits: ["tall", "short"] } };

test("gametes: one allele per gene, independent assortment", () => {
  assert.deepEqual(gametes(["T t"]).map((g) => g.join("")), ["T", "t"]);
  assert.deepEqual(gametes(["R r", "Y y"]).map((g) => g.join("")), ["RY", "Ry", "rY", "ry"]);
  assert.equal(gametes(["T T"]).length, 1);
});

test("monohybrid and dihybrid crosses give 3:1 and 9:3:3:1", () => {
  const m = crossOf({ loci: [mono], parents: [{ genotype: ["T t"] }, { genotype: ["T t"] }] });
  assert.deepEqual(m.geno, { TT: 1, Tt: 2, tt: 1 });
  assert.deepEqual(m.pheno, { tall: 3, short: 1 });
  const seed = { alleles: ["R", "r"], dominance: { kind: "complete", dominant: "R", traits: ["round", "wrinkled"] } };
  const colour = { alleles: ["Y", "y"], dominance: { kind: "complete", dominant: "Y", traits: ["yellow", "green"] } };
  const d = crossOf({ loci: [seed, colour], parents: [{ genotype: ["R r", "Y y"] }, { genotype: ["R r", "Y y"] }] });
  assert.deepEqual(Object.values(d.pheno).sort((a, b) => b - a), [9, 3, 3, 1]);
});

test("sex linkage: a carrier mother passes haemophilia to half her sons", () => {
  const L = { alleles: ["Xᴴ", "Xʰ", "Y"], dominance: { kind: "sexlinked", disease: "Xʰ", recessive: true, trait: "haemophiliac" } };
  const x = crossOf({ loci: [L], parents: [{ genotype: ["Xᴴ Y"] }, { genotype: ["Xᴴ Xʰ"] }] });
  assert.deepEqual(x.pheno, { "unaffected female": 1, "unaffected male": 1, "carrier female": 1, "haemophiliac male": 1 });
});

test("the genetic code: transcription, translation and stop codons", () => {
  assert.equal(complement("ATGC"), "TACG");
  assert.equal(transcribe("ATGTTT"), "AUGUUU");
  assert.deepEqual(translate("AUGUUUGGCUAA"), ["Met", "Phe", "Gly", "Stop"]);
  assert.deepEqual(translate("UGG"), ["Trp"]);
});

test("mutations: silent, missense, nonsense and frameshift", () => {
  assert.equal(mutationKind("GGA", "GGG"), "silent");
  assert.equal(mutationKind("GAG", "GTG"), "missense"); // sickle cell: Glu → Val
  assert.equal(mutationKind("TGG", "TAG"), "nonsense");
  assert.equal(mutationKind("ATGGCC", "ATGCC"), "frameshift");
});

const fam = (people) => ({ people });
test("pedigrees: two unaffected parents with an affected child rule out dominant inheritance", () => {
  const p = fam([
    { id: "I-1", sex: "m", gen: 1, x: 0 }, { id: "I-2", sex: "f", gen: 1, x: 1 },
    { id: "II-1", sex: "f", gen: 2, x: 0, affected: true, parents: ["I-1", "I-2"] }, { id: "II-2", sex: "m", gen: 2, x: 1, parents: ["I-1", "I-2"] },
  ]);
  assert.equal(pedigreeFits(p, "AR"), true);
  assert.equal(pedigreeFits(p, "AD"), false);
  assert.equal(pedigreeFits(p, "XR"), false); // an affected daughter needs an affected father
});

test("pedigrees: an affected mother with an unaffected son rules out X-linked recessive", () => {
  const p = fam([{ id: "I-1", sex: "m", gen: 1, x: 0 }, { id: "I-2", sex: "f", gen: 1, x: 1, affected: true }, { id: "II-1", sex: "m", gen: 2, x: 0, parents: ["I-1", "I-2"] }]);
  assert.equal(pedigreeFits(p, "XR"), false);
  assert.equal(pedigreeFits(p, "AR"), true);
});

test("membrane checks fail passive transport drawn up a gradient", () => {
  const spec = { renderer: "membrane", alt: "x", sides: [{ id: "out", label: "outside", conc: { glucose: 1 } }, { id: "in", label: "inside", conc: { glucose: 5 } }],
    moves: [{ substance: "glucose", kind: "carrier", from: "out", to: "in" }] };
  assert.equal(render(spec).checks.every((c) => c.ok), false);
  spec.sides[0].conc.glucose = 9;
  assert.equal(render(spec).checks.every((c) => c.ok), true);
});

test("pyramid checks fail an energy pyramid that grows", () => {
  const spec = { renderer: "pyramid", alt: "x", kind: "energy", unit: "kJ", levels: [{ label: "p", value: 100 }, { label: "c", value: 120 }] };
  assert.equal(render(spec).checks.every((c) => c.ok), false);
});

test("cell checks fail a prokaryote labelled with a nucleus", () => {
  const spec = { renderer: "cellmap", alt: "x", cell: "prokaryote", labels: ["nucleoid", "nucleus"] };
  assert.equal(render(spec).checks.every((c) => c.ok), false);
});

const allPass = (spec) => render(spec).checks.every((c) => c.ok);

test("membrane: the concentration unit is printed, never the course unit", () => {
  const spec = { renderer: "membrane", alt: "x", unit: "u02", concUnit: "mmol dm^{−3}", sides: [{ id: "out", label: "outside", conc: { glucose: 5 } }, { id: "in", label: "inside", conc: { glucose: 1 } }],
    moves: [{ substance: "glucose", kind: "carrier", from: "out", to: "in" }] };
  const r = render(spec);
  assert.ok(r.wide.includes("concentrations in") && !r.wide.includes("u02"));
});

test("membrane: a pump's display label does not hide its gradient check", () => {
  const spec = { renderer: "membrane", alt: "x", sides: [{ id: "out", label: "outside", conc: { "Na⁺": 145 } }, { id: "in", label: "inside", conc: { "Na⁺": 12 } }],
    moves: [{ substance: "Na⁺", label: "3 Na⁺", count: 3, kind: "active", atp: true, from: "in", to: "out" }] };
  assert.ok(render(spec).checks.some((c) => /against its gradient/.test(c.name)));
  assert.equal(allPass(spec), true);
  spec.sides[1].conc["Na⁺"] = 200; // now it would run downhill: not active transport
  assert.equal(allPass(spec), false);
});

test("membrane: the Na⁺/K⁺ pump moves one net positive charge out per cycle", () => {
  assert.equal(chargeOf("Na⁺"), 1); assert.equal(chargeOf("Ca²⁺"), 2); assert.equal(chargeOf("Cl⁻"), -1); assert.equal(chargeOf("glucose"), 0);
  const spec = { renderer: "membrane", alt: "x", sides: [{ id: "out", label: "outside", conc: { "Na⁺": 145, "K⁺": 4 } }, { id: "in", label: "inside", conc: { "Na⁺": 12, "K⁺": 140 } }],
    proteins: { pump: "Na⁺/K⁺ pump" },
    moves: [{ substance: "Na⁺", count: 3, kind: "active", atp: true, from: "in", to: "out", protein: "pump" }, { substance: "K⁺", count: 2, kind: "active", atp: true, from: "out", to: "in", protein: "pump" }],
    claims: [{ type: "netCharge", protein: "pump", out: 1 }] };
  assert.equal(allPass(spec), true);
  spec.claims[0].out = -1;
  assert.equal(allPass(spec), false);
});

test("membrane: co-transport needs something running down its gradient, and no ATP", () => {
  const spec = { renderer: "membrane", alt: "x", cell: "cell", proteins: { s: "SGLT1" },
    sides: [{ id: "lumen", label: "lumen", conc: { "Na⁺": 140, glucose: 0.5 } }, { id: "cell", label: "cell", conc: { "Na⁺": 12, glucose: 8 } }],
    moves: [{ substance: "Na⁺", kind: "cotransport", from: "lumen", to: "cell", protein: "s" }, { substance: "glucose", kind: "cotransport", from: "lumen", to: "cell", protein: "s" }] };
  assert.equal(allPass(spec), true);
  spec.sides[1].conc["Na⁺"] = 160; // sodium would have to go uphill too: nothing pays
  assert.equal(allPass(spec), false);
  spec.sides[1].conc["Na⁺"] = 12; spec.moves[1].atp = true;
  assert.equal(allPass(spec), false);
});

test("osmosis: water moves to the lower water potential, and the cell responds as its kind does", () => {
  assert.equal(osmoticOutcome("animal", -750, 0, 0), "bursts");
  assert.equal(osmoticOutcome("animal", -750, 0, -1500), "crenated");
  assert.equal(osmoticOutcome("plant", -700, 300, 0), "turgid");
  assert.equal(osmoticOutcome("plant", -700, 300, -400), "unchanged");
  assert.equal(osmoticOutcome("plant", -700, 300, -500), "flaccid"); // the lesson's worked example: water leaves
  assert.equal(osmoticOutcome("plant", -700, 300, -1400), "plasmolysed");
  const spec = { renderer: "tonicity", alt: "x", columns: ["a"], rows: [{ cell: "plant", label: "plant cell", psiS: -700, psiP: 300, panels: [{ solution: 0, outcome: "bursts" }] }] };
  assert.equal(allPass(spec), false); // a walled plant cell does not burst in water
});

test("route: every arrow is a real step, and mitochondria are not on the endomembrane route", () => {
  const node = (id, is, col) => ({ id, label: is, is, col, row: 0 });
  const spec = { renderer: "route", alt: "x", layout: "grid", nodes: [node("a", "rough ER", 0), node("b", "transport vesicle", 1), node("c", "Golgi apparatus", 2)],
    edges: [{ from: "a", to: "b" }, { from: "b", to: "c" }] };
  assert.equal(allPass(spec), true);
  spec.edges = [{ from: "a", to: "c" }, { from: "c", to: "b" }]; // ER straight into the Golgi, then back: not how cargo travels
  assert.equal(allPass(spec), false);
  spec.edges = [{ from: "a", to: "b" }, { from: "b", to: "c" }]; spec.nodes[1].is = "mitochondrion";
  assert.equal(allPass(spec), false);
});

test("lineage: potency narrows along a line of descent unless the cell is reprogrammed", () => {
  const n = (id, cell, potency) => ({ id, label: cell, cell, potency });
  const spec = { renderer: "lineage", alt: "x", layout: "line", nodes: [n("a", "zygote", "totipotent"), n("b", "inner cell mass", "pluripotent"), n("c", "haematopoietic stem cell", "multipotent")],
    edges: [{ from: "a", to: "b" }, { from: "b", to: "c" }] };
  assert.equal(allPass(spec), true);
  spec.nodes[2].potency = "pluripotent"; // a haematopoietic stem cell cannot make every body cell type
  assert.equal(allPass(spec), false);
  const ipsc = { renderer: "lineage", alt: "x", layout: "line", nodes: [n("a", "skin fibroblast", "specialised"), n("b", "induced pluripotent stem cell", "pluripotent")], edges: [{ from: "a", to: "b" }] };
  assert.equal(allPass(ipsc), false);
  ipsc.edges[0].reprogram = true;
  assert.equal(allPass(ipsc), true);
});

test("Gram walls: thickness, outer membrane and stain must agree", () => {
  const pos = { gram: "positive", example: "Staphylococcus", stain: "purple", layers: [{ kind: "peptidoglycan", nm: 30 }, { kind: "plasma membrane", nm: 8 }, { kind: "cytoplasm", nm: 10 }] };
  const spec = { renderer: "envelope", alt: "x", panels: [pos] };
  assert.equal(allPass(spec), true);
  pos.stain = "pink"; assert.equal(allPass(spec), false);
  pos.stain = "purple"; pos.example = "E. coli"; assert.equal(allPass(spec), false);
  pos.example = "Staphylococcus"; pos.layers.unshift({ kind: "outer membrane", nm: 8 }); assert.equal(allPass(spec), false);
});

test("the genetic code: 64 codons, 61 for amino acids, three stops, degeneracy", () => {
  assert.equal(codonCount("Stop"), 3);
  assert.equal(codonCount("Met"), 1); assert.equal(codonCount("Trp"), 1);
  for (const aa of ["Leu", "Ser", "Arg"]) assert.equal(codonCount(aa), 6);
  const spec = { renderer: "codontable", alt: "x", claims: [{ type: "stops", value: ["UAA", "UAG", "UGA"] }, { type: "sense", value: 61 }, { type: "amino", value: 20 }, { type: "family", prefix: "GG", aa: "Gly" }] };
  assert.equal(allPass(spec), true);
  spec.claims = [{ type: "count", aa: "Leu", value: 4 }]; // leucine has six codons, not four
  assert.equal(allPass(spec), false);
  spec.claims = [{ type: "family", prefix: "AU", aa: "Ile" }]; // AUG is methionine, so AUN is not one family
  assert.equal(allPass(spec), false);
});

test("Meselson and Stahl: only semi-conservative copying gives the bands that were seen", () => {
  assert.deepEqual(bandFractions("semiconservative", 1), { heavy: 0, hybrid: 1, light: 0 });
  assert.deepEqual(bandFractions("semiconservative", 2), { heavy: 0, hybrid: 0.5, light: 0.5 });
  assert.ok(bandFractions("conservative", 1).heavy > 0); // a heavy band would remain at generation 1
  const observed = { 0: { heavy: 1 }, 1: { hybrid: 1 }, 2: { hybrid: 0.5, light: 0.5 } };
  const g = (model, agrees) => ({ label: model, model, gens: [0, 1, 2], agrees });
  assert.equal(allPass({ renderer: "density", alt: "x", observed, groups: [g("semiconservative", true), g("conservative", false)] }), true);
  assert.equal(allPass({ renderer: "density", alt: "x", observed, groups: [g("conservative", true)] }), false); // claiming a ruled-out model fits
  assert.equal(allPass({ renderer: "density", alt: "x", observed, groups: [g("semiconservative", false)] }), false);
});

test("crossing over: a crossover between linked genes makes two recombinant chromatids of four, never more", () => {
  const genes = [{ alleles: ["A", "a"] }, { alleles: ["B", "b"] }];
  const between = chromatidsAfter({ genes, crossover: "between" });
  assert.equal(between.recombinant, 2); assert.equal(between.parental, 2);
  assert.deepEqual(between.after.map((c) => c.join("")).sort(), ["AB", "Ab", "aB", "ab"]);
  assert.equal(chromatidsAfter({ genes, crossover: "outside" }).recombinant, 0); // beyond both genes, nothing is reshuffled
  const spec = { renderer: "crossover", alt: "x", genes, crossover: "between", claims: [{ type: "recombinant", value: 2 }, { type: "max", value: 0.5 }] };
  assert.equal(allPass(spec), true);
  spec.claims = [{ type: "recombinant", value: 4 }];
  assert.equal(allPass(spec), false);
});

test("pedigrees: the unit 4 families fit their mode of inheritance and rule out the others", () => {
  const rec = [{ id: "I-1", sex: "m", gen: 1, x: 0 }, { id: "I-2", sex: "f", gen: 1, x: 1 }, { id: "II-1", sex: "m", gen: 2, x: 0, affected: true, parents: ["I-1", "I-2"] }];
  assert.equal(pedigreeFits({ people: rec }, "AD"), false); // unaffected parents, affected child
  assert.equal(pedigreeFits({ people: rec }, "AR"), true);
  assert.equal(pedigreeFits({ people: rec }, "XR"), true);
});

test("mitosis and meiosis: cell and chromosome counts follow from the divisions", () => {
  const m = divide("mitosis", 2, false), e = divide("meiosis", 2, true);
  assert.equal(m.cells.length, 2); assert.ok(m.cells.every((c) => c.length === 4)); assert.equal(m.divisions, 1);
  assert.equal(e.cells.length, 4); assert.ok(e.cells.every((c) => c.length === 2)); assert.equal(e.divisions, 2);
  assert.equal(new Set(e.cells.map((c) => [...c].sort().join())).size, 4); // a crossover makes all four different
  assert.ok(new Set(divide("meiosis", 2, false).cells.map((c) => [...c].sort().join())).size < 4); // without it they come in identical pairs
  assert.equal(allPass({ renderer: "ploidy", alt: "x", pairs: 2, crossover: true, claims: [{ type: "cells", process: "meiosis", value: 4 }, { type: "chromosomes", process: "meiosis", value: 2 }] }), true);
  assert.equal(allPass({ renderer: "ploidy", alt: "x", pairs: 2, crossover: true, claims: [{ type: "cells", process: "mitosis", value: 4 }] }), false);
  assert.equal(allPass({ renderer: "ploidy", alt: "x", pairs: 2, crossover: false, claims: [] }), true);
});

test("germ layers: each tissue must come from the layer it is listed under", () => {
  const layer = (name, items) => ({ name, position: "x", items });
  const ok = [layer("ectoderm", ["nervous system"]), layer("mesoderm", ["heart"]), layer("endoderm", ["liver"])];
  assert.equal(allPass({ renderer: "germlayers", alt: "x", layers: ok }), true);
  assert.equal(allPass({ renderer: "germlayers", alt: "x", layers: [layer("ectoderm", ["liver"]), ok[1], ok[2]] }), false); // the liver is endoderm
  assert.equal(allPass({ renderer: "germlayers", alt: "x", layers: ok.slice(0, 2) }), false); // two layers is not triploblastic
});

test("drift: a Wright–Fisher population loses or fixes alleles and stays in 0–1", () => {
  let k = 1; const rnd = () => ((k = (k * 16807) % 2147483647) / 2147483647); // a simple deterministic generator
  const run = wrightFisher(20, 0.5, 200, rnd);
  assert.ok(run.every((p) => p >= 0 && p <= 1));
  assert.ok(run.at(-1) === 0 || run.at(-1) === 1); // a small population reaches 0 or 1 within 200 generations
  const spec = { renderer: "drift", alt: "x", seed: 5, p0: 0.5, gens: 50, reps: 4, panels: [{ N: 20, label: "a" }, { N: 500, label: "b" }], claims: [{ type: "moreSpread", small: 20, large: 500, factor: 2 }, { type: "theory", N: 20 }] };
  assert.equal(allPass(spec), true);
  spec.claims = [{ type: "moreSpread", small: 500, large: 20, factor: 1 }]; // the wrong way round
  assert.equal(allPass(spec), false);
});

test("cladograms: a trait that does not match one clade, or arose twice, is rejected", () => {
  const tree = ["lancelet", ["shark", ["frog", ["lizard", "mouse"]]]];
  const ok = { renderer: "cladogram", alt: "x", tree, characters: [{ name: "jaws", taxa: ["shark", "frog", "lizard", "mouse"] }, { name: "amniotic egg", taxa: ["lizard", "mouse"] }], claims: [{ type: "closer", taxa: ["lizard", "mouse"], than: ["frog", "lizard"] }] };
  assert.equal(allPass(ok), true);
  assert.equal(allPass({ ...ok, characters: [{ name: "wings", taxa: ["shark", "mouse"] }] }), false); // no single clade: it would have arisen twice
  assert.equal(allPass({ ...ok, claims: [{ type: "closer", taxa: ["frog", "lizard"], than: ["lizard", "mouse"] }] }), false);
});

test("sarcomere: contraction shortens the I band and H zone, never the A band", () => {
  const spec = { thick: 1.6, thin: 1.0 };
  assert.deepEqual([bandsOf(spec, 2.4).A, bandsOf(spec, 1.8).A], [1.6, 1.6]);
  assert.ok(bandsOf(spec, 1.8).I < bandsOf(spec, 2.4).I);
  assert.equal(bandsOf(spec, 1.8).H, 0);
  const ok = { renderer: "sarcomere", alt: "x", thick: 1.6, thin: 1.0, states: [{ label: "relaxed", L: 2.4 }, { label: "contracted", L: 1.8 }], claims: [{ type: "shortening", value: 0.6 }] };
  assert.equal(allPass(ok), true);
  assert.equal(allPass({ ...ok, states: [{ label: "relaxed", L: 1.8 }, { label: "contracted", L: 2.4 }] }), false); // a "contracted" sarcomere that is longer
});

test("the Calvin cycle: carbon is conserved at every step, so a miscounted step fails", () => {
  const nodes = [{ id: "a", label: "A" }, { id: "b", label: "B" }];
  const spec = { renderer: "carbonflow", alt: "x", layout: "line", nodes, edges: [{ from: "a", to: "b" }], balance: [{ name: "fixation", in: [[3, 1], [3, 5]], out: [[6, 3]] }, { name: "regeneration", in: [[5, 3]], out: [[3, 5]] }] };
  assert.equal(allPass(spec), true);
  spec.balance[0].out = [[6, 4]]; // 24 carbons out of 18 in
  assert.equal(allPass(spec), false);
});

test("nutrient cycles: each arrow must be a real process between the right stores, and no store is a dead end", () => {
  const nodes = [{ id: "atmosphere", label: "air" }, { id: "producers", label: "plants" }, { id: "consumers", label: "animals" }];
  const ok = { renderer: "biocycle", alt: "x", cycle: "carbon", nodes, edges: [{ from: "atmosphere", to: "producers", process: "photosynthesis" }, { from: "producers", to: "consumers", process: "feeding" }, { from: "consumers", to: "atmosphere", process: "respiration" }] };
  assert.equal(allPass(ok), true);
  assert.equal(allPass({ ...ok, edges: [{ ...ok.edges[0], from: "consumers" }, ok.edges[1], ok.edges[2]] }), false); // animals do not photosynthesise
  assert.equal(allPass({ ...ok, edges: ok.edges.slice(0, 2) }), false); // animals would be a dead end: no way back to the air
});

test("restriction: EcoRI cuts G^AATTC, leaves a self-complementary AATT overhang, and ligation restores the site", () => {
  const r = cutDna("TAGAATTCATGGCCAAAGGGAATTCCTA", "GAATTC", 1);
  assert.deepEqual(r.sites, [2, 19]); assert.equal(r.frags.length, 3); assert.equal(r.overhang, "AATT");
  const spec = { renderer: "restriction", alt: "x", enzyme: { name: "EcoRI", site: "GAATTC", cutAfter: 1 }, molecules: [{ id: "gene", label: "g", dna: "TAGAATTCATGGCCAAAGGGAATTCCTA" }, { id: "vec", label: "v", dna: "CCTAGAATTCGGTCA" }],
    recombinant: { label: "r", from: [["vec", 0], ["gene", 1], ["vec", 1]] }, claims: [{ type: "fragments", id: "gene", value: 3 }] };
  assert.equal(allPass(spec), true);
  assert.equal(allPass({ ...spec, enzyme: { name: "x", site: "GAATTG", cutAfter: 1 }, molecules: [{ id: "gene", label: "g", dna: "TAGAATTGATGGCC" }, spec.molecules[1]] }), false); // not palindromic
  assert.equal(allPass({ ...spec, recombinant: { label: "r", from: [["vec", 1], ["gene", 1], ["vec", 0]] } }), false); // pieces joined in the wrong order lose the site
});

test("Sanger: a fragment of every length, read back into the new strand", () => {
  assert.deepEqual(sangerFragments("GAT").map((f) => f.last), ["G", "A", "T"]);
  assert.equal(allPass({ renderer: "sanger", alt: "x", newStrand: "GATTACA", template: "CTAATGT", claims: [{ type: "reads", value: "GATTACA" }] }), true);
  assert.equal(allPass({ renderer: "sanger", alt: "x", newStrand: "GATTACA", template: "CTAATGA" }), false); // template is not the complement
});

test("alignment: the drawn alignment must score the dynamic-programming optimum", () => {
  const sc = { match: 1, mismatch: -1, gap: -2 };
  assert.equal(needlemanScore("GATTACA", "GATACA", sc), 4);
  assert.equal(scoreAlignment("GATTACA", "GA-TACA", sc).score, 4);
  const pair = (a1, a2) => ({ seq1: "GATTACA", seq2: "GATACA", aligned1: a1, aligned2: a2, label: "x" });
  assert.equal(allPass({ renderer: "align", alt: "x", scoring: sc, pairs: [pair("GATTACA", "GA-TACA")] }), true);
  assert.equal(allPass({ renderer: "align", alt: "x", scoring: sc, pairs: [pair("GATTACA-", "GA-TAC-A")] }), false); // two gaps score worse than the optimum, and the second is not even a valid alignment
});

test("chromatography: Rf is the spot's distance over the solvent front's, and lies between 0 and 1", () => {
  assert.equal(rfOf(72, 80), 0.9);
  const spec = { renderer: "tlc", alt: "x", origin: 0, front: 80, spots: [{ label: "a", d: 72 }, { label: "b", d: 32 }], claims: [{ type: "rf", spot: "a", value: 0.9 }, { type: "rf", spot: "b", value: 0.4 }] };
  assert.equal(allPass(spec), true);
  assert.equal(allPass({ ...spec, claims: [{ type: "rf", spot: "b", value: 0.5 }] }), false); // 32 ÷ 80 is 0.4
  assert.equal(allPass({ ...spec, spots: [{ label: "a", d: 90 }] }), false); // a spot beyond the solvent front
});

test("bilayer: drawn to scale, carbohydrate chains outside, cholesterol only in animal membranes", () => {
  const N = bilayerNumbers(14); assert.ok(N.thickness >= 5 && N.thickness <= 10 && N.core >= 3 && N.core <= 4);
  const ok = { renderer: "bilayer", alt: "x", cell: "animal", scale: 14, proteins: [{ kind: "channel", at: 0.3 }, { kind: "receptor", at: 0.7, carb: true }], cholesterol: [0.1], claims: [{ type: "count", kind: "channel", value: 1 }] };
  assert.equal(allPass(ok), true);
  assert.equal(allPass({ ...ok, cell: "bacterium" }), false); // bacterial membranes lack cholesterol
  assert.equal(allPass({ ...ok, scale: 40 }), false); // at 40 px per nm the bilayer would be about 1.8 nm thick: not a membrane
  assert.equal(allPass({ ...ok, proteins: [{ kind: "receptor", at: 0.7, carb: true, side: "inner" }] }), false); // sugars are on the outer surface only
});

test("induced fit: the active site changes shape to fit, and the products add up to the substrate", () => {
  assert.equal(fitOk({ before: 58, after: 40 }, 40), true);
  const ok = { renderer: "inducedfit", alt: "x", substrate: { w: 40, h: 46 }, products: [{ w: 22 }, { w: 18 }], models: [{ name: "lock and key", before: 40, after: 40 }, { name: "induced fit", before: 58, after: 40 }] };
  assert.equal(allPass(ok), true);
  assert.equal(allPass({ ...ok, models: [ok.models[0], { name: "induced fit", before: 40, after: 40 }] }), false); // no shape change is not induced fit
  assert.equal(allPass({ ...ok, models: [{ name: "lock and key", before: 50, after: 40 }, ok.models[1]] }), false); // a lock-and-key site that changes shape
  assert.equal(allPass({ ...ok, products: [{ w: 22 }, { w: 30 }] }), false); // products larger than the substrate
});

test("water: 104.5° molecules, hydrogen bonds longer than O–H and in line, at most 2 donated and 2 accepted", () => {
  const mols = waterCluster(450), bonds = hydrogenBonds(mols, 450);
  assert.equal(bonds.length, 4); assert.ok(bonds.every((b) => b.length > 0.096 && b.length < 0.2 && b.angle >= 150));
  assert.equal(bonds.filter((b) => b.donor === 0).length, 2); assert.equal(bonds.filter((b) => b.acceptor === 0).length, 2);
  assert.equal(HOH, 104.5);
  assert.equal(allPass({ renderer: "hbond", alt: "x", scale: 450, energies: { hbond: [5, 30], cc: 350 } }), true);
  assert.equal(allPass({ renderer: "hbond", alt: "x", scale: 450, energies: { hbond: [5, 300], cc: 350 } }), false); // not far weaker than a covalent bond
});

test("section: every template draws its labelled parts, and order and position claims are checked", () => {
  const base = { renderer: "section", alt: "x" };
  const all = {
    root: ["root hair", "epidermis", "cortex", "endodermis", "Casparian strip", "vascular cylinder", "xylem", "phloem"],
    stem: ["epidermis", "cortex", "vascular bundle", "xylem", "phloem", "pith"],
    leaf: ["cuticle", "upper epidermis", "palisade mesophyll", "spongy mesophyll", "lower epidermis", "stoma", "guard cell", "xylem", "phloem"],
    xylem: ["vessel element", "lignin", "pit", "no end wall"],
    phloem: ["sieve tube element", "sieve plate", "companion cell", "plasmodesma", "nucleus", "mitochondria"],
    flower: ["petal", "sepal", "anther", "filament", "stigma", "style", "ovary", "ovule", "receptacle"],
    seed: ["testa", "cotyledon", "plumule", "radicle", "micropyle", "endosperm", "single cotyledon"],
  };
  for (const [template, labels] of Object.entries(all)) {
    assert.equal(allPass({ ...base, template, labels }), true, template);
    const r = render({ ...base, template, labels });
    assert.ok(r.wide.includes("data-part") && r.narrow.includes("data-part"), `${template} parts carry data-part`);
  }
  assert.equal(allPass({ ...base, template: "leaf", labels: ["cuticle"], claims: [{ type: "order", value: ["cuticle", "upper epidermis", "palisade mesophyll", "spongy mesophyll", "lower epidermis"] }] }), true);
  assert.equal(allPass({ ...base, template: "leaf", labels: ["cuticle"], claims: [{ type: "order", value: ["spongy mesophyll", "palisade mesophyll"] }] }), false); // palisade is above spongy
  assert.equal(allPass({ ...base, template: "root", labels: ["xylem"], claims: [{ type: "order", value: ["cortex", "epidermis"] }] }), false); // the epidermis is outside the cortex
  assert.equal(allPass({ ...base, template: "stem", labels: ["xylem"], claims: [{ type: "fact", id: "xylemInner" }, { type: "fact", id: "ring" }] }), true);
  assert.equal(allPass({ ...base, template: "stem", labels: ["xylem"], claims: [{ type: "fact", id: "notAFact" }] }), false);
  assert.equal(allPass({ ...base, template: "xylem", labels: ["vessel element", "lignin", "pit"], claims: [{ type: "fact", id: "noEndWalls" }, { type: "fact", id: "deadCells" }] }), true);
  assert.equal(allPass({ ...base, template: "root", labels: ["not a part"] }), false);
  assert.equal(allPass({ ...base, template: "nosuch", labels: [] }), false);
});

test("section: the cell-junctions template checks that each junction does its job geometrically", () => {
  const base = { renderer: "section", alt: "x", template: "junctions", labels: ["claudin and occludin", "cadherin", "plaque", "intermediate filament", "connexin channel", "plasmodesma", "cell wall", "middle lamella"] };
  const ids = ["sealed", "cadherinSpansGap", "anchoredToFilaments", "channelLinksCytoplasm", "plasmodesmaSpansWalls"];
  assert.equal(allPass({ ...base, claims: ids.map((id) => ({ type: "fact", id })) }), true);
  assert.equal(allPass({ ...base, claims: [{ type: "fact", id: "gapJunctionSealsTheGap" }] }), false); // not something the picture shows
});

test("tract: every solid arrow is a step blood, air or food takes; the circulation is a double loop", () => {
  const circ = [["right heart", "deoxygenated"], ["pulmonary artery", "deoxygenated"], ["lungs", "exchange"], ["pulmonary vein", "oxygenated"], ["left heart", "oxygenated"], ["aorta", "oxygenated"], ["body tissues", "exchange"], ["vena cava", "deoxygenated"]];
  const nodes = circ.map(([is, blood], i) => ({ id: `c${i}`, label: is, is, blood, col: i, row: 0 }));
  const edges = circ.map((_, i) => ({ from: `c${i}`, to: `c${(i + 1) % 8}` }));
  const ok = { renderer: "tract", alt: "x", tract: "circulation", layout: "grid", nodes, edges };
  assert.equal(allPass(ok), true);
  assert.equal(allPass({ ...ok, edges: [{ from: "c0", to: "c2" }, ...edges.slice(1)] }), false); // the right heart does not feed the lungs directly
  assert.equal(allPass({ ...ok, nodes: nodes.map((n) => (n.is === "pulmonary vein" ? { ...n, blood: "deoxygenated" } : n)) }), false); // the pulmonary vein carries oxygenated blood
  assert.equal(allPass({ ...ok, edges: edges.slice(0, 7) }), false); // an open chain is not a circulation
  const gut = ["mouth", "oesophagus", "stomach", "small intestine", "large intestine", "rectum"].map((is, i) => ({ id: `g${i}`, label: is, is, col: i, row: 0 }));
  const route = gut.slice(1).map((_, i) => ({ from: `g${i}`, to: `g${i + 1}` }));
  const acc = { id: "acc", label: "accessory organs", is: "accessory organs", col: 0, row: 1 };
  const g = { renderer: "tract", alt: "x", tract: "gut", layout: "grid", nodes: [...gut, acc], edges: [...route, { from: "acc", to: "g3", dashed: true }] };
  assert.equal(allPass(g), true);
  assert.equal(allPass({ ...g, edges: [...route.slice(0, 2), { from: "g2", to: "acc" }, ...route.slice(3), { from: "acc", to: "g3", dashed: true }] }), false); // food does not pass through the liver or pancreas
  assert.equal(allPass({ ...g, edges: [{ from: "g3", to: "g2" }, ...route.slice(1)] }), false); // food does not run backwards
  const air = { renderer: "tract", alt: "x", tract: "airway", layout: "grid", nodes: ["nose", "pharynx", "larynx", "trachea", "bronchi", "bronchioles", "alveoli"].map((is, i) => ({ id: `a${i}`, label: is, is, col: i, row: 0 })), edges: [0, 1, 2, 3, 4, 5].map((i) => ({ from: `a${i}`, to: `a${i + 1}` })) };
  assert.equal(allPass(air), true);
  assert.equal(allPass({ ...air, edges: [{ from: "a0", to: "a3" }, ...air.edges.slice(1)] }), false); // air does not go from the nose to the trachea without the pharynx and larynx
});

test("cleavage: cells halve in size without growth; each stage's cell areas are recomputed", () => {
  for (const n of [1, 2, 4, 8, 16]) { const cells = cleavageCells(n, 36); assert.equal(cells.length, n); const A = cells.map((c) => ((c.a1 - c.a0) / 360) * Math.PI * (c.r1 * c.r1 - c.r0 * c.r0)); assert.ok(A.every((a) => Math.abs(a - (Math.PI * 36 * 36) / n) < 1e-6), `${n} equal areas`); }
  assert.deepEqual(cleavageCells(3, 36), []);
  const stages = [{ name: "zygote", n: 1 }, { name: "2 cells", n: 2, day: 1 }, { name: "4 cells", n: 4 }, { name: "8 cells", n: 8 }, { name: "morula", n: 16, day: 3 }, { name: "blastocyst", n: 0, kind: "blastocyst", day: 5 }];
  const ok = { renderer: "cleavage", alt: "x", R: 36, stages };
  assert.equal(allPass(ok), true);
  assert.equal(allPass({ ...ok, stages: [stages[0], { name: "3 cells", n: 3 }] }), false); // not a doubling of 1
  assert.equal(allPass({ ...ok, stages: [stages[0], { name: "2 cells", n: 2, R: 50 }] }), false); // the embryo grew
  assert.equal(allPass({ ...ok, stages: [stages[0], { name: "2 cells", n: 2, day: 2 }] }), false); // two cells are on day 1
  assert.equal(allPass({ ...ok, stages: [{ name: "2 cells", n: 2 }] }), false); // must start from the zygote
  assert.equal(allPass({ ...ok, stages: [...stages.slice(0, 5), { ...stages[5], day: 3 }] }), false); // the blastocyst forms on day 5
});

test("fertilisation: the steps are in order, one sperm enters, 23 + 23 = 46", () => {
  const steps = [{ id: "approach", title: "a", note: "n", inside: 0, blocked: 0 }, { id: "acrosome", title: "b", note: "n", inside: 0, blocked: 0 }, { id: "fusion", title: "c", note: "n", inside: 1, blocked: 0 }, { id: "cortical", title: "d", note: "n", inside: 1, blocked: 1 }, { id: "combine", title: "e", note: "n", inside: 1, blocked: 0 }];
  const ok = { renderer: "fertilisation", alt: "x", species: "human", haploid: 23, diploid: 46, steps };
  assert.equal(allPass(ok), true);
  assert.equal(allPass({ ...ok, steps: [steps[0], steps[2], steps[1], ...steps.slice(3)] }), false); // fusion before the acrosome reaction
  assert.equal(allPass({ ...ok, steps: [...steps.slice(0, 3), { ...steps[3], inside: 2 }, steps[4]] }), false); // polyspermy
  assert.equal(allPass({ ...ok, steps: [...steps.slice(0, 3), { ...steps[3], blocked: 0 }, steps[4]] }), false); // the block must stop another sperm
  assert.equal(allPass({ ...ok, haploid: 23, diploid: 23 }), false); // fertilisation restores the diploid number
  assert.equal(allPass({ ...ok, haploid: 22, diploid: 44 }), false); // humans: 23 and 46
  assert.equal(allPass({ ...ok, steps: [{ ...steps[0], id: "teleport" }] }), false);
});

test("cytometry: the gate and the positive percentages are counted from the seeded events", () => {
  const spec = { renderer: "cytometry", alt: "x", seed: 14, n: 1800, populations: [{ name: "lymphocytes", fsc: [300, 42], ssc: [200, 38], frac: 0.35 }, { name: "monocytes", fsc: [500, 55], ssc: [390, 55], frac: 0.07 }, { name: "granulocytes", fsc: [470, 65], ssc: [690, 90], frac: 0.58 }], gate: { fsc: [190, 420], ssc: [90, 320], population: "lymphocytes" }, cd4: { frac: 0.4, neg: [1.2, 0.28], pos: [2.9, 0.3] }, claims: [{ type: "gate", percent: 35, tol: 3 }, { type: "positive", percent: 40, tol: 4 }] };
  const a = cytometryData(spec), b = cytometryData(spec);
  assert.equal(a.gatePercent, b.gatePercent); assert.equal(a.threshold, b.threshold); // seeded: repeatable
  assert.ok(a.purity > 0.9 && a.recall > 0.9 && a.controlBelow >= 0.98);
  assert.equal(allPass(spec), true);
  assert.equal(allPass({ ...spec, claims: [{ type: "gate", percent: 60, tol: 3 }] }), false); // the gate does not hold 60% of events
  assert.equal(allPass({ ...spec, claims: [{ type: "positive", percent: 80, tol: 4 }] }), false);
  assert.equal(allPass({ ...spec, gate: { ...spec.gate, fsc: [400, 700], ssc: [300, 800] } }), false); // a gate on the wrong cells
  assert.equal(allPass({ ...spec, populations: spec.populations.map((p) => ({ ...p, frac: p.frac / 2 })) }), false); // fractions must add to 1
  assert.notEqual(cytometryData({ ...spec, seed: 15 }).gatePercent, a.gatePercent); // another seed, another sample
});

test("section: virion, horizontal-transfer and chromatin templates check what each picture shows", () => {
  const base = { renderer: "section", alt: "x" };
  const all = {
    virion: [["genome", "capsid", "envelope", "glycoprotein"], ["capsidEnclosesGenome", "envelopeEnclosesCapsid", "glycoproteinsInEnvelope", "noCellularMachinery"]],
    hgt: [["free DNA", "recipient cell", "bacteriophage", "pilus", "plasmid"], ["transformationNeedsNoContact", "transductionUsesPhage", "conjugationUsesPilus"]],
    chromatin: [["nucleosome", "histone tail", "acetyl group", "methyl group", "promoter", "RNA polymerase"], ["acetylationLoosens", "methylationOnSilenced", "polymeraseOnlyOnOpen"]],
  };
  for (const [template, [labels, facts]] of Object.entries(all)) assert.equal(allPass({ ...base, template, labels, claims: facts.map((id) => ({ type: "fact", id })) }), true, template);
  assert.equal(allPass({ ...base, template: "virion", labels: ["genome"], claims: [{ type: "order", value: ["capsid", "envelope"] }] }), false); // the envelope is outside the capsid
  assert.equal(allPass({ ...base, template: "chromatin", labels: ["histone tail"], claims: [{ type: "fact", id: "methylationActivates" }] }), false);
});

test("karyotype: counts and notation are worked out, and syndromes are what their names mean", () => {
  assert.deepEqual(karyotypeOf({ sex: "XX", extra: { 21: 1 } }), { total: 47, notation: "47,XX,+21", aneuploid: true });
  assert.equal(karyotypeOf({ sex: "X", extra: {} }).notation, "45,X"); assert.equal(karyotypeOf({ sex: "XXY", extra: {} }).notation, "47,XXY"); assert.equal(karyotypeOf({ sex: "XY", extra: {} }).aneuploid, false);
  const cases = [{ name: "typical female", sex: "XX", extra: {}, total: 46, notation: "46,XX" }, { name: "Down syndrome", sex: "XX", extra: { 21: 1 }, total: 47, notation: "47,XX,+21" }, { name: "Turner syndrome", sex: "X", extra: {}, total: 45, notation: "45,X" }, { name: "Klinefelter syndrome", sex: "XXY", extra: {}, total: 47, notation: "47,XXY" }];
  assert.equal(allPass({ renderer: "karyotype", alt: "x", cases }), true);
  assert.equal(allPass({ renderer: "karyotype", alt: "x", cases: [{ ...cases[1], total: 46 }] }), false); // trisomy 21 is 47
  assert.equal(allPass({ renderer: "karyotype", alt: "x", cases: [{ ...cases[2], sex: "XX", notation: "46,XX" }] }), false); // Turner is a single X
  assert.equal(allPass({ renderer: "karyotype", alt: "x", cases: [{ ...cases[3], notation: "47,XYY" }] }), false);
});

test("plasmid map: required features, no overlap, unique cutters, fragments add up", () => {
  assert.deepEqual(digestFragments(3000, [2410, 2450]).sort((a, b) => a - b), [40, 2960]); assert.deepEqual(digestFragments(3000, []), [3000]);
  const ok = { renderer: "plasmidmap", alt: "x", name: "v", length: 3000, features: [{ name: "ori", type: "ori", start: 100, end: 700 }, { name: "AmpR", type: "marker", start: 1100, end: 1961 }, { name: "MCS", type: "mcs", start: 2400, end: 2460 }], sites: [{ enzyme: "EcoRI", pos: 2410 }, { enzyme: "HindIII", pos: 2450 }], digest: ["EcoRI", "HindIII"] };
  assert.equal(allPass(ok), true);
  assert.equal(allPass({ ...ok, features: ok.features.slice(0, 2) }), false); // no multiple cloning site
  assert.equal(allPass({ ...ok, features: [ok.features[0], { ...ok.features[1], start: 600 }, ok.features[2]] }), false); // overlapping features
  assert.equal(allPass({ ...ok, sites: [...ok.sites, { enzyme: "EcoRI", pos: 2430 }] }), false); // a site that cuts twice is not unique
  assert.equal(allPass({ ...ok, sites: [{ enzyme: "EcoRI", pos: 100 }, ok.sites[1]] }), false); // outside the MCS
  assert.equal(allPass({ ...ok, features: [ok.features[0], { ...ok.features[1], end: 3500 }, ok.features[2]] }), false); // off the plasmid
  assert.equal(allPass({ ...ok, digest: ["EcoRI", "NotI"] }), false);
});

test("habitat fragmentation: patches, edge and core are counted from the grid", () => {
  const block = ["######", "######", "######", "######"], S = landscapeStats(block);
  assert.deepEqual([S.area, S.patches, S.edge, S.core], [24, 1, 16, 8]);
  const two = ["###.###", "###.###", "###.###"], T = landscapeStats(two);
  assert.equal(T.patches, 2); assert.ok(T.edgeShare > landscapeStats(["######", "######", "######"]).edgeShare);
  const panels = [{ name: "a", grid: ["########", "########", "########", "########", "########", "########"] }, { name: "b", grid: ["###..###", "###..###", "###..###", "###..###", "###..###", "###..###"] }, { name: "c", grid: ["###..###", "###..###", "########", "########", "###..###", "###..###"] }];
  const claims = [{ type: "sameArea", a: 0, b: 0 }, { type: "patches", panel: 1, value: 2 }, { type: "moreEdge", a: 0, b: 1 }, { type: "lessCore", a: 0, b: 1 }, { type: "connected", panel: 2 }];
  assert.equal(allPass({ renderer: "fragment", alt: "x", panels, claims }), true);
  assert.equal(allPass({ renderer: "fragment", alt: "x", panels, claims: [{ type: "patches", panel: 1, value: 3 }] }), false);
  assert.equal(allPass({ renderer: "fragment", alt: "x", panels, claims: [{ type: "connected", panel: 1 }] }), false); // two separate patches
  assert.equal(allPass({ renderer: "fragment", alt: "x", panels, claims: [{ type: "moreEdge", a: 1, b: 0 }] }), false); // the continuous block has less edge
  assert.equal(allPass({ renderer: "fragment", alt: "x", panels: [panels[0], { name: "x", grid: ["###", "###"] }], claims: [] }), false); // panels must be the same size
});

test("network: preferential attachment grows a connected network with a hub and a heavy tail", () => {
  const { edges, deg } = growNetwork(36, 2, 5);
  assert.equal(edges.length, 1 + 34 * 2); assert.equal(deg.reduce((a, b) => a + b, 0), 2 * edges.length);
  assert.ok(Math.max(...deg) >= 3 * ((2 * edges.length) / 36));
  assert.deepEqual(growNetwork(36, 2, 5).edges, edges); // seeded
  assert.equal(allPass({ renderer: "bionetwork", alt: "x", seed: 5, n: 36, m: 2 }), true);
  assert.equal(allPass({ renderer: "bionetwork", alt: "x", seed: 5, n: 8, m: 3 }), false); // a few nodes with many links each have no heavy tail
});

test("water cycle: every arrow is a real step, and every store has water in and out", () => {
  const nodes = ["atmosphere", "oceans", "land"].map((id) => ({ id, label: id }));
  const edges = [{ from: "oceans", to: "atmosphere", process: "evaporation" }, { from: "atmosphere", to: "land", process: "condensation and precipitation" }, { from: "land", to: "oceans", process: "river flow" }];
  assert.equal(allPass({ renderer: "biocycle", alt: "x", cycle: "water", nodes, edges: edges.slice(0, 2).concat([{ from: "land", to: "atmosphere", process: "evaporation" }]) }), false); // land is not a source of evaporation; the oceans get no water in
  assert.equal(allPass({ renderer: "biocycle", alt: "x", cycle: "water", nodes, edges: [edges[0], { from: "atmosphere", to: "land", process: "evaporation" }, edges[2]] }), false); // evaporation does not go from the air to the land
});

test("pH scale: [H+] is 10^-pH, each unit is tenfold, and the worked example holds", () => {
  assert.equal(hOfPh(7), 1e-7); assert.ok(Math.abs(phOfH(1e-4) - 4) < 1e-12); assert.ok(Math.abs(hOfPh(3) / hOfPh(4) - 10) < 1e-9);
  const ok = { renderer: "phscale", alt: "x", markers: [{ label: "stomach", ph: 2, text: "s" }, { label: "neutral (25 °C)", ph: 7, text: "n" }, { label: "human blood", ph: 7.35, ph2: 7.45, text: "b" }], example: { ph: 3 } };
  assert.equal(allPass(ok), true);
  assert.equal(allPass({ ...ok, markers: [{ label: "stomach", ph: 5, text: "s" }] }), false); // the stomach is about pH 2
  assert.equal(allPass({ ...ok, markers: [{ label: "human blood", ph: 7.0, ph2: 7.8, text: "b" }] }), false); // blood is 7.35 to 7.45
  assert.equal(allPass({ ...ok, markers: [{ label: "lemon juice", ph: 2, text: "l" }] }), false); // not in the lesson
  assert.equal(allPass({ ...ok, example: { ph: 4 } }), false); // 1 × 10^-4 gives pH 4, so the example starts one unit lower
});

test("DNA repair: pathways match their damage, and nucleotide excision repair restores the sequence", () => {
  assert.equal(complementOf("GACT"), "CTGA");
  const ner = { strand: "GACTTGCATCAG", dimer: [3, 4], excise: [2, 7] }, N = nerSteps(ner);
  assert.equal(N.filled.join(""), "CTTGCA"); assert.equal(N.restored, ner.strand);
  const rows = [{ damage: "replication error missed by proofreading", pathway: "mismatch repair" }, { damage: "oxidised base", pathway: "base excision repair" }, { damage: "thymine dimer (UV light)", pathway: "nucleotide excision repair" }, { damage: "double-strand break", pathway: "homologous recombination", note: "sister chromatid as the template" }, { damage: "double-strand break", pathway: "non-homologous end joining", note: "can lose bases" }];
  const ok = { renderer: "repair", alt: "x", rows, ner };
  assert.equal(allPass(ok), true);
  assert.equal(allPass({ ...ok, rows: [{ ...rows[0], pathway: "base excision repair" }, ...rows.slice(1)] }), false); // a mismatch is not an oxidised base
  assert.equal(allPass({ ...ok, rows: rows.slice(1) }), false); // every kind of damage needs a pathway
  assert.equal(allPass({ ...ok, ner: { ...ner, dimer: [2, 4] } }), false); // a dimer is two adjacent thymines
  assert.equal(allPass({ ...ok, ner: { ...ner, excise: [5, 8] } }), false); // the cut must contain the dimer
  assert.equal(allPass({ ...ok, ner: { ...ner, dimer: [0, 1] } }), false); // G and A are not thymines
  assert.equal(allPass({ ...ok, rows: [...rows.slice(0, 3), { ...rows[3], note: "a random template" }, rows[4]] }), false);
});

test("complement cascade: triggers, convergence on C3, and every arrow a step of the cascade", () => {
  const n = (id, is, extra = {}) => ({ id, label: is, sub: extra.sub || "", is, col: 0, row: 0, ...extra });
  const nodes = [n("p1", "classical pathway", { sub: "antibody bound to antigen" }), n("p2", "lectin pathway", { sub: "lectins binding sugars on microbes" }), n("p3", "alternative pathway", { sub: "directly on microbial surfaces" }), n("c3", "C3"), n("c3a", "C3a"), n("c3b", "C3b"), n("c5", "C5"), n("ops", "opsonisation"), n("lys", "lysis"), n("inf", "inflammation")];
  const edges = [["p1", "c3"], ["p2", "c3"], ["p3", "c3"], ["c3", "c3a"], ["c3", "c3b"], ["c3a", "inf"], ["c3b", "ops"], ["c3b", "c5"], ["c5", "lys", "C5b–C9"], ["c5", "inf", "C5a"]].map(([from, to, via]) => ({ from, to, via }));
  const ok = { renderer: "cascade", alt: "x", note: "n", nodes, edges };
  assert.equal(allPass(ok), true);
  assert.equal(allPass({ ...ok, edges: edges.filter((e) => e.from !== "p3") }), false); // all three pathways must converge on C3
  assert.equal(allPass({ ...ok, edges: [...edges, { from: "c3a", to: "lys" }] }), false); // C3a does not lead to lysis
  assert.equal(allPass({ ...ok, edges: edges.map((e) => (e.to === "inf" && e.from === "c5" ? { ...e, via: "C5b" } : e)) }), false); // C5a, not C5b, is the inflammatory fragment
  assert.equal(allPass({ ...ok, nodes: nodes.map((x) => (x.is === "lectin pathway" ? { ...x, sub: "antibody bound to antigen" } : x)) }), false); // the lectin pathway is not triggered by antibody
  assert.equal(allPass({ ...ok, nodes: nodes.filter((x) => x.is !== "lysis"), edges: edges.filter((e) => e.to !== "lys") }), false); // all three effects must appear
});

test("section: the brain and elbow templates check positions, order and what joins what", () => {
  const base = { renderer: "section", alt: "x" };
  const brain = ["skull", "meninges", "cerebral cortex", "frontal lobe", "parietal lobe", "temporal lobe", "occipital lobe", "cerebellum", "midbrain", "pons", "medulla", "hypothalamus", "pituitary gland", "spinal cord", "grey matter", "white matter"];
  const bf = ["lobesFrontToBack", "temporalBelowParietal", "cerebellumBehindAndBelow", "brainstemTopToBottom", "cordBelowMedulla", "hypothalamusAboveBrainstemAndPituitary", "protectionLayers", "greyInsideWhite"];
  assert.equal(allPass({ ...base, template: "brain", labels: brain, claims: bf.map((id) => ({ type: "fact", id })) }), true);
  assert.equal(allPass({ ...base, template: "brain", labels: ["pituitary gland"], claims: [{ type: "fact", id: "cerebellumInFront" }] }), false);
  const elbow = ["humerus", "radius and ulna", "biceps", "triceps", "tendon", "ligament", "cartilage", "synovial fluid", "joint capsule", "pivot"];
  const ef = ["musclesOnOppositeSides", "oneContractsOneRelaxes", "tendonJoinsMuscleToBone", "ligamentJoinsBoneToBone", "musclePullsTowardItself"];
  assert.equal(allPass({ ...base, template: "elbow", labels: elbow, claims: ef.map((id) => ({ type: "fact", id })) }), true);
  assert.equal(allPass({ ...base, template: "elbow", labels: ["synovial fluid", "kneecap"] }), false); // not a part of this picture
});
