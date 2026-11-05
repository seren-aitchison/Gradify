import { test } from "node:test";
import assert from "node:assert/strict";
import { genPharmCalc, isRight, KINDS } from "../kit/interactive/pharmcalc.js";

const seeded = (seed) => () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

test("pharmacy calculations: every kind generates a sound problem with a worked method", () => {
  for (const kind of KINDS) for (let s = 1; s <= 40; s++) {
    const c = genPharmCalc(seeded(s), kind);
    assert.ok(c.q.length > 30 && c.method.length > 20 && c.unit, `${kind}: has a question, method and unit`);
    assert.ok(Number.isFinite(c.answer) && c.answer > 0, `${kind}: positive answer (${c.answer})`);
    assert.ok(isRight(c, c.answer) && !isRight(c, c.answer * 1.1 + 1), `${kind}: marks the answer right and a wrong one wrong`);
    assert.ok(c.method.includes(String(c.answer)), `${kind}: the method reaches the answer`);
  }
});

test("pharmacy calculations: the arithmetic is right", () => {
  // recompute each answer from the numbers in the question, independently of the generator
  const nums = (q) => (q.match(/\d[\d,]*(\.\d+)?/g) || []).map((x) => Number(x.replace(/,/g, "")));
  for (let s = 1; s <= 60; s++) {
    const r = seeded(s);
    const p = genPharmCalc(r, "percent"); const [pc, v] = [nums(p.q).at(-1), nums(p.q).at(-2)]; assert.equal(p.answer, Math.round((pc * v) / 100 * 1000) / 1000);
    const d = genPharmCalc(r, "dilution"); const [s1, v2, t2] = nums(d.q); assert.ok(Math.abs(d.answer - (t2 * v2) / s1) < 0.006, d.q);
    const c = genPharmCalc(r, "crcl"); const [age, kg, scr, k] = nums(c.q); assert.ok(Math.abs(c.answer - ((140 - age) * kg * k) / scr) <= 0.5, c.q);
    const m = genPharmCalc(r, "mmol"); const vol = nums(m.q)[0]; assert.ok(Math.abs(m.answer - (vol * 9) / 58.5) <= 0.05, m.q);
  }
  // fixed cases from the method
  assert.equal(genPharmCalc(seeded(7), "supply").answer % 1, 0);
});
