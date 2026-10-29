// Top bar search button, the menu on small screens, and installing the site as an app.
import { icon } from "../kit/core/icons.js";

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
$("#nav-search").addEventListener("click", (e) => {
  e.preventDefault();
  $("#find").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  $("#q").focus({ preventScroll: true });
});

// Section icons
document.querySelectorAll(".org-ico[data-icon], .dz-ico[data-icon]").forEach((el) => { el.innerHTML = icon(el.dataset.icon); });

// Install as an app: use the browser's own prompt where there is one
let installEvent = null;
const installBtn = $("#install");
const help = $("#install-help");
const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone;
if (standalone) help.textContent = "You're using the installed app.";
else if (/iphone|ipad/i.test(navigator.userAgent)) help.textContent = "On iPhone or iPad: tap Share, then “Add to Home Screen”.";
else help.textContent = "In Chrome or Edge, use the install icon in the address bar. In Safari on Mac, choose File › Add to Dock.";
addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  installEvent = e;
  installBtn.hidden = false;
  help.textContent = "";
});
installBtn.addEventListener("click", async () => {
  if (!installEvent) return;
  installEvent.prompt();
  await installEvent.userChoice;
  installEvent = null;
  installBtn.hidden = true;
});
