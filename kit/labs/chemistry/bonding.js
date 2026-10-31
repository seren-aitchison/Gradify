// Ionic and covalent bonding: dot-and-cross diagrams for simple ionic compounds and covalent molecules, and
// the electronegativity difference as a guide to bond type. The cut-offs (below about 0.4 non-polar, up to
// about 1.8 polar covalent, above that mainly ionic) are a rule of thumb: bonding is a continuum, and metal–
// non-metal pairs are usually treated as ionic.
import { shell, seg, canvas, clear, circle, text, panel, challenges, quiz, C } from "../lab.js";
import { bySym } from "./elements.js";

export const IONIC = { NaCl: [["Na", 1, 1], ["Cl", 1, -1]], MgO: [["Mg", 1, 2], ["O", 1, -2]], CaCl2: [["Ca", 1, 2], ["Cl", 2, -1]], Li2O: [["Li", 2, 1], ["O", 1, -2]], Al2O3: [["Al", 2, 3], ["O", 3, -2]] };
export const COVALENT = { H2: ["H", "H", 1, 0, 0], Cl2: ["Cl", "Cl", 1, 3, 3], HCl: ["H", "Cl", 1, 0, 3], O2: ["O", "O", 2, 2, 2], N2: ["N", "N", 3, 1, 1], HF: ["H", "F", 1, 0, 3], CO: ["C", "O", 3, 1, 1] };
export const bondType = (a, b) => { const d = Math.abs((bySym[a].en ?? 0) - (bySym[b].en ?? 0)); return { d, type: d < 0.4 ? "non-polar covalent" : d <= 1.8 ? "polar covalent" : "ionic" }; };
const sub = (s) => s.replace(/(\d)/g, "<sub>$1</sub>");

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-row top2"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-q"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.55, max: 340 }), ctrl = $(".lab-ctrl"), info = panel(ctrl);
  let kind = "ionic", pick = "NaCl";
  const st = { seen: new Set() };
  const ch = challenges(ctrl, ctx, [{ id: "all", text: "Draw five ionic compounds and five covalent molecules", test: (x) => [...x.seen].filter((k) => IONIC[k]).length >= 5 && [...x.seen].filter((k) => COVALENT[k]).length >= 5 }]);
  quiz($(".lab-q"), ctx, [
    { id: "mgo", q: "Why does MgO have a much higher melting point than NaCl?", options: ["MgO is covalent", "Mg²⁺ and O²⁻ carry double charges and are smaller, so the electrostatic attraction is much stronger", "MgO has more ions", "Oxygen is more electronegative than chlorine"], answer: 1, why: "Lattice energy grows with ionic charge and falls with ionic size. Doubling both charges roughly quadruples the attraction (2,800 °C versus 801 °C)." },
    { id: "n2", q: "How many electrons are shared between the two atoms in N₂?", options: ["2", "4", "6", "8"], answer: 2, why: "A triple bond: three shared pairs, six electrons. Each nitrogen also keeps one lone pair, completing its octet." },
  ]);
  const pickers = $(".top2");
  seg($(".top"), [["ionic", "Ionic"], ["covalent", "Covalent"]], kind, (v) => { kind = v; pick = v === "ionic" ? "NaCl" : "Cl2"; menu(); draw(); });
  function menu() { pickers.innerHTML = ""; seg(pickers, Object.keys(kind === "ionic" ? IONIC : COVALENT).map((k) => [k, sub(k)]), pick, (v) => { pick = v; draw(); }); }
  // electrons on a shell around (x, y): dots for one atom's own, crosses for the other's
  const electrons = (g, x, y, r, n, mark, col, start = 0, gap = 0) => { for (let i = 0; i < n; i++) { const pair = Math.floor(i / 2), a = start + (pair * 2 * Math.PI) / 4 + (i % 2 ? 0.25 : -0.25) + gap; const ex = x + r * Math.cos(a), ey = y + r * Math.sin(a); if (mark === "x") { text(g, "×", ex, ey + 4, { align: "center", size: 13, weight: 700, color: col }); } else circle(g, ex, ey, 3.2, col); } };
  function draw() {
    st.seen.add(pick); ch.check(st);
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    if (kind === "ionic") {
      const [[m, nm, qm], [x, nx, qx]] = IONIC[pick], ions = [...Array(nm).fill([m, qm, "·"]), ...Array(nx).fill([x, qx, "×"])];
      ions.forEach(([e, q, mk], i) => {
        const cx = ((i + 0.5) * W) / ions.length, cy = H / 2, r = Math.min(60, W / ions.length / 2 - 12);
        g.strokeStyle = "rgba(255,255,255,.5)"; g.lineWidth = 1.5; g.beginPath(); g.rect(cx - r - 8, cy - r - 8, 2 * r + 16, 2 * r + 16); g.stroke();
        circle(g, cx, cy, r, null, "rgba(255,255,255,.3)");
        text(g, e, cx, cy + 6, { align: "center", size: 18, weight: 700 });
        text(g, `${Math.abs(q) > 1 ? Math.abs(q) : ""}${q > 0 ? "+" : "−"}`, cx + r + 10, cy - r - 2, { size: 14, weight: 700, color: q > 0 ? C.orange : C.blue });
        // cations have lost their outer electrons (full inner shell shown); anions have gained them (crosses)
        if (q < 0) { electrons(g, cx, cy, r, 8 - Math.abs(q), "·", C.blue); electrons(g, cx, cy, r, Math.abs(q), "x", C.orange, Math.PI * 1.5); }
        else electrons(g, cx, cy, r, e === "Li" ? 2 : 8, "·", C.orange);
      });
      const [a, b] = IONIC[pick], bt = bondType(a[0], b[0]);
      info(`<h4>${sub(pick)}: ionic</h4><p>${a[0]} loses ${a[2]} electron${a[2] > 1 ? "s" : ""} per atom to form ${a[0]}<sup>${a[2] > 1 ? a[2] : ""}+</sup>; ${b[0]} gains ${-b[2]} to form ${b[0]}<sup>${-b[2] > 1 ? -b[2] : ""}−</sup>. The charges balance: ${a[1]} × (+${a[2]}) + ${b[1]} × (${b[2]}) = 0.</p><p class="lab-msg">Electronegativity difference ${bt.d.toFixed(2)}. In the solid, ions form a giant lattice held by strong electrostatic attraction in all directions; the diagram shows one formula unit. Crosses: electrons that came from the metal.</p>`);
    } else {
      const [a, b, order, la, lb] = COVALENT[pick], cy = H / 2, r = 54, ax = W / 2 - r * 0.62, bx = W / 2 + r * 0.62;
      circle(g, ax, cy, r, null, "rgba(255,255,255,.35)"); circle(g, bx, cy, r, null, "rgba(255,255,255,.35)");
      text(g, a, ax - 14, cy + 6, { align: "center", size: 18, weight: 700 }); text(g, b, bx + 14, cy + 6, { align: "center", size: 18, weight: 700 });
      // shared pairs in the overlap: one dot and one cross per pair
      for (let k = 0; k < order; k++) { const y = cy + (k - (order - 1) / 2) * 16; circle(g, W / 2 - 5, y, 3.2, C.amber); text(g, "×", W / 2 + 6, y + 4, { align: "center", size: 13, weight: 700, color: C.teal }); }
      const lone = (x, n, mk, col, side) => { for (let k = 0; k < n; k++) { const ang = side + (k - (n - 1) / 2) * 1.1, px = x + (r - 6) * Math.cos(ang), py = cy + (r - 6) * Math.sin(ang); for (const o of [-4, 4]) { const qx = px + o * Math.sin(ang), qy = py - o * Math.cos(ang); if (mk === "x") text(g, "×", qx, qy + 4, { align: "center", size: 12, weight: 700, color: col }); else circle(g, qx, qy, 3, col); } } };
      lone(ax, la, "·", C.amber, Math.PI); lone(bx, lb, "x", C.teal, 0);
      const bt = bondType(a, b), dA = bySym[a].en, dB = bySym[b].en;
      if (bt.d >= 0.4) { text(g, "δ+", (dA < dB ? ax : bx) + (dA < dB ? -r : r) * 0.6, cy - r - 8, { align: "center", size: 14, color: C.orange }); text(g, "δ−", (dA < dB ? bx : ax) + (dA < dB ? r : -r) * 0.6, cy - r - 8, { align: "center", size: 14, color: C.blue }); }
      info(`<h4>${sub(pick)}: ${["", "single", "double", "triple"][order]} covalent bond</h4><p>${order} shared pair${order > 1 ? "s" : ""} of electrons; each atom ends with a full outer shell (${a === "H" ? "2 for hydrogen" : "8"}${b !== a && b !== "H" && a === "H" ? ", 8 for the other" : ""}).</p><p class="lab-msg">Electronegativity difference ${bt.d.toFixed(2)}: ${bt.type}. ${bt.d >= 0.4 ? "The shared electrons are pulled towards the more electronegative atom, giving partial charges δ+ and δ−." : "The electrons are shared equally."}${pick === "CO" ? " In CO one of the three shared pairs comes entirely from oxygen (a dative bond)." : ""}</p>`);
    }
  }
  menu(); draw();
}
