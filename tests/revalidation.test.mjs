import { test } from "node:test";
import assert from "node:assert/strict";
import { summarise, windowFor, REQUIREMENTS } from "../kit/course/revalidation.js";

test("revalidation: progress counts only the three years up to the renewal date", () => {
  const settings = { renewal: "2027-06-30", declarations: { health: true, indemnity: true } };
  const entries = [
    { kind: "hours", date: "2025-01-10", hours: 400 }, { kind: "hours", date: "2026-03-01", hours: 60 },
    { kind: "hours", date: "2023-01-01", hours: 900 },                       // before the window: ignored
    { kind: "cpd", date: "2026-02-01", hours: 20, participatory: true }, { kind: "cpd", date: "2026-05-01", hours: 15 },
    ...Array.from({ length: 5 }, (_, i) => ({ kind: "feedback", date: `2026-0${i + 1}-15` })),
    ...Array.from({ length: 4 }, (_, i) => ({ kind: "reflection", date: `2026-0${i + 1}-20` })),
  ];
  const s = summarise(entries, settings, new Date("2026-11-05T12:00:00"));
  const row = (k) => s.rows.find((r) => r.key === k);
  assert.equal(row("hours").have, 460); assert.equal(row("hours").need, 450); assert.ok(row("hours").done);
  assert.equal(row("cpd").have, 35); assert.ok(row("cpd").done);
  assert.equal(row("participatory").have, 20); assert.ok(row("participatory").done);
  assert.ok(row("feedback").done);
  assert.equal(row("reflection").have, 4); assert.ok(!row("reflection").done);
  assert.ok(!row("discussion").done);
  assert.equal(s.declared, 2); assert.equal(s.ready, false); assert.equal(s.outside, 1);
  assert.equal(s.daysLeft, 237);
  assert.equal(summarise(entries, { ...settings, dual: true }, new Date("2026-11-05")).rows.find((r) => r.key === "hours").need, 900);
});

test("revalidation: without a date, the last three years count", () => {
  const { start, end } = windowFor({}, new Date("2026-11-05T12:00:00"));
  assert.equal(start.getFullYear(), 2023); assert.equal(end.getFullYear(), 2026);
  assert.deepEqual(Object.keys(REQUIREMENTS), ["hours", "cpd", "participatory", "feedback", "reflection", "discussion"]);
});
