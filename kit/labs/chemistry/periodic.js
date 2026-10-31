// The interactive periodic table: colour the elements by category, block, electronegativity, first
// ionisation energy, covalent radius, atomic weight or state at room temperature, and tap one for its data
// and electron configuration. A trend plot follows any property across a period or down a group.
// Data: kit/labs/chemistry/elements.js (IUPAC, NIST and Cordero et al., rounded).
import { shell, seg, panel, challenges, quiz, canvas, axes, line, circle, clear, text, esc, C } from "../lab.js";
import { ELEMENTS, bySym } from "./elements.js";

const CAT = { "alkali metal": "#ff6b6b", "alkaline earth metal": "#ffa94d", "transition metal": "#ffd43b", "post-transition metal": "#a9e34b", metalloid: "#38d9a9", "non-metal": "#4dabf7", halogen: "#9775fa", "noble gas": "#f783ac", lanthanide: "#e599f7", actinide: "#faa2c1" };
const BLOCK = { s: "#ff8787", p: "#74c0fc", d: "#ffd43b", f: "#b197fc" };
const PROPS = { en: ["Electronegativity", "Pauling", 0.7, 4], ie: ["First ionisation energy", "kJ/mol", 350, 2400], radius: ["Covalent radius", "pm", 25, 260], mass: ["Atomic weight", "", 1, 295] };
const ramp = (t) => `hsl(${(1 - t) * 240} 70% ${35 + t * 20}%)`;

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-pt" style="overflow-x:auto"></div><div class="lab-cols"><div class="lab-out"></div><div><div class="lab-trend"></div></div></div><div class="lab-q"></div>`);
  const out = panel($(".lab-out"));
  let mode = "category", sel = bySym.Na;
  const st = { seen: new Set(), F: false, Fr: false };
  const ch = challenges($(".lab-trend"), ctx, [
    { id: "modes", text: "Colour the table by four different properties", test: (x) => x.seen.size >= 4 },
    { id: "en", text: "Find the most electronegative element", test: (x) => x.F },
    { id: "rad", text: "Find the element with the largest covalent radius", test: (x) => x.Fr },
  ]);
  const cv = canvas($(".lab-trend"), { aspect: 0.6, max: 280 });
  quiz($(".lab-q"), ctx, [
    { id: "ie3", q: "First ionisation energy generally rises across period 3, but falls from Mg to Al. Why?", options: ["Al has more protons", "Al's outer electron is in a 3p orbital, higher in energy and more shielded than 3s", "Al is a metal", "Mg has a half-filled shell"], answer: 1, why: "The 3p electron in aluminium is higher in energy than magnesium's 3s electrons and is partly shielded by them, so it is easier to remove despite the extra proton." },
    { id: "ps", q: "Why is the first ionisation energy of sulfur lower than that of phosphorus?", options: ["Sulfur has fewer protons", "In sulfur one 3p orbital holds a pair of electrons, which repel each other", "Sulfur's electron is in a 3d orbital", "Phosphorus is smaller"], answer: 1, why: "Phosphorus has three unpaired 3p electrons. Sulfur's fourth 3p electron must pair up in an occupied orbital; the extra repulsion makes it easier to remove." },
    { id: "rad", q: "Why does covalent radius decrease across a period?", options: ["More shells are added", "Nuclear charge increases while shielding barely changes, so electrons are pulled closer", "Electrons repel more", "Atoms gain neutrons"], answer: 1, why: "Across a period electrons enter the same shell, so shielding stays roughly constant while the nuclear charge rises: the effective nuclear charge increases and the outer electrons are drawn in." },
  ]);
  seg($(".top"), [["category", "Category"], ["block", "Block"], ["en", "Electronegativity"], ["ie", "Ionisation energy"], ["radius", "Radius"], ["mass", "Atomic weight"], ["state", "State at 25 °C"]], mode, (v) => { mode = v; st.seen.add(v); ch.check(st); paint(); });
  function colour(e) {
    if (mode === "category") return CAT[e.category];
    if (mode === "block") return BLOCK[e.block];
    if (mode === "state") return e.synthetic && e.Z > 94 ? "#495057" : { gas: "#74c0fc", liquid: "#ff8787", solid: "#ced4da" }[e.state];
    const [, , lo, hi] = PROPS[mode], v = e[mode];
    return v == null ? "#2b2f36" : ramp(Math.max(0, Math.min(1, (v - lo) / (hi - lo))));
  }
  function paint() {
    const cell = (e) => { const r = e.f != null ? (e.period === 6 ? 9 : 10) : e.period, c = e.f != null ? 3 + e.f : e.group; return `<button type="button" class="pt-el ${sel === e ? "sel" : ""}" data-s="${e.sym}" style="grid-row:${r};grid-column:${c};background:${colour(e)}" title="${esc(e.name)}"><small>${e.Z}</small><b>${e.sym}</b></button>`; };
    $(".lab-pt").innerHTML = `<div class="pt-grid">${ELEMENTS.map(cell).join("")}<div class="pt-gap" style="grid-row:8;grid-column:1/19"></div></div>`;
    $.all(".pt-el").forEach((b) => b.addEventListener("click", () => { sel = bySym[b.dataset.s]; if (sel.sym === "F") st.F = true; if (sel.sym === "Fr") st.Fr = true; ch.check(st); paint(); }));
    const e = sel, v = (x, u = "") => (x == null ? "–" : `${x}${u}`);
    out(`<h4>${e.Z}. ${esc(e.name)} (${e.sym})</h4>
      <table><tr><td>Atomic weight</td><td class="num">${e.synthetic ? `[${e.mass}]` : e.mass}</td></tr><tr><td>Group · period · block</td><td class="num">${e.f != null ? "f-block" : e.group} · ${e.period} · ${e.block}</td></tr>
      <tr><td>Electron configuration</td><td class="num">${e.config.replace(/([spdf])(\d+)/g, "$1<sup>$2</sup>")}${e.predicted ? " (predicted)" : ""}</td></tr>
      <tr><td>Electronegativity</td><td class="num">${v(e.en)}</td></tr><tr><td>First ionisation energy</td><td class="num">${v(e.ie, " kJ/mol")}</td></tr><tr><td>Covalent radius</td><td class="num">${v(e.radius, " pm")}</td></tr>
      <tr><td>Down group ${e.f != null ? "–" : e.group} (${PROPS[PROPS[mode] ? mode : "ie"][0].toLowerCase()})</td><td class="num">${ELEMENTS.filter((x) => x.group === e.group && x.f == null && x[PROPS[mode] ? mode : "ie"] != null).map((x) => `${x.sym} ${x[PROPS[mode] ? mode : "ie"]}`).join(", ")}</td></tr>
      <tr><td>Category · state</td><td class="num">${e.category} · ${e.synthetic && e.Z > 94 ? "synthetic, made atoms at a time" : e.state}</td></tr></table>`);
    trend();
  }
  function trend() {
    const prop = PROPS[mode] ? mode : "ie", [name, unit] = PROPS[prop];
    const row = ELEMENTS.filter((x) => x.period === sel.period && x.f == null && x[prop] != null), col = ELEMENTS.filter((x) => x.group === sel.group && x.f == null && x[prop] != null);
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const [, , lo, hi] = PROPS[prop];
    const A = axes(g, { l: 46, t: 22, w: W - 60, h: H - 56 }, { x0: 0, x1: 17, y0: lo, y1: hi, xl: `group (period ${sel.period})`, yl: unit || name, xt: 17, xf: (x) => (x % 2 ? "" : (x + 1).toFixed(0)), yt: 3, yf: (x) => x.toFixed(prop === "en" ? 1 : 0) });
    line(g, row.map((x) => [A.X(x.group - 1), A.Y(x[prop])]), C.amber, 2); row.forEach((x) => { circle(g, A.X(x.group - 1), A.Y(x[prop]), x === sel ? 5 : 3, x === sel ? C.white : C.amber); text(g, x.sym, A.X(x.group - 1), A.Y(x[prop]) - 7, { align: "center", size: 10, color: C.mute }); });
    text(g, `${name}: period ${sel.period} (amber)`, 46, 14, { size: 11, color: C.amber });
  }
  paint();
}
