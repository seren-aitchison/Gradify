// The search pages (scripts/build-seo.mjs): up to date, published, in the sitemap, each with what search engines and
// link previews need; the free calculators' maths; the homepage's FAQ structured data matching what's on the page; and
// AI-assistant referrals being recognised.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { outputs, withHeadTags } from "../scripts/build-seo.mjs";
import { SEO_FOLDERS, SEO_FILES, INDEXNOW_KEY } from "../scripts/seo/folders.mjs";
import { PUBLISH } from "../scripts/build-site.mjs";
import { sitemapUrls } from "../scripts/build-sitemap.mjs";
import { creditMean, classify, degreeAverage, neededOnFinal, weighted, gpa, countdown, reviewDates, ics } from "../assets/study-tools.js";
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
  for (const p of files.keys()) {
    if (!p.endsWith(".html") || p.endsWith("embed.html") || !SEO_FOLDERS.includes(p.split("/")[0]) && !SEO_FILES.includes(p)) continue;
    assert.ok(urls.has(`https://getgradify.com/${p.replace(/(^|\/)index\.html$/, "$1")}`), `${p} isn't in the sitemap`);
  }
  assert.ok(![...urls].some((u) => u.endsWith("embed.html")), "the embed widget is noindex, so not in the sitemap");
});

test("each search page has one h1, a title, a description, a canonical URL, link previews and valid JSON-LD", () => {
  let n = 0;
  for (const [p, html] of files) {
    if (!p.endsWith(".html") || !(SEO_FOLDERS.includes(p.split("/")[0]) || SEO_FILES.includes(p)) || p.endsWith("embed.html")) continue;
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
  assert.match(p, /href="\/scigradify\/chemistry\/#\/lesson\/u01-02"/);
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
