// The search pages (scripts/build-seo.mjs): up to date, published, in the sitemap, each with what search engines and
// link previews need; the free calculators' maths; the homepage's FAQ structured data matching what's on the page; and
// AI-assistant referrals being recognised.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { outputs, withHeadTags } from "../scripts/build-seo.mjs";
import { fitTitle, fitDesc } from "../scripts/seo/shell.mjs";
import { existsSync } from "node:fs";
import { SEO_FOLDERS, SEO_FILES, INDEXNOW_KEY } from "../scripts/seo/folders.mjs";
import { PUBLISH } from "../scripts/build-site.mjs";
import { sitemapUrls } from "../scripts/build-sitemap.mjs";
import { creditMean, classify, degreeAverage, degreeTracker, degreeIntel, neededOnFinal, weighted, gpa, countdown, reviewDates, ics } from "../assets/study-tools.js";
import { aiSource, touchFrom } from "../kit/core/attribution.js";

const read = (f) => readFile(new URL(`../${f}`, import.meta.url), "utf8");
const files = await outputs();

test("every search page is up to date (run node scripts/build-seo.mjs)", async () => {
  for (const [p, text] of files) assert.equal(await read(p).catch(() => null), text, `${p} is out of date`);
});

test("the search pages are published and listed in the sitemap", async () => {
  for (const f of SEO_FOLDERS) assert.ok(PUBLISH.folders.includes(f), `${f}/ isn't in PUBLISH.folders`);
  for (const f of [...SEO_FILES, `${INDEXNOW_KEY}.txt`]) assert.ok(PUBLISH.files.includes(f), `${f} isn't in PUBLISH.files`);
  const urls = new Set(await sitemapUrls());
  for (const [p, html] of files) {
    if (!p.endsWith(".html") || p.endsWith("embed.html") || !SEO_FOLDERS.includes(p.split("/")[0]) && !SEO_FILES.includes(p)) continue;
    const u = `https://getgradify.com/${p.replace(/(^|\/)index\.html$/, "$1")}`;
    // pages that ask not to be indexed (thin generated pages, the bookmarklet's hand-off page) stay out of the sitemap
    if (/<meta name="robots" content="noindex/.test(html)) assert.ok(!urls.has(u), `${p} is noindex, so it shouldn't be in the sitemap`);
    else assert.ok(urls.has(u), `${p} isn't in the sitemap`);
  }
  assert.ok(![...urls].some((u) => u.endsWith("embed.html")), "the embed widget is noindex, so not in the sitemap");
});

test("each search page has one h1, a title, a description, a canonical URL, link previews and valid JSON-LD", () => {
  let n = 0;
  for (const [p, html] of files) {
    if (!p.endsWith(".html") || !(SEO_FOLDERS.includes(p.split("/")[0]) || SEO_FILES.includes(p)) || p.endsWith("embed.html") || /<meta name="robots" content="noindex">/.test(html)) continue;
    n++;
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${p}: one h1`);
    assert.match(html, /<title>[^<]{10,}<\/title>/, p);
    assert.match(html, /<meta name="description" content="[^"]{50,}">/, p);
    const canon = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
    assert.equal(canon, `https://getgradify.com/${p.replace(/(^|\/)index\.html$/, "$1")}`, `${p}: canonical`);
    assert.match(html, /property="og:image"/, p);
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) assert.doesNotThrow(() => JSON.parse(m[1]), `${p}: JSON-LD`);
  }
  assert.ok(n > 700, `expected the topic and study-plan pages too, got ${n}`);
});

test("topic pages come from the real course notes, with sample flashcards", () => {
  const p = files.get("topics/chemistry/u01/index.html");
  assert.ok(p, "chemistry unit 1 has a topic page");
  assert.match(p, /Matter and its classification/);
  assert.match(p, /Five sample flashcards/);
  // a pilot lesson: the topic page links to its own page, which links into the lesson in the course app
  assert.match(p, /href="\/lessons\/chemistry\/u01-02\/"/);
  assert.match(files.get("lessons/chemistry/u01-02/index.html"), /href="\/scigradify\/chemistry\/#\/lesson\/u01-02"/);
});

