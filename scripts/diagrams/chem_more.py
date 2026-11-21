"""Gradify Visual Learning Engine: chemistry renderers drawn with RDKit, besides mechanisms (scripts/diagrams/chem.py).

    python3 scripts/diagrams/chem_more.py spec.json   →  {"wide": svg, "narrow": svg, "checks": [...]}

Renderers and what they check:
  structures  one or more molecules: each formula recomputed; functional groups found by substructure (SMARTS);
              R/S and E/Z as RDKit assigns them (CIP); isomers share a formula but are different compounds;
              enantiomers are mirror images (same constitution, every stereocentre inverted)
  nmr         a ¹H or ¹³C spectrum: the number of peaks is the number of environments by symmetry; each peak's
              integration is the hydrogens in its environment; splitting follows the n + 1 rule from the
              hydrogens on neighbouring carbons; shifts lie in the range for the environment declared
  ms          a mass spectrum: the molecular ion at the molecule's mass; each fragment's m/z is its formula's
              mass and the fragment is part of the molecule; isotope peaks give the relative atomic mass
  ir          an infrared spectrum: each labelled band lies in its data-booklet range and the bond is present
"""
import decimal, json, math, re, sys, os
sys.path.insert(0, os.path.dirname(__file__))
from rdkit import Chem, RDLogger
from rdkit.Chem import rdDepictor, rdMolDescriptors, rdCIPLabeler, Descriptors
from rdkit.Chem.Draw import rdMolDraw2D
import chem  # palette, colour tokens and the escaping shared with the mechanism renderer

RDLogger.DisableLog("rdApp.*")
rdDepictor.SetPreferCoordGen(True)
INK, SOFT = chem.INK, chem.SOFT
A = {"a1": "var(--vx-a1, #4f46e5)", "a2": "var(--vx-a2, #db2777)", "a3": "var(--vx-a3, #ea580c)", "a4": "var(--vx-a4, #0d9488)", "a5": "var(--vx-a5, #7c3aed)"}
HL = {"a1": (0.31, 0.27, 0.9, 0.28), "a2": (0.86, 0.15, 0.47, 0.25), "a3": (0.92, 0.35, 0.05, 0.25), "a4": (0.05, 0.58, 0.53, 0.25), "a5": (0.49, 0.23, 0.93, 0.25)}

GROUPS = {
    "alkene": "[CX3]=[CX3]", "alkyne": "[CX2]#[CX2]", "arene": "c1ccccc1",
    "alcohol": "[CX4][OX2H]", "primary alcohol": "[CX4;H2,H3][OX2H]", "secondary alcohol": "[CX4H1]([#6])([#6])[OX2H]", "tertiary alcohol": "[CX4H0]([#6])([#6])([#6])[OX2H]",
    "phenol": "c[OX2H]", "ether": "[OD2]([#6;!$(C=O)])[#6;!$(C=O)]", "epoxide": "C1OC1",
    "aldehyde": "[CX3;H1,H2](=O)", "ketone": "[#6][CX3](=O)[#6]", "carboxylic acid": "[CX3](=O)[OX2H1]", "carboxylate": "[CX3](=O)[O-]",
    "ester": "[#6][CX3](=O)[OX2][#6]", "acyl chloride": "[CX3](=O)Cl", "acid anhydride": "[CX3](=O)O[CX3](=O)",
    "amide": "[CX3](=O)[NX3]", "primary amine": "[NX3;H2;!$(NC=O)][#6]", "secondary amine": "[NX3;H1;!$(NC=O)]([#6])[#6]",
    "tertiary amine": "[NX3;H0;!$(NC=O);!$(N=*);!$([N+])]([#6])([#6])[#6]", "quaternary ammonium": "[NX4+]([#6])([#6])([#6])[#6]",
    "amine": "[NX3;!$(NC=O);!$(N=*);!$(N#*);!$([N+])]", "nitrile": "[CX2]#[NX1]", "nitro": "[N+](=O)[O-]",
    "halogenoalkane": "[CX4][F,Cl,Br,I]", "thiol": "[SX2H]", "sulfide": "[#6][SX2][#6]", "disulfide": "[SX2][SX2]",
    "peptide link": "[CX3](=O)[NX3H1]", "C=O": "[CX3]=[OX1]",
}
# the atoms to shade for each group: only the group itself, not the carbon skeleton the full pattern needs to match
CORE = {"alcohol": "[CX4][OX2H]", "primary alcohol": "[OX2H]", "secondary alcohol": "[OX2H]", "tertiary alcohol": "[OX2H]", "phenol": "[OX2H]",
        "ether": "[OD2]([#6;!$(C=O)])[#6;!$(C=O)]", "aldehyde": "[CX3;H1,H2]=O", "ketone": "[CX3;$(C([#6])[#6])]=O", "carboxylic acid": "C(=O)[OX2H1]",
        "ester": "[CX3](=O)[OX2]", "acyl chloride": "C(=O)Cl", "acid anhydride": "C(=O)OC(=O)", "amide": "C(=O)[NX3]", "primary amine": "[NX3H2]",
        "secondary amine": "[NX3H1;!$(NC=O)]", "tertiary amine": "[NX3H0;!$(NC=O);!$(N=*);!$([N+])]", "amine": "[NX3;!$(NC=O)]", "halogenoalkane": "[F,Cl,Br,I]",
        "nitrile": "C#N", "nitro": "[N+](=O)[O-]", "thiol": "[SX2H]", "sulfide": "[SX2]", "disulfide": "[SX2][SX2]", "peptide link": "C(=O)[NH]"}
