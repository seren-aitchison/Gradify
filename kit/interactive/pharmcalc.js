// Pharmaceutical calculations practice (PharmaGradify): generated problems in the style of the GPhC
// registration assessment's calculations paper, each with a worked method. Medicines are "Medicine A/B/…"
// or common pharmaceutical materials, and every number is illustrative: this is numeracy practice, not
// dosing advice. Real doses come from the prescription, the current BNF or BNFC and the SPC, and are
// independently checked.
import { esc } from "../core/text.js";

const rng = (seed) => () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const pick = (r, xs) => xs[Math.floor(r() * xs.length)];
const round = (x, dp = 2) => Math.round(x * 10 ** dp) / 10 ** dp;

export const KINDS = ["percent", "ratio", "dilution", "mmol", "weightLiquid", "crcl", "mgPerHour", "displacement", "bsa", "supply"];

// one problem: { kind, q, answer, unit, tol (absolute), method }
export function genPharmCalc(r, kind = pick(r, KINDS)) {
  const med = `Medicine ${pick(r, ["A", "B", "C", "D", "E"])}`;
  if (kind === "percent") {
    const p = pick(r, [0.5, 1, 2, 2.5, 5, 10]), v = pick(r, [10, 20, 50, 100, 250, 500]), g = round((p * v) / 100, 3);
    return { kind, q: `How many grams of ${med} are in ${v} mL of a ${p}% w/v solution?`, answer: g, unit: "g", tol: 0.001, method: `${p}% w/v means ${p} g in 100 mL. In ${v} mL: ${p} × ${v} ÷ 100 = ${g} g.` };
  }
  if (kind === "ratio") {
    const [n, v] = pick(r, [[1000, 1], [1000, 0.5], [10000, 10], [10000, 5], [200000, 20], [1000, 0.3]]);
    const mg = round((1000 / n) * v, 4);
    return { kind, q: `A solution of ${med} is labelled 1 in ${n.toLocaleString("en-GB")} (w/v). How many milligrams are in ${v} mL?`, answer: mg, unit: "mg", tol: 0.0005, method: `1 in ${n.toLocaleString("en-GB")} w/v means 1 g (1,000 mg) in ${n.toLocaleString("en-GB")} mL, so ${round(1000 / n, 4)} mg per mL. ${round(1000 / n, 4)} × ${v} = ${mg} mg.` };
  }
  if (kind === "dilution") {
    const [s, t] = pick(r, [[10, 2], [5, 1], [20, 5], [4, 0.5], [50, 10], [2.5, 0.5]]), v = pick(r, [100, 200, 250, 500]), need = round((t * v) / s, 2);
    return { kind, q: `What volume of a ${s}% w/v stock solution do you need to make ${v} mL of a ${t}% w/v solution?`, answer: need, unit: "mL", tol: 0.01, method: `C1 × V1 = C2 × V2, so V1 = C2 × V2 ÷ C1 = ${t} × ${v} ÷ ${s} = ${need} mL of stock, made up to ${v} mL.` };
  }
  if (kind === "mmol") {
    const v = pick(r, [100, 250, 500, 1000]), mg = (0.9 * v * 1000) / 100, mmol = round(mg / 58.5, 1);
    return { kind, q: `How many millimoles of sodium are in ${v} mL of sodium chloride 0.9% w/v? (Mr NaCl = 58.5; one mmol of NaCl gives one mmol of sodium.) Give your answer to one decimal place.`, answer: mmol, unit: "mmol", tol: 0.11, method: `0.9% w/v is 0.9 g in 100 mL, so ${v} mL contains ${round(mg / 1000, 2)} g = ${round(mg, 0)} mg. mmol = mg ÷ Mr = ${round(mg, 0)} ÷ 58.5 = ${mmol} mmol.` };
  }
  if (kind === "weightLiquid") {
    const perKg = pick(r, [5, 7.5, 10, 15, 20]), kg = pick(r, [8, 12, 16, 20, 24]), conc = pick(r, [[120, 5], [250, 5], [125, 5], [100, 5], [200, 5]]);
    const dose = perKg * kg, ml = round((dose / conc[0]) * conc[1], 2);
    return { kind, q: `A child weighing ${kg} kg is prescribed ${med} ${perKg} mg/kg as a single dose. The oral liquid contains ${conc[0]} mg in ${conc[1]} mL. What volume should be given? Give your answer to two decimal places.`, answer: ml, unit: "mL", tol: 0.011, method: `Dose = ${perKg} × ${kg} = ${dose} mg. Volume = ${dose} ÷ ${conc[0]} × ${conc[1]} = ${ml} mL. (Illustrative: always check the BNFC and the maximum dose.)` };
  }
  if (kind === "crcl") {
    const age = pick(r, [58, 66, 72, 79, 84, 88]), kg = pick(r, [52, 60, 68, 75, 82]), scr = pick(r, [85, 110, 140, 180, 220]), male = r() < 0.5;
    const k = male ? 1.23 : 1.04, crcl = round(((140 - age) * kg * k) / scr, 0);
    return { kind, q: `Estimate the creatinine clearance of a ${male ? "man" : "woman"} aged ${age}, weighing ${kg} kg, with a serum creatinine of ${scr} micromol/L, using the Cockcroft-Gault equation (constant ${k} for ${male ? "men" : "women"}). Give your answer to the nearest whole number.`, answer: crcl, unit: "mL/min", tol: 1, method: `CrCl = (140 − age) × weight × constant ÷ serum creatinine = (140 − ${age}) × ${kg} × ${k} ÷ ${scr} = ${crcl} mL/min. (Use actual or ideal body weight as your local guidance and the BNF advise.)` };
  }
  if (kind === "mgPerHour") {
    const mg = pick(r, [50, 100, 200, 250, 500]), v = pick(r, [50, 100, 250, 500]), rate = pick(r, [5, 10, 12.5, 20, 25, 50]), ans = round((mg / v) * rate, 2);
    return { kind, q: `An infusion contains ${mg} mg of ${med} in ${v} mL and is running at ${rate} mL/hour. How many milligrams per hour is the patient receiving?`, answer: ans, unit: "mg/hour", tol: 0.011, method: `Concentration = ${mg} ÷ ${v} = ${round(mg / v, 3)} mg/mL. Dose rate = ${round(mg / v, 3)} × ${rate} = ${ans} mg/hour.` };
  }
  if (kind === "displacement") {
    const [g, dv] = pick(r, [[1, 0.8], [0.5, 0.4], [1, 0.7], [2, 1.4], [0.6, 0.5]]), want = pick(r, [100, 200, 250]), total = round((g * 1000) / want, 2), dil = round(total - dv, 2);
    return { kind, q: `A vial contains ${g} g of ${med} powder with a displacement value of ${dv} mL for the vial's contents. What volume of diluent must be added to give a final concentration of ${want} mg/mL?`, answer: dil, unit: "mL", tol: 0.01, method: `Final volume needed = ${g * 1000} mg ÷ ${want} mg/mL = ${total} mL. The powder displaces ${dv} mL, so add ${total} − ${dv} = ${dil} mL of diluent.` };
  }
  if (kind === "bsa") {
    const per = pick(r, [50, 75, 100, 175, 250]), bsa = pick(r, [1.5, 1.62, 1.75, 1.8, 1.94, 2.05]), ans = round(per * bsa, 1);
    return { kind, q: `${med} is prescribed at ${per} mg/m². The patient's body surface area is ${bsa} m². What dose is that? Give your answer to one decimal place.`, answer: ans, unit: "mg", tol: 0.051, method: `Dose = ${per} × ${bsa} = ${ans} mg. (Illustrative: dose banding, caps and local protocols apply to real doses.)` };
  }
  const n = pick(r, [1, 2]), times = pick(r, [2, 3, 4]), days = pick(r, [5, 7, 14, 28]), ans = n * times * days;
  return { kind: "supply", q: `A prescription for ${med} says: take ${n === 1 ? "one tablet" : "two tablets"} ${times === 2 ? "twice" : times === 3 ? "three times" : "four times"} a day for ${days} days. How many tablets should be supplied?`, answer: ans, unit: "tablets", tol: 0, method: `${n} × ${times} a day × ${days} days = ${ans} tablets.` };
}

