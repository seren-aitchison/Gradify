// Render built diagram SVGs in a browser and report <text> clipped by the viewBox or overprinting another <text>,
// and write PNG screenshots. Usage: node scripts/diagrams/legibility.cjs <idFilter> [outDir]
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "../..");
const only = process.argv[2] || "", OUT = path.resolve(process.argv[3] || "/tmp/vx-shots");
fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const browser = await chromium.launch(), page = await browser.newPage({ deviceScaleFactor: 1.5 });
  const dir = path.join(ROOT, "kit/diagrams/svg");
  let bad = 0;
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".svg") && f.includes(only)).sort()) {
    const svg = fs.readFileSync(path.join(dir, f), "utf8");
    await page.setContent(`<body style="margin:0;background:#fff;font-family:Inter,system-ui,sans-serif">${svg}</body>`);
    const r = await page.evaluate(() => {
      const s = document.querySelector("svg"), vb = s.viewBox.baseVal, sb = s.getBoundingClientRect(), out = { clipped: [], overlap: [] };
      const ts = [...s.querySelectorAll("text")].filter((t) => t.textContent.trim()).map((t) => ({ t: t.textContent, b: t.getBoundingClientRect(), rot: !!t.closest("g[transform*=rotate]") }));
      for (const x of ts) if (x.b.left < sb.left - 1 || x.b.right > sb.right + 1 || x.b.top < sb.top - 1 || x.b.bottom > sb.bottom + 1) out.clipped.push(x.t);
      for (let i = 0; i < ts.length; i++) for (let j = i + 1; j < ts.length; j++) {
        const a = ts[i].b, b = ts[j].b; if (ts[i].rot || ts[j].rot) continue;
        const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (ox > 2 && oy > 3) out.overlap.push(`${ts[i].t} / ${ts[j].t}`);
      }
      return out;
    });
    const png = path.join(OUT, f.replace(".svg", ".png"));
    await (await page.$("svg")).screenshot({ path: png });
    if (r.clipped.length || r.overlap.length) { bad++; console.log(`✗ ${f}${r.clipped.length ? `\n   clipped: ${r.clipped.join(" | ")}` : ""}${r.overlap.length ? `\n   overlap: ${r.overlap.join(" | ")}` : ""}`); }
  }
  console.log(bad ? `${bad} svg(s) with problems` : "no clipped or overprinted text");
  await browser.close();
  process.exit(bad ? 1 : 0);
})();
