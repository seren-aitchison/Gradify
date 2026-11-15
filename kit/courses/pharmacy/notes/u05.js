// PharmaGradify Pharmaceutics: Formulation and Dosage Forms (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Introduction to pharmaceutics
LV: Intermediate · Foundation
S: Pharmaceutics is the science of turning a drug into a medicine that patients can take safely and effectively. It covers how the dosage form is designed, made, stored and absorbed.
O: Define pharmaceutics and its main branches
O: Describe the aims of dosage form design
O: Explain why the dosage form affects how well a medicine works
T: Dosage form | The physical form in which a drug is given, such as a tablet, solution or cream
T: Preformulation | Study of a drug's physical and chemical properties before a dosage form is designed
H: Branches of pharmaceutics
- **Physical pharmacy**: solubility, particle size, flow, rheology and interfaces.
- **Formulation science**: choosing excipients and dosage forms.
- **Biopharmaceutics**: how the dosage form affects absorption.
- **Pharmaceutical technology**: manufacturing, packaging and quality.
- **Pharmaceutical microbiology**: sterility and preservation.
H: Aims of dosage form design
- Deliver the **right dose** reliably to the right site.
- Keep the drug **stable** until it is used.
- Be **acceptable** to patients: taste, size, ease of use.
- Allow **manufacture** at scale with consistent quality.
- Match the **route** and clinical need, such as rapid action, long action or local effect.
P: Preformulation studies measure solubility, pKa, log P, polymorphism, particle properties and stability. These guide the choice of salt form, excipients and dosage form. The same drug can behave very differently in different formulations: a modified-release tablet, an oral solution and an injection of the same drug can give very different peak levels and durations of action, which is why some products are not interchangeable.
X: One drug, several forms.
> Morphine is available as an oral solution, immediate-release tablets, modified-release tablets and injections.
> The oral solution acts quickly and is used for breakthrough pain.
> Modified-release tablets give steady levels over 12 or 24 hours.
> Injections are used when patients cannot swallow or need rapid relief.
K: Pharmaceutics turns drugs into medicines; dosage forms aim to deliver the right dose, stay stable, be acceptable and be manufacturable, and the form strongly affects clinical behaviour.
!: Treating different formulations of the same drug as interchangeable. Release rate, bioavailability and dose can differ.
EV: established | Dosage form design is known to determine the rate and extent of drug absorption and stability.
Q: What is preformulation? | Study of a drug's physical and chemical properties before designing a dosage form.
Q: What is biopharmaceutics? | The study of how the dosage form affects drug absorption.
SUM: Pharmaceutics turns drugs into medicines.
SUM: The dosage form changes clinical effect.
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
SRC: General Pharmaceutical Council, Standards for the initial education and training of pharmacists | standard | 2021 | https://www.pharmacyregulation.org/
M1#pharmacy-u05-01-q1@1: Which branch of pharmaceutics studies how dosage forms affect absorption? | Biopharmaceutics | Pharmacognosy | Pharmacovigilance | Pharmacoeconomics | Pharmacy law | Biopharmaceutics links the dosage form to the rate and extent of absorption.
M2#pharmacy-u05-01-q2@2: Which is an aim of dosage form design? | Keeping the drug stable until it is used | Making the drug as bitter as possible | Ensuring every product is an injection | Avoiding any use of excipients | Making doses impossible to measure | Stability is a key aim alongside dose accuracy and acceptability.
M3#pharmacy-u05-01-q3@3: Why may a modified-release and an immediate-release tablet of the same drug not be swapped dose for dose? | Their release rates and peak levels differ | They always contain different drugs | Modified-release tablets contain no drug | Immediate-release tablets are never absorbed | They are only different colours | Release profile changes peak concentration and duration of action.
MATCH1#pharmacy-u05-01-q4@1: Match each branch to its focus. | Physical pharmacy = Solubility and flow ; Biopharmaceutics = Absorption ; Pharmaceutical technology = Manufacture ; Pharmaceutical microbiology = Sterility and preservation | Pharmaceutics has several branches.
SA2#pharmacy-u05-01-q5@1,3: Explain what pharmaceutics is and why the choice of dosage form matters. | Pharmaceutics is the science of designing, making and testing dosage forms. It includes physical pharmacy, formulation, biopharmaceutics, technology and microbiology. Dosage forms aim to deliver the right dose, keep the drug stable, be acceptable to patients and be manufacturable. The form affects how fast and how much drug is absorbed, so solutions, tablets, modified-release products and injections of the same drug act differently and are not always interchangeable. | Definition ; Branches ; Aims ; Effect on absorption ; Interchangeability

## Solubility and dissolution
LV: Intermediate · Foundation
S: A drug must dissolve before it can be absorbed. Solubility and dissolution rate often limit how much of an oral drug reaches the blood, so formulators work hard to improve them.
O: Define solubility and describe pharmacopoeial solubility terms
O: Explain the Noyes-Whitney equation and factors affecting dissolution
O: Describe ways to improve the solubility and dissolution of poorly soluble drugs
T: Solubility | The maximum amount of a substance that dissolves in a solvent at a given temperature
T: Noyes-Whitney equation | dC/dt = DA(Cs − C) ÷ h, describing dissolution rate
H: Solubility
- Pharmacopoeias use terms such as **very soluble** (less than 1 part of solvent per part of solute) to **practically insoluble** (more than 10,000 parts).
- Solubility depends on the drug's structure, **pH** and pKa, temperature, crystal form (**polymorphs**) and salt form.
- The **Biopharmaceutics Classification System (BCS)** groups drugs by solubility and permeability: Class I high and high, Class II low solubility, Class III low permeability, Class IV low and low.
H: Dissolution
- In the **Noyes-Whitney equation**, D is the diffusion coefficient, A the surface area, Cs the solubility, C the concentration in bulk solution and h the diffusion layer thickness.
- Dissolution increases with **surface area** (smaller particles), higher **solubility** and stirring, which thins the diffusion layer.
- **Sink conditions**, where C stays low because the drug is absorbed, keep dissolution going.
P: Ways to improve solubility and dissolution include forming a **salt**, choosing a more soluble **polymorph** or amorphous form, **micronising** or making nanoparticles, using **cosolvents**, **surfactants** or cyclodextrins, and making **solid dispersions** in polymers. For BCS Class II drugs, such as many antifungals and kinase inhibitors, dissolution is the main barrier to absorption, so these strategies can change bioavailability markedly.
X: Improving a poorly soluble drug.
> A new drug is practically insoluble in water but crosses membranes easily, so it is BCS Class II.
> Tablets of coarse powder give low and variable blood levels.
> Formulators micronise the drug and add a surfactant to improve wetting.
> Dissolution and absorption both improve.
K: Solubility is the maximum amount that dissolves; dissolution rate rises with surface area and solubility as the Noyes-Whitney equation shows; salts, polymorphs, micronisation, surfactants and solid dispersions help poorly soluble drugs.
!: Confusing solubility with dissolution rate. Solubility is how much can dissolve; dissolution rate is how fast it does.
EV: established | The Noyes-Whitney equation and the Biopharmaceutics Classification System are widely used in formulation and regulation.
Q: Which BCS class has low solubility and high permeability? | Class II.
Q: How does reducing particle size increase dissolution rate? | It increases the surface area in contact with the fluid.
SUM: Drugs must dissolve to be absorbed.
SUM: Surface area and solubility drive dissolution.
SRC: Amidon GL et al., "A theoretical basis for a biopharmaceutic drug classification", Pharmaceutical Research 12(3), 413–420 | primary | 1995
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
M1#pharmacy-u05-02-q1@1: What does "practically insoluble" mean in pharmacopoeial terms? | More than 10,000 parts of solvent are needed per part of solute | Less than 1 part of solvent dissolves 1 part of solute | The substance dissolves instantly in water | The substance is only soluble in acid | The substance cannot be weighed | Pharmacopoeial terms give the parts of solvent needed per part of solute.
M2#pharmacy-u05-02-q2@2: According to the Noyes-Whitney equation, which change increases dissolution rate? | Increasing the surface area of the particles | Increasing the diffusion layer thickness | Reducing the drug's solubility | Letting the bulk concentration approach Cs | Using larger, coarser crystals | Rate is proportional to surface area and to (Cs − C).
M3#pharmacy-u05-02-q3@3: Which approach is used to improve dissolution of a poorly soluble weak acid? | Forming a sodium salt | Coating the tablet in wax | Using larger particles | Removing all surfactants | Storing it at low temperature | Salts of weak acids dissolve faster than the free acid.
NUM1#pharmacy-u05-02-q4@1: According to Noyes-Whitney, if surface area doubles and everything else is unchanged, by what factor does dissolution rate change? | 2 | 0 | times | Rate is directly proportional to surface area, so doubling A doubles the rate.
SA2#pharmacy-u05-02-q5@2,3: Explain the factors that affect drug dissolution and how formulators improve it. | The Noyes-Whitney equation shows dissolution rate depends on the diffusion coefficient, surface area, the difference between solubility and bulk concentration, and the diffusion layer thickness. Smaller particles, higher solubility, agitation and sink conditions increase dissolution. Formulators improve poorly soluble drugs by forming salts, choosing soluble polymorphs or amorphous forms, micronising, using cosolvents, surfactants or cyclodextrins, and making solid dispersions. This is especially important for BCS Class II drugs. | Noyes-Whitney ; Surface area ; Solubility and sink ; Formulation strategies ; BCS

## Particle size and powders
LV: Intermediate · Foundation
S: Most medicines start as powders. Particle size and powder flow affect dissolution, content uniformity and whether tablets and capsules can be made reliably.
O: Describe methods for reducing and measuring particle size
O: Explain how particle properties affect powder flow and mixing
O: Calculate and interpret flow indices such as Carr's index and the Hausner ratio
T: Micronisation | Reduction of particles to a few micrometres, often by jet milling
T: Carr's index | (tapped density − bulk density) ÷ tapped density × 100, a measure of powder flow
H: Size reduction and measurement
- Size reduction (**comminution**) uses mills such as ball mills, hammer mills and fluid energy (jet) mills.
- Benefits: faster dissolution, better content uniformity, suitable particles for inhalation.
- Measurement: **sieving**, **microscopy** and **laser diffraction**.
- Results are often given as a median diameter and a size distribution.
H: Flow and mixing
- Small, irregular or cohesive particles flow poorly; larger, rounder particles flow better.
- Flow is tested by **angle of repose**, **Carr's index** and **Hausner ratio** (tapped ÷ bulk density).
- A Carr's index under about 15% or Hausner ratio under 1.25 suggests good flow.
- **Segregation**, where particles separate by size or density, can ruin content uniformity.
- **Glidants** such as colloidal silica improve flow.
P: Good flow is essential for tablet and capsule filling, because machines fill by volume: poor flow gives variable fill weight and therefore variable doses. Granulation enlarges and densifies particles to improve flow and reduce segregation. For low-dose potent drugs, very fine particles and careful mixing are needed to achieve content uniformity, as each tablet may contain only micrograms of drug.
X: Checking flow.
> A powder has a bulk density of 0.40 g/mL and a tapped density of 0.50 g/mL.
> Carr's index = (0.50 − 0.40) ÷ 0.50 × 100 = 20%.
> The Hausner ratio is 0.50 ÷ 0.40 = 1.25.
> Flow is only fair, so the formulator adds a glidant or granulates the powder.
K: Particle size is reduced by milling and measured by sieving, microscopy or laser diffraction; flow is assessed by angle of repose, Carr's index and Hausner ratio, and poor flow causes variable doses.
!: Assuming smaller particles are always better. Very fine powders dissolve faster but often flow and handle poorly.
EV: established | Carr's index and the Hausner ratio are standard pharmacopoeial measures of powder flow.
Q: What is micronisation? | Reducing particles to a few micrometres, often by jet milling.
Q: Why does poor powder flow cause dose variation? | Machines fill by volume, so poor flow gives variable fill weights.
SUM: Size affects dissolution and uniformity.
SUM: Flow affects dose accuracy.
SRC: European Directorate for the Quality of Medicines, European Pharmacopoeia 2.9.36: Powder flow | standard | 2025 | https://www.edqm.eu/
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
M1#pharmacy-u05-03-q1@1: Which method is commonly used to measure particle size distribution? | Laser diffraction | Karl Fischer titration | Polarimetry | Refractometry | Flame photometry | Laser diffraction measures how particles scatter light to give a size distribution.
M2#pharmacy-u05-03-q2@2: What does segregation in a powder blend cause? | Poor content uniformity between doses | Faster dissolution of every tablet | Complete sterility of the product | Better flow through the hopper | Lower moisture content | Separated particles give uneven drug content between units.
M3#pharmacy-u05-03-q3@3: A powder has a Hausner ratio of 1.45. What does this suggest? | Poor flow that may need granulation or a glidant | Excellent flow with no changes needed | The powder is sterile | The particles are all the same size | The powder is fully dissolved | Ratios well above 1.25 indicate poor, cohesive flow.
NUM1#pharmacy-u05-03-q4@3: A powder has a bulk density of 0.40 g/mL and a tapped density of 0.50 g/mL. What is its Carr's index, in percent? | 20 | 0 | % | (0.50 − 0.40) ÷ 0.50 × 100 = 20%.
SA2#pharmacy-u05-03-q5@1,3: Explain why particle size and powder flow matter in making solid dosage forms. | Particle size affects dissolution, as smaller particles have more surface area, and content uniformity, especially for low-dose drugs. Size is reduced by milling and measured by sieving, microscopy or laser diffraction. Flow matters because tablet and capsule machines fill by volume, so poor flow gives variable doses. Flow is measured by angle of repose, Carr's index and Hausner ratio. Granulation and glidants improve flow, and segregation must be avoided. | Dissolution ; Uniformity ; Measurement ; Flow and dose ; Improving flow

