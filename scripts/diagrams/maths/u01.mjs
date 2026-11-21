// School 1, Number and Arithmetic: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u01.mjs
import { mk } from "./spec.mjs";
import { fmt, primeFactors, roundTo } from "../../../kit/diagrams/maths-core.js";

const m = (x) => fmt(x); // labels with a true minus sign

// ---------- u01-01 Arithmetic: 37 × 24 as an area split into 37 × 20 and 37 × 4 ----------
{
  const a = 37, b1 = 20, b2 = 4, p1 = a * b1, p2 = a * b2;
  mk("u01-01", "maths-u01-area-multiplication", "geometry", "37 × 24 as an area",
    `Long multiplication is this rectangle cut in two: 37 × 20 = ${p1} and 37 × 4 = ${p2}, and the whole area is ${p1} + ${p2} = ${p1 + p2}. Each row of the written method is one strip.`,
    `A rectangle 37 wide and 24 tall, split into a strip 37 by 20 with area ${p1} and a strip 37 by 4 with area ${p2}.`,
    [`A rectangle with width 37 and height 24 stands for 37 × 24.`, `A line cuts it into a strip 20 tall and a strip 4 tall, because 24 = 20 + 4.`,
      `The large strip is 37 × 20 = ${p1}; the thin strip is 37 × 4 = ${p2}.`, `Together they make ${p1} + ${p2} = ${p1 + p2}, the answer to 37 × 24.`],
    { points: { A: [0, 0], B: [a, 0], C: [a, b2], D: [a, b1 + b2], E: [0, b1 + b2], F: [0, b2] }, hide: ["A", "B", "C", "D", "E", "F"],
      polygons: [{ pts: ["F", "C", "D", "E"], colour: "a1" }, { pts: ["A", "B", "C", "F"], colour: "a2", opacity: 0.25 }],
      lengths: [{ a: "E", b: "D", value: a, label: "37", side: -1 }, { a: "D", b: "C", value: b1, label: "20" }, { a: "C", b: "B", value: b2, label: "4" }],
      notes: [{ at: [a / 2, b2 + b1 / 2], text: `37 × 20 = ${p1}`, colour: "a1" }, { at: [a / 2, b2 / 2], text: `37 × 4 = ${p2}`, colour: "a2", size: 13 }],
      view: { x: [-3, 42], y: [-1.5, 27] }, height: [330, 300],
      fromLesson: ["37 × 24", `37 × 20 = ${p1}`, `37 × 4 = ${p2}`, `${p2} + ${p1} = ${p1 + p2}`],
      checks: [{ type: "area", polygon: ["F", "C", "D", "E"], value: p1, note: 0 }, { type: "area", polygon: ["A", "B", "C", "F"], value: p2, note: 1 },
        { type: "area", polygon: ["A", "B", "D", "E"], value: 37 * 24, name: `the whole rectangle is 37 × 24 = ${p1 + p2}` }] });
}

// ---------- u01-05 Integers: −5 + 9 − 12 on a number line ----------
mk("u01-05", "maths-u01-temperature-jumps", "number-line", "Temperature changes as jumps",
  "Adding a positive number moves right and subtracting moves left: from −5 °C, up 9 reaches 4 °C, and down 12 crosses zero to −8 °C.",
  "A number line from −10 to 6 with a jump of +9 from −5 to 4, then a jump of −12 from 4 to −8.",
  ["The number line runs from −10 to 6 in steps of 1, labelled every 2.", "Start at −5, the 06:00 temperature.", "A jump of +9 to the right lands on 4 (14:00).", "A jump of −12 to the left lands on −8, the final temperature."],
  { range: [-10, 6], ticks: { step: 2 }, minor: 1, narrowTicks: { step: 2 }, jumps: { from: -5, steps: [{ by: 9, label: "+9" }, { by: -12, label: "−12" }], to: -8 },
    points: [{ value: -5, label: "−5 °C", below: true }, { value: 4, label: "4 °C", below: true, colour: "a4" }, { value: -8, label: "−8 °C", below: true, colour: "a1" }],
    fromLesson: ["−5 + 9 = 4", "4 − 12 = −8"] });

