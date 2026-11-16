// SciGradify Bioinformatics and Computational Biology (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Introduction to bioinformatics
LV: Year 1 · Foundation
S: Bioinformatics uses computing to store, analyse and interpret biological data. This lesson introduces the field and why it is needed.
O: Define bioinformatics
O: Explain why biology needs computational methods
O: Describe the main areas of bioinformatics
H: What it is
- **Bioinformatics** combines biology, computer science and statistics.
- It manages and analyses data such as DNA sequences, protein structures and gene expression.
- **Computational biology** builds models and simulations of biological systems.
- Common tools include programming languages such as Python and R.
H: Why it is needed
- Sequencing produces billions of bases per run.
- Data are too large and complex to analyse by hand.
- Comparing sequences reveals function and evolution.
- Areas include genomics, proteomics, structural biology and systems biology.
P: Margaret Dayhoff compiled one of the first protein sequence collections in the 1960s, founding the field. Today bioinformatics underpins genomic medicine, drug discovery and outbreak tracking. Bioinformaticians need both biological understanding and computing skills.
X: Too much data for people.
> A single human genome contains about 3 billion base pairs.
> Reading one base per second would take nearly 100 years.
> A sequencer produces many genomes in a day.
> Only computers can store, search and compare such data.
K: Bioinformatics combines biology, computing and statistics to manage and analyse large biological datasets, supporting genomics, proteomics, structural and systems biology.
!: Thinking bioinformatics is only about programming. It needs biological knowledge to ask and interpret the right questions.
EV: established | Dayhoff's Atlas of Protein Sequence and Structure was an early foundation of bioinformatics (Dayhoff, 1965).
T: Bioinformatics | Using computing to analyse biological data
T: Computational biology | Modelling and simulating biological systems
T: Dataset | A structured collection of data
SUM: Biology plus computing.
SUM: Data too big for hand analysis.
SUM: Many areas.
SRC: Dayhoff M. O., Atlas of Protein Sequence and Structure, National Biomedical Research Foundation | primary | 1965
SRC: Lesk A. M., Introduction to Bioinformatics, 5th edition, Oxford University Press | secondary | 2019
Q: What is bioinformatics? | Using computing and statistics to analyse biological data.
Q: Name two programming languages common in bioinformatics. | Python and R.
M1#biology-u13-01-q1@1: Which fields does bioinformatics combine? | Biology, computer science and statistics | Chemistry, art and music | History, law and geography | Physics, sport and drama | Bioinformatics is an interdisciplinary field.
M2#biology-u13-01-q2@2: Why is computing essential for genomics? | Datasets are far too large to analyse by hand | Computers sequence DNA without samples | Genomes are very short | Biologists cannot read | Billions of bases need automated analysis.
MATCH1#biology-u13-01-q3@1: Match each area to its focus. | Genomics = Genomes ; Proteomics = Proteins ; Structural biology = 3D shapes ; Systems biology = Networks | Bioinformatics has many areas.
M3#biology-u13-01-q4@3: Why do bioinformaticians need biological knowledge? | To ask meaningful questions and interpret results | Because computers cannot run code | To avoid using statistics | Because data are always correct | Analysis is only useful when interpreted biologically.
SA2#biology-u13-01-q5@1,3: Explain what bioinformatics is and why it is needed. | Bioinformatics combines biology, computer science and statistics to store, manage and analyse biological data such as DNA sequences, protein structures and expression data, while computational biology builds models. It is needed because sequencing produces billions of bases, far too much to analyse by hand, and comparisons reveal function and evolution. Areas include genomics, proteomics, structural and systems biology. Practitioners need both computing skills and biological understanding. | Definition ; Data scale ; Tools ; Areas ; Skills

## Biological databases
LV: Year 1 · Foundation
S: Biological databases store sequences, structures and other data for researchers worldwide. This lesson describes major databases and how they are used.
O: Describe the main types of biological database
O: Name key sequence and structure databases
O: Explain the importance of open data sharing
H: Types
- **Primary databases** store raw experimental data, such as sequences.
- **Secondary databases** store curated or derived information, such as protein families.
- Examples: **GenBank**, **ENA** and **DDBJ** for nucleotide sequences.
- **UniProt** for protein sequences and functions.
- **PDB** (Protein Data Bank) for 3D structures.
H: Using databases
- Each entry has a unique **accession number**.
- Entries include annotations, references and links to other databases.
- Data are shared openly, often required by journals and funders.
- **Ensembl** provides annotated genomes in a browser.
P: The three nucleotide databases exchange data daily through the International Nucleotide Sequence Database Collaboration. The European Bioinformatics Institute near Cambridge hosts many major databases. Open data allowed rapid global responses during the COVID-19 pandemic, as SARS-CoV-2 sequences were shared within days.
X: Finding a gene.
> A student wants information on the human insulin gene.
> They search Ensembl and find its location on chromosome 11.
> A link leads to the UniProt entry describing the protein.
> Another link shows its 3D structure in the PDB.
K: Biological databases store primary data such as sequences in GenBank, ENA and DDBJ and curated information in databases such as UniProt and PDB; entries have accession numbers and links, and open sharing speeds research.
!: Thinking database entries are always error-free. Primary data can contain errors, so curated databases add checks.
EV: established | Open sharing of SARS-CoV-2 sequences accelerated vaccine and test development (Wu et al., 2020).
T: Accession number | A unique identifier for a database entry
T: Primary database | A database of raw experimental data
T: Protein Data Bank | A database of 3D molecular structures
SUM: Primary and secondary.
SUM: GenBank, UniProt, PDB.
SUM: Open sharing.
SRC: Wu F. et al., "A new coronavirus associated with human respiratory disease in China", Nature 579, 265–269 | primary | 2020
SRC: EMBL-EBI, Data resources | guidance | 2024 | https://www.ebi.ac.uk/services
Q: What is an accession number? | A unique identifier for a database entry.
Q: What does the Protein Data Bank store? | 3D structures of biological molecules.
M1#biology-u13-02-q1@1: Which database stores protein sequences and functions? | UniProt | GenBank | PubMed | Ensembl Plants | UniProt is the main protein knowledge base.
M2#biology-u13-02-q2@2: How do secondary databases differ from primary ones? | They hold curated or derived information | They hold only raw sequencer output | They contain no data | They are never shared | Curated databases add annotation and checks.
MATCH1#biology-u13-02-q3@1: Match each database to its content. | GenBank = Nucleotide sequences ; UniProt = Protein information ; PDB = 3D structures ; Ensembl = Annotated genomes | Databases hold different data.
M3#biology-u13-02-q4@3: Why did open sharing help during the COVID-19 pandemic? | Scientists worldwide could design tests and vaccines quickly | It slowed down research around the world | It hid the sequence from scientists | It stopped mutations | Rapid access to sequences sped up responses.
SA2#biology-u13-02-q5@1,3: Describe the main biological databases and their importance. | Primary databases store raw data such as nucleotide sequences in GenBank, ENA and DDBJ, which exchange data daily. Secondary databases hold curated information, such as UniProt for proteins and protein family databases, while PDB stores 3D structures and Ensembl provides annotated genomes. Entries have accession numbers, annotations and cross-links. Open sharing, often required by funders, enabled rapid sharing of SARS-CoV-2 sequences and fast development of tests and vaccines. | Primary databases ; Secondary databases ; Structure and genome ; Accession numbers ; Open data

## DNA sequence analysis
LV: Year 1 · Application
S: Computers analyse DNA sequences to find genes and features. This lesson explains basic sequence analysis tasks.
O: Describe common file formats for sequences
O: Explain how open reading frames are found
O: Calculate GC content and describe its significance
H: Basic analysis
- Sequences are often stored in **FASTA** format: a header line starting with ">" and the sequence.
- **Reverse complement**: the sequence of the opposite strand, read 5′ to 3′.
- **Translation** in six **reading frames** (three on each strand).
- **Open reading frames** (ORFs): stretches from a start codon (ATG) to a stop codon.
H: GC content and motifs
- **GC content**: the percentage of bases that are G or C.
- GC pairs have three hydrogen bonds, so high-GC DNA is more stable.
- GC content varies between species and genome regions.
- **Motifs**, such as promoter sequences and restriction sites, can be searched for.
P: Long ORFs suggest protein-coding genes, especially in bacteria, where genes lack introns. In eukaryotes, gene finding is harder because of introns and alternative splicing. Primer design for PCR considers GC content so primers bind at suitable temperatures.
X: Calculating GC content.
> A sequence has 100 bases.
> It contains 22 G and 26 C.
> GC content = (22 + 26) ÷ 100 × 100 = 48%.
> The remaining 52% are A and T.
K: DNA sequences are stored in FASTA format and analysed by reverse complementing, translating in six frames to find ORFs and calculating GC content, which affects stability and varies between genomes.
!: Thinking every ORF is a real gene. Many short ORFs occur by chance and need further evidence.
EV: established | Gene prediction combines ORF detection with other evidence, especially in eukaryotes (Lesk, 2019).
T: FASTA | A simple text format for sequences
T: Open reading frame | A sequence from a start codon to a stop codon
T: GC content | The percentage of G and C bases in DNA
SUM: FASTA and reverse complement.
SUM: Six frames and ORFs.
SUM: GC content.
SRC: Lesk A. M., Introduction to Bioinformatics, 5th edition, Oxford University Press | secondary | 2019
SRC: Mount D. W., Bioinformatics: Sequence and Genome Analysis, 2nd edition, Cold Spring Harbor Laboratory Press | secondary | 2004
Q: What is an open reading frame? | A stretch from a start codon to a stop codon.
Q: How many reading frames does a double-stranded DNA sequence have? | Six.
M1#biology-u13-03-q1@1: Which character begins the header line in a FASTA file? | > | # | @ | % | The ">" symbol marks the description line.
M2#biology-u13-03-q2@2: Why is high-GC DNA more stable? | G-C pairs form three hydrogen bonds | G-C pairs form one hydrogen bond | G and C are heavier bases | A-T pairs are covalent | More hydrogen bonds hold strands together more strongly.
NUM1#biology-u13-03-q3@2: A 200-base sequence contains 54 G and 46 C. What is its GC content in %? | 50 | 0 | % | (54 + 46) ÷ 200 × 100 = 50%.
M3#biology-u13-03-q4@3: Why is gene finding harder in eukaryotes than bacteria? | Introns interrupt coding sequences | Eukaryotes have no start codons | Bacteria have no genes | Eukaryotic DNA cannot be sequenced | Split genes do not form single long ORFs.
SA2#biology-u13-03-q5@1,3: Describe basic DNA sequence analysis. | Sequences are stored in FASTA format, with a ">" header and the sequence. Analysis includes finding the reverse complement, translating in six reading frames and identifying open reading frames from ATG to a stop codon, which suggest genes, especially in bacteria. GC content, the percentage of G and C, affects stability because G-C pairs form three hydrogen bonds and varies between genomes. Motifs such as promoters can be searched for. Introns make eukaryotic gene finding harder. | FASTA ; Reading frames ; ORFs ; GC content ; Eukaryotic genes

