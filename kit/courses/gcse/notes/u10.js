// YouthGradify GCSE Core, School 10: Cells and Bioenergetics. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md)
// on 2026-11-19 against the AQA GCSE Combined Science: Trilogy (8464) specification, version 1.1 (4 October 2019),
// sections 4.1 Cell biology, 4.2.1 and 4.2.2.1 (enzymes and digestion), 4.2.3 Plant tissues, organs and systems and
// 4.4 Bioenergetics; module "Health and disease" (4.2.2.4-4.2.2.7) added on 2026-11-20. Trilogy content only ("Biology only" content is left out); Higher tier content is labelled in the
// lesson. Builds on School 4 (The Human Body) and School 7 (Foundations of Ecology) without repeating them. Drafted with
// AI assistance and awaiting review by a teacher (qa.js records the review stages).
export default `
## Eukaryotic and prokaryotic cells
LV: GCSE · Foundation
S: Every living thing is made of cells, and there are two basic kinds. This lesson compares eukaryotic cells (plants, animals, fungi and protists) with prokaryotic cells (bacteria), and shows how to work with the tiny sizes of cells using prefixes and standard form.
O: Describe the features shared by eukaryotic cells and the features of a prokaryotic (bacterial) cell
O: Compare the size of cells using the prefixes centi, milli, micro and nano and standard form
O: Make order of magnitude comparisons between cells and sub-cellular structures
PRE: Cells, tissues and organs
H: Two kinds of cell
P: **Eukaryotic cells**, the cells of plants and animals, have a **cell membrane**, **cytoplasm** and **genetic material enclosed in a nucleus**.
P: **Prokaryotic cells** are bacterial cells. They are much smaller. They have cytoplasm and a cell membrane surrounded by a **cell wall**, but their genetic material is **not enclosed in a nucleus**: it is a **single DNA loop**, and there may be one or more small rings of DNA called **plasmids**. Plasmids often carry genes such as those for antibiotic resistance.
K: Eukaryotic cells keep their DNA in a nucleus; prokaryotic (bacterial) cells have a single loop of DNA free in the cytoplasm, often with plasmids, and are much smaller.
H: The scale of cells
- 1 millimetre (mm) = 10^{−3} m; 1 micrometre (µm) = 10^{−6} m; 1 nanometre (nm) = 10^{−9} m.
- 1 mm = 1000 µm, and 1 µm = 1000 nm.
- A typical animal cell is about 10–30 µm across; a plant cell is often 10–100 µm; a bacterium is about 1–5 µm long.
X: A cheek cell is 50 µm across and a bacterium is 2 µm long. How many times larger is the cheek cell, and what is that as an order of magnitude?
> 50 µm ÷ 2 µm = 25 times larger.
> 25 is between 10^{1} and 10^{2}, nearer 10^{1}: the cheek cell is about one order of magnitude (about ten times) larger.
> In standard form, 50 µm = 5 × 10^{−5} m and 2 µm = 2 × 10^{−6} m.
!: Forgetting to convert to the same unit before dividing. Always put both sizes in µm (or both in m) first.
EV: established | All living organisms are made of cells, and cells are divided into prokaryotic and eukaryotic types according to whether the genetic material is enclosed in a nucleus.
T: Eukaryotic cell | A cell whose genetic material is enclosed in a nucleus, such as a plant or animal cell
T: Prokaryotic cell | A cell with no nucleus, whose DNA is a single loop in the cytoplasm, such as a bacterium
T: Plasmid | A small ring of DNA found in many bacterial cells, separate from the main DNA loop
SUM: Plant and animal cells are eukaryotic, with a nucleus; bacteria are prokaryotic, with a DNA loop, plasmids and a cell wall.
SUM: Bacteria are about 1–5 µm long, roughly ten times smaller than most animal cells; use µm, nm and standard form to compare.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.1.1.1 Eukaryotes and prokaryotes | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 4.2 "Prokaryotic cells" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/4-2-prokaryotic-cells
Q: Where is the genetic material in a bacterial cell? | In a single DNA loop free in the cytoplasm, often with small rings called plasmids; there is no nucleus.
Q: How many micrometres are in one millimetre? | 1000 µm.
M1#gcse-u10-01-q1@1: Which feature is found in a bacterial cell but not in an animal cell? | A cell wall and plasmids | A nucleus containing DNA | A cell membrane around the cytoplasm | Cytoplasm where reactions happen | Bacteria have a cell wall and often plasmids; animal cells have no cell wall, and all cells have a membrane and cytoplasm.
M2#gcse-u10-01-q2@2: A bacterium is 0.002 mm long. What is this in micrometres? | 2 µm | 0.2 µm | 20 µm | 2000 µm | Multiply millimetres by 1000 to get micrometres: 0.002 × 1000 = 2 µm.
NUM2#gcse-u10-01-q3@2,3: A plant cell is 80 µm long and a bacterium is 2 µm long. How many times longer is the plant cell? | 40 | 0.1 | times | 80 ÷ 2 = 40: the plant cell is 40 times longer, between one and two orders of magnitude.
M3#gcse-u10-01-q4@1,3: A cell has a cell wall, a cell membrane, cytoplasm and no nucleus, and is 3 µm long. What is it most likely to be? | A bacterial cell | A plant leaf cell | A yeast cell | A human red blood cell | No nucleus plus a cell wall and a size of a few micrometres means a prokaryote; yeast and plant cells have nuclei, and red blood cells have no cell wall.
SA2#gcse-u10-01-q5@1,2: Compare a bacterial cell with a plant cell. Refer to their structures and sizes. | Both have a cell membrane, cytoplasm and a cell wall (cellulose in plants). A plant cell is eukaryotic: its DNA is enclosed in a nucleus, and it has organelles such as chloroplasts and mitochondria. A bacterial cell is prokaryotic: its DNA is a single loop in the cytoplasm, it may have plasmids, and it has no nucleus. A bacterium is about 1–5 µm long, so it is much smaller than a plant cell (about 10–100 µm). | Shared features: membrane, cytoplasm, wall ; Plant DNA in a nucleus ; Bacterial DNA as a single loop ; Plasmids in bacteria ; Size comparison with units

## Animal and plant cells
LV: GCSE · Foundation
S: Animal and plant cells share several sub-cellular structures, and plant cells have three more. This lesson explains how each structure is related to its function and how to recognise the parts in drawings and micrographs.
O: Name the sub-cellular structures of animal and plant cells and state their functions
O: Explain how the structures found only in plant cells relate to the way plants live
O: Identify the structures in a diagram or micrograph of a cell
PRE: Eukaryotic and prokaryotic cells
H: Parts of an animal cell
- **Nucleus**: contains genetic material that controls the activities of the cell.
- **Cytoplasm**: a jelly-like liquid where most chemical reactions happen, controlled by enzymes.
- **Cell membrane**: controls the movement of substances into and out of the cell.
- **Mitochondria**: where aerobic respiration takes place, transferring energy for the cell.
- **Ribosomes**: where protein synthesis happens.
H: Extra parts in plant cells
- **Chloroplasts**: contain chlorophyll, which absorbs light for photosynthesis.
- **Permanent vacuole** filled with **cell sap**: keeps the cell firm.
- **Cell wall** made of **cellulose**: strengthens and supports the cell. Algal cells also have a cellulose cell wall.
P: Not every plant cell has chloroplasts: root cells are underground in the dark, so they have none. That is why AQA says plant cells "often" have chloroplasts.
X: A micrograph shows a cell with a large central space, a thick outer boundary and green oval structures. Identify the cell type and three structures.
> The large central space is a **permanent vacuole**.
> The thick outer boundary is a **cellulose cell wall** (the membrane is pressed against it).
> The green ovals are **chloroplasts**, so this is a plant cell from a leaf or stem.
K: Animal and plant cells both have a nucleus, cytoplasm, cell membrane, mitochondria and ribosomes; plant cells may also have chloroplasts, a permanent vacuole and a cellulose cell wall.
!: Saying the cell wall controls what enters the cell. That is the job of the cell membrane; the cell wall is fully permeable and gives strength.
EV: established | The functions of the main sub-cellular structures, such as respiration in mitochondria and photosynthesis in chloroplasts, are well established.
T: Mitochondria | Sub-cellular structures where aerobic respiration takes place
T: Chloroplast | A structure containing chlorophyll that absorbs light for photosynthesis
T: Ribosome | The site of protein synthesis in a cell
SUM: Five parts are shared: nucleus, cytoplasm, membrane, mitochondria and ribosomes.
SUM: Plant cells may also have chloroplasts, a permanent vacuole with cell sap and a cellulose cell wall.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.1.1.2 Animal and plant cells | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 4.3 "Eukaryotic cells" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells
Q: What is the function of ribosomes? | Protein synthesis.
Q: What is the plant cell wall made of? | Cellulose.
M1#gcse-u10-02-q1@1: Where does aerobic respiration take place in a cell? | Mitochondria | Ribosomes | Chloroplasts | The nucleus | Mitochondria are the site of aerobic respiration; ribosomes make proteins and chloroplasts carry out photosynthesis.
MATCH1#gcse-u10-02-q2@1,2: Match each structure to its function. | Nucleus = Contains genetic material that controls the cell ; Cell membrane = Controls what enters and leaves ; Chloroplast = Absorbs light for photosynthesis ; Cell wall = Strengthens the cell | Each structure's function is linked to what it is made of and where it is.
M2#gcse-u10-02-q3@2: Why do cells from the root of a carrot have no chloroplasts? | Roots grow in the dark, so they cannot photosynthesise | Roots are animal tissue, not plant tissue | Roots get all their glucose from the soil | Chloroplasts would block water entering the root | Chloroplasts are only useful where there is light; root cells receive sugars made in the leaves instead.
M3#gcse-u10-02-q4@2,3: A cell has a nucleus, mitochondria and a cell membrane but no cell wall, chloroplasts or permanent vacuole. Which conclusion is best? | It is probably an animal cell | It must be a cell from a plant root | It must be a bacterial cell | It is probably an algal cell | Without a cell wall it cannot be a plant, algal or bacterial cell; its nucleus rules out a bacterium, so it is most likely an animal cell.
SA2#gcse-u10-02-q5@1,2: A leaf cell and a muscle cell both contain many mitochondria. Explain why, and describe two structures the leaf cell has that the muscle cell does not, with their functions. | Both cells need a lot of energy, transferred by aerobic respiration, which happens in mitochondria (the muscle cell for contraction, the leaf cell for making new molecules and active transport). The leaf cell has chloroplasts, which absorb light for photosynthesis; a cellulose cell wall, which strengthens the cell; and a permanent vacuole with cell sap, which keeps the cell firm. | Mitochondria for aerobic respiration ; Energy needed by both cells ; Chloroplasts and function ; Cell wall or vacuole and function

## Specialised cells and differentiation
LV: GCSE · Application
S: Cells become specialised, with structures suited to a particular job. This lesson explains how sperm, nerve and muscle cells in animals and root hair, xylem and phloem cells in plants are adapted, and why differentiation matters.
O: Explain how the structure of sperm, nerve and muscle cells relates to their functions
O: Explain how the structure of root hair, xylem and phloem cells relates to their functions
O: Explain the importance of cell differentiation and compare when animal and plant cells differentiate
PRE: Animal and plant cells
H: Specialised animal cells
- **Sperm cell**: a tail to swim; many mitochondria to transfer energy for swimming; enzymes in the head to digest a way into the egg; a nucleus with half the genetic material.
- **Nerve cell**: long, to carry electrical impulses over long distances; branched endings to connect with many other cells.
- **Muscle cell**: contains protein fibres that slide to contract; many mitochondria to transfer energy for contraction.
H: Specialised plant cells
- **Root hair cell**: a long projection giving a large surface area to absorb water and mineral ions; many mitochondria for active transport; no chloroplasts.
- **Xylem cell**: dead cells joined end to end to form hollow tubes, strengthened by **lignin**, to carry water and mineral ions.
- **Phloem cell**: elongated cells joined end to end with pores in the end walls (sieve plates), so dissolved sugars can move from cell to cell.
H: Differentiation
P: **Differentiation** is the process by which a cell changes to become specialised, acquiring the sub-cellular structures it needs for its function. Most animal cells differentiate at an early stage of development, and in mature animals cell division is mainly restricted to **repair and replacement**. Many plant cells keep the ability to differentiate throughout life.
X: Explain how a root hair cell is adapted to absorb mineral ions from the soil.
> Its long hair gives a large surface area for absorption.
> Mineral ions are more concentrated inside the cell than in the soil, so they must be taken in by active transport.
> Active transport needs energy from respiration, so the cell has many mitochondria.
K: A specialised cell's structures match its job; differentiation is how cells become specialised, early in animals but throughout life in many plant cells.
!: Describing an adaptation without its function. "Many mitochondria" earns credit only when linked to transferring energy for something, such as swimming or active transport.
EV: established | Differentiation produces specialised cell types; most animal cells lose the ability to differentiate early in development, while plant meristems keep it throughout life.
T: Specialised cell | A cell with structures adapted to carry out a particular function
T: Differentiation | The process by which a cell becomes specialised by acquiring different sub-cellular structures
T: Lignin | A tough substance that strengthens the walls of xylem tubes
SUM: Sperm, nerve and muscle cells, and root hair, xylem and phloem cells, each have structures matched to their function.
SUM: Animal cells mostly differentiate early; many plant cells can differentiate throughout life.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.1.1.3 Cell specialisation and 4.1.1.4 Cell differentiation | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 30.1 "The plant body" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/30-1-the-plant-body
Q: Why does a sperm cell have many mitochondria? | To transfer the energy needed for the tail to swim to the egg.
Q: What is differentiation? | The process by which a cell becomes specialised for a particular function.
M1#gcse-u10-03-q1@1: Which feature helps a nerve cell carry impulses over long distances? | It is long | It has a cellulose wall | It has chloroplasts | It has a tail | Nerve cells are long, with branched endings that connect to other cells; tails are found on sperm cells.
M2#gcse-u10-03-q2@2: Why are xylem cells dead and hollow when mature? | Hollow tubes let water flow through without cell contents in the way | Dead cells use up less water than living cells | Hollow cells store glucose made in the leaf | Dead cells carry out more photosynthesis | With no cytoplasm or end walls, xylem forms continuous tubes, strengthened by lignin, for the transport of water and ions.
TF2#gcse-u10-03-q3@3: In mature animals, cell division is mainly restricted to repair and replacement. | true | Most animal cells differentiate early; later, division mainly replaces worn-out cells and repairs damage.
M3#gcse-u10-03-q4@2,3: A gardener cuts a stem from a plant and it grows new roots. Why is this possible in plants but not in mammals? | Many plant cells keep the ability to differentiate throughout life | Plant cells have no nucleus, so they can change type | Mammal cells cannot divide by mitosis at all | Roots grow from stored starch, not from cells | Plants keep cells that can still differentiate into any type, such as root cells; most mammal cells lose this early in development.
SA3#gcse-u10-03-q5@1,3: Explain why a muscle cell and a sperm cell both have many mitochondria, and explain why differentiation is important in a multicellular organism. | Both cells need large amounts of energy: muscle cells for contraction and sperm cells for swimming. Mitochondria are where aerobic respiration transfers this energy. Differentiation lets cells become specialised, so different cells can carry out different functions efficiently; groups of specialised cells form tissues, organs and organ systems, allowing a large organism to do things single cells could not. | Energy for contraction ; Energy for swimming ; Respiration in mitochondria ; Specialised cells do different jobs ; Builds tissues, organs and systems

## Microscopy and magnification
LV: GCSE · Application
S: Microscopes let us see cells and the structures inside them. This lesson compares light and electron microscopes, explains magnification and resolution, and shows how to use the magnification equation with the right units.
O: Compare the magnification and resolution of light and electron microscopes
O: Explain how electron microscopy has increased understanding of sub-cellular structures
O: Calculate magnification, real size and image size, giving answers in standard form where appropriate
PRE: Eukaryotic and prokaryotic cells
H: Light and electron microscopes
P: **Magnification** is how many times bigger the image is than the real object. **Resolution** (resolving power) is the smallest distance between two points that can still be seen as separate: it decides how much detail you can see.
- A **light microscope** uses light and lenses; it can magnify up to about ×1500 and resolve detail down to about 0.2 µm. It is cheap, portable and can show living cells.
- An **electron microscope** uses a beam of electrons; it has much higher magnification (over ×1 000 000) and resolving power (well under 1 nm). Specimens must be dead, and the microscope is large and expensive.
P: Electron microscopes, developed in the 1930s, let biologists see sub-cellular structures in much finer detail, such as the internal structure of mitochondria and chloroplasts, and ribosomes, which are too small to see clearly with a light microscope.
H: The magnification equation
E: magnification = size of image ÷ size of real object :: the units of both sizes must be the same; magnification has no units
X: A cell is 25 µm long. In a drawing it is 50 mm long. What is the magnification?
> Convert to the same units: 50 mm = 50 000 µm.
> magnification = 50 000 ÷ 25 = ×2000.
X: A mitochondrion appears 10 mm long in an electron micrograph at ×5000. What is its real length?
> real size = image size ÷ magnification = 10 mm ÷ 5000 = 0.002 mm.
> 0.002 mm = 2 µm, or 2 × 10^{−6} m in standard form.
K: Electron microscopes have much higher magnification and resolution than light microscopes, which revealed many sub-cellular structures; magnification = image size ÷ real size, with both in the same units.
!: Mixing units in the equation. A 50 mm image of a 25 µm cell is ×2000, not ×2: convert first.
EV: established | The resolution of a light microscope is limited by the wavelength of light to about 0.2 µm; electron microscopes resolve far smaller detail.
T: Magnification | How many times larger an image is than the real object
T: Resolution | The smallest distance between two points that can be distinguished as separate; it determines the detail visible
SUM: Electron microscopes magnify and resolve far more than light microscopes, revealing structures such as ribosomes.
SUM: Magnification = image size ÷ real size; rearrange for real size and keep units the same.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.1.1.5 Microscopy | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 4.1 "Studying cells" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/4-1-studying-cells
Q: What is resolution? | The smallest distance between two points that can still be seen as separate; it decides the detail visible.
Q: How do you find real size from an image? | Real size = image size ÷ magnification.
M1#gcse-u10-04-q1@1: Why can an electron microscope show ribosomes clearly when a light microscope cannot? | It has a much higher resolving power | It uses brighter light | It can view living cells | It uses coloured stains | Ribosomes are smaller than the resolution limit of light microscopes; electrons allow far finer detail to be resolved.
NUM2#gcse-u10-04-q2@3: An image of a cell is 30 mm wide. The real cell is 60 µm wide. What is the magnification? | 500 | 0.5 | × | 30 mm = 30 000 µm; 30 000 ÷ 60 = ×500.
M2#gcse-u10-04-q3@3: A drawing of a pollen grain is 40 mm across at ×400. What is its real diameter? | 100 µm | 10 µm | 1 µm | 1000 µm | Real size = 40 mm ÷ 400 = 0.1 mm = 100 µm.
M3#gcse-u10-04-q4@1,2: A student says electron microscopes are always better than light microscopes. Which point best challenges this? | Only light microscopes can be used to watch living cells | Light microscopes have higher resolution | Electron microscopes cannot magnify above ×1500 | Electron micrographs never show mitochondria | Electron microscopes give far more detail, but specimens must be dead and prepared in a vacuum, so living processes need a light microscope.
SA3#gcse-u10-04-q5@1,2: Explain how the development of the electron microscope has changed our understanding of cells. | Light microscopes can magnify up to about ×1500 and resolve about 0.2 µm, so only larger structures such as the nucleus and cell wall can be seen. Electron microscopes have much higher magnification and resolving power, so structures can be studied in finer detail. Biologists could see the internal structure of mitochondria and chloroplasts and see very small structures such as ribosomes, so they understood more about how cells work. | Compares magnification ; Compares resolution ; Finer detail visible ; Named sub-cellular structure seen ; Better understanding of function

## Chromosomes, mitosis and the cell cycle
LV: GCSE · Foundation
S: Cells divide to let organisms grow and repair themselves. This lesson explains chromosomes and genes, the three stages of the cell cycle, and where mitosis happens.
O: Describe chromosomes and how they are arranged in body cells
O: Describe the three stages of the cell cycle, including mitosis
O: Recognise situations where mitosis is occurring and explain its importance
PRE: Animal and plant cells
H: Chromosomes
P: The nucleus contains **chromosomes** made of **DNA** molecules. Each chromosome carries a large number of **genes**. In body cells chromosomes are normally found in **pairs**: human body cells have 23 pairs, 46 chromosomes in all, one of each pair from each parent.
H: The cell cycle
P: Cells divide in a series of stages called the **cell cycle**, during which the genetic material is doubled and then divided into two identical cells. AQA uses three stages:
- **Stage 1, growth and DNA replication**: the cell grows and increases the number of sub-cellular structures such as ribosomes and mitochondria; the DNA replicates to form two copies of each chromosome.
- **Stage 2, mitosis**: one set of chromosomes is pulled to each end of the cell and the nucleus divides.
- **Stage 3, cytokinesis**: the cytoplasm and cell membranes divide to form two identical cells.
P: You do not need to know the separate phases inside mitosis for this course.
X: A root tip is viewed under a microscope and many cells show chromosomes lined up or being pulled apart. What does this show?
> The root tip is a region of rapid growth, so many cells are dividing.
> Chromosomes being pulled to opposite ends means the cells are in mitosis.
> Each new cell receives an identical set of chromosomes, so the new root cells are genetically identical.
K: In the cell cycle the cell grows and copies its DNA, then mitosis divides the nucleus, then the cytoplasm divides: one cell becomes two genetically identical cells.
!: Thinking mitosis makes cells with half the chromosomes. Mitosis keeps the full number (46 in humans); halving happens only in meiosis, when gametes are made.
EV: established | Mitosis produces two genetically identical daughter cells and is the basis of growth, repair and asexual reproduction.
T: Chromosome | A structure in the nucleus made of a long DNA molecule carrying many genes
T: Mitosis | Division of the nucleus that produces two genetically identical nuclei
T: Cell cycle | The series of stages in which a cell grows, copies its DNA and divides into two identical cells
SUM: Body cells hold chromosomes in pairs: 23 pairs in humans.
SUM: Cell cycle: growth and DNA replication, mitosis, then division of cytoplasm and membranes into two identical cells.
SUM: Mitosis is needed for growth, development, repair and replacement.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.1.2.1 Chromosomes and 4.1.2.2 Mitosis and the cell cycle | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 10.2 "The cell cycle" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/10-2-the-cell-cycle
Q: How many chromosomes are in a human body cell? | 46, in 23 pairs.
Q: What happens before a cell divides by mitosis? | It grows, makes more ribosomes and mitochondria, and replicates its DNA.
M1#gcse-u10-05-q1@1: What are chromosomes made of? | DNA | Cellulose | Protein fibres only | Glucose | Chromosomes are long DNA molecules (packed with proteins), each carrying many genes.
SEQ1#gcse-u10-05-q2@2: Put the stages of the cell cycle in order. | The cell grows and makes more mitochondria and ribosomes ; The DNA replicates ; One set of chromosomes is pulled to each end and the nucleus divides ; The cytoplasm and cell membrane divide | Growth and replication come first, then mitosis, then the cell itself divides.
M2#gcse-u10-05-q3@3: In which situation is mitosis taking place? | A cut on the skin healing | Sperm being made in the testes | Eggs being made in the ovaries | Pollen being made in a flower | Repair uses mitosis to make identical cells; gametes such as sperm, eggs and pollen are made by meiosis.
M3#gcse-u10-05-q4@2,3: A cell with 46 chromosomes divides by mitosis. How many chromosomes does each new cell have, and why? | 46, because the DNA was copied before the nucleus divided | 23, because the chromosomes were shared out between two cells | 92, because each chromosome had been copied | 46, because only one new cell is made | DNA replication doubles the chromosomes, then mitosis shares one full set to each new cell, so each has 46.
SA3#gcse-u10-05-q5@2,3: Describe what happens during the cell cycle and explain why it is important for a growing child. | The cell grows and makes more sub-cellular structures such as ribosomes and mitochondria, and the DNA replicates so there are two copies of each chromosome. In mitosis one set of chromosomes is pulled to each end of the cell and the nucleus divides. Then the cytoplasm and cell membrane divide, giving two genetically identical cells. A child grows because cells divide by mitosis to increase cell number; mitosis also replaces and repairs cells. | Growth and more organelles ; DNA replication ; Chromosomes separated and nucleus divides ; Cytoplasm and membrane divide ; Identical cells ; Growth and repair

## Stem cells
LV: GCSE · Evaluation
S: Stem cells can divide and turn into other types of cell, which gives them great medical promise. This lesson describes stem cells in embryos, adults and plant meristems, therapeutic cloning, and how to weigh the benefits, risks and ethical issues.
O: Describe the function of stem cells in embryos, in adult animals and in plant meristems
O: Explain how stem cells might treat conditions such as diabetes and paralysis, including therapeutic cloning
O: Evaluate the practical risks and benefits and the social and ethical issues of using stem cells
PRE: Specialised cells and differentiation
PRE: Chromosomes, mitosis and the cell cycle
H: Types of stem cell
P: A **stem cell** is an undifferentiated cell which can give rise to many more cells of the same type, and from which certain other cells can arise by differentiation.
- **Embryonic stem cells** can be cloned and made to differentiate into most types of human cell.
- **Adult stem cells**, such as those in bone marrow, can form many types of cell, including blood cells, but not every type.
- **Meristem** tissue at the tips of plant shoots and roots can differentiate into any type of plant cell, throughout the life of the plant.
H: Uses in medicine and farming
P: Treatment with stem cells may be able to help conditions such as **diabetes** (making new insulin-producing cells) and **paralysis** (making new nerve cells). In **therapeutic cloning**, an embryo is produced with the same genes as the patient; stem cells from it would not be rejected by the patient's immune system. Bone marrow transplants, which use adult stem cells to treat some blood cancers, are already established.
P: Meristem cells can be used to produce **clones** of plants quickly and economically: rare species can be cloned to protect them from extinction, and crop plants with useful features such as disease resistance can be cloned in large numbers for farmers.
H: Weighing it up
- **Benefits**: could replace damaged or diseased cells; cells from therapeutic cloning avoid rejection.
- **Risks**: stem cells grown in the lab could be contaminated with a virus and transfer infection; the procedures are not yet proven for most conditions.
- **Ethical issues**: some people have ethical or religious objections to using embryos, because the embryo is destroyed.
X: Evaluate using embryonic stem cells to treat paralysis.
> For: embryonic stem cells can become nerve cells, which adult stem cells generally cannot, so they could restore function.
> Against: embryos are destroyed, which some people object to; there is a risk of viral infection; long-term safety is unknown.
> Judgement: the benefit could be large, but treatment remains experimental and the ethical objections are real, so strict regulation and further trials are needed.
K: Embryonic stem cells can become most cell types, adult stem cells fewer, and plant meristems any plant cell; stem cell medicine is promising but carries risks and ethical objections.
!: Writing "stem cells can cure diabetes". Say "may be able to help": most stem cell treatments are still being researched.
EV: established | Bone marrow (haematopoietic stem cell) transplants are an established treatment for some blood cancers.
EV: contested | Whether embryonic stem cells will safely treat conditions such as diabetes and paralysis is not yet known, and the use of human embryos remains ethically disputed.
T: Stem cell | An undifferentiated cell that can divide to make more cells of the same type and can differentiate into other cell types
T: Meristem | Plant tissue at the tips of shoots and roots that can differentiate into any type of plant cell
T: Therapeutic cloning | Producing an embryo with the same genes as a patient so its stem cells are not rejected
SUM: Stem cells come from embryos, adult bone marrow and plant meristems; embryonic and meristem cells are the most versatile.
SUM: They may help treat diabetes and paralysis; therapeutic cloning avoids rejection; risks include viral infection; some object to using embryos.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.1.2.3 Stem cells | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 30.1 "The plant body" (meristems) | secondary | 2018 | https://openstax.org/books/biology-2e/pages/30-1-the-plant-body
Q: Where are meristems found in plants? | At the growing tips of shoots and roots.
Q: Why would stem cells from therapeutic cloning not be rejected? | The embryo has the same genes as the patient, so the immune system does not treat the cells as foreign.
M1#gcse-u10-06-q1@1: Which type of stem cell can differentiate into most types of human cell? | Embryonic stem cells | Adult bone marrow stem cells | Red blood cells | Root hair cells | Embryonic stem cells are the most versatile human stem cells; bone marrow cells form fewer types, mainly blood cells.
M2#gcse-u10-06-q2@2: Why might stem cells help a person with type 1 diabetes? | They could differentiate into cells that make insulin | They could digest the excess glucose in the blood | They could replace the person's kidneys | They contain insulin already | Type 1 diabetes destroys insulin-producing cells, so new ones grown from stem cells could replace them.
TF2#gcse-u10-06-q3@1: Meristem tissue can differentiate into any type of plant cell throughout the life of the plant. | true | Meristems at shoot and root tips keep this ability, which is why plants keep growing and can be cloned from cuttings.
M3#gcse-u10-06-q4@3: Which is a practical risk, rather than an ethical issue, of using stem cells grown in a lab? | The cells could be contaminated with a virus | Some people believe embryos have a right to life | Some religions object to destroying embryos | People disagree about who should pay | A virus transferred with the cells is a practical safety risk; the other options are ethical or social issues.
SA3#gcse-u10-06-q5@2,3: A farmer wants to grow thousands of identical disease-resistant crop plants, and a patient hopes for treatment of paralysis with stem cells. Compare the two uses of stem cells and evaluate them. | Plant meristem cells can differentiate into any plant cell throughout life, so clones of a disease-resistant plant can be produced quickly and cheaply, giving identical plants; a risk is that all clones would be equally vulnerable to a new disease. Treating paralysis would need embryonic stem cells, perhaps from therapeutic cloning, to make nerve cells; this could restore function and avoid rejection, but it is experimental, carries a risk of viral infection, and some people object to destroying embryos. The plant use is established; the medical use is promising but uncertain. | Meristems make any plant cell ; Clones quick and cheap ; Genetic uniformity risk ; Embryonic or therapeutic cloning for nerve cells ; Infection risk ; Ethical objection ; Judgement

## Diffusion
LV: GCSE · Foundation
S: Diffusion is how oxygen, carbon dioxide and many other substances get into and out of cells without any energy from the cell. This lesson defines diffusion as AQA does, gives examples in the body and explains the three factors that affect its rate.
O: Define diffusion and give examples of substances that diffuse into and out of cells
O: Explain how concentration gradient, temperature and surface area affect the rate of diffusion
PRE: Gas exchange and breathing
H: What diffusion is
P: **Diffusion** is the spreading out of the particles of any substance in solution, or particles of a gas, resulting in a **net movement** from an area of **higher concentration** to an area of **lower concentration**. Particles move randomly all the time; diffusion is the overall result. It is a passive process: it needs no energy from respiration.
- **Oxygen** diffuses from the alveoli into the blood, and from the blood into respiring cells.
- **Carbon dioxide** diffuses from respiring cells into the blood, and from the blood into the alveoli.
- **Urea**, a waste product, diffuses from liver cells into the blood plasma, to be excreted by the kidneys.
H: Factors affecting the rate
- **Concentration gradient**: the bigger the difference in concentration, the faster the rate.
- **Temperature**: higher temperature gives particles more kinetic energy, so they move and spread faster.
- **Surface area of the membrane**: a larger area lets more particles cross at once.
X: Why does oxygen keep diffusing into the blood in the lungs?
> Breathing brings in fresh air, keeping the oxygen concentration in the alveoli high.
> Blood flow carries oxygenated blood away, keeping the oxygen concentration in the blood low.
> So a steep concentration gradient is maintained, and diffusion continues quickly.
K: Diffusion is the net movement of particles from higher to lower concentration; it is faster with a steeper concentration gradient, a higher temperature and a larger surface area.
!: Saying particles "want" to move or only move one way. All particles move randomly in every direction; there is simply a net movement down the gradient.
EV: established | Diffusion results from the random motion of particles and produces net movement down a concentration gradient.
T: Diffusion | The spreading out of particles resulting in a net movement from an area of higher concentration to an area of lower concentration
T: Concentration gradient | The difference in concentration between two areas
SUM: Diffusion is passive net movement from high to low concentration: oxygen, carbon dioxide and urea are examples.
SUM: Rate rises with concentration gradient, temperature and surface area.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.1.3.1 Diffusion | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 5.2 "Passive transport" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/5-2-passive-transport
Q: Name three factors that affect the rate of diffusion. | The concentration gradient, the temperature and the surface area of the membrane.
Q: Which waste product diffuses from cells into the blood plasma for excretion by the kidneys? | Urea.
M1#gcse-u10-07-q1@1: Which describes diffusion? | Net movement of particles from a higher to a lower concentration | Movement of particles against a gradient using energy | Movement of water only, through a membrane | Movement of particles only when the cell respires | Diffusion is passive and works for any particles in a gas or solution; moving against a gradient is active transport.
M2#gcse-u10-07-q2@2: Why does diffusion happen faster at 30 °C than at 20 °C? | The particles have more kinetic energy and move faster | The membrane becomes thinner at higher temperature | The concentration gradient disappears | Enzymes push the particles through faster | Higher temperature means faster-moving particles, so they spread out more quickly; diffusion does not need enzymes.
TF1#gcse-u10-07-q3@1: Diffusion needs energy released by respiration. | false | Diffusion is passive: the energy comes from the random movement of the particles themselves.
M3#gcse-u10-07-q4@2: Which change would most increase the rate at which carbon dioxide diffuses out of the blood into the alveoli? | Breathing faster, which lowers the carbon dioxide concentration in the alveoli | Holding the breath, which raises the carbon dioxide in the alveoli | Reducing the surface area of the alveoli | Lowering body temperature | Faster ventilation keeps the alveolar carbon dioxide low, steepening the gradient; the other changes reduce the rate.
SA2#gcse-u10-07-q5@1,2: Explain how oxygen moves from the alveoli into the blood, and how the body keeps this process fast. | Oxygen moves by diffusion: a net movement of oxygen molecules from a higher concentration in the alveoli to a lower concentration in the blood. Breathing replaces air in the alveoli so the oxygen concentration stays high, and the blood flow carries oxygenated blood away so the concentration in the blood stays low, keeping a steep concentration gradient. The alveoli also give a very large surface area. | Diffusion named ; High to low concentration ; Ventilation keeps gradient ; Blood flow keeps gradient ; Large surface area

## Surface area to volume ratio and exchange surfaces
LV: GCSE · Application
S: Small organisms can rely on diffusion across their surface, but large ones cannot. This lesson shows how to calculate surface area to volume ratios and explains why multicellular organisms need exchange surfaces and transport systems, using lungs, small intestine, gills, roots and leaves.
O: Calculate and compare surface area to volume ratios
O: Explain why multicellular organisms need exchange surfaces and a transport system
O: Explain how the small intestine, lungs, fish gills, roots and leaves are adapted for exchanging materials
PRE: Diffusion
H: Surface area to volume ratio
P: A single-celled organism has a relatively **large surface area to volume ratio**, so diffusion across its surface supplies enough molecules for its needs. As an organism gets bigger, its volume grows faster than its surface area, so the ratio falls.
X: Compare the surface area to volume ratios of cubes with sides of 1 cm and 3 cm.
> 1 cm cube: surface area = 6 × 1 × 1 = 6 cm²; volume = 1 cm³; ratio 6 : 1.
> 3 cm cube: surface area = 6 × 3 × 3 = 54 cm²; volume = 27 cm³; ratio 54 : 27 = 2 : 1.
> The larger cube has a smaller ratio: less surface for each unit of volume.
P: In a large organism, diffusion across the outer surface would be too slow to reach cells deep inside. Multicellular organisms therefore have **specialised exchange surfaces** and, in animals, a **transport system** (the blood) to carry materials to and from every cell.
H: Features of good exchange surfaces
- A **large surface area**.
- A **thin membrane**, giving a short diffusion path.
- In animals, an **efficient blood supply** to keep the concentration gradient steep.
- In animals, for gas exchange, being **ventilated**.
P: Examples: the **small intestine** has millions of villi with a good blood supply; the **lungs** have millions of alveoli with thin walls and a capillary network; **fish gills** have many thin filaments with a large surface area and a counter-flowing blood supply; **roots** have root hair cells; **leaves** are flat and thin with stomata and air spaces in the spongy mesophyll.
K: As size increases, surface area to volume ratio falls, so large organisms need exchange surfaces with a large area, thin membranes, a good blood supply and ventilation, plus a transport system.
!: Comparing ratios written as fractions the wrong way round. Write surface area : volume and simplify to "something : 1" so ratios can be compared directly.
EV: established | Surface area to volume ratio decreases as size increases, which limits how large an organism can be without exchange surfaces and transport systems.
T: Surface area to volume ratio | The surface area of an object divided by its volume, often written as a ratio such as 6 : 1
T: Exchange surface | A specialised surface across which materials are exchanged, such as the alveoli or villi
SUM: Small organisms have large surface area to volume ratios; diffusion across the surface is enough.
SUM: Large organisms need exchange surfaces (large area, thin, good blood supply, ventilated) and a transport system.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.1.3.1 Diffusion | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 39.1 "Systems of gas exchange" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/39-1-systems-of-gas-exchange
Q: What is the surface area to volume ratio of a 2 cm cube? | 24 cm² : 8 cm³ = 3 : 1.
Q: Give four features of an efficient exchange surface. | Large surface area, thin membrane, efficient blood supply and (for gas exchange) ventilation.
M1#gcse-u10-08-q1@3: How are villi in the small intestine adapted for absorption? | A large surface area, thin walls and a good blood supply | Thick walls to stop food escaping | Few capillaries so blood moves slowly | Cilia that sweep food towards the anus | Villi greatly increase the surface area, have a one-cell-thick lining and a dense capillary network to keep the gradient steep.
NUM2#gcse-u10-08-q2@1: A cube has sides of 4 cm. What is its surface area to volume ratio, written as x : 1? | 1.5 | 0.01 | : 1 | Surface area = 6 × 16 = 96 cm²; volume = 64 cm³; 96 ÷ 64 = 1.5, so 1.5 : 1.
M2#gcse-u10-08-q3@2: Why does an earthworm-sized animal need a blood system when a single-celled amoeba does not? | Its surface area to volume ratio is too small for diffusion to supply all its cells | It has a larger surface area to volume ratio | Diffusion does not happen in animals | Its cells do not use oxygen | Larger organisms have a smaller ratio and cells far from the surface, so diffusion alone would be too slow.
M3#gcse-u10-08-q4@2,3: A fish is taken out of water. Its gill filaments stick together. Why does it soon suffocate? | The surface area for gas exchange is greatly reduced | Air contains no oxygen | The gills become too thin | The blood supply to the gills increases | Gills rely on many separate filaments for a large area; when they collapse, too little oxygen can diffuse in.
SA3#gcse-u10-08-q5@1,2,3: Explain why a large multicellular organism needs specialised exchange surfaces, using surface area to volume ratio, and describe how the lungs are adapted. | As an organism gets bigger its volume increases faster than its surface area, so its surface area to volume ratio falls. Diffusion across the outer surface cannot supply enough oxygen to cells deep inside, and distances are too great. So it needs specialised exchange surfaces and a transport system. The lungs have millions of alveoli giving a large surface area, thin walls for a short diffusion path, a rich capillary network keeping the gradient steep, and ventilation by breathing. | Ratio falls as size increases ; Diffusion too slow or distance too great ; Need for exchange surface and transport ; Large surface area of alveoli ; Thin walls ; Blood supply and ventilation

## Osmosis
LV: GCSE · Application
S: Osmosis is the special case of diffusion that moves water into and out of cells. This lesson uses AQA's definition, explains what happens to animal and plant cells in different solutions, and shows how to calculate percentage change in mass.
O: Define osmosis and explain the role of the partially permeable membrane
O: Predict and explain the effect of solutions of different concentrations on animal and plant cells
O: Calculate percentage gain and loss of mass and interpret graphs of osmosis results
PRE: Diffusion
H: What osmosis is
P: **Osmosis** is the diffusion of water from a **dilute solution** to a **concentrated solution** through a **partially permeable membrane**. A partially permeable membrane, such as the cell membrane, lets small molecules like water through but not larger solute molecules like sugar. A dilute solution has a lot of water and little solute; a concentrated solution has less water and more solute.
H: Osmosis in cells
- If the solution outside is **more dilute** than the cell contents, water enters by osmosis. Plant cells swell and become firm (turgid), held in by the cell wall; animal cells can swell and burst.
- If the solution outside is **more concentrated**, water leaves by osmosis. Plant cells become soft (flaccid), and the membrane may pull away from the wall; animal cells shrink.
- If the concentrations are the **same**, there is no net movement of water.
H: Working with results
E: percentage change in mass = (final mass − initial mass) ÷ initial mass × 100 :: a negative answer is a loss of mass
X: A potato cylinder has a mass of 2.50 g. After 24 hours in a sugar solution it has a mass of 2.20 g. Find the percentage change.
> Change = 2.20 − 2.50 = −0.30 g.
> Percentage change = −0.30 ÷ 2.50 × 100 = −12%.
> The cylinder lost water by osmosis, so the solution was more concentrated than the potato cells.
P: Percentage change is used rather than change in mass so cylinders with different starting masses can be compared fairly. On a graph of percentage change against concentration, the point where the line crosses zero estimates the concentration equal to that of the cell contents.
K: Osmosis is the diffusion of water from a dilute to a concentrated solution through a partially permeable membrane; cells gain water in more dilute solutions and lose it in more concentrated ones.
!: Saying water moves "from high to low concentration" without saying of what. Use AQA's wording: from a dilute solution to a more concentrated solution.
EV: established | Water crosses cell membranes by osmosis, and the direction depends on the relative concentrations of solutions on each side.
T: Osmosis | The diffusion of water from a dilute solution to a concentrated solution through a partially permeable membrane
T: Partially permeable membrane | A membrane that allows small molecules such as water through but not larger molecules such as sugar
T: Turgid | Describes a plant cell that is firm because water has entered by osmosis and pushes against the cell wall
SUM: Osmosis moves water from dilute to concentrated solutions across a partially permeable membrane.
SUM: Use percentage change in mass to compare tissue samples; where the graph crosses zero, there is no net movement.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.1.3.2 Osmosis | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 5.2 "Passive transport" (osmosis and tonicity) | secondary | 2018 | https://openstax.org/books/biology-2e/pages/5-2-passive-transport
Q: Define osmosis. | The diffusion of water from a dilute solution to a concentrated solution through a partially permeable membrane.
Q: Why does a plant cell not burst in pure water? | The cell wall resists the swelling, so the cell becomes turgid instead of bursting.
M1#gcse-u10-09-q1@1: Which molecules can pass through a partially permeable membrane in osmosis? | Water molecules | Sugar molecules only | Starch molecules | Protein molecules | The membrane lets small water molecules through but not larger solute molecules, so water moves and the solute stays.
NUM2#gcse-u10-09-q2@3: A piece of potato increases in mass from 4.0 g to 4.6 g. What is the percentage change in mass? | 15 | 0.1 | % | (4.6 − 4.0) ÷ 4.0 × 100 = 0.6 ÷ 4.0 × 100 = 15%.
M2#gcse-u10-09-q3@2: Red blood cells are placed in pure water. What happens? | Water enters by osmosis and the cells swell and burst | Water leaves and the cells shrink | Nothing, because they have a cell wall | Salt enters the cells by osmosis | Pure water is more dilute than the cytoplasm, so water enters; with no cell wall, animal cells can burst.
M3#gcse-u10-09-q4@2,3: Potato cylinders gain mass in 0.1 mol/dm³ sugar solution and lose mass in 0.4 mol/dm³ solution. What is the best estimate for the concentration of the potato cell contents? | Between 0.1 and 0.4 mol/dm³ | Below 0.1 mol/dm³ | Above 0.4 mol/dm³ | Exactly 0 mol/dm³ | Gaining mass means the solution was more dilute than the cells, and losing means it was more concentrated, so the cell contents lie in between.
SA3#gcse-u10-09-q5@2,3: Explain why a lettuce left in salty water goes limp, but crisps up again in fresh water. | Salty water is more concentrated than the cell contents, so water leaves the lettuce cells by osmosis through the partially permeable cell membrane. The cells become flaccid and the leaves go limp. Fresh water is more dilute than the cell contents, so water enters by osmosis; the cells swell and press against the cell wall, becoming turgid, so the leaves become firm again. | Osmosis named ; Salty water more concentrated ; Water leaves, cells flaccid ; Fresh water more dilute ; Water enters, cells turgid against wall

## Active transport
LV: GCSE · Application
S: Sometimes cells need to take in substances that are already more concentrated inside than outside. This lesson explains active transport, why it needs energy from respiration, its role in root hair cells and the gut, and how it differs from diffusion and osmosis.
O: Describe active transport and explain why it requires energy from respiration
O: Explain how active transport is used in root hair cells and the small intestine
O: Explain the differences between diffusion, osmosis and active transport
PRE: Osmosis
PRE: Specialised cells and differentiation
H: Moving against the gradient
P: **Active transport** moves substances from a more dilute solution to a more concentrated solution, that is, **against a concentration gradient**. This requires **energy from respiration**, so cells that carry out a lot of active transport have many mitochondria.
- **Root hair cells** absorb **mineral ions** such as nitrate and magnesium from very dilute solutions in the soil. Plants need these ions for healthy growth: nitrate to make proteins and magnesium to make chlorophyll.
- In the **small intestine**, sugar molecules are absorbed from a lower concentration in the gut into the blood, which has a higher sugar concentration. The sugar is used in cell respiration.
H: Comparing the three processes
- **Diffusion**: any particles in a gas or solution; down a concentration gradient; no energy from respiration; no membrane needed.
- **Osmosis**: water only; from dilute to concentrated solution; through a partially permeable membrane; no energy from respiration.
- **Active transport**: dissolved substances; against a concentration gradient; through a membrane; needs energy from respiration.
X: A plant's roots are waterlogged, so the soil has very little oxygen. Why does the plant soon show signs of mineral deficiency?
> Root cells need oxygen for aerobic respiration.
> With less respiration, less energy is transferred for active transport.
> Mineral ions are more concentrated in root cells than in the soil, so they cannot be absorbed without active transport.
K: Active transport moves substances against a concentration gradient using energy from respiration: root hairs absorb mineral ions and the gut absorbs sugar this way.
!: Saying water enters root hairs by active transport. Water enters by osmosis; it is the mineral ions that need active transport.
EV: established | Active transport uses energy from respiration to move substances against a concentration gradient, as in mineral ion uptake by roots.
T: Active transport | The movement of substances from a more dilute solution to a more concentrated solution, against a concentration gradient, using energy from respiration
T: Mineral ions | Dissolved ions such as nitrate and magnesium that plants absorb from the soil for healthy growth
SUM: Active transport works against the gradient and needs energy from respiration.
SUM: Root hair cells use it for mineral ions; the small intestine uses it to absorb sugar into the blood.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.1.3.3 Active transport | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 5.3 "Active transport" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/5-3-active-transport
Q: Where does the energy for active transport come from? | Respiration.
Q: Why do root hair cells contain many mitochondria? | To transfer energy by respiration for the active transport of mineral ions.
M1#gcse-u10-10-q1@1: Which statement describes active transport? | Movement against a concentration gradient using energy | Movement of water through a membrane | Movement down a gradient with no energy needed | Movement of gases only, from high to low | Only active transport goes against the gradient, and so it needs energy from respiration.
MATCH2#gcse-u10-10-q2@3: Match each example to the process. | Oxygen entering the blood in the lungs = Diffusion ; Water entering a root hair cell = Osmosis ; Nitrate ions entering a root hair cell = Active transport ; Carbon dioxide entering a leaf = Diffusion | Gases move by diffusion, water by osmosis and ions against their gradient by active transport.
M2#gcse-u10-10-q3@2: A drug stops mitochondria working in gut lining cells. What happens to sugar absorption? | Less sugar is absorbed into the blood by active transport | More sugar is absorbed by osmosis | Sugar absorption is unaffected | Sugar is absorbed faster by diffusion | Without respiration in mitochondria, there is too little energy for active transport of sugar against its gradient.
M3#gcse-u10-10-q4@2,3: Why can't root hair cells absorb mineral ions by diffusion alone? | The ions are usually more concentrated inside the root cells than in the soil | Mineral ions are too large to move at all | Diffusion only happens in animals | Diffusion only moves water | Diffusion would carry ions down the gradient, out of the root; active transport is needed to take them in against it.
SA3#gcse-u10-10-q5@1,3: Compare diffusion, osmosis and active transport. | All three move substances into or out of cells. Diffusion is the net movement of any particles in a gas or solution from a higher to a lower concentration; it needs no energy from respiration. Osmosis is the diffusion of water from a dilute to a concentrated solution through a partially permeable membrane; it is also passive. Active transport moves substances from a dilute to a more concentrated solution, against the concentration gradient, and needs energy from respiration, for example mineral ions into root hairs. | Diffusion down gradient, passive ; Osmosis is water through partially permeable membrane ; Osmosis passive ; Active transport against gradient ; Needs energy from respiration ; Example

## Enzymes and the lock and key model
LV: GCSE · Application
S: Enzymes are the catalysts that make life's chemical reactions fast enough. This lesson explains what enzymes are, how the lock and key model explains their specificity, and how temperature and pH affect their activity, with rate calculations.
O: Describe enzymes as biological catalysts made of protein with a specific active site
O: Use the lock and key theory to explain enzyme action and specificity
O: Explain the effects of temperature and pH on enzyme activity and calculate rates of reaction
PRE: The digestive system
H: What enzymes are
P: **Enzymes** are biological catalysts: they speed up reactions without being used up. They are large **protein** molecules, and each is folded into a particular shape with a region called the **active site**. Enzymes catalyse specific reactions because of the shape of their active site. They control the reactions of metabolism.
H: The lock and key model
P: In the **lock and key theory**, the **substrate** (the molecule the enzyme acts on) fits into the active site like a key into a lock. The reaction happens, the **products** are released, and the enzyme is free to work again. Only a substrate with the right shape fits, which explains why each enzyme is specific. It is a simplified model: in real enzymes the active site changes shape slightly to grip the substrate.
H: Temperature and pH
- As temperature rises, molecules move faster and collide more often, so the rate increases, up to the **optimum temperature** (about 37 °C for many human enzymes).
- Above the optimum, the bonds holding the enzyme's shape break; the active site changes shape and the substrate no longer fits. The enzyme is **denatured**, and the rate falls quickly.
- Each enzyme has an **optimum pH**. If the pH is too far above or below it, the active site changes shape and the enzyme denatures. Stomach protease works best in acid (about pH 2); amylase works best near neutral (about pH 7).
X: Amylase digests a starch solution completely in 50 seconds. Calculate the rate of reaction.
> Rate = 1 ÷ time = 1 ÷ 50 = 0.02 per second (s^{−1}).
> If 1 g of starch was digested: rate = 1 g ÷ 50 s = 0.02 g/s.
> A shorter time means a faster rate.
K: Enzymes are protein catalysts whose active site fits only their substrate (lock and key); rate rises with temperature to an optimum, then falls as the enzyme denatures; each enzyme has an optimum pH.
!: Saying enzymes are "killed" by heat. Enzymes are molecules, not living things: they are **denatured**, meaning the active site changes shape.
EV: established | Enzyme activity depends on the shape of the active site, which is altered by high temperature and extremes of pH.
EV: established | The lock and key theory is a simplified model; the induced fit model, in which the active site changes shape slightly to fit the substrate, describes real enzymes more accurately.
T: Enzyme | A protein molecule that acts as a biological catalyst
T: Active site | The region of an enzyme into which a specific substrate fits
T: Denatured | Describes an enzyme whose active site has changed shape so the substrate no longer fits
SUM: Enzymes are protein catalysts with a specific active site; the lock and key model explains specificity.
SUM: High temperature and extreme pH denature enzymes; rate = 1 ÷ time or amount ÷ time.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.2.2.1 The human digestive system (enzymes) | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 6.5 "Enzymes" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/6-5-enzymes
Q: What is the active site? | The region of an enzyme into which its specific substrate fits.
Q: What happens to an enzyme above its optimum temperature? | It denatures: the active site changes shape so the substrate no longer fits.
M1#gcse-u10-11-q1@1: What type of molecule are enzymes? | Proteins | Carbohydrates | Lipids | Nucleic acids | Enzymes are large protein molecules folded into a specific shape that forms the active site.
M2#gcse-u10-11-q2@2: Why does the enzyme amylase break down starch but not protein? | Only starch has the right shape to fit amylase's active site | Protein is too small to reach the enzyme | Amylase is used up by starch first | Protein denatures amylase | Each enzyme's active site is complementary to one substrate, which is why enzymes are specific.
NUM2#gcse-u10-11-q3@3: A protease digests a protein sample in 40 s. What is the rate of reaction, as 1 ÷ time? | 0.025 | 0.001 | s⁻¹ | Rate = 1 ÷ 40 = 0.025 s⁻¹.
M3#gcse-u10-11-q4@3: An enzyme is heated to 70 °C and then cooled to 37 °C. Why does it still not work? | Denaturing changed the active site shape permanently | Enzymes only work while being heated | Cooling uses up the enzyme | The substrate denatured instead | Once the active site has lost its shape, it does not reform on cooling, so the substrate still cannot fit.
SA3#gcse-u10-11-q5@2,3: Explain, using the lock and key model, why the rate of an enzyme-controlled reaction increases from 20 °C to 37 °C and then falls sharply at 50 °C. | In the lock and key model the substrate fits the enzyme's active site, which has a specific shape. From 20 to 37 °C, enzyme and substrate molecules gain kinetic energy and collide more often, so more enzyme–substrate complexes form and the rate increases. Above the optimum, bonds holding the enzyme's shape break, so the active site changes shape and the substrate no longer fits: the enzyme is denatured and the rate falls. | Substrate fits active site ; More kinetic energy and collisions ; Rate rises to optimum ; Active site changes shape ; Denatured, substrate no longer fits

## Digestive enzymes and bile
LV: GCSE · Application
S: Digestion turns large insoluble food molecules into small soluble ones that can be absorbed into the blood. Building on School 4's tour of the gut, this lesson sets out the principles of organisation and exactly what AQA requires about amylase, proteases, lipases and bile, and how the products of digestion are used.
O: Describe the levels of organisation from cells to organ systems, using the digestive system as an example
O: Recall the sites of production and action of amylase, proteases and lipases, using word equations
O: Explain how bile increases the rate of fat digestion and how the products of digestion are used
PRE: The digestive system
PRE: Enzymes and the lock and key model
H: From cells to organ systems
P: Cells are the basic building blocks of all living organisms. A **tissue** is a group of cells with a similar structure and function. **Organs** are aggregations of tissues performing specific functions. Organs are organised into **organ systems**, which work together to form organisms. The digestive system is an organ system in which several organs work together to digest and absorb food.
H: The digestive enzymes
- **Carbohydrases** break down carbohydrates to simple sugars. **Amylase** is a carbohydrase: starch → sugars (maltose). It is made in the **salivary glands**, **pancreas** and **small intestine**.
- **Proteases** break down proteins → amino acids. They are made in the **stomach** (pepsin), **pancreas** and **small intestine**.
- **Lipases** break down lipids (fats) → glycerol + fatty acids. They are made in the **pancreas** and **small intestine**.
H: Bile
P: **Bile** is made in the **liver** and stored in the **gall bladder**. It is not an enzyme. It is **alkaline**, to neutralise hydrochloric acid from the stomach, and it **emulsifies** fat into small droplets, which increases the surface area. The alkaline conditions and large surface area increase the rate of fat breakdown by lipase.
P: The products of digestion are used to build new carbohydrates, lipids and proteins; some glucose is used in respiration.
X: A person has their gall bladder removed. Why might they be advised to eat smaller, lower-fat meals?
> Bile is still made by the liver, but it is no longer stored and released in large amounts after a meal.
> Less bile reaches the small intestine at once, so fat is emulsified less and has a smaller surface area for lipase.
> Fat is digested more slowly, so large fatty meals may cause discomfort.
K: Amylase (salivary glands, pancreas, small intestine) breaks starch to sugars; proteases (stomach, pancreas, small intestine) break proteins to amino acids; lipases (pancreas, small intestine) break lipids to glycerol and fatty acids; bile neutralises acid and emulsifies fat.
!: Writing that bile is made in the gall bladder. It is made in the liver and only stored in the gall bladder.
EV: established | Digestive enzymes hydrolyse large food molecules into small soluble products that are absorbed in the small intestine.
T: Carbohydrase | An enzyme that breaks down carbohydrates into simple sugars, such as amylase
T: Protease | An enzyme that breaks down proteins into amino acids
T: Lipase | An enzyme that breaks down lipids into glycerol and fatty acids
T: Emulsify | To break fat into small droplets, increasing its surface area
SUM: Tissues form organs, organs form organ systems such as the digestive system.
SUM: Amylase, proteases and lipases make soluble sugars, amino acids, and glycerol and fatty acids.
SUM: Bile, from the liver via the gall bladder, neutralises stomach acid and emulsifies fat.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.2.1 Principles of organisation and 4.2.2.1 The human digestive system | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 34.3 "Digestive system processes" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/34-3-digestive-system-processes
Q: What are the products of lipase action? | Glycerol and fatty acids.
Q: Where is bile made and stored? | Made in the liver, stored in the gall bladder.
M1#gcse-u10-12-q1@2: Which organ produces amylase, protease and lipase? | The pancreas | The liver | The gall bladder | The large intestine | The pancreas makes all three and releases them into the small intestine; the liver makes bile, which is not an enzyme.
M2#gcse-u10-12-q2@3: How does bile increase the rate of fat digestion? | It emulsifies fat and makes conditions alkaline for lipase | It breaks fats into glycerol and fatty acids | It makes the stomach more acidic | It absorbs fat into the blood | Bile is not an enzyme: emulsification increases surface area and its alkalinity gives lipase better conditions.
MATCH1#gcse-u10-12-q3@2: Match each enzyme to its products. | Amylase = Sugars ; Protease = Amino acids ; Lipase = Glycerol and fatty acids | Carbohydrases make sugars, proteases make amino acids and lipases make glycerol and fatty acids.
M3#gcse-u10-12-q4@1,3: Why must food be digested before it can be used by body cells? | Large insoluble molecules cannot be absorbed into the blood | Undigested food contains no energy | Cells can only use amino acids | Enzymes are only made in body cells | Only small soluble molecules can be absorbed through the gut wall into the blood and carried to cells.
SA3#gcse-u10-12-q5@2,3: Describe how a meal of bread and butter is digested, naming the enzymes, where they are made and the products. | Bread contains starch: amylase from the salivary glands, pancreas and small intestine breaks starch into sugars. Butter is mainly lipid: bile from the liver (stored in the gall bladder) neutralises stomach acid and emulsifies the fat into small droplets, increasing the surface area; lipase from the pancreas and small intestine breaks lipids into glycerol and fatty acids. Bread also contains protein, digested by proteases from the stomach, pancreas and small intestine into amino acids. The small soluble products are absorbed in the small intestine. | Amylase with sites ; Sugars as products ; Bile emulsifies and neutralises ; Lipase with sites ; Glycerol and fatty acids ; Absorption of soluble products

## Plant tissues and the leaf
LV: GCSE · Foundation
S: The leaf is a plant organ built from several tissues, each suited to its job. This lesson describes the epidermal tissues, palisade and spongy mesophyll, xylem, phloem and meristem, and the guard cells that open and close stomata.
O: Name the plant tissues and state their functions
O: Explain how the structure of each tissue in a leaf relates to its function
PRE: Specialised cells and differentiation
PRE: Animal and plant cells
H: Plant tissues
- **Epidermal tissue** covers the plant. The **upper epidermis** is transparent, letting light through, and is often covered with a waxy **cuticle** that reduces water loss.
- **Palisade mesophyll**: tall cells packed with **chloroplasts**, near the top of the leaf, where most photosynthesis happens.
- **Spongy mesophyll**: loosely packed cells with **air spaces** that allow carbon dioxide and oxygen to diffuse through the leaf.
- **Xylem** carries water and mineral ions; **phloem** carries dissolved sugars.
- **Meristem** tissue at the growing tips of shoots and roots makes new cells.
P: The leaf is a plant **organ** because it is made of several tissues working together. Xylem and phloem run through it in the **veins**, which also help to support the thin leaf blade.
H: Stomata and guard cells
P: The lower epidermis has many small pores called **stomata** (singular: stoma). Each is surrounded by two **guard cells**, which control its size. When the guard cells take in water and become turgid, the stoma opens; when they lose water and become flaccid, it closes. Stomata let carbon dioxide in for photosynthesis and let oxygen and water vapour out, so they control **gas exchange** and **water loss**.
X: Why are most stomata on the lower surface of a leaf?
> The lower surface is shaded and cooler than the upper surface.
> Less water evaporates from stomata there, so less water is lost.
> Carbon dioxide can still diffuse in through the lower stomata and reach the mesophyll through the air spaces.
K: A leaf is an organ: a transparent waxy epidermis, palisade mesophyll for photosynthesis, spongy mesophyll with air spaces, xylem and phloem in veins, and guard cells that open and close stomata.
!: Saying stomata are cells. A stoma is a pore; the guard cells around it are the cells.
EV: established | Stomata, controlled by guard cells, regulate the exchange of carbon dioxide, oxygen and water vapour between a leaf and the air.
T: Palisade mesophyll | Leaf tissue of tall cells with many chloroplasts where most photosynthesis takes place
T: Stomata | Pores, mostly in the lower epidermis of a leaf, that allow gas exchange and water loss
T: Guard cells | Pairs of cells that open and close a stoma by changing shape as they gain or lose water
SUM: Leaf tissues: epidermis, palisade and spongy mesophyll, xylem and phloem; meristems make new cells.
SUM: Guard cells open and close stomata to balance carbon dioxide uptake with water loss.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.2.3.1 Plant tissues | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 30.4 "Leaves" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/30-4-leaves
Q: What is the function of the spongy mesophyll's air spaces? | They allow gases such as carbon dioxide and oxygen to diffuse through the leaf.
Q: Where is meristem tissue found? | At the growing tips of shoots and roots.
M1#gcse-u10-13-q1@1: Which leaf tissue carries out most photosynthesis? | Palisade mesophyll | Spongy mesophyll | Xylem | Lower epidermis | Palisade cells are packed with chloroplasts near the upper surface, where light is brightest.
M2#gcse-u10-13-q2@2: Why is the upper epidermis of a leaf transparent? | To let light through to the mesophyll cells below | To let water evaporate quickly | To absorb carbon dioxide | To store sugars made in photosynthesis | Light must pass through to reach the chloroplasts in the palisade mesophyll.
TF2#gcse-u10-13-q3@2: Guard cells close the stomata when they lose water and become flaccid. | true | When water is short, guard cells lose water and the stomata close, reducing water loss.
M3#gcse-u10-13-q4@2: A plant has leaves with a thick waxy cuticle and few stomata. Which environment is it most likely adapted to? | A hot, dry desert | A shaded, damp woodland floor | A freshwater pond surface | A cool, humid rainforest | A thick cuticle and few stomata reduce water loss, which matters most where water is scarce.
SA2#gcse-u10-13-q5@1,2: Describe how the tissues of a leaf are arranged to carry out photosynthesis efficiently. | The upper epidermis is transparent so light reaches the palisade mesophyll, whose tall cells packed with chloroplasts absorb light near the top of the leaf. The spongy mesophyll has air spaces so carbon dioxide can diffuse from the stomata to the cells. Stomata, controlled by guard cells, let carbon dioxide in and oxygen out. Xylem in the veins brings water, and phloem carries away the sugars made. | Transparent epidermis ; Palisade with chloroplasts ; Air spaces in spongy mesophyll ; Stomata and guard cells ; Xylem water and phloem sugars

## Transpiration and translocation
LV: GCSE · Application
S: Roots, stem and leaves form the plant's transport system. This lesson explains how water moves up the plant in the transpiration stream, how sugars move in translocation, and how temperature, humidity, air movement and light intensity affect the rate of transpiration.
O: Describe transpiration and translocation and the structures of xylem, phloem and root hair cells
O: Explain the effect of temperature, humidity, air movement and light intensity on the rate of transpiration
O: Calculate rates of transpiration from potometer results
PRE: Plant tissues and the leaf
PRE: Active transport
H: The plant transport system
P: The **roots, stem and leaves** form a plant organ system for transport. **Root hair cells** absorb water by **osmosis** and mineral ions by **active transport**. **Xylem** is made of hollow tubes strengthened by **lignin**, which carry water and mineral ions from the roots to the stems and leaves.
P: **Transpiration** is the loss of water vapour from the leaves. Water evaporates from mesophyll cells into the air spaces and diffuses out through the stomata. This pulls water up the xylem from the roots in a continuous **transpiration stream**.
P: **Phloem** is made of tubes of elongated cells; cell sap moves from one phloem cell to the next through pores in the end walls. **Translocation** is the movement of dissolved sugars in the phloem from the leaves to the rest of the plant, for immediate use or for storage, for example in roots and fruits. Unlike xylem, phloem can carry substances both up and down.
H: Factors affecting transpiration
- **Temperature**: warmer air increases evaporation and diffusion, so transpiration is faster.
- **Humidity**: humid air already holds water vapour, so the concentration gradient is smaller and transpiration is slower.
- **Air movement**: wind carries water vapour away from the leaf, keeping the gradient steep, so transpiration is faster.
- **Light intensity**: stomata open wider in bright light for photosynthesis, so transpiration is faster.
X: In a potometer, an air bubble moves 30 mm in 10 minutes. The capillary tube has a cross-sectional area of 0.5 mm². Calculate the rate of water uptake.
> Volume taken up = area × distance = 0.5 mm² × 30 mm = 15 mm³.
> Rate = 15 mm³ ÷ 10 min = 1.5 mm³ per minute.
> A potometer measures water uptake, which is close to, but slightly more than, the water lost by transpiration, because some water is used in the plant.
K: Water moves up the xylem in the transpiration stream and is lost through stomata; sugars move in the phloem by translocation; transpiration is faster when it is warm, dry, windy and bright.
!: Mixing up xylem and phloem. Xylem carries water and ions upwards from the roots; phloem carries dissolved sugars from the leaves to where they are used or stored.
EV: established | Transpiration rate increases with temperature, air movement and light intensity and decreases with humidity.
T: Transpiration | The loss of water vapour from the leaves of a plant, which pulls water up through the xylem
T: Translocation | The movement of dissolved sugars through the phloem from the leaves to the rest of the plant
T: Potometer | Apparatus that measures the rate of water uptake by a cut shoot
SUM: Root hairs take in water (osmosis) and ions (active transport); xylem carries them up; transpiration pulls the stream.
SUM: Phloem carries dissolved sugars by translocation.
SUM: Higher temperature, air movement and light increase transpiration; higher humidity decreases it.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.2.3.2 Plant organ system | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 30.5 "Transport of water and solutes in plants" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/30-5-transport-of-water-and-solutes-in-plants
Q: What is translocation? | The movement of dissolved sugars in the phloem from the leaves to the rest of the plant.
Q: Why does humid air slow transpiration? | The air already holds water vapour, so the concentration gradient between leaf and air is smaller.
M1#gcse-u10-14-q1@1: Which tissue transports water from the roots to the leaves? | Xylem | Phloem | Palisade mesophyll | Meristem | Xylem tubes, strengthened by lignin, carry water and mineral ions up the plant; phloem carries sugars.
M2#gcse-u10-14-q2@2: Which conditions give the fastest transpiration? | Warm, dry, windy and bright | Cold, humid, still and dark | Warm, humid, still and dark | Cold, dry, windy and dark | Warmth, low humidity and wind steepen and speed evaporation and diffusion; bright light opens the stomata.
NUM2#gcse-u10-14-q3@3: A potometer bubble moves 24 mm in 8 minutes. What is the rate of movement in mm per minute? | 3 | 0.01 | mm/min | 24 ÷ 8 = 3 mm per minute.
M3#gcse-u10-14-q4@2,3: A ring of bark, including the phloem, is removed from a tree trunk. A swelling forms just above the ring. Why? | Sugars moving down in the phloem build up above the cut | Water moving up in the xylem builds up above the cut | Mineral ions move down in the xylem and collect | Stomata above the ring close, trapping water | Removing the phloem stops translocation of sugars downwards, so they collect above the ring; the xylem, deeper in, still carries water up.
SA3#gcse-u10-14-q5@1,2: Explain how water moves from the soil to the air through a plant, and why transpiration is faster on a warm, windy day. | Water enters root hair cells by osmosis, because the soil water is more dilute than the cell contents. It moves into the xylem, hollow tubes strengthened by lignin, and up the stem to the leaves. In the leaves, water evaporates from mesophyll cells into the air spaces and diffuses out through the stomata; this pulls more water up the xylem (the transpiration stream). On a warm day evaporation and diffusion are faster; wind removes water vapour from around the leaf, keeping the concentration gradient steep. | Osmosis into root hairs ; Up the xylem ; Evaporation and diffusion out of stomata ; Transpiration stream pulls water ; Temperature effect ; Wind keeps gradient steep

## Photosynthesis
LV: GCSE · Foundation
S: Photosynthesis is how plants and algae make glucose using light energy, and it supplies the food and oxygen almost all life depends on. This lesson gives the word and symbol equations, explains why photosynthesis is endothermic and describes how the plant uses the glucose it makes.
O: Write the word equation for photosynthesis and recognise the chemical symbols of the reactants and products
O: Describe photosynthesis as an endothermic reaction in which light energy is transferred to the chloroplasts
O: Describe the ways plants use the glucose produced in photosynthesis
PRE: Plant tissues and the leaf
H: The reaction
E: carbon dioxide + water → glucose + oxygen (light needed) :: CO_{2} + H_{2}O → C_{6}H_{12}O_{6} + O_{2}; the balanced form is 6CO_{2} + 6H_{2}O → C_{6}H_{12}O_{6} + 6O_{2}
P: Photosynthesis is an **endothermic** reaction: energy is transferred from the environment to the **chloroplasts** by light. **Chlorophyll** in the chloroplasts absorbs the light. Carbon dioxide enters the leaf by diffusion through the stomata, and water arrives from the roots in the xylem. Oxygen is released through the stomata as a by-product.
H: Uses of glucose
- Used for **respiration**, to transfer energy.
- Converted into insoluble **starch** for storage (in leaves, roots, seeds and tubers such as potatoes).
- Used to produce **fat or oil** for storage, especially in seeds.
- Used to produce **cellulose**, which strengthens the cell wall.
- Used to produce **amino acids** for protein synthesis; to make proteins, plants also use **nitrate ions** absorbed from the soil.
X: Why do plants store glucose as starch rather than as glucose?
> Glucose is soluble, so storing it would make cell contents more concentrated.
> Water would then enter the cells by osmosis and affect their shape and function.
> Starch is insoluble, so it has no effect on osmosis and can be stored in large amounts.
K: Carbon dioxide + water → glucose + oxygen, using light absorbed by chlorophyll; photosynthesis is endothermic; glucose is used for respiration, starch, fats and oils, cellulose and (with nitrate) amino acids.
!: Thinking plants get their food from the soil. The mass of a plant comes mostly from carbon dioxide and water; the soil supplies water and mineral ions such as nitrate.
EV: established | Photosynthesis uses light energy to make glucose from carbon dioxide and water, releasing oxygen; it is the source of almost all the oxygen in the atmosphere.
T: Photosynthesis | The endothermic reaction in which plants and algae use light energy to make glucose and oxygen from carbon dioxide and water
T: Endothermic | Describes a reaction that takes in energy from the surroundings
T: Chlorophyll | The green pigment in chloroplasts that absorbs light for photosynthesis
SUM: Carbon dioxide + water → glucose + oxygen; light is absorbed by chlorophyll; the reaction is endothermic.
SUM: Glucose is used for respiration, starch, fats and oils, cellulose and amino acids (with nitrate ions).
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.4.1.1 Photosynthetic reaction and 4.4.1.3 Uses of glucose from photosynthesis | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 8.1 "Overview of photosynthesis" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/8-1-overview-of-photosynthesis
Q: What is the chemical symbol for glucose? | C₆H₁₂O₆.
Q: Which ion do plants need from the soil to make amino acids? | Nitrate ions.
M1#gcse-u10-15-q1@1: What are the products of photosynthesis? | Glucose and oxygen | Carbon dioxide and water | Glucose and carbon dioxide | Oxygen and water | Carbon dioxide and water are the reactants; glucose and oxygen are the products.
M2#gcse-u10-15-q2@2: Why is photosynthesis described as endothermic? | Energy is transferred from the environment to the chloroplasts by light | It releases heat energy to the surroundings | It happens only when it is warm | It uses up the plant's stored energy | An endothermic reaction takes in energy; in photosynthesis, the energy comes from light.
MS2#gcse-u10-15-q3@3: Which of these are uses of the glucose made in photosynthesis? | Making cellulose for cell walls ; Converting into starch for storage ; Making amino acids for proteins | Making nitrate ions for the soil ; Making chlorophyll from glucose alone | Glucose is used for respiration, starch, fats and oils, cellulose and amino acids; nitrate comes from the soil, and making chlorophyll needs magnesium ions too.
M3#gcse-u10-15-q4@3: A potato plant's leaves photosynthesise all summer. Why does a potato tuber, which grows underground, contain a lot of starch? | Sugars made in the leaves are moved to the tuber and stored as starch | The tuber photosynthesises using light that passes through the soil | The tuber absorbs starch from the soil | Starch is made from nitrate in the tuber | The tuber cannot photosynthesise; sugars are translocated in the phloem and converted to insoluble starch for storage.
SA2#gcse-u10-15-q5@1,3: Describe what happens in photosynthesis and explain three ways a plant uses the glucose it makes. | Carbon dioxide (from the air, through the stomata) and water (from the roots, through the xylem) react in the chloroplasts, using light energy absorbed by chlorophyll, to make glucose and oxygen; it is endothermic. Glucose is used for respiration to transfer energy; it is converted to insoluble starch for storage, which does not affect osmosis; it is used to make cellulose to strengthen cell walls; it is made into fats or oils for storage; and with nitrate ions it is used to make amino acids for proteins. | Reactants and products ; Light absorbed by chlorophyll in chloroplasts ; Endothermic ; First use explained ; Second use explained ; Third use explained

## The rate of photosynthesis and limiting factors
LV: GCSE · Evaluation
S: The rate of photosynthesis depends on temperature, light intensity, carbon dioxide concentration and the amount of chlorophyll. This lesson explains each factor, how to read limiting factor graphs and, for Higher tier, how factors interact, the inverse square law and the economics of greenhouses.
O: Explain the effects of temperature, light intensity, carbon dioxide concentration and the amount of chlorophyll on the rate of photosynthesis
O: Measure and calculate rates of photosynthesis and interpret graphs with one limiting factor
O: (Higher tier) Identify the limiting factor on graphs with two or three factors, use the inverse square law and relate limiting factors to greenhouse economics
PRE: Photosynthesis
PRE: Tolerance ranges and limiting factors
H: The four factors
- **Light intensity**: more light gives a faster rate, until another factor limits it.
- **Carbon dioxide concentration**: more carbon dioxide gives a faster rate, until another factor limits it.
- **Temperature**: the rate rises to an optimum, because enzymes control photosynthesis; at high temperatures the enzymes denature and the rate falls.
- **Amount of chlorophyll**: leaves with less chlorophyll, for example from magnesium deficiency or disease, absorb less light and photosynthesise more slowly.
P: A **limiting factor** is the factor in shortest supply that stops the rate increasing. On a graph of rate against light intensity, the rising part of the line shows light is limiting; where the line levels off, something else (carbon dioxide or temperature) has become limiting.
H: Measuring the rate
P: The rate can be measured as the volume of oxygen produced per minute, or the number of bubbles per minute from pondweed (Required practical 5). Rate = amount of oxygen ÷ time.
X: Pondweed releases 12 cm³ of oxygen in 4 minutes. What is the rate?
> Rate = 12 cm³ ÷ 4 min = 3 cm³ per minute.
H: Higher tier: interacting factors, light and greenhouses
P: **Higher tier.** The factors interact, and any one of them may be the limiting factor. If a graph shows two lines, for example at 0.04% and 0.1% carbon dioxide, the levelled-off parts are at different heights: on the plateau of the lower line, carbon dioxide is limiting, because raising it raises the rate.
E: light intensity ∝ 1 ÷ distance² :: (Higher tier) the inverse square law: halving the distance from the lamp makes the light four times as intense
P: **Higher tier.** Growers can add heat, light or carbon dioxide (from paraffin heaters) to greenhouses to speed photosynthesis. Adding a factor is only worthwhile if it is the limiting one and the extra crop earns more than it costs.
X: Higher tier. A lamp is moved from 20 cm to 10 cm from a plant. By what factor does the light intensity change?
> Intensity ∝ 1 ÷ d²: at 20 cm, 1 ÷ 400; at 10 cm, 1 ÷ 100.
> 400 ÷ 100 = 4, so the light is four times as intense.
K: The rate of photosynthesis is limited by whichever of light intensity, carbon dioxide concentration and temperature is in shortest supply, and by the amount of chlorophyll; adding more of a non-limiting factor has no effect.
!: Saying "light is the limiting factor" on the flat part of a light intensity graph. Where the line is flat, light is no longer limiting: something else is.
EV: established | The rate of photosynthesis is limited by light intensity, carbon dioxide concentration or temperature, and the limiting factor can change through the day.
T: Limiting factor | The factor in shortest supply that stops the rate of a process increasing
T: Inverse square law | (Higher tier) light intensity is inversely proportional to the square of the distance from the light source
SUM: Light intensity, carbon dioxide concentration and temperature limit the rate; chlorophyll also matters.
SUM: Rising line: that factor limits; flat line: another factor limits.
SUM: Higher tier: factors interact; intensity ∝ 1 ÷ d²; greenhouse additions must pay for themselves.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.4.1.2 Rate of photosynthesis | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 8.3 "Using light energy to make organic molecules" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/8-3-using-light-energy-to-make-organic-molecules
Q: Name the three main limiting factors of photosynthesis. | Light intensity, carbon dioxide concentration and temperature.
Q: Why does the rate of photosynthesis fall at high temperatures? | The enzymes that control photosynthesis denature.
M1#gcse-u10-16-q1@1: Which change would speed up photosynthesis in a plant in dim light with plenty of carbon dioxide? | Increasing the light intensity | Adding more carbon dioxide | Removing the plant's chlorophyll | Cooling the plant to 5 °C | In dim light, light intensity is the limiting factor, so more light raises the rate.
NUM2#gcse-u10-16-q2@2: Pondweed produces 45 bubbles in 3 minutes. What is the rate in bubbles per minute? | 15 | 0.01 | bubbles/min | 45 ÷ 3 = 15 bubbles per minute.
M2#gcse-u10-16-q3@2: On a graph of rate against light intensity, the line rises and then levels off. What does the level part show? | A factor other than light, such as carbon dioxide, is limiting | Light intensity is still the limiting factor | The plant has stopped photosynthesising | The enzymes have all denatured | Increasing light no longer raises the rate, so something else, such as carbon dioxide or temperature, is now in short supply.
M3#gcse-u10-16-q4@3: Higher tier. A lamp is moved from 30 cm to 15 cm from pondweed. If light is limiting, how does the light intensity change? | It becomes four times as great | It doubles | It halves | It is unchanged | By the inverse square law, halving the distance gives 2² = 4 times the intensity.
SA3#gcse-u10-16-q5@1,3: A grower wants to increase tomato yield in a greenhouse in winter. Evaluate whether adding carbon dioxide, heating or extra lighting is the best option. | In winter, light intensity and temperature are often low, so either could be limiting. Adding carbon dioxide will only increase the rate if carbon dioxide is the limiting factor; if light or temperature is limiting, the extra carbon dioxide is wasted money. The grower should find which factor limits the rate, for example by measuring the rate with each factor increased. Paraffin heaters can raise both temperature and carbon dioxide. The best choice gives the largest increase in yield for the lowest cost, so profit is maintained. | Identifies likely limiting factors ; Only the limiting factor increases rate ; Interaction of factors ; Cost against extra yield ; Reasoned judgement

## Aerobic and anaerobic respiration
LV: GCSE · Application
S: Respiration transfers the energy every living cell needs, all the time. This lesson compares aerobic respiration with anaerobic respiration in muscles and in plants and yeast, and explains why fermentation matters for bread and drinks.
O: Describe cellular respiration as an exothermic reaction and state what organisms need energy for
O: Write the word equations for aerobic respiration and for anaerobic respiration in muscles and in plant and yeast cells
O: Compare aerobic and anaerobic respiration in terms of oxygen, products and the amount of energy transferred
PRE: Animal and plant cells
PRE: Photosynthesis
H: Why respiration matters
P: **Cellular respiration** is an **exothermic** reaction that happens continuously in living cells. The energy transferred supplies all the energy needed for living processes. Organisms need energy for:
- chemical reactions to build larger molecules;
- movement;
- keeping warm.
H: Aerobic and anaerobic
E: glucose + oxygen → carbon dioxide + water :: aerobic respiration, in mitochondria: C_{6}H_{12}O_{6} + 6O_{2} → 6CO_{2} + 6H_{2}O
E: glucose → lactic acid :: anaerobic respiration in muscles
E: glucose → ethanol + carbon dioxide :: anaerobic respiration in plant and yeast cells; in yeast it is called fermentation
P: In anaerobic respiration the oxidation of glucose is **incomplete**, so much less energy is transferred than in aerobic respiration. Fermentation by yeast is economically important: the carbon dioxide makes bread rise, and the ethanol is the alcohol in beer and wine.
X: Compare aerobic respiration with anaerobic respiration in yeast.
> Oxygen: aerobic needs it; anaerobic does not.
> Products: aerobic gives carbon dioxide and water; anaerobic gives ethanol and carbon dioxide.
> Energy: aerobic transfers much more energy per glucose, because glucose is fully oxidised.
K: Aerobic respiration (glucose + oxygen → carbon dioxide + water) transfers much more energy than anaerobic respiration, which makes lactic acid in muscles or ethanol and carbon dioxide in yeast and plants.
!: Saying respiration "makes energy". Energy cannot be made; respiration transfers energy from glucose to the cell's processes.
!: Confusing respiration with breathing. Breathing moves air in and out of the lungs; respiration is a chemical reaction in every cell.
EV: established | Aerobic respiration transfers far more energy per molecule of glucose than anaerobic respiration, because glucose is fully oxidised to carbon dioxide and water.
T: Aerobic respiration | Respiration using oxygen: glucose + oxygen → carbon dioxide + water
T: Anaerobic respiration | Respiration without oxygen, which transfers less energy; it makes lactic acid in muscles or ethanol and carbon dioxide in yeast and plants
T: Fermentation | Anaerobic respiration in yeast, producing ethanol and carbon dioxide
SUM: Respiration is exothermic and continuous; energy is used for building molecules, movement and keeping warm.
SUM: Aerobic: glucose + oxygen → carbon dioxide + water; anaerobic: glucose → lactic acid (muscles) or ethanol + carbon dioxide (yeast, plants).
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.4.2.1 Aerobic and anaerobic respiration | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 7.5 "Metabolism without oxygen" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/7-5-metabolism-without-oxygen
Q: What are the products of anaerobic respiration in muscles? | Lactic acid.
Q: Why does yeast make bread rise? | Fermentation produces carbon dioxide gas, which forms bubbles in the dough.
M1#gcse-u10-17-q1@2: What are the products of aerobic respiration? | Carbon dioxide and water | Glucose and oxygen | Lactic acid only | Ethanol and carbon dioxide | Glucose and oxygen are the reactants; carbon dioxide and water are the products.
M2#gcse-u10-17-q2@3: Why does anaerobic respiration transfer less energy than aerobic respiration? | The oxidation of glucose is incomplete | It uses more glucose | It happens only in yeast | It releases more heat | Lactic acid and ethanol still contain much of the energy that was in the glucose.
TF1#gcse-u10-17-q3@1: Respiration is an exothermic reaction. | true | Respiration transfers energy to the surroundings, so it is exothermic; photosynthesis is endothermic.
M3#gcse-u10-17-q4@2,3: A sealed jar of yeast and sugar solution is left in a warm room. Which observation shows anaerobic respiration? | Bubbles of carbon dioxide and a smell of alcohol | The solution turning blue-black | Oxygen gas collecting at the top | The sugar concentration increasing | In a sealed jar oxygen runs out; fermentation then produces ethanol and carbon dioxide.
SA3#gcse-u10-17-q5@2,3: Compare aerobic respiration in a human muscle with anaerobic respiration in yeast. | Aerobic respiration in muscle uses glucose and oxygen and produces carbon dioxide and water; it happens in mitochondria. Anaerobic respiration in yeast (fermentation) does not need oxygen and produces ethanol and carbon dioxide. Both are exothermic and transfer energy for living processes, but aerobic respiration transfers much more energy because the oxidation of glucose is complete; in fermentation it is incomplete. | Aerobic equation ; Fermentation equation ; Oxygen needed only for aerobic ; Both transfer energy and are exothermic ; Aerobic transfers more energy ; Incomplete oxidation explanation

## Respiration and exercise
LV: GCSE · Application
S: When you exercise, your muscles need more energy, and your body responds. This lesson explains the changes in heart rate, breathing rate and breath volume, why muscles respire anaerobically and become fatigued, and, for Higher tier, how the oxygen debt is repaid.
O: Describe and explain how heart rate, breathing rate and breath volume change during exercise
O: Explain how lactic acid builds up and causes an oxygen debt and muscle fatigue
O: (Higher tier) Explain how lactic acid is removed after exercise and define oxygen debt
PRE: Aerobic and anaerobic respiration
PRE: The heart
H: The response to exercise
P: During exercise the body reacts to the increased demand for energy. **Heart rate**, **breathing rate** and **breath volume** increase, to supply the muscles with more oxygenated blood and remove carbon dioxide faster.
P: If insufficient oxygen is supplied, **anaerobic respiration** takes place in muscles. The incomplete oxidation of glucose causes a build-up of **lactic acid** and creates an **oxygen debt**. During long periods of vigorous activity, muscles become **fatigued** and stop contracting efficiently.
X: A student's breathing rate is 14 breaths per minute at rest and 35 after a run. By what percentage did it increase?
> Increase = 35 − 14 = 21 breaths per minute.
> Percentage increase = 21 ÷ 14 × 100 = 150%.
H: Higher tier: repaying the oxygen debt
P: **Higher tier.** Blood flowing through the muscles transports the lactic acid to the **liver**, where it is converted back into glucose. The **oxygen debt** is the amount of extra oxygen the body needs after exercise to react with the accumulated lactic acid and remove it from the cells. That is why you keep breathing hard after you stop.
K: Exercise raises heart rate, breathing rate and breath volume to deliver more oxygen; when oxygen is short, muscles respire anaerobically, lactic acid builds up and an oxygen debt forms, repaid after exercise (Higher tier: lactic acid is converted to glucose in the liver).
!: Saying lactic acid is "breathed out". Lactic acid is carried in the blood to the liver; it is the oxygen debt that is repaid by heavy breathing.
EV: established | During intense exercise muscles produce lactic acid by anaerobic respiration, and extra oxygen is consumed after exercise to remove it.
EV: contested | Lactic acid build-up is part, but not all, of the explanation for muscle fatigue; sports scientists continue to study the other causes.
T: Oxygen debt | The extra oxygen the body needs after exercise to react with accumulated lactic acid and remove it from cells
T: Muscle fatigue | When muscles stop contracting efficiently after long periods of vigorous activity
SUM: In exercise, heart rate, breathing rate and breath volume increase to deliver oxygen.
SUM: Too little oxygen means anaerobic respiration, lactic acid, an oxygen debt and fatigue.
SUM: Higher tier: lactic acid goes to the liver to be converted back into glucose.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.4.2.2 Response to exercise | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 7.5 "Metabolism without oxygen" (lactic acid fermentation) | secondary | 2018 | https://openstax.org/books/biology-2e/pages/7-5-metabolism-without-oxygen
Q: What three changes happen to breathing and the heart during exercise? | Heart rate, breathing rate and breath volume all increase.
Q: Why do muscles become fatigued during long vigorous exercise? | Anaerobic respiration builds up lactic acid, and the muscles stop contracting efficiently.
M1#gcse-u10-18-q1@1: Why does heart rate increase during exercise? | To supply the muscles with more oxygenated blood | To cool the body down | To make more lactic acid | To slow down respiration | More blood flow delivers more oxygen and glucose to the respiring muscles and removes carbon dioxide.
NUM2#gcse-u10-18-q2@1: Heart rate rises from 70 to 140 beats per minute during a sprint. What is the percentage increase? | 100 | 0.1 | % | (140 − 70) ÷ 70 × 100 = 100%.
M2#gcse-u10-18-q3@2: A sprinter runs 100 m and keeps panting for several minutes afterwards. Why? | Extra oxygen is needed to remove the lactic acid that built up | The lungs need to remove the glucose that was not used | Breathing hard repairs damaged muscle fibres | The heart has stopped pumping for a short time | The oxygen debt from anaerobic respiration is repaid after exercise by continued heavy breathing.
M3#gcse-u10-18-q4@3: Higher tier. What happens to lactic acid after exercise? | It is carried in the blood to the liver and converted back into glucose | It is breathed out of the lungs as a gas | It stays in the muscles until the next exercise | It is converted into carbon dioxide in the stomach | Blood carries lactic acid to the liver, where oxygen is used to convert it back into glucose.
SA3#gcse-u10-18-q5@1,2,3: Explain the changes in the body during and after a hard 400 m race. | During the race the muscles need more energy, so heart rate, breathing rate and breath volume increase to supply more oxygenated blood. The demand is so high that not enough oxygen arrives, so muscles also respire anaerobically, producing lactic acid. Lactic acid builds up, creating an oxygen debt, and the muscles become fatigued. After the race, breathing and heart rate stay high. (Higher tier) Blood carries the lactic acid to the liver, where it is converted back to glucose; the oxygen debt is the extra oxygen needed to react with the lactic acid and remove it. | Heart rate, breathing rate and volume increase ; More oxygen to muscles ; Anaerobic respiration and lactic acid ; Oxygen debt and fatigue ; Breathing stays high after ; Liver converts lactic acid (Higher tier)

## Metabolism
LV: GCSE · Evaluation
S: Metabolism is the sum of all the reactions in a cell or the body. This lesson links photosynthesis, respiration and digestion together by showing how sugars, amino acids, fatty acids and glycerol are used to build and break down carbohydrates, proteins and lipids.
O: Define metabolism and explain how energy from respiration is used for enzyme-controlled synthesis
O: Explain the importance of sugars, amino acids, fatty acids and glycerol in the synthesis and breakdown of carbohydrates, proteins and lipids
O: Apply knowledge of metabolism to link reactions in different organs and organisms
PRE: Aerobic and anaerobic respiration
PRE: Digestive enzymes and bile
H: What metabolism is
P: **Metabolism** is the sum of all the reactions in a cell or the body. The energy transferred by respiration in cells is used by the organism for the continual **enzyme-controlled** processes of metabolism that **synthesise** (build) new molecules. Some reactions build large molecules from small ones; others break large molecules down.
H: Metabolic reactions AQA requires
- Conversion of **glucose** to **starch**, **glycogen** and **cellulose**.
- Formation of **lipid** molecules from a molecule of **glycerol** and **three molecules of fatty acids**.
- Use of glucose and **nitrate ions** to form **amino acids**, which in turn are used to synthesise **proteins**.
- **Respiration**.
- Breakdown of excess **proteins** to form **urea** for excretion.
P: These reactions are linked: the glucose made in photosynthesis, or absorbed after digestion, can be respired for energy, stored as starch or glycogen, or combined with other molecules to make lipids and amino acids. Every step is catalysed by a specific enzyme.
X: Trace a carbon atom from the air into a protein in a cow's muscle.
> A grass plant takes in carbon dioxide and makes glucose by photosynthesis.
> The plant uses glucose and nitrate ions from the soil to make amino acids, then proteins.
> The cow eats the grass; proteases digest the proteins into amino acids, which are absorbed into the blood.
> Muscle cells join the amino acids into new proteins, using energy from respiration.
K: Metabolism is every reaction in a cell or body; respiration supplies the energy for enzymes to build starch, glycogen, cellulose, lipids and proteins, and to break down excess protein into urea.
!: Thinking glucose and starch are the same thing. Glucose is a small soluble sugar; starch, glycogen and cellulose are large molecules built from many glucose units.
EV: established | Metabolic pathways are linked: the same small molecules (sugars, amino acids, fatty acids and glycerol) are used to build and are produced by breaking down larger molecules.
T: Metabolism | The sum of all the reactions in a cell or the body
T: Glycogen | A storage carbohydrate made from glucose in animals, mainly in the liver and muscles
T: Urea | A waste product made from the breakdown of excess proteins, excreted by the kidneys
SUM: Metabolism is the sum of all reactions; respiration supplies the energy for enzyme-controlled synthesis.
SUM: Glucose makes starch, glycogen and cellulose; glycerol and three fatty acids make a lipid; glucose and nitrate make amino acids and proteins; excess protein makes urea.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.4.2.3 Metabolism | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 6.1 "Energy and metabolism" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/6-1-energy-and-metabolism
Q: What is a lipid molecule made from? | One molecule of glycerol and three molecules of fatty acids.
Q: What is excess protein broken down to form? | Urea, which is excreted.
M1#gcse-u10-19-q1@1: What is metabolism? | The sum of all the reactions in a cell or the body | Only the reactions of digestion | Only the breakdown of glucose in respiration | The rate at which the heart beats | Metabolism includes every building-up and breaking-down reaction, all controlled by enzymes.
M2#gcse-u10-19-q2@2: Which molecules are joined to make a protein? | Amino acids | Fatty acids | Glucose molecules | Glycerol molecules | Proteins are synthesised from amino acids; glucose builds carbohydrates, and glycerol and fatty acids build lipids.
MATCH2#gcse-u10-19-q3@2: Match each large molecule to the small molecules it is built from. | Starch = Glucose ; Protein = Amino acids ; Lipid = Glycerol and fatty acids ; Cellulose = Glucose | Carbohydrates are built from sugars, proteins from amino acids and lipids from glycerol and fatty acids.
M3#gcse-u10-19-q4@2,3: A plant is grown in soil with no nitrate. Which process will be affected most directly? | Making amino acids and proteins | Making starch from glucose | Making cellulose for cell walls | Absorbing water by osmosis | Plants combine glucose with nitrate ions to make amino acids, so protein synthesis and growth slow down.
SA3#gcse-u10-19-q5@2,3: Explain how a seed uses its stored starch, oil and protein when it germinates, linking each to metabolism. | Enzymes break down stored starch into glucose, which is used in respiration to transfer energy for growth and can be rebuilt into cellulose for new cell walls. Oils (lipids) are broken down into glycerol and fatty acids, which can be respired or used to build new membranes. Stored proteins are broken down into amino acids, which are used to synthesise new proteins such as enzymes. All these reactions are enzyme controlled, and the energy for synthesis comes from respiration. | Starch to glucose ; Glucose for respiration or cellulose ; Lipids to glycerol and fatty acids ; Proteins to amino acids then new proteins ; Enzyme-controlled ; Energy from respiration

## Coronary heart disease and its treatment
LV: GCSE · Application
S: Coronary heart disease is a non-communicable disease in which fatty material narrows the arteries that supply the heart muscle. This lesson explains how it starts, how it is treated with stents and statins, what happens when heart valves fail, and when a transplant or artificial heart is used.
O: Explain how fatty material in the coronary arteries reduces the oxygen supply to heart muscle
O: Describe how stents, statins, replacement valves, transplants and artificial hearts are used to treat heart disease
O: Evaluate the advantages and disadvantages of treating cardiovascular disease by drugs, mechanical devices or transplant
PRE: The heart
PRE: Blood vessels and blood pressure
H: What goes wrong in coronary heart disease
P: The **coronary arteries** branch off the aorta and supply the heart muscle itself with oxygenated blood. In **coronary heart disease (CHD)**, layers of fatty material build up inside the coronary arteries, narrowing them. This reduces the flow of blood through them, so the heart muscle gets too little oxygen. It can cause chest pain and, if an artery is blocked completely, a heart attack, where part of the heart muscle dies.
H: Treatments for narrowed arteries
- **Stents** are small mesh tubes inserted into a narrowed coronary artery to hold it open, so blood can flow to the heart muscle again. They work quickly and the operation is less serious than open-heart surgery, but there is a risk of infection, of blood clots forming at the stent, and of the artery narrowing again.
- **Statins** are drugs that reduce blood **cholesterol** levels, which slows down the rate at which fatty material is deposited in arteries. They are taken by mouth and reduce the risk of heart attacks and strokes, but must be taken long-term, take time to work and can have side effects such as muscle pain.
H: Faulty valves, heart failure and transplants
P: In some people a **heart valve** becomes faulty: it may not open fully, or it may develop a leak. Blood then flows less efficiently in the right direction, or leaks backwards, so the heart has to work harder and the person may become tired and breathless. Faulty valves can be replaced with **biological valves** (from animals, such as pigs or cows, or from human donors) or **mechanical valves** (made from metal or carbon). Mechanical valves last longer, but the patient needs anticoagulant drugs for life to stop clots forming on them; biological valves don't usually need these drugs but wear out sooner.
P: In **heart failure**, the heart cannot pump enough blood for the body's needs. A **donor heart**, or a heart and lungs, can be **transplanted**. Donor organs are in short supply, the patient must take drugs that suppress the immune system for the rest of their life to stop **rejection**, and major surgery carries risks. **Artificial hearts** are occasionally used to keep patients alive while they wait for a transplant, or to let the heart rest as an aid to recovery; they are not rejected, but they need a power supply and carry a risk of blood clots and infection.
X: A patient has one narrowed coronary artery and high blood cholesterol. Compare a stent with statins.
> Stent: opens the artery straight away and restores blood flow, but needs a surgical procedure with a small risk of clots or infection.
> Statins: no surgery, and slow further fatty deposits throughout the body, but act slowly and must be taken every day.
> Conclusion: doctors often use both, a stent to restore flow now and statins to reduce future risk.
K: CHD is fatty material narrowing the coronary arteries; stents hold arteries open, statins lower cholesterol, faulty valves are replaced with biological or mechanical valves, and heart failure may need a transplant or, for a time, an artificial heart.
!: Saying statins "unblock" arteries. Statins lower blood cholesterol and slow the build-up of fatty material; a stent is what holds a narrowed artery open.
EV: established | Lowering blood cholesterol with statins reduces the risk of heart attacks and strokes in people at raised risk.
T: Coronary heart disease | A non-communicable disease in which fatty material narrows the coronary arteries, reducing the oxygen supply to heart muscle
T: Stent | A mesh tube inserted into an artery to keep it open
T: Statin | A drug that reduces blood cholesterol and slows the deposit of fatty material in arteries
T: Rejection | Attack by the recipient's immune system on a transplanted organ it recognises as foreign
SUM: In CHD, fatty material narrows the coronary arteries and starves heart muscle of oxygen.
SUM: Stents keep arteries open; statins lower cholesterol and slow fatty deposits.
SUM: Faulty valves are replaced with biological or mechanical valves; heart failure may be treated by transplant or an artificial heart.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.2.2.4 Coronary heart disease: a non-communicable disease | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Betts J. G. et al., Anatomy and Physiology 2e, OpenStax, section 19.1 "Heart anatomy" (coronary artery disease, stents and valve disorders) | secondary | 2022 | https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy
Q: What is a stent used for? | To hold a narrowed coronary artery open so that blood can flow to the heart muscle.
Q: How do statins help people with coronary heart disease? | They reduce blood cholesterol, which slows the rate at which fatty material is deposited in arteries.
Q: Give one disadvantage of a mechanical heart valve. | The patient must take anticoagulant drugs for life to prevent blood clots forming on the valve.
M1#gcse-u10-20-q1@1: Why does coronary heart disease cause a lack of oxygen for the heart muscle? | Fatty material narrows the coronary arteries, reducing blood flow | The heart valves stop opening | The lungs stop absorbing oxygen | Red blood cells lose their haemoglobin | Narrowed coronary arteries carry less blood, so less oxygen reaches the heart muscle.
M2#gcse-u10-20-q2@2: A doctor wants to lower a patient's blood cholesterol to slow the build-up of fatty material. What should be prescribed? | A statin | A stent | A mechanical valve | An artificial pacemaker | Statins are drugs that lower blood cholesterol; stents and valves are devices, and pacemakers correct heart rhythm.
M2#gcse-u10-20-q3@2: Which problem is caused by a heart valve that leaks? | Blood flows backwards, so the heart must work harder | Blood cholesterol rises sharply | The coronary arteries become blocked | The pacemaker cells stop working | A leaking valve lets blood flow back the wrong way, reducing the efficiency of each beat.
M3#gcse-u10-20-q4@3: Why must a heart transplant patient take drugs for the rest of their life? | To stop the immune system rejecting the donor heart | To lower blood cholesterol after surgery | To keep the coronary arteries open | To make the new heart beat faster | The immune system recognises the donor heart as foreign, so immunosuppressant drugs are needed to prevent rejection.
SA3#gcse-u10-20-q5@2,3: Evaluate the use of drugs, mechanical devices and transplants to treat cardiovascular disease. | Drugs such as statins need no surgery and reduce the risk of heart attack, but act slowly, must be taken long-term and can have side effects. Stents open an artery quickly with a minor procedure, but carry a risk of clots, infection and re-narrowing. Mechanical valves last a long time but need lifelong anticoagulants; biological valves need no anticoagulants but wear out. Transplants can treat heart failure, but donors are scarce, surgery is major and lifelong immunosuppressants are needed; artificial hearts can bridge the wait but need power and risk clots. The best choice depends on the problem and the patient. | Statins: advantage and disadvantage ; Stents: advantage and disadvantage ; Valves: mechanical versus biological ; Transplant: donor shortage or rejection ; Artificial heart as a bridge ; Balanced judgement

## Health issues and interacting diseases
LV: GCSE · Foundation
S: Health is more than not being ill. This lesson defines health, distinguishes communicable from non-communicable diseases, shows how different diseases can interact, and practises reading disease data in tables, charts and scatter graphs.
O: Describe the relationship between health and disease, including the effect of diet, stress and life situations
O: Explain how different types of disease may interact, with examples
O: Translate disease information between graphs and numbers, and explain the principles of sampling in epidemiology
PRE: What is health?
PRE: Pathogens and the spread of disease
H: Health and disease
P: **Health** is the state of physical and mental well-being. **Diseases**, both **communicable** (caused by pathogens and able to spread between people, such as measles) and **non-communicable** (not passed from person to person, such as coronary heart disease), are major causes of ill health. Other factors, including **diet**, **stress** and **life situations** such as housing, work or money worries, can have a profound effect on both physical and mental health.
H: How diseases interact
- **Defects in the immune system** mean a person is more likely to suffer from infectious diseases; for example, people with untreated HIV become ill with infections a healthy immune system would control.
- **Viruses living in cells** can trigger cancers; for example, some types of human papillomavirus (HPV) can cause cervical cancer.
- **Immune reactions** first caused by a pathogen can trigger **allergies** such as skin rashes and asthma.
- **Severe physical ill health** can lead to **depression** and other mental illness.
H: Working with disease data
P: **Epidemiology** is the study of patterns of disease in populations. Researchers can't study everyone, so they study a **sample**. A good sample is **large** and **representative** (similar in age, sex and background to the population), and chosen **randomly**, so the results can be applied to the whole population. A small or unrepresentative sample may give a misleading result by chance.
P: You need to move data between forms: a frequency table can be drawn as a bar chart (separate categories) or a histogram (continuous data, such as age groups), and a **scatter diagram** of two variables shows whether there is a **correlation** between them.
X: In a survey of 400 people (invented data for practice), 60 had asthma. What percentage is this, and how would you show asthma cases in each age group?
> Percentage = 60 ÷ 400 × 100 = 15%.
> Age is continuous data in groups, so the cases in each age group are best shown as a histogram.
K: Health is physical and mental well-being; communicable and non-communicable diseases, diet, stress and life situations all affect it, and one disease can make another more likely.
!: Thinking communicable and non-communicable diseases are unrelated. A virus (communicable) can trigger a cancer (non-communicable), and a pathogen can trigger an allergy.
EV: established | Some cancers, including most cervical cancers, are caused by persistent infection with high-risk types of human papillomavirus.
T: Communicable disease | A disease caused by a pathogen that can spread between people or animals
T: Non-communicable disease | A disease that is not passed from one person to another, such as coronary heart disease or most cancers
T: Epidemiology | The study of the patterns and causes of disease in populations
SUM: Health is physical and mental well-being, affected by disease, diet, stress and life situations.
SUM: Diseases interact: immune defects, cancer-causing viruses, allergies and depression after physical illness.
SUM: Epidemiological samples should be large, random and representative.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.2.2.5 Health issues | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 42.4 "Disruptions in the immune system" (immunodeficiency and allergies) | secondary | 2018 | https://openstax.org/books/biology-2e/pages/42-4-disruptions-in-the-immune-system
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 21.2 "Virus infections and hosts" (oncogenic viruses) | secondary | 2018 | https://openstax.org/books/biology-2e/pages/21-2-virus-infections-and-hosts
Q: What is health? | The state of physical and mental well-being.
Q: Give one example of a virus triggering a cancer. | Some types of human papillomavirus (HPV) can cause cervical cancer.
M1#gcse-u10-21-q1@1: Which is a non-communicable disease? | Coronary heart disease | Measles | Malaria | Salmonella food poisoning | Coronary heart disease is not caused by a pathogen and can't be passed between people.
M2#gcse-u10-21-q2@2: A person with an immune system defect keeps catching infections. Which explains this? | Their body is less able to destroy pathogens | Their pathogens are a different type | Infections cause immune defects in everyone | They have too many white blood cells | A defective immune system can't fight off pathogens as well, so infectious diseases are more likely.
NUM2#gcse-u10-21-q3@3: In a sample of 250 people, 35 have type 2 diabetes. What percentage is this? | 14 | 0.1 | % | 35 ÷ 250 × 100 = 14%.
M3#gcse-u10-21-q4@3: A study of diet and heart disease uses 20 volunteers from one gym. Why is its conclusion unreliable? | The sample is too small and not representative of the population | The sample is too large to analyse | Volunteers always give false answers | Heart disease can't be studied in samples | A small, non-random sample of gym users may differ from the population, so the result may not apply generally.
SA2#gcse-u10-21-q5@1,2: Explain, with examples, how different types of disease can interact. | An immune system defect, such as untreated HIV, makes infectious diseases more likely. Viruses living in cells can trigger cancer, such as HPV and cervical cancer. An immune reaction first caused by a pathogen can trigger an allergy such as a skin rash or asthma. Severe physical ill health can lead to depression or other mental illness. | Immune defect and infection ; Virus triggering cancer ; Pathogen triggering allergy ; Physical illness and depression ; Named examples

## Lifestyle, risk factors and non-communicable disease
LV: GCSE · Evaluation
S: A risk factor is linked to an increased rate of a disease. This lesson sets out the risk factors AQA names for cardiovascular disease, type 2 diabetes, liver and brain damage, lung disease, unborn babies and cancer, explains why correlation is not the same as causation, and discusses the human and financial cost of non-communicable disease.
O: Describe risk factors as aspects of lifestyle or substances in the body or environment, with the named examples
O: Distinguish a correlation from a proven causal mechanism, using scatter diagrams and data about risk factors
O: Discuss the human and financial cost of non-communicable diseases to individuals, communities, nations and the world
PRE: Health issues and interacting diseases
PRE: Coronary heart disease and its treatment
H: Risk factors
P: A **risk factor** is linked to an increased rate of a disease. Risk factors can be **aspects of a person's lifestyle** (such as diet, smoking or exercise) or **substances in the person's body or environment** (such as cholesterol in the blood or asbestos in the air). A **causal mechanism** has been proven for some risk factors, but not for others. Many diseases are caused by the **interaction of several factors**.
- **Diet, smoking and exercise** affect cardiovascular disease: a diet high in saturated fat raises blood cholesterol, smoking damages artery walls and raises blood pressure, and regular exercise lowers the risk.
- **Obesity** is a risk factor for **type 2 diabetes**.
- **Alcohol** damages the **liver** (for example cirrhosis) and affects **brain function**.
- **Smoking** causes **lung disease** (such as chronic obstructive pulmonary disease) and **lung cancer**.
- **Smoking and alcohol** harm **unborn babies**: smoking reduces the oxygen reaching the fetus and is linked to low birth weight; alcohol can cause fetal alcohol spectrum disorder.
- **Carcinogens**, including **ionising radiation**, are risk factors for **cancer**.
H: Correlation and causation
P: A **scatter diagram** shows whether two variables are **correlated**: as one increases, the other tends to increase (positive correlation) or decrease (negative correlation). A correlation alone does not prove that one causes the other: a third factor may cause both, or the link may be chance. Scientists accept a cause when there is a **plausible mechanism** and the link is found consistently in large, well-designed studies, as for smoking and lung cancer, where carcinogens in tobacco smoke damage the DNA of lung cells.
X: A scatter diagram of invented data shows that towns with more fast-food outlets have higher rates of type 2 diabetes. Does fast food cause diabetes?
> The diagram shows a positive correlation, not a cause.
> Other factors could explain it: income, age, exercise or obesity rates may differ between the towns.
> To test a cause, researchers would study individuals, control for other factors and look for a mechanism (here, energy-rich food leading to obesity, a known risk factor).
H: The cost of non-communicable disease
P: For an **individual**, a non-communicable disease can mean pain, disability, loss of work and income, and a shorter life. For a **local community and family**, it can mean caring responsibilities and lost earnings. For a **nation**, it means the cost of health care and treatment and lost working days. **Globally**, non-communicable diseases are the leading cause of death, and lifestyle factors such as diet, alcohol and smoking change how common they are at local, national and global levels; in many lower-income countries their rates are rising as diets and lifestyles change.
K: Risk factors are lifestyle aspects or substances linked to higher disease rates; a correlation is not proof of cause, which needs a mechanism and consistent evidence; non-communicable diseases carry human and financial costs at every scale.
!: Saying "a correlation proves a cause". It shows only that two variables change together; a third factor or chance may explain it.
EV: established | Smoking causes lung cancer: the link is consistent across large studies and carcinogens in tobacco smoke damage DNA.
EV: established | Obesity increases the risk of type 2 diabetes.
T: Risk factor | Something linked to an increased rate of a disease, such as a lifestyle aspect or a substance in the body or environment
T: Correlation | A relationship in which two variables change together; it does not by itself show cause
T: Causal mechanism | The process by which a factor actually brings about a disease
T: Carcinogen | A substance or agent, such as ionising radiation, that can cause cancer
SUM: Risk factors are aspects of lifestyle or substances in the body or environment; many diseases have several interacting causes.
SUM: AQA examples: diet, smoking and exercise (heart disease), obesity (type 2 diabetes), alcohol (liver and brain), smoking (lungs), smoking and alcohol (unborn babies), carcinogens (cancer).
SUM: A correlation on a scatter diagram is not proof of cause.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.2.2.6 The effect of lifestyle on some non-communicable diseases | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.3 "Analyzing findings" (correlation does not indicate causation) | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-3-analyzing-findings
Q: What is a risk factor? | Something linked to an increased rate of a disease: an aspect of lifestyle or a substance in the body or environment.
Q: Which risk factor does AQA link to type 2 diabetes? | Obesity.
Q: Why doesn't a correlation prove a cause? | A third factor or chance could explain why the two variables change together.
M1#gcse-u10-22-q1@1: Which is a risk factor for lung cancer? | Smoking | Eating oily fish | Regular exercise | Drinking water | Carcinogens in tobacco smoke damage the DNA of lung cells.
MATCH2#gcse-u10-22-q2@1: Match each risk factor to the disease or harm AQA links it with. | Obesity = Type 2 diabetes ; Alcohol = Liver damage ; Ionising radiation = Cancer ; Smoking in pregnancy = Low birth weight | Each risk factor raises the rate of a particular non-communicable disease or harm.
M2#gcse-u10-22-q3@2: A scatter diagram shows that people who drink more coffee have more heart disease. What can you conclude? | There is a correlation, but coffee may not be the cause | Coffee definitely causes heart disease | Heart disease makes people drink coffee | There is no link between the variables | Coffee drinkers might also smoke more; without a mechanism and controlled studies, cause is not proven.
M3#gcse-u10-22-q4@3: Which evidence would best show that a risk factor causes a disease? | A plausible mechanism and the same link in many large, well-controlled studies | One small study showing a correlation | A newspaper report of a single case | A link found only in one town | Cause is accepted when the link is consistent in large, controlled studies and there is a mechanism to explain it.
SA3#gcse-u10-22-q5@2,3: Discuss the human and financial costs of type 2 diabetes, and evaluate the claim that it is caused only by lifestyle. | Human costs: illness, complications and reduced quality of life for the individual, caring for family and community, lost work. Financial costs: treatment and care paid by the health service, lost working days for the nation; globally the costs rise as rates increase. Obesity is a major risk factor with a known link, but the disease results from the interaction of several factors, including genes, age and environment, so lifestyle is not the only cause. | Individual cost ; Community or family cost ; National or global financial cost ; Obesity as risk factor ; Several interacting factors ; Judgement

## Cancer
LV: GCSE · Foundation
S: Cancer is the result of changes in cells that lead to uncontrolled growth and division. This lesson explains how tumours form, the difference between benign and malignant tumours, how malignant cells spread to form secondary tumours, and the lifestyle and genetic risk factors for cancer.
O: Describe cancer as the result of changes in cells that lead to uncontrolled growth and division
O: Compare benign and malignant tumours and explain how secondary tumours form
O: Describe lifestyle and genetic risk factors for cancer
PRE: Chromosomes, mitosis and the cell cycle
PRE: Lifestyle, risk factors and non-communicable disease
H: Uncontrolled cell division
P: Normally, cells divide by mitosis only when the body needs new cells, and the cell cycle is tightly controlled. **Cancer** is the result of changes in cells (changes to their DNA) that lead to **uncontrolled growth and division**. The cells keep dividing and form a mass of abnormal cells called a **tumour**.
H: Benign and malignant tumours
- **Benign tumours** are growths of abnormal cells that are contained in one area, usually within a membrane. They do not invade other parts of the body. They can still cause harm if they press on an organ, for example in the brain.
- **Malignant tumours** are cancers. Their cells **invade neighbouring tissues** and **spread to different parts of the body in the blood**, where they form **secondary tumours**.
X: A scan finds a tumour in a patient's lung and, later, a second tumour in the liver made of lung-type cells. What does this show?
> The second tumour is made of lung cells, so it did not start in the liver.
> Cells broke away from the first tumour and travelled in the blood.
> So the lung tumour is malignant, and the liver tumour is a secondary tumour.
H: Risk factors for cancer
P: Scientists have identified **lifestyle risk factors** for various types of cancer, such as smoking (lung and other cancers), drinking alcohol, a poor diet and obesity, and exposure to **carcinogens** such as ultraviolet radiation from the Sun or sunbeds (skin cancer) and other ionising radiation. Some viruses can also trigger cancers. There are also **genetic risk factors**: some people inherit gene variants (for example BRCA1 or BRCA2) that greatly increase the risk of certain cancers, such as breast and ovarian cancer.
K: Cancer is uncontrolled cell growth and division; benign tumours stay in one place inside a membrane, while malignant tumours invade tissues and spread in the blood to form secondary tumours; risk factors are both lifestyle and genetic.
!: Saying a benign tumour is always harmless. It does not spread, but it can still press on and damage nearby organs.
EV: established | Exposure to ultraviolet radiation from the Sun and sunbeds increases the risk of skin cancer.
EV: established | Inherited BRCA1 and BRCA2 variants greatly increase the risk of breast and ovarian cancer.
T: Tumour | A mass of cells formed by uncontrolled cell division
T: Benign tumour | A growth of abnormal cells contained in one area, usually within a membrane, that does not invade other parts of the body
T: Malignant tumour | A cancer whose cells invade neighbouring tissues and spread in the blood to form secondary tumours
T: Secondary tumour | A tumour formed in another part of the body by cells that spread from a malignant tumour
SUM: Cancer results from changes in cells that lead to uncontrolled growth and division.
SUM: Benign tumours are contained and don't spread; malignant tumours invade and spread in the blood to form secondary tumours.
SUM: Cancer has lifestyle risk factors (smoking, alcohol, diet, UV and other radiation) and genetic risk factors.
SRC: AQA, GCSE Combined Science: Trilogy (8464) specification, version 1.1, 4.2.2.7 Cancer | standard | 2019 | https://filestore.aqa.org.uk/resources/science/specifications/AQA-8464-SP-2016.PDF
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 10.4 "Cancer and the cell cycle" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/10-4-cancer-and-the-cell-cycle
SRC: Betts J. G. et al., Anatomy and Physiology 2e, OpenStax, section 3.5 "Cell growth and division" (benign and malignant tumours) | secondary | 2022 | https://openstax.org/books/anatomy-and-physiology-2e/pages/3-5-cell-growth-and-division
Q: What is cancer? | The result of changes in cells that lead to uncontrolled growth and division.
Q: How does a malignant tumour form a secondary tumour? | Its cells invade nearby tissue, travel in the blood and form a new tumour elsewhere in the body.
M1#gcse-u10-23-q1@2: Which describes a benign tumour? | Abnormal cells contained in one area, usually within a membrane | Cells that spread in the blood to other organs | Cells that invade neighbouring tissues | A tumour that always causes death | Benign tumours stay in one place and do not invade other parts of the body.
TF1#gcse-u10-23-q2@1: Cancer is caused by cells dividing in an uncontrolled way. | true | Changes in cells lead to uncontrolled growth and division, forming a tumour.
M2#gcse-u10-23-q3@2: Why are malignant tumours more dangerous than benign tumours? | Their cells spread in the blood and form secondary tumours | They are always larger | They contain no abnormal cells | They are surrounded by a membrane | Malignant cells invade other tissues and spread around the body, so they are harder to remove.
M3#gcse-u10-23-q4@3: A woman inherits a BRCA1 gene variant. Which statement is correct? | She has a genetic risk factor that increases her chance of breast cancer | She will certainly develop cancer | Her cancer risk comes only from lifestyle | She has a benign tumour | An inherited variant raises the risk, but it does not make cancer certain.
SA2#gcse-u10-23-q5@2,3: Compare benign and malignant tumours, and give two lifestyle risk factors and one genetic risk factor for cancer. | Both are masses of cells from uncontrolled division. Benign tumours are contained in one area, usually within a membrane, and do not invade other parts of the body. Malignant tumours are cancers: their cells invade neighbouring tissues and spread in the blood to form secondary tumours. Lifestyle risk factors include smoking and UV exposure (also alcohol, poor diet, obesity). A genetic risk factor is inheriting a BRCA1 or BRCA2 variant. | Both from uncontrolled division ; Benign contained in a membrane ; Malignant invades tissues ; Spreads in blood to secondary tumours ; Two lifestyle risk factors ; One genetic risk factor
`;
