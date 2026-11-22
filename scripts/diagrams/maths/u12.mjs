// School 12, Probability: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u12.mjs
import { mk } from "./spec.mjs";
import { normalCdf, binomialPmf, poissonPmf } from "../../../kit/diagrams/maths-core.js";

const R = (x, d = 4) => +x.toFixed(d);
const PI = 3.141592653589793, phi = (z) => normalCdf(z);

// ---------- u12-01 two dice: totals ----------
{
  const totals = []; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) totals.push(a + b);
  const cats = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], vals = cats.map((t) => totals.filter((x) => x === t).length);
  mk("u12-01", "maths-u12-two-dice-totals", "barchart", "Two dice: the 36 outcomes by total",
    `Of the 36 equally likely outcomes, ${vals[5]} have total 7, so P(7) = ${vals[5]}/36 = 1/6 and P(not 7) = 5/6. No other total is as likely.`,
    `Bar chart of the number of the 36 outcomes giving each total from 2 to 12: 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1; the bar for 7 is highlighted.`,
    ["Each of the 6 × 6 = 36 outcomes of two dice has a total from 2 to 12.", "The bar heights count how many outcomes give each total.", "Total 7 has the tallest bar: 6 outcomes, so P = 6/36 = 1/6."],
    { categories: cats, values: vals, range: { y: [0, 7] }, ticks: [2, 4, 6], axisLabels: ["total", "outcomes (of 36)"], highlight: [5],
      checks: [{ type: "total", value: 36 }, { type: "mode", value: 7 }, { type: "mean", value: 7 }] });
}
// ---------- u12-02 P(A) = 0.5, P(B) = 0.4, P(A∩B) = 0.2 ----------
{
  const both = 20, A = 50, B = 40, onlyA = A - both, onlyB = B - both, un = A + B - both, none = 100 - un;
  mk("u12-02", "maths-u12-addition-rule", "venn", "The addition rule in a Venn diagram",
    `Out of 100 percentage points: A alone ${onlyA}, both ${both}, B alone ${onlyB}, neither ${none}. P(A ∪ B) = 0.5 + 0.4 − 0.2 = 0.7, so P(neither) = 0.3: the overlap is counted once, not twice.`,
    `Two overlapping circles: A only ${onlyA}, both ${both}, B only ${onlyB}, and ${none} outside both, out of 100.`,
    ["Read probabilities as percentages of one whole of 100.", "The overlap A ∩ B holds 20; A has 50 in total, so A alone holds 30; B has 40, so B alone holds 20.", "A ∪ B is 30 + 20 + 20 = 70, so the outside region holds 100 − 70 = 30."],
    { sets: [{ name: "A", label: "A (0.5)" }, { name: "B", label: "B (0.4)" }], regions: { A: onlyA, AB: both, B: onlyB, "": none }, universe: { n: 100 },
      checks: [{ type: "prob", event: "A∪B", p: "7/10" }, { type: "prob", event: "(A∪B)′", p: "3/10" }, { type: "prob", event: "A∩B", p: "1/5" }] });
}
// ---------- u12-04 bag 5 red 3 blue ----------
mk("u12-04", "maths-u12-bag-tree", "prob-tree", "Two counters without replacement",
  "After the first pick the bag has 7 counters. P(both red) = 5/8 × 4/7 = 5/14; if the first is blue, 5 of the remaining 7 are red, so P(second red ∣ first blue) = 5/7.",
  "A probability tree: first pick red 5/8 or blue 3/8; then after red, red 4/7 or blue 3/7; after blue, red 5/7 or blue 2/7.",
  ["First pick: red with probability 5/8, blue with 3/8.", "If the first was red, 4 red remain in 7: red 4/7, blue 3/7.", "If the first was blue, 5 red remain in 7: red 5/7, blue 2/7.", "Multiply along a path: red, red = 5/8 × 4/7 = 5/14."],
  { tree: { children: [{ label: "R", p: "5/8", children: [{ label: "R", p: "4/7" }, { label: "B", p: "3/7" }] }, { label: "B", p: "3/8", children: [{ label: "R", p: "5/7" }, { label: "B", p: "2/7" }] }] },
    stages: ["First pick", "Second pick"], outcomes: true, checks: [{ type: "outcome", path: ["R", "R"], p: "5/14" }, { type: "outcome", path: ["B", "R"], p: "15/56" }, { type: "event", paths: [["R", "R"], ["B", "R"]], p: "5/8" }] });
// ---------- u12-05 joint table as a Venn ----------
{
  const pXY = 40, pX = 10 + 40, pY = 20 + 40;
  mk("u12-05", "maths-u12-joint-independence", "venn", "Joint probabilities and independence",
    `Reading the table in percentage points: P(X = 1) = 0.5 and P(Y = 1) = 0.6, so independence would need P(1, 1) = 0.3. The table has 0.4, so X and Y are dependent.`,
    "Two overlapping circles, X = 1 and Y = 1: X only 10, both 40, Y only 20, neither 30, out of 100.",
    ["The cell P(1, 1) = 0.4 is the overlap of X = 1 and Y = 1.", "P(1, 0) = 0.1 is X = 1 only, and P(0, 1) = 0.2 is Y = 1 only; P(0, 0) = 0.3 is neither.", "The circles' totals are P(X = 1) = 0.5 and P(Y = 1) = 0.6; 0.5 × 0.6 = 0.3 is not the overlap 0.4."],
    { sets: [{ name: "X", label: "X = 1" }, { name: "Y", label: "Y = 1" }], regions: { X: 10, XY: pXY, Y: 20, "": 30 }, universe: { n: 100 },
      checks: [{ type: "prob", event: "X", p: "1/2" }, { type: "prob", event: "Y", p: "3/5" }, { type: "prob", event: "X∩Y", p: "2/5" }, { type: "prob", event: "X∩Y′", p: "1/10" }] });
}
// ---------- u12-06 Bayes: disease test ----------
mk("u12-06", "maths-u12-bayes-tree", "prob-tree", "A positive test for a rare disease",
  "Of every 1,000 people, 9 are ill and test positive but 49.5 healthy people also test positive: P(disease ∣ positive) = 0.009 / 0.0585 = 2/13, only about 15%.",
  "Probability tree: disease 1/100 then positive 9/10 or negative 1/10; healthy 99/100 then positive 1/20 or negative 19/20.",
  ["The first split is disease (1%) against healthy (99%).", "Among the diseased, the test is positive with probability 0.9; among the healthy it is positive with probability 0.05.", "Both positive paths: 0.9 × 0.01 = 0.009 and 0.05 × 0.99 = 0.0495, together 0.0585.", "The diseased share of the positives is 0.009 / 0.0585 = 2/13 ≈ 0.154."],
  { tree: { children: [{ label: "D", p: "1/100", children: [{ label: "+", p: "9/10" }, { label: "−", p: "1/10" }] }, { label: "H", p: "99/100", children: [{ label: "+", p: "1/20" }, { label: "−", p: "19/20" }] }] },
    stages: ["Status", "Test"], outcomes: true, checks: [{ type: "outcome", path: ["D", "+"], p: "9/1000" }, { type: "outcome", path: ["H", "+"], p: "99/2000" }, { type: "event", paths: [["D", "+"], ["H", "+"]], p: "117/2000" }, { type: "value", expr: "(9/1000)/(117/2000)", value: "2/13", name: "P(D ∣ +) = 0.009 / 0.0585 = 2/13" }] });
