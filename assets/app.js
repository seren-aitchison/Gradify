import { GROUPS, FEATURED, START_HERE } from "./sites.js";
import { icon } from "./icons.js";
import { triple, mix, ink, tile } from "./colour.js";

const $ = (s, el = document) => el.querySelector(s);
const href = (u) => (/^https?:/.test(u) ? u : "https://" + u);
const slug = (n) => n.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
const esc = (s) => s.replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// A site's icon, falling back to its first letters ("MedGradify" -> "Me") if it has none
const mark = (s, cls) => icon(s.i, cls) || esc((s.n.split(/Gradify/)[0].trim() || s.n).slice(0, 2));
const domainOf = (s) => esc(s.label || s.u.replace(/^https?:\/\//, ""));
const nameOf = (s) => esc(s.n) + (s.tm === false ? "" : "™");
const isLive = (s) => !!s.u && !s.soon;
const groupLabel = (g) => g.title.replace(/^By /, "").replace(/^./, (c) => c.toUpperCase());

const ICON = {
  chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.5 2"/></svg>',
};

// Paint a site's colours onto an element as CSS variables
function colour(el, s) {
  el.style.setProperty("--c", "#" + s.c);
  el.style.setProperty("--tile", tile(s.c));
  el.style.setProperty("--glow", triple(s.c));
  el.style.setProperty("--ink", ink(s.c));
}

// Flat lookup of every site, with its group
const ALL = GROUPS.flatMap((g) => g.items.map((s) => ({ ...s, group: g })));
const byName = new Map(ALL.map((s) => [s.n, s]));
const total = ALL.length;
const liveTotal = ALL.filter(isLive).length;
document.querySelectorAll(".js-count").forEach((el) => { el.textContent = total; });

// ---------- Site cards ----------
const groupsEl = $("#groups");
const chips = $("#chips");

for (const g of GROUPS) {
  const sec = document.createElement("section");
  sec.className = "group";
  sec.id = g.id;
  sec.dataset.group = g.id;
  sec.innerHTML = `<h2>${esc(g.title)}</h2><p>${esc(g.blurb)}</p><div class="grid"></div>`;
  const grid = $(".grid", sec);

  for (const s of g.items) {
    const live = isLive(s);
    const featured = s.n.includes("ForgeLab");
    const card = document.createElement(live ? "a" : "div");
    card.className = `card glass ${live ? "live" : "soon"}${featured ? " featured" : ""}`;
    card.id = slug(s.n);
    colour(card, s);
    card.dataset.search = `${s.n} ${s.d} ${g.title}`.toLowerCase();
    if (live) {
      card.href = href(s.u);
      card.target = "_blank";
      card.rel = "noopener";
    }
    const badge = featured ? '<span class="badge"><span class="spark" aria-hidden="true"></span>The future of TechGradify</span>' : "";
    const foot = live
      ? `<span class="domain">${domainOf(s)}</span><span class="go">${ICON.chev}</span>`
      : `<span class="domain">${s.u ? domainOf(s) + " · " : ""}Coming soon</span><span class="go wait">${ICON.clock}</span>`;
    card.innerHTML = `
      <span class="icon" aria-hidden="true">${mark(s)}</span>
      <span class="body">
        <h3>${nameOf(s)}${badge}</h3>
        <p>${esc(s.d)}</p>
        <span class="foot inset">${foot}</span>
      </span>`;
    grid.appendChild(card);
  }
  groupsEl.appendChild(sec);

  const chip = document.createElement("button");
  chip.className = "chip";
  chip.type = "button";
  chip.dataset.filter = g.id;
  chip.setAttribute("aria-pressed", "false");
  chip.textContent = groupLabel(g);
  chips.appendChild(chip);
}

// ---------- Colour tiles ----------
const tiles = $("#tiles");
const tip = $("#tile-tip span:last-child");
for (const s of ALL) {
  const t = document.createElement("a");
  t.href = "#" + slug(s.n);
  colour(t, s);
  t.innerHTML = mark(s);
  t.setAttribute("aria-label", s.n);
  t.dataset.name = s.n;
  tiles.appendChild(t);
}
const DEFAULT_TIP = tip.textContent;
const showTip = (e) => { if (e.target.dataset.name) tip.textContent = e.target.dataset.name; };
tiles.addEventListener("mouseover", showTip);
tiles.addEventListener("focusin", showTip);
tiles.addEventListener("mouseleave", () => { tip.textContent = DEFAULT_TIP; });

// Clicking anything that points at a card clears filters and briefly highlights the card
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  const card = a && document.getElementById(a.getAttribute("href").slice(1));
  if (!card || !card.classList.contains("card")) return;
  resetFilters();
  card.animate(
    [{ boxShadow: "0 0 0 0 var(--c)" }, { boxShadow: "0 0 0 3px var(--c)" }, { boxShadow: "0 0 0 0 var(--c)" }],
    { duration: 1400, easing: "ease-out" },
  );
});

// ---------- At a glance: ring + bars ----------
// One segment per site: live sites in their own colour, the rest in grey
$("#live-count").textContent = liveTotal;
const segs = $("#ring-segs");
const C = 2 * Math.PI * 60, seg = C / total, gap = 2.2;
ALL.forEach((s, i) => {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  el.setAttribute("cx", 80); el.setAttribute("cy", 80); el.setAttribute("r", 60);
  el.setAttribute("class", "seg" + (isLive(s) ? " live" : ""));
  el.style.stroke = isLive(s) ? "#" + s.c : "rgba(255,255,255,.14)";
  el.style.setProperty("--c", "#" + s.c);
  el.style.strokeDasharray = `${seg - gap} ${C}`;
  el.style.strokeDashoffset = `${-i * seg}`;
  el.style.transitionDelay = `${i * 30}ms`;
  segs.appendChild(el);
});
requestAnimationFrame(() => requestAnimationFrame(() => $("#ring").classList.add("on")));

