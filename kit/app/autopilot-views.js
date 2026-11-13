// Gradify Autopilot on screen: the mode switch (Copilot, Adaptive, Autopilot), the executive briefing ("here's what
// Gradify organised, and why", with undo), the catch-up recovery, Tell Gradify (plain English and pasted emails),
// opportunities, topic break-downs and focus blocks. Decisions come from kit/intel/autopilot.js; this file only
// shows them and applies what the learner (or their chosen mode) approves, logging every change with an undo.
import { icon } from "../core/icons.js";
import { haptic } from "../core/haptics.js";
import { complete } from "../core/complete.js";
import { MODES, modeOf, catchUp, proposeWeek, proposeFocusBlocks, fillFocus, isFocus, opportunities, decompose, logEntry, trimLog, fmtBlock } from "../intel/autopilot.js";
import { parseTell, parseInbox } from "../intel/nlp.js";
import { planDay } from "../intel/schedule.js";
import { dayKey, DAY, hhmm } from "../intel/memory.js";
import { record } from "../intel/ledger.js";

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const dl = (d, o = { weekday: "short", day: "numeric", month: "short" }) => new Date(`${d}T12:00:00`).toLocaleDateString("en-GB", o);
const ago = (iso) => { const s = (Date.now() - Date.parse(iso)) / 1000; return s < 3600 ? `${Math.max(1, Math.round(s / 60))} min ago` : s < 86400 ? `${Math.round(s / 3600)} h ago` : `${Math.round(s / 86400)} d ago`; };

// ---------- applying changes, with a log entry that can undo them ----------
export async function applyChange(ctx, what, { add = [], remove = [], move = [] } = {}, kind = "manual") {
  const added = [], removed = [], moved = [];
  for (const b of remove) { removed.push(b); await ctx.store.deleteBlock(b.id); }
  for (const x of move) { moved.push({ id: x.block.id, from: { day: x.block.day, start_min: x.block.start_min, end_min: x.block.end_min } }); await ctx.store.saveBlock({ ...x.block, ...x.to, done: false }); }
  for (const b of add) { const r = await ctx.store.saveBlock(b); if (r?.id) added.push(r.id); }
  const log = trimLog([...(ctx.intel().log || []), { ...logEntry(what, { added, removed: removed.map(({ id, created_at, user_id, ...rest }) => rest), moved }), kind }]);
  await ctx.saveIntel({ log });
  record(ctx.store, { event: kind === "manual" ? "plan_accepted" : "autopilot_change", source: kind, detail: { what: what.slice(0, 200), added: added.length, removed: removed.length, moved: moved.length } });
  return log;
}
export async function undoEntry(ctx, index) {
  const log = [...(ctx.intel().log || [])], e = log[index];
  if (!e || e.undone) return;
  for (const id of e.undo.added || []) await ctx.store.deleteBlock(id).catch(() => {});
  for (const b of e.undo.removed || []) await ctx.store.saveBlock(b);
  for (const mv of e.undo.moved || []) { const all = await ctx.store.listBlocks(dayKey(Date.now() - 30 * DAY), dayKey(Date.now() + 120 * DAY)); const b = all.find((x) => x.id === mv.id); if (b) await ctx.store.saveBlock({ ...b, ...mv.from }); }
  log[index] = { ...e, undone: true, undoneAt: new Date().toISOString() };
  record(ctx.store, { event: "change_undone", source: e.kind || "manual", detail: { what: String(e.what).slice(0, 200) } });
  await ctx.saveIntel({ log });
}

