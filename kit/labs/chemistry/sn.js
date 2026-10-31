// SN1 versus SN2: choose the substrate, nucleophile and solvent and compare the two mechanisms' rates. SN2
// rate = k₂[RX][Nu] (one step, backside attack, inversion); SN1 rate = k₁[RX] (carbocation first,
// racemisation). Relative rate constants are approximate orders of magnitude from textbook comparisons
// (methyl > primary > secondary ≫ tertiary for SN2; tertiary ≫ secondary for SN1). This is a qualitative
// model: real rates depend on the exact substrate, leaving group, nucleophile and solvent, and elimination
// competes, especially with tertiary substrates and strong bases.
import { shell, seg, slider, canvas, axes, line, clear, text, challenges, panel, C } from "../lab.js";

const SUB = { methyl: ["CH₃Br (methyl)", 30, 0], primary: ["CH₃CH₂Br (primary)", 1, 0], secondary: ["(CH₃)₂CHBr (secondary)", 0.02, 0.002], tertiary: ["(CH₃)₃CBr (tertiary)", 0, 1] };
const NU = { strong: ["OH⁻ or CN⁻ (strong)", 1], weak: ["H₂O (weak)", 0.0005] };
const SOLV = { aprotic: ["propanone or DMSO (polar aprotic)", 30, 0.02], protic: ["water or ethanol (polar protic)", 1, 1] };
export function rates({ sub, nu, solv, RX = 0.1, Nu = 0.1 }) {
  const k2 = 0.05 * SUB[sub][1] * NU[nu][1] * SOLV[solv][1], k1 = 0.02 * SUB[sub][2] * SOLV[solv][2];
  return { sn2: k2 * RX * Nu, sn1: k1 * RX, k1, k2 };
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row r1"></div><div class="lab-row r2"></div><div class="lab-row r3"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.6, max: 340 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const s = { sub: "primary", nu: "strong", solv: "aprotic", Nu: 0.1 };
  const st = { sn1: false, nuIndep: false, inv: false };
  const ch = challenges(ctrl, ctx, [
    { id: "inv", text: "Find conditions where SN2 dominates: expect inversion of configuration", test: (x) => x.inv },
    { id: "sn1", text: "Find conditions where SN1 dominates: expect a racemic product", test: (x) => x.sn1 },
    { id: "nu", text: "Show that the SN1 rate doesn't change when you double [Nu]", test: (x) => x.nuIndep },
  ]);
  seg($(".r1"), Object.entries(SUB).map(([k, v]) => [k, v[0]]), s.sub, (v) => { s.sub = v; draw(); });
  seg($(".r2"), Object.entries(NU).map(([k, v]) => [k, `Nucleophile: ${v[0]}`]), s.nu, (v) => { s.nu = v; draw(); });
  seg($(".r3"), Object.entries(SOLV).map(([k, v]) => [k, `Solvent: ${v[0]}`]), s.solv, (v) => { s.solv = v; draw(); });
  let lastNu = s.Nu, lastSN1 = null;
  slider(ctrl, { label: "[Nu]", min: 0.05, max: 0.5, step: 0.05, value: s.Nu, unit: "mol/dm³", fmt: (v) => v.toFixed(2), onInput: (v) => { lastNu = s.Nu; lastSN1 = rates(s); s.Nu = v; draw(); } });
  function draw() {
    const r = rates(s), tot = r.sn1 + r.sn2 || 1e-12, f1 = r.sn1 / tot;
    if (f1 < 0.1 && r.sn2 > 1e-6) st.inv = true; if (f1 > 0.9 && r.sn1 > 1e-6) st.sn1 = true;
    if (lastSN1 && f1 > 0.9 && Math.abs(s.Nu - lastNu) > 0.04 && Math.abs(rates(s).sn1 - lastSN1.sn1) < 1e-12) st.nuIndep = true; ch.check(st);
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    // [RX] over time under the combined rate
    const k = (r.sn1 + r.sn2) / 0.1, A = axes(g, { l: 50, t: 14, w: W - 64, h: H - 50 }, { x0: 0, x1: 100, y0: 0, y1: 0.1, xl: "time (arbitrary units)", yl: "[RX]", xt: 5, yt: 2, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(2) });
    line(g, Array.from({ length: 101 }, (_, t) => [A.X(t), A.Y(0.1 * Math.exp(-k * t))]), C.amber, 2.4);
    // bar of mechanism share
    g.fillStyle = C.teal; g.fillRect(A.X(55), 24, (A.X(98) - A.X(55)) * (1 - f1), 14); g.fillStyle = C.orange; g.fillRect(A.X(55) + (A.X(98) - A.X(55)) * (1 - f1), 24, (A.X(98) - A.X(55)) * f1, 14);
    text(g, `SN2 ${Math.round((1 - f1) * 100)}%`, A.X(55), 52, { size: 11, color: C.teal }); text(g, `SN1 ${Math.round(f1 * 100)}%`, A.X(98), 52, { size: 11, color: C.orange, align: "right" });
    const dom = r.sn1 + r.sn2 < 1e-7 ? "none" : f1 > 0.5 ? "SN1" : "SN2";
    out(`<div class="lab-read"><div><small>SN2 rate</small><b>${r.sn2.toExponential(1)}</b></div><div><small>SN1 rate</small><b>${r.sn1.toExponential(1)}</b></div><div><small>Main pathway</small><b>${dom}</b></div><div><small>Stereochemistry</small><b>${dom === "SN2" ? "inversion" : dom === "SN1" ? "racemisation" : "–"}</b></div></div>
      <p class="lab-msg">${s.sub === "tertiary" ? "Tertiary: too crowded for backside attack (no SN2), but the tertiary carbocation is stabilised by three alkyl groups, so SN1 is fast. With a strong base, elimination (E1/E2) would compete." : s.sub === "methyl" || s.sub === "primary" ? "Methyl and primary: unhindered for backside attack, but their carbocations are too unstable for SN1." : "Secondary: both pathways are possible; the nucleophile and solvent decide."} Polar protic solvents stabilise the carbocation and leaving group (helping SN1) but solvate and weaken anionic nucleophiles (slowing SN2). Relative rates are approximate.</p>`);
  }
  draw();
}