## Protein sequence analysis
LV: Year 1 · Application
S: Protein sequences reveal function, structure and evolutionary relationships. This lesson explains how protein sequences are analysed.
O: Describe how protein sequences are represented
O: Explain how domains and motifs indicate function
O: Describe properties predicted from protein sequences
H: Representing proteins
- Proteins are written as strings of one-letter **amino acid codes**, such as M for methionine.
- Sequences are read from the **N-terminus** to the **C-terminus**.
- Proteins are often longer than 300 amino acids.
- Sequence databases such as UniProt store annotations.
H: Analysis
- **Domains** are independently folding units with specific functions, such as kinase domains.
- **Motifs** are short conserved patterns, such as zinc fingers.
- Properties predicted: molecular mass, isoelectric point, hydrophobic **transmembrane regions** and signal peptides.
- **Pfam** and **InterPro** classify protein families and domains.
P: Because protein sequences change more slowly than DNA (synonymous changes are hidden), they are useful for detecting distant relationships. Hydrophobicity plots identify likely membrane-spanning regions of about 20 hydrophobic amino acids. Predicting function from sequence speeds research on newly sequenced genomes.
X: Spotting a membrane protein.
> A new protein sequence is analysed.
> A hydrophobicity plot shows seven stretches of about 20 hydrophobic amino acids.
> These are likely transmembrane helices.
> The protein may be a receptor spanning the membrane seven times.
K: Protein sequences use one-letter codes from N- to C-terminus; domains and motifs, classified in Pfam and InterPro, indicate function, and properties such as mass, charge and transmembrane regions can be predicted.
!: Thinking two proteins with similar functions always have similar sequences. Unrelated proteins can perform similar functions.
EV: established | Domain databases such as InterPro integrate protein family and domain information (Blum et al., 2021).
T: Protein domain | An independently folding functional unit
T: Motif | A short conserved sequence pattern
T: Transmembrane region | A stretch of protein crossing a membrane
SUM: One-letter codes.
SUM: Domains and motifs.
SUM: Predicted properties.
SRC: Blum M. et al., "The InterPro protein families and domains database: 20 years on", Nucleic Acids Research 49(D1), D344–D354 | primary | 2021
SRC: Lesk A. M., Introduction to Bioinformatics, 5th edition, Oxford University Press | secondary | 2019
Q: What is a protein domain? | An independently folding unit with a specific function.
Q: In which direction are protein sequences written? | From the N-terminus to the C-terminus.
M1#biology-u13-04-q1@1: Which database classifies protein families and domains? | Pfam | GenBank | PubMed | FASTA | Pfam groups proteins into families by domains.
M2#biology-u13-04-q2@2: Why are protein sequences useful for detecting distant relationships? | They change more slowly than DNA sequences | They contain more bases than DNA | They never change | They are shorter than genes | Silent DNA changes do not alter amino acids.
MATCH1#biology-u13-04-q3@2: Match each feature to its meaning. | Domain = Folding unit ; Motif = Short pattern ; Signal peptide = Targeting sequence ; Transmembrane region = Membrane-spanning stretch | Protein features have meanings.
M3#biology-u13-04-q4@3: What does a stretch of about 20 hydrophobic amino acids suggest? | A transmembrane helix | A DNA-binding site | A signal for degradation | A disulfide bond | Hydrophobic helices of this length span the lipid bilayer.
SA2#biology-u13-04-q5@1,3: Explain how protein sequences are analysed. | Protein sequences are written in one-letter amino acid codes from N- to C-terminus and stored in databases such as UniProt. Domains are independently folding functional units and motifs are short conserved patterns, classified in Pfam and InterPro. Properties such as mass, isoelectric point, signal peptides and transmembrane regions, seen as stretches of about 20 hydrophobic residues, can be predicted. Protein sequences change more slowly than DNA, helping detect distant relationships. | Representation ; Domains ; Motifs ; Properties ; Evolution

## Sequence alignment
LV: Year 1 · Application
S: Sequence alignment compares sequences to find similarities. This lesson explains pairwise alignment, scoring and its uses.
O: Distinguish global and local alignment
O: Explain how alignments are scored
O: Distinguish similarity and homology
H: Alignment types
- **Pairwise alignment** compares two sequences.
- **Global alignment** (Needleman-Wunsch) aligns whole sequences.
- **Local alignment** (Smith-Waterman) finds the best-matching regions.
- **Gaps** represent insertions or deletions.
H: Scoring
- Matches score positively; mismatches and gaps score negatively.
- **Substitution matrices**, such as BLOSUM62, give scores for amino acid pairs.
- **Dynamic programming** finds the optimal alignment.
- **Percentage identity** gives the proportion of identical positions.
P: **Homology** means shared ancestry and is either true or false, while **similarity** is a measured quantity. High similarity suggests homology but does not prove it. Alignments are used to infer function, study evolution and identify mutations.
X: A simple alignment.
> Sequence 1: GATTACA
> Sequence 2: GATCACA
> Six of seven positions are identical.
> Percentage identity = 6 ÷ 7 × 100 ≈ 86%.
K: Alignment compares sequences globally or locally, scores matches, mismatches and gaps with matrices such as BLOSUM62 using dynamic programming, and measures similarity, which can suggest homology.
!: Saying two sequences are "70% homologous". Homology is all-or-nothing; similarity or identity is given as a percentage.
EV: established | The Needleman-Wunsch algorithm introduced dynamic programming for sequence alignment (Needleman and Wunsch, 1970).
T: Global alignment | Alignment of entire sequences
T: Local alignment | Alignment of the best-matching regions
T: Homology | Similarity due to shared ancestry
SUM: Global and local.
SUM: Scoring and matrices.
SUM: Similarity versus homology.
SRC: Needleman S. B. and Wunsch C. D., "A general method applicable to the search for similarities in the amino acid sequence of two proteins", Journal of Molecular Biology 48(3), 443–453 | primary | 1970
SRC: Smith T. F. and Waterman M. S., "Identification of common molecular subsequences", Journal of Molecular Biology 147(1), 195–197 | primary | 1981
Q: What does a gap in an alignment represent? | An insertion or deletion.
Q: What is homology? | Similarity due to shared ancestry.
M1#biology-u13-05-q1@1: Which algorithm performs local alignment? | Smith-Waterman | Needleman-Wunsch | Neighbour joining | Hardy-Weinberg | Smith-Waterman finds the best-matching subregions.
M2#biology-u13-05-q2@2: What does a substitution matrix such as BLOSUM62 provide? | Scores for each pair of amino acids | The 3D structure of a protein | A list of genome databases | The GC content of DNA | Matrices reflect how often substitutions occur in related proteins.
NUM1#biology-u13-05-q3@2: Two aligned sequences of 20 positions have 15 identical positions. What is the percentage identity? | 75 | 0 | % | Identity = 15 ÷ 20 × 100 = 75%.
M3#biology-u13-05-q4@3: Why is "70% homologous" an incorrect phrase? | Homology is either present or absent, not a percentage | Homology can only be given as an exact 100% | Homology only applies to DNA | Similarity cannot be measured | Shared ancestry is a yes-or-no inference.
SA2#biology-u13-05-q5@1,3: Explain sequence alignment and how it is scored. | Pairwise alignment compares two sequences: global alignment, by Needleman-Wunsch, aligns whole sequences, while local alignment, by Smith-Waterman, finds best-matching regions. Gaps represent insertions or deletions. Matches score positively and mismatches and gaps negatively, using substitution matrices such as BLOSUM62, and dynamic programming finds the optimal alignment. Percentage identity measures similarity. Similarity is measured, whereas homology means shared ancestry and is all-or-nothing. | Pairwise alignment ; Global and local ; Scoring ; Percentage identity ; Homology

## BLAST
LV: Year 1 · Application
S: BLAST searches databases for sequences similar to a query. This lesson explains how BLAST works and how to interpret results.
O: Describe the purpose of BLAST
O: Distinguish the main BLAST programs
O: Interpret E-values and percentage identity
H: What BLAST does
- **BLAST** (Basic Local Alignment Search Tool) finds similar sequences in large databases quickly.
- It uses short **word matches** as seeds, then extends them into local alignments.
- It is faster than full Smith-Waterman but may miss some matches.
- Programs: **blastn** (DNA vs DNA), **blastp** (protein vs protein), **blastx** (translated DNA vs protein).
H: Interpreting results
- **E-value**: the number of hits expected by chance; smaller is more significant.
- E-values below about 10⁻⁵ usually indicate meaningful similarity.
- **Percentage identity** and **query coverage** show how well sequences match.
- **Bit score** measures alignment quality independent of database size.
P: BLAST, published in 1990, is one of the most cited scientific papers. It is used to identify unknown sequences, find homologues in other species and check primers. Very large databases increase the chance of random matches, which E-values account for.
X: Identifying an unknown gene.
> A researcher sequences an unknown DNA fragment.
> blastn against the nucleotide database returns a top hit with 99% identity and E-value 0.
> The hit is a known bacterial gene.
> The fragment almost certainly comes from that gene.
K: BLAST quickly finds similar sequences using word seeds extended into local alignments; programs include blastn, blastp and blastx, and hits are judged by E-value, percentage identity, coverage and bit score.
!: Thinking a large E-value means a strong match. Smaller E-values indicate more significant matches.
EV: established | BLAST was introduced in 1990 and became a standard bioinformatics tool (Altschul et al., 1990).
T: BLAST | A tool searching databases for similar sequences
T: E-value | Expected number of chance hits with a given score
T: Query coverage | Proportion of the query included in an alignment
SUM: Fast database search.
SUM: blastn, blastp, blastx.
SUM: E-values and identity.
SRC: Altschul S. F. et al., "Basic local alignment search tool", Journal of Molecular Biology 215(3), 403–410 | primary | 1990
SRC: National Center for Biotechnology Information, BLAST help | guidance | 2024 | https://blast.ncbi.nlm.nih.gov/
Q: What is an E-value? | The number of hits expected by chance with a given score.
Q: Which BLAST program compares a protein query with a protein database? | blastp.
M1#biology-u13-06-q1@1: Which E-value indicates the most significant match? | 1 × 10⁻⁵⁰ | 1 × 10⁻² | 0.5 | 10 | Smaller E-values mean a match is less likely by chance.
M2#biology-u13-06-q2@2: Why is BLAST faster than full Smith-Waterman alignment? | It starts from short word matches and extends them | It ignores most sequences entirely | It uses no scoring | It only compares two letters | Seeding avoids comparing every position fully.
MATCH1#biology-u13-06-q3@2: Match each program to its comparison. | blastn = DNA to DNA ; blastp = Protein to protein ; blastx = Translated DNA to protein ; tblastn = Protein to translated DNA | BLAST has several programs.
M3#biology-u13-06-q4@3: Why do E-values depend on database size? | Larger databases offer more chances of random matches | Smaller databases are always wrong | Database size has no effect | E-values measure database speed | More sequences in a database give more chances of random hits.
SA2#biology-u13-06-q5@1,3: Explain how BLAST is used and how results are interpreted. | BLAST searches large databases for sequences similar to a query by finding short word matches and extending them into local alignments, faster than full Smith-Waterman. Programs include blastn for DNA, blastp for proteins and blastx for translated DNA against proteins. Results are judged by E-value, the number of chance hits expected, with smaller values more significant; percentage identity; query coverage; and bit score. BLAST identifies unknown sequences and finds homologues. | Purpose ; Method ; Programs ; E-values ; Other measures

