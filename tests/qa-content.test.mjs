// The content checks in scripts/qa-content.mjs: each one catches a planted error and passes the correct form,
// and every course's notes pass the hard checks.
import { test } from "node:test";
import assert from "node:assert/strict";
import { escaping, notation, separatorInBrackets, numLine, numAnswerExplained, arithmetic, assertedText, sourceUrl } from "../scripts/qa-content.mjs";
import { contentChecks } from "../scripts/qa-content-run.mjs";

const file = (body) => "// notes\nexport default `\n" + body + "\n`;\n";

test("escaping: a single backslash is caught, a doubled one passes", () => {
  assert.equal(escaping(file("P: A \\ B is the set difference.")).length, 1);
  assert.equal(escaping(file("P: \\frac{1}{2}")).length, 1);
  assert.equal(escaping(file("P: A \\\\ B and \\\\frac{1}{2}, with \\` and \\$ escaped.")).length, 0);
  assert.equal(escaping(file("P: one\nP: two \\ three")).at(0).line, 4);
});

test("notation: an unclosed ^{ or _{ is caught", () => {
  assert.equal(notation("x^{2 + y"), true);
  assert.equal(notation("a_{n + 1"), true);
  assert.equal(notation("x^{2} + a_{n+1} + e^{−x^{2}}"), false);
});

test("separators: P(A | B) on a tagged line is caught, P(A ∣ B) passes", () => {
  assert.equal(separatorInBrackets("T: Conditional probability | P(A | B) = P(A ∩ B)/P(B)"), true);
  assert.equal(separatorInBrackets("T: Conditional probability | P(A ∣ B) = P(A ∩ B)/P(B)"), false);
  assert.equal(separatorInBrackets("P: prose may write P(A | B), since P: lines aren't split"), true);
  assert.equal(separatorInBrackets("plain prose (A | B) with no tag"), false);
});

test("NUM lines: an answer the parser would drop is caught", () => {
  assert.deepEqual(numLine("NUM1#x-1@1: What is 2 + 2? | 4 | 0 |  | 2 + 2 = 4.").problems, []);
  assert.equal(numLine("NUM1#x-1@1: What is P(Y | X)? | 0.8 | 0 |  | why").problems.length >= 1, true);
  assert.equal(numLine("NUM1: Area? | 12 | two |  | why").problems.length, 1);
  assert.equal(numLine("M1: not a number question | a | b | c | why"), null);
});

test("NUM explanations: the answer must be visible in the working, in any common form", () => {
  const ok = (l) => numAnswerExplained(numLine(l));
  assert.equal(ok("NUM1: q | 12 | 0 |  | 3 × 4 = 12."), true);
  assert.equal(ok("NUM1: q | 0.333 | 0.001 |  | 15q = 5, so q = 1/3."), true);
  assert.equal(ok("NUM1: q | 4 | 0 |  | Four rotations."), true);
  assert.equal(ok("NUM1: q | 1.8e10 | 1% |  | gives 1.8 × 10^{10} flops."), true);
  assert.equal(ok("NUM1: q | 12 | 0 |  | 3 × 4 = 13."), false);
});

test("arithmetic: a wrong sum is caught; right sums, algebra, percentages and distractors are not", () => {
  assert.deepEqual(arithmetic("> 3 × 4 = 13").map((x) => x.value), [12]);
  assert.equal(arithmetic("> 512 × 256 + 256 = 131,072").length, 1);
  assert.equal(arithmetic("> 17 × 23 = 391, and 2^{10} = 1,024").length, 0);
  assert.equal(arithmetic("> 512 × 256 + 256 = 131,328 parameters").length, 0);
  assert.equal(arithmetic("> 12/80 = 15% increase; 18 ÷ 24 × 100 = 75%").length, 0);
  assert.equal(arithmetic("> 48 × 52 = 2,500 − 4 = 2,496").length, 0);
  assert.equal(arithmetic("> x^{2} − 5x + 6 = 0 and f(2) = 8").length, 0);
  assert.equal(arithmetic("> A pupil writes 52 − 37 = 25.").length, 0);
  assert.equal(arithmetic(assertedText("M1: Which is right? | 5^{3} = 125 | 3^{5} = 125 | 125^{3} = 5 | Since 5 × 5 × 5 = 125.")).length, 0);
  assert.equal(arithmetic(assertedText("M1: Which is right? | 5 × 5 = 24 | 3 | 4 | why")).length, 1);
  assert.equal(arithmetic(assertedText("!: Thinking 0.3 × 0.3 = 0.9: it's 0.09.")).length, 0);
});

test("sources: an http or malformed link is flagged", () => {
  assert.equal(sourceUrl({ url: "https://www.gov.uk/x" }), true);
  assert.equal(sourceUrl({ url: "" }), true);
  assert.equal(sourceUrl({ url: "http://example.org/" }), false);
  assert.equal(sourceUrl({ url: "www.example.org" }), false);
});

test("every course's notes pass the hard content checks, and the arithmetic queue is empty", async () => {
  const res = await contentChecks();
  assert.ok(res.length >= 9);
  for (const c of res) {
    assert.deepEqual(c.hard, [], `${c.slug} hard content failures`);
    assert.deepEqual(c.review.arithmetic, [], `${c.slug} arithmetic to check`);
  }
});
