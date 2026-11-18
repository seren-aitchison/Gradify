#!/usr/bin/env python3
"""Stage 1 of Gradify's visual pipeline: molecular structures, with automated quality checks.

For each molecule in molecules.json, RDKit builds a 3D structure from its SMILES (ETKDGv3 conformer embedding, then
MMFF94 force-field optimisation, the standard open-source method), and the result is checked before anything is
rendered:
  formula      the structure's formula must equal the formula written down independently in molecules.json
  stereo       the number of defined stereocentres must equal the expected number, where one is given
  bonds        every bond length must be within the range expected for its atoms and bond order
  clashes      no two non-bonded heavy atoms closer than 1.9 Å, no hydrogens closer than 1.0 Å
  sanitise     RDKit's valence and aromaticity checks must pass
A molecule that fails any check is not rendered or published (constitution article 1: accuracy before quantity).

Writes scripts/visuals/out/<id>.json (atoms, bonds, measured geometry, the checks) for Blender (stage 2) and the
browser. Usage: python3 scripts/visuals/build_molecules.py
"""
import json, math, os, sys
from rdkit import Chem
from rdkit.Chem import AllChem, rdMolDescriptors

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")
# expected stereocentres for chiral molecules with no R/S reference (an independent check on the SMILES); molecules in
# references.json with "cip" get their count from there
STEREO = {"glucose": 5, "alanine": 1, "cholesterol": 8, "sucrose": 9}
REFS = json.load(open(os.path.join(HERE, "references.json")))
for _id, _r in REFS["molecules"].items():
    if "cip" in _r: STEREO[_id] = _r["cip"]["R"] + _r["cip"]["S"]

# functional groups, by SMARTS pattern (the order matters: more specific patterns first claim their atoms)
GROUPS = [
    ("carboxylic acid", "[CX3](=O)[OX2H1]"), ("ester", "[#6][CX3](=O)[OX2H0][#6]"), ("amide", "[NX3][CX3](=[OX1])"),
    ("phosphate", "P(=O)(~O)~O"), ("guanidine", "[NX3][CX3](=[NX2])[NX3]"), ("aldehyde", "[CX3H1](=O)[#6]"), ("ketone", "[#6][CX3](=O)[#6]"),
    ("phenol (hydroxyl on a ring)", "c[OX2H]"), ("hydroxyl (alcohol)", "[CX4][OX2H]"), ("amine", "[NX3;H2,H1;!$(NC=[O,N]);!$(N-a)][CX4]"),
    ("thiol", "[SX2H]"), ("thioether", "[#6][SX2][#6]"), ("alkene", "[CX3]=[CX3]"), ("alkyne", "[CX2]#[CX2]"), ("benzene ring", "c1ccccc1"),
]
# covalent radii (Å, Cordero et al. 2008), for bond-length sanity ranges
COV = {"H": 0.31, "C": 0.76, "N": 0.71, "O": 0.66, "S": 1.05, "Cl": 1.02, "P": 1.07, "F": 0.57}

def counts_of(f):
    """{"C": 2, "H": 6, "O": 1} from a formula, whatever order its elements are written in."""
    import re
    out = {}
    for el, n in re.findall(r"([A-Z][a-z]?)(\d*)", f):
        out[el] = out.get(el, 0) + (int(n) if n else 1)
    return out

def check_bonds(mol, conf):
    bad = []
    for b in mol.GetBonds():
        a, c = b.GetBeginAtom(), b.GetEndAtom()
        d = conf.GetAtomPosition(a.GetIdx()).Distance(conf.GetAtomPosition(c.GetIdx()))
        single = COV[a.GetSymbol()] + COV[c.GetSymbol()]
        order = b.GetBondTypeAsDouble()
        # multiple bonds are shorter: allow from 75% of the single-bond length for triple bonds up to 112%
        lo, hi = single * (0.75 if order >= 2 else 0.85), single * 1.12
        if not lo <= d <= hi:
            bad.append(f"{a.GetSymbol()}{a.GetIdx()}–{c.GetSymbol()}{c.GetIdx()} {d:.2f} Å (expected {lo:.2f}–{hi:.2f})")
    return bad