// ---------- u12-07 larger of two dice ----------
{
  const cats = [1, 2, 3, 4, 5, 6], vals = cats.map((m) => 2 * m - 1);
  mk("u12-07", "maths-u12-larger-of-two-dice", "barchart", "The larger of two dice",
    "Of the 36 outcomes, 2m − 1 have larger score m, so 11 of them give 6: P(X = 6) = 11/36, the same as 1 − (5/6)² = 11/36.",
    "Bar chart of how many of 36 outcomes give each larger score 1 to 6: 1, 3, 5, 7, 9, 11, with 6 highlighted.",
    ["Larger score 1 happens only for (1, 1): one outcome.", "Each step up adds two outcomes: 1, 3, 5, 7, 9, 11, which total 36.", "Larger score 6 has 11 outcomes, so P(X = 6) = 11/36."],
    { categories: cats, values: vals, range: { y: [0, 12] }, ticks: [2, 4, 6, 8, 10, 12], axisLabels: ["larger score X", "outcomes (of 36)"], highlight: [5],
      checks: [{ type: "total", value: 36 }, { type: "mode", value: 6 }, { type: "mean", value: "161/36" }] });
}
// ---------- u12-08 P(X = x) = kx ----------
mk("u12-08", "maths-u12-pmf-kx", "barchart", "P(X = x) = kx",
  "The probabilities are in the ratio 1 : 2 : 3 : 4, so 10k = 1 and k = 0.1; the balance point of the bars is E(X) = 0.1 × 30 = 3.",
  "Bar chart of x = 1 to 4 with heights 1, 2, 3, 4 tenths: probabilities 0.1, 0.2, 0.3, 0.4.",
  ["Heights are in tenths: 1, 2, 3, 4, which add to 10, so k = 1/10.", "E(X) = 0.1 × 1 + 0.2 × 2 + 0.3 × 3 + 0.4 × 4 = 3."],
  { categories: [1, 2, 3, 4], values: [1, 2, 3, 4], range: { y: [0, 5] }, ticks: [1, 2, 3, 4], axisLabels: ["x", "probability (tenths)"],
    checks: [{ type: "total", value: 10 }, { type: "mean", value: 3 }] });
// ---------- u12-09 f = 3x^2 ----------
mk("u12-09", "maths-u12-density-3x2", "graph", "The density 3x² on [0, 1]",
  "P(X < 0.5) is the area under 3x² from 0 to 0.5, which is 0.5³ = 0.125; the median m has m³ = 0.5, so m ≈ 0.794. The whole area is 1.",
  "Graph of f(x) = 3x² from 0 to 1 with the area from 0 to 0.5 shaded, and a dashed line at the median 0.794.",
  ["The density rises from 0 to 3 at x = 1, and the total area under it is 1.", "The shaded area from 0 to 0.5 is [x³] = 0.125 = P(X < 0.5).", "Half the area lies left of x = 0.794 because 0.794³ = 0.5."],
  { range: { x: [-0.1, 1.2], y: [0, 3.5] }, ticks: [[0.5, 1], [1, 2, 3]], axisLabels: ["x", "f(x)"], curves: [{ expr: "3*x^2", domain: [0, 1], colour: "a1" }],
    areas: [{ expr: "3*x^2", from: 0, to: 0.5, colour: "a2" }], marks: [{ x: R(0.5 ** (1 / 3), 4), label: "median 0.794", dx: 6 }],
    checks: [{ type: "area", expr: "3*x^2", from: 0, to: 1, value: 1, name: "the density has total area 1" }, { type: "area", expr: "3*x^2", from: 0, to: 0.5, value: 0.125, name: "P(X < 0.5) = 0.125" },
      { type: "area", expr: "3*x^2", from: 0, to: 0.5 ** (1 / 3), value: 0.5, name: "half the area lies below x = 0.5^(1/3) ≈ 0.794" }, { type: "area", expr: "x*3*x^2", from: 0, to: 1, value: 0.75, name: "E(X) = 3/4" }] });
// ---------- u12-10 Poisson no calls ----------
mk("u12-10", "maths-u12-calls-poisson", "distribution", "Calls per minute: Poisson with mean 3",
  `Calls arrive at random at an average rate of 3 a minute, so the count is Poisson(3). P(no calls) = e⁻³ = ${R(Math.exp(-3))}.`,
  "Bar chart of the Poisson distribution with mean 3 for 0 to 10 calls; the bar for 0 is shaded.",
  ["Random arrivals at a steady average rate suggest a Poisson model with λ = 3.", "The bar at 0 has height e⁻³ ≈ 0.0498."],
  { dist: { dist: "poisson", lambda: 3 }, range: { x: [-0.5, 10.5], y: [0, 0.25] }, ticks: [[0, 2, 4, 6, 8, 10], [0.05, 0.1, 0.15, 0.2, 0.25]], axisLabels: ["calls", "probability"], shade: [0, 0], p: R(Math.exp(-3)),
    checks: [{ type: "mean", value: 3 }, { type: "variance", value: 3 }, { type: "prob", from: 0, to: 0, p: R(Math.exp(-3)) }] });
