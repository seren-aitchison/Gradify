// School 16, Logic, Sets and Foundations: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u16.mjs
import { mk } from "./spec.mjs";

const must = (c, m) => { if (!c) throw new Error(m); };
const m = (x) => `${x}`.replace(/-/g, "−");
const G = (range, ticks, body) => ({ range, ticks, grid: [Math.abs(ticks[0][1] - ticks[0][0]), Math.abs(ticks[1][1] - ticks[1][0])], height: [380, 340], axisLabels: ["x", "y"], ...body });
const T = (a, b) => [[...a], [...b]];
const gcd = (a, b) => (b ? gcd(b, a % b) : a), lcm = (a, b) => (a * b) / gcd(a, b);

// ---------- u16-03 Set operations ----------
{
  const A = [1, 2, 3, 4], B = [3, 4, 5], aMinusB = A.filter((x) => !B.includes(x)), bMinusA = B.filter((x) => !A.includes(x)), both = A.filter((x) => B.includes(x));
  must(aMinusB.join() === "1,2" && bMinusA.join() === "5", "set difference");
  mk("u16-03", "maths-u16-set-difference", "venn", "A \\ B, B \\ A and A Δ B",
    "With A = {1, 2, 3, 4} and B = {3, 4, 5}: A \\ B = {1, 2} is the part of A outside B, B \\ A = {5} the part of B outside A, and the symmetric difference A Δ B = {1, 2, 5} joins the two, leaving out the shared 3 and 4.",
    "A two-circle Venn diagram: 1 and 2 only in A, 3 and 4 in both, 5 only in B.",
    ["Place each element: 1 and 2 are only in A; 3 and 4 are in both; 5 is only in B.", "A \\ B is what is left of A once the overlap is removed: {1, 2}.", "B \\ A is {5}.", "A Δ B takes both outer parts: {1, 2, 5}."],
    { sets: [{ name: "A", label: "A" }, { name: "B", label: "B" }], regions: { A: aMinusB.length, AB: both.length, B: bMinusA.length, "": 0 },
      checks: [{ type: "count", event: "A∩B′", n: aMinusB.length, name: "A \\ B = {1, 2} has 2 elements" }, { type: "count", event: "B∩A′", n: bMinusA.length, name: "B \\ A = {5} has 1 element" },
        { type: "count", event: "(A∩B′)∪(B∩A′)", n: 3, name: "A Δ B = {1, 2, 5} has 3 elements" }], fromLesson: ["A Δ B = {1, 2, 5}"] });
}

// ---------- u16-05 Complements and De Morgan ----------
{
  const U = [...Array(10)].map((_, i) => i + 1), ev = U.filter((x) => x % 2 === 0), t3 = U.filter((x) => x % 3 === 0);
  const only = (a, b) => a.filter((x) => !b.includes(x)), both = ev.filter((x) => t3.includes(x)), out = U.filter((x) => !ev.includes(x) && !t3.includes(x));
  must(out.join() === "1,5,7", "complement");
  mk("u16-05", "maths-u16-de-morgan", "venn", "(A ∪ B)ᶜ in {1, …, 10}",
    "A = evens and B = multiples of 3. The union covers 2, 3, 4, 6, 8, 9, 10, so its complement is {1, 5, 7}: the elements outside both circles, which is also Aᶜ ∩ Bᶜ.",
    "A Venn diagram with evens in A, multiples of 3 in B, 6 in the overlap and 1, 5 and 7 outside both circles.",
    ["Place 1 to 10: evens in A, multiples of 3 in B, and 6 in both.", "A ∪ B holds everything inside either circle.", "The complement (A ∪ B)ᶜ is what lies outside both circles: {1, 5, 7}.", "That is the same as Aᶜ ∩ Bᶜ, as De Morgan says."],
    { sets: [{ name: "A", label: "evens" }, { name: "B", label: "mult. of 3" }], regions: { A: only(ev, t3).length, AB: both.length, B: only(t3, ev).length, "": out.length }, universe: { label: "U = {1, …, 10}" },
      checks: [{ type: "count", event: "(A∪B)′", n: 3, name: "(A ∪ B)ᶜ = {1, 5, 7} has 3 elements" }, { type: "count", event: "A′∩B′", n: 3, name: "Aᶜ ∩ Bᶜ has the same 3 elements" }, { type: "total", n: 10, name: "the universe has 10 elements" }], fromLesson: ["{1, 5, 7}"] });
}

