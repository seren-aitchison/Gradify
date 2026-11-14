// VetGradify Microbiology, Parasitology and Immunology (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Bacteria of veterinary importance
LV: Preclinical · Foundation
S: Bacteria cause many of the most important diseases of domestic animals. This lesson explains how bacteria are classified, how they cause disease and which genera matter most in UK veterinary practice.
O: Describe how bacteria are classified using Gram stain, shape and oxygen requirements
O: Explain the main bacterial virulence factors
O: Identify important bacterial pathogens of domestic species
H: Classifying bacteria
P: Bacteria are single-celled **prokaryotes** with no nucleus. They are first classified by the **Gram stain**: **Gram-positive** bacteria have a thick peptidoglycan wall and stain purple, while **Gram-negative** bacteria have a thin wall plus an **outer membrane** containing **lipopolysaccharide (LPS, endotoxin)** and stain pink. Shape matters too: **cocci** are spherical, **bacilli** are rods and **spirochaetes** are spiral. Oxygen requirements divide bacteria into **obligate aerobes**, **facultative anaerobes** and **obligate anaerobes** such as *Clostridium*. Some genera, such as *Mycobacterium*, have waxy walls and are identified by the **Ziehl-Neelsen (acid-fast) stain**. Final identification uses culture, biochemical tests, **MALDI-TOF** mass spectrometry or **PCR**.
H: Virulence factors
- **Adhesins** and **fimbriae** let bacteria attach to host cells, such as the F4 (K88) fimbriae of piglet *E. coli*.
- **Capsules** resist phagocytosis, as in *Streptococcus equi*.
- **Exotoxins** are secreted proteins, such as the neurotoxins of *Clostridium tetani* and *Clostridium botulinum*.
- **Endotoxin** (LPS) from Gram-negative walls triggers fever, shock and endotoxaemia, important in equine colic.
- **Spores** let *Clostridium* and *Bacillus anthracis* survive for years in soil.
- **Intracellular survival** lets *Mycobacterium bovis* and *Brucella* hide inside macrophages.
H: Important pathogens in UK practice
- *Staphylococcus pseudintermedius*: canine pyoderma and otitis, with methicillin-resistant strains (MRSP).
- *Streptococcus equi* subspecies *equi*: strangles in horses.
- *Escherichia coli* and *Salmonella*: enteric disease and mastitis; some *Salmonella* in poultry is reportable.
- *Clostridium perfringens*: enterotoxaemia in sheep, preventable by vaccination.
- *Mycobacterium bovis*: bovine tuberculosis, a notifiable disease reported to APHA.
- *Leptospira*: a zoonotic spirochaete affecting dogs, cattle and people.
X: Identifying a cause of strangles.
> A young horse has fever, nasal discharge and swollen submandibular lymph nodes.
> A nasopharyngeal swab or guttural pouch wash is taken.
> Gram-positive cocci in chains are seen, and PCR confirms *Streptococcus equi* subspecies *equi*.
> The yard follows the Horserace Betting Levy Board Codes of Practice for strangles, isolating the horse and screening contacts.
K: Bacteria are classified by Gram stain, shape and oxygen needs, cause disease through adhesins, capsules, exotoxins, endotoxin, spores and intracellular survival, and important UK pathogens include *Staphylococcus pseudintermedius*, *Streptococcus equi*, *E. coli*, *Salmonella*, *Clostridium*, *Mycobacterium bovis* and *Leptospira*.
!: Assuming Gram-negative means less dangerous. Gram-negative bacteria carry endotoxin, which can cause life-threatening shock.
EV: established | The Gram stain separates bacteria by cell wall structure and remains a first step in bacterial identification.
T: Endotoxin | Lipopolysaccharide in the outer membrane of Gram-negative bacteria that triggers fever and shock
T: Exotoxin | A protein toxin secreted by a bacterium
T: Acid-fast | Retaining stain after acid-alcohol washing, typical of mycobacteria
SUM: Gram stain splits by wall type.
SUM: Toxins and capsules drive disease.
SUM: Bovine TB is notifiable.
SRC: Quinn P. J., Markey B. K., Leonard F. C., FitzPatrick E. S., Fanning S. and Hartigan P. J., Veterinary Microbiology and Microbial Disease, 2nd edition, Wiley-Blackwell | secondary | 2011
SRC: Horserace Betting Levy Board, Codes of Practice: Strangles | guidance | 2024 | https://codes.hblb.org.uk
SRC: Animal and Plant Health Agency, Notifiable diseases in animals | guidance | 2024 | https://www.gov.uk/government/collections/notifiable-diseases-in-animals
Q: What colour do Gram-positive bacteria stain? | Purple.
Q: Which stain identifies mycobacteria? | The Ziehl-Neelsen (acid-fast) stain.
M1#veterinary-u06-01-q1@1: Which feature is found only in Gram-negative bacteria? | An outer membrane with LPS | A thick peptidoglycan wall | Purple staining after Gram | A waxy mycolic acid wall | The outer membrane carries endotoxin, the hallmark of Gram-negative bacteria.
M2#veterinary-u06-01-q2@2: How do spores help *Clostridium* species cause disease? | They survive for years in soil | They attach the bacteria to gut cells | They stop antibodies from binding | They secrete endotoxin into the blood | Spores resist heat, drying and disinfectants, so they persist in the environment.
MATCH2#veterinary-u06-01-q3@3: Match each bacterium to the disease it causes. | Streptococcus equi = Strangles ; Mycobacterium bovis = Bovine tuberculosis ; Staphylococcus pseudintermedius = Canine pyoderma ; Clostridium tetani = Tetanus | These are classic veterinary pathogens that students must recognise.
M3#veterinary-u06-01-q4@3: A colicky horse with a strangulating lesion becomes shocked with toxic mucous membranes. Which bacterial product is most likely involved? | Endotoxin from Gram-negative gut bacteria | Tetanus neurotoxin from clostridia | Capsule from Streptococcus equi | Spores from Bacillus anthracis | Damaged gut lets LPS from Gram-negative bacteria enter the circulation, causing endotoxaemia.
SA2#veterinary-u06-01-q5@2,3: Explain three bacterial virulence factors, with a veterinary example of each. | Adhesins such as fimbriae let bacteria attach to host cells, for example the F4 fimbriae of *E. coli* in piglet diarrhoea. Capsules resist phagocytosis, as in *Streptococcus equi*, which causes strangles. Exotoxins are secreted proteins with powerful effects, such as the neurotoxin of *Clostridium tetani* that causes tetanus. | Adhesins with example ; Capsule with example ; Toxin with example ; Link to disease

## Viruses of veterinary importance
LV: Preclinical · Foundation
S: Viruses are obligate intracellular parasites that cause many notifiable and economically important animal diseases. This lesson explains viral structure and replication, how viruses are classified and which viruses matter most in the UK.
O: Describe viral structure and replication
O: Explain how viruses are classified
O: Identify important viral diseases of domestic animals, including notifiable diseases
H: Structure and replication
P: A virus consists of a **genome** of either **DNA or RNA**, surrounded by a protein coat called the **capsid**. Many viruses also have a lipid **envelope** taken from the host cell membrane. Viruses cannot replicate on their own: they **attach** to receptors, **penetrate** the cell, **uncoat**, use host machinery to make new genomes and proteins, **assemble** new virions and are **released** by lysis or budding. **Enveloped viruses**, such as influenza, are fragile and easily destroyed by detergents and drying, while **non-enveloped viruses**, such as **canine parvovirus**, survive for months in the environment. RNA viruses mutate rapidly, which helps them evade immunity.
H: Classification
- The **Baltimore classification** groups viruses by genome type and how they make messenger RNA.
- Families are defined by the International Committee on Taxonomy of Viruses (ICTV).
- **Parvoviridae**: small, non-enveloped DNA viruses, such as canine parvovirus and feline panleucopenia virus.
- **Herpesviridae**: enveloped DNA viruses that cause **latent** infection, such as equine herpesvirus and feline herpesvirus.
- **Retroviridae**: RNA viruses that use reverse transcriptase, such as feline leukaemia virus (FeLV) and feline immunodeficiency virus (FIV).
- **Orthomyxoviridae**: influenza viruses, including avian influenza.
H: Notifiable and important viral diseases
- **Foot-and-mouth disease** (a picornavirus) in cloven-hoofed animals: notifiable.
- **Avian influenza** in birds: notifiable, with housing and culling measures.
- **Rabies** (a lyssavirus): notifiable, absent from UK terrestrial animals but controlled by pet travel rules.
- **Bluetongue** (an orbivirus spread by Culicoides midges): notifiable.
- **Bovine viral diarrhoea** (a pestivirus): not notifiable in England but controlled by national schemes.
- Suspicion of any notifiable disease must be reported to APHA immediately.
X: Suspecting a notifiable disease.
> A farmer reports dairy cows that are drooling, lame and have blisters on the tongue and feet.
> The vet recognises signs consistent with foot-and-mouth disease.
> The vet keeps the animals on the premises and phones APHA straight away, without moving people or animals off the farm.
> APHA vets take samples for laboratory testing and impose restrictions until disease is ruled out.
K: Viruses have a DNA or RNA genome in a capsid, sometimes enveloped, replicate only inside host cells, are classified into families such as Parvoviridae, Herpesviridae and Retroviridae, and notifiable viral diseases such as foot-and-mouth disease, avian influenza, rabies and bluetongue must be reported to APHA.
!: Thinking all viruses are fragile. Non-enveloped viruses such as parvovirus survive for months and need disinfectants proven against them.
EV: established | Non-enveloped viruses are generally more resistant to disinfectants and drying than enveloped viruses.
T: Capsid | The protein coat that surrounds a viral genome
T: Envelope | A lipid membrane around some viruses, taken from the host cell
T: Latency | A dormant state in which a virus persists in host cells and can later reactivate
SUM: DNA or RNA in a capsid.
SUM: Envelopes make viruses fragile.
SUM: Report notifiable diseases to APHA.
SRC: MacLachlan N. J. and Dubovi E. J. (eds), Fenner's Veterinary Virology, 5th edition, Academic Press | secondary | 2017
SRC: Animal and Plant Health Agency, Notifiable diseases in animals | guidance | 2024 | https://www.gov.uk/government/collections/notifiable-diseases-in-animals
Q: Which part of a virus is taken from the host cell membrane? | The envelope.
Q: Which virus family includes FeLV and FIV? | Retroviridae.
M1#veterinary-u06-02-q1@1: What is the protein coat of a virus called? | Capsid | Envelope | Ribosome | Cell wall | The capsid encloses and protects the viral genome.
M2#veterinary-u06-02-q2@2: Why does canine parvovirus persist for months in kennels? | It is non-enveloped | It forms bacterial spores | It has a lipid envelope | It replicates in soil | Non-enveloped viruses resist drying and many detergents, so they persist in the environment.
TF1#veterinary-u06-02-q3@3: Bluetongue is a notifiable disease spread by Culicoides biting midges. | true | Bluetongue is an orbivirus transmitted by midges, and suspicion must be reported to APHA.
M3#veterinary-u06-02-q4@3: A cat with a history of feline herpesvirus develops conjunctivitis again after a stressful house move. What explains this? | Reactivation of latent virus | A new parvovirus infection | Bacterial spores germinating | Antibodies attacking the eye | Herpesviruses establish latency and can reactivate during stress.
SA2#veterinary-u06-02-q5@2,3: Describe what a vet should do on suspecting foot-and-mouth disease on a farm. | Foot-and-mouth disease is notifiable, so the vet must report suspicion to APHA immediately by phone. Animals, people, vehicles and products should not leave the premises, and the vet should follow biosecurity measures to avoid spreading virus. APHA then investigates, takes samples and imposes movement restrictions until disease is confirmed or ruled out. | Notifiable status ; Report to APHA immediately ; Stand still and biosecurity ; APHA investigation and restrictions

