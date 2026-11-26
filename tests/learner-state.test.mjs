// One learner record across Gradify (kit/data/learner-state.js) and one id for every resource (kit/core/resource.js).
import { test } from "node:test";
import assert from "node:assert/strict";
import { merge, newer, entry, tombstone, valuesOf, importLegacy, prune } from "../kit/data/learner-state.js";
import { rid, parseRid, ridFromHref, hrefOf, resource, resourceFromPlace } from "../kit/core/resource.js";

test("resource ids: the same thing has the same id wherever it's linked from, and goes back to where it opens", () => {
  assert.equal(rid("lesson", "/scigradify/biology/", "u01-01"), "lesson:/scigradify/biology/u01-01");
  assert.equal(rid("lesson", "/scigradify/biology/index.html", "u01-01"), "lesson:/scigradify/biology/u01-01");
  assert.equal(rid("course", "/scigradify/biology"), "course:/scigradify/biology/");
  assert.equal(rid("pack", "d1"), "pack:d1");
  assert.throws(() => rid("thing", "x"));
  for (const [href, want] of [
    ["/scigradify/biology/#/lesson/u01-01", "lesson:/scigradify/biology/u01-01"],
    ["/scigradify/biology/#/quiz/u01", "quiz:/scigradify/biology/u01"],
    ["/scigradify/biology/#/learn/u02", "unit:/scigradify/biology/u02"],
    ["/scigradify/biology/#/spec/4.1.1.1", "spec:/scigradify/biology/4.1.1.1"],
    ["/scigradify/biology/", "course:/scigradify/biology/"],
    ["/scigradify/biology/#/home", "course:/scigradify/biology/"],
    ["/app.html#/deck/abc", "pack:abc"],
    ["/medgradify/app.html#/notes/r9", "note:r9"],
    ["/app.html#/notes/daily", "screen:/app.html#/notes"],
    ["/app.html#/plan", "screen:/app.html#/plan"],
    ["/scigradify/biology/#/revise", "page:/scigradify/biology/#/revise"],
  ]) assert.equal(ridFromHref(href), want, href);
  assert.equal(hrefOf("lesson:/scigradify/biology/u01-01"), "/scigradify/biology/#/lesson/u01-01");
  assert.equal(hrefOf("pack:abc", { app: "/medgradify/app.html" }), "/medgradify/app.html#/deck/abc");
  assert.equal(hrefOf("course:/scigradify/biology/"), "/scigradify/biology/#/home");
  assert.deepEqual(parseRid("spec:/scigradify/biology/4.1.1.1"), { kind: "spec", course: "/scigradify/biology/", id: "4.1.1.1" });
  assert.equal(parseRid("nonsense"), null);
});

test("a resource carries the same metadata wherever it appears", () => {
  const r = resource("lesson:/scigradify/biology/u01-01", { title: "What is biology?", subject: "Biology", refs: ["4.1.1", "4.1.1"], sub: "" });
  assert.deepEqual(r, { rid: "lesson:/scigradify/biology/u01-01", kind: "lesson", label: "Lesson", icon: "book", title: "What is biology?", href: "/scigradify/biology/#/lesson/u01-01", course: "/scigradify/biology/", subject: "Biology", refs: ["4.1.1"] });
  assert.equal(resourceFromPlace({ href: "/app.html#/deck/d1", title: "Cardiac cycle" }).kind, "pack");
  assert.equal(resourceFromPlace(null), null);
});

test("two devices: the newer change to each entry wins, and every device agrees on a tie", () => {
  const a = { "pin|/x": entry("pin", "/x", { title: "old" }, { t: 1, dev: "a" }), "link|p": entry("link", "p", 1, { t: 5, dev: "a" }) };
  const b = { "pin|/x": entry("pin", "/x", { title: "new" }, { t: 2, dev: "b" }), "note|n": entry("note", "n", "hi", { t: 3, dev: "b" }) };
  const m = merge(a, b);
  assert.equal(m.entries["pin|/x"].value.title, "new");
  assert.ok(m.entries["link|p"] && m.entries["note|n"]);
  assert.deepEqual(m.changed.map((e) => e.key).sort(), ["/x", "n"]);
  // merging the other way round ends the same
  assert.deepEqual(merge(b, a).entries, m.entries);
  // the same time on two devices: the larger device id wins, wherever it's decided
  const x = entry("tab", "t", "x", { t: 9, dev: "aaa" }), y = entry("tab", "t", "y", { t: 9, dev: "bbb" });
  assert.equal(newer(x, y), y); assert.equal(newer(y, x), y);
});

test("a deletion is kept, so an older copy can't bring the thing back; a newer re-add can", () => {
  const gone = { "pin|/x": tombstone("pin", "/x", { t: 10, dev: "a" }) };
  const stale = { "pin|/x": entry("pin", "/x", { title: "x" }, { t: 5, dev: "b" }) };
  assert.equal(merge(gone, stale).entries["pin|/x"].del, true);
  assert.equal(valuesOf(merge(gone, stale).entries, "pin").length, 0);
  const again = { "pin|/x": entry("pin", "/x", { title: "x" }, { t: 11, dev: "b" }) };
  assert.equal(valuesOf(merge(gone, again).entries, "pin").length, 1);
});

test("what this device kept before becomes the record once, and the record stays a sensible size", () => {
  const rec = importLegacy({ pins: [{ href: "/a", title: "A", t: 1 }, { href: "/b", title: "B", t: 2 }], workspace: { tabs: [{ id: "notes:/app.html", href: "/app.html#/notes", t: 3 }] }, history: [{ act: "viewed", href: "/a", title: "A", t: 4 }, { title: "no href" }] }, { dev: "d", now: 100 });
  assert.deepEqual(Object.keys(rec).sort(), ["activity|4-0", "pin|/a", "pin|/b", "tab|notes:/app.html"]);
  assert.equal(rec["pin|/b"].value.order, 1);
  const now = 400 * 864e5, many = {};
  for (let i = 0; i < 10; i++) many[`activity|${i}`] = entry("activity", i, {}, { t: now - i * 864e5 });
  many["activity|old"] = entry("activity", "old", {}, { t: now - 400 * 864e5 });
  many["pin|gone"] = tombstone("pin", "gone", { t: now - 40 * 864e5 });
  const kept = prune(many, { now, cap: 5 });
  assert.equal(valuesOf(kept, "activity").length, 5);
  assert.ok(!kept["activity|old"] && !kept["pin|gone"]);
});
