// The Quality Constitution, the curriculum coverage registry and the quality audit (docs/QUALITY-CONSTITUTION.md).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { ARTICLES, asText } from "../kit/quality/constitution.js";
import { check, coverageOf, summary, COURSES } from "../kit/curriculum/coverage.js";
import { scoreLesson, audit, summarise } from "../scripts/quality-audit.mjs";
import { parseNotes } from "../kit/course/notes.js";

test("the constitution: ten articles, and every agent gets the current text", () => {
  assert.equal(ARTICLES.length, 10);
  assert.equal(readFileSync(new URL("../department/constitution.txt", import.meta.url), "utf8").trim(), asText().trim(), "run npm run constitution");
  const roles = JSON.parse(readFileSync(new URL("../department/roles.json", import.meta.url), "utf8"));
  for (const r of ["verification", "learning-science", "accessibility", "personalisation", "visualisation", "outcomes", "safeguarding"]) assert.ok(roles[r]?.system_prompt, r);
  assert.match(readFileSync(new URL("../department/agent.py", import.meta.url), "utf8"), /f"\{CONSTITUTION\}/, "agents inherit it ahead of their role");
  const md = readFileSync(new URL("../docs/QUALITY-CONSTITUTION.md", import.meta.url), "utf8");
  for (const a of ARTICLES) assert.ok(md.includes(`**${a.title}**`), `the document has article ${a.id}`);
});

test("coverage: nothing is claimed as verified without evidence; the default is Gradify's own curriculum", () => {
  assert.deepEqual(check(), []);
  assert.deepEqual(check({ x: { serves: [{ q: "gcse", status: "verified" }] } }).length, 1);
  assert.equal(coverageOf("art").serves[0].status, "gradify");
  assert.equal(coverageOf("law").serves[0].status, "mapped");
  const s = summary(["law", "nursing", "art", "maths"]);
  assert.deepEqual(s, { verified: 0, mapped: 2, aligned: 1, gradify: 1 });
  for (const c of Object.values(COURSES)) for (const x of c.serves) if (x.status === "mapped") assert.ok(readFileSync(new URL(`../${x.evidence}`, import.meta.url), "utf8").includes("Verification status"), "a mapping says it isn't verified yet");
});

const GOOD = `## Osmosis
S: How water moves across membranes, and why cells swell or shrink in different solutions.
LV: Introductory · Foundation
PRE: Cell membranes
O: Define osmosis in terms of water potential
O: Predict what happens to a cell in a hypotonic solution
H: What osmosis is
P: Osmosis is the net movement of water across a partially permeable membrane. Water moves from higher water potential to lower water potential.
K: Water moves down a water potential gradient.
H: Cells in solutions
- In a hypotonic solution an animal cell swells and may burst.
- In a hypertonic solution it shrinks.
X: Predict what happens to a red blood cell placed in pure water.
> Pure water has a higher water potential than the cytoplasm.
> Water enters by osmosis, so the cell swells and bursts.
!: Saying "water moves to where there is less water" mixes up concentration and water potential.
T: Osmosis | net movement of water across a partially permeable membrane down a water potential gradient
T: Water potential | the tendency of water to move, measured in kPa
Q: What is osmosis? | Net movement of water across a partially permeable membrane down a water potential gradient
Q: What happens to an animal cell in a hypotonic solution? | It swells and may burst
Q: Which way does water move by osmosis? | From higher to lower water potential
Q: What unit is water potential measured in? | kPa
M1: What is osmosis? | Movement of water across a membrane | Movement of salt across a membrane | Active transport of ions by pumps | Diffusion of gases through the lungs | It's the movement of water across a partially permeable membrane.
M2: A plant cell is placed in a hypertonic solution. What happens? | It loses water and becomes flaccid | It gains water and becomes turgid | It bursts as water rushes in | It stays exactly the same size | Water leaves by osmosis, down the water potential gradient.
M3: Why do red blood cells burst in pure water but plant cells don't? | The cell wall resists the pressure | Plant cells have no cell membrane | Pure water has no water potential | Red cells have no cytoplasm inside | The cell wall stops the plant cell bursting.
SUM: Osmosis moves water down a water potential gradient.
SRC: Campbell Biology, 12th edition | secondary | 2020
SRC: OpenStax Biology 2e | secondary | 2023-06
EV: established | Osmosis is driven by water potential differences.`;
const POOR = `## Osmosis
P: Osmosis is a thing where water goes places in cells and it depends on lots of things and that is why it matters in biology and also in medicine and many other areas of study that people care about a great deal of the time.`;

test("scores: a well-built lesson scores high, a thin one low with specific fixes; accuracy is capped until reviewed", () => {
  const [g] = parseNotes(GOOD), [p] = parseNotes(POOR);
  const a = scoreLesson(g, { earlier: new Set(["cell membranes"]) }), b = scoreLesson(p, {});
  assert.ok(a.overall >= 85, `good lesson ${a.overall}`); assert.ok(b.overall <= 40, `poor lesson ${b.overall}`);
  assert.equal(a.scores.accuracy, 60, "not reviewed: capped at 60"); assert.ok(a.unverified);
  assert.ok(scoreLesson(g, { reviewed: true, earlier: new Set(["cell membranes"]) }).scores.accuracy > 60);
  for (const f of ["Add a worked example (X:)", "State at least two learning objectives (O:)", "Add check questions: at least three"]) assert.ok(b.fixes.includes(f), f);
  assert.ok(!a.fixes.length, a.fixes.join("; "));
});

test("the audit covers every written lesson and no course has dropped below its baseline (article 7)", async () => {
  const sum = summarise(await audit());
  assert.ok(sum.lessons > 9000);
  const base = JSON.parse(readFileSync(new URL("../docs/quality/baseline.json", import.meta.url), "utf8"));
  for (const c of sum.courses) if (base.courses[c.slug] != null) assert.ok(c.overall >= base.courses[c.slug] - 1, `${c.name}: ${base.courses[c.slug]} → ${c.overall}`);
});
