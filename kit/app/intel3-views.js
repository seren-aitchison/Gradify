// Gradify Intelligence 3.0, on screen (LifeOS → Intelligence): readiness by objective, the free-time engine, the
// evidence-weighted knowledge graph with shared concepts, the card coach (what kind of card each topic needs, and the
// cards Gradify can write from the learner's own) and teaching experiments. Everything is read from the one model
// (kit/intel/model.js → m.v3). Styles: "Intelligence 3.0" in kit/app/app.css.
import { icon } from "../core/icons.js";
import { haptic } from "../core/haptics.js";
import { complete } from "../core/complete.js";
import { forWindow } from "../intel/order.js";
import { record } from "../intel/ledger.js";

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const pct = (v) => (v == null ? "–" : `${Math.round(v * 100)}%`);
const STATUS = { ready: ["Ready", "green"], likely: ["Likely", "blue"], borderline: ["Borderline", "amber"], "at-risk": ["At risk", "hot"], unknown: ["Not enough evidence", ""] };
const NEED = { compare: ["Compare", "violet"], reverse: ["Reverse", "blue"], apply: ["Apply", "green"], explain: ["Explain", "amber"], rephrase: ["Rephrase", "hot"] };

// a range bar: the likely range shaded, the estimate marked, the 70% line drawn
const rangeBar = (x) => x.status === "unknown" ? `<span class="rd-bar empty" role="img" aria-label="Not enough evidence"><i class="rd-line"></i></span>` : `<span class="rd-bar" role="img" aria-label="${pct(x.p)}, likely ${pct(x.lo)} to ${pct(x.hi)}"><i class="rd-range" style="left:${x.lo * 100}%;width:${Math.max(1, (x.hi - x.lo) * 100)}%"></i><i class="rd-dot" style="left:${x.p * 100}%"></i><i class="rd-line"></i></span>`;

export function readinessPane(m) {
  const R = m.v3?.readiness;
  if (!R) return "";
  const s = R.summary, list = R.objectives.slice(0, 14);
  return `<article class="panel glass rd" data-pane="readiness"><div class="panel-head"><div><h3>${icon("trophy")} Readiness by objective</h3>
      <p class="sub">How likely you are to get each objective right ${s.examDate ? `on exam day (${s.horizon} days)` : "in two weeks (set an exam date in Settings for exam day)"}, with the range Gradify is confident of. Little evidence means a wide range, never a guess dressed up as exact.</p></div>
      <span class="pill-dark">${s.mean == null ? "Gathering evidence" : `${pct(s.mean)} · ${pct(s.lo)}–${pct(s.hi)}`}</span></div>
    <div class="rd-counts">${[["ready", s.ready], ["likely", s.likely], ["borderline", s.borderline], ["at-risk", s.atRisk], ["unknown", s.unknown]].map(([k, n]) => `<span class="rd-count ${STATUS[k][1]}"><b>${n}</b>${STATUS[k][0]}</span>`).join("")}</div>
    ${list.length ? `<ul class="rd-list">${list.map((x) => `<li><span class="rd-name"><b>${esc(x.name)}</b><em>${esc(x.why)}</em></span>${rangeBar(x)}<span class="i-tag ${STATUS[x.status][1]}">${STATUS[x.status][0]}</span></li>`).join("")}</ul>${R.objectives.length > list.length ? `<p class="small muted">${R.objectives.length - list.length} more, mostly ready or untested.</p>` : ""}`
      : `<p class="sub">No objectives yet. Answer questions in a course, or study your own cards, and each one appears here.</p>`}
  </article>`;
}