def check_clashes(mol, conf):
    bad, n = [], mol.GetNumAtoms()
    dm = Chem.GetDistanceMatrix(mol)
    for i in range(n):
        for j in range(i + 1, n):
            if dm[i][j] < 3:   # bonded, or 1-3: their distance is set by the geometry
                continue
            d = conf.GetAtomPosition(i).Distance(conf.GetAtomPosition(j))
            heavy = mol.GetAtomWithIdx(i).GetSymbol() != "H" and mol.GetAtomWithIdx(j).GetSymbol() != "H"
            if d < (1.9 if heavy else 1.0):
                bad.append(f"atoms {i} and {j} only {d:.2f} Å apart")
    return bad

def angle(conf, a, b, c):
    p, q, r = conf.GetAtomPosition(a), conf.GetAtomPosition(b), conf.GetAtomPosition(c)
    u, v = p - q, r - q
    return math.degrees(math.acos(max(-1, min(1, u.DotProduct(v) / (u.Length() * v.Length())))))

def bonds_of(molH, conf, a, b, order):
    out = []
    for bd in molH.GetBonds():
        x, y = bd.GetBeginAtom().GetSymbol(), bd.GetEndAtom().GetSymbol()
        if {x, y} == {a, b} and abs(bd.GetBondTypeAsDouble() - order) < 0.01:
            out.append(conf.GetAtomPosition(bd.GetBeginAtomIdx()).Distance(conf.GetAtomPosition(bd.GetEndAtomIdx())))
    return out

def angles_of(molH, conf, a, c, b):
    out = []
    for at in molH.GetAtoms():
        if at.GetSymbol() != c: continue
        nb = [n for n in at.GetNeighbors()]
        for i in range(len(nb)):
            for j in range(i + 1, len(nb)):
                if sorted([nb[i].GetSymbol(), nb[j].GetSymbol()]) == sorted([a, b]):
                    out.append(angle(conf, nb[i].GetIdx(), at.GetIdx(), nb[j].GetIdx()))
    return out

