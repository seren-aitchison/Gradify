// Lewis structure builder: the atoms are placed for you; tap a bond to cycle single → double → triple, and use
// + and − on an atom to add or remove lone pairs. The checker counts valence electrons, checks every atom's
// octet (2 for hydrogen; boron may have 6; period-3 atoms may exceed 8), and shows formal charges
// (FC = valence electrons − non-bonding electrons − bonds). Several correct answers can exist (resonance).
import { shell, seg, button, panel, challenges, esc, C } from "../lab.js";

const VAL = { H: 1, B: 3, C: 4, N: 5, O: 6, F: 7, S: 6, Cl: 7, P: 5 };
// [name, charge, atoms [el, x, y], bonds [a, b]]
export const MOLS = [
  ["H₂O", 0, [["O", 200, 120], ["H", 130, 170], ["H", 270, 170]], [[0, 1], [0, 2]]],
  ["NH₃", 0, [["N", 200, 110], ["H", 130, 165], ["H", 200, 190], ["H", 270, 165]], [[0, 1], [0, 2], [0, 3]]],
  ["CO₂", 0, [["O", 110, 130], ["C", 200, 130], ["O", 290, 130]], [[0, 1], [1, 2]]],
  ["HCN", 0, [["H", 100, 130], ["C", 190, 130], ["N", 280, 130]], [[0, 1], [1, 2]]],
  ["CH₂O (methanal)", 0, [["C", 200, 140], ["O", 200, 60], ["H", 130, 190], ["H", 270, 190]], [[0, 1], [0, 2], [0, 3]]],
  ["BF₃", 0, [["B", 200, 130], ["F", 200, 50], ["F", 125, 180], ["F", 275, 180]], [[0, 1], [0, 2], [0, 3]]],
  ["O₃ (ozone)", 0, [["O", 120, 150], ["O", 200, 100], ["O", 280, 150]], [[0, 1], [1, 2]]],
  ["NO₃⁻", -1, [["N", 200, 130], ["O", 200, 50], ["O", 125, 180], ["O", 275, 180]], [[0, 1], [0, 2], [0, 3]]],
  ["CO₃²⁻", -2, [["C", 200, 130], ["O", 200, 50], ["O", 125, 180], ["O", 275, 180]], [[0, 1], [0, 2], [0, 3]]],
  ["C₂H₄ (ethene)", 0, [["C", 160, 130], ["C", 240, 130], ["H", 100, 80], ["H", 100, 180], ["H", 300, 80], ["H", 300, 180]], [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5]]],
];
export function check(mol, orders, lone) {
  const [, charge, atoms, bonds] = mol, total = atoms.reduce((t, [e]) => t + VAL[e], 0) - charge;
  const used = 2 * orders.reduce((a, b) => a + b, 0) + 2 * lone.reduce((a, b) => a + b, 0);
  const fc = atoms.map(([e], i) => VAL[e] - 2 * lone[i] - bonds.reduce((t, b, k) => t + (b.includes(i) ? orders[k] : 0), 0));
  const shellOK = atoms.map(([e], i) => { const n = 2 * lone[i] + 2 * bonds.reduce((t, b, k) => t + (b.includes(i) ? orders[k] : 0), 0); return e === "H" ? n === 2 : e === "B" ? n === 6 || n === 8 : ["S", "P", "Cl"].includes(e) ? n >= 8 : n === 8; });
  return { total, used, fc, shellOK, ok: used === total && shellOK.every(Boolean) && fc.reduce((a, b) => a + b, 0) === charge, minimal: fc.every((f) => Math.abs(f) <= 1) };
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-row tools"></div>`);
  const ctrl = $(".lab-ctrl"), info = panel(ctrl);
  let k = 0, orders, lone, msg = ""; const solved = new Set();
  const st = { n: 0, res: false };
  const ch = challenges(ctrl, ctx, [
    { id: "five", text: "Draw five correct Lewis structures", test: (x) => x.n >= 5 },
    { id: "res", text: "Draw a structure that has resonance forms (ozone, nitrate or carbonate)", test: (x) => x.res },
  ]);
  const reset = () => { const m = MOLS[k]; orders = m[3].map(() => 1); lone = m[2].map(() => 0); msg = ""; };
  seg($(".top"), MOLS.map((m, i) => [i, m[0]]), k, (v) => { k = Number(v); reset(); paint(); });
  button($(".tools"), "Check", () => { const r = check(MOLS[k], orders, lone); if (r.ok) { solved.add(k); st.n = solved.size; if ([6, 7, 8].includes(k)) st.res = true; ch.check(st); msg = r.minimal ? "Correct." : "Valid, but some formal charges are larger than they need to be: try moving a lone pair into a multiple bond."; if ([6, 7, 8].includes(k)) msg += " The double bond could be drawn to any of the equivalent oxygens: these resonance forms average to identical bonds."; } else msg = r.used !== r.total ? `You've used ${r.used} electrons; this species has ${r.total} valence electrons.` : !r.shellOK.every(Boolean) ? `Not every atom has a full outer shell: check ${MOLS[k][2].filter((_, i) => !r.shellOK[i]).map((a) => a[0]).join(", ")}.` : "Check the charges."; paint(); }, "pri");
  button($(".tools"), "Reset", () => { reset(); paint(); });
  function paint() {
    const m = MOLS[k], [, charge, atoms, bonds] = m, r = check(m, orders, lone);
    const bondSvg = bonds.map(([a, b], i) => { const [, x1, y1] = atoms[a], [, x2, y2] = atoms[b], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L, o = orders[i]; return `<g class="hot" data-b="${i}">${Array.from({ length: o }, (_, j) => { const off = (j - (o - 1) / 2) * 7; return `<line x1="${x1 + dx * 0.22 + nx * off}" y1="${y1 + dy * 0.22 + ny * off}" x2="${x2 - dx * 0.22 + nx * off}" y2="${y2 - dy * 0.22 + ny * off}" stroke="#e9ecef" stroke-width="3"/>`; }).join("")}<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="transparent" stroke-width="18"/></g>`; }).join("");
    const atomSvg = atoms.map(([e, x, y], i) => { const pairs = lone[i], spots = [-Math.PI / 2, 0, Math.PI / 2, Math.PI].filter((a) => !bonds.some(([p, q]) => { if (p !== i && q !== i) return false; const o = atoms[p === i ? q : p]; const ang = Math.atan2(o[2] - y, o[1] - x); return Math.abs(Math.atan2(Math.sin(ang - a), Math.cos(ang - a))) < 0.8; })); const dots = Array.from({ length: pairs }, (_, j) => { const a = spots[j % spots.length] ?? (j * Math.PI) / 2, px = x + 22 * Math.cos(a), py = y + 22 * Math.sin(a), tx = -Math.sin(a) * 4, ty = Math.cos(a) * 4; return `<circle cx="${px + tx}" cy="${py + ty}" r="2.6" fill="${C.amber}"/><circle cx="${px - tx}" cy="${py - ty}" r="2.6" fill="${C.amber}"/>`; }).join(""); return `<g><text x="${x}" y="${y + 7}" text-anchor="middle" font-size="22" font-weight="700" fill="#fff">${e}</text>${dots}${r.fc[i] ? `<text x="${x + 16}" y="${y - 12}" font-size="12" fill="${r.fc[i] > 0 ? C.orange : C.blue}">${r.fc[i] > 0 ? "+" : "−"}${Math.abs(r.fc[i]) > 1 ? Math.abs(r.fc[i]) : ""}</text>` : ""}<g class="hot" data-a="${i}" data-d="1"><circle cx="${x - 16}" cy="${y + 26}" r="8" fill="#2b2f36"/><text x="${x - 16}" y="${y + 30}" text-anchor="middle" font-size="12" fill="#fff">+</text></g><g class="hot" data-a="${i}" data-d="-1"><circle cx="${x + 16}" cy="${y + 26}" r="8" fill="#2b2f36"/><text x="${x + 16}" y="${y + 30}" text-anchor="middle" font-size="12" fill="#fff">−</text></g></g>`; }).join("");
    $(".lab-stage").innerHTML = `<svg class="lab-svg" viewBox="0 0 400 240" role="img" aria-label="Lewis structure of ${esc(m[0])}">${bondSvg}${atomSvg}${charge ? `<text x="380" y="30" text-anchor="end" font-size="16" fill="#fff">${charge === -1 ? "1−" : charge === -2 ? "2−" : charge}</text>` : ""}</svg>`;
    $.all("[data-b]").forEach((g) => g.addEventListener("click", () => { const i = Number(g.dataset.b); orders[i] = (orders[i] % 3) + 1; paint(); }));
    $.all("[data-a]").forEach((g) => g.addEventListener("click", () => { const i = Number(g.dataset.a); lone[i] = Math.max(0, Math.min(4, lone[i] + Number(g.dataset.d))); paint(); }));
    info(`<h4>${esc(m[0])}</h4><div class="lab-read"><div><small>Valence electrons</small><b>${r.total}</b></div><div><small>Placed</small><b>${r.used}</b></div></div><p>Tap a bond to change its order; use + and − under an atom for lone pairs. Formal charges appear beside atoms.</p><p class="lab-msg ${msg.startsWith("Correct") || msg.startsWith("Valid") ? "ok" : msg ? "no" : ""}">${msg}</p>`);
  }
  reset(); paint();
}
