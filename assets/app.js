import { GROUPS, FEATURED, START_HERE, KEYWORDS } from "../kit/core/sites.js";
import { icon } from "../kit/core/icons.js";
import { triple, mix, ink, tile } from "../kit/core/colour.js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../gradify.config.js";

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
    const card = document.createElement("article");
    card.className = `card glass ${live ? "live" : "soon"}${featured ? " featured" : ""}`;
    card.id = slug(s.n);
    colour(card, s);
    card.dataset.search = `${s.n} ${s.d} ${s.who || ""} ${g.title} ${KEYWORDS[s.n] || ""}`.toLowerCase();
    const badge = featured ? '<span class="badge"><span class="spark" aria-hidden="true"></span>The future of TechGradify</span>' : "";
    // what it does, without repeating the "For …:" lead-in that some descriptions have
    const what = s.d.replace(/^For [^:]+:\s*/, "").replace(/^./, (c) => c.toUpperCase());
    const study = s.n === "Klerio" ? "" : `<a class="study-link" href="app.html?site=${encodeURIComponent(s.n)}">Study ${esc(s.n.replace(" · ForgeLab", "").replace(/Gradify$/, "") || s.n)} in Gradify ${ICON.chev}</a>`;
    card.innerHTML = `
      <span class="icon" aria-hidden="true">${mark(s)}</span>
      <span class="body">
        <span class="status ${live ? "is-live" : "is-soon"}">${live ? "Live" : "Coming soon"}</span>
        <h3>${nameOf(s)}${badge}</h3>
        ${s.who ? `<p class="card-who"><b>For:</b> ${esc(s.who)}</p>` : ""}
        <p>${esc(what)}</p>
        <span class="actions-row">
          ${live
            ? `<a class="btn btn-light lg btn-sm visit" href="${href(s.u)}" target="_blank" rel="noopener" title="Opens ${domainOf(s)} in a new tab"><span>Visit site</span> <span aria-hidden="true">↗</span></a><span class="domain soon-domain">${domainOf(s)}</span>`
            : `<button type="button" class="btn btn-ghost lg btn-sm notify" data-site="${esc(s.n)}"><span>Notify me</span></button>${s.u ? `<span class="domain soon-domain">${domainOf(s)}</span>` : ""}`}
          ${study}
        </span>
        <form class="notify-form" hidden><label class="sr-only" for="nf-${card.id}">Email for ${esc(s.n)} launch news</label><input id="nf-${card.id}" type="email" required placeholder="you@example.com" autocomplete="email"><button class="btn btn-light lg btn-sm" type="submit"><span>Join</span></button></form>
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

// ---------- Notify me (sites that aren't live yet) ----------
groupsEl.addEventListener("click", (e) => {
  const b = e.target.closest(".notify");
  if (!b) return;
  const form = b.closest(".card").querySelector(".notify-form");
  form.hidden = false;
  b.hidden = true;
  form.querySelector("input").focus();
});
groupsEl.addEventListener("submit", async (e) => {
  const form = e.target.closest(".notify-form");
  if (!form) return;
  e.preventDefault();
  const site = form.closest(".card").querySelector(".notify").dataset.site;
  const email = form.querySelector("input").value.trim();
  let msg;
  try {
    msg = await joinWaitlist(email, site);
  } catch { msg = "Sorry, that didn't work. Please try again."; }
  form.outerHTML = `<p class="notify-done">${esc(msg)}</p>`;
});
async function joinWaitlist(email, site) {
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: "POST",
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal,resolution=ignore-duplicates" },
      body: JSON.stringify({ email, site }),
    });
    if (!res.ok && res.status !== 409) throw new Error(String(res.status));
    return `Thanks. We'll email you when ${site} launches.`;
  }
  try { const list = JSON.parse(localStorage.getItem("gradify.waitlist") || "[]"); list.push({ email, site, at: Date.now() }); localStorage.setItem("gradify.waitlist", JSON.stringify(list)); } catch { /* storage blocked */ }
  return `Noted on this device. Launch emails start when Gradify accounts open.`;
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
q.addEventListener("input", () => { apply(); suggest(); });
liveOnly.addEventListener("change", apply);
document.addEventListener("keydown", (e) => {
  const typing = e.target.closest?.("input, textarea, select, [contenteditable]");
  if (e.key === "/" && !typing) { e.preventDefault(); q.focus(); }
  if (e.key === "Escape" && document.activeElement === q) {
    if (!sugg.hidden) closeSuggest(); else { resetFilters(); q.blur(); }
  }
});