// ---------- u12-11 P = c/x ----------
mk("u12-11", "maths-u12-pmf-c-over-x", "barchart", "P(X = x) = c/x",
  "Heights in elevenths are 6, 3, 2 (that is 6/x), total 11, so c = 6/11 and P(X = 1) = 6/11 ≈ 0.545.",
  "Bar chart for x = 1, 2, 3 with heights 6, 3, 2 elevenths.",
  ["The probabilities are proportional to 1, 1/2, 1/3, that is 6 : 3 : 2.", "They total 11 parts, so each part is 1/11 and P(X = 1) = 6/11."],
  { categories: [1, 2, 3], values: [6, 3, 2], range: { y: [0, 7] }, ticks: [2, 4, 6], axisLabels: ["x", "probability (elevenths)"], highlight: [0],
    checks: [{ type: "total", value: 11 }, { type: "mode", value: 1 }] });
// ---------- u12-12 f = kx(2 - x) ----------
mk("u12-12", "maths-u12-density-quadratic", "graph", "The density kx(2 − x) with k = 3/4",
  "The area under kx(2 − x) from 0 to 2 is 4k/3, which must be 1, so k = 3/4. The curve is symmetric about 1, so P(X < 1) = 1/2.",
  "Graph of f(x) = 0.75x(2 − x) on [0, 2], a dome with maximum 0.75 at x = 1; the area left of 1 is shaded.",
  ["Total area ∫ kx(2 − x) dx over [0, 2] = 4k/3 = 1 gives k = 3/4.", "The dome peaks at x = 1 with height 0.75.", "By symmetry the shaded half has area 1/2."],
  { range: { x: [-0.2, 2.3], y: [0, 1] }, ticks: [[0.5, 1, 1.5, 2], [0.25, 0.5, 0.75]], axisLabels: ["x", "f(x)"], curves: [{ expr: "0.75*x*(2-x)", domain: [0, 2] }], areas: [{ expr: "0.75*x*(2-x)", from: 0, to: 1, colour: "a2" }],
    checks: [{ type: "area", expr: "0.75*x*(2-x)", from: 0, to: 2, value: 1, name: "total area 1 with k = 3/4" }, { type: "area", expr: "0.75*x*(2-x)", from: 0, to: 1, value: 0.5, name: "P(X < 1) = 1/2" }, { type: "max", expr: "0.75*x*(2-x)", domain: [0, 2], x: 1, y: 0.75 }] });
// ---------- u12-13 CDF 1 - e^-2x ----------
{
  const F = (x) => 1 - Math.exp(-2 * x), med = Math.log(2) / 2;
  mk("u12-13", "maths-u12-cdf-exponential", "graph", "The CDF 1 − e⁻²ˣ",
    `P(1 < X ≤ 2) = F(2) − F(1) = e⁻² − e⁻⁴ = ${R(F(2) - F(1))}: the rise of the curve between x = 1 and 2. The median solves F(m) = 0.5, m = ln 2 / 2 ≈ ${R(med, 3)}.`,
    `Graph of F(x) = 1 − e⁻²ˣ rising from 0 towards 1, with points F(1) = ${R(F(1))}, F(2) = ${R(F(2))} and the median at height 0.5.`,
    ["F(x) climbs from 0 and approaches 1 but never reaches it.", `F(1) = ${R(F(1))} and F(2) = ${R(F(2))}; the probability of landing in (1, 2] is the difference, ${R(F(2) - F(1))}.`, "F reaches 0.5 at x = ln 2 / 2 ≈ 0.347, the median."],
    { range: { x: [-0.2, 3], y: [0, 1.1] }, ticks: [[0.5, 1, 1.5, 2, 2.5, 3], [0.25, 0.5, 0.75, 1]], axisLabels: ["x", "F(x)"], curves: [{ expr: "1-exp(-2*x)", domain: [0, 3] }],
      points: [{ x: 1, y: R(F(1)), label: `F(1) = ${R(F(1), 3)}`, dx: 10, dy: 16 }, { x: 2, y: R(F(2)), label: `F(2) = ${R(F(2), 3)}`, dx: 8, dy: 18 }, { x: R(med, 4), y: 0.5, label: "median", dx: 10, dy: 16 }],
      checks: [{ type: "point", expr: "1-exp(-2*x)", x: 1, y: R(F(1)) }, { type: "point", expr: "1-exp(-2*x)", x: 2, y: R(F(2)) }, { type: "point", expr: "1-exp(-2*x)", x: R(med, 4), y: 0.5, name: "F(ln 2 / 2) = 0.5" },
        { type: "area", expr: "2*exp(-2*x)", from: 1, to: 2, value: R(F(2) - F(1)), name: "the density 2e⁻²ˣ has area 0.117 between 1 and 2" }] });
}
// ---------- u12-14 expected gain ----------
mk("u12-14", "maths-u12-expected-gain", "barchart", "A £2 game with a £10 prize",
  "In six equally likely rolls the player wins £8 net once and loses £2 five times: (8 − 5 × 2)/6 = −1/3, so about −33p a game.",
  "Bar chart of six equally likely rolls: five bars of net −£2 and one of net +£8, with mean −1/3.",
  ["Net result is −£2 on five of the six faces and £10 − £2 = +£8 on a six.", "Weighting by frequency, the mean is (5 × (−2) + 1 × 8)/6 = −1/3."],
  { categories: [-2, 8], values: [5, 1], range: { y: [0, 6] }, ticks: [1, 2, 3, 4, 5, 6], axisLabels: ["net gain (£)", "faces (of 6)"], highlight: [1], checks: [{ type: "total", value: 6 }, { type: "mean", value: "-1/3" }] });
