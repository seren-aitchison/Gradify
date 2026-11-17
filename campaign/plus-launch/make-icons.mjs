// Draws the email's icons as SVG (campaign/plus-launch/icons/) and renders each to a PNG in assets/email/ with
// headless Chrome, because Gmail and Outlook don't show SVG. Run from the repo root: node campaign/plus-launch/make-icons.mjs
// Glass tiles use the app's Lucide icons (kit/icons3d/gradify.js, ISC) and its tone colours (kit/app/app.css).
import { writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { tmpdir } from "node:os";
const ICONS = (await import(resolve("kit/icons3d/gradify.js"))).default;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const TONES = { indigo: ["#4641ff", "#6a5cff"], pink: ["#c0359f", "#f055dd"], orange: ["#e04a00", "#ff7a1a"], teal: ["#0c7c6c", "#1fae8c"], violet: ["#7b3cff", "#b06bff"] };

// a black Liquid Glass tile, tinted with a tone, with a white line icon
const tile = (name, tone) => {
  const [a, b] = TONES[tone];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
  <defs>
    <linearGradient id="t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}" stop-opacity=".55"/><stop offset="1" stop-color="${b}" stop-opacity=".2"/></linearGradient>
    <linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset=".5" stop-color="#fff" stop-opacity=".04"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset=".55" stop-color="${b}" stop-opacity=".35"/><stop offset="1" stop-color="${a}" stop-opacity=".7"/></linearGradient>
  </defs>
  <rect x="1" y="1" width="46" height="46" rx="13" fill="#0a0a0d"/>
  <rect x="1" y="1" width="46" height="46" rx="13" fill="url(#t)"/>
  <rect x="1" y="1" width="46" height="46" rx="13" fill="url(#s)"/>
  <rect x="1.5" y="1.5" width="45" height="45" rx="12.5" fill="none" stroke="url(#r)" stroke-width="1"/>
  <g transform="translate(12 12)" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name].d}</g>
</svg>`;
};
// white brand glyphs for the header buttons, drawn simply (24 × 24)
const GLYPHS = {
  tiktok: `<path fill="#fff" d="M16.6 5.8A4.3 4.3 0 0 1 15.5 2h-3.3v13.2a2.7 2.7 0 1 1-2.7-2.7c.3 0 .6 0 .8.1V9.2a6 6 0 1 0 5.2 6V8.4a7.6 7.6 0 0 0 4.5 1.4V6.6a4.5 4.5 0 0 1-3.4-.8Z"/>`,
  discord: `<defs><mask id="m"><rect width="24" height="24" fill="#fff"/><ellipse cx="8.9" cy="12.6" rx="1.8" ry="2" fill="#000"/><ellipse cx="15.1" cy="12.6" rx="1.8" ry="2" fill="#000"/></mask></defs>
  <path mask="url(#m)" fill="#fff" d="M19.6 5.3A16.5 16.5 0 0 0 15.5 4l-.5 1.1a15.3 15.3 0 0 0-6 0L8.5 4a16.5 16.5 0 0 0-4.1 1.3C1.8 9.2 1.1 13 1.4 16.8A16.6 16.6 0 0 0 6.5 19.4l1.1-1.7a10.8 10.8 0 0 1-1.7-.8l.4-.3a11.8 11.8 0 0 0 11.4 0l.4.3a10.8 10.8 0 0 1-1.7.8l1.1 1.7a16.6 16.6 0 0 0 5.1-2.6c.4-4.4-.7-8.2-3-11.5Z"/>`,
  globe: `<g fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS.globe.d}</g>`,
};
const glyph = (k) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">${GLYPHS[k]}</svg>`;

const out = { // file name: [svg, size in px]
  "icon-plan": [tile("wand-sparkles", "indigo"), 96], "icon-readiness": [tile("gauge", "pink"), 96], "icon-exams": [tile("timer", "orange"), 96],
  "icon-calendar": [tile("calendar-clock", "teal"), 96], "icon-devices": [tile("refresh-cw", "violet"), 96],
  "widget-sparkles": [tile("sparkles", "indigo"), 96], "widget-flame": [tile("flame", "orange"), 96], "widget-calendar": [tile("calendar-days", "pink"), 96], "widget-layers": [tile("layers", "teal"), 96],
  "social-tiktok": [glyph("tiktok"), 48], "social-discord": [glyph("discord"), 48], "social-web": [glyph("globe"), 48],
};
mkdirSync("assets/email", { recursive: true });
const tmp = resolve(tmpdir(), "gradify-email-icons"); mkdirSync(tmp, { recursive: true });
for (const [name, [svg, px]] of Object.entries(out)) {
  const src = resolve("campaign/plus-launch/icons", `${name}.svg`); writeFileSync(src, svg);
  const page = resolve(tmp, `${name}.html`);
  writeFileSync(page, `<html><body style="margin:0;background:transparent"><img src="file://${src}" width="${px}" height="${px}" style="display:block"></body></html>`);
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--default-background-color=00000000", `--window-size=${px},${px}`, `--screenshot=${resolve("assets/email", `${name}.png`)}`, `file://${page}`], { stdio: "ignore" });
  console.log(name);
}
