// The site-wide Liquid Glass renderer (kit/ui/liquid-gl.js): it only runs where it should, it never paints the dark
// islands, and every page gets it from kit/core/theme-boot.js.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { allowed, softwareRenderer, ISLANDS, GLASS } from "../kit/ui/liquid-gl.js";
import { ISLANDS as THEME_ISLANDS } from "../scripts/theme-tokens.mjs";

test("runs only with WebGL and default transparency, contrast and data use, unless turned off", () => {
  const ok = { webgl: {}, reducedTransparency: false, highContrast: false, saveData: false, pref: null };
  assert.equal(allowed(ok), true);
  assert.equal(allowed({ ...ok, pref: "force" }), true);
  for (const k of ["reducedTransparency", "highContrast", "saveData"]) assert.equal(allowed({ ...ok, [k]: true }), false, k);
  assert.equal(allowed({ ...ok, webgl: null }), false);
  assert.equal(allowed({ ...ok, pref: "off" }), false);
});

test("the dark islands stay dark: the same list as the theme tokens", () => {
  const norm = (x) => x.replace(/^\[class\*="([^"]+)"\]$/, ".$1");
  assert.deepEqual(ISLANDS.map(norm).sort(), [...THEME_ISLANDS].sort());
});

test("headers, footers, panels and course surfaces are glass", () => {
  for (const s of [".glass", ".panel", ".hub-foot", ".sub-foot", ".cx-lbar", ".cx-dock", ".co-card"]) assert.ok(GLASS.split(", ").includes(s), s);
});

test("every page loads it, through theme-boot, after the page has loaded", async () => {
  const boot = await readFile(new URL("../kit/core/theme-boot.js", import.meta.url), "utf8");
  assert.match(boot, /ui\/liquid-gl\.js/);
  assert.match(boot, /addEventListener\("load"/);
});

test("no GPU, no WebGL glass: software renderers keep the CSS glass", () => {
  for (const n of ["Google SwiftShader", "ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)))", "llvmpipe (LLVM 15.0.7, 256 bits)", "Microsoft Basic Render Driver"]) assert.ok(softwareRenderer(n), n);
  for (const n of ["Apple M2", "ANGLE (NVIDIA, NVIDIA GeForce RTX 3060)", "Adreno (TM) 740", "Mali-G78"]) assert.ok(!softwareRenderer(n), n);
});
