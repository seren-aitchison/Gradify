// Five mind maps per lesson (kit/maps/build.js), from the lessons' own notes. Checked on real Gradify lessons: every map
// valid, every lesson fully covered, and nothing in a map that isn't in its lesson. Rendering, interaction and the 4K
// export are checked in a real browser by scripts/check-mindmaps.cjs.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { parseNotes } from "../kit/course/notes.js";
import { buildMaps, mapsFor, validateMap, split, plain, MAPS, ENGINE } from "../kit/maps/build.js";

const lessonsOf = async (subject, unit) => {
  const text = (await import(`../kit/courses/${subject}/notes/${unit}.js`)).default;
  return { text, lessons: parseNotes(text) };
};
const walk = (n, f) => { f(n); n.children.forEach((c) => walk(c, f)); };
const all = (m) => { const out = []; walk(m.root, (n) => out.push(n)); return out; };
// for "is this text in the lesson": any script, no markdown, no punctuation
const flat = (s) => plain(s).toLowerCase().replace(/[*_`]/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();

test("five distinct maps for real lessons in different subjects, each valid and together covering the whole lesson", async () => {
  for (const [subject, unit, i] of [["law", "u01", 0], ["chemistry", "u01", 2], ["medicine", "u03", 1], ["maths", "u02", 0], ["history", "u03", 0], ["computing", "u01", 1], ["nursing", "u04", 0]]) {
    const { text, lessons } = await lessonsOf(subject, unit);
    const r = buildMaps(lessons[i], { id: `${subject}:${unit}-${i}`, notes: text });
    assert.deepEqual(r.maps.map((m) => m.key), MAPS.map((m) => m.key));
    for (const m of r.maps) assert.deepEqual(validateMap(m), [], `${subject} ${m.key}`);
    assert.equal(r.coverage.share, 1, `${subject}: every part of the lesson appears in at least one map (missing ${r.coverage.missing})`);
    // five different views, not five copies: no two maps share most of their main branches
    const tops = r.maps.map((m) => new Set(m.root.children.map((c) => flat(c.topic))));
    for (let a = 0; a < 5; a++) for (let b = a + 1; b < 5; b++) {
      const shared = [...tops[a]].filter((t) => tops[b].has(t)).length;
      assert.ok(shared <= Math.max(1, Math.min(tops[a].size, tops[b].size) / 2), `${subject}: maps ${a + 1} and ${b + 1} are too alike`);
    }
    assert.equal(r.maps[0].root.topic, plain(lessons[i].title));
  }
});

test("across the course library: no invalid map, full coverage, and every node's words come from its lesson", async () => {
  let lessons = 0, nodes = 0;
  const subjects = await readdir(new URL("../kit/courses/", import.meta.url));
  for (const subject of subjects) {
    let files = [];
    try { files = (await readdir(new URL(`../kit/courses/${subject}/notes/`, import.meta.url))).filter((f) => f.endsWith(".js")); } catch { continue; }
    // every third unit of every subject: a fair sample of each, quick enough for every test run
    for (const f of files.filter((_, k) => k % 3 === 0)) {
      const text = (await import(`../kit/courses/${subject}/notes/${f}`)).default;
      if (typeof text !== "string") continue;
      const hay = flat(text);
      parseNotes(text).forEach((L, i) => {
        lessons++;
        const r = buildMaps(L, { id: `${subject}:${f}:${i}`, notes: text });
        assert.equal(r.coverage.share, 1, `${subject}/${f}#${i} coverage`);
        for (const m of r.maps) {
          assert.deepEqual(validateMap(m), [], `${subject}/${f}#${i} ${m.key}`);
          // a link joins two branches only where one node's own words name the other
          const byId = new Map(all(m).map((n) => [n.id, n]));
          assert.ok(m.links.length <= 4);
          for (const l of m.links) assert.ok(flat(`${byId.get(l.from).topic} ${byId.get(l.from).detail || ""}`).includes(flat(byId.get(l.to).topic)), `${subject}/${f}#${i} ${m.key}: link without its words`);
          // balanced: no wall of children (the centre's main branches are the lesson's own sections)
          for (const n of all(m)) if (n.kind !== "root") assert.ok(n.children.length <= 9, `${subject}/${f}#${i} ${m.key}: "${n.topic}" has ${n.children.length} children`);
          for (const n of all(m)) {
            nodes++;
            // structure, not claims: the centre, group headings, "not in this lesson", and a case or drug card's field labels
            if (["root", "group", "limit", "field", "gap"].includes(n.kind)) continue;
            // a title is the lesson's own words: whole, or the start of a longer line ("…"), or two terms paired ("A vs B")
            const parts = n.topic.replace(/^\d+\.\s*/, "").replace(/…$/, "").split(/ vs /);
            for (const p of parts) assert.ok(hay.includes(flat(p)), `${subject}/${f}#${i} ${m.key}: "${n.topic}" isn't in the lesson`);
          }
        }
      });
    }
  }
  assert.ok(lessons > 2000, `checked ${lessons} lessons`);
  assert.ok(nodes > 100_000);
});

