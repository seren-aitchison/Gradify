// The science inside the SciGradify interactives (kit/labs/): each model is checked against known values, so a
// change that breaks the chemistry or biology fails here rather than silently in a lesson.
import { test } from "node:test";
import assert from "node:assert/strict";
import { CODE, translate, transcribeCoding } from "../kit/labs/biology/code.js";
import { simulate as hh, spikes } from "../kit/labs/biology/action-potential.js";
import { chiSquareP } from "../kit/labs/lab.js";
import { align } from "../kit/labs/biology/align.js";
import { upgma, pdist, SEQS } from "../kit/labs/biology/phylo.js";
import { simulate as heart } from "../kit/labs/biology/heart.js";
import { capillary, alveolarPO2, sat } from "../kit/labs/biology/gas.js";
import { gfr, glucose } from "../kit/labs/biology/kidney.js";
import { amplify, ct } from "../kit/labs/biology/pcr.js";
import { digest } from "../kit/labs/biology/gel.js";
import { rate, apparent } from "../kit/labs/biology/enzyme.js";
import { ELEMENTS, bySym } from "../kit/labs/chemistry/elements.js";
import { molecule, formula, stereocentres, chirality, ez } from "../kit/labs/chemistry/mol.js";
import { pH } from "../kit/labs/chemistry/acidbase.js";
import { cell } from "../kit/labs/chemistry/electrochem.js";
import { isotopes } from "../kit/labs/chemistry/spectra.js";
import { fractionAbove, halfLife } from "../kit/labs/chemistry/kinetics.js";
import { R as radial } from "../kit/labs/chemistry/orbitals.js";
import { ezAnswer } from "../kit/labs/chemistry/stereo.js";
import { check as lewisCheck, MOLS as LEWIS } from "../kit/labs/chemistry/lewis.js";

