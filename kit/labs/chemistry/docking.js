// Molecular docking and binding: place a ligand in a protein's binding pocket (drag to move, buttons to turn)
// and watch a scoring function respond: hydrogen bonds between donors and acceptors at the right distance,
// hydrophobic contacts, an ionic interaction, and penalties for clashes. "Auto-dock" runs a random search
// with local refinement, like (much simplified) docking programs. Compare ligand variants to see
// structure–activity relationships. The pocket, ligands and scoring function are invented for teaching:
// the terms resemble empirical scoring functions, but the numbers are illustrative, not predictions.
import { shell, seg, button, canvas, clear, circle, text, line, challenges, panel, C } from "../lab.js";

// pocket sites (Å, pocket frame): type d = H-bond donor, a = acceptor, h = hydrophobic, + = cation, w = wall
const SITES = [["d", -4.9, 2.2, "Ser O–H"], ["a", -4.6, -2.6, "Asp C=O"], ["h", 1.0, 5.1, "Leu side chain"], ["h", 4.6, 3.6, "Phe ring"], ["+", 6.4, -1.2, "Lys NH₃⁺"], ["d", 0.9, -4.2, "Asn N–H"],
  // the pocket wall: an ellipse of residues, open at the top where the ligand enters
  ...Array.from({ length: 30 }, (_, i) => (i / 30) * 2 * Math.PI).filter((a) => Math.abs(a - Math.PI / 2) > 0.35).map((a) => ["w", 0.5 + 7.8 * Math.cos(a), 6.6 * Math.sin(a), "pocket wall"])];
