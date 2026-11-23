// What a reaction does to the configuration of a drawn molecule, applied after the predictor's rules have made the
// products (kit/labs/chemistry/reactions/predictor.js). DOM-free; tested in tests/stereo-outcome.test.mjs.
//
// Each product's stereocentres and E/Z bonds are sorted by what happened at the atom:
//   kept       no bond to the atom changed: the wedges carry over (the R/S label can still change, because a group's
//              CIP priority can change elsewhere in the molecule)
//   inverted   SN2 at a drawn stereocentre: the nucleophile takes the leaving group's place and the centre turns
//              inside out (Walden inversion), drawn as the mirror image at that carbon
//   racemised  SN1 at a drawn stereocentre: a planar carbocation, attacked from either face
//   formed     a new stereocentre at an sp² carbon. syn additions (H₂/Ni, cold KMnO₄) put both new groups on the same
//              face of the C=C, anti additions (Br₂) on opposite faces, so the alkene's E/Z geometry decides which
//              stereoisomers form; other additions (HBr, steam, NaBH₄, HCN, Grignard) attack either face of a planar
//              carbon or carbocation independently
//   unknown    a bond to the stereocentre changed by a rule that doesn't say what happens to its configuration
// and one principle decides the form: achiral starting material and reagents give an achiral (or meso) product or a
// racemate, never one enantiomer. A new stereocentre in a molecule that already has one gives diastereomers, in
// amounts the lab doesn't predict.
//
//   stereoOutcome(m, reagentId, result) → adds `config` to each product:
//     { text: "(2R,3S)", form, centres: [{ atom, label, how }], bonds: [{ bond, label, how }], notes: [] }
//     form: "achiral" | "single" | "racemic" | "meso" | "diastereomers" | "stereoisomers" | "unspecified" (a rule
//           the lab doesn't follow stereochemically) | "undrawn" (the starting material shows no wedges to carry)
//   and returns notes for the whole reaction.
import * as K from "../skeletal.js";
import { configuration, descriptor, mirror, chiral, bendAlkene, setEZ } from "./configuration.js";
import { sprout } from "./competition.js";

/** How each reagent adds to a C=C (or C≡C), where it matters for stereochemistry. */
export const ADDITION = { "h2-ni": "syn", "kmno4-cold": "syn", br2: "anti", lindlar: "syn-alkyne" };

// bonds at an atom, as a comparable signature: neighbour, its element, the bond order; plus the hydrogen count
function signature(m, id, H) {
  return K.neighbours(m, id).filter((n) => n.atom.el !== "H").map((n) => `${n.atom.id}:${n.atom.el}:${n.bond.order}`).sort().join(",") + `|h${H(id)}`;
}
const hCounter = (m) => { const G = K.graph(m), ix = new Map(G.id.map((id, i) => [id, i])); return (id) => G.h[ix.get(id)] ?? 0; };
const multiple = (m, id) => K.neighbours(m, id).some((n) => n.bond.order > 1);
const strip = (m, id) => { for (const b of m.bonds) if (b.a === id && b.stereo) delete b.stereo; };

/** Puts a new group at `id` on one face (wedge up, dash down), drawing the hydrogen if the new group is a hidden H. */
function face(pm, start, id, up) {
  const before = new Set(K.neighbours(start, id).map((n) => n.atom.id));
  const fresh = K.neighbours(pm, id).filter((n) => !before.has(n.atom.id) && n.bond.order === 1);
  let bond = fresh.sort((x, y) => (x.atom.el === "H") - (y.atom.el === "H"))[0]?.bond;
  if (!bond) { const h = sprout(pm, id, "H"); bond = K.bondBetween(pm, id, h.id); }
  if (bond.a !== id) [bond.a, bond.b] = [bond.b, bond.a];
  bond.stereo = up ? "wedge" : "dash";
}

/** Whether a bond is in a ring (removing it leaves its ends connected). */
function inRing(m, b) {
  const seen = new Set([b.a]), st = [b.a];
  while (st.length) { const u = st.pop(); for (const n of K.neighbours(m, u)) { if (n.bond === b || n.bond.id === b.id) continue; if (n.atom.id === b.b) return true; if (!seen.has(n.atom.id)) { seen.add(n.atom.id); st.push(n.atom.id); } } }
  return false;
}
const LOCANT = (cfg, id) => (cfg.locant[id] ? `C${cfg.locant[id]}` : "the carbon");