// ---------- u12-19 stays a lab, 20 CLT ----------
{
  const mu = 350, sd = Math.sqrt(100 * 35 / 12), z = (370.5 - mu) / sd, p = 1 - phi(z);
  mk("u12-20", "maths-u12-clt-dice-total", "distribution", "The total of 100 dice is nearly normal",
    `The total has mean 350 and SD ${R(sd, 2)}. With the continuity correction, P(total > 370) = P(total ≥ 371) ≈ P(Z > ${R(z, 2)}) ≈ ${R(p, 3)}.`,
    `A normal curve with mean 350 and standard deviation ${R(sd, 2)}, shaded to the right of 370.5, area about ${R(p, 3)}.`,
    ["Each roll has mean 3.5 and variance 35/12, so 100 rolls total 350 with variance 291.7.", "The central limit theorem makes the total approximately normal.", "Shade the tail above 370.5 (continuity correction): z ≈ 1.20, area ≈ 0.115."],
    { dist: { dist: "normal", mu, sigma: R(sd, 6) }, range: { x: [290, 410], y: [0, 0.03] }, ticks: [[300, 325, 350, 375, 400], [0.01, 0.02, 0.03]], axisLabels: ["total of 100 rolls", "density"], shade: [370.5, null], p: R(p, 3), dp: 3,
      checks: [{ type: "mean", value: 350 }, { type: "prob", from: 370.5, to: null, p: R(p, 3) }] });
}
// ---------- u12-21 Bernoulli ----------
mk("u12-21", "maths-u12-bernoulli-kick", "barchart", "A free kick: Bernoulli(0.3)",
  "Out of 10 equally likely shares, 7 are misses (X = 0) and 3 are goals (X = 1), so the mean is 0.3 and the SD is √(0.3 × 0.7) ≈ 0.458.",
  "Bar chart with X = 0 at height 7 and X = 1 at height 3, in tenths.",
  ["P(X = 1) = 0.3 and P(X = 0) = 0.7.", "The mean of an indicator variable is the probability of the 1: E(X) = 0.3."],
  { categories: [0, 1], values: [7, 3], range: { y: [0, 8] }, ticks: [2, 4, 6, 8], axisLabels: ["X", "probability (tenths)"], highlight: [1], checks: [{ type: "total", value: 10 }, { type: "mean", value: "3/10" }] });
// ---------- u12-22 binomial ----------
{
  const p01 = binomialPmf(0, 10, 0.2) + binomialPmf(1, 10, 0.2);
  mk("u12-22", "maths-u12-binomial-10-0-2", "distribution", "B(10, 0.2): at most one success",
    `P(X = 2) = ${R(binomialPmf(2, 10, 0.2))} and P(X ≤ 1) = ${R(binomialPmf(0, 10, 0.2))} + ${R(binomialPmf(1, 10, 0.2))} = ${R(p01)}: the two shaded bars at 0 and 1.`,
    `Bar chart of the binomial distribution B(10, 0.2); the bars at 0 and 1 are shaded, total ${R(p01)}.`,
    ["The bars give P(X = k) for k = 0 to 10; the mean is 2 and the tallest bars are at 1 and 2.", `The shaded bars at 0 and 1 add to ${R(p01)} = P(X ≤ 1).`],
    { dist: { dist: "binomial", n: 10, p: 0.2 }, range: { x: [-0.5, 10.5], y: [0, 0.4] }, ticks: [[0, 2, 4, 6, 8, 10], [0.1, 0.2, 0.3, 0.4]], axisLabels: ["successes", "probability"], shade: [0, 1], p: R(p01),
      checks: [{ type: "mean", value: 2 }, { type: "variance", value: 1.6 }, { type: "prob", from: 0, to: 1, p: R(p01) }, { type: "prob", from: 2, to: 2, p: R(binomialPmf(2, 10, 0.2)) }] });
}
// ---------- u12-23 geometric ----------
mk("u12-23", "maths-u12-geometric-six", "distribution", "Waiting for a six",
  "The first six on the 4th roll means three non-sixes then a six: (5/6)³ × 1/6 = 125/1296 ≈ 0.0965. The mean wait is 1/p = 6 rolls.",
  "Bar chart of the geometric distribution with p = 1/6 for rolls 1 to 20; the bar at 4 is shaded.",
  ["Each bar is P(first six on roll k), falling by a factor 5/6 each step.", "The bar at k = 4 has height (5/6)³ × 1/6 ≈ 0.0965."],
  { dist: { dist: "geometric", p: 1 / 6, kMax: 40 }, range: { x: [0.5, 20.5], y: [0, 0.2] }, ticks: [[1, 5, 10, 15, 20], [0.05, 0.1, 0.15, 0.2]], axisLabels: ["roll of the first six", "probability"], shade: [4, 4], p: R(125 / 1296),
    checks: [{ type: "prob", from: 4, to: 4, p: R(125 / 1296) }] });
// ---------- u12-25 hypergeometric ----------
{
  const C = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return Math.round(r); };
  const ways = [0, 1, 2, 3, 4].map((k) => C(5, k) * C(7, 4 - k)), tot = C(12, 4);
  mk("u12-25", "maths-u12-hypergeometric-ways", "barchart", "Choosing 4 balls from 5 red and 7 blue",
    `The ${tot} equally likely choices split by number of reds as ${ways.join(", ")}. Exactly 2 red: ${ways[2]}/${tot} = 14/33.`,
    `Bar chart of the number of the ${tot} ways to choose 4 balls that contain 0 to 4 red: ${ways.join(", ")}; the bar for 2 is highlighted.`,
    [`There are C(12, 4) = ${tot} ways to choose 4 balls.`, "With k red, there are C(5, k) × C(7, 4 − k) ways: 35, 175, 210, 70, 5.", `Exactly 2 red: ${ways[2]} of ${tot}, which is 14/33.`],
    { categories: [0, 1, 2, 3, 4], values: ways, range: { y: [0, 250] }, ticks: [50, 100, 150, 200, 250], axisLabels: ["red balls chosen", "ways (of 495)"], highlight: [2],
      checks: [{ type: "total", value: tot }, { type: "mode", value: 2 }, { type: "mean", value: "5/3" }] });
}
// ---------- u12-26 Poisson 2.5 ----------
mk("u12-26", "maths-u12-poisson-emails", "distribution", "Emails per hour: Poisson(2.5)",
  `P(exactly 3) = e⁻²·⁵ × 2.5³/3! = ${R(poissonPmf(3, 2.5))}, the shaded bar; P(at least 1) = 1 − e⁻²·⁵ = ${R(1 - Math.exp(-2.5))}.`,
  `Bar chart of the Poisson distribution with mean 2.5 for 0 to 10 emails; the bar at 3 is shaded with height ${R(poissonPmf(3, 2.5))}.`,
  ["The bars give P(X = k) for a Poisson distribution with mean 2.5.", `The bar at 3 reaches ${R(poissonPmf(3, 2.5))}.`],
  { dist: { dist: "poisson", lambda: 2.5 }, range: { x: [-0.5, 10.5], y: [0, 0.3] }, ticks: [[0, 2, 4, 6, 8, 10], [0.1, 0.2, 0.3]], axisLabels: ["emails in an hour", "probability"], shade: [3, 3], p: R(poissonPmf(3, 2.5)),
    checks: [{ type: "mean", value: 2.5 }, { type: "prob", from: 3, to: 3, p: R(poissonPmf(3, 2.5)) }, { type: "prob", from: 1, to: 60, p: R(1 - Math.exp(-2.5)) }] });
