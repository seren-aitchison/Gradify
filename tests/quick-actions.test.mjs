// Quick actions (kit/ui/quick-actions.js and the ••• menu, kit/ui/resource-actions.js): the menu offers what this
// kind of thing supports, every action has its own key, and the pure helpers behind create and export.
import { test } from "node:test";
import assert from "node:assert/strict";
import { EXTRA, MENU_KEYS, CREATE, taskSlot, cardsCsv, resourcesMd, fileName, routeKey } from "../kit/ui/quick-actions.js";
import { actionsFor } from "../kit/ui/resource-actions.js";

test("the ••• menu is the same for every resource, plus what the page can do with this one, always in one order", () => {
  const lesson = { kind: "lesson" }, pack = { kind: "pack" };
  assert.deepEqual(actionsFor(lesson), ["pin", "save", "link", "note", "share", "history"]);
  const f = () => {};
  assert.deepEqual(actionsFor(lesson, { canSchedule: true, ops: { report: f } }), ["pin", "save", "link", "schedule", "note", "share", "history", "report"]);
  // the order is the menu's, not the page's, and only functions count
  assert.deepEqual(actionsFor(pack, { ops: { delete: f, export: f, rename: f, duplicate: "no" } }).slice(-3), ["rename", "export", "delete"]);
  assert.deepEqual(actionsFor({ kind: "card" }, { ops: { delete: f } }), ["pin", "save", "link", "note", "share", "delete"]);
});

test("every action has a key of its own while the menu is open", () => {
  const keys = Object.values(MENU_KEYS);
  assert.equal(new Set(keys).size, keys.length);
  for (const [a] of EXTRA) assert.ok(MENU_KEYS[a], a);
  for (const a of ["pin", "save", "link", "schedule", "note", "share", "history"]) assert.ok(MENU_KEYS[a], a);
});

test("anything can be created from anywhere: notes, tasks, flashcards, collections, mind maps, quizzes", () => {
  assert.deepEqual(CREATE.map(([id]) => id), ["note", "task", "cards", "collection", "map", "quiz"]);
});

test("a quick task goes in the next free quarter hour today, never past midnight", () => {
  assert.deepEqual(taskSlot(new Date(2026, 10, 26, 14, 7)), { start_min: 14 * 60 + 15, end_min: 14 * 60 + 40 });
  assert.deepEqual(taskSlot(new Date(2026, 10, 26, 14, 0)), { start_min: 14 * 60 + 15, end_min: 14 * 60 + 40 });
  assert.deepEqual(taskSlot(new Date(2026, 10, 26, 23, 50)), { start_min: 1440 - 25, end_min: 1440 });
});

test("exports: flashcards as CSV a spreadsheet opens, and a collection as a list of links", () => {
  const csv = cardsCsv([{ front: 'Say "hi"', back: "a, b", topic: "T" }, { front: "x", back: "y\nz" }]);
  assert.equal(csv, 'front,back,topic\r\n"Say ""hi""","a, b","T"\r\n"x","y\nz",""');
  const md = resourcesMd("Mock week", [{ title: "Enzymes [core]", href: "/scigradify/biology/#/lesson/u01-01", sub: "Lesson" }], "https://gradify.app");
  assert.equal(md, "# Mock week\n\n- [Enzymes core](https://gradify.app/scigradify/biology/#/lesson/u01-01) · Lesson");
  assert.equal(fileName("Cardiac cycle: part 2!", "csv"), "cardiac-cycle-part-2.csv");
  assert.equal(fileName("???", "md"), "gradify.md");
});

test("a page's actions belong to the screen they were set on", () => {
  assert.equal(routeKey("#/deck/abc?card=1"), "#/deck/abc");
  assert.equal(routeKey(""), "#/");
});

// ---------- the outbox: reports and feedback kept on this device until they can be sent ----------
function memStorage({ blocked = false } = {}) {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => { if (blocked) throw new Error("QuotaExceeded"); m.set(k, String(v)); }, removeItem: (k) => m.delete(k), _m: m };
}
function fakeAccount(id, { fail = false, sent = [] } = {}) {
  const db = { from: (table) => ({ insert: async (row) => { await new Promise((r) => setTimeout(r, 5)); if (fail) throw new Error("offline"); sent.push([table, row.note, id]); return { error: null }; } }) };
  return { mode: "cloud", db, user: async () => (id ? { id } : null), sent };
}
const outbox = () => JSON.parse(globalThis.localStorage.getItem("gradify.outbox") || "[]");

test("outbox: kept on this device first; sent only with the account it belongs to; never two writes lost", async () => {
  globalThis.localStorage = memStorage();
  const { sendOrKeep } = await import("../kit/ui/quick-actions.js");
  // signed out: kept, with no owner, and sent with the next account that signs in here
  assert.equal(await sendOrKeep(fakeAccount(null), "app_feedback", { note: "a" }), "waiting");
  assert.equal(outbox().length, 1); assert.equal(outbox()[0].owner, null);
  // Ben signs in while offline (the app has seen him sign in): Ben's own feedback is kept as Ben's
  await sendOrKeep(fakeAccount("ben", { fail: true }));
  assert.equal(await sendOrKeep(fakeAccount("ben", { fail: true }), "app_feedback", { note: "b" }), "waiting");
  assert.deepEqual(outbox().map((x) => [x.row.note, x.owner]), [["a", null], ["b", "ben"]]);
  // Ana signs in: the ownerless one goes with Ana; Ben's waits for Ben
  const ana = fakeAccount("ana");
  await sendOrKeep(ana);   // the app sees Ana sign in: "a" goes with her
  assert.equal(await sendOrKeep(ana, "app_feedback", { note: "c" }), "sent");
  assert.deepEqual(ana.sent.map((x) => x[1]).sort(), ["a", "c"]);
  assert.deepEqual(outbox().map((x) => x.row.note), ["b"]);
  // two at once: both are sent, neither overwrites the other in the outbox
  const ben = fakeAccount("ben");
  await sendOrKeep(ben);   // Ben signs back in: Ben's own "b" goes
  const [r1, r2] = await Promise.all([sendOrKeep(ben, "app_feedback", { note: "d" }), sendOrKeep(ben, "app_feedback", { note: "e" })]);
  assert.deepEqual([r1, r2], ["sent", "sent"]);
  assert.deepEqual(ben.sent.map((x) => x[1]).sort(), ["b", "d", "e"]);
  assert.deepEqual(outbox(), []);
});