const bars = $("#bars");
const max = Math.max(...GROUPS.map((g) => g.items.length));
for (const g of GROUPS) {
  const n = g.items.length;
  const b = document.createElement("a");
  b.href = "#" + g.id;
  b.className = "bar-col" + (n === max ? " top" : "");
  b.innerHTML = `<span class="bar-val">${n}</span><span class="bar-fill" style="--h:${(n / max) * 100}%">${g.items.map((s) => `<i style="--c:#${s.c}"></i>`).join("")}</span><span class="bar-name">${esc(groupLabel(g).split(" ")[0])}</span>`;
  b.setAttribute("aria-label", `${groupLabel(g)}: ${n} sites`);
  bars.appendChild(b);
}

// ---------- Start with your stage ----------
const rows = $("#start-rows");
for (const name of START_HERE) {
  const s = byName.get(name);
  if (!s) continue;
  const live = isLive(s);
  const r = document.createElement("a");
  r.className = "row inset";
  r.href = live ? href(s.u) : "#" + slug(s.n);
  if (live) { r.target = "_blank"; r.rel = "noopener"; }
  colour(r, s);
  r.innerHTML = `
    <span class="icon" aria-hidden="true">${mark(s)}</span>
    <span class="row-txt"><b>${nameOf(s)}</b><span>${esc(s.d.replace(/\.$/, ""))} · <em>${live ? domainOf(s) : "coming soon"}</em></span></span>
    <span class="go">${ICON.chev}</span>`;
  rows.appendChild(r);
}

// ---------- Featured carousel ----------
const spot = $("#spotlight");
const spotSites = FEATURED.map((n) => byName.get(n)).filter(Boolean);
const dots = $("#spot-dots");
let spotIndex = 0, timer = null;

spotSites.forEach((s, i) => {
  const d = document.createElement("button");
  d.type = "button";
  d.setAttribute("aria-label", `Show ${s.n}`);
  d.addEventListener("click", () => { showSpot(i); restart(); });
  dots.appendChild(d);
});

function showSpot(i) {
  spotIndex = (i + spotSites.length) % spotSites.length;
  const s = spotSites[spotIndex];
  const c = s.spot || s.c;
  spot.style.setProperty("--c", "#" + c);
  spot.style.setProperty("--c2", mix(c, .45));
  spot.style.setProperty("--glow", triple(c));
  $("#spot-mark").innerHTML = mark(s);
  $("#spot-group").textContent = groupLabel(s.group);
  $("#spot-name").innerHTML = nameOf(s);
  $("#spot-desc").textContent = s.d;
  $("#spot-actions").innerHTML = isLive(s)
    ? `<a class="btn btn-light lg" href="${href(s.u)}" target="_blank" rel="noopener"><span>Visit ${esc(s.n)}</span> <span aria-hidden="true">↗</span></a><span class="spot-domain">${domainOf(s)}</span>`
    : `<a class="btn btn-light lg" href="#${slug(s.n)}"><span>Coming soon</span></a><span class="spot-domain">${s.u ? domainOf(s) : ""}</span>`;
  [...dots.children].forEach((d, j) => d.setAttribute("aria-current", String(j === spotIndex)));
  const body = $("#spot-body");
  body.classList.remove("in");
  void body.offsetWidth;
  body.classList.add("in");
}
function restart() {
  clearInterval(timer);
  if (!reduceMotion && spotSites.length > 1) timer = setInterval(() => showSpot(spotIndex + 1), 6000);
}
spot.addEventListener("mouseenter", () => clearInterval(timer));
spot.addEventListener("mouseleave", restart);
spot.addEventListener("focusin", () => clearInterval(timer));
showSpot(0);
restart();

// ---------- Search + filter ----------
const q = $("#q");
const liveOnly = $("#live-only");
let active = "all";

function apply() {
  const term = q.value.trim().toLowerCase();
  let any = false;
  for (const sec of document.querySelectorAll(".group")) {
    const inGroup = active === "all" || sec.dataset.group === active;
    let shown = 0;
    for (const card of sec.querySelectorAll(".card")) {
      const match = inGroup && (!term || card.dataset.search.includes(term)) && (!liveOnly.checked || card.classList.contains("live"));
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
  if (active === "all" && !q.value && !liveOnly.checked) return;
  q.value = "";
  liveOnly.checked = false;
  setFilter("all");
}

chips.addEventListener("click", (e) => {
  const c = e.target.closest(".chip");
  if (c) setFilter(c.dataset.filter);
});
q.addEventListener("input", apply);
liveOnly.addEventListener("change", apply);
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement !== q) { e.preventDefault(); q.focus(); }
  if (e.key === "Escape" && document.activeElement === q) { resetFilters(); q.blur(); }
});

// ---------- Nav: highlight the section in view ----------
const navLinks = [...document.querySelectorAll(".bar .sections a")];
const spy = new IntersectionObserver((entries) => {
  for (const en of entries) {
    if (!en.isIntersecting) continue;
    for (const a of navLinks) a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
  }
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll(".group, #lifeos, #roadmap, #faq").forEach((s) => spy.observe(s));
