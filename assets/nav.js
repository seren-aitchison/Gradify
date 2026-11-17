// Top bar search button, the menu on small screens, and the App Store link.
import { icon } from "../kit/core/icons.js";
import { appStoreUrl, standalone } from "../kit/core/install.js";

const $ = (s) => document.querySelector(s);

const btn = $("#menu-btn");
const menu = $("#menu");
function setMenu(open) {
  menu.hidden = !open;
  btn.setAttribute("aria-expanded", String(open));
  btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
btn.addEventListener("click", () => setMenu(menu.hidden));
menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { setMenu(false); btn.focus(); } });
document.addEventListener("click", (e) => { if (!menu.hidden && !e.target.closest("#menu, #menu-btn")) setMenu(false); });

// Search button: go to the directory search and put the cursor in it
$("#nav-search")?.addEventListener("click", (e) => {
  e.preventDefault();
  $("#find").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  $("#q").focus({ preventScroll: true });
});

// Section icons
document.querySelectorAll(".org-ico[data-icon], .dz-ico[data-icon]").forEach((el) => { el.innerHTML = icon(el.dataset.icon); });

// Get the app: Gradify's app comes from the App Store (APP_STORE in gradify.config.js); the site never installs itself
const installBtn = $("#install");
const help = $("#install-help");
const store = appStoreUrl();
// the browser's own "install this site" offer is kept back
addEventListener("beforeinstallprompt", (e) => e.preventDefault());
if (installBtn) {
  if (standalone()) help.textContent = "You're using the installed app.";
  else if (store) { installBtn.hidden = false; help.textContent = "Free for iPhone, iPad and Mac."; }
  else help.textContent = "Coming soon to the App Store for iPhone, iPad and Mac.";
  installBtn.addEventListener("click", () => { if (store) open(store, "_blank", "noopener"); });
}
