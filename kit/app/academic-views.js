// MyGradify academic set-up (#/academic/<step>) and the "Your course" panel in Account. Eight steps, every one
// skippable except the country, and none blocked by missing catalogue data: each search offers "Not listed" (typed,
// links nothing), and modules can come from the catalogue, a handbook import, typing, or be skipped.
// Saves only profiles.learner.academic (kit/data/academic.js). First release: post-16 and higher education only, and
// never on JuniorGradify or YouthGradify (decision D2).
import { icon } from "../core/icons.js";
import { actionCard } from "../core/action-card.js";
import { createCatalogue, describeStatus, statusOf } from "../data/catalogue.js";
import { COUNTRIES, REGIONS, MODES, stagesFor, validateAcademic, saveAcademic, clearAcademic, academicOf, completeness, summary, FIELDS } from "../data/academic.js";
import { learnerOf } from "../data/profile.js";
import { esc } from "../core/text.js";

const CHILD = /^(JuniorGradify|YouthGradify)$/;
const DRAFT = "gradify.academic.draft";
const STEPS = ["country", "institution", "subject", "course", "year", "modules", "review"];
const ADULT_KINDS = new Set(["college", "fe", "university", "training", "other"]);
let catalogue = null;
const cat = () => (catalogue ||= createCatalogue({ base: "/data/catalogue/" }));

// a draft remembers which saved version it started from; if the saved profile has changed since (edited elsewhere, or
// on the dashboard), the stale draft is dropped so it can never overwrite newer details
function readDraft(learner) {
  const a = academicOf(learner), base = a?.last_updated || null;
  try { const d = JSON.parse(sessionStorage.getItem(DRAFT) || "null"); if (d && (d._base ?? null) === base) return d; } catch { /* storage blocked */ }
  return a ? { ...structuredClone(a), _region: null, _base: base } : { _region: null, _base: null };
}
function writeDraft(d) { try { sessionStorage.setItem(DRAFT, JSON.stringify(d)); } catch { /* storage blocked: the draft lives for this page only */ } }
function dropDraft() { try { sessionStorage.removeItem(DRAFT); } catch { /* ignore */ } }

// ---------- an accessible search box (WAI-ARIA combobox; suggestions only, "Not listed" always last) ----------
function combo(root, { label, placeholder, search, describe, onPick, value = "" }) {
  const uid = `cb${Math.random().toString(36).slice(2, 8)}`;
  root.innerHTML = `<label for="${uid}" id="${uid}-l" class="ac-label">${esc(label)}</label>
    <input id="${uid}" class="ac-input" type="text" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="${uid}-list" aria-describedby="${uid}-s" autocomplete="off" spellcheck="false" placeholder="${esc(placeholder)}" value="${esc(value)}">
    <ul id="${uid}-list" class="ac-list" role="listbox" aria-labelledby="${uid}-l" hidden></ul>
    <p id="${uid}-s" class="ac-status" role="status" aria-live="polite"></p>`;
  const input = root.querySelector("input"), list = root.querySelector("ul"), status = root.querySelector(".ac-status");
  let opts = [], active = -1, seq = 0;
  const render = () => {
    list.innerHTML = opts.map((o, i) => `<li id="${uid}-o${i}" role="option" aria-selected="${i === active}" class="${o.custom ? "custom" : ""}"><b>${esc(o.name)}</b><small>${esc(o.custom ? "Not linked to Gradify's catalogue. That's fine." : describe(o))}</small></li>`).join("");
    list.hidden = !opts.length; input.setAttribute("aria-expanded", String(opts.length > 0));
    if (active >= 0) input.setAttribute("aria-activedescendant", `${uid}-o${active}`); else input.removeAttribute("aria-activedescendant");
  };
  const pick = (i) => { const o = opts[i]; if (!o) return; input.value = o.custom ? o.typed : o.name; opts = []; active = -1; render(); status.textContent = o.custom ? `Using “${o.typed}”.` : `Chosen: ${o.name}.`; onPick(o.custom ? { id: null, name: o.typed } : o); };
  input.addEventListener("input", async () => {
    const q = input.value.trim(), my = ++seq;
    if (!q) { opts = []; render(); status.textContent = ""; return; }
    let res = [];
    try { res = await search(q); } catch { res = []; }
    if (my !== seq) return;
    opts = [...res.slice(0, 7), { custom: true, typed: q, name: `Not listed: use “${q}”` }]; active = -1; render();
    status.textContent = res.length ? `${res.length} suggestion${res.length === 1 ? "" : "s"}. Use the arrow keys to choose.` : "No matches in Gradify's list yet. You can use what you typed.";
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" && opts.length) { e.preventDefault(); active = (active + 1) % opts.length; render(); }
    else if (e.key === "ArrowUp" && opts.length) { e.preventDefault(); active = active <= 0 ? opts.length - 1 : active - 1; render(); }
    else if (e.key === "Enter" && active >= 0) { e.preventDefault(); pick(active); }
    else if (e.key === "Escape" && opts.length) { opts = []; active = -1; render(); }
  });
  list.addEventListener("mousedown", (e) => e.preventDefault());
  list.addEventListener("click", (e) => { const li = e.target.closest('[role="option"]'); if (li) pick(Number(li.id.split("-o")[1])); });
  return input;
}

