// The chemistry the diagram checks rely on (kit/diagrams/chem-core.js), against answers known independently.
import test from "node:test";
import assert from "node:assert/strict";
import { parseFormula, balanced, formulaMass, configuration, readConfig, sameConfig, position, netOf, sameNet, shells, Z } from "../kit/diagrams/chem-core.js";

test("formulae: brackets, hydrates, charges and Unicode", () => {
  assert.deepEqual(parseFormula("Ca(OH)2"), { atoms: { Ca: 1, O: 2, H: 2 }, charge: 0 });
  assert.deepEqual(parseFormula("CuSO4·5H2O").atoms, { Cu: 1, S: 1, O: 9, H: 10 });
  assert.deepEqual(parseFormula("SO₄²⁻"), { atoms: { S: 1, O: 4 }, charge: -2 });
  assert.deepEqual(parseFormula("Fe^3+"), { atoms: { Fe: 1 }, charge: 3 });
  assert.deepEqual(parseFormula("NH4+"), { atoms: { N: 1, H: 4 }, charge: 1 });
  assert.equal(parseFormula("e⁻").charge, -1);
  assert.equal(Math.round(formulaMass("H2SO4") * 100) / 100, 98.07);
});
test("equations: balanced, unbalanced and half-equations", () => {
  assert.ok(balanced("CH4 + 2O2 → CO2 + 2H2O").ok);
  assert.ok(!balanced("H2 + O2 → H2O").ok);
  assert.ok(balanced("Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O").ok);
  assert.ok(!balanced("Fe³⁺ + 2e⁻ → Fe²⁺").ok);
  assert.ok(balanced("Na + ½Cl2 → NaCl").ok);
  assert.ok(balanced("C3H8(g) + 5O2(g) → 3CO2(g) + 4H2O(l)").ok);
});
test("net equation of a catalytic cycle cancels the catalyst", () => {
  const n = netOf(["Cl + O3 → ClO + O2", "ClO + O → Cl + O2"]);
  assert.ok(sameNet(n, { left: { O3: 1, O: 1 }, right: { O2: 2 } }));
});
test("electron configurations, exceptions and ions", () => {
  assert.ok(sameConfig(configuration(26), readConfig("[Ar] 3d6 4s2")));
  assert.ok(sameConfig(configuration(24), readConfig("[Ar] 3d5 4s1")));
  assert.ok(sameConfig(configuration(29), readConfig("1s2 2s2 2p6 3s2 3p6 3d10 4s1")));
  assert.ok(sameConfig(configuration(26, 2), readConfig("[Ar] 3d6")));
  assert.ok(sameConfig(configuration(26, 3), readConfig("[Ar] 3d5")));
  assert.ok(sameConfig(configuration(17, -1), readConfig("[Ne] 3s2 3p6")));
  assert.ok(sameConfig(configuration(11, 1), readConfig("1s2 2s2 2p6")));
  assert.deepEqual(shells(configuration(20)), [2, 8, 8, 2]);
});
test("periodic table positions", () => {
  assert.deepEqual(position(Z.Na), { period: 3, group: 1, block: "s" });
  assert.deepEqual(position(Z.Cl), { period: 3, group: 17, block: "p" });
  assert.deepEqual(position(Z.Fe), { period: 4, group: 8, block: "d" });
  assert.equal(position(Z.Ce).block, "f");
  assert.deepEqual(position(Z.Hf), { period: 6, group: 4, block: "d" });
  assert.deepEqual(position(Z.Rn), { period: 6, group: 18, block: "p" });
  assert.deepEqual(position(Z.La), { period: 6, group: 3, block: "d" });
  assert.equal(position(Z.Lu).block, "f");
});
