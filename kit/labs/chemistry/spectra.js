// Spectroscopy: infrared (ctx.mode "ir"), proton NMR (ctx.mode "nmr"), mass spectrometry (ctx.mode "ms") and
// combined structure-solving problems (ctx.mode "problems").
//   IR spectra are simulated from characteristic absorption ranges (standard correlation tables): they show
//   where the diagnostic bands fall, not measured spectra.
//   ¹H NMR spectra are drawn from typical chemical shifts with first-order splitting (n + 1 rule, J ≈ 7 Hz at
//   400 MHz) and Pascal's-triangle intensities; real spectra can show second-order effects.
//   Mass spectra: molecular-ion isotope patterns are calculated exactly from natural isotopic abundances
//   (IUPAC); fragment m/z values are the commonly observed ones and their heights are approximate.
import { shell, seg, select, canvas, clear, text, line, challenges, panel, esc, C } from "../lab.js";

export const DATA = {
  ethanol: { name: "Ethanol", formula: { C: 2, H: 6, O: 1 }, ir: ["OHalc", "CH", "CO"], nmr: [[1.2, 3, 3, "CH₃"], [3.7, 2, 4, "CH₂"], [2.6, 1, 1, "OH (broad)"]], ms: [[46, 20], [45, 40], [31, 100], [29, 25], [27, 20]], frag: { 31: "CH₂OH⁺", 45: "CH₃CHOH⁺", 29: "C₂H₅⁺ / CHO⁺" } },
  ethanoic: { name: "Ethanoic acid", formula: { C: 2, H: 4, O: 2 }, ir: ["OHacid", "CO_acid", "CH", "CO"], nmr: [[11.5, 1, 1, "COOH"], [2.1, 3, 1, "CH₃"]], ms: [[60, 80], [45, 90], [43, 100], [15, 20]], frag: { 45: "COOH⁺", 43: "CH₃CO⁺", 15: "CH₃⁺" } },
  propanone: { name: "Propanone", formula: { C: 3, H: 6, O: 1 }, ir: ["CH", "CO_ketone"], nmr: [[2.2, 6, 1, "2 × CH₃"]], ms: [[58, 30], [43, 100], [15, 15]], frag: { 43: "CH₃CO⁺", 15: "CH₃⁺" } },
  propanal: { name: "Propanal", formula: { C: 3, H: 6, O: 1 }, ir: ["CH", "CHald", "CO_ald"], nmr: [[9.8, 1, 3, "CHO"], [2.5, 2, 5, "CH₂ (split by CHO and CH₃: a multiplet)"], [1.1, 3, 3, "CH₃"]], ms: [[58, 70], [57, 30], [29, 100], [28, 60]], frag: { 29: "CHO⁺ / C₂H₅⁺", 57: "C₂H₅CO⁺" } },
  ethylethanoate: { name: "Ethyl ethanoate", formula: { C: 4, H: 8, O: 2 }, ir: ["CH", "CO_ester", "CO"], nmr: [[4.1, 2, 4, "OCH₂"], [2.0, 3, 1, "COCH₃"], [1.3, 3, 3, "CH₃"]], ms: [[88, 10], [70, 15], [61, 15], [45, 20], [43, 100], [29, 25]], frag: { 43: "CH₃CO⁺", 45: "OC₂H₅⁺", 29: "C₂H₅⁺" } },
  ethylamine: { name: "Ethylamine", formula: { C: 2, H: 7, N: 1 }, ir: ["NH", "CH"], nmr: [[2.7, 2, 4, "CH₂"], [1.1, 3, 3, "CH₃"], [1.3, 2, 1, "NH₂ (broad)"]], ms: [[45, 25], [44, 30], [30, 100]], frag: { 30: "CH₂NH₂⁺", 44: "M − H" } },
  propanenitrile: { name: "Propanenitrile", formula: { C: 3, H: 5, N: 1 }, ir: ["CH", "CN"], nmr: [[2.4, 2, 4, "CH₂"], [1.3, 3, 3, "CH₃"]], ms: [[55, 15], [54, 80], [28, 100]], frag: { 54: "M − H", 28: "C₂H₄⁺" } },
  chloropropane1: { name: "1-Chloropropane", formula: { C: 3, H: 7, Cl: 1 }, ir: ["CH", "CCl"], nmr: [[3.5, 2, 3, "CH₂Cl"], [1.8, 2, 6, "CH₂"], [1.0, 3, 3, "CH₃"]], ms: [[43, 100], [42, 30], [41, 60], [27, 50], [29, 30]], frag: { 43: "C₃H₇⁺", 41: "C₃H₅⁺", 29: "C₂H₅⁺" } },
  chloropropane2: { name: "2-Chloropropane", formula: { C: 3, H: 7, Cl: 1 }, ir: ["CH", "CCl"], nmr: [[4.2, 1, 7, "CHCl"], [1.5, 6, 2, "2 × CH₃"]], ms: [[43, 100], [41, 50], [27, 40]], frag: { 43: "C₃H₇⁺", 41: "C₃H₅⁺" } },
  bromoethane: { name: "Bromoethane", formula: { C: 2, H: 5, Br: 1 }, ir: ["CH", "CBr"], nmr: [[3.4, 2, 4, "CH₂Br"], [1.7, 3, 3, "CH₃"]], ms: [[29, 100], [27, 50]], frag: { 29: "C₂H₅⁺", 27: "C₂H₃⁺" } },
  toluene: { name: "Methylbenzene (toluene)", formula: { C: 7, H: 8 }, ir: ["CHar", "CH", "CCar"], nmr: [[7.2, 5, 1, "C₆H₅ (multiplet)"], [2.3, 3, 1, "CH₃"]], ms: [[92, 60], [91, 100], [65, 15]], frag: { 91: "C₇H₇⁺ (tropylium)", 65: "C₅H₅⁺" } },
  hexene: { name: "Hex-1-ene", formula: { C: 6, H: 12 }, ir: ["CHalk", "CH", "CC"], nmr: [[5.8, 1, 1, "=CH (multiplet)"], [5.0, 2, 1, "=CH₂ (multiplet)"], [2.0, 2, 4, "allylic CH₂"], [1.3, 4, 1, "2 × CH₂"], [0.9, 3, 3, "CH₃"]], ms: [[84, 25], [56, 70], [41, 100], [42, 80], [55, 60]], frag: { 41: "C₃H₅⁺ (allyl)", 56: "C₄H₈⁺" } },
};
export const IR_BANDS = {
  OHalc: [3200, 3550, 0.75, "O–H (alcohol), broad"], OHacid: [2500, 3300, 0.6, "O–H (carboxylic acid), very broad"], NH: [3300, 3500, 0.4, "N–H (amine)"],
  CH: [2850, 3000, 0.6, "C–H (alkyl)"], CHar: [3000, 3100, 0.3, "C–H (arene)"], CHalk: [3010, 3100, 0.35, "=C–H (alkene)"], CHald: [2720, 2820, 0.3, "C–H (aldehyde), two bands"],
  CN: [2220, 2260, 0.5, "C≡N (nitrile)"], CO_acid: [1700, 1725, 0.85, "C=O (acid)"], CO_ketone: [1705, 1725, 0.9, "C=O (ketone)"], CO_ald: [1720, 1740, 0.9, "C=O (aldehyde)"], CO_ester: [1735, 1750, 0.9, "C=O (ester)"],
  CC: [1640, 1680, 0.35, "C=C (alkene)"], CCar: [1450, 1600, 0.4, "C=C (arene ring)"], CO: [1050, 1300, 0.6, "C–O"], CCl: [600, 800, 0.6, "C–Cl"], CBr: [500, 600, 0.6, "C–Br"],
};
const ISO = { C: [[12, 0.9893], [13.003355, 0.0107]], H: [[1.007825, 0.999885], [2.014102, 0.000115]], N: [[14.003074, 0.99636], [15.000109, 0.00364]], O: [[15.994915, 0.99757], [16.999132, 0.00038], [17.99916, 0.00205]], Cl: [[34.968853, 0.7576], [36.965903, 0.2424]], Br: [[78.918338, 0.5069], [80.916291, 0.4931]] };
// isotope pattern by repeated convolution on nominal masses
export function isotopes(formula) {
  let dist = new Map([[0, 1]]);
  for (const [el, n] of Object.entries(formula)) for (let k = 0; k < n; k++) { const next = new Map(); for (const [m, p] of dist) for (const [mi, pi] of ISO[el]) { const key = m + Math.round(mi); next.set(key, (next.get(key) || 0) + p * pi); } dist = next; }
  const mx = Math.max(...dist.values());
  return [...dist].filter(([, p]) => p / mx > 0.002).sort((a, b) => a[0] - b[0]).map(([m, p]) => [m, (100 * p) / mx]);
}
const fstr = (f) => Object.entries(f).map(([e, n]) => `${e}${n > 1 ? `<sub>${n}</sub>` : ""}`).join("");
const pascal = (n) => { let r = [1]; for (let i = 1; i < n; i++) r = [...r.map((x, j) => x + (r[j - 1] || 0)), 1]; return r; };

