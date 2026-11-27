// Organising (kit/data/organise.js): nested folders, tags, auto-tag suggestions, templates, possible duplicates,
// where an unfiled thing might go, whose a thing is and who can see it, recently deleted, and ordering.
import { test } from "node:test";
import assert from "node:assert/strict";
import { tree, pathOf, descendants, canNest, folderLabel, reorder, normTag, autoTags, tagCounts, ownerOf, visibilityOf, placeFor, titleKey, duplicateGroups, templatePlan, TEMPLATES, liveTrash, TRASH_DAYS } from "../kit/data/organise.js";

const COLS = [
  { id: "a", name: "Mock revision" }, { id: "b", name: "Chemistry", parent: "a", order: 1 }, { id: "c", name: "Biology", parent: "a", order: 0 },
  { id: "d", name: "Equilibria", parent: "b" }, { id: "e", name: "Old term", archived: 1 }, { id: "f", name: "Orphan", parent: "gone" },
];

test("folders inside folders: the tree in the learner's order, its breadcrumbs, and no folder inside itself", () => {
  const t = tree(COLS);
  assert.deepEqual(t.map((x) => x.name), ["Mock revision", "Orphan"]);   // archived left out; a lost parent puts it at the top
  assert.deepEqual(t[0].children.map((x) => x.name), ["Biology", "Chemistry"]);
  assert.deepEqual(t[0].children[1].children.map((x) => [x.name, x.depth]), [["Equilibria", 2]]);
  assert.ok(tree(COLS, { archived: true }).some((x) => x.name === "Old term"));
  assert.deepEqual(pathOf(COLS, "d").map((x) => x.name), ["Mock revision", "Chemistry", "Equilibria"]);
  assert.equal(folderLabel(COLS, "d"), "Mock revision › Chemistry › Equilibria");
  assert.deepEqual(descendants(COLS, "a").map((x) => x.id).sort(), ["b", "c", "d"]);
  assert.equal(canNest(COLS, "a", "d"), false); assert.equal(canNest(COLS, "a", "a"), false); assert.equal(canNest(COLS, "d", "c"), true); assert.equal(canNest(COLS, "d", null), true);
  // a cycle in the record (two devices nesting each into the other) can't hang the tree
  assert.deepEqual(tree([{ id: "x", name: "X", parent: "y" }, { id: "y", name: "Y", parent: "x" }]).map((c) => c.id), ["x", "y"]);
  assert.deepEqual(pathOf([{ id: "x", name: "X", parent: "y" }, { id: "y", name: "Y", parent: "x" }], "x").map((c) => c.id), ["y", "x"]);
});

test("dragging to reorder: one thing moves to sit before another, or to the end", () => {
  assert.deepEqual(reorder(["a", "b", "c", "d"], "d", "b"), ["a", "d", "b", "c"]);
  assert.deepEqual(reorder(["a", "b", "c"], "a"), ["b", "c", "a"]);
  assert.deepEqual(reorder(["a", "b", "c"], "b", "missing"), ["a", "c", "b"]);
});

test("tags: one spelling per tag, counted across everything; suggestions from subject, topic, kind and mistakes", () => {
  assert.equal(normTag(" #Priority "), "priority");
  assert.equal(normTag("Memorise this!"), "memorise-this");
  assert.equal(normTag("###"), "");
  assert.deepEqual(tagCounts([{ value: { tags: ["difficult", "exam"] } }, { value: { tags: ["difficult"] } }]), [{ tag: "difficult", n: 2 }, { tag: "exam", n: 1 }]);
  const lesson = { rid: "lesson:/scigradify/chemistry/u08-02", kind: "lesson", subject: "Chemistry", module: "Equilibrium", course: "/scigradify/chemistry/" };
  assert.deepEqual(autoTags(lesson, { mistakes: 2 }).map((x) => [x.tag, x.kind]), [["chemistry", "subject"], ["equilibrium", "topic"], ["lesson", "type"], ["revisit", "state"]]);
  assert.deepEqual(autoTags(lesson, { have: ["chemistry", "lesson"] }).map((x) => x.tag), ["equilibrium"]);
  assert.deepEqual(autoTags({ rid: "pack:p1", kind: "pack" }).map((x) => x.tag), ["flashcard-set"]);
});

