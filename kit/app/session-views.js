// The session planner on screen (kit/intel/session.js has the logic).
//   On Today: "How long have you got?" → a phased session from your own evidence, fitted before your next commitment.
//   #/session: the session itself, a step at a time, with a timer, the reason for each step, and "How did it go?".
//              Saying a step was a struggle changes the rest of the session (adapt). Opening a step goes to it in the
//              app; a "Back to your session" pill brings the learner back.
// The session lives in this browser (gradify.session), and what learners say about each step is kept with it
// (gradify.sessions, the last 30), as their own evidence for later sessions.
import { composeSession, adapt, untilNext, PHASES } from "../intel/session.js";
import { esc } from "../core/text.js";

const KEY = "gradify.session", LOG = "gradify.sessions";
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const write = (k, v) => { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch { /* fine */ } };
const block = () => Number(window.gradifyAccess?.get?.().block) || 25;
const active = () => { const s = read(KEY, null); return s && s.i < s.steps.length ? s : null; };

/** The planner panel for Today. m: the intelligence model (m.prio.items, m.blocks). */
export function plannerHtml(m) {
  const next = untilNext(m.blocks || []);
  const cur = active();
  return `<article class="panel glass ss-plan" data-pane="overview"><div class="panel-head"><div><h3>Plan a study session</h3><p class="sub">Tell Gradify how long you've got. It builds the session from your own evidence: recap, learn, apply, then test yourself${block() !== 25 ? `, in ${block()}-minute blocks` : ""}.</p></div>${cur ? `<a class="btn btn-primary lg btn-sm" href="#/session"><span>Carry on: step ${cur.i + 1} of ${cur.steps.length}</span></a>` : ""}</div>
    <div class="seg-chips ss-mins" role="group" aria-label="How long have you got?">${next ? `<button type="button" class="chip ss-next" data-m="${next.mins}">${next.mins} min, until ${esc(next.title)} at ${next.at}</button>` : ""}${[15, 25, 35, 45, 60].map((n) => `<button type="button" class="chip" data-m="${n}">${n} min</button>`).join("")}</div>
    <div class="ss-preview" aria-live="polite"></div></article>`;
}
export function wirePlanner(view, m) {
  const box = view.querySelector(".ss-plan"); if (!box) return;
  box.querySelector(".ss-mins").addEventListener("click", (e) => {
    const b = e.target.closest("[data-m]"); if (!b) return;
    box.querySelectorAll(".ss-mins .chip").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    const s = composeSession({ minutes: +b.dataset.m, items: m.prio?.items || [], block: block() });
    const pv = box.querySelector(".ss-preview");
    if (!s.steps.length) { pv.innerHTML = `<p class="sub">${esc(s.empty)}</p>`; return; }
    pv.innerHTML = `${stepsHtml(s.steps)}<div class="row-actions"><button type="button" class="btn btn-primary lg" data-start><span>Start the session</span></button><span class="sub">${s.study} min of study${s.study < s.minutes ? ` and ${s.minutes - s.study} min of breaks` : ""}.</span></div>`;
    pv.querySelector("[data-start]").addEventListener("click", () => { write(KEY, { steps: s.steps, i: 0, started: Date.now(), minutes: s.minutes, felt: [] }); location.hash = "#/session"; });
  });
}
const stepsHtml = (steps, at = -1) => `<ol class="ss-steps">${steps.map((x, i) => `<li class="ss-step ${x.phase} ${i < at ? "done" : i === at ? "now" : ""}"><span class="ss-ph">${esc(PHASES[x.phase].name)}</span><b>${esc(x.title)}${x.part ? ` (part ${x.part})` : ""}</b><span class="ss-m">${x.mins} min</span>${x.phase !== "break" ? `<details><summary>Why this?</summary><p>${esc(x.why || "")}</p>${x.because ? `<p class="sub">Evidence: ${esc(x.because)}</p>` : ""}</details>` : ""}</li>`).join("")}</ol>`;

