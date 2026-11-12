// CreateGradify Design Thinking and Creativity, School 9: Mechanics of Materials. Reused from EngineerGradify Engineering School 4 (kit/courses/engineering/notes/u04.js)
// by scripts/borrow-school.mjs on 2026-11-12; question ids are this course's own. Review state as qa.js records.
// EngineerGradify Mechanics of Materials (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Normal stress and strain
LV: Year 1 · Foundation
S: Stress is internal force per unit area, and strain is deformation per unit length. This lesson defines normal stress and strain, explains tension and compression, and shows how to calculate both for axially loaded members.
O: Define normal stress and normal strain and their units
O: Calculate stress and strain in members under axial load
O: Distinguish engineering stress and strain from true stress and strain
PRE: Free-body diagrams
H: Stress
E: σ = F ÷ A :: normal stress = axial force ÷ cross-sectional area; units Pa (N/m^{2}), usually MPa (N/mm^{2})
P: **Tensile** stress stretches a member; **compressive** stress shortens it. Stress is found from the internal force at a section, obtained by cutting the member and applying equilibrium.
H: Strain
E: ε = δ ÷ L :: normal strain = change in length ÷ original length; dimensionless, often quoted in microstrain (με)
P: Strain is a ratio, so it has no units. A strain of 0.001 is 1,000 microstrain. Strain gauges bonded to a surface measure it directly.
X: A steel bar 20 mm × 10 mm in section and 500 mm long carries a tensile load of 30 kN; it stretches by 0.375 mm.
> Area A = 20 × 10 = 200 mm^{2}.
> Stress σ = 30,000 ÷ 200 = 150 N/mm^{2} = 150 MPa.
> Strain ε = 0.375 ÷ 500 = 0.00075 (750 microstrain).
> These values are used in the next lesson to find Young's modulus.
H: Engineering and true values
- **Engineering stress** uses the original area; **true stress** uses the actual, shrinking area.
- They differ little in the elastic range but greatly near fracture, when the specimen necks.
- Design normally uses engineering values with safety factors.
K: Normal stress is axial force per unit area (MPa = N/mm^{2}); normal strain is change in length over original length; both are found for each section of a member.
!: Mixing units. Using N with mm^{2} gives N/mm^{2}, which equals MPa; using N with m^{2} gives Pa. Keep units consistent throughout a calculation.
EV: established | Stress and strain definitions are the foundation of solid mechanics.
EV: established | Engineering stress is used in most design codes; true stress matters in plasticity and forming analyses.
T: Normal stress | Force per unit area acting perpendicular to a cross-section
T: Normal strain | Change in length divided by original length
T: Microstrain | One millionth of strain (10^{-6})
SUM: σ = F/A; ε = δ/L.
SUM: 1 N/mm^{2} = 1 MPa.
SUM: Engineering stress uses original area; true stress uses current area.
SRC: Gere J. M. and Goodno B. J., Mechanics of Materials, 9th edition (SI), Cengage | secondary | 2018
SRC: Hibbeler R. C., Mechanics of Materials, 10th edition in SI units, Pearson | secondary | 2018
Q: What are the units of stress? | Pascals (N/m^{2}); in engineering usually MPa, which equals N/mm^{2}.
Q: Why does strain have no units? | It is a ratio of two lengths.
M1#design-u09-15-q1@1: A 2,000 N force acts on an area of 40 mm^{2}. What is the stress? | 50 MPa | 80,000 MPa | 0.02 MPa | 2,040 MPa | Stress = F/A = 2,000 ÷ 40 = 50 N/mm^{2}, which is 50 MPa.
M2#design-u09-15-q2@2: A 2 m rod extends by 1.2 mm under load. What is the strain? | 0.0006 | 0.6 | 0.0024 | 1.67 | Strain = δ/L = 1.2 ÷ 2,000 = 0.0006, or 600 microstrain.
M3#design-u09-15-q3@3: A tensile test specimen necks before fracture. Why does engineering stress fall while true stress keeps rising? | Engineering stress uses the original area, but the actual area shrinks rapidly at the neck | The material becomes stronger as it necks | True stress ignores the cross-sectional area | The load increases sharply during necking | Engineering stress divides load by the original area; true stress uses the smaller, actual area.
NUM1#design-u09-15-q4@1: A bar with a cross-section of 200 mm^{2} carries a tensile load of 30 kN. What is the stress, in MPa? | 150 | 1% | MPa | σ = 30,000 N ÷ 200 mm^{2} = 150 N/mm^{2} = 150 MPa.
SA2#design-u09-15-q5@2,3: Explain why stress, rather than force, is used to judge whether a member will fail. | The same force produces different effects on members of different sizes: a thick bar resists more force than a thin one of the same material. Dividing force by area gives stress, which can be compared directly with the material's strength, such as its yield stress, regardless of member size. This allows designers to size members and apply safety factors consistently. | Force depends on size ; Stress normalises by area ; Comparison with material strength ; Design and safety factors

## Shear stress and strain
LV: Year 1 · Foundation
S: Shear stress acts parallel to a surface. This lesson defines shear stress and strain, analyses bolts and pins in single and double shear, and explains bearing stress in connections.
O: Define shear stress and shear strain
O: Calculate shear stress in bolts and pins in single and double shear
O: Calculate bearing stress in a connection
PRE: Normal stress and strain
H: Shear
E: τ = V ÷ A :: average shear stress = shear force ÷ area resisting it
E: γ = change in angle (radians) :: shear strain, the distortion of a right angle
P: Shear stress acts **parallel** to the area. In connections, bolts and pins resist the shear force across their cross-section.
H: Single and double shear
- **Single shear**: the bolt is sheared across one plane (two plates overlapping).
- **Double shear**: the bolt is sheared across two planes (a central plate between two outer plates); each plane carries half the force, so the stress halves.
- **Bearing stress**: the contact pressure between the bolt and the hole, σ_{b} = F ÷ (d × t), where d is bolt diameter and t is plate thickness.
X: A 16 mm diameter bolt carries 20 kN.
> Area = π × 16^{2} ÷ 4 = 201 mm^{2}.
> Single shear: τ = 20,000 ÷ 201 = 99.5 MPa.
> Double shear: each plane carries 10 kN, so τ = 49.7 MPa.
> Bearing on a 10 mm plate: σ_{b} = 20,000 ÷ (16 × 10) = 125 MPa.
K: Shear stress is force parallel to an area divided by that area; double shear halves the stress in a bolt; bearing stress checks the plate around the hole.
!: Forgetting double shear. If a bolt passes through three plates with the load shared across two planes, using the single-shear area doubles the calculated stress.
EV: established | Average shear stress formulas are standard for designing bolts, pins and rivets.
EV: established | Real shear stress across a section isn't uniform, so codes include factors beyond the average value.
T: Shear stress | Force per unit area acting parallel to a surface
T: Double shear | Loading in which a fastener is sheared across two planes
T: Bearing stress | Contact pressure between a fastener and the side of its hole
SUM: τ = V/A, parallel to the area.
SUM: Double shear halves the stress per plane.
SUM: Check bearing stress σ_{b} = F/(dt).
SRC: Gere J. M. and Goodno B. J., Mechanics of Materials, 9th edition (SI), Cengage | secondary | 2018
SRC: Hibbeler R. C., Mechanics of Materials, 10th edition in SI units, Pearson | secondary | 2018
Q: What is double shear? | Loading in which a pin or bolt is sheared across two planes, each carrying half the force.
Q: How is bearing stress calculated? | Force divided by bolt diameter times plate thickness.
M1#design-u09-16-q1@1: In which direction does shear stress act relative to the area? | Parallel to it | Perpendicular to it | At 45° to it | It has no direction | Shear stress acts in the plane of the area; normal stress acts perpendicular to it.
M2#design-u09-16-q2@2: A pin of area 100 mm^{2} in double shear carries 12 kN. What is the shear stress? | 60 MPa | 120 MPa | 1,200 MPa | 30 MPa | In double shear each plane carries 6 kN: τ = 6,000 ÷ 100 = 60 MPa.
M3#design-u09-16-q3@3: A bolt in a lap joint has acceptable shear stress, but the joint fails by the hole elongating. Which check was missed? | Bearing stress between the bolt and the plate | Shear stress in the bolt | Tensile stress in the bolt head | Thermal stress in the plate | Excessive bearing stress crushes or elongates the hole even when the bolt is strong enough.
NUM2#design-u09-16-q4@2: A 16 mm diameter bolt in single shear carries 20 kN. What is the average shear stress, in MPa? | 99.5 | 1% | MPa | A = π × 16^{2}/4 = 201 mm^{2}; τ = 20,000 ÷ 201 = 99.5 MPa.
SA2#design-u09-16-q5@2,3: Explain the checks needed when designing a bolted connection. | Check shear stress in the bolts, using the number of shear planes (single or double shear). Check bearing stress between the bolts and the plates, using bolt diameter and plate thickness. Check tension in the plates at the reduced section through the holes. Apply appropriate safety factors or code values, and consider edge distances. | Bolt shear with planes ; Bearing ; Plate tension at holes ; Safety factors or codes

