// The Reaction mode predictor against a hand-written reference set (tests/data/organic-reference.mjs): products,
// major and minor products, negative cases and cases the lab must decline. A mismatch is a chemistry bug in the
// predictor or in the reference, and either way it is reported, never silently accepted.
import { test } from "node:test";
import assert from "node:assert/strict";
import { REFERENCE } from "./data/organic-reference.mjs";
import * as P from "../kit/labs/chemistry/reactions/predictor.js";
import * as K from "../kit/labs/chemistry/skeletal.js";

const hash = (smiles) => K.analyse(K.graphFromSmiles(smiles)).hash;
const label = (m) => { const A = K.analyse(m); return A.name?.name || A.smiles; };
export function check([smiles, reagent, want, note]) {
  const m = P.drawSmiles(smiles), r = P.predict(m, reagent), got = r.reacts ? r.products.map((p) => `${p.role}:${label(p.m)}`).join(", ") : `none (${r.why[0]})`;
  const fail = (msg) => `${smiles} + ${reagent}: ${msg}. Got ${got}`;
  if (K.analyse(m).problems.length) return fail("the reference starting material is invalid");
  if (want === null) { if (r.reacts) return fail("expected no reaction or a refusal"); if (!r.why?.[0] || r.why[0].length < 25) return fail("a refusal must say why"); return null; }
  if (!r.reacts) return fail("expected a reaction");
  const main = new Set(r.products.filter((p) => p.role !== "minor").map((p) => K.analyse(p.m).hash)), minor = new Set(r.products.filter((p) => p.role === "minor").map((p) => K.analyse(p.m).hash)), all = new Set([...main, ...minor]);
  const same = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));
  if (typeof want === "string") return main.has(hash(want)) ? null : fail(`expected ${want} as a main product`);
  if (want.products) return same(all, new Set(want.products.map(hash))) ? null : fail(`expected exactly ${want.products.join(" + ")}`);
  if (!same(main, new Set(want.major.map(hash)))) return fail(`expected major ${want.major.join(", ")}`);
  if (!same(minor, new Set(want.minor.map(hash)))) return fail(`expected minor ${want.minor.join(", ") || "none"}`);
  return null;
}

test(`reference set: ${REFERENCE.length} reactions, including negative and declined cases`, () => {
  assert.ok(REFERENCE.length >= 250, "a substantial reference set");
  const fails = REFERENCE.map(check).filter(Boolean);
  assert.deepEqual(fails, []);
});

test("reference set coverage: every reagent has positive and negative cases", () => {
  for (const g of P.REAGENTS) {
    const rows = REFERENCE.filter((r) => r[1] === g.id);
    assert.ok(rows.some((r) => r[2] !== null), `${g.id}: a positive case`);
  }
  assert.ok(REFERENCE.filter((r) => r[2] === null).length >= 60, "plenty of negative cases");
});
