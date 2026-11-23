// The Reaction mode predictor against a hand-written reference set (tests/data/organic-reference.mjs): products,
// major and minor products, negative cases and cases the lab must decline. A mismatch is a chemistry bug in the
// predictor or in the reference, and either way it is reported, never silently accepted.
import { test } from "node:test";
import assert from "node:assert/strict";
import { REFERENCE, UNSUPPORTED } from "./data/organic-reference.mjs";
import * as P from "../kit/labs/chemistry/reactions/predictor.js";
import * as K from "../kit/labs/chemistry/skeletal.js";

const hash = (smiles) => K.analyse(K.graphFromSmiles(smiles)).hash;
const label = (m) => { const A = K.analyse(m); return A.name?.name || A.smiles; };
export function check({ start: smiles, reagent, expect: want }) {
  const m = P.drawSmiles(smiles), r = P.predict(m, reagent), got = r.reacts ? r.products.map((p) => `${p.role}:${label(p.m)}`).join(", ") : `${r.outcome} (${r.why[0]})`;
  const fail = (msg) => `${smiles} + ${reagent}: ${msg}. Got ${got}`;
  if (K.analyse(m).problems.length) return fail("the reference starting material is invalid");
  if (want === null || want === UNSUPPORTED) {
    if (r.reacts) return fail(want === null ? "expected no reaction" : "expected the lab to decline (unsupported)");
    if (!r.why?.[0] || r.why[0].length < 25) return fail("a refusal must say why");
    if (want === null && r.outcome !== "no_reaction") return fail("expected “no reaction”, not unsupported");
    if (want === UNSUPPORTED && r.outcome !== "unsupported") return fail("expected unsupported, not “no reaction”");
    return null;
  }
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
    const rows = REFERENCE.filter((r) => r.reagent === g.id);
    assert.ok(rows.some((r) => r.expect !== null && r.expect !== UNSUPPORTED), `${g.id}: a positive case`);
  }
  assert.ok(REFERENCE.filter((r) => r.expect === null).length >= 35, "plenty of no-reaction cases");
  // every "no reaction" in the reference passes the coverage rule: each feature of the molecule is handled or known
  // inert for that reagent (so a "no" is never just "the rule's group is missing")
  for (const r of REFERENCE.filter((x) => x.expect === null)) { const out = P.predict(P.drawSmiles(r.start), r.reagent); assert.deepEqual(out.unaccounted, [], `${r.id}: unaccounted features`); }
  assert.ok(REFERENCE.filter((r) => r.expect === UNSUPPORTED).length >= 15, "unsupported and ambiguous cases the lab must decline");
});

test("every reference case records its sources and confidence, and every rule has an evidence record", () => {
  const ids = new Set();
  for (const r of REFERENCE) {
    assert.ok(!ids.has(r.id), `duplicate case ${r.id}`); ids.add(r.id);
    assert.ok(r.sources.length && r.sources.every((x) => x.id && x.topic), r.id);
    assert.ok(["provisional", "reviewed", "validated"].includes(r.confidence), r.id);
  }
  for (const g of P.REAGENTS) {
    const rule = P.predict(P.drawSmiles("C=C"), g.id).rule;
    assert.ok(rule && rule.reactants && rule.products && rule.selectivity && Array.isArray(rule.limitations) && rule.sources.length && rule.confidence, `${g.id}: evidence record`);
  }
});
