import { test } from "node:test";
import assert from "node:assert/strict";
import * as R from "../kit/interactive/reasoning.js";
import law from "../kit/courses/law/course.js";
import { IDS } from "../kit/courses/law/ids.js";

const cases = await Promise.all(law.workspace.cases.map(async (c) => ({ meta: c, data: (await c.load()).default })));
const perfect = (c) => {
  const real = c.issues.filter((i) => i.correct);
  return { facts: R.sentences(c).filter((s) => s.why).map((s) => s.id), issues: real.map((i) => i.id),
    auth: Object.fromEntries(real.map((i) => [i.id, i.core])), apply: Object.fromEntries(real.map((i) => [i.id, c.model])),
    concl: Object.fromEntries(real.map((i) => [i.id, i.conclusion.options.findIndex((o) => o.correct)])), advice: c.advice.options.findIndex((o) => o.correct) };
};

test("legal reasoning: every case is well formed, links to real lessons and matches its config", () => {
  assert.ok(cases.length >= 6);
  for (const { meta, data: c } of cases) {
    assert.equal(c.id, meta.id);
    assert.deepEqual(R.validateCase(c), [], c.id);
    for (const i of c.issues.filter((x) => x.correct)) for (const l of i.lessons) assert.ok(IDS[l], `${c.id}: lesson ${l} exists`);
    assert.equal(c.review?.verified, null, `${c.id}: marked as awaiting review until a lawyer signs it off`);
  }
});

test("legal reasoning: a model answer scores full marks, an empty one scores nothing", () => {
  for (const { data: c } of cases) {
    const r = R.report(c, perfect(c));
    assert.equal(r.overall, 1, `${c.id}: the model answer covers every key point`);
    const z = R.report(c, { facts: [], issues: [], auth: {}, apply: {}, concl: {}, advice: null });
    assert.equal(z.overall, 0, c.id);
  }
});

test("legal reasoning: red herrings, irrelevant authorities and padding cost marks", () => {
  for (const { data: c } of cases) {
    const real = c.issues.filter((i) => i.correct), fake = c.issues.find((i) => !i.correct);
    assert.ok(R.markIssues(c, [...real.map((i) => i.id), fake.id]).score < 1);
    const i = real[0], wrong = c.bank.find((b) => !i.core.includes(b.name) && !(i.support || []).includes(b.name)).name;
    assert.ok(R.markAuthorities(i, [...i.core, wrong]).score < 1);
    assert.equal(R.markAuthorities(i, [...i.core, ...(i.support || [])]).score, 1, "supporting authorities aren't penalised");
    const all = R.sentences(c).map((s) => s.id);
    assert.ok(R.markFacts(c, all).score < 1, "marking every sentence isn't full marks");
    assert.ok(R.markApplication(i, "The defendant is liable.").score < 0.5);
  }
});

test("legal reasoning: the written answer for the tutor includes every part", () => {
  const { data: c } = cases[0], t = R.answerText(c, perfect(c));
  for (const i of c.issues.filter((x) => x.correct)) assert.ok(t.includes(i.label));
  assert.ok(t.includes("ADVICE TO THE CLIENT"));
});
