// The study app's navigation (kit/app/app-nav.js): breadcrumbs, screen search and actions in ⌘K.
import { test } from "node:test";
import assert from "node:assert/strict";
import { allScreens, crumbTrail, screenHits, appActions, matchActions } from "../kit/app/app-nav.js";

const SECTIONS = [
  ["today", "Today", "home", [["today", "Today", "home"], ["plan", "Smart Plan", "calendar"]]],
  ["study", "Study", "layers", [["study", "Flashcards", "layers"], ["tools", "Tools", "forge"]]],
  ["library", "Library", "book", [["notes", "Notes", "feather"], ["library", "Your library", "book"]]],
  ["progress", "Progress", "trend", [["progress", "Progress", "trend"]]],
];
const SETTINGS = ["account", "Settings", "cog"];
const SCREEN_OF = { deck: "library", topic: "progress" };
const opts = (itemTitle = "") => ({ sections: SECTIONS, settings: SETTINGS, screenOf: (r) => SCREEN_OF[r] || r, itemTitle });
const labels = (t) => t.map((c) => c.label);

test("allScreens lists every screen with its section, and Settings last", () => {
  const s = allScreens(SECTIONS, SETTINGS);
  assert.equal(s.length, 8);
  assert.deepEqual(s.find((x) => x.route === "tools"), { route: "tools", label: "Tools", icon: "forge", section: "study", sectionLabel: "Study" });
  assert.equal(s.at(-1).route, "account");
});

test("a screen's breadcrumb: Gradify, its section, the screen; a section named like its screen isn't repeated", () => {
  assert.deepEqual(labels(crumbTrail("#/tools", opts())), ["Gradify", "Study", "Tools"]);
  assert.deepEqual(labels(crumbTrail("#/today", opts())), ["Gradify", "Today"]);
  assert.deepEqual(labels(crumbTrail("#/progress", opts())), ["Gradify", "Progress"]);
  assert.deepEqual(labels(crumbTrail("", opts())), ["Gradify", "Today"]);
  // the section links to its first screen
  assert.equal(crumbTrail("#/tools", opts())[1].href, "#/study");
});

test("something opened inside a screen is the last level, under the screen it belongs to", () => {
  const t = crumbTrail("#/deck/abc123", opts("Cardiac cycle"));
  assert.deepEqual(labels(t), ["Gradify", "Library", "Your library", "Cardiac cycle"]);
  assert.equal(t.at(-1).href, "#/deck/abc123");
  assert.equal(t[2].href, "#/library");
  // a screen's own heading isn't added as a level, and a top-level screen never gets one
  assert.deepEqual(labels(crumbTrail("#/tools/quiz", opts("Tools"))), ["Gradify", "Study", "Tools"]);
  assert.deepEqual(labels(crumbTrail("#/tools", opts("Make your own"))), ["Gradify", "Study", "Tools"]);
  // a query after the route is ignored, and long titles are shortened
  assert.deepEqual(labels(crumbTrail("#/tools?x=1", opts())), ["Gradify", "Study", "Tools"]);
  assert.ok(crumbTrail("#/deck/x", opts("a".repeat(90))).at(-1).label.length <= 60);
});

test("screens are found by their name or their section", () => {
  assert.equal(screenHits(SECTIONS, SETTINGS, "plan")[0].href, "#/plan");
  assert.equal(screenHits(SECTIONS, SETTINGS, "settings")[0].href, "#/account");
  assert.ok(screenHits(SECTIONS, SETTINGS, "library").some((h) => h.href === "#/notes"));   // Notes lives in Library
  assert.deepEqual(screenHits(SECTIONS, SETTINGS, "  "), []);
});

test("actions are found by what they do, and Resume appears only with somewhere to resume", () => {
  assert.ok(!appActions().some((a) => a.t === "Resume last lesson"));
  const r = appActions({ resume: { title: "Cell structure", href: "/scigradify/biology/#/lesson/cs", next: { label: "Cell membranes", href: "/scigradify/biology/#/lesson/cm" } } });
  assert.equal(r[0].t, "Resume last lesson");
  assert.equal(r[0].href, "/scigradify/biology/#/lesson/cm");   // the recommended next step, when the course gave one
  const all = appActions();
  assert.equal(matchActions(all, "timed")[0].href, "#/tools/quiz/timed");
  assert.equal(matchActions(all, "create flash")[0].href, "#/new");
  assert.equal(matchActions(all, "mock exam")[0].t, "Start a timed test");    // by its other names too
  assert.match(matchActions(all, "plan")[0].html, /<mark>/);
});