// ---------- u01-06 Rational numbers: 0.272727… = 3/11 ----------
mk("u01-06", "maths-u01-recurring-decimal", "number-line", "Where 0.2727… sits",
  "0.272727… is exactly 3/11: it lies between 0.27 and 0.28, a little past 0.27, and never reaches 0.273.",
  "A number line from 0.2 to 0.3 with a point at 3/11 = 0.2727…, just right of 0.27.",
  ["The line runs from 0.20 to 0.30 with small marks every 0.01.", "The point 3/11 sits just to the right of 0.27, at 0.2727…", "Because 3/11 is a fraction of integers it is rational, even though its decimal never ends."],
  { range: [0.2, 0.3], ticks: { step: 0.05 }, minor: 0.01, tickLabels: { 0.2: "0.2", 0.25: "0.25", 0.3: "0.3" },
    points: [{ value: 3 / 11, expr: "3/11", label: "3/11 = 0.2727…" }],
    checks: [{ type: "between", expr: "3/11", from: "0.27", to: "0.28" }, { type: "value", expr: "27/99", value: "3/11", name: "27/99 simplifies to 3/11" }],
    fromLesson: ["99x = 27", "27/99 = 3/11"] });

// ---------- u01-07 Irrational numbers: √50 as the diagonal of a 5 × 5 square ----------
{
  const s = 5, d = Math.hypot(s, s);
  mk("u01-07", "maths-u01-root50-diagonal", "geometry", "√50 = 5√2 as a length",
    `The diagonal of a square of side 5 is √(5² + 5²) = √50 = 5√2 ≈ ${fmt(d, 2)}: a length you can draw exactly, though its decimal never ends or repeats.`,
    "A square with side 5 and its diagonal, labelled √50 = 5√2.",
    ["A square has sides of length 5 with a right angle at each corner.", "Its diagonal is the hypotenuse of a right-angled triangle with legs 5 and 5.",
      "By Pythagoras the diagonal is √(25 + 25) = √50 = √25 × √2 = 5√2."],
    { points: { A: [0, 0], B: [s, 0], C: [s, s], D: [0, s] }, polygons: [{ pts: ["A", "B", "C", "D"], colour: "a1", opacity: 0.08 }],
      segments: [{ a: "A", b: "C", colour: "a2", w: 3 }], angles: [{ at: "B", from: "A", to: "C", right: true, colour: "ink" }],
      lengths: [{ a: "A", b: "B", value: s, label: "5" }, { a: "B", b: "C", value: s, label: "5" }, { a: "A", b: "C", value: +d.toFixed(4), label: "√50 = 5√2", colour: "a2", side: -1 }],
      ticks: [{ seg: ["A", "B"], n: 1 }, { seg: ["B", "C"], n: 1 }], view: { x: [-2.4, 7], y: [-1.4, 6.4] }, height: [330, 320],
      checks: [{ type: "distance", a: "A", b: "C", value: "sqrt(50)" }, { type: "value", expr: "5*sqrt(2)", value: "sqrt(50)", name: "5√2 = √50" }],
      fromLesson: ["√50 = √25 × √2 = 5√2"] });
}

// ---------- u01-08 Real numbers: the lesson's five numbers in nested sets ----------
mk("u01-08", "maths-u01-number-sets", "venn", "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ",
  "Each set sits inside the next: √9 = 3 is natural (so also an integer, rational and real), −3 is an integer but not natural, 0.75 = 3/4 is rational but not an integer, and √10 and π are irrational: real, but in no smaller set.",
  "Four nested rounded boxes: ℕ inside ℤ inside ℚ inside ℝ. √9 is in ℕ; −3 in ℤ only; 0.75 in ℚ only; √10 and π in ℝ only.",
  ["The innermost box is the natural numbers ℕ and holds √9 = 3.", "Around it, the integers ℤ add −3.", "Around that, the rationals ℚ add 0.75 = 3/4.", "The outer box, the reals ℝ, adds the irrationals √10 and π."],
  { nested: [{ name: "N", label: "ℕ natural", kind: "natural", items: [{ text: "√9 = 3", expr: "sqrt(9)" }] },
    { name: "Z", label: "ℤ integers", kind: "integer", items: [{ text: "−3", expr: "-3" }] },
    { name: "Q", label: "ℚ rational", kind: "rational", items: [{ text: "0.75", expr: "0.75" }] },
    { name: "R", label: "ℝ real", kind: "real", items: [{ text: "√10", expr: "sqrt(10)" }, { text: "π", expr: "pi" }] }],
    fromLesson: ["−3, 0.75, √9, √10 and π"] });

