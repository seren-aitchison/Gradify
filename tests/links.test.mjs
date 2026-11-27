// Connected learning (kit/data/links.js): links in both directions, suggestions with reasons, mistakes by lesson,
// and the small map of a resource's neighbours (kit/ui/connections.js graphSvg).
import { test } from "node:test";
import assert from "node:assert/strict";
import { linksFrom, suggest, mistakesByLesson, summary, words } from "../kit/data/links.js";
import { resource } from "../kit/core/resource.js";

const L = (id, title, o = {}) => resource(`lesson:/sci/bio/${id}`, { title, subject: "Biology", ...o });
const membranes = L("u02-03", "Cell membranes and transport", { refs: ["4.1.3.1"] });

test("a link shows from both ends, and says which way a 'made from' link points", () => {
  const links = [
    { a: summary(membranes), b: summary(resource("pack:p1", { title: "Membrane cards" })), by: "source", t: 2 },
    { a: summary(resource("note:n1", { title: "My osmosis notes" })), b: summary(membranes), by: "you", t: 1 },
  ];
  const fromLesson = linksFrom(links, membranes.rid);
  assert.deepEqual(fromLesson.map((l) => [l.other.title, l.dir]), [["Membrane cards", "made-from"], ["My osmosis notes", "both"]]);
  const fromPack = linksFrom(links, "pack:p1");
  assert.equal(fromPack[0].other.title, "Cell membranes and transport");
  assert.equal(fromPack[0].dir, "made-into");
});

test("suggestions: the same specification point first, then words in common; each says why", () => {
  const cands = [
    L("u02-04", "Osmosis", { refs: ["4.1.3.1"] }),
    L("u02-05", "Active transport across membranes"),
    L("u05-01", "Photosynthesis"),
    resource("lesson:/sci/chem/u03-01", { title: "Diffusion and membranes in transport chemistry", subject: "Chemistry" }),
    resource("lesson:/sci/chem/u09-01", { title: "Cell potentials", subject: "Chemistry" }),
    membranes,
  ];
  const s = suggest(membranes, cands);
  assert.equal(s[0].title, "Osmosis");
  assert.match(s[0].why, /Same specification point: 4.1.3.1/);
  assert.equal(s[1].title, "Active transport across membranes");
  assert.match(s[1].why, /In common: .*transport/);
  // another subject needs a real overlap: two words in common, or a shared point
  const chem = s.find((x) => x.subject === "Chemistry");
  assert.equal(chem.title, "Diffusion and membranes in transport chemistry");
  assert.ok(chem.cross); assert.match(chem.why, /Also in Chemistry/);
  assert.ok(!s.some((x) => x.title === "Cell potentials"));            // one shared word across subjects isn't enough
  assert.ok(!s.some((x) => x.title === "Photosynthesis" || x.rid === membranes.rid));
  // what's already linked isn't suggested again
  assert.ok(!suggest(membranes, cands, { exclude: [cands[0].rid] }).some((x) => x.title === "Osmosis"));
  assert.deepEqual(suggest(null, cands), []);
  assert.deepEqual(words("The cell and its membranes"), ["cell", "membranes"]);
});

test("mistakes to revisit are grouped by the lesson that teaches them, newest first, and leave once got right", () => {
  const g = mistakesByLesson([
    { key: "a", lesson: summary(membranes), t: 1 }, { key: "b", lesson: summary(membranes), t: 3 },
    { key: "c", lesson: summary(L("u05-01", "Photosynthesis")), t: 2 }, { key: "d", lesson: summary(membranes), t: 4, resolved: true },
  ]);
  assert.deepEqual(g.map((x) => [x.lesson.title, x.items.map((i) => i.key)]), [["Cell membranes and transport", ["b", "a"]], ["Photosynthesis", ["c"]]]);
});

test("the map of neighbours draws linked ones solid and suggestions dashed, and nothing with no neighbours", async () => {
  const { graphSvg } = await import("../kit/ui/connections.js");
  assert.equal(graphSvg(membranes, [], []), "");
  const svg = graphSvg(membranes, [L("x", "Osmosis")], [L("y", "Diffusion")]);
  assert.match(svg, /role="img" aria-label="Cell membranes and transport: 1 linked, 1 suggested"/);
  assert.equal((svg.match(/class="sug"/g) || []).length, 1);
});