export function drawIR(cv, key, hover = null) {
  const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
  const X = (wn) => 46 + ((4000 - wn) / 3500) * (W - 60), Y = (t) => 14 + (1 - t) * (H - 50);
  g.strokeStyle = C.grid; for (const wn of [4000, 3500, 3000, 2500, 2000, 1500, 1000, 500]) { g.beginPath(); g.moveTo(X(wn), 14); g.lineTo(X(wn), H - 36); g.stroke(); text(g, `${wn}`, X(wn), H - 22, { align: "center", size: 10, color: C.mute }); }
  text(g, "wavenumber (cm⁻¹)", W / 2, H - 6, { align: "center", size: 11 }); text(g, "transmittance", 6, 12, { size: 10, color: C.mute });
  const bands = DATA[key].ir.map((b) => IR_BANDS[b]);
  const T = (wn) => { let a = 0; for (const [lo, hi, depth] of bands) { const c = (lo + hi) / 2, w = (hi - lo) / 2.2; a += depth * Math.exp(-(((wn - c) / Math.max(12, w)) ** 2)); } a += 0.12 * Math.max(0, Math.sin(wn / 37) * Math.sin(wn / 23)) * (wn < 1500 ? 1 : 0); return Math.max(0.03, 1 - a); };
  line(g, Array.from({ length: 700 }, (_, i) => { const wn = 4000 - i * 5; return [X(wn), Y(T(wn))]; }), C.amber, 1.6);
  g.fillStyle = "rgba(255,255,255,.04)"; g.fillRect(X(1500), 14, X(500) - X(1500), H - 50); text(g, "fingerprint region", X(1000), 26, { align: "center", size: 10, color: C.mute });
  return { bands, X, Y };
}
export function drawNMR(cv, key) {
  const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
  const X = (d) => 20 + ((12.5 - d) / 13) * (W - 40), base = H - 36;
  for (let d = 0; d <= 12; d += 1) { text(g, `${d}`, X(d), H - 22, { align: "center", size: 10, color: C.mute }); }
  text(g, "chemical shift δ (ppm)", W / 2, H - 6, { align: "center", size: 11 }); line(g, [[X(12.5), base], [X(-0.5), base]], C.axis, 1);
  line(g, [[X(0), base], [X(0), base - 30]], C.mute, 1.4); text(g, "TMS", X(0), base - 34, { align: "center", size: 9, color: C.mute });
  const maxI = Math.max(...DATA[key].nmr.map((p) => p[1]));
  for (const [d, n, mult, lab] of DATA[key].nmr) {
    const ints = pascal(mult), J = 0.0175 * 2.2, tot = ints.reduce((a, b) => a + b, 0);
    ints.forEach((v, i) => { const x = X(d + (i - (mult - 1) / 2) * J); line(g, [[x, base], [x, base - ((n / maxI) * (H - 90) * v) / Math.max(...ints) * 0.95]], C.teal, 1.6); });
    text(g, `${n}H`, X(d), 20, { align: "center", size: 11, color: C.text }); text(g, ["", "s", "d", "t", "q", "quint", "sext", "sept"][mult] || `${mult}`, X(d), 34, { align: "center", size: 10, color: C.mute }); void tot; void lab;
  }
}
export function drawMS(cv, key) {
  const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
  const D = DATA[key], iso = isotopes(D.formula), M = iso[0][0], mmax = Math.max(M + 6, ...D.ms.map((p) => p[0])) + 5;
  const X = (m) => 46 + (m / mmax) * (W - 60), Y = (v) => H - 36 - (v / 100) * (H - 60);
  for (let m = 0; m <= mmax; m += 10) text(g, `${m}`, X(m), H - 22, { align: "center", size: 10, color: C.mute });
  text(g, "m/z", W / 2, H - 6, { align: "center", size: 11 }); text(g, "relative abundance", 6, 12, { size: 10, color: C.mute });
  // fragments, then the molecular-ion cluster scaled to the M peak's listed height (or 30 if none listed)
  const mPeak = D.ms.find((p) => p[0] === M)?.[1] ?? 30, peaks = new Map(D.ms.filter((p) => p[0] < M).map((p) => [p[0], p[1]]));
  for (const [m, p] of iso) peaks.set(m, Math.max(peaks.get(m) || 0, (p * mPeak) / 100));
  for (const [m, v] of peaks) { line(g, [[X(m), Y(0)], [X(m), Y(v)]], m >= M ? C.amber : C.teal, 2.4); if (v > 12) text(g, `${m}`, X(m), Y(v) - 4, { align: "center", size: 10 }); }
  return { iso, M, peaks };
}

