"""Units 16 (physical), 17 (materials, environment, industry), 19 (lab methods), and the remaining flows of units 7–8."""
import math
from spec import mk

R = 8.314
def P(smiles, label, **k):
    d = {"smiles": smiles, "label": label}; d.update(k); return d

# ---------------------------------------------------------------- units 7–8 leftovers
mk("u07-07", "chem-heterogeneous-steps", "flow", "How a solid catalyst works",
   "Hydrogenating ethene on nickel: the gases adsorb onto the metal surface, which weakens their bonds; they react on the surface; the product desorbs, freeing the site. Adsorption must be strong enough to weaken bonds but weak enough to let the product go.",
   "A cycle: free Ni surface → H₂ and C₂H₄ adsorbed → reaction on the surface → ethane desorbs → free surface.",
   ["Adsorption: H₂ and C₂H₄ bond to the nickel surface.", "Reaction: hydrogen atoms add to the adsorbed ethene.", "Desorption: ethane leaves, freeing the surface for the next molecules."],
   layout="cycle", radius=115, boxWidth=120,
   nodes=[{"id": "a", "label": "free Ni surface", "tone": "a4"}, {"id": "b", "label": "H₂ and C₂H₄ adsorbed"}, {"id": "c", "label": "C₂H₆ on the surface"}],
   edges=[{"from": "a", "to": "b", "label": "adsorption"}, {"from": "b", "to": "c", "label": "reaction"}, {"from": "c", "to": "a", "label": "desorption of C₂H₆"}],
   claims=[{"type": "net", "steps": ["Ni + H2 + C2H4 → NiH2C2H4", "NiH2C2H4 → NiC2H6", "NiC2H6 → Ni + C2H6"], "net": "H2 + C2H4 → C2H6"},
           {"type": "regenerated", "species": "Ni", "steps": ["Ni + H2 + C2H4 → NiH2C2H4", "NiH2C2H4 → NiC2H6", "NiC2H6 → Ni + C2H6"]}])

STEPS = ["S2O8^2- + 2Fe2+ → 2SO4^2- + 2Fe3+", "2Fe3+ + 2I- → 2Fe2+ + I2"]
mk("u07-21", "chem-catalytic-cycle", "flow", "A homogeneous catalytic cycle",
   "Peroxodisulfate and iodide ions are both negative and repel, so they react slowly. Fe²⁺ catalyses the reaction: it reduces S₂O₈²⁻ and becomes Fe³⁺, which oxidises I⁻ back to I₂ and becomes Fe²⁺ again. Each step is between oppositely charged ions.",
   "A cycle between Fe²⁺ and Fe³⁺: S₂O₈²⁻ converts Fe²⁺ to Fe³⁺, and I⁻ converts Fe³⁺ back to Fe²⁺.",
   ["S₂O₈²⁻ + 2Fe²⁺ → 2SO₄²⁻ + 2Fe³⁺.", "2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂.", "Overall: S₂O₈²⁻ + 2I⁻ → 2SO₄²⁻ + I₂, with the iron regenerated."],
   layout="cycle", radius=110, nodes=[{"id": "f2", "label": "Fe²⁺", "tone": "a4"}, {"id": "f3", "label": "Fe³⁺", "tone": "a3"}],
   edges=[{"from": "f2", "to": "f3", "label": "+ S₂O₈²⁻ → 2SO₄²⁻", "eq": STEPS[0]}, {"from": "f3", "to": "f2", "label": "+ 2I⁻ → I₂", "eq": STEPS[1]}],
   centre="net: S₂O₈²⁻ + 2I⁻ → 2SO₄²⁻ + I₂",
   claims=[{"type": "net", "steps": STEPS, "net": "S2O8^2- + 2I- → 2SO4^2- + I2"}, {"type": "regenerated", "species": "Fe2+", "steps": STEPS}])

# Haber yields from Kp(T) = exp(−ΔG°/RT), ΔG° = ΔH° − TΔS° with 298 K values (ΔH° −91.8 kJ, ΔS° −198.1 J K⁻¹ for 2NH₃), ideal gases, 1:3 feed
def kp(T): return math.exp(-(-91800 + T * 198.1) / (R * T))
def yld(P, K):
    lo, hi = 0.0, 1 - 1e-12
    for _ in range(100):
        m = (lo + hi) / 2; n = 4 - 2 * m
        f = ((2 * m / n) ** 2) / (((1 - m) / n) * (3 * (1 - m) / n) ** 3 * P * P) - K
        if f > 0: hi = m
        else: lo = m
    return 100 * 2 * lo / (4 - 2 * lo)
series, checks = [], []
for T, c in [(623, "a1"), (723, "a3"), (823, "a2")]:
    K = kp(T); pts = [[P, round(yld(P, K), 3)] for P in range(25, 401, 25)]
    series.append({"points": pts, "colour": c, "label": f"{T - 273} °C", "labelAt": [400, pts[-1][1]]})
    checks.append({"type": "haberYield", "Kp": K, "points": pts, "name": f"{T - 273} °C: every plotted yield solves Kp = {K:.2e} bar⁻² (ideal gases, 1:3 feed)"})
mk("u08-13", "chem-haber-yield", "graph", "Equilibrium yield of ammonia",
   "Calculated equilibrium percentage of NH₃ from a 1:3 N₂:H₂ mixture, treating the gases as ideal and using ΔH° and ΔS° at 298 K. Higher pressure raises the yield (4 gas molecules become 2); higher temperature lowers it (the forward reaction is exothermic). Industry compromises at about 450 °C and 200 atm for a fast rate, and recycles unreacted gas.",
   "Percentage of ammonia at equilibrium against pressure for 350, 450 and 550 °C: each curve rises with pressure, and lower temperatures give higher curves.",
   ["350 °C: the highest yields at every pressure.", "450 °C: lower.", "550 °C: lowest.", "All rise as pressure increases."],
   range={"x": [0, 420], "y": [0, 80]}, ticks=[[100, 200, 300, 400], [20, 40, 60, 80]], grid=[50, 10], axisLabels=["pressure / bar", "NH₃ at equilibrium / %"], xLabelBelow=True,
   series=series, curves=[], checks=checks)

# ---------------------------------------------------------------- unit 16
mk("u16-02", "chem-mo-h2", "levels", "Molecular orbitals of hydrogen",
   "Two 1s orbitals combine into a lower-energy bonding σ1s and a higher-energy antibonding σ*1s. H₂'s two electrons pair in σ1s: bond order 1. In He₂ the extra two would fill σ*1s and cancel the bond, which is why He₂ does not exist.",
   "MO diagram: 1s on each hydrogen; σ1s below with two paired electrons, σ*1s above and empty.",
   ["Each H atom: one electron in 1s.", "σ1s: two paired electrons.", "σ*1s: empty. Bond order (2 − 0) ÷ 2 = 1."],
   kind="mo", molecule="H2", bondOrder=1, unpaired=0)

mk("u16-03", "chem-mo-n2", "levels", "Molecular orbitals of nitrogen",
   "For N₂ (and lighter diatomics) the π2p orbitals lie below σ2p. Its ten valence electrons fill up to σ2p with none in antibonding 2p orbitals: bond order 3, all electrons paired. This triple bond (945 kJ mol⁻¹) makes N₂ very unreactive.",
   "MO diagram of N₂: σ2s and σ*2s full, π2p (two) and σ2p full, π*2p and σ*2p empty.",
   ["σ2s, σ*2s: full.", "π2p: both full; σ2p: full (here above π2p).", "π*2p and σ*2p: empty. Bond order 3, diamagnetic."],
   kind="mo", molecule="N2", bondOrder=3, unpaired=0)

psi2 = "2*sin(6.283185*x)^2"
mk("u16-04", "chem-schrodinger-well", "graph", "A wavefunction and its probability",
   "For the second level of a particle in a box, ψ is positive in one half and negative in the other, with a node in the middle. The probability density ψ² is never negative and its total area is 1: the particle is certainly somewhere in the box, but never at the node.",
   "ψ for n = 2 (one full sine wave, positive then negative) and ψ² (two humps), with a node at the centre.",
   ["ψ: rises, falls through zero at the centre, and returns to zero at the wall.", "ψ²: two equal humps, zero at the walls and at the centre."],
   range={"x": [0, 1], "y": [-1.6, 2.2]}, ticks=[[0.25, 0.5, 0.75, 1], [-1, 0, 1, 2]], grid=[0.25, 0.5], axisLabels=["position x / L", "ψ and ψ²"], xLabelBelow=True,
   curves=[{"expr": "1.414214*sin(6.283185*x)", "colour": "a1", "label": "ψ", "labelAt": [0.22, 1.6]}, {"expr": psi2, "colour": "a2", "label": "ψ²", "labelAt": [0.66, 2.05]}],
   points=[{"x": 0.5, "y": 0, "label": "node", "dy": 14}],
   checks=[{"type": "area", "expr": psi2, "from": 0, "to": 1, "value": 1, "name": "ψ² integrates to 1 over the box: normalised"}, {"type": "point", "expr": "1.414214*sin(6.283185*x)", "x": 0.5, "y": 0, "name": "a node at the centre for n = 2"}])