// ligands: atoms [type, x, y, label]; types: a acceptor, d donor, h hydrophobic, - anion, c carbon (neutral)
export const LIGANDS = {
  base: { name: "Lead compound", atoms: [["c", 0, 0, ""], ["c", 1.4, 0, ""], ["c", -1.4, 0, ""], ["a", -2.4, 0.8, "O"], ["h", 1.6, 1.4, "CH₃"]] },
  acid: { name: "+ carboxylate", atoms: [["c", 0, 0, ""], ["c", 1.4, 0, ""], ["c", -1.4, 0, ""], ["a", -2.4, 0.8, "O"], ["h", 1.6, 1.4, "CH₃"], ["c", 2.6, -0.5, ""], ["-", 3.4, -0.3, "COO⁻"]] },
  full: { name: "+ carboxylate + OH", atoms: [["c", 0, 0, ""], ["c", 1.4, 0, ""], ["c", -1.4, 0, ""], ["a", -2.4, 0.8, "O"], ["h", 1.6, 1.4, "CH₃"], ["c", 2.6, -0.5, ""], ["-", 3.4, -0.3, "COO⁻"], ["d", -2.2, -1.2, "OH"], ["a", 0.4, -1.3, "N"]] },
};
export function score(lig, x, y, th) {
  let s = 0; const terms = { hb: 0, hyd: 0, ion: 0, clash: 0 };
  const P = lig.atoms.map(([t, ax, ay]) => [t, x + ax * Math.cos(th) - ay * Math.sin(th), y + ax * Math.sin(th) + ay * Math.cos(th)]);
  for (const [t, px, py] of P) for (const [st2, sx, sy] of SITES) {
    const d = Math.hypot(px - sx, py - sy);
    if (d < 2.2) terms.clash += (2.2 - d) * 3;
    if ((t === "a" && st2 === "d") || (t === "d" && st2 === "a")) terms.hb -= d < 3.4 ? (d > 2.5 ? 1.5 : 1.5 - (2.5 - d) * 2) : Math.max(0, 1.5 - (d - 3.4) * 1.5);
    if (t === "h" && st2 === "h") terms.hyd -= Math.max(0, 0.8 - Math.abs(d - 3.8) * 0.4);
    if (t === "-" && st2 === "+") terms.ion -= Math.max(0, 3.2 - Math.max(0, d - 3.0) * 1.2);
  }
  s = terms.hb + terms.hyd + terms.ion + terms.clash;
  return { s, terms, P };
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-row tools"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.8, max: 440 }), ctrl = $(".lab-ctrl"), info = panel(ctrl);
  let key = "base", pose = { x: 0.5, y: 6.8, th: 0.6 }, best = {};
  const st = { manual: false, sar: false, auto: false };
  const ch = challenges(ctrl, ctx, [
    { id: "man", text: "Dock the lead compound by hand to a score of −2.5 or better", test: (x) => x.manual },
    { id: "auto", text: "Run auto-dock and compare its pose with yours", test: (x) => x.auto },
    { id: "sar", text: "Find the ligand variant that binds best (structure–activity relationship)", test: (x) => x.sar },
  ]);
  seg($(".top"), Object.entries(LIGANDS).map(([k, v]) => [k, v.name]), key, (v) => { key = v; pose = { x: 0.5, y: 6.8, th: 0.6 }; draw(); });
  button($(".tools"), "⟲ Turn", () => { pose.th += Math.PI / 12; draw(); }); button($(".tools"), "⟳ Turn", () => { pose.th -= Math.PI / 12; draw(); });
  button($(".tools"), "Auto-dock", () => {
    let bp = { ...pose }, bs = score(LIGANDS[key], bp.x, bp.y, bp.th).s;
    for (let i = 0; i < 6000; i++) { const p = i % 4 === 0 ? { x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 9, th: Math.random() * 2 * Math.PI } : { x: bp.x + (Math.random() - 0.5) * 0.6, y: bp.y + (Math.random() - 0.5) * 0.6, th: bp.th + (Math.random() - 0.5) * 0.3 }; const v = score(LIGANDS[key], p.x, p.y, p.th).s; if (v < bs) { bs = v; bp = p; } }
    pose = bp; st.auto = true; ch.check(st); draw();
  }, "pri");
  const S = 22, toPx = (x, y) => [cv.W / 2 + x * S, cv.H / 2 - y * S];
  let drag = null;
  cv.cv.addEventListener("pointerdown", (e) => { const [px, py] = cv.pos(e), [lx, ly] = toPx(pose.x, pose.y); if (Math.hypot(px - lx, py - ly) < 80) { drag = [px, py, pose.x, pose.y]; cv.cv.setPointerCapture(e.pointerId); } });
  cv.cv.addEventListener("pointermove", (e) => { if (!drag) return; const [px, py] = cv.pos(e); pose.x = drag[2] + (px - drag[0]) / S; pose.y = drag[3] - (py - drag[1]) / S; draw(); });
  cv.cv.addEventListener("pointerup", () => { drag = null; });
  const COL = { a: C.red, d: C.blue, h: C.gold, "+": C.blue, "-": C.red, c: "#adb5bd", w: "#343a40" };
  function draw() {
    const L = LIGANDS[key], r = score(L, pose.x, pose.y, pose.th), g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    for (const [t, x, y, lab] of SITES) { const [px, py] = toPx(x, y); circle(g, px, py, t === "w" ? 13 : 11, t === "w" ? "#22272e" : COL[t] + "55", t === "w" ? null : COL[t]); if (t !== "w") text(g, lab, px, py + (y > 0 ? -16 : 24), { align: "center", size: 10, color: C.mute }); }
    // interaction lines
    for (const [t, px, py] of r.P) for (const [st2, sx, sy] of SITES) { const d = Math.hypot(px - sx, py - sy); if (((t === "a" && st2 === "d") || (t === "d" && st2 === "a")) && d < 3.4) line(g, [toPx(px, py), toPx(sx, sy)], C.teal, 1.4, [3, 3]); if (t === "-" && st2 === "+" && d < 4.2) line(g, [toPx(px, py), toPx(sx, sy)], C.violet, 1.6, [4, 3]); if (d < 2.2) line(g, [toPx(px, py), toPx(sx, sy)], C.red, 2); }
    for (let i = 0; i < r.P.length; i++) { const [t, px, py] = r.P[i], [qx, qy] = toPx(px, py); if (i && i < 3) line(g, [toPx(r.P[0][1], r.P[0][2]), [qx, qy]], "#868e96", 3); if (i >= 3) { const near = r.P.slice(0, 3).concat(r.P.slice(5, 6)).reduce((a, p) => (Math.hypot(p[1] - px, p[2] - py) < Math.hypot(a[1] - px, a[2] - py) ? p : a)); line(g, [toPx(near[1], near[2]), [qx, qy]], "#868e96", 3); } }
    r.P.forEach(([t, px, py], i) => { const [qx, qy] = toPx(px, py); circle(g, qx, qy, 9, COL[t], "#000"); if (L.atoms[i][3]) text(g, L.atoms[i][3], qx, qy - 13, { align: "center", size: 10, weight: 600 }); });
    best[key] = Math.min(best[key] ?? 0, r.s);
    if (key === "base" && r.s <= -2.5 && !st.auto) st.manual = true; if (best.full != null && best.full < (best.acid ?? 0) && (best.acid ?? 0) < (best.base ?? 0) && best.full < -6) st.sar = true; ch.check(st);
    info(`<h4>${L.name}</h4><div class="lab-read"><div><small>Score (lower is better)</small><b>${r.s.toFixed(1)}</b></div><div><small>H-bonds</small><b>${r.terms.hb.toFixed(1)}</b></div><div><small>Hydrophobic</small><b>${r.terms.hyd.toFixed(1)}</b></div><div><small>Ionic</small><b>${r.terms.ion.toFixed(1)}</b></div><div><small>Clashes</small><b>+${r.terms.clash.toFixed(1)}</b></div></div>
      <p>Best so far: ${Object.entries(best).map(([k, v]) => `${LIGANDS[k].name} ${v.toFixed(1)}`).join(" · ")}</p>
      <p class="lab-msg">Drag the ligand into the pocket. Red: acceptors (O, N) and the anion; blue: donors and the cation; gold: hydrophobic groups. Dashed teal lines are hydrogen bonds (2.5–3.4 Å), violet the salt bridge, red lines clashes. Adding groups that make new interactions, without clashes, improves binding: the idea behind lead optimisation. Invented pocket and illustrative scores.</p>`);
  }
  draw();
}
