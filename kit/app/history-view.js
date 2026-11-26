// History (#/history): everything the learner viewed, studied, created and edited on this device, in the study app
// and every course (kit/ui/history.js), by day. Filter by activity, subject and date, or search; the filters are
// remembered (kit/ui/prefs.js), and each line opens the place it happened.
import { icon } from "../core/icons.js";
import { esc } from "../core/text.js";
import { uiIcon } from "../ui/icons.js";
import { ACTS, RANGES, history, filterHistory, subjectsOf, groupByDay, clearHistory } from "../ui/history.js";
import { pref, setPref } from "../ui/prefs.js";

const ACT_ICON = { viewed: "clock", studied: "check", created: "sparkles", edited: "pencil" };
const time = (t) => new Date(t).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
// an entry's link: a place inside this app is its hash, so it opens here rather than reloading the page
const hrefOf = (h) => (h.startsWith(`${location.pathname}#`) ? h.slice(location.pathname.length) : h);

export function renderHistory(view, { toast }) {
  const all = history();
  const f = { act: pref("app", "histAct", "all"), subject: pref("app", "histSubject", "all"), range: pref("app", "histRange", "all"), q: "" };
  const subjects = subjectsOf(all);
  if (f.subject !== "all" && f.subject !== "none" && !subjects.some(([s]) => s === f.subject)) f.subject = "all";
  view.innerHTML = `<section class="hist">
    <span class="kicker lo-kicker">${icon("clock")}Progress</span>
    <div class="deck-head"><div><h1>History</h1><p class="sub">What you've viewed, studied, created and edited in Gradify on this device, newest first. Open anything to go straight back to it.</p></div>
      ${all.length ? `<button type="button" class="btn btn-ghost lg btn-sm" data-clear><span>Clear history</span></button>` : ""}</div>
    ${all.length ? `<div class="hist-tools">
      <div class="seg-chips" role="group" aria-label="Activity">${[["all", "Everything"], ...ACTS].map(([k, l]) => `<button type="button" class="chip" data-act="${k}" aria-pressed="${k === f.act}">${l}</button>`).join("")}</div>
      <div class="hist-row">
        <label class="hist-q">${uiIcon("search")}<input type="search" placeholder="Search your history" aria-label="Search your history"></label>
        <label><span class="sr-only">Subject</span><select data-subject aria-label="Subject"><option value="all">Every subject</option>${subjects.map(([s, n]) => `<option value="${esc(s)}" ${s === f.subject ? "selected" : ""}>${esc(s)} (${n})</option>`).join("")}<option value="none" ${f.subject === "none" ? "selected" : ""}>Study app</option></select></label>
        <label><span class="sr-only">When</span><select data-range aria-label="When">${RANGES.map(([k, l]) => `<option value="${k}" ${k === f.range ? "selected" : ""}>${l}</option>`).join("")}</select></label>
      </div></div>
      <div class="hist-list" aria-live="polite"></div>`
    : `<div class="panel glass hist-empty"><h3>Nothing here yet</h3><p class="sub">As you open lessons, revise flashcards, make packs and plan your week, they'll appear here, so you can always find your way back.</p><div class="row-actions"><a class="btn btn-primary lg" href="#/learning"><span>Find a course</span></a><a class="btn btn-ghost lg" href="#/new"><span>Add notes</span></a></div></div>`}
  </section>`;
  const out = view.querySelector(".hist-list");
  const draw = () => {
    if (!out) return;
    const rows = filterHistory(history(), f);
    out.innerHTML = rows.length ? groupByDay(rows).map((g) => `<section class="hist-day"><h2 class="lo-h">${esc(g.label)}</h2><ol>${g.items.map((h) => {
      const act = ACTS.find(([k]) => k === h.act)?.[1] || h.act;
      const state = h.state === "in-progress" ? ` · in progress, ${h.answered} of ${h.total} answered` : h.state === "completed" ? ` · ${h.pass === false ? "finished under the pass mark" : "completed"}${h.score != null ? `, ${h.score}%` : ""}` : "";
      const extra = state || (h.n && h.unit ? ` · ${h.n} ${esc(h.unit)}` : "");
      return `<li><a href="${esc(hrefOf(h.href))}" class="hist-i a-${esc(h.act)}"><span class="hist-ic" aria-hidden="true">${icon(ACT_ICON[h.act] || "clock")}</span><span class="hist-t"><b>${esc(h.title)}</b><small>${esc(act)}${h.where ? ` · ${esc(h.where)}` : ""}${extra}</small></span><time datetime="${new Date(h.t).toISOString()}">${time(h.t)}</time></a></li>`;
    }).join("")}</ol></section>`).join("")
      : `<p class="sub hist-none">Nothing matches these filters. <button type="button" class="gx-link" data-reset>Show everything</button></p>`;
  };
  draw();
  view.querySelector(".hist")?.addEventListener("click", (e) => {
    const a = e.target.closest("[data-act]");
    if (a) { f.act = a.dataset.act; setPref("app", "histAct", f.act === "all" ? null : f.act); view.querySelectorAll("[data-act]").forEach((b) => b.setAttribute("aria-pressed", String(b === a))); draw(); return; }
    if (e.target.closest("[data-reset]")) {
      Object.assign(f, { act: "all", subject: "all", range: "all", q: "" });
      ["histAct", "histSubject", "histRange"].forEach((k) => setPref("app", k, null));
      renderHistory(view, { toast }); return;
    }
    if (e.target.closest("[data-clear]")) {
      if (!confirm("Clear your history on this device? Your progress, packs and plan aren't affected.")) return;
      clearHistory(); toast?.("History cleared."); renderHistory(view, { toast });
    }
  });
  view.querySelector("[data-subject]")?.addEventListener("change", (e) => { f.subject = e.target.value; setPref("app", "histSubject", f.subject === "all" ? null : f.subject); draw(); });
  view.querySelector("[data-range]")?.addEventListener("change", (e) => { f.range = e.target.value; setPref("app", "histRange", f.range === "all" ? null : f.range); draw(); });
  view.querySelector(".hist-q input")?.addEventListener("input", (e) => { f.q = e.target.value; draw(); });
}
