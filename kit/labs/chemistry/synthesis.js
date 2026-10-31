// Organic synthesis pathway builder: reach a target compound from a starting material in as few steps as
// possible, choosing standard reactions (reagents and conditions as in A-level and first-year courses). The
// state is the functional group and the number of carbons; reactions with cyanide add one carbon.
import { shell, panel, challenges, esc, C } from "../lab.js";

export const CLASSES = { alkane: "alkane", alkene: "alkene", halo: "halogenoalkane", alc1: "primary alcohol", alc2: "secondary alcohol", ald: "aldehyde", ket: "ketone", acid: "carboxylic acid", ester: "ester", nitrile: "nitrile", amine: "amine", acylcl: "acyl chloride", amide: "amide", hydroxynitrile: "hydroxynitrile", dihalide: "dihalogenoalkane", arene: "benzene", nitroarene: "nitrobenzene", arylamine: "phenylamine", arylketone: "aryl ketone" };
// [from, to, reagents and conditions, change in carbon count, type]
export const REACTIONS = [
  ["alkane", "halo", "Cl₂ or Br₂, UV light", 0, "free-radical substitution"],
  ["alkene", "alkane", "H₂, nickel catalyst, 150 °C", 0, "addition (hydrogenation)"],
  ["alkene", "halo", "HBr, room temperature", 0, "electrophilic addition"],
  ["alkene", "dihalide", "Br₂, room temperature", 0, "electrophilic addition"],
  ["alkene", "alc1", "steam, H₃PO₄ catalyst, 300 °C, 60 atm (ethene gives ethanol)", 0, "hydration"],
  ["halo", "alc1", "NaOH(aq), warm under reflux", 0, "nucleophilic substitution"],
  ["halo", "nitrile", "KCN in ethanol, reflux", 1, "nucleophilic substitution (adds a carbon)"],
  ["halo", "amine", "excess NH₃ in ethanol, heat in a sealed tube", 0, "nucleophilic substitution"],
  ["halo", "alkene", "KOH in ethanol, heat under reflux", 0, "elimination"],
  ["alc1", "ald", "K₂Cr₂O₇ / H₂SO₄, warm, distil off as it forms", 0, "oxidation"],
  ["alc1", "acid", "excess K₂Cr₂O₇ / H₂SO₄, heat under reflux", 0, "oxidation"],
  ["alc2", "ket", "K₂Cr₂O₇ / H₂SO₄, heat under reflux", 0, "oxidation"],
  ["alc1", "alkene", "excess conc. H₃PO₄ or H₂SO₄, heat", 0, "dehydration (elimination)"],
  ["alc1", "halo", "PCl₅, or NaBr with conc. H₂SO₄", 0, "substitution"],
  ["ald", "acid", "K₂Cr₂O₇ / H₂SO₄, heat under reflux", 0, "oxidation"],
  ["ald", "alc1", "NaBH₄ in water or methanol", 0, "reduction"],
  ["ket", "alc2", "NaBH₄ in water or methanol", 0, "reduction"],
  ["ald", "hydroxynitrile", "HCN with KCN catalyst", 1, "nucleophilic addition (adds a carbon)"],
  ["acid", "ester", "an alcohol, conc. H₂SO₄ catalyst, warm", 0, "esterification"],
  ["acid", "acylcl", "SOCl₂ (or PCl₅)", 0, "substitution"],
  ["acylcl", "amide", "NH₃ (or an amine)", 0, "nucleophilic addition–elimination"],
  ["acylcl", "ester", "an alcohol, room temperature", 0, "nucleophilic addition–elimination"],
  ["nitrile", "acid", "dilute HCl, heat under reflux", 0, "hydrolysis"],
  ["nitrile", "amine", "LiAlH₄ in dry ether (or H₂ with a nickel catalyst)", 0, "reduction"],
  ["ester", "acid", "dilute acid or NaOH(aq), heat under reflux", 0, "hydrolysis"],
  ["arene", "nitroarene", "conc. HNO₃ and conc. H₂SO₄, below 55 °C", 0, "electrophilic substitution"],
  ["nitroarene", "arylamine", "Sn and conc. HCl, reflux, then NaOH", 0, "reduction"],
  ["arene", "arylketone", "an acyl chloride with AlCl₃ catalyst", 0, "Friedel–Crafts acylation"],
];
export const TASKS = [
  { id: "eth-acid", from: ["alkene", 2], to: ["acid", 2], text: "Ethene → ethanoic acid", best: 2 },
  { id: "chain", from: ["halo", 2], to: ["acid", 3], text: "Bromoethane → propanoic acid (one more carbon)", best: 2 },
  { id: "amine", from: ["alc1", 2], to: ["amine", 2], text: "Ethanol → ethylamine", best: 2 },
  { id: "amine3", from: ["halo", 2], to: ["amine", 3], text: "Bromoethane → propylamine", best: 2 },
  { id: "aniline", from: ["arene", 6], to: ["arylamine", 6], text: "Benzene → phenylamine", best: 2 },
  { id: "ester", from: ["alkene", 2], to: ["ester", 2], text: "Ethene → an ethanoate ester", best: 3 },
];

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-info task"></div><div class="lab-cols"><div class="lab-path"></div><div class="lab-ctrl"></div></div>`);
  const ctrl = $(".lab-ctrl"), info = panel(ctrl);
  const solved = new Set(); const st = { solved };
  const ch = challenges(ctrl, ctx, [
    { id: "three", text: "Solve three synthesis problems", test: (x) => x.solved.size >= 3 },
    { id: "all", text: "Solve all six in the minimum number of steps", test: (x) => TASKS.every((t) => x.solved.has(`${t.id}*`)) },
  ]);
  let ti = 0, path = [];
  const cur = () => (path.length ? path.at(-1).state : TASKS[ti].from);
  function paint() {
    const T = TASKS[ti], [cls, n] = cur(), done = cls === T.to[0] && n === T.to[1];
    $(".task").innerHTML = `<div class="lab-chips">${TASKS.map((t, i) => `<button type="button" data-t="${i}" class="${i === ti ? "on" : solved.has(t.id) ? "ok" : ""}">${esc(t.text)}</button>`).join("")}</div>`;
    $.all("[data-t]").forEach((b) => b.addEventListener("click", () => { ti = Number(b.dataset.t); path = []; paint(); }));
    const opts = REACTIONS.filter((r) => r[0] === cls);
    $(".lab-path").innerHTML = `<div class="lab-info"><p><b>Start:</b> C${T.from[1]} ${CLASSES[T.from[0]]} &nbsp;→&nbsp; <b>Target:</b> C${T.to[1]} ${CLASSES[T.to[0]]}</p>
      <ol>${path.map((p) => `<li>${esc(p.r[2])} <small style="color:var(--mute)">(${esc(p.r[4])})</small> → <b>C${p.state[1]} ${CLASSES[p.state[0]]}</b></li>`).join("")}</ol>
      <p>Now: <b>C${n} ${CLASSES[cls]}</b>${done ? ` <b style="color:#40d4b1">✓ target reached in ${path.length} step${path.length === 1 ? "" : "s"}${path.length <= T.best ? " (the minimum)" : ` (it can be done in ${T.best})`}</b>` : ""}</p></div>
      ${done ? "" : `<p>Choose the next reaction:</p><div class="lab-chips" style="flex-direction:column;align-items:stretch">${opts.map((r, i) => `<button type="button" data-r="${i}" style="text-align:left">${esc(CLASSES[r[1]])} <small>· ${esc(r[2])}</small></button>`).join("") || "<p class='lab-msg'>No standard reaction from here: go back.</p>"}</div>`}`;
    $.all("[data-r]").forEach((b) => b.addEventListener("click", () => { const r = opts[Number(b.dataset.r)]; path.push({ r, state: [r[1], n + r[3]] }); const [c2, n2] = path.at(-1).state; if (c2 === T.to[0] && n2 === T.to[1]) { solved.add(T.id); if (path.length <= T.best) solved.add(`${T.id}*`); ch.check(st); } paint(); }));
    info(`<p>Each step changes the functional group. Reactions with cyanide (KCN, HCN) add one carbon to the chain, the only way here to lengthen it.</p><div class="lab-row"><button type="button" class="lab-btn back">Undo step</button><button type="button" class="lab-btn restart">Restart</button></div><p class="lab-msg">Reagents and conditions are the standard ones taught at A level; many alternatives exist in real synthesis.</p>`);
    $.root.querySelector(".back").onclick = () => { path.pop(); paint(); }; $.root.querySelector(".restart").onclick = () => { path = []; paint(); };
  }
  paint();
}
