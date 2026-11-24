// Conversion experiments (kit/core/experiments.js): consent first, a stable assignment, one experiment per page,
// a plan before starting, and correct statistics.
import { test } from "node:test";
import assert from "node:assert/strict";
import { EXPERIMENTS, assign, tags, runExperiments, sampleSize, analyse, ready } from "../kit/core/experiments.js";

const env = (allowed, path = "/features/notes-studio/") => {
  const store = new Map(), events = [], link = { textContent: "Open Notes Studio" };
  return { events, link, localStorage: { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v) }, location: { pathname: path },
    document: { querySelector: () => link }, gradifyConsent: { allowed: () => allowed, event: (n, p) => events.push([n, p]) } };
};
const running = { ...EXPERIMENTS[0], status: "running", approvedBy: "owner", start: "2026-12-01", plannedPerVariant: 100 };

test("no consent, no experiment: the normal page and nothing stored", () => {
  const e = env(false);
  assert.deepEqual(runExperiments(e, [running]), []);
  assert.equal(e.localStorage.getItem("gradify.exp"), null);
  assert.equal(e.link.textContent, "Open Notes Studio");
});

test("drafts never run; a running experiment applies its variant, logs exposure and tags events", () => {
  assert.deepEqual(runExperiments(env(true), [EXPERIMENTS[0]]), [], "draft");
  const e = env(true);
  const ran = runExperiments({ ...e, Math }, [running]);
  assert.equal(ran.length, 1);
  assert.deepEqual(e.events[0][0], "experiment_exposure");
  assert.match(tags(e), /^feature-cta-try:(control|try)$/);
  if (ran[0][1] === "try") assert.equal(e.link.textContent, "Try Notes Studio free"); else assert.equal(e.link.textContent, "Open Notes Studio");
  assert.deepEqual(runExperiments(env(true, "/guides/active-recall/"), [running]), [], "only where it applies");
});

test("assignment is random once, then the same every visit", () => {
  const e = env(true);
  assert.equal(assign(running, e, () => 0.99), "try");
  assert.equal(assign(running, e, () => 0.01), "try", "remembered");
});

test("every experiment is a draft, or running with an approved, pre-registered plan", () => {
  const ids = new Set();
  for (const x of EXPERIMENTS) {
    assert.ok(!ids.has(x.id)); ids.add(x.id);
    assert.ok(x.hypothesis && x.metric && x.where instanceof RegExp && x.variants[0].id === "control" && x.variants.length >= 2, x.id);
    assert.ok(["draft", "running", "stopped"].includes(x.status), x.id);
    if (x.status === "running") assert.ok(x.approvedBy && x.start && x.plannedPerVariant > 0 && x.minDays >= 14, `${x.id}: approval, start, planned sample and 14+ days`);
    if (x.status === "stopped") assert.ok(x.result, `${x.id}: a stopped experiment records its result and decision`);
  }
});

test("statistics: sample size, lift, interval and p-value", () => {
  // a 5% base rate, detecting a 20% relative lift at 95% / 80%: about 8,150 per variant (standard two-proportion formula)
  const n = sampleSize(0.05, 0.2);
  assert.ok(n > 8000 && n < 8300, String(n));
  const r = analyse({ n: 10000, conv: 500 }, { n: 10000, conv: 600 });
  assert.ok(Math.abs(r.lift - 0.2) < 1e-9);
  assert.ok(r.p < 0.01 && r.ci95[0] > 0, "a real 1-point difference at this size is significant");
  const flat = analyse({ n: 200, conv: 10 }, { n: 200, conv: 12 });
  assert.ok(flat.p > 0.5 && flat.ci95[0] < 0, "a small sample proves nothing");
  assert.equal(ready(running, { control: { n: 100 }, try: { n: 100 } }, new Date("2026-12-10")), false, "not before the minimum days");
  assert.equal(ready(running, { control: { n: 100 }, try: { n: 99 } }, new Date("2026-12-20")), false, "not before the planned sample");
  assert.equal(ready(running, { control: { n: 100 }, try: { n: 100 } }, new Date("2026-12-20")), true);
});