export const isRight = (c, v) => Number.isFinite(v) && Math.abs(v - c.answer) <= c.tol + 1e-9;

export function mountPharmCalc(el, { onComplete } = {}) {
  let r = rng(Date.now() >>> 0), n = 0, right = 0;
  const go = () => {
    const c = genPharmCalc(r);
    el.innerHTML = `<div class="tx"><p class="sx-banner" role="note">Calculations practice with illustrative numbers and invented medicines. It doesn't authorise you to calculate or supply real doses: in practice, follow the prescription, the current BNF or BNFC, the SPC, independent checks and local policy.</p>
      <h2>Pharmaceutical calculations</h2><p>Question ${n + 1} of 10.</p><p class="tx-q">${esc(c.q)}</p>
      <label class="tx-ans">Your answer <input type="number" step="any" inputmode="decimal" aria-label="Your answer in ${esc(c.unit)}"> ${esc(c.unit)}</label>
      <button type="button" class="btn btn-light lg btn-sm" data-check><span>Check</span></button><div class="tx-out" role="status"></div></div>`;
    const input = el.querySelector("input"); input.focus();
    const check = () => {
      const ok = input.value !== "" && isRight(c, Number(input.value));
      right += ok; n++;
      el.querySelector(".tx-out").innerHTML = `<p class="${ok ? "ok" : "no"}"><b>${ok ? "Correct" : `Not quite: the answer is ${c.answer} ${esc(c.unit)}`}.</b></p><p>${esc(c.method)}</p>${n < 10 ? `<button type="button" class="btn btn-ghost lg btn-sm" data-next><span>Next</span></button>` : `<p><b>${right} out of 10.</b></p><button type="button" class="btn btn-ghost lg btn-sm" data-again><span>Another 10</span></button>`}`;
      el.querySelector("[data-check]").disabled = true; input.disabled = true;
      el.querySelector("[data-next]")?.addEventListener("click", go);
      el.querySelector("[data-again]")?.addEventListener("click", () => { n = 0; right = 0; go(); });
      if (n === 10) onComplete?.({ score: right / 10 });
    };
    el.querySelector("[data-check]").addEventListener("click", check);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
  };
  go();
}
