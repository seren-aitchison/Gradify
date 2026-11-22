// School 13, Statistics: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u13.mjs
import { mk } from "./spec.mjs";
import { normalCdf, binomialPmf } from "../../../kit/diagrams/maths-core.js";

const R = (x, d = 4) => +x.toFixed(d);
const PI = 3.141592653589793;
const nrm = (mu, sd) => `exp(-(x-${mu})^2/(2*${sd}^2))/(${sd}*sqrt(2*${PI}))`;

// ---------- u13-01 descriptive: boxplot with an outlier ----------
mk("u13-01", "maths-u13-boxplot-outlier", "boxplot", "Seven values and one outlier",
  "Median 5, quartiles 4 and 9, so IQR = 5 and the fences are 4 − 7.5 and 9 + 7.5 = 16.5: the value 30 lies beyond the upper fence and is drawn as an outlier.",
  "A box plot of 2, 4, 4, 5, 7, 9, 30: box from 4 to 9 with median 5, whisker to 2 and 9, and the value 30 plotted separately as an outlier.",
  ["The median is the middle value, 5; the quartiles are 4 and 9, so the box spans 4 to 9 (IQR 5).", "The upper fence is 9 + 1.5 × 5 = 16.5; the lower fence is −3.5.", "30 is beyond 16.5, so it is an outlier and the whisker stops at 9."],
  { method: "halves", range: { x: [0, 32] }, ticks: [0, 5, 10, 15, 20, 25, 30], plots: [{ label: "data", data: [2, 4, 4, 5, 7, 9, 30], summary: [2, 4, 5, 9, 9], outliers: [30] }] });
// ---------- u13-02 correlation ----------
mk("u13-02", "maths-u13-correlation-r", "scatter", "r for five points",
  "The points (1, 2) to (5, 5) have means 3 and 4, S_xy = 6, S_xx = 10, S_yy = 6, so r = 6/√60 ≈ 0.775 and the line of best fit is y = 2.2 + 0.6x.",
  "Scatter plot of five points rising on average with the fitted line y = 2.2 + 0.6x through the mean point (3, 4).",
  ["The points rise on average but with scatter.", "The mean point (3, 4) lies on the best-fit line.", "r = 6/√(10 × 6) ≈ 0.775."],
  { points: [[1, 2], [2, 4], [3, 5], [4, 4], [5, 5]], line: { a: 2.2, b: 0.6 }, r: R(6 / Math.sqrt(60), 3), meanPoint: true, range: { x: [0, 6], y: [0, 6] }, ticks: [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]], axisLabels: ["x", "y"] });
// ---------- u13-05 confidence interval for a proportion ----------
{
  const p = 88 / 400, se = Math.sqrt((p * (1 - p)) / 400), lo = p - 1.96 * se, hi = p + 1.96 * se;
  mk("u13-05", "maths-u13-proportion-interval", "number-line", "95% interval for the cycling proportion",
    `p̂ = 88/400 = 0.22 and SE = √(0.22 × 0.78/400) ≈ ${R(se, 4)}, so the interval is 0.22 ± 1.96 × ${R(se, 4)}: ${R(lo, 3)} to ${R(hi, 3)}.`,
    `A number line from 0.15 to 0.30 with the interval from ${R(lo, 3)} to ${R(hi, 3)} centred on 0.22.`,
    ["The sample proportion is 88/400 = 0.22.", `The margin is 1.96 × ${R(se, 4)} = ${R(1.96 * se, 3)}.`, `The interval is ${R(lo, 3)} to ${R(hi, 3)}.`],
    { range: [0.15, 0.3], ticks: { step: 0.05 }, minor: 0.01, tickLabels: { 0.15: "0.15", 0.2: "0.2", 0.25: "0.25", 0.3: "0.3" }, points: [{ value: R(lo, 3), label: `${R(lo, 3)}` }, { value: 0.22, label: "p̂ = 0.22", colour: "a4" }, { value: R(hi, 3), label: `${R(hi, 3)}` }],
      intervals: [{ from: R(lo, 3), to: R(hi, 3), closed: [true, true] }],
      checks: [{ type: "value", tol: 5e-4, expr: "0.22+1.96*sqrt(0.22*0.78/400)", value: R(hi, 3).toString() }, { type: "value", tol: 5e-4, expr: "0.22-1.96*sqrt(0.22*0.78/400)", value: R(lo, 3).toString() }] });
}
// ---------- u13-06 MSE = bias² + variance ----------
mk("u13-06", "maths-u13-mse-bars", "bar-model", "Mean squared error = bias² + variance",
  "A is unbiased: MSE = 0 + 4 = 4. B is biased: MSE = 1² + 2 = 3. The biased estimator B has the smaller MSE.",
  "Two bars: A of length 4 (variance 4) and B of length 3 made of bias² 1 and variance 2.",
  ["MSE splits into bias squared plus variance.", "A: 0 + 4 = 4.", "B: 1 + 2 = 3, which is smaller."],
  { bars: [{ label: "A", parts: [{ value: 4, label: "variance 4" }] }, { label: "B", parts: [{ value: 1, label: "bias² 1" }, { value: 2, label: "variance 2" }] }], braces: [{ bar: 0, from: 0, to: 0, value: 4 }, { bar: 1, from: 0, to: 1, value: 3 }],
    checks: [{ type: "ratio", bar: 1, ratio: [1, 2], total: 3 }] });
