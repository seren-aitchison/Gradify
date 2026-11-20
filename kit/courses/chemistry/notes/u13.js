// SciGradify Organic Reaction Mechanisms (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Curly arrow notation
LV: Year 1 · Application
S: Curly arrows are the language of organic mechanisms. This lesson sets out the rules for drawing them correctly.
O: Draw curly arrows from electron sources to electron sinks
O: Distinguish full-headed and half-headed arrows
O: Check mechanisms for conservation of charge and valence
H: Rules
- A **full-headed** arrow shows movement of an **electron pair**.
- A **half-headed** (fishhook) arrow shows movement of **one electron**.
- Arrows start at a **lone pair** or a **bond**, never at an atom's nucleus or a positive charge.
- Arrows end where the electrons go: an atom (forming a lone pair) or between atoms (forming a bond).
D: chem-nucleophilic-addition
H: Checking
- The **overall charge** must be the same on both sides of each step.
- No atom should exceed its valence, such as carbon with five bonds.
- Each arrow must have a clear source and sink.
- Breaking a bond and forming a new one often happen together.
P: Robert Robinson popularised curly arrows in the 1920s. A correct mechanism shows why a reaction happens, not just what forms, so chemists can predict new reactions. Most mistakes come from arrows starting at positive charges or forming five bonds to carbon.
X: Hydroxide attacking chloromethane.
> An arrow goes from a lone pair on O of OH⁻ to the carbon.
> A second arrow goes from the C–Cl bond to Cl.
> The new C–O bond forms as the C–Cl bond breaks.
> Products: CH₃OH and Cl⁻, with charge conserved.
K: Full-headed curly arrows show electron-pair movement and half-headed arrows show single electrons; arrows start at lone pairs or bonds and end at atoms or bonding positions, and mechanisms must conserve charge and valence.
!: Drawing an arrow from a positive charge. Positive charges have no electrons to give.
EV: established | Curly arrow notation was developed by Robinson and others in the 1920s (Kermack and Robinson, 1922).
T: Curly arrow | A symbol showing electron movement in a mechanism
T: Fishhook arrow | A half-headed arrow for one electron
T: Electron sink | An atom or bond receiving electrons
SUM: Pairs or single electrons.
SUM: Start at electrons.
SUM: Conserve charge.
SRC: Kermack W. O. and Robinson R., "An explanation of the property of induced polarity of atoms", Journal of the Chemical Society, Transactions 121, 427–440 | primary | 1922
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
Q: What does a full-headed curly arrow represent? | The movement of a pair of electrons.
Q: Where must a curly arrow start? | At a lone pair or a bond.
M1#chemistry-u13-01-q1@1: What does a fishhook arrow show? | The movement of a single electron | The movement of an electron pair | The transfer of a proton only | The direction of heat flow | Half-headed arrows are used in radical mechanisms.
M2#chemistry-u13-01-q2@2: Why must an arrow never start at a positive charge? | A positive charge has no electrons to donate | Positive charges always carry lone pairs | Arrows only start at nuclei | Positive charges move in the opposite direction | Arrows track electrons, so they must begin where electrons are.
SEQ1#chemistry-u13-01-q3@2: Put the checks for a mechanism step in order. | Find the electron source ; Draw the arrow to the electron sink ; Show bonds made and broken ; Check charge and valence are conserved | Systematic checks catch common errors.
M3#chemistry-u13-01-q4@3: In hydroxide attacking chloromethane, why are two arrows needed? | One forms the C–O bond and one breaks the C–Cl bond so carbon keeps four bonds | Hydroxide needs two arrows to lose its charge | One arrow is needed for each hydrogen | A single arrow can never show a reaction | Without the second arrow carbon would have five bonds.
SA2#chemistry-u13-01-q5@1,3: Explain how to use curly arrows in mechanisms. | Full-headed curly arrows show the movement of an electron pair and half-headed fishhook arrows the movement of a single electron. Arrows start at a lone pair or bond and end at an atom, forming a lone pair, or between atoms, forming a bond. Each step must conserve overall charge and avoid exceeding valence, such as five bonds to carbon. When hydroxide attacks chloromethane, one arrow goes from an oxygen lone pair to carbon and another from the C–Cl bond to chlorine, forming methanol and chloride. | Full arrows ; Fishhooks ; Starting points ; End points ; Checks

## Electrophiles and nucleophiles
LV: Year 1 · Chemical reasoning
S: Nucleophiles and electrophiles drive most polar reactions. This lesson explores what makes them strong or weak.
O: Identify nucleophilic and electrophilic sites in molecules
O: Explain factors affecting nucleophile strength
O: Explain factors affecting electrophile strength
H: Nucleophiles
- Have a **lone pair** or **π bond** to donate.
- Strength rises with **negative charge**: OH⁻ is stronger than H₂O.
- Less electronegative donor atoms are often stronger: NH₃ outdoes H₂O.
- Bulky nucleophiles react more slowly at crowded carbons.
H: Electrophiles
- Have an **empty orbital** or a **δ+** atom.
- Carbonyl carbons and carbons bonded to halogens are δ+.
- Positive charge increases strength: carbocations are strong.
- Lewis acids such as AlCl₃ and BF₃ are electrophiles.
P: Most polar reactions pair the most nucleophilic site of one molecule with the most electrophilic site of another. Bond polarity, from electronegativity differences, identifies these sites. Solvent also matters: polar aprotic solvents leave anions "naked" and more reactive.
X: Finding the sites in a reaction.
> In bromoethane, Br is more electronegative, so C is δ+.
> In cyanide, CN⁻, carbon carries a lone pair.
> The cyanide lone pair attacks the δ+ carbon.
> Bromide leaves, forming propanenitrile.
K: Nucleophiles donate lone pairs or π electrons and are stronger with negative charge and less electronegative donor atoms; electrophiles have empty orbitals or δ+ atoms and are stronger with positive charge, and polar reactions pair the most nucleophilic and electrophilic sites.
!: Thinking nucleophiles must be negatively charged. Neutral molecules such as ammonia and water are nucleophiles too.
EV: established | Nucleophilicity scales relate structure to reaction rates (Mayr and Patz, 1994).
T: Nucleophilicity | How quickly a nucleophile reacts
T: Lewis acid | An electron-pair acceptor
T: Polar aprotic solvent | A polar solvent without O–H or N–H bonds
SUM: Lone pairs and π bonds.
SUM: δ+ and empty orbitals.
SUM: Match the sites.
SRC: Mayr H. and Patz M., "Scales of nucleophilicity and electrophilicity", Angewandte Chemie International Edition 33(9), 938–957 | primary | 1994
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
Q: Why is OH⁻ a stronger nucleophile than H₂O? | Its negative charge makes its lone pairs more available.
Q: Name a Lewis acid electrophile. | Aluminium chloride, AlCl₃.
M1#chemistry-u13-02-q1@1: Which carbon in bromoethane is electrophilic? | The carbon bonded to bromine | The carbon of the methyl group | Neither carbon is electrophilic | Both carbons equally | Bromine pulls electron density, leaving its carbon δ+.
M2#chemistry-u13-02-q2@2: Why does a polar aprotic solvent speed up reactions of anionic nucleophiles? | It does not hydrogen bond to the anion, leaving it more reactive | It adds extra negative charge to the nucleophile | It removes all the electrophile from solution | It converts the nucleophile into a radical | Protic solvents cage anions in hydrogen bonds.
MATCH1#chemistry-u13-02-q3@2: Match each species to its role. | Cyanide ion = Nucleophile ; Carbocation = Electrophile ; Boron trifluoride = Lewis acid electrophile ; Ammonia = Neutral nucleophile | Electron-rich species attack electron-poor ones.
M3#chemistry-u13-02-q4@3: Why is a carbonyl carbon electrophilic? | Oxygen pulls electron density from the C=O, leaving carbon δ+ | Carbon is more electronegative than oxygen | The carbon carries a lone pair | Carbonyl groups have no polarity | Polarisation of C=O makes carbon open to attack.
SA2#chemistry-u13-02-q5@1,3: Explain what makes nucleophiles and electrophiles reactive. | Nucleophiles donate a lone pair or π electrons; negative charge increases strength, so OH⁻ beats H₂O, and less electronegative donor atoms are stronger, while bulky nucleophiles react slowly at crowded sites. Electrophiles have empty orbitals or δ+ atoms, such as carbonyl carbons, carbons bonded to halogens, carbocations and Lewis acids like AlCl₃. Polar reactions pair the most nucleophilic site with the most electrophilic one, as cyanide attacks bromoethane's δ+ carbon. Polar aprotic solvents increase anionic nucleophile reactivity. | Nucleophiles ; Charge effects ; Electrophiles ; Site matching ; Solvent

## Homolytic and heterolytic cleavage
LV: Year 1 · Chemical reasoning
S: Bonds break in two different ways. This lesson compares homolytic and heterolytic cleavage and their conditions.
O: Distinguish homolytic and heterolytic cleavage
O: Explain conditions favouring each type
O: Relate bond dissociation energy to cleavage
H: Two ways to break
- **Homolytic**: each atom takes one electron, forming two **radicals**.
- **Heterolytic**: one atom takes both electrons, forming a **cation** and an **anion**.
- Homolysis is shown with fishhook arrows.
- Heterolysis is shown with a full curly arrow.
D: chem-homo-heterolytic
H: Conditions
- **Homolysis** is favoured by **UV light**, heat and non-polar bonds, often in the gas phase.
- **Heterolysis** is favoured by **polar bonds** and **polar solvents** that stabilise ions.
- Bond dissociation energy measures the energy for homolysis.
- Weak bonds such as O–O in peroxides break homolytically easily.
P: Peroxides are used as radical initiators because their weak O–O bond breaks easily on heating. In water, HCl ionises heterolytically, while in the gas phase very high energy is needed to form ions. Ion formation is costly without solvent stabilisation.
X: Two fates of a C–Br bond.
> In UV light: C–Br → C• + Br•.
> In a polar solvent with a stable carbocation: C–Br → C⁺ + Br⁻.
> Bromine takes both electrons because it is more electronegative.
> Conditions decide which pathway occurs.
K: Homolytic cleavage gives two radicals and is favoured by light, heat and non-polar bonds, while heterolytic cleavage gives ions and is favoured by polar bonds and solvents, with the more electronegative atom taking both electrons.
!: Thinking heterolysis puts the electrons on either atom at random. The more electronegative atom usually takes them.
EV: established | Bond dissociation energies quantify homolytic cleavage (Blanksby and Ellison, 2003).
T: Homolytic cleavage | Bond breaking giving one electron to each atom
T: Heterolytic cleavage | Bond breaking giving both electrons to one atom
T: Bond dissociation energy | Energy needed to break a bond homolytically
SUM: Radicals or ions.
SUM: Light or solvent.
SUM: Electronegativity decides.
SRC: Blanksby S. J. and Ellison G. B., "Bond dissociation energies of organic molecules", Accounts of Chemical Research 36(4), 255–263 | secondary | 2003
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
Q: What does homolytic cleavage produce? | Two radicals.
Q: Why are peroxides good radical initiators? | Their O–O bond is weak and breaks easily.
M1#chemistry-u13-03-q1@1: What does heterolytic cleavage produce? | A cation and an anion | Two neutral radicals | Two identical atoms | A single molecule | One atom takes both bonding electrons, so a cation and an anion form.
M2#chemistry-u13-03-q2@2: Why do polar solvents favour heterolytic cleavage? | They stabilise the ions formed by solvation | They supply ultraviolet light | They remove all electrons from bonds | They make bonds non-polar | Solvation lowers the energy of charged products.
MATCH1#chemistry-u13-03-q3@2: Match each condition to the cleavage it favours. | UV light = Homolytic ; Polar solvent = Heterolytic ; Weak O–O bond = Easy homolysis ; Polar C–Br bond = Easy heterolysis | Conditions steer the pathway.
M3#chemistry-u13-03-q4@3: Why is ion formation in the gas phase so costly? | No solvent is present to stabilise the separated charges | Gas molecules have no electrons | Gas-phase bonds are always non-polar | Ions are always more stable in the gas phase | Separating charges without solvation needs much more energy.
SA2#chemistry-u13-03-q5@1,3: Compare homolytic and heterolytic cleavage. | In homolytic cleavage each atom takes one electron, forming two radicals, shown with fishhook arrows; it is favoured by UV light, heat, non-polar bonds and the gas phase, and weak bonds such as O–O in peroxides break easily. Bond dissociation energy measures it. In heterolytic cleavage one atom, usually the more electronegative, takes both electrons, forming a cation and an anion, shown with a full arrow; it is favoured by polar bonds and polar solvents that stabilise ions. | Homolytic ; Heterolytic ; Conditions ; Bond energy ; Solvent

