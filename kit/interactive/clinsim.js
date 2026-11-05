// Gradify clinical simulation engine (NurseGradify's Simulation section). The student looks after one
// simulated patient in simulated time. The patient's physiology changes minute by minute according to the
// case's processes, and responds to what the student does (or doesn't do):
//   assess (ABCDE, observations, charts) → score NEWS2 → act and prioritise → escalate with SBAR
//   → help arrives and a plan follows → carry it out → document → debrief
// Nothing is a fixed quiz: delay lets the patient deteriorate, good care changes the trajectory, and
// unsafe choices are allowed (and flagged), as they would be on a ward.
//
// EDUCATION ONLY. The physiology is a simplified teaching model, the numbers are illustrative, and local
// policy (NEWS2 chart, escalation, prescribing and protocols) always applies. Not a substitute for
// clinical supervision or for training on real equipment. Every case needs clinical validation
// (case.review.verified).
//
// case = { id, title, clock: "14:00", limit (minutes), patient: { name, age, where, summary, background: [] },
//   handover, vitals: { rr, spo2, o2, sbp, hr, temp, avpu, bg? }, flags,
//   processes: [{ when(s), rate: { vital: per minute }, toward: { vital: [target, step per minute] } }],
//   minute(s)                     case rules each minute (AVPU changes, re-sedation…)
//   find: { airway, breathing, circulation, disability, exposure, chart, drugs, ask }: (s) → text
//   actions: [{ id, group, label, mins, when(s), once, unsafe(s) → reason|null, partial(s) → note|null, run(s) → text }]
//   arrive(s, call) → { text }    what happens when the person called arrives (sets s.f.plan, s.f.reviewed…)
//   complete(s), collapse(s) → text|null, needLevel(news, s) (optional), window (minutes to escalate)
//   checks: [{ dim, label, test(s) → 0..1 | null (not applicable), why }]
//   sbar: { s, b, a, r: cue groups }, note: [{ text, cues }], rubric, model, lessons, review }
import { news2 } from "./news2.js";
import { esc, inline } from "../core/text.js";

export const DIMS = [
  { key: "assessment", label: "Assessment", what: "A systematic ABCDE assessment and timely observations" },
  { key: "recognition", label: "Recognising deterioration", what: "Scoring NEWS2 correctly and noticing change" },
  { key: "priorities", label: "Prioritising and acting", what: "Doing the most urgent things first, and the right interventions" },
  { key: "escalation", label: "Escalation", what: "Calling the right person, with the right urgency, in time" },
  { key: "communication", label: "SBAR handover", what: "A clear, complete, concise handover" },
  { key: "documentation", label: "Documentation", what: "A contemporaneous, accurate record of what happened" },
  { key: "safety", label: "Safe practice", what: "No unsafe actions" },
];
export const WEIGHTS = { assessment: 0.15, recognition: 0.15, priorities: 0.2, escalation: 0.2, communication: 0.1, documentation: 0.1, safety: 0.1 };
export const RESPONDERS = {
  nic: { label: "Nurse in charge", level: 1, delay: { emergency: 1, urgent: 2, routine: 5 } },
  doctor: { label: "Ward doctor on call", level: 2, delay: { emergency: 5, urgent: 15, routine: 60 } },
  outreach: { label: "Critical care outreach team", level: 3, delay: { emergency: 5, urgent: 10, routine: 30 } },
  emergency: { label: "Emergency team (2222 or your local number)", level: 4, delay: { emergency: 3, urgent: 3, routine: 3 } },
};
export const URGENCY = { emergency: "Emergency: come now", urgent: "Urgent: within 30 minutes", routine: "Routine: when you can" };
export const ABCDE = ["airway", "breathing", "circulation", "disability", "exposure"];
const BUILTIN = {
  airway: ["Assess", "A: Assess the airway", 1], breathing: ["Assess", "B: Assess breathing", 2], circulation: ["Assess", "C: Assess circulation", 2],
  disability: ["Assess", "D: Assess disability (AVPU, pupils, glucose, pain)", 2], exposure: ["Assess", "E: Exposure (temperature, wounds, skin, legs)", 2],
  obs: ["Observe", "Take a full set of observations", 3], chart: ["Observe", "Review the observation, fluid and food charts", 2],
  drugs: ["Observe", "Check the drug chart", 2], ask: ["Observe", "Talk to the patient", 1], wait: ["Observe", "Stay with the patient for 5 minutes", 5],
};
const BOUNDS = { rr: [0, 45], spo2: [60, 100], sbp: [40, 220], hr: [20, 180], temp: [33, 41.5], bg: [0.8, 25] };
const clamp = (x) => Math.max(0, Math.min(1, x));
const round = (x) => Math.round(x * 1000) / 1000;
const r1 = (x) => Math.round(x * 10) / 10;