// ---------- the steps ----------
const frame = (n, title, sub, body, { canSkip = true } = {}) => `<section class="setup academic" data-step="${n}">
  <div class="setup-dots" aria-label="Step ${n} of ${STEPS.length}">${STEPS.map((_, i) => `<i class="${i < n ? "on" : ""}"></i>`).join("")}</div>
  <p class="kicker">Your course · step ${n} of ${STEPS.length}</p>
  <h1>${title}</h1>${sub ? `<p class="sub">${sub}</p>` : ""}
  <div class="panel glass ac-panel">${body}</div>
  <div class="ac-nav">
    ${n > 1 ? `<a class="btn btn-ghost lg" href="#/academic/${n - 1}"><span>Back</span></a>` : `<a class="btn btn-ghost lg" href="#/academic/exit"><span>Not now</span></a>`}
    <span class="grow"></span>
    ${canSkip ? `<a class="btn btn-ghost lg" href="#/academic/${n + 1}" data-skip><span>Skip</span></a>` : ""}
    <button type="button" class="btn btn-primary lg" data-next><span>${n === STEPS.length ? "Save my course" : "Next"}</span></button>
  </div>
</section>`;

/** Render one step. ctx: { view, store, profile(), refresh(), toast(), site, next() } */
export async function renderAcademic(stepArg, ctx) {
  const { view } = ctx;
  if (CHILD.test(ctx.site || "")) {
    view.innerHTML = `<section class="setup academic"><h1>Course details</h1><div class="panel glass ac-panel"><p>Course details aren't collected on ${esc(ctx.site)}. Everything else works as usual.</p></div><p><a class="btn btn-primary lg" href="#/today"><span>Back to today</span></a></p></section>`;
    return;
  }
  if (stepArg === "exit") { dropDraft(); location.hash = ctx.next(); return; }
  const n = Math.min(STEPS.length, Math.max(1, Number(stepArg) || 1));
  const d = readDraft(learnerOf(ctx.profile()));
  const save = () => writeDraft(d);
  const go = (to) => { save(); location.hash = `#/academic/${to}`; };
  const country = d.country?.code || null, region = d._region || (country ? REGIONS[country]?.[0]?.[0] : null);

  if (n === 1) {
    view.innerHTML = frame(1, "Where do you study?", "Gradify uses this to find your university or college. You can change it at any time.", `
      <div class="ac-choices" role="radiogroup" aria-label="Country of study">${COUNTRIES.map(([c, name]) => `<button type="button" role="radio" class="goal-card glass ${country === c ? "on" : ""}" aria-checked="${country === c}" data-country="${c}"><b>${esc(name)}</b></button>`).join("")}
        <button type="button" role="radio" class="goal-card glass ${d.country && !d.country.code ? "on" : ""}" aria-checked="${Boolean(d.country && !d.country.code)}" data-country=""><b>Somewhere else</b></button></div>
      <div class="ac-row" data-other ${d.country && !d.country.code ? "" : "hidden"}><label class="ac-label" for="ac-country">Country</label><input id="ac-country" class="ac-input" maxlength="80" value="${esc(d.country && !d.country.code ? d.country.name : "")}"></div>
      <div class="ac-row" data-region ${country && REGIONS[country] ? "" : "hidden"}><label class="ac-label" for="ac-region">${country === "US" ? "State" : "Nation"} <em class="hint">only used to search; not saved</em></label><select id="ac-region" class="ac-input">${(REGIONS[country] || []).map(([k, l]) => `<option value="${k}" ${k === region ? "selected" : ""}>${esc(l)}</option>`).join("")}</select></div>`, { canSkip: false });
    view.querySelectorAll("[data-country]").forEach((b) => b.addEventListener("click", () => {
      const c = b.dataset.country;
      d.country = c ? { code: c, name: COUNTRIES.find(([k]) => k === c)[1] } : { code: null, name: view.querySelector("#ac-country").value.trim() };
      d._region = c ? REGIONS[c][0][0] : null; save(); renderAcademic(1, ctx);
    }));
    view.querySelector("[data-next]").addEventListener("click", () => {
      if (d.country && !d.country.code) d.country.name = view.querySelector("#ac-country").value.trim();
      const r = view.querySelector("#ac-region"); if (r && !r.closest("[hidden]")) d._region = r.value;
      if (!d.country?.name) { ctx.toast("Choose where you study, or pick “Somewhere else” and type it."); return; }
      go(2);
    });
    return;
  }
  if (n === 2) {
    view.innerHTML = frame(2, "Your university or college", "Search Gradify's list, or type the name if it isn't there yet.", `<div class="ac-combo" data-combo></div>${d.institution ? `<p class="ac-current">Current: <b>${esc(d.institution.name)}</b>${d.institution.id ? "" : " (typed by you)"}</p>` : ""}`);
    combo(view.querySelector("[data-combo]"), {
      label: "University or college", placeholder: "e.g. University of Leeds", value: d.institution?.name || "",
      search: async (q) => (country && region ? (await cat().searchProviders(country, region, q, { limit: 12 })).filter((r) => ADULT_KINDS.has(r.kind)) : []),
      describe: (o) => `${o.town || ""}${o.closed ? " · Closed" : ""}`,
      onPick: (o) => { d.institution = { id: o.id || null, name: o.name }; if (o.id === null || o.id !== d._inst) { d.offering = d.offering?.id ? null : d.offering; d.units = (d.units || []).filter((u) => !u.id); } d._inst = o.id || null; save(); },
    });
    view.querySelector("[data-next]").addEventListener("click", () => go(3));
    return;
  }
  if (n === 3) {
    const offerings = d.institution?.id ? await cat().offerings(d.institution.id).catch(() => []) : [];
    const subjects = [...new Map(offerings.flatMap((o) => o.data.subjects || []).map((s) => [s.label || s.code, s])).values()];
    view.innerHTML = frame(3, "What do you study?", "Your main subject. If you study two, choose the one you'd like Gradify to start with.", `<div class="ac-combo" data-combo></div>`);
    combo(view.querySelector("[data-combo]"), {
      label: "Subject", placeholder: "e.g. Chemistry", value: d.subject?.name || "",
      search: async (q) => subjects.filter((s) => (s.label || "").toLowerCase().includes(q.toLowerCase())).map((s) => ({ id: null, name: s.label || s.code, from: "course list" })),
      describe: () => "From your university's courses",
      onPick: (o) => { d.subject = { id: null, name: o.name }; save(); },
    });
    view.querySelector("[data-next]").addEventListener("click", () => go(4));
    return;
  }
  if (n === 4) {
    const all = d.institution?.id ? await cat().offerings(d.institution.id).catch(() => []) : [];
    const subj = (d.subject?.name || "").toLowerCase();
    const list = subj ? all.filter((o) => (o.data.subjects || []).some((s) => (s.label || "").toLowerCase() === subj) || o.data.title.toLowerCase().includes(subj)) : all;
    const typed = d.offering && !d.offering.id ? d.offering.name : "";
    const fmt = (o) => [o.data.qualification?.label, o.data.length ? `${o.data.length.value} ${o.data.length.unit}` : null, o.data.mode].filter(Boolean).join(" · ");
    view.innerHTML = frame(4, "What's your course?", list.length ? `Courses Gradify lists at ${esc(d.institution.name)}${d.subject ? ` in ${esc(d.subject.name)}` : ""}.` : "Type your course or qualification. Gradify doesn't list this university's courses yet.", `
      ${list.length ? `<div class="ac-options" role="radiogroup" aria-label="Your course">${list.map((o) => `<button type="button" role="radio" aria-checked="${d.offering?.id === o.id}" class="ac-option ${d.offering?.id === o.id ? "on" : ""}" data-off="${o.id}"><b>${esc(o.data.title)}</b><span>${esc(fmt(o))}</span><em>${esc(describeStatus(o, ["title", "length"]))}</em></button>`).join("")}</div>` : ""}
      <div class="ac-row"><label class="ac-label" for="ac-course">${list.length ? "Not listed? Type your course" : "Your course or qualification"}</label><input id="ac-course" class="ac-input" maxlength="160" placeholder="e.g. BSc Medicinal Chemistry" value="${esc(typed)}"></div>
      <div class="ac-row"><label class="ac-label" for="ac-mode">Study mode</label><select id="ac-mode" class="ac-input"><option value="">Choose…</option>${MODES.map(([v, l]) => `<option value="${v}" ${d.mode === v ? "selected" : ""}>${l}</option>`).join("")}</select></div>`);
    view.querySelectorAll("[data-off]").forEach((b) => b.addEventListener("click", () => { const o = list.find((x) => x.id === b.dataset.off); d.offering = { id: o.id, name: o.data.title }; view.querySelector("#ac-course").value = ""; save(); renderAcademic(4, ctx); }));
    view.querySelector("[data-next]").addEventListener("click", () => {
      const t = view.querySelector("#ac-course").value.trim();
      if (t) d.offering = { id: null, name: t };
      d.mode = view.querySelector("#ac-mode").value || null;
      go(5);
    });
    return;
  }
  if (n === 5) {
    const y = new Date().getFullYear();
    view.innerHTML = frame(5, "When did you start, and which year are you in?", "This picks the right course structure for your intake.", `
      <div class="ac-row"><label class="ac-label" for="ac-start">Year you started</label><select id="ac-start" class="ac-input"><option value="">Choose…</option>${Array.from({ length: 12 }, (_, i) => y + 1 - i).map((v) => `<option ${d.start_year === v ? "selected" : ""}>${v}</option>`).join("")}</select></div>
      <div class="ac-row"><label class="ac-label" for="ac-stage">Where you are now</label><select id="ac-stage" class="ac-input"><option value="">Choose…</option>${stagesFor(country).map(([v, l]) => `<option value="${v}" ${d.current_stage?.value === v ? "selected" : ""}>${esc(l)}</option>`).join("")}</select></div>`);
    view.querySelector("[data-next]").addEventListener("click", () => {
      const s = view.querySelector("#ac-stage");
      d.start_year = Number(view.querySelector("#ac-start").value) || null;
      d.current_stage = s.value ? { value: s.value, label: s.selectedOptions[0].textContent } : null;
      go(6);
    });
    return;
  }
  if (n === 6) {
    d.units ||= [];
    const struct = d.offering?.id && d.start_year && d.current_stage ? await cat().structure(d.offering.id, String(d.start_year), ({ ug1: "ug1", ug2: "ug2", ug3: "ug3", ug4: "ug4" })[d.current_stage.value]).catch(() => null) : null;
    const has = (u) => d.units.some((x) => (u.id && x.id === u.id) || x.name.toLowerCase() === u.name.toLowerCase());
    view.innerHTML = frame(6, "What are you studying this year?", "Add your modules so Gradify can organise revision and deadlines around them. You can do this later.", `
      ${struct ? `<h3 class="ac-h">From Gradify's list <em>${statusOf(struct.structure) === "verified" ? "Checked against the university's published list" : "Not yet checked: compare with your handbook"}</em></h3><ul class="ac-checks">${struct.units.filter((x) => x.unit).map((x) => `<li><label><input type="checkbox" data-unit="${x.unit.id}" ${has({ id: x.unit.id, name: x.unit.data.title }) || x.compulsory ? "checked" : ""}><span><b>${esc(x.unit.data.title)}</b><small>${esc([x.unit.data.code, x.compulsory ? "Compulsory" : x.group_rule || "Optional"].filter(Boolean).join(" · "))}</small></span></label></li>`).join("")}</ul>`
        : `<p class="ac-note">${icon("alert")} Gradify doesn't have this course's modules yet. Import your handbook or add them yourself.</p>`}
      <div class="ac-actions"><label class="btn btn-ghost lg ac-file">${icon("upload")}<span>Import a handbook</span><input type="file" accept=".pdf,.txt,application/pdf,text/plain" data-hb hidden></label></div>
      <div data-hb-review></div>
      <div class="ac-row ac-add"><label class="ac-label" for="ac-unit">Add a module</label><div class="ac-inline"><input id="ac-unit" class="ac-input" maxlength="160" placeholder="e.g. Organic Chemistry II"><button type="button" class="btn btn-light lg" data-add><span>Add</span></button></div></div>
      <ul class="ac-units" data-units></ul>`);
    const listEl = view.querySelector("[data-units]");
    const drawUnits = () => { listEl.innerHTML = d.units.filter((u) => !u.id).map((u, i) => `<li><span>${esc(u.name)}${u.code ? ` <small>${esc(u.code)}</small>` : ""}</span><button type="button" class="icon-btn" data-del="${i}" aria-label="Remove ${esc(u.name)}">${icon("x")}</button></li>`).join(""); };
    drawUnits();
    const addTyped = () => { const i = view.querySelector("#ac-unit"); const name = i.value.trim(); if (!name) return; if (!has({ name })) d.units.push({ id: null, name }); i.value = ""; save(); drawUnits(); i.focus(); };
    view.querySelector("[data-add]").addEventListener("click", addTyped);
    view.querySelector("#ac-unit").addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); addTyped(); } });
    listEl.addEventListener("click", (e) => { const b = e.target.closest("[data-del]"); if (!b) return; const typed = d.units.filter((u) => !u.id); const gone = typed[Number(b.dataset.del)]; d.units = d.units.filter((u) => u !== gone); save(); drawUnits(); });
    // handbook import: read in this browser, reviewed before anything is added (kit/data/handbook.js)
    view.querySelector("[data-hb]").addEventListener("change", async (e) => {
      const f = e.target.files?.[0]; e.target.value = ""; if (!f) return;
      const box = view.querySelector("[data-hb-review]");
      box.innerHTML = `<p class="ac-status" role="status">Reading ${esc(f.name)}…</p>`;
      try {
        const [{ fileText }, { parseHandbook }] = await Promise.all([import("../notes/pdf-text.js"), import("../data/handbook.js")]);
        const res = parseHandbook(await fileText(f), { today: new Date() });
        if (!res.modules.length) { box.innerHTML = `<p class="ac-note">No modules found in that file. Add them yourself below.</p>`; return; }
        box.innerHTML = `<div class="ac-hb"><p><b>Found ${res.modules.length} module${res.modules.length === 1 ? "" : "s"}.</b> Untick any that aren't yours this year.</p><ul class="ac-checks">${res.modules.map((m, i) => `<li><label><input type="checkbox" data-hbi="${i}" ${m.year === "1" ? "" : "checked"}><span><b>${esc(m.name)}</b><small>${esc([m.code, m.credits ? `${m.credits} credits` : null].filter(Boolean).join(" · "))}</small></span></label></li>`).join("")}</ul><button type="button" class="btn btn-primary lg" data-hb-add><span>Add these</span></button></div>`;
        box.querySelector("[data-hb-add]").addEventListener("click", () => {
          box.querySelectorAll("[data-hbi]").forEach((cb) => { const m = res.modules[Number(cb.dataset.hbi)]; if (cb.checked && !has({ name: m.name })) d.units.push({ id: null, name: m.name, ...(m.code ? { code: m.code } : {}) }); });
          box.innerHTML = ""; save(); drawUnits();
        });
      } catch { box.innerHTML = `<p class="ac-note">Gradify couldn't read that file. Try a PDF with selectable text, or add modules yourself.</p>`; }
    });
    view.querySelector("[data-next]").addEventListener("click", () => {
      if (struct) {
        const picked = [...view.querySelectorAll("[data-unit]")].filter((c) => c.checked).map((c) => { const u = struct.units.find((x) => x.unit?.id === c.dataset.unit).unit; return { id: u.id, name: u.data.title, ...(u.data.code ? { code: u.data.code } : {}) }; });
        d.units = [...picked, ...d.units.filter((u) => !u.id)];
      }
      go(7);
    });
    return;
  }
  // 7: review and save
  const v = validateAcademic(stripDraft(d));
  const row = (label, val, step, typed) => `<div class="ac-review-row"><dt>${label}</dt><dd>${val ? esc(val) : `<span class="muted">Not added</span>`}${typed ? ` <em class="ac-typed">typed by you</em>` : ""}</dd><dd><a href="#/academic/${step}" aria-label="Change ${label}">Change</a></dd></div>`;
  const c = completeness(v.value);
  view.innerHTML = frame(7, "Check your course details", `${c.filled} of ${c.total} added. Anything you skip can be added later in Account.`, `
    <dl class="ac-review">
      ${row("Country", d.country?.name, 1)}
      ${row("University or college", d.institution?.name, 2, d.institution && !d.institution.id)}
      ${row("Subject", d.subject?.name, 3)}
      ${row("Course", d.offering?.name, 4, d.offering && !d.offering.id)}
      ${row("Study mode", MODES.find(([m]) => m === d.mode)?.[1], 4)}
      ${row("Started", d.start_year, 5)}
      ${row("Where you are now", d.current_stage?.label, 5)}
      ${row("Modules this year", (d.units || []).map((u) => u.name).join(", "), 6)}
    </dl>
    ${v.ok ? "" : `<p class="ac-note" role="alert">${esc(v.errors[0])}</p>`}
    <p class="ac-privacy">${icon("lock")} Saved to your Gradify account${ctx.store.mode === "cloud" ? "" : " (on this device until you sign in)"}, so it's the same on every device. Only you can see it. Gradify uses it to suggest what to study; it doesn't check it with your university, and you can change or remove it at any time. <a href="/privacy.html#course" target="_blank" rel="noopener">Privacy</a></p>`, { canSkip: false });
  view.querySelector("[data-next]").addEventListener("click", async (e) => {
    const btn = e.currentTarget; btn.disabled = true;
    try {
      await saveAcademic(ctx.store, stripDraft(d));
      dropDraft(); await ctx.refresh();
      view.innerHTML = `<section class="setup academic">${actionCard({ kicker: "Saved", title: "Your course is saved", why: "Gradify now uses it across your study plan, tracker and revision. Change it any time in Account.", actions: [{ label: "Continue", icon: "route", href: ctx.next() }, { label: "See it in Account", icon: "home", href: "#/account", soft: true }] })}</section>`;
    } catch (err) { btn.disabled = false; ctx.toast(esc(err.message || "Couldn't save just now. Try again.")); }
  });
}
// the draft holds a search region and the picked institution's ID for the session; only the eight fields are saved
function stripDraft(d) { return Object.fromEntries(Object.entries(d).filter(([k, v]) => FIELDS.includes(k) && v != null)); }