## Carbocations
LV: Year 1 · Chemical reasoning
S: Carbocations are positively charged carbon intermediates. This lesson explains their structure and stability.
O: Describe the structure of carbocations
O: Rank carbocation stability
O: Explain how stability affects reaction outcomes
H: Structure
- A carbocation carbon has **three bonds** and a positive charge.
- It is **sp²** and **trigonal planar**, with an empty p orbital.
- Nucleophiles can attack from either face.
- Carbocations are strong electrophiles.
H: Stability
- **Tertiary > secondary > primary > methyl**.
- Alkyl groups donate electron density by **inductive effects** and **hyperconjugation**.
- **Resonance** stabilises allylic and benzylic carbocations.
- Carbocations may **rearrange** to more stable ones by hydride or methyl shifts.
P: Carbocation stability explains Markovnikov's rule and why tertiary haloalkanes react by SN1. Olah's work on stable carbocations in superacids earned the 1994 Nobel Prize. Because the carbocation is planar, attack from both faces gives racemic products.
X: Why tertiary is most stable.
> A tertiary carbocation has three alkyl groups.
> Each donates electron density through C–C and C–H bonds.
> The positive charge is spread over a larger region.
> Spreading charge lowers energy and increases stability.
K: Carbocations are sp² planar intermediates with an empty p orbital; stability increases from methyl to tertiary through inductive effects and hyperconjugation and with resonance, and stability controls products, rearrangements and stereochemistry.
!: Thinking primary carbocations are the most stable because they are least crowded. Alkyl groups stabilise the charge.
EV: established | Stable carbocations were observed directly in superacid solutions (Olah, 1995).
T: Carbocation | A carbon intermediate with a positive charge
T: Hyperconjugation | Stabilisation by overlap of C–H bonds with an empty orbital
T: Hydride shift | Movement of H⁻ to form a more stable carbocation
SUM: Planar, empty p orbital.
SUM: Tertiary most stable.
SUM: Rearrangements.
SRC: Olah G. A., "My search for carbocations and their role in chemistry (Nobel lecture)", Angewandte Chemie International Edition 34(13-14), 1393–1405 | primary | 1995
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
Q: What is the shape of a carbocation? | Trigonal planar.
Q: Which carbocation is most stable: primary, secondary or tertiary? | Tertiary.
M1#chemistry-u13-04-q1@1: What is the hybridisation of a carbocation carbon? | sp² with an empty p orbital | sp³ with four bonds | sp with two bonds | sp³d with five bonds | Three bonds in a plane leave one p orbital empty.
M2#chemistry-u13-04-q2@2: Why are benzylic carbocations especially stable? | The positive charge is delocalised into the benzene ring by resonance | Benzene withdraws all electron density | They have no positive charge | They are always primary | Resonance spreads charge over several carbons.
MATCH1#chemistry-u13-04-q3@2: Match each carbocation to its stability. | (CH₃)₃C⁺ = Tertiary, most stable ; (CH₃)₂CH⁺ = Secondary ; CH₃CH₂⁺ = Primary ; CH₃⁺ = Methyl, least stable | Alkyl groups stabilise positive charge.
M3#chemistry-u13-04-q4@3: Why does SN1 at a stereocentre give a racemic product? | The planar carbocation is attacked equally from both faces | The nucleophile always attacks from one face | The carbocation is tetrahedral | No carbocation forms | Equal attack gives equal amounts of each enantiomer.
SA2#chemistry-u13-04-q5@1,3: Explain the structure and stability of carbocations. | Carbocations have a carbon with three bonds and a positive charge; it is sp² and trigonal planar with an empty p orbital, and is a strong electrophile. Stability increases from methyl to primary, secondary and tertiary because alkyl groups donate electron density by inductive effects and hyperconjugation, and resonance stabilises allylic and benzylic carbocations. Carbocations may rearrange by hydride or methyl shifts. Their stability explains Markovnikov's rule and SN1 reactions, and planar attack gives racemic products. | Structure ; Stability order ; Hyperconjugation ; Resonance ; Rearrangements

## Carbanions
LV: Year 1 · Chemical reasoning
S: Carbanions are negatively charged carbon species. This lesson explains their stability and use in forming C–C bonds.
O: Describe the structure of carbanions
O: Explain factors that stabilise carbanions
O: Describe carbanion equivalents used in synthesis
H: Structure and stability
- A carbanion has three bonds, a lone pair and a negative charge.
- Simple carbanions are roughly **pyramidal** (sp³).
- Stability order is the **reverse** of carbocations: methyl > primary > secondary > tertiary.
- **Electron-withdrawing groups** and **resonance** stabilise carbanions, as in enolates.
H: In synthesis
- Carbanions are strong **nucleophiles** and **bases**.
- **Grignard** and **organolithium** reagents behave like carbanions.
- **Enolates** form next to carbonyl groups and attack electrophiles.
- Carbanions form new **C–C bonds**.
P: The acidity of a C–H bond shows how stable its carbanion is: hydrogens next to carbonyl groups (pKa about 20) are far more acidic than those in alkanes (pKa about 50). Carbanion chemistry underpins aldol reactions and many syntheses of medicines.
X: Forming an enolate.
> Propanone has C–H bonds next to C=O.
> A strong base removes one of these protons.
> The negative charge spreads onto oxygen by resonance.
> The enolate attacks an electrophile, forming a C–C bond.
K: Carbanions carry a lone pair and negative charge, are stabilised by electron-withdrawing groups and resonance as in enolates, and act as strong nucleophiles and bases, with Grignard reagents, organolithiums and enolates used to form C–C bonds.
!: Thinking alkyl groups stabilise carbanions as they do carbocations. They destabilise negative charge.
EV: established | Carbon acidity reflects carbanion stability (Bordwell, 1988).
T: Carbanion | A carbon species with a negative charge and lone pair
T: Enolate | A resonance-stabilised anion next to a carbonyl
T: Organolithium | A reagent with a carbon-lithium bond
SUM: Lone pair, negative charge.
SUM: Stabilised by resonance.
SUM: Makes C–C bonds.
SRC: Bordwell F. G., "Equilibrium acidities in dimethyl sulfoxide solution", Accounts of Chemical Research 21(12), 456–463 | primary | 1988
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
Q: What is an enolate? | A resonance-stabilised anion formed next to a carbonyl group.
Q: Which reagents behave like carbanions? | Grignard and organolithium reagents.
M1#chemistry-u13-05-q1@1: Which carbanion is least stable? | A tertiary carbanion | A methyl carbanion | A primary carbanion | An enolate ion | Alkyl groups push electron density onto an already negative carbon.
M2#chemistry-u13-05-q2@2: Why are hydrogens next to a C=O group relatively acidic? | The carbanion formed is stabilised by resonance onto oxygen | The C=O group donates electrons to carbon | Those hydrogens are bonded to oxygen | Carbonyl groups make carbon more electropositive | Delocalisation spreads the negative charge.
MATCH1#chemistry-u13-05-q3@2: Match each species to its description. | Enolate = Resonance-stabilised anion ; Grignard reagent = RMgX carbanion equivalent ; Organolithium = RLi strong base ; Alkane C–H = Very weakly acidic | Carbanion stability varies widely.
M3#chemistry-u13-05-q4@3: Why are carbanions useful in synthesis? | They are nucleophiles that form new carbon-carbon bonds | They are electrophiles that accept electrons | They break C–C bonds only | They are always unreactive | Building C–C bonds assembles larger molecules.
SA2#chemistry-u13-05-q5@1,3: Explain the stability and synthetic use of carbanions. | Carbanions have a carbon with three bonds, a lone pair and a negative charge, usually pyramidal. Unlike carbocations, they are destabilised by alkyl groups, so methyl is most stable, and stabilised by electron-withdrawing groups and resonance, as in enolates next to carbonyl groups whose C–H bonds are relatively acidic. They are strong nucleophiles and bases; Grignard and organolithium reagents behave as carbanion equivalents. Enolates and Grignard reagents attack electrophiles to form C–C bonds. | Structure ; Stability ; Enolates ; Reagents ; C–C bonds

## Radical intermediates
LV: Year 1 · Chemical reasoning
S: Radicals are species with unpaired electrons. This lesson explains their structure, stability and reactions.
O: Describe the structure and stability of carbon radicals
O: Explain radical chain reactions
O: Describe the importance of radicals in chemistry and biology
H: Structure and stability
- A carbon radical has three bonds and **one unpaired electron**.
- Roughly planar, with the electron in a p orbital.
- Stability: **tertiary > secondary > primary > methyl**.
- **Resonance** stabilises allylic and benzylic radicals.
D: chem-radical-chlorination
H: Reactions
- **Chain reactions**: initiation, propagation, termination.
- **Selectivity**: bromine radicals are more selective than chlorine radicals.
- **Radical polymerisation** makes poly(ethene) and poly(styrene).
- **Radical inhibitors** such as antioxidants stop chains.
P: Radicals are highly reactive and usually short-lived. Bromination of alkanes favours tertiary positions much more than chlorination, because the bromine step is slower and more selective. Ozone depletion by chlorine radicals and damage to cells by reactive oxygen species are radical processes.
X: Selectivity of bromination.
> 2-methylpropane has primary and tertiary hydrogens.
> Chlorine radicals attack both fairly indiscriminately.
> Bromine radicals strongly prefer the tertiary hydrogen.
> Bromination gives mainly 2-bromo-2-methylpropane.
K: Carbon radicals have an unpaired electron, are roughly planar and are stabilised by alkyl groups and resonance; they react in chain reactions, bromination is more selective than chlorination, and radicals matter in polymerisation, ozone depletion and biology.
!: Thinking all radicals react equally unselectively. Bromine radicals are much more selective than chlorine radicals.
EV: established | Radical stability and selectivity are explained by Hammond's postulate (Hammond, 1955).
T: Radical | A species with an unpaired electron
T: Chain reaction | A reaction in which radicals are regenerated
T: Antioxidant | A substance that stops radical chain reactions
SUM: Unpaired electron.
SUM: Tertiary most stable.
SUM: Chains and selectivity.
SRC: Hammond G. S., "A correlation of reaction rates", Journal of the American Chemical Society 77(2), 334–338 | primary | 1955
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
Q: What characterises a radical? | An unpaired electron.
Q: Which radical is more selective, bromine or chlorine? | Bromine.
M1#chemistry-u13-06-q1@1: Which radical is the most stable? | A tertiary radical | A primary radical | A methyl radical | A secondary radical | Alkyl groups stabilise the unpaired electron.
M2#chemistry-u13-06-q2@2: Why do antioxidants protect materials and cells? | They react with radicals to stop chain reactions | They produce more radicals to speed reactions | They absorb all oxygen in the air | They remove all electrons from molecules | Removing radicals ends the propagation steps.
MATCH1#chemistry-u13-06-q3@2: Match each process to its radical role. | Polymerisation of ethene = Chain growth ; Ozone depletion = Chlorine radical catalysis ; Vitamin E = Antioxidant ; Alkane bromination = Selective substitution | Radicals appear in many processes.
M3#chemistry-u13-06-q4@3: Why is bromination more selective than chlorination? | The hydrogen-abstraction step by bromine is slower and more sensitive to radical stability | Bromine radicals are far more reactive | Chlorine cannot form radicals | Bromine reacts only with methane | A later transition state reflects product radical stability more.
SA2#chemistry-u13-06-q5@1,3: Explain the structure, stability and reactions of radicals. | Carbon radicals have three bonds and an unpaired electron in a p orbital and are roughly planar. Stability increases from methyl to primary, secondary and tertiary, and resonance stabilises allylic and benzylic radicals. Radicals react in chain reactions of initiation, propagation and termination; bromine radicals are more selective than chlorine radicals, favouring tertiary positions. Radical polymerisation makes poly(ethene), antioxidants stop chains and radicals cause ozone depletion and cell damage. | Structure ; Stability ; Chains ; Selectivity ; Importance

## Reaction energy profiles
LV: Year 1 · Chemical reasoning
S: Energy profiles show how energy changes along a reaction. This lesson interprets profiles for multi-step mechanisms.
O: Distinguish transition states from intermediates
O: Identify the rate-determining step from a profile
O: Apply Hammond's postulate
H: Features
- **Transition states** are energy maxima; they cannot be isolated.
- **Intermediates** sit in energy minima between steps.
- Each step has its own activation energy.
- The step with the highest transition state relative to the start is **rate-determining**.
H: Hammond's postulate
- A transition state resembles the species closest to it in energy.
- In an **endothermic** step, it resembles the **products**.
- In an **exothermic** step, it resembles the **reactants**.
- Explains why carbocation stability affects SN1 rates.
D: chem-sn1-sn2-profiles
P: An SN1 profile has two humps with a carbocation in the valley between; SN2 has one hump with no intermediate. Profiles help compare mechanisms and explain selectivity, since the lower-energy pathway is usually followed.
X: Reading an SN1 profile.
> The first hump is ionisation, forming a carbocation.
> The carbocation sits in a shallow valley.
> The second, smaller hump is nucleophile attack.
> The first step is rate-determining because its barrier is highest.
K: Energy profiles show transition states at maxima and intermediates at minima; the highest transition state controls the rate and Hammond's postulate says transition states resemble the species nearest in energy, linking intermediate stability to rate.
!: Confusing transition states with intermediates. Intermediates can sometimes be detected; transition states cannot be isolated.
EV: established | Hammond's postulate links transition-state structure to nearby species (Hammond, 1955).
T: Transition state | The highest-energy point of a step
T: Intermediate | A short-lived species in an energy minimum
T: Hammond's postulate | A transition state resembles the nearest species in energy
SUM: Maxima and minima.
SUM: Highest barrier controls.
SUM: Hammond's postulate.
SRC: Hammond G. S., "A correlation of reaction rates", Journal of the American Chemical Society 77(2), 334–338 | primary | 1955
SRC: Anslyn E. V. and Dougherty D. A., Modern Physical Organic Chemistry, University Science Books | secondary | 2006
Q: Where do intermediates appear on an energy profile? | In energy minima between steps.
Q: What does Hammond's postulate state? | A transition state resembles the species closest to it in energy.
M1#chemistry-u13-07-q1@1: How many humps does an SN2 energy profile have? | One | Two | Three | None | SN2 is a single concerted step with no intermediate.
M2#chemistry-u13-07-q2@2: In an endothermic step, what does the transition state resemble? | The products of that step | The reactants of that step | The solvent molecules | Nothing in the reaction | It lies closer in energy to the products.
SEQ1#chemistry-u13-07-q3@2: Put features of an SN1 profile in order from left to right. | Reactants ; First transition state ; Carbocation intermediate ; Second transition state | Two steps give two transition states with an intermediate between.
M3#chemistry-u13-07-q4@3: Why does a more stable carbocation speed up SN1? | The endothermic ionisation's transition state resembles the carbocation, so it is lowered too | Stable carbocations raise the activation energy | Carbocations do not affect the rate | SN1 has no transition state | Hammond's postulate links intermediate and transition-state energies.
SA2#chemistry-u13-07-q5@1,3: Explain how to interpret energy profiles for multi-step reactions. | Energy profiles plot energy along the reaction: transition states are maxima that cannot be isolated, and intermediates are minima between steps. Each step has its own activation energy, and the step with the highest transition state is rate-determining. SN1 shows two humps with a carbocation between, while SN2 shows one. Hammond's postulate says a transition state resembles the species nearest in energy, products for endothermic steps, so a more stable carbocation lowers the SN1 barrier. | Transition states ; Intermediates ; Rate-determining step ; Hammond ; SN1 versus SN2

