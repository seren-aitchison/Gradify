// The site-wide Liquid Glass renderer (kit/ui/liquid-gl.js): it only runs where it should, it never paints the dark
// islands, and every page gets it from kit/core/theme-boot.js.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { allowed, softwareRenderer, startTier, nextTier, median, SLOW_MS, ISLANDS, GLASS } from "../kit/ui/liquid-gl.js";
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

test("three tiers: full GPU glass, lite GPU glass, CSS glass", () => {
  const gpu = { caveat: false, renderer: "ANGLE (NVIDIA, NVIDIA GeForce RTX 3060)", pref: null, coarse: false, memory: 8, cores: 8, highp: true, uniforms: 1024 };
  assert.equal(startTier(gpu), "webgl");
  // the browser says there's no real GPU (failIfMajorPerformanceCaveat), whatever the renderer is called
  assert.equal(startTier({ ...gpu, caveat: true }), "css");
  assert.equal(startTier({ ...gpu, renderer: "Google SwiftShader" }), "css");
  // phones with little memory or few cores, no highp, or too few uniforms for 32 surfaces: lite
  assert.equal(startTier({ ...gpu, coarse: true, memory: 3 }), "webgl-lite");
  assert.equal(startTier({ ...gpu, coarse: true, memory: 8, cores: 8 }), "webgl");
  assert.equal(startTier({ ...gpu, highp: false }), "webgl-lite");
  assert.equal(startTier({ ...gpu, uniforms: 64 }), "webgl-lite");
  assert.equal(startTier({ ...gpu, uniforms: 16 }), "css");
  assert.equal(startTier({ ...gpu, pref: "lite" }), "webgl-lite");
  // force: even on software rendering (for testing)
  assert.equal(startTier({ ...gpu, caveat: true, renderer: "llvmpipe", pref: "force" }), "webgl");
});

test("measured speed steps the tier down, never up, and never stalls on a slow GPU", () => {
  assert.equal(nextTier("webgl", 16.7), "webgl");
  assert.equal(nextTier("webgl", SLOW_MS + 5), "webgl-lite");
  assert.equal(nextTier("webgl", 220), "css");            // hopeless for the full tier: straight to CSS
  assert.equal(nextTier("webgl-lite", 16.7), "webgl-lite");
  assert.equal(nextTier("webgl-lite", SLOW_MS + 5), "css");
  assert.equal(nextTier("webgl-lite", Infinity), "css");  // no frames by the deadline
  assert.equal(nextTier("webgl", 220, "force"), "webgl");
  assert.equal(median([40, 16, 17, 300, 16]), 17);        // one long frame (a page task, a compile) doesn't decide it
  assert.equal(median([16, 18]), 17);
});

test("it handles a lost GPU context, respects reduced motion, and never blocks on the GPU", async () => {
  const src = await readFile(new URL("../kit/ui/liquid-gl.js", import.meta.url), "utf8");
  assert.match(src, /webglcontextlost/); assert.match(src, /webglcontextrestored/);
  assert.match(src, /prefers-reduced-motion/);
  assert.match(src, /failIfMajorPerformanceCaveat: true/);
  assert.match(src, /KHR_parallel_shader_compile/);
  assert.doesNotMatch(src, /gl\.finish\(/);
});

test("floating bars draw last, so cards scrolling under the header never cut its edge; the edge is pastel", async () => {
  const src = await readFile(new URL("../kit/ui/liquid-gl.js", import.meta.url), "utf8");
  assert.match(src, /order = \[\.\.\.els\.filter\(\(e\) => !e\.hasAttribute\("data-lg-cap"\)\), \.\.\.floating\]/);
  const css = await readFile(new URL("../kit/styles/base.css", import.meta.url), "utf8");
  const stops = css.match(/--bar-rainbow: linear-gradient\(90deg,([^;]+)\);/)[1].match(/#[0-9a-f]{6}/gi);
  // pastel: every stop light (no channel below 0x90)
  for (const h of stops) assert.ok([1, 3, 5].every((i) => parseInt(h.slice(i, i + 2), 16) >= 0x90), h);
});

test("stop() cancels pending frames and timers (the cleanup is code, not swallowed by a comment)", async () => {
  const src = await readFile(new URL("../kit/ui/liquid-gl.js", import.meta.url), "utf8");
  const body = src.slice(src.indexOf("function stop()"), src.indexOf("\n  }", src.indexOf("function stop()")));
  const code = body.split("\n").map((l) => l.replace(/\s\/\/.*$/, "")).join("\n");   // strip trailing comments
  for (const k of ["clearTimeout(mt)", "clearTimeout(pollT)", "cancelAnimationFrame(raf)", "probing = false", "mo.disconnect()", "canvas.remove()"]) assert.ok(code.includes(k), k);
});
