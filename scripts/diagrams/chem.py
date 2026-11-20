#!/usr/bin/env python3
"""Gradify Visual Learning Engine: chemistry renderer and validator.

Reads one mechanism or structure spec (JSON on stdin or a path), and writes JSON to stdout:
  { "wide": "<svg…>", "narrow": "<svg…>", "checks": [ {"name", "ok", "detail"} ] }

What it checks (a rendered picture is not evidence of correct chemistry, so these run on the chemistry itself):
  * every species parses and sanitises in RDKit (valence, charges)
  * atoms and total charge are conserved from stage to stage (by atom-map number)
  * curly arrows: each starts at real electrons (a lone pair that exists, or a bond that exists), never at an atom
    with no lone pairs; and applying the arrows' electron bookkeeping to stage i gives exactly stage i+1
    (same bonds, bond orders, charges and hydrogen counts on every mapped atom)
  * CIP labels (R/S) the spec claims are the ones RDKit assigns

Spec (see kit/diagrams/specs/chem-*.json):
  stages: [ { smiles (atom-mapped, all atoms), xy: {map: [x, y]} in bond lengths, label?, ts?: true,
              cip?: {map: "R"|"S"}, arrows?: [ {from: {lp: m} | {bond: [m, n]}, to: {atom: m} | {bond: [m, n]},
              bend?: ±1, lpAngle?: degrees} ], partial?: [[m, n]], charges?: {map: "δ+"} } ]
  steps: [ { label?, below? } ]  between stage i and i+1
"""
import json, math, sys, re
from rdkit import Chem, RDLogger
from rdkit.Chem import rdCIPLabeler
from rdkit.Chem.Draw import rdMolDraw2D
from rdkit.Geometry import Point3D

RDLogger.DisableLog("rdApp.*")
BOND = 46.0  # pixels per bond length
PT = Chem.GetPeriodicTable()
VALENCE_E = {1: 1, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7, 15: 5, 16: 6, 17: 7, 35: 7, 53: 7, 11: 1, 3: 1, 12: 2}
PALETTE = {6: (0.08, 0.09, 0.15), 8: (0.86, 0.15, 0.2), 7: (0.15, 0.39, 0.92), 35: (0.72, 0.25, 0.05), 17: (0.06, 0.55, 0.32),
           9: (0.06, 0.55, 0.32), 53: (0.49, 0.23, 0.82), 16: (0.79, 0.54, 0.02), 1: (0.36, 0.38, 0.46)}
E_COLOUR = "var(--vx-e, #db2777)"
INK = "var(--vx-ink, #151826)"
SOFT = "var(--vx-soft, #5b6275)"


def parse(smiles):
    p = Chem.SmilesParserParams()
    p.removeHs = False
    m = Chem.MolFromSmiles(smiles, p)
    if m is None:
        raise ValueError(f"RDKit cannot parse {smiles}")
    return m


def state(m):
    """Electron bookkeeping keyed by atom-map number."""
    atoms, bonds = {}, {}
    for a in m.GetAtoms():
        k = a.GetAtomMapNum()
        if not k:
            raise ValueError(f"every atom needs a map number ({a.GetSymbol()} has none)")
        atoms[k] = {"z": a.GetAtomicNum(), "q": a.GetFormalCharge(), "h": a.GetTotalNumHs(includeNeighbors=False),
                    "rad": a.GetNumRadicalElectrons()}
    for b in m.GetBonds():
        i, j = b.GetBeginAtom().GetAtomMapNum(), b.GetEndAtom().GetAtomMapNum()
        bonds[frozenset((i, j))] = int(b.GetBondTypeAsDouble())
    for k, a in atoms.items():
        order = sum(o for p, o in bonds.items() if k in p)
        a["lp"] = (VALENCE_E[a["z"]] - a["q"] - order - a["h"] - a["rad"]) // 2
    return atoms, bonds