// ---------- u16-04 Union and intersection of intervals ----------
mk("u16-04", "maths-u16-interval-union", "number-line", "Intersection of [0, 1 + 1/n] is [0, 1]",
  "Every interval [0, 1 + 1/n] contains [0, 1], and any x > 1 is excluded once 1 + 1/n < x, so the intersection is exactly [0, 1]. The union of [1/n, 2] is (0, 2]: every positive x up to 2 gets in, but 0 never does.",
  "A number line from −1 to 3 with the half-open interval (0, 2] for the union and the closed interval [0, 1] for the intersection.",
  ["The intervals [1/n, 2] grow towards 0 as n increases but never reach it.", "So the union is (0, 2]: 0 excluded, 2 included.", "The intervals [0, 1 + 1/n] shrink towards 1 from above.", "So the intersection is [0, 1]."],
  { range: [-1, 3], ticks: { step: 1 }, intervals: [{ from: 0, to: 2, closed: [false, true], inequality: "0 < x ≤ 2", label: "⋃ [1/n, 2]", colour: "a1" }, { from: 0, to: 1, closed: [true, true], inequality: "0 ≤ x ≤ 1", label: "⋂ [0, 1 + 1/n]", colour: "a2" }], fromLesson: ["Intersection = [0, 1]"] });

// ---------- u16-11 Relations and functions: the unit circle ----------
mk("u16-11", "maths-u16-circle-relation", "geometry", "x² + y² = 1 is not a function of x",
  "At x = 0 the relation x² + y² = 1 holds for both y = 1 and y = −1, so the input 0 has two outputs. Only the upper half y = √(1 − x²) is a function.",
  "The unit circle with the points (0, 1) and (0, −1) joined by a vertical dashed line at x = 0.",
  ["The relation is the unit circle.", "At x = 0 the circle has two points, (0, 1) and (0, −1).", "A function gives one output per input, so the relation is not a function.", "Cutting it to the upper half gives y = √(1 − x²), which is."],
  { points: { O: [0, 0], P: [0, 1], Q: [0, -1] }, hide: ["O"], circles: [{ centre: "O", r: 1, colour: "a1" }], segments: [{ a: "P", b: "Q", colour: "a2", dash: "5 4" }], grid: { step: 1, axes: true, labels: 1 }, view: { x: [-1.8, 1.8], y: [-1.6, 1.6] }, height: [340, 320],
    checks: [{ type: "onCircle", circle: 0, points: ["P", "Q"], name: "(0, 1) and (0, −1) both lie on x² + y² = 1" }, { type: "value", expr: "sqrt(1-0^2)", value: 1, name: "√(1 − 0²) = 1: the function takes only the upper value" }], fromLesson: ["0 has two outputs"] });

// ---------- u16-12 Bijection 3x − 5 and its inverse ----------
{
  const f = "3*x-5", g = "(x+5)/3";
  mk("u16-12", "maths-u16-bijection-inverse", "graph", "f(x) = 3x − 5 and its inverse",
    "f is a bijection: every y is reached by exactly one x = (y + 5)/3. The graph of the inverse is the reflection of f in the line y = x; the two cross at (2.5, 2.5).",
    "The lines y = 3x − 5 and y = (x + 5)/3 drawn as reflections in the dashed line y = x, meeting at (2.5, 2.5).",
    ["f(x) = 3x − 5 is a straight line of gradient 3, so each output comes from one input.", "Solving y = 3x − 5 for x gives f⁻¹(y) = (y + 5)/3.", "Its graph is f reflected in y = x, with gradient 1/3.", "The curves meet on y = x, at x = 3x − 5, that is x = 2.5."],
    G({ x: [-1, 6], y: [-1, 6] }, T([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]), { curves: [{ expr: f, colour: "a1", label: "f", labelAt: [3.1, 4.7] }, { expr: g, colour: "a2", label: "f⁻¹", labelAt: [5.1, 3.6] }, { expr: "x", colour: "ink", dash: "5 4" }],
      points: [{ x: 2.5, y: 2.5, label: "(2.5, 2.5)", colour: "a4", dx: 10, dy: 22 }],
      checks: [{ type: "point", expr: f, x: 3, y: 4, name: "f(3) = 4" }, { type: "point", expr: g, x: 4, y: 3, name: "f⁻¹(4) = 3: the inverse undoes f" }, { type: "slope", expr: f, x: 1, value: 3, name: "f has gradient 3" }, { type: "slope", expr: g, x: 1, value: 1 / 3, name: "f⁻¹ has gradient 1/3" },
        { type: "intersect", a: f, b: g, x: 2.5, y: 2.5, name: "f and f⁻¹ meet at (2.5, 2.5)" }, { type: "point", expr: f, x: 2.5, y: 2.5, name: "that point is on y = x" }], fromLesson: ["(y + 5)/3"] }));
}

