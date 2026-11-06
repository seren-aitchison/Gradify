// MathGradify's tools: the expression parser, generated practice, the step-by-step checker and the grapher.
import { test } from "node:test";
import assert from "node:assert/strict";
import * as M from "../kit/interactive/mathexpr.js";
import * as G from "../kit/interactive/mathgen.js";
import * as C from "../kit/interactive/stepcheck.js";
import { CHALLENGES, matches, pathFor } from "../kit/interactive/grapher.js";
import maths from "../kit/courses/maths/course.js";
import { IDS } from "../kit/courses/maths/ids.js";

test("maths expressions: equivalence, including implicit multiplication, functions and constants", () => {
  const yes = [["2x(x+3)", "2x^2+6x"], ["(x+1)(x−2)", "x^2−x−2"], ["sin^2(x)+cos(x)^2", "1"], ["e^(2x)", "exp(2x)"], ["3x^-1", "3/x"], ["−x^2", "−(x^2)"], ["2^3^2", "512"], ["√(4x)", "2sqrt(x)", { range: [0.1, 5] }], ["ln(x^2)", "2ln(x)", { range: [0.2, 5] }], ["x × y", "y*x"]];
  for (const [a, b, o] of yes) assert.ok(M.equivalent(a, b, o), `${a} ≡ ${b}`);
  const no = [["(x+1)(x−2)", "x^2+x−2"], ["(a+b)^2", "a^2+b^2"], ["sqrt(x+9)", "sqrt(x)+3", { range: [0.1, 5] }], ["2x", "x^2"]];
  for (const [a, b, o] of no) assert.ok(!M.equivalent(a, b, o), `${a} ≢ ${b}`);
  assert.ok(M.equivalent("x^3/3 + 7", "x^3/3", { upToConstant: true }));
});

test("maths expressions: reading numbers, lists and forms, and clear errors", () => {
  assert.equal(M.numberFrom("3/4"), 0.75);
  assert.ok(Math.abs(M.numberFrom("2sqrt(3)") - 2 * Math.sqrt(3)) < 1e-12);
  assert.equal(M.numberFrom("1.2e3"), 1200);
  assert.ok(Number.isNaN(M.numberFrom("x + 1")));
  assert.deepEqual(M.numbersFrom("x = 2 or x = −3"), [2, -3]);
  assert.ok(M.form.expanded("2x^2 + 6x") && !M.form.expanded("2x(x + 3)"));
  assert.ok(M.form.factorised("(x − 1)^2") && !M.form.factorised("x^2 − 1"));
  for (const [bad, msg] of [["2x+(3", /isn't closed/], ["3x)", /without an opening/], ["4 $ 2", /recognise/]]) assert.throws(() => M.parse(bad), msg);
  assert.throws(() => M.parse("process.exit()"), "no code can run: unknown names are letters, and . is rejected");
});

test("maths practice: every problem type marks its own answer right and a wrong one wrong", () => {
  let s = 9; const r = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (const kind of Object.keys(G.KINDS)) for (let i = 0; i < 150; i++) {
    const p = G.gen(r, kind);
    assert.ok(p.q.length > 20 && p.method.length > 20, `${kind}: question and method`);
    assert.ok(G.isRight(p, G.answerText(p)), `${kind}: "${G.answerText(p)}" accepted for ${p.q}`);
    const wrong = p.answers ? p.answers.map((x) => x + 1).join(", ") : String(p.answer + 1 + Math.abs(p.answer));
    assert.ok(!G.isRight(p, wrong), `${kind}: wrong answer rejected`);
  }
});

test("maths step by step: every problem set's worked solutions pass, line by line", async () => {
  assert.ok(maths.workspace.cases.length >= 6);
  for (const c of maths.workspace.cases) {
    const set = (await c.load()).default;
    assert.equal(set.id, c.id);
    assert.deepEqual(C.validateSet(set), [], set.id);
    for (const l of set.lessons) assert.ok(IDS[l], `${set.id}: lesson ${l} exists`);
  }
});

test("maths step by step: errors are caught at the line where they happen", async () => {
  const sets = Object.fromEntries(await Promise.all(maths.workspace.cases.map(async (c) => [c.id, (await c.load()).default])));
  const p = (set, id) => sets[set].problems.find((x) => x.id === id);
  assert.ok(!C.checkLine(p("expanding", "expand-1"), "3x + 12 − 2x − 10").ok, "sign error in the second bracket");
  assert.equal(C.checkLine(p("expanding", "expand-1"), "3x + 12 − 2x + 10").final, false, "right but not simplified");
  assert.ok(!C.checkLine(p("linear", "lin-1"), "3x + 6 = 2x + 5").ok, "wrong expansion");
  assert.match(C.checkLine(p("quadratics", "quad-2"), "x = 4").why, /lost a solution/, "dividing by x loses x = 0");
  assert.equal(C.checkLine(p("factorising", "fact-4"), "3(x^2 − 4)").final, false, "not fully factorised");
  assert.ok(C.checkLine(p("differentiation", "diff-2"), "y = 3x^-2 + 2x^(1/2)").ok, "rewriting before differentiating is a valid step");
  assert.ok(C.checkLine(p("integration", "int-1"), "2x^3 − 2x^2 + 3x + 5").final, "an antiderivative can differ by a constant");
  assert.ok(!C.checkLine(p("integration", "int-1"), "12x − 4").ok, "differentiating instead of integrating");
  assert.equal(C.scoreProblem({ solved: true }), 1);
  assert.ok(C.scoreProblem({ solved: true, badLines: 1, hints: 1 }) < 1 && C.scoreProblem({ revealed: true, solved: true }) === 0);
});

test("maths grapher: every challenge is reachable with the sliders, and plotting breaks at asymptotes", () => {
  for (const ch of CHALLENGES) {
    for (const v of Object.values(ch.target)) assert.ok(v >= -5 && v <= 5 && Number.isInteger(v * 2), `${ch.id}: target reachable on a 0.5 step`);
    assert.ok(matches(ch, ch.target));
  }
  const d = pathFor((x) => 1 / x, { W: 100, H: 100, x: [-5, 5], y: [-5, 5] });
  assert.ok((d.match(/M/g) || []).length >= 2, "1/x is drawn as two pieces");
});