/** The "Your course" panel for Account: a summary, what's added, and edit or remove. */
export function academicPanelHtml(learner, { site } = {}) {
  if (CHILD.test(site || "")) return "";
  const a = academicOf(learner), c = completeness(a);
  return `<article class="panel glass ac-account" id="your-course">
    <div class="panel-head"><div><h3>${icon("cap")} Your course</h3><p class="sub">${a ? esc(summary(a)) || "Started, not finished" : "Tell Gradify what and where you study, and it plans around your actual course."}</p></div>${a ? `<span class="pill-dark">${c.filled} of ${c.total}</span>` : ""}</div>
    ${a ? `<p class="sub">Entered by you${(a.units || []).length ? ` · ${(a.units || []).length} module${a.units.length === 1 ? "" : "s"}` : ""}. Gradify doesn't check it with your university.</p>` : ""}
    <div class="row-actions"><a class="btn btn-light lg btn-sm" href="#/academic/${a ? 7 : 1}"><span>${a ? "Edit" : "Add your course"}</span></a>${a ? `<button type="button" class="btn btn-ghost lg btn-sm" data-ac-remove><span>Remove</span></button>` : ""}</div>
  </article>`;
}
export function wireAcademicPanel(view, ctx) {
  view.querySelector("[data-ac-remove]")?.addEventListener("click", async () => {
    if (!confirm("Remove your course details? Your notes, progress and plans stay.")) return;
    await clearAcademic(ctx.store); dropDraft(); await ctx.refresh(); ctx.toast("Course details removed."); ctx.rerender();
  });
}
