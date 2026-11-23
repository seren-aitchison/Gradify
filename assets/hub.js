// The free tools hub (getgradify.com/tools/): filter chips by category, and the visitor's pinned tools first.
import { pins } from "./memory.js";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export function mount(el) {
  const chips = [...el.querySelectorAll("[data-cat]")].filter((c) => c.tagName === "BUTTON"), secs = [...el.querySelectorAll("[data-cat-sec]")];
  const show = (cat) => {
    chips.forEach((c) => { const on = c.dataset.cat === cat; c.classList.toggle("on", on); c.setAttribute("aria-pressed", String(on)); });
    secs.forEach((s) => { s.hidden = Boolean(cat) && s.dataset.catSec !== cat; });
    try { sessionStorage.setItem("gradify.toolcat", cat); } catch { /* storage blocked */ }
  };
  el.addEventListener("click", (e) => { const c = e.target.closest("button[data-cat]"); if (c) show(c.dataset.cat); });
  let start = new URLSearchParams(location.search).get("cat") || "";
  try { start ||= sessionStorage.getItem("gradify.toolcat") || ""; } catch { /* storage blocked */ }
  show(chips.some((c) => c.dataset.cat === start) ? start : "");
  // pinned tools at the top
  const p = pins(); if (!p.length) return;
  const box = document.createElement("section"); box.className = "pinned";
  box.innerHTML = `<h2>Your pinned tools</h2><ul class="cards">${p.map((x) => `<li><a href="${esc(x.path)}">${esc(x.title)}</a></li>`).join("")}</ul>`;
  el.prepend(box);
}