// ---------- u12-28 beta-binomial alpha = beta = 1, n = 2 ----------
mk("u12-28", "maths-u12-beta-binomial-uniform", "barchart", "Beta-binomial with α = β = 1 and n = 2",
  "With a uniform prior on p, the number of successes in 2 trials is equally likely to be 0, 1 or 2: each has probability 1/3, mean 1.",
  "Bar chart with three equal bars at X = 0, 1, 2, each one third.",
  ["Averaging the binomial probabilities over a uniform p gives P(X = k) = 1/(n + 1) for every k.", "With n = 2, each of 0, 1, 2 has probability 1/3."],
  { categories: [0, 1, 2], values: [1, 1, 1], range: { y: [0, 1.5] }, ticks: [0.5, 1], axisLabels: ["successes", "probability (thirds)"], checks: [{ type: "total", value: 3 }, { type: "mean", value: 1 }] });
// ---------- u12-29 uniform bus ----------
mk("u12-29", "maths-u12-bus-wait", "distribution", "A bus every 12 minutes",
  "Your wait is uniform on 0 to 12 minutes: P(wait > 8) = 4/12 = 1/3, mean 6 and SD 12/√12 ≈ 3.46 minutes.",
  "A flat density of height 1/12 from 0 to 12 minutes with the part from 8 to 12 shaded.",
  ["The density is flat at 1/12 over 0 to 12.", "The shaded rectangle from 8 to 12 has area 4 × 1/12 = 1/3."],
  { dist: { dist: "uniform", a: 0, b: 12 }, range: { x: [-2, 14], y: [0, 0.12] }, ticks: [[0, 4, 8, 12], [0.04, 0.08, 0.12]], axisLabels: ["wait (minutes)", "density"], shade: [8, 12], p: R(1 / 3),
    checks: [{ type: "mean", value: 6 }, { type: "variance", value: 12 }, { type: "prob", from: 8, to: 12, p: R(1 / 3) }] });
