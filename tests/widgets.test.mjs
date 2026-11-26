// Step 4, widgets: the board's plan (order, what's covered by another), presets, settings, failure isolation, and the
// new widgets' pure parts (kit/app/widgets.js, kit/app/widgets-more.js); the quick tools' timer (kit/ui/quick-dock.js).
import { test } from "node:test";
import assert from "node:assert/strict";
import { WIDGETS, DEFAULT_WIDGETS, PRESETS, COVERS, boardPlan, drawWidget } from "../kit/app/widgets.js";
import { todaysTasks, topTools, alertsFor } from "../kit/app/widgets-more.js";
import { remaining, fmt } from "../kit/ui/quick-dock.js";

test("every widget id is unique, and every preset, default and cover names real widgets", () => {
  const ids = WIDGETS.map((w) => w.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of [...DEFAULT_WIDGETS, ...PRESETS.flatMap((p) => p[3]), ...Object.keys(COVERS), ...Object.values(COVERS).flat()]) assert.ok(ids.includes(id), id);
  for (const w of WIDGETS) assert.ok(["s", "w", "b"].includes(w.size), `${w.id} has a size`);
});

test("the board keeps the learner's order, and leaves off what another widget on it already shows", () => {
  const examFirst = { m: { deadlines: [{ day: "2026-12-10", kind: "exam", title: "Biology" }, { day: "2026-12-20", kind: "deadline", title: "Essay" }] } };
  const { show, covered } = boardPlan(["w-flash", "s-due", "s-streak", "nope", "b-exam", "s-deadline"], undefined, examFirst);
  assert.deepEqual(show, ["w-flash", "s-streak", "b-exam"]);              // unknown ids dropped, order kept
  assert.equal(covered.get("s-due"), "w-flash"); assert.equal(covered.get("s-deadline"), "b-exam");
  assert.deepEqual(boardPlan(["s-due", "s-deadline"]).show, ["s-due", "s-deadline"]);   // shown again once the bigger one's gone
});

test("the exam countdown only stands in for 'Next deadline' when the next deadline is that exam", () => {
  const essayFirst = { m: { deadlines: [{ day: "2026-12-04", kind: "deadline", title: "Essay" }, { day: "2026-12-10", kind: "exam", title: "Biology" }] } };
  assert.deepEqual(boardPlan(["b-exam", "s-deadline"], undefined, essayFirst).show, ["b-exam", "s-deadline"]);
  assert.deepEqual(boardPlan(["b-exam", "s-deadline"], undefined, { m: { deadlines: [] } }).show, ["b-exam", "s-deadline"]);
  // the week view and the day's plan show different things: both stay
  assert.deepEqual(boardPlan(["w-week", "w-upcoming"]).show, ["w-week", "w-upcoming"]);
});

test("one widget that fails is just that widget; the rest of the board draws", () => {
  const broken = { id: "w-x", size: "w", name: "Broken", icon: "alert", body: true, render: () => { throw new Error("boom"); } };
  const html = drawWidget(broken, {});
  assert.match(html, /wd-failed/); assert.match(html, /couldn't load/); assert.match(html, /data-wretry="w-x"/);
  const ok = drawWidget({ ...broken, render: () => "<p>fine</p>" }, {});
  assert.match(ok, /<div class="wd-body"><p>fine<\/p><\/div>/); assert.match(ok, /data-wrefresh="w-x"/); assert.match(ok, /data-whide="w-x"/);
});

test("today's tasks are today's own study blocks, in order; the tools are the ones used most", () => {
  const t = todaysTasks([{ id: 2, day: "d", start_min: 600, cal: "study" }, { id: 1, day: "d", start_min: 540 }, { id: 3, day: "d", start_min: 500, cal: "external" }, { id: 4, day: "e", start_min: 1 }], "d");
  assert.deepEqual(t.map((b) => b.id), [1, 2]);
  const tools = topTools([{ href: "/app.html#/tools/notebook/x" }, { href: "/app.html#/tools/notebook" }, { href: "/app.html#/tools/map/new" }, { href: "/x#/lesson/1" }]);
  assert.deepEqual(tools.slice(0, 3).map((x) => x.key), ["notebook", "map", "cards"]);
  assert.equal(tools.length, 5);
});

test("'Worth doing' says what needs the learner, most pressing first, and not what the board already shows", () => {
  const all = alertsFor({ due: 12, missed: [{}], mistakes: 3, sync: { state: "offline", waiting: 2 }, deadline: { title: "Biology exam", days: 2 } });
  assert.deepEqual(all.map((a) => a.href), ["#/account", "#/plan", "#/plan", "#/study", "#/revise"]);
  assert.match(all[0].t, /Offline: 2 changes waiting/); assert.match(all[1].t, /Biology exam in 2 days/);
  const lean = alertsFor({ due: 12, missed: [{}], mistakes: 3, deadline: { title: "x", kind: "exam", days: 2 } }, new Set(["s-due", "w-tasks", "w-mistakes", "b-exam"]));
  assert.deepEqual(lean, []);
  assert.deepEqual(alertsFor({ deadline: { title: "x", days: 9 } }), []);   // far away isn't pressing
  // the exam countdown doesn't show an assignment, so one due soon is still worth saying
  assert.equal(alertsFor({ deadline: { title: "Essay", kind: "deadline", days: 1 } }, new Set(["b-exam"])).length, 1);
  assert.equal(alertsFor({ deadline: { title: "Biology", kind: "exam", days: 1 } }, new Set(["b-exam"])).length, 0);
});

test("the timer: time left running and paused, and how it reads", () => {
  assert.equal(remaining({ end: 1_000_000 + 90_000 }, 1_000_000), 90);
  assert.equal(remaining({ end: 0, paused: 42 }, 5e9), 42);
  assert.equal(remaining({ end: 10 }, 99), 0);
  assert.equal(remaining(null), 0);
  assert.equal(fmt(1500), "25:00"); assert.equal(fmt(65), "1:05");
});
