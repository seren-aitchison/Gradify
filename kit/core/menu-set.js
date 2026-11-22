// The settings row at the foot of a header's phone menu: reading and accessibility settings, and light or dark mode.
// On phones the headers show only search and the menu (kit/styles/base.css), so these live in the menu there. Used by
// the hub header (kit/core/hubnav.js) and the subject-site header (kit/core/subnav.js).
export function menuSettings(menu, { close = () => {}, from = null } = {}) {
  if (!menu || menu.querySelector(".menu-set")) return null;
  const set = document.createElement("div"); set.className = "menu-set";
  const theme = () => (window.gradifyTheme?.resolved?.() === "light" ? "Dark mode" : "Light mode");
  set.innerHTML = `<button type="button" data-act="access"><span aria-hidden="true">Aa</span> Text and display</button><button type="button" data-act="theme">${theme()}</button>`;
  set.addEventListener("click", (e) => {
    const b = e.target.closest("button"), act = b?.dataset.act;
    if (act === "access") { close(); window.gradifyAccess?.open(from); }
    if (act === "theme") { const g = window.gradifyTheme; g?.set(g.resolved() === "light" ? "dark" : "light"); b.textContent = theme(); }
  });
  menu.append(set);
  return set;
}
