import { test } from "node:test";
import assert from "node:assert/strict";
import * as E from "../kit/interactive/clinsim.js";
import nursing from "../kit/courses/nursing/course.js";
import { IDS } from "../kit/courses/nursing/ids.js";

const cases = await Promise.all(nursing.workspace.cases.map(async (c) => ({ meta: c, data: (await c.load()).default })));

test("clinical simulation: every case is well formed and links to real lessons", () => {
  assert.ok(cases.length >= 6);
  for (const { meta, data: c } of cases) {
    assert.equal(c.id, meta.id);
    for (const k of E.ABCDE) assert.equal(typeof c.find[k], "function", `${c.id}: finds ${k}`);
    for (const l of c.lessons) assert.ok(IDS[l], `${c.id}: lesson ${l} exists`);
    assert.ok(c.rubric.length >= 3 && c.rubric.length <= 12 && c.model.length > 300 && c.note.length >= 4, c.id);
    for (const k of ["s", "b", "a", "r"]) assert.ok(c.sbar[k]?.length, `${c.id}: SBAR cues for ${k}`);
    assert.equal(c.review?.verified, null, `${c.id}: awaiting clinical validation`);
    assert.ok(/education/i.test(c.banner), `${c.id}: says it's for education only`);
  }
});

test("clinical simulation: every patient starts at an escalation trigger and deteriorates if nothing is done", () => {
  for (const { data: c } of cases) {
    const s = E.begin(c);
    assert.ok(E.isTrigger(E.trueNews(s)) || c.emergency, `${c.id}: starts at a trigger (or is an emergency whatever the NEWS2)`);
    let n = 0; while (!s.ended && n++ < 500) E.act(c, s, "wait");
    assert.equal(s.ended.kind, "collapse", `${c.id}: collapses without care`);
    const d = E.debriefData(c, s);
    assert.ok(d.overall <= 0.2 && d.dims.escalation === 0, `${c.id}: doing nothing scores low (${d.overall})`);
  }
});

test("clinical simulation: the patient responds to the student's choices", () => {
  // the same 30 minutes, with and without treatment, give different patients
  const { data: c } = cases.find((x) => x.meta.id === "post-op-sepsis");
  const a = E.begin(c), b = E.begin(c);
  E.act(c, b, "o2"); E.escalate(c, b, { who: "outreach", urgency: "urgent", sbar: { s: "", b: "", a: "", r: "" } });
  while (!b.f.plan) E.act(c, b, "wait");
  E.act(c, b, "abx"); E.act(c, b, "fluids");
  E.advance(c, a, b.t);
  assert.ok(b.v.sbp > a.v.sbp + 5 && b.v.spo2 > a.v.spo2, "treatment improves blood pressure and saturation");
  assert.ok(E.trueNews(b).total < E.trueNews(a).total);
});

test("clinical simulation: NEWS2 entry, escalation level and unsafe actions are marked", () => {
  const { data: c } = cases.find((x) => x.meta.id === "opioid-toxicity");
  const s = E.begin(c);
  E.act(c, s, "obs");
  const r = E.enterNews(s, s.obs[0].actual);
  assert.ok(r.ok && r.actual === 9);
  E.act(c, s, "morphine");
  E.escalate(c, s, { who: "doctor", urgency: "routine", sbar: { s: "", b: "", a: "", r: "" } });
  const d = E.debriefData(c, s);
  assert.equal(d.unsafe.length, 1);
  assert.ok(d.dims.safety < 1 && d.esc < 0.5, "a routine call for a NEWS2 of 9 isn't adequate escalation");
});

test("clinical simulation: SBAR and note marking recognise the NEWS2 and times", () => {
  const { data: c } = cases.find((x) => x.meta.id === "hypoglycaemia");
  const s = E.begin(c); E.act(c, s, "obs");
  const n = s.obs[0].actual;
  assert.ok(E.covers(`NEWS2 is ${n}`, [["{news}"]], s) && !E.covers(`NEWS2 is ${n + 10}`, [["{news}"]], s));
  assert.ok(E.covers("12:24 found confused", [["{time}"]], s));
  assert.ok(E.markNote(c, "12:24 glucose 2.6 mmol/L, confused and sweating; juice given per protocol; Dr Evans informed; plan hourly monitoring and insulin review.", s).score === 1);
});

test("clinical simulation: a stroke is an emergency even with a low NEWS2, and the case's own responders can be called", () => {
  const { data: c } = cases.find((x) => x.meta.id === "stroke");
  const s = E.begin(c);
  assert.ok(E.trueNews(s).total <= 2 && s.triggerAt === 0);
  assert.ok(E.responders(c).stroke);
  E.act(c, s, "fast");
  const call = E.escalate(c, s, { who: "stroke", urgency: "emergency", sbar: { s: "stroke", b: "", a: "", r: "" } });
  assert.equal(call.label, "Stroke team (in-hospital stroke alert)");
  assert.equal(E.debriefData(c, s).esc, 1);
});

test("clinical simulation: in anaphylaxis, adrenaline changes the outcome", () => {
  const { data: c } = cases.find((x) => x.meta.id === "anaphylaxis");
  const a = E.begin(c), b = E.begin(c);
  E.act(c, a, "stop"); E.act(c, b, "stop"); E.act(c, b, "adrenaline");
  E.advance(c, a, 5); E.advance(c, b, 5);
  assert.ok(b.v.sbp > a.v.sbp + 10, "adrenaline raises blood pressure");
});
