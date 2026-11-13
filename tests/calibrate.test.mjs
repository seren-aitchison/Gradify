import { test } from "node:test";
import assert from "node:assert/strict";
import { calibrate, applyCalibration } from "../kit/intel/calibrate.js";
import { planDay, INTEL_DEFAULTS } from "../kit/intel/schedule.js";
import { dayKey } from "../kit/intel/memory.js";

const NOW = new Date(2026, 10, 13, 9).getTime(), DAY = 864e5;
const block = (k, start, len, done) => ({ day: dayKey(NOW - k * DAY), start_min: start, end_min: start + len, cal: "study", auto: true, done });

test("long sessions that don't get done make Gradify plan shorter ones", () => {
  const blocks = [];
  for (let k = 1; k <= 6; k++) blocks.push(block(k, 18 * 60, 45, k % 4 === 0), block(k, 10 * 60, 20, true));
  const cal = calibrate({ blocks, now: NOW });
  assert.equal(cal.sessionCap, 30, "16–30 min sessions are done, 31–45 aren't");
  assert.ok(cal.notes.some((n) => /shorter sessions/.test(n)));
  const { intel } = applyCalibration(INTEL_DEFAULTS, [], cal);
  assert.equal(intel.breakEvery, 30);
});

test("the time of day that works is planned first", () => {
  const blocks = [];
  for (let k = 1; k <= 5; k++) blocks.push(block(k, 9 * 60, 20, true), block(k, 19 * 60, 20, false));
  const cal = calibrate({ blocks, now: NOW });
  assert.equal(cal.preferred.label, "mornings");
  const { intel } = applyCalibration({ ...INTEL_DEFAULTS, weekday: [{ from: 8 * 60, to: 10 * 60 }, { from: 18 * 60, to: 21 * 60 }] }, [], cal);
  const day = dayKey(NOW + 3 * DAY);   // a Monday
  const plan = planDay({ items: [{ id: "a", title: "A", mins: 20 }], day, minutes: 20, intel, now: NOW });
  assert.equal(plan.blocks[0].start_min, 8 * 60);
});

test("real answer times replace the 25-second estimate, within limits", () => {
  const reviews = Array.from({ length: 30 }, () => ({ ms: 34000 }));
  const cal = calibrate({ reviews, now: NOW });
  assert.equal(cal.secPerCard, 40);
  const { items, factor } = applyCalibration(INTEL_DEFAULTS, [{ kind: "review", mins: 10 }, { kind: "deadline", mins: 30 }], cal);
  assert.equal(factor, 1.6);
  assert.deepEqual(items.map((x) => x.mins), [16, 30], "only card work is rescaled");
});

test("with too little evidence nothing changes", () => {
  const cal = calibrate({ blocks: [block(1, 600, 45, false)], now: NOW });
  assert.equal(cal.sessionCap, null); assert.equal(cal.preferred, null); assert.equal(cal.enough, false);
  assert.deepEqual(applyCalibration(INTEL_DEFAULTS, [{ kind: "review", mins: 5 }], cal).items[0].mins, 5);
});

test("abandoned sessions in the ledger shorten sessions too", () => {
  const ledger = [...Array(6).fill({ event: "session_started" }), ...Array(3).fill({ event: "session_abandoned" })];
  assert.equal(calibrate({ ledger, now: NOW }).sessionCap, 25);
});