test("without a specification, suggestions still have reasons: the curriculum, key terms, the topic, headings", () => {
  const here = resource("lesson:/sci/phys/u01-03", { title: "SI base and derived units", subject: "Physics", unit: "u01", module: "Units", terms: ["SI unit", "Base unit"], headings: ["The seven base units", "Derived units"] });
  const c = (id, title, o = {}) => resource(`lesson:/sci/phys/${id}`, { title, subject: "Physics", unit: "u01", ...o });
  const s = suggest(here, [
    c("u01-02", "Physical quantities", { rel: "builds-on" }),
    c("u01-04", "Dimensional analysis", { terms: ["Base unit", "Dimension"] }),
    c("u01-05", "Prefixes", { module: "Units" }),
    c("u01-06", "Significant figures", { headings: ["Rounding derived quantities"] }),
    c("u05-01", "Kinematics", { unit: "u05" }),
    resource("lesson:/sci/chem/u01-02", { title: "Amount of substance", subject: "Chemistry", terms: ["SI unit"] }),
    resource("lesson:/sci/chem/u02-01", { title: "Atomic structure", subject: "Chemistry" }),
  ]);
  const by = Object.fromEntries(s.map((x) => [x.title, x.why]));
  assert.equal(s[0].title, "Physical quantities"); assert.equal(by["Physical quantities"], "This lesson builds on it");
  assert.equal(by["Dimensional analysis"], "key term base unit");
  assert.equal(by.Prefixes, "Same topic: Units");
  assert.match(by["Significant figures"], /Covers derived too/);
  assert.equal(by["Amount of substance"], "Also in Chemistry: key term si unit");   // another subject, by a shared key term
  assert.ok(!("Kinematics" in by) && !("Atomic structure" in by));                 // the same course alone isn't a reason
});

test("candidates merge what the page knows with what the indexes know", async () => {
  const { mergeByRid } = await import("../kit/ui/connections.js");
  const [m] = mergeByRid([resource("lesson:/a/x", { title: "X", rel: "builds-on", refs: ["1.1"] }), resource("lesson:/a/x", { title: "X", terms: ["t"], headings: ["h"] })]);
  assert.deepEqual([m.rel, m.refs, m.terms, m.headings], ["builds-on", ["1.1"], ["t"], ["h"]]);
});

test("renamed: every copy of its title is updated; nothing else is touched", async () => {
  const { staleTitles } = await import("../kit/data/links.js");
  const entries = [
    { kind: "link", key: "a>b", value: { a: { rid: "map:m1", title: "Old" }, b: { rid: "lesson:/c/l1", title: "L" }, by: "source" } },
    { kind: "link", key: "c>d", value: { a: { rid: "note:n1", title: "N" }, b: { rid: "lesson:/c/l1", title: "L" }, by: "you" } },
    { kind: "collitem", key: "c1|map:m1", value: { cid: "c1", r: { rid: "map:m1", title: "Old" } } },
    { kind: "note", key: "map:m1", value: { text: "x", r: { rid: "map:m1", title: "New" } } },
  ];
  const s = staleTitles(entries, "map:m1", "New");
  assert.deepEqual(s.map(([k, key]) => `${k}|${key}`), ["link|a>b", "collitem|c1|map:m1"]);     // the note already says New
  assert.equal(s[0][2].a.title, "New"); assert.equal(s[0][2].b.title, "L");
  assert.deepEqual(staleTitles(entries, "map:zz", "Whatever"), []);
});

test("the same menu everywhere: the same actions in the same order, history only where there is one", async () => {
  const { actionsFor } = await import("../kit/ui/resource-actions.js");
  const lesson = actionsFor({ kind: "lesson" }, { canSchedule: true }), card = actionsFor({ kind: "card" }, { canSchedule: true }), q = actionsFor({ kind: "question" }, { canSchedule: true });
  assert.deepEqual(lesson, ["pin", "save", "tag", "link", "schedule", "note", "share", "history"]);
  assert.deepEqual(card, ["pin", "save", "tag", "link", "schedule", "note", "share"]);
  assert.deepEqual(q, card);
  assert.ok(!actionsFor({ kind: "pack" }).includes("schedule"));                  // only with somewhere to schedule into
  assert.equal(new Set(lesson).size, lesson.length);                              // no action twice
});
