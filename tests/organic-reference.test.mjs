// The Reaction mode predictor against a hand-written reference set (tests/data/organic-reference.mjs): products,
// major and minor products, negative cases and cases the lab must decline. A mismatch is a chemistry bug in the
// predictor or in the reference, and either way it is reported, never silently accepted.
import { test } from "node:test";
import assert from "node:assert/strict";
import { REFERENCE, DECLINE } from "./data/organic-reference.mjs";
import * as P from "../kit/labs/chemistry/reactions/predictor.js";
import * as K from "../kit/labs/chemistry/skeletal.js";

const hash = (smiles) => K.analyse(K.graphFromSmiles(smiles)).hash;
const label = (m) => { const A = K.analyse(m); return A.name?.name || A.smiles; };
export function check({ start: smiles, reagent, expect: want }) {
  const m = P.drawSmiles(smiles), r = P.predict(m, reagent), got = r.reacts ? r.products.map((p) => `${p.role}:${label(p.m)}`).join(", ") : `${r.status} (${r.why[0]})`;
  const fail = (msg) => `${smiles} + ${reagent}: ${msg}. Got ${got}`;
  if (K.analyse(m).problems.length) return fail("the reference starting material is invalid");
  if (want === null || want === DECLINE) {
    if (r.reacts) return fail(want === null ? "expected no reaction" : "expected the lab to decline");
    if (!r.why?.[0] || r.why[0].length < 25) return fail("a refusal must say why");
    if (want === null && r.status !== "no-reaction") return fail("expected “no reaction”, not a decline");
    if (want === DECLINE && r.status !== "declined") return fail("expected a decline (outside the rules), not “no reaction”");
    return null;
  }
  if (!r.reacts) return fail("expected a reaction");
  const main = new Set(r.products.filter((p) => p.role !== "minor").map((p) => K.analyse(p.m).hash)), minor = new Set(r.products.filter((p) => p.role === "minor").map((p) => K.analyse(p.m).hash)), all = new Set([...main, ...minor]);
  const same = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));
  if (typeof want === "string") return main.has(hash(want)) ? null : fail(`expected ${want} as a main product`);
  if (want.byproducts && !want.byproducts.every((b) => r.byproducts.includes(b))) return fail(`expected by-products ${want.byproducts.join(" + ")}`);
  // exact products are compared with their counts: two molecules of ethanoic acid are not one
  if (want.products) { const count = (hs) => hs.reduce((mp, h) => mp.set(h, (mp.get(h) || 0) + 1), new Map()), a = count(r.products.map((p) => K.analyse(p.m).hash)), b = count(want.products.map(hash)); return a.size === b.size && [...a].every(([h, n]) => b.get(h) === n) ? null : fail(`expected exactly ${want.products.join(" + ") || "no organic product"}`); }
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
    assert.ok(rows.some((r) => r.expect !== null && r.expect !== DECLINE), `${g.id}: a positive case`);
  }
  assert.ok(REFERENCE.filter((r) => r.expect === null).length >= 60, "plenty of no-reaction cases");
  assert.ok(REFERENCE.filter((r) => r.expect === DECLINE).length >= 15, "unsupported and ambiguous cases the lab must decline");
});

test("every reference case records its sources and confidence, and every rule has an evidence record", () => {
  const ids = new Set();
  for (const r of REFERENCE) {
    assert.ok(!ids.has(r.id), `duplicate case ${r.id}`); ids.add(r.id);
    assert.ok(r.sources.length && r.sources.every((x) => x.id && x.topic), r.id);
    // "disputed" is what a reviewer's disagree verdict produces (data/organic-reference.mjs, docs/organic-review): the
    // case stays in the set, and still has to match the predictor, until it is fixed
    assert.ok(["provisional", "reviewed", "validated", "disputed"].includes(r.confidence), r.id);
  }
  for (const g of P.REAGENTS) {
    const rule = P.predict(P.drawSmiles("C=C"), g.id).rule;
    assert.ok(rule && rule.reactants && rule.products && rule.selectivity && Array.isArray(rule.limitations) && rule.sources.length && rule.confidence, `${g.id}: evidence record`);
  }
});