box = lambda n: f"{n * n}+0.9*sin({n}*3.141593*x)"
mk("u16-05", "chem-particle-box", "graph", "Particle in a box",
   "Only waves that fit exactly in the box are allowed: n half-wavelengths, with nodes at the walls. Energy rises as n²: E = n²h²/8mL², so the levels are spaced 1 : 4 : 9 and the gaps grow. Each wavefunction is drawn on its own energy level.",
   "Three energy levels at 1, 4 and 9 units, each with its wavefunction drawn on it: one, two and three half-waves.",
   ["n = 1: one half-wave, E = 1 unit.", "n = 2: two half-waves (a node in the middle), E = 4.", "n = 3: three half-waves, E = 9."],
   range={"x": [0, 1], "y": [0, 11]}, ticks=[[0.5, 1], [1, 4, 9]], grid=[0.25, 1], axisLabels=["position x / L", "energy (units of h²/8mL²)"], xLabelBelow=True,
   curves=[{"expr": str(n * n), "colour": "soft", "dash": "4 4"} for n in (1, 2, 3)] + [{"expr": box(n), "colour": c, "label": f"n = {n}", "labelAt": [1.0, n * n + 0.4], "anchor": "end"} for n, c in [(1, "a1"), (2, "a4"), (3, "a2")]],
   checks=[{"type": "point", "expr": box(2), "x": 0.5, "y": 4, "name": "n = 2 has a node at the centre"}, {"type": "point", "expr": box(3), "x": 0.333333, "y": 9, "name": "n = 3 has nodes at L/3 and 2L/3"},
           {"type": "point", "expr": box(1), "x": 0, "y": 1, "name": "every wavefunction is zero at the walls"}])

mk("u16-06", "chem-harmonic-oscillator", "graph", "The harmonic oscillator",
   "A bond vibrating like a spring has a parabolic potential energy. Its allowed energies are evenly spaced, E = (v + ½)hν, and even the lowest level has energy ½hν: the molecule can never stop vibrating (zero-point energy).",
   "A parabola of potential energy against displacement, with horizontal levels at 0.5, 1.5, 2.5 and 3.5 units drawn across it.",
   ["The parabola V = ½kx².", "Levels v = 0, 1, 2, 3 at 0.5, 1.5, 2.5 and 3.5 hν: equally spaced.", "The lowest is above the minimum: zero-point energy."],
   range={"x": [-2.2, 2.2], "y": [0, 4.5]}, ticks=[[-2, -1, 0, 1, 2], [0.5, 1.5, 2.5, 3.5]], grid=[1, 0.5], axisLabels=["displacement", "energy / hν"], xLabelBelow=True,
   curves=[{"expr": "x^2", "colour": "a1"}] + [{"expr": str(v + 0.5), "domain": [-math.sqrt(v + 0.5), math.sqrt(v + 0.5)], "colour": "a2", "label": f"v = {v}", "labelAt": [math.sqrt(v + 0.5) + 0.08, v + 0.5]} for v in range(4)],
   checks=[{"type": "point", "expr": "x^2", "x": math.sqrt(0.5), "y": 0.5, "name": "v = 0 lies at ½hν: the zero-point energy"}] + [{"type": "point", "expr": "x^2", "x": math.sqrt(v + 0.5), "y": v + 0.5, "name": f"v = {v} at ({v} + ½)hν"} for v in (1, 2, 3)])

mk("u16-07", "chem-rotational-levels", "levels", "Rotational energy levels",
   "A rotating diatomic molecule has energies E = BJ(J + 1): 0, 2B, 6B, 12B, 20B. Absorption obeys ΔJ = +1, so the lines come at 2B, 4B, 6B, 8B: equally spaced by 2B in the microwave spectrum. The spacing gives the bond length.",
   "Levels J = 0 to 4 at 0, 2, 6, 12 and 20 B, getting further apart, with upward arrows between neighbours.",
   ["J = 0 at 0, J = 1 at 2B, J = 2 at 6B, J = 3 at 12B, J = 4 at 20B.", "Arrows J → J + 1: energies 2B, 4B, 6B, 8B.", "Adjacent lines differ by 2B."],
   kind="custom", height=[340, 360],
   levels=[{"id": f"j{J}", "label": f"J = {J}", "E": J * (J + 1), "J": J, "x0": 0.15, "x1": 0.95} for J in range(5)],
   transitions=[{"from": f"j{J}", "to": f"j{J + 1}", "x": 0.3 + J * 0.15, "label": f"{2 * (J + 1)}B", "colour": "a1"} for J in range(4)],
   claims=[{"type": "rotational", "B": 1}])

De, a, re = 4.75, 1.94, 0.74
morse = f"{De}*(1-exp(-{a}*(x-{re})))^2"
mk("u16-08", "chem-morse", "graph", "A real bond: the Morse potential",
   "A real bond is not a perfect spring. Squeezing the atoms together is very hard (the steep left wall) and stretching it far enough breaks it (the curve levels off at the dissociation energy). The vibrational levels get closer together towards the top. Values roughly for H₂.",
   "Potential energy against bond length: a steep wall at short distance, a minimum at 0.074 nm and a curve levelling off at about 4.75 eV at long distance.",
   ["Minimum at the bond length, 0.074 nm.", "Steep repulsion at short distances.", "Levelling off at the dissociation energy, about 4.75 eV."],
   range={"x": [0.3, 3.5], "y": [0, 6]}, ticks=[[0.5, 1, 1.5, 2, 2.5, 3], [1, 2, 3, 4, 5]], grid=[0.5, 1], axisLabels=["bond length / 10⁻¹⁰ m", "energy / eV"], xLabelBelow=True,
   curves=[{"expr": morse, "domain": [0.38, 3.5], "colour": "a1"}], marks=[{"y": De, "label": "dissociation energy"}],
   checks=[{"type": "min", "expr": morse, "domain": [0.4, 3.4], "x": re, "y": 0, "name": "the minimum is at the equilibrium bond length, 0.74 × 10⁻¹⁰ m"}, {"type": "value", "expr": morse, "x": 3.4, "between": [4.65, 4.75], "name": "at long range the energy approaches the dissociation energy"}])

fc0, fc1 = "4*(1-exp(-1.6*(x-1.0)))^2", "1.2+3*(1-exp(-1.4*(x-1.35)))^2"
mk("u16-09", "chem-franck-condon", "graph", "The Franck–Condon principle",
   "Electronic transitions happen so fast that the nuclei do not move: the transition is a vertical line on the energy diagram. Because the excited state's minimum lies at a longer bond length, the vertical line lands on a high point of the excited curve, so the molecule is left vibrating.",
   "Two potential curves: the ground state with a minimum at 1.0, and an excited state above it with a minimum displaced to 1.35; a vertical arrow from the ground minimum up to the excited curve.",
   ["Ground state: minimum at bond length 1.0.", "Excited state: higher, with a longer bond (minimum at 1.35).", "Vertical arrow at 1.0: lands well above the excited minimum."],
   range={"x": [0.5, 3], "y": [0, 6]}, ticks=[[1, 1.5, 2, 2.5], [1, 2, 3, 4, 5]], grid=[0.5, 1], axisLabels=["bond length", "energy"], xLabelBelow=True,
   curves=[{"expr": fc0, "domain": [0.62, 3], "colour": "a1", "label": "ground state", "labelAt": [2.2, 3.4]}, {"expr": fc1, "domain": [0.9, 3], "colour": "a2", "label": "excited state", "labelAt": [2.2, 4.5]}],
   arrows=[{"from": [1.0, 0], "to": [1.0, round(1.2 + 3 * (1 - math.exp(-1.4 * (1.0 - 1.35))) ** 2, 3)], "colour": "a5", "label": "vertical transition", "labelAt": [1.05, 1.5]}],
   checks=[{"type": "min", "expr": fc0, "domain": [0.7, 3], "x": 1.0, "y": 0, "name": "ground-state minimum at 1.0"}, {"type": "min", "expr": fc1, "domain": [0.95, 3], "x": 1.35, "y": 1.2, "name": "the excited state's minimum is displaced to a longer bond (1.35)"}])

boltz = {"kT = ΔE": [round(math.exp(-i), 4) for i in range(5)], "kT = 2ΔE": [round(math.exp(-i / 2), 4) for i in range(5)]}
mk("u16-11", "chem-boltzmann-populations", "trend", "Boltzmann populations",
   "The fraction of molecules in a level falls exponentially with its energy: Nᵢ/N₀ = e^(−Eᵢ/kT). At higher temperature the populations of the upper levels rise. These ratios explain the intensities of spectral lines and why reaction rates rise with temperature.",
   "Relative population of levels 0 to 4 at two temperatures: both fall from 1, but the higher-temperature series falls more slowly.",
   ["kT = ΔE: 1, 0.37, 0.14, 0.05, 0.02.", "kT = 2ΔE: 1, 0.61, 0.37, 0.22, 0.14."],
   kind="series", range=[0, 1.1], ticks=[0, 0.25, 0.5, 0.75, 1], yLabel="Nᵢ / N₀", xLabels=["level 0", "1", "2", "3", "4"],
   series=[{"label": "kT = ΔE", "keys": [f"a{i}" for i in range(5)], "colour": "a1", "values": {f"a{i}": v for i, v in enumerate(boltz["kT = ΔE"])}},
           {"label": "kT = 2ΔE", "keys": [f"b{i}" for i in range(5)], "colour": "a3", "values": {f"b{i}": v for i, v in enumerate(boltz["kT = 2ΔE"])}}],
   claims=[{"type": "decreasing", "keys": [f"a{i}" for i in range(5)]}, {"type": "decreasing", "keys": [f"b{i}" for i in range(5)]}, {"type": "order", "keys": ["a2", "b2"]}])

