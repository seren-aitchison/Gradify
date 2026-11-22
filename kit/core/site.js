// Which Gradify site a page belongs to. Every sub-site lives in its own folder on
// getgradify.com (getgradify.com/medgradify/), so a page can say which site it is with
// <meta name="gradify-site" content="MedGradify">, or it's worked out from the folder.
// getgradify.com's own pages belong to no single site: that's LifeOS, the whole family.
import { esc } from "./text.js";
import { GROUPS } from "./sites.js";
import { SITE as CONFIG_SITE } from "../../gradify.config.js";
import { lum, mix } from "./colour.js";
import { mountSubNav } from "./subnav.js";

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

// A site's accent colour for text on the dark background: its brand colour, lightened (towards white, keeping its
// hue) only as far as it takes to reach 5.5:1 on the dark top bar: WCAG AA's 4.5:1 with room for the coloured light
// behind the glass.
const ON_BAR = lum("16161a");
export const accentOf = (s) => {
  for (let t = 0; t < 0.9; t += 0.04) { const c = t ? mix(s.c, t) : `#${s.c}`; if ((lum(c.slice(1)) + 0.05) / (ON_BAR + 0.05) >= 5.5) return c; }
  return mix(s.c, 0.9);
};
// the same for the light top bar: darkened (towards black, keeping its hue) until it reaches 5.5:1 on near-white
const ON_LIGHT = lum("f4f4f8");
const shade = (h, t) => "#" + [0, 2, 4].map((i) => Math.round(parseInt(h.slice(i, i + 2), 16) * (1 - t)).toString(16).padStart(2, "0")).join("");
export const accentOnLight = (s) => {
  for (let t = 0; t < 0.9; t += 0.04) { const c = t ? shade(s.c, t) : `#${s.c}`; if ((ON_LIGHT + 0.05) / (lum(c.slice(1)) + 0.05) >= 5.5) return c; }
  return shade(s.c, 0.9);
};
// A site's name with its first word in the accent colour: "<Med>Gradify", "<Tech>Gradify · ForgeLab"
export function nameHtml(s) {
  const m = s.n.match(/^(.+?)(Gradify.*)$/);
  const [first, rest] = m ? [m[1], m[2]] : [s.n.split(" ")[0], s.n.slice(s.n.split(" ")[0].length)];
  // one wrapper, so a flex container (like the top bar) doesn't put a gap inside the name
  return `<span class="site-name"><span class="site-accent" style="color:${accentOf(s)};--acc-l:${accentOnLight(s)}">${esc(first)}</span>${esc(rest)}</span>`;
}

// every page with a sub-site header imports this module, so its phone and tablet menu is mounted here
if (typeof document !== "undefined" && document.querySelector) mountSubNav(document);
// offline support from any page a learner arrives at, not only the homepage (the worker at the site root covers every page)
if (typeof navigator !== "undefined" && "serviceWorker" in navigator && typeof addEventListener === "function") addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
