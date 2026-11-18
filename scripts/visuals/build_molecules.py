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
# expected stereocentres for the chiral molecules (an independent check on the SMILES)
STEREO = {"glucose": 5, "alanine": 1, "cholesterol": 8}
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

def build(m):
    mol = Chem.MolFromSmiles(m["smiles"])
    if mol is None:
        return None, ["the SMILES didn't parse"]
    checks = {}
    formula = rdMolDescriptors.CalcMolFormula(mol)
    checks["formula"] = {"ok": counts_of(formula) == counts_of(m["formula"]), "found": formula, "expected": m["formula"]}
    centres = Chem.FindMolChiralCenters(mol, includeUnassigned=True, useLegacyImplementation=False)
    if m["id"] in STEREO:
        checks["stereo"] = {"ok": len(centres) == STEREO[m["id"]] and all(c[1] in ("R", "S") for c in centres), "found": len(centres), "expected": STEREO[m["id"]]}
    molH = Chem.AddHs(mol)
    params = AllChem.ETKDGv3(); params.randomSeed = 20261118
    if AllChem.EmbedMolecule(molH, params) != 0:
        return None, ["3D embedding failed"]
    if molH.GetNumAtoms() > 1 and AllChem.MMFFHasAllMoleculeParams(molH):
        AllChem.MMFFOptimizeMolecule(molH, maxIters=2000)
    conf = molH.GetConformer()
    try:
        Chem.SanitizeMol(Chem.Mol(molH)); checks["sanitise"] = {"ok": True}
    except Exception as e:
        checks["sanitise"] = {"ok": False, "found": str(e)}
    b = check_bonds(molH, conf); checks["bonds"] = {"ok": not b, "found": b}
    c = check_clashes(molH, conf); checks["clashes"] = {"ok": not c, "found": c}
    # chirality survives embedding: the 3D structure must have the same R/S labels as the SMILES
    if m["id"] in STEREO:
        m3 = Chem.Mol(molH); Chem.AssignStereochemistryFrom3D(m3)
        after = sorted(Chem.FindMolChiralCenters(Chem.RemoveHs(m3), useLegacyImplementation=False))
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
    counts = {}
    for a in atoms:
        counts[a["el"]] = counts.get(a["el"], 0) + 1
    data = {"id": m["id"], "name": m["name"], "smiles": m["smiles"], "formula": formula, "mass": round(rdMolDescriptors.CalcExactMolWt(mol), 3),
            "counts": counts, "atoms": atoms, "bonds": bonds, "angles": angles[:200],
            "stereocentres": [{"atom": i, "label": l} for i, l in centres],
            "method": "RDKit ETKDGv3 conformer, MMFF94 optimised", "rdkit": Chem.rdBase.rdkitVersion,
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
