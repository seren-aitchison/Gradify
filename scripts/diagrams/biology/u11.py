"""Biology unit 11, Ecology: diagram specs. Run: python3 scripts/diagrams/biology/u11.py"""
from spec import mk

chain = lambda prefix, n: [{"from": f"{prefix}{i}", "to": f"{prefix}{i + 1}"} for i in range(n - 1)]

# ---------------------------------------------------------------- pyramids
mk("u11-08", "bio-energy-pyramid", "pyramid", "A pyramid of energy",
   "Energy is lost at every step of a food chain as heat from respiration, uneaten parts, faeces and excretion, so typically only about 10% passes to the next trophic level. A pyramid of energy is therefore always upright, and food chains rarely have more than four or five links. The figures are illustrative.",
   "A four-level pyramid on a log scale: producers 10,000, primary consumers 1,000, secondary consumers 100 and tertiary consumers 10 kilojoules per square metre per year, each level a tenth of the one below.",
   ["Producers capture 10,000 kJ per m² per year (illustrative).", "Primary consumers receive about 10% of that: 1,000.", "Secondary consumers: 100. Tertiary consumers: 10.",
    "At every step about 90% is lost as heat, in faeces or excretion, or left uneaten.", "Energy is never recycled: it leaves the ecosystem as heat."],
   kind="energy", qUnit="kJ m⁻² year⁻¹", scale="log",
   levels=[{"label": "producers", "value": 10000}, {"label": "primary consumers", "value": 1000}, {"label": "secondary consumers", "value": 100}, {"label": "tertiary consumers", "value": 10}],
   claims=[{"type": "efficiency", "from": 0, "to": 1, "value": 10, "tol": 0.5}, {"type": "efficiency", "from": 1, "to": 2, "value": 10, "tol": 0.5}, {"type": "efficiency", "from": 2, "to": 3, "value": 10, "tol": 0.5}])
mk("u11-09", "bio-pyramid-numbers", "pyramid", "A pyramid of numbers can be inverted",
   "A pyramid of numbers counts organisms at each level, not their size or energy. One oak tree supports hundreds of caterpillars, so the second level is wider than the first, and the pyramid is inverted. A pyramid of energy is never inverted. The numbers are illustrative.",
   "A four-level pyramid of numbers on a log scale: one oak tree, 500 caterpillars, 5 blue tits and 1 sparrowhawk, with the caterpillar level wider than the oak level.",
   ["One oak tree (the producer).", "About 500 caterpillars (primary consumers) feed on it: more organisms than at the level below, so the pyramid is inverted here.", "5 blue tits (secondary consumers).", "1 sparrowhawk (tertiary consumer).",
    "A pyramid of numbers ignores the size of the organisms, which is why it can be inverted."],
   kind="numbers", qUnit="individuals", scale="log",
   levels=[{"label": "oak tree", "value": 1}, {"label": "caterpillars", "value": 500}, {"label": "blue tits", "value": 5}, {"label": "sparrowhawk", "value": 1}],
   claims=[{"type": "inverted", "level": 1}])

# ---------------------------------------------------------------- cycles
CN = [{"id": "atmosphere", "label": "CO₂ in the atmosphere", "tone": "a3"}, {"id": "producers", "label": "producers", "tone": "good"}, {"id": "consumers", "label": "consumers", "tone": "a1"},
      {"id": "decomposers", "label": "decomposers", "tone": "a5"}, {"id": "fossil fuels", "label": "fossil fuels", "tone": "a2"}]
mk("u11-12", "bio-carbon-cycle", "biocycle", "The carbon cycle",
   "Producers take CO₂ from the atmosphere by photosynthesis and pass carbon to consumers by feeding. Respiration by every organism, including decomposers, returns it, and dead matter feeds the decomposers. Combustion of fossil fuels returns carbon that was locked away for millions of years, adding CO₂ faster than it is removed.",
   "A ring of five carbon stores: atmosphere, producers, consumers, decomposers and fossil fuels, joined by arrows for photosynthesis, feeding, respiration, death, fossilisation and combustion.",
   ["Photosynthesis moves carbon from the atmosphere into producers.", "Feeding passes it from producers to consumers.", "Respiration by producers, consumers and decomposers returns it to the atmosphere.",
    "Death passes carbon in dead matter to decomposers.", "Fossilisation locks carbon into fossil fuels; combustion releases it again."],
   cycle="carbon", nodes=CN,
   edges=[{"from": "atmosphere", "to": "producers", "process": "photosynthesis", "colour": "good", "at": 0.4}, {"from": "producers", "to": "consumers", "process": "feeding", "colour": "a1"},
          {"from": "consumers", "to": "atmosphere", "process": "respiration", "colour": "a3", "at": 0.65}, {"from": "producers", "to": "decomposers", "process": "death", "colour": "a5", "at": 0.3},
          {"from": "decomposers", "to": "atmosphere", "process": "respiration", "colour": "a3", "at": 0.3}, {"from": "fossil fuels", "to": "atmosphere", "process": "combustion", "colour": "a2"},
          {"from": "consumers", "to": "fossil fuels", "process": "fossilisation", "colour": "a2", "at": 0.72}, {"from": "consumers", "to": "decomposers", "process": "death", "colour": "a5"},
          {"from": "producers", "to": "atmosphere", "process": "respiration", "colour": "a3", "at": 0.62}])
NN = [{"id": "atmosphere", "label": "N₂ in the atmosphere", "tone": "a3"}, {"id": "ammonium", "label": "ammonium", "tone": "a1"}, {"id": "nitrate", "label": "nitrate", "tone": "a4"},
      {"id": "plants", "label": "plants", "tone": "good"}, {"id": "animals", "label": "animals", "tone": "a5"}, {"id": "dead matter", "label": "dead matter", "tone": "a2"}]