// ---------- u13-08 sampling distribution of the mean ----------
{
  const p = 1 - normalCdf(53, 50, 2);
  mk("u13-08", "maths-u13-sample-mean-tail", "distribution", "The mean of 36 observations",
    `X̄ has mean 50 and SE 12/√36 = 2, so 53 is z = 1.5 above: P(X̄ > 53) = ${R(p)}.`,
    `A normal curve with mean 50 and SD 2 for the sample mean, with the tail beyond 53 shaded, area ${R(p)}.`,
    ["The standard error is 12/6 = 2.", "53 is 1.5 standard errors above 50.", `The shaded tail has area ${R(p)}.`],
    { dist: { dist: "normal", mu: 50, sigma: 2 }, range: { x: [42, 58], y: [0, 0.22] }, ticks: [[44, 47, 50, 53, 56], [0.1, 0.2]], axisLabels: ["sample mean", "density"], shade: [53, null], p: R(p),
      checks: [{ type: "mean", value: 50 }, { type: "prob", from: 53, to: null, p: R(p) }] });
}
// ---------- u13-09 bounds under non-response ----------
mk("u13-09", "maths-u13-nonresponse-bounds", "number-line", "What non-response could hide",
  "240 of the 1,000 customers are known satisfied. If none of the 600 non-respondents were satisfied the rate is 24%; if all were, it is 84%: the sample only pins it between 0.24 and 0.84.",
  "A number line from 0 to 1 with an interval from 0.24 to 0.84, and the respondents' own rate 0.6 inside it.",
  ["400 respondents × 60% = 240 satisfied.", "Lowest possible rate: 240/1000 = 0.24.", "Highest: (240 + 600)/1000 = 0.84."],
  { range: [0, 1], ticks: { step: 0.2 }, points: [{ value: 0.24, label: "0.24" }, { value: 0.6, label: "respondents 0.6", colour: "a4" }, { value: 0.84, label: "0.84" }], intervals: [{ from: 0.24, to: 0.84, closed: [true, true] }],
    checks: [{ type: "value", expr: "400*0.6/1000", value: "0.24" }, { type: "value", expr: "(400*0.6+600)/1000", value: "0.84" }] });
// ---------- u13-10 confidence interval for a mean ----------
{
  const se = 3 / Math.sqrt(50), lo = 12.4 - 1.96 * se, hi = 12.4 + 1.96 * se;
  mk("u13-10", "maths-u13-mean-interval", "number-line", "95% interval for μ with known σ",
    `SE = 3/√50 ≈ ${R(se, 3)}, so x̄ ± 1.96 SE = 12.4 ± ${R(1.96 * se, 2)}: ${R(lo, 2)} to ${R(hi, 2)}.`,
    `A number line from 11 to 14 with the interval from ${R(lo, 2)} to ${R(hi, 2)} around 12.4.`,
    ["The standard error is 3/√50 ≈ 0.424.", `The margin is 1.96 × 0.424 = ${R(1.96 * se, 2)}.`, `The interval is ${R(lo, 2)} to ${R(hi, 2)}.`],
    { range: [11, 14], ticks: { step: 0.5 }, points: [{ value: R(lo, 2), label: `${R(lo, 2)}` }, { value: 12.4, label: "x̄ = 12.4", colour: "a4" }, { value: R(hi, 2), label: `${R(hi, 2)}` }], intervals: [{ from: R(lo, 2), to: R(hi, 2), closed: [true, true] }],
      checks: [{ type: "value", tol: 5e-3, expr: "12.4+1.96*3/sqrt(50)", value: R(hi, 2).toString() }, { type: "value", tol: 5e-3, expr: "12.4-1.96*3/sqrt(50)", value: R(lo, 2).toString() }] });
}
// ---------- u13-11 maximum likelihood ----------
mk("u13-11", "maths-u13-exponential-likelihood", "graph", "The log-likelihood peaks at λ̂ = 0.3",
  "For waiting times 2, 3, 5 the log-likelihood is 3 ln λ − 10λ, which is largest at λ = 3/10 = 0.3: the maximum likelihood estimate.",
  "Graph of 3 ln λ − 10λ against λ, rising steeply, peaking at λ = 0.3 and then falling slowly.",
  ["With n = 3 and total 10, ln L(λ) = 3 ln λ − 10λ.", "Its derivative 3/λ − 10 is zero at λ = 0.3.", "The curve has its maximum there."],
  { range: { x: [0, 1], y: [-12, -6] }, ticks: [[0.2, 0.4, 0.6, 0.8, 1], [-11, -10, -9, -8, -7]], axisLabels: ["λ", "ln L"], curves: [{ expr: "3*log(x)-10*x", domain: [0.05, 1] }], marks: [{ x: 0.3, label: "λ̂ = 0.3", dx: 6 }],
    checks: [{ type: "max", expr: "3*log(x)-10*x", domain: [0.05, 1], x: 0.3, y: R(3 * Math.log(0.3) - 3, 4), name: "the log-likelihood is largest at λ = 0.3" }] });
