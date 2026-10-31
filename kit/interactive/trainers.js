// Gradify practice trainers built on generated items: NEWS2 scoring, medicines calculations and the
// court hierarchy. Each exports mount(el, opts) for the course "Practice" view and pure generators
// that tests can check. Clinical items are illustrative and never name real medicines or doses.
import { esc, inline } from "../core/text.js";
import { news2, PARAM_LABELS, NEWS2_SOURCE } from "./news2.js";

const rnd = (r, a, b) => a + Math.floor(r() * (b - a + 1));
const pick = (r, xs) => xs[Math.floor(r() * xs.length)];
const rng = (seed) => () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

// ---------- NEWS2 trainer ----------
export function genObs(r) {
  // mostly plausible adult observations with some abnormal values
  const sick = r() < 0.6;
  return {
    rr: sick ? pick(r, [8, 10, 18, 21, 22, 24, 26, 30]) : rnd(r, 12, 20),
    spo2: sick ? pick(r, [89, 91, 92, 93, 94, 95, 96, 98]) : rnd(r, 96, 99),
    oxygen: sick && r() < 0.4, scale: 1,
    sbp: sick ? pick(r, [84, 92, 98, 104, 108, 118, 136, 224]) : rnd(r, 112, 150),
    hr: sick ? pick(r, [38, 46, 88, 96, 104, 115, 124, 135]) : rnd(r, 56, 88),
    avpu: sick && r() < 0.25 ? pick(r, ["C", "V"]) : "A",
    temp: sick ? pick(r, [34.8, 35.6, 36.4, 37.9, 38.4, 38.9, 39.3]) : pick(r, [36.4, 36.8, 37.1, 37.5]),
  };
}
const obsRows = (o) => [["rr", `${o.rr} breaths/min`], ["spo2", `${o.spo2}% (scale 1)`], ["air", o.oxygen ? "On oxygen" : "Air"], ["sbp", `${o.sbp} mmHg`], ["hr", `${o.hr} bpm`], ["avpu", { A: "Alert", C: "New confusion", V: "Responds to voice" }[o.avpu]], ["temp", `${o.temp.toFixed(1)}°C`]];

export function mountNews2(el, { onComplete } = {}) {
  let r = rng(Date.now() >>> 0), n = 0, right = 0;
  const round = () => {
    const o = genObs(r), res = news2(o);
    el.innerHTML = `<div class="tx"><p class="sx-banner" role="note">Practice with the RCP NEWS2 chart (2017). Educational only: in practice use your organisation's chart and escalation policy.</p>
      <h2>Score the observations</h2><p>Score each parameter, then choose the clinical response. Round ${n + 1} of 5.</p>
      <table class="tx-table"><thead><tr><th>Parameter</th><th>Observation</th><th>Your score</th></tr></thead><tbody>
      ${obsRows(o).map(([k, v]) => `<tr><td>${PARAM_LABELS[k]}</td><td>${esc(v)}</td><td><select data-k="${k}" aria-label="Score for ${PARAM_LABELS[k]}"><option value="">–</option>${[0, 1, 2, 3].map((x) => `<option>${x}</option>`).join("")}</select></td></tr>`).join("")}</tbody></table>
      <label class="tx-resp">Clinical response <select data-resp aria-label="Clinical response"><option value="">Choose…</option>${["none", "low", "low-medium", "medium", "high"].map((x) => `<option value="${x}">${{ none: "Routine monitoring (total 0)", low: "Ward-based response (total 1–4)", "low-medium": "Urgent ward-based response (single parameter 3)", medium: "Urgent response (total 5–6)", high: "Emergency response (total 7+)" }[x]}</option>`).join("")}</select></label>
      <button type="button" class="btn btn-light lg btn-sm" data-check><span>Check</span></button><div class="tx-out" role="status"></div></div>`;
    el.querySelector("[data-check]").addEventListener("click", () => {
      let ok = 0;
      el.querySelectorAll("select[data-k]").forEach((s) => { const good = Number(s.value) === res.parts[s.dataset.k] && s.value !== ""; ok += good; s.closest("tr").className = good ? "ok" : "no"; s.closest("tr").lastElementChild.insertAdjacentHTML("beforeend", good ? "" : ` <small>→ ${res.parts[s.dataset.k]}</small>`); });
      const respOk = el.querySelector("[data-resp]").value === res.response.level;
      const all = ok === 7 && respOk; right += all; n++;
      el.querySelector(".tx-out").innerHTML = `<p><b>Total NEWS2: ${res.total}${res.red ? " (with a single parameter scoring 3)" : ""}.</b> ${ok} of 7 parameters right; response ${respOk ? "right" : "not right"}.</p><p><b>${esc(res.response.label)}:</b> ${esc(res.response.text)}</p><p class="tx-note">Whatever the score, escalate if you are worried about the patient.</p>${n < 5 ? `<button type="button" class="btn btn-ghost lg btn-sm" data-next><span>Next patient →</span></button>` : `<p><b>${right} of 5 fully correct.</b></p><button type="button" class="btn btn-ghost lg btn-sm" data-again><span>Five more</span></button>`}`;
      el.querySelector("[data-check]").disabled = true;
      el.querySelector("[data-next]")?.addEventListener("click", round);
      el.querySelector("[data-again]")?.addEventListener("click", () => { n = 0; right = 0; round(); });
      if (n === 5) onComplete?.({ score: right / 5 });
    });
  };
  round();
}