// ---------- u12-30 normal heights ----------
{
  const p = 1 - normalCdf(180, 170, 8), z90 = 1.2815515655, q = 170 + z90 * 8;
  mk("u12-30", "maths-u12-heights-normal", "distribution", "Adult heights N(170, 8²)",
    `180 cm is z = 1.25 above the mean, so P(height > 180) = ${R(p)}. The 90th percentile is 170 + 1.2816 × 8 ≈ ${R(q, 1)} cm.`,
    `A normal curve with mean 170 and SD 8, shaded to the right of 180 cm, area ${R(p)}.`,
    ["The curve is centred at 170 with SD 8.", "180 is 1.25 standard deviations above the mean.", `The tail above 180 has area ${R(p)}.`],
    { dist: { dist: "normal", mu: 170, sigma: 8 }, range: { x: [140, 200], y: [0, 0.055] }, ticks: [[146, 154, 162, 170, 178, 186, 194], [0.02, 0.04]], axisLabels: ["height (cm)", "density"], shade: [180, null], p: R(p),
      checks: [{ type: "mean", value: 170 }, { type: "prob", from: 180, to: null, p: R(p) }, { type: "prob", from: null, to: R(q, 3), p: 0.9, name: "the 90th percentile 180.25 cm leaves 0.9 below" }] });
}
// ---------- u12-31 standard normal ----------
{
  const p = normalCdf(1) - normalCdf(-1.5);
  mk("u12-31", "maths-u12-standard-normal-band", "distribution", "P(−1.5 < Z < 1)",
    `Φ(1) − Φ(−1.5) = 0.8413 − 0.0668 = ${R(p)}: the shaded band between −1.5 and 1 under the standard normal curve.`,
    `Standard normal curve with the area between z = −1.5 and z = 1 shaded, ${R(p)}.`,
    ["Φ(1) = 0.8413 is the area to the left of 1.", "Φ(−1.5) = 0.0668 is the area to the left of −1.5.", `The band between has area ${R(p)}.`],
    { dist: { dist: "normal", mu: 0, sigma: 1 }, range: { x: [-4, 4], y: [0, 0.45] }, ticks: [[-3, -2, -1, 0, 1, 2, 3], [0.1, 0.2, 0.3, 0.4]], axisLabels: ["z", "density"], shade: [-1.5, 1], p: R(p),
      checks: [{ type: "mean", value: 0 }, { type: "variance", value: 1 }, { type: "prob", from: -1.5, to: 1, p: R(p) }] });
}
// ---------- u12-32 exponential bulbs ----------
{
  const p = Math.exp(-1.5);
  mk("u12-32", "maths-u12-bulb-lifetime", "distribution", "Bulb lifetimes: exponential with mean 1,000 h",
    `The rate is 1/1,000 per hour, so P(lasts > 1,500) = e⁻¹·⁵ = ${R(p)} (the shaded tail). The median is 1,000 ln 2 ≈ 693 hours.`,
    `Exponential density with mean 1,000 hours, decaying from 0.001; the tail beyond 1,500 hours is shaded, area ${R(p)}.`,
    ["The density starts at the rate λ = 0.001 and decays.", `The shaded tail beyond 1,500 hours has area e⁻¹·⁵ = ${R(p)}.`],
    { dist: { dist: "exponential", lambda: 0.001 }, range: { x: [0, 4000], y: [0, 0.0011] }, ticks: [[0, 1000, 2000, 3000, 4000], [0.001]], axisLabels: ["lifetime (hours)", "density"], shade: [1500, null], p: R(p),
      checks: [{ type: "mean", value: 1000 }, { type: "prob", from: 1500, to: null, p: R(p) }, { type: "prob", from: 0, to: R(1000 * Math.log(2), 3), p: 0.5, name: "the median 693 hours leaves 0.5 below" }] });
}
// ---------- u12-33 gamma via Poisson ----------
{
  const p = Math.exp(-2) * 5;
  mk("u12-33", "maths-u12-gamma-poisson", "distribution", "T > 1 means at most 2 calls in the first minute",
    `The 3rd call comes after time 1 exactly when the count N of calls in the first minute is 0, 1 or 2, where N ~ Poisson(2): P(T > 1) = e⁻²(1 + 2 + 2) = ${R(p)}.`,
    `Bar chart of the Poisson distribution with mean 2; the bars at 0, 1 and 2 are shaded, total ${R(p)}.`,
    ["In one minute the number of calls is Poisson with mean 2.", "T > 1 minute means fewer than 3 calls have arrived.", `The three shaded bars add to 5e⁻² = ${R(p)}.`],
    { dist: { dist: "poisson", lambda: 2 }, range: { x: [-0.5, 9.5], y: [0, 0.3] }, ticks: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0.1, 0.2, 0.3]], axisLabels: ["calls in the first minute", "probability"], shade: [0, 2], p: R(p),
      checks: [{ type: "mean", value: 2 }, { type: "prob", from: 0, to: 2, p: R(p) }] });
}
// ---------- u12-34 beta prior and posterior ----------
mk("u12-34", "maths-u12-beta-posterior", "graph", "Beta(2, 2) prior and Beta(9, 5) posterior",
  "Seven heads and three tails add 7 to α and 3 to β: Beta(2, 2) becomes Beta(9, 5), narrower and shifted right, with mean 9/14 ≈ 0.643.",
  "Two curves on [0, 1]: a broad Beta(2, 2) prior centred at 0.5 and a taller, narrower Beta(9, 5) posterior peaking near 0.67.",
  ["The prior 6x(1 − x) is symmetric about 0.5.", "After 7 heads and 3 tails the density is proportional to x⁸(1 − x)⁴, which is Beta(9, 5).", "Its peak is at 8/12 = 2/3 and its mean 9/14."],
  { range: { x: [0, 1], y: [0, 3.6] }, ticks: [[0.25, 0.5, 0.75, 1], [1, 2, 3]], axisLabels: ["p", "density"], legend: [["prior Beta(2, 2)", "a1"], ["posterior Beta(9, 5)", "a2"]], legendData: [0.03, 3.4],
    curves: [{ expr: "6*x*(1-x)", colour: "a1" }, { expr: "6435*x^8*(1-x)^4", colour: "a2" }],
    checks: [{ type: "area", expr: "6*x*(1-x)", from: 0, to: 1, value: 1, name: "the prior has area 1" }, { type: "area", expr: "6435*x^8*(1-x)^4", from: 0, to: 1, value: 1, name: "the posterior 6435x⁸(1 − x)⁴ has area 1" },
      { type: "max", expr: "6435*x^8*(1-x)^4", domain: [0, 1], x: R(2 / 3, 2), y: R(6435 * (2 / 3) ** 8 * (1 / 3) ** 4, 3), name: "the posterior peaks at 2/3" }, { type: "area", expr: "x*6435*x^8*(1-x)^4", from: 0, to: 1, value: R(9 / 14, 4), name: "the posterior mean is 9/14" }] });
// ---------- u12-35 chi-squared with one degree of freedom ----------
mk("u12-35", "maths-u12-chi-squared-critical", "graph", "χ²₁ and its 5% upper tail",
  "χ²₁ is the square of a standard normal, so χ²₁ > 3.841 exactly when |Z| > 1.96: the shaded tail beyond 3.841 has area 0.05.",
  "Graph of the χ² density with 1 degree of freedom, very tall near 0 and falling; the tail beyond 3.841 is shaded.",
  ["The χ²₁ density is e^(−x/2)/√(2πx): unbounded at 0 and decreasing.", "The area to the right of 3.841 is 0.05, the 5% critical value."],
  { range: { x: [0, 10], y: [0, 0.6] }, ticks: [[2, 4, 6, 8, 10], [0.2, 0.4, 0.6]], axisLabels: ["x", "density"], curves: [{ expr: "exp(-x/2)/sqrt(2*3.141592653589793*x)", domain: [0.04, 10], samples: 400 }],
    areas: [{ expr: "exp(-x/2)/sqrt(2*3.141592653589793*x)", from: 3.841, to: 10, colour: "a2" }], marks: [{ x: 3.841, label: "3.841", dx: 6 }],
    checks: [{ type: "area", expr: "exp(-x/2)/sqrt(2*3.141592653589793*x)", from: 3.841, to: 60, value: 0.05, tol: 0.001, name: "the tail beyond 3.841 has area 0.05" }] });