// ---------- u13-13 coin 15 heads in 20 ----------
{
  let p = 0; for (let k = 15; k <= 20; k++) p += binomialPmf(k, 20, 0.5);
  mk("u13-13", "maths-u13-coin-test", "distribution", "15 heads in 20 tosses of a fair coin",
    `Under H₀ the number of heads is B(20, 0.5). P(X ≥ 15) = ${R(p)}, below 5%, so 15 heads is unusual enough to reject fairness.`,
    `Bar chart of B(20, 0.5) with bars 15 to 20 shaded, total ${R(p)}.`,
    ["Under H₀ the count is B(20, 0.5), centred at 10.", `The shaded bars from 15 up add to ${R(p)}.`, "That is below 0.05, so reject H₀."],
    { dist: { dist: "binomial", n: 20, p: 0.5 }, range: { x: [-0.5, 20.5], y: [0, 0.2] }, ticks: [[0, 5, 10, 15, 20], [0.05, 0.1, 0.15, 0.2]], axisLabels: ["heads", "probability"], shade: [15, 20], p: R(p),
      checks: [{ type: "mean", value: 10 }, { type: "prob", from: 15, to: 20, p: R(p) }] });
}
// ---------- u13-15 p-value ----------
{
  const p = 2 * (1 - normalCdf(2.3));
  mk("u13-15", "maths-u13-two-sided-p", "distribution", "The p-value for z = 2.3",
    `The shaded tail beyond 2.3 has area ${R(1 - normalCdf(2.3))}; a two-sided test doubles it: p = ${R(p)}.`,
    `Standard normal curve with the upper tail beyond z = 2.3 shaded, area ${R(1 - normalCdf(2.3))}, to be doubled for the two-sided p-value.`,
    ["Under H₀ the statistic is standard normal.", `The area beyond 2.3 is ${R(1 - normalCdf(2.3))}.`, `Two-sided: double it, ${R(p)}.`],
    { dist: { dist: "normal", mu: 0, sigma: 1 }, range: { x: [-4, 4], y: [0, 0.45] }, ticks: [[-3, -2, -1, 0, 1, 2, 3], [0.1, 0.2, 0.3, 0.4]], axisLabels: ["z", "density"], shade: [2.3, null], p: R(1 - normalCdf(2.3)), dp: 4,
      checks: [{ type: "prob", from: 2.3, to: null, p: R(1 - normalCdf(2.3)) }] });
}
// ---------- u13-16 type I and II errors ----------
{
  const a = 1 - normalCdf(105, 100, 3), b = normalCdf(105, 110, 3);
  mk("u13-16", "maths-u13-type-errors", "graph", "Type I and Type II errors",
    `Reject when x̄ > 105. Under H₀ (μ = 100, SE 3) the area beyond 105 is α ≈ ${R(a, 3)}; under μ = 110 the area below 105 is β ≈ ${R(b, 3)}, so power ≈ ${R(1 - b, 3)}.`,
    "Two normal curves for the sample mean, centred at 100 and 110, each with SD 3, and a dashed line at 105; the tail of the left curve beyond 105 and of the right curve below 105 are shaded.",
    ["Both distributions have standard error 15/5 = 3.", `α is the area of the H₀ curve to the right of 105: ${R(a, 3)}.`, `β is the area of the μ = 110 curve to the left of 105: ${R(b, 3)}.`],
    { range: { x: [90, 120], y: [0, 0.16] }, ticks: [[90, 95, 100, 105, 110, 115, 120], [0.05, 0.1, 0.15]], axisLabels: ["sample mean", "density"], legend: [["H₀: μ = 100", "a1"], ["μ = 110", "a2"]], legendData: [91, 0.15],
      curves: [{ expr: nrm(100, 3), colour: "a1" }, { expr: nrm(110, 3), colour: "a2" }], areas: [{ expr: nrm(100, 3), from: 105, to: 120, colour: "a1", opacity: 0.4 }, { expr: nrm(110, 3), from: 90, to: 105, colour: "a2", opacity: 0.4 }], marks: [{ x: 105, label: "reject beyond 105", dx: 6 }],
      checks: [{ type: "area", expr: nrm(100, 3), from: 105, to: 140, value: R(a, 4), tol: 0.001, name: "α = P(X̄ > 105 | μ = 100) ≈ 0.048" }, { type: "area", expr: nrm(110, 3), from: 80, to: 105, value: R(b, 4), tol: 0.001, name: "β = P(X̄ ≤ 105 | μ = 110) ≈ 0.048" }] });
}
// ---------- u13-18 effect size ----------
mk("u13-18", "maths-u13-cohens-d", "graph", "Cohen's d = 0.5",
  "Means 70 and 75 with pooled SD 10 differ by 5, which is half a standard deviation: d = 0.5. The curves overlap heavily even though the means differ.",
  "Two normal curves with SD 10 centred at 70 and 75, overlapping, with the 5-unit gap marked.",
  ["The difference in means is 75 − 70 = 5.", "Dividing by the pooled SD 10 gives d = 0.5.", "A medium effect: the two groups' distributions overlap a lot."],
  { range: { x: [35, 110], y: [0, 0.05] }, ticks: [[40, 50, 60, 70, 80, 90, 100], [0.02, 0.04]], axisLabels: ["score", "density"], legend: [["control, mean 70", "a1"], ["treated, mean 75", "a2"]], legendData: [37, 0.047], curves: [{ expr: nrm(70, 10), colour: "a1" }, { expr: nrm(75, 10), colour: "a2" }],
    checks: [{ type: "max", expr: nrm(70, 10), domain: [35, 110], x: 70, y: R(1 / (10 * Math.sqrt(2 * PI)), 4) }, { type: "max", expr: nrm(75, 10), domain: [35, 110], x: 75, y: R(1 / (10 * Math.sqrt(2 * PI)), 4) }] });
