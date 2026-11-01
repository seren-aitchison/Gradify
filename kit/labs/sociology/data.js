// The SocGradify data explorer: real World Bank indicators for 22 countries since 1990 (data/indicators.js, fetched by
// scripts/fetch-social-data.mjs). Trend mode charts one indicator over time for chosen countries; scatter mode plots two
// indicators against each other for the latest year each country has, with Pearson's r. Each topic (ctx.mode) opens on
// its own indicators. Every indicator carries a caveat about what it does and doesn't measure.
import { shell, canvas, seg, select, panel, challenges, clear, axes, line, circle, text, C } from "../lab.js";
import { COUNTRIES, DATA } from "./data/indicators.js";
import { dataLabel, caveat, esc } from "../social/ui.js";
import { pearson } from "../social/stats.js";

export const TOPICS = {
  inequality: { name: "Inequality and development", codes: ["SI.POV.GINI", "SI.POV.DDAY", "NY.GDP.PCAP.PP.KD", "SP.DYN.LE00.IN"], countries: ["GBR", "USA", "SWE", "BRA", "ZAF"] },
  gender: { name: "Gender", codes: ["SL.TLF.CACT.FE.ZS", "SL.TLF.CACT.MA.ZS", "SG.GEN.PARL.ZS", "SE.ENR.TERT.FM.ZS"], countries: ["GBR", "SWE", "JPN", "IND", "EGY"] },
  education: { name: "Education", codes: ["SE.TER.ENRR", "SE.PRM.CMPT.ZS", "SE.ENR.TERT.FM.ZS"], countries: ["GBR", "KOR", "BRA", "NGA", "ETH"] },
  crime: { name: "Crime", codes: ["VC.IHR.PSRC.P5"], countries: ["GBR", "USA", "MEX", "ZAF", "JPN"] },
  work: { name: "Work", codes: ["SL.UEM.TOTL.ZS", "SL.TLF.CACT.FE.ZS", "SL.TLF.CACT.MA.ZS"], countries: ["GBR", "DEU", "ZAF", "ESP", "USA"].filter((c) => COUNTRIES[c]) },
  climate: { name: "Climate and environment", codes: ["EN.GHG.CO2.PC.CE.AR5", "NY.GDP.PCAP.PP.KD"], countries: ["USA", "GBR", "CHN", "IND", "ETH"] },
  urban: { name: "Urbanisation", codes: ["SP.URB.TOTL.IN.ZS"], countries: ["GBR", "CHN", "IND", "NGA", "BRA"] },
};
export const CAVEATS = {
  "SI.POV.GINI": "Estimated from household surveys that measure income in some countries and consumption in others (consumption is usually more equal), and not every year has a survey, so compare levels cautiously.",
  "SI.POV.DDAY": "Share living on less than $3.00 a day at 2021 prices adjusted for purchasing power: an absolute, global line. Rich countries' own poverty measures are relative and much higher.",
  "NY.GDP.PCAP.PP.KD": "Average output per person, adjusted for price differences. An average says nothing about how income is distributed.",
  "SP.DYN.LE00.IN": "Period life expectancy: how long a baby would live if today's death rates applied all its life. A summary of current mortality, not a forecast.",
  "SL.UEM.TOTL.ZS": "ILO-modelled estimates. Unemployment counts only people looking for work; it misses discouraged workers and underemployment, and informal work is large in many countries.",
  "SL.TLF.CACT.FE.ZS": "ILO-modelled estimates of women 15+ in work or seeking it. Unpaid domestic and care work isn't counted, which is a feminist criticism of the measure itself.",
  "SL.TLF.CACT.MA.ZS": "ILO-modelled estimates of men 15+ in work or seeking it.",
  "SG.GEN.PARL.ZS": "Women's share of seats in the lower or single house. Representation in parliament isn't the same as power in government or society.",
  "SE.ENR.TERT.FM.ZS": "Gender parity index: female ÷ male gross tertiary enrolment. Above 1 means more women than men enrolled.",
  "SE.TER.ENRR": "Gross enrolment: total tertiary students ÷ the population of the five-year age group after secondary school, so it can exceed 100%. Measures access, not quality or completion.",
  "SE.PRM.CMPT.ZS": "Gross intake to the last grade of primary school; can exceed 100% because of late or repeat entrants.",
  "VC.IHR.PSRC.P5": "Intentional homicides per 100,000 people (from UNODC). Homicide is the most comparable crime statistic between countries because most killings are recorded; other crimes are under-reported and recorded differently, which is why surveys such as the Crime Survey for England and Wales exist.",
  "EN.GHG.CO2.PC.CE.AR5": "Territorial CO₂ emissions per person, excluding land use. Emissions embodied in imported goods are counted where they're produced, not where they're consumed.",
  "SP.URB.TOTL.IN.ZS": "Each country uses its own definition of “urban”, so international comparisons are approximate.",
};
const COL = ["#ec4899", "#5aa0ff", "#fbbf24", "#34d399", "#a78bfa", "#f97316"];
const fmtv = (v) => (Math.abs(v) >= 1000 ? Math.round(v).toLocaleString() : +v.toFixed(1));
// the latest value for a country within the window, as [year, value]
export function latest(code, c, from = 2013) { const s = DATA[code]?.values[c] || {}; const y = Object.keys(s).filter((k) => +k >= from).sort().at(-1); return y ? [+y, s[y]] : null; }

