// Rolling back is safe (kit/data/learner-state.js): while the learner record is new, the keys the previous version
// read ("gradify.pins", "gradify.workspace", "gradify.history") are kept current in their old formats, so going back
// to that version loses nothing made since; and changes that version makes are brought in when coming forward again.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mirrorOf, reconcile, fingerprint, entry, tombstone, valuesOf } from "../kit/data/learner-state.js";

test("the older keys hold exactly what the previous version expects, in its formats", () => {
  const e = {
    "pin|/b": entry("pin", "/b", { href: "/b", title: "B", order: 1 }, { t: 2 }), "pin|/a": entry("pin", "/a", { href: "/a", title: "A", order: 0 }, { t: 1 }),
    "pin|/gone": tombstone("pin", "/gone", { t: 3 }),
    "tab|notes:/app.html": entry("tab", "notes:/app.html", { id: "notes:/app.html", href: "/app.html#/notes", pos: 0 }, { t: 1 }),
  };
  for (let i = 0; i < 520; i++) e[`activity|${i}`] = entry("activity", String(i), { id: String(i), act: "viewed", href: `/p${i}`, t: i }, { t: i });
  const m = mirrorOf(e, { active: "notes:/app.html" });
  assert.deepEqual(m.pin, [{ href: "/a", title: "A" }, { href: "/b", title: "B" }]);   // in order, deleted ones out
  assert.deepEqual(m.tab, { tabs: [{ id: "notes:/app.html", href: "/app.html#/notes" }], active: "notes:/app.html" });
  assert.equal(m.activity.length, 500);                                                 // the old version's limit
  assert.equal(m.activity[0].href, "/p519");                                            // newest first
});

test("changes the previous version made are brought in; kinds it didn't touch are left alone", () => {
  const e = { "pin|/a": entry("pin", "/a", { href: "/a", title: "A", order: 0 }, { t: 5 }), "tab|x": entry("tab", "x", { id: "x", href: "/x" }, { t: 5 }) };
  const written = { pin: fingerprint(mirrorOf(e).pin), tab: fingerprint(mirrorOf(e).tab), activity: fingerprint([]) };
  // nothing changed: nothing to do
  assert.deepEqual(reconcile(e, { pin: mirrorOf(e).pin, tab: mirrorOf(e).tab, activity: [] }, written).kinds, []);
  // the old version unpinned A and pinned C; it didn't touch the tabs
  const r = reconcile(e, { pin: [{ href: "/c", title: "C" }], tab: mirrorOf(e).tab, activity: [] }, written, { now: 100 });
  assert.deepEqual(r.kinds, ["pin"]);
  assert.deepEqual(valuesOf(r.entries, "pin").map((x) => x.key), ["/c"]);
  assert.equal(r.entries["pin|/a"].del, true);                                          // a deletion, so it syncs as one
  assert.ok(r.entries["pin|/c"].t >= 100);                                              // newer than anything before
  assert.equal(r.entries["tab|x"], e["tab|x"]);
  // history only gains lines: a key holding the newest 500 doesn't delete the 501st
  const h = { "activity|old": entry("activity", "old", { id: "old", act: "viewed", href: "/o", t: 1 }, { t: 1 }) };
  const rh = reconcile(h, { activity: [{ id: "new", act: "viewed", href: "/n", t: 2 }] }, { activity: fingerprint([]) }, { now: 100 });
  assert.equal(rh.entries["activity|old"].del, false); assert.ok(rh.entries["activity|new"]);
  // no record of what was written (a record from before this existed): nothing is assumed
  assert.deepEqual(reconcile(e, { pin: [] }, {}).kinds, []);
});

test("a rollback and back, end to end on this device's storage", async () => {
  const mem = new Map();
  globalThis.localStorage = { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) };
  const LS = await import("../kit/data/learner-state.js");
  // the new version: what the learner had before is imported, then they pin, open a tab and study
  mem.set("gradify.pins", JSON.stringify([{ href: "/old", title: "From before" }]));
  LS.reload();
  LS.put("pin", "/new", { href: "/new", title: "Pinned on the new version", order: 1 });
  LS.put("tab", "lesson:/c/", { id: "lesson:/c/", href: "/c/#/lesson/1", title: "Lesson 1", kind: "lesson" });
  LS.put("activity", "a1", { id: "a1", act: "studied", href: "/c/#/quiz/u1", title: "Unit 1 quiz", t: Date.now() });
  // rolled back: the previous version reads only its own keys, and finds everything
  assert.deepEqual(JSON.parse(mem.get("gradify.pins")).map((p) => p.title), ["From before", "Pinned on the new version"]);
  assert.equal(JSON.parse(mem.get("gradify.workspace")).tabs[0].title, "Lesson 1");
  assert.equal(JSON.parse(mem.get("gradify.history"))[0].title, "Unit 1 quiz");
  // the previous version changes them: unpins the first, adds a history line
  mem.set("gradify.pins", JSON.stringify([{ href: "/new", title: "Pinned on the new version" }]));
  mem.set("gradify.history", JSON.stringify([{ act: "viewed", href: "/c/#/lesson/2", title: "Lesson 2", t: Date.now() + 5 }, ...JSON.parse(mem.get("gradify.history"))]));
  // forward again: the record has the previous version's changes, and nothing else was lost
  LS.reload();
  assert.deepEqual(LS.list("pin").map((e) => e.key), ["/new"]);
  assert.deepEqual(LS.list("activity").map((e) => e.value.title).sort(), ["Lesson 2", "Unit 1 quiz"]);
  assert.equal(LS.list("tab").length, 1);
  // and the older keys are current again
  assert.deepEqual(JSON.parse(mem.get("gradify.pins")).map((p) => p.href), ["/new"]);
  delete globalThis.localStorage;
});