## Multiple sequence alignment
LV: Year 1 · Application
S: Multiple sequence alignment lines up three or more sequences together. This lesson explains how it is done and what it reveals.
O: Describe the purpose of multiple sequence alignment
O: Explain progressive alignment
O: Interpret conserved regions in an alignment
H: Purpose and method
- A **multiple sequence alignment** (MSA) aligns three or more related sequences.
- **Progressive alignment** aligns the most similar sequences first, then adds others using a **guide tree**.
- Tools include **Clustal Omega**, **MUSCLE** and **MAFFT**.
- Errors made early in progressive alignment cannot be corrected later.
H: Interpreting
- **Conserved positions** are identical across many sequences, suggesting functional importance.
- **Variable positions** tolerate change.
- A **consensus sequence** shows the most common residue at each position.
- **Sequence logos** show conservation visually.
P: MSAs are the basis for building phylogenetic trees, identifying functional sites and designing primers that work across species. Active-site residues of enzymes are usually highly conserved. Poorly aligned regions are often trimmed before tree building.
X: Finding a vital residue.
> Haemoglobin sequences from 50 vertebrates are aligned.
> One histidine is identical in every sequence.
> This histidine binds the iron of the haem group.
> Conservation reflects its essential role.
K: Multiple sequence alignment aligns three or more sequences, usually by progressive alignment using a guide tree in tools such as Clustal Omega, revealing conserved functional positions, consensus sequences and data for phylogenetics.
!: Thinking an alignment program always gives the true alignment. Alignments are estimates that may contain errors.
EV: established | Clustal Omega enables accurate alignment of large numbers of sequences (Sievers et al., 2011).
T: Multiple sequence alignment | Alignment of three or more sequences
T: Guide tree | A tree guiding the order of progressive alignment
T: Consensus sequence | The most common residue at each position
SUM: Three or more sequences.
SUM: Progressive alignment.
SUM: Conserved positions.
SRC: Sievers F. et al., "Fast, scalable generation of high-quality protein multiple sequence alignments using Clustal Omega", Molecular Systems Biology 7, 539 | primary | 2011
SRC: Lesk A. M., Introduction to Bioinformatics, 5th edition, Oxford University Press | secondary | 2019
Q: What is a consensus sequence? | The most common residue at each position of an alignment.
Q: Name a multiple sequence alignment tool. | Clustal Omega.
M1#biology-u13-07-q1@1: What do highly conserved positions often indicate? | Functional importance | Random mutation | Sequencing errors | Unimportant regions | Changes at functional positions are removed by natural selection.
M2#biology-u13-07-q2@2: What is a weakness of progressive alignment? | Early errors cannot be corrected later | It cannot align proteins | It needs no guide tree | It only aligns two sequences | Mistakes propagate as sequences are added.
MATCH1#biology-u13-07-q3@2: Match each term to its meaning. | Guide tree = Alignment order ; Consensus = Most common residue ; Sequence logo = Visual conservation ; Variable position = Tolerates change | Multiple sequence alignment uses these key terms.
M3#biology-u13-07-q4@3: Why are poorly aligned regions often trimmed before building trees? | They add noise that can mislead tree building | They contain the most information | Trees need gaps to work | Trimming adds new sequences | Uncertain alignment adds noise that can mislead tree building.
SA2#biology-u13-07-q5@1,3: Explain multiple sequence alignment and its uses. | Multiple sequence alignment lines up three or more related sequences. Progressive alignment, used by Clustal Omega, MUSCLE and MAFFT, aligns the most similar sequences first using a guide tree, though early errors cannot be corrected. Conserved positions, such as a haem-binding histidine, suggest functional importance, while variable positions tolerate change. Consensus sequences and sequence logos summarise conservation. MSAs underpin phylogenetics, functional site identification and primer design, with poorly aligned regions often trimmed. | Purpose ; Progressive method ; Conservation ; Summaries ; Uses

## Phylogenetic analysis
LV: Year 1 · Biological reasoning
S: Phylogenetic analysis builds trees from sequence data. This lesson explains the main tree-building methods and how confidence is assessed.
O: Describe distance-based and character-based tree methods
O: Explain bootstrapping
O: Explain how trees are rooted
H: Methods
- **Distance methods**, such as **neighbour joining**, build trees from pairwise distances.
- **Maximum parsimony** chooses the tree needing fewest changes.
- **Maximum likelihood** finds the tree that makes the data most probable under a model of evolution.
- **Bayesian inference** estimates the probability of trees given the data.
H: Confidence and rooting
- **Bootstrapping** resamples alignment columns many times to test tree support.
- Bootstrap values above about 70% are often taken as good support.
- Trees are **rooted** using an **outgroup**, a species known to be outside the group.
- Models account for different rates of substitution.
P: Phylogenetic analysis of virus genomes was used to trace the spread of SARS-CoV-2 variants. Long-branch attraction can cause fast-evolving lineages to group together incorrectly. Choosing appropriate models and checking support reduces errors.
X: Bootstrapping a tree.
> A tree is built from an alignment of 500 positions.
> 1,000 new alignments are made by sampling columns with replacement.
> A tree is built from each.
> A grouping appearing in 950 of them has 95% bootstrap support.
K: Phylogenetic trees are built by distance methods such as neighbour joining, parsimony, maximum likelihood or Bayesian inference; bootstrapping tests support and outgroups root trees.
!: Thinking a bootstrap value is the probability a grouping is true. It measures how consistently the data support it.
EV: established | Bootstrapping was introduced to phylogenetics to assess confidence in trees (Felsenstein, 1985).
T: Neighbour joining | A distance-based tree-building method
T: Bootstrapping | Resampling data to assess support for tree branches
T: Outgroup | A taxon outside the group used to root a tree
SUM: Distance and character methods.
SUM: Bootstrap support.
SUM: Outgroup rooting.
SRC: Felsenstein J., "Confidence limits on phylogenies: an approach using the bootstrap", Evolution 39(4), 783–791 | primary | 1985
SRC: Yang Z. and Rannala B., "Molecular phylogenetics: principles and practice", Nature Reviews Genetics 13, 303–314 | primary | 2012
Q: What is an outgroup? | A taxon outside the group being studied, used to root a tree.
Q: What does bootstrapping test? | How consistently the data support each branch.
M1#biology-u13-08-q1@1: Which method finds the tree requiring the fewest changes? | Maximum parsimony | Maximum likelihood | Neighbour joining | Bootstrapping | Parsimony prefers the simplest explanation.
M2#biology-u13-08-q2@2: How is a phylogenetic tree rooted? | By including an outgroup | By deleting the longest branch | By adding more ingroup species | By removing all gaps | The outgroup branches off first, showing where the root lies.
NUM1#biology-u13-08-q3@2: A grouping appears in 870 of 1,000 bootstrap trees. What is its bootstrap support in %? | 87 | 0 | % | 870 ÷ 1,000 × 100 = 87%.
M3#biology-u13-08-q4@3: What is long-branch attraction? | Fast-evolving lineages wrongly grouping together | Short branches always being correct | Outgroups being too similar | Bootstrapping failing to run | Many changes can create false similarity.
SA2#biology-u13-08-q5@1,3: Describe how phylogenetic trees are built and assessed. | Distance methods such as neighbour joining build trees from pairwise distances, maximum parsimony chooses the tree with fewest changes, maximum likelihood finds the tree making the data most probable under a model and Bayesian inference estimates tree probabilities. Bootstrapping resamples alignment columns to test branch support, with values above about 70% often taken as good. Trees are rooted with an outgroup. Problems such as long-branch attraction require good models. | Distance methods ; Character methods ; Bootstrapping ; Rooting ; Errors

## Genome annotation
LV: Year 1 · Application
S: Genome annotation identifies the location and function of features in a genome. This lesson explains structural and functional annotation.
O: Distinguish structural and functional annotation
O: Describe evidence used to predict genes
O: Explain the role of gene ontology
H: Structural annotation
- Identifies genes, exons, introns, promoters and repeats.
- **Ab initio prediction** uses sequence signals such as start codons and splice sites.
- **Evidence-based prediction** uses RNA sequencing and protein matches.
- **Repeat masking** hides repetitive DNA before gene prediction.
H: Functional annotation
- Assigns functions to predicted genes, often by similarity to known genes.
- **Gene Ontology** (GO) describes functions using standard terms for molecular function, biological process and cellular component.
- Many genes remain "hypothetical" with unknown function.
- Annotation is updated as evidence improves.
P: About half of the human genome consists of repetitive sequences. Errors in annotation can spread when new genomes are annotated by similarity to wrongly annotated ones. Community curation and experimental evidence improve annotation quality.
X: Annotating a bacterial genome.
> A new bacterial genome is sequenced.
> Software predicts about 4,000 ORFs.
> BLAST matches assign functions to most.
> Several hundred remain hypothetical proteins of unknown function.
K: Genome annotation identifies features structurally, using ab initio signals, RNA-seq and protein evidence after masking repeats, and assigns functions by similarity, described with Gene Ontology terms, with many genes still of unknown function.
!: Thinking annotations are always correct. Errors can spread between databases.
EV: established | Gene Ontology provides a standard vocabulary for gene function (Ashburner et al., 2000).
T: Genome annotation | Identifying features and functions in a genome
T: Gene Ontology | A standard vocabulary describing gene functions
T: Repeat masking | Hiding repetitive sequences before analysis
SUM: Structural annotation.
SUM: Functional annotation.
SUM: Gene Ontology.
SRC: Ashburner M. et al., "Gene ontology: tool for the unification of biology", Nature Genetics 25, 25–29 | primary | 2000
SRC: Yandell M. and Ence D., "A beginner's guide to eukaryotic genome annotation", Nature Reviews Genetics 13, 329–342 | primary | 2012
Q: What is structural annotation? | Identifying the locations of genes and other features.
Q: What are the three Gene Ontology categories? | Molecular function, biological process and cellular component.
M1#biology-u13-09-q1@1: What does functional annotation assign to genes? | Their likely functions | Their chromosome numbers only | Their GC content | Their sequencing date | Functions are often inferred from similarity.
M2#biology-u13-09-q2@2: Why are repeats masked before gene prediction? | Repeats can be mistaken for genes | Repeats contain all the genes | Masking adds new genes | Repeats are never present | Masking stops repetitive DNA being mistaken for genes.
MATCH1#biology-u13-09-q3@2: Match each term to its meaning. | Ab initio = Signal-based prediction ; Evidence-based = Uses RNA and proteins ; Hypothetical protein = Unknown function ; GO term = Standard description | Annotation uses several approaches.
M3#biology-u13-09-q4@3: How can annotation errors spread? | New genomes are annotated by similarity to wrong entries | Errors are always removed automatically | Databases never share data | Each genome is annotated alone | Copying from wrong annotations propagates mistakes.
SA2#biology-u13-09-q5@1,3: Explain how genomes are annotated. | Structural annotation identifies genes, exons, introns, promoters and repeats. After repeat masking, ab initio prediction uses sequence signals such as start codons and splice sites, and evidence-based prediction uses RNA sequencing and protein matches. Functional annotation assigns functions, often by similarity, described with Gene Ontology terms for molecular function, biological process and cellular component. Many genes remain hypothetical, and errors can spread between databases, so annotation is updated with new evidence. | Structural ; Prediction methods ; Functional ; Gene Ontology ; Limitations

