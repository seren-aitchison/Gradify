// Interactives: NEWS2 scoring, generated calculations, precedent rules and scenario structure.
import { test } from "node:test";
import assert from "node:assert/strict";
import { news2, scoreParams } from "../kit/interactive/news2.js";
import { genCalc, genObs, precedentEffect, COURTS } from "../kit/interactive/trainers.js";
import { validateScenario } from "../kit/interactive/scenario.js";
import { scenario as det } from "../kit/courses/nursing/interactives/deteriorating.js";
import { scenario as okoye } from "../kit/courses/law/interactives/offer-acceptance.js";
import law from "../kit/courses/law/course.js";
import nursing from "../kit/courses/nursing/course.js";

test("NEWS2 parameter bands match the RCP 2017 chart at every boundary", () => {
  const p = (o) => scoreParams({ rr: 16, spo2: 97, sbp: 120, hr: 70, avpu: "A", temp: 37, ...o });
  assert.deepEqual([8, 9, 11, 12, 20, 21, 24, 25].map((rr) => p({ rr }).rr), [3, 1, 1, 0, 0, 2, 2, 3]);
  assert.deepEqual([91, 92, 93, 94, 95, 96].map((spo2) => p({ spo2 }).spo2), [3, 2, 2, 1, 1, 0]);
  assert.deepEqual([90, 91, 100, 101, 110, 111, 219, 220].map((sbp) => p({ sbp }).sbp), [3, 2, 2, 1, 1, 0, 0, 3]);
  assert.deepEqual([40, 41, 50, 51, 90, 91, 110, 111, 130, 131].map((hr) => p({ hr }).hr), [3, 1, 1, 0, 0, 1, 1, 2, 2, 3]);
  assert.deepEqual([35.0, 35.1, 36.0, 36.1, 38.0, 38.1, 39.0, 39.1].map((temp) => p({ temp }).temp), [3, 1, 1, 0, 0, 1, 1, 2]);
  assert.equal(p({ avpu: "C" }).avpu, 3); assert.equal(p({ oxygen: true }).air, 2);
  // scale 2: 88–92 scores 0, and on oxygen 93–94 = 1, 95–96 = 2, 97+ = 3
  assert.deepEqual([83, 85, 87, 90, 95].map((spo2) => p({ spo2, scale: 2 }).spo2), [3, 2, 1, 0, 0]);
  assert.deepEqual([93, 95, 97].map((spo2) => p({ spo2, scale: 2, oxygen: true }).spo2), [1, 2, 3]);
});

test("NEWS2 responses follow the totals and the single-parameter red score", () => {
  assert.equal(news2({ rr: 16, spo2: 97, sbp: 120, hr: 70, avpu: "A", temp: 37 }).response.level, "none");
  assert.equal(news2({ rr: 26, spo2: 97, sbp: 120, hr: 70, avpu: "A", temp: 37 }).response.level, "low-medium");
  assert.equal(news2({ rr: 22, spo2: 94, sbp: 106, hr: 108, avpu: "A", temp: 38.3 }).total, 6, "the scenario's first set scores 6");
  assert.equal(news2({ rr: 22, spo2: 94, sbp: 106, hr: 108, avpu: "A", temp: 38.3 }).response.level, "medium");
  assert.equal(news2({ rr: 22, spo2: 96, oxygen: true, sbp: 106, hr: 108, avpu: "C", temp: 38.3 }).response.level, "high");
});

test("generated calculations are internally consistent and never name a real medicine", () => {
  let s = 42; const r = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let i = 0; i < 300; i++) {
    const c = genCalc(r);
    assert.match(c.q, /Medicine [A-E]|Convert|infusion of|mL is to run/, "only invented medicines, or none");
    assert.ok(Number.isFinite(c.answer) && c.answer > 0, c.q);
    assert.ok(c.method.includes(String(c.answer)), `method shows the answer: ${c.q}`);
  }
  for (let i = 0; i < 50; i++) { const o = genObs(r); assert.ok(o.rr > 0 && o.spo2 <= 100 && o.temp > 30); }
});

test("precedent rules: higher courts bind lower, outside courts never bind", () => {
  assert.equal(precedentEffect("uksc", "ca").effect, "binding");
  assert.equal(precedentEffect("ca", "ca").effect, "binding");
  assert.equal(precedentEffect("hc", "hc").effect, "persuasive");
  assert.equal(precedentEffect("county", "hc").effect, "persuasive");
  assert.equal(precedentEffect("jcpc", "county").effect, "persuasive");
  assert.equal(precedentEffect("ecthr", "uksc").effect, "take into account");
  for (const a of COURTS) for (const b of COURTS.filter((c) => !c.outside)) assert.ok(precedentEffect(a.id, b.id).why.length > 30);
});

test("both scenarios are well formed: every step reachable, an end reachable, every choice explained", () => {
  assert.deepEqual(validateScenario(det), []);
  assert.deepEqual(validateScenario(okoye), []);
  assert.ok(det.banner.includes("doesn't assess or authorise"), "clinical simulation says what it isn't");
});

test("every registered interactive loads and exposes mount()", async () => {
  for (const c of [law, nursing]) for (const x of c.interactives) {
    const m = await x.load(); assert.equal(typeof m.mount, "function", x.id);
    for (const n of x.schools || []) assert.ok(c.units.some((u) => u.n === n), `${x.id} school ${n}`);
  }
});
