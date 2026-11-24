// Search titles and descriptions change only on evidence, and not again before the last change could be measured
// (scripts/growth/serp-changes.mjs).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { check, current, COOLDOWN_DAYS } from "../scripts/growth/serp-changes.mjs";

const read = (f) => JSON.parse(readFileSync(new URL(`../data/growth/${f}`, import.meta.url), "utf8"));

test("every change to a curated page's title or description is logged with its evidence", async () => {
  const { problems } = check(read("serp-snapshot.json"), await current(), read("serp-changes.json"));
  assert.deepEqual(problems, [], "log the change in data/growth/serp-changes.json, then run node scripts/growth/serp-changes.mjs --accept");
});

test("the rules: logged, evidenced, numbers ignored, and a cooldown between changes", () => {
  const snap = { "a.html": ["Biology Revision: 391 Free Lessons", "Old description"] };
  assert.deepEqual(check(snap, { "a.html": ["Biology Revision: 402 Free Lessons", "Old description"] }, []).changed, [], "a number isn't a change");
  const now = { "a.html": ["Biology Revision Online, Free", "Old description"] };
  assert.match(check(snap, now, [], "2026-12-01").problems[0], /no entry/);
  assert.match(check(snap, now, [{ date: "2026-12-01", pages: ["a.html"], reason: "low CTR", evidence: "" }], "2026-12-01").problems[0], /needs a reason and its evidence/);
  const ok = { date: "2026-12-01", pages: ["a.html"], reason: "low CTR at position 3", evidence: "GSC 28 days: 4,100 impressions, 0.6% CTR" };
  assert.deepEqual(check(snap, now, [ok], "2026-12-01").problems, []);
  const soon = [ok, { ...ok, date: "2026-11-20" }];
  assert.match(check(snap, now, soon, "2026-12-01").problems[0], new RegExp(`under ${COOLDOWN_DAYS} days`));
  assert.deepEqual(check(snap, now, [{ ...ok, override: "the old title named a feature we removed" }, { ...ok, date: "2026-11-20" }], "2026-12-01").problems, []);
});