// ---------- u12-36 t confidence interval ----------
{
  const m = 52, h = 2.262 * 4 / Math.sqrt(10), lo = m - h, hi = m + h;
  mk("u12-36", "maths-u12-t-interval", "number-line", "A 95% t interval",
    `With t₉ = 2.262 the margin is 2.262 × 4/√10 ≈ ${R(h, 2)}, so the interval is ${R(lo, 2)} to ${R(hi, 2)} around x̄ = 52.`,
    `A number line from 48 to 56 with the interval from ${R(lo, 2)} to ${R(hi, 2)} and the sample mean 52 at its centre.`,
    ["The sample mean 52 is the centre.", `The margin is 2.262 × 4/√10 ≈ ${R(h, 2)}.`, `The interval runs from ${R(lo, 2)} to ${R(hi, 2)}.`],
    { range: [48, 56], ticks: { step: 1 }, points: [{ value: R(lo, 2), label: R(lo, 2).toString() }, { value: 52, label: "x̄ = 52", colour: "a4" }, { value: R(hi, 2), label: R(hi, 2).toString() }],
      intervals: [{ from: R(lo, 2), to: R(hi, 2), closed: [true, true] }],
      checks: [{ type: "value", tol: 1e-5, expr: "52+2.262*4/sqrt(10)", value: R(hi, 6).toString(), name: "52 + 2.262 × 4/√10 = " + R(hi, 2) }, { type: "value", tol: 1e-5, expr: "52-2.262*4/sqrt(10)", value: R(lo, 6).toString(), name: "52 − 2.262 × 4/√10 = " + R(lo, 2) }] });
}
// ---------- u12-38 Weibull survival ----------
{
  const S = (x) => Math.exp(-((x / 1000) ** 2)), med = 1000 * Math.sqrt(Math.log(2));
  mk("u12-38", "maths-u12-weibull-survival", "graph", "Weibull survival, λ = 1,000 h and k = 2",
    `The survival function S(x) = e^(−(x/1000)²) gives P(survive 500 h) = e⁻⁰·²⁵ = ${R(S(500))}. It falls to 0.5 at the median 1,000√(ln 2) ≈ ${R(med, 1)} hours.`,
    `Graph of S(x) = exp(−(x/1000)²) falling from 1, with points (500, ${R(S(500), 3)}) and the median at height 0.5.`,
    ["S(x) is the probability of lasting beyond x hours.", `At 500 hours, S = ${R(S(500))}.`, `S = 0.5 at x ≈ ${R(med, 1)}.`],
    { range: { x: [0, 2000], y: [0, 1.1] }, ticks: [[500, 1000, 1500, 2000], [0.25, 0.5, 0.75, 1]], axisLabels: ["hours", "S(x)"], curves: [{ expr: "exp(-(x/1000)^2)" }],
      points: [{ x: 500, y: R(S(500)), label: `${R(S(500), 3)}`, dx: 10, dy: -14 }, { x: R(med, 2), y: 0.5, label: "median 832.6 h", dx: 10, dy: -14 }],
      checks: [{ type: "point", expr: "exp(-(x/1000)^2)", x: 500, y: R(S(500)) }, { type: "point", expr: "exp(-(x/1000)^2)", x: R(med, 2), y: 0.5, name: "S(832.55) = 0.5" }] });
}
// ---------- u12-39 log-normal ----------
{
  const f = "exp(-log(x)^2/2)/(x*sqrt(2*3.141592653589793))", p = 1 - normalCdf(1);
  mk("u12-39", "maths-u12-lognormal-density", "graph", "Log-normal density with ln X ~ N(0, 1)",
    `The median is e⁰ = 1, the mean is e^½ ≈ ${R(Math.exp(0.5), 3)} (pulled right by the long tail) and P(X > e) = P(Z > 1) = ${R(p)}.`,
    "Graph of the log-normal density rising sharply to a peak below 1 and then falling with a long right tail; the area beyond e is shaded.",
    ["The curve is skewed right: the mean exceeds the median.", `The shaded tail beyond e ≈ 2.718 has area ${R(p)}.`],
    { range: { x: [0, 8], y: [0, 0.8] }, ticks: [[1, 2, 3, 4, 5, 6, 7, 8], [0.2, 0.4, 0.6, 0.8]], axisLabels: ["x", "density"], curves: [{ expr: f, domain: [0.02, 8], samples: 400 }], areas: [{ expr: f, from: Math.E, to: 8, colour: "a2" }], marks: [{ x: 1, label: "median 1", dx: 6 }],
      checks: [{ type: "area", expr: f, from: Math.exp(-5), to: Math.exp(5), value: 1, tol: 0.01, name: "the density has area 1" }, { type: "area", expr: f, from: Math.E, to: 150, value: R(p), tol: 0.005, name: "P(X > e) = P(Z > 1) = 0.1587" },
        { type: "area", expr: f, from: Math.exp(-5), to: 1, value: 0.5, tol: 0.01, name: "half the area lies below the median 1" }] });
}
// ---------- u12-40 Pareto ----------
mk("u12-40", "maths-u12-pareto-density", "graph", "Pareto with xₘ = 1 and α = 2",
  "The density 2/x³ starts at 2 and falls steeply. P(X > 4) = 1/16, the median is √2 ≈ 1.41 and the mean is α xₘ/(α − 1) = 2.",
  "Graph of the density 2/x³ for x ≥ 1 with the tail beyond 4 shaded.",
  ["The density is 2/x³ for x ≥ 1.", "The tail beyond 4 has area 1/4² = 1/16.", "The area from 1 to √2 is 1/2, so the median is √2."],
  { range: { x: [0, 8], y: [0, 2.4] }, ticks: [[1, 2, 4, 6, 8], [1, 2]], axisLabels: ["x", "density"], curves: [{ expr: "2/x^3", domain: [1, 8] }], areas: [{ expr: "2/x^3", from: 4, to: 8, colour: "a2" }], marks: [{ x: R(Math.SQRT2, 3), label: "median √2", dx: 6 }],
    checks: [{ type: "area", expr: "2/x^3", from: 4, to: 3000, value: 1 / 16, tol: 0.002, name: "P(X > 4) = 1/16" }, { type: "area", expr: "2/x^3", from: 1, to: Math.SQRT2, value: 0.5, name: "half the area lies below √2" }, { type: "area", expr: "x*2/x^3", from: 1, to: 3000, value: 2, tol: 0.01, name: "the mean is 2" }] });
// ---------- u12-41 Cauchy ----------
mk("u12-41", "maths-u12-cauchy-density", "graph", "The standard Cauchy density",
  "The density 1/(π(1 + x²)) has area 1/2 between −1 and 1, so P(|X| < 1) = 1/2, and P(X > 1) = 1/4. Its tails are so heavy that the mean does not exist.",
  "A bell-shaped curve with a heavy tail on each side; the area between −1 and 1 is shaded.",
  ["The curve peaks at 1/π ≈ 0.318 at 0 and falls only like 1/x² in the tails.", "The area between −1 and 1 is 1/2.", "The area to the right of 1 is 1/4."],
  { range: { x: [-6, 6], y: [0, 0.4] }, ticks: [[-4, -2, 0, 2, 4], [0.1, 0.2, 0.3, 0.4]], axisLabels: ["x", "density"], curves: [{ expr: "1/(3.141592653589793*(1+x^2))" }], areas: [{ expr: "1/(3.141592653589793*(1+x^2))", from: -1, to: 1, colour: "a2" }],
    checks: [{ type: "area", expr: "1/(3.141592653589793*(1+x^2))", from: -1, to: 1, value: 0.5, name: "P(|X| < 1) = 1/2" }, { type: "area", expr: "1/(3.141592653589793*(1+x^2))", from: 0, to: 1, value: 0.25, name: "P(0 < X < 1) = 1/4, so P(X > 1) = 1/2 − 1/4 = 1/4" }] });