/** What the chosen mode does on its own when a screen opens. Returns log entries it made. */
export async function runAutopilot(m, ctx) {
  const mode = modeOf(m.intel), made = [];
  if (mode === "copilot") return made;
  // something the learner undid stays undone: the same kind of change isn't made again for a day
  const vetoed = (k) => (m.intel.log || []).some((e) => e.undone && e.kind === k && Date.now() - Date.parse(e.undoneAt || e.at) < 864e5);
  // in Autopilot a recovery plan supersedes moving missed sessions one by one (it reassesses what they were for)
  const recovering = mode === "autopilot" && catchUp(m) && !vetoed("recovery");
  if (!recovering && m.missed.moves.length && !vetoed("moved")) { await applyChange(ctx, `Moved ${m.missed.moves.length} missed ${m.missed.moves.length === 1 ? "session" : "sessions"} into free time`, { move: m.missed.moves.map((x) => ({ block: m.blocks.find((b) => b.id === x.id), to: x.to })).filter((x) => x.block) }, "moved"); made.push("moved"); }
  if (mode !== "autopilot") return made;
  const c = catchUp(m);
  if (c && !vetoed("recovery")) {
    const w = proposeWeek(m, { replace: true });
    if (w.add.length) { await applyChange(ctx, `Recovery plan: reorganised the next 7 days around ${c.essential.length} essential ${c.essential.length === 1 ? "task" : "tasks"}`, { add: w.add, remove: [...w.remove, ...m.missed.missed] }, "recovery"); made.push("recovery"); }
  } else if (!c && !vetoed("week") && !m.blocks.some((b) => b.auto && b.day > m.today && b.day <= dayKey(m.now + 7 * DAY))) {
    const w = proposeWeek(m);
    if (w.add.length) { await applyChange(ctx, `Planned ${w.add.length} sessions across the next 7 days, in your free time`, { add: w.add }, "week"); made.push("week"); }
  }
  return made;
}

// ---------- the mode switch ----------
export function modesHtml(m, { compact = false } = {}) {
  const cur = modeOf(m.intel);
  return `<div class="ap-modes ${compact ? "compact" : ""}" role="radiogroup" aria-label="How much Gradify does for you">${MODES.map((x, i) => `<button type="button" role="radio" aria-checked="${x.id === cur}" class="ap-mode m${i}" data-mode="${x.id}"><span class="ap-mode-top"><b>${x.name}</b>${x.id === cur ? `<span class="ap-on">On</span>` : ""}</span><span class="ap-line">${x.line}</span>${compact ? "" : `<span class="ap-what">${x.what}</span>`}</button>`).join("")}</div>`;
}