test("pilot lesson pages: the lesson's own notes, one h1, canonical to itself, only thin ones noindexed, linked from course and topic pages", async () => {
  const { PILOT, MIN_WORDS } = await import("../scripts/seo/lessons.mjs");
  const pages = [...files].filter(([p]) => /^lessons\/[^/]+\/[^/]+\/index\.html$/.test(p));
  assert.equal(pages.length, 85, "Biology u02, Chemistry u01 and Law u01: the pilot only");
  assert.deepEqual(Object.keys(PILOT), ["biology", "chemistry", "law"]);
  for (const [p, h] of pages) {
    assert.equal((h.match(/<h1[\s>]/g) || []).length, 1, p);
    assert.match(h, /class="lesson-notes"><section/, `${p}: notes rendered`);
    assert.match(h, /Open this lesson in the course/, p);
  }
  assert.match(files.get("lessons/biology/u02-04/index.html"), /<img src="\/kit\/diagrams\/svg\/bio-animal-cell\.wide\.svg" alt="[^"]{20,}"/);
  assert.ok(pages.filter(([, h]) => /noindex/.test(h)).length <= 3, "the quality floor only catches the odd short lesson");
  assert.match(files.get("scigradify/biology/index.html"), /href="\/lessons\/biology\/u02-04\/"/);
  assert.ok(MIN_WORDS >= 200);
});

test("every indexed page outside the generator has a canonical URL and link previews", async () => {
  for (const u of await sitemapUrls()) {
    let p = u.replace("https://getgradify.com/", ""); if (p === "" || p.endsWith("/")) p += "index.html";
    const html = await read(p);
    assert.match(html, /rel="canonical"/, `${p}: canonical`);
    assert.match(html, /property="og:title"/, `${p}: og:title`);
  }
  const t = withHeadTags("<head>\n  <title>A &amp; B</title>\n  <meta name=\"description\" content=\"d\">", "https://getgradify.com/x/");
  assert.match(t, /<link rel="canonical" href="https:\/\/getgradify\.com\/x\/">/);
  assert.equal(withHeadTags(t, "https://getgradify.com/x/"), t, "adding them twice changes nothing");
});

test("the homepage FAQ structured data says exactly what the visible FAQ says", async () => {
  const html = await read("index.html");
  const ld = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const faq = ld["@graph"].find((x) => x["@type"] === "FAQPage").mainEntity;
  const section = html.match(/<section class="faq" id="faq"[\s\S]*?<\/section>/)[0];
  const visible = [...section.matchAll(/<summary>(.*?)<\/summary>\s*<p>([\s\S]*?)<\/p>/g)].map(([, q, a]) => [q, a.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim()]);
  assert.deepEqual(faq.map((q) => [q.name, q.acceptedAnswer.text]), visible, "re-run the FAQ JSON-LD after editing the FAQ");
});