## Gene expression analysis
LV: Year 1 · Application
S: Gene expression analysis measures which genes are active and how much. This lesson describes methods and data.
O: Explain why gene expression is measured
O: Describe qPCR, microarrays and RNA sequencing
O: Explain normalisation of expression data
H: Why and how
- Expression differs between cell types, conditions and diseases.
- **RT-qPCR** measures expression of a few genes precisely.
- **Microarrays** use probes on a chip to measure thousands of genes.
- **RNA sequencing** (RNA-seq) sequences all RNA, measuring expression across the whole transcriptome.
H: Normalisation
- Raw counts depend on sequencing depth and gene length.
- **Normalisation** makes samples comparable, such as counts per million.
- **Reference genes** with stable expression normalise qPCR.
- **Biological replicates** are needed to measure natural variation.
P: The **transcriptome** is the complete set of RNA in a cell at a given time. Single-cell RNA-seq measures expression in individual cells, revealing new cell types. Expression changes do not always match protein levels, because of regulation after transcription.
X: Normalising for depth.
> Sample A has 20 million reads; sample B has 40 million.
> A gene has 200 reads in A and 400 in B.
> Counts per million: A = 10, B = 10.
> After normalisation, expression is the same.
K: Gene expression is measured by RT-qPCR for few genes, microarrays and RNA-seq for many, with normalisation for depth and length and biological replicates needed for valid comparison.
!: Assuming higher mRNA always means more protein. Protein levels also depend on translation and degradation.
EV: established | Single-cell RNA sequencing reveals cell-type diversity within tissues (Regev et al., 2017).
T: Transcriptome | All RNA in a cell at a given time
T: Normalisation | Adjusting data so samples are comparable
T: Biological replicate | An independent sample measuring natural variation
SUM: qPCR, arrays, RNA-seq.
SUM: Normalisation.
SUM: Replicates.
SRC: Regev A. et al., "The Human Cell Atlas", eLife 6, e27041 | primary | 2017
SRC: Conesa A. et al., "A survey of best practices for RNA-seq data analysis", Genome Biology 17, 13 | primary | 2016
Q: What is the transcriptome? | The complete set of RNA in a cell at a given time.
Q: Why are biological replicates needed? | To measure natural variation between samples.
M1#biology-u13-10-q1@1: Which method measures expression of the whole transcriptome by sequencing? | RNA-seq | RT-qPCR of one gene | Western blotting | Gel electrophoresis | RNA-seq sequences all the RNA in a sample.
M2#biology-u13-10-q2@2: Why must RNA-seq counts be normalised? | Raw counts depend on sequencing depth and gene length | Every sample is sequenced to an identical depth | Normalisation adds new genes | Counts are always exact | Normalisation adjusts for depth and length so samples compare fairly.
NUM1#biology-u13-10-q3@2: A gene has 150 reads in a sample of 30 million reads. What is its expression in counts per million? | 5 | 0 | counts per million | 150 ÷ 30 = 5 counts per million.
M3#biology-u13-10-q4@3: Why might mRNA levels not match protein levels? | Translation and protein breakdown are also regulated | mRNA is never translated | Proteins are made from DNA directly | mRNA and proteins are identical | Post-transcriptional control alters protein amounts.
SA2#biology-u13-10-q5@1,3: Describe how gene expression is measured and analysed. | Gene expression differs between cells, conditions and diseases. RT-qPCR precisely measures a few genes, microarrays measure thousands using probes and RNA-seq sequences the whole transcriptome; single-cell RNA-seq measures individual cells. Raw counts depend on sequencing depth and gene length, so data are normalised, such as counts per million, and qPCR uses stable reference genes. Biological replicates capture natural variation. mRNA levels do not always match protein levels. | Purpose ; Methods ; Normalisation ; Replicates ; Limitations

## RNA sequencing
LV: Year 1 · Application
S: RNA sequencing reads the RNA in a sample to measure expression and discover transcripts. This lesson explains the RNA-seq workflow.
O: Describe the RNA-seq laboratory workflow
O: Describe the computational analysis of RNA-seq data
O: Describe what RNA-seq can reveal beyond expression levels
H: Laboratory steps
- **Extract RNA** and check its quality.
- **Select** mRNA (using poly-A tails) or remove ribosomal RNA.
- **Reverse transcribe** RNA to cDNA.
- Fragment, add adapters and **sequence**.
H: Analysis
- **Quality control** of reads.
- **Alignment** to a reference genome or transcriptome.
- **Quantification**: counting reads per gene.
- Statistical testing for differences between conditions.
P: RNA-seq can discover new transcripts, alternative splicing, gene fusions in cancer and non-coding RNAs. Ribosomal RNA makes up most cellular RNA, so it is removed to avoid wasting reads. Careful experimental design, including randomisation and replicates, avoids batch effects.
X: Finding a fusion gene.
> RNA-seq is run on leukaemia cells.
> Some reads contain sequence from two different genes joined together.
> This shows a BCR-ABL fusion transcript.
> The fusion can be targeted by the drug imatinib.
K: RNA-seq extracts RNA, enriches mRNA or removes rRNA, makes cDNA and sequences it; reads are quality checked, aligned, counted and tested statistically, revealing expression, splicing, fusions and new transcripts.
!: Thinking RNA-seq directly sequences RNA in most methods. Most methods convert RNA to cDNA first.
EV: established | RNA-seq best practices include quality control, alignment, quantification and statistical testing (Conesa et al., 2016).
T: RNA-seq | Sequencing RNA to study expression
T: Poly-A selection | Enriching mRNA using its poly-A tail
T: Fusion transcript | An RNA made from two joined genes
SUM: Extract, enrich, convert, sequence.
SUM: QC, align, count, test.
SUM: Splicing and fusions.
SRC: Conesa A. et al., "A survey of best practices for RNA-seq data analysis", Genome Biology 17, 13 | primary | 2016
SRC: Wang Z., Gerstein M. and Snyder M., "RNA-Seq: a revolutionary tool for transcriptomics", Nature Reviews Genetics 10, 57–63 | primary | 2009
Q: Why is ribosomal RNA removed before RNA-seq? | It makes up most RNA and would waste sequencing reads.
Q: What is a fusion transcript? | An RNA made from parts of two different genes joined together.
M1#biology-u13-11-q1@1: How is mRNA usually enriched for RNA-seq? | By selecting molecules with poly-A tails | By heating to 95 °C | By adding restriction enzymes | By staining with dye | Most mRNAs have poly-A tails that bind oligo-dT beads.
M2#biology-u13-11-q2@2: What happens during quantification in RNA-seq analysis? | Reads are counted for each gene | Reads are translated into proteins | RNA is extracted from cells | Adapters are added | Reads mapped to each gene are counted to measure expression.
SEQ1#biology-u13-11-q3@2: Order the RNA-seq laboratory workflow. | Extract RNA ; Enrich mRNA ; Make cDNA ; Sequence | RNA-seq follows a sequence.
M3#biology-u13-11-q4@3: Why should samples be randomised across sequencing batches? | To avoid batch effects being confused with biology | To make sequencing faster | To remove the need for replicates | To increase rRNA | Technical batches can mimic real differences.
SA2#biology-u13-11-q5@1,3: Describe the RNA-seq workflow and what it can reveal. | RNA is extracted and quality checked, mRNA is enriched by poly-A selection or rRNA is removed, RNA is reverse transcribed to cDNA, fragmented, given adapters and sequenced. Computationally, reads are quality checked, aligned to a reference, counted per gene and tested statistically between conditions. Beyond expression, RNA-seq reveals alternative splicing, new transcripts, non-coding RNAs and fusions such as BCR-ABL in leukaemia. Randomisation and replicates avoid batch effects. | Lab workflow ; Quality and alignment ; Quantification ; Discoveries ; Design

## Differential expression
LV: Year 1 · Biological reasoning
S: Differential expression analysis finds genes whose expression changes between conditions. This lesson explains fold change, statistical testing and multiple testing.
O: Calculate and interpret fold change
O: Explain why multiple testing correction is needed
O: Interpret volcano plots
H: Fold change and testing
- **Fold change** = expression in condition B ÷ expression in condition A.
- **Log₂ fold change** makes increases and decreases symmetrical: +1 means doubled, −1 means halved.
- Statistical tests give a **p-value** for each gene.
- Tools such as DESeq2 model count data.
H: Multiple testing
- Testing 20,000 genes at p < 0.05 would give about 1,000 false positives by chance.
- **False discovery rate** (FDR) correction, such as Benjamini-Hochberg, controls the proportion of false positives.
- **Adjusted p-values** (q-values) are reported.
- **Volcano plots** show log₂ fold change against significance.
P: A gene can have a large fold change but be unreliable if expression is low and variable. Results should be validated, for example with qPCR, and interpreted biologically, such as by pathway analysis. Small sample sizes reduce statistical power.
X: Interpreting fold change.
> A gene has 50 reads in control and 200 in treated samples.
> Fold change = 200 ÷ 50 = 4.
> Log₂ fold change = 2.
> The gene is upregulated four-fold after treatment.
K: Differential expression uses fold change, often as log₂, and statistical tests for each gene, with false discovery rate correction for thousands of tests, and results are shown in volcano plots and validated.
!: Using unadjusted p-values when testing thousands of genes. Without correction, many false positives appear.
EV: established | The Benjamini-Hochberg procedure controls the false discovery rate (Benjamini and Hochberg, 1995).
T: Fold change | Ratio of expression between conditions
T: False discovery rate | Expected proportion of false positives among significant results
T: Volcano plot | A plot of fold change against significance
SUM: Fold change and log₂.
SUM: Multiple testing correction.
SUM: Volcano plots.
SRC: Benjamini Y. and Hochberg Y., "Controlling the false discovery rate: a practical and powerful approach to multiple testing", Journal of the Royal Statistical Society B 57(1), 289–300 | primary | 1995
SRC: Love M. I., Huber W. and Anders S., "Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2", Genome Biology 15, 550 | primary | 2014
Q: What does a log₂ fold change of −1 mean? | Expression has halved.
Q: Why is FDR correction used? | To control false positives when testing many genes.
M1#biology-u13-12-q1@1: What does a volcano plot show? | Fold change against statistical significance | Genome size against GC content | Time against temperature | Read length against cost | Volcano plots highlight large, significant changes.
M2#biology-u13-12-q2@2: Why are unadjusted p-values misleading for 20,000 genes? | Many genes pass p < 0.05 by chance alone | p-values are always zero | Only one gene can be tested | Genes cannot change expression | 5% of 20,000 tests would be false positives.
NUM1#biology-u13-12-q3@2: Expression rises from 30 to 240 reads. What is the log₂ fold change? | 3 | 0 | log₂ units | 240 ÷ 30 = 8, and log₂ 8 = 3.
M3#biology-u13-12-q4@3: Why might a gene with a large fold change be unreliable? | Its expression is low and highly variable | Large changes are always errors | Fold change cannot be calculated | High expression causes false results | Low read counts give noisy estimates of expression change.
SA2#biology-u13-12-q5@1,3: Explain how differentially expressed genes are identified. | Fold change compares expression between conditions, and log₂ fold change makes increases and decreases symmetrical. Tools such as DESeq2 test each gene, giving p-values. Testing thousands of genes produces many false positives, so false discovery rate correction, such as Benjamini-Hochberg, gives adjusted p-values. Volcano plots show fold change against significance. Low, variable genes can give unreliable large fold changes, so results are validated by qPCR and interpreted through pathways. | Fold change ; Statistical tests ; Multiple testing ; Volcano plots ; Validation

