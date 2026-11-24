// Ask Gradify AI about your degree (kit/assess/tutor.js, mode "degree"): the AI gets the tracker's own results
// (degreeBrief) and explains them; it never calculates, and a reply with a figure that isn't in the results is withheld.
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildRequest, checkReply, DAILY, degreeText } from "../kit/assess/tutor.js";
import { FEATURE_OF } from "../supabase/functions/_shared/ai.js";
import { degreeIntel, degreeBrief } from "../assets/study-tools.js";
import { ruleById } from "../kit/data/uni-rules.js";

const rows = [
  { name: "Physical Chemistry", mark: "70", credits: "120", year: "2" },
  { name: "Organic Chemistry", mark: "72", credits: "40", year: "3" }, { name: "Spectroscopy", mark: "71", credits: "20", year: "3" },
  { name: "Dissertation", mark: "", credits: "60", year: "3", due: "2027-04-23" },
];
const intel = degreeIntel(rows, 60, new Date(2026, 10, 24), 120, ruleById("kcl"));
const brief = degreeBrief(intel, 60, ruleById("kcl"));

test("the brief is the tracker's results, already worked out, with no raw list of marks", () => {
  assert.equal(brief.average, `${Math.round(intel.t.average * 10) / 10}%`);
  assert.equal(brief.cls, intel.cls.short);
  assert.ok(brief.goals.some((g) => /First \(70% boundary\): needs an average of [\d.]+% on everything left/.test(g)));
  assert.match(brief.priorities[0], /^Dissertation: [\d.]+% of the degree, due in \d+ days/);
  assert.match(brief.university, /King's College London/);
  assert.ok(brief.actions.some((a) => a.id === "modules"));
  assert.ok(!/"mark"/.test(JSON.stringify(brief)), "no per-module mark field");
  assert.equal(degreeBrief({ t: { average: null } }, 60), null);
});

test("the request tells the AI to quote, never calculate, and needs a question and results", () => {
  assert.ok(DAILY.degree > 0); assert.equal(FEATURE_OF.degree, "tutor");
  const r = buildRequest({ mode: "degree", question: "Can I still get a First?", degree: brief });
  assert.match(r.system, /never do maths/); assert.match(r.system, /never invent/);
  assert.match(r.messages[0].content, /QUESTION: Can I still get a First\?/);
  assert.match(r.messages[0].content, new RegExp(`Average so far: ${brief.average.replace(".", "\\.")}`));
  assert.ok(r.schema);
  assert.throws(() => buildRequest({ mode: "degree", question: "", degree: brief }), /Ask a question/);
  assert.throws(() => buildRequest({ mode: "degree", question: "Hi", degree: {} }), /Add some module marks/);
});

test("a reply that quotes the tracker passes, and one with a new figure is withheld", () => {
  const body = { mode: "degree", question: "Can I still get a First?", degree: brief };
  const need = brief.goals[0].match(/([\d.]+)% on everything left/)[1];
  const ok = checkReply("degree", { answer: `Yes. Your average so far is ${brief.average}, and a First needs ${need}% on everything left.`, facts: [`Average so far: ${brief.average}`], estimates: [], action: { id: "plan", why: "Your dissertation matters most." } }, body);
  assert.match(ok.answer, /Yes\./); assert.deepEqual(ok.action, { id: "plan", why: "Your dissertation matters most." });
  assert.equal(checkReply("degree", { answer: `Your average is ${brief.average}.`, facts: [], estimates: [], action: { id: "delete-everything", why: "x" } }, body).action, null, "only offered actions");
  assert.throws(() => checkReply("degree", { answer: "If you get 64.25% on your dissertation you'll finish on 69.87%.", facts: [], estimates: [], action: { id: "plan", why: "" } }, body), (e) => e.unverified?.includes("64.25") && /held back/.test(e.message));
  // small counts are fine ("2 modules"), and a number from the question is fine
  assert.ok(checkReply("degree", { answer: "That needs 2 modules in the higher class.", facts: [], estimates: [], action: { id: "plan", why: "" } }, body));
  assert.ok(checkReply("degree", { answer: "65% isn't one of your results, but the tracker can show it.", facts: [], estimates: [], action: { id: "modules", why: "" } }, { ...body, question: "What if I get 65%?" }));
  assert.match(degreeText(brief), /DEGREE TRACKER RESULTS/);
});