test("whose it is and who can see it: Gradify's content is public, the learner's is private unless shared", () => {
  assert.equal(ownerOf({ rid: "lesson:/scigradify/chemistry/u08-02" }), "gradify");
  assert.equal(ownerOf({ rid: "pack:abc" }), "yours");
  assert.equal(ownerOf({ rid: "note:r1" }), "yours");
  assert.equal(ownerOf({ id: "jot:j1" }), "yours");
  assert.equal(ownerOf({ rid: "spec:/scigradify/biology/4.1" }), "gradify");
  assert.equal(ownerOf({ rid: "screen:/app.html#/plan" }), "gradify");
  assert.equal(visibilityOf({ rid: "lesson:/x/u1" }).key, "public");
  assert.equal(visibilityOf({ rid: "note:r1" }, { signedIn: true }).key, "private");
  assert.equal(visibilityOf({ rid: "note:r1" }).key, "device");
  assert.equal(visibilityOf({ rid: "note:r1" }, { shared: new Set(["note:r1"]) }).label, "Shared");
});

test("where an unfiled thing might go: by the folder's name, its subject, its course or what's in it", () => {
  const folders = [
    { id: "m", name: "Chemistry mock", items: [{ rid: "lesson:/c/u1", title: "Rates of reaction", subject: "Chemistry", course: "/scigradify/chemistry/" }] },
    { id: "h", name: "History essay", items: [] },
    { id: "s", name: "Smart", smart: { q: "tag:x" }, items: [] },
  ];
  const r = placeFor({ rid: "pack:p1", title: "Chemistry: equilibrium cards", subject: "Chemistry" }, folders);
  assert.deepEqual(r.map((x) => x.id), ["m"]); assert.match(r[0].why, /chemistry/i);
  assert.deepEqual(placeFor({ rid: "pack:p2", title: "Spanish verbs" }, folders), []);
  assert.deepEqual(placeFor({ rid: "lesson:/c/u1", title: "Rates of reaction", subject: "Chemistry" }, folders), [], "already there");
});

test("possible duplicates: the same title of the same kind, or sets with mostly the same cards", () => {
  assert.equal(titleKey("Cell biology (copy)"), titleKey("cell biology"));
  assert.equal(titleKey("Cell Biology copy 2"), "cell biology");
  const fronts = ["What is ATP?", "What is a ribosome?", "What does DNA polymerase do?", "Define osmosis"];
  const g = duplicateGroups([
    { rid: "pack:1", kind: "pack", title: "Cell biology" }, { rid: "pack:2", kind: "pack", title: "Cell biology (copy)" }, { rid: "note:1", kind: "note", title: "Cell biology" },
    { rid: "pack:3", kind: "pack", title: "Week 3", fronts }, { rid: "pack:4", kind: "pack", title: "Biology quiz", fronts: [...fronts, "What is ATP"] },
    { rid: "pack:5", kind: "pack", title: "Physics", fronts: ["a", "b", "c"] },
  ]);
  assert.deepEqual(g.map((x) => [x.reason, x.items.map((i) => i.rid)]), [["Same title", ["pack:1", "pack:2"]], ["100% of the same cards", ["pack:3", "pack:4"]]]);
  assert.equal(duplicateGroups([{ rid: "pack:1", kind: "pack", title: "A" }, { rid: "pack:2", kind: "pack", title: "A" }], { dismissed: new Set(["pack:1+pack:2"]) }).length, 0);
});

test("templates: prebuilt structures, including one built from a course's units", () => {
  const mock = templatePlan(TEMPLATES.find((t) => t.id === "mock"));
  assert.equal(mock[0].parent, null); assert.ok(mock.slice(1).every((f) => f.parent === "root"));
  assert.ok(mock.some((f) => f.smart === "tag:difficult done:no"));
  const course = templatePlan(TEMPLATES.find((t) => t.id === "course"), { course: { n: "Chemistry", U: "School", units: [["u01", 1, "Atoms"], ["u02", 2, "Bonding"]] } });
  assert.deepEqual(course.map((f) => f.name), ["Chemistry", "School 1: Atoms", "School 2: Bonding"]);
  assert.equal(templatePlan(TEMPLATES.find((t) => t.id === "weekly"), { name: "Week of 1 Dec" })[0].name, "Week of 1 Dec");
});

test("recently deleted keeps things for 30 days, newest first, with the days left", () => {
  const now = Date.now(), day = 864e5;
  const t = liveTrash([{ id: "old", at: now - (TRASH_DAYS + 1) * day }, { id: "a", at: now - 29.5 * day }, { id: "b", at: now - day / 2 }], now);
  assert.deepEqual(t.map((x) => [x.id, x.daysLeft]), [["b", 30], ["a", 1]]);
});
