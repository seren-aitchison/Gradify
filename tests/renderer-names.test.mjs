import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { RENDERERS, register } from "../kit/diagrams/renderers.js";

test("every subject renderer module loads together without a name collision", async () => {
  const dir = new URL("../kit/diagrams/", import.meta.url);
  for (const f of readdirSync(dir).filter((f) => /^[a-z]+-renderers(-\d+)?\.js$/.test(f)).sort()) await import(new URL(f, dir).href);
  assert.ok(Object.keys(RENDERERS).length >= 6);
});

test("registering a name that is taken is an error", () => {
  assert.throws(() => register({ graph: { draw() {}, checks() {}, widths: [1, 1] } }), /already registered/);
});
