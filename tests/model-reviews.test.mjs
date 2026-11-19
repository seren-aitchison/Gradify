// The 3D models' expert reviews (kit/models/reviews.js): a review is only valid for the exact model file reviewed.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { REVIEWS, REVIEWER, reviewOf } from "../kit/models/reviews.js";
import { MODELS } from "../kit/models/index.js";

test("every model has a named kind of reviewer, and every review still matches its model", () => {
  const files = [...new Set(Object.values(MODELS).map((m) => m.file.replace(".js", "")))];
  for (const f of files) assert.ok(REVIEWER[f], `${f}: who should review it?`);
  for (const [f, r] of Object.entries(REVIEWS)) {
    const sha = createHash("sha256").update(readFileSync(new URL(`../kit/models/${f}.js`, import.meta.url))).digest("hex").slice(0, 16);
    assert.equal(r.sha, sha, `kit/models/${f}.js changed after ${r.by} reviewed it on ${r.on}: ask for a new review, or remove the entry`);
    assert.ok(r.by && /^\d{4}-\d{2}-\d{2}$/.test(r.on), f);
  }
  assert.match(reviewOf("castle").line, /^Not yet reviewed by a medieval historian/);
});