## Substitution reactions
LV: Year 1 · Application
S: Substitution reactions replace one group with another. This lesson surveys nucleophilic substitution of haloalkanes.
O: Describe nucleophilic substitution of haloalkanes
O: Explain how the leaving group affects rate
O: Compare SN1 and SN2 pathways
H: Nucleophilic substitution
- A nucleophile replaces a **leaving group** on an sp³ carbon.
- Haloalkanes react with OH⁻, CN⁻, NH₃ and alkoxides.
- **SN1** goes through a carbocation; **SN2** is one concerted step.
- Products: alcohols, nitriles, amines and ethers.
D: chem-sn2-mechanism
H: Leaving groups
- Good leaving groups are **weak bases** that are stable on their own.
- Order: **I⁻ > Br⁻ > Cl⁻ > F⁻**.
- C–I bonds are weakest, so iodoalkanes react fastest.
- OH⁻ is a poor leaving group unless protonated to water.
P: Rates of hydrolysis can be compared by adding silver nitrate to haloalkanes in ethanol: silver iodide precipitates first, then silver bromide and silver chloride. Alcohols can undergo substitution if the OH is first protonated or converted to a better leaving group.
X: Comparing hydrolysis rates.
> 1-chloro-, 1-bromo- and 1-iodobutane are warmed with aqueous silver nitrate in ethanol.
> Yellow AgI appears first.
> Cream AgBr forms next.
> White AgCl forms last, showing C–Cl is hardest to break.
K: Nucleophilic substitution replaces a leaving group on sp³ carbon by SN1 or SN2; good leaving groups are weak bases, iodide is best because the C–I bond is weakest and OH must be activated before it can leave.
!: Thinking the most polar C–X bond reacts fastest. Bond strength matters more, so C–I reacts fastest.
EV: established | Leaving group ability correlates with the weakness of the conjugate base (Clayden et al., 2012).
T: Leaving group | The group that departs with the bonding electrons
T: Nucleophilic substitution | Replacement of a leaving group by a nucleophile
T: Haloalkane | An alkane with a halogen substituent
SUM: Nucleophile replaces leaving group.
SUM: I⁻ leaves best.
SUM: SN1 or SN2.
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
SRC: Royal Society of Chemistry, Hydrolysis of haloalkanes | guidance | 2024 | https://edu.rsc.org/
Q: What makes a good leaving group? | A weak base that is stable on its own.
Q: Which haloalkane hydrolyses fastest? | The iodoalkane.
M1#chemistry-u13-08-q1@1: Which is the best leaving group? | Iodide, I⁻ | Fluoride, F⁻ | Chloride, Cl⁻ | Hydroxide, OH⁻ | Iodide is a very weak base and the C–I bond is weakest.
M2#chemistry-u13-08-q2@2: Why is OH⁻ a poor leaving group? | It is a strong base and unstable on its own | It is a very weak base | It forms the weakest bond to carbon | It is too large to leave | Protonating it to water makes a far better leaving group.
MATCH1#chemistry-u13-08-q3@1: Match each nucleophile to the product from a haloalkane. | Hydroxide = Alcohol ; Cyanide = Nitrile ; Ammonia = Amine ; Ethoxide = Ether | The nucleophile becomes the new group.
M3#chemistry-u13-08-q4@3: Why does iodobutane hydrolyse faster than chlorobutane despite C–Cl being more polar? | The C–I bond is much weaker and easier to break | C–I is the most polar bond | Chlorine is a better leaving group | Iodine does not leave at all | Bond enthalpy dominates over polarity here.
SA2#chemistry-u13-08-q5@1,3: Describe nucleophilic substitution of haloalkanes. | In nucleophilic substitution, a nucleophile such as OH⁻, CN⁻, NH₃ or an alkoxide replaces a leaving group on an sp³ carbon, forming alcohols, nitriles, amines or ethers, by SN1 through a carbocation or SN2 in one step. Good leaving groups are weak bases, in the order I⁻ > Br⁻ > Cl⁻ > F⁻, because the C–I bond is weakest. Silver nitrate in ethanol shows iodoalkanes form AgI first. OH⁻ is a poor leaving group unless protonated. | Definition ; Nucleophiles ; Leaving groups ; Bond strength ; Silver nitrate test

## SN1 mechanisms
LV: Year 1 · Chemical reasoning
S: SN1 reactions proceed through a carbocation. This lesson explains their mechanism, kinetics and stereochemistry.
O: Describe the two-step SN1 mechanism
O: Explain first-order kinetics in SN1
O: Explain conditions favouring SN1
H: Mechanism
- **Step 1**: the leaving group departs, forming a **carbocation** (slow).
- **Step 2**: the nucleophile attacks the carbocation (fast).
- Rate = k[R–X]: **first order**, independent of nucleophile.
- Called **unimolecular** because one species is in the rate-determining step.
D: chem-sn1-mechanism
H: Favouring conditions
- **Tertiary** substrates, which form stable carbocations.
- **Polar protic solvents** that stabilise ions.
- **Weak nucleophiles**, such as water and alcohols.
- Good leaving groups.
P: 2-bromo-2-methylpropane hydrolyses by SN1 in water. If the carbon is a stereocentre, attack from both faces of the planar carbocation gives a near-racemic product. Carbocations may rearrange before attack, giving unexpected products.
X: Hydrolysis of 2-bromo-2-methylpropane.
> C–Br breaks, forming (CH₃)₃C⁺ and Br⁻.
> Water attacks the carbocation.
> A second water molecule removes a proton from the oxonium ion.
> 2-methylpropan-2-ol forms.
K: SN1 reactions form a carbocation in a slow first step and then capture a nucleophile; rate depends only on substrate, tertiary substrates, polar protic solvents and weak nucleophiles favour them and stereocentres are racemised.
!: Thinking nucleophile concentration changes SN1 rate. It does not appear in the rate equation.
EV: established | Hughes and Ingold established the SN1 and SN2 mechanisms (Hughes and Ingold, 1935).
T: SN1 | Unimolecular nucleophilic substitution
T: Unimolecular | One species in the rate-determining step
T: Polar protic solvent | A polar solvent with O–H or N–H bonds
SUM: Carbocation first.
SUM: Rate = k[R–X].
SUM: Tertiary, protic, weak Nu.
SRC: Hughes E. D. and Ingold C. K., "Mechanism of substitution at a saturated carbon atom", Journal of the Chemical Society, 244–255 | primary | 1935
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
Q: What is the rate equation for SN1? | Rate = k[R–X].
Q: What intermediate forms in SN1? | A carbocation.
M1#chemistry-u13-09-q1@1: Which substrate reacts fastest by SN1? | 2-bromo-2-methylpropane, a tertiary bromide | 1-bromobutane, a primary bromide | Bromomethane, a methyl bromide | 2-bromobutane, a secondary bromide | Tertiary substrates form the most stable carbocations.
M2#chemistry-u13-09-q2@2: Why does doubling nucleophile concentration not change the SN1 rate? | The nucleophile is not involved in the rate-determining step | The nucleophile is consumed instantly on mixing | The rate depends only on temperature in SN1 | SN1 reactions need no nucleophile at all | Only ionisation of the substrate controls the rate.
NUM1#chemistry-u13-09-q3@2: An SN1 reaction has rate 2.0 × 10⁻⁴ mol dm⁻³ s⁻¹. If [R–X] doubles, what is the new rate (×10⁻⁴)? | 4.0 | 0.1 | mol dm⁻³ s⁻¹ | First order in R–X, so doubling substrate doubles the rate to 4.0 × 10⁻⁴.
M3#chemistry-u13-09-q4@3: Why can SN1 give unexpected products? | The carbocation may rearrange by hydride or methyl shifts before attack | The nucleophile always attacks the wrong carbon | SN1 has no intermediate | The leaving group returns every time | Rearranged carbocations give rearranged products.
SA2#chemistry-u13-09-q5@1,3: Explain the SN1 mechanism. | In SN1, the leaving group departs in a slow first step, forming a planar carbocation, and the nucleophile attacks in a fast second step. The rate equation is rate = k[R–X], first order and unimolecular, independent of nucleophile. SN1 is favoured by tertiary substrates, which form stable carbocations, polar protic solvents that stabilise ions, weak nucleophiles and good leaving groups, as in hydrolysis of 2-bromo-2-methylpropane. Attack from both faces racemises stereocentres, and carbocations may rearrange. | Two steps ; Rate equation ; Substrate ; Conditions ; Stereochemistry

## SN2 mechanisms
LV: Year 1 · Chemical reasoning
S: SN2 reactions occur in one concerted step. This lesson explains their mechanism, kinetics and stereochemistry.
O: Describe the one-step SN2 mechanism
O: Explain second-order kinetics in SN2
O: Explain inversion of configuration and steric effects
H: Mechanism
- The nucleophile attacks the carbon from the side **opposite** the leaving group (**backside attack**).
- Bond forming and bond breaking happen **together**.
- The transition state has five groups around carbon, partly bonded.
- Rate = k[R–X][Nu]: **second order**, **bimolecular**.
D: chem-sn2-mechanism
H: Features
- **Inversion of configuration**, like an umbrella turning inside out (**Walden inversion**).
- Favoured by **methyl and primary** substrates, which are uncrowded.
- Favoured by **strong nucleophiles** and **polar aprotic solvents**.
- Tertiary substrates are too crowded for SN2.
P: (R)-2-bromobutane reacting with hydroxide by SN2 gives (S)-butan-2-ol, showing inversion. SN2 reactions are important in biology, such as methylation by S-adenosylmethionine. Steric hindrance explains the order methyl > primary > secondary for SN2 rates.
X: Inversion in practice.
> OH⁻ approaches C2 of (R)-2-bromobutane from behind.
> The other three groups flatten in the transition state.
> Br⁻ leaves as the groups flip over.
> The product is (S)-butan-2-ol.
K: SN2 is a concerted backside attack with rate = k[R–X][Nu], giving inversion of configuration; it is fastest for methyl and primary substrates with strong nucleophiles in polar aprotic solvents and is blocked at tertiary centres by steric hindrance.
!: Thinking SN2 always changes R to S. Inversion is geometric; the label may stay the same if priorities change.
EV: established | Walden inversion demonstrated stereochemical inversion in substitution (Walden, 1896).
T: SN2 | Bimolecular nucleophilic substitution
T: Backside attack | Approach of the nucleophile opposite the leaving group
T: Walden inversion | Inversion of configuration in SN2
SUM: One concerted step.
SUM: Rate = k[R–X][Nu].
SUM: Inversion.
SRC: Walden P., "Ueber die gegenseitige Umwandlung optischer Antipoden", Berichte der deutschen chemischen Gesellschaft 29(1), 133–138 | primary | 1896
SRC: Hughes E. D. and Ingold C. K., "Mechanism of substitution at a saturated carbon atom", Journal of the Chemical Society, 244–255 | primary | 1935
Q: What is the rate equation for SN2? | Rate = k[R–X][Nu].
Q: What happens to configuration in SN2? | It is inverted.
M1#chemistry-u13-10-q1@1: Which substrate reacts fastest by SN2? | Bromomethane, an uncrowded methyl halide | 2-bromo-2-methylpropane, a tertiary halide | 2-bromopropane, a secondary halide | 2-bromobutane, a secondary halide | Least steric hindrance allows easiest backside attack.
M2#chemistry-u13-10-q2@2: Why do tertiary haloalkanes not react by SN2? | Three bulky groups block backside attack by the nucleophile | Tertiary carbons have no leaving group | The nucleophile is too small to react | The C–Br bond in a tertiary haloalkane is too strong to break | Steric hindrance prevents the nucleophile reaching carbon.
MATCH1#chemistry-u13-10-q3@3: Match each feature to SN1 or SN2. | Carbocation intermediate = SN1 ; Backside attack = SN2 ; Racemisation = SN1 outcome ; Inversion = SN2 outcome | The two mechanisms differ in key ways.
M3#chemistry-u13-10-q4@3: Why do polar aprotic solvents speed up SN2? | They do not solvate anionic nucleophiles strongly, leaving them reactive | They stabilise carbocation intermediates strongly | They donate protons directly to the nucleophile | They slow every reaction step down to a crawl | Free, poorly solvated nucleophiles attack the carbon much faster.
SA2#chemistry-u13-10-q5@1,3: Explain the SN2 mechanism and its features. | In SN2, the nucleophile attacks carbon from the side opposite the leaving group in one concerted step, forming a five-coordinate transition state, so rate = k[R–X][Nu], second order and bimolecular. Backside attack inverts configuration, as (R)-2-bromobutane gives (S)-butan-2-ol. SN2 is fastest for methyl and primary substrates and blocked at tertiary centres by steric hindrance, and is favoured by strong nucleophiles and polar aprotic solvents. It is common in biological methylation. | Backside attack ; Concerted ; Rate equation ; Inversion ; Conditions

