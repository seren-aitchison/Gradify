// Light-mode labs (kit/labs/theme.js): every lab colour is adapted for a white stage.
import { test } from "node:test";
import assert from "node:assert/strict";
import { adaptColour, parse, contrastOnWhite, adapt } from "../kit/labs/theme.js";

const rgb = (c) => parse(c).slice(0, 3);

test("parse reads hex, rgb, rgba and a few names; leaves anything else", () => {
  assert.deepEqual(parse("#fff"), [255, 255, 255, 1]);
  assert.deepEqual(parse("#10b98180"), [16, 185, 129, 128 / 255]);
  assert.deepEqual(parse("rgba(255,255,255,.3)"), [255, 255, 255, 0.3]);
  assert.deepEqual(parse("rgb(1 2 3 / 50%)"), [1, 2, 3, 0.5]);
  assert.equal(parse("hsl(10, 50%, 50%)"), null);
  assert.equal(adaptColour("hsl(10, 50%, 50%)"), "hsl(10, 50%, 50%)");
  assert.equal(adaptColour("transparent"), "transparent");
});

test("the dark stage becomes paper, white lines become ink, alpha is kept", () => {
  assert.equal(adaptColour("#0b0c0e"), "rgb(255, 255, 255)");
  assert.equal(adaptColour("rgba(255,255,255,.07)"), "rgba(22, 22, 40, 0.07)");
  assert.equal(adaptColour("#ffffff"), "rgb(22, 22, 40)");
  assert.ok(contrastOnWhite(rgb(adaptColour("#9aa0a6"))) > 4.5, "muted grey text stays readable");
});

test("saturated colours keep their hue but read on white (at least 3:1)", () => {
  for (const c of ["#10b981", "#14d4c4", "#84cc16", "#f59e0b", "#fbbf24", "#ffd43b", "#5aa0ff", "#a78bfa", "#f472b6", "#e599f7"]) {
    const out = rgb(adaptColour(c));
    assert.ok(contrastOnWhite(out) >= 3, `${c} → ${adaptColour(c)}`);
    // same dominant channel: the hue family survives
    const [r, g, b] = rgb(c), [r2, g2, b2] = out;
    assert.equal([r, g, b].indexOf(Math.max(r, g, b)), [r2, g2, b2].indexOf(Math.max(r2, g2, b2)), c);
  }
  assert.equal(adaptColour("#4641ff"), "rgb(70, 65, 255)", "already readable colours are untouched");
});

test("very dark saturated fills become pale tints, so ink labels on them stay readable", () => {
  const out = rgb(adaptColour("#1a1f4a"));
  assert.ok(contrastOnWhite(out) < 1.3, "pale");
  assert.ok(out[2] > out[0], "still bluish");
});

test("in dark mode (and in Node, with no document) adapt returns its input", () => {
  assert.equal(adapt("#ffffff"), "#ffffff");
  assert.equal(adapt("rgba(255,255,255,.3)"), "rgba(255,255,255,.3)");
});