test("a lesson without processes or examples says so, rather than inventing them", () => {
  const [L] = parseNotes(`## Sources of information
S: Where nurses look things up about medicines, and why the right source matters for safe practice in every setting.
T: BNF | The British National Formulary: doses, cautions and interactions
H: Where to look
- The **BNF**: indications, doses, cautions.
- The **SPC**: the manufacturer's full information.`);
  const r = buildMaps(L, { id: "t" });
  const process = r.maps.find((m) => m.key === "process"), apply = r.maps.find((m) => m.key === "apply");
  assert.equal(process.limited, true); assert.match(process.root.children[0].topic, /doesn't describe step-by-step processes/);
  assert.equal(apply.limited, true);
  assert.equal(r.maps.find((m) => m.key === "topic").limited, false);
});

test("worked examples become steps, objectives gather what supports them, and confusable terms are paired", () => {
  const [L] = parseNotes(`## Enzymes
S: How enzymes speed up reactions, and how inhibitors slow them, in enough detail to predict an experiment's result.
O: Explain how competitive inhibition can be overcome
T: Competitive inhibitor | Binds the active site and competes with the substrate
T: Non-competitive inhibitor | Binds elsewhere on the enzyme and changes its shape
H: Inhibition
- A **competitive inhibitor** competes for the active site, so more substrate overcomes it.
K: Raising substrate concentration overcomes competitive inhibition.
!: Don't say enzymes are used up: they are not consumed.
X: An enzyme assay with a competitive inhibitor added.
> Measure the rate with the inhibitor present.
> Add more substrate and measure again.`);
  const r = buildMaps(L, { id: "e" });
  const proc = r.maps.find((m) => m.key === "process");
  const ex = proc.root.children.find((c) => c.kind === "example");
  assert.deepEqual(ex.children.map((c) => c.topic), ["1. Measure the rate with the inhibitor present.", "2. Add more substrate and measure again."]);
  const exam = r.maps.find((m) => m.key === "exam");
  const obj = exam.root.children.find((c) => c.topic === "Be able to").children[0];
  assert.ok(obj.children.some((c) => /substrate/.test(c.topic)), "the objective is linked to the point that answers it");
  assert.ok(exam.root.children.find((c) => c.topic === "Easily confused").children.some((c) => /Competitive inhibitor vs Non-competitive inhibitor/.test(c.topic)));
  assert.ok(exam.root.children.find((c) => c.topic === "Common mistakes"));
});

test("titles stay short and keep the full text as detail; a bold lead becomes the title", () => {
  assert.deepEqual(split("**Legal rules** are made by Parliament."), { topic: "Legal rules", detail: "Legal rules are made by Parliament." });
  assert.deepEqual(split("Short point"), { topic: "Short point", detail: null });
  const long = "Stroke volume is the volume of blood ejected by each ventricle in one beat. It rises with preload and contractility.";
  assert.equal(split(long).topic, "Stroke volume is the volume of blood ejected by each ventricle in one beat");
  assert.equal(split(long).detail, long);
});

test("the same notes give the same maps; changed notes give a new version; a lesson is built once per page", async () => {
  const { text, lessons } = await lessonsOf("law", "u01");
  const a = buildMaps(lessons[0], { id: "law:1", notes: text }), b = buildMaps(lessons[0], { id: "law:1", notes: text });
  assert.deepEqual(a, b);
  assert.ok(a.version.startsWith(`${ENGINE}.`));
  assert.notEqual(buildMaps(lessons[0], { id: "law:1", notes: `${text}\n` }).version, a.version);
  assert.equal(mapsFor(lessons[0], { id: "law:1", notes: text }), mapsFor(lessons[0], { id: "law:1", notes: text }), "cached, not rebuilt");
});

test("the validator catches broken maps", () => {
  const n = (id, topic, children = []) => ({ id, topic, children, src: [], kind: "point" });
  assert.deepEqual(validateMap({ root: null }), ["no central topic"]);
  assert.match(validateMap({ root: n("r", "Root", [n("a", "A"), n("a", "B")]) })[0], /duplicate id/);
  assert.match(validateMap({ root: n("r", "Root", [n("a", "Same"), n("b", "same")]) })[0], /duplicate branches/);
  assert.match(validateMap({ root: n("r", "Root", [n("a", " ")]) })[0], /no title/);
  let deep = n("d6", "6"); for (let k = 5; k >= 1; k--) deep = n(`d${k}`, String(k), [deep]);
  assert.match(validateMap({ root: n("r", "Root", [deep]) }).join(), /too deep/);
});

test("an objective the notes don't answer is flagged as a gap, and listed for improving the lesson", () => {
  const [L] = parseNotes(`## Waves
S: What waves are and how they carry energy without carrying matter, with the terms used to describe them.
O: Describe how a wave carries energy
O: Calculate the speed of a tsunami from its depth
H: Waves
- A **wave** carries energy from place to place without moving matter along with it.`);
  const r = buildMaps(L, { id: "w" });
  const exam = r.maps.find((m) => m.key === "exam");
  const objs = exam.root.children.find((c) => c.topic === "Be able to").children;
  assert.equal(objs[0].children[0].kind, "point", "the first objective is answered by the notes");
  assert.equal(objs[1].children[0].kind, "gap");
  assert.deepEqual(r.coverage.gaps, ["Calculate the speed of a tsunami from its depth"]);
  assert.equal(exam.gaps, 1);
});

test("main branches get an icon, long lists are chunked into parts, and links are grounded and few", () => {
  const items = Array.from({ length: 15 }, (_, k) => `- Point number ${k + 1} about osmosis in plant cells.`).join("\n");
  const [L] = parseNotes(`## Osmosis
S: Osmosis is the movement of water across a partially permeable membrane, and why it matters for cells and plants.
T: Osmosis | The net movement of water across a partially permeable membrane
H: Osmosis in plants
${items}
X: A potato in salty water loses mass because of osmosis.
> Water leaves the potato cells.`);
  const r = buildMaps(L, { id: "o" });
  const topic = r.maps[0];
  const section = topic.root.children.find((c) => c.topic === "Osmosis in plants");
  assert.ok(section.children.every((c) => c.kind === "group" && /^Part \d+ \(\d+–\d+\)$/.test(c.topic)), "15 points are split into parts");
  assert.equal(section.children.flatMap((c) => c.children).length, 16);
  assert.equal(topic.root.children.find((c) => c.topic === "Key terms").icon, "📘");
  const byId = new Map(all(topic).map((n) => [n.id, n]));
  assert.ok(topic.links.length >= 1 && topic.links.length <= 4);
  assert.ok(topic.links.every((l) => byId.get(l.to).topic === "Osmosis" && /osmosis/i.test(byId.get(l.from).topic + (byId.get(l.from).detail || ""))));
});