test("llms.txt and robots.txt welcome AI assistants", async () => {
  const llms = files.get("llms.txt");
  assert.match(llms, /^# Gradify\n\n> /);
  assert.match(llms, /\(https:\/\/getgradify\.com\/app\.html\)/);
  const robots = await read("robots.txt");
  for (const bot of ["OAI-SearchBot", "PerplexityBot", "ClaudeBot", "Google-Extended"]) assert.match(robots, new RegExp(`User-agent: ${bot}`));
  assert.equal(files.get(`${INDEXNOW_KEY}.txt`).trim(), INDEXNOW_KEY);
});

test("degree classification: credit-weighted years, the weighting and the boundaries", () => {
  assert.equal(creditMean([{ mark: 60, credits: 20 }, { mark: 75, credits: 40 }, { mark: "", credits: 20 }]), 70);
  assert.equal(degreeAverage(62, 68, 60), 65.6);
  assert.equal(degreeAverage(null, 68, 60), 68, "final year only when year 2 is empty");
  assert.equal(classify(65.6).label, "Upper second (2:1)");
  assert.equal(classify(70).label, "First-class honours (1st)");
  assert.equal(classify(68.5).borderline, true);
  assert.equal(classify(65).borderline, false);
  assert.equal(classify(39).label, "Below honours (fail)");
});

test("degree tracker: average so far, how much is marked, and what each class needs on the rest", () => {
  const near = (a, b, msg) => assert.ok(Math.abs(a - b) < 1e-9, `${msg}: ${a} vs ${b}`);
  // all of year 2 marked at 55%, 70 of 120 final-year credits marked at 75%, weighted 40/60
  const t = degreeTracker([{ mark: 55, credits: 120, year: "2" }, { mark: 75, credits: 70, year: "3" }], 60);
  near(t.years[0].done, 1, "year 2 complete"); near(t.years[1].done, 70 / 120, "final year part-marked");
  near(t.average, 0.4 * 55 + 0.6 * 75, "average over the marked years");
  near(t.complete, 0.4 + 0.6 * 70 / 120, "share of the weighting marked");
  // banked = 0.4×55 + 0.6×75×70/120 = 22 + 26.25; rest = 0.6×50/120 = 0.25
  const first = t.goals.find((g) => g.short === "First");
  near(first.need, 87, "First needs 87% on the rest"); assert.equal(first.status, "reachable");
  // 30% in year 2 and 40% on 50 final-year credits: a First would need more than 100% on what's left
  const low = degreeTracker([{ mark: 30, credits: 120, year: "2" }, { mark: 40, credits: 50, year: "3" }], 60);
  assert.equal(low.goals.find((g) => g.short === "First").status, "out");
  const twoOne = t.goals.find((g) => g.short === "2:1");
  near(twoOne.need, (60 - 48.25) / 0.25, "2:1 need"); assert.equal(twoOne.status, "reachable");
  assert.equal(t.goals.find((g) => g.short === "Third").status, "secured", "already above 40 even with zeros");

  const empty = degreeTracker([], 60);
  assert.equal(empty.average, null); assert.equal(empty.complete, 0);
  near(empty.goals[0].need, 70, "nothing marked: the boundary itself");

  const done = degreeTracker([{ mark: 62, credits: 120, year: "2" }, { mark: 68, credits: 120, year: "3" }], 60);
  near(done.average, 65.6, "all marked matches the classic calculation"); near(done.complete, 1, "all marked");
  assert.equal(done.goals.find((g) => g.short === "2:1").status, "met");
  assert.equal(done.goals.find((g) => g.short === "First").status, "missed");

  const finalOnly = degreeTracker([{ mark: 50, credits: 120, year: "2" }, { mark: 72, credits: 60, year: "3" }], 100);
  near(finalOnly.average, 72, "year 2 doesn't count"); near(finalOnly.complete, 0.5, "half the final year");
  near(degreeTracker([{ mark: 80, credits: 200, year: "3" }], 100).complete, 1, "more than a year's credits caps at complete");
});

test("final grade needed, weighted grade and GPA", () => {
  assert.equal(neededOnFinal(65, 40, 70), 77.5);
  assert.equal(neededOnFinal(65, 0, 70), null);
  assert.deepEqual(weighted([{ score: 72, weight: 30 }, { score: 58, weight: 20 }]), { avg: 66.4, done: 50, contribution: 33.2 });
  assert.equal(weighted([{ score: "", weight: 30 }]), null);
  assert.equal(gpa([{ grade: "A", credits: 3 }, { grade: "B", credits: 4 }]).toFixed(2), "3.43");
});

test("exam countdown and spaced repetition dates", () => {
  const now = new Date(2026, 0, 1);
  assert.deepEqual(countdown(new Date(2026, 0, 15), now, 3, 1), { days: 14, studyDays: 12, hours: 36, weeks: 2 });
  const d = reviewDates(new Date(2026, 0, 1), new Date(2026, 0, 20)).map((x) => x.getDate());
  assert.deepEqual(d, [2, 4, 8, 15, 19], "1, 3, 7, 14 days, then the day before the exam");
  const cal = ics("Krebs; cycle", reviewDates(new Date(2026, 0, 1)), new Date(Date.UTC(2026, 0, 1)));
  assert.match(cal, /^BEGIN:VCALENDAR\r\n/);
  assert.equal((cal.match(/BEGIN:VEVENT/g) || []).length, 6);
  assert.match(cal, /SUMMARY:Review: Krebs  cycle \(1 of 6\)/);
});

test("visits from AI assistants are recognised", () => {
  assert.equal(aiSource("chatgpt.com"), "chatgpt");
  assert.equal(aiSource("www.perplexity.ai"), "perplexity");
  assert.equal(aiSource("gemini.google.com"), "gemini");
  assert.equal(aiSource("claude.ai"), "claude");
  assert.equal(aiSource("google.com"), null);
  const t = touchFrom({ search: "", hostname: "getgradify.com", pathname: "/guides/active-recall/" }, { referrer: "https://chatgpt.com/" });
  assert.equal(t.ai, "chatgpt");
});

test("titles fit a search result (≤ 60 characters) and descriptions aren't cut off (≤ 155)", () => {
  for (const [p, html] of files) {
    if (!p.endsWith(".html") || /<meta name="robots" content="noindex">/.test(html)) continue;
    const t = html.match(/<title>([^<]*)<\/title>/)?.[1].replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"'), d = html.match(/<meta name="description" content="([^"]*)"/)?.[1].replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    if (t) assert.ok(t.length <= 60, `${p}: title is ${t.length} characters: ${t}`);
    if (d) assert.ok(d.length <= 155, `${p}: description is ${d.length} characters`);
  }
  assert.equal(fitTitle("UK Degree Classification Calculator (1st, 2:1, 2:2) · Free · Gradify"), "UK Degree Classification Calculator · Gradify");
  assert.ok(fitDesc("a ".repeat(120)).length <= 155);
});

test("headings never skip a level (h1 → h2 → h3) on the search pages", () => {
  for (const [p, html] of files) {
    if (!p.endsWith(".html") || /<meta name="robots" content="noindex">/.test(html)) continue;
    const main = html.match(/<main[\s\S]*<\/main>/)?.[0] || ""; let last = 0;
    for (const m of main.matchAll(/<h([1-6])[\s>]/g)) { const n = Number(m[1]); assert.ok(n <= last + 1, `${p}: h${n} after h${last}`); last = n; }
  }
});

test("thin generated pages are noindexed by the quality floor, and every link inside the search pages resolves", () => {
  const topics = [...files].filter(([p]) => /^topics\/[^/]+\/[^/]+\/index\.html$/.test(p));
  assert.ok(topics.length > 400);
  for (const [p, html] of topics) assert.match(html, /id="topic-data"/, `${p}: carries its quiz and drill data`);
  const exists = (h) => { const p = h.replace(/^\//, "").replace(/[#?].*$/, ""); return files.has(p) || files.has(`${p}index.html`) || files.has(p.replace(/\/$/, "/index.html")) || existsSync(new URL(`../${p}`, import.meta.url)); };
  const bad = new Set();
  for (const [p, html] of files) if (p.endsWith(".html")) for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) if (!m[1].startsWith("//") && !exists(m[1])) bad.add(`${p} → ${m[1]}`);
  assert.deepEqual([...bad].slice(0, 10), [], "broken internal links");
});

test("the feed, security.txt and the bookmarklet hand-off are generated", () => {
  assert.match(files.get("feed.xml"), /<rss version="2.0"[\s\S]*<item>/);
  assert.match(files.get(".well-known/security.txt"), /^Contact: mailto:/m);
  assert.match(files.get("send.html"), /gradify\.jot\.pack/);
});

test("key-term pages, cross-subject links, topic FAQs, auto-links and the research page", async () => {
  const { termKey, termSlug } = await import("../scripts/seo/programmatic.mjs");
  const { autoLink } = await import("../scripts/build-seo.mjs");
  assert.equal(termKey("**Saturation** (colour)"), "saturation");
  assert.equal(termSlug("café au lait"), "cafe-au-lait");
  const terms = [...files].filter(([p]) => /^terms\/[^/]+\/index\.html$/.test(p));
  assert.ok(terms.length > 300);
  assert.ok(terms.some(([, h]) => !/noindex/.test(h)) && terms.some(([, h]) => /noindex, follow/.test(h)), "only substantial term pages are indexed");
  assert.ok([...files].some(([p, h]) => p.startsWith("topics/") && /The same ideas in other subjects/.test(h)));
  assert.ok([...files].some(([p, h]) => p.startsWith("topics/") && /"@type":"FAQPage"/.test(h)));
  const linked = autoLink('<main><h2>Spaced repetition</h2><p>Use spaced repetition and <a href="/x">active recall</a>, then active recall again.</p></main>', "/guides/x/");
  assert.match(linked, /<h2>Spaced repetition<\/h2>/, "never inside headings");
  assert.match(autoLink('<main><nav class="crumbs"><li>Active recall guide</li></nav><p>x</p></main>', "/x/"), /<li>Active recall guide<\/li>/, "never inside breadcrumbs or navigation");
  assert.match(linked, /<p>Use <a href="\/glossary\/spaced-repetition\/">spaced repetition<\/a>/);
  assert.match(linked, /then <a href="\/glossary\/active-recall\/">active recall<\/a> again/, "not inside an existing link, but the next mention");
  assert.match(files.get("research/index.html"), /"@type":"Dataset"/);
  const sm = await read("sitemaps/guides.xml"); assert.match(sm, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
  assert.match(await read("sitemap.xml"), /<sitemapindex[\s\S]*sitemaps\/topics\.xml/);
});

test("speakable summaries, per-site preview images and hreflang on every indexed page", async () => {
  assert.match(files.get("guides/command-words/index.html"), /"speakable":\{"@type":"SpeakableSpecification","cssSelector":\["h1",".answer"\]\}/);
  assert.doesNotMatch(files.get("tools/index.html"), /"speakable"/, "only on guides, topics, comparisons and terms");
  const t = withHeadTags("<head>\n  <title>MedGradify</title>\n  <meta name=\"description\" content=\"d\">", "https://getgradify.com/medgradify/");
  assert.match(t, /og:image" content="https:\/\/getgradify\.com\/assets\/og\/sites\/medgradify\.png"/);
  assert.match(t, /hreflang="en-GB" href="https:\/\/getgradify\.com\/medgradify\/"/);
  for (const u of (await sitemapUrls()).slice(0, 60)) { let p = u.replace("https://getgradify.com/", ""); if (p === "" || p.endsWith("/")) p += "index.html"; assert.match(await read(p), /hreflang="x-default"/, p); }
});

test("schema stays honest: BreadcrumbList matches the visible breadcrumbs, and no ratings or reviews are claimed", () => {
  for (const [p, html] of files) {
    if (!p.endsWith(".html")) continue;
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) assert.doesNotMatch(m[1], /"(aggregateRating|review|reviewRating|ratingValue)"/, `${p}: no ratings in structured data`);
    const nav = html.match(/<nav class="crumbs"[\s\S]*?<\/nav>/)?.[0]; if (!nav) continue;
    const visible = [...nav.matchAll(/<li[^>]*>(?:<a[^>]*>)?([^<]*)/g)].map((m) => m[1].replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"'));
    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1])).find((x) => x["@type"] === "BreadcrumbList");
    assert.ok(ld, `${p}: BreadcrumbList for the visible breadcrumbs`);
    assert.deepEqual(ld.itemListElement.map((x) => x.name), visible, `${p}: BreadcrumbList names = visible breadcrumbs`);
  }
});

test("every indexed page has its own title, images have alt text, and h2 headings can be linked to", () => {
  const titles = new Map();
  for (const [p, html] of files) {
    if (!p.endsWith(".html") || /name="robots" content="noindex/.test(html)) continue;
    const t = html.match(/<title>([^<]*)<\/title>/)?.[1]; if (!t) continue;
    assert.ok(!titles.has(t), `${p} has the same title as ${titles.get(t)}: ${t}`); titles.set(t, p);
    for (const img of html.match(/<img\b[^>]*>/g) || []) assert.match(img, /\salt="[^"]+"/, `${p}: ${img.slice(0, 80)}`);
    const main = html.match(/<main[\s\S]*<\/main>/)?.[0] || "";
    for (const h of main.match(/<h2\b[^>]*>/g) || []) assert.match(h, /\sid="/, `${p}: ${h}`);
  }
});

test("no orphans: every indexed generated page is linked from at least one other page", () => {
  const inbound = new Map();
  for (const [p, html] of files) if (p.endsWith(".html")) for (const m of html.matchAll(/href="\/([^"#?]*)/g)) { const t = m[1] === "" || m[1].endsWith("/") ? `${m[1]}index.html` : m[1]; if (t !== p) inbound.set(t, (inbound.get(t) || 0) + 1); }
  const orphans = [...files].filter(([p, html]) => p.endsWith(".html") && !/name="robots" content="noindex/.test(html) && /^(tools|guides|vs|checklists|terms|topics|questions|exam-traps|compare|glossary|templates|study-plan|research)\//.test(p) && !inbound.get(p)).map(([p]) => p);
  assert.deepEqual(orphans, []);
});

test("the speed guard, llms-full.txt and large image previews", async () => {
  assert.match(files.get("llms-full.txt"), /^# Gradify: full text/);
  assert.match(files.get("llms-full.txt"), /Source: https:\/\/getgradify\.com\/guides\/command-words\//);
  assert.match(files.get("guides/command-words/index.html"), /<meta name="robots" content="max-image-preview:large">/);
  assert.doesNotMatch([...files].find(([, h]) => /noindex, follow/.test(h))[1], /max-image-preview/, "noindex pages keep just noindex");
  assert.match(await read("scripts/perf-check.cjs"), /LCP_MS/);
});

test("batch 5: cite this page, self-hosted fonts, speed buckets, deploy retry", async () => {
  const g = files.get("guides/command-words/index.html");
  assert.match(g, /<details class="cite no-print" id="cite">/);
  assert.match(g, /id="cite-apa">Gradify\. \(2026, November 23\)\. <i>Exam command words: what each one wants<\/i>\. https:\/\/getgradify\.com\/guides\/command-words\//);
  assert.doesNotMatch(files.get("tools/index.html"), /id="cite"/, "tools aren't cited");
  for (const [p, h] of files) if (p.endsWith(".html")) assert.doesNotMatch(h, /fonts\.googleapis\.com\/css2\?family=Geist/, `${p}: Geist is self-hosted`);
  assert.match(g, /rel="preload" href="\/assets\/fonts\/Geist-Variable\.woff2" as="font"/);
  const { bucket, clsOf } = await import("../kit/core/vitals.js");
  // Google's session windows: the worst burst counts, not the sum over a long-open page
  assert.equal(clsOf([{ startTime: 0, value: 0.05 }, { startTime: 500, value: 0.05 }, { startTime: 20000, value: 0.04 }, { startTime: 60000, value: 0.04 }]), 0.1);
  assert.equal(clsOf([{ startTime: 0, value: 0.3, hadRecentInput: true }, { startTime: 100, value: 0.01 }]), 0.01, "shifts right after input don't count");
  assert.equal(clsOf([0, 900, 1800, 2700, 3600, 4500, 5400].map((t) => ({ startTime: t, value: 0.02 }))).toFixed(2), "0.12", "a window closes after 5 s");
  assert.deepEqual([bucket("lcp", 2500), bucket("lcp", 2501), bucket("lcp", 4001), bucket("inp", 199), bucket("inp", 450), bucket("cls", 0.3)], ["good", "ni", "poor", "good", "ni", "poor"]);
  const { VITALS_EVENTS } = await import("../kit/core/analytics.js");
  const mig = await read("supabase/migrations/20261123140000_page_events_vitals.sql");
  for (const e of VITALS_EVENTS) assert.ok(mig.includes(`'${e}'`), `${e} is allowed by the database`);
  const ci = await read(".github/workflows/ci.yml");
  assert.match(ci, /id: retry\n\s+if: steps\.deployment\.outcome == 'failure'/);
  assert.match(ci, /Check the live site serves this build/);
});

test("degree intelligence: headline, risks, ranked priorities and the next best action", () => {
  const today = new Date(2026, 10, 24);
  const rows = [
    { name: "Ecology", mark: "62", credits: "60", year: "2" }, { name: "Genetics", mark: "64", credits: "60", year: "2" },
    { name: "Field skills", mark: "70", credits: "20", year: "3" }, { name: "Neuro", mark: "68", credits: "20", year: "3" },
    { name: "Dissertation", mark: "", credits: "40", year: "3", due: "2027-04-20" },
    { name: "Stats exam", mark: "", credits: "20", year: "3", due: "2026-11-28" },
    { name: "Policy essay", mark: "", credits: "20", year: "3" },
  ];
  const r = degreeIntel(rows, 60, today);
  assert.equal(r.cls.short, "2:1");
  assert.equal(r.headline, "You're on track for a 2:1.");
  assert.ok(r.insights.some((i) => i.kind === "chance" && /A First is still possible, but needs 77\.5%/.test(i.text)), "First: 77.5% needed on the rest");
  // ranked by share × urgency: the stats exam (10% of the degree, due in 4 days) beats the dissertation (20%, months away)
  assert.deepEqual(r.priorities.map((p) => p.name), ["Stats exam", "Dissertation", "Policy essay"]);
  assert.equal(r.priorities[0].days, 4); assert.equal(r.priorities[0].minutes, 90);
  assert.ok(Math.abs(r.priorities[1].share - 20) < 1e-9, "a 40-credit final-year module is 20% of a 40/60 degree");
  assert.match(r.priorities[0].reason, /^Worth 10% of your whole degree, your biggest lever right now: every extra 10 marks here adds 1 to your final average\. It's due in 4 days\. For a First, you need 77\.5% across everything left, this included\.$/);
  assert.equal(r.next.text, "Spend 90 minutes on Stats exam today.");
  assert.equal(r.unlisted, 0, "everything still to come is listed");
    assert.ok(r.insights.some((i) => i.kind === "trend"), "final year above year 2");
  assert.equal(r.projection, null, "year 2 is complete, so the estimate would only repeat the average");
  assert.doesNotMatch(r.priorities[1].reason, /For a First/, "the target line is said once, on the top priority");
  const est = degreeIntel([{ mark: "55", credits: "60", year: "2" }, { mark: "72", credits: "60", year: "3" }], 60, today);
  assert.ok(est.projection && est.projection.basis === "final-year" && est.projection.avg > est.t.average, "half of each year marked: the final-year pace lifts the estimate");

  // 10 more marks on a 10%-of-the-degree piece adds exactly 1 point to the final average
  const full = (stats) => rows.map((x) => ({ ...x, mark: x.name === "Stats exam" ? stats : x.mark || "65" }));
  assert.ok(Math.abs(degreeTracker(full("70"), 60).average - degreeTracker(full("60"), 60).average - 1) < 1e-9, "with everything marked, 10 more marks on it is +1");
  assert.equal(r.priorities[0].perTen, 1);

  const none = degreeIntel([{ mark: "55", credits: "120", year: "2" }], 60, today);
  assert.equal(none.priorities.length, 0); assert.equal(none.next.text, "Add the modules you still have to do.");
  assert.ok(none.unlisted > 59 && none.insights.some((i) => i.kind === "gap"), "the unlisted final year is flagged");

  const atRisk = degreeIntel([{ mark: "61", credits: "120", year: "2" }, { mark: "52", credits: "60", year: "3" }], 60, today);
  assert.ok(atRisk.insights.some((i) => i.kind === "risk"), "holding a 2:1 needs a step up");
  assert.equal(degreeIntel([], 60, today).next, null);
});

test("every sitemap URL is a real, indexable page: canonical to itself, no noindex or redirect, a description, a unique title", async () => {
  const titles = new Map();
  for (const u of await sitemapUrls()) {
    let p = u.replace("https://getgradify.com/", ""); if (p === "" || p.endsWith("/")) p += "index.html";
    const html = await read(p);
    assert.equal(html.match(/<link rel="canonical" href="([^"]+)"/)?.[1], u, `${p}: canonical must be its own URL`);
    assert.doesNotMatch(html, /<meta name="robots" content="noindex/, `${p}: noindex page in the sitemap`);
    assert.doesNotMatch(html, /http-equiv="refresh"/i, `${p}: redirect page in the sitemap`);
    assert.match(html, /<meta name="description" content="[^"]{30,}"/, `${p}: description`);
    const t = html.match(/<title>([^<]*)<\/title>/)?.[1];
    assert.ok(t && !titles.has(t), `${p}: title "${t}" also on ${titles.get(t)}`); titles.set(t, p);
  }
});
