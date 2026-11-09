// School 3: Communities and Species Interactions. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md):
// objectives, key terms, summaries, typed and dated sources, evidence status (EV:) and questions at three levels
// (Foundation, Application, Evaluation) in every lesson. Explanations are original; sources are those used and cited for
// checking, pending human verification (qa.js records the review stages). Level: A level to second-year undergraduate.
export default `
## Intraspecific and interspecific competition
LV: Introductory · Application
S: Competition happens when organisms use the same limited resource and each reduces the other's survival, growth or reproduction. This lesson distinguishes competition within and between species, exploitation and interference, and scramble and contest, and explains its effects on populations.
O: Distinguish intraspecific from interspecific competition, and exploitation from interference competition
O: Explain how intraspecific competition produces density-dependent effects such as self-thinning
O: Analyse experimental evidence for interspecific competition
PRE: Biotic interactions: an overview
H: Kinds of competition
P: **Competition** is an interaction in which individuals are harmed by sharing a limited **resource**: food, water, light, nutrients, space or mates. It is **intraspecific** when the competitors are the same species and **interspecific** when they are different species.
- **Exploitation competition**: individuals use up a shared resource, leaving less for others, without meeting. Oak seedlings and grasses drawing on the same soil water.
- **Interference competition**: individuals directly prevent others from using a resource, by fighting, territoriality or chemicals. Robins defending territories; *Semibalanus* barnacles crushing *Chthamalus*.
- **Scramble competition**: the resource is shared out until no one gets enough, so many individuals suffer (blowfly larvae in a carcass).
- **Contest competition**: winners take enough and losers get little or nothing (territorial birds), so some individuals breed successfully even when resources are short.
K: Competition is always about a limited resource; intraspecific competition is usually the stronger because members of a species need exactly the same things.
H: Intraspecific competition and density
P: Intraspecific competition is a major source of density dependence: as density rises, each individual gets less, so growth, fecundity or survival fall. In dense stands of plants, the biggest individuals overshadow the smaller ones, which die: **self-thinning**. Over time the stand has fewer, larger plants; mean plant mass and density follow a characteristic negative relationship (Yoda et al., 1963).
X: Sowing radish seeds at different densities.
> At 10 seeds per pot each plant grows large; at 100 per pot plants are small.
> Total yield per pot rises with density at first, then levels off: the pot's resources set a ceiling.
> This "law of constant final yield" shows intraspecific competition adjusting individual size to share fixed resources.
H: Evidence for interspecific competition
P: The strongest evidence comes from **removal or addition experiments**. Connell's barnacles (1961) showed *Semibalanus* limited *Chthamalus*. Tansley (1917) grew two bedstraws, *Galium saxatile* (of acid soils) and *G. sylvestre* (of limestone), on both soils: each could grow alone on either soil, but in mixtures each won on its own soil type, showing competition restricted their distributions. Grey squirrels reduce the growth and breeding of red squirrels where they share broadleaved woods.
!: Inferring competition from the fact that two species are rarely found together. They may simply have different requirements; only experiments show that one species suppresses the other.
EV: established | Field removal experiments show that interspecific competition limits the distribution and abundance of many species, as in Connell's barnacles.
EV: contested | How important interspecific competition is in structuring communities, compared with predation, disturbance and chance, was debated vigorously in the 1970s and 1980s and varies between systems.
T: Intraspecific competition | Competition between individuals of the same species
T: Interspecific competition | Competition between individuals of different species
T: Interference competition | Competition in which individuals directly prevent others from using a resource
T: Self-thinning | The death of smaller individuals as a dense stand of plants grows, leaving fewer, larger survivors
SUM: Competition is harm through sharing limited resources, by exploitation or interference, in scramble or contest form.
SUM: Intraspecific competition causes density dependence and self-thinning; removal experiments demonstrate interspecific competition.
SRC: Begon M. and Townsend C. R., Ecology: From Individuals to Ecosystems, 5th edition, Wiley, chapters 5 and 8 | secondary | 2021
SRC: Tansley A. G., "On competition between Galium saxatile L. and Galium sylvestre Poll. on different types of soil", Journal of Ecology 5(3/4):173–179 | primary | 1917 | https://doi.org/10.2307/2255652
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 45.6 "Community ecology" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/45-6-community-ecology
Q: What is the difference between exploitation and interference competition? | In exploitation, individuals use up a shared resource; in interference, they directly stop others using it, for example by fighting or territoriality.
Q: What is self-thinning? | The death of smaller plants in a dense stand as larger ones grow, leaving fewer, bigger individuals.
M1#ecology-u03-01-q1@1: Two male red deer fighting for access to females is an example of | intraspecific interference competition | interspecific exploitation competition | mutualism | commensalism | Same species, direct contest over a resource (mates): intraspecific interference.
M2#ecology-u03-01-q2@2: In Tansley's experiment, each bedstraw grew on both soils alone but won only on its own soil in mixtures. What does this show? | Competition restricts each species to the soil type where it is the better competitor | Each species can only tolerate one soil type | The two species never compete | Soil type has no effect on plant growth | Growing alone shows each tolerates both soils; mixtures reveal that competition sets their distributions.
TF2#ecology-u03-01-q3@2: In contest competition, some individuals obtain enough resources to breed even when resources are scarce. | true | Winners secure an adequate share (for example a territory), while losers get little.
M3#ecology-u03-01-q4@3: Two snail species are rarely found in the same ponds. Which study would best test whether competition is responsible? | Add one species to ponds holding the other and measure growth and survival against control ponds | Count both species in more ponds | Measure the pH of ponds where each lives | Ask local naturalists where they find each species | Only a manipulation with controls can separate competition from different habitat requirements.
SA2#ecology-u03-01-q5@2,3: Explain how intraspecific competition can regulate a population, using an example. | As density rises, individuals share limited resources such as food, light or territories, so each gets less. This lowers per capita growth, fecundity or survival (density-dependent effects): for example, in a dense stand of plants small individuals are shaded and die (self-thinning), or in territorial birds those without territories don't breed. Births fall and deaths rise at high density, and relax at low density, pushing the population back towards carrying capacity. | Shared limited resources ; Per capita effects increase with density ; Named example ; Explains return towards K

## The competitive exclusion principle
LV: Intermediate · Application
S: The competitive exclusion principle states that two species competing for exactly the same limiting resources can't coexist indefinitely. This lesson presents Gause's experiments, the Lotka–Volterra competition model and the conditions for coexistence, and why nature contains so many apparently similar species.
O: State the competitive exclusion principle and describe Gause's evidence
O: Use the Lotka–Volterra competition model to predict exclusion or coexistence
O: Evaluate explanations for the coexistence of many similar species
PRE: Intraspecific and interspecific competition
H: Gause's experiments
P: Gause (1934) grew two protists, *Paramecium aurelia* and *P. caudatum*, separately and together in tubes fed with bacteria. Alone, each grew logistically to its carrying capacity. Together, *P. aurelia* persisted and *P. caudatum* died out. But *P. caudatum* coexisted with *P. bursaria*, which fed on bacteria at the bottom of the tube while *P. caudatum* fed in the water above.
K: Complete competitors can't coexist: if two species have identical niches, the one that uses the limiting resource more efficiently excludes the other (Hardin, 1960).
H: The Lotka–Volterra competition model
E: dN₁/dt = r₁N₁(K₁ − N₁ − α₁₂N₂)/K₁ :: α₁₂ is the effect of one individual of species 2 on species 1, measured in units of species 1
P: Each species' growth is reduced by its own numbers and by the other species, weighted by the **competition coefficients** α₁₂ and α₂₁. The outcome depends on whether each species limits itself more than it limits the other:
- **Stable coexistence** when intraspecific competition is stronger than interspecific for both species: α₁₂ < K₁/K₂ and α₂₁ < K₂/K₁.
- **Exclusion** of species 2 when species 1 is the stronger competitor on both counts.
- **Either may win**, depending on starting numbers, when each limits the other more than itself.
X: Applying the coexistence condition.
> K₁ = 500, K₂ = 400, α₁₂ = 0.6, α₂₁ = 0.7.
> K₁/K₂ = 1.25, and α₁₂ = 0.6 < 1.25. K₂/K₁ = 0.8, and α₂₁ = 0.7 < 0.8.
> Both conditions hold, so the two species coexist, each below its own carrying capacity.
H: So why so many species?
P: The outcome of competition can depend on conditions. Park (1954) found that which of two flour beetles (*Tribolium*) won depended on temperature and humidity. Hutchinson (1961) called the diversity of phytoplankton, many species apparently competing for the same few nutrients in well-mixed water, the **paradox of the plankton**. Explanations include environments that change before exclusion is complete, niche differences in resources, predators that keep dominant competitors in check, disturbance, and spatial patchiness.
!: Saying the principle means similar species never coexist. It means complete competitors don't coexist under constant conditions; small niche differences, changing conditions or predation can allow coexistence.
EV: established | Laboratory experiments with protists, beetles and plants show that species competing for one limiting resource under constant conditions usually end with one excluding the other.
EV: contested | Whether the high diversity of many natural communities depends mainly on niche differences, fluctuating conditions or near-neutral dynamics is debated.
T: Competitive exclusion principle | Two species competing for the same limiting resources can't coexist indefinitely
T: Competition coefficient | A measure (α) of the per capita effect of one species on another's growth, relative to its effect on itself
T: Paradox of the plankton | The coexistence of many phytoplankton species on few shared resources, apparently contradicting competitive exclusion
SUM: Gause's Paramecium showed that complete competitors can't coexist; species with different feeding zones could.
SUM: Lotka–Volterra competition predicts coexistence when each species limits itself more than the other; changing conditions and predation also allow coexistence.
SRC: Gause G. F., The Struggle for Existence, Williams and Wilkins | primary | 1934
SRC: Hardin G., "The competitive exclusion principle", Science 131(3409):1292–1297 | primary | 1960 | https://doi.org/10.1126/science.131.3409.1292
SRC: Hutchinson G. E., "The paradox of the plankton", American Naturalist 95(882):137–145 | primary | 1961 | https://doi.org/10.1086/282171
Q: State the competitive exclusion principle. | Two species competing for exactly the same limiting resources can't coexist indefinitely; one will exclude the other.
Q: When does the Lotka–Volterra model predict stable coexistence? | When each species limits its own growth more than it limits the other's (α₁₂ < K₁/K₂ and α₂₁ < K₂/K₁).
M1#ecology-u03-02-q1@1: In Gause's experiment, what happened when Paramecium aurelia and P. caudatum were grown together? | P. aurelia persisted and P. caudatum died out | Both reached their normal carrying capacities | P. caudatum excluded P. aurelia | Both died out | P. aurelia used the shared bacterial food more efficiently and excluded P. caudatum.
M2#ecology-u03-02-q2@2: Two beetles compete in flour. At one temperature species A always wins; at another, species B wins. What does this suggest? | The outcome of competition depends on environmental conditions | Competitive exclusion never happens | The beetles don't compete | Temperature doesn't affect beetles | Park's Tribolium experiments showed that conditions change which species is the better competitor.
TF3#ecology-u03-02-q3@3: The Lotka–Volterra competition model can predict that either species may win, depending on starting numbers. | true | When each species limits the other more than itself, the outcome depends on which starts more abundant.
M3#ecology-u03-02-q4@3: Which is the best explanation for the "paradox of the plankton"? | Conditions change before exclusion is complete, and niche differences, predators and patchiness slow exclusion | Phytoplankton don't compete for nutrients | The competitive exclusion principle has been disproved | All phytoplankton species are identical | Hutchinson proposed that fluctuating conditions prevent equilibrium; later work adds niche differences and grazing.
SA3#ecology-u03-02-q5@2,3: Explain how Paramecium bursaria and P. caudatum were able to coexist in Gause's experiments, and evaluate the competitive exclusion principle as an explanation of community structure. | P. caudatum fed on bacteria suspended in the water, while P. bursaria fed at the bottom of the tube (and contains symbiotic algae), so their niches differed in feeding zone: resource partitioning reduced competition and allowed coexistence. The principle explains laboratory results and many cases of niche separation, but in nature conditions fluctuate, predators and disturbance prevent dominance, and spatial patchiness allows species to persist; neutral theory suggests similar species can coexist for long periods by chance. So it is a valid principle under constant conditions but only one influence on real communities. | Different feeding zones ; Niche difference reduces competition ; Principle supported by lab experiments ; Factors allowing coexistence in nature ; Judgement

## Resource partitioning and niche differentiation
LV: Intermediate · Application
S: Species that share a habitat often divide resources by food type, place, time or method, reducing competition. This lesson describes resource partitioning and character displacement, with evidence from warblers, lizards and Darwin's finches.
O: Describe the ways species partition resources
O: Explain character displacement and the evidence for it
O: Evaluate whether observed niche differences are caused by present or past competition
PRE: The competitive exclusion principle
H: Ways of dividing resources
- **Food type or size**: in the UK, great tits take larger prey than blue tits; different bill sizes in finches correspond to seeds of different sizes.
- **Place (spatial partitioning)**: MacArthur's (1958) warblers foraged in different parts of spruce trees; *Anolis* lizards in the Caribbean use perches of different heights and diameters (Schoener, 1968).
- **Time (temporal partitioning)**: kestrels and barn owls hunt voles in the same fields, kestrels by day and barn owls mostly at dusk and night.
- **Method**: some wading birds probe deep in mud (curlew, with a long bill), others pick from the surface (ringed plover).
K: Resource partitioning lets similar species coexist by reducing niche overlap in at least one dimension: what, where, when or how they feed.
H: Character displacement
P: **Character displacement** is the evolution of greater differences between two species where they live together (**sympatry**) than where they live apart (**allopatry**), because competition selects for divergence.
X: Darwin's finches on Daphne Major (Grant and Grant, 2006).
> The medium ground finch, *Geospiza fortis*, lived on Daphne Major and fed on seeds of a range of sizes, including the large, hard seeds of *Tribulus*.
> In 1982 the large ground finch, *G. magnirostris*, colonised the island and competed for large seeds.
> After a drought in 2004–05 food was scarce; *G. fortis* individuals with large beaks died disproportionately, because *G. magnirostris* took the large seeds.
> The mean beak size of *G. fortis* fell: character displacement observed in the wild within a few years.
H: The "ghost of competition past"
P: Connell (1980) warned that present-day niche differences may reflect competition in the past that has since been removed by evolution, the **ghost of competition past**, or may have arisen for other reasons. A niche difference alone doesn't prove competition; it needs evidence such as removal experiments, or patterns of displacement in sympatry versus allopatry.
!: Calling every difference between coexisting species "resource partitioning caused by competition". Differences can evolve independently, for example in response to different predators or habitats.
EV: established | Character displacement in beak size was documented in Darwin's finches on Daphne Major after the arrival of a competitor.
EV: contested | How often niche differences among coexisting species were produced by competition, rather than other causes, is hard to establish and debated.
T: Resource partitioning | The division of limited resources among species, reducing competition
T: Character displacement | Greater divergence in a trait between two species where they coexist than where they live apart
T: Sympatric | Living in the same geographic area
SUM: Species partition resources by food type, place, time or method, reducing niche overlap.
SUM: Character displacement shows competition driving divergence; present differences may reflect past competition or other causes.
SRC: Grant P. R. and Grant B. R., "Evolution of character displacement in Darwin's finches", Science 313(5784):224–226 | primary | 2006 | https://doi.org/10.1126/science.1128374
SRC: Connell J. H., "Diversity and the coevolution of competitors, or the ghost of competition past", Oikos 35(2):131–138 | primary | 1980 | https://doi.org/10.2307/3544421
SRC: Schoener T. W., "The Anolis lizards of Bimini: resource partitioning in a complex fauna", Ecology 49(4):704–726 | primary | 1968 | https://doi.org/10.2307/1935534
Q: What is character displacement? | The evolution of greater differences between two species where they coexist than where they live apart, driven by competition.
Q: Give four dimensions in which species can partition resources. | Food type or size, place, time and feeding method.
M1#ecology-u03-03-q1@1: Kestrels hunting voles by day and barn owls hunting them at night show which kind of partitioning? | Temporal | Spatial | Food-size | Method only | They divide the resource by time of activity.
M2#ecology-u03-03-q2@2: A beetle species has a larger body where a smaller relative is present than on islands where it lives alone. Which process best explains this? | Character displacement | Competitive exclusion | Commensalism | Genetic drift alone | Divergence in sympatry compared with allopatry is the signature of character displacement.
MATCH2#ecology-u03-03-q3@2: Match each example to its type of partitioning. | Warblers in different parts of a spruce = Spatial ; Great and blue tits taking different prey sizes = Food size ; Curlew probing deep, plover picking surface = Feeding method ; Kestrel by day, barn owl at night = Temporal | Each pair coexists by reducing overlap in one niche dimension.
M3#ecology-u03-03-q4@3: Why is the "ghost of competition past" a problem for studying competition? | Present niche differences may reflect past competition, or none, so they can't by themselves show competition now | Ghosts of extinct species compete with living ones | Competition always leaves no trace | Past competition always prevents coexistence | Connell argued that observed differences are not evidence of current competition without experiments.
SA3#ecology-u03-03-q5@2,3: Describe the evidence for character displacement in Darwin's finches and explain why it is stronger evidence for competition than a simple observation of niche differences. | When G. magnirostris colonised Daphne Major in 1982, it competed with G. fortis for large seeds. In the 2004–05 drought, large-beaked G. fortis suffered higher mortality, and the population's mean beak size fell, measured before and after. Because the change was observed in real time after the competitor's arrival, with selection measured on individuals, it links competition causally to divergence. A static niche difference could have other causes (different predators, habitats or chance), or reflect past competition, so it is weaker evidence. | Arrival of competitor ; Drought and selective mortality ; Beak size change measured ; Real-time cause and effect ; Why static differences are weaker

## Predation
LV: Introductory · Application
S: Predation is the killing and eating of one animal by another, and it shapes both prey behaviour and evolution. This lesson covers predator strategies, prey defences such as camouflage, warning colours and mimicry, and how predators respond to prey density.
O: Describe predator adaptations and prey defences, including crypsis, aposematism and mimicry
O: Explain Holling's type I, II and III functional responses
O: Analyse how predator–prey interactions drive coevolution
PRE: Biotic interactions: an overview
H: Predators and their prey
P: **Predation** in the strict sense means one animal killing and eating another (true predation). Predators range from ambush hunters such as pike to pursuit hunters such as peregrine falcons, and from generalists such as foxes, which take many prey, to specialists such as Canada lynx, which depend heavily on snowshoe hares.
H: Prey defences
- **Crypsis (camouflage)**: blending in, like the peppered moth on lichen-covered bark or a ptarmigan in winter white.
- **Aposematism (warning colouration)**: bright colours advertise toxicity or distastefulness. The black-and-yellow cinnabar moth caterpillar is toxic from alkaloids in the ragwort it eats.
- **Batesian mimicry**: a harmless species resembles a harmful one; many hoverflies mimic wasps.
- **Müllerian mimicry**: several harmful species share the same warning pattern, so predators learn faster; many bumblebee and wasp species share black-and-yellow bands.
- **Behaviour**: vigilance, alarm calls, fleeing, and grouping. In a group, each individual's risk is diluted, and more eyes spot predators sooner.
K: Prey defences, from camouflage to warning signals and mimicry, are adaptations shaped by predators; predators in turn evolve better detection and capture, a coevolutionary arms race.
H: Functional responses
P: A predator's **functional response** is how its rate of eating prey changes with prey density (Holling, 1959):
- **Type I**: consumption rises linearly with prey density up to a maximum (filter feeders such as *Daphnia*).
- **Type II**: rises then levels off, because handling time (catching, eating, digesting) limits intake. The commonest type.
- **Type III**: sigmoid; little eating at low prey density, then a rapid rise, then a plateau. Occurs when predators switch to a prey only once it is common, or prey have refuges at low density.
X: Why a type III response can stabilise prey numbers.
> At low prey density a switching predator ignores the prey and hunts something commoner.
> The proportion of prey eaten rises as prey increase over the middle range: predation is then density-dependent.
> This can stop a prey population increasing, and prevents it being driven to extinction at low density.
P: Predators also show a **numerical response**: their numbers rise with prey density through breeding and immigration. Short-eared owls and kestrels breed more and gather where voles are abundant.
!: Assuming predators always control prey. With type II responses the proportion eaten falls as prey increase, so predators can't stop an outbreak once it starts.
EV: established | Warning colouration and mimicry have been shown experimentally to reduce predation, with predators learning to avoid aposematic prey.
EV: contested | How often predators regulate, rather than merely track, their prey populations varies greatly and is debated for many systems.
T: Aposematism | Conspicuous warning colouration advertising that prey is toxic or distasteful
T: Batesian mimicry | A harmless species resembling a harmful one, gaining protection
T: Müllerian mimicry | Two or more harmful species sharing a similar warning pattern
T: Functional response | The relationship between a predator's consumption rate and prey density
SUM: Predators and prey coevolve: prey use crypsis, warning signals, mimicry and behaviour; predators improve detection and capture.
SUM: Holling's type I, II and III functional responses describe consumption against prey density; type III can be stabilising.
SRC: Holling C. S., "Some characteristics of simple types of predation and parasitism", Canadian Entomologist 91(7):385–398 | primary | 1959 | https://doi.org/10.4039/Ent91385-7
SRC: Ruxton G. D., Sherratt T. N. and Speed M. P., Avoiding Attack: The Evolutionary Ecology of Crypsis, Warning Signals and Mimicry, Oxford University Press | secondary | 2004
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 45.6 "Community ecology" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/45-6-community-ecology
Q: What is the difference between Batesian and Müllerian mimicry? | Batesian: a harmless species copies a harmful one. Müllerian: several harmful species share a warning pattern.
Q: Why does a type II functional response level off? | Handling time (catching, eating and digesting each prey) limits how many prey a predator can consume.
M1#ecology-u03-04-q1@1: A harmless hoverfly with black and yellow stripes like a wasp shows | Batesian mimicry | Müllerian mimicry | crypsis | aposematism of its own toxins | The hoverfly is harmless and gains protection by resembling a stinging wasp.
M2#ecology-u03-04-q2@2: A predator's intake rises steeply with prey density at first, then levels off. What limits intake at high prey density? | Handling time | The predator's numerical response | Prey crypsis | Competition among prey | When prey are abundant, time spent handling each prey caps the consumption rate: a type II response.
TF2#ecology-u03-04-q3@2: Living in a group can reduce each individual's risk of being caught by a predator. | true | Dilution and earlier detection by many eyes reduce individual risk.
M3#ecology-u03-04-q4@3: Which functional response is most likely to stabilise a prey population against both outbreak and extinction? | Type III, because the proportion eaten rises with prey density over the middle range and is low at low density | Type I, because it never levels off | Type II, because the proportion eaten falls as prey increase | None, because predators never affect prey numbers | In type III, predation is density-dependent at intermediate densities and relaxes at low density, a stabilising pattern.
SA2#ecology-u03-04-q5@2,3: Explain how warning colouration can evolve and be maintained in a toxic prey species. | Toxic prey that are conspicuous are recognised and learned by predators after one or a few attacks; the predators then avoid similar-looking prey. Individuals with clearer warning signals are therefore attacked less, so the alleles for conspicuous colours spread by natural selection. Signals are maintained because predators continue to learn, and Müllerian mimicry among several toxic species shares the cost of educating predators. The cinnabar caterpillar's black and yellow bands, with alkaloids from ragwort, is an example. | Predators learn to avoid ; Conspicuous individuals survive better ; Selection spreads the trait ; Mimicry or maintenance explained ; Example

## Predator–prey dynamics
LV: Intermediate · Evaluation
S: Predators and prey affect each other's numbers, sometimes producing cycles and sometimes stable coexistence or extinction. This lesson tests the Lotka–Volterra predictions against laboratory and field studies, from Gause's protists and Huffaker's mites to wolves and moose on Isle Royale.
O: Describe the predictions of predator–prey models, including lagged cycles
O: Explain how refuges, spatial structure and enrichment change predator–prey dynamics
O: Evaluate laboratory and field evidence on predator–prey coexistence
PRE: Predation
H: What models predict
P: The Lotka–Volterra model (see Population cycles and fluctuations) predicts coupled oscillations, with predator peaks following prey peaks. More realistic models add prey self-limitation (a carrying capacity) and a type II functional response (the Rosenzweig–MacArthur model); these can give either damped oscillations to a stable equilibrium or persistent cycles, depending on parameter values.
P: Rosenzweig (1971) showed a surprising prediction: enriching the prey's environment (raising K) can **destabilise** the system, turning a stable equilibrium into large cycles that risk extinction: the **paradox of enrichment**.
K: Simple predator–prey models predict oscillations; whether real systems cycle, stabilise or crash depends on prey self-limitation, functional responses, refuges and space.
H: Laboratory tests
X: Gause, Huffaker and refuges.
> Gause (1934) put the predatory protist *Didinium* with *Paramecium* in a tube: *Didinium* ate all the prey, then starved. Both went extinct.
> When sediment gave *Paramecium* a refuge, the predator starved and the prey recovered: no cycle either.
> Only with regular immigration of both species did repeated oscillations occur.
> Huffaker (1958) used oranges as habitat for a herbivorous mite and a predatory mite. In a simple arrangement both went extinct; in a complex array of oranges with barriers slowing predator dispersal, predator and prey persisted through several oscillations.
P: These experiments show that **spatial heterogeneity**, refuges and dispersal let predators and prey persist: prey escape to unoccupied patches before predators arrive, so local extinctions are balanced by recolonisation, a metapopulation effect.
H: Field evidence
P: On Isle Royale, an island in Lake Superior, wolves and moose have been studied since 1958, the longest continuous predator–prey study. Moose and wolf numbers fluctuated, with wolf numbers following moose, but the dynamics were also driven by severe winters, ticks, and a canine parvovirus epidemic in the 1980s. Inbreeding left only two wolves by 2016–2018, and wolves were reintroduced from 2018.
!: Expecting real predator–prey data to show the smooth cycles of the Lotka–Volterra model. Real dynamics include weather, disease, other prey and predators, and chance.
EV: established | Laboratory predator–prey systems usually go extinct in simple, homogeneous conditions and persist longer when refuges or spatial structure are added, as Huffaker showed.
EV: contested | Whether the paradox of enrichment occurs widely in natural systems is debated; many enriched systems don't show the predicted instability.
T: Refuge | A place or condition in which prey are protected from predators
T: Paradox of enrichment | The model prediction that increasing prey carrying capacity can destabilise predator–prey dynamics
T: Spatial heterogeneity | Variation in habitat across space, creating patches that differ in conditions or occupancy
SUM: Predator–prey models predict lagged oscillations; refinements can stabilise or destabilise them, including the paradox of enrichment.
SUM: Laboratory systems persist only with refuges or spatial structure; field systems such as Isle Royale combine predation with weather, disease and chance.
SRC: Huffaker C. B., "Experimental studies on predation: dispersion factors and predator–prey oscillations", Hilgardia 27(14):343–383 | primary | 1958 | https://doi.org/10.3733/hilg.v27n14p343
SRC: Rosenzweig M. L., "Paradox of enrichment: destabilization of exploitation ecosystems in ecological time", Science 171(3969):385–387 | primary | 1971 | https://doi.org/10.1126/science.171.3969.385
SRC: Vucetich J. A. and Peterson R. O., Ecological Studies of Wolves on Isle Royale, annual report, Michigan Technological University | data | 2023 | https://isleroyalewolf.org
Q: What happened in Gause's Didinium–Paramecium experiment without refuges? | The predator ate all the prey, then starved; both went extinct.
Q: What is the paradox of enrichment? | Raising the prey's carrying capacity can destabilise a predator–prey system into large oscillations that risk extinction.
M1#ecology-u03-05-q1@1: What did Huffaker's orange experiments show allowed predator and prey mites to persist? | A complex arrangement of habitat patches that slowed predator dispersal | Removing all barriers between oranges | Using a single large orange | Adding more predators | Spatial heterogeneity let prey escape to new patches before predators found them.
M2#ecology-u03-05-q2@2: In a predator–prey model, adding more food for the prey changes a stable equilibrium into large cycles. What is this effect called? | The paradox of enrichment | Competitive exclusion | Character displacement | The Allee effect | Rosenzweig showed enrichment can destabilise predator–prey dynamics.
TF2#ecology-u03-05-q3@2: On Isle Royale, wolf and moose numbers were influenced by winter weather and disease as well as by predation. | true | Severe winters, ticks and canine parvovirus all affected the populations, alongside predator–prey interactions.
M3#ecology-u03-05-q4@3: Why do simple laboratory predator–prey systems often go extinct, while natural systems persist? | Natural systems have refuges, spatial structure, alternative prey and immigration that prevent overexploitation | Laboratory predators are always more efficient than wild ones | Natural prey never fluctuate | Predation doesn't occur in nature | Homogeneous lab conditions let predators find every prey; heterogeneity and dispersal in nature allow recolonisation and persistence.
SA3#ecology-u03-05-q5@2,3: Evaluate the Lotka–Volterra predator–prey model using evidence from laboratory and field studies. | The model predicts lagged, coupled oscillations, which are seen in hare–lynx data and in some laboratory systems with immigration (Gause) or spatial structure (Huffaker). But simple lab systems usually go extinct rather than cycle, because the model ignores space, refuges and functional responses; the model's cycles are neutral (depend on starting numbers) and unrealistic. Field systems such as Isle Royale are driven also by weather, disease, inbreeding and chance. Refined models (prey self-limitation, type II responses) and metapopulation approaches fit better. The model remains useful for explaining lags and coupling but is too simple for prediction. | Model predictions ; Supporting evidence ; Laboratory extinction and refuges ; Field complexity ; Judgement

## Herbivory and plant defences
LV: Intermediate · Application
S: Herbivores eat plants, and plants defend themselves physically, chemically and by tolerating damage. This lesson covers herbivore impacts, constitutive and induced defences, and theories that predict how much a plant invests in defence.
O: Describe physical and chemical defences of plants against herbivores
O: Explain the difference between constitutive and induced defences, and tolerance
O: Apply the resource availability hypothesis to predict plant defence
PRE: Predation
H: Herbivores and their impact
P: **Herbivory** is the eating of plants or algae. Grazers eat grasses and low vegetation; browsers eat leaves and shoots of trees and shrubs; others feed on seeds, sap, nectar or roots. Unlike most predators, herbivores often eat part of a plant without killing it, but they can still shape vegetation strongly: rabbit and sheep grazing maintain the short, flower-rich turf of chalk downland, and high deer densities prevent woodland regeneration across much of Britain.
H: Plant defences
- **Physical**: thorns and spines (hawthorn, holly's spiny lower leaves), hairs (trichomes) that hinder insects, tough leaves and silica in grass leaves that wears down teeth.
- **Chemical**: toxins and deterrents, often secondary metabolites: alkaloids (nicotine, the pyrrolizidine alkaloids of ragwort), tannins (bind proteins, reducing digestibility, as in oak leaves), cyanogenic glycosides (release hydrogen cyanide when cells are crushed, as in some white clover) and glucosinolates (mustard oils in brassicas).
- **Indirect**: attracting the herbivore's enemies, for example by releasing volatile chemicals that draw in parasitic wasps when caterpillars feed.
K: Plants defend themselves with structures, chemicals and recruited allies; many defences are switched on only after attack.
H: Constitutive, induced and tolerance
P: **Constitutive** defences are always present. **Induced** defences are produced in response to damage, often signalled by the plant hormone jasmonic acid; they save costs when herbivores are absent. **Tolerance** is the ability to regrow after damage: grasses grow from basal meristems at ground level, so grazing removes leaf tips without destroying the growing point.
X: White clover and cyanide (an established British example).
> Some white clover plants are cyanogenic and others not, a genetic polymorphism.
> Cyanogenic plants are eaten less by slugs and snails.
> But cyanogenic forms are rarer in colder regions and at higher altitude, where freezing damages cells and releases cyanide that harms the plant itself.
> The polymorphism reflects a balance between protection from herbivores and the cost of the defence.
H: How much defence?
P: The **resource availability hypothesis** (Coley, Bryant and Chapin, 1985) predicts that plants in resource-poor environments, which grow slowly and can't easily replace lost tissue, invest more in long-lasting defences such as tannins and tough leaves. Fast-growing plants of rich environments invest less and replace tissue instead.
!: Treating defensive chemicals as waste products. They are costly adaptations, and their concentration often varies with herbivore pressure and resources.
EV: established | Induced defences triggered by jasmonic acid signalling after herbivore damage are widespread in plants.
EV: contested | General theories of plant defence allocation, including the resource availability hypothesis, fit some comparisons well but not others, and remain debated.
T: Herbivory | The consumption of plants or algae by animals
T: Secondary metabolite | A compound not needed for basic metabolism, often used in defence, such as alkaloids and tannins
T: Induced defence | A defence produced or increased in response to herbivore damage
T: Tolerance | A plant's ability to regrow and reproduce despite damage
SUM: Herbivores shape vegetation; plants defend with physical structures, chemicals and indirect defences.
SUM: Defences may be constitutive or induced, or plants may tolerate damage; slow-growing plants of poor sites invest most in defence.
SRC: Coley P. D., Bryant J. P. and Chapin F. S., "Resource availability and plant antiherbivore defense", Science 230(4728):895–899 | primary | 1985 | https://doi.org/10.1126/science.230.4728.895
SRC: Karban R. and Baldwin I. T., Induced Responses to Herbivory, University of Chicago Press | secondary | 1997
SRC: Begon M. and Townsend C. R., Ecology: From Individuals to Ecosystems, 5th edition, Wiley, chapter 9 | secondary | 2021
Q: What is the difference between a constitutive and an induced defence? | A constitutive defence is always present; an induced defence is produced in response to damage.
Q: Why can grasses tolerate grazing? | Their growing points (meristems) are at the base, near the ground, so grazing removes leaf tips but not the meristem.
M1#ecology-u03-06-q1@1: Tannins in oak leaves defend against herbivores mainly by | binding proteins and reducing digestibility | stinging the herbivore | attracting pollinators | making leaves photosynthesise faster | Tannins bind to proteins, making leaves less nutritious and harder to digest.
M2#ecology-u03-06-q2@2: Cyanogenic white clover is less common in cold upland areas. Which explanation fits best? | Freezing damages cells, releasing cyanide that harms the plant, so the defence is costly there | Herbivores are absent in the uplands | Cold weather increases cyanide production in all clover | Upland soils lack the nitrogen to make cyanide | Frost damage makes the defence harmful to the plant, so selection favours non-cyanogenic plants where frosts are frequent.
TF1#ecology-u03-06-q3@1: Some plants release chemicals after caterpillar attack that attract parasitic wasps. | true | This indirect defence recruits the herbivore's natural enemies.
M3#ecology-u03-06-q4@3: According to the resource availability hypothesis, which plant should invest most in long-lasting chemical defences? | A slow-growing shrub on nutrient-poor heath | A fast-growing annual weed on rich soil | A crop plant given fertiliser | A tree seedling in a fertilised nursery | Tissue is costly to replace on poor soils, so slow-growing plants protect what they have.
SA2#ecology-u03-06-q5@2,3: Explain why induced defences might be favoured over constitutive defences in some plants. | Defences are costly: making toxins or tough tissues uses energy and resources that could go into growth and reproduction. If herbivore attack is unpredictable or infrequent, producing defences only when damaged saves these costs most of the time while still protecting the plant once attack starts. Signals such as jasmonic acid allow a fast response. Where attack is constant and intense, constitutive defences may be better because there is no lag before protection. | Defences are costly ; Herbivory unpredictable ; Saves resources when not needed ; Signalling allows response ; Contrast with constant attack

## Parasitism and disease
LV: Intermediate · Application
S: Parasites and pathogens live on or in hosts, taking resources and often reducing survival or reproduction. This lesson covers types of parasite, life cycles and transmission, the basic reproduction number and the ecological impact of disease, with UK and global examples.
O: Classify parasites by size, location and life cycle
O: Explain how R₀ and host density determine whether a disease spreads
O: Analyse the ecological impact of a named wildlife disease
PRE: Biotic interactions: an overview
H: Kinds of parasite
- **Microparasites**: viruses, bacteria, protists and fungi that multiply within the host (myxoma virus in rabbits, the chytrid fungus in amphibians).
- **Macroparasites**: larger parasites, such as worms, ticks and lice, that grow in or on the host but usually reproduce by producing stages that leave it.
- **Ectoparasites** live on the host's surface (ticks, fleas); **endoparasites** live inside (tapeworms, liver flukes).
- **Direct life cycles** use one host; **indirect life cycles** pass through intermediate hosts or vectors. The liver fluke passes from sheep through a mud snail and back; Lyme disease bacteria are carried by ticks.
- **Brood parasites**, such as the cuckoo, exploit the parental care of other species.
K: Parasites are typically smaller than their hosts, live in close association with them and reduce their fitness without usually killing them quickly; they are probably the commonest way of life on Earth.
H: Spread and R₀
P: The **basic reproduction number**, R₀, is the average number of new infections caused by one infected individual in a fully susceptible population. A disease spreads if R₀ > 1 and dies out if R₀ < 1. For directly transmitted diseases, R₀ rises with host density, so there is a **threshold host density** below which the disease can't persist; culling or vaccination aim to push R₀ below 1.
X: Myxomatosis in British rabbits.
> Myxoma virus, from South American rabbits, was introduced to France in 1952 and reached Britain in 1953.
> It killed over 99% of infected rabbits at first, and the British rabbit population fell drastically.
> Within years, less virulent strains became common (they keep hosts alive longer and spread more) and rabbits evolved resistance.
> The collapse in rabbit grazing let coarse grasses and scrub invade chalk grassland, and the large blue butterfly, whose host ant needs short turf, declined to extinction in Britain by 1979 (later reintroduced).
H: Disease and ecosystems
P: Disease can reshape communities. The amphibian chytrid fungus, *Batrachochytrium dendrobatidis*, has contributed to declines in at least 501 amphibian species and about 90 presumed extinctions (Scheele et al., 2019). Ash dieback, caused by the fungus *Hymenoscyphus fraxineus*, was confirmed in Britain in 2012 and is expected to kill most ash trees, changing woodland light, litter and the many species associated with ash.
!: Assuming parasites evolve to become harmless. Virulence evolves towards whatever level maximises transmission, which may be high or low depending on how the parasite spreads.
EV: established | Myxomatosis devastated British rabbits after 1953, and both virus attenuation and rabbit resistance then evolved.
EV: established | Chytridiomycosis has caused declines in hundreds of amphibian species worldwide.
EV: contested | The exact number of amphibian declines and extinctions caused by chytrid, as opposed to other factors acting together, is debated.
T: Parasite | An organism that lives on or in a host and benefits at the host's expense
T: Vector | An organism, such as a tick or mosquito, that carries a parasite between hosts
T: Basic reproduction number | R₀, the average number of new infections from one infected individual in a fully susceptible population
T: Virulence | The harm a parasite causes its host
SUM: Parasites are micro- or macroparasites, ecto- or endoparasites, with direct or indirect life cycles.
SUM: Diseases spread when R₀ > 1, which depends on host density; disease can transform populations and communities.
SRC: Scheele B. C. et al., "Amphibian fungal panzootic causes catastrophic and ongoing loss of biodiversity", Science 363(6434):1459–1463 | primary | 2019 | https://doi.org/10.1126/science.aav0379
SRC: Anderson R. M. and May R. M., "Population biology of infectious diseases: part I", Nature 280:361–367 | primary | 1979 | https://doi.org/10.1038/280361a0
SRC: Forestry Commission, "Ash dieback" (Hymenoscyphus fraxineus) guidance | guidance | 2024 | https://www.gov.uk/guidance/managing-ash-dieback-in-england
Q: What is R₀ and what value is needed for a disease to spread? | The average number of new infections from one infected individual in a fully susceptible population; it must exceed 1.
Q: Distinguish microparasites from macroparasites. | Microparasites (viruses, bacteria, protists, fungi) multiply within the host; macroparasites (worms, ticks) grow in or on it and usually reproduce via stages that leave it.
M1#ecology-u03-07-q1@1: A tick that carries Lyme disease bacteria between deer and humans is acting as a | vector | definitive host | commensal | competitor | A vector carries a pathogen between hosts.
M2#ecology-u03-07-q2@2: Culling badgers to reduce bovine tuberculosis aims to | lower host density so that R₀ falls below 1 | increase the virulence of the bacterium | vaccinate cattle | make the disease spread faster | Directly transmitted diseases depend on contact rates, so lowering host density can reduce R₀; whether culling achieves this in practice is debated.
TF2#ecology-u03-07-q3@2: The decline of rabbits after myxomatosis contributed to the loss of the large blue butterfly in Britain. | true | Less grazing let turf grow tall, which removed the conditions for the host ant on which the butterfly's caterpillars depend.
M3#ecology-u03-07-q4@3: Myxoma virus became less virulent after its introduction. Which explanation is best? | Strains that kept rabbits alive longer were transmitted more by fleas and mosquitoes, so they spread | Viruses always evolve to become harmless | Rabbits taught the virus to be milder | Highly virulent strains reproduced faster in every rabbit | Very virulent strains killed hosts before much transmission; intermediate virulence maximised spread.
SA3#ecology-u03-07-q5@2,3: Using a named wildlife disease, explain how a pathogen can affect a whole community, not just its host. | Ash dieback: the fungus Hymenoscyphus fraxineus, confirmed in Britain in 2012, kills most infected ash trees. Ash is a common woodland and hedgerow tree; its loss opens the canopy, increasing light and changing ground flora, and changes leaf litter (ash litter is rich and decomposes fast), affecting soil invertebrates and nutrient cycling. Hundreds of species, including lichens, mosses, fungi and insects, use ash; some depend heavily on it and may decline. Replacement trees such as sycamore support different communities. So the disease cascades through the ecosystem. | Names disease and host ; Effect on host population ; Effect on light, litter or structure ; Dependent species affected ; Community-level change

## Mutualism
LV: Introductory · Application
S: In mutualisms both partners benefit, and some of the most important interactions on Earth, from pollination to nitrogen fixation, are mutualistic. This lesson describes obligate and facultative mutualisms, key examples and how cheating is kept in check.
O: Define mutualism and distinguish obligate from facultative mutualisms
O: Describe major mutualisms, including pollination, mycorrhizae, nitrogen-fixing nodules and coral symbiosis
O: Evaluate how mutualisms persist despite the potential for cheating
PRE: Biotic interactions: an overview
H: Mutual benefit
P: **Mutualism** is an interaction in which each species gains a net benefit. **Obligate** mutualists can't survive or reproduce without their partner: fig trees and their pollinating fig wasps; reef-building corals and their algae. **Facultative** mutualists benefit but can live alone: most flowering plants have many possible pollinators.
H: Key mutualisms
- **Pollination**: animals carry pollen in return for nectar or pollen. Klein and colleagues (2007) found that 87 of the world's leading food crops benefit from animal pollination.
- **Mycorrhizae**: fungi colonise roots, extending the absorbing surface far into soil and supplying phosphate, nitrogen and water in return for sugars. Arbuscular mycorrhizae penetrate root cells; ectomycorrhizae, as in oak, birch and pine, sheath the root.
- **Nitrogen fixation**: *Rhizobium* bacteria in the root nodules of legumes (clover, peas, beans) convert atmospheric N₂ to ammonia using the enzyme nitrogenase, receiving sugars and a low-oxygen environment.
- **Coral–algae symbiosis**: zooxanthellae photosynthesise inside coral tissue, supplying most of the coral's energy; the coral provides carbon dioxide, nutrients and shelter.
- **Protection**: in Central America, ants living in the hollow thorns of bullhorn acacias attack herbivores and clear competing plants; the acacia provides shelter and food bodies (Janzen, 1966).
- **Gut symbionts**: microbes in ruminant stomachs digest cellulose that the cow can't.
K: Mutualisms underpin ecosystems: most land plants depend on mycorrhizae, legumes fix nitrogen with bacteria, and many plants and crops rely on animal pollinators.
H: Cheating and stability
P: Each partner could gain by taking the benefit without paying the cost. Nectar-robbing bumblebees bite holes in flowers and take nectar without pollinating. Mutualisms persist because partners **reward cooperation and sanction cheats**: soybean plants reduce the oxygen supply to nodules whose rhizobia don't fix nitrogen (Kiers et al., 2003), and yucca plants abort flowers in which yucca moths lay too many eggs.
X: When a mutualism breaks down: coral bleaching.
> In unusually warm water, coral–algae symbiosis becomes stressed and corals expel their zooxanthellae, turning white (bleaching).
> Without the algae's sugars, corals starve unless the algae return within weeks.
> Repeated marine heatwaves have caused mass bleaching on reefs worldwide, including the Great Barrier Reef (see Coral reefs under climate change).
!: Thinking mutualists are "helping" each other altruistically. Each partner acts in its own interest; the relationship persists because the exchange benefits both.
EV: established | Legume nodules host nitrogen-fixing rhizobia, and plants can sanction nodules that fail to fix nitrogen.
EV: established | Most leading food crops benefit to some degree from animal pollination, although wind-pollinated cereals supply most calories.
EV: contested | How much pollinator decline is reducing crop yields globally, rather than locally, is debated.
T: Obligate mutualism | A mutualism in which at least one partner can't survive or reproduce without the other
T: Mycorrhiza | A mutualistic association between a fungus and plant roots
T: Root nodule | A swelling on legume roots housing nitrogen-fixing bacteria
SUM: Mutualisms, obligate or facultative, include pollination, mycorrhizae, nitrogen fixation, coral symbiosis and protection.
SUM: They persist because partners reward cooperation and sanction cheats; stress can break them down, as in coral bleaching.
SRC: Klein A.-M. et al., "Importance of pollinators in changing landscapes for world crops", Proceedings of the Royal Society B 274(1608):303–313 | primary | 2007 | https://doi.org/10.1098/rspb.2006.3721
SRC: Kiers E. T. et al., "Host sanctions and the legume–rhizobium mutualism", Nature 425:78–81 | primary | 2003 | https://doi.org/10.1038/nature01931
SRC: Janzen D. H., "Coevolution of mutualism between ants and acacias in Central America", Evolution 20(3):249–275 | primary | 1966 | https://doi.org/10.1111/j.1558-5646.1966.tb03364.x
Q: What does each partner gain in the legume–rhizobium mutualism? | The plant gains fixed nitrogen (ammonia); the bacteria gain sugars and a protected, low-oxygen environment.
Q: How do plants keep rhizobia from cheating? | They sanction non-fixing nodules, for example by cutting their oxygen supply, reducing the bacteria's growth.
M1#ecology-u03-08-q1@1: Which is an obligate mutualism? | Reef-building corals and their zooxanthellae | A bumblebee visiting many kinds of flower | A robin following a gardener for worms | A tick feeding on a deer | Reef-building corals depend on their algae for most of their energy; without them they starve.
M2#ecology-u03-08-q2@2: A bumblebee bites a hole in the side of a flower and takes nectar without touching the anthers. This is best described as | cheating on a mutualism | commensalism | parasitism of the bee | competition between flowers | The bee takes the reward without providing pollination, exploiting the mutualism.
MATCH1#ecology-u03-08-q3@1: Match each partner to what it provides. | Rhizobium = Fixed nitrogen ; Mycorrhizal fungus = Phosphate and water ; Zooxanthellae = Products of photosynthesis ; Acacia ants = Defence against herbivores | Each partner supplies a resource or service the other lacks.
M3#ecology-u03-08-q4@3: Why is coral bleaching described as the breakdown of a mutualism? | Heat stress causes corals to expel their algae, so the coral loses its main energy supply | Corals stop competing with algae | Bleached corals gain energy from the sun directly | Bleaching makes the algae parasitic on fish | Warm water disrupts the symbiosis; without photosynthetic partners corals starve unless the algae return.
SA3#ecology-u03-08-q5@2,3: Explain why mycorrhizal fungi are important for plants and ecosystems, and evaluate whether the relationship is always mutualistic. | Fungal hyphae extend far beyond root hairs and absorb phosphate, nitrogen and water, passing them to the plant in exchange for sugars; most land plants form mycorrhizae, so they underpin plant growth, soil structure (hyphae bind aggregates) and carbon flow into soil. The relationship is usually mutualistic, especially in phosphorus-poor soils. But where soil phosphorus is high (for example after heavy fertilising), the plant gains little and still pays sugars, so the net effect can be neutral or negative, a shift along the mutualism–parasitism continuum. | Nutrient and water uptake ; Exchange for sugars ; Ecosystem role ; Conditions where benefit falls ; Judgement on continuum

## Commensalism and facilitation
LV: Intermediate · Application
S: Some species benefit others without being affected, and some make conditions better for their neighbours. This lesson covers commensalism, facilitation by nurse plants and ecosystem engineers such as beavers, and the stress-gradient hypothesis.
O: Define commensalism and facilitation with examples
O: Explain how ecosystem engineers modify habitats for other species
O: Apply the stress-gradient hypothesis to predict when facilitation is important
PRE: Mutualism
H: Commensalism
P: In **commensalism** one species benefits and the other is neither helped nor harmed. Examples include **epiphytes** (mosses, lichens and ferns living on tree branches for light), **phoresy** (pseudoscorpions hitching rides on flies; burdock burs carried in fur) and animals using another's leftovers, such as gulls following a plough. Proving commensalism is hard: a tree may lose a little light to its epiphytes, or a fox may be irritated by burs.
H: Facilitation
P: **Facilitation** is any interaction in which one species improves conditions for another: it includes mutualism and commensalism. **Nurse plants** shelter seedlings of other species: in the Sonoran Desert, young saguaro cacti survive mainly in the shade of shrubs and trees such as palo verde. On salt marshes, plants such as cordgrass oxygenate and stabilise sediment, allowing other plants to establish.
P: The **stress-gradient hypothesis** (Bertness and Callaway, 1994) predicts that facilitation becomes more important, and competition less, as physical stress increases. In harsh places, the benefit of shelter outweighs the cost of sharing resources.
X: Facilitation on a mountain.
> At low altitude, shrubs compete with seedlings for light and water: removing shrubs helps seedlings.
> At high altitude, cold and wind are severe: removing shrubs reduces seedling survival, because they shelter them.
> Callaway and colleagues (2002) found this switch from competition to facilitation with altitude in alpine plants on several continents.
K: Facilitation is common where conditions are harsh: shelter, shade or improved soils from one species can outweigh competition with it.
H: Ecosystem engineers
P: **Ecosystem engineers** physically create or modify habitats (Jones, Lawton and Shachak, 1994). Beavers build dams that create ponds and wetlands, slowing flood flows, trapping sediment and increasing the diversity of plants, invertebrates, amphibians and bats. Beavers have been reintroduced to Scotland and, through enclosed and licensed releases, to England. Earthworms engineer soils; reef-building corals and oyster beds engineer marine habitats.
!: Assuming facilitation is always mutual. A nurse plant may gain nothing, or even suffer, from the seedlings it shelters.
EV: established | The balance between competition and facilitation shifts towards facilitation under harsher conditions in many plant communities, consistent with the stress-gradient hypothesis.
EV: contested | Whether the stress-gradient hypothesis holds for all types of stress, and at the most extreme stress levels, is debated.
T: Facilitation | An interaction in which one species benefits another by improving conditions or resources
T: Nurse plant | A plant that shelters the seedlings of other species, improving their survival
T: Ecosystem engineer | A species that creates, modifies or maintains habitats by changing the physical environment
SUM: Commensalism benefits one species without affecting the other, though true neutrality is hard to prove.
SUM: Facilitation, by nurse plants and ecosystem engineers such as beavers, matters most under harsh conditions.
SRC: Bertness M. D. and Callaway R., "Positive interactions in communities", Trends in Ecology and Evolution 9(5):191–193 | primary | 1994 | https://doi.org/10.1016/0169-5347(94)90088-4
SRC: Jones C. G., Lawton J. H. and Shachak M., "Organisms as ecosystem engineers", Oikos 69(3):373–386 | primary | 1994 | https://doi.org/10.2307/3545850
SRC: Callaway R. M. et al., "Positive interactions among alpine plants increase with stress", Nature 417:844–848 | primary | 2002 | https://doi.org/10.1038/nature00812
Q: What does the stress-gradient hypothesis predict? | Facilitation becomes more important, and competition less, as environmental stress increases.
Q: Why are beavers called ecosystem engineers? | Their dams create ponds and wetlands, changing water flow and habitats for many other species.
M1#ecology-u03-09-q1@1: A moss growing on a tree branch to reach light, without affecting the tree, is an example of | commensalism | mutualism | parasitism | competition | One species benefits and the other is unaffected.
M2#ecology-u03-09-q2@2: Removing shrubs increases seedling survival in a sheltered valley but reduces it on an exposed ridge. Which hypothesis explains this? | The stress-gradient hypothesis | The intermediate disturbance hypothesis | The competitive exclusion principle | The resource availability hypothesis | Under low stress shrubs compete with seedlings; under high stress their shelter facilitates them.
TF2#ecology-u03-09-q3@2: Facilitation includes both mutualism and commensalism. | true | Facilitation means any positive effect of one species on another, whether or not the benefit is returned.
M3#ecology-u03-09-q4@3: Why is commensalism difficult to demonstrate in the field? | Small costs or benefits to the supposedly unaffected partner are hard to detect | Commensal species are always invisible | Commensalism only occurs in laboratories | Both partners are always harmed | Showing an effect of exactly zero requires precise measurement; many supposed commensalisms have small effects.
SA2#ecology-u03-09-q5@2,3: Explain how beavers increase biodiversity, and suggest one reason their reintroduction can be controversial. | Beaver dams create ponds and wetlands, slow and spread water, trap sediment and create dead wood and open areas; this diversifies habitats, increasing aquatic plants, invertebrates, amphibians, fish refuges, birds and bats. They can also reduce flood peaks downstream. Controversy: flooding of farmland, felled trees, blocked drains and culverts, and concerns about fish migration, so reintroductions need management plans and consultation with landowners. | Dams create wetlands ; Habitat diversification ; Species benefiting ; Flow or flood effect ; A source of controversy

## What is an ecological community?
LV: Introductory · Application
S: A community is the set of populations of different species living and interacting in an area. This lesson covers community properties, the Clements–Gleason debate about what communities are, and how British vegetation is classified.
O: Define a community and describe its main properties
O: Compare the organismic (Clements) and individualistic (Gleason) views of communities
O: Interpret changes in species composition along an environmental gradient
PRE: Levels of ecological organisation
H: Defining a community
P: An ecological **community** is all the populations of different species living and interacting in a particular area. Ecologists often study subsets: the bird community of a wood, the plant community of a meadow, the invertebrate community of a stream. Community properties include:
- **Species richness**: the number of species.
- **Species diversity**: richness combined with evenness (how equally individuals are spread among species).
- **Composition**: which species are present.
- **Dominance**: which species are most abundant or have the most biomass.
- **Trophic structure**: the feeding relationships between species.
- **Physical structure**: layers such as canopy, shrub, field and ground layers in a wood.
H: Superorganism or coincidence?
P: Clements (1916) saw plant communities as tightly integrated units, almost **superorganisms**, that develop to a predictable climax determined by climate. Gleason (1926) argued in his **individualistic concept** that each species responds independently to the environment according to its own tolerances, so communities are loose, changing assemblages of species that happen to share conditions.
X: Gradient analysis.
> Whittaker (1967) recorded tree species along moisture and altitude gradients in mountains in the USA.
> Each species peaked at a different point along the gradient, and their ranges overlapped in many different ways.
> There were no sharp boundaries where whole groups of species replaced one another together.
> This supported Gleason: communities change gradually as a **continuum**.
K: Most evidence supports Gleason's view that species respond individually to environmental gradients, so community boundaries are usually gradual, though sharp boundaries occur where the environment changes abruptly.
H: Classifying British vegetation
P: For practical work, ecologists still classify communities. The **National Vegetation Classification** (NVC), published by Rodwell and colleagues for JNCC from 1991, describes nearly 300 British plant communities, such as W8 (ash–field maple–dog's mercury woodland) and CG2 (sheep's fescue–meadow oat-grass chalk grassland). It is used to survey and designate sites and to set conservation targets.
!: Treating NVC communities as fixed natural units. They are reference types along continua; real sites are often intermediate.
EV: established | Gradient studies show that species usually reach their peaks at different points along environmental gradients, supporting the individualistic view.
EV: contested | How much communities are structured by interactions rather than by individual tolerances and chance is debated.
T: Community | All the populations of different species living and interacting in an area
T: Individualistic concept | Gleason's view that each species is distributed according to its own tolerances, so communities are loose assemblages
T: Continuum | Gradual change in species composition along an environmental gradient
SUM: A community is all the interacting species in an area, described by richness, diversity, composition, dominance and structure.
SUM: Gleason's individualistic, continuum view is better supported than Clements' superorganism, but classifications such as the NVC remain useful tools.
SRC: Gleason H. A., "The individualistic concept of the plant association", Bulletin of the Torrey Botanical Club 53(1):7–26 | primary | 1926 | https://doi.org/10.2307/2479933
SRC: Whittaker R. H., "Gradient analysis of vegetation", Biological Reviews 42(2):207–264 | primary | 1967 | https://doi.org/10.1111/j.1469-185X.1967.tb01419.x
SRC: JNCC, "National Vegetation Classification" | standard | 2024 | https://jncc.gov.uk/our-work/nvc/
Q: What was Gleason's individualistic concept? | Each species is distributed according to its own tolerances, so communities are loose, changing assemblages rather than integrated units.
Q: What is the National Vegetation Classification? | A JNCC-published classification of nearly 300 British plant communities, used for survey and conservation.
M1#ecology-u03-10-q1@1: Which property of a community combines the number of species with how evenly individuals are spread among them? | Species diversity | Species richness | Dominance | Trophic structure | Diversity includes both richness and evenness; richness is just the count.
M2#ecology-u03-10-q2@2: Along a slope from wet to dry soil, each plant species peaks at a different point, with no sharp boundaries. Which view does this support? | Gleason's individualistic concept | Clements' superorganism concept | Competitive exclusion | Island biogeography | Independent species responses producing a continuum match Gleason's view.
TF1#ecology-u03-10-q3@1: A woodland's canopy, shrub, field and ground layers are part of its physical structure. | true | Vertical layering is a structural property of the community.
M3#ecology-u03-10-q4@3: A sharp boundary between two plant communities is found where limestone meets acid sandstone. Does this contradict the continuum concept? | No: sharp boundaries are expected where the environment itself changes abruptly | Yes: it proves communities are superorganisms | Yes: it proves species never respond individually | No: because plants can't detect soil type | The individualistic view predicts gradual change along gradual gradients and abrupt change where conditions change abruptly.
SA3#ecology-u03-10-q5@2,3: Compare Clements' and Gleason's views of communities and evaluate the evidence for each. | Clements saw communities as integrated units, like superorganisms, developing to a climax set by climate, with species tightly associated. Gleason saw each species responding individually to the environment, so communities are coincidental assemblages. Whittaker's gradient analysis found species peaking at different points with no sharp group boundaries, supporting Gleason; pollen records show species migrated independently after the ice age, forming new combinations. But some species do depend on each other (mutualists, specialists), and sharp boundaries occur at abrupt environmental changes. Overall, Gleason's view is better supported, with interactions adding structure. | Clements' view ; Gleason's view ; Gradient evidence ; Pollen or other evidence ; Qualification ; Judgement

## Keystone species and trophic cascades
LV: Intermediate · Evaluation
S: Some species have effects on their community far larger than their abundance suggests. This lesson explains keystone species through Paine's starfish and the sea otter–kelp system, describes trophic cascades and evaluates the debate over wolves in Yellowstone.
O: Define keystone species and trophic cascade
O: Describe the evidence from Paine's starfish removal and sea otters and kelp
O: Evaluate claims of trophic cascades, including the Yellowstone wolves
PRE: Predation
H: Keystone species
P: A **keystone species** has an effect on its community that is disproportionately large relative to its abundance (Power et al., 1996). Removing it causes major changes in community composition.
X: Paine's starfish (1966).
> On rocky shores at Makah Bay, Washington, the starfish *Pisaster ochraceus* preys on mussels, barnacles and other invertebrates.
> Paine removed starfish by hand from an area of shore and compared it with an untouched control.
> Without starfish, mussels (*Mytilus californianus*) spread and crowded out other species: the number of species in the removal area fell from 15 to 8.
> The starfish kept the dominant competitor in check, allowing more species to coexist.
H: Trophic cascades
P: A **trophic cascade** occurs when a predator's effect on its prey spreads to the next level down. Hairston, Smith and Slobodkin (1960) argued that "the world is green" because predators keep herbivores from eating all the plants: **top-down** control. **Bottom-up** control means resources such as nutrients and plant productivity limit higher levels.
X: Sea otters, urchins and kelp.
> Sea otters eat sea urchins; urchins graze kelp.
> Where otters had been hunted out in the Aleutian Islands, urchins were abundant and kelp forests had been grazed to "urchin barrens".
> Where otters were present, urchins were scarce and kelp forests thrived (Estes and Palmisano, 1974).
> When killer whales later began eating otters in the 1990s, otters declined, urchins increased and kelp declined again.
K: Keystone predators maintain diversity or vegetation by controlling dominant competitors or herbivores; removing them can cascade down the food chain.
H: Yellowstone: a contested cascade
P: Wolves were reintroduced to Yellowstone National Park in 1995–96 after an absence of about 70 years. Elk numbers fell, and in some places willows and aspens grew taller. This was widely presented as a trophic cascade, partly through a "landscape of fear" in which elk avoided risky areas. Later studies found the effects smaller and patchier than first claimed, with other causes, including human hunting of elk, bears and cougars, drought, and the loss of beaver dams that had kept valley floors wet, also important.
!: Calling any common or popular species a "keystone". A keystone's effect must be large relative to its abundance and shown by evidence, ideally removal or reintroduction.
EV: established | Paine's starfish removal and the sea otter–urchin–kelp system are well documented examples of keystone predation and trophic cascades.
EV: contested | The strength of the trophic cascade caused by wolf reintroduction in Yellowstone is debated, with studies differing on how much vegetation recovery wolves caused.
T: Keystone species | A species whose effect on its community is disproportionately large relative to its abundance
T: Trophic cascade | Indirect effects of a predator on lower trophic levels, through its effect on its prey
T: Top-down control | Regulation of a community by consumers at higher trophic levels
SUM: Keystone species, such as Pisaster and sea otters, have large effects relative to their abundance.
SUM: Trophic cascades spread predator effects downwards; Yellowstone shows how hard they are to measure in complex systems.
SRC: Paine R. T., "Food web complexity and species diversity", American Naturalist 100(910):65–75 | primary | 1966 | https://doi.org/10.1086/282400
SRC: Estes J. A. and Palmisano J. F., "Sea otters: their role in structuring nearshore communities", Science 185(4156):1058–1060 | primary | 1974 | https://doi.org/10.1126/science.185.4156.1058
SRC: Hairston N. G., Smith F. E. and Slobodkin L. B., "Community structure, population control, and competition", American Naturalist 94(879):421–425 | primary | 1960 | https://doi.org/10.1086/282146
Q: What happened when Paine removed Pisaster starfish? | Mussels took over the shore and the number of species fell from 15 to 8.
Q: Describe the sea otter trophic cascade. | Otters eat urchins; without otters urchins multiply and destroy kelp forests; with otters kelp thrives.
M1#ecology-u03-11-q1@1: A keystone species is one that | has a disproportionately large effect on its community relative to its abundance | is the most abundant species in a community | is always a large herbivore | has no predators | The defining feature is a large effect relative to abundance.
M2#ecology-u03-11-q2@2: After killer whales began eating sea otters, kelp forests declined. What is the chain of cause? | Fewer otters, more urchins, more grazing of kelp | Killer whales ate the kelp directly | More otters ate the kelp | Urchins declined, so kelp declined | Removing the otter released urchins from predation, which then grazed kelp: a trophic cascade.
TF2#ecology-u03-11-q3@2: Bottom-up control means that nutrient supply and plant productivity limit the higher trophic levels. | true | Bottom-up control runs from resources upwards; top-down from predators downwards.
M3#ecology-u03-11-q4@3: Which is the best evaluation of the claim that "wolves restored Yellowstone's rivers"? | Wolves probably contributed, but elk hunting, other predators, drought and loss of beavers also mattered, so the effect is smaller than often claimed | It is proven beyond doubt by the reintroduction | Wolves have had no effect on elk in Yellowstone | Rivers were restored only by planting trees | Later studies found patchy and modest vegetation changes with several causes; the popular story oversimplifies.
SA3#ecology-u03-11-q5@2,3: Using Paine's experiment, explain how a predator can increase species diversity, and evaluate the idea of keystone species. | Pisaster eats mussels, the dominant competitor for space. By keeping mussels in check, it frees space for barnacles, limpets, chitons and algae; when Pisaster was removed, mussels monopolised the rock and richness fell from 15 to 8. So predation on a dominant competitor prevents competitive exclusion. The keystone idea is useful for identifying species that conservation must protect, and has been confirmed in otters and kelp. But the term has been used loosely; keystone effects depend on context (Pisaster's effect varies between shores), and few species have been tested by removal. | Predator controls dominant competitor ; Space freed for other species ; Result of removal ; Usefulness of concept ; Limitation or context-dependence

## Species richness and evenness
LV: Intermediate · Application
S: Diversity has two components: how many species there are (richness) and how evenly individuals are divided among them (evenness). This lesson explains both, calculates Simpson's and Shannon indices and introduces alpha, beta and gamma diversity.
O: Distinguish species richness from species evenness
O: Calculate Simpson's diversity index and interpret the result
O: Explain alpha, beta and gamma diversity and the effect of sampling effort on richness
PRE: What is an ecological community?
H: Richness and evenness
P: **Species richness** (S) is the number of species in a sample or area. **Evenness** describes how equally individuals are spread among species. Two woods might each have ten tree species, but in one a single species makes up 91% of trees, while in the other each makes up about 10%; the second is more diverse because it is more even.
H: Diversity indices
E: D = 1 − Σ(n ÷ N)² :: Simpson's index: n individuals of each species, N total; D ranges from 0 (one species) towards 1 (many even species)
P: AQA A level Biology uses the equivalent form D = N(N − 1) ÷ Σn(n − 1), whose values run from 1 upwards; higher values mean higher diversity. The **Shannon index**, H′ = −Σ p_{i} ln p_{i}, where p_{i} is the proportion of species i, is more sensitive to rare species.
X: Calculating Simpson's index (1 − Σp² form).
> A pond sample contains 10 water boatmen, 6 mayfly nymphs and 4 snails: N = 20.
> Proportions: 0.5, 0.3, 0.2. Squares: 0.25, 0.09, 0.04; sum = 0.38.
> D = 1 − 0.38 = 0.62.
> A second pond with 18 water boatmen, 1 mayfly and 1 snail has Σp² = 0.81 + 0.0025 + 0.0025 = 0.815, so D = 0.185: the same richness, much lower diversity.
K: Diversity indices combine richness and evenness; communities with the same number of species can differ greatly in diversity if one species dominates.
H: Diversity at different scales
- **Alpha (α) diversity**: diversity within one site or habitat.
- **Beta (β) diversity**: the difference in species composition between sites; high when sites share few species.
- **Gamma (γ) diversity**: the total diversity of a region, combining alpha and beta (Whittaker, 1960).
P: Richness depends on how hard you look. A **species accumulation curve** plots species found against sampling effort; it rises steeply then flattens. Comparing raw counts from samples of different size is misleading; methods such as **rarefaction** standardise to the same number of individuals.
!: Comparing species counts from surveys of different size or effort. Larger samples find more species, so effort must be standardised.
EV: established | Simpson's and Shannon indices are standard measures that combine richness and evenness, and species counts increase with sampling effort.
EV: contested | Which diversity index is best depends on the question; indices weight rare and common species differently and can rank communities in different orders.
T: Species richness | The number of species in a sample or area
T: Species evenness | How equally individuals are distributed among species
T: Simpson's diversity index | A diversity measure based on the probability that two individuals drawn at random belong to different species
T: Beta diversity | The difference in species composition between sites
SUM: Diversity combines richness and evenness; Simpson's and Shannon indices measure it.
SUM: Alpha, beta and gamma diversity describe diversity within sites, between sites and across regions; richness depends on sampling effort.
SRC: Magurran A. E., Measuring Biological Diversity, Blackwell | secondary | 2004
SRC: Whittaker R. H., "Vegetation of the Siskiyou Mountains, Oregon and California", Ecological Monographs 30(3):279–338 | primary | 1960 | https://doi.org/10.2307/1943563
SRC: AQA, A level Biology (7402) specification, section 3.4.7 (investigating diversity) | standard | 2015 | https://www.aqa.org.uk/subjects/biology/a-level/biology-7402
Q: What is the difference between species richness and evenness? | Richness is the number of species; evenness is how equally individuals are spread among them.
Q: What is beta diversity? | The difference in species composition between sites.
M1#ecology-u03-12-q1@1: Which measure counts only the number of species present? | Species richness | Simpson's index | Shannon index | Evenness | Richness ignores abundance; indices combine richness and evenness.
NUM2#ecology-u03-12-q2@2: A sample has 5 individuals of species A and 5 of species B. Using D = 1 − Σ(n/N)², what is D? | 0.5 | 0 |  | Each proportion is 0.5; Σp² = 0.25 + 0.25 = 0.5; D = 1 − 0.5 = 0.5.
M2#ecology-u03-12-q3@2: Two meadows each have 12 plant species. In meadow A one grass makes up 80% of the plants; in meadow B no species exceeds 15%. Which is more diverse, and why? | Meadow B, because individuals are spread more evenly | Meadow A, because one species is dominant | They are equally diverse, because richness is equal | Neither can be compared | With equal richness, the more even community has higher diversity.
M3#ecology-u03-12-q4@3: A survey of 50 quadrats finds 40 species and one of 10 quadrats finds 25. Why can't you conclude the first site is more diverse? | Richness rises with sampling effort, so the samples must be standardised, for example by rarefaction | Larger surveys always find fewer species | Quadrat number has no effect on species found | The second site must be more diverse | Species accumulation curves show more effort finds more species; comparisons need equal effort.
SA2#ecology-u03-12-q5@2,3: Explain why a diversity index can give more information than species richness when comparing two habitats. | Richness counts species but ignores how many individuals of each there are. A habitat dominated by one species can have the same richness as one where species are evenly represented, but the second is more diverse: a randomly chosen pair of individuals is more likely to be different species. Indices such as Simpson's combine richness and evenness, so they distinguish these situations; for example, two ponds with three species but proportions 0.5, 0.3, 0.2 and 0.9, 0.05, 0.05 give D = 0.62 and 0.185. | Richness ignores abundance ; Evenness matters ; Index combines both ; Worked or described example

## Island biogeography
LV: Intermediate · Evaluation
S: The equilibrium theory of island biogeography explains species numbers on islands as a balance of immigration and extinction. This lesson develops the theory's curves, tests it with Simberloff and Wilson's experiments and Krakatau, and applies it to nature reserves and the SLOSS debate.
O: Explain the immigration and extinction curves of MacArthur and Wilson's theory
O: Describe experimental and natural tests of the theory
O: Evaluate the application of island biogeography to the design of nature reserves
PRE: Biogeography and the distribution of species
H: The curves
P: As species accumulate on an island, the **immigration rate** of new species falls (fewer species on the mainland list remain to arrive), and the **extinction rate** rises (more species to lose, smaller populations each). Where the curves cross, the number of species is at **equilibrium**, though the identity of species keeps changing: **turnover**. Distance shifts the immigration curve (far islands receive fewer immigrants); area shifts the extinction curve (small islands lose species faster).
K: Island richness is a dynamic equilibrium: species keep arriving and going extinct, while the number stays roughly constant, set by area and isolation.
H: Testing the theory
X: Defaunating mangrove islands (Simberloff and Wilson, 1969).
> Small mangrove islands in the Florida Keys were surveyed for arthropods, then covered in tents and fumigated to remove all animals.
> Within about a year, species numbers returned to close to their original values.
> Near islands recovered more species than far ones.
> The species present after recolonisation were often different from the originals: turnover around an equilibrium, as the theory predicts.
P: The 1883 eruption of Krakatau, Indonesia, sterilised its remnant islands. Plants and animals recolonised over the following century, with richness rising quickly at first and then levelling off, broadly matching the theory, although succession of vegetation also controlled which animals could arrive.
H: Islands of habitat and reserve design
P: Woods in farmland, lakes and nature reserves surrounded by unsuitable land are **habitat islands**. When habitat is reduced to fragments, the theory predicts **relaxation**: species richness falls over time to a new, lower equilibrium. The **SLOSS** debate ("single large or several small" reserves) asked whether one large reserve or several small ones of the same total area hold more species. Large reserves suit species needing large areas and reduce edge effects; several small ones may capture more habitat types and spread risk from catastrophes. The answer depends on the species and how much the small reserves differ.
!: Applying the theory to reserves without considering the surrounding land. Unlike true islands, habitat fragments sit in a matrix that some species can use or cross.
EV: established | Experimental defaunation of mangrove islands showed recolonisation to similar species numbers with turnover of species.
EV: contested | The SLOSS debate has no general answer; the best design depends on species, habitat variety and connectivity.
T: Equilibrium theory of island biogeography | MacArthur and Wilson's theory that island species richness balances immigration and extinction
T: Turnover | The replacement of species on an island through extinction and immigration while richness stays similar
T: Relaxation | The gradual loss of species from a habitat fragment towards a lower equilibrium
T: SLOSS | The debate over whether a single large or several small reserves conserve more species
SUM: Island richness balances falling immigration and rising extinction, shifted by isolation and area, with continual turnover.
SUM: Mangrove defaunation and Krakatau supported the theory; applied to reserves, it informs but doesn't settle SLOSS.
SRC: Simberloff D. S. and Wilson E. O., "Experimental zoogeography of islands: the colonization of empty islands", Ecology 50(2):278–296 | primary | 1969 | https://doi.org/10.2307/1934856
SRC: MacArthur R. H. and Wilson E. O., The Theory of Island Biogeography, Princeton University Press | primary | 1967
SRC: Diamond J. M., "The island dilemma: lessons of modern biogeographic studies for the design of natural reserves", Biological Conservation 7(2):129–146 | primary | 1975 | https://doi.org/10.1016/0006-3207(75)90052-X
Q: Why does the immigration rate fall as an island fills with species? | Fewer species on the mainland pool remain that haven't already arrived.
Q: What is the SLOSS debate? | Whether a single large reserve or several small ones of the same total area conserve more species.
M1#ecology-u03-13-q1@1: In island biogeography, what sets the equilibrium number of species? | The point where immigration and extinction rates are equal | The number of predators on the island | The island's age alone | The number of species on the nearest island | Equilibrium richness is where the immigration and extinction curves cross.
M2#ecology-u03-13-q2@2: After fumigation, a mangrove island regained about the same number of arthropod species, but many were different. Which feature of the theory does this support? | Turnover around a dynamic equilibrium | Competitive exclusion | Character displacement | Succession to a climax | Similar richness with changed identity is turnover at equilibrium.
TF2#ecology-u03-13-q3@2: Habitat fragmentation can lead to a gradual loss of species from remaining fragments, called relaxation. | true | Smaller, isolated fragments have higher extinction and lower immigration, so richness falls to a lower equilibrium.
M3#ecology-u03-13-q4@3: When might several small reserves conserve more species than one large reserve of the same total area? | When the small reserves contain different habitats and the species don't need large areas | When species need very large territories | When edge effects are severe | When a single catastrophe is unlikely and all reserves are identical | Several reserves can capture more habitat variety and spread risk, if their species don't require large areas.
SA3#ecology-u03-13-q5@2,3: Evaluate the use of island biogeography theory in designing nature reserves. | The theory predicts that larger and less isolated reserves hold more species, supporting large reserves, corridors and reserves close together, and predicts relaxation in fragments. It was supported by experiments such as Simberloff and Wilson's. But habitat islands differ from true islands: the surrounding matrix can be partly usable; the theory predicts numbers, not which species (rare or threatened ones may matter most); and SLOSS has no general answer, since several small reserves may cover more habitats. Habitat quality and management are often more important than shape alone. So it is a useful guide, not a design rule. | Predictions for size and isolation ; Supporting evidence ; Matrix difference ; Numbers not identity ; SLOSS or habitat quality ; Judgement

## Ecological succession
LV: Introductory · Application
S: Succession is the directional change in a community's species over time, as organisms modify their environment. This lesson explains how succession works, the changes it produces and the facilitation, tolerance and inhibition models.
O: Define succession and describe the typical changes in a community during succession
O: Explain how pioneer species modify the environment to allow later species to establish
O: Compare the facilitation, tolerance and inhibition models of succession
PRE: What is an ecological community?
H: Succession
P: **Succession** is the gradual, directional change in the species composition of a community over time. Each stage is a **seral stage**, and the whole sequence a **sere**. Succession begins with **pioneer species**, which colonise harsh, open conditions, and moves through intermediate stages to a relatively stable **climax community**.
- Pioneers are typically small, fast-growing, good at dispersal and tolerant of extreme conditions: lichens on rock, marram on sand.
- As each stage grows, dies and decomposes, it adds organic matter and builds soil, increases water and nutrient retention, and provides shade and shelter.
- These changes make conditions less hostile, allowing new species to establish, which often outcompete the pioneers.
K: In succession organisms change their own environment, usually making it more favourable for other species, which then replace them.
H: Typical trends
- Soil depth, humus, nutrient and water content increase.
- Biomass and height increase; the community develops more layers.
- Species richness usually increases, often peaking before the climax.
- The community becomes more stable and less affected by small changes in physical conditions.
- Food webs become more complex.
H: Three models
P: Connell and Slatyer (1977) proposed three mechanisms:
- **Facilitation**: early species make conditions suitable for later ones, which couldn't establish otherwise (the classic view: alder and its nitrogen-fixing bacteria enrich glacier-foreland soils for spruce).
- **Tolerance**: later species can establish at any time but grow slowly; they tolerate the conditions of early stages and eventually overtop them.
- **Inhibition**: early species resist invasion; later species establish only when early ones die or are damaged. Succession proceeds as long-lived species replace short-lived ones.
X: Telling the models apart.
> Experiment: sow late-successional tree seeds into a pioneer stage and into bare ground.
> If they establish only into the pioneer stage, facilitation is supported.
> If they establish in both but grow faster on bare ground, early species are inhibiting them.
> If they establish in both and slowly outgrow the pioneers, tolerance fits.
!: Assuming facilitation always drives succession. Experiments find all three mechanisms, often in the same sere.
EV: established | Succession involves predictable trends such as increasing soil depth, biomass and structural complexity.
EV: contested | The relative importance of facilitation, tolerance and inhibition varies between seres and is still debated.
T: Succession | Directional change in the species composition of a community over time
T: Pioneer species | A species that colonises bare or disturbed ground early in succession
T: Seral stage | One stage in a successional sequence
SUM: Succession is directional community change in which organisms alter conditions and are replaced by others.
SUM: Soil, biomass, structure and diversity tend to increase; facilitation, tolerance and inhibition can all operate.
SRC: Connell J. H. and Slatyer R. O., "Mechanisms of succession in natural communities and their role in community stability and organization", American Naturalist 111(982):1119–1144 | primary | 1977 | https://doi.org/10.1086/283241
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 45.6 "Community ecology" (ecological succession) | secondary | 2018 | https://openstax.org/books/biology-2e/pages/45-6-community-ecology
Q: How do pioneer species change the environment during succession? | They add organic matter, build soil, increase water and nutrient retention and provide shelter, allowing other species to establish.
Q: What are Connell and Slatyer's three models of succession? | Facilitation, tolerance and inhibition.
M1#ecology-u03-14-q1@1: Which is typical of the early stages of succession? | Small, fast-growing pioneer species tolerant of harsh conditions | Tall trees with deep roots | Very deep, humus-rich soil | Highly complex food webs | Pioneers colonise open, harsh conditions; trees, deep soils and complex webs come later.
M2#ecology-u03-14-q2@2: Late-successional shrubs establish in bare ground as well as under pioneers, but grow slowly and only later overtop them. Which model fits? | Tolerance | Facilitation | Inhibition | Competitive exclusion | Later species establish independently of early species and tolerate the conditions until they dominate.
SEQ1#ecology-u03-14-q3@1: Put these changes in the order they typically occur during succession on bare rock. | Lichens colonise bare rock ; Mosses grow in thin soil ; Grasses and herbs establish ; Shrubs establish ; Trees form woodland | Each stage adds organic matter and soil, allowing the next.
M3#ecology-u03-14-q4@3: Why does species richness often peak before the climax stage? | Mid-successional stages mix early and late species, and late-stage dominants may exclude others | Climax communities have no competition | Pioneers are always more diverse than any later stage | Diversity can't change during succession | Intermediate stages contain species from several stages, while dominance by a few large species at climax can reduce richness.
SA2#ecology-u03-14-q5@2,3: Explain how succession leads to an increase in biodiversity, and why this is not always the case at the climax. | Pioneers build soil and organic matter, increasing nutrients, water retention and shelter; this allows more species to establish, and plant layers and structure increase, providing more niches for animals; food webs become more complex. At the climax, a few large dominant species such as oak or beech may shade out others, so plant richness may fall below that of intermediate stages, although structural diversity may remain high. | Soil and nutrient changes ; More species can establish ; More niches and complexity ; Dominance at climax reduces richness

## Primary and secondary succession
LV: Introductory · Application
S: Primary succession starts on newly exposed ground with no soil; secondary succession starts where soil remains after a disturbance. This lesson describes both, with sand dunes, glacier forelands and abandoned fields as examples.
O: Distinguish primary from secondary succession
O: Describe the stages of a sand dune succession (psammosere)
O: Explain why secondary succession is faster than primary succession
PRE: Ecological succession
H: Primary succession
P: **Primary succession** begins on surfaces never before colonised and with no soil: bare rock exposed by a retreating glacier or a lava flow (a **lithosere**), new sand dunes (**psammosere**), or open water filling with sediment (**hydrosere**). Soil must form from scratch, so it is slow: often centuries.
X: A sand dune succession in Britain (for example at Studland or on the Sefton coast).
> Strandline and embryo dunes: salt-tolerant pioneers such as sea rocket, sand couch and lyme grass trap blown sand.
> Yellow (mobile) dunes: marram grass dominates; it grows up through accumulating sand and binds it with extensive roots. Little organic matter, so sand looks yellow.
> Grey (fixed) dunes: as sand stabilises and organic matter accumulates, mosses, lichens and herbs cover the surface, which darkens; pH falls as calcium-rich shell fragments are leached.
> Dune heath, scrub and woodland: heather, then birch, pine or oak on older, leached, acidic soils further inland. Damp hollows (dune slacks) hold their own communities.
K: In primary succession soil must be built from nothing, so it is slow and pioneers are specialists of extreme conditions; on dunes, distance inland is a proxy for time.
H: Glacier forelands
P: At Glacier Bay, Alaska, glaciers have retreated about 100 km since the late 18th century, leaving surfaces of known age. Pioneer mats of mosses and the nitrogen-fixing plant *Dryas* are followed by willows and nitrogen-fixing alder, then Sitka spruce, and later western hemlock. Chapin and colleagues (1994) found that alder raised soil nitrogen but also competed with spruce seedlings: facilitation and inhibition operating together.
H: Secondary succession
P: **Secondary succession** occurs where an existing community has been removed but soil remains: after fire, felling, storms, flooding or abandonment of farmland. Soil, seeds, roots and soil organisms are already present, so it is much faster.
X: The Broadbalk Wilderness at Rothamsted.
> Part of a wheat field at Rothamsted, Hertfordshire, was left unharvested and untended from 1882.
> Annual weeds and grasses came first, followed by shrubs such as hawthorn and bramble.
> Within a few decades the area had become oak, ash and sycamore woodland, showing how quickly lowland England reverts to wood when left alone.
!: Calling succession after a forest fire "primary". The soil survives, so it is secondary, however severe the burn appears.
EV: established | Primary succession on glacier forelands, dunes and lava is slow because soil must form, while secondary succession on abandoned land with soil is much faster.
EV: contested | Using sites of different ages as a time sequence (a chronosequence) assumes they followed the same path, which isn't always true.
T: Primary succession | Succession on newly exposed surfaces with no soil
T: Secondary succession | Succession where a community has been removed but soil remains
T: Chronosequence | A set of sites of different ages used to infer changes over time
SUM: Primary succession starts without soil (dunes, rock, glacier forelands) and is slow; secondary succession starts with soil and is faster.
SUM: Sand dune seres run from embryo and yellow dunes to grey dunes and heath or woodland; abandoned fields in lowland Britain revert to woodland within decades.
SRC: Chapin F. S. et al., "Mechanisms of primary succession following deglaciation at Glacier Bay, Alaska", Ecological Monographs 64(2):149–175 | primary | 1994 | https://doi.org/10.2307/2937039
SRC: Rothamsted Research, "Broadbalk and Geescroft Wildernesses" (long-term experiments) | data | 2024 | https://www.rothamsted.ac.uk/long-term-experiments
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 45.6 "Community ecology" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/45-6-community-ecology
Q: What is the difference between primary and secondary succession? | Primary starts on new surfaces with no soil; secondary starts where soil remains after a disturbance.
Q: Why is marram grass important in dune succession? | It grows up through accumulating sand and binds it with extensive roots, stabilising mobile dunes.
M1#ecology-u03-15-q1@1: Colonisation of bare rock left by a retreating glacier is an example of | primary succession | secondary succession | deflected succession | a plagioclimax | There is no soil on newly exposed rock, so it is primary.
M2#ecology-u03-15-q2@2: Why do grey dunes have a lower pH than yellow dunes? | Rain leaches calcium carbonate from shell fragments, and decaying organic matter adds acids | Grey dunes are closer to the sea | Marram grass makes soil alkaline | Grey dunes receive more salt spray | Over time leaching removes calcium carbonate and humus accumulates, lowering pH.
TF1#ecology-u03-15-q3@1: Succession on an abandoned field is usually faster than succession on a new sand dune. | true | The field already has soil, seeds and soil organisms, so secondary succession proceeds quickly.
M3#ecology-u03-15-q4@3: Along a dune system, a student samples from the strandline inland. What assumption is made in treating distance as time? | That inland dunes were once like the dunes now near the sea and have followed the same path | That all dunes were formed at the same time | That the sea level has never changed | That plants don't move | A chronosequence assumes older sites passed through the stages seen in younger ones, which may not always hold.
SA2#ecology-u03-15-q5@2,3: Describe the changes in abiotic conditions across a sand dune succession and explain how they lead to changes in plant species. | From embryo to grey dunes and beyond: sand becomes more stable; organic matter and humus increase, so water and nutrient retention rise; pH falls as carbonate is leached; salt spray and wind exposure decrease inland. Pioneers tolerant of salt, drought and burial (sand couch, marram) give way to species needing stable, moister, more fertile soil (mosses, lichens, herbs), then to acid-tolerant heathers and trees. The plants themselves cause many changes, adding humus and stabilising sand. | Sand stability ; Organic matter and water retention ; pH change ; Exposure or salt decreases ; Species change linked to conditions

## Climax communities and plagioclimax
LV: Intermediate · Evaluation
S: Succession tends towards a climax community, but human activities often hold it at an earlier stage, called a plagioclimax. This lesson compares climax theories and explains how grazing, burning and mowing maintain many of Britain's most valued habitats.
O: Compare monoclimax and polyclimax views of the climax community
O: Explain how management produces plagioclimax communities such as moorland and chalk grassland
O: Evaluate debates over what the natural climax of lowland Britain is
PRE: Primary and secondary succession
H: Climax
P: A **climax community** is the relatively stable end-point of succession, in balance with its environment. Clements' **monoclimax** theory held that each climatic region has one climatic climax (in lowland Britain, deciduous woodland). Tansley's **polyclimax** view allowed several climaxes in one region, set by soil, drainage or topography as well as climate: an **edaphic climax** on waterlogged ground might be fen carr rather than oak wood. Modern ecology treats the climax as a dynamic state that keeps changing through disturbance, gap formation and slow environmental change.
H: Plagioclimax
P: A **plagioclimax** (plagiosere) is a community kept from reaching its climax by human activity. Succession is **arrested** or **deflected**.
- **Heather moorland**: upland moors are managed for red grouse by rotational burning, which stops heather becoming leggy and prevents tree seedlings; sheep grazing also prevents regeneration.
- **Chalk grassland**: species-rich turf, with up to 40 or more plant species per square metre, depends on grazing by sheep and rabbits; if grazing stops, coarse grasses, then scrub, then woodland invade.
- **Hay meadows**: annual cutting in summer and grazing after harvest maintain wildflower meadows; England has lost about 97% of its lowland meadows and species-rich grasslands since the 1930s (Fuller, 1987).
- **Coppiced woodland**: cutting trees to the base on a rotation maintains an open, sunny woodland floor rich in flowers and butterflies.
K: Many of Britain's most biodiverse habitats are plagioclimaxes: they persist only through continued grazing, burning, mowing or coppicing.
X: What happens when management stops?
> A chalk grassland reserve stops being grazed.
> Within a few years tall grasses such as tor-grass shade out small herbs and orchids; species richness falls.
> Hawthorn and other scrub invade within a decade or two; eventually ash and beech woodland may form.
> Conservation management therefore reintroduces grazing or cuts scrub to hold the grassland at its plagioclimax.
H: What is natural?
P: The traditional view is that lowland Britain would naturally be closed-canopy forest. Vera (2000) argued instead that large wild grazers (aurochs, wild horses, deer) kept the prehistoric landscape a shifting mosaic of wood pasture with open glades. Pollen evidence suggests largely closed forest with some openings, and the debate shapes rewilding: whether to aim for forest or for grazed mosaics.
!: Calling plagioclimax habitats "unnatural" and therefore less valuable. Many species depend on them, and they may resemble habitats once created by wild grazers.
EV: established | Chalk grassland and heather moorland are maintained by grazing and burning, and revert towards scrub and woodland when management stops.
EV: contested | Whether lowland Europe's natural vegetation was closed forest or a grazed mosaic of wood pasture (the Vera hypothesis) is debated.
EV: contested | The environmental effects of rotational burning on peatland moorland, including on carbon storage, are debated, and burning on deep peat in England is now restricted by regulation.
T: Climax community | The relatively stable final stage of succession, in balance with its environment
T: Plagioclimax | A community held at a stage before the climax by human activity
T: Deflected succession | Succession diverted from its natural course by human or other interference
SUM: The climax is the stable end of succession; monoclimax and polyclimax views differ on whether climate alone sets it.
SUM: Grazing, burning, mowing and coppicing maintain plagioclimaxes such as moorland and chalk grassland; what is "natural" in Britain is debated.
SRC: Tansley A. G., "The use and abuse of vegetational concepts and terms", Ecology 16(3):284–307 | primary | 1935 | https://doi.org/10.2307/1930070
SRC: Fuller R. M., "The changing extent and conservation interest of lowland grasslands in England and Wales: a review of grassland surveys 1930–1984", Biological Conservation 40(4):281–300 | primary | 1987 | https://doi.org/10.1016/0006-3207(87)90121-2
SRC: Vera F. W. M., Grazing Ecology and Forest History, CABI Publishing | primary | 2000
SRC: The Heather and Grass etc. Burning (England) Regulations 2021, SI 2021/158 | legislation | 2021 | https://www.legislation.gov.uk/uksi/2021/158/contents
Q: What is a plagioclimax? | A community prevented from reaching its climax by human activity such as grazing, burning or mowing.
Q: Distinguish monoclimax and polyclimax theories. | Monoclimax: one climatic climax per region (Clements). Polyclimax: several climaxes set by soil, drainage and topography as well as climate (Tansley).
M1#ecology-u03-16-q1@1: Heather moorland maintained by rotational burning is an example of | a plagioclimax | a climatic climax | primary succession | an edaphic climax | Burning by people holds succession at the heather stage, preventing woodland.
M2#ecology-u03-16-q2@2: A wildflower meadow is no longer cut or grazed. What is most likely to happen over ten years? | Tall grasses and scrub invade and plant species richness falls | Richness rises steadily as the meadow reaches climax | The meadow turns into bare ground | Nothing changes, because meadows are stable | Without cutting or grazing, competitive grasses and woody plants take over, deflecting from the meadow plagioclimax.
TF2#ecology-u03-16-q3@2: An edaphic climax is determined mainly by soil or drainage conditions rather than climate. | true | Edaphic factors such as waterlogging can produce a different stable community from the climatic climax.
M3#ecology-u03-16-q4@3: Why does the Vera hypothesis matter for rewilding in Britain? | It affects whether rewilding should aim for closed forest or a grazed mosaic of woodland and open glades | It proves Britain was always treeless | It shows grazing animals destroy all habitats | It means no management is ever needed | If large wild grazers once kept the landscape open, rewilding with grazers rather than forest alone may restore the natural state.
SA3#ecology-u03-16-q5@2,3: Evaluate the view that conservation should allow succession to proceed to the climax rather than maintaining plagioclimax habitats. | For: climax woodland is the natural end-point in much of Britain, supports woodland species, stores carbon and needs little management; letting nature take its course is cheaper and fits rewilding. Against: many rare species depend on plagioclimax habitats such as chalk grassland, heath and hay meadows, which have declined drastically (about 97% of lowland meadows lost); stopping management would lose these species; plagioclimaxes may mimic habitats once maintained by wild grazers (Vera). A balanced approach maintains valued plagioclimaxes while allowing natural succession in some areas, at landscape scale. | Case for climax ; Species depending on plagioclimax ; Scale of habitat loss ; Natural grazing argument ; Judgement

## Disturbance and the intermediate disturbance hypothesis
LV: Intermediate · Evaluation
S: Disturbances such as storms, fires and floods destroy biomass and reset succession, creating patches of different ages. This lesson describes disturbance regimes, patch dynamics and the intermediate disturbance hypothesis, and the evidence for and against it.
O: Define disturbance and describe the features of a disturbance regime
O: Explain the intermediate disturbance hypothesis and the evidence for it
O: Evaluate the criticisms of the intermediate disturbance hypothesis
PRE: Ecological succession
H: Disturbance
P: A **disturbance** is a relatively discrete event that removes or damages organisms and opens space or resources for others: storms, floods, fires, landslides, grazing, trampling, dredging. A **disturbance regime** is described by its **frequency**, **intensity**, **extent** (area) and **timing**. The storm of October 1987 felled about 15 million trees in south-east England, opening gaps that let light-demanding plants and young trees grow.
P: Disturbance creates a **mosaic** of patches at different stages of succession. This **patch dynamics** view sees communities as shifting mosaics: a wood is a collection of gaps, regenerating patches and mature stands.
H: The intermediate disturbance hypothesis
P: Connell (1978) proposed that species diversity is highest at **intermediate** levels of disturbance:
- With **frequent or intense** disturbance, only a few pioneers that colonise rapidly and tolerate disturbance survive.
- With **rare or weak** disturbance, succession proceeds and a few competitive dominants exclude others.
- At **intermediate** levels, both pioneers and competitors persist, in patches of different ages.
X: Boulders on a shore (Sousa, 1979).
> On a Californian shore, small boulders were turned over by waves often, medium boulders occasionally, large boulders rarely.
> Small boulders held mainly one pioneer alga, green *Ulva*.
> Large boulders were dominated by the late-successional red alga *Gigartina*.
> Medium boulders had the most species: an example consistent with the hypothesis.
K: Intermediate disturbance can maximise diversity by preventing competitive exclusion while allowing time for colonisation, but this pattern isn't universal.
H: Criticisms
P: Reviews found that the predicted hump-shaped relationship between disturbance and diversity appears in a minority of studies; others find increasing, decreasing or no relationship. Fox (2013) argued that the hypothesis's usual reasoning is logically flawed, because disturbance alone doesn't prevent exclusion unless it affects species differently, and called for it to be abandoned. Supporters reply that more precise versions still describe some real systems.
!: Using "intermediate disturbance" to justify any management. What counts as intermediate varies between systems and must be measured, not assumed.
EV: established | Disturbance creates patches at different successional stages, and in some systems, such as Sousa's boulders, diversity peaks at intermediate disturbance.
EV: contested | Whether the intermediate disturbance hypothesis is a general rule is disputed; many studies don't find the predicted peak, and its logic has been challenged.
T: Disturbance | A discrete event that removes or damages organisms and frees space or resources
T: Disturbance regime | The frequency, intensity, extent and timing of disturbances in an area
T: Intermediate disturbance hypothesis | The idea that diversity is highest at intermediate frequencies or intensities of disturbance
SUM: Disturbances reset succession and create mosaics of patches; regimes are described by frequency, intensity, extent and timing.
SUM: The intermediate disturbance hypothesis predicts peak diversity at intermediate disturbance; evidence is mixed and the idea is contested.
SRC: Connell J. H., "Diversity in tropical rain forests and coral reefs", Science 199(4335):1302–1310 | primary | 1978 | https://doi.org/10.1126/science.199.4335.1302
SRC: Sousa W. P., "Disturbance in marine intertidal boulder fields: the nonequilibrium maintenance of species diversity", Ecology 60(6):1225–1239 | primary | 1979 | https://doi.org/10.2307/1936969
SRC: Fox J. W., "The intermediate disturbance hypothesis should be abandoned", Trends in Ecology and Evolution 28(2):86–92 | primary | 2013 | https://doi.org/10.1016/j.tree.2012.08.014
Q: What four features describe a disturbance regime? | Frequency, intensity, extent and timing.
Q: Why does the intermediate disturbance hypothesis predict low diversity under rare disturbance? | Succession proceeds and a few competitive dominants exclude other species.
M1#ecology-u03-17-q1@1: Which is an example of a disturbance? | A storm that fells many trees | Gradual leaching of soil over centuries | The seasonal change in day length | Slow growth of a tree | A disturbance is a discrete event that removes biomass and opens space.
M2#ecology-u03-17-q2@2: In Sousa's study, why did small, often-overturned boulders hold few species? | Frequent disturbance allowed only fast-colonising pioneers to persist | Large algae outcompeted all others on them | They were never disturbed | They received no light | Frequent overturning kept them at the earliest successional stage.
TF3#ecology-u03-17-q3@3: Most studies have found a hump-shaped relationship between disturbance and diversity. | false | Reviews found the hump in a minority of studies; many show other relationships.
M3#ecology-u03-17-q4@3: Which criticism of the intermediate disturbance hypothesis is strongest? | Disturbance doesn't prevent competitive exclusion unless it affects species differently, and the predicted pattern is often absent | Disturbances never happen in nature | It predicts that diversity is highest with no disturbance | It was based only on laboratory studies | Fox (2013) showed the usual logic fails and reviews show the pattern isn't general.
SA3#ecology-u03-17-q5@2,3: Explain the intermediate disturbance hypothesis using an example, and evaluate whether it should guide conservation management. | The hypothesis states that with frequent disturbance only pioneers persist, with rare disturbance competitive dominants exclude others, and at intermediate levels both coexist in a mosaic of patches, maximising diversity. Sousa's boulders fit: medium boulders, occasionally overturned, held most algal species. For management, it suggests moderate grazing, cutting or coppicing can maintain diversity, as in chalk grassland. But the pattern isn't general, "intermediate" must be measured for each system, the logic has been criticised, and management aims may target particular species rather than richness. It is a useful idea to test, not a rule. | States hypothesis ; Explains extremes ; Example ; Management application ; Criticism ; Judgement

## Invasive non-native species
LV: Intermediate · Evaluation
S: People have moved thousands of species beyond their native ranges, and a minority become invasive, causing ecological and economic harm. This lesson defines non-native and invasive species, explains why some succeed, gives UK examples and examines prevention and control.
O: Distinguish native, non-native, naturalised and invasive species
O: Explain why some introduced species become invasive, including the tens rule and enemy release
O: Evaluate methods of preventing and controlling invasive species, with UK examples
PRE: Biotic interactions: an overview
H: Definitions
- **Native**: a species that arrived in an area without human help.
- **Non-native** (alien, introduced): moved beyond its natural range by people, deliberately or accidentally.
- **Naturalised**: a non-native species that has established self-sustaining populations.
- **Invasive non-native species**: a non-native species that spreads and has negative effects on biodiversity, the economy or health.
P: The IPBES assessment of invasive alien species (2023) reported more than 37 000 established alien species worldwide, a major role for invasive species in 60% of recorded global plant and animal extinctions, and annual costs exceeding US$423 billion in 2019.
H: Why do some succeed?
P: Most introduced species fail. Williamson and Fitter's (1996) **tens rule** suggests roughly one in ten imported species appears in the wild, one in ten of those establishes, and one in ten of those becomes a pest. Successful invaders often:
- Escape their natural enemies (the **enemy release hypothesis**): Japanese knotweed in Britain has none of the 186 insect species and 40 fungi that feed on it in Japan.
- Reproduce or spread rapidly, often vegetatively: British Japanese knotweed is essentially one female clone spreading from fragments of rhizome.
- Arrive in disturbed habitats, or meet native species with no evolved defences.
- Carry diseases to which native species lack immunity.
H: UK examples
X: Signal crayfish and the native white-clawed crayfish.
> North American signal crayfish were introduced to Britain for farming in the 1970s and escaped into rivers.
> They are larger and more aggressive, burrow into banks and carry crayfish plague, a water mould to which they are largely resistant.
> Native white-clawed crayfish die rapidly when plague reaches them; the species has declined across much of England and is listed as Endangered globally.
> Conservation now relies on "ark sites": isolated waters free of signals and plague, where native crayfish are moved.
- **Grey squirrel**: outcompetes red squirrels and spreads squirrelpox; also damages trees by bark stripping.
- **American mink**: escaped fur-farm animals that contributed to severe declines of water voles; trapping programmes have helped voles recover locally.
- **Himalayan balsam**: an annual that forms dense riverbank stands, shades out native plants and dies back in winter, leaving banks open to erosion.
- **Rhododendron ponticum**: shades out woodland ground flora and hosts the plant pathogens *Phytophthora ramorum* and *P. kernoviae*.
K: Only a small fraction of introductions become invasive, but those that do can be among the most damaging pressures on native species; prevention is far cheaper than control.
H: Prevention and control
P: The hierarchy is **prevention** (biosecurity, checks on imports, "Check, Clean, Dry" for anglers and boaters), **early detection and rapid eradication**, then **long-term control** or containment. In Great Britain the Wildlife and Countryside Act 1981 (section 14) makes it an offence to release or allow to escape into the wild animals not ordinarily resident, and to plant or cause to grow in the wild plants listed in Schedule 9. Controls include trapping, herbicide, shooting and **biological control**: the psyllid *Aphalara itadori* was released against Japanese knotweed from 2010, the first approved release of a biological control agent against a weed in the EU.
!: Treating every non-native species as harmful. Many, such as sycamore in most settings or the little owl, have little damaging effect; control should target species with evidence of harm.
EV: established | Invasive non-native species are a major driver of biodiversity loss globally and have caused severe declines of native species in Britain, such as white-clawed crayfish and water voles.
EV: contested | How to treat long-established non-natives with mixed effects, such as sycamore, is debated, as is whether native status should be the main criterion for management.
T: Non-native species | A species moved by people beyond its natural range
T: Invasive non-native species | A non-native species that spreads and causes harm to biodiversity, the economy or health
T: Enemy release hypothesis | The idea that introduced species thrive because they have left behind their natural predators, parasites and diseases
T: Biosecurity | Measures to prevent the introduction and spread of harmful organisms
SUM: Most introductions fail (the tens rule), but invasive species cause major ecological and economic harm worldwide.
SUM: Enemy release, rapid spread and naïve native species explain success; prevention, early eradication and control, including biological control, are the responses.
SRC: IPBES, Thematic Assessment Report on Invasive Alien Species and their Control: Summary for Policymakers | data | 2023 | https://www.ipbes.net/ias
SRC: Williamson M. and Fitter A., "The varying success of invaders", Ecology 77(6):1661–1666 | primary | 1996 | https://doi.org/10.2307/2265769
SRC: Wildlife and Countryside Act 1981, section 14 (introduction of new species) | legislation | 1981 | https://www.legislation.gov.uk/ukpga/1981/69/section/14
SRC: GB Non-native Species Secretariat, species information and Check, Clean, Dry guidance | guidance | 2024 | https://www.nonnativespecies.org
Q: What is the tens rule? | Roughly one in ten imported species appears in the wild, one in ten of those establishes, and one in ten of those becomes a pest.
Q: Why are signal crayfish so damaging to white-clawed crayfish? | They outcompete them and carry crayfish plague, which kills the native species.
M1#ecology-u03-18-q1@1: A non-native species that spreads and harms native biodiversity is called | an invasive non-native species | a naturalised native | a keystone species | a pioneer species | Invasive species are the subset of non-natives that spread and cause harm.
M2#ecology-u03-18-q2@2: Japanese knotweed in Britain grows vigorously and has no insect pests, unlike in Japan. Which hypothesis explains its success? | Enemy release | Competitive exclusion | Intermediate disturbance | Character displacement | It left its natural enemies behind, so it can invest in growth rather than defence.
MS2#ecology-u03-18-q3@2: Which measures are part of preventing new invasions? Choose all that apply. | Checking imported plants and goods ; Cleaning and drying angling and boating kit ; Making it an offence to release listed species | Planting invasive species in gardens ; Moving water from one river to another | Prevention relies on biosecurity and regulation; spreading species or water does the opposite.
M3#ecology-u03-18-q4@3: Why is prevention usually preferred to control of invasive species? | Once established and widespread, invaders are costly or impossible to eradicate | Invaders always die out on their own | Control methods never work | Prevention always costs more than control | Eradication is feasible only early; widespread species need indefinite, expensive control.
SA3#ecology-u03-18-q5@2,3: Using a named UK example, explain how an invasive species affects native species and evaluate the options for managing it. | American mink, escaped from fur farms from the 1950s onwards, prey on water voles in their burrows, which the native voles can't escape; with habitat loss this caused severe declines. Options: trapping on rafts that detect mink footprints has removed mink from large areas, and voles recovered; habitat restoration helps voles; reintroductions follow mink removal. Eradication across Britain is difficult because mink recolonise from untrapped areas, so control must be sustained and coordinated at catchment scale. Evaluation: trapping is effective locally and cost-effective with monitoring rafts, but needs long-term funding and cooperation of landowners; ethical concerns about killing animals. | Names species and impact ; Mechanism of impact ; A control method ; Effectiveness evidence ; Limitation and judgement
`;
