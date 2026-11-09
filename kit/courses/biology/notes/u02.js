// School 2: Cell Biology. Written to standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md): objectives, key terms,
// summaries, typed and dated sources, and questions at three levels in every lesson. Explanations are original;
// sources are those used and cited for checking, and are pending verification (qa.js records the review stages).
// Level: secondary to first-year undergraduate.
export default `
## Cell theory
S: Cell theory says that every living thing is made of cells, that the cell is the basic unit of life, and that new cells come only from existing cells. This lesson tells how the idea was built from microscope evidence and why it still matters.
O: State the three principles of cell theory
O: Describe the observations that led to it, and who made them
O: Calculate magnification and actual size from a microscope image
PRE: Characteristics of living organisms
H: The three principles
- **All living organisms are made of one or more cells.**
- **The cell is the basic unit of structure and function** in living things.
- **All cells arise from pre-existing cells**, by division.
P: Modern versions add that cells contain hereditary information (DNA) that is passed on when they divide, and that the basic chemistry of life happens inside cells.
H: How the idea was built
P: Robert Hooke described the "cells" of cork in *Micrographia* (1665): he saw the empty walls of dead plant cells. Antonie van Leeuwenhoek, with much better single-lens microscopes, saw living bacteria and protists in the 1670s. In 1838–39 Matthias Schleiden (plants) and Theodor Schwann (animals) proposed that all organisms are made of cells. Robert Remak and then Rudolf Virchow (1855, "omnis cellula e cellula") established that cells come only from other cells, ending the idea that cells form spontaneously.
H: Seeing cells: magnification and resolution
P: Most cells are 1–100 µm across, too small to see unaided. **Magnification** is how much bigger the image is than the object; **resolution** is the smallest separation at which two points can still be told apart. A light microscope resolves about 0.2 µm, enough for nuclei and chloroplasts; electron microscopes resolve below 1 nm, enough for ribosomes and membranes.
E: magnification = image size / actual size
X: A cell is 25 mm across in a photograph taken at ×500. What is its actual size?
> Actual size = image size ÷ magnification = 25 mm ÷ 500 = 0.05 mm.
> 0.05 mm × 1000 = 50 µm.
K: Every organism is made of cells, and every cell comes from another cell: life is continuous at the cellular level.
!: Confusing magnification with resolution. Enlarging a blurry image more doesn't reveal more detail; only better resolution does.
T: Cell theory | All organisms are made of cells, the cell is the basic unit of life, and cells arise only from existing cells
T: Magnification | How many times larger an image is than the real object
T: Resolution | The smallest distance between two points that can still be distinguished as separate
SUM: Cell theory rests on three principles: cells make up all organisms, are their basic unit, and come from existing cells.
SUM: It was built from microscope evidence between 1665 and the 1850s.
SUM: Magnification = image size ÷ actual size; resolution limits the detail you can see.
SRC: OpenStax, Biology 2e, section 4.1 "Studying Cells" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/4-1-studying-cells
SRC: Mazzarello P., "A unifying concept: the history of cell theory", Nature Cell Biology 1:E13–E15 | secondary | 1999 | https://doi.org/10.1038/8964
Q: State the three principles of cell theory. | All organisms are made of one or more cells; the cell is the basic unit of structure and function; all cells come from pre-existing cells.
Q: What is the difference between magnification and resolution? | Magnification is how much larger the image is; resolution is the smallest separation at which two points can be seen as separate.
NUM2: A mitochondrion is 2 µm long and appears 40 mm long in an electron micrograph. What is the magnification? | 20000 | 1 |  | Convert to the same units: 40 mm = 40 000 µm; 40 000 ÷ 2 = ×20 000.
M1: Who stated that all cells arise from pre-existing cells? | Rudolf Virchow | Robert Hooke | Gregor Mendel | Charles Darwin | Virchow popularised "omnis cellula e cellula" in 1855, building on Remak's work; Hooke named cells, Mendel studied inheritance and Darwin evolution.
M2: A student says a light microscope at ×2000 should show ribosomes clearly. Why is this wrong? | Ribosomes are about 25 nm across, far below the light microscope's resolution of about 0.2 µm | Ribosomes are transparent to light | Ribosomes are only found in bacteria | Magnification above ×1000 is impossible | Resolution, not magnification, decides what can be seen; ribosomes need an electron microscope.
M3: Which observation would most directly challenge the third principle of cell theory? | A new cell forming from non-living chemicals in a sealed sterile flask | A cell with no nucleus | A very large single-celled organism | Cells dividing faster in warm conditions | Only the formation of a cell without a parent cell contradicts "all cells arise from pre-existing cells"; the others are consistent with cell theory.
TF1: Robert Hooke's cork "cells" were living cells with nuclei. | false | Cork is dead tissue: Hooke saw the empty cell walls left behind.

## Prokaryotic cells
S: Prokaryotes, the bacteria and archaea, are cells without a nucleus or membrane-bound organelles. They are small and structurally simple, yet they are the most abundant and metabolically varied organisms on Earth.
O: Describe the structures found in a prokaryotic cell
O: Explain how prokaryotes store and copy their genetic material
O: Explain why small size suits prokaryotic life
PRE: Cell theory
H: The parts of a prokaryotic cell
- **Plasma membrane** enclosing the **cytoplasm**.
- **Nucleoid**: a region where the single, usually circular chromosome sits, not enclosed by a membrane.
- **Ribosomes** of the 70S type (smaller than the 80S ribosomes in eukaryotic cytoplasm).
- **Cell wall** outside the membrane in almost all prokaryotes.
- Often **plasmids** (small extra DNA circles), a **capsule** or slime layer, **pili** for attachment and DNA transfer, and one or more **flagella** for movement.
H: Genes without a nucleus
P: Because there is no nuclear envelope, transcription and translation happen in the same space: ribosomes can start translating an mRNA while it is still being made. Plasmids often carry useful genes such as antibiotic resistance and can be passed between cells, which is why resistance spreads quickly.
H: Small and fast
P: Most prokaryotes are 0.5–5 µm long. Their small size gives a large surface area relative to volume, so nutrients and wastes diffuse in and out fast enough to support rapid growth. Under good conditions *E. coli* can divide by binary fission about every 20 minutes.
H: Bacteria and archaea
P: Both domains are prokaryotic, but they differ deeply. Archaeal membranes are built from ether-linked lipids rather than the ester-linked lipids of bacteria and eukaryotes, archaeal walls contain no peptidoglycan, and some archaeal enzymes for copying and reading DNA resemble those of eukaryotes. Many archaea live in extreme conditions such as hot springs and salt lakes, but they are also common in soil, oceans and the human gut.
K: Prokaryotic cells have no nucleus or membrane-bound organelles; their DNA is in a nucleoid, often with plasmids.
!: Saying prokaryotes have no DNA organisation or no ribosomes. They have a chromosome and many ribosomes; they lack a nucleus and membrane-bound organelles.
T: Prokaryote | An organism whose cells have no nucleus or membrane-bound organelles: bacteria and archaea
T: Nucleoid | The region of a prokaryotic cell that contains its chromosome, without a surrounding membrane
T: Plasmid | A small, usually circular DNA molecule separate from the main chromosome
SUM: Prokaryotes are small cells with a nucleoid, 70S ribosomes and usually a cell wall.
SUM: Transcription and translation happen together; plasmids spread genes such as resistance.
SUM: A large surface area to volume ratio supports fast growth.
SRC: OpenStax, Biology 2e, section 4.2 "Prokaryotic Cells" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/4-2-prokaryotic-cells
Q: Name four structures found in all prokaryotic cells. | Plasma membrane, cytoplasm, ribosomes and DNA (a chromosome in a nucleoid); almost all also have a cell wall.
Q: Why can transcription and translation be coupled in bacteria? | There is no nuclear envelope separating DNA from ribosomes, so ribosomes can translate mRNA as it is being transcribed.
M1: Which structure is found in prokaryotic cells? | 70S ribosomes | A nucleus | Mitochondria | Golgi apparatus | Prokaryotes have ribosomes but no membrane-bound organelles such as a nucleus, mitochondria or Golgi.
M2: Antibiotic resistance appears in a different bacterial species living in the same gut. What is the most likely route? | A plasmid carrying the resistance gene was transferred between the bacteria | The antibiotic caused the same mutation in both | Resistance genes moved through the nucleus | Mitochondria carried the gene | Plasmids can be passed between bacteria, even of different species, through processes such as conjugation.
M3: Why are prokaryotic cells almost never larger than a few micrometres? | Without internal transport systems they depend on diffusion, which is only fast enough when the surface area to volume ratio is large | Their cell wall cannot stretch | They have too little DNA to build a larger cell | Large cells would be eaten by protists | Diffusion time grows with distance, and the surface area to volume ratio falls as a cell gets bigger, so small size supports fast exchange.
MS2: Which are typical of prokaryotic cells? | Circular chromosome ; Plasmids ; Cell wall | Nuclear envelope ; Mitochondria ; Endoplasmic reticulum | Prokaryotes have a circular chromosome, often plasmids and usually a wall, and lack membrane-bound organelles.

## Eukaryotic cells
S: Eukaryotic cells, found in animals, plants, fungi and protists, keep their DNA in a nucleus and divide their interior into membrane-bound compartments. This compartmentalisation lets them grow larger and do many incompatible jobs at once.
O: Describe the main features that define a eukaryotic cell
O: Compare eukaryotic and prokaryotic cells
O: Outline the endosymbiotic origin of mitochondria and chloroplasts
PRE: Prokaryotic cells
H: What makes a cell eukaryotic
- A **nucleus** surrounded by a double-membrane nuclear envelope.
- **Membrane-bound organelles**: endoplasmic reticulum, Golgi apparatus, lysosomes, mitochondria (and chloroplasts in plants and algae).
- **Linear chromosomes** with DNA wound around histone proteins.
- A **cytoskeleton** that shapes the cell and moves things within it.
- **80S ribosomes** in the cytoplasm.
P: Eukaryotic cells are usually 10–100 µm across, roughly ten times the length and a thousand times the volume of a typical bacterium.
IX: cell-explorer
H: Why compartments matter
P: Membranes create separate spaces with different conditions. Lysosomes keep an acidic pH (about 4.5–5) for digestive enzymes that would damage the rest of the cell; mitochondria build up proton gradients across their inner membrane. Compartments also concentrate the enzymes of one pathway together.
H: Where eukaryotic cells came from
P: The **endosymbiotic theory**, developed by Lynn Margulis (1967), holds that mitochondria descend from aerobic bacteria and chloroplasts from cyanobacteria that were engulfed by a host cell and kept. The evidence: both organelles have double membranes, their own circular DNA, 70S ribosomes, and divide by fission; their genes are most similar to those of free-living bacteria.
K: Eukaryotic cells have a nucleus and membrane-bound compartments, which let them be larger and more specialised than prokaryotes.
!: Thinking "eukaryotic" means "multicellular". Many eukaryotes, such as yeast and amoebae, are single cells.
T: Eukaryote | An organism whose cells have a nucleus and membrane-bound organelles
T: Organelle | A specialised structure inside a cell with a particular job
T: Endosymbiotic theory | The theory that mitochondria and chloroplasts evolved from bacteria living inside an ancestral host cell
SUM: Eukaryotic cells have a nucleus, membrane-bound organelles, linear chromosomes and a cytoskeleton.
SUM: Compartments keep incompatible processes apart.
SUM: Mitochondria and chloroplasts were once free-living bacteria.
SRC: OpenStax, Biology 2e, section 4.3 "Eukaryotic Cells" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells
SRC: Sagan L., "On the origin of mitosing cells", Journal of Theoretical Biology 14:225–274 | primary | 1967 | https://doi.org/10.1016/0022-5193(67)90079-3
Q: Give three differences between eukaryotic and prokaryotic cells. | Eukaryotes have a nucleus, membrane-bound organelles and linear chromosomes with histones (and 80S ribosomes); prokaryotes have a nucleoid, no membrane-bound organelles and usually a circular chromosome (70S ribosomes).
Q: Give two pieces of evidence that mitochondria were once bacteria. | They have their own circular DNA and 70S ribosomes, a double membrane, and divide by fission.
M1: Which feature is found in eukaryotic but not prokaryotic cells? | A nuclear envelope | Ribosomes | A plasma membrane | DNA | All cells have ribosomes, a membrane and DNA; only eukaryotes enclose their DNA in a nuclear envelope.
M2: An organism is single-celled, has a nucleus and mitochondria, and no cell wall. What is it? | A eukaryote such as an amoeba | A bacterium | An archaeon | A virus | A nucleus and mitochondria make it eukaryotic; being single-celled doesn't make it prokaryotic.
M3: Why do mitochondria have ribosomes that resemble bacterial ribosomes? | They are descended from bacteria and kept part of their own protein-making system | They make all of the cell's proteins | Bacteria constantly invade mitochondria | Eukaryotic ribosomes are too large to enter the nucleus | Mitochondrial 70S-type ribosomes are a relic of their bacterial ancestry, part of the evidence for endosymbiosis.
TF1: Yeast cells are eukaryotic. | true | Yeasts are single-celled fungi with a nucleus and membrane-bound organelles.

## Animal cells
S: Animal cells are eukaryotic cells without a cell wall or chloroplasts. Their flexible membranes, lysosomes and centrioles suit the active, varied lives of animal tissues.
O: Identify the main structures of an animal cell and state their functions
O: Explain how the lack of a cell wall affects animal cells
O: Relate cell structure to function in a named animal cell
PRE: Eukaryotic cells
H: The structures of an animal cell
- **Nucleus**: contains the DNA and controls the cell.
- **Plasma membrane**: controls what enters and leaves.
- **Cytoplasm**: the cytosol and organelles where most reactions take place.
- **Mitochondria**: aerobic respiration, making ATP.
- **Rough and smooth endoplasmic reticulum** and **Golgi apparatus**: make, modify and dispatch proteins and lipids.
- **Lysosomes**: digest worn-out parts and engulfed material.
- **Centrosome** with a pair of **centrioles**: organises microtubules, including the spindle in cell division.
H: Life without a wall
P: Support comes instead from the **extracellular matrix**, a network of proteins such as collagen and fibronectin secreted around cells, and from the cytoskeleton inside them. Cells attach to the matrix through membrane proteins called integrins.
P: Without a rigid wall, animal cells can change shape, crawl (white blood cells), contract (muscle) and engulf particles by phagocytosis. The cost is vulnerability to osmosis: in pure water an animal cell swells and bursts, so animals regulate the water and salt content of the fluid around their cells.
H: Structure fits function
P: A pancreatic acinar cell, which secretes digestive enzymes, is packed with rough ER and a large Golgi apparatus. A muscle cell is full of mitochondria and contractile protein filaments. The same basic plan is adjusted to each job.
P: **Investigate with the lab.** Tap every organelle in the animal cell and note its job. Then find the three structures a plant cell has that an animal cell lacks.
IX: cell-explorer
K: Animal cells have no wall or chloroplasts; their flexible membranes allow movement and engulfing, but make them vulnerable to bursting in dilute solutions.
!: Drawing a large central vacuole in an animal cell. Animal cells have small vesicles and vacuoles, not one large permanent vacuole.
T: Centriole | A small cylinder of microtubules, found in pairs in the animal centrosome
T: Cytosol | The fluid part of the cytoplasm, outside the organelles
SUM: Animal cells have a nucleus, mitochondria, ER, Golgi, lysosomes and centrioles, but no wall or chloroplasts.
SUM: Flexibility allows movement and phagocytosis; osmotic balance must be controlled.
SUM: The proportions of organelles reflect each cell's job.
SRC: OpenStax, Biology 2e, section 4.3 "Eukaryotic Cells" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells
SRC: Alberts B. et al., Molecular Biology of the Cell, 6th edition, chapter 12 "Intracellular Compartments and Protein Sorting" | secondary | 2014
Q: Name two structures found in plant cells but not animal cells. | A cellulose cell wall and chloroplasts (and usually a large permanent vacuole).
Q: Why does a red blood cell burst in pure water? | Water enters by osmosis and, with no cell wall to resist expansion, the membrane stretches until it ruptures.
M1: Which organelle carries out aerobic respiration in an animal cell? | Mitochondrion | Ribosome | Golgi apparatus | Centriole | Mitochondria carry out the later stages of aerobic respiration and make most of the cell's ATP.
M2: A cell secretes large amounts of protein hormone. Which pair of organelles would you expect to be especially extensive? | Rough endoplasmic reticulum and Golgi apparatus | Lysosomes and centrioles | Smooth ER and peroxisomes | Chloroplasts and vacuoles | Secreted proteins are made on rough ER and processed and packaged by the Golgi before exocytosis.
M3: White blood cells can engulf bacteria but plant cells cannot. What best explains the difference? | Animal cells lack a rigid cell wall, so their membrane can extend around particles | Plant cells have no membrane | Plant cells have no lysosomes or vesicles at all | White blood cells contain chloroplasts | Phagocytosis needs a flexible membrane that can wrap around a particle; a plant's cellulose wall prevents this.
TF2: Animal cells have centrioles in their centrosome, while most plant cells do not. | true | Most flowering plant cells organise their spindle without centrioles.
M2: Which structure is found in animal cells but not in plant cells? | Centrioles in a centrosome | A nucleus enclosed in an envelope | Mitochondria for respiration | Ribosomes for protein synthesis | Animal cells have centrioles; plant cells also have nuclei, mitochondria and ribosomes.

## Plant cells
S: Plant cells share the eukaryotic plan with animal cells but add three features: a cellulose wall, chloroplasts and a large permanent vacuole. Together these let plants make their own food and stand upright without a skeleton.
O: Describe the features that distinguish plant cells
O: Explain how the wall and vacuole keep a plant cell turgid
O: Explain how plasmodesmata connect plant cells
PRE: Eukaryotic cells
H: Three distinctive features
- **Cellulose cell wall**: a strong, porous layer outside the membrane that resists stretching.
- **Chloroplasts**: carry out photosynthesis (in green tissues).
- **Large permanent vacuole**: filled with cell sap and surrounded by a membrane called the tonoplast; it can take up most of the cell's volume.
P: Plant cells also have a nucleus, mitochondria, ER, Golgi and ribosomes, like animal cells. Root cells have no chloroplasts, because they are in the dark.
H: Turgor: standing up with water
P: Water enters the vacuole by osmosis and pushes the cytoplasm against the wall. The wall pushes back, creating **turgor pressure** that makes the cell firm. Turgid cells pressing against each other hold up soft stems and leaves; when they lose water, the plant wilts.
H: Connected cells
P: Neighbouring plant cells are joined by **plasmodesmata**, channels through the walls lined by plasma membrane, through which water, sugars, signals and even some proteins pass directly from cell to cell.
P: **Investigate with the lab.** Switch to the plant cell and tap the cell wall, the large vacuole and a chloroplast. Compare each with the animal cell.
IX: cell-explorer
K: The cell wall, chloroplasts and large vacuole let plant cells photosynthesise and stay rigid through turgor pressure.
!: Thinking the cell wall controls what enters the cell. The wall is fully permeable; it is the plasma membrane that is selective.
T: Cell wall | A rigid layer outside the plasma membrane; made of cellulose in plants
T: Turgor pressure | The pressure of a cell's contents against its wall, caused by water entering by osmosis
T: Plasmodesma | A channel through plant cell walls that connects the cytoplasm of neighbouring cells
SUM: Plant cells have a cellulose wall, chloroplasts and a large permanent vacuole.
SUM: Turgor pressure, resisted by the wall, keeps cells and soft tissues firm.
SUM: Plasmodesmata link the cytoplasm of neighbouring cells.
SRC: OpenStax, Biology 2e, section 4.3 "Eukaryotic Cells" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells
Q: What does the tonoplast surround? | The large permanent vacuole of a plant cell.
Q: Why does a plant wilt when short of water? | Its cells lose water, turgor pressure falls, and the cells no longer press against each other to support the stem and leaves.
M1: Which structure is found in plant cells but not in animal cells? | Cellulose cell wall | Mitochondria | Ribosomes | Nucleus | Plant and animal cells both have mitochondria, ribosomes and a nucleus; only plants have a cellulose wall.
M2: A cell from a carrot root has a cell wall and a large vacuole but no chloroplasts. What does this show? | It is a plant cell from a non-photosynthetic tissue | It is an animal cell | It is a bacterial cell | It must be dead | Chloroplasts are absent from plant tissues that are not exposed to light, such as roots.
M3: Why can a cell with a wall withstand being placed in pure water, when an animal cell cannot? | The wall resists expansion, so turgor pressure builds up until water stops entering | The wall is impermeable to water | Plant cells actively pump water out | The vacuole stores all the incoming water without swelling | As the cell swells, the wall pushes back; the rising pressure balances the tendency of water to enter, so the cell becomes turgid instead of bursting.
M2: Which three structures do plant cells have that animal cells lack? | Cell wall, large permanent vacuole and chloroplasts | Nucleus, cell membrane and ribosomes | Mitochondria, cytoplasm and lysosomes | Centrioles, cilia and a nucleolus | The cellulose wall, permanent vacuole and chloroplasts are features of plant cells.
MATCH2: Match each plant cell structure to its function. | Cell wall = support and resistance to bursting ; Chloroplast = photosynthesis ; Vacuole = stores cell sap and maintains turgor ; Plasmodesma = connects neighbouring cells | Each feature supports a different aspect of plant life: structure, nutrition, water balance and communication.

## Fungal cells
S: Fungi, including yeasts, moulds and mushrooms, are eukaryotes with cell walls made of chitin rather than cellulose. They feed by digesting food outside their bodies and absorbing the products, and many grow as networks of thread-like hyphae.
O: Describe the structure of fungal cells and hyphae
O: Explain how fungi obtain their nutrients
O: Compare fungal cells with plant and animal cells
PRE: Eukaryotic cells
H: Structure
P: Fungal cells have a nucleus, mitochondria, ER, Golgi and vacuoles, like other eukaryotes. Their walls are made mainly of **chitin**, the same tough polysaccharide found in insect exoskeletons, with glucans. They have no chloroplasts.
P: Moulds and mushrooms grow as **hyphae**, threads a few micrometres wide that branch into a network called a **mycelium**. In many fungi the hyphae are divided by cross-walls (septa) with pores; in others the hyphae are one long cytoplasm with many nuclei. Yeasts grow as single oval cells that reproduce by budding.
H: Feeding by absorption
P: Fungi are **heterotrophs** that secrete digestive enzymes into their surroundings and absorb the small molecules released. A mycelium has an enormous surface area for absorption. Many fungi are decomposers that recycle carbon and nutrients from dead matter; others are parasites or form partnerships with plant roots (mycorrhizae).
H: Fungal cells and medicine
P: Because fungal cells are eukaryotic, like ours, antifungal drugs are harder to design than antibiotics. Useful targets are the features we lack: fungal membranes contain **ergosterol** instead of cholesterol, which azole drugs stop the fungus making and amphotericin binds to, and echinocandins block the synthesis of the wall's glucans.
K: Fungal cells are eukaryotic with chitin walls and no chloroplasts; fungi feed by external digestion and absorption.
!: Grouping fungi with plants. Fungi don't photosynthesise, have chitin rather than cellulose walls, and are more closely related to animals than to plants.
T: Chitin | A tough nitrogen-containing polysaccharide in fungal cell walls and arthropod exoskeletons
T: Hypha | A thread-like filament that makes up the body of most fungi
T: Mycelium | The network of hyphae that forms a fungus
SUM: Fungi have chitin walls, no chloroplasts, and often grow as hyphae forming a mycelium.
SUM: They digest food externally and absorb the products.
SUM: Fungi are more closely related to animals than to plants.
SRC: OpenStax, Biology 2e, section 24.1 "Characteristics of Fungi" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/24-1-characteristics-of-fungi
Q: What are fungal cell walls made of? | Mainly chitin, with glucans.
Q: How does a fungus digest its food? | It secretes enzymes into its surroundings to break food down outside its body, then absorbs the products through its hyphae.
M1: Which feature distinguishes fungal cells from plant cells? | Chitin cell walls | A nucleus | Mitochondria | A plasma membrane | Both are eukaryotic with nuclei, mitochondria and membranes; fungal walls are chitin, plant walls cellulose.
M2: Bread mould spreads over a slice of bread and the bread softens beneath it. What explains the softening? | Enzymes secreted by the hyphae digest the bread outside the fungus | The mould photosynthesises | The mould's chloroplasts break down starch | The bread absorbs water from the mould | Fungi secrete digestive enzymes and absorb the products, breaking down their food from the outside.
M3: Why does a mycelium suit a fungus's way of feeding? | Its branching threads give an enormous surface area for secreting enzymes and absorbing nutrients | It lets the fungus move quickly to new food | It traps sunlight for photosynthesis | It stores food as starch | External digestion and absorption both depend on contact with the food, so a large surface area of thin hyphae makes feeding efficient.
TF2: Fungi are more closely related to animals than to plants. | true | Molecular evidence places fungi and animals together in the opisthokonts, separate from plants.

## Bacterial cells
S: Bacteria are the most familiar prokaryotes. Their cell walls, built from peptidoglycan, come in two main designs that the Gram stain tells apart, and these differences matter for how we treat bacterial infections.
O: Describe the structure of a bacterial cell wall and its function
O: Explain the difference between Gram-positive and Gram-negative bacteria
O: Explain why some antibiotics damage bacteria but not human cells
PRE: Prokaryotic cells
H: The peptidoglycan wall
P: The bacterial wall is made of **peptidoglycan**: long sugar chains cross-linked by short peptides into a single mesh around the cell. It holds the cell's shape (rods, spheres, spirals) and stops it bursting from osmotic water uptake.
H: Gram-positive and Gram-negative
- **Gram-positive** bacteria (such as *Staphylococcus*) have a thick peptidoglycan layer that keeps the crystal violet stain and appears purple.
- **Gram-negative** bacteria (such as *E. coli*) have a thin peptidoglycan layer and an **outer membrane** containing lipopolysaccharide; they lose the stain and are counterstained pink.
P: The outer membrane makes Gram-negative bacteria harder to kill with some antibiotics, because it blocks many molecules from reaching the wall.
H: Why antibiotics can be selective
P: Human cells have no peptidoglycan. **Penicillins** block the enzymes that cross-link peptidoglycan, so growing bacteria build weak walls and burst. Other antibiotics target bacterial 70S ribosomes, which differ from our cytoplasmic 80S ribosomes. Targeting structures that only bacteria have is what makes these drugs selectively toxic.
K: Bacterial walls are made of peptidoglycan; its thickness and the presence of an outer membrane divide bacteria into Gram-positive and Gram-negative.
!: Thinking antibiotics work against viruses. Viruses have no wall or ribosomes of their own, so antibiotics have nothing to act on.
T: Peptidoglycan | The mesh of sugar chains cross-linked by peptides that forms the bacterial cell wall
T: Gram stain | A staining method that separates bacteria into Gram-positive (purple) and Gram-negative (pink) by their wall structure
T: Selective toxicity | Harming a pathogen while sparing the host, by targeting structures the host lacks
SUM: Peptidoglycan walls give bacteria their shape and protect them from bursting.
SUM: Gram-positive bacteria have thick walls; Gram-negative have thin walls plus an outer membrane.
SUM: Antibiotics are selective because they target bacterial walls and ribosomes.
SRC: OpenStax, Biology 2e, section 22.2 "Structure of Prokaryotes" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/22-2-structure-of-prokaryotes
SRC: World Health Organization, Antimicrobial resistance fact sheet | guidance | 2023 | https://www.who.int/news-room/fact-sheets/detail/antimicrobial-resistance
Q: Why do Gram-positive bacteria stain purple? | Their thick peptidoglycan layer keeps the crystal violet stain after the decolourising step.
Q: Why doesn't penicillin harm human cells? | It blocks the cross-linking of peptidoglycan, which human cells don't have.
M1: What is the bacterial cell wall made of? | Peptidoglycan | Cellulose | Chitin | Phospholipids | Bacterial walls are peptidoglycan; cellulose is the plant wall polymer and chitin the fungal one.
M2: A bacterium stains pink after a Gram stain. What does this tell you about its structure? | It has a thin peptidoglycan layer and an outer membrane | It has a thick peptidoglycan layer | It has no cell wall at all | It is a fungus | Pink after the counterstain means Gram-negative: a thin wall with an outer lipopolysaccharide membrane.
M3: Penicillin kills actively dividing bacteria but has little effect on bacteria that are not growing. Why? | It stops new peptidoglycan cross-links forming, which only matters while cells are building new wall | It only enters dividing cells' nuclei | Non-growing bacteria have no wall | It works by blocking photosynthesis | The drug weakens newly made wall; growing cells expanding with defective walls burst, while dormant cells aren't building wall.
SEQ2: Put the steps of a Gram stain in order. | Apply crystal violet ; Add iodine ; Wash with alcohol ; Counterstain with safranin | The iodine fixes the purple dye; alcohol removes it only from thin-walled Gram-negative cells, which then take up the pink counterstain.

## Cell organelles
S: Organelles are the specialised compartments and structures inside eukaryotic cells. This lesson surveys them as a system: which make things, which process and ship them, which supply energy and which recycle, and how they depend on each other.
O: Name the main eukaryotic organelles and state the function of each
O: Group organelles into the endomembrane system, energy organelles and others
O: Trace how organelles cooperate to make and secrete a protein
PRE: Eukaryotic cells
H: Organelles by job
- **Information**: the nucleus stores DNA; the nucleolus makes ribosomes.
- **Manufacturing**: ribosomes make proteins; the rough ER makes proteins for membranes and export; the smooth ER makes lipids.
- **Processing and shipping**: the Golgi apparatus modifies, sorts and packages; vesicles carry cargo between compartments.
- **Energy**: mitochondria (respiration) and, in plants and algae, chloroplasts (photosynthesis).
- **Recycling and detoxifying**: lysosomes digest; peroxisomes break down fatty acids and hydrogen peroxide.
- **Structure and movement**: the cytoskeleton.
IX: organelle-id
H: The endomembrane system
P: The nuclear envelope, ER, Golgi apparatus, lysosomes, vesicles and plasma membrane form one connected system. Membrane and cargo flow between them in vesicles that bud from one compartment and fuse with the next. Mitochondria and chloroplasts are not part of it: they make most of their own membranes and import proteins directly.
H: Organelles working together
P: To make a secreted protein such as insulin, the nucleus provides the mRNA, ribosomes on the rough ER make the chain and thread it into the ER, the Golgi modifies and packages it, a vesicle carries it to the plasma membrane, and mitochondria supply the ATP for every step.
H: How organelles are studied
P: Much of what we know comes from **cell fractionation**. Cells are broken open in a cold, buffered solution of the same water potential as the cells, then spun in a centrifuge at increasing speeds. Large, dense parts settle first: nuclei at low speed, then mitochondria and chloroplasts, then fragments of ER and other membranes, and ribosomes only at very high speed. Each fraction can then be tested to find which reactions it carries out.
P: **Investigate with the lab.** Go through every organelle in both cells and sort them into those that make proteins, those that release energy and those that store or transport materials.
IX: cell-explorer
K: Organelles divide the cell's work, but they function as a connected system, especially the endomembrane system.
!: Learning organelles as an unrelated list. Each depends on others: no organelle works alone.
T: Endomembrane system | The connected membranes of the nuclear envelope, ER, Golgi, lysosomes, vesicles and plasma membrane
T: Vesicle | A small membrane-bound sac that carries materials within the cell or to its surface
SUM: Organelles can be grouped by job: information, manufacturing, processing, energy, recycling and structure.
SUM: The endomembrane system exchanges membrane and cargo through vesicles.
SUM: Making a protein for export uses several organelles in sequence.
SRC: OpenStax, Biology 2e, section 4.4 "The Endomembrane System and Proteins" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/4-4-the-endomembrane-system-and-proteins
Q: Which organelles belong to the endomembrane system? | The nuclear envelope, endoplasmic reticulum, Golgi apparatus, lysosomes, vesicles and the plasma membrane.
Q: Why are mitochondria not part of the endomembrane system? | They are not connected to it by vesicle traffic; they grow and divide on their own and import proteins directly from the cytosol.
M1: Which organelle packages proteins into vesicles for secretion? | Golgi apparatus | Nucleolus | Mitochondrion | Peroxisome | The Golgi modifies, sorts and packages proteins into vesicles bound for the membrane, lysosomes or secretion.
SEQ2: Put the stages of making and secreting a protein in order. | Transcription in the nucleus ; Translation on rough ER ; Modification in the Golgi ; Transport in a vesicle ; Exocytosis at the plasma membrane | The information leaves the nucleus as mRNA, the protein is made into the ER, finished in the Golgi and carried out in a vesicle.
M2: A drug stops vesicles from budding off the ER. What happens to a protein destined for secretion? | It builds up in the ER and is not secreted | It is secreted faster | It is made in the nucleus instead | It is digested by chloroplasts | Without vesicle transport, proteins can't move from the ER to the Golgi and on to the surface.
M3: Cells lining the stomach secrete a lot of enzyme and also divide often. Which combination of organelles would you expect to be prominent? | Extensive rough ER and Golgi, many mitochondria, and active nuclei with large nucleoli | Large vacuoles and chloroplasts | Few ribosomes and many peroxisomes | Only lysosomes | Heavy protein secretion needs ribosome production (nucleoli), rough ER, Golgi and ATP from mitochondria.
M2: Which organelle is the site of aerobic respiration? | The mitochondrion | The ribosome | The Golgi apparatus | The nucleolus | Aerobic respiration releases energy as ATP in the mitochondria.

## Nucleus and nucleolus
S: The nucleus holds almost all of a eukaryotic cell's DNA and controls which genes are used. Inside it, the nucleolus builds the ribosomes the cell needs to make proteins.
O: Describe the structure of the nucleus, including the envelope and nuclear pores
O: Explain how DNA is packaged as chromatin
O: State the function of the nucleolus
PRE: Cell organelles
H: The nuclear envelope
P: The nucleus is enclosed by a **double membrane**, the nuclear envelope, whose outer membrane is continuous with the rough ER. Thousands of **nuclear pores**, large protein complexes, control traffic: mRNA and ribosomal subunits leave, while proteins such as histones and transcription factors enter. Inside, a meshwork of lamin filaments supports the envelope.
H: Chromatin and chromosomes
P: Each human cell nucleus contains about 2 m of DNA packed into a space about 6 µm across. The DNA is wound around **histone** proteins to form **nucleosomes**, then folded further into **chromatin**. Loosely packed chromatin (euchromatin) holds active genes; tightly packed heterochromatin is mostly silent. Before division, chromatin condenses into the visible chromosomes.
H: The nucleolus
P: The **nucleolus** is a dense region, not surrounded by a membrane, where genes for ribosomal RNA are transcribed and combined with imported proteins to make the large and small ribosomal subunits. These leave through the pores and assemble into working ribosomes in the cytoplasm. Cells that make a lot of protein have large nucleoli.
P: A few cell types lose their nucleus as they mature: mammalian red blood cells, for example, which can then carry more haemoglobin but cannot make new proteins or divide.
P: **Investigate with the lab.** Play the identification game until you can find the nucleus and nucleolus in both cells without hesitating.
IX: organelle-id
K: The nucleus stores and controls access to DNA, and its pores regulate traffic in and out; the nucleolus makes ribosomal subunits.
!: Thinking the nucleolus is a smaller nucleus with its own membrane. It is a region inside the nucleus, defined by the work done there, with no membrane.
T: Nuclear pore | A protein complex in the nuclear envelope that controls movement of molecules in and out
T: Chromatin | DNA wound around histone proteins, the form DNA takes in the nucleus
T: Nucleolus | A region inside the nucleus where ribosomal RNA is made and ribosomal subunits are assembled
SUM: A double-membrane envelope with pores surrounds the nucleus.
SUM: DNA is packed with histones into chromatin; active genes lie in looser chromatin.
SUM: The nucleolus builds ribosomal subunits.
SRC: OpenStax, Biology 2e, section 4.3 "Eukaryotic Cells" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells
SRC: Alberts B. et al., Molecular Biology of the Cell, 6th edition, chapter 4 "DNA, Chromosomes, and Genomes" | secondary | 2014
Q: What passes out of the nucleus through the nuclear pores? | mRNA and ribosomal subunits (and other RNAs); proteins such as histones and transcription factors pass in.
Q: What is made in the nucleolus? | Ribosomal RNA, which is combined with proteins to form ribosomal subunits.
M1: What are histones? | Proteins around which DNA is wound in chromatin | Enzymes that copy DNA | Pores in the nuclear envelope | RNA molecules in ribosomes | DNA wraps around histone proteins to form nucleosomes, the first level of chromatin packing.
M2: A cell is treated with a chemical that blocks nuclear pores. Which process stops first? | Export of mRNA to the ribosomes in the cytoplasm | DNA replication | Transcription of genes already being read | Respiration in mitochondria | Transcription happens inside the nucleus, but mRNA must leave through the pores to be translated.
M3: Why does a mature mammalian red blood cell have a limited lifespan of about 120 days? | It has no nucleus, so it can't make new proteins to repair itself or divide | It has too many mitochondria | Its nucleolus makes too many ribosomes | Its DNA is too tightly packed | Losing the nucleus makes room for haemoglobin but removes the genes needed for repair and renewal.
TF1: The outer membrane of the nuclear envelope is continuous with the rough endoplasmic reticulum. | true | The two membranes are joined, and the outer nuclear membrane also carries ribosomes.
M2: What is made in the nucleolus? | Ribosomal RNA and ribosome subunits | Lipids for the cell membrane | ATP for the cell's energy needs | Glucose by photosynthesis | The nucleolus assembles ribosome subunits from rRNA and proteins.

## Mitochondria
S: Mitochondria are the organelles where aerobic respiration releases most of the energy in food, storing it as ATP. Their folded inner membrane, their own DNA and their bacterial ancestry make them one of the cell's most distinctive organelles.
O: Describe the structure of a mitochondrion and relate it to function
O: State where the stages of aerobic respiration take place
O: Explain why cells differ in how many mitochondria they contain
PRE: Cell organelles
H: Structure
- An **outer membrane**, fairly permeable to small molecules.
- An **inner membrane** folded into **cristae**, carrying the electron transport chain and ATP synthase.
- The **intermembrane space** between the two.
- The **matrix**: a gel containing enzymes of the link reaction and Krebs cycle, mitochondrial DNA and 70S ribosomes.
H: Where respiration happens
P: Glycolysis happens in the cytosol. Pyruvate then enters the matrix, where the link reaction and the Krebs cycle oxidise it, releasing carbon dioxide and loading carriers (NADH and FADH₂) with electrons. On the inner membrane, the electron transport chain uses these electrons to pump protons into the intermembrane space; as protons flow back through **ATP synthase**, ATP is made. This is oxidative phosphorylation, and it needs oxygen as the final electron acceptor.
H: Form follows demand
P: The cristae greatly increase the area of inner membrane, and so the number of ATP synthase complexes. Cells with high energy demands, such as heart muscle, sperm tails and kidney tubule cells, are packed with mitochondria with dense cristae. Mitochondria also divide and fuse, so their number adjusts to the cell's needs.
P: Mitochondrial DNA is inherited almost entirely from the mother, because the egg contributes the cytoplasm of the zygote.
P: **Investigate with the lab.** Find the mitochondria in both cell types. Notice they appear in plant cells too, not only animal cells.
IX: organelle-id
K: Mitochondria make most of a cell's ATP by oxidative phosphorylation on their folded inner membrane; their number reflects the cell's energy demand.
!: Saying mitochondria "make energy". Energy can't be made: mitochondria transfer energy from food molecules into ATP.
T: Cristae | The folds of the inner mitochondrial membrane, where ATP is made
T: Matrix | The fluid interior of a mitochondrion, where the Krebs cycle takes place
T: ATP synthase | The enzyme in the inner membrane that makes ATP as protons flow through it
SUM: Mitochondria have two membranes; the inner one is folded into cristae.
SUM: The Krebs cycle runs in the matrix; ATP is made on the inner membrane.
SUM: Active cells have many mitochondria with dense cristae.
SRC: OpenStax, Biology 2e, section 7.4 "Oxidative Phosphorylation" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/7-4-oxidative-phosphorylation
SRC: Mitchell P., "Coupling of phosphorylation to electron and hydrogen transfer by a chemi-osmotic type of mechanism", Nature 191:144–148 | primary | 1961 | https://doi.org/10.1038/191144a0
Q: Where in the mitochondrion does the Krebs cycle take place? | In the matrix.
Q: Why do mitochondria have folded inner membranes? | The cristae increase the surface area for the electron transport chain and ATP synthase, so more ATP can be made.
M1: Which part of a mitochondrion contains ATP synthase? | The inner membrane | The outer membrane | The matrix only | The intermembrane space only | ATP synthase sits in the inner membrane, using the proton gradient between the intermembrane space and the matrix.
M2: Sperm cells have many mitochondria packed around the base of the tail. What does this suggest? | Swimming uses a lot of ATP, supplied close to where it is needed | Sperm cells photosynthesise | Mitochondria make the tail longer | The mitochondria store genetic information for the embryo | Mitochondria are concentrated where energy demand is high; the tail's beating is powered by ATP.
M3: A poison blocks the electron transport chain. Why does ATP production fall sharply even though glycolysis can continue? | Most ATP comes from oxidative phosphorylation, which depends on the electron transport chain building the proton gradient | Glycolysis happens in the mitochondria | The Krebs cycle makes most of the ATP directly | ATP synthase is in the cytosol | Glycolysis yields only 2 ATP per glucose; the bulk comes from proton flow through ATP synthase, which stops when electron transport stops.
TF2: Mitochondrial DNA is usually inherited from the father. | false | It is inherited almost entirely from the mother, through the egg's cytoplasm.
M2: Why do muscle cells contain many mitochondria? | They need a lot of ATP from aerobic respiration | They need to make a lot of protein for export | They store large amounts of starch | They carry out photosynthesis in daylight | Active cells such as muscle need plenty of ATP, which mitochondria provide.

## Chloroplasts
S: Chloroplasts are the organelles of photosynthesis in plants and algae. They capture light energy and use it to make sugars from carbon dioxide and water, releasing oxygen as a by-product.
O: Describe the structure of a chloroplast
O: State where the light-dependent and light-independent reactions take place
O: Relate the distribution of chloroplasts to their function in a leaf
PRE: Cell organelles
H: Structure
- A double **envelope** of outer and inner membranes.
- **Thylakoids**: flattened membrane sacs, stacked into **grana** and connected by lamellae. Their membranes hold chlorophyll and the electron transport chain.
- The **stroma**: the fluid around the thylakoids, with the enzymes of the Calvin cycle, starch grains, DNA and 70S ribosomes.
H: Two sets of reactions
P: In the **light-dependent reactions** on the thylakoid membranes, chlorophyll absorbs light, water is split releasing oxygen, and the energy is used to make ATP and NADPH. In the **light-independent reactions** (the Calvin cycle) in the stroma, ATP and NADPH are used to fix carbon dioxide into sugar, with the enzyme rubisco catalysing the first step.
H: Chloroplasts in the leaf
P: Palisade mesophyll cells, just under the upper surface of a leaf, are packed with chloroplasts, which can move within the cell to make the best use of the light. Like mitochondria, chloroplasts have their own circular DNA and divide by fission, evidence that they descend from cyanobacteria.
P: Chloroplasts belong to a family of organelles called plastids, which also includes amyloplasts that store starch in roots and tubers, and chromoplasts that colour fruits and petals.
P: **Investigate with the lab.** Find a chloroplast in the plant cell and confirm the animal cell has none.
IX: organelle-id
K: Chloroplasts capture light on their thylakoid membranes and fix carbon dioxide into sugar in their stroma.
!: Thinking plant cells have chloroplasts instead of mitochondria. Plant cells have both: chloroplasts make sugar, and mitochondria release its energy by respiration.
T: Thylakoid | A flattened membrane sac in a chloroplast where the light-dependent reactions occur
T: Granum | A stack of thylakoids
T: Stroma | The fluid in a chloroplast around the thylakoids, where the Calvin cycle occurs
SUM: Chloroplasts have a double envelope, thylakoids stacked in grana, and stroma.
SUM: Light-dependent reactions occur on thylakoids; the Calvin cycle in the stroma.
SUM: Plant cells contain both chloroplasts and mitochondria.
SRC: OpenStax, Biology 2e, section 8.1 "Overview of Photosynthesis" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/8-1-overview-of-photosynthesis
Q: Where in the chloroplast is chlorophyll found? | In the thylakoid membranes.
Q: What is fixed in the Calvin cycle, and where does it happen? | Carbon dioxide is fixed into sugar, in the stroma.
M1: Where do the light-dependent reactions of photosynthesis take place? | On the thylakoid membranes | In the stroma | In the matrix | In the cytosol | Chlorophyll and the electron transport chain are in the thylakoid membranes, where light energy is captured.
M2: Palisade cells have far more chloroplasts than spongy mesophyll cells. Why? | They are nearest the upper surface and receive the most light | They have no mitochondria | They store starch for the whole plant | They carry out gas exchange only | More chloroplasts where the light is brightest lets the leaf capture more energy.
M3: A plant is kept in light but with no carbon dioxide. Which process stops, and why? | The Calvin cycle, because it needs carbon dioxide to fix into sugar | The light-dependent reactions, because they need carbon dioxide to split water | Respiration, because it uses carbon dioxide | Nothing stops, because carbon dioxide is not used | Carbon dioxide is the substrate of carbon fixation; without it the Calvin cycle halts (and ATP and NADPH soon build up).
MS2: Which features do chloroplasts share with bacteria? | Circular DNA ; 70S ribosomes ; Division by fission | A nucleus ; Golgi apparatus ; Linear chromosomes with histones | These shared features support the endosymbiotic origin of chloroplasts from cyanobacteria.
M2: In which part of a chloroplast are the light-dependent reactions? | The thylakoid membranes | The stroma | The outer envelope | The starch grains | Chlorophyll in the thylakoid membranes absorbs light for the light-dependent stage.

## Ribosomes
S: Ribosomes are the cell's protein factories: they read the code in messenger RNA and join amino acids in the order it specifies. Every cell has them, and differences between bacterial and human ribosomes are the target of many antibiotics.
O: Describe the structure of a ribosome
O: Distinguish free and membrane-bound ribosomes and their products
O: Explain the difference between 70S and 80S ribosomes and why it matters
PRE: Cell organelles
H: Structure
P: A ribosome is made of two subunits, each built from ribosomal RNA (rRNA) and proteins; it has no membrane. The small subunit binds the mRNA; the large subunit joins amino acids together. The rRNA itself catalyses the formation of peptide bonds, so the ribosome is a **ribozyme**, an RNA enzyme.
H: Free and bound ribosomes
- **Free ribosomes** in the cytosol make proteins that stay in the cytosol or go to the nucleus, mitochondria or peroxisomes.
- **Membrane-bound ribosomes** on the rough ER make proteins for secretion, for membranes and for lysosomes, threading them into the ER as they are made.
P: The same ribosome can be either: a signal sequence at the start of a protein directs its ribosome to the ER.
H: 70S and 80S
P: Ribosomes are described by how fast they sediment in a centrifuge, in Svedberg units (S). Prokaryotic ribosomes are **70S** (50S and 30S subunits); eukaryotic cytoplasmic ribosomes are **80S** (60S and 40S). The values don't add up because sedimentation depends on shape as well as mass. Mitochondria and chloroplasts have 70S-type ribosomes.
P: Antibiotics such as streptomycin and tetracyclines bind the 30S subunit, and erythromycin the 50S subunit, blocking bacterial protein synthesis with much less effect on our 80S ribosomes.
P: **Investigate with the lab.** Watch tRNAs move through the A, P and E sites as the chain grows, until a stop codon releases it.
IX: ribosome
K: Ribosomes, made of rRNA and protein, translate mRNA into protein; bacterial 70S and eukaryotic 80S ribosomes differ enough for antibiotics to tell them apart.
!: Calling ribosomes membrane-bound organelles. They have no membrane; "bound" ribosomes are simply attached to the ER.
T: Ribosome | A structure of rRNA and protein that translates mRNA into a polypeptide
T: Ribozyme | An RNA molecule that acts as an enzyme
T: Svedberg unit | A unit of sedimentation rate used to describe the size of ribosomes and their subunits
SUM: Ribosomes have two subunits of rRNA and protein, and rRNA catalyses peptide bonds.
SUM: Free ribosomes make cytosolic proteins; bound ribosomes make proteins for export and membranes.
SUM: Prokaryotes have 70S ribosomes and eukaryotes 80S, a difference antibiotics exploit.
SRC: OpenStax, Biology 2e, section 15.5 "Ribosomes and Protein Synthesis" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/15-5-ribosomes-and-protein-synthesis
SRC: Nissen P. et al., "The structural basis of ribosome activity in peptide bond synthesis", Science 289:920–930 | primary | 2000 | https://doi.org/10.1126/science.289.5481.920
Q: Where are proteins for secretion made? | On ribosomes bound to the rough endoplasmic reticulum.
Q: Why don't a ribosome's subunit S values add up (50S + 30S = 70S)? | Svedberg units measure sedimentation rate, which depends on shape as well as mass, so they are not additive.
M1: What are ribosomes made of? | Ribosomal RNA and proteins | DNA and lipids | Phospholipids only | Cellulose and protein | Each subunit combines rRNA with many proteins; there is no membrane.
M2: Tetracycline binds to the 30S ribosomal subunit. Why does it harm bacteria more than human cells? | Human cytoplasmic ribosomes are 80S, with a 40S small subunit that it binds poorly | Human cells have no ribosomes | Bacteria have no 30S subunit | Tetracycline only enters the nucleus | The drug targets the bacterial small subunit, which differs from the eukaryotic one.
M3: Some antibiotics that act on bacterial ribosomes cause side effects in tissues with high energy demand. What is a likely explanation? | Mitochondria have bacterial-type ribosomes, so the drug can reduce mitochondrial protein synthesis | The drugs block glycolysis directly | Human 80S ribosomes are identical to 70S ribosomes | The drugs dissolve cell membranes | Mitochondria descend from bacteria and keep 70S-type ribosomes, so drugs aimed at bacteria can partly affect them.
TF1: Ribosomes are surrounded by a single membrane. | false | Ribosomes have no membrane; they are complexes of RNA and protein.
M2: What does a tRNA molecule carry to the ribosome? | A specific amino acid, matched by its anticodon | A copy of the gene from the nucleus | The ribosome's two subunits | An enzyme that copies DNA | Each tRNA's anticodon pairs with an mRNA codon and delivers the matching amino acid.

## Endoplasmic reticulum
S: The endoplasmic reticulum is a network of membranes spreading through the cytoplasm from the nuclear envelope. Its rough parts make and fold proteins for export and membranes; its smooth parts make lipids, detoxify drugs and store calcium.
O: Describe the structure of rough and smooth ER
O: State the functions of each
O: Relate the amount of each type of ER to a cell's function
PRE: Ribosomes
H: Structure
P: The ER is a single continuous membrane enclosing a space called the **lumen**, folded into flattened sacs (cisternae) and tubes. It is continuous with the outer nuclear membrane. **Rough ER** is studded with ribosomes and is mostly flattened sacs; **smooth ER** has no ribosomes and is mostly tubular.
H: Rough ER: proteins
P: Proteins made on bound ribosomes are threaded into the lumen as they grow. There they fold, with help from chaperone proteins, and many have sugar chains added (glycosylation) and disulfide bonds formed. Proteins that fold badly are held back and destroyed, a quality-control step. Correct proteins leave in vesicles for the Golgi.
H: Smooth ER: lipids, detoxification and calcium
- Makes **phospholipids and cholesterol** for membranes, and **steroid hormones** in cells such as the adrenal cortex and testes.
- **Detoxifies** drugs and toxins, especially in liver cells, using enzymes that make them more water-soluble so they can be excreted.
- **Stores calcium ions**: in muscle, the smooth ER (sarcoplasmic reticulum) releases Ca²⁺ to trigger contraction.
P: A plasma cell making antibodies is full of rough ER; a liver cell exposed to alcohol or some drugs expands its smooth ER.
K: Rough ER makes and folds proteins for export and membranes; smooth ER makes lipids, detoxifies and stores calcium.
!: Thinking the rough ER makes all the cell's proteins. Proteins that stay in the cytosol are made on free ribosomes.
T: Rough endoplasmic reticulum | ER with ribosomes on its surface, where proteins for secretion and membranes are made
T: Smooth endoplasmic reticulum | ER without ribosomes, where lipids are made and drugs detoxified
T: Lumen | The space enclosed by the ER membrane
SUM: The ER is a continuous membrane network joined to the nuclear envelope.
SUM: Rough ER folds and modifies proteins; smooth ER makes lipids, detoxifies and stores Ca²⁺.
SUM: The type and amount of ER reflect each cell's job.
SRC: OpenStax, Biology 2e, section 4.4 "The Endomembrane System and Proteins" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/4-4-the-endomembrane-system-and-proteins
Q: Name three functions of smooth ER. | Making lipids (phospholipids, cholesterol, steroid hormones), detoxifying drugs and storing calcium ions.
Q: What happens to proteins inside the rough ER? | They fold with the help of chaperones and are modified, for example by glycosylation; misfolded proteins are held back and destroyed.
M1: Which cell would have the most smooth ER? | A cell of the adrenal cortex making steroid hormones | A red blood cell | A plasma cell making antibodies | A bacterial cell | Steroid hormones are lipids made in the smooth ER; antibody-secreting cells are rich in rough ER instead.
M2: Regular heavy drinking increases the amount of smooth ER in liver cells. Why? | The liver cells detoxify more alcohol and make more of the enzymes, and membrane, to do it | Alcohol is a protein made by the rough ER | Smooth ER stores the alcohol permanently | Alcohol turns rough ER into chloroplasts | Detoxification happens in the smooth ER, which expands when demand increases.
M3: A mutation causes a secreted protein to fold incorrectly. Where is the protein most likely to be found, and why? | Retained in the ER and broken down, because ER quality control stops misfolded proteins moving on | Secreted normally | Stored in the nucleolus | In the chloroplast | The ER checks folding and sends misfolded proteins for destruction rather than to the Golgi; this is the basis of diseases such as one form of cystic fibrosis.
MATCH2: Match each cell to the type of ER it has most of. | Plasma cell (antibodies) = rough ER ; Testis cell (testosterone) = smooth ER ; Liver cell after drug exposure = smooth ER ; Pancreatic cell (digestive enzymes) = rough ER | Proteins for export are made on rough ER; lipids and detoxification depend on smooth ER.

## Golgi apparatus
S: The Golgi apparatus is the cell's processing and dispatch centre. It receives proteins and lipids from the ER, modifies them, sorts them by destination and sends them on in vesicles.
O: Describe the structure of the Golgi apparatus
O: Explain how it modifies and sorts proteins
O: Explain how lysosomal enzymes are targeted to lysosomes
PRE: Endoplasmic reticulum
H: Structure
P: The Golgi is a stack of flattened membrane sacs (cisternae) with two faces: the **cis face**, which receives vesicles from the ER, and the **trans face**, from which vesicles leave. Proteins pass through the stack from cis to trans, meeting different enzymes on the way.
H: Modification
P: Golgi enzymes trim and add sugars to proteins (continuing glycosylation begun in the ER), add phosphate or sulfate groups, and in some cases cut proteins into their active forms. Plant Golgi also makes non-cellulose polysaccharides for the cell wall.
H: Sorting and dispatch
- **Secretory vesicles** carry products such as hormones and enzymes to the plasma membrane for exocytosis, either continuously or when signalled.
- **Membrane proteins** are delivered to the plasma membrane.
- **Lysosomal enzymes** are tagged with **mannose-6-phosphate**, recognised by receptors in the trans Golgi that send them to lysosomes.
P: In the genetic disorder I-cell disease, the tagging enzyme is missing, so lysosomal enzymes are secreted instead of delivered, and undigested material builds up in the lysosomes.
P: **Investigate with the lab.** Find the Golgi apparatus, then the rough endoplasmic reticulum, and trace the route a protein takes between them.
IX: organelle-id
K: The Golgi modifies proteins and lipids as they pass from its cis to its trans face, and sorts them into vesicles by destination.
!: Thinking the Golgi makes proteins. It receives proteins made on the rough ER and finishes, sorts and ships them.
T: Golgi apparatus | A stack of membrane sacs that modifies, sorts and packages proteins and lipids
T: Glycosylation | Adding sugar chains to proteins or lipids
T: Exocytosis | Release of a vesicle's contents by fusion of the vesicle with the plasma membrane
SUM: The Golgi is a stack of cisternae with a receiving cis face and a shipping trans face.
SUM: It modifies proteins, for example by glycosylation.
SUM: It sorts products into vesicles for secretion, the membrane or lysosomes.
SRC: OpenStax, Biology 2e, section 4.4 "The Endomembrane System and Proteins" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/4-4-the-endomembrane-system-and-proteins
SRC: Alberts B. et al., Molecular Biology of the Cell, 6th edition, chapter 13 "Intracellular Membrane Traffic" | secondary | 2014
Q: What are the cis and trans faces of the Golgi? | The cis face receives vesicles from the ER; the trans face sends vesicles on to their destinations.
Q: How are enzymes directed to lysosomes? | They are tagged with mannose-6-phosphate in the Golgi, and receptors for this tag send them to lysosomes.
M1: What is the main function of the Golgi apparatus? | Modifying, sorting and packaging proteins and lipids | Making ATP | Translating mRNA | Storing DNA | The Golgi processes molecules made in the ER and sends them to the right place.
M2: Radioactive amino acids are given to a pancreatic cell. In which order would the label appear? | Rough ER, then Golgi, then secretory vesicles | Golgi, then nucleus, then ER | Mitochondria, then Golgi, then nucleus | Lysosomes, then ER, then Golgi | This classic pulse-chase experiment by Palade traced proteins from the ER through the Golgi to secretion.
M3: In I-cell disease, lysosomal enzymes are found in the blood, while patients' lysosomes fill with undigested material. What is the underlying fault? | The enzymes are not tagged with mannose-6-phosphate, so they are secreted instead of sent to lysosomes | The lysosomes have no membrane | The ER makes no proteins | The cells have no Golgi apparatus | Without the sorting tag, the default route out of the Golgi is secretion.
TF1: Proteins move through the Golgi from the cis face to the trans face. | true | They arrive from the ER at the cis face and leave from the trans face.
M2: What does the Golgi apparatus do? | Modifies, packages and sends proteins to their destinations | Makes proteins by joining amino acids together | Releases energy from glucose by respiration | Stores the cell's genetic information safely | Proteins from the rough ER are modified and packaged in the Golgi apparatus.

## Lysosomes and peroxisomes
S: Lysosomes and peroxisomes are small membrane-bound organelles that break things down. Lysosomes digest worn-out organelles and engulfed material with acid enzymes; peroxisomes oxidise fatty acids and destroy the hydrogen peroxide this produces.
O: Describe the structure and functions of lysosomes
O: Describe the functions of peroxisomes
O: Explain how faults in these organelles cause disease
PRE: Golgi apparatus
H: Lysosomes
P: Lysosomes are vesicles containing about 50 kinds of **hydrolytic enzymes**, which work best at about pH 4.5–5. Proton pumps in the lysosome membrane keep the inside acidic. Because the enzymes work poorly at the neutral pH of the cytosol, a leaking lysosome does little damage, a built-in safeguard.
- **Phagocytosis**: digesting bacteria engulfed by white blood cells.
- **Autophagy**: breaking down worn-out organelles and recycling their parts.
- **Autolysis**: digesting the cell's own contents after death, and remodelling tissues in development.
H: Peroxisomes
P: Peroxisomes contain oxidative enzymes. They break down very-long-chain fatty acids and some amino acids, help make certain lipids (including those in myelin), and detoxify substances such as alcohol in the liver. These reactions produce **hydrogen peroxide**, which the enzyme **catalase** immediately converts to water and oxygen.
H: When they fail
P: In **lysosomal storage disorders**, one enzyme is missing and its substrate accumulates. In Tay–Sachs disease, lack of hexosaminidase A lets a lipid (GM2 ganglioside) build up in nerve cells. In Zellweger syndrome, peroxisomes fail to form properly, with severe effects on the brain and liver.
K: Lysosomes digest with acid hydrolases; peroxisomes oxidise fatty acids and destroy hydrogen peroxide with catalase.
!: Thinking lysosomes are found only in animal cells that eat bacteria. All animal cells use lysosomes for recycling; plant vacuoles do a similar job.
T: Lysosome | A membrane-bound vesicle of acid hydrolase enzymes that digests materials in the cell
T: Autophagy | The digestion of a cell's own worn-out components by lysosomes
T: Catalase | An enzyme in peroxisomes that breaks down hydrogen peroxide into water and oxygen
SUM: Lysosomes digest engulfed material and worn-out organelles at acid pH.
SUM: Peroxisomes oxidise fatty acids and destroy hydrogen peroxide.
SUM: Missing enzymes in these organelles cause storage and peroxisomal disorders.
SRC: OpenStax, Biology 2e, section 4.4 "The Endomembrane System and Proteins" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/4-4-the-endomembrane-system-and-proteins
SRC: NHS, "Tay-Sachs disease" | guidance | 2023 | https://www.nhs.uk/conditions/tay-sachs-disease/
Q: Why is the inside of a lysosome kept acidic? | Its hydrolytic enzymes work best at about pH 4.5–5, and the acidity keeps them active inside while making them less harmful if they leak.
Q: What does catalase do? | It breaks down hydrogen peroxide into water and oxygen.
M1: What is autophagy? | Lysosomes digesting the cell's own worn-out organelles | Cells engulfing bacteria | Peroxisomes making lipids | Cells dividing | In autophagy, worn-out parts are enclosed and delivered to lysosomes for digestion and recycling.
M2: A white blood cell engulfs a bacterium. Which organelle fuses with the vesicle containing it? | A lysosome | A peroxisome | A mitochondrion | The nucleus | Lysosomes fuse with phagocytic vesicles and their enzymes digest the bacterium.
M3: Why might a small leak from a lysosome do little harm to the cell? | Lysosomal enzymes work poorly at the neutral pH of the cytosol | The cytosol contains no proteins | Lysosomal enzymes only digest bacteria | Catalase destroys the enzymes instantly | The enzymes need acid conditions; at about pH 7.2 their activity is low, a safeguard against self-digestion.
TF2: Tay–Sachs disease is caused by a missing lysosomal enzyme. | true | Lack of hexosaminidase A allows GM2 ganglioside to build up in nerve cells.

## Cytoskeleton
S: The cytoskeleton is a network of protein filaments that gives the cell its shape, holds organelles in place, moves materials around and lets cells crawl, contract and divide. It is made of three kinds of filament with different jobs.
O: Describe the three types of cytoskeletal filament
O: Explain how motor proteins move cargo and cells
O: Describe the structure and function of cilia and flagella in eukaryotes
PRE: Cell organelles
H: Three kinds of filament
- **Microfilaments** (about 7 nm): two twisted chains of **actin**. They support the cell surface, form microvilli, and with myosin cause muscle contraction, cell crawling and the furrow that divides cells in cytokinesis.
- **Intermediate filaments** (about 10 nm): rope-like proteins such as **keratin** in skin cells and **lamins** in the nucleus. They resist tension and anchor cells together.
- **Microtubules** (about 25 nm): hollow tubes of **tubulin**, growing from the centrosome. They act as tracks for transport, form the spindle that separates chromosomes, and make up cilia and flagella.
H: Motor proteins
P: Motor proteins use ATP to walk along filaments. **Kinesin** and **dynein** carry vesicles and organelles along microtubules, for example along a nerve cell's axon, which can be a metre long. **Myosin** pulls on actin filaments in muscle.
H: Cilia and flagella
P: Eukaryotic cilia and flagella have a core of nine pairs of microtubules around a central pair (the "9 + 2" pattern). Dynein arms slide neighbouring pairs past each other, bending the structure. Cilia lining the airways sweep mucus upwards; a sperm cell swims with a flagellum.
P: Eukaryotic flagella are completely different from bacterial flagella, which are rigid protein spirals turned by a rotary motor in the membrane.
K: Actin microfilaments, intermediate filaments and tubulin microtubules give the cell shape and strength, and with motor proteins they move cargo, chromosomes and whole cells.
!: Thinking the cytoskeleton is fixed like a bony skeleton. Microfilaments and microtubules are built and dismantled constantly as the cell changes shape and divides.
T: Microtubule | A hollow cylinder of tubulin, used for transport tracks, the spindle, cilia and flagella
T: Microfilament | A thin filament of actin, involved in cell shape, movement and contraction
T: Motor protein | A protein, such as kinesin, dynein or myosin, that uses ATP to move along a filament
SUM: The cytoskeleton has microfilaments, intermediate filaments and microtubules.
SUM: Motor proteins move cargo along filaments using ATP.
SUM: Eukaryotic cilia and flagella have a 9 + 2 arrangement of microtubules.
SRC: OpenStax, Biology 2e, section 4.5 "The Cytoskeleton" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/4-5-the-cytoskeleton
Q: Which cytoskeletal filament forms the spindle in cell division? | Microtubules.
Q: What do kinesin and dynein do? | They are motor proteins that move cargo such as vesicles along microtubules, using ATP.
M1: Which protein makes up microtubules? | Tubulin | Actin | Keratin | Collagen | Microtubules are hollow tubes of tubulin; actin forms microfilaments and keratin intermediate filaments.
M2: People with primary ciliary dyskinesia have faulty dynein arms in their cilia. Which problem would you expect? | Repeated chest infections, because airway cilia can't clear mucus | Weak bones | Inability to digest starch | Faster wound healing | Without working dynein, cilia can't beat, so mucus and trapped microbes stay in the airways.
M3: Colchicine stops microtubules from forming. Why does it block cell division? | The spindle that separates chromosomes is made of microtubules | It destroys actin in the cleavage furrow | It prevents DNA replication | It removes the nuclear envelope | Without microtubules there is no spindle, so chromosomes can't be separated and the cell is stuck in mitosis.
MATCH2: Match each filament to a role. | Microtubules = spindle and cilia ; Actin microfilaments = muscle contraction and cell crawling ; Intermediate filaments = resisting tension in skin cells | Each filament type has its own mechanical properties and partners.

## Cell membranes
S: Every cell is bounded by a plasma membrane, and eukaryotic cells are full of internal membranes too. This lesson covers what membranes do: separate, control, communicate and provide surfaces where reactions happen.
O: List the functions of membranes in cells
O: Explain what is meant by partially permeable
O: Explain why internal membranes matter in eukaryotic cells
PRE: Eukaryotic cells
H: What membranes do
- **Separate** the inside of the cell from the outside, and compartments from each other.
- **Control** what passes, letting some substances through and not others.
- **Communicate**: receptor proteins detect hormones and other signals; glycoproteins identify the cell to the immune system.
- **Provide surfaces** where enzymes and carriers are arranged in order, as in the electron transport chains of mitochondria and chloroplasts.
- **Attach** cells to each other and to the extracellular matrix.
H: Partially permeable
P: Small non-polar molecules such as oxygen and carbon dioxide cross membranes easily. Water crosses slowly through the lipid and fast through channel proteins called aquaporins. Ions and large polar molecules such as glucose hardly cross the lipid at all, so they need specific transport proteins. A membrane that lets some substances through but not others is **partially permeable** (or selectively permeable).
H: Membranes inside the cell
P: Internal membranes keep different conditions in different compartments, concentrate enzymes and substrates together, and let gradients build up. A proton gradient across the inner mitochondrial membrane, for example, drives ATP synthesis; without a membrane there could be no gradient.
P: In a liver cell, internal membranes have many times the area of the plasma membrane, an indication of how much of the cell's work happens on them.
K: Membranes separate and control, but they also detect signals, identify cells and provide the surfaces where key reactions and gradients form.
!: Thinking membranes are just passive bags. They are active, selective structures packed with proteins that do much of the cell's work.
T: Plasma membrane | The membrane surrounding a cell, controlling what enters and leaves
T: Partially permeable | Allowing some substances to pass through but not others
T: Aquaporin | A channel protein that lets water molecules cross a membrane rapidly
SUM: Membranes separate, control, communicate, attach and provide reaction surfaces.
SUM: They are partially permeable: small non-polar molecules cross easily, ions and large polar molecules need proteins.
SUM: Internal membranes allow compartments and gradients.
SRC: OpenStax, Biology 2e, section 5.1 "Components and Structure" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/5-1-components-and-structure
Q: What does partially permeable mean? | Letting some substances pass through but not others.
Q: Name three functions of the plasma membrane besides controlling what passes. | Cell signalling (receptors), cell recognition (glycoproteins), and attachment to other cells or the matrix.
M1: Which substance crosses a phospholipid bilayer most easily without a protein? | Oxygen | Sodium ions | Glucose | Proteins | Small non-polar molecules such as oxygen dissolve in and pass through the lipid; ions and large polar molecules don't.
M2: Why can a mitochondrion make ATP only when its inner membrane is intact? | ATP synthesis depends on a proton gradient that only an intact membrane can maintain | The membrane contains all the cell's glucose | Ribosomes are attached to it | It stores ATP between its layers | A leaky membrane lets protons flow back without passing through ATP synthase, so the gradient collapses.
M3: A cell is placed in a solution containing a dye that can't cross membranes. The dye stays outside but the cell keeps importing glucose. What does this show about the membrane? | It is selectively permeable, with transport proteins for some substances but not others | It is fully permeable | It is impermeable to everything | Glucose crosses by simple diffusion through the lipid | Selective transport proteins let glucose in while molecules without a matching protein are kept out.
MS2: Which are functions of membrane proteins? | Transport ; Receiving signals ; Catalysing reactions | Storing DNA ; Making cellulose fibres outside the wall only ; Replicating chromosomes | Membrane proteins act as channels, carriers, receptors, enzymes and attachment points.

## Membrane structure
S: Membranes are built from a double layer of phospholipids with proteins floating in it, a structure described by the fluid mosaic model. This lesson explains how the parts fit together and why the structure behaves as it does.
O: Describe the fluid mosaic model of membrane structure
O: Explain why phospholipids form a bilayer in water
O: Describe the roles of cholesterol, proteins and carbohydrates in membranes
PRE: Cell membranes
H: The phospholipid bilayer
P: A phospholipid has a **hydrophilic** head (a phosphate group) and two **hydrophobic** fatty acid tails. In water, phospholipids arrange themselves into a bilayer with heads facing the water on both sides and tails hidden in the middle. The hydrophobic core, about 3–4 nm thick within a membrane of roughly 5–10 nm, is what blocks ions and polar molecules.
H: The fluid mosaic model
P: In the **fluid mosaic model** (Singer and Nicolson, 1972), the bilayer is fluid: phospholipids and many proteins move sideways within it. Proteins are scattered through it like tiles in a mosaic.
- **Integral (transmembrane) proteins** span the bilayer: channels, carriers, pumps and many receptors.
- **Peripheral proteins** sit on one surface, often attached to integral proteins.
H: Cholesterol and carbohydrates
P: **Cholesterol** sits between the phospholipids in animal membranes. It restrains their movement at body temperature, making the membrane less fluid and less leaky, but stops them packing too tightly when cold. **Glycoproteins** and **glycolipids** carry short carbohydrate chains on the outer surface, forming the glycocalyx, which is used for cell recognition (such as ABO blood groups) and adhesion.
P: Membrane fluidity depends on temperature and on the fatty acids: unsaturated tails, with kinks from their double bonds, pack loosely and keep a membrane fluid. Organisms that live in the cold have more unsaturated fatty acids in their membranes.
K: A membrane is a fluid bilayer of phospholipids with proteins embedded in it; cholesterol tunes its fluidity and carbohydrates on the outside identify the cell.
!: Drawing membrane proteins in fixed positions. Many move sideways freely, which is why the model is called fluid.
T: Phospholipid bilayer | A double layer of phospholipids with hydrophilic heads outwards and hydrophobic tails inwards
T: Fluid mosaic model | The model of membranes as a fluid lipid bilayer with a mosaic of proteins moving within it
T: Glycoprotein | A protein with carbohydrate chains attached, important in cell recognition
SUM: Phospholipids form a bilayer because their tails are hydrophobic and their heads hydrophilic.
SUM: The fluid mosaic model describes proteins moving in a fluid bilayer.
SUM: Cholesterol regulates fluidity; glycoproteins and glycolipids act in recognition.
SRC: OpenStax, Biology 2e, section 5.1 "Components and Structure" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/5-1-components-and-structure
SRC: Singer S.J. and Nicolson G.L., "The fluid mosaic model of the structure of cell membranes", Science 175:720–731 | primary | 1972 | https://doi.org/10.1126/science.175.4023.720
Q: Why do phospholipids form a bilayer in water? | Their hydrophobic tails avoid water by facing each other in the middle, while their hydrophilic heads face the water on both sides.
Q: What does cholesterol do in animal membranes? | It regulates fluidity: it reduces fluidity and permeability at body temperature and prevents tight packing when cold.
M1: Which part of a phospholipid is hydrophobic? | The fatty acid tails | The phosphate head | The glycerol only | The whole molecule | The two fatty acid tails are non-polar; the phosphate head is polar and hydrophilic.
M2: In a famous experiment, a mouse cell and a human cell were fused, with their membrane proteins labelled in different colours. Within 40 minutes the colours were mixed over the whole surface. What does this show? | Membrane proteins move sideways within a fluid bilayer | Proteins are fixed in place | The cells exchanged DNA | The bilayer is made of protein | Frye and Edidin's 1970 experiment showed lateral diffusion of proteins, key evidence for the fluid mosaic model.
M3: Bacteria grown at low temperature make membranes with more unsaturated fatty acids. Why does this help? | Kinked unsaturated tails pack less tightly, keeping the membrane fluid enough to work in the cold | Unsaturated fatty acids are more hydrophilic | They make the membrane impermeable to water | They add cholesterol to the membrane | Membranes become rigid when cold; double bonds put kinks in the tails that stop them packing closely.
TF1: In the fluid mosaic model, carbohydrate chains are found mainly on the outer surface of the plasma membrane. | true | Glycoproteins and glycolipids face outwards, forming the glycocalyx used in recognition.

## Membrane transport
S: Substances cross membranes in several ways, which differ in whether they need energy and whether they need a protein. This lesson gives an overview that the following lessons explore one by one.
O: Distinguish passive from active transport
O: Choose the transport mechanism a given substance is likely to use
O: Explain how the size, charge and polarity of a molecule affect how it crosses a membrane
PRE: Membrane structure
H: Passive and active
- **Passive transport** needs no energy from the cell: substances move down their concentration gradient. It includes **simple diffusion** through the lipid, **facilitated diffusion** through channel or carrier proteins, and **osmosis** (water).
- **Active transport** uses energy, usually from ATP, to move substances against their gradient through protein pumps.
- **Bulk transport**, endocytosis and exocytosis, moves large particles or volumes in vesicles and also uses energy.
H: What decides the route
P: Small, non-polar molecules (oxygen, carbon dioxide, steroid hormones) diffuse straight through the lipid. Ions are charged and surrounded by water, so they can't enter the hydrophobic core and need channels or pumps. Large polar molecules such as glucose and amino acids need carrier proteins. Macromolecules and particles such as bacteria need vesicles.
H: Gradients
P: A concentration gradient is a difference in concentration between two regions. For ions, the electrical difference across the membrane matters too, so ions move down an **electrochemical gradient**. Cells spend a large share of their ATP maintaining gradients, especially of sodium and potassium ions, which then power other transport.
P: Rates matter as much as routes: the rate of passive transport rises with a steeper gradient, a larger surface area and a thinner barrier, which is why exchange surfaces such as alveoli and villi are large and thin.
K: Passive transport goes down gradients without energy; active and bulk transport use energy. The route depends on a molecule's size, charge and polarity.
!: Saying diffusion stops when molecules are evenly spread. Molecules keep moving; there is simply no net movement once concentrations are equal.
T: Passive transport | Movement across a membrane down a concentration gradient, without using energy from the cell
T: Active transport | Movement across a membrane against a concentration gradient, using energy from ATP
T: Electrochemical gradient | The combined concentration and electrical difference that drives ions across a membrane
SUM: Passive transport (diffusion, facilitated diffusion, osmosis) needs no energy.
SUM: Active and bulk transport use ATP.
SUM: Size, charge and polarity decide which route a substance takes.
SRC: OpenStax, Biology 2e, section 5.2 "Passive Transport" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/5-2-passive-transport
Q: Which transport processes are passive? | Simple diffusion, facilitated diffusion and osmosis.
Q: Why can't ions diffuse through the phospholipid bilayer? | They are charged and surrounded by a shell of water, so they can't dissolve in the hydrophobic core.
MATCH1: Match each substance to how it most likely crosses the plasma membrane. | Oxygen = simple diffusion ; Glucose = facilitated diffusion ; Sodium ions out of a cell = active transport ; A bacterium = endocytosis | Small non-polar molecules diffuse through the lipid; polar molecules and ions need proteins; particles need vesicles.
M1: Which process needs ATP? | Active transport | Simple diffusion | Facilitated diffusion | Osmosis | Only active transport (and bulk transport) uses the cell's energy; the others are driven by gradients.
M2: A substance moves into a cell against its concentration gradient, and the movement stops when a respiratory poison is added. What is the mechanism? | Active transport | Simple diffusion | Osmosis | Facilitated diffusion | Moving against a gradient needs energy; stopping respiration removes the ATP supply.
M3: Steroid hormones such as testosterone act on receptors inside cells, while insulin acts on receptors in the plasma membrane. What explains the difference? | Steroids are small and lipid-soluble so they cross the bilayer; insulin is a large polar protein that can't | Insulin is too small to be detected inside | Steroids are proteins | The bilayer is permeable to all hormones | Lipid-soluble molecules diffuse through the membrane to internal receptors; large polar molecules must signal from outside.

## Diffusion
S: Diffusion is the net movement of particles from where they are more concentrated to where they are less concentrated, driven by their random motion. It is how oxygen reaches your cells and carbon dioxide leaves them, and it explains why exchange surfaces look the way they do.
O: Define diffusion and explain it in terms of particle movement
O: State the factors that affect the rate of diffusion
O: Calculate surface area to volume ratios and explain their significance
PRE: Membrane transport
H: Random movement, net direction
P: Particles in liquids and gases move randomly. Where there are more particles, more move away than arrive, so there is a **net** movement down the concentration gradient until concentrations are equal. No energy from the cell is needed: the energy is the particles' own kinetic energy, so diffusion is faster when warmer.
H: What affects the rate
- **Concentration gradient**: steeper gradient, faster diffusion.
- **Surface area**: more area, faster.
- **Distance (thickness)**: shorter distance, much faster.
- **Temperature**: higher, faster.
- **Size and nature** of the particle: small, non-polar molecules cross membranes fastest.
P: **Fick's law** summarises the first three: rate ∝ (surface area × concentration difference) ÷ thickness. Lungs make the most of it with a huge alveolar area (around 70 m² in adults), walls only about 0.5 µm thick, and blood flow and breathing that keep the gradient steep.
H: Surface area to volume ratio
P: As an object gets bigger, its volume grows faster than its surface. A cell's needs depend on its volume, but its supply comes through its surface, so large organisms can't rely on diffusion across their outer surface and need specialised exchange surfaces and transport systems.
X: Find the surface area to volume ratio of a cube with 2 µm sides and one with 4 µm sides.
> 2 µm cube: area = 6 × 2² = 24 µm²; volume = 2³ = 8 µm³; ratio = 3 : 1.
> 4 µm cube: area = 6 × 4² = 96 µm²; volume = 4³ = 64 µm³; ratio = 1.5 : 1. Doubling the side halves the ratio.
K: Diffusion is net movement down a gradient by random motion; its rate rises with gradient and area and falls steeply with distance.
!: Saying particles "want" to spread out or "know" where to go. Their movement is random; the net direction is a statistical result.
T: Diffusion | The net movement of particles from a region of higher concentration to a region of lower concentration
T: Concentration gradient | A difference in concentration between two regions
T: Fick's law | Rate of diffusion is proportional to surface area times concentration difference, divided by thickness
SUM: Diffusion results from the random movement of particles and needs no cell energy.
SUM: Steeper gradients, larger areas, thinner barriers and higher temperatures speed it up.
SUM: Larger organisms have smaller surface area to volume ratios, so they need exchange surfaces.
SRC: OpenStax, Biology 2e, section 5.2 "Passive Transport" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/5-2-passive-transport
Q: State Fick's law. | Rate of diffusion is proportional to surface area × concentration difference ÷ thickness of the exchange surface.
Q: Why is diffusion faster at higher temperature? | Particles have more kinetic energy and move faster.
NUM2: A cube-shaped cell has sides of 10 µm. What is its surface area to volume ratio (as x : 1)? | 0.6 | 0.01 |  | Area = 6 × 10² = 600 µm²; volume = 10³ = 1000 µm³; 600 ÷ 1000 = 0.6 : 1.
M1: Which change would speed up diffusion of oxygen into the blood? | A thinner barrier between air and blood | A smaller surface area | A smaller concentration difference | A lower temperature | Rate is inversely proportional to the distance diffused; thinner barriers speed exchange.
M2: In emphysema, alveolar walls break down into fewer, larger air spaces. Why does this make people breathless? | The surface area for gas exchange falls, so less oxygen diffuses into the blood | The concentration gradient becomes too steep | The walls become thinner, slowing diffusion | Oxygen starts to need active transport | Fewer, larger spaces have much less total surface area, reducing the rate of diffusion.
M3: Why are single-celled organisms able to rely on diffusion while a mouse cannot? | A small organism has a large surface area to volume ratio and short diffusion distances | Single cells don't need oxygen | Diffusion is faster in water than air | Mice have no cell membranes | Diffusion is only fast over short distances; in a large animal most cells are far from the surface, so lungs and blood are needed.

## Osmosis
S: Osmosis is the diffusion of water across a partially permeable membrane. It decides whether cells swell, shrink or keep their shape, and it is described precisely using water potential.
O: Define osmosis in terms of water potential
O: Predict the effects of different solutions on animal and plant cells
O: Calculate water potential from solute and pressure potentials
PRE: Diffusion
H: Water potential
P: **Water potential** (ψ, psi) measures the tendency of water to move out of a solution. Pure water at atmospheric pressure has ψ = 0; adding solute lowers it, so solutions have negative water potentials. Water moves by osmosis from a **higher** (less negative) to a **lower** (more negative) water potential, across a partially permeable membrane.
E: ψ = ψs + ψp
P: Here ψs, the **solute potential**, is zero or negative, and ψp, the **pressure potential**, is usually positive in a turgid plant cell, where the wall pushes back on the contents.
H: Effects on cells
- In a solution of **higher** water potential (hypotonic), water enters. Animal cells swell and may burst (red blood cells undergo haemolysis); plant cells become **turgid**.
- In a solution of **equal** water potential (isotonic), there is no net movement.
- In a solution of **lower** water potential (hypertonic), water leaves. Animal cells shrink and crenate; in plant cells the membrane pulls away from the wall, called **plasmolysis**.
X: A plant cell has ψs = −700 kPa and ψp = +300 kPa. It is placed in a solution with ψ = −500 kPa. Which way does water move?
> Cell ψ = −700 + 300 = −400 kPa.
> −400 kPa is higher than −500 kPa, so water moves out of the cell into the solution.
K: Water moves by osmosis from higher to lower water potential; solutes lower ψ, and pressure from a cell wall raises it.
!: Saying water moves "to where there is more solute" without the membrane or the cause. Osmosis is net water movement down a water potential gradient across a partially permeable membrane.
T: Osmosis | The net movement of water from a region of higher water potential to one of lower water potential across a partially permeable membrane
T: Water potential | A measure of the tendency of water to move out of a solution; pure water has the highest value, zero
T: Plasmolysis | The pulling away of a plant cell's membrane from its wall as the cell loses water
SUM: Osmosis is water diffusing down a water potential gradient across a partially permeable membrane.
SUM: ψ = ψs + ψp; pure water has ψ = 0 and solutions are negative.
SUM: Animal cells burst or shrink; plant cells become turgid or plasmolysed.
SRC: OpenStax, Biology 2e, section 5.2 "Passive Transport" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/5-2-passive-transport
SRC: Preston G.M. et al., "Appearance of water channels in Xenopus oocytes expressing red cell CHIP28 protein", Science 256:385–387 | primary | 1992 | https://doi.org/10.1126/science.256.5055.385
Q: What is the water potential of pure water? | Zero (0 kPa).
Q: What happens to a red blood cell in distilled water, and why? | Water enters by osmosis because the cell has a lower water potential; with no wall, the cell swells and bursts (haemolysis).
NUM2: A plant cell has a solute potential of −850 kPa and a pressure potential of +350 kPa. What is its water potential, in kPa? | -500 | 1 | kPa | ψ = ψs + ψp = −850 + 350 = −500 kPa.
M1: Which solution has the highest water potential? | Pure water | 0.1 M sucrose | 0.5 M sucrose | 1.0 M sucrose | Solutes lower water potential, so pure water (ψ = 0) is highest.
M2: Potato cylinders are left in a range of sucrose solutions. In which solution would they gain mass? | One with a higher water potential than the potato cells | One with the same water potential | One with a lower water potential | Any solution, because potatoes always absorb water | Water enters the cells only if the solution's water potential is higher (less negative) than the cells'.
M3: Intravenous drips use saline of about 0.9% sodium chloride rather than pure water. Why? | It has about the same water potential as blood plasma, so red blood cells neither swell nor shrink | Pure water is too viscous | Salt is needed to stop bacteria growing | Red blood cells need salt to make ATP | An isotonic solution prevents osmotic damage; pure water would cause haemolysis.
TF2: A plant cell placed in a concentrated salt solution can become plasmolysed. | true | Water leaves by osmosis and the membrane pulls away from the wall.

## Facilitated diffusion
S: Facilitated diffusion is passive movement down a concentration gradient through specific membrane proteins. It lets ions and polar molecules cross membranes quickly without the cell spending energy.
O: Explain how channel and carrier proteins allow facilitated diffusion
O: Compare facilitated diffusion with simple diffusion
O: Explain why the rate of facilitated diffusion levels off
PRE: Membrane transport
H: Channel proteins
P: **Channel proteins** form water-filled pores through the membrane. Each is specific for certain ions or molecules: potassium channels let K⁺ through but exclude the smaller Na⁺, and aquaporins pass water. Many channels are **gated**, opening only in response to a voltage change or a binding molecule, which is how nerve impulses are produced.
H: Carrier proteins
P: **Carrier proteins** bind a specific molecule on one side of the membrane, change shape, and release it on the other side. Glucose transporters (GLUT proteins) carry glucose into most body cells this way. Carriers are slower than channels, because each cycle moves only one or a few molecules.
H: How it differs from simple diffusion
- Both are passive and go down the concentration gradient.
- Facilitated diffusion needs **specific proteins**, so only particular substances use it.
- Its rate **levels off** (saturates) at high concentrations once every carrier is busy, whereas simple diffusion keeps increasing in proportion to the gradient.
P: Because the number of transporters limits the rate, cells can control uptake by adding or removing transporters. Insulin, for example, makes muscle and fat cells insert more GLUT4 transporters into their plasma membranes, speeding glucose uptake after a meal.
K: Facilitated diffusion is passive movement down a gradient through specific channel or carrier proteins; it saturates when all the proteins are in use.
!: Thinking facilitated diffusion uses ATP because it involves proteins. The proteins only provide a path; the gradient supplies the energy.
T: Facilitated diffusion | Passive movement of substances down a concentration gradient through specific membrane proteins
T: Channel protein | A membrane protein forming a pore that lets specific ions or molecules pass
T: Carrier protein | A membrane protein that binds a specific molecule and changes shape to move it across
SUM: Channel proteins provide pores; carrier proteins bind and change shape.
SUM: Facilitated diffusion is passive and specific.
SUM: Its rate levels off when all transporters are occupied; cells regulate it by changing transporter numbers.
SRC: OpenStax, Biology 2e, section 5.2 "Passive Transport" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/5-2-passive-transport
Q: How do carrier proteins move molecules across a membrane? | They bind a specific molecule, change shape and release it on the other side.
Q: Why does the rate of facilitated diffusion level off at high concentration? | All the transport proteins are occupied, so adding more substance can't increase the rate.
M1: Which statement about facilitated diffusion is correct? | It moves substances down their concentration gradient through specific proteins | It moves substances against their gradient | It uses ATP directly | It only moves water | It is passive, like simple diffusion, but needs channel or carrier proteins.
M2: A graph of uptake rate against external glucose concentration rises and then levels off. What does this suggest? | Glucose enters by facilitated diffusion through a limited number of carriers | Glucose enters by simple diffusion | Glucose is not taken up | The cell is dead | Saturation is the signature of carrier-mediated transport.
M3: After a meal, insulin speeds glucose uptake into muscle cells even though the glucose gradient hardly changes. How? | It causes more GLUT4 carriers to be inserted into the membrane, increasing the maximum rate | It makes glucose pass through the lipid bilayer | It switches glucose uptake to active transport using ATP | It removes the need for a gradient | More carriers raise the rate of facilitated diffusion for the same gradient.
TF1: Channel proteins can be specific for particular ions. | true | For example, potassium channels pass K⁺ but not Na⁺.

## Active transport
S: Active transport moves substances against their concentration gradient using energy, usually from ATP. It lets cells take up scarce nutrients, keep ion gradients that power nerves and other transport, and excrete wastes.
O: Explain how active transport works using carrier proteins and ATP
O: Describe the sodium–potassium pump
O: Explain co-transport, using the absorption of glucose as an example
PRE: Facilitated diffusion
H: Pumps
P: In active transport, a carrier protein binds the substance, and energy from ATP hydrolysis changes the protein's shape so the substance is released on the other side, against its gradient. Proteins that do this are called pumps. Cells doing a lot of active transport, such as root hair cells and kidney tubule cells, have many mitochondria.
H: The sodium–potassium pump
P: The **Na⁺/K⁺-ATPase**, discovered by Jens Skou (1957), pumps **3 Na⁺ out** and **2 K⁺ in** for each ATP used. It keeps sodium low and potassium high inside cells, makes the inside slightly negative, and in neurons maintains the resting potential needed for nerve impulses. It uses a large share of the body's ATP at rest, by some estimates around a fifth.
H: Co-transport
P: Some transporters use the energy stored in one gradient to move another substance. In the small intestine, the **sodium–glucose co-transporter (SGLT1)** lets Na⁺ flow into the cell down its gradient and carries glucose in with it, against the glucose gradient. The Na⁺/K⁺ pump on the other side of the cell keeps the sodium gradient going. This is **secondary active transport**: ATP is used, but indirectly.
P: Oral rehydration solution, which has saved millions of lives in cholera and other diarrhoeal diseases, contains both glucose and salt because co-transport of glucose pulls sodium, and water with it, into the body.
K: Active transport uses energy to move substances against their gradient; the Na⁺/K⁺ pump maintains the gradients that co-transporters then use.
!: Saying active transport moves substances "from low to high concentration because it uses energy" without the mechanism. ATP changes the shape of a specific carrier protein; without the protein, energy alone moves nothing.
T: Active transport | Movement against a concentration gradient using energy, through carrier proteins called pumps
T: Sodium–potassium pump | A membrane protein that uses ATP to pump 3 Na⁺ out of and 2 K⁺ into a cell
T: Co-transport | Movement of one substance against its gradient coupled to movement of another down its gradient
SUM: Active transport uses ATP to change carrier shape and move substances against gradients.
SUM: The Na⁺/K⁺ pump moves 3 Na⁺ out and 2 K⁺ in per ATP.
SUM: Co-transporters use ion gradients made by pumps to move nutrients such as glucose.
SRC: OpenStax, Biology 2e, section 5.3 "Active Transport" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/5-3-active-transport
SRC: Skou J.C., "The influence of some cations on an adenosine triphosphatase from peripheral nerves", Biochimica et Biophysica Acta 23:394–401 | primary | 1957 | https://doi.org/10.1016/0006-3002(57)90343-8
Q: How many sodium and potassium ions does the sodium–potassium pump move per ATP? | 3 Na⁺ out and 2 K⁺ in.
Q: Why is glucose absorption in the intestine called secondary active transport? | The co-transporter uses the sodium gradient, which is made by the ATP-driven Na⁺/K⁺ pump, rather than ATP directly.
M1: What does the sodium–potassium pump use as its energy source? | ATP | The glucose gradient | Light | Osmosis | The Na⁺/K⁺-ATPase hydrolyses ATP to change shape and move ions against their gradients.
M2: Root hair cells absorb nitrate ions from soil where nitrate is less concentrated than inside the cells. Which feature would you expect these cells to have? | Many mitochondria to supply ATP for active transport | No cell membrane | Chloroplasts to make nitrate | Very few carrier proteins | Uptake against the gradient is active and needs ATP, so the cells are rich in mitochondria.
M3: Ouabain blocks the Na⁺/K⁺ pump. Why does it also stop glucose absorption by intestinal cells? | Without the pump, the sodium gradient that drives the glucose co-transporter runs down | Ouabain destroys glucose | Glucose uses the Na⁺/K⁺ pump directly | Ouabain blocks osmosis | Co-transport depends on the sodium gradient, which only the pump can maintain.
SEQ2: Put the steps of active transport by a carrier protein in order. | The substance binds to the carrier on one side ; ATP is hydrolysed ; The carrier changes shape ; The substance is released on the other side | Energy from ATP drives the shape change that moves the substance across against its gradient.

## Endocytosis and exocytosis
S: Some cargo is far too large for channels or carriers. Cells take in large particles and fluid by wrapping them in membrane (endocytosis) and release large molecules by fusing vesicles with the membrane (exocytosis).
O: Describe phagocytosis, pinocytosis and receptor-mediated endocytosis
O: Describe exocytosis and give examples
O: Explain why bulk transport needs energy
PRE: Active transport
H: Endocytosis
- **Phagocytosis** ("cell eating"): the membrane extends around a large particle such as a bacterium, enclosing it in a vacuole that then fuses with lysosomes. Neutrophils and macrophages do this.
- **Pinocytosis** ("cell drinking"): small droplets of extracellular fluid are taken in.
- **Receptor-mediated endocytosis**: specific molecules bind receptors gathered in pits coated with the protein **clathrin**; the pit pinches off as a vesicle. Cells take in cholesterol carried by LDL particles this way.
H: Exocytosis
P: In exocytosis, a vesicle moves to the plasma membrane and fuses with it, releasing its contents outside and adding its membrane to the cell surface. Examples include the secretion of digestive enzymes by the pancreas, release of neurotransmitter at synapses, and secretion of insulin. In regulated secretion, a signal (often a rise in Ca²⁺) triggers the fusion.
H: Energy and membrane balance
P: Both processes need ATP, to rearrange the cytoskeleton and move vesicles. They also balance each other: endocytosis removes membrane from the surface and exocytosis adds it back, so the cell's surface area stays roughly constant.
P: In familial hypercholesterolaemia, LDL receptors are faulty or missing, so cells can't take in cholesterol from the blood and blood cholesterol stays high, the discovery for which Brown and Goldstein shared a Nobel Prize in 1985.
K: Endocytosis and exocytosis move large particles and molecules in vesicles, using energy; receptor-mediated endocytosis is specific.
!: Saying the cargo crosses the membrane in endocytosis. It never passes through the lipid; it stays inside a vesicle made of membrane.
T: Endocytosis | Taking material into a cell by enclosing it in a vesicle formed from the plasma membrane
T: Exocytosis | Releasing material from a cell by fusing a vesicle with the plasma membrane
T: Phagocytosis | Endocytosis of large particles such as bacteria
SUM: Phagocytosis, pinocytosis and receptor-mediated endocytosis bring material in.
SUM: Exocytosis releases enzymes, hormones and neurotransmitters.
SUM: Both need ATP and together keep the cell surface area balanced.
SRC: OpenStax, Biology 2e, section 5.4 "Bulk Transport" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/5-4-bulk-transport
SRC: Brown M.S. and Goldstein J.L., "A receptor-mediated pathway for cholesterol homeostasis" (Nobel lecture), Science 232:34–47 | primary | 1986 | https://doi.org/10.1126/science.3513311
Q: What is the difference between phagocytosis and pinocytosis? | Phagocytosis takes in large solid particles; pinocytosis takes in droplets of fluid.
Q: Give two examples of exocytosis. | Secretion of digestive enzymes or insulin, and release of neurotransmitter at a synapse.
M1: Which process releases neurotransmitter at a synapse? | Exocytosis | Phagocytosis | Osmosis | Facilitated diffusion | Vesicles of neurotransmitter fuse with the presynaptic membrane and release their contents.
M2: A macrophage engulfs a bacterium. Which organelle will the resulting vesicle fuse with? | A lysosome | The nucleus | A chloroplast | The rough ER | Lysosomes deliver the hydrolytic enzymes that digest the engulfed bacterium.
M3: People with familial hypercholesterolaemia have high blood cholesterol even on a low-fat diet. Using what you know about transport, explain why. | Faulty LDL receptors stop receptor-mediated endocytosis of cholesterol, so it stays in the blood | Cholesterol can't diffuse through membranes | Their cells make no clathrin | Their lysosomes digest too much cholesterol | Cells normally remove LDL cholesterol from the blood by receptor-mediated endocytosis; without the receptors, it accumulates.
TF2: Exocytosis adds membrane to the cell surface. | true | The vesicle membrane fuses with and becomes part of the plasma membrane.

## Cell specialisation
S: In a multicellular organism, cells take on different shapes and contents to do particular jobs. This lesson looks at how the structure of specialised cells fits their function, in animals and plants.
O: Explain what is meant by a specialised cell
O: Relate the structure of named animal and plant cells to their functions
O: Explain the advantages and costs of specialisation
PRE: Animal cells
H: Specialised animal cells
- **Red blood cells**: biconcave discs about 7–8 µm across, with no nucleus in mammals, packed with haemoglobin; the shape gives a large surface area and lets them bend through capillaries.
- **Neurons**: long axons (up to about a metre) carry impulses; many are insulated by myelin; dendrites receive signals from other cells.
- **Sperm cells**: a flagellum for swimming, many mitochondria to power it, and an acrosome of enzymes for penetrating the egg.
- **Small intestine epithelial cells**: microvilli multiply the absorbing surface; many mitochondria supply ATP for active transport.
H: Specialised plant cells
- **Root hair cells**: a long projection increases the surface area for absorbing water and mineral ions.
- **Palisade mesophyll cells**: tall, packed with chloroplasts near the upper leaf surface.
- **Guard cells**: pairs that change shape to open and close stomata.
- **Xylem vessels**: dead, hollow, end-to-end tubes strengthened by lignin, carrying water; **phloem sieve tubes** carry sugars, kept alive by companion cells.
P: Specialisation shows in a cell's contents as well as its shape. Cells that secrete proteins are rich in rough ER and Golgi; cells that do a lot of active transport or movement are packed with mitochondria; cells that store fat are almost filled by a single lipid droplet. Looking at the organelles of an unknown cell is often enough to guess its job.
H: The trade-off
P: Specialisation lets each cell do one job very well, and the organism as a whole do far more than a single cell could. The cost is dependence: a specialised cell can't survive alone, and many, like red blood cells and neurons, can no longer divide. Damaged tissue then depends on stem cells, or can't be replaced at all.
K: Specialised cells have structures adapted to particular functions, which makes the organism efficient but makes each cell dependent on the others.
!: Saying specialised cells have different genes. Almost all body cells carry the same genome; they differ in which genes they use.
T: Specialised cell | A cell whose structure is adapted to carry out a particular function
T: Microvilli | Tiny finger-like folds of the plasma membrane that increase surface area
T: Acrosome | A cap of enzymes on a sperm cell's head that digests a path into the egg
SUM: Specialised cells have shapes and organelles that suit their jobs.
SUM: Examples include red blood cells, neurons, sperm, root hair cells and palisade cells.
SUM: Specialisation brings efficiency but dependence, and many specialised cells can't divide.
SRC: OpenStax, Biology 2e, section 33.2 "Animal Primary Tissues" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/33-2-animal-primary-tissues
Q: How is a red blood cell adapted for carrying oxygen? | Biconcave shape for a large surface area and flexibility; no nucleus, leaving more room for haemoglobin.
Q: Why do root hair cells have long projections? | To increase the surface area for absorbing water and mineral ions.
M1: Which feature of a sperm cell helps it penetrate the egg? | The acrosome | The flagellum | The mitochondria | The cell wall | The acrosome releases enzymes that digest the egg's outer layers; the flagellum and mitochondria are for swimming.
M2: Cells lining the small intestine have microvilli and many mitochondria. What do these suggest about their function? | They absorb nutrients, partly by active transport | They make hormones | They carry oxygen | They contract to move food | Microvilli give a large absorbing surface and mitochondria supply ATP for active uptake.
M3: Why can severe damage to the brain's neurons leave lasting effects, while a cut in the skin heals completely? | Most mature neurons can't divide and the brain has few stem cells to replace them, while skin has active stem cells | Neurons have no nucleus | Skin cells are not specialised | Neurons are replaced by red blood cells | Highly specialised neurons have largely left the cell cycle; skin is continually renewed from stem cells in its basal layer.
MATCH2: Match each cell to its key adaptation. | Red blood cell = no nucleus, more room for haemoglobin ; Neuron = long axon ; Root hair cell = large surface area ; Guard cell = changes shape to open stomata | Each structural feature serves the cell's particular job.

## Stem cells
S: Stem cells are unspecialised cells that can divide to renew themselves and can also give rise to specialised cells. They build the body in development, repair it in adult life, and hold great promise, and some controversy, in medicine.
O: Define a stem cell and describe its two key properties
O: Distinguish totipotent, pluripotent, multipotent and unipotent stem cells
O: Describe medical uses of stem cells and the issues they raise
PRE: Cell specialisation
H: Two properties
P: A **stem cell** can **self-renew** (divide to make more stem cells) and **differentiate** into specialised cell types. Often one division produces one of each, keeping the stem cell population steady while supplying new specialised cells.
H: How much potential
- **Totipotent**: can form every cell type, including the placenta. The zygote and the cells of the first few divisions are totipotent.
- **Pluripotent**: can form all the body's cell types, but not the placenta: the inner cell mass of the blastocyst, the source of **embryonic stem cells**.
- **Multipotent**: can form several related types: **haematopoietic stem cells** in bone marrow make all the blood cells.
- **Unipotent**: can form one type, such as the cells in skin that make keratinocytes.
H: Medicine and ethics
P: **Bone marrow (haematopoietic stem cell) transplants** have been used for decades to treat leukaemia and some inherited blood diseases. Embryonic stem cells could in principle replace any tissue, but obtaining them destroys an early embryo, which many people object to. In 2006 Takahashi and Yamanaka showed that adult mouse cells could be reprogrammed into **induced pluripotent stem cells (iPSCs)** by switching on four genes, avoiding embryos and allowing cells matched to the patient.
P: Risks remain: pluripotent cells can form tumours if any stay undifferentiated, and many treatments sold commercially as "stem cell therapy" are unproven. In the UK, uses of human embryos are regulated by the Human Fertilisation and Embryology Authority.
K: Stem cells self-renew and differentiate; their potential ranges from totipotent to unipotent, and iPSCs offer pluripotency without embryos.
!: Thinking all stem cells can become any cell. Most adult stem cells are multipotent or unipotent, limited to their own tissue.
T: Stem cell | An unspecialised cell that can self-renew and differentiate into specialised cells
T: Pluripotent | Able to give rise to all the cell types of the body, but not the placenta
T: Induced pluripotent stem cell | An adult cell reprogrammed to a pluripotent state by switching on particular genes
SUM: Stem cells self-renew and differentiate.
SUM: Potency ranges from totipotent (zygote) to pluripotent, multipotent and unipotent.
SUM: Bone marrow transplants are established; embryonic and iPSC therapies are developing, with ethical and safety questions.
SRC: OpenStax, Biology 2e, section 33.2 "Animal Primary Tissues" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/33-2-animal-primary-tissues
SRC: Takahashi K. and Yamanaka S., "Induction of pluripotent stem cells from mouse embryonic and adult fibroblast cultures by defined factors", Cell 126:663–676 | primary | 2006 | https://doi.org/10.1016/j.cell.2006.07.024
SRC: NHS, "Stem cell and bone marrow transplants" | guidance | 2023 | https://www.nhs.uk/conditions/stem-cell-transplant/
Q: What are the two defining properties of stem cells? | Self-renewal (dividing to make more stem cells) and differentiation into specialised cells.
Q: What is the difference between totipotent and pluripotent? | Totipotent cells can form every cell type including the placenta; pluripotent cells can form every body cell type but not the placenta.
M1: Which cells are pluripotent? | Cells of the inner cell mass of a blastocyst | Haematopoietic stem cells | Mature neurons | Red blood cells | The inner cell mass gives rise to every tissue of the body, so it is pluripotent; blood stem cells are multipotent.
M2: Why does a bone marrow transplant restore all types of blood cell? | It provides multipotent haematopoietic stem cells, which make every kind of blood cell | It contains mature red blood cells only | It contains totipotent cells | It replaces the patient's DNA everywhere | Blood stem cells settle in the marrow and produce red cells, white cells and platelets.
M3: What is the main advantage of iPSCs over embryonic stem cells for treating a patient? | They can be made from the patient's own cells, avoiding rejection and the destruction of embryos | They can't form tumours | They are unipotent and so safer | They are easier to obtain from bone marrow | Reprogramming the patient's own cells gives genetically matched pluripotent cells without using embryos, though tumour risk remains.
TF2: Most adult stem cells are pluripotent. | false | Most adult stem cells are multipotent or unipotent, making only the cell types of their own tissue.

## Cell differentiation
S: Differentiation is the process by which a cell becomes specialised. Because nearly all cells contain the same genes, differentiation depends on switching particular genes on and off, under the control of signals and transcription factors.
O: Explain differentiation in terms of differential gene expression
O: Describe how transcription factors and signals control differentiation
O: Describe the evidence that differentiated cells keep their full genome
PRE: Stem cells
H: Same genes, different use
P: A liver cell and a neuron contain the same DNA. What differs is **gene expression**: which genes are transcribed and translated. A liver cell expresses genes for the enzymes of metabolism and detoxification; a neuron expresses genes for ion channels and neurotransmitters. Most genes for other cell types stay silent.
H: How genes are switched
P: **Transcription factors** are proteins that bind DNA near genes and turn their transcription up or down. A few master regulators can set off a whole programme: the transcription factor MyoD can turn some other cell types into muscle-like cells. Signals from neighbouring cells, such as growth factors, decide which transcription factors are active. Chemical marks on DNA and histones (**epigenetic** changes) then lock the pattern in, so it is passed on when the cell divides.
H: The genome stays complete
P: In 1962 John Gurdon transferred nuclei from tadpole intestinal cells into frog eggs whose own nuclei had been destroyed; some developed into whole tadpoles. Cloning of Dolly the sheep from an adult udder cell (1996) showed the same in mammals. Differentiated cells keep all their genes; they are just not using most of them. Exceptions exist: mammalian red blood cells lose their nucleus, and B and T lymphocytes rearrange parts of their antibody and receptor genes.
P: Differentiation is usually stable, but it can be reversed in the laboratory, as with iPSCs, and it fails in some cancers, where cells lose their specialised features and divide uncontrollably.
K: Differentiation is caused by differential gene expression, controlled by transcription factors and signals and maintained by epigenetic marks; the genome itself usually stays intact.
!: Saying cells lose the genes they don't need when they specialise. They keep them; the genes are switched off.
T: Differentiation | The process by which an unspecialised cell becomes specialised
T: Gene expression | The use of a gene's information to make RNA and protein
T: Transcription factor | A protein that binds DNA and controls whether a gene is transcribed
SUM: Specialised cells differ in which genes they express, not which genes they have.
SUM: Transcription factors and signals control differentiation; epigenetic marks maintain it.
SUM: Nuclear transfer experiments show differentiated nuclei keep a complete genome.
SRC: OpenStax, Biology 2e, section 16.1 "Regulation of Gene Expression" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/16-1-regulation-of-gene-expression
SRC: Gurdon J.B., "The developmental capacity of nuclei taken from intestinal epithelium cells of feeding tadpoles", Journal of Embryology and Experimental Morphology 10:622–640 | primary | 1962
Q: Why do a skin cell and a liver cell look and work differently if they have the same DNA? | They express different genes, so they make different proteins.
Q: What do transcription factors do? | They bind DNA and switch the transcription of particular genes on or off.
M1: What causes cells to differentiate? | Differences in which genes are expressed | Loss of the genes they don't need | Different numbers of chromosomes | Mutations in every cell | Differentiated cells usually keep the whole genome but express only some genes.
M2: A nucleus from a frog's intestinal cell, placed in an egg with no nucleus, produces a tadpole. What does this show? | The specialised nucleus still contains all the genes needed to make a whole organism | Intestinal cells are totipotent in the body | The egg cytoplasm contains the genes | Specialisation has destroyed most genes | Gurdon's experiment showed differentiation doesn't remove genes; the egg cytoplasm reprogrammed their expression.
M3: Mature B lymphocytes are an exception to the rule that differentiated cells keep the same genome as other body cells. Why? | They cut and rejoin segments of their antibody genes, so their DNA differs from other cells | They lose their nucleus | They have no DNA at all | They copy genes from bacteria | B cells rearrange gene segments to make a unique antibody, a permanent change to their DNA.
TF1: Most differentiated cells contain a complete copy of the organism's genome. | true | Nuclear transfer cloning shows that differentiated nuclei keep all their genes; exceptions include mammalian red blood cells and rearranged genes in lymphocytes.

## Cell signalling
S: Cells constantly send and receive chemical signals that coordinate growth, metabolism and defence. A signal is detected by a receptor and converted into a response inside the cell, often amplified many times on the way.
O: Describe the main types of cell signalling by the distance signals travel
O: Distinguish cell-surface and intracellular receptors
O: Explain how a second messenger amplifies a signal
PRE: Membrane structure
H: Signals by distance
- **Autocrine**: a cell signals to itself.
- **Paracrine**: signals act on nearby cells, such as growth factors and neurotransmitters.
- **Endocrine**: hormones travel in the blood to distant target cells.
- **Direct contact**: molecules on one cell bind receptors on another, or small molecules pass through gap junctions.
H: Receptors
P: A cell responds only to signals it has receptors for. **Water-soluble** signals such as adrenaline, insulin and most growth factors can't cross the membrane and bind **cell-surface receptors**: G-protein-coupled receptors, receptor tyrosine kinases, or ion channels that open when the signal binds. **Lipid-soluble** signals such as steroid hormones diffuse through the membrane and bind **intracellular receptors**, which then act as transcription factors.
H: Transduction and amplification
P: At a cell-surface receptor, the signal is the **first messenger**; it doesn't enter the cell. Binding activates proteins that make a **second messenger** inside, such as **cyclic AMP**. Adrenaline binding to liver cells activates adenylyl cyclase, which makes cAMP, which activates protein kinase A, which sets off a chain of enzymes that breaks down glycogen into glucose. Each step activates many molecules of the next, so a few hormone molecules release vast numbers of glucose molecules.
P: Because a response depends on the receptor and the cell's machinery, the same signal can do different things in different cells: adrenaline speeds the heart, relaxes airway muscle and releases glucose from the liver.
K: Signals act through specific receptors; cell-surface receptors pass the message on through second messengers such as cAMP, amplifying it in a cascade.
!: Thinking hormones enter every cell they reach. Only target cells with the right receptor respond, and water-soluble hormones never enter the cell at all.
T: Receptor | A protein that binds a specific signal molecule and triggers a response
T: Second messenger | A small molecule inside the cell, such as cAMP, that relays a signal from a cell-surface receptor
T: Signal transduction | The conversion of an external signal into a response inside the cell
SUM: Signals can be autocrine, paracrine, endocrine or by direct contact.
SUM: Water-soluble signals use surface receptors; lipid-soluble ones use receptors inside the cell.
SUM: Second-messenger cascades amplify signals.
SRC: OpenStax, Biology 2e, section 9.1 "Signaling Molecules and Cellular Receptors" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/9-1-signaling-molecules-and-cellular-receptors
SRC: Sutherland E.W., "Studies on the mechanism of hormone action" (Nobel lecture), Science 177:401–408 | primary | 1972 | https://doi.org/10.1126/science.177.4047.401
Q: What is a second messenger? | A small molecule made inside a cell, such as cyclic AMP, that relays the signal from a cell-surface receptor to the cell's machinery.
Q: Why do steroid hormones have intracellular receptors? | They are lipid-soluble and can diffuse through the plasma membrane.
M1: Which type of signalling uses hormones carried in the blood? | Endocrine | Paracrine | Autocrine | Direct contact | Endocrine signals travel through the bloodstream to distant targets.
M2: Adrenaline makes liver cells release glucose but has no effect on many other cells. Why? | Only cells with adrenaline receptors respond | Adrenaline can only reach the liver | Other cells have no glycogen | Adrenaline enters only liver cells | Responsiveness depends on having the specific receptor, and on what the cell's machinery does with the signal.
M3: One molecule of adrenaline can lead to the release of millions of glucose molecules. What explains this? | Each step of the second-messenger cascade activates many molecules of the next | Adrenaline is broken down into glucose | Glucose is pumped in by adrenaline | Adrenaline copies itself inside the cell | Amplification at each enzyme step multiplies the signal enormously.
SEQ2: Put the steps of adrenaline signalling in a liver cell in order. | Adrenaline binds a receptor on the surface ; Adenylyl cyclase is activated ; cAMP is made ; Protein kinase A is activated ; Glycogen is broken down to glucose | The first messenger stays outside; the cascade inside amplifies and delivers the response.

## Cell junctions
S: In tissues, cells are physically joined to their neighbours. Different junctions seal gaps, hold cells together against pulling forces, or let small molecules pass directly from cell to cell.
O: Describe tight junctions, anchoring junctions and gap junctions
O: Relate each type of junction to the tissues where it is common
O: Describe plasmodesmata in plants
PRE: Membrane structure
H: Three kinds of junction in animals
- **Tight junctions**: rows of proteins (claudins and occludin) stitch neighbouring membranes together, sealing the gap so substances can't leak between cells. They are vital in the gut lining and the blood–brain barrier, so that material has to pass through the cells and their transporters.
- **Anchoring junctions**: **adherens junctions** and **desmosomes** link cells through cadherin proteins attached to the cytoskeleton inside each cell, spreading mechanical stress across a tissue. **Hemidesmosomes** anchor cells to the basement membrane with integrins. They are abundant in skin and heart muscle.
- **Gap junctions**: channels made of **connexin** proteins join the cytoplasm of neighbouring cells, letting ions and small molecules (up to about 1 kDa) pass. In heart muscle they let the wave of electrical excitation spread so the cells contract together.
H: Plant connections
P: Plant cells are held together by the middle lamella between their walls, and connected by **plasmodesmata**, channels through the walls lined with plasma membrane. Like gap junctions, they let small molecules and signals pass, but they can also carry some proteins and RNA.
H: When junctions fail
P: Blistering diseases such as pemphigus occur when the immune system attacks desmosome proteins, so skin layers separate. Some bacteria and toxins open tight junctions in the gut, causing fluid loss in diarrhoea.
P: Cancer cells often lose cadherins, which loosens their junctions and helps them break away from the tissue and spread.
K: Tight junctions seal, anchoring junctions resist pulling forces, and gap junctions connect cytoplasm; plasmodesmata connect plant cells.
!: Confusing gap junctions with gaps between cells. Gap junctions are channels that connect cells; it is tight junctions that close the gaps between them.
T: Tight junction | A junction that seals neighbouring cells together, preventing leakage between them
T: Desmosome | An anchoring junction that links the intermediate filaments of neighbouring cells through cadherins
T: Gap junction | A channel of connexin proteins that links the cytoplasm of neighbouring cells
SUM: Tight junctions seal epithelia such as the gut lining.
SUM: Desmosomes and adherens junctions hold cells together against stress.
SUM: Gap junctions and plasmodesmata let small molecules pass between cells.
SRC: OpenStax, Biology 2e, section 4.6 "Connections between Cells and Cellular Activities" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/4-6-connections-between-cells-and-cellular-activities
Q: Which junction lets heart muscle cells contract together? | Gap junctions, which let ions and electrical excitation pass directly between cells.
Q: What do tight junctions do in the lining of the small intestine? | They seal the spaces between cells so that substances must pass through the cells, under control of their transporters.
M1: Which junction links the cytoplasm of neighbouring animal cells? | Gap junction | Tight junction | Desmosome | Hemidesmosome | Gap junction channels of connexin let small molecules pass directly from cell to cell.
M2: In pemphigus, antibodies attack desmosome proteins in the skin. What would you expect? | Blisters, as layers of skin cells separate | Faster heart rate | Leaky blood–brain barrier only | Increased absorption in the gut | Desmosomes hold skin cells together against friction; losing them lets the layers come apart.
M3: Why does the blood–brain barrier depend especially on tight junctions? | They stop substances passing between the cells of capillary walls, so entry is controlled by the cells' transporters | They let all molecules into the brain | They anchor neurons to bone | They pump glucose out of the brain | Without the seal, substances would leak around the cells; tight junctions force traffic through regulated routes.
MATCH2: Match each junction to its function. | Tight junction = seals the gap between cells ; Desmosome = resists pulling forces ; Gap junction = lets ions pass between cells ; Plasmodesma = connects plant cells through their walls | Each junction combines specific proteins for a different job.

## Cellular organisation
S: Multicellular organisms are organised in levels: specialised cells form tissues, tissues form organs, and organs work together in organ systems. This lesson connects cell biology to the body as a whole.
O: Define tissue, organ and organ system with examples
O: Name the four main types of animal tissue and the main plant tissues
O: Explain why multicellular organisms need organisation
PRE: Cell specialisation
H: Cells to systems
- A **tissue** is a group of similar cells working together, with the material between them: for example, cardiac muscle.
- An **organ** is a structure made of several tissues working together: the heart contains muscle, connective tissue, nervous tissue and epithelium.
- An **organ system** is a group of organs working together: the heart and blood vessels form the circulatory system.
IX: organ-systems
H: Types of tissue
P: Animals have four basic tissue types: **epithelial** (covering surfaces and lining tubes), **connective** (supporting and binding, including bone, cartilage, blood and fat), **muscle** (skeletal, cardiac and smooth), and **nervous**. Plants have **dermal** tissue (epidermis), **vascular** tissue (xylem and phloem) and **ground** tissue (such as mesophyll), produced by dividing regions called meristems.
H: Why organisation is needed
P: A large organism's cells are far from the outside, and its small surface area to volume ratio means diffusion across the body surface is far too slow. Specialised organ systems solve this: lungs and gut provide large exchange surfaces, the circulation carries materials to every cell, and nervous and endocrine systems coordinate everything. Each cell still depends on its own membrane transport and metabolism, so organisation builds on, and depends on, the cell biology of this school.
P: Organisation also brings emergent properties: a heart pumps, though no single muscle cell does; a brain thinks, though no neuron does.
K: Cells form tissues, tissues form organs, and organs form systems; this organisation overcomes the limits of size and lets specialised cells cooperate.
!: Calling blood "not a tissue" because it is liquid. Blood is a connective tissue: cells in a fluid matrix, plasma.
T: Tissue | A group of similar cells, with the material between them, that work together to carry out a function
T: Organ | A structure made of several tissues working together to perform a function
T: Organ system | A group of organs working together to carry out a major function
SUM: Organisation runs from cells to tissues, organs and organ systems.
SUM: Animals have epithelial, connective, muscle and nervous tissue; plants have dermal, vascular and ground tissue.
SUM: Organ systems overcome the limits of diffusion in large organisms.
SRC: OpenStax, Biology 2e, section 33.1 "Animal Form and Function" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/33-1-animal-form-and-function
SRC: OpenStax, Biology 2e, section 30.1 "The Plant Body" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/30-1-the-plant-body
Q: Name the four main types of animal tissue. | Epithelial, connective, muscle and nervous tissue.
Q: Why does the stomach count as an organ? | It is made of several tissues (epithelium, muscle, connective and nervous tissue) working together to digest food.
SEQ1: Put these in order from smallest to largest level of organisation. | Cell ; Tissue ; Organ ; Organ system ; Organism | Each level is built from those below it.
M1: Which is a tissue? | Cardiac muscle | The heart | The circulatory system | A red blood cell | Cardiac muscle is a group of similar cells; the heart is an organ and the circulatory system an organ system.
M2: Xylem, phloem and mesophyll are found together in a leaf. What is the leaf? | An organ, made of several tissues | A single tissue | An organ system | A single specialised cell | A leaf combines dermal, vascular and ground tissues working together, which makes it an organ.
M3: Why can't a large animal rely on diffusion across its skin for its oxygen supply, as a flatworm can? | Its surface area to volume ratio is small and most cells are far from the surface, so it needs lungs and a circulation | Its skin has no cell membranes | Oxygen can't diffuse through tissues | Large animals need no oxygen | Diffusion is only fast over short distances; organ systems provide exchange surfaces and transport to every cell.
`;