// ---------- u12-42 bivariate normal: regression to the mean ----------
mk("u12-42", "maths-u12-heights-regression", "graph", "Predicting a son's height from his father's",
  "With ρ = 0.5 and equal SDs the best prediction is 175 + 0.5(189 − 175) = 182 cm: halfway back towards the mean, below the line y = x.",
  "Graph with the dashed line y = x and the regression line y = 175 + 0.5(x − 175); the point (189, 182) lies on the regression line.",
  ["A father of 189 cm is 14 cm above the mean.", "The expected son's height moves only ρ = 0.5 of that: 7 cm above the mean.", "The prediction (189, 182) lies on the regression line, below y = x."],
  { range: { x: [155, 195], y: [155, 195] }, ticks: [[160, 170, 180, 190], [160, 170, 180, 190]], axisLabels: ["father (cm)", "son (cm)"], legend: [["y = x", "a1"], ["E(son ∣ father)", "a2"]], legendData: [157, 192],
    curves: [{ expr: "x", colour: "a1", dash: "6 5" }, { expr: "175+0.5*(x-175)", colour: "a2" }], points: [{ x: 189, y: 182, label: "(189, 182)", dx: 10, dy: 16 }],
    checks: [{ type: "point", expr: "175+0.5*(x-175)", x: 189, y: 182 }, { type: "point", expr: "175+0.5*(x-175)", x: 175, y: 175, name: "the line passes through the mean point (175, 175)" }] });
// ---------- u12-44 Dirichlet posterior ----------
mk("u12-44", "maths-u12-dirichlet-posterior", "bar-model", "Dir(1, 1, 1) plus counts (5, 3, 2)",
  "Adding the counts to the prior parameters gives Dir(6, 4, 3), total 13; the posterior mean of p₁ is its share, 6/13 ≈ 0.46.",
  "A single bar split into three parts of sizes 6, 4 and 3, for p₁, p₂ and p₃, total 13.",
  ["Prior parameters (1, 1, 1) plus counts (5, 3, 2) give (6, 4, 3).", "The posterior mean of each pᵢ is its parameter over the total 13; for p₁ that is 6/13."],
  { bars: [{ label: "posterior parameters", parts: [{ value: 6, label: "p₁: 6" }, { value: 4, label: "p₂: 4" }, { value: 3, label: "p₃: 3" }] }], braces: [{ bar: 0, from: 0, to: 2, value: 13 }], checks: [{ type: "ratio", bar: 0, ratio: [6, 4, 3], total: 13 }] });
// ---------- u12-46 mixture ----------
{
  const f = "0.5*exp(-x^2/2)/sqrt(2*3.141592653589793)+0.5*exp(-(x-4)^2/2)/sqrt(2*3.141592653589793)";
  mk("u12-46", "maths-u12-mixture-density", "graph", "A 50:50 mixture of N(0, 1) and N(4, 1)",
    "The mixture has two peaks. Its mean is 0.5 × 0 + 0.5 × 4 = 2, and its variance is 1 + 4 = 5: the within-component variance plus the spread of the component means.",
    "A curve with two bumps centred at 0 and 4, each of height about 0.2; the mean 2 is marked between them.",
    ["The density is the average of the two normal densities.", "The mean is 2, halfway between, where there is little probability.", "Variance = average component variance 1 + variance of the means 4 = 5."],
    { range: { x: [-4, 8], y: [0, 0.25] }, ticks: [[-4, -2, 0, 2, 4, 6, 8], [0.1, 0.2]], axisLabels: ["x", "density"], curves: [{ expr: f, samples: 400 }], marks: [{ x: 2, label: "mean 2", dx: 6 }],
      checks: [{ type: "area", expr: f, from: -12, to: 16, value: 1, name: "the mixture density has area 1" }, { type: "area", expr: `x*(${f})`, from: -12, to: 16, value: 2, name: "the mean is 2" }, { type: "area", expr: `(x-2)^2*(${f})`, from: -12, to: 16, value: 5, tol: 0.01, name: "the variance is 5" }] });
}
// ---------- u12-50 Gumbel return level ----------
{
  const lvl = 3 - 0.5 * Math.log(-Math.log(0.99)), G = (x) => Math.exp(-Math.exp(-(x - 3) / 0.5));
  mk("u12-50", "maths-u12-gumbel-return-level", "graph", "The 100-year return level",
    `A level exceeded once in 100 years has cdf 0.99: μ − β ln(−ln 0.99) = 3 + 0.5 × ${R(-Math.log(-Math.log(0.99)), 3)} ≈ ${R(lvl, 2)} m.`,
    `Graph of the Gumbel cdf with μ = 3 and β = 0.5 rising from 0 to 1; the point (${R(lvl, 2)}, 0.99) marks the 100-year level.`,
    ["The cdf rises steeply near the typical maximum 3 m and creeps up towards 1.", `It reaches 0.99 at ${R(lvl, 2)} m.`],
    { range: { x: [1, 7], y: [0, 1.1] }, ticks: [[2, 3, 4, 5, 6, 7], [0.25, 0.5, 0.75, 1]], axisLabels: ["annual maximum level (m)", "cdf"], curves: [{ expr: "exp(-exp(-(x-3)/0.5))" }], marks: [{ y: 0.99, label: "0.99", dx: 0 }],
      points: [{ x: R(lvl, 3), y: R(G(lvl), 3), label: `${R(lvl, 2)} m`, dx: -10, dy: 18, anchor: "end" }],
      checks: [{ type: "point", expr: "exp(-exp(-(x-3)/0.5))", x: R(lvl, 3), y: 0.99, name: `F(${R(lvl, 2)}) = 0.99` }] });
}
