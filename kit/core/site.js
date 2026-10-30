// Which Gradify site a page belongs to. Every sub-site lives in its own folder on
// getgradify.com (getgradify.com/medgradify/), so a page can say which site it is with
// <meta name="gradify-site" content="MedGradify">, or it's worked out from the folder.
// getgradify.com's own pages belong to no single site: that's LifeOS, the whole family.
import { GROUPS } from "./sites.js";
import { SITE as CONFIG_SITE } from "../../gradify.config.js";
import { lum, mix } from "./colour.js";

export const SITES = GROUPS.flatMap((g) => g.items);
// "MedGradify" → "medgradify", "TechGradify · ForgeLab" → "techgradify"
export const slugOf = (s) => (typeof s === "string" ? s : s.n).split(" · ")[0].toLowerCase().replace(/[^a-z0-9]+/g, "");
// the sub-site's home on getgradify.com
export const pathOf = (s) => `/${slugOf(s)}/`;

export function currentSite() {
  if (typeof document === "undefined") return CONFIG_SITE || null;
  const meta = document.querySelector('meta[name="gradify-site"]')?.content;
  if (meta && SITES.some((s) => s.n === meta)) return meta;
  if (CONFIG_SITE) return CONFIG_SITE;
  const folder = location.pathname.split("/").filter(Boolean)[0];
  return SITES.find((s) => folder && slugOf(s) === folder)?.n || null;
}

// A site's accent colour for text on the dark background: its brand colour, or for darker
// colours the lighter end of its own icon tile (the same mix tile() uses), so it stays readable.
export const accentOf = (s) => (lum(s.c) < 0.15 ? mix(s.c, 0.28) : `#${s.c}`);
// A site's name with its first word in the accent colour: "<Med>Gradify", "<Tech>Gradify · ForgeLab"
export function nameHtml(s) {
  const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const m = s.n.match(/^(.+?)(Gradify.*)$/);
  const [first, rest] = m ? [m[1], m[2]] : [s.n.split(" ")[0], s.n.slice(s.n.split(" ")[0].length)];
  // one wrapper, so a flex container (like the top bar) doesn't put a gap inside the name
  return `<span class="site-name"><span class="site-accent" style="color:${accentOf(s)}">${esc(first)}</span>${esc(rest)}</span>`;
}
