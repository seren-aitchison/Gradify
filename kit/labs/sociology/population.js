// Population lab (ctx.mode):
//   transition  real crude birth and death rates since 1960 for each country (World Bank), read against the stages of
//               the demographic transition model
//   pyramid     real population pyramids (share of each sex in each five-year age band) for 1960, 1990 and 2023
//   model       an illustrative demographic transition: set birth and death rates by stage and project the population
import { shell, canvas, seg, select, slider, panel, challenges, clear, axes, line, text, rrect, C } from "../lab.js";
import { COUNTRIES, DATA } from "./data/demography.js";
import { PYRAMIDS } from "./data/pyramids.js";
import { dataLabel, caveat, table, esc } from "../social/ui.js";

export function mount(el, ctx = {}) { return ({ transition, pyramid, model }[ctx.mode] || transition)(el, ctx); }
const names = Object.entries(COUNTRIES).sort((a, b) => a[1].localeCompare(b[1]));

function transition(el, ctx) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-out"></div></div><div class="lab-ctrl"></div></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.6, max: 380 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out")), s = { c: "GBR" }, seen = new Set();
  const B = DATA["SP.DYN.CBRT.IN"], D = DATA["SP.DYN.CDRT.IN"], F = DATA["SP.DYN.TFRT.IN"], LE = DATA["SP.DYN.LE00.IN"];
  dataLabel(ctrl, { real: true, source: "World Bank, World Development Indicators: crude birth rate (SP.DYN.CBRT.IN), crude death rate (SP.DYN.CDRT.IN), fertility and life expectancy", url: "https://data.worldbank.org/indicator/SP.DYN.CBRT.IN", retrieved: B.retrieved });
  const ch = challenges(ctrl, ctx, [{ id: "four", text: "Find a country in stage 4 (low births and deaths) and one still in stage 2 or 3", test: () => seen.has("JPN") || seen.has("DEU") ? ["NGA", "IND", "ZAF"].some((c) => seen.has(c)) : false }, { id: "five", text: "Find a country where deaths now exceed births (sometimes called stage 5)", test: () => seen.has("JPN") || seen.has("DEU") }]);
  select(ctrl, { label: "Country", options: names, value: s.c, onChange: (v) => { s.c = v; run(); } });
  caveat(ctrl, "The demographic transition model generalises from European history (Notestein, 1945). Countries move through it at different speeds and for different reasons, and the model has no built-in role for migration.");
  function run() {
    seen.add(s.c); ch.check({}); const b = Object.entries(B.values[s.c] || {}).map(([y, v]) => [+y, v]).sort((p, q) => p[0] - q[0]), d = Object.entries(D.values[s.c] || {}).map(([y, v]) => [+y, v]).sort((p, q) => p[0] - q[0]);
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const A = axes(g, { l: 46, t: 12, w: W - 60, h: H - 46 }, { x0: 1960, x1: 2024, y0: 0, y1: 55, xl: "year", yl: "per 1,000 people per year", xt: 8, yt: 5, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    g.save(); g.fillStyle = "rgba(236,72,153,.12)"; g.beginPath(); b.forEach(([x, y], i) => (i ? g.lineTo(A.X(x), A.Y(y)) : g.moveTo(A.X(x), A.Y(y)))); [...d].reverse().forEach(([x, y]) => g.lineTo(A.X(x), A.Y(y))); g.fill(); g.restore();
    line(g, b.map(([x, y]) => [A.X(x), A.Y(y)]), C.pink, 2.5); line(g, d.map(([x, y]) => [A.X(x), A.Y(y)]), C.blue, 2.5);
    text(g, "— births", W - 150, 26, { color: C.pink, size: 12 }); text(g, "— deaths", W - 80, 26, { color: C.blue, size: 12 }); text(g, "shaded gap = natural increase", 54, 26, { color: C.mute, size: 11 });
    const yb = b.at(-1), yd = d.at(-1), b0 = b[0], d0 = d[0], f = F.values[s.c] || {}, le = LE.values[s.c] || {}, last = (o) => { const k = Object.keys(o).sort().at(-1); return k ? [k, o[k]] : ["–", NaN]; };
    const stage = yd && yb ? (yb[1] < yd[1] ? "deaths exceed births: natural decrease" : yb[1] - yd[1] < 5 && yb[1] < 15 ? "low births and deaths: stage 4" : yd[1] < 12 && yb[1] > 20 ? "falling births, low deaths: stage 3" : "high births, falling deaths: stage 2–3") : "–";
    out(`${table(["", `${b0?.[0] ?? ""}`, `${yb?.[0] ?? ""}`], [["Births per 1,000", b0?.[1]?.toFixed(1), yb?.[1]?.toFixed(1)], ["Deaths per 1,000", d0?.[1]?.toFixed(1), yd?.[1]?.toFixed(1)], ["Natural increase (% a year)", ((b0?.[1] - d0?.[1]) / 10).toFixed(2), ((yb?.[1] - yd?.[1]) / 10).toFixed(2)], ["Total fertility rate", f[b0?.[0]]?.toFixed(2) ?? "–", `${last(f)[1]?.toFixed?.(2)} (${last(f)[0]})`], ["Life expectancy", le[b0?.[0]]?.toFixed(1) ?? "–", `${last(le)[1]?.toFixed?.(1)} (${last(le)[0]})`]])}
      <p><b>${esc(COUNTRIES[s.c])}: ${stage}.</b> Crude rates depend on age structure as well as behaviour: an old population has a high crude death rate even when health is good, which is why demographers also use fertility rates and life expectancy.</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}

function pyramid(el, ctx) {
  const $ = shell(el, `<div class="lab-row sx-mode"></div><div class="lab-cols"><div><div class="lab-stage"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.8, max: 460 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out")), s = { c: "JPN", y: "2023" }, seen = new Set();
  dataLabel(ctrl, { real: true, source: PYRAMIDS.source, url: PYRAMIDS.url, retrieved: PYRAMIDS.retrieved });
  const ch = challenges(ctrl, ctx, [{ id: "wide", text: "Find a wide-based (expansive) pyramid", test: () => ["NGA:2023", "NGA:1990", "IND:1960", "BRA:1960", "NGA:1960"].some((k) => seen.has(k)) }, { id: "aged", text: "See Japan change from 1960 to 2023", test: () => seen.has("JPN:1960") && seen.has("JPN:2023") }]);
  seg($(".lab-row.sx-mode"), ["1960", "1990", "2023"], s.y, (v) => { s.y = v; run(); });
  select(ctrl, { label: "Country", options: names, value: s.c, onChange: (v) => { s.c = v; run(); } });
  function run() {
    seen.add(`${s.c}:${s.y}`); ch.check({}); const P = PYRAMIDS.values[s.c]?.[s.y], g = cv.g, W = cv.W, H = cv.H; clear(g, W, H); if (!P) { out("<p>No data for this year.</p>"); return; }
    const n = PYRAMIDS.bands.length, bh = (H - 40) / n, mid = W / 2, sc = (W / 2 - 50) / 14;
    PYRAMIDS.bands.forEach((band, i) => { const y = H - 30 - (i + 1) * bh; rrect(g, mid - 18 - P.MA[i] * sc, y + 1, P.MA[i] * sc, bh - 2, 2, "#5aa0ff"); rrect(g, mid + 18, y + 1, P.FE[i] * sc, bh - 2, 2, "#ec4899"); text(g, band, mid, y + bh / 2 + 4, { align: "center", size: 9, color: C.mute }); });
    text(g, "Males", mid - 60, 14, { align: "right", color: "#5aa0ff", size: 12 }); text(g, "Females", mid + 60, 14, { color: "#ec4899", size: 12 }); text(g, "% of each sex in each age band", mid, H - 8, { align: "center", size: 10, color: C.mute });
    const sum = (a, k0, k1) => a.slice(k0, k1).reduce((x, v) => x + v, 0), young = (sum(P.MA, 0, 3) + sum(P.FE, 0, 3)) / 2, old = (sum(P.MA, 13, 17) + sum(P.FE, 13, 17)) / 2;
    out(`<p><b>${esc(COUNTRIES[s.c])}, ${s.y}:</b> about ${young.toFixed(0)}% aged under 15 and ${old.toFixed(0)}% aged 65 and over (averaging the male and female shares). ${young > 35 ? "A wide base: high fertility and a young, fast-growing population (an expansive pyramid)." : old > 18 ? "A narrow base and a wide top: low fertility and long lives (a constrictive pyramid), with more older people per person of working age." : "A transitional shape: fertility has fallen, and a large working-age population is ageing into the top."}</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}

// an illustrative demographic transition: birth and death rates per 1,000 by stage, projected over 200 years
export const STAGES = [["Stage 1", 38, 35], ["Stage 2", 38, 18], ["Stage 3", 24, 10], ["Stage 4", 12, 9], ["Stage 5", 9, 11]];
export function project(stageYears = [40, 40, 40, 40, 40], start = 1) { let P = start; const out = []; let t = 0; STAGES.forEach(([, b, d], k) => { for (let i = 0; i < stageYears[k]; i++, t++) { P *= 1 + (b - d) / 1000; out.push({ t, P, b, d, k }); } }); return out; }
function model(el, ctx) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-out"></div></div><div class="lab-ctrl"></div></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.6, max: 360 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out")), yrs = [40, 40, 40, 40, 40], st = {};
  dataLabel(ctrl, { real: false, how: "Rates chosen to illustrate each stage of the model, not data for any country." });
  const ch = challenges(ctrl, ctx, [{ id: "boom", text: "Lengthen stage 2 and see how much faster the population grows", test: (x) => x.y2 >= 80 }, { id: "decline", text: "Lengthen stage 5 until the population is shrinking clearly", test: (x) => x.y5 >= 80 }]);
  STAGES.forEach(([n, b, d], k) => slider(ctrl, { label: `${n} (births ${b}, deaths ${d})`, min: 0, max: 100, step: 5, value: 40, unit: "years", fmt: (v) => v, onInput: (v) => { yrs[k] = v; run(); } }));
  function run() {
    st.y2 = yrs[1]; st.y5 = yrs[4]; ch.check(st); const R = project(yrs), g = cv.g, W = cv.W, H = cv.H; clear(g, W, H); const T = R.length || 1, Pm = Math.max(...R.map((p) => p.P), 1);
    const A = axes(g, { l: 46, t: 12, w: W - 60, h: H - 46 }, { x0: 0, x1: T, y0: 0, y1: 45, xl: "years", yl: "per 1,000", xt: 5, yt: 3, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    line(g, R.map((p) => [A.X(p.t), A.Y(p.b)]), C.pink, 2); line(g, R.map((p) => [A.X(p.t), A.Y(p.d)]), C.blue, 2); line(g, R.map((p) => [A.X(p.t), A.Y((p.P / Pm) * 45)]), C.gold, 2.5, [6, 3]);
    text(g, "— births  — deaths  - - population (relative)", 54, 26, { size: 11, color: C.mute });
    out(`<p>Over ${T} years the population multiplies by <b>${R.at(-1)?.P.toFixed(1) ?? 1}</b>. Growth comes almost entirely from the gap between births and deaths in stages 2 and 3, when death rates have fallen (better food, sanitation and medicine) but birth rates haven't yet followed (as children survive, education spreads and women gain more control over fertility).</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}