test("review import: cumulative, blank rows keep earlier verdicts, and an invalid row means nothing is written", async () => {
  const { mergeReviews } = await import("../scripts/organic-review.mjs");
  const known = new Set(REFERENCE.map((r) => r.id)), [a, b] = [...known];
  const head = "id,start,reagent,expected,verdict,correction,comment,reviewer,date";
  const csv = (rows) => [head, ...rows.map(([id, v, note = ""]) => `${id},x,y,z,${v},,${note},Dr R,2026-12-01`)].join("\n");
  const first = mergeReviews({}, csv([[a, "disagree", "wrong major product"]]), known);
  assert.deepEqual(first.bad, []); assert.equal(first.reviews[a].verdict, "disagree");
  // a later, partial return reviewing only b keeps a's unresolved disagreement
  const second = mergeReviews(first.reviews, csv([[a, ""], [b, "agree"]]), known);
  assert.equal(second.reviews[a].verdict, "disagree"); assert.equal(second.reviews[a].note, "wrong major product"); assert.equal(second.reviews[b].verdict, "agree");
  assert.ok(!("" in second.reviews));
  // removing a verdict is explicit
  assert.ok(!(a in mergeReviews(second.reviews, csv([[a, "clear"]]), known).reviews));
  // a mistyped verdict or an unknown case is reported, so the caller writes nothing
  assert.equal(mergeReviews(second.reviews, csv([[a, "disagreee"]]), known).bad.length, 1);
  assert.equal(mergeReviews(second.reviews, csv([["no-such-case", "agree"]]), known).bad.length, 1);
  // a disputed case (what "disagree" produces) still passes the reference check when the predictor matches it
  const row = { ...REFERENCE[0], confidence: "disputed" }; assert.equal(check(row), null);
});

test("review pack: exact products count repeats, a truncated CSV is refused, old sheets can't restore verdicts, and edited cases need review again", async () => {
  const { mergeReviews, referenceRows } = await import("../scripts/organic-review.mjs");
  const { expectKey, confidenceOf: confidenceOfFn } = await import("./data/organic-reference.mjs");
  // one ethanoic acid where two form is a mismatch
  assert.ok(check({ start: "CC(=O)OC(C)=O", reagent: "water", expect: { products: ["CC(=O)O"] } }));
  assert.equal(check({ start: "CC(=O)OC(C)=O", reagent: "water", expect: { products: ["CC(=O)O", "CC(=O)O"] } }), null);
  const known = new Map(REFERENCE.map((r) => [r.id, expectKey(r.expect)])), [a] = known.keys();
  const head = "id,start,reagent,expected,verdict,correction,comment,reviewer,date";
  assert.throws(() => mergeReviews({}, `${head}\n${a},x,y,z,agree,,"cut off here`, known), /quoted field/);
  // a verdict records the outcome on the reviewer's sheet; editing that outcome later makes the agreement stale
  const q = (x) => `"${String(x).replace(/"/g, '""')}"`, kh = `${head},expectation key (do not edit)`;
  const { reviews } = mergeReviews({}, `${kh}\n${a},x,y,z,agree,,,Dr R,2026-12-01,${q(known.get(a))}`, known);
  assert.equal(reviews[a].expect, known.get(a));
  // an agreement returned on a sheet exported before the case changed is bound to the old outcome: provisional, and reported
  const old = mergeReviews({}, `${kh}\n${a},x,y,z,agree,,,Dr R,2026-12-01,${q(expectKey({ products: ["CCO"] }))}`, known);
  assert.deepEqual(old.stale, [a]); assert.equal(confidenceOfFn(old.reviews[a], known.get(a)).confidence, "provisional");
  // a sheet from before the key column records no outcome, so its agreement can't count as reviewed
  assert.equal(confidenceOfFn(mergeReviews({}, `${head}\n${a},x,y,z,agree,,,Dr R,2026-12-01`, known).reviews[a], known.get(a)).confidence, "provisional");
  const confidenceOf = confidenceOfFn;
  assert.equal(confidenceOf(reviews[a], known.get(a)).confidence, "reviewed", "agreed to this outcome");
  assert.deepEqual(confidenceOf(reviews[a], expectKey({ products: ["CCO"] })), { stale: true, confidence: "provisional" }, "the outcome was edited after the agreement");
  assert.equal(confidenceOf({ ...reviews[a], verdict: "disagree" }, expectKey({ products: ["CCO"] })).confidence, "disputed", "a disagreement stays disputed");
  // the exported sheet leaves the verdict columns empty and shows the recorded review read-only
  const [hdr, ...rows] = referenceRows([{ ...REFERENCE[0], review: { verdict: "disagree", reviewer: "Dr R", note: "wrong product" }, stale: false }]);
  const at = (n) => hdr.findIndex((h) => h.startsWith(n));
  assert.equal(rows[0][at("expectation key")], expectKey(REFERENCE[0].expect), "the sheet carries the outcome shown");
  // round trip through the real export: a reviewer fills in "agree" on an unchanged sheet, and it imports as reviewed
  const { csv } = await import("../scripts/organic-review.mjs");
  const cases = REFERENCE.filter((r) => r.expect && typeof r.expect === "object").slice(0, 3), sheet = referenceRows(cases);
  sheet.slice(1).forEach((row) => { row[at("verdict")] = "agree"; row[at("reviewer")] = "Dr R"; });
  const back = mergeReviews({}, csv(sheet), known);
  assert.deepEqual(back.bad, []); assert.deepEqual(back.stale, []);
  for (const c of cases) assert.equal(confidenceOfFn(back.reviews[c.id], known.get(c.id)).confidence, "reviewed", c.id);
  assert.equal(rows[0][at("verdict")], ""); assert.equal(rows[0][at("comment")], ""); assert.match(rows[0][at("recorded review")], /disagree by Dr R: wrong product/);
});
