// Render built diagrams in a real browser and flag text a learner could not read: any <text> that runs outside the
// picture, or that prints over another piece of text. Both layouts (wide and narrow) of every SVG are checked.
// Usage: node scripts/diagrams/legibility.cjs [idFilter]   (exit 1 if anything is flagged)
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const DIR = path.resolve(__dirname, "../../kit/diagrams/svg");
const only = process.argv[2] || "";
const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".svg") && f.includes(only)).sort();

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let flagged = 0;
  for (const f of files) {
    await page.setContent(`<!doctype html><body style="margin:0;font-family:system-ui,sans-serif">${fs.readFileSync(path.join(DIR, f), "utf8")}</body>`);
    const issues = await page.evaluate(() => {
      const svg = document.querySelector("svg"), vb = svg.viewBox.baseVal, out = [];
      const boxes = [...svg.querySelectorAll("text")].map((t) => {
        const b = t.getBBox(), m = t.getCTM(), p = svg.createSVGPoint();
        const pts = [[b.x, b.y], [b.x + b.width, b.y], [b.x, b.y + b.height], [b.x + b.width, b.y + b.height]].map(([x, y]) => { p.x = x; p.y = y; const q = p.matrixTransform(m.multiply(svg.getCTM().inverse())); return [q.x, q.y]; });
        const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]);
        return { s: t.textContent, x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
      }).filter((b) => b.s.trim());
      for (const b of boxes) if (b.x0 < vb.x - 1 || b.y0 < vb.y - 1 || b.x1 > vb.x + vb.width + 1 || b.y1 > vb.y + vb.height + 1) out.push(`outside the picture: "${b.s}"`);
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i], c = boxes[j], w = Math.min(a.x1, c.x1) - Math.max(a.x0, c.x0), h = Math.min(a.y1, c.y1) - Math.max(a.y0, c.y0);
        // more than a sliver of shared area (glyph boxes include some empty space above and below)
        if (w > 2 && h > Math.min(a.y1 - a.y0, c.y1 - c.y0) * 0.35) out.push(`overprints: "${a.s}" and "${c.s}"`);
      }
      return out;
    });
    if (issues.length) { flagged++; console.log(`${f}\n  ${issues.join("\n  ")}`); }
  }
  await browser.close();
  console.log(`${files.length} SVGs checked, ${flagged} with text problems`);
  process.exit(flagged ? 1 : 0);
})();
