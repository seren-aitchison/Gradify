// Browser accessibility check, the part static analysis can't do: text contrast and visible keyboard focus.
// For each built site's homepage and course page, in a real Chromium:
//   contrast  every visible text element in the first 2,700px against the pixels actually painted behind it
//             (a screenshot with all text made transparent), against WCAG 2.2 AA: 4.5:1, or 3:1 for large text.
//             Gradient-filled text has no single colour and is skipped.
//   focus     tab through the first 25 focus stops; each must show a visible indicator (outline or ring).
// Writes docs/qa/a11y-browser.json, which scripts/qa-audit.mjs reads for 4 of the 10 accessibility points.
// Needs Playwright with Chromium.
//   npm run serve                      (in one terminal)
//   node scripts/check-a11y.cjs        (BASE=http://localhost:8080 by default)
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const BASE = process.env.BASE || "http://localhost:8080";

// contrast from pixels: note every visible text element and its colour, screenshot the page with all text made
// transparent, then sample what is actually painted behind each element (gradients and images included)
async function measure(page) {
  const H = 2700;
  const items = await page.evaluate((H) => {
    const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r, g, b, a }; };
    const out = [];
    for (const el of document.querySelectorAll("body *")) {
      if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1)) continue;
      const r = el.getBoundingClientRect(), cs = getComputedStyle(el), y = r.top + scrollY;
      if (r.width < 4 || r.height < 4 || cs.visibility === "hidden" || Number(cs.opacity) === 0 || y < 0 || y + r.height > H || r.left < 0 || r.right > innerWidth) continue;
      if (el.closest("[aria-hidden=true], svg, canvas, [hidden]")) continue;
      const fg = parse(cs.webkitTextFillColor || cs.color);
      const size = parseFloat(cs.fontSize), bold = Number(cs.fontWeight) >= 700;
      out.push({ x: r.left, y, w: r.width, h: r.height, fg, gradient: !fg || fg.a === 0, large: size >= 24 || (bold && size >= 18.66), text: el.textContent.trim().slice(0, 50) });
    }
    return out;
  }, H);
  await page.addStyleTag({ content: "*, *::before, *::after { color: transparent !important; -webkit-text-fill-color: transparent !important; text-shadow: none !important; caret-color: transparent !important; animation-play-state: paused !important; }" }).then((h) => (page._a11yStyle = h));
  await page.waitForTimeout(200);
  const height = Math.min(H, await page.evaluate(() => document.documentElement.scrollHeight));
  const png = (await page.screenshot({ fullPage: true, clip: { x: 0, y: 0, width: page.viewportSize().width, height } })).toString("base64");
  await page.evaluate(() => document.querySelectorAll("style").forEach((s) => { if (s.textContent.includes("animation-play-state: paused")) s.remove(); }));
  return page.evaluate(async ({ png, items }) => {
    const img = new Image(); img.src = `data:image/png;base64,${png}`; await img.decode();
    const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const g = c.getContext("2d", { willReadFrequently: true }); g.drawImage(img, 0, 0);
    const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const out = { checked: 0, pass: 0, skipped: 0, fails: [] };
    for (const it of items) {
      if (it.gradient) { out.skipped++; continue; }
      // the background is the median-luminance pixel of a grid over the element's box
      const px = [];
      for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
        const x = Math.min(c.width - 1, Math.round(it.x + (it.w * (i + 0.5)) / 5)), y = Math.min(c.height - 1, Math.round(it.y + (it.h * (j + 0.5)) / 5));
        const [r, gg, b] = g.getImageData(x, y, 1, 1).data; px.push({ r, g: gg, b });
      }
      px.sort((a, b) => lum(a) - lum(b));
      const bg = px[12], f = { r: it.fg.r * it.fg.a + bg.r * (1 - it.fg.a), g: it.fg.g * it.fg.a + bg.g * (1 - it.fg.a), b: it.fg.b * it.fg.a + bg.b * (1 - it.fg.a) };
      const L1 = lum(f), L2 = lum(bg), ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      out.checked++;
      if (ratio >= (it.large ? 3 : 4.5)) out.pass++;
      else if (out.fails.length < 8) out.fails.push({ text: it.text, ratio: Math.round(ratio * 100) / 100, need: it.large ? 3 : 4.5 });
    }
    return out;
  }, { png, items });
}

async function focus(page) {
  const out = { stops: 0, visible: 0, fails: [] };
  await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo(0, 0); });
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press("Tab");
    const r = await page.evaluate(() => {
      const el = document.activeElement; if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      const ring = (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) || (cs.boxShadow && cs.boxShadow !== "none");
      return { tag: el.tagName.toLowerCase(), label: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 40), ring };
    });
    if (!r) break;
    out.stops++; if (r.ring) out.visible++; else if (out.fails.length < 6) out.fails.push(`${r.tag} "${r.label}"`);
  }
  return out;
}

(async () => {
  const { SITES, slugOf } = await import("../kit/core/site.js");
  const b = await chromium.launch();
  const results = {};
  for (const s of SITES.filter((x) => x.built)) {
    const slug = slugOf(s), urls = [`${slug}/`];
    for (const sub of ["course/", "physics/", "body.html"]) if (fs.existsSync(path.join(__dirname, "..", slug, sub, sub.endsWith("/") ? "index.html" : ""))) urls.push(`${slug}/${sub}`);
    results[s.n] = [];
    for (const u of urls) {
      const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
      try {
        await p.goto(`${BASE}/${u}`, { waitUntil: "load", timeout: 30000 }); await p.waitForTimeout(1500);
        results[s.n].push({ url: u, contrast: await measure(p), focus: await focus(p) });
      } catch (e) { results[s.n].push({ url: u, error: e.message.split("\n")[0] }); }
      await p.close();
    }
    const c = results[s.n].reduce((a, r) => a + (r.contrast?.pass || 0), 0), n = results[s.n].reduce((a, r) => a + (r.contrast?.checked || 0), 0);
    const fv = results[s.n].reduce((a, r) => a + (r.focus?.visible || 0), 0), fs_ = results[s.n].reduce((a, r) => a + (r.focus?.stops || 0), 0);
    console.log(`${s.n}: contrast ${c}/${n}, focus visible ${fv}/${fs_}`);
  }
  await b.close();
  const file = path.join(__dirname, "..", "docs", "qa", "a11y-browser.json");
  fs.writeFileSync(file, JSON.stringify({ date: new Date().toISOString().slice(0, 10), base: BASE, results }, null, 1) + "\n");
  console.log(`Wrote ${path.relative(process.cwd(), file)}`);
})();