// ---------- u16-14 Equivalence classes mod 3 ----------
{
  const S = [1, 2, 3, 4, 5, 6], cls = [0, 1, 2].map((r) => S.filter((x) => x % 3 === r));
  must(cls.flat().length === 6 && cls[0].join() === "3,6", "classes");
  mk("u16-14", "maths-u16-classes-mod-3", "venn", "The classes of 'same remainder mod 3'",
    "The three classes {3, 6}, {1, 4} and {2, 5} do not overlap and together contain all six elements: an equivalence relation splits the set into a partition.",
    "Three separate groups of elements with no overlap: {3, 6}, {1, 4} and {2, 5}.",
    ["Sort 1 to 6 by remainder on division by 3.", "Remainder 0 gives {3, 6}, remainder 1 gives {1, 4}, remainder 2 gives {2, 5}.", "No element is in two classes, and every element is in one.", "So the classes partition the set."],
    { sets: [{ name: "A", label: "remainder 0" }, { name: "B", label: "remainder 1" }, { name: "C", label: "remainder 2" }], regions: { A: 2, B: 2, C: 2 }, universe: { label: "{1, …, 6}" },
      checks: [{ type: "count", event: "A∩B", n: 0, name: "classes 0 and 1 do not overlap" }, { type: "count", event: "A∩C", n: 0, name: "classes 0 and 2 do not overlap" }, { type: "count", event: "B∩C", n: 0, name: "classes 1 and 2 do not overlap" }, { type: "total", n: 6, name: "the three classes hold all 6 elements" }], fromLesson: ["Three classes partition the set"] });
}

// ---------- u16-15 Hasse diagram of divisibility on {1, 2, 3, 6} ----------
{
  const S = [1, 2, 3, 6], covers = [];
  for (const a of S) for (const b of S) if (a !== b && b % a === 0 && !S.some((c) => c !== a && c !== b && c % a === 0 && b % c === 0)) covers.push([a, b]);
  must(covers.length === 4 && !covers.some(([a, b]) => a === 1 && b === 6), "covers");
  mk("u16-15", "maths-u16-hasse-diamond", "geometry", "The Hasse diagram of divisibility on {1, 2, 3, 6}",
    "Only covering pairs are drawn: 1 is covered by 2 and by 3, and each of those by 6. The edge from 1 to 6 is left out because 2 lies between, so the diagram is a diamond.",
    "A diamond: 1 at the bottom, 2 and 3 in the middle and 6 at the top, with four edges and no edge from 1 straight to 6.",
    ["List the pairs a | b with nothing strictly between them: (1, 2), (1, 3), (2, 6), (3, 6).", "Draw 1 at the bottom and 6 at the top, with 2 and 3 between.", "Join each covering pair by an edge going upwards.", "1 | 6 is not drawn: it follows from the path through 2."],
    { points: { 1: [0, 0], 2: [-1, 1], 3: [1, 1], 6: [0, 2] }, segments: covers.map(([a, b]) => ({ a: `${a}`, b: `${b}`, colour: "a1", w: 2.6 })), view: { x: [-2, 2], y: [-0.7, 2.7] }, height: [300, 290],
      checks: [{ type: "value", expr: `${covers.length}`, value: 4, name: "divisibility on {1, 2, 3, 6} has exactly 4 covering pairs" }, { type: "distance", a: "2", b: "3", value: 2, name: "2 and 3 sit level: neither divides the other" }], fromLesson: ["the Hasse diagram is a diamond"] });
}

