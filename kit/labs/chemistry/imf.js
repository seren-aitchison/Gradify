// Intermolecular forces compared through boiling points. Series of measured normal boiling points (at 1 atm,
// rounded, from standard data tables such as the CRC Handbook and the NIST Chemistry WebBook): alkanes, the
// noble gases, the hydrides of groups 14–17, primary alcohols and the isomers of pentane.
import { shell, seg, canvas, axes, line, circle, text, clear, panel, challenges, C } from "../lab.js";

export const SERIES = {
  alkanes: { name: "Straight-chain alkanes", x: "carbon atoms", pts: [["CH₄", 1, -161.5], ["C₂H₆", 2, -88.6], ["C₃H₈", 3, -42.1], ["C₄H₁₀", 4, -0.5], ["C₅H₁₂", 5, 36.1], ["C₆H₁₄", 6, 68.7], ["C₇H₁₆", 7, 98.4], ["C₈H₁₈", 8, 125.7]], note: "Only London dispersion forces. Longer molecules have more electrons and more surface contact, so stronger dispersion forces and higher boiling points." },
  noble: { name: "Noble gases", x: "period", pts: [["He", 1, -268.9], ["Ne", 2, -246.0], ["Ar", 3, -185.8], ["Kr", 4, -153.4], ["Xe", 5, -108.1], ["Rn", 6, -61.7]], note: "Single atoms held only by dispersion forces, which grow with the number of electrons (polarisability)." },
  hydrides: { name: "Hydrides of groups 14–17", x: "period", multi: [["Group 14", C.mute, [["CH₄", 2, -161.5], ["SiH₄", 3, -111.9], ["GeH₄", 4, -88.5], ["SnH₄", 5, -52]]], ["Group 15", C.blue, [["NH₃", 2, -33.3], ["PH₃", 3, -87.7], ["AsH₃", 4, -62.5], ["SbH₃", 5, -17]]], ["Group 16", C.red, [["H₂O", 2, 100], ["H₂S", 3, -60.3], ["H₂Se", 4, -41.3], ["H₂Te", 5, -2.2]]], ["Group 17", C.green, [["HF", 2, 19.5], ["HCl", 3, -85.1], ["HBr", 4, -66.8], ["HI", 5, -35.4]]]], note: "Down each group boiling points rise with dispersion forces, except for NH₃, H₂O and HF: N, O and F are small and very electronegative, so these molecules form hydrogen bonds." },
  alcohols: { name: "Alcohols and alkanes", x: "carbon atoms", multi: [["Primary alcohols", C.red, [["CH₃OH", 1, 64.7], ["C₂H₅OH", 2, 78.4], ["C₃H₇OH", 3, 97.2], ["C₄H₉OH", 4, 117.7]]], ["Alkanes", C.mute, [["CH₄", 1, -161.5], ["C₂H₆", 2, -88.6], ["C₃H₈", 3, -42.1], ["C₄H₁₀", 4, -0.5]]]], note: "The O–H group lets alcohols hydrogen-bond to each other, so they boil far higher than alkanes of similar size." },
  isomers: { name: "Isomers of C₅H₁₂", x: "branching", pts: [["pentane", 1, 36.1], ["2-methylbutane", 2, 27.8], ["2,2-dimethylpropane", 3, 9.5]], note: "Same formula, same number of electrons. Branched molecules are more compact, with less surface contact, so dispersion forces are weaker and boiling points lower." },
};

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.66, max: 400 }), ctrl = $(".lab-ctrl"), info = panel(ctrl);
  let key = "hydrides", hits = [];
  const st = { seen: new Set(), anomaly: new Set() };
  const ch = challenges(ctrl, ctx, [
    { id: "hb", text: "Tap the three hydrides whose boiling points are raised by hydrogen bonding", test: (x) => ["NH₃", "H₂O", "HF"].every((n) => x.anomaly.has(n)) },
    { id: "all", text: "Compare all five series", test: (x) => x.seen.size >= 5 },
  ]);
  seg($(".top"), Object.entries(SERIES).map(([k, v]) => [k, v.name]), key, (v) => { key = v; draw(); });
  function draw() {
    const S = SERIES[key]; st.seen.add(key); ch.check(st);
    const groups = S.multi || [[S.name, C.amber, S.pts]], all = groups.flatMap((g) => g[2]);
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const x0 = Math.min(...all.map((p) => p[1])) - 0.5, x1 = Math.max(...all.map((p) => p[1])) + 0.5, y0 = Math.floor(Math.min(...all.map((p) => p[2])) / 50) * 50 - 20, y1 = Math.ceil(Math.max(...all.map((p) => p[2])) / 50) * 50 + 20;
    const A = axes(g, { l: 52, t: 14, w: W - 66, h: H - 50 }, { x0, x1, y0, y1, xl: S.x, yl: "boiling point (°C)", xt: Math.round(x1 - x0), yt: 4, xf: (v) => (Math.abs(v - Math.round(v)) < 0.01 ? v.toFixed(0) : ""), yf: (v) => v.toFixed(0) });
    hits = [];
    for (const [nm, col, pts] of groups) { line(g, pts.map((p) => [A.X(p[1]), A.Y(p[2])]), col, 2); pts.forEach((p) => { const X = A.X(p[1]), Y = A.Y(p[2]); circle(g, X, Y, st.anomaly.has(p[0]) ? 7 : 5, col, "#000"); text(g, p[0], X + 7, Y - 7, { size: 11, color: C.text }); hits.push([X, Y, p]); }); if (S.multi) text(g, nm, A.X(pts.at(-1)[1]) + 6, A.Y(pts.at(-1)[2]) + 14, { size: 11, color: col }); }
    info(`<h4>${S.name}</h4><p>${S.note}</p><p class="lab-msg">Tap a point for its value. Boiling points rounded from standard data tables.</p>`);
  }
  cv.cv.addEventListener("click", (e) => {
    const [x, y] = cv.pos(e), h = hits.find(([X, Y]) => Math.hypot(X - x, Y - y) < 12); if (!h) return;
    const [, , p] = h; if (key === "hydrides" && ["NH₃", "H₂O", "HF"].includes(p[0])) st.anomaly.add(p[0]); ch.check(st);
    draw(); info(`<h4>${p[0]}: ${p[2]} °C</h4><p>${SERIES[key].note}</p>`);
  });
  draw();
}