## Fungi and prions
LV: Preclinical · Foundation
S: Fungi and prions are less common causes of disease than bacteria and viruses but include important zoonoses and fatal neurological diseases. This lesson covers dermatophytes, yeasts, systemic and opportunistic fungi, and the transmissible spongiform encephalopathies.
O: Describe the main groups of pathogenic fungi in animals
O: Explain what prions are and how they cause disease
O: Recognise the control measures for transmissible spongiform encephalopathies
H: Fungi of veterinary importance
P: Fungi are **eukaryotes** with a cell wall containing **chitin** and a membrane containing **ergosterol**, which is the target of many antifungal drugs. They grow as **yeasts** (single cells) or **moulds** (branching filaments called **hyphae**). **Dermatophytes** such as *Microsporum canis* and *Trichophyton verrucosum* infect keratin in hair and skin, causing **ringworm**, a common **zoonosis**. *Malassezia pachydermatis* is a yeast that overgrows in canine otitis and dermatitis, usually secondary to allergy. *Aspergillus* is an **opportunistic** mould that causes sinonasal disease in dogs, guttural pouch mycosis in horses and respiratory disease in birds. *Cryptococcus* causes nasal and neurological disease, especially in cats.
H: Diagnosing fungal infection
- **Wood's lamp**: some *Microsporum canis* strains fluoresce apple-green, but many do not.
- **Trichogram**: plucked hairs are examined for fungal spores and hyphae.
- **Fungal culture** on dermatophyte test medium, or **PCR**, confirms ringworm.
- **Tape-strip cytology** shows *Malassezia* as peanut-shaped yeasts.
- **Histopathology**, **serology** and endoscopy help with deep fungal infections.
H: Prions and TSEs
- **Prions** are misfolded forms of the normal host **prion protein (PrP)**, with no nucleic acid.
- They convert normal PrP into the misfolded form, which accumulates in the brain and causes **spongiform** vacuoles.
- **Bovine spongiform encephalopathy (BSE)** in cattle and **scrapie** in sheep and goats are **notifiable** in the UK.
- BSE is linked to **variant Creutzfeldt-Jakob disease** in people, so specified risk material is removed at slaughter.
- Prions resist normal disinfection and cooking, so control relies on feed bans, surveillance and safe disposal.
- Sheep **PRNP genotype** influences susceptibility to classical scrapie.
X: Ringworm in a kitten.
> A new kitten has circular patches of hair loss and the owner's child develops an itchy ring on the arm.
> Some hairs fluoresce under a Wood's lamp, and fungal culture grows *Microsporum canis*.
> The vet explains that ringworm is a zoonosis and advises the family to see their GP.
> The home is cleaned thoroughly, because spores persist in the environment for many months.
K: Pathogenic fungi include dermatophytes that cause zoonotic ringworm, *Malassezia* yeasts in skin and ear disease, and opportunistic moulds such as *Aspergillus*, while prions are misfolded proteins that cause notifiable spongiform encephalopathies such as BSE and scrapie and resist normal disinfection.
!: Relying on a negative Wood's lamp to rule out ringworm. Many dermatophyte strains do not fluoresce, so culture or PCR is needed.
EV: established | BSE is causally linked to variant Creutzfeldt-Jakob disease in humans.
T: Dermatophyte | A fungus that infects keratin in skin, hair or claws, causing ringworm
T: Prion | A misfolded host protein that causes other proteins to misfold and has no nucleic acid
T: Opportunistic pathogen | An organism that causes disease mainly when host defences are weakened
SUM: Ringworm is zoonotic.
SUM: Prions are misfolded proteins.
SUM: BSE and scrapie are notifiable.
SRC: Quinn P. J., Markey B. K., Leonard F. C., FitzPatrick E. S., Fanning S. and Hartigan P. J., Veterinary Microbiology and Microbial Disease, 2nd edition, Wiley-Blackwell | secondary | 2011
SRC: Moriello K. A., Coyner K., Paterson S. and Mignon B., Diagnosis and treatment of dermatophytosis in dogs and cats: clinical consensus guidelines of the World Association for Veterinary Dermatology, Veterinary Dermatology 28: 266-e68 | guidance | 2017
SRC: Department for Environment, Food and Rural Affairs, Bovine spongiform encephalopathy: how to spot and report the disease | guidance | 2024 | https://www.gov.uk/guidance/bovine-spongiform-encephalopathy-bse
Q: Which fungus is the commonest cause of ringworm in cats? | Microsporum canis.
Q: What do prions lack that all other infectious agents have? | Nucleic acid (DNA or RNA).
M1#veterinary-u06-03-q1@1: What causes ringworm in animals? | Dermatophyte fungi | Parasitic worms | Prion proteins | Enveloped viruses | Despite the name, ringworm is a fungal infection of keratin.
M2#veterinary-u06-03-q2@2: Why are prions hard to destroy? | They resist normal disinfection and heat | They are protected by a lipid envelope | They form bacterial spores in soil | They hide inside red blood cells | Misfolded PrP is very stable and survives standard sterilisation and cooking.
M2#veterinary-u06-03-q3@1: Which yeast commonly overgrows in canine otitis externa? | Malassezia pachydermatis | Aspergillus fumigatus | Trichophyton verrucosum | Cryptococcus neoformans | Malassezia is a peanut-shaped yeast that overgrows in inflamed ears.
M3#veterinary-u06-03-q4@3: A ewe shows itching, wool loss and incoordination, and the farmer suspects scrapie. What should happen next? | Report suspicion to APHA | Treat with an antifungal | Vaccinate the rest of the flock | Wait for the ewe to recover | Scrapie is a notifiable TSE, so suspicion must be reported to APHA.
SA2#veterinary-u06-03-q5@2,3: Explain what prions are and why BSE control relies on feed bans and removal of specified risk material. | Prions are misfolded forms of the host prion protein that have no nucleic acid and convert normal protein into the misfolded form, causing spongiform brain lesions. They resist cooking and standard disinfection, so they cannot be reliably destroyed in feed or food. BSE spread through feed containing infected material, so feed bans stopped transmission, and removing specified risk material at slaughter protects people from variant CJD. | Definition of prion ; Resistance ; Feed bans ; Specified risk material and public health

## Antimicrobial resistance
LV: Preclinical · Application
S: Antimicrobial resistance threatens both animal and human health. This lesson explains how bacteria become resistant, how resistance spreads between animals and people, and how vets use antimicrobials responsibly.
O: Explain the mechanisms of antimicrobial resistance
O: Describe how resistance spreads within and between species
O: Apply responsible use principles to veterinary prescribing
H: How resistance arises
P: **Antimicrobial resistance (AMR)** is the ability of a microorganism to survive an antimicrobial that would normally kill it or stop its growth. Some bacteria are **intrinsically resistant**, for example Gram-negative bacteria to penicillin G. Others **acquire resistance** through **mutation** or by gaining genes through **horizontal gene transfer**: **conjugation** (via **plasmids**), **transformation** (uptake of free DNA) and **transduction** (via bacteriophages). Resistance mechanisms include **enzymes** that destroy the drug, such as **beta-lactamases**, **altered targets**, as in **methicillin resistance** via the *mecA* gene, **efflux pumps** and **reduced permeability**. Every use of an antimicrobial applies **selection pressure** that favours resistant bacteria.
H: Spread and One Health
- Resistant bacteria and genes spread between animals, people and the environment, a **One Health** problem.
- Examples include **MRSA** and **MRSP** in companion animals and **ESBL-producing** *E. coli* in livestock.
- Transmission occurs through direct contact, food, manure and water.
- The UK **VARSS** report (Veterinary Antimicrobial Resistance and Sales Surveillance) tracks sales and resistance.
- **Highest-priority critically important antimicrobials (HP-CIAs)**, such as fluoroquinolones and third and fourth generation cephalosporins, are reserved for when nothing else will work.
H: Responsible use
- Use antimicrobials only when there is a clear indication, ideally confirmed by **culture and sensitivity**.
- Prefer **narrow-spectrum** drugs and topical treatment where appropriate.
- Follow the **BSAVA PROTECT ME** principles and **RUMA** guidance for farm animals.
- Improve **infection control**, vaccination and husbandry to reduce the need for antimicrobials.
- Do not use antimicrobials for prevention in groups of animals as routine.
- Record use and review outcomes.
X: Treating a dog with recurrent pyoderma.
> A dog has a skin infection that has not responded to a first-line antimicrobial.
> The vet takes a swab for culture and sensitivity rather than switching straight to a fluoroquinolone.
> The laboratory reports MRSP sensitive only to a few drugs, and the vet uses topical chlorhexidine alongside appropriate treatment.
> The vet also investigates the underlying allergy and advises hand hygiene for the family.
K: Antimicrobial resistance arises by mutation or horizontal gene transfer and works through enzymes, altered targets, efflux pumps and reduced permeability; it spreads between animals, people and the environment, so vets should prescribe only when indicated, use culture and sensitivity, prefer narrow-spectrum or topical treatment and reserve HP-CIAs.
!: Thinking resistance develops in the animal being treated. Bacteria become resistant; selection pressure favours resistant bacteria in every treated animal.
EV: established | Antimicrobial use in animals and humans selects for resistant bacteria that can spread between species.
T: Horizontal gene transfer | Movement of genes between bacteria by conjugation, transformation or transduction
T: Plasmid | A small circle of DNA that can carry resistance genes between bacteria
T: HP-CIA | Highest-priority critically important antimicrobial, reserved for essential use
SUM: Use selects for resistance.
SUM: Genes move between bacteria.
SUM: Culture first, narrow spectrum.
SRC: British Small Animal Veterinary Association, PROTECT ME: responsible antimicrobial use | guidance | 2024 | https://www.bsava.com
SRC: Veterinary Medicines Directorate, UK Veterinary Antibiotic Resistance and Sales Surveillance Report (UK-VARSS) | data | 2024 | https://www.gov.uk/government/collections/veterinary-antimicrobial-resistance-and-sales-surveillance
SRC: Responsible Use of Medicines in Agriculture Alliance, Targets Task Force Report | guidance | 2024 | https://www.ruma.org.uk
Q: What gene gives staphylococci methicillin resistance? | mecA.
Q: What is conjugation? | Transfer of DNA, often a plasmid, directly between bacteria.
M1#veterinary-u06-04-q1@1: Which process transfers plasmids directly between bacteria? | Conjugation | Transduction | Transformation | Sporulation | Conjugation uses direct contact between bacterial cells to pass plasmids.
M2#veterinary-u06-04-q2@2: How do beta-lactamases cause resistance? | They break down the antimicrobial | They pump the drug out of the cell | They alter ribosomes to block binding | They thicken the outer membrane | Beta-lactamases hydrolyse the beta-lactam ring of penicillins and cephalosporins.
SEQ2#veterinary-u06-04-q3@3: Put the steps of a responsible approach to a suspected bacterial infection in order. | Confirm a clear clinical indication ; Take samples for culture and sensitivity ; Choose a narrow-spectrum drug where possible ; Review response and outcome | Responsible use starts with indication and evidence and ends with review.
M3#veterinary-u06-04-q4@3: Which antimicrobial class should be reserved as a highest-priority critically important antimicrobial? | Fluoroquinolones | Narrow penicillins | Topical chlorhexidine | Potentiated sulphonamides | Fluoroquinolones are HP-CIAs and should be used only after sensitivity testing shows no alternative.
SA2#veterinary-u06-04-q5@2,3: Explain why antimicrobial resistance in animals is a One Health issue. | Resistant bacteria and their resistance genes can pass between animals, people and the environment through contact, food, manure and water. Organisms such as MRSA, MRSP and ESBL-producing *E. coli* are found in both animals and people. Antimicrobial use in any of these settings applies selection pressure, so responsible use in veterinary practice helps protect human medicine as well as animal health. | Spread between species ; Examples ; Selection pressure ; Shared responsibility

