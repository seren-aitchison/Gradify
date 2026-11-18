#!/usr/bin/env python3
"""Gradify's visual pipeline, end to end, for molecules:

  1. structure   build_molecules.py: RDKit 3D structures, each checked (formula, stereochemistry, bond lengths, clashes)
  2. render      blender_molecule.py, in Blender: a ball-and-stick .glb for the browser and a studio .webp still
  3. publish     kit/visuals/molecules/<id>.glb, <id>.webp, and index.json (structure, measured geometry, the checks,
                 and the review status) for the viewer, the Visualise tool and the visual index

Only molecules that pass every automated check reach step 2. "Automated checks passed" is not expert review: every
asset is published with review "pending" until a chemist signs it off (reviews.json), and the viewer says so.
Usage: python3 scripts/visuals/build.py            (needs RDKit, numpy and Blender 4 on the PATH)
"""
import json, os, shutil, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(HERE, "out"); PUB = os.path.join(ROOT, "kit", "visuals", "molecules")
REVIEWS = os.path.join(HERE, "reviews.json")

subprocess.run([sys.executable, os.path.join(HERE, "build_molecules.py")], check=True)
os.makedirs(PUB, exist_ok=True)
reviews = json.load(open(REVIEWS)) if os.path.exists(REVIEWS) else {}
src = json.load(open(os.path.join(HERE, "molecules.json")))["molecules"]
index = []
for m in src:
    data = json.load(open(os.path.join(OUT, f"{m['id']}.json")))
    if not data["ok"]:
        print(f"skip {m['id']}: failed its checks"); continue
    r = subprocess.run(["blender", "-b", "--factory-startup", "-P", os.path.join(HERE, "blender_molecule.py"), "--", os.path.join(OUT, f"{m['id']}.json"), PUB], capture_output=True, text=True)
    if f"GRADIFY-RENDERED {m['id']}" not in r.stdout:
        print(f"FAIL render {m['id']}\n{r.stdout[-800:]}\n{r.stderr[-800:]}"); sys.exit(1)
    data["review"] = reviews.get(m["id"], {"status": "pending", "note": "Automated checks passed; not yet reviewed by a chemist."})
    data["files"] = {"glb": f"{m['id']}.glb", "still": f"{m['id']}.webp"}
    index.append(data)
    print(f"rendered {m['id']}")
json.dump({"about": "Molecules made by Gradify's visual pipeline (scripts/visuals/build.py): RDKit structures checked automatically, rendered in Blender. Positions in ångströms.", "molecules": index}, open(os.path.join(PUB, "index.json"), "w"), separators=(",", ":"))
print(f"published {len(index)} molecules to kit/visuals/molecules/")
