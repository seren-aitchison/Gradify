// Loading smoothly: nothing jumps while the page loads, and nothing heavy runs for things that aren't on screen.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const read = (p) => readFile(new URL("../" + p, import.meta.url), "utf8");

test("the top bars have a fixed height, so buttons added after first paint don't push the page down", async () => {
  const base = await read("kit/styles/base.css"), sub = await read("kit/styles/subsite.css");
  assert.match(base, /\.bar \{ box-sizing: border-box; height: 58px; \}/);
  assert.match(sub, /\.sub-nav \{ box-sizing: border-box; height: 62px; \}/);
  // the course-site links move into the menu before they'd wrap
  assert.match(sub, /@media \(max-width: 1199px\) \{ \.sub-links \{ display: none; \}/);
});

test("the 3D island (three.js) and the Earth globe wait until they're on screen", async () => {
  const tree = await read("kit/lifeos/tree.js"), earth = await read("kit/lifeos/earth.js");
  assert.match(tree, /whenSeen\(el\)\.then\(/);
  assert.match(earth, /new IntersectionObserver[\s\S]{0,200}make\(\)/);
  assert.doesNotMatch(earth, /globe\.(zoomBy|reset)\(/);   // the buttons work before the globe exists
});

test("the homepage only loads the LifeOS tour's scripts when the tour is shown", async () => {
  const html = await read("index.html");
  assert.doesNotMatch(html, /<script type="module" src="kit\/lifeos\/(lifeos|os)\.js">/);
  assert.match(html, /if \(os && !os\.hidden\) go\(\)/);
});

test("the glass copies into the floating bars only when they'd look different, not on every scroll frame", async () => {
  const gl = await read("kit/ui/liquid-gl.js");
  assert.match(gl, /if \(c\.__key === key && c\.__lit === lit\) continue;/);
  assert.match(gl, /capT = setTimeout\(\(\) => \{ capT = 0; kick\(\); \}/);   // a throttled highlight still lands
  assert.match(gl, /const key = `[^`]*\$\{shape\}`/);                           // the bar's shape is part of the key
});

test("a course page holds the course's space while its scripts load, so the footer doesn't jump", async () => {
  const base = await read("kit/styles/base.css");
  assert.match(base, /#course:empty \{ min-height: 100vh;/);
});

test("opening a view doesn't make the browser lay out the page before it's ready", async () => {
  const course = await read("kit/course/course.js");
  assert.doesNotMatch(course, /void main\.offsetWidth/);                    // the entrance is its own animation
  assert.match(course, /main\.animate\?\.\(\[\{ opacity: 0\.4/);
  assert.doesNotMatch(course, /const treeShown = \(\) => [^\n]*getClientRects/);   // the outline's visibility from its classes
  assert.match(course, /art\.addEventListener\("co-rail", \(\) => \{ pctShown = -1; soon\(\);/);   // the reading place, once a frame
});

test("nothing on a course page repaints on every frame for as long as it's open", async () => {
  const css = await read("kit/styles/course.css");
  // the assistant's orb turns its own layer (a transform), not its gradient's angle
  assert.match(css, /@keyframes gai-turn \{ to \{ transform: rotate\(360deg\); \} \}/);
  assert.doesNotMatch(css, /--gai-turn/);
  // the lesson's gleaming rim sweeps once, and not on a phone
  assert.match(css, /animation: lg-gleam 14s linear 1s;/);
  assert.doesNotMatch(css, /lg-gleam[^;]*infinite/);
});
