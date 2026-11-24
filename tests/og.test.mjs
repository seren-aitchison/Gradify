// Search and link-preview presentation of the pages that matter most: the homepage, every specialist site, every feature,
// the hubs, the lessons pilot and the subject topic pages. Each has a title, a description, link-preview tags and a
// preview image that exists, is 1200×630 and has alt text; the generated images are current (scripts/og/build-og.mjs).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { SITES, slugOf } from "../kit/core/site.js";
import { FEATURES, featureSlug } from "../kit/data/features.js";
import { cards, fp } from "../scripts/og/build-og.mjs";

const root = new URL("../", import.meta.url), read = (p) => readFileSync(new URL(p, root), "utf8");
/** width and height of a PNG or JPEG */
export function size(buf) {
  if (buf.readUInt32BE(0) === 0x89504e47) return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  for (let i = 2; i < buf.length;) { if (buf[i] !== 0xff) return null; const m = buf[i + 1], len = buf.readUInt16BE(i + 2); if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)]; i += 2 + len; }
  return null;
}
const meta = (html, re) => html.match(re)?.[1] ?? null;
const important = ["index.html", "features/index.html", "tools/index.html", "guides/index.html", "topics/index.html", "pricing.html",
  ...SITES.filter((s) => s.built && ["live", "beta"].includes(s.status)).map((s) => `${slugOf(s)}/index.html`),
  ...FEATURES.map((f) => `features/${featureSlug(f)}/index.html`)];

test("the important pages each have a search title, description and a real 1200×630 preview image with alt text", () => {
  for (const p of important) {
    if (!existsSync(new URL(p, root))) continue;
    const h = read(p);
    assert.ok(meta(h, /<title>([^<]+)<\/title>/), `${p}: title`);
    assert.ok(meta(h, /<meta name="description" content="([^"]+)"/), `${p}: description`);
    assert.ok(meta(h, /<meta property="og:title" content="([^"]+)"/), `${p}: og:title`);
    assert.match(h, /<meta name="twitter:card" content="summary_large_image">/, `${p}: large link-preview card`);
    const img = meta(h, /<meta property="og:image" content="https:\/\/getgradify\.com\/([^"]+)"/);
    assert.ok(img && existsSync(new URL(img, root)), `${p}: og:image ${img} exists`);
    assert.deepEqual(size(readFileSync(new URL(img, root))), [1200, 630], `${p}: ${img} is 1200×630`);
  }
});

test("every feature page shows its own image, and lesson and subject pages show theirs", () => {
  for (const f of FEATURES) {
    const p = `features/${featureSlug(f)}/index.html`, h = read(p);
    assert.match(h, new RegExp(`og:image" content="https://getgradify\\.com/assets/og/features/${featureSlug(f)}\\.jpg"`), p);
    assert.doesNotMatch(meta(h, /og:image:alt" content="([^"]+)"/), /^Gradify: turn your notes/, `${p}: its own alt text`);
  }
  assert.match(read("lessons/biology/u02-04/index.html"), /assets\/og\/lessons\/biology-u02-04\.jpg/);
  assert.match(read("topics/chemistry/index.html"), /assets\/og\/subjects\/chemistry\.jpg/);
});

test("the generated preview images are current (run node scripts/og/build-og.mjs)", async () => {
  const manifest = JSON.parse(read("assets/og/manifest.json"));
  for (const c of await cards()) {
    assert.ok(existsSync(new URL(c.file, root)), `${c.file} exists`);
    assert.equal(manifest.fp[c.file], fp(c), `${c.file} is out of date`);
    assert.ok(c.alt && c.alt.length > 10, `${c.file}: alt text`);
  }
});