// ---------- u01-13 Prime factorisation: 1,764 ----------
{
  const n = 1764;
  const tree = { n, children: [{ n: 2 }, { n: 882, children: [{ n: 2 }, { n: 441, children: [{ n: 3 }, { n: 147, children: [{ n: 3 }, { n: 49, children: [{ n: 7 }, { n: 7 }] }] }] }] }] };
  const f = primeFactors(n), res = [...new Set(f)].map((p) => `${p}^{${f.filter((q) => q === p).length}}`).join(" × ");
  mk("u01-13", "maths-u01-factor-tree-1764", "factor-tree", "A factor tree for 1,764",
    `Split off a prime at each step until every branch ends in a prime: 1,764 = 2² × 3² × 7². Every power is even, so 1,764 is a square: √1,764 = 2 × 3 × 7 = 42.`,
    "A factor tree: 1764 splits into 2 and 882, 882 into 2 and 441, 441 into 3 and 147, 147 into 3 and 49, and 49 into 7 and 7.",
    ["1,764 is even: 1,764 = 2 × 882.", "882 = 2 × 441.", "441 = 3 × 147, and 147 = 3 × 49.", "49 = 7 × 7, both prime.", "The circled primes give 1,764 = 2² × 3² × 7²."],
    { tree, result: res, fromLesson: ["1,764 ÷ 2 = 882", "441 ÷ 3 = 147", "2^{2} × 3^{2} × 7^{2}"] });
}

// ---------- u01-14 GCD and u01-15 LCM: prime factors in a Venn diagram ----------
const pf = (n) => primeFactors(n).map(String);
function factorVenn(lesson, id, a, b, what, from) {
  const A = primeFactors(a), B = primeFactors(b), common = [], ra = [...A], rb = [...B];
  for (const p of A) { const i = rb.indexOf(p); if (i >= 0) { common.push(p); rb.splice(i, 1); ra.splice(ra.indexOf(p), 1); } }
  const hcf = common.reduce((x, y) => x * y, 1), lcm = [...ra, ...common, ...rb].reduce((x, y) => x * y, 1);
  const val = what === "HCF" ? hcf : lcm;
  mk(lesson, id, "venn", `${what} of ${a} and ${b} from prime factors`,
    what === "HCF"
      ? `The overlap holds the primes ${a} and ${b} share: ${common.join(" × ")} = ${hcf}, the HCF. Multiplying everything in the diagram gives the LCM, ${lcm}.`
      : `The LCM uses every prime in the diagram once: ${[...ra, ...common, ...rb].join(" × ")} = ${lcm}. The shared ${common.join(" × ")} is counted only once.`,
    `A Venn diagram: circle ${a} holds ${ra.join(", ")}; circle ${b} holds ${rb.join(", ")}; the overlap holds ${common.join(", ")}.`,
    [`${a} = ${A.join(" × ")} and ${b} = ${B.join(" × ")}.`, `The primes both share, ${common.join(", ")}, go in the overlap.`, `The rest of ${a}'s primes (${ra.join(", ")}) and of ${b}'s (${rb.join(", ")}) go in their own parts.`,
      what === "HCF" ? `The overlap multiplies to the HCF, ${hcf}.` : `All the primes together multiply to the LCM, ${lcm}.`],
    { sets: [{ name: "A", label: `${a}` }, { name: "B", label: `${b}` }], universe: { label: "prime factors" },
      items: { A: ra.map(String), AB: common.map(String), B: rb.map(String) },
      checks: [{ type: "members", event: "A", of: a }, { type: "members", event: "B", of: b },
        { type: "product", event: "A∩B", value: hcf, name: `the overlap multiplies to the HCF, ${hcf}` }, { type: "product", event: "A∪B", value: lcm, name: `everything multiplies to the LCM, ${lcm}` }],
      fromLesson: from });
  return val;
}
factorVenn("u01-14", "maths-u01-hcf-venn", 252, 198, "HCF", ["2 × 3^{2} = 18", "HCF = 18"]);
factorVenn("u01-15", "maths-u01-lcm-venn", 20, 45, "LCM", ["20 = 2^{2} × 5", "45 = 3^{2} × 5", "180 seconds"]);
void pf;

