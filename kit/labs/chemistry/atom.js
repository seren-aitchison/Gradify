// Atomic structure explorer: add or remove protons, neutrons and electrons and see which element, isotope and
// ion you have made, drawn with the simple shell (Bohr) model, and whether the nucleus is stable.
// The shell picture (2, 8, 8, 2…) is a simplification that works for the first 20 elements; the quantum
// model with orbitals replaces it. Stable isotopes listed are those with no observed decay (natural data).
import { shell, button, canvas, clear, circle, text, panel, challenges, quiz, loop, C } from "../lab.js";
import { ELEMENTS } from "./elements.js";

export const STABLE = { 1: [1, 2], 2: [3, 4], 3: [6, 7], 4: [9], 5: [10, 11], 6: [12, 13], 7: [14, 15], 8: [16, 17, 18], 9: [19], 10: [20, 21, 22], 11: [23], 12: [24, 25, 26], 13: [27], 14: [28, 29, 30], 15: [31], 16: [32, 33, 34, 36], 17: [35, 37], 18: [36, 38, 40], 19: [39, 41], 20: [40, 42, 43, 44, 46] };
const shells = (n) => { const out = []; for (const cap of [2, 8, 8, 18]) { if (n <= 0) break; out.push(Math.min(cap, n)); n -= cap; } return out; };

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-q"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.8, max: 420 }), ctrl = $(".lab-ctrl");
  const a = { p: 1, n: 0, e: 1 };
  const st = { c12: false, ion: false, unstable: false, anion: false };
  const ch = challenges(ctrl, ctx, [
    { id: "c12", text: "Build a neutral carbon-12 atom", test: (x) => x.c12 },
    { id: "ion", text: "Make a sodium ion, Na⁺", test: (x) => x.ion },
    { id: "anion", text: "Make an oxide ion, O²⁻", test: (x) => x.anion },
    { id: "uns", text: "Make an unstable isotope (for example carbon-14)", test: (x) => x.unstable },
  ]);
  const row = (label, k) => { const r = document.createElement("div"); r.className = "lab-row"; r.innerHTML = `<span style="width:80px;color:var(--mute)">${label}</span>`; button(r, "−", () => { a[k] = Math.max(k === "p" ? 1 : 0, a[k] - 1); upd(); }); button(r, "+", () => { a[k] = Math.min(k === "p" ? 20 : 30, a[k] + 1); upd(); }); const b = document.createElement("b"); b.className = `cnt-${k}`; b.style.cssText = "font-family:var(--mono);min-width:24px"; r.append(b); ctrl.prepend(r); };
  row("Electrons", "e"); row("Neutrons", "n"); row("Protons", "p");
  const info = panel(ctrl);
  quiz($(".lab-q"), ctx, [
    { id: "ram", q: "Chlorine is 75.8% ³⁵Cl and 24.2% ³⁷Cl. What is its relative atomic mass (using mass numbers)?", options: ["35.0", "35.5", "36.0", "37.0"], answer: 1, why: "Weighted mean: 0.758 × 35 + 0.242 × 37 = 26.53 + 8.95 = 35.48, so 35.5. (The IUPAC value, 35.45, uses exact isotopic masses.)" },
    { id: "iso", q: "Isotopes of an element differ in…", options: ["number of protons", "number of neutrons", "number of electrons in the neutral atom", "chemical properties"], answer: 1, why: "Same proton number (same element and same electron arrangement, so nearly identical chemistry), different neutron number and so different mass." },
  ]);
  let t = 0;
  function upd() {
    for (const k of ["p", "n", "e"]) $(`.cnt-${k}`).textContent = a[k];
    const E = ELEMENTS[a.p - 1], A = a.p + a.n, q = a.p - a.e, stable = (STABLE[a.p] || []).includes(A);
    if (a.p === 6 && a.n === 6 && a.e === 6) st.c12 = true; if (a.p === 11 && a.n === 12 && a.e === 10) st.ion = true; if (a.p === 8 && a.e === 10 && [8, 9, 10].includes(a.n)) st.anion = true;
    if (!stable && a.n > 0 && a.p <= 20 && Math.abs(a.n - a.p) <= 4) st.unstable = true; ch.check(st);
    const charge = q === 0 ? "" : `${Math.abs(q) > 1 ? Math.abs(q) : ""}${q > 0 ? "+" : "−"}`;
    info(`<h4>${E.name}-${A}${charge ? ` ion` : ""}</h4><p style="font-size:22px;font-family:var(--mono)"><sup>${A}</sup><sub style="margin-left:-0.6em">${a.p}</sub>${E.sym}<sup>${charge}</sup></p>
      <table><tr><td>Atomic number (protons)</td><td class="num">${a.p}</td></tr><tr><td>Mass number (protons + neutrons)</td><td class="num">${A}</td></tr><tr><td>Charge</td><td class="num">${q > 0 ? "+" : ""}${q}</td></tr><tr><td>Shells (simple model)</td><td class="num">${shells(a.e).join(", ") || "–"}</td></tr><tr><td>Nucleus</td><td class="num">${stable ? "stable isotope" : "unstable (radioactive) or unknown"}</td></tr></table>
      <p class="lab-msg">The proton number decides the element. Neutrons change the mass (isotopes); electrons change the charge (ions). ${q > 0 ? "Fewer electrons than protons: a positive ion (cation)." : q < 0 ? "More electrons than protons: a negative ion (anion)." : ""}</p>`);
  }
  const stop = loop(el, (dt) => {
    t += dt; const g = cv.g, W = cv.W, H = cv.H, cx = W / 2, cy = H / 2; clear(g, W, H);
    // nucleus: protons and neutrons packed together
    const N = a.p + a.n, rr = 5.5;
    for (let i = 0; i < N; i++) { const ang = i * 2.39996, r = Math.sqrt(i) * rr * 0.9; circle(g, cx + r * Math.cos(ang), cy + r * Math.sin(ang), rr, Math.floor(((i + 1) * a.p) / N) > Math.floor((i * a.p) / N) ? C.red : "#adb5bd"); }
    const sh = shells(a.e);
    sh.forEach((k, s) => { const R = 50 + s * 42; circle(g, cx, cy, R, null, "rgba(255,255,255,.18)"); for (let j = 0; j < k; j++) { const ang = t * (0.6 / (s + 1)) + (j * 2 * Math.PI) / k; circle(g, cx + R * Math.cos(ang), cy + R * Math.sin(ang), 5, C.blue); } });
    text(g, "red: protons · grey: neutrons · blue: electrons (shell model, not to scale: the nucleus is about 100,000 times smaller than the atom)", 10, H - 8, { size: 10, color: C.mute });
  });
  upd();
  return stop;
}
