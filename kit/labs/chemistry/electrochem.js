// Electrochemical cells: pick two half-cells and see which is the anode and cathode, the standard cell
// potential (E°cell = E°cathode − E°anode), the effect of concentration by the Nernst equation at 298 K,
// ΔG° = −nFE° and K = exp(nFE°/RT). Standard electrode potentials are rounded values from standard tables
// (e.g. the CRC Handbook). Activities are taken as concentrations.
import { shell, select, slider, canvas, clear, text, rrect, circle, challenges, panel, loop, C } from "../lab.js";

export const HALF = {
  Li: ["Li⁺ + e⁻ → Li", -3.04, 1], K: ["K⁺ + e⁻ → K", -2.93, 1], Mg: ["Mg²⁺ + 2e⁻ → Mg", -2.37, 2], Al: ["Al³⁺ + 3e⁻ → Al", -1.66, 3], Zn: ["Zn²⁺ + 2e⁻ → Zn", -0.76, 2], Fe: ["Fe²⁺ + 2e⁻ → Fe", -0.44, 2],
  Ni: ["Ni²⁺ + 2e⁻ → Ni", -0.25, 2], Pb: ["Pb²⁺ + 2e⁻ → Pb", -0.13, 2], H: ["2H⁺ + 2e⁻ → H₂ (Pt)", 0.0, 2], Cu: ["Cu²⁺ + 2e⁻ → Cu", 0.34, 2], Fe3: ["Fe³⁺ + e⁻ → Fe²⁺ (Pt)", 0.77, 1], Ag: ["Ag⁺ + e⁻ → Ag", 0.8, 1], Cl: ["Cl₂ + 2e⁻ → 2Cl⁻ (Pt)", 1.36, 2],
};
const F = 96485, R = 8.314, T = 298.15;
const lcm = (a, b) => { const g = (x, y) => (y ? g(y, x % y) : x); return (a * b) / g(a, b); };
export function cell(a, b, ca = 1, cb = 1) {
  const [A, B] = HALF[a][1] <= HALF[b][1] ? [a, b] : [b, a], cAn = A === a ? ca : cb, cCa = A === a ? cb : ca; // the lower potential is the anode
  const n = lcm(HALF[A][2], HALF[B][2]), E0 = HALF[B][1] - HALF[A][1];
  // Q for metal/ion couples: [anode ion]^(n/nA) / [cathode ion]^(n/nB)
  const Qv = cAn ** (n / HALF[A][2]) / cCa ** (n / HALF[B][2]), E = E0 - ((R * T) / (n * F)) * Math.log(Qv);
  return { anode: A, cathode: B, n, E0, E, dG: (-n * F * E0) / 1000, K: Math.exp((n * F * E0) / (R * T)) };
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.62, max: 380 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let a = "Ni", b = "Ag", ca = 1, cb = 1, r = cell(a, b);
  const st = { daniell: false, big: false, nernst: false };
  const ch = challenges(ctrl, ctx, [
    { id: "dan", text: "Build the Daniell cell (zinc and copper, 1.10 V)", test: (x) => x.daniell },
    { id: "big", text: "Build a cell with an emf above 2.5 V", test: (x) => x.big },
    { id: "ner", text: "Change a concentration and see the emf move (Nernst equation)", test: (x) => x.nernst },
  ]);
  const opts = Object.entries(HALF).map(([k, v]) => [k, `${v[0]}  (${v[1] > 0 ? "+" : ""}${v[1].toFixed(2)} V)`]);
  select($(".top"), { label: "Left half-cell", options: opts, value: a, onChange: (v) => { a = v; upd(); } });
  select($(".top"), { label: "Right half-cell", options: opts, value: b, onChange: (v) => { b = v; upd(); } });
  slider(ctrl, { label: "Left ion concentration", min: -3, max: 1, step: 0.1, value: 0, fmt: (v) => `${(10 ** v).toPrecision(2)} M`, onInput: (v) => { ca = 10 ** v; upd(); } });
  slider(ctrl, { label: "Right ion concentration", min: -3, max: 1, step: 0.1, value: 0, fmt: (v) => `${(10 ** v).toPrecision(2)} M`, onInput: (v) => { cb = 10 ** v; upd(); } });
  function upd() {
    if (a === b) { out(`<p class="lab-msg">Choose two different half-cells.</p>`); return; }
    r = cell(a, b, ca, cb);
    if (new Set([a, b]).has("Zn") && new Set([a, b]).has("Cu") && ca === 1 && cb === 1) st.daniell = true; if (r.E0 > 2.5) st.big = true; if ((ca !== 1 || cb !== 1) && Math.abs(r.E - r.E0) > 0.005) st.nernst = true; ch.check(st);
    out(`<div class="lab-read"><div><small>Anode (oxidation, −)</small><b>${r.anode}</b></div><div><small>Cathode (reduction, +)</small><b>${r.cathode}</b></div><div><small>E°cell</small><b>${r.E0.toFixed(2)} V</b></div><div><small>E (these concentrations)</small><b>${r.E.toFixed(3)} V</b></div><div><small>ΔG°</small><b>${r.dG.toFixed(0)} kJ/mol</b></div><div><small>K</small><b>${r.K > 1e6 ? r.K.toExponential(1) : r.K.toPrecision(3)}</b></div></div>
      <p class="lab-msg">The half-cell with the more negative E° is oxidised (it loses electrons, which flow through the wire to the other electrode). E°cell = ${HALF[r.cathode][1].toFixed(2)} − (${HALF[r.anode][1].toFixed(2)}) = ${r.E0.toFixed(2)} V. Nernst: E = E° − (RT/nF) ln Q with n = ${r.n}; a positive E means the reaction is spontaneous (ΔG = −nFE < 0).${[a, b].some((x) => ["H", "Fe3", "Cl"].includes(x)) ? " For the gas and platinum half-cells the concentration term here is simplified (gases at 1 bar, one ion varied)." : ""}</p>`);
  }
  let ph = 0;
  const stop = loop(el, (dt) => {
    ph += dt; const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H); if (a === b) return;
    const L = [W * 0.08, H * 0.38, W * 0.34, H * 0.44], Rb = [W * 0.58, H * 0.38, W * 0.34, H * 0.44];
    const leftIsAnode = r.anode === a;
    for (const [[x, y, w, h], m, an] of [[L, a, leftIsAnode], [Rb, b, !leftIsAnode]]) {
      rrect(g, x, y, w, h, 10, "rgba(90,160,255,.12)", "rgba(255,255,255,.4)");
      rrect(g, x + w / 2 - 10, y - 50, 20, h * 0.75 + 50, 3, ["H", "Fe3", "Cl"].includes(m) ? "#adb5bd" : "#c9a227");
      text(g, `${m} electrode`, x + w / 2, y + h + 18, { align: "center", size: 11 }); text(g, an ? "anode (−)" : "cathode (+)", x + w / 2, y + h + 34, { align: "center", size: 11, color: an ? C.orange : C.teal });
    }
    // salt bridge
    g.strokeStyle = "rgba(255,255,255,.4)"; g.lineWidth = 10; g.beginPath(); g.moveTo(W * 0.32, H * 0.48); g.lineTo(W * 0.32, H * 0.3); g.lineTo(W * 0.68, H * 0.3); g.lineTo(W * 0.68, H * 0.48); g.stroke(); text(g, "salt bridge (KNO₃)", W / 2, H * 0.28 - 8, { align: "center", size: 10, color: C.mute });
    // wire and voltmeter
    g.lineWidth = 2; g.strokeStyle = "#ced4da"; g.beginPath(); g.moveTo(W * 0.25, H * 0.38 - 50); g.lineTo(W * 0.25, H * 0.1); g.lineTo(W * 0.75, H * 0.1); g.lineTo(W * 0.75, H * 0.38 - 50); g.stroke();
    circle(g, W / 2, H * 0.1, 24, "#1f2937", "#ced4da"); text(g, `${r.E.toFixed(2)} V`, W / 2, H * 0.1 + 5, { align: "center", size: 13, weight: 700, color: C.amber });
    // electrons moving from anode to cathode
    const from = leftIsAnode ? W * 0.25 : W * 0.75, to = leftIsAnode ? W * 0.75 : W * 0.25;
    for (let k = 0; k < 5; k++) { const f = (ph * 0.3 + k / 5) % 1, x = from + (to - from) * f; if (Math.abs(x - W / 2) > 26) { circle(g, x, H * 0.1, 4, C.blue); text(g, "e⁻", x, H * 0.1 - 8, { align: "center", size: 9, color: C.blue }); } }
  });
  upd();
  return stop;
}