def push(atoms, bonds, arrows):
    """Apply two-electron curly arrows; return the new state and any rule breaks."""
    atoms = {k: dict(v) for k, v in atoms.items()}
    bonds = dict(bonds)
    errs = []
    for n, ar in enumerate(arrows, 1):
        src, dst = ar["from"], ar["to"]
        if "lp" in src:
            a = atoms[src["lp"]]
            if a["lp"] < 1:
                errs.append(f"arrow {n} starts at atom {src['lp']}, which has no lone pair to give")
            a["lp"] -= 1
        else:
            key = frozenset(src["bond"])
            if bonds.get(key, 0) < 1:
                errs.append(f"arrow {n} starts at bond {src['bond']}, which does not exist")
            bonds[key] = bonds.get(key, 0) - 1
            if bonds[key] <= 0:
                bonds.pop(key, None)
        if "atom" in dst:
            atoms[dst["atom"]]["lp"] += 1
        else:
            key = frozenset(dst["bond"])
            bonds[key] = bonds.get(key, 0) + 1
    for k, a in atoms.items():
        order = sum(o for p, o in bonds.items() if k in p)
        a["q"] = VALENCE_E[a["z"]] - 2 * a["lp"] - order - a["h"] - a["rad"]
        if a["z"] in (6, 7, 8) and order + a["h"] + a["lp"] > 4:
            errs.append(f"atom {k} would exceed an octet ({PT.GetElementSymbol(a['z'])} with {order + a['h']} bonds and {a['lp']} lone pairs)")
    return atoms, bonds, errs


def compare(pred, actual):
    (pa, pb), (aa, ab) = pred, actual
    out = []
    if set(pa) != set(aa):
        out.append(f"atoms differ: {sorted(set(pa) ^ set(aa))}")
    for k in sorted(set(pa) & set(aa)):
        for f in ("z", "q", "h"):
            if pa[k][f] != aa[k][f]:
                out.append(f"atom {k}: arrows give {f}={pa[k][f]}, next stage has {aa[k][f]}")
    for key in set(pb) | set(ab):
        if pb.get(key) != ab.get(key):
            out.append(f"bond {sorted(key)}: arrows give order {pb.get(key, 0)}, next stage has {ab.get(key, 0)}")
    return out


def validate(spec):
    checks = []
    mols = []
    for i, st in enumerate(spec["stages"]):
        try:
            m = parse(st["smiles"])
            Chem.SanitizeMol(m)
            mols.append(m)
            if st.get("ts"):
                checks.append({"name": f"stage {i + 1} is a transition state", "ok": True, "detail": "drawn for illustration: partial bonds dashed, not validated as a species"})
                continue
            checks.append({"name": f"stage {i + 1} is a valid structure", "ok": True, "detail": Chem.MolToSmiles(m)})
        except Exception as e:  # noqa: BLE001
            mols.append(None)
            checks.append({"name": f"stage {i + 1} is a valid structure", "ok": False, "detail": str(e)})
    real = [(i, m) for i, m in enumerate(mols) if m is not None]
    for i, m in real:
        cip = spec["stages"][i].get("cip")
        if cip:
            rdCIPLabeler.AssignCIPLabels(m)
            got = {str(a.GetAtomMapNum()): a.GetPropsAsDict().get("_CIPCode") for a in m.GetAtoms()}
            bad = {k: (v, got.get(k)) for k, v in cip.items() if got.get(k) != v}
            checks.append({"name": f"stage {i + 1} CIP labels", "ok": not bad,
                           "detail": "as stated: " + ", ".join(f"atom {k} is {v}" for k, v in cip.items()) if not bad else f"stated vs RDKit: {bad}"})
    # conservation and arrows, between chemical stages (a transition state is illustrative and is skipped)
    chem = [(i, m) for i, m in real if not spec["stages"][i].get("ts")]
    for (i, m), (j, n) in zip(chem, chem[1:]):
        sa, sb = state(m), state(n)
        qa, qb = sum(a["q"] for a in sa[0].values()), sum(a["q"] for a in sb[0].values())
        za = sorted((k, a["z"]) for k, a in sa[0].items())
        zb = sorted((k, a["z"]) for k, a in sb[0].items())
        ha = sum(a["h"] for a in sa[0].values())
        hb = sum(a["h"] for a in sb[0].values())
        checks.append({"name": f"stages {i + 1}→{j + 1} conserve atoms and charge", "ok": qa == qb and za == zb and ha == hb,
                       "detail": f"charge {qa}→{qb}, implicit H {ha}→{hb}"})
        arrows = spec["stages"][i].get("arrows", [])
        if arrows:
            pa, pb, errs = push(*sa, arrows)
            diff = compare((pa, pb), sb)
            checks.append({"name": f"curly arrows on stage {i + 1} give stage {j + 1}", "ok": not errs and not diff,
                           "detail": "; ".join(errs + diff) or f"{len(arrows)} arrow(s): electron bookkeeping matches every bond and charge"})
    return checks, mols


