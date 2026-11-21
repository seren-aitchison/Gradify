// Top bar search button and the App Store link (the header itself: kit/core/hubnav.js).
import { icon, ICONS } from "../kit/core/icons.js";
import { glassSymbol } from "../kit/core/glass-icons.js";
import { appStoreUrl, standalone } from "../kit/core/install.js";

const $ = (s) => document.querySelector(s);

// the menu on small screens: kit/core/hubnav.js, like every hub page

// Search button: go to the directory search and put the cursor in it
$("#nav-search")?.addEventListener("click", (e) => {
  e.preventDefault();
  $("#find").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  $("#q").focus({ preventScroll: true });
});

// Section icons
document.querySelectorAll(".dz-ico[data-icon]").forEach((el) => { el.innerHTML = icon(el.dataset.icon); });
// who Gradify is for: each symbol as a glass icon, like the lessons and site headings
document.querySelectorAll(".org-ico[data-icon]").forEach((el) => { el.innerHTML = glassSymbol(ICONS[el.dataset.icon], { size: 52, seed: el.dataset.icon }); });

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
