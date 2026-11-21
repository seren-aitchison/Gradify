// The biology the diagram checks rely on (kit/diagrams/bio-renderers.js): crosses, the genetic code, mutations,
// pedigree reasoning and transport across membranes.
import { test } from "node:test";
import assert from "node:assert/strict";
import { render } from "../kit/diagrams/renderers.js";
import { gametes, crossOf, translate, transcribe, complement, mutationKind, pedigreeFits } from "../kit/diagrams/bio-renderers.js";

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