## Hooke's law and elastic constants
LV: Year 1 · Foundation
S: In the elastic range, stress is proportional to strain. This lesson covers Hooke's law, Young's modulus, the stress–strain curve, Poisson's ratio and the shear modulus, with typical values for engineering materials.
O: Apply Hooke's law using Young's modulus and the shear modulus
O: Interpret a stress–strain curve, including yield and ultimate strength
O: Use Poisson's ratio to relate lateral and axial strain
PRE: Shear stress and strain
H: Hooke's law
E: σ = E ε; τ = G γ :: E is Young's modulus, G is the shear modulus
P: Typical E values: steel about 200 GPa; aluminium about 70 GPa; concrete about 30 GPa; timber about 10 GPa.
X: Finding E from the bar in the first lesson.
> Stress 150 MPa, strain 0.00075.
> E = 150 ÷ 0.00075 = 200,000 MPa = 200 GPa.
> This is typical of steel.
> If the material were aluminium (E = 70 GPa), the same stress would give strain of 0.00214, nearly three times as much.
H: The stress–strain curve (ductile metal)
- **Linear elastic region**: Hooke's law applies; unloading returns to zero strain.
- **Yield point**: plastic, permanent deformation begins; mild steel's yield stress is often around 250–355 MPa.
- **Strain hardening**: stress rises with plastic strain.
- **Ultimate tensile strength**: maximum engineering stress; **necking** follows, then fracture.
H: Poisson's ratio
E: ν = − lateral strain ÷ axial strain; G = E ÷ 2(1 + ν) :: ν is about 0.3 for steel
P: A bar stretched in tension becomes thinner. For steel with ν = 0.3, G = 200 ÷ 2.6 ≈ 77 GPa.
K: In the elastic range, σ = Eε and τ = Gγ; the stress–strain curve shows yield, hardening, ultimate strength and fracture; Poisson's ratio links lateral and axial strain.
!: Confusing stiffness with strength. Young's modulus measures stiffness (resistance to elastic deformation); yield and ultimate strength measure resistance to permanent deformation and fracture.
EV: established | Hooke's law holds closely for metals in the elastic range.
EV: established | Materials such as rubber and many polymers are non-linear, so a single E value is only an approximation.
T: Young's modulus | The ratio of normal stress to normal strain in the elastic range, a measure of stiffness
T: Yield stress | The stress at which plastic, permanent deformation begins
T: Poisson's ratio | The negative ratio of lateral strain to axial strain
SUM: σ = Eε and τ = Gγ.
SUM: The stress–strain curve shows elastic, yield, hardening and necking regions.
SUM: G = E/2(1 + ν).
SRC: Gere J. M. and Goodno B. J., Mechanics of Materials, 9th edition (SI), Cengage | secondary | 2018
SRC: Ashby M. F. and Jones D. R. H., Engineering Materials 1, 5th edition, Butterworth-Heinemann | secondary | 2019
Q: What is the approximate Young's modulus of steel? | About 200 GPa.
Q: What is Poisson's ratio for steel? | About 0.3.
M1#design-u09-17-q1@1: What does Young's modulus measure? | Stiffness: resistance to elastic deformation | Strength at fracture | The maximum load a member can carry | Resistance to corrosion | E is the slope of the elastic part of the stress–strain curve.
M2#design-u09-17-q2@2: A material has E = 70 GPa. What strain does a stress of 140 MPa produce? | 0.002 | 0.0005 | 2.0 | 0.02 | Applying the standard result: ε = σ/E = 140 ÷ 70,000 = 0.002.
M3#design-u09-17-q3@3: Two rods of the same size, one steel and one aluminium, carry the same load. Which statement is correct? | The aluminium rod stretches about three times as much, though both carry the same stress | Both stretch equally because the load is the same | The steel rod has a higher stress than the aluminium | The aluminium rod has lower strain because it is lighter | Same load and area give the same stress, but aluminium's lower E gives larger strain.
NUM2#design-u09-17-q4@2: Steel has E = 200 GPa and Poisson's ratio 0.3. What is its shear modulus, in GPa? | 76.9 | 1% | GPa | G = E/2(1 + ν) = 200 ÷ 2.6 = 76.9 GPa.
SA2#design-u09-17-q5@2,3: Describe the stress–strain curve of a ductile metal in a tensile test. | Initially stress rises linearly with strain (elastic region, slope E); unloading returns the specimen to its original length. At the yield point, plastic deformation begins and is permanent. Stress then rises more slowly as the material strain hardens, up to the ultimate tensile strength. After this the specimen necks, engineering stress falls, and it fractures. | Elastic region ; Yield ; Strain hardening and UTS ; Necking and fracture