q2 = "1+exp(-1/x)"
mk("u16-12", "chem-partition-function", "graph", "A two-level partition function",
   "The partition function q = Σ e^(−Eᵢ/kT) counts the states thermally available. For two levels a gap ε apart, q = 1 + e^(−ε/kT): just 1 when kT ≪ ε (only the ground state is used) and approaching 2 when kT ≫ ε (both equally).",
   "q against kT/ε: starting at 1, rising through 1.37 at kT = ε, and levelling towards 2.",
   ["Low temperature: q ≈ 1.", "kT = ε: q = 1 + e⁻¹ = 1.37.", "High temperature: q → 2."],
   range={"x": [0, 6], "y": [0.8, 2.1]}, ticks=[[1, 2, 3, 4, 5, 6], [1, 1.5, 2]], grid=[1, 0.25], axisLabels=["kT / ε", "q"], xLabelBelow=True,
   curves=[{"expr": q2, "domain": [0.02, 6], "colour": "a1"}], marks=[{"y": 2, "label": "limit: 2 states"}], points=[{"x": 1, "y": 1.3679, "label": "1 + e⁻¹"}],
   checks=[{"type": "point", "expr": q2, "x": 1, "y": 1.367879, "name": "q = 1 + 1/e at kT = ε"}, {"type": "value", "expr": q2, "x": 0.05, "between": [1, 1.0001], "name": "q → 1 at low temperature"}])

k1, k2 = 0.5, 0.2
tmax = math.log(k2 / k1) / (k2 - k1); bmax = k1 / (k2 - k1) * (math.exp(-k1 * tmax) - math.exp(-k2 * tmax))
bexp = f"{k1 / (k2 - k1):.6f}*(exp(-{k1}*x)-exp(-{k2}*x))"
mk("u16-14", "chem-kinetics-integrated", "graph", "Consecutive reactions A → B → C",
   f"A falls exponentially; the intermediate B rises, peaks and falls as it is converted to C; C rises to take everything. With k₁ = 0.5 and k₂ = 0.2 s⁻¹, [B] peaks at t = ln(k₁/k₂)/(k₁ − k₂) = {tmax:.2f} s.",
   "Concentrations against time: A decaying, B rising to a maximum near 3 s then falling, C rising towards 1.",
   ["[A] = e^(−k₁t).", f"[B] peaks at {bmax:.2f} at {tmax:.2f} s.", "[C] = 1 − [A] − [B] rises towards 1."],
   range={"x": [0, 20], "y": [0, 1.05]}, ticks=[[5, 10, 15, 20], [0.25, 0.5, 0.75, 1]], grid=[5, 0.25], axisLabels=["time / s", "concentration (fraction of A₀)"], xLabelBelow=True,
   curves=[{"expr": f"exp(-{k1}*x)", "colour": "a1", "label": "A", "labelAt": [1.2, 0.85]}, {"expr": bexp, "colour": "a2", "label": "B", "labelAt": [tmax + 0.3, bmax + 0.05]},
           {"expr": f"1-exp(-{k1}*x)-({bexp})", "colour": "a4", "label": "C", "labelAt": [17, 0.92]}],
   checks=[{"type": "max", "expr": bexp, "domain": [0, 20], "x": round(tmax, 3), "y": round(bmax, 5), "name": f"[B] is greatest at t = ln(k₁/k₂)/(k₁ − k₂) = {tmax:.2f} s"}])

lang = "2*x/(1+2*x)"
mk("u16-15", "chem-langmuir", "graph", "The Langmuir isotherm",
   "Gas molecules adsorb on a fixed number of surface sites. The fraction covered, θ = Kp/(1 + Kp), rises in proportion at low pressure and levels at 1 when every site is full (a monolayer). Half coverage occurs at p = 1/K.",
   "Fraction of the surface covered against pressure: rising steeply, then levelling towards 1; θ = 0.5 at p = 0.5 for K = 2.",
   ["Low pressure: θ ≈ Kp.", "θ = 0.5 at p = 1/K = 0.5.", "High pressure: θ → 1, a full monolayer."],
   range={"x": [0, 6], "y": [0, 1.05]}, ticks=[[1, 2, 3, 4, 5, 6], [0.25, 0.5, 0.75, 1]], grid=[1, 0.25], axisLabels=["pressure / bar", "fraction covered, θ"], xLabelBelow=True,
   curves=[{"expr": lang, "colour": "a4"}], marks=[{"y": 1, "label": "monolayer"}], points=[{"x": 0.5, "y": 0.5, "label": "θ = ½ at p = 1/K"}],
   checks=[{"type": "point", "expr": lang, "x": 0.5, "y": 0.5, "name": "half coverage at p = 1/K"}, {"type": "slope", "expr": lang, "x": 0, "value": 2, "name": "initial gradient K = 2 bar⁻¹"}])

phys, chemi = "0.6*((1.6/x)^12-2*(1.6/x)^6)", "4*(1-exp(-2.2*(x-0.95)))^2-4"
mk("u16-16", "chem-physisorption", "graph", "Physisorption and chemisorption",
   "A molecule approaching a surface first feels weak van der Waals attraction: a shallow well far out (physisorption, about 20 kJ mol⁻¹). Closer in, it can form chemical bonds to the surface: a much deeper well (chemisorption, often over 200 kJ mol⁻¹). Illustrative curves.",
   "Energy against distance from the surface: a shallow minimum at 0.16 nm for physisorption and a deep minimum at 0.095 nm for chemisorption.",
   ["Physisorption: shallow minimum far from the surface.", "Chemisorption: a deep minimum close to the surface."],
   range={"x": [0.6, 3.0], "y": [-4.5, 2]}, ticks=[[1, 1.5, 2, 2.5, 3], [-4, -2, 0, 2]], grid=[0.5, 1], axisLabels=["distance from surface / 10⁻¹⁰ m", "energy (illustrative)"], xLabelBelow=True,
   curves=[{"expr": phys, "domain": [1.42, 3], "colour": "a1", "label": "physisorption", "labelAt": [2.1, -0.9]}, {"expr": chemi, "domain": [0.7, 3], "colour": "a2", "label": "chemisorption", "labelAt": [1.5, -2.6]}],
   checks=[{"type": "min", "expr": phys, "domain": [1.45, 3], "x": 1.6, "y": -0.6, "name": "physisorption: a shallow well at 1.6"}, {"type": "min", "expr": chemi, "domain": [0.75, 3], "x": 0.95, "y": -4, "name": "chemisorption: a well over six times deeper, closer to the surface"}])

mk("u16-17", "chem-colloid", "particles", "A colloid",
   "In a colloid, particles between about 1 and 1000 nm are dispersed through another substance. They are too small to settle but large enough to scatter light, which is why a beam shows up passing through milk or fog (the Tyndall effect).",
   "A box of water containing a few much larger dispersed particles.",
   ["Many small water molecules.", "A few far larger colloidal particles, spread evenly and not settling."],
   species={"H2O": {"atoms": ["O", "H", "H"], "shape": "bent"}, "colloid": {"atoms": ["X"]}}, panelHeight=190,
   panels=[{"title": "colloidal dispersion", "arrangement": "random", "contents": [["H2O", 14], ["colloid", 4]], "scale": 1, "note": "dispersed particles 1–1000 nm across"}],
   claims=[{"type": "count", "panel": 0, "species": "colloid", "n": 4}])

mk("u16-18", "chem-surfactant-interface", "structures", "A surfactant",
   "Sodium dodecyl sulfate has a long non-polar hydrocarbon tail that dissolves in oil and an ionic sulfate head that dissolves in water. At an oil–water interface the molecules line up with heads in the water and tails in the oil, lowering the interfacial tension; in water they form micelles.",
   "The structure of sodium dodecyl sulfate with its ionic head shaded.",
   ["A twelve-carbon chain: the hydrophobic tail.", "OSO₃⁻ Na⁺: the hydrophilic head."],
   panels=[P("CCCCCCCCCCCCOS(=O)(=O)[O-].[Na+]", "sodium dodecyl sulfate", formula="C12H25NaO4S", sub="tail: hydrophobic · head: hydrophilic", highlight=[{"group": "S(=O)(=O)[O-]", "colour": "a2", "check": False}])])

mk("u16-19", "chem-photochem", "levels", "Light can break a bond",
   "A photon breaks a bond if its energy at least equals the bond energy. Cl–Cl is 242 kJ mol⁻¹, so wavelengths of 494 nm or shorter can split Cl₂ into radicals, which is why chlorination of methane starts in sunlight.",
   "Energy diagram: Cl₂ at the bottom, 2Cl• 242 kJ mol⁻¹ above, with a photon arrow of 494 nm reaching it.",
   ["Lower level: Cl₂.", "Upper level: two chlorine radicals, 242 kJ mol⁻¹ higher.", "A 494 nm photon carries exactly 242 kJ mol⁻¹."],
   kind="custom", height=[240, 260],
   levels=[{"id": "m", "label": "Cl₂", "E": 0, "x0": 0.2, "x1": 0.6}, {"id": "r", "label": "2Cl•", "E": 242, "x0": 0.2, "x1": 0.6}],
   transitions=[{"from": "m", "to": "r", "x": 0.4, "label": "hν, λ ≤ 494 nm: 242 kJ mol⁻¹", "colour": "a5"}],
   claims=[{"type": "photon", "nm": 494, "kj": 242}])

