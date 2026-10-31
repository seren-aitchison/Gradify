// Food webs: a woodland food web you can disturb. Remove a species and any consumer left with nothing to eat
// is lost too (a secondary extinction), and so on up the web. Trophic levels are computed from the web
// (1 + the average level of a species' food), and an energy pyramid follows the transfer efficiency you set.
// Simplified: a "topological" model. Real webs also respond through population sizes, prey switching and
// indirect effects, so removing a species can harm or help others in ways this doesn't show.
import { shell, panel, challenges, slider, button, esc, C } from "../lab.js";

export const SPECIES = {
  oak: { name: "Oak trees", x: 120, y: 360, food: [] }, grass: { name: "Grasses", x: 300, y: 370, food: [] }, flowers: { name: "Wild flowers", x: 470, y: 365, food: [] },
  caterpillar: { name: "Caterpillars", x: 70, y: 270, food: ["oak"] }, aphid: { name: "Aphids", x: 200, y: 280, food: ["oak", "flowers"] }, rabbit: { name: "Rabbits", x: 330, y: 270, food: ["grass", "flowers"] },
  vole: { name: "Field voles", x: 450, y: 280, food: ["grass"] }, bee: { name: "Bees", x: 560, y: 275, food: ["flowers"] }, deer: { name: "Deer", x: 240, y: 195, food: ["oak", "grass"] },
  ladybird: { name: "Ladybirds", x: 150, y: 190, food: ["aphid"] }, bluetit: { name: "Blue tits", x: 60, y: 160, food: ["caterpillar", "aphid"] }, shrew: { name: "Shrews", x: 520, y: 190, food: ["caterpillar", "bee", "aphid"] },
  fox: { name: "Foxes", x: 360, y: 120, food: ["rabbit", "vole", "deer"] }, owl: { name: "Tawny owls", x: 480, y: 100, food: ["vole", "shrew", "bluetit"] }, sparrowhawk: { name: "Sparrowhawks", x: 160, y: 90, food: ["bluetit", "ladybird"] },
};
export function cascade(removed) {
  const gone = new Set(removed); let changed = true;
  while (changed) { changed = false; for (const [k, s] of Object.entries(SPECIES)) if (!gone.has(k) && s.food.length && s.food.every((f) => gone.has(f))) { gone.add(k); changed = true; } }
  return gone;
}
export function trophic(alive) {
  const lv = {}; const L = (k, seen = new Set()) => { if (lv[k]) return lv[k]; const f = SPECIES[k].food.filter((x) => alive.has(x) && !seen.has(x)); seen.add(k); lv[k] = f.length ? 1 + f.reduce((a, x) => a + L(x, seen), 0) / f.length : 1; return lv[k]; };
  for (const k of alive) L(k); return lv;
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-row tools"></div><div class="lab-out"></div>`);
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out")), info = panel(ctrl);
  let removed = [], eff = 10;
  const st = { secondary: false, bigCascade: false, pyramid: false };
  const ch = challenges(ctrl, ctx, [
    { id: "sec", text: "Remove one species and cause a secondary extinction", test: (x) => x.secondary },
    { id: "big", text: "Find the single removal that causes the most species to be lost", test: (x) => x.bigCascade },
    { id: "pyr", text: "Change the transfer efficiency and see how much energy reaches the top predators", test: (x) => x.pyramid },
  ]);
  const worst = Math.max(...Object.keys(SPECIES).map((k) => cascade([k]).size));
  slider($(".tools"), { label: "Energy transfer efficiency", min: 1, max: 25, step: 1, value: eff, unit: "%", fmt: (v) => v, onInput: (v) => { eff = v; if (v !== 10) st.pyramid = true; ch.check(st); draw(); } });
  button($(".tools"), "Restore every species", () => { removed = []; draw(); });
  function draw() {
    const gone = cascade(removed), alive = new Set(Object.keys(SPECIES).filter((k) => !gone.has(k))), lv = trophic(alive);
    const arrows = Object.entries(SPECIES).flatMap(([k, s]) => s.food.map((f) => { const a = SPECIES[f], dead = gone.has(k) || gone.has(f); return `<line x1="${a.x}" y1="${a.y - 14}" x2="${s.x}" y2="${s.y + 16}" stroke="${dead ? "#343a40" : "#69db7c"}" stroke-width="${dead ? 1 : 1.6}" marker-end="url(#ah${dead ? "d" : ""})" opacity="${dead ? 0.5 : 0.85}"/>`; })).join("");
    const nodes = Object.entries(SPECIES).map(([k, s]) => { const d = gone.has(k), lost = d && !removed.includes(k), prod = !s.food.length; return `<g class="hot" data-k="${k}" tabindex="0" role="button" aria-label="${esc(s.name)}${d ? " (gone)" : ""}"><rect x="${s.x - 50}" y="${s.y - 14}" width="100" height="28" rx="14" fill="${d ? (lost ? "#5c1d24" : "#2b2b2b") : prod ? "#2b8a3e" : "#1c3a5e"}" stroke="${d ? (lost ? "#ff6b6b" : "#666") : "#adb5bd"}"/><text x="${s.x}" y="${s.y + 4}" text-anchor="middle" font-size="12" fill="${d ? "#999" : "#fff"}" ${d ? 'text-decoration="line-through"' : ""}>${esc(s.name)}</text></g>`; }).join("");
    $(".lab-stage").innerHTML = `<svg class="lab-svg" viewBox="0 0 640 400" role="img" aria-label="Woodland food web"><defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#69db7c"/></marker><marker id="ahd" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#343a40"/></marker></defs><text x="10" y="20" font-size="11" fill="#9aa0a6">Arrows point from food to feeder: the direction energy flows. Tap a species to remove it.</text>${arrows}${nodes}</svg>`;
    $.all("[data-k]").forEach((g) => g.addEventListener("click", () => { const k = g.dataset.k; if (removed.includes(k)) removed = removed.filter((x) => x !== k); else { removed = [k]; const lost = cascade([k]).size - 1; if (lost >= 1) st.secondary = true; if (lost + 1 === worst) st.bigCascade = true; ch.check(st); } draw(); }));
    const lost = [...gone].filter((k) => !removed.includes(k));
    info(removed.length ? `<h4>Removed: ${removed.map((k) => esc(SPECIES[k].name)).join(", ")}</h4><p>${lost.length ? `Secondary extinctions: <b>${lost.map((k) => esc(SPECIES[k].name)).join(", ")}</b>, which had no other food.` : "No other species is left without food: every consumer of it has another food source. Populations would still change in reality."}</p>` : `<p>Producers (green) make their own food by photosynthesis. Each consumer's trophic level is 1 + the average level of what it eats, so omnivores have fractional levels.</p>`);
    // energy pyramid by rounded trophic level
    const byLevel = {}; for (const k of alive) { const L = Math.round(lv[k]); (byLevel[L] ||= []).push(k); }
    const E1 = 20000; // kJ per m² per year reaching primary consumers' food (illustrative)
    const rows = Object.keys(byLevel).sort((a, b) => a - b).map((L) => ({ L: Number(L), e: E1 * (eff / 100) ** (L - 1), names: byLevel[L] }));
    out(`<h4>Energy pyramid (${eff}% of energy passed up each level)</h4>${rows.map((r) => `<div style="display:flex;align-items:center;gap:10px;margin:3px 0"><span style="width:110px;font-size:12.5px;color:var(--mute)">Level ${r.L}</span><div style="flex:1"><div style="height:20px;width:${Math.max(0.5, (Math.log10(r.e + 1) / Math.log10(E1 + 1)) * 100)}%;background:${["", C.green, C.lime, C.gold, C.orange][Math.min(4, r.L)]};border-radius:5px"></div></div><b style="font-family:var(--mono);font-size:12.5px;white-space:nowrap;width:150px;text-align:right">${r.e < 10 ? r.e.toFixed(2) : Math.round(r.e).toLocaleString()} kJ m⁻² yr⁻¹</b></div>`).join("")}
      <p class="lab-msg">Bar lengths use a log scale. Only about 10% (typically 5–20%) of the energy at one level becomes biomass at the next: the rest is lost in respiration, as heat, and in material that isn't eaten or digested. That is why food chains rarely have more than four or five levels. Starting energy is illustrative.</p>`);
  }
  draw();
}
