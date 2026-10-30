// Unit 9: Elasticity and Solid Mechanics. Format: kit/course/notes.js
export default `
## Stress and strain
S: Stress is the internal force per unit area in a material; strain is the fractional deformation it produces. Describing materials by stress and strain, rather than force and extension, makes results independent of the sample's size.
H: Definitions
E: σ = F/A :: normal stress (Pa); tensile positive, compressive negative
E: ε = ΔL/L_{0} :: normal strain (dimensionless)
E: τ = F_{∥}/A; γ = Δx/h :: shear stress and shear strain
- Engineering stress uses the original area; true stress uses the current (necked) area.
H: The stress–strain curve (ductile metal)
- Linear elastic region up to the limit of proportionality.
- Elastic limit: beyond it, permanent (plastic) deformation.
- Yield point: large strain for little extra stress.
- Ultimate tensile strength (UTS): maximum engineering stress; necking begins.
- Fracture.
X: A 2.0 m steel wire of 1.0 mm diameter stretches 1.0 mm under 150 N. Find stress and strain.
> A = π(0.5 × 10^{-3})^{2} = 7.85 × 10^{-7} m^{2}; σ = 1.9 × 10^{8} Pa
> ε = 10^{-3}/2.0 = 5 × 10^{-4}
!: Strain has no units; percentages are common (0.05% here).
Q: Why use stress and strain instead of force and extension? | They describe the material itself, independent of the sample's dimensions.
Q: What is the ultimate tensile strength? | The maximum stress a material can withstand in tension before necking and failure.
M1: Stress has units of: | Pa | N | m | None | Force per area.
M2: A 1 m rod extends 0.2 mm. Its strain is: | 2 × 10^{-4} | 0.2 | 2 × 10^{-3} | 200 | 0.0002/1.

## Young's modulus
S: Young's modulus is the ratio of tensile stress to tensile strain in the linear elastic region. It measures a material's stiffness: how hard it is to stretch, regardless of how strong it is.
H: Definition
E: E = σ/ε = FL_{0}/(AΔL)
H: Typical values
- Rubber ~0.01–0.1 GPa; nylon ~3 GPa; wood (along grain) ~10 GPa; bone ~17 GPa; aluminium 70 GPa; glass 70 GPa; steel 200 GPa; diamond ~1050 GPa; graphene ~1000 GPa.
H: Measuring it (Searle's method)
P: Hang a long, thin test wire beside a reference wire (to cancel temperature changes and support sag). Add loads, measure extension with a vernier or micrometer, plot load against extension; E = (gradient) × L_{0}/A. A long wire and small diameter give measurable extensions; the diameter (squared) usually dominates the uncertainty.
X: A 3.0 m copper wire (d = 0.50 mm) extends 2.6 mm under a 20 N load. Find E.
> A = π(0.25 × 10^{-3})^{2} = 1.96 × 10^{-7} m^{2}
> E = FL_{0}/(AΔL) = 20 × 3.0/(1.96 × 10^{-7} × 2.6 × 10^{-3}) = 1.2 × 10^{11} Pa, the accepted value for copper
!: Stiffness (E) isn't strength. Glass is stiff but brittle; rubber is flexible but tough.
Q: What does Young's modulus measure? | A material's stiffness in tension: stress per unit strain in the elastic region.
Q: Why use a reference wire in Searle's method? | To cancel effects of temperature changes and support movement.
M1: Which has the highest Young's modulus? | Diamond | Steel | Rubber | Aluminium | ~1000 GPa.
M2: Doubling a wire's diameter (same load, length) changes its extension by: | ×1/4 | ×1/2 | ×2 | ×4 | ΔL ∝ 1/A ∝ 1/d^{2}.

## Shear modulus
S: The shear (rigidity) modulus relates shear stress to shear strain: how a material resists being skewed. It governs torsion of shafts, the speed of S-waves in rock and the twisting of springs.
H: Definition
E: G = τ/γ
E: G = E/(2(1 + ν)) :: for isotropic materials, with Poisson's ratio ν
- Steel ~79 GPa; aluminium ~26 GPa; rubber ~0.0003–0.001 GPa.
- Liquids have G = 0: they can't resist static shear (they flow). S-waves don't pass through Earth's liquid outer core.
H: Torsion
E: τ_{torque} = (πGr^{4}/(2L))φ :: twisting a solid cylinder of radius r, length L through angle φ
- Torsion balances (Cavendish, Coulomb) use thin fibres with tiny G r^{4}.
- Coil springs deform mainly in torsion of the wire: k = Gd^{4}/(8D^{3}n).
X: A shear force of 400 N acts on the top of a 0.1 m cube of rubber (G = 1 MPa). How far does the top move?
> τ = 400/0.01 = 4 × 10^{4} Pa; γ = τ/G = 0.04
> Δx = γh = 4 mm
!: Shear strain is an angle (in radians, for small values), not a fractional length change.
Q: Why can't S-waves travel through liquid? | Liquids have zero shear modulus.
Q: How is G related to E for an isotropic material? | G = E/(2(1 + ν)).
M1: Torsional stiffness of a solid shaft scales with radius as: | r^{4} | r^{2} | r | r^{3} | Polar moment of area ∝ r^{4}.
M2: The shear modulus of water is: | 0 | 2.2 GPa | 1 GPa | 79 GPa | Fluids don't resist static shear.

## Bulk modulus
S: The bulk modulus measures resistance to uniform compression: the pressure needed per fractional change in volume. It sets the speed of sound in fluids and how much the ocean, rocks and stars compress.
H: Definition
E: K = −Δp/(ΔV/V)
E: K = E/(3(1 − 2ν)) :: isotropic solid
E: compressibility β = 1/K
- Water 2.2 GPa; steel 160 GPa; diamond ~440 GPa; air (isothermal) = p ≈ 0.1 MPa, adiabatic γp ≈ 0.14 MPa.
H: Consequences
- Speed of sound c = √(K/ρ): 1480 m s^{-1} in water, ~5000 m s^{-1} in steel.
- Ocean water at 4 km depth is compressed ~1.8%; without compressibility, sea level would be ~30 m higher.
- In stars and planets, compressibility sets the mass–radius relation.
X: How much does 1 L of water compress at the bottom of the Mariana Trench (Δp ≈ 1.1 × 10^{8} Pa)?
> ΔV/V = 1.1 × 10^{8}/2.2 × 10^{9} = 5%
> 1 L shrinks by about 50 mL
!: A gas's bulk modulus depends on how it's compressed: isothermally K = p, adiabatically K = γp. Newton got the speed of sound wrong by assuming isothermal.
Q: Define bulk modulus. | The ratio of pressure change to fractional volume decrease, K = −Δp/(ΔV/V).
Q: Why did Newton's speed of sound in air come out too low? | He assumed isothermal compression; sound is adiabatic, with K = γp.
M1: Speed of sound in a medium depends on: | √(K/ρ) | K/ρ | ρ/K | Kρ | c = √(modulus/density).
M2: A material with Poisson's ratio 0.5 is: | Incompressible | Infinitely compressible | Auxetic | Rigid in shear | K → ∞ as ν → 0.5.

## Hooke's law
S: Hooke's law states that extension is proportional to the applied force, up to a limit. It holds for springs and for small deformations of most solids, because interatomic forces near equilibrium behave like springs.
H: The law
E: F = kx :: spring constant k (N m^{-1})
E: σ = Eε :: material form
- Valid up to the limit of proportionality.
- Springs in series: 1/k = Σ1/k_{i}; in parallel: k = Σk_{i}.
H: Atomic origin
P: Near the equilibrium spacing r_{0}, the interatomic potential is approximately parabolic: U ≈ U_{0} + ½k_{a}(r − r_{0})^{2}. So small stretches give restoring forces proportional to displacement. Young's modulus ≈ k_{a}/r_{0}, linking macroscopic stiffness to bond stiffness.
X: A spring stretches 4.0 cm under 2.0 N. How far under 5.0 N (within the limit)?
> k = 2.0/0.04 = 50 N m^{-1}
> x = 5.0/50 = 10 cm
!: Rubber doesn't obey Hooke's law beyond small strains; its stiffness comes from entropy of tangled polymer chains, not bond stretching.
Q: State Hooke's law. | Extension is proportional to force, F = kx, up to the limit of proportionality.
Q: Why do most solids obey Hooke's law for small strains? | Interatomic potentials are approximately quadratic near equilibrium.
M1: Two springs (k each) in parallel have total stiffness: | 2k | k/2 | k | k^{2} | Parallel springs share the load.
M2: A force–extension graph's gradient (force on y-axis) gives: | The spring constant | Young's modulus directly | Energy stored | Strain | F = kx.

## Elastic and plastic deformation
S: Elastic deformation is reversible: atoms are displaced but return when the load is removed. Plastic deformation is permanent: planes of atoms slip past each other, carried by defects called dislocations.
H: Elastic deformation
- Bonds stretch; no rearrangement; energy fully recoverable (ideally).
- Small strains: < ~0.5% for metals.
H: Plastic deformation
- Begins at the yield stress.
- In crystals, happens by dislocation glide: moving a dislocation breaks one row of bonds at a time, so metals yield at ~1/1000 of the theoretical strength of a perfect crystal.
- **Work hardening**: dislocations tangle and block each other, raising the yield stress (bending a paperclip back and forth stiffens it).
- **Annealing**: heating lets dislocations rearrange, softening the metal.
- Strengthening: alloying, small grains, precipitates obstruct dislocations.
H: Ductile vs brittle
P: Ductile materials (copper, gold, mild steel) deform plastically a lot before breaking; brittle ones (glass, ceramics, cast iron) break with little plastic deformation. Temperature matters: steel turns brittle below a transition temperature, as the Liberty ships found in cold seas.
X: A copper wire loaded past its elastic limit and unloaded.
> The unloading line is parallel to the original elastic line
> It doesn't return to zero: the offset is the permanent plastic strain
!: Elastic limit and limit of proportionality are different: a material can be non-linear yet still elastic (rubber).
Q: What carries plastic deformation in metals? | The movement of dislocations.
Q: What is work hardening? | Strengthening by plastic deformation, as dislocations multiply and tangle.
M1: Annealing a metal makes it: | Softer and more ductile | Harder and more brittle | Stiffer | Denser | Dislocations rearrange and annihilate.
M2: When a ductile metal is unloaded after plastic deformation, it: | Keeps a permanent strain | Returns to its original length | Breaks | Contracts below its original length | Only the elastic part recovers.

## Poisson's ratio
S: When you stretch a material it usually gets thinner. Poisson's ratio is the ratio of the sideways contraction strain to the lengthwise extension strain, and it links the different elastic moduli.
H: Definition
E: ν = −ε_{lateral}/ε_{axial}
- Most metals 0.25–0.35; rubber ~0.5 (nearly incompressible); cork ~0 (used for bottle stoppers: no bulging); concrete ~0.2.
- Thermodynamic limits for isotropic materials: −1 < ν < 0.5.
E: ΔV/V = ε(1 − 2ν) :: volume change under uniaxial strain
H: Auxetic materials
P: Some materials have negative ν: they get fatter when stretched. Re-entrant honeycombs and certain foams are auxetic, useful for impact protection, stents and tough fabrics, because they densify where hit.
X: A rubber band (ν = 0.5) is stretched by 10%. How does its cross-sectional area change?
> Lateral strain −5% in each direction
> Area × 0.95^{2} = 0.90: about 10% smaller, keeping volume nearly constant
!: ν = 0.5 means no volume change, not "half as much"; materials with ν < 0.5 increase in volume when stretched.
Q: Define Poisson's ratio. | Minus the ratio of lateral strain to axial strain.
Q: Why is cork good for bottle stoppers? | Its Poisson's ratio is near zero, so it doesn't bulge sideways when compressed.
M1: A material with ν = 0.5 is: | Incompressible | Auxetic | Rigid | Brittle | Volume conserved.
M2: Stretching a steel bar (ν = 0.3) by 0.1% makes its diameter: | Shrink by 0.03% | Grow by 0.03% | Shrink by 0.1% | Unchanged | Lateral strain = −νε.

## Elastic energy
S: Work done deforming a material elastically is stored as elastic potential energy, released when it springs back. It powers bows, springs, catapults and trampolines, and stored strain energy drives fractures and earthquakes.
H: Formulas
E: E = ½Fx = ½kx^{2} :: spring
E: u = ½σε = σ^{2}/(2E) :: energy per unit volume
- Area under a force–extension graph = work done.
- If loading and unloading curves differ (hysteresis), the enclosed area is energy dissipated as heat (rubber gets warm when repeatedly stretched).
H: Resilience and toughness
- **Resilience**: energy stored per volume up to the elastic limit: σ_{y}^{2}/(2E). Spring steel is designed for high resilience.
- **Toughness**: total energy absorbed before fracture (area under the whole curve).
H: Earthquakes
P: Plates lock at faults and strain energy builds for decades. When the stress exceeds friction, the fault slips, releasing the energy as seismic waves. Each step of 1 in magnitude is about 32 times more energy.
X: A spring (k = 800 N m^{-1}) is compressed 5 cm. Find the energy stored and the launch speed of a 20 g ball.
> E = ½ × 800 × 0.0025 = 1.0 J
> v = √(2 × 1.0/0.02) = 10 m s^{-1} (ignoring the spring's own mass)
!: Energy stored isn't F × x but ½Fx, because the force grows from zero as the spring stretches.
Q: What is the elastic energy per unit volume? | ½σε = σ^{2}/(2E).
Q: What does the area of a hysteresis loop represent? | Energy dissipated per cycle as heat.
M1: Doubling a spring's extension multiplies its stored energy by: | 4 | 2 | 8 | √2 | ∝ x^{2}.
M2: Toughness is: | Energy absorbed per volume before fracture | Stiffness | Yield stress | Hardness | Area under the entire stress–strain curve.

## Bending and torsion
S: When a beam bends, one side stretches and the other compresses, with a neutral axis between. When a shaft twists, shear stress grows from the centre outward. Both explain why I-beams and hollow tubes are efficient.
H: Bending
E: σ = My/I :: bending stress at distance y from the neutral axis; I = second moment of area
E: M = EI/R :: bending moment and radius of curvature
- I for a rectangle (width b, depth h): bh^{3}/12. Depth matters most: a plank on edge is far stiffer.
- I-beams put material far from the neutral axis, where it carries most stress.
H: Torsion
E: τ = Tr/J; T/J = Gφ/L :: J = polar moment (πr^{4}/2 solid cylinder)
- Hollow tubes are almost as stiff in torsion as solid rods of the same outer diameter, but much lighter (bicycle frames, drive shafts, bones).
X: Compare the bending stiffness of a 10 × 2 cm plank laid flat and on edge.
> Flat: I = 10 × 2^{3}/12 = 6.7 cm^{4}; on edge: 2 × 10^{3}/12 = 167 cm^{4}
> On edge is 25 times stiffer
!: The second moment of area (geometry) and Young's modulus (material) both matter; changing shape is often cheaper than changing material.
Q: Why are I-beams efficient? | They place most material far from the neutral axis, maximising I for their mass.
Q: Where is the stress largest in a twisted solid shaft? | At the outer surface.
M1: Doubling a rectangular beam's depth multiplies its bending stiffness by: | 8 | 2 | 4 | 16 | I ∝ h^{3}.
M2: Bones are hollow because: | Hollow tubes give high bending and torsional stiffness for little mass | Marrow needs room only | They're weaker that way | It reduces blood flow | Material at the centre contributes little.

## Beam deflection
S: Engineers predict how much beams sag under loads using the Euler–Bernoulli beam equation. Deflection depends strongly on span: doubling it can increase sag sixteen-fold.
H: Beam equation
E: EI d^{4}y/dx^{4} = w(x) :: w = load per unit length
E: EI d^{2}y/dx^{2} = M(x)
H: Standard results
E: δ = FL^{3}/(3EI) :: cantilever, point load at the free end
E: δ = FL^{3}/(48EI) :: simply supported, central point load
E: δ = 5wL^{4}/(384EI) :: simply supported, uniform load
- Boundary conditions: clamped (y = 0, y′ = 0), pinned (y = 0, M = 0), free (M = 0, shear = 0).
H: Uses
- Diving boards, floor joists, aircraft wings, bookshelf sag.
- Cantilever deflection measures forces in AFM microscopes (piconewtons) and in MEMS sensors.
X: A 2 m shelf (simply supported) of E = 10 GPa, b = 0.25 m, h = 0.02 m carries 300 N spread evenly. Sag?
> I = 0.25 × 0.02^{3}/12 = 1.67 × 10^{-7} m^{4}; w = 150 N m^{-1}
> δ = 5 × 150 × 16/(384 × 10^{10} × 1.67 × 10^{-7}) = 1.9 cm
!: Beam theory assumes small deflections and slender beams; deep, short beams need shear corrections (Timoshenko theory).
Q: How does a cantilever's tip deflection depend on its length? | ∝ L^{3} for a point load at the tip.
Q: How do atomic force microscopes measure forces? | From the tiny deflection of a cantilever, F = kδ.
M1: Doubling the span of a uniformly loaded beam increases sag by: | 16 | 4 | 8 | 2 | ∝ L^{4}.
M2: At a clamped end, a beam has: | Zero deflection and zero slope | Zero moment | Free rotation | Maximum deflection | Built-in support.

## Pressure and material deformation
S: Materials under pressure compress, and their structure can change: pressure vessels must contain it safely, rocks deep in the Earth deform plastically, and high-pressure physics creates new phases like metallic hydrogen.
H: Pressure vessels
E: σ_{hoop} = pr/t; σ_{axial} = pr/(2t) :: thin-walled cylinder
E: σ = pr/(2t) :: thin-walled sphere
- Hoop stress is twice axial: overpressured pipes and sausages split lengthwise.
- Spheres are the most efficient shape for pressure tanks.
H: High-pressure physics
- Diamond anvil cells reach > 300 GPa (above Earth's core pressure, 360 GPa).
- Pressure-induced phase changes: graphite → diamond; ice has 19+ crystal phases.
- Earth's inner core is solid iron though hotter than the Sun's surface, because pressure raises the melting point.
- Room-temperature superconductivity has been sought in compressed hydrides.
X: A gas cylinder (r = 0.1 m, t = 5 mm) holds 20 MPa. Find the hoop stress.
> σ = 20 × 10^{6} × 0.1/0.005 = 400 MPa: needs high-strength steel
!: Thin-wall formulas only work when t ≪ r; thick-walled vessels need the Lamé equations.
Q: Why do pressurised pipes split along their length? | The hoop stress is twice the axial stress.
Q: Why is Earth's inner core solid? | The enormous pressure raises iron's melting point above the core temperature.
M1: For a thin sphere and cylinder of the same r, t and p, the sphere's stress is: | Half the cylinder's hoop stress | Twice | Equal | Zero | pr/2t vs pr/t.
M2: Diamond anvil cells are used to: | Create extremely high static pressures | Cut diamonds | Measure temperature | Store hydrogen | Small diamond tips concentrate force.

## Fracture and failure
S: Materials fail by yielding (permanent deformation), fracture (cracking apart), buckling (sudden instability under compression) or fatigue. Real materials break far below their theoretical strength because of tiny flaws that concentrate stress.
H: Stress concentration
E: σ_{max} ≈ σ(1 + 2√(a/ρ)) :: crack of length a, tip radius ρ (Inglis)
- Sharp corners and cracks concentrate stress; rounded windows (after the de Havilland Comet disasters), drilled crack-stop holes.
H: Griffith's theory
E: σ_{f} = √(2Eγ_{s}/(πa)) :: brittle fracture stress for a crack of length a
- A crack grows when the elastic energy released exceeds the energy needed to create new surfaces.
- Glass fibres are strong because they have few, tiny flaws; scratching glass makes it easy to snap.
H: Buckling
E: F_{cr} = π^{2}EI/(KL)^{2} :: Euler buckling load for a slender column
- Long thin columns fail by buckling well below their crushing strength.
X: Why does scoring glass let it snap cleanly?
> The score is a crack of known position; σ_{f} ∝ 1/√a
> A deeper, sharper crack lowers the fracture stress there, so it breaks along the line
!: Strength in tension and compression differ hugely for brittle materials: concrete is ~10 times stronger in compression, hence steel reinforcement.
Q: Why are real materials weaker than theory predicts? | Flaws and cracks concentrate stress.
Q: What does the Euler buckling formula predict? | The critical compressive load at which a slender column buckles, ∝ EI/L^{2}.
M1: Aircraft windows have rounded corners to: | Reduce stress concentration | Improve the view | Save weight | Let in more light | Sharp corners concentrate stress.
M2: Doubling a slender column's length changes its buckling load by: | ×1/4 | ×1/2 | ×2 | ×4 | ∝ 1/L^{2}.

## Viscoelasticity
S: Viscoelastic materials behave partly like elastic solids and partly like viscous fluids: their response depends on how fast and how long you load them. Polymers, biological tissues, asphalt and the Earth's mantle are viscoelastic.
H: Behaviours
- **Creep**: under constant stress, strain slowly increases.
- **Stress relaxation**: under constant strain, stress slowly decreases.
- **Hysteresis**: energy lost each loading cycle (damping).
- **Rate dependence**: stiffer when loaded quickly.
H: Simple models
- **Maxwell**: spring and dashpot in series: relaxes stress, flows forever under load (τ = η/E).
- **Kelvin–Voigt**: spring and dashpot in parallel: creeps to a limit, no instant strain.
- **Standard linear solid**: combines both.
H: Examples
P: Silly putty bounces (fast loading, elastic) but flows into a puddle over hours. The pitch-drop experiment (Queensland, since 1927) has dropped nine times. The mantle is solid to seismic waves but flows at cm per year over millions of years, driving plate tectonics.
X: A material with E = 1 MPa and η = 10^{6} Pa s (Maxwell). What is its relaxation time?
> τ = η/E = 1 s: stress falls to 1/e in about a second at fixed strain
!: Whether a material counts as "solid" or "liquid" depends on the timescale compared with its relaxation time (the Deborah number).
Q: What is creep? | Gradual increase of strain under constant stress.
Q: Why does the mantle behave as a solid for earthquakes but a fluid for plate tectonics? | Its relaxation time is long: short loading gives an elastic response, long loading lets it flow.
M1: Which is a viscoelastic material? | Silly putty | Steel at room temperature | Water | Diamond | Elastic bounce, viscous flow.
M2: The Maxwell model consists of a spring and dashpot in: | Series | Parallel | Neither | Rotation | It relaxes stress completely.

## Crystal elasticity
S: In crystals, elastic properties depend on direction because atoms are arranged in regular lattices. Full description needs the elastic stiffness tensor, which crystal symmetry reduces from 81 to as few as 3 independent constants.
H: Generalised Hooke's law
E: σ_{ij} = C_{ijkl}ε_{kl}
- Symmetry reduces 81 components to 21 for the least symmetric (triclinic) crystal.
- Cubic crystals: 3 constants (C_{11}, C_{12}, C_{44}).
- Isotropic: 2 constants (e.g. E and ν).
- Voigt notation writes stresses and strains as 6-vectors and C as a 6 × 6 matrix.
H: Anisotropy in practice
- Single-crystal turbine blades are grown with their stiffest, strongest direction along the blade.
- Silicon wafers' stiffness varies with direction (130–188 GPa), affecting MEMS design.
- Polycrystals with random grains look isotropic on average.
- Wood is strongly anisotropic: stiff along the grain, weak across it.
X: Why does a single-crystal iron sample have different Young's moduli along [100] and [111]?
> Bond geometry differs between directions
> E ≈ 132 GPa along [100], ~283 GPa along [111]
!: Isotropic formulas (like G = E/2(1 + ν)) don't apply to single crystals.
Q: How many independent elastic constants does a cubic crystal have? | Three.
Q: Why do polycrystalline metals appear isotropic? | Many randomly oriented grains average out the directional differences.
M1: An isotropic material needs how many independent elastic constants? | 2 | 1 | 3 | 21 | e.g. E and ν.
M2: Turbine blades are grown as single crystals mainly to: | Remove grain boundaries that weaken them at high temperature | Make them lighter | Reduce cost | Increase conductivity | Grain boundaries enable creep.

## Mechanical waves in solids
S: Solids carry several kinds of elastic wave: compressional (P), shear (S) and surface waves. Their speeds depend on the elastic moduli and density, which is how seismology maps Earth's interior and ultrasound inspects materials.
H: Wave speeds
E: v_{P} = √((K + 4G/3)/ρ) :: longitudinal (P-wave)
E: v_{S} = √(G/ρ) :: shear (S-wave)
E: v = √(E/ρ) :: longitudinal wave in a thin rod
- P-waves are always faster than S-waves; S-waves can't pass through fluids.
- Surface waves: Rayleigh (rolling) and Love (horizontal shear): slowest but most destructive in earthquakes.
H: Applications
- **Seismology**: S-wave shadow showed Earth's outer core is liquid; P-wave refraction found the inner core (Lehmann, 1936).
- **Earthquake location**: the S–P arrival gap gives distance (~8 km per second of delay).
- **Ultrasonic testing**: echoes from cracks in welds and rails.
- **Phonons**: quantised lattice vibrations carry heat and sound in crystals.
X: Find the longitudinal speed in a steel rod (E = 200 GPa, ρ = 7850 kg m^{-3}).
> v = √(2 × 10^{11}/7850) = 5050 m s^{-1}
!: The speed of sound in a bulk solid (P-wave) is higher than in a thin rod of the same material, because the bulk can't contract sideways.
Q: Why can't S-waves pass through Earth's outer core? | It's liquid, and liquids have zero shear modulus.
Q: How is the distance to an earthquake found? | From the delay between P- and S-wave arrivals.
M1: Which seismic waves arrive first? | P-waves | S-waves | Love waves | Rayleigh waves | Fastest.
M2: Phonons are: | Quantised lattice vibrations | Photons in solids | Electrons | Defects | Quanta of sound in crystals.

## Stress tensors
S: Stress inside a material can't be described by a single number: the force on a small surface depends on the surface's orientation. The stress tensor σ_{ij} captures it fully: the i-component of force per area on a surface whose normal is along j.
H: The tensor
E: t_{i} = σ_{ij}n_{j} :: traction (force per area) on a surface with normal n (Cauchy)
- Diagonal elements: normal stresses. Off-diagonal: shear stresses.
- Symmetric (σ_{ij} = σ_{ji}) from angular momentum balance: 6 independent components.
- Hydrostatic pressure: σ_{ij} = −pδ_{ij}.
H: Principal stresses
P: Rotating axes can make the tensor diagonal: the principal stresses σ_{1}, σ_{2}, σ_{3} along principal directions, where there's no shear. Failure criteria use them: von Mises (yielding of ductile metals) and Tresca (maximum shear) predict when combined stresses cause yielding. Mohr's circle visualises the transformation in 2D.
X: A plate has σ_{xx} = 80 MPa, σ_{yy} = 20 MPa, σ_{xy} = 40 MPa. Find the principal stresses.
> Centre (80 + 20)/2 = 50; radius √(30^{2} + 40^{2}) = 50
> σ_{1} = 100 MPa, σ_{2} = 0; maximum shear 50 MPa
!: A uniaxial tension still produces shear stress on planes at 45°: that's why ductile metals fail along 45° slip planes.
Q: What does σ_{ij} mean? | The i-component of force per unit area on a surface whose normal points along j.
Q: Why is the stress tensor symmetric? | Otherwise a small element would have unbalanced torque and infinite angular acceleration.
M1: How many independent components does the stress tensor have? | 6 | 9 | 3 | 81 | Symmetric 3 × 3.
M2: Principal stresses are found where: | Shear stresses are zero | Normal stresses are zero | All stresses are equal | The material yields | Eigenvalues of the tensor.

## Continuum mechanics
S: Continuum mechanics treats solids and fluids as continuous media described by fields (density, velocity, stress, strain) instead of individual atoms. It provides the general framework from which elasticity, fluid dynamics and plasticity all follow.
H: The continuum hypothesis
- Valid when the length scale of interest is much bigger than atomic or molecular spacing (or the mean free path).
- Fails in nanoscale devices and rarefied gases, where atomistic or kinetic models are needed.
H: The ingredients
- **Kinematics**: displacement u(x, t), strain ε_{ij} = ½(∂u_{i}/∂x_{j} + ∂u_{j}/∂x_{i}) (small strain).
- **Balance laws**: mass, linear momentum (ρ Dv/Dt = ∇·σ + ρb), angular momentum (σ symmetric), energy.
- **Constitutive laws**: material-specific relations (Hookean solid, Newtonian fluid, plastic, viscoelastic).
- Boundary and initial conditions.
H: Solving
P: Except in simple cases, continuum problems are solved by the finite element method: the body is divided into elements, displacements are approximated in each, and equilibrium is solved as a large matrix problem. FEA designs everything from bridges to hip implants.
X: The equation of linear elastodynamics, ρ ü = (λ + μ)∇(∇·u) + μ∇^{2}u, contains two wave types.
> Taking the divergence gives P-waves at speed √((λ + 2μ)/ρ)
> Taking the curl gives S-waves at √(μ/ρ)
!: Balance laws are universal; constitutive laws are not. Most modelling errors come from the wrong material model, not the physics of conservation.
Q: What is the continuum hypothesis? | Matter is treated as continuous, with smoothly varying fields, at scales much larger than atomic.
Q: What does a constitutive law describe? | How a specific material responds: the relation between stress and strain or strain rate.
M1: The finite element method is used to: | Solve continuum problems numerically | Measure stress | Make materials | Count atoms | Discretised PDEs.
M2: Which equation is universal for all continua? | Conservation of momentum | Hooke's law | Newtonian viscosity | Poiseuille's law | Balance laws apply to all materials.

## Material stability
S: A structure or material is stable if small disturbances die away and unstable if they grow. Buckling, necking, snap-through and phase transitions under load are stability problems, often failing suddenly without warning.
H: Structural instabilities
- **Buckling** of columns and thin shells (cans, submarine hulls).
- **Snap-through** of curved panels and bistable structures (hair clips, Venus flytraps).
- **Lateral–torsional buckling** of slender beams.
H: Material instabilities
- **Necking** in tension: once strain hardening can't compensate for area loss, deformation localises (Considère criterion: dσ/dε = σ).
- **Shear banding** in metals and soils.
- **Strain softening** leading to localisation and fracture.
H: Energy view
P: Stable equilibrium is a minimum of potential energy. As the load rises, the minimum can flatten (second derivative → 0) and disappear: the structure jumps to a new state. Real structures with imperfections buckle below the ideal load, which is why safety factors and imperfection-sensitivity analysis matter.
X: Why does a soft drink can crush suddenly when you stand on it?
> Thin cylindrical shells are highly imperfection-sensitive
> A dent lowers the buckling load drastically; it collapses rapidly into a folded pattern
!: Linear analysis predicts buckling loads but not post-buckling behaviour; some structures (shells) collapse catastrophically, others (plates) carry more load after buckling.
Q: What is the Considère criterion? | Necking begins when the slope of the true stress–strain curve equals the true stress.
Q: Why do real shells buckle below their theoretical load? | Small imperfections greatly reduce the critical load.
M1: Stable equilibrium corresponds to: | A minimum of potential energy | A maximum | A saddle point | Zero energy | Small disturbances return.
M2: A bistable hair clip that clicks between two shapes is an example of: | Snap-through instability | Creep | Fatigue | Viscoelasticity | Jumps between two energy minima.

## Fatigue and fracture mechanics
S: Repeated loading well below a material's strength can grow microscopic cracks until a part fails: fatigue causes most mechanical failures. Fracture mechanics predicts how cracks grow and when they become critical.
H: Fatigue
- S–N curve: stress amplitude vs number of cycles to failure.
- Steels have an endurance limit (no failure below it); aluminium alloys don't, so aircraft parts have finite lives.
- Cracks start at surface flaws, holes and corners; beach marks on the fracture surface record growth.
H: Fracture mechanics
E: K = Yσ√(πa) :: stress intensity factor
E: K ≥ K_{IC} ⇒ fast fracture :: fracture toughness (steel ~50 MPa √m; glass ~0.7)
E: da/dN = C(ΔK)^{m} :: Paris law for fatigue crack growth
H: Engineering practice
P: Damage-tolerant design assumes cracks exist. Regular inspection (ultrasound, eddy currents, dye penetrant) finds them before they reach critical length. This approach followed the Comet airliner disasters (1954), caused by fatigue cracks at window corners.
X: A steel plate (K_{IC} = 50 MPa √m) has an edge crack, Y ≈ 1.12, under 200 MPa. Critical crack length?
> a_{c} = (K_{IC}/(Yσ))^{2}/π = (50/224)^{2}/π
> a_{c} ≈ 16 mm
!: A part can pass a static strength test and still fail by fatigue in service: cycles, not peak load, matter.
Q: What is the endurance limit? | The stress amplitude below which a material (like steel) can survive indefinitely many cycles.
Q: What does fracture toughness K_{IC} measure? | A material's resistance to fast crack propagation.
M1: Fatigue failure is caused by: | Repeated cyclic loading | A single overload | Corrosion only | High temperature only | Cracks grow cycle by cycle.
M2: Doubling the crack length changes the stress intensity factor by: | ×√2 | ×2 | ×4 | ×1/2 | K ∝ √a.
`;
