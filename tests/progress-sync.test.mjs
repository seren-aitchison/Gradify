// Saving course progress without overwriting another device (kit/course/progress.js syncProgress). The account here
// behaves like the course_progress table: one row per course, a new version (updated_at) on every write, and a
// conditional write that refuses if the row changed since it was read. The iPhone, iPad and Mac apps follow the same
// rules (gradify-apple ProgressSync.swift, whose merge is tested against this file's mergeProgress).
import { test } from "node:test";
import assert from "node:assert/strict";
import { syncProgress, mergeProgress, cloudCopy } from "../kit/course/progress.js";

function account() {
  let row = null, n = 0;
  const a = {
    writes: 0, offline: false, loseNextReply: false, beforeNextSave: null,
    get row() { return row && JSON.parse(JSON.stringify(row)); },
    async fetch() { if (a.offline) throw new Error("offline"); return row && { state: JSON.parse(JSON.stringify(row.state)), version: row.version }; },
    async save(state, version) {
      if (a.offline) throw new Error("offline");
      if (a.beforeNextSave) { const f = a.beforeNextSave; a.beforeNextSave = null; await f(); }
      if ((row?.version ?? null) !== version) return null;
      // jsonb hands keys back in its own order: reverse them so nothing relies on key order
      const reorder = (v) => (v && typeof v === "object" && !Array.isArray(v) ? Object.fromEntries(Object.keys(v).reverse().map((k) => [k, reorder(v[k])])) : Array.isArray(v) ? v.map(reorder) : v);
      row = { state: reorder(JSON.parse(JSON.stringify(state))), version: `v${++n}` }; a.writes++;
      if (a.loseNextReply) { a.loseNextReply = false; throw new Error("connection lost"); }
      return row.version;
    },
    // what the website did before this change, and what a still-open old tab does: write without reading
    async blindSave(state) { row = { state: JSON.parse(JSON.stringify(state)), version: `v${++n}` }; a.writes++; },
  };
  return a;
}
const complete = (S, id, t) => ({ ...S, done: { ...(S.done || {}), [id]: t }, log: [...(S.log || []), { t, xp: 10, k: "lesson", id }], updated: t });
const xp = (S) => (S?.log || []).reduce((a, e) => a + e.xp, 0);
const done = (S) => Object.keys(S?.done || {}).sort();

test("website and iPhone each complete a lesson and save at the same moment: both lessons and all XP survive", async () => {
  const acc = account();
  let web = complete({}, "u01-02", 1050), phone = complete({}, "u01-01", 1000);
  phone.solved = { "u01-01#0": 1100 }; phone.log.push({ t: 1100, xp: 5, k: "check", id: "u01-01#0" });
  // the phone saves between the website's read and the website's write
  acc.beforeNextSave = async () => { phone = (await syncProgress(phone, acc)).S; };
  const r = await syncProgress(web, acc);
  web = r.S;
  assert.equal(r.pushed, true);
  assert.deepEqual(done(acc.row.state), ["u01-01", "u01-02"], "the website's first write was refused, then merged and written");
  phone = (await syncProgress(phone, acc)).S;   // the phone's next sync
  for (const S of [web, phone, acc.row.state]) { assert.deepEqual(done(S), ["u01-01", "u01-02"]); assert.equal(xp(S), 25, "every award once"); }
});

test("the same lesson completed on the website and the iPhone before either synced counts once", async () => {
  const acc = account();
  const phone = (await syncProgress(complete({}, "u01-01", 10), acc)).S;
  const web = (await syncProgress(complete({}, "u01-01", 20), acc)).S;
  assert.equal(xp(web), 10);
  assert.equal(web.done["u01-01"], 10, "the earliest completion");
  assert.equal(xp(acc.row.state), 10);
  assert.equal(xp((await syncProgress(phone, acc)).S), 10);
});

test("a page still running the old unconditional save can't make the safe clients lose anything", async () => {
  const acc = account();
  let phone = (await syncProgress(complete({}, "u01-01", 1), acc)).S;
  await acc.blindSave(cloudCopy(complete({}, "u01-02", 2)));   // overwrites the phone's lesson in the account
  phone = (await syncProgress(phone, acc)).S;                    // the phone's next sync merges and writes it back
  assert.deepEqual(done(acc.row.state), ["u01-01", "u01-02"]);
});

test("offline, reconnecting, a lost reply and repeated syncs: nothing lost, nothing written twice", async () => {
  const acc = account();
  let S = complete({}, "u01-01", 1);
  acc.offline = true;
  await assert.rejects(syncProgress(S, acc));
  S = complete(S, "u01-02", 2);                                 // still learning offline; the device copy is untouched
  acc.offline = false;
  acc.loseNextReply = true;
  await assert.rejects(syncProgress(S, acc));                    // it reached the account, but the reply was lost
  assert.equal(acc.writes, 1);
  let r = await syncProgress(S, acc);
  assert.equal(r.pushed, false, "the account already has it");
  for (let i = 0; i < 5; i++) { r = await syncProgress(r.S, acc); assert.equal(r.pushed, false); }
  assert.equal(acc.writes, 1);
  assert.deepEqual(done(acc.row.state), ["u01-01", "u01-02"]);
  assert.equal(xp(acc.row.state), 20);
});

test("an empty or older copy never makes the account lose anything, and website-only fields survive", async () => {
  const acc = account();
  const full = { ...complete(complete({}, "a", 1), "b", 2), weekly: { 1: true }, saved: { a: 5 }, drafts: { w1: "draft" }, ws: { c1: { best: 0.9, runs: 2, last: { score: 0.9 }, at: 3 } }, goal: 50, path: "gcse" };
  await syncProgress(full, acc);
  const fresh = await syncProgress({}, acc);
  assert.equal(fresh.pushed, false, "a fresh device only receives");
  assert.deepEqual(done(fresh.S), ["a", "b"]);
  const stale = await syncProgress(complete({}, "c", 0.5), acc);
  for (const k of ["weekly", "saved", "drafts", "ws"]) assert.deepEqual(acc.row.state[k], full[k], k);
  assert.deepEqual(done(stale.S), ["a", "b", "c"]);
  assert.equal(stale.S.goal, 50, "settings come from the copy saved more recently");
});

test("attempts and other per-device fields stay on the device", async () => {
  const acc = account();
  const r = await syncProgress({ ...complete({}, "a", 1), attempts: [{ id: "x" }], outbox: ["x"], sync: { ok: 1 } }, acc);
  for (const k of ["attempts", "outbox", "sync"]) assert.equal(k in acc.row.state, false, k);
  assert.deepEqual(r.S.attempts, [{ id: "x" }]);
  assert.deepEqual(mergeProgress(r.S, acc.row.state).outbox, ["x"]);
});
