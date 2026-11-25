// The diagram legibility check (scripts/diagrams/legibility.cjs) for SVGs in memory: text clipped by the edge of the
// picture, or overprinting other text. One browser for the whole run. Returns a function svgs → problems.
export async function legibility() {
  let pw; try { pw = await import("playwright"); } catch { pw = (await import("node:module")).createRequire(import.meta.url)("playwright"); }
  const { chromium } = pw;
  const browser = await chromium.launch(), page = await browser.newPage();
  const check = async (svgs) => {
    const problems = [];
    for (const svg of svgs) {
      await page.setContent(`<body style="margin:0;background:#fff;font-family:Inter,system-ui,sans-serif">${svg}</body>`);
      const r = await page.evaluate(() => {
        const s = document.querySelector("svg"), sb = s.getBoundingClientRect(), out = { clipped: [], overlap: [] };
        const ts = [...s.querySelectorAll("text")].filter((t) => t.textContent.trim()).map((t) => ({ t: t.textContent, b: t.getBoundingClientRect(), rot: !!t.closest("g[transform*=rotate]") }));
        for (const x of ts) if (x.b.left < sb.left - 1 || x.b.right > sb.right + 1 || x.b.top < sb.top - 1 || x.b.bottom > sb.bottom + 1) out.clipped.push(x.t);
        for (let i = 0; i < ts.length; i++) for (let j = i + 1; j < ts.length; j++) {
          const a = ts[i].b, b = ts[j].b; if (ts[i].rot || ts[j].rot) continue;
          const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
          if (ox > 2 && oy > 3) out.overlap.push(`${ts[i].t} / ${ts[j].t}`);
        }
        return out;
      });
      for (const t of r.clipped) problems.push(`label clipped: "${t.slice(0, 40)}"`);
      for (const t of r.overlap) problems.push(`labels overlap: ${t.slice(0, 60)}`);
    }
    return [...new Set(problems)];
  };
  check.close = () => browser.close();
  return check;
}