test("outbox: when this browser can't keep anything, it says so instead of claiming it's saved", async () => {
  globalThis.localStorage = memStorage({ blocked: true });
  const { sendOrKeep } = await import("../kit/ui/quick-actions.js");
  assert.equal(await sendOrKeep(fakeAccount(null), "lesson_reports", { note: "x" }), "failed");
  const ana = fakeAccount("ana");
  assert.equal(await sendOrKeep(ana, "lesson_reports", { note: "y" }), "sent");   // signed in: sent straight away
});

test("undo: a failed undo isn't used up, a done one can't run twice, and too late says so", async () => {
  const { undoable, undoLast, _undos } = await import("../kit/ui/quick-actions.js");
  _undos().length = 0;
  let tries = 0;
  undoable("x", async () => { tries++; if (tries === 1) throw new Error("network"); });
  assert.equal(await undoLast(), false);   // failed: still there
  assert.equal(await undoLast(), true);    // tried again: done
  assert.equal(await undoLast(), false);   // nothing left
  assert.equal(tries, 2);
  undoable("y", () => false);              // too late
  assert.equal(await undoLast(), false);
  assert.equal(_undos().every((u) => u.done), true);
});

test("outbox: entries kept before ids existed are given one, so a failed one stays and a sent one goes", async () => {
  globalThis.localStorage = memStorage();
  globalThis.localStorage.setItem("gradify.outbox", JSON.stringify([{ table: "app_feedback", row: { note: "old-ok" }, t: Date.now(), owner: null }, { table: "app_feedback", row: { note: "old-fails" }, t: Date.now(), owner: null }]));
  const { sendOrKeep } = await import("../kit/ui/quick-actions.js");
  const sent = [];
  const db = { from: () => ({ insert: async (row) => { if (row.note === "old-fails") throw new Error("offline"); sent.push(row.note); return { error: null }; } }) };
  await sendOrKeep({ mode: "cloud", db, user: async () => ({ id: "ana" }) });
  assert.deepEqual(sent, ["old-ok"]);
  assert.deepEqual(outbox().map((x) => x.row.note), ["old-fails"]);
  assert.ok(outbox()[0].id);
});

test("outbox: an owned entry names its owner in the insert, so a changed session can't file it under someone else", async () => {
  globalThis.localStorage = memStorage();
  const { sendOrKeep } = await import("../kit/ui/quick-actions.js");
  await sendOrKeep(fakeAccount("ben", { fail: true }));   // Ben is seen signing in
  const rows = [];
  const db = { from: () => ({ insert: async (row) => { rows.push(row); return { error: null }; } }) };
  assert.equal(await sendOrKeep({ mode: "cloud", db, user: async () => ({ id: "ben" }) }, "app_feedback", { note: "mine" }), "sent");
  assert.deepEqual(rows, [{ note: "mine", user_id: "ben" }]);
});

test("outbox: a lookup that fails is not 'signed out', and what the database refuses for good is not 'sent'", async () => {
  globalThis.localStorage = memStorage();
  const { sendOrKeep } = await import("../kit/ui/quick-actions.js");
  await sendOrKeep(fakeAccount("ben", { fail: true }));
  // the account can't be checked: kept as Ben's (last seen), not sent, not ownerless
  const broken = { mode: "cloud", db: {}, user: async () => { throw new Error("network"); } };
  assert.equal(await sendOrKeep(broken, "app_feedback", { note: "x" }), "waiting");
  assert.equal(outbox()[0].owner, "ben");
  // a refusal for good is reported as such and leaves the outbox
  globalThis.localStorage = memStorage();
  const db = { from: () => ({ insert: async () => ({ error: { code: "23514" } }) }) };
  assert.equal(await sendOrKeep({ mode: "cloud", db, user: async () => ({ id: "ana" }) }, "app_feedback", { note: "y" }), "rejected");
  assert.deepEqual(outbox(), []);
});

test("delete: switching tabs does not commit it, but leaving the page does", async () => {
  const listeners = {};
  globalThis.addEventListener = (t, f) => { listeners[t] = f; }; globalThis.removeEventListener = () => {};
  const stub = () => new Proxy(function () {}, { get: (_, k) => (k === Symbol.toPrimitive ? () => "" : stub()), apply: () => stub(), set: () => true });
  globalThis.document = Object.assign(stub(), { visibilityState: "visible", addEventListener: (t, f) => { listeners[t] = f; }, removeEventListener() {} });
  const { deferredDelete, _undos } = await import("../kit/ui/quick-actions.js");
  _undos().length = 0;
  let committed = 0;
  deferredDelete({ html: "x", ms: 30, hide() {}, restore() {}, commit: async () => { committed++; } });
  globalThis.document.visibilityState = "hidden"; listeners.visibilitychange?.();
  await new Promise((r) => setTimeout(r, 5));
  assert.equal(committed, 0);
  listeners.pagehide();
  await new Promise((r) => setTimeout(r, 5));
  assert.equal(committed, 1);
});