## Proteomics
LV: Year 1 · Application
S: Proteomics studies the full set of proteins in a cell or tissue. This lesson explains mass spectrometry-based proteomics.
O: Define the proteome
O: Describe how mass spectrometry identifies proteins
O: Explain why the proteome is more complex than the genome
H: The proteome
- The **proteome** is all the proteins in a cell or tissue at a given time.
- It changes with cell type, time and conditions.
- Alternative splicing and **post-translational modifications** increase diversity.
- Protein amounts vary over a huge range.
H: Mass spectrometry
- Proteins are digested into **peptides**, often with trypsin.
- Peptides are separated by **liquid chromatography**.
- **Mass spectrometry** measures mass-to-charge ratios.
- Peptide masses and fragments are matched to databases to identify proteins.
- **Quantitative proteomics** compares protein amounts between samples.
P: The proteome is more complex than the genome because one gene can produce many protein forms. Proteomics identifies biomarkers for disease and drug targets. The Human Protein Atlas maps where proteins are found in human tissues.
X: Identifying a protein.
> A protein band is cut from a gel and digested with trypsin.
> The peptides are analysed by mass spectrometry.
> Their masses are compared with predicted peptides from a database.
> The best match identifies the protein.
K: The proteome is all proteins present at a time; proteomics digests proteins into peptides, separates them by chromatography and identifies them by mass spectrometry and database matching, revealing complexity from splicing and modifications.
!: Thinking the proteome is fixed like the genome. It changes with cell type, time and conditions.
EV: established | The Human Protein Atlas maps protein expression across human tissues (Uhlén et al., 2015).
T: Proteome | All proteins in a cell or tissue at a given time
T: Mass spectrometry | Measuring mass-to-charge ratios of ions
T: Post-translational modification | A chemical change to a protein after translation
SUM: Dynamic proteome.
SUM: Peptides and mass spec.
SUM: More complex than genome.
SRC: Uhlén M. et al., "Tissue-based map of the human proteome", Science 347(6220), 1260419 | primary | 2015
SRC: Aebersold R. and Mann M., "Mass-spectrometric exploration of proteome structure and function", Nature 537, 347–355 | primary | 2016
Q: What is the proteome? | All the proteins in a cell or tissue at a given time.
Q: Which enzyme is often used to digest proteins for mass spectrometry? | Trypsin.
M1#biology-u13-13-q1@1: What does a mass spectrometer measure? | Mass-to-charge ratios of ions | DNA base sequences | Light absorbance only | Temperature of samples | Peptide mass-to-charge ratios are matched to identify proteins.
M2#biology-u13-13-q2@2: Why is the proteome more complex than the genome? | Splicing and modifications create many protein forms per gene | There are many fewer proteins than genes | Proteins never change | Genes are not transcribed | One gene can produce many protein variants.
SEQ1#biology-u13-13-q3@2: Order the steps of mass spectrometry proteomics. | Digest proteins ; Separate peptides ; Measure masses ; Match to database | Proteomics follows a workflow.
M3#biology-u13-13-q4@3: Why is proteomics useful in medicine? | It can identify disease biomarkers and drug targets | It replaces DNA sequencing in hospitals | It only studies plants | It measures blood pressure | Protein changes can reveal disease states and potential drug targets.
SA2#biology-u13-13-q5@1,3: Describe proteomics and how proteins are identified. | The proteome is all proteins in a cell or tissue at a given time, changing with conditions. It is more complex than the genome because alternative splicing and post-translational modifications create many forms. In mass spectrometry proteomics, proteins are digested with trypsin, peptides separated by liquid chromatography and their mass-to-charge ratios measured, then matched to databases. Quantitative proteomics compares amounts, identifying biomarkers and drug targets, and the Human Protein Atlas maps tissue proteins. | Definition ; Complexity ; Digestion and separation ; Mass spectrometry ; Applications

## Metabolomics
LV: Year 1 · Application
S: Metabolomics measures the small molecules in a biological sample. This lesson explains how metabolites are measured and used.
O: Define the metabolome
O: Describe methods used in metabolomics
O: Describe applications of metabolomics
H: The metabolome
- The **metabolome** is the complete set of small molecules (metabolites) in a sample.
- Metabolites include sugars, amino acids, lipids and organic acids.
- They reflect the current activity of cells, closest to the phenotype.
- Levels change quickly with diet, drugs and disease.
H: Methods and uses
- **Mass spectrometry**, often with chromatography, measures many metabolites.
- **NMR spectroscopy** identifies and quantifies metabolites without destroying samples.
- **Targeted** methods measure chosen metabolites; **untargeted** methods measure as many as possible.
- Uses: biomarkers, nutrition, toxicology and newborn screening.
P: Newborn blood spot screening in the UK uses mass spectrometry to detect metabolic disorders such as phenylketonuria. Metabolomics data are complex, because metabolites vary widely in chemistry and concentration. Combining metabolomics with genomics and proteomics gives a fuller picture of biology.
X: Screening for PKU.
> A newborn's heel is pricked and blood spotted on a card.
> Mass spectrometry measures phenylalanine levels.
> A very high level suggests phenylketonuria.
> Early diet treatment prevents brain damage.
K: Metabolomics measures the small molecules of the metabolome, which reflect current cell activity, using mass spectrometry and NMR in targeted or untargeted ways, with uses including biomarkers and newborn screening.
!: Thinking metabolite levels are stable over time. They change rapidly with diet, drugs and time of day.
EV: established | Tandem mass spectrometry newborn screening detects inherited metabolic disorders early (Chace, Kalas and Naylor, 2003).
T: Metabolome | The complete set of small molecules in a sample
T: Metabolite | A small molecule involved in metabolism
T: NMR spectroscopy | A technique using magnetic fields to identify molecules
SUM: Small molecules.
SUM: Mass spec and NMR.
SUM: Biomarkers and screening.
SRC: Chace D. H., Kalas T. A. and Naylor E. W., "Use of tandem mass spectrometry for multianalyte screening of dried blood specimens from newborns", Clinical Chemistry 49(11), 1797–1817 | primary | 2003
SRC: Wishart D. S., "Metabolomics for investigating physiological and pathophysiological processes", Physiological Reviews 99(4), 1819–1875 | primary | 2019
Q: What is the metabolome? | The complete set of small molecules in a sample.
Q: Which disorder is detected by measuring phenylalanine in newborns? | Phenylketonuria.
M1#biology-u13-14-q1@1: Which technique can identify metabolites without destroying the sample? | NMR spectroscopy | Mass spectrometry | Gel electrophoresis | DNA sequencing | NMR measures molecules in intact samples.
M2#biology-u13-14-q2@2: Why is the metabolome said to be closest to the phenotype? | Metabolites reflect what cells are doing right now | Metabolites are inherited unchanged | The metabolome never changes | Metabolites are made of DNA | Small molecules show current cell activity.
MATCH1#biology-u13-14-q3@2: Match each term to its meaning. | Targeted = Chosen metabolites ; Untargeted = As many as possible ; Metabolite = Small molecule ; Biomarker = Disease indicator | Metabolomics has several approaches.
M3#biology-u13-14-q4@3: Why are metabolomics data challenging? | Metabolites vary widely in chemistry and concentration | All metabolites are chemically identical | Metabolites cannot be measured | Data are always tiny | Chemically diverse molecules at varied levels need different methods.
SA2#biology-u13-14-q5@1,3: Describe metabolomics and its uses. | The metabolome is the complete set of small molecules, such as sugars, amino acids and lipids, reflecting current cell activity and changing quickly with diet and disease. Metabolites are measured by mass spectrometry, often with chromatography, and NMR spectroscopy, using targeted or untargeted approaches. Uses include biomarkers, nutrition, toxicology and newborn screening for phenylketonuria. Data are challenging because metabolites vary widely, and integration with other omics gives a fuller picture. | Definition ; Mass spectrometry ; NMR ; Approaches ; Applications

## Structural bioinformatics
LV: Year 1 · Application
S: Structural bioinformatics studies the 3D shapes of biological molecules. This lesson explains how structures are determined and analysed.
O: Explain why 3D structure matters
O: Describe experimental methods for determining structures
O: Describe how structures are compared and classified
H: Structure and function
- A protein's 3D shape determines its function.
- Structures reveal active sites, binding sites and mechanisms.
- Similar structures can occur even when sequences are very different.
H: Methods and analysis
- **X-ray crystallography**: diffraction from protein crystals.
- **NMR spectroscopy**: structures of small proteins in solution.
- **Cryo-electron microscopy**: images of frozen molecules, good for large complexes.
- Structures are stored in the **PDB**.
- **CATH** and **SCOP** classify protein structures into families and folds.
- Structural alignment compares shapes using **RMSD**.
P: Structure is more conserved than sequence, so distantly related proteins may share a fold despite little sequence similarity. Rosalind Franklin's X-ray diffraction images of DNA were crucial to the double helix model. Structural information guides drug design by revealing binding pockets.
X: Same fold, different sequence.
> Two enzymes share only 15% sequence identity.
> Sequence alignment suggests they are unrelated.
> Their 3D structures superimpose closely.
> They likely share a distant common ancestor.
K: Structural bioinformatics studies 3D molecular shapes determined by X-ray crystallography, NMR and cryo-EM, stored in the PDB, classified by CATH and SCOP and compared by RMSD, revealing function and distant relationships.
!: Thinking similar function always requires similar sequence. Structure is often more conserved than sequence.
EV: established | Protein structure is more conserved than sequence during evolution (Chothia and Lesk, 1986).
T: X-ray crystallography | Determining structure from crystal diffraction
T: RMSD | Root-mean-square deviation, measuring structural difference
T: Protein fold | The overall 3D arrangement of a protein
SUM: Shape determines function.
SUM: Crystallography, NMR, cryo-EM.
SUM: Structure is conserved.
SRC: Chothia C. and Lesk A. M., "The relation between the divergence of sequence and structure in proteins", EMBO Journal 5(4), 823–826 | primary | 1986
SRC: Berman H. M. et al., "The Protein Data Bank", Nucleic Acids Research 28(1), 235–242 | primary | 2000
Q: What does RMSD measure? | The difference between two superimposed structures.
Q: Name three methods for determining protein structures. | X-ray crystallography, NMR and cryo-electron microscopy.
M1#biology-u13-15-q1@1: Which method is best suited to large protein complexes? | Cryo-electron microscopy | Gel electrophoresis | PCR amplification | Light microscopy | Cryo-EM images large frozen assemblies that are hard to crystallise.
M2#biology-u13-15-q2@2: Why can distantly related proteins share a fold? | Structure is more conserved than sequence | Sequences never change | All proteins have the same fold | Folds are random | Shape is maintained by selection while sequences drift.
MATCH1#biology-u13-15-q3@2: Match each resource to its role. | PDB = Structure archive ; CATH = Structure classification ; RMSD = Structural difference ; Cryo-EM = Imaging frozen molecules | Structural bioinformatics uses several tools.
M3#biology-u13-15-q4@3: How does structural information help drug design? | It reveals binding pockets where drugs can fit | It shows the DNA sequence | It removes the need for testing | It measures blood levels | Knowing shape guides design of fitting molecules.
SA2#biology-u13-15-q5@1,3: Describe structural bioinformatics and its uses. | A protein's 3D structure determines its function by forming active and binding sites. Structures are determined by X-ray crystallography, NMR for small proteins in solution and cryo-electron microscopy for large complexes, and stored in the PDB. CATH and SCOP classify folds, and RMSD measures structural difference. Structure is more conserved than sequence, so distant relatives may share a fold. Structural information reveals mechanisms and binding pockets for drug design. | Structure and function ; Methods ; Databases ; Comparison ; Drug design