## Disinfection and sterilisation
LV: Preclinical · Application
S: Killing or removing microorganisms from surfaces, instruments and skin prevents infection in practices and on farms. This lesson explains the difference between cleaning, disinfection and sterilisation and how to choose the right method.
O: Distinguish cleaning, disinfection, antisepsis and sterilisation
O: Describe the main methods of sterilisation and classes of disinfectant
O: Choose an appropriate method for a given organism and setting
H: Key definitions
P: **Cleaning** removes dirt and organic matter, which is essential because **organic matter inactivates** many disinfectants. **Disinfection** reduces the number of microorganisms on surfaces to a safe level but may not kill spores. **Antisepsis** is disinfection of living tissue, such as surgical skin preparation with **chlorhexidine** or **povidone-iodine**. **Sterilisation** destroys all microorganisms, including **bacterial spores**. Organisms differ in resistance: **prions** are the most resistant, followed by **bacterial spores**, mycobacteria, **non-enveloped viruses**, fungi and vegetative bacteria, with **enveloped viruses** the easiest to kill.
H: Sterilisation methods
- **Autoclaving** (moist heat under pressure) is the standard method for surgical instruments and drapes.
- **Dry heat** is used for glassware and items that tolerate high temperatures.
- **Ethylene oxide** gas sterilises heat-sensitive items but is toxic and needs aeration.
- **Gamma irradiation** is used commercially for single-use items such as needles and syringes.
- **Indicators** (tape, chemical and biological) confirm that sterilising conditions were reached.
H: Disinfectant classes
- **Oxidising agents** such as peroxygens and **hypochlorite** (bleach) kill parvovirus when used correctly.
- **Quaternary ammonium compounds** work against many bacteria and enveloped viruses but are weak against non-enveloped viruses.
- **Alcohols** act fast on skin but do not kill spores.
- **Aldehydes** such as glutaraldehyde are broad-spectrum but irritant.
- On farms, **Defra-approved disinfectants** must be used at the approved dilution during notifiable disease outbreaks.
X: Cleaning a kennel after a parvovirus case.
> A puppy with confirmed parvovirus is moved to the isolation ward.
> Staff wear protective clothing and remove all faeces and bedding first.
> The kennel is washed with detergent, then disinfected with an oxidising agent effective against parvovirus, for the correct contact time.
> The kennel is rinsed and dried before reuse.
K: Cleaning removes organic matter, disinfection reduces microorganisms, antisepsis applies to living tissue and sterilisation destroys all life including spores; autoclaving is standard for instruments, and disinfectants must match the organism, with oxidising agents needed for resistant non-enveloped viruses such as parvovirus.
!: Spraying disinfectant onto dirty surfaces. Organic matter inactivates disinfectants, so surfaces must be cleaned first.
EV: established | Microorganisms vary predictably in resistance to disinfection, with prions and bacterial spores the most resistant and enveloped viruses the least.
T: Sterilisation | The destruction of all microorganisms, including bacterial spores
T: Antiseptic | A disinfectant safe for use on living tissue
T: Contact time | The time a disinfectant must stay on a surface to work
SUM: Clean before you disinfect.
SUM: Autoclave instruments.
SUM: Match disinfectant to organism.
SRC: Rutala W. A. and Weber D. J., Guideline for Disinfection and Sterilization in Healthcare Facilities, Centers for Disease Control and Prevention | guidance | 2008 | https://www.cdc.gov/infection-control/hcp/disinfection-sterilization/index.html
SRC: Department for Environment, Food and Rural Affairs, Disinfectants approved for use in England, Scotland and Wales | guidance | 2024 | https://www.gov.uk/guidance/defra-approved-disinfectants
Q: What is the standard method for sterilising surgical instruments? | Autoclaving with moist heat under pressure.
Q: Why must surfaces be cleaned before disinfection? | Organic matter inactivates many disinfectants.
M1#veterinary-u06-05-q1@1: What does sterilisation achieve that disinfection may not? | Killing bacterial spores | Removing visible dirt | Making skin safe for surgery | Killing enveloped viruses | Sterilisation destroys all microorganisms, including resistant spores.
M2#veterinary-u06-05-q2@2: Which disinfectant class is weak against canine parvovirus? | Quaternary ammonium compounds | Peroxygen oxidising agents | Sodium hypochlorite solutions | Accelerated hydrogen peroxide | Quaternary ammonium compounds work poorly against non-enveloped viruses.
SEQ1#veterinary-u06-05-q3@2: Order these organisms from most to least resistant to disinfection. | Prions ; Bacterial spores ; Non-enveloped viruses ; Enveloped viruses | Resistance falls from prions and spores down to enveloped viruses.
M3#veterinary-u06-05-q4@3: A farm is under restriction for a suspected notifiable disease. Which disinfectant should be used at the farm entrance? | A Defra-approved product at the approved dilution | Any household cleaner diluted with water | An alcohol hand rub sprayed on wheels | Whatever product the farm already holds | Defra-approved disinfectants are tested against specific diseases at specific dilutions.
SA2#veterinary-u06-05-q5@2,3: Explain how you would choose a disinfectant for a veterinary practice. | The choice depends on the organisms likely to be present: non-enveloped viruses such as parvovirus need an oxidising agent, while enveloped viruses are killed by most products. The product must be compatible with the surface, safe for staff and animals and used at the right dilution and contact time. Surfaces must be cleaned first because organic matter inactivates many disinfectants. | Target organisms ; Organism resistance ; Dilution and contact time ; Cleaning first and safety

## Nematodes of domestic animals
LV: Preclinical · Application
S: Nematodes, or roundworms, are the most important parasites of grazing livestock and common in pets. This lesson explains nematode biology and life cycles and describes key species in dogs, cats, ruminants and horses.
O: Describe the general biology and life cycle of nematodes
O: Identify important nematodes of each domestic species
O: Explain the disease and zoonotic risks they cause
H: Nematode biology
P: **Nematodes** are unsegmented roundworms with separate sexes and a complete gut. Most have a life cycle with **eggs** and **four larval stages** (L1 to L4) before adults, with **moults** between stages. **Direct life cycles** need only one host, as in most **trichostrongyles** of ruminants, where eggs pass in faeces and **L3** larvae on pasture are eaten. **Indirect life cycles** involve an **intermediate host**, such as the slug or snail for *Angiostrongylus vasorum*. Some larvae **arrest** in the host tissues (**hypobiosis**) and resume development later, causing disease such as **type II ostertagiosis** in young cattle in late winter or spring.
H: Key species by host
- **Dogs and cats**: *Toxocara canis* and *Toxocara cati* (roundworms), passed to puppies across the placenta and in milk.
- **Dogs**: *Angiostrongylus vasorum* (lungworm), causing respiratory signs and bleeding disorders.
- **Cattle**: *Ostertagia ostertagi* in the abomasum and *Dictyocaulus viviparus* (lungworm, husk).
- **Sheep**: *Teladorsagia circumcincta*, *Haemonchus contortus* (a blood-feeding worm causing anaemia) and *Nematodirus battus* in lambs.
- **Horses**: **cyathostomins** (small redworms) and *Parascaris* in foals.
H: Disease and zoonotic risk
- Heavy burdens cause **weight loss**, **diarrhoea**, **anaemia** and reduced growth.
- **Larval cyathostominosis** is a severe, sometimes fatal diarrhoea when encysted larvae emerge together.
- *Toxocara* eggs in soil can infect children, causing **visceral** or **ocular larva migrans**.
- *Nematodirus* hatching follows a cold spell then warm weather, and **SCOPS** issues spring hatch forecasts.
- Diagnosis uses **faecal egg counts**, the **Baermann** technique for lungworm larvae and blood tests.
X: Lungworm in a young dog.
> A young dog that eats slugs develops a cough and bruising after a minor injury.
> A Baermann test on faeces shows first-stage larvae, and an antigen test confirms *Angiostrongylus vasorum*.
> The dog is treated by the vet and monitored, because bleeding disorders can be fatal.
> The owner is advised about preventive parasite control and reducing slug exposure.
K: Nematodes are roundworms with egg and four larval stages, direct or indirect life cycles and sometimes arrested larvae; important species include *Toxocara* in pets, *Angiostrongylus* in dogs, *Ostertagia* and *Dictyocaulus* in cattle, *Teladorsagia*, *Haemonchus* and *Nematodirus* in sheep and cyathostomins in horses.
!: Assuming a negative faecal egg count means no worms. Arrested or immature larvae produce no eggs, so a count can be negative in serious disease.
EV: established | Toxocara canis is zoonotic and can cause ocular larva migrans in children.
T: Hypobiosis | Arrested development of larvae inside the host
T: Intermediate host | A host in which a parasite develops but does not reach adulthood
T: L3 | The third-stage larva, often the infective stage on pasture
SUM: Eggs, four larvae, adults.
SUM: Arrested larvae can cause disease later.
SUM: Toxocara is zoonotic.
SRC: Taylor M. A., Coop R. L. and Wall R. L., Veterinary Parasitology, 4th edition, Wiley-Blackwell | secondary | 2016
SRC: ESCCAP UK and Ireland, Worm control in dogs and cats: guideline 1 | guidance | 2024 | https://www.esccapuk.org.uk
SRC: Sustainable Control of Parasites in Sheep (SCOPS), Nematodirus forecast and guidance | guidance | 2024 | https://www.scops.org.uk
Q: What intermediate host does Angiostrongylus vasorum use? | Slugs and snails.
Q: What test detects lungworm larvae in faeces? | The Baermann technique.
M1#veterinary-u06-06-q1@1: Which nematode is a blood-feeding worm causing anaemia in sheep? | Haemonchus contortus | Nematodirus battus | Toxocara canis | Dictyocaulus viviparus | Haemonchus feeds on blood in the abomasum and can cause severe anaemia.
M2#veterinary-u06-06-q2@2: How are puppies commonly infected with Toxocara canis? | Across the placenta and in milk | By eating infected slugs | Through bites from ticks | From fleas while grooming | Arrested larvae in the bitch reactivate in pregnancy and pass to the pups.
MATCH2#veterinary-u06-06-q3@1: Match each nematode to its host. | Ostertagia ostertagi = Cattle ; Cyathostomins = Horses ; Teladorsagia circumcincta = Sheep ; Toxocara cati = Cats | Each nematode has a typical host species.
M3#veterinary-u06-06-q4@3: A yearling horse has sudden severe diarrhoea in late winter, but the faecal egg count is low. What is most likely? | Larval cyathostominosis | Toxocara infection | Lungworm infection | Haemonchus anaemia | Encysted cyathostomin larvae emerge together, causing disease before eggs are produced.
SA2#veterinary-u06-06-q5@2,3: Explain why faecal egg counts can be misleading in nematode disease. | Faecal egg counts detect eggs from adult female worms, so immature or arrested larvae produce no eggs. In type II ostertagiosis and larval cyathostominosis, severe disease is caused by larvae, and counts can be low or negative. Egg output also varies between species and over time, so counts should be interpreted with history, clinical signs and other tests. | Eggs come from adults ; Larval disease ; Examples ; Interpret with other evidence

## Cestodes and trematodes
LV: Preclinical · Application
S: Tapeworms and flukes are flatworms with complex life cycles that involve intermediate hosts. This lesson explains their biology, important species in UK animals, and their zoonotic and economic importance.
O: Describe the biology and life cycles of cestodes and trematodes
O: Identify important tapeworms and flukes of UK domestic animals
O: Explain the zoonotic and economic risks they pose
H: Flatworm biology
P: **Cestodes** (tapeworms) and **trematodes** (flukes) are **platyhelminths**, or flatworms. Adult **tapeworms** live in the gut of a **definitive host**, attaching by a **scolex** with suckers and often hooks, and have a body of segments (**proglottids**) full of eggs. Their larval stages develop in an **intermediate host**, often as cysts. **Flukes** are leaf-shaped, mostly **hermaphrodite**, and need a **snail** as an intermediate host. The liver fluke *Fasciola hepatica* lays eggs that hatch into **miracidia**, which infect the mud snail *Galba truncatula*; **cercariae** leave the snail and form **metacercariae** on grass, which are eaten by sheep and cattle.
H: Important tapeworms
- *Dipylidium caninum* in dogs and cats, transmitted by eating **fleas**.
- *Taenia* species in dogs, with cysts in sheep, cattle or rabbits.
- *Echinococcus granulosus* in dogs, with **hydatid cysts** in sheep and people, endemic in parts of Wales.
- *Echinococcus multilocularis* is absent from the UK; the **pet travel** tapeworm treatment rule keeps it out.
- *Anoplocephala perfoliata* in horses, linked to ileocaecal colic.
H: Flukes and their impact
- **Acute fasciolosis** in sheep in autumn: sudden death as immature flukes migrate through the liver.
- **Chronic fasciolosis**: anaemia, weight loss and **bottle jaw**, with reduced productivity.
- Wet summers increase snail habitat and fluke risk, so **fluke forecasts** guide control.
- **Rumen fluke** (*Calicophoron daubneyi*) is increasingly found in the UK.
- Liver condemnation at slaughter causes major economic loss.
X: Sudden deaths in a flock.
> In October, after a wet summer, several ewes on wet grazing die suddenly.
> Post-mortem examination shows swollen, haemorrhagic livers with tracks and immature flukes.
> The vet diagnoses acute fasciolosis and plans control using products active against immature flukes.
> The farmer is advised to fence off wet areas and to follow SCOPS and fluke forecast guidance.
K: Tapeworms have a scolex and proglottids and use intermediate hosts, with important species including *Dipylidium*, *Taenia*, *Echinococcus* and *Anoplocephala*, while flukes such as *Fasciola hepatica* use snails as intermediate hosts and cause acute and chronic liver disease in sheep and cattle.
!: Treating tapeworms in dogs without flea control. *Dipylidium* is acquired by eating fleas, so reinfection follows unless fleas are controlled.
EV: established | The life cycle of Fasciola hepatica depends on the mud snail Galba truncatula, so wet weather increases fluke risk.
T: Definitive host | The host in which a parasite reaches sexual maturity
T: Proglottid | A segment of a tapeworm containing reproductive organs and eggs
T: Metacercaria | The encysted infective stage of a fluke on vegetation
SUM: Tapeworms use intermediate hosts.
SUM: Liver fluke needs a mud snail.
SUM: Hydatid disease is zoonotic.
SRC: Taylor M. A., Coop R. L. and Wall R. L., Veterinary Parasitology, 4th edition, Wiley-Blackwell | secondary | 2016
SRC: Control of Worms Sustainably (COWS), Liver fluke control in cattle | guidance | 2024 | https://www.cattleparasites.org.uk
SRC: Department for Environment, Food and Rural Affairs, Bringing your pet dog, cat or ferret to Great Britain | guidance | 2024 | https://www.gov.uk/bring-pet-to-great-britain
Q: How do dogs acquire Dipylidium caninum? | By eating infected fleas.
Q: What is the intermediate host of Fasciola hepatica? | The mud snail Galba truncatula.
M1#veterinary-u06-07-q1@1: What is the segment of a tapeworm called? | Proglottid | Scolex | Cercaria | Miracidium | Proglottids carry the eggs and are shed in faeces.
M2#veterinary-u06-07-q2@2: Why is acute fasciolosis most common in autumn after a wet summer? | Snails thrive and metacercariae build up | Fleas breed faster in the warmth | Dogs pass more tapeworm eggs | Cold weather triggers egg hatching | Wet conditions favour the mud snail, so many metacercariae are eaten in late summer and autumn.
TF1#veterinary-u06-07-q3@2: Echinococcus multilocularis is endemic in UK foxes. | false | It is absent from the UK, and the pet travel tapeworm rule helps keep it out.
M3#veterinary-u06-07-q4@3: A farm dog fed raw sheep offal lives where hydatid disease occurs. What is the main public health concern? | Human hydatid cysts | Human ringworm | Canine lungworm | Bovine tuberculosis | Dogs fed infected offal carry Echinococcus granulosus, whose eggs can cause hydatid cysts in people.
SA2#veterinary-u06-07-q5@2,3: Describe the life cycle of Fasciola hepatica and explain how it informs control. | Adult flukes in the bile ducts of sheep and cattle lay eggs that pass in faeces and hatch into miracidia, which infect the mud snail. Cercariae leave the snail and encyst as metacercariae on grass, which are eaten by grazing animals and migrate through the liver. Control therefore uses fluke forecasts, fencing off wet snail habitat and choosing treatments active against the stages present at the time of year. | Stages in host ; Snail stage ; Metacercariae on grass ; Control linked to life cycle