# typical ¹H and ¹³C shift ranges (ppm), as A level data booklets give them; the booklets differ slightly at the edges
H_RANGES = {"R–CH3": (0.7, 1.3), "R–CH2–R": (1.2, 1.4), "R3CH": (1.4, 1.6), "H–C–C=O": (2.0, 2.7), "H–C–N": (2.3, 3.0), "H–C–O": (3.3, 4.3),
            "H–C–Ar": (2.3, 2.7), "R–OH": (0.5, 5.0), "R–NH": (1.0, 4.5), "H–C=C": (4.5, 6.5), "Ar–H": (6.5, 8.5), "H–C=O": (9.0, 10.2), "COOH": (10.0, 12.5),
            "H–C–X": (3.0, 4.2)}
C_RANGES = {"C–C": (5, 40), "C–Cl/Br": (10, 70), "C–N": (25, 60), "C–O": (50, 90), "C=C": (90, 150), "aromatic C": (110, 160), "C=O ester/acid/amide": (160, 185), "C=O aldehyde/ketone": (190, 220), "C≡N": (110, 125)}
IR_RANGES = {"O–H (alcohol)": (3230, 3550), "O–H (acid)": (2500, 3000), "N–H": (3300, 3500), "C–H": (2850, 3300), "C≡N": (2220, 2260),
             "C=O": (1680, 1750), "C=C": (1620, 1680), "C–O": (1000, 1300)}
IR_BOND = {"O–H (alcohol)": "[CX4][OX2H]", "O–H (acid)": "[CX3](=O)[OX2H1]", "N–H": "[NX3;H1,H2]", "C–H": "[#6][H]", "C≡N": "C#N", "C=O": "[CX3]=O", "C=C": "C=C", "C–O": "[#6]-[OX2]"}
NOMINAL = {"H": 1, "C": 12, "N": 14, "O": 16, "F": 19, "S": 32, "Cl": 35, "Br": 79, "I": 127}
MONO = {"H": 1.007825, "C": 12.0, "N": 14.003074, "O": 15.994915, "F": 18.998403, "S": 31.972071, "Cl": 34.968853, "Br": 78.918338}


def ok(name, cond, detail=""):
    return {"name": name, "ok": bool(cond), "detail": detail}


def mol(smiles):
    m = Chem.MolFromSmiles(smiles)
    if m is None:
        raise ValueError(f"RDKit cannot parse {smiles}")
    return m


def formula(m):
    return rdMolDescriptors.CalcMolFormula(m)


def parse_formula(f):
    f = f.translate(str.maketrans("₀₁₂₃₄₅₆₇₈₉", "0123456789")).replace("⁺", "+").replace("⁻", "-")
    out = {}
    for el, n in re.findall(r"([A-Z][a-z]?)(\d*)", re.sub(r"[+\-•·]$|\^.*$", "", f)):
        out[el] = out.get(el, 0) + (int(n) if n else 1)
    return out


def norm_formula(f):
    d = parse_formula(f)
    keys = (["C"] if "C" in d else []) + (["H"] if "H" in d else []) + sorted(k for k in d if k not in ("C", "H"))
    return "".join(k + (str(d[k]) if d[k] > 1 else "") for k in keys)