export function freeTimePane(m) {
  return `<article class="panel glass ft" data-pane="free"><div class="panel-head"><div><h3>${icon("clock")} Got some free time?</h3>
      <p class="sub">Tell Gradify how long you have and it picks the best use of exactly that window: quick recall for a few minutes, a root cause for a quarter of an hour, new material when there's time to focus.</p></div></div>
    <div class="ft-chips" role="group" aria-label="Minutes free">${[5, 10, 15, 20, 30, 45, 60, 90].map((n) => `<button type="button" class="i-chip" data-ft="${n}" aria-pressed="false">${n} min</button>`).join("")}</div>
    <div class="ft-out" aria-live="polite"><p class="sub">Choose a length.</p></div>
  </article>`;
}
function drawWindow(el, m, minutes) {
  const w = forWindow(m, minutes);
  el.innerHTML = !w.items.length ? `<p class="sub">${esc(w.headline)}. ${esc(w.note)}</p>`
    : `<ol class="ft-plan">${w.items.map((x, i) => `<li><span class="ft-n">${i + 1}</span><span><b>${esc(x.title)}</b><em>${esc(x.why || "")}</em></span><span class="r-min">${x.mins} min</span>${i === 0 ? `<a class="cp-pill dark" href="${esc(x.href || "#/study")}" data-ft-go="${esc(x.id)}">Start</a>` : ""}</li>`).join("")}</ol>
      <p class="small muted">${esc(w.note)} ${w.used < minutes ? `${minutes - w.used} min spare for a break.` : ""}</p>`;
}

export function connectionsPane(m) {
  const g = (m.v3?.graph || []).filter((e) => !e.from.startsWith("course:") || e.kind === "explicit").slice(0, 12), sh = (m.v3?.sharedConcepts || []).slice(0, 10);
  return `<article class="panel glass kg" data-pane="evidence"><div class="panel-head"><div><h3>${icon("route")} How your topics connect</h3>
      <p class="sub">Each link has a confidence from its evidence: a course prerequisite counts most, a term one topic defines and another uses counts a little per term, and your own answers can confirm or weaken a link. Gradify acts only on links at 50% or more, so one shared word is never enough by itself.</p></div>
      <span class="pill-dark">${g.filter((e) => e.used).length} used · ${g.filter((e) => !e.used).length} watching</span></div>
    ${g.length ? `<ul class="kg-list">${g.map((e) => `<li class="${e.used ? "used" : ""}"><span class="kg-pair"><b>${esc(e.fromName)}</b><span aria-hidden="true">→</span><b>${esc(e.toName)}</b></span>
      <span class="i-why-bar" title="${pct(e.confidence)} confidence"><i style="width:${Math.round(e.confidence * 100)}%"></i></span><em>${pct(e.confidence)} · ${e.kind}</em>
      <details><summary>Evidence</summary><ul>${e.sources.map((s) => `<li class="${s.weight < 0 ? "neg" : ""}">${esc(s.note)}</li>`).join("")}</ul></details></li>`).join("")}</ul>`
      : `<p class="sub">No links yet. They appear as your notes define terms other topics use, or as you take courses with prerequisites.</p>`}
    ${sh.length ? `<h4 class="brief-h">The same idea in more than one place</h4><div class="kg-shared">${sh.map((c) => `<span class="i-chip static" title="${esc(c.members.map((x) => x.site || x.kind).join(", "))}">${esc(c.name)} <em>×${c.members.length}</em></span>`).join("")}</div><p class="small muted">Evidence about these counts towards one concept wherever you met it.</p>` : ""}
  </article>`;
}