## Ectoparasites: fleas, lice, mites and ticks
LV: Preclinical · Application
S: Ectoparasites live on or in the skin and cause itching, skin disease and the spread of infections. This lesson covers the biology, signs and diagnosis of fleas, lice, mites and ticks in UK animals.
O: Describe the biology of fleas, lice, mites and ticks
O: Recognise the clinical signs and diagnosis of ectoparasite infestations
O: Explain the role of ectoparasites as vectors of disease
H: Insects and arachnids
P: **Fleas** and **lice** are **insects** with six legs, while **mites** and **ticks** are **arachnids** with eight legs as adults. The cat flea, *Ctenocephalides felis*, is the commonest flea on both cats and dogs. Adult fleas live on the host, but **eggs, larvae and pupae** develop in the **environment**, which holds most of the population. **Lice** spend their whole life on one host and are species-specific; they are either **chewing** or **sucking** lice. **Mites** include burrowing species such as *Sarcoptes scabiei* and surface species such as *Otodectes cynotis*. **Ticks**, such as *Ixodes ricinus*, take long blood meals and drop off to moult in vegetation.
H: Clinical signs and diagnosis
- **Flea allergy dermatitis**: itching and papules over the lumbosacral area of dogs and cats.
- **Sarcoptic mange**: intense itching of ear margins, elbows and hocks; a **pinnal-pedal reflex** may be present.
- **Demodicosis**: hair loss, often in young dogs, linked to immune status; seen on **deep skin scrapes**.
- **Sheep scab** (*Psoroptes ovis*): intense itching and wool loss; diagnosed by skin scrape or **ELISA** blood test.
- **Coat brushing**, **flea combing**, the **wet paper test** for flea dirt, **tape strips** and **skin scrapes** confirm diagnosis.
H: Ectoparasites as vectors
- Fleas transmit *Dipylidium caninum* and *Bartonella henselae* (cat scratch disease).
- *Ixodes ricinus* transmits **Lyme borreliosis**, **tick-borne fever** and **louping ill**.
- *Dermacentor reticulatus* transmits **babesiosis**, now found in parts of England.
- Mites can carry infection between animals and some, such as *Sarcoptes*, cause transient itching in people.
- Pet travel rules and preventive treatment reduce entry of exotic tick-borne diseases.
X: An itchy dog with crusted ears.
> A dog from a rescue centre is intensely itchy, with crusts on the ear margins and elbows.
> Rubbing the ear margin makes the dog scratch with a hind leg: a positive pinnal-pedal reflex.
> Several deep skin scrapes are taken, and one shows *Sarcoptes scabiei* mites.
> The vet treats all in-contact dogs and warns the owner that people can get short-lived itchy lesions.
K: Fleas and lice are insects and mites and ticks are arachnids; fleas live mostly in the environment, lice stay on one host, mites cause mange and sheep scab, and ticks such as *Ixodes ricinus* transmit diseases including Lyme borreliosis, while diagnosis uses combing, scrapes, tape strips and blood tests.
!: Treating only the pet for fleas. Most of the flea population is eggs, larvae and pupae in the home, so the environment must be treated too.
EV: established | Most of a flea population exists as immature stages in the environment rather than on the host.
T: Pinnal-pedal reflex | A scratch reflex when the ear margin is rubbed, suggesting sarcoptic mange
T: Vector | An organism that carries a pathogen from one host to another
T: Flea dirt | Flea faeces made of digested blood, which turns red on wet paper
SUM: Fleas and lice are insects; mites and ticks are arachnids.
SUM: Treat the home for fleas.
SUM: Ticks carry Lyme disease and babesiosis.
SRC: Taylor M. A., Coop R. L. and Wall R. L., Veterinary Parasitology, 4th edition, Wiley-Blackwell | secondary | 2016
SRC: ESCCAP UK and Ireland, Control of ectoparasites in dogs and cats: guideline 3 | guidance | 2024 | https://www.esccapuk.org.uk
Q: Which flea species is commonest on UK dogs? | The cat flea, Ctenocephalides felis.
Q: Which tick transmits Lyme borreliosis in the UK? | Ixodes ricinus.
M1#veterinary-u06-08-q1@1: How many legs do adult ticks have? | Eight | Six | Four | Ten | Ticks are arachnids, so adults have eight legs.
M2#veterinary-u06-08-q2@2: What does the wet paper test detect? | Flea dirt | Lice eggs | Sarcoptes mites | Ringworm spores | Flea faeces contain digested blood, which dissolves into red streaks on wet paper.
MATCH2#veterinary-u06-08-q3@3: Match each ectoparasite to the disease it is linked with. | Psoroptes ovis = Sheep scab ; Dermacentor reticulatus = Babesiosis ; Ixodes ricinus = Lyme borreliosis ; Sarcoptes scabiei = Sarcoptic mange | These ectoparasites cause or transmit important UK diseases.
M3#veterinary-u06-08-q4@3: A cat has papules over its lower back and the owner has flea bites, but no fleas are found on the cat. What is the best next step? | Comb for flea dirt and treat the home | Assume no fleas and stop treatment | Take a skin biopsy straight away | Test the cat for ringworm only | Fleas are often hard to find, and most of the population is in the environment.
SA2#veterinary-u06-08-q5@2,3: Explain why flea control must include the environment. | Adult fleas live on the animal, but they lay eggs that fall into the home, where larvae and pupae develop. These immature stages make up most of the flea population and pupae can survive for months. Treating only the pet means new adults keep emerging, so control combines treatment of all pets with environmental treatment and regular vacuuming. | Adult on host ; Immature stages in home ; Proportion of population ; Combined control

## Protozoa
LV: Preclinical · Application
S: Protozoa are single-celled eukaryotic parasites that cause diarrhoea, abortion and blood disease in animals. This lesson explains protozoal life cycles and the most important species in UK practice, including zoonoses.
O: Describe the main groups and life cycles of protozoa
O: Identify important protozoal diseases of UK domestic animals
O: Explain the zoonotic risks of protozoa
H: Protozoal groups
P: **Protozoa** are single-celled **eukaryotes**. The **Apicomplexa** include *Eimeria*, *Cryptosporidium*, *Toxoplasma*, *Neospora* and *Babesia*, many of which have complex cycles of **asexual** and **sexual** reproduction. *Eimeria* species cause **coccidiosis**, multiplying in gut cells and passing **oocysts** in faeces, which **sporulate** in the environment and become infective. **Flagellates** include *Giardia*, which causes diarrhoea in dogs, cats and calves. Many protozoa are **host-specific**, but some, such as *Toxoplasma gondii*, infect almost all warm-blooded animals.
H: Important protozoal diseases
- **Coccidiosis** (*Eimeria*): diarrhoea and poor growth in lambs, calves, poultry and rabbits.
- **Cryptosporidiosis** (*Cryptosporidium parvum*): scour in young calves and a **zoonosis**.
- **Neosporosis** (*Neospora caninum*): a major cause of **abortion in cattle**, with dogs as definitive hosts.
- **Toxoplasmosis** (*Toxoplasma gondii*): abortion in sheep, with **cats** as definitive hosts.
- **Babesiosis** (*Babesia*): tick-borne destruction of red blood cells, causing anaemia and red urine.
- **Giardiasis**: chronic or intermittent diarrhoea in dogs and cats.
H: Zoonotic and public health risks
- *Toxoplasma* can harm the unborn child if a pregnant woman is infected for the first time.
- Cat litter should be changed daily, because oocysts take more than a day to sporulate.
- Pregnant women should avoid lambing ewes, because of *Toxoplasma*, *Chlamydia* and other abortion agents.
- *Cryptosporidium* causes outbreaks in children visiting farms, so hand washing is vital.
- Oocysts resist many disinfectants, so hygiene and cleaning are key.
X: Abortions in a dairy herd.
> A dairy herd has several abortions at five to six months of pregnancy.
> Fetal brain and heart samples are sent to the laboratory, and lesions and PCR confirm *Neospora caninum*.
> Blood testing shows seropositive cows that are likely to pass infection to their calves.
> The vet advises stopping farm dogs from eating placentas and aborted fetuses and keeping dog faeces out of feed.
K: Protozoa are single-celled eukaryotes, including the Apicomplexa and flagellates; important UK diseases are coccidiosis, cryptosporidiosis, neosporosis, toxoplasmosis, babesiosis and giardiasis, and zoonotic species such as *Toxoplasma* and *Cryptosporidium* need hygiene and advice for pregnant women and farm visitors.
!: Thinking cats are the only host of Toxoplasma. Cats are the definitive host, but almost all warm-blooded animals, including sheep and people, can be intermediate hosts.
EV: established | Neospora caninum is a major cause of bovine abortion worldwide, and dogs are its definitive host.
T: Oocyst | A thick-walled stage of apicomplexan protozoa passed in faeces
T: Sporulation | Development of an oocyst in the environment into an infective form
T: Apicomplexa | A group of protozoa with a specialised apical complex for entering host cells
SUM: Oocysts pass in faeces.
SUM: Neospora and Toxoplasma cause abortion.
SUM: Cryptosporidium is zoonotic.
SRC: Taylor M. A., Coop R. L. and Wall R. L., Veterinary Parasitology, 4th edition, Wiley-Blackwell | secondary | 2016
SRC: Dubey J. P., Schares G. and Ortega-Mora L. M., Epidemiology and control of neosporosis and Neospora caninum, Clinical Microbiology Reviews 20: 323-367 | primary | 2007
SRC: UK Health Security Agency, Pregnant women advised to avoid contact with animals that are giving birth | guidance | 2024 | https://www.gov.uk/government/news/pregnant-women-advised-to-avoid-contact-with-animals-that-are-giving-birth
Q: What is the definitive host of Neospora caninum? | The dog.
Q: Why should cat litter be changed daily during pregnancy? | Toxoplasma oocysts take more than a day to become infective.
M1#veterinary-u06-09-q1@1: Which protozoan causes coccidiosis? | Eimeria | Giardia | Babesia | Neospora | Eimeria species multiply in gut cells and cause coccidiosis.
M2#veterinary-u06-09-q2@2: How is Babesia transmitted? | By ticks | By fleas | By eating placentas | By drinking milk | Babesia is a tick-borne parasite of red blood cells.
TF2#veterinary-u06-09-q3@3: Cryptosporidium parvum from calves can cause diarrhoea in people. | true | It is a zoonosis, and outbreaks follow farm visits without proper hand washing.
M3#veterinary-u06-09-q4@3: A pregnant farm worker asks whether she should help with lambing. What is the best advice? | Avoid lambing ewes during pregnancy | Help but wear thin gloves only | Help only with twin lambs | Help after a single hand wash | UKHSA advises pregnant women to avoid lambing because of Toxoplasma, Chlamydia and other agents.
SA2#veterinary-u06-09-q5@2,3: Explain how Neospora caninum causes abortion in cattle and how farms can control it. | Dogs are the definitive host and shed oocysts that contaminate feed or water, and cattle eating them become infected. Infected cows can also pass infection across the placenta to their calves, which may be aborted or born infected. Control includes keeping dogs away from placentas and aborted fetuses, protecting feed from dog faeces and considering not breeding replacements from seropositive cows. | Dog as definitive host ; Horizontal infection ; Vertical transmission ; Control measures