# ---------------------------------------------------------------- drawing one molecule
def draw_mol(m, bond, opts=None):
    """SVG fragment of molecule m with bond length `bond` px; returns (inner, w, h, atom positions by index)."""
    opts = opts or {}
    m = Chem.Mol(m)
    if opts.get("displayed"):
        m = Chem.AddHs(m)
    if opts.get("xy"):
        conf = Chem.Conformer(m.GetNumAtoms())
        for i, (x, y) in enumerate(opts["xy"]):
            conf.SetAtomPosition(i, (x, y, 0))
        m.RemoveAllConformers(); m.AddConformer(conf)
    else:
        rdDepictor.Compute2DCoords(m)
        if opts.get("rotate"):
            from rdkit.Chem import rdMolTransforms
            import numpy as np
            a = math.radians(opts["rotate"]); c = m.GetConformer()
            T = np.array([[math.cos(a), -math.sin(a), 0, 0], [math.sin(a), math.cos(a), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]])
            rdMolTransforms.TransformConformer(c, T)
    c = m.GetConformer()
    xs = [c.GetAtomPosition(i).x for i in range(m.GetNumAtoms())]
    ys = [c.GetAtomPosition(i).y for i in range(m.GetNumAtoms())]
    # RDKit's 2D coordinates use a bond length of about 1.5
    scale = bond / 1.5
    pad = 0.75 if not opts.get("displayed") else 0.6
    w = int((max(xs) - min(xs) + 2 * pad * 1.5) * scale) + 4
    h = int((max(ys) - min(ys) + 2 * pad * 1.5) * scale) + 4
    d = rdMolDraw2D.MolDraw2DSVG(max(w, 40), max(h, 40))
    o = d.drawOptions()
    o.fixedBondLength = scale
    o.padding = 0.0
    o.clearBackground = False
    o.bondLineWidth = 2
    o.minFontSize = 16
    o.maxFontSize = 18
    o.addStereoAnnotation = bool(opts.get("cipLabels"))
    o.explicitMethyl = True
    o.updateAtomPalette(chem.PALETTE)
    if opts.get("displayed"):
        for a in m.GetAtoms():
            if a.GetSymbol() == "C":
                a.SetProp("_displayLabel", "C")
    hl_atoms, hl_bonds, ac, bc = [], [], {}, {}
    for g in opts.get("highlight", []):
        patt = Chem.MolFromSmarts(CORE.get(g["group"]) or GROUPS.get(g["group"], g["group"]))
        for match in m.GetSubstructMatches(patt):
            for i in match:
                if m.GetAtomWithIdx(i).GetAtomicNum() == 1 and not opts.get("displayed"):
                    continue
                hl_atoms.append(i); ac[i] = HL[g.get("colour", "a1")]
            for b in m.GetBonds():
                if b.GetBeginAtomIdx() in match and b.GetEndAtomIdx() in match:
                    hl_bonds.append(b.GetIdx()); bc[b.GetIdx()] = HL[g.get("colour", "a1")]
    for i, colr in (opts.get("atomColours") or {}).items():
        hl_atoms.append(int(i)); ac[int(i)] = HL[colr]
    o.highlightRadius = 0.42
    o.fillHighlights = True
    rdMolDraw2D.PrepareAndDrawMolecule(d, m, highlightAtoms=hl_atoms, highlightBonds=hl_bonds, highlightAtomColors=ac, highlightBondColors=bc)
    d.FinishDrawing()
    svg = d.GetDrawingText()
    pos = [(d.GetDrawCoords(i).x, d.GetDrawCoords(i).y) for i in range(m.GetNumAtoms())]
    inner = re.sub(r"^.*?<svg[^>]*>", "", svg, flags=re.S)
    inner = re.sub(r"</svg>\s*$", "", inner)
    inner = re.sub(r"<rect[^>]*style='opacity:1.0;fill:#FFFFFF[^>]*/>", "", inner)
    inner = re.sub(r"<!-- END OF HEADER -->", "", inner)
    for hexc, var in (("#000000", "currentColor"), ("#141626", "currentColor"), ("#141726", "currentColor"),
                      ("#DB2633", "var(--vx-o, #DB2633)"), ("#B73F0C", "var(--vx-br, #B73F0C)"), ("#2663EA", "var(--vx-n, #2663EA)"),
                      ("#0F8C51", "var(--vx-cl, #0F8C51)"), ("#5B6075", "var(--vx-soft, #5B6075)")):
        inner = inner.replace(hexc, var)
    inner = re.sub(r" class='[^']*'", "", inner)
    return inner, max(w, 40), max(h, 40), pos


def wrap_words(s, n):
    """Greedy word wrap to lines of at most n characters (a longer word gets a line to itself)."""
    lines = []
    for w in s.split():
        if lines and len(lines[-1]) + 1 + len(w) <= n:
            lines[-1] += " " + w
        else:
            lines.append(w)
    return lines or [""]


def text(x, y, s, size=14, weight=600, anchor="middle", fill=None):
    return f'<text x="{x:.1f}" y="{y:.1f}" font-size="{size}" font-weight="{weight}" text-anchor="{anchor}" dominant-baseline="middle" fill="{fill or INK}">{chem.esc(s)}</text>'


def svg(W, H, alt, body):
    t = str(alt).replace("&", "&amp;").replace('"', "&quot;").replace("<", "&lt;")
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" width="{W:.0f}" height="{H:.0f}" role="img" '
            f'aria-label="{t}" style="color:{INK};font-family:inherit;max-width:100%;height:auto">{body}</svg>')


def arrow(x1, y1, x2, y2, colour=None, head=10, both=False):
    colour = colour or INK
    L = math.hypot(x2 - x1, y2 - y1) or 1
    ux, uy = (x2 - x1) / L, (y2 - y1) / L
    def hd(x, y, sx, sy):
        bx, by = x - sx * head, y - sy * head
        return f'<path d="M{x:.1f} {y:.1f} L{bx - sy * head * .45:.1f} {by + sx * head * .45:.1f} L{bx + sy * head * .45:.1f} {by - sx * head * .45:.1f} Z" fill="{colour}"/>'
    s0 = head * 0.9 if both else 0
    return (f'<path d="M{x1 + ux * s0:.1f} {y1 + uy * s0:.1f} L{x2 - ux * head * .9:.1f} {y2 - uy * head * .9:.1f}" stroke="{colour}" stroke-width="2.2" fill="none"/>'
            + hd(x2, y2, ux, uy) + (hd(x1, y1, -ux, -uy) if both else ""))