## Protein structure prediction
LV: Year 1 · Biological reasoning
S: Computers can now predict protein structures from sequence. This lesson explains how prediction works and how AlphaFold changed the field.
O: Describe homology modelling and ab initio prediction
O: Explain how AlphaFold predicts structures
O: Evaluate the limitations of predicted structures
H: Methods
- **Homology modelling**: builds a model using a related protein of known structure as a template.
- **Ab initio prediction**: predicts structure from physics and sequence alone.
- **CASP** competitions test prediction methods blindly.
- **Deep learning** methods learn patterns from known structures.
H: AlphaFold
- **AlphaFold2** (2020) predicted many structures with near-experimental accuracy.
- It uses multiple sequence alignments and neural networks.
- The **AlphaFold Protein Structure Database** contains over 200 million predicted structures.
- Confidence scores (pLDDT) show reliability for each region.
P: Demis Hassabis and John Jumper shared the 2024 Nobel Prize in Chemistry for AlphaFold, with David Baker for protein design. Predictions are less reliable for disordered regions, protein complexes and effects of mutations. Predicted structures are hypotheses that are best confirmed by experiment.
X: Using confidence scores.
> A researcher downloads an AlphaFold model.
> Most of the protein has high confidence scores.
> One loop has very low confidence.
> The loop may be flexible or disordered, so it is interpreted cautiously.
K: Protein structures are predicted by homology modelling, ab initio methods and deep learning; AlphaFold predicts many structures with high accuracy and confidence scores, but disordered regions, complexes and mutations remain challenging.
!: Treating predicted structures as experimentally proven. They are models that should be checked against evidence.
EV: established | AlphaFold achieved highly accurate protein structure prediction (Jumper et al., 2021).
T: Homology modelling | Building a model from a related known structure
T: AlphaFold | A deep learning system predicting protein structures
T: pLDDT | A confidence score for each region of a predicted structure
SUM: Homology and ab initio.
SUM: AlphaFold.
SUM: Limits of prediction.
SRC: Jumper J. et al., "Highly accurate protein structure prediction with AlphaFold", Nature 596, 583–589 | primary | 2021
SRC: Nobel Assembly, The Nobel Prize in Chemistry 2024 | guidance | 2024 | https://www.nobelprize.org/prizes/chemistry/2024/summary/
Q: What is homology modelling? | Building a structural model using a related protein of known structure.
Q: What does a low pLDDT score suggest? | Low confidence, possibly a flexible or disordered region.
M1#biology-u13-16-q1@1: What does CASP test? | Protein structure prediction methods | DNA sequencing accuracy | Antibody production | Gene expression levels | CASP blindly assesses how well methods predict unknown structures.
M2#biology-u13-16-q2@2: Why are AlphaFold predictions less reliable for some regions? | Disordered regions lack a single fixed structure | All regions are equally reliable | AlphaFold ignores sequences | Confidence scores are random | Flexible regions have no single shape to predict.
MATCH1#biology-u13-16-q3@2: Match each method to its basis. | Homology modelling = Template structure ; Ab initio = Physics and sequence ; AlphaFold = Deep learning ; CASP = Blind testing | Prediction uses several approaches.
M3#biology-u13-16-q4@3: Why should predicted structures be confirmed experimentally? | Predictions are models that may contain errors | Experiments are always less accurate | Predictions never differ from reality | Predictions include all complexes | Validation avoids relying on mistaken models.
SA2#biology-u13-16-q5@1,3: Explain how protein structures are predicted and the limitations of prediction. | Homology modelling builds structures from related templates, ab initio prediction uses physics and sequence and deep learning learns from known structures; CASP tests methods blindly. AlphaFold2 uses multiple sequence alignments and neural networks to predict structures with near-experimental accuracy, and its database holds over 200 million predictions with pLDDT confidence scores. It won the 2024 Nobel Prize. Limitations include disordered regions, complexes and mutation effects, so predictions should be validated. | Homology modelling ; Ab initio ; AlphaFold ; Confidence ; Limitations

## Molecular visualisation
LV: Year 1 · Foundation
S: Molecular visualisation software displays molecules in 3D. This lesson describes common representations and tools.
O: Describe common representations of molecular structures
O: Describe software used for molecular visualisation
O: Explain how visualisation aids understanding
H: Representations
- **Ribbon (cartoon)**: shows secondary structure, with helices as coils and sheets as arrows.
- **Ball-and-stick**: shows atoms and bonds.
- **Space-filling**: shows atoms at their true size, revealing shape.
- **Surface**: shows the molecular surface, often coloured by charge or hydrophobicity.
H: Tools and uses
- Software includes **PyMOL**, **ChimeraX** and the web-based **Mol*** viewer.
- Users can rotate, zoom and highlight residues.
- Colouring by property shows charged or hydrophobic regions.
- Visualisation helps explain mechanisms, mutations and drug binding.
P: Choosing the right representation depends on the question: ribbons for overall fold, sticks for active sites and surfaces for binding pockets. The PDB website lets anyone view structures in a browser. Visualisation is also important in teaching and communicating science.
X: Exploring an enzyme.
> A student loads an enzyme structure into Mol*.
> The ribbon view shows helices and sheets.
> They switch the active site residues to stick view.
> A surface view shows a pocket where the substrate fits.
K: Molecular visualisation uses ribbon, ball-and-stick, space-filling and surface representations in tools such as PyMOL, ChimeraX and Mol*, helping explain folds, active sites, mutations and drug binding.
!: Thinking a ribbon diagram shows every atom. Ribbons simplify the backbone and hide side chains.
EV: established | Mol* provides web-based visualisation of PDB structures (Sehnal et al., 2021).
T: Ribbon diagram | A simplified view showing secondary structure
T: Space-filling model | A representation showing atoms at true size
T: Molecular surface | The outer surface of a molecule
SUM: Ribbons, sticks, spheres, surfaces.
SUM: PyMOL, ChimeraX, Mol*.
SUM: Choose the view for the question.
SRC: Sehnal D. et al., "Mol* Viewer: modern web app for 3D visualization and analysis of large biomolecular structures", Nucleic Acids Research 49(W1), W431–W437 | primary | 2021
SRC: RCSB Protein Data Bank, PDB-101 educational resources | guidance | 2024 | https://pdb101.rcsb.org/
Q: What does a ribbon diagram show? | The secondary structure of a protein, such as helices and sheets.
Q: Name a molecular visualisation tool. | PyMOL, ChimeraX or Mol*.
M1#biology-u13-17-q1@1: Which representation shows atoms at their true size? | Space-filling | Ribbon | Wireframe | Cartoon | Space-filling spheres reflect atomic radii.
M2#biology-u13-17-q2@2: Which view best shows a drug-binding pocket? | A molecular surface | A plain ribbon | A sequence list | A line graph | Surfaces reveal the shape of pockets where molecules can bind.
MATCH1#biology-u13-17-q3@1: Match each representation to its use. | Ribbon = Overall fold ; Stick = Active site detail ; Space-filling = Molecular size ; Surface = Binding pocket | Representations suit different questions.
M3#biology-u13-17-q4@3: Why might a surface be coloured by charge? | To show regions that attract oppositely charged molecules | To make the image look decorative only | To hide the structure | To show the DNA sequence | Charge patterns help explain which molecules bind where.
SA2#biology-u13-17-q5@1,3: Describe how molecules are visualised and why. | Ribbon diagrams show secondary structure, ball-and-stick models show atoms and bonds, space-filling models show atomic size and surfaces show molecular shape, often coloured by charge or hydrophobicity. Tools include PyMOL, ChimeraX and the web-based Mol*. Users rotate, zoom and highlight residues. The right view depends on the question: ribbons for folds, sticks for active sites and surfaces for pockets. Visualisation explains mechanisms, mutations and drug binding and supports teaching. | Representations ; Tools ; Interaction ; Choosing views ; Uses

## Biological networks
LV: Year 1 · Application
S: Biological networks represent interactions between molecules. This lesson explains network types and properties.
O: Describe types of biological network
O: Explain nodes, edges and hubs
O: Explain how network analysis reveals key components
H: Types
- **Protein-protein interaction** networks.
- **Gene regulatory** networks of transcription factors and targets.
- **Metabolic** networks of reactions and metabolites.
- **Signalling** networks of pathways.
H: Properties
- **Nodes** are molecules; **edges** are interactions.
- **Degree**: the number of connections of a node.
- **Hubs** are highly connected nodes.
- Many biological networks are **scale-free**: most nodes have few links, a few have many.
- **Modules** are groups of densely connected nodes performing related functions.
P: Deleting hub proteins is more often lethal in yeast than deleting poorly connected proteins. Databases such as STRING collect known and predicted interactions. Network analysis helps identify drug targets and genes involved in disease.
X: A hub protein.
> In a protein interaction network, p53 connects to many other proteins.
> It is a hub involved in DNA repair, cell cycle and apoptosis.
> Mutation of p53 disrupts many processes.
> This helps explain its role in cancer.
K: Biological networks include protein interaction, gene regulatory, metabolic and signalling networks; nodes and edges form networks with hubs and modules, and analysis identifies key genes and drug targets.
!: Thinking every interaction in a database is confirmed. Many are predicted or come from noisy experiments.
EV: established | Highly connected proteins are more likely to be essential in yeast (Jeong et al., 2001).
T: Node | A molecule in a network
T: Edge | An interaction between nodes
T: Hub | A highly connected node
SUM: Four network types.
SUM: Nodes, edges, hubs.
SUM: Finding key components.
SRC: Jeong H. et al., "Lethality and centrality in protein networks", Nature 411, 41–42 | primary | 2001
SRC: Szklarczyk D. et al., "The STRING database in 2023", Nucleic Acids Research 51(D1), D638–D646 | primary | 2023
Q: What is a hub in a network? | A highly connected node.
Q: What does an edge represent? | An interaction between two nodes.
M1#biology-u13-18-q1@1: What is the degree of a node? | The number of connections it has | Its molecular mass | Its position in the genome | Its colour in a diagram | Degree counts the edges linked to a node.
M2#biology-u13-18-q2@2: Why are hub proteins often essential? | Many processes depend on their interactions | They have hardly any interactions | They are never expressed | They are all enzymes | Losing a hub disrupts many interactions and processes at once.
MATCH1#biology-u13-18-q3@2: Match each network to its content. | Protein interaction = Binding proteins ; Gene regulatory = Factors and targets ; Metabolic = Reactions ; Signalling = Pathways | Biological networks differ.
M3#biology-u13-18-q4@3: What does "scale-free" mean in network biology? | Most nodes have few links and a few have many | All nodes have equal links | Networks have no edges | Networks are infinitely large | A few highly connected hubs dominate the network's connectivity.
SA2#biology-u13-18-q5@1,3: Describe biological networks and what network analysis reveals. | Biological networks include protein-protein interaction, gene regulatory, metabolic and signalling networks. Nodes are molecules and edges are interactions, and degree counts connections. Many networks are scale-free, with most nodes having few links and a few hubs having many, and modules perform related functions. Hub proteins, such as p53, are often essential. Databases such as STRING collect interactions, and network analysis identifies disease genes and drug targets, though many interactions are predicted. | Types ; Nodes and edges ; Hubs ; Scale-free ; Applications

## Systems biology
LV: Year 1 · Biological reasoning
S: Systems biology studies how components interact to produce the behaviour of whole systems. This lesson explains its approach and models.
O: Define systems biology
O: Describe how mathematical models represent biological systems
O: Explain emergent properties and feedback
H: Approach
- Systems biology studies **whole systems** rather than single parts.
- It combines experiments, omics data and **mathematical modelling**.
- It cycles between model predictions and experimental tests.
- **Emergent properties** arise from interactions, not from parts alone.
H: Models
- **Ordinary differential equations** model changing concentrations over time.
- **Feedback loops**: negative feedback gives stability; positive feedback can create switches.
- **Oscillators** produce rhythms, such as circadian clocks.
- Models are tested by comparing predictions with data.
P: Denis Noble built some of the first computer models of the heart's electrical activity in the 1960s. Systems biology models are used to predict drug effects and design synthetic circuits. Models are simplifications and depend on accurate parameters.
X: Modelling a circadian clock.
> A gene product inhibits its own transcription after a delay.
> A model of this negative feedback loop is built.
> The model predicts levels rise and fall about every 24 hours.
> Experiments confirm the oscillation in cells.
K: Systems biology studies how interacting components produce system behaviour, combining data with mathematical models such as differential equations, and explains emergent properties, feedback, switches and oscillations.
!: Thinking understanding each part explains the whole system. Interactions create emergent properties.
EV: established | Early computer models of heart cells helped found systems physiology (Noble, 1962).
T: Systems biology | Studying interactions within whole biological systems
T: Emergent property | A property arising from interactions between parts
T: Feedback loop | A process in which output affects its own production
SUM: Whole systems.
SUM: Mathematical models.
SUM: Feedback and emergence.
SRC: Noble D., "A modification of the Hodgkin-Huxley equations applicable to Purkinje fibre action and pace-maker potentials", Journal of Physiology 160(2), 317–352 | primary | 1962
SRC: Alon U., An Introduction to Systems Biology, 2nd edition, CRC Press | secondary | 2019
Q: What is an emergent property? | A property arising from interactions between parts rather than from parts alone.
Q: What type of feedback can create oscillations such as circadian rhythms? | Delayed negative feedback.
M1#biology-u13-19-q1@1: Which kind of model describes concentrations changing over time? | Ordinary differential equations | A pie chart | A sequence alignment | A FASTA file | Differential equations track rates of change.
M2#biology-u13-19-q2@2: What does positive feedback often create in biological systems? | Switch-like behaviour | Perfect stability | No change at all | Random noise only | Self-reinforcing loops can lock into on or off states.
MATCH1#biology-u13-19-q3@2: Match each feature to its effect. | Negative feedback = Stability ; Positive feedback = Switches ; Delayed negative feedback = Oscillation ; Emergence = Whole-system property | System behaviours have causes.
M3#biology-u13-19-q4@3: Why must systems biology models be tested experimentally? | Models are simplifications that may be wrong | Experiments are never needed | Models always match reality | Data cannot be collected | Predictions must be checked against observations.
SA2#biology-u13-19-q5@1,3: Explain the approach of systems biology. | Systems biology studies whole systems, combining experiments, omics data and mathematical models, and cycling between predictions and tests. Emergent properties arise from interactions between parts. Ordinary differential equations model changing concentrations; negative feedback gives stability, positive feedback creates switches and delayed negative feedback produces oscillations such as circadian clocks. Models, such as Noble's heart models, predict drug effects but are simplifications needing accurate parameters and experimental testing. | Whole systems ; Emergence ; Models ; Feedback ; Testing

