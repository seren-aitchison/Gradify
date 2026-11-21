// The Visual Learning Engine inventory (scripts/visual/inventory.mjs) runs, its totals add up at every level, and
// every placed diagram is in the manifest. Freshness of the committed files is `node scripts/visual/inventory.mjs --check`
// (not tested here, so builders placing diagrams in parallel are not blocked by a stale inventory).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { generate } from "../scripts/visual/inventory.mjs";

const { inv } = await generate();
const manifest = JSON.parse(readFileSync(new URL("../kit/diagrams/manifest.json", import.meta.url), "utf8"));

function consistent(t, where) {
  assert.equal(t.assessed, t.plannedVisual + t.excluded, `${where}: assessed = visual planned + excluded`);
  assert.equal(t.written, t.assessed + t.notAssessed, `${where}: written = assessed + not yet assessed`);
  assert.ok(t.written <= t.lessons, `${where}: written ≤ lessons`);
  assert.ok(t.withBoth <= Math.min(t.withDiagram, t.withLab), `${where}: both ≤ diagram, lab`);
  assert.equal(t.withAny, t.withDiagram + t.withLab - t.withBoth, `${where}: either = diagram + lab − both`);
  assert.ok(t.plannedVisual <= t.plannedDiagram + t.plannedLab, `${where}: planned visual ≤ diagram + lab`);
}

test("the inventory covers every site and course", () => {
  assert.ok(inv.totals.sites >= 30 && inv.totals.courses >= 30);
  assert.ok(inv.courses.find((c) => c.slug === "chemistry").servedBy.includes("SciGradify"));
  assert.ok(inv.totals.written > 9000);
});

test("totals are internally consistent at every level", () => {
  consistent(inv.totals, "overall");
  for (const c of inv.courses) {
    consistent(c.totals, c.slug);
    for (const u of c.units) consistent(u.totals, `${c.slug} ${u.id}`);
    const lessons = c.units.flatMap((u) => u.lessons);
    assert.equal(lessons.filter((l) => l.written).length, c.totals.written, c.slug);
    assert.equal(lessons.filter((l) => l.written && l.plan.verdict === "not yet assessed").length, c.totals.notAssessed, c.slug);
    if (!c.plan) assert.equal(c.totals.assessed, 0, `${c.slug} has no plan but assessed lessons`);
  }
  const sum = (k) => inv.courses.reduce((a, c) => a + c.totals[k], 0);
  for (const k of ["written", "assessed", "notAssessed", "withDiagram", "withLab", "excluded"]) assert.equal(inv.totals[k], sum(k), k);
  const D = inv.diagrams;
  assert.ok(D.placements >= D.uniquePlaced, "placements ≥ unique ids");
  assert.equal(D.placements, inv.totals.placements);
  assert.equal(Object.values(D.byStatus).reduce((a, n) => a + n, 0), D.manifest);
});

test("every placed diagram id exists in the manifest", () => {
  for (const c of inv.courses) for (const u of c.units) for (const l of u.lessons) for (const d of l.diagrams || [])
    assert.ok(manifest[d.id], `${c.slug} ${l.id}: D: ${d.id} is not in kit/diagrams/manifest.json`);
});

