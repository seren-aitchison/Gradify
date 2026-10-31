// 3D molecular model viewer (ctx.mode "viewer") and organic functional group explorer (ctx.mode "groups").
// Choose a molecule from the library or type a SMILES string; models are built in the browser by the
// simple force field in mol.js, so geometries are approximate (good shapes and stereochemistry, not
// accurate bond lengths). Functional groups are found by substructure rules on the molecular graph.
import { shell, seg, select, button, panel, challenges, esc, C } from "../lab.js";
import { stage3d } from "../three.js";
import { molecule, formula } from "./mol.js";
import { drawMolecule, frame } from "./molview.js";

export const LIBRARY = [
  ["Water", "O"], ["Ammonia", "N"], ["Methane", "C"], ["Carbon dioxide", "O=C=O"], ["Ethene", "C=C"], ["Ethyne", "C#C"], ["Ethanol", "CCO"],
  ["Ethanoic acid", "CC(=O)O"], ["Propanone", "CC(=O)C"], ["Ethanal", "CC=O"], ["Ethyl ethanoate", "CCOC(=O)C"], ["Ethanamide", "CC(=O)N"], ["Methylamine", "CN"], ["Benzene", "c1ccccc1"],
  ["Phenol", "Oc1ccccc1"], ["Glucose (open chain)", "OC[C@@H](O)[C@@H](O)[C@H](O)[C@@H](O)C=O"], ["Aspirin", "CC(=O)Oc1ccccc1C(=O)O"], ["Paracetamol", "CC(=O)Nc1ccc(O)cc1"], ["Ibuprofen", "CC(C)Cc1ccc(cc1)C(C)C(=O)O"], ["Caffeine", "Cn1cnc2c1c(=O)n(C)c(=O)n2C"],
  ["L-Alanine", "C[C@@H](C(=O)O)N"], ["Cyclohexane", "C1CCCCC1"], ["Chloromethane", "CCl"], ["Ethanenitrile", "CC#N"], ["Nitrobenzene", "O=[N+]([O-])c1ccccc1"],
];
// functional group rules on the molecular graph: [name, test(m, i) → atom indices or null]
const nbs = (m, i) => m.atoms[i].nb, el = (m, i) => m.atoms[i].el, bo = (m, a, b) => m.bonds.find((x) => (x.a === a && x.b === b) || (x.b === a && x.a === b))?.order;
const hs = (m, i) => nbs(m, i).filter((x) => el(m, x) === "H");
export const GROUPS = [
  ["Carboxylic acid", (m, i) => { if (el(m, i) !== "C") return null; const o2 = nbs(m, i).find((x) => el(m, x) === "O" && bo(m, i, x) === 2), oh = nbs(m, i).find((x) => el(m, x) === "O" && bo(m, i, x) === 1 && hs(m, x).length); return o2 != null && oh != null ? [i, o2, oh, ...hs(m, oh)] : null; }],
  ["Ester", (m, i) => { if (el(m, i) !== "C") return null; const o2 = nbs(m, i).find((x) => el(m, x) === "O" && bo(m, i, x) === 2), o = nbs(m, i).find((x) => el(m, x) === "O" && bo(m, i, x) === 1 && nbs(m, x).some((y) => y !== i && el(m, y) === "C")); return o2 != null && o != null ? [i, o2, o] : null; }],
  ["Amide", (m, i) => { if (el(m, i) !== "C") return null; const o2 = nbs(m, i).find((x) => el(m, x) === "O" && bo(m, i, x) === 2), n = nbs(m, i).find((x) => el(m, x) === "N"); return o2 != null && n != null ? [i, o2, n] : null; }],
  ["Aldehyde", (m, i) => { if (el(m, i) !== "C") return null; const o2 = nbs(m, i).find((x) => el(m, x) === "O" && bo(m, i, x) === 2); return o2 != null && hs(m, i).length >= 1 && nbs(m, i).filter((x) => ["O", "N"].includes(el(m, x))).length === 1 ? [i, o2, ...hs(m, i)] : null; }],
  ["Ketone", (m, i) => { if (el(m, i) !== "C") return null; const o2 = nbs(m, i).find((x) => el(m, x) === "O" && bo(m, i, x) === 2); return o2 != null && nbs(m, i).filter((x) => el(m, x) === "C").length === 2 ? [i, o2] : null; }],
  ["Alcohol", (m, i) => { if (el(m, i) !== "O" || hs(m, i).length !== 1) return null; const c = nbs(m, i).find((x) => el(m, x) === "C"); if (c == null || m.atoms[c].arom || nbs(m, c).some((x) => el(m, x) === "O" && bo(m, c, x) === 2)) return null; return [i, ...hs(m, i), c]; }],
  ["Phenol", (m, i) => { if (el(m, i) !== "O" || hs(m, i).length !== 1) return null; const c = nbs(m, i).find((x) => m.atoms[x].arom); return c != null ? [i, ...hs(m, i), c] : null; }],
  ["Ether", (m, i) => { if (el(m, i) !== "O" || nbs(m, i).length !== 2 || hs(m, i).length) return null; const cs = nbs(m, i); if (cs.some((c) => nbs(m, c).some((x) => el(m, x) === "O" && bo(m, c, x) === 2))) return null; return [i, ...cs]; }],
  ["Amine", (m, i) => { if (el(m, i) !== "N" || m.atoms[i].arom || (m.atoms[i].charge || 0) !== 0 || !nbs(m, i).some((x) => el(m, x) === "C")) return null; if (nbs(m, i).some((c) => nbs(m, c).some((x) => el(m, x) === "O" && bo(m, c, x) === 2)) || nbs(m, i).some((x) => bo(m, i, x) > 1)) return null; return [i, ...hs(m, i)]; }],
  ["Alkene", (m, i) => { const b = m.bonds.find((x) => x.a === i && x.order === 2 && el(m, x.a) === "C" && el(m, x.b) === "C"); return b ? [b.a, b.b] : null; }],
  ["Alkyne", (m, i) => { const b = m.bonds.find((x) => x.a === i && x.order === 3 && el(m, x.a) === "C" && el(m, x.b) === "C"); return b ? [b.a, b.b] : null; }],
  ["Arene (benzene ring)", (m, i) => (m.atoms[i].arom && el(m, i) === "C" ? [i] : null)],
  ["Halogenoalkane", (m, i) => (["Cl", "Br", "I", "F"].includes(el(m, i)) && !m.atoms[nbs(m, i)[0]]?.arom ? [i, nbs(m, i)[0]] : null)],
  ["Nitrile", (m, i) => { if (el(m, i) !== "C") return null; const n = nbs(m, i).find((x) => el(m, x) === "N" && bo(m, i, x) === 3); return n != null ? [i, n] : null; }],
  ["Nitro", (m, i) => (el(m, i) === "N" && nbs(m, i).filter((x) => el(m, x) === "O").length === 2 ? [i, ...nbs(m, i).filter((x) => el(m, x) === "O")] : null)],
];
export function findGroups(m) {
  const found = new Map();
  for (const [name, test] of GROUPS) for (let i = 0; i < m.atoms.length; i++) { const r = test(m, i); if (r) { const set = found.get(name) || new Set(); r.forEach((x) => set.add(x)); found.set(name, set); } }
  // an ester or acid also matches simpler patterns; keep the more specific one
  if (found.has("Carboxylic acid") || found.has("Ester") || found.has("Amide")) { found.delete("Ketone"); found.delete("Aldehyde"); }
  if (found.has("Carboxylic acid")) found.delete("Alcohol");
  if (found.has("Ester")) found.delete("Ether");
  if (found.has("Amide")) found.delete("Amine");
  return found;
}