# ---------------------------------------------------------------- drawing
def draw_stage(st, mol):
    """One stage as an SVG fragment in its own pixel box; returns (svg_inner, width, height, atom_xy_by_map)."""
    m = Chem.RWMol(mol)
    for pair in st.get("partial", []):
        idx = {a.GetAtomMapNum(): a.GetIdx() for a in m.GetAtoms()}
        i, j = idx[pair[0]], idx[pair[1]]
        if m.GetBondBetweenAtoms(i, j) is None:
            m.AddBond(i, j, Chem.BondType.ZERO)
    conf = Chem.Conformer(m.GetNumAtoms())
    xy = {int(k): v for k, v in st["xy"].items()}
    for a in m.GetAtoms():
        x, y = xy[a.GetAtomMapNum()]
        conf.SetAtomPosition(a.GetIdx(), Point3D(x, y, 0))
    m.RemoveAllConformers()
    m.AddConformer(conf, assignId=True)
    if st.get("ts"):
        for a in m.GetAtoms():
            a.SetNumRadicalElectrons(0); a.SetNoImplicit(True)
    maps = {a.GetIdx(): a.GetAtomMapNum() for a in m.GetAtoms()}
    for a in m.GetAtoms():
        a.SetAtomMapNum(0)
    xs = [v[0] for v in xy.values()]
    ys = [v[1] for v in xy.values()]
    pad = 0.6
    w = int((max(xs) - min(xs) + 2 * pad) * BOND)
    h = int((max(ys) - min(ys) + 2 * pad) * BOND)
    d = rdMolDraw2D.MolDraw2DSVG(w, h)
    o = d.drawOptions()
    o.fixedBondLength = BOND
    o.padding = 0.0
    o.clearBackground = False
    o.bondLineWidth = 2
    o.minFontSize = 19
    o.maxFontSize = 21
    o.addStereoAnnotation = False
    o.updateAtomPalette(PALETTE)
    o.setBackgroundColour((1, 1, 1, 0))
    # an explicitly given geometry is kept as drawn; RDKit chooses wedges that match the stereochemistry
    from rdkit.Chem.Draw import rdMolDraw2D as R
    pm = R.PrepareMolForDrawing(m, kekulize=True, addChiralHs=False, wedgeBonds=True)
    d.DrawMolecule(pm)
    d.FinishDrawing()
    svg = d.GetDrawingText()
    pos = {maps[i]: (d.GetDrawCoords(i).x, d.GetDrawCoords(i).y) for i in range(m.GetNumAtoms())}
    inner = re.sub(r"^.*?<svg[^>]*>", "", svg, flags=re.S)
    inner = re.sub(r"</svg>\s*$", "", inner)
    inner = re.sub(r"<rect[^>]*style='opacity:1.0;fill:#FFFFFF[^>]*/>", "", inner)
    inner = re.sub(r"<!-- END OF HEADER -->", "", inner)
    # atom colours become theme tokens, so the structure stays legible in dark mode (kit/styles/components.css .vx)
    for hexc, var in (("#000000", "currentColor"), ("#141626", "currentColor"), ("#141726", "currentColor"),
                      ("#DB2633", "var(--vx-o, #DB2633)"), ("#B73F0C", "var(--vx-br, #B73F0C)"), ("#2663EA", "var(--vx-n, #2663EA)"),
                      ("#0F8C51", "var(--vx-cl, #0F8C51)"), ("#5B6075", "var(--vx-soft, #5B6075)")):
        inner = inner.replace(hexc, var)
    inner = re.sub(r" class='[^']*'", "", inner)
    return inner, w, h, pos