## Rheology
LV: Intermediate · Foundation
S: Rheology is the study of how materials flow and deform. It explains why suspensions pour, creams spread and gels hold their shape.
O: Distinguish Newtonian and non-Newtonian flow
O: Describe plastic, pseudoplastic, dilatant and thixotropic behaviour
O: Relate rheology to the design and use of pharmaceutical products
T: Viscosity | A fluid's resistance to flow, measured in pascal seconds (Pa·s)
T: Thixotropy | A reversible, time-dependent fall in viscosity when a material is sheared, recovering at rest
H: Types of flow
- **Newtonian**: viscosity is constant whatever the shear rate, as for water, simple syrups and glycerol.
- **Pseudoplastic** (shear thinning): viscosity falls as shear increases, as for many polymer solutions such as methylcellulose.
- **Plastic** (Bingham): no flow until a **yield value** is exceeded, as for many ointments and pastes.
- **Dilatant** (shear thickening): viscosity rises with shear, as for concentrated deflocculated suspensions.
H: Time-dependent flow
- **Thixotropic** systems become thinner on shaking and thicken again at rest.
- This is useful in suspensions: they pour after shaking but resist settling during storage.
- Viscosity also falls with **temperature**, which affects pouring and spreading.
P: Rheology affects every semisolid and liquid product. Suspensions should be viscous at rest to slow sedimentation, but thin enough to pour and measure accurately after shaking. Creams and ointments need a yield value so they stay put, but should spread easily on rubbing. Injections should be thin enough to pass through a fine needle. Viscometers and rheometers measure flow, and results are part of product specifications.
X: A suspension design.
> A formulator chooses xanthan gum as a suspending agent for an oral antibiotic.
> At rest, the high viscosity slows settling of drug particles.
> When the bottle is shaken, the suspension thins and pours easily.
> This shear-thinning behaviour allows accurate dosing with an oral syringe.
K: Newtonian fluids have constant viscosity; pseudoplastic fluids thin with shear, plastic systems need a yield value, dilatant systems thicken, and thixotropic systems thin with shaking and recover at rest.
!: Assuming viscosity is fixed. Many pharmaceutical products change viscosity with shaking, rubbing or temperature.
EV: established | Rheological classifications of pharmaceutical systems are well established in pharmaceutics.
Q: What is a Newtonian fluid? | A fluid whose viscosity stays constant at all shear rates.
Q: What is a yield value? | The stress that must be exceeded before a plastic material starts to flow.
SUM: Newtonian or non-Newtonian.
SUM: Rheology shapes pouring and spreading.
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
SRC: Martin A and Sinko PJ, Martin's Physical Pharmacy and Pharmaceutical Sciences, 7th edition, Wolters Kluwer | secondary | 2016
M1#pharmacy-u05-04-q1@1: Which liquid is an example of a Newtonian fluid? | Water | A methylcellulose gel | A thixotropic suspension | Toothpaste | A concentrated starch slurry | Water's viscosity does not change with shear rate.
M2#pharmacy-u05-04-q2@2: What happens to a pseudoplastic material as shear rate increases? | Its viscosity decreases | Its viscosity increases | It becomes a solid | It develops a yield value | It stops flowing completely | Shear-thinning materials become thinner when stirred or squeezed.
M3#pharmacy-u05-04-q3@3: Why is thixotropy useful in oral suspensions? | The product pours after shaking but resists settling at rest | It makes the suspension clear | It removes the need for a preservative | It prevents any absorption of drug | It makes the suspension taste sweeter | Thinning on shaking and thickening at rest aids dosing and stability.
MATCH1#pharmacy-u05-04-q4@2: Match each flow type to an example. | Newtonian = Water ; Pseudoplastic = Polymer solution ; Plastic = Ointment with yield value ; Dilatant = Concentrated deflocculated suspension | Different products show different flow.
SA2#pharmacy-u05-04-q5@2,3: Describe the main types of flow behaviour and their importance for pharmaceutical products. | Newtonian fluids such as water have constant viscosity. Pseudoplastic materials such as polymer solutions thin with shear. Plastic materials such as ointments need a yield value before flowing. Dilatant systems thicken with shear. Thixotropic systems thin on shaking and recover at rest. These properties let suspensions pour after shaking but resist settling, creams stay in place yet spread on rubbing, and injections pass through needles. | Newtonian ; Pseudoplastic and plastic ; Dilatant ; Thixotropy ; Product design

## Surfactants and interfacial phenomena
LV: Intermediate · Foundation
S: Surfactants gather at surfaces and interfaces and lower surface tension. They make emulsions, wet powders, solubilise drugs and act as preservatives.
O: Describe the structure and classes of surfactants
O: Explain micelle formation and the critical micelle concentration
O: Use the HLB system to choose surfactants for formulations
T: Surfactant | A molecule with a water-loving head and a fat-loving tail that adsorbs at interfaces
T: Critical micelle concentration (CMC) | The concentration above which surfactant molecules form micelles
H: Classes of surfactant
- **Anionic**: sodium lauryl sulfate, a wetting agent and detergent.
- **Cationic**: benzalkonium chloride and cetrimide, also used as antimicrobials.
- **Non-ionic**: polysorbates (Tweens) and sorbitan esters (Spans), widely used as low-irritant emulsifiers.
- **Amphoteric**: lecithin, with both charges depending on pH.
H: Micelles and HLB
- Above the **CMC**, surfactants form **micelles** with tails inward, which can **solubilise** poorly soluble drugs.
- The **hydrophile-lipophile balance (HLB)** scale ranks surfactants: low HLB (about 3 to 6) favours water-in-oil emulsions; high HLB (about 8 to 18) favours oil-in-water emulsions.
- The HLB of a blend is the weighted average of its components.
P: Surfactants have several uses. As **wetting agents**, they help water penetrate hydrophobic powders in tablets and suspensions. As **emulsifiers**, they stabilise droplets. As **solubilisers**, they carry poorly soluble drugs in micelles, as polysorbate does in some injections. Some, such as benzalkonium chloride, are **preservatives**. Surfactants can also irritate skin and eyes, cause hypersensitivity, and bind preservatives, reducing their activity.
X: Blending emulsifiers.
> A formulator needs an HLB of about 12 for an oil-in-water cream.
> She mixes 70% polysorbate 80 (HLB 15.0) with 30% sorbitan oleate (HLB 4.3).
> The blend's HLB is 0.7 × 15.0 + 0.3 × 4.3, about 11.8.
> This is close to the target, giving a stable oil-in-water emulsion.
K: Surfactants are amphiphilic and may be anionic, cationic, non-ionic or amphoteric; above the CMC they form micelles that solubilise drugs, and the HLB scale guides emulsifier choice.
!: Assuming surfactants are inert. They can irritate tissues, cause hypersensitivity and inactivate preservatives.
EV: established | The HLB system and micellar solubilisation are well-established principles of colloid and surface science.
Q: What happens above the critical micelle concentration? | Surfactant molecules form micelles.
Q: Which HLB range favours oil-in-water emulsions? | High HLB, about 8 to 18.
SUM: Surfactants work at interfaces.
SUM: HLB guides emulsifier choice.
SRC: Griffin WC, "Classification of surface-active agents by HLB", Journal of the Society of Cosmetic Chemists 1(5), 311–326 | primary | 1949
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
M1#pharmacy-u05-05-q1@1: Which surfactant is cationic? | Benzalkonium chloride | Sodium lauryl sulfate | Polysorbate 80 | Sorbitan oleate | Glyceryl monostearate | Benzalkonium carries a positive charge on its quaternary nitrogen.
M2#pharmacy-u05-05-q2@2: How do micelles increase the solubility of poorly soluble drugs? | They hold the drug in their hydrophobic core | They break the drug into smaller atoms | They convert the drug into a salt | They raise the temperature of the solution | They remove all water from the solution | Lipophilic drugs partition into the oily centre of the micelle.
M3#pharmacy-u05-05-q3@3: Which surfactant would be best for a water-in-oil emulsion? | One with a low HLB of about 4 | One with a high HLB of about 16 | One with an HLB of exactly 20 | Any surfactant regardless of HLB | A surfactant with no lipophilic part | Low HLB surfactants are more lipophilic and favour water-in-oil systems.
NUM1#pharmacy-u05-05-q4@3: A blend contains 70% polysorbate 80 (HLB 15.0) and 30% sorbitan oleate (HLB 4.3). What is its HLB, to one decimal place? | 11.8 | 0.1 | HLB units | 0.7 × 15.0 + 0.3 × 4.3 = 10.5 + 1.29 = 11.8.
SA2#pharmacy-u05-05-q5@1,3: Explain what surfactants are and describe their uses in pharmaceutical formulations. | Surfactants are amphiphilic molecules with a hydrophilic head and lipophilic tail that adsorb at interfaces and reduce surface tension. They are classed as anionic, cationic, non-ionic or amphoteric. Above the CMC they form micelles that solubilise poorly soluble drugs. They act as wetting agents, emulsifiers chosen using the HLB scale, solubilisers and, for cationic types, preservatives. They can irritate tissues and inactivate preservatives. | Structure ; Classes ; Micelles ; Uses and HLB ; Drawbacks

## Solutions
LV: Intermediate · Application
S: Solutions contain a drug fully dissolved in a liquid. They are easy to swallow and dose flexibly, but they bring challenges of stability, taste and microbial growth.
O: Describe the types and components of pharmaceutical solutions
O: Explain the advantages and disadvantages of solutions as dosage forms
O: Explain how cosolvents, buffers and preservatives are used in solutions
T: Cosolvent | A water-miscible solvent, such as ethanol or propylene glycol, added to improve drug solubility
T: Buffer | A system that resists changes in pH
H: Types and components
- Types: **oral solutions**, syrups, elixirs (containing ethanol), mouthwashes, ear and nasal drops, injections and topical solutions.
- **Vehicle**: usually purified water; cosolvents such as ethanol, glycerol or propylene glycol.
- **Buffers** keep pH where the drug is stable and soluble.
- **Sweeteners**, **flavours** and colours improve acceptability.
- **Preservatives** prevent microbial growth in multi-dose products.
H: Advantages and disadvantages
- Advantages: **rapid absorption** as no dissolution is needed, flexible doses, easy to swallow.
- Disadvantages: bulky to carry, often **less stable** than solids, unpleasant taste, risk of microbial growth and dose errors from inaccurate measuring.
- Some excipients need care: ethanol in children, sugar for dental health, and propylene glycol in neonates.
P: Formulators balance solubility and stability. A pH that improves solubility may speed hydrolysis, and cosolvents can taste unpleasant or have their own toxicity. Pharmacists should advise on measuring doses with an oral syringe or measuring spoon rather than household spoons, and check whether a product is sugar free or contains ethanol when supplying it to children or people with diabetes or alcohol dependence.
X: Choosing a liquid.
> A child with diabetes needs an oral liquid antibiotic.
> The pharmacist checks the product information and chooses a sugar-free formulation.
> She supplies an oral syringe and shows the parent how to measure the dose.
> She explains the storage conditions and when to discard the bottle.
K: Solutions contain dissolved drug in a vehicle with buffers, cosolvents, sweeteners and preservatives; they absorb quickly and dose flexibly but are bulky, less stable and prone to taste and microbial problems.
!: Measuring liquid doses with household spoons. These vary widely in volume and cause dosing errors.
EV: established | Oral solutions are absorbed faster than solid dosage forms because no dissolution step is required.
Q: Why are drugs in solution absorbed faster than from tablets? | No disintegration or dissolution step is needed.
Q: What is an elixir? | A clear, sweetened oral solution containing ethanol.
SUM: Fast acting and flexible.
SUM: Less stable; watch excipients.
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
SRC: Medicines and Healthcare products Regulatory Agency, Oral liquid medicines: measuring devices | guidance | 2024 | https://www.gov.uk/drug-safety-update
M1#pharmacy-u05-06-q1@1: Why are buffers added to pharmaceutical solutions? | To keep the pH where the drug is stable and soluble | To make the solution taste sweeter | To colour the solution for identification | To increase the volume of the product | To make the solution more viscous | Buffers resist pH changes that could cause degradation or precipitation.
M2#pharmacy-u05-06-q2@2: Which is a disadvantage of oral solutions compared with tablets? | They are often less chemically stable | They cannot be dosed flexibly | They are absorbed more slowly | They are always harder to swallow | They never need preservatives | Water speeds hydrolysis and microbial growth.
M3#pharmacy-u05-06-q3@3: Why might propylene glycol be a concern in a solution for a neonate? | Neonates clear it poorly, and it can accumulate and cause toxicity | It makes every solution taste bitter | It prevents absorption of all drugs | It is a strong acid that burns | It is always contaminated with bacteria | Immature metabolism lets propylene glycol accumulate in neonates.
TF1#pharmacy-u05-06-q4@2: Oral solutions generally avoid the dissolution step needed for tablets. | true | The drug is already dissolved, so absorption can begin immediately.
SA2#pharmacy-u05-06-q5@2,3: Discuss the advantages and disadvantages of oral solutions and how formulation addresses the problems. | Solutions are absorbed quickly because the drug is already dissolved, allow flexible dosing and are easy to swallow. However, they are bulky, often less stable, may taste unpleasant and can support microbial growth, and doses may be measured inaccurately. Formulators use buffers and cosolvents to keep the drug stable and dissolved, sweeteners and flavours for taste, and preservatives in multi-dose products. Excipients such as ethanol, sugar and propylene glycol need care in some patients. | Advantages ; Disadvantages ; Buffers and cosolvents ; Taste and preservatives ; Excipient cautions

