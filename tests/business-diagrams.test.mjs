// BusinessGradify diagrams: the business mathematics, each renderer's recomputing checks (and that a wrong picture
// fails them), and the built diagrams against the lessons that place them.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { npv, payback, arr, breakEven, elasticity, criticalPath, evalExpr, band, pv } from "../kit/diagrams/business-core.js";
import { render } from "../kit/diagrams/renderers.js";
import "../kit/diagrams/business-renderers.js";

const ROOT = new URL("../", import.meta.url);
const spec = (id) => JSON.parse(readFileSync(new URL(`kit/diagrams/specs/${id}.json`, ROOT), "utf8"));
const failing = (s, lessonText = "") => render(s, { lessonText }).checks.filter((c) => !c.ok).map((c) => c.name);
const clone = (o) => JSON.parse(JSON.stringify(o));

test("investment appraisal: the lessons' worked numbers", () => {
  assert.ok(Math.abs(npv(0.1, [-100, 30, 40, 50, 20]) - 11.5) < 0.1);   // £11,520 with rounded discount factors
  assert.ok(Math.abs(pv(30, 0.1, 1) - 27.27) < 0.01);
  assert.equal(payback([-100, 30, 40, 50, 20]), 2.6);
  assert.equal(payback([-100, 10]), null);
  assert.equal(arr([-100, 30, 40, 50, 20]), 0.2);
  assert.equal(breakEven(60000, 50, 30), 3000);
  assert.equal(elasticity(100, 75, 100, 110), -2.5);
});

test("critical path: A–C–D is 11 weeks and B has 2 weeks of float", () => {
  const cp = criticalPath([{ id: "A", dur: 3 }, { id: "B", dur: 4, after: ["A"] }, { id: "C", dur: 6, after: ["A"] }, { id: "D", dur: 2, after: ["B", "C"] }]);
  assert.equal(cp.duration, 11);
  assert.deepEqual(cp.critical, ["A", "C", "D"]);
  assert.equal(cp.float.B, 2);
  assert.throws(() => criticalPath([{ id: "A", dur: 1, after: ["B"] }, { id: "B", dur: 1, after: ["A"] }]), /cycle/);
});

test("the relation evaluator accepts only named values, numbers and arithmetic", () => {
  assert.equal(evalExpr("a + b * 2", { a: 1, b: 3 }), 7);
  assert.equal(evalExpr("s ^ l", { s: 4, l: 3 }), 64);
  assert.equal(evalExpr("-a + 5", { a: 2 }), 3);
  assert.throws(() => evalExpr("a + c", { a: 1 }), /unknown name/);
  assert.throws(() => evalExpr("process.exit()", {}), /unsupported|unknown/);
  assert.equal(band(12, [10]), 1);
});

test("a wrong picture fails: subtotals, relations, cells, equilibria, critical paths", () => {
  const inc = clone(spec("bus-income-statement"));
  assert.deepEqual(failing(inc), []);
  inc.items.find((i) => i.id === "gross_profit").v = 210;
  assert.ok(failing(inc).some((n) => /subtotal/.test(n)));

  const cash = clone(spec("bus-cash-forecast"));
  cash.categories[2].values[2].v = 2;                       // an overdraft shown as a surplus
  assert.ok(failing(cash).some((n) => /March closing/.test(n)));

  const ans = clone(spec("bus-ansoff"));
  ans.items[3].cell = [0, 0];                               // diversification drawn as market penetration
  assert.ok(failing(ans).some((n) => /recomputed cell/.test(n)));

  const game = clone(spec("bus-prisoners-dilemma"));
  assert.deepEqual(failing(game), []);
  game.payoffs[1][1] = [11, 11];                            // now pricing low is no longer an equilibrium trap
  assert.ok(failing(game).length > 0);

  const net = clone(spec("bus-critical-path"));
  net.claims.critical = ["A", "B", "D"];
  assert.ok(failing(net).some((n) => /critical path/.test(n)));
  const sp = clone(spec("bus-span-of-control"));
  sp.categories[0].values[0].v = 2;                         // span 4 over two levels does not reach 64
  assert.ok(failing(sp).some((n) => /reaches 64/.test(n)));
});

test("terms on a diagram must be in the lesson it sits in", () => {
  const s = clone(spec("bus-vrio"));
  assert.deepEqual(failing(s, "valuable rare inimitable organised competitive disadvantage competitive parity temporary advantage sustained competitive advantage"), []);
  assert.ok(failing(s, "a lesson about something else").some((n) => /in the lesson/.test(n)));
});

test("every business diagram builds, is validated and is placed in its lesson", () => {
  const manifest = JSON.parse(readFileSync(new URL("kit/diagrams/manifest.json", ROOT), "utf8"));
  const ids = readdirSync(new URL("kit/diagrams/specs/", ROOT)).filter((f) => f.startsWith("bus-")).map((f) => f.replace(".json", ""));
  assert.ok(ids.length >= 60, `${ids.length} business specs`);
  for (const id of ids) {
    const m = manifest[id];
    assert.ok(m && m.status !== "failed", `${id} is in the manifest and passes`);
    assert.ok(m.checks.length >= 6, `${id} has subject checks`);
    for (const k of ["wide", "narrow"]) {
      const svg = readFileSync(new URL(`kit/diagrams/svg/${id}.${k}.svg`, ROOT), "utf8");
      assert.match(svg, /viewBox/);
      assert.ok(!/©|Property of Gradify/.test(svg), `${id}: no ownership mark in the svg`);
    }
  }
});

test("the business plan accounts for every diagram and every plan row resolves", async () => {
  const { PLAN } = await import("../kit/diagrams/plans/business.mjs");
  const specs = readdirSync(new URL("kit/diagrams/specs/", ROOT)).filter((f) => f.startsWith("bus-")).map((f) => f.replace(".json", ""));
  const planned = new Set(PLAN.filter((r) => r[1] && r[1] !== "lab").map((r) => r[2]));
  for (const id of specs) assert.ok(planned.has(id), `${id} is in the plan`);
  for (const id of planned) assert.ok(specs.includes(id), `${id} planned has a spec`);
  assert.ok(PLAN.every((r) => /^u\d\d-\d\d$/.test(r[0])));
});
