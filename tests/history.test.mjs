// The learner's activity history (kit/ui/history.js): merging repeats, filters and days.
import { test } from "node:test";
import assert from "node:assert/strict";
import { addEvent, filterHistory, subjectsOf, groupByDay, rangeStart } from "../kit/ui/history.js";

const NOW = new Date(2026, 10, 26, 15, 0).getTime(), MIN = 60e3, DAY = 864e5;

test("the same thing done again soon after is one entry, moved to the top; counts add up", () => {
  let h = addEvent([], { act: "viewed", href: "/a#/x", title: "X" }, { now: NOW - 20 * MIN });
  h = addEvent(h, { act: "viewed", href: "/a#/y", title: "Y" }, { now: NOW - 10 * MIN });
  h = addEvent(h, { act: "viewed", href: "/a#/x", title: "X again" }, { now: NOW });
  assert.deepEqual(h.map((x) => x.title), ["X again", "Y"]);
  h = addEvent(h, { act: "studied", href: "/a#/x", title: "X", n: 10, unit: "cards" }, { now: NOW });
  h = addEvent(h, { act: "studied", href: "/a#/x", title: "X", n: 5, unit: "cards" }, { now: NOW + MIN });
  assert.equal(h.length, 3);
  assert.equal(h[0].n, 15);
  // after half an hour it's a new entry
  h = addEvent(h, { act: "viewed", href: "/a#/y", title: "Y" }, { now: NOW + 2 * 60 * MIN });
  assert.equal(h.filter((x) => x.href === "/a#/y").length, 2);
  // nothing to record without a place and an act; empty fields aren't kept; the list has a limit
  assert.equal(addEvent(h, { act: "viewed" }), h);
  assert.ok(!("where" in addEvent([], { act: "viewed", href: "z", title: "Z", where: "" })[0]));
  let big = []; for (let i = 0; i < 20; i++) big = addEvent(big, { act: "viewed", href: `/${i}` }, { limit: 5 });
  assert.equal(big.length, 5);
});

test("filter by activity, subject, date and words", () => {
  const h = [
    { act: "viewed", href: "1", title: "Cell cycle", subject: "Biology", where: "SciGradify · Biology", t: NOW - MIN },
    { act: "studied", href: "2", title: "Flashcards", t: NOW - 2 * DAY },
    { act: "created", href: "3", title: "Cardiac cycle", subject: "Biology", t: NOW - 10 * DAY },
    { act: "edited", href: "4", title: "Contract law", subject: "Law", t: NOW - 40 * DAY },
  ];
  const ids = (o) => filterHistory(h, { now: NOW, ...o }).map((x) => x.href);
  assert.deepEqual(ids({}), ["1", "2", "3", "4"]);
  assert.deepEqual(ids({ act: "studied" }), ["2"]);
  assert.deepEqual(ids({ subject: "Biology" }), ["1", "3"]);
  assert.deepEqual(ids({ subject: "none" }), ["2"]);
  assert.deepEqual(ids({ range: "today" }), ["1"]);
  assert.deepEqual(ids({ range: "week" }), ["1", "2"]);
  assert.deepEqual(ids({ range: "month" }), ["1", "2", "3"]);
  assert.deepEqual(ids({ q: "cycle" }), ["1", "3"]);
  assert.deepEqual(ids({ q: "scigradify cell" }), ["1"]);
  assert.equal(rangeStart("all"), 0);
  assert.deepEqual(subjectsOf(h), [["Biology", 2], ["Law", 1]]);
});

test("grouped by day: Today, Yesterday, then the date", () => {
  const g = groupByDay([{ t: NOW - DAY, title: "b" }, { t: NOW, title: "a" }, { t: NOW - 3 * DAY, title: "c" }, { t: NOW - MIN, title: "a2" }], NOW);
  assert.deepEqual(g.map((x) => x.label), ["Today", "Yesterday", "Monday 23 November"]);
  assert.deepEqual(g[0].items.map((x) => x.title), ["a", "a2"]);
});
