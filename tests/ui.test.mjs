// The Gradify UX system (kit/ui, docs/DESIGN-SYSTEM.md): the parts with logic are tested here once, so every page
// that uses them (each course, each subject site, the Gradify homepage) gets the same, tested behaviour.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { pref, setPref, prefSet } from "../kit/ui/prefs.js";
import { arrive, scrolled, backTarget, addRecent, togglePin, restoreAt, move } from "../kit/ui/places.js";
import { parseCombo, matches, kbdParts } from "../kit/ui/keys.js";
import { saveLabel } from "../kit/ui/feedback.js";
import { emptyState, skeleton } from "../kit/ui/states.js";
import { resourceSwitcher, courseCard } from "../kit/ui/resources.js";
import { mark } from "../kit/ui/palette.js";
import { searchIndex, score } from "../kit/ui/global-nav.js";
import { mergeProgress } from "../kit/course/progress.js";
import { buildIndex, serialise } from "../scripts/build-search-index.mjs";

const memory = () => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k) }; };

test("preferences are remembered per scope, and cleared with null", () => {
  const st = memory();
  assert.equal(pref("chemistry", "learnFilter", "all", st), "all");
  setPref("chemistry", "learnFilter", "revise", st);
  setPref("law", "learnFilter", "mastered", st);
  assert.equal(pref("chemistry", "learnFilter", "all", st), "revise");
  assert.equal(pref("law", "learnFilter", null, st), "mastered");
  setPref("chemistry", "learnFilter", null, st);
  assert.equal(pref("chemistry", "learnFilter", "all", st), "all");
  const open = prefSet("chemistry", "open", st);
  open.toggle("u01"); open.toggle("u02"); open.toggle("u01");
  assert.deepEqual(open.all(), ["u02"]);
  // a broken record never breaks the page
  st.setItem("gradify.ui", "{not json");
  assert.equal(pref("chemistry", "x", 7, st), 7);
});

test("the trail: going back returns to the previous place with its scroll position", () => {
  let t = [];
  t = arrive(t, { href: "#/lesson/a", kind: "lesson", t: 1 }).trail;
  t = scrolled(t, 640);
  t = arrive(t, { href: "#/quiz/u01", kind: "quiz", t: 2 }).trail;
  const back = arrive(t, { href: "#/lesson/a", kind: "lesson" });
  assert.equal(back.back, true);
  assert.equal(back.y, 640);
  assert.equal(back.trail.length, 1);
  // arriving at the same place again (a redraw) isn't a new step, and keeps its position
  const same = arrive(back.trail, { href: "#/lesson/a", title: "A" });
  assert.equal(same.trail.length, 1); assert.equal(same.trail[0].y, 640); assert.equal(same.trail[0].title, "A");
});

test("back to where I was: the last meaningful place, of the right kind, not too long ago", () => {
  const now = 10_000_000;
  const t = [{ href: "#/lesson/a", kind: "lesson", t: now - 5000 }, { href: "#/home", kind: "home", t: now - 3000 }, { href: "#/quiz/u1", kind: "quiz", t: now }];
  assert.equal(backTarget(t, { now }).href, "#/home");
  assert.equal(backTarget(t, { kinds: ["lesson"], now }).href, "#/lesson/a");
  assert.equal(backTarget(t, { kinds: ["lesson"], within: 1000, now }), null);
  assert.equal(backTarget([], { now }), null);
});

test("pins: toggle, undo puts it back in the same place, and drag reorders", () => {
  const a = { href: "/a/", title: "A" }, b = { href: "/b/", title: "B" }, c = { href: "/c/", title: "C" };
  let list = [a, b, c].reduce((l, x) => togglePin(l, x).list, []);
  assert.deepEqual(list.map((x) => x.title), ["A", "B", "C"]);
  const off = togglePin(list, b);
  assert.equal(off.pinned, false); assert.equal(off.index, 1);
  assert.deepEqual(restoreAt(off.list, off.item, off.index).map((x) => x.title), ["A", "B", "C"]);
  assert.deepEqual(move(list, 2, 0).map((x) => x.title), ["C", "A", "B"]);
  assert.deepEqual(move(list, 0, 9).map((x) => x.title), ["B", "C", "A"]);
  assert.deepEqual(addRecent([a, b], { href: "/b/", title: "B" }).map((x) => x.href), ["/b/", "/a/"]);
});

