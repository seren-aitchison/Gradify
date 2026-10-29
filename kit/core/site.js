// Which Gradify site a page belongs to. Every sub-site lives in its own folder on
// getgradify.com (getgradify.com/medgradify/), so a page can say which site it is with
// <meta name="gradify-site" content="MedGradify">, or it's worked out from the folder.
// getgradify.com's own pages belong to no single site: that's LifeOS, the whole family.
import { GROUPS } from "./sites.js";
import { SITE as CONFIG_SITE } from "../../gradify.config.js";

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
