// Unit 9: Elasticity and Solid Mechanics. Format: kit/course/notes.js
export default `
## Stress and strain
S: Stress is the internal force per unit area in a material; strain is the fractional deformation it produces. Describing materials by stress and strain, rather than force and extension, makes results independent of the sample's size.
LV: Introductory · Foundation
O: Define tensile, compressive and shear stress and strain
O: Read a stress–strain curve: limit of proportionality, yield point, ultimate tensile strength
PRE: Density and pressure
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
T: Stress | σ = F/A, internal force per unit area, in pascals
T: Strain | ε = ΔL/L, fractional change in length, dimensionless
T: Ultimate tensile strength | The maximum stress a material can withstand before it necks and breaks
SUM: Stress causes strain; their ratio in the linear region is an elastic modulus.
SUM: Brittle materials break with little strain; ductile ones yield and stretch a lot first.
SRC: OpenStax, University Physics Volume 1, section 12.3 "Stress, Strain, and Elastic Modulus" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/12-3-stress-strain-and-elastic-modulus
SRC: Callister W. D., Rethwisch D. G., Materials Science and Engineering: An Introduction, 10th edition, chapter 6, Wiley | secondary | 2018
EV: established | Standard definitions; measured curves vary with temperature and strain rate.
Q: What is the unit of strain? | None: it is a ratio of two lengths.
M3@2,3: A 2.0 m steel wire of 1.0 mm^{2} cross-section carries 200 N and stretches 2.0 mm. What are the stress and strain? | 2.0 × 10^{8} Pa and 1.0 × 10^{-3} | 200 Pa and 2.0 × 10^{-3}, using mm^{2} as m^{2} | 2.0 × 10^{5} Pa and 1.0 × 10^{-3}, using cm^{2} | 2.0 × 10^{8} Pa and 2.0, from mm per m | σ = 200/(1.0 × 10^{-6}) = 2.0 × 10^{8} Pa; ε = 0.0020/2.0 = 1.0 × 10^{-3}.
SA2@2: Describe how a stress–strain curve for copper differs from one for glass, and explain what this means in use. | Copper is ductile: a straight elastic region, a yield point, then a long region of plastic strain with work hardening before necking and fracture. Glass is brittle: it is elastic almost until it fractures, with no plastic region. So copper bends and warns before failing, while glass snaps suddenly. | copper: elastic then long plastic region ; glass: elastic to fracture ; ductile vs brittle ; copper deforms before failing, glass snaps

## Young's modulus
S: Young's modulus is the ratio of tensile stress to tensile strain in the linear elastic region. It measures a material's stiffness: how hard it is to stretch, regardless of how strong it is.
LV: Introductory · Application
O: Calculate Young's modulus from measurements of a wire
O: Compare the stiffness of common materials
PRE: Stress and strain
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
T: Young's modulus | E = σ/ε in the linear elastic region, in pascals
T: Stiffness | Resistance to elastic deformation; for a wire k = EA/L
SUM: E = FL/(AΔL); steel ≈ 200 GPa, aluminium ≈ 70 GPa, rubber ~0.01–0.1 GPa.
SUM: Stiffness is not strength: glass is stiff but brittle; rubber is weak in stiffness but stretchy.
SRC: OpenStax, University Physics Volume 1, section 12.3 "Stress, Strain, and Elastic Modulus" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/12-3-stress-strain-and-elastic-modulus
SRC: Ashby M. F., Jones D. R. H., Engineering Materials 1, 4th edition, chapter 3, Butterworth-Heinemann | secondary | 2012
EV: established | Values quoted are typical; alloys and processing change them.
Q: Why is a long thin wire used to measure Young's modulus? | Long length gives a measurable extension; a small area gives a large stress for a modest load.
M3@2,3: An aluminium rod (E = 70 GPa) 1.0 m long with area 1.0 cm^{2} carries 7.0 kN. How much does it stretch? | 1.0 mm | 0.10 mm, using 10 cm^{2} | 10 mm, using 0.1 cm^{2} | 1.0 m, using E in kPa | ΔL = FL/(AE) = 7000 × 1.0/(1.0 × 10^{-4} × 7.0 × 10^{10}) = 1.0 × 10^{-3} m.
SA2@1,2: In a Young's modulus experiment the wire diameter is measured with a micrometer at several points. Explain why the diameter matters so much. | E = FL/(AΔL) with A = πd^{2}/4, so the relative uncertainty in d counts twice. The diameter is small (around 0.3 mm), so a small absolute error is a large percentage; measuring at several points and orientations and averaging reduces it and checks for non-uniformity. | A depends on d^{2} ; d's relative uncertainty doubles ; small d gives large relative error ; average several readings

## Shear modulus
S: The shear (rigidity) modulus relates shear stress to shear strain: how a material resists being skewed. It governs torsion of shafts, the speed of S-waves in rock and the twisting of springs.
LV: Intermediate · Foundation
O: Define shear stress, shear strain and the shear modulus
O: Relate the shear modulus to torsion of shafts and S-wave speed
PRE: Young's modulus
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
T: Shear stress | τ = F/A with the force parallel to the surface
T: Shear strain | γ, the angle of skew (in radians) produced by shear stress
T: Shear modulus | G = τ/γ
SUM: For isotropic materials G = E/(2(1 + ν)); for steel G ≈ 80 GPa.
SUM: Fluids have no shear modulus: they flow under any shear stress, so S-waves can't cross them.
SRC: OpenStax, University Physics Volume 1, section 12.3 "Stress, Strain, and Elastic Modulus" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/12-3-stress-strain-and-elastic-modulus
SRC: Landau L. D., Lifshitz E. M., Theory of Elasticity, 3rd edition, Pergamon | secondary | 1986
EV: established | Standard linear elasticity for isotropic materials.
Q: Why can't seismic S-waves travel through Earth's outer core? | It is liquid, with zero shear modulus.
M3@2,3: A material has E = 210 GPa and Poisson's ratio 0.30. What is its shear modulus? | About 81 GPa | About 105 GPa, from E/2 | About 160 GPa, from E/1.3 | About 300 GPa, from E/0.7 | G = E/(2(1 + ν)) = 210/2.6 ≈ 81 GPa.
SA2@1: A rubber block 5.0 cm thick is sheared so its top moves 1.0 mm sideways under a stress of 2.0 × 10^{4} Pa. Find its shear modulus. | γ = 1.0/50 = 0.020 rad. G = τ/γ = 2.0 × 10^{4}/0.020 = 1.0 × 10^{6} Pa. | shear strain = displacement/thickness ; γ = 0.020 ; G = τ/γ ; 1.0 MPa

## Bulk modulus
S: The bulk modulus measures resistance to uniform compression: the pressure needed per fractional change in volume. It sets the speed of sound in fluids and how much the ocean, rocks and stars compress.
LV: Intermediate · Foundation
O: Define the bulk modulus and compressibility
O: Use the bulk modulus to find volume changes under pressure and sound speeds
PRE: Shear modulus
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
T: Bulk modulus | K = −Δp/(ΔV/V), resistance to uniform compression
T: Compressibility | 1/K, the fractional volume change per unit pressure
SUM: Water K ≈ 2.2 GPa; steel ≈ 160 GPa; air at constant temperature ≈ 0.1 MPa (about 0.14 MPa adiabatically).
SUM: For isotropic materials K = E/(3(1 − 2ν)); K → ∞ as ν → 0.5 (incompressible).
SRC: OpenStax, University Physics Volume 1, section 12.3 "Stress, Strain, and Elastic Modulus" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/12-3-stress-strain-and-elastic-modulus
SRC: Callister W. D., Rethwisch D. G., Materials Science and Engineering: An Introduction, 10th edition, Wiley | secondary | 2018
EV: established | Standard elasticity; gas values depend on whether compression is isothermal or adiabatic.
Q: What does a high bulk modulus mean? | The material is hard to compress.
M3@2,3: By how much does 1.0 m^{3} of water shrink at the deepest ocean floor (about 1.1 × 10^{8} Pa, K = 2.2 × 10^{9} Pa)? | About 5%, 0.05 m^{3} | About 0.5%, 0.005 m^{3} | About 50%, 0.5 m^{3} | It doesn't shrink at all | ΔV/V = −Δp/K = 1.1 × 10^{8}/2.2 × 10^{9} = 0.05 (in reality K rises with pressure, so it's slightly less).
SA2@1,2: Explain why liquids are usually treated as incompressible in hydraulics, while gases aren't. | Liquids have bulk moduli of order 10^{9} Pa, so ordinary pressure changes of 10^{5}–10^{6} Pa change their volume by well under 0.1%. Gases have bulk moduli about equal to their pressure, around 10^{5} Pa, so similar pressure changes alter their volume enormously. | liquid K about 10^{9} Pa ; tiny fractional volume change ; gas K comparable to its pressure ; large volume change

## Hooke's law
S: Hooke's law states that extension is proportional to the applied force, up to a limit. It holds for springs and for small deformations of most solids, because interatomic forces near equilibrium behave like springs.
LV: Introductory · Foundation
O: State Hooke's law and identify its limit
O: Combine springs in series and parallel
PRE: Stress and strain
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
T: Hooke's law | F = kx: extension is proportional to force, up to the limit of proportionality
T: Limit of proportionality | The point beyond which extension is no longer proportional to force
T: Elastic limit | The largest load after which the material still returns to its original length
SUM: F = kx for springs; σ = Eε for materials: the same law at two scales.
SUM: Series: 1/k = Σ1/k_{i}; parallel: k = Σk_{i}.
SRC: Hooke R., Lectures de Potentia Restitutiva, or of Spring, London | primary | 1678
SRC: OpenStax, University Physics Volume 1, section 12.3 "Stress, Strain, and Elastic Modulus" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/12-3-stress-strain-and-elastic-modulus
EV: established | Hooke's law is an approximation valid for small strains.
Q: What is the gradient of a force–extension graph in the Hooke's law region? | The spring constant k.
M3@2,3: Two springs, 100 and 300 N m^{-1}, are joined end to end and loaded with 6.0 N. What is the total extension? | 8.0 cm | 1.5 cm, using 400 N m^{-1} | 6.0 cm, using 100 N m^{-1} only | 2.0 cm, using 300 N m^{-1} only | In series each carries 6.0 N: 6/100 + 6/300 = 0.060 + 0.020 = 0.080 m.
SA2@1: Explain why Hooke's law holds for small strains at the atomic level. | Atoms sit at the minimum of their interatomic potential energy. Near any smooth minimum the potential is approximately a parabola, U ≈ ½kx^{2}, so the restoring force is proportional to the displacement: F = −kx. Larger displacements reach the non-parabolic part of the curve and the law fails. | atoms at a potential minimum ; parabolic near the minimum ; force proportional to displacement ; fails at large strain

## Elastic and plastic deformation
S: Elastic deformation is reversible: atoms are displaced but return when the load is removed. Plastic deformation is permanent: planes of atoms slip past each other, carried by defects called dislocations.
LV: Introductory · Foundation
O: Distinguish elastic from plastic deformation at the atomic scale
O: Explain yielding by dislocation motion and work hardening
PRE: Hooke's law
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
T: Plastic deformation | Permanent deformation that remains after the load is removed
T: Dislocation | A line defect in a crystal whose motion lets planes slip at stresses far below the ideal strength
T: Work hardening | Strengthening of a metal by plastic deformation, as dislocations tangle
SUM: Elastic: bonds stretch and recover. Plastic: dislocations move, and atoms take new positions.
SUM: Unloading from the plastic region follows a line parallel to the elastic slope, leaving a permanent strain.
SRC: Callister W. D., Rethwisch D. G., Materials Science and Engineering: An Introduction, 10th edition, chapter 7, Wiley | secondary | 2018
SRC: Hull D., Bacon D. J., Introduction to Dislocations, 5th edition, Butterworth-Heinemann | secondary | 2011
EV: established | Dislocation theory explains why real metals yield at about 1/1000 of their ideal strength.
Q: Why do metals yield at much lower stress than calculated from bond strength? | Dislocations let planes of atoms slip one row at a time instead of all at once.
M3@2,3: A wire is stretched beyond its elastic limit, then unloaded. What happens? | It stays longer, as the unloading line runs parallel to the elastic line | It returns exactly to its original length, as all strain is elastic | It shortens below its original length, overshooting on the way back | It breaks as soon as the load is removed, releasing stored energy | Only the elastic part of the strain recovers; the plastic strain remains.
SA2@2: Explain why bending a paper clip back and forth makes it harder to bend at the same place, and then makes it snap. | Each bend causes plastic deformation, generating and tangling dislocations (work hardening), so the metal gets harder to deform there. It also becomes less ductile; repeated plastic cycles grow cracks until the wire fractures (low-cycle fatigue). | plastic deformation each bend ; dislocations multiply and tangle ; work hardening ; cracks grow until it snaps

## Poisson's ratio
S: When you stretch a material it usually gets thinner. Poisson's ratio is the ratio of the sideways contraction strain to the lengthwise extension strain, and it links the different elastic moduli.
LV: Intermediate · Foundation
O: Define Poisson's ratio and give typical values
O: Calculate sideways contraction and volume change under tension
PRE: Young's modulus
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
T: Poisson's ratio | ν = −ε_{lateral}/ε_{axial}
T: Auxetic material | One with negative Poisson's ratio, which gets fatter when stretched
SUM: Typical ν: metals about 0.3, rubber nearly 0.5, cork nearly 0; isotropic materials lie between −1 and 0.5.
SUM: Fractional volume change under small tension ≈ ε(1 − 2ν).
SRC: Greaves G. N., Greer A. L., Lakes R. S., Rouxel T., "Poisson's ratio and modern materials", Nature Materials 10, 823–837 | primary | 2011 | https://doi.org/10.1038/nmat3134
SRC: Gere J. M., Goodno B. J., Mechanics of Materials, 9th edition, Cengage | secondary | 2018
EV: established | Standard elasticity; the bounds −1 < ν < 0.5 apply to stable isotropic materials.
Q: Why is cork good for sealing wine bottles? | Its Poisson's ratio is near zero, so pushing it in doesn't make it bulge sideways.
M3@2,3: A steel bar (ν = 0.30) is stretched with axial strain 1.0 × 10^{-3}. What is its fractional volume change? | +4.0 × 10^{-4} | +1.0 × 10^{-3}, the axial strain | −6.0 × 10^{-4}, from twice the lateral strain | 0, since volume is conserved | ΔV/V ≈ ε(1 − 2ν) = 10^{-3} × 0.40 = 4.0 × 10^{-4}.
SA2@1,2: Explain why a material with Poisson's ratio 0.5 is incompressible. | ΔV/V ≈ ε(1 − 2ν). With ν = 0.5 this is zero: the sideways contraction exactly compensates the stretch, so volume never changes. Equivalently K = E/(3(1 − 2ν)) becomes infinite. Rubber is close to this. | ΔV/V = ε(1 − 2ν) ; zero at ν = 0.5 ; lateral contraction compensates ; K infinite

## Elastic energy
S: Work done deforming a material elastically is stored as elastic potential energy, released when it springs back. It powers bows, springs, catapults and trampolines, and stored strain energy drives fractures and earthquakes.
LV: Introductory · Application
O: Calculate elastic potential energy from force–extension graphs
O: Use energy per unit volume, ½σε
PRE: Hooke's law
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
T: Elastic potential energy | Energy stored by elastic deformation: ½Fx = ½kx^{2}
T: Strain energy density | Energy stored per unit volume: ½σε = σ^{2}/(2E)
T: Hysteresis | A loading–unloading loop whose area is energy lost as heat
SUM: Energy stored = area under the force–extension graph.
SUM: Rubber's hysteresis loop is why tyres warm up and bouncing balls lose height.
SRC: OpenStax, University Physics Volume 1, section 8.1 "Potential Energy of a System" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/8-1-potential-energy-of-a-system
SRC: Ashby M. F., Jones D. R. H., Engineering Materials 1, 4th edition, Butterworth-Heinemann | secondary | 2012
EV: established | Exact for linear elastic behaviour.
Q: What does the area inside a rubber band's loading–unloading loop represent? | Energy turned into heat in each cycle.
M3@2,3: A steel wire (E = 200 GPa) is at a stress of 400 MPa. How much energy is stored per cubic metre? | 4.0 × 10^{5} J m^{-3} | 8.0 × 10^{5} J m^{-3}, missing the ½ | 4.0 × 10^{2} J m^{-3}, using MPa | 2.0 × 10^{3} J m^{-3}, using σ/E | u = σ^{2}/(2E) = (4.0 × 10^{8})^{2}/(4.0 × 10^{11}) = 4.0 × 10^{5} J m^{-3}.
SA2@1: A bungee rope (k = 80 N m^{-1}) is stretched by 20 m at the lowest point. Find the energy stored and explain where it came from. | E = ½kx^{2} = ½ × 80 × 400 = 16 000 J. It came from the jumper's gravitational potential energy, lost as they fell; some is also lost as heat in the rope. | E = ½kx^{2} ; 16 kJ ; from gravitational potential energy ; some lost as heat

## Bending and torsion
S: When a beam bends, one side stretches and the other compresses, with a neutral axis between. When a shaft twists, shear stress grows from the centre outward. Both explain why I-beams and hollow tubes are efficient.
LV: Intermediate · Application
O: Use the bending equation σ = My/I to find stresses in a beam
O: Use the torsion formula to find shear stress and twist in a shaft
PRE: Shear modulus
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
T: Neutral axis | The line in a bent beam where there is neither tension nor compression
T: Second moment of area | I = ∫y^{2} dA, a section's resistance to bending
T: Polar second moment | J = ∫r^{2} dA, a section's resistance to twisting (πd^{4}/32 for a solid shaft)
SUM: Bending: σ = My/I, largest at the outer surfaces; I-beams put material far from the neutral axis.
SUM: Torsion: τ = Tr/J and twist angle θ = TL/(GJ).
SRC: Gere J. M., Goodno B. J., Mechanics of Materials, 9th edition, chapters 3 and 5, Cengage | secondary | 2018
SRC: Timoshenko S. P., Goodier J. N., Theory of Elasticity, 3rd edition, McGraw-Hill | secondary | 1970
EV: established | Exact within small-deflection linear elasticity for straight members.
Q: Why are I-beams shaped as they are? | Most of the material is in the flanges, far from the neutral axis, giving a large I for little mass.
M3@2,3: Doubling the depth of a rectangular beam (same width) changes its second moment of area by what factor? | 8 | 2 | 4 | 16 | I = bh^{3}/12, so doubling h multiplies I by 2^{3} = 8; the beam is eight times stiffer in bending.
SA2@2: A solid steel shaft of diameter 40 mm carries a torque of 500 N m. Find the maximum shear stress. | J = πd^{4}/32 = π × (0.040)^{4}/32 ≈ 2.51 × 10^{-7} m^{4}. τ_{max} = Tr/J = 500 × 0.020/2.51 × 10^{-7} ≈ 4.0 × 10^{7} Pa (40 MPa). | J = πd^{4}/32 ; r = 0.020 m ; τ = Tr/J ; about 40 MPa

## Beam deflection
S: Engineers predict how much beams sag under loads using the Euler–Bernoulli beam equation. Deflection depends strongly on span: doubling it can increase sag sixteen-fold.
LV: Intermediate · Application
O: Use standard results for the deflection of cantilevers and simply supported beams
O: Explain how deflection depends on length, load, E and I
PRE: Bending and torsion
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
T: Cantilever | A beam fixed at one end and free at the other
T: Flexural rigidity | EI, the product that sets a beam's resistance to bending
SUM: Cantilever with end load: δ = FL^{3}/(3EI). Simply supported, central load: δ = FL^{3}/(48EI).
SUM: Deflection ∝ L^{3}: doubling a span makes it eight times floppier under the same load.
SRC: Gere J. M., Goodno B. J., Mechanics of Materials, 9th edition, chapter 9, Cengage | secondary | 2018
SRC: Timoshenko S. P., Gere J. M., Mechanics of Materials, Van Nostrand | secondary | 1972
EV: established | Euler–Bernoulli beam theory is accurate for slender beams with small deflections.
Q: How does a cantilever's end deflection depend on its length? | As L^{3}.
M3@2,3: A diving board (cantilever) deflects 5.0 cm under a diver. If it were 20% longer with the same section, what would the deflection be? | About 8.6 cm | 6.0 cm, 20% more | 7.2 cm, 1.2^{2} times | 5.0 cm, unchanged | δ ∝ L^{3}: 1.2^{3} ≈ 1.73, so about 8.6 cm.
SA2@1,2: A steel cantilever (E = 200 GPa, I = 8.0 × 10^{-6} m^{4}) is 2.0 m long with a 1.0 kN end load. Find its end deflection. | δ = FL^{3}/(3EI) = 1000 × 8.0/(3 × 2.0 × 10^{11} × 8.0 × 10^{-6}) = 8000/4.8 × 10^{6} ≈ 1.7 × 10^{-3} m (1.7 mm). | δ = FL^{3}/(3EI) ; substitute ; L^{3} = 8.0 m^{3} ; about 1.7 mm

## Pressure and material deformation
S: Materials under pressure compress, and their structure can change: pressure vessels must contain it safely, rocks deep in the Earth deform plastically, and high-pressure physics creates new phases like metallic hydrogen.
LV: Intermediate · Foundation
O: Calculate hoop and longitudinal stresses in thin-walled pressure vessels
O: Describe how high pressure changes materials and phases
PRE: Bulk modulus
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
T: Hoop stress | σ_{h} = pr/t, the circumferential stress in a thin cylinder's wall
T: Longitudinal stress | σ_{l} = pr/(2t), along the axis of a closed cylinder
T: Diamond anvil cell | A device squeezing tiny samples between diamonds to hundreds of GPa
SUM: Hoop stress is twice the longitudinal stress, which is why sausages and pipes split lengthwise.
SUM: Very high pressures cause phase changes, such as graphite to diamond.
SRC: Gere J. M., Goodno B. J., Mechanics of Materials, 9th edition, chapter 8, Cengage | secondary | 2018
SRC: Jayaraman A., "Diamond anvil cell and high-pressure physical investigations", Reviews of Modern Physics 55, 65–108 | primary | 1983 | https://doi.org/10.1103/RevModPhys.55.65
EV: established | Thin-wall formulae apply for t much less than r.
Q: Why do overcooked sausages split along their length? | Hoop stress (pr/t) is twice the longitudinal stress.
M3@2,3: A gas cylinder of radius 0.10 m and wall 5.0 mm holds 20 MPa. What is the hoop stress? | 400 MPa | 200 MPa, the longitudinal stress | 20 MPa, the gas pressure | 4.0 MPa, from pt/r | σ_{h} = pr/t = 20 × 10^{6} × 0.10/0.0050 = 4.0 × 10^{8} Pa.
SA2@1,2: Explain why spherical tanks are often used for high-pressure gas. | In a thin sphere the wall stress is pr/(2t) in every direction, half the hoop stress of a cylinder of the same radius and thickness. So for the same pressure and stress limit a sphere needs half the wall thickness, saving material and mass. | sphere stress pr/(2t) ; half a cylinder's hoop stress ; same in all directions ; thinner wall needed

## Fracture and failure
S: Materials fail by yielding (permanent deformation), fracture (cracking apart), buckling (sudden instability under compression) or fatigue. Real materials break far below their theoretical strength because of tiny flaws that concentrate stress.
LV: Intermediate · Foundation
O: Describe the modes of failure: yielding, fracture, buckling and creep
O: Explain the Griffith criterion and why cracks weaken brittle materials
PRE: Elastic and plastic deformation
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
T: Stress concentration | Amplification of stress near a notch or crack tip
T: Griffith criterion | A crack grows when the elastic energy released exceeds the surface energy created
T: Buckling | Sudden sideways collapse of a slender member under compression; Euler load P = π^{2}EI/L^{2} for pinned ends
SUM: A sharp crack of length a concentrates stress by about 2√(a/ρ), where ρ is its tip radius.
SUM: Brittle fracture stress ∝ 1/√a: longer cracks fail at lower stress.
SRC: Griffith A. A., "The phenomena of rupture and flow in solids", Philosophical Transactions of the Royal Society A 221, 163–198 | primary | 1921 | https://doi.org/10.1098/rsta.1921.0006
SRC: Anderson T. L., Fracture Mechanics: Fundamentals and Applications, 4th edition, CRC Press | secondary | 2017
EV: established | Griffith's theory is the foundation of fracture mechanics.
Q: Why do aircraft windows have rounded corners? | Sharp corners concentrate stress and start cracks; rounding lowers the stress concentration.
M3@2,3: A brittle plate fails at 100 MPa with a 1.0 mm crack. At what stress would it fail with a 4.0 mm crack? | 50 MPa | 25 MPa, from 1/a | 100 MPa, unchanged | 200 MPa, from √a | σ_{f} ∝ 1/√a, so four times the crack length halves the failure stress.
SA2@2: Explain why scoring glass with a cutter lets it snap cleanly along the line. | The score is a sharp crack. When the glass is bent, stress concentrates at its tip far above the average stress. Glass is brittle, with no plastic yielding to blunt the tip, so the Griffith criterion is met there first and the crack runs along the score. | score acts as a crack ; stress concentrates at the tip ; brittle, no blunting ; crack propagates along the line

## Viscoelasticity
S: Viscoelastic materials behave partly like elastic solids and partly like viscous fluids: their response depends on how fast and how long you load them. Polymers, biological tissues, asphalt and the Earth's mantle are viscoelastic.
LV: Advanced · Foundation
O: Describe creep and stress relaxation in viscoelastic materials
O: Use the Maxwell and Kelvin–Voigt models
PRE: Viscosity
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
T: Viscoelastic | Showing both elastic (spring-like) and viscous (dashpot-like) response
T: Creep | Slow increase of strain under constant stress
T: Stress relaxation | Slow decrease of stress at constant strain
SUM: Maxwell model (spring and dashpot in series) relaxes stress with time constant η/E; Kelvin–Voigt (in parallel) creeps towards a limit.
SUM: Response depends on time scale: silly putty bounces when hit fast and flows when left.
SRC: Ferry J. D., Viscoelastic Properties of Polymers, 3rd edition, Wiley | secondary | 1980
SRC: Lakes R. S., Viscoelastic Materials, Cambridge University Press | secondary | 2009
EV: established | The simple models are idealisations; real materials need several time constants.
Q: Why does silly putty bounce but also flow into a puddle? | It behaves elastically on short time scales and viscously on long ones.
M3@2,3: A Maxwell material with E = 1.0 MPa and η = 1.0 × 10^{7} Pa s is held at fixed strain. How long until its stress falls to about 37%? | 10 s | 0.10 s | 1.0 × 10^{7} s | 1.0 s | The relaxation time is τ = η/E = 10^{7}/10^{6} = 10 s; stress falls to 1/e after one τ.
SA2@1,2: Explain why bookshelves made of particle board sag over months, though they hold the same books on day one. | Particle board is viscoelastic. Under the constant stress of the books it creeps: strain keeps increasing slowly with time as the binder resin and fibres deform viscously, so the sag grows long after loading. | constant load ; creep in a viscoelastic material ; strain grows with time ; resin and fibres flow slowly

## Crystal elasticity
S: In crystals, elastic properties depend on direction because atoms are arranged in regular lattices. Full description needs the elastic stiffness tensor, which crystal symmetry reduces from 81 to as few as 3 independent constants.
LV: Advanced · Foundation
O: Explain why elastic properties of crystals depend on direction
O: Describe the elastic constants of a cubic crystal
PRE: Shear modulus
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
T: Anisotropy | Dependence of a property on direction
T: Elastic stiffness tensor | C_{ijkl}, linking stress to strain: σ_{ij} = C_{ijkl}ε_{kl}
SUM: Cubic crystals need three independent constants (C_{11}, C_{12}, C_{44}); isotropic materials need two.
SUM: Polycrystals with random grain orientations average out to near-isotropic behaviour.
SRC: Nye J. F., Physical Properties of Crystals, Oxford University Press | secondary | 1985
SRC: Kittel C., Introduction to Solid State Physics, 8th edition, chapter 3, Wiley | secondary | 2005
EV: established | Standard crystal physics.
Q: How many independent elastic constants does an isotropic material have? | Two (for example E and ν).
M3@2,3: Which condition makes a cubic crystal elastically isotropic? | 2C_{44} = C_{11} − C_{12} (Zener ratio of 1) | C_{11} = C_{12}, so all normal constants match | C_{44} = 0, so shear has no stiffness | C_{11} = C_{12} = C_{44}, all three equal | The Zener anisotropy ratio A = 2C_{44}/(C_{11} − C_{12}) equals 1 for isotropy; tungsten is close to 1, copper about 3.2.
SA2@1: Explain why an ordinary steel bar behaves isotropically though each iron crystal in it is anisotropic. | The bar contains huge numbers of tiny crystal grains with random orientations. Their direction-dependent stiffnesses average out over any sizeable volume, so the bar's bulk properties are nearly the same in every direction. | many grains ; random orientations ; anisotropy averages out ; bulk isotropic

## Mechanical waves in solids
S: Solids carry several kinds of elastic wave: compressional (P), shear (S) and surface waves. Their speeds depend on the elastic moduli and density, which is how seismology maps Earth's interior and ultrasound inspects materials.
LV: Intermediate · Application
O: Distinguish P-waves, S-waves and surface waves
O: Calculate wave speeds from elastic moduli and density
PRE: Shear modulus
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
T: P-wave | A compressional (longitudinal) wave, the fastest seismic wave
T: S-wave | A shear (transverse) wave, which can't travel through liquids
T: Rayleigh wave | A surface wave with rolling motion, often the most damaging in earthquakes
SUM: Thin rod: v = √(E/ρ). Bulk solid: v_{P} = √((K + 4G/3)/ρ), v_{S} = √(G/ρ).
SUM: The S-wave shadow zone showed that Earth's outer core is liquid.
SRC: Shearer P. M., Introduction to Seismology, 3rd edition, Cambridge University Press | secondary | 2019
SRC: Kolsky H., Stress Waves in Solids, Dover | secondary | 1963
EV: established | Standard elastic wave theory, confirmed by seismology.
Q: Which seismic waves arrive first at a seismometer? | P-waves.
M3@2,3: What is the speed of sound along a thin steel rod (E = 200 GPa, ρ = 7900 kg m^{-3})? | About 5000 m s^{-1} | About 340 m s^{-1}, as in air | About 1500 m s^{-1}, as in water | About 2.5 × 10^{7} m s^{-1}, from E/ρ | v = √(E/ρ) = √(2.5 × 10^{7}) ≈ 5.0 × 10^{3} m s^{-1}.
SA2@2: A seismometer records P-waves 30 s before S-waves (v_{P} = 8.0 km s^{-1}, v_{S} = 4.5 km s^{-1}). Estimate the distance to the earthquake. | d/4.5 − d/8.0 = 30, so d(0.222 − 0.125) = 30 and d ≈ 310 km. | arrival-time difference equation ; d(1/v_{S} − 1/v_{P}) = 30 s ; solve ; about 310 km

## Stress tensors
S: Stress inside a material can't be described by a single number: the force on a small surface depends on the surface's orientation. The stress tensor σ_{ij} captures it fully: the i-component of force per area on a surface whose normal is along j.
LV: Advanced · Foundation
O: Represent the state of stress at a point by the stress tensor
O: Find principal stresses and use Mohr's circle
PRE: Tensor algebra
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
T: Stress tensor | σ_{ij}, the i-component of force per unit area on a surface with normal in the j-direction
T: Principal stresses | The eigenvalues of the stress tensor: normal stresses on planes with no shear
T: Mohr's circle | A graphical construction showing normal and shear stress on planes at every angle
SUM: The traction on a surface with normal n is t_{i} = σ_{ij}n_{j}; the tensor is symmetric.
SUM: Maximum shear stress is half the difference between the largest and smallest principal stresses.
SRC: Gere J. M., Goodno B. J., Mechanics of Materials, 9th edition, chapter 7, Cengage | secondary | 2018
SRC: Landau L. D., Lifshitz E. M., Theory of Elasticity, 3rd edition, Pergamon | secondary | 1986
EV: established | Exact continuum mechanics.
Q: Why is the stress tensor symmetric? | Otherwise a small element would feel a net torque and spin up infinitely fast as its size shrinks.
M3@2,3: A bar under uniaxial tension σ. What is the largest shear stress in it, and on which planes? | σ/2, on planes at 45° to the axis | σ, on planes perpendicular to the axis | 0, as the load is purely tensile | σ/√2, on planes at 30° to the axis | Principal stresses are σ, 0, 0; τ_{max} = (σ − 0)/2 on 45° planes, which is why ductile metals yield along 45° shear bands.
SA2@1,2: Explain why a single number isn't enough to describe stress inside a loaded solid. | The force per unit area on an internal surface depends on how the surface is oriented: one plane may feel pure tension, another shear. Describing all orientations needs nine components σ_{ij} (six independent), which together form a rank-2 tensor that gives the traction on any plane. | force per area depends on surface orientation ; normal and shear components ; nine components, six independent ; tensor gives traction on any plane

## Continuum mechanics
S: Continuum mechanics treats solids and fluids as continuous media described by fields (density, velocity, stress, strain) instead of individual atoms. It provides the general framework from which elasticity, fluid dynamics and plasticity all follow.
LV: Advanced · Foundation
O: Explain the continuum hypothesis and its limits
O: Write the general momentum balance (Cauchy's equation) for a continuum
PRE: Stress tensors
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
T: Continuum hypothesis | Treating matter as continuous, with fields defined at every point, ignoring atoms
T: Constitutive relation | A law linking stress to strain or strain rate for a material, such as Hooke's law or Newtonian viscosity
SUM: Cauchy's equation: ρ Dv/Dt = ∇·σ + f, for solids and fluids alike; the constitutive relation decides which.
SUM: The continuum fails when the scales of interest approach molecular sizes or mean free paths (Knudsen number not small).
SRC: Malvern L. E., Introduction to the Mechanics of a Continuous Medium, Prentice-Hall | secondary | 1969
SRC: Gurtin M. E., An Introduction to Continuum Mechanics, Academic Press | secondary | 1981
EV: established | The framework is exact given the continuum hypothesis; that hypothesis is an approximation.
Q: What turns Cauchy's general equation into the Navier–Stokes equation? | The Newtonian-fluid constitutive relation linking stress to strain rate.
M3@2,3: When does the continuum description of a gas break down? | When the mean free path is comparable to the size of the flow, as in very thin gas | When the gas flows faster than about 1 m s^{-1} through a pipe | When the gas is heated well above ordinary room temperature | When the container is larger than about a metre across | A Knudsen number Kn = λ/L near or above about 0.1 needs kinetic theory instead.
SA2@1,2: Explain how one equation, Cauchy's momentum balance, describes both steel and water. | Cauchy's equation, ρ Dv/Dt = ∇·σ + f, is Newton's second law for any continuum. What distinguishes materials is the constitutive relation: for elastic steel, stress depends on strain (Hooke's law); for water, stress depends on strain rate (Newtonian viscosity). Combining each gives the elastic wave equations or the Navier–Stokes equations. | Cauchy's equation applies to any continuum ; materials differ in constitutive relation ; steel: stress depends on strain ; water: stress depends on strain rate

## Material stability
S: A structure or material is stable if small disturbances die away and unstable if they grow. Buckling, necking, snap-through and phase transitions under load are stability problems, often failing suddenly without warning.
LV: Advanced · Foundation
O: Calculate the Euler buckling load of a slender column
O: Describe other instabilities: necking, snap-through and wrinkling
PRE: Beam deflection
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
T: Euler buckling load | P_{cr} = π^{2}EI/(KL)^{2}, the compressive load at which a slender column buckles
T: Necking | Local thinning of a bar under tension once it passes its ultimate tensile strength
T: Snap-through | Sudden jump of a curved shell or arch to an inverted shape
SUM: Buckling load ∝ 1/L^{2}: twice as long buckles at a quarter of the load.
SUM: Slender columns fail by buckling well below the stress that would crush the material.
SRC: Euler L., Methodus inveniendi lineas curvas maximi minimive proprietate gaudentes, appendix "De curvis elasticis", Lausanne | primary | 1744
SRC: Timoshenko S. P., Gere J. M., Theory of Elastic Stability, 2nd edition, McGraw-Hill | secondary | 1961
EV: established | Euler's formula is accurate for slender, straight, elastic columns; real columns with flaws buckle somewhat lower.
Q: Why does a drinking straw buckle long before it would crush? | It is slender: the buckling load π^{2}EI/L^{2} is far below the crushing load.
M3@2,3: A pinned column buckles at 40 kN. What is the buckling load if its length is halved? | 160 kN | 80 kN | 20 kN | 10 kN | P_{cr} ∝ 1/L^{2}: halving L multiplies the load by four.
SA2@1,2: Explain why a tensile test specimen necks and why the measured (engineering) stress then falls before it breaks. | Once strain hardening can no longer offset the shrinking cross-section, any slightly thinner region carries higher true stress, deforms more and thins further: a runaway local instability, the neck. The force needed falls, so engineering stress (force over original area) drops, although true stress in the neck still rises until fracture. | area reduction outpaces hardening ; local runaway thinning ; force falls ; engineering stress drops while true stress rises

## Fatigue and fracture mechanics
S: Repeated loading well below a material's strength can grow microscopic cracks until a part fails: fatigue causes most mechanical failures. Fracture mechanics predicts how cracks grow and when they become critical.
LV: Advanced · Application
O: Describe fatigue failure and read an S–N curve
O: Use the stress intensity factor and Paris's law for crack growth
PRE: Fracture and failure
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
T: Fatigue | Failure under repeated loading at stresses below the static strength
T: Stress intensity factor | K = Yσ√(πa), describing the stress field at a crack tip
T: Fracture toughness | K_{IC}, the stress intensity at which a crack grows unstably
SUM: Fracture when K reaches K_{IC}; fatigue cracks grow per cycle as da/dN = C(ΔK)^{m} (Paris's law).
SUM: Steels have an endurance limit below which fatigue life is very long; aluminium alloys don't.
SRC: Paris P., Erdogan F., "A critical analysis of crack propagation laws", Journal of Basic Engineering 85, 528–533 | primary | 1963 | https://doi.org/10.1115/1.3656900
SRC: Anderson T. L., Fracture Mechanics: Fundamentals and Applications, 4th edition, CRC Press | secondary | 2017
EV: established | Paris's law is empirical, accurate in the mid-range of crack growth rates.
Q: What is an S–N curve? | A plot of stress amplitude against the number of cycles to failure.
M3@2,3: In Paris's law with m = 3, doubling the stress range at the same crack length multiplies the crack growth rate by what? | 8 | 2 | 4 | 3 | ΔK ∝ Δσ, and da/dN ∝ ΔK^{3}, so 2^{3} = 8.
SA2@1,2: Explain why aircraft are inspected for cracks at regular intervals, using fracture mechanics. | Every flight is a load cycle that grows small fatigue cracks (Paris's law). A crack is safe until K = Yσ√(πa) reaches the fracture toughness, which sets a critical crack length. Inspections at intervals shorter than the time for a detectable crack to grow to that critical size let cracks be found and repaired first (damage tolerance). | cyclic loads grow cracks ; critical length from K_{IC} ; growth time calculable ; inspect before cracks become critical
`;