## Population genomics
LV: Year 1 · Application
S: Population genomics uses genome-wide data to study variation within and between populations. This lesson explains its methods and findings.
O: Describe how genetic variation is measured across genomes
O: Explain how population structure and ancestry are inferred
O: Describe signatures of natural selection in genomes
H: Variation
- **Single nucleotide polymorphisms** (SNPs) are the most common variants.
- **Allele frequencies** are estimated across many genomes.
- Projects such as the **1000 Genomes Project** catalogued human variation.
- **UK Biobank** holds genetic and health data on about 500,000 people.
H: Structure and selection
- **Principal component analysis** groups individuals by genetic similarity.
- **Admixture** analysis estimates ancestry proportions.
- **Selective sweeps** reduce variation around beneficial alleles.
- **F_ST** measures differentiation between populations.
P: Genomic studies show that most human genetic variation occurs within populations rather than between them. Lactase persistence shows a strong signal of recent selection in populations with a history of dairying. Ancient DNA has revealed past migrations and mixing.
X: Detecting selection for lactase persistence.
> Genomes from European populations are compared.
> Around the lactase gene, a long stretch of DNA shows very little variation.
> This pattern indicates a selective sweep.
> The allele allowing adults to digest milk spread rapidly.
K: Population genomics measures SNPs and allele frequencies across many genomes, infers structure and ancestry with PCA and admixture analysis and detects selection through sweeps and F_ST, revealing human history and adaptation.
!: Thinking human populations are genetically very distinct. Most variation occurs within populations.
EV: established | The 1000 Genomes Project catalogued common human genetic variation (1000 Genomes Project Consortium, 2015).
T: SNP | A single nucleotide polymorphism
T: Selective sweep | Reduced variation around a strongly selected allele
T: F_ST | A measure of genetic differentiation between populations
SUM: SNPs and allele frequencies.
SUM: Structure and ancestry.
SUM: Signatures of selection.
SRC: 1000 Genomes Project Consortium, "A global reference for human genetic variation", Nature 526, 68–74 | primary | 2015
SRC: Bycroft C. et al., "The UK Biobank resource with deep phenotyping and genomic data", Nature 562, 203–209 | primary | 2018
Q: What is a SNP? | A single nucleotide polymorphism, a variant at one base.
Q: What does F_ST measure? | Genetic differentiation between populations.
M1#biology-u13-20-q1@1: Which resource holds genetic and health data on about 500,000 UK people? | UK Biobank | The PDB | GenBank only | Pfam | UK Biobank links genomes with health records.
M2#biology-u13-20-q2@2: What pattern indicates a selective sweep? | Reduced variation around a beneficial allele | Increased variation everywhere | Random gaps in sequence | Extra chromosomes | Linked variants hitchhike with the selected allele.
MATCH1#biology-u13-20-q3@2: Match each method to its purpose. | PCA = Groups by similarity ; Admixture = Ancestry proportions ; F_ST = Differentiation ; Sweep scan = Detects selection | Population genomics uses several methods.
M3#biology-u13-20-q4@3: Where does most human genetic variation occur? | Within populations | Between continents only | Only in ancient genomes | In mitochondria only | Individuals within a group differ more than groups differ on average.
SA2#biology-u13-20-q5@1,3: Describe population genomics and what it reveals. | Population genomics measures SNPs and allele frequencies across many genomes, from resources such as the 1000 Genomes Project and UK Biobank. Principal component analysis groups individuals by similarity, admixture analysis estimates ancestry and F_ST measures differentiation. Selective sweeps, such as around the lactase gene, reveal recent selection. Most human variation occurs within populations, and ancient DNA reveals past migrations. | Variation ; Resources ; Structure and ancestry ; Selection ; Findings

## Variant analysis
LV: Year 1 · Application
S: Variant analysis identifies and interprets differences in a genome compared with a reference. This lesson explains variant calling and classification.
O: Describe the variant calling pipeline
O: Describe types of genetic variant
O: Explain how variants are classified clinically
H: Calling variants
- Reads are **aligned** to a reference genome.
- Differences are identified by **variant calling** software.
- Variants are filtered by quality, depth and frequency.
- Results are stored in **VCF** (Variant Call Format) files.
H: Types and classification
- **SNVs**: single base changes.
- **Indels**: small insertions or deletions.
- **Structural variants**: large deletions, duplications and rearrangements.
- Clinical classes: **pathogenic**, **likely pathogenic**, **uncertain significance**, **likely benign** and **benign**.
P: Population databases such as gnomAD show how common variants are; a variant common in healthy people is unlikely to cause a rare disease. Prediction tools estimate whether a change damages a protein. Guidelines from the American College of Medical Genetics and adapted by UK bodies standardise classification.
X: Classifying a variant.
> A patient has a missense variant in a heart gene.
> It is absent from gnomAD and predicted to damage the protein.
> It is found in affected relatives but not unaffected ones.
> Combined evidence supports "likely pathogenic".
K: Variant analysis aligns reads, calls and filters variants into VCF files, distinguishes SNVs, indels and structural variants and classifies them from pathogenic to benign using population frequency, predictions and family evidence.
!: Thinking every rare variant causes disease. Most rare variants are harmless.
EV: established | ACMG guidelines standardise clinical variant classification (Richards et al., 2015).
T: Variant calling | Identifying differences from a reference genome
T: VCF | A file format for storing variants
T: Indel | A small insertion or deletion
SUM: Align, call, filter.
SUM: SNVs, indels, structural.
SUM: Five clinical classes.
SRC: Richards S. et al., "Standards and guidelines for the interpretation of sequence variants", Genetics in Medicine 17(5), 405–424 | primary | 2015
SRC: Karczewski K. J. et al., "The mutational constraint spectrum quantified from variation in 141,456 humans", Nature 581, 434–443 | primary | 2020
Q: What is an indel? | A small insertion or deletion.
Q: What file format stores variant calls? | VCF (Variant Call Format).
M1#biology-u13-21-q1@1: Which database shows how common variants are in the population? | gnomAD | Pfam | PDB | Mol* | gnomAD records variant frequencies in many people.
M2#biology-u13-21-q2@2: Why is a common variant unlikely to cause a rare disease? | Many healthy people carry it | Common variants cannot be sequenced | Rare diseases have no genetic cause | Common variants are always pathogenic | Frequency in healthy people argues against causation.
MATCH1#biology-u13-21-q3@2: Match each variant type to its size. | SNV = One base ; Indel = Few bases ; Structural variant = Large region ; Copy number variant = Repeated segment | Variants vary in size.
M3#biology-u13-21-q4@3: How does family segregation support pathogenicity? | The variant is found in affected but not unaffected relatives | It appears in every single person tested | It is absent from all relatives | It only occurs in unrelated people | Tracking with disease supports a causal role.
SA2#biology-u13-21-q5@1,3: Describe how genetic variants are identified and classified. | Reads are aligned to a reference genome, variant calling software identifies differences and variants are filtered by quality and depth and stored in VCF files. Types include SNVs, indels and structural variants. Clinical classification uses five categories from pathogenic to benign, combining population frequency in databases such as gnomAD, prediction tools and family segregation, following standard guidelines. Most rare variants are harmless. | Alignment and calling ; Filtering ; Variant types ; Evidence ; Classification

## Precision medicine
LV: Year 1 · Application
S: Precision medicine tailors prevention and treatment to individual characteristics. This lesson explains its approaches and challenges.
O: Define precision medicine
O: Describe examples in cancer and pharmacogenomics
O: Evaluate the challenges of precision medicine
H: Approaches
- **Precision medicine** uses genetic, molecular and clinical information to tailor care.
- **Targeted cancer therapies** match drugs to tumour mutations.
- **Pharmacogenomics** adjusts drug choice or dose based on genes.
- **Polygenic risk scores** estimate disease risk from many variants.
H: Challenges
- High costs of testing and drugs.
- Most genetic studies have used people of European ancestry, reducing accuracy for others.
- Data privacy and consent.
- Not all diseases have clear molecular targets.
P: Trastuzumab treats breast cancers overexpressing HER2; testing tumours for HER2 decides who benefits. Testing for DPYD variants before fluoropyrimidine chemotherapy reduces serious toxicity and is recommended in the NHS. Polygenic risk scores currently add limited predictive value for many conditions.
X: Avoiding toxicity.
> A patient is due to start fluorouracil chemotherapy.
> A test finds a DPYD variant that slows drug breakdown.
> At a standard dose, the drug could build up to dangerous levels.
> The dose is reduced, avoiding severe side effects.
K: Precision medicine tailors care using genetic, molecular and clinical data, as in targeted cancer therapy and pharmacogenomic testing, but faces challenges of cost, unequal data representation, privacy and limited targets.
!: Thinking precision medicine means every patient gets a unique drug. It usually means choosing among existing options using biomarkers.
EV: contested | Polygenic risk scores show promise but currently add limited predictive value for many conditions (Torkamani, Wineinger and Topol, 2018).
T: Precision medicine | Tailoring care to individual characteristics
T: Pharmacogenomics | Using genes to guide drug choice and dose
T: Polygenic risk score | A risk estimate from many genetic variants
SUM: Tailored care.
SUM: Targeted therapy and pharmacogenomics.
SUM: Challenges.
SRC: Torkamani A., Wineinger N. E. and Topol E. J., "The personal and clinical utility of polygenic risk scores", Nature Reviews Genetics 19, 581–590 | primary | 2018
SRC: NHS England, DPYD genotyping before fluoropyrimidine chemotherapy | guidance | 2024 | https://www.england.nhs.uk/
Q: What is pharmacogenomics? | Using genetic information to guide drug choice and dose.
Q: What does a HER2 test decide? | Whether a breast cancer patient is likely to benefit from trastuzumab.
M1#biology-u13-22-q1@1: Which test reduces toxicity from fluorouracil chemotherapy? | DPYD genotyping | HER2 staining | BRCA testing | Blood glucose testing | DPYD variants slow fluorouracil breakdown.
M2#biology-u13-22-q2@2: Why can genetic risk predictions be less accurate for some groups? | Most studies have used people of European ancestry | Genes differ completely between groups | Predictions ignore genes | Some groups have no DNA | Underrepresentation reduces accuracy in others.
MATCH1#biology-u13-22-q3@2: Match each example to its approach. | Trastuzumab = Targeted therapy ; DPYD test = Pharmacogenomics ; Polygenic score = Risk estimate ; Tumour sequencing = Molecular profiling | Precision medicine uses varied tools.
M3#biology-u13-22-q4@3: What does precision medicine usually involve in practice? | Choosing among existing treatments using biomarkers | Inventing a new drug for every patient | Avoiding all genetic tests | Treating everyone identically | Biomarkers guide selection of suitable options.
SA2#biology-u13-22-q5@1,3: Explain precision medicine and evaluate its challenges. | Precision medicine uses genetic, molecular and clinical information to tailor care. Targeted cancer therapies match drugs to tumour changes, such as trastuzumab for HER2-positive breast cancer; pharmacogenomics adjusts drugs and doses, such as DPYD testing before fluorouracil; and polygenic risk scores estimate risk from many variants, though with limited value for many conditions. Challenges include cost, underrepresentation of non-European ancestries, privacy and diseases without clear targets. | Definition ; Targeted therapy ; Pharmacogenomics ; Polygenic scores ; Challenges