# ---------------------------------------------------------------- structures
def structures(spec, W, narrow):
    panels = spec["panels"]
    bond = spec.get("bond", [34, 30])[1 if narrow else 0]
    drawn = []
    for p in panels:
        m = mol(p["smiles"])
        for a in m.GetAtoms():
            a.SetAtomMapNum(0)
        drawn.append(draw_mol(m, bond, {"displayed": p.get("displayed"), "highlight": p.get("highlight", []), "cipLabels": p.get("cipLabels"), "rotate": p.get("rotate")}))
    sep = spec.get("between")  # symbols between panels in reading order, e.g. ["+", "→", "+"]
    gap = 44 if sep else 22
    # fit panels into rows no wider than W (scaling a panel down only if it alone is too wide)
    rows, row, x = [], [], 10
    for i, (inner, w, h, pos) in enumerate(drawn):
        lw = max(w, len(panels[i].get("label", "")) * 7.2 + 10, len(panels[i].get("sub", "")) * 6.4 + 10)
        if row and x + lw > W - 10 or (spec.get("perRow") and len(row) >= spec["perRow"][1 if narrow else 0]):
            rows.append(row); row, x = [], 10
        row.append((i, lw)); x += lw + gap
    rows.append(row)
    out, y = [], 16
    for r in rows:
        tot = sum(lw for _, lw in r) + gap * (len(r) - 1)
        x = (W - tot) / 2
        hmax = max(drawn[i][2] for i, _ in r)
        for k, (i, lw) in enumerate(r):
            inner, w, h, pos = drawn[i]
            sc = min(1.0, (W - 20) / w)
            ox, oy = x + (lw - w * sc) / 2, y + (hmax - h * sc) / 2
            out.append(f'<g transform="translate({ox:.1f} {oy:.1f}) scale({sc:.3f})">{inner}</g>')
            p = panels[i]
            if p.get("label"):
                out.append(text(x + lw / 2, y + hmax + 12, p["label"], 13.5, 700))
            if p.get("sub"):
                out.append(text(x + lw / 2, y + hmax + 30, p["sub"], 11.5, 500, fill=SOFT))
            if sep and k < len(r) - 1:
                sym = sep[i] if i < len(sep) else ""
                cx = x + lw + gap / 2
                if sym == "←":
                    out.append(arrow(cx + 16, y + hmax / 2, cx - 16, y + hmax / 2))
                elif sym in ("→", "⇌", "↔"):
                    out.append(arrow(cx - 16, y + hmax / 2, cx + 16, y + hmax / 2, both=(sym == "↔")))
                    if sym == "⇌":
                        out.append(arrow(cx + 16, y + hmax / 2 + 7, cx - 16, y + hmax / 2 + 7))
                else:
                    out.append(text(cx, y + hmax / 2, sym, 20, 700))
                if spec.get("betweenLabels") and i < len(spec["betweenLabels"]) and spec["betweenLabels"][i]:
                    out.append(text(cx, y + hmax / 2 - 22, spec["betweenLabels"][i], 11, 700, fill=A["a2"]))
            x += lw + gap
        y += hmax + (48 if any(panels[i].get("sub") for i, _ in r) else 30)
    if spec.get("legend"):
        lx = 14
        for g in spec["legend"]:
            out.append(f'<rect x="{lx}" y="{y - 6}" width="14" height="14" rx="3" fill="{A[g["colour"]]}" fill-opacity=".35"/>')
            out.append(text(lx + 20, y + 1, g["label"], 12, 600, "start"))
            lx += 34 + len(g["label"]) * 7.2
        y += 22
    if spec.get("note"):
        # wrapped to the width (the carbonate note ran off a phone)
        for line in wrap_words(spec["note"], int((W - 16) / (12 * 0.55))):
            out.append(text(W / 2, y + 4, line, 12, 500, fill=SOFT)); y += 17
        y += 5
    return "".join(out), y + 4


def cip_labels(m):
    rdCIPLabeler.AssignCIPLabels(m)
    atoms = {a.GetAtomMapNum(): a.GetProp("_CIPCode") for a in m.GetAtoms() if a.HasProp("_CIPCode")}
    bonds = {}
    for b in m.GetBonds():
        if b.HasProp("_CIPCode"):
            bonds[f"{b.GetBeginAtom().GetAtomMapNum()}-{b.GetEndAtom().GetAtomMapNum()}"] = b.GetProp("_CIPCode")
    return atoms, bonds