// ---------- u01-16 Fractions: 7/10 < 5/7 < 3/4 as bars ----------
mk("u01-16", "maths-u01-fraction-bars", "bar-model", "Ordering 3/4, 5/7 and 7/10",
  "With equal-length bars the shaded lengths can be compared directly: 7/10 is shortest, then 5/7, then 3/4, as 98/140 < 100/140 < 105/140.",
  "Three bars of equal length: 7 of 10 parts shaded, 5 of 7 parts shaded and 3 of 4 parts shaded, the shading ending further right each time.",
  ["Each bar is one whole, cut into 10, 7 or 4 equal parts.", "7/10: seven of ten parts shaded.", "5/7: five of seven parts shaded, ending a little further right.", "3/4: three of four parts shaded, the longest."],
  { bars: [{ label: "7/10", cells: 10, shaded: 7 }, { label: "5/7", cells: 7, shaded: 5 }, { label: "3/4", cells: 4, shaded: 3 }],
    checks: [{ type: "fraction", bar: 0, value: "98/140" }, { type: "fraction", bar: 1, value: "100/140" }, { type: "fraction", bar: 2, value: "105/140" }, { type: "order", bars: [0, 1, 2] }],
    fromLesson: ["3/4 = 105/140", "5/7 = 100/140", "7/10 = 98/140"] });

// ---------- u01-18 Percentages: 17.5% of £360 ----------
{
  const whole = 360, ps = [10, 5, 2.5], vals = ps.map((p) => (whole * p) / 100), tot = vals.reduce((a, b) => a + b, 0);
  mk("u01-18", "maths-u01-percent-bar", "bar-model", "17.5% of £360 built from 10%, 5% and 2.5%",
    `10% of £360 is £${vals[0]}; halve it for 5% (£${vals[1]}) and again for 2.5% (£${vals[2]}). Together 17.5% is £${tot}.`,
    `Bars on one scale: 10% of £360 is £36, 5% is £18 (half as long), 2.5% is £9 (half again), and 17.5% is the three joined, £63.`,
    [`10% of £360 is £36: divide by 10.`, `5% is half of that, £18; 2.5% is half again, £9. Each bar is half the one above.`, `Joining the three bars makes 17.5%, bracketed as £63.`],
    { prefix: "£", bars: [{ label: "10%", parts: [{ value: vals[0], shade: true }] }, { label: "5%", parts: [{ value: vals[1], colour: "a4" }] }, { label: "2.5%", parts: [{ value: vals[2], colour: "a5" }] },
      { label: "17.5%", parts: [{ value: vals[0], shade: true }, { value: vals[1], colour: "a4" }, { value: vals[2], colour: "a5" }] }],
      braces: [{ bar: 3, from: 0, to: 2, value: tot, text: `17.5% = £${tot}` }],
      checks: ps.map((p, i) => ({ type: "percent", of: whole, percent: p, value: vals[i] })).concat([{ type: "percent", of: whole, percent: 17.5, value: tot }]),
      fromLesson: ["10% = £36, 5% = £18, 2.5% = £9", "= £63"] });
}