## Elimination reactions
LV: Year 1 · Application
S: Elimination reactions remove atoms to form multiple bonds. This lesson introduces eliminations and their competition with substitution.
O: Describe elimination of haloalkanes and alcohols
O: Predict major alkene products using Zaitsev's rule
O: Explain conditions favouring elimination over substitution
H: Eliminations
- **Dehydrohalogenation**: haloalkane + base → alkene + HX.
- **Dehydration**: alcohol + acid catalyst → alkene + H₂O.
- A hydrogen is lost from the carbon **next to** the leaving group (β-hydrogen).
- Two mechanisms: **E1** and **E2**.
D: chem-e2-mechanism
H: Elimination versus substitution
- **Zaitsev's rule**: the more substituted alkene is usually major.
- **Hot**, **ethanolic** KOH favours elimination.
- **Warm aqueous** KOH favours substitution.
- **Bulky** bases and **tertiary** substrates favour elimination.
P: Bromoethane with KOH can give ethanol by substitution or ethene by elimination depending on conditions. Bulky bases such as potassium tert-butoxide can give the less substituted (Hofmann) alkene because they reach the most accessible hydrogens.
X: Eliminating HBr from 2-bromobutane.
> Hot ethanolic KOH removes a β-hydrogen.
> Loss of H from C3 gives but-2-ene.
> Loss of H from C1 gives but-1-ene.
> But-2-ene, more substituted, is the major product.
K: Elimination removes a leaving group and a β-hydrogen to form an alkene; Zaitsev's rule favours the more substituted alkene, and hot ethanolic conditions, bulky bases and tertiary substrates favour elimination over substitution.
!: Thinking the same conditions always give the same product type. Solvent and temperature switch between substitution and elimination.
EV: established | Zaitsev's rule predicts the major product of elimination (Zaitsev, 1875).
T: Elimination | Removal of atoms to form a multiple bond
T: β-hydrogen | A hydrogen on the carbon next to the leaving group
T: Zaitsev's rule | The more substituted alkene is the major product
SUM: Lose HX or H₂O.
SUM: Zaitsev product.
SUM: Hot ethanolic for elimination.
SRC: Saytzeff A., "Zur Kenntniss der Reihenfolge der Anlagerung und Ausscheidung der Jodwasserstoffelemente in organischen Verbindungen", Justus Liebigs Annalen der Chemie 179(3), 296–301 | primary | 1875
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
Q: What conditions favour elimination from a haloalkane? | Hot ethanolic potassium hydroxide.
Q: What does Zaitsev's rule predict? | The more substituted alkene is the major product.
M1#chemistry-u13-11-q1@1: What is the major product of eliminating HBr from 2-bromobutane? | But-2-ene | But-1-ene | Butan-2-ol | Butane | The more substituted alkene forms preferentially.
M2#chemistry-u13-11-q2@2: Why does warm aqueous KOH favour substitution? | Water solvates hydroxide, making it act as a nucleophile rather than a base | Water removes every hydrogen atom from the substrate | Aqueous conditions always give alkenes as products | Hydroxide can never act as a nucleophile in water | Lower temperature and protic solvent favour substitution.
MATCH1#chemistry-u13-11-q3@2: Match each condition to its favoured outcome. | Warm aqueous KOH = Substitution ; Hot ethanolic KOH = Elimination ; Bulky tert-butoxide = Hofmann alkene ; Concentrated H₂SO₄ with alcohol = Dehydration | Conditions steer the reaction.
M3#chemistry-u13-11-q4@3: Why can a bulky base give the less substituted alkene? | It can only reach the least hindered β-hydrogens | It prefers more crowded hydrogens | Bulky bases do not cause elimination | It forms a carbocation first | Steric access overrides alkene stability.
SA2#chemistry-u13-11-q5@1,3: Describe elimination reactions and how they compete with substitution. | In elimination, a leaving group and a β-hydrogen are removed to form an alkene: haloalkanes lose HX with base, and alcohols lose water with an acid catalyst, by E1 or E2. Zaitsev's rule says the more substituted alkene is usually major, so 2-bromobutane gives mainly but-2-ene. Hot ethanolic KOH, bulky bases and tertiary substrates favour elimination, while warm aqueous KOH favours substitution. Bulky bases such as tert-butoxide can give the less substituted Hofmann alkene. | Types ; β-hydrogen ; Zaitsev ; Conditions ; Bulky bases

## E1 mechanisms
LV: Year 1 · Chemical reasoning
S: E1 eliminations proceed through a carbocation. This lesson explains their mechanism and how they compete with SN1.
O: Describe the two-step E1 mechanism
O: Explain first-order kinetics in E1
O: Explain competition between E1 and SN1
H: Mechanism
- **Step 1**: the leaving group departs, forming a **carbocation** (slow).
- **Step 2**: a base removes a **β-hydrogen**, forming the C=C (fast).
- Rate = k[R–X]: first order.
- Shares its first step with SN1.
D: chem-e1-mechanism
H: Conditions and products
- Favoured by **tertiary** substrates and **weak bases**.
- **Heat** favours E1 over SN1, since elimination increases entropy.
- Zaitsev products dominate.
- Acid-catalysed dehydration of alcohols often goes by E1.
P: Tertiary substrates in polar protic solvents give mixtures of SN1 and E1 products. Raising the temperature shifts the balance towards elimination because forming more molecules increases entropy. Carbocation rearrangements may occur, as in SN1.
X: Dehydrating 2-methylbutan-2-ol.
> Acid protonates the OH group.
> Water leaves, forming a tertiary carbocation.
> Water removes a β-hydrogen.
> 2-methylbut-2-ene forms as the main product.
K: E1 forms a carbocation in a slow first step, then loses a β-hydrogen; it is first order, favoured by tertiary substrates, weak bases and heat, competes with SN1 and gives mainly Zaitsev alkenes.
!: Thinking E1 and SN1 never happen together. They share an intermediate, so mixtures are common.
EV: established | E1 and SN1 share the carbocation-forming step (Hughes and Ingold, 1935).
T: E1 | Unimolecular elimination
T: Dehydration | Elimination of water from an alcohol
T: Entropy | A measure of disorder that rises when more molecules form
SUM: Carbocation first.
SUM: First order.
SUM: Heat favours E1.
SRC: Hughes E. D. and Ingold C. K., "Mechanism of substitution at a saturated carbon atom", Journal of the Chemical Society, 244–255 | primary | 1935
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
Q: What intermediate does E1 share with SN1? | A carbocation.
Q: What is the rate equation for E1? | Rate = k[R–X].
M1#chemistry-u13-12-q1@1: What does the base remove in the second step of E1? | A β-hydrogen next to the positive carbon | The leaving group from the substrate | A hydrogen from the solvent only | An electron from the carbocation | Removing a β-hydrogen lets its bonding pair form the new C=C bond.
M2#chemistry-u13-12-q2@2: Why does heating favour E1 over SN1? | Elimination forms more molecules, increasing entropy | Heat stabilises nucleophiles | SN1 is faster at high temperatures | Heat destroys carbocations | A larger positive ΔS makes elimination more favourable at high T.
SEQ1#chemistry-u13-12-q3@2: Put acid-catalysed dehydration of an alcohol in order. | Acid protonates the OH group ; Water leaves forming a carbocation ; A base removes a β-hydrogen ; The alkene forms | E1 dehydration needs the OH first converted to a good leaving group.
M3#chemistry-u13-12-q4@3: Why do tertiary substrates in water give SN1 and E1 mixtures? | Both share the same carbocation, which water can attack or deprotonate | Tertiary substrates never form any carbocation | Water acts as a very strong base in these reactions | Only the SN2 pathway is possible for them | The shared carbocation can be attacked by water or lose a proton.
SA2#chemistry-u13-12-q5@1,3: Explain the E1 mechanism. | In E1, the leaving group departs in a slow first step, forming a carbocation, and a base removes a β-hydrogen in a fast second step, forming the alkene. The rate equation is rate = k[R–X], first order. E1 is favoured by tertiary substrates, weak bases and heat, because elimination increases entropy, and gives mainly Zaitsev products. It shares its first step with SN1, so mixtures are common, and carbocation rearrangements can occur. Acid-catalysed alcohol dehydration usually goes by E1. | Two steps ; Rate ; Conditions ; Heat ; SN1 competition

## E2 mechanisms
LV: Year 1 · Chemical reasoning
S: E2 eliminations occur in one concerted step. This lesson explains their mechanism, kinetics and geometry.
O: Describe the one-step E2 mechanism
O: Explain second-order kinetics in E2
O: Explain the anti-periplanar requirement
H: Mechanism
- The base removes a β-hydrogen as the leaving group departs and the C=C forms.
- All in **one concerted step**.
- Rate = k[R–X][base]: **second order**.
- Favoured by **strong bases** such as alkoxides and hydroxide.
D: chem-e2-mechanism
H: Geometry
- The β-hydrogen and leaving group must be **anti-periplanar**: 180° apart in the same plane.
- This lines up orbitals to form the π bond.
- In cyclohexanes, both must be **axial**.
- Geometry controls which E or Z alkene forms.
P: E2 is the main elimination with strong bases, including for primary and secondary substrates. Because of the anti-periplanar requirement, some cyclohexyl halides react slowly or give unexpected alkenes when the needed hydrogen cannot be axial.
X: Anti-periplanar elimination.
> In a staggered conformation, Br on one carbon and H on the neighbouring (β) carbon are 180° apart.
> The base removes H as the C–Br bond breaks.
> Electrons from the C–H bond form the π bond.
> The alkene forms in one step with defined geometry.
K: E2 is a concerted elimination with rate = k[R–X][base], favoured by strong bases, and requires the β-hydrogen and leaving group to be anti-periplanar, which controls alkene geometry and reactivity in rings.
!: Thinking any β-hydrogen can be removed in E2. It must be anti-periplanar to the leaving group.
EV: established | E2 elimination requires an anti-periplanar arrangement (Barton, 1950).
T: E2 | Bimolecular elimination
T: Anti-periplanar | 180° apart in the same plane
T: Concerted | All bond changes in one step
SUM: One step.
SUM: Rate = k[R–X][base].
SUM: Anti-periplanar.
SRC: Barton D. H. R., "The conformation of the steroid nucleus", Experientia 6(8), 316–320 | primary | 1950
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
Q: What is the rate equation for E2? | Rate = k[R–X][base].
Q: What geometry does E2 require? | The β-hydrogen and leaving group must be anti-periplanar.
M1#chemistry-u13-13-q1@1: What type of base favours E2? | A strong base such as ethoxide | A very weak base such as water | No base at all | A neutral alkane | Strong bases remove the β-hydrogen in the concerted step.
M2#chemistry-u13-13-q2@2: Why must the hydrogen and leaving group be anti-periplanar? | It aligns the C–H and C–X orbitals to form the new π bond | It keeps the molecule from rotating | It makes the leaving group more basic | It prevents any reaction from occurring | Orbital overlap needs parallel alignment in one plane.
MATCH1#chemistry-u13-13-q3@3: Match each feature to E1 or E2. | Carbocation intermediate = E1 ; Anti-periplanar geometry = E2 ; Weak base and heat = E1 conditions ; Strong base = E2 conditions | The two eliminations differ in mechanism.
M3#chemistry-u13-13-q4@3: Why must both groups be axial for E2 in cyclohexanes? | Only trans-diaxial groups are anti-periplanar in a chair | Equatorial groups are always more reactive | Axial positions are not in chairs | Rings cannot undergo elimination | Ring geometry restricts which H and X can align.
SA2#chemistry-u13-13-q5@1,3: Explain the E2 mechanism. | In E2, a base removes a β-hydrogen as the leaving group departs and the C=C forms, all in one concerted step, so rate = k[R–X][base], second order. It is favoured by strong bases such as alkoxides. The β-hydrogen and leaving group must be anti-periplanar, 180° apart in one plane, aligning orbitals to form the π bond; in cyclohexanes both must be axial. This geometry controls which E or Z alkene forms and explains slow or unexpected reactions in rings. | Concerted step ; Rate ; Strong base ; Anti-periplanar ; Rings

## Addition reactions
LV: Year 1 · Application
S: Addition reactions join atoms across multiple bonds. This lesson compares additions to C=C and C=O bonds.
O: Describe addition across C=C and C=O bonds
O: Compare electrophilic and nucleophilic addition
O: Explain why the two bonds attract different reagents
H: Two kinds of π bond
- **C=C** is non-polar and electron-rich: it attracts **electrophiles**.
- **C=O** is polar with a δ+ carbon: it attracts **nucleophiles**.
- In both, the π bond breaks and two new σ bonds form.
- Addition turns sp² carbons into sp³ carbons.
D: chem-hbr-propene
H: Examples
- Ethene + HBr → bromoethane (electrophilic addition).
- Ethanal + HCN → 2-hydroxypropanenitrile (nucleophilic addition).
- Alkenes + H₂ and carbonyls + hydride both add hydrogen.
- Polymerisation is repeated addition of alkene monomers.
P: The polarity of the π bond decides which reagents attack. Alkenes add bromine and hydrogen halides, while aldehydes and ketones add cyanide, hydride and Grignard reagents. Addition reactions have high atom economy because all atoms end up in the product.
X: Comparing two additions.
> Propene + H₂O (acid catalyst) → propan-2-ol: electrophile H⁺ attacks first.
> Propanone + NaBH₄ → propan-2-ol: nucleophile H⁻ attacks first.
> Both give the same alcohol.
> The first attacking species differs because the π bonds differ.
K: Addition reactions break a π bond and form two σ bonds; non-polar, electron-rich C=C bonds undergo electrophilic addition, while polar C=O bonds undergo nucleophilic addition at the δ+ carbon, and additions have high atom economy.
!: Thinking C=O bonds react like C=C bonds. Their polarity means nucleophiles attack, not electrophiles.
EV: established | Bond polarity determines whether π bonds undergo electrophilic or nucleophilic addition (Clayden et al., 2012).
T: Addition reaction | Two molecules combine to form one product
T: Atom economy | Percentage of reactant atoms ending up in the desired product
T: π bond | A bond formed by sideways overlap of p orbitals
SUM: C=C electrophiles.
SUM: C=O nucleophiles.
SUM: High atom economy.
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
SRC: Trost B. M., "The atom economy: a search for synthetic efficiency", Science 254(5037), 1471–1477 | primary | 1991
Q: What attacks a C=C double bond first? | An electrophile.
Q: What attacks a C=O double bond first? | A nucleophile.
M1#chemistry-u13-14-q1@1: What type of addition occurs when HCN adds to ethanal? | Nucleophilic addition to the carbonyl | Electrophilic addition to an alkene | Free-radical substitution of hydrogen | Nucleophilic substitution of a halide | Cyanide attacks the δ+ carbonyl carbon, so this is nucleophilic addition.
M2#chemistry-u13-14-q2@2: Why do addition reactions have high atom economy? | All the reactant atoms end up in the single product | They always produce water as a waste product | They need large amounts of catalyst | They release carbon dioxide | Nothing is lost when two molecules join into one.
MATCH1#chemistry-u13-14-q3@2: Match each reaction to its type of addition. | Ethene with bromine = Electrophilic ; Propanone with NaBH₄ = Nucleophilic ; Ethanal with HCN = Nucleophilic cyanide ; Propene with HBr = Electrophilic halide | π bond polarity decides the type.
M3#chemistry-u13-14-q4@3: Why do alkenes not react readily with cyanide ions? | The non-polar, electron-rich C=C repels nucleophiles | Cyanide is too strong an electrophile | Alkenes have no π electrons | Cyanide only reacts with metals | Nucleophiles need an electron-poor site to attack.
SA2#chemistry-u13-14-q5@1,3: Compare additions to C=C and C=O bonds. | Addition reactions break a π bond and form two σ bonds, turning sp² carbons into sp³. The C=C bond is non-polar and electron-rich, so electrophiles such as H⁺ and Br₂ attack it, as in ethene with HBr. The C=O bond is polar with a δ+ carbon, so nucleophiles such as cyanide, hydride and Grignard reagents attack it, as in ethanal with HCN. Propene and propanone can both give propan-2-ol, but by different first steps. Additions have high atom economy. | π bonds ; Electrophilic ; Nucleophilic ; Comparison ; Atom economy