// ---------- u13-19 20 tests ----------
{
  const p = 1 - 0.95 ** 20;
  mk("u13-19", "maths-u13-twenty-tests", "distribution", "Twenty tests with no real effects",
    `The number of false positives is B(20, 0.05). P(at least one) = 1 − 0.95²⁰ = ${R(p, 3)}: about two chances in three of a spurious finding.`,
    `Bar chart of B(20, 0.05); the bars for 1 to 20 false positives are shaded, total ${R(p, 3)}.`,
    ["Each test has a 5% chance of a false positive.", "The bar at 0 is 0.95²⁰ ≈ 0.358.", `Everything else, ${R(p, 3)}, is at least one false positive.`],
    { dist: { dist: "binomial", n: 20, p: 0.05 }, range: { x: [-0.5, 8.5], y: [0, 0.4] }, ticks: [[0, 2, 4, 6, 8], [0.1, 0.2, 0.3, 0.4]], axisLabels: ["false positives", "probability"], shade: [1, 20], p: R(p, 3), dp: 3,
      checks: [{ type: "mean", value: 1 }, { type: "prob", from: 1, to: 20, p: R(p, 3), dp: 3 }] });
}
// ---------- u13-22 sign test ----------
{
  let p = 0; for (let k = 8; k <= 10; k++) p += binomialPmf(k, 10, 0.5);
  mk("u13-22", "maths-u13-sign-test", "distribution", "The sign test: 8 positive differences out of 10",
    `Under H₀ each difference is positive with probability 1/2, so the count is B(10, 0.5). P(X ≥ 8) = ${R(p)} > 0.05: not significant.`,
    `Bar chart of B(10, 0.5) with the bars for 8, 9 and 10 shaded, total ${R(p)}.`,
    ["Under H₀ the number of positive differences is B(10, 0.5).", `The one-sided p-value is the shaded area, ${R(p)}.`, "It exceeds 0.05, so do not reject."],
    { dist: { dist: "binomial", n: 10, p: 0.5 }, range: { x: [-0.5, 10.5], y: [0, 0.3] }, ticks: [[0, 2, 4, 6, 8, 10], [0.1, 0.2, 0.3]], axisLabels: ["positive differences", "probability"], shade: [8, 10], p: R(p),
      checks: [{ type: "mean", value: 5 }, { type: "prob", from: 8, to: 10, p: R(p) }] });
}
// ---------- u13-23 z-test ----------
{
  const p = 1 - normalCdf(2);
  mk("u13-23", "maths-u13-z-test-bags", "distribution", "The sample mean 505 g in the null distribution",
    `Under H₀ the mean of 64 bags is N(500, 2.5²). 505 g is z = 2 above, with tail area ${R(p)} each side, so the two-sided p ≈ ${R(2 * p)} < 0.05: reject.`,
    `Normal curve with mean 500 and SD 2.5 for the sample mean; the tail beyond 505 is shaded, area ${R(p)}.`,
    ["SE = 20/√64 = 2.5.", "z = (505 − 500)/2.5 = 2.", `Upper tail ${R(p)}; two-sided p ≈ ${R(2 * p)}.`],
    { dist: { dist: "normal", mu: 500, sigma: 2.5 }, range: { x: [490, 510], y: [0, 0.18] }, ticks: [[490, 495, 500, 505, 510], [0.05, 0.1, 0.15]], axisLabels: ["sample mean (g)", "density"], shade: [505, null], p: R(p),
      checks: [{ type: "mean", value: 500 }, { type: "prob", from: 505, to: null, p: R(p) }] });
}
// ---------- u13-25 chi-squared die ----------
mk("u13-25", "maths-u13-die-counts", "barchart", "60 rolls of a die",
  "A fair die would give 10 of each face. The observed counts 8, 9, 12, 11, 6, 14 differ from 10 by −2, −1, 2, 1, −4, 4, so χ² = (4 + 1 + 4 + 1 + 16 + 16)/10 = 4.2, below 11.07: no evidence of bias.",
  "Bar chart of the face counts 8, 9, 12, 11, 6 and 14 for faces 1 to 6.",
  ["The expected count for each face is 60/6 = 10.", "Squared differences from 10 are 4, 1, 4, 1, 16, 16, which sum to 42.", "χ² = 42/10 = 4.2, less than the critical value 11.07."],
  { categories: [1, 2, 3, 4, 5, 6], values: [8, 9, 12, 11, 6, 14], range: { y: [0, 16] }, ticks: [4, 8, 12, 16], axisLabels: ["face", "count"], checks: [{ type: "total", value: 60 }, { type: "mean", value: "11/3" }] });
// ---------- u13-26 tea tasting ----------
{
  const w = [1, 16, 36, 16, 1];
  mk("u13-26", "maths-u13-tea-hypergeometric", "barchart", "The tea-tasting experiment",
    "With 4 milk-first cups among 8, a guesser chooses 4 cups in one of C(8, 4) = 70 ways. 3 right can happen in 16 ways and 4 right in 1, so P(at least 3) = 17/70 ≈ 0.243.",
    "Bar chart of the 70 equally likely choices by the number of correct cups: 1, 16, 36, 16, 1 for 0 to 4; the bars for 3 and 4 are highlighted.",
    ["A guesser picks which 4 of the 8 cups were milk-first: 70 ways.", "Exactly k right: C(4, k) × C(4, 4 − k) = 1, 16, 36, 16, 1.", "At least 3 right: 16 + 1 = 17 of 70."],
    { categories: [0, 1, 2, 3, 4], values: w, range: { y: [0, 40] }, ticks: [10, 20, 30, 40], axisLabels: ["cups right", "ways (of 70)"], highlight: [3, 4], checks: [{ type: "total", value: 70 }, { type: "mode", value: 2 }, { type: "mean", value: 2 }] });
}
// ---------- u13-31 ANOVA ----------
mk("u13-31", "maths-u13-anova-groups", "boxplot", "Three groups of three",
  "Group means 5, 7 and 9 give a between-group sum of squares 24 on 2 df and a within-group sum of squares 6 on 6 df, so F = 12/1 = 12 > 5.14: the means differ.",
  "Three box plots for groups A (4, 5, 6), B (6, 7, 8) and C (8, 9, 10), each of width 2, centred at 5, 7 and 9, touching at the ends.",
  ["Each group has spread 2 (SS = 2 each, 6 in total within).", "The group centres 5, 7, 9 are 2 apart, so the between-group SS is 3 × (4 + 0 + 4) = 24.", "F = (24/2)/(6/6) = 12."],
  { method: "halves", range: { x: [2, 12] }, ticks: [2, 4, 6, 8, 10, 12], plots: [{ label: "A", data: [4, 5, 6], summary: [4, 4, 5, 6, 6] }, { label: "B", data: [6, 7, 8], summary: [6, 6, 7, 8, 8] }, { label: "C", data: [8, 9, 10], summary: [8, 8, 9, 10, 10] }] });