// ---------- u01-19 Ratios: scaling a recipe for 6 to 15 people ----------
{
  const k = 15 / 6, flour = 450;
  mk("u01-19", "maths-u01-recipe-scale", "bar-model", "Scaling a recipe by 15 ÷ 6 = 2.5",
    `Fifteen people is 2.5 lots of six, so every amount is multiplied by 2.5: ${flour} g of flour becomes ${fmt(flour * k)} g.`,
    `Two bars on the same scale: 450 g for 6 people, and 450 g + 450 g + 225 g = 1,125 g for 15 people.`,
    ["The top bar is the flour for 6 people, 450 g.", "The lower bar is two whole copies of it and a half copy: 450 + 450 + 225.", `That is 450 × 2.5 = ${fmt(flour * k)} g, the flour for 15 people.`],
    { suffix: " g", bars: [{ label: "6 people", parts: [{ value: flour, shade: true }] }, { label: "15 people", parts: [{ value: flour, shade: true }, { value: flour, shade: true }, { value: flour / 2, colour: "a4" }] }],
      braces: [{ bar: 1, from: 0, to: 2, value: flour * k, text: `× 2.5 = ${fmt(flour * k)} g` }],
      checks: [{ type: "multiplier", from: flour, percent: (k - 1) * 100, to: flour * k, name: `450 × 2.5 = ${fmt(flour * k)}` }],
      fromLesson: ["15 ÷ 6 = 2.5", "450 × 2.5 = 1,125 g"] });
}

// ---------- u01-21 Roots: √90 between 9.4 and 9.5 ----------
mk("u01-21", "maths-u01-root90", "number-line", "Trapping √90",
  "9.4² = 88.36 is below 90 and 9.5² = 90.25 is just above, so √90 lies between 9.4 and 9.5, very close to 9.5: √90 ≈ 9.5 to one decimal place.",
  "A number line from 9 to 10 with marks at 9.4 and 9.5 and a point for √90 just left of 9.5.",
  ["The line runs from 9 to 10, since 81 < 90 < 100.", "9.4 squared is 88.36, too small; 9.5 squared is 90.25, just too big.", "So √90 ≈ 9.487 sits just left of 9.5 and rounds to 9.5."],
  { range: [9, 10], ticks: { step: 0.1 }, narrowTicks: [9, 9.2, 9.4, 9.6, 9.8, 10], points: [{ value: Math.sqrt(90), expr: "sqrt(90)", label: "√90" }],
    intervals: [{ from: 9.4, to: 9.5, closed: [false, false], label: "88.36 < 90 < 90.25", colour: "a4" }],
    checks: [{ type: "value", expr: "9.4^2", value: "88.36" }, { type: "value", expr: "9.5^2", value: "90.25" }, { type: "round", value: "sqrt(90)", dp: 1, result: "9.5" }, { type: "round", value: "sqrt(90)", dp: 2, result: "9.49" }],
    fromLesson: ["9.5^{2} = 90.25", "9.4^{2} = 88.36"] });

// ---------- u01-23 Rounding: 21.8 to 1 significant figure ----------
mk("u01-23", "maths-u01-round-21-8", "number-line", "21.8 to 1 significant figure",
  "To one significant figure 21.8 rounds to a multiple of 10. It is nearer 20 than 30 (the halfway point is 25), so it rounds to 20, the first step of the estimate (20 × 5) ÷ 0.2.",
  "A number line from 10 to 30 with 21.8 marked, closer to 20 than to 30, and the halfway point 25 dashed.",
  ["The candidates are the multiples of 10 either side: 20 and 30.", "The halfway point between them is 25.", "21.8 is below 25, so it rounds down to 20."],
  { range: [10, 30], ticks: { step: 5 }, minor: 1, points: [{ value: 21.8, label: "21.8" }],
    intervals: [{ from: 15, to: 25, closed: [true, false], label: "rounds to 20", colour: "a4" }],
    checks: [{ type: "round", value: 21.8, sf: 1, result: 20 }, { type: "round", value: 4.93, sf: 1, result: 5 }, { type: "round", value: 0.198, sf: 1, result: 0.2 }],
    fromLesson: ["(20 × 5) ÷ 0.2"] });

