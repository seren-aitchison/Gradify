// The physics diagram checks (kit/diagrams/phys-renderers*.js): every sample spec passes, and breaking the physics
// in it makes the check fail, so a wrong diagram cannot be published.
import test from "node:test";
import assert from "node:assert/strict";
import { render } from "../kit/diagrams/renderers.js";
import { vectorSum, motionAt, nodesOf, extremaOfStrain, lsq, worstFit, sankeyTotals } from "../kit/diagrams/phys-renderers.js";
import { fieldAt, findNull, photon, snell, chainCheck, regionOf } from "../kit/diagrams/phys-renderers-2.js";
import { SAMPLES } from "./fixtures/phys-samples.mjs";

const clone = (o) => JSON.parse(JSON.stringify(o));
const failing = (spec) => render(spec).checks.filter((c) => !c.ok).map((c) => c.name);
const fails = (spec, re) => { const f = failing(spec); assert.ok(f.some((n) => re.test(n)), `expected a failing check matching ${re}, got: ${f.join(" | ") || "none"}`); };

test("every sample spec renders both layouts and passes its checks", () => {
  for (const [k, s] of Object.entries(SAMPLES)) {
    const o = render(s);
    assert.match(o.wide, /^<svg[^>]+viewBox="0 0 [\d.]+ [\d.]+"/, k);
    assert.match(o.narrow, /^<svg/, k);
    assert.ok(Number(/viewBox="0 0 ([\d.]+)/.exec(o.wide)[1]) <= 960, `${k}: wide layout at most 960 wide`);
    assert.ok(Number(/viewBox="0 0 ([\d.]+)/.exec(o.narrow)[1]) <= 400, `${k}: narrow layout at most 400 wide`);
    assert.ok(o.checks.length > 0, k);
    assert.deepEqual(o.checks.filter((c) => !c.ok).map((c) => `${c.name}: ${c.detail}`), [], k);
  }
});

test("vectors: components and resultants are recomputed", () => {
  const r = vectorSum([{ mag: 4, angle: 90 }, { mag: 3, angle: 0 }]);
  assert.ok(Math.abs(r.mag - 5) < 1e-9 && Math.abs(r.angle - 53.13) < 0.01);
  const s = clone(SAMPLES.vectors); s.resultant.mag = 7; fails(s, /resultant|v = 7/);
  const t = clone(SAMPLES.vectors); t.resultant.angle = 36.87; fails(t, /v = 5 at 36.9/);
  const c = clone(SAMPLES.vectors); c.vectors[0].comps = [4, 0]; fails(c, /components of v_\{boat\}/);
  const b = clone(SAMPLES.body); delete b.vectors[1].source; fails(b, /stated source/);
  const e = clone(SAMPLES.body); e.resultant = { label: "net force", mag: 0 }; fails(e, /balance/);
});

test("motion: values, areas and distance come from the kinematics", () => {
  const m = SAMPLES.motion;
  assert.equal(motionAt(m, 4).v, 8);
  assert.equal(motionAt(m, 10).x, 64);
  const s = clone(m); s.claims[1].value = 80; fails(s, /displacement/);
  const d = clone(m); d.segments[2].a = -6; d.claims = [{ type: "distance", from: 0, to: 12, value: 72 }]; fails(d, /distance/);
  const n = clone(m); n.claims = []; fails(n, /at least one value/);
});

test("waves: standing-wave nodes, λ and f from L, n and the ends; interference; compressions", () => {
  assert.deepEqual(nodesOf(1.2, 2, "fixed-fixed").nodes, [0, 0.6, 1.2]);
  assert.deepEqual(nodesOf(1, 2, "open-open").nodes, [0.25, 0.75]);
  assert.equal(nodesOf(1, 2, "closed-open"), null, "a closed pipe has odd harmonics only");
  assert.ok(Math.abs(nodesOf(0.85, 1, "closed-open").lambda - 3.4) < 1e-9);
  const s = clone(SAMPLES.standing); s.claims.harmonics[0].nodes = [0, 0.4, 0.8, 1.2]; fails(s, /nodes/);
  const f = clone(SAMPLES.standing); f.claims.harmonics[0].f = 100; fails(f, /f = v\/λ/);
  const p = clone(SAMPLES.pipe); p.n = [1, 2]; fails(p, /harmonic 2 is allowed/);
  const q = clone(SAMPLES.pipe); q.claims.harmonics[0].lambda = 1.7; fails(q, /λ = 1.7/);
  const i = clone(SAMPLES.superposition); i.claims.interference = "constructive"; fails(i, /constructive/);
  const a = clone(SAMPLES.superposition); a.claims.amplitude = 1.6; fails(a, /amplitude/);
  const v = clone(SAMPLES.snapshot); v.claims.speed = 5; fails(v, /v = fλ/);
  assert.deepEqual(extremaOfStrain({ A: 1, lambda: 1, phase: 0 }, 2).compressions, [0.5, 1.5]);
  const l = clone(SAMPLES.longitudinal); l.claims.compressions = [0, 1, 2]; fails(l, /compressions/);
});

test("sankey: energy conserved and efficiency recomputed", () => {
  assert.equal(sankeyTotals(SAMPLES.sankey).eff, 0.2);
  const s = clone(SAMPLES.sankey); s.outputs[1].value = 70; fails(s, /conserved/);
  const e = clone(SAMPLES.sankey); e.efficiency = 0.25; fails(e, /efficiency/);
});

test("fit: least squares, worst fits and error bars", () => {
  const f = lsq([[0, 1], [1, 3], [2, 5]]);
  assert.ok(Math.abs(f.m - 2) < 1e-12 && Math.abs(f.c - 1) < 1e-12);
  const w = worstFit([[0, 0, 1], [10, 10, 1]]);
  assert.ok(Math.abs(w.mMax - 1.2) < 1e-12 && Math.abs(w.mMin - 0.8) < 1e-12);
  const s = clone(SAMPLES.fit); s.fit.m = 2.2; fails(s, /gradient/);
  const e = clone(SAMPLES.fit); e.points[2][1] = 7; fails(e, /error bar|gradient/);
});

test("fields: directions, null points, strengths and line counts", () => {
  const dip = SAMPLES.field;
  assert.ok(fieldAt(dip, 0, 0)[0] > 0, "between + and −, E points from + to −");
  const n = findNull(SAMPLES.gravity, [0.2, 0.1]);
  assert.ok(Math.abs(n.at[0] - 1 / 3) < 1e-3 && Math.abs(n.at[1]) < 1e-3, "null point of 4m at x = −1 and m at x = 1 is at x = 1/3");
  const d = clone(dip); d.claims[0].angle = 180; fails(d, /points at 180/);
  const E = clone(dip); E.claims[1].value = 9; fails(E, /field strength/);
  const g = clone(SAMPLES.gravity); g.claims[0].at = [0, 0]; fails(g, /field is zero/);
  const lab = clone(dip); lab.charges[1].label = "+"; fails(lab, /sign label/);
  const w = clone(SAMPLES.wire); w.claims[1].angle = 270; fails(w, /points at 270/);
  const B = clone(SAMPLES.wire); B.claims[0].value = 2e-5; fails(B, /field strength/);
  const u = clone(SAMPLES.plates); u.claims[0].value = 25; fails(u, /V\/d/);
  const mag = clone(dip); mag.kind = "magnetic"; mag.claims = []; fails(mag, /labelled N/);
});

test("transitions: hydrogen levels, photon energies and wavelengths", () => {
  assert.ok(Math.abs(photon(1.889).lambda - 656.4) < 0.5);
  assert.equal(regionOf(656), "visible");
  const s = clone(SAMPLES.transitions); s.transitions[0].lambda = 486.1; fails(s, /λ = hc\/ΔE = 486.1/);
  const k = clone(SAMPLES.transitions); k.transitions[0].kind = "absorption"; fails(k, /absorption/);
  const h = clone(SAMPLES.transitions); h.levels[1].E = -3; fails(h, /hydrogen levels/);
  const r = clone(SAMPLES.transitions); r.transitions[2].region = "visible"; fails(r, /in the visible/);
});

test("scales: regions, span, EM order and f = c/λ, SI prefixes", () => {
  const s = clone(SAMPLES.scale); s.markers[3].region = "quantum"; fails(s, /person is in the quantum/);
  const p = clone(SAMPLES.scale); p.claims[0].value = 40; fails(p, /span/);
  const e = clone(SAMPLES.em); [e.regions[0].label, e.regions[6].label] = [e.regions[6].label, e.regions[0].label]; fails(e, /standard order/);
  const f = clone(SAMPLES.em); f.markers[0].f = 1e9; fails(f, /f = c\/λ/);
  const x = clone(SAMPLES.prefix); x.markers[2].value = 1e6; fails(x, /kilo/);
});

test("nuclear: A and Z conserved, symbols from Z, Q from masses", () => {
  assert.deepEqual(chainCheck(SAMPLES.chain), []);
  const s = clone(SAMPLES.chain); s.steps[0].to = { sym: "Th", A: 234, Z: 91 }; fails(s, /A and Z change/);
  const y = clone(SAMPLES.chain); y.steps[1].to.sym = "Th"; fails(y, /symbol/);
  const c = clone(SAMPLES.chain); c.counts.beta = 1; fails(c, /β⁻ decays/);
  const r = clone(SAMPLES.reaction); r.rhs[1] = "p"; fails(r, /charge/);
  const q = clone(SAMPLES.reaction); q.Q = 20; fails(q, /Q = /);
});

test("refraction: Snell's law, critical angle and total internal reflection", () => {
  assert.ok(Math.abs(snell(1, 1.5, 30).r - 19.47) < 0.01);
  assert.ok(Math.abs(snell(1.5, 1, 30).critical - 41.81) < 0.01);
  assert.equal(snell(1.5, 1, 50).tir, true);
  const s = clone(SAMPLES.refraction); s.panels[0].expect.r = 30; fails(s, /Snell/);
  const t = clone(SAMPLES.refraction); t.panels[2].expect.tir = false; fails(t, /refracted/);
  const c = clone(SAMPLES.refraction); c.panels[1].expect.critical = 48.6; fails(c, /critical/);
});
