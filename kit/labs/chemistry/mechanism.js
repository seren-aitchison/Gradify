// Curly-arrow mechanism builder: draw each step's arrows yourself. Tap where the electrons start (a lone pair
// or a bond) and then where they go (an atom, or between two atoms to form a bond). When a step's arrows are
// all right, the next intermediate appears. Mechanisms follow standard undergraduate and A-level conventions.
import { shell, seg, button, panel, challenges, esc, C } from "../lab.js";

// step: atoms [id, label, x, y, charge], bonds [id, a, b, order], lone pairs [id, atom, angle], arrows [[from, to]], note
const STEP = (atoms, bonds, lps, arrows, note) => ({ atoms, bonds, lps, arrows, note });
export const MECHS = {
  sn2: { name: "Nucleophilic substitution (SN2): hydroxide and bromomethane", steps: [
    STEP([["O", "HO", 70, 120, -1], ["C", "C", 210, 120, 0], ["Br", "Br", 330, 120, 0], ["H1", "H", 220, 60, 0], ["H2", "H", 180, 175, 0], ["H3", "H", 245, 172, 0]], [["CBr", "C", "Br", 1], ["CH1", "C", "H1", 1], ["CH2", "C", "H2", 1], ["CH3", "C", "H3", 1]], [["lpO", "O", 0]],
      [["lp:lpO", "a:C"], ["b:CBr", "a:Br"]], "The nucleophile's lone pair attacks the carbon from the side opposite the bromine (backside attack) as the C–Br bond breaks heterolytically: one concerted step, with inversion of configuration."),
    STEP([["O", "HO", 110, 120, 0], ["C", "C", 210, 120, 0], ["Br", "Br", 350, 120, -1], ["H1", "H", 200, 60, 0], ["H2", "H", 240, 175, 0], ["H3", "H", 175, 172, 0]], [["OC", "O", "C", 1], ["CH1", "C", "H1", 1], ["CH2", "C", "H2", 1], ["CH3", "C", "H3", 1]], [], [], "Products: methanol and the bromide ion (the leaving group). Rate = k[CH₃Br][OH⁻]."),
  ] },
  addition: { name: "Electrophilic addition: hydrogen bromide and ethene", steps: [
    STEP([["C1", "C", 150, 150, 0], ["C2", "C", 240, 150, 0], ["H", "H", 195, 60, 0], ["Br", "Br", 195, 10, 0]], [["CC", "C1", "C2", 2], ["HBr", "H", "Br", 1]], [], [["b:CC", "a:H"], ["b:HBr", "a:Br"]], "The electron-rich C=C π bond attacks the δ+ hydrogen of H–Br, and the H–Br bond breaks heterolytically, both electrons going to bromine."),
    STEP([["C1", "C", 150, 150, 1], ["C2", "C", 240, 150, 0], ["H", "H", 255, 85, 0], ["Br", "Br", 80, 60, -1]], [["CC", "C1", "C2", 1], ["C2H", "C2", "H", 1]], [["lpBr", "Br", 0.6]], [["lp:lpBr", "a:C1"]], "A carbocation intermediate forms. The bromide ion's lone pair now attacks the positive carbon."),
    STEP([["C1", "C", 150, 150, 0], ["C2", "C", 240, 150, 0], ["H", "H", 255, 85, 0], ["Br", "Br", 120, 80, 0]], [["CC", "C1", "C2", 1], ["C2H", "C2", "H", 1], ["C1Br", "C1", "Br", 1]], [], [], "Product: bromoethane. With unsymmetrical alkenes the more stable (more substituted) carbocation forms, giving Markovnikov's rule."),
  ] },
  nucadd: { name: "Nucleophilic addition: cyanide and ethanal", steps: [
    STEP([["N", "N≡C", 60, 140, -1], ["C", "C", 210, 140, 0], ["O", "O", 210, 50, 0], ["Me", "CH₃", 290, 185, 0], ["H", "H", 130, 190, 0]], [["CO", "C", "O", 2], ["CMe", "C", "Me", 1], ["CH", "C", "H", 1]], [["lpCN", "N", 0]], [["lp:lpCN", "a:C"], ["b:CO", "a:O"]], "The cyanide ion's lone pair (on carbon) attacks the δ+ carbonyl carbon; the C=O π bond breaks and its electrons move onto oxygen."),
    STEP([["N", "N≡C", 100, 140, 0], ["C", "C", 210, 140, 0], ["O", "O", 210, 50, -1], ["Me", "CH₃", 290, 185, 0], ["H", "H", 170, 205, 0], ["HA", "H", 330, 30, 0], ["CN2", "CN", 395, 30, 0]], [["NC", "N", "C", 1], ["CO", "C", "O", 1], ["CMe", "C", "Me", 1], ["CH", "C", "H", 1], ["HCN", "HA", "CN2", 1]], [["lpO", "O", 0]], [["lp:lpO", "a:HA"], ["b:HCN", "a:CN2"]], "The alkoxide ion takes a proton from HCN, regenerating the cyanide ion (so cyanide is effectively a catalyst)."),
    STEP([["N", "N≡C", 100, 140, 0], ["C", "C", 210, 140, 0], ["O", "OH", 210, 50, 0], ["Me", "CH₃", 290, 185, 0], ["H", "H", 170, 205, 0]], [["NC", "N", "C", 1], ["CO", "C", "O", 1], ["CMe", "C", "Me", 1], ["CH", "C", "H", 1]], [], [], "Product: 2-hydroxypropanenitrile. Attack can occur from either face of the planar carbonyl, so a racemic mixture forms."),
  ] },
  e2: { name: "Elimination (E2): hydroxide and bromoethane", steps: [
    STEP([["O", "HO", 50, 60, -1], ["H", "H", 120, 80, 0], ["Cb", "C", 170, 140, 0], ["Ca", "C", 260, 140, 0], ["Br", "Br", 330, 200, 0]], [["HCb", "H", "Cb", 1], ["CC", "Cb", "Ca", 1], ["CBr", "Ca", "Br", 1]], [["lpO", "O", 0.4]], [["lp:lpO", "a:H"], ["b:HCb", "b:CC"], ["b:CBr", "a:Br"]], "Hydroxide acts as a base, removing a proton from the carbon next to C–Br; that C–H bond's electrons form the C=C π bond as bromide leaves. Favoured by heat, ethanol as solvent and a strong base."),
    STEP([["O", "H₂O", 60, 60, 0], ["Cb", "C", 170, 140, 0], ["Ca", "C", 260, 140, 0], ["Br", "Br", 340, 210, -1]], [["CC", "Cb", "Ca", 2]], [], [], "Products: ethene, water and the bromide ion."),
  ] },
};

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-row tools"></div>`);
  const ctrl = $(".lab-ctrl"), info = panel(ctrl);
  let key = "sn2", k = 0, drawn = [], from = null, msg = "";
  const done = new Set(); const st = { done };
  const ch = challenges(ctrl, ctx, [
    { id: "two", text: "Complete two mechanisms", test: (x) => x.done.size >= 2 },
    { id: "all", text: "Complete all four mechanisms", test: (x) => x.done.size >= 4 },
  ]);
  seg($(".top"), Object.entries(MECHS).map(([k2, v]) => [k2, v.name.split(":")[0]]), key, (v) => { key = v; k = 0; drawn = []; from = null; msg = ""; paint(); });
  button($(".tools"), "Undo last arrow", () => { drawn.pop(); from = null; paint(); });
  button($(".tools"), "Show the answer", () => { drawn = MECHS[key].steps[k].arrows.slice(); paint(); checkStep(); });
  function pos(step, ref) {
    const [t, id] = ref.split(":"), A = Object.fromEntries(step.atoms.map((a) => [a[0], a]));
    if (t === "a") return [A[id][2], A[id][3]];
    if (t === "b") { const b = step.bonds.find((x) => x[0] === id); return [(A[b[1]][2] + A[b[2]][2]) / 2, (A[b[1]][3] + A[b[2]][3]) / 2]; }
    const lp = step.lps.find((x) => x[0] === id), a = A[lp[1]]; return [a[2] + (14 + a[1].length * 5) * Math.cos(lp[2]), a[3] - 4 - 22 * Math.sin(lp[2])]; // angle from +x, anticlockwise
  }
  function checkStep() {
    const want = MECHS[key].steps[k].arrows, have = new Set(drawn.map((a) => a.join(">")));
    if (want.length && want.every((a) => have.has(a.join(">"))) && drawn.length === want.length) {
      msg = "Correct!"; setTimeout(() => { k++; drawn = []; msg = ""; if (k === MECHS[key].steps.length - 1) { done.add(key); ch.check(st); } paint(); }, 900);
    } else if (drawn.length >= want.length && want.length) msg = "Not quite: each arrow starts at a pair of electrons (lone pair or bond) and points to where they end up.";
    paint();
  }
  function paint() {
    const M = MECHS[key], step = M.steps[k], A = Object.fromEntries(step.atoms.map((a) => [a[0], a]));
    const bondSvg = step.bonds.map(([id, a, b, o]) => { const [, , x1, y1] = A[a], [, , x2, y2] = A[b], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L; return `<g class="hot" data-ref="b:${id}">${Array.from({ length: o }, (_, j) => { const off = (j - (o - 1) / 2) * 6; return `<line x1="${x1 + dx * 0.18 + nx * off}" y1="${y1 + dy * 0.18 + ny * off}" x2="${x2 - dx * 0.18 + nx * off}" y2="${y2 - dy * 0.18 + ny * off}" stroke="${from === `b:${id}` ? C.amber : "#e9ecef"}" stroke-width="2.6"/>`; }).join("")}<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="transparent" stroke-width="20"/></g>`; }).join("");
    const atomSvg = step.atoms.map(([id, lab, x, y, q]) => `<g class="hot" data-ref="a:${id}"><circle cx="${x}" cy="${y}" r="18" fill="transparent"/><text x="${x}" y="${y + 6}" text-anchor="middle" font-size="18" font-weight="700" fill="${lab === "O" || lab.startsWith("HO") || lab === "OH" ? "#ff8787" : lab.startsWith("Br") ? "#e599f7" : lab.startsWith("N") ? "#74c0fc" : "#fff"}">${esc(lab)}</text>${q ? `<text x="${x + 14 + lab.length * 3}" y="${y - 10}" font-size="13" fill="${q > 0 ? C.orange : C.blue}">${q > 0 ? "+" : "−"}</text>` : ""}</g>`).join("");
    const lpSvg = step.lps.map(([id]) => { const [x, y] = pos(step, `lp:${id}`); return `<g class="hot" data-ref="lp:${id}"><circle cx="${x}" cy="${y}" r="12" fill="${from === `lp:${id}` ? "rgba(245,159,0,.3)" : "transparent"}"/><circle cx="${x - 4}" cy="${y}" r="2.6" fill="${C.amber}"/><circle cx="${x + 4}" cy="${y}" r="2.6" fill="${C.amber}"/></g>`; }).join("");
    const arrowSvg = drawn.map(([a, b]) => { const [x1, y1] = pos(step, a), [x2, y2] = pos(step, b), mx = (x1 + x2) / 2, my = Math.min(y1, y2) - 40; return `<path d="M${x1} ${y1 - 6} Q${mx} ${my} ${x2} ${y2 - 12}" fill="none" stroke="${C.red}" stroke-width="2.2" marker-end="url(#cah)"/>`; }).join("");
    $(".lab-stage").innerHTML = `<svg class="lab-svg" viewBox="0 0 440 240" role="img" aria-label="Mechanism step"><defs><marker id="cah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="${C.red}"/></marker></defs>${bondSvg}${atomSvg}${lpSvg}${arrowSvg}</svg>`;
    $.all("[data-ref]").forEach((g) => g.addEventListener("click", (e) => { e.stopPropagation(); const r = g.dataset.ref; if (!step.arrows.length) return; if (!from) { if (r.startsWith("a:")) { msg = "An arrow starts at electrons: a lone pair or a bond, not an atom."; paint(); return; } from = r; paint(); return; } if (r === from) { from = null; paint(); return; } drawn.push([from, r]); from = null; checkStep(); }));
    info(`<h4>${esc(M.name)}</h4><p><b>Step ${k + 1} of ${M.steps.length}.</b> ${step.arrows.length ? `Draw ${step.arrows.length} curly arrow${step.arrows.length > 1 ? "s" : ""}. ${from ? "Now tap where these electrons go." : "Tap a lone pair or bond to start an arrow."}` : ""}</p><p>${step.note}</p><p class="lab-msg ${msg === "Correct!" ? "ok" : msg ? "no" : ""}">${msg}</p>`);
  }
  paint();
}