## Computational drug discovery
LV: Year 1 · Application
S: Computational methods speed up the search for new medicines. This lesson explains virtual screening, docking and AI in drug discovery.
O: Describe the stages of drug discovery
O: Explain molecular docking and virtual screening
O: Describe the role of machine learning in drug discovery
H: Drug discovery
- Identify a **target**, often a protein involved in disease.
- Find **hits** that bind the target.
- Optimise **leads** for potency, safety and how the body handles them.
- Test in preclinical studies and clinical trials.
H: Computational methods
- **Molecular docking** predicts how a small molecule fits into a binding site.
- **Virtual screening** docks millions of compounds to prioritise candidates.
- **QSAR** relates chemical structure to activity.
- **Machine learning** predicts properties and suggests new molecules.
P: Developing a new medicine typically takes over a decade and costs over £1 billion, with most candidates failing. Computational methods reduce costs by prioritising compounds for testing, but predictions must be confirmed experimentally. Structure-based design contributed to HIV protease inhibitors in the 1990s.
X: A virtual screen.
> A target enzyme's structure is known.
> One million compounds are docked into its active site.
> The top 500 scoring compounds are selected.
> Laboratory tests find several that inhibit the enzyme.
K: Drug discovery moves from target to hits, leads and trials; computational methods such as docking, virtual screening, QSAR and machine learning prioritise compounds, saving time and money, but must be validated experimentally.
!: Thinking a high docking score proves a drug works. Docking predictions often fail in experiments.
EV: established | Structure-based design contributed to the development of HIV protease inhibitors (Wlodawer and Vondrasek, 1998).
T: Molecular docking | Predicting how a molecule fits a binding site
T: Virtual screening | Computationally testing many compounds
T: Lead compound | A promising molecule optimised for development
SUM: Target to trial.
SUM: Docking and screening.
SUM: Machine learning.
SRC: Wlodawer A. and Vondrasek J., "Inhibitors of HIV-1 protease: a major success of structure-assisted drug design", Annual Review of Biophysics and Biomolecular Structure 27, 249–284 | primary | 1998
SRC: Association of the British Pharmaceutical Industry, Medicines discovery and development | guidance | 2024 | https://www.abpi.org.uk/
Q: What is molecular docking? | Predicting how a small molecule fits into a binding site.
Q: What is virtual screening? | Computationally testing many compounds against a target.
M1#biology-u13-23-q1@1: What is the first stage of drug discovery? | Identifying a target | Running clinical trials | Marketing the drug | Manufacturing tablets | A disease-related target must be chosen first.
M2#biology-u13-23-q2@2: How do computational methods reduce drug discovery costs? | They prioritise the most promising compounds for testing | They replace all experiments | They make clinical trials unnecessary | They guarantee success | Fewer compounds need costly laboratory tests.
MATCH1#biology-u13-23-q3@2: Match each method to its role. | Docking = Fit prediction ; Virtual screening = Many compounds ; QSAR = Structure-activity link ; Machine learning = Property prediction | Computational tools aid discovery.
M3#biology-u13-23-q4@3: Why must docking hits be tested in the laboratory? | Docking predictions are often inaccurate | Laboratories cannot test molecules | Docking is always correct | Tests are cheaper than computers | Experimental confirmation avoids false leads.
SA2#biology-u13-23-q5@1,3: Describe how computational methods aid drug discovery. | Drug discovery identifies a target, finds hits, optimises leads and tests them preclinically and in clinical trials, taking over a decade and costing over £1 billion. Molecular docking predicts how compounds fit binding sites, virtual screening docks millions of compounds, QSAR relates structure to activity and machine learning predicts properties and suggests molecules. These prioritise candidates and reduce costs, as structure-based design did for HIV protease inhibitors, but predictions must be validated. | Stages ; Docking ; Screening ; Machine learning ; Validation

## Biological data science
LV: Year 1 · Application
S: Biological data science applies statistics and machine learning to large biological datasets. This lesson introduces key methods.
O: Describe common steps in analysing biological data
O: Distinguish supervised and unsupervised learning
O: Explain the risk of overfitting
H: Workflow
- **Clean** data: handle missing values and errors.
- **Explore** with summary statistics and plots.
- **Reduce dimensions**, such as with PCA, to see patterns.
- **Model** and **validate** results.
H: Machine learning
- **Supervised learning** predicts known labels, such as disease or healthy.
- **Unsupervised learning** finds groups without labels, such as clustering cells.
- **Overfitting**: a model fits training data well but fails on new data.
- **Cross-validation** and **test sets** check generalisation.
P: Clustering single-cell RNA-seq data can reveal new cell types. With many features and few samples, overfitting is a major risk in biology. Biases in training data can lead to models that work poorly for some groups.
X: Detecting overfitting.
> A model predicts cancer from gene expression with 99% accuracy on training data.
> On a separate test set it achieves only 60%.
> The model learned noise specific to the training samples.
> It is overfitted and needs simplifying or more data.
K: Biological data science cleans, explores, reduces and models data; supervised learning predicts labels and unsupervised learning finds groups, and overfitting is avoided with cross-validation and independent test sets.
!: Judging a model by its accuracy on training data. Performance must be tested on new data.
EV: established | Overfitting is a central challenge when biological datasets have many features and few samples (Libbrecht and Noble, 2015).
T: Supervised learning | Learning to predict known labels
T: Unsupervised learning | Finding structure in unlabelled data
T: Overfitting | A model fitting training data but failing on new data
SUM: Clean, explore, model.
SUM: Supervised and unsupervised.
SUM: Avoid overfitting.
SRC: Libbrecht M. W. and Noble W. S., "Machine learning applications in genetics and genomics", Nature Reviews Genetics 16, 321–332 | primary | 2015
SRC: Alan Turing Institute, Data science and AI resources | guidance | 2024 | https://www.turing.ac.uk/
Q: What is unsupervised learning? | Finding structure, such as groups, in unlabelled data.
Q: What is overfitting? | When a model fits training data well but fails on new data.
M1#biology-u13-24-q1@1: Which method finds groups in data without labels? | Clustering | Supervised classification | Linear regression on labels | A t-test | Clustering groups similar samples without using labels.
M2#biology-u13-24-q2@2: How is overfitting detected? | By testing the model on independent data | By measuring training accuracy only | By adding more features | By removing test sets | Poor performance on new data reveals overfitting.
MATCH1#biology-u13-24-q3@2: Match each term to its meaning. | PCA = Dimension reduction ; Clustering = Grouping ; Cross-validation = Testing generalisation ; Test set = Independent check | Data science uses several tools.
M3#biology-u13-24-q4@3: Why is overfitting a particular risk in genomics? | There are many features and relatively few samples | Genomic datasets are always very small | Genomes have few genes | Samples are always identical | With many variables and few samples, models can fit random noise.
SA2#biology-u13-24-q5@1,3: Describe the methods of biological data science and how models are validated. | Data are cleaned to handle errors and missing values, explored with statistics and plots and reduced with methods such as PCA. Supervised learning predicts known labels, such as disease status, while unsupervised learning, such as clustering single-cell data, finds groups. Overfitting occurs when a model fits training data but fails on new data, a major risk with many features and few samples, so cross-validation and independent test sets are used. Biased data can harm some groups. | Cleaning and exploring ; Dimension reduction ; Supervised ; Unsupervised ; Overfitting

## Reproducible computational research
LV: Year 1 · Application
S: Reproducible research lets others repeat analyses and get the same results. This lesson describes practices for reproducible computational biology.
O: Explain why reproducibility matters
O: Describe tools for reproducible analysis
O: Describe the FAIR principles for data
H: Why it matters
- Others must be able to check and build on results.
- Analyses involve many steps, software versions and settings.
- Small changes can alter results.
- Many published analyses are hard to reproduce.
H: Practices
- **Version control**, such as Git, tracks changes to code.
- **Scripts** replace manual point-and-click steps.
- **Notebooks**, such as Jupyter, combine code, results and notes.
- **Containers** and environment files record software versions.
- **Workflow managers**, such as Snakemake and Nextflow, automate pipelines.
- **FAIR data**: Findable, Accessible, Interoperable and Reusable.
P: Funders such as UKRI require data management plans and encourage open data and code. Recording random seeds makes analyses with random steps repeatable. Reproducibility improves trust and saves time for future researchers, including the original authors.
X: Rerunning an old analysis.
> A researcher returns to an analysis after a year.
> Code is stored in Git with an environment file listing software versions.
> A workflow manager reruns every step automatically.
> The results match exactly, and a new dataset can be added easily.
K: Reproducible research uses version control, scripts, notebooks, containers and workflow managers to record every step, and FAIR principles make data findable, accessible, interoperable and reusable.
!: Thinking describing methods in words is enough. Code, versions and data are needed to reproduce analyses.
EV: established | The FAIR principles guide scientific data management and stewardship (Wilkinson et al., 2016).
T: Version control | Tracking changes to files over time
T: Container | A package recording software and its environment
T: FAIR | Findable, Accessible, Interoperable and Reusable data
SUM: Reproducibility builds trust.
SUM: Git, scripts, containers.
SUM: FAIR data.
SRC: Wilkinson M. D. et al., "The FAIR Guiding Principles for scientific data management and stewardship", Scientific Data 3, 160018 | primary | 2016
SRC: UK Research and Innovation, Open research and data management | guidance | 2024 | https://www.ukri.org/manage-your-award/publishing-your-research-findings/
Q: What does FAIR stand for? | Findable, Accessible, Interoperable and Reusable.
Q: What does version control do? | Tracks changes to code and files over time.
M1#biology-u13-25-q1@1: Which tool tracks changes to code? | Git | BLAST | PyMOL | GenBank | Git records every change to a project, so any version can be restored.
M2#biology-u13-25-q2@2: Why are software versions recorded? | Different versions can produce different results | Versions never affect results | It makes code run slower | Versions are only for decoration | Recorded environments allow exact reruns.
MATCH1#biology-u13-25-q3@2: Match each tool to its purpose. | Git = Version control ; Jupyter = Notebook ; Container = Software environment ; Snakemake = Workflow automation | Reproducibility uses several tools.
M3#biology-u13-25-q4@3: Why record random seeds in analyses? | So steps involving randomness give the same results when rerun | To make the results much more random each time | To hide the analysis | To speed up the computer | Fixed seeds make stochastic steps repeatable.
SA2#biology-u13-25-q5@1,3: Describe practices that make computational research reproducible. | Reproducibility lets others check and build on results, but analyses involve many steps, settings and software versions. Version control such as Git tracks code changes, scripts replace manual steps, notebooks combine code and notes, containers and environment files record software versions and workflow managers such as Snakemake automate pipelines. Random seeds are recorded. FAIR principles make data findable, accessible, interoperable and reusable, and funders such as UKRI encourage open data and code. | Why it matters ; Version control ; Scripts and notebooks ; Environments and workflows ; FAIR data
`;
