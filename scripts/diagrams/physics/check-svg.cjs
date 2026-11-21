// Render-check built diagrams in a real browser: every <text> inside the viewBox and not overprinting another
// <text>, at both widths, plus a PNG of each layout to look at.
//
//   node scripts/diagrams/physics/check-svg.cjs phys-u01 [outDir]     every kit/diagrams/svg/phys-u01*.svg
//   node scripts/diagrams/physics/check-svg.cjs path/to/a.svg …        given files
//
// PNGs go to outDir (default /tmp/vx-shots). Exits 1 if any label is outside the picture or overlaps another.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../../..");
const SVG = path.join(ROOT, "kit/diagrams/svg");
const args = process.argv.slice(2);
const files = args[0] && args[0].endsWith(".svg") ? args.filter((a) => a.endsWith(".svg")) : fs.readdirSync(SVG).filter((f) => f.startsWith(args[0] || "phys-") && f.endsWith(".svg")).map((f) => path.join(SVG, f));
const OUT = (args[0] && !args[0].endsWith(".svg") && args[1]) || "/tmp/vx-shots";

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 1.5 });
  let bad = 0;
  for (const f of files) {
    const svg = fs.readFileSync(f, "utf8");
    await page.setContent(`<!doctype html><html><body style="margin:0;background:#fff;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif">${svg}</body></html>`);
    const r = await page.evaluate(() => {
      const s = document.querySelector("svg"), vb = s.viewBox.baseVal, out = [], over = [];
      const boxes = [...s.querySelectorAll("text")].filter((t) => t.textContent.trim()).map((t) => ({ t: t.textContent.trim(), b: t.getBBox() }));
      for (const { t, b } of boxes) if (b.x < vb.x - 0.5 || b.y < vb.y - 0.5 || b.x + b.width > vb.x + vb.width + 0.5 || b.y + b.height > vb.y + vb.height + 0.5) out.push(t);
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i].b, b = boxes[j].b, sh = 1.5; // a small allowance: glyph boxes include line spacing
        if (a.x + sh < b.x + b.width && b.x + sh < a.x + a.width && a.y + sh < b.y + b.height && b.y + sh < a.y + a.height) over.push(`"${boxes[i].t}" / "${boxes[j].t}"`);
      }
      return { out, over, n: boxes.length };
    });
    const el = await page.$("svg");
    await el.screenshot({ path: path.join(OUT, path.basename(f).replace(".svg", ".png")) });
    const ok = !r.out.length && !r.over.length;
    bad += ok ? 0 : 1;
    console.log(`${ok ? "✓" : "✗"} ${path.basename(f).padEnd(44)} ${r.n} labels${r.out.length ? `; outside: ${r.out.join(", ")}` : ""}${r.over.length ? `; overlapping: ${r.over.slice(0, 6).join(", ")}${r.over.length > 6 ? ` (+${r.over.length - 6})` : ""}` : ""}`);
  }
  await browser.close();
  console.log(`${files.length} files, ${bad} with label problems; PNGs in ${OUT}`);
  process.exit(bad ? 1 : 0);
})();
