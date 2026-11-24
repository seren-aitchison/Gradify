// A speed guard for the page templates: loads representative pages as a throttled mid-range phone and fails if largest contentful
// paint or cumulative layout shift is worse than Google's "good" thresholds. With 2,000+ generated pages sharing a
// few templates, one CSS or script regression would hit every page at once.
//   node scripts/perf-check.cjs                 serves the repository itself, gzipped like GitHub Pages (CI runs this)
//   BASE=https://getgradify.com node scripts/perf-check.cjs     measures a live site instead
const { chromium, devices } = require("playwright");
const http = require("node:http"), fs = require("node:fs"), path = require("node:path"), zlib = require("node:zlib");
const ROOT = path.join(__dirname, "..");
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".xml": "application/xml", ".txt": "text/plain", ".webmanifest": "application/manifest+json", ".woff2": "font/woff2" };
/** a static server that compresses text the way GitHub Pages does, so transfer sizes (and LCP) are realistic */
function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let f = path.join(ROOT, decodeURIComponent(new URL(req.url, "http://x").pathname));
      if (!f.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
      if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
      if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
      const type = TYPES[path.extname(f)] || "application/octet-stream", body = fs.readFileSync(f);
      const gz = /text|javascript|json|xml|svg/.test(type) && /gzip/.test(req.headers["accept-encoding"] || "");
      res.writeHead(200, { "content-type": type, ...(gz ? { "content-encoding": "gzip" } : {}) });
      res.end(gz ? zlib.gzipSync(body) : body);
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}
const PAGES = ["/", "/lessons/biology/u02-04/", "/scigradify/biology/", "/tools/", "/tools/cram-planner/", "/topics/biology/u02/", "/guides/command-words/", "/vs/mitosis-vs-meiosis/", "/terms/saturation/", "/checklists/exam-day/", "/research/", "/medgradify/"];
const LCP_MS = Number(process.env.LCP_MS || 2500), CLS_MAX = Number(process.env.CLS_MAX || 0.1);

(async () => {
  const server = process.env.BASE ? null : await serve();
  const BASE = process.env.BASE || `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...devices["Pixel 7"] });
  let failed = 0;
  for (const path of PAGES) {
    const page = await ctx.newPage();
    // a mid-range phone on mobile 4G: CPU 4× slower, 150 ms round trips, about 1.6 Mbps down (like Lighthouse's mobile run)
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
    await page.addInitScript(() => {
      window.__cls = 0; window.__lcp = 0;
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver((l) => { const e = l.getEntries().at(-1); if (e) window.__lcp = e.renderTime || e.loadTime || e.startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
    });
    const res = await page.goto(BASE + path, { waitUntil: "load" });
    await page.waitForTimeout(1500);
    const { cls, lcp } = await page.evaluate(() => ({ cls: window.__cls, lcp: window.__lcp }));
    const ok = res?.ok() && lcp <= LCP_MS && cls <= CLS_MAX;
    if (!ok) failed++;
    console.log(`${ok ? "✓" : "✗"} ${path}  LCP ${Math.round(lcp)} ms  CLS ${cls.toFixed(3)}${res?.ok() ? "" : `  HTTP ${res?.status()}`}`);
    await page.close();
  }
  await browser.close(); server?.close();
  console.log(failed ? `\n${failed} page(s) over the limits (LCP ${LCP_MS} ms, CLS ${CLS_MAX})` : `\nAll ${PAGES.length} pages within LCP ${LCP_MS} ms and CLS ${CLS_MAX}`);
  process.exit(failed ? 1 : 0);
})();
