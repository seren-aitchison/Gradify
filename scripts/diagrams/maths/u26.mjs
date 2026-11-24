// School 26, Mathematical Reasoning and Research Methods: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u26.mjs
import { mk } from "./spec.mjs";

const must = (c, m) => { if (!c) throw new Error(m); };
const T = (a, b) => [[...a], [...b]];
const G = (range, ticks, body) => ({ range, ticks, grid: [Math.abs(ticks[0][1] - ticks[0][0]) || 1, Math.abs(ticks[1][1] - ticks[1][0]) || 1], height: [380, 340], axisLabels: ["x", "y"], ...body });

// ---------- u26-01 sums of odd numbers ----------
{
  const terms = [1, 2, 3, 4, 5].map((n) => Array.from({ length: n }, (_, i) => 2 * i + 1).reduce((a, b) => a + b, 0));
  must(terms.join() === "1,4,9,16,25", "odd sums");
  mk("u26-01", "maths-u26-odd-sums", "sequence", "Sums of the first odd numbers",
    "1, 1 + 3, 1 + 3 + 5, … give 1, 4, 9, 16, 25. The differences are the odd numbers being added, and the dot squares show each total is a square: the conjecture is that the sum of the first n odd numbers is n².",
    "The terms 1, 4, 9, 16, 25 drawn as square arrays of dots, with the differences 3, 5, 7, 9 between them.",
    ["Add the first n odd numbers for n = 1 to 5: 1, 4, 9, 16, 25.", "Each total is a perfect square, drawn here as an n by n array of dots.", "The differences 3, 5, 7, 9 are the next odd number added each time.", "Conjecture: the sum is n². It still needs proving."],
    { terms, rule: { kind: "nth", expr: "n^2" }, show: "differences", pattern: "square", more: true, ruleText: "conjecture: sum = n²", checks: [{ type: "nth", n: 10, value: 100 }], fromLesson: ["1, 4, 9, 16, 25"] });
}

// ---------- u26-03 affirming the consequent ----------
mk("u26-03", "maths-u26-four-sides", "venn", "Four sides does not make a square",
  "Every square has four sides, so the squares sit inside the four-sided shapes. But a rectangle or a rhombus is also inside the four-sided set and outside the squares: knowing a shape has four sides cannot tell you it is a square.",
  "A small set of squares drawn inside a larger set of four-sided shapes, with the rectangle and the rhombus in the larger set only.",
  ["Draw the set of four-sided shapes.", "Every square lies inside it: if square then four sides.", "A rectangle and a rhombus are four-sided but not squares.", "So 'four sides, therefore square' is invalid."],
  { sets: [{ name: "A", label: "squares" }, { name: "B", label: "four sides" }], universe: { label: "shapes" }, regions: { A: 0, AB: 1, B: 2, "": 1 },
    checks: [{ type: "count", event: "A∩B′", n: 0, name: "every square has four sides" }, { type: "count", event: "B∩A′", n: 2, name: "the rectangle and the rhombus have four sides without being squares" }], fromLesson: ["rectangle or rhombus"] });

// ---------- u26-04 circle regions ----------
{
  const reg = (n) => (n ** 4 - 6 * n ** 3 + 23 * n ** 2 - 18 * n + 24) / 24;
  const terms = [1, 2, 3, 4, 5, 6].map(reg);
  must(terms.join() === "1,2,4,8,16,31", "regions");
  mk("u26-04", "maths-u26-circle-regions", "sequence", "Regions made by chords: 1, 2, 4, 8, 16, 31",
    "Joining n points on a circle gives 1, 2, 4, 8, 16 regions, which suggests 32 for n = 6. Counting carefully gives 31: the differences 1, 2, 4, 8 are doubling, then the next one is 15, and the pattern fails.",
    "The six terms 1, 2, 4, 8, 16, 31 with their differences 1, 2, 4, 8, 15 underneath.",
    ["For n = 1 to 5 the regions are 1, 2, 4, 8, 16.", "The pattern suggests 2⁵ = 32 for n = 6.", "A careful count gives 31, and the last difference is 15, not 16.", "A pattern from five cases is not a proof."],
    { terms, rule: { kind: "nth", expr: "(n^4-6*n^3+23*n^2-18*n+24)/24" }, show: "differences", checks: [{ type: "nth", n: 6, value: 31 }], fromLesson: ["31"] });
}

// ---------- u26-06 screening ----------
{
  const prev = 0.01, sens = 0.9, spec = 0.9;
  const tp = 1000 * prev * sens, fp = 1000 * (1 - prev) * (1 - spec);
  must(Math.round(tp) === 9 && Math.round(fp) === 99, "screening");
  mk("u26-06", "maths-u26-screening-tree", "prob-tree", "Most positives are false",
    `Of 1000 people ${tp} are ill and test positive, but ${fp} healthy people also test positive (10% of 990). Only ${tp} of ${tp + fp} positives are true: ${(100 * tp / (tp + fp)).toFixed(1)}%, about 8%.`,
    "A probability tree: ill with probability 1/100 or healthy 99/100, then positive or negative on each branch, listing the four outcomes.",
    ["Split by prevalence: 1/100 ill, 99/100 healthy.", "Ill people test positive with probability 9/10.", "Healthy people test positive with probability 1/10.", "True positives 9/1000 against false positives 99/1000: 9 out of 108 positives are true."],
    { tree: { children: [{ label: "ill", p: "1/100", children: [{ label: "+", p: "9/10" }, { label: "−", p: "1/10" }] }, { label: "healthy", p: "99/100", children: [{ label: "+", p: "1/10" }, { label: "−", p: "9/10" }] }] },
      stages: ["Disease", "Test"], outcomes: true,
      checks: [{ type: "outcome", path: ["ill", "+"], p: "9/1000" }, { type: "outcome", path: ["healthy", "+"], p: "99/1000" }, { type: "event", paths: [["ill", "+"], ["healthy", "+"]], p: "108/1000" }], fromLesson: ["9/(9 + 99)"] });
}

