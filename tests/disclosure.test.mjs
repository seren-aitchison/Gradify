// Step 2, less at once without losing anything: the lesson format's "Show more" (DEEP:) and worked examples
// (kit/course/notes.js), a specification row that opens (kit/course/spec-view.js) and what the AI tutor can see
// (kit/course/tutor-panel.js contextHtml).
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseNotes, lessonHtml, lessonText } from "../kit/course/notes.js";
import { contextHtml } from "../kit/course/tutor-panel.js";

const L = parseNotes(`## Pendulums
H: The period
P: A pendulum swings.
X: Find T for l = 1 m.
> T = 2π√(l/g)
> T = 2.0 s
DEEP: Derivation | Start from the restoring force.
> For small angles, sin θ ≈ θ.
P: After it.
DEEP: No label here`)[0];

test("DEEP: lines fold under Show more, with their label and any following paragraphs", () => {
  const deep = L.blocks.filter((b) => b.t === "deep");
  assert.equal(deep.length, 2);
  assert.deepEqual(deep[0], { t: "deep", label: "Derivation", x: "Start from the restoring force.", more: ["For small angles, sin θ ≈ θ."] });
  assert.equal(deep[1].label, "More on this");
  const html = lessonHtml(L);
  assert.match(html, /<details class="co-deep gx-more"><summary><span class="gx-more-l">Show more<\/span><b>Derivation<\/b><\/summary>/);
  assert.match(html, /<p>For small angles, sin θ ≈ θ.<\/p>/);
  // the paragraph after it isn't swallowed, and the plain text keeps it
  assert.match(html, /<p>After it.<\/p>/);
  assert.match(lessonText(L), /Derivation: Start from the restoring force./);
});

test("a worked example is marked for step-by-step reveal and still has every step in the HTML", () => {
  const html = lessonHtml(L);
  assert.match(html, /<div class="co-ex lx-call lx-ex" data-steps>/);
  assert.match(html, /<li>T = 2π√\(l\/g\)<\/li><li>T = 2.0 s<\/li>/);       // readable without scripts, and by search engines
  assert.equal(L.blocks.find((b) => b.t === "ex").steps.length, 2);
});

test("a requirement's row opens to its wording, the lessons that teach it and a way to practise", async () => {
  const { topicPageHtml } = await import("../kit/course/spec-view.js");
  const p = { id: "4.1.1.1", title: "Eukaryotes", text: "Describe how cells differ.", topic: { id: "4.1" }, group: { id: "4.1.1", title: "Cell structure" },
    lessons: ["l1"], partial: ["l2"], practise: ["l1"], coverage: { gradify: "full", done: 0, total: 2 }, estimate: null, confidence: { level: "none" }, band: null, trend: null, flags: [] };
  const t = { id: "4.1", title: "Cell biology", points: [p], assessed: 0, total: 1, status: "Not yet assessed", estimate: null };
  const m = { topics: [t], points: [p], spec: { title: "AQA", wording: "summary", flags: {} } };
  const html = topicPageHtml(m, t, { practiseHref: () => "#/target/x", titleOf: (id) => ({ l1: "Prokaryotic cells", l2: "Notation" })[id], statusOf: () => "Not started" });
  assert.match(html, /data-row="4.1.1.1" aria-expanded="false" aria-controls="sm-more-4_1_1_1"/);
  assert.match(html, /id="sm-more-4_1_1_1" hidden/);
  assert.match(html, /Prokaryotic cells<\/a><small>Not started/);
  assert.match(html, /Notation<\/a><small>part of it · Not started/);
  assert.match(html, /Practise this: 5 minutes/);
});

test("the tutor says what it uses: the lesson, what you type, a lab if used, other lessons' titles; focus can be switched off", () => {
  const html = contextHtml({ lesson: { id: "a", title: "Pendulums" }, focus: "explain", candidates: () => [{ id: "b" }, { id: "c" }], lab: () => null });
  assert.match(html, /<details class="co-tctx"><summary>What Gradify AI is using<\/summary>/);
  assert.match(html, /This lesson, <b>Pendulums<\/b>, and its notes/);
  assert.match(html, /titles of 2 other lessons/);
  assert.match(html, /interactive lab/);
  assert.match(html, /data-ctx-focus checked/);
  assert.match(html, /explaining why/);
  assert.match(html, /count your AI allowance/);
  const bare = contextHtml({ lesson: { title: "X" }, focus: null, candidates: () => [] });
  assert.doesNotMatch(bare, /data-ctx-focus|other lessons|interactive lab/);
});