// ---------- u16-19 Divisors of 30 as a Boolean lattice ----------
{
  const D = [1, 2, 3, 5, 6, 10, 15, 30].filter((d) => 30 % d === 0), comp6 = D.filter((x) => lcm(6, x) === 30 && gcd(6, x) === 1);
  must(D.length === 8 && comp6.join() === "5", "boolean 30");
  const pos = { 1: [0, 0], 2: [-2, 1], 3: [0, 1], 5: [2, 1], 6: [-2.4, 2.3], 10: [0.4, 2.3], 15: [2.4, 2.3], 30: [0, 3.3] };
  const edges = [[1, 2], [1, 3], [1, 5], [2, 6], [3, 6], [2, 10], [5, 10], [3, 15], [5, 15], [6, 30], [10, 30], [15, 30]];
  for (const [a, b] of edges) must(b % a === 0 && D.includes(b / a) && [2, 3, 5].includes(b / a), `edge ${a}-${b}`);
  mk("u16-19", "maths-u16-divisors-30", "geometry", "The divisors of 30 form a cube",
    "The eight divisors of 30 match the eight subsets of {2, 3, 5}: going up one edge multiplies by a prime. The complement of 6 is 5, since lcm(6, 5) = 30 and gcd(6, 5) = 1, which is the complement of {2, 3} in {2, 3, 5}.",
    "A cube-shaped lattice with 1 at the bottom, 2, 3 and 5 above it, 6, 10 and 15 above those and 30 at the top; the vertices 6 and 5 are highlighted.",
    ["The divisors of 30 are 1, 2, 3, 5, 6, 10, 15, 30: eight, matching the subsets of {2, 3, 5}.", "Each edge multiplies by one prime, so the diagram is a cube.", "Complement of 6 = 2 × 3: the missing prime is 5.", "Check: lcm(6, 5) = 30 is the top and gcd(6, 5) = 1 is the bottom."],
    { points: pos, segments: edges.map(([a, b]) => ({ a: `${a}`, b: `${b}`, colour: "a1", w: 2.2 })), circles: [{ centre: "6", r: 0.3, colour: "a2" }, { centre: "5", r: 0.3, colour: "a2" }], view: { x: [-3.6, 3.6], y: [-0.7, 4] }, height: [360, 340],
      checks: [{ type: "value", expr: "6*5/1", value: lcm(6, 5), name: "lcm(6, 5) = 6 × 5 ÷ gcd(6, 5) = 30" }, { type: "value", expr: "2^3", value: D.length, name: "the cube has 2³ = 8 vertices" }], fromLesson: ["x = 5"] });
}

// ---------- u16-33 Induction: triangle numbers ----------
{
  const terms = [1, 2, 3, 4, 5].map((n) => (n * (n + 1)) / 2);
  must(terms.join() === "1,3,6,10,15", "triangles");
  mk("u16-33", "maths-u16-triangle-sums", "sequence", "1 + 2 + … + n as triangle numbers",
    "The sums 1, 1 + 2, 1 + 2 + 3, … are the triangle numbers 1, 3, 6, 10, 15. Each step adds a row of k + 1 dots, which is the inductive step k(k + 1)/2 + (k + 1) = (k + 1)(k + 2)/2.",
    "Five triangles of dots with 1, 3, 6, 10 and 15 dots, each one row longer than the last.",
    ["For n = 1 the sum is 1 = 1 × 2/2: the base case.", "Each new triangle adds a row with one more dot than the last.", "Adding row k + 1 turns k(k + 1)/2 into (k + 1)(k + 2)/2.", "So n(n + 1)/2 holds for every n ≥ 1; for example n = 5 gives 15."],
    { terms, rule: { kind: "nth", expr: "n*(n+1)/2" }, pattern: "triangle", more: true, ruleText: "sum to n = n(n + 1)/2", checks: [{ type: "nth", n: 100, value: 5050 }], fromLesson: ["n(n + 1)/2"] });
}
void m;