// ---------- the model (pure: tests/clinsim.test.mjs) ----------
export const shown = (v) => ({ rr: Math.round(v.rr), spo2: Math.round(v.spo2), o2: !!v.o2, sbp: Math.round(v.sbp), dia: Math.round(v.sbp * 0.6), hr: Math.round(v.hr), temp: r1(v.temp), avpu: v.avpu, bg: v.bg != null ? r1(v.bg) : null });
export const trueNews = (s) => { const o = shown(s.v); return news2({ rr: o.rr, spo2: o.spo2, scale: 1, oxygen: o.o2, sbp: o.sbp, hr: o.hr, avpu: o.avpu, temp: o.temp }); };
export const isTrigger = (n) => n.total >= 5 || n.red;
export const clockAt = (c, t) => { const [h, m] = c.clock.split(":").map(Number), x = (h * 60 + m + t) % 1440; return `${String(Math.floor(x / 60)).padStart(2, "0")}:${String(x % 60).padStart(2, "0")}`; };

export function begin(c) {
  const s = { t: 0, v: structuredClone(c.vitals), f: structuredClone(c.flags || {}), did: {}, log: [], obs: [], news: [], calls: [], events: [], track: [], note: null, ended: null, triggerAt: null };
  s.track.push(snap(s));
  if (isTrigger(trueNews(s))) s.triggerAt = 0;
  return s;
}
const snap = (s) => ({ t: s.t, ...shown(s.v), news: trueNews(s).total });
function minute(c, s) {
  for (const p of c.processes || []) {
    if (p.when && !p.when(s)) continue;
    for (const [k, d] of Object.entries(p.rate || {})) if (s.v[k] != null) s.v[k] += d;
    for (const [k, [target, step]] of Object.entries(p.toward || {})) if (s.v[k] != null) { const d = target - s.v[k]; s.v[k] += Math.sign(d) * Math.min(Math.abs(d), step); }
  }
  for (const [k, [lo, hi]] of Object.entries(BOUNDS)) if (s.v[k] != null) s.v[k] = Math.max(lo, Math.min(hi, s.v[k]));
  s.t++;
  c.minute?.(s);
  if (s.t % 5 === 0) s.track.push(snap(s));
  if (s.triggerAt == null && isTrigger(trueNews(s))) s.triggerAt = s.t;
  for (const call of s.calls) if (!call.arrived && s.t >= call.at + call.delay) {
    call.arrived = s.t;
    const out = c.arrive(s, call) || {};
    s.events.push({ t: s.t, kind: "arrival", who: call.who, text: out.text || `${RESPONDERS[call.who].label} arrives.` });
  }
  const why = c.collapse?.(s);
  if (why && !s.ended) s.ended = { kind: "collapse", t: s.t, text: why };
}
export function advance(c, s, mins) {
  for (let i = 0; i < mins && !s.ended; i++) minute(c, s);
  if (!s.ended && c.complete?.(s)) s.ended = { kind: "complete", t: s.t, text: c.completeText || "The immediate situation is under control and the plan is under way." };
  if (!s.ended && s.t >= c.limit) s.ended = { kind: "time", t: s.t, text: c.timeUp || "Your time with this patient is up, and a colleague takes over." };
  return s;
}

export function actions(c, s) {
  const b = Object.entries(BUILTIN).filter(([id]) => id === "obs" || id === "wait" || c.find?.[id]).map(([id, [group, label, mins]]) => ({ id, group, label, mins, builtin: true }));
  return [...b, ...(c.actions || []).filter((a) => (!a.when || a.when(s)) && !(a.once && s.did[a.id]))];
}
// do one action: log it, run it, then let the minutes pass
export function act(c, s, id) {
  const a = actions(c, s).find((x) => x.id === id);
  if (!a || s.ended) return null;
  const unsafe = a.unsafe?.(s) || null, partial = a.partial?.(s) || null;
  let text;
  if (id === "obs") { const o = { ...shown(s.v), t: s.t, actual: trueNews(s).total, entered: null }; s.obs.push(o); text = obsLine(o); }
  else if (id === "wait") text = c.waitText?.(s) || "You stay with the patient and watch closely.";
  else if (a.builtin) text = c.find[id](s);
  else text = a.run ? a.run(s) : "";
  (s.did[id] ||= []).push(s.t);
  s.log.push({ t: s.t, id, label: a.label, group: a.group, unsafe, partial });
  advance(c, s, a.mins);
  return { text, unsafe, partial, obs: id === "obs" ? s.obs[s.obs.length - 1] : null };
}
export const obsLine = (o) => `RR ${o.rr} · SpO2 ${o.spo2}% ${o.o2 ? "on oxygen" : "on air"} · BP ${o.sbp}/${o.dia} · HR ${o.hr} · Temp ${o.temp}°C · ${o.avpu === "A" ? "Alert" : o.avpu === "C" ? "New confusion" : o.avpu === "V" ? "Responds to voice" : o.avpu === "P" ? "Responds to pain" : "Unresponsive"}${o.bg != null && o.bgShown ? ` · Glucose ${o.bg}` : ""}`;

