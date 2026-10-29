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