// ---------- u26-10 error propagation ----------
{
  const A = 10 * 5, rel = Math.hypot(0.1 / 10, 0.1 / 5), dA = rel * A, lo = +(A - 1.1).toFixed(1), hi = +(A + 1.1).toFixed(1);
  must(Math.abs(dA - 1.118) < 1e-3, "dA");
  mk("u26-10", "maths-u26-area-uncertainty", "number-line", "Area 50 ± 1.1 cm²",
    `The relative uncertainties 1% and 2% combine to ${(rel * 100).toFixed(2)}%, so δA ≈ ${dA.toFixed(1)} cm². The area 50.0 cm² could lie anywhere from ${lo} to ${hi} cm², which the lesson reports as 50 ± 1 cm².`,
    `A number line from 47 to 53 with the point 50 and the interval from ${lo} to ${hi} marked.`,
    ["Area = 10.0 × 5.0 = 50.0 cm².", "Relative uncertainties 1% and 2% combine to √(1² + 2²) ≈ 2.24%.", "That is 0.0224 × 50 ≈ 1.1 cm².", "So the area lies between 48.9 and 51.1 cm²."],
    { range: [47, 53], ticks: { step: 1 }, points: [{ value: 50, label: "50.0", colour: "a2" }], intervals: [{ from: lo, to: hi, closed: [true, true], inequality: `${lo} <= x <= ${hi}`, label: "50 ± 1.1", colour: "a1" }],
      checks: [{ type: "value", expr: "sqrt(0.01^2+0.02^2)*50", value: dA, name: "√(1² + 2²)% of 50 = 1.1 cm²" }], fromLesson: ["2.24%"] });
}

// ---------- u26-15 order of accuracy ----------
{
  const e = (h) => 1.6 * h * h;
  must(Math.abs(e(0.1) - 0.016) < 1e-12 && Math.abs(e(0.05) - 0.004) < 1e-12 && Math.abs(e(0.1) / e(0.05) - 4) < 1e-9, "order");
  mk("u26-15", "maths-u26-order-of-accuracy", "graph", "Halving h divides the error by 4",
    "The errors 0.016 at h = 0.1 and 0.004 at h = 0.05 both lie on e = 1.6h². Their ratio is 0.016/0.004 = 4 = 2², so the observed order is p = 2, as theory predicts.",
    "The curve e = 1.6h² rising from the origin, with marked points (0.05, 0.004) and (0.1, 0.016).",
    ["Record the error at two step sizes: 0.016 and 0.004.", "Both points lie on the curve e = 1.6h².", "Their ratio is 4, and 4 = 2^p gives p = 2.", "The observed order matches the expected second order."],
    G({ x: [0, 0.12], y: [0, 0.024] }, T([0.05, 0.1], [0.008, 0.016, 0.024]), { grid: [0.05, 0.008], axisLabels: ["step size h", "error"], curves: [{ expr: "1.6*x^2", colour: "a1", domain: [0, 0.115] }],
      points: [{ x: 0.05, y: 0.004, label: "0.004", colour: "a2", dx: 12, dy: 20 }, { x: 0.1, y: 0.016, label: "0.016", colour: "a2", dx: -10, dy: -10, anchor: "end" }],
      checks: [{ type: "point", expr: "1.6*x^2", x: 0.1, y: 0.016, name: "at h = 0.1 the error is 0.016" }, { type: "point", expr: "1.6*x^2", x: 0.05, y: 0.004, name: "at h = 0.05 the error is 0.004" }, { type: "value", expr: "1.6*x^2/(1.6*(x/2)^2)", x: 0.1, between: [4, 4], name: "the ratio 0.016/0.004 is 4 = 2²" }], fromLesson: ["0.016/0.004 = 4"] }));
}

// ---------- u26-18 log-log ----------
{
  const L = "log(3)/log(10)+2*x";
  mk("u26-18", "maths-u26-log-log-line", "graph", "y = 3x² becomes a straight line on log axes",
    "Taking logs of y = 3x² gives log y = log 3 + 2 log x. Plotting log y against log x gives a straight line of slope 2 (the exponent) and intercept log 3 ≈ 0.477 (the constant).",
    "A straight line rising with slope 2 from intercept 0.477 on the vertical axis, plotted against log x.",
    ["Take logs of both sides: log y = log 3 + 2 log x.", "Plot log y against log x.", "The graph is a straight line.", "Its slope 2 is the exponent and its intercept log 3 gives the constant 3."],
    G({ x: [-1, 2], y: [-1, 5] }, T([-1, 0, 1, 2], [0, 1, 2, 3, 4, 5]), { grid: [1, 1], axisLabels: ["log x", "log y"], curves: [{ expr: L, colour: "a1", domain: [-1, 2] }],
      points: [{ x: 0, y: Math.log10(3), label: "intercept 0.477", colour: "a2", dx: -12, dy: -12, anchor: "end" }, { x: 1, y: Math.log10(3) + 2, label: "slope 2", colour: "a2", dx: 12, dy: 20 }],
      checks: [{ type: "slope", expr: L, x: 0.5, value: 2, name: "the slope is the exponent 2" }, { type: "point", expr: L, x: 0, y: Math.log10(3), name: "the intercept is log 3 ≈ 0.477" }, { type: "point", expr: L, x: 1, y: Math.log10(3 * 100), name: "x = 10 gives y = 300: log 300 = log 3 + 2" }], fromLesson: ["log y = log 3 + 2 log x"] }));
}