lj = "4*((1/x)^12-(1/x)^6)"
mk("u16-20", "chem-lennard-jones", "graph", "The Lennard-Jones potential",
   "The energy of two molecules as they approach: weak attraction (the r⁻⁶ term) at moderate distance and fierce repulsion (r⁻¹²) when their electron clouds overlap. The minimum, depth ε, lies at r = 2^(1/6)σ ≈ 1.12σ.",
   "Energy (units of ε) against separation (units of σ): zero at r = σ, a minimum of −1 at 1.12σ, approaching zero at long range.",
   ["Steep repulsion below σ.", "Zero at r = σ.", "Minimum −ε at 1.12σ.", "Weak attraction fading at long range."],
   range={"x": [0.85, 3], "y": [-1.4, 2]}, ticks=[[1, 1.5, 2, 2.5, 3], [-1, 0, 1, 2]], grid=[0.25, 0.5], axisLabels=["r / σ", "energy / ε"], xLabelBelow=True,
   curves=[{"expr": lj, "domain": [0.92, 3], "colour": "a1"}], marks=[{"y": 0}], points=[{"x": 1.122462, "y": -1, "label": "minimum: −ε at 1.12σ", "dy": 16}],
   checks=[{"type": "min", "expr": lj, "domain": [0.95, 3], "x": 1.1225, "y": -1, "name": "minimum −ε at r = 2^(1/6)σ"}, {"type": "point", "expr": lj, "x": 1, "y": 0, "name": "energy zero at r = σ"}])

def A(id, el, x, y, **k):
    d = {"id": id, "el": el, "x": x, "y": y}; d.update(k); return d
W4 = []
for i, (x, y, hx) in enumerate([(-1.3, 0, -1), (1.3, 0, 1), (0, -1.3, 0), (0, 1.3, 0)]):
    o = f"o{i}"; W4 += [A(o, "O", x, y, lone=2, loneAt=[180 if x > 0 else 0 if x < 0 else (90 if y < 0 else -90), 150 if x > 0 else 30 if x < 0 else (60 if y < 0 else -60)])]
    if y == 0: W4 += [A(f"h{i}a", "H", x + hx * 0.7, y - 0.6), A(f"h{i}b", "H", x + hx * 0.7, y + 0.6)]
    else: W4 += [A(f"h{i}a", "H", x - 0.6, y + (0.7 if y > 0 else -0.7)), A(f"h{i}b", "H", x + 0.6, y + (0.7 if y > 0 else -0.7))]
mk("u16-21", "chem-solvation-shell", "dotcross", "A hydrated sodium ion",
   "Water molecules cluster round Na⁺ with their δ− oxygens pointing in and their hydrogens out, held by ion–dipole attractions. Forming this hydration shell releases energy (−406 kJ mol⁻¹ for Na⁺), which helps ionic solids dissolve.",
   "A sodium ion at the centre with four water molecules around it, each oxygen facing the ion, joined by dashed ion–dipole attractions.",
   ["Na⁺ at the centre.", "Four water molecules, oxygen towards the ion, hydrogens pointing away.", "Dashed lines: ion–dipole attractions."],
   rowHeight=[300, 300], scale=[1, 0.85],
   molecules=[{"label": "Na⁺(aq)", "style": "lewis", "charge": 1,
               "atoms": [A("na", "Na", 0, 0, charge=1, ion=True)] + W4,
               "bonds": [{"a": f"o{i}", "b": f"h{i}{s}"} for i in range(4) for s in "ab"],
               "links": [{"a": "na", "b": f"o{i}", "colour": "a4"} for i in range(4)]}])

land = "0.5*cos(1.2*x)+0.35*cos(2.9*x+1)+0.02*(x-3)^2"
mk("u16-22", "chem-energy-landscape", "graph", "A conformational energy landscape",
   "Rotating bonds in a flexible molecule moves it across an energy landscape with several minima (stable conformers) separated by barriers. A conformational search aims to find the global minimum, not just the nearest local one. Illustrative one-dimensional slice.",
   "Energy against a conformational coordinate: a wavy curve with several local minima, the lowest near 2.85.",
   ["Several dips: local minima, each a stable conformer.", "Hills between them: barriers to interconversion.", "The deepest dip: the global minimum."],
   range={"x": [0, 8], "y": [-1.2, 1.5]}, ticks=[[], []], axisLabels=["conformational coordinate", "energy"], xLabelBelow=True,
   curves=[{"expr": land, "colour": "a5"}],
   checks=[{"type": "min", "expr": land, "domain": [0, 8], "x": 2.851, "tol": 0.01, "name": "the deepest minimum (global) is at 2.85, not the first one reached from either end"}])

# ---------------------------------------------------------------- unit 17
mk("u17-02", "chem-alloy", "particles", "Why alloys are harder",
   "In a pure metal the layers of identical atoms slide over each other easily. Larger atoms of a second metal (here tin in copper, making bronze) distort the layers, so they cannot slide as easily and the alloy is harder.",
   "Left: a regular lattice of copper atoms. Right: the same lattice with a few larger tin atoms disrupting the rows.",
   ["Pure copper: regular rows that slide easily.", "Bronze: larger tin atoms among the copper, distorting the rows."],
   species={"Cu": {"atoms": ["Cu"]}, "Sn": {"atoms": ["Sn"]}}, steps=[None],
   panels=[{"title": "pure copper", "arrangement": "lattice", "contents": [["Cu", 24]]}, {"title": "bronze (Cu + Sn)", "arrangement": "lattice", "contents": [["Cu", 20], ["Sn", 4]], "alternate": False}],
   claims=[{"type": "classify", "panel": 0, "as": "element"}, {"type": "classify", "panel": 1, "as": "mixture"}])

mk("u17-03", "chem-polymers", "structures", "Addition polymers",
   "Many alkene molecules join by opening their C=C bonds. Ethene gives poly(ethene), propene gives poly(propene) with a CH₃ on every other carbon, and chloroethene gives PVC with a Cl on every other carbon. Each chain shown is a short section.",
   "Ethene, propene and chloroethene, each above a short section of its polymer chain.",
   ["Ethene → poly(ethene): a long saturated chain.", "Propene → poly(propene): methyl groups on alternate carbons.", "Chloroethene → PVC: chlorine atoms on alternate carbons."],
   perRow=[3, 3], bond=[28, 24],
   panels=[P("C=C", "ethene", groups=["alkene"]), P("C=CC", "propene", groups=["alkene"]), P("C=CCl", "chloroethene", groups=["alkene"]),
           P("CCCCCCCC", "poly(ethene)", notGroups=["alkene"]), P("CC(C)CC(C)CC(C)C", "poly(propene)", notGroups=["alkene"]), P("CC(Cl)CC(Cl)CC(Cl)C", "PVC", notGroups=["alkene"], groups=["halogenoalkane"])])

mk("u17-04", "chem-addition-condensation-polymers", "structures", "Condensation polymerisation: nylon-6,6",
   "A diacid and a diamine join to form an amide link, losing water each time; repeating this at both ends of each monomer builds a polyamide. Unlike addition polymers, condensation polymers have a small molecule as a by-product and can be broken down by hydrolysis.",
   "Hexanedioic acid plus hexane-1,6-diamine gives one amide-linked unit plus water.",
   ["Hexanedioic acid: a carboxylic acid at each end.", "Hexane-1,6-diamine: an amine at each end.", "They join through an amide bond, releasing H₂O."],
   between=["+", "→", "+"], bond=[24, 20], perRow=[4, 2],
   panels=[P("OC(=O)CCCCC(=O)O", "hexanedioic acid", groups=["carboxylic acid"]), P("NCCCCCCN", "hexane-1,6-diamine", groups=["primary amine"]),
           P("OC(=O)CCCCC(=O)NCCCCCCN", "amide-linked unit", groups=["amide"], highlight=[{"group": "amide", "colour": "a3"}]), P("O", "water", displayed=True)],
   claims=[{"type": "reaction", "left": [0, 1], "right": [2, 3]}])

mk("u17-05", "chem-biopolymers", "structures", "Natural condensation polymers",
   "Proteins are chains of amino acids joined by peptide (amide) links; polysaccharides such as starch are chains of glucose joined by glycosidic (C–O–C) links. Both form by condensation, releasing water, and are broken down by hydrolysis during digestion.",
   "A dipeptide with its peptide link shaded, and maltose, two glucose units joined by a glycosidic link.",
   ["Glycylalanine: two amino acids joined by –CO–NH–.", "Maltose: two glucose rings joined by an oxygen bridge."],
   panels=[P("NCC(=O)N[C@@H](C)C(=O)O", "a dipeptide", groups=["peptide link"], highlight=[{"group": "peptide link", "colour": "a3"}]),
           P("OC[C@H]1O[C@H](O[C@H]2[C@H](O)[C@@H](O)[C@H](O)O[C@@H]2CO)[C@H](O)[C@@H](O)[C@@H]1O", "maltose", formula="C12H22O11", groups=["ether"])])