// ---------- u13-33 risk ratio ----------
mk("u13-33", "maths-u13-risk-bars", "bar-model", "30 in 100 exposed against 10 in 100 unexposed",
  "The risk is 3/10 against 1/10, so RR = 3. The odds are 30/70 against 10/90, so OR = (3/7)/(1/9) = 27/7 ≈ 3.86, larger than the RR because the disease is not rare.",
  "Two bars of ten cells: the exposed bar has 3 shaded, the unexposed bar 1.",
  ["Exposed: 3 in 10 (30 in 100) develop the disease.", "Unexposed: 1 in 10.", "RR = 0.3/0.1 = 3; OR = (30/70)/(10/90) ≈ 3.86."],
  { bars: [{ label: "exposed 30/100", cells: 10, shaded: 3 }, { label: "unexposed 10/100", cells: 10, shaded: 1 }], checks: [{ type: "fraction", bar: 0, value: "3/10" }, { type: "fraction", bar: 1, value: "1/10" }, { type: "value", expr: "(30/70)/(10/90)", value: "27/7", name: "OR = 27/7" }] });
// ---------- u13-35 extrapolation ----------
mk("u13-35", "maths-u13-extrapolation", "graph", "A line fitted for ages 2 to 10 is used at 40",
  "Within the data (ages 2 to 10) height = 80 + 6 × age is fine, but the same line at age 40 predicts 320 cm: extrapolation far outside the data is not trustworthy.",
  "A solid line for ages 2 to 10 from 92 cm to 140 cm, continuing as a dashed line to age 40 where it reaches 320 cm.",
  ["The fitted line height = 80 + 6 × age is solid over the data, ages 2 to 10.", "Extended to age 40 it gives 80 + 240 = 320 cm.", "No adult is 3.2 m tall: the linear pattern does not continue."],
  { range: { x: [0, 45], y: [0, 340] }, ticks: [[10, 20, 30, 40], [100, 200, 300]], axisLabels: ["age (years)", "height (cm)"], curves: [{ expr: "80+6*x", domain: [2, 10], colour: "a1" }, { expr: "80+6*x", domain: [10, 40], colour: "a1", dash: "6 5" }], points: [{ x: 40, y: 320, label: "320 cm?", dx: -10, dy: 18, anchor: "end" }],
    checks: [{ type: "point", expr: "80+6*x", x: 40, y: 320 }, { type: "point", expr: "80+6*x", x: 2, y: 92 }, { type: "point", expr: "80+6*x", x: 10, y: 140 }] });
// ---------- u13-36 regression ----------
mk("u13-36", "maths-u13-least-squares-line", "scatter", "The least-squares line and R²",
  "S_xy = 6 and S_xx = 10 give slope 0.6 and intercept 4 − 0.6 × 3 = 2.2. With r = 0.775, R² = r² = 0.6: the line explains 60% of the variation in y.",
  "Scatter plot of (1, 2), (2, 4), (3, 5), (4, 4), (5, 5) with the line y = 2.2 + 0.6x through the mean point (3, 4).",
  ["Slope = S_xy/S_xx = 6/10 = 0.6.", "The line passes through the means (3, 4), so intercept = 2.2.", "R² = 0.6."],
  { points: [[1, 2], [2, 4], [3, 5], [4, 4], [5, 5]], line: { a: 2.2, b: 0.6 }, r: R(6 / Math.sqrt(60), 3), meanPoint: true, range: { x: [0, 6], y: [0, 6] }, ticks: [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]], axisLabels: ["x", "y"], lineLabel: "y = 2.2 + 0.6x", lineLabelAt: [0.4, 3.2] });