export function mount(el, ctx = {}) {
  const T = TOPICS[ctx.mode] || TOPICS.inequality;
  const $ = shell(el, `<div class="lab-row sx-mode"></div><div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-out"></div></div><div class="lab-ctrl"><div class="sx-pick"></div><div class="sx-btns sx-list" role="group" aria-label="Countries"></div></div></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.62, max: 400 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out")), btns = $(".sx-btns"), pick = $(".sx-pick");
  const src = dataLabel(ctrl, { real: true, source: "World Bank, World Development Indicators", url: "https://data.worldbank.org/", retrieved: DATA[T.codes[0]].retrieved });
  const s = { view: "trend", code: T.codes[0], x: T.codes.length > 1 ? T.codes[1] : "NY.GDP.PCAP.PP.KD", y: T.codes[0], sel: new Set(T.countries.filter((c) => COUNTRIES[c])) }, st = { views: new Set() };
  const ch = challenges(ctrl, ctx, [{ id: "three", text: "Compare at least three countries on one indicator", test: (x) => x.sel >= 3 }, { id: "scatter", text: "Plot two indicators against each other", test: (x) => x.views.has("scatter") }, { id: "caveat", text: "Read the caveat for every indicator in this topic", test: (x) => T.codes.every((c) => x.read?.has(c)) }]);
  st.read = new Set();
  seg($(".lab-row.sx-mode"), [["trend", "Trend over time"], ["scatter", "Two indicators"]], s.view, (v) => { s.view = v; controls(); run(); });
  const opts = Object.entries(DATA).map(([k, d]) => [k, d.short]);
  function controls() {
    pick.innerHTML = "";
    if (s.view === "trend") select(pick, { label: "Indicator", options: [...T.codes.map((k) => [k, DATA[k].short]), ...opts.filter(([k]) => !T.codes.includes(k))], value: s.code, onChange: (v) => { s.code = v; run(); } });
    else { select(pick, { label: "Horizontal (x)", options: opts, value: s.x, onChange: (v) => { s.x = v; run(); } }); select(pick, { label: "Vertical (y)", options: opts, value: s.y, onChange: (v) => { s.y = v; run(); } }); }
    btns.innerHTML = Object.entries(COUNTRIES).sort((a, b) => a[1].localeCompare(b[1])).map(([c, n]) => `<button type="button" data-c="${c}" aria-pressed="${s.sel.has(c)}">${esc(n)}</button>`).join("");
    btns.hidden = s.view !== "trend";
  }
  btns.addEventListener("click", (e) => { const b = e.target.closest("[data-c]"); if (!b) return; const c = b.dataset.c; if (s.sel.has(c)) s.sel.delete(c); else if (s.sel.size < 6) s.sel.add(c); b.setAttribute("aria-pressed", s.sel.has(c)); st.touched = true; run(); });
  function run() {
    st.views.add(s.view); st.sel = st.touched ? s.sel.size : 0; const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    if (s.view === "trend") {
      const D = DATA[s.code], series = [...s.sel].map((c) => [c, Object.entries(D.values[c] || {}).map(([y, v]) => [+y, v]).sort((a, b) => a[0] - b[0])]).filter(([, p]) => p.length);
      st.read.add(s.code); ch.check(st);
      const all = series.flatMap(([, p]) => p); if (!all.length) { out("<p>No data for these countries on this indicator.</p>"); return; }
      const y1 = Math.max(...all.map((p) => p[1])) * 1.1, y0 = Math.min(0, Math.min(...all.map((p) => p[1])));
      const A = axes(g, { l: 56, t: 12, w: W - 70, h: H - 48 }, { x0: 1990, x1: 2024, y0, y1, xl: "year", yl: D.short, xt: 6, yt: 4, xf: (v) => v.toFixed(0), yf: (v) => fmtv(v) });
      series.forEach(([c, p], i) => { line(g, p.map(([x, y]) => [A.X(x), A.Y(y)]), COL[i], 2); p.forEach(([x, y]) => circle(g, A.X(x), A.Y(y), 2.2, COL[i])); });
      out(`<p><b>${esc(D.name)}</b></p><ul class="sx-list" style="list-style:none;padding:0">${series.map(([c, p], i) => `<li style="color:${COL[i]}">● ${esc(COUNTRIES[c])}: ${fmtv(p.at(-1)[1])} (${p.at(-1)[0]})</li>`).join("")}</ul><p class="sx-fb"><b>Caveat:</b> ${esc(CAVEATS[s.code] || "")}</p>`);
      src.innerHTML = `<b>Real data</b> <a href="${esc(D.url)}" target="_blank" rel="noopener">${esc(D.source)}, ${esc(D.code)}</a>, retrieved ${esc(D.retrieved)}.`;
    } else {
      st.read.add(s.x); st.read.add(s.y); ch.check(st);
      const pts = Object.keys(COUNTRIES).map((c) => [c, latest(s.x, c), latest(s.y, c)]).filter(([, a, b]) => a && b);
      if (pts.length < 3) { out("<p>Too few countries have both indicators.</p>"); return; }
      const xs = pts.map((p) => p[1][1]), ys = pts.map((p) => p[2][1]), r = pearson(xs, ys);
      const A = axes(g, { l: 56, t: 12, w: W - 70, h: H - 48 }, { x0: Math.min(0, ...xs), x1: Math.max(...xs) * 1.08, y0: Math.min(0, ...ys), y1: Math.max(...ys) * 1.1, xl: DATA[s.x].short, yl: DATA[s.y].short, xt: 4, yt: 4, xf: (v) => fmtv(v), yf: (v) => fmtv(v) });
      pts.forEach(([c, a, b]) => { circle(g, A.X(a[1]), A.Y(b[1]), 4.5, C.pink); text(g, c, A.X(a[1]) + 6, A.Y(b[1]) + 4, { size: 10, color: C.mute }); });
      out(`<p><b>${pts.length} countries, latest year since 2013 for each: r = ${r.r.toFixed(2)}</b>${r.p < 0.05 ? " (p < .05)" : ` (p = ${r.p.toFixed(2)})`}.</p><p class="sx-fb">A correlation between countries is an <b>ecological</b> correlation: it doesn't show the same relationship holds between individuals (Robinson, 1950), and it can't show causation, since richer countries differ in many ways at once. 22 countries is also a small, non-random sample.</p><p class="sx-fb"><b>Caveats:</b> ${esc(CAVEATS[s.x] || "")} ${esc(CAVEATS[s.y] || "")}</p>`);
      src.innerHTML = `<b>Real data</b> <a href="https://data.worldbank.org/" target="_blank" rel="noopener">World Bank, World Development Indicators (${esc(s.x)}, ${esc(s.y)})</a>, retrieved ${esc(DATA[s.x].retrieved)}.`;
    }
  }
  caveat(ctrl, "Up to six countries at once. Gaps in a line are years with no published estimate.");
  controls(); run(); cv.onresize = run;
  return () => cv.stop();
}