mk("u17-07", "chem-band-gap", "levels", "Conductors, semiconductors and insulators",
   "In a metal the filled and empty bands overlap, so electrons move freely. In a semiconductor such as silicon the gap is small (1.1 eV), so heat or light can lift some electrons across. In an insulator such as diamond the gap (5.5 eV) is too large.",
   "Three band diagrams side by side. Each has a shaded filled band (the valence band) below an outlined empty band (the conduction band): in the metal they overlap; in silicon a 1.1 eV gap separates them; in diamond a 5.5 eV gap.",
   ["Metal: the empty band starts below the top of the filled band, so the bands overlap and electrons move freely.", "Silicon: a 1.1 eV gap, small enough for heat or light to lift some electrons across.", "Diamond: a 5.5 eV gap, too large to cross, so it insulates."],
   kind="custom", height=[330, 360], axisLabel="electron energy / eV",
   # filled bands shaded, empty bands outlined; the band edges are levels too, so the checks read the gaps from them
   bands=[{"x0": 0.08, "x1": 0.3, "lo": -2.0, "hi": 1.0, "filled": True}, {"x0": 0.08, "x1": 0.3, "lo": 0.6, "hi": 2.6},
          {"x0": 0.4, "x1": 0.62, "lo": -2.0, "hi": 0, "filled": True}, {"x0": 0.4, "x1": 0.62, "lo": 1.1, "hi": 2.6},
          {"x0": 0.72, "x1": 0.94, "lo": -2.0, "hi": 0, "filled": True, "label": "filled"}, {"x0": 0.72, "x1": 0.94, "lo": 5.5, "hi": 7.0, "label": "empty"}],
   levels=[{"id": "mv", "E": 1.0, "x0": 0.08, "x1": 0.3, "thin": True, "colour": "a1"}, {"id": "mc", "E": 0.6, "x0": 0.08, "x1": 0.3, "thin": True, "colour": "a4", "dash": True},
           {"id": "sv", "E": 0, "x0": 0.4, "x1": 0.62, "thin": True, "colour": "a1"}, {"id": "sc", "E": 1.1, "x0": 0.4, "x1": 0.62, "thin": True, "colour": "a4", "dash": True},
           {"id": "dv", "E": 0, "x0": 0.72, "x1": 0.94, "thin": True, "colour": "a1"}, {"id": "dc", "E": 5.5, "x0": 0.72, "x1": 0.94, "thin": True, "colour": "a4", "dash": True}],
   transitions=[{"from": "sv", "to": "sc", "x": 0.51, "label": "1.1 eV", "colour": "a2"}, {"from": "dv", "to": "dc", "x": 0.83, "label": "5.5 eV gap", "colour": "a2"}],
   notes=[{"x": 0.19, "E": 1.0, "dy": -50, "text": "overlap", "bold": True, "colour": "a2"},
          {"x": 0.19, "E": -2.0, "dy": 18, "text": "metal", "bold": True, "colour": "ink"}, {"x": 0.51, "E": -2.0, "dy": 18, "text": "silicon", "bold": True, "colour": "ink"}, {"x": 0.83, "E": -2.0, "dy": 18, "text": "diamond", "bold": True, "colour": "ink"}],
   claims=[{"type": "below", "a": "mc", "b": "mv", "name": "metal: the empty band starts below the top of the filled band (overlap)"}, {"type": "lower", "transitions": [0, 1], "name": "silicon's gap is smaller than diamond's"}])

mk("u17-08", "chem-surface-area-volume", "graph", "Why nanoparticles are so reactive",
   "For a cube of side d, surface area ÷ volume = 6/d. Shrinking a particle from 100 nm to 1 nm multiplies its surface-to-volume ratio a hundredfold, so a far greater fraction of its atoms are at the surface, where reactions happen.",
   "Surface-to-volume ratio against particle size: 6/d, steep below 10 nm and small above 50 nm.",
   ["d = 100 nm: 0.06 nm⁻¹.", "d = 10 nm: 0.6 nm⁻¹.", "d = 1 nm: 6 nm⁻¹."],
   range={"x": [0, 100], "y": [0, 3]}, ticks=[[10, 25, 50, 75, 100], [1, 2, 3]], grid=[10, 0.5], axisLabels=["particle size d / nm", "surface area ÷ volume / nm⁻¹"], xLabelBelow=True,
   curves=[{"expr": "6/x", "domain": [2, 100], "colour": "a2"}], points=[{"x": 10, "y": 0.6, "label": "10 nm: 0.6"}],
   checks=[{"type": "point", "expr": "6/x", "x": 10, "y": 0.6, "name": "a 10 nm cube: 6 × 10² ÷ 10³ = 0.6 nm⁻¹"}, {"type": "point", "expr": "6/x", "x": 100, "y": 0.06}])

OZ = ["Cl• + O3 → ClO• + O2", "ClO• + O → Cl• + O2"]
mk("u17-12", "chem-ozone-cycle", "flow", "How chlorine destroys ozone",
   "UV light breaks C–Cl bonds in CFCs high in the stratosphere, releasing chlorine radicals. Each Cl• destroys an ozone molecule and is regenerated, so one radical can destroy many thousands of O₃ molecules before it is removed.",
   "A cycle: Cl• reacts with O₃ to give ClO• and O₂; ClO• reacts with an O atom to give O₂ and Cl• again.",
   ["Cl• + O₃ → ClO• + O₂.", "ClO• + O → Cl• + O₂.", "Overall: O₃ + O → 2O₂; chlorine is regenerated."],
   layout="cycle", radius=110, nodes=[{"id": "cl", "label": "Cl•", "tone": "a2"}, {"id": "clo", "label": "ClO•", "tone": "a5"}],
   edges=[{"from": "cl", "to": "clo", "label": "+ O₃ → + O₂", "eq": OZ[0]}, {"from": "clo", "to": "cl", "label": "+ O → + O₂", "eq": OZ[1]}],
   centre="net: O₃ + O → 2O₂", claims=[{"type": "net", "steps": OZ, "net": "O3 + O → 2O2"}, {"type": "regenerated", "species": "Cl•", "steps": OZ}])

h1, h2 = 6.35, 10.33
f0 = f"1/(1+10^(x-{h1})+10^(2*x-{h1}-{h2}))"; f1 = f"10^(x-{h1})/(1+10^(x-{h1})+10^(2*x-{h1}-{h2}))"; f2 = f"10^(2*x-{h1}-{h2})/(1+10^(x-{h1})+10^(2*x-{h1}-{h2}))"
mk("u17-13", "chem-carbonate-speciation", "graph", "Carbon dioxide in natural water",
   "Dissolved CO₂ exists as CO₂(aq), HCO₃⁻ and CO₃²⁻ in proportions set by pH. They cross at pKa₁ = 6.35 and pKa₂ = 10.33. At seawater's pH of about 8.1, hydrogencarbonate dominates; as the ocean acidifies, carbonate falls, which harms shell-building organisms.",
   "Fractions of CO₂(aq), HCO₃⁻ and CO₃²⁻ against pH: CO₂ falls, HCO₃⁻ peaks around pH 8.3, CO₃²⁻ rises; crossings at pH 6.35 and 10.33.",
   ["Below pH 6: mostly CO₂(aq).", "pH 6.35: CO₂ = HCO₃⁻.", "Around 8: mostly HCO₃⁻ (seawater 8.1).", "pH 10.33: HCO₃⁻ = CO₃²⁻."],
   range={"x": [4, 13], "y": [0, 1.05]}, ticks=[[4, 6, 8, 10, 12], [0.5, 1]], grid=[1, 0.25], axisLabels=["pH", "fraction"], xLabelBelow=True,
   curves=[{"expr": f0, "colour": "a1", "label": "CO₂(aq)", "labelAt": [4.3, 0.92]}, {"expr": f1, "colour": "a4", "label": "HCO₃⁻", "labelAt": [7.6, 1.0]}, {"expr": f2, "colour": "a2", "label": "CO₃²⁻", "labelAt": [11.6, 0.92]}],
   marks=[{"x": 8.1, "label": "seawater", "to": 1}],
   checks=[{"type": "value", "expr": f"({f0})-({f1})", "x": h1, "between": [-0.001, 0.001], "name": "CO₂ and HCO₃⁻ are equal at pH = pKa₁ = 6.35"},
           {"type": "value", "expr": f"({f1})-({f2})", "x": h2, "between": [-0.001, 0.001], "name": "HCO₃⁻ and CO₃²⁻ are equal at pH = pKa₂ = 10.33"},
           {"type": "max", "expr": f1, "domain": [5, 12], "x": round((h1 + h2) / 2, 2), "y": 0.97994, "name": "HCO₃⁻ peaks halfway between, at pH 8.34, at 98% of the total"}])

mk("u17-15", "chem-water-treatment", "flow", "Making water safe to drink",
   "River or reservoir water is screened to remove large debris, treated with a coagulant (aluminium or iron(III) sulfate) so fine particles clump and settle, filtered through sand, and finally chlorinated to kill microorganisms.",
   "A flow: screening → coagulation and sedimentation → sand filtration → chlorination → drinking water.",
   ["Screening: removes twigs and litter.", "Coagulation and sedimentation: small particles clump and settle.", "Sand filtration: removes remaining particles.", "Chlorination: kills bacteria."],
   also=["gcse:u05-18"], layout="line",
   nodes=[{"id": "a", "label": "screening"}, {"id": "b", "label": "coagulation", "sub": "Al₂(SO₄)₃"}, {"id": "c", "label": "sand filter"}, {"id": "d", "label": "chlorination", "sub": "Cl₂", "tone": "a4"}],
   edges=[{"from": "a", "to": "b"}, {"from": "b", "to": "c"}, {"from": "c", "to": "d"}], claims=[{"type": "equation", "eq": "Cl2 + H2O → HCl + HClO"}])