// ---------- medicines calculations (illustrative) ----------
// Every item uses "Medicine A/B/…" and round illustrative numbers: practice for numeracy, not dosing advice.
const nice = (x) => Math.round(x * 100) / 100;
export function genCalc(r) {
  const med = `Medicine ${pick(r, ["A", "B", "C", "D", "E"])}`;
  const kind = pick(r, ["tablets", "liquid", "rate", "drops", "convert", "weight"]);
  if (kind === "tablets") { const strength = pick(r, [5, 10, 25, 50, 100, 250, 500]); const k = pick(r, [0.5, 1, 1.5, 2, 3]); const dose = strength * k; return { kind, q: `The prescription is for ${dose} mg of ${med}. Each tablet contains ${strength} mg. How many tablets is that?`, unit: "tablets", answer: k, method: `What you want ÷ what you've got = ${dose} ÷ ${strength} = ${k} tablet${k === 1 ? "" : "s"}.` }; }
  if (kind === "liquid") { const per = pick(r, [5, 10]); const conc = pick(r, [25, 50, 100, 125, 250]); const dose = conc * pick(r, [0.4, 0.5, 1, 1.5, 2]); const ml = nice((dose / conc) * per); return { kind, q: `The prescription is for ${dose} mg of ${med} oral liquid, which contains ${conc} mg in ${per} mL. What volume is that?`, unit: "mL", answer: ml, method: `(What you want ÷ what you've got) × volume = (${dose} ÷ ${conc}) × ${per} mL = ${ml} mL.` }; }
  if (kind === "rate") { const vol = pick(r, [250, 500, 1000]); const h = pick(r, [2, 4, 5, 8, 10]); const ans = nice(vol / h); return { kind, q: `An infusion of ${vol} mL is prescribed over ${h} hours, through a volumetric pump. What rate do you set, in mL per hour?`, unit: "mL/hour", answer: ans, method: `Rate = volume ÷ time = ${vol} ÷ ${h} = ${ans} mL/hour.` }; }
  if (kind === "drops") { const vol = pick(r, [500, 1000]); const h = pick(r, [4, 6, 8]); const df = 20; const ans = Math.round((vol * df) / (h * 60)); return { kind, q: `${vol} mL is to run over ${h} hours by gravity, using a giving set with a drop factor of ${df} drops/mL. How many drops per minute (to the nearest whole drop)?`, unit: "drops/min", answer: ans, method: `(Volume × drop factor) ÷ minutes = (${vol} × ${df}) ÷ ${h * 60} = ${((vol * df) / (h * 60)).toFixed(1)}, so ${ans} drops/min.` }; }
  if (kind === "convert") { const [from, to, f, v] = pick(r, [["g", "mg", 1000, pick(r, [0.25, 0.5, 1.2, 2])], ["mg", "micrograms", 1000, pick(r, [0.125, 0.5, 2.5])], ["micrograms", "mg", 0.001, pick(r, [250, 500, 62.5])], ["mg", "g", 0.001, pick(r, [1500, 750, 250])]]); const ans = nice(v * f); return { kind, q: `Convert ${v} ${from} to ${to}.`, unit: to, answer: ans, method: `1 g = 1,000 mg and 1 mg = 1,000 micrograms. ${v} ${from} = ${ans} ${to}. Always write "micrograms" in full.` }; }
  const perKg = pick(r, [2, 5, 10, 15]); const kg = pick(r, [12, 20, 35, 60, 72]); const ans = perKg * kg; return { kind, q: `A prescription for ${med} is ${perKg} mg per kg. The person weighs ${kg} kg. What dose is that, in mg? (Illustrative only: real weight-based doses are checked against the prescription, references and limits.)`, unit: "mg", answer: ans, method: `Dose = dose per kg × weight = ${perKg} × ${kg} = ${ans} mg. In practice also check the maximum dose and use the current weight.` };
}

