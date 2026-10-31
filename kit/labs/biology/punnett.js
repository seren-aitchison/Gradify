// Mendelian genetics and Punnett squares: monohybrid, dihybrid (independent assortment), incomplete
// dominance, codominance (ABO blood groups) and X-linked crosses. Draws the square, gives the expected
// ratios, then breeds random offspring and runs a chi-squared test against the expectation.
// Simplified: genes are unlinked (dihybrid) and every genotype is equally viable.
import { shell, panel, challenges, seg, select, button, slider, chiSquareP, esc } from "../lab.js";

const MODES = {
  mono: { name: "Monohybrid", genos: ["AA", "Aa", "aa"], parents: ["Aa", "Aa"], pheno: (g) => (g.includes("A") ? "Dominant (A_)" : "Recessive (aa)") },
  di: { name: "Dihybrid", genos: ["AABB", "AABb", "AaBB", "AaBb", "AAbb", "Aabb", "aaBB", "aaBb", "aabb"], parents: ["AaBb", "AaBb"], pheno: (g) => `${g.includes("A") ? "A_" : "aa"} ${g.includes("B") ? "B_" : "bb"}` },
  inc: { name: "Incomplete dominance", genos: ["RR", "RW", "WW"], parents: ["RW", "RW"], pheno: (g) => ({ RR: "Red", RW: "Pink", WR: "Pink", WW: "White" })[g], note: "Snapdragon flower colour: the heterozygote has an intermediate phenotype." },
  co: { name: "Codominance (ABO)", genos: ["IAIA", "IAIB", "IAi", "IBIB", "IBi", "ii"], parents: ["IAi", "IBi"], pheno: (g) => { const a = g.includes("IA"), b = g.includes("IB"); return a && b ? "Group AB" : a ? "Group A" : b ? "Group B" : "Group O"; }, note: "IA and IB are codominant (both expressed); i is recessive to both." },
  x: { name: "X-linked", genos: ["XRXR", "XRXr", "XrXr", "XRY", "XrY"], parents: ["XRXr", "XRY"], pheno: (g) => { const male = g.includes("Y"), aff = male ? g.includes("Xr") : g === "XrXr"; return `${male ? "Male" : "Female"}, ${aff ? "affected" : g.includes("Xr") ? "carrier" : "unaffected"}`; }, note: "Red-green colour blindness pattern: males have one X, so one recessive allele is enough." },
};
function gametes(mode, g) {
  if (mode === "di") { const A = [g[0], g[1]], B = [g[2], g[3]]; return A.flatMap((a) => B.map((b) => a + b)); }
  if (mode === "co") return g.match(/IA|IB|i/g);
  if (mode === "x") return g.match(/XR|Xr|Y/g);
  return [g[0], g[1]];
}
function combine(mode, a, b) {
  const order = (x, y, dom) => (dom(x) >= dom(y) ? x + y : y + x);
  if (mode === "di") return order(a[0], b[0], (c) => (c === c.toUpperCase() ? 1 : 0)) + order(a[1], b[1], (c) => (c === c.toUpperCase() ? 1 : 0));
  if (mode === "co") return order(a, b, (c) => ({ IA: 2, IB: 1, i: 0 })[c]);
  if (mode === "x") { if (a === "Y") return b + a; if (b === "Y") return a + b; return order(a, b, (c) => (c === "XR" ? 1 : 0)); }
  if (mode === "inc") return order(a, b, (c) => (c === "R" ? 1 : 0));
  return order(a, b, (c) => (c === c.toUpperCase() ? 1 : 0));
}
const fmtG = (g) => esc(g).replace(/I(A|B)/g, "I<sup>$1</sup>").replace(/X(R|r)/g, "X<sup>$1</sup>");

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-row parents"></div><div class="lab-cols"><div class="lab-square"></div><div class="lab-ctrl"><div class="lab-exp"></div></div></div><div class="lab-row sim"></div><div class="lab-sim"></div>`);
  let mode = "mono", p1, p2, n = 200;
  const exp = panel($(".lab-exp")), simOut = panel($(".lab-sim"));
  const st = { ratio9331: false, chiOK: false, test1to1: false, sexlinked: false };
  const ch = challenges($(".lab-ctrl"), ctx, [
    { id: "9331", text: "Set up a cross that gives a 9 : 3 : 3 : 1 phenotype ratio", test: (s) => s.ratio9331 },
    { id: "test", text: "Find a test cross that gives a 1 : 1 ratio", test: (s) => s.test1to1 },
    { id: "chi", text: "Breed 500 or more offspring and get p > 0.05 in the chi-squared test", test: (s) => s.chiOK },
    { id: "x", text: "Show that a carrier mother passes an X-linked condition to half her sons", test: (s) => s.sexlinked },
  ]);
  const parents = $(".parents"); let s1, s2;
  function setMode(m) {
    mode = m; [p1, p2] = MODES[m].parents; parents.innerHTML = "";
    const genos = MODES[m].genos;
    const fem = m === "x" ? genos.filter((g) => !g.includes("Y")) : genos, mal = m === "x" ? genos.filter((g) => g.includes("Y")) : genos;
    s1 = select(parents, { label: m === "x" ? "Mother" : "Parent 1", options: fem.map((g) => [g, g.replace(/I(A|B)/g, "I$1 ")]), value: p1, onChange: (v) => { p1 = v; draw(); } });
    s2 = select(parents, { label: m === "x" ? "Father" : "Parent 2", options: mal.map((g) => [g, g.replace(/I(A|B)/g, "I$1 ")]), value: p2, onChange: (v) => { p2 = v; draw(); } });
    draw();
  }
  function expected() {
    const g1 = gametes(mode, p1), g2 = gametes(mode, p2), cells = [];
    for (const a of g1) for (const b of g2) cells.push(combine(mode, a, b));
    const ph = {}; for (const c of cells) { const k = MODES[mode].pheno(c); ph[k] = (ph[k] || 0) + 1 / cells.length; }
    const ge = {}; for (const c of cells) ge[c] = (ge[c] || 0) + 1 / cells.length;
    return { g1, g2, cells, ph, ge };
  }
  const ratio = (fr) => { const v = Object.values(fr), m = Math.min(...v); return v.map((x) => +(x / m).toFixed(2)).join(" : "); };
  function draw() {
    const E = expected();
    $(".lab-square").innerHTML = `<div class="lab-grid" style="grid-template-columns:repeat(${E.g2.length + 1}, minmax(44px, 1fr));max-width:${(E.g2.length + 1) * 84}px">
      <div></div>${E.g2.map((x) => `<div class="pq-h">${fmtG(x)}</div>`).join("")}
      ${E.g1.map((a, i) => `<div class="pq-h">${fmtG(a)}</div>${E.g2.map((b, j) => { const c = E.cells[i * E.g2.length + j], ph = MODES[mode].pheno(c); return `<div class="pq-c" title="${esc(ph)}" style="background:hsl(${[...ph].reduce((s, ch) => s + ch.charCodeAt(0), 0) * 37 % 360} 55% 30% / .55)">${fmtG(c)}</div>`; }).join("")}`).join("")}</div>`;
    exp(`<h4>${esc(MODES[mode].name)}: ${fmtG(p1)} × ${fmtG(p2)}</h4>
      <table><tr><th>Phenotype</th><th class="num">Expected</th></tr>${Object.entries(E.ph).map(([k, v]) => `<tr><td>${esc(k)}</td><td class="num">${(v * 100).toFixed(1)}%</td></tr>`).join("")}</table>
      <p>Phenotype ratio <b>${ratio(E.ph)}</b>; genotype ratio ${Object.keys(E.ge).map(fmtG).join(" : ")} = ${ratio(E.ge)}</p>${MODES[mode].note ? `<p class="lab-msg">${esc(MODES[mode].note)}</p>` : ""}`);
    const v = Object.values(E.ph).sort((a, b) => b - a);
    if (mode === "di" && v.length === 4 && Math.abs(v[0] - 9 / 16) < 1e-9 && Math.abs(v[3] - 1 / 16) < 1e-9) st.ratio9331 = true;
    if (v.length === 2 && Math.abs(v[0] - 0.5) < 1e-9 && ["mono", "di"].includes(mode) && [p1, p2].some((p) => p === p.toLowerCase())) st.test1to1 = true;
    if (mode === "x" && p1 === "XRXr") st.sexlinked = true;
    ch.check(st); simOut("<p class=\"lab-msg\">Breed offspring to compare chance with the expected ratio.</p>");
  }
  function breed() {
    const E = expected(), obs = {}; for (const k of Object.keys(E.ph)) obs[k] = 0;
    const g1 = E.g1, g2 = E.g2;
    for (let i = 0; i < n; i++) { const c = combine(mode, g1[Math.floor(Math.random() * g1.length)], g2[Math.floor(Math.random() * g2.length)]); obs[MODES[mode].pheno(c)]++; }
    const keys = Object.keys(E.ph), x2 = keys.reduce((a, k) => a + (obs[k] - E.ph[k] * n) ** 2 / (E.ph[k] * n), 0), df = keys.length - 1, p = df > 0 ? chiSquareP(x2, df) : 1;
    if (n >= 500 && df > 0 && p > 0.05) st.chiOK = true; ch.check(st);
    simOut(`<table><tr><th>Phenotype</th><th class="num">Observed</th><th class="num">Expected</th><th class="num">(O−E)²/E</th></tr>${keys.map((k) => { const e = E.ph[k] * n; return `<tr><td>${esc(k)}</td><td class="num">${obs[k]}</td><td class="num">${e.toFixed(1)}</td><td class="num">${((obs[k] - e) ** 2 / e).toFixed(3)}</td></tr>`; }).join("")}</table>
      <p>χ² = <b>${x2.toFixed(3)}</b>, degrees of freedom = ${df}, p = <b>${df ? p.toFixed(3) : "–"}</b>. ${df ? (p > 0.05 ? "The difference from the expected ratio is not significant at the 5% level: it is consistent with chance." : "Significant at the 5% level. With random breeding this happens about 1 time in 20 even when the model is right; breed again and see.") : "Only one phenotype is possible, so there is nothing to test."}</p>`);
  }
  seg($(".top"), Object.entries(MODES).map(([k, v]) => [k, v.name]), mode, setMode);
  slider($(".sim"), { label: "Offspring", min: 20, max: 2000, step: 20, value: n, fmt: (v) => v, onInput: (v) => { n = v; } });
  button($(".sim"), "Breed", breed, "pri");
  setMode("mono");
}