export function mount(el, ctx = {}) {
  const mode = ctx.mode || "ir";
  if (mode === "problems") return problems(el, ctx);
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.55, max: 340 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let key = mode === "ms" ? "chloropropane1" : mode === "nmr" ? "ethanol" : "ethanoic";
  const st = { seen: new Set(), halo: false };
  const ch = challenges(ctrl, ctx, mode === "ms" ? [
    { id: "hal", text: "Find a compound whose M and M+2 peaks show chlorine (3 : 1) and one showing bromine (1 : 1)", test: (x) => x.seen.has("chloropropane1") && x.seen.has("bromoethane") },
    { id: "six", text: "Look at six mass spectra and the fragment ions that form their base peaks", test: (x) => x.seen.size >= 6 },
  ] : mode === "nmr" ? [
    { id: "six", text: "Look at six spectra and explain each splitting with the n + 1 rule", test: (x) => x.seen.size >= 6 },
    { id: "iso", text: "Tell 1-chloropropane and 2-chloropropane apart by their spectra", test: (x) => x.seen.has("chloropropane1") && x.seen.has("chloropropane2") },
  ] : [
    { id: "six", text: "Compare six IR spectra", test: (x) => x.seen.size >= 6 },
    { id: "co", text: "Compare the C=O bands of an acid, a ketone, an aldehyde and an ester", test: (x) => ["ethanoic", "propanone", "propanal", "ethylethanoate"].every((k) => x.seen.has(k)) },
  ]);
  select($(".top"), { label: "Compound", options: Object.entries(DATA).map(([k, v]) => [k, v.name]), value: key, onChange: (v) => { key = v; draw(); } });
  function draw() {
    st.seen.add(key); ch.check(st); const D = DATA[key];
    if (mode === "ir") { const r = drawIR(cv, key); out(`<h4>${esc(D.name)} · ${fstr(D.formula)}</h4><table><tr><th>Band</th><th class="num">Range (cm⁻¹)</th></tr>${r.bands.map(([lo, hi, , lab]) => `<tr><td>${lab}</td><td class="num">${lo}–${hi}</td></tr>`).join("")}</table><p class="lab-msg">Simulated from characteristic absorption ranges. Bonds absorb infrared at frequencies that depend on bond strength and the masses of the atoms; the region below 1500 cm⁻¹ is a fingerprint unique to each molecule.</p>`); }
    else if (mode === "nmr") { drawNMR(cv, key); out(`<h4>${esc(D.name)} · ${fstr(D.formula)}</h4><table><tr><th>δ (ppm)</th><th>Protons</th><th>Splitting</th><th>Assignment</th></tr>${D.nmr.map(([d, n, m, lab]) => `<tr><td class="num">${d}</td><td>${n}H</td><td>${["", "singlet", "doublet", "triplet", "quartet", "quintet", "sextet", "septet"][m] || `${m} lines`}</td><td>${lab}</td></tr>`).join("")}</table><p class="lab-msg">Number of signals = number of proton environments; area = number of protons; a signal is split into n + 1 lines by n protons on the neighbouring carbon(s). OH and NH protons usually appear as broad singlets (they exchange). Typical shifts, first-order splitting.</p>`); }
    else { const r = drawMS(cv, key); out(`<h4>${esc(D.name)} · ${fstr(D.formula)} · M = ${r.M}</h4><table><tr><th>m/z</th><th>Ion</th></tr>${r.iso.slice(0, 4).map(([m, p]) => `<tr><td class="num">${m}</td><td>molecular ion${m > r.M ? ` +${m - r.M}` : ""} (${p.toFixed(1)}% of M)</td></tr>`).join("")}${Object.entries(D.frag).map(([m, f]) => `<tr><td class="num">${m}</td><td>${f}</td></tr>`).join("")}</table><p class="lab-msg">The M+1 peak comes mostly from ¹³C (about 1.1% per carbon); chlorine gives M : M+2 ≈ 3 : 1 and bromine ≈ 1 : 1, calculated here from isotopic abundances. The tallest peak (base peak) is the most stable fragment ion. Fragment heights approximate.</p>`); }
  }
  draw();
}

