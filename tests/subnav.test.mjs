// The sub-site header hides its links below 960px (kit/styles/subsite.css); kit/core/subnav.js, mounted by
// kit/core/site.js, gives phones and tablets a menu with the same links. These checks keep every page with that
// header wired to it. The menu itself is exercised in a real browser by scripts/check-site.cjs (phone pass).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { classify, tracked } from "../scripts/build-site.mjs";

const root = new URL("../", import.meta.url);
const pages = classify(tracked()).publish.filter((f) => f.endsWith(".html"));

test("every page with a sub-site header loads the module that adds its phone and tablet menu", async () => {
  let n = 0;
  for (const f of pages) {
    const html = await readFile(new URL(f, root), "utf8");
    if (!html.includes('class="sub-links"')) continue;
    n++;
    assert.match(html, /kit\/core\/site\.js/, `${f} has a sub-site header but doesn't import kit/core/site.js, so phones get no menu`);
  }
  assert.ok(n > 80, `expected the sub-site pages, found ${n}`);
});

test("site.js mounts the menu, the hidden links have the menu as their replacement, and it's available offline", async () => {
  const site = await readFile(new URL("kit/core/site.js", root), "utf8");
  assert.match(site, /import \{ mountSubNav \} from "\.\/subnav\.js"/);
  assert.match(site, /typeof document !== "undefined"[^\n]*mountSubNav\(document\)/);
  const css = await readFile(new URL("kit/styles/subsite.css", root), "utf8");
  assert.match(css, /@media \(max-width: 960px\) \{\s*\.sub-links \{ display: none; \}/);
  assert.match(css, /\.sub-nav \{ position: relative; z-index: \d+; \}/, "the header must sit above the page so the open menu isn't covered");
  const sw = await readFile(new URL("sw.js", root), "utf8");
  assert.match(sw, /"kit\/core\/subnav\.js"/);
});
