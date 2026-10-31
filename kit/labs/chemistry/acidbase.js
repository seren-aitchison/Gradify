// Acids, bases, pH and titrations (ctx.mode "ph" or "titration"). pH is found exactly from the charge balance
// (with water's autoionisation, Kw = 1.0 × 10⁻¹⁴ at 25 °C), not from the usual approximations, so it is
// right for dilute and concentrated solutions alike. Activities are taken as concentrations (ideal solutions),
// which is the main simplification above about 0.1 mol/dm³.
import { shell, seg, slider, select, button, canvas, axes, line, clear, circle, text, rrect, challenges, panel, bisect, C } from "../lab.js";

const Kw = 1e-14;
// solution: weak/strong acid HA (Ca, Ka; Ka = Infinity for strong), weak/strong base B (Cb, Kb), plus spectator Na⁺ and Cl⁻
export function pH({ Ca = 0, Ka = Infinity, Cb = 0, Kb = Infinity, Na = 0, Cl = 0 } = {}) {
  const f = (h) => {
    const oh = Kw / h, A = Ka === Infinity ? Ca : (Ca * Ka) / (Ka + h), BH = Kb === Infinity ? Cb : (Cb * (Kb / oh)) / (1 + Kb / oh);
    return h + BH + Na - oh - A - Cl;
  };
  return -Math.log10(10 ** bisect((x) => f(10 ** x), -15.5, 1.5, 120));
}
export const ACIDS = { HCl: ["Hydrochloric acid (strong)", Infinity], CH3COOH: ["Ethanoic acid (Ka 1.8 × 10⁻⁵)", 1.8e-5], HCOOH: ["Methanoic acid (Ka 1.8 × 10⁻⁴)", 1.8e-4], HCN: ["Hydrogen cyanide (Ka 6.2 × 10⁻¹⁰)", 6.2e-10] };
export const BASES = { NaOH: ["Sodium hydroxide (strong)", Infinity], NH3: ["Ammonia (Kb 1.8 × 10⁻⁵)", 1.8e-5] };
const INDICATORS = { "methyl orange": [3.1, 4.4, "#ff4d4d", "#ffd43b"], "bromothymol blue": [6.0, 7.6, "#ffd43b", "#4dabf7"], phenolphthalein: [8.2, 10.0, "rgba(255,255,255,.08)", "#f06595"] };

export function mount(el, ctx = {}) { return ctx.mode === "titration" ? titration(el, ctx) : phLab(el, ctx); }

