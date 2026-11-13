// EngineerGradify Materials Science (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Atomic bonding in materials
LV: Year 1 · Foundation
S: The way atoms bond largely determines a material's properties. This lesson reviews ionic, covalent, metallic and secondary bonding, and links bond type to stiffness, melting point, conductivity and ductility.
O: Describe the main types of primary and secondary bonding
O: Relate bond type to material properties
O: Classify engineering materials by their dominant bonding
PRE: Normal stress and strain
H: Primary bonds
- **Ionic**: electrons transfer from metal to non-metal atoms, creating ions held by electrostatic attraction, as in sodium chloride and many ceramics such as magnesia. Strong, non-directional, but brittle.
- **Covalent**: atoms share electrons in directional bonds, as in diamond, silicon carbide and the backbones of polymer chains. Very strong and stiff.
- **Metallic**: valence electrons form a "sea" shared by all the positive ion cores. Non-directional, allowing atoms to slide, so metals are ductile and conduct electricity and heat.
H: Secondary bonds
P: **Van der Waals** forces and **hydrogen bonds** are much weaker. In thermoplastics, they hold separate polymer chains together, so these materials soften on heating and have low stiffness.
H: Bonding and properties
- **Stiffness (Young's modulus)**: depends on the steepness of the bond force–distance curve; covalent and ionic solids are stiff, polymers with secondary bonds are not.
- **Melting point**: rises with bond energy; tungsten and ceramics melt at very high temperatures.
- **Conductivity**: free electrons make metals conductors; ionic and covalent solids are usually insulators.
X: Comparing three materials.
> Diamond (covalent): E about 1,000 GPa, extremely hard, an electrical insulator.
> Steel (metallic): E about 210 GPa, ductile, a good conductor.
> Polyethylene (covalent chains, van der Waals between them): E about 0.2–1 GPa, soft, an insulator.
> The bonding explains a spread of stiffness of over three orders of magnitude.
K: Ionic, covalent and metallic bonds give materials their strength and stiffness, while weaker secondary bonds between polymer chains explain the low stiffness of many plastics; bond type links directly to melting point, conductivity and ductility.
!: Thinking polymers are weak because their chains are weak. The carbon–carbon backbone is strong; it is the secondary bonds between chains that are weak.
EV: established | Bond type is a primary determinant of elastic modulus and melting point.
EV: established | Many real materials have mixed bonding, such as partly ionic, partly covalent ceramics.
T: Metallic bond | Bonding in which valence electrons are shared among all ion cores
T: Covalent bond | A directional bond in which atoms share electron pairs
T: Van der Waals force | A weak secondary attraction between molecules
SUM: Ionic, covalent and metallic bonds are strong.
SUM: Secondary bonds hold polymer chains together.
SUM: Bonding explains stiffness, melting and conduction.
SRC: Callister W. D. and Rethwisch D. G., Materials Science and Engineering: An Introduction, 10th edition, Wiley | secondary | 2018
SRC: Ashby M. F. and Jones D. R. H., Engineering Materials 1, 4th edition, Butterworth-Heinemann | secondary | 2012
Q: Why are metals ductile? | Their non-directional metallic bonds let atoms slide past each other without breaking the material apart.
Q: Why do thermoplastics soften when heated? | The weak secondary bonds between their chains are overcome.
M1#engineering-u05-01-q1@1: Which bond type involves a "sea" of shared electrons? | Metallic bonding | Ionic bonding | Covalent bonding | Hydrogen bonding | Metals share valence electrons among all ion cores.
M2#engineering-u05-01-q2@2: Why are most ceramics electrical insulators? | Their ionic and covalent bonds hold electrons in place | They contain a sea of free electrons | Their atoms are held only by van der Waals forces | They have very low melting points | Without free electrons, charge cannot flow easily.
M3#engineering-u05-01-q3@3: A designer needs a material with high stiffness and a very high melting point for a furnace lining. Which bond type suggests a suitable class? | Strong ionic and covalent bonding, as in ceramics | Weak van der Waals bonding, as in thermoplastics | Metallic bonding in low-melting alloys | Hydrogen bonding, as in ice | Ceramics combine stiffness with high melting points.
MATCH1#engineering-u05-01-q4@1: Match each material to its dominant bonding. | Sodium chloride = Ionic ; Diamond = Covalent ; Copper = Metallic ; Between polyethylene chains = Van der Waals | Each bond type gives characteristic properties.
SA2#engineering-u05-01-q5@2,3: Explain how bonding explains the difference in stiffness between steel and polyethylene. | Steel's iron atoms are held by strong metallic bonds throughout, so stretching the material stretches strong bonds, giving a high modulus of about 210 GPa. Polyethylene has strong covalent bonds along each chain but only weak van der Waals forces between chains; under load, chains slide and straighten, stretching weak bonds, so its modulus is around 1 GPa or less. | Metallic bonding in steel ; Covalent chains ; Weak inter-chain bonds ; Resulting stiffness

## Crystal structures
LV: Year 1 · Intermediate
S: Most metals and many ceramics are crystalline, with atoms in regular repeating patterns. This lesson describes the body-centred cubic, face-centred cubic and hexagonal close-packed structures, packing factors and how structure affects ductility and density.
O: Describe BCC, FCC and HCP crystal structures
O: Calculate atoms per unit cell, packing factor and theoretical density
O: Relate crystal structure to ductility
PRE: Atomic bonding in materials
H: Common metallic structures
- **Body-centred cubic (BCC)**: atoms at the cube corners and one at the centre; 2 atoms per cell; coordination number 8; atomic packing factor (APF) 0.68. Examples: α-iron (ferrite), chromium, tungsten.
- **Face-centred cubic (FCC)**: atoms at the corners and face centres; 4 atoms per cell; coordination number 12; APF 0.74. Examples: aluminium, copper, nickel, γ-iron (austenite).
- **Hexagonal close-packed (HCP)**: coordination number 12; APF 0.74. Examples: magnesium, titanium, zinc.
H: Structure and ductility
P: Plastic deformation happens by **slip** on close-packed planes. FCC metals have many slip systems (12) on close-packed planes, so they are usually ductile even at low temperatures. HCP metals have fewer easily activated slip systems, so they tend to be less ductile. BCC metals can become brittle at low temperatures.
E: Theoretical density ρ = n A ÷ (V_{c} N_{A}) :: n atoms per cell, A atomic mass, V_{c} cell volume, N_{A} Avogadro's number
X: Calculating the density of copper (FCC).
> Atomic radius R = 0.128 nm; for FCC, a = 2√2 R = 0.362 nm.
> V_{c} = a^{3} = (0.362 × 10^{-7} cm)^{3} = 4.74 × 10^{-23} cm^{3}.
> ρ = 4 × 63.55 ÷ (4.74 × 10^{-23} × 6.022 × 10^{23}) = 254.2 ÷ 28.5 = 8.9 g/cm^{3}.
> The measured density is 8.96 g/cm^{3}, so the model agrees closely.
H: Polymorphism and amorphous solids
P: Some materials change structure with temperature: iron is BCC below 912 °C and FCC above it. **Amorphous** materials, such as glass, lack long-range order.
K: Metals mostly crystallise as BCC, FCC or HCP; FCC and HCP pack most densely, FCC has many slip systems and is ductile, and theoretical density follows from atoms per cell and cell size.
!: Assuming close-packed means ductile. HCP is as densely packed as FCC but has fewer active slip systems, so it is often less ductile.
EV: established | Iron's change from BCC to FCC at 912 °C underpins the heat treatment of steel.
EV: established | FCC metals such as aluminium and copper remain ductile at cryogenic temperatures.
T: Unit cell | The smallest repeating unit of a crystal lattice
T: Atomic packing factor | The fraction of a unit cell's volume occupied by atoms
T: Slip system | A combination of slip plane and slip direction on which dislocations move
SUM: BCC, FCC and HCP are the main metal structures.
SUM: FCC and HCP have APF 0.74; BCC 0.68.
SUM: Many slip systems make FCC ductile.
SRC: Callister W. D. and Rethwisch D. G., Materials Science and Engineering: An Introduction, 10th edition, Wiley | secondary | 2018
SRC: Ashby M. F. and Jones D. R. H., Engineering Materials 1, 4th edition, Butterworth-Heinemann | secondary | 2012
Q: How many atoms are in an FCC unit cell? | Four.
Q: At what temperature does iron change from BCC to FCC? | 912 °C.
M1#engineering-u05-02-q1@1: Which crystal structure does aluminium have? | Face-centred cubic | Body-centred cubic | Hexagonal close-packed | Amorphous | Aluminium is FCC, which helps explain its ductility.
M2#engineering-u05-02-q2@2: What is the atomic packing factor of a BCC structure? | 0.68 | 0.74 | 0.52 | 1.00 | Applying the standard result: BCC packs less densely than FCC or HCP.
M3#engineering-u05-02-q3@3: Why is magnesium generally less ductile than aluminium at room temperature? | HCP magnesium has fewer easily activated slip systems than FCC aluminium | Magnesium has a lower packing factor than BCC iron | Magnesium is amorphous | Aluminium has no slip systems | Ductility depends on available slip systems, not only packing.
NUM2#engineering-u05-02-q4@2: For FCC copper, n = 4, A = 63.55 g/mol, V_{c} = 4.74 × 10^{-23} cm^{3} and N_{A} = 6.022 × 10^{23}. What is the theoretical density, in g/cm^{3}? | 8.9 | 0.1 | g/cm³ | ρ = 254.2 ÷ (4.74 × 6.022) = 254.2 ÷ 28.5 = 8.9 g/cm^{3}.
SA2#engineering-u05-02-q5@2,3: Explain why FCC metals are usually more ductile than BCC or HCP metals. | Ductility depends on dislocations moving by slip on close-packed planes. FCC metals have 12 slip systems on close-packed {111} planes, so slip can occur easily in many orientations, even at low temperatures. HCP metals have fewer active slip systems, limiting deformation, and BCC metals need thermal activation for slip, so they can become brittle when cold. | Slip mechanism ; FCC slip systems ; HCP limitations ; BCC temperature dependence

## Defects and dislocations
LV: Year 1 · Intermediate
S: Real crystals contain defects that control their strength and ductility. This lesson classifies point, line and planar defects, explains dislocations and slip, and describes the main strengthening mechanisms, including the Hall–Petch relation.
O: Classify crystal defects as point, line, planar or volume defects
O: Explain how dislocations allow plastic deformation
O: Describe strengthening mechanisms and apply the Hall–Petch equation
PRE: Crystal structures
H: Types of defect
- **Point defects**: vacancies (missing atoms), interstitials (extra atoms between sites), substitutional impurity atoms.
- **Line defects**: **dislocations**, edge or screw.
- **Planar defects**: grain boundaries, twin boundaries, free surfaces.
- **Volume defects**: pores, cracks, inclusions.
H: Dislocations
P: In 1934, Taylor, Orowan and Polanyi independently proposed dislocations to explain why metals yield at stresses hundreds or thousands of times lower than the theoretical strength of a perfect crystal. A dislocation moves by breaking and remaking bonds one row at a time, like moving a ruck in a carpet, so slip needs far less force.
H: Strengthening mechanisms
P: Because plastic flow depends on dislocation motion, metals are strengthened by **obstructing** dislocations:
- **Work (strain) hardening**: deformation multiplies dislocations, which tangle.
- **Grain refinement**: grain boundaries block slip.
- **Solid solution strengthening**: impurity atoms distort the lattice.
- **Precipitation hardening**: fine particles pin dislocations, as in aerospace aluminium alloys.
E: Hall–Petch: σ_{y} = σ_{0} + k d^{-1/2} :: d grain diameter
X: Effect of grain size on yield strength.
> A steel has σ_{0} = 70 MPa and k = 0.74 MPa m^{1/2}.
> With a grain size d = 25 µm = 25 × 10^{-6} m, d^{-1/2} = 1 ÷ 0.005 = 200 m^{-1/2}.
> σ_{y} = 70 + 0.74 × 200 = 70 + 148 = 218 MPa.
> Reducing grain size to 6.25 µm doubles d^{-1/2} to 400, raising σ_{y} to 366 MPa.
K: Crystals contain point, line, planar and volume defects; dislocations make plastic flow possible at low stresses, and metals are strengthened by hindering dislocations through work hardening, grain refinement, solid solutions and precipitates.
!: Thinking defects only weaken materials. Controlled defects, such as fine grains and precipitates, are the main way metals are made stronger.
EV: established | Dislocation theory explains the gap between theoretical and actual yield strengths of metals.
EV: established | The Hall–Petch relation holds for conventional grain sizes but breaks down for very fine nanocrystalline grains.
T: Dislocation | A line defect whose movement allows plastic deformation
T: Grain boundary | The interface between crystals of different orientation
T: Work hardening | Strengthening of a metal by plastic deformation
SUM: Defects are point, line, planar or volume.
SUM: Dislocations enable slip at low stress.
SUM: Block dislocations to strengthen metals.
SRC: Hall E. O., "The deformation and ageing of mild steel: III. Discussion of results", Proceedings of the Physical Society B 64, 747–753 | primary | 1951
SRC: Petch N. J., "The cleavage strength of polycrystals", Journal of the Iron and Steel Institute 174, 25–28 | primary | 1953
Q: What is a dislocation? | A line defect in a crystal whose movement allows plastic deformation.
Q: Name two ways of strengthening a metal. | Two of: work hardening, grain refinement, solid solution strengthening, precipitation hardening.
M1#engineering-u05-03-q1@1: What type of defect is a vacancy? | A point defect | A line defect | A planar defect | A volume defect | Applying the standard result: A vacancy is a single missing atom.
M2#engineering-u05-03-q2@2: Why does cold rolling make a metal stronger? | It multiplies dislocations, which tangle and obstruct each other | It removes all dislocations from the metal | It enlarges the grains | It turns the metal amorphous | Work hardening raises dislocation density.
M3#engineering-u05-03-q3@3: Why do real metals yield at far lower stresses than a perfect crystal would? | Dislocations let slip occur by breaking bonds one row at a time | Real metals contain no bonds between atoms | Grain boundaries make metals weaker in every case | Vacancies carry the whole load | Dislocation motion needs much less stress than shearing whole planes at once.
NUM3#engineering-u05-03-q4@3: A steel has σ_{0} = 70 MPa, k = 0.74 MPa m^{1/2} and grain size 25 µm. What is its yield strength from Hall–Petch, in MPa? | 218 | 1% | MPa | d^{-1/2} = 200 m^{-1/2}; σ_{y} = 70 + 0.74 × 200 = 218 MPa.
SA2#engineering-u05-03-q5@2,3: Explain how grain refinement strengthens a metal. | Each grain has a different crystal orientation, so a dislocation reaching a grain boundary cannot easily continue into the next grain. Dislocations pile up at boundaries, and finer grains mean more boundaries and shorter slip distances, so more stress is needed to keep deformation going. The Hall–Petch relation expresses this: yield strength rises with the inverse square root of grain size. Grain refinement can also improve toughness. | Boundaries block slip ; Pile-ups ; Hall–Petch ; Toughness benefit

## Phase diagrams
LV: Year 1 · Intermediate
S: Phase diagrams map which phases exist in an alloy at each temperature and composition. This lesson explains how to read binary phase diagrams, use tie lines and the lever rule, and recognise isomorphous and eutectic systems.
O: Read phases and compositions from a binary phase diagram
O: Apply the lever rule to calculate phase fractions
O: Describe isomorphous and eutectic systems
PRE: Crystal structures
H: Reading a phase diagram
P: A binary phase diagram plots **temperature** against **composition** of two components. Lines separate regions where one phase (such as liquid L or solid α) or two phases coexist. The **liquidus** marks where solidification begins on cooling; the **solidus** where it is complete.
H: Tie lines and the lever rule
- In a two-phase region, draw a horizontal **tie line** at the temperature of interest.
- Its ends give the **compositions** of the two phases.
- The **lever rule** gives their **fractions**.
E: W_{L} = (C_{α} − C_{0}) ÷ (C_{α} − C_{L}); W_{α} = (C_{0} − C_{L}) ÷ (C_{α} − C_{L}) :: C_{0} overall composition
X: A copper–nickel alloy at 1250 °C.
> The alloy contains 35 wt% Ni; the tie line gives C_{L} = 32 wt% Ni and C_{α} = 43 wt% Ni.
> W_{L} = (43 − 35) ÷ (43 − 32) = 8 ÷ 11 = 0.73.
> W_{α} = (35 − 32) ÷ 11 = 0.27.
> So the alloy is 73% liquid and 27% solid α by mass at this temperature.
H: Types of system
- **Isomorphous**: complete solid solubility, as in Cu–Ni.
- **Eutectic**: a liquid transforms directly into two solids at one composition and temperature. The lead–tin system has a eutectic at 61.9 wt% Sn and 183 °C, used in traditional solders because they melt at a single, low temperature.
- **Eutectoid**: a solid transforms into two other solids, as in steel.
K: Binary phase diagrams show the phases present at each temperature and composition; tie lines give phase compositions and the lever rule gives their fractions; isomorphous, eutectic and eutectoid systems are the key types.
!: Reading phase fractions from the tie-line end nearest the alloy. In the lever rule, each phase's fraction is the length of the opposite arm divided by the total.
EV: established | Equilibrium phase diagrams are a central tool for designing alloys and heat treatments.
EV: established | Real cooling is often too fast for equilibrium, so actual microstructures can differ from those predicted.
T: Phase | A region of material with uniform structure and composition
T: Lever rule | A method for calculating phase fractions from a tie line
T: Eutectic | A reaction in which a liquid transforms into two solid phases at one temperature
SUM: Phase diagrams map temperature against composition.
SUM: Tie lines give compositions; the lever rule gives fractions.
SUM: Isomorphous, eutectic and eutectoid systems differ.
SRC: Callister W. D. and Rethwisch D. G., Materials Science and Engineering: An Introduction, 10th edition, Wiley | secondary | 2018
SRC: Porter D. A., Easterling K. E. and Sherif M. Y., Phase Transformations in Metals and Alloys, 3rd edition, CRC Press | secondary | 2009
Q: What does the lever rule calculate? | The mass fractions of two phases in a two-phase region.
Q: What is a eutectic reaction? | A liquid transforming into two solid phases at a single composition and temperature.
M1#engineering-u05-04-q1@1: What does the liquidus line on a phase diagram mark? | The temperature at which solidification begins on cooling | The temperature at which all solid melts and boils | The composition of pure copper | The point of maximum hardness | Above the liquidus the alloy is fully liquid.
M2#engineering-u05-04-q2@2: Why were eutectic lead–tin alloys used as solders? | They melt at a single, relatively low temperature | They have the highest melting point in the system | They never solidify fully | They contain no tin at all | The eutectic composition melts sharply at 183 °C.
M3#engineering-u05-04-q3@3: A tie line at one temperature gives C_{L} = 20%, C_{α} = 40% and the alloy is 30%. What are the phase fractions? | 50% liquid and 50% α | 75% liquid and 25% α | 25% liquid and 75% α | 100% α | W_{L} = (40 − 30) ÷ (40 − 20) = 0.5, so equal fractions.
NUM2#engineering-u05-04-q4@2: A Cu–Ni alloy with 35 wt% Ni has C_{L} = 32 wt% and C_{α} = 43 wt% at 1250 °C. What is the mass fraction of liquid? | 0.73 | 0.01 | fraction | W_{L} = (43 − 35) ÷ (43 − 32) = 8 ÷ 11 = 0.73.
SA2#engineering-u05-04-q5@2,3: Explain how to use a tie line and the lever rule. | At the temperature of interest, draw a horizontal tie line across the two-phase region to the phase boundaries. Read the compositions of the two phases where the line meets each boundary. The fraction of each phase is the length of the tie line on the opposite side of the alloy composition divided by the total length, so the phase closer to the alloy composition is more abundant. | Draw tie line ; Read compositions ; Opposite-arm rule ; Interpretation

## The iron–carbon system
LV: Year 1 · Advanced
S: Steel is the most important engineering alloy, and its properties depend on the iron–carbon phase diagram. This lesson describes the phases of steel, the eutectoid reaction that forms pearlite, and microstructures of hypoeutectoid and hypereutectoid steels.
O: Identify the main phases of the iron–carbon system
O: Describe the eutectoid reaction and the formation of pearlite
O: Calculate fractions of proeutectoid ferrite and pearlite
PRE: Phase diagrams
H: Phases
- **Ferrite (α)**: BCC iron, soft and ductile; dissolves at most 0.022 wt% C (at 727 °C).
- **Austenite (γ)**: FCC iron, stable at high temperature; dissolves up to 2.14 wt% C.
- **Cementite (Fe_{3}C)**: iron carbide with 6.70 wt% C, hard and brittle.
P: Steels contain less than about 2.14 wt% C; cast irons contain more, typically 2–4%.
H: The eutectoid reaction
P: At **727 °C** and **0.76 wt% C**, austenite transforms on slow cooling into **pearlite**: alternating thin layers of ferrite and cementite. Pearlite combines ferrite's ductility with cementite's hardness.
H: Hypo- and hypereutectoid steels
- **Hypoeutectoid** (below 0.76% C): **proeutectoid ferrite** forms first, then the remaining austenite becomes pearlite.
- **Hypereutectoid** (above 0.76% C): **proeutectoid cementite** forms at grain boundaries before pearlite.
X: A 0.40 wt% carbon steel cooled slowly to just below 727 °C.
> Use the lever rule between ferrite (0.022% C) and pearlite (0.76% C).
> Fraction of proeutectoid ferrite = (0.76 − 0.40) ÷ (0.76 − 0.022) = 0.36 ÷ 0.738 = 0.49.
> Fraction of pearlite = 0.51.
> More carbon means more pearlite, so higher strength and lower ductility.
K: Steel's phases are ferrite, austenite and cementite; at 727 °C and 0.76% C austenite forms pearlite; hypoeutectoid steels contain proeutectoid ferrite plus pearlite, and the lever rule gives their fractions.
!: Treating the equilibrium diagram as showing quenched microstructures. Rapid cooling forms martensite and bainite, which do not appear on the equilibrium diagram.
EV: established | The eutectoid composition and temperature of plain carbon steel are about 0.76 wt% C and 727 °C.
EV: established | Alloying elements shift the eutectoid temperature and composition.
T: Austenite | FCC iron, stable at high temperature, able to dissolve up to 2.14 wt% carbon
T: Pearlite | A layered mixture of ferrite and cementite formed by the eutectoid reaction
T: Cementite | The hard, brittle iron carbide Fe_{3}C
SUM: Ferrite, austenite and cementite.
SUM: Eutectoid at 727 °C and 0.76% C forms pearlite.
SUM: Carbon content controls the microstructure.
SRC: Callister W. D. and Rethwisch D. G., Materials Science and Engineering: An Introduction, 10th edition, Wiley | secondary | 2018
SRC: Bhadeshia H. K. D. H. and Honeycombe R. W. K., Steels: Microstructure and Properties, 4th edition, Butterworth-Heinemann | secondary | 2017
Q: What is pearlite? | A layered mixture of ferrite and cementite formed by the eutectoid reaction.
Q: What is the eutectoid composition of plain carbon steel? | About 0.76 wt% carbon.
M1#engineering-u05-05-q1@1: Which phase of iron is FCC? | Austenite | Ferrite | Cementite | Pearlite | Austenite is the FCC high-temperature phase.
M2#engineering-u05-05-q2@2: A steel contains 1.0 wt% carbon. What forms first on slow cooling below the austenite region? | Proeutectoid cementite | Proeutectoid ferrite | Martensite | Pure pearlite only | Above 0.76% C, cementite forms before pearlite.
M3#engineering-u05-05-q3@3: Why does increasing carbon from 0.2% to 0.6% make a slowly cooled steel stronger but less ductile? | It increases the fraction of hard pearlite and reduces soft ferrite | It removes cementite from the microstructure | It turns the steel into austenite at room temperature | It makes the steel amorphous | More carbon gives more pearlite, which contains hard cementite.
NUM3#engineering-u05-05-q4@3: A 0.40 wt% C steel is cooled slowly to just below 727 °C. Using 0.022% C for ferrite and 0.76% C for pearlite, what is the fraction of proeutectoid ferrite? | 0.49 | 0.01 | fraction | (0.76 − 0.40) ÷ (0.76 − 0.022) = 0.36 ÷ 0.738 = 0.49.
SA2#engineering-u05-05-q5@2,3: Describe the microstructure of a slowly cooled hypoeutectoid steel and how it forms. | As a hypoeutectoid steel cools into the two-phase region, proeutectoid ferrite nucleates at austenite grain boundaries, and the remaining austenite becomes richer in carbon. At 727 °C, this austenite, now at the eutectoid composition of 0.76% C, transforms to pearlite. The final microstructure is grains of ferrite surrounded by pearlite colonies, in proportions given by the lever rule. | Proeutectoid ferrite ; Carbon enrichment ; Eutectoid transformation ; Final structure

## The tensile test
LV: Year 1 · Foundation
S: The tensile test is the most widely used mechanical test of materials. This lesson describes the test, the stress–strain curve, and how to extract Young's modulus, yield strength, tensile strength, elongation and reduction of area.
O: Describe the tensile test procedure and specimen
O: Interpret an engineering stress–strain curve
O: Calculate tensile properties from test data
PRE: Hooke's law and elastic constants
H: The test
P: A standard specimen with a known gauge length and cross-section is pulled in a testing machine at a controlled rate until it breaks, while load and extension are recorded. In the UK and Europe, metallic tensile testing follows **BS EN ISO 6892-1**.
H: The stress–strain curve
- **Elastic region**: stress is proportional to strain; the slope is **Young's modulus E**.
- **Yield**: plastic deformation begins. Where there is no sharp yield point, the **0.2% proof stress** (offset method) is used.
- **Strain hardening**: stress rises with further plastic strain.
- **Ultimate tensile strength (UTS)**: the maximum engineering stress; after this, **necking** begins.
- **Fracture**: the specimen breaks.
H: Ductility
E: Elongation = (L_{f} − L_{0}) ÷ L_{0} × 100%; Reduction of area = (A_{0} − A_{f}) ÷ A_{0} × 100%
X: Analysing a steel test.
> Diameter 10 mm, so A_{0} = π × 5^{2} = 78.5 mm^{2}; gauge length 50 mm.
> The maximum load is 35 kN: UTS = 35,000 ÷ 78.5 = 446 MPa.
> After fracture the gauge length is 62 mm: elongation = 12 ÷ 50 × 100 = 24%.
> High elongation indicates a ductile steel that will give warning before failure.
H: Engineering and true stress
P: **Engineering stress** uses the original area; **true stress** uses the actual, shrinking area. After necking, true stress keeps rising even though the engineering curve falls.
K: The tensile test gives Young's modulus, yield or proof stress, UTS, elongation and reduction of area; the engineering curve falls after necking because it uses the original area.
!: Designing to the ultimate tensile strength. Most structural design uses the yield or proof stress, with safety factors, to avoid permanent deformation.
EV: established | BS EN ISO 6892-1 is the standard for tensile testing of metals at room temperature.
EV: established | The 0.2% proof stress is used for materials without a distinct yield point, such as aluminium alloys.
T: Proof stress | The stress at which a specified plastic strain, usually 0.2%, occurs
T: Ultimate tensile strength | The maximum engineering stress in a tensile test
T: Necking | Local reduction in cross-section after the UTS is reached
SUM: E, yield, UTS and ductility come from one test.
SUM: Use proof stress where there is no yield point.
SUM: Engineering stress falls after necking.
SRC: BSI, BS EN ISO 6892-1: Metallic materials, Tensile testing, Method of test at room temperature | standard | 2019
SRC: Callister W. D. and Rethwisch D. G., Materials Science and Engineering: An Introduction, 10th edition, Wiley | secondary | 2018
Q: What is the 0.2% proof stress? | The stress at which 0.2% plastic strain occurs, used where there is no clear yield point.
Q: Why does the engineering stress–strain curve fall after the UTS? | Necking reduces the cross-section, but engineering stress uses the original area.
M1#engineering-u05-06-q1@1: What does the slope of the elastic region of a stress–strain curve give? | Young's modulus | The ultimate tensile strength | The elongation | The hardness | Stress divided by strain in the elastic region is E.
M2#engineering-u05-06-q2@2: A specimen of original area 50 mm^{2} fails at a maximum load of 20 kN. What is its UTS? | 400 MPa | 40 MPa | 1,000 MPa | 2.5 MPa | Applying the standard result: 20,000 N ÷ 50 mm^{2} = 400 MPa.
M3#engineering-u05-06-q3@3: Two steels have the same UTS, but one has 5% elongation and the other 30%. Which is better for a car crumple zone, and why? | The 30% steel, as it absorbs more energy by deforming plastically | The 5% steel, as it will not deform at all | Both are identical in a crash | Neither, as elongation has no effect on energy | Ductile steels absorb crash energy through plastic deformation.
NUM2#engineering-u05-06-q4@2: A 50 mm gauge length measures 62 mm after fracture. What is the percentage elongation? | 24 | 0.5 | % | (62 − 50) ÷ 50 × 100 = 24%.
SA2#engineering-u05-06-q5@2,3: Explain why designers usually use yield strength rather than UTS. | Above the yield strength, a component deforms permanently, which for most structures and machines is already a failure: parts no longer fit or function. The UTS is reached only after substantial plastic deformation. Designing to yield, with a safety factor, keeps components elastic in service, while the margin between yield and UTS provides warning and energy absorption in overload. | Permanent deformation as failure ; UTS after plasticity ; Safety factor ; Margin as reserve

## Hardness and impact testing
LV: Year 1 · Intermediate
S: Hardness and impact tests are quick, practical measures of a material's resistance to indentation and to sudden loading. This lesson covers Brinell, Vickers and Rockwell hardness, the Charpy impact test, and the ductile-to-brittle transition.
O: Describe the main hardness tests and calculate a Vickers hardness
O: Explain the Charpy impact test and what it measures
O: Explain the ductile-to-brittle transition and its engineering significance
PRE: The tensile test
H: Hardness tests
- **Brinell**: a hard ball pressed into the surface; hardness from load and indent diameter.
- **Vickers**: a diamond pyramid; suitable for all metals and thin sections.
- **Rockwell**: measures depth of penetration; fast, widely used in production.
P: Hardness correlates with strength: for many steels, UTS in MPa is roughly 3.45 times the Brinell hardness.
E: HV = 1.854 F ÷ d^{2} :: F load in kgf, d mean diagonal of the indent in mm
X: A Vickers test.
> A load of 30 kgf produces an indent with a mean diagonal of 0.40 mm.
> HV = 1.854 × 30 ÷ 0.40^{2} = 55.62 ÷ 0.16 = 348.
> The hardness is 348 HV30.
> This is typical of a hardened and tempered medium-carbon steel.
H: The Charpy impact test
P: A notched bar is struck by a swinging pendulum, and the energy absorbed in breaking it is measured, under **BS EN ISO 148-1**. It indicates toughness under sudden loading.
H: The ductile-to-brittle transition
P: Many BCC metals, including ferritic steels, become brittle below a transition temperature. Several Second World War Liberty ships cracked in two in cold seas, partly because their steel became brittle at low temperatures. Structural steels such as S355 are specified with Charpy energies at set temperatures, for example 27 J at −20 °C for grade J2.
K: Hardness tests measure resistance to indentation and correlate with strength; the Charpy test measures impact toughness, revealing a ductile-to-brittle transition in many steels that must be considered for low-temperature service.
!: Assuming a strong steel is always tough. Toughness can fall sharply at low temperatures, even if strength is unchanged.
EV: established | Charpy testing at specified temperatures is required for structural steels under BS EN 10025.
EV: established | FCC metals such as aluminium and austenitic stainless steel do not show a sharp ductile-to-brittle transition.
T: Hardness | Resistance of a material to permanent indentation
T: Charpy test | An impact test measuring energy absorbed in breaking a notched specimen
T: Ductile-to-brittle transition | The fall in toughness of some metals as temperature decreases
SUM: Brinell, Vickers and Rockwell measure hardness.
SUM: Charpy measures impact toughness.
SUM: Many steels become brittle when cold.
SRC: BSI, BS EN ISO 6507-1: Metallic materials, Vickers hardness test, Test method | standard | 2018
SRC: BSI, BS EN ISO 148-1: Metallic materials, Charpy pendulum impact test, Test method | standard | 2016
Q: What does the Charpy test measure? | The energy absorbed in breaking a notched specimen under impact.
Q: Which type of crystal structure commonly shows a ductile-to-brittle transition? | Body-centred cubic, as in ferritic steels.
M1#engineering-u05-07-q1@1: Which hardness test uses a diamond pyramid indenter? | Vickers | Brinell | Charpy | Izod | The Vickers test uses a square-based diamond pyramid.
M2#engineering-u05-07-q2@2: A steel has a Brinell hardness of 200 HB. Roughly what is its UTS? | About 690 MPa | About 200 MPa | About 58 MPa | About 2,000 MPa | UTS ≈ 3.45 × 200 = 690 MPa for many steels.
M3#engineering-u05-07-q3@3: A steel structure will operate at −30 °C in the North Sea. What should the specification include? | A minimum Charpy energy at or below the service temperature | Only the room-temperature UTS | Only the Vickers hardness | No toughness requirement | The steel must stay tough at the lowest service temperature.
NUM2#engineering-u05-07-q4@2: A 30 kgf Vickers load gives a mean diagonal of 0.40 mm. What is the hardness, in HV? | 348 | 1% | HV | HV = 1.854 × 30 ÷ 0.16 = 348.
SA2#engineering-u05-07-q5@2,3: Explain the ductile-to-brittle transition and why it matters for structures. | In BCC metals such as ferritic steel, dislocation motion becomes more difficult at low temperatures, so the material may fracture by cleavage with little energy absorbed instead of deforming plastically. Above the transition temperature, fracture is ductile and absorbs much energy. Structures operating in cold conditions, such as ships, bridges and pipelines, need steels with adequate Charpy toughness at service temperatures to avoid sudden brittle failure. | Mechanism ; Brittle versus ductile ; Example ; Specification

## Fracture and fracture toughness
LV: Year 1 · Advanced
S: Cracks concentrate stress, and fracture mechanics predicts when they will grow. This lesson covers Griffith's theory, the stress intensity factor, fracture toughness, and their use in damage-tolerant design.
O: Explain why cracks reduce strength through stress concentration
O: Calculate the stress intensity factor and critical crack size
O: Explain how fracture toughness is used in damage-tolerant design
PRE: The tensile test
H: Why cracks matter
P: A sharp crack concentrates stress at its tip. A. A. Griffith (1921) showed that brittle materials fail when the energy released by crack growth exceeds the energy needed to create new surfaces, explaining why glass breaks at far lower stresses than its theoretical strength.
H: Stress intensity factor
E: K = Y σ √(π a) :: Y geometry factor, σ applied stress, a crack length (or half-length for an internal crack)
P: Fracture occurs when K reaches the material's **fracture toughness**, K_{Ic}. Typical K_{Ic} values: glass about 0.7 MPa m^{1/2}; aluminium alloys 20–45; structural steels 50–150.
X: Critical stress for a cracked steel plate.
> K_{Ic} = 50 MPa m^{1/2}; Y = 1; crack length a = 2 mm = 0.002 m.
> σ_{c} = K_{Ic} ÷ (Y √(π a)) = 50 ÷ √(π × 0.002).
> √(0.00628) = 0.0793, so σ_{c} = 50 ÷ 0.0793 = 631 MPa.
> If the crack grows to 8 mm, σ_{c} halves to about 315 MPa.
H: Damage-tolerant design
P: Rather than assuming components are flawless, **damage-tolerant design** assumes cracks exist, calculates the critical crack size and sets **inspection intervals** so cracks are found before they become critical. Aircraft structures are designed and maintained this way.
K: Cracks concentrate stress; fracture occurs when the stress intensity K = Yσ√(πa) reaches the fracture toughness K_{Ic}; damage-tolerant design uses this to set safe crack sizes and inspection intervals.
!: Using UTS alone to judge a cracked component. A material with high strength but low toughness can fail at low stress if a crack is present.
EV: established | Linear elastic fracture mechanics is the standard basis for assessing cracks in components.
EV: established | Damage-tolerant design is required for civil aircraft structures.
T: Stress intensity factor | A measure of the stress field at a crack tip, K = Yσ√(πa)
T: Fracture toughness | The critical stress intensity at which a crack grows unstably, K_{Ic}
T: Damage-tolerant design | Design that assumes cracks exist and ensures they are found before becoming critical
SUM: Cracks concentrate stress.
SUM: Fracture when K reaches K_{Ic}.
SUM: Inspect before cracks become critical.
SRC: Griffith A. A., "The phenomena of rupture and flow in solids", Philosophical Transactions of the Royal Society A 221, 163–198 | primary | 1921
SRC: Anderson T. L., Fracture Mechanics: Fundamentals and Applications, 4th edition, CRC Press | secondary | 2017
Q: What is fracture toughness? | The critical stress intensity factor at which a crack grows unstably.
Q: How does critical stress change if crack length increases fourfold? | It halves, since σ_{c} is proportional to 1/√a.
M1#engineering-u05-08-q1@1: Who developed the energy theory of brittle fracture in 1921? | A. A. Griffith | Robert Hooke | Thomas Young | Leonhard Euler | Griffith explained why brittle materials fail below their theoretical strength.
M2#engineering-u05-08-q2@2: Which material typically has the lowest fracture toughness? | Glass | Structural steel | Aluminium alloy | Titanium alloy | Glass has K_{Ic} of about 0.7 MPa m^{1/2}.
M3#engineering-u05-08-q3@3: An aircraft panel has a known crack. What does damage-tolerant design require? | Inspection intervals short enough to find the crack before it reaches critical size | Replacing every panel at the first sign of any mark | Ignoring cracks below the visible limit forever | Increasing the load to test the panel | Damage tolerance relies on knowing crack growth and inspecting in time.
NUM3#engineering-u05-08-q4@3: A steel has K_{Ic} = 50 MPa m^{1/2}, Y = 1 and a crack of a = 2 mm. What is the critical stress, in MPa? | 631 | 1% | MPa | σ_{c} = 50 ÷ √(π × 0.002) = 50 ÷ 0.0793 = 631 MPa.
SA2#engineering-u05-08-q5@2,3: Explain why a high-strength material can be more vulnerable to cracks than a lower-strength one. | Fracture of a cracked component depends on fracture toughness, not strength alone. High-strength alloys often have lower toughness, so the critical crack size, a_{c} = (K_{Ic}/Yσ)^{2}/π, is smaller, especially as they are used at higher stresses. A lower-strength, tougher material tolerates larger cracks and gives more warning by yielding before fracture. | Toughness governs ; Strength–toughness trade-off ; Critical crack size ; Warning by yielding

## Fatigue
LV: Year 1 · Advanced
S: Most mechanical failures in service are caused by fatigue: cracks that grow under repeated loading at stresses below yield. This lesson covers S–N curves, endurance limits, mean stress effects, Miner's rule and famous fatigue failures.
O: Explain the mechanism of fatigue failure
O: Interpret S–N curves and apply the Goodman relation
O: Apply Miner's rule to variable-amplitude loading
PRE: Fracture and fracture toughness
H: Mechanism
- **Initiation**: cracks start at stress concentrations, such as holes, corners, scratches and welds.
- **Propagation**: the crack grows a little with each cycle, leaving **beach marks** on the fracture surface.
- **Final fracture**: when the remaining section can no longer carry the load.
H: S–N curves
P: Tests at different stress amplitudes give an **S–N curve** (stress against number of cycles to failure). Many steels have an **endurance (fatigue) limit**, often about half the UTS, below which they survive indefinitely. Aluminium alloys have no clear limit, so a fatigue strength at a set number of cycles is used.
E: Goodman: σ_{a} ÷ S_{e} + σ_{m} ÷ σ_{UTS} = 1 :: σ_{a} alternating stress, σ_{m} mean stress, S_{e} endurance limit
X: Allowing for mean stress.
> A steel has UTS 600 MPa and endurance limit 300 MPa; the mean stress is 150 MPa.
> σ_{a} = 300 × (1 − 150 ÷ 600) = 300 × 0.75 = 225 MPa.
> The allowable alternating stress falls from 300 to 225 MPa.
> Under Miner's rule, a part that has used 20,000 of 100,000 cycles at one level and 30,000 of 50,000 at another has used 0.2 + 0.6 = 0.8 of its life.
H: Famous failures
P: Fatigue caused the 1842 Versailles railway accident (axle failure), the 1954 de Havilland Comet crashes (cracks from window corners in the pressurised cabin) and the 2000 Hatfield rail crash (rolling contact fatigue cracks in the rail). Each changed design and inspection practice.
K: Fatigue cracks start at stress concentrations and grow with each load cycle below yield; S–N curves, endurance limits, the Goodman relation and Miner's rule are used to design against it.
!: Assuming loads below yield are always safe. Repeated loading well below yield can cause fatigue failure.
EV: established | Fatigue is the most common cause of mechanical failure in service.
EV: contested | Miner's linear damage rule is widely used but can be unconservative when load sequences vary.
T: Fatigue | Progressive cracking under repeated loading below the static strength
T: Endurance limit | The stress amplitude below which some materials survive indefinitely
T: Miner's rule | A rule summing fractional damage from different stress levels
SUM: Cracks initiate at stress concentrations.
SUM: S–N curves, Goodman and Miner guide design.
SUM: Fatigue has caused major disasters.
SRC: Miner M. A., "Cumulative damage in fatigue", Journal of Applied Mechanics 12, A159–A164 | primary | 1945
SRC: Ministry of Aviation, Report of the Court of Inquiry into the Accidents to Comet G-ALYP and Comet G-ALYY, HMSO | primary | 1955
Q: Where do fatigue cracks usually start? | At stress concentrations such as holes, corners, scratches and welds.
Q: What is the endurance limit? | The stress amplitude below which some materials survive an indefinite number of cycles.
M1#engineering-u05-09-q1@1: What marks on a fatigue fracture surface show crack progression? | Beach marks | Necking marks | Shear lips only | Charpy notches | Beach marks record stages of crack growth.
M2#engineering-u05-09-q2@2: Why do aluminium alloys use fatigue strength at a set number of cycles? | They have no clear endurance limit | They never fail by fatigue | Their S–N curves are perfectly flat | They are only used in static structures | Aluminium keeps weakening with more cycles.
M3#engineering-u05-09-q3@3: What design lesson came from the Comet airliner crashes? | Stress concentrations at cabin window corners can start fatigue cracks under pressurisation cycles | Aluminium should never be used in aircraft | Pressurised cabins are inherently unsafe | Fatigue only affects engines | The square-cornered openings concentrated stress; later designs used rounded windows.
NUM3#engineering-u05-09-q4@2: A steel has UTS 600 MPa and endurance limit 300 MPa, with a mean stress of 150 MPa. Using Goodman, what is the allowable alternating stress, in MPa? | 225 | 1% | MPa | σ_{a} = 300 × (1 − 150 ÷ 600) = 225 MPa.
SA2#engineering-u05-09-q5@2,3: Explain how engineers can improve the fatigue life of a component. | Reduce stress concentrations with generous fillet radii and smooth transitions; improve surface finish and avoid scratches; introduce compressive residual stresses by shot peening or rolling; reduce stress range or mean stress; choose materials with higher fatigue strength; and inspect regularly for cracks in damage-tolerant designs. | Geometry ; Surface finish ; Residual stress ; Inspection and materials

## Creep
LV: Year 1 · Intermediate
S: At high temperatures, materials deform slowly under constant load. This lesson explains the stages of creep, the temperatures at which it matters, the Larson–Miller parameter, and creep-resistant materials.
O: Describe the three stages of a creep curve
O: Explain when creep becomes significant
O: Use the Larson–Miller parameter to relate time and temperature
PRE: Defects and dislocations
H: When creep matters
P: **Creep** is time-dependent plastic deformation under constant stress. It becomes significant above about **0.4 times the absolute melting temperature** (T/T_{m} > 0.4). For steel this means several hundred degrees Celsius; for lead (T_{m} = 600 K), room temperature (about 300 K) is already 0.5 T_{m}, which is why old lead roofs and pipes sag.
H: The creep curve
- **Primary creep**: the strain rate decreases as the material work hardens.
- **Secondary (steady-state) creep**: a roughly constant rate, balancing hardening and recovery; used for design.
- **Tertiary creep**: the rate accelerates as voids and necking develop, leading to rupture.
H: Time and temperature
E: Larson–Miller parameter P = T (C + log_{10} t) :: T in kelvin, t in hours, C ≈ 20 for many metals
X: Using the Larson–Miller parameter.
> A component operates at 800 K for a design life of 10,000 hours.
> P = 800 × (20 + log_{10} 10,000) = 800 × (20 + 4) = 19,200.
> The stress that gives rupture at P = 19,200 is read from the material's master curve.
> Short tests at higher temperatures can estimate long-term behaviour at lower temperatures with the same P.
H: Creep-resistant materials
P: Jet engine turbine blades use **nickel-based superalloys**, strengthened by fine precipitates, often cast as **single crystals** to remove grain boundaries, where creep is concentrated. Ceramics and refractory metals also resist creep.
K: Creep is slow plastic deformation at high homologous temperatures, with primary, secondary and tertiary stages; the Larson–Miller parameter links time and temperature, and superalloys resist creep with precipitates and single-crystal structures.
!: Assuming creep only happens at very high temperatures. It depends on temperature relative to melting point, so low-melting materials such as lead and many polymers creep at room temperature.
EV: established | Creep becomes significant above roughly 0.4 of the absolute melting temperature.
EV: contested | Extrapolating short-term creep tests to service lives of decades carries significant uncertainty.
T: Creep | Time-dependent plastic deformation under constant load
T: Homologous temperature | The ratio of temperature to melting temperature, both in kelvin
T: Superalloy | A high-temperature alloy, often nickel-based, designed to resist creep
SUM: Creep matters above about 0.4 T_{m}.
SUM: Primary, secondary and tertiary stages.
SUM: Superalloys and single crystals resist creep.
SRC: Larson F. R. and Miller J., "A time-temperature relationship for rupture and creep stresses", Transactions of the ASME 74, 765–775 | primary | 1952
SRC: Ashby M. F. and Jones D. R. H., Engineering Materials 1, 4th edition, Butterworth-Heinemann | secondary | 2012
Q: Above roughly what homologous temperature does creep become significant? | About 0.4 of the absolute melting temperature.
Q: Which stage of creep is used for design? | Secondary (steady-state) creep.
M1#engineering-u05-10-q1@1: In which stage of creep does the strain rate accelerate towards rupture? | Tertiary | Primary | Secondary | Elastic | Voids and necking accelerate deformation.
M2#engineering-u05-10-q2@2: Why do lead roofs creep at room temperature? | Room temperature is about half of lead's absolute melting temperature | Lead has a very high melting point | Lead is a ceramic material | Lead is always under impact loading | T/T_{m} ≈ 300/600 = 0.5, above the creep threshold.
M3#engineering-u05-10-q3@3: Why are some turbine blades cast as single crystals? | Removing grain boundaries greatly reduces creep | Single crystals are cheaper to make | Single crystals have lower melting points | Grain boundaries increase creep resistance | Grain boundaries are sites of creep deformation and damage.
NUM2#engineering-u05-10-q4@3: A component operates at 800 K for 10,000 hours. With C = 20, what is the Larson–Miller parameter? | 19200 | 1% | parameter | P = 800 × (20 + 4) = 19,200.
SA2#engineering-u05-10-q5@2,3: Explain the three stages of a creep curve. | In primary creep, the strain rate is initially high but decreases as dislocations multiply and the material work hardens. In secondary creep, hardening is balanced by recovery, so the strain rate is roughly constant; this is the longest stage and is used in design. In tertiary creep, voids form at grain boundaries and the section necks, so the strain rate accelerates until rupture. | Primary ; Secondary ; Tertiary ; Design use

## Corrosion and degradation
LV: Year 1 · Intermediate
S: Corrosion and degradation cost economies trillions each year. This lesson explains electrochemical corrosion, the galvanic series, the main forms of corrosion, and methods of protection, plus degradation of polymers and concrete.
O: Explain electrochemical corrosion and the galvanic series
O: Identify common forms of corrosion
O: Select appropriate methods of corrosion protection
PRE: Atomic bonding in materials
H: Electrochemical corrosion
P: Corrosion of metals in water is an **electrochemical cell**: an **anode** where metal dissolves (Fe → Fe^{2+} + 2e^{-}), a **cathode** where oxygen or hydrogen ions are reduced, an **electrolyte**, and an electrical connection. Rust forms as iron ions react with oxygen and water.
H: The galvanic series
P: When two different metals are in contact in an electrolyte, the more **anodic** (active) metal corrodes faster. In seawater, zinc and aluminium are more anodic than steel; copper and stainless steel are more cathodic. A small anode connected to a large cathode corrodes especially fast.
H: Forms of corrosion
- **Uniform** corrosion over the surface.
- **Galvanic** corrosion between dissimilar metals.
- **Pitting** and **crevice** corrosion: local attack, dangerous because it is hidden.
- **Stress corrosion cracking**: combined stress and corrosive environment.
H: Protection
- **Coatings**: paint, polymer and metallic coatings.
- **Galvanising**: zinc coating that corrodes sacrificially.
- **Cathodic protection**: sacrificial anodes or impressed current, used on ships, pipelines and offshore structures.
- **Stainless steel**: at least about 10.5% chromium forms a protective passive oxide film.
- **Design**: avoid crevices and water traps, and isolate dissimilar metals.
X: Protecting a steel pipeline.
> A buried steel pipeline is coated with a polymer layer.
> Defects in the coating would expose steel to the soil.
> Sacrificial magnesium anodes or an impressed current protect exposed steel.
> Regular monitoring checks the protection potential.
H: Other degradation
P: Polymers degrade under **ultraviolet light** and heat; concrete suffers **carbonation** and **chloride attack**, which corrode reinforcing steel. The NACE IMPACT study (2016) estimated the global cost of corrosion at about US$2.5 trillion a year, around 3.4% of world GDP.
K: Corrosion is electrochemical, faster for more anodic metals and in dissimilar-metal contact; it takes uniform, galvanic, pitting and stress-corrosion forms, and is controlled by coatings, galvanising, cathodic protection, alloy choice and design.
!: Joining a small steel fastener to a large copper sheet in a wet environment. The small anode corrodes rapidly; fasteners should be the more noble metal, or the metals isolated.
EV: established | Corrosion costs an estimated few per cent of GDP in industrial economies.
EV: established | Stainless steels rely on a chromium oxide passive film, which can break down in chloride environments.
T: Anode | The electrode where oxidation, and so metal loss, occurs
T: Galvanic corrosion | Accelerated corrosion of the more active metal in a dissimilar-metal couple
T: Cathodic protection | Making a structure the cathode of a cell to prevent its corrosion
SUM: Corrosion is an electrochemical cell.
SUM: More anodic metals corrode in couples.
SUM: Coat, galvanise, protect cathodically and design well.
SRC: Koch G. et al., International Measures of Prevention, Application, and Economics of Corrosion Technologies Study (IMPACT), NACE International | data | 2016
SRC: Callister W. D. and Rethwisch D. G., Materials Science and Engineering: An Introduction, 10th edition, Wiley | secondary | 2018
Q: What are the four parts of a corrosion cell? | An anode, a cathode, an electrolyte and an electrical connection.
Q: How does galvanising protect steel? | The zinc coating corrodes sacrificially in place of the steel.
M1#engineering-u05-11-q1@1: At which electrode does metal dissolve during corrosion? | The anode | The cathode | The electrolyte | The reference electrode | Applying the standard result: Oxidation of metal occurs at the anode.
M2#engineering-u05-11-q2@2: Steel bolts are used to fix copper sheeting on a roof. What is the likely problem? | Galvanic corrosion of the steel bolts | Corrosion of the copper only | No corrosion, as metals protect each other | The copper becomes stronger | Steel is anodic to copper and, as a small anode, corrodes fast.
M3#engineering-u05-11-q3@3: Why is pitting corrosion especially dangerous? | Deep local attack can penetrate a wall with little visible surface loss | It always spreads evenly and is easy to see | It only affects plastics | It improves the strength of the metal | Pits can cause leaks or cracks while the surface looks sound.
MATCH1#engineering-u05-11-q4@1: Match each protection method to its principle. | Galvanising = Sacrificial zinc coating ; Cathodic protection = Making the structure the cathode ; Stainless steel = Passive chromium oxide film ; Painting = Barrier to the electrolyte | Each method interrupts the corrosion cell differently.
SA2#engineering-u05-11-q5@2,3: Explain how cathodic protection prevents corrosion of a steel structure. | Corrosion occurs where steel acts as an anode. Cathodic protection makes the whole structure a cathode, either by connecting it to sacrificial anodes of a more active metal, such as zinc or magnesium, which corrode instead, or by applying an impressed current from a power source. Electrons flow to the steel, so oxidation of iron is suppressed. It is used on ships, pipelines and offshore platforms. | Steel as anode ; Making it the cathode ; Sacrificial and impressed current ; Applications

## Metals and alloys
LV: Year 1 · Foundation
S: Metals are the backbone of engineering because they combine strength, toughness and formability. This lesson surveys ferrous alloys (carbon steels, cast irons, stainless steels) and key non-ferrous alloys of aluminium, titanium and copper.
O: Classify carbon steels, cast irons and stainless steels
O: Describe the main non-ferrous engineering alloys and their uses
O: Compare alloys using specific properties
PRE: The iron–carbon system
H: Ferrous alloys
- **Low-carbon steels** (below about 0.25% C): ductile, weldable, cheap; car bodies, structural sections.
- **Medium-carbon steels** (0.25–0.6% C): stronger, heat-treatable; shafts, gears.
- **High-carbon steels** (above 0.6% C): hard and wear-resistant; tools, springs.
- **Cast irons** (2–4% C): castable, good in compression; grey iron for engine blocks, ductile iron for pipes.
- **Stainless steels**: at least about 10.5% chromium. **Austenitic** grade 304 (about 18% Cr, 8% Ni) is common in kitchens and chemical plant.
H: Non-ferrous alloys
- **Aluminium** (density 2.7 g/cm^{3}): light, corrosion-resistant; 6xxx alloys for extrusions, 7xxx precipitation-hardened alloys for aircraft.
- **Titanium** (4.5 g/cm^{3}): high strength-to-weight and corrosion resistance; Ti-6Al-4V for aerospace and medical implants.
- **Copper** alloys: excellent conductivity; **brass** (Cu–Zn) and **bronze** (Cu–Sn).
- **Nickel** superalloys for high-temperature use.
X: Comparing specific stiffness (E ÷ ρ).
> Steel: 210 GPa ÷ 7.85 g/cm^{3} = 26.8.
> Aluminium: 70 ÷ 2.7 = 25.9.
> Titanium: 115 ÷ 4.5 = 25.6.
> Specific stiffness is similar, so lightness comes from using less volume where stiffness per weight is not the limit, or from other indices.
P: Alloy choice is a balance of performance, cost and processing: steel is by far the cheapest per tonne, aluminium costs several times more, and titanium many times more again, so titanium is reserved for applications where its strength-to-weight and corrosion resistance justify the cost.
K: Steels are classified by carbon content and alloying, cast irons by high carbon, stainless steels by chromium; aluminium, titanium and copper alloys offer lightness, specific strength, corrosion resistance or conductivity.
!: Assuming aluminium is always lighter for the same stiffness. For a simple tie, steel, aluminium and titanium have almost the same stiffness per unit mass.
EV: established | Steel remains the most widely used engineering metal by tonnage.
EV: established | Most common engineering metals have similar specific stiffness, about 25–27 GPa per g/cm^{3}.
T: Alloy | A metal made by combining a base metal with other elements
T: Stainless steel | A steel containing at least about 10.5% chromium, forming a passive oxide film
T: Specific stiffness | Young's modulus divided by density
SUM: Steels are classified by carbon and alloy content.
SUM: Aluminium, titanium and copper alloys have distinct strengths.
SUM: Specific properties compare alloys fairly.
SRC: Ashby M. F. and Jones D. R. H., Engineering Materials 1, 4th edition, Butterworth-Heinemann | secondary | 2012
SRC: BSI, BS EN 10088-1: Stainless steels, List of stainless steels | standard | 2014
Q: What minimum chromium content defines a stainless steel? | About 10.5%.
Q: What is brass? | An alloy of copper and zinc.
M1#engineering-u05-12-q1@1: Which steel is best suited to a weldable structural beam? | Low-carbon steel | High-carbon tool steel | Grey cast iron | Martensitic stainless steel | Low-carbon steel is ductile and easily welded.
M2#engineering-u05-12-q2@2: Why is titanium used for hip implants? | It is strong, light, corrosion-resistant and biocompatible | It is the cheapest engineering metal | It is the stiffest metal available | It conducts electricity better than copper | Its combination of properties suits the body.
M3#engineering-u05-12-q3@3: A designer switches a stiffness-limited tie rod from steel to aluminium to save weight. What is likely? | Little weight saving, as both have similar stiffness per unit mass | A large weight saving of about two-thirds | The aluminium rod will be much stiffer | The aluminium rod will be heavier | E/ρ is nearly the same, so equal stiffness needs similar mass.
NUM2#engineering-u05-12-q4@3: Steel has E = 210 GPa and ρ = 7.85 g/cm^{3}. What is its specific stiffness, in GPa per g/cm^{3}? | 26.8 | 1% | GPa/(g/cm³) | Specific stiffness = E ÷ ρ = 210 ÷ 7.85 = 26.8.
SA2#engineering-u05-12-q5@2,3: Compare low-carbon steel and aluminium alloys for a car body. | Low-carbon steel is cheap, strong, easily formed and welded, and well understood in crash design, but heavy. Aluminium alloys are about a third of the density, so panels can be lighter for similar stiffness if made thicker, improving efficiency, and they resist corrosion. However, aluminium is more expensive, harder to weld and form, and needs different joining methods. | Steel advantages ; Aluminium advantages ; Cost and processing ; Trade-off

## Polymers
LV: Year 1 · Foundation
S: Polymers are long-chain molecules with low density and versatile properties. This lesson distinguishes thermoplastics, thermosets and elastomers, and explains crystallinity, the glass transition and viscoelastic behaviour.
O: Distinguish thermoplastics, thermosets and elastomers
O: Explain the effects of crystallinity and the glass transition temperature
O: Describe viscoelastic behaviour and its design implications
PRE: Atomic bonding in materials
H: Classes
- **Thermoplastics**: separate chains held by secondary bonds; soften on heating and can be remoulded and recycled. Examples: polyethylene (PE), polypropylene (PP), PVC, PET, nylon.
- **Thermosets**: chains cross-linked by covalent bonds; set permanently when cured and do not melt. Examples: epoxy, phenolic resins.
- **Elastomers**: lightly cross-linked chains above their glass transition; stretch greatly and recover. Example: natural and synthetic rubber.
H: Structure and properties
- **Degree of polymerisation**: the number of repeat units per chain; longer chains are generally stronger.
- **Crystallinity**: regions where chains pack in order raise stiffness, strength and density; amorphous regions give transparency and toughness.
- **Glass transition temperature (T_{g})**: below it, amorphous polymers are rigid and glassy; above it, rubbery. T_{g} is about 100 °C for polystyrene and about 105 °C for PMMA, so both are rigid at room temperature.
X: Degree of polymerisation of polyethylene.
> The repeat unit, C_{2}H_{4}, has a molar mass of 28 g/mol.
> A polyethylene sample has a number-average molar mass of 280,000 g/mol.
> Degree of polymerisation = 280,000 ÷ 28 = 10,000 repeat units.
> Very long chains give high-density polyethylene its toughness.
H: Viscoelasticity
P: Polymers are **viscoelastic**: their response depends on time and temperature. Under constant load they **creep**, and under constant strain they show **stress relaxation**. Designers must allow for this, for example in plastic pipes and snap-fit joints.
K: Thermoplastics remelt, thermosets are permanently cross-linked, and elastomers are lightly cross-linked and rubbery; crystallinity and T_{g} control stiffness and toughness, and viscoelasticity means polymers creep at room temperature.
!: Using room-temperature short-term data for long-term polymer design. Polymers creep and relax, so long-term properties are much lower.
EV: established | Thermoplastics can be remelted and recycled; thermosets cannot be remelted.
EV: contested | How far recycling can address plastic pollution, compared with reducing use and designing for reuse, is debated.
T: Thermoplastic | A polymer that softens on heating and can be remoulded
T: Thermoset | A polymer that is permanently cross-linked when cured
T: Glass transition temperature | The temperature above which an amorphous polymer becomes rubbery
SUM: Thermoplastics, thermosets and elastomers differ in bonding.
SUM: Crystallinity and T_{g} control behaviour.
SUM: Polymers creep and relax.
SRC: Callister W. D. and Rethwisch D. G., Materials Science and Engineering: An Introduction, 10th edition, Wiley | secondary | 2018
SRC: Ashby M. F. and Jones D. R. H., Engineering Materials 2, 4th edition, Butterworth-Heinemann | secondary | 2013
Q: What is a thermoset? | A polymer that is permanently cross-linked when cured and does not melt.
Q: What happens to an amorphous polymer above its glass transition temperature? | It changes from rigid and glassy to rubbery.
M1#engineering-u05-13-q1@1: Which of these is a thermoset? | Epoxy resin | Polyethylene | Polypropylene | PET | Epoxy forms a permanent cross-linked network.
M2#engineering-u05-13-q2@2: Why are thermoplastics easier to recycle than thermosets? | Their chains are held by secondary bonds that melt, so they can be remoulded | They contain no polymer chains | Thermosets melt at lower temperatures | Thermoplastics are always crystalline | Remelting is possible only without covalent cross-links.
M3#engineering-u05-13-q3@3: A plastic bracket supports a constant load and slowly sags over months. What property explains this? | Viscoelastic creep | Brittle fracture | Corrosion | Work hardening | Polymers creep under sustained load, even at room temperature.
NUM2#engineering-u05-13-q4@2: A polyethylene has a number-average molar mass of 280,000 g/mol, and the repeat unit is 28 g/mol. What is the degree of polymerisation? | 10000 | 1% | repeat units | 280,000 ÷ 28 = 10,000.
SA2#engineering-u05-13-q5@2,3: Explain how crystallinity affects the properties of a thermoplastic. | Crystalline regions have chains packed in ordered arrays, increasing secondary bonding, so stiffness, strength, density and chemical resistance rise. Amorphous regions are disordered, giving toughness and transparency. So high-density polyethylene, which is more crystalline, is stiffer and more opaque than low-density polyethylene, whose chain branches reduce crystallinity. | Ordered packing ; Effects on properties ; Amorphous regions ; Example

## Ceramics and glasses
LV: Year 1 · Intermediate
S: Ceramics and glasses are hard, heat-resistant and stiff, but brittle. This lesson describes their structure and properties, explains why their strength varies, and shows how toughened glass and engineering ceramics overcome brittleness.
O: Describe the structure and properties of ceramics and glasses
O: Explain why ceramics are brittle and their strength varies
O: Describe methods of toughening ceramics and glass
PRE: Fracture and fracture toughness
H: Structure and properties
- **Ceramics**: ionic and covalent compounds, often crystalline, such as **alumina** (Al_{2}O_{3}), **silicon carbide** (SiC), **silicon nitride** and **zirconia**.
- **Glasses**: amorphous, such as soda-lime glass for windows and borosilicate glass for laboratory ware.
- Properties: high hardness, high melting point, chemical stability, high compressive strength, low tensile strength and **low fracture toughness**.
H: Brittleness and variability
P: Strong, directional bonds resist dislocation motion, so ceramics cannot yield to blunt cracks. Small flaws from processing control strength, and strength varies from sample to sample. Designers use **Weibull statistics** to describe the probability of failure.
H: Toughening
- **Toughened (tempered) glass**: heated and rapidly cooled so the surface is in compression; a crack must overcome this before growing. It breaks into small, blunt pieces.
- **Laminated glass**: a polymer interlayer holds fragments together, as in car windscreens.
- **Transformation-toughened zirconia**: stress near a crack tip triggers a phase change that expands and closes the crack.
- **Ceramic matrix composites**: fibres bridge cracks.
X: The Space Shuttle's thermal protection.
> The Shuttle was covered in silica-based tiles that insulated the structure from re-entry heating.
> Silica's low thermal conductivity and heat resistance suited the role.
> The tiles were brittle and vulnerable to impact damage.
> In 2003, a foam strike damaged Columbia's wing leading edge, made of reinforced carbon–carbon, leading to its loss on re-entry.
K: Ceramics and glasses are hard, stiff and heat-resistant but brittle, with flaw-controlled, variable strength; tempering, lamination, transformation toughening and composites improve their reliability.
!: Treating ceramic strength as a single fixed value. Because flaws vary, strength is statistical, and large components are more likely to contain a critical flaw.
EV: established | Toughened glass is required in safety applications such as glazed doors under building regulations.
EV: established | Weibull statistics are widely used to describe the strength of brittle materials.
T: Ceramic | An inorganic, non-metallic material with ionic or covalent bonding
T: Toughened glass | Glass with a compressive surface layer from rapid cooling
T: Weibull statistics | A statistical model describing the variability of brittle strength
SUM: Hard, stiff, heat-resistant, but brittle.
SUM: Strength is controlled by flaws.
SUM: Toughening methods improve reliability.
SRC: Ashby M. F. and Jones D. R. H., Engineering Materials 2, 4th edition, Butterworth-Heinemann | secondary | 2013
SRC: Columbia Accident Investigation Board, Report, Volume I, NASA and US Government Printing Office | primary | 2003
Q: Why are ceramics brittle? | Their strong directional bonds prevent dislocation motion, so cracks cannot be blunted by yielding.
Q: How is toughened glass made? | By heating it and cooling the surface rapidly so the surface is in compression.
M1#engineering-u05-14-q1@1: Which property is typical of ceramics? | High hardness | High ductility | Low melting point | High fracture toughness | Applying the standard result: Strong bonds make ceramics hard.
M2#engineering-u05-14-q2@2: Why does toughened glass break into small, blunt pieces? | The stored surface compression and inner tension drive rapid fragmentation | It contains a polymer interlayer | It is made from metal | It is amorphous only on the surface | Released internal stresses shatter it into small pieces.
M3#engineering-u05-14-q3@3: Why are ceramics used in compression rather than tension where possible? | Compression closes flaws, while tension opens cracks at low stress | Ceramics are weak in compression | Tension makes ceramics more ductile | There is no difference between tension and compression | Flaws limit tensile strength far more than compressive strength.
MATCH1#engineering-u05-14-q4@1: Match each ceramic or glass to a typical use. | Alumina = Spark plug insulators ; Borosilicate glass = Laboratory glassware ; Silicon carbide = Abrasives and brake discs ; Laminated glass = Car windscreens | Each exploits a particular combination of properties.
SA2#engineering-u05-14-q5@2,3: Explain how transformation toughening works in zirconia. | Partially stabilised zirconia contains particles in a metastable tetragonal phase. High stress near a crack tip triggers their transformation to the monoclinic phase, which has a larger volume. The expansion puts the region around the crack into compression, closing the crack tip and making further growth harder, raising fracture toughness. | Metastable phase ; Stress-triggered change ; Volume expansion ; Crack closure

## Composites
LV: Year 1 · Intermediate
S: Composites combine two or more materials to achieve properties neither has alone. This lesson covers matrix and reinforcement, fibre composites, the rule of mixtures, anisotropy, and applications from concrete to aircraft.
O: Describe the roles of matrix and reinforcement in a composite
O: Calculate composite stiffness using the rule of mixtures
O: Explain anisotropy and its design implications
PRE: Polymers
PRE: Ceramics and glasses
H: Matrix and reinforcement
- The **matrix** (polymer, metal or ceramic) binds the reinforcement, transfers load and protects fibres.
- The **reinforcement** (fibres or particles) provides stiffness and strength.
- Examples: carbon fibre–reinforced polymer (CFRP), glass fibre–reinforced polymer (GFRP), reinforced concrete, wood (natural cellulose fibres in lignin).
H: The rule of mixtures
E: Longitudinal: E_{c} = V_{f} E_{f} + V_{m} E_{m} :: V volume fraction, f fibre, m matrix
E: Transverse: 1 ÷ E_{c} = V_{f} ÷ E_{f} + V_{m} ÷ E_{m}
X: Stiffness of a unidirectional CFRP.
> Carbon fibre E_{f} = 230 GPa; epoxy E_{m} = 3.5 GPa; V_{f} = 0.6, V_{m} = 0.4.
> Along the fibres: E_{c} = 0.6 × 230 + 0.4 × 3.5 = 138 + 1.4 = 139.4 GPa.
> Across the fibres: 1 ÷ E_{c} = 0.6 ÷ 230 + 0.4 ÷ 3.5 = 0.0026 + 0.1143 = 0.1169, so E_{c} = 8.6 GPa.
> The composite is about 16 times stiffer along the fibres than across them.
H: Anisotropy and design
P: Unidirectional composites are **anisotropic**: properties depend on direction. Designers stack plies at different angles (0°, ±45°, 90°) to suit load paths. The Boeing 787's structure is about 50% composite by weight, saving mass but requiring careful design against impact damage and delamination.
K: Composites combine a matrix and reinforcement; the rule of mixtures gives stiffness along and across fibres, showing strong anisotropy, so laminates are designed with ply orientations to match loads.
!: Assuming a fibre composite is equally strong in all directions. Across the fibres, the weaker matrix dominates.
EV: established | The rule of mixtures accurately predicts longitudinal stiffness of aligned fibre composites.
EV: contested | Recycling carbon fibre composites at end of life remains difficult, and the best methods are still being developed.
T: Matrix | The continuous phase in a composite that binds the reinforcement
T: Anisotropy | Variation of properties with direction
T: Delamination | Separation of layers in a laminated composite
SUM: Matrix binds; reinforcement stiffens.
SUM: Rule of mixtures for stiffness.
SUM: Composites are anisotropic.
SRC: Hull D. and Clyne T. W., An Introduction to Composite Materials, 2nd edition, Cambridge University Press | secondary | 1996
SRC: Callister W. D. and Rethwisch D. G., Materials Science and Engineering: An Introduction, 10th edition, Wiley | secondary | 2018
Q: What is the role of the matrix in a composite? | To bind the reinforcement, transfer load to it and protect it.
Q: What is anisotropy? | Variation of a material's properties with direction.
M1#engineering-u05-15-q1@1: Which is a natural composite? | Wood | Glass | Aluminium | Polyethylene | Wood consists of cellulose fibres in a lignin matrix.
M2#engineering-u05-15-q2@2: Why is reinforced concrete a composite? | Steel bars carry tension while concrete carries compression | Concrete contains no other materials | Steel and concrete are the same material | The steel makes the concrete lighter | Each material compensates for the other's weakness.
M3#engineering-u05-15-q3@3: Why do aircraft composite laminates use plies at 0°, ±45° and 90°? | To provide stiffness and strength in all the directions the structure is loaded | To make the composite isotropic in density | To reduce the number of fibres needed to zero | Because fibres can only be made in these angles | Stacking angles tailors the laminate to multidirectional loads.
NUM2#engineering-u05-15-q4@2: A composite has 60% carbon fibre (230 GPa) and 40% epoxy (3.5 GPa). What is the longitudinal modulus, in GPa? | 139.4 | 1% | GPa | E_{c} = 0.6 × 230 + 0.4 × 3.5 = 139.4 GPa.
SA2#engineering-u05-15-q5@2,3: Explain why fibre composites are anisotropic. | In an aligned fibre composite, loading along the fibres is carried mainly by the stiff, strong fibres, so stiffness follows the rule of mixtures and is high. Loading across the fibres puts the soft matrix in series with the fibres, so the matrix dominates and stiffness and strength are much lower. Properties therefore depend strongly on direction. | Load along fibres ; Load across fibres ; Matrix dominance ; Direction-dependent properties

## Heat treatment of steels
LV: Year 1 · Advanced
S: Heat treatment transforms the properties of steel without changing its composition. This lesson covers annealing, normalising, hardening and tempering, martensite, hardenability and the Jominy test, and surface hardening.
O: Describe the main heat treatment processes for steel
O: Explain the formation of martensite and the role of tempering
O: Explain hardenability and surface hardening
PRE: The iron–carbon system
H: Processes
- **Annealing**: heat into the austenite range and cool slowly in the furnace; soft, ductile, coarse pearlite.
- **Normalising**: cool in air; finer pearlite, slightly stronger and more uniform.
- **Hardening (quenching)**: cool rapidly in water or oil from austenite; carbon is trapped, forming **martensite**, very hard and brittle.
- **Tempering**: reheat quenched steel to a moderate temperature to reduce brittleness, trading some hardness for toughness.
H: Martensite
P: When austenite is cooled too fast for carbon to diffuse out, the FCC structure shears into a distorted body-centred tetragonal structure: **martensite**. Its hardness rises with carbon content, so steels with very low carbon cannot be hardened much by quenching.
H: Hardenability
P: **Hardenability** is the depth to which a steel can be hardened. Alloying elements such as chromium, molybdenum and nickel slow the transformation to pearlite, allowing martensite to form deeper in thick sections. It is measured by the **Jominy end-quench test** (BS EN ISO 642), in which one end of a bar is water-quenched and hardness is measured along its length.
X: Heat treating a medium-carbon steel shaft.
> A 0.4% C alloy steel shaft is austenitised at about 850 °C.
> It is oil-quenched to form martensite, then tempered at about 550 °C.
> The result is a tough, strong "quenched and tempered" microstructure.
> Its high toughness and fatigue strength suit shafts and gears.
H: Surface hardening
P: **Carburising** diffuses carbon into the surface of a low-carbon steel, which is then quenched to give a hard case over a tough core; **nitriding** and **induction hardening** are alternatives. Gears and camshafts are often surface hardened.
K: Annealing and normalising soften and refine steel; quenching forms hard, brittle martensite, and tempering restores toughness; hardenability, measured by the Jominy test, depends on alloying, and surface hardening gives a hard case on a tough core.
!: Quenching without tempering. As-quenched martensite is very brittle and may crack; tempering is almost always needed.
EV: established | Quenching and tempering is a standard route to high-strength, tough steel components.
EV: established | Alloying elements increase hardenability by slowing diffusional transformations.
T: Martensite | A hard, brittle phase formed by rapid quenching of austenite
T: Tempering | Reheating quenched steel to improve toughness
T: Hardenability | The ability of a steel to form martensite to a depth on quenching
SUM: Anneal, normalise, harden and temper.
SUM: Martensite is hard; tempering adds toughness.
SUM: Alloying raises hardenability.
SRC: BSI, BS EN ISO 642: Steel, Hardenability test by end quenching (Jominy test) | standard | 1999
SRC: Bhadeshia H. K. D. H. and Honeycombe R. W. K., Steels: Microstructure and Properties, 4th edition, Butterworth-Heinemann | secondary | 2017
Q: What is martensite? | A hard, brittle phase formed when austenite is quenched too fast for carbon to diffuse out.
Q: What does the Jominy test measure? | Hardenability, by measuring hardness along a bar quenched at one end.
M1#engineering-u05-16-q1@1: Which heat treatment produces the softest steel? | Full annealing | Quenching | Tempering at low temperature | Induction hardening | Slow furnace cooling gives coarse, soft pearlite.
M2#engineering-u05-16-q2@2: Why is quenched steel tempered? | To reduce brittleness and improve toughness | To make it even more brittle | To dissolve all the carbon | To return it to austenite at room temperature | Tempering relieves stresses and decomposes some martensite.
M3#engineering-u05-16-q3@3: A thick shaft of plain carbon steel is soft at its centre after quenching. What would help? | Using an alloy steel with higher hardenability | Quenching more slowly in air | Using a lower-carbon steel | Annealing after quenching | Alloying slows pearlite formation so martensite forms deeper.
SEQ1#engineering-u05-16-q4@2: Order the steps of quench-and-temper treatment. | Heat into the austenite range ; Hold to dissolve carbon ; Quench rapidly to form martensite ; Temper at moderate temperature | This sequence gives a strong, tough microstructure.
SA2#engineering-u05-16-q5@2,3: Explain why carburising is used for gears. | Gear teeth need a hard, wear-resistant surface to resist contact fatigue and wear, but a tough core to resist shock and bending fatigue. Carburising diffuses carbon into the surface of a low-carbon steel; quenching then makes a hard martensitic case on the high-carbon surface, while the low-carbon core stays tough. | Surface requirements ; Core requirements ; Carbon diffusion ; Resulting case and core

## Materials selection and Ashby charts
LV: Year 1 · Advanced
S: Choosing the right material means matching properties to the demands of a design. This lesson explains Michael Ashby's method of materials selection, material indices for light, stiff and strong components, and the use of property charts.
O: Explain the stages of systematic materials selection
O: Derive and use material indices for simple components
O: Use an Ashby chart to compare candidate materials
PRE: Metals and alloys
PRE: Composites
H: The method
- **Translate** the design: function, objective (such as minimising mass), constraints (such as stiffness) and free variables (such as thickness).
- **Screen** out materials that fail constraints, such as maximum service temperature.
- **Rank** the rest using **material indices**.
- **Document** the shortlist with further information: cost, availability, processing, environmental impact.
H: Material indices
- Light, stiff **tie**: maximise E ÷ ρ.
- Light, stiff **beam**: maximise E^{1/2} ÷ ρ.
- Light, stiff **panel** (plate): maximise E^{1/3} ÷ ρ.
- Light, strong **beam**: maximise σ_{f}^{2/3} ÷ ρ.
P: On an **Ashby chart** of log E against log ρ, each index plots as a line of constant slope; materials above the line perform better.
X: Choosing a material for a light, stiff beam (index E^{1/2} ÷ ρ).
> Steel: √210 ÷ 7.85 = 14.5 ÷ 7.85 = 1.85.
> Aluminium: √70 ÷ 2.7 = 8.37 ÷ 2.7 = 3.10.
> CFRP (quasi-isotropic, E ≈ 70 GPa, ρ ≈ 1.55): 8.37 ÷ 1.55 = 5.40.
> Spruce (along grain, E ≈ 10 GPa, ρ ≈ 0.45): 3.16 ÷ 0.45 = 7.0. Wood ranks highly, explaining its use in light structures such as gliders and racing shells.
H: Beyond performance
P: The best performer may be too expensive, hard to process or environmentally costly. Ashby's later work added **eco-indices** such as embodied energy and carbon per kilogram, so environmental impact can be traded against performance.
K: Systematic selection translates a design into function, objective, constraints and free variables, screens and ranks materials using indices such as E^{1/2}/ρ, and documents trade-offs including cost and environmental impact.
!: Selecting materials by strength or stiffness alone. The best choice depends on how the component is loaded and what is to be minimised, captured by the material index.
EV: established | Ashby's method and property charts are standard in engineering design education.
EV: established | Materials with similar specific stiffness can rank very differently for beams and panels, where indices favour low density.
T: Material index | A combination of properties that measures performance for a given function and objective
T: Ashby chart | A log–log plot of two material properties used for selection
T: Free variable | A design parameter that can be adjusted, such as section thickness
SUM: Translate, screen, rank, document.
SUM: Indices depend on loading and objective.
SUM: Include cost and environment.
SRC: Ashby M. F., Materials Selection in Mechanical Design, 5th edition, Butterworth-Heinemann | secondary | 2017
SRC: Ashby M. F., Materials and the Environment: Eco-informed Material Choice, 3rd edition, Butterworth-Heinemann | secondary | 2021
Q: What material index should be maximised for a light, stiff beam? | E^{1/2} ÷ ρ.
Q: What are the four stages of Ashby's selection method? | Translate, screen, rank and document.
M1#engineering-u05-17-q1@1: Which index applies to a light, stiff tie in tension? | E ÷ ρ | E^{1/2} ÷ ρ | E^{1/3} ÷ ρ | σ_{f} ÷ E | For a tie of fixed length and stiffness, mass is minimised by maximising E/ρ.
M2#engineering-u05-17-q2@2: Why do low-density materials perform better as stiff panels than as ties? | The panel index E^{1/3} ÷ ρ rewards low density more strongly | Panels are never loaded in bending | Density has no effect on panels | Ties need a higher density | A smaller exponent on E makes density more important.
M3#engineering-u05-17-q3@3: A design ranks CFRP best for a bicycle frame, but the budget is tight. What does the method suggest? | Document the trade-off and consider a cheaper material with a good index, such as aluminium | Ignore cost entirely, as performance is all that matters | Choose the material with the lowest stiffness | Abandon the selection method | The documentation stage weighs cost and processing alongside performance.
NUM3#engineering-u05-17-q4@2: Aluminium has E = 70 GPa and ρ = 2.7 g/cm^{3}. What is its beam index E^{1/2} ÷ ρ? | 3.10 | 1% | index | √70 ÷ 2.7 = 8.37 ÷ 2.7 = 3.10.
SA2#engineering-u05-17-q5@2,3: Explain how a material index is derived for a light, stiff beam. | The objective is to minimise mass m = ρAL. The constraint is a required bending stiffness, which depends on EI; for a square section of side b, I = b^{4}/12, so stiffness is proportional to Eb^{4}. Fixing stiffness gives b^{2} ∝ (1/E)^{1/2}, the free variable. Substituting into m = ρb^{2}L gives m ∝ ρ/E^{1/2}, so mass is minimised by maximising E^{1/2}/ρ. | Objective ; Constraint ; Eliminate free variable ; Resulting index
`;