def ctrl(p0, p1, bend):
    mx, my = (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2
    dx, dy = p1[0] - p0[0], p1[1] - p0[1]
    L = math.hypot(dx, dy) or 1
    k = 0.55 * L * bend
    return mx - dy / L * k, my + dx / L * k


def toward(a, b, dist):
    dx, dy = b[0] - a[0], b[1] - a[1]
    L = math.hypot(dx, dy) or 1
    return a[0] + dx / L * dist, a[1] + dy / L * dist


def arrows_svg(st, pos, ox, oy):
    out = []
    for n, ar in enumerate(st.get("arrows", [])):
        bend = ar.get("bend", 1)
        src, dst = ar["from"], ar["to"]
        # where the electrons are drawn coming from
        if "lp" in src:
            a = pos[src["lp"]]
            ang = math.radians(ar.get("lpAngle", -90))
            c = (a[0] + math.cos(ang) * 15, a[1] + math.sin(ang) * 15)
            px, py = -math.sin(ang) * 3.6, math.cos(ang) * 3.6
            out.append(f'<circle cx="{c[0] + px + ox:.1f}" cy="{c[1] + py + oy:.1f}" r="2.4" fill="{E_COLOUR}"/><circle cx="{c[0] - px + ox:.1f}" cy="{c[1] - py + oy:.1f}" r="2.4" fill="{E_COLOUR}"/>')
            p0 = (c[0] + math.cos(ang) * 5, c[1] + math.sin(ang) * 5)
        else:
            a, b = pos[src["bond"][0]], pos[src["bond"][1]]
            p0 = ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
        # where they go: to an atom (it gains a lone pair) or towards a new bond (drawn ending near the atom attacked)
        if "atom" in dst and "bond" in src:
            # a bond breaking towards an atom: start on the bond, finish just beyond the atom on the bend side
            t = pos[dst["atom"]]
            o = pos[[k for k in src["bond"] if k != dst["atom"]][0]]
            ux, uy = t[0] - o[0], t[1] - o[1]
            L = math.hypot(ux, uy) or 1
            ux, uy = ux / L, uy / L
            nx, ny = -uy * bend, ux * bend
            p0 = (p0[0] - nx * 5, p0[1] - ny * 5)
            p1 = (t[0] - nx * 17 + ux * 4, t[1] - ny * 17 + uy * 4)
            bend = -bend * 0.9
        elif "atom" in dst:
            t = pos[dst["atom"]]
            p1 = toward(t, p0, 15)
        else:
            i, j = dst["bond"]
            near = pos[j] if ar.get("toward", j) == j else pos[i]
            far = pos[i] if near is pos[j] else pos[j]
            p1 = toward(near, far, 17) if "lp" in src and src["lp"] in (i, j) else ((pos[i][0] + pos[j][0]) / 2, (pos[i][1] + pos[j][1]) / 2)
            if "lp" in src and src["lp"] in (i, j):
                p1 = toward(near, p0, 16)
            elif "toward" in ar:
                p1 = toward(pos[ar["toward"]], p0, 15)
        cx, cy = ctrl(p0, p1, bend)
        # stop the curve a little short so the head sits on the target
        hx, hy = p1[0] - cx, p1[1] - cy
        L = math.hypot(hx, hy) or 1
        ux, uy = hx / L, hy / L
        tip = (p1[0] + ox, p1[1] + oy)
        base = (p1[0] - ux * 9 + ox, p1[1] - uy * 9 + oy)
        head = f'M{tip[0]:.1f} {tip[1]:.1f} L{base[0] - uy * 4.6:.1f} {base[1] + ux * 4.6:.1f} L{base[0] + uy * 4.6:.1f} {base[1] - ux * 4.6:.1f} Z'
        out.append(f'<path d="M{p0[0] + ox:.1f} {p0[1] + oy:.1f} Q{cx + ox:.1f} {cy + oy:.1f} {base[0]:.1f} {base[1]:.1f}" fill="none" stroke="{E_COLOUR}" stroke-width="2.2" stroke-linecap="round"/>')
        out.append(f'<path d="{head}" fill="{E_COLOUR}"/>')
    for k, txt in st.get("charges", {}).items():
        a = pos[int(k)]
        dx, dy = st.get("chargeOffset", {}).get(k, [12, -16])
        out.append(f'<text x="{a[0] + dx + ox:.1f}" y="{a[1] + dy + oy:.1f}" font-size="13" font-style="italic" fill="{SOFT}" text-anchor="middle">{txt}</text>')
    return "".join(out)


def esc(s):
    return str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def compose(spec, mols, narrow=False):
    stages = spec["stages"]
    drawn = [draw_stage(st, m) for st, m in zip(stages, mols)]
    gap = 84 if not narrow else 74
    parts, x, y = [], 20, 20
    W = H = 0
    if not narrow:
        hmax = max(h for _, _, h, _ in drawn)
        for i, (inner, w, h, pos) in enumerate(drawn):
            oy = 34 + (hmax - h) / 2
            parts.append(stage_svg(stages[i], inner, w, h, pos, x, oy))
            x += w
            if i < len(drawn) - 1:
                parts.append(step_arrow(spec, i, x + 10, 34 + hmax / 2, x + gap - 10, 34 + hmax / 2))
                x += gap
        W, H = x + 20, hmax + 34 + 44
    else:
        wmax = max(w for _, w, _, _ in drawn)
        y = 30
        for i, (inner, w, h, pos) in enumerate(drawn):
            ox = 20 + (wmax - w) / 2
            parts.append(stage_svg(stages[i], inner, w, h, pos, ox, y))
            y += h + (30 if stages[i].get("label") else 0)
            if i < len(drawn) - 1:
                parts.append(step_arrow(spec, i, 20 + wmax / 2, y + 8, 20 + wmax / 2, y + gap - 8, vertical=True))
                y += gap
        W, H = wmax + 40, y + 30
    title = esc(spec.get("alt", spec.get("title", "")))
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" width="{W:.0f}" height="{H:.0f}" role="img" '
            f'aria-label="{title}" style="color:{INK};font-family:inherit">' + "".join(parts) + "</svg>")


