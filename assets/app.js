import { GROUPS } from "./sites.js";

const $ = (s, el = document) => el.querySelector(s);
const href = (u) => (/^https?:/.test(u) ? u : "https://" + u);
const slug = (n) => n.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
const esc = (s) => s.replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);

// ---------- Render ----------
const groupsEl = $("#groups");
const spine = $("#spine");
const tip = $("#spine-tip");
const chips = $("#chips");
let total = 0, live = 0;

for (const g of GROUPS) {
  const sec = document.createElement("section");
  sec.className = "group";
  sec.id = g.id;
  sec.dataset.group = g.id;
  sec.innerHTML = `<h2>${esc(g.title)}</h2><p>${esc(g.blurb)}</p><div class="grid"></div>`;
  const grid = $(".grid", sec);

  for (const s of g.items) {
    total++;
    const isLive = !!s.u;
    if (isLive) live++;
    const card = document.createElement(isLive ? "a" : "div");
    card.className = `card glass ${isLive ? "live" : "soon"}${s.n.includes("ForgeLab") ? " featured" : ""}`;
    card.id = slug(s.n);
    card.style.setProperty("--c", "#" + s.c);
    card.dataset.search = `${s.n} ${s.d} ${g.title}`.toLowerCase();
    if (isLive) {
      card.href = href(s.u);
      card.target = "_blank";
      card.rel = "noopener";
    }
    const name = esc(s.n) + (s.tm === false ? "" : "™");
    card.innerHTML = `
      <span class="orb" aria-hidden="true"></span>
      <h3>${name}</h3>
      <p>${esc(s.d)}</p>
      <span class="foot">
        <span class="domain">${isLive ? esc(s.label || s.u.replace(/^https?:\/\//, "")) : "Domain to be added"}</span>
        <span class="go">${isLive ? 'Visit <span aria-hidden="true">↗</span>' : "Coming soon"}</span>
      </span>`;
    grid.appendChild(card);

    const stripe = document.createElement("a");
    stripe.href = "#" + card.id;
    stripe.style.background = "#" + s.c;
    stripe.setAttribute("aria-label", s.n);
    stripe.dataset.name = s.n;
    spine.appendChild(stripe);
  }
  groupsEl.appendChild(sec);

  const chip = document.createElement("button");
  chip.className = "chip";
  chip.type = "button";
  chip.dataset.filter = g.id;
  chip.setAttribute("aria-pressed", "false");
  chip.textContent = g.title.replace(/^By /, "").replace(/^./, (c) => c.toUpperCase());
  chips.appendChild(chip);
}
$("#count").textContent = total;

// ---------- Spine tooltip ----------
const showTip = (e) => { tip.textContent = e.target.dataset.name || ""; };
spine.addEventListener("mouseover", showTip);
spine.addEventListener("focusin", showTip);
spine.addEventListener("mouseleave", () => { tip.textContent = "Hover a colour to see its site. Click to jump to it."; });

// Briefly highlight a card when you jump to it from the spine
spine.addEventListener("click", (e) => {
  const id = e.target.getAttribute("href")?.slice(1);
  const card = id && document.getElementById(id);
  if (!card) return;
  resetFilters();
  card.animate(
    [{ boxShadow: "0 0 0 0 var(--c)" }, { boxShadow: "0 0 0 6px var(--c)" }, { boxShadow: "0 0 0 0 var(--c)" }],
    { duration: 1400, easing: "ease-out" },
  );
});

// ---------- Search + filter ----------
const q = $("#q");
let active = "all";

function apply() {
  const term = q.value.trim().toLowerCase();
  let any = false;
  for (const sec of document.querySelectorAll(".group")) {
    const inGroup = active === "all" || sec.dataset.group === active;
    let shown = 0;
    for (const card of sec.querySelectorAll(".card")) {
      const match = inGroup && (!term || card.dataset.search.includes(term));
      card.hidden = !match;
      if (match) shown++;
    }
    sec.hidden = shown === 0;
    any ||= shown > 0;
  }
  $("#empty").style.display = any ? "none" : "block";
}

function setFilter(id) {
  active = id;
  for (const c of chips.querySelectorAll(".chip")) c.setAttribute("aria-pressed", String(c.dataset.filter === id));
  apply();
}
function resetFilters() {
  if (active === "all" && !q.value) return;
  q.value = "";
  setFilter("all");
}

chips.addEventListener("click", (e) => {
  const c = e.target.closest(".chip");
  if (c) setFilter(c.dataset.filter);
});
q.addEventListener("input", apply);
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement !== q) { e.preventDefault(); q.focus(); }
  if (e.key === "Escape" && document.activeElement === q) { resetFilters(); q.blur(); }
});

// ---------- Theme toggle ----------
const root = document.documentElement;
const btn = $("#theme");
const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
function paintBtn() { btn.setAttribute("aria-label", isDark() ? "Switch to light mode" : "Switch to dark mode"); }
try { const saved = localStorage.getItem("gradify-theme"); if (saved) root.dataset.theme = saved; } catch {}
paintBtn();
btn.addEventListener("click", () => {
  root.dataset.theme = isDark() ? "light" : "dark";
  try { localStorage.setItem("gradify-theme", root.dataset.theme); } catch {}
  paintBtn();
});