function problems(el, ctx) {
  const $ = shell(el, `<div class="lab-info prob"></div><div class="lab-cols"><div><div class="s1"></div><div class="s2"></div><div class="s3"></div></div><div class="lab-ctrl"></div></div>`);
  const c1 = canvas($(".s1"), { aspect: 0.4, max: 220 }), c2 = canvas($(".s2"), { aspect: 0.4, max: 220 }), c3 = canvas($(".s3"), { aspect: 0.4, max: 220 }), ctrl = $(".lab-ctrl"), info = panel(ctrl);
  const keys = Object.keys(DATA); let k = 0, score = 0, tried = 0; const st = { score: 0 };
  const ch = challenges(ctrl, ctx, [{ id: "five", text: "Identify five unknowns from their spectra", test: (x) => x.score >= 5 }]);
  const order = keys.map((x) => [Math.random(), x]).sort().map((x) => x[1]);
  function show() {
    const key = order[k % order.length], D = DATA[key];
    drawIR(c1, key); drawNMR(c2, key); drawMS(c3, key);
    const opts = [key, ...keys.filter((x) => x !== key && Object.keys(DATA[x].formula).join() === Object.keys(D.formula).join()).slice(0, 2), ...keys.filter((x) => x !== key)].filter((x, i, a) => a.indexOf(x) === i).slice(0, 4).map((x) => [Math.random(), x]).sort().map((x) => x[1]);
    $(".prob").innerHTML = `<b>Unknown ${k + 1}.</b> Molecular formula ${fstr(D.formula)}. Use the IR spectrum (top) for functional groups, the ¹H NMR spectrum (middle) for the carbon–hydrogen framework, and the mass spectrum (bottom) for the molecular mass, halogens and fragments.`;
    info(`<p>Which compound is it?</p><div class="lab-chips">${opts.map((x) => `<button type="button" data-k="${x}">${esc(DATA[x].name)}</button>`).join("")}</div><p class="lab-msg">Score ${score} / ${tried}</p>`);
    $.all("[data-k]").forEach((b) => b.addEventListener("click", () => { tried++; const ok = b.dataset.k === key; if (ok) { score++; st.score = score; ch.check(st); } b.classList.add(ok ? "ok" : "no"); setTimeout(() => { if (ok) k++; show(); }, ok ? 900 : 600); }));
  }
  show();
}