// ---------- u01-24 Significant figures: 167.4154… to 3 s.f. ----------
mk("u01-24", "maths-u01-sig-figs", "number-line", "167.4154… to 3 significant figures",
  `To 3 significant figures the choice is 167 or 168. 167.4154… is below the halfway point 167.5, so the area is ${fmt(roundTo(167.4154, { sf: 3 }))} cm² (3 s.f.).`,
  "A number line from 167 to 168 with the halfway point 167.5 and the value 167.4154 marked to its left.",
  ["Three significant figures keep the digits 1, 6 and 7, so the answer is 167 or 168.", "The halfway point is 167.5.", "167.4154 is below it: round down to 167."],
  { range: [167, 168], ticks: { step: 0.5 }, minor: 0.1, points: [{ value: 167.4154, label: "167.4154…" }],
    intervals: [{ from: 167, to: 167.5, closed: [true, false], label: "rounds to 167", colour: "a4" }],
    checks: [{ type: "round", value: 167.4154, sf: 3, result: 167 }], fromLesson: ["167.4154", "Area = 167 cm^{2} (3 s.f.)"] });

// ---------- u01-25 Sequences: 17, 13, 9, 5 ----------
mk("u01-25", "maths-u01-arithmetic-sequence", "sequence", "17, 13, 9, 5, …: nth term 21 − 4n",
  "The terms fall by 4 each time, so the nth term is −4n + c; n = 1 gives c = 21. The rule 21 − 4n gives every term, and the 30th is 21 − 120 = −99.",
  "Four boxes 17, 13, 9, 5 with arrows of −4 between them, and the rule nth term = 21 − 4n.",
  ["The terms are 17, 13, 9 and 5, for n = 1 to 4.", "Each step is −4: the common difference.", "The nth term is 21 − 4n; for n = 30 it is −99."],
  { terms: [17, 13, 9, 5], more: true, rule: { kind: "nth", expr: "21-4*n" }, show: "differences", ruleText: "nth term = 21 − 4n",
    checks: [{ type: "nth", n: 30, value: -99 }], fromLesson: ["17, 13, 9, 5", "21 − 4n", "−99"] });

// ---------- u01-26 Number patterns: 2, 7, 14, 23, 34 ----------
mk("u01-26", "maths-u01-quadratic-sequence", "sequence", "A constant second difference: n² + 2n − 1",
  "The first differences 5, 7, 9, 11 rise by 2 each time. A constant second difference of 2 means the sequence is quadratic with 2 ÷ 2 = 1 n²: the nth term is n² + 2n − 1.",
  "Five boxes 2, 7, 14, 23, 34; first differences +5, +7, +9, +11 beneath; second differences +2, +2, +2 beneath those.",
  ["The terms 2, 7, 14, 23, 34 for n = 1 to 5.", "First differences: 5, 7, 9, 11.", "Second differences: 2 each time, so the n² coefficient is 1.", "The nth term is n² + 2n − 1."],
  { terms: [2, 7, 14, 23, 34], more: true, rule: { kind: "nth", expr: "n^2+2*n-1" }, show: "second", ruleText: "nth term = n² + 2n − 1",
    fromLesson: ["2, 7, 14, 23, 34", "5, 7, 9, 11", "n^{2} + 2n − 1"] });

// ---------- u01-29 Reverse percentages: £68 is 85% ----------
{
  const sale = 68, off = 15, orig = sale / (1 - off / 100);
  mk("u01-29", "maths-u01-reverse-percent", "bar-model", "£68 is 85% of the original",
    `After 15% off, the sale price is 85% of the original, so the original is £68 ÷ 0.85 = £${fmt(orig)}, not £68 + 15%.`,
    `A bar for the original price split into 85%, £68, and 15%, £${fmt(orig - sale)}, with the whole bracketed as £${fmt(orig)}.`,
    ["The whole bar is the original price, 100%.", `The sale price, £68, is the 85% part.`, `So 1% is £0.80 and 100% is £${fmt(orig)}; the 15% taken off was £${fmt(orig - sale)}.`],
    { prefix: "£", bars: [{ parts: [{ value: sale, shade: true, text: "85% = £68" }, { value: orig - sale, colour: "a2", text: "15%" }] }],
      braces: [{ bar: 0, from: 0, to: 1, value: orig, text: `100% = £${fmt(orig)}` }],
      checks: [{ type: "multiplier", from: orig, percent: -off, to: sale }, { type: "percent", of: orig, percent: off, value: orig - sale }],
      fromLesson: ["68 ÷ 0.85 = £80", "85% of the original"] });
}
void m;
console.log("u01 specs written");
