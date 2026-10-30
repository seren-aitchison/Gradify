// EcoGradify's 3D model: an island ecosystem with a food web, the water cycle and the carbon
// cycle running on it. Rain falls, water evaporates, carbon flows between the air, the living
// things, the soil and the fossil fuels being burned. Notes cover ecology, cycles and climate.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  energy: { name: "Energy & producers", c: "#ffe066" },
  web: { name: "Food web", c: "#ff8f6b" },
  water: { name: "Water cycle", c: "#5ef0ff" },
  carbon: { name: "Carbon cycle", c: "#c79bff" },
};

const STRUCTURES = {
  sun: s("energy", "The Sun", "The source of energy for almost every ecosystem. Only about 1–2% of the sunlight reaching plants is fixed by photosynthesis.",
    ["Energy flows **one way** through an ecosystem and is lost as heat; nutrients cycle.", "Gross primary productivity (GPP) − respiration = net primary productivity (NPP), the energy available to consumers.", "Tropical rainforests and coral reefs have some of the highest NPP; deserts and open ocean the lowest per area."],
    [["Why does energy flow but nutrients cycle?", "Energy is lost as heat at every transfer and can't be reused; matter is recycled by decomposers."], ["What is net primary productivity?", "GPP minus the energy plants use in respiration: the energy available to the next trophic level."], ["Roughly what fraction of sunlight do plants fix?", "About 1–2%."]],
    ["sun", "sunlight", "energy flow", "productivity", "npp", "gpp"]),
  producers: s("energy", "Producers", "Plants, algae and phytoplankton that make glucose by photosynthesis: the first trophic level.",
    ["6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light, chlorophyll).", "Limiting factors: light intensity, CO₂ concentration, temperature (and water, nutrients).", "Phytoplankton produce about half of the oxygen on Earth."],
    [["What is the word equation for photosynthesis?", "Carbon dioxide + water → glucose + oxygen (using light energy)."], ["Name three limiting factors of photosynthesis.", "Light intensity, carbon dioxide concentration and temperature."], ["Which producers make about half of Earth's oxygen?", "Marine phytoplankton."]],
    ["producer", "photosynthesis", "plant", "autotroph", "phytoplankton", "chlorophyll"]),
  herbivores: s("web", "Primary consumers", "Herbivores (rabbits, deer) that eat producers: the second trophic level.",
    ["Only about **10%** of the energy at one trophic level passes to the next (the rest is lost in respiration, heat, waste and uneaten parts).", "Herbivores digest cellulose with the help of gut microbes.", "Grazing pressure shapes plant communities: removing herbivores can let woody plants take over."],
    [["About what percentage of energy passes from one trophic level to the next?", "About 10%."], ["Where is the rest of the energy lost?", "Respiration (heat), movement, excretion and egestion, and parts not eaten."], ["What trophic level are herbivores?", "The second (primary consumers)."]],
    ["herbivore", "primary consumer", "trophic", "grazing", "energy transfer"]),
  predators: s("web", "Predators", "Secondary and tertiary consumers (foxes, hawks) that eat other animals. Few in number because so little energy reaches them.",
    ["Predator–prey populations cycle, the predator peak lagging behind the prey's (lynx and snowshoe hare).", "**Keystone species** have effects far beyond their numbers: wolves in Yellowstone triggered a trophic cascade.", "Biomagnification: persistent toxins (DDT, mercury) concentrate up the food chain."],
    [["Why are there few top predators?", "Energy is lost at each trophic level, so little is left to support them."], ["What happened when wolves returned to Yellowstone?", "A trophic cascade: elk behaviour changed, vegetation recovered, rivers changed course."], ["What is biomagnification?", "Increasing concentration of a persistent toxin at higher trophic levels."]],
    ["predator", "carnivore", "consumer", "keystone", "trophic cascade", "biomagnification", "food chain"]),
  decomposers: s("web", "Decomposers", "Bacteria and fungi that break down dead matter and waste, returning nutrients to the soil.",
    ["Decomposition is fastest when it's **warm, moist and oxygenated**.", "Nitrogen cycle: decomposers make ammonium; nitrifying bacteria make nitrates; denitrifying bacteria return N₂ to the air.", "Mycorrhizal fungi trade minerals for sugars with most plant roots."],
    [["What conditions speed up decomposition?", "Warmth, moisture and oxygen."], ["What do nitrifying bacteria do?", "Convert ammonium into nitrites and then nitrates."], ["What are mycorrhizae?", "Fungi that partner with plant roots, giving minerals and water in exchange for sugars."]],
    ["decomposer", "fungi", "bacteria", "decay", "nitrogen cycle", "detritus"]),
  clouds: s("water", "Clouds and precipitation", "Water vapour cools as it rises, condenses on tiny particles into clouds, and falls as rain, snow or hail.",
    ["The water cycle is powered by the Sun (evaporation) and gravity (precipitation, runoff).", "Relief rainfall: air forced over mountains cools and rains on the windward side, leaving a rain shadow.", "Climate change intensifies the cycle: warmer air holds about 7% more water per °C."],
    [["What powers the water cycle?", "Solar energy (evaporation) and gravity (precipitation and flow)."], ["What is a rain shadow?", "A dry area on the leeward side of mountains, after the air has lost its moisture on the windward side."], ["How much more water vapour can air hold per °C of warming?", "About 7%."]],
    ["cloud", "rain", "precipitation", "condensation", "water cycle"]),
  ocean: s("water", "Sea and evaporation", "The ocean holds 97% of Earth's water. Evaporation from it, and transpiration from plants, put water vapour into the air.",
    ["**Evapotranspiration** is evaporation plus transpiration from leaves.", "The ocean has absorbed over 90% of the extra heat from global warming.", "It also absorbs CO₂, which makes it more acidic (ocean acidification), harming corals and shellfish."],
    [["What share of Earth's water is in the oceans?", "About 97%."], ["What is evapotranspiration?", "The combined loss of water by evaporation from surfaces and transpiration from plants."], ["Why is the ocean becoming more acidic?", "It absorbs CO₂, which forms carbonic acid."]],
    ["ocean", "sea", "evaporation", "transpiration", "acidification"]),
  river: s("water", "Rivers and groundwater", "Water runs off the land in rivers and infiltrates into soil and rock (groundwater), returning to the sea.",
    ["Infiltration is reduced by urban surfaces and compacted soil, increasing flood risk.", "A drainage basin's water balance: precipitation = runoff + evapotranspiration ± change in storage.", "Wetlands and forests store water and slow its flow."],
    [["Why does urbanisation increase flood risk?", "Impermeable surfaces reduce infiltration, so more water runs off quickly into rivers."], ["What is the water balance equation?", "Precipitation = runoff + evapotranspiration ± change in storage."], ["How do forests reduce flooding?", "Interception, transpiration and better infiltration slow and reduce runoff."]],
    ["river", "runoff", "groundwater", "infiltration", "flood", "drainage basin"]),
  atmosphere: s("carbon", "Atmospheric CO₂", "Carbon dioxide in the air: about 420 ppm now, up from about 280 ppm before the industrial revolution.",
    ["CO₂ is a **greenhouse gas**: it absorbs and re-emits infrared radiation, warming the surface.", "The Keeling curve (Mauna Loa, since 1958) shows a rising trend with a yearly ripple from Northern Hemisphere plant growth.", "Methane is ~80 times stronger than CO₂ over 20 years, but shorter-lived."],
    [["What is the current CO₂ concentration, and what was it before industry?", "About 420 ppm now; about 280 ppm before."], ["Why does the Keeling curve have a yearly ripple?", "Northern Hemisphere plants take up CO₂ in summer and release it in winter."], ["How does CO₂ warm the Earth?", "It absorbs infrared radiation emitted by the surface and re-emits it, some back downward (the greenhouse effect)."]],
    ["carbon dioxide", "co2", "greenhouse", "atmosphere", "climate", "keeling"]),
  forest: s("carbon", "Forests and soils", "Plants take carbon from the air by photosynthesis; dead matter stores it in soils and peat. Respiration and decay release it.",
    ["Soils hold more carbon than the atmosphere and all vegetation combined.", "Deforestation releases stored carbon and stops future uptake.", "Peatlands cover about 3% of land but hold about a third of soil carbon."],
    [["Which store holds more carbon: soils or the atmosphere?", "Soils (more than atmosphere and vegetation together)."], ["Name two ways carbon returns to the air from living things.", "Respiration and decomposition (also combustion)."], ["Why is peat important for climate?", "It stores huge amounts of carbon; draining or burning it releases CO₂."]],
    ["forest", "deforestation", "soil carbon", "peat", "carbon sink", "sequestration"]),
  fossil: s("carbon", "Fossil fuels and combustion", "Coal, oil and gas are carbon from ancient organisms. Burning them releases CO₂ that was stored for millions of years.",
    ["Burning fossil fuels and cement production emit about 37 billion tonnes of CO₂ a year.", "About half of emitted CO₂ stays in the air; the rest is taken up by oceans and land.", "Net zero: emissions balanced by removals, by cutting fossil fuel use and protecting and growing sinks."],
    [["Why does burning fossil fuels add carbon to the cycle?", "It releases carbon locked away for millions of years into the atmosphere."], ["Roughly what fraction of emitted CO₂ stays in the atmosphere?", "About half."], ["What does net zero mean?", "Greenhouse gas emissions are balanced by removals from the atmosphere."]],
    ["fossil fuel", "combustion", "coal", "emissions", "net zero", "burning"]),
};

