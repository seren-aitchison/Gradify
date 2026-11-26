// Deleting something removes what pointed at it; undoing the delete puts all of it back (kit/data/links.js
// forget, restore), through the learner's record on this device.
import { test } from "node:test";
import assert from "node:assert/strict";

const mem = new Map();
globalThis.localStorage = { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) };
const L = await import("../kit/data/links.js");
const LS = await import("../kit/data/learner-state.js");
const { resource } = await import("../kit/core/resource.js");

test("forget removes every link, collection place, note, schedule and pin of a resource; restore puts them back", () => {
  const note = resource("note:n1", { title: "My notes", href: "/app.html#/notes/n1" }), lesson = resource("lesson:/c/l1", { title: "Lesson" }), other = resource("pack:p1", { title: "Cards" });
  L.link(note, lesson, { by: "source" }); L.link(lesson, other);
  const cid = L.createCollection("Mocks"); L.addToCollection(cid, note);
  L.setNote(note, "remember this"); L.schedule(note, { id: "b1", day: "2026-11-27", start_min: 600, end_min: 625, title: "Note" });
  LS.put("pin", note.href, { href: note.href, title: "My notes" });
  const gone = L.forget(note.rid, { href: note.href });
  assert.equal(gone.length, 5);
  assert.deepEqual(L.linksOf(lesson.rid).map((l) => l.other.rid), ["pack:p1"]);          // the other link is untouched
  assert.equal(L.itemsOf(cid).length, 0); assert.equal(L.noteOf(note.rid), ""); assert.equal(L.scheduledFor(note.rid).length, 0); assert.equal(LS.get("pin", note.href), null);
  L.restore(gone);
  assert.equal(L.linksOf(note.rid)[0].other.rid, "lesson:/c/l1");
  assert.equal(L.linksOf(note.rid)[0].dir, "made-from");
  assert.equal(L.itemsOf(cid).length, 1); assert.equal(L.noteOf(note.rid), "remember this"); assert.equal(L.scheduledFor(note.rid).length, 1); assert.ok(LS.get("pin", note.href));
  assert.deepEqual(L.forget("note:nothing"), []);
});