## Parasite control and anthelmintic resistance
LV: Clinical · Application
S: Parasite control keeps animals healthy and productive, but overuse of wormers has bred resistant worms. This lesson explains anthelmintic classes, how resistance develops and how sustainable control programmes such as SCOPS and COWS slow it.
O: Identify the main anthelmintic classes used in UK livestock
O: Explain how anthelmintic resistance develops and is detected
O: Apply sustainable parasite control principles to a farm or yard
H: Anthelmintic classes and resistance
P: In UK ruminants, broad-spectrum wormers fall into five groups: **1-BZ** (benzimidazoles, white drenches), **2-LM** (levamisole and morantel, yellow), **3-ML** (macrocyclic lactones such as ivermectin, clear), **4-AD** (monepantel, orange) and **5-SI** (derquantel, purple). **Anthelmintic resistance** is the heritable ability of worms to survive a treatment that would normally kill them. Every treatment kills susceptible worms, so survivors pass on resistance genes. Resistance is widespread in sheep nematodes such as *Teladorsagia* and *Haemonchus* and in cyathostomins of horses, and multi-drug resistance is increasing. The key idea for slowing it is **refugia**: the part of the worm population not exposed to treatment, such as larvae on pasture and worms in untreated animals, which keeps susceptible genes in the population.
H: Detecting resistance
- The **faecal egg count reduction test (FECRT)** compares egg counts before and after treatment.
- A reduction below about 95 percent suggests resistance in sheep and cattle, with group-specific thresholds in horses.
- A **post-drench check** on a few animals is a quick screen for treatment failure.
- Failure may also come from **under-dosing**, poor technique or the wrong product, so these must be ruled out.
- Laboratory tests such as larval development assays support investigation.
H: Sustainable control
- **SCOPS** (sheep) and **COWS** (cattle) give UK guidance on sustainable parasite control.
- Use **faecal egg counts** to decide when and which animals to treat (**targeted selective treatment**).
- Leave some animals untreated to maintain **refugia**.
- **Quarantine** treatments for bought-in sheep prevent importing resistant worms.
- Treat with the correct product for the parasite and weigh animals rather than guessing.
- Use grazing management, rotating groups and pasture use, and keep records.
X: Reviewing a sheep flock's worming.
> A farmer treats all lambs every three weeks with the same group of wormer, but lambs still scour and grow poorly.
> The vet arranges a faecal egg count reduction test, which shows only a 70 percent fall after treatment.
> The vet explains that the worms are resistant to that group and recommends treating only lambs that need it.
> A quarantine plan is agreed for bought-in rams, following SCOPS guidance.
K: UK ruminant wormers fall into five groups (1-BZ, 2-LM, 3-ML, 4-AD and 5-SI); resistance develops because treatment selects resistant worms, is detected by the faecal egg count reduction test and is slowed by SCOPS and COWS principles such as faecal egg counts, targeted treatment, refugia and quarantine.
!: Worming all animals as often as possible to be safe. Frequent whole-group treatment removes refugia and speeds resistance.
EV: established | Anthelmintic resistance in sheep nematodes is widespread in the UK.
EV: contested | The best proportion of animals to leave untreated to preserve refugia varies with farm, season and parasite species.
T: Anthelmintic resistance | The heritable ability of worms to survive a normally effective treatment
T: Refugia | The part of a parasite population not exposed to treatment
T: FECRT | Faecal egg count reduction test, used to detect treatment failure
SUM: Treatment selects resistant worms.
SUM: Refugia slow resistance.
SUM: Test before you treat.
SRC: Sustainable Control of Parasites in Sheep (SCOPS), Technical manual for veterinary surgeons and advisers | guidance | 2024 | https://www.scops.org.uk
SRC: Control of Worms Sustainably (COWS), Roundworm control in cattle | guidance | 2024 | https://www.cattleparasites.org.uk
SRC: Kaplan R. M., Drug resistance in nematodes of veterinary importance: a status report, Trends in Parasitology 20: 477-481 | primary | 2004
Q: What colour code is used for 3-ML wormers? | Clear.
Q: What is refugia? | The part of the worm population not exposed to treatment.
M1#veterinary-u06-10-q1@1: Which anthelmintic group are macrocyclic lactones such as ivermectin? | 3-ML | 1-BZ | 2-LM | 4-AD | Macrocyclic lactones are group 3-ML, the clear drenches.
M2#veterinary-u06-10-q2@2: Why does leaving some animals untreated slow resistance? | It keeps susceptible worms in the population | It lets the drug build up in the soil | It makes the worms lay fewer eggs | It stops larvae from reaching pasture | Untreated worms in refugia dilute resistance genes in the next generation.
NUM2#veterinary-u06-10-q3@3: A group of lambs has a mean faecal egg count of 800 eggs per gram before treatment and 200 eggs per gram after. What is the percentage reduction? | 75 | 0 | % | The reduction is (800 minus 200) divided by 800, which is 0.75, or 75 percent, below 95 and suggesting resistance.
M3#veterinary-u06-10-q4@3: A farmer buys in ten rams from another farm. Which step best protects the flock from importing resistant worms? | A quarantine treatment and isolation | Turning them straight onto clean grass | Worming the whole home flock that day | Using last year's leftover wormer | SCOPS quarantine advice stops resistant worms reaching home pasture.
SA2#veterinary-u06-10-q5@2,3: Explain how a farm can slow anthelmintic resistance. | Resistance develops because every treatment kills susceptible worms and leaves resistant survivors to breed. Farms can slow it by using faecal egg counts to treat only when and where needed, leaving some animals untreated to keep refugia and weighing animals so the full dose is given. Bought-in animals should be quarantined and treated, and grazing management and regular resistance testing help guide product choice. | Selection mechanism ; Targeted treatment ; Refugia ; Quarantine and testing

## Innate immunity
LV: Preclinical · Foundation
S: Innate immunity is the body's first, fast and non-specific defence against infection. This lesson explains barriers, innate cells, pattern recognition and the complement system.
O: Describe the physical and chemical barriers to infection
O: Explain the roles of innate immune cells and pattern recognition receptors
O: Describe the functions of the complement system
H: Barriers and recognition
P: **Innate immunity** acts within minutes to hours, does not need prior exposure and does not create memory. The first line is **physical and chemical barriers**: intact **skin**, **mucus**, the **mucociliary escalator** of the airways, **stomach acid**, **lysozyme** in tears and the normal **microbiota**, which competes with pathogens. When microbes break through, innate cells detect **pathogen-associated molecular patterns (PAMPs)**, such as bacterial LPS, using **pattern recognition receptors** such as **Toll-like receptors (TLRs)**. Recognition triggers release of **cytokines** such as interleukin-1, interleukin-6 and **tumour necrosis factor**, which drive inflammation and **fever**.
H: Innate cells
- **Neutrophils**: the first cells to arrive, phagocytosing and killing bacteria.
- **Macrophages**: phagocytose, release cytokines and present antigen to T cells.
- **Dendritic cells**: capture antigen and carry it to lymph nodes, linking innate and adaptive immunity.
- **Natural killer (NK) cells**: kill virus-infected and tumour cells.
- **Mast cells** and **eosinophils**: important against parasites and in allergy.
H: Complement and the acute phase response
- **Complement** is a cascade of plasma proteins activated by the classical, lectin or alternative pathways.
- It **opsonises** microbes with C3b, making phagocytosis easier.
- It attracts cells through **anaphylatoxins** such as C5a.
- It forms the **membrane attack complex**, which punches holes in some bacteria.
- The liver produces **acute phase proteins**, such as C-reactive protein in dogs and serum amyloid A in horses, used as markers of inflammation.
X: Defence against a skin wound.
> A dog cuts its paw, and soil bacteria enter the wound.
> Macrophages in the tissue recognise LPS via Toll-like receptors and release cytokines.
> Neutrophils arrive within hours, and complement coats the bacteria for phagocytosis.
> Dendritic cells carry antigen to the local lymph node, starting an adaptive response.
K: Innate immunity is fast and non-specific, relying on barriers, pattern recognition of PAMPs by receptors such as TLRs, cells including neutrophils, macrophages, dendritic cells and NK cells, and complement, which opsonises, attracts cells and lyses microbes.
!: Thinking innate immunity has no link to adaptive immunity. Dendritic cells and macrophages present antigen and start the adaptive response.
EV: established | Toll-like receptors recognise conserved microbial molecules and trigger innate immune responses.
T: PAMP | A pathogen-associated molecular pattern recognised by innate receptors
T: Opsonisation | Coating a microbe with molecules that make phagocytosis easier
T: Acute phase protein | A liver protein whose blood level changes during inflammation
SUM: Barriers come first.
SUM: TLRs recognise PAMPs.
SUM: Complement opsonises and lyses.
SRC: Tizard I. R., Veterinary Immunology, 11th edition, Elsevier | secondary | 2023
SRC: Day M. J. and Schultz R. D., Veterinary Immunology: Principles and Practice, 2nd edition, CRC Press | secondary | 2014
Q: Which complement fragment opsonises bacteria? | C3b.
Q: Which cells link innate and adaptive immunity by carrying antigen to lymph nodes? | Dendritic cells.
M1#veterinary-u06-11-q1@1: Which receptors recognise bacterial LPS? | Toll-like receptors | T cell receptors | B cell receptors | Fc receptors | Toll-like receptors are pattern recognition receptors for conserved microbial molecules.
M2#veterinary-u06-11-q2@2: What does the membrane attack complex do? | Punches holes in bacterial membranes | Marks antigens for B cells | Releases histamine from mast cells | Carries antigen to lymph nodes | The terminal complement proteins form pores that lyse some bacteria.
MATCH2#veterinary-u06-11-q3@2: Match each innate cell to its main role. | Neutrophil = First phagocyte to arrive ; NK cell = Kills virus-infected cells ; Dendritic cell = Carries antigen to lymph nodes ; Eosinophil = Defence against parasites | Each innate cell type has a distinct role in early defence.
M3#veterinary-u06-11-q4@3: A horse has colitis, and serum amyloid A is markedly raised. What does this indicate? | Active systemic inflammation | Normal liver function only | Recent successful vaccination | A purely viral infection | Serum amyloid A is a major acute phase protein in horses that rises quickly in inflammation.
SA2#veterinary-u06-11-q5@1,2: Describe how innate immunity responds when bacteria enter a wound. | Bacteria first breach the skin barrier, then tissue macrophages recognise PAMPs such as LPS through Toll-like receptors and release cytokines. Cytokines cause inflammation and attract neutrophils, which phagocytose bacteria, helped by complement opsonisation with C3b. Dendritic cells take antigen to the local lymph node, which starts the adaptive immune response. | Barrier breach ; Recognition and cytokines ; Neutrophils and complement ; Link to adaptive immunity

