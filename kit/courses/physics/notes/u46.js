// Unit 46: Renewable Energy and Energy Physics. Format: kit/course/notes.js
export default `
## Energy conversion and conservation
S: Energy can't be created or destroyed, only converted between forms, but every conversion wastes some as low-grade heat. Understanding conversion efficiencies and thermodynamic limits is the starting point for designing any energy system.
H: Forms and conversions
- Chemical (fuels, batteries), nuclear, gravitational (hydro), kinetic (wind), radiant (solar), thermal, electrical.
- Efficiency η = useful output/input; chains multiply: η_{total} = η_{1}η_{2}η_{3}….
- Typical efficiencies: electric motor ~95%, large generator ~98%, combined-cycle gas plant ~60%, car petrol engine ~25–35%, silicon solar cell ~20–24%, photosynthesis ~1–2%.
E: η_{total} = Π η_{i} :: chained efficiency
E: η_{Carnot} = 1 − T_{c}/T_{h} :: maximum heat-engine efficiency
H: Thermodynamic limits
- The second law caps heat-engine efficiency at Carnot.
- Exergy: the useful work available relative to the environment; electricity and fuels are high-exergy, warm water is low.
- Primary energy vs final energy: converting fossil heat to electricity loses ~60%, so electrifying with renewables cuts primary energy demand.
H: Units and scale
P: 1 kWh = 3.6 MJ; 1 toe ≈ 41.9 GJ; world primary energy ~600 EJ per year (~19 TW average). Power (W) is a rate; energy (J, kWh) is an amount. Capacity factor = actual output/(rated power × time): nuclear ~90%, offshore wind ~40–50%, solar PV ~10–25%. Energy density matters: petrol ~46 MJ kg^{-1}, Li-ion ~0.7 MJ kg^{-1}, hydrogen ~120 MJ kg^{-1} (but low per volume).
E: CF = E_{actual}/(P_{rated} × t) :: capacity factor
X: A power station converts fuel at 40%, transmission loses 7%, and a motor runs at 90%. Overall efficiency?
> 0.40 × 0.93 × 0.90 ≈ 0.33
X: A 5 MW wind turbine generates 17 500 MWh per year. Capacity factor?
> 5 × 8760 = 43 800 MWh; CF = 17 500/43 800 ≈ 40%
K: Energy is conserved but degraded; multiply efficiencies along chains and respect Carnot limits for heat engines.
!: Don't confuse power (kW) with energy (kWh); a 1 kW device running for 3 hours uses 3 kWh.
Q: What is capacity factor? | Actual energy produced divided by the maximum possible at rated power over the same time.
Q: Why does electrification reduce primary energy use? | Fossil power plants and engines waste most fuel energy as heat; renewables and efficient motors avoid this loss.
M1: Carnot efficiency between 800 K and 300 K is: | 62.5% | 37.5% | 100% | 50% | 1 − 300/800.
M2: 1 kWh equals: | 3.6 MJ | 1 MJ | 1 kJ | 36 MJ | 1000 W × 3600 s.

## Solar photovoltaic physics
S: Solar cells convert sunlight directly into electricity using the photovoltaic effect in semiconductors. Photons above the band gap create electron–hole pairs that a p–n junction separates, and cell efficiency is limited by physics, materials and manufacturing.
H: How a cell works
- Photons with E > E_{g} create electron–hole pairs; excess energy is lost as heat (thermalisation).
- The built-in field of the p–n junction separates carriers, driving current.
- I–V characteristic: I = I_{L} − I_{0}(e^{qV/nk_{B}T} − 1).
- Key parameters: short-circuit current I_{sc}, open-circuit voltage V_{oc}, fill factor FF.
E: I = I_{L} − I_{0}(e^{qV/nk_{B}T} − 1) :: diode equation for a solar cell
E: η = V_{oc}I_{sc}FF/P_{in} :: cell efficiency
H: Efficiency limits
- **Shockley–Queisser limit**: ~33.7% for a single junction at E_{g} ≈ 1.34 eV under AM1.5.
- Losses: thermalisation, non-absorption below E_{g}, recombination, reflection, resistance.
- **Multijunction** cells stack gaps (record ~47% under concentration); perovskite–silicon tandems exceed 33%.
H: Technologies and practice
P: Crystalline silicon (~95% of market; PERC, TOPCon and heterojunction cells at 23–26%), thin films (CdTe ~22%, CIGS), perovskites (rapidly improving, stability challenges). Standard test conditions: 1000 W m^{-2}, 25 °C, AM1.5. Output falls ~0.3–0.4% per K of cell temperature. Modules are rated in watts-peak (Wp). PV costs fell ~90% from 2010 to 2020, making it the cheapest electricity in many places.
X: A cell has V_{oc} = 0.7 V, I_{sc} = 40 mA cm^{-2}, FF = 0.8 under 100 mW cm^{-2}. Efficiency?
> P_{max} = 0.7 × 40 × 0.8 = 22.4 mW cm^{-2}
> η = 22.4/100 = 22.4%
X: A 400 Wp panel at 65 °C cell temperature (coefficient −0.35% K^{-1}). Output at 1000 W m^{-2}?
> ΔT = 40 K ⇒ −14% ⇒ ~344 W
K: PV converts photons above E_{g} into current; Shockley–Queisser limits single junctions to ~34%, tandems go further.
!: Solar panels lose efficiency when hot; sunny but hot days don't always give peak output.
Q: What is the Shockley–Queisser limit? | The maximum efficiency (~33.7%) of a single-junction solar cell under unconcentrated sunlight.
Q: What is fill factor? | The ratio of maximum power to V_{oc} × I_{sc}, indicating how "square" the I–V curve is.
M1: Thermalisation loss occurs when photons have: | Energy above the band gap | Energy below the gap | No energy | Exactly the gap energy | Excess becomes heat.
M2: Tandem cells exceed single-junction limits by: | Using multiple band gaps | Larger area | Cooling only | Concentrated light only | Each layer absorbs part of the spectrum.

## Solar thermal systems
S: Solar thermal systems capture sunlight as heat, for hot water, space heating, industrial processes or electricity generation. Concentrating solar power uses mirrors to reach high temperatures and stores heat in molten salt to generate power after sunset.
H: Low-temperature collectors
- **Flat-plate** collectors: absorber plate under glazing; ~60–80% efficiency at low ΔT.
- **Evacuated tubes**: vacuum reduces convective loss, better in cold climates.
- Selective coatings absorb visible (high α) but emit little IR (low ε).
- Collector efficiency: η = η_{0} − a_{1}(T_{m} − T_{a})/G.
E: η = η_{0} − a_{1}(T_{m} − T_{a})/G :: collector efficiency
H: Concentrating solar power (CSP)
- **Parabolic troughs**: line focus, ~400 °C oil.
- **Power towers**: heliostat fields focus on a central receiver, ~565 °C molten salt.
- **Dishes** with Stirling engines; **linear Fresnel** reflectors.
- Concentration ratio C up to ~1000; only direct (beam) radiation can be concentrated, so CSP suits deserts.
- Molten-salt storage gives 6–15 hours of dispatchable output.
E: η_{system} = η_{optical}η_{receiver}η_{Carnot-ish} :: CSP efficiency chain
H: Comparison
P: Solar thermal for hot water is simple and effective; CSP offers storage that PV lacks but costs more per kWh. Solar process heat can decarbonise industry (food, chemicals). Passive solar building design (orientation, thermal mass, glazing) cuts heating demand without moving parts.
X: A collector has η_{0} = 0.8, a_{1} = 4 W m^{-2} K^{-1}. Efficiency at T_{m} − T_{a} = 40 K and G = 800 W m^{-2}?
> η = 0.8 − 4 × 40/800 = 0.8 − 0.2 = 0.6
X: Energy stored in 10 000 t of molten salt (c = 1.5 kJ kg^{-1} K^{-1}) heated by 275 K?
> Q = 10^{7} × 1500 × 275 ≈ 4.1 × 10^{12} J ≈ 1.15 GWh thermal
K: Solar thermal turns sunlight into heat; concentration reaches power-plant temperatures and molten salt enables storage.
!: Concentrating systems need direct sunlight; cloudy, diffuse conditions give little output.
Q: Why use selective coatings? | High solar absorption with low thermal emission reduces heat loss.
Q: What advantage does CSP have over PV? | Cheap thermal storage allows electricity after sunset.
M1: Power towers commonly store heat in: | Molten salt | Water ice | Lithium batteries | Compressed air | ~565 °C.
M2: Collector efficiency falls as: | Temperature difference rises | Sunlight rises | Glazing improves | Wind falls | Heat losses grow.

## Wind energy
S: Wind turbines convert the kinetic energy of moving air into electricity. Power rises with the cube of wind speed and the square of blade length, so modern turbines are huge and sited where winds are strong, increasingly offshore.
H: Power in the wind
- P = ½ρAv^{3}; air density ρ ≈ 1.225 kg m^{-3}.
- **Betz limit**: maximum fraction extracted C_{p,max} = 16/27 ≈ 59.3%; modern turbines reach ~45–50%.
- Tip-speed ratio λ = ωR/v ~ 6–8 for three-bladed turbines.
E: P = ½C_{p}ρAv^{3} :: turbine power
E: C_{p,max} = 16/27 :: Betz limit
H: Turbine design
- Lift-based aerofoil blades; pitch control limits power above rated speed.
- Cut-in ~3–4 m s^{-1}, rated ~11–13 m s^{-1}, cut-out ~25 m s^{-1}.
- Wind shear: v(h) = v_{ref}(h/h_{ref})^{α}, α ≈ 0.14: taller towers see stronger winds.
- Modern offshore turbines: 15 MW, rotor diameters >230 m.
E: v(h) = v_{ref}(h/h_{ref})^{α} :: wind shear power law
H: Integration
P: Wind speeds follow a Weibull distribution; because P ∝ v^{3}, average power depends strongly on distribution, not just mean speed. Wake effects reduce output of downstream turbines in farms. Variability requires forecasting, storage and grid flexibility. Floating offshore turbines open deep waters. Lifecycle carbon is ~10 g CO_{2} kWh^{-1}; energy payback is under a year.
X: A turbine with 120 m rotor diameter at 10 m s^{-1}, C_{p} = 0.45. Power?
> A = π × 60^{2} ≈ 11 300 m^{2}
> P = 0.5 × 0.45 × 1.225 × 11 300 × 1000 ≈ 3.1 MW
X: Wind at 10 m height is 6 m s^{-1}. At 100 m (α = 0.14)?
> v = 6 × 10^{0.14} ≈ 6 × 1.38 ≈ 8.3 m s^{-1}; power ratio ≈ (1.38)^{3} ≈ 2.6
K: Wind power ∝ v^{3} and rotor area; Betz caps extraction at 59%, so bigger rotors and taller towers win.
!: Doubling wind speed gives eight times the power; small errors in wind speed estimates give big errors in yield.
Q: What is the Betz limit? | The maximum 59.3% of wind kinetic energy flux a turbine can extract.
Q: Why do turbines have a cut-out speed? | To prevent damage in very high winds.
M1: Doubling rotor diameter multiplies power by: | 4 | 2 | 8 | 16 | Area ∝ D^{2}.
M2: Wind speed distributions are often modelled with: | Weibull distributions | Normal distributions | Poisson | Uniform | Skewed, positive.

## Hydroelectric power
S: Hydroelectric power converts the gravitational potential energy of water into electricity using turbines. It provides about 15% of world electricity, offers fast, flexible output and, through pumped storage, most of the world's grid-scale energy storage.
H: Power from falling water
- P = ηρgQH, Q flow rate (m^{3} s^{-1}), H head (m).
- Efficiencies ~85–95%, the highest of any generation method.
- Turbines: **Pelton** (high head, low flow, impulse), **Francis** (medium head), **Kaplan** (low head, high flow, adjustable blades).
E: P = ηρgQH :: hydropower
H: Types
- **Reservoir (storage)** dams: dispatchable, seasonal storage (Three Gorges 22.5 GW).
- **Run-of-river**: little storage, output follows river flow.
- **Pumped storage**: pump water uphill when power is cheap, generate when needed; round-trip efficiency ~70–85%; ~90% of global grid storage capacity.
E: E = mgh = ρVgh :: stored potential energy
H: Impacts
P: Dams flood land, displace communities, block fish migration and alter sediment flows; reservoirs can emit methane from decaying vegetation, especially in the tropics. Hydro output varies with rainfall and drought (climate risk). Benefits: flood control, irrigation, very long plant life (~100 years), fast ramping to balance wind and solar.
X: A plant with H = 100 m, Q = 200 m^{3} s^{-1}, η = 0.9. Power?
> P = 0.9 × 1000 × 9.81 × 200 × 100 ≈ 177 MW
X: A pumped-storage upper lake holds 10^{7} m^{3} at 300 m head. Stored energy?
> E = 1000 × 10^{7} × 9.81 × 300 ≈ 2.9 × 10^{13} J ≈ 8.2 GWh
K: Hydropower ∝ flow × head; it is efficient and flexible, and pumped storage dominates grid storage.
!: Hydro is renewable but not impact-free; ecological and social effects can be large.
Q: Which turbine suits high head and low flow? | The Pelton wheel.
Q: What is pumped-storage hydro? | Storing energy by pumping water uphill and later releasing it through turbines.
M1: Hydro plant efficiencies are typically: | 85–95% | 30–40% | 10–20% | 59% max | Very efficient.
M2: Kaplan turbines suit: | Low head, high flow | High head, low flow | No water | Steam | Adjustable propeller blades.

## Tidal and wave energy
S: Tidal and wave energy harness the ocean's motion: tides driven by the Moon and Sun, and waves driven by wind. Tides are highly predictable, waves carry concentrated energy, and both face engineering challenges in harsh marine environments.
H: Tidal energy
- **Tidal range** (barrage or lagoon): trap water at high tide, release through turbines. E = ½ρgAh^{2} per tide emptying.
- La Rance (France, 240 MW, since 1966); Sihwa (South Korea, 254 MW).
- **Tidal stream**: underwater turbines in fast currents; P = ½C_{p}ρAv^{3} with seawater ρ ≈ 1025 kg m^{-3} (≈840× denser than air).
- MeyGen (Scotland) array.
E: E = ½ρgAh^{2} :: energy per tidal cycle (one direction)
H: Wave energy
- Deep-water wave power per metre of crest: P ≈ ρg^{2}H_{s}^{2}T/(64π) ≈ 0.5H_{s}^{2}T kW m^{-1}.
- Atlantic coasts ~40–70 kW m^{-1}.
- Devices: oscillating water columns, point absorbers, attenuators (Pelamis), overtopping devices.
E: P ≈ 0.5 H_{s}^{2}T kW m^{-1} :: wave power flux
H: Challenges
P: Corrosion, biofouling, storms, maintenance access and high costs have slowed deployment. Tidal is predictable decades ahead but cycles (twice daily, spring–neap). Barrages alter estuaries and habitats. Wave devices must survive 100-year storms while harvesting ordinary waves efficiently.
X: A tidal stream turbine with 20 m diameter in a 2.5 m s^{-1} current, C_{p} = 0.4. Power?
> A = 314 m^{2}; P = 0.5 × 0.4 × 1025 × 314 × 15.6 ≈ 1.0 MW
X: Waves with H_{s} = 3 m and T = 10 s. Power per metre?
> P ≈ 0.5 × 9 × 10 = 45 kW m^{-1}
K: Tides offer predictable power from dense, slow water; waves offer high power density but tough engineering.
!: Tidal power is predictable but not constant; output varies with the tidal cycle.
Q: Why can tidal stream turbines be smaller than wind turbines for the same power? | Seawater is about 840 times denser than air.
Q: What is an oscillating water column? | A wave device where rising water pushes air through a turbine.
M1: Tidal energy's main advantage is: | Predictability | Constant output | Low cost | No environmental effect | Astronomical forcing.
M2: Wave power scales with wave height as: | H^{2} | H | H^{3} | √H | Energy ∝ amplitude squared.

## Geothermal energy
S: Geothermal energy uses heat from Earth's interior, originally from formation and ongoing radioactive decay, for electricity and direct heating. It provides steady baseload power where hot rocks lie close to the surface, and shallow ground-source heat pumps work almost anywhere.
H: Earth's heat
- Average geothermal gradient ~25–30 K km^{-1}; much higher in volcanic regions.
- Surface heat flow ~87 mW m^{-2} average (~47 TW total).
- About half from radioactive decay of U, Th and K.
E: T(z) = T_{0} + (dT/dz)z :: geothermal gradient
H: Power plants
- **Dry steam** (The Geysers, USA): steam drives turbines directly.
- **Flash steam**: hot pressurised water flashes to steam.
- **Binary cycle**: lower-temperature water (~100–180 °C) heats an organic working fluid (ORC).
- Iceland gets ~25% of electricity and ~90% of heating from geothermal; Kenya ~45% of electricity.
- **Enhanced geothermal systems (EGS)**: fracture hot dry rock to create reservoirs; can trigger small earthquakes.
H: Direct use and heat pumps
P: District heating, greenhouses, aquaculture and industrial heat use geothermal water directly. Ground-source heat pumps use near-surface ground (~10–15 °C year-round) as a heat source or sink. Resource sustainability depends on reinjection rates; some fields cool or lose pressure if over-exploited. Emissions are low but dissolved gases (CO_{2}, H_{2}S) need management.
X: Temperature at 4 km depth with T_{0} = 10 °C and 30 K km^{-1}?
> T = 10 + 120 = 130 °C, suitable for binary-cycle power
X: Carnot efficiency for 150 °C resource and 25 °C sink?
> 1 − 298/423 ≈ 0.30; real binary plants achieve ~10–15%
K: Geothermal taps Earth's heat for steady power and heating; efficiency is limited by modest resource temperatures.
!: Geothermal reservoirs can deplete if heat or fluid extraction exceeds natural recharge; reinjection is essential.
Q: What fraction of Earth's heat flow comes from radioactive decay? | About half.
Q: What is a binary-cycle geothermal plant? | One that uses moderate-temperature water to vaporise a low-boiling working fluid driving the turbine.
M1: The average geothermal gradient is about: | 25–30 K km^{-1} | 1 K km^{-1} | 300 K km^{-1} | 1000 K km^{-1} | Typical continental crust.
M2: Enhanced geothermal systems involve: | Fracturing hot dry rock | Burning fuel | Solar panels | Wind turbines | Creating artificial reservoirs.

## Nuclear fission energy
S: Nuclear fission power splits heavy nuclei like uranium-235, releasing about 200 MeV per fission, millions of times more energy per kilogram than burning fuel. Fission plants provide about 9% of world electricity with very low carbon emissions.
H: Energy release and chain reaction
- n + ^{235}U → fission fragments + 2–3 neutrons + ~200 MeV.
- About 80% of energy in fragment kinetic energy, the rest in neutrons, gammas, beta decays and antineutrinos.
- Criticality: multiplication factor k = 1 for steady power.
- Delayed neutrons (~0.65% for U-235) make control possible.
E: E ≈ 200 MeV per fission ≈ 3.2 × 10^{-11} J :: fission energy
E: k = η f p ε (P_{nl}) :: six-factor formula (simplified)
H: Reactor design
- **Fuel**: UO_{2} enriched to 3–5% U-235.
- **Moderator** (water, graphite, heavy water) slows neutrons to thermal energies where fission cross-sections are large.
- **Control rods** (boron, cadmium) absorb neutrons.
- **Coolant** carries heat to steam generators; PWRs and BWRs dominate.
- Thermal efficiency ~33%.
H: Issues and future
P: Strengths: low carbon (~12 g CO_{2} kWh^{-1}), high capacity factor, small land use. Challenges: high capital cost, long build times, radioactive waste (long-lived actinides; geological disposal at Onkalo, Finland), proliferation, accidents (Chernobyl 1986, Fukushima 2011). Generation IV designs (molten salt, sodium fast, high-temperature gas) and small modular reactors aim for passive safety and lower cost. Fast reactors can burn actinides and breed fuel.
X: Energy from fissioning 1 kg of U-235?
> Atoms = 1000/235 × 6.022 × 10^{23} ≈ 2.56 × 10^{24}
> E = 2.56 × 10^{24} × 3.2 × 10^{-11} ≈ 8.2 × 10^{13} J ≈ 23 GWh thermal
X: Equivalent mass of coal (24 MJ kg^{-1})?
> 8.2 × 10^{13}/2.4 × 10^{7} ≈ 3.4 × 10^{6} kg: about 3400 tonnes
K: Fission releases ~200 MeV per event; moderated, controlled chain reactions give steady low-carbon power.
!: Reactor control depends on delayed neutrons; prompt criticality (k exceeding 1 + β) is dangerously fast.
Q: Why is a moderator used in thermal reactors? | To slow neutrons to energies where U-235 fission is much more likely.
Q: Why do delayed neutrons matter? | They slow reactor response enough to allow mechanical control.
M1: Typical PWR fuel enrichment is: | 3–5% U-235 | 90% U-235 | 0.7% | 50% | Low-enriched uranium.
M2: Most fission energy appears as: | Fragment kinetic energy | Neutrinos | Gamma rays | Light | ~80%.

## Nuclear fusion energy
S: Fusion power aims to reproduce the Sun's energy source on Earth by fusing light nuclei, mainly deuterium and tritium, at temperatures above 100 million kelvin. Fuel is abundant and there's no long-lived high-level waste, but sustaining net energy gain is a huge challenge.
H: The D–T reaction
- D + T → ^{4}He (3.5 MeV) + n (14.1 MeV): 17.6 MeV per reaction.
- Needs ~10–20 keV temperatures (~100–200 million K) to overcome Coulomb repulsion.
- Tritium bred from lithium in blankets: n + ^{6}Li → T + ^{4}He.
E: D + T → ^{4}He + n + 17.6 MeV :: D–T fusion
E: nTτ_{E} ≳ 3 × 10^{21} keV s m^{-3} :: Lawson triple product for ignition
H: Approaches
- **Magnetic confinement**: tokamaks (JET record 69 MJ in 2023; ITER under construction; compact high-field SPARC), stellarators (Wendelstein 7-X).
- **Inertial confinement**: lasers compress fuel capsules; NIF achieved ignition (gain > 1 on target) in December 2022: 3.15 MJ out from 2.05 MJ laser energy.
- **Alternatives**: magnetised target fusion, field-reversed configurations, Z-pinches.
H: Challenges
P: Plasma instabilities and turbulence, materials surviving 14 MeV neutron damage, tritium breeding and handling, heat exhaust (divertors face ~10 MW m^{-2}), and engineering gain (wall-plug efficiency and recirculating power). Q = P_{fusion}/P_{heating}: ITER targets Q = 10. Commercial fusion is targeted for the 2030s–2050s by various programmes; a power plant needs Q_{engineering} > 1 sustained.
E: Q = P_{fusion}/P_{heating} :: fusion gain
X: Energy from fusing 1 kg of D–T fuel?
> Mass per reaction ≈ 5 u = 8.3 × 10^{-27} kg ⇒ 1.2 × 10^{26} reactions
> E ≈ 1.2 × 10^{26} × 17.6 × 1.6 × 10^{-13} J ≈ 3.4 × 10^{14} J, about 4× fission per kg
X: NIF's 2022 target gain?
> 3.15/2.05 ≈ 1.5 (but laser wall-plug energy was ~300 MJ)
K: Fusion needs high temperature, density and confinement time (Lawson criterion); ignition has been shown but net electricity hasn't yet.
!: Scientific gain on target is not engineering gain; total plant energy balance must include heating and support systems.
Q: What is the Lawson criterion? | A minimum triple product of density, temperature and confinement time needed for net fusion energy.
Q: Why is lithium needed for D–T fusion? | To breed tritium, which is scarce and radioactive.
M1: D–T fusion releases: | 17.6 MeV | 200 MeV | 1 MeV | 931 MeV | Per reaction.
M2: Tokamaks confine plasma with: | Magnetic fields | Lasers | Gravity | Walls only | Toroidal and poloidal fields.

## Hydrogen energy systems
S: Hydrogen is an energy carrier, not a source: it must be produced using energy, then stored, transported and converted back. It could decarbonise steel, fertiliser, shipping and seasonal storage, but round-trip losses mean electricity is usually better used directly where possible.
H: Production
- **Grey** hydrogen: steam methane reforming, ~10 kg CO_{2} per kg H_{2}; ~95% of today's production.
- **Blue**: reforming with carbon capture.
- **Green**: water electrolysis with renewable electricity; ~50–55 kWh per kg H_{2} (efficiency ~65–75% on HHV).
- Electrolysers: alkaline, PEM, solid oxide (high-temperature, more efficient).
E: 2H_{2}O → 2H_{2} + O_{2}, ΔH = 286 kJ mol^{-1} (HHV) :: electrolysis
E: E_{rev} = 1.23 V; thermoneutral 1.48 V :: cell voltages
H: Storage and transport
- Energy density 120 MJ kg^{-1} (LHV) but only ~10.8 MJ m^{-3} at STP.
- Compressed (350–700 bar), liquefied (20 K, ~30% energy cost), ammonia, LOHCs, salt caverns for bulk storage.
- Pipeline embrittlement and leakage (tiny molecules) are concerns; hydrogen is an indirect greenhouse gas.
H: Uses
P: Best uses: steelmaking (direct reduction), ammonia for fertiliser, refining, possibly shipping (as ammonia or methanol) and aviation fuels, and long-duration storage. Hydrogen for home heating and cars faces competition from heat pumps and batteries, which are ~2–3× more efficient end to end. Power-to-hydrogen-to-power round trip is ~30–40%.
X: Energy to make 1 kg H_{2} at 52 kWh kg^{-1}; efficiency vs HHV (39.4 kWh kg^{-1})?
> η = 39.4/52 ≈ 76%
X: Round-trip electricity → H_{2} → fuel cell (70% then 55%)?
> 0.70 × 0.55 ≈ 38%
K: Hydrogen stores and carries energy with significant conversion losses; prioritise uses where direct electrification is hard.
!: Hydrogen is only as clean as the energy used to make it; most hydrogen today is made from fossil gas.
Q: What is green hydrogen? | Hydrogen produced by electrolysis using renewable electricity.
Q: Why is hydrogen hard to store? | Very low volumetric energy density, requiring high pressure, cryogenics or chemical carriers.
M1: Hydrogen's gravimetric energy density is about: | 120 MJ kg^{-1} | 46 MJ kg^{-1} | 1 MJ kg^{-1} | 10 kJ kg^{-1} | Highest of fuels.
M2: Liquefying hydrogen requires cooling to about: | 20 K | 77 K | 200 K | 4 K | Boiling point of H_{2}.

## Fuel cells
S: Fuel cells convert chemical energy directly into electricity by electrochemical reactions, without combustion. Because they aren't heat engines, they can exceed Carnot-limited efficiencies, and their only exhaust with hydrogen fuel is water.
H: How they work
- Anode: fuel oxidised (H_{2} → 2H^{+} + 2e^{−}); cathode: oxygen reduced (½O_{2} + 2H^{+} + 2e^{−} → H_{2}O).
- An electrolyte conducts ions but not electrons; electrons flow through the external circuit.
- Reversible voltage E° = 1.23 V; practical cells ~0.6–0.8 V under load.
- Maximum efficiency ΔG/ΔH = 237/286 ≈ 83% (HHV) at 25 °C.
E: E = −ΔG/(nF) :: cell voltage from Gibbs energy
E: η_{max} = ΔG/ΔH :: thermodynamic efficiency
H: Losses
- **Activation** (kinetics, especially oxygen reduction).
- **Ohmic** (electrolyte resistance).
- **Mass transport** (concentration) at high current.
- Polarisation curve: V vs current density.
H: Types
P: **PEMFC** (80 °C, platinum catalysts, cars and buses), **SOFC** (600–1000 °C, ceramic electrolyte, fuel-flexible, high efficiency in CHP), **alkaline** (space missions), **phosphoric acid**, **molten carbonate**, **direct methanol**. Challenges: platinum cost and durability, hydrogen supply, degradation. Applications: heavy vehicles, backup power, combined heat and power, forklifts.
X: Efficiency of a PEM cell running at 0.7 V (HHV basis)?
> η ≈ V/1.48 = 0.7/1.48 ≈ 47%
X: Current from consuming 1 g of H_{2} per minute?
> 0.5 mol min^{-1} × 2 × 96 485 C mol^{-1} ≈ 96 500 C min^{-1} ≈ 1600 A
K: Fuel cells convert chemical to electrical energy directly; efficiency is limited by ΔG/ΔH and electrochemical losses, not Carnot.
!: Fuel cell efficiency falls at high current density; operating point balances power and efficiency.
Q: Why are fuel cells not Carnot-limited? | They convert chemical energy electrochemically, not via heat.
Q: What are the three main voltage losses? | Activation, ohmic and mass-transport (concentration) losses.
M1: The reversible H_{2}/O_{2} cell voltage is: | 1.23 V | 0.5 V | 3.7 V | 12 V | ΔG/2F.
M2: SOFCs operate at: | 600–1000 °C | Room temperature | 80 °C | −20 °C | Ceramic electrolyte.

## Batteries and electrochemical energy storage
S: Batteries store energy chemically and release it as electricity through redox reactions. Lithium-ion batteries power phones, cars and grids, and improving their energy density, cost, safety and lifetime is central to electrification.
H: Fundamentals
- Two electrodes with different chemical potentials separated by an electrolyte and separator.
- Cell voltage V = (μ_{cathode} − μ_{anode})/e (approx.); Li-ion ~3.6–3.7 V.
- Capacity (Ah), energy (Wh = Ah × V), C-rate (1C = full discharge in 1 hour).
- Specific energy: Li-ion cells ~150–300 Wh kg^{-1}; lead–acid ~35.
E: E = QV :: stored energy
E: Q_{theor} = nF/(3.6M) mAh g^{-1} :: theoretical specific capacity
H: Lithium-ion chemistry
- Intercalation: Li^{+} shuttles between graphite anode (LiC_{6}) and oxide cathode.
- Cathodes: NMC (high energy), LFP (LiFePO_{4}, safe, long-lived, cheaper), NCA, LMO.
- SEI (solid electrolyte interphase) forms on the anode, protecting it but consuming lithium.
- Degradation: SEI growth, lithium plating (fast charging, cold), cathode cracking.
H: Beyond Li-ion and safety
P: Thermal runaway can occur above ~150 °C as exothermic reactions cascade; battery management systems monitor voltage, current and temperature. Solid-state batteries promise higher energy and safety; sodium-ion offers cheaper, abundant materials; flow batteries (vanadium) suit long-duration grid storage. Pack prices fell from >$1000 kWh^{-1} (2010) to ~$110–140 kWh^{-1} (2023–24). Recycling recovers Li, Co, Ni.
X: Theoretical capacity of graphite (LiC_{6}, M = 72 g mol^{-1} for C_{6}, n = 1)?
> Q = 96 485/(3.6 × 72) ≈ 372 mAh g^{-1}
X: A 75 kWh EV pack at 400 V. Capacity in Ah? Current at 2C?
> 75 000/400 ≈ 188 Ah
> 2C ≈ 375 A (150 kW charging)
K: Batteries store energy by redox; voltage comes from electrode chemistry, capacity from how much charge they can host.
!: Fast charging and extreme temperatures accelerate degradation; lithium plating at low temperature is a common failure path.
Q: What is the SEI? | The solid electrolyte interphase, a passivating film on the anode formed by electrolyte decomposition.
Q: Why is LFP popular for grid and some EVs? | It is safer, cheaper and longer-lived, though with lower energy density.
M1: A 1C rate discharges a battery in: | 1 hour | 1 minute | 10 hours | 1 day | Definition of C-rate.
M2: Thermal runaway is: | Self-heating chain reactions in a cell | Normal operation | Cooling failure only | A charging method | Cascading exothermic reactions.

## Supercapacitors
S: Supercapacitors store energy electrostatically at electrode–electrolyte interfaces, delivering power quickly and surviving hundreds of thousands of cycles. They complement batteries where bursts of power, fast charging and long life matter more than energy density.
H: How they work
- **Electric double-layer capacitors (EDLC)**: ions form a layer ~1 nm from high-surface-area carbon electrodes (~1000–2000 m^{2} g^{-1}).
- Capacitance C = εA/d with tiny d and huge A: thousands of farads.
- **Pseudocapacitors**: fast surface redox (RuO_{2}, MnO_{2}, MXenes) adds capacitance.
- **Hybrid** (lithium-ion capacitors) combine battery and capacitor electrodes.
E: E = ½CV^{2} :: stored energy
E: P_{max} = V^{2}/(4R_{ESR}) :: maximum power
H: Performance
- Specific energy ~5–10 Wh kg^{-1} (vs Li-ion ~250); specific power ~10 kW kg^{-1}.
- Voltage limited by electrolyte stability: ~2.7 V (organic), ~1 V (aqueous).
- Cycle life >10^{5}–10^{6}; work well at low temperatures.
- Ragone plots compare energy vs power density.
H: Applications
P: Regenerative braking in buses and trams, start–stop systems, wind turbine pitch control, grid frequency regulation, memory backup, camera flashes and power smoothing alongside batteries. Voltage falls linearly with discharge, so DC–DC converters are needed.
X: A 3000 F supercapacitor at 2.7 V. Energy stored?
> E = ½ × 3000 × 7.29 ≈ 10.9 kJ ≈ 3.0 Wh
X: ESR = 0.3 mΩ. Maximum power at 2.7 V?
> P = 7.29/(4 × 0.0003) ≈ 6 kW
K: Supercapacitors trade energy density for power and cycle life; energy ∝ CV^{2}.
!: Usable energy is less than ½CV^{2} because voltage falls during discharge; converters stop working at low voltage.
Q: Why do supercapacitors have huge capacitance? | Enormous electrode surface area and nanometre charge separation.
Q: What is a Ragone plot? | A chart of specific energy versus specific power for storage technologies.
M1: Supercapacitor cycle life is typically: | Over 100 000 cycles | 500 cycles | 10 cycles | 1 cycle | Electrostatic, no chemical change.
M2: Doubling voltage multiplies stored energy by: | 4 | 2 | 8 | √2 | ½CV^{2}.

## Thermoelectric energy conversion
S: Thermoelectric devices convert heat directly into electricity (Seebeck effect) or use electricity to pump heat (Peltier effect), with no moving parts. They power deep-space probes, recover waste heat and cool electronics, limited by modest efficiency.
H: Effects
- **Seebeck**: a temperature difference across a material produces a voltage, V = SΔT.
- **Peltier**: current through a junction absorbs or releases heat, Q̇ = ΠI with Π = ST.
- **Thomson**: heat in a single conductor with current and temperature gradient.
E: V = SΔT :: Seebeck voltage
E: ZT = S^{2}σT/κ :: figure of merit
H: Efficiency
- Good thermoelectrics need high S, high electrical conductivity σ and low thermal conductivity κ: "phonon glass, electron crystal".
- Bi_{2}Te_{3} (room temperature, ZT ~1), PbTe (mid T), SiGe (high T, used in RTGs), skutterudites, half-Heuslers.
- Maximum efficiency η = η_{C}(√(1 + ZT) − 1)/(√(1 + ZT) + T_{c}/T_{h}).
- ZT ~1 gives roughly 15–20% of the Carnot efficiency, which means about 5–8% conversion for moderate temperature differences.
E: η = (ΔT/T_{h})(√(1+ZT) − 1)/(√(1+ZT) + T_{c}/T_{h}) :: maximum efficiency
H: Applications
P: Radioisotope thermoelectric generators (Pu-238) powered Voyager, Cassini and Curiosity for decades. Peltier coolers chill laser diodes, CCDs and portable fridges. Automotive exhaust heat recovery and body-heat wearables are explored. Nanostructuring reduces κ through phonon scattering to raise ZT.
X: A junction with S = 200 μV K^{-1} across ΔT = 100 K. Voltage? How many couples for 5 V?
> V = 200 × 10^{-6} × 100 = 0.02 V
> ~250 couples
X: Max efficiency with T_{h} = 500 K, T_{c} = 300 K, ZT = 1.
> η_{C} = 0.4; √2 = 1.414
> η = 0.4 × 0.414/(1.414 + 0.6) ≈ 0.4 × 0.206 ≈ 8.2%
K: Thermoelectrics convert heat and electricity directly; ZT = S^{2}σT/κ sets efficiency.
!: Good electrical conductors usually conduct heat well too; decoupling σ and κ is the central materials challenge.
Q: What is the Seebeck effect? | Generation of voltage from a temperature difference across a material.
Q: What powers Voyager? | Radioisotope thermoelectric generators using Pu-238 decay heat.
M1: A high ZT requires: | High S and σ, low κ | High κ | Low S | Metals only | Phonon glass, electron crystal.
M2: Peltier coolers work by: | Pumping heat with current at junctions | Evaporation | Compression | Magnetism | Π = ST.

## Heat pumps
S: Heat pumps move heat from a cold place to a warm one using work, delivering three to four units of heat per unit of electricity. They are the most efficient way to heat buildings and are central to decarbonising heating.
H: The cycle
- Vapour-compression cycle: evaporator absorbs heat at low T; compressor raises pressure and temperature; condenser releases heat; expansion valve drops pressure.
- Refrigerants: R-32, R-290 (propane), CO_{2} (R-744); low global-warming potential is now required.
- A fridge is a heat pump; so is an air conditioner (reversed).
H: Coefficient of performance
- COP_{heating} = Q_{h}/W; Carnot COP = T_{h}/(T_{h} − T_{c}).
- Real COP ~40–50% of Carnot; air-source heat pumps achieve seasonal COP ~3–4.
- COP falls as the temperature lift increases, so low-temperature radiators or underfloor heating help.
E: COP_{h} = Q_{h}/W ≤ T_{h}/(T_{h} − T_{c}) :: heating COP
E: COP_{h} = COP_{c} + 1 :: relation between heating and cooling COP
H: Types and integration
P: Air-source (cheapest), ground-source (stable temperatures, higher COP), water-source and large heat pumps for district heating. Hot-water cylinders and thermal mass let heat pumps shift demand to cheap or low-carbon hours. Compared with a 90% gas boiler, a COP-3 heat pump uses ~one-third of the energy and, with clean electricity, emits far less CO_{2}.
X: Carnot COP for delivering heat at 35 °C from outside air at 0 °C?
> COP = 308/35 ≈ 8.8; real ~4
X: A house needs 12 000 kWh of heat per year. Electricity at seasonal COP 3.5?
> 12 000/3.5 ≈ 3400 kWh
K: Heat pumps move rather than make heat, giving COPs of 3–4; small temperature lifts maximise efficiency.
!: Heat pumps work in cold climates too, but COP drops in very cold weather; sizing and emitter temperatures matter.
Q: What is the COP of a heat pump? | Heat delivered divided by work input.
Q: Why do underfloor heating systems suit heat pumps? | They run at low water temperatures, reducing the temperature lift and raising COP.
M1: Heating COP is greater than cooling COP by: | 1 | 0 | 2 | 10 | Q_{h} = Q_{c} + W.
M2: Heat pump COP rises when: | The temperature lift falls | Outside gets colder | Radiators run hotter | Refrigerant leaks | Carnot dependence.

## Energy efficiency
S: Energy efficiency means getting the same service, such as warmth, light, motion or computation, with less energy. It is often the cheapest and fastest way to cut emissions and costs, from insulating homes to efficient motors and LEDs.
H: Buildings
- Heat loss: Q̇ = UAΔT; U-values: single glazing ~5.7 W m^{-2} K^{-1}, triple glazing ~0.8, insulated wall ~0.2.
- Air tightness and ventilation with heat recovery (MVHR).
- Passivhaus standard: ~15 kWh m^{-2} per year heating demand (~10% of typical older buildings).
- Degree-days estimate seasonal heating needs.
E: Q̇ = UAΔT :: fabric heat loss
E: Q_{season} = UA × DD × 24 h :: annual heat loss from degree-days
H: Lighting, motors and appliances
- LEDs ~150 lm W^{-1} vs incandescent ~15: 90% savings.
- Motors use ~45% of global electricity; variable-speed drives cut pump/fan energy (power ∝ speed^{3} for fans).
- Standby power, efficient appliances, data-centre cooling (PUE).
H: Rebound and policy
P: Rebound (Jevons) effects: cheaper energy services can increase use, offsetting part of savings (typically 10–30% direct rebound). Standards (appliance labels, building codes), incentives and smart controls drive adoption. Efficiency also reduces peak demand and grid infrastructure needs.
X: A 10 m^{2} single-glazed window replaced by triple glazing. Heat loss saving at ΔT = 20 K?
> Single: 5.7 × 10 × 20 = 1140 W; triple: 0.8 × 10 × 20 = 160 W
> Saving ≈ 980 W
X: Reducing a fan's speed by 20%: power change?
> P ∝ n^{3}: 0.8^{3} = 0.51, almost half the power
K: Efficiency lowers energy for the same service; insulation, LEDs, heat pumps and variable-speed drives give big gains.
!: Efficiency gains can be partly offset by rebound effects; policies should account for behaviour.
Q: What is a U-value? | Heat flow per unit area per kelvin through a building element.
Q: What is the rebound effect? | Increased consumption that offsets part of efficiency savings.
M1: Fan power scales with speed as: | n^{3} | n | n^{2} | constant | Affinity laws.
M2: LEDs save about how much energy compared with incandescent bulbs? | ~90% | ~10% | ~50% | ~0% | ~10× more efficient.

## Grid storage
S: Grid storage stores electricity when supply exceeds demand and releases it later, balancing variable wind and solar. Different technologies cover timescales from seconds (frequency response) to seasons (hydrogen, pumped hydro).
H: Services by timescale
- **Seconds**: frequency response, inertia (batteries, flywheels, supercapacitors, synchronous condensers).
- **Minutes–hours**: peak shifting, solar time-shift (batteries, pumped hydro).
- **Days–weeks**: wind lulls (pumped hydro, compressed air, flow batteries, thermal).
- **Seasonal**: hydrogen, synthetic fuels, large reservoirs, thermal stores.
H: Technologies
- **Pumped hydro**: ~90% of global storage energy; 70–85% round trip.
- **Lithium-ion**: dominant new build, 85–95% round trip, 1–4 hour durations.
- **Compressed air (CAES)**: caverns; adiabatic designs recover heat (~60–70%).
- **Flow batteries**: decouple power and energy; long duration.
- **Thermal**: molten salt, hot rocks, "Carnot batteries".
- **Gravity**, **liquid air**, **flywheels**.
E: η_{RT} = E_{out}/E_{in} :: round-trip efficiency
E: Duration = E_{storage}/P_{rated} :: storage duration (hours)
H: Economics
P: Storage is valued by power (MW), energy (MWh), round-trip efficiency, response time, cycle life and cost per kWh delivered (levelised cost of storage). Batteries earn money from arbitrage and ancillary services. High-renewable grids need a portfolio: short-duration batteries, long-duration storage, interconnectors, demand response and flexible generation.
X: A 100 MW / 400 MWh battery with 90% round-trip. Duration and energy needed to fill it?
> Duration = 4 h
> Charging energy ≈ 400/0.9 ≈ 444 MWh
X: Arbitrage: buy at £30/MWh, sell at £120/MWh, 85% round trip. Profit per MWh delivered?
> Cost per delivered MWh = 30/0.85 ≈ £35; profit ≈ £85
K: Storage matches supply and demand across timescales; a mix of technologies is needed for a renewable grid.
!: Power rating and energy capacity are different; a 100 MW battery may hold only 1 hour of energy.
Q: What fraction of global grid storage is pumped hydro? | About 90% of energy capacity.
Q: Why are flow batteries suited to long duration? | Energy is stored in tanks of electrolyte, scalable independently of power.
M1: Round-trip efficiency of lithium-ion is about: | 85–95% | 30% | 50% | 99.9% | High efficiency.
M2: Seasonal storage is best served by: | Hydrogen or large reservoirs | Supercapacitors | Flywheels | 1-hour batteries | Large energy capacity.

## Energy transmission and losses
S: Electricity travels from power plants to users through transmission and distribution networks. High voltages reduce resistive losses, and long-distance HVDC links connect renewable resources across countries and seas.
H: Why high voltage?
- Power P = VI; resistive loss P_{loss} = I^{2}R.
- For fixed power, I = P/V, so P_{loss} = P^{2}R/V^{2}: doubling voltage quarters losses.
- Transmission 132–765 kV; distribution 11–33 kV; homes 230 V (UK/EU) or 120 V (US).
- Transformers step voltages up and down efficiently (~99%+).
E: P_{loss} = I^{2}R = (P/V)^{2}R :: resistive loss
E: P_{loss}/P = PR/V^{2} :: fractional loss
H: AC and DC
- AC dominates (easy transformation); reactive power, skin effect, stability limits over long distances.
- **HVDC**: lower losses over long distances (~3% per 1000 km), no reactive power, essential for undersea cables >~50–80 km and linking asynchronous grids.
- Converter stations are expensive; break-even distance ~600–800 km overhead.
H: Losses and the grid
P: Typical network losses ~6–8% of generation (more in some countries). Losses include line resistance, transformer core and copper losses, and corona discharge on high-voltage lines. Smart grids, local generation and superconducting cables reduce losses. Grid frequency (50/60 Hz) must stay tightly balanced; inertia from rotating machines and fast storage responses maintain stability.
X: 500 MW sent over a line with R = 10 Ω at 400 kV versus 132 kV. Losses?
> 400 kV: I = 1250 A; loss = 1250^{2} × 10 ≈ 15.6 MW (3.1%)
> 132 kV: I ≈ 3790 A; loss ≈ 144 MW (29%)
X: An HVDC link loses 3% per 1000 km. Loss over 2000 km?
> ~6% (plus ~1–1.5% in converters)
K: High voltage cuts current and I^{2}R losses; HVDC wins for long distances and undersea links.
!: Losses scale with current squared, not voltage; raising voltage is the key to efficient transmission.
Q: Why is electricity transmitted at high voltage? | To reduce current and hence I^{2}R losses for the same power.
Q: When is HVDC preferred? | For long distances, undersea cables and connecting asynchronous grids.
M1: Doubling transmission voltage changes losses by: | 1/4 | 1/2 | 2 | 4 | Loss ∝ 1/V^{2}.
M2: Undersea cables over ~80 km usually use: | HVDC | Low-voltage AC | Superconductors only | Wireless | AC cable capacitance is too high.

## Energy systems modelling
S: Energy systems models simulate how energy is supplied, converted, stored and used across a region over time. They help plan least-cost pathways to net zero, test policies and reveal trade-offs between technologies, reliability and emissions.
H: Model types
- **Optimisation (bottom-up)**: minimise total system cost subject to demand and constraints (TIMES, PyPSA, OSeMOSYS).
- **Simulation**: hourly dispatch to test reliability and operation.
- **Integrated assessment models**: link energy, economy, land use and climate (IPCC scenarios).
- **Agent-based**: decisions of households and firms.
H: Key inputs and constraints
- Demand profiles (hourly, seasonal), weather data for wind and solar (capacity factors).
- Technology costs (capital, operating), lifetimes, efficiencies, emissions.
- Grid constraints, storage, interconnection, carbon budgets.
- Levelised cost of electricity: LCOE = Σ(costs discounted)/Σ(energy discounted).
E: LCOE = [Σ(I_{t} + O_{t} + F_{t})/(1+r)^{t}]/[ΣE_{t}/(1+r)^{t}] :: levelised cost of electricity
H: Insights and limits
P: Models show that high-renewable systems need flexibility (storage, interconnection, demand response, overbuild) and that integrating costs beyond LCOE matters. Results depend on assumptions: discount rates, cost projections and weather years (rare "dunkelflaute" periods of low wind and sun drive storage needs). Open models and data improve transparency.
X: A plant costs £1000 per kW, operates 40% of the time for 25 years, with 7% discount rate (capital recovery factor ≈ 0.0858). Capital cost per MWh?
> Annual cost per kW = £85.8; energy = 0.4 × 8760 = 3504 kWh
> ≈ £0.0245 per kWh ≈ £24.5 per MWh (before operating costs)
K: Energy models optimise or simulate systems hourly to find reliable low-cost decarbonisation pathways, but their answers depend on assumptions.
!: LCOE alone ignores when and where energy is produced; system value matters for variable renewables.
Q: What does LCOE represent? | The average discounted lifetime cost per unit of electricity generated.
Q: What is a dunkelflaute? | A prolonged period of low wind and low sunshine, stressing renewable systems.
M1: PyPSA is an example of: | An open energy system optimisation model | A battery chemistry | A wind turbine | A grid code | Python for Power System Analysis.
M2: Higher discount rates favour technologies with: | Low capital costs | High capital costs | Long lifetimes | No fuel | Future savings count less.

## Life-cycle energy analysis
S: Life-cycle analysis counts energy use and emissions over a product's whole life, from extracting raw materials to manufacturing, operation and disposal. It reveals whether a technology truly saves energy and carbon, and how quickly it pays back.
H: Method (ISO 14040/44)
- **Goal and scope**: functional unit (e.g. per kWh delivered) and system boundaries (cradle-to-gate, cradle-to-grave).
- **Inventory**: energy, materials, emissions at each stage.
- **Impact assessment**: global warming potential, acidification, water, land use.
- **Interpretation**: sensitivity and uncertainty.
H: Key metrics
- **Energy payback time (EPBT)**: time to generate the energy used to build it.
- **EROI**: energy returned on energy invested over the lifetime.
- **Carbon intensity**: g CO_{2}e per kWh.
- Lifecycle values (median): coal ~820, gas ~490, solar PV ~40, nuclear ~12, wind ~11 g CO_{2}e kWh^{-1}.
E: EPBT = E_{embodied}/E_{annual output} :: energy payback time
E: EROI = E_{lifetime output}/E_{invested} :: energy return on investment
H: Insights
P: Solar panels repay their energy in ~1–2 years and last 25–30 years. Electric cars have higher manufacturing emissions (battery) but lower lifetime emissions on most grids, breaking even after ~1–2 years of driving. Building materials (cement, steel) embed large emissions. LCA results depend strongly on assumptions about grid mixes, lifetimes and recycling.
X: A PV system embodies 3000 kWh and produces 1500 kWh per year for 30 years. EPBT and EROI?
> EPBT = 2 years
> EROI = 45 000/3000 = 15
X: An EV has 6 t extra manufacturing CO_{2} and saves 120 g km^{-1}. Break-even distance?
> 6 × 10^{6} g/120 g km^{-1} = 50 000 km
K: LCA counts cradle-to-grave impacts; payback times and EROI show whether technologies deliver net benefits.
!: Comparing LCAs with different boundaries or functional units can mislead; check what is included.
Q: What is a functional unit in LCA? | The quantified service used as the basis for comparison, e.g. 1 kWh of electricity.
Q: What is EROI? | Lifetime energy delivered divided by energy invested.
M1: Wind power's lifecycle carbon intensity is roughly: | 11 g CO_{2}e kWh^{-1} | 500 g | 820 g | 0 g exactly | Very low.
M2: A cradle-to-grave LCA includes: | Extraction through disposal | Only operation | Only manufacturing | Only transport | Full lifecycle.

## Energy security and sustainability
S: Energy security means reliable, affordable access to energy; sustainability means meeting today's needs without harming future generations or the climate. Balancing the two, alongside equity, shapes energy policy worldwide.
H: Energy security
- **Supply diversity**: avoid dependence on single fuels or suppliers (2022 gas crisis in Europe).
- **Resilience**: withstand extreme weather, cyber attacks and failures.
- **Affordability**: price spikes harm households and industry.
- **Critical minerals**: lithium, cobalt, nickel, rare earths, copper; concentrated supply chains (e.g. refining in China).
H: Sustainability and climate
- Energy produces ~3/4 of greenhouse gas emissions.
- Net zero by ~2050 to limit warming to ~1.5–2 °C (Paris Agreement).
- Pathways: decarbonise electricity, electrify end uses, efficiency, hydrogen and fuels for hard-to-abate sectors, carbon removal.
- Carbon budget: remaining budget for 1.5 °C (50% chance) was ~250 Gt CO_{2} from 2023, about six years of current emissions.
E: Emissions = population × (GDP/person) × (energy/GDP) × (CO_{2}/energy) :: Kaya identity
H: The energy trilemma
P: Policies balance security, affordability and sustainability. Domestic renewables improve security against fuel imports but require flexible grids and secure mineral supply. Energy poverty affects ~700 million people without electricity; a just transition protects workers and communities. Circular economy approaches (recycling, reuse) reduce mineral dependence.
X: Kaya: population grows 1%/yr, GDP per person 2%, energy intensity falls 1.5%, carbon intensity falls 2%. Emissions trend?
> ≈ 1 + 2 − 1.5 − 2 = −0.5% per year: slow decline, far too slow for net zero by 2050
X: At 40 Gt CO_{2} per year, how long does a 250 Gt budget last?
> ~6 years
K: Energy policy balances security, affordability and sustainability; renewables, efficiency and electrification can serve all three if supply chains and grids are secure.
!: Shifting from fossil fuels to minerals changes, rather than removes, supply-chain risks.
Q: What is the energy trilemma? | Balancing energy security, affordability and environmental sustainability.
Q: What does the Kaya identity decompose? | Emissions into population, wealth per person, energy intensity and carbon intensity.
M1: Roughly what fraction of greenhouse emissions comes from energy? | Three quarters | One tenth | All | One half exactly | Including transport, heat, industry.
M2: Critical minerals for batteries include: | Lithium, cobalt and nickel | Gold and silver | Helium | Uranium only | Battery cathodes and anodes.
`;
