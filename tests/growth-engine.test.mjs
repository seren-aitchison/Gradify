// The growth engine (scripts/growth/): reading Search Console, Keyword Planner and Trends exports, classifying searches,
// scoring opportunities (measured beats estimated beats unknown), Gradify's own CTR curve, the seasonal calendar, the
// Search Console fetcher, and the report answering from data or saying exactly what's missing. Made-up data only.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { parseTable, readText, gscRows, keywordPlanner, trends, dbExport } from "../scripts/growth/sources.mjs";
import { intentOf, audienceOf, geographyOf, score } from "../scripts/growth/opportunities.mjs";
import { ownCurve, lowCtr, pagesFrom, bandOf, report } from "../scripts/growth/report.mjs";
import { prepareNow, inSeason, measuredPeaks, seasonsOf } from "../scripts/growth/seasons.mjs";
import { requestBody, fetchAll } from "../scripts/growth/gsc-fetch.mjs";

const dir = mkdtempSync(join(tmpdir(), "growth-")), D = pathToFileURL(`${dir}/`);
const W = (f, s, enc) => writeFileSync(join(dir, f), enc === "utf16" ? Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from(s, "utf16le")]) : s);
// Search Console API rows: five pages around position 2 clicked ~10%, one at position 2 clicked 1% (a low-CTR page)
const rows = [];
for (const [i, ctr] of [0.1, 0.11, 0.09, 0.1, 0.12, 0.01].entries()) rows.push({ keys: [`query ${i}`, `https://getgradify.com/learn/biology/page-${i}/`], clicks: Math.round(1000 * ctr), impressions: 1000, ctr, position: 2 });
rows.push({ keys: ["dna replication", "https://getgradify.com/learn/biology/dna-replication/"], clicks: 5, impressions: 400, ctr: 0.0125, position: 8.4 });
W("gsc-2026-11-20.json", JSON.stringify({ dimensions: ["query", "page"], rows }));
W("Queries.csv", 'Top queries,Clicks,Impressions,CTR,Position\n"revision timetable, free",12,300,4%,9.2\n');
W("keyword-planner-ideas.csv", "Keyword Stats 2026-11-20\nKeyword\tAvg. monthly searches\tCompetition\nmitosis\t12100\tLow\ndna replication\t9900\tLow\n", "utf16");
W("trends-revision.csv", "Category: All categories\n\nWeek,revision: (United Kingdom)\n2026-01-04,40\n2026-04-05,100\n2026-05-03,90\n2026-08-02,10\n");
W("db-signups-by-page.csv", "landing,signups,activated\n/learn/biology/page-0/,3,2\n");

test("tables: quoted commas, percentages, title lines, and Keyword Planner's UTF-16 TSV", () => {
  assert.deepEqual(parseTable('a,b\n"x, y",2\n'), [{ a: "x, y", b: "2" }]);
  assert.equal(readText(Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from("hé", "utf16le")])), "hé");
  const kp = keywordPlanner(D);
  assert.deepEqual(kp.map((k) => [k.phrase, k.monthly, k.competition]), [["mitosis", 12100, "low"], ["dna replication", 9900, "low"]]);
  assert.equal(kp[0].source, "keyword-planner");
});

test("Search Console rows from the API and from the UI export, measured", () => {
  const g = gscRows(D);
  assert.equal(g.length, rows.length + 1);
  const ui = g.find((r) => r.query === "revision timetable, free");
  assert.equal(ui.ctr, 0.04); assert.equal(ui.position, 9.2); assert.ok(g.every((r) => r.source === "search-console"));
  assert.deepEqual(trends(D).revision.map((p) => p.value), [40, 100, 90, 10]);
  assert.equal(dbExport("signups-by-page", D)[0].activated, "2");
  assert.equal(dbExport("missing", D), null, "a missing export is null, never zero rows");
});

test("searches are classified by intent, audience and geography from their words", () => {
  assert.equal(intentOf("revision timetable generator"), "do");
  assert.equal(intentOf("what is the krebs cycle"), "learn: question");
  assert.equal(intentOf("quizlet alternatives"), "compare");
  assert.equal(intentOf("gcse biology revision notes"), "learn: revise");
  assert.equal(audienceOf("a level chemistry revision"), "A level");
  assert.equal(audienceOf("mitosis"), "unknown");
  assert.equal(geographyOf("gcse maths revision"), "UK");
  assert.equal(geographyOf("ap biology college"), "US / international");
});