// ---------- Search suggestions ----------
const sugg = $("#suggest");
let picks = [], cursor = -1;
function suggest() {
  const term = q.value.trim().toLowerCase();
  picks = !term ? [] : ALL.map((s) => {
    const name = s.n.toLowerCase();
    const hay = `${name} ${s.d} ${KEYWORDS[s.n] || ""}`.toLowerCase();
    const word = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(hay);
    const score = name.startsWith(term) ? 4 : name.includes(term) ? 3 : word ? 2 : hay.includes(term) ? 1 : 0;
    return { s, score };
  }).filter((x) => x.score).sort((a, b) => b.score - a.score || (isLive(b.s) - isLive(a.s))).slice(0, 6).map((x) => x.s);
  cursor = -1;
  if (!picks.length) { closeSuggest(); return; }
  sugg.innerHTML = picks.map((s, i) => `
    <li role="option" id="sg-${i}" aria-selected="false" data-i="${i}" style="--c:#${s.c};--tile:${tile(s.c)};--ink:${ink(s.c)}">
      <span class="icon" aria-hidden="true">${mark(s)}</span>
      <span class="sg-txt"><b>${nameOf(s)}</b><span>${esc(s.d.replace(/\.$/, ""))} · ${esc(groupLabel(s.group))}</span></span>
      <em>${isLive(s) ? domainOf(s) : "Coming soon"}</em>
    </li>`).join("");
  sugg.hidden = false;
  q.setAttribute("aria-expanded", "true");
}
function closeSuggest() {
  sugg.hidden = true;
  q.setAttribute("aria-expanded", "false");
  q.removeAttribute("aria-activedescendant");
}
function choose(i) {
  const s = picks[i];
  if (!s) return;
  closeSuggest();
  q.value = "";
  setFilter("all");
  const card = document.getElementById(slug(s.n));
  card.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  card.animate([{ boxShadow: "0 0 0 0 var(--c)" }, { boxShadow: "0 0 0 3px var(--c)" }, { boxShadow: "0 0 0 0 var(--c)" }], { duration: 1600, easing: "ease-out" });
}
q.addEventListener("keydown", (e) => {
  if (sugg.hidden || !picks.length) return;
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    cursor = (cursor + (e.key === "ArrowDown" ? 1 : -1) + picks.length) % picks.length;
    sugg.querySelectorAll("li").forEach((li, i) => li.setAttribute("aria-selected", String(i === cursor)));
    q.setAttribute("aria-activedescendant", `sg-${cursor}`);
  } else if (e.key === "Enter") {
    e.preventDefault();
    choose(cursor < 0 ? 0 : cursor);
  }
});
sugg.addEventListener("mousedown", (e) => {
  const li = e.target.closest("li");
  if (li) { e.preventDefault(); choose(+li.dataset.i); }
});
q.addEventListener("blur", () => setTimeout(closeSuggest, 100));
q.addEventListener("focus", () => { if (q.value.trim()) suggest(); });

// ---------- Nav: highlight the section in view ----------
const navLinks = [...document.querySelectorAll(".bar .sections a")];
const spy = new IntersectionObserver((entries) => {
  for (const en of entries) {
    if (!en.isIntersecting) continue;
    for (const a of navLinks) a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
  }
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll(".group, #features, #lifeos, #organisations, #everywhere, #roadmap, #faq").forEach((s) => spy.observe(s));