def structure_checks(spec):
    out = []
    mols = []
    for p in spec["panels"]:
        try:
            m = mol(p["smiles"])
        except ValueError as e:
            out.append(ok(f"{p.get('label', p['smiles'])} parses", False, str(e))); mols.append(None); continue
        mols.append(m)
        name = p.get("label") or p["smiles"]
        if p.get("formula"):
            got = formula(m)
            out.append(ok(f"{name}: formula {p['formula']}", norm_formula(p["formula"]) == norm_formula(got), f"RDKit: {got}"))
        for g in p.get("groups", []) + [h["group"] for h in p.get("highlight", []) if h.get("check", True)]:
            patt = Chem.MolFromSmarts(GROUPS.get(g, g))
            out.append(ok(f"{name}: contains {g}", m.HasSubstructMatch(patt)))
        for g in p.get("notGroups", []):
            out.append(ok(f"{name}: has no {g}", not m.HasSubstructMatch(Chem.MolFromSmarts(GROUPS.get(g, g)))))
        if p.get("cip") or p.get("ez"):
            atoms, bonds = cip_labels(Chem.Mol(m))
            for k, v in (p.get("cip") or {}).items():
                out.append(ok(f"{name}: atom {k} is {v}", atoms.get(int(k)) == v, f"RDKit CIP: {atoms.get(int(k))}"))
            for k, v in (p.get("ez") or {}).items():
                out.append(ok(f"{name}: the double bond {k} is {v}", bonds.get(k) == v, f"RDKit CIP: {bonds.get(k)}"))
        if p.get("chiralCentres") is not None:
            n = len(Chem.FindMolChiralCenters(m, includeUnassigned=True, useLegacyImplementation=False))
            out.append(ok(f"{name}: {p['chiralCentres']} chiral centre(s)", n == p["chiralCentres"], f"found {n}"))
        if p.get("environments") is not None:
            ranks = list(Chem.CanonicalRankAtoms(Chem.AddHs(m), breakTies=False))
            hm = Chem.AddHs(m)
            n = len({ranks[a.GetIdx()] for a in hm.GetAtoms() if a.GetSymbol() == "C"})
            out.append(ok(f"{name}: {p['environments']} carbon environment(s)", n == p["environments"], f"found {n}"))
    for c in spec.get("claims", []):
        ms = [mols[i] for i in c.get("panels", range(len(mols)))]
        if None in ms:
            continue
        if c["type"] == "isomers":
            fs = {formula(m) for m in ms}
            smi = {Chem.MolToSmiles(m) for m in ms}
            out.append(ok(f"{', '.join(spec['panels'][i].get('label', '') for i in c.get('panels', range(len(mols))))}: same formula, different compounds",
                          len(fs) == 1 and len(smi) == len(ms), f"formulae {sorted(fs)}; {len(smi)} distinct structures"))
        if c["type"] == "enantiomers":
            a, b = ms
            same_con = Chem.MolToSmiles(a, isomericSmiles=False) == Chem.MolToSmiles(b, isomericSmiles=False)
            ca, cb = cip_labels(Chem.Mol(a))[0], cip_labels(Chem.Mol(b))[0]
            flip = {"R": "S", "S": "R"}
            ra = sorted(ca.values()); rb = sorted(flip.get(v, v) for v in cb.values())
            out.append(ok("the two are enantiomers: same structure, every stereocentre inverted", same_con and ra == rb and Chem.MolToSmiles(a) != Chem.MolToSmiles(b), f"{ra} against {sorted(cb.values())}"))
        if c["type"] == "diastereomers":
            a, b = ms
            same_con = Chem.MolToSmiles(a, isomericSmiles=False) == Chem.MolToSmiles(b, isomericSmiles=False)
            ca, cb = sorted(cip_labels(Chem.Mol(a))[0].items()), sorted(cip_labels(Chem.Mol(b))[0].items())
            flipped = [(k, {"R": "S", "S": "R"}[v]) for k, v in cb]
            out.append(ok("the two are diastereomers: same structure, stereoisomers but not mirror images", same_con and Chem.MolToSmiles(a) != Chem.MolToSmiles(b) and ca != flipped, f"{ca} against {cb}"))
        if c["type"] == "meso":
            m = Chem.Mol(ms[0])
            for a in m.GetAtoms():
                a.SetAtomMapNum(0)
            mirror = Chem.Mol(m)
            for a in mirror.GetAtoms():
                t = a.GetChiralTag()
                if t == Chem.ChiralType.CHI_TETRAHEDRAL_CW: a.SetChiralTag(Chem.ChiralType.CHI_TETRAHEDRAL_CCW)
                elif t == Chem.ChiralType.CHI_TETRAHEDRAL_CCW: a.SetChiralTag(Chem.ChiralType.CHI_TETRAHEDRAL_CW)
            n = len(Chem.FindMolChiralCenters(m))
            out.append(ok(f"{spec['panels'][c['panels'][0]].get('label')} is meso: {n} stereocentres, yet identical to its mirror image", Chem.MolToSmiles(mirror) == Chem.MolToSmiles(m) and n >= 2, Chem.MolToSmiles(m)))
        if c["type"] == "same":
            a, b = ms
            out.append(ok(c.get("name", "the two drawings are the same compound"), Chem.MolToSmiles(a) == Chem.MolToSmiles(b)))
        if c["type"] == "reaction":
            # atoms balance from the panels on the left (indices) to those on the right
            def tot(ix):
                d = {}
                for i in ix:
                    for k, v in parse_formula(formula(mols[i])).items():
                        d[k] = d.get(k, 0) + v * c.get("coef", {}).get(str(i), 1)
                return d
            l, r = tot(c["left"]), tot(c["right"])
            out.append(ok("the equation balances (atoms on both sides)", l == r, f"{l} → {r}"))
        if c["type"] == "series":
            # a homologous series: each member differs from the last by CH2
            fs = [parse_formula(formula(m)) for m in ms]
            good = all(fs[i + 1].get("C", 0) - fs[i].get("C", 0) == 1 and fs[i + 1].get("H", 0) - fs[i].get("H", 0) == 2 for i in range(len(fs) - 1))
            out.append(ok("each member differs from the last by CH₂", good, ", ".join(formula(m) for m in ms)))
        if c["type"] == "general":
            # CnH2n+2 and similar: the general formula fits every member
            fs = [parse_formula(formula(m)) for m in ms]
            k = c["hOffset"]
            out.append(ok(f"every member fits {c['formula']}", all(f.get("H", 0) == 2 * f.get("C", 0) + k for f in fs), ", ".join(formula(m) for m in ms)))
        if c["type"] == "mass":
            m = ms[0]
            out.append(ok(f"Mr = {c['value']}", abs(Descriptors.MolWt(m) - c["value"]) < 0.06, f"{Descriptors.MolWt(m):.2f}"))
    return out


# ---------------------------------------------------------------- nmr
def environments(m, nucleus):
    """Symmetry classes of H (attached to which heavy atom) or of C, from RDKit's canonical ranking without tie-breaking."""
    hm = Chem.AddHs(m)
    ranks = list(Chem.CanonicalRankAtoms(hm, breakTies=False))
    cls = {}
    for a in hm.GetAtoms():
        if nucleus == "1H" and a.GetSymbol() == "H":
            cls.setdefault(ranks[a.GetIdx()], []).append(a.GetIdx())
        if nucleus == "13C" and a.GetSymbol() == "C":
            cls.setdefault(ranks[a.GetIdx()], []).append(a.GetIdx())
    return hm, cls