export function mountCalc(el, { onComplete } = {}) {
  let r = rng(Date.now() >>> 0), n = 0, right = 0;
  const round = () => {
    const c = genCalc(r);
    el.innerHTML = `<div class="tx"><p class="sx-banner" role="note">Numeracy practice with illustrative numbers and invented medicines. It doesn't authorise you to calculate or give real doses: in practice, follow the prescription, independent checks and local policy.</p>
      <h2>Medicines calculations</h2><p>Question ${n + 1} of 10.</p><p class="tx-q">${esc(c.q)}</p>
      <label class="tx-ans">Your answer <input type="number" step="any" inputmode="decimal" aria-label="Your answer in ${esc(c.unit)}"> ${esc(c.unit)}</label>
      <button type="button" class="btn btn-light lg btn-sm" data-check><span>Check</span></button><div class="tx-out" role="status"></div></div>`;
    const input = el.querySelector("input"); input.focus();
    const check = () => {
      const v = Number(input.value), ok = input.value !== "" && Math.abs(v - c.answer) < 0.011;
      right += ok; n++;
      el.querySelector(".tx-out").innerHTML = `<p class="${ok ? "ok" : "no"}"><b>${ok ? "Correct" : `Not quite: the answer is ${c.answer} ${esc(c.unit)}`}.</b></p><p>${esc(c.method)}</p>${n < 10 ? `<button type="button" class="btn btn-ghost lg btn-sm" data-next><span>Next →</span></button>` : `<p><b>${right} of 10 correct.</b></p><button type="button" class="btn btn-ghost lg btn-sm" data-again><span>Ten more</span></button>`}`;
      el.querySelector("[data-check]").disabled = true; input.disabled = true;
      el.querySelector("[data-next]")?.addEventListener("click", round);
      el.querySelector("[data-again]")?.addEventListener("click", () => { n = 0; right = 0; round(); });
      if (n === 10) onComplete?.({ score: right / 10 });
    };
    el.querySelector("[data-check]").addEventListener("click", check);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
  };
  round();
}

// ---------- court hierarchy and precedent (England and Wales) ----------
export const COURTS = [
  { id: "uksc", name: "UK Supreme Court", level: 6, note: "Binds every court below. Not strictly bound by its own decisions: it may depart under the 1966 Practice Statement, sparingly." },
  { id: "ca", name: "Court of Appeal", level: 5, note: "Binds the High Court and courts below. Generally bound by its own decisions, subject to the Young v Bristol Aeroplane [1944] exceptions (the Criminal Division is a little more flexible where liberty is at stake)." },
  { id: "dc", name: "Divisional Court of the High Court", level: 4, note: "Binds lower courts and generally follows its own decisions." },
  { id: "hc", name: "High Court (single judge)", level: 4, note: "Binds the courts below. A single High Court judge's decision persuades other High Court judges, who will usually follow it unless convinced it is wrong." },
  { id: "crown", name: "Crown Court", level: 2, note: "Bound by the courts above. Its decisions bind no one." },
  { id: "county", name: "County Court", level: 2, note: "Bound by the courts above. Its decisions bind no one." },
  { id: "mags", name: "Magistrates' court", level: 1, note: "Bound by the courts above. Its decisions bind no one." },
  { id: "jcpc", name: "Privy Council", level: 0, outside: true, note: "Outside the hierarchy: persuasive, though highly so. Domestic courts may follow it instead of a binding decision only where the Board directs that they should (Willers v Joyce [2016] UKSC 44)." },
  { id: "ecthr", name: "European Court of Human Rights", level: 0, outside: true, note: "Courts must take its judgments into account (Human Rights Act 1998, s 2), but they aren't binding." },
];
const C = Object.fromEntries(COURTS.map((c) => [c.id, c]));
// effect of an earlier decision of court `from` on a later case in court `to`
export function precedentEffect(from, to) {
  const a = C[from], b = C[to];
  if (from === "ecthr") return { effect: "take into account", why: "Under the Human Rights Act 1998, s 2, courts must take Strasbourg judgments into account; they aren't binding precedent." };
  if (from === "jcpc") return { effect: "persuasive", why: "Privy Council decisions are persuasive (often highly), unless the Board directs English courts to follow it (Willers v Joyce)." };
  if (from === to) {
    if (from === "uksc") return { effect: "persuasive", why: "The Supreme Court normally follows its own decisions but may depart from them under the 1966 Practice Statement." };
    if (from === "ca") return { effect: "binding", why: "The Court of Appeal is generally bound by its own decisions, subject to the Young v Bristol Aeroplane exceptions." };
    if (from === "dc") return { effect: "binding", why: "A Divisional Court generally follows its own previous decisions." };
    if (from === "hc") return { effect: "persuasive", why: "One High Court judge's decision doesn't bind another, though it is usually followed unless the later judge is convinced it is wrong." };
    return { effect: "persuasive", why: `${a.name} decisions bind no one; at most they persuade.` };
  }
  if (a.level > b.level && !b.outside) return { effect: "binding", why: `${a.name} decisions bind courts below it, including the ${b.name}.` };
  if (from === "hc" && to === "dc") return { effect: "persuasive", why: "A Divisional Court isn't bound by a single High Court judge." };
  return { effect: "persuasive", why: `A court isn't bound by courts below it: a ${a.name} decision can only persuade the ${b.name}.` };
}

