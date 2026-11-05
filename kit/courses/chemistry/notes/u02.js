// School 2: Atomic Structure and Quantum Chemistry. Written to standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md):
// objectives, key terms, summaries, typed and dated sources, and questions at three levels in every lesson.
// Explanations are original; sources are those used and cited for checking, and are pending verification
// (qa.js records the review stages). Constants are CODATA 2018 values, rounded. Level: secondary to first-year
// undergraduate.
export default `
## Structure of the atom
S: An atom is a tiny, dense, positive nucleus surrounded by a much larger cloud of electrons. This lesson describes the nuclear atom, the evidence for it, and what holds it together.
O: Describe the nuclear model of the atom and its scale
O: Explain how the gold foil experiment revealed the nucleus
O: Explain what holds the nucleus together despite the repulsion between protons
PRE: Atomic theory
H: The nuclear atom
P: Almost all of an atom's mass is in its **nucleus**, made of protons and neutrons, about 10⁻¹⁵ to 10⁻¹⁴ m across. The electrons occupy a region about 10⁻¹⁰ m across (0.1 nm). The atom is therefore mostly empty space: if the nucleus were a marble, the atom would be the size of a football stadium.
H: The gold foil experiment
P: In 1909 Hans Geiger and Ernest Marsden, working with Ernest Rutherford, fired alpha particles at gold foil a few hundred atoms thick. Most passed straight through, but about 1 in 8000 bounced back at large angles. Thomson's "plum pudding" model, with positive charge spread through the atom, couldn't explain this. In 1911 Rutherford proposed that the positive charge and mass are concentrated in a tiny nucleus: only alpha particles passing very close to a nucleus are strongly deflected.
H: Holding the nucleus together
P: Protons repel each other electrically, very strongly at nuclear distances. The nucleus holds together because of the **strong nuclear force**, which attracts protons and neutrons to each other but acts only over about 10⁻¹⁵ m. Neutrons add attraction without adding repulsion, which is why heavier nuclei need more neutrons than protons to be stable.
P: Electrons are held in the atom by their electrical attraction to the nucleus. Chemistry, the making and breaking of bonds, involves only the electrons, which is why an element's chemistry is set by its electron arrangement while its nucleus stays unchanged in reactions.
K: An atom has a tiny, dense, positive nucleus holding nearly all its mass, surrounded by electrons in a space about 100 000 times wider; chemistry happens in the electrons.
!: Picturing electrons as tiny planets in fixed orbits close to the nucleus. Electrons occupy a large region around it, described by probabilities, as later lessons explain.
T: Nucleus | The tiny, dense, positively charged centre of an atom, containing protons and neutrons
T: Strong nuclear force | The short-range attraction between nucleons that holds the nucleus together
T: Nucleon | A proton or a neutron
SUM: The nucleus is about 10⁻¹⁵–10⁻¹⁴ m across; the atom about 10⁻¹⁰ m.
SUM: Large-angle alpha scattering revealed a small, dense, positive nucleus.
SUM: The strong nuclear force holds nucleons together; chemistry involves only the electrons.
SRC: OpenStax, Chemistry 2e, section 2.2 "Evolution of Atomic Theory" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/2-2-evolution-of-atomic-theory
SRC: Rutherford E., "The scattering of α and β particles by matter and the structure of the atom", Philosophical Magazine 21:669–688 | primary | 1911 | https://doi.org/10.1080/14786440508637080
Q: Why did most alpha particles pass straight through the gold foil? | The atom is mostly empty space; the nucleus is tiny, so most particles never come close to one.
Q: What holds protons together in the nucleus? | The strong nuclear force, which is attractive and much stronger than electrical repulsion at very short range.
NUM2: An atom is about 1.0 × 10⁻¹⁰ m across and its nucleus about 1.0 × 10⁻¹⁵ m. How many times wider is the atom than the nucleus? | 100000 | 1 |  | 1.0 × 10⁻¹⁰ ÷ 1.0 × 10⁻¹⁵ = 1 × 10⁵.
M1: What did the large-angle deflection of a few alpha particles show? | Positive charge and mass are concentrated in a tiny nucleus | Electrons are in fixed orbits | Atoms are solid spheres | Neutrons exist | Only a small, dense, positive centre could turn back a fast alpha particle; most of the atom must be empty.
M2: Why do heavy stable nuclei such as lead-208 have more neutrons (126) than protons (82)? | Extra neutrons add strong-force attraction without adding electrical repulsion | Neutrons are needed to attract electrons | Protons are heavier than neutrons | Neutrons repel protons | As nuclei get bigger, proton–proton repulsion grows; additional neutrons provide binding without charge.
M3: If Thomson's plum pudding model had been correct, what would Geiger and Marsden have seen? | Almost all alpha particles passing through with only small deflections | Many particles bouncing straight back | No particles passing through | Particles absorbed by electrons | Spread-out positive charge produces only weak forces, so no large deflections; the backscattering was the surprise.
TF1: Atoms are mostly empty space. | true | The nucleus has a radius about 100 000 times smaller than the atom.

## Protons, neutrons and electrons
S: Atoms are built from three particles with very different masses and charges. Knowing their properties lets you work out the make-up of any atom or ion from its symbol.
O: State the relative mass and charge of protons, neutrons and electrons
O: Work out the numbers of each particle in atoms and ions
O: Explain how ions form by gaining or losing electrons
PRE: Structure of the atom
H: The three particles
- **Proton**: in the nucleus, relative mass 1, relative charge +1 (1.673 × 10⁻²⁷ kg; +1.602 × 10⁻¹⁹ C).
- **Neutron**: in the nucleus, relative mass 1, charge 0 (1.675 × 10⁻²⁷ kg).
- **Electron**: around the nucleus, relative mass about 1/1836, relative charge −1.
P: The proton and electron charges are equal and opposite, so an atom with equal numbers of each is neutral.
IX: atom-builder
H: Counting particles
P: The **atomic number** Z is the number of protons, which defines the element. The **mass number** A is the number of protons plus neutrons. So neutrons = A − Z. In a neutral atom, electrons = Z.
X: How many protons, neutrons and electrons are in an atom of iron-56 (Z = 26)?
> Protons = 26; electrons = 26 in the neutral atom.
> Neutrons = 56 − 26 = 30.
H: Ions
P: An **ion** forms when an atom gains or loses electrons; the nucleus doesn't change. A **cation** has lost electrons (positive), an **anion** has gained them (negative). Fe³⁺ has 26 protons and 23 electrons; O²⁻ has 8 protons and 10 electrons.
P: The electron's tiny mass means an ion's mass is almost the same as its atom's, but its size changes a lot: losing electrons makes a cation smaller, gaining them makes an anion bigger.
K: Protons (+1) and neutrons (0) have mass about 1 and sit in the nucleus; electrons (−1) are about 1/1836 of that mass; ions differ from atoms only in their electrons.
!: Changing the number of protons to make an ion. Ions form by electron transfer; changing the protons would make a different element.
T: Atomic number | The number of protons in the nucleus of an atom (Z)
T: Mass number | The total number of protons and neutrons in the nucleus (A)
T: Ion | An atom or group of atoms with an overall charge from gaining or losing electrons
SUM: Protons and neutrons have relative mass 1; the electron about 1/1836.
SUM: Neutrons = A − Z; electrons = Z in a neutral atom.
SUM: Cations have lost electrons and anions have gained them.
SRC: OpenStax, Chemistry 2e, section 2.3 "Atomic Structure and Symbolism" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/2-3-atomic-structure-and-symbolism
SRC: NIST, CODATA recommended values of the fundamental physical constants (2018) | standard | 2019 | https://physics.nist.gov/cuu/Constants/
Q: How many electrons does Mg²⁺ have (Z = 12)? | 10: it has lost two of its 12 electrons.
Q: What are the relative charges of the proton, neutron and electron? | +1, 0 and −1.
NUM1: How many neutrons are in an atom of uranium-238 (Z = 92)? | 146 | 0 |  | Neutrons = A − Z = 238 − 92 = 146.
M1: Which particle has the smallest mass? | Electron | Proton | Neutron | Alpha particle | The electron's mass is about 1/1836 of a proton's.
M2: A particle has 17 protons, 18 neutrons and 18 electrons. What is it? | A chloride ion, ³⁵Cl⁻ | An argon atom | A chlorine atom | A potassium ion | 17 protons make it chlorine; mass number 35; one extra electron gives a 1− charge.
M3: Why is the radius of Na⁺ (about 102 pm) much smaller than that of a sodium atom (about 186 pm)? | Losing the single outer electron removes the outermost shell, and the remaining electrons are pulled in more strongly by the same nuclear charge | The nucleus shrinks when an electron leaves | Na⁺ has fewer protons | Na⁺ gains neutrons | The cation keeps 11 protons but has only 10 electrons, all in inner shells, so it is much smaller.
TF2: An ion with more protons than electrons is negatively charged. | false | More protons than electrons gives a positive charge: it is a cation.

## Isotopes
S: Isotopes are atoms of the same element with different numbers of neutrons. They behave the same way chemically but differ in mass, which is why relative atomic masses are averages and why some isotopes are radioactive.
O: Define isotopes and write isotope symbols
O: Explain why isotopes have the same chemical properties
O: Calculate relative atomic mass from isotopic abundances
PRE: Protons, neutrons and electrons
H: Same element, different mass
P: All atoms of an element have the same number of protons, but the number of neutrons can vary. Chlorine has two stable isotopes: chlorine-35 (17 protons, 18 neutrons) and chlorine-37 (17 protons, 20 neutrons). Their symbols are ³⁵₁₇Cl and ³⁷₁₇Cl, with the mass number at top left and the atomic number at bottom left.
H: Same chemistry
P: Chemical reactions involve electrons, and isotopes of an element have the same number and arrangement of electrons, so they react in the same way. Their **physical** properties that depend on mass differ slightly: heavy water, D₂O, is about 11% denser than H₂O and boils at 101.4 °C.
H: Relative atomic mass
P: An element's relative atomic mass Ar is the weighted mean mass of its atoms, relative to one-twelfth of the mass of a carbon-12 atom. Mass spectrometry measures the abundance of each isotope.
X: Chlorine is 75.8% chlorine-35 and 24.2% chlorine-37. Calculate Ar (use 35.0 and 37.0 as isotope masses).
> Ar = (75.8 × 35.0 + 24.2 × 37.0) ÷ 100.
> = (2653 + 895.4) ÷ 100 = 35.5.
IX: mass-spec
P: Some isotopes have unstable nuclei and are **radioactive**. Carbon-14, made in the atmosphere, decays with a half-life of about 5730 years, which allows radiocarbon dating; technetium-99m is used in medical imaging.
K: Isotopes have the same number of protons and electrons but different numbers of neutrons, so they react alike but differ in mass.
!: Saying isotopes are different elements. They are the same element, because the number of protons is the same.
T: Isotope | An atom of an element with a different number of neutrons from other atoms of that element
T: Relative atomic mass | The weighted mean mass of an element's atoms compared with one-twelfth of the mass of a carbon-12 atom
T: Half-life | The time for half the nuclei of a radioactive isotope in a sample to decay
SUM: Isotopes differ only in neutron number.
SUM: They have the same chemistry because their electrons are the same.
SUM: Ar is the abundance-weighted mean of isotope masses.
SRC: OpenStax, Chemistry 2e, section 2.3 "Atomic Structure and Symbolism" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/2-3-atomic-structure-and-symbolism
SRC: IUPAC Commission on Isotopic Abundances and Atomic Weights, Isotopic compositions of the elements | standard | 2021 | https://www.ciaaw.org/
Q: Why do isotopes of an element have the same chemical properties? | They have the same number and arrangement of electrons, which decide chemical behaviour.
Q: How many neutrons are in carbon-14? | 8 (14 − 6).
NUM2: Boron is 19.9% boron-10 and 80.1% boron-11. Calculate its relative atomic mass to one decimal place (use 10.0 and 11.0). | 10.8 | 0.05 |  | (19.9 × 10.0 + 80.1 × 11.0) ÷ 100 = (199 + 881.1) ÷ 100 = 10.8.
M1: What do isotopes of the same element have in common? | The same number of protons | The same number of neutrons | The same mass number | The same mass | Isotopes share the atomic number (protons) but differ in neutrons, and so in mass.
M2: A sample of copper's relative atomic mass is 63.5, and its isotopes are copper-63 and copper-65. Which is more abundant? | Copper-63, because 63.5 is closer to 63 than to 65 | Copper-65 | They are equally abundant | It can't be told without more data | A weighted mean lies nearer the more abundant isotope; 63.5 implies about 75% copper-63.
M3: Heavy water (D₂O) can be separated from ordinary water by repeated electrolysis, but no ordinary chemical reaction separates them cleanly. Why? | Their chemistry is the same, but the small mass difference slightly changes rates, which repeated processing exploits | D₂O is a different compound with different bonds | Deuterium has a different number of protons | D₂O doesn't react at all | Isotopes react the same way, but mass affects reaction rates a little (the kinetic isotope effect), enough for gradual enrichment.
TF1: Chlorine-35 and chlorine-37 have different numbers of electrons. | false | Both have 17 electrons; they differ only in neutrons (18 and 20).

## Atomic number and mass number
S: Two numbers identify any nucleus: the atomic number, which fixes the element, and the mass number, which identifies the isotope. Together they appear in nuclide notation and in nuclear equations.
O: Use nuclide notation correctly
O: Explain why the atomic number defines an element and its place in the periodic table
O: Balance simple nuclear equations using atomic and mass numbers
PRE: Isotopes
H: The two numbers
P: The **atomic number** Z counts protons. It defines the element: every atom with 6 protons is carbon. Since 1913, when Henry Moseley showed that X-ray frequencies increase steadily with Z, the periodic table has been ordered by atomic number rather than by mass. The **mass number** A counts protons plus neutrons and identifies the isotope.
H: Mass number is not relative atomic mass
P: Mass number is a whole-number count for one nucleus. Relative atomic mass is an average over an element's isotopes and is usually not a whole number (chlorine 35.45). Even an individual isotope's mass isn't exactly its mass number: chlorine-35 has a mass of 34.969, because of the binding energy of the nucleus (and carbon-12 is exactly 12 by definition).
H: Nuclear equations
P: In nuclear reactions the nucleus changes, so the element can change, but both the total mass number and the total atomic number are conserved.
- **Alpha decay** emits ⁴₂He: A falls by 4 and Z by 2. ²³⁸₉₂U → ²³⁴₉₀Th + ⁴₂He.
- **Beta-minus decay** turns a neutron into a proton and emits an electron, ⁰₋₁e: A stays the same and Z rises by 1. ¹⁴₆C → ¹⁴₇N + ⁰₋₁e.
X: Radium-226 (Z = 88) undergoes alpha decay. What is the product?
> Mass number: 226 − 4 = 222. Atomic number: 88 − 2 = 86, which is radon.
> The product is radon-222: ²²⁶₈₈Ra → ²²²₈₆Rn + ⁴₂He.
K: The atomic number defines the element and orders the periodic table; the mass number identifies the isotope; both are conserved in nuclear equations.
!: Using relative atomic mass as the mass number. Mass number is always a whole number for one nucleus.
T: Nuclide | An atom with a specific number of protons and neutrons, written with its mass and atomic numbers
T: Alpha decay | Radioactive decay emitting a helium-4 nucleus, lowering A by 4 and Z by 2
T: Beta decay | Radioactive decay in which a neutron changes into a proton and an electron is emitted
SUM: Z (protons) defines the element; A (protons + neutrons) identifies the isotope.
SUM: Moseley showed the periodic table is ordered by atomic number.
SUM: A and Z are both conserved in nuclear equations.
SRC: OpenStax, Chemistry 2e, section 21.3 "Radioactive Decay" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/21-3-radioactive-decay
SRC: Moseley H.G.J., "The high-frequency spectra of the elements", Philosophical Magazine 26:1024–1034 | primary | 1913 | https://doi.org/10.1080/14786441308635052
Q: What does the atomic number tell you? | The number of protons, which defines the element and its place in the periodic table.
Q: What happens to A and Z in beta-minus decay? | A stays the same and Z increases by 1.
M1: Which number is conserved in a chemical reaction but can change in a nuclear reaction? | The atomic number of each atom | The total charge | The number of electrons in the universe | The mass number total | In chemistry nuclei are unchanged; in nuclear reactions atoms can become different elements, although the totals of A and Z are conserved.
M2: Thorium-234 (Z = 90) undergoes beta-minus decay. What is formed? | Protactinium-234 (Z = 91) | Thorium-230 | Radium-230 | Uranium-238 | Beta-minus decay keeps A = 234 and raises Z to 91, which is protactinium.
M3: Why did Moseley's work resolve the puzzle of argon (Ar 39.9) being placed before potassium (Ar 39.1) in the periodic table? | It showed the order depends on atomic number (Ar 18, K 19), not on mass | It showed argon is heavier than potassium | It showed potassium is a noble gas | It showed atomic masses were measured wrongly | Ordering by Z puts argon before potassium, matching their chemistry, even though argon's average mass is greater.
NUM2: Uranium-238 (Z = 92) emits an alpha particle. What is the mass number of the product? | 234 | 0 |  | Alpha decay removes 4 from the mass number: 238 − 4 = 234 (the product is thorium-234).

## Electron shells
S: Electrons in atoms occupy shells at increasing distances and energies from the nucleus. The shell model explains the patterns of the periodic table and why atoms of some elements react in similar ways.
O: Describe electrons as arranged in shells of increasing energy
O: State the maximum number of electrons each shell can hold
O: Link the number of outer electrons to an element's group and reactivity
PRE: Protons, neutrons and electrons
H: Shells of energy
P: The electrons in an atom are in **shells** (energy levels), numbered n = 1, 2, 3… outwards. Electrons in shells further out are, on average, further from the nucleus, higher in energy and less tightly held. Electrons fill the lowest available energy levels first.
H: How many in each shell
P: The maximum number of electrons in shell n is **2n²**: 2 in the first, 8 in the second, 18 in the third and 32 in the fourth. For the first 20 elements a simple pattern works: 2, 8, 8, then the fourth shell begins. Sodium is 2,8,1 and calcium 2,8,8,2. Beyond calcium the third shell fills up to 18, which the next lessons explain with subshells.
H: Outer electrons and chemistry
P: The electrons in the outermost shell (the **valence electrons**) take part in bonding. Elements with the same number of outer electrons are in the same group and react similarly: lithium (2,1), sodium (2,8,1) and potassium (2,8,8,1) each have one outer electron that they lose easily. Noble gases have full outer shells (helium 2, neon 2,8, argon 2,8,8) and are very unreactive.
P: Evidence for shells comes from ionisation energies: removing electrons one at a time shows big jumps each time a new, inner shell is reached.
K: Electrons fill shells of increasing energy, each holding up to 2n² electrons; the number of outer electrons decides an element's group and much of its chemistry.
!: Saying the third shell can only hold 8 electrons. It holds up to 18; the 2,8,8 pattern only describes the first 20 elements.
T: Electron shell | A group of electron energy levels with the same principal quantum number n
T: Valence electrons | The electrons in an atom's outermost shell, involved in bonding
T: Electron arrangement | The numbers of electrons in each shell, such as 2,8,1 for sodium
SUM: Shells increase in energy and distance with n.
SUM: Shell n can hold 2n² electrons.
SUM: Outer electrons decide group and reactivity; full outer shells are stable.
SRC: OpenStax, Chemistry 2e, section 6.4 "Electronic Structure of Atoms (Electron Configurations)" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/6-4-electronic-structure-of-atoms-electron-configurations
Q: What is the maximum number of electrons in the third shell? | 18 (2n² with n = 3).
Q: Write the electron arrangement of aluminium (Z = 13). | 2,8,3.
M1: Which electron arrangement belongs to a noble gas? | 2,8,8 | 2,8,1 | 2,8,7 | 2,8,2 | Argon, 2,8,8, has a full outer shell; the others are sodium, chlorine and magnesium.
M2: An element has the arrangement 2,8,6. Which group is it in and how does it typically react? | Group 16; it gains two electrons to form a 2− ion | Group 6; it loses six electrons | Group 2; it loses two electrons | Group 8; it is unreactive | Six outer electrons puts sulfur in group 16; gaining two completes its outer shell.
M3: Potassium is more reactive than sodium, though both have one outer electron. Why? | Potassium's outer electron is in a shell further from the nucleus and more shielded, so it is lost more easily | Potassium has fewer protons | Sodium's outer shell is full | Potassium has more outer electrons | The outer electron in shell 4 is further out and shielded by more inner electrons, so less energy is needed to remove it.
NUM1: Using 2n², how many electrons can the fourth shell hold? | 32 | 0 |  | 2 × 4² = 2 × 16 = 32, from the 4s, 4p, 4d and 4f subshells (2 + 6 + 10 + 14).

## Atomic orbitals
S: Within each shell, electrons occupy orbitals: regions where an electron is likely to be found. Orbitals come in types called s, p, d and f, grouped into subshells, and each orbital holds at most two electrons.
O: Define an atomic orbital
O: Describe the s, p, d and f subshells and how many orbitals each contains
O: List the subshells present in each of the first four shells
PRE: Electron shells
H: What an orbital is
P: Quantum mechanics shows that an electron in an atom doesn't follow a path. An **orbital** is a region of space around the nucleus where an electron with a particular energy is likely to be found, usually drawn as the surface enclosing 90% of the probability. Each orbital holds a maximum of **two electrons**, with opposite spins.
H: Subshells
- **s subshell**: 1 orbital, up to 2 electrons.
- **p subshell**: 3 orbitals, up to 6 electrons.
- **d subshell**: 5 orbitals, up to 10 electrons.
- **f subshell**: 7 orbitals, up to 14 electrons.
P: Shell 1 has only 1s; shell 2 has 2s and 2p; shell 3 has 3s, 3p and 3d; shell 4 has 4s, 4p, 4d and 4f. This gives the 2n² totals: shell 3 holds 2 + 6 + 10 = 18.
H: Orbitals and the periodic table
P: The periodic table's blocks match the subshell being filled: the s-block (groups 1 and 2) fills s orbitals, the p-block (groups 13 to 18) p orbitals, the d-block (transition metals) d orbitals, and the f-block (lanthanides and actinides) f orbitals. The width of each block, 2, 6, 10 and 14 columns, is the capacity of its subshell.
P: Within a subshell, orbitals of the same type in an isolated atom have the same energy (they are **degenerate**): the three 2p orbitals are equal in energy, differing only in orientation.
K: An orbital is a region where an electron is likely to be found and holds up to two electrons; s, p, d and f subshells have 1, 3, 5 and 7 orbitals.
!: Using "orbit" and "orbital" interchangeably. An orbit is a definite path, which electrons don't follow; an orbital is a probability region.
T: Atomic orbital | A region around the nucleus where there is a high probability of finding an electron of a particular energy
T: Subshell | A set of orbitals of the same type (s, p, d or f) within a shell
T: Degenerate orbitals | Orbitals that have the same energy
SUM: Orbitals are probability regions holding at most two electrons.
SUM: s, p, d and f subshells contain 1, 3, 5 and 7 orbitals.
SUM: The periodic table's blocks correspond to the subshell being filled.
SRC: OpenStax, Chemistry 2e, section 6.3 "Development of Quantum Theory" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/6-3-development-of-quantum-theory
Q: How many orbitals are in a d subshell, and how many electrons can it hold? | 5 orbitals, holding up to 10 electrons.
Q: Which subshells are in the third shell? | 3s, 3p and 3d.
MATCH1: Match each subshell to the number of electrons it can hold. | s = 2 ; p = 6 ; d = 10 ; f = 14 | Each orbital holds two electrons, and the subshells have 1, 3, 5 and 7 orbitals.
M1: What is the maximum number of electrons in any one orbital? | 2 | 1 | 6 | 8 | Each orbital holds at most two electrons, which must have opposite spins.
M2: Why is the d-block of the periodic table ten columns wide? | A d subshell has five orbitals, holding ten electrons | There are ten d-block elements in total | d orbitals hold one electron each | Transition metals have ten outer electrons | The block width equals the subshell capacity: 5 orbitals × 2 electrons.
M3: Why doesn't the second shell contain a d subshell? | For n = 2, the allowed orbital types are only s and p | d orbitals are too high in energy to exist | The second shell is already full with 2 electrons | d subshells only exist in transition metals | Quantum theory allows subshell types up to l = n − 1, so shell 2 has only s (l = 0) and p (l = 1).

## Quantum numbers
S: Four quantum numbers describe each electron in an atom: which shell, which type of orbital, which orientation and which spin. They explain why shells and subshells hold the numbers of electrons they do.
O: Name and describe the four quantum numbers
O: State the allowed values of each and relate them to shells, subshells and orbitals
O: Use quantum numbers to count the orbitals and electrons in a shell
PRE: Atomic orbitals
H: The four quantum numbers
- **Principal quantum number, n** = 1, 2, 3…: the shell, and mainly the orbital's size and energy.
- **Angular momentum (azimuthal) quantum number, l** = 0 to n − 1: the subshell and the orbital's shape. l = 0, 1, 2, 3 are s, p, d, f.
- **Magnetic quantum number, mₗ** = −l to +l: the orbital's orientation, giving 2l + 1 orbitals in each subshell.
- **Spin quantum number, mₛ** = +½ or −½: the electron's spin.
P: The first three come from solving the Schrödinger equation for the electron; spin was added after experiments such as Stern and Gerlach's (1922) showed electrons behave like tiny magnets with two possible orientations.
H: Counting with quantum numbers
X: How many orbitals and electrons are in the n = 3 shell?
> l can be 0, 1 or 2 (3s, 3p, 3d).
> mₗ gives 1, 3 and 5 orbitals: 9 orbitals in total, which is n².
> Two spins per orbital: 18 electrons, which is 2n².
H: Labelling an electron
P: The outer electron of a sodium atom is in a 3s orbital: n = 3, l = 0, mₗ = 0, mₛ = +½ (or −½). A 2p electron has n = 2, l = 1 and mₗ = −1, 0 or +1. No two electrons in an atom can share all four values, the Pauli exclusion principle.
P: For hydrogen, the energy depends only on n. In atoms with more electrons it also depends on l, because electrons in different subshells are shielded differently, which is why 4s fills before 3d.
K: n gives the shell, l the subshell shape, mₗ the orientation and mₛ the spin; their allowed values give n² orbitals and 2n² electrons per shell.
!: Thinking l can equal n. The largest value of l in shell n is n − 1, so there is no 1p or 2d orbital.
T: Principal quantum number | n, the quantum number for an orbital's shell, size and main energy
T: Angular momentum quantum number | l, the quantum number for an orbital's shape (s, p, d, f for l = 0, 1, 2, 3)
T: Magnetic quantum number | mₗ, the quantum number for an orbital's orientation, from −l to +l
SUM: Four quantum numbers: n, l, mₗ and mₛ.
SUM: l runs from 0 to n − 1 and mₗ from −l to +l.
SUM: Each shell has n² orbitals and holds 2n² electrons.
SRC: OpenStax, Chemistry 2e, section 6.3 "Development of Quantum Theory" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/6-3-development-of-quantum-theory
SRC: IUPAC, Compendium of Chemical Terminology (the Gold Book), "quantum number" | standard | 2019 | https://goldbook.iupac.org/
Q: What are the allowed values of l when n = 3? | 0, 1 and 2.
Q: Which quantum number describes an orbital's orientation? | The magnetic quantum number, mₗ.
NUM2: How many orbitals are there in the n = 4 shell? | 16 | 0 |  | The number of orbitals in shell n is n² = 4² = 16 (4s, three 4p, five 4d and seven 4f).
M1: Which set of quantum numbers is not allowed? | n = 2, l = 2, mₗ = 0 | n = 2, l = 1, mₗ = −1 | n = 3, l = 0, mₗ = 0 | n = 3, l = 2, mₗ = +2 | l must be less than n, so l = 2 isn't allowed in the second shell.
M2: An electron has n = 3 and l = 1. Which orbital is it in? | A 3p orbital | A 3s orbital | A 3d orbital | A 1p orbital | l = 1 is a p orbital, and n = 3 places it in the third shell.
M3: Why does each orbital hold at most two electrons? | Electrons in the same orbital share n, l and mₗ, so they can differ only in spin, which has two values | Orbitals are too small for three electrons | Three electrons would have no charge | The nucleus attracts only two electrons per orbital | With three quantum numbers fixed by the orbital, the Pauli principle allows only the two spin states.
TF1: A 2d orbital exists. | false | In the second shell l can only be 0 or 1, so there are 2s and 2p orbitals but no 2d.

## Electron configurations
S: An electron configuration lists the subshells an atom's electrons occupy and how many are in each, such as 1s² 2s² 2p⁶ 3s¹ for sodium. Configurations explain the periodic table and the charges of common ions.
O: Write full and abbreviated electron configurations for elements up to krypton
O: Write configurations for ions, including transition metal ions
O: Identify the exceptional configurations of chromium and copper
PRE: Quantum numbers
H: Writing configurations
P: Subshells are listed in order of filling, with the number of electrons as a superscript. The order up to krypton is 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p. Chlorine (17 electrons) is 1s² 2s² 2p⁶ 3s² 3p⁵. The abbreviated form starts from the previous noble gas: [Ne] 3s² 3p⁵.
IX: electron-config
X: Write the electron configuration of iron (Z = 26).
> Fill in order: 1s² 2s² 2p⁶ 3s² 3p⁶ (18 electrons), then 4s² (20), then 3d⁶ (26).
> Iron: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s², or [Ar] 3d⁶ 4s².
H: Ions
P: For main-group ions, add or remove electrons from the outermost subshell: Na⁺ is 1s² 2s² 2p⁶ and Cl⁻ is [Ne] 3s² 3p⁶, both with noble gas configurations. For transition metals, the **4s electrons are removed before the 3d**: Fe²⁺ is [Ar] 3d⁶ and Fe³⁺ is [Ar] 3d⁵. 4s fills first, but once 3d is occupied the 4s electrons are the outermost and highest in energy.
H: Chromium and copper
P: Two elements in the first transition series break the filling pattern. Chromium is [Ar] 3d⁵ 4s¹, not 3d⁴ 4s², and copper is [Ar] 3d¹⁰ 4s¹, not 3d⁹ 4s². The 4s and 3d energies are very close, and a half-filled or filled d subshell, with its reduced electron repulsion, gives the lower overall energy.
P: Configurations explain the periodic table: elements in a group share the same outer configuration, such as ns¹ for the alkali metals and ns² np⁵ for the halogens.
K: Configurations list subshells in filling order (1s 2s 2p 3s 3p 4s 3d 4p); transition metals lose 4s electrons first, and Cr and Cu are exceptions.
!: Removing 3d electrons first when forming a transition metal ion. The 4s electrons are lost first: Fe²⁺ is [Ar] 3d⁶, not [Ar] 3d⁴ 4s².
T: Electron configuration | The arrangement of an atom's electrons in subshells, written as 1s² 2s² and so on
T: Noble gas core | The abbreviation [He], [Ne], [Ar]… for the inner electrons matching the previous noble gas
T: Valence configuration | The configuration of the outer electrons, such as 3s² 3p⁵ for chlorine
SUM: Fill 1s 2s 2p 3s 3p 4s 3d 4p in order, writing the number in each.
SUM: Abbreviate with a noble gas core; main-group ions often reach noble gas configurations.
SUM: Transition metals lose 4s before 3d; Cr is 3d⁵ 4s¹ and Cu 3d¹⁰ 4s¹.
SRC: OpenStax, Chemistry 2e, section 6.4 "Electronic Structure of Atoms (Electron Configurations)" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/6-4-electronic-structure-of-atoms-electron-configurations
Q: Write the electron configuration of potassium (Z = 19). | 1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹, or [Ar] 4s¹.
Q: What is the configuration of Cu²⁺? | [Ar] 3d⁹: copper ([Ar] 3d¹⁰ 4s¹) loses its 4s electron and one 3d electron.
M1: Which is the electron configuration of oxygen (Z = 8)? | 1s² 2s² 2p⁴ | 1s² 2s² 2p⁶ | 1s² 2s⁴ 2p² | 1s² 2p⁶ | Oxygen has 8 electrons: 2 in 1s, 2 in 2s and 4 in 2p.
M2: What is the electron configuration of Fe³⁺? | [Ar] 3d⁵ | [Ar] 3d³ 4s² | [Ar] 3d⁶ 4s² | [Ar] 4s² 3d³ | Iron [Ar] 3d⁶ 4s² loses its two 4s electrons and then one 3d electron.
M3: Why is chromium's configuration [Ar] 3d⁵ 4s¹ rather than [Ar] 3d⁴ 4s²? | The 3d and 4s energies are so close that a half-filled 3d subshell, with less electron repulsion, gives a lower total energy | 4s orbitals can hold only one electron in chromium | Chromium has 23 electrons | The 3d subshell must always fill before 4s | Small energy differences let the more stable half-filled arrangement win; copper's full 3d¹⁰ is the similar case.
SEQ1: Put these subshells in the order they fill. | 3p ; 4s ; 3d ; 4p | The usual filling order is 3s, 3p, 4s, 3d, 4p.

## Aufbau principle
S: The aufbau ("building up") principle says electrons fill the lowest-energy orbitals available first. Applying it, with the right energy order of subshells, predicts the configurations of almost every element.
O: State the aufbau principle
O: Use the n + l rule to predict the order in which subshells fill
O: Explain why 4s fills before 3d
PRE: Electron configurations
H: Building up
P: Imagine building each atom by adding electrons one at a time to a nucleus. The **aufbau principle** says each new electron goes into the lowest-energy orbital available, as long as the Pauli principle allows. Combined with Hund's rule for orbitals of equal energy, this gives the ground-state configuration of an atom, its lowest-energy arrangement.
H: The order of filling
P: In many-electron atoms, subshell energy depends on n and l. A useful guide is the **n + l rule** (Madelung rule): subshells fill in order of increasing n + l, and for equal n + l, the one with lower n fills first. This gives 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f, 6d, 7p, matching the layout of the periodic table read row by row.
X: Use the n + l rule to decide whether 4s or 3d fills first.
> 4s: n + l = 4 + 0 = 4. 3d: n + l = 3 + 2 = 5.
> The lower value, 4s, fills first.
H: Why 4s before 3d
P: A 4s electron spends part of its time very close to the nucleus (it **penetrates** the inner shells), so it is less shielded and feels a higher effective nuclear charge than a 3d electron, whose orbital lies mostly outside the 3s and 3p electrons' region but doesn't penetrate to the nucleus as much. For potassium and calcium this puts 4s below 3d in energy. Once electrons occupy 3d, the energies shift, which is why transition metal atoms lose their 4s electrons first.
P: The rule is a guide, not a law: there are about twenty exceptions among the transition metals, lanthanides and actinides, such as chromium, copper, silver and gold.
K: Electrons occupy the lowest-energy available orbitals; subshells fill in order of n + l, which puts 4s before 3d.
!: Thinking 4s is always lower in energy than 3d. It is lower in potassium and calcium, but once 3d orbitals are occupied, 4s electrons are the first to be removed.
T: Aufbau principle | Electrons fill the lowest-energy orbitals available first
T: Ground state | The lowest-energy arrangement of an atom's electrons
T: Penetration | The extent to which an electron in an orbital spends time close to the nucleus, inside inner electrons
SUM: Electrons fill the lowest available energy orbitals first.
SUM: Subshells fill in order of n + l, lower n first when tied.
SUM: Penetration puts 4s below 3d for potassium and calcium; there are exceptions such as Cr and Cu.
SRC: OpenStax, Chemistry 2e, section 6.4 "Electronic Structure of Atoms (Electron Configurations)" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/6-4-electronic-structure-of-atoms-electron-configurations
SRC: Scerri E.R., "The trouble with the aufbau principle", Education in Chemistry 50(6):24–26 | secondary | 2013 | https://edu.rsc.org/feature/the-trouble-with-the-aufbau-principle/2000133.article
Q: State the aufbau principle. | Electrons occupy the lowest-energy orbitals available first.
Q: Using n + l, which fills first: 5s or 4d? | 5s (n + l = 5) before 4d (n + l = 6).
M1: Which subshell fills immediately after 3p? | 4s | 3d | 4p | 4d | By the n + l rule, 4s (4) comes before 3d (5).
M2: Using the n + l rule, which fills first, 4f or 5d? | 4f, because both have n + l = 7 and 4f has the lower n | 5d, because d always fills before f | They fill at the same time | 5d, because it has the higher n | For equal n + l, the subshell with lower n fills first.
M3: Why does a 4s electron in potassium have lower energy than a 3d electron would? | The 4s orbital penetrates closer to the nucleus, so the electron is less shielded and more strongly attracted | 4s orbitals are smaller than 3d orbitals overall | 3d orbitals don't exist in potassium | 4s has a lower principal quantum number | Penetration gives the 4s electron a higher effective nuclear charge despite its higher n.
TF2: The aufbau principle predicts the configuration of every element correctly. | false | There are exceptions, such as chromium, copper, silver and gold.

## Pauli exclusion principle
S: The Pauli exclusion principle says no two electrons in an atom can have the same four quantum numbers. It is the reason orbitals hold only two electrons, and ultimately why atoms have structure and matter takes up space.
O: State the Pauli exclusion principle
O: Use it to explain why an orbital holds at most two electrons with opposite spins
O: Draw orbital box diagrams that obey it
PRE: Quantum numbers
H: The principle
P: Wolfgang Pauli proposed in 1925 that **no two electrons in an atom can have the same set of four quantum numbers**. Two electrons in the same orbital share n, l and mₗ, so they must differ in spin: one +½ and one −½. A third electron would have to repeat a set, so it can't enter that orbital.
H: Orbital box diagrams
P: In box diagrams each orbital is a box and each electron an arrow: up for +½, down for −½. Two electrons in a box must point opposite ways (paired). Nitrogen, 1s² 2s² 2p³, is drawn as a pair in the 1s box, a pair in the 2s box, and one arrow in each of the three 2p boxes.
H: Why it matters
P: Without the Pauli principle, every electron would fall into the 1s orbital and all atoms would have similar, tiny sizes and no shell structure, so there would be no periodic table and no chemistry as we know it. The principle applies to all particles of its kind (fermions), and the resistance of electrons to being squeezed into the same state is a large part of why solid matter can't be compressed.
P: Electrons with opposite spins in an orbital are called paired. Atoms or ions with unpaired electrons are attracted into a magnetic field (paramagnetic), which is how unpaired electrons are detected; oxygen gas, with two unpaired electrons, is drawn into the gap of a strong magnet.
K: No two electrons in an atom share all four quantum numbers, so each orbital holds at most two electrons with opposite spins.
!: Drawing two electrons in the same orbital with the same spin. That would give them identical quantum numbers, which the principle forbids.
T: Pauli exclusion principle | No two electrons in an atom can have the same four quantum numbers
T: Paired electrons | Two electrons in the same orbital with opposite spins
T: Paramagnetic | Attracted into a magnetic field because of unpaired electrons
SUM: No two electrons in an atom have the same four quantum numbers.
SUM: An orbital holds at most two electrons, with opposite spins.
SUM: The principle gives atoms their shell structure; unpaired electrons make substances paramagnetic.
SRC: OpenStax, Chemistry 2e, section 6.3 "Development of Quantum Theory" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/6-3-development-of-quantum-theory
SRC: Pauli W., "Über den Zusammenhang des Abschlusses der Elektronengruppen im Atom mit der Komplexstruktur der Spektren", Zeitschrift für Physik 31:765–783 | primary | 1925 | https://doi.org/10.1007/BF02980631
Q: State the Pauli exclusion principle. | No two electrons in an atom can have the same set of four quantum numbers.
Q: How must two electrons in the same orbital differ? | In spin: one has mₛ = +½ and the other −½.
M1: Why can an orbital hold only two electrons? | Electrons in one orbital can differ only in spin, which has just two values | The orbital is full of protons | Electrons repel too strongly for three | Three electrons would make the atom an ion | With n, l and mₗ shared, only the two spin values distinguish electrons in an orbital.
M2: Which orbital box diagram for the 2p electrons of oxygen breaks the Pauli principle? | Three electrons in one 2p box | One box with a pair and two boxes with one electron each | Arrows in opposite directions in a paired box | Four electrons spread over three boxes, two paired | Three electrons in one orbital would force two of them to share all four quantum numbers.
M3: Liquid oxygen is attracted to a magnet but liquid nitrogen isn't. What does this suggest about their electrons? | Oxygen molecules have unpaired electrons, while all electrons in nitrogen molecules are paired | Nitrogen has no electrons | Oxygen is a metal | Oxygen atoms break the Pauli principle | Unpaired electrons make a substance paramagnetic; O₂ has two unpaired electrons.
TF1: Two electrons in the same orbital must have opposite spins. | true | Otherwise they would have identical quantum numbers, breaking the Pauli principle.

## Hund's rule
S: Hund's rule says that when electrons fill a set of orbitals of equal energy, they occupy them singly first, with parallel spins, before pairing up. It explains the box diagrams of the p and d blocks and some patterns in ionisation energy.
O: State Hund's rule
O: Apply it to draw orbital diagrams for p and d subshells
O: Explain the rule in terms of electron repulsion and its effect on ionisation energies
PRE: Pauli exclusion principle
H: The rule
P: For degenerate orbitals, such as the three 2p orbitals, **electrons occupy separate orbitals singly, with parallel spins, before any orbital gets a second electron**. Carbon's two 2p electrons go into two different 2p orbitals, both spin-up; nitrogen's three go one in each. Only at oxygen does a 2p orbital receive a pair.
H: Why it happens
P: Electrons repel each other. Two electrons in separate orbitals are, on average, further apart than two in the same orbital, so the repulsion is smaller. Parallel spins reduce the repulsion further, a quantum effect called exchange energy. Both lower the energy of the atom.
H: Consequences
P: Hund's rule explains a dip in first ionisation energies: oxygen's (1314 kJ mol⁻¹) is lower than nitrogen's (1402 kJ mol⁻¹), although oxygen has a larger nuclear charge. Oxygen's fourth 2p electron is paired, and the extra repulsion makes it easier to remove. Half-filled subshells, such as nitrogen's 2p³ and manganese's 3d⁵, are especially stable.
X: Draw the orbital diagram for the 3d electrons of Mn²⁺ ([Ar] 3d⁵).
> Five 3d boxes, five electrons: one in each box, all with parallel spin.
> Mn²⁺ therefore has five unpaired electrons and is strongly paramagnetic.
K: Electrons fill degenerate orbitals singly with parallel spins before pairing, which minimises repulsion.
!: Pairing electrons in the first p orbital before the others are filled. In the ground state, each of the three p orbitals receives one electron first.
T: Hund's rule | Electrons occupy degenerate orbitals singly with parallel spins before pairing
T: Parallel spins | Electrons with the same spin quantum number, shown as arrows pointing the same way
T: Exchange energy | The lowering of energy when electrons with parallel spins occupy degenerate orbitals
SUM: In degenerate orbitals, electrons go in singly with parallel spins first.
SUM: Fewer paired electrons means less repulsion and lower energy.
SUM: Pairing explains why oxygen's first ionisation energy is lower than nitrogen's.
SRC: OpenStax, Chemistry 2e, section 6.4 "Electronic Structure of Atoms (Electron Configurations)" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/6-4-electronic-structure-of-atoms-electron-configurations
SRC: NIST Atomic Spectra Database, ionization energies | standard | 2023 | https://physics.nist.gov/PhysRefData/ASD/ionEnergy.html
Q: State Hund's rule. | Electrons occupy degenerate orbitals singly, with parallel spins, before pairing up.
Q: How many unpaired electrons does a nitrogen atom have? | Three: one in each 2p orbital.
NUM2: How many unpaired electrons does an Fe³⁺ ion ([Ar] 3d⁵) have? | 5 | 0 |  | Five d electrons in five d orbitals go in singly by Hund's rule, all unpaired.
M1: How many unpaired electrons are in a ground-state carbon atom? | 2 | 0 | 1 | 4 | Carbon's two 2p electrons occupy two different 2p orbitals with parallel spins.
M2: Which correctly shows the 2p electrons of nitrogen in the ground state? | One electron in each 2p orbital, all with parallel spins | Two in the first orbital and one in the second | All three in one orbital | One spin-up and two spin-down in separate orbitals | Hund's rule: singly occupied, parallel spins.
M3: Why is the first ionisation energy of oxygen lower than that of nitrogen? | Oxygen's outermost electron is paired in a 2p orbital, and the extra repulsion makes it easier to remove | Oxygen has fewer protons | Oxygen's electron is in a higher shell | Nitrogen's electrons are all paired | The pairing in oxygen's 2p⁴ raises the energy of that electron, outweighing the slightly higher nuclear charge.

## Ionisation energy
S: Ionisation energy is the energy needed to remove electrons from atoms. Its values, and the jumps between successive ionisation energies, are some of the strongest evidence for shells and subshells.
O: Define first and successive ionisation energies and write equations for them
O: Explain the factors that affect ionisation energy
O: Use successive ionisation energies to deduce an element's group
PRE: Electron configurations
H: Definitions
P: The **first ionisation energy** is the energy needed to remove one mole of electrons from one mole of gaseous atoms, forming one mole of gaseous 1+ ions. For sodium: Na(g) → Na⁺(g) + e⁻, 496 kJ mol⁻¹. The **second ionisation energy** removes an electron from each 1+ ion: Na⁺(g) → Na²⁺(g) + e⁻. Ionisation is always endothermic.
H: What affects it
- **Nuclear charge**: more protons attract the electron more strongly, raising ionisation energy.
- **Distance from the nucleus**: an electron in a higher shell is further away and held less strongly.
- **Shielding**: inner electrons repel the outer electron, reducing the attraction it feels.
- **Subshell and pairing**: p electrons are a little easier to remove than s electrons of the same shell; a paired electron is easier to remove than an unpaired one.
H: Successive ionisation energies
P: Each successive ionisation energy is larger, because the electron is removed from an increasingly positive ion. A very large jump shows that the next electron comes from a new shell, closer to the nucleus. Magnesium's first three are 738, 1451 and 7733 kJ mol⁻¹: the jump after the second means magnesium has two outer electrons and is in group 2.
X: An element's first four ionisation energies are 578, 1817, 2745 and 11 577 kJ mol⁻¹. Which group is it in?
> The big jump is between the third (2745) and fourth (11 577).
> So it has three outer electrons: group 13 (it is aluminium).
H: Trends
P: First ionisation energy generally rises across a period (more protons, similar shielding) and falls down a group (more shells, more shielding). Small dips occur where a new subshell starts (boron 801 below beryllium 899, because a 2p electron is higher in energy than a 2s) and where pairing begins in a p subshell (oxygen 1314 below nitrogen 1402).
K: Ionisation energy depends on nuclear charge, distance and shielding; jumps in successive ionisation energies reveal how many electrons are in each shell.
!: Writing ionisation equations without state symbols, or for solids. Ionisation energies are defined for gaseous atoms or ions: X(g) → X⁺(g) + e⁻.
T: First ionisation energy | The energy to remove one mole of electrons from one mole of gaseous atoms to form one mole of gaseous 1+ ions
T: Successive ionisation energies | The energies to remove each further electron in turn from an atom
T: Shielding | The reduction in attraction between the nucleus and an outer electron caused by repulsion from inner electrons
SUM: Ionisation energies are endothermic and defined for gaseous species.
SUM: Nuclear charge raises them; distance and shielding lower them.
SUM: Big jumps in successive ionisation energies mark a new shell and give the group.
SRC: OpenStax, Chemistry 2e, section 6.5 "Periodic Variations in Element Properties" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/6-5-periodic-variations-in-element-properties
SRC: NIST Atomic Spectra Database, ionization energies | standard | 2023 | https://physics.nist.gov/PhysRefData/ASD/ionEnergy.html
Q: Write the equation for the first ionisation energy of chlorine. | Cl(g) → Cl⁺(g) + e⁻.
Q: Why is each successive ionisation energy larger than the one before? | Each electron is removed from an ion with a greater positive charge, which attracts the remaining electrons more strongly.
M1: Which element has the highest first ionisation energy? | Helium | Hydrogen | Lithium | Sodium | Helium (2372 kJ mol⁻¹) has two protons and its electrons are in the first shell with no shielding.
M2: An element has first ionisation energies of 496 and 4562 kJ mol⁻¹. Which group is it in? | Group 1 | Group 2 | Group 13 | Group 17 | The huge jump after the first means it has only one outer electron.
M3: Why is boron's first ionisation energy (801 kJ mol⁻¹) lower than beryllium's (899 kJ mol⁻¹), though boron has more protons? | Boron's outer electron is in a 2p orbital, higher in energy and more shielded than beryllium's 2s electrons | Boron's electron is in the third shell | Beryllium has a larger nuclear charge | Boron's electrons are all paired | The 2p electron is slightly further out and shielded by the 2s electrons, so it is easier to remove.
SEQ2: Put these elements in order of increasing first ionisation energy. | Potassium ; Sodium ; Magnesium ; Neon | K 419, Na 496, Mg 738, Ne 2081 kJ mol⁻¹: values fall down a group and rise across a period.

## Electron affinity
S: Electron affinity describes the energy change when atoms gain electrons. It explains which elements readily form negative ions and why forming a 2− ion always costs energy overall.
O: Define first and second electron affinity and write equations for them
O: Explain the trends in first electron affinity
O: Explain why second electron affinities are endothermic
PRE: Ionisation energy
H: Definitions
P: The **first electron affinity** is the enthalpy change when one mole of gaseous atoms each gain an electron to form one mole of gaseous 1− ions: Cl(g) + e⁻ → Cl⁻(g), ΔH = −349 kJ mol⁻¹. It is usually **exothermic**, because the added electron is attracted by the nucleus. (Some textbooks quote the energy released as a positive number, so check the sign convention.)
H: Trends
P: The halogens have the most exothermic first electron affinities: an extra electron completes their outer p subshell and is strongly attracted. Electron affinity generally becomes less exothermic down a group, as the added electron goes into a shell further from the nucleus. Fluorine is an exception: its value (−328 kJ mol⁻¹) is less exothermic than chlorine's, because its small 2p subshell is crowded and the incoming electron is repelled by the electrons already there.
P: Elements whose extra electron would have to enter a new or half-filled subshell have small or unfavourable values: noble gases, and atoms such as nitrogen (2p³), whose value is close to zero.
H: Second electron affinity
P: Adding a second electron to an ion that is already negative means forcing it against repulsion, so the **second electron affinity is endothermic**. For oxygen, O(g) + e⁻ → O⁻(g) is −141 kJ mol⁻¹, but O⁻(g) + e⁻ → O²⁻(g) is about +800 kJ mol⁻¹. Oxide ions still exist in solids such as MgO because the lattice energy released when the ions pack together more than repays this cost.
K: First electron affinities are usually exothermic and most so for the halogens; second electron affinities are endothermic because of repulsion.
!: Confusing electron affinity with electronegativity. Electron affinity is a measured energy change for isolated gaseous atoms; electronegativity describes the pull of an atom on shared electrons in a bond.
T: First electron affinity | The enthalpy change when each atom in one mole of gaseous atoms gains an electron to form 1− ions
T: Second electron affinity | The enthalpy change when each ion in one mole of gaseous 1− ions gains an electron to form 2− ions
T: Exothermic | Releasing energy to the surroundings (negative ΔH)
SUM: First electron affinity: X(g) + e⁻ → X⁻(g), usually exothermic.
SUM: Halogens have the most exothermic values; chlorine more than fluorine.
SUM: Second electron affinities are endothermic because an electron is added to a negative ion.
SRC: OpenStax, Chemistry 2e, section 6.5 "Periodic Variations in Element Properties" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/6-5-periodic-variations-in-element-properties
SRC: IUPAC, Compendium of Chemical Terminology (the Gold Book), "electron affinity" | standard | 2019 | https://goldbook.iupac.org/
Q: Write the equation for the first electron affinity of oxygen. | O(g) + e⁻ → O⁻(g).
Q: Why is the second electron affinity of oxygen endothermic? | The electron is added to a negative ion, so energy is needed to overcome the repulsion.
M1: Which group has the most exothermic first electron affinities? | Group 17, the halogens | Group 1 | Group 2 | Group 18 | Gaining one electron completes the halogens' outer subshell, releasing the most energy.
M2: Which equation represents the second electron affinity of sulfur? | S⁻(g) + e⁻ → S²⁻(g) | S(g) + 2e⁻ → S²⁻(g) | S(g) → S⁺(g) + e⁻ | S²⁻(s) → S(s) + 2e⁻ | The second electron affinity adds one electron to the gaseous 1− ion.
M3: Why is fluorine's first electron affinity less exothermic than chlorine's, though fluorine is higher in the group? | The added electron enters fluorine's small, crowded 2p subshell and is repelled by the electrons already there | Fluorine has fewer protons than chlorine | Fluorine's extra electron goes into the third shell | Fluorine is a noble gas | Electron–electron repulsion in the compact second shell partly offsets the strong nuclear attraction.
TF2: Forming O²⁻ from a gaseous oxygen atom releases energy overall. | false | The first step releases 141 kJ mol⁻¹ but the second needs about 800 kJ mol⁻¹, so the overall process is endothermic.

## Atomic spectra
S: When atoms are given energy, they emit light at only certain wavelengths, producing a line spectrum unique to each element. Line spectra showed that electrons in atoms have only particular energies, and they are used to identify elements anywhere, from a lab flame to a distant star.
O: Explain why atoms produce line spectra rather than continuous spectra
O: Use E = hf and c = fλ to relate energy, frequency and wavelength
O: Describe the series of lines in the hydrogen spectrum
PRE: Electron shells
H: Light and energy
P: Light behaves as a stream of **photons**, each with energy E = hf, where h is the Planck constant (6.626 × 10⁻³⁴ J s) and f the frequency. Since c = fλ (c = 2.998 × 10⁸ m s⁻¹), E = hc/λ: shorter wavelength means more energetic photons.
E: E = hf = hc / λ
X: Calculate the energy of a photon of red light with wavelength 656 nm.
> E = hc / λ = (6.626 × 10⁻³⁴ × 2.998 × 10⁸) ÷ (656 × 10⁻⁹).
> E = 1.987 × 10⁻²⁵ ÷ 6.56 × 10⁻⁷ = 3.03 × 10⁻¹⁹ J.
H: Why lines
P: Electrons in an atom can only have certain energies. When an electron drops from a higher level to a lower one, it emits a photon whose energy exactly equals the difference, ΔE = hf. Because only certain differences are possible, only certain wavelengths appear: a **line spectrum**. Each element has its own pattern of levels, so its spectrum is a fingerprint.
H: The hydrogen spectrum
- **Lyman series**: transitions down to n = 1, in the ultraviolet.
- **Balmer series**: transitions down to n = 2, in the visible: 656 nm (red, from n = 3), 486 nm (blue-green, n = 4), 434 nm and 410 nm (violet).
- **Paschen series**: transitions down to n = 3, in the infrared.
P: In each series the lines get closer together at higher energy and converge to a limit, because the energy levels themselves crowd together as n increases. Niels Bohr's 1913 model of hydrogen reproduced these wavelengths, the first success of quantum ideas in chemistry.
K: Line spectra arise because electrons have only certain energies; each emitted photon's energy equals the gap between two levels.
!: Thinking the lines come from electrons moving up. Emission lines come from electrons falling to lower levels; absorption lines from electrons moving up.
T: Photon | A packet of light energy, E = hf
T: Line spectrum | A spectrum of separate lines at particular wavelengths, characteristic of an element
T: Planck constant | h = 6.626 × 10⁻³⁴ J s, relating a photon's energy to its frequency
SUM: E = hf = hc/λ for each photon.
SUM: Line spectra show electrons occupy fixed energy levels.
SUM: Hydrogen's Lyman, Balmer and Paschen series end on n = 1, 2 and 3.
SRC: OpenStax, Chemistry 2e, section 6.2 "The Bohr Model" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/6-2-the-bohr-model
SRC: Bohr N., "On the constitution of atoms and molecules", Philosophical Magazine 26:1–25 | primary | 1913 | https://doi.org/10.1080/14786441308634955
Q: Why does each element have a unique line spectrum? | Each element has its own set of electron energy levels, so the energy gaps, and the wavelengths emitted, are unique to it.
Q: Which series of hydrogen lines is in the visible region? | The Balmer series, transitions down to n = 2.
NUM2: Calculate the frequency of light with wavelength 500 nm (c = 2.998 × 10⁸ m s⁻¹). Give your answer in Hz. | 6.0e14 | 1% | Hz | f = c ÷ λ = 2.998 × 10⁸ ÷ 5.00 × 10⁻⁷ = 6.00 × 10¹⁴ Hz.
M1: What happens when an electron moves from a higher to a lower energy level? | A photon is emitted with energy equal to the difference between the levels | A photon is absorbed | The atom gains a proton | The electron leaves the atom | Dropping to a lower level releases the energy difference as one photon.
M2: Which transition in hydrogen produces the red 656 nm Balmer line? | n = 3 to n = 2 | n = 2 to n = 1 | n = 4 to n = 3 | n = 1 to n = 2 | Balmer lines end on n = 2; the lowest-energy, longest-wavelength one starts from n = 3.
M3: Why do the lines in each hydrogen series get closer together towards the short-wavelength end? | The energy levels get closer together as n increases, so the differences between them converge | Electrons move faster in higher levels | The nucleus emits the extra light | Higher levels hold more electrons | Because the energy levels converge towards the ionisation limit, transitions from successive high levels differ less and less in energy.
TF1: A photon of blue light has more energy than a photon of red light. | true | Blue light has a shorter wavelength and higher frequency, and E = hf.

## Emission and absorption
S: Atoms emit light at particular wavelengths when excited electrons fall back, and absorb the same wavelengths when electrons are lifted up. Emission and absorption spectra let chemists identify elements and measure how much is present, and let astronomers read the composition of stars.
O: Distinguish emission and absorption spectra
O: Explain flame test colours in terms of electron transitions
O: Relate the convergence limit of a spectrum to ionisation energy
PRE: Atomic spectra
H: Two kinds of spectrum
P: An **emission spectrum** comes from excited atoms, in a flame or a discharge tube, and appears as bright lines on a dark background. An **absorption spectrum** appears when white light passes through cooler atoms: they absorb exactly the wavelengths that match their energy gaps, leaving dark lines in a continuous spectrum. For the same element the lines fall at the same wavelengths, because the same energy gaps are involved.
H: Flame tests
P: Heating a metal compound in a flame excites its electrons; as they fall back, the light emitted has a characteristic colour.
- Lithium: crimson red
- Sodium: yellow-orange (the strong double line near 589 nm)
- Potassium: lilac
- Calcium: orange-red (brick red)
- Copper: blue-green
P: Atomic absorption and emission spectrometers use the same principle to measure metal concentrations in water, blood and food very precisely.
H: Spectra and ionisation energy
P: As n increases the levels converge on the **ionisation limit**, where the electron is free. The convergence limit of the Lyman series, at 91.2 nm, corresponds to removing the electron from the n = 1 level, so it gives hydrogen's ionisation energy.
X: The Lyman series of hydrogen converges at 91.2 nm. Calculate hydrogen's first ionisation energy in kJ mol⁻¹.
> E per atom = hc/λ = 1.987 × 10⁻²⁵ ÷ 9.12 × 10⁻⁸ = 2.18 × 10⁻¹⁸ J.
> Per mole: 2.18 × 10⁻¹⁸ × 6.022 × 10²³ = 1.31 × 10⁶ J mol⁻¹ = 1310 kJ mol⁻¹ (the accepted value is 1312).
P: Dark absorption lines in sunlight, first catalogued by Fraunhofer, revealed the Sun's elements; helium was discovered in the solar spectrum in 1868, before it was found on Earth.
K: Emission spectra are bright lines from falling electrons; absorption spectra are dark lines at the same wavelengths from rising electrons.
!: Attributing a flame colour to the whole compound. The colour comes from the metal ion's electron transitions; sodium chloride and sodium sulfate give the same yellow.
T: Emission spectrum | Bright lines at the wavelengths emitted by excited atoms
T: Absorption spectrum | Dark lines in a continuous spectrum, where atoms have absorbed particular wavelengths
T: Convergence limit | The wavelength at which the lines of a spectral series merge, corresponding to ionisation
SUM: Emission gives bright lines; absorption gives dark lines at the same wavelengths.
SUM: Flame colours identify metal ions.
SUM: The convergence limit gives the ionisation energy.
SRC: OpenStax, Chemistry 2e, section 6.1 "Electromagnetic Energy" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/6-1-electromagnetic-energy
SRC: NIST Atomic Spectra Database, lines data | standard | 2023 | https://physics.nist.gov/PhysRefData/ASD/lines_form.html
Q: What colour does sodium give in a flame test? | Yellow-orange.
Q: How does an absorption spectrum differ from an emission spectrum for the same element? | Absorption shows dark lines on a continuous background; emission shows bright lines on a dark background, at the same wavelengths.
M1: Which metal ion gives a lilac flame? | Potassium | Sodium | Lithium | Copper | Potassium's flame is lilac; sodium is yellow-orange, lithium crimson and copper blue-green.
M2: Light from a star shows dark lines at the wavelengths of hydrogen's Balmer series. What does this tell you? | Hydrogen atoms in the star's outer layers absorb those wavelengths | The star contains no hydrogen | Hydrogen is emitting light at those wavelengths | The star is moving away very fast | Dark lines are absorption by cooler gas between the hot interior and us.
M3: Why do the emission and absorption lines of an element occur at exactly the same wavelengths? | Both involve electrons moving between the same pairs of energy levels, in opposite directions | Absorption is just emission seen backwards in time | All elements absorb the same wavelengths | The light changes wavelength when absorbed | The energy gap between two levels is the same whether the electron moves up or down.
MATCH2: Match each metal ion to its flame colour. | Lithium = crimson red ; Sodium = yellow-orange ; Potassium = lilac ; Copper = blue-green | Each colour comes from that ion's characteristic electron transitions.

## Wave-particle duality
S: Light and electrons both behave sometimes like waves and sometimes like particles. This wave-particle duality is the foundation of quantum theory and the reason electrons in atoms are described by orbitals rather than orbits.
O: Describe evidence that light behaves as particles (the photoelectric effect)
O: Describe evidence that electrons behave as waves (electron diffraction)
O: Calculate de Broglie wavelengths
PRE: Atomic spectra
H: Light as particles
P: In the **photoelectric effect**, light shining on a metal surface ejects electrons, but only if its frequency is above a threshold, however bright the light. Einstein explained this in 1905: light comes in photons of energy hf, and one photon ejects one electron only if hf exceeds the energy binding the electron to the metal (the work function). Brighter light means more photons, not more energetic ones.
H: Electrons as waves
P: In 1924 Louis de Broglie proposed that particles also have wave properties, with a wavelength given by the **de Broglie equation**:
E: λ = h / (m v)
P: In 1927 Clinton Davisson and Lester Germer, and independently George Thomson, showed that electrons are diffracted by crystals, a property only waves have, with exactly the predicted wavelengths. Electron microscopes and electron diffraction, used to work out crystal structures, rely on this.
X: Calculate the de Broglie wavelength of an electron travelling at 2.0 × 10⁶ m s⁻¹ (mass 9.109 × 10⁻³¹ kg).
> λ = h ÷ (mv) = 6.626 × 10⁻³⁴ ÷ (9.109 × 10⁻³¹ × 2.0 × 10⁶).
> λ = 6.626 × 10⁻³⁴ ÷ 1.82 × 10⁻²⁴ = 3.6 × 10⁻¹⁰ m (0.36 nm), similar to the spacing of atoms in a crystal.
H: Why we don't see it in everyday life
P: A cricket ball of 0.16 kg moving at 30 m s⁻¹ has a de Broglie wavelength of about 1.4 × 10⁻³⁴ m, unimaginably smaller than any object it could diffract around. Wave behaviour matters only for very light particles such as electrons, whose wavelengths are comparable to the size of atoms.
K: Light and matter show both wave and particle behaviour; the de Broglie wavelength, λ = h/mv, is significant only for very small masses such as electrons.
!: Thinking an electron is "sometimes a wave and sometimes a particle". It is a quantum object that shows wave-like or particle-like behaviour depending on the experiment.
T: Photoelectric effect | The ejection of electrons from a metal by light above a threshold frequency
T: de Broglie wavelength | The wavelength of a moving particle, λ = h / (mv)
T: Electron diffraction | The spreading of an electron beam by a crystal, showing that electrons behave as waves
SUM: The photoelectric effect shows light arrives in photons.
SUM: Electron diffraction shows particles have wavelengths, λ = h/mv.
SUM: Wave behaviour is noticeable only for very small masses such as electrons.
SRC: OpenStax, Chemistry 2e, section 6.3 "Development of Quantum Theory" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/6-3-development-of-quantum-theory
SRC: Davisson C. and Germer L.H., "Diffraction of electrons by a crystal of nickel", Physical Review 30:705–740 | primary | 1927 | https://doi.org/10.1103/PhysRev.30.705
Q: State the de Broglie equation. | λ = h / (mv), where m is the mass and v the velocity of the particle.
Q: What evidence shows that electrons behave as waves? | Electron diffraction: beams of electrons are diffracted by crystals, as Davisson and Germer showed in 1927.
NUM3: Calculate the de Broglie wavelength, in picometres, of an electron moving at 1.0 × 10⁷ m s⁻¹ (h = 6.626 × 10⁻³⁴ J s, mₑ = 9.109 × 10⁻³¹ kg). | 72.7 | 0.5 | pm | λ = 6.626 × 10⁻³⁴ ÷ (9.109 × 10⁻³¹ × 1.0 × 10⁷) = 7.27 × 10⁻¹¹ m = 72.7 pm.
M1: In the photoelectric effect, what happens if light below the threshold frequency is made brighter? | Still no electrons are emitted | More electrons are emitted | Electrons are emitted with more energy | The metal becomes radioactive | Each photon has too little energy; brighter light only means more of them.
M2: An electron and a proton travel at the same speed. Which has the longer de Broglie wavelength? | The electron, because it has the smaller mass | The proton, because it has the larger mass | They are equal | Neither has a wavelength | λ = h/mv, so at the same speed the lighter particle has the longer wavelength.
M3: Why can electron diffraction be used to study crystal structures, while diffraction of visible light cannot? | Fast electrons have wavelengths similar to the spacing between atoms, while visible light's wavelengths are thousands of times longer | Light can't pass through crystals | Electrons are smaller than photons | Visible light has no wavelength | Diffraction is strong when the wavelength is comparable to the spacing; atom spacings are about 0.1–0.5 nm.

## Quantum mechanical model
S: The quantum mechanical model treats the electron in an atom as a wave described by the Schrödinger equation. Its solutions give the allowed energies and the orbitals, and replace Bohr's circular orbits with probabilities.
O: Explain why the Bohr model was replaced
O: Describe what the Schrödinger equation and its wavefunctions tell us
O: Explain the uncertainty principle and its consequence for electrons in atoms
PRE: Wave-particle duality
H: Beyond Bohr
P: Bohr's model (1913) gave hydrogen's energy levels correctly, but it failed for atoms with more than one electron and couldn't explain the relative brightness of spectral lines or why only certain orbits were allowed. Treating the electron as a wave solved these problems.
H: The Schrödinger equation
P: In 1926 Erwin Schrödinger wrote an equation for the electron's wave. Its solutions, **wavefunctions** (ψ), exist only for particular energies, so quantisation follows naturally, just as a guitar string can vibrate only at certain frequencies. The square of the wavefunction, ψ², gives the **probability density**: how likely the electron is to be found in each small region. An orbital is a wavefunction, and its familiar shape is a picture of where ψ² is large.
H: Uncertainty
P: Werner Heisenberg's **uncertainty principle** (1927) states that the position and momentum of a particle can't both be known exactly at once: Δx · Δp ≥ h/4π. For an electron confined to an atom, the uncertainty in momentum is so large that a definite path is meaningless. That is why the model gives probabilities, not orbits.
P: For hydrogen, the solutions give energies Eₙ = −2.18 × 10⁻¹⁸ J ÷ n², exactly matching the spectrum, and for other atoms, approximate methods based on the same equation predict energies and shapes that agree with experiment.
K: In the quantum mechanical model the electron is a wave; the Schrödinger equation gives its allowed energies and orbitals, and ψ² gives the probability of finding it.
!: Thinking an orbital's boundary is where the electron stays. It is only a surface enclosing most (often 90%) of the probability; there is a small chance of finding the electron further out.
T: Wavefunction | A mathematical function (ψ) describing an electron's wave in an atom; ψ² gives its probability density
T: Schrödinger equation | The equation whose solutions give the allowed energies and wavefunctions of electrons
T: Uncertainty principle | Position and momentum can't both be known exactly: Δx · Δp ≥ h/4π
SUM: Bohr's orbits failed for many-electron atoms.
SUM: The Schrödinger equation's wavefunctions give quantised energies; ψ² gives probability.
SUM: The uncertainty principle rules out definite electron paths.
SRC: OpenStax, Chemistry 2e, section 6.3 "Development of Quantum Theory" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/6-3-development-of-quantum-theory
SRC: Schrödinger E., "Quantisierung als Eigenwertproblem", Annalen der Physik 79:361–376 | primary | 1926 | https://doi.org/10.1002/andp.19263840404
Q: What does the square of the wavefunction tell you? | The probability density: how likely the electron is to be found at each point.
Q: Why was the Bohr model replaced? | It worked only for hydrogen-like atoms and couldn't explain why only certain orbits were allowed or the spectra of many-electron atoms.
NUM2: Using Eₙ = −2.18 × 10⁻¹⁸ J ÷ n², calculate the energy (in J) released when a hydrogen electron falls from n = 2 to n = 1. Give the answer as a positive number. | 1.635e-18 | 1% | J | ΔE = 2.18 × 10⁻¹⁸ × (1/1² − 1/2²) = 2.18 × 10⁻¹⁸ × 0.75 = 1.64 × 10⁻¹⁸ J (the 121.6 nm Lyman line).
M1: What does an orbital represent in the quantum mechanical model? | A region where there is a high probability of finding the electron | A fixed circular path | The nucleus | A group of atoms | Orbitals are probability distributions given by ψ².
M2: Why can't we say exactly where an electron in an atom is and how it is moving? | The uncertainty principle forbids knowing position and momentum precisely at the same time | Electrons move too fast for cameras | Electrons have no mass | Microscopes aren't good enough yet | This is a fundamental limit, not a limit of technology.
M3: How does the quantum mechanical model explain why electron energies are quantised? | Only certain wave patterns satisfy the Schrödinger equation for an electron bound to a nucleus, as only certain notes fit on a string | Electrons are stopped by walls in the atom | The nucleus emits energy in packets | Electrons are particles that can't move | Boundary conditions on a confined wave allow only particular solutions, each with its own energy.
TF2: In the quantum mechanical model, electrons travel in fixed circular orbits around the nucleus. | false | Fixed orbits belong to the Bohr model; the quantum model gives probability distributions.

## Atomic orbitals and shapes
S: Each type of orbital has a characteristic shape: s orbitals are spherical, p orbitals have two lobes, and d orbitals mostly have four. These shapes, and the nodes within them, decide how atoms bond and the shapes of molecules.
O: Describe the shapes of s, p and d orbitals
O: Explain what nodes are and count them for a given orbital
O: Relate orbital shape and size to n and l
PRE: Quantum mechanical model
H: The shapes
- **s orbitals** are spherical. A 2s orbital is larger than a 1s, and a 3s larger again.
- **p orbitals** have two lobes on opposite sides of the nucleus, with a plane of zero probability (a nodal plane) between them. The three p orbitals point along the x, y and z axes: pₓ, p_y and p_z.
- **d orbitals**: four of the five have four lobes in a cloverleaf pattern; the fifth, d_z², has two lobes along the z axis and a ring around the middle.
IX: orbitals
H: Nodes
P: A **node** is a region where the probability of finding the electron is zero. An orbital has n − 1 nodes in total: **l angular nodes** (planes or cones through the nucleus) and **n − l − 1 radial nodes** (spheres). 1s has none; 2s has one radial node; 2p has one angular node (the nodal plane); 3p has one of each.
X: How many radial and angular nodes does a 3d orbital have?
> Angular nodes = l = 2. Radial nodes = n − l − 1 = 3 − 2 − 1 = 0.
> Total = 2 = n − 1, as expected.
H: Why shape matters
P: Bonds form where orbitals on neighbouring atoms overlap. The directional lobes of p orbitals explain why many molecules have definite shapes and angles, and the lobes of d orbitals explain the colours and magnetism of transition metal complexes, because the lobes point either towards or between surrounding ligands.
P: Orbitals with larger n are bigger and their electrons are, on average, further from the nucleus, which is why atomic radius increases down a group.
K: s orbitals are spherical, p orbitals two-lobed along an axis, and most d orbitals four-lobed; an orbital has l angular and n − l − 1 radial nodes.
!: Thinking a p orbital's two lobes hold one electron each. The orbital is one wavefunction: one or two electrons occupy the whole two-lobed shape.
T: Node | A region in an orbital where the probability of finding the electron is zero
T: Nodal plane | A flat angular node through the nucleus, as in a p orbital
T: Radial node | A spherical node at a fixed distance from the nucleus
SUM: s is spherical; p has two lobes along x, y or z; d mostly four lobes.
SUM: Angular nodes = l; radial nodes = n − l − 1; total n − 1.
SUM: Orbital shapes direct bonding and molecular shape.
SRC: OpenStax, Chemistry 2e, section 6.3 "Development of Quantum Theory" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/6-3-development-of-quantum-theory
SRC: Atkins P., de Paula J. and Keeler J., Atkins' Physical Chemistry, 11th edition, chapter 8 "Atomic structure and spectra" | secondary | 2018
Q: What shape is an s orbital? | Spherical.
Q: How many radial nodes does a 2s orbital have? | One (n − l − 1 = 2 − 0 − 1).
M1: How many lobes does a p orbital have? | Two | One | Four | Six | A p orbital has two lobes on either side of the nucleus, separated by a nodal plane.
M2: How many angular nodes does any p orbital have? | One | Zero | Two | Three | The number of angular nodes equals l, which is 1 for p orbitals.
M3: Why is there zero probability of finding a 2p electron at the nucleus, while a 1s electron's probability density is highest there? | The 2p orbital has a nodal plane through the nucleus; s orbitals have no angular node | 2p electrons move too fast | The nucleus repels p electrons | 1s electrons are inside the nucleus | The angular node of a p orbital passes through the nucleus, while spherical s orbitals have their maximum density at the centre.
NUM2: How many radial nodes does a 4s orbital have? | 3 | 0 |  | Radial nodes = n − l − 1 = 4 − 0 − 1 = 3; an s orbital has no angular nodes.

## Periodic trends
S: Atomic radius, ionisation energy and electronegativity change in regular ways across periods and down groups. These trends follow from electron structure, through effective nuclear charge, shielding and the number of shells.
O: Explain effective nuclear charge and shielding
O: Describe and explain trends in atomic radius, ionisation energy and electronegativity
O: Predict how a property changes between two named elements
PRE: Ionisation energy
H: Effective nuclear charge
P: An outer electron doesn't feel the full nuclear charge, because inner electrons repel it. The **effective nuclear charge** is roughly the nuclear charge minus the shielding by inner electrons. Across period 3, from sodium to argon, protons are added one at a time while the inner 10 electrons (1s² 2s² 2p⁶) stay the same, so the effective nuclear charge on the outer (n = 3) electrons rises steadily.
IX: periodic-table
H: Three trends
- **Atomic radius** decreases across a period (higher effective nuclear charge pulls the same shell in) and increases down a group (more shells). Sodium's atom (about 186 pm) is far larger than chlorine's (about 100 pm covalent radius).
- **First ionisation energy** increases across a period and decreases down a group, for the same reasons, with small dips where a new subshell starts or pairing begins.
- **Electronegativity**, an atom's pull on shared electrons in a bond, increases across a period and decreases down a group. On the Pauling scale fluorine is highest (3.98) and caesium among the lowest (0.79).
H: Down a group
P: Going down a group, the nuclear charge increases a lot, but so does the number of inner shells shielding the outer electrons. The outer electrons are much further out, so overall they are held less strongly: atoms get bigger and lose electrons more easily, which is why reactivity increases down group 1.
X: Predict which has the larger atomic radius, magnesium or sulfur, and explain.
> Both are in period 3, with outer electrons in the third shell.
> Sulfur has 4 more protons with similar shielding, so its outer electrons are pulled closer: magnesium is larger.
K: Across a period, effective nuclear charge rises, so atoms shrink and hold electrons more tightly; down a group, added shells outweigh added protons.
!: Saying atoms get bigger across a period "because they have more electrons". They get smaller: the added electrons go into the same shell while the rising nuclear charge pulls it in.
T: Effective nuclear charge | The net positive charge felt by an outer electron after shielding by inner electrons
T: Atomic radius | Half the distance between the nuclei of two bonded atoms of the same element
T: Electronegativity | The ability of an atom to attract the bonding electrons in a covalent bond
SUM: Effective nuclear charge rises across a period; shells are added down a group.
SUM: Radius falls across a period and rises down a group.
SUM: Ionisation energy and electronegativity rise across and fall down.
SRC: OpenStax, Chemistry 2e, section 6.5 "Periodic Variations in Element Properties" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/6-5-periodic-variations-in-element-properties
SRC: Pauling L., "The nature of the chemical bond. IV. The energy of single bonds and the relative electronegativity of atoms", Journal of the American Chemical Society 54:3570–3582 | primary | 1932 | https://doi.org/10.1021/ja01348a011
Q: Why do atoms get smaller across a period? | Protons are added but the outer electrons are in the same shell with similar shielding, so the higher effective nuclear charge pulls them closer.
Q: Which element is the most electronegative? | Fluorine.
M1: How does atomic radius change down group 1? | It increases | It decreases | It stays the same | It increases then decreases | Each element down the group has an extra shell of electrons.
M2: Which atom has the highest first ionisation energy: sodium, aluminium, phosphorus or argon? | Argon | Sodium | Aluminium | Phosphorus | Ionisation energy generally rises across period 3, so the noble gas at the end, argon, is highest.
M3: Caesium's nucleus has 55 protons and sodium's 11, yet caesium loses its outer electron more easily. Why? | Caesium's outer electron is in the sixth shell, much further out and shielded by many more inner electrons, so it is held less strongly | Caesium has fewer protons | Sodium's outer electron is in the sixth shell | Caesium has no inner electrons | Extra shielding and distance outweigh the larger nuclear charge.
SEQ2: Put these atoms in order of increasing atomic radius. | Fluorine ; Oxygen ; Sulfur ; Sodium | F and O are in period 2, with F smaller; S has a third shell, and Na, at the start of period 3, is the largest.

## Electronic structure and chemical properties
S: An element's chemistry follows from its electron structure. The number and type of outer electrons explain whether it forms positive or negative ions, which oxidation states it shows, how reactive it is, and even whether its compounds are coloured.
O: Explain how outer electron configuration determines the typical ions and bonding of an element
O: Explain reactivity trends in groups 1 and 17 in terms of electron structure
O: Explain why many transition metal compounds are coloured and show variable oxidation states
PRE: Periodic trends
H: Gaining, losing and sharing
P: Metals, on the left of the table, have few outer electrons and low ionisation energies, so they tend to lose electrons and form cations. Non-metals, on the right, have nearly full outer shells and exothermic electron affinities, so they tend to gain electrons (forming anions) or share them in covalent bonds. Noble gases, with full outer shells and very high ionisation energies, rarely react at all.
H: Reactivity trends
- **Group 1** reactivity increases down the group: the outer s electron is further from the nucleus and more shielded, so it is lost more easily. Potassium reacts with water far more vigorously than lithium.
- **Group 17** reactivity decreases down the group: a halogen reacts by gaining an electron, and an incoming electron is attracted less strongly by a larger atom. Fluorine is the most reactive non-metal, and chlorine displaces bromide and iodide from solution.
H: The d-block
P: In transition metals the 4s and 3d electrons are close in energy, so different numbers can be lost: iron forms Fe²⁺ and Fe³⁺, and manganese shows every oxidation state from +2 to +7. Many transition metal ions have partly filled d subshells. In a complex, the surrounding ligands split the d orbitals into groups of different energy, and electrons absorb visible light when they jump between them; the colour we see is the light not absorbed. Ions with empty or full d subshells, such as Sc³⁺ (3d⁰) and Zn²⁺ (3d¹⁰), are colourless.
P: The same idea, chemistry from configuration, is why elements in a group form similar compounds: the alkali metals all form chlorides MCl and oxides M₂O, and the halogens all form hydrogen halides HX.
K: Outer electron configuration decides how an element bonds and reacts; group trends follow from distance and shielding, and partly filled d subshells give transition metals variable oxidation states and colour.
!: Saying atoms react "to get a full outer shell" as if they intended it. Reactions happen when the products are lower in energy; noble gas configurations are often, not always, part of why.
T: Oxidation state | A number describing how many electrons an atom has lost or gained in forming a compound or ion
T: Transition metal | A d-block element that forms at least one stable ion with a partly filled d subshell
T: Ligand | A molecule or ion that donates a pair of electrons to a central metal ion in a complex
SUM: Metals lose electrons; non-metals gain or share them; noble gases rarely react.
SUM: Group 1 reactivity rises down the group; group 17 falls.
SUM: Partly filled d subshells give variable oxidation states and coloured compounds.
SRC: OpenStax, Chemistry 2e, section 19.1 "Occurrence, Preparation, and Properties of Transition Metals and Their Compounds" | secondary | 2019 | https://openstax.org/books/chemistry-2e/pages/19-1-occurrence-preparation-and-properties-of-transition-metals-and-their-compounds
SRC: Housecroft C.E. and Sharpe A.G., Inorganic Chemistry, 5th edition, chapter 1 "Basic concepts: atoms" | secondary | 2018
Q: Why does reactivity increase down group 1? | The outer electron is further from the nucleus and more shielded, so less energy is needed to remove it.
Q: Why is Zn²⁺ colourless while Cu²⁺ is blue? | Zn²⁺ has a full 3d¹⁰ subshell, so no d–d transitions are possible; Cu²⁺ (3d⁹) has a partly filled d subshell whose electrons absorb visible light.
M1: Which ion is most likely to form from a calcium atom ([Ar] 4s²)? | Ca²⁺ | Ca⁺ | Ca²⁻ | Ca³⁺ | Losing the two 4s electrons gives the stable argon configuration; a third ionisation would remove an inner electron.
M2: Chlorine water is added to potassium bromide solution and the solution turns orange. Why? | Chlorine is more reactive than bromine, so it takes electrons from bromide ions, forming bromine | Bromine is more reactive than chlorine | Potassium reacts with chlorine water | The bromide ions gain electrons | Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂: chlorine's smaller atom attracts an extra electron more strongly.
M3: Scandium is in the d-block, but Sc³⁺ compounds are white and scandium is often said not to be a typical transition metal. Why? | Its only common ion, Sc³⁺, has an empty 3d subshell, so it has no d electrons to give colour or variable oxidation states | Scandium has no d electrons in any state | Scandium is an s-block element | Sc³⁺ has a full 3d subshell | With 3d⁰, Sc³⁺ can't have d–d transitions; transition metal character needs a partly filled d subshell.
TF1: Elements in the same group have the same outer electron configuration. | true | For example, all group 1 elements have an ns¹ outer configuration, which is why they react similarly.
`;