def nplus1(hm, hidx):
    """n + 1: hydrogens on carbons next to this H's carbon (O–H and N–H hydrogens taken as exchanging, so singlets)."""
    h = hm.GetAtomWithIdx(hidx)
    c = h.GetNeighbors()[0]
    if c.GetSymbol() != "C":
        return 1
    n = 0
    for nb in c.GetNeighbors():
        if nb.GetSymbol() == "C":
            n += sum(1 for x in nb.GetNeighbors() if x.GetSymbol() == "H")
    return n + 1


MULT = {1: "s", 2: "d", 3: "t", 4: "q", 5: "quintet", 6: "sextet", 7: "septet"}


def nmr(spec, W, narrow):
    nuc = spec.get("nucleus", "1H")
    lo, hi = spec.get("range", [0, 12] if nuc == "1H" else [0, 220])
    pad_l, pad_r = 20, 20
    top, base = 30, (250 if not narrow else 230)
    X = lambda ppm: pad_l + (hi - ppm) / (hi - lo) * (W - pad_l - pad_r)
    out = [f'<path d="M{pad_l} {base} L{W - pad_r} {base}" stroke="{INK}" stroke-width="1.6"/>']
    step = 1 if nuc == "1H" and hi - lo <= 12 else 2 if nuc == "1H" else 20
    t = math.ceil(lo / step) * step
    while t <= hi + 1e-9:
        out.append(f'<path d="M{X(t):.1f} {base} L{X(t):.1f} {base + 5}" stroke="{INK}" stroke-width="1.2"/>')
        out.append(text(X(t), base + 16, f"{t:g}", 11, 500, fill=SOFT))
        t += step
    out.append(text(W - pad_r, base + 34, "chemical shift, δ / ppm", 12, 600, "end", SOFT))
    if spec.get("tms", True):
        out.append(f'<path d="M{X(0):.1f} {base} L{X(0):.1f} {base - 40}" stroke="{SOFT}" stroke-width="2"/>'); out.append(text(X(0) - 2, base - 50, "TMS", 10.5, 700, "end", SOFT))
    colours = ["a1", "a2", "a4", "a3", "a5", "a1", "a2"]
    maxn = max((p.get("n", 1) for p in spec["peaks"]), default=1)
    for i, p in enumerate(spec["peaks"]):
        colr = A[p.get("colour", colours[i % len(colours)])]
        mult = {"s": 1, "d": 2, "t": 3, "q": 4, "quintet": 5, "sextet": 6, "septet": 7, "m": 5}.get(p.get("split", "s"), 1) if nuc == "1H" else 1
        hgt = (base - top - 30) * (0.35 + 0.65 * p.get("n", 1) / maxn)
        pascal = [math.comb(mult - 1, k) for k in range(mult)]
        sp = 0.06 * (12 / (hi - lo)) if nuc == "1H" else 0
        for k, c in enumerate(pascal):
            xx = X(p["shift"] + (k - (mult - 1) / 2) * sp)
            hh = hgt * c / max(pascal)
            out.append(f'<path d="M{xx:.1f} {base} L{xx:.1f} {base - hh:.1f}" stroke="{colr}" stroke-width="{2.2 if mult > 1 else 3}"/>')
        lab = p.get("label") or (f"{p['n']}H {MULT.get(mult, 'm')}" if nuc == "1H" else "")
        out.append(text(X(p["shift"]), base - hgt - 22, f"{p['shift']:.1f}" if nuc == "1H" else f"{p['shift']:g}", 11.5, 700, fill=colr))
        if lab:
            out.append(text(X(p["shift"]), base - hgt - 8, lab, 11, 600, fill=colr))
    H = base + 44
    if spec.get("molecule"):
        m = mol(spec["molecule"])
        colouring = {}
        for i, p in enumerate(spec["peaks"]):
            for a in p.get("atoms", []):
                colouring[a] = p.get("colour", colours[i % len(colours)])
        for a in m.GetAtoms():
            a.SetAtomMapNum(0)
        inner, w, h, pos = draw_mol(m, 30 if narrow else 34, {"atomColours": colouring, "displayed": spec.get("displayed", False)})
        # the structure below the spectrum, its atoms shaded in each peak's colour
        out.append(f'<g transform="translate({(W - w) / 2:.1f} {H})">{inner}</g>'); H += h + 10
    return "".join(out), H