export function enterNews(s, value) {
  const o = [...s.obs].reverse().find((x) => x.entered == null);
  if (!o) return null;
  o.entered = Number(value);
  const ok = o.entered === o.actual, close = Math.abs(o.entered - o.actual) === 1;
  s.news.push({ t: o.t, entered: o.entered, actual: o.actual });
  return { ok, close, actual: o.actual, score: ok ? 1 : close ? 0.5 : 0 };
}

// a routine call to the doctor is no more than telling the nurse in charge; an emergency call to the
// doctor is treated as an emergency-level response
const effLevel = (call) => (call.who === "doctor" ? { routine: 1, urgent: 2, emergency: 3 }[call.urgency] : RESPONDERS[call.who].level);
export const needLevel = (c, n, s) => (c.needLevel ? c.needLevel(n, s) : n.total >= 7 ? 3 : isTrigger(n) ? 2 : 1);
export function escalate(c, s, { who, urgency, sbar = {} }) {
  if (!RESPONDERS[who] || !URGENCY[urgency] || s.ended) return null;
  const n = trueNews(s), call = { who, urgency, sbar, at: s.t, delay: RESPONDERS[who].delay[urgency], news: n.total, red: n.red, need: needLevel(c, n, s), arrived: null };
  call.level = effLevel(call);
  s.calls.push(call);
  s.log.push({ t: s.t, id: "escalate", label: `Escalated to the ${RESPONDERS[who].label.toLowerCase()} (${urgency})`, group: "Escalate", unsafe: null, partial: null });
  advance(c, s, 2);
  return call;
}

// cue matching, as in the reasoning engine, with two specials: {news} (a NEWS2 total seen in this case)
// and {time} (a clock time such as 14:20)
const fold = (t) => ` ${String(t || "").toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ")} `;
export function covers(text, cues, s) {
  const t = fold(text), totals = new Set([...s.obs.map((o) => o.actual), ...s.calls.map((x) => x.news)].map(String));
  return cues.every((alts) => alts.some((a) => a === "{news}" ? [...totals].some((n) => new RegExp(`(^|[^0-9])${n}([^0-9]|$)`).test(t)) : a === "{time}" ? /\b\d{1,2}[:.]\d{2}\b/.test(t) : t.includes(a.toLowerCase())));
}
export function markSbar(c, sbar, s) {
  const parts = {};
  for (const k of ["s", "b", "a", "r"]) { const groups = c.sbar[k] || []; const hit = groups.map((g) => covers(sbar[k], [g], s)); parts[k] = { score: groups.length ? hit.filter(Boolean).length / groups.length : 1, hit }; }
  return { parts, score: round((parts.s.score + parts.b.score + parts.a.score + parts.r.score) / 4) };
}
export function markNote(c, text, s) {
  const found = c.note.map((p) => covers(text, p.cues, s));
  return { found, score: round(c.note.length ? found.filter(Boolean).length / c.note.length : 0) };
}

