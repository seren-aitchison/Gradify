// Top bar: the search button and the menu on small screens.
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
