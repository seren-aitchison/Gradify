// The subject-site header's behaviour (the markup is written into every page of a site by scripts/sync-headers.mjs):
// the site's icon and coloured name, Gradify-wide search, the phone menu (kit/core/subnav.js, through site.js) and the
// "More" list closing like a menu. The same on every page, so a site's header doesn't change as you move around it.
import { SITES, currentSite, nameHtml, accentOf } from "./site.js";
import { icon } from "./icons.js";
import { tile, ink } from "./colour.js";
import { mountGlobalNav } from "../ui/global-nav.js";

const bar = document.querySelector("header.sub-nav");
const site = SITES.find((s) => s.n === currentSite());

if (bar && !bar.dataset.wired) {
  bar.dataset.wired = "1";
  if (site) {
    document.body.style.setProperty("--accent", accentOf(site));
    const ic = bar.querySelector(".sub-brand .icon");
    if (ic && !ic.innerHTML.trim()) { ic.innerHTML = icon(site.i); ic.style.cssText = `--c:#${site.c};--tile:${tile(site.c)};--ink:${ink(site.c)}`; }
    bar.querySelectorAll("[data-site-name]").forEach((n) => { if (!n.querySelector(".site-name")) n.innerHTML = nameHtml(site); });
  }
  // search every Gradify site from the header; a course page has its own lesson search (and "/" for it), so it keeps that
  if (!document.getElementById("course") && !bar.querySelector(".gx-searchbtn")) mountGlobalNav({ site: site?.n || null, button: bar.querySelector(".sub-right") });
  // "More" behaves like a menu: one open at a time, closed by Escape, a click elsewhere, or choosing an item
  const more = bar.querySelector(".sub-more");
  if (more) {
    document.addEventListener("click", (e) => { if (more.open && !e.target.closest(".sub-more")) more.open = false; });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && more.open) { more.open = false; more.querySelector("summary").focus(); } });
    more.addEventListener("click", (e) => { if (e.target.closest("a")) more.open = false; });
  }
}