## Adaptive immunity
LV: Preclinical · Application
S: Adaptive immunity is specific, slower to start and creates memory. This lesson explains antigen presentation, the roles of T cell subsets and how immunological memory underpins long-term protection.
O: Describe antigen presentation by MHC class I and class II molecules
O: Explain the roles of helper, cytotoxic and regulatory T cells
O: Explain primary and secondary immune responses and memory
H: Antigen presentation
P: **Adaptive immunity** is carried out by **lymphocytes**: **T cells**, which mature in the **thymus**, and **B cells**, which mature in the bone marrow or, in birds, the **bursa of Fabricius**. Each lymphocyte has a receptor for one specific **antigen**. T cells recognise antigen only when it is presented on **major histocompatibility complex (MHC)** molecules. **MHC class I** is on almost all nucleated cells and presents peptides from inside the cell, such as viral proteins, to **CD8+ cytotoxic T cells**. **MHC class II** is on **antigen-presenting cells** (dendritic cells, macrophages and B cells) and presents peptides from engulfed microbes to **CD4+ helper T cells**. **Clonal selection** means that only lymphocytes matching the antigen multiply.
H: T cell subsets
- **Th1 cells** activate macrophages and support cell-mediated immunity against intracellular pathogens such as mycobacteria.
- **Th2 cells** help B cells and drive responses against parasites, and are involved in allergy.
- **Th17 cells** recruit neutrophils against extracellular bacteria and fungi.
- **Cytotoxic T cells** kill virus-infected and tumour cells.
- **Regulatory T cells** dampen responses and prevent autoimmunity.
H: Primary and secondary responses
- The **primary response** to a new antigen takes about one to two weeks to peak.
- **Memory B and T cells** persist after infection or vaccination.
- The **secondary response** is faster, larger and longer-lasting, with better antibodies.
- This is the basis of **booster vaccination**.
- Cell-mediated immunity is measured in cattle by the **tuberculin skin test** and the **interferon-gamma** blood test.
X: Responding to a virus.
> A cat is infected with feline calicivirus, which replicates inside cells of the mouth.
> Infected cells display viral peptides on MHC class I, and CD8+ cytotoxic T cells kill them.
> Dendritic cells present viral antigen on MHC class II to CD4+ helper T cells, which help B cells make antibody.
> Memory cells remain, so a later exposure produces a faster response.
K: Adaptive immunity uses specific T and B lymphocytes; MHC class I presents internal antigens to CD8+ cytotoxic T cells and MHC class II presents engulfed antigens to CD4+ helper T cells, T helper subsets direct the response, and memory cells give faster, larger secondary responses.
!: Thinking T cells recognise free antigen. T cells recognise only peptide presented on MHC molecules; B cells recognise free antigen.
EV: established | Immunological memory gives faster and stronger secondary responses, which is the basis of vaccination.
T: MHC | Major histocompatibility complex molecules that present peptides to T cells
T: Clonal selection | Multiplication of only the lymphocytes whose receptor matches the antigen
T: Bursa of Fabricius | The organ where B cells mature in birds
SUM: MHC I to CD8, MHC II to CD4.
SUM: Helper subsets direct the response.
SUM: Memory makes boosters work.
SRC: Tizard I. R., Veterinary Immunology, 11th edition, Elsevier | secondary | 2023
SRC: Murphy K. and Weaver C., Janeway's Immunobiology, 9th edition, Garland Science | secondary | 2016
SRC: Animal and Plant Health Agency, Bovine TB: testing cattle and the tuberculin skin test | guidance | 2024 | https://www.gov.uk/guidance/bovine-tb-testing-cattle-in-great-britain
Q: Which cells present antigen on MHC class II? | Antigen-presenting cells: dendritic cells, macrophages and B cells.
Q: Where do B cells mature in birds? | The bursa of Fabricius.
M1#veterinary-u06-12-q1@1: Which T cells recognise antigen on MHC class I? | CD8+ cytotoxic T cells | CD4+ helper T cells | Regulatory T cells | Th17 cells | MHC class I presents internal peptides to CD8+ T cells.
M2#veterinary-u06-12-q2@2: Which T helper subset is most important against mycobacteria? | Th1 | Th2 | Th17 | Regulatory | Th1 cells activate macrophages to kill intracellular bacteria.
TF2#veterinary-u06-12-q3@2: The secondary immune response is slower than the primary response. | false | Memory cells make the secondary response faster, larger and longer-lasting.
M3#veterinary-u06-12-q4@3: Why does the tuberculin skin test detect cattle infected with Mycobacterium bovis? | It detects a memory cell-mediated response | It measures antibody against TB in milk | It grows bacteria directly from the skin | It finds endotoxin in the bloodstream | Infected cattle have sensitised T cells that react to tuberculin with local swelling.
SA2#veterinary-u06-12-q5@1,2: Compare the roles of MHC class I and MHC class II in antigen presentation. | MHC class I is found on almost all nucleated cells and presents peptides from proteins made inside the cell, such as viral proteins. It is recognised by CD8+ cytotoxic T cells, which kill the infected cell. MHC class II is found on antigen-presenting cells and presents peptides from engulfed microbes to CD4+ helper T cells, which coordinate the response by helping B cells and activating macrophages. | MHC I location and source ; CD8 killing ; MHC II location and source ; CD4 help

## Antibodies and the humoral response
LV: Preclinical · Application
S: Antibodies are the effector molecules of humoral immunity. This lesson explains antibody structure, the classes of immunoglobulin, how B cells make antibodies and how antibodies are used in diagnostic tests.
O: Describe the structure and classes of antibodies
O: Explain how B cells are activated and produce antibodies
O: Interpret the use of antibodies in serological tests
H: Antibody structure and classes
P: An **antibody**, or **immunoglobulin (Ig)**, is a Y-shaped protein of two **heavy chains** and two **light chains**. The two **Fab** arms carry **variable regions** that bind a specific **epitope** on an antigen, while the **Fc** region interacts with cells and complement. **IgM** is the first antibody made in a primary response and is a large pentamer that activates complement well. **IgG** is the main antibody in blood and the main antibody in colostrum of most domestic species. **IgA** protects mucosal surfaces and is secreted in milk, saliva and gut fluids. **IgE** binds mast cells and is involved in **parasite defence** and **allergy**. **IgD** acts mainly as a B cell receptor.
H: B cell activation
- B cells bind antigen through their surface antibody.
- With help from **CD4+ helper T cells**, they multiply and become **plasma cells**, which secrete antibody.
- **Class switching** changes production from IgM to IgG, IgA or IgE.
- **Affinity maturation** in germinal centres produces antibodies that bind more strongly over time.
- Some B cells become **memory B cells**.
H: How antibodies protect and are used in tests
- **Neutralisation**: blocking viruses and toxins from binding cells.
- **Opsonisation**: coating microbes for phagocytosis via Fc receptors.
- **Complement activation** and **antibody-dependent cellular cytotoxicity**.
- **ELISA** tests detect antibody or antigen; examples include FIV antibody and BVD antigen tests.
- **Paired sera** taken two to four weeks apart showing a fourfold rise in titre suggest recent infection.
- Positive antibody results can reflect **vaccination** or **maternal antibody**, not just infection.
X: Interpreting paired sera.
> A herd of calves has a respiratory outbreak, and the vet takes blood from several calves.
> Samples are repeated three weeks later.
> Antibody titres to bovine respiratory syncytial virus rise fourfold or more in several calves.
> This suggests recent infection with that virus, supporting the diagnosis and vaccination planning.
K: Antibodies are Y-shaped immunoglobulins with antigen-binding Fab arms and an Fc region; IgM comes first, IgG dominates blood and colostrum, IgA protects mucosae and IgE drives parasite defence and allergy, and plasma cells make antibodies that neutralise, opsonise and activate complement, which serological tests detect.
!: Reading a single positive antibody test as proof of current infection. Antibody can reflect past infection, vaccination or maternal transfer, so history and paired sera matter.
EV: established | IgM is produced first in a primary response, followed by class switching to IgG.
T: Epitope | The part of an antigen bound by an antibody
T: Plasma cell | A differentiated B cell that secretes large amounts of antibody
T: Titre | The highest dilution of serum that still gives a positive result
SUM: IgM first, then IgG.
SUM: IgA on mucosae, IgE in allergy.
SUM: Paired sera show recent infection.
SRC: Tizard I. R., Veterinary Immunology, 11th edition, Elsevier | secondary | 2023
SRC: Day M. J. and Schultz R. D., Veterinary Immunology: Principles and Practice, 2nd edition, CRC Press | secondary | 2014
Q: Which immunoglobulin class is first produced in a primary response? | IgM.
Q: What does a fourfold rise in titre in paired sera suggest? | Recent infection.
M1#veterinary-u06-13-q1@1: Which antibody class mainly protects mucosal surfaces? | IgA | IgE | IgM | IgD | IgA is secreted onto mucosae and into milk, saliva and the gut.
M2#veterinary-u06-13-q2@2: What does class switching achieve? | It changes IgM to other antibody classes | It moves B cells from blood to thymus | It turns T cells into plasma cells | It stops antibodies binding complement | Class switching changes the heavy chain so B cells make IgG, IgA or IgE.
NUM2#veterinary-u06-13-q3@3: A calf's antibody titre is 1:40 in the first sample and 1:320 three weeks later. By how many fold has the titre risen? | 8 | 0 | – | The titre rose from 40 to 320, which is 320 divided by 40, an 8 fold rise, more than the fourfold rise that suggests recent infection.
M3#veterinary-u06-13-q4@3: A 10-week-old kitten tests positive on an FIV antibody test. Why is this hard to interpret? | Maternal antibody may be present | FIV antibody means the kitten is immune | The test only detects antigen | Kittens never produce antibodies | Kittens can carry maternal FIV antibody for months, so retesting later is needed.
SA2#veterinary-u06-13-q5@2,3: Explain why a positive antibody test does not always mean an animal is currently infected. | Antibodies remain after an infection has cleared, so a positive result may reflect past exposure. Vaccination also produces antibodies, and young animals may carry maternal antibodies from colostrum or across the placenta. To identify recent infection, vets use paired sera to look for a rising titre, IgM tests or antigen and PCR tests, interpreted with the history. | Past infection ; Vaccination ; Maternal antibody ; Paired sera or other tests

## Hypersensitivity and autoimmunity
LV: Clinical · Application
S: The immune system can cause disease when it overreacts or attacks the body's own tissues. This lesson explains the four types of hypersensitivity with veterinary examples and the main autoimmune diseases of domestic animals.
O: Describe the four types of hypersensitivity
O: Identify veterinary examples of each type
O: Recognise common autoimmune diseases and when to escalate
H: The four types
P: The **Gell and Coombs classification** describes four types of **hypersensitivity**. **Type I** (immediate) is mediated by **IgE** on mast cells, which release **histamine** within minutes, causing allergy and **anaphylaxis**. **Type II** (cytotoxic) is caused by antibodies binding antigens on cells, leading to their destruction, as in **neonatal isoerythrolysis** and **immune-mediated haemolytic anaemia**. **Type III** (immune complex) occurs when antibody-antigen complexes deposit in vessels, joints or kidneys, causing inflammation. **Type IV** (delayed) is mediated by **T cells** and takes 24 to 72 hours, as in **allergic contact dermatitis** and the **tuberculin test**.
H: Veterinary examples
- **Type I**: canine **atopic dermatitis**, insect bite hypersensitivity (**sweet itch**) in horses, and vaccine or drug anaphylaxis.
- **Type II**: neonatal isoerythrolysis in foals and kittens when maternal colostral antibodies attack the newborn's red cells.
- **Type III**: immune complex **glomerulonephritis**, and **purpura haemorrhagica** after strangles in horses.
- **Type IV**: allergic contact dermatitis and the tuberculin skin reaction.
- Type I reactions and anaphylaxis are emergencies needing immediate veterinary treatment.
H: Autoimmune disease
- **Autoimmunity** is an immune response against self antigens, from failure of **tolerance**.
- **Immune-mediated haemolytic anaemia (IMHA)**: destruction of red cells, often in dogs, with an **ACVIM consensus statement** guiding diagnosis.
- **Immune-mediated thrombocytopenia**: bleeding from low platelets.
- **Pemphigus foliaceus**: crusting skin disease in dogs, cats and horses.
- **Acquired myasthenia gravis**: antibodies against acetylcholine receptors, causing weakness and megaoesophagus.
- Sudden pale gums, weakness or collapse needs urgent veterinary attention.
X: A foal with neonatal isoerythrolysis.
> A healthy Thoroughbred foal becomes weak and jaundiced at 36 hours old.
> The mare had been sensitised to the foal's red cell antigens in an earlier pregnancy.
> Antibodies absorbed from colostrum are destroying the foal's red cells, a type II reaction.
> The foal needs urgent veterinary care, and future foals are kept from the mare's colostrum until tested.
K: Type I hypersensitivity is IgE and mast cell mediated, type II is antibody against cells, type III is immune complex deposition and type IV is T cell mediated and delayed; autoimmune diseases such as IMHA, pemphigus foliaceus and myasthenia gravis result from loss of tolerance and often need urgent care.
!: Thinking all allergies are type I. Allergic contact dermatitis is type IV, mediated by T cells over 24 to 72 hours.
EV: established | Neonatal isoerythrolysis in foals and kittens is caused by colostral alloantibodies against the newborn's red cells.
T: Anaphylaxis | A severe, life-threatening type I reaction affecting the whole body
T: Tolerance | Failure of the immune system to react against self antigens
T: Alloantibody | An antibody against antigens from another individual of the same species
SUM: Four Gell and Coombs types.
SUM: Neonatal isoerythrolysis is type II.
SUM: Autoimmunity is loss of tolerance.
SRC: Tizard I. R., Veterinary Immunology, 11th edition, Elsevier | secondary | 2023
SRC: Garden O. A., Kidd L., Mexas A. M. and others, ACVIM consensus statement on the diagnosis of immune-mediated hemolytic anemia in dogs and cats, Journal of Veterinary Internal Medicine 33: 313-334 | guidance | 2019
SRC: Gell P. G. H. and Coombs R. R. A., Clinical Aspects of Immunology, Blackwell Scientific | primary | 1963
Q: Which hypersensitivity type is mediated by IgE? | Type I.
Q: What type of hypersensitivity is purpura haemorrhagica after strangles? | Type III, immune complex.
M1#veterinary-u06-14-q1@1: Which hypersensitivity type is delayed and T cell mediated? | Type IV | Type I | Type II | Type III | Type IV reactions take 24 to 72 hours and are driven by T cells.
M2#veterinary-u06-14-q2@2: What causes neonatal isoerythrolysis in kittens? | Colostral antibodies against kitten red cells | IgE binding to kitten mast cells | Immune complexes in kitten kidneys | T cells attacking kitten skin | Type B queens have antibodies against type A red cells that pass to kittens in colostrum.
MATCH2#veterinary-u06-14-q3@2: Match each disease to its hypersensitivity type. | Atopic dermatitis = Type I ; Neonatal isoerythrolysis = Type II ; Immune complex glomerulonephritis = Type III ; Allergic contact dermatitis = Type IV | Each disease reflects a different immune mechanism.
M3#veterinary-u06-14-q4@3: A dog collapses with pale gums and jaundice, and its red cells clump on a saline agglutination test. What should happen? | Urgent assessment for IMHA by a vet | Book a routine appointment next week | Give the dog extra food and rest | Start flea treatment and wait | Autoagglutination suggests IMHA, a life-threatening emergency needing urgent veterinary care.
SA2#veterinary-u06-14-q5@1,2: Compare type I and type IV hypersensitivity with veterinary examples. | Type I hypersensitivity is immediate and caused by IgE on mast cells, which release histamine within minutes; examples are canine atopic dermatitis, sweet itch in horses and anaphylaxis. Type IV hypersensitivity is delayed, taking 24 to 72 hours, and is mediated by T cells rather than antibody. Examples are allergic contact dermatitis and the swelling seen in the tuberculin skin test. | Type I mechanism ; Type I examples ; Type IV mechanism ; Type IV examples

