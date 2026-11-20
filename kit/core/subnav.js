// The sub-site header on phones and tablets. Below 960px the header's links are hidden (kit/styles/subsite.css),
// and below 640px so are "Sign in", the button and the reading and theme settings, so this adds a menu button that
// opens all of them. The menu is built from the page's own header (scripts/sync-headers.mjs writes it, the same on
// every page of a site), including what's under "More". Mounted by kit/core/site.js, which every page with a
// sub-site header imports.
import { menuSettings } from "./menu-set.js";
const BARS = '<svg class="sm-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
const CROSS = '<svg class="sm-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

export function mountSubNav(doc = document) {
  const nav = doc.querySelector(".sub-nav");
  const links = nav?.querySelector(".sub-links"), right = nav?.querySelector(".sub-right");
  if (!links || !right || nav.querySelector(".sub-menu-btn")) return null;

  const menu = doc.createElement("nav");
  menu.className = "menu sub-menu";
  menu.id = "sub-menu";
  menu.hidden = true;
  menu.setAttribute("aria-label", `${links.getAttribute("aria-label") || "Site"} menu`);
  for (const a of links.querySelectorAll("a")) menu.append(a.cloneNode(true));
  const signin = right.querySelector(".signin");
  if (signin) { const s = signin.cloneNode(true); s.className = "sub-menu-signin"; menu.append(s); }
  const cta = right.querySelector(".sub-cta");
  if (cta) { const c = cta.cloneNode(true); c.classList.remove("btn-sm"); c.classList.add("sub-menu-cta"); menu.append(c); }

  const btn = doc.createElement("button");
  btn.type = "button";
  btn.className = "icon-btn menu-btn sub-menu-btn";
  btn.setAttribute("aria-controls", menu.id);
  const set = (open) => {
    menu.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  btn.innerHTML = BARS + CROSS;   // both icons stay in the button; CSS shows one (replacing them mid-click would detach the tapped icon)
  set(false);
  btn.addEventListener("click", () => set(menu.hidden));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
  doc.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { set(false); btn.focus(); } });
  doc.addEventListener("click", (e) => { if (!menu.hidden && !e.target.closest(".sub-menu, .sub-menu-btn")) set(false); });
  // focus moving elsewhere (Tab out of the menu, or into the page's search) closes it too, as a tap outside does
  doc.addEventListener("focusin", (e) => { if (!menu.hidden && !e.target.closest?.(".sub-menu, .sub-menu-btn")) set(false); });

  menuSettings(menu, { close: () => set(false), from: btn });
  right.append(btn);
  nav.append(menu);
  return { btn, menu, set };
}