test("priority: measured demand outranks an estimate, which outranks unknown; striking distance helps", () => {
  const base = { intent: "learn: question", destination: "https://getgradify.com/learn/biology/x/", competition: { value: "low", source: "estimate" } };
  const measured = score({ ...base, demand: { value: 5000, source: "search-console" } });
  const estimated = score({ ...base, demand: { value: "high", source: "estimate" } });
  const unknown = score({ ...base, demand: { value: null, source: "unknown" } });
  assert.ok(measured > estimated && estimated > unknown, `${measured} > ${estimated} > ${unknown}`);
  const near = score({ ...base, competition: { value: "high", source: "estimate" }, demand: { value: 1000, source: "search-console" }, ranking: { position: 8 } });
  const far = score({ ...base, competition: { value: "high", source: "estimate" }, demand: { value: 1000, source: "search-console" }, ranking: { position: 40 } });
  assert.ok(near > far);
  assert.ok(score({ ...base, destination: null, demand: { value: 5000, source: "search-console" } }) < measured, "a gap (no page yet) scores below a ready page");
});

test("CTR is judged against Gradify's own pages at the same position", () => {
  const pages = pagesFrom(gscRows(D));
  const curve = ownCurve(pages);
  assert.equal(bandOf(2), "2");
  assert.ok(Math.abs(curve["2"] - 0.1) < 0.006, `own median at position 2 ≈ 10%: ${curve["2"]}`);
  assert.equal(curve["6–10"], undefined, "one page isn't enough for a benchmark");
  const low = lowCtr(pages, curve);
  assert.deepEqual(low.map((p) => p.page), ["/learn/biology/page-5/"]);
  assert.equal(low[0].missedClicks, 90);
});

test("seasons: the preparation window opens before the peak, and Trends can show the real peak", () => {
  assert.deepEqual(prepareNow(new Date("2026-11-24")).map((s) => s.id), ["new-term"]);
  assert.deepEqual(prepareNow(new Date("2027-02-20")).map((s) => s.id), ["exam-revision"]);
  assert.deepEqual(inSeason(new Date("2027-04-10")).map((s) => s.id), ["exam-revision"]);
  assert.deepEqual(measuredPeaks(trends(D).revision), [4, 5]);
  assert.ok(seasonsOf("revision timetable").includes("new-term"));
});

test("the Search Console fetcher asks for 28 final days of query × page, and pages through results", async () => {
  const b = requestBody({ end: "2026-11-21" });
  assert.deepEqual([b.startDate, b.endDate, b.dimensions, b.rowLimit, b.dataState], ["2026-10-25", "2026-11-21", ["query", "page"], 25000, "final"]);
  const calls = [];
  const fake = async (url, o) => { calls.push(JSON.parse(o.body).startRow); assert.match(o.headers.Authorization, /^Bearer t$/); return { ok: true, json: async () => ({ rows: Array(calls.length === 1 ? 25000 : 3).fill({ keys: ["q", "p"], clicks: 1, impressions: 2, ctr: 0.5, position: 1 }) }) }; };
  const out = await fetchAll({ site: "sc-domain:getgradify.com", token: "t", end: "2026-11-21", days: 28, fetchImpl: fake });
  assert.deepEqual(calls, [0, 25000]); assert.equal(out.rows.length, 25003);
});

test("the report answers from data, and says what's missing instead of showing zero", async () => {
  const opportunities = [], lib = { backlog: [] };
  const empty = await report({ gsc: [], db: () => null, date: new Date("2026-11-24"), opportunities, lib });
  assert.equal((empty.match(/\*\*Unavailable\.\*\*/g) || []).length, 8);
  assert.doesNotMatch(empty, /\| 0 \|/, "no invented zeros");
  assert.match(empty, /New term: plans, habits, mocks, peaking from 2027-01-01/);
  const full = await report({ gsc: gscRows(D), db: (n) => dbExport(n, D), date: new Date("2026-11-24"), opportunities, lib });
  assert.match(full, /\| query 0 \| 100 \|/, "question 1 lists real queries");
  assert.match(full, /\| \/learn\/biology\/page-5\/ \| 1,000 \| 1\.0% \|/, "question 3 finds the low-CTR page");
  assert.match(full, /\| dna replication \| 400 \| 5 \| 8\.4 \|/, "question 2 finds the striking-distance query");
  assert.match(full, /\| \/learn\/biology\/page-0\/ \| 3 \| 2 \|/, "question 5 uses the database export");
  assert.match(full, /db-retention-by-site\.csv/, "question 6 still says what it needs");
});
