// Configuration from a drawing (kit/labs/chemistry/reactions/configuration.js): R/S from wedges and dashes, E/Z from
// the page, meso and isomer relationships, checked against hand-worked cases and against mol.js's 3D embedding.
import { test } from "node:test";
import assert from "node:assert/strict";
import * as K from "../kit/labs/chemistry/skeletal.js";
import * as C from "../kit/labs/chemistry/reactions/configuration.js";
import { drawSmiles } from "../kit/labs/chemistry/reactions/predictor.js";
import * as M from "../kit/labs/chemistry/mol.js";

/** CHFClBr drawn by hand: F up the page on a wedge or dash, Cl lower right, Br lower left, H hidden. */
function chfclbr(stereo) {
  const m = K.empty(), c = K.addAtom(m, 0, 0), f = K.addAtom(m, 0, -1, "F"), cl = K.addAtom(m, 0.87, 0.5, "Cl"), br = K.addAtom(m, -0.87, 0.5, "Br");
  const b = K.addBond(m, c.id, f.id); if (stereo) b.stereo = stereo;
  K.addBond(m, c.id, cl.id); K.addBond(m, c.id, br.id);
  return m;
}

test("R/S by hand: the hidden H points away from a wedge, and a dash gives the other enantiomer", () => {
  // H behind the page; Br (lower left) → Cl (lower right) → F (top) runs anticlockwise: S
  assert.equal(C.descriptor(chfclbr("wedge")), "(S)");
  assert.equal(C.descriptor(chfclbr("dash")), "(R)");
  const flat = C.configuration(chfclbr(null)).centres[0];
  assert.equal(flat.label, null); assert.equal(flat.defined, false, "no wedge: the drawing doesn't say");
  assert.equal(C.relation(chfclbr("wedge"), chfclbr("dash")), "enantiomers");
  assert.equal(C.relation(chfclbr("wedge"), C.mirror(chfclbr("dash"))), "identical");
  assert.equal(C.chiral(chfclbr("wedge")), true);
  assert.equal(C.chiral(chfclbr(null)), null, "undefined until the centre is drawn with a wedge");
});

test("a wedge describes the atom at its narrow end only", () => {
  const m = chfclbr("wedge"), b = m.bonds[0];
  [b.a, b.b] = [b.b, b.a]; // now the narrow end is on F
  assert.equal(C.configuration(m).centres[0].label, null);
  assert.equal(K.cycleStereo(m, b.id, b.b), "wedge", "tapping from the carbon turns the bond round");
  assert.equal(b.a, m.atoms[0].id);
  assert.equal(C.descriptor(m), "(S)");
  assert.equal(K.cycleStereo(m, b.id, b.a), "dash"); assert.equal(K.cycleStereo(m, b.id, b.a), null);
  K.cycleOrder(m, b.id); assert.equal(b.stereo, undefined, "a double bond can't be a wedge");
});

// Stereo SMILES laid out as drawings with wedges, against mol.js on its 3D embedding
const CHIRAL = ["F[C@H](Cl)Br", "F[C@@H](Cl)Br", "CC[C@@H](C)O", "CC[C@H](C)O", "C[C@@H](C(=O)O)N", "C[C@H](C(=O)O)N", "C[C@H](O)C(=O)O", "CC[C@H](C)Cl",
  "OC[C@@H](O)C=O", "OC[C@H](O)C=O", "C[C@H](Br)C=C", "CC[C@@H](Br)C(C)C", "C[C@H](Br)[C@@H](C)Br", "C[C@H](Br)[C@H](C)Br", "C[C@@H](O)[C@@H](C)O", "C[C@H]1CCCC[C@@H]1C",
  "CC[C@@](C)(Br)Cl", "N[C@@H](CC(C)C)C(=O)O", "O[C@@H]1CCCC[C@H]1Br", "CC(=O)O[C@H](C)CC"];
test("drawn stereo SMILES give mol.js's R/S at every centre", () => {
  for (const s of CHIRAL) {
    const m = drawSmiles(s), M3 = M.molecule(s), n = M.parseSmiles(s).atoms.length;
    const want = M.stereocentres(M3).filter((i) => i < n).map((i) => M.chirality(M3, i)).sort();
    const got = C.configuration(m).centres.map((c) => c.label).sort();
    assert.deepEqual(got, want, s);
  }
});

test("E/Z from where the groups sit, matching / and \\ in the SMILES and the E/Z exercise's answers", () => {
  for (const [s, want] of [["C/C=C/C", "(E)"], ["C/C=C\\C", "(Z)"], ["Cl/C=C/Cl", "(E)"], ["CC/C=C(\\C)Cl", "(E)"], ["OC(=O)/C=C/C(=O)O", "(E)"], ["OC(=O)/C=C\\C(=O)O", "(Z)"]]) {
    const m = drawSmiles(s); assert.equal(C.descriptor(m), want, s);
  }
  // the ethyl is cis to the methyl, so trans to Cl, the higher group: E (read from the SMILES, not from mol.js's 3D
  // embedding, which can settle cis acids and crowded alkenes into the wrong isomer)
  for (const s of ["C/C=C/C", "C/C=C\\C", "Cl/C=C/Cl"]) {
    const M3 = M.molecule(s), b = M3.bonds.find((x) => x.order === 2);
    assert.equal(`(${M.ez(M3, b.a, b.b)})`, C.descriptor(drawSmiles(s)), `${s} (mol.js)`);
  }
  const m = drawSmiles("CC=CC"), bond = C.configuration(m).bonds[0].bond;
  for (const want of ["E", "Z", "E"]) { assert.ok(C.setEZ(m, bond, want)); assert.equal(C.descriptor(m), `(${want})`); }
  assert.equal(C.relation(drawSmiles("C/C=C/C"), drawSmiles("C/C=C\\C")), "diastereomers", "E and Z isomers are diastereomers");
});

test("a C≡C turned into a C=C is bent to the geometry asked for", () => {
  for (const want of ["Z", "E"]) {
    const m = drawSmiles("CCC#CC"), b = m.bonds.find((x) => x.order === 3);
    b.order = 2;
    assert.equal(C.configuration(m).bonds[0].label, null, "a straight line shows neither");
    assert.ok(C.bendAlkene(m, b.id, want)); assert.equal(C.descriptor(m), `(${want})`);
  }
});

test("meso, chiral and how stereoisomers relate", () => {
  const meso = drawSmiles("C[C@H](Br)[C@@H](C)Br"), rr = drawSmiles("C[C@@H](Br)[C@@H](C)Br"), ss = drawSmiles("C[C@H](Br)[C@H](C)Br");
  assert.equal(C.chiral(meso), false, "meso-2,3-dibromobutane is achiral");
  assert.equal(C.chiral(rr), true);
  assert.equal(C.relation(rr, ss), "enantiomers");
  assert.equal(C.relation(rr, meso), "diastereomers");
  assert.equal(C.relation(meso, C.mirror(meso)), "identical", "a meso compound is its own mirror image");
  assert.equal(C.relation(rr, drawSmiles("CC(Br)CCBr")), "constitutional");
  assert.equal(C.descriptor(rr), "(2R,3R)");
  assert.equal(C.chiral(drawSmiles("CC(C)O")), false, "no stereocentre");
});