def build(m):
    mol = Chem.MolFromSmiles(m["smiles"])
    if mol is None:
        return None, ["the SMILES didn't parse"]
    checks = {}
    formula = rdMolDescriptors.CalcMolFormula(mol)
    checks["formula"] = {"ok": counts_of(formula) == counts_of(m["formula"]), "found": formula, "expected": m["formula"]}
    centres = Chem.FindMolChiralCenters(mol, includeUnassigned=True, useLegacyImplementation=False)
    # stereocentres: assigned ones are counted; an unassigned carbon centre means the structure is ambiguous and fails.
    # (RDKit also lists phosphorus with four different neighbours as a possible centre; a phosphate's oxygens are
    # equivalent by resonance and ionisation, so those aren't real stereocentres and are left out.)
    unassigned = [i for i, l in centres if l == "?" and mol.GetAtomWithIdx(i).GetSymbol() == "C"]
    centres = [(i, l) for i, l in centres if l in ("R", "S")]
    # a racemic compound (sold as both mirror forms, e.g. ibuprofen) is declared so in molecules.json; the model shows one
    if unassigned and not m.get("racemic"):
        checks["unassigned"] = {"ok": False, "found": unassigned}
    if m["id"] in STEREO:
        checks["stereo"] = {"ok": len(centres) == STEREO[m["id"]], "found": len(centres), "expected": STEREO[m["id"]]}
    ref = REFS["molecules"].get(m["id"], {})
    # identity: the standard InChIKey (stereochemistry included) must be the reference compound's
    key = Chem.MolToInchiKey(mol)
    if ref.get("inchikey"):
        checks["identity"] = {"ok": key == ref["inchikey"], "found": key, "expected": ref["inchikey"]}
    # configuration: how many stereocentres are R and how many S
    if ref.get("cip"):
        found = {"R": sum(1 for _, l in centres if l == "R"), "S": sum(1 for _, l in centres if l == "S")}
        checks["configuration"] = {"ok": found == ref["cip"], "found": found, "expected": ref["cip"]}
    molH = Chem.AddHs(mol)
    params = AllChem.ETKDGv3(); params.randomSeed = 20261118
    if AllChem.EmbedMolecule(molH, params) != 0:
        return None, ["3D embedding failed"]
    # MMFF94 where it has parameters for every atom; otherwise UFF (MMFF has none for carbon dioxide, for example, and an
    # unoptimised embedding left its C=O bonds 0.24 Å too long, which the experimental check caught)
    forcefield = "none"
    if ref.get("coordinates"):
        # the measured structure itself (references.json), when it fully fixes the shape
        xyz = ref["coordinates"]; c0 = molH.GetConformer()
        if len(xyz) != molH.GetNumAtoms() or any(molH.GetAtomWithIdx(i).GetSymbol() != e for i, (e, *_) in enumerate(xyz)):
            return None, ["reference coordinates don't match the atoms"]
        from rdkit.Geometry import Point3D
        for i, (_, x, y, z) in enumerate(xyz): c0.SetAtomPosition(i, Point3D(x, y, z))
        forcefield = "experimental"
    elif molH.GetNumAtoms() > 1 and AllChem.MMFFHasAllMoleculeParams(molH):
        AllChem.MMFFOptimizeMolecule(molH, maxIters=2000); forcefield = "MMFF94"
    elif molH.GetNumAtoms() > 1 and AllChem.UFFHasAllMoleculeParams(molH):
        AllChem.UFFOptimizeMolecule(molH, maxIters=2000); forcefield = "UFF"
    checks["optimised"] = {"ok": forcefield != "none" or molH.GetNumAtoms() == 1, "found": forcefield}
    conf = molH.GetConformer()
    try:
        Chem.SanitizeMol(Chem.Mol(molH)); checks["sanitise"] = {"ok": True}
    except Exception as e:
        checks["sanitise"] = {"ok": False, "found": str(e)}
    b = check_bonds(molH, conf); checks["bonds"] = {"ok": not b, "found": b}
    # geometry against experiment: the model's mean bond lengths and angles within tolerance of measured values
    if ref.get("geometry"):
        tol, bad, seen = REFS["tolerance"], [], []
        for g in ref["geometry"]:
            if "bond" in g:
                v = bonds_of(molH, conf, *g["bond"]); got = sum(v) / len(v) if v else None
                ok = got is not None and abs(got - g["value"]) <= tol["bond"]
                seen.append({"what": f"{g['bond'][0]}–{g['bond'][1]} bond", "model": round(got, 3) if got else None, "experiment": g["value"], "unit": "Å", "ok": ok})
            else:
                v = angles_of(molH, conf, *g["angle"]); got = sum(v) / len(v) if v else None
                ok = got is not None and abs(got - g["value"]) <= tol["angle"]
                seen.append({"what": f"{'–'.join(g['angle'])} angle", "model": round(got, 1) if got else None, "experiment": g["value"], "unit": "°", "ok": ok})
            if not ok: bad.append(seen[-1])
        checks["geometry"] = {"ok": not bad, "found": seen, "source": REFS["geometrySource"]}
    c = check_clashes(molH, conf); checks["clashes"] = {"ok": not c, "found": c}
    # chirality survives embedding: the 3D structure must have the same R/S labels as the SMILES
    if m["id"] in STEREO:
        m3 = Chem.Mol(molH); Chem.AssignStereochemistryFrom3D(m3)
        after = sorted((i, l) for i, l in Chem.FindMolChiralCenters(Chem.RemoveHs(m3), useLegacyImplementation=False) if l in ("R", "S") and m3.GetAtomWithIdx(i).GetSymbol() != "P")
        checks["stereo3d"] = {"ok": after == sorted(centres), "found": len(after)}
    # centre the molecule and turn it onto its principal axes (a rotation, so no distance or angle changes): its longest
    # dimension along x, its flattest along z, so a ring or a planar molecule faces the camera rather than its edge
    import numpy as np
    P = np.array([[conf.GetAtomPosition(i).x, conf.GetAtomPosition(i).y, conf.GetAtomPosition(i).z] for i in range(molH.GetNumAtoms())])
    P = P - P.mean(axis=0)
    if len(P) > 2:
        _, vecs = np.linalg.eigh(P.T @ P)
        R = vecs[:, ::-1]
        if np.linalg.det(R) < 0: R[:, 2] *= -1   # a proper rotation: never mirror, or chirality would flip
        P = P @ R
    atoms = [{"el": a.GetSymbol(), "x": round(float(P[i][0]), 4), "y": round(float(P[i][1]), 4), "z": round(float(P[i][2]), 4), "charge": a.GetFormalCharge(), "aromatic": a.GetIsAromatic()} for i, a in enumerate(molH.GetAtoms())]
    bonds = [{"a": bd.GetBeginAtomIdx(), "b": bd.GetEndAtomIdx(), "order": bd.GetBondTypeAsDouble(), "length": round(conf.GetAtomPosition(bd.GetBeginAtomIdx()).Distance(conf.GetAtomPosition(bd.GetEndAtomIdx())), 3)} for bd in molH.GetBonds()]
    # every distinct bond angle around each atom with two or more neighbours, for labels and questions
    angles = []
    for a in molH.GetAtoms():
        nb = [n.GetIdx() for n in a.GetNeighbors()]
        for i in range(len(nb)):
            for j in range(i + 1, len(nb)):
                angles.append({"a": nb[i], "centre": a.GetIdx(), "b": nb[j], "deg": round(angle(conf, nb[i], a.GetIdx(), nb[j]), 1)})
    for bd in bonds:
        a, c = atoms[bd["a"]], atoms[bd["b"]]
        assert abs(math.dist((a["x"], a["y"], a["z"]), (c["x"], c["y"], c["z"])) - bd["length"]) < 0.002, "rotation changed a bond length"
    # functional groups (each atom claimed once, most specific pattern first) and Gasteiger partial charges
    # groups built on heteroatoms compete with each other for atoms, and so do the carbon skeleton's (rings, C=C,
    # C≡C); the two kinds don't, so aspirin's ring isn't lost to the ester attached to it
    groups, claimed = [], {"hetero": set(), "skeleton": set()}
    for name, smarts in GROUPS:
        kind = "skeleton" if name in ("alkene", "alkyne", "benzene ring") else "hetero"
        patt = Chem.MolFromSmarts(smarts)
        for match in molH.GetSubstructMatches(patt):
            if claimed[kind] & set(match): continue
            claimed[kind] |= set(match); groups.append({"name": name, "atoms": list(match)})
    AllChem.ComputeGasteigerCharges(molH)
    for i, a in enumerate(molH.GetAtoms()):
        q = a.GetDoubleProp("_GasteigerCharge"); atoms[i]["q"] = round(q, 3) if q == q else 0.0
    centres3d = {i: l for i, l in Chem.FindMolChiralCenters(mol, useLegacyImplementation=False)}
    for i, l in centres3d.items(): atoms[i]["cip"] = l
    counts = {}
    for a in atoms:
        counts[a["el"]] = counts.get(a["el"], 0) + 1
    data = {"id": m["id"], "name": m["name"], "smiles": m["smiles"], "formula": formula, "mass": round(rdMolDescriptors.CalcExactMolWt(mol), 3),
            "counts": counts, "atoms": atoms, "bonds": bonds, "angles": angles[:200],
            "stereocentres": [{"atom": i, "label": l} for i, l in centres], "groups": groups, "inchikey": key,
            "reference": {"identity": "identity" in checks, "configuration": "configuration" in checks, "geometry": checks.get("geometry", {}).get("found", [])},
            "method": "Experimental geometry (NIST CCCBDB)" if forcefield == "experimental" else f"RDKit ETKDGv3 conformer, {forcefield} optimised" if forcefield != "none" else "single atom",
            "racemic": bool(m.get("racemic")), "forcefield": forcefield, "rdkit": Chem.rdBase.rdkitVersion,
            "checks": checks, "ok": all(v["ok"] for v in checks.values()), "keys": m["keys"], "courses": m["courses"]}
    return data, [k for k, v in checks.items() if not v["ok"]]

def main():
    src = json.load(open(os.path.join(HERE, "molecules.json")))
    os.makedirs(OUT, exist_ok=True)
    failed = 0
    for m in src["molecules"]:
        data, problems = build(m)
        if data is None or problems:
            failed += 1
            print(f"FAIL {m['id']}: {', '.join(problems)}" + (f" ({json.dumps({k: data['checks'][k] for k in problems})})" if data else ""))
            if data: json.dump(data, open(os.path.join(OUT, f"{m['id']}.json"), "w"))
            continue
        json.dump(data, open(os.path.join(OUT, f"{m['id']}.json"), "w"))
        print(f"ok   {m['id']:<18} {data['formula']:<10} {len(data['atoms']):>3} atoms, every check passed")
    print(f"{len(src['molecules']) - failed} passed, {failed} failed")
    sys.exit(1 if failed else 0)

if __name__ == "__main__":
    main()