function phLab(el, ctx) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.6, max: 360 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let kind = "CH3COOH", c = 0.1, salt = 0;
  const st = { strongweak: new Set(), buffer: false, dilute: false };
  const ch = challenges(ctrl, ctx, [
    { id: "sw", text: "Compare a strong and a weak acid at the same concentration", test: (x) => x.strongweak.size >= 2 },
    { id: "buf", text: "Make a buffer: add the conjugate base until pH = pKa", test: (x) => x.buffer },
    { id: "dil", text: "Dilute a strong acid to 10⁻⁸ mol/dm³: why isn't the pH 8?", test: (x) => x.dilute },
  ]);
  select($(".top"), { label: "Acid", options: Object.entries(ACIDS).map(([k, v]) => [k, v[0]]), value: kind, onChange: (v) => { kind = v; draw(); } });
  slider(ctrl, { label: "log₁₀ concentration", min: -9, max: 0, step: 0.1, value: -1, fmt: (v) => `${(10 ** v).toExponential(1)} M`, onInput: (v) => { c = 10 ** v; draw(); } });
  slider(ctrl, { label: "Conjugate base added (sodium salt)", min: 0, max: 2, step: 0.05, value: 0, unit: "× acid", fmt: (v) => v.toFixed(2), onInput: (v) => { salt = v; draw(); } });
  function draw() {
    const Ka = ACIDS[kind][1], salts = salt * c;
    // a sodium salt NaA adds Na⁺ and A⁻: the same as more acid neutralised by Na⁺
    const p = pH({ Ca: c + salts, Ka, Na: salts }), pKa = Ka === Infinity ? null : -Math.log10(Ka);
    st.strongweak.add(Ka === Infinity ? "s" : "w"); if (pKa && salt > 0 && Math.abs(p - pKa) < 0.05 && c > 1e-4) st.buffer = true; if (Ka === Infinity && c < 3e-8) st.dilute = true; ch.check(st);
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    // species distribution
    const A = axes(g, { l: 46, t: 14, w: W - 60, h: H - 50 }, { x0: 0, x1: 14, y0: 0, y1: 1, xl: "pH", yl: "fraction", xt: 7, yt: 2, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(1) });
    if (pKa) { line(g, Array.from({ length: 141 }, (_, i) => { const h = 10 ** -(i / 10); return [A.X(i / 10), A.Y(h / (h + Ka))]; }), C.amber, 2); line(g, Array.from({ length: 141 }, (_, i) => { const h = 10 ** -(i / 10); return [A.X(i / 10), A.Y(Ka / (h + Ka))]; }), C.teal, 2); text(g, "HA", A.X(Math.max(0.3, pKa - 3)), A.Y(0.92), { color: C.amber, size: 12 }); text(g, "A⁻", A.X(Math.min(13, pKa + 2.5)), A.Y(0.92), { color: C.teal, size: 12 }); line(g, [[A.X(pKa), A.Y(0)], [A.X(pKa), A.Y(1)]], "rgba(255,255,255,.25)", 1, [3, 3]); text(g, "pKa", A.X(pKa) + 4, A.Y(0.5), { size: 10, color: C.mute }); }
    else text(g, "A strong acid is fully dissociated at every pH shown", W / 2, H / 2, { align: "center", color: C.mute });
    line(g, [[A.X(p), A.Y(0)], [A.X(p), A.Y(1)]], C.white, 2); text(g, `pH ${p.toFixed(2)}`, A.X(p) + 4, A.Y(0.06), { size: 12, weight: 700 });
    const h = 10 ** -p, approx = Ka === Infinity ? -Math.log10(c) : -Math.log10(Math.sqrt(Ka * c));
    out(`<div class="lab-read"><div><small>pH (exact)</small><b>${p.toFixed(2)}</b></div><div><small>[H⁺]</small><b>${h.toExponential(2)} M</b></div><div><small>[OH⁻]</small><b>${(Kw / h).toExponential(2)} M</b></div>${pKa ? `<div><small>pKa</small><b>${pKa.toFixed(2)}</b></div><div><small>Dissociated</small><b>${((100 * (Ka / (h + Ka)))).toFixed(salt ? 1 : 2)}%</b></div>` : ""}${!salt ? `<div><small>Usual approximation</small><b>${approx.toFixed(2)}</b></div>` : ""}</div>
      <p class="lab-msg">${salt ? "With both HA and A⁻ present the solution is a buffer: pH = pKa + log([A⁻]/[HA]) (the Henderson–Hasselbalch equation), and pH = pKa when they are equal." : Ka === Infinity ? (c < 1e-6 ? "At very low concentrations water's own H⁺ (10⁻⁷ M) matters, so the pH stays just below 7: an acid can never make water alkaline." : "A strong acid dissociates completely, so [H⁺] = c and pH = −log c.") : "A weak acid only partly dissociates; the approximation pH ≈ ½(pKa − log c) assumes little dissociation and fails for very dilute solutions."}</p>`);
  }
  draw();
}