const near = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg}: ${a} vs ${b}`);

test("biology: the standard genetic code", () => {
  assert.equal(Object.keys(CODE).length, 64);
  assert.equal(CODE.ATG, "M"); assert.equal(CODE.TGG, "W");
  for (const s of ["TAA", "TAG", "TGA"]) assert.equal(CODE[s], "*");
  assert.equal(translate(transcribeCoding("GCCACCATGGCTTCAAAGGGAGAAGAACTGTTCACCTGGTAA")).protein, "MASKGEELFTW*");
});

test("biology: Hodgkin–Huxley threshold, refractoriness and repetitive firing", () => {
  assert.equal(spikes(hh({ stim: [{ t: 5, dur: 1, amp: 5 }] })), 0);
  assert.equal(spikes(hh({ stim: [{ t: 5, dur: 1, amp: 10 }] })), 1);
  assert.equal(spikes(hh({ stim: [{ t: 5, dur: 1, amp: 10 }, { t: 9, dur: 1, amp: 10 }] })), 1, "absolute refractory period");
  assert.ok(spikes(hh({ hold: 10 })) >= 3, "sustained current fires repeatedly");
  const peak = Math.max(...hh({ stim: [{ t: 5, dur: 1, amp: 10 }] }).map((p) => p.V)); near(peak, 40, 10, "overshoot");
});

test("biology: chi-squared critical values, alignment and UPGMA", () => {
  near(chiSquareP(3.841, 1), 0.05, 0.001, "df 1"); near(chiSquareP(7.815, 3), 0.05, 0.001, "df 3");
  const a = align("GATTACA", "GATTACA"); assert.equal(a.score, 7); assert.equal(a.identity, 1);
  const names = Object.keys(SEQS), D = names.map((x) => names.map((y) => pdist(SEQS[x], SEQS[y])));
  assert.equal(upgma(names, D).tree.name, "(Mouse,(Macaque,(Orangutan,(Gorilla,(Human,Chimpanzee)))))", "accepted primate topology");
});

test("biology: physiology models give resting-adult values", () => {
  const h = heart(); near(h.sys, 120, 8, "systolic"); near(h.dia, 80, 8, "diastolic"); near(h.SV, 70, 10, "stroke volume"); near(h.EF, 0.55, 0.06, "ejection fraction");
  near(alveolarPO2(760), 100, 2, "alveolar PO2 at sea level");
  near(sat(26.8), 0.5, 1e-9, "P50"); assert.ok(sat(100) > 0.96);
  const tr = capillary({ PA: 100 }), t = tr.find(([, P]) => P > 99)[0]; assert.ok(t > 0.15 && t < 0.4, `equilibration at ${t} s`);
  assert.equal(gfr({}), 125);
  assert.equal(glucose({ GFR: 125, plasma: 5 }).excreted, 0); assert.ok(glucose({ GFR: 125, plasma: 15 }).excreted > 5, "glycosuria above threshold");
});

test("biology: PCR, gels and enzyme kinetics", () => {
  const d = ct(amplify({ N0: 100, eff: 1 }), 1e10) - ct(amplify({ N0: 1000, eff: 1 }), 1e10); near(d, 3.32, 0.05, "10-fold dilution ΔCt");
  assert.deepEqual(digest(["HindIII"]), [2790, 2210]); assert.deepEqual(digest(["EcoRI"]), [5000]);
  near(rate(2, { Vmax: 100, Km: 2 }), 50, 1e-9, "v = Vmax/2 at Km");
  const c = apparent({ Vmax: 100, Km: 2, I: 1, Ki: 1, type: "competitive" }); assert.equal(c.Vmax, 100); assert.equal(c.Km, 4);
  const u = apparent({ Vmax: 100, Km: 2, I: 1, Ki: 1, type: "uncompetitive" }); assert.equal(u.Vmax, 50); assert.equal(u.Km, 1);
});

test("chemistry: element data", () => {
  assert.equal(ELEMENTS.length, 118);
  assert.equal(bySym.F.en, 3.98); assert.equal(bySym.He.ie, 2372); assert.equal(bySym.C.mass, 12.011);
  assert.equal(bySym.Fe.config, "[Ar] 3d6 4s2"); assert.equal(bySym.Cr.config, "[Ar] 3d5 4s1"); assert.equal(bySym.Cu.config, "[Ar] 3d10 4s1");
  assert.deepEqual([bySym.Au.group, bySym.Au.period], [11, 6]); assert.deepEqual([bySym.Og.group, bySym.Og.period], [18, 7]);
  for (const e of ELEMENTS) assert.ok(e.group >= 1 && e.group <= 18 && e.period >= 1 && e.period <= 7, e.sym);
});

test("chemistry: SMILES, formulae, geometry and stereodescriptors", () => {
  assert.equal(formula(molecule("Cn1cnc2c1c(=O)n(C)c(=O)n2C", { iters: 200 })).text, "C8H10N4O2", "caffeine");
  near(formula(molecule("CC(=O)Oc1ccccc1C(=O)O", { iters: 200 })).mass, 180.16, 0.02, "aspirin");
  const s = (smi) => { const m = molecule(smi); return stereocentres(m).map((i) => chirality(m, i)); };
  assert.deepEqual(s("C[C@@H](C(=O)O)N"), ["S"], "L-alanine"); assert.deepEqual(s("CC[C@@H](C)O"), ["R"], "(R)-butan-2-ol");
  const e = (smi) => { const m = molecule(smi); const b = m.bonds.find((x) => x.order === 2); return ez(m, b.a, b.b); };
  assert.equal(e("C/C=C/C"), "E"); assert.equal(e("C/C=C\\C"), "Z");
  assert.equal(ezAnswer(["C(=O)O", "CC", "Br", "F"]), "Z");
});

test("chemistry: Lewis checker", () => {
  assert.ok(lewisCheck(LEWIS[0], [1, 1], [2, 0, 0]).ok, "water");
  assert.ok(lewisCheck(LEWIS[2], [2, 2], [2, 0, 2]).ok, "carbon dioxide");
  assert.ok(!lewisCheck(LEWIS[2], [1, 1], [3, 0, 3]).ok, "CO2 with single bonds leaves carbon short");
});

test("chemistry: exact pH, cell potentials, isotope patterns, kinetics and orbitals", () => {
  near(pH({ Ca: 0.1 }), 1, 0.001, "0.1 M HCl"); near(pH({ Ca: 1e-8 }), 6.98, 0.01, "very dilute HCl");
  near(pH({ Ca: 0.1, Ka: 1.8e-5 }), 2.87, 0.01, "0.1 M ethanoic acid"); near(pH({ Ca: 0.05, Ka: 1.8e-5, Na: 0.05 }), 8.72, 0.01, "equivalence point");
  near(pH({ Cb: 0.1, Kb: 1.8e-5 }), 11.13, 0.01, "0.1 M ammonia");
  const d = cell("Zn", "Cu"); assert.equal(d.anode, "Zn"); near(d.E0, 1.1, 1e-9, "Daniell"); near(d.dG, -212, 1, "ΔG°");
  near(cell("Zn", "Cu", 1, 0.01).E, 1.041, 0.001, "Nernst");
  const cl = isotopes({ C: 3, H: 7, Cl: 1 }); near(cl[2][1], 32, 1, "Cl M+2 about a third of M");
  const br = isotopes({ C: 2, H: 5, Br: 1 }); near(br[2][1], 97, 2, "Br M+2 almost equal to M");
  near(fractionAbove(0, 298), 1, 1e-6, "all molecules have E ≥ 0"); near(halfLife(1, 1, Math.LN2), 1, 1e-12, "first-order half-life");
  for (const n of Object.keys(radial)) { let s = 0; for (let r = 0; r < 80; r += 0.002) s += r * r * radial[n](r) ** 2 * 0.002; near(s, 1, 1e-3, `${n} normalised`); }
});
