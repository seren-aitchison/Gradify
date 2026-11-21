// Practice on the checked teaching diagrams (kit/diagrams/practice.js): which labels Label it covers, and that most
// of the library can be practised.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { labelWorthCovering, coverableLabels } from "../kit/diagrams/practice.js";

test("Label it covers the labels worth recalling, not axis numbers, lone symbols or lines of explanation", () => {
  for (const t of ["109.5°", "tetrahedral, 109.5°", "trigonal pyramidal", "11 p", "TS ‡", "real image", "1s", "6 V"]) assert.ok(labelWorthCovering(t), t);
  for (const t of ["2", "−400", "10", "H", "Cl", "+", "δ+", "", "x", "arrows drawn to scale for m = 2 kg, P = 15 N, θ = 25°"]) assert.ok(!labelWorthCovering(t), t);
  assert.ok(!labelWorthCovering("Generally no duty to prevent", "decision-tree"), "a decision tree's text is sentences split over lines");
  assert.deepEqual(coverableLabels('<svg><text x="1">H</text><text>109.5°</text><text><tspan>bent</tspan>, 104.5°</text><text>4</text></svg>'), ["109.5°", "bent, 104.5°"]);
});

test("most checked diagrams have something to practise: labels to recall, or the diagram in words to talk through", () => {
  const m = JSON.parse(readFileSync(new URL("../kit/diagrams/manifest.json", import.meta.url)));
  let label = 0, talk = 0, neither = 0;
  const ids = Object.keys(m).filter((k) => m[k].status !== "failed");
  for (const id of ids) {
    const d = m[id], svg = readFileSync(new URL(`../kit/diagrams/svg/${id}.wide.svg`, import.meta.url), "utf8");
    const n = coverableLabels(svg, d.renderer).length;
    if (n >= 2) label++;
    if ((d.description || []).length >= 2) talk++;
    if (n < 2 && (d.description || []).length < 2) neither++;
  }
  assert.ok(label / ids.length > 0.8, `Label it on ${label} of ${ids.length}`);
  assert.ok(talk / ids.length > 0.9, `Talk it through on ${talk} of ${ids.length}`);
  assert.ok(neither / ids.length < 0.03, `${neither} with nothing to practise`);
});