## Suspensions
LV: Intermediate · Application
S: A suspension contains undissolved drug particles dispersed in a liquid. Suspensions let insoluble drugs be given as liquids, but they must be designed to resuspend evenly for accurate doses.
O: Describe the components of a pharmaceutical suspension
O: Explain sedimentation using Stokes' law and the difference between flocculated and deflocculated suspensions
O: Advise patients on the use and storage of suspensions
T: Stokes' law | v = 2r²(ρs − ρl)g ÷ 9η, giving the sedimentation velocity of a particle
T: Caking | Formation of a hard, compact sediment that is difficult to resuspend
H: Components and sedimentation
- **Drug particles**, a **vehicle**, **wetting agents** to help water coat the particles, and **suspending agents** such as xanthan gum, tragacanth or methylcellulose.
- **Stokes' law**: sedimentation velocity rises with the square of particle radius and the density difference, and falls with viscosity.
- So smaller particles, a denser vehicle and higher viscosity slow settling.
H: Flocculated and deflocculated
- **Deflocculated**: particles stay separate and settle slowly, but form a dense **cake** that is hard to redisperse.
- **Flocculated**: particles form loose clusters that settle quickly into a bulky sediment that **redisperses easily**.
- **Controlled flocculation**, using electrolytes or polymers, plus a suspending agent, gives the best balance.
P: Suspensions are labelled "Shake the bottle", because unless they are shaken well, early doses may be too weak and later doses too strong. Many antibiotic suspensions are supplied as dry powders to be reconstituted with a set volume of water, then kept in a fridge and discarded after a stated time. Pharmacists should reconstitute accurately and show patients how to measure doses with an oral syringe.
X: A Stokes' law prediction.
> A formulator halves the radius of drug particles in a suspension.
> Because velocity depends on r², settling slows to a quarter of its previous rate.
> She also adds xanthan gum to increase viscosity.
> The suspension now stays evenly dispersed for long enough to measure a dose.
K: Suspensions contain dispersed particles with wetting and suspending agents; Stokes' law shows smaller particles and higher viscosity slow settling, and controlled flocculation prevents caking.
!: Forgetting to shake a suspension before each dose. Doses will vary as drug settles.
EV: established | Stokes' law describes the sedimentation of dilute spherical particles and guides suspension design.
Q: Why should suspensions be shaken before use? | To redisperse settled drug so each dose contains the right amount.
Q: What is caking? | A hard, compact sediment that is difficult to resuspend.
SUM: Stokes' law governs settling.
SUM: Controlled flocculation prevents caking.
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
SRC: Joint Formulary Committee, British National Formulary: Guidance on prescribing, cautionary and advisory labels | guidance | 2025 | https://bnf.nice.org.uk/
M1#pharmacy-u05-07-q1@1: What is the role of a wetting agent in a suspension? | To help the liquid coat hydrophobic particles | To kill microorganisms in the product | To give the suspension its colour | To make the particles dissolve completely | To increase the particle size | Wetting agents lower interfacial tension so particles disperse.
M2#pharmacy-u05-07-q2@2: Which change slows sedimentation according to Stokes' law? | Increasing the viscosity of the vehicle | Increasing the particle radius | Increasing the density difference | Reducing the viscosity of the vehicle | Removing the suspending agent | Velocity is inversely proportional to viscosity.
M3#pharmacy-u05-07-q3@3: A parent asks why an antibiotic suspension must be kept in the fridge and discarded after a week. What is the best explanation? | The reconstituted antibiotic degrades in water, and cold slows this | The fridge makes the medicine taste stronger | The suspension becomes more potent over time | Bacteria in the fridge activate the antibiotic | The bottle will crack at room temperature | Many beta-lactams hydrolyse after reconstitution, so cold storage and short expiry are needed.
NUM1#pharmacy-u05-07-q4@2: According to Stokes' law, if the particle radius is halved, by what factor does the sedimentation velocity change? | 0.25 | 0.01 | times | Velocity depends on r², so (½)² = 0.25 of the original rate.
SA2#pharmacy-u05-07-q5@1,3: Explain how suspensions are formulated to give accurate doses. | Suspensions contain dispersed drug particles with wetting agents to help the liquid coat them and suspending agents such as xanthan gum to increase viscosity. Stokes' law shows that smaller particles, higher viscosity and a smaller density difference slow settling. Deflocculated suspensions settle slowly but cake, while flocculated ones redisperse easily, so controlled flocculation is used. Patients must shake the bottle before each dose, measure with an oral syringe and follow storage and discard instructions. | Components ; Stokes' law ; Flocculation ; Shaking and measuring ; Storage

## Emulsions
LV: Intermediate · Application
S: An emulsion is a mixture of two immiscible liquids, with one dispersed as droplets in the other. Emulsions carry oils and lipophilic drugs and form the basis of many creams and nutrition products.
O: Distinguish oil-in-water and water-in-oil emulsions and identify the type
O: Describe the role of emulsifying agents
O: Explain the causes and signs of emulsion instability
T: Emulsion | A dispersion of droplets of one liquid in another immiscible liquid, stabilised by an emulsifying agent
T: Cracking | Irreversible separation of an emulsion into its oil and water phases
H: Types and identification
- **Oil-in-water (o/w)**: oil droplets in water; feels non-greasy and washes off. Examples: aqueous creams and lipid emulsions for intravenous nutrition.
- **Water-in-oil (w/o)**: water droplets in oil; greasy and occlusive. Examples: oily creams.
- Tests: **dilution test** (an o/w emulsion mixes with water), **dye test** (a water-soluble dye colours the continuous phase of an o/w emulsion) and **conductivity** (o/w conducts electricity).
H: Emulsifiers and instability
- **Emulsifying agents**: surfactants, hydrophilic colloids such as acacia, and finely divided solids.
- **Creaming**: droplets rise or sink but can be redispersed by shaking.
- **Flocculation**: droplets cluster without merging.
- **Coalescence** and **cracking**: droplets merge, irreversibly separating the phases.
- **Phase inversion**: o/w changes to w/o or the reverse.
P: Instability can be caused by heat, freezing, microbial growth, incompatible ingredients or the wrong emulsifier. Intravenous lipid emulsions, such as those in parenteral nutrition, must be checked for cracking, because large oil droplets could cause fat embolism. Adding electrolytes or other drugs to these emulsions is controlled by compatibility data. Creaming is acceptable if shaking restores uniformity, but cracked emulsions must be discarded.
X: Spotting instability.
> A pharmacist inspects a parenteral nutrition bag before it goes to the ward.
> She sees a yellow oily layer that does not mix when gently inverted.
> The lipid emulsion has cracked, so the oil droplets could cause harm if infused.
> The bag is quarantined and the aseptic unit is informed.
K: Emulsions may be oil-in-water or water-in-oil, identified by dilution, dye and conductivity tests; emulsifying agents stabilise them, and instability ranges from reversible creaming to irreversible cracking.
!: Treating cracking like creaming. Creaming can be reversed by shaking; cracking cannot and the product must be discarded.
EV: established | The types, stabilisation and instability of pharmaceutical emulsions are well described in pharmaceutics.
Q: Which emulsion type conducts electricity? | Oil-in-water.
Q: What is creaming? | Reversible rising or sinking of droplets that can be redispersed by shaking.
SUM: o/w washes off; w/o is greasy.
SUM: Creaming reverses; cracking does not.
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
SRC: British Pharmacopoeia Commission, British Pharmacopoeia: General monograph on parenteral preparations | standard | 2025 | https://www.pharmacopoeia.com/
M1#pharmacy-u05-08-q1@1: A water-soluble dye colours the whole emulsion evenly. What type is it? | Oil-in-water | Water-in-oil | A pure oil | A suspension | A solid dispersion | The dye dissolves in the continuous phase, which is water in o/w emulsions.
M2#pharmacy-u05-08-q2@2: What is the main role of an emulsifying agent? | To stabilise droplets and prevent them merging | To dissolve the oil completely in water | To sterilise the emulsion | To make the emulsion transparent | To act as the main active drug | Emulsifiers form a film around droplets that slows coalescence.
M3#pharmacy-u05-08-q3@3: Which sign means an emulsion must be discarded? | Cracking into separate oil and water layers | Slight creaming that redisperses on shaking | A uniform milky appearance | A faint pleasant smell from the flavouring | Slight warmth after handling | Cracking is irreversible and can be dangerous in intravenous emulsions.
SEQ1#pharmacy-u05-08-q4@3: Order these emulsion changes from least to most severe. | Creaming ; Flocculation ; Coalescence ; Cracking | Instability progresses from reversible to irreversible.
SA2#pharmacy-u05-08-q5@1,3: Explain how emulsions are classified, stabilised and checked for instability. | Emulsions are oil-in-water, which feel non-greasy and conduct electricity, or water-in-oil, which are greasy and occlusive. Types are identified by dilution, dye and conductivity tests. Emulsifying agents such as surfactants, hydrophilic colloids and fine solids stabilise droplets. Instability includes creaming, which is reversible, flocculation, coalescence and cracking, which is irreversible, and phase inversion. Cracked emulsions, especially intravenous lipids, must be discarded. | Types ; Identification ; Emulsifiers ; Instability ; Safety

## Creams, ointments and gels
LV: Intermediate · Application
S: Semisolid preparations deliver drugs to the skin and mucous membranes. Choosing between a cream, ointment or gel depends on the skin condition, the site and what the patient will actually use.
O: Distinguish creams, ointments, gels and pastes
O: Choose a suitable base for a skin condition and site
O: Advise patients on applying topical products safely
T: Ointment | A greasy, usually anhydrous semisolid that is occlusive and emollient
T: Fingertip unit | The amount of cream or ointment squeezed from a tube along an adult fingertip, about 0.5 g
H: The main types
- **Ointments**: greasy and occlusive, with hydrocarbon bases (white soft paraffin), absorption bases (wool fat) or water-miscible bases (macrogols). Good for dry, thickened skin; few or no preservatives.
- **Creams**: emulsions. **Aqueous creams** (o/w) are non-greasy and need preservatives; **oily creams** (w/o) are more emollient.
- **Gels**: polymer networks, such as carbomer, that are cooling and non-greasy, suitable for hairy areas.
- **Pastes**: high powder content, protective and drying.
H: Choosing and using
- Dry, scaly skin: ointments. Weeping or moist skin and the face: creams. Scalp and hairy skin: gels, lotions or foams.
- The base affects drug penetration: occlusive ointments increase hydration and absorption.
- **Fingertip units** guide amounts: one fingertip unit covers an area about the size of two adult hands.
P: Patients use what they find acceptable, so preference matters. People with sensitive skin may react to preservatives or fragrances in creams. The MHRA warns that paraffin-based and other emollients can soak into clothing and bedding and act as fuel, increasing fire risk: patients should not smoke or go near naked flames, and fabrics should be washed often. Corticosteroid creams are applied thinly, while emollients are applied liberally and often.
X: Choosing a base.
> A man has very dry, cracked eczema on his hands.
> The pharmacist recommends an ointment-based emollient, applied often, because it is more occlusive than a cream.
> She explains how to use fingertip units for his corticosteroid ointment.
> She warns him about the fire risk from emollient-soaked clothing and not smoking.
K: Ointments are greasy and occlusive, creams are emulsions, gels are non-greasy polymer networks and pastes are protective; choose the base by skin condition, site and preference, and warn about emollient fire risk.
!: Ignoring patient preference. A greasy ointment that the patient will not use is less effective than a cream they apply regularly.
EV: established | The MHRA has issued warnings about the fire risk from emollient build-up on fabrics.
Q: What is a fingertip unit? | The amount squeezed along an adult fingertip, about 0.5 g, covering two adult hand areas.
Q: Why do aqueous creams need preservatives? | Their continuous water phase supports microbial growth.
SUM: Ointments occlude; creams and gels are lighter.
SUM: Match base to skin and patient.
SRC: Medicines and Healthcare products Regulatory Agency, Emollients and risk of severe and fatal burns: new resources available | guidance | 2020 | https://www.gov.uk/drug-safety-update
SRC: National Institute for Health and Care Excellence, Atopic eczema in under 12s: diagnosis and management (CG57) | guidance | 2023 | https://www.nice.org.uk/guidance/cg57
M1#pharmacy-u05-09-q1@1: Which preparation is greasiest and most occlusive? | An ointment with a white soft paraffin base | An aqueous cream | A carbomer gel | A lotion | A foam | Hydrocarbon ointment bases are greasy and strongly occlusive.
M2#pharmacy-u05-09-q2@2: Which base is usually best for a weeping, moist area of skin? | A cream | A thick ointment | A paste of wax | A hard fat suppository base | A dry powder | Creams are less occlusive and suit moist or weeping skin.
M3#pharmacy-u05-09-q3@3: What advice should be given about paraffin-based emollients? | Clothing and bedding soaked with them can catch fire easily | They are safe near naked flames once dry | They should be applied only once a week | They must never be used on dry skin | They prevent fires by coating fabrics | Emollient residue on fabrics can fuel fires.
MATCH1#pharmacy-u05-09-q4@2: Match each skin situation to a base. | Dry thickened skin = Ointment ; Weeping skin = Cream ; Hairy scalp = Gel ; Protecting skin = Paste | Base choice depends on the skin and site.
SA2#pharmacy-u05-09-q5@2,3: Explain how to choose between creams, ointments and gels and what advice to give patients. | Ointments are greasy and occlusive, suiting dry, scaly skin and increasing hydration and penetration. Creams are emulsions; aqueous creams are non-greasy and suit moist skin and the face but need preservatives. Gels are non-greasy and suit hairy areas. Choose by condition, site and patient preference. Advise using fingertip units for corticosteroids, applying emollients liberally, and the fire risk from emollient-soaked fabrics. | Ointments ; Creams ; Gels and site ; Preference ; Advice

