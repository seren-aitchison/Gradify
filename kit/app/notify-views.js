// Notifications on screen: the settings panel (Intelligence and Settings), the gentle "turn on reminders" ask, and
// the summary the open app's reminders work from. Rules: kit/intel/nudges.js. Delivery: kit/core/push.js.
import { icon } from "../core/icons.js";
import { complete } from "../core/complete.js";
import { haptic } from "../core/haptics.js";
import { KINDS, prefsOf } from "../intel/nudges.js";
import { status, enable, disable, savePrefs, startLocalReminders } from "../core/push.js";
import { dayKey, DAY } from "../intel/memory.js";

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/** The summary nudges are decided from, built from the live model (same shape the server builds from rows). */
export function summaryOf(m) {
  const nowMin = new Date().getHours() * 60 + new Date().getMinutes(), tomorrow = dayKey(Date.now() + DAY);
  const todayBlocks = m.blocks.filter((b) => b.day === m.today && !b.done && (b.cal || "study") === "study");
  const studiedToday = m.events.some((e) => (e.event === "flashcard_answered" || e.event === "study_session") && dayKey(Date.parse(e.at)) === m.today);
  let streak = 0; for (let k = 1; k < 400; k++) { const d = dayKey(Date.now() - k * DAY); if (m.events.some((e) => dayKey(Date.parse(e.at)) === d && /answered|session|block_done/.test(e.event))) streak++; else break; }
  return { dueCards: m.preds.dueCards, top: m.prio.items[0] ? { title: m.prio.items[0].title, mins: m.prio.items[0].mins } : null, todayBlocks,
    nextSession: todayBlocks.filter((b) => b.start_min >= nowMin).sort((a, b) => a.start_min - b.start_min)[0] || null,
    fading: m.preds.forgetting.filter((f) => f.days <= 1).map((f) => ({ name: f.name, key: f.key })), studiedToday, streak: streak + (studiedToday ? 1 : 0),
    deadlinesTomorrow: m.blocks.filter((b) => b.day === tomorrow && ["exam", "deadline", "ext-exam", "ext-deadline"].includes(b.cal)) };
}
export function startReminders(getModel, prefs) { startLocalReminders(async () => summaryOf(await getModel()), prefs); }

export function notifyPanelHtml(m) {
  const p = prefsOf(m.intel.notify), st = status();
  return `<article class="panel glass notify" id="notifications" data-pane="control">
    <div class="panel-head"><div><h3>${icon("bell")} Notifications</h3><p class="sub">A few useful nudges, never more than ${p.cap} a day, never in your quiet hours.</p></div>
      <label class="switch"><input type="checkbox" id="n-on" role="switch" ${p.on && st.ok && st.granted ? "checked" : ""} ${st.ok ? "" : "disabled"}><span class="sw-track lg" aria-hidden="true"><span class="sw-knob"></span></span><span class="sr-only">Notifications</span></label></div>
    ${st.ok ? `<p class="small muted">${st.push ? (m.storeMode === "cloud" ? "They reach this device even when Gradify is closed." : "Sign in to get them when Gradify is closed; until then they arrive while it's open.") : "They arrive while Gradify is open or in the background. Notifications when it's closed switch on once push is set up."}</p>` : `<p class="notify-why">${esc(st.why)}</p>`}
    <form id="n-form" class="notify-form ${p.on ? "" : "off"}">
      <ul class="notify-kinds">${Object.entries(KINDS).map(([k, v]) => `<li><label><input type="checkbox" name="k-${k}" ${p.kinds[k] ? "checked" : ""}><span><b>${v.label}</b><em>${v.what}</em></span></label></li>`).join("")}</ul>
      <div class="i-two"><label><span>Daily plan at</span><select name="digestHour">${[6, 7, 8, 9, 10, 12].map((h) => `<option value="${h}" ${p.digestHour === h ? "selected" : ""}>${hhmm(h * 60)}</option>`).join("")}</select></label>
        <label><span>At most, a day</span><select name="cap">${[1, 2, 3].map((n) => `<option ${p.cap === n ? "selected" : ""}>${n}</option>`).join("")}</select></label></div>
      <div class="i-two"><label><span>Quiet from</span><input type="time" name="quietFrom" value="${hhmm(p.quietFrom)}" step="900"></label><label><span>until</span><input type="time" name="quietTo" value="${hhmm(p.quietTo)}" step="900"></label></div>
      <button class="cp-pill dark" type="submit">Save</button>
    </form>
  </article>`;
}

export function wireNotify(view, m, ctx) {
  const on = view.querySelector("#n-on"), form = view.querySelector("#n-form");
  if (!on) return;
  const read = () => { const f = new FormData(form), t = (v) => { const [h, mm] = String(v).split(":").map(Number); return h * 60 + mm; };
    return { ...prefsOf(m.intel.notify), digestHour: Number(f.get("digestHour")), cap: Number(f.get("cap")), quietFrom: t(f.get("quietFrom")), quietTo: t(f.get("quietTo")), kinds: Object.fromEntries(Object.keys(KINDS).map((k) => [k, f.get(`k-${k}`) === "on"])) }; };
  on.addEventListener("change", async () => {
    haptic("select");
    const prefs = { ...read(), on: on.checked };
    try {
      if (on.checked) { const r = await enable(ctx.store, prefs); await ctx.saveIntel({ notify: prefs }); complete("Notifications on", { sub: r.push ? "Even when Gradify is closed." : "While Gradify is open." }); }
      else { await disable(ctx.store); await ctx.saveIntel({ notify: prefs }); ctx.toast("Notifications off."); }
      ctx.rerender();
    } catch (e) { on.checked = false; ctx.toast(esc(e.message)); }
  });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const prefs = { ...read(), on: on.checked };
    await ctx.saveIntel({ notify: prefs }); await savePrefs(ctx.store, prefs);
    complete("Saved", { sub: "Your notifications follow these settings." });
  });
}

// the ask, on Today: once, when notifications would help and haven't been decided
export function notifyAskHtml(m) {
  const st = status(), p = prefsOf(m.intel.notify);
  if (!st.ok || p.on || st.granted === undefined || (typeof Notification !== "undefined" && Notification.permission !== "default") || m.intel.notifyAsked) return "";
  return `<article class="notify-ask"><span class="notify-ico" aria-hidden="true">${icon("bell")}</span><div><b>Want Gradify to remind you?</b><span>Your plan each morning, and a nudge before something slips. Two a day at most.</span></div>
    <div class="row-actions"><button type="button" class="cp-pill dark" data-n-yes>Turn on</button><button type="button" class="cp-pill" data-n-no>Not now</button></div></article>`;
}
export function wireNotifyAsk(view, m, ctx) {
  view.querySelector("[data-n-yes]")?.addEventListener("click", async () => {
    try { const prefs = { ...prefsOf(m.intel.notify), on: true }; const r = await enable(ctx.store, prefs); await ctx.saveIntel({ notify: prefs, notifyAsked: true }); complete("Notifications on", { sub: r.push ? "Even when Gradify is closed." : "While Gradify is open." }); ctx.rerender(); }
    catch (e) { await ctx.saveIntel({ notifyAsked: true }); ctx.toast(esc(e.message)); ctx.rerender(); }
  });
  view.querySelector("[data-n-no]")?.addEventListener("click", async () => { await ctx.saveIntel({ notifyAsked: true }); ctx.rerender(); });
}
