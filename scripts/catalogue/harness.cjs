// Catalogue performance and accessibility harness (Stage 2, deliverable 2.7). It builds fictional and synthetic
// catalogues at the volumes Stage 1 measured, serves them gzipped like GitHub Pages, and drives the reference search
// box (scripts/catalogue/harness/) in Chromium. It RECORDS what it measures and fails on any missed target; it never
// reports a target as met without measuring it.
//   - shard size: each region's search index, gzipped                               target ≤ 300 KB
//   - first results, warm: keystroke → options rendered, phone profile, CPU 4× slower  target p95 ≤ 100 ms
//   - first results, cold on slow 3G (400 ms round trip, 400 kbit/s): recorded; the loading message must show
//   - offline: a fresh reader finds results from the browser cache with the network off
//   - accessibility (automated only): axe-core with the list closed and open, and keyboard behaviour (arrows, Enter,
//     Escape, Home/End). Screen readers are checked by hand: docs/catalogue/MANUAL-ACCESSIBILITY.md.
//   node scripts/catalogue/harness.cjs [--out results.json] [--quick]
const { chromium, devices } = require("playwright");
const http = require("node:http"), fs = require("node:fs"), path = require("node:path"), zlib = require("node:zlib"), os = require("node:os");
const ROOT = path.join(__dirname, "..", "..");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json", ".css": "text/css" };
const SHARD_KB = 300, WARM_P95_MS = 100;
const args = process.argv.slice(2), OUT = args.includes("--out") ? args[args.indexOf("--out") + 1] : null, QUICK = args.includes("--quick");

// datasets: volumes from the Stage 1 report. "must" ones fail the run if a target is missed; "report" ones are recorded only.
const DATASETS = [
  { key: "fixtures", label: "Fixtures (fictional)", country: "GB", region: "ENG", n: null, gate: "must", query: "north" },
  { key: "ca668", label: "Large US state sample (California, IPEDS 668)", country: "US", region: "CA", n: 668, gate: "must", query: "hill" },
  { key: "us6072", label: "All IPEDS institutions in one shard (6,072)", country: "US", region: "ALL", n: 6072, gate: "must", query: "hill" },
  { key: "eng25k", label: "Large region, assumed 25,000 (England-scale; GIAS count not yet measured)", country: "GB", region: "ENG", n: 25000, gate: "must", query: "hill" },
  { key: "eng50k", label: "Stress, 50,000 in one shard (above any planned shard)", country: "GB", region: "ENG", n: 50000, gate: "report", query: "hill" },
].filter((d) => !QUICK || d.n === null || d.n <= 6072);
const QUERIES = ["n", "no", "nor", "north", "a", "ab", "abbey", "st", "saint m", "hill academy", "bridge", "zzz"];

function serve(builds) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
      let f;
      if (url.startsWith("/catalogue-build/")) { const [, , ds, ...rest] = url.split("/"); f = builds[ds] && path.join(builds[ds], ...rest); }
      else if (url.startsWith("/harness/")) f = path.join(ROOT, "scripts/catalogue/harness", url.slice(9));
      else if (url.startsWith("/kit/")) f = path.join(ROOT, url);
      if (!f || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
      const type = TYPES[path.extname(f)] || "application/octet-stream", body = fs.readFileSync(f);
      const gz = /gzip/.test(req.headers["accept-encoding"] || "");
      res.writeHead(200, { "content-type": type, "cache-control": "no-store", ...(gz ? { "content-encoding": "gzip" } : {}) });
      res.end(gz ? zlib.gzipSync(body) : body);
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}
const pct = (arr, p) => { const s = [...arr].sort((a, b) => a - b); return s.length ? s[Math.min(s.length - 1, Math.ceil((p / 100) * s.length) - 1)] : null; };
async function typeAndWait(page, text) {
  const before = await page.evaluate(() => window.__timings.length);
  await page.fill("#q", text);
  await page.waitForFunction((n) => window.__timings.length > n, before, { timeout: 120000 });
  return page.evaluate(() => window.__timings[window.__timings.length - 1]);
}
async function throttle(ctx, page, { cpu = 4, net = null } = {}) {
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
  if (net) { await cdp.send("Network.enable"); await cdp.send("Network.emulateNetworkConditions", { offline: false, ...net }); }
  return cdp;
}

