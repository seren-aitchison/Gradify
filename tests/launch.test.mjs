// Launch basics: sitemap, robots, 404 and privacy pages, privacy-first usage counts, and the QA audit's scoring.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { sitemapXml, sitemapUrls } from "../scripts/build-sitemap.mjs";
import { analyticsAllowed, eventRow, EVENTS } from "../kit/core/analytics.js";
import { scoreSite, WEIGHTS, pageChecks, gaps } from "../scripts/qa-audit.mjs";

const read = (f) => readFile(new URL(`../${f}`, import.meta.url), "utf8");

test("sitemap.xml is up to date and lists only public pages", async () => {
  assert.equal(await read("sitemap.xml"), await sitemapXml(), "run node scripts/build-sitemap.mjs");
  const urls = await sitemapUrls();
  assert.ok(urls.includes("https://getgradify.com/") && urls.includes("https://getgradify.com/privacy.html"));
  assert.ok(urls.some((u) => u.endsWith("/lawgradify/course/")));
  assert.ok(!urls.some((u) => /status\.html|harness\.html|404\.html/.test(u)), "no internal pages");
  const { SITES, slugOf } = await import("../kit/core/site.js");
  for (const s of SITES.filter((x) => x.status === "soon")) assert.ok(!urls.some((u) => u.includes(`/${slugOf(s)}/`)), `${s.n} is coming soon, so it isn't listed`);
});

test("robots.txt points to the sitemap and keeps internal pages out", async () => {
  const r = await read("robots.txt");
  assert.match(r, /Sitemap: https:\/\/getgradify\.com\/sitemap\.xml/);
  assert.match(r, /Disallow: \/status\.html/);
});

test("the 404 page works at any address: every local path is absolute", async () => {
  const html = await read("404.html");
  const refs = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]).filter((h) => !/^https?:/.test(h));
  assert.ok(refs.length > 3);
  for (const r of refs) assert.ok(r.startsWith("/"), `relative path in 404.html: ${r}`);
  assert.match(html, /from "\/kit\/core\/site\.js"/);
});

test("usage counts never send an identifier and respect every opt-out", () => {
  const env = (o = {}) => ({ location: { hostname: "getgradify.com", pathname: "/lawgradify/course/", ...o.loc }, navigator: { ...o.nav }, document: { referrer: o.ref ?? "" }, innerWidth: o.w ?? 1300, localStorage: { getItem: (k) => (o.off && k === "gradify.noanalytics" ? "1" : null) } });
  assert.equal(analyticsAllowed(env(), false), false, "off until accounts are configured");
  assert.equal(analyticsAllowed(env(), true), true);
  assert.equal(analyticsAllowed(env({ nav: { doNotTrack: "1" } }), true), false);
  assert.equal(analyticsAllowed(env({ nav: { globalPrivacyControl: true } }), true), false);
  assert.equal(analyticsAllowed(env({ off: true }), true), false);
  assert.equal(analyticsAllowed(env({ loc: { hostname: "localhost" } }), true), false);
  const row = eventRow("view", "LawGradify", env({ ref: "https://www.google.com/search?q=private+words", w: 390 }));
  assert.deepEqual(Object.keys(row).sort(), ["device", "event", "path", "referrer", "site"]);
  assert.equal(row.referrer, "www.google.com"); assert.equal(row.device, "phone"); assert.equal(row.path, "/lawgradify/course/");
  assert.equal(eventRow("view", "X", env({ ref: "https://getgradify.com/" })).referrer, null, "internal navigation isn't a referrer");
});

test("the page_events table has no identifiers and can't be read through the API", async () => {
  const sql = await read("supabase/migrations/20261106140000_page_events.sql");
  const table = sql.match(/create table[\s\S]*?\n\);/)[0];
  assert.doesNotMatch(table, /user_id|session|\bip\b|created_at|timestamptz/i);
  assert.doesNotMatch(sql, /for select/);
  for (const e of EVENTS) assert.match(table, new RegExp(`'${e}'`));
});

test("QA scores: weights total 100, each area is capped, and unproven things score nothing", () => {
  assert.equal(Object.values(WEIGHTS).reduce((a, b) => a + b, 0), 100);
  const backend = { code: true, configured: false, accounts: false, ai: false };
  const page = { ...pageChecks(`<html lang="en"><title>Title</title><meta name="description" content="A description long enough"><meta name="viewport" content="width=device-width"><img alt="x"><button>Go</button>`, "x/index.html"), broken: [] };
  const row = { name: "X", built: true, courses: ["X"], tools: [], written: 600, coverage: 1, interactives: 40, exams: 9, schools: 10, reviewed: 10, signedOff: 10, notesTools: true };
  const best = scoreSite(row, { pages: [page], courses: [{ sourced: 10 }], backend, tested: true, browser: [{ contrast: { checked: 10, pass: 10 }, focus: { stops: 5, visible: 5 } }] });
  for (const [k, w] of Object.entries(WEIGHTS)) assert.ok(best.scores[k] <= w, k);
  assert.equal(best.scores.backend, 2, "a backend that isn't configured or verified earns only the code points");
  assert.equal(best.total, 90);
  const noBrowser = scoreSite(row, { pages: [page], courses: [{ sourced: 10 }], backend, tested: true });
  assert.equal(noBrowser.scores.accessibility, 6, "contrast and focus unmeasured: those 4 points are 0");
  const broken = scoreSite(row, { pages: [{ ...page, refs: ["missing.html", ...Array.from({ length: 19 }, (_, i) => `p${i}.html`)], broken: ["missing.html"] }], courses: [{ sourced: 10 }], backend, tested: true });
  assert.ok(broken.scores.functionality < best.scores.functionality && broken.scores.engineering < best.scores.engineering);
  const unbuilt = scoreSite({ ...row, built: false }, { backend });
  assert.equal(unbuilt.total, 2);
  assert.equal(gaps(best.scores)[0][0], "backend");
  assert.equal(pageChecks(`<meta name="viewport" content="width=device-width, user-scalable=no">`, "y").zoom, false);
});