def nmr_checks(spec):
    out = []
    if not spec.get("molecule"):
        return [ok("spectrum drawn", True)]
    nuc = spec.get("nucleus", "1H")
    m = mol(spec["molecule"])
    hm, cls = environments(m, nuc)
    peaks = spec["peaks"]
    out.append(ok(f"{len(peaks)} peaks: {len(cls)} {'hydrogen' if nuc == '1H' else 'carbon'} environments by symmetry", len(cls) == len(peaks), f"classes of sizes {sorted(len(v) for v in cls.values())}"))
    # match peaks to classes through the heavy atom indices in `atoms` (atom indices in the SMILES as written)
    for p in peaks:
        if not p.get("atoms"):
            continue
        if nuc == "1H":
            hs = [nb.GetIdx() for a in p["atoms"] for nb in hm.GetAtomWithIdx(a).GetNeighbors() if nb.GetSymbol() == "H"]
            ranks = {r for r, idx in cls.items() if any(i in idx for i in hs)}
            size = sum(len(cls[r]) for r in ranks)
            out.append(ok(f"δ {p['shift']}: {p['n']}H in one environment", len(ranks) == 1 and size == p["n"] and set(cls[next(iter(ranks))]) == set(hs), f"{size} H in {len(ranks)} class(es)"))
            if p.get("split") and hs:
                n1 = nplus1(hm, hs[0])
                out.append(ok(f"δ {p['shift']}: {p['split']} by the n + 1 rule", MULT.get(n1, "m") == p["split"], f"{n1 - 1} neighbouring H → {MULT.get(n1, 'm')}"))
        else:
            ranks = {r for r, idx in cls.items() if any(i in idx for i in p["atoms"])}
            out.append(ok(f"δ {p['shift']}: one carbon environment", len(ranks) == 1 and set(cls[next(iter(ranks))]) == set(p["atoms"])))
        if p.get("env"):
            rng = (H_RANGES if nuc == "1H" else C_RANGES)[p["env"]]
            out.append(ok(f"δ {p['shift']} lies in the {p['env']} range ({rng[0]}–{rng[1]} ppm)", rng[0] <= p["shift"] <= rng[1]))
    if nuc == "1H":
        total = sum(1 for a in hm.GetAtoms() if a.GetSymbol() == "H")
        out.append(ok(f"integrations add up to the {total} hydrogens in {formula(m)}", sum(p["n"] for p in peaks) == total))
    return out


# ---------------------------------------------------------------- ms
def mass_nominal(f):
    return sum(NOMINAL[k] * v for k, v in parse_formula(f).items())


def ms(spec, W, narrow):
    lo, hi = spec.get("range", [0, max(p["mz"] for p in spec["peaks"]) + 10])
    pl, pr, top, base = 46, 16, 56, 280
    X = lambda v: pl + (v - lo) / (hi - lo) * (W - pl - pr)
    Y = lambda r: base - r / 100 * (base - top)
    out = [f'<path d="M{pl} {base} L{W - pr} {base} M{pl} {base} L{pl} {top - 6}" stroke="{INK}" stroke-width="1.6" fill="none"/>']
    for r in (0, 50, 100):
        out.append(text(pl - 8, Y(r), str(r), 11, 500, "end", SOFT))
    # ticks by index, not by adding the step (0.01 steps drift: 27.990000000000002), with the step's decimals; on a
    # narrow axis every k-th label is kept so neighbours never touch
    step = spec.get("tick", 10)
    # decimals from the step as written (0.25 → 2, 2.5 → 1, 0.01 → 2), not from its magnitude
    dec = max(0, -decimal.Decimal(str(step)).normalize().as_tuple().exponent)
    first, n = math.ceil(lo / step - 1e-9), math.floor(hi / step + 1e-9)
    labw = max(len(f"{v * step:.{dec}f}") for v in (first, n)) * 6.6 + 8
    every = max(1, math.ceil(labw / max(1e-9, X(step) - X(0))))
    for i in range(first, n + 1):
        t = i * step
        out.append(f'<path d="M{X(t):.1f} {base} L{X(t):.1f} {base + 4}" stroke="{INK}" stroke-width="1.2"/>')
        if (i - first) % every == 0:
            out.append(text(X(t), base + 16, f"{t:.{dec}f}", 11, 500, fill=SOFT))
    out.append(text(W - pr, base + 34, "m/z", 12, 600, "end", SOFT))
    out.append(text(pl - 4, top - 18, "relative abundance / %", 12, 600, "start", SOFT))
    for p in spec["peaks"]:
        colr = A[p.get("colour", "a1")]
        out.append(f'<path d="M{X(p["mz"]):.1f} {base} L{X(p["mz"]):.1f} {Y(p["rel"]):.1f}" stroke="{colr}" stroke-width="3"/>')
        out.append(text(X(p["mz"]), Y(p["rel"]) - 10, str(p["mz"]), 11.5, 700, fill=colr))
        if p.get("label"):
            out.append(text(X(p["mz"]) + p.get("dx", 0), Y(p["rel"]) - 26, p["label"], 11, 600, fill=colr))
    H = base + 44
    for n in spec.get("notes", []):
        for line in wrap_words(n, int((W - 16) / (12 * 0.57))):
            out.append(text(W / 2, H + 4, line, 12, 600, fill=INK)); H += 18
        H += 2
    if spec.get("table"):
        for row in spec["table"]:
            out.append(text(W / 2, H + 6, row, 12.5, 600)); H += 20
    return "".join(out), H + 6