## Tablets
LV: Intermediate · Application
S: Tablets are the most widely used dosage form. They are made by compressing powders and must break up, dissolve and deliver the right dose consistently.
O: Describe how tablets are manufactured
O: Explain the roles of tablet excipients and coatings
O: Describe pharmacopoeial tests for tablets
T: Granulation | Enlarging powder particles into granules to improve flow and compression
T: Friability | Loss of mass when tablets are tumbled, a test of resistance to chipping and abrasion
H: Making tablets
- **Wet granulation**: mix powders with a binder solution, dry and size the granules, then compress. Robust but uses water and heat.
- **Dry granulation**: compact powders by roller compaction or slugging, then mill. Suits moisture- or heat-sensitive drugs.
- **Direct compression**: compress a blend of drug and excipients without granulation; simple but needs good flow.
- Problems include **capping**, **lamination** and **sticking** to punches.
H: Excipients and coatings
- **Diluents** (lactose, microcrystalline cellulose), **binders** (povidone), **disintegrants** (croscarmellose, starch), **lubricants** (magnesium stearate) and **glidants** (colloidal silica).
- **Film coats** protect, mask taste and aid swallowing; **enteric coats** resist stomach acid.
P: Pharmacopoeial tests include **uniformity of mass** and **uniformity of content**, **disintegration** (uncoated tablets usually within 15 minutes), **dissolution**, **friability** (usually under 1% loss) and **crushing strength**. In practice, tablets should not be crushed or split unless this is known to be safe: crushing can destroy modified-release or enteric coatings, expose staff to hazardous drugs or give an unpleasant taste.
X: A crushing request.
> A care home nurse asks whether a resident's enteric-coated tablet can be crushed for easier swallowing.
> The pharmacist explains that crushing would remove the acid-resistant coat.
> The drug could be destroyed by stomach acid or irritate the stomach.
> She suggests a liquid formulation or another suitable product and updates the records.
K: Tablets are made by wet or dry granulation or direct compression, with diluents, binders, disintegrants, lubricants and glidants; tests check mass, content, disintegration, dissolution, friability and strength.
!: Crushing tablets without checking. Enteric and modified-release coatings can be destroyed, causing harm.
EV: established | Pharmacopoeial tests for tablets are legally required standards for licensed products.
Q: What is the role of a disintegrant? | To help the tablet break apart in fluid.
Q: What is friability? | The loss of mass when tablets are tumbled, testing resistance to chipping.
SUM: Granulate or compress directly.
SUM: Tests ensure consistent doses.
SRC: British Pharmacopoeia Commission, British Pharmacopoeia: General monograph on tablets | standard | 2025 | https://www.pharmacopoeia.com/
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
M1#pharmacy-u05-10-q1@1: Which tablet manufacturing method suits a moisture-sensitive drug? | Dry granulation by roller compaction | Wet granulation with water | Dissolving the drug in water first | Steam sterilisation before compression | Spray drying from an aqueous solution | Dry granulation compacts powders without using water or heat.
M2#pharmacy-u05-10-q2@2: What is the role of magnesium stearate in tablets? | A lubricant that stops sticking to punches and dies | A disintegrant that swells in water | A sweetener that masks taste | A binder that holds the granules | An enteric coating polymer | Lubricants reduce friction during compression and ejection.
M3#pharmacy-u05-10-q3@3: A tablet batch loses 2.5% of its mass in the friability test. What does this suggest? | Tablets are too fragile and may chip | Tablets have excellent strength | Tablets will not disintegrate | Tablets have no drug content | Tablets passed every test | A loss above about 1% indicates poor resistance to abrasion.
MATCH1#pharmacy-u05-10-q4@2: Match each excipient to its role. | Lactose = Diluent ; Povidone = Binder ; Croscarmellose = Disintegrant ; Colloidal silica = Glidant | Excipients each have a job.
SA2#pharmacy-u05-10-q5@1,3: Describe how tablets are manufactured and how their quality is tested. | Tablets are made by wet granulation, dry granulation by roller compaction or slugging, or direct compression. Excipients include diluents, binders, disintegrants, lubricants and glidants, and coatings may be film or enteric. Quality tests include uniformity of mass and content, disintegration, dissolution, friability and crushing strength. Manufacturing problems include capping, lamination and sticking. Tablets should be crushed only when known to be safe. | Manufacturing methods ; Excipients ; Coatings ; Tests ; Crushing

## Capsules
LV: Intermediate · Application
S: Capsules enclose a drug in a shell, usually of gelatin. They mask taste and are easy to swallow, but shell materials and storage conditions affect their use.
O: Distinguish hard and soft capsules
O: Describe capsule shell materials and contents
O: Advise on storage, opening capsules and patient preferences
T: Hard capsule | A two-piece shell, usually filled with powder or pellets
T: Soft capsule | A one-piece sealed shell, usually filled with a liquid or oily solution
H: Hard and soft capsules
- **Hard capsules**: two pieces, a body and a cap, filled with powders, granules or pellets; sizes range from 000 (largest) to 5 (smallest).
- **Soft capsules**: one piece, plasticised with glycerol or sorbitol, filled with oils or solutions, such as vitamin D or nifedipine capsules.
- Pellets in capsules can be coated to give **modified release**.
H: Shell materials and storage
- **Gelatin** is the usual shell material; **hydroxypropyl methylcellulose (HPMC)** shells suit vegetarian, vegan and some religious needs.
- Gelatin shells become **brittle** in very dry conditions and **soft and sticky** in humidity.
- Ageing can cause gelatin **cross-linking**, slowing dissolution.
P: Patients may ask about gelatin for religious, ethical or dietary reasons; pharmacists can check the product information and look for HPMC alternatives. Opening capsules and sprinkling the contents is sometimes allowed, as with some modified-release pellets on soft food, but it is often unlicensed and can destroy release properties. Patients should swallow capsules with water while upright, because capsules can stick in the oesophagus.
X: A dietary request.
> A vegan patient asks whether her new capsules contain animal products.
> The pharmacist checks the product information and finds a gelatin shell.
> She identifies another brand in HPMC shells with the same strength.
> She discusses the change with the prescriber and records it.
K: Hard capsules are two-piece and hold powders or pellets; soft capsules are one-piece and hold liquids; gelatin or HPMC shells are used, and storage, opening and patient preferences need care.
!: Assuming capsules can always be opened. Doing so can be unlicensed and may destroy modified-release properties.
EV: established | Hard and soft capsule technology and their pharmacopoeial requirements are well established.
Q: What do soft capsules usually contain? | Liquids or oily solutions.
Q: What is an alternative shell material to gelatin? | Hydroxypropyl methylcellulose (HPMC).
SUM: Hard holds powders; soft holds liquids.
SUM: Check shells and opening advice.
SRC: British Pharmacopoeia Commission, British Pharmacopoeia: General monograph on capsules | standard | 2025 | https://www.pharmacopoeia.com/
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
M1#pharmacy-u05-11-q1@1: Which capsule type is a sealed single piece filled with liquid? | A soft capsule | A hard capsule | An enteric tablet | A pessary | A lozenge | Soft capsules are one-piece, plasticised and filled with liquids.
M2#pharmacy-u05-11-q2@2: How do gelatin capsules usually behave in very humid storage? | They soften and become sticky | They become brittle and crack | They dissolve their contents | They turn into tablets | They become sterile | Gelatin absorbs moisture in humid conditions.
M3#pharmacy-u05-11-q3@3: A patient asks to open a modified-release capsule and swallow the contents. What should the pharmacist do first? | Check the product information to see whether this is permitted | Agree, as all capsules can be opened | Tell the patient to crush the pellets finely | Advise mixing the contents with hot tea | Suggest doubling the dose afterwards | Some pellets may be sprinkled, but others must not be opened.
TF1#pharmacy-u05-11-q4@1: Hard capsules range in size from 000, the largest, to 5, the smallest. | true | Capsule sizes run from 000, the largest, down to size 5.
SA2#pharmacy-u05-11-q5@1,3: Compare hard and soft capsules and describe advice pharmacists give about capsules. | Hard capsules have a two-piece body and cap and hold powders, granules or pellets, which may be coated for modified release. Soft capsules are one-piece, plasticised and hold liquids or oils. Shells are usually gelatin, which softens in humidity and becomes brittle when dry, or HPMC for vegetarian and religious needs. Pharmacists check whether capsules can be opened, advise swallowing upright with water and help find alternatives for dietary needs. | Hard capsules ; Soft capsules ; Shell materials ; Storage ; Patient advice

## Modified-release dosage forms
LV: Intermediate · Application
S: Modified-release products change when or how fast a drug is released. They can reduce dosing frequency, smooth blood levels or protect the drug or stomach, but they must be used correctly.
O: Distinguish delayed-release and prolonged-release dosage forms
O: Describe the main technologies used to modify release
O: Advise on safe use, including crushing, alcohol and brand prescribing
T: Delayed release | Release that starts after a delay, such as enteric-coated products that release in the intestine
T: Prolonged release | Release spread over an extended period, also called sustained, extended or modified release
H: Types and technologies
- **Delayed release**: **enteric (gastro-resistant) coats** dissolve above pH 5 to 6, protecting acid-labile drugs such as omeprazole or protecting the stomach.
- **Prolonged release**: **matrix** systems (drug in a polymer that slowly dissolves or swells), **reservoir** systems (drug core with a rate-controlling membrane) and **osmotic pumps** that push drug through a laser-drilled hole.
- Release can also be targeted to the colon, as with some mesalazine products.
H: Safe use
- Do not **crush or chew**: this can cause **dose dumping**, releasing the whole dose at once.
- Alcohol can disrupt some formulations and cause dose dumping.
- Osmotic tablet shells may appear intact in stools; this is normal.
- Some products are not interchangeable, so the **MHRA** advises prescribing some by brand, such as some modified-release nifedipine and diltiazem products, theophylline and lithium.
P: Modified-release products have clear benefits: once-daily dosing improves adherence, steady levels reduce peak-related side effects, and enteric coats protect drugs and stomachs. But they also have risks. Release depends on transit through the gut, so they may be unsuitable for people with very rapid transit or short bowel. Pharmacists should check that the formulation is right for the patient and that brand continuity is maintained where needed.
X: A brand switch.
> A patient's repeat prescription for a modified-release diltiazem product is written generically.
> The pharmacist notes that different brands have different release profiles.
> She contacts the prescriber to prescribe by brand, as the patient has been stable on one brand.
> The patient continues on the same product without a change in blood pressure control.
K: Delayed-release products such as enteric coats release later; prolonged-release matrices, reservoirs and osmotic pumps release slowly; they must not be crushed, may dose-dump with alcohol and sometimes need brand prescribing.
!: Crushing or chewing modified-release tablets. The whole dose may be released at once, causing toxicity.
EV: established | Dose dumping from damaged modified-release products is a recognised safety risk, and brand prescribing is advised for some products.
Q: What is dose dumping? | Rapid release of all or much of a modified-release dose at once.
Q: Why might an osmotic tablet shell appear in stools? | The empty shell passes through intact after releasing its drug.
SUM: Delayed or prolonged release.
SUM: Do not crush; check brand.
SRC: Medicines and Healthcare products Regulatory Agency, Modified-release preparations: prescribing by brand | guidance | 2024 | https://www.gov.uk/drug-safety-update
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
M1#pharmacy-u05-12-q1@1: Why is omeprazole given in a gastro-resistant form? | It is destroyed by stomach acid | It must act in the stomach lining only | It needs to dissolve in the mouth | It is too soluble to absorb | It acts only in the colon | Enteric protection stops acid degrading omeprazole before absorption.
M2#pharmacy-u05-12-q2@2: How does an osmotic pump tablet release its drug? | Water enters and pushes drug out through a small hole | The tablet melts at body temperature | Bacteria in the gut break it open | It dissolves instantly in the stomach | It is broken apart by chewing | Osmotic pressure drives drug out at a controlled rate.
M3#pharmacy-u05-12-q3@3: A patient wants to drink alcohol while taking a prolonged-release opioid. Why might this be risky? | Alcohol can disrupt some formulations and cause dose dumping | Alcohol makes the tablet release more slowly | Alcohol has no effect on any formulation | Alcohol converts the opioid to an antagonist | Alcohol prevents absorption completely | Some modified-release products release rapidly in alcohol, adding to sedation.
MATCH1#pharmacy-u05-12-q4@2: Match each technology to its description. | Enteric coat = Dissolves above stomach pH ; Matrix = Drug in a slowly eroding polymer ; Reservoir = Rate-controlling membrane ; Osmotic pump = Pushed out through a hole | Several technologies modify release.
SA2#pharmacy-u05-12-q5@1,3: Explain the types of modified-release dosage forms and the advice needed for their safe use. | Delayed-release products, such as enteric-coated tablets, release after leaving the stomach to protect acid-labile drugs or the stomach. Prolonged-release products use matrices, reservoirs with membranes or osmotic pumps to release drug slowly, reducing dosing frequency and smoothing levels. They must not be crushed or chewed, as this causes dose dumping, and alcohol can disrupt some. Osmotic shells can appear in stools. Some products need brand prescribing because release profiles differ. | Delayed release ; Prolonged release ; Crushing and dose dumping ; Alcohol and shells ; Brand prescribing