def stage_svg(st, inner, w, h, pos, ox, oy):
    s = f'<g transform="translate({ox:.1f} {oy:.1f})">{inner}</g>' + arrows_svg(st, pos, ox, oy)
    if st.get("ts"):
        b = 10
        s += (f'<path d="M{ox + b:.1f} {oy:.1f} h-8 v{h:.1f} h8 M{ox + w - b:.1f} {oy:.1f} h8 v{h:.1f} h-8" fill="none" stroke="currentColor" stroke-width="1.8"/>'
              f'<text x="{ox + w + 6:.1f}" y="{oy + 8:.1f}" font-size="18" fill="currentColor">‡</text>')
    if st.get("label"):
        s += f'<text x="{ox + w / 2:.1f}" y="{oy + h + 22:.1f}" font-size="15" font-weight="600" fill="{SOFT}" text-anchor="middle">{esc(st["label"])}</text>'
    for p in st.get("plus", []):
        a = (ox + (p[0] - min(v[0] for v in st["xy"].values()) + 0.9) * BOND, oy + (max(v[1] for v in st["xy"].values()) - p[1] + 0.9) * BOND)
        s += f'<text x="{a[0]:.1f}" y="{a[1] + 6:.1f}" font-size="20" fill="currentColor" text-anchor="middle">+</text>'
    return s


def step_arrow(spec, i, x0, y0, x1, y1, vertical=False):
    step = (spec.get("steps") or [{}] * 10)[i] if i < len(spec.get("steps", [])) else {}
    s = (f'<path d="M{x0:.1f} {y0:.1f} L{x1 - (0 if vertical else 9):.1f} {y1 - (9 if vertical else 0):.1f}" stroke="currentColor" stroke-width="2"/>'
         f'<path d="M{x1:.1f} {y1:.1f} l{"-5 -10 l10 0" if vertical else "-10 -5 l0 10"} Z" fill="currentColor"/>')
    if vertical:
        if step.get("label"):
            s += f'<text x="{x0 + 14:.1f}" y="{(y0 + y1) / 2 - 2:.1f}" font-size="13" font-weight="600" fill="{SOFT}">{esc(step["label"])}</text>'
        if step.get("below"):
            s += f'<text x="{x0 + 14:.1f}" y="{(y0 + y1) / 2 + 15:.1f}" font-size="12" fill="{SOFT}">{esc(step["below"])}</text>'
    else:
        if step.get("label"):
            s += f'<text x="{(x0 + x1) / 2:.1f}" y="{y0 - 10:.1f}" font-size="13" font-weight="600" fill="{SOFT}" text-anchor="middle">{esc(step["label"])}</text>'
        if step.get("below"):
            s += f'<text x="{(x0 + x1) / 2:.1f}" y="{y0 + 20:.1f}" font-size="12" fill="{SOFT}" text-anchor="middle">{esc(step["below"])}</text>'
    return s


def main():
    src = open(sys.argv[1]).read() if len(sys.argv) > 1 else sys.stdin.read()
    spec = json.loads(src)
    checks, mols = validate(spec)
    if any(m is None for m in mols):
        print(json.dumps({"checks": checks, "wide": "", "narrow": ""}))
        return
    print(json.dumps({"checks": checks, "wide": compose(spec, mols), "narrow": compose(spec, mols, narrow=True)}))


if __name__ == "__main__":
    main()