const NOTES = {
  energy: { title: "Energy flow and producers", lead: "Ecosystems run on sunlight. Producers capture a small fraction of it, and every transfer up the food chain loses most of what's left.",
    sections: [
      ["Photosynthesis", "- In chloroplasts: light-dependent reactions (thylakoids: water split, ATP and NADPH made, O₂ released) and the Calvin cycle (stroma: CO₂ fixed by RuBisCO).", "- Rate limited by the factor in shortest supply (Blackman's law of limiting factors).", "> Required practical: pondweed bubbles at different light distances; light intensity ∝ 1/distance²."],
      ["Productivity", "- GPP: total energy fixed. NPP = GPP − R.", "- Secondary productivity: biomass gained by consumers.", "- Efficiency of energy transfer = (energy at higher level ÷ energy at lower level) × 100."],
      ["Pyramids", "- Pyramids of number, biomass and energy; only energy pyramids are always upright.", "- A single oak tree supporting many insects gives an inverted pyramid of numbers.", "- Plankton in some seasons give an inverted pyramid of biomass (fast turnover)."],
    ] },
  web: { title: "Food webs and populations", lead: "Who eats whom decides how energy moves and how populations rise and fall. Remove one species and the effects ripple through the web.",
    sections: [
      ["Trophic levels", "Producer → primary consumer → secondary consumer → tertiary consumer, with decomposers working at every level.", "- Food chains rarely exceed 4–5 links because so little energy remains.", "- Omnivores feed at more than one level."],
      ["Interactions", "- Competition: interspecific (between species) and intraspecific (within).", "- Predation, herbivory, parasitism, mutualism (bees and flowers, mycorrhizae).", "- Competitive exclusion: two species can't share exactly the same niche indefinitely (red and grey squirrels)."],
      ["Populations", "- Growth curves: lag, exponential (log), stationary (carrying capacity), decline.", "- Density-dependent factors (competition, disease, predation) vs density-independent (weather, fire).", "- Sampling: quadrats (random, transects), capture–mark–recapture (N = n₁ × n₂ / m₂).", "> Lincoln index assumptions: no births, deaths or migration between samples; marks don't affect survival."],
      ["Biodiversity", "- Species richness and evenness; Simpson's diversity index.", "- Threats: habitat loss, invasive species, pollution, overexploitation, climate change.", "- Conservation: protected areas, seed banks, captive breeding, rewilding, sustainable fishing quotas."],
    ] },
  water: { title: "The water cycle", lead: "Water moves between oceans, air, land and living things, powered by the Sun. It's a closed system globally, but open at the scale of a drainage basin.",
    sections: [
      ["Stores and flows", "- Stores: oceans (97%), ice (2%), groundwater, lakes, soil, atmosphere, biosphere.", "- Flows: evaporation, transpiration, condensation, precipitation, interception, infiltration, percolation, throughflow, groundwater flow, runoff.", "> Residence times: atmosphere ~9 days; oceans ~3,000 years; deep groundwater up to 10,000 years."],
      ["Drainage basins and hydrographs", "- A storm hydrograph shows lag time between peak rainfall and peak discharge.", "- Flashy rivers (short lag, high peak): steep, impermeable, urban, small basins.", "- Management: hard engineering (dams, levees) and soft (afforestation, wetland restoration, floodplain zoning)."],
      ["Water and climate change", "- Warmer air holds more water vapour, itself a greenhouse gas (positive feedback).", "- More intense rainfall and longer droughts; glaciers and snowpack retreating.", "- Sea level rise from thermal expansion and melting land ice."],
    ] },
  carbon: { title: "The carbon cycle and climate", lead: "Carbon moves between the atmosphere, oceans, living things, soils and rocks. Humans are moving long-stored carbon into the air faster than natural sinks can absorb it.",
    sections: [
      ["Stores and fluxes", "- Lithosphere (rocks, fossil fuels): by far the largest store, very slow.", "- Oceans: ~38,000 GtC, mostly deep water. Soils: ~1,500–2,400 GtC. Atmosphere: ~870 GtC. Vegetation: ~450–650 GtC.", "- Fluxes: photosynthesis, respiration, decomposition, ocean exchange, combustion, weathering.", "> The biological pump: phytoplankton fix CO₂; dead matter sinks to the deep ocean."],
      ["The greenhouse effect", "- Shortwave sunlight passes through the atmosphere; the surface emits longwave infrared; greenhouse gases absorb and re-emit it.", "- Main gases: water vapour, CO₂, methane, nitrous oxide, CFCs.", "- Global average temperature is about 1.2 °C above pre-industrial."],
      ["Feedbacks", "- Positive: ice–albedo (less ice, more absorption), permafrost thaw releasing methane, forest dieback.", "- Negative: more plant growth with higher CO₂ (CO₂ fertilisation), up to a point."],
      ["Responses", "- Mitigation: renewable energy, efficiency, electrified transport, protecting forests and peat, carbon capture.", "- Adaptation: flood defences, drought-resistant crops, managed retreat.", "- International agreements: Kyoto (1997), Paris (2015, aiming for well below 2 °C, pursuing 1.5 °C)."],
    ] },
};