mk("u11-13", "bio-nitrogen-cycle", "biocycle", "The nitrogen cycle",
   "Most organisms cannot use N₂ because its triple bond is so strong. Nitrogen-fixing bacteria turn it into ammonium; nitrifying bacteria turn ammonium into nitrate (by way of nitrite); plants assimilate nitrate into protein and DNA; decomposers return nitrogen from dead matter as ammonium; and denitrifying bacteria turn nitrate back into N₂ in waterlogged soil.",
   "A ring of six nitrogen stores: atmospheric nitrogen, ammonium, nitrate, plants, animals and dead matter, joined by arrows for nitrogen fixation, nitrification, assimilation, feeding, death and excretion, ammonification and denitrification.",
   ["Nitrogen fixation: bacteria (Rhizobium, Azotobacter) or lightning turn N₂ into ammonia, which forms ammonium.", "Nitrification: Nitrosomonas turns ammonium into nitrite and Nitrobacter turns nitrite into nitrate.",
    "Assimilation: plants absorb nitrate to make proteins and DNA; animals get nitrogen by feeding.", "Death and excretion pass nitrogen to dead matter; ammonification by decomposers turns it back into ammonium.",
    "Denitrification: anaerobic bacteria turn nitrate back into N₂."],
   cycle="nitrogen", nodes=NN,
   edges=[{"from": "atmosphere", "to": "ammonium", "process": "nitrogen fixation", "colour": "a3"}, {"from": "ammonium", "to": "nitrate", "process": "nitrification", "colour": "a1"},
          {"from": "nitrate", "to": "plants", "process": "assimilation", "colour": "good"}, {"from": "plants", "to": "animals", "process": "feeding", "colour": "a5"},
          {"from": "animals", "to": "dead matter", "process": "death and excretion", "colour": "a2"}, {"from": "dead matter", "to": "ammonium", "process": "ammonification", "colour": "a4"},
          {"from": "nitrate", "to": "atmosphere", "process": "denitrification", "colour": "a3", "at": 0.3}, {"from": "plants", "to": "dead matter", "process": "death and excretion", "colour": "a2"}])

# ---------------------------------------------------------------- population growth
LOGI, EXPG = "1000/(1+99*exp(-0.5*x))", "10*exp(0.5*x)"
mk("u11-15", "bio-logistic-growth", "graph", "Exponential and logistic growth",
   "With unlimited resources a population grows exponentially, a J-shaped curve. In a real environment growth slows as the population nears the carrying capacity K, giving an S-shaped logistic curve. Growth is fastest when the population is K/2.",
   "Two curves of population size against time: a J-shaped exponential curve that climbs off the top of the graph, and an S-shaped logistic curve that rises fastest at half the carrying capacity of 1,000 and levels off at 1,000.",
   ["Exponential growth (unlimited resources): a J-shaped curve that keeps accelerating.", "Logistic growth: slows as resources run short and levels off at the carrying capacity K = 1,000.",
    "The logistic curve rises fastest when the population is K/2 = 500, at about 9 time units.", "Carrying capacity is the maximum population the environment can support."],
   range={"x": [0, 30], "y": [0, 1150]}, ticks=[[5, 10, 15, 20, 25, 30], [250, 500, 750, 1000]], height=[340, 320], xLabelBelow=True,
   axisLabels=["time", "population size"],
   curves=[{"expr": EXPG, "colour": "a3", "dash": "6 5"}, {"expr": LOGI, "colour": "a1"}],
   marks=[{"y": 1000, "label": "carrying capacity, K"}],
   legend=[["exponential", "a3", "6 5"], ["logistic", "a1"]], legendData=[14, 330],
   checks=[{"type": "point", "expr": LOGI, "x": 9.1902, "y": 500, "name": "the logistic curve passes through K/2 = 500 at about 9 time units"},
           {"type": "slope", "expr": LOGI, "x": 9.1902, "value": 125, "name": "growth is fastest there: rK/4 = 125 individuals per time unit"},
           {"type": "value", "expr": LOGI, "x": 30, "between": [990, 1000], "name": "the logistic curve levels off at the carrying capacity, 1,000"},
           {"type": "point", "expr": EXPG, "x": 4, "y": 73.89056, "name": "exponential growth: N = 10 e^(0.5t), 73.9 at t = 4"},
           {"type": "order", "a": EXPG, "b": LOGI, "x": 14, "rel": ">", "name": "after the early stage, the exponential curve is far above the limited, logistic one"}])

# ---------------------------------------------------------------- succession
SU = [("bare rock or sand", "no soil", "a2"), ("pioneer species", "lichens and mosses colonise and begin to form soil", "a1"), ("grasses and small plants", "soil deepens and holds more water and nutrients", "a4"),
      ("shrubs", "more shade and soil: more species arrive", "a5"), ("climax community", "stable woodland in the UK", "a3")]
mk("u11-20", "bio-succession", "flow", "Primary succession",
   "On bare ground pioneer species such as lichens and mosses colonise first and begin forming soil. Each stage changes conditions so that new species can establish: soil depth, nutrients and water retention increase, until a stable climax community, often woodland in the UK, forms. Grazing or burning can hold it back (deflected succession).",
   "Five boxes in order: bare rock or sand, pioneer species, grasses and small plants, shrubs, and the climax community.",
   [f"{a[0].upper() + a[1:]}: {b}." for a, b, _ in SU],
   layout="grid", boxWidth=122, rowHeight=124, nodes=[{"id": f"s{i}", "label": a, "sub": b, "tone": t, "col": i % 3 if i < 3 else 4 - i, "row": i // 3} for i, (a, b, t) in enumerate(SU)], edges=chain("s", 5))