mk("u17-16", "chem-catalytic-converter", "flow", "Inside a catalytic converter",
   "A honeycomb coated with platinum, palladium and rhodium converts the three main pollutants in car exhaust: carbon monoxide and unburned hydrocarbons are oxidised, and nitrogen oxides are reduced to nitrogen.",
   "A flow from exhaust gases through the catalyst to cleaner gases, with the three reactions.",
   ["2CO + O₂ → 2CO₂.", "2NO + 2CO → N₂ + 2CO₂.", "Hydrocarbons + O₂ → CO₂ + H₂O, for example C₈H₁₈."],
   layout="line", nodes=[{"id": "a", "label": "exhaust", "sub": "CO, NO, hydrocarbons"}, {"id": "b", "label": "Pt/Pd/Rh catalyst", "tone": "a3"}, {"id": "c", "label": "out", "sub": "CO₂, N₂, H₂O", "tone": "a4"}],
   edges=[{"from": "a", "to": "b"}, {"from": "b", "to": "c"}],
   claims=[{"type": "equation", "eq": "2CO + O2 → 2CO2"}, {"type": "equation", "eq": "2NO + 2CO → N2 + 2CO2"}, {"type": "equation", "eq": "C8H18 + 12.5O2 → 8CO2 + 9H2O"}])

mk("u17-17", "chem-greenhouse", "levels", "How CO₂ absorbs infrared",
   "Earth radiates infrared. CO₂ molecules absorb photons of about 15 μm, which match the energy of their bending vibration (8.0 kJ mol⁻¹ per photon mole), and re-emit it in all directions, some back down: the greenhouse effect.",
   "Vibrational levels of CO₂'s bending mode, v = 0 and v = 1, with an upward arrow for absorption of 15 μm infrared.",
   ["v = 0: ground vibrational state.", "v = 1: the bend excited.", "Absorption of a 15 μm photon, 8.0 kJ mol⁻¹."],
   kind="custom", height=[230, 250],
   levels=[{"id": "v0", "label": "v = 0", "E": 0, "x0": 0.25, "x1": 0.6}, {"id": "v1", "label": "v = 1 (bend)", "E": 8.0, "x0": 0.25, "x1": 0.6}],
   transitions=[{"from": "v0", "to": "v1", "x": 0.42, "label": "absorbs 15 μm infrared", "colour": "a3"}], claims=[{"type": "photon", "nm": 15000, "kj": 7.98}])

KY = [(1960, 316.9), (1970, 325.7), (1980, 338.8), (1990, 354.4), (2000, 369.7), (2010, 389.9), (2020, 414.2)]
import numpy as np
pk = np.polyfit([y - 1960 for y, _ in KY], [c for _, c in KY], 2)
kexpr = f"{pk[0]:.6f}*(x-1960)^2+{pk[1]:.5f}*(x-1960)+{pk[2]:.3f}+3*sin(6.283185*x)"
mk("u17-18", "chem-keeling", "graph", "Atmospheric carbon dioxide at Mauna Loa",
   "Annual mean CO₂ has risen from about 317 ppm in 1960 to 414 ppm in 2020, and the rise is accelerating. The yearly wiggle is the Northern Hemisphere's plants taking up CO₂ in summer and releasing it in winter. Fitted to NOAA annual means; seasonal cycle ±3 ppm.",
   "CO₂ concentration against year from 1958 to 2023: a curve rising from about 315 to 420 ppm with a small seasonal oscillation.",
   ["1960: 317 ppm.", "1990: 354 ppm.", "2020: 414 ppm; a seasonal swing of about 6 ppm each year."],
   also=["gcse:u05-17"],
   range={"x": [1958, 2024], "y": [300, 430]}, ticks=[[1960, 1980, 2000, 2020], [300, 340, 380, 420]], grid=[10, 20], axisLabels=["year", "CO₂ / ppm"], xLabelBelow=True,
   curves=[{"expr": kexpr, "colour": "a2", "samples": 1600}], points=[{"x": y, "y": c, "colour": "a1"} for y, c in KY],
   checks=[{"type": "value", "expr": kexpr, "x": y + 0.5, "between": [c - 2.5, c + 2.5], "name": f"{y}: within the seasonal swing of the NOAA annual mean {c} ppm"} for y, c in KY[::2]])

mk("u17-19", "chem-process-flow", "flow", "A continuous process with recycling",
   "In the Haber process only about 15% of the gas reacts in one pass through the converter. The mixture is cooled so ammonia liquefies and is removed, and the unreacted nitrogen and hydrogen are recycled, so overall about 98% is eventually converted.",
   "A flow: N₂ + H₂ feed → converter (iron catalyst) → cooler/separator → liquid NH₃ out, with unreacted gases recycled to the converter.",
   ["Fresh N₂ and H₂ fed in.", "Converter: N₂ + 3H₂ ⇌ 2NH₃ over iron at about 450 °C, 200 atm.", "Cooler: NH₃ condenses and is removed.", "Unreacted N₂ and H₂ are recycled."],
   layout="grid", rowHeight=110, boxWidth=120,
   nodes=[{"id": "f", "label": "N₂ + 3H₂ feed", "col": 0, "row": 0}, {"id": "r", "label": "converter", "sub": "Fe, 450 °C", "col": 1, "row": 0, "tone": "a3"},
          {"id": "s", "label": "cooler / separator", "col": 2, "row": 0}, {"id": "p", "label": "liquid NH₃", "col": 2, "row": 1, "tone": "a4"}, {"id": "rc", "label": "unreacted N₂ + H₂", "col": 1, "row": 1}],
   edges=[{"from": "f", "to": "r"}, {"from": "r", "to": "s", "eq": "N2 + 3H2 → 2NH3"}, {"from": "s", "to": "p"}, {"from": "s", "to": "rc", "label": "recycle"}, {"from": "rc", "to": "r", "label": "recycle"}])

mk("u17-20", "chem-batch-continuous", "classify", "Batch or continuous?",
   "Continuous processes suit very large volumes of a single product made all the time (ammonia, sulfuric acid, petrol). Batch processes suit smaller amounts of many products, made in turn in the same equipment (pharmaceuticals, dyes, flavours).",
   "A tree: is a large volume of one product needed continuously? Continuous. Otherwise: batch.",
   ["Large, steady demand for one product: continuous, such as ammonia.", "Smaller amounts or many products: batch, such as medicines."],
   start="q", rowHeight=100,
   nodes={"q": {"q": "Is a very large volume of one product needed all the time?", "yes": "c", "no": "b"},
          "c": {"leaf": "Continuous process", "examples": ["NH3", "H2SO4"], "kind": "compound", "tone": "a1"}, "b": {"leaf": "Batch process", "examples": ["medicines, dyes"], "tone": "a3"}},
   claims=[{"type": "path", "substance": "ammonia", "answers": ["yes"], "leaf": "Continuous process"}])

mk("u17-21", "chem-industrial-catalyst", "energy-profile", "The Haber process with and without iron",
   "Breaking the N≡N triple bond gives the uncatalysed reaction a very high activation energy. On iron, nitrogen and hydrogen adsorb and react in a series of lower-barrier surface steps, so the rate is fast enough at 450 °C. ΔH (−92 kJ mol⁻¹) is unchanged.",
   "Two profiles: uncatalysed with one very high peak; catalysed with several small humps; both ending at the same lower product level.",
   ["Uncatalysed: one high barrier.", "On iron: several smaller barriers via adsorbed intermediates.", "Same start and finish: ΔH unchanged."],
   profiles=[{"title": "uncatalysed", "colour": "a1", "points": [{"x": 0, "e": 60, "kind": "start", "label": "N₂ + 3H₂"}, {"x": 0.5, "e": 170, "kind": "ts", "label": "TS"}, {"x": 1, "e": 15, "kind": "end", "label": "2NH₃"}],
              "ea": [{"from": 0, "to": 1, "label": "Ea", "dx": 0, "anchor": "start"}], "expect": {"ts": 1, "int": 0, "dh": "exothermic"}},
             {"title": "on iron", "colour": "a4", "points": [{"x": 0, "e": 60, "kind": "start", "label": "N₂ + 3H₂"}, {"x": 0.2, "e": 95, "kind": "ts", "label": ""}, {"x": 0.38, "e": 45, "kind": "int", "label": "N(ads)"},
              {"x": 0.58, "e": 80, "kind": "ts", "label": ""}, {"x": 0.75, "e": 35, "kind": "int", "label": "NH(ads)"}, {"x": 0.88, "e": 62, "kind": "ts", "label": ""}, {"x": 1, "e": 15, "kind": "end", "label": "2NH₃"}],
              "expect": {"ts": 3, "int": 2, "rds": 1, "dh": "exothermic"}}])

FR = [("refinery gases", "below 25"), ("petrol", "40–110"), ("naphtha", "110–180"), ("kerosene", "180–260"), ("diesel", "260–340"), ("fuel oil", "340–400"), ("bitumen", "above 400")]
mk("u17-22", "chem-fractionating-column", "apparatus", "Fractional distillation of crude oil",
   "Crude oil is vaporised and enters near the bottom of a column that is hot at the bottom and cooler at the top. Each fraction condenses where the temperature falls below its boiling range: the shortest molecules, with the lowest boiling points, rise furthest.",
   "A tall column with outlets at different heights: refinery gases at the top, then petrol, naphtha, kerosene, diesel, fuel oil, and bitumen at the bottom.",
   [f"{n}: {b} °C." for n, b in FR],
   also=["gcse:u05-14"], kind="fractionating", fractions=[{"name": n, "bp": b, "order": i} for i, (n, b) in enumerate(FR)])