## Excipients
LV: Intermediate · Application
S: Excipients are the ingredients other than the active drug. They make medicines manufacturable, stable and acceptable, but some cause problems for particular patients.
O: Describe the main functions of excipients
O: Identify excipients with known effects
O: Check excipients when supplying medicines to patients with particular needs
T: Excipient | Any component of a medicine other than the active substance
T: Excipient with known effect | An excipient that must be declared because it can cause effects in some patients
H: Functions
- Fillers and diluents, binders, disintegrants, lubricants and glidants in solids.
- Solvents, cosolvents, buffers, tonicity agents and viscosity modifiers in liquids.
- Preservatives, antioxidants and chelating agents for stability.
- Sweeteners, flavours and colours for acceptability.
- Release-controlling polymers and coatings.
H: Excipients with known effects
- **Lactose**: usually tolerated by people with lactose intolerance in tablet amounts, but declared.
- **Aspartame**: a source of phenylalanine, important in **phenylketonuria**.
- **Ethanol**, **sucrose**, **sodium** and **potassium** content.
- **Arachis (peanut) oil** and **soya**: allergy.
- **Propylene glycol** and **benzyl alcohol**: toxicity risk in neonates.
- **Gelatin** and some colourants: dietary, religious or allergy concerns.
P: Excipients with known effects are listed in the product information and patient leaflet. Pharmacists check them for patients with allergies, intolerances, dietary or religious needs, diabetes, phenylketonuria or alcohol dependence, and for neonates. Different brands of the same drug may contain different excipients, so switching brand can matter. When no suitable product exists, an unlicensed special may be needed.
X: Checking an excipient.
> A child with phenylketonuria is prescribed a chewable tablet.
> The pharmacist checks the product information and finds aspartame.
> She contacts the prescriber and suggests an alternative product without aspartame.
> The change avoids an unwanted source of phenylalanine.
K: Excipients make medicines manufacturable, stable and acceptable; excipients with known effects such as aspartame, arachis oil, ethanol, propylene glycol and gelatin must be checked for individual patients.
!: Assuming generic brands have identical excipients. Different brands can contain different excipients that matter for some patients.
EV: established | Regulatory guidance requires excipients with known effects to be declared in product labelling.
Q: Why must aspartame be declared? | It is a source of phenylalanine, harmful in phenylketonuria.
Q: Why is benzyl alcohol a concern in neonates? | It can accumulate and cause serious toxicity.
SUM: Excipients enable medicines.
SUM: Check excipients with known effects.
SRC: European Medicines Agency, Excipients in the labelling and package leaflet of medicinal products for human use | guidance | 2019 | https://www.ema.europa.eu/
SRC: Rowe RC, Sheskey PJ and Quinn ME (editors), Handbook of Pharmaceutical Excipients, 6th edition, Pharmaceutical Press | secondary | 2009
M1#pharmacy-u05-13-q1@1: Which is a function of excipients in tablets? | Helping the tablet disintegrate in fluid | Providing the main therapeutic effect | Replacing the need for an active drug | Making the tablet radioactive | Preventing any absorption of drug | Disintegrants are excipients that help tablets break up.
M2#pharmacy-u05-13-q2@2: Which excipient is a concern for a patient with a peanut allergy? | Arachis oil | Microcrystalline cellulose | Magnesium stearate | Purified water | Colloidal silica | Arachis oil is peanut oil and must be declared.
M3#pharmacy-u05-13-q3@3: A patient with alcohol dependence is prescribed an oral liquid. What should the pharmacist check? | Whether the liquid contains ethanol | Whether the bottle is made of glass | Whether the label is in colour | Whether the liquid is shaken | Whether the cap is blue | Some liquids contain significant ethanol, which may be unsuitable.
MATCH1#pharmacy-u05-13-q4@2: Match each excipient to the patient group of concern. | Aspartame = Phenylketonuria ; Arachis oil = Peanut allergy ; Gelatin = Vegan patients ; Propylene glycol = Neonates | Excipients matter for particular patients.
SA2#pharmacy-u05-13-q5@1,3: Explain the roles of excipients and why pharmacists must check them. | Excipients act as fillers, binders, disintegrants, lubricants, solvents, buffers, preservatives, sweeteners, colours and release-controlling agents, making medicines manufacturable, stable and acceptable. Some have known effects: aspartame in phenylketonuria, arachis oil in peanut allergy, ethanol in alcohol dependence and children, propylene glycol and benzyl alcohol in neonates, and gelatin for dietary and religious needs. They are listed in product information, and brands differ, so pharmacists check them for individual patients. | Functions ; Known effects ; Patient groups ; Product information ; Brand differences

## Parenteral products
LV: Intermediate · Application
S: Parenteral products are given by injection or infusion, bypassing the gut. Because they enter the body directly, they must meet strict standards for sterility, purity and compatibility.
O: Describe the main parenteral routes and product types
O: Explain the quality requirements for parenteral products
O: Identify safety issues in preparing and giving injections
T: Parenteral | Given by a route other than the gut, usually by injection or infusion
T: Pyrogen | A substance, such as bacterial endotoxin, that causes fever when injected
H: Routes and products
- **Intravenous** (IV): rapid, complete bioavailability; bolus or infusion.
- **Intramuscular** (IM) and **subcutaneous** (SC): slower absorption; depot formulations possible.
- **Intradermal**, **intrathecal** and **epidural** routes for specialist uses.
- **Small-volume** parenterals (ampoules and vials) and **large-volume** parenterals (infusion bags).
H: Quality requirements
- **Sterile** and **pyrogen-free**; endotoxins are tested by the limulus amebocyte lysate (LAL) or recombinant tests.
- **Free from visible particles**.
- Ideally **isotonic** and near physiological **pH**, especially for large volumes.
- **Water for injections** is the usual vehicle.
- Multi-dose vials need **preservatives**; intrathecal products must be preservative free.
P: Parenteral errors can cause serious harm. Wrong-route errors, such as intrathecal vincristine, are fatal and are NHS **Never Events**; vinca alkaloids are given in minibags rather than syringes to prevent this. Pharmacists check doses, dilutions, rates, compatibility and stability, and use resources such as the Injectable Medicines Guide. Isotonic sodium chloride 0.9% contains 9 g of sodium chloride per litre.
X: A compatibility check.
> A nurse wants to add a drug to a running infusion of another medicine.
> The pharmacist checks compatibility data and finds the drugs precipitate when mixed.
> She advises a separate line or flushing between drugs.
> The nurse documents the advice and gives the drugs safely.
K: Parenteral products bypass the gut by IV, IM, SC and other routes; they must be sterile, pyrogen-free, particle-free and ideally isotonic, and wrong-route and compatibility errors must be prevented.
!: Assuming any two injections can be mixed. Many are incompatible and precipitate or degrade.
EV: established | Wrong-route administration of vinca alkaloids is a recognised Never Event in the NHS.
Q: What is a pyrogen? | A substance, such as endotoxin, that causes fever when injected.
Q: Why must intrathecal products be preservative free? | Preservatives can be toxic to nerve tissue.
SUM: Sterile, pyrogen-free, particle-free.
SUM: Check route, dose and compatibility.
SRC: NHS England, Never Events list | guidance | 2018 | https://www.england.nhs.uk/patient-safety/
SRC: British Pharmacopoeia Commission, British Pharmacopoeia: General monograph on parenteral preparations | standard | 2025 | https://www.pharmacopoeia.com/
M1#pharmacy-u05-14-q1@1: Which parenteral route gives complete bioavailability? | Intravenous | Intramuscular | Subcutaneous | Intradermal | Transdermal | IV injection delivers the whole dose straight into the circulation.
M2#pharmacy-u05-14-q2@2: Which test detects bacterial endotoxins in injections? | The limulus amebocyte lysate test | The friability test | The disintegration test | The angle of repose test | The dye test | The LAL test detects endotoxins that cause fever.
M3#pharmacy-u05-14-q3@3: Why are vinca alkaloids such as vincristine supplied in minibags? | To prevent accidental intrathecal administration | To make them easier to store at room temperature | To mask their colour from patients | To allow oral administration | To increase their potency | Minibags cannot be connected to spinal needles, preventing a fatal error.
NUM1#pharmacy-u05-14-q4@3: Sodium chloride 0.9% w/v contains 9 g per litre. How many grams are in a 500 mL bag? | 4.5 | 0 | g | 0.9 g per 100 mL × 5 = 4.5 g in 500 mL.
SA2#pharmacy-u05-14-q5@2,3: Explain the quality requirements for parenteral products and the main safety issues. | Parenteral products bypass the gut, so they must be sterile, pyrogen-free, tested for endotoxins, free from visible particles, ideally isotonic and near physiological pH, usually in water for injections. Multi-dose vials need preservatives, but intrathecal products must be preservative free. Safety issues include wrong-route errors such as intrathecal vincristine, a Never Event, dose and rate errors, and incompatibility when drugs are mixed. Pharmacists check these using resources such as the Injectable Medicines Guide. | Sterility and pyrogens ; Particles, tonicity and pH ; Preservatives ; Wrong-route errors ; Compatibility

## Sterile products and aseptic manufacture
LV: Intermediate · Application
S: Sterile products must be free from viable microorganisms. They are made either by sterilising the final product or, when that is not possible, by aseptic processing in controlled environments.
O: Describe methods of sterilisation and when each is used
O: Explain aseptic processing and cleanroom grades
O: Describe the role of pharmacy aseptic units
T: Terminal sterilisation | Sterilising a product in its final sealed container
T: Sterility assurance level (SAL) | The probability of a non-sterile unit after sterilisation, usually 1 in a million
H: Sterilisation methods
- **Moist heat** (autoclaving), typically **121 °C for 15 minutes**: the preferred method for aqueous products.
- **Dry heat**, such as 160 °C for at least 2 hours, for glassware and oils.
- **Ionising radiation**, such as gamma rays, for devices and some heat-sensitive products.
- **Filtration** through a **0.22 µm** filter for heat-sensitive solutions, followed by aseptic filling.
- Terminal sterilisation is preferred because it gives the highest **sterility assurance**.
H: Aseptic processing
- Used when products cannot be terminally sterilised.
- Carried out in **Grade A** zones (laminar airflow cabinets or **isolators**) within controlled background rooms.
- Staff are trained, gowned and monitored; processes are validated by **media fills**.
- Environmental monitoring checks air, surfaces and gloves.
P: Hospital pharmacy **aseptic units** prepare products such as parenteral nutrition, chemotherapy, monoclonal antibodies and ready-to-administer injections (CIVAS). They work under GMP or specials licences, or under pharmacy exemptions with strict standards and audit. Products have short expiries because aseptic processing cannot guarantee the same level of sterility as terminal sterilisation. Cytotoxic products are made in negative-pressure isolators to protect staff.
X: Making chemotherapy.
> An aseptic unit receives a prescription for an intravenous chemotherapy dose.
> A pharmacist checks the prescription, worksheet and calculations.
> A trained technician prepares it in a negative-pressure isolator using aseptic technique.
> The product is checked, labelled with a short expiry and released.
K: Moist heat, dry heat, radiation and filtration sterilise products, with terminal sterilisation preferred; aseptic processing in Grade A zones is used for heat-sensitive products, and pharmacy aseptic units prepare high-risk injections.
!: Assuming aseptically prepared products are as safe as terminally sterilised ones. Their sterility assurance is lower, so expiries are shorter.
EV: established | EU GMP Annex 1 sets standards for manufacturing sterile medicinal products, including cleanroom grades and aseptic processing.
Q: What are typical autoclave conditions? | 121 °C for 15 minutes.
Q: What pore size is used for sterilising filtration? | 0.22 µm.
SUM: Terminal sterilisation is preferred.
SUM: Aseptic processing needs Grade A conditions.
SRC: European Commission, EudraLex Volume 4, Annex 1: Manufacture of sterile medicinal products | guidance | 2022 | https://health.ec.europa.eu/medicinal-products/eudralex/eudralex-volume-4_en
SRC: NHS Pharmaceutical Quality Assurance Committee, Quality Assurance of Aseptic Preparation Services: Standards Handbook, 5th edition | standard | 2016 | https://www.sps.nhs.uk/
M1#pharmacy-u05-15-q1@1: Which sterilisation method is preferred for aqueous solutions in sealed containers? | Moist heat in an autoclave | Filtration through cotton wool | Ultraviolet light from a lamp | Freezing at −20 °C | Washing with alcohol | Autoclaving gives the highest sterility assurance for aqueous products.
M2#pharmacy-u05-15-q2@2: Where is aseptic filling carried out? | In a Grade A zone such as an isolator or laminar airflow cabinet | On an open dispensing bench | In a domestic kitchen | In a general storage room | In the patient's home | Grade A zones give the cleanest air for exposed sterile products.
M3#pharmacy-u05-15-q3@3: Why do aseptically prepared products usually have short expiries? | Aseptic processing gives lower sterility assurance than terminal sterilisation | They are always less potent than licensed products | They contain no water at all | They must be used before they cool down | Regulations ban long expiries for any injection | Short expiries limit the impact of any contamination.
SEQ1#pharmacy-u05-15-q4@3: Order the steps in preparing an aseptic product. | Clinical and prescription check ; Prepare worksheet and labels ; Aseptic preparation in Grade A zone ; Final check and release | Checks bracket the aseptic process.
SA2#pharmacy-u05-15-q5@1,3: Explain how sterile products are made and the role of aseptic units. | Terminal sterilisation is preferred: moist heat at 121 °C for 15 minutes for aqueous products, dry heat for glassware and oils, and radiation for some products. Heat-sensitive solutions are filtered through 0.22 µm filters and filled aseptically. Aseptic processing uses Grade A zones such as isolators, trained gowned staff, media fills and environmental monitoring. Pharmacy aseptic units prepare parenteral nutrition, chemotherapy and ready-to-use injections with short expiries, protecting staff with negative-pressure isolators. | Terminal methods ; Filtration ; Aseptic conditions ; Validation ; Aseptic units

