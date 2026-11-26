// Study workspace tabs (kit/ui/workspace.js) and the lesson tools bar's labels (kit/ui/context-bar.js).
import { test } from "node:test";
import assert from "node:assert/strict";
import { slotOf, openTab, closeTab, noteScroll, stepTab } from "../kit/ui/workspace.js";
import { shortLabel } from "../kit/ui/context-bar.js";

const bio = (id, t) => ({ href: `/sci/bio/#/lesson/${id}`, title: t, kind: "lesson", scope: "/sci/bio/", scopeLabel: "Biology" });
const notes = { href: "/app.html#/notes", title: "Notes", kind: "notes", scope: "/app.html" };
const plan = { href: "/app.html#/plan", title: "Smart Plan", kind: "plan", scope: "/app.html" };

test("only the kinds of place you work between get a tab", () => {
  assert.equal(slotOf(bio("a")), "lesson:/sci/bio/");
  assert.equal(slotOf({ kind: "home", href: "x" }), null);
  assert.equal(slotOf(null), null);
  const ws = openTab({ tabs: [], active: null }, { href: "/app.html#/today", kind: null });
  assert.deepEqual(ws, { tabs: [], active: null });
});

test("a lesson tab follows you through the course; other kinds open their own tabs", () => {
  let ws = openTab(undefined, bio("a", "Cell theory"), { now: 1 });
  ws = openTab(ws, notes, { now: 2 });
  ws = openTab(ws, bio("b", "Cell cycle"), { now: 3 });
  assert.equal(ws.tabs.length, 2);
  assert.equal(ws.tabs[0].title, "Cell cycle");                 // same tab, moved on, in the same position
  assert.equal(ws.active, "lesson:/sci/bio/");
  // another course's lesson is another tab
  ws = openTab(ws, { ...bio("c", "Torts"), href: "/law/#/lesson/c", scope: "/law/" }, { now: 4 });
  assert.equal(ws.tabs.length, 3);
  // somewhere that isn't a tab leaves the tabs and marks none active
  assert.equal(openTab(ws, { href: "/app.html#/today" }).active, null);
});

test("each tab keeps its scroll; coming back to the same place keeps it, moving on starts at the top", () => {
  let ws = openTab(undefined, notes);
  ws = noteScroll(ws, 840.4);
  assert.equal(ws.tabs[0].y, 840);
  ws = openTab(ws, plan); ws = openTab(ws, notes);
  assert.equal(ws.tabs[0].y, 840);
  ws = openTab(ws, { ...notes, href: "/app.html#/notes/other" });
  assert.equal(ws.tabs[0].y, 0);
  assert.equal(noteScroll({ tabs: [], active: null }, 5).active, null);
});

test("at most six: the longest unused goes first, never the one you're on", () => {
  let ws;
  const kinds = ["lesson", "notes", "plan", "questions", "flashcards"];
  kinds.forEach((k, i) => { ws = openTab(ws, { href: `/a#/${k}`, kind: k, scope: "/a" }, { now: i }); });
  ws = openTab(ws, { href: "/b#/l", kind: "lesson", scope: "/b" }, { now: 10 });
  ws = openTab(ws, { href: "/c#/l", kind: "lesson", scope: "/c" }, { now: 11, max: 6 });
  assert.equal(ws.tabs.length, 6);
  assert.ok(!ws.tabs.some((t) => t.id === "lesson:/a"));       // the oldest went
  assert.equal(ws.active, "lesson:/c");
});

test("closing the active tab moves to its neighbour; stepping wraps round", () => {
  let ws = openTab(undefined, notes, { now: 1 }); ws = openTab(ws, plan, { now: 2 }); ws = openTab(ws, bio("a", "A"), { now: 3 });
  let r = closeTab(ws, "plan:/app.html");
  assert.equal(r.go, null); assert.equal(r.ws.tabs.length, 2); assert.equal(r.ws.active, "lesson:/sci/bio/");
  r = closeTab(ws, "lesson:/sci/bio/");
  assert.equal(r.go.id, "plan:/app.html"); assert.equal(r.ws.active, "plan:/app.html");
  assert.equal(closeTab(ws, "nope").go, null);
  assert.equal(stepTab(ws, 1).id, "notes:/app.html");
  assert.equal(stepTab(ws, -1).id, "plan:/app.html");
  assert.equal(stepTab({ tabs: [] }, 1), null);
});

test("the tools bar's buttons use short names", () => {
  assert.equal(shortLabel("Ask AI to explain"), "Ask AI");
  assert.equal(shortLabel("Exam-style questions"), "Questions");
  assert.equal(shortLabel("Explore related topics"), "Related topics");
  assert.equal(shortLabel("Unit 3 quiz"), "Unit 3 quiz");
});