mk("u17-23", "chem-haber-ostwald", "flow", "From ammonia to fertiliser",
   "Ammonia from the Haber process is oxidised over platinum to nitrogen monoxide, which becomes nitrogen dioxide and then nitric acid (the Ostwald process). Nitric acid and more ammonia make ammonium nitrate fertiliser.",
   "A flow: N₂ + H₂ → NH₃ → NO → NO₂ → HNO₃ → NH₄NO₃.",
   ["N₂ + 3H₂ → 2NH₃.", "4NH₃ + 5O₂ → 4NO + 6H₂O (Pt catalyst).", "2NO + O₂ → 2NO₂.", "4NO₂ + O₂ + 2H₂O → 4HNO₃.", "HNO₃ + NH₃ → NH₄NO₃."],
   layout="line", nodes=[{"id": "a", "label": "NH₃"}, {"id": "b", "label": "NO"}, {"id": "c", "label": "NO₂"}, {"id": "d", "label": "HNO₃"}, {"id": "e", "label": "NH₄NO₃", "tone": "a4"}],
   edges=[{"from": "a", "to": "b", "label": "O₂, Pt", "eq": "4NH3 + 5O2 → 4NO + 6H2O"}, {"from": "b", "to": "c", "label": "O₂", "eq": "2NO + O2 → 2NO2"},
          {"from": "c", "to": "d", "label": "O₂, H₂O", "eq": "4NO2 + O2 + 2H2O → 4HNO3"}, {"from": "d", "to": "e", "label": "+ NH₃", "eq": "HNO3 + NH3 → NH4NO3"}],
   claims=[{"type": "equation", "eq": "N2 + 3H2 → 2NH3"}])

mk("u17-25", "chem-atom-economy-routes", "flow", "Comparing routes by atom economy",
   "Atom economy = mass of desired product ÷ total mass of reactants × 100. Hydrating ethene puts every atom into ethanol (100%); fermenting glucose loses two CO₂ for every two ethanol (51.1%), although it uses a renewable feedstock.",
   "Two routes to ethanol: ethene + steam (atom economy 100%) and fermentation of glucose (51.1%).",
   ["C₂H₄ + H₂O → C₂H₅OH: 100%.", "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂: 2 × 46.07 ÷ 180.16 = 51.1%."],
   layout="grid", rowHeight=96, boxWidth=150,
   nodes=[{"id": "a", "label": "ethene + steam", "col": 0, "row": 0}, {"id": "b", "label": "ethanol", "sub": "atom economy 100%", "col": 1, "row": 0, "tone": "a4"},
          {"id": "c", "label": "glucose (fermentation)", "col": 0, "row": 1}, {"id": "d", "label": "ethanol + CO₂", "sub": "atom economy 51.1%", "col": 1, "row": 1, "tone": "a3"}],
   edges=[{"from": "a", "to": "b", "label": "H₃PO₄, 300 °C"}, {"from": "c", "to": "d", "label": "yeast, 35 °C"}],
   claims=[{"type": "atomEconomy", "eq": "C2H4 + H2O → C2H5OH", "product": "C2H5OH", "value": 100}, {"type": "atomEconomy", "eq": "C6H12O6 → 2C2H5OH + 2CO2", "product": "C2H5OH", "value": 51.1}])

mk("u17-26", "chem-circular", "flow", "A circular economy for materials",
   "Instead of take, make, use and throw away, materials are kept in use: products are designed to be repaired, reused and finally recycled into new feedstock, so less virgin raw material is needed and less waste is produced.",
   "A loop: make → use → collect → recycle → back to make.",
   ["Make products from recycled feedstock.", "Use, repair and reuse them.", "Collect at end of life.", "Recycle into feedstock again."],
   layout="cycle", radius=110, nodes=[{"id": "m", "label": "make"}, {"id": "u", "label": "use and repair"}, {"id": "c", "label": "collect"}, {"id": "r", "label": "recycle", "tone": "a4"}],
   edges=[{"from": "m", "to": "u"}, {"from": "u", "to": "c"}, {"from": "c", "to": "r"}, {"from": "r", "to": "m"}])

mk("u17-27", "chem-waste-hierarchy", "classify", "The waste hierarchy",
   "Options for waste in order of preference: prevent it in the first place, reuse, recycle, recover energy (incineration), and only last dispose of it in landfill.",
   "A tree working down the hierarchy: can the waste be prevented? Otherwise reused? Otherwise recycled? Otherwise burned for energy? Otherwise disposed of.",
   ["Prevent: design processes that make less waste.", "Reuse.", "Recycle.", "Recover energy.", "Dispose: the last resort."],
   start="a", rowHeight=86,
   nodes={"a": {"q": "Can the waste be prevented?", "yes": "pv", "no": "b"}, "pv": {"leaf": "Prevent", "tone": "good"}, "b": {"q": "Can it be reused?", "yes": "ru", "no": "c"}, "ru": {"leaf": "Reuse", "tone": "a4"},
          "c": {"q": "Can it be recycled?", "yes": "rc", "no": "d"}, "rc": {"leaf": "Recycle", "tone": "a1"}, "d": {"q": "Can energy be recovered?", "yes": "en", "no": "dp"}, "en": {"leaf": "Recover energy", "tone": "a3"},
          "dp": {"leaf": "Dispose (landfill)", "tone": "bad"}},
   claims=[{"type": "path", "substance": "a waste that can only be burned", "answers": ["no", "no", "no", "yes"], "leaf": "Recover energy"}])

# ---------------------------------------------------------------- unit 19
mk("u19-04", "chem-reaction-setup", "apparatus", "Setting up a reaction",
   "A round-bottomed flask heated in a mantle with a reflux condenser on top lets a reaction be heated for a long time without losing solvent; a dropping funnel adds a reagent slowly to control an exothermic reaction.",
   "A round-bottomed flask on a heating mantle with a vertical condenser and a dropping funnel.",
   ["Flask with reaction mixture and anti-bumping granules.", "Vertical condenser, water in at the bottom.", "Dropping funnel to add reagent dropwise."],
   kind="reflux", funnel="dropping funnel", mixture="reaction mixture")

mk("u19-05", "chem-reflux", "apparatus", "Heating under reflux",
   "Vapour rises into the vertical condenser, cools and drips back, so a volatile mixture can be heated at its boiling point for as long as needed without boiling dry. Cooling water enters at the bottom of the condenser so the jacket stays full; the top is open so pressure cannot build up.",
   "A round-bottomed flask with anti-bumping granules over heat, with a vertical Liebig condenser: water in at the lower inlet, out at the upper one, open at the top.",
   ["Heat under the flask; anti-bumping granules for smooth boiling.", "Condenser vertical, open to the air at the top.", "Water in at the bottom, out at the top."],
   kind="reflux", mixture="ethanol + acidified K₂Cr₂O₇")

mk("u19-06", "chem-distillation", "apparatus", "Simple distillation",
   "The vapour leaving the flask passes the thermometer bulb, placed level with the side arm so it reads the temperature of the vapour that is distilling, then condenses in a sloping condenser and is collected. Water enters the lower end of the condenser.",
   "A heated flask, a still head with a thermometer bulb at the side arm, a sloping condenser with water in at the lower end, and a collecting flask.",
   ["Heat the mixture.", "Thermometer bulb level with the side arm.", "Condenser: water in at the lower end, out at the upper end.", "The distillate is collected."],
   kind="distillation", mixture="ethanol and water")

mk("u19-07", "chem-separating-funnel", "apparatus", "Using a separating funnel",
   "Two immiscible liquids form layers, the denser one below. Dichloromethane (1.33 g cm⁻³) sinks below water, so an organic product dissolved in it is run off from the bottom through the tap.",
   "A separating funnel with a stopper and tap: an aqueous layer on top and a dichloromethane layer below.",
   ["Upper layer: water (1.00 g cm⁻³).", "Lower layer: dichloromethane (1.33 g cm⁻³), containing the organic product.", "Open the stopper, then run off the lower layer through the tap."],
   kind="separating", layers=[{"name": "water", "colour": "#bfdbfe", "note": "aqueous impurities"}, {"name": "dichloromethane", "colour": "#fde68a", "note": "organic product"}])

rx = "0.3*exp(0.0396*(x-20))"
mk("u19-08", "chem-recrystallisation", "graph", "Recrystallisation",
   "Benzoic acid is about 17 times more soluble in boiling water than at room temperature. Dissolving the crude solid in the minimum hot water, filtering, then cooling makes most of it crystallise out pure; soluble impurities stay in solution.",
   "Solubility of benzoic acid against temperature: rising steeply from 0.3 g at 20 °C to about 7 g at 100 °C.",
   ["20 °C: about 0.3 g per 100 g of water.", "100 °C: about 7 g: dissolve here in the minimum volume.", "Cooling to 20 °C crystallises out nearly all of it."],
   range={"x": [0, 100], "y": [0, 8]}, ticks=[[20, 40, 60, 80, 100], [2, 4, 6, 8]], grid=[20, 2], axisLabels=["temperature / °C", "solubility / g per 100 g water"], xLabelBelow=True,
   curves=[{"expr": rx, "colour": "a3"}], points=[{"x": 100, "y": round(0.3 * math.exp(0.0396 * 80), 3), "label": "dissolve hot", "dx": -10, "anchor": "end"}, {"x": 20, "y": 0.3, "label": "crystallise cold", "dy": -14}],
   checks=[{"type": "value", "expr": rx, "x": 20, "between": [0.29, 0.31], "name": "about 0.3 g at 20 °C"}, {"type": "value", "expr": rx, "x": 100, "between": [6.5, 7.5], "name": "about 7 g at 100 °C"}])

mk("u19-09", "chem-filtration", "apparatus", "Gravity and suction filtration",
   "Gravity filtration through folded paper separates an insoluble solid from a solution when the liquid is wanted. Büchner (suction) filtration is faster and dries the solid well, so it is used when the crystals are the product.",
   "A filter funnel with filter paper over a flask, and a Büchner funnel on a side-arm flask connected to a vacuum.",
   ["Gravity filtration: residue in the paper, filtrate below.", "Büchner filtration: crystals on the flat paper, liquid pulled into the flask by vacuum."],
   kind="filtration", residue="sand", filtrate="salt solution", insoluble="sand")