// ---------- u13-38 logistic ----------
{
  const p4 = 1 / (1 + Math.exp(1));
  mk("u13-38", "maths-u13-logistic-curve", "graph", "p = 1/(1 + e^(3 − 0.5x))",
    `At x = 4, logit(p) = −1, so p = 1/(1 + e) ≈ ${R(p4, 3)}. The curve is S-shaped, crossing 0.5 at x = 6, and each unit of x multiplies the odds by e⁰·⁵ ≈ 1.65.`,
    `Graph of the logistic curve rising from 0 to 1 with the point (4, ${R(p4, 3)}) and p = 0.5 at x = 6.`,
    ["logit(p) = −3 + 0.5x, so p = 1/(1 + e^(3 − 0.5x)).", `At x = 4, p = ${R(p4, 3)}.`, "p = 0.5 when logit = 0, at x = 6."],
    { range: { x: [-4, 16], y: [0, 1.1] }, ticks: [[0, 4, 8, 12, 16], [0.25, 0.5, 0.75, 1]], axisLabels: ["x", "p"], curves: [{ expr: "1/(1+exp(3-0.5*x))" }], points: [{ x: 4, y: R(p4), label: `${R(p4, 3)}`, dx: 10, dy: 16 }, { x: 6, y: 0.5, label: "0.5", dx: 10, dy: 16 }],
      checks: [{ type: "point", expr: "1/(1+exp(3-0.5*x))", x: 4, y: R(p4) }, { type: "point", expr: "1/(1+exp(3-0.5*x))", x: 6, y: 0.5 }] });
}
// ---------- u13-39 Poisson regression ----------
{
  const m5 = Math.exp(1.5);
  mk("u13-39", "maths-u13-poisson-regression", "graph", "log μ = 0.5 + 0.2x",
    `At x = 5, μ = e^1.5 ≈ ${R(m5, 2)}. The mean curves upward because each unit of x multiplies it by e⁰·² ≈ 1.22.`,
    `Graph of μ = e^(0.5 + 0.2x), increasing and curving upward, with the point (5, ${R(m5, 2)}).`,
    ["The linear predictor is 0.5 + 0.2x; the mean is its exponential.", `At x = 5 the predictor is 1.5 and μ = ${R(m5, 2)}.`],
    { range: { x: [0, 10], y: [0, 14] }, ticks: [[2, 4, 6, 8, 10], [4, 8, 12]], axisLabels: ["x", "expected count"], curves: [{ expr: "exp(0.5+0.2*x)" }], points: [{ x: 5, y: R(m5, 3), label: `${R(m5, 2)}`, dx: -10, dy: -14, anchor: "end" }],
      checks: [{ type: "point", expr: "exp(0.5+0.2*x)", x: 5, y: R(m5, 3) }, { type: "point", expr: "exp(0.5+0.2*x)", x: 0, y: R(Math.exp(0.5), 3) }] });
}
// ---------- u13-40 Michaelis-Menten ----------
mk("u13-40", "maths-u13-michaelis-menten", "graph", "V = 10S/(2 + S)",
  "At S = Kₘ = 2 the rate is half of V_max: V = 5. At S = 6 it is 7.5, and the curve levels off towards 10.",
  "Graph of V = 10S/(2 + S) rising and flattening toward 10, with the points (2, 5) and (6, 7.5).",
  ["V = V_max S/(K_m + S) with V_max = 10 and K_m = 2.", "S = 2 gives 20/4 = 5, half of V_max.", "S = 6 gives 60/8 = 7.5."],
  { range: { x: [0, 20], y: [0, 11] }, ticks: [[5, 10, 15, 20], [2.5, 5, 7.5, 10]], axisLabels: ["S", "V"], curves: [{ expr: "10*x/(2+x)" }], points: [{ x: 2, y: 5, label: "(2, 5)", dx: 10, dy: 18 }, { x: 6, y: 7.5, label: "(6, 7.5)", dx: 10, dy: 18 }], marks: [{ y: 10, label: "V_max = 10" }],
    checks: [{ type: "point", expr: "10*x/(2+x)", x: 2, y: 5 }, { type: "point", expr: "10*x/(2+x)", x: 6, y: 7.5 }] });
// ---------- u13-41 robust regression ----------
mk("u13-41", "maths-u13-outlier-slopes", "graph", "One outlier moves the least-squares line",
  "For (1, 1) to (4, 4) and (5, 20), least squares gives slope 4 and passes through the mean point (3, 6); the Theil–Sen slope, the median of pairwise slopes, is 1 and ignores the outlier.",
  "Graph with a steep line y = 4x − 6 (least squares) pulled up by the outlier at (5, 20) and the line y = x (Theil–Sen) through the other four points.",
  ["The least-squares slope is S_xy/S_xx = 40/10 = 4.", "The Theil–Sen slope is the median of the pairwise slopes, which is 1.", "The point (5, 20) drags the first line up but hardly moves the second."],
  { range: { x: [0, 6], y: [-4, 22] }, ticks: [[1, 2, 3, 4, 5], [0, 5, 10, 15, 20]], axisLabels: ["x", "y"], legend: [["least squares, slope 4", "a1"], ["Theil–Sen, slope 1", "a2"]], legendData: [0.2, 20.5], curves: [{ expr: "4*x-6", colour: "a1" }, { expr: "x", colour: "a2" }],
    points: [{ x: 1, y: 1, label: "" }, { x: 2, y: 2, label: "" }, { x: 3, y: 3, label: "" }, { x: 4, y: 4, label: "" }, { x: 5, y: 20, label: "(5, 20)", dx: -10, dy: 0, anchor: "end" }],
    checks: [{ type: "point", expr: "4*x-6", x: 3, y: 6, name: "least squares passes through the mean point (3, 6)" }, { type: "point", expr: "x", x: 4, y: 4 }, { type: "slope", expr: "4*x-6", x: 3, value: 4, name: "least-squares slope 4" }, { type: "slope", expr: "x", x: 3, value: 1, name: "Theil–Sen slope 1" }] });
// ---------- u13-42 check loss ----------
mk("u13-42", "maths-u13-check-loss", "graph", "The check loss for τ = 0.9",
  "ρ(u) = u(0.9 − 1{u < 0}): a positive residual costs 0.9u, a negative one 0.1|u|. So +2 costs 1.8 and −2 costs 0.2: under-prediction is penalised nine times as much.",
  "A V-shaped graph, steep on the right (slope 0.9) and shallow on the left (slope −0.1), with the points (2, 1.8) and (−2, 0.2).",
  ["For positive residuals the loss rises with slope 0.9.", "For negative residuals it rises with slope 0.1 as the residual becomes more negative.", "ρ(2) = 1.8 and ρ(−2) = 0.2."],
  { range: { x: [-4, 4], y: [0, 4] }, ticks: [[-4, -2, 0, 2, 4], [1, 2, 3, 4]], axisLabels: ["residual u", "loss ρ"], curves: [{ expr: "0.5*abs(x)+0.4*x" }], points: [{ x: 2, y: 1.8, label: "1.8", dx: -10, dy: -12, anchor: "end" }, { x: -2, y: 0.2, label: "0.2", dx: 0, dy: -16 }],
    checks: [{ type: "point", expr: "0.5*abs(x)+0.4*x", x: 2, y: 1.8 }, { type: "point", expr: "0.5*abs(x)+0.4*x", x: -2, y: 0.2 }] });
