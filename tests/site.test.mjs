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

test("every site with a page has a headline, three ticks and four checks", async () => {
  const { SITE_PAGES } = await import("../kit/core/site-pages.js");
  for (const [name, p] of Object.entries(SITE_PAGES)) {
    assert.ok(SITES.some((s) => s.n === name), `${name} is a real site`);
    assert.equal(p.h.length, 2); assert.equal(p.ticks.length, 3); assert.equal(p.card.checks.length, 4);
  }
});

test("every built site has homepage content for a known audience, with six topics", async () => {
  const { KINDS, SITES_CONTENT } = await import("../kit/core/site-content.js");
  const { SITE_PAGES } = await import("../kit/core/site-pages.js");
  for (const name of Object.keys(SITE_PAGES)) {
    const c = SITES_CONTENT[name];
    assert.ok(c, `${name} has content`);
    assert.ok(KINDS[c.kind], `${name}'s audience exists`);
    assert.equal(c.topics.length, 6, `${name} has six topics`);
  }
});
