// The maths diagram renderers (kit/diagrams/maths-renderers*.js) and the mathematics their checks rely on
// (kit/diagrams/maths-core.js): known answers, every renderer drawing a correct spec cleanly, and the same spec with
// one number wrong failing.
import test from "node:test";
import assert from "node:assert/strict";
import { render, RENDERERS } from "../kit/diagrams/renderers.js";
import "../kit/diagrams/maths-renderers.js";
import "../kit/diagrams/maths-renderers-2.js";
import "../kit/diagrams/maths-renderers-3.js";
import { frac, fadd, feq, fstr, num, fmt, primeFactors, readFactorisation, roundTo, readInequality, quartiles, leastSquares, normalCdf, prob, angleAt, area, transformPoint, erf } from "../kit/diagrams/maths-core.js";
import { eventPredicate } from "../kit/diagrams/maths-renderers.js";
import { textBoxes, layoutCheck } from "../kit/diagrams/maths-layout.js";

const base = { course: "maths", lesson: "x", title: "t", caption: "c", alt: "a", description: ["d"] };
const run = (renderer, body) => render({ ...base, id: `t-${renderer}`, renderer, ...body });
const failed = (out) => out.checks.filter((c) => !c.ok).map((c) => `${c.name}: ${c.detail}`);
const passes = (renderer, body) => { const out = run(renderer, body); assert.deepEqual(failed(out), [], renderer); assert.ok(out.checks.length > 4); assert.match(out.wide, /^<svg/); assert.match(out.narrow, /^<svg/); };
const fails = (renderer, body, re) => { const f = failed(run(renderer, body)); assert.ok(f.length, `${renderer}: a wrong spec passed`); if (re) assert.ok(f.some((x) => re.test(x)), f.join(" | ")); };
const clone = (o) => JSON.parse(JSON.stringify(o));

test("core: fractions, numbers, rounding, inequalities", () => {
  assert.deepEqual(frac("6/8"), { n: 3, d: 4 });
  assert.deepEqual(frac("0.125"), { n: 1, d: 8 });
  assert.equal(fstr(fadd(frac("1/3"), frac("1/6"))), "1/2");
  assert.ok(feq("98/140", "7/10"));
  assert.ok(Math.abs(num("sqrt(50)") - 5 * Math.SQRT2) < 1e-12);
  assert.ok(Math.abs(num("pi") - Math.PI) < 1e-12 && Math.abs(num("e") - Math.E) < 1e-12);
  assert.equal(fmt(-8), "−8"); assert.equal(fmt(1125), "1,125"); assert.equal(fmt(0.1 + 0.2), "0.3");
  assert.deepEqual(primeFactors(1764), [2, 2, 3, 3, 7, 7]);
  assert.deepEqual(readFactorisation("2^{2} × 3² × 7^2"), [2, 2, 3, 3, 7, 7]);
  assert.equal(roundTo(167.4154, { sf: 3 }), 167); assert.equal(roundTo(0.198, { sf: 1 }), 0.2); assert.equal(roundTo(2.5, { dp: 0 }), 3); assert.equal(roundTo(-2.5, { dp: 0 }), -3);
  assert.deepEqual(readInequality("-2 < x ≤ 3"), { from: -2, to: 3, closed: [false, true] });
  assert.deepEqual(readInequality("x ≥ −4"), { from: -4, to: null, closed: [true, false] });
  assert.deepEqual(readInequality("5 > x"), { from: null, to: 5, closed: [false, false] });
});
test("core: statistics, distributions, geometry", () => {
  assert.deepEqual(quartiles([1, 2, 3, 4, 5, 6, 7], "halves"), [2, 4, 6]);
  assert.deepEqual(quartiles([1, 2, 3, 4, 5, 6, 7, 8], "halves"), [2.5, 4.5, 6.5]);
  assert.deepEqual(quartiles([1, 2, 3, 4, 5], "linear"), [2, 3, 4]);
  const L = leastSquares([[1, 3], [2, 5], [3, 7]]); assert.ok(Math.abs(L.b - 2) < 1e-12 && Math.abs(L.a - 1) < 1e-12 && Math.abs(L.r - 1) < 1e-12);
  assert.ok(Math.abs(erf(1) - 0.8427007929497149) < 1e-14);
  assert.ok(Math.abs(normalCdf(1.96) - 0.9750021048517795) < 1e-12);
  assert.ok(Math.abs(prob({ dist: "normal", mu: 0, sigma: 1 }, -1, 1) - 0.6826894921370859) < 1e-12);
  assert.ok(Math.abs(prob({ dist: "binomial", n: 10, p: 0.5 }, null, 3) - 176 / 1024) < 1e-12);
  assert.ok(Math.abs(prob({ dist: "poisson", lambda: 2 }, 0, 0) - Math.exp(-2)) < 1e-15);
  assert.ok(Math.abs(angleAt([1, 0], [0, 0], [0, 1]) - 90) < 1e-9);
  assert.equal(area([[0, 0], [4, 0], [4, 3]]), 6);
  assert.deepEqual(transformPoint({ kind: "rotate", centre: [0, 0], deg: 90 }, [2, 1]), [-1, 2]);
  assert.deepEqual(transformPoint({ kind: "reflect", line: { m: 1, c: 0 } }, [3, 1]), [1, 3]);
  assert.deepEqual(transformPoint({ kind: "enlarge", centre: [1, 1], k: 2 }, [2, 3]), [3, 5]);
  assert.deepEqual(transformPoint({ kind: "matrix", m: [[0, -1], [1, 0]] }, [2, 1]), [-1, 2]);
});
test("events and label layout", () => {
  const p = eventPredicate("(A∩B′)∪C");
  assert.ok(p("A") && !p("AB") && p("BC") && !p(""));
  assert.ok(eventPredicate("ξ")(""));
  const b = textBoxes('<text x="10" y="10" font-size="14" text-anchor="start" dominant-baseline="middle">ab</text>');
  assert.ok(b[0].x0 === 10 && b[0].x1 > 20);
  const two = '<text x="50" y="20" font-size="14" text-anchor="middle" dominant-baseline="middle">hello</text>';
  assert.ok(layoutCheck(two + two, 200, 100, "t").some((c) => !c.ok));
  assert.ok(layoutCheck(two, 40, 100, "t").some((c) => !c.ok));
  assert.ok(layoutCheck(two, 200, 100, "t").every((c) => c.ok));
});

