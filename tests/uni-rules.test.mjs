import { test } from "node:test";
import assert from "node:assert/strict";
import { UNI_RULES, ruleById, ruleW3, effectiveMark, threshold, zoneOf, borderlineCheck } from "../kit/data/uni-rules.js";
import { degreeTracker, degreeIntel } from "../assets/study-tools.js";

test("every university rule has a source on that university's own site, a year, a check date and the exact wording", () => {
  assert.ok(UNI_RULES.length >= 5);
  const ids = new Set();
  for (const r of UNI_RULES) {
    assert.ok(!ids.has(r.id), `${r.id}: unique`); ids.add(r.id);
    assert.equal(r.verified, true, `${r.id}: only verified rules are listed`);
    assert.match(r.checked, /^\d{4}-\d{2}-\d{2}$/, `${r.id}: date checked`);
    assert.ok(r.year && r.applies && r.name && r.short, `${r.id}: year, who it applies to and names`);
    for (const k of ["weights", "boundaries", "rounding", "borderline"]) {
      const f = r[k]; if (!f) continue;
      assert.match(f.source?.url || "", /^https:\/\/[\w.-]+\.ac\.uk\//, `${r.id}.${k}: source on a .ac.uk site`);
      assert.ok(f.source.title, `${r.id}.${k}: source title`);
      assert.ok(String(f.quote || "").length > 30, `${r.id}.${k}: the regulation's own words`);
    }
    if (r.weights) {
      const ws = r.weights.options ? r.weights.options.map((o) => o.w3) : [r.weights.w3];
      for (const w of ws) assert.ok(w > 50 && w <= 100, `${r.id}: a final-year weight`);
    } else assert.ok(r.weightsNote?.quote, `${r.id}: says why there's no weighting`);
    if (r.borderline) {
      assert.ok(r.borderline.tests.length && ["all", "any"].includes(r.borderline.combine), `${r.id}: borderline tests`);
      assert.ok(r.borderline.from > r.borderline.to, `${r.id}: a zone under the boundary`);
    }
  }
});

test("each university's weighting is the one its regulations give", () => {
  assert.equal(ruleW3(ruleById("birmingham")), 75);    // 25% year 2, 75% year 3
  assert.equal(ruleW3(ruleById("kcl")), 60);           // 0:2:3
  assert.equal(ruleW3(ruleById("leeds")), 66.67);      // 1:2
  assert.equal(ruleW3(ruleById("bristol"), 0), 60);    // Arts, Law and Social Sciences 0:40:60
  assert.equal(ruleW3(ruleById("bristol"), 1), 75);    // Science and Engineering 0:25:75
  assert.equal(ruleW3(ruleById("nottingham")), null);  // set by each programme
  assert.equal(ruleW3(null), null);
});

test("rounding: Bristol rounds to a whole number, Leeds lifts within 0.5, the others don't round", () => {
  const b = ruleById("bristol"), l = ruleById("leeds"), k = ruleById("kcl");
  assert.equal(effectiveMark(69.5, b), 70); assert.equal(effectiveMark(69.49, b), 69);
  assert.equal(effectiveMark(69.5, l), 70); assert.equal(effectiveMark(69.45, l), 70); assert.equal(effectiveMark(69.44, l), 69.4);
  assert.equal(effectiveMark(59.6, l), 60); assert.equal(effectiveMark(64.3, l), 64.3);
  assert.equal(effectiveMark(69.9, k), 69.9);
  assert.equal(threshold(70, b), 69.5); assert.equal(threshold(70, l), 69.45); assert.equal(threshold(70, k), 70); assert.equal(threshold(70, null), 70);
});

test("borderline zones follow each university's wording", () => {
  assert.deepEqual(zoneOf(68.2, ruleById("kcl")), { next: 70, from: 68, to: 70 });         // within 2% of 70
  assert.equal(zoneOf(67.9, ruleById("kcl")), null);
  assert.equal(zoneOf(69.6, ruleById("birmingham")), null);                                // ≥ 68.0 and < 69.5
  assert.equal(zoneOf(69.4, ruleById("birmingham")).next, 70);
  assert.equal(zoneOf(67.6, ruleById("bristol")).next, 70);                                // rounds to 68: 68-69
  assert.equal(zoneOf(67.4, ruleById("bristol")), null);
  assert.equal(zoneOf(69.5, ruleById("bristol")), null);                                   // rounds to 70: a First
  assert.equal(zoneOf(68.9, ruleById("nottingham")), null);                                // only 69 is borderline
  assert.equal(zoneOf(59.2, ruleById("nottingham")).next, 60);
  assert.equal(zoneOf(39.5, ruleById("nottingham")), null);                                // no III/Fail borderline
  assert.equal(zoneOf(39.4, ruleById("birmingham")).next, 40);
  assert.equal(zoneOf(69.4, ruleById("leeds")), null);                                     // no zone: the lift only
});

test("the borderline check counts credits and shares from the module marks", () => {
  const rows = [{ mark: "72", credits: "40", year: "3" }, { mark: "71", credits: "20", year: "3" }, { mark: "64", credits: "60", year: "3" }, { mark: "66", credits: "120", year: "2" }];
  const kcl = borderlineCheck(rows, 68.5, 60, ruleById("kcl"));
  assert.equal(kcl.met, true); assert.equal(kcl.results[0].value, 60);                     // 60 credits, two modules
  assert.equal(borderlineCheck([{ mark: "75", credits: "60", year: "3" }, { mark: "60", credits: "60", year: "3" }], 68.5, 60, ruleById("kcl")).met, false); // one module only
  const notts = borderlineCheck(rows, 69.2, 60, ruleById("nottingham"));
  assert.equal(notts.met, false); assert.equal(notts.results[0].value, 0.5); assert.equal(notts.results[1].value, 0.25);
  assert.equal(borderlineCheck([{ mark: "70", credits: "80", year: "3" }, { mark: "60", credits: "40", year: "3" }], 69.2, 60, ruleById("nottingham")).met, true);
  const bris = borderlineCheck(rows, 68.5, 60, ruleById("bristol"));
  assert.equal(bris.met, false); assert.ok(Math.abs(bris.results[0].value - 0.3) < 1e-9);  // 60 × .6 of 120 × .6 + 120 × .4
  const bham = borderlineCheck(rows, 68.5, 75, ruleById("birmingham"));
  assert.equal(bham.met, false); assert.deepEqual(bham.results.map((r) => r.met), [false, true, true]);
  assert.match(bham.unchecked, /dissertation/);
  assert.equal(borderlineCheck(rows, 65, 60, ruleById("kcl")), null);                      // not in a zone
});

test("the tracker uses the chosen university's rules", () => {
  const rows = [{ mark: "69", credits: "120", year: "2" }, { mark: "70", credits: "60", year: "3" }, { mark: "69.2", credits: "60", year: "3" }];
  // Leeds 1:2: (69 + 2 × 69.6) / 3 = 69.4, which isn't lifted; nudge it up
  const up = [{ mark: "69.5", credits: "120", year: "2" }, ...rows.slice(1)];
  const leeds = degreeIntel(up, 66.67, new Date(2026, 10, 24), 120, ruleById("leeds"));
  assert.ok(leeds.t.average < 70 && leeds.t.average >= 69.45);
  assert.equal(leeds.cls.short, "First");
  assert.ok(leeds.insights.some((i) => i.kind === "chance" && /Leeds lifts averages/.test(i.text)));
  assert.equal(degreeIntel(up, 66.67, new Date(2026, 10, 24)).cls.short, "2:1", "without a rule: no lift");
  const kcl = degreeIntel([{ mark: "70", credits: "120", year: "2" }, { mark: "72", credits: "40", year: "3" }, { mark: "71", credits: "20", year: "3" }, { mark: "64", credits: "60", year: "3" }], 60, new Date(2026, 10, 24), 120, ruleById("kcl"));
  assert.equal(kcl.cls.short, "2:1");
  assert.equal(kcl.border.met, true);
  assert.ok(kcl.insights.some((i) => i.kind === "border" && /King's borderline zone for a First/.test(i.text) && /you meet it/.test(i.text)));
  // what each class needs moves with rounding: Bristol needs 69.5 for a First, not 70
  const half = [{ mark: "70", credits: "120", year: "2" }];
  assert.equal(degreeTracker(half, 60, 120, ruleById("bristol")).goals[0].need, (69.5 - 0.4 * 70) / 0.6);
  assert.equal(degreeTracker(half, 60).goals[0].need, 70);
});