const mean = (xs) => { const v = xs.filter((x) => x != null); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; };
export function debriefData(c, s) {
  const first = (id) => s.did[id]?.[0] ?? null;
  const caseDims = {};
  const checks = (c.checks || []).map((k) => { const v = k.test(s); const x = v == null ? null : clamp(v); (caseDims[k.dim] ||= []).push(x); return { ...k, score: x }; });
  // assessment: ABCDE covered, and a full set of observations early
  const abcde = ABCDE.filter((k) => c.find?.[k]).filter((k) => first(k) != null).length / ABCDE.filter((k) => c.find?.[k]).length;
  const firstObs = first("obs"), obsEarly = firstObs == null ? 0 : firstObs <= 10 ? 1 : firstObs <= 20 ? 0.5 : 0.2;
  // recognition: NEWS2 scores entered correctly
  const newsAcc = mean(s.news.map((x) => (x.entered === x.actual ? 1 : Math.abs(x.entered - x.actual) === 1 ? 0.5 : 0)));
  // priorities: the first assessment was A or B (or an airway or breathing intervention)
  const firstAssess = s.log.find((x) => ABCDE.includes(x.id) || x.group === "Assess"), ab = firstAssess ? (["airway", "breathing"].includes(firstAssess.id) || c.firstOk?.includes(firstAssess.id) ? 1 : 0.5) : 0;
  // escalation: the first call good enough for the patient's state at the time, and how long it took
  const good = s.calls.find((x) => x.level >= x.need && !(x.need >= 2 && x.urgency === "routine"));
  const from = s.triggerAt ?? 0, w = c.window || 15;
  let esc = 0, escNote = "";
  if (s.triggerAt == null && !s.calls.length) { esc = 1; escNote = "The patient never met escalation criteria."; }
  else if (!good) {
    const near = s.calls.find((x) => x.level === x.need - 1 && x.urgency !== "routine");
    if (near) { const d = near.at - from; esc = d <= w ? 0.6 : 0.4; escNote = `You escalated ${Math.max(0, d)} minutes after the patient first met escalation criteria, one level short of what the score called for: NEWS2 was ${near.news} at the time of your call${near.news >= 7 ? ", which needs an emergency response (remember that supplemental oxygen adds 2 points)" : ""}.`; }
    else { esc = s.calls.length ? 0.3 : 0; escNote = s.calls.length ? "You escalated, but not to the right level or urgency for how unwell the patient was." : "You didn't escalate."; }
  }
  else { const d = good.at - from; esc = d <= w ? 1 : d <= 2 * w ? 0.6 : 0.3; escNote = `You escalated appropriately ${Math.max(0, d)} minutes after the patient first met escalation criteria.`; if (good.level > good.need + 1) { esc = Math.max(0, esc - 0.2); escNote += " That was a higher level of response than the observations called for at the time: fine if you were worried, but say why."; } }
  const sb = s.calls.length ? markSbar(c, (good || s.calls[s.calls.length - 1]).sbar, s) : { score: 0, parts: null };
  const note = s.note != null ? markNote(c, s.note, s) : { score: 0, found: c.note.map(() => false) };
  const unsafe = s.log.filter((x) => x.unsafe);
  const dims = {
    assessment: mean([abcde, obsEarly, ...(caseDims.assessment || [])]),
    recognition: mean([newsAcc ?? 0, ...(caseDims.recognition || [])]),
    priorities: mean([ab, ...(caseDims.priorities || [])]),
    escalation: mean([esc, ...(caseDims.escalation || [])]),
    communication: sb.score,
    documentation: note.score,
    safety: unsafe.length ? Math.max(0, 1 - 0.5 * unsafe.length) : 1,
  };
  for (const k of Object.keys(dims)) dims[k] = round(dims[k] ?? 0);
  let overall = round(Object.entries(WEIGHTS).reduce((a, [k, x]) => a + x * dims[k], 0));
  if (s.ended?.kind === "collapse") overall = Math.min(overall, 0.5);
  return { dims, overall, checks, abcde, firstObs, newsAcc, esc, escNote, good, sbar: sb, note, unsafe, ended: s.ended };
}

// ---------- the interface ----------
const pct = (x) => `${Math.round((x || 0) * 100)}%`;
const band = (x) => (x >= 0.8 ? "ok" : x >= 0.5 ? "part" : "no");
const GROUPS = ["Assess", "Observe", "Act", "Medicines"];

// NEWS2 over time, with the student's actions marked: the "what was happening" picture for the debrief
function trend(c, s) {
  const pts = s.track, W = 560, H = 150, P = 28, maxT = Math.max(c.limit, s.t), x = (t) => P + (t / maxT) * (W - 2 * P), y = (n) => H - P - (Math.min(n, 15) / 15) * (H - 2 * P);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${x(p.t).toFixed(1)},${y(p.news).toFixed(1)}`).join("");
  const marks = s.log.filter((l) => l.group === "Escalate" || l.group === "Act" || l.group === "Medicines").map((l) => `<g class="cs-mark ${l.unsafe ? "crit" : ""}"><line x1="${x(l.t)}" x2="${x(l.t)}" y1="${P - 6}" y2="${H - P}"/><title>${esc(clockAt(c, l.t))} ${esc(l.label)}</title></g>`).join("");
  return `<figure class="cs-trend"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="The patient's NEWS2 over the simulation, with your actions marked">
    <rect class="cs-band hi" x="${P}" y="${y(15)}" width="${W - 2 * P}" height="${y(7) - y(15)}"/><rect class="cs-band mid" x="${P}" y="${y(7)}" width="${W - 2 * P}" height="${y(5) - y(7)}"/>
    ${[0, 5, 7, 10].map((n) => `<text x="${P - 6}" y="${y(n) + 4}" text-anchor="end">${n}</text>`).join("")}${marks}<path d="${line}"/>
    <text x="${P}" y="${H - 6}">${esc(c.clock)}</text><text x="${W - P}" y="${H - 6}" text-anchor="end">${esc(clockAt(c, maxT))}</text></svg>
    <figcaption>The patient's actual NEWS2 every 5 minutes (shaded: 5 to 6 and 7 or more). Vertical lines are your interventions and escalations; red ones were unsafe.</figcaption></figure>`;
}

