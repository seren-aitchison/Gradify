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
