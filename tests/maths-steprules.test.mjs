// MathGradify step rules (kit/interactive/steprules.js): every model-solution line names its rule, common
// mistakes are recognised by name, and "Show the next step" continues from the student's own working.
import { test } from "node:test";
import assert from "node:assert/strict";
import { explainStep, diagnose, nextStep, RULES, MISTAKES, polyCoeffs, nice } from "../kit/interactive/steprules.js";
import { checkLine } from "../kit/interactive/stepcheck.js";

const SETS = ["expanding", "factorising", "linear", "quadratics", "differentiation", "integration"];
const sets = await Promise.all(SETS.map(async (s) => (await import(`../kit/courses/maths/steps/${s}.js`)).default));
const P = Object.fromEntries(sets.flatMap((s) => s.problems.map((p) => [p.id, p])));

test("every line of every model solution names a specific rule, never the generic fallback", () => {
  for (const set of sets) for (const p of set.problems) {
    let prev = null;
    for (const line of p.solution) {
      const r = explainStep(p, prev, line);
      assert.ok(RULES[r.id], `${p.id}: "${line}" has an unknown rule ${r.id}`);
      assert.notEqual(r.id, "rewrite", `${p.id}: "${line}" gets only the generic rule`);
      assert.ok(r.title && r.text, `${p.id}: "${line}" has no title or text`);
      prev = line;
    }
  }
});

test("the rule names the operation done to both sides", () => {
  const t = (id, prev, line) => explainStep(P[id], prev, line).title;
  assert.equal(t("lin-1", "3x − 6 = 2x + 5", "x − 6 = 5"), "Subtracted 2x from both sides");
  assert.equal(t("lin-1", "x − 6 = 5", "x = 11"), "Added 6 to both sides");
  assert.equal(t("lin-2", "3x = −15", "x = −5"), "Divided both sides by 3");
  assert.equal(t("lin-5", null, "2(x + 1) = 3(x − 2)"), "Multiplied both sides by 6");
  assert.equal(t("lin-6", "10 = 2x", "x = 5"), "Swapped the sides and divided both sides by 2");
  assert.equal(t("lin-1", null, "3x − 2x = 5 + 6"), "Subtracted 2x and added 6, on both sides", "a student's own route is explained too");
  assert.equal(explainStep(P["quad-1"], "(x − 2)(x − 3) = 0", "x = 2 or x = 3").id, "zero-product");
  assert.equal(explainStep(P["quad-4"], "(x + 3)^2 = 7", "x = −3 + sqrt(7) or x = −3 − sqrt(7)").id, "square-root");
  assert.equal(explainStep(P["quad-6"], null, "x = (5 + sqrt(37))/6 or x = (5 − sqrt(37))/6").id, "quadratic-formula");
});

test("common mistakes are recognised by name", () => {
  const cases = [
    ["expand-1", null, "3x + 12 − 2x − 10", "bracket-sign"],
    ["expand-1", null, "3x + 4 − 2x + 10", "partial-expand"],
    ["expand-3", null, "4x^2 + 1", "square-of-sum"],
    ["expand-2", null, "x^2 − 15", "missing-cross"],
    ["expand-2", null, "x^2 + 2x − 15", "sign-error"],
    ["fact-2", null, "(x − 3)(x − 4)", "factor-signs"],
    ["lin-1", null, "3x − 2 = 2x + 5", "partial-expand"],
    ["lin-6", null, "7 − 6 − 2x = 4x − 9", "bracket-sign"],
    ["lin-1", "x − 6 = 5", "x = −1", "move-sign"],
    ["lin-2", null, "3x + 7 = 2x − 8", "one-side"],
    ["lin-2", "3x + 7 = −8", "x + 7 = −8/3", "divide-not-all"],
    ["quad-1", "(x − 2)(x − 3) = 0", "x = −2 or x = −3", "root-sign"],
    ["quad-5", null, "x − 1 = 3", "negative-root"],
    ["quad-5", null, "x = 4", "negative-root"],
    ["quad-2", null, "x = 4", "divided-by-variable"],
    ["quad-5", null, "x^2 + 1 = 9", "square-of-sum"],
    ["diff-1", null, "12x^2 − 10x + 7 − 2", "constant-not-zero"],
    ["diff-1", null, "12x^3 − 10x^2 + 7x", "power-not-reduced"],
    ["diff-1", null, "4x^2 − 5x + 7", "power-not-multiplied"],
    ["diff-3", null, "5(3x + 1)^4", "chain-missing"],
    ["diff-4", null, "2x cos(x)", "product-of-derivatives"],
    ["diff-5", null, "7/(x − 3)^2", "quotient-order"],
    ["diff-5", null, "2", "quotient-of-derivatives"],
    ["int-1", null, "12x − 4", "differentiated-instead"],
    ["int-3", null, "(2x + 3)^5/5 + c", "integral-factor"],
    ["int-6", null, "sin(3x) + c", "integral-factor"],
  ];
  for (const [id, prev, line, want] of cases) {
    assert.equal(checkLine(P[id], line).ok, false, `${id}: "${line}" should be rejected by the checker`);
    const d = diagnose(P[id], prev, line);
    assert.equal(d?.id ?? null, want, `${id}: "${line}"`);
    assert.ok(MISTAKES[d.id] && d.title && d.text);
  }
  assert.match(diagnose(P["diff-3"], null, "5(3x + 1)^4").text, /here, 3/, "the chain rule message names the inside's derivative");
});

test("an error that matches no named mistake isn't given a wrong name", () => {
  assert.equal(diagnose(P["lin-2"], "3x = −15", "x = −45"), null);
  assert.equal(diagnose(P["expand-2"], null, "7x^3 + 1"), null);
});

test("mistake explanations never contain the answer to the problem", () => {
  for (const [id, prev, line] of [["lin-1", "x − 6 = 5", "x = −1"], ["fact-2", null, "(x − 3)(x − 4)"], ["quad-5", null, "x = 4"]]) {
    const d = diagnose(P[id], prev, line);
    for (const s of P[id].solutions || []) assert.ok(!new RegExp(`x = ${s}\\b`).test(d.text), `${id} gives away x = ${s}`);
    if (P[id].solution) assert.ok(!d.text.includes(P[id].solution.at(-1)), `${id} gives away the final line`);
  }
});

test("Show the next step continues from the student's furthest point in the model solution", () => {
  assert.equal(nextStep(P["lin-1"], []), "3x − 6 = 2x + 5");
  assert.equal(nextStep(P["lin-1"], ["3x − 6 = 2x + 5"]), "x − 6 = 5");
  assert.equal(nextStep(P["lin-1"], ["x − 6 = 5"]), "x = 11", "a later line of the student's own counts");
  assert.equal(nextStep(P["quad-5"], ["x^2 − 2x − 8 = 0"]), "(x − 4)(x + 2) = 0");
  assert.equal(nextStep(P["expand-3"], ["(2x − 1)(2x − 1)"]), "4x^2 − 2x − 2x + 1");
  for (const p of Object.values(P)) assert.ok(checkLine(p, nextStep(p, [])).ok, `${p.id}: the first shown step is valid`);
});

test("number helpers", () => {
  assert.deepEqual(polyCoeffs("(x + 3)(x − 5)"), [-15, -2, 1]);
  assert.equal(polyCoeffs("sin(x)"), null);
  assert.equal(nice(0.5), "1/2"); assert.equal(nice(-1 / 3), "−1/3"); assert.equal(nice(4), "4");
});