let tick = 0;
/** #/session: one step at a time. ctx: { view, store, toast } */
export function renderSession({ view, store, toast }) {
  clearInterval(tick);
  const s = read(KEY, null);
  if (!s) { view.innerHTML = `<section class="ss"><h1>No session running</h1><p class="sub">Plan one on <a href="#/today">Today</a>: tell Gradify how long you've got.</p></section>`; return; }
  if (s.i >= s.steps.length) return finish();
  const x = s.steps[s.i], ph = PHASES[x.phase];
  s.stepStart ||= Date.now(); write(KEY, s);
  view.innerHTML = `<section class="ss">
    <div class="sess-top"><a href="#/today" class="back">✕ Leave</a><span class="goal-bar"><i style="width:${(s.i / s.steps.length) * 100}%"></i></span><span class="sub">Step ${s.i + 1} of ${s.steps.length}</span></div>
    <article class="panel glass ss-now ${x.phase}"><span class="ss-ph">${esc(ph.name)}</span><h1>${esc(x.title)}</h1><p class="ss-line">${esc(ph.line)}</p>
      ${x.phase !== "break" ? `<p>${esc(x.why || "")}</p>${x.because ? `<p class="sub">Evidence: ${esc(x.because)}</p>` : ""}` : ""}
      <div class="ss-timer" role="timer" aria-live="off"><span class="ss-clock">${x.mins}:00</span><span class="goal-bar"><i class="ss-tbar"></i></span></div>
      <div class="row-actions">${x.phase === "break" ? `<button type="button" class="btn btn-primary lg" data-felt="ok"><span>Back to it</span></button>` : `${x.href ? `<a class="btn btn-primary lg" href="${esc(x.href)}" data-open><span>Open it</span></a>` : ""}`}</div>
      ${x.phase !== "break" ? `<div class="ss-felt"><span>How did it go?</span><button type="button" class="btn btn-light lg btn-sm" data-felt="ok"><span>Done, it went well</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-felt="struggle"><span>Done, but I struggled</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-felt="skip"><span>Skip</span></button></div>` : ""}</article>
    <h2 class="lo-h">This session</h2>${stepsHtml(s.steps, s.i)}</section>`;
  const clock = view.querySelector(".ss-clock"), bar = view.querySelector(".ss-tbar"), total = x.mins * 60000;
  const draw = () => { const left = Math.max(0, total - (Date.now() - s.stepStart)), m = Math.floor(left / 60000), sec = Math.floor((left % 60000) / 1000); clock.textContent = left ? `${m}:${String(sec).padStart(2, "0")}` : "Time's up"; bar.style.width = `${100 - (left / total) * 100}%`; if (!left) { clearInterval(tick); clock.parentElement.classList.add("up"); } };
  draw(); tick = setInterval(() => { if (!clock.isConnected) { clearInterval(tick); return; } draw(); }, 1000);
  view.querySelector(".ss-now").addEventListener("click", (e) => {
    const f = e.target.closest("[data-felt]"); if (!f) return;
    const felt = f.dataset.felt;
    s.felt.push({ id: x.id, phase: x.phase, title: x.title, felt, mins: Math.round((Date.now() - s.stepStart) / 60000) });
    const rest = s.steps.slice(s.i + 1);
    s.steps = [...s.steps.slice(0, s.i + 1), ...(felt === "struggle" ? adapt(rest, x) : rest)];
    if (felt === "struggle") toast("Thanks. Gradify has changed the rest of the session: you'll meet it another way first.");
    s.i++; delete s.stepStart; write(KEY, s); renderSession({ view, store, toast });
  });

  function finish() {
    const done = s.felt.filter((f) => f.felt !== "skip" && f.phase !== "break"), mins = done.reduce((a, f) => a + Math.max(1, f.mins), 0), hard = done.filter((f) => f.felt === "struggle");
    write(LOG, [...read(LOG, []), { at: new Date().toISOString(), minutes: s.minutes, steps: s.felt }].slice(-30));
    write(KEY, null);
    if (done.length) store.logActivity?.({ kind: "session", xp: Math.min(60, 5 + done.length * 5), detail: { steps: done.length, struggles: hard.length, minutes: mins } }).catch(() => {});
    view.innerHTML = `<section class="ss"><article class="panel glass ss-now"><span class="ss-ph">Session complete</span><h1>${done.length} ${done.length === 1 ? "step" : "steps"} done</h1>
      <p>${hard.length ? `You found ${hard.map((f) => esc(f.title)).join(", ")} hard. That's useful: Gradify will bring ${hard.length === 1 ? "it" : "them"} back, and next time it will start with a different way in.` : "Nothing felt like a struggle. Gradify will keep the next session moving forward."}</p>
      <div class="row-actions"><a class="btn btn-primary lg" href="#/today"><span>Back to Today</span></a><a class="btn btn-ghost lg" href="#/progress"><span>See progress</span></a></div></article></section>`;
  }
}
/** While a session runs, a pill on every other screen brings the learner back to it. */
export function sessionPill(name) {
  document.querySelector(".ss-pill")?.remove();
  const s = active(); if (!s || name === "session") return;
  const a = document.createElement("a"); a.className = "ss-pill"; a.href = "#/session";
  a.textContent = `Back to your session · step ${s.i + 1} of ${s.steps.length}`;
  document.body.append(a);
}