## Maternally derived immunity and colostrum
LV: Clinical · Application
S: Newborn animals depend on antibodies from their mother for early protection. This lesson explains how placenta type determines antibody transfer, why colostrum is vital, how failure of passive transfer is detected and how maternal antibody affects vaccination.
O: Explain how placentation determines maternal antibody transfer
O: Describe colostrum management and the detection of failure of passive transfer
O: Explain how maternal antibody interferes with vaccination
H: Placenta type and antibody transfer
P: **Passive immunity** is protection from antibodies made by another animal. The amount of **IgG** crossing the placenta depends on the number of tissue layers between maternal and fetal blood. In the **epitheliochorial** placenta of **horses, pigs** and **ruminants** (synepitheliochorial in ruminants), almost no antibody crosses, so newborns are born with very little IgG and depend entirely on **colostrum**. In the **endotheliochorial** placenta of **dogs and cats**, a small proportion of antibody crosses, but colostrum still provides most of it. Newborn guts can absorb whole antibodies only for a short time: **gut closure** happens within about **24 hours** of birth, with absorption falling fast after the first few hours.
H: Colostrum management
- AHDB advice for dairy calves uses the **"3 Qs"**: **quality**, **quantity** and **quickness**.
- Calves should receive good-quality colostrum equal to about **10 percent of body weight** within the first **2 hours**.
- Colostrum quality can be checked with a **Brix refractometer** or colostrometer.
- Clean collection and storage reduce bacterial contamination, which reduces absorption.
- Foals should stand and suck within about two hours, and failure to suck needs prompt veterinary attention.
H: Failure of passive transfer and vaccination
- **Failure of passive transfer (FPT)** leaves neonates prone to septicaemia, scour and pneumonia.
- FPT is detected by serum **total protein**, **Brix** or a direct **IgG** test, usually at one to seven days old.
- Maternal antibody declines over weeks to months.
- While present, maternal antibody can **neutralise** vaccine, causing vaccine failure.
- This is why puppies and kittens receive several vaccine doses, with the last at **16 weeks or older**, as WSAVA advises.
X: Checking a newborn foal.
> A foal is born overnight and seen sucking by morning, but the mare ran milk for a day before foaling.
> The vet takes a blood sample from the foal at 12 to 24 hours old for an IgG test.
> The result is low, showing failure of passive transfer, because the mare lost her colostrum early.
> The foal is treated promptly by the vet to provide antibodies and is monitored for infection.
K: Horses, pigs and ruminants have placentas that block antibody transfer, so their newborns rely on colostrum, while dogs and cats receive a small amount across the placenta; colostrum must be good quality, sufficient and given quickly before gut closure, FPT is detected by blood tests, and maternal antibody can block early vaccines.
!: Thinking colostrum given at two days old is as good as at birth. Gut closure means absorption falls rapidly in the first hours and stops by about 24 hours.
EV: established | Calves, foals and piglets are born almost without circulating IgG because their placentas prevent transfer.
T: Passive immunity | Protection from antibodies made by another animal
T: Gut closure | The end of the newborn gut's ability to absorb whole antibodies
T: Failure of passive transfer | Inadequate absorption of colostral antibody by a newborn
SUM: Placenta type decides transfer.
SUM: Quality, quantity, quickly.
SUM: Maternal antibody can block vaccines.
SRC: Agriculture and Horticulture Development Board (AHDB), Colostrum management for dairy calves | guidance | 2024 | https://ahdb.org.uk/knowledge-library/colostrum-is-the-best-start-for-calves
SRC: Squires R. A., Crawford C., Marcondes M. and Whitley N., 2024 guidelines for the vaccination of dogs and cats, compiled by the Vaccination Guidelines Group of the World Small Animal Veterinary Association (WSAVA), Journal of Small Animal Practice 65: 277-316 | guidance | 2024
SRC: Tizard I. R., Veterinary Immunology, 11th edition, Elsevier | secondary | 2023
Q: What are the 3 Qs of colostrum management? | Quality, quantity and quickness.
Q: Roughly when does gut closure occur in newborn calves and foals? | Within about 24 hours of birth.
M1#veterinary-u06-15-q1@1: Which species relies almost entirely on colostrum for maternal antibody? | Horse | Dog | Cat | Human | The equine epitheliochorial placenta blocks antibody transfer.
NUM2#veterinary-u06-15-q2@2: A newborn Holstein calf weighs 40 kg. Using the guidance of 10 percent of body weight, how many litres of colostrum should it receive in its first feed? | 4 | 0.2 | litres | Ten percent of 40 kg is 4 kg, about 4 litres of colostrum within the first two hours.
M2#veterinary-u06-15-q3@2: Why are puppies vaccinated with a final dose at 16 weeks or older? | Maternal antibody may block earlier doses | Puppies cannot make antibodies until then | Vaccines are unsafe before 16 weeks | Older puppies need stronger vaccines | Maternal antibody can neutralise vaccine, so a late dose ensures response once it wanes.
M3#veterinary-u06-15-q4@3: A newborn calf was fed colostrum at 30 hours old. What is the most likely outcome? | Failure of passive transfer | Excellent passive immunity | Neonatal isoerythrolysis | Faster gut closure | By 30 hours the gut has closed, so little antibody is absorbed.
SA2#veterinary-u06-15-q5@2,3: Explain why colostrum is especially vital for calves and foals. | Calves and foals have epitheliochorial placentas with several tissue layers, so almost no IgG crosses before birth. They are born nearly without circulating antibody and depend on absorbing colostral IgG through the gut. Absorption falls quickly and stops at gut closure within about 24 hours, so colostrum must be good quality, sufficient and given quickly, or failure of passive transfer leaves them prone to infection. | Placenta type ; Born without IgG ; Gut closure ; Consequences of FPT

## Principles of vaccination
LV: Clinical · Application
S: Vaccination is one of the most effective tools in veterinary medicine. This lesson explains how vaccines work, the main vaccine types, herd immunity, DIVA vaccines and how adverse events are reported.
O: Explain how vaccines induce protective immunity
O: Compare the main types of vaccine
O: Evaluate herd immunity and vaccine safety reporting
H: How vaccines work
P: A **vaccine** exposes the immune system to antigens from a pathogen so that **memory cells** form without the animal suffering the disease. On later exposure, the **secondary response** is fast enough to prevent or reduce disease. Vaccines may give **sterile immunity**, preventing infection altogether, or reduce clinical signs and shedding without stopping infection. **Modified live (attenuated)** vaccines contain weakened organisms that replicate, giving strong, long-lasting immunity, often after one dose, and stimulating cell-mediated responses. **Inactivated (killed)** vaccines cannot replicate, are safer in pregnancy and immunosuppressed animals, but usually need **adjuvants** and two doses for a primary course.
H: Vaccine types
- **Modified live**: strong immunity, risk of reversion is rare, unsuitable for some pregnant animals.
- **Inactivated**: safe, needs adjuvant and booster doses.
- **Toxoids**: inactivated toxins, as in clostridial and tetanus vaccines.
- **Subunit** and **recombinant** vaccines: only key antigens, including **vectored** vaccines that use a harmless virus to carry genes.
- **Autogenous vaccines**: made from organisms isolated on a farm, used under Veterinary Medicines Directorate rules.
H: Herd immunity, DIVA and safety
- **Herd immunity**: when enough animals are immune, transmission falls and unvaccinated animals are protected.
- **DIVA** (differentiating infected from vaccinated animals) vaccines, such as marker IBR vaccines, allow testing alongside vaccination.
- Adverse events range from mild lethargy to rare anaphylaxis and **feline injection site sarcoma**.
- Suspected adverse reactions should be reported to the **Veterinary Medicines Directorate** through its adverse event reporting scheme.
- Vaccination decisions balance benefit, risk and lifestyle, following data sheets and guidance such as **WSAVA**.
X: Choosing a vaccine for a pregnant herd.
> A suckler herd needs protection against a viral disease during the breeding season.
> Some of the cows are already pregnant.
> The vet checks the data sheets and chooses a vaccine authorised for use in pregnancy.
> A marker vaccine is chosen, so that the herd can still be tested for infection under a control scheme.
K: Vaccines create memory without disease; modified live vaccines give strong immunity but need care in pregnancy, inactivated vaccines and toxoids are safer but need adjuvants and boosters, herd immunity protects whole populations, DIVA vaccines allow testing, and suspected adverse reactions are reported to the VMD.
!: Assuming vaccinated animals cannot become infected. Many vaccines reduce disease and shedding rather than giving sterile immunity.
EV: established | High vaccination coverage reduces disease transmission and protects unvaccinated animals through herd immunity.
T: Attenuated | Weakened so that an organism can replicate but not cause disease
T: Adjuvant | A substance added to a vaccine to boost the immune response
T: DIVA | Differentiating infected from vaccinated animals
SUM: Vaccines create memory.
SUM: Live is strong; killed is safe.
SUM: Report reactions to the VMD.
SRC: Tizard I. R., Vaccines for Veterinarians, Elsevier | secondary | 2021
SRC: Veterinary Medicines Directorate, Report an adverse event to a veterinary medicine | guidance | 2024 | https://www.gov.uk/report-veterinary-medicine-problem
SRC: Squires R. A., Crawford C., Marcondes M. and Whitley N., 2024 guidelines for the vaccination of dogs and cats, WSAVA, Journal of Small Animal Practice 65: 277-316 | guidance | 2024
Q: What is a toxoid? | An inactivated toxin used as a vaccine.
Q: Where should suspected vaccine adverse reactions be reported in the UK? | The Veterinary Medicines Directorate.
M1#veterinary-u06-16-q1@1: Which vaccine type contains weakened organisms that replicate? | Modified live | Inactivated | Toxoid | Subunit | Attenuated organisms replicate without causing disease, giving strong immunity.
M2#veterinary-u06-16-q2@2: Why do inactivated vaccines usually contain adjuvants? | Killed antigens alone are weakly immunogenic | Adjuvants stop the vaccine from replicating | Adjuvants make the vaccine live again | They remove the need for any boosters | Adjuvants boost responses to antigens that cannot replicate.
SEQ2#veterinary-u06-16-q3@2: Put these events after vaccination in order. | Antigen is taken up by antigen-presenting cells ; Lymphocytes matching the antigen multiply ; Memory cells form ; Rapid secondary response on later exposure | Vaccination primes the adaptive system so the later response is fast.
M3#veterinary-u06-16-q4@3: Why are DIVA vaccines valuable in disease control schemes? | Tests can tell vaccinated from infected | They give sterile immunity in every case | They need no booster doses at all | They can be given to any species safely | Marker vaccines lack an antigen that infected animals respond to, so testing can continue.
SA2#veterinary-u06-16-q5@2,3: Compare modified live and inactivated vaccines. | Modified live vaccines contain attenuated organisms that replicate, giving strong and long-lasting immunity, including cell-mediated responses, often after one dose. They may be unsuitable for some pregnant or immunosuppressed animals. Inactivated vaccines cannot replicate, so they are safer in these animals but are less immunogenic and need adjuvants and a two-dose primary course with boosters. | Live: replication and strength ; Live: cautions ; Inactivated: safety ; Inactivated: adjuvants and boosters

