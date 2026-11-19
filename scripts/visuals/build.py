#!/usr/bin/env python3
"""Gradify's visual pipeline, end to end, for molecules (docs/VISUALS.md):

  1. structure   build_molecules.py: RDKit 3D structures, each checked (formula, identity by InChIKey, R/S
                 configuration, experimental geometry, stereochemistry kept in 3D, bond lengths, clashes, valence)
  2. render      blender_molecule.py, in Blender: a ball-and-stick .glb for the browser and a studio .webp still
  3. publish     kit/visuals/molecules/<id>.glb, <id>.webp and index.json: structure, geometry, functional groups,
                 partial charges, every check and its result, the review status, and the tools' versions

Incremental: a molecule is re-rendered only when its inputs change (its entry, its references, or the pipeline's own
scripts), so adding one molecule doesn't re-render the rest. Renders run in parallel. Only molecules that pass every
automated check reach step 2, and "automated checks passed" is never shown as expert review (reviews.json).
Usage: python3 scripts/visuals/build.py [--all]      (needs RDKit, numpy and Blender 4 on the PATH)
"""
import concurrent.futures as cf, hashlib, json, os, re, shutil, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(HERE, "out"); PUB = os.path.join(ROOT, "kit", "visuals", "molecules")
FRESH = os.path.join(OUT, "stills-new")   # PNG masters rendered this run, for the shared encoder
SIZES = [960, 1920]
# sharp for the shared encoder (scripts/blender/encode-previews.mjs): GRADIFY_SHARP, or the project's own
SHARP = os.environ.get("GRADIFY_SHARP", "sharp")
read = lambda f: open(os.path.join(HERE, f), encoding="utf-8").read()

subprocess.run([sys.executable, os.path.join(HERE, "build_molecules.py")], check=True)
os.makedirs(PUB, exist_ok=True)
reviews = json.loads(read("reviews.json")) if os.path.exists(os.path.join(HERE, "reviews.json")) else {}
src = json.loads(read("molecules.json"))["molecules"]
refs = json.loads(read("references.json"))["molecules"]
old_path = os.path.join(PUB, "index.json")
old = {m["id"]: m for m in json.load(open(old_path))["molecules"]} if os.path.exists(old_path) else {}
blender = subprocess.run(["blender", "--version"], capture_output=True, text=True).stdout.split("\n")[0].strip()
renderer = hashlib.sha256(read("blender_molecule.py").encode()).hexdigest()
sha = lambda x: hashlib.sha256(json.dumps(x, sort_keys=True).encode()).hexdigest()[:16]

# two fingerprints: `fingerprint` changes only with what the picture shows (the atoms' positions, the bonds, the Blender
# script), so improving the analysis never forces a re-render; `content` changes with anything a reviewer signs off
# (the structure, groups, charges, description data), so a review lapses when what was reviewed changes
def fingerprint(d):
    return sha([[a["el"], round(a["x"], 3), round(a["y"], 3), round(a["z"], 3)] for a in d["atoms"]] + [[b["a"], b["b"], b["order"]] for b in d["bonds"]] + [renderer])
def content(d):
    return sha({k: d[k] for k in ("smiles", "formula", "atoms", "bonds", "groups", "stereocentres", "name")})

def render(m):
    r = subprocess.run(["blender", "-b", "--factory-startup", "-t", "2", "-P", os.path.join(HERE, "blender_molecule.py"), "--", os.path.join(OUT, f"{m['id']}.json"), PUB, FRESH], capture_output=True, text=True)
    if f"GRADIFY-RENDERED {m['id']}" not in r.stdout:
        raise RuntimeError(f"render {m['id']} failed\n{r.stdout[-800:]}\n{r.stderr[-800:]}")
    return m["id"]

todo, index = [], []
for m in src:
    data = json.load(open(os.path.join(OUT, f"{m['id']}.json")))
    if not data["ok"]:
        print(f"skip {m['id']}: failed its checks"); continue
    fp, cfp = fingerprint(data), content(data)
    files = {"glb": f"{m['id']}.glb", "still": f"{m['id']}-1920.webp", "sizes": SIZES, "formats": ["avif", "webp"]}
    want = [files["glb"]] + [f"{m['id']}-{w}.{x}" for w in SIZES for x in files["formats"]]
    fresh = old.get(m["id"], {}).get("fingerprint") == fp and all(os.path.exists(os.path.join(PUB, f)) for f in want)
    if not fresh or "--all" in sys.argv: todo.append(m)
    # a review counts only for the exact version reviewed: if the molecule has changed since, it's pending again
    rv = reviews.get(m["id"])
    review = rv if rv and rv.get("status") == "reviewed" and rv.get("content") == cfp else {"status": "pending", "note": "Automated checks passed; not yet reviewed by a chemist." if not rv else "Changed since its last review; waiting for a new one."}
    data.update({"review": review, "files": files, "fingerprint": fp, "content": cfp, "tools": {"rdkit": data["rdkit"], "blender": blender}})
    index.append(data)

print(f"{len(todo)} to render, {len(index) - len(todo)} unchanged")
shutil.rmtree(FRESH, ignore_errors=True); os.makedirs(FRESH)
with cf.ThreadPoolExecutor(max_workers=max(1, (os.cpu_count() or 2) // 2)) as pool:
    for done in pool.map(render, todo):
        print(f"rendered {done}")
if todo:
    subprocess.run(["node", os.path.join(ROOT, "scripts", "blender", "encode-previews.mjs"), FRESH, SHARP, PUB, ",".join(map(str, SIZES))], check=True, stdout=subprocess.DEVNULL)
# only this run's files stay: <id>.glb and <id>-<width>.<avif|webp> for the molecules in the library
allowed = re.compile(r"^(?P<id>[a-z0-9-]+?)(?:\.glb|-(?:%s)\.(?:avif|webp))$" % "|".join(map(str, SIZES)))
ids = {m["id"] for m in index}
for f in os.listdir(PUB):
    k = allowed.match(f)
    if f != "index.json" and not (k and k.group("id") in ids): os.remove(os.path.join(PUB, f))
json.dump({"about": "Molecules made by Gradify's visual pipeline (scripts/visuals/build.py): RDKit structures checked against references, rendered in Blender. Positions in ångströms.", "molecules": index}, open(old_path, "w"), separators=(",", ":"))
print(f"published {len(index)} molecules to kit/visuals/molecules/")