export function mount(el, ctx = {}) {
  const groupsMode = ctx.mode === "groups";
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div>`);
  const S = stage3d($(".lab-stage"), { distance: 10, aspect: 0.8 }); S.spin = 0.25;
  const ctrl = $(".lab-ctrl"), info = panel(ctrl);
  let smiles = groupsMode ? "CC(=O)Oc1ccccc1C(=O)O" : "CC(=O)O", style = "ball", focus = null, m = null;
  const st = { styles: new Set(), own: false, groups: new Set(), viewed: new Set() };
  const ch = challenges(ctrl, ctx, groupsMode ? [
    { id: "g6", text: "Find six different functional groups across the library", test: (x) => x.groups.size >= 6 },
    { id: "asp", text: "Find all three functional groups in aspirin", test: (x) => x.viewed.has("Aspirin") },
  ] : [
    { id: "lib", text: "View eight molecules from the library", test: (x) => x.viewed.size >= 8 },
    { id: "own", text: "Build a molecule from your own SMILES string", test: (x) => x.own },
    { id: "space", text: "Compare ball-and-stick and space-filling models", test: (x) => x.styles.size >= 2 },
  ]);
  select($(".top"), { label: "Molecule", options: LIBRARY.map(([n, s]) => [s, n]), value: smiles, onChange: (v) => { smiles = v; inp.value = v; st.viewed.add(LIBRARY.find((x) => x[1] === v)[0]); focus = null; build(); } });
  const lbl = document.createElement("label"); lbl.className = "lab-sel"; lbl.innerHTML = `SMILES <input type="text" spellcheck="false" style="width:220px">`; $(".top").append(lbl);
  const inp = lbl.querySelector("input"); inp.value = smiles;
  inp.addEventListener("change", () => { smiles = inp.value.trim(); st.own = true; focus = null; build(); });
  if (!groupsMode) seg($(".top"), [["ball", "Ball and stick"], ["space", "Space-filling"]], style, (v) => { style = v; st.styles.add(v); build(); });
  st.styles.add(style);
  function build() {
    try { m = molecule(smiles); } catch (e) { info(`<p class="lab-msg no">Couldn't read that SMILES: ${esc(e.message)}</p>`); return; }
    S.clear();
    const groups = findGroups(m), hi = focus && groups.get(focus) ? groups.get(focus) : new Set();
    for (const g of groups.keys()) st.groups.add(g); ch.check(st);
    drawMolecule(S, m, { style, highlight: hi, dim: groupsMode && hi.size > 0 }); frame(S, m);
    const f = formula(m), name = LIBRARY.find((x) => x[1] === smiles)?.[0];
    info(`<h4>${esc(name || "Your molecule")}</h4><div class="lab-read"><div><small>Formula</small><b>${f.text.replace(/(\d+)/g, "<sub>$1</sub>")}</b></div><div><small>Molar mass</small><b>${f.mass.toFixed(2)} g/mol</b></div><div><small>Atoms</small><b>${m.atoms.length}</b></div></div>
      ${groups.size ? `<p>Functional groups (tap to highlight):</p><div class="lab-chips">${[...groups.keys()].map((g) => `<button type="button" data-g="${esc(g)}" class="${g === focus ? "on" : ""}">${esc(g)}</button>`).join("")}</div>` : "<p>No functional groups: a hydrocarbon skeleton only.</p>"}
      <p class="lab-msg">Colours: C grey, H white, O red, N blue, S yellow, Cl green, Br dark red. ${groupsMode ? "The functional group decides most of a molecule's reactions; the carbon skeleton mostly doesn't." : "Geometry from a simple force field: approximate."}</p>`);
    $.all("[data-g]").forEach((b) => b.addEventListener("click", () => { focus = focus === b.dataset.g ? null : b.dataset.g; build(); }));
  }
  build();
  return () => S.stop();
}