## Vaccination of companion animals
LV: Clinical · Application
S: Vaccination protects dogs, cats and rabbits against serious infectious diseases. This lesson explains core and non-core vaccines, the WSAVA guidelines, primary courses, boosters and the need for an individual risk assessment.
O: Distinguish core and non-core vaccines for dogs, cats and rabbits
O: Describe primary vaccination and booster schedules recommended by WSAVA
O: Apply a lifestyle-based risk assessment to vaccination decisions
H: Core and non-core vaccines
P: The **WSAVA Vaccination Guidelines Group** defines **core vaccines** as those every animal should receive, because they protect against severe, widespread diseases. For **dogs**, core vaccines protect against **canine distemper virus**, **canine adenovirus** (infectious canine hepatitis) and **canine parvovirus**, plus **rabies** where it is endemic or required. For **cats**, core vaccines protect against **feline panleucopenia virus**, **feline herpesvirus-1** and **feline calicivirus**. **Non-core vaccines** are given depending on lifestyle and risk, such as **leptospirosis** and **kennel cough** (*Bordetella bronchiseptica* and canine parainfluenza) in dogs and **feline leukaemia virus** in cats. In the UK, leptospirosis vaccination is widely recommended for dogs. **Rabbits** are vaccinated against **myxomatosis** and **rabbit haemorrhagic disease** (RHDV1 and RHDV2).
H: Schedules
- Puppies and kittens start at about **6 to 8 weeks**, with doses every **2 to 4 weeks** until **16 weeks or older**.
- WSAVA now recommends a further dose at about **26 weeks** to catch animals still blocked by maternal antibody.
- Core modified live vaccines for adult dogs need boosting no more often than every **three years**.
- Non-core vaccines such as leptospirosis usually need **annual** boosters.
- **Titre testing** can show protection against core viral diseases in dogs.
- Rabies vaccination is required for pet travel, under Defra pet travel rules.
H: The annual health check
- An annual consultation is more than vaccination: it includes examination, parasite control and advice.
- Lifestyle questions decide non-core vaccines: kennels, travel, contact with water or wildlife.
- Feline vaccines should be given at sites recommended by WSAVA, such as the lower limbs, to allow surgery if a sarcoma develops.
- Unvaccinated puppies with vomiting and bloody diarrhoea should be seen by a vet urgently, as parvovirus is likely.
X: Planning a puppy's vaccinations.
> A puppy is brought to a practice at 8 weeks old.
> The vet gives the first core and leptospirosis vaccines and books a second visit in 4 weeks.
> A final puppy dose is planned for 16 weeks or older, with a further dose at about 26 weeks.
> The owner is told to keep the puppy away from unvaccinated dogs and areas they use until the course is complete.
K: WSAVA core vaccines protect dogs against distemper, adenovirus and parvovirus and cats against panleucopenia, herpesvirus and calicivirus; non-core vaccines such as leptospirosis, kennel cough and FeLV depend on risk; primary courses end at 16 weeks or older with a dose at about 26 weeks, and core boosters for adult dogs are needed no more than every three years.
!: Boosting every vaccine every year. Core modified live vaccines in adult dogs protect for years; annual boosters are needed mainly for non-core bacterial vaccines such as leptospirosis.
EV: established | WSAVA guidelines state that core modified live vaccines for adult dogs need not be given more often than every three years.
EV: contested | The need for and timing of FeLV vaccination in adult indoor cats depends on individual risk and is debated.
T: Core vaccine | A vaccine every animal of a species should receive
T: Non-core vaccine | A vaccine given based on an animal's lifestyle and risk
T: Titre testing | Measuring antibody levels to assess protection
SUM: Core for all, non-core by risk.
SUM: Finish at 16 weeks or older.
SUM: Core boosters every three years.
SRC: Squires R. A., Crawford C., Marcondes M. and Whitley N., 2024 guidelines for the vaccination of dogs and cats, compiled by the Vaccination Guidelines Group of the World Small Animal Veterinary Association (WSAVA), Journal of Small Animal Practice 65: 277-316 | guidance | 2024
SRC: British Small Animal Veterinary Association, Position statement on vaccination of dogs and cats | guidance | 2024 | https://www.bsava.com
SRC: Department for Environment, Food and Rural Affairs, Taking your pet dog, cat or ferret abroad | guidance | 2024 | https://www.gov.uk/taking-your-pet-abroad
Q: Which three viruses are covered by core feline vaccines? | Feline panleucopenia virus, feline herpesvirus-1 and feline calicivirus.
Q: Which two diseases are rabbits vaccinated against in the UK? | Myxomatosis and rabbit haemorrhagic disease.
M1#veterinary-u06-17-q1@1: Which is a core vaccine for dogs according to WSAVA? | Canine parvovirus | Bordetella bronchiseptica | Leptospirosis | Canine parainfluenza | Parvovirus, distemper and adenovirus are core for all dogs.
M2#veterinary-u06-17-q2@2: Why does WSAVA recommend an extra puppy vaccine at about 26 weeks? | To protect pups still blocked by maternal antibody | Because the first doses are always faulty | To give extra protection against fleas | To replace the need for any boosters | Some pups still have maternal antibody at 16 weeks, so a later dose catches non-responders.
TF2#veterinary-u06-17-q3@2: Leptospirosis vaccines usually need annual boosters in dogs. | true | Immunity from bacterial vaccines such as leptospirosis is shorter, so they are boosted annually.
M3#veterinary-u06-17-q4@3: An owner's unvaccinated puppy has bloody diarrhoea and is vomiting. What is the best advice? | See a vet urgently | Wait two days for improvement | Give the next vaccine dose now | Feed a bland diet at home | Parvovirus is likely and can be fatal, so urgent veterinary care is needed.
SA2#veterinary-u06-17-q5@2,3: Explain how a vet would decide which vaccines a dog needs. | All dogs should receive core vaccines against distemper, adenovirus and parvovirus, following WSAVA guidance. Non-core vaccines depend on lifestyle and risk, so the vet asks about kennels, contact with other dogs, water and wildlife and travel. In the UK, leptospirosis is usually recommended, kennel cough suits dogs that mix with many others and rabies is needed for travel. | Core vaccines ; Risk assessment ; Lifestyle examples ; UK specifics

## Vaccination of farm animals and horses
LV: Clinical · Application
S: Vaccination is central to herd health planning and to equine competition rules. This lesson covers the main vaccines used in UK cattle, sheep, pigs, poultry and horses and how they fit into health plans.
O: Identify the main vaccines used in UK cattle, sheep, pigs and poultry
O: Describe the vaccines recommended or required for horses
O: Plan vaccination within a herd health plan
H: Farm animal vaccines
P: On farms, vaccination is part of a **herd or flock health plan** agreed with the vet. **Cattle** are commonly vaccinated against **bovine viral diarrhoea (BVD)**, **infectious bovine rhinotracheitis (IBR)**, **leptospirosis**, **clostridial diseases** and the viruses and bacteria of **bovine respiratory disease**, while **dam vaccination** against rotavirus, coronavirus and *E. coli* protects calves through colostrum. **Sheep** receive **clostridial and pasteurella** vaccines, with **enzootic abortion** and **toxoplasmosis** vaccines before tupping. **Pigs** are vaccinated against **porcine circovirus 2**, **erysipelas** and **parvovirus**. **Poultry** are vaccinated against **Marek's disease** and, in laying flocks under the **British Lion Code**, against **Salmonella**. Vaccinating cattle against bovine tuberculosis is not currently permitted outside trials, because it can interfere with the tuberculin test.
H: Horse vaccines
- **Equine influenza** vaccination is required for racing under **British Horseracing Authority** rules and for competition under **FEI** rules, with set booster intervals.
- **Tetanus** vaccination is strongly recommended for all horses, which are very susceptible.
- **Equine herpesvirus** vaccines reduce respiratory disease and abortion in pregnant mares.
- A **strangles** vaccine is available and can be part of yard biosecurity plans.
- Vaccination dates must be recorded in the horse's **passport** by a vet.
H: Planning vaccination
- Identify the diseases present and the risks on the farm, using testing and history.
- Time vaccines before risk periods, such as before housing, tupping or lambing.
- Follow the data sheet, store vaccines in the fridge and record use.
- Combine vaccination with biosecurity, colostrum management and husbandry.
- Review outcomes each year in the health plan.
X: A sheep vaccination plan.
> A lowland flock has had abortions and losses of lambs to clostridial disease.
> Laboratory tests on aborted lambs confirm enzootic abortion.
> The vet plans enzootic abortion and toxoplasma vaccination for replacement ewes before tupping.
> Ewes get a clostridial booster before lambing so lambs receive protection through colostrum.
K: UK farm vaccines include BVD, IBR, leptospirosis, clostridial and respiratory vaccines in cattle, clostridial, pasteurella, enzootic abortion and toxoplasma vaccines in sheep, circovirus and erysipelas in pigs and Marek's and Salmonella in poultry, while horses need equine influenza for racing and competition and tetanus for all, recorded in the passport.
!: Vaccinating at a random time of year. Vaccines must be timed before risk periods, such as before tupping or lambing, to work best.
EV: established | Vaccinating ewes before lambing protects lambs through antibodies in colostrum.
T: Herd health plan | A written plan agreed between farmer and vet for disease prevention
T: Dam vaccination | Vaccinating the mother so that offspring are protected through colostrum
T: Enzootic abortion | Abortion in ewes caused by Chlamydia abortus
SUM: Vaccines belong in health plans.
SUM: Time vaccines before risk.
SUM: Flu and tetanus for horses.
SRC: National Office of Animal Health (NOAH), Compendium of data sheets for animal medicines | standard | 2024 | https://www.noahcompendium.co.uk
SRC: British Horseracing Authority, Rules of Racing: equine influenza vaccination requirements | guidance | 2024 | https://www.britishhorseracing.com
SRC: Department for Environment, Food and Rural Affairs, Bovine TB: cattle vaccine development | guidance | 2024 | https://www.gov.uk/government/publications/bovine-tb-cattle-vaccine-development
Q: Which vaccine is required for horses that race under BHA rules? | Equine influenza.
Q: Which organism causes enzootic abortion of ewes? | Chlamydia abortus.
M1#veterinary-u06-18-q1@1: Which vaccine is given to laying hens under the British Lion Code? | Salmonella | Marek's disease only | Avian influenza | Newcastle disease only | Lion Code laying flocks are vaccinated against Salmonella to protect food safety.
M2#veterinary-u06-18-q2@2: Why are ewes given a clostridial booster before lambing? | Lambs gain protection through colostrum | It stops ewes from aborting lambs | It prevents fly strike in lambs | It replaces lamb vaccination for life | Dam vaccination raises antibodies in colostrum, protecting newborn lambs.
MATCH2#veterinary-u06-18-q3@1: Match each species to a vaccine commonly used in it. | Cattle = IBR ; Sheep = Enzootic abortion ; Pigs = Porcine circovirus 2 ; Horses = Tetanus | Each species has its own key vaccines.
M3#veterinary-u06-18-q4@3: Why is BCG vaccination of cattle against bovine TB not permitted outside trials in the UK? | It can interfere with the tuberculin test | It always causes TB in cattle | It does not work in any species | It is banned for welfare reasons | BCG can make cattle react to tuberculin, so DIVA tests are being developed alongside the vaccine.
SA2#veterinary-u06-18-q5@2,3: Explain how a vet would build vaccination into a dairy herd health plan. | The vet first identifies the diseases present and at risk on the farm, using history, bulk milk and blood tests. Vaccines such as BVD, IBR and leptospirosis are chosen and timed before risk periods, and dams may be vaccinated to protect calves through colostrum. The plan records vaccine use, storage and timing, combines vaccination with biosecurity and husbandry and is reviewed yearly. | Disease identification ; Vaccine choice and timing ; Dam vaccination ; Records and review
`;
