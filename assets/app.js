import { GROUPS } from "./sites.js";

const $ = (s, el = document) => el.querySelector(s);
const href = (u) => (/^https?:/.test(u) ? u : "https://" + u);
const slug = (n) => n.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
const esc = (s) => s.replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);

// Colour helpers: a lighter tint for the icon gradient, and dark or white text for contrast
const rgb = (h) => [0, 2, 4].map((i) => parseInt(h.substr(i, 2), 16));
const mix = (h, t) => "#" + rgb(h).map((v) => Math.round(v + (255 - v) * t).toString(16).padStart(2, "0")).join("");
const lum = (h) => {
  const [r, g, b] = rgb(h).map((v) => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; });
  return .2126 * r + .7152 * g + .0722 * b;
};
const ink = (h) => (lum(h) > .45 ? "#14151b" : "#fff");
const tile = (h) => `linear-gradient(135deg, ${mix(h, .28)} 0%, #${h} 70%)`;
// "MedGradify" -> "Me", "TechGradify · ForgeLab" -> "Te", "Klerio" -> "K"
const initials = (n) => { const base = n.split(/Gradify/)[0].trim(); return base ? base.slice(0, 2) : n[0]; };

const ARROW = '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

// ---------- Render ----------
const groupsEl = $("#groups");
const tiles = $("#tiles");
const tip = $("#tile-tip span:last-child");
const chips = $("#chips");
let total = 0;

for (const g of GROUPS) {
  const sec = document.createElement("section");
  sec.className = "group";
  sec.id = g.id;
  sec.dataset.group = g.id;
  sec.innerHTML = `<h2>${esc(g.title)}</h2><p>${esc(g.blurb)}</p><div class="grid"></div>`;
  const grid = $(".grid", sec);

  for (const s of g.items) {
    total++;
    const isLive = !!s.u && !s.soon;
    const featured = s.n.includes("ForgeLab");
    const card = document.createElement(isLive ? "a" : "div");
    card.className = `card glass ${isLive ? "live" : "soon"}${featured ? " featured" : ""}`;
    card.id = slug(s.n);
    card.style.setProperty("--c", "#" + s.c);
    card.style.setProperty("--tile", tile(s.c));
    card.dataset.search = `${s.n} ${s.d} ${g.title}`.toLowerCase();
    if (isLive) {
      card.href = href(s.u);
      card.target = "_blank";
      card.rel = "noopener";
    }
    const name = esc(s.n) + (s.tm === false ? "" : "™");
    const badge = featured ? '<span class="badge">The future of TechGradify</span>' : "";
    card.innerHTML = `
      <span class="icon" style="color:${ink(s.c)}" aria-hidden="true">${esc(initials(s.n))}</span>
      <span class="body">
        <h3>${name}${badge}</h3>
        <p>${esc(s.d)}</p>
        <span class="foot">
          <span class="track" aria-hidden="true"><i></i></span>
          ${s.u ? `<span class="domain">${esc(s.label || s.u.replace(/^https?:\/\//, ""))}</span>` : ""}
          ${isLive ? ARROW : '<span class="badge neutral">Coming soon</span>'}
        </span>
      </span>`;
    grid.appendChild(card);

    const t = document.createElement("a");
    t.href = "#" + card.id;
    t.style.setProperty("--tile", tile(s.c));
    t.style.setProperty("--c", "#" + s.c);
    t.style.color = ink(s.c);
    t.textContent = initials(s.n);
    t.setAttribute("aria-label", s.n);
    t.dataset.name = s.n;
    tiles.appendChild(t);
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
document.querySelectorAll(".js-count").forEach((el) => { el.textContent = total; });

// ---------- Tile tooltip ----------
const DEFAULT_TIP = tip.textContent;
const showTip = (e) => { if (e.target.dataset.name) tip.textContent = e.target.dataset.name; };
tiles.addEventListener("mouseover", showTip);
tiles.addEventListener("focusin", showTip);
tiles.addEventListener("mouseleave", () => { tip.textContent = DEFAULT_TIP; });

// Briefly highlight a card when you jump to it from a tile
tiles.addEventListener("click", (e) => {
  const id = e.target.getAttribute("href")?.slice(1);
  const card = id && document.getElementById(id);
  if (!card) return;
  resetFilters();
  card.animate(
    [{ borderColor: "var(--line)" }, { borderColor: "var(--c)", boxShadow: "0 0 0 3px var(--c)" }, { borderColor: "var(--line)" }],
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

// ---------- Nav: highlight the section in view ----------
const navLinks = [...document.querySelectorAll(".bar nav a")];
const spy = new IntersectionObserver((entries) => {
  for (const en of entries) {
    if (!en.isIntersecting) continue;
    for (const a of navLinks) a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
  }
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll(".group").forEach((s) => spy.observe(s));