export function cardCoachPane(m) {
  const needs = m.v3?.needs || [];
  return `<article class="panel glass cc" data-pane="cards"><div class="panel-head"><div><h3>${icon("layers")} Card coach</h3>
      <p class="sub">What kind of card each topic needs next, from your answers. Gradify writes a card only by rearranging what your own cards already say (turning a definition round, or setting two confusable terms side by side), and never adds one you already have.</p></div>
      <span class="pill-dark">${needs.length ? `${needs.length} ${needs.length === 1 ? "suggestion" : "suggestions"}` : "Nothing needed"}</span></div>
    ${needs.length ? `<ul class="cc-list">${needs.map((x, i) => `<li><span class="i-tag ${NEED[x.need][1]}">${NEED[x.need][0]}</span><span class="cc-body"><b>${esc(x.topic)}</b><em>${esc(x.why)}</em>
      ${x.card ? `<span class="cc-card"><span>${esc(x.card.front)}</span><span>${esc(x.card.back).replace(/\n/g, "<br>")}</span></span>` : ""}</span>
      ${x.card ? `<button type="button" class="cp-pill dark" data-cc-add="${i}">Add card</button>` : `<a class="cp-pill" href="${esc(x.href)}">Open deck</a>`}</li>`).join("")}</ul>`
      : `<p class="sub">Your cards suit how you're doing. Suggestions appear when recall outruns application, terms get confused, or a card keeps slipping.</p>`}
  </article>`;
}

export function teachingPane(m) {
  const t = m.v3?.teaching;
  if (!t) return "";
  return `<article class="panel glass tx" data-pane="learning"><div class="panel-head"><div><h3>${icon("sparkles")} What kind of teaching works for you</h3>
      <p class="sub">Each time you use the tutor on a lesson, Gradify notes the mode, then compares your later answers on that lesson with your answers before. It recommends a mode only once there's enough evidence, and still suggests others now and then.</p></div>
      <span class="pill-dark">${t.enough ? "Enough evidence" : `${t.uses} tutor ${t.uses === 1 ? "use" : "uses"} so far`}</span></div>
    <ul class="i-why-list tx-list">${t.modes.map((x) => `<li><span>${esc(x.label)}</span><span class="i-why-bar"><i style="width:${x.after == null ? 0 : Math.round(x.after * 100)}%"></i></span><em>${x.measured ? `${x.measured} measured · ${x.gain == null ? "no before" : `${x.gain >= 0 ? "+" : ""}${Math.round(x.gain * 100)} pts`}` : x.uses ? `${x.uses} used, not measured yet` : "not tried"}</em></li>`).join("")}</ul>
    <p class="tx-suggest">${icon("check")}<span><b>Try ${esc(t.suggest.label)} next.</b> ${esc(t.suggest.why)}</span></p>
  </article>`;
}

/** Add the panes to the Intelligence page and wire them. */
export function mountIntel3(view, m, ctx) {
  const page = view.querySelector(".intel-page");
  if (!page) return;
  page.querySelector('[data-pane="overview"]')?.insertAdjacentHTML("afterend", readinessPane(m) + freeTimePane(m));
  page.querySelector('[data-pane="evidence"]')?.insertAdjacentHTML("afterend", connectionsPane(m) + cardCoachPane(m));
  const learned = page.querySelector(".learned");
  if (learned) learned.insertAdjacentHTML("afterend", teachingPane(m)); else page.insertAdjacentHTML("beforeend", teachingPane(m));
  const ft = page.querySelector(".ft");
  ft?.addEventListener("click", (e) => {
    const b = e.target.closest("[data-ft]");
    if (b) { haptic("select"); ft.querySelectorAll("[data-ft]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); drawWindow(ft.querySelector(".ft-out"), m, Number(b.dataset.ft)); return; }
    const go = e.target.closest("[data-ft-go]");
    if (go) record(ctx.store, { event: "recommendation_followed", source: "free-time", detail: { id: go.dataset.ftGo.slice(0, 120) } });
  });
  page.querySelectorAll("[data-cc-add]").forEach((b) => b.addEventListener("click", async () => {
    const x = m.v3.needs[Number(b.dataset.ccAdd)];
    if (!x?.card) return;
    b.disabled = true;
    try {
      await ctx.store.addCards([{ ...x.card, source_quote: null }]);
      complete("Card added", { sub: x.card.front.slice(0, 80) });
      b.textContent = "Added ✓";
    } catch (err) { b.disabled = false; ctx.toast?.(`Couldn't add the card: ${err.message || err}`); }
  }));
}