test("shortcuts: combinations, sequences and how they're written", () => {
  assert.deepEqual(parseCombo("mod+k"), { key: "k", mod: true, shift: false, alt: false });
  assert.ok(matches({ key: "k", metaKey: true }, "mod+k", true));
  assert.ok(!matches({ key: "k", ctrlKey: true }, "mod+k", true));
  assert.ok(matches({ key: "k", ctrlKey: true }, "mod+k", false));
  assert.ok(matches({ key: "?", shiftKey: true }, "?", false), "? needs Shift on most keyboards");
  assert.ok(matches({ key: "b" }, "b", false));
  assert.ok(!matches({ key: "B", shiftKey: true }, "b", false), "Shift+B is not B");
  assert.ok(!matches({ key: "b", ctrlKey: true }, "b", false), "Ctrl+B is the browser's");
  assert.ok(matches({ key: "ArrowLeft" }, "ArrowLeft", false));
  assert.deepEqual(kbdParts("mod+k", true), ["⌘", "K"]);
  assert.deepEqual(kbdParts("g h", false), ["G", "then", "H"]);
});

test("the save indicator says where the work is, in every state", () => {
  assert.equal(saveLabel("saving").text, "Saving…");
  assert.equal(saveLabel("saved", { at: 1000, now: 2000 }).tone, "ok");
  assert.match(saveLabel("saved", { at: 1000, now: 2000 }).title, /just now/);
  assert.equal(saveLabel("local").text, "Saved on this device");
  assert.match(saveLabel("offline", { waiting: 3 }).text, /3 waiting/);
  for (const s of ["offline", "signed-out", "error"]) { assert.equal(saveLabel(s).tone, "warn"); assert.match(saveLabel(s).title, /saved on this device/i); }
});

test("empty states always offer the next step; skeletons announce loading", () => {
  const html = emptyState({ icon: "cards", title: "No flashcards yet", body: "Study a lesson.", actions: [{ label: "Study a lesson", href: "#/learn", primary: true }] });
  assert.match(html, /No flashcards yet/); assert.match(html, /href="#\/learn"/);
  assert.match(emptyState({ title: "<b>x</b>" }), /&lt;b&gt;x/, "titles are escaped");
  for (const k of ["lesson", "list", "cards", "text"]) assert.match(skeleton(k), /aria-busy="true"/);
});

