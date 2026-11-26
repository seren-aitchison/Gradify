// gradify preview <subject> [--topic <subject/topic>] [--out <dir>]: filed lessons as learners would see them, drawn by
// the real course engine, without changing the repository. The engine's own publish runs into a scratch copy of the
// course (every filed lesson of the topic, any tier, labelled "Preview"); the site is served locally and the browser
// loads the course's files from that copy; each lesson is opened in the course app and captured at desktop and mobile
// widths, with any console errors and what the page drew (diagrams, questions, flashcards). Nothing is published.
import { cpSync, mkdtempSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { at } from "./lib.mjs";

const freePort = () => new Promise((res) => { const s = createServer(); s.listen(0, () => { const p = s.address().port; s.close(() => res(p)); }); });
/** the course page a subject's course lives on, from its course.js */
const pageOf = (subject) => readFileSync(at(`kit/courses/${subject}/course.js`), "utf8").match(/page:\s*"([^"]+)"/)?.[1] || ({ biology: "/scigradify/biology/", chemistry: "/scigradify/chemistry/", physics: "/scigradify/physics/" })[subject];

export async function preview(subject, { topic = null, outDir = null, log = () => {} } = {}) {
  const scratch = mkdtempSync(join(tmpdir(), "gradify-preview-"));
  cpSync(at(`kit/courses/${subject}/`).pathname, join(scratch, `kit/courses/${subject}/`), { recursive: true });
  for (const p of [`content/ledger/${subject}.json`, `content/drafts/${subject}/`]) if (existsSync(at(p))) cpSync(at(p).pathname, join(scratch, p), { recursive: true });
  // the engine's own publish, writing only into the scratch copy
  const was = process.env.GRADIFY_OUT; process.env.GRADIFY_OUT = scratch;
  let r; try { r = await (await import("./publish.mjs")).publish(subject, { preview: true, topic }); } finally { if (was === undefined) delete process.env.GRADIFY_OUT; else process.env.GRADIFY_OUT = was; }
  if (!r.unit) return { lessons: [], skipped: r.skipped, note: "no filed lessons to preview" };
  const P = JSON.parse(readFileSync(join(scratch, `kit/courses/${subject}/published.js`), "utf8").match(/PUBLISHED = (\{[\s\S]*\});/)[1]);
  const ids = Object.entries(P.ids).filter(([id]) => !topic || P.lessons[id]?.topic === topic);
  const port = await freePort(), server = spawn("python3", ["-m", "http.server", String(port), "--bind", "127.0.0.1"], { cwd: at("./").pathname, stdio: "ignore" });
  await new Promise((r2) => setTimeout(r2, 800));
  const outd = outDir || join(scratch, "shots"); mkdirSync(outd, { recursive: true });
  const { chromium, devices } = await import("playwright"), browser = await chromium.launch(), res = [];
  try {
    for (const [view, opts] of [["desktop", { viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 }], ["mobile", { ...devices["iPhone 13"] }]]) {
      const ctx = await browser.newContext(opts), courseDir = `/kit/courses/${subject}/`;
      // the course's files come from the scratch copy, so the preview unit exists only in this browser
      await ctx.route(`**${courseDir}**`, (route) => { const f = join(scratch, decodeURIComponent(new URL(route.request().url()).pathname)); return existsSync(f) ? route.fulfill({ path: f, contentType: "text/javascript" }) : route.continue(); });
      for (const [id, title] of ids) {
        const page = await ctx.newPage(), errors = [];
        page.on("pageerror", (e) => errors.push(e.message)); page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
        await page.goto(`http://127.0.0.1:${port}${pageOf(subject)}#/lesson/${id}`, { waitUntil: "networkidle" });
        await page.waitForTimeout(1200);
        const drew = await page.evaluate(() => ({ text: document.querySelector("main")?.innerText?.length || 0, svg: document.querySelectorAll("main svg, main img").length, questions: document.querySelectorAll("main [data-q], main .q, main .qn").length }));
        const file = join(outd, `${id}-${view}.png`); await page.screenshot({ path: file, fullPage: true });
        res.push({ id, title, view, file, errors, drew }); await page.close();
      }
      await ctx.close();
    }
  } finally { await browser.close(); server.kill(); }
  writeFileSync(join(outd, "preview.json"), JSON.stringify({ subject, topic, unit: r.unit, skipped: r.skipped, shots: res }, null, 1));
  return { scratch, out: outd, lessons: res, skipped: r.skipped };
}
