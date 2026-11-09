// School 2: Population Ecology. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md): objectives,
// key terms, summaries, typed and dated sources, evidence status (EV:) and questions at three levels (Foundation,
// Application, Evaluation) in every lesson. Explanations are original; sources are those used and cited for checking,
// pending human verification (qa.js records the review stages). Level: A level to second-year undergraduate.
// Figures are given with the year they refer to.
export default `
## What is a population?
LV: Introductory · Foundation
S: A population is a group of individuals of one species living in the same area at the same time, which can interbreed. This lesson defines populations, explains how their boundaries are drawn and introduces the properties population ecologists measure.
O: Define a population and explain how its boundaries are set
O: Describe the main properties of a population: size, density, dispersion, age structure and rates of change
O: Evaluate the difficulty of defining populations for clonal and highly mobile organisms
PRE: Levels of ecological organisation
H: Defining a population
P: A **population** is all the individuals of one species in a defined area at the same time, usually with the potential to interbreed. Ecologists often draw the boundary for practical reasons, such as the edge of a lake, an island or a study wood, but a biologically meaningful population is one whose members interact and breed more with each other than with outsiders.
P: Populations have properties that individuals don't: **size** (N), **density**, **dispersion** (spatial pattern), **age structure**, **sex ratio**, and rates of **birth, death, immigration and emigration**. Population ecology studies how these change and why.
K: A population is one species in one place at one time; its size changes only through births, deaths, immigration and emigration.
H: Hard cases
X: How many individuals are there in a stand of bracken?
> Bracken spreads by underground rhizomes, so a whole hillside may be one genetic individual (a **genet**).
> Each frond is a physiologically separate unit (a **ramet**) that can be counted.
> Ecologists counting "individuals" of clonal plants must say whether they mean genets or ramets: the numbers differ hugely.
P: Highly mobile species also blur boundaries. Atlantic salmon spawn in their home river but feed across the North Atlantic; migratory birds may breed in Scandinavia and winter in Britain. Ecologists often treat each breeding population as the unit, because that is where births happen.
!: Using "population" for all the organisms in an area. That is a community; a population is a single species.
H: Why populations matter
P: Populations are the unit of conservation assessment (the IUCN Red List uses population size and decline), of harvesting (fish stocks) and of pest and disease control. Because natural selection changes allele frequencies in populations, they are also the unit of evolution.
EV: established | Population size changes only through births, deaths, immigration and emigration, the basis of all population models.
EV: contested | How to define a population for clonal organisms and for species with continuous ranges is partly a matter of convention and varies between studies.
T: Population | All the individuals of one species in a defined area at the same time
T: Genet | A genetically distinct individual, which in clonal organisms may consist of many ramets
T: Ramet | A physiologically independent unit of a clonal organism, such as one shoot or frond
SUM: A population is one species in one area at one time, with properties such as size, density, dispersion and age structure.
SUM: Boundaries can be hard to draw for clonal and mobile species, so studies must define their units.
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 45.1 "Population demography" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/45-1-population-demography
SRC: Begon M. and Townsend C. R., Ecology: From Individuals to Ecosystems, 5th edition, Wiley, chapter 4 | secondary | 2021
Q: What four processes change the size of a population? | Births, deaths, immigration and emigration.
Q: What is the difference between a genet and a ramet? | A genet is a genetically distinct individual; a ramet is one physiologically independent unit of a clone.
M1#ecology-u02-01-q1@1: Which of these is a population? | All the common frogs in one pond | All the amphibians in one pond | All the animals in a wood | All the frogs in Europe of every species | A population is one species in one place; several species form a community.
M2#ecology-u02-01-q2@2: A researcher counts 300 shoots of creeping buttercup in a field, all connected by runners. What should the report make clear? | Whether the count is of ramets (shoots) or genets (genetic individuals) | That the population is exactly 300 genetic individuals | That buttercups can't form populations | That the shoots belong to a community | Clonal spread means 300 shoots may be only a few genets, so the unit counted must be stated.
TF1#ecology-u02-01-q3@1: Populations, not individuals, are the unit in which allele frequencies change by natural selection. | true | An individual's genes don't change; selection changes the frequency of alleles across generations in a population.
M3#ecology-u02-01-q4@3: Why do conservation assessments of migratory birds often use breeding populations as the unit? | Births occur on breeding grounds, so trends there reflect recruitment, while wintering groups mix birds from many places | Birds never breed in the same place twice | Wintering birds can't be counted | Breeding populations never change in size | Breeding populations are where reproduction and recruitment happen; wintering flocks combine birds from several breeding populations.
SA2#ecology-u02-01-q5@2,3: Explain why defining a population is difficult for Atlantic salmon, and how ecologists deal with it. | Salmon hatch in rivers, migrate to the ocean to feed, often far across the North Atlantic, then return mainly to their home river to spawn. At sea, fish from many rivers mix, so there is no single area holding a population. Ecologists therefore treat each river's spawning stock as a population, because it is reproductively largely separate (homing), and manage stocks river by river, while monitoring survival at sea. | Life cycle crosses river and sea ; Mixing at sea ; Homing makes river stocks largely separate ; River stock used as management unit

## Population size and density
LV: Introductory · Application
S: Population size is the number of individuals; density is the number per unit area or volume. This lesson explains how each is measured, by total counts or sampling, and why ecological density can differ from crude density.
O: Distinguish population size, crude density and ecological density
O: Calculate population size and density from sample counts
O: Evaluate the choice between total counts and sampling methods
PRE: What is a population?
H: Size and density
P: **Population size** (N) is the number of individuals. **Density** is the number per unit area (for example, plants per m²) or volume (algal cells per mL). **Crude density** uses the whole area; **ecological density** uses only the area of suitable habitat. A heron colony may hold 50 nests per km² of countryside but far more per km² of wetland where the birds feed.
H: Measuring it
- **Total count (census)**: count every individual. Possible for large, conspicuous or colonial species: seabird colonies, seal haul-outs, trees in a small wood.
- **Sampling**: count in sample units and scale up. Plants and sessile animals are sampled with **quadrats**; mobile animals by **mark–release–recapture**, transect counts or traps.
- **Indirect indices**: signs such as droppings, nests, burrows or calls, which give relative rather than absolute abundance.
E: Estimated N = mean count per sample unit × (total area ÷ area of one sample unit)
X: Estimating daisies on a playing field.
> Ten 0.25 m² quadrats are placed at random; the counts are 4, 0, 7, 3, 5, 2, 6, 1, 4, 8.
> Mean = 40 ÷ 10 = 4 daisies per quadrat, which is 4 ÷ 0.25 = 16 daisies per m².
> The field is 5000 m², so estimated N = 16 × 5000 = 80 000 daisies.
K: Sampling estimates are only as good as the samples: they must be random (or systematically placed), numerous enough and representative of the whole area.
!: Forgetting to convert units. A mean per 0.25 m² quadrat must be multiplied by 4 to give density per m² before scaling up.
H: Choosing a method
P: Total counts avoid sampling error but are rarely possible for small, cryptic or mobile organisms, and even "total" counts miss individuals. Sampling is faster and cheaper but gives an estimate with uncertainty, which should be reported (for example as a standard error or confidence interval: see Standard deviation and standard error). Indices are useful for trends, such as the UK Breeding Bird Survey's annual indices, provided detectability doesn't change.
EV: established | Random quadrat sampling gives unbiased estimates of plant density when quadrats are placed randomly and enough are used.
EV: contested | Whether indices such as counts of calls or signs track true abundance depends on detectability, which can change with weather, habitat and observer, and is often debated for particular surveys.
T: Population density | The number of individuals per unit area or volume
T: Ecological density | The number of individuals per unit area of suitable habitat
T: Census | A count of every individual in a population
SUM: Size is the number of individuals; density is size per unit area, crude or ecological.
SUM: Total counts suit conspicuous species; sampling and indices estimate size with uncertainty that should be reported.
SRC: Southwood T. R. E. and Henderson P. A., Ecological Methods, 3rd edition, Blackwell Science | secondary | 2000
SRC: British Trust for Ornithology, BTO/JNCC/RSPB Breeding Bird Survey: methods | guidance | 2024 | https://www.bto.org/our-science/projects/breeding-bird-survey
Q: What is ecological density? | The number of individuals per unit area of suitable habitat, rather than of the whole area.
Q: How do you estimate population size from quadrat counts? | Mean count per quadrat × (total area ÷ quadrat area).
M1#ecology-u02-02-q1@1: Which method is most suitable for counting a grey seal haul-out on a beach? | A total count from photographs | Mark–release–recapture | Random quadrats | Pitfall traps | Large, conspicuous animals gathered in one place can be counted directly, often from aerial photographs.
NUM2#ecology-u02-02-q2@2: Twenty 1 m² quadrats contain a total of 60 plantain plants. The meadow is 2000 m². Estimate the population size. | 6000 | 0 | plants | Mean = 60 ÷ 20 = 3 per m²; 3 × 2000 = 6000 plants.
M2#ecology-u02-02-q3@2: A survey records 12 voles per hectare across a 100 ha estate, but voles live only in the 20 ha of rough grassland. What is their ecological density? | 60 voles per hectare | 12 voles per hectare | 1200 voles per hectare | 2.4 voles per hectare | 12 × 100 = 1200 voles in 20 ha of habitat, which is 60 per hectare.
M3#ecology-u02-02-q4@3: Why might a decline in a bird's song-count index not show a real decline in numbers? | Detectability may have changed, for example through weather, habitat or observers | Song counts always overestimate population size | Birds only sing when the population is falling | Indices measure density exactly | Indices assume constant detectability; if birds become harder to detect, the index falls without a real change in abundance.
SA3#ecology-u02-02-q5@2,3: Compare the strengths and limitations of total counts and quadrat sampling for estimating a plant population. | Total counts avoid sampling error and give an exact number if done carefully, but are slow, only feasible for small areas or large plants, and still miss small or hidden individuals. Quadrat sampling is quicker, covers large areas and allows an estimate with confidence limits, but introduces sampling error, needs random placement and enough quadrats, and can be biased if the plant is clumped and samples are few. | Total count strength ; Total count limitation ; Sampling strength ; Sampling limitation including randomness or sample number ; Comparison or judgement

## Dispersion patterns
LV: Intermediate · Application
S: Individuals in a population can be spaced randomly, clumped together or evenly spread. This lesson explains each pattern, the processes that cause it, and how the variance-to-mean ratio of quadrat counts is used to tell them apart.
O: Describe random, clumped and uniform dispersion with examples
O: Explain the ecological processes that produce each pattern
O: Use the variance-to-mean ratio to classify a pattern from quadrat data
PRE: Population size and density
H: Three patterns
- **Clumped (aggregated)**: individuals occur in groups. The commonest pattern, caused by patchy resources (plants on damp ground), social behaviour (herds, colonies) or limited dispersal (seedlings around a parent, clonal spread).
- **Uniform (regular)**: individuals are more evenly spaced than by chance. Caused by competition or territoriality: nesting gannets keep just out of pecking distance; some desert shrubs release chemicals that inhibit neighbours.
- **Random**: each individual's position is independent of others. Rare, occurring where resources are evenly spread and individuals don't interact strongly, such as dandelions from wind-blown seed on a uniform lawn.
K: Dispersion reveals process: clumping suggests patchy resources, social grouping or limited dispersal; uniformity suggests competition or territoriality; randomness suggests neither.
H: Testing the pattern
P: If individuals are randomly placed, counts per quadrat follow a **Poisson distribution**, in which the variance equals the mean. So the **variance-to-mean ratio** (s²/x̄) indicates the pattern:
E: s²/x̄ ≈ 1 random; s²/x̄ > 1 clumped; s²/x̄ < 1 uniform :: the ratio is tested against 1 for significance
X: Classifying a pattern from quadrat counts.
> Counts of a plant in eight quadrats: 0, 0, 9, 1, 0, 8, 0, 6 (total 24).
> Mean = 24 ÷ 8 = 3.
> Squared deviations: 9, 9, 36, 4, 9, 25, 9, 9; sum = 110. Variance (n − 1) = 110 ÷ 7 ≈ 15.7.
> s²/x̄ ≈ 5.2, much greater than 1: clumped.
H: Scale matters
P: The pattern depends on quadrat size. Trees may be uniformly spaced at a scale of metres (competition between neighbours) but clumped at a scale of hundreds of metres (on suitable soils). The **nearest-neighbour** method (Clark and Evans, 1954) avoids quadrat size by measuring the distance from each individual to its nearest neighbour.
!: Reading a variance-to-mean ratio of 1.3 as clearly clumped. A ratio must be tested statistically; with few quadrats, ratios differ from 1 by chance.
EV: established | Clumped dispersion is the commonest pattern in nature, because resources are patchy and offspring often stay near parents.
EV: contested | Inferring the process from the pattern is risky: different processes can produce the same pattern, so experiments are needed to confirm causes.
T: Dispersion | The spatial pattern of individuals in a population
T: Variance-to-mean ratio | The ratio s²/x̄ of quadrat counts; about 1 for random, above 1 for clumped and below 1 for uniform patterns
T: Territoriality | Defence of an area against other individuals, often producing uniform spacing
SUM: Individuals may be clumped (commonest), uniform or random, each pattern suggesting different processes.
SUM: The variance-to-mean ratio of quadrat counts classifies pattern, but results depend on quadrat size and need testing.
SRC: Clark P. J. and Evans F. C., "Distance to nearest neighbor as a measure of spatial relationships in populations", Ecology 35(4):445–453 | primary | 1954 | https://doi.org/10.2307/1931034
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 45.1 "Population demography" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/45-1-population-demography
Q: What does a variance-to-mean ratio greater than 1 suggest? | A clumped (aggregated) pattern.
Q: What commonly causes uniform dispersion? | Competition or territoriality between individuals.
M1#ecology-u02-03-q1@1: Nesting gannets spaced just beyond pecking distance of each other show which pattern? | Uniform | Clumped | Random | Linear | Aggressive interactions keep neighbours evenly spaced, producing a uniform pattern.
M2#ecology-u02-03-q2@2: Quadrat counts of a sedge give a mean of 4.0 and a variance of 0.8. What pattern is suggested? | Uniform | Clumped | Random | It can't be classified | s²/x̄ = 0.2, well below 1, suggesting regular spacing (to be confirmed with a significance test).
TF2#ecology-u02-03-q3@2: The dispersion pattern of a population can change depending on the size of quadrat used. | true | A population can be uniform at small scale and clumped at large scale, so the pattern depends on scale.
M3#ecology-u02-03-q4@3: Seedlings of a tree species are strongly clumped near parent trees. Which explanation is weakest? | Strong competition among seedlings spreads them evenly | Seeds are heavy and fall close to parents | Suitable germination sites are patchy | Seed predators are scarce near parents | Competition tends to produce uniform, not clumped, spacing, so it doesn't explain clumping.
SA2#ecology-u02-03-q5@2,3: Describe how you would determine whether a plant on a lawn is randomly, uniformly or clumped in its distribution, and how you would interpret the result. | Place a large number of quadrats (for example 30) at random coordinates; count the plant in each. Calculate the mean and variance. Compute s²/x̄: about 1 means random, above 1 clumped, below 1 uniform. Test whether the ratio differs significantly from 1. Interpret: clumping might reflect patchy soil moisture or vegetative spread; uniformity competition; randomness independent establishment from wind-blown seed. Note that the result depends on quadrat size. | Random placement of many quadrats ; Mean and variance calculated ; Ratio interpreted correctly ; Significance testing mentioned ; Ecological interpretation or scale caveat

## Estimating population size: mark–release–recapture
LV: Intermediate · Application
S: Mark–release–recapture estimates the size of a mobile animal population from the proportion of marked individuals in a second sample. This lesson derives the Lincoln–Petersen index, works examples and sets out the assumptions that make or break the estimate.
O: Calculate a population estimate using the Lincoln–Petersen index
O: State the assumptions of mark–release–recapture and explain how breaking each biases the estimate
O: Evaluate the method for a given species and suggest improvements
PRE: Population size and density
H: The method
P: Capture a sample of animals, mark them harmlessly and release them. After they have mixed back into the population, capture a second sample and count how many are marked. If marked animals are mixed evenly, the proportion marked in the second sample equals the proportion marked in the whole population.
E: N = (M × C) ÷ R :: M marked in the first sample, C caught in the second sample, R marked animals recaptured in the second sample
X: Estimating woodlice under logs.
> First sample: 40 woodlice caught, marked with a dot of non-toxic paint and released (M = 40).
> Two days later, second sample: 50 caught (C = 50), of which 8 are marked (R = 8).
> N = (40 × 50) ÷ 8 = 250 woodlice.
P: With small samples the simple index is biased upwards. **Chapman's modification**, N = [(M + 1)(C + 1) ÷ (R + 1)] − 1, reduces the bias and can be used even when R = 0. For the woodlice it gives (41 × 51 ÷ 9) − 1 ≈ 231.
K: Mark–release–recapture works only if the proportion marked in the second sample truly reflects the proportion marked in the population.
H: The assumptions
- **Closed population**: no births, deaths, immigration or emigration between samples. A short interval helps.
- **Marks are not lost** and are recognised. Paint can wear off; rings and PIT tags last longer.
- **Marking doesn't affect survival or behaviour**: bright paint must not make woodlice more visible to predators.
- **Marked animals mix randomly** with unmarked ones before the second sample.
- **Equal catchability**: marked and unmarked animals are equally likely to be caught. Animals that become "trap-happy" (attracted back to bait) or "trap-shy" bias the estimate.
X: Which way is the error?
> If marks are lost, R is too small, so N is overestimated.
> If marked animals become trap-happy, R is too large, so N is underestimated.
> If marked animals are eaten more because the paint is conspicuous, R is too small, so N is overestimated.
!: Recapturing too soon. If marked animals haven't had time to mix, they will be over-represented near the release point and N will be underestimated.
H: Beyond two samples
P: Repeated sampling with individually marked animals allows open-population models, such as the Jolly–Seber method, which estimate survival and recruitment as well as size. Camera traps identify individuals by natural markings (for example a wildcat's stripes or a leopard's spots), and DNA from hair or droppings can serve as a "mark".
EV: established | The Lincoln–Petersen estimate is unbiased only if its assumptions hold; Chapman's modification reduces small-sample bias.
EV: contested | Whether the equal-catchability assumption holds is often uncertain in the field, and different trap types can give different estimates for the same population.
T: Mark–release–recapture | A method that estimates population size from the proportion of marked animals in a second sample
T: Lincoln–Petersen index | The estimate N = MC ÷ R
T: Closed population | A population with no births, deaths, immigration or emigration during a study
SUM: N = MC ÷ R, from marked, caught and recaptured numbers; Chapman's version reduces small-sample bias.
SUM: The estimate depends on a closed population, retained marks, harmless marking, mixing and equal catchability.
SRC: Southwood T. R. E. and Henderson P. A., Ecological Methods, 3rd edition, Blackwell Science, chapter 3 | secondary | 2000
SRC: Chapman D. G., "Some properties of the hypergeometric distribution with applications to zoological sample censuses", University of California Publications in Statistics 1:131–160 | primary | 1951
SRC: AQA, A level Biology (7402) specification, section 3.7.4 (populations in ecosystems) | standard | 2015 | https://www.aqa.org.uk/subjects/biology/a-level/biology-7402
Q: Write the Lincoln–Petersen index. | N = (M × C) ÷ R: marked first time × caught second time ÷ marked recaptures.
Q: Name four assumptions of mark–release–recapture. | Closed population, marks not lost, marking doesn't affect survival or behaviour, random mixing, equal catchability (any four).
M1#ecology-u02-04-q1@1: In mark–release–recapture, what does R stand for? | The number of marked animals in the second sample | The total number caught in the second sample | The number marked in the first sample | The rate of reproduction | R is the recaptures: marked individuals found in the second sample.
NUM2#ecology-u02-04-q2@2: 60 snails are marked and released. Later 45 are caught, of which 9 are marked. Estimate the population using the Lincoln–Petersen index. | 300 | 0 | snails | N = (60 × 45) ÷ 9 = 300 snails.
M2#ecology-u02-04-q3@2: Marked voles learn that traps contain food and return to them more than unmarked voles. How does this affect the estimate? | It underestimates N, because too many marked animals are recaptured | It overestimates N, because R is too small | It has no effect | It makes N exactly correct | Trap-happiness inflates R; since R is the divisor, N comes out too small.
M3#ecology-u02-04-q4@3: Paint marks on beetles make them more visible to birds, so marked beetles are eaten more. How is the estimate affected, and how could the study be improved? | N is overestimated; use an inconspicuous mark such as a small dot under the wing case | N is underestimated; use brighter paint | N is unaffected, because only survivors are counted | N is overestimated; leave a much longer interval before recapture | Predation removes marked animals, so R falls and N rises; a discreet mark that doesn't change survival fixes the cause.
SA3#ecology-u02-04-q5@2,3: A student uses mark–release–recapture on a population of grasshoppers over two weeks. Evaluate the reliability of the estimate. | Over two weeks the population may not be closed: grasshoppers hatch, die, and move in and out of a grassland, breaking the closed-population assumption; births dilute marked animals (overestimate), while emigration of marked animals also lowers R. Paint marks may be lost when grasshoppers moult (nymphs), overestimating N. Grasshoppers are mobile, so mixing is likely good. Improvements: shorten the interval to a day or two, mark adults only, use durable marks, sample several times and use an open-population model, and report confidence limits. | Closure problem over two weeks ; Births or migration effect on estimate ; Mark loss through moulting ; Mixing or catchability considered ; Specific improvements

## Births, deaths, immigration and emigration
LV: Introductory · Application
S: Every change in population size comes from births, deaths, immigration and emigration. This lesson sets out the population balance equation, per capita rates and the intrinsic rate of increase, r.
O: Write and use the population balance equation
O: Calculate per capita birth and death rates and the rate of increase
O: Analyse whether a population's change is driven mainly by local demography or by movement
PRE: What is a population?
H: The balance equation
E: N_{t+1} = N_{t} + B − D + I − E :: births and immigrants add; deaths and emigrants subtract
P: Populations with no movement in or out are **closed**; those with significant immigration and emigration are **open**. Most real populations are open, but on islands or for sessile organisms movement may be small.
H: Per capita rates
P: Absolute numbers are hard to compare between populations of different sizes, so ecologists use **per capita** rates: births or deaths per individual per unit time. If b is the per capita birth rate and d the per capita death rate, the per capita rate of increase in a closed population is r = b − d. If r > 0 the population grows; r < 0 it declines; r = 0 it is stable.
X: A closed population of 2000 rabbits in one year.
> Births 1200, deaths 800.
> b = 1200 ÷ 2000 = 0.6 per rabbit per year; d = 800 ÷ 2000 = 0.4.
> r = 0.6 − 0.4 = 0.2 per year: the population grows by 20%, to 2400.
P: The **intrinsic rate of increase** (r_{max}) is r under ideal conditions, with unlimited resources. It is high for small, fast-breeding species (aphids, mice) and low for large, slow-breeding ones (elephants, albatrosses).
K: Population change is the balance of four processes; per capita rates (b, d and r = b − d) let populations of different sizes be compared.
H: Sources and sinks
P: In an open population movement can dominate. In a **source** habitat births exceed deaths and the surplus emigrates; in a **sink** habitat deaths exceed births and the population persists only through immigration (Pulliam, 1988). A wood where blackbirds are seen every year may be a sink, sustained by birds from better habitat nearby.
!: Assuming a stable count means a healthy population. A sink population can look stable while every year's local breeding fails, if immigrants replace the losses.
EV: established | The population balance equation is an identity: every change in numbers must come from births, deaths, immigration or emigration.
EV: contested | How common true source–sink structures are, and how to identify them without long-term tracking of individuals, is debated.
T: Per capita rate | A rate expressed per individual, such as births per individual per year
T: Intrinsic rate of increase | The maximum per capita rate of increase (r_max) under ideal conditions
T: Sink population | A population in which deaths exceed births, maintained only by immigration
SUM: N changes by births − deaths + immigration − emigration; in a closed population r = b − d.
SUM: The intrinsic rate of increase varies widely between species; open populations can be sources or sinks.
SRC: Pulliam H. R., "Sources, sinks, and population regulation", American Naturalist 132(5):652–661 | primary | 1988 | https://doi.org/10.1086/284880
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 45.3 "Environmental limits to population growth" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/45-3-environmental-limits-to-population-growth
Q: Write the population balance equation. | N(t+1) = N(t) + births − deaths + immigration − emigration.
Q: What is a sink population? | One in which deaths exceed births, so it persists only because of immigration.
M1#ecology-u02-05-q1@1: In a closed population, what does r = b − d represent? | The per capita rate of increase | The carrying capacity | The total number of births | The density of the population | r is the per capita birth rate minus the per capita death rate.
NUM2#ecology-u02-05-q2@2: A population of 500 newts has 150 births, 100 deaths, 20 immigrants and 40 emigrants in a year. What is the population size after one year? | 530 | 0 | newts | 500 + 150 − 100 + 20 − 40 = 530.
M2#ecology-u02-05-q3@2: A population of 400 has a per capita birth rate of 0.3 and death rate of 0.35 per year, with no migration. What is happening? | It is declining, because r = −0.05 | It is growing, because births are high | It is stable, because rates are similar | It is growing at 5% a year | r = b − d = −0.05, so numbers fall by about 5% a year.
M3#ecology-u02-05-q4@3: A woodland song thrush population has stayed at about 30 pairs for ten years, but nest monitoring shows few chicks fledge. Which interpretation is best? | It may be a sink, maintained by immigration from more productive habitat | It must be a healthy source population, because numbers are stable | The nest monitoring must be wrong | The population has no immigration | Stable numbers with poor breeding suggest losses are replaced by immigrants, the signature of a sink.
SA3#ecology-u02-05-q5@2,3: Explain why per capita rates are more useful than total numbers of births and deaths, and how source–sink dynamics complicate conservation decisions. | Totals depend on population size: 100 births mean fast growth in a population of 200 but little in one of 10 000. Per capita rates (b, d and r) allow comparison between populations and over time. In source–sink systems, a sink may hold many individuals yet contribute nothing to persistence, while a smaller source produces the surplus. Protecting the sink because it holds many animals, and losing the source, could cause decline everywhere, so conservation needs demographic data, not counts alone. | Totals depend on size ; Per capita rates allow comparison ; Defines source and sink ; Counts can mislead ; Conservation implication

## Exponential growth
LV: Intermediate · Application
S: With unlimited resources, a population grows by a constant proportion each unit of time, producing a J-shaped curve. This lesson covers the continuous and discrete forms of exponential growth, doubling time and why exponential growth can never last.
O: Describe exponential growth and the conditions under which it occurs
O: Calculate population size and doubling time using exponential models
O: Evaluate the use of the exponential model for real populations
PRE: Births, deaths, immigration and emigration
H: Growth by a constant proportion
P: If each individual has the same per capita rate of increase r regardless of density, the population's growth rate is proportional to its size. The more individuals there are, the faster the population grows, producing a **J-shaped** curve.
E: dN/dt = rN, so N_{t} = N_{0}e^{rt} :: continuous growth, for species that breed throughout the year
E: N_{t+1} = λN_{t}, so N_{t} = N_{0}λ^{t} :: discrete growth, for species with a breeding season; λ is the finite rate of increase per generation or year
P: The two are linked by λ = e^{r}. A population grows if r > 0 (λ > 1), is stable if r = 0 (λ = 1) and declines if r < 0 (λ < 1).
H: Doubling time
E: t_{double} = ln 2 ÷ r ≈ 0.693 ÷ r
X: Bacteria and pheasants.
> A bacterial culture has r = 0.0231 per minute: doubling time = 0.693 ÷ 0.0231 ≈ 30 minutes; after 5 hours (10 doublings) one cell becomes 2^{10} ≈ 1000 cells.
> Pheasants: Einarsen (1945) recorded two cocks and six hens released on Protection Island, Washington, in 1937 growing to almost 2000 birds by 1942, close to exponential growth in an empty habitat.
P: Exponential growth appears when a population is far below its resource limits: after introduction to a new habitat, after a crash, or in the early stages of a pest outbreak or disease epidemic.
K: Exponential growth adds a constant proportion each unit of time; even modest rates give rapid doubling, so it can only be temporary.
H: Why it can't last
P: Darwin calculated that a single pair of elephants, the slowest-breeding animals he knew, would leave around 19 million descendants after 750 years if all survived. Exponential growth always outruns resources; real populations eventually slow, as the logistic model describes, or crash.
X: Reindeer on St Matthew Island.
> In 1944, 29 reindeer were released on St Matthew Island in the Bering Sea, which had abundant lichen and no predators.
> The herd grew roughly exponentially to about 6000 by 1963.
> Overgrazed lichen couldn't support them; after a severe winter the herd crashed to 42 animals by 1966 (Klein, 1968).
!: Plotting exponential data on a linear scale and calling the early part "slow growth". On a logarithmic scale exponential growth is a straight line: the proportional rate is constant throughout.
EV: established | Populations introduced to new, resource-rich habitats often grow approximately exponentially at first, as documented for pheasants and reindeer.
EV: contested | Whether the St Matthew Island crash was caused mainly by food shortage or by an extreme winter acting on a weakened herd is discussed; both contributed.
T: Exponential growth | Growth at a constant per capita rate, producing a J-shaped curve
T: Finite rate of increase | λ, the factor by which a population multiplies in one time step
T: Doubling time | The time for a growing population to double in size, ln 2 ÷ r
SUM: With unlimited resources, dN/dt = rN and N grows as N₀e^{rt} (or N₀λ^t for discrete breeders), giving a J-shaped curve.
SUM: Doubling time is about 0.693 ÷ r; exponential growth is always temporary, ending in levelling off or crash.
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 45.3 "Environmental limits to population growth" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/45-3-environmental-limits-to-population-growth
SRC: Klein D. R., "The introduction, increase, and crash of reindeer on St. Matthew Island", Journal of Wildlife Management 32(2):350–367 | primary | 1968 | https://doi.org/10.2307/3798981
SRC: Gotelli N. J., A Primer of Ecology, 4th edition, Sinauer, chapter 1 | secondary | 2008
Q: What is the equation for continuous exponential growth? | dN/dt = rN, with solution N(t) = N(0)e^(rt).
Q: How is doubling time calculated? | ln 2 ÷ r, about 0.693 ÷ r.
M1#ecology-u02-06-q1@1: What shape does exponential growth produce on a graph of N against time? | J-shaped | S-shaped | A straight horizontal line | A bell shape | Growth accelerates as N rises because growth rate is proportional to N, giving a J-shaped curve.
NUM2#ecology-u02-06-q2@2: A population grows with r = 0.1 per year. What is its doubling time, to the nearest year? | 7 | 0.5 | years | 0.693 ÷ 0.1 = 6.93, about 7 years.
M2#ecology-u02-06-q3@2: A population of 100 insects has λ = 1.5 per generation. How many are expected after three generations? | About 338 | 150 | 450 | 250 | Multiply by λ once per generation: N = 100 × 1.5³ = 100 × 3.375 ≈ 338.
TF2#ecology-u02-06-q4@2: When exponential growth is plotted with a logarithmic y-axis, it gives a straight line. | true | ln N = ln N₀ + rt, which is linear in t with slope r.
M3#ecology-u02-06-q5@3: What does the St Matthew Island reindeer example show about the exponential model? | It can describe early growth in an empty habitat, but ignores resource limits that eventually cause decline or crash | Exponential growth continues indefinitely if there are no predators | Reindeer populations always follow logistic growth exactly | Severe winters have no effect on populations | Growth was near-exponential until lichen was overgrazed; the model can't predict the crash because it has no resource limit.
SA3#ecology-u02-06-q6@2,3: Explain why populations introduced to new habitats often grow exponentially at first, and evaluate the usefulness of the exponential model. | In a new habitat resources are plentiful, there are few competitors, predators or diseases, and density is low, so per capita birth and death rates aren't affected by density and r is close to its maximum; growth is proportional to N. The model is useful for early growth, invasions, epidemics and pest outbreaks, and gives doubling times. But it assumes constant r, no density dependence, no age structure and no chance events; it predicts unlimited growth, which never happens, as the reindeer crash shows. The logistic and other density-dependent models are needed for longer periods. | Plentiful resources and low density ; Constant per capita rate ; A use of the model ; A limitation of its assumptions ; Example of exponential growth ending

## Logistic growth and carrying capacity
LV: Intermediate · Application
S: As resources run short, per capita growth slows and a population levels off at the carrying capacity, giving an S-shaped curve. This lesson develops the logistic model, interprets K and r, and examines how well real populations fit it.
O: Describe logistic growth and define carrying capacity
O: Use the logistic equation to calculate growth rate and find where it is greatest
O: Evaluate the logistic model against real population data
PRE: Exponential growth
H: Adding a limit
P: The **logistic model** (Verhulst, 1838; Pearl and Reed, 1920) adds a brake to exponential growth. The per capita growth rate falls in a straight line as N rises, reaching zero at the **carrying capacity**, K: the maximum population the environment can sustain indefinitely.
E: dN/dt = rN(1 − N/K) :: (1 − N/K) is the fraction of K still unused; growth stops when N = K
P: The result is an **S-shaped (sigmoid)** curve: a lag phase when N is small, a phase of rapid growth, then deceleration as N approaches K, and a plateau.
H: Where growth is fastest
P: The population's total growth rate, dN/dt, is small when N is tiny (few individuals breeding) and small when N is near K (strong limitation). It is greatest at **N = K/2**, where dN/dt = rK/4. This point is the basis of maximum sustainable yield in harvesting (see Harvesting and maximum sustainable yield).
X: Using the logistic equation.
> A population has r = 0.4 per year and K = 1000.
> At N = 100: dN/dt = 0.4 × 100 × (1 − 0.1) = 36 per year.
> At N = 500: dN/dt = 0.4 × 500 × 0.5 = 100 per year, the maximum (rK/4 = 100).
> At N = 900: dN/dt = 0.4 × 900 × 0.1 = 36 per year. Growth slows as K is approached.
K: In the logistic model per capita growth declines linearly with density; total growth is greatest at K/2 and zero at K.
H: How well does it fit?
P: Gause's (1934) laboratory cultures of *Paramecium*, and yeast cultures, fit the logistic curve well. Many natural populations do level off but fluctuate around K rather than sitting on it. Real populations depart from the model because:
- **Time lags**: births reflect conditions in the past, so populations overshoot K and oscillate.
- **K varies**: carrying capacity changes with weather, food supply and habitat.
- **Density dependence isn't linear**: many populations are hardly limited until near K, then sharply limited.
- **Age structure and chance** are ignored.
!: Thinking K is a fixed property of a species. K is a property of a species in a particular environment, and it changes as the environment changes.
EV: established | Laboratory populations of microorganisms such as Paramecium and yeast closely follow logistic growth.
EV: contested | Whether the carrying capacity is a useful, measurable quantity for most wild populations, given that it varies with the environment, is debated.
T: Carrying capacity | The maximum population size an environment can sustain indefinitely, K
T: Logistic growth | Growth that slows as N approaches K, dN/dt = rN(1 − N/K), giving an S-shaped curve
T: Time lag | A delay between a change in density and the population's response, which can cause overshoot and oscillation
SUM: Logistic growth slows as N approaches K, giving an S-shaped curve; growth is greatest at K/2.
SUM: Laboratory cultures fit it well; wild populations fluctuate around a changing K because of time lags, variable environments and chance.
SRC: Gause G. F., The Struggle for Existence, Williams and Wilkins | primary | 1934
SRC: Pearl R. and Reed L. J., "On the rate of growth of the population of the United States since 1790 and its mathematical representation", Proceedings of the National Academy of Sciences 6(6):275–288 | primary | 1920 | https://doi.org/10.1073/pnas.6.6.275
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 45.3 "Environmental limits to population growth" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/45-3-environmental-limits-to-population-growth
Q: Write the logistic growth equation. | dN/dt = rN(1 − N/K).
Q: At what population size is logistic growth fastest? | At N = K/2, where dN/dt = rK/4.
M1#ecology-u02-07-q1@1: What is the carrying capacity of an environment? | The maximum population it can sustain indefinitely | The maximum rate of increase of a population | The number of species it holds | The population size at which growth is fastest | K is the population size at which births balance deaths under the environment's resource limits.
NUM2#ecology-u02-07-q2@2: For a logistic population with r = 0.5 per year and K = 800, what is dN/dt when N = 400? | 100 | 0 | per year | 0.5 × 400 × (1 − 400/800) = 0.5 × 400 × 0.5 = 100 per year.
M2#ecology-u02-07-q3@2: Why does a logistic population grow slowly when it is very close to K? | Per capita growth is near zero because resources are almost fully used | There are too few individuals to breed | r increases sharply near K | Immigration stops at K | The factor (1 − N/K) approaches zero, so even a large population adds few individuals.
TF1#ecology-u02-07-q4@1: The logistic model produces an S-shaped growth curve. | true | A slow start, rapid middle phase and levelling off at K give the sigmoid shape.
M3#ecology-u02-07-q5@3: A deer population repeatedly rises above and falls below its estimated carrying capacity. Which explanation is best? | Time lags between density and reproduction cause overshoot and oscillation | The logistic model predicts oscillation for all populations | K must be zero | Deer have no density dependence | Births respond to past conditions (food last year), so the population overshoots K and then declines, which the simple logistic model omits.
SA3#ecology-u02-07-q6@2,3: Compare exponential and logistic growth, and evaluate how well the logistic model describes populations in the wild. | Exponential growth assumes constant per capita growth and unlimited resources, giving a J-curve; logistic growth makes per capita growth decline linearly with N to zero at K, giving an S-curve with fastest growth at K/2. Laboratory cultures such as Gause's Paramecium fit the logistic well. In the wild, K varies with weather and food, time lags cause overshoot and oscillation, density dependence is often non-linear, and chance events and age structure matter, so populations fluctuate around K rather than settling. The model is a useful first approximation and basis for harvesting theory, but not a precise description. | J-curve and assumptions ; S-curve and K ; Laboratory fit ; At least two reasons wild populations depart ; Judgement on usefulness

## Density-dependent and density-independent factors
LV: Intermediate · Evaluation
S: Some factors act more strongly as a population becomes denser; others act regardless of density. This lesson distinguishes density-dependent from density-independent factors, shows how only the former can regulate a population and examines the classic debate between the two views.
O: Distinguish density-dependent and density-independent factors with examples
O: Explain why density dependence is needed for population regulation
O: Evaluate evidence from the debate between density-dependent and density-independent explanations of abundance
PRE: Logistic growth and carrying capacity
H: Two kinds of factor
- **Density-dependent factors** change per capita birth or death rates more strongly as density rises: competition for food and territories, predation (when predators focus on abundant prey), parasites and disease (which spread faster in dense populations), and accumulation of waste.
- **Density-independent factors** affect the same proportion of the population whatever its density: severe frost, drought, floods, fire, storms and many pollution events.
K: Only density-dependent factors can regulate a population, pushing it back towards an equilibrium: they increase mortality or reduce births when it is large and relax when it is small. Density-independent factors cause fluctuations but don't regulate.
H: Telling them apart
X: Plotting mortality against density.
> In a study of a bird population over 20 years, the percentage of juveniles dying each winter is plotted against the number of birds in autumn.
> If the percentage dying rises with density, mortality is density-dependent: for example, because of competition for winter food.
> If deaths are high in some years regardless of density, such as hard winters, that component is density-independent.
> Many populations show both: Soay sheep on St Kilda crash in winters that combine high density with bad weather.
P: Varley and Gradwell's **key-factor analysis** of winter moth in Wytham Wood, Oxford, measured mortality at each life stage over many years. Winter (largely density-independent) losses explained most year-to-year variation, while pupal predation in the soil was density-dependent and helped regulate numbers.
H: The great debate
P: In the mid-20th century, Nicholson argued that populations are regulated by density-dependent competition. Andrewartha and Birch (1954), working on Australian insects such as the thrips *Thrips imaginis*, argued that weather keeps most populations below the level where competition matters. The modern view is that both operate: density-independent factors cause much of the variation from year to year, while density-dependent factors keep populations within bounds over the long term.
!: Labelling a factor permanently as one type. Disease can be density-independent for one host and density-dependent for another; a drought may kill more individuals in a crowded population that is already short of water.
EV: established | Density dependence has been detected in long-term data for most well-studied animal populations, although it may be weak or act only at high density.
EV: contested | The relative importance of density-dependent and density-independent factors varies between species and remains a classic debate in population ecology.
T: Density-dependent factor | A factor whose effect on per capita birth or death rates increases with population density
T: Density-independent factor | A factor that affects the same proportion of a population regardless of its density
T: Population regulation | The tendency of a population to return towards an equilibrium through density-dependent processes
SUM: Density-dependent factors (competition, predation, disease) intensify with density; density-independent ones (weather, fire) don't.
SUM: Only density dependence regulates; most populations show both kinds of factor, as the Nicholson–Andrewartha debate concluded.
SRC: Andrewartha H. G. and Birch L. C., The Distribution and Abundance of Animals, University of Chicago Press | primary | 1954
SRC: Varley G. C. and Gradwell G. R., "Key factors in population studies", Journal of Animal Ecology 29(2):399–401 | primary | 1960
SRC: Clutton-Brock T. H. and Pemberton J. M. (eds), Soay Sheep: Dynamics and Selection in an Island Population, Cambridge University Press | primary | 2004
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 45.4 "Population dynamics and regulation" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/45-4-population-dynamics-and-regulation
Q: Give two density-dependent and two density-independent factors. | Dependent: competition, disease, predation, parasitism. Independent: frost, drought, flood, fire.
Q: Why can only density-dependent factors regulate a population? | Only they increase mortality or reduce births as density rises and relax as it falls, pushing numbers back towards equilibrium.
M1#ecology-u02-08-q1@1: Which of these is a density-independent factor? | A severe late frost | Competition for nest sites | Spread of a contagious disease | Territorial behaviour | A frost kills a similar proportion whatever the density; the others intensify as density rises.
M2#ecology-u02-08-q2@2: In a rabbit population, the percentage infected by a virus rises from 5% at low density to 60% at high density. What does this show? | Disease is acting as a density-dependent factor | Disease is density-independent | The virus is unaffected by contact rates | The population is not regulated | Transmission increases with contact rate, so a higher proportion is infected at higher density.
MS2#ecology-u02-08-q3@2: Which observations would support density-dependent regulation? Choose all that apply. | Per capita birth rate falls as density rises ; Juvenile mortality increases in crowded years ; A population returns towards a similar level after disturbances | Mortality from storms is the same proportion every year ; Numbers fluctuate randomly with weather only | Regulation requires per capita rates to respond to density and pull numbers back; constant-proportion mortality and pure weather-driven fluctuation don't.
M3#ecology-u02-08-q4@3: Which conclusion best summarises the Nicholson versus Andrewartha and Birch debate? | Both kinds of factor operate: weather drives much annual variation, while density dependence keeps populations within bounds | Andrewartha and Birch proved density dependence never occurs | Nicholson proved weather has no effect on populations | Only predation regulates populations | Long-term studies such as Soay sheep and winter moth show density-independent fluctuations combined with density-dependent regulation.
SA3#ecology-u02-08-q5@2,3: Using a named example, explain how density-dependent and density-independent factors can interact to determine population size. | Soay sheep on St Kilda: numbers build up over several years until food in winter becomes scarce; in a winter with both high density and bad weather (cold, wet, windy) many sheep, especially lambs and old males, starve, and the population crashes by up to half or more. At low density, the same weather kills few. So the density-independent factor (weather) has its greatest effect at high density (density-dependent food shortage): the two interact. Regulation comes from food competition; the timing of crashes from weather. | Names an example ; Density-dependent mechanism described ; Density-independent factor described ; Interaction explained ; Conclusion about regulation

## Population cycles and fluctuations
LV: Intermediate · Evaluation
S: Some populations rise and fall in regular cycles, such as the ten-year cycle of snowshoe hares and lynx. This lesson describes cycles and irregular fluctuations, the Lotka–Volterra predator–prey model, and the experiments that tested what drives cycles.
O: Describe regular cycles and irregular fluctuations in population size with examples
O: Explain how the Lotka–Volterra model produces predator–prey cycles with a lag
O: Evaluate evidence on the causes of the snowshoe hare cycle
PRE: Density-dependent and density-independent factors
H: Fluctuations and cycles
P: All populations fluctuate. Most changes are **irregular**, following weather and food. A few populations show remarkably regular **cycles**: snowshoe hares and Canada lynx in the boreal forest about every 9–11 years; lemmings and voles about every 3–5 years; red grouse in parts of Scotland and northern England about every 4–8 years.
P: The lynx cycle was documented from the numbers of pelts traded by the Hudson's Bay Company from the early 19th century (Elton and Nicholson, 1942): lynx peaks follow hare peaks by a year or two.
H: The Lotka–Volterra model
E: dH/dt = aH − bHP;  dP/dt = cbHP − mP :: H prey, P predators; a prey growth rate, b capture rate, c conversion of prey into predators, m predator death rate
P: Prey grow exponentially without predators; predators decline without prey. As prey increase, predators have more food and increase; more predators eat more prey, so prey fall; with less food predators fall; with fewer predators prey recover. The model gives endless cycles, with **predator peaks lagging behind prey peaks**.
K: Predator–prey models produce cycles because each population responds to the other with a delay: the predator's increase lags the prey's.
H: What really drives the hare cycle?
X: The Kluane experiment, Yukon (Krebs et al., 1995).
> Large fenced blocks of boreal forest were given extra food, excluded predators (mammalian predators fenced out), or both, compared with controls.
> Food addition alone roughly tripled hare density at the cycle peak; predator exclusion alone roughly doubled it.
> Food plus predator exclusion together increased density about elevenfold.
> Conclusion: the cycle results from an interaction of food and predation, with predation the stronger single factor.
P: Other cycles have other causes. In red grouse, Hudson, Dobson and Newborn (1998) treated birds with an anthelmintic against the parasitic nematode *Trichostrongylus tenuis* and largely removed the cycle, showing the parasite was a cause.
!: Assuming the predator always causes the prey cycle. Hares also cycle partly because of food quality and stress effects on breeding; the classic pelt data show correlation, and experiments were needed to test causes.
EV: established | Snowshoe hare and lynx populations cycle with a period of about ten years, with lynx peaks lagging hare peaks.
EV: established | Experimental removal of parasites largely stopped population cycles in red grouse in northern England.
EV: contested | The relative contributions of predation, food and predator-induced stress to the hare cycle are still debated.
T: Population cycle | A regular, repeated rise and fall in population size with a characteristic period
T: Lotka–Volterra model | A pair of equations for predator and prey populations that produces coupled cycles
SUM: Populations fluctuate irregularly; some, such as hares and lynx, cycle regularly with predator peaks lagging prey peaks.
SUM: Lotka–Volterra models produce cycles; experiments show real cycles arise from interacting food, predation and parasites.
SRC: Krebs C. J. et al., "Impact of food and predation on the snowshoe hare cycle", Science 269(5227):1112–1115 | primary | 1995 | https://doi.org/10.1126/science.269.5227.1112
SRC: Hudson P. J., Dobson A. P. and Newborn D., "Prevention of population cycles by parasite removal", Science 282(5397):2256–2258 | primary | 1998 | https://doi.org/10.1126/science.282.5397.2256
SRC: Elton C. and Nicholson M., "The ten-year cycle in numbers of the lynx in Canada", Journal of Animal Ecology 11(2):215–244 | primary | 1942 | https://doi.org/10.2307/1358
Q: In predator–prey cycles, which peaks first? | The prey; predator peaks lag behind prey peaks.
Q: What did the Kluane experiment find about the hare cycle? | Food and predator exclusion each raised hare density, and both together increased it far more: food and predation interact.
M1#ecology-u02-09-q1@1: Which species pair shows a famous ten-year population cycle? | Snowshoe hare and Canada lynx | Red deer and golden eagle | Rabbit and fox in Britain | Grey squirrel and pine marten | Hudson's Bay Company pelt records revealed the roughly ten-year hare–lynx cycle.
M2#ecology-u02-09-q2@2: In the Lotka–Volterra model, why do predator numbers fall after prey numbers peak? | Prey have become scarce, so predators starve or breed less | Predators always die at a fixed time | Prey start eating predators | The model has no link between predator and prey | The predator's growth depends on prey; once prey decline, predator births fall below deaths.
TF2#ecology-u02-09-q3@2: Treating red grouse for a parasitic worm reduced the population cycles in an experiment. | true | Hudson and colleagues' anthelmintic treatment largely prevented the crashes, showing the parasite caused the cycles.
M3#ecology-u02-09-q4@3: Pelt records show lynx peaks follow hare peaks. Why don't they on their own prove that lynx cause the hare cycle? | They are correlational; food shortage could also cause the hare decline, and only experiments separate the causes | Pelt records are always fabricated | Lynx don't eat hares | Hares cycle only in captivity | A time-lagged correlation fits the hypothesis but is also expected if hares crash from food shortage and lynx follow; manipulation of food and predators was needed.
SA3#ecology-u02-09-q5@2,3: Describe the Kluane experiment and evaluate what it shows about the causes of the snowshoe hare cycle. | Large blocks of forest in the Yukon were assigned to food addition, predator exclusion (fencing out mammalian predators), both, or control, and hares were counted through a cycle. Food raised peak density about threefold, predator exclusion about twofold, and both together about elevenfold, so food and predation interact, and the cycle isn't caused by one factor. Limitations: few large replicates (it's hard to replicate huge blocks), avian predators couldn't be excluded, and hares could still be affected by stress. The study shows the value of large-scale manipulation for testing causes suggested by correlations. | Treatments described ; Results for food and predators ; Interaction conclusion ; A limitation ; Value of experiment over correlation

## Life tables and survivorship curves
LV: Intermediate · Application
S: A life table records how many individuals in a cohort survive to each age and how many die, and a survivorship curve plots this. This lesson builds a life table, defines its columns and interprets the three types of survivorship curve.
O: Construct a cohort life table and calculate l_x, d_x and q_x
O: Describe and give examples of type I, II and III survivorship curves
O: Interpret a survivorship curve and a net reproductive rate for a population
PRE: Births, deaths, immigration and emigration
H: The life table
P: A **cohort life table** follows a group born at the same time until all have died. Its columns are:
- **n_x**: the number alive at the start of age class x.
- **l_x**: survivorship, the proportion of the original cohort alive at age x (n_x ÷ n_0).
- **d_x**: the number dying during age class x (n_x − n_{x+1}).
- **q_x**: the age-specific mortality rate, d_x ÷ n_x.
X: A cohort of 1000 tawny owl eggs (illustrative figures).
> Age 0 (eggs): n = 1000; 400 fail to fledge, so q₀ = 0.4.
> Age 1 (first year): n = 600; 300 die in their first winter, q₁ = 0.5.
> Age 2: n = 300; 60 die, q₂ = 0.2. Age 3: n = 240, l₃ = 0.24.
> Mortality is highest in early life, then falls among established adults.
H: Survivorship curves
P: Plotting l_x on a **logarithmic** scale against age gives a survivorship curve (Pearl, 1928). On a log scale a constant mortality rate appears as a straight line.
- **Type I**: low mortality until old age, then a steep decline. Humans in high-income countries, elephants, many large mammals with parental care.
- **Type II**: constant mortality rate at all ages, a straight line on a log scale. Many songbirds as adults, hydra, some lizards.
- **Type III**: very high mortality early, then low mortality for the few survivors. Oysters, cod, most trees and plants with many small seeds.
K: Survivorship curves show when in life mortality is concentrated: late (type I), evenly (type II) or early (type III). Most real species are mixtures.
H: Reproduction and growth
P: Adding m_x, the average number of female offspring produced per female of age x, gives the **net reproductive rate**: R₀ = Σ l_x m_x, the average number of daughters a female produces in her lifetime. R₀ > 1 means growth; R₀ < 1, decline.
X: Calculating R₀.
> l₁ = 0.5, m₁ = 1; l₂ = 0.3, m₂ = 2; l₃ = 0.1, m₃ = 2.
> R₀ = (0.5 × 1) + (0.3 × 2) + (0.1 × 2) = 0.5 + 0.6 + 0.2 = 1.3.
> Each female replaces herself 1.3 times: the population grows by 30% per generation.
!: Plotting survivorship on a linear scale. On a linear axis a type II curve looks curved; the log scale is needed to show that mortality rates, not numbers, are constant.
EV: established | Life tables and survivorship curves are standard tools of demography, from human actuarial tables to wildlife management.
EV: contested | Static life tables, built from the ages at death of a sample at one time, assume a stable population, which is often untrue and can bias the curve.
T: Cohort | A group of individuals born during the same time interval
T: Survivorship (l_x) | The proportion of a cohort surviving to age x
T: Net reproductive rate | R₀ = Σ l_x m_x, the average number of female offspring produced per female in her lifetime
SUM: Life tables record n_x, l_x, d_x and q_x for a cohort; survivorship curves plot log l_x against age.
SUM: Type I, II and III curves concentrate mortality late, evenly or early; R₀ = Σ l_x m_x shows whether a population replaces itself.
SRC: Deevey E. S., "Life tables for natural populations of animals", Quarterly Review of Biology 22(4):283–314 | primary | 1947 | https://doi.org/10.1086/395888
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 45.1 "Population demography" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/45-1-population-demography
Q: What does q_x represent in a life table? | The age-specific mortality rate: the proportion of those alive at age x that die during that age class (d_x ÷ n_x).
Q: Describe a type III survivorship curve. | Very high mortality in early life, then low mortality among the few survivors, as in oysters, cod and many plants.
M1#ecology-u02-10-q1@1: Which organism is most likely to show a type III survivorship curve? | Cod | Elephant | Human in a high-income country | Adult blue tit | Cod release millions of eggs, nearly all of which die young; survivors then have relatively low mortality.
NUM2#ecology-u02-10-q2@2: Of 800 seedlings, 200 survive to age 1. What is l₁? | 0.25 | 0 | of the cohort | l₁ = 200 ÷ 800 = 0.25.
M2#ecology-u02-10-q3@2: A life table gives l₁ = 0.6, m₁ = 0.5 and l₂ = 0.2, m₂ = 1.5 (no older ages). What is R₀, and what does it mean? | 0.6; the population is declining | 1.3; the population is growing | 2.0; the population is doubling | 0.8; the population is stable | R₀ = 0.6 × 0.5 + 0.2 × 1.5 = 0.3 + 0.3 = 0.6, below 1, so each female doesn't replace herself.
TF2#ecology-u02-10-q4@2: A type II survivorship curve is a straight line when l_x is plotted on a logarithmic scale. | true | A constant proportional mortality rate gives a straight line on a log scale.
M3#ecology-u02-10-q5@3: Why do survivorship curves use a logarithmic scale for l_x? | So that equal slopes represent equal mortality rates, whatever the number alive | Because l_x values are always larger than 1000 | To make all curves look like type I | Because logarithms remove the effect of age | On a log scale the slope reflects proportional mortality, allowing rates at different ages and in different species to be compared.
SA3#ecology-u02-10-q6@2,3: Explain how a survivorship curve could guide the conservation of a long-lived seabird compared with a frog. | A long-lived seabird such as a puffin or albatross has a type I-like curve: high adult survival, few young and late breeding, so population growth is most sensitive to adult survival; conservation should reduce adult mortality, for example from fishing bycatch or predators at colonies. A frog has a type III-like curve: huge egg and tadpole mortality but many offspring; populations recover quickly if breeding ponds are good, so protecting and creating ponds and improving juvenile survival matters more. The curve shows which life stage has the most influence. | Seabird curve type and reason ; Sensitivity to adult survival ; Frog curve type ; Juvenile habitat focus ; Links curve to management

## Life-history strategies: r and K selection
LV: Intermediate · Evaluation
S: Organisms have limited resources to divide between growth, survival and reproduction, so they evolve different life-history strategies. This lesson explains life-history trade-offs, the r–K continuum and Grime's CSR scheme for plants, and why r and K selection is now used with caution.
O: Explain the trade-offs that shape life histories
O: Compare the traits associated with r- and K-selected species
O: Evaluate the r–K continuum as an explanation of life-history variation
PRE: Life tables and survivorship curves
H: Trade-offs
P: An organism's **life history** is its schedule of growth, reproduction and death: when it starts breeding, how many offspring it has, how big they are and how long it lives. Energy and time are limited, so there are **trade-offs**: more offspring means smaller offspring or less care for each; breeding early or often can shorten life. Lack (1947) showed that great tits lay a clutch size close to the number they can feed: larger broods produce fewer surviving fledglings each.
H: The r–K continuum
P: MacArthur and Wilson (1967) and Pianka (1970) contrasted two kinds of selection:
- **r-selection**, in unpredictable or newly opened environments where populations are often below carrying capacity: favours rapid development, early reproduction, many small offspring, little parental care, short life and good dispersal. Examples: annual weeds, aphids, mice.
- **K-selection**, in stable environments where populations are near carrying capacity and competition is intense: favours slow development, late reproduction, few large offspring, much parental care, long life and competitive ability. Examples: oaks, elephants, albatrosses.
K: Life histories reflect trade-offs between offspring number, offspring size, care and survival; the r–K continuum summarises how environments that are often uncrowded or crowded favour different trade-offs.
H: Plants: Grime's CSR triangle
P: Grime (1977) classified plants by two axes, **stress** (shortage of resources, such as drought or shade) and **disturbance** (destruction of biomass, such as ploughing, grazing or trampling), giving three strategies:
- **Competitors (C)**: low stress, low disturbance; tall, fast-growing perennials such as nettle and bramble.
- **Stress-tolerators (S)**: high stress, low disturbance; slow-growing, long-lived plants such as heather on poor soils or lichens.
- **Ruderals (R)**: low stress, high disturbance; short-lived annuals that seed prolifically, such as groundsel and poppies on arable land.
X: Classifying species.
> A dandelion on a mown verge: fast reproduction, wind-dispersed seeds, tolerates disturbance; mostly ruderal.
> A sundew on a peat bog: tolerates nutrient stress by catching insects, grows slowly; a stress-tolerator.
> A sycamore in a hedge: tall, fast-growing, shades competitors; a competitor.
H: Limits of the r–K idea
P: Real species often combine "r" and "K" traits, such as small-bodied species with high parental care. Reznick and colleagues (2002) argued that age-specific mortality, not density, explains much life-history variation: experiments with Trinidad guppies showed populations exposed to predators that eat adults evolved earlier maturity and more, smaller offspring. Modern life-history theory uses demographic models of trade-offs rather than the simple dichotomy.
!: Treating r and K as two boxes every species fits into. It is at best a continuum, and is now one heuristic among several.
EV: established | Trade-offs between offspring number and size, and between reproduction and survival, are well documented across plants and animals.
EV: contested | The r–K selection framework is criticised as too simple; age-specific mortality and other demographic approaches explain life histories better in many tests.
T: Life history | An organism's lifetime pattern of growth, reproduction and survival
T: Trade-off | A benefit in one trait that comes at a cost to another because resources are limited
T: r-selection | Selection in uncrowded, unpredictable environments favouring rapid reproduction and many small offspring
T: K-selection | Selection in crowded, stable environments favouring competitive ability, few large offspring and long life
SUM: Limited resources create trade-offs between offspring number, size, care and survival.
SUM: The r–K continuum and Grime's CSR triangle summarise strategies; both are useful heuristics with known limits.
SRC: Pianka E. R., "On r- and K-selection", American Naturalist 104(940):592–597 | primary | 1970 | https://doi.org/10.1086/282697
SRC: Grime J. P., "Evidence for the existence of three primary strategies in plants and its relevance to ecological and evolutionary theory", American Naturalist 111(982):1169–1194 | primary | 1977 | https://doi.org/10.1086/283244
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 45.2 "Life histories and natural selection" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/45-2-life-histories-and-natural-selection
Q: List four traits of K-selected species. | Slow development, late reproduction, few large offspring, high parental care, long life, strong competitive ability (any four).
Q: What are Grime's three plant strategies? | Competitors (C), stress-tolerators (S) and ruderals (R).
M1#ecology-u02-11-q1@1: Which set of traits is typical of an r-selected species? | Early maturity, many small offspring, little parental care | Late maturity, few large offspring, much parental care | Long life, slow growth, strong competitive ability | Large body size and high adult survival | r-selection favours rapid reproduction in uncrowded, unpredictable environments.
M2#ecology-u02-11-q2@2: A plant grows on regularly ploughed arable fields, lives a few months and produces thousands of seeds. Which CSR strategy is it closest to? | Ruderal | Competitor | Stress-tolerator | It fits none | High disturbance with low stress favours short-lived, prolific ruderals.
MATCH2#ecology-u02-11-q3@2: Match each species to its strategy. | Heather on nutrient-poor moorland = Stress-tolerator ; Stinging nettle on rich soil = Competitor ; Groundsel on disturbed ground = Ruderal ; African elephant = K-selected | Each reflects its environment's stress, disturbance or crowding.
M3#ecology-u02-11-q4@3: Guppies from streams where predators eat mainly adults mature earlier and produce more, smaller offspring. What does this suggest about the r–K framework? | Age-specific mortality, rather than density alone, can explain life-history evolution | Guppies are K-selected | Predation has no effect on life histories | The r–K framework fully explains the result | High adult mortality favours early reproduction regardless of crowding, which is better explained by demographic theory than by r–K alone.
SA3#ecology-u02-11-q5@2,3: Evaluate the usefulness of the r–K continuum for explaining life-history differences between species. | Useful: it summarises a common association of traits (fast, many, small, little care versus slow, few, large, much care) and links them to whether environments are often uncrowded or near carrying capacity; it predicts which species colonise disturbed habitats. Limitations: many species mix traits; the framework ignores age-specific mortality, which experiments such as Reznick's guppies show drives life-history evolution; density isn't the only selective factor; Grime's CSR adds stress versus disturbance for plants. So it is a helpful first description but not a full explanation. | Describes the continuum ; A strength ; A limitation with evidence ; Alternative such as CSR or demographic theory ; Judgement

## Age structure
LV: Introductory · Application
S: Age structure is the proportion of a population in each age class, often shown as an age pyramid. This lesson explains how to read age pyramids and what they reveal about past and future growth in wildlife and human populations.
O: Describe age structure and how it is shown in an age pyramid
O: Interpret pyramids for growing, stable and declining populations
O: Explain how age structure produces population momentum
PRE: Life tables and survivorship curves
H: Age pyramids
P: An **age pyramid** shows the number or percentage of individuals in each age class as horizontal bars, males on one side and females on the other. Its shape records the population's history of births and deaths and predicts its future.
- **Growing (expansive)**: wide base, narrowing quickly: many young, high birth rate.
- **Stable (stationary)**: similar numbers in each age class until old age: births roughly balance deaths.
- **Declining (constrictive)**: narrower base than middle: fewer young than parents, low birth rate.
K: An age pyramid is a snapshot of past demography and a forecast: a wide base means many future parents and continued growth; a narrow base means future decline.
H: Momentum
P: A population with a large young cohort keeps growing for decades even if each woman has only two children (replacement), because so many people are entering reproductive age. This is **population momentum**. Conversely, a population with few young keeps shrinking even if fertility rises.
X: Reading two pyramids.
> Country A: 40% of the population is under 15, 3% over 65. Expansive: rapid growth will continue for decades because of momentum.
> Country B: 13% under 15, 28% over 65. Constrictive: deaths will exceed births; the labour force will shrink and the dependency ratio rise.
H: Age structure in wildlife
P: Age structure also matters for managing wild populations. A fish stock dominated by young fish after heavy fishing has lost its largest, most fecund females, and recruitment can become unstable. In red deer, culling mostly young animals or mostly old stags changes the herd's growth rate. The **dependency ratio** in humans compares those under 15 and over 64 with those of working age.
!: Thinking a stable pyramid means no births. It means births and deaths balance, with similar cohorts at each age until mortality rises in old age.
EV: established | Population momentum means that populations with young age structures continue to grow for decades after fertility falls to replacement level.
EV: contested | How strongly ageing populations will affect economies depends on productivity, migration and policy, which are debated.
T: Age structure | The proportion of a population in each age class
T: Population momentum | Continued growth (or decline) caused by the age structure after birth rates change
T: Dependency ratio | The ratio of people aged under 15 and over 64 to those aged 15–64
SUM: Age pyramids show growing, stable or declining populations from the width of their base.
SUM: Age structure creates momentum and affects wildlife management and human dependency ratios.
SRC: United Nations, Department of Economic and Social Affairs, Population Division, World Population Prospects 2024 | data | 2024 | https://population.un.org/wpp/
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 45.5 "Human population growth" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/45-5-human-population-growth
Q: What does a wide base on an age pyramid indicate? | A high proportion of young individuals and a high birth rate, so the population is likely to grow.
Q: What is population momentum? | The continued growth or decline of a population because of its age structure, after birth rates have changed.
M1#ecology-u02-12-q1@1: An age pyramid with a narrower base than its middle indicates | a declining population | a rapidly growing population | a stable population with high birth rate | a population with no old individuals | Fewer young than adults means fewer future parents, so the population is likely to decline.
M2#ecology-u02-12-q2@2: A country's fertility falls to replacement level, but its population keeps growing for 40 years. Why? | A large cohort of young people is still reaching reproductive age | Death rates must have risen | Replacement fertility always causes growth | Immigration must be the only cause | Momentum: many young people will have children even at replacement fertility, so births exceed deaths for decades.
TF1#ecology-u02-12-q3@1: In a stable population, the age pyramid has similar-sized bars in each age class until old age. | true | Births balancing deaths keep successive cohorts similar until old-age mortality narrows the top.
M3#ecology-u02-12-q4@3: Heavy fishing has removed most large, old cod from a stock. Why might this harm the stock beyond the loss in numbers? | Large old females produce many more eggs, often of higher quality, so recruitment becomes lower and less stable | Young fish can't breed at all | Old fish compete with young fish, so removing them always helps | Age structure has no effect on fish populations | A truncated age structure removes the most fecund spawners and buffers against bad years, making recruitment more variable.
SA2#ecology-u02-12-q5@2,3: Compare the age pyramids you would expect for a country with high birth and death rates and one with low birth and death rates, and explain one consequence of each. | High birth and death rates: wide base, rapid narrowing, few old people, triangle-shaped; consequence: rapid growth with momentum and high demand for schools and jobs. Low birth and death rates: narrow base, wide middle and upper sections, many old people; consequence: an ageing population, shrinking workforce and higher dependency ratio, with more demand for health and social care. | Shape for high rates ; Consequence for high rates ; Shape for low rates ; Consequence for low rates

## Metapopulations
LV: Advanced · Application
S: Many species live as a network of local populations in habitat patches, linked by dispersal, each of which may go extinct and be recolonised. This lesson explains the metapopulation concept, the Levins model and its importance for conservation in fragmented landscapes.
O: Define a metapopulation and explain local extinction and recolonisation
O: Use the Levins model to calculate the equilibrium fraction of occupied patches
O: Apply metapopulation ideas to the conservation of species in fragmented habitats
PRE: Births, deaths, immigration and emigration
H: Populations of populations
P: A **metapopulation** is a set of local populations living in discrete habitat patches, connected by occasional dispersal (Levins, 1969). Local populations may go extinct, through chance or bad years, while empty patches are recolonised from occupied ones. The species persists regionally because colonisation balances extinction, even if no single local population would last.
H: The Levins model
E: dp/dt = cp(1 − p) − ep :: p fraction of patches occupied, c colonisation rate, e local extinction rate
P: At equilibrium, dp/dt = 0, which gives:
E: p* = 1 − e ÷ c :: the metapopulation persists only if c > e
X: Using the model.
> A butterfly has c = 0.5 and e = 0.2 per year: p* = 1 − 0.2 ÷ 0.5 = 0.6, so 60% of suitable patches are occupied at equilibrium.
> Habitat loss reduces the number of patches, lowering colonisation: if c falls to 0.25, p* = 1 − 0.8 = 0.2.
> If c falls below 0.2, p* is below zero: the metapopulation goes extinct, even though some suitable habitat remains.
K: In a metapopulation, regional persistence depends on colonisation outpacing local extinction; losing patches or connectivity can doom a species before all its habitat is gone.
H: Real metapopulations
P: Hanski's long-term study of the Glanville fritillary butterfly on the Åland Islands, Finland, followed about 4000 meadows: each year many local populations went extinct and others were founded, and small, isolated patches were least likely to be occupied (Hanski, 1998). In Britain the silver-spotted skipper and the natterjack toad have been studied and managed as metapopulations.
P: Some metapopulations have a large, persistent **mainland** population that supplies colonists to small patches; others are networks of similar patches. Empty suitable patches aren't wasted: they are part of the system, and future colonisation needs them.
!: Treating unoccupied habitat patches as unsuitable and therefore unimportant. In a metapopulation, today's empty patch may be tomorrow's population.
EV: established | Studies of the Glanville fritillary show that local extinction and recolonisation are frequent, and that patch area and isolation predict occupancy.
EV: contested | How many species truly function as classic metapopulations, rather than as patchy populations or source–sink systems, is debated.
T: Metapopulation | A network of local populations in habitat patches connected by dispersal
T: Local extinction | The loss of a population from one patch while the species persists elsewhere
T: Connectivity | The degree to which a landscape allows movement between habitat patches
SUM: Metapopulations persist through a balance of local extinction and recolonisation among habitat patches.
SUM: The Levins model gives p* = 1 − e/c; losing patches or connectivity can cause regional extinction.
SRC: Levins R., "Some demographic and genetic consequences of environmental heterogeneity for biological control", Bulletin of the Entomological Society of America 15(3):237–240 | primary | 1969
SRC: Hanski I., "Metapopulation dynamics", Nature 396:41–49 | primary | 1998 | https://doi.org/10.1038/23876
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 45.4 "Population dynamics and regulation" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/45-4-population-dynamics-and-regulation
Q: What is a metapopulation? | A set of local populations in separate habitat patches, connected by dispersal, persisting through a balance of local extinction and recolonisation.
Q: What is the equilibrium of the Levins model? | p* = 1 − e/c, the fraction of patches occupied; persistence needs c > e.
M1#ecology-u02-13-q1@1: In a metapopulation, what keeps the species present regionally despite local extinctions? | Recolonisation of empty patches by dispersers | Every local population being permanently stable | No dispersal between patches | A single large population with no patches | Colonisation from occupied patches replaces local losses.
NUM2#ecology-u02-13-q2@2: In the Levins model, c = 0.4 and e = 0.1 per year. What fraction of patches is occupied at equilibrium? | 0.75 | 0 | of patches | p* = 1 − 0.1 ÷ 0.4 = 1 − 0.25 = 0.75.
M2#ecology-u02-13-q3@2: A developer argues that a meadow with no fritillary butterflies this year has no conservation value for them. What is the best response? | It may be part of the metapopulation and needed for future recolonisation | Unoccupied habitat is always unsuitable | Butterflies never move between meadows | The meadow is valuable only if a population lives there now | Empty suitable patches are part of a metapopulation's long-term persistence.
M3#ecology-u02-13-q4@3: Using the Levins model, why can habitat fragmentation cause extinction before all habitat is lost? | Fewer and more isolated patches reduce colonisation; once c falls to e or below, p* reaches zero | Fragmentation increases colonisation | Extinction happens only when the last patch is destroyed | Local extinction rates fall in smaller patches | The model shows a threshold: persistence fails once colonisation no longer exceeds extinction, even with suitable patches left.
SA3#ecology-u02-13-q5@2,3: Explain how metapopulation theory should influence the conservation of a butterfly in a fragmented landscape. | The species persists through local extinction and recolonisation, so conservation should protect a network of patches, including those currently unoccupied; maintain or create habitat patches close together and improve connectivity (stepping stones, corridors, sympathetic management of the land between) to raise colonisation; make patches larger to reduce local extinction; and monitor occupancy across the network rather than individual sites. The Levins model shows a threshold below which the network collapses, so even modest further losses could be critical. | Network of patches, including empty ones ; Connectivity to raise colonisation ; Larger patches to cut extinction ; Threshold or model reasoning ; Monitoring at network scale

## Human population growth
LV: Introductory · Evaluation
S: The human population has grown from under a billion in 1800 to about 8.2 billion in 2024, but its growth rate has been falling since the 1960s. This lesson describes that growth, its causes and the latest UN projections, and examines debates about carrying capacity and impact.
O: Describe the pattern of human population growth and its current rate
O: Explain the causes of rapid growth and of the recent fall in growth rate
O: Evaluate claims about the human carrying capacity and the IPAT equation
PRE: Exponential growth
H: The pattern
P: The human population reached about 1 billion around 1800, 2 billion in 1927, 4 billion in 1974 and 8 billion in November 2022 (UN). The annual growth rate peaked at a little over 2% in the 1960s and has since fallen to below 1%. Absolute numbers still rise by around 70 million a year.
P: UN World Population Prospects 2024 projects that the world population will peak at about 10.3 billion in the mid-2080s and then decline slightly by 2100. Global fertility was about 2.25 births per woman in 2024, close to the replacement level of about 2.1, but varies widely: below 1.5 in many European and East Asian countries, above 4 in several sub-Saharan African countries.
K: Human growth was faster than exponential for centuries, but the growth rate has roughly halved since the 1960s; numbers are projected to peak this century.
H: Why it grew, and why growth is slowing
- **Falling death rates** came first: better food supply, clean water and sanitation, vaccination and medicine, especially reducing child mortality.
- **Birth rates fell later**, as child survival rose, education (especially of girls) and access to contraception increased, and urbanisation changed the costs and benefits of children. This sequence is the demographic transition (see The demographic transition).
H: Carrying capacity and impact
P: Estimates of Earth's human carrying capacity range enormously, because they depend on diet, technology, consumption and the standard of living assumed (Cohen, 1995). Ehrlich and Holdren (1971) summarised environmental impact as:
E: I = P × A × T :: impact = population × affluence (consumption per person) × technology (impact per unit consumed)
X: Applying IPAT.
> Two countries each emit the same total CO₂.
> Country X has a large population and low consumption per person; country Y has a small population and high consumption.
> Impact depends on the product: halving consumption per person in Y would cut emissions as much as halving Y's population.
> Technology can reduce T: renewable electricity lowers emissions per unit of energy used.
!: Assuming population growth is the main driver of every environmental problem. Per capita consumption differs by more than tenfold between countries, and most emissions come from high-consumption populations.
EV: established | The world population passed 8 billion in 2022, and the global growth rate has fallen from over 2% a year in the 1960s to under 1%.
EV: contested | Projections of when and at what level the population will peak depend on assumptions about fertility decline, especially in sub-Saharan Africa, and differ between the UN and other groups.
EV: contested | Whether a meaningful single human carrying capacity can be estimated is disputed, because it depends on consumption and technology.
T: Total fertility rate | The average number of children a woman would have over her lifetime at current age-specific birth rates
T: Replacement fertility | The fertility rate at which a population replaces itself, about 2.1 children per woman where child mortality is low
T: IPAT equation | Impact = Population × Affluence × Technology
SUM: Human numbers rose from about 1 billion in 1800 to 8.2 billion in 2024; the growth rate has fallen below 1% a year.
SUM: Falling death rates then birth rates explain the pattern; impact depends on consumption and technology as well as population.
SRC: United Nations, Department of Economic and Social Affairs, Population Division, World Population Prospects 2024: Summary of Results | data | 2024 | https://population.un.org/wpp/
SRC: Ehrlich P. R. and Holdren J. P., "Impact of population growth", Science 171(3977):1212–1217 | primary | 1971 | https://doi.org/10.1126/science.171.3977.1212
SRC: Cohen J. E., How Many People Can the Earth Support?, W. W. Norton | secondary | 1995
Q: When did the world population reach 8 billion, according to the UN? | In November 2022.
Q: What does the IPAT equation state? | Environmental impact = Population × Affluence (consumption per person) × Technology (impact per unit consumed).
M1#ecology-u02-14-q1@1: What has happened to the annual growth rate of the world population since the 1960s? | It has fallen from over 2% to under 1% | It has risen steadily | It has stayed constant at 2% | It has fallen to zero | Growth peaked in the 1960s and has roughly halved since, though numbers still rise.
M2#ecology-u02-14-q2@2: Why did the human population grow fastest after death rates fell but before birth rates fell? | The gap between high births and low deaths produced a large natural increase | Birth rates rose sharply at the same time | Immigration from other continents increased world population | Death rates rose while birth rates stayed high | Natural increase is births minus deaths; when deaths fall first, the gap widens and growth accelerates.
TF3#ecology-u02-14-q3@3: Under the IPAT equation, reducing consumption per person can reduce impact as much as reducing population. | true | Impact is a product, so halving A has the same effect on I as halving P.
M3#ecology-u02-14-q4@3: Which is the best evaluation of the claim that "Earth's carrying capacity for humans is 10 billion"? | Any single figure depends on assumed diets, technology and living standards, so it is highly uncertain | It is proven by the logistic model | It is impossible for the population to exceed 10 billion | Carrying capacity for humans is fixed by land area alone | Published estimates range from under 1 billion to over 100 billion because they depend on consumption and technology, as Cohen showed.
SA3#ecology-u02-14-q5@2,3: Evaluate the view that rapid population growth is the main cause of environmental damage. | Population matters, because more people need more food, energy and land, and growth is fastest in some regions with fragile ecosystems. But IPAT shows impact also depends on affluence and technology; per capita emissions and resource use in high-income countries are many times those in low-income countries, so most global emissions come from slow-growing, high-consumption populations. Technology can lower impact per unit consumption. The growth rate is falling and numbers are projected to peak this century, while consumption is still rising. So population is one factor, interacting with consumption and technology, rather than the main cause. | Population increases demand ; Uses IPAT ; Per capita consumption differences ; Role of technology ; Falling growth rate or projections ; Judgement

## The demographic transition
LV: Introductory · Application
S: The demographic transition model describes how populations move from high birth and death rates to low ones as societies develop. This lesson sets out its stages, the reasons for each change and the model's limitations.
O: Describe the stages of the demographic transition model
O: Explain the causes of falling death rates and falling birth rates
O: Evaluate the demographic transition model as a description of real countries
PRE: Human population growth
H: The stages
- **Stage 1**: high birth and death rates, fluctuating; little population growth. Most of human history.
- **Stage 2**: death rates fall rapidly (food, sanitation, medicine) while birth rates stay high; rapid growth.
- **Stage 3**: birth rates fall (education, contraception, urbanisation, lower child mortality); growth slows.
- **Stage 4**: low birth and death rates; little growth. The UK reached this in the 20th century.
- **Stage 5** (added later): birth rates fall below death rates; the population ages and declines without immigration, as in Japan and Italy.
K: The demographic transition is a fall first in death rates and then, after a lag, in birth rates; the lag produces a period of rapid growth.
H: Why the rates fall
P: Death rates fall with reliable food supplies, clean water, sewerage, vaccination and antibiotics; the largest early effect is the fall in infant and child mortality. Birth rates fall later because as more children survive, families need fewer births to reach their desired family size; education, especially of girls, and paid work for women raise the cost of time spent on child-rearing; contraception becomes available; and in cities children cost more and contribute less labour.
X: England and Wales.
> Before about 1750: high birth and death rates (Stage 1).
> From the late 18th century: death rates fell with better food and later sanitation; birth rates stayed high, so population grew rapidly (Stage 2).
> From about the 1870s: birth rates fell, helped by compulsory schooling, which made children costlier (Stage 3).
> By the mid-20th century: low birth and death rates (Stage 4).
H: Limitations
P: The model was based on the experience of European countries and may not predict others. Many countries passed through the stages much faster, because medicine was imported rather than developed slowly, and death rates fell faster than they did in Europe. Some fertility declines have stalled. Migration, which the model ignores, now drives population change in many high-income countries. The model describes change but doesn't by itself explain why fertility falls at a given time in a given culture.
!: Treating the model as a law every country must follow at the same pace. It is a generalisation from history; timing and paths vary.
EV: established | Most countries have experienced falling death rates followed by falling birth rates, the core of the demographic transition.
EV: contested | Which factors, such as education, economic change, contraception or cultural diffusion, are most important in causing fertility decline is debated by demographers.
T: Demographic transition | The shift from high to low birth and death rates as a society develops
T: Natural increase | Births minus deaths, excluding migration
T: Crude birth rate | The number of births per 1000 people per year
SUM: The model has four or five stages, from high birth and death rates to low ones, with rapid growth while death rates fall first.
SUM: Death rates fall with food, water and medicine; birth rates later with education, contraception and urbanisation; the model is a generalisation, not a law.
SRC: Office for National Statistics, Population estimates for the UK, England, Wales, Scotland and Northern Ireland: mid-2023 | data | 2024 | https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates
SRC: Notestein F. W., "Population: the long view", in Schultz T. W. (ed.), Food for the World, University of Chicago Press | primary | 1945
SRC: Clark M. A., Douglas M. and Choi J., Biology 2e, OpenStax, section 45.5 "Human population growth" | secondary | 2018 | https://openstax.org/books/biology-2e/pages/45-5-human-population-growth
Q: In which stage of the demographic transition is population growth fastest? | Stage 2: death rates fall while birth rates remain high.
Q: Give three reasons why birth rates fall during the transition. | Lower child mortality, education of girls and women, access to contraception, urbanisation (any three).
M1#ecology-u02-15-q1@1: Which stage of the demographic transition has low birth and death rates and little growth? | Stage 4 | Stage 1 | Stage 2 | Stage 3 | Stage 4 has low, roughly balanced rates; Stage 1 also has little growth, but with high rates.
SEQ2#ecology-u02-15-q2@1: Put these events in the order they occur in the demographic transition. | High birth and death rates ; Death rates fall rapidly ; Birth rates begin to fall ; Low birth and death rates ; Birth rate falls below death rate | Death rates fall before birth rates; a fifth stage of decline was added later.
M2#ecology-u02-15-q3@2: A country's death rate has fallen from 30 to 10 per 1000 in 30 years while its birth rate remains at 40 per 1000. Which stage is it in, and what is its natural increase? | Stage 2; about 3% a year | Stage 4; about 0.3% a year | Stage 1; no growth | Stage 5; declining | Natural increase = (40 − 10) per 1000 = 30 per 1000 = 3% a year, typical of Stage 2.
M3#ecology-u02-15-q4@3: Which is the strongest criticism of the demographic transition model? | It generalises from European history and ignores migration and different speeds of change elsewhere | It predicts that death rates rise during development | It has no stages | It applies only to wildlife populations | The model is descriptive and Eurocentric; many countries transitioned faster, some stalled, and migration is excluded.
SA2#ecology-u02-15-q5@2,3: Explain why the death rate falls before the birth rate in the demographic transition. | Death rates can fall quickly when food, clean water, sanitation, vaccines and medicines become available, which mainly reduce child mortality; these benefit everyone and need no change in personal choices. Birth rates depend on family decisions and social norms, which change more slowly: once parents see that most children survive, and as education, women's employment, contraception and urban living change the costs and benefits of children, desired family size falls. This lag between the two produces rapid growth. | Causes of falling death rate ; Death rate change doesn't depend on personal choices ; Causes of falling birth rate ; Norms change slowly, producing a lag ; Consequence: rapid growth

## Small populations and extinction risk
LV: Intermediate · Evaluation
S: Small populations face extra risks that can drive them to extinction even when the original cause of decline has stopped. This lesson explains demographic and environmental stochasticity, genetic drift and inbreeding, the Allee effect and the extinction vortex.
O: Describe the demographic, environmental and genetic risks faced by small populations
O: Explain how these risks interact in an extinction vortex
O: Evaluate the small-population and declining-population paradigms in conservation
PRE: Births, deaths, immigration and emigration
H: Why small is dangerous
- **Demographic stochasticity**: chance variation in individual births, deaths and sex ratio. In a population of five, all offspring in one year might be male by chance.
- **Environmental stochasticity**: year-to-year variation in conditions (a cold spring, a drought) that affects everyone. Small populations have no buffer.
- **Catastrophes**: rare extreme events, such as a fire, storm or disease outbreak, that can wipe out a whole population in one place.
- **Genetic drift**: random change in allele frequencies, strongest in small populations. It reduces genetic diversity, leaving less variation for adaptation.
- **Inbreeding depression**: mating between relatives increases homozygosity for harmful recessive alleles, reducing survival and fertility.
- **Allee effects**: per capita growth falls at low density, for example because individuals can't find mates or cooperative defence fails (Allee, 1931).
E: H_{t} = H_{0}(1 − 1 ÷ 2N_{e})^{t} :: heterozygosity is lost each generation at a rate of 1/(2Ne), where Ne is the effective population size
K: Small populations are vulnerable to chance in births and deaths, environmental variation, catastrophes, loss of genetic diversity, inbreeding and Allee effects, which can combine into a self-reinforcing decline.
H: The extinction vortex
P: Gilpin and Soulé (1986) described an **extinction vortex**: a population that becomes small suffers inbreeding and demographic chance, which lower survival and reproduction, making it smaller still and intensifying the problems, until it spirals to extinction.
X: The Florida panther.
> By the early 1990s about 20–30 panthers remained in southern Florida, isolated from other pumas.
> They showed signs of inbreeding depression: kinked tails, heart defects and very low sperm quality.
> In 1995 eight female pumas from Texas were released (genetic rescue).
> Heterozygosity and survival rose, and numbers increased to over 100 by the late 2000s (Johnson et al., 2010).
H: Effective population size
P: The **effective population size** (N_e) is the size of an idealised population that would lose genetic diversity at the same rate as the real one. It is usually much smaller than the census count, because not all individuals breed, sex ratios are unequal and numbers fluctuate. The "50/500 rule" (Franklin, 1980) suggested N_e ≥ 50 to avoid short-term inbreeding depression and ≥ 500 to retain adaptive potential; Frankham and colleagues (2014) argued these should be raised to at least 100 and 1000.
!: Focusing only on genetics. Caughley (1994) stressed that most populations become small because of a deterministic cause, such as habitat loss or hunting, which must be identified and removed; the risks of smallness come on top of that.
EV: established | Inbreeding depression is widespread in small wild populations, and genetic rescue by introducing unrelated individuals has reversed it in cases such as the Florida panther.
EV: contested | The specific thresholds for effective population size in the 50/500 rule, and whether they should be raised, are debated.
T: Demographic stochasticity | Chance variation in births, deaths and sex ratio among individuals, important in small populations
T: Inbreeding depression | Reduced survival and fertility caused by mating between relatives
T: Allee effect | A decline in per capita growth rate at low population density
T: Effective population size | The size of an idealised population that would lose genetic diversity at the same rate as the real population
SUM: Small populations face chance in demography and environment, catastrophes, genetic drift, inbreeding and Allee effects.
SUM: These interact in an extinction vortex; genetic rescue can help, but the original cause of decline must also be removed.
SRC: Gilpin M. E. and Soulé M. E., "Minimum viable populations: processes of species extinction", in Soulé M. E. (ed.), Conservation Biology: The Science of Scarcity and Diversity, Sinauer | primary | 1986
SRC: Johnson W. E. et al., "Genetic restoration of the Florida panther", Science 329(5999):1641–1645 | primary | 2010 | https://doi.org/10.1126/science.1192891
SRC: Frankham R., Bradshaw C. J. A. and Brook B. W., "Genetics in conservation management: revised recommendations for the 50/500 rules, Red List criteria and population viability analyses", Biological Conservation 170:56–63 | primary | 2014 | https://doi.org/10.1016/j.biocon.2013.12.036
SRC: Caughley G., "Directions in conservation biology", Journal of Animal Ecology 63(2):215–244 | primary | 1994 | https://doi.org/10.2307/5542
Q: What is an extinction vortex? | A self-reinforcing spiral in which a small population's inbreeding and chance events reduce it further, until it goes extinct.
Q: Why is effective population size usually smaller than the census size? | Not all individuals breed, sex ratios are unequal and numbers fluctuate.
M1#ecology-u02-16-q1@1: What is the Allee effect? | A fall in per capita growth rate at low density | An increase in growth rate as density falls | Loss of genetic diversity in large populations | The spread of a species into new habitat | At low density, problems such as finding mates reduce per capita growth, so very small populations decline further.
NUM2#ecology-u02-16-q2@2: A population has Ne = 25. What fraction of its heterozygosity is lost each generation? Give a decimal. | 0.02 | 0 | per generation | The loss per generation is 1/(2Ne) = 1/50 = 0.02, or 2%.
M2#ecology-u02-16-q3@2: A population of 20 islands foxes shows high rates of heart defects and low litter sizes. What is the most likely genetic cause? | Inbreeding depression from mating between relatives | Hybrid vigour | Too much genetic diversity | Environmental stochasticity | High homozygosity for harmful recessive alleles in a small, inbred population lowers fitness.
M3#ecology-u02-16-q4@3: Which response to Caughley's (1994) critique is best? | Managers must identify and remove the cause of decline, while also managing small-population risks | Genetic factors never matter in small populations | Only genetics determines extinction risk | Small populations can't be helped by any management | Caughley argued that the declining-population paradigm (finding the cause) and the small-population paradigm (managing risks of smallness) are both needed.
SA3#ecology-u02-16-q5@2,3: Using the Florida panther, explain how genetic rescue works and evaluate its use in conservation. | The isolated Florida panther population of about 20–30 suffered inbreeding depression: kinked tails, heart defects and poor sperm. Introducing eight female Texas pumas in 1995 brought new alleles, raising heterozygosity and masking harmful recessive alleles, so survival and reproduction improved and numbers rose to over 100. Advantages: rapid, measurable fitness benefits. Risks: outbreeding depression if source populations are very different, disease transfer, loss of local adaptations, and it doesn't fix habitat loss or road deaths, which still threaten panthers. It works best combined with habitat protection. | Describes inbreeding depression in panthers ; Mechanism of genetic rescue ; Outcome ; A risk or limitation ; Need to address cause of decline

## Harvesting and maximum sustainable yield
LV: Intermediate · Evaluation
S: Harvesting a population can be sustainable if the catch doesn't exceed the population's growth. This lesson derives maximum sustainable yield from the logistic model, explains why it is risky in practice and uses the collapse of the northern cod as a case study.
O: Explain the concept of maximum sustainable yield using the logistic model
O: Calculate maximum sustainable yield and the population size at which it occurs
O: Evaluate the use of maximum sustainable yield in fisheries management
PRE: Logistic growth and carrying capacity
H: Surplus yield
P: In the logistic model, the population's growth rate dN/dt is the **surplus**: the number that could be removed each year without changing N. Harvesting exactly that surplus keeps the population steady. The surplus is largest at N = K/2, so the **maximum sustainable yield** (MSY) is:
E: MSY = rK ÷ 4, taken when N = K ÷ 2 :: the population is held at half its carrying capacity
X: A fish stock with r = 0.6 per year and K = 100 000 tonnes.
> MSY = 0.6 × 100 000 ÷ 4 = 15 000 tonnes a year.
> This is sustained only if the stock is held at 50 000 tonnes.
> If the catch is set at 15 000 tonnes while the stock is below 50 000, growth is less than the catch and the stock declines, which reduces growth further.
K: MSY is the largest catch a population can sustain in theory, taken at half the carrying capacity; harvesting more than the surplus drives decline.
H: Why MSY is risky
- **Uncertainty**: r and K are hard to estimate, and stock size is measured with large error. An overestimate of MSY leads to overfishing.
- **Variable environments**: recruitment varies from year to year; a fixed quota taken in a bad year can push the stock into decline.
- **Instability below K/2**: with a fixed quota, a stock below K/2 is pushed further down, a positive feedback towards collapse.
- **Ecosystem effects**: removing half the biomass of a species affects its prey, predators and competitors, which single-species MSY ignores.
- **Age structure**: heavy fishing removes the large, old, most fecund fish.
P: Larkin (1977) wrote an "epitaph for the concept of maximum sustained yield". Modern management usually aims for a fishing pressure below that giving MSY, with precautionary reference points, and increasingly takes an ecosystem-based approach. The UK Fisheries Act 2020 sets objectives including sustainability and harvesting at or below MSY levels.
H: The northern cod collapse
X: Newfoundland and Labrador, 1960s–1992.
> Catches rose sharply in the 1960s with industrial trawlers, peaking at over 800 000 tonnes in 1968.
> Quotas set in the 1980s were based on overestimates of stock size, partly because catch rates stayed high as fish aggregated even while the stock fell.
> By 1992 spawning biomass had collapsed to a tiny fraction of historical levels, and Canada closed the fishery; about 30 000–40 000 people lost their jobs.
> Recovery has been very slow, decades later, possibly because the ecosystem shifted and fewer large fish remained.
!: Assuming that a fishery with stable catches is sustainable. Catches can stay high as fish become concentrated and easier to find (hyperstability), even while the stock collapses.
EV: established | The northern cod fishery off Newfoundland collapsed in the early 1990s after sustained overfishing, and a moratorium was imposed in 1992.
EV: established | The FAO estimated that about 37.7% of assessed marine fish stocks were overfished in 2021.
EV: contested | Whether MSY should remain a target or only an upper limit on fishing pressure, and how to set it in multispecies fisheries, is debated.
T: Maximum sustainable yield | The largest yield that can be taken from a population indefinitely, rK/4 in the logistic model, at N = K/2
T: Overfishing | Harvesting at a rate greater than a stock can replace through growth
T: Hyperstability | Catch rates staying high while stock abundance declines, because fish aggregate
SUM: In the logistic model the sustainable yield is greatest, rK/4, at N = K/2.
SUM: Uncertainty, variability, instability and ecosystem effects make MSY risky; the northern cod collapse shows the cost of overestimating it.
SRC: Larkin P. A., "An epitaph for the concept of maximum sustained yield", Transactions of the American Fisheries Society 106(1):1–11 | primary | 1977
SRC: FAO, The State of World Fisheries and Aquaculture 2024: Blue Transformation in Action, Food and Agriculture Organization of the United Nations | data | 2024
SRC: Myers R. A., Hutchings J. A. and Barrowman N. J., "Why do fish stocks collapse? The example of cod in Atlantic Canada", Ecological Applications 7(1):91–106 | primary | 1997
SRC: Fisheries Act 2020, UK Public General Acts c. 22, section 1 (the fisheries objectives) | legislation | 2020 | https://www.legislation.gov.uk/ukpga/2020/22/section/1
Q: At what population size is maximum sustainable yield obtained in the logistic model? | At half the carrying capacity, N = K/2.
Q: What is hyperstability in fisheries? | Catch rates stay high while the stock falls, because fish aggregate and remain easy to catch.
M1#ecology-u02-17-q1@1: In the logistic model, maximum sustainable yield equals | rK/4 | rK | K/2 | r/K | The growth rate rN(1 − N/K) is greatest at N = K/2, giving rK/4.
NUM2#ecology-u02-17-q2@2: A population has r = 0.8 per year and K = 5000. What is its maximum sustainable yield per year? | 1000 | 0 | per year | MSY = rK ÷ 4 = 0.8 × 5000 ÷ 4 = 1000.
M2#ecology-u02-17-q3@2: A fixed annual quota equal to MSY is set, but the stock is currently below K/2. What will happen? | The stock will decline, because its growth is less than the catch | The stock will grow to K | The stock will stay exactly constant | The stock will increase to K/2 and stop | Below K/2 the surplus is smaller than MSY, so taking MSY exceeds growth and drives the stock down.
MS3#ecology-u02-17-q4@3: Which factors contributed to the collapse of the northern cod? Choose all that apply. | Overestimates of stock size ; Catch rates that stayed high as fish aggregated ; Large-scale industrial fishing | Too little fishing effort ; Quotas set well below the sustainable yield | Overestimated stocks, hyperstable catch rates and intensive fishing drove the stock down; effort and quotas were too high, not too low.
M3#ecology-u02-17-q5@3: Why do many fisheries scientists now treat MSY as an upper limit rather than a target? | Uncertainty and variability mean that aiming exactly at MSY often overshoots and depletes the stock | MSY is always zero in real fisheries | Fishing below MSY is always uneconomic | MSY applies only to freshwater fish | With uncertain estimates and variable recruitment, aiming below MSY gives a buffer against overfishing at little cost in long-term yield.
SA3#ecology-u02-17-q6@2,3: Explain the theory of maximum sustainable yield and evaluate its use in managing fisheries, with reference to the northern cod. | In the logistic model growth (the harvestable surplus) is greatest at N = K/2, giving MSY = rK/4. Harvesting that amount should keep the stock stable. In practice, r, K and stock size are uncertain; recruitment varies; a fixed quota destabilises a stock below K/2; single-species MSY ignores ecosystem effects and age structure. The northern cod collapse illustrates this: overestimated stocks and hyperstable catch rates led to quotas above the real surplus, and the stock collapsed in 1992 with slow recovery. MSY remains useful as a reference point, but management now sets fishing below it, uses precautionary limits and ecosystem approaches. | Derivation or statement of MSY at K/2 ; A practical problem ; Another practical problem ; Northern cod example used ; Modern precautionary approach ; Judgement

## Population viability analysis
LV: Advanced · Evaluation
S: Population viability analysis (PVA) uses models to estimate the probability that a population will persist for a given time. This lesson explains how PVAs are built, what they are used for, including IUCN criterion E, and how far their predictions can be trusted.
O: Describe the inputs and outputs of a population viability analysis
O: Explain how PVA is used to compare management options and in IUCN Red List assessments
O: Evaluate the reliability and limitations of PVA predictions
PRE: Small populations and extinction risk
H: What a PVA does
P: A **population viability analysis** is a computer model that projects a population into the future many times, each run including chance events, and reports the proportion of runs that go extinct or fall below a threshold within a given period (Boyce, 1992).
- **Inputs**: current population size and age structure; birth and survival rates by age; their year-to-year variation; carrying capacity; frequency of catastrophes; sometimes inbreeding effects and dispersal between subpopulations.
- **Outputs**: probability of extinction within, say, 50 or 100 years; expected time to extinction; expected population size; sensitivity of these to each input.
K: A PVA turns demographic data and their variability into a probability of persistence, and shows which vital rates matter most.
H: Uses
- **Comparing management options**: would protecting nests or reducing adult road deaths do more to cut extinction risk?
- **Sensitivity analysis**: which vital rate has the greatest effect on growth? For long-lived species it is usually adult survival.
- **Minimum viable population**: the smallest population with an acceptable chance of persisting, such as 95% over 100 years.
- **Red List assessment**: IUCN criterion E classifies a species from a quantitative analysis showing a probability of extinction in the wild of at least 50% within 10 years or three generations (Critically Endangered), at least 20% within 20 years or five generations (Endangered), or at least 10% within 100 years (Vulnerable).
X: Loggerhead turtles (Crouse, Crowder and Caswell, 1987).
> Managers focused on protecting eggs on nesting beaches.
> A stage-based model showed that population growth was most sensitive to survival of large juveniles and adults at sea.
> Many were drowning in shrimp trawls; the analysis supported requiring turtle excluder devices on nets in the USA.
H: How reliable are PVAs?
P: Brook and colleagues (2000) tested PVA predictions retrospectively against 21 long-term datasets and found them surprisingly accurate on average, with no significant bias. But PVAs depend on good data; for rare species data are often few, variances are hard to estimate, and errors compound over long projections. Results are best treated as **relative** (option A carries less risk than option B) rather than as precise absolute probabilities.
!: Reporting a single extinction probability, such as "a 12% chance of extinction in 100 years", as if it were exact. It depends on assumptions and data quality, and should come with sensitivity analyses.
EV: established | Sensitivity analyses of stage-based models showed that loggerhead turtle population growth depends most on survival of large juveniles and adults.
EV: contested | How much confidence to place in absolute extinction probabilities from PVA, especially for data-poor species, is debated; many recommend using them for relative comparisons.
T: Population viability analysis | A modelling method that estimates the probability of a population persisting for a given time
T: Sensitivity analysis | Testing how much a model's output changes when each input is changed
T: Minimum viable population | The smallest population size with a specified probability of persisting for a specified time
SUM: PVA projects populations many times with chance events to estimate extinction risk and identify the most important vital rates.
SUM: It guides management and IUCN criterion E; its outputs are most reliable as relative comparisons, given data limits.
SRC: Boyce M. S., "Population viability analysis", Annual Review of Ecology and Systematics 23:481–506 | primary | 1992 | https://doi.org/10.1146/annurev.es.23.110192.002405
SRC: Brook B. W. et al., "Predictive accuracy of population viability analysis in conservation biology", Nature 404:385–387 | primary | 2000 | https://doi.org/10.1038/35006050
SRC: IUCN, IUCN Red List Categories and Criteria, version 3.1, second edition | standard | 2012 | https://www.iucnredlist.org/resources/categories-and-criteria
SRC: Crouse D. T., Crowder L. B. and Caswell H., "A stage-based population model for loggerhead sea turtles and implications for conservation", Ecology 68(5):1412–1423 | primary | 1987 | https://doi.org/10.2307/1939225
Q: What does a population viability analysis estimate? | The probability that a population will persist (or go extinct) over a given time, given its demography and chance events.
Q: What is IUCN criterion E for Critically Endangered? | A quantitative analysis showing at least a 50% probability of extinction in the wild within 10 years or three generations (whichever is longer, up to 100 years).
M1#ecology-u02-18-q1@1: Why does a PVA run the same model many times? | Each run includes random events, so repeating it gives the probability of different outcomes | To check for typing errors | Because each run uses different species | To make the population grow faster | Stochastic models give different results each run; the proportion of runs going extinct estimates extinction probability.
M2#ecology-u02-18-q2@2: A PVA shows that a 5% rise in adult survival raises population growth far more than a 5% rise in egg survival. What should managers prioritise? | Measures that reduce adult mortality | Measures that increase egg survival only | Neither, because PVAs can't guide management | Releasing more eggs into the wild | Sensitivity analysis identifies the vital rate with the greatest effect; here, adult survival.
TF2#ecology-u02-18-q3@2: Under IUCN criterion E, a species with a 15% probability of extinction within 100 years qualifies as Vulnerable. | true | Vulnerable under criterion E requires at least a 10% probability of extinction within 100 years.
M3#ecology-u02-18-q4@3: Which is the best way to use the output of a PVA for a data-poor species? | Compare the relative risk of management options, with sensitivity analysis, rather than rely on one exact probability | Report the extinction probability to two decimal places as a fact | Ignore it, because models are always wrong | Use it only if it predicts extinction | With uncertain inputs, absolute probabilities are unreliable, but rankings of options are more robust.
SA3#ecology-u02-18-q5@2,3: Evaluate the usefulness of population viability analysis for conservation, using an example. | PVA turns demographic data and variability into probabilities of persistence and, through sensitivity analysis, identifies which vital rates matter most. In loggerhead turtles, it showed that adult and large-juvenile survival mattered more than eggs, redirecting effort to turtle excluder devices on trawls. It provides a quantitative basis for Red List criterion E and minimum viable populations. Brook et al. (2000) found PVAs reasonably accurate on average. Limitations: they need long-term data that rare species lack; variances and catastrophes are hard to estimate; errors compound over long projections; results depend on model structure. Best used for comparing options rather than precise forecasts. | Explains what PVA does ; Example and how it changed management ; Evidence of accuracy ; At least one limitation ; Judgement on relative versus absolute use
`;
