// Electron configuration builder: fill the orbital boxes (arrows-in-boxes) for an element up to krypton.
// Each tap on a box cycles empty → one electron (spin up) → a pair → empty. The checker applies the Aufbau
// principle, the Pauli exclusion principle (built in: two electrons per orbital, opposite spins) and Hund's
// rule, and knows the chromium and copper exceptions.
import { shell, select, button, panel, challenges, esc, C } from "../lab.js";
import { ELEMENTS } from "./elements.js";

const SUB = [["1s", 1], ["2s", 1], ["2p", 3], ["3s", 1], ["3p", 3], ["4s", 1], ["3d", 5], ["4p", 3]];
// ground-state occupancy per subshell for Z ≤ 36
export function ground(Z) {
  const occ = {}; let n = Z;
  for (const [s, k] of SUB) { const c = Math.min(n, 2 * k); occ[s] = c; n -= c; }
  if (Z === 24) { occ["4s"] = 1; occ["3d"] = 5; } if (Z === 29) { occ["4s"] = 1; occ["3d"] = 10; }
  return occ;
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-boxes"></div><div class="lab-row tools"></div><div class="lab-cols"><div class="lab-out"></div><div class="lab-ctrl"></div></div>`);
  const out = panel($(".lab-out")), ctrl = $(".lab-ctrl");
  let Z = 8; const boxes = {}; const reset = () => { for (const [s, k] of SUB) boxes[s] = Array(k).fill(0); };
  const right = new Set();
  const st = { n: 0, cr: false, fe: false };
  const ch = challenges(ctrl, ctx, [
    { id: "three", text: "Fill three elements correctly", test: (x) => x.n >= 3 },
    { id: "fe", text: "Fill iron: 4s before 3d", test: (x) => x.fe },
    { id: "cr", text: "Fill chromium, an exception to the Aufbau order", test: (x) => x.cr },
  ]);
  select($(".top"), { label: "Element", options: ELEMENTS.slice(0, 36).map((e) => [e.Z, `${e.Z} ${e.name}`]), value: Z, onChange: (v) => { Z = Number(v); reset(); paint(); } });
  button($(".tools"), "Check", check, "pri");
  button($(".tools"), "Show answer", () => { const g = ground(Z); for (const [s, k] of SUB) { let c = g[s]; boxes[s] = Array(k).fill(0).map((_, i) => (c > i ? 1 : 0)); for (let i = 0; i < k && c > k; i++, c--) boxes[s][i] = 2; } paint("Ground state shown."); });
  button($(".tools"), "Clear", () => { reset(); paint(); });
  function paint(msg = "") {
    $(".lab-boxes").innerHTML = `<div style="display:flex;flex-wrap:wrap;gap:14px;align-items:flex-end">${SUB.map(([s, k]) => `<div><div style="display:flex;gap:2px">${boxes[s].map((v, i) => `<button type="button" class="ob" data-s="${s}" data-i="${i}">${v === 0 ? "" : v === 1 ? "↑" : "↑↓"}</button>`).join("")}</div><small style="color:var(--mute)">${s}</small></div>`).join("")}</div>`;
    $.all(".ob").forEach((b) => b.addEventListener("click", () => { const a = boxes[b.dataset.s]; a[b.dataset.i] = (a[b.dataset.i] + 1) % 3; paint(); }));
    const count = SUB.reduce((t, [s]) => t + boxes[s].reduce((a, v) => a + v, 0), 0), E = ELEMENTS[Z - 1];
    out(`<h4>${esc(E.name)}: ${Z} electrons</h4><p>You've placed <b>${count}</b>. Written as ${SUB.filter(([s]) => boxes[s].some((v) => v)).map(([s]) => `${s}<sup>${boxes[s].reduce((a, v) => a + v, 0)}</sup>`).join(" ") || "–"}</p><p class="lab-msg ${msg.startsWith("Correct") ? "ok" : msg ? "no" : ""}">${msg || "Tap a box to add electrons. Fill lower-energy subshells first, put one electron in each orbital of a subshell before pairing (Hund's rule), and give paired electrons opposite spins."}</p>`);
  }
  function check() {
    const g = ground(Z), count = SUB.reduce((t, [s]) => t + boxes[s].reduce((a, v) => a + v, 0), 0);
    if (count !== Z) return paint(`You need ${Z} electrons; you have ${count}.`);
    for (const [s] of SUB) { const c = boxes[s].reduce((a, v) => a + v, 0); if (c !== g[s]) return paint(`${s} should hold ${g[s]} electron${g[s] === 1 ? "" : "s"}${Z === 24 || Z === 29 ? " (this element is an exception: a half-filled or filled 3d subshell is more stable, so one 4s electron moves to 3d)" : ". Follow the Aufbau order: 1s 2s 2p 3s 3p 4s 3d 4p"}.`); }
    for (const [s, k] of SUB) { const a = boxes[s], c = a.reduce((x, v) => x + v, 0); if (c <= k && a.some((v) => v === 2)) return paint(`Hund's rule: in ${s}, put one electron in each orbital (with parallel spins) before pairing any.`); }
    right.add(Z); st.n = right.size; if (Z === 26) st.fe = true; if (Z === 24) st.cr = true; ch.check(st);
    paint(`Correct: ${ELEMENTS[Z - 1].config.replace(/([spdf])(\d+)/g, "$1$2")}.`);
  }
  reset(); paint();
}
