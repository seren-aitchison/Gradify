// Unit 40: Mathematical and Theoretical Physics. Format: kit/course/notes.js
export default `
## Lagrangian mechanics
S: Lagrangian mechanics reformulates Newton's laws using energy rather than forces. From a single function L = T − V, the Euler–Lagrange equations give the motion of any system, in any coordinates, with constraints handled automatically.
H: The Lagrangian
- L(q, q̇, t) = T − V, kinetic minus potential energy.
- Generalised coordinates q_{i} can be angles, distances or any convenient variables.
- Constraint forces (like a pendulum's tension) never appear explicitly.
E: L = T − V :: Lagrangian
E: d/dt(∂L/∂q̇_{i}) − ∂L/∂q_{i} = 0 :: Euler–Lagrange equations
H: Useful results
- **Generalised momentum** p_{i} = ∂L/∂q̇_{i}.
- **Cyclic coordinates**: if L doesn't depend on q_{i}, then p_{i} is conserved.
- If L has no explicit time dependence, the energy function h = Σ q̇_{i}p_{i} − L is conserved.
- Adding a total time derivative dF/dt to L leaves the equations unchanged.
H: Why it's powerful
P: Lagrangians handle complicated systems (double pendulums, rigid bodies, charged particles in fields with L = ½mv^{2} − qφ + qv·A) with less effort than vector forces. They connect directly to symmetry through Noether's theorem and generalise to fields, relativity and quantum theory, where the action is fundamental.
X: Derive the pendulum equation from L.
> T = ½ml^{2}θ̇^{2}, V = −mgl cos θ
> ∂L/∂θ̇ = ml^{2}θ̇; ∂L/∂θ = −mgl sin θ
> ml^{2}θ̈ + mgl sin θ = 0 ⇒ θ̈ = −(g/l) sin θ
X: A free particle in polar coordinates: what is conserved?
> L = ½m(ṙ^{2} + r^{2}φ̇^{2}); φ is cyclic
> p_{φ} = mr^{2}φ̇ (angular momentum) is conserved
K: Write T − V in convenient coordinates and the Euler–Lagrange equations give the motion; cyclic coordinates give conservation laws.
!: L = T − V, not T + V; the total energy is a different quantity.
Q: What is a cyclic coordinate? | A coordinate absent from the Lagrangian; its conjugate momentum is conserved.
Q: Why don't constraint forces appear in Lagrangian mechanics? | Generalised coordinates satisfy the constraints automatically, and ideal constraint forces do no work.
M1: For L = ½mẋ^{2} − ½kx^{2}, the equation of motion is: | mẍ = −kx | mẍ = kx | mẋ = −kx | ẍ = 0 | Simple harmonic.
M2: Generalised momentum is defined as: | ∂L/∂q̇ | ∂L/∂q | L/q̇ | mq̈ | Conjugate to q.

## Hamiltonian mechanics
S: Hamiltonian mechanics describes motion with coordinates and momenta treated as equal partners. Hamilton's first-order equations reveal the geometry of phase space and lead directly to statistical mechanics, chaos theory and quantum mechanics.
H: The Hamiltonian
- Legendre transform: H(q, p, t) = Σ p_{i}q̇_{i} − L.
- For many systems H = T + V, the total energy.
E: q̇_{i} = ∂H/∂p_{i}, ṗ_{i} = −∂H/∂q_{i} :: Hamilton's equations
E: dH/dt = ∂H/∂t :: energy conservation if H has no explicit t
H: Poisson brackets
- {f, g} = Σ(∂f/∂q_{i} ∂g/∂p_{i} − ∂f/∂p_{i} ∂g/∂q_{i}).
- Time evolution: df/dt = {f, H} + ∂f/∂t.
- Fundamental: {q_{i}, p_{j}} = δ_{ij}.
- Constants of motion have {f, H} = 0.
- Quantisation: {f, g} → [f̂, ĝ]/(iħ), Dirac's route to quantum mechanics.
E: {q, p} = 1 :: canonical bracket
H: Phase-space picture
P: Each state is a point (q, p); evolution is a flow preserving phase-space volume (Liouville's theorem), the basis of statistical mechanics. Integrable systems move on invariant tori; small perturbations either preserve most tori (KAM theorem) or create chaos. Symplectic integrators preserve this structure numerically.
X: Find Hamilton's equations for H = p^{2}/2m + ½kx^{2}.
> ẋ = ∂H/∂p = p/m
> ṗ = −∂H/∂x = −kx ⇒ mẍ = −kx
X: Compute {x, H} for the oscillator.
> ∂x/∂x × ∂H/∂p − 0 = p/m = ẋ
K: Hamilton's equations are first-order in (q, p); Poisson brackets encode dynamics and lead to quantum commutators.
!: H equals total energy only when coordinates are time-independent and the potential doesn't depend on velocity.
Q: How is the Hamiltonian obtained from the Lagrangian? | By a Legendre transform: H = Σpq̇ − L.
Q: What does {f, H} = 0 mean? | f is a constant of motion (if it has no explicit time dependence).
M1: Hamilton's equations are: | First-order ODEs in q and p | Second-order in q only | Algebraic | PDEs always | 2n first-order equations.
M2: The Poisson bracket {p, q} equals: | −1 | 1 | 0 | iħ | Antisymmetry.

## Principle of least action
S: The principle of least (stationary) action says a system follows the path that makes the action S = ∫L dt stationary. This single variational principle underlies classical mechanics, optics, electromagnetism, relativity and quantum field theory.
H: The action
- S[q] = ∫_{t_{1}}^{t_{2}} L(q, q̇, t) dt, a functional of the whole path.
- Requiring δS = 0 for fixed endpoints gives the Euler–Lagrange equations.
- The true path is stationary, often a minimum but sometimes a saddle point.
E: S = ∫ L dt, δS = 0 :: Hamilton's principle
H: Calculus of variations
- Vary q → q + εη with η(t_{1}) = η(t_{2}) = 0.
- Integrate by parts; the boundary terms vanish, leaving ∫[∂L/∂q − d/dt(∂L/∂q̇)]η dt = 0 for all η.
- Classic problems: the brachistochrone (fastest descent curve is a cycloid), geodesics, minimal surfaces (soap films), catenary.
H: Across physics
P: Fermat's principle of least time gives refraction (Snell's law). In relativity a free particle maximises proper time: S = −mc^{2}∫dτ. Field theories use S = ∫ℒ d^{4}x. In quantum mechanics, Feynman showed every path contributes e^{iS/ħ}; near the classical path phases agree and add constructively, which is why classical motion is stationary action.
X: Derive Snell's law from Fermat's principle.
> Time t = n_{1}√(a^{2} + x^{2})/c + n_{2}√(b^{2} + (d − x)^{2})/c
> dt/dx = 0 ⇒ n_{1} sin θ_{1} = n_{2} sin θ_{2}
X: Show a free particle moves in a straight line.
> L = ½mẋ^{2}; Euler–Lagrange: mẍ = 0 ⇒ constant velocity
K: Nature makes the action stationary; from this one principle come the laws of motion across physics.
!: "Least" action is a misnomer; the action is stationary and may be a saddle point.
Q: What curve is the brachistochrone? | A cycloid.
Q: How does quantum mechanics explain the principle of stationary action? | Paths near the stationary one interfere constructively, while others cancel.
M1: Fermat's principle states light takes the path of: | Stationary time | Shortest distance always | Maximum energy | Least momentum | It explains refraction.
M2: The relativistic free-particle action is proportional to: | Proper time | Coordinate distance | Energy | Mass squared | S = −mc^{2}∫dτ.

## Generalised coordinates
S: Generalised coordinates are any set of independent variables that fully specify a system's configuration. Choosing them well, matching the symmetries and constraints, turns hard problems into easy ones.
H: Degrees of freedom
- N particles in 3D have 3N coordinates; k holonomic constraints reduce this to 3N − k degrees of freedom.
- **Holonomic constraints**: equations among coordinates, f(q, t) = 0 (a bead on a wire, a rigid rod).
- **Non-holonomic**: involve velocities and can't be integrated (rolling without slipping in 2D).
- **Scleronomic** (time-independent) vs **rheonomic** (time-dependent) constraints.
E: n = 3N − k :: degrees of freedom
H: Choosing coordinates
- Pendulum: angle θ instead of (x, y).
- Central forces: polar or spherical coordinates.
- Rigid bodies: centre-of-mass position plus three Euler angles (6 total).
- Double pendulum: two angles.
H: Handling constraints
P: Holonomic constraints are eliminated by choosing coordinates that satisfy them. Alternatively, Lagrange multipliers keep extra coordinates and enforce constraints: L' = L + Σλ_{j}f_{j}; the multipliers give constraint forces, such as a pendulum's string tension. Non-holonomic rolling constraints need multipliers on velocity relations.
E: d/dt(∂L/∂q̇_{i}) − ∂L/∂q_{i} = Σλ_{j}∂f_{j}/∂q_{i} :: Lagrange multipliers
X: How many degrees of freedom does a rigid body in 3D have?
> 3 translations + 3 rotations = 6
X: A bead slides on a rotating hoop. What coordinate and type of constraint?
> One angle θ around the hoop; the constraint depends on time (rheonomic) but is holonomic
K: Pick generalised coordinates matching the constraints and symmetry; use multipliers if you need constraint forces.
!: Rolling without slipping on a plane is non-holonomic; you cannot simply eliminate a coordinate.
Q: What is a holonomic constraint? | A constraint expressible as an equation among coordinates (and time).
Q: How many generalised coordinates does a double pendulum need? | Two angles.
M1: N particles with k holonomic constraints have: | 3N − k degrees of freedom | 3N + k | N − k | 3k | Each constraint removes one.
M2: Lagrange multipliers give: | Constraint forces | Kinetic energy | Cyclic coordinates | Phase space volume | Like string tension.

## Canonical transformations
S: Canonical transformations change phase-space variables (q, p) to new ones (Q, P) while preserving the form of Hamilton's equations. Choosing them cleverly can make a Hamiltonian trivial to solve, and they reveal deep structure in mechanics.
H: Definition
- New variables Q(q, p, t), P(q, p, t) with a new Hamiltonian K such that Q̇ = ∂K/∂P, Ṗ = −∂K/∂Q.
- Equivalent condition: Poisson brackets are preserved, {Q, P} = 1.
- They preserve phase-space volume and the symplectic structure.
E: {Q_{i}, P_{j}} = δ_{ij} :: test for canonicity
H: Generating functions
- Four types: F_{1}(q, Q), F_{2}(q, P), F_{3}(p, Q), F_{4}(p, P).
- Type 2: p = ∂F_{2}/∂q, Q = ∂F_{2}/∂P, K = H + ∂F_{2}/∂t.
- Identity: F_{2} = qP. Swap q and p: F_{1} = qQ gives Q = p, P = −q.
E: p = ∂F_{2}/∂q, Q = ∂F_{2}/∂P, K = H + ∂F_{2}/∂t :: type-2 generating function
H: Action–angle variables
P: For periodic integrable systems, transform to action J = (1/2π)∮p dq (conserved) and angle θ (increasing linearly). Then H = H(J) and θ̇ = ∂H/∂J = ω. For the harmonic oscillator, H = ωJ. Action variables are adiabatic invariants (constant under slow changes) and gave the old quantum rule J = nħ. Time evolution itself is a continuous canonical transformation generated by H.
X: Show Q = p, P = −q is canonical.
> {Q, P} = ∂Q/∂q ∂P/∂p − ∂Q/∂p ∂P/∂q = 0 × 0 − 1 × (−1) = 1 ✓
X: Find the action for the oscillator H = p^{2}/2m + ½mω^{2}q^{2} at energy E.
> Phase orbit is an ellipse with semi-axes √(2mE) and √(2E/(mω^{2}))
> Area = π × 2E/ω; J = area/2π = E/ω, so H = ωJ
K: Canonical transformations reshape phase space without changing physics; action–angle variables make integrable motion trivial.
!: Not every change of variables is canonical; check that Poisson brackets are preserved.
Q: What is an adiabatic invariant? | A quantity, such as the action, that stays nearly constant when parameters change slowly.
Q: What generates time evolution as a canonical transformation? | The Hamiltonian.
M1: The oscillator in action–angle form has H equal to: | ωJ | J^{2} | ω/J | Jθ | Linear in action.
M2: A canonical transformation preserves: | Poisson brackets and phase-space volume | Lagrangian form only | Kinetic energy | Coordinates | Symplectic structure.

## Hamilton–Jacobi theory
S: Hamilton–Jacobi theory seeks a canonical transformation that makes the new Hamiltonian zero, so all new variables are constant. The resulting partial differential equation for Hamilton's principal function is the classical bridge to wave mechanics.
H: The Hamilton–Jacobi equation
- Find S(q, P, t) generating a transformation with K = 0.
- Then H(q, ∂S/∂q, t) + ∂S/∂t = 0.
- S is the action along the classical path, as a function of the endpoint.
- For time-independent H: S = W(q) − Et, with H(q, ∂W/∂q) = E.
E: H(q, ∂S/∂q, t) + ∂S/∂t = 0 :: Hamilton–Jacobi equation
H: Solving it
- Separation of variables: W = W_{1}(q_{1}) + W_{2}(q_{2}) + … when H separates.
- The constants of separation are new momenta; differentiating S with respect to them gives the motion.
- Central forces, the Kepler problem and the Stark effect separate in suitable coordinates.
H: Link to waves and quantum mechanics
P: Surfaces of constant S move like wavefronts, and trajectories are perpendicular rays, as in geometric optics (the eikonal equation). Substituting ψ = A e^{iS/ħ} into the Schrödinger equation and letting ħ → 0 gives back the Hamilton–Jacobi equation: classical mechanics is the short-wavelength limit of quantum mechanics. This is the basis of the WKB approximation.
E: ψ ≈ A e^{iS/ħ} :: semiclassical wavefunction
X: Write the HJ equation for a free particle and solve it.
> (1/2m)(∂S/∂x)^{2} + ∂S/∂t = 0
> Try S = αx − (α^{2}/2m)t; α is the momentum, giving x = x_{0} + (α/m)t
K: Hamilton–Jacobi theory turns mechanics into a wave-like PDE; its solution is the action, linking classical and quantum physics.
!: The HJ equation is nonlinear and usually only solvable by separation in special coordinates.
Q: What is Hamilton's principal function? | The action S as a function of endpoints, solving the Hamilton–Jacobi equation.
Q: How does the Schrödinger equation relate to the HJ equation? | With ψ = Ae^{iS/ħ} and ħ → 0, Schrödinger's equation reduces to the HJ equation.
M1: For time-independent H, S equals: | W(q) − Et | Et | W(q) + Et | H × t | Separation of time.
M2: The optical analogue of the HJ equation is the: | Eikonal equation | Wave equation | Maxwell's equations | Diffusion equation | Geometrical optics.

## Symplectic geometry
S: Symplectic geometry is the mathematical language of Hamiltonian mechanics. Phase space carries a symplectic form that measures oriented areas, Hamiltonian flows preserve it, and this structure explains conservation of phase-space volume and the behaviour of good numerical integrators.
H: The symplectic form
- On phase space (q, p), ω = Σ dq_{i} ∧ dp_{i}.
- It measures the oriented area of projections onto each (q_{i}, p_{i}) plane.
- In matrix form, J = [[0, I], [−I, 0]]; Hamilton's equations: ẋ = J∇H.
- A map is symplectic if its Jacobian M satisfies M^{T}JM = J.
E: ẋ = J∇H(x), x = (q, p) :: Hamilton's equations in symplectic form
E: M^{T}JM = J :: symplectic condition
H: Consequences
- Hamiltonian flows preserve ω, hence phase-space volume (Liouville).
- Eigenvalues of symplectic matrices come in pairs λ, 1/λ (and complex conjugates).
- **Gromov's non-squeezing theorem**: a ball cannot be squeezed through a hole of smaller radius in a single (q, p) plane, a classical shadow of the uncertainty principle.
- Poincaré recurrence: bounded systems return arbitrarily close to their initial state.
H: Applications
P: Symplectic integrators (leapfrog, Störmer–Verlet) preserve ω exactly, so they conserve a nearby "shadow Hamiltonian" and avoid energy drift in long orbit simulations. Accelerator beam optics uses symplectic transfer maps. Geometric quantisation and Floer homology extend these ideas into modern maths.
X: Check that the map (q, p) → (q + hp, p) is symplectic.
> M = [[1, h], [0, 1]]; det M = 1
> In 2D, symplectic ⇔ area-preserving ⇔ det = 1 ✓
K: Hamiltonian dynamics preserves a symplectic structure; respecting it gives volume conservation and stable long-time numerics.
!: Volume preservation alone (det = 1) equals symplecticity only in 2D phase space; in higher dimensions symplecticity is stronger.
Q: What does non-squeezing say? | A phase-space ball cannot be symplectically mapped into a cylinder of smaller radius in one conjugate plane.
Q: Why do symplectic integrators avoid energy drift? | They exactly conserve a slightly modified Hamiltonian.
M1: Eigenvalues of a symplectic matrix come in pairs: | λ and 1/λ | λ and −λ | λ and λ^{2} | Only real | Reciprocal pairs.
M2: Liouville's theorem follows from: | Preservation of the symplectic form | Energy conservation alone | Friction | Linearity | Volume is a power of ω.

## Noether's theorem
S: Noether's theorem states that every continuous symmetry of the action gives a conserved quantity. It explains why energy, momentum and angular momentum are conserved, and why charge is conserved, connecting symmetry to the most fundamental laws of physics.
H: The theorem
- If the action is invariant under a continuous transformation q → q + εδq, then Q = Σ (∂L/∂q̇_{i})δq_{i} is conserved (up to boundary terms).
- In field theory: each symmetry gives a conserved current ∂_{μ}j^{μ} = 0 and a charge Q = ∫j^{0}d^{3}x.
E: Q = Σ p_{i}δq_{i} − F :: Noether charge
E: ∂_{μ}j^{μ} = 0 :: conserved current
H: Key correspondences
- Time translation symmetry → energy conservation.
- Space translation → linear momentum.
- Rotation → angular momentum.
- Lorentz boosts → centre-of-energy motion.
- Global U(1) phase symmetry → electric charge (and particle number).
- Internal symmetries → isospin, colour charges.
H: Significance
P: Emmy Noether proved the theorem in 1915–18 while helping Hilbert and Einstein with energy in general relativity. In expanding cosmology, there is no time-translation symmetry, so total energy is not globally conserved (photons redshift). Discrete symmetries (parity, time reversal) give conserved quantum numbers in quantum mechanics but not Noether currents. Noether's second theorem treats local (gauge) symmetries.
X: L = ½m(ẋ^{2} + ẏ^{2}) − V(√(x^{2} + y^{2})). What does rotational symmetry conserve?
> Under rotation δx = −εy, δy = εx
> Q = p_{x}(−y) + p_{y}x = m(xẏ − yẋ) = L_{z}, angular momentum
K: Continuous symmetries ⇔ conservation laws; this is the deepest reason behind energy, momentum and charge conservation.
!: Noether's theorem needs a continuous symmetry of the action; discrete symmetries don't give currents.
Q: Which symmetry gives energy conservation? | Invariance under time translation.
Q: Which symmetry gives charge conservation? | Global U(1) phase invariance of the fields.
M1: Space translation symmetry gives conservation of: | Linear momentum | Energy | Angular momentum | Charge | Homogeneity of space.
M2: In an expanding universe, energy is: | Not globally conserved | Always conserved | Doubled | Zero | No time-translation symmetry.

## Continuous and discrete symmetries
S: Symmetries are transformations that leave physical laws unchanged. Continuous symmetries (rotations, translations, phases) give conservation laws and gauge forces; discrete symmetries (parity, charge conjugation, time reversal) give selection rules and revealed surprising violations in the weak interaction.
H: Continuous symmetries
- Described by Lie groups with smoothly varying parameters.
- Spacetime: translations, rotations, boosts (Poincaré group).
- Internal: U(1) of electromagnetism, SU(2) weak isospin, SU(3) colour.
- **Spontaneous symmetry breaking**: laws are symmetric but the ground state isn't (magnets, Higgs field), giving Goldstone bosons or, with gauge symmetry, massive gauge bosons.
H: Discrete symmetries
- **Parity P**: x → −x. Violated maximally by the weak force (Wu experiment, 1957).
- **Charge conjugation C**: particle ↔ antiparticle. Also violated by the weak force.
- **Time reversal T**: t → −t.
- **CP violation**: observed in kaons (1964) and B mesons; needed to explain matter–antimatter asymmetry.
- **CPT theorem**: any Lorentz-invariant local QFT is invariant under combined CPT.
E: CPT = invariant :: CPT theorem
H: Consequences
P: Parity gives selection rules in atomic transitions (electric dipole transitions change parity). Crystal point and space groups (32 and 230) classify materials and predict band degeneracies. Symmetry-protected topological phases rely on symmetries such as time reversal. Symmetry reasoning often predicts results before any calculation.
X: The Wu experiment found electrons from cobalt-60 β decay emitted preferentially opposite the nuclear spin. Why does this violate parity?
> Under P, momentum flips but spin (an axial vector) doesn't
> A mirror world would have electrons along the spin; the asymmetry distinguishes them
K: Symmetries constrain physics: continuous ones give conservation laws, discrete ones give selection rules, and their breaking is equally informative.
!: Spin and angular momentum are axial vectors; they do not change sign under parity.
Q: What did the Wu experiment show? | Parity is violated in weak interactions.
Q: What does the CPT theorem state? | Any local, Lorentz-invariant quantum field theory is invariant under combined C, P and T.
M1: Spontaneous breaking of a continuous global symmetry gives: | Goldstone bosons | Photons | Gravitons | Monopoles always | Massless excitations.
M2: CP violation is needed to explain: | The matter–antimatter asymmetry | Gravity | Superconductivity | Blackbody radiation | Sakharov conditions.

## Lie groups and Lie algebras
S: Lie groups are continuous symmetry groups, like rotations, whose elements depend smoothly on parameters. Their infinitesimal generators form Lie algebras, defined by commutation relations, which are the language of angular momentum, particle physics and gauge theory.
H: Lie groups
- **SO(3)**: rotations in 3D, 3 parameters.
- **SU(2)**: 2×2 unitary matrices with determinant 1; double cover of SO(3) (spin-½).
- **U(1)**: phases e^{iθ}; electromagnetism.
- **SU(3)**: 8 parameters; colour and flavour symmetries.
- **Lorentz group SO(3,1)**, Poincaré group.
H: Lie algebras
- Elements near the identity: g = e^{iθ_{a}T_{a}}, with generators T_{a}.
- Commutators [T_{a}, T_{b}] = if_{abc}T_{c} define the algebra; f_{abc} are structure constants.
- SU(2)/SO(3): [J_{i}, J_{j}] = iε_{ijk}J_{k}, the angular momentum algebra.
- Number of generators: SU(N) has N^{2} − 1; SO(N) has N(N − 1)/2.
E: [J_{i}, J_{j}] = iε_{ijk}J_{k} :: su(2) algebra
E: g = exp(iθ_{a}T_{a}) :: exponential map
H: Structure
P: Casimir operators commute with all generators (J^{2} for SU(2)) and label irreducible representations. The rank is the number of mutually commuting generators (SU(3) has rank 2: I_{3} and Y). Simple Lie algebras are classified by Dynkin diagrams into four infinite families plus five exceptional ones (G_{2}, F_{4}, E_{6}, E_{7}, E_{8}). Grand unified theories use SU(5), SO(10) or E_{6}.
X: How many generators does SU(3) have? Physical meaning?
> 3^{2} − 1 = 8, corresponding to the 8 gluons of QCD
X: How many generators does SO(4) have?
> 4 × 3/2 = 6
K: Lie groups describe continuous symmetries; their algebras of generators, with commutation relations, are what physicists compute with.
!: SU(2) and SO(3) have the same algebra but different global structure; spin-½ needs SU(2), a 360° rotation gives −1.
Q: What is a Casimir operator? | An operator commuting with all generators, used to label irreducible representations.
Q: How many generators does SU(N) have? | N^{2} − 1.
M1: SU(2) is a double cover of: | SO(3) | U(1) | SU(3) | SO(2) | Two SU(2) elements per rotation.
M2: The structure constants of SU(2) are: | ε_{ijk} | δ_{ij} | Zero | Gell-Mann matrices | Angular momentum algebra.

## Representation theory
S: A representation assigns matrices to group elements so that the group's multiplication is preserved. In physics, particles and states transform in representations of symmetry groups, so representation theory explains multiplets, quantum numbers and selection rules.
H: Basics
- A representation D maps g → D(g) with D(g_{1}g_{2}) = D(g_{1})D(g_{2}).
- **Irreducible representations (irreps)** cannot be split into smaller invariant pieces; they are the building blocks.
- States in one irrep share energy if the Hamiltonian has that symmetry: degeneracy.
H: SU(2) and angular momentum
- Irreps labelled by j = 0, ½, 1, 3/2, …; dimension 2j + 1.
- Combining two spins: j_{1} ⊗ j_{2} = |j_{1} − j_{2}| ⊕ … ⊕ (j_{1} + j_{2}).
- Clebsch–Gordan coefficients give the decomposition.
- Two spin-½: ½ ⊗ ½ = 0 ⊕ 1 (singlet + triplet).
E: dim(j) = 2j + 1 :: SU(2) irrep dimension
E: j_{1} ⊗ j_{2} = ⊕_{J=|j_{1}−j_{2}|}^{j_{1}+j_{2}} J :: addition of angular momenta
H: SU(3) and beyond
P: SU(3) flavour irreps: 3 ⊗ 3̄ = 1 ⊕ 8 (mesons), 3 ⊗ 3 ⊗ 3 = 1 ⊕ 8 ⊕ 8 ⊕ 10 (baryons). Gell-Mann's Eightfold Way predicted the Ω^{−} from the decuplet. The Wigner–Eckart theorem uses representations to give selection rules for transitions. Character tables for finite groups classify molecular vibrations and crystal-field splittings. Wigner classified particles as irreps of the Poincaré group, labelled by mass and spin.
X: Decompose 1 ⊗ 1 for two spin-1 particles.
> J = 0, 1, 2; dimensions 1 + 3 + 5 = 9 = 3 × 3 ✓
X: Count states: ½ ⊗ ½ ⊗ ½.
> ½ ⊗ ½ = 0 ⊕ 1; then ⊗ ½ gives ½ ⊕ (½ ⊕ 3/2)
> Dimensions 2 + 2 + 4 = 8 ✓
K: Physical states organise into irreducible representations; their dimensions predict degeneracies and multiplets.
!: Tensor products are reducible in general; decompose them before interpreting states.
Q: What does Wigner's classification say? | Elementary particles correspond to irreducible representations of the Poincaré group, labelled by mass and spin.
Q: How did the Eightfold Way predict the Ω^{−}? | The baryon decuplet had one missing member, whose properties were predicted from SU(3).
M1: The dimension of the spin-3/2 irrep is: | 4 | 3 | 2 | 6 | 2j + 1.
M2: 3 ⊗ 3̄ in SU(3) gives: | 1 ⊕ 8 | 3 ⊕ 6 | 10 | 1 ⊕ 1 | Mesons: singlet plus octet.

## Tensor calculus
S: Tensors are quantities that transform in a definite way under coordinate changes, so equations written with them hold in every coordinate system. Index notation and the Einstein summation convention make tensor calculus the working language of relativity, continuum mechanics and field theory.
H: Basics
- Scalars (rank 0), vectors (rank 1), and higher-rank tensors like stress σ_{ij} and the metric g_{μν}.
- **Contravariant** components V^{μ} and **covariant** components V_{μ}, related by the metric: V_{μ} = g_{μν}V^{ν}.
- **Einstein convention**: repeated upper-lower indices are summed.
- Transformation: T'^{μν} = (∂x'^{μ}/∂x^{α})(∂x'^{ν}/∂x^{β})T^{αβ}.
E: V'^{μ} = (∂x'^{μ}/∂x^{ν})V^{ν} :: contravariant transformation
E: ds^{2} = g_{μν}dx^{μ}dx^{ν} :: line element
H: Operations
- Contraction (summing an upper with a lower index) reduces rank by 2; the trace is an example.
- Symmetric and antisymmetric parts: T_{(μν)}, T_{[μν]}.
- Kronecker δ, Levi-Civita ε_{ijk} for cross products and determinants.
- **Covariant derivative** ∇_{μ}V^{ν} = ∂_{μ}V^{ν} + Γ^{ν}_{μλ}V^{λ} transforms as a tensor in curved coordinates.
H: Physical tensors
P: The stress tensor σ_{ij} gives force per area on any surface; the inertia tensor I_{ij} relates L_{i} = I_{ij}ω_{j}; the electromagnetic field tensor F_{μν} packs E and B together; the energy–momentum tensor T^{μν} is the source of gravity. Equations like ∂_{μ}F^{μν} = μ_{0}J^{ν} are manifestly Lorentz-invariant.
X: Compute the scalar A_{μ}A^{μ} for A^{μ} = (3, 1, 2, 0) with metric diag(1, −1, −1, −1).
> A_{μ} = (3, −1, −2, 0); A_{μ}A^{μ} = 9 − 1 − 4 − 0 = 4
X: How many independent components does a symmetric rank-2 tensor in 4D have?
> 4 × 5/2 = 10
K: Tensors make physics coordinate-independent; index notation and the metric handle the bookkeeping.
!: Only indices in opposite positions (one up, one down) are summed; ordinary partial derivatives of tensors are not tensors in curved coordinates.
Q: What does the metric tensor do? | Defines distances and raises or lowers indices.
Q: Why is the covariant derivative needed? | Ordinary derivatives of tensor components don't transform as tensors in curvilinear or curved spaces.
M1: Contracting a rank-3 tensor gives rank: | 1 | 2 | 3 | 0 | Contraction removes two indices.
M2: The Levi-Civita symbol is: | Totally antisymmetric | Symmetric | Diagonal | Zero | Used in cross products.

## Differential geometry
S: Differential geometry studies curves, surfaces and higher-dimensional spaces using calculus. It provides the mathematics of general relativity, gauge theory and continuum mechanics, describing how spaces bend and how quantities change as they move around.
H: Curves and surfaces
- Curves: curvature κ and torsion τ (Frenet–Serret formulas).
- Surfaces: first fundamental form (metric) and second fundamental form (bending in space).
- **Gaussian curvature** K = κ_{1}κ_{2}: intrinsic, measurable by beings within the surface (Gauss's Theorema Egregium).
- Sphere radius R: K = 1/R^{2}; plane K = 0; saddle K < 0.
E: K = κ_{1}κ_{2} :: Gaussian curvature
E: ∫∫K dA + ∮k_{g} ds = 2πχ :: Gauss–Bonnet theorem
H: Connections and parallel transport
- A connection (Christoffel symbols) defines how to compare vectors at different points.
- Parallel transport around a closed loop on a curved surface rotates a vector by an angle equal to the enclosed curvature.
- **Geodesics**: curves that parallel-transport their own tangent; "straightest" lines (great circles).
E: Γ^{λ}_{μν} = ½g^{λσ}(∂_{μ}g_{σν} + ∂_{ν}g_{σμ} − ∂_{σ}g_{μν}) :: Christoffel symbols
H: Modern language
P: Differential forms, exterior derivatives and Stokes' theorem ∫_{M}dω = ∫_{∂M}ω unify Green, Gauss and Stokes theorems. Fibre bundles describe gauge fields: the gauge potential is a connection, the field strength its curvature. The Gauss–Bonnet theorem links geometry to topology via the Euler characteristic χ, a theme underlying topological phases of matter.
X: A vector is parallel-transported around a triangle on a sphere of radius R enclosing area A. Rotation angle?
> θ = ∫K dA = A/R^{2}
> For an octant triangle (A = πR^{2}/2), θ = π/2
K: Curvature measures how parallel transport fails to return vectors unchanged; geometry and topology are tied by Gauss–Bonnet.
!: A cylinder has zero Gaussian curvature: it is intrinsically flat even though it looks curved in 3D.
Q: What does the Theorema Egregium state? | Gaussian curvature is intrinsic, determined by the surface's metric alone.
Q: In gauge theory, what plays the role of curvature? | The field strength (e.g. F_{μν} in electromagnetism).
M1: A sphere's Euler characteristic is: | 2 | 0 | 1 | −2 | Gauss–Bonnet gives 4π/2π.
M2: Geodesics on a sphere are: | Great circles | Lines of latitude | Spirals | Points | Shortest paths.

## Manifolds and curvature
S: A manifold is a space that looks flat locally but may be curved or twisted globally, like the Earth's surface. Spacetime in general relativity is a four-dimensional curved manifold, and the Riemann curvature tensor measures how it bends.
H: Manifolds
- Locally like ℝ^{n}; covered by overlapping coordinate charts.
- Tangent spaces at each point hold vectors; cotangent spaces hold one-forms.
- A **Riemannian** manifold has a positive-definite metric; **Lorentzian** (spacetime) has signature (−, +, +, +) or (+, −, −, −).
- Examples: spheres, tori, configuration spaces of mechanical systems, Lie groups, spacetime.
H: Curvature tensors
- **Riemann tensor** R^{ρ}_{σμν}: change of a vector parallel-transported around an infinitesimal loop.
- **Ricci tensor** R_{μν} = R^{ρ}_{μρν}; **Ricci scalar** R = g^{μν}R_{μν}.
- In n dimensions the Riemann tensor has n^{2}(n^{2} − 1)/12 independent components: 1 in 2D, 6 in 3D, 20 in 4D.
- **Geodesic deviation**: nearby geodesics accelerate apart or together according to curvature (tidal forces).
E: [∇_{μ}, ∇_{ν}]V^{ρ} = R^{ρ}_{σμν}V^{σ} :: Riemann tensor
E: D^{2}ξ^{μ}/dτ^{2} = −R^{μ}_{νρσ}u^{ν}ξ^{ρ}u^{σ} :: geodesic deviation
H: Einstein's equations
P: G_{μν} = R_{μν} − ½Rg_{μν} = (8πG/c^{4})T_{μν}: matter tells spacetime how to curve. The Weyl tensor (the trace-free part of Riemann) carries gravitational waves and tidal effects in vacuum. Topology (connectedness, holes, orientability) is separate from curvature but constrains it.
X: How many independent Riemann components in 4D?
> 16 × 15/12 = 20 (10 in Ricci, 10 in Weyl)
X: For a 2-sphere of radius a, what is the Ricci scalar?
> R = 2/a^{2} (twice the Gaussian curvature)
K: Manifolds are locally flat but globally curved; the Riemann tensor measures curvature and drives tidal effects.
!: Coordinates can make flat space look curved (polar coordinates); only tensors like Riemann reveal true curvature.
Q: What does the Riemann tensor measure? | The failure of parallel transport around small loops to return vectors unchanged.
Q: What part of curvature carries gravitational waves in vacuum? | The Weyl tensor.
M1: In 2D, the Riemann tensor has how many independent components? | 1 | 6 | 20 | 0 | Just the Gaussian curvature.
M2: Geodesic deviation describes: | Tidal forces | Electromagnetic waves | Friction | Thermal motion | Relative acceleration of free-falling particles.

## Classical field theory
S: Classical field theory treats physical quantities as continuous fields spread through space and time, such as electromagnetic, gravitational and fluid fields. Field equations follow from a Lagrangian density and the principle of stationary action.
H: Lagrangian densities
- Action S = ∫ℒ(φ, ∂_{μ}φ) d^{4}x.
- Euler–Lagrange field equations: ∂_{μ}(∂ℒ/∂(∂_{μ}φ)) − ∂ℒ/∂φ = 0.
E: ∂_{μ}(∂ℒ/∂(∂_{μ}φ)) − ∂ℒ/∂φ = 0 :: field Euler–Lagrange equation
H: Key examples
- **Klein–Gordon**: ℒ = ½∂_{μ}φ∂^{μ}φ − ½m^{2}φ^{2} gives (□ + m^{2})φ = 0 (relativistic scalar).
- **Maxwell**: ℒ = −¼F_{μν}F^{μν} − J_{μ}A^{μ} gives ∂_{μ}F^{μν} = J^{ν}.
- **Dirac**: ℒ = ψ̄(iγ^{μ}∂_{μ} − m)ψ for spin-½ fields.
- **Einstein–Hilbert**: ℒ = (c^{4}/16πG)R√(−g) gives general relativity.
- Elastic strings, membranes and fluids as continuum mechanics.
E: ℒ_{EM} = −¼F_{μν}F^{μν} :: Maxwell Lagrangian
H: Energy and momentum
P: Noether's theorem for spacetime translations gives the energy–momentum tensor T^{μν}, with ∂_{μ}T^{μν} = 0. For EM, T^{00} = ½(ε_{0}E^{2} + B^{2}/μ_{0}) and T^{0i}/c is the Poynting vector. Solitons, vortices and domain walls are stable classical field configurations. Classical fields are the starting point for quantisation.
X: Derive the Klein–Gordon equation.
> ∂ℒ/∂(∂_{μ}φ) = ∂^{μ}φ; ∂ℒ/∂φ = −m^{2}φ
> ∂_{μ}∂^{μ}φ + m^{2}φ = 0
K: Fields have Lagrangian densities; the Euler–Lagrange equations give wave equations, and Noether gives conserved energy and momentum.
!: Field theories have infinitely many degrees of freedom: one (or more) at each point in space.
Q: What equation does a free relativistic scalar field obey? | The Klein–Gordon equation (□ + m^{2})φ = 0.
Q: What does ∂_{μ}T^{μν} = 0 express? | Local conservation of energy and momentum.
M1: The Maxwell Lagrangian is: | −¼F_{μν}F^{μν} | ½m^{2}A^{2} | ψ̄γψ | R√(−g) | Gauge-invariant kinetic term.
M2: The energy density of an EM field is: | ½(ε_{0}E^{2} + B^{2}/μ_{0}) | E·B | qV | ½mv^{2} | T^{00}.

## Quantum field theory
S: Quantum field theory combines quantum mechanics and special relativity by treating particles as excitations of underlying fields. It is the framework of the Standard Model, explaining particle creation and annihilation, antiparticles and the spin–statistics connection.
H: Why fields?
- Relativistic energies can create particle–antiparticle pairs, so particle number is not fixed.
- Single-particle relativistic wave equations have negative-energy and causality problems.
- Every electron is identical because all are excitations of the same electron field.
H: Canonical quantisation
- Expand the field in modes: φ(x) = ∫[a_{p}e^{−ip·x} + a_{p}^{†}e^{ip·x}] d^{3}p/((2π)^{3}√(2E_{p})).
- Impose [a_{p}, a_{q}^{†}] = (2π)^{3}δ^{3}(p − q): each mode is a harmonic oscillator.
- a^{†} creates a particle with momentum p; the vacuum |0⟩ has none.
- Fermion fields use anticommutators, giving Pauli exclusion.
E: H = ∫ E_{p}a_{p}^{†}a_{p} d^{3}p/(2π)^{3} (+ vacuum energy) :: free-field Hamiltonian
H: Key results
- **Spin–statistics theorem**: integer spin ⇒ bosons; half-integer ⇒ fermions.
- **Antiparticles** arise naturally from complex fields.
- **Vacuum fluctuations**: Casimir effect, Lamb shift.
- **Interactions** (e.g. ψ̄γ^{μ}ψA_{μ} in QED) handled by perturbation theory, Feynman diagrams and renormalisation.
H: Achievements
P: QED predicts the electron's magnetic moment to better than 1 part in 10^{12}. The Standard Model (QED, QCD, electroweak theory) is a QFT. QFT also describes phase transitions and condensed matter (effective field theories, conformal field theory). Gravity has not yet been successfully quantised as an ordinary QFT.
X: What does a_{p}^{†}a_{q}^{†}|0⟩ describe?
> A two-particle state with momenta p and q
> For bosons it is symmetric under exchange; for fermions antisymmetric
K: In QFT, particles are quanta of fields; creation and annihilation operators make particle number dynamic.
!: The vacuum is not empty: it has zero-point fluctuations, though only energy differences are usually observable.
Q: What is the spin–statistics theorem? | Particles with integer spin are bosons and half-integer spin are fermions.
Q: Why are all electrons identical in QFT? | They are excitations of the same electron field.
M1: Fermion fields are quantised with: | Anticommutators | Commutators | Poisson brackets | No rules | Pauli exclusion.
M2: The Casimir effect demonstrates: | Vacuum fluctuations | Gravity waves | Proton decay | Superconductivity | Force between neutral plates.

## Path integrals
S: Feynman's path integral says a quantum amplitude is the sum over every possible path, each weighted by e^{iS/ħ}. This formulation makes symmetries manifest, connects quantum mechanics to statistical physics, and is the foundation of modern quantum field theory.
H: The idea
- The amplitude to go from x_{a} at t_{a} to x_{b} at t_{b}: K = ∫Dx e^{iS[x]/ħ}.
- Every path contributes with equal magnitude but different phase.
- Classical paths dominate when S ≫ ħ: stationary phase, since nearby paths interfere constructively there.
E: K(b, a) = ∫Dx(t) e^{iS[x]/ħ} :: path integral
H: Computing it
- Slice time into N steps and integrate over intermediate positions; take N → ∞.
- Free particle and harmonic oscillator are Gaussian and exactly solvable.
- **Semiclassical approximation**: expand around the classical path; fluctuations give prefactors.
- **Wick rotation** t → −iτ turns e^{iS/ħ} into e^{−S_{E}/ħ}, a statistical weight.
E: Z = ∫Dφ e^{−S_{E}[φ]/ħ} :: Euclidean path integral / partition function
H: Applications
P: In QFT, Z = ∫Dφ e^{iS[φ]} generates all correlation functions; perturbation theory gives Feynman diagrams. Euclidean path integrals connect quantum field theory to statistical mechanics at temperature T (imaginary time of period ħ/k_{B}T). Lattice QCD evaluates them numerically. Instantons, tunnelling and the Aharonov–Bohm effect are natural in this language.
X: Why do classical paths dominate for a baseball?
> S ~ mvL ~ 0.1 kg × 10 m s^{-1} × 1 m = 1 J s ≫ ħ ≈ 10^{-34} J s
> Phases oscillate wildly except near the stationary path, which survives
K: Sum over all paths with phase e^{iS/ħ}; classical physics emerges where the phase is stationary.
!: The path-integral "measure" Dx is mathematically subtle; physicists define it by time slicing or other regularisations.
Q: What does Wick rotation do? | It converts real time to imaginary time, turning quantum amplitudes into statistical weights e^{−S_{E}/ħ}.
Q: How does lattice QCD use path integrals? | It evaluates Euclidean path integrals numerically on a spacetime lattice.
M1: In the path integral, each path's weight is: | e^{iS/ħ} | e^{−E/k_{B}T} only | S^{2} | 1/S | Phase from the action.
M2: Imaginary time of period ħ/k_{B}T corresponds to: | Finite temperature | Zero temperature | Infinite mass | Relativity | Thermal field theory.

## Feynman diagrams
S: Feynman diagrams are pictorial shorthand for terms in perturbative calculations of particle interactions. Lines represent propagating particles and vertices represent interactions, and each diagram translates into a precise mathematical expression.
H: Elements
- **External lines**: incoming and outgoing particles.
- **Internal lines (propagators)**: virtual particles, e.g. photon i(−g_{μν})/q^{2}, fermion i(γ·p + m)/(p^{2} − m^{2}).
- **Vertices**: interactions with a coupling; QED vertex −ieγ^{μ}.
- Momentum is conserved at every vertex; loops integrate over undetermined momenta.
H: Orders and couplings
- Each vertex contributes a factor of the coupling; QED amplitude ∝ e^{n}, so cross-sections ∝ α^{n} with α ≈ 1/137.
- Tree diagrams: lowest order, no loops. Loop diagrams: quantum corrections.
- **Crossing symmetry**: the same diagram describes related processes (e^{−}e^{−} scattering and e^{+}e^{−} annihilation).
E: σ ∝ |M|^{2} :: cross-section from the matrix element
E: α = e^{2}/(4πε_{0}ħc) ≈ 1/137 :: fine-structure constant
H: Examples
P: Electron–electron scattering (Møller) and electron–positron annihilation into muons are tree-level QED. The electron's anomalous magnetic moment comes from loop diagrams, starting with Schwinger's α/2π. In QCD, gluons self-interact (three- and four-gluon vertices). Thousands of diagrams are computed automatically for LHC predictions. Diagrams are a calculational tool: virtual particles don't need to be on-shell.
X: Estimate the ratio of a one-loop to tree-level QED correction.
> Each extra pair of vertices brings α/π ≈ 0.0023
> So one-loop corrections are ~0.2% of tree level
X: Schwinger's result for the electron's anomalous moment?
> a_{e} = α/2π ≈ 0.00116
K: Feynman diagrams organise perturbation theory: lines are propagators, vertices are couplings, loops are quantum corrections.
!: Virtual particles in internal lines are not real particles; they are terms in an expansion and can be off-shell.
Q: What does each vertex contribute in QED? | A factor of the coupling e (with a γ matrix), so amplitudes scale with powers of e.
Q: What is a tree-level diagram? | A lowest-order diagram with no closed loops.
M1: Adding a loop to a QED diagram multiplies amplitude roughly by: | α/π | α^{2} | 1/α | 137 | Small correction.
M2: Crossing symmetry relates: | Different processes using the same diagram | Different couplings | Gravity and EM | Time reversal only | Turn incoming to outgoing antiparticles.

## Renormalisation
S: Renormalisation handles infinities that appear in quantum field theory loop calculations by absorbing them into measurable parameters like mass and charge. Its modern understanding, through the renormalisation group, explains how physics changes with scale.
H: The problem
- Loop integrals over unlimited momenta diverge (ultraviolet divergences).
- The "bare" parameters in the Lagrangian are not what experiments measure.
H: The procedure
- **Regularise**: make integrals finite with a cutoff Λ or dimensional regularisation (d = 4 − ε dimensions).
- **Renormalise**: redefine mass, charge and field normalisation so physical quantities are finite and match experiment.
- Predictions for other observables are then finite and cutoff-independent.
- **Renormalisable theories** (QED, QCD, the Standard Model) need only finitely many counterterms.
H: The renormalisation group
- Couplings "run" with energy scale μ.
- QED: α grows with energy (1/137 at low energy, ~1/128 at the Z mass) due to vacuum polarisation screening.
- QCD: α_{s} decreases at high energy (**asymptotic freedom**, Nobel 2004) and grows at low energy (confinement).
- Wilson's view: integrate out high-energy modes, see how effective couplings flow; fixed points describe critical phenomena.
E: μ dg/dμ = β(g) :: renormalisation group equation
E: α_{s}(Q^{2}) ≈ 12π/((33 − 2n_{f}) ln(Q^{2}/Λ^{2}_{QCD})) :: one-loop QCD running
H: Meaning
P: Renormalisation is not sweeping infinities under the rug: it reflects that low-energy physics is insensitive to unknown high-energy details, apart from a few parameters. Non-renormalisable theories (like gravity as a QFT) still work as effective theories at low energies. Universality in phase transitions comes from RG fixed points.
X: Estimate α_{s} at Q = 100 GeV with n_{f} = 5, Λ_{QCD} = 0.2 GeV.
> ln(Q^{2}/Λ^{2}) = 2 ln(500) ≈ 12.4
> α_{s} ≈ 12π/(23 × 12.4) ≈ 37.7/285 ≈ 0.13
K: Renormalisation absorbs divergences into measured parameters; the renormalisation group describes how couplings change with scale.
!: Running couplings don't mean the "charge changes" arbitrarily; they reflect screening or antiscreening by virtual particles at different distances.
Q: What is asymptotic freedom? | The strong coupling decreases at high energies (short distances), so quarks interact weakly there.
Q: What does dimensional regularisation do? | Computes loop integrals in d = 4 − ε dimensions to make divergences appear as poles in ε.
M1: The QED coupling at higher energy is: | Larger | Smaller | Unchanged | Zero | Less screening.
M2: Wilson's RG approach involves: | Integrating out short-distance modes | Adding infinities | Ignoring loops | Fixing the cutoff to zero | Coarse-graining.

## Gauge theories
S: Gauge theories describe forces arising from local symmetries: demanding that a phase or internal rotation can vary from point to point forces the existence of gauge fields. Electromagnetism, the weak force and the strong force are all gauge theories.
H: From global to local symmetry
- A free electron field ψ is invariant under ψ → e^{iα}ψ with constant α.
- Requiring invariance for α(x) varying in spacetime needs a covariant derivative D_{μ} = ∂_{μ} + ieA_{μ}.
- A_{μ} must transform as A_{μ} → A_{μ} − (1/e)∂_{μ}α: this is the photon.
- Gauge symmetry forbids a photon mass term.
E: D_{μ} = ∂_{μ} + ieA_{μ} :: covariant derivative (U(1))
E: F_{μν} = ∂_{μ}A_{ν} − ∂_{ν}A_{μ} :: field strength
H: Non-abelian gauge theories
- Yang–Mills (1954): gauge groups SU(N) with non-commuting generators.
- Field strength F^{a}_{μν} = ∂_{μ}A^{a}_{ν} − ∂_{ν}A^{a}_{μ} + gf^{abc}A^{b}_{μ}A^{c}_{ν}: gauge bosons self-interact.
- QCD: SU(3), 8 gluons; electroweak: SU(2) × U(1).
E: ℒ = −¼F^{a}_{μν}F^{aμν} + ψ̄(iγ^{μ}D_{μ} − m)ψ :: Yang–Mills + matter
H: Mass and the Higgs
P: Gauge bosons appear massless, but W and Z are heavy. The Higgs mechanism spontaneously breaks SU(2) × U(1) to U(1)_{EM}: three would-be Goldstone bosons become the longitudinal modes of W^{±} and Z, leaving the photon massless. 't Hooft and Veltman proved these theories renormalisable (Nobel 1999). Gauge redundancy is a description choice; physical observables are gauge-invariant (e.g. the Aharonov–Bohm phase).
X: How many gauge bosons does SU(2) × U(1) have before symmetry breaking?
> 3 (SU(2)) + 1 (U(1)) = 4: these become W^{+}, W^{−}, Z and the photon
K: Local symmetry requires gauge fields; non-abelian groups give self-interacting gauge bosons, and the Higgs mechanism gives some mass.
!: Gauge symmetry is a redundancy in description, not a physical transformation of the state; only gauge-invariant quantities are observable.
Q: Why must the photon be massless in unbroken QED? | A mass term A_{μ}A^{μ} would violate gauge invariance.
Q: What distinguishes non-abelian gauge theories? | Gauge bosons carry charge and interact with each other.
M1: The gauge group of QCD is: | SU(3) | U(1) | SU(2) | SO(3) | Eight gluons.
M2: The Higgs mechanism gives mass to: | W and Z bosons | The photon | Gluons | Gravitons | Electroweak symmetry breaking.

## Effective field theories
S: Effective field theories describe physics at a given energy scale using only the relevant degrees of freedom, with unknown high-energy effects packaged into a few parameters. They explain why physics works at each scale without knowing the ultimate theory.
H: The philosophy
- Separate scales: heavy particles of mass M influence low-energy physics (E ≪ M) only through suppressed operators.
- Write the most general Lagrangian consistent with symmetries, ordered by powers of E/M.
- Higher-dimension operators have coefficients ∝ 1/M^{n}.
E: ℒ_{eff} = ℒ_{renorm} + Σ c_{i}O_{i}/M^{d_{i}−4} :: EFT expansion
H: Examples
- **Fermi theory** of weak interactions: four-fermion contact interaction with G_{F} ≈ 1.17 × 10^{-5} GeV^{-2}, valid well below the W mass (G_{F}/√2 = g^{2}/8M_{W}^{2}).
- **Chiral perturbation theory**: pions as Goldstone bosons of QCD at low energy.
- **Heavy quark effective theory**, **non-relativistic QED** for atoms.
- **SMEFT**: Standard Model plus higher-dimension operators to parametrise new physics.
- **General relativity** as an EFT of quantum gravity below the Planck scale.
- Condensed matter: Fermi-liquid theory, Ginzburg–Landau theory.
H: Matching and running
P: Matching sets EFT coefficients by comparing with the full theory at the boundary scale; RG running then evolves them down. EFTs explain why non-renormalisable theories still predict well at low energies, and they quantify how precise measurements can probe high scales indirectly. Naturalness puzzles (Higgs mass, cosmological constant) are puzzles about EFT parameter sizes.
X: Fermi theory: estimate the W mass from G_{F} and g ≈ 0.65.
> M_{W}^{2} = √2g^{2}/(8G_{F}) = 1.414 × 0.4225/(8 × 1.17 × 10^{-5}) ≈ 6400 GeV^{2}
> M_{W} ≈ 80 GeV ✓
K: Effective theories keep what matters at a given scale and encode the rest in a few constants.
!: An EFT breaks down as energies approach the scale of new physics; its expansion parameter E/M must stay small.
Q: Why does Fermi's theory work at low energy? | W exchange looks like a point interaction when momentum transfer is far below M_{W}.
Q: What is SMEFT? | The Standard Model extended with higher-dimension operators to parametrise unknown heavy new physics.
M1: Higher-dimension operators are suppressed by: | Powers of 1/M | Powers of M | Nothing | The fine-structure constant only | Heavy scale.
M2: Pions are described by: | Chiral perturbation theory | QED | General relativity | Fermi-liquid theory | Low-energy QCD.

## Scattering theory
S: Scattering theory describes what happens when particles collide and fly apart. Cross-sections, phase shifts and the S-matrix connect theoretical interactions to the measured rates and angular distributions in experiments, from Rutherford's gold foil to the LHC.
H: Cross-sections
- Differential cross-section dσ/dΩ: number scattered into solid angle dΩ per unit incident flux.
- Total σ = ∫(dσ/dΩ)dΩ; event rate = luminosity × σ.
- Rutherford: dσ/dΩ = (zZe^{2}/(16πε_{0}E))^{2}/sin^{4}(θ/2).
E: dσ/dΩ = |f(θ)|^{2} :: from the scattering amplitude
E: R = Lσ :: event rate
H: Quantum scattering
- Wavefunction at large r: ψ ≈ e^{ikz} + f(θ)e^{ikr}/r.
- **Born approximation**: f(θ) = −(m/2πħ^{2})∫e^{−iq·r}V(r)d^{3}r; scattering probes the Fourier transform of the potential.
- **Partial waves**: f(θ) = (1/k)Σ(2l + 1)e^{iδ_{l}}sin δ_{l}P_{l}(cos θ); low energy is dominated by s-waves.
- **Optical theorem**: σ_{tot} = (4π/k) Im f(0).
E: σ_{l} = (4π/k^{2})(2l + 1)sin^{2}δ_{l} :: partial-wave cross-section
H: Resonances and the S-matrix
P: Resonances appear as peaks where a phase shift passes through 90°, with Breit–Wigner shape σ ∝ Γ^{2}/4/((E − E_{0})^{2} + Γ^{2}/4); width Γ = ħ/τ. The S-matrix relates in and out states; unitarity, analyticity and crossing constrain it. Form factors from electron scattering revealed the proton's size and quark structure.
X: The Z resonance has width Γ = 2.5 GeV. Lifetime?
> τ = ħ/Γ = 6.58 × 10^{-25} GeV s/2.5 GeV ≈ 2.6 × 10^{-25} s
X: An LHC process has σ = 50 pb with L = 2 × 10^{34} cm^{-2} s^{-1}. Event rate?
> 50 pb = 5 × 10^{-35} cm^{2}; R = 2 × 10^{34} × 5 × 10^{-35} = 1 per second
K: Scattering measures cross-sections; theory computes amplitudes via Born, partial waves or the S-matrix.
!: Cross-section is an effective area for a process, not the physical size of the target.
Q: What does the optical theorem relate? | The total cross-section to the imaginary part of the forward scattering amplitude.
Q: What does the Born approximation give? | A scattering amplitude proportional to the Fourier transform of the potential.
M1: Rutherford scattering scales with angle as: | 1/sin^{4}(θ/2) | sin^{2}θ | Constant | cos θ | Steep forward peak.
M2: A resonance's width relates to its: | Lifetime | Mass only | Charge | Spin only | Γ = ħ/τ.

## Green's functions
S: A Green's function is the response of a linear system to a point source. Once you know it, the solution for any source follows by superposition, making Green's functions central to electrostatics, wave propagation, quantum mechanics and field theory.
H: Definition
- For a linear operator L: LG(x, x') = δ(x − x').
- Solution for source f: u(x) = ∫G(x, x')f(x')dx' (plus boundary terms).
- Boundary conditions determine G.
E: L G(x, x') = δ(x − x') :: defining equation
E: u(x) = ∫G(x, x')f(x')dx' :: solution by superposition
H: Classic Green's functions
- **Poisson (3D)**: ∇^{2}G = −δ^{3}(r) gives G = 1/(4π|r − r'|): the Coulomb potential.
- **Helmholtz**: (∇^{2} + k^{2})G = −δ gives G = e^{ik|r−r'|}/(4π|r − r'|) (outgoing spherical waves).
- **Diffusion**: G = (4πDt)^{−3/2}e^{−r^{2}/4Dt} (spreading Gaussian).
- **Wave equation**: retarded Green's function, signals travel at speed c (causality).
- **Damped oscillator**: G(t) = e^{−γt/2}sin(ω_{1}t)/(mω_{1}) for t > 0.
H: In quantum physics
P: The quantum propagator ⟨x|e^{−iHt/ħ}|x'⟩ is a Green's function. In QFT, propagators are Green's functions of field equations, e.g. 1/(p^{2} − m^{2} + iε) with iε choosing causal (Feynman) boundary conditions. Many-body Green's functions encode quasiparticle energies and lifetimes; spectral functions are measured by ARPES. The method of images builds Green's functions satisfying boundary conditions.
X: Use the Green's function to find the potential of a charge distribution ρ.
> φ(r) = (1/ε_{0})∫ρ(r')/(4π|r − r'|) d^{3}r' = (1/4πε_{0})∫ρ(r')/|r − r'| d^{3}r'
X: Diffusion Green's function: rms spread in 1D after time t?
> σ = √(2Dt)
K: Solve once for a point source, then superpose; boundary conditions and causality select the right Green's function.
!: Different boundary conditions (retarded, advanced, Feynman) give different Green's functions for the same operator.
Q: What is the Green's function of the 3D Laplacian? | −1/(4π|r − r'|) (or +1/(4π|r − r'|) for −∇^{2}).
Q: What is the retarded Green's function? | The causal response that is zero before the source acts.
M1: The method of images helps construct Green's functions that: | Satisfy boundary conditions | Are always zero | Ignore sources | Are nonlinear | Mirror charges enforce boundaries.
M2: In QFT, propagators are: | Green's functions of field equations | Classical paths | Lagrangians | Cross-sections | 1/(p^{2} − m^{2}).

## Perturbative and non-perturbative methods
S: Perturbation theory expands answers in powers of a small parameter, giving most of physics' precise predictions. But some phenomena, like confinement, tunnelling and phase transitions, are invisible at any order and need non-perturbative methods.
H: Perturbation theory
- Write H = H_{0} + λV with H_{0} solvable; expand energies and states in λ.
- First-order energy: E^{(1)} = ⟨n|V|n⟩; second-order: Σ|⟨m|V|n⟩|^{2}/(E_{n} − E_{m}).
- QFT: Feynman diagram expansions in couplings α, α_{s}.
- Degenerate perturbation theory diagonalises V within degenerate subspaces.
E: E_{n} ≈ E_{n}^{(0)} + λ⟨n|V|n⟩ + λ^{2}Σ_{m≠n}|⟨m|V|n⟩|^{2}/(E_{n}^{(0)} − E_{m}^{(0)}) :: Rayleigh–Schrödinger
H: Limits
- Series are often asymptotic, not convergent: terms shrink then grow (QED diverges around order ~137).
- Effects like e^{−1/λ} have zero Taylor expansion at λ = 0, so they are invisible perturbatively (tunnelling, instantons).
- Strong coupling (QCD at low energy) defeats expansion.
H: Non-perturbative methods
P: Variational methods give upper bounds on ground-state energies. WKB and instantons capture tunnelling. Lattice field theory computes QCD masses numerically from first principles (proton mass within ~1%). Exact solutions in integrable models, large-N expansions, dualities (AdS/CFT, electric–magnetic), mean-field theory, renormalisation group and numerical methods (DMRG, quantum Monte Carlo) all go beyond perturbation theory. Resurgence connects perturbative and non-perturbative parts.
X: Tunnelling rate ∝ e^{−2∫κ dx}. Why can't perturbation theory in ħ capture it?
> e^{−S/ħ} has all derivatives zero as ħ → 0
> Its Taylor series is identically zero, so no order of perturbation theory sees it
X: First-order energy shift of a harmonic oscillator ground state under V = λx^{4}?
> ⟨x^{4}⟩ = 3(ħ/2mω)^{2}
> ΔE = 3λ(ħ/2mω)^{2}
K: Perturbation theory is powerful when couplings are small; non-perturbative effects require other tools.
!: Adding more perturbative orders doesn't always improve accuracy; asymptotic series must be truncated optimally.
Q: What is an asymptotic series? | A series whose terms first decrease then grow, giving best accuracy when truncated near the smallest term.
Q: Name a non-perturbative method for QCD. | Lattice QCD (also large-N, effective theories, dualities).
M1: Effects like e^{−1/g} are: | Invisible to perturbation theory | Large perturbative corrections | First-order | Classical | Zero Taylor series.
M2: The variational principle gives: | An upper bound on the ground-state energy | Exact excited states | Lower bounds | Scattering lengths | E_{trial} ≥ E_{0}.

## Solvable models
S: Exactly solvable models are idealised systems whose behaviour can be computed completely. They anchor physical understanding, test approximations and reveal phenomena, such as phase transitions and fractional excitations, that approximate methods might miss.
H: Classic examples
- **Harmonic oscillator**: E_{n} = ħω(n + ½); ladder operators; basis of phonons and photons.
- **Hydrogen atom**: E_{n} = −13.6 eV/n^{2}; hidden SO(4) symmetry explains degeneracy.
- **Particle in a box**, **free particle**, **delta potential**.
- **Two-level system**: Rabi oscillations, spin in a field.
H: Statistical mechanics
- **1D Ising model**: no phase transition at T > 0 (transfer matrix).
- **2D Ising model**: Onsager's exact solution (1944), critical temperature k_{B}T_{c} = 2J/ln(1 + √2) ≈ 2.269J.
- **Ideal gases** (classical, Bose, Fermi).
- **Six- and eight-vertex models** (Baxter).
E: k_{B}T_{c} = 2J/ln(1 + √2) :: 2D Ising critical temperature
H: Quantum many-body
P: The **Heisenberg spin chain** (Bethe ansatz, 1931), **Lieb–Liniger** Bose gas, **Hubbard model in 1D**, **Kitaev chain** (Majorana edge modes), **Kitaev honeycomb** (anyons), **Tomonaga–Luttinger liquids**, and the **Jaynes–Cummings model** of an atom in a cavity are solvable. They reveal spinons, fractionalisation and topological order. Small deformations of solvable models are studied by perturbation theory around them.
X: Why does the 1D Ising model have no finite-temperature transition?
> A single domain wall costs 2J but gains entropy k_{B} ln N
> For large N, entropy wins at any T > 0, so order is destroyed
X: Onsager T_{c} for J = 1 meV?
> k_{B}T_{c} = 2.269 meV ⇒ T_{c} ≈ 26 K
K: Solvable models give exact benchmarks and reveal phenomena approximations miss.
!: Exactly solvable models are often special (fine-tuned); real systems may differ qualitatively when the special structure is broken.
Q: Who solved the 2D Ising model exactly? | Lars Onsager, in 1944.
Q: What is the Bethe ansatz? | A method of exactly solving certain 1D quantum many-body systems with a special wavefunction form.
M1: The Kitaev chain hosts: | Majorana edge modes | Photons | Gravitons | Free electrons only | Topological superconductor model.
M2: Hydrogen's extra degeneracy comes from: | Hidden SO(4) symmetry | Spin only | Relativity | Nuclear size | The Runge–Lenz vector.

## Integrable systems
S: Integrable systems have as many independent conserved quantities as degrees of freedom, so their motion is regular and solvable rather than chaotic. They range from the Kepler problem to solitons and quantum spin chains.
H: Classical integrability
- **Liouville integrability**: n independent conserved quantities in involution ({F_{i}, F_{j}} = 0) for n degrees of freedom.
- Motion lies on n-dimensional invariant tori; action–angle variables exist.
- Examples: Kepler problem, harmonic oscillators, the spinning top (Euler, Lagrange and Kovalevskaya cases).
E: {F_{i}, F_{j}} = 0, i, j = 1, …, n :: integrability condition
H: Breaking integrability
- **KAM theorem**: small perturbations preserve most tori with sufficiently irrational frequency ratios; chaos appears in thin layers near resonances.
- Larger perturbations destroy more tori, spreading chaos.
- The solar system is nearly integrable but chaotic over long times.
H: Infinite-dimensional integrability
P: PDEs like KdV, nonlinear Schrödinger and sine-Gordon have infinitely many conservation laws and Lax pairs (L̇ = [M, L]), and are solved by the inverse scattering transform; solitons are their hallmark. Quantum integrable models (Heisenberg chain, Lieb–Liniger gas) don't thermalise normally; they relax to generalised Gibbs ensembles. The Newton's cradle experiment with cold atoms (2006) showed this lack of thermalisation.
E: dL/dt = [M, L] :: Lax pair
X: Is a 2D isotropic oscillator integrable?
> 2 degrees of freedom; conserved H and angular momentum L_{z}, with {H, L_{z}} = 0
> Yes: two independent conserved quantities in involution
K: Integrable systems have enough conserved quantities to make motion regular; perturbations gradually introduce chaos (KAM).
!: Having many conserved quantities isn't enough; they must be independent and Poisson-commute.
Q: What does the KAM theorem state? | Under small perturbations, most invariant tori of an integrable system survive, deformed.
Q: What is a Lax pair? | Operators L and M with L̇ = [M, L], whose spectrum of L gives conserved quantities.
M1: Integrable motion lies on: | Invariant tori | Strange attractors | Fixed points only | Random walks | n-dimensional tori.
M2: Quantum integrable systems relax to: | Generalised Gibbs ensembles | Ordinary thermal states always | Chaos | Zero temperature | Extra conserved quantities matter.

## Mathematical methods for boundary-value problems
S: Boundary-value problems ask for solutions of differential equations that satisfy conditions on the edges of a region. Separation of variables, eigenfunction expansions, special functions and transforms solve the standard problems of heat, waves, electrostatics and quantum mechanics.
H: Separation of variables
- Assume u(x, y, …) = X(x)Y(y)…; each factor satisfies an ODE with separation constants.
- Boundary conditions quantise the constants (eigenvalues).
- The general solution is a superposition of separated modes.
H: Sturm–Liouville theory
- Problems (p y')' − qy + λwy = 0 with suitable boundary conditions.
- Real eigenvalues, orthogonal eigenfunctions with weight w, complete basis.
- Sine and cosine (Fourier), Legendre polynomials (spherical problems), Bessel functions (cylinders), Hermite (oscillator), Laguerre (hydrogen).
E: ∫y_{m}y_{n}w dx = 0 (m ≠ n) :: orthogonality
E: f(x) = Σc_{n}y_{n}(x), c_{n} = ∫fy_{n}w dx/∫y_{n}^{2}w dx :: eigenfunction expansion
H: Other tools
P: Fourier and Laplace transforms turn derivatives into multiplication, ideal for infinite domains and initial-value problems. Spherical harmonics Y_{lm} solve angular parts of Laplace's equation. Conformal mapping solves 2D Laplace problems with awkward boundaries. Variational (Rayleigh–Ritz) and Green's function methods round out the toolkit. Uniqueness theorems guarantee that a solution satisfying all conditions is the solution.
X: Solve u_{t} = Du_{xx} on 0 < x < L with u(0) = u(L) = 0.
> Separate: u = Σb_{n}sin(nπx/L)e^{−D(nπ/L)^{2}t}
> b_{n} from the Fourier sine series of the initial condition
X: Steady temperature in a disk with boundary T(a, φ) = cos φ?
> Laplace in polar: T = (r/a)cos φ
K: Separate variables, apply boundary conditions to get eigenvalues, and expand in the resulting orthogonal functions.
!: Separation works only when the equation and boundaries suit the chosen coordinates; otherwise use transforms or numerics.
Q: What does Sturm–Liouville theory guarantee? | Real eigenvalues and a complete set of orthogonal eigenfunctions.
Q: Which special functions solve Laplace's equation in cylindrical coordinates? | Bessel functions.
M1: Higher modes in the heat equation decay: | Faster | Slower | At the same rate | Never | Rate ∝ n^{2}.
M2: Legendre polynomials arise in problems with: | Spherical symmetry | Rectangular boxes only | Time dependence only | No boundaries | Angular part of Laplace's equation.
`;