// ---------- the executive briefing ----------
export function briefingHtml(m, { made = [] } = {}) {
  const mode = modeOf(m.intel), log = (m.intel.log || []).map((e, i) => ({ ...e, i })).filter((e) => !e.undone && Date.now() - Date.parse(e.at) < 36 * 36e5).reverse().slice(0, 3);
  const top = m.prio.items[0], req = m.preds.requirement, f = m.preds.forgetting;
  const soonCards = m.cards.filter((c) => !c.suspended && c.reps > 0 && Date.parse(c.due_at) > m.now && Date.parse(c.due_at) <= m.now + 3 * DAY).length;
  const soonMins = Math.ceil((soonCards * 25) / 60);
  const nextExam = m.deadlines.find((d) => d.kind === "exam"), nextDue = m.deadlines.find((d) => d.kind === "deadline");
  const lines = [
    top && `<li class="hot"><b>${esc(top.title)}</b> is your highest priority. ${esc(top.why)}</li>`,
    nextDue && `<li class="amber"><b>${esc(nextDue.title)}</b> is due ${dl(nextDue.day)}. ${m.blocks.some((b) => b.auto && b.day < nextDue.day && b.day >= m.today) ? "Time is set aside before it." : "Nothing is planned for it yet."}</li>`,
    nextExam && req.status !== "no-date" && `<li class="${req.status === "on-track" ? "green" : "amber"}">Your next exam, <b>${esc(nextExam.title)}</b>, is ${req.status === "on-track" ? "on track" : `${req.status}: about ${req.perDay} min a day are needed`}.</li>`,
    m.preds.gaps.length && `<li class="violet"><b>${m.preds.gaps.length} ${m.preds.gaps.length === 1 ? "concept needs" : "concepts need"}</b> revisiting: ${esc(m.preds.gaps.slice(0, 3).map((c) => c.name).join(", "))}.</li>`,
    (f.length || soonMins) && `<li class="blue">About <b>${soonMins} min</b> of revision becomes due over the next three days${f.length ? `, and ${f.length} ${f.length === 1 ? "concept is" : "concepts are"} fading this week` : ""}. ${mode === "copilot" ? "Plan it in Smart Plan." : "It's spread across your plan."}</li>`,
  ].filter(Boolean);
  const changed = log.length || made.length;
  return `<article class="ap-brief">
    <div class="ap-brief-head"><span class="kicker">${icon("sparkles")}Gradify Executive Intelligence · ${MODES.find((x) => x.id === mode).name}</span>
      <h2>${changed ? "Your study has been reorganised." : "Your day, organised."}</h2></div>
    ${log.length ? `<ul class="ap-log">${log.map((e) => `<li><span>${icon("check")}${esc(e.what)} <em>${ago(e.at)}</em></span><button type="button" class="ap-undo" data-undo="${e.i}">Undo</button></li>`).join("")}</ul>` : ""}
    <ul class="ap-lines">${lines.join("") || `<li class="green">Nothing needs you right now. Add your next notes while they're fresh.</li>`}</ul>
    <div class="ap-brief-foot">${modesHtml(m, { compact: true })}</div>
  </article>`;
}

export function catchUpHtml(m) {
  const c = catchUp(m);
  if (!c) return "";
  const auto = modeOf(m.intel) === "autopilot";
  return `<article class="ap-catch">
    <div><span class="kicker">${icon("route")}Catch-up</span><h3>${esc(c.headline)} ${auto ? "Gradify has replanned." : "Your plan needs attention."}</h3><p class="sub">${esc(c.line)}</p></div>
    <ul class="ap-catch-grid">
      <li><b>${c.essential.length}</b><span>essential for what's coming</span></li>
      <li><b>${c.later.length}</b><span>can safely wait</span></li>
      <li><b>${c.dueCards}</b><span>cards to review</span></li>
      <li><b>${c.deadlines.length}</b><span>${c.deadlines.length === 1 ? "deadline" : "deadlines"} in two weeks</span></li>
    </ul>
    ${auto ? "" : `<div class="row-actions"><button type="button" class="cp-pill dark" data-recover>Reorganise my next 7 days</button><span class="small muted">Only Gradify's own sessions change. Nothing is crammed.</span></div>`}
  </article>`;
}

export function opportunitiesWidget(m) {
  const o = opportunities(m);
  return `<article class="cp-card widget" aria-labelledby="w-op">
    <h2 id="w-op" class="widget-title">${icon("bulb")} Opportunities</h2>
    ${!o.length ? `<p class="small muted">Gradify watches for free time, topics you're ready to move on from and gaps in how you practise.</p>`
    : `<ul class="ap-opps">${o.map((x) => `<li class="${x.tone}"><b>${esc(x.title)}</b><span>${esc(x.why)}</span><a href="${esc(x.href)}" data-haptic="tap">${esc(x.cta)} →</a></li>`).join("")}</ul>`}
  </article>`;
}

// ---------- Tell Gradify ----------
export function tellHtml() {
  return `<article class="ap-tell">
    <div class="ap-tell-tabs" role="tablist"><button type="button" role="tab" aria-selected="true" data-tell-tab="tell">Tell Gradify</button><button type="button" role="tab" aria-selected="false" data-tell-tab="inbox">Paste an email</button></div>
    <form class="ap-tell-form" id="tell-form"><label class="sr-only" for="tell-q">Tell Gradify about your exams, deadlines and plans</label>
      <textarea id="tell-q" rows="2" maxlength="4000" placeholder="e.g. I have a biology exam on 10 December, a chemistry assignment due on the 4th and I'm away this weekend."></textarea>
      <button class="cp-pill dark" type="submit">Organise it</button></form>
    <div id="tell-out" aria-live="polite"></div>
  </article>`;
}
export function wireTell(view, m, ctx) {
  let tab = "tell", actions = [];
  const out = view.querySelector("#tell-out"), q = view.querySelector("#tell-q");
  view.querySelectorAll("[data-tell-tab]").forEach((b) => b.addEventListener("click", () => {
    tab = b.dataset.tellTab; haptic("tap");
    view.querySelectorAll("[data-tell-tab]").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    q.rows = tab === "inbox" ? 6 : 2;
    q.placeholder = tab === "inbox" ? "Paste a message from your lecturer, Moodle, Canvas or your university. Gradify finds new and changed dates and what they ask you to cover." : "e.g. I have a biology exam on 10 December, a chemistry assignment due on the 4th and I'm away this weekend.";
    out.innerHTML = "";
  }));
  view.querySelector("#tell-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = q.value.trim(); if (!text) return;
    haptic("tap");
    if (tab === "inbox") {
      const r = parseInbox(text, { deadlines: m.blocks.filter((b) => ["exam", "deadline", "ext-exam", "ext-deadline"].includes(b.cal) && b.day >= m.today), now: Date.now() });
      actions = [...r.changes, ...r.found];
      out.innerHTML = `${actions.length ? preview(actions) : `<p class="small muted">No dates for exams or deadlines found in that message.</p>`}${r.prep ? `<p class="small muted">${esc(r.prep.line)}</p>` : ""}`;
    } else {
      actions = parseTell(text, Date.now());
      out.innerHTML = actions.length ? preview(actions) : `<p class="small muted">Gradify couldn't find a date in that. Try “Biology exam on 10 December” or “I'm away this weekend”.</p>`;
    }
    out.querySelector("[data-tell-apply]")?.addEventListener("click", async (ev) => {
      ev.currentTarget.disabled = true;
      const chosen = actions.filter((_, i) => out.querySelector(`[data-tell-i="${i}"]`)?.checked);
      const add = [], move = [];
      let hours = null;
      for (const a of chosen) {
        if (a.type === "exam" || a.type === "deadline") add.push({ day: a.day, start_min: 540, end_min: 570, title: a.title, cal: a.type, auto: false });
        else if (a.type === "away") for (const d of a.days) add.push({ day: d, start_min: 0, end_min: 1440, title: "Away", cal: "away", auto: false });
        else if (a.type === "busy") add.push({ day: a.day, start_min: a.start_min, end_min: a.end_min, title: a.title, cal: "external", auto: false });
        else if (a.type === "move") move.push({ block: a.block, to: { day: a.day } });
        else if (a.type === "hours") hours = a.minutes;
      }
      if (hours) await ctx.saveProfile({ daily_minutes: hours });
      if (add.length || move.length) await applyChange(ctx, `Added ${chosen.length} ${chosen.length === 1 ? "thing" : "things"} you told Gradify`, { add, move });
      complete("Organised", { sub: "Your plan now works around it." });
      ctx.rerender();
    });
  });
  function preview(list) {
    const line = (a) => a.type === "away" ? `Away ${a.days.length === 1 ? dl(a.days[0]) : `${dl(a.days[0])} – ${dl(a.days.at(-1))}`}` : a.type === "busy" ? `${a.title} ${dl(a.day)}, ${hhmm(a.start_min)}–${hhmm(a.end_min)}` : a.type === "hours" ? `Study ${a.minutes} min a day` : a.type === "move" ? `${a.title}: ${dl(a.from)} → ${dl(a.day)}` : `${a.type === "exam" ? "Exam" : "Deadline"}: ${a.title}, ${dl(a.day)}`;
    return `<p class="ap-tell-lead">Here's what Gradify understood. Untick anything that's wrong.</p><ul class="ap-tell-list">${list.map((a, i) => `<li><label><input type="checkbox" checked data-tell-i="${i}"><span><b>${esc(line(a))}</b><em>${esc(a.why)}</em></span></label></li>`).join("")}</ul><button type="button" class="cp-pill dark" data-tell-apply>Add to my plan</button>`;
  }
}

// ---------- break a topic down (Revision Centre) ----------
export function decomposeHtml() {
  return `<article class="panel glass ap-decomp"><div class="panel-head"><h3>${icon("checklist")} Break a topic down</h3><span class="pill-dark">From your evidence</span></div>
    <form class="widget-ask" id="decomp-form"><label class="sr-only" for="decomp-q">A topic to revise</label><input id="decomp-q" placeholder="e.g. Revise cardiovascular physiology" maxlength="120" autocomplete="off"><button class="cp-pill dark" type="submit">Break it down</button></form>
    <div id="decomp-out" aria-live="polite"></div></article>`;
}
export function wireDecompose(view, m, ctx) {
  view.querySelector("#decomp-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = view.querySelector("#decomp-q").value.trim(); if (!q) return;
    haptic("tap");
    const d = decompose(q, m), out = view.querySelector("#decomp-out");
    out.innerHTML = !d.steps.length ? `<p class="small muted">${esc(d.note)}</p>` : `<ol class="ap-steps">${d.steps.map((s, i) => `<li><a href="${esc(s.href)}"><span class="r-n">${i + 1}</span><span class="r-main"><span class="i-tag">${esc(s.tag)}</span><b>${esc(s.title)}</b><span>${esc(s.why)}</span><em>Done when: ${esc(s.done)}</em></span><span class="r-min">${s.mins} min</span></a></li>`).join("")}</ol>
      <div class="ap-steps-foot"><b>${d.total} min</b> in all · <span class="muted">${esc(d.note)}</span></div>
      <div class="row-actions"><button type="button" class="cp-pill dark" data-decomp-plan>Plan these steps</button></div>`;
    out.querySelector("[data-decomp-plan]")?.addEventListener("click", async (ev) => {
      ev.currentTarget.disabled = true;
      const items = d.steps.map((s, i) => ({ id: `dc${i}`, title: s.title, mins: s.mins, weight: "hard", why: s.why }));
      const add = [];
      for (let k = 0; k < 7 && items.length; k++) {
        const day = dayKey(Date.now() + k * DAY);
        const plan = planDay({ items, day, minutes: Math.max(m.dailyMinutes, 30), intel: m.intel, existing: m.blocks.filter((b) => b.day === day), now: Date.now() });
        for (const b of plan.blocks.filter((x) => x.kind !== "break" && x.kind !== "wrap")) { add.push({ day, start_min: b.start_min, end_min: b.end_min, title: b.title, cal: "study", auto: true }); items.splice(items.findIndex((x) => x.id === b.id), 1); }
      }
      await applyChange(ctx, `Planned “${d.subject}” as ${add.length} steps`, { add });
      complete("Topic planned", { sub: `${add.length} steps, ${d.total} min` });
      ctx.rerender();
    });
  });
}

// ---------- focus blocks ----------
export const focusLabel = (m, b) => { const x = fillFocus(m, b); return x ? `Gradify picks the task when you start · now: ${x.title}` : "Gradify picks the task when you start"; };
export const focusHref = (m, b) => fillFocus(m, b)?.href || "#/revise";
export { isFocus, proposeFocusBlocks };

/** Wires the shared parts: mode switch, undo, recovery, focus blocks. */
export function wireAutopilot(view, m, ctx) {
  view.querySelectorAll("[data-mode]").forEach((b) => b.addEventListener("click", async () => {
    if (b.getAttribute("aria-checked") === "true") return;
    haptic("select");
    await ctx.saveIntel({ autonomy: b.dataset.mode });
    record(ctx.store, { event: "mode_changed", source: b.dataset.mode });
    complete(`${MODES.find((x) => x.id === b.dataset.mode).name} on`, { sub: MODES.find((x) => x.id === b.dataset.mode).line });
    ctx.rerender();
  }));
  view.querySelectorAll("[data-undo]").forEach((b) => b.addEventListener("click", async () => { b.disabled = true; await undoEntry(ctx, Number(b.dataset.undo)); haptic("success"); ctx.toast("Undone."); ctx.rerender(); }));
  view.querySelector("[data-recover]")?.addEventListener("click", async (e) => {
    e.currentTarget.disabled = true;
    const c = catchUp(m), w = proposeWeek(m, { replace: true });
    await applyChange(ctx, `Recovery plan: reorganised the next 7 days around ${c?.essential.length || 0} essential tasks`, { add: w.add, remove: [...w.remove, ...m.missed.missed] });
    complete("Back on track", { sub: `${w.add.length} sessions across 7 days` });
    ctx.rerender();
  });
  view.querySelector("[data-focus]")?.addEventListener("click", async (e) => {
    e.currentTarget.disabled = true;
    const add = proposeFocusBlocks(m);
    if (!add.length) { ctx.toast("No free days without Gradify sessions this week."); return; }
    await applyChange(ctx, `Reserved ${add.length} focus ${add.length === 1 ? "block" : "blocks"}`, { add });
    complete("Focus blocks reserved", { sub: "Gradify fills each one when you start." });
    ctx.rerender();
  });
  view.querySelectorAll("[data-haptic]").forEach((a) => a.addEventListener("click", () => haptic(a.dataset.haptic)));
}
