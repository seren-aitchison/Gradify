// The SEO audit (scripts/seo-audit.mjs) over every published page: no errors, the sitemap and the indexable pages are
// the same set, private app screens are never indexed, and the checked-in report is current.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { audit, category, csv } from "../scripts/seo-audit.mjs";

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
