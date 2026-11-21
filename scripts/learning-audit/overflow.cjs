// List elements wider than a phone viewport on a course home. Usage: node scripts/learning-audit/overflow.cjs <path>
const { chromium } = require("playwright"); const fs = require("fs"); const path = require("path");
const ROOT = path.resolve(__dirname, "../.."); const T = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml" };
(async () => { const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route("**/*", (r) => { const u = new URL(r.request().url()); if (u.hostname !== "gradify.test") return r.abort(); let p = path.join(ROOT, decodeURIComponent(u.pathname)); if (p.endsWith("/")) p += "index.html"; if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) return r.fulfill({ status: 404, body: "" }); r.fulfill({ status: 200, body: fs.readFileSync(p), contentType: T[path.extname(p)] || "application/octet-stream" }); });
  const p = await ctx.newPage(); await p.goto(`http://gradify.test/${process.argv[2]}`); await p.waitForTimeout(3000);
  console.log(await p.evaluate(() => [...document.querySelectorAll("body *")].filter((e) => e.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(e).position !== "fixed").slice(0, 8).map((e) => `${e.tagName.toLowerCase()}.${[...e.classList].join(".")} right=${Math.round(e.getBoundingClientRect().right)}`).join("\n")));
  await b.close(); })();