## Ophthalmic preparations
LV: Intermediate · Application
S: Eye preparations must be sterile and comfortable, and they must overcome the eye's rapid tear turnover. Good technique matters as much as the formulation.
O: Describe the types and requirements of ophthalmic preparations
O: Explain the role of preservatives and preservative-free products
O: Advise patients on using eye drops and ointments correctly
T: Ophthalmic preparation | A sterile product for use in or on the eye
T: Nasolacrimal occlusion | Pressing on the inner corner of the eye after drops to reduce drainage and systemic absorption
H: Types and requirements
- Eye drops, eye ointments, gels and lotions.
- Must be **sterile**, ideally **isotonic** and close to tear **pH**, and free of irritant particles.
- Multi-dose drops contain preservatives such as **benzalkonium chloride** and are usually discarded **28 days** after opening.
- **Preservative-free** single-dose units suit people with preservative sensitivity, long-term glaucoma treatment or soft contact lenses.
H: Absorption and technique
- A drop is about 30 to 50 µL, but the eye holds only about 7 to 10 µL, so **one drop** is enough.
- Most of a drop drains away within minutes into the nasolacrimal duct, where it can be absorbed systemically.
- **Nasolacrimal occlusion** and closing the eye for a minute or two reduce systemic effects, such as from timolol.
- Wait about **5 minutes** between different drops; apply ointments last.
P: Benzalkonium chloride can damage the corneal surface with long-term use and is absorbed by soft contact lenses, so patients should usually remove lenses before using preserved drops and wait about 15 minutes before reinserting them. Patients should wash their hands, avoid touching the tip to the eye, and not share eye products. Many find instilling drops difficult, and compliance aids can help.
X: Counselling on glaucoma drops.
> A patient with asthma is prescribed timolol eye drops.
> The pharmacist notes that timolol is a beta-blocker and can be absorbed systemically.
> She checks with the prescriber, as beta-blockers can trigger bronchospasm.
> If they are used, she teaches one drop, eye closure and nasolacrimal occlusion to reduce absorption.
K: Eye preparations are sterile, isotonic and near tear pH; preserved multi-dose products are discarded 28 days after opening, preservative-free units suit some patients, and good technique reduces waste and systemic effects.
!: Using two drops instead of one. The eye cannot hold more than one, so the extra only increases waste and systemic absorption.
EV: established | Nasolacrimal occlusion reduces systemic absorption of topically applied eye drops.
Q: How long are most multi-dose eye drops kept after opening? | 28 days.
Q: How long should patients wait between different eye drops? | About 5 minutes.
SUM: Sterile, isotonic, preserved or not.
SUM: One drop, occlude, wait between drops.
SRC: British Pharmacopoeia Commission, British Pharmacopoeia: General monograph on eye preparations | standard | 2025 | https://www.pharmacopoeia.com/
SRC: Royal College of Ophthalmologists, Patient information: using eye drops | guidance | 2024 | https://www.rcophth.ac.uk/
M1#pharmacy-u05-16-q1@1: Which property must all eye preparations have? | They must be sterile | They must be oily | They must be coloured | They must be strongly alkaline | They must contain ethanol | Sterility protects the eye from infection.
M2#pharmacy-u05-16-q2@2: Why might a patient with soft contact lenses need preservative-free drops? | Benzalkonium chloride is absorbed by soft lenses | Preservatives make the drops work faster | Contact lenses need extra preservatives | Preservative-free drops last longer once opened | Soft lenses neutralise all eye drops | Lenses absorb the preservative, which can irritate the eye.
M3#pharmacy-u05-16-q3@3: Why should patients close their eye and press the inner corner after a drop? | To reduce drainage into the nose and systemic absorption | To increase the volume of the drop | To spread the drop to the other eye | To stop the eye producing tears forever | To activate the preservative | Nasolacrimal occlusion keeps the drug in the eye and reduces side effects.
NUM1#pharmacy-u05-16-q4@2: A patient opens a bottle of preserved eye drops on 1 April. On what day of April should it be discarded, using a 28-day in-use expiry? | 29 | 0 | th | 1 April plus 28 days is 29 April.
SA2#pharmacy-u05-16-q5@2,3: Explain the formulation and correct use of eye drops. | Eye drops must be sterile, ideally isotonic and near tear pH. Multi-dose drops contain preservatives such as benzalkonium chloride and are discarded 28 days after opening, while preservative-free units suit sensitive patients and contact lens wearers. The eye holds only about 7 to 10 µL, so one drop is enough. Patients wash hands, avoid touching the tip, close the eye and press the inner corner to reduce systemic absorption, wait 5 minutes between drops and apply ointments last. | Sterility and tonicity ; Preservatives ; Drop volume ; Technique ; Order and timing

## Inhaled dosage forms
LV: Intermediate · Application
S: Inhaled medicines deliver drugs straight to the lungs. Success depends on particle size, the device and, above all, the patient's technique.
O: Describe the main types of inhaler and nebuliser
O: Explain how particle size affects deposition in the airways
O: Match devices to patients and support correct technique
T: Pressurised metered-dose inhaler (pMDI) | A device using a propellant to release a measured dose as an aerosol
T: Dry powder inhaler (DPI) | A breath-actuated device delivering drug as a fine powder
H: Devices
- **pMDIs**: need a slow, steady breath coordinated with pressing the canister; a **spacer** improves delivery and reduces mouth deposition.
- **DPIs**: breath actuated, needing a **quick, forceful** inhalation; no coordination needed.
- **Soft mist inhalers**: a slow-moving mist that is easier to inhale.
- **Nebulisers**: convert solutions into a mist for patients unable to use inhalers.
H: Particle size and deposition
- Particles of about **1 to 5 µm** reach the lower airways.
- Larger particles deposit in the mouth and throat and are swallowed.
- Particles under about 1 µm may be breathed out.
- Inhaled corticosteroid deposited in the mouth can cause **oral thrush** and hoarseness, so patients rinse their mouths after use.
P: Poor technique is very common and reduces benefit. Pharmacists should check technique at every opportunity, using placebo devices or watching patients use their own. The choice of device should consider the patient's inspiratory flow, coordination, dexterity and preference. pMDIs use propellants with a high carbon footprint, so UK guidance encourages lower-carbon devices, such as DPIs, where clinically suitable.
X: Choosing a device.
> An older woman with arthritis struggles to press her pMDI and breathe in at the same time.
> The pharmacist checks her inspiratory flow and finds it strong enough for a DPI.
> She discusses switching to a breath-actuated DPI with the prescriber.
> She teaches the new technique, including a quick, deep breath and rinsing after the steroid.
K: pMDIs need slow coordinated breaths and benefit from spacers; DPIs need fast forceful breaths; particles of 1 to 5 µm reach the lower airways; match the device to the patient and check technique.
!: Using the same breathing technique for every device. pMDIs need a slow breath; DPIs need a fast, forceful one.
EV: established | Inhaler technique strongly affects drug delivery, and poor technique is common among patients.
Q: What particle size reaches the lower airways? | About 1 to 5 µm.
Q: Why should patients rinse their mouth after an inhaled corticosteroid? | To reduce oral thrush and hoarseness.
SUM: Slow for pMDIs; fast for DPIs.
SUM: Check technique every time.
SRC: National Institute for Health and Care Excellence, Patient decision aid: inhalers for asthma | guidance | 2022 | https://www.nice.org.uk/guidance/ng80/resources
SRC: British Thoracic Society and Scottish Intercollegiate Guidelines Network, British guideline on the management of asthma (SIGN 158) | guidance | 2019 | https://www.sign.ac.uk/
M1#pharmacy-u05-17-q1@1: Which device needs a quick, forceful inhalation? | A dry powder inhaler | A pressurised metered-dose inhaler | A nebuliser | A spacer with a pMDI | An eye dropper | DPIs need a strong breath to break up and inhale the powder.
M2#pharmacy-u05-17-q2@2: Where do particles larger than about 5 µm mainly deposit? | In the mouth and throat | In the alveoli | In the bloodstream directly | In the kidneys | In the exhaled air only | Large particles impact on the oropharynx and are swallowed.
M3#pharmacy-u05-17-q3@3: A patient cannot coordinate pressing a pMDI with breathing in. What is a good option? | Using a spacer with the pMDI | Doubling the number of puffs | Inhaling as fast as possible | Spraying into the air and sniffing | Stopping the inhaler | A spacer removes the need for precise coordination.
MATCH1#pharmacy-u05-17-q4@3: Match each device to its technique. | pMDI = Slow, steady breath ; DPI = Quick, forceful breath ; Spacer = Reduces need for coordination ; Nebuliser = Normal breathing through a mask | Technique depends on the device.
SA2#pharmacy-u05-17-q5@1,3: Describe the main inhaled dosage forms and how pharmacists help patients use them well. | pMDIs release an aerosol with a propellant and need a slow, steady, coordinated breath; spacers improve delivery and reduce mouth deposition. DPIs are breath actuated and need a quick, forceful breath. Soft mist inhalers and nebulisers suit some patients. Particles of 1 to 5 µm reach the lower airways. Pharmacists check technique, choose devices by inspiratory flow, coordination and preference, advise rinsing after corticosteroids, and consider lower-carbon devices. | pMDIs and spacers ; DPIs ; Particle size ; Technique checks ; Device choice

