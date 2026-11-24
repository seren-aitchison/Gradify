// The search identity of every site, course and feature (scripts/seo/registry.mjs, scripts/seo/features.mjs):
// complete, unique, honest about qualifications, and actually written into the pages. A new site, course or feature
// fails here until its SEO is written: search is part of the definition of done.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { registry, applySeo, unbackedClaims, SITE_HOME } from "../scripts/seo/registry.mjs";
import { FEATURE_PAGES, featurePages } from "../scripts/seo/features.mjs";
import { FEATURES, featureSlug } from "../kit/data/features.js";
import { SITES, slugOf } from "../kit/core/site.js";
import { PRO_ON_SALE } from "../kit/data/billing.js";

const root = new URL("../", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
const reg = registry();
const cat = JSON.parse(read("kit/api/v1/catalogue.json"));

test("every live site and every live course page has a search identity", () => {
  for (const s of SITES.filter((x) => x.built && ["live", "beta"].includes(x.status))) {
    assert.ok(SITE_HOME[slugOf(s)], `${s.n}: add its search title and description to SITE_HOME in scripts/seo/registry.mjs`);
    assert.ok(reg.has(`${slugOf(s)}/index.html`), `${s.n} home page is in the registry`);
  }
  for (const c of cat.courses.filter((x) => ["live", "beta"].includes(x.status) && x.page?.startsWith("/"))) assert.ok(reg.has(`${c.page.slice(1)}index.html`), `${c.slug}: its course page is in the registry`);
});

test("titles fit (≤ 60), descriptions fit (≤ 155), and none repeats", () => {
  const titles = new Map(), descs = new Map();
  for (const [p, e] of reg) {
    assert.ok(e.title.length <= 60, `${p}: title is ${e.title.length} characters`);
    assert.ok(e.description.length >= 70 && e.description.length <= 155, `${p}: description is ${e.description.length} characters`);
    assert.ok(!titles.has(e.title), `${p} has the same title as ${titles.get(e.title)}`); titles.set(e.title, p);
    assert.ok(!descs.has(e.description), `${p} has the same description as ${descs.get(e.description)}`); descs.set(e.description, p);
  }
});

test("a qualification is named only when coverage.js backs it", () => {
  for (const [p, e] of reg) assert.deepEqual(unbackedClaims(e), [], `${p} names a qualification its courses aren't mapped to`);
  // the check itself works: a biology page claiming GCSE is caught, a maths one isn't
  assert.deepEqual(unbackedClaims({ title: "GCSE Biology", description: "", courses: ["biology"] }), ["gcse"]);
  assert.deepEqual(unbackedClaims({ title: "GCSE Maths", description: "", courses: ["maths"] }), []);
});

test("the pages on disk carry their registry title, description and valid structured data", () => {
  for (const [p, e] of reg) {
    if (!existsSync(new URL(p, root))) continue;
    const html = read(p);
    assert.equal(applySeo(html, e), html, `${p} is out of date: run node scripts/build-seo.mjs`);
    assert.match(html, new RegExp(`<title>${e.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/&/g, "&amp;")}</title>`), p);
    const ld = html.match(/<script type="application\/ld\+json" data-seo="registry">([\s\S]*?)<\/script>/);
    assert.ok(ld, `${p}: registry JSON-LD`);
    const o = JSON.parse(ld[1]);
    assert.equal(o["@context"], "https://schema.org");
    assert.doesNotMatch(ld[1], /"(aggregateRating|review|ratingValue)"/, `${p}: no ratings`);
    if (o["@type"] === "Course") { assert.ok(o.provider && o.name && o.description, `${p}: Course needs provider, name and description`); assert.equal(o.offers.price, "0"); }
    assert.equal((html.match(/<!-- head-tags: canonical and link previews/g) || []).length <= 1, true, `${p}: one head-tags comment`);
  }
});

test("applySeo is idempotent and leaves the page's body alone", () => {
  const [p, e] = [...reg][0], html = read(p), once = applySeo(html, e);
  assert.equal(applySeo(once, e), once);
  assert.equal(once.split("</head>")[1], html.split("</head>")[1]);
});

test("every feature has a public page, and every page is a real feature", () => {
  const slugs = FEATURES.map(featureSlug);
  for (const s of slugs) assert.ok(FEATURE_PAGES[s], `feature "${s}": write its page in FEATURE_PAGES (scripts/seo/features.mjs)`);
  for (const s of Object.keys(FEATURE_PAGES)) assert.ok(slugs.includes(s), `FEATURE_PAGES has "${s}", which isn't in kit/data/features.js`);
  assert.equal(new Set(slugs).size, slugs.length, "feature slugs are unique");
});

test("feature pages: unique, honest about what's free, and nothing unreleased is indexed", () => {
  const pages = featurePages(), titles = new Set();
  assert.equal(pages.length, FEATURES.length + 1, "a page per feature, and the hub");
  for (const pg of pages) {
    assert.ok(!titles.has(pg.title), `${pg.path}: duplicate title`); titles.add(pg.title);
    const slug = pg.path.split("/")[1], f = FEATURES.find((x) => featureSlug(x) === slug);
    if (!f) continue;
    const p = FEATURE_PAGES[slug];
    assert.ok(p.answer.split(" ").length >= 20 && p.what.split(" ").length >= 25 && p.steps.length >= 3 && p.good.length >= 2, `${slug}: enough of its own content`);
    if (f.plan === "pro" && !PRO_ON_SALE) { assert.equal(pg.noindex, true, `${slug}: in Ultra, not on sale: noindex`); assert.doesNotMatch(pg.body, /data-cta="feature"/, `${slug}: no "Open" button`); }
    else assert.ok(!pg.noindex, `${slug} is indexed`);
    if (f.plan === "plus") assert.match(pg.body, /Gradify Pro/, `${slug}: says it's part of Gradify Pro`);
    // the "Open" button goes somewhere that exists
    const href = pg.body.match(/href="([^"]+)" data-cta="feature"/)?.[1];
    if (href) { const file = href.split("#")[0].replace(/^\//, "") || "index.html"; assert.ok(existsSync(new URL(file.endsWith("/") ? `${file}index.html` : file, root)), `${slug}: ${href} exists`); }
  }
});
