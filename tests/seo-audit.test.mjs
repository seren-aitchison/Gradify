// The SEO audit (scripts/seo-audit.mjs) over every published page: no errors, the sitemap and the indexable pages are
// the same set, private app screens are never indexed, and the checked-in report is current.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { audit, category, csv } from "../scripts/seo-audit.mjs";
import { CLUSTERS } from "../scripts/seo/keywords.mjs";

const r = await audit();

test("no SEO errors on any published page", () => {
  assert.deepEqual(r.errors, [], `run node scripts/seo-audit.mjs for the report`);
});

test("the sitemap lists exactly the indexable pages", () => {
  const indexable = new Set(r.pages.filter((p) => p.indexable).map((p) => p.url));
  const listed = new Set(r.pages.filter((p) => p.inSitemap).map((p) => p.url));
  assert.deepEqual([...indexable].filter((u) => !listed.has(u)), [], "indexable but missing from the sitemap");
  assert.deepEqual([...listed].filter((u) => !indexable.has(u)), [], "in the sitemap but not indexable");
});

test("private app screens, embeds and redirects are never indexable", () => {
  for (const p of r.pages) {
    if (/(^|\/)(lifeos|map|3d)\.html$|\/app\.html$|embed\.html$|^status\.html$/.test(p.path)) assert.equal(p.indexable, false, `${p.path} must not be indexable`);
    if (p.category === "redirect") assert.equal(p.inSitemap, false, `${p.path} redirects, so it isn't in the sitemap`);
  }
});

test("every category of public page is covered", () => {
  for (const c of ["home", "site home", "course", "feature", "tool", "guide", "topic", "key term", "study plan", "practice questions"]) assert.ok(r.summary.indexableByCategory[c] > 0, `indexable ${c} pages`);
  assert.equal(category("features/notes-studio/index.html"), "feature");
  assert.equal(category("scigradify/biology/index.html"), "course");
  assert.equal(category("lawgradify/index.html"), "site home");
});

test("the inventory in docs/seo/ is current (run node scripts/seo-audit.mjs)", () => {
  assert.equal(readFileSync(new URL("../docs/seo/inventory.csv", import.meta.url), "utf8"), csv(r.pages));
});

test("search-intent map: one destination per cluster, each a real indexable page, none shared", () => {
  const byUrl = new Map(r.pages.map((p) => [p.url, p])), seen = new Map();
  for (const c of CLUSTERS) {
    const page = byUrl.get(`https://getgradify.com/${c.dest}`);
    assert.ok(page?.indexable, `${c.cluster}: /${c.dest} is an indexable page`);
    assert.ok(!seen.has(c.dest), `${c.cluster} and ${seen.get(c.dest)} both target /${c.dest}: give each its own page`); seen.set(c.dest, c.cluster);
    for (const k of ["demand", "competition"]) assert.ok(["high", "medium", "low"].includes(c[k]), `${c.cluster}: ${k}`);
  }
});