mk("u19-10", "chem-flash-column", "apparatus", "Flash column chromatography",
   "Air pressure pushes the eluent through a column of silica quickly. Less polar compounds spend less time adsorbed on the polar silica and leave first; more polar ones are held back and elute later.",
   "A column of silica with air pressure applied at the top; bands of three compounds separating, the least polar lowest.",
   ["Least polar compound: lowest band, elutes first.", "Medium polarity: middle band.", "Most polar: still near the top."],
   kind="column", pressure=True, bands=[{"label": "most polar", "polarity": 3, "y": 0.1, "colour": "a2"}, {"label": "medium", "polarity": 2, "y": 0.45, "colour": "a4"}, {"label": "least polar", "polarity": 1, "y": 0.8, "colour": "a1"}])

mk("u19-12", "chem-column", "apparatus", "Column chromatography",
   "A mixture of a non-polar hydrocarbon and a polar alcohol is loaded on top of a silica column and washed through with a non-polar eluent. The hydrocarbon barely sticks to the silica and comes off first; the alcohol hydrogen-bonds to the silica and comes off later.",
   "A silica column with two separating bands: the non-polar compound lower down, the polar compound near the top.",
   ["Lower band: the non-polar compound, eluting first.", "Upper band: the polar alcohol, held back by the silica."],
   kind="column", bands=[{"label": "alcohol", "note": "polar", "polarity": 3, "y": 0.15, "colour": "a2"}, {"label": "hydrocarbon", "note": "non-polar", "polarity": 1, "y": 0.75, "colour": "a1"}])

mk("u19-14", "chem-melting-range", "graph", "Melting point as a test of purity",
   "A pure compound melts sharply, over a degree or so, at its known melting point: benzoic acid at 122 °C. Impurities disrupt the lattice, so an impure sample melts lower and over a wider range.",
   "Temperature scale with two bars: pure benzoic acid melting from 121.5 to 122.5 °C, and an impure sample melting from 114 to 119 °C.",
   ["Pure: 121.5–122.5 °C, sharp.", "Impure: 114–119 °C, lower and broad."],
   range={"x": [110, 126], "y": [0, 3]}, ticks=[[110, 114, 118, 122, 126], []], axisLabels=["temperature / °C", ""], xLabelBelow=True, height=[220, 220],
   curves=[{"expr": "2", "domain": [121.5, 122.5], "colour": "a4", "width": 10, "label": "pure", "labelAt": [123, 2]}, {"expr": "1", "domain": [114, 119], "colour": "a2", "width": 10, "label": "impure", "labelAt": [119.5, 1]}],
   checks=[{"type": "order", "a": "119", "b": "121.5", "x": 0, "rel": "<", "name": "the impure sample finishes melting below the pure one starts"},
           {"type": "order", "a": "122.5-121.5", "b": "119-114", "x": 0, "rel": "<", "name": "the impure range (5 °C) is wider than the pure one (1 °C)"}])

mk("u19-15", "chem-reaction-monitoring", "apparatus", "Following a reaction by TLC",
   "Spotting the reaction mixture on TLC plates over time shows the starting material (Rf 0.55) fading as the product (Rf 0.30) grows. When the starting-material spot has gone, the reaction is complete.",
   "Three TLC plates at 0, 30 and 60 minutes; the high spot fades and the low spot appears.",
   ["0 min: only the starting material spot.", "30 min: both spots.", "60 min: only the product spot: complete."],
   kind="tlc", plates=[{"title": "0 min", "lanes": [{"label": "RM", "spots": [0.55], "colour": "a1"}]}, {"title": "30 min", "lanes": [{"label": "RM ", "spots": [0.55, 0.30], "colour": "a5"}]},
                       {"title": "60 min", "lanes": [{"label": "RM  ", "spots": [0.30], "colour": "a2"}]}],
   claims=[{"type": "gone", "lane": "RM  ", "rf": 0.55}])

mk("u19-16", "chem-synthesis-plan", "flow", "Planning a synthesis",
   "Start from the target and the available starting materials; choose reactions that build the carbon skeleton and install the functional groups; consider conditions, yield, safety and purification at each step; then confirm the product by analysis.",
   "A flow: target → identify key bonds and groups → choose reactions and conditions → carry out and purify → analyse.",
   ["Define the target.", "Work out which bonds and groups must be made.", "Choose reactions, conditions and the order of steps.", "Purify and confirm by melting point, IR and NMR."],
   layout="line", nodes=[{"id": "a", "label": "target"}, {"id": "b", "label": "key bonds and groups"}, {"id": "c", "label": "reactions and order"}, {"id": "d", "label": "purify and analyse", "tone": "a4"}],
   edges=[{"from": "a", "to": "b"}, {"from": "b", "to": "c"}, {"from": "c", "to": "d"}])

mk("u19-17", "chem-retrosynthesis", "flow", "A retrosynthetic disconnection",
   "Work backwards: disconnect the ester in ethyl ethanoate at the C–O bond to give two synthons, an acyl cation and an alkoxide. Their real equivalents are ethanoyl chloride and ethanol, which react directly.",
   "Ethyl ethanoate, a retrosynthetic arrow, the synthons CH₃CO⁺ and ⁻OC₂H₅, and the reagents ethanoyl chloride and ethanol.",
   ["Target: CH₃COOC₂H₅.", "Disconnect the C–O bond: synthons CH₃CO⁺ and C₂H₅O⁻.", "Reagents: CH₃COCl and C₂H₅OH."],
   layout="line", nodes=[{"id": "t", "label": "CH₃COOC₂H₅", "sub": "target", "tone": "a5"}, {"id": "s", "label": "CH₃CO⁺ + ⁻OC₂H₅", "sub": "synthons"}, {"id": "r", "label": "CH₃COCl + C₂H₅OH", "sub": "reagents", "tone": "a4"}],
   edges=[{"from": "t", "to": "s", "label": "disconnect"}, {"from": "s", "to": "r", "label": "equivalents"}], claims=[{"type": "equation", "eq": "CH3COCl + C2H5OH → CH3COOC2H5 + HCl"}])

mk("u19-18", "chem-protecting-group", "flow", "Protect, react, deprotect",
   "To reduce the ester of a keto-ester without touching the ketone, first protect the ketone as an acetal (with ethane-1,2-diol and acid), carry out the reduction with LiAlH₄, then remove the acetal with aqueous acid.",
   "A flow: keto-ester → acetal-protected keto-ester → reduced (ester to alcohol) → deprotected hydroxy-ketone.",
   ["Protect: ketone → acetal with HOCH₂CH₂OH, H⁺.", "React: LiAlH₄ reduces the ester; the acetal is unaffected.", "Deprotect: H₃O⁺ returns the ketone."],
   layout="line", nodes=[{"id": "a", "label": "keto-ester"}, {"id": "b", "label": "acetal-protected", "tone": "a5"}, {"id": "c", "label": "ester reduced"}, {"id": "d", "label": "hydroxy-ketone", "tone": "a4"}],
   edges=[{"from": "a", "to": "b", "label": "protect"}, {"from": "b", "to": "c", "label": "LiAlH₄"}, {"from": "c", "to": "d", "label": "H₃O⁺"}])

mk("u19-19", "chem-multistep-yield", "flow", "Overall yield of a multi-step synthesis",
   "Yields multiply. Three steps of 85%, 70% and 90% give 0.85 × 0.70 × 0.90 = 54% overall, so long routes lose a lot of material and chemists look for short, high-yielding ones.",
   "A flow of three steps labelled 85%, 70% and 90%, ending in an overall yield of 54%.",
   ["Step 1: 85%.", "Step 2: 70%.", "Step 3: 90%.", "Overall: 54%."],
   layout="line", nodes=[{"id": "a", "label": "A"}, {"id": "b", "label": "B"}, {"id": "c", "label": "C"}, {"id": "d", "label": "D", "sub": "overall 54%", "tone": "a4"}],
   edges=[{"from": "a", "to": "b", "label": "85%"}, {"from": "b", "to": "c", "label": "70%"}, {"from": "c", "to": "d", "label": "90%"}],
   claims=[{"type": "yield", "steps": [0.85, 0.70, 0.90], "overall": 0.54}])

mk("u19-20", "chem-green-synthesis", "trend", "Waste by industry: the E-factor",
   "The E-factor is the mass of waste per mass of product. Oil refining makes very little waste per tonne; fine chemicals and pharmaceuticals can make 50 to over 100 kg of waste per kg, mostly solvents, because they use many steps. Upper ends of Sheldon's typical ranges.",
   "Bar chart on a logarithmic scale of E-factor: oil refining 0.1, bulk chemicals 5, fine chemicals 50, pharmaceuticals 100.",
   ["Oil refining: up to 0.1.", "Bulk chemicals: up to 5.", "Fine chemicals: up to 50.", "Pharmaceuticals: 100 and above."],
   kind="bars", dataset="eFactor", log=True, range=[0.05, 200], ticks=[0.1, 1, 10, 100], yLabel="E-factor / kg waste per kg product (log scale)", colour="a3",
   items=[{"key": k, "value": v} for k, v in [("oil refining", 0.1), ("bulk chemicals", 5), ("fine chemicals", 50), ("pharmaceuticals", 100)]], claims=[{"type": "increasing"}])