// ---------- u13-44 lasso soft threshold ----------
mk("u13-44", "maths-u13-soft-threshold", "graph", "The lasso soft-thresholds each estimate",
  "With orthonormal predictors and λ = 1 the lasso moves each estimate 1 towards zero and sets it to 0 if it is within 1: 3 → 2, −0.5 → 0, 1.2 → 0.2.",
  "Graph of the soft-threshold function: zero between −1 and 1, then rising with slope 1; points (3, 2), (−0.5, 0) and (1.2, 0.2) are marked.",
  ["Estimates with |b| ≤ 1 are set exactly to 0.", "Larger ones are shrunk by 1: 3 → 2, 1.2 → 0.2.", "−0.5 falls in the flat region and becomes 0."],
  { range: { x: [-4, 4], y: [-3, 3] }, ticks: [[-4, -2, 0, 2, 4], [-2, 0, 2]], axisLabels: ["b", "lasso"], curves: [{ expr: "x/abs(x)*(abs(abs(x)-1)+abs(x)-1)/2", samples: 401 }], points: [{ x: 3, y: 2, label: "(3, 2)", dx: -10, dy: 14, anchor: "end" }, { x: -0.5, y: 0, label: "(−0.5, 0)", dx: 0, dy: -16 }, { x: 1.2, y: 0.2, label: "(1.2, 0.2)", dx: 10, dy: 16 }],
    checks: [{ type: "point", expr: "x/abs(x)*(abs(abs(x)-1)+abs(x)-1)/2", x: 3, y: 2 }, { type: "point", expr: "x/abs(x)*(abs(abs(x)-1)+abs(x)-1)/2", x: -0.5, y: 0 }, { type: "point", expr: "x/abs(x)*(abs(abs(x)-1)+abs(x)-1)/2", x: 1.2, y: 0.2 }] });
// ---------- u13-52 discriminant boundary ----------
mk("u13-52", "maths-u13-discriminant-boundary", "graph", "Two classes, equal priors: the boundary at 13",
  "With equal priors and the same σ = 2 the densities cross halfway between the means 10 and 16, at x = 13. Classify to the nearer mean.",
  "Two normal curves with SD 2 centred at 10 and 16 crossing at x = 13, with a dashed line there.",
  ["The class densities are N(10, 2²) and N(16, 2²).", "They are equal at the midpoint 13.", "Left of 13 choose class 1, right of 13 class 2."],
  { range: { x: [4, 22], y: [0, 0.3] }, ticks: [[4, 7, 10, 13, 16, 19, 22], [0.1, 0.2, 0.3]], axisLabels: ["x", "density"], legend: [["class 1, mean 10", "a1"], ["class 2, mean 16", "a2"]], legendData: [4.5, 0.285], curves: [{ expr: nrm(10, 2), colour: "a1" }, { expr: nrm(16, 2), colour: "a2" }], marks: [{ x: 13, label: "boundary 13", dx: 6 }],
    checks: [{ type: "intersect", a: nrm(10, 2), b: nrm(16, 2), x: 13, y: R(Math.exp(-9 / 8) / (2 * Math.sqrt(2 * PI)), 4), name: "the two densities cross at x = 13" }] });
// ---------- u13-56 Bayesian normal update ----------
mk("u13-56", "maths-u13-normal-posterior", "graph", "Prior N(100, 10²) and data mean 110",
  "The prior has precision 1/100 and the data 4/100, so the posterior has precision 0.05, variance 20 (SD ≈ 4.47) and mean (100 × 0.01 + 110 × 0.04)/0.05 = 108: pulled most of the way to the data.",
  "Three normal curves: a broad prior centred at 100, the likelihood of the sample mean centred at 110 with SD 5, and a taller posterior between them at 108.",
  ["Prior N(100, 100); data mean 110 has variance 100/4 = 25.", "Precisions add: 0.01 + 0.04 = 0.05, so the posterior variance is 20.", "The posterior mean is the precision-weighted average, 108."],
  { range: { x: [70, 140], y: [0, 0.11] }, ticks: [[80, 100, 120, 140], [0.04, 0.08]], axisLabels: ["μ", "density"], legend: [["prior", "a1"], ["data (x̄ = 110)", "a4"], ["posterior", "a2"]], legendData: [72, 0.105],
    curves: [{ expr: nrm(100, 10), colour: "a1" }, { expr: nrm(110, 5), colour: "a4" }, { expr: nrm(108, R(Math.sqrt(20), 5)), colour: "a2" }],
    checks: [{ type: "max", expr: nrm(108, R(Math.sqrt(20), 5)), domain: [70, 140], x: 108, y: R(1 / (Math.sqrt(20) * Math.sqrt(2 * PI)), 4), name: "the posterior peaks at 108" }] });
// ---------- u13-59 permutation test ----------
mk("u13-59", "maths-u13-permutation-differences", "barchart", "All 6 ways to split 7, 9, 1, 3 into two pairs",
  "Each way of choosing which two values form group A gives a difference in means: −6, −2, 0, 0, 2 and 6, each as likely as the others under H₀. Only 1 of the 6 reaches 6, so the one-sided p = 1/6.",
  "Bar chart of the 6 permutations by difference in group means: −6 once, −2 once, 0 twice, 2 once and 6 once; the bar at 6 is highlighted.",
  ["There are C(4, 2) = 6 ways to choose group A.", "Their differences in means are −6, −2, 0, 0, 2, 6.", "Only one is at least as large as the observed 6: p = 1/6."],
  { categories: [-6, -2, 0, 2, 6], values: [1, 1, 2, 1, 1], range: { y: [0, 3] }, ticks: [1, 2, 3], axisLabels: ["difference in means", "arrangements (of 6)"], highlight: [4], checks: [{ type: "total", value: 6 }, { type: "mean", value: 0 }] });
