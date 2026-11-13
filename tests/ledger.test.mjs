import { test } from "node:test";
import assert from "node:assert/strict";
import { answerEvent, forgotEvent, stageEvents } from "../kit/intel/ledger.js";
import { LocalStore } from "../kit/data/store.js";

const card = { id: "c1", document_id: "d1", topic: "Systole", reps: 3, last_rating: "good", interval_days: 6 };

test("an answer becomes a ledger event with result, confidence and time", () => {
  const e = answerEvent(card, { rating: "again", confidence: "sure", ms: 14200.4 });
  assert.deepEqual([e.event, e.concept, e.result, e.confidence, e.response_ms, e.source], ["card_answered", "d1|Systole", "incorrect", 1, 14200, "study_pack"]);
  assert.equal(answerEvent(card, { rating: "hard" }).result, "partial");
});

test("forgetting is only a learned card answered wrong", () => {
  assert.equal(forgotEvent(card, "again").event, "forgotten");
  assert.equal(forgotEvent(card, "good"), null);
  assert.equal(forgotEvent({ ...card, reps: 1 }, "again"), null);
  assert.equal(forgotEvent({ ...card, last_rating: "again" }, "again"), null);
});

test("stage changes and fixed misconceptions are noticed between two snapshots", () => {
  const before = [{ key: "k1", name: "A", stage: "seen", level: "shaky" }, { key: "k2", name: "B", stage: "understood", level: "learning" }];
  const after = [{ key: "k1", name: "A", stage: "understood", level: "learning" }, { key: "k2", name: "B", stage: "understood", level: "strong" }, { key: "k3", name: "C", stage: "seen", level: "learning" }];
  const ev = stageEvents(before, after);
  assert.deepEqual(ev.map((e) => [e.event, e.concept]), [["stage_reached", "k1"], ["misconception_fixed", "k1"]]);
});

test("the device store keeps events, newest first, capped", async () => {
  globalThis.localStorage = { m: {}, getItem(k) { return this.m[k] ?? null; }, setItem(k, v) { this.m[k] = String(v); }, removeItem(k) { delete this.m[k]; } };
  const s = new LocalStore();
  await s.logEvent({ event: "session_started" }); await s.logEvent({ event: "session_finished" });
  const list = await s.listEvents();
  assert.deepEqual(list.map((e) => e.event), ["session_finished", "session_started"]);
  assert.ok(list[0].id && list[0].at);
});
