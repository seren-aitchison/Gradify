// Unit 54: Research and Professional Physics Skills. Format: kit/course/notes.js
export default `
## Reading and evaluating scientific papers
S: Reading research papers efficiently and critically is a core professional skill. Knowing how papers are structured, where to look first and which questions to ask lets you extract key results and judge whether the evidence supports the claims.
H: Structure of a paper
- **Title and abstract**: main claim and result.
- **Introduction**: context, gap, contribution.
- **Methods**: theory, experimental setup, simulations, analysis.
- **Results**: data, figures, tables, uncertainties.
- **Discussion and conclusions**: interpretation, limitations, outlook.
- **References and supplementary material**.
H: Reading strategy (three passes)
- **Pass 1** (5–10 min): title, abstract, figures, conclusions. Is it relevant?
- **Pass 2**: introduction and results in more detail; note key equations and figures.
- **Pass 3**: methods in depth; try to reproduce key steps or derivations.
- Take notes: claim, method, evidence, limitations, questions.
H: Evaluating critically
P: Are claims supported by data and uncertainties? Are systematics addressed? Are alternative explanations considered? Is the statistical significance appropriate? Do figures show error bars and clear axes? Is the work reproducible (data, code available)? How does it compare with previous work? Check citations, preprint vs published status, and whether results have been independently confirmed.
E: Significance ≈ (measured − expected)/uncertainty :: quick check of a claim
X: A paper reports a 2.5σ deviation from the Standard Model as "evidence for new physics". Your assessment?
> 2.5σ (p ≈ 0.006) is below the 3σ "evidence" and 5σ "discovery" conventions; look for look-elsewhere effects and systematic uncertainties
X: Which parts would you read first to decide relevance?
> Title, abstract, key figures and conclusions
K: Read papers in passes, extract claims and evidence, and evaluate critically for significance, systematics and reproducibility.
!: A published paper isn't automatically correct; independent confirmation matters.
Q: What is the three-pass approach to reading papers? | Skim for relevance, read for understanding of results, then study methods in depth.
Q: What should you check in a paper's figures? | Axes, units, error bars, sample sizes and whether they support the claims.
M1: The abstract contains: | A summary of the problem, method and main result | Full derivations | Raw data | References only | Brief overview.
M2: A key sign of reproducibility is: | Available data and code | Many authors | Long length | Famous journal | Others can check.

## Literature searches and systematic reviews
S: A literature search finds what is already known before starting research, avoiding duplication and building on others' work. Systematic reviews go further, using explicit methods to find, assess and synthesise all relevant studies on a question.
H: Searching effectively
- Databases: arXiv, INSPIRE-HEP (particle physics), NASA ADS (astrophysics), Web of Science, Scopus, Google Scholar.
- Keywords, synonyms and Boolean operators (AND, OR, NOT), quotes for phrases.
- Citation chaining: backward (references) and forward (who cites it).
- Review articles and textbooks for overviews.
- Reference managers (Zotero, Mendeley, BibTeX) to organise sources.
H: Systematic reviews
- Define a precise question and inclusion criteria in advance.
- Search comprehensively and document the search strategy.
- Screen results by title, abstract, then full text (PRISMA flow diagram).
- Assess quality and extract data consistently.
- Synthesise: narrative, or meta-analysis combining results statistically.
E: x̄_{w} = Σ(x_{i}/σ_{i}^{2})/Σ(1/σ_{i}^{2}), σ_{w} = (Σ1/σ_{i}^{2})^{−1/2} :: weighted mean in meta-analysis
H: In physics
P: The Particle Data Group (PDG) review combines measurements of particle properties with weighted averages and scale factors for inconsistent data. CODATA combines measurements to recommend fundamental constants. Watch for publication bias and tensions (e.g. the Hubble tension between early- and late-universe measurements, or the proton radius puzzle).
X: Combine two measurements: 10.0 ± 0.2 and 10.6 ± 0.4.
> Weights 25 and 6.25; mean = (250 + 66.25)/31.25 ≈ 10.12
> σ = 1/√31.25 ≈ 0.18
X: How would you search for recent work on perovskite solar cell stability?
> Search Web of Science or Google Scholar for "perovskite" AND "solar cell" AND (stability OR degradation), filter recent years, read recent reviews, chain citations
K: Search systematically with databases, keywords and citation chaining; systematic reviews and meta-analyses combine evidence transparently.
!: Searching only one database or recent papers can miss key work; document your search so others can repeat it.
Q: What is citation chaining? | Following references backward and citing papers forward from a key article.
Q: What does the PDG do? | Reviews and combines measurements of particle properties into recommended values.
M1: INSPIRE-HEP is a database for: | High-energy physics | Biology | Chemistry | Economics | Particle physics literature.
M2: A weighted mean gives more weight to: | Measurements with smaller uncertainties | Larger values | Older results | Random choices | 1/σ^{2}.

## Formulating research questions
S: A good research question is specific, answerable, significant and feasible. Formulating it well focuses a project, guides methods and makes results meaningful, and it's often the hardest and most creative part of research.
H: Qualities of a good question
- **Specific**: clearly defined scope and variables.
- **Answerable**: testable with available methods and data.
- **Significant**: fills a gap, resolves a tension or enables applications.
- **Feasible**: within time, budget and skills.
- **Original**: not already answered (check literature).
H: From topic to question
- Start broad: "superconductivity in nickelates".
- Identify gaps or tensions: "Why is T_{c} lower in films than predicted?"
- Narrow: "How does strain in thin films affect T_{c} in infinite-layer nickelates?"
- Formulate hypotheses and predictions.
E: Hypothesis → prediction → test :: research logic
H: Types of questions
P: Descriptive ("What is the lifetime of the muon?"), explanatory ("Why do cuprates superconduct?"), predictive ("Will this material be a topological insulator?"), and methodological ("Can we measure g − 2 more precisely?"). Questions evolve as research proceeds; refining them is normal. Discuss with supervisors and peers to test clarity and value.
X: Improve the question "Study black holes."
> "Can the spin of stellar-mass black holes in X-ray binaries be constrained to ±0.05 using reflection spectroscopy with XRISM data?"
X: Why is feasibility important?
> An excellent question that can't be answered with available tools or time leads to unfinished projects
K: Good research questions are specific, answerable, significant, feasible and original; refine them through literature and discussion.
!: Questions that are too broad lead to unfocused projects; too narrow ones may lack significance.
Q: What makes a research question answerable? | It can be tested with available methods, data and resources.
Q: What is a hypothesis? | A testable proposed explanation that makes predictions.
M1: "Why do cuprates superconduct?" is a: | Explanatory question | Descriptive question | Methodological question | Trivial question | Seeks mechanism.
M2: Checking literature before starting ensures: | Originality | Speed | Funding | Publication | Not already answered.

## Developing theoretical models
S: Theoretical models explain observations and make predictions using physical principles and mathematics. Developing one involves choosing assumptions, building equations, solving them and testing against data, often iterating many times.
H: Steps
- Identify the phenomenon and key observations to explain.
- Choose relevant physics and degrees of freedom; decide what to neglect.
- Formulate equations (Lagrangian, Hamiltonian, field equations, rate equations).
- Solve analytically, perturbatively or numerically.
- Derive predictions, including new testable ones.
- Compare with data; refine or reject.
H: Types of models
- **First-principles**: derived from fundamental theory (ab initio).
- **Phenomenological**: capture behaviour with fitted parameters.
- **Effective theories**: valid at specific scales.
- **Toy models**: minimal systems capturing essential physics (Ising model).
- **Computational models**: simulations.
E: Predictions = f(parameters, assumptions) :: models link assumptions to observables
H: Good practice
P: Keep models as simple as possible but not simpler. Check limits, dimensions, symmetries and conservation laws. Identify which parameters matter (sensitivity). Make falsifiable predictions. Document assumptions and validity range. Collaborate with experimentalists early so predictions are testable.
X: Build a toy model of a laser's threshold.
> Rate equation for photons: dn/dt = (G − L)n + spontaneous term; threshold when gain G equals loss L
> Predicts output rising linearly above threshold
X: When should you use a phenomenological model?
> When fundamental theory is too complex but data show regular behaviour, e.g. empirical scaling laws for tokamak confinement
K: Models connect assumptions to predictions; develop them iteratively, test against data and state their validity.
!: Too many free parameters can fit anything; a good model predicts beyond the data it was tuned on.
Q: What is a toy model? | A deliberately simplified model capturing essential physics.
Q: Why should models make falsifiable predictions? | So they can be tested and potentially refuted by experiment.
M1: Ab initio models are: | Derived from fundamental theory without fitting | Purely empirical | Toy models | Always wrong | First principles.
M2: Overfitting means: | Too many parameters fit noise | Too few data points | Perfect predictions | Simple models | Poor generalisation.

## Designing experiments
S: Experimental design determines whether a study can answer its question convincingly. Good designs control variables, minimise and quantify uncertainties, avoid bias and make efficient use of time and resources.
H: Key elements
- Clear question and hypothesis; defined measurables.
- **Variables**: independent (controlled), dependent (measured), confounding (controlled or randomised).
- **Controls**: baselines, null measurements, calibration.
- **Range and resolution**: enough points over relevant ranges.
- **Replication**: repeats for statistics.
- **Blinding**: avoid bias in analysis.
H: Uncertainty planning
- Estimate expected signal and noise; compute required measurement time or sample size.
- Identify dominant uncertainties; design to reduce them.
- Plan calibrations and systematic checks.
- **Design of experiments (DOE)**: factorial designs vary multiple factors efficiently.
E: N ≈ (Z σ/δ)^{2} :: samples needed to detect difference δ at Z-sigma significance
H: Practicalities
P: Risk assessment and safety. Budget, equipment availability, timeline. Pilot experiments to test feasibility. Data acquisition and storage plans. Pre-registration of analysis plans can reduce bias. Large physics experiments (LHC, LIGO) design detectors around expected signals and backgrounds years ahead.
X: To detect a 1% change with 5% noise per measurement at 3σ, how many measurements?
> N ≈ (3 × 5/1)^{2} = 225
X: Why include a null measurement?
> To measure background and systematic offsets with no signal present
K: Design experiments to control variables, quantify and minimise uncertainties, avoid bias and fit available resources.
!: An experiment without sufficient statistical power can't detect the effect it seeks, wasting effort.
Q: What is a confounding variable? | An uncontrolled factor that affects the outcome and could mimic or hide the effect studied.
Q: Why run pilot experiments? | To test feasibility and refine methods before the full experiment.
M1: Factorial designs: | Vary multiple factors efficiently | Change one factor only | Remove controls | Avoid statistics | Design of experiments.
M2: Blinding prevents: | Analysis bias | Random error | Calibration | Data storage | Unconscious tuning.

## Writing research proposals
S: A research proposal persuades others that a project is worth doing, feasible and well planned. Whether for a PhD, telescope time or funding, a strong proposal states a clear question, explains its significance and lays out credible methods and timelines.
H: Typical sections
- **Title and summary**: clear, non-specialist-friendly.
- **Background and motivation**: state of the art, gap, why it matters.
- **Objectives and research questions**.
- **Methodology**: approach, techniques, data analysis, feasibility evidence (preliminary results).
- **Work plan and timeline**: milestones and deliverables (Gantt chart).
- **Risks and mitigation**.
- **Resources and budget**: equipment, staff, computing.
- **Impact**: scientific, societal, training.
- **References**.
H: Writing tips
- Lead with the big question and why now.
- Be specific: numbers, sensitivities, sample sizes.
- Show feasibility with preliminary data or simulations.
- Address the reviewers' likely concerns proactively.
- Follow the funder's guidelines exactly.
E: Expected signal-to-noise = S/√(S + B) :: often used to justify observing time
H: Telescope and beamtime proposals
P: Facilities (JWST, ESO, synchrotrons, neutron sources) are oversubscribed several times; proposals must justify exact time or beam requested, technical feasibility and scientific return. Reviewers rank proposals; clarity and realism win. Resubmission after feedback is common.
X: You need 5σ detection of a source giving 10 counts per hour over a background of 40 counts per hour. Observing time?
> S/√(S + B) = 10t/√(50t) = 5 ⇒ √t = 5√50/10 ≈ 3.54 ⇒ t ≈ 12.5 hours
X: What makes a timeline credible?
> Realistic milestones, dependencies, contingency time and links to risks
K: A strong proposal has a clear significant question, credible methods with preliminary evidence, a realistic plan and identified risks.
!: Vague proposals ("we will study X") fail; reviewers need specific goals and evidence of feasibility.
Q: What is a Gantt chart? | A timeline chart showing tasks, durations and dependencies.
Q: Why include preliminary results? | To demonstrate feasibility and reduce reviewers' perceived risk.
M1: Telescope proposals must justify: | The time requested | Only the title | Funding of staff | Hiring | Exposure calculations.
M2: Risk mitigation describes: | How to handle things that might go wrong | Budget only | Literature | Title | Contingency plans.

## Grant applications and project planning
S: Research is funded through competitive grants from government agencies, charities and industry. Successful applications align with funder priorities, present excellent science and realistic plans, and show the team can deliver.
H: Funding landscape
- UK: UKRI councils (STFC, EPSRC), Royal Society, Leverhulme; EU: ERC, Horizon Europe; US: NSF, DOE, NASA.
- Schemes for early-career researchers (fellowships), project grants, large facility funding.
- Success rates often 10–30%.
H: Application elements
- Case for support (science), pathways to impact, data management plan, budget justification, CVs and track record.
- Costs: staff, equipment, consumables, travel, overheads (full economic costing).
- Peer review by experts, panel ranking.
- Responding to reviewers' comments (in some schemes) before panel decision.
H: Planning the project
P: Break the project into work packages with deliverables and milestones. Allocate staff time realistically (PhD students, postdocs). Plan for risks (equipment delays, recruitment). Track progress with regular meetings and reports. Budget management: monitor spend versus plan. Good planning makes reporting and future applications easier.
E: Full cost = direct costs + indirect (overhead) costs :: grant budgeting
X: A 3-year project needs a postdoc (£50k per year), equipment (£80k), travel (£10k). Direct cost?
> 150 + 80 + 10 = £240k (plus overheads)
X: Why do funders ask for pathways to impact?
> To show how research could benefit society, the economy or policy beyond academia
K: Grants need excellent science, alignment with funders, realistic budgets and plans, and evidence the team can deliver.
!: Underestimating costs or timelines damages delivery and credibility; plan realistically with contingency.
Q: What is a work package? | A defined part of a project with its own tasks, deliverables and milestones.
Q: What is full economic costing? | Including direct costs plus institutional overheads in grant budgets.
M1: Typical grant success rates are about: | 10–30% | 90% | 1% | 100% | Competitive.
M2: The ERC is a funder in: | Europe | the USA | Japan | Australia | European Research Council.

## Laboratory management
S: Running a laboratory involves more than doing experiments: managing equipment, budgets, safety, people, data and schedules. Good management keeps research productive, safe and collaborative.
H: Responsibilities
- **Safety**: risk assessments, training records, emergency procedures, compliance (radiation, lasers, chemicals, cryogens).
- **Equipment**: maintenance schedules, calibration, booking systems, inventories.
- **Budget**: consumables, repairs, service contracts.
- **People**: supervision, training, onboarding, mentoring, workload balance.
- **Data**: storage, backups, lab notebooks (paper or electronic).
H: Lab culture
- Clear expectations and shared protocols.
- Regular group meetings, progress updates.
- Inclusive environment; open reporting of problems and near misses.
- Recognise contributions (technicians, students).
- Sustainability: energy use of equipment, recycling, helium recovery.
H: Good practice
P: Standard operating procedures (SOPs) for critical equipment. Electronic lab notebooks with timestamps for traceability and IP. Shared calendars for instruments. Spare-parts planning for critical systems (e.g. vacuum pumps, lasers). Documentation so knowledge doesn't leave with departing members. Technicians and research software engineers are vital and should be valued.
E: Uptime = operating time/scheduled time :: equipment availability metric
X: A cryostat is booked 200 hours per month but runs 160 due to faults. Uptime?
> 160/200 = 80%; investigate faults and preventive maintenance
X: Why recover helium?
> Helium is scarce and expensive; recovery systems recycle boil-off, saving money and resources
K: Lab management balances safety, equipment, budget, people and data, supported by documentation and a positive culture.
!: Undocumented procedures mean knowledge is lost when people leave; write SOPs.
Q: What is an SOP? | A standard operating procedure: written instructions for performing a task consistently and safely.
Q: Why use electronic lab notebooks? | For searchable, timestamped, shareable records supporting reproducibility and IP.
M1: Lab safety records include: | Training and risk assessments | Only publications | Holidays | Budgets only | Compliance documentation.
M2: Helium recovery systems: | Recycle boil-off gas | Produce helium | Cool rooms | Store data | Save scarce resource.

## Research ethics and integrity
S: Research integrity means honesty, rigour, transparency and accountability in how research is done and reported. Ethical research protects participants, the environment and society, and maintains the trust on which science depends.
H: Principles of integrity
- **Honesty** in proposing, performing and reporting research.
- **Rigour**: appropriate methods, careful analysis.
- **Transparency**: open methods, data and conflicts of interest.
- **Respect** for colleagues, participants and the environment.
- **Accountability**: take responsibility for your work.
H: Research misconduct
- **Fabrication**: making up data (Schön scandal, 2002).
- **Falsification**: manipulating data or images.
- **Plagiarism**: using others' work or ideas without credit.
- Questionable practices: p-hacking, selective reporting, inappropriate authorship, duplicate publication.
E: p-hacking: testing N hypotheses inflates false positives ≈ 1 − (1 − α)^{N} :: why pre-registration helps
H: Broader ethics
P: Dual-use research (lasers, drones, AI, nuclear) requires awareness of misuse. Environmental impact of large facilities and computing. Human participant research (rare in physics but relevant in medical and education research) needs ethics approval and consent. Fair authorship and credit, equality and inclusion, and responsible communication with the public. Institutions have integrity officers and procedures for reporting concerns (whistleblowing protections).
X: Testing 20 independent hypotheses at α = 0.05: chance of at least one false positive?
> 1 − 0.95^{20} ≈ 0.64
X: A student drops "outliers" that don't fit the hypothesis without justification. Problem?
> Falsification/selective reporting: outlier exclusion must follow pre-defined, justified criteria and be reported
K: Integrity means honest, rigorous, transparent research; misconduct and questionable practices damage science and trust.
!: Small "tidying" of data can become falsification; document every decision.
Q: What are the three main forms of research misconduct? | Fabrication, falsification and plagiarism.
Q: What is p-hacking? | Repeatedly analysing data in different ways until a significant result appears.
M1: The Schön scandal involved: | Fabricated data | Plagiarism only | Honest error | Funding fraud only | Bell Labs, 2002.
M2: Pre-registration helps prevent: | Selective analysis and reporting | Measurement error | Equipment failure | Funding issues | Fixed analysis plan.

## Data management and documentation
S: Research data management keeps data organised, safe, documented and shareable throughout and after a project. Good practice prevents loss, enables reproducibility and meets funder requirements for open data.
H: Data lifecycle
- **Plan**: data management plan (DMP) at proposal stage.
- **Collect**: consistent formats, naming conventions, metadata.
- **Store and back up**: 3-2-1 rule (three copies, two media, one offsite).
- **Process and analyse**: keep raw data unchanged; record processing steps.
- **Archive and share**: repositories (Zenodo, institutional, domain-specific) with DOIs.
H: FAIR principles
- **Findable**: persistent identifiers, rich metadata.
- **Accessible**: retrievable by standard protocols.
- **Interoperable**: open formats (HDF5, CSV, NetCDF, FITS).
- **Reusable**: licences, provenance, documentation.
H: Documentation
P: README files describing contents, units, formats and how data were produced. Lab notebooks linking experiments to data files. Version-controlled analysis code. Metadata standards in fields (FITS headers in astronomy, NeXus for neutron and X-ray data). Sensitive data (personal, commercial) need appropriate protection. Large facilities have data policies with embargo periods.
E: 3-2-1: 3 copies, 2 media, 1 offsite :: backup rule
X: Name a file well: "data final2.xlsx" vs?
> "2026-03-14_sampleA_Hall_300K_run03.csv": date, sample, measurement, conditions, run number
X: Why keep raw data unchanged?
> So processing can be repeated, corrected or audited, and errors traced
K: Plan, document, back up and share data following FAIR principles so research is reproducible and reusable.
!: Data without metadata or documentation quickly become unusable, even to their creator.
Q: What does FAIR stand for? | Findable, accessible, interoperable, reusable.
Q: What is a data management plan? | A document describing how data will be collected, stored, documented, shared and preserved.
M1: The 3-2-1 backup rule means: | 3 copies, 2 media, 1 offsite | 3 hard drives only | 2 copies | 1 cloud copy | Resilient storage.
M2: FITS is a standard format in: | Astronomy | Biology | Finance | Music | Flexible Image Transport System.

## Version control and reproducible workflows
S: Version control systems like git track every change to code and documents, enabling collaboration, rollback and reproducibility. Combined with environments and automated workflows, they make computational research transparent and repeatable.
H: Git basics
- **Repository**: project history.
- **Commit**: snapshot with a message describing the change.
- **Branch**: parallel line of development; **merge** combines branches.
- **Remote** (GitHub, GitLab): sharing, backup, collaboration via pull requests and code review.
- Tag releases used for publications.
H: Reproducible workflows
- Record software environments (requirements.txt, conda, containers like Docker or Apptainer).
- Automate pipelines (Makefiles, Snakemake, Nextflow) from raw data to figures.
- Use notebooks for exploration, scripts for production; restart and run all before sharing notebooks.
- Fix random seeds; record parameters in config files.
- Continuous integration runs tests automatically on each change.
E: Result = f(code version, data version, environment, parameters) :: what must be recorded
H: Benefits
P: Mistakes can be traced and undone; collaborators work without overwriting each other; reviewers and readers can rerun analyses. Software citation (Zenodo DOIs for releases, CITATION files) gives credit to code authors. Research software engineers help maintain sustainable, tested code.
X: You publish a figure. What should you record to reproduce it later?
> Git commit hash, data version or DOI, environment file, parameters and random seeds
X: Write a good commit message for fixing a unit error.
> "Fix: convert energy from eV to J in spectrum fit (was off by 1.6e-19)"
K: Version control plus captured environments and automated pipelines make computational research collaborative and reproducible.
!: "It works on my machine" isn't reproducibility; record environments and automate.
Q: What is a git commit? | A recorded snapshot of changes with a descriptive message.
Q: What does a container provide? | A portable, consistent software environment.
M1: Pull requests enable: | Code review before merging | Faster computers | Data storage | Funding | Collaborative workflow.
M2: Fixing random seeds ensures: | Reproducible stochastic results | Better statistics | Faster code | Security | Same random sequence.

## Collaboration across disciplines
S: Modern physics research is collaborative, from small teams to collaborations of thousands. Working effectively with others, including people from different disciplines and cultures, requires communication, clear roles and shared norms.
H: Types of collaboration
- Small research groups (supervisor, postdocs, students).
- Multi-institution projects and international consortia (ATLAS ~3000 authors).
- Interdisciplinary teams (physicists with biologists, engineers, clinicians).
- Industry–academia partnerships.
H: Making collaboration work
- Shared goals and clear roles; agree responsibilities and timelines.
- Communication: regular meetings, shared documents, issue trackers.
- Define terms and standards when crossing disciplines.
- Authorship and credit agreed early (CRediT contributor roles).
- Respect different working styles, time zones and cultures.
- Conflict resolution: address issues early and constructively.
H: Large collaborations
P: Big physics collaborations have governance structures (spokespersons, boards), internal review committees, publication policies and author lists ordered alphabetically. Members specialise (detector, software, analysis). Internal review ensures quality before publication. Credit for individuals is recognised through internal notes, talks and roles.
E: CRediT roles: conceptualisation, methodology, software, analysis, writing, supervision… :: contributor taxonomy
X: An interdisciplinary team disagrees about what "model" means. What do you do?
> Clarify definitions explicitly, create a shared glossary, and give examples of each usage
X: Why do large collaborations use alphabetical author lists?
> Contributions are collective and hard to rank; alphabetical order treats members equally
K: Successful collaboration needs shared goals, clear roles, good communication and fair credit.
!: Unclear authorship and responsibilities are common sources of conflict; agree them early.
Q: What is the CRediT taxonomy? | A standard list of contributor roles describing who did what in a research output.
Q: How do large collaborations ensure quality? | Through internal review committees before publication.
M1: ATLAS papers typically have authors listed: | Alphabetically | By seniority | By contribution size | Randomly | Collaboration policy.
M2: A shared glossary helps: | Avoid misunderstandings | Increase jargon | Replace meetings | Write code | Common definitions.

## Research presentations and posters
S: Presenting research at group meetings, conferences and seminars builds your reputation, invites feedback and spreads ideas. Effective presentations tell a clear story tailored to the audience, with simple visuals and confident delivery.
H: Talks
- Know the audience: specialists, broad physicists or the public.
- Structure: motivation, question, approach, key results, conclusions, outlook.
- One message per slide; large figures; minimal text.
- Timing: ~1 slide per minute; practise and leave time for questions.
- Highlight your contribution and the take-home message.
H: Posters
- Title readable from 3 m; logical flow (columns, top-left to bottom-right).
- Key result prominent; brief text; high-quality figures.
- QR code to paper or data.
- Prepare a 1-minute and a 5-minute verbal summary.
H: Handling questions and feedback
P: Listen fully, clarify if needed, answer concisely, admit uncertainty honestly and follow up later. Treat critical questions as useful feedback. Networking at posters and conferences builds collaborations and career opportunities. Accessibility: colour-blind-safe palettes, readable fonts, captions for recorded talks.
E: Talk length ≈ number of slides × 1 min :: planning rule
X: Plan a 15-minute conference talk.
> ~12–14 slides: title, motivation (2), method (3), results (4–5), conclusions (1), backup slides for questions
X: How should you respond to a question you can't answer?
> "That's a great point; I haven't checked that yet, but I'll look into it and follow up"
K: Tailor talks to the audience, tell one clear story, design visuals for readability and handle questions honestly.
!: Cramming too much into a talk loses the audience; focus on the key message.
Q: What should a poster's title achieve? | Be readable from a distance and convey the main point.
Q: What are backup slides for? | Answering likely detailed questions without cluttering the main talk.
M1: A 20-minute talk typically has about: | 15–20 slides | 60 slides | 2 slides | 100 slides | ~1 per minute.
M2: Colour-blind-safe palettes improve: | Accessibility | Speed | Data accuracy | Funding | Inclusive design.

## Scientific writing and publishing
S: Scientific writing communicates research precisely and clearly so others can understand, evaluate and build on it. Publishing in journals, after peer review, makes work part of the scientific record and is central to research careers.
H: Writing a paper
- Decide the key message and target journal/audience first.
- Typical structure: abstract, introduction, methods, results, discussion, conclusions.
- Figures first: design the key plots that tell the story.
- Clear, concise sentences; define symbols; consistent notation and units.
- LaTeX is standard in physics; reference managers (BibTeX) for citations.
H: The publishing process
- Preprint on arXiv (common in physics).
- Submit to a journal; editor screens, then sends for peer review.
- Revise and respond point-by-point to referees.
- Acceptance, proofs, publication; open access options (gold, green).
- Journals range from broad (Nature, Science, PRL) to specialised (Phys. Rev. B, JHEP, ApJ).
H: Good writing practice
P: Write early and often; revise extensively. Get feedback from co-authors and colleagues. State uncertainties and limitations. Avoid hype. Credit prior work properly. Make data and code available. Be ethical about authorship. Choose open access when possible to maximise reach (funders increasingly require it).
E: Clarity > brevity > elegance :: writing priorities
X: Rewrite: "It was found by us that the resistance was observed to decrease."
> "The resistance decreased."
X: What's the role of arXiv in physics publishing?
> Rapid open dissemination of preprints before (or alongside) peer review, establishing priority
K: Write clearly around a key message, design figures first, publish via peer review and share preprints, data and code openly.
!: Hype and overclaiming damage credibility; state results and uncertainties precisely.
Q: What is a preprint server? | An online archive (like arXiv) for sharing papers before formal peer review.
Q: Why respond point-by-point to referees? | To show how each concern was addressed, making re-review efficient.
M1: The standard typesetting system in physics is: | LaTeX | Word only | PowerPoint | HTML | With BibTeX.
M2: Gold open access means: | The published article is freely available from the journal | Paywalled | Preprint only | Abstract only | Usually APC-funded.

## Peer review
S: Peer review is how experts evaluate research for publication, funding and facility time. Reviewing well, constructively and fairly, is a professional responsibility, and understanding the process helps you respond to reviews of your own work.
H: Reviewing a manuscript
- Read the paper fully; summarise its claims and contribution.
- Assess novelty, correctness, significance and clarity.
- Check methods, analysis, uncertainties and whether conclusions follow.
- Separate major issues (would change conclusions) from minor ones (clarity, typos).
- Give a recommendation (accept, minor or major revision, reject) with reasons.
- Be constructive, specific and courteous; avoid demanding unnecessary extra work.
H: Ethics of reviewing
- Confidentiality: don't share or use unpublished ideas.
- Declare conflicts of interest (competitors, collaborators).
- Timeliness; decline if you can't review properly.
- Avoid bias based on authors' identity or institution (double-blind review helps).
H: Responding to reviews
P: Read reviews calmly; even harsh comments often contain useful points. Respond to every comment politely: agree and revise, or explain clearly with evidence why you disagree. Highlight changes in the manuscript. Peer review isn't perfect: it misses errors, can be biased and is slow; post-publication review, replication and open review complement it.
E: Review = summary + major issues + minor issues + recommendation :: structure of a report
X: Write a constructive major comment.
> "The systematic uncertainty from detector calibration (Section 4) appears underestimated; could the authors show the effect of varying the energy scale by ±1%?"
X: You find the paper competes directly with your unpublished work. What should you do?
> Declare the conflict to the editor and likely decline the review
K: Good reviews are thorough, constructive, confidential and fair; responding to reviews professionally improves your work.
!: Using confidential information from a manuscript under review is a serious ethical breach.
Q: What distinguishes major from minor review comments? | Major comments affect validity or conclusions; minor ones concern clarity and presentation.
Q: Why declare conflicts of interest as a reviewer? | To avoid biased evaluation and maintain fairness.
M1: Double-blind review hides: | Both authors' and reviewers' identities | Only reviewers | Only data | The journal | Reduces bias.
M2: A reviewer should keep manuscripts: | Confidential | Public | On social media | Shared with students without permission | Ethical duty.

## Intellectual property and technology transfer
S: Physics research can produce inventions with commercial value. Intellectual property (IP) protects them, and technology transfer moves ideas from labs into products, through patents, licensing and spin-out companies.
H: Types of IP
- **Patents**: protect inventions that are new, inventive and industrially applicable; ~20 years; require public disclosure.
- **Copyright**: software, text, figures (automatic).
- **Trade secrets**: confidential know-how.
- **Trademarks** and **design rights**.
- Disclosure before filing (papers, talks) can destroy patentability in many countries.
H: Technology transfer
- University technology transfer offices assess inventions, file patents, negotiate licences.
- **Licensing** to companies in exchange for royalties.
- **Spin-out companies** founded by researchers (e.g. Oxford Instruments, quantum computing start-ups).
- Industry collaborations with agreements on IP ownership.
- Open innovation and open-source licences (MIT, GPL) for software.
H: Physics examples
P: The World Wide Web (CERN) was released royalty-free, enabling global adoption. MRI, lasers, CCDs, GMR read heads and touchscreens came from physics research. CERN's knowledge transfer group licenses detector and accelerator technologies for medical imaging and industry. Researchers should talk to tech transfer offices before publishing potentially valuable inventions.
E: Patent term ≈ 20 years from filing :: protection duration
X: You plan to present an invention at a conference next week. What should you do first?
> Contact the tech transfer office to consider filing a patent application before public disclosure
X: Why did CERN make the Web royalty-free?
> To encourage universal adoption; openness created far more value than licensing could
K: IP protects inventions; technology transfer turns research into products via patents, licences and spin-outs, or openness.
!: Publishing or presenting an invention before filing can make it unpatentable.
Q: What are the criteria for a patent? | Novelty, inventive step and industrial applicability.
Q: What is a spin-out company? | A company founded to commercialise research from a university or lab.
M1: Patents last about: | 20 years | 5 years | 100 years | Forever | From filing.
M2: Software is automatically protected by: | Copyright | Patents always | Trademarks | Nothing | Automatic on creation.

## Project management
S: Project management keeps research on track: defining goals, planning tasks, managing time, resources and risks, and communicating progress. From a PhD thesis to a multi-billion facility, good management turns ideas into results.
H: Core concepts
- **Scope**: what's included (and what's not).
- **Work breakdown structure**: divide the project into manageable tasks.
- **Schedule**: Gantt charts, milestones, critical path.
- **Resources**: people, equipment, budget.
- **Risk register**: likelihood, impact, mitigation.
- **Monitoring**: progress reviews, adjusting plans.
E: Risk score = likelihood × impact :: risk prioritisation
E: Critical path = longest chain of dependent tasks :: sets minimum project duration
H: Methods
- **Waterfall**: sequential phases (common for hardware builds).
- **Agile**: iterative sprints, adaptive planning (common in software).
- Hybrid approaches for research, where uncertainty is high.
- Tools: Gantt software, Kanban boards (Trello, GitHub Projects), issue trackers.
H: Research realities
P: Research is uncertain: plans change as results arrive. Build in contingency (~10–20% time), prioritise high-risk tasks early, and keep stakeholders (supervisors, collaborators, funders) informed. Large facilities (ITER, ELT) show the importance of strong management: cost and schedule overruns often stem from underestimated complexity and poor risk management.
X: Tasks: A (2 months) → B (3 months) → D (1 month); A → C (5 months) → D. Critical path and duration?
> Paths: A–B–D = 6 months; A–C–D = 8 months
> Critical path A–C–D: 8 months
X: A risk has likelihood 0.3 and impact 8 (out of 10). Score?
> 2.4; compare with other risks to prioritise mitigation
K: Plan scope, tasks, schedule, resources and risks; monitor progress and adapt, with contingency for research uncertainty.
!: Delays on the critical path delay the whole project; focus effort there.
Q: What is the critical path? | The longest sequence of dependent tasks, which determines the minimum project duration.
Q: What is agile project management? | An iterative approach with short cycles, frequent review and adaptive planning.
M1: A risk register records: | Risks, likelihood, impact and mitigation | Publications | Staff salaries | Lab safety only | Risk planning.
M2: Building in contingency means: | Allowing extra time or budget for surprises | Removing deadlines | Doubling scope | Ignoring risks | Buffer.

## Research impact and public engagement
S: Research impact is the difference research makes beyond academia: to the economy, society, health, policy, culture and the environment. Public engagement shares research with wider audiences and listens to their perspectives, often leading to impact.
H: Types of impact
- **Economic**: technologies, spin-outs, skilled workforce (MRI, lasers, the Web).
- **Societal**: health, environment, security.
- **Policy**: evidence for decisions (climate, energy, radiation protection).
- **Cultural**: inspiring curiosity (astronomy images, gravitational waves).
- **Educational**: training and outreach.
H: Planning for impact
- Identify beneficiaries and stakeholders early.
- Engage them in shaping research questions where appropriate.
- Plan activities: partnerships, briefings, open data, public events.
- Track evidence (testimonials, usage data, policy citations).
- Impact can take decades and be unpredictable (fundamental research).
E: Impact pathway: research → engagement → uptake → benefit :: logic model
H: Public engagement
P: Formats include talks, festivals, school visits, museums, citizen science, media and social media. Two-way dialogue builds trust. Measuring engagement quality matters more than counting audiences. In the UK, the REF assesses impact case studies; funders ask for pathways to impact. Engagement also benefits researchers through new perspectives and communication skills.
X: How might a quantum sensing project create impact?
> Partner with industry for navigation or medical imaging; brief policymakers on quantum technologies; run public demonstrations
X: Why can impact from fundamental physics be unpredictable?
> Applications often emerge decades later in unforeseen areas (e.g. quantum mechanics → transistors, GR → GPS)
K: Impact extends research benefits beyond academia; plan stakeholder engagement while recognising long, unpredictable timelines.
!: Impact isn't just publicity; it's demonstrable change or benefit, evidenced over time.
Q: What is research impact? | A demonstrable contribution research makes to the economy, society, policy, health, culture or environment.
Q: What does the REF assess? | The quality and impact of UK university research, including impact case studies.
M1: GPS relying on relativity is an example of: | Long-term unpredictable impact from fundamental research | Public engagement | Peer review | Data management | Decades later.
M2: Good engagement emphasises: | Two-way dialogue | Audience size only | One-way lectures | Jargon | Listening too.

## Communicating with industry and policymakers
S: Physicists increasingly advise industry and government. Communicating effectively with these audiences means understanding their goals, constraints and timescales, and presenting evidence clearly with options, trade-offs and uncertainties.
H: Industry
- Focus on value: cost, performance, reliability, time to market.
- Speak in terms of problems solved and technology readiness levels (TRL 1–9).
- Respect confidentiality and IP agreements.
- Collaborations: contract research, knowledge transfer partnerships, consultancy, joint PhDs.
E: TRL 1 (basic principles) → TRL 9 (proven in operation) :: technology readiness scale
H: Policymakers
- Short, clear briefings: key message first (policy briefs of one or two pages).
- Present options with evidence, costs, benefits, risks and uncertainties; avoid advocacy unless asked.
- Understand policy cycles, political constraints and public opinion.
- Channels: parliamentary committees (UK POST notes), science advisers, consultations, learned societies (IOP, Royal Society).
H: Skills and examples
P: Plain language, numbers in context, visuals and concrete examples. Be honest about uncertainty without paralysing decisions. Physicists have shaped policy on nuclear energy, climate, radiation protection, space, telecommunications spectrum and quantum technologies. Fellowships (e.g. placements in parliament or government departments) build understanding of how policy works.
X: Summarise the case for heat pumps in one sentence for a policymaker.
> "Heat pumps deliver about three units of heat per unit of electricity, cutting household heating emissions by two thirds or more with today's grid and lowering energy imports."
X: A company asks if your lab-scale sensor is ready for products. How do you answer?
> Explain it's around TRL 3–4 (lab validation), outline steps and timescales to prototype and field testing
K: Tailor communication to industry and policy audiences: lead with key messages, quantify value and trade-offs, and be honest about uncertainty and readiness.
!: Overstating readiness or certainty damages trust; be clear about what is known and how far a technology is from use.
Q: What is a technology readiness level? | A scale from 1 to 9 describing how mature a technology is, from basic principles to proven operation.
Q: What should a policy brief lead with? | The key message and recommendations, then supporting evidence.
M1: TRL 9 means: | Proven in operational environment | Basic principles observed | Lab prototype | Idea only | Fully mature.
M2: POST notes are produced for: | The UK Parliament | Journals | Companies | Schools | Parliamentary Office of Science and Technology.

## Careers in academia, industry and scientific computing
S: A physics education opens many careers: academic research, industry R&D, engineering, data science, finance, medicine, teaching, policy and entrepreneurship. Physicists are valued for problem-solving, quantitative and computational skills, wherever they work.
H: Academic careers
- PhD (3–5 years) → postdoctoral positions (often 2–3 rounds) → fellowships or lectureships → professorship.
- Competitive: far fewer permanent posts than PhDs.
- Responsibilities: research, teaching, supervision, grant writing, administration.
- Alternatives within academia: research software engineers, facility scientists, technicians, science communication.
H: Industry and other sectors
- **R&D**: semiconductors, photonics, quantum technologies, energy, aerospace, medical devices.
- **Data science and AI**, software engineering, scientific computing.
- **Finance**: quantitative analysis and risk modelling.
- **Medical physics** (clinical scientist training).
- **Engineering**, defence, nuclear, telecommunications.
- **Teaching**, policy, patent law, science journalism, start-ups.
H: Building a career
P: Develop transferable skills: programming (Python, C++), data analysis, communication, teamwork, project management. Gain experience through internships, placements, open-source contributions and outreach. Build networks (conferences, IOP, LinkedIn). Professional accreditation (Chartered Physicist, CPhys). Careers are rarely linear: many physicists move between sectors. Mentors and career services help navigate options.
E: Skills = physics knowledge + computing + communication + problem-solving :: employability formula
X: Which skills transfer from a particle physics PhD to data science?
> Large-scale data analysis, statistics and machine learning, Python/C++, working in big collaborations, communicating results
X: How can an undergraduate explore careers?
> Internships, research placements, career fairs, informational interviews, joining societies (IOP), and projects with industry
K: Physics leads to diverse careers in academia, industry, computing, medicine, finance and policy; transferable skills and networks matter.
!: Academia is only one path; most physics graduates build successful careers outside it.
Q: What is a research software engineer? | A professional who develops and maintains software for research, combining coding and scientific expertise.
Q: What is CPhys? | Chartered Physicist, a professional accreditation from the Institute of Physics.
M1: A common route into medical physics is: | Clinical scientist training | Patent law | Finance | Journalism | Accredited training scheme.
M2: The most transferable skill from physics is often: | Quantitative problem-solving | Memorising constants | Lab safety only | Handwriting | Valued widely.
`;
