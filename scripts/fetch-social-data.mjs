// Fetches the real World Bank data used by the SocGradify data labs into kit/labs/sociology/data/.
// Run: node scripts/fetch-social-data.mjs kit/labs/sociology/data
// Fetch World Bank WDI indicators and write ES-module data files with provenance.
import { writeFile } from "node:fs/promises";
const OUT = process.argv[2];
const C = ["GBR","USA","SWE","DEU","JPN","BRA","ZAF","IND","NGA","CHN"];
const today = new Date().toISOString().slice(0,10);
async function wb(ind, countries = C, date = "1960:2024") {
  const url = `https://api.worldbank.org/v2/country/${countries.join(";")}/indicator/${ind}?format=json&date=${date}&per_page=20000`;
  const r = await fetch(url); const j = await r.json(); if (!Array.isArray(j) || !j[1]) throw new Error(ind + JSON.stringify(j).slice(0,200));
  const out = {}; for (const x of j[1]) { if (x.value == null) continue; (out[x.countryiso3code] ||= {})[x.date] = +x.value.toFixed(3); }
  return { out, name: j[1][0].indicator.value, updated: j[0].lastupdated };
}
const names = {}; 
{ const r = await (await fetch(`https://api.worldbank.org/v2/country/${C.join(";")}?format=json`)).json(); for (const c of r[1]) names[c.id] = c.name; }
const meta = (code, w) => ({ code, name: w.name, source: "World Bank, World Development Indicators", url: `https://data.worldbank.org/indicator/${code}`, sourceUpdated: w.updated, retrieved: today });
const ineq = {};
for (const code of ["SI.POV.GINI","SI.DST.FRST.20","SI.DST.02ND.20","SI.DST.03RD.20","SI.DST.04TH.20","SI.DST.05TH.20"]) { const w = await wb(code); ineq[code] = { ...meta(code, w), values: w.out }; }
const demo = {};
for (const code of ["SP.DYN.CBRT.IN","SP.DYN.CDRT.IN","SP.DYN.TFRT.IN","SP.DYN.LE00.IN","SP.URB.TOTL.IN.ZS","SP.POP.TOTL"]) { const w = await wb(code); demo[code] = { ...meta(code, w), values: w.out }; }
const bands = ["0004","0509","1014","1519","2024","2529","3034","3539","4044","4549","5054","5559","6064","6569","7074","7579","80UP"];
const pyr = { source: "World Bank, World Development Indicators (from UN World Population Prospects)", indicators: "SP.POP.<age>.MA.5Y and SP.POP.<age>.FE.5Y (% of male/female population)", url: "https://data.worldbank.org/indicator/SP.POP.0004.FE.5Y", retrieved: today, bands: bands.map(b => b === "80UP" ? "80+" : `${+b.slice(0,2)}–${+b.slice(2)}`), values: {} };
for (const sex of ["MA","FE"]) for (const b of bands) { const w = await wb(`SP.POP.${b}.${sex}.5Y`, C, "1960:2024"); for (const [c, yrs] of Object.entries(w.out)) for (const [y, v] of Object.entries(yrs)) { if (!["1960","1990","2023"].includes(y)) continue; ((pyr.values[c] ||= {})[y] ||= { MA: [], FE: [] })[sex][bands.indexOf(b)] = v; } }
const head = (what) => `// ${what}\n// Real data from the World Bank's World Development Indicators API, fetched ${today} by\n// scripts/fetch-social-data.mjs. Values are as published; missing years are absent. Cite as: World Bank, World Development Indicators.\n// Generated file: refetch rather than edit by hand.\n`;
await writeFile(`${OUT}/inequality.js`, head("Income inequality: Gini index and income shares by quintile") + `export const COUNTRIES = ${JSON.stringify(names)};\nexport const DATA = ${JSON.stringify(ineq)};\n`);
await writeFile(`${OUT}/demography.js`, head("Population: birth and death rates, fertility, life expectancy, urbanisation, total population") + `export const COUNTRIES = ${JSON.stringify(names)};\nexport const DATA = ${JSON.stringify(demo)};\n`);
await writeFile(`${OUT}/pyramids.js`, head("Population by five-year age band and sex, 1960, 1990 and 2023") + `export const COUNTRIES = ${JSON.stringify(names)};\nexport const PYRAMIDS = ${JSON.stringify(pyr)};\n`);
console.log("ok", Object.keys(ineq["SI.POV.GINI"].values), Object.keys(pyr.values));