export function mountCourts(el, { onComplete } = {}) {
  const pairs = []; let r = rng(Date.now() >>> 0);
  const ids = COURTS.map((c) => c.id), within = ids.filter((x) => !C[x].outside);
  // pairs with a clear, settled answer (a single judge and a Divisional Court are left out: the
  // position is nuanced and better taught in the lesson than as a one-word answer)
  while (pairs.length < 8) { const p = [pick(r, ids), pick(r, within)]; if (!(p[0] === "dc" && p[1] === "hc")) pairs.push(p); }
  let k = 0, right = 0;
  const tree = () => `<ol class="tx-courts">${COURTS.filter((c) => !c.outside).sort((a, b) => b.level - a.level).map((c) => `<li><button type="button" data-court="${c.id}">${esc(c.name)}</button></li>`).join("")}</ol><p class="tx-outside">Outside the hierarchy: ${COURTS.filter((c) => c.outside).map((c) => `<button type="button" data-court="${c.id}">${esc(c.name)}</button>`).join(" ")}</p><div class="tx-courtinfo" role="status"><p>Select a court to see what binds it and what it binds.</p></div>`;
  const round = () => {
    const [from, to] = pairs[k];
    el.innerHTML = `<div class="tx"><h2>Court hierarchy and precedent</h2><div class="tx-split"><div>${tree()}</div><div>
      <p>Question ${k + 1} of ${pairs.length}</p><p class="tx-q">A case is being decided in the <b>${esc(C[to].name)}</b>. Counsel relies on an earlier decision of the <b>${esc(C[from].name)}</b> on the same point. What is its effect?</p>
      <div class="sx-choices">${["binding", "persuasive", "take into account"].map((x) => `<button type="button" data-a="${x}">${{ binding: "Binding: it must be followed", persuasive: "Persuasive only", "take into account": "Must be taken into account, not binding" }[x]}</button>`).join("")}</div><div class="tx-out" role="status"></div></div></div></div>`;
    el.querySelectorAll("[data-court]").forEach((b) => b.addEventListener("click", () => { el.querySelector(".tx-courtinfo").innerHTML = `<p><b>${esc(C[b.dataset.court].name)}</b></p><p>${inline(C[b.dataset.court].note)}</p>`; }));
    el.querySelectorAll("[data-a]").forEach((b) => b.addEventListener("click", () => {
      const res = precedentEffect(from, to), ok = b.dataset.a === res.effect; right += ok; k++;
      el.querySelectorAll("[data-a]").forEach((x) => { x.disabled = true; x.classList.toggle("right", x.dataset.a === res.effect); });
      if (!ok) b.classList.add("wrong");
      el.querySelector(".tx-out").innerHTML = `<p><b>${ok ? "Correct." : "Not quite."}</b> ${inline(res.why)}</p>${k < pairs.length ? `<button type="button" class="btn btn-ghost lg btn-sm" data-next><span>Next →</span></button>` : `<p><b>${right} of ${pairs.length} correct.</b></p>`}`;
      el.querySelector("[data-next]")?.addEventListener("click", round);
      if (k === pairs.length) onComplete?.({ score: right / pairs.length });
    }));
  };
  round();
}

export { NEWS2_SOURCE };