function titration(el, ctx) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div><div class="lab-stage2"></div><div class="lab-ctrl"></div></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.66, max: 380 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.7, max: 200 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const s = { analyte: "CH3COOH", Ca: 0.1, Va: 25, Ct: 0.1, ind: "methyl orange", added: 0 };
  const st = { eq: false, ind: false, pka: false };
  const ch = challenges(ctrl, ctx, [
    { id: "eq", text: "Stop within 0.1 cm³ of the equivalence point", test: (x) => x.eq },
    { id: "ind", text: "Choose an indicator whose colour change falls in the steep part of the curve", test: (x) => x.ind },
    { id: "pka", text: "Read the pKa at half-neutralisation (weak acid)", test: (x) => x.pka },
  ]);
  select($(".top"), { label: "Analyte (25.0 cm³)", options: [["HCl", "HCl (strong acid)"], ["CH3COOH", "Ethanoic acid (weak)"], ["NH3", "Ammonia (weak base)"]], value: s.analyte, onChange: (v) => { s.analyte = v; s.added = 0; draw(); } });
  select($(".top"), { label: "Indicator", options: Object.keys(INDICATORS), value: s.ind, onChange: (v) => { s.ind = v; draw(); } });
  slider(ctrl, { label: "Analyte concentration", min: 0.01, max: 0.2, step: 0.01, value: s.Ca, unit: "mol/dm³", fmt: (v) => v.toFixed(2), onInput: (v) => { s.Ca = v; draw(); } });
  const row = document.createElement("div"); row.className = "lab-row"; ctrl.append(row);
  for (const [lab, dv] of [["+5 cm³", 5], ["+1 cm³", 1], ["+0.1 cm³ (drop)", 0.1]]) button(row, lab, () => { s.added = Math.min(50, +(s.added + dv).toFixed(2)); draw(); });
  button(row, "Empty the flask", () => { s.added = 0; draw(); });
  const isBase = () => s.analyte === "NH3";
  const pHat = (V) => { const vol = (s.Va + V) / 1000, na = (s.Ca * s.Va) / 1000 / vol, nt = (s.Ct * V) / 1000 / vol; if (isBase()) return pH({ Cb: na, Kb: BASES.NH3[1], Cl: nt }); /* HCl adds Cl⁻; its H⁺ is accounted for by the charge balance */ return pH({ Ca: na, Ka: ACIDS[s.analyte][1], Na: nt }); };
  function draw() {
    const Veq = (s.Ca * s.Va) / s.Ct, p = pHat(s.added), [lo, hi, c1, c2] = INDICATORS[s.ind];
    const steep = [pHat(Veq - 0.05), pHat(Veq + 0.05)].sort((a, b) => a - b);
    if (Math.abs(s.added - Veq) <= 0.1) st.eq = true; if (lo >= steep[0] - 0.3 && hi <= steep[1] + 0.3) st.ind = true; if (s.analyte === "CH3COOH" && Math.abs(s.added - Veq / 2) < 0.15) st.pka = true; ch.check(st);
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const A = axes(g, { l: 46, t: 14, w: W - 60, h: H - 50 }, { x0: 0, x1: 50, y0: 0, y1: 14, xl: `${isBase() ? "HCl" : "NaOH"} added (cm³)`, yl: "pH", xt: 5, yt: 7, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    g.fillStyle = "rgba(255,255,255,.05)"; g.fillRect(A.X(0), A.Y(hi), A.X(50) - A.X(0), A.Y(lo) - A.Y(hi)); text(g, `${s.ind} range`, A.X(49), A.Y(hi) - 3, { align: "right", size: 10, color: C.mute });
    line(g, Array.from({ length: 501 }, (_, i) => [A.X(i / 10), A.Y(pHat(i / 10))]), "rgba(255,255,255,.18)", 1.4, [3, 3]);
    line(g, Array.from({ length: Math.round(s.added * 10) + 1 }, (_, i) => [A.X(i / 10), A.Y(pHat(i / 10))]), C.amber, 2.4);
    circle(g, A.X(s.added), A.Y(p), 5, C.white);
    // flask colour from the indicator
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; clear(g2, W2, H2);
    const f = Math.max(0, Math.min(1, (p - lo) / (hi - lo)));
    rrect(g2, W2 / 2 - 8, 6, 16, H2 * 0.42, 4, "rgba(255,255,255,.08)", "rgba(255,255,255,.4)"); text(g2, `${(50 - s.added).toFixed(2)} cm³ left`, W2 / 2 + 14, 20, { size: 10, color: C.mute });
    g2.fillStyle = f < 0.5 ? c1 : c2; g2.globalAlpha = 0.3 + 0.6 * Math.abs(f - 0.5) * 2; g2.beginPath(); g2.moveTo(W2 / 2 - 14, H2 * 0.5); g2.lineTo(W2 / 2 - 50, H2 - 8); g2.lineTo(W2 / 2 + 50, H2 - 8); g2.lineTo(W2 / 2 + 14, H2 * 0.5); g2.closePath(); g2.fill(); g2.globalAlpha = 1;
    g2.strokeStyle = "rgba(255,255,255,.5)"; g2.stroke();
    out(`<div class="lab-read"><div><small>Added</small><b>${s.added.toFixed(2)} cm³</b></div><div><small>pH</small><b>${p.toFixed(2)}</b></div><div><small>Equivalence at</small><b>${s.added >= Veq ? Veq.toFixed(2) + " cm³" : "?"}</b></div><div><small>pH at equivalence</small><b>${s.added >= Veq ? pHat(Veq).toFixed(2) : "?"}</b></div></div>
      <p class="lab-msg">Titrant: 0.10 mol/dm³ ${isBase() ? "HCl" : "NaOH"}. ${s.analyte === "HCl" ? "Strong acid–strong base: neutral (pH 7) at equivalence, with a long vertical section." : s.analyte === "CH3COOH" ? "Weak acid–strong base: alkaline at equivalence (ethanoate ions are basic). At half-neutralisation [HA] = [A⁻], so pH = pKa (4.74)." : "Weak base–strong acid: acidic at equivalence (NH₄⁺ is a weak acid)."} Choose an indicator whose range lies within the steep section.</p>`);
  }
  draw();
}
