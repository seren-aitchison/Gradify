// School 14, Discrete Mathematics: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u14.mjs
import { mk } from "./spec.mjs";

const C = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return Math.round(r); };

// ---------- u14-03 PINs with a repeated digit ----------
{
  const all = 10 ** 4, distinct = 10 * 9 * 8 * 7, rep = all - distinct;
  mk("u14-03", "maths-u14-pin-repeats", "bar-model", "4-digit PINs: all distinct or a repeat",
    `There are 10⁴ = ${all.toLocaleString("en-GB")} PINs. Those with four different digits number 10 × 9 × 8 × 7 = ${distinct.toLocaleString("en-GB")}, so ${rep.toLocaleString("en-GB")} have at least one repeat: count the complement.`,
    `One bar of 10,000 split into ${distinct} PINs with all digits different and ${rep} with a repeated digit.`,
    ["All PINs: 10 choices for each of 4 places, 10 000.", "No repeats: 10 × 9 × 8 × 7 = 5 040.", "At least one repeat: 10 000 − 5 040 = 4 960."],
    { prefix: "", bars: [{ parts: [{ value: distinct, label: "all different: 5,040" }, { value: rep, label: "a repeat: 4,960" }] }], braces: [{ bar: 0, from: 0, to: 1, value: all }], checks: [{ type: "ratio", bar: 0, ratio: [distinct, rep], total: all }] });
}
// ---------- u14-05 committees with at least one woman ----------
{
  const all = C(10, 3), none = C(6, 3), atLeast = all - none;
  mk("u14-05", "maths-u14-committees", "bar-model", "Committees of 3 from 6 men and 4 women",
    `C(10, 3) = ${all} committees in all. All-men committees number C(6, 3) = ${none}, so ${all} − ${none} = ${atLeast} include at least one woman.`,
    `One bar of ${all} split into ${none} all-male committees and ${atLeast} with at least one woman.`,
    [`Any 3 of 10 people: C(10, 3) = ${all}.`, `No women: C(6, 3) = ${none}.`, `At least one woman: ${all} − ${none} = ${atLeast}.`],
    { bars: [{ parts: [{ value: none, label: "all men: 20" }, { value: atLeast, label: "at least one woman: 100" }] }], braces: [{ bar: 0, from: 0, to: 1, value: all }], checks: [{ type: "ratio", bar: 0, ratio: [none, atLeast], total: all }] });
}
// ---------- u14-06 coefficients of (2 + x)^5 ----------
{
  const co = [0, 1, 2, 3, 4, 5].map((k) => C(5, k) * 2 ** (5 - k));
  mk("u14-06", "maths-u14-binomial-coefficients", "barchart", "The terms of (2 + x)⁵",
    `The coefficient of xᵏ is C(5, k) × 2⁵⁻ᵏ: ${co.join(", ")}. For x³ it is C(5, 3) × 2² = ${co[3]}. They add to 3⁵ = 243, the value at x = 1.`,
    `Bar chart of the coefficients of x⁰ to x⁵ in (2 + x)⁵: ${co.join(", ")}; the bar for x³ is highlighted.`,
    ["The term in xᵏ is C(5, k) × 2⁵⁻ᵏ × xᵏ.", `The coefficients are ${co.join(", ")}.`, `For x³: C(5, 3) × 4 = ${co[3]}.`],
    { categories: [0, 1, 2, 3, 4, 5], values: co, range: { y: [0, 90] }, ticks: [20, 40, 60, 80], axisLabels: ["power of x", "coefficient"], highlight: [3], checks: [{ type: "total", value: 243 }, { type: "mode", value: 1 }] });
}
// ---------- u14-08 inclusion-exclusion 2, 3, 5 ----------
{
  const f = (d) => Math.floor(100 / d), A = f(2), B = f(3), Cc = f(5), AB = f(6), AC = f(10), BC = f(15), ABC = f(30);
  const union = A + B + Cc - AB - AC - BC + ABC;
  const reg = { ABC, AB: AB - ABC, AC: AC - ABC, BC: BC - ABC, A: A - AB - AC + ABC, B: B - AB - BC + ABC, C: Cc - AC - BC + ABC };
  reg[""] = 100 - union;
  mk("u14-08", "maths-u14-divisible-2-3-5", "venn", "Integers 1 to 100 divisible by 2, 3 or 5",
    `Adding ${A} + ${B} + ${Cc} counts overlaps twice, so subtract ${AB} + ${AC} + ${BC} and add back ${ABC}: ${union}. The remaining ${100 - union} numbers are divisible by none of 2, 3, 5.`,
    `Three overlapping circles for multiples of 2, 3 and 5 among 1 to 100, with region counts; ${union} numbers lie inside at least one circle and ${100 - union} outside.`,
    ["Each circle holds the multiples of 2, 3 or 5.", "Overlaps hold multiples of 6, 10, 15 and the centre multiples of 30.", `Inclusion–exclusion gives ${union}; ${100 - union} lie outside all three.`],
    { sets: [{ name: "A", label: "÷2" }, { name: "B", label: "÷3" }, { name: "C", label: "÷5" }], regions: reg, universe: { n: 100 },
      checks: [{ type: "count", event: "A", n: A }, { type: "count", event: "B", n: B }, { type: "count", event: "C", n: Cc }, { type: "count", event: "A∩B", n: AB }, { type: "count", event: "A∩B∩C", n: ABC }, { type: "count", event: "A∪B∪C", n: union }, { type: "total", n: 100 }] });
}
// ---------- u14-09 making 10p ----------
{
  const ways = [0, 1, 2].map((k5) => Math.floor((10 - 5 * k5) / 2) + 1);
  mk("u14-09", "maths-u14-coin-ways", "barchart", "Ways to make 10p from 1p, 2p and 5p",
    `Split by the number of 5p coins: none leaves 10p for 1p and 2p (${ways[0]} ways), one leaves 5p (${ways[1]} ways), two leaves 0p (${ways[2]} way): ${ways.reduce((a, b) => a + b)} in all, the coefficient of x¹⁰ in the generating function.`,
    `Bar chart of ways by number of 5p coins used: 0 gives ${ways[0]}, 1 gives ${ways[1]}, 2 gives ${ways[2]}.`,
    ["With k fives, the rest 10 − 5k is made from 1p and 2p: ⌊(10 − 5k)/2⌋ + 1 ways.", `k = 0, 1, 2 give ${ways.join(", ")}.`, `Total ${ways.reduce((a, b) => a + b)}.`],
    { categories: [0, 1, 2], values: ways, range: { y: [0, 7] }, ticks: [2, 4, 6], axisLabels: ["number of 5p coins", "ways"], checks: [{ type: "total", value: 10 }, { type: "mode", value: 0 }] });
}
// ---------- u14-10 partitions of 5 ----------
{
  const largest = [1, 2, 3, 4, 5], counts = [1, 2, 2, 1, 1];
  mk("u14-10", "maths-u14-partitions-of-5", "barchart", "The 7 partitions of 5 by largest part",
    "The partitions of 5 are 5, 4+1, 3+2, 3+1+1, 2+2+1, 2+1+1+1 and 1+1+1+1+1: p(5) = 7. Counting by the size of the largest part gives 1, 2, 2, 1, 1.",
    "Bar chart of how many partitions of 5 have largest part 1 to 5: 1, 2, 2, 1, 1.",
    ["Largest part 5: just 5.", "Largest part 4: 4+1. Largest part 3: 3+2, 3+1+1.", "Largest part 2: 2+2+1, 2+1+1+1. Largest part 1: 1+1+1+1+1.", "In total 7."],
    { categories: largest, values: counts, range: { y: [0, 3] }, ticks: [1, 2, 3], axisLabels: ["largest part", "partitions"], checks: [{ type: "total", value: 7 }] });
}