export function mount(el, c, ctx = {}) {
  let s = begin(c), last = null, mode = "play", recorded = false;   // mode: play | news | escalate | note | debrief
  const feed = [];
  const say = (t, text, cls = "") => feed.unshift({ t, text, cls });
  say(0, `<b>Handover.</b> ${c.handover}`);

  const head = () => `<div class="cs-head"><div><span class="co-kicker">Clinical simulation</span><h2>${esc(c.title)}</h2></div><div class="cs-clock" aria-live="polite"><b>${clockAt(c, s.t)}</b><small>${s.t} min in</small></div></div>
    <div class="cs-patient"><b>${esc(c.patient.name)}, ${c.patient.age}</b> · ${esc(c.patient.where)}<p>${inline(c.patient.summary)}</p></div>`;
  const chart = () => `<aside class="cs-chart" aria-label="Observation chart"><h4>Observation chart</h4>${s.obs.length ? `<div class="cs-tablewrap"><table><thead><tr><th>Time</th><th>RR</th><th>SpO2</th><th>BP</th><th>HR</th><th>T</th><th>AVPU</th><th>NEWS2</th></tr></thead><tbody>${s.obs.map((o) => `<tr><td>${clockAt(c, o.t)}</td><td>${o.rr}</td><td>${o.spo2}${o.o2 ? "<small>O2</small>" : ""}</td><td>${o.sbp}/${o.dia}</td><td>${o.hr}</td><td>${o.temp}</td><td>${o.avpu}</td><td>${o.entered ?? "?"}</td></tr>`).join("")}</tbody></table></div>` : `<p class="tx-note">No observations recorded yet.</p>`}
    <h4>Background</h4><ul>${c.patient.background.map((b) => `<li>${inline(b)}</li>`).join("")}</ul>
    ${s.calls.length ? `<h4>Escalation</h4><ul>${s.calls.map((x) => `<li>${clockAt(c, x.at)}: ${esc(RESPONDERS[x.who].label)} (${esc(x.urgency)})${x.arrived ? `, arrived ${clockAt(c, x.arrived)}` : ", on the way"}</li>`).join("")}</ul>` : ""}</aside>`;
  const menu = () => { const list = actions(c, s); return `<div class="cs-menu">${GROUPS.map((g) => { const xs = list.filter((a) => a.group === g); return xs.length ? `<div class="cs-group"><h4>${g === "Act" ? "Act" : g}</h4>${xs.map((a) => `<button type="button" data-act="${esc(a.id)}">${esc(a.label)}<small>${a.mins} min</small></button>`).join("")}</div>` : ""; }).join("")}
    <div class="cs-group"><h4>Escalate</h4><button type="button" data-escalate>Call for help or escalate (SBAR)</button></div></div>`; };
  const feedHtml = () => `<ol class="cs-feed">${feed.map((x) => `<li class="${x.cls}"><time>${clockAt(c, x.t)}</time><div>${x.text}</div></li>`).join("")}</ol>`;

  const centre = () => {
    if (mode === "news") return `<form class="cs-news" data-news><label for="cs-n"><b>What is the NEWS2 score for these observations?</b></label><p>${esc(obsLine(s.obs[s.obs.length - 1]))}</p><input id="cs-n" type="number" min="0" max="20" required inputmode="numeric"><button class="btn btn-light lg btn-sm"><span>Record score</span></button></form>`;
    if (mode === "escalate") return `<form class="cs-sbar" data-sbar><h3>Escalate using SBAR</h3><p class="tx-note">Write what you would say. The simulation keeps running while you call (2 minutes).</p>
      <label>Who are you calling?<select name="who" required><option value="">Choose…</option>${Object.entries(RESPONDERS).map(([k, r]) => `<option value="${k}">${esc(r.label)}</option>`).join("")}</select></label>
      <label>How urgently?<select name="urgency" required><option value="">Choose…</option>${Object.entries(URGENCY).map(([k, t]) => `<option value="${k}">${esc(t)}</option>`).join("")}</select></label>
      ${[["s", "Situation", "Who you are, who the patient is, and what's worrying you"], ["b", "Background", "Relevant history: admission, surgery, conditions, medicines"], ["a", "Assessment", "Your ABCDE findings and the NEWS2 score"], ["r", "Recommendation", "What you need, and how quickly"]].map(([k, t, h]) => `<label>${t}<small>${h}</small><textarea name="${k}" rows="2" required></textarea></label>`).join("")}
      <div class="cs-row"><button class="btn btn-light lg btn-sm"><span>Make the call</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-cancel><span>Cancel</span></button></div></form>`;
    if (mode === "note") return `<form class="cs-noteform" data-note><h3>${esc(s.ended.text)}</h3><p>Before you hand over, write your nursing entry in the patient's record: what you found, what you did and when, who you escalated to, and the plan.</p>
      <label class="sr-only" for="cs-note">Your record entry</label><textarea id="cs-note" rows="8" required placeholder="${esc(clockAt(c, s.t))} …"></textarea><button class="btn btn-light lg btn-sm"><span>Save entry and see the debrief</span></button></form>`;
    if (mode === "debrief") return debrief();
    return `${last ? `<div class="cs-last ${last.unsafe ? "crit" : ""}" role="status">${last.html}</div>` : ""}${menu()}`;
  };

  function debrief() {
    const d = debriefData(c, s);
    if (!recorded) { recorded = true; recordRun(d); }
    const lessons = c.lessons || [];
    return `<div class="cs-debrief"><h3>Debrief</h3><p class="cs-end ${d.ended.kind === "collapse" ? "crit" : ""}">${esc(d.ended.text)}</p>
      <div class="rx-score"><b>${pct(d.overall)}</b><span>overall${d.ended.kind === "collapse" ? " (capped at 50% because the patient came to harm)" : ""}</span></div>
      ${trend(c, s)}
      <table class="rx-dims"><caption class="sr-only">Your care by dimension</caption><tbody>${DIMS.map((x) => `<tr class="${band(d.dims[x.key])}"><th scope="row">${esc(x.label)}<small>${esc(x.what)}</small></th><td><span class="rx-bar" aria-hidden="true"><i style="width:${pct(d.dims[x.key])}"></i></span></td><td>${pct(d.dims[x.key])}</td></tr>`).join("")}</tbody></table>
      ${d.unsafe.length ? `<div class="sx-feedback no crit"><b>Unsafe actions</b><ul>${d.unsafe.map((u) => `<li>${clockAt(c, u.t)}: ${esc(u.label)}. ${inline(u.unsafe)}</li>`).join("")}</ul></div>` : ""}
      <h4>What went well, and what to work on</h4><ul class="rx-points">
        <li class="${d.abcde === 1 ? "ok" : "miss"}">${d.abcde === 1 ? "✓" : "○"} ABCDE assessment: ${Math.round(d.abcde * 5)} of 5 parts assessed.</li>
        <li class="${d.firstObs != null && d.firstObs <= 10 ? "ok" : "miss"}">${d.firstObs != null && d.firstObs <= 10 ? "✓" : "○"} First full set of observations ${d.firstObs == null ? "never taken" : `at ${clockAt(c, d.firstObs)}`}.</li>
        <li class="${(d.newsAcc ?? 0) >= 0.8 ? "ok" : "miss"}">${(d.newsAcc ?? 0) >= 0.8 ? "✓" : "○"} NEWS2 scoring: ${s.news.length ? s.news.map((x) => `${clockAt(c, x.t)} you scored ${x.entered}, actual ${x.actual}`).join("; ") : "no scores entered"}.</li>
        <li class="${d.esc >= 0.8 ? "ok" : "miss"}">${d.esc >= 0.8 ? "✓" : "○"} ${esc(d.escNote)}</li>
        ${d.checks.filter((k) => k.score != null).map((k) => `<li class="${k.score >= 0.8 ? "ok" : "miss"}">${k.score >= 0.8 ? "✓" : "○"} ${inline(k.label)}${k.score < 0.8 && k.why ? ` <small>${inline(k.why)}</small>` : ""}</li>`).join("")}</ul>
      ${d.sbar.parts ? `<h4>Your SBAR</h4><ul class="rx-points">${[["s", "Situation"], ["b", "Background"], ["a", "Assessment"], ["r", "Recommendation"]].map(([k, t]) => `<li class="${d.sbar.parts[k].score >= 0.99 ? "ok" : d.sbar.parts[k].score > 0 ? "part" : "miss"}"><b>${t}</b> (${pct(d.sbar.parts[k].score)}): ${esc((d.good || s.calls[s.calls.length - 1]).sbar[k] || "")}</li>`).join("")}</ul><p class="tx-note">Model: ${inline(c.sbarModel || "")}</p>` : ""}
      <h4>Your record entry</h4><ul class="rx-points">${c.note.map((p, i) => `<li class="${d.note.found[i] ? "ok" : "miss"}">${d.note.found[i] ? "✓" : "○"} ${inline(p.text)}</li>`).join("")}</ul>
      <details class="rx-model"><summary>Your timeline</summary><ol class="cs-timeline">${s.log.map((l) => `<li class="${l.unsafe ? "crit" : l.partial ? "part" : ""}"><time>${clockAt(c, l.t)}</time> ${esc(l.label)}${l.partial ? ` <small>${inline(l.partial)}</small>` : ""}</li>`).join("")}</ol></details>
      <details class="rx-model"><summary>How an experienced nurse might have handled it</summary>${c.model.split("\n").filter(Boolean).map((x) => `<p>${inline(x)}</p>`).join("")}</details>
      <div class="rx-ai"><h4>Feedback on your SBAR and record from the tutor</h4><p>Gradify AI reads your SBAR and record entry against the case rubric. Its feedback is provisional study help.</p><button type="button" class="btn btn-ghost lg btn-sm" data-ai><span>Get AI feedback</span></button><div class="rx-aiout"></div></div>
      ${lessons.length && ctx.lessonHref ? `<p class="rx-next"><b>Lessons to revisit:</b> ${lessons.map((l) => `<a href="${ctx.lessonHref(l)}">${esc(ctx.lessonTitle?.(l) || l)}</a>`).join(" · ")}</p>` : ""}
      ${c.review?.verified ? "" : `<p class="sx-banner">This scenario is awaiting clinical validation by a registered nurse educator. ${inline(c.review?.note || "")}</p>`}
      <button type="button" class="btn btn-ghost lg btn-sm" data-restart><span>Run the simulation again</span></button></div>`;
  }
  function recordRun(d) {
    if (!ctx.record) return;
    const l = c.lessons?.[0] || null;
    for (const k of ["assessment", "recognition", "priorities", "escalation", "safety"]) ctx.record(k, { type: "sim", d: 3, score: d.dims[k], lesson: l });
    ctx.record("sbar", { type: "short", d: 2, score: d.dims.communication, response: (d.good || s.calls[s.calls.length - 1])?.sbar || null, lesson: l, status: "provisional" });
    ctx.record("note", { type: "short", d: 2, score: d.dims.documentation, response: s.note, lesson: l, status: "provisional" });
    s.news.forEach((x, i) => ctx.record(`news2-${i + 1}`, { type: "num", d: 2, score: x.entered === x.actual ? 1 : 0, response: x.entered, lesson: l }));
    ctx.finish?.(d.overall);
  }

  const paint = () => {
    el.innerHTML = `<div class="cs">${c.banner ? `<p class="sx-banner" role="note">${inline(c.banner)}</p>` : ""}${head()}
      <div class="cs-body"><section class="cs-main">${centre()}${mode !== "debrief" ? feedHtml() : ""}</section>${chart()}</div></div>`;
    wire();
  };
  const after = () => {
    for (const e of s.events.splice(0)) say(e.t, `<b>${esc(RESPONDERS[e.who].label)} arrives.</b> ${inline(e.text)}`, "arrive");
    if (s.ended && mode === "play") { say(s.t, `<b>${esc(s.ended.text)}</b>`, s.ended.kind === "collapse" ? "crit" : ""); mode = "note"; }
  };
  function wire() {
    el.querySelectorAll("[data-act]").forEach((b) => b.addEventListener("click", () => {
      const id = b.dataset.act, r = act(c, s, id); if (!r) return;
      const label = actions(c, s).find((a) => a.id === id)?.label || s.log[s.log.length - 1].label;
      const html = `<b>${esc(s.log[s.log.length - 1].label)}.</b> ${inline(r.text)}${r.unsafe ? `<p class="crit"><b>Unsafe:</b> ${inline(r.unsafe)}</p>` : ""}${r.partial ? `<p><small>${inline(r.partial)}</small></p>` : ""}`;
      say(s.log[s.log.length - 1].t, html, r.unsafe ? "crit" : ""); last = { html, unsafe: r.unsafe }; void label;
      if (id === "obs") mode = "news";
      after(); paint();
    }));
    el.querySelector("[data-escalate]")?.addEventListener("click", () => { mode = "escalate"; paint(); el.querySelector("[data-sbar] select")?.focus(); });
    el.querySelector("[data-cancel]")?.addEventListener("click", () => { mode = "play"; paint(); });
    el.querySelector("[data-news]")?.addEventListener("submit", (e) => {
      e.preventDefault(); const r = enterNews(s, e.target.querySelector("input").value);
      const html = r.ok ? `NEWS2 ${r.actual}: correct. ${r.actual >= 7 ? "That's an emergency response trigger." : r.actual >= 5 ? "That's an urgent response trigger." : ""}` : `You scored ${s.news[s.news.length - 1].entered}; the NEWS2 is <b>${r.actual}</b>. Check each parameter against the chart.`;
      say(s.t, html, r.ok ? "" : "part"); last = { html }; mode = s.ended ? "note" : "play"; after(); paint();
    });
    el.querySelector("[data-sbar]")?.addEventListener("submit", (e) => {
      e.preventDefault(); const f = new FormData(e.target);
      const call = escalate(c, s, { who: f.get("who"), urgency: f.get("urgency"), sbar: { s: f.get("s"), b: f.get("b"), a: f.get("a"), r: f.get("r") } });
      if (call) { const html = `You call the ${esc(RESPONDERS[call.who].label.toLowerCase())}: ${esc(URGENCY[call.urgency].toLowerCase())}. ${call.delay <= 2 ? "They're on their way now." : `They say they'll be there in about ${call.delay} minutes.`}`; say(call.at, html); last = { html }; }
      mode = "play"; after(); paint();
    });
    el.querySelector("[data-note]")?.addEventListener("submit", (e) => { e.preventDefault(); s.note = e.target.querySelector("textarea").value; mode = "debrief"; paint(); el.querySelector(".cs-debrief h3")?.focus?.(); });
    el.querySelector("[data-restart]")?.addEventListener("click", () => { s = begin(c); last = null; mode = "play"; recorded = false; feed.length = 0; say(0, `<b>Handover.</b> ${c.handover}`); paint(); });
    el.querySelector("[data-ai]")?.addEventListener("click", askAi);
  }
  async function askAi(e) {
    const btn = e.currentTarget, out = el.querySelector(".rx-aiout");
    if (!ctx.ask) { out.innerHTML = `<p class="co-empty">AI feedback isn't available here.</p>`; return; }
    btn.disabled = true; out.innerHTML = `<p class="co-empty">The tutor is reading your SBAR and record…</p>`;
    const call = s.calls[s.calls.length - 1];
    const answer = `SBAR (to ${call ? RESPONDERS[call.who].label : "nobody: no escalation was made"}):\nS: ${call?.sbar.s || ""}\nB: ${call?.sbar.b || ""}\nA: ${call?.sbar.a || ""}\nR: ${call?.sbar.r || ""}\n\nRECORD ENTRY:\n${s.note || ""}\n\nTIMELINE:\n${s.log.map((l) => `${clockAt(c, l.t)} ${l.label}`).join("\n")}`;
    try {
      const { feedback } = await ctx.ask({ mode: "mark", task: { title: c.title, brief: "A simulated nursing scenario (education only). Judge the learner's escalation (SBAR) and record entry.", prompt: `${c.handover}\n\nPATIENT: ${c.patient.summary}\nBACKGROUND: ${c.patient.background.join("; ")}`, rubric: c.rubric, model: c.model }, answer });
      out.innerHTML = `<ul class="rx-points">${feedback.criteria.map((x) => `<li class="${x.rating === "met" ? "ok" : x.rating === "partly" ? "part" : "miss"}"><b>${esc(x.criterion)}</b>: ${esc(x.rating)}. ${esc(x.comment)}</li>`).join("")}</ul><p>${esc(feedback.summary || "")}</p>`;
      const sc = feedback.criteria.length ? feedback.criteria.reduce((a, x) => a + (x.rating === "met" ? 1 : x.rating === "partly" ? 0.5 : 0), 0) / feedback.criteria.length : 0;
      ctx.record?.("ai-review", { type: "short", d: 2, score: sc, response: answer, lesson: c.lessons?.[0], method: "ai-assisted", status: "provisional" });
    } catch (err) { out.innerHTML = err.signin && ctx.signinLine ? ctx.signinLine("AI feedback", "compare your work with the model above") : `<p class="co-empty">${esc(err.message)}</p>`; }
    btn.disabled = false;
  }
  paint();
  return () => { el.innerHTML = ""; };
}