(async () => {
  const { buildCatalogue, writeCatalogue } = await import("./build.mjs");
  const { synthBundle } = await import("./synth.mjs");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "gradify-catalogue-"));
  const builds = {};
  for (const d of DATASETS) {
    const bundle = d.n === null ? JSON.parse(fs.readFileSync(path.join(ROOT, "data/catalogue/fixtures/bundle.json"), "utf8")) : synthBundle(d.n, { country: d.country, region: d.region });
    builds[d.key] = path.join(tmp, d.key);
    writeCatalogue(buildCatalogue(bundle), builds[d.key]);
    const shard = fs.readFileSync(path.join(builds[d.key], "providers", d.country, d.region, "index.json"));
    d.shard_bytes = shard.length; d.shard_gzip_bytes = zlib.gzipSync(shard).length;
  }
  const server = await serve(builds), BASE = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const results = { run_at: new Date().toISOString(), environment: { node: process.version, platform: `${os.platform()} ${os.arch()}`, cpus: os.cpus().length, cpu_model: os.cpus()[0]?.model || "" }, targets: { shard_gzip_kb: SHARD_KB, warm_p95_ms: WARM_P95_MS }, datasets: [], accessibility: {}, failures: [] };
  const fail = (m) => results.failures.push(m);

  for (const d of DATASETS) {
    const url = `${BASE}/harness/index.html?ds=${d.key}&country=${d.country}&region=${d.region}`;
    const row = { key: d.key, label: d.label, gate: d.gate, providers: d.n ?? 9, shard_bytes: d.shard_bytes, shard_gzip_kb: +(d.shard_gzip_bytes / 1024).toFixed(1) };
    // warm: phone profile, CPU 4× slower; the first search loads the shard, the rest are measured
    {
      const ctx = await browser.newContext({ ...devices["Pixel 7"] }), page = await ctx.newPage();
      await page.goto(url); await throttle(ctx, page);
      const first = await typeAndWait(page, d.query);
      row.first_search_local_ms = Math.round(first.ms);
      const ms = [];
      for (const q of QUERIES) ms.push((await typeAndWait(page, q)).ms);
      row.warm_p50_ms = +pct(ms, 50).toFixed(1); row.warm_p95_ms = +pct(ms, 95).toFixed(1); row.warm_max_ms = +Math.max(...ms).toFixed(1);
      // offline: network off, a brand-new reader (empty memory) must still find results from the browser cache
      await ctx.setOffline(true);
      await page.evaluate(() => window.__newReader());
      const off = await typeAndWait(page, d.query);
      row.offline_results = off.n;
      await ctx.close();
    }
    // cold on slow 3G: nothing cached; the loading message must appear before results
    {
      const ctx = await browser.newContext({ ...devices["Pixel 7"] }), page = await ctx.newPage();
      await page.goto(url);
      await throttle(ctx, page, { net: { latency: 400, downloadThroughput: (400 * 1024) / 8, uploadThroughput: (400 * 1024) / 8 } });
      await page.evaluate(() => { window.__sawLoading = false; new MutationObserver(() => { if (/Loading/.test(document.getElementById("q-help").textContent)) window.__sawLoading = true; }).observe(document.getElementById("q-help"), { childList: true, subtree: true, characterData: true }); });
      const t0 = Date.now(); await typeAndWait(page, d.query);
      row.cold_slow3g_ms = Date.now() - t0;
      row.cold_loading_message = await page.evaluate(() => window.__sawLoading);
      await ctx.close();
    }
    row.pass_shard = row.shard_gzip_kb <= SHARD_KB;
    row.pass_warm = row.warm_p95_ms <= WARM_P95_MS;
    row.pass_offline = row.offline_results > 0;
    row.pass_loading = row.cold_loading_message === true;
    if (d.gate === "must") for (const k of ["pass_shard", "pass_warm", "pass_offline", "pass_loading"]) if (!row[k]) fail(`${d.key}: ${k} failed`);
    results.datasets.push(row);
    console.log(`${row.pass_shard && row.pass_warm && row.pass_offline && row.pass_loading ? "✓" : d.gate === "must" ? "✗" : "·"} ${d.label}: shard ${row.shard_gzip_kb} KB gz, warm p95 ${row.warm_p95_ms} ms, slow 3G ${row.cold_slow3g_ms} ms, offline ${row.offline_results} results`);
  }

  // accessibility, automated: axe-core (list closed and open) and keyboard behaviour, on the fixtures
  {
    const axeSource = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
    const runAxe = async (page) => { await page.addScriptTag({ content: axeSource }); return page.evaluate(async () => (await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] })).violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length }))); };
    for (const scheme of ["light", "dark"]) {
      const ctx = await browser.newContext({ colorScheme: scheme }), page = await ctx.newPage();
      await page.goto(`${BASE}/harness/index.html?ds=fixtures`);
      const closed = await runAxe(page);
      await typeAndWait(page, "north");
      await page.keyboard.press("ArrowDown");
      const open = await runAxe(page);
      results.accessibility[`axe_${scheme}`] = { closed, open };
      if (closed.length || open.length) fail(`axe (${scheme}): ${[...closed, ...open].map((v) => v.id).join(", ")}`);
      await ctx.close();
    }
    const ctx = await browser.newContext(), page = await ctx.newPage();
    await page.goto(`${BASE}/harness/index.html?ds=fixtures`);
    const k = {};
    await page.keyboard.press("Tab");
    k.tab_reaches_input = await page.evaluate(() => document.activeElement?.id === "q");
    await typeAndWait(page, "north");
    k.expanded_when_results = (await page.getAttribute("#q", "aria-expanded")) === "true";
    await page.keyboard.press("ArrowDown");
    k.arrow_down_highlights_first = (await page.getAttribute("#q", "aria-activedescendant")) === "opt-0" && (await page.getAttribute("#opt-0", "aria-selected")) === "true";
    await page.keyboard.press("ArrowUp");
    k.arrow_up_wraps_to_not_listed = (await page.evaluate(() => document.getElementById(document.getElementById("q").getAttribute("aria-activedescendant"))?.textContent || "")).startsWith("Not listed");
    await page.keyboard.press("Home"); await page.keyboard.press("End");
    k.home_end_keep_focus_in_input = await page.evaluate(() => document.activeElement?.id === "q");
    await page.keyboard.press("Escape");
    k.escape_closes_list_keeps_text = (await page.getAttribute("#q", "aria-expanded")) === "false" && (await page.inputValue("#q")) === "north";
    await typeAndWait(page, "north");
    await page.keyboard.press("ArrowDown"); await page.keyboard.press("Enter");
    k.enter_chooses_catalogue_record = /^g[a-z]_/.test(await page.getAttribute("[data-chosen]", "data-id") || "");
    await typeAndWait(page, "My own school");
    await page.keyboard.press("ArrowUp"); await page.keyboard.press("Enter");
    k.not_listed_links_nothing = (await page.getAttribute("[data-chosen]", "data-id")) === "" && (await page.inputValue("#q")) === "My own school";
    k.status_announced = /not linked/.test(await page.textContent("#q-help"));
    results.accessibility.keyboard = k;
    for (const [name, ok] of Object.entries(k)) if (!ok) fail(`keyboard: ${name}`);
    await ctx.close();
  }
  results.accessibility.manual = "VoiceOver (macOS, iOS) and NVDA (Windows) are NOT automated: see docs/catalogue/MANUAL-ACCESSIBILITY.md for the procedure and recorded results.";

  await browser.close(); server.close(); fs.rmSync(tmp, { recursive: true, force: true });
  if (OUT) fs.writeFileSync(OUT, JSON.stringify(results, null, 2) + "\n");
  console.log(results.failures.length ? `\n✗ ${results.failures.length} failure(s):\n  ${results.failures.join("\n  ")}` : "\n✓ every gated target met (automated checks only)");
  process.exit(results.failures.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