## Axially loaded members
LV: Year 1 · Intermediate
S: Bars, rods and columns under axial load stretch or shorten. This lesson calculates deformation using δ = PL/AE, deals with stepped bars, introduces statically indeterminate axial problems, and applies factors of safety.
O: Calculate the change in length of axially loaded members
O: Analyse stepped bars and composite members
O: Apply factors of safety in design
PRE: Hooke's law and elastic constants
H: Deformation
E: δ = PL ÷ AE :: change in length = force × length ÷ (area × Young's modulus)
P: For a **stepped bar**, apply this to each segment with its own force, length and area, then add: δ = Σ(P_{i}L_{i} ÷ A_{i}E_{i}).
X: A steel rod 2 m long with area 500 mm^{2} carries 50 kN.
> δ = 50,000 × 2,000 ÷ (500 × 200,000) = 1.0 mm.
> Stress = 50,000 ÷ 500 = 100 MPa.
> If its yield stress is 250 MPa, the factor of safety is 250 ÷ 100 = 2.5.
> Doubling the length would double the extension but not change the stress.
H: Statically indeterminate members
P: When a member is fixed at both ends, or made of two materials sharing a load, equilibrium alone isn't enough. Add a **compatibility** condition: for example, two materials bonded together must stretch the same amount.
H: Factor of safety
E: Factor of safety = failure (or yield) stress ÷ working stress
P: Factors of safety allow for uncertainty in loads, material properties, manufacturing and analysis. Values depend on consequences of failure and are set by design codes.
K: Axial deformation is δ = PL/AE, summed over segments; indeterminate problems need compatibility as well as equilibrium; factors of safety keep working stresses well below failure.
!: Using the total load for every segment of a stepped bar. Each segment's internal force must be found by equilibrium at a section through that segment.
EV: established | δ = PL/AE applies accurately in the linear elastic range for prismatic members.
EV: established | Modern codes increasingly use limit state design with partial factors instead of a single factor of safety.
T: Axial deformation | Change in length of a member under axial load
T: Compatibility | A condition linking deformations, used with equilibrium in indeterminate problems
T: Factor of safety | The ratio of failure stress to working stress
SUM: δ = PL/AE.
SUM: Sum segments for stepped bars; use compatibility for indeterminate members.
SUM: Factors of safety allow for uncertainty.
SRC: Gere J. M. and Goodno B. J., Mechanics of Materials, 9th edition (SI), Cengage | secondary | 2018
SRC: Hibbeler R. C., Mechanics of Materials, 10th edition in SI units, Pearson | secondary | 2018
Q: What is the formula for axial deformation? | δ = PL/AE.
Q: What extra condition is needed to solve statically indeterminate axial problems? | A compatibility condition relating the deformations.
M1#design-u09-18-q1@1: What happens to the extension of a bar if its length is doubled with the same load? | It doubles | It halves | It stays the same | It quadruples | Applying the standard result: δ is proportional to L in δ = PL/AE.
M2#design-u09-18-q2@2: A 1 m aluminium rod (E = 70 GPa) of area 200 mm^{2} carries 14 kN. What is its extension? | 1.0 mm | 0.1 mm | 10 mm | 0.5 mm | δ = 14,000 × 1,000 ÷ (200 × 70,000) = 1.0 mm.
M3#design-u09-18-q3@3: A concrete column reinforced with steel bars carries a load. Why can't equilibrium alone find how the load is shared? | The problem is indeterminate; compatibility requires the steel and concrete to shorten equally | The steel carries no load at all | The concrete always carries the whole load | Equilibrium gives a unique answer without further information | Two materials share one load in proportion to their stiffness, found by equal strain.
NUM2#design-u09-18-q4@2: A steel rod 2 m long with area 500 mm^{2} and E = 200 GPa carries 50 kN. What is its extension, in mm? | 1.0 | 1% | mm | δ = 50,000 × 2,000 ÷ (500 × 200,000) = 1.0 mm.
SA2#design-u09-18-q5@2,3: Explain why engineers use factors of safety and what affects their size. | Actual loads may exceed those assumed, material strength varies, manufacturing introduces defects, and analysis involves simplifications. A factor of safety keeps working stress below the failure stress to cover these uncertainties. Larger factors are used where failure would be catastrophic, loads or materials are uncertain, or inspection is difficult; codes set values or partial factors. | Uncertainty in loads and materials ; Analysis simplifications ; Consequences of failure ; Codes

## Thermal stress
LV: Year 1 · Intermediate
S: Temperature changes make materials expand or contract. If this is prevented, thermal stresses arise. This lesson covers thermal strain, stresses in restrained members, and how engineers accommodate thermal movement.
O: Calculate free thermal expansion
O: Calculate thermal stress in a restrained member
O: Explain how structures accommodate thermal movement
PRE: Axially loaded members
H: Thermal strain
E: ε_{T} = α ΔT; δ_{T} = α ΔT L :: α is the coefficient of thermal expansion
P: Typical α values: steel about 12 × 10^{-6} per °C; aluminium about 23 × 10^{-6} per °C; concrete about 10 × 10^{-6} per °C.
H: Restrained members
E: σ = E α ΔT :: stress in a member fully restrained against thermal expansion
X: A steel rail 10 m long warms by 40 °C.
> Free expansion: δ = 12 × 10^{-6} × 40 × 10,000 = 4.8 mm.
> If fully restrained: σ = 200,000 × 12 × 10^{-6} × 40 = 96 MPa (compressive).
> High compressive stress in long welded rail can cause buckling in hot weather.
> Rails are therefore pre-tensioned when laid, so they reach zero stress at a moderate temperature.
H: Accommodating movement
- **Expansion joints** in bridges and buildings.
- **Gaps** between concrete slabs and in pipelines (expansion loops).
- Choosing materials with similar α where they are joined, as steel and concrete in reinforced concrete.
K: Free thermal strain is αΔT; if expansion is prevented, the stress is EαΔT, which can be large; joints, gaps and compatible materials accommodate thermal movement.
!: Assuming thermal stress depends on the member's length. For a fully restrained member, σ = EαΔT doesn't depend on length; free expansion does.
EV: established | Thermal stress calculations are used in rail, bridge and pipeline design.
EV: established | Steel and concrete have similar coefficients of thermal expansion, which is one reason reinforced concrete works.
T: Coefficient of thermal expansion | The strain per degree of temperature change
T: Thermal stress | Stress caused by restraining thermal expansion or contraction
T: Expansion joint | A gap or flexible joint allowing structural movement
SUM: Thermal strain = αΔT.
SUM: Restrained stress = EαΔT.
SUM: Joints, gaps and compatible materials manage movement.
SRC: Gere J. M. and Goodno B. J., Mechanics of Materials, 9th edition (SI), Cengage | secondary | 2018
SRC: Network Rail, Hot weather and the railway | guidance | 2023
Q: What is the thermal stress in a fully restrained bar? | σ = EαΔT.
Q: What is the coefficient of thermal expansion of steel, approximately? | About 12 × 10^{-6} per °C.
M1#design-u09-19-q1@1: What happens to a restrained steel bar when it is heated? | It develops compressive stress | It develops tensile stress | It expands freely with no stress | Its Young's modulus doubles | Prevented expansion produces compression.
M2#design-u09-19-q2@2: An aluminium bar (α = 23 × 10^{-6}/°C) 2 m long is heated by 50 °C. What is its free expansion? | 2.3 mm | 0.23 mm | 23 mm | 1.15 mm | Applying the standard result: δ = 23 × 10^{-6} × 50 × 2,000 = 2.3 mm.
M3#design-u09-19-q3@3: Two fully restrained steel bars, one 1 m and one 10 m long, are heated by the same amount. Which statement is correct? | Both have the same thermal stress, as σ = EαΔT doesn't depend on length | The longer bar has ten times the stress | The shorter bar has ten times the stress | Neither has any stress | Restrained stress depends on E, α and ΔT only.
NUM2#design-u09-19-q4@2: A fully restrained steel bar (E = 200 GPa, α = 12 × 10^{-6}/°C) is heated by 40 °C. What is the thermal stress, in MPa? | 96 | 1% | MPa | σ = EαΔT = 200,000 × 12 × 10^{-6} × 40 = 96 MPa.
SA2#design-u09-19-q5@2,3: Explain why railways can suffer track buckling in hot weather and how this is prevented. | Long continuous welded rails can't expand freely, so rising temperature creates large compressive stresses (σ = EαΔT). If the stress becomes high enough, the rails can buckle sideways. To prevent this, rails are stressed in tension when laid so they reach zero stress at a moderate temperature, ballast restrains them, and speed restrictions and inspections are used during heatwaves. | Restraint and compression ; Buckling mechanism ; Pre-stressing at installation ; Operational measures

## Torsion of circular shafts
LV: Year 1 · Intermediate
S: Shafts transmit power by twisting. This lesson derives the torsion formula, calculates shear stress and angle of twist in solid and hollow circular shafts, and links torque to power.
O: Calculate shear stress in circular shafts using τ = Tr/J
O: Calculate the angle of twist using θ = TL/GJ
O: Relate torque, speed and power in shaft design
PRE: Hooke's law and elastic constants
H: The torsion formula
E: τ = T r ÷ J; θ = T L ÷ G J :: T torque, r radius, J polar second moment of area, θ angle of twist in radians
E: J = π d^{4} ÷ 32 (solid); J = π (D^{4} − d^{4}) ÷ 32 (hollow)
P: Shear stress is zero at the centre and maximum at the outer surface. Hollow shafts are efficient because material near the centre carries little stress.
X: A solid steel shaft of diameter 50 mm and length 1 m carries a torque of 1 kN m; G = 80 GPa.
> J = π × 50^{4} ÷ 32 = 613,600 mm^{4}.
> τ_{max} = 1 × 10^{6} × 25 ÷ 613,600 = 40.7 MPa.
> θ = 1 × 10^{6} × 1,000 ÷ (80,000 × 613,600) = 0.0204 rad = 1.17°.
> At 1,500 rpm, power = Tω = 1,000 × 157 = 157 kW.
H: Power transmission
E: P = T ω :: ω in rad/s
P: For a given power, a faster shaft needs less torque and can be smaller. Gearboxes trade speed for torque.
K: Torsional shear stress τ = Tr/J is largest at the surface; twist θ = TL/GJ; shafts are sized from P = Tω, and hollow shafts save material.
!: Using the second moment of area I for torsion. Circular shafts in torsion use the polar second moment J, which for a circle is twice I.
EV: established | The elastic torsion formula is exact for circular shafts in the linear range.
EV: established | Non-circular sections warp under torsion and need different methods.
T: Polar second moment of area | J, a measure of a cross-section's resistance to torsion
T: Angle of twist | The rotation of one end of a shaft relative to the other under torque
SUM: τ = Tr/J; θ = TL/GJ.
SUM: J = πd^{4}/32 for solid shafts.
SUM: P = Tω links torque and power.
SRC: Gere J. M. and Goodno B. J., Mechanics of Materials, 9th edition (SI), Cengage | secondary | 2018
SRC: Hibbeler R. C., Mechanics of Materials, 10th edition in SI units, Pearson | secondary | 2018
Q: Where is the shear stress greatest in a shaft under torsion? | At the outer surface.
Q: What is the polar second moment of area of a solid circular shaft? | J = πd^{4}/32.
M1#design-u09-20-q1@1: Why are hollow shafts often used to transmit torque? | Material near the centre carries little stress, so removing it saves weight with little loss of strength | Hollow shafts can't twist at all | Solid shafts have no shear stress at the surface | Hollow shafts are always cheaper to manufacture | Shear stress increases with radius, so outer material does most of the work.
M2#design-u09-20-q2@2: If a shaft's diameter is doubled, how does its maximum shear stress change for the same torque? | It falls to one-eighth | It halves | It falls to one-quarter | It stays the same | τ = Tr/J ∝ d/d^{4} = 1/d^{3}, so doubling d divides τ by 8.
M3#design-u09-20-q3@3: A motor delivers 30 kW at 3,000 rpm. What torque does the shaft carry? | About 95 N m | About 10 N m | About 3,000 N m | About 600 N m | ω = 3,000 × 2π/60 = 314 rad/s; T = P/ω = 30,000 ÷ 314 = 95.5 N m.
NUM2#design-u09-20-q4@2: A solid 50 mm diameter shaft carries a torque of 1 kN m. What is the maximum shear stress, in MPa? | 40.7 | 1% | MPa | J = π × 50^{4}/32 = 613,600 mm^{4}; τ = 1 × 10^{6} × 25 ÷ 613,600 = 40.7 MPa.
SA2#design-u09-20-q5@2,3: Explain why a high-speed shaft can be smaller than a low-speed shaft transmitting the same power. | Power equals torque times angular speed, so for the same power a faster shaft carries less torque. Shear stress in a shaft is proportional to torque divided by d^{3}, so lower torque allows a smaller diameter for the same allowable stress. This is why gearboxes reduce speed near the load, where torque is high, using larger shafts there. | P = Tω ; Less torque at higher speed ; Stress depends on d cubed ; Practical example

## Bending stress in beams
LV: Year 1 · Intermediate
S: Bending creates tension on one side of a beam and compression on the other. This lesson derives the flexure formula σ = My/I, introduces the neutral axis and section modulus, and applies them to beam design.
O: Explain how bending produces tension and compression in a beam
O: Calculate bending stress using σ = My/I and the section modulus
O: Select a beam section to meet a stress limit
PRE: Shear force and bending moment diagrams
H: The flexure formula
E: σ = M y ÷ I :: M bending moment, y distance from the neutral axis, I second moment of area
E: σ_{max} = M ÷ Z, with Z = I ÷ y_{max} :: Z is the elastic section modulus; for a rectangle Z = bh^{2} ÷ 6
P: The **neutral axis** passes through the centroid of the section and has zero bending stress. Stress varies linearly with distance from it: maximum at the outer fibres.
P: In a **sagging** beam (simply supported, downward load), the top is in compression and the bottom in tension.
X: A rectangular timber beam 100 mm wide and 200 mm deep carries a maximum moment of 20 kN m.
> I = 100 × 200^{3} ÷ 12 = 66.7 × 10^{6} mm^{4}; y_{max} = 100 mm.
> σ_{max} = 20 × 10^{6} × 100 ÷ 66.7 × 10^{6} = 30 MPa.
> Alternatively Z = 100 × 200^{2} ÷ 6 = 667,000 mm^{3}; σ = 20 × 10^{6} ÷ 667,000 = 30 MPa.
> If the allowable stress is 10 MPa, the beam is overstressed; a deeper section is needed.
H: Assumptions
- Plane sections remain plane (Bernoulli–Euler beam theory).
- The material is linear elastic and the same in tension and compression.
- The beam is slender, and deflections are small.
K: Bending stress σ = My/I varies linearly from zero at the neutral axis to a maximum M/Z at the outer fibres; deep sections with large Z resist bending efficiently.
!: Forgetting which face is in tension. In concrete beams, which crack in tension, reinforcement must go on the tension face: the bottom for sagging, the top for hogging over supports.
EV: established | The flexure formula is the basis of elastic beam design.
EV: established | Plastic design uses the plastic section modulus, which exceeds the elastic Z, allowing for yielding across the section.
T: Neutral axis | The line in a bent section where bending stress is zero, through the centroid
T: Section modulus | Z = I/y_{max}, relating maximum bending stress to bending moment
T: Sagging | Bending that makes the beam concave upwards, with tension at the bottom
SUM: σ = My/I; σ_{max} = M/Z.
SUM: Stress is zero at the neutral axis and largest at the outer fibres.
SUM: Sagging beams have compression on top and tension below.
SRC: Gere J. M. and Goodno B. J., Mechanics of Materials, 9th edition (SI), Cengage | secondary | 2018
SRC: Hibbeler R. C., Mechanics of Materials, 10th edition in SI units, Pearson | secondary | 2018
Q: Where is bending stress zero in a beam? | At the neutral axis, through the centroid of the section.
Q: What is the elastic section modulus of a rectangle? | Z = bh^{2}/6.
M1#design-u09-21-q1@1: In a simply supported beam with a downward load, where is the bending stress tensile? | At the bottom face | At the top face | At the neutral axis | Throughout the section | Sagging puts the bottom in tension and the top in compression.
M2#design-u09-21-q2@2: A beam has Z = 500,000 mm^{3} and carries M = 50 kN m. What is the maximum bending stress? | 100 MPa | 10 MPa | 25 MPa | 1,000 MPa | σ = M/Z = 50 × 10^{6} ÷ 500,000 = 100 MPa.
M3#design-u09-21-q3@3: A designer doubles the depth of a rectangular beam while keeping width and load the same. What happens to the maximum bending stress? | It falls to one-quarter, since Z = bh^{2}/6 quadruples | It halves | It stays the same | It doubles | Z depends on depth squared, so doubling h quadruples Z and quarters the stress.
NUM2#design-u09-21-q4@2: A 100 mm wide by 200 mm deep rectangular beam carries a moment of 20 kN m. What is the maximum bending stress, in MPa? | 30 | 1% | MPa | Z = 100 × 200^{2}/6 = 666,667 mm^{3}; σ = 20 × 10^{6} ÷ 666,667 = 30 MPa.
SA2#design-u09-21-q5@2,3: Explain why I-beams are efficient in bending. | Bending stress is greatest far from the neutral axis and zero at it. I-beams place most of their material in the flanges, far from the neutral axis, where it contributes most to the second moment of area and resists the large stresses. The thin web connects the flanges and carries shear. This gives a large section modulus for little weight. | Stress distribution ; Flanges far from neutral axis ; Large I and Z ; Web carries shear

## Shear stress in beams
LV: Year 1 · Intermediate
S: Beams carry shear force as well as bending moment. This lesson introduces the shear formula τ = VQ/Ib, the parabolic shear distribution in rectangular sections, and the role of the web in I-beams.
O: Calculate shear stress in beams using τ = VQ/Ib
O: Describe the shear stress distribution in rectangular and I-sections
O: Explain why short, heavily loaded beams may be governed by shear
PRE: Bending stress in beams
H: The shear formula
E: τ = V Q ÷ I b :: V shear force, Q first moment of area above the point, I second moment of area, b width at the point
P: Shear stress is **zero at the top and bottom** of the section and **maximum at the neutral axis**.
E: τ_{max} = 1.5 V ÷ A :: for a rectangular section
X: A rectangular beam 100 mm × 200 mm carries a shear force of 30 kN.
> A = 100 × 200 = 20,000 mm^{2}.
> Average shear stress = 30,000 ÷ 20,000 = 1.5 MPa.
> Maximum shear stress at the neutral axis = 1.5 × 1.5 = 2.25 MPa.
> This is small compared with the bending stress in the same beam, as is usual for long beams.
H: I-sections and shear
- In an I-beam, the **web** carries most of the shear force; an approximation is τ ≈ V ÷ (web area).
- The flanges carry most of the bending.
H: When shear governs
P: Shear is critical in **short, deep beams** with heavy loads near supports, in **timber**, which is weak in shear along the grain, and in **concrete**, which needs shear reinforcement (links).
K: Shear stress τ = VQ/Ib is greatest at the neutral axis and zero at the outer fibres; for rectangles τ_{max} = 1.5V/A; the web carries shear in I-beams.
!: Assuming shear stress is uniform across a section. It varies, peaking at the neutral axis; the average value underestimates the maximum.
EV: established | The shear formula is standard for elastic beams.
EV: established | Concrete beams need shear links because concrete is weak in diagonal tension caused by shear.
T: First moment of area | Q, the area above a point multiplied by the distance of its centroid from the neutral axis
T: Web | The vertical part of an I-beam that connects the flanges and carries shear
SUM: τ = VQ/Ib.
SUM: Maximum at the neutral axis; zero at the outer fibres.
SUM: Shear governs short, heavily loaded beams.
SRC: Gere J. M. and Goodno B. J., Mechanics of Materials, 9th edition (SI), Cengage | secondary | 2018
SRC: Hibbeler R. C., Mechanics of Materials, 10th edition in SI units, Pearson | secondary | 2018
Q: Where is shear stress greatest in a rectangular beam? | At the neutral axis.
Q: What is the maximum shear stress in a rectangular section? | 1.5 times the average, 1.5V/A.
M1#design-u09-22-q1@1: Where is the shear stress zero in a rectangular beam section? | At the top and bottom faces | At the neutral axis | At mid-height of the web | Everywhere | Shear stress falls to zero at free surfaces.
M2#design-u09-22-q2@2: A rectangular beam of area 10,000 mm^{2} carries a shear force of 20 kN. What is the maximum shear stress? | 3 MPa | 2 MPa | 1.5 MPa | 20 MPa | Applying the standard result: τ_{max} = 1.5 × 20,000 ÷ 10,000 = 3 MPa.
M3#design-u09-22-q3@3: A short, deep timber beam carries a heavy point load near its support and fails by splitting along its length. What is the most likely cause? | Horizontal shear, to which timber is weak along the grain | Bending stress at mid-span | Thermal expansion of the timber | Buckling of the compression flange | Timber's low shear strength along the grain makes short, heavily loaded beams vulnerable to shear failure.
NUM2#design-u09-22-q4@2: A rectangular beam 100 mm × 200 mm carries a shear force of 30 kN. What is the maximum shear stress, in MPa? | 2.25 | 1% | MPa | τ_{max} = 1.5V/A = 1.5 × 30,000 ÷ 20,000 = 2.25 MPa.
SA2#design-u09-22-q5@2,3: Explain how bending and shear stresses are shared in an I-beam. | Bending stress is greatest at the outer fibres, so the flanges, far from the neutral axis, carry most of the bending moment. Shear stress is greatest near the neutral axis, where the web is, so the web carries most of the shear force. This division of work lets I-beams resist both efficiently with little material. | Flanges carry bending ; Web carries shear ; Stress distributions ; Efficiency

## Beam deflection
LV: Year 1 · Intermediate
S: Beams must be stiff enough not to deflect too much in service. This lesson gives standard deflection formulas, explains the dependence on E, I and span, and covers serviceability limits.
O: Use standard formulas to calculate beam deflections
O: Explain how span, stiffness and loading affect deflection
O: Apply serviceability limits to beam design
PRE: Bending stress in beams
H: Standard formulas
- **Simply supported, central point load P**: δ_{max} = PL^{3} ÷ 48EI.
- **Simply supported, UDL w over span L**: δ_{max} = 5wL^{4} ÷ 384EI.
- **Cantilever, end point load P**: δ_{max} = PL^{3} ÷ 3EI.
- **Cantilever, UDL**: δ_{max} = wL^{4} ÷ 8EI.
P: These come from integrating the curvature equation EI d^{2}y/dx^{2} = M, with boundary conditions.
X: A simply supported steel beam, span 4 m, I = 50 × 10^{6} mm^{4}, E = 200 GPa, carries 10 kN at mid-span.
> δ = 10,000 × 4,000^{3} ÷ (48 × 200,000 × 50 × 10^{6}).
> δ = 6.4 × 10^{14} ÷ 4.8 × 10^{14} = 1.33 mm.
> A common limit is span/360 = 11.1 mm, so this is acceptable.
> Doubling the span would increase deflection eightfold, to 10.7 mm.
H: Serviceability
P: Excessive deflection can crack finishes, cause ponding on roofs, make floors feel bouncy and misalign machinery. Codes set limits such as span/250 or span/360, depending on use. Deflection often governs long-span beam design rather than strength.
K: Deflection depends on load, span (to the third or fourth power), E and I; standard formulas give maximum deflections, which are checked against serviceability limits such as span/360.
!: Checking only strength. A beam can be strong enough but too flexible; deflection limits often control long spans.
EV: established | Standard deflection formulas derive from Euler–Bernoulli beam theory.
EV: established | Design codes set deflection limits based on serviceability rather than strength.
T: Deflection | The vertical displacement of a beam under load
T: Flexural rigidity | EI, the product of Young's modulus and second moment of area
T: Serviceability limit | A limit on deflection or vibration to keep a structure usable and undamaged
SUM: δ = PL^{3}/48EI and 5wL^{4}/384EI for simply supported beams.
SUM: Span has a strong effect.
SUM: Check serviceability limits such as span/360.
SRC: Gere J. M. and Goodno B. J., Mechanics of Materials, 9th edition (SI), Cengage | secondary | 2018
SRC: BSI, BS EN 1990: Eurocode, Basis of structural design | standard | 2002
Q: What is the maximum deflection of a simply supported beam with a central point load? | PL^{3}/48EI.
Q: What is flexural rigidity? | EI, the product of Young's modulus and the second moment of area.
M1#design-u09-23-q1@1: What is the maximum deflection of a cantilever with an end point load? | PL^{3}/3EI | PL^{3}/48EI | 5wL^{4}/384EI | wL^{4}/8EI | The free end of a cantilever deflects PL^{3}/3EI under an end load.
M2#design-u09-23-q2@2: If a simply supported beam's span is doubled with the same central load, how does its deflection change? | It increases eightfold | It doubles | It quadruples | It stays the same | δ ∝ L^{3}, so doubling L multiplies deflection by 8.
M3#design-u09-23-q3@3: A long floor beam passes its strength check but feels bouncy and cracks the ceiling below. What has been missed? | A serviceability check on deflection and vibration | A check on thermal stress | A check on bolt shear | Nothing: strength is the only requirement | Deflection limits protect finishes and comfort and often govern long spans.
NUM2#design-u09-23-q4@2: A 4 m simply supported beam (E = 200 GPa, I = 50 × 10^{6} mm^{4}) carries 10 kN at mid-span. What is the maximum deflection, in mm? | 1.33 | 1% | mm | δ = PL^{3}/48EI = 10,000 × 4,000^{3} ÷ (48 × 200,000 × 50 × 10^{6}) = 1.33 mm.
SA2#design-u09-23-q5@2,3: Explain why deflection, rather than strength, often governs the design of long-span beams. | Deflection rises with span to the third or fourth power, while bending stress rises with span roughly to the second power. So as spans increase, a beam strong enough to carry the load may still deflect more than serviceability limits allow. Designers then increase I, typically by deepening the section, to stiffen the beam. | Deflection scaling with span ; Stress scaling ; Serviceability limits ; Increasing I

## Combined loading
LV: Year 1 · Advanced
S: Many members carry more than one type of load at once. This lesson covers combining axial and bending stresses, eccentric loads on columns and the middle-third rule, and superposition of stresses.
O: Combine axial and bending stresses using superposition
O: Calculate stresses due to an eccentric axial load
O: Apply the middle-third rule to avoid tension
PRE: Bending stress in beams
H: Superposition
E: σ = P ÷ A ± M y ÷ I :: axial plus bending, valid in the linear elastic range
P: Stresses from different loads can be added at a point, provided the material stays elastic and deformations are small.
H: Eccentric loads
P: An axial load P applied at a distance e from the centroid is equivalent to a central load P plus a moment M = Pe.
X: A 200 mm × 200 mm concrete column carries 400 kN at 20 mm from the centroid.
> Direct stress = 400,000 ÷ 40,000 = 10 MPa (compression).
> M = 400,000 × 20 = 8 × 10^{6} N mm; Z = 200 × 200^{2} ÷ 6 = 1.33 × 10^{6} mm^{3}.
> Bending stress = 8 × 10^{6} ÷ 1.33 × 10^{6} = 6 MPa.
> Extreme stresses: 10 + 6 = 16 MPa and 10 − 6 = 4 MPa, both compressive.
H: The middle-third rule
P: For a rectangular section, no tension occurs if the load acts within the **middle third** (eccentricity e ≤ b/6). This matters for masonry and unreinforced concrete, which are weak in tension. For the column above, b/6 = 33 mm, so the 20 mm eccentricity causes no tension.
K: Combined stresses are found by superposition, σ = P/A ± My/I; eccentric loads add a moment Pe; keeping loads within the middle third avoids tension in rectangular sections.
!: Ignoring small eccentricities. Even a small offset adds bending stress that can cause tension in masonry or increase peak compression.
EV: established | Superposition is valid for linear elastic behaviour and small deformations.
EV: established | The middle-third rule has long been used in masonry and gravity wall design.
T: Superposition | Adding the effects of separate loads to find the combined effect
T: Eccentricity | The distance of a load's line of action from the centroid
T: Middle-third rule | For a rectangle, a load within the middle third of the section causes no tension
SUM: σ = P/A ± My/I by superposition.
SUM: An eccentric load adds moment M = Pe.
SUM: e ≤ b/6 avoids tension in a rectangle.
SRC: Gere J. M. and Goodno B. J., Mechanics of Materials, 9th edition (SI), Cengage | secondary | 2018
SRC: Hulse R. and Cain J., Structural Mechanics, 2nd edition, Palgrave | secondary | 2000
Q: What is the middle-third rule? | For a rectangular section, a load within the middle third (e ≤ b/6) causes no tension.
Q: What moment does an eccentric axial load create? | M = Pe, the load times its eccentricity.
M1#design-u09-24-q1@1: What principle allows axial and bending stresses to be added? | Superposition | Hooke's law of springs | Conservation of energy | Newton's third law | In the linear elastic range, stresses from separate loads can be added.
M2#design-u09-24-q2@2: A column has direct stress 12 MPa and bending stress ±5 MPa. What are the extreme stresses? | 17 MPa and 7 MPa compression | 12 MPa and 5 MPa compression | 17 MPa compression and 7 MPa tension | 7 MPa and 5 MPa compression | 12 + 5 = 17 and 12 − 5 = 7, both compressive.
M3#design-u09-24-q3@3: A brick pier 300 mm wide carries a load 70 mm from its centre line. What is the concern? | The load lies outside the middle third (50 mm), so part of the pier will be in tension | No concern, as any eccentricity is safe | The pier will fail in shear | The load causes no bending at all | b/6 = 50 mm; 70 mm exceeds this, so tension develops, which masonry resists poorly.
NUM2#design-u09-24-q4@2: A 200 × 200 mm column carries 400 kN at an eccentricity of 20 mm. What is the maximum compressive stress, in MPa? | 16 | 1% | MPa | P/A = 10 MPa; M/Z = 8 × 10^{6} ÷ 1.333 × 10^{6} = 6 MPa; maximum = 16 MPa.
SA2#design-u09-24-q5@2,3: Explain why the middle-third rule matters for masonry structures. | Masonry and unreinforced concrete are strong in compression but weak in tension. An eccentric load adds bending stress, which can make one face go into tension if the eccentricity is large. For a rectangular section, keeping the resultant load within the middle third (e ≤ b/6) ensures the whole section stays in compression, avoiding cracking and instability. | Weak in tension ; Eccentricity adds bending ; b/6 condition ; Whole section in compression

## Stress transformation and Mohr's circle
LV: Year 1 · Advanced
S: Stresses at a point depend on the orientation of the plane considered. This lesson covers plane stress transformation, principal stresses, maximum shear stress, and Mohr's circle as a graphical method.
O: Explain why stresses vary with the orientation of the plane
O: Calculate principal stresses and maximum shear stress
O: Construct and use Mohr's circle for plane stress
PRE: Combined loading
H: Plane stress
P: At a point, a general plane stress state has σ_{x}, σ_{y} and τ_{xy}. On a plane rotated by θ, the normal and shear stresses change. The **principal stresses** are the maximum and minimum normal stresses, on planes where shear stress is zero.
E: σ_{1,2} = (σ_{x} + σ_{y})/2 ± √[((σ_{x} − σ_{y})/2)^{2} + τ_{xy}^{2}]
E: τ_{max} = √[((σ_{x} − σ_{y})/2)^{2} + τ_{xy}^{2}]; tan 2θ_{p} = 2τ_{xy} ÷ (σ_{x} − σ_{y})
H: Mohr's circle
- Plot points (σ_{x}, τ_{xy}) and (σ_{y}, −τ_{xy}); the line between them is a diameter.
- **Centre** at (σ_{x} + σ_{y})/2 on the σ axis; **radius** R = τ_{max}.
- Principal stresses are where the circle crosses the σ axis.
- A rotation of θ on the element is 2θ on the circle.
X: σ_{x} = 80 MPa, σ_{y} = 20 MPa, τ_{xy} = 40 MPa.
> Centre = (80 + 20)/2 = 50 MPa.
> R = √(30^{2} + 40^{2}) = 50 MPa.
> σ_{1} = 50 + 50 = 100 MPa; σ_{2} = 50 − 50 = 0 MPa; τ_{max} = 50 MPa.
> tan 2θ_{p} = 80/60, so 2θ_{p} = 53.1° and θ_{p} = 26.6°.
K: Stresses depend on the plane's orientation; principal stresses are the extreme normal stresses where shear is zero, and Mohr's circle shows all combinations, with radius equal to the maximum shear stress.
!: Forgetting the factor of 2 in angles. A rotation of θ on the material corresponds to 2θ on Mohr's circle.
EV: established | Mohr's circle (Otto Mohr, 1882) remains a standard tool for stress analysis.
EV: established | Strain gauge rosettes measure strains in three directions to find principal stresses experimentally.
T: Principal stresses | The maximum and minimum normal stresses at a point, on planes with zero shear
T: Mohr's circle | A graphical representation of stress transformation at a point
T: Plane stress | A stress state in which stresses act only in one plane
SUM: Stress depends on the orientation of the plane.
SUM: Principal stresses occur where shear is zero.
SUM: Mohr's circle: centre at the mean stress, radius τ_{max}.
SRC: Gere J. M. and Goodno B. J., Mechanics of Materials, 9th edition (SI), Cengage | secondary | 2018
SRC: Mohr O., "Über die Darstellung des Spannungszustandes und des Deformationszustandes eines Körperelementes", Zivilingenieur 28, 113–156 | primary | 1882
Q: What are principal stresses? | The maximum and minimum normal stresses at a point, acting on planes where shear stress is zero.
Q: What is the radius of Mohr's circle equal to? | The maximum in-plane shear stress.
M1#design-u09-25-q1@1: Where is the centre of Mohr's circle for plane stress? | At (σ_{x} + σ_{y})/2 on the normal stress axis | At the origin in every case | At (σ_{x}, τ_{xy}) | At τ_{max} on the shear axis | The centre is at the average of the two normal stresses.
M2#design-u09-25-q2@2: For σ_{x} = 60 MPa, σ_{y} = 0 and τ_{xy} = 0, what is the maximum in-plane shear stress? | 30 MPa | 60 MPa | 0 MPa | 120 MPa | τ_{max} = √(30^{2} + 0) = 30 MPa, on planes at 45°.
M3#design-u09-25-q3@3: Why does a brittle chalk stick twisted in torsion break along a 45° helix? | Pure shear produces principal tensile stress on 45° planes, and chalk fails in tension | Chalk is weakest in compression along its length | Shear stress is zero at 45° | The twist causes thermal stress | In pure shear, Mohr's circle gives principal stresses ±τ at 45°; brittle materials fail on the tension plane.
NUM2#design-u09-25-q4@2: A point has σ_{x} = 80 MPa, σ_{y} = 20 MPa and τ_{xy} = 40 MPa. What is the major principal stress, in MPa? | 100 | 1% | MPa | Centre 50, R = √(30^{2} + 40^{2}) = 50; σ_{1} = 50 + 50 = 100 MPa.
SA2#design-u09-25-q5@2,3: Explain why principal stresses are important in design. | Failure often depends on the largest normal or shear stresses at a point, which may not act on the planes where loads are applied. Principal stresses give the maximum and minimum normal stresses and, with them, the maximum shear stress. Failure theories use principal stresses to predict yielding or fracture, and brittle materials crack perpendicular to the maximum principal tensile stress. | Failure depends on extreme stresses ; Not on load planes ; Use in failure theories ; Brittle crack direction

## Failure theories
LV: Year 1 · Advanced
S: Failure theories predict when a material will yield or fracture under combined stresses. This lesson covers the maximum normal stress, Tresca and von Mises criteria, and when to use each for brittle and ductile materials.
O: Describe the main failure theories for ductile and brittle materials
O: Apply the Tresca and von Mises criteria to plane stress
O: Calculate a factor of safety using a failure criterion
PRE: Stress transformation and Mohr's circle
H: Brittle materials
P: **Maximum normal stress (Rankine)**: failure occurs when the largest principal stress reaches the material's tensile (or compressive) strength. Suits brittle materials such as cast iron and glass.
H: Ductile materials
E: Tresca: σ_{1} − σ_{3} ≤ σ_{Y} :: maximum shear stress theory (σ_{3} = 0 in plane stress if σ_{1}, σ_{2} are both tensile)
E: von Mises: σ_{vm} = √(σ_{1}^{2} − σ_{1}σ_{2} + σ_{2}^{2}) ≤ σ_{Y} :: for plane stress
P: **Tresca** is slightly conservative; **von Mises** (distortion energy) agrees best with tests on ductile metals and is widely used in design and finite element analysis.
X: A ductile steel (σ_{Y} = 250 MPa) has principal stresses σ_{1} = 120 MPa and σ_{2} = −40 MPa.
> Tresca: σ_{1} − σ_{2} = 160 MPa; factor of safety = 250 ÷ 160 = 1.56.
> von Mises: √(120^{2} − 120 × (−40) + 40^{2}) = √(14,400 + 4,800 + 1,600) = 144 MPa.
> Factor of safety = 250 ÷ 144 = 1.74.
> Tresca gives the more conservative result.
K: Brittle materials are judged by maximum normal stress; ductile materials by Tresca (maximum shear) or von Mises (distortion energy), with von Mises fitting experiments best.
!: Comparing a single stress component with yield strength under combined loading. Combine stresses with a failure criterion first.
EV: established | Von Mises and Tresca criteria are standard for ductile metals; von Mises matches experimental yield data more closely.
EV: established | Fatigue under cyclic loading needs separate criteria; static failure theories don't predict it.
T: Von Mises stress | An equivalent stress combining principal stresses, compared with yield strength
T: Tresca criterion | The maximum shear stress theory of yielding
T: Brittle failure | Fracture with little plastic deformation, typical of glass and cast iron
SUM: Brittle: maximum normal stress.
SUM: Ductile: Tresca or von Mises.
SUM: Use a criterion to combine stresses before comparing with strength.
SRC: Gere J. M. and Goodno B. J., Mechanics of Materials, 9th edition (SI), Cengage | secondary | 2018
SRC: Budynas R. G. and Nisbett J. K., Shigley's Mechanical Engineering Design, 11th edition, McGraw-Hill | secondary | 2020
Q: Which failure theory is most suitable for brittle materials? | The maximum normal stress (Rankine) theory.
Q: What does the Tresca criterion state? | Yield occurs when the maximum shear stress reaches half the yield stress, i.e. σ_{1} − σ_{3} = σ_{Y}.
M1#design-u09-26-q1@1: Which criterion is based on distortion energy? | Von Mises | Tresca | Rankine | Mohr–Coulomb | Von Mises equates yielding to the distortion energy at yield.
M2#design-u09-26-q2@2: A ductile part has σ_{1} = 100 MPa and σ_{2} = 0. Using von Mises, what is the equivalent stress? | 100 MPa | 50 MPa | 0 MPa | 141 MPa | √(100^{2} − 0 + 0) = 100 MPa: in uniaxial stress the equivalent stress equals the applied stress.
M3#design-u09-26-q3@3: A designer checks a steel shaft under combined bending and torsion by comparing only the bending stress with yield. What is wrong? | The shear stress from torsion is ignored; a combined criterion such as von Mises is needed | Nothing: bending stress is the only one that matters | Torsion never causes yielding | Yield strength applies only to brittle materials | Combined stresses must be combined with a failure theory before comparing with yield.
NUM3#design-u09-26-q4@3: A ductile steel (σ_{Y} = 250 MPa) has principal stresses of 120 MPa and −40 MPa in plane stress. What is the von Mises equivalent stress, in MPa? | 144 | 1% | MPa | σ_{vm} = √(120^{2} − 120 × (−40) + (−40)^{2}) = √20,800 = 144 MPa.
SA2#design-u09-26-q5@2,3: Explain why different failure theories are used for brittle and ductile materials. | Ductile materials, such as most steels, fail by yielding, which is driven by shear and distortion, so Tresca or von Mises criteria predict failure well. Brittle materials, such as cast iron and glass, fracture with little plastic deformation, typically when the largest tensile stress reaches their tensile strength, so the maximum normal stress theory is used. Using the wrong theory can give unsafe or wasteful designs. | Ductile failure mechanism ; Tresca or von Mises ; Brittle failure mechanism ; Consequence of wrong choice

## Buckling of columns
LV: Year 1 · Advanced
S: Slender columns can fail by buckling sideways at stresses well below their crushing strength. This lesson derives Euler's critical load, explains effective length and slenderness ratio, and discusses the limits of Euler theory.
O: Calculate the Euler critical buckling load
O: Apply effective length factors for different end conditions
O: Explain the role of slenderness ratio and the limits of Euler theory
PRE: Mass moment of inertia
H: Euler buckling
E: P_{cr} = π^{2} E I ÷ (K L)^{2} :: K is the effective length factor
- **Pinned–pinned**: K = 1.0.
- **Fixed–free** (flagpole): K = 2.0.
- **Fixed–pinned**: K ≈ 0.7.
- **Fixed–fixed**: K = 0.5.
P: Buckling occurs about the axis with the **smallest I**.
X: A solid steel rod 30 mm in diameter and 2 m long, pinned at both ends; E = 200 GPa.
> I = π × 30^{4} ÷ 64 = 39,760 mm^{4}.
> P_{cr} = π^{2} × 200,000 × 39,760 ÷ 2,000^{2} = 19,600 N = 19.6 kN.
> Crushing load (at 250 MPa yield): 250 × 707 = 177 kN.
> The rod buckles at about a ninth of its crushing load.
H: Slenderness
E: Slenderness ratio λ = KL ÷ r, with r = √(I/A)
P: **Slender** columns (high λ) fail by elastic buckling (Euler). **Short** columns fail by crushing (yield). In between, failure involves both, and design codes use curves (such as the Perry–Robertson approach in Eurocode 3) that account for imperfections and residual stresses.
K: Slender columns buckle at the Euler load π^{2}EI/(KL)^{2}, which falls with the square of effective length; slenderness ratio decides whether buckling or crushing governs.
!: Using Euler's formula for short, stocky columns. It applies only to slender columns; short columns fail by yielding, and intermediate columns need design-code curves.
EV: established | Euler's buckling formula (1744) is exact for ideal slender elastic columns.
EV: established | Real columns buckle below the Euler load because of imperfections, so codes use reduced capacities.
T: Buckling | Sudden sideways deflection of a slender member under compression
T: Effective length | KL, the length of an equivalent pinned column, depending on end conditions
T: Slenderness ratio | Effective length divided by radius of gyration, KL/r
SUM: P_{cr} = π^{2}EI/(KL)^{2}.
SUM: End conditions change K.
SUM: Slenderness decides whether buckling or crushing governs.
SRC: Gere J. M. and Goodno B. J., Mechanics of Materials, 9th edition (SI), Cengage | secondary | 2018
SRC: BSI, BS EN 1993-1-1: Eurocode 3, Design of steel structures, Part 1-1 | standard | 2005
Q: What is the effective length factor for a column fixed at one end and free at the other? | K = 2.0.
Q: About which axis does a column buckle? | The axis with the smallest second moment of area.
M1#design-u09-27-q1@1: What is the effective length factor for a column pinned at both ends? | 1.0 | 2.0 | 0.5 | 0.7 | Pinned–pinned is the basic Euler case, K = 1.
M2#design-u09-27-q2@2: If a pinned column's length is doubled, what happens to its Euler buckling load? | It falls to one-quarter | It halves | It doubles | It stays the same | P_{cr} ∝ 1/L^{2}, so doubling L quarters the critical load.
M3#design-u09-27-q3@3: A ruler pushed end-on bends sideways about its thin direction, never its wide direction. Why? | It buckles about the axis with the smaller second moment of area | It is stronger in its thin direction | Buckling always occurs about the stiffer axis | The ruler's material differs in each direction | P_{cr} depends on I; the thin direction has a much smaller I.
NUM3#design-u09-27-q4@3: A pinned steel rod 30 mm in diameter and 2 m long has E = 200 GPa. What is its Euler critical load, in kN? | 19.6 | 2% | kN | I = π × 30^{4}/64 = 39,760 mm^{4}; P_{cr} = π^{2} × 200,000 × 39,760 ÷ 2,000^{2} = 19.6 kN.
SA2#design-u09-27-q5@2,3: Explain why slender columns fail at loads well below their crushing strength. | A slender column under compression can become unstable: a small sideways deflection creates a bending moment that increases the deflection. At the Euler critical load, π^{2}EI/(KL)^{2}, the column can no longer resist this, and it buckles. Because P_{cr} depends on stiffness and length, not strength, slender columns buckle at stresses far below the yield stress. Imperfections lower the load further. | Instability mechanism ; Euler load formula ; Depends on stiffness and length ; Imperfections

## Thin-walled pressure vessels
LV: Year 1 · Intermediate
S: Pressure vessels such as tanks, pipes and boilers hold fluids under pressure. This lesson derives hoop and longitudinal stresses in thin-walled cylinders and spheres, and explains their use in design.
O: Derive hoop and longitudinal stresses in a thin-walled cylinder
O: Calculate stresses in cylindrical and spherical vessels
O: Explain why cylinders fail along their length and how vessels are designed
PRE: Normal stress and strain
H: Thin-walled cylinders
E: σ_{h} = p r ÷ t; σ_{l} = p r ÷ 2t :: hoop (circumferential) and longitudinal stresses; p internal pressure, r radius, t wall thickness
P: A vessel is "thin-walled" when r/t is greater than about 10, so stress is nearly uniform through the wall. **Hoop stress is twice the longitudinal stress**, so cylinders tend to split along their length.
H: Spheres
E: σ = p r ÷ 2t :: in all directions
P: A sphere has half the hoop stress of a cylinder of the same radius and thickness, so spheres are the most efficient shape for storing gas under pressure.
X: A cylindrical tank of radius 500 mm and wall thickness 10 mm holds gas at 2 MPa.
> r/t = 50, so thin-wall theory applies.
> Hoop stress = 2 × 500 ÷ 10 = 100 MPa.
> Longitudinal stress = 100 ÷ 2 = 50 MPa.
> If the allowable stress is 150 MPa, the factor of safety on hoop stress is 1.5.
H: Design
- Wall thickness is set by hoop stress, with allowances for corrosion and weld efficiency.
- Pressure vessels in the UK are covered by the Pressure Systems Safety Regulations 2000, requiring written schemes of examination.
K: In thin-walled cylinders, hoop stress pr/t is twice longitudinal stress pr/2t, so cylinders split lengthwise; spheres carry pr/2t in all directions and are most efficient.
!: Using the thin-wall formulas for thick vessels. When r/t is small (below about 10), stress varies through the wall and thick-cylinder (Lamé) equations are needed.
EV: established | Thin-wall pressure vessel formulas follow from equilibrium of a cut section.
EV: established | The Pressure Systems Safety Regulations 2000 govern pressure systems in Great Britain.
T: Hoop stress | Circumferential stress in a pressure vessel wall, pr/t for a cylinder
T: Longitudinal stress | Axial stress in a cylindrical pressure vessel, pr/2t
T: Thin-walled vessel | A vessel whose radius is much larger than its wall thickness (r/t > 10)
SUM: Cylinder: σ_{h} = pr/t, σ_{l} = pr/2t.
SUM: Sphere: σ = pr/2t.
SUM: Hoop stress governs cylinder design.
SRC: Gere J. M. and Goodno B. J., Mechanics of Materials, 9th edition (SI), Cengage | secondary | 2018
SRC: Pressure Systems Safety Regulations 2000 (SI 2000/128) | legislation | 2000 | https://www.legislation.gov.uk/uksi/2000/128/contents/made
Q: What is the hoop stress in a thin-walled cylinder? | pr/t.
Q: Why do cylindrical pressure vessels tend to split along their length? | Hoop stress is twice the longitudinal stress.
M1#design-u09-28-q1@1: What is the stress in a thin-walled spherical vessel? | pr/2t in all directions | pr/t in all directions | 2pr/t | pr/4t | A sphere's symmetry gives equal stress pr/2t in every direction.
M2#design-u09-28-q2@2: A pipe of radius 100 mm and wall thickness 5 mm carries water at 1 MPa. What is the hoop stress? | 20 MPa | 10 MPa | 40 MPa | 0.05 MPa | Applying the standard result: σ_{h} = pr/t = 1 × 100 ÷ 5 = 20 MPa.
M3#design-u09-28-q3@3: Why are large gas storage tanks often spherical? | For the same pressure and thickness, a sphere has half the maximum stress of a cylinder, saving material | Spheres are easier to transport by road | Cylinders can't hold gas under pressure | Spheres have higher hoop stress, which is beneficial | Lower maximum stress means thinner walls for the same pressure.
NUM2#design-u09-28-q4@2: A thin-walled cylinder of radius 500 mm and thickness 10 mm holds gas at 2 MPa. What is the hoop stress, in MPa? | 100 | 1% | MPa | σ_{h} = pr/t = 2 × 500 ÷ 10 = 100 MPa.
SA2#design-u09-28-q5@2,3: Derive the hoop stress in a thin-walled cylinder. | Cut the cylinder lengthwise along a diameter and consider one half, of length L. The internal pressure acts on the projected area 2rL, giving a force 2prL. This is resisted by hoop stress in the two cut walls, each of area tL, giving 2σ_{h}tL. Equating: 2σ_{h}tL = 2prL, so σ_{h} = pr/t. | Free-body of half cylinder ; Pressure force on projected area ; Resisting wall force ; Result

## Strain energy
LV: Year 1 · Intermediate
S: When a material deforms elastically, it stores energy. This lesson covers strain energy in axial loading, modulus of resilience, and the effects of suddenly applied and impact loads.
O: Calculate strain energy stored in an axially loaded member
O: Define the modulus of resilience
O: Explain why suddenly applied and impact loads produce higher stresses
PRE: Axially loaded members
H: Strain energy
E: U = ½ P δ = P^{2} L ÷ 2AE :: energy stored in an elastic bar under axial load
E: u_{r} = σ_{Y}^{2} ÷ 2E :: modulus of resilience, energy per unit volume up to yield
X: The steel rod from earlier (2 m, 500 mm^{2}, 50 kN, δ = 1.0 mm).
> U = ½ × 50,000 × 1.0 = 25,000 N mm = 25 J.
> Modulus of resilience for steel with σ_{Y} = 250 MPa: 250^{2} ÷ (2 × 200,000) = 0.156 MJ/m^{3}.
> A higher yield strength or lower E gives more energy storage before yield.
> Springs use high-strength steel for this reason.
H: Dynamic loads
- **Gradually applied** load: maximum stress = P/A.
- **Suddenly applied** load (dropped from zero height): maximum stress = **2P/A**, twice the static value.
- **Impact** (load falling from a height h): stress is higher still, found by equating potential energy lost to strain energy gained.
P: Strain energy methods also underpin deflection calculations (Castigliano's theorem) and are used to design energy absorbers such as crash barriers.
K: Elastic strain energy is ½Pδ; the modulus of resilience σ_{Y}^{2}/2E measures energy storage to yield; suddenly applied loads double the stress, and impact loads raise it further.
!: Treating a suddenly applied load as if it were static. Even without falling, a load released suddenly produces twice the static stress at peak.
EV: established | Energy methods for elastic members are standard in mechanics of materials.
EV: established | Impact loading calculations based on energy are approximations; real impacts involve local plasticity and wave effects.
T: Strain energy | Energy stored in a body as it deforms elastically
T: Modulus of resilience | The strain energy per unit volume stored up to the elastic limit
T: Impact load | A load applied with velocity, causing stresses higher than the static value
SUM: U = ½Pδ = P^{2}L/2AE.
SUM: Modulus of resilience = σ_{Y}^{2}/2E.
SUM: Sudden loads double stress; impact loads increase it further.
SRC: Gere J. M. and Goodno B. J., Mechanics of Materials, 9th edition (SI), Cengage | secondary | 2018
SRC: Hibbeler R. C., Mechanics of Materials, 10th edition in SI units, Pearson | secondary | 2018
Q: What is the strain energy stored in a bar under axial load? | U = ½Pδ = P^{2}L/2AE.
Q: How does a suddenly applied load compare with the same load applied gradually? | It produces twice the maximum stress.
M1#design-u09-29-q1@1: What is the modulus of resilience? | Strain energy per unit volume up to yield | The maximum stress before fracture | The slope of the stress–strain curve | The ratio of lateral to axial strain | It measures how much energy a material can absorb elastically per unit volume.
M2#design-u09-29-q2@2: A bar stretches 2 mm under a gradually applied load of 10 kN. How much strain energy is stored? | 10 J | 20 J | 5 J | 40 J | U = ½Pδ = 0.5 × 10,000 × 2 = 10,000 N mm = 10 J.
M3#design-u09-29-q3@3: A load is released suddenly onto a bar rather than applied gradually. What happens to the maximum stress? | It doubles, because the bar overshoots its static extension | It stays the same as for a gradual load | It halves, because the load acts briefly | It becomes zero | Energy balance gives a peak extension twice the static value, so stress doubles.
NUM2#design-u09-29-q4@2: A rod carries 50 kN and stretches 1.0 mm. How much strain energy is stored, in J? | 25 | 1% | J | U = ½Pδ = 0.5 × 50,000 × 1.0 = 25,000 N mm = 25 J.
SA2#design-u09-29-q5@2,3: Explain why springs are made from high-strength steel, using the modulus of resilience. | The modulus of resilience, σ_{Y}^{2}/2E, gives the energy a material can store per unit volume without permanent deformation. Steels all have similar E, so a higher yield strength greatly increases stored energy (it rises with the square of yield strength). High-strength spring steels can therefore store and release more energy without taking a permanent set. | Formula ; Dependence on yield squared ; Similar E for steels ; No permanent set
`;