test("the resource switcher and the course card", () => {
  assert.equal(resourceSwitcher({ items: [null] }), "", "nothing to offer, nothing drawn");
  const sw = resourceSwitcher({ kicker: "Organic chemistry · Alkenes", items: [{ icon: "notes", label: "Revision notes", run() {} }, { icon: "cards", label: "Flashcards", href: "#c", primary: true }] });
  assert.match(sw, /What would you like to do next\?/); assert.match(sw, /data-res="0"/); assert.match(sw, /gx-res primary" href="#c"/);
  const card = courseCard({ site: "SciGradify", course: "Organic Chemistry", pct: 0.68, done: 12, total: 18, unitWord: "topics", next: { label: "Revise electrophilic addition.", mins: 8, href: "/x" }, href: "/c/" });
  assert.match(card, /68% complete · 12 of 18 topics/); assert.match(card, /Recommended next · 8 min/); assert.match(card, /aria-valuenow="68"/);
});

test("search: every word must match, starts of words rank first, the learner's site first", () => {
  assert.equal(score("Electronegativity", ["electro"]) > score("Bond electronegativity", ["electro"]), true);
  assert.equal(score("Alkenes", ["alk", "xyz"]), 0);
  const idx = { courses: [
    { s: "chemistry", n: "Chemistry", site: "SciGradify", u: "/scigradify/chemistry/", U: "School", units: [["u12", 12, "Organic chemistry", [["u12-03", "Alkenes", 0], ["u12-04", "Alkanes"]], ["Hydrocarbons"]]] },
    { s: "biology", n: "Biology", site: "SciGradify", u: "/scigradify/biology/", U: "School", units: [["u02", 2, "Biological molecules", [["u02-01", "Alkenes in membranes"]], []]] },
    { s: "law", n: "Law", site: "LawGradify", u: "/lawgradify/course/", U: "School", units: [["u03", 3, "Contract law", [["u03-01", "Offer and acceptance"]], []]] },
  ] };
  const hits = searchIndex(idx, "alkenes");
  assert.equal(hits[0].href, "/scigradify/chemistry/#/lesson/u12-03");
  assert.match(hits[0].k, /Chemistry · School 12 · Hydrocarbons/);
  assert.match(hits[0].html, /<mark>Alkenes<\/mark>/);
  assert.equal(searchIndex(idx, "contract", { site: "LawGradify" })[0].type, "topic");
  assert.equal(searchIndex(idx, "law")[0].type, "course");
  assert.deepEqual(searchIndex(idx, "   "), []);
  assert.equal(mark("A <b> & Cat", "ca"), "A &lt;b&gt; &amp; <mark>Ca</mark>t", "highlights, escaping the rest");
  assert.equal(mark("Cat", "c"), "Cat", "one letter highlights nothing (it would mark half the screen)");
});

test("the Gradify-wide search index is up to date with the courses", async () => {
  const fresh = serialise(await buildIndex());
  assert.equal(readFileSync(new URL("../kit/data/search-index.json", import.meta.url), "utf8"), fresh, "run node scripts/build-search-index.mjs");
});

test("reading positions sync: the newer one wins, so another device picks up at the same section", () => {
  const local = { pos: { a: { sec: "co-s2", t: 100 }, b: { sec: "co-s1", t: 500 } } };
  const cloud = { pos: { a: { sec: "co-s4", t: 300 }, c: { sec: "co-s3", t: 200 } } };
  const m = mergeProgress(local, cloud);
  assert.deepEqual(m.pos, { a: { sec: "co-s4", t: 300 }, b: { sec: "co-s1", t: 500 }, c: { sec: "co-s3", t: 200 } });
  const many = Object.fromEntries(Array.from({ length: 90 }, (_, i) => [`l${i}`, { sec: "co-s1", t: i }]));
  assert.equal(Object.keys(mergeProgress({ pos: many }, {}).pos).length, 60, "only the most recent are kept");
});

test("one implementation: pages use the shared toast and palette, not copies", () => {
  for (const f of ["kit/course/course.js", "kit/app/main.js", "kit/game/journey.js"]) {
    const src = readFileSync(f, "utf8");
    assert.match(src, /from "\.\.\/ui\/feedback\.js"/, `${f} uses the shared toast`);
    assert.doesNotMatch(src, /className = "co-toasts"|className = "gj-toasts"/, `${f} has no toast of its own`);
  }
  assert.match(readFileSync("kit/course/navigator.js", "utf8"), /createCommandPalette/);
  assert.doesNotMatch(readFileSync("kit/styles/course.css", "utf8"), /\.cx-pal\b|\.co-toast\b/, "palette and toast styles live in ui.css");
  // every module in kit/ui is documented in the design system
  const doc = readFileSync("docs/DESIGN-SYSTEM.md", "utf8");
  for (const f of readdirSync("kit/ui")) assert.ok(doc.includes(`kit/ui/${f}`), `docs/DESIGN-SYSTEM.md describes kit/ui/${f}`);
});

test("Explore: a course as chapters → topics → lessons, with progress, time and what each topic builds on", async () => {
  const { courseTree, courseProgress } = await import("../kit/ui/explore.js");
  const c = { s: "maths", U: "School", T: ["Foundations", "Calculus"], pre: { "u07/Differentiation": ["u07/Limits"] },
    units: [["u07", 7, "Calculus", [["u07-01", "Limits", 0], ["u07-02", "One-sided limits", 0], ["u07-03", "Derivatives", 1]], ["Limits", "Differentiation"], 1, "Rates of change."]] };
  const prog = courseProgress({ done: { "u07-01": 1, "u07-02": 2 } });
  const [u] = courseTree(c, prog);
  assert.equal(u.stage, "Calculus"); assert.equal(u.blurb, "Rates of change.");
  assert.deepEqual(u.topics.map((t) => [t.name, t.lessons.length, t.done]), [["Limits", 2, 2], ["Differentiation", 1, 0]]);
  assert.deepEqual(u.topics[1].pre, ["u07/Limits"]);
  assert.deepEqual(u.topics[0].next, ["u07/Differentiation"], "what a topic leads to is the reverse of what builds on it");
  assert.equal(u.done, 2); assert.equal(Math.round(u.pct * 100), 67);
  assert.equal(u.mins, 3 * 8, "8 minutes a lesson until the learner's own pace is known");
  assert.equal(u.topics[1].lessons[0].st, "new", "opening Explore marks nothing as studied");
});

test("feedback moments: every one has a haptic; sounds and haptics are learner settings", async () => {
  const { MOMENTS } = await import("../kit/ui/feel.js");
  for (const k of ["select", "correct", "wrong", "complete", "levelup", "achievement"]) assert.ok(MOMENTS[k]?.haptic, k);
  const { SETTINGS } = await import("../kit/core/access-panel.js");
  assert.equal(SETTINGS.find((s) => s.k === "sound").opts[0][1], "Off", "sounds are off unless turned on");
  assert.equal(SETTINGS.find((s) => s.k === "haptics").opts[0][1], "On");
});