export default {
  title: "An ecosystem in 3D", kicker: "3D ecology",
  intro: { title: "Explore an island ecosystem", text: "Producers, consumers and decomposers in a food web, with the water cycle and the carbon cycle running over the island. Click anything for how it fits into the system, and read the full notes below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Key point",
  quiz: "find it on the island",
  motion: "Rain, evaporation and carbon flows",
  camera: { pos: [1.5, 1.2, 1.9], target: [0, 0.2, 0], min: 0.05, max: 5 },
  views: { Island: [[1.6, 1.3, 1.9], [0, 0.2, 0]], Above: [[0.1, 2.6, 0.3], [0, 0, 0]], Forest: [[-0.1, 0.45, 0.85], [-0.35, 0.12, 0.1]], Sea: [[1.4, 0.4, 0.2], [0.75, 0.05, 0]], Sky: [[0.3, 1.2, 1.6], [0, 0.8, 0]] },
  platform: { r: 1.05, y: -0.06 },
  labelMax: 2,
  explode: false,
  bg: ["#16345a", "#06121e"],
  build(k) {
    const { THREE, V, mat, glow, limb, tube, blob, box, add, decor } = k;
    const rnd = (() => { let x = 11; return () => (x = (x * 16807) % 2147483647) / 2147483647; })();
    const h = (x, z) => { const d = Math.hypot(x + 0.1, z); return Math.max(-0.05, 0.25 * Math.exp(-d * d * 4) + 0.06 * Math.sin(x * 5) * Math.cos(z * 4) - 0.06 + (Math.hypot(x + 0.35, z + 0.3) < 0.25 ? 0.18 * (1 - Math.hypot(x + 0.35, z + 0.3) / 0.25) : 0)); };
    // land and sea
    const land = new THREE.PlaneGeometry(1.5, 1.5, 160, 160); land.rotateX(-Math.PI / 2);
    const lp = land.attributes.position, colours = [];
    for (let i = 0; i < lp.count; i++) { const x = lp.getX(i), z = lp.getZ(i), y = Math.hypot(x, z) > 0.7 ? -0.08 : h(x, z); lp.setY(i, y); const c = new THREE.Color(y > 0.22 ? "#9aa98a" : y > 0.02 ? "#3f8f4a" : y > -0.03 ? "#d8c58f" : "#2b6b6e"); colours.push(c.r, c.g, c.b); }
    land.setAttribute("color", new THREE.Float32BufferAttribute(colours, 3)); land.computeVertexNormals();
    decor(new THREE.Mesh(land, mat("#ffffff", { vertexColors: true, detail: "tissue", repeat: 8, bump: 0.8, roughness: 0.8, clearcoat: 0 })));
    const sea = new THREE.Mesh(new THREE.CircleGeometry(1.0, 96), mat("#1f8fbf", { detail: "none", roughness: 0.1, clearcoat: 1, transmission: 0.3, thickness: 0.2, transparent: true, opacity: 0.85 })); sea.rotation.x = -Math.PI / 2; sea.position.y = -0.02;
    add("ocean", sea);
    // the river from the hills to the sea
    const riverPts = [V(-0.1, 0.2, -0.05), V(0.05, 0.12, 0.05), V(0.2, 0.06, 0.02), V(0.4, 0.01, 0.1), V(0.62, -0.015, 0.12)].map((p) => V(p.x, h(p.x, p.z) + 0.012, p.z));
    const river = tube(riverPts, 0.018, mat("#38c8ff", { detail: "none", roughness: 0.05, clearcoat: 1, emissive: new THREE.Color("#06303f") }), 64); river.scale.y = 0.3; river.position.y = riverPts[0].y * 0.7;
    add("river", river);
    // the sun
    const sun = new THREE.Mesh(new THREE.SphereGeometry(0.12, 48, 32), glow("#ffd34d", 1)); sun.position.set(-0.9, 1.35, -0.8); add("sun", sun);
    const corona = new THREE.Mesh(new THREE.SphereGeometry(0.19, 48, 32), glow("#ff9f40", 0.25)); corona.position.copy(sun.position); decor(corona, "energy");
    const sunLight = new THREE.PointLight("#ffe7a0", 4, 6); sunLight.position.copy(sun.position); decor(sunLight);
    // producers: a forest of trees and grassland
    const leaf = mat("#2fa84f", { detail: "tissue", repeat: 3, roughness: 0.6 }), bark = mat("#6b4a2f", { detail: "fibre" });
    for (let i = 0; i < 55; i++) {
      const x = -0.55 + rnd() * 0.6, z = -0.45 + rnd() * 0.75; if (Math.hypot(x, z) > 0.62) continue;
      const y = h(x, z); if (y < 0.0) continue;
      const t = new THREE.Group(), sc = 0.6 + rnd() * 0.6; t.position.set(x, y, z); t.scale.setScalar(sc);
      t.add(limb(V(0, 0, 0), V(0, 0.06, 0), 0.006, bark, false));
      const c = new THREE.Mesh(rnd() > 0.4 ? new THREE.ConeGeometry(0.03, 0.09, 12) : new THREE.SphereGeometry(0.035, 16, 12), leaf); c.position.y = 0.09; t.add(c);
      add(i % 4 === 0 ? "forest" : "producers", t);
    }
    // consumers: rabbits and deer, a fox and a hawk
    const fur = (c) => mat(c, { detail: "tissue", repeat: 6, roughness: 0.7 });
    const animal = (c, size) => { const g = new THREE.Group(), m = fur(c); const b = new THREE.Mesh(blob(size, 1.5, 0.9, 0.9), m); g.add(b); const hd = new THREE.Mesh(new THREE.SphereGeometry(size * 0.6, 16, 12), m); hd.position.set(size * 1.4, size * 0.6, 0); g.add(hd); for (const [x, z] of [[0.8, 0.5], [0.8, -0.5], [-0.8, 0.5], [-0.8, -0.5]]) g.add(limb(V(x * size, -size * 0.3, z * size * 0.6), V(x * size, -size * 1.4, z * size * 0.6), size * 0.18, m)); return g; };
    const herd = [];
    for (const [x, z, c, sz] of [[0.15, 0.3, "#c9a77a", 0.02], [0.25, 0.35, "#b08a5a", 0.018], [-0.05, 0.42, "#8a6a4a", 0.03], [0.32, 0.22, "#c9a77a", 0.016]]) { const a = animal(c, sz); a.position.set(x, h(x, z) + sz * 1.4, z); a.rotation.y = rnd() * 6; add("herbivores", a); herd.push(a); }
    const fox = animal("#e0702a", 0.024); fox.position.set(-0.15, h(-0.15, 0.32) + 0.034, 0.32); add("predators", fox);
    const hawk = new THREE.Group(), hm = fur("#5a4030"); hawk.add(new THREE.Mesh(blob(0.02, 1.6, 0.7, 0.8), hm)); for (const sd of [-1, 1]) { const w = new THREE.Mesh(blob(0.05, 0.6, 0.08, 1, (v) => { v.z *= 1 - Math.abs(v.x) * 4; }), hm); w.position.z = sd * 0.04; w.rotation.x = sd * 0.2; hawk.add(w); }
    add("predators", hawk);
    // decomposers: mushrooms and a log on the forest floor
    for (const [x, z] of [[-0.3, 0.05], [-0.25, 0.1], [-0.35, 0.12], [-0.2, -0.05]]) { const m = new THREE.Group(), y = h(x, z); m.position.set(x, y, z); m.add(limb(V(0, 0, 0), V(0, 0.025, 0), 0.004, mat("#f2ead8", { detail: "none" }), false)); const cap = new THREE.Mesh(new THREE.SphereGeometry(0.014, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat("#d9452f", { detail: "none", clearcoat: 1 })); cap.position.y = 0.024; m.add(cap); add("decomposers", m); }
    const log = limb(V(-0.33, h(-0.33, 0.0) + 0.012, 0.0), V(-0.2, h(-0.2, 0.02) + 0.012, 0.02), 0.012, mat("#5a3a24", { detail: "fibre" })); add("decomposers", log);
    // clouds
    const cloudMat = mat("#f4fbff", { detail: "none", roughness: 0.9, transparent: true, opacity: 0.92, sheen: 1 });
    const cloud = new THREE.Group(); cloud.position.set(-0.15, 0.85, 0.0);
    for (let i = 0; i < 9; i++) { const p = new THREE.Mesh(new THREE.SphereGeometry(0.06 + rnd() * 0.05, 24, 16), cloudMat); p.position.set((rnd() - 0.5) * 0.3, (rnd() - 0.3) * 0.06, (rnd() - 0.5) * 0.15); cloud.add(p); }
    add("clouds", cloud);
    // a town with a power station, burning fossil fuels
    const town = new THREE.Group(); town.position.set(0.3, h(0.3, -0.3), -0.3);
    const wall = mat("#b0b8c8", { detail: "none", roughness: 0.5 });
    for (let i = 0; i < 5; i++) { const bx = box(0.04, 0.03 + rnd() * 0.05, 0.04, wall, 0.004); bx.position.set((i % 3) * 0.055 - 0.05, 0.02, Math.floor(i / 3) * 0.06); town.add(bx); }
    const stack = limb(V(0.1, 0, 0.02), V(0.1, 0.18, 0.02), 0.012, mat("#8a8f9a", { detail: "none" }), false, 0.009); town.add(stack);
    add("fossil", town);
    // atmospheric CO₂: a glowing haze of molecules
    const co2 = new THREE.Group();
    for (let i = 0; i < 40; i++) { const m = new THREE.Group(), c = new THREE.Mesh(new THREE.SphereGeometry(0.008, 10, 8), mat("#3a3a3a", { detail: "none" })); m.add(c); for (const sd of [-1, 1]) { const o = new THREE.Mesh(new THREE.SphereGeometry(0.007, 10, 8), mat("#ff5050", { detail: "none" })); o.position.x = sd * 0.012; m.add(o); } m.position.set((rnd() - 0.5) * 1.3, 0.55 + rnd() * 0.5, (rnd() - 0.5) * 1.3); m.rotation.set(rnd() * 3, rnd() * 3, 0); co2.add(m); }
    add("atmosphere", co2);
    // flows: rain, evaporation, transpiration; smoke and carbon uptake; energy from the sun
    const rain = []; for (let i = 0; i < 8; i++) { const x = -0.3 + i * 0.04, z = -0.06 + (i % 3) * 0.05; rain.push([V(x, 0.8, z), V(x, h(x, z) + 0.01, z)]); }
    k.flow(rain, "#9fe8ff", 70, 0.9, "water", 0.01);
    const evap = []; for (let i = 0; i < 6; i++) { const a = i * 0.9, x = Math.cos(a) * 0.82, z = Math.sin(a) * 0.82; evap.push([V(x, 0.0, z), V(x * 0.8, 0.4, z * 0.8), V(-0.15 + (x - 0.15) * 0.2, 0.8, z * 0.2)]); }
    k.flow(evap, "#d8f6ff", 50, 0.15, "water", 0.009);
    k.flow([riverPts], "#bff0ff", 25, 0.3, "water", 0.01);
    const smoke = [[V(0.4, town.position.y + 0.19, -0.28), V(0.42, 0.45, -0.25), V(0.3, 0.75, -0.1)]];
    k.flow(smoke, "#c79bff", 40, 0.2, "carbon", 0.014);
    const uptake = []; for (let i = 0; i < 5; i++) { const x = -0.45 + i * 0.08; uptake.push([V(x + 0.2, 0.75, -0.1), V(x, 0.3, 0.0), V(x, h(x, 0) + 0.08, 0.0)]); }
    k.flow(uptake, "#d6b8ff", 40, 0.18, "carbon", 0.01);
    k.flow([[sun.position.clone(), V(-0.5, 0.5, -0.3), V(-0.3, 0.15, 0.0)], [sun.position.clone(), V(-0.4, 0.5, -0.1), V(-0.2, 0.2, 0.2)]], "#ffe066", 30, 0.35, "energy", 0.012);
    k.tick((t, dt, motion) => {
      if (!motion) return;
      hawk.position.set(Math.cos(t * 0.5) * 0.35 - 0.05, 0.55 + Math.sin(t * 1.3) * 0.03, Math.sin(t * 0.5) * 0.35);
      hawk.rotation.set(0, -t * 0.5, -0.3); hawk.children[1].rotation.x = 0.2 + Math.sin(t * 6) * 0.3; hawk.children[2].rotation.x = -0.2 - Math.sin(t * 6) * 0.3;
      herd.forEach((a, i) => { a.rotation.y += Math.sin(t * 0.3 + i) * 0.003; });
      cloud.position.x = -0.15 + Math.sin(t * 0.15) * 0.05;
      co2.rotation.y = t * 0.02;
    });
    hawk.position.set(0.2, 0.55, 0.3);
  },
};