## Transdermal and topical delivery
LV: Intermediate · Application
S: Transdermal patches deliver drugs through the skin into the bloodstream over hours or days. Only some drugs are suitable, and heat, site and disposal all affect safety.
O: Explain how drugs cross the skin
O: Describe the design and properties of transdermal patches
O: Advise patients on safe use and disposal of patches
T: Stratum corneum | The outermost layer of the skin and the main barrier to drug penetration
T: Transdermal patch | An adhesive system that delivers drug through the skin into the systemic circulation
H: Crossing the skin
- The **stratum corneum** is the main barrier.
- Drugs cross by **passive diffusion**, described by Fick's law, through or between cells and via hair follicles.
- Suitable drugs are **potent** (low daily dose), have **moderate lipophilicity** and a low molecular weight (usually under about 500).
- Hydration, occlusion, temperature and skin damage increase absorption.
H: Patch design and examples
- **Reservoir patches**: drug in a reservoir with a rate-controlling membrane.
- **Matrix patches**: drug dispersed in the adhesive or a polymer matrix.
- Examples: **fentanyl**, **buprenorphine**, **nicotine**, **oestradiol** for HRT, **rivastigmine** and **glyceryl trinitrate**.
- Benefits: steady levels, avoids first-pass metabolism, useful when swallowing is difficult.
P: Heat increases absorption, so patients using **fentanyl patches** must avoid hot water bottles, electric blankets, saunas and hot baths, and seek advice if they have a fever; the MHRA has warned about accidental overdose. Patches are applied to clean, dry, hairless skin, with **site rotation**. Used patches still contain drug, so they are **folded in half**, sticky sides together, and disposed of safely, because children and pets have been harmed by exposure.
X: Patch counselling.
> A patient is starting a 72-hour fentanyl patch for chronic cancer pain.
> The pharmacist explains to apply it to clean, dry, hairless skin on the upper arm or chest and rotate sites.
> She warns against heat pads and hot baths, and to seek advice if he develops a fever.
> She shows him how to fold used patches and dispose of them safely away from children.
K: Drugs cross the stratum corneum by passive diffusion, so patches suit potent, moderately lipophilic, small drugs; reservoir and matrix patches give steady levels, and heat, site rotation and safe disposal must be managed.
!: Applying heat over a fentanyl patch. Heat increases absorption and can cause life-threatening opioid toxicity.
EV: established | The MHRA has warned that heat and accidental exposure increase the risk of fentanyl patch toxicity.
Q: Which skin layer is the main barrier to drug absorption? | The stratum corneum.
Q: How should used fentanyl patches be disposed of? | Folded in half with sticky sides together and disposed of safely away from children.
SUM: Small, potent, lipophilic drugs suit patches.
SUM: Avoid heat; rotate sites; dispose safely.
SRC: Medicines and Healthcare products Regulatory Agency, Transdermal fentanyl patches: reminder of potential for life-threatening harm from accidental exposure | guidance | 2018 | https://www.gov.uk/drug-safety-update
SRC: Benson HAE and Watkinson AC (editors), Transdermal and Topical Drug Delivery: Principles and Practice, Wiley | secondary | 2012
M1#pharmacy-u05-18-q1@1: Which property makes a drug suitable for transdermal delivery? | High potency with a low daily dose | A very high molecular weight | Very high water solubility | A large daily dose of several grams | Complete ionisation at skin pH | Only small amounts cross the skin, so potent drugs are needed.
M2#pharmacy-u05-18-q2@2: What is a benefit of transdermal patches? | They avoid first-pass metabolism and give steady levels | They give an instant peak like an IV bolus | They allow very large doses to be absorbed | They need to be changed every hour | They work best on hairy, damaged skin | Patches deliver drug steadily into the systemic circulation.
M3#pharmacy-u05-18-q3@3: A patient using a fentanyl patch develops a high fever. What should the pharmacist advise? | Seek medical advice, as heat can increase absorption and toxicity | Apply a second patch to control the fever | Use a hot water bottle over the patch | Cut the patch in half to reduce the dose | Ignore it, as fever has no effect | Increased skin temperature raises fentanyl absorption.
TF1#pharmacy-u05-18-q4@3: Used transdermal patches can still contain enough drug to harm a child. | true | Patches retain a large amount of drug after use, so safe disposal is essential.
SA2#pharmacy-u05-18-q5@1,3: Explain how transdermal patches work and the advice patients need. | Drugs cross the stratum corneum by passive diffusion, so suitable drugs are potent, moderately lipophilic and small. Reservoir patches use a rate-controlling membrane and matrix patches hold drug in a polymer. Examples are fentanyl, buprenorphine, nicotine, oestradiol and rivastigmine. Patches give steady levels and avoid first-pass metabolism. Patients apply them to clean, dry, hairless skin, rotate sites, avoid heat and seek advice with fever, and fold used patches before safe disposal. | Skin barrier ; Suitable drugs ; Patch types ; Benefits ; Safe use and disposal

## Rectal and vaginal dosage forms
LV: Intermediate · Application
S: Rectal and vaginal dosage forms deliver drugs locally or systemically when oral use is unsuitable. Their bases are designed to melt or dissolve at body temperature.
O: Describe suppositories, enemas, pessaries and vaginal products
O: Explain how suppository bases release drugs and how rectal absorption differs from oral absorption
O: Advise patients on using rectal and vaginal products
T: Suppository | A solid dosage form for rectal use that melts or dissolves at body temperature
T: Pessary | A solid dosage form for vaginal use
H: Products and bases
- **Suppositories** use **fatty bases** (hard fat, theobroma oil) that melt at body temperature, or **water-soluble bases** (glycerol-gelatin, macrogols) that dissolve in body fluids.
- **Enemas**: liquids or foams for rectal use, such as mesalazine or corticosteroid enemas in ulcerative colitis.
- **Pessaries**, vaginal creams, gels and rings, such as clotrimazole pessaries or oestradiol vaginal tablets.
- Rectal tubes of diazepam and paracetamol suppositories are used when oral dosing is not possible.
H: Absorption
- Rectal absorption can be slow and variable.
- The lower rectum drains partly into veins that bypass the liver, so **first-pass metabolism** can be partly avoided.
- The upper rectum drains into the portal system.
- Vaginal absorption is mainly used for **local** effects but can be systemic.
P: Rectal and vaginal routes are useful in vomiting, unconsciousness, seizures, swallowing difficulties and palliative care, and for local treatment. Patients may find them embarrassing, so clear, private counselling is important. For suppositories, the patient lies on their side and inserts the suppository beyond the anal sphincter. Some products, such as vaginal creams, may weaken latex condoms and diaphragms, which affects contraception.
X: Counselling on a pessary.
> A woman is supplied a clotrimazole pessary for vaginal thrush.
> The pharmacist explains to insert it high into the vagina at bedtime, lying on her back with knees bent.
> She mentions that the product may damage latex condoms and diaphragms.
> She advises seeing a doctor if symptoms do not improve within 7 days.
K: Suppositories use fatty or water-soluble bases, enemas and pessaries treat local and systemic conditions, the lower rectum partly avoids first-pass metabolism, and patients need clear, private counselling.
!: Forgetting that some vaginal and rectal products can damage latex contraceptives. This can lead to contraceptive failure.
EV: established | Rectal administration can partly avoid hepatic first-pass metabolism because of the venous drainage of the lower rectum.
Q: How do fatty suppository bases release drug? | They melt at body temperature.
Q: Why might rectal absorption partly avoid first-pass metabolism? | Veins of the lower rectum drain partly into the systemic circulation, bypassing the liver.
SUM: Bases melt or dissolve.
SUM: Useful when oral dosing is unsuitable.
SRC: British Pharmacopoeia Commission, British Pharmacopoeia: General monographs on rectal and vaginal preparations | standard | 2025 | https://www.pharmacopoeia.com/
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
M1#pharmacy-u05-19-q1@1: Which is a water-soluble suppository base? | Glycerol-gelatin | Hard fat | Theobroma oil | White soft paraffin | Liquid paraffin | Glycerol-gelatin dissolves in body fluids rather than melting.
M2#pharmacy-u05-19-q2@2: Why can rectal drug absorption be variable? | Absorption depends on position, contents and venous drainage | The rectum absorbs all drugs instantly | Rectal drugs are always destroyed by acid | The rectum has no blood supply | All suppositories contain no drug | Position in the rectum and contents affect absorption.
M3#pharmacy-u05-19-q3@3: What should a woman be told about some vaginal antifungal products? | They may damage latex condoms and diaphragms | They protect against all sexually transmitted infections | They must be taken by mouth | They work only if used in the morning | They should be warmed in a microwave first | Some bases weaken latex, risking contraceptive failure.
MATCH1#pharmacy-u05-19-q4@1: Match each product to its use. | Mesalazine enema = Ulcerative colitis ; Clotrimazole pessary = Vaginal thrush ; Diazepam rectal tube = Prolonged seizures ; Glycerol suppository = Constipation | Rectal and vaginal products have varied uses.
SA2#pharmacy-u05-19-q5@1,3: Describe rectal and vaginal dosage forms and when they are useful. | Suppositories use fatty bases that melt or water-soluble bases that dissolve. Enemas treat local conditions such as ulcerative colitis. Pessaries, creams, gels and rings treat vaginal conditions or give hormones. Rectal absorption can be variable, but the lower rectum partly avoids first-pass metabolism. These routes help in vomiting, seizures, swallowing difficulties and palliative care. Patients need private counselling on insertion, and some products damage latex contraceptives. | Suppository bases ; Enemas and vaginal products ; Absorption ; Uses ; Counselling

## Extemporaneous preparation
LV: Intermediate · Application
S: Extemporaneous preparation means making a medicine in the pharmacy for an individual patient. It is used only when no suitable licensed product exists, and it carries extra risks.
O: Explain when extemporaneous preparation is appropriate
O: Describe good practice in preparing, checking and labelling extemporaneous products
O: Calculate quantities for extemporaneous preparations
T: Extemporaneous preparation | A medicine made in the pharmacy for an individual patient
T: Special | An unlicensed medicine made to order for an individual patient by a licensed manufacturer
H: When it is appropriate
- Only when no suitable **licensed** medicine is available, for example for children who need a liquid of an unusual strength.
- Prefer, in order: a licensed product, a licensed product used off-label, an imported licensed product, then a **special** from a licensed manufacturer.
- Extemporaneous preparation is a last resort when these are unsuitable or not available in time.
H: Good practice
- Use a recognised **formula** with stability data, such as from pharmacopoeias or professional sources.
- Use **pharmaceutical-grade** ingredients and calibrated equipment.
- Complete a **worksheet** with calculations, batch numbers and expiry, and have an independent **second check**.
- Give a **short expiry** based on data, and label clearly.
- The prescriber and patient should know the product is unlicensed.
P: Extemporaneous products lack the quality testing of licensed medicines, and errors have caused serious harm, especially with concentrated ingredients and calculations. Pharmacists must be competent, follow standard operating procedures and consider whether a special or another formulation would be safer. Accurate calculation is essential: for example, making 150 mL of a 10 mg in 5 mL suspension needs 300 mg of drug, which is 30 tablets of 10 mg.
X: Calculating a preparation.
> A prescription asks for 100 mL of a 5 mg in 5 mL oral suspension, with no licensed product available.
> The total drug needed is 100 mL ÷ 5 mL × 5 mg = 100 mg.
> Using 25 mg tablets, the pharmacist needs 4 tablets.
> A second pharmacist checks the calculation and the finished product before it is released.
K: Extemporaneous preparation is a last resort when no licensed product or special is suitable; use recognised formulae, pharmaceutical-grade ingredients, worksheets, second checks, short expiries and clear labelling.
!: Preparing a product from memory without a recognised formula. Stability and dose accuracy cannot then be assured.
EV: established | Professional guidance advises that licensed medicines should be used in preference to unlicensed or extemporaneously prepared products wherever possible.
Q: When is extemporaneous preparation appropriate? | Only when no suitable licensed product or special is available.
Q: Why do extemporaneous products have short expiries? | Full stability data are usually not available.
SUM: A last resort when nothing licensed fits.
SUM: Formula, worksheet, second check.
SRC: Royal Pharmaceutical Society, Professional guidance on pharmacy compounding | guidance | 2024 | https://www.rpharms.com/
SRC: Medicines and Healthcare products Regulatory Agency, The supply of unlicensed medicinal products ("specials"): MHRA Guidance Note 14 | guidance | 2014 | https://www.gov.uk/government/publications/supply-unlicensed-medicinal-products-specials
M1#pharmacy-u05-20-q1@1: Which should be used first if available? | A licensed medicine | An extemporaneous preparation | A special from a manufacturer | An imported unlicensed product | A product made from memory | Licensed medicines have assured quality, safety and efficacy.
M2#pharmacy-u05-20-q2@2: What is the purpose of an independent second check? | To catch errors in calculations and preparation | To make the product taste better | To extend the expiry date | To license the product | To remove the need for a worksheet | A second person can spot calculation and weighing errors.
M3#pharmacy-u05-20-q3@3: How many 10 mg tablets are needed to make 150 mL of a 10 mg in 5 mL suspension? | 30 | 15 | 10 | 300 | 3 | 150 ÷ 5 × 10 mg = 300 mg, which is 30 tablets of 10 mg.
NUM1#pharmacy-u05-20-q4@3: How many milligrams of drug are needed to make 100 mL of a 5 mg in 5 mL suspension? | 100 | 0 | mg | 100 mL ÷ 5 mL × 5 mg = 100 mg.
SA2#pharmacy-u05-20-q5@1,3: Explain when extemporaneous preparation is appropriate and how it should be done safely. | It is a last resort, used only when no licensed product, off-label use, imported product or special is suitable. A recognised formula with stability data should be used, with pharmaceutical-grade ingredients and calibrated equipment. A worksheet records calculations, batch numbers and expiry, and an independent second check confirms accuracy. Products get short expiries and clear labels, and prescribers and patients should know the product is unlicensed. | Last resort ; Formula ; Ingredients and equipment ; Worksheet and check ; Expiry and labelling

