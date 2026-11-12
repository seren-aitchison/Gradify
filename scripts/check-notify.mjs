// Browser check of the "Notify me" forms (homepage Pro section and pricing page), run on the working tree:
//   node scripts/check-notify.mjs
// Serves this folder on a free local port, opens each page in Chromium (Playwright), and tries every case: an invalid
// address, success, already on the list (409), a server error (500), a network failure, and a double click. Every
// request to the waitlist is intercepted and answered here, so nothing is ever written to the live list.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { createRequire } from "node:module";

const root = new URL("../", import.meta.url).pathname;
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png", ".json": "application/json", ".webmanifest": "application/manifest+json" };
const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
  try { const body = await readFile(join(root, path.endsWith("/") ? `${path}index.html` : path)); res.writeHead(200, { "Content-Type": TYPES[extname(path)] || "application/octet-stream" }); res.end(body); }
  catch { res.writeHead(404); res.end("not found"); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
const CASES = [
  { name: "invalid address", reply: 201, email: "not-an-email", sends: 0, hidden: false, msg: /valid email/ },
  { name: "success", reply: 201, email: "Learner@Example.com", sends: 1, hidden: true, msg: /when Gradify Pro opens/, sent: "learner@example.com" },
  { name: "already on the list", reply: 409, email: "learner@example.com", sends: 1, hidden: true, msg: /when Gradify Pro opens/ },
  { name: "server error", reply: 500, email: "a@b.co", sends: 1, hidden: false, msg: /didn't work/ },
  { name: "network failure", reply: "abort", email: "a@b.co", sends: 1, hidden: false, msg: /didn't work/ },
];
const failures = [];
for (const [page, form] of [["index.html", "#notify-pro"], ["pricing.html", "#notify"]]) {
  for (const c of CASES) {
    const p = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors = [], sent = [];
    p.on("pageerror", (e) => errors.push(e.message));
    // never reach the live database; answer slowly so a double click lands while the first request is in flight
    await p.route("**/rest/v1/waitlist", async (r) => { sent.push(JSON.parse(r.request().postData()).email); await new Promise((x) => setTimeout(x, 400)); c.reply === "abort" ? r.abort() : r.fulfill({ status: c.reply, body: "" }); });
    await p.route(/supabase\.co\/(?!rest\/v1\/waitlist)/, (r) => r.fulfill({ status: 200, body: "{}" }));
    await p.goto(`${base}/${page}`, { waitUntil: "load" });
    await p.waitForSelector(`${form} input`);
    await p.fill(`${form} input`, c.email);
    await p.click(`${form} button`);
    await p.click(`${form} button`, { timeout: 150 }).catch(() => {});   // a second click while busy
    await p.waitForTimeout(800);
    const msg = (await p.textContent(`${form} [role=status]`)).trim(), hidden = await p.$eval(`${form} .notify-row`, (x) => x.hidden);
    const problems = [];
    if (sent.length !== c.sends) problems.push(`sent ${sent.length} request(s), expected ${c.sends}`);
    if (c.sent && sent[0] !== c.sent) problems.push(`sent "${sent[0]}", expected "${c.sent}"`);
    if (hidden !== c.hidden) problems.push(`form ${hidden ? "hidden" : "still shown"}`);
    if (!c.msg.test(msg)) problems.push(`message "${msg}"`);
    if (errors.length) problems.push(`page errors: ${errors.join("; ")}`);
    console.log(`${problems.length ? "✗" : "✓"} ${page} · ${c.name}${problems.length ? `: ${problems.join(", ")}` : ` · "${msg}"`}`);
    if (problems.length) failures.push(`${page} ${c.name}`);
    await p.close();
  }
}
await browser.close(); server.close();
if (failures.length) { console.error(`\n${failures.length} case(s) failed`); process.exitCode = 1; }
else console.log("\nAll notify-me cases pass. No request reached the live waitlist.");
