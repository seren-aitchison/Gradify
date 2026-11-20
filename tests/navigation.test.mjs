// Navigation consistency: every hub page has the same header (scripts/sync-headers.mjs), with its own page marked.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { HUB_PAGES, HUB_LINKS, hubHeader, withHubHeader } from "../scripts/sync-headers.mjs";

const read = (p) => readFile(new URL(`../${p}`, import.meta.url), "utf8");

test("every hub page has the one Gradify header, written by scripts/sync-headers.mjs", async () => {
  for (const [page, current] of Object.entries(HUB_PAGES)) {
    const html = await read(page);
    assert.equal(withHubHeader(html, current), html, `${page}: header out of date (run node scripts/sync-headers.mjs)`);
    assert.equal(html.split('class="bar glass').length - 1, 1, `${page}: one top bar`);
    assert.ok(!html.includes("← Gradify"), `${page}: no stray back link (the header has the logo)`);
  }
});

test("the current page is marked, once, in the bar and the menu; other pages aren't", () => {
  for (const [id] of HUB_LINKS) {
    const h = hubHeader(id);
    assert.equal(h.split('aria-current="page"').length - 1, 2, `${id}: bar and menu`);
  }
  assert.ok(!hubHeader("").includes("aria-current"));
});

test("the header has the same links, in the same order, everywhere, and every action on phones too", () => {
  const h = hubHeader("pricing");
  const bar = h.match(/<nav class="sections"[\s\S]*?<\/nav>/)[0], menu = h.match(/<nav class="menu"[\s\S]*?<\/nav>/)[0];
  const labels = (s) => [...s.matchAll(/>([^<>]+)<\/a>/g)].map((m) => m[1]);
  assert.deepEqual(labels(bar), HUB_LINKS.map((l) => l[2]));
  assert.deepEqual(labels(menu), [...HUB_LINKS.map((l) => l[2]), "Sign in", "Open Gradify"]);
  assert.match(h, /kit\/core\/hubnav\.js/);
});

test("every course Gradify links to has a page, and the planned ones (never linked) don't yet", async () => {
  const { COURSES, PLANNED, LIVE_COURSES } = await import("../kit/learning/learner-data.js");
  const { existsSync } = await import("node:fs");
  const page = (p) => existsSync(new URL(`..${p}index.html`, import.meta.url));
  for (const [slug, p] of Object.entries(LIVE_COURSES)) assert.ok(page(p), `${slug}: ${p} has no page`);
  for (const slug of PLANNED) assert.ok(!page(COURSES[slug]), `${slug} has a page now: take it out of PLANNED so it's linked`);
});

test("every page has one skip link, to an element that's there", async () => {
  const { sitePages, appPages } = await import("../scripts/sync-headers.mjs");
  const files = [...Object.keys(HUB_PAGES), ...(await sitePages()).map((p) => p.file), ...(await appPages())];
  assert.ok(files.length > 180, `${files.length} pages`);
  for (const f of files) {
    const html = await read(f), links = [...html.matchAll(/<a class="skip-link" href="#([^"]+)"/g)];
    assert.equal(links.length, 1, `${f}: one skip link`);
    assert.match(html, new RegExp(`id="${links[0][1]}"`), `${f}: the skip link's target #${links[0][1]} exists`);
  }
});