## Packaging and storage
LV: Intermediate · Application
S: Packaging protects medicines from light, moisture, air, contamination and damage, and helps patients use them correctly. Storage conditions keep them within specification until use.
O: Describe the functions and types of pharmaceutical packaging
O: Explain interactions between medicines and packaging
O: Apply storage requirements, including the cold chain
T: Primary packaging | Packaging in direct contact with the medicine, such as a blister or bottle
T: Cold chain | The system that keeps temperature-sensitive products at 2 to 8 °C from manufacture to use
H: Functions and types
- **Protect** from light, moisture, oxygen, contamination and physical damage.
- **Identify** and inform with labels and leaflets.
- **Primary** (blisters, bottles, ampoules), **secondary** (cartons) and **tertiary** (shipping) packaging.
- **Glass**: Type I borosilicate for injections; other types for oral products. Amber glass blocks light.
- **Plastics**: light, unbreakable, but may be permeable or interact.
- **Child-resistant closures** and **tamper-evident** seals.
H: Interactions with packaging
- **Sorption**: drugs such as glyceryl trinitrate, diazepam and insulin can be taken up by some plastics such as PVC.
- **Leaching**: components of plastics may move into the product.
- **Permeation**: moisture or oxygen passes through plastic walls.
- Glyceryl trinitrate tablets are kept in their original glass bottle.
P: Storage requirements are set from stability data: "store below 25 °C", "store in a refrigerator (2 to 8 °C)" or "protect from light". Vaccines and many biologics need a strict **cold chain**, with fridge temperatures monitored and recorded daily, and any breach investigated before stock is used. Patients should keep medicines in original packaging, away from heat and moisture, such as bathrooms, and out of the reach and sight of children.
X: A cold chain breach.
> A pharmacy fridge alarm shows the temperature reached 12 °C overnight.
> The team quarantines the vaccines and other fridge items and labels them "do not use".
> They record the breach and contact the manufacturers and local immunisation team for advice.
> Only stock confirmed as usable is returned to service.
K: Packaging protects, identifies and enables safe use; glass, plastics and closures are chosen to avoid sorption, leaching and permeation, and storage and the cold chain keep medicines within specification.
!: Moving a product into a different container. This can expose it to light, moisture or sorption and removes key labelling.
EV: established | Interactions between medicines and packaging, such as sorption of glyceryl trinitrate to plastics, are well documented.
Q: What is primary packaging? | Packaging in direct contact with the medicine.
Q: What temperature range is used for refrigerated medicines? | 2 to 8 °C.
SUM: Packaging protects and informs.
SUM: Keep the cold chain unbroken.
SRC: UK Health Security Agency, Immunisation against infectious disease (the Green Book), Chapter 3: Storage, distribution and disposal of vaccines | guidance | 2023 | https://www.gov.uk/government/collections/immunisation-against-infectious-disease-the-green-book
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
M1#pharmacy-u05-21-q1@1: Which glass type is used for injections? | Type I borosilicate glass | Soda-lime window glass | Coloured decorative glass | Lead crystal glass | Any recycled glass | Type I glass is chemically resistant and suitable for parenterals.
M2#pharmacy-u05-21-q2@2: Why are glyceryl trinitrate tablets kept in their original glass bottle? | The drug is volatile and can be lost to some plastics | Glass makes the tablets dissolve faster | Plastics turn the tablets into a gas | Glass bottles are always child resistant | Glass removes the need for an expiry date | Glyceryl trinitrate can evaporate and be absorbed by some plastics.
M3#pharmacy-u05-21-q3@3: A vaccine fridge reached 12 °C overnight. What should happen first? | Quarantine the stock and seek advice before using it | Use the vaccines as normal | Throw away the fridge immediately | Freeze the vaccines to reverse the damage | Sell the stock at a discount | Breaches need investigation before stock is used or discarded.
MATCH1#pharmacy-u05-21-q4@2: Match each packaging interaction to its meaning. | Sorption = Drug taken up by packaging ; Leaching = Packaging parts enter product ; Permeation = Gas or moisture passes through ; Photolysis = Light damages drug | Packaging can interact with medicines.
SA2#pharmacy-u05-21-q5@1,3: Explain the functions of pharmaceutical packaging and how medicines should be stored. | Packaging protects medicines from light, moisture, oxygen, contamination and damage, identifies them and supports safe use with child-resistant and tamper-evident closures. It includes primary, secondary and tertiary layers, using glass such as Type I for injections and plastics. Interactions include sorption, leaching and permeation, so some drugs such as glyceryl trinitrate stay in glass. Storage follows labelled conditions, and refrigerated items need a monitored 2 to 8 °C cold chain, with breaches investigated. | Protection ; Types ; Interactions ; Storage conditions ; Cold chain

## Pharmaceutical microbiology and preservation
LV: Intermediate · Application
S: Microorganisms can spoil medicines and harm patients. Pharmaceutical microbiology controls contamination through good practice, product design and preservatives.
O: Describe sources and consequences of microbial contamination
O: Explain how preservatives work and what affects their efficacy
O: Describe tests for preservative efficacy and microbial quality
T: Preservative | An antimicrobial substance added to inhibit microbial growth in a multi-dose product
T: Preservative efficacy test | A challenge test in which a product is inoculated with organisms to show the preservative works
H: Contamination
- Sources: raw materials, water, equipment, the environment, staff and patients during use.
- Consequences: infection, toxins, spoilage, loss of potency and changes in appearance or smell.
- **Water-containing** products, such as aqueous creams, oral liquids and eye drops, are most at risk.
- Non-sterile products must meet **microbial limits**, such as total aerobic microbial count (TAMC).
H: Preservatives
- Examples: **parabens** (hydroxybenzoates), **benzalkonium chloride**, **chlorocresol**, **benzyl alcohol**, **sorbic acid** and **benzoic acid**.
- Efficacy depends on **concentration**, **pH**, binding to other ingredients and containers, and the oil-water ratio.
- Weak acid preservatives, such as sorbic and benzoic acids, work best at low pH where they are un-ionised.
- Preservatives can be inactivated by surfactants such as polysorbates, or absorbed by plastics and rubber.
P: Preservative efficacy is tested by challenging the product with organisms such as Pseudomonas aeruginosa, Staphylococcus aureus, Candida albicans and Aspergillus brasiliensis and showing the required reduction over time. Preservatives also have drawbacks: parabens and some others can cause sensitisation, benzalkonium can damage the eye surface, and benzyl alcohol is toxic in neonates. Good manufacturing and sensible in-use expiry dates reduce reliance on preservatives.
X: A preservative problem.
> A formulator adds a paraben to a cream that also contains polysorbate 80.
> Challenge testing shows poor preservative efficacy.
> The surfactant has bound the paraben in micelles, reducing its free concentration.
> The formulation is changed to a higher preservative level and retested.
K: Contamination comes from materials, water, environment, staff and use; preservatives such as parabens and benzalkonium protect multi-dose products, but pH, surfactants and containers affect efficacy, which is proved by challenge testing.
!: Assuming adding a preservative guarantees protection. pH, surfactants and packaging can inactivate it.
EV: established | Pharmacopoeial preservative efficacy tests are the accepted method of demonstrating adequate antimicrobial preservation.
Q: Why are aqueous creams preserved but many ointments are not? | Water supports microbial growth, while anhydrous ointments do not.
Q: Why do sorbic and benzoic acids work best at low pH? | They are weak acids that are active in the un-ionised form.
SUM: Water-containing products need protection.
SUM: Preservatives must be tested in the product.
SRC: European Directorate for the Quality of Medicines, European Pharmacopoeia 5.1.3: Efficacy of antimicrobial preservation | standard | 2025 | https://www.edqm.eu/
SRC: Denyer SP et al. (editors), Hugo and Russell's Pharmaceutical Microbiology, 8th edition, Wiley-Blackwell | secondary | 2011
M1#pharmacy-u05-22-q1@1: Which product is most at risk of microbial growth? | An aqueous cream | A dry powder in a sealed sachet | An anhydrous ointment | A hard tablet in a blister | A sealed sterile ampoule | Water-containing products support microbial growth.
M2#pharmacy-u05-22-q2@2: Why can polysorbate reduce the efficacy of a paraben preservative? | It binds the preservative in micelles, reducing its free concentration | It converts the paraben into a stronger antibiotic | It raises the paraben's activity above toxic levels | It removes all water from the product | It sterilises the product itself | Only free preservative in the water phase kills organisms.
M3#pharmacy-u05-22-q3@3: How is the efficacy of a preservative shown? | By challenging the product with organisms and measuring their reduction | By checking the product's colour | By measuring the tablet hardness | By counting the number of bottles made | By tasting the product | Challenge tests prove the preservative works in the final formulation.
TF1#pharmacy-u05-22-q4@2: Sorbic acid is most effective as a preservative at high pH. | false | Sorbic acid is a weak acid that is most active un-ionised at low pH.
SA2#pharmacy-u05-22-q5@1,3: Explain how medicines are protected from microbial contamination. | Contamination comes from raw materials, water, equipment, environment, staff and patients during use, and water-containing products are most at risk. Non-sterile products must meet microbial limits. Preservatives such as parabens, benzalkonium chloride, chlorocresol and weak acids are added to multi-dose products. Their efficacy depends on concentration, pH and binding to surfactants or containers, and is proved by challenge testing. Good manufacturing and in-use expiries also limit contamination. | Sources ; Microbial limits ; Preservatives ; Factors affecting efficacy ; Challenge testing

## Manufacturing and quality assurance
LV: Intermediate · Application
S: Quality assurance is the whole system that makes sure every medicine is fit for its purpose. It goes beyond testing to include design, manufacture, documentation and continuous improvement.
O: Distinguish quality assurance from quality control
O: Describe key elements of a pharmaceutical quality system
O: Explain how licensing and quality systems apply to manufacturing in and for pharmacy
T: Quality assurance (QA) | The total system of arrangements that ensures medicines are of the required quality
T: CAPA | Corrective and preventive action taken in response to deviations or problems
H: QA, QC and GMP
- **Quality control** tests materials and products against specifications.
- **Quality assurance** covers everything that affects quality, including GMP, training, documentation and audit.
- **ICH Q8** quality by design, **Q9** quality risk management and **Q10** pharmaceutical quality systems guide modern practice.
- **Process validation** shows a process consistently produces quality products.
H: The quality system
- **Standard operating procedures**, batch records and training.
- **Deviations** are recorded and investigated, leading to **CAPA**.
- **Change control** assesses the impact of changes before they are made.
- **Self-inspection**, audits and regulatory inspections.
- **Complaints** and **recalls** procedures.
P: In the UK, manufacturers need a manufacturer's licence from the MHRA, and makers of specials need a specials licence. Hospital pharmacies that make products such as aseptic preparations may work under these licences or under exemptions that allow preparation under the supervision of a pharmacist, with strict standards and external audit. Community pharmacies apply the same principles through SOPs, near-miss logs, incident reporting and audits.
X: A deviation and CAPA.
> During tablet manufacture, a compression machine produces tablets below the weight limit.
> The deviation is recorded and the affected tablets are quarantined.
> Investigation finds a worn punch; it is replaced and checked.
> As preventive action, punch inspection is added to the maintenance schedule.
K: Quality control tests products, while quality assurance covers the whole system, including GMP, validation, SOPs, deviations and CAPA, change control and audit; manufacturing in the UK is licensed by the MHRA.
!: Thinking quality can be tested into a product at the end. Quality must be designed and built in at every step.
EV: established | ICH Q8, Q9 and Q10 guidelines describe internationally accepted approaches to pharmaceutical quality.
Q: What is the difference between quality assurance and quality control? | QA is the whole system ensuring quality; QC is testing against specifications.
Q: What is change control? | Assessing the impact of a planned change before it is made.
SUM: QA is the whole system; QC is testing.
SUM: Deviations lead to CAPA.
SRC: International Council for Harmonisation, Q10: Pharmaceutical quality system | guidance | 2008 | https://www.ich.org/page/quality-guidelines
SRC: Medicines and Healthcare products Regulatory Agency, Good manufacturing practice and good distribution practice | guidance | 2024 | https://www.gov.uk/guidance/good-manufacturing-practice-and-good-distribution-practice
M1#pharmacy-u05-23-q1@1: What does quality assurance include that quality control alone does not? | The whole system of design, manufacture, documentation and audit | Only the testing of finished batches | Only the marketing of medicines | Only the pricing of products | Only the delivery to pharmacies | QA covers every factor that affects quality.
M2#pharmacy-u05-23-q2@2: What does CAPA stand for? | Corrective and preventive action | Controlled and pharmaceutical audit | Certified and approved product | Complete and permanent assurance | Clinical and patient assessment | CAPA addresses the cause of problems and prevents recurrence.
M3#pharmacy-u05-23-q3@3: Which licence does a UK company need to make unlicensed specials? | A specials licence from the MHRA | A driving licence | A GPhC premises registration only | A food hygiene certificate | No licence is needed | Specials manufacturers must hold an MHRA specials licence.
SEQ1#pharmacy-u05-23-q4@2: Order the response to a manufacturing deviation. | Record the deviation ; Quarantine affected product ; Investigate the root cause ; Take corrective and preventive action | Deviations are handled systematically.
SA2#pharmacy-u05-23-q5@1,3: Explain the difference between quality assurance and quality control and describe a pharmaceutical quality system. | Quality control tests materials and products against specifications, while quality assurance is the whole system that ensures quality, including GMP. A quality system includes SOPs, training, batch records, process validation, deviation investigation with CAPA, change control, self-inspection, complaints and recalls, guided by ICH Q8, Q9 and Q10. In the UK, manufacturers and specials makers are licensed by the MHRA, and pharmacies apply the same principles through SOPs, incident reporting and audit. | QC ; QA and GMP ; Quality system elements ; ICH guidance ; Licensing
`;