## Electrophilic addition
LV: Year 1 · Chemical reasoning
S: This lesson details the mechanisms of electrophilic addition to alkenes, including bromination and hydration.
O: Draw the mechanism for addition of HBr to an alkene
O: Explain the bromonium ion mechanism for adding bromine
O: Explain evidence for the carbocation and bromonium intermediates
H: Adding HBr
- The π electrons attack H of H–Br, which is δ+.
- A **carbocation** forms; Br⁻ is released.
- Br⁻ attacks the carbocation.
- The more stable carbocation leads to the major product: with propene, H adds to the end carbon and Br to the middle one, giving **2-bromopropane** (Markovnikov's rule).
D: chem-hbr-propene
H: Adding Br₂
- Br₂ is **polarised** as the π bond approaches.
- A cyclic **bromonium ion** forms.
- Br⁻ attacks from the opposite face: **anti addition**.
- Cyclohexene gives trans-1,2-dibromocyclohexane.
D: chem-br2-bromonium
P: Evidence for the intermediate: bromine in the presence of chloride ions gives some products containing both Br and Cl, showing that a positive intermediate is captured by whichever anion is nearby. Hydration with steam and acid follows the HBr pathway, with water as the nucleophile.
X: Bromine with ethene in brine.
> Br₂ adds to form a bromonium ion.
> Br⁻ or Cl⁻ can attack the intermediate.
> Products include 1,2-dibromoethane and 1-bromo-2-chloroethane.
> A two-step mechanism with an intermediate is confirmed.
K: Electrophilic addition of HBr goes through a carbocation, with the more stable one giving the major product, while Br₂ forms a cyclic bromonium ion attacked from the opposite face to give anti addition; capture by other anions supports these intermediates.
!: Thinking Br₂ adds both bromines at once from the same side. It adds in two steps from opposite faces.
EV: established | Bromonium ion intermediates explain anti addition of bromine (Roberts and Kimball, 1937).
T: Bromonium ion | A cyclic intermediate with a positive bromine bridging two carbons
T: Anti addition | Addition of two groups to opposite faces
T: Induced dipole | Polarity created in Br₂ by an approaching π bond
SUM: HBr via carbocation.
SUM: Br₂ via bromonium.
SUM: Anti addition.
SRC: Roberts I. and Kimball G. E., "The halogenation of ethylenes", Journal of the American Chemical Society 59(5), 947–948 | primary | 1937
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
Q: What intermediate forms when bromine adds to an alkene? | A cyclic bromonium ion.
Q: What product does cyclohexene give with bromine? | trans-1,2-dibromocyclohexane.
M1#chemistry-u13-15-q1@1: Which atom in HBr does the alkene's π bond attack first? | The δ+ hydrogen atom | The δ− bromine atom | Both atoms at the same time | Neither atom reacts | Electrons flow towards the electron-poor hydrogen.
M2#chemistry-u13-15-q2@2: Why does bromine in sodium chloride solution give some chlorinated products? | Chloride ions capture the positive intermediate | Chlorine replaces bromine in Br₂ | Sodium ions add to the alkene | The alkene reacts with water only | A two-step mechanism lets any nearby anion attack.
SEQ1#chemistry-u13-15-q3@2: Put the steps of bromine addition to ethene in order. | Br₂ is polarised by the π bond ; A cyclic bromonium ion forms ; Br⁻ attacks from the opposite face ; 1,2-dibromoethane forms | Two steps give anti addition.
M3#chemistry-u13-15-q4@3: Why does bromination of cyclohexene give only the trans product? | Bromide attacks the bromonium ion from the face opposite the bridging bromine | Both bromines add together from the same face | The ring flips during reaction to give cis product | A flat carbocation forms and is attacked equally from both faces | The bridged intermediate blocks one face.
SA2#chemistry-u13-15-q5@1,3: Explain the mechanisms of electrophilic addition to alkenes. | With HBr, the π electrons attack the δ+ hydrogen, forming a carbocation and Br⁻, which then attacks; the more stable carbocation gives the major product. Steam addition with acid follows the same path with water as nucleophile. With Br₂, the approaching π bond polarises bromine and a cyclic bromonium ion forms; Br⁻ attacks from the opposite face, giving anti addition, so cyclohexene forms trans-1,2-dibromocyclohexane. Mixed products in brine show a positive intermediate is captured. | HBr mechanism ; Carbocation stability ; Bromonium ion ; Anti addition ; Evidence

## Nucleophilic addition
LV: Year 1 · Chemical reasoning
S: Aldehydes and ketones undergo nucleophilic addition at the carbonyl carbon. This lesson explains the mechanism and key examples.
O: Draw the mechanism of nucleophilic addition to carbonyls
O: Compare the reactivity of aldehydes and ketones
O: Explain the stereochemistry of addition to carbonyls
H: Mechanism
- A nucleophile attacks the δ+ carbonyl carbon.
- The π electrons move onto oxygen, forming an **alkoxide**.
- The alkoxide is **protonated** to give an alcohol.
- Examples: HCN gives hydroxynitriles; NaBH₄ gives alcohols.
D: chem-nucleophilic-addition
H: Reactivity and stereochemistry
- **Aldehydes** are more reactive than **ketones**.
- Ketones have two alkyl groups that donate electrons and crowd the carbon.
- The planar carbonyl can be attacked from **either face**.
- Unsymmetrical carbonyls give **racemic** products.
P: Adding HCN to ethanal makes 2-hydroxypropanenitrile, extending the carbon chain. In teaching labs KCN with acid is used rather than HCN gas, for safety; either way the cyanide ion is the nucleophile, and the alkoxide is then protonated by HCN or by H⁺ from the acid. Grignard reagents add to carbonyls to make larger alcohols.
X: HCN with propanal.
> CN⁻ attacks the carbonyl carbon from above or below.
> An alkoxide intermediate forms.
> H⁺ protonates the oxygen.
> A racemic hydroxynitrile forms.
K: Nucleophiles attack the δ+ carbonyl carbon, forming an alkoxide that is protonated to an alcohol; aldehydes are more reactive than ketones, and attack on either face of the planar carbonyl gives racemic products.
!: Thinking nucleophilic addition to ethanal gives one enantiomer. Equal attack from both faces gives a racemate.
EV: established | Nucleophilic addition to carbonyls follows the Bürgi-Dunitz approach angle (Bürgi et al., 1973).
T: Nucleophilic addition | Addition initiated by a nucleophile
T: Alkoxide | An anion RO⁻
T: Hydroxynitrile | A molecule with –OH and –CN on the same carbon
SUM: Attack, then protonate.
SUM: Aldehydes beat ketones.
SUM: Racemic products.
SRC: Bürgi H. B., Dunitz J. D. and Shefter E., "Geometrical reaction coordinates. II. Nucleophilic addition to a carbonyl group", Journal of the American Chemical Society 95(15), 5065–5067 | primary | 1973
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
Q: What intermediate forms in nucleophilic addition to a carbonyl? | An alkoxide ion.
Q: Which are more reactive to nucleophiles, aldehydes or ketones? | Aldehydes.
M1#chemistry-u13-16-q1@1: What is formed when HCN adds to ethanal? | 2-hydroxypropanenitrile | Ethanoic acid | Propanal | Ethanol | Cyanide adds a carbon and the oxygen becomes –OH.
M2#chemistry-u13-16-q2@2: Why are ketones less reactive than aldehydes towards nucleophiles? | Two alkyl groups donate electrons and crowd the carbonyl carbon | Ketones contain no carbonyl group at all | Aldehydes carry two alkyl groups on C=O | Ketone carbonyl carbons are more strongly δ+ | Both electronic and steric effects slow attack on ketones.
MATCH1#chemistry-u13-16-q3@2: Match each reagent to its product with a carbonyl. | HCN = Hydroxynitrile ; NaBH₄ = Alcohol ; Grignard reagent = Larger alcohol ; Water = Hydrate | Different nucleophiles give different products.
M3#chemistry-u13-16-q4@3: Why does adding HCN to propanal give a racemic mixture? | The planar carbonyl is attacked equally from both faces | Cyanide attacks only from one face | Propanal is already a chiral molecule | The product has no stereocentre at all | Equal attack forms equal amounts of each enantiomer.
SA2#chemistry-u13-16-q5@1,3: Explain nucleophilic addition to aldehydes and ketones. | A nucleophile attacks the δ+ carbonyl carbon and the π electrons move onto oxygen, forming an alkoxide, which is protonated to an alcohol. HCN gives hydroxynitriles, such as 2-hydroxypropanenitrile from ethanal, NaBH₄ gives alcohols and Grignard reagents give larger alcohols. Aldehydes are more reactive than ketones, whose two alkyl groups donate electrons and add crowding. The planar carbonyl is attacked from either face, so unsymmetrical carbonyls give racemic products. | Mechanism ; Alkoxide ; Examples ; Aldehyde versus ketone ; Stereochemistry

## Electrophilic aromatic substitution
LV: Year 1 · Chemical reasoning
S: This lesson details the mechanism of electrophilic aromatic substitution and how electrophiles are generated.
O: Draw the general mechanism of electrophilic aromatic substitution
O: Explain how catalysts generate electrophiles
O: Explain why the arenium intermediate loses a proton
H: General mechanism
- An electrophile attacks the π system of the ring.
- A positively charged **arenium ion** (Wheland intermediate) forms; aromaticity is lost.
- A base removes H⁺ from the sp³ carbon.
- Aromaticity is **restored**, giving the substituted product.
D: chem-nitration
H: Making electrophiles
- **Nitration**: H₂SO₄ protonates HNO₃, giving **NO₂⁺**.
- **Halogenation**: FeBr₃ accepts Br⁻ from Br₂, giving a **Br⁺**-like electrophile.
- **Friedel-Crafts acylation**: AlCl₃ forms an **acylium ion**, RCO⁺.
- The catalyst is **regenerated** at the end.
P: The first step is slow because aromaticity is lost; the second is fast because aromaticity is regained. Losing H⁺ rather than adding a nucleophile keeps the stable ring, unlike alkene addition. Friedel-Crafts acylation avoids the over-reaction seen with alkylation.
X: Friedel-Crafts acylation.
> CH₃COCl + AlCl₃ → CH₃CO⁺ + AlCl₄⁻.
> The acylium ion attacks benzene, forming an arenium ion.
> AlCl₄⁻ removes H⁺, giving HCl and regenerating AlCl₃.
> Phenylethanone forms.
K: Electrophilic aromatic substitution forms an arenium ion that loses H⁺ to restore aromaticity; catalysts generate electrophiles such as NO₂⁺, Br⁺ equivalents and acylium ions and are regenerated, and the first step is rate-determining.
!: Thinking the arenium ion adds a nucleophile like an alkene carbocation. It loses H⁺ to regain aromaticity.
EV: established | The arenium ion intermediate has been observed in electrophilic aromatic substitution (Olah, 1971).
T: Arenium ion | The positively charged intermediate in aromatic substitution
T: Acylium ion | The electrophile RCO⁺
T: Friedel-Crafts reaction | Alkylation or acylation of arenes with a Lewis acid
SUM: Attack, then lose H⁺.
SUM: Catalysts make electrophiles.
SUM: Aromaticity restored.
SRC: Olah G. A., "Aromatic substitution. XXVIII. Mechanism of electrophilic aromatic substitutions", Accounts of Chemical Research 4(7), 240–248 | primary | 1971
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
Q: What is the intermediate in electrophilic aromatic substitution? | An arenium ion.
Q: Which electrophile forms in Friedel-Crafts acylation? | An acylium ion, RCO⁺.
M1#chemistry-u13-17-q1@1: What role does AlCl₃ play in Friedel-Crafts acylation? | It acts as a Lewis acid to form the acylium ion | It acts as a nucleophile attacking the ring | It is the final organic product | It removes the benzene ring | AlCl₃ accepts chloride from the acyl chloride.
M2#chemistry-u13-17-q2@2: Why does the arenium ion lose H⁺ rather than add a nucleophile? | Losing H⁺ restores the stable aromatic ring | Nucleophiles cannot reach the ion | The arenium ion has no positive charge | Adding a nucleophile restores aromaticity | Regaining aromaticity strongly favours deprotonation.
SEQ1#chemistry-u13-17-q3@2: Put the steps of benzene nitration in order. | H₂SO₄ and HNO₃ form NO₂⁺ ; NO₂⁺ attacks the π system ; An arenium ion forms ; HSO₄⁻ removes H⁺ to give nitrobenzene | The catalyst acid is regenerated at the end.
M3#chemistry-u13-17-q4@3: Why is the first step of electrophilic aromatic substitution slow? | Aromatic stabilisation is lost when the arenium ion forms | The electrophile is too stable | The base is too weak | Aromaticity is gained in the first step | Breaking the delocalised system costs energy.
SA2#chemistry-u13-17-q5@1,3: Explain the mechanism of electrophilic aromatic substitution. | An electrophile attacks the ring's π system, forming a positively charged arenium ion and losing aromaticity in the slow step; a base then removes H⁺ from the sp³ carbon, restoring aromaticity. Catalysts generate electrophiles: sulfuric acid protonates nitric acid to give NO₂⁺, FeBr₃ polarises Br₂ and AlCl₃ forms an acylium ion from an acyl chloride, as in making phenylethanone. The catalyst is regenerated. Losing H⁺ rather than adding a nucleophile keeps the stable ring. | Electrophile attack ; Arenium ion ; Proton loss ; Electrophile generation ; Catalyst regeneration

## Nucleophilic aromatic substitution
LV: Year 1 · Chemical reasoning
S: Aromatic rings can undergo nucleophilic substitution when activated. This lesson explains how and why.
O: Explain why simple aryl halides resist nucleophilic substitution
O: Describe the addition-elimination (SNAr) mechanism
O: Explain how electron-withdrawing groups activate the ring
H: Why it is unusual
- Aryl halides do **not** undergo SN1 or SN2 easily.
- Backside attack is blocked by the ring.
- Aryl cations are very unstable.
- The C–X bond is strengthened by overlap with the ring.
D: chem-snar
H: SNAr mechanism
- **Electron-withdrawing groups** (–NO₂) at the 2- or 4-position activate the ring.
- The nucleophile **adds** to the carbon bearing the leaving group.
- A negatively charged **Meisenheimer complex** forms, stabilised by the nitro group.
- The leaving group is **eliminated**, restoring aromaticity.
P: 1-chloro-2,4-dinitrobenzene reacts readily with hydroxide, while chlorobenzene needs extreme conditions. Sanger used 1-fluoro-2,4-dinitrobenzene to label amino acids at the start of protein chains, part of his work sequencing insulin. In SNAr, fluoride is often the best leaving group because the addition step is rate-determining.
X: Sanger's reagent.
> The amino group of a protein attacks the C–F carbon.
> A Meisenheimer complex forms, stabilised by two nitro groups.
> Fluoride leaves, restoring the aromatic ring.
> The N-terminal amino acid is tagged with a yellow label.
K: Aryl halides resist SN1 and SN2, but electron-withdrawing groups at the 2- and 4-positions allow SNAr: the nucleophile adds to form a stabilised Meisenheimer complex and the leaving group is then eliminated.
!: Applying SN2 to aryl halides. The ring blocks backside attack, so a different mechanism is needed.
EV: established | Meisenheimer complexes are intermediates in nucleophilic aromatic substitution (Bunnett and Zahler, 1951).
T: SNAr | Nucleophilic aromatic substitution by addition-elimination
T: Meisenheimer complex | The negatively charged intermediate in SNAr
T: Activating group | A group that makes a ring more reactive to a given reagent
SUM: Aryl halides resist SN1/SN2.
SUM: Addition then elimination.
SUM: Nitro groups activate.
SRC: Bunnett J. F. and Zahler R. E., "Aromatic nucleophilic substitution reactions", Chemical Reviews 49(2), 273–412 | secondary | 1951
SRC: Sanger F., "The free amino groups of insulin", Biochemical Journal 39(5), 507–515 | primary | 1945
Q: What intermediate forms in SNAr? | A Meisenheimer complex.
Q: Which groups activate a ring for SNAr? | Electron-withdrawing groups such as –NO₂.
M1#chemistry-u13-18-q1@1: Which compound undergoes SNAr most readily? | 1-chloro-2,4-dinitrobenzene | Chlorobenzene | Methylbenzene | Benzene | Two nitro groups strongly stabilise the negative intermediate.
M2#chemistry-u13-18-q2@2: Why can aryl halides not react by SN2? | The ring blocks backside attack on the carbon | Aryl halides have no leaving group | They form very stable aryl cations | The C–X bond is extremely weak | The nucleophile cannot approach from behind the C–X bond.
SEQ1#chemistry-u13-18-q3@3: Put the SNAr steps in order. | Nucleophile attacks the carbon bearing X ; A Meisenheimer complex forms ; Negative charge is stabilised by nitro groups ; The leaving group departs | Addition comes before elimination.
M3#chemistry-u13-18-q4@3: Why is fluoride often a good leaving group in SNAr but poor in SN2? | In SNAr the addition step is rate-determining, and F speeds it by withdrawing electrons | Fluoride is the weakest base of all | C–F bonds are the weakest bonds | SNAr does not involve a leaving group | Bond breaking is not rate-determining in SNAr.
SA2#chemistry-u13-18-q5@1,3: Explain nucleophilic aromatic substitution. | Aryl halides resist SN1 because aryl cations are unstable and SN2 because the ring blocks backside attack. When electron-withdrawing groups such as –NO₂ sit at the 2- or 4-positions, SNAr occurs: the nucleophile adds to the carbon bearing the leaving group, forming a negatively charged Meisenheimer complex stabilised by the nitro groups, and the leaving group is eliminated, restoring aromaticity. Fluoride is often the best leaving group because addition is rate-determining. Sanger's reagent labelled proteins this way. | Resistance ; Activation ; Addition ; Meisenheimer complex ; Elimination

## Oxidation reactions
LV: Year 1 · Application
S: Oxidation in organic chemistry increases bonds to oxygen or decreases bonds to hydrogen. This lesson explains organic oxidations and their reagents.
O: Recognise organic oxidation by changes in bonding
O: Describe oxidation of alcohols and aldehydes
O: Compare common oxidising agents
H: Recognising oxidation
- Organic oxidation means **more C–O bonds** or **fewer C–H bonds**.
- Alcohol → aldehyde/ketone → carboxylic acid is an oxidation sequence.
- Tertiary alcohols resist oxidation: no H on the carbinol carbon.
- Shown with [O] in simplified equations.
H: Reagents and tests
- **Acidified dichromate**: orange to green.
- **Tollens' reagent**: silver mirror with aldehydes, not ketones.
- **Fehling's solution**: blue to brick-red precipitate with aldehydes.
- Milder reagents such as **PCC** stop at the aldehyde.
P: Alcohol breath tests originally used dichromate colour changes. Aldehydes are easily oxidised, which is why Tollens' and Fehling's tests distinguish them from ketones. Alkenes can also be oxidised, for example by cold manganate(VII) to diols.
X: Distinguishing propanal and propanone.
> Both are warmed with Tollens' reagent.
> Propanal reduces Ag⁺ to a silver mirror.
> Propanone gives no change.
> The aldehyde has a C–H on the carbonyl that can be oxidised.
H: Comparing oxidising agents
- **Acidified potassium dichromate(VI)** is the workhorse: primary alcohols to aldehydes (distilled off) or carboxylic acids (under reflux), secondary alcohols to ketones, with orange Cr₂O₇²⁻ turning green Cr³⁺.
- **Acidified potassium manganate(VII)** is stronger and less selective (purple to colourless): it also attacks C=C double bonds, so it is less useful when other groups must survive.
- **PCC** (pyridinium chlorochromate) is milder: in a dry solvent it stops a primary alcohol at the aldehyde.
- **Tollens' reagent** and **Fehling's solution** are weak oxidising agents: strong enough to oxidise aldehydes but not ketones, which is why they are used as tests rather than to make products.
K: Organic oxidation increases C–O or decreases C–H bonds; primary alcohols oxidise to aldehydes and acids, secondary to ketones and tertiary resist, while dichromate, Tollens' and Fehling's reagents test for oxidisable groups and mild reagents stop at aldehydes.
!: Thinking ketones can be oxidised as easily as aldehydes. Ketones lack the carbonyl C–H bond.
EV: established | Tollens' test distinguishes aldehydes from ketones (Tollens, 1882).
T: Organic oxidation | Gaining C–O bonds or losing C–H bonds
T: Tollens' reagent | Ammoniacal silver nitrate used to test for aldehydes
T: Fehling's solution | Alkaline copper(II) used to test for aldehydes
SUM: More C–O, fewer C–H.
SUM: Alcohol oxidation ladder.
SUM: Tests for aldehydes.
SRC: Tollens B., "Ueber ammon-alkalische Silberlösung als Reagens auf Aldehyd", Berichte der deutschen chemischen Gesellschaft 15(2), 1635–1639 | primary | 1882
SRC: Royal Society of Chemistry, Oxidation of alcohols | guidance | 2024 | https://edu.rsc.org/
Q: What does Tollens' reagent form with an aldehyde? | A silver mirror.
Q: Why are tertiary alcohols hard to oxidise? | The carbinol carbon has no hydrogen.
M1#chemistry-u13-19-q1@1: What colour change shows acidified dichromate oxidising an alcohol? | Orange to green | Blue to brick-red | Colourless to silver | Purple to colourless | Cr₂O₇²⁻ (orange) is reduced to Cr³⁺ (green).
M2#chemistry-u13-19-q2@2: Why does Fehling's solution distinguish aldehydes from ketones? | Aldehydes are oxidised and reduce Cu²⁺, while ketones are not | Ketones produce a silver mirror with Fehling's | Aldehydes do not react with copper(II) at all | Both give an identical red precipitate | Only aldehydes have an oxidisable carbonyl C–H.
MATCH1#chemistry-u13-19-q3@2: Match each alcohol type to its oxidation product. | Primary alcohol, distilled = Aldehyde ; Primary alcohol, reflux = Carboxylic acid ; Secondary alcohol = Ketone ; Tertiary alcohol = No reaction | Structure decides the product.
M3#chemistry-u13-19-q4@3: Why does PCC stop at the aldehyde stage? | It is a mild oxidant used without water, so no hydrate forms to oxidise further | It reduces aldehydes back to alcohols | It reacts only with tertiary alcohols | It is a strong reducing agent | Further oxidation usually needs the aldehyde hydrate.
SA2#chemistry-u13-19-q5@1,3: Explain organic oxidation reactions and tests. | Organic oxidation means gaining C–O bonds or losing C–H bonds. Primary alcohols oxidise to aldehydes, distilled off, and to carboxylic acids under reflux; secondary alcohols give ketones; tertiary alcohols resist because the carbinol carbon has no hydrogen. Acidified dichromate turns from orange to green. Tollens' reagent gives a silver mirror and Fehling's a brick-red precipitate with aldehydes but not ketones. Mild reagents such as PCC stop at the aldehyde. | Definition ; Alcohols ; Dichromate ; Aldehyde tests ; Mild reagents

## Reduction reactions
LV: Year 1 · Application
S: Reduction in organic chemistry adds hydrogen or removes oxygen. This lesson compares reducing agents and their selectivity.
O: Recognise organic reduction by changes in bonding
O: Compare NaBH₄, LiAlH₄ and catalytic hydrogenation
O: Choose reducing agents for specific conversions
H: Recognising reduction
- Organic reduction means **more C–H bonds** or **fewer C–O bonds**.
- Shown with [H] in simplified equations.
- Aldehydes reduce to **primary** alcohols; ketones to **secondary** alcohols.
- Nitriles and amides can reduce to **amines**.
D: chem-nabh4-reduction
H: Reagents
- **NaBH₄**: mild, works in water or alcohol; reduces aldehydes and ketones.
- **LiAlH₄**: powerful, needs dry ether; also reduces acids, esters and amides.
- **H₂ with Ni, Pd or Pt**: reduces C=C, C≡C and sometimes C=O.
- Both hydride reagents deliver **H⁻** as a nucleophile.
P: Choosing a reducing agent lets chemists change one group and leave others. NaBH₄ reduces a ketone without touching an ester; LiAlH₄ would reduce both. Margarine was made by hydrogenating vegetable oils, converting C=C bonds to C–C.
X: Choosing a reagent.
> A molecule contains a ketone and an ester.
> NaBH₄ reduces only the ketone to an alcohol.
> LiAlH₄ would reduce both groups.
> NaBH₄ is chosen for selective reduction.
K: Organic reduction adds C–H or removes C–O bonds; NaBH₄ mildly reduces aldehydes and ketones, LiAlH₄ also reduces acids, esters and amides and catalytic hydrogenation reduces C=C and C≡C, allowing selective choices.
!: Thinking NaBH₄ reduces carboxylic acids. It is too mild; LiAlH₄ is needed.
EV: established | Sodium borohydride was introduced as a selective reducing agent (Schlesinger et al., 1953).
T: Organic reduction | Gaining C–H bonds or losing C–O bonds
T: Hydride ion | H⁻, delivered by NaBH₄ or LiAlH₄
T: Catalytic hydrogenation | Adding H₂ with a metal catalyst
SUM: More C–H, fewer C–O.
SUM: NaBH₄ mild, LiAlH₄ strong.
SUM: Choose for selectivity.
SRC: Schlesinger H. I. et al., "Sodium borohydride, its hydrolysis and its use as a reducing agent", Journal of the American Chemical Society 75(1), 215–219 | primary | 1953
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
Q: What does a ketone reduce to? | A secondary alcohol.
Q: Which reagent can reduce an ester? | LiAlH₄.
M1#chemistry-u13-20-q1@1: Which reducing agent is mild and works in water? | Sodium borohydride, NaBH₄ | Lithium aluminium hydride, LiAlH₄ | Hydrogen with a nickel catalyst | Acidified potassium dichromate | NaBH₄ is stable enough to use in protic solvents.
M2#chemistry-u13-20-q2@2: Why is NaBH₄ chosen to reduce a ketone in a molecule that also has an ester? | It reduces the ketone but leaves the ester untouched | It reduces the ester faster than the ketone | It reduces every functional group present | It oxidises the ketone instead | Selectivity protects the other functional group.
MATCH1#chemistry-u13-20-q3@2: Match each conversion to a reagent. | Ketone to secondary alcohol = NaBH₄ ; Ester to alcohols = LiAlH₄ ; Alkene to alkane = H₂ with Ni ; Nitrile to amine = LiAlH₄ in dry ether | Reagent strength decides what is reduced.
M3#chemistry-u13-20-q4@3: Why must LiAlH₄ be used in dry ether? | It reacts violently with water, releasing hydrogen | It dissolves only in pure water | Ether itself acts as the reducing agent | Water makes the reagent more selective | Its high reactivity towards protic solvents makes water dangerous.
SA2#chemistry-u13-20-q5@1,3: Compare reducing agents used in organic chemistry. | Organic reduction adds C–H bonds or removes C–O bonds: aldehydes give primary alcohols, ketones secondary alcohols and nitriles and amides amines. NaBH₄ is mild, works in water or alcohol and reduces aldehydes and ketones; LiAlH₄ is powerful, needs dry ether because it reacts violently with water and also reduces acids, esters and amides. Both deliver hydride as a nucleophile. Catalytic hydrogenation with Ni, Pd or Pt reduces C=C and C≡C. Selective choice lets one group change while others stay. | Definition ; NaBH₄ ; LiAlH₄ ; Hydrogenation ; Selectivity

## Condensation reactions
LV: Year 1 · Application
S: Condensation reactions join molecules with loss of a small molecule. This lesson explains condensations in synthesis and polymers.
O: Define condensation reactions
O: Describe esterification and amide formation
O: Describe condensation polymerisation
H: Small-molecule condensations
- Two molecules join and lose a small molecule, usually **water** or **HCl**.
- **Esterification**: acid + alcohol ⇌ ester + water (acid catalyst).
- **Amide formation**: acyl chloride + amine → amide + HCl.
- **Aldol condensation**: two carbonyls join and lose water, forming C=C.
H: Polymers
- **Polyesters**: diacid + diol, such as PET.
- **Polyamides**: diacid or diacyl chloride + diamine, such as nylon-6,6.
- **Proteins** are natural polyamides from amino acids.
- Each link releases a small molecule.
P: Condensations are often reversible, so removing water drives the reaction forward. Nylon-6,6 can be pulled as a rope from the interface between solutions of hexanedioyl dichloride and hexane-1,6-diamine. Condensation polymers can be broken down by hydrolysis, unlike most addition polymers.
X: Making ethyl ethanoate.
> Ethanoic acid and ethanol are warmed with concentrated H₂SO₄.
> The acid catalyst activates the C=O group.
> Water is lost as the ester linkage forms.
> Ethyl ethanoate, a fruity-smelling ester, forms.
K: Condensation reactions join molecules with loss of water or HCl, as in esterification, amide formation and aldol condensation; repeating them with bifunctional monomers gives polyesters, polyamides and proteins.
!: Confusing condensation polymers with addition polymers. Condensation releases a small molecule at each link.
EV: established | Carothers developed condensation polymers including nylon (Carothers, 1929).
T: Condensation reaction | Joining with loss of a small molecule
T: Esterification | Formation of an ester from an acid and alcohol
T: Condensation polymer | A polymer formed with loss of small molecules
SUM: Join and lose water.
SUM: Esters and amides.
SUM: Polyesters and polyamides.
SRC: Carothers W. H., "An introduction to the general theory of condensation polymers", Journal of the American Chemical Society 51(8), 2548–2559 | primary | 1929
SRC: Royal Society of Chemistry, Making nylon | guidance | 2024 | https://edu.rsc.org/
Q: What small molecule is lost in esterification? | Water.
Q: What monomers make nylon-6,6? | A diacid or diacyl chloride and a diamine.
M1#chemistry-u13-21-q1@1: Which product forms when ethanoic acid reacts with ethanol? | Ethyl ethanoate | Ethanal | Ethene | Ethanamide | The acid and alcohol join to form an ester.
M2#chemistry-u13-21-q2@2: Why is water removed during esterification? | Removing a product shifts the equilibrium towards the ester | Water catalyses the reverse reaction only | Water is a reactant that must be destroyed | The ester dissolves only in water | Le Chatelier's principle drives the condensation forward.
MATCH1#chemistry-u13-21-q3@2: Match each polymer to its monomers. | PET = Diacid and diol ; Nylon-6,6 = Diacyl chloride and diamine ; Protein = Amino acids ; Poly(lactic acid) = Hydroxy acid | Condensation polymers need two reactive groups per monomer.
M3#chemistry-u13-21-q4@3: Why are condensation polymers easier to break down than addition polymers? | Their ester and amide links can be hydrolysed | They contain only C–C bonds | They are never biodegradable | Addition polymers have ester links | Hydrolysis reverses the condensation at each link.
SA2#chemistry-u13-21-q5@1,3: Explain condensation reactions and polymers. | Condensation reactions join two molecules with loss of a small molecule such as water or HCl: acids and alcohols form esters with an acid catalyst, acyl chlorides and amines form amides and two carbonyls can join in aldol condensation. Water is removed to drive equilibria forward. Bifunctional monomers form condensation polymers: diacids and diols give polyesters such as PET, diacyl chlorides and diamines give polyamides such as nylon-6,6 and amino acids give proteins. These polymers can be hydrolysed. | Definition ; Esterification ; Amides ; Polymers ; Hydrolysis

## Hydrolysis
LV: Year 1 · Application
S: Hydrolysis splits molecules using water. This lesson compares acid and base hydrolysis of esters, amides and other groups.
O: Define hydrolysis
O: Compare acid and base hydrolysis of esters
O: Describe hydrolysis of amides and haloalkanes
H: Esters
- **Acid hydrolysis**: reversible; gives a carboxylic acid and an alcohol.
- **Base hydrolysis (saponification)**: irreversible; gives a **carboxylate salt** and an alcohol.
- Base hydrolysis goes to completion because the carboxylate cannot react back.
- Saponification of fats makes soap.
D: chem-ester-hydrolysis
H: Other groups
- **Amides** hydrolyse slowly, needing hot acid or base.
- **Haloalkanes** hydrolyse to alcohols with water or hydroxide.
- **Nitriles** hydrolyse to carboxylic acids.
- **Proteins** and **polysaccharides** are hydrolysed by enzymes in digestion.
P: Amides are hard to hydrolyse because the nitrogen lone pair is delocalised into the C=O, making the carbon less electrophilic. This stability makes peptide bonds in proteins long-lasting. Enzymes such as proteases speed protein hydrolysis enormously.
X: Making soap.
> A fat (triglyceride) is heated with sodium hydroxide.
> Each ester link is hydrolysed.
> Sodium salts of fatty acids form: soap.
> Glycerol (propane-1,2,3-triol) is a by-product.
K: Hydrolysis splits molecules with water; acid hydrolysis of esters is reversible while base hydrolysis gives carboxylates irreversibly, as in soap-making, and amides, haloalkanes, nitriles, proteins and polysaccharides also hydrolyse, with amides being slow because of delocalisation.
!: Thinking base hydrolysis of an ester gives a carboxylic acid. It gives a carboxylate salt.
EV: established | Amide resonance makes peptide bonds resistant to hydrolysis (Pauling, Corey and Branson, 1951).
T: Hydrolysis | Splitting a molecule using water
T: Saponification | Base hydrolysis of esters, especially fats
T: Carboxylate | The anion RCOO⁻
SUM: Acid reversible.
SUM: Base irreversible.
SUM: Amides slow.
SRC: Pauling L., Corey R. B. and Branson H. R., "The structure of proteins", Proceedings of the National Academy of Sciences 37(4), 205–211 | primary | 1951
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
Q: What is saponification? | Base hydrolysis of an ester, especially a fat.
Q: What does nitrile hydrolysis produce? | A carboxylic acid.
M1#chemistry-u13-22-q1@1: What forms when ethyl ethanoate is heated with NaOH? | Sodium ethanoate and ethanol | Ethanoic acid and ethene | Ethanal and methanol | Ethane and sodium carbonate | Base hydrolysis gives a carboxylate salt and alcohol.
M2#chemistry-u13-22-q2@2: Why does base hydrolysis of esters go to completion? | The carboxylate ion formed cannot react with the alcohol | Base makes the ester more stable | The alcohol is destroyed by base | Acid is produced that stops the reaction | Deprotonation removes the acid from the equilibrium.
MATCH1#chemistry-u13-22-q3@2: Match each compound to its hydrolysis product. | Ester = Acid and alcohol ; Amide = Acid and amine ; Nitrile = Carboxylic acid ; Haloalkane = Alcohol | Water splits each group differently.
M3#chemistry-u13-22-q4@3: Why are amides harder to hydrolyse than esters? | The nitrogen lone pair delocalises into C=O, reducing the carbon's δ+ | Amides contain no carbonyl group at all | Amides are much more electrophilic than esters | Esters are protected by much stronger resonance | Delocalisation stabilises the amide bond.
SA2#chemistry-u13-22-q5@1,3: Explain hydrolysis of esters and other groups. | Hydrolysis splits molecules with water. Acid hydrolysis of esters is reversible, giving a carboxylic acid and alcohol, while base hydrolysis, saponification, goes to completion because the carboxylate cannot react back; heating fats with NaOH makes soap and glycerol. Amides hydrolyse slowly, needing hot acid or base, because the nitrogen lone pair delocalises into C=O. Haloalkanes give alcohols, nitriles give carboxylic acids, and enzymes hydrolyse proteins and polysaccharides in digestion. | Acid hydrolysis ; Saponification ; Amides ; Other groups ; Enzymes

## Rearrangements
LV: Year 1 · Chemical reasoning
S: Rearrangements change a molecule's carbon skeleton or connectivity. This lesson explains common rearrangements and their driving forces.
O: Describe carbocation rearrangements
O: Describe named rearrangement reactions
O: Explain the driving forces behind rearrangements
H: Carbocation shifts
- **1,2-hydride shifts** move H⁻ to an adjacent carbocation.
- **1,2-alkyl shifts** move a methyl or other alkyl group.
- Shifts form a **more stable** carbocation.
- They occur in SN1, E1 and electrophilic addition.
D: chem-hydride-shift
H: Named rearrangements
- **Pinacol rearrangement**: a 1,2-diol in acid gives a ketone.
- **Beckmann rearrangement**: an oxime gives an amide, used to make nylon-6.
- **Claisen rearrangement**: an allyl vinyl ether gives a carbonyl compound on heating.
- Driving forces: more stable intermediates or stronger bonds such as C=O.
P: Rearrangements can be a problem, giving unexpected products, or a tool, building complex skeletons. The Beckmann rearrangement of cyclohexanone oxime to caprolactam is used industrially on a scale of millions of tonnes per year.
X: A hydride shift in action.
> 3-methylbutan-2-ol is treated with HBr.
> Water leaves, forming a secondary carbocation.
> A hydride shifts from the neighbouring carbon, forming a tertiary carbocation.
> The major product is 2-bromo-2-methylbutane.
K: Rearrangements include 1,2-hydride and alkyl shifts that convert carbocations into more stable ones and named reactions such as the pinacol, Beckmann and Claisen rearrangements, driven by more stable intermediates or stronger bonds.
!: Assuming the product always has the same skeleton as the starting material. Carbocation shifts can change it.
EV: established | The Beckmann rearrangement is used industrially to make caprolactam for nylon-6 (Beckmann, 1886).
T: Rearrangement | A reaction that changes atom connectivity within a molecule
T: 1,2-shift | Movement of a group to an adjacent atom
T: Oxime | A compound with C=N–OH
SUM: Shifts to stabler cations.
SUM: Named rearrangements.
SUM: Problem or tool.
SRC: Beckmann E., "Zur Kenntniss der Isonitrosoverbindungen", Berichte der deutschen chemischen Gesellschaft 19(1), 988–993 | primary | 1886
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
Q: What drives a carbocation hydride shift? | Forming a more stable carbocation.
Q: What does the Beckmann rearrangement convert an oxime into? | An amide.
M1#chemistry-u13-23-q1@1: Which rearrangement converts a 1,2-diol into a ketone? | The pinacol rearrangement | The Beckmann rearrangement | The Claisen rearrangement | The Walden inversion | Acid-catalysed loss of water and a 1,2-shift give the ketone.
M2#chemistry-u13-23-q2@2: Why does 3-methylbutan-2-ol give 2-bromo-2-methylbutane with HBr? | A hydride shift converts a secondary carbocation into a tertiary one | Bromide attacks before any carbocation forms | The alcohol has no stereocentre | HBr removes a methyl group | The more stable carbocation is captured by bromide.
MATCH1#chemistry-u13-23-q3@3: Match each rearrangement to its product type. | Pinacol = Ketone ; Beckmann = Amide ; Claisen = γ,δ-unsaturated carbonyl ; Hydride shift = More stable carbocation | Each rearrangement has a typical outcome.
M3#chemistry-u13-23-q4@3: Why is the Beckmann rearrangement industrially important? | It converts cyclohexanone oxime into caprolactam for nylon-6 | It makes ethanol directly from ethene gas | It produces sulfuric acid from sulfur dioxide | It purifies drinking water on a large scale | Caprolactam from the rearrangement is polymerised into nylon-6.
SA2#chemistry-u13-23-q5@1,3: Explain rearrangement reactions and their driving forces. | Carbocations rearrange by 1,2-hydride or alkyl shifts to form more stable carbocations in SN1, E1 and addition reactions, so 3-methylbutan-2-ol with HBr gives mainly 2-bromo-2-methylbutane via a tertiary carbocation. Named rearrangements include the pinacol, turning 1,2-diols into ketones; the Beckmann, turning oximes into amides and used to make caprolactam for nylon-6; and the Claisen, turning allyl vinyl ethers into carbonyl compounds. Driving forces include more stable intermediates and strong C=O bonds. | Hydride shifts ; Alkyl shifts ; Pinacol ; Beckmann ; Driving forces

## Reaction selectivity
LV: Year 1 · Chemical reasoning
S: Selectivity describes which of several possible products forms. This lesson introduces kinetic and thermodynamic control and the types of selectivity.
O: Define chemoselectivity, regioselectivity and stereoselectivity
O: Distinguish kinetic and thermodynamic control
O: Explain how conditions affect selectivity
H: Types of selectivity
- **Chemoselectivity**: which functional group reacts.
- **Regioselectivity**: which position or orientation is favoured.
- **Stereoselectivity**: which stereoisomer forms.
- Selective reactions reduce waste and purification.
H: Kinetic versus thermodynamic control
- **Kinetic product** forms fastest, through the lowest barrier.
- **Thermodynamic product** is most stable.
- **Low temperatures** and short times favour kinetic control.
- **High temperatures** and long times favour thermodynamic control.
P: Adding HBr to buta-1,3-diene gives mainly the 1,2-product at low temperature (kinetic) and the 1,4-product at higher temperature (thermodynamic). Understanding selectivity lets chemists choose conditions for the desired product.
X: Kinetic and thermodynamic control.
> HBr adds to buta-1,3-diene, forming an allylic carbocation.
> At −80 °C, bromide attacks the nearest carbon: 1,2-product.
> At 40 °C, products equilibrate to the more stable 1,4-product.
> Temperature switches the outcome.
K: Selectivity can be chemo-, regio- or stereoselective; kinetic products form fastest and dominate at low temperatures, while thermodynamic products are most stable and dominate at higher temperatures and longer times.
!: Thinking the most stable product always forms. Under kinetic control the fastest-forming product dominates.
EV: established | Kinetic and thermodynamic control is shown by HBr addition to dienes (Anslyn and Dougherty, 2006).
T: Kinetic control | Product ratio set by relative rates
T: Thermodynamic control | Product ratio set by relative stabilities
T: Selectivity | Preference for one product over others
SUM: Chemo, regio, stereo.
SUM: Kinetic is fastest.
SUM: Thermodynamic is most stable.
SRC: Anslyn E. V. and Dougherty D. A., Modern Physical Organic Chemistry, University Science Books | secondary | 2006
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
Q: What is a kinetic product? | The product that forms fastest.
Q: What conditions favour thermodynamic control? | High temperature and long reaction times.
M1#chemistry-u13-24-q1@1: What does stereoselectivity describe? | Which stereoisomer forms preferentially | Which functional group reacts first | Which position on a chain reacts | How fast a reaction goes overall | Stereoselective reactions favour one spatial arrangement.
M2#chemistry-u13-24-q2@2: Why do low temperatures favour the kinetic product? | Products cannot easily reverse and equilibrate at low temperature | Low temperature makes all products equally stable | The thermodynamic product forms faster when cold | Low temperature stops all reactions | Without reversal, the fastest product accumulates.
MATCH1#chemistry-u13-24-q3@2: Match each type of selectivity to its question. | Chemoselectivity = Which group reacts ; Regioselectivity = Which position reacts ; Stereoselectivity = Which stereoisomer forms ; Thermodynamic control = Which product is most stable | Selectivity has several dimensions.
M3#chemistry-u13-24-q4@3: Why does HBr give the 1,4-product of buta-1,3-diene at 40 °C? | Products equilibrate and the more stable internal alkene dominates | The 1,4-product forms fastest at all temperatures | Bromide cannot attack carbon 2 | The 1,2-product is more stable | Thermodynamic control favours the more substituted alkene.
SA2#chemistry-u13-24-q5@1,3: Explain reaction selectivity and kinetic versus thermodynamic control. | Selectivity describes which product forms when several are possible: chemoselectivity is which functional group reacts, regioselectivity which position and stereoselectivity which stereoisomer. Kinetic products form fastest through the lowest barrier and dominate at low temperatures and short times, while thermodynamic products are most stable and dominate at high temperatures and long times, when products can equilibrate. HBr with buta-1,3-diene gives the 1,2-product at −80 °C and the 1,4-product at 40 °C. | Chemoselectivity ; Regioselectivity ; Stereoselectivity ; Kinetic control ; Thermodynamic control

## Chemoselectivity
LV: Year 1 · Chemical reasoning
S: Chemoselective reactions change one functional group while leaving others. This lesson explores strategies, including protecting groups.
O: Explain how reagent choice gives chemoselectivity
O: Describe the use of protecting groups
O: Plan chemoselective steps in synthesis
H: Reagent control
- Mild reagents react with the most reactive group only.
- NaBH₄ reduces aldehydes and ketones but not esters or acids.
- Hydrogen with Lindlar's catalyst reduces alkynes but not alkenes.
- Reactivity order of carbonyls: acyl chlorides > aldehydes > ketones > esters > amides.
H: Protecting groups
- A **protecting group** temporarily masks a reactive group.
- Ketones and aldehydes are protected as **acetals**.
- Alcohols are protected as **silyl ethers**; amines as **carbamates**.
- The group is **removed** after the other step is complete.
P: To reduce an ester with LiAlH₄ without touching a ketone in the same molecule, the ketone is first turned into an acetal, which LiAlH₄ ignores. After reduction, dilute acid removes the acetal. Protecting groups add steps, so chemists prefer selective reagents when available.
X: Using a protecting group.
> A molecule has a ketone and an ester.
> The ketone is protected as an acetal with ethane-1,2-diol.
> LiAlH₄ reduces the ester to an alcohol.
> Dilute acid removes the acetal, restoring the ketone.
K: Chemoselectivity comes from choosing reagents that react with only the most reactive group or from protecting groups such as acetals, silyl ethers and carbamates that temporarily mask a group before being removed.
!: Thinking protecting groups are always needed. A selective reagent is better when one exists.
EV: established | Protecting groups enable chemoselective synthesis of complex molecules (Wuts and Greene, 2006).
T: Chemoselectivity | Reaction of one functional group in preference to others
T: Protecting group | A temporary group that masks reactivity
T: Acetal | A protected form of an aldehyde or ketone
SUM: Choose mild reagents.
SUM: Protect, react, deprotect.
SUM: Fewer steps is better.
SRC: Wuts P. G. M. and Greene T. W., Greene's Protective Groups in Organic Synthesis, 4th edition, Wiley | secondary | 2006
SRC: Clayden J., Greeves N. and Warren S., Organic Chemistry, 2nd edition, Oxford University Press | secondary | 2012
Q: What is a protecting group? | A temporary group that masks a reactive functional group.
Q: How are ketones commonly protected? | As acetals.
M1#chemistry-u13-25-q1@1: Which carbonyl compound is most reactive towards nucleophiles? | An acyl chloride | An amide | An ester | A carboxylate ion | Chloride is a good leaving group and strongly withdraws electrons.
M2#chemistry-u13-25-q2@2: Why are protecting groups avoided when possible? | They add extra steps, lowering overall yield | They always destroy the molecule | They make every reaction faster | They cannot be removed | Each extra step costs time, material and yield.
SEQ1#chemistry-u13-25-q3@2: Put the protecting-group strategy in order. | Protect the ketone as an acetal ; Reduce the ester with LiAlH₄ ; Remove the acetal with dilute acid ; Isolate the hydroxy ketone | Protection allows the harsh step to leave the ketone intact.
M3#chemistry-u13-25-q4@3: Why does LiAlH₄ leave an acetal untouched? | Acetals have no electrophilic carbonyl carbon to attack | Acetals are more reactive than esters | LiAlH₄ only reduces acetals | Acetals are acids that destroy LiAlH₄ | Without C=O, hydride has no site to add to.
SA2#chemistry-u13-25-q5@1,3: Explain how chemists achieve chemoselectivity. | Chemoselectivity means one functional group reacts while others remain. Reagent choice can achieve it: NaBH₄ reduces aldehydes and ketones but not esters, and Lindlar's catalyst reduces alkynes but not alkenes, following reactivity orders such as acyl chlorides > aldehydes > ketones > esters > amides. Protecting groups temporarily mask groups: ketones as acetals, alcohols as silyl ethers and amines as carbamates. A ketone can be protected, an ester reduced with LiAlH₄ and the acetal removed by acid. Selective reagents are preferred because protection adds steps. | Reagent control ; Reactivity order ; Protecting groups ; Example ; Efficiency

## Regioselectivity
LV: Year 1 · Chemical reasoning
S: Regioselective reactions favour one position or orientation. This lesson brings together regioselectivity rules across reaction types.
O: Apply Markovnikov and anti-Markovnikov rules
O: Apply Zaitsev and Hofmann rules in eliminations
O: Predict regioselectivity in aromatic substitution
H: Additions
- **Markovnikov**: H adds to the carbon with more H, via the more stable carbocation.
- **Anti-Markovnikov**: HBr with peroxides adds by a radical route, putting Br on the less substituted carbon.
- **Hydroboration-oxidation** gives anti-Markovnikov alcohols.
- Regioselectivity follows the most stable intermediate.
H: Eliminations and arenes
- **Zaitsev**: more substituted alkene from small bases.
- **Hofmann**: less substituted alkene from bulky bases.
- In arenes, **activating** groups direct 2,4; **deactivating** groups direct 3.
- Halogens deactivate but direct 2,4.
P: The same reagents can give different regiochemistry by changing mechanism: HBr alone gives 2-bromopropane from propene, but HBr with peroxide gives 1-bromopropane. Regioselectivity rules all trace back to the stability of intermediates or steric access.
X: Peroxide effect.
> Peroxide forms Br• radicals from HBr.
> Br• adds to the end carbon of propene.
> This forms the more stable secondary radical.
> The radical takes H from HBr, giving 1-bromopropane.
K: Regioselectivity follows intermediate stability and steric access: Markovnikov and anti-Markovnikov additions, Zaitsev and Hofmann eliminations and ortho/para or meta direction in aromatic substitution.
!: Thinking Markovnikov's rule always applies to HBr. With peroxides, a radical mechanism reverses the outcome.
EV: established | The peroxide effect reverses HBr regioselectivity via a radical chain (Kharasch and Mayo, 1933).
T: Regioselectivity | Preference for one position of reaction
T: Anti-Markovnikov | Addition with H on the more substituted carbon
T: Hydroboration | Addition of B–H across a C=C bond
SUM: Markovnikov and anti.
SUM: Zaitsev and Hofmann.
SUM: Directing groups.
SRC: Kharasch M. S. and Mayo F. R., "The peroxide effect in the addition of reagents to unsaturated compounds", Journal of the American Chemical Society 55(6), 2468–2496 | primary | 1933
SRC: Brown H. C. and Subba Rao B. C., "A new technique for the conversion of olefins into organoboranes", Journal of the American Chemical Society 78(21), 5694–5695 | primary | 1956
Q: What product forms from propene and HBr with peroxides? | 1-bromopropane.
Q: Where do halogen substituents direct new groups on benzene? | To the 2- and 4-positions.
M1#chemistry-u13-26-q1@1: Which product forms from propene and HBr without peroxides? | 2-bromopropane | 1-bromopropane | 1,2-dibromopropane | Propan-1-ol | The more stable secondary carbocation leads to Br on carbon 2.
M2#chemistry-u13-26-q2@2: Why does hydroboration-oxidation give an anti-Markovnikov alcohol? | Boron adds to the less hindered carbon, and is then replaced by OH | Water adds via a carbocation | Boron always adds to the more substituted carbon | The alkene is oxidised to a ketone | Steric and electronic effects put boron on the end carbon.
MATCH1#chemistry-u13-26-q3@2: Match each reaction to its regioselectivity rule. | Propene with HBr = Markovnikov ; Propene with HBr and peroxide = Anti-Markovnikov ; Small base elimination = Zaitsev ; Bulky base elimination = Hofmann | Different mechanisms follow different rules.
M3#chemistry-u13-26-q4@3: Why do halogens deactivate a benzene ring yet direct to 2 and 4? | Inductive withdrawal slows reaction, but lone-pair donation stabilises 2,4 intermediates | Halogens donate electrons strongly through induction alone | Halogens have no lone pairs available for donation | Halogens make every ring position equally reactive | Competing inductive and resonance effects explain both.
SA2#chemistry-u13-26-q5@1,3: Explain regioselectivity across different reaction types. | In addition, Markovnikov's rule puts H on the carbon with more H via the more stable carbocation, so propene and HBr give 2-bromopropane; with peroxides, a radical mechanism gives 1-bromopropane, and hydroboration-oxidation gives anti-Markovnikov alcohols. In elimination, small bases give the more substituted Zaitsev alkene and bulky bases the Hofmann alkene. In aromatic substitution, activating groups direct to 2 and 4 and deactivating groups to 3, while halogens deactivate but direct to 2 and 4. | Markovnikov ; Anti-Markovnikov ; Zaitsev and Hofmann ; Aromatic directing ; Halogens

## Stereoselectivity
LV: Year 1 · Chemical reasoning
S: Stereoselective reactions favour one stereoisomer. This lesson distinguishes stereoselective and stereospecific reactions and introduces asymmetric synthesis.
O: Distinguish stereoselective and stereospecific reactions
O: Give examples of stereospecific mechanisms
O: Describe asymmetric catalysis
H: Definitions
- **Stereoselective**: one stereoisomer forms preferentially from a reactant.
- **Stereospecific**: different stereoisomers of reactant give different stereoisomers of product.
- SN2 (inversion) and E2 (anti-periplanar) are stereospecific.
- Bromine addition (anti) is stereospecific.
H: Asymmetric synthesis
- **Chiral catalysts** favour one enantiomer, measured by **ee**.
- **Chiral auxiliaries** are temporary chiral groups that guide reactions.
- **Enzymes** are highly stereoselective natural catalysts.
- The 2001 Nobel Prize honoured asymmetric hydrogenation and oxidation.
P: Knowles used a chiral rhodium catalyst to make L-DOPA, a Parkinson's disease medicine, as one enantiomer. Noyori and Sharpless developed further asymmetric catalysts. Making a single enantiomer avoids wasting half the product and reduces side effects.
X: Stereospecific E2.
> One diastereomer of a 1,2-dibromo compound undergoes E2.
> Anti-periplanar H and Br fix the geometry.
> One diastereomer gives the E alkene.
> The other diastereomer gives the Z alkene.
K: Stereoselective reactions favour one stereoisomer, while stereospecific reactions convert each reactant stereoisomer into a particular product stereoisomer, as SN2, E2 and anti addition do; asymmetric synthesis uses chiral catalysts, auxiliaries and enzymes to make single enantiomers.
!: Using stereoselective and stereospecific as synonyms. Stereospecific reactions depend on the reactant's stereochemistry.
EV: established | Asymmetric catalytic hydrogenation enabled industrial synthesis of single enantiomers (Knowles, 2002).
T: Stereoselective | Favouring one stereoisomer of product
T: Stereospecific | Product stereochemistry determined by reactant stereochemistry
T: Chiral auxiliary | A temporary chiral group that directs a reaction
SUM: Selective versus specific.
SUM: SN2, E2, anti addition.
SUM: Asymmetric catalysis.
SRC: Knowles W. S., "Asymmetric hydrogenations (Nobel lecture)", Angewandte Chemie International Edition 41(12), 1998–2007 | primary | 2002
SRC: Noyori R., "Asymmetric catalysis: science and opportunities (Nobel lecture)", Angewandte Chemie International Edition 41(12), 2008–2022 | primary | 2002
Q: What is a stereospecific reaction? | One where reactant stereochemistry determines product stereochemistry.
Q: Name a medicine made by asymmetric hydrogenation. | L-DOPA.
M1#chemistry-u13-27-q1@1: Which mechanism is stereospecific, giving inversion? | SN2 | SN1 | Free-radical substitution | E1 | Backside attack always inverts the reacting centre.
M2#chemistry-u13-27-q2@2: Why is making a single enantiomer valuable in medicine manufacture? | It avoids wasting half the product and reduces side effects | It always makes the drug cheaper to sell | Racemates are never active | Enantiomers always have the same effect | Only one enantiomer usually has the desired activity.
MATCH1#chemistry-u13-27-q3@3: Match each term to its example. | Stereospecific substitution = SN2 inversion ; Stereospecific elimination = Anti-periplanar E2 ; Asymmetric catalysis = Chiral rhodium hydrogenation ; Natural stereoselective catalyst = Enzyme | Stereocontrol appears in many reactions.
M3#chemistry-u13-27-q4@3: Why are enzymes highly stereoselective? | Their chiral active sites fit only one orientation of substrate | Enzymes contain no chiral centres at all | They react only with achiral substrate molecules | They always make racemic mixtures of products | A chiral pocket favours one transition state.
SA2#chemistry-u13-27-q5@1,3: Explain stereoselectivity and asymmetric synthesis. | A stereoselective reaction forms one stereoisomer preferentially, while a stereospecific reaction converts each reactant stereoisomer into a particular product stereoisomer. SN2 is stereospecific with inversion, E2 with anti-periplanar elimination giving E or Z from different diastereomers and bromine addition with anti addition. Asymmetric synthesis uses chiral catalysts, such as Knowles's rhodium catalyst for L-DOPA, chiral auxiliaries and enzymes to make single enantiomers, measured by ee, avoiding waste and side effects. | Stereoselective ; Stereospecific ; Examples ; Asymmetric catalysis ; Enzymes
`;
