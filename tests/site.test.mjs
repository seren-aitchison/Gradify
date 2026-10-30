import { test } from "node:test";
import assert from "node:assert/strict";
import { SITES, slugOf, pathOf, currentSite } from "../kit/core/site.js";

test("each sub-site has its own folder on getgradify.com", () => {
  assert.equal(pathOf("MedGradify"), "/medgradify/");
  assert.equal(slugOf("TechGradify · ForgeLab"), "techgradify");
  const slugs = SITES.map(slugOf);
  assert.equal(new Set(slugs).size, slugs.length, "no two sites share a folder");
  assert.ok(slugs.every((s) => /^[a-z0-9]+$/.test(s)));
});

test("outside a browser, a page belongs to no single site unless the config says so", () => {
  assert.equal(currentSite(), null);
});

test("a site's first word is drawn in its accent colour", async () => {
  const { nameHtml, accentOf } = await import("../kit/core/site.js");
  const med = SITES.find((s) => s.n === "MedGradify");
  assert.match(nameHtml(med), /<span class="site-accent" style="color:[^"]+">Med<\/span>Gradify<\/span>$/);
  assert.match(nameHtml(SITES.find((s) => s.n === "TechGradify · ForgeLab")), />Tech<\/span>Gradify · ForgeLab/);
  // bright colours are used as they are; dark ones are lifted so they read on black
  assert.equal(accentOf({ c: "a0ff74" }), "#a0ff74");
  assert.notEqual(accentOf({ c: "2e5e18" }), "#2e5e18");
});
