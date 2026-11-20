// The hub header's behaviour (the markup is written into each page by scripts/sync-headers.mjs): the menu on phones,
// Gradify-wide search (⌘K or "/"), and "Sign in" becoming "Account" for someone signed in. The same on every hub
// page, so nothing in the header depends on which page you're on.
import { mountGlobalNav } from "../ui/global-nav.js";
import { menuSettings } from "./menu-set.js";

const $ = (s) => document.querySelector(s);
const bar = $("header.hub-bar"), btn = $("#menu-btn"), menu = $("#menu");

if (bar && btn && menu && !bar.dataset.wired) {
  bar.dataset.wired = "1";
  const setMenu = (open) => {
    menu.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  btn.addEventListener("click", () => setMenu(menu.hidden));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { setMenu(false); btn.focus(); } });
  document.addEventListener("click", (e) => { if (!menu.hidden && !e.target.closest("#menu, #menu-btn")) setMenu(false); });

  // on phones the bar keeps only search and the menu, so the reading settings and the theme switch are in the menu too
  menuSettings(menu, { close: () => setMenu(false), from: btn });

  // search everything from any page: the button sits first on the right of the bar
  mountGlobalNav({ button: bar.querySelector(".right") });

  // signed in (a Supabase session in this browser): the link goes to the account, under that name
  const signedIn = (() => { try { return Object.keys(localStorage).some((k) => /^sb-.*-auth-token$/.test(k) && localStorage.getItem(k)); } catch { return false; } })();
  if (signedIn) document.querySelectorAll(".hub-signin").forEach((a) => { a.textContent = "Account"; });
}
