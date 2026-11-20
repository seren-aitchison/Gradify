// scripts/quality/fix-questions.mjs: what gets written back into the notes, and what is refused
import { test } from "node:test";
import assert from "node:assert/strict";
import { check, rewriteLine, guessable, params } from "../scripts/quality/fix-questions.mjs";
import { parseQuestion } from "../kit/assess/model.js";

const line = "M2#chemistry-u13-10-q2@2: Why do tertiary haloalkanes not react by SN2? | Three bulky groups block backside attack by the nucleophile | Tertiary carbons have no leaving group | The nucleophile is too small to react | Tertiary substrates are always gases | Steric hindrance prevents the nucleophile reaching carbon.";
const q = { question: "Why do tertiary haloalkanes not react by SN2?", correct: "Three bulky groups block backside attack by the nucleophile", wrong: ["Tertiary carbons have no leaving group", "The nucleophile is too small to react", "Tertiary substrates are always gases"] };
const good = [
  { text: "The tertiary carbocation is too stable to accept a nucleophile", why: "Confuses SN2 with SN1: carbocation stability favours SN1, it does not block SN2." },
  { text: "The C–Br bond in a tertiary haloalkane is too strong to break", why: "Tertiary C–X bonds are not stronger; the barrier is steric crowding." },
  { text: "Polar aprotic solvents cannot dissolve tertiary haloalkanes", why: "Solubility is not the reason; crowding stops backside attack in any solvent." },
];

test("a valid rewrite keeps tag, question, right answer and explanation, and parses back", () => {
  assert.deepEqual(check(q, good), []);
  const out = rewriteLine(line, q, good);
  assert.ok(out.startsWith("M2#chemistry-u13-10-q2@2: Why do tertiary"));
  assert.ok(out.endsWith("| Steric hindrance prevents the nucleophile reaching carbon."));
  const Q = parseQuestion("M2#chemistry-u13-10-q2@2", out.slice(out.indexOf(":") + 1).trim());
  assert.equal(Q.options.find((o) => o.correct).text, q.correct);
  assert.equal(Q.options.filter((o) => !o.correct).length, 3);
  assert.match(Q.options[1].why, /SN1/);
  assert.equal(guessable(q.correct, good.map((w) => w.text)), false);
});

test("refuses rewrites that would still give the answer away or break the format", () => {
  assert.match(check(q, good.slice(0, 2)).join(), /expected 3/);
  assert.match(check(q, good.map((w) => ({ ...w, text: "Too short" }))).join(), /duplicate|still guessable/);
  assert.match(check(q, [good[0], good[1], { text: "It is always zero for such crowded tertiary carbon centres", why: "x" }]).join(), /throwaway/);
  assert.match(check(q, [good[0], good[1], { text: "A pipe | in the middle of this rather long wrong option", why: "x" }]).join(), /notes format/);
  assert.match(check(q, [good[0], good[1], { text: q.correct, why: "x" }]).join(), /equals the right answer/);
});

test("request asks for structured output from claude-opus-5-5 with the lesson attached", () => {
  const p = params({ course: "chemistry", level: "Year 1", title: "SN2 mechanisms", text: "SN2 …", questions: [{ key: "q1", ...q, explanation: "x" }] });
  assert.equal(p.model, "claude-opus-5-5");
  assert.equal(p.output_config.format.type, "json_schema");
  assert.match(p.messages[0].content, /<lesson>[\s\S]*SN2/);
});