export function stereoOutcome(m, reagentId, res) {
  const start = configuration(m), startDefined = start.centres.some((c) => c.label), H0 = hCounter(m), notes = new Set();
  const mode = ADDITION[reagentId] || null, site = res.competition?.site?.c ?? null;
  const startBonds = new Map(start.bonds.map((b) => [b.atoms.slice().sort().join("-"), b]));
  for (const p of res.products) {
    const pm = p.m, H1 = hCounter(pm), changed = (id) => K.atomOf(m, id) && signature(m, id, H0) !== signature(pm, id, H1);
    const before = new Map(start.centres.map((c) => [c.atom, c]));
    const how = new Map(), pnotes = [];
    let cfg = configuration(pm);
    // 1. stereocentres that existed or whose bonds changed
    const fromPlanar = [];
    for (const c of cfg.centres) {
      const was = before.get(c.atom);
      if (!K.atomOf(m, c.atom)) { how.set(c.atom, "unknown"); continue; }
      if (!changed(c.atom)) { how.set(c.atom, was?.label ? "kept" : startDefined || c.label ? "kept" : "unspecified"); continue; }
      if (c.atom === site && was?.label && p.mech === "SN2") { const q = mirror(pm, [c.atom]); pm.bonds = q.bonds; how.set(c.atom, "inverted"); continue; }
      if (c.atom === site && was?.label && p.mech === "SN1") { strip(pm, c.atom); how.set(c.atom, "racemised"); continue; }
      if (multiple(m, c.atom) && !multiple(pm, c.atom)) { fromPlanar.push(c.atom); how.set(c.atom, "formed"); continue; }
      strip(pm, c.atom); how.set(c.atom, was?.label ? "unknown" : "unspecified");
    }
    // 2. new stereocentres: syn/anti pairs across one C=C, the rest one face at a time
    const done = new Set();
    if (mode === "syn" || mode === "anti") {
      for (const b of m.bonds) {
        if (b.order !== 2 || !fromPlanar.includes(b.a) || !fromPlanar.includes(b.b)) continue;
        face(pm, m, b.a, true); face(pm, m, b.b, mode === "syn"); done.add(b.a); done.add(b.b);
        if (inRing(m, b)) notes.add(`A C=C in a ring of this size is always cis, so ${mode} addition puts the two new groups ${mode === "syn" ? "cis (on the same side of the ring)" : "trans (on opposite sides of the ring)"}.`);
      }
    }
    const lone = fromPlanar.filter((id) => !done.has(id));
    for (const id of lone) face(pm, m, id, true);
    // 3. which stereoisomers: one, a racemate, meso, or diastereomers
    cfg = configuration(pm);
    let form;
    const newOnes = fromPlanar.length, otherDefined = cfg.centres.some((c) => c.label && !fromPlanar.includes(c.atom) && how.get(c.atom) !== "racemised");
    const racemised = cfg.centres.some((c) => how.get(c.atom) === "racemised");
    if (!cfg.centres.length) form = "achiral";
    else if ((newOnes || racemised) && otherDefined) { for (const id of fromPlanar) strip(pm, id); form = "diastereomers"; }
    // independent addition units: each syn or anti pair across one C=C counts once, each lone new centre once. With more
    // than one unit their relative arrangement isn't fixed, so a mixture of stereoisomers forms (C=CCC/C=C/CC + Br₂:
    // a lone centre and an anti pair, four stereoisomers in two racemic pairs, not one racemate)
    else if (newOnes && lone.length + done.size / 2 > 1) { for (const id of fromPlanar) strip(pm, id); form = "stereoisomers"; }
    else if (racemised) form = "racemic";
    else if (cfg.centres.some((c) => !c.label)) form = cfg.centres.some((c) => how.get(c.atom) === "unknown") ? "unspecified" : "undrawn";
    // one stereoisomer only if this product keeps a centre whose configuration the rule determines (kept or inverted
    // from the drawing). A defined centre elsewhere in the starting material doesn't count: in an ester reduction it
    // can leave with the other fragment, and the new centre in this one forms from a planar carbon on either face.
    else if (!cfg.centres.some((c) => c.label && ["kept", "inverted"].includes(how.get(c.atom)) && before.get(c.atom)?.label)) form = chiral(pm) ? "racemic" : "meso";
    else form = chiral(pm) ? "single" : "meso";
    // 4. C=C bonds: kept, made from a C≡C (Lindlar: Z), or made by an elimination (mostly E)
    for (const b of configuration(pm).bonds) {
      const k = b.atoms.slice().sort().join("-"), was = startBonds.get(k), ob = K.bondBetween(m, b.atoms[0], b.atoms[1]);
      if (was && ob?.order === 2) { how.set(`b${b.bond}`, "kept"); continue; }
      if (ob?.order === 3 && mode === "syn-alkyne") { bendAlkene(pm, b.bond, "Z"); how.set(`b${b.bond}`, "formed-Z"); continue; }
      if (ob?.order === 1) { setEZ(pm, b.bond, "E"); how.set(`b${b.bond}`, "formed-E"); continue; }
      how.set(`b${b.bond}`, "unspecified");
    }
    // 5. the record and its explanation
    cfg = configuration(pm);
    const text = descriptor(pm, cfg);
    const centres = cfg.centres.map((c) => ({ atom: c.atom, label: c.label, how: how.get(c.atom) || "unspecified" }));
    const bonds = cfg.bonds.map((b) => ({ bond: b.bond, label: b.label, how: how.get(`b${b.bond}`) || "unspecified" }));
    for (const c of centres) {
      const was = before.get(c.atom), at = LOCANT(cfg, c.atom);
      const was0 = start.locant[c.atom] ? `C${start.locant[c.atom]}` : null, both = was0 && at !== "the carbon" && was0 !== at ? `${was0} in the starting material, ${at} in the product` : at;
      if (c.how === "inverted") pnotes.push(`SN2 inverts the carbon that carried the leaving group (${both}): ${was.label} before, ${c.label || "?"} after. The nucleophile comes in on the side away from the leaving group.${c.label === was.label ? " (The letter stays the same only because the new group's priority differs from the old one's: the arrangement has still inverted.)" : ""}`);
      if (c.how === "racemised") pnotes.push(`SN1 racemises ${at}: the carbocation is planar and is attacked from either face, so R and S form in (nearly) equal amounts.`);
      if (c.how === "kept" && was?.label && c.label && was.label !== c.label) pnotes.push(`${both === at ? at : `The stereocentre (${both})`} isn't touched, so its arrangement is kept; its label changes from ${was.label} to ${c.label} only because a group's CIP priority changed.`);
      if (c.how === "unknown") pnotes.push(`A bond to the stereocentre at ${at} changes in a way this lab's rules don't follow stereochemically, so its configuration isn't predicted.`);
    }
    // E2 from a carbon pair whose β-carbon is a drawn stereocentre is stereospecific (one H, anti-periplanar)
    const betaDefined = (b) => p.mech === "E2" && K.bondOf(pm, b.bond) && [K.bondOf(pm, b.bond).a, K.bondOf(pm, b.bond).b].some((id) => id !== site && before.get(id)?.label);
    for (const b of bonds) {
      if (b.how === "formed-Z") pnotes.push("Both hydrogens add from the catalyst surface to the same side (syn), so the alkyne gives the Z alkene.");
      if (b.how === "formed-E") pnotes.push(`Drawn as the E isomer, the major one: it is more stable (the larger groups are further apart). Some Z forms too.${betaDefined(b) ? " From a single stereoisomer, E2 is stereospecific (H and leaving group anti-periplanar); this lab doesn't yet work out which alkene that gives." : ""}`);
    }
    const mirrorText = form === "racemic" ? descriptor(mirror(pm)) : "";
    if (form === "racemic" && !racemised) pnotes.push(`${text && mirrorText ? `${text} and ${mirrorText}` : "Both enantiomers"} form in equal amounts (a racemate, optically inactive); one enantiomer is drawn.`);
    if (form === "meso") pnotes.push(`${text} is a meso compound: it has stereocentres but is superimposable on its mirror image, so it is achiral and only this one stereoisomer forms.`);
    if (form === "diastereomers") pnotes.push(`${newOnes ? "A new stereocentre forms" : "One stereocentre is racemised"} in a molecule that has another, so the products are diastereomers. They form in different amounts, which this lab doesn't predict, so ${newOnes ? "the new centre is" : "that centre is"} drawn without a wedge.`);
    if (form === "stereoisomers") pnotes.push("Several stereocentres form independently, so a mixture of stereoisomers forms; they are drawn without wedges.");
    p.config = { text, form, centres, bonds, notes: pnotes, mirror: mirrorText || null };
  }
  return [...notes];
}
