// The session planner (kit/intel/session.js): evidence in, a phased session out, fitted to the time and the
// learner's block length, and adapting when a step is a struggle.
import { test } from "node:test";
import assert from "node:assert/strict";
import { composeSession, withBreaks, adapt, untilNext } from "../kit/intel/session.js";

const items = [
  { id: "root:fractions", kind: "root", title: "Fix the root: Fractions", mins: 8, why: "w", because: "b", href: "#/topic/fractions" },
  { id: "fix:ratios", kind: "misconception", title: "Revisit Ratios", mins: 6, why: "Sure but wrong", because: "“2:3” answered wrong while sure", href: "#/study/t:ratios" },
  { id: "apply:ratios", kind: "stretch", title: "Apply Ratios", mins: 6, why: "w", href: "#/deck/1" },
  { id: "due", kind: "review", title: "Review 20 due cards", mins: 5, why: "w", href: "#/study" },
  { id: "new:algebra", kind: "learn", title: "Start Algebra", mins: 5, why: "w", href: "#/study/t:algebra" },
];
const studyMins = (s) => s.steps.filter((x) => x.phase !== "break").reduce((a, x) => a + x.mins, 0);
const allMins = (s) => s.steps.reduce((a, x) => a + x.mins, 0);

test("35 minutes: recap the root, learn the misconception, apply that topic, then retrieve", () => {
  const s = composeSession({ minutes: 35, items, block: 25 });
  assert.deepEqual([...new Set(s.steps.filter((x) => x.phase !== "break").map((x) => x.phase))], ["recap", "learn", "apply", "retrieve"]);
  assert.equal(s.steps.find((x) => x.phase === "recap").id, "root:fractions");
  assert.equal(s.steps.find((x) => x.phase === "learn").id, "fix:ratios");
  assert.equal(s.steps.find((x) => x.phase === "apply").id, "apply:ratios", "applies what was just learned");
  assert.equal(s.steps.find((x) => x.phase === "retrieve").id, "due", "ends with retrieval");
  assert.equal(allMins(s), 35, "fills the time exactly, breaks included");
  assert.ok(s.steps.some((x) => x.phase === "break"), "a break after 25 minutes");
  for (const x of s.steps.filter((y) => y.phase !== "break")) assert.ok(x.why && x.href, "every step says why and where");
});

test("short blocks for a learner who chose 10 minutes; short sessions keep only learn and retrieve", () => {
  const s = composeSession({ minutes: 45, items, block: 10 });
  let run = 0;
  for (const x of s.steps) { if (x.phase === "break") { assert.ok(run <= 10); run = 0; } else run += x.mins; }
  assert.ok(run <= 10, "no block longer than 10 minutes");
  assert.ok(allMins(s) <= 45 && allMins(s) >= 40, "fits the time (a 5-minute remainder can't hold another block)");
  const q = composeSession({ minutes: 10, items });
  assert.deepEqual(q.steps.map((x) => x.phase), ["learn", "retrieve"]);
  assert.equal(studyMins(q), 10);
});

test("no evidence: no plan, and an honest reason", () => {
  const s = composeSession({ minutes: 30, items: [] });
  assert.equal(s.steps.length, 0);
  assert.match(s.empty, /evidence/);
});

test("no application questions yet: explain it back instead", () => {
  const s = composeSession({ minutes: 30, items: items.filter((x) => x.kind !== "stretch"), block: 60 });
  const ap = s.steps.find((x) => x.phase === "apply");
  assert.match(ap.title, /^Explain Ratios in your own words/);
});

test("a struggle: meet the topic another way, and make the next step easier", () => {
  const s = composeSession({ minutes: 40, items, block: 60 });
  const i = s.steps.findIndex((x) => x.phase === "learn");
  const rest = adapt(s.steps.slice(i + 1), s.steps[i]);
  assert.equal(rest[0].another, true);
  assert.match(rest[0].title, /^See it another way: Ratios/);
  assert.ok(!rest.some((x) => x.phase === "apply" && x.topic === "ratios"), "applying the same topic waits");
  assert.ok(rest.some((x) => x.title.startsWith("Recall Ratios")));
});

test("time until the next commitment, from today's plan", () => {
  const now = new Date(2026, 10, 18, 13, 0).getTime();
  const blocks = [{ day: "2026-11-18", start_min: 14 * 60, title: "Lecture" }, { day: "2026-11-18", start_min: 12 * 60, title: "Lunch" }, { day: "2026-11-19", start_min: 9 * 60, title: "Tomorrow" }];
  assert.deepEqual(untilNext(blocks, now), { mins: 55, title: "Lecture", at: "14:00" });
  assert.equal(untilNext([{ day: "2026-11-18", start_min: 13 * 60 + 8, title: "Soon" }], now), null, "under 10 minutes: no session");
  assert.equal(withBreaks([{ phase: "learn", mins: 30 }], 25).map((x) => x.mins).join(","), "25,5,5");
});

test("a deadline doesn't crowd out a topic to learn, and is never 'explained'", () => {
  const its = [{ id: "dl:2026-11-20:Quiz", kind: "deadline", title: "Prepare for Quiz", why: "w", href: "#/plan" }, { id: "new:cells", kind: "learn", title: "Start Cells", why: "w", href: "#/study/t:cells" }, { id: "due", kind: "review", title: "Review 3 due cards", why: "w", href: "#/study" }];
  const s = composeSession({ minutes: 30, items: its, block: 60 });
  assert.equal(s.steps.find((x) => x.phase === "learn").id, "new:cells");
  assert.ok(!s.steps.some((x) => /Explain Prepare/.test(x.title)));
  const only = composeSession({ minutes: 30, items: [its[0]], block: 60 });
  assert.ok(!only.steps.some((x) => x.phase === "apply"), "no topic: no made-up explain step");
});