// ---------- u13-64 2x2 factorial ----------
mk("u13-64", "maths-u13-interaction-plot", "graph", "A 2² experiment: the interaction plot",
  "A has main effect (14 + 20 − 10 − 12)/2 = 6 and B has 4. The lines for B− and B+ are not parallel: A raises the response by 4 when B is low but by 8 when B is high, so the interaction is (10 + 20 − 14 − 12)/2 = 2.",
  "Two lines against the level of A (−1 and +1): B− from 10 to 14 and B+ from 12 to 20, the second steeper.",
  ["At B−, moving A from − to + raises the response from 10 to 14.", "At B+, it raises it from 12 to 20.", "Different slopes mean an interaction: 2."],
  { range: { x: [-1.5, 1.5], y: [8, 22] }, ticks: [[-1, 1], [10, 14, 18, 22]], axisLabels: ["level of A", "response"], legend: [["B−", "a1"], ["B+", "a2"]], legendData: [-1.4, 21], curves: [{ expr: "12+2*x", domain: [-1, 1], colour: "a1" }, { expr: "16+4*x", domain: [-1, 1], colour: "a2" }],
    points: [{ x: -1, y: 10, label: "10", dx: -8, dy: 14, anchor: "end" }, { x: 1, y: 14, label: "14", dx: 10, dy: 14 }, { x: -1, y: 12, label: "12", dx: -8, dy: -12, anchor: "end" }, { x: 1, y: 20, label: "20", dx: 10, dy: -12 }],
    checks: [{ type: "point", expr: "12+2*x", x: -1, y: 10 }, { type: "point", expr: "12+2*x", x: 1, y: 14 }, { type: "point", expr: "16+4*x", x: -1, y: 12 }, { type: "point", expr: "16+4*x", x: 1, y: 20 }, { type: "slope", expr: "12+2*x", x: 0, value: 2, name: "A raises B− by 4 over its 2 units: slope 2" }, { type: "slope", expr: "16+4*x", x: 0, value: 4, name: "A raises B+ by 8 over its 2 units: slope 4" }] });
// ---------- u13-65 difference in differences ----------
mk("u13-65", "maths-u13-diff-in-diff", "graph", "Difference in differences",
  "Town A fell 10 (50 → 40); similar town B fell 4 (52 → 48) without the policy. A would have fallen to 46 without it, so the policy effect is 40 − 46 = −6 accidents.",
  "Three lines from before to after: town A falling 50 to 40, town B falling 52 to 48, and a dashed counterfactual for A falling 50 to 46.",
  ["A actually fell by 10; B, with no policy, fell by 4.", "Assume A would have followed B's trend: 50 − 4 = 46.", "The policy effect is 40 − 46 = −6."],
  { range: { x: [-0.3, 1.5], y: [36, 56] }, ticks: [[0, 1], [40, 44, 48, 52, 56]], axisLabels: ["before (0) and after (1)", "accidents"], legend: [["town A", "a2"], ["town B", "a1"], ["A without the policy", "a4"]], legendData: [0.5, 55.5],
    curves: [{ expr: "50-10*x", domain: [0, 1], colour: "a2" }, { expr: "52-4*x", domain: [0, 1], colour: "a1" }, { expr: "50-4*x", domain: [0, 1], colour: "a4", dash: "6 5" }],
    checks: [{ type: "point", expr: "50-10*x", x: 1, y: 40 }, { type: "point", expr: "52-4*x", x: 1, y: 48 }, { type: "point", expr: "50-4*x", x: 1, y: 46 }, { type: "slope", expr: "50-10*x", x: 0.5, value: -10, name: "town A falls 10" }, { type: "slope", expr: "52-4*x", x: 0.5, value: -4, name: "town B falls 4" }] });
// ---------- u13-67 meta-analysis ----------
{
  const w1 = 1, w2 = 0.25, pooled = (2 * w1 + 4 * w2) / (w1 + w2), se = 1 / Math.sqrt(w1 + w2);
  mk("u13-67", "maths-u13-fixed-effect", "number-line", "Inverse-variance weighting of two studies",
    `Weights 1/SE² are 1 and 1/4. The pooled effect is (1 × 2 + 0.25 × 4)/1.25 = ${R(pooled, 1)}, nearer the more precise first study, with SE = 1/√1.25 ≈ ${R(se, 3)}.`,
    `A number line from 1 to 5 with the studies at 2 and 4 and the pooled estimate ${R(pooled, 1)} close to 2.`,
    ["The study with SE 1 gets weight 1; the one with SE 2 gets weight 1/4.", `Pooled = ${R(pooled, 1)}.`, `SE = ${R(se, 3)}, smaller than either study's.`],
    { range: [1, 5], ticks: { step: 0.5 }, points: [{ value: 2, label: "study 1: 2" }, { value: 4, label: "study 2: 4" }, { value: R(pooled, 1), label: `pooled ${R(pooled, 1)}`, colour: "a4", below: true }],
      checks: [{ type: "value", expr: "(1*2+0.25*4)/(1+0.25)", value: "2.4" }, { type: "value", tol: 1e-3, expr: "1/sqrt(1.25)", value: R(se, 4).toString() }] });
}
