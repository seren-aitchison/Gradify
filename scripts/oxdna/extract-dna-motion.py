# Turn an oxDNA trajectory of a DNA duplex into kit/labs/biology/dna-thermal.js: how each backbone and base
# site moves at 37 °C, for the DNA lab's "Thermal motion" mode.
#
# The simulation (oxDNA2 model, 28 bp, 0.5 M salt, 37 °C, 6M MD steps; input in scripts/oxdna/input) is run
# with oxDNA (github.com/lorenzo-rovigatti/oxdna, GPL-3; only its output is used here). For each frame:
# take the sites (backbone and base, per oxDNA2's geometry), remove the duplex's overall drift and rotation
# (Kabsch fit onto the mean structure), and express each site's displacement from its mean position in that
# site's own frame around the helix axis: radial, tangential (along the turn), axial. The lab adds those
# displacements to its ideal B-DNA geometry, so any sequence it draws moves the way the simulated one did.
#   python3 extract-dna-motion.py <generated.top> <trajectory.dat> <out.js>
import sys, base64, numpy as np

top, traj, out = sys.argv[1:4]
L = 0.8518   # nm per oxDNA length unit
lines = open(top).read().split("\n")[1:]
strand = [int(l.split()[0]) for l in lines if l.strip()]
N = len(strand); nbp = N // 2

frames = []; cur = []
for l in open(traj):
    if l.startswith("t ="):
        if cur: frames.append(np.array(cur))
        cur = []
    elif l[0] in "bE": continue
    else: cur.append([float(x) for x in l.split()[:9]])
frames.append(np.array(cur))
frames = [f for f in frames if len(f) == N]

def sites(f):
    r, a1, a3 = f[:, :3], f[:, 3:6], f[:, 6:9]; a2 = np.cross(a3, a1)
    bb = r - 0.34 * a1 + 0.3408 * a2; base = r + 0.4 * a1
    # pair i: strand-1 nucleotide i with strand-2 nucleotide N-1-i
    i = np.arange(nbp); j = N - 1 - i
    return np.stack([bb[i], bb[j], base[i], base[j]], axis=1) * L   # (nbp, 4, 3) in nm

S = np.array([sites(f) for f in frames])   # (F, nbp, 4, 3)
F = len(S)
def kabsch(P, Q):   # rotate/translate P onto Q
    p, q = P - P.mean(0), Q - Q.mean(0); U, _, Vt = np.linalg.svd(p.T @ q); d = np.sign(np.linalg.det(U @ Vt))
    D = np.diag([1, 1, d]); return p @ (U @ D @ Vt) + Q.mean(0)
ref = S[0].reshape(-1, 3)
for _ in range(3):
    A = np.array([kabsch(s.reshape(-1, 3), ref) for s in S]); ref = A.mean(0)
A = A.reshape(F, nbp, 4, 3); mean = A.mean(0)
# helix axis of the mean structure: the line through the base-pair midpoints
mid = mean[:, 2:4].mean(1); c = mid.mean(0); _, _, vt = np.linalg.svd(mid - c); ax = vt[0]
if np.dot(mid[-1] - mid[0], ax) < 0: ax = -ax
D = A - mean
radial = mean - c - np.einsum("bsk,k->bs", mean - c, ax)[..., None] * ax; radial /= np.linalg.norm(radial, axis=-1, keepdims=True)
tang = np.cross(ax, radial)
local = np.stack([np.einsum("fbsk,bsk->fbs", D, radial), np.einsum("fbsk,bsk->fbs", D, tang), np.einsum("fbsk,k->fbs", D, ax)], -1)   # (F, nbp, 4, 3)
print("frames", F, "bp", nbp, "rms displacement nm", float(np.sqrt((local ** 2).sum(-1).mean())), "max", float(np.abs(local).max()))
q = np.clip(np.round(local / 0.01), -127, 127).astype(np.int8)
b64 = base64.b64encode(q.tobytes()).decode()
open(out, "w").write(f"""// Thermal motion of B-DNA at 37 °C, from an oxDNA molecular dynamics simulation (oxDNA2 model, 28 bp,
// 0.5 M salt, {F} frames about 91 ps apart). Made by scripts/oxdna/extract-dna-motion.py.
// For each frame, base pair and site (strand-1 backbone, strand-2 backbone, strand-1 base, strand-2 base):
// the displacement from the site's mean position, as radial, tangential and axial nm, in units of 0.01 nm, int8.
// Simulation: oxDNA (Poppleton et al., J. Open Source Softw. 8, 4693, 2023; Snodin et al., J. Chem. Phys. 142, 234901, 2015).
export const FRAMES = {F}, PAIRS = {nbp}, UNIT = 0.01;
const raw = "{b64}";
let data = null;
// displacement [radial, tangential, axial] in nm of site s (0-3) of base pair i in frame f
export function at(f, i, s, out = [0, 0, 0]) {{
  data ||= Int8Array.from(atob(raw), (c) => (c.charCodeAt(0) << 24) >> 24);
  const k = (((f % FRAMES) * PAIRS + (i % PAIRS)) * 4 + s) * 3;
  out[0] = data[k] * UNIT; out[1] = data[k + 1] * UNIT; out[2] = data[k + 2] * UNIT; return out;
}}
""")