// one correct spec per renderer, and a way to make it wrong
const CASES = {
  "number-line": [{ range: [-10, 6], ticks: { step: 2 }, jumps: { from: -5, steps: [{ by: 9 }, { by: -12 }], to: -8 }, points: [{ value: 3 / 11 - 1, expr: "3/11-1", label: "p" }],
    intervals: [{ from: -2, to: 3, closed: [false, true], inequality: "-2 < x <= 3" }] }, (s) => { s.jumps.to = -7; }, /= −7/],
  sequence: [{ terms: [17, 13, 9, 5], rule: { kind: "nth", expr: "21-4*n" }, show: "differences", checks: [{ type: "nth", n: 30, value: -99 }] }, (s) => { s.terms[2] = 8; }, /rule/],
  "sequence-pattern": [{ terms: [1, 3, 6, 10], rule: { kind: "nth", expr: "n*(n+1)/2" }, pattern: "triangle" }, (s) => { s.pattern = "square"; }, /dots/],
  "factor-tree": [{ tree: { n: 60, children: [{ n: 6, children: [{ n: 2 }, { n: 3 }] }, { n: 10, children: [{ n: 2 }, { n: 5 }] }] }, result: "2^2 × 3 × 5" }, (s) => { s.tree.children[1].children[1].n = 7; }, /multiplies/],
  "bar-model": [{ bars: [{ cells: 4, shaded: 3 }, { cells: 8, shaded: 6 }], checks: [{ type: "equivalent", bars: [0, 1] }, { type: "fraction", bar: 0, value: "3/4" }] }, (s) => { s.bars[1].shaded = 5; }, /=/],
  "bar-model-ratio": [{ prefix: "£", bars: [{ parts: [{ value: 16 }, { value: 24 }] }], braces: [{ bar: 0, from: 0, to: 1, value: 40 }], checks: [{ type: "ratio", bar: 0, ratio: [2, 3], total: 40 }] }, (s) => { s.bars[0].parts = [{ value: 15 }, { value: 25 }]; }, /2 : 3/],
  venn: [{ sets: [{ name: "A" }, { name: "B" }], regions: { A: 5, AB: 3, B: 4, "": 2 }, universe: { n: 14 }, checks: [{ type: "count", event: "A∪B", n: 12 }, { type: "prob", event: "A", given: "B", p: "3/7" }] }, (s) => { s.checks[1].p = "3/8"; }, /3\/7/],
  "venn-nested": [{ nested: [{ label: "N", kind: "natural", items: [{ text: "√9", expr: "sqrt(9)" }] }, { label: "Z", kind: "integer", items: [{ text: "−3", expr: "-3" }] }, { label: "Q", kind: "rational", items: [{ text: "0.75" }] }, { label: "R", kind: "real", items: [{ text: "π", expr: "pi" }] }] }, (s) => { s.nested[2].items.push({ text: "√2", expr: "sqrt(2)" }); }, /√2/],
  "prob-tree": [{ tree: { children: [{ label: "R", p: "3/7", children: [{ label: "R", p: "2/6" }, { label: "B", p: "4/6" }] }, { label: "B", p: "4/7", children: [{ label: "R", p: "3/6" }, { label: "B", p: "3/6" }] }] }, outcomes: true,
    checks: [{ type: "outcome", path: ["R", "B"], p: "2/7" }, { type: "event", paths: [["R", "B"], ["B", "R"]], p: "4/7" }] }, (s) => { s.tree.children[1].children[1].p = "2/6"; }, /add up to 1/],
  geometry: [{ points: { O: [0, 0], A: [3, 4], B: [-3, 4], T: [5, 0], P: [5, 3] }, circles: [{ centre: "O", r: 5 }], segments: [["O", "A"], ["T", "P"]], angles: [{ at: "O", from: "T", to: "A", deg: 53.13 }],
    lengths: [{ a: "O", b: "A", value: 5 }], checks: [{ type: "onCircle", points: ["A", "B", "T"], circle: 0 }, { type: "tangent", circle: 0, at: "T", through: "P" }] }, (s) => { s.angles[0].deg = 60; }, /angle/],
  "geometry-vectors": [{ grid: { step: 1, axes: true }, view: { x: [-1, 6], y: [-1, 5] }, points: {}, vectors: [{ name: "a", from: [0, 0], v: [3, 1] }, { name: "b", from: [3, 1], v: [1, 3] }, { name: "a + b", from: [0, 0], v: [4, 4], labelSide: -1 }],
    checks: [{ type: "vecsum", vectors: [0, 1], is: 2 }, { type: "magnitude", vector: 2, value: "sqrt(32)" }] }, (s) => { s.vectors[2].v = [4, 3]; }, /a \+ b/],
  transform: [{ view: { x: [-6, 6], y: [-6, 6] }, object: { name: "A", pts: [[1, 1], [3, 1], [1, 2]] }, images: [{ name: "B", t: { kind: "rotate", centre: [0, 0], deg: 90 }, pts: [[-1, 1], [-1, 3], [-2, 1]] }, { name: "C", t: { kind: "matrix", m: [[2, 0], [0, 2]] }, pts: [[2, 2], [6, 2], [2, 4]] }],
    checks: [{ type: "areaScale", image: "C", value: 4 }] }, (s) => { s.images[0].pts[2] = [-2, 2]; }, /image of A/],
  histogram: [{ classes: [[0, 10], [10, 15], [15, 30]], freq: [20, 30, 15], density: [2, 6, 1], range: { x: [0, 30], y: [0, 7] }, ticks: [[0, 10, 15, 30], [2, 4, 6]], axisLabels: ["t", "density"], checks: [{ type: "estimate", from: 5, to: 20, value: 45 }] }, (s) => { s.density[1] = 3; }, /width/],
  boxplot: [{ method: "halves", range: { x: [0, 20] }, ticks: [0, 5, 10, 15, 20], plots: [{ label: "A", data: [2, 4, 5, 7, 8, 9, 12], summary: [2, 4, 7, 9, 12] }] }, (s) => { s.plots[0].summary[1] = 4.5; }, /Q1/],
  scatter: [{ points: [[1, 3], [2, 5], [3, 7.2], [4, 8.8]], line: { a: 1.1, b: 1.96 }, r: 0.998, range: { x: [0, 5], y: [0, 10] }, ticks: [[1, 2, 3, 4], [2, 4, 6, 8]], axisLabels: ["x", "y"] }, (s) => { s.line.b = 2.2; }, /least-squares/],
  barchart: [{ categories: [0, 1, 2, 3], values: [4, 7, 6, 3], range: { y: [0, 8] }, ticks: [2, 4, 6, 8], checks: [{ type: "total", value: 20 }, { type: "mode", value: 1 }, { type: "mean", value: 1.4 }] }, (s) => { s.checks[2].value = 1.5; }, /mean/],
  distribution: [{ dist: { dist: "normal", mu: 100, sigma: 15 }, range: { x: [40, 160], y: [0, 0.03] }, ticks: [[55, 70, 85, 100, 115, 130, 145], []], axisLabels: ["IQ", ""], shade: [85, 115], p: 0.6827, checks: [{ type: "mean", value: 100 }] }, (s) => { s.p = 0.68; }, /shaded/],
  "distribution-binomial": [{ dist: { dist: "binomial", n: 10, p: 0.3 }, range: { x: [-0.5, 10.5], y: [0, 0.3] }, ticks: [[0, 2, 4, 6, 8, 10], [0.1, 0.2]], axisLabels: ["k", "P"], shade: [null, 2], p: 0.3828 }, (s) => { s.shade = [null, 3]; }, /shaded/],
};
for (const [name, [spec, breakIt, re]] of Object.entries(CASES)) {
  const renderer = name.replace(/-(pattern|ratio|nested|binomial|vectors)$/, "");
  test(`${name}: a correct spec passes every check at both widths; a wrong one fails`, () => {
    passes(renderer, clone(spec));
    const bad = clone(spec); breakIt(bad); fails(renderer, bad, re);
  });
}
test("every maths renderer is registered with two widths", () => {
  for (const r of ["number-line", "sequence", "factor-tree", "bar-model", "venn", "prob-tree", "geometry", "transform", "histogram", "boxplot", "scatter", "barchart", "distribution"]) {
    assert.ok(RENDERERS[r], r); assert.equal(RENDERERS[r].widths.length, 2);
  }
});
test("numbers taken from the lesson must be in the lesson", () => {
  const spec = { ...base, id: "t-from", renderer: "sequence", terms: [1, 2], rule: { kind: "arithmetic", a: 1, d: 1 }, fromLesson: ["1, 2, 3"] };
  assert.ok(RENDERERS.sequence.checks(spec, "the sequence 1, 2, 3, …").every((c) => c.ok));
  assert.ok(RENDERERS.sequence.checks(spec, "the sequence 2, 4, 6").some((c) => !c.ok));
});