def ms_checks(spec):
    out = []
    if spec.get("kind") == "isotopes":
        tot = sum(p["rel"] for p in spec["peaks"])
        ar = sum(p["mass"] * p["rel"] for p in spec["peaks"]) / tot
        out.append(ok(f"Ar = Σ(mass × abundance) ÷ Σ abundance = {spec['ar']}", abs(ar - spec["ar"]) < 0.01, f"{ar:.3f}"))
        return out
    if spec.get("kind") == "hrms":
        for p in spec["species"]:
            mm = sum(MONO[k] * v for k, v in parse_formula(p["formula"]).items())
            out.append(ok(f"{p['formula']}: accurate mass {p['mass']}", abs(mm - p["mass"]) < 0.00015, f"{mm:.4f}"))
            out.append(ok(f"{p['formula']}: nominal mass {p['nominal']}", mass_nominal(p["formula"]) == p["nominal"]))
        return out
    m = mol(spec["molecule"]) if spec.get("molecule") else None
    whole = parse_formula(formula(m)) if m else {}
    for p in spec["peaks"]:
        if not p.get("ion"):
            continue
        f = parse_formula(p["ion"])
        out.append(ok(f"m/z {p['mz']} is {p['ion']}", mass_nominal(p["ion"]) == p["mz"], f"mass {mass_nominal(p['ion'])}"))
        if whole:
            out.append(ok(f"{p['ion']} can come from {formula(m)}", all(whole.get(k, 0) >= v for k, v in f.items())))
    if m and spec.get("molecularIon"):
        out.append(ok(f"molecular ion at m/z {spec['molecularIon']}", mass_nominal(formula(m)) == spec["molecularIon"], f"{formula(m)}: {mass_nominal(formula(m))}"))
    if spec.get("base"):
        b = max(spec["peaks"], key=lambda p: p["rel"])
        out.append(ok(f"base peak at m/z {spec['base']}", b["mz"] == spec["base"] and b["rel"] == 100))
    return out


# ---------------------------------------------------------------- ir
def ir(spec, W, narrow):
    pl, pr, top, base = 40, 16, 30, 240
    X = lambda v: pl + (4000 - v) / 3500 * (W - pl - pr)
    Y = lambda t: base - t / 100 * (base - top)
    out = [f'<path d="M{pl} {base} L{W - pr} {base} M{pl} {base} L{pl} {top - 6}" stroke="{INK}" stroke-width="1.6" fill="none"/>']
    for v in range(4000, 499, -500):
        out.append(text(X(v), base + 16, str(v), 10.5 if narrow else 11, 500, fill=SOFT))
    out.append(text(W - pr, base + 34, "wavenumber / cm⁻¹", 12, 600, "end", SOFT))
    out.append(text(pl - 4, top - 18, "transmittance / %", 12, 600, "start", SOFT))
    pts = []
    for i in range(701):
        v = 4000 - i * 5
        t = 92
        for b in spec["bands"]:
            t -= b["depth"] * math.exp(-((v - b["wn"]) / (b.get("width", 30) / 2)) ** 2)
        pts.append((X(v), Y(max(2, t))))
    out.append('<path d="' + " ".join(("M" if i == 0 else "L") + f"{x:.1f} {y:.1f}" for i, (x, y) in enumerate(pts)) + f'" fill="none" stroke="{A["a1"]}" stroke-width="2"/>')
    if not narrow:
        out.append(f'<rect x="{X(1500):.1f}" y="{top}" width="{X(500) - X(1500):.1f}" height="{base - top}" fill="{SOFT}" fill-opacity=".07"/>')
        out.append(text((X(1500) + X(500)) / 2, top + 10, "fingerprint region", 11, 600, fill=SOFT))
    for b in spec["bands"]:
        if b.get("label"):
            out.append(text(X(b["wn"]) + b.get("dx", 0), Y(92 - b["depth"]) + 14 + b.get("dy", 0), b["label"], 11.5, 700, fill=A["a2"]))
    H = base + 44
    if spec.get("molecule") and not narrow:
        m = mol(spec["molecule"])
        inner, w, h, pos = draw_mol(m, 30, {"highlight": spec.get("highlight", [])})
        out.append(f'<g transform="translate({W - w - 30:.1f} {top + 40:.1f})">{inner}</g>')
    return "".join(out), H


def ir_checks(spec):
    out = []
    m = Chem.AddHs(mol(spec["molecule"])) if spec.get("molecule") else None
    for b in spec["bands"]:
        if not b.get("bond"):
            continue
        lo, hi = IR_RANGES[b["bond"]]
        out.append(ok(f"{b['bond']} at {b['wn']} cm⁻¹ lies in {lo}–{hi} cm⁻¹", lo <= b["wn"] <= hi))
        if m is not None:
            out.append(ok(f"the molecule has an {b['bond']} bond", m.HasSubstructMatch(Chem.MolFromSmarts(IR_BOND[b["bond"]]))))
    for g in spec.get("absent", []):
        out.append(ok(f"no {g} band, and the molecule has no {g} bond", m is not None and not m.HasSubstructMatch(Chem.MolFromSmarts(IR_BOND[g])) and not any(b.get("bond") == g for b in spec["bands"])))
    return out


R = {"structures": (structures, structure_checks), "nmr": (nmr, nmr_checks), "ms": (ms, ms_checks), "ir": (ir, ir_checks)}


def main():
    spec = json.loads(open(sys.argv[1]).read())
    draw, checks = R[spec["renderer"]]
    try:
        cs = checks(spec)
    except Exception as e:  # a spec RDKit cannot read fails its checks instead of crashing the build
        cs = [ok("the chemistry could be read", False, repr(e))]
    res = {"checks": cs}
    for tag, W in (("wide", 680), ("narrow", 380)):
        try:
            body, H = draw(spec, W, tag == "narrow")
            res[tag] = svg(W, H, spec.get("alt", spec.get("title", "")), body)
        except Exception as e:
            res[tag] = ""
            res["checks"].append(ok(f"{tag} layout drawn", False, repr(e)))
    print(json.dumps(res))


if __name__ == "__main__":
    main()
