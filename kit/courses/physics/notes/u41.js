// Unit 41: Classical Field Theory. Format: kit/course/notes.js
export default `
## Scalar, vector and tensor fields
S: A field assigns a quantity to every point in space and time: a number for a scalar field, an arrow for a vector field, or a matrix-like object for a tensor field. Temperature, wind velocity and stress in a bridge are everyday examples, and fundamental physics is built from fields.
H: Types of field
- **Scalar** φ(x, t): one number per point, unchanged by rotations (temperature, pressure, the Higgs field, gravitational potential).
- **Vector** V(x, t): magnitude and direction (velocity, E, B, gravitational field).
- **Tensor** T_{ij}(x, t): describes relationships between directions (stress, strain, inertia, metric, electromagnetic field tensor F_{μν}).
- **Spinor** fields (electrons) transform under the double cover of rotations.
H: How they transform
- Classified by behaviour under rotations (or Lorentz transformations): φ' = φ, V'_{i} = R_{ij}V_{j}, T'_{ij} = R_{ik}R_{jl}T_{kl}.
- Pseudovectors (B, angular momentum) don't flip under parity; polar vectors (E, velocity) do.
- Four-vectors in relativity: A^{μ} = (φ/c, A), J^{μ} = (cρ, J).
E: V'_{i} = R_{ij}V_{j} :: vector transformation under rotation
H: Differential operators
P: Gradient ∇φ (scalar → vector), divergence ∇·V (vector → scalar), curl ∇ × V (vector → pseudovector) and the Laplacian ∇^{2}. Key identities: ∇ × ∇φ = 0 and ∇·(∇ × V) = 0, the reasons potentials exist. Helmholtz's theorem: a vector field decaying at infinity is fixed by its divergence and curl.
E: ∇ × (∇φ) = 0, ∇·(∇ × A) = 0 :: vector identities
X: Compute ∇ · r and ∇ × r for r = (x, y, z).
> ∇·r = 1 + 1 + 1 = 3
> ∇ × r = 0, since each component depends only on its own coordinate
X: Is temperature gradient a scalar or vector?
> Vector: ∇T points uphill in temperature, with magnitude in K m^{-1}
K: Fields are classified by how they transform; scalars, vectors and tensors keep equations consistent in any frame.
!: The magnetic field is a pseudovector: under a mirror reflection it does not flip like velocity does.
Q: Give an example of a tensor field. | Stress in a material, the metric of spacetime, or the electromagnetic field tensor.
Q: What does Helmholtz's theorem state? | A well-behaved vector field is determined by its divergence and curl.
M1: Which is a scalar field? | Air pressure | Wind velocity | Magnetic field | Stress | One number per point.
M2: ∇·(∇ × A) equals: | 0 | ∇^{2}A | 1 | A | Divergence of a curl vanishes.

## Field equations
S: Field equations are partial differential equations that determine how fields vary in space and time, given their sources. Maxwell's equations, Poisson's equation, the wave equation and Einstein's equations all have this form.
H: Structure
- Linear field equations: sources on the right, differential operator on the left (∇^{2}φ = −ρ/ε_{0}).
- Superposition holds for linear equations: fields from separate sources add.
- Nonlinear equations (Einstein, Yang–Mills, Navier–Stokes) allow fields to act as their own sources.
H: Key examples
- **Poisson**: ∇^{2}φ = −ρ/ε_{0} (electrostatics); ∇^{2}Φ = 4πGρ (Newtonian gravity).
- **Wave equation**: □φ = 0 with □ = (1/c^{2})∂^{2}_{t} − ∇^{2}.
- **Klein–Gordon**: (□ + m^{2}c^{2}/ħ^{2})φ = 0, waves with dispersion.
- **Maxwell**: ∂_{μ}F^{μν} = μ_{0}J^{ν}, ∂_{[λ}F_{μν]} = 0.
- **Einstein**: G_{μν} = 8πGT_{μν}/c^{4}.
E: ∇^{2}Φ = 4πGρ :: Newtonian gravity
E: □A^{μ} = μ_{0}J^{μ} (Lorenz gauge) :: Maxwell in potentials
H: Well-posedness
P: A good field equation needs initial data (for hyperbolic equations: field and time derivative) and boundary data that determine a unique, stable solution. Causality means hyperbolic field equations propagate disturbances no faster than a characteristic speed. Constraint equations (like ∇·E = ρ/ε_{0}) must be satisfied by initial data and are then preserved by evolution.
X: Find the gravitational potential outside a sphere of mass M.
> ∇^{2}Φ = 0 outside; spherical symmetry gives Φ = A/r + B
> Matching to the total mass: Φ = −GM/r
X: Dispersion relation for Klein–Gordon waves?
> φ ∝ e^{i(kx−ωt)} ⇒ ω^{2} = c^{2}k^{2} + m^{2}c^{4}/ħ^{2}, i.e. E^{2} = p^{2}c^{2} + m^{2}c^{4}
K: Field equations connect fields to their sources; linear ones allow superposition, nonlinear ones allow self-interaction.
!: Gauss's law is a constraint, not an evolution equation; initial data must satisfy it.
Q: What makes Einstein's equations nonlinear? | Gravitational field energy itself gravitates; the metric appears in products in the curvature.
Q: What does the d'Alembertian □ represent? | The relativistic wave operator (1/c^{2})∂_{t}^{2} − ∇^{2}.
M1: The Klein–Gordon dispersion relation corresponds to: | E^{2} = p^{2}c^{2} + m^{2}c^{4} | E = pc only | E = p^{2}/2m | E = mc^{2} only | Relativistic energy.
M2: Superposition holds for: | Linear field equations | All field equations | Only Einstein's equations | Turbulent flows | Fields add.

## Lagrangian field theory
S: Lagrangian field theory derives field equations from a Lagrangian density integrated over spacetime. This compact formulation guarantees consistency with relativity when ℒ is a Lorentz scalar, and it makes symmetries and conservation laws easy to find.
H: From particles to fields
- Discrete masses on springs → continuous string: Σ → ∫dx, coordinate q_{i}(t) → field φ(x, t).
- Lagrangian L = ∫ℒ d^{3}x; action S = ∫ℒ d^{4}x.
- For a string: ℒ = ½μ(∂_{t}y)^{2} − ½T(∂_{x}y)^{2}, giving the wave equation with v = √(T/μ).
E: ℒ_{string} = ½μ(∂_{t}y)^{2} − ½T(∂_{x}y)^{2} :: string Lagrangian density
H: The Euler–Lagrange equation for fields
- ∂_{μ}(∂ℒ/∂(∂_{μ}φ)) = ∂ℒ/∂φ.
- Multiple fields give one equation each.
- Interaction terms (φ^{4}, ψ̄ψφ, J·A) couple fields.
E: ℒ = ½∂_{μ}φ∂^{μ}φ − V(φ) :: scalar field theory
H: Building Lagrangians
P: Choose fields and symmetries, write all allowed terms with few derivatives (kinetic terms ~(∂φ)^{2}, mass terms ~m^{2}φ^{2}, interactions). Lorentz invariance requires ℒ to be a scalar. The φ^{4} theory V = ½m^{2}φ^{2} + (λ/4!)φ^{4} is the standard toy model; with m^{2} < 0, its "Mexican hat" potential gives symmetry breaking and domain walls.
X: Derive the equation for ℒ = ½∂_{μ}φ∂^{μ}φ − (λ/4)(φ^{2} − v^{2})^{2}.
> □φ = −∂V/∂φ = −λφ(φ^{2} − v^{2})
> Vacua at φ = ±v; a kink φ = v tanh(√(λ/2)vx) connects them
X: Wave speed on a string with T = 100 N, μ = 0.01 kg m^{-1}?
> v = √(10^{4}) = 100 m s^{-1}
K: A Lagrangian density encodes a field theory; vary the action to get field equations.
!: ℒ is a density; the Lagrangian is its integral over space.
Q: What is the Lagrangian density of a vibrating string? | ½μ(∂y/∂t)^{2} − ½T(∂y/∂x)^{2}.
Q: Why must ℒ be a Lorentz scalar? | So the action and hence the field equations are the same in all inertial frames.
M1: The φ^{4} theory with negative m^{2} shows: | Spontaneous symmetry breaking | No vacuum | Free particles only | Gauge fields | Double-well potential.
M2: Each field in a Lagrangian gives: | Its own Euler–Lagrange equation | No equations | A conserved charge only | A gauge boson | One equation per field.

## Hamiltonian field theory
S: Hamiltonian field theory treats a field and its conjugate momentum density as canonical variables at every point. It gives the energy density, leads to Poisson brackets of fields, and is the starting point for canonical quantisation.
H: Momentum density and Hamiltonian
- Conjugate momentum density: π(x) = ∂ℒ/∂(∂_{t}φ).
- Hamiltonian density: ℋ = π∂_{t}φ − ℒ.
- Total H = ∫ℋ d^{3}x, the field energy.
- For a scalar: ℋ = ½π^{2} + ½(∇φ)^{2} + V(φ).
E: π = ∂ℒ/∂φ̇, ℋ = πφ̇ − ℒ :: canonical field variables
E: φ̇ = δH/δπ, π̇ = −δH/δφ :: Hamilton's field equations
H: Functional derivatives and brackets
- δH/δφ(x): how H changes when φ is varied at one point.
- Poisson bracket {φ(x), π(y)} = δ^{3}(x − y).
- Quantisation: [φ̂(x), π̂(y)] = iħδ^{3}(x − y).
H: Constraints
P: Gauge theories have constraints: in electromagnetism, A_{0} has no conjugate momentum, and Gauss's law appears as a constraint. Dirac's theory of constrained systems handles these. In general relativity, the Hamiltonian is a sum of constraints (ADM formalism), raising the "problem of time" in quantum gravity. Hamiltonian formulations underpin numerical relativity simulations of black hole mergers.
X: Hamiltonian density for the string ℒ = ½μẏ^{2} − ½Ty'^{2}.
> π = μẏ
> ℋ = π^{2}/(2μ) + ½Ty'^{2}: kinetic plus elastic energy density
X: EM: what is the momentum conjugate to A_{i}?
> π^{i} = ∂ℒ/∂Ȧ_{i} = −ε_{0}E^{i}; A_{0} has none
K: Fields become canonical variables at every point; ℋ gives energy density, and brackets lead to quantisation.
!: In gauge theories not every field component has a conjugate momentum; constraints must be handled carefully.
Q: What is the conjugate momentum density of a scalar field? | π = ∂ℒ/∂φ̇ = φ̇ for a standard kinetic term.
Q: What does canonical quantisation impose on fields? | [φ(x), π(y)] = iħδ^{3}(x − y).
M1: The scalar-field Hamiltonian density includes: | ½π^{2} + ½(∇φ)^{2} + V | ½π^{2} − V | Only V | π^{2}φ^{2} | Kinetic, gradient and potential.
M2: The ADM formalism is a Hamiltonian version of: | General relativity | QED | Fluid dynamics | Thermodynamics | Used in numerical relativity.

## Field symmetries
S: Symmetries of a field theory are transformations of the fields or spacetime that leave the action unchanged. They organise fields into multiplets, fix allowed interactions, give conservation laws and, when broken, explain masses and phases of matter.
H: Spacetime symmetries
- Translations, rotations and boosts form the Poincaré group.
- **Scale and conformal** symmetry: physics looks the same at all scales (critical points, massless theories).
- **Supersymmetry** (hypothetical): relates bosons and fermions.
H: Internal symmetries
- Act on field components without moving points.
- **Global**: same transformation everywhere; e.g. φ → e^{iα}φ for a complex scalar.
- **Local (gauge)**: transformation varies with x; requires gauge fields.
- Discrete: φ → −φ (Z_{2}), parity, charge conjugation, time reversal.
E: φ → e^{iα}φ, ℒ = |∂φ|^{2} − m^{2}|φ|^{2} invariant :: U(1) global symmetry
H: Symmetry breaking
P: **Explicit**: a small term breaks the symmetry (quark masses breaking chiral symmetry give pions small masses). **Spontaneous**: the ground state picks a direction (ferromagnets, superfluids, the Higgs). Goldstone's theorem: each broken continuous global symmetry generator gives a massless boson (spin waves, phonons, pions approximately). **Anomalous**: classical symmetries broken by quantum effects. Topological defects (domain walls, vortices, monopoles) form when symmetries break in different ways in different regions.
X: A complex scalar with V = λ(|φ|^{2} − v^{2})^{2}. What happens in the vacuum?
> |φ| = v; the phase is arbitrary, so U(1) is spontaneously broken
> Fluctuations of the phase are a massless Goldstone boson
K: Symmetries constrain theories; how they are broken explains much of the structure of matter and forces.
!: A spontaneously broken symmetry is still a symmetry of the laws; only the ground state isn't symmetric.
Q: What does Goldstone's theorem predict? | A massless boson for each spontaneously broken continuous global symmetry generator.
Q: Give an example of explicit symmetry breaking. | Small quark masses breaking chiral symmetry, making pions light but not massless.
M1: A φ → −φ symmetry is: | Discrete Z_{2} | Continuous U(1) | Gauge | Conformal | Two-element group.
M2: Domain walls form from breaking: | Discrete symmetries | Gauge symmetries only | No symmetry | Time translations | Separating different vacua.

## Noether currents
S: Each continuous symmetry of a field theory gives a Noether current, a four-vector j^{μ} whose divergence vanishes. Integrating its time component over space gives a conserved charge, such as electric charge, energy or momentum.
H: Deriving the current
- Under an infinitesimal symmetry φ → φ + εΔφ with ℒ → ℒ + ε∂_{μ}K^{μ}:
- j^{μ} = (∂ℒ/∂(∂_{μ}φ))Δφ − K^{μ}.
- On solutions, ∂_{μ}j^{μ} = 0.
- Charge Q = ∫j^{0} d^{3}x satisfies dQ/dt = 0 (if fields vanish at infinity).
E: j^{μ} = (∂ℒ/∂(∂_{μ}φ))Δφ − K^{μ} :: Noether current
E: dQ/dt = −∮j·dA = 0 :: conserved charge
H: Examples
- Complex scalar, U(1): j^{μ} = i(φ*∂^{μ}φ − φ∂^{μ}φ*), conserved particle number minus antiparticle number.
- Dirac field: j^{μ} = ψ̄γ^{μ}ψ; multiply by charge to get the electric current.
- Spacetime translations: energy–momentum tensor T^{μν}.
- Lorentz transformations: angular momentum tensor M^{μνλ}.
H: Local conservation
P: Conservation in field theory is local: ∂ρ/∂t + ∇·j = 0 means charge can't vanish here and reappear there; it must flow. In gauge theories the Noether current of the global symmetry is the source of the gauge field. Quantum anomalies can break classical Noether conservation, as for the axial current, explaining π^{0} → γγ.
X: Find the U(1) current for ℒ = ∂_{μ}φ*∂^{μ}φ − m^{2}φ*φ.
> Δφ = iφ, Δφ* = −iφ*
> j^{μ} = ∂^{μ}φ* (iφ) + ∂^{μ}φ (−iφ*) = i(φ∂^{μ}φ* − φ*∂^{μ}φ) (overall sign is a convention)
K: Each continuous symmetry yields a locally conserved current; integrating gives a conserved charge.
!: Conservation is local: charges flow continuously, they cannot teleport.
Q: What is the Noether current for the Dirac field's U(1) symmetry? | ψ̄γ^{μ}ψ, the probability (or charge) current.
Q: What equation expresses local conservation? | ∂ρ/∂t + ∇·j = 0, or ∂_{μ}j^{μ} = 0.
M1: Spacetime translation symmetry gives: | The energy–momentum tensor | Electric charge | Isospin | Parity | T^{μν}.
M2: Anomalies can: | Break classical conservation laws quantum-mechanically | Create charge | Remove gauge fields | Make fields classical | E.g. axial current.

## Conservation laws
S: Conservation laws state that certain quantities, such as energy, momentum, angular momentum and charge, stay constant in isolated systems. In field theory they take the form of continuity equations linking densities to fluxes, and they come from symmetries.
H: Continuity equations
- Density ρ and flux j: ∂ρ/∂t + ∇·j = source − sink.
- Integrate over a volume: rate of change inside = −flux out through the surface.
- Covariant form: ∂_{μ}j^{μ} = 0.
E: ∂ρ/∂t + ∇·j = 0 :: continuity equation
H: Examples across physics
- **Charge**: ρ_{q}, J.
- **Energy** in EM: u = ½(ε_{0}E^{2} + B^{2}/μ_{0}), flux S = E × H (Poynting); ∂u/∂t + ∇·S = −J·E (work on charges).
- **Momentum**: Maxwell stress tensor; radiation pressure.
- **Mass** in fluids: ∂ρ/∂t + ∇·(ρv) = 0.
- **Probability** in quantum mechanics: |ψ|^{2} and j = (ħ/m)Im(ψ*∇ψ).
E: ∂u/∂t + ∇·S = −J·E :: Poynting theorem
H: Exact and approximate laws
P: Some laws are exact as far as we know (energy, momentum, charge, angular momentum). Others are approximate: baryon and lepton number are conserved in all observed processes, but may be violated at very high energies or by non-perturbative effects; parity and CP are violated by the weak force. In general relativity, energy conservation is local (∇_{μ}T^{μν} = 0) but a global energy is defined only in special spacetimes.
X: A 1 kW m^{-2} beam hits an absorbing surface. Radiation pressure?
> P = I/c = 1000/(3 × 10^{8}) ≈ 3.3 μPa
> A reflecting surface feels twice this
X: Show charge conservation follows from Maxwell's equations.
> ∇·(∇ × H) = 0 = ∇·J + ∂(∇·D)/∂t = ∇·J + ∂ρ/∂t
K: Conservation laws are continuity equations: what flows out of a region must reduce what's inside.
!: Local conservation (continuity) is stronger than global conservation; it forbids instantaneous jumps between distant places.
Q: What is the Poynting vector? | S = E × H, the energy flux of the electromagnetic field.
Q: Is baryon number exactly conserved? | No known violation, but it's not protected by a gauge symmetry and may be violated at extreme energies.
M1: The continuity equation for mass in fluids is: | ∂ρ/∂t + ∇·(ρv) = 0 | ∇·v = ρ | ρ = const always | ∂v/∂t = 0 | Mass flows.
M2: Radiation pressure on an absorber is: | I/c | 2I/c | Ic | I/c^{2} | Momentum flux.

## Electromagnetic field theory
S: Electromagnetism is the prototype classical field theory: a gauge field A_{μ}, a Lagrangian, Maxwell's equations as field equations, and conservation of energy, momentum and charge. Writing it covariantly reveals that E and B are parts of one tensor.
H: The field tensor
- F_{μν} = ∂_{μ}A_{ν} − ∂_{ν}A_{μ}, with E and B as its components (F_{0i} ~ E_{i}/c, F_{ij} ~ ε_{ijk}B_{k}).
- Under Lorentz boosts, E and B mix: a pure E field in one frame has B in another.
- Invariants: F_{μν}F^{μν} ∝ B^{2} − E^{2}/c^{2}; F_{μν}F̃^{μν} ∝ E·B.
E: F_{μν} = ∂_{μ}A_{ν} − ∂_{ν}A_{μ} :: field strength
E: ∂_{μ}F^{μν} = μ_{0}J^{ν}, ∂_{μ}F̃^{μν} = 0 :: Maxwell's equations
H: Lagrangian and coupling
- ℒ = −(1/4μ_{0})F_{μν}F^{μν} − J_{μ}A^{μ}.
- The homogeneous equations (no monopoles, Faraday) are identities from F = dA.
- Charged particle: L = −mc^{2}/γ − qφ + qv·A gives the Lorentz force.
H: Fields as physical objects
P: Fields carry energy, momentum and angular momentum: radiation pressure, light's spin (polarisation) and orbital angular momentum. The Aharonov–Bohm effect shows potentials affect quantum phases even where fields vanish, making A more fundamental quantum-mechanically. Duality symmetry E → cB, cB → −E holds in vacuum and would be exact with magnetic monopoles.
X: A charge moves at v past a stationary observer. Why does the observer see a B field?
> In the charge's rest frame only E exists
> A boost mixes components: B' = −γ(v × E)/c^{2}
X: Is E·B Lorentz-invariant?
> Yes, E·B is proportional to F_{μν}F̃^{μν}, an invariant
K: E and B are components of one tensor F_{μν}; Maxwell's equations are its field equations and identities.
!: Whether a field is "electric" or "magnetic" depends on the observer's frame.
Q: What are the two Lorentz invariants of the EM field? | B^{2} − E^{2}/c^{2} and E·B.
Q: What does the Aharonov–Bohm effect show? | Electromagnetic potentials affect quantum phases even in regions with zero field.
M1: The homogeneous Maxwell equations follow from: | F = dA (Bianchi identity) | Charge conservation | Gauss's law | Lenz's law | No monopoles, Faraday's law.
M2: If E·B = 0 and |E| < c|B| in one frame, then: | There is a frame with only B | E vanishes everywhere | B vanishes | No frame changes it | Invariants determine this.

## Stress-energy tensors
S: The stress-energy tensor T^{μν} collects energy density, momentum density, energy flux and stress (pressure and shear) into one symmetric object. It is the conserved current of spacetime translations and the source of gravity in general relativity.
H: Components
- T^{00}: energy density.
- T^{0i}: momentum density × c = energy flux / c.
- T^{ij}: momentum flux = stress (pressure on diagonal, shear off diagonal).
- Symmetric (T^{μν} = T^{νμ}) for angular momentum conservation; 10 independent components.
E: ∂_{μ}T^{μν} = 0 :: energy–momentum conservation (flat spacetime)
H: Examples
- **Dust**: T^{μν} = ρu^{μ}u^{ν}.
- **Perfect fluid**: T^{μν} = (ρ + p/c^{2})u^{μ}u^{ν} − pg^{μν} (signature +−−−).
- **EM field**: T^{μν} = (1/μ_{0})[F^{μα}F^{ν}_{α} − ¼g^{μν}F_{αβ}F^{αβ}], traceless.
- **Scalar field**: T^{μν} = ∂^{μ}φ∂^{ν}φ − g^{μν}ℒ.
- **Cosmological constant**: T^{μν} ∝ g^{μν}, with p = −ρc^{2} (dark energy).
E: T^{μν} = (ρ + p/c^{2})u^{μ}u^{ν} − pg^{μν} :: perfect fluid
H: Physical role
P: Einstein's equations G_{μν} = (8πG/c^{4})T_{μν} make T the source of curvature: pressure and stress gravitate, not just mass. Energy conditions (weak, strong, dominant) restrict T and underlie singularity theorems; dark energy violates the strong energy condition, causing accelerated expansion. The canonical Noether tensor sometimes needs symmetrisation (Belinfante) to be physical.
X: Pressure of radiation from a traceless T^{μν}.
> Trace T = ρc^{2} − 3p = 0 ⇒ p = ρc^{2}/3
X: Equation of state for a cosmological constant?
> T^{μν} ∝ g^{μν} gives p = −ρc^{2}, w = −1
K: T^{μν} packages energy, momentum and stress; it is conserved and sources spacetime curvature.
!: In relativity pressure contributes to gravity; for radiation it doubles the gravitational effect of energy density.
Q: What does T^{00} represent? | Energy density.
Q: Why is the electromagnetic stress-energy tensor traceless? | Electromagnetism is scale (conformally) invariant; massless radiation has p = ρc^{2}/3.
M1: For dark energy (cosmological constant), w equals: | −1 | 0 | 1/3 | 1 | p = −ρc^{2}.
M2: T^{ij} components represent: | Stress (momentum flux) | Energy density | Charge | Spin | Pressure and shear.

## Classical wave fields
S: Wave fields carry energy and information through space as oscillations of a field. Sound, water waves, light and gravitational waves share common mathematics: wave equations, dispersion relations, interference and diffraction.
H: The wave equation
- (1/v^{2})∂_{t}^{2}φ − ∇^{2}φ = 0.
- Solutions: plane waves e^{i(k·r−ωt)} with ω = vk; spherical waves e^{i(kr−ωt)}/r.
- d'Alembert solution in 1D: f(x − vt) + g(x + vt).
E: φ(x, t) = f(x − vt) + g(x + vt) :: d'Alembert solution
H: Dispersion
- The dispersion relation ω(k) sets phase velocity v_{p} = ω/k and group velocity v_{g} = dω/dk.
- Non-dispersive: ω ∝ k (light in vacuum, sound in air).
- Dispersive: deep-water waves ω = √(gk) (v_{g} = v_{p}/2), Klein–Gordon, plasma waves ω^{2} = ω_{p}^{2} + c^{2}k^{2}.
- Evanescent waves: imaginary k below cutoff.
E: v_{p} = ω/k, v_{g} = dω/dk :: phase and group velocity
H: Energy, polarisation and interference
P: Wave energy density ∝ amplitude^{2}; intensity = energy density × group velocity. Vector waves (EM, elastic shear) have polarisation; tensor waves (gravitational) have two polarisations, + and ×. Superposition gives interference, standing waves and beats. Huygens–Fresnel and Kirchhoff integrals describe diffraction. Nonlinear media lead to harmonics, shocks and solitons.
X: Deep-water waves with λ = 100 m. Phase and group velocity?
> k = 2π/100 ≈ 0.0628 m^{-1}; ω = √(9.8 × 0.0628) ≈ 0.785 rad s^{-1}
> v_{p} = ω/k ≈ 12.5 m s^{-1}; v_{g} ≈ 6.2 m s^{-1}
X: Plasma with ω_{p} = 2π × 9 MHz. Can 5 MHz radio pass?
> ω < ω_{p}: k is imaginary, wave is evanescent and reflects (ionospheric reflection)
K: Wave fields obey wave equations; their dispersion relation sets speeds, and superposition gives interference.
!: Energy and information travel at the group velocity, which can differ greatly from the phase velocity.
Q: What is the group velocity of deep-water waves relative to phase velocity? | Half the phase velocity.
Q: How many polarisations do gravitational waves have? | Two, + and ×.
M1: A non-dispersive wave has: | v_{g} = v_{p} | v_{g} = 0 | v_{g} = 2v_{p} | No phase velocity | ω ∝ k.
M2: Below the plasma frequency, EM waves are: | Evanescent (reflected) | Transmitted unchanged | Amplified | Turned into sound | Imaginary k.

## Gauge invariance
S: Gauge invariance means that certain changes to the potentials leave all physical fields and predictions unchanged. It shows that potentials contain redundant information, constrains how fields can interact, and is the organising principle behind all fundamental forces.
H: In classical electromagnetism
- E = −∇φ − ∂A/∂t, B = ∇ × A.
- Gauge transformation: A → A + ∇χ, φ → φ − ∂χ/∂t leaves E and B unchanged.
- Covariant form: A_{μ} → A_{μ} − ∂_{μ}χ (sign depends on convention).
E: A → A + ∇χ, φ → φ − ∂χ/∂t :: gauge transformation
H: Choosing a gauge
- **Coulomb gauge**: ∇·A = 0; φ is the instantaneous Coulomb potential; good for radiation and atoms.
- **Lorenz gauge**: ∂_{μ}A^{μ} = 0; manifestly covariant; wave equations □A^{μ} = μ_{0}J^{μ}.
- **Temporal gauge**: φ = 0; **axial gauge**: A_{3} = 0.
- Gauge choice simplifies calculations but cannot change physical results.
E: ∂_{μ}A^{μ} = 0 :: Lorenz gauge
H: Physical consequences
P: Gauge invariance requires charge conservation (the source must satisfy ∂_{μ}J^{μ} = 0). It forbids a photon mass term m^{2}A_{μ}A^{μ}. In quantum mechanics, gauge transformations multiply ψ by e^{iqχ/ħ}; the Aharonov–Bohm phase (q/ħ)∮A·dl is gauge-invariant and measurable. Of A's four components, only two physical polarisations remain for free radiation. Gauge principles extend to non-abelian forces.
X: Show B is unchanged by A → A + ∇χ.
> ∇ × (A + ∇χ) = ∇ × A + ∇ × ∇χ = ∇ × A, since curl of a gradient is zero
X: Is ∮A·dl around a solenoid gauge-invariant?
> ∮∇χ·dl = 0 for single-valued χ, so yes: it equals the enclosed flux
K: Potentials are redundant; gauge invariance keeps physics independent of that redundancy and shapes how forces couple.
!: Different gauges give different-looking potentials but the same E, B and observable predictions.
Q: Why is gauge invariance linked to charge conservation? | The coupling J_{μ}A^{μ} is gauge-invariant only if ∂_{μ}J^{μ} = 0.
Q: What is the Lorenz gauge condition? | ∂_{μ}A^{μ} = 0, i.e. ∇·A + (1/c^{2})∂φ/∂t = 0.
M1: The Coulomb gauge sets: | ∇·A = 0 | φ = 0 | A = 0 | ∂_{μ}A^{μ} = 0 | Transverse vector potential.
M2: Gauge invariance forbids: | A photon mass term | Charge | Electric fields | Radiation | m^{2}A^{2} is not invariant.

## Green's functions for field equations
S: Green's functions solve field equations for point sources, so any source distribution can be handled by superposition. For wave equations, causal Green's functions build in the finite speed of propagation and give retarded potentials.
H: Static fields
- Poisson: ∇^{2}G = −δ^{3}(r − r') ⇒ G = 1/(4π|r − r'|).
- Potential from any charge: φ(r) = (1/4πε_{0})∫ρ(r')/|r − r'| d^{3}r'.
- Screened (Yukawa): (∇^{2} − μ^{2})G = −δ ⇒ G = e^{−μr}/(4πr); range 1/μ (Debye screening, meson exchange).
E: G_{Yukawa} = e^{−μ|r−r'|}/(4π|r − r'|) :: screened Green's function
H: The wave equation
- □G = δ^{4}(x − x').
- **Retarded** G_{ret} = δ(t − t' − |r − r'|/c)/(4π|r − r'|): effects follow causes.
- **Advanced** G_{adv}: effects precede causes (discarded on physical grounds, but used in some formulations).
- Retarded potentials: φ(r, t) = (1/4πε_{0})∫ρ(r', t_{r})/|r − r'| d^{3}r', with t_{r} = t − |r − r'|/c.
E: φ(r, t) = (1/4πε_{0})∫ρ(r', t − |r − r'|/c)/|r − r'| d^{3}r' :: retarded potential
H: Frequency domain and beyond
P: Fourier transforming in time gives the Helmholtz Green's function e^{ik|r−r'|}/(4π|r − r'|), used for antenna and scattering problems. In 2D and 1D, wave Green's functions have tails (Huygens' principle holds cleanly only in odd spatial dimensions ≥ 3). In curved spacetime and dispersive media, Green's functions also spread. The Liénard–Wiechert potentials of a moving point charge follow from the retarded Green's function.
X: A charge's position changes at t = 0. When does an observer 3 km away feel the change?
> t = 3000/(3 × 10^{8}) = 10 μs later
X: Debye length 1 μm: how much is the potential reduced at 3 μm relative to unscreened?
> Factor e^{−3} ≈ 0.05
K: Green's functions turn field equations into integrals over sources; the retarded choice enforces causality.
!: Static Coulomb fields seem instantaneous only in the Coulomb gauge's φ; physical fields E and B always propagate causally.
Q: What is the retarded time? | t_{r} = t − |r − r'|/c, the time a signal left the source to arrive now.
Q: What does Yukawa's Green's function describe? | A screened or short-range interaction with range 1/μ.
M1: In 3D, wave Green's functions are sharp (no tail) because: | Huygens' principle holds in odd dimensions ≥ 3 | Waves are slow | Light has mass | Space is flat only | Clean wavefronts.
M2: Liénard–Wiechert potentials describe fields of: | A moving point charge | A static dipole | Gravity | Magnetic monopoles | From the retarded Green's function.

## Boundary conditions
S: Boundary conditions specify how fields behave at edges and interfaces, completing a field problem. They determine standing-wave modes, reflection and transmission, and the forces at material boundaries, from waveguides to drumheads.
H: Types
- **Dirichlet**: field value fixed (a grounded conductor φ = 0; a clamped string).
- **Neumann**: normal derivative fixed (insulated boundary in heat flow; free end of a string).
- **Robin (mixed)**: combination (convective cooling).
- **Periodic**: field repeats (crystals, rings).
- **Radiation/outgoing**: waves leave without reflecting (Sommerfeld condition).
H: Electromagnetic interface conditions
- Tangential E continuous; normal D jumps by surface charge σ_{f}.
- Normal B continuous; tangential H jumps by surface current K_{f}.
- Perfect conductor: tangential E = 0, normal B = 0 at the surface.
E: n̂·(D_{2} − D_{1}) = σ_{f}, n̂ × (E_{2} − E_{1}) = 0 :: EM boundary conditions
E: n̂·(B_{2} − B_{1}) = 0, n̂ × (H_{2} − H_{1}) = K_{f} :: magnetic conditions
H: Consequences
P: Boundary conditions quantise modes: a string fixed at both ends has λ_{n} = 2L/n; a cavity's EM modes; a waveguide's cutoff frequencies. Fresnel equations for reflection and transmission come straight from interface conditions. Uniqueness theorems: Dirichlet or Neumann data on a closed boundary determine solutions of Laplace's equation. Numerical simulations need absorbing boundaries (perfectly matched layers) to mimic infinite space.
X: Normal-incidence reflection from glass (n = 1.5)?
> r = (1 − 1.5)/(1 + 1.5) = −0.2; R = 0.04, 4%
X: Lowest mode of a 2 cm × 1 cm rectangular waveguide?
> TE_{10}: λ_{c} = 2a = 4 cm ⇒ f_{c} = c/λ_{c} = 7.5 GHz
K: Boundary conditions complete field problems; they quantise modes and fix reflection and transmission.
!: Applying the wrong boundary condition (Dirichlet vs Neumann) changes mode frequencies and solutions completely.
Q: What is a Neumann boundary condition? | The normal derivative of the field is specified at the boundary.
Q: What happens to tangential E at a perfect conductor? | It is zero.
M1: Which EM component is always continuous across an interface? | Tangential E | Normal D always | Tangential H always | Normal E | No surface magnetic charge.
M2: Perfectly matched layers are used to: | Absorb outgoing waves in simulations | Reflect waves | Add sources | Fix temperature | Mimic infinite space.

## Radiation from sources
S: Accelerating charges radiate electromagnetic waves, and oscillating masses radiate gravitational waves. Multipole expansions show how radiated power depends on the source's size, frequency and motion, explaining antennas, synchrotron light and the sky's colour.
H: Point charges
- **Larmor formula**: P = q^{2}a^{2}/(6πε_{0}c^{3}) for non-relativistic acceleration.
- Radiation pattern ∝ sin^{2}θ about the acceleration direction.
- Relativistic: power grows as γ^{4} (circular motion) and beams forward into a cone of angle ~1/γ (synchrotron radiation).
E: P = q^{2}a^{2}/(6πε_{0}c^{3}) :: Larmor formula
H: Multipole radiation
- **Electric dipole**: P = p_{0}^{2}ω^{4}/(12πε_{0}c^{3}), strongest; ∝ ω^{4} gives blue skies (Rayleigh scattering).
- **Magnetic dipole** and **electric quadrupole**: weaker by (size/λ)^{2}.
- Antennas: half-wave dipole with radiation resistance ≈ 73 Ω.
- **Gravitational radiation**: lowest is quadrupole (mass dipole can't radiate due to momentum conservation); P = (G/5c^{5})⟨d^{3}Q_{ij}/dt^{3}⟩^{2}.
E: P_{dipole} = p_{0}^{2}ω^{4}/(12πε_{0}c^{3}) :: dipole radiation
E: P_{GW} = (G/5c^{5})⟨Q⃛_{ij}Q⃛^{ij}⟩ :: quadrupole formula
H: Near and far zones
P: Close to a source (r ≪ λ), fields resemble static ones; far away (r ≫ λ), they become transverse radiation with E ⊥ B ⊥ k, |E| = c|B| and amplitude ∝ 1/r, so power through a sphere is constant. Radiation reaction (Abraham–Lorentz force) drains energy from the source. Classical atoms would collapse in ~10^{-11} s by radiation, one motivation for quantum theory.
X: Compare scattered power for blue (450 nm) and red (700 nm) light.
> Ratio (700/450)^{4} ≈ 5.9: blue scatters about 6× more
X: An electron accelerates at 10^{20} m s^{-2}. Larmor power?
> P = (1.6 × 10^{-19})^{2} × 10^{40}/(6π × 8.85 × 10^{-12} × 2.7 × 10^{25}) ≈ 5.7 × 10^{-14} W
K: Accelerating charges radiate; dipole radiation ∝ ω^{4}, and gravitational waves start at quadrupole order.
!: Uniform motion doesn't radiate; acceleration (including circular motion) does.
Q: Why is there no gravitational dipole radiation? | Conservation of momentum keeps the mass dipole's second derivative zero.
Q: What is the radiation resistance of a half-wave dipole? | About 73 Ω.
M1: Synchrotron radiation is beamed into a cone of angle about: | 1/γ | γ | 90° | 1 rad | Relativistic beaming.
M2: Far-zone radiation fields fall off as: | 1/r | 1/r^{2} | 1/r^{3} | Constant | Power ∝ 1/r^{2}, constant through spheres.

## Continuum field models
S: Continuum models treat matter as smooth fields rather than discrete atoms: density, velocity, displacement and order parameters. Fluid dynamics, elasticity, liquid crystals and Ginzburg–Landau theory describe vast ranges of behaviour this way.
H: When continuum models work
- Length scales much larger than atomic spacing or mean free path (Knudsen number Kn = λ/L ≪ 1).
- Fields defined as local averages over "fluid elements".
- Material properties enter as constitutive relations (viscosity, elastic moduli, conductivity).
H: Examples
- **Fluids**: Navier–Stokes for velocity v(x, t); Euler equations when viscosity is negligible.
- **Elasticity**: displacement u(x); stress σ_{ij} = λδ_{ij}ε_{kk} + 2με_{ij} (Hooke's law); elastic waves (P and S waves).
- **Heat**: Fourier's law q = −k∇T.
- **Liquid crystals**: director field n(x) with Frank elastic energy.
- **Ginzburg–Landau**: order parameter ψ(x) for superconductors and phase transitions, F = ∫[α|ψ|^{2} + (β/2)|ψ|^{4} + (ħ^{2}/2m*)|∇ψ|^{2}]d^{3}x.
E: σ_{ij} = λδ_{ij}ε_{kk} + 2με_{ij} :: isotropic Hooke's law
E: v_{P} = √((λ + 2μ)/ρ), v_{S} = √(μ/ρ) :: elastic wave speeds
H: Topological defects and limits
P: Continuum fields can host defects: dislocations in crystals, vortices in superfluids, disclinations in liquid crystals and domain walls. Their energies and interactions follow from continuum theory. Continuum models fail near defect cores, in rarefied gases (Kn ≳ 0.1), at shocks thinner than mean free paths and in nanoscale devices, where atomistic or kinetic models take over.
X: Granite has λ ≈ μ ≈ 30 GPa, ρ = 2700 kg m^{-3}. Seismic wave speeds?
> v_{P} = √(90 × 10^{9}/2700) ≈ 5.8 km s^{-1}
> v_{S} = √(30 × 10^{9}/2700) ≈ 3.3 km s^{-1}
X: Is the continuum model valid for air in a 1 μm channel (mean free path 68 nm)?
> Kn = 0.068: borderline; slip corrections are needed
K: Continuum fields average over atoms; constitutive laws supply material behaviour, and defects carry much of the interesting physics.
!: Continuum descriptions break down when the system size approaches microscopic lengths such as the mean free path.
Q: What is the Knudsen number? | The ratio of mean free path to system size; continuum models need Kn ≪ 1.
Q: What field describes a nematic liquid crystal? | The director field n(x), giving the local average molecular orientation.
M1: S-waves cannot travel through liquids because: | Liquids have zero shear modulus | Liquids are too dense | They are too fast | Liquids are opaque | μ = 0.
M2: Ginzburg–Landau theory uses: | An order parameter field | Individual atoms | Feynman diagrams only | Rigid bodies | Phenomenological free energy.
`;
