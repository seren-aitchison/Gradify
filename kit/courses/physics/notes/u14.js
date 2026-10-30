// Unit 14: Heat Transfer and Thermal Physics. Format: kit/course/notes.js
export default `
## Conduction
S: Conduction transfers heat through a material without bulk motion, by collisions between neighbouring particles and, in metals, by free electrons. It's why a metal spoon in tea gets hot and why insulation works.
H: Mechanisms
- **Gases**: molecular collisions; low conductivity (air 0.026 W m^{-1} K^{-1}).
- **Non-metallic solids**: lattice vibrations (phonons). Diamond is exceptional (~2000 W m^{-1} K^{-1}): stiff, light atoms.
- **Metals**: free electrons carry most heat (copper 400, aluminium 237). Good electrical conductors are good thermal conductors (Wiedemann–Franz law: κ/σ = LT, L = 2.44 × 10^{-8} W Ω K^{-2}).
H: Steady conduction
E: P = κAΔT/L
- Composite walls: thermal resistances add in series, R = L/(κA).
X: A copper rod (L = 0.5 m, A = 1 cm^{2}) has ends at 100 °C and 20 °C. Heat flow?
> P = 400 × 10^{-4} × 80/0.5 = 6.4 W
!: Materials that feel cold (metal, stone) aren't colder; they conduct heat away from your hand faster.
Q: Why are metals good thermal conductors? | Free electrons carry heat efficiently, as well as lattice vibrations.
Q: What is the Wiedemann–Franz law? | The ratio of thermal to electrical conductivity in metals is proportional to temperature: κ/σ = LT.
M1: Which conducts heat best? | Diamond | Wood | Air | Glass | Exceptionally high phonon conductivity.
M2: Doubling the thickness of a wall changes conductive heat loss by: | ×1/2 | ×2 | ×4 | No change | P ∝ 1/L.

## Convection
S: Convection transfers heat by bulk movement of a fluid. Warm fluid rises because it's less dense, carrying energy with it. Convection drives weather, ocean currents, boiling, and cooling of everything from computers to stars.
H: Types
- **Natural (free) convection**: buoyancy-driven (radiator warming a room, sea breezes).
- **Forced convection**: pumps or fans drive flow (car radiators, CPU fans).
- **Phase-change convection**: boiling and condensation, very high heat transfer.
H: Heat transfer coefficient
E: P = hAΔT
- h (W m^{-2} K^{-1}): still air ~5–25; moving air 10–200; water 50–10 000; boiling water 2500–100 000.
- Dimensionless numbers: Nusselt (convective/conductive), Rayleigh (onset of natural convection), Prandtl.
H: In nature
P: The atmosphere's Hadley cells, sea and land breezes, mantle convection driving plate tectonics, and convection zones in the outer third of the Sun (granulation visible on its surface) are all convection.
X: A 1 m^{2} radiator at 60 °C in 20 °C air with h = 10 W m^{-2} K^{-1}. Convective heat output?
> P = 10 × 1 × 40 = 400 W (plus radiation)
!: Convection can't happen in solids or in a vacuum; it needs a fluid that can flow.
Q: What drives natural convection? | Buoyancy: warmer, less dense fluid rises and cooler fluid sinks.
Q: Why is boiling such an effective way to remove heat? | Latent heat absorption and vigorous fluid motion give very high heat transfer coefficients.
M1: A sea breeze blows during the day because: | Land heats faster, air above it rises and cooler sea air flows in | The sea is warmer | The Moon's gravity | Air is pushed by waves | Differential heating.
M2: Convective heat transfer is largest with: | Boiling water | Still air | Moving air | Vacuum | Highest h.

## Thermal radiation
S: Every object above absolute zero emits electromagnetic radiation because of the thermal motion of its charges. Radiation needs no medium: it's how the Sun warms the Earth and how hot objects glow.
H: Features
- Spectrum depends on temperature; at room temperature it peaks in the infrared (~10 μm).
- Hotter objects radiate much more (∝ T^{4}) and at shorter wavelengths.
- Surfaces differ in emissivity: shiny metals emit and absorb poorly; matt black surfaces well.
H: Net exchange
E: P_{net} = εσA(T^{4} − T_{surr}^{4})
- At small ΔT: P ≈ 4εσAT^{3}ΔT (a radiative heat transfer coefficient of ~6 W m^{-2} K^{-1} at room temperature).
H: Applications
- Thermal imaging cameras, infrared thermometers.
- Vacuum flasks: silvered walls reduce radiation; vacuum stops conduction and convection.
- Space radiators reject heat from spacecraft by radiation only.
- Night-time frost forms on clear nights as surfaces radiate to the cold sky.
X: Net radiation from a person (A = 1.8 m^{2}, ε = 0.97, skin 307 K) in a 293 K room?
> P = 0.97 × 5.67 × 10^{-8} × 1.8 × (307^{4} − 293^{4})
> ≈ 150 W: a large part of resting heat loss
!: A hot object in a hot room radiates just as much as in a cold room; it's the net exchange that changes.
Q: Why does a vacuum flask have silvered walls? | Low emissivity reduces heat transfer by radiation.
Q: Why does frost form on clear nights? | Surfaces radiate to the cold, clear sky and cool below air temperature.
M1: Thermal radiation can travel through: | A vacuum | Only solids | Only liquids | Only air | EM waves.
M2: A body's radiated power quadruples when its absolute temperature increases by a factor of: | √2 | 2 | 4 | 16 | T^{4}.

## Fourier's law of heat conduction
S: Fourier's law states that heat flux is proportional to the temperature gradient and flows down it. Combined with energy conservation, it gives the heat equation, the model for diffusion of heat in any material.
H: The law
E: q = −κ∇T :: heat flux (W m^{-2})
E: ∂T/∂t = α∇^{2}T + Q/(ρc), α = κ/(ρc) :: heat equation
H: Steady-state solutions
- Plane wall: linear T profile.
- Cylinder (pipe insulation): T varies as ln r; P = 2πκLΔT/ln(r_{2}/r_{1}).
- Sphere: P = 4πκΔT r_{1}r_{2}/(r_{2} − r_{1}).
- Critical insulation radius: for small pipes, adding thin insulation can increase heat loss by adding surface area (r_{crit} = κ/h).
H: History
P: Fourier (1822) developed his law and, to solve the heat equation, invented Fourier series. He used them to estimate how deep seasonal temperature waves penetrate the ground, and was one of the first to suggest the atmosphere traps heat (a precursor of the greenhouse effect).
X: How deep does a daily temperature cycle penetrate soil (α = 5 × 10^{-7} m^{2} s^{-1})?
> Penetration depth δ = √(2α/ω), ω = 7.3 × 10^{-5} s^{-1}
> δ ≈ 0.12 m; annual cycle: √365 ≈ 19× deeper, ~2.3 m
!: Fourier's law assumes local equilibrium; it fails at nanoscales or very short times (ballistic phonons, second sound).
Q: State Fourier's law. | Heat flux is proportional to and opposite the temperature gradient: q = −κ∇T.
Q: What equation results from Fourier's law plus energy conservation? | The heat (diffusion) equation.
M1: The temperature profile through a uniform plane wall in steady state is: | Linear | Exponential | Logarithmic | Parabolic | Constant flux.
M2: Seasonal temperature swings penetrate deeper than daily ones because: | Lower frequency waves penetrate deeper | Summer is hotter | Soil changes | Rain carries heat | δ ∝ 1/√ω.

## Newton's law of cooling
S: Newton's law of cooling says an object's rate of heat loss is proportional to the temperature difference between it and its surroundings. Its temperature then approaches the surroundings exponentially.
H: The law
E: dT/dt = −k(T − T_{s})
E: T(t) = T_{s} + (T_{0} − T_{s})e^{−kt}, k = hA/(mc)
- Time constant τ = mc/(hA): larger, denser objects cool more slowly.
H: Validity
- Good for forced convection and small temperature differences.
- Natural convection (h ∝ ΔT^{1/4}) and radiation (∝ T^{4}) make it only approximate for large ΔT.
- The lumped model needs uniform temperature inside: Biot number Bi = hL/κ < 0.1.
H: Applications
- Forensic science: time of death from body cooling (with corrections).
- Coffee cooling, food safety, electronics cooling.
X: Coffee at 90 °C in a 20 °C room cools to 60 °C in 10 min. When does it reach 40 °C?
> e^{−10k} = 40/70 ⇒ k = 0.056 min^{-1}
> e^{−kt} = 20/70 ⇒ t = 22.4 min
!: Newton's law is an empirical approximation, not a fundamental law; it fails for large temperature differences and for objects with internal temperature gradients.
Q: State Newton's law of cooling. | The rate of cooling is proportional to the temperature difference with the surroundings.
Q: What does the Biot number test? | Whether an object can be treated as having uniform internal temperature (Bi < 0.1).
M1: Under Newton's law, temperature difference decays: | Exponentially | Linearly | As 1/t | Not at all | First-order ODE.
M2: A larger object of the same material cools: | More slowly | Faster | At the same rate | Instantly | τ ∝ mass/area ∝ size.

## Stefan–Boltzmann law
S: The Stefan–Boltzmann law gives the total power radiated by a blackbody: proportional to its surface area and the fourth power of its absolute temperature. It lets us find stars' sizes and planets' temperatures.
H: The law
E: P = σAT^{4}, σ = 5.67 × 10^{-8} W m^{-2} K^{-4}
E: P = εσAT^{4} :: real (grey) surfaces
E: σ = 2π^{5}k_{B}^{4}/(15h^{3}c^{2}) :: from integrating Planck's law
H: Stars
E: L = 4πR^{2}σT^{4}
- Measure luminosity (from brightness and distance) and temperature (from colour or Wien's law), then find radius. Betelgeuse: ~900 R_{⊙}.
H: Planetary temperature
E: T_{eq} = T_{⊙}√(R_{⊙}/(2d))(1 − A)^{1/4}
- Earth (albedo 0.3): T_{eq} ≈ 255 K; actual average 288 K. The 33 K difference is the greenhouse effect.
X: A star has the Sun's temperature but 100 times its luminosity. Radius?
> L ∝ R^{2}T^{4} ⇒ R = 10 R_{⊙}
!: Use kelvin; T^{4} magnifies any error, and Celsius gives nonsense.
Q: State the Stefan–Boltzmann law. | A blackbody radiates P = σAT^{4}.
Q: How can a star's radius be found? | From its luminosity and temperature: L = 4πR^{2}σT^{4}.
M1: The Sun's surface (5800 K) emits per m^{2}: | 64 MW | 64 kW | 640 W | 6.4 GW | σT^{4} ≈ 6.4 × 10^{7}.
M2: Without greenhouse gases, Earth's mean temperature would be about: | 255 K | 288 K | 300 K | 200 K | Radiative equilibrium with albedo 0.3.

## Wien's displacement law
S: Wien's law says the wavelength at which a blackbody's emission peaks is inversely proportional to its temperature. Hotter objects glow bluer; it's how we read the temperatures of stars from their colours.
H: The law
E: λ_{max}T = b = 2.898 × 10^{-3} m K
E: f_{max} = 5.88 × 10^{10} Hz K^{-1} × T :: peak in frequency (not c/λ_{max})
H: Examples
- Sun (5800 K): ~500 nm, green-yellow (we see white).
- Human body (310 K): ~9.3 μm, thermal infrared (thermal cameras use 8–14 μm).
- Red-hot iron (~1000 K): ~2.9 μm, mostly infrared; only the short-wavelength tail is visible red.
- CMB (2.725 K): ~1.06 mm.
- Blue-white stars (25 000 K): ~120 nm, ultraviolet.
H: Colour temperature
P: Light sources are described by colour temperature: incandescent bulbs ~2700 K (warm), daylight ~5500–6500 K (cool). Stellar spectral classes O, B, A, F, G, K, M run from hot to cool.
X: A star's spectrum peaks at 290 nm. Its surface temperature?
> T = 2.898 × 10^{-3}/2.9 × 10^{-7} = 10 000 K
!: The peak in wavelength and the peak in frequency don't correspond to the same photon energy; specify which you mean.
Q: State Wien's displacement law. | λ_{max}T ≈ 2.9 × 10^{-3} m K.
Q: Why do thermal cameras work at 8–14 μm? | Objects near room and body temperature emit most strongly there.
M1: A hotter star appears: | Bluer | Redder | Dimmer always | Green | Shorter peak wavelength.
M2: The peak wavelength of the human body's emission is about: | 9 μm | 500 nm | 1 mm | 100 nm | 2.9 × 10^{-3}/310.

## Thermal diffusivity
S: Thermal diffusivity measures how quickly temperature changes spread through a material. It combines conductivity (how well heat flows) with heat capacity per volume (how much heat is needed to warm it).
H: Definition
E: α = κ/(ρc) :: m^{2} s^{-1}
E: L ~ √(αt) :: diffusion length after time t
- Copper 1.1 × 10^{-4}; steel 1.2 × 10^{-5}; water 1.4 × 10^{-7}; wood ~1 × 10^{-7}; air 2.2 × 10^{-5}.
H: Consequences
- High α: temperature equalises quickly (metal pans heat evenly).
- Low α: surfaces respond while interiors lag (thick stone walls keep buildings cool in summer days).
- Cooking time scales with thickness squared: a joint twice as thick takes about four times as long to cook through.
H: Measurement
P: The laser flash method heats one face of a thin disc with a short pulse and times the rear face's temperature rise: α = 0.139L^{2}/t_{1/2}.
X: How long for heat to diffuse through 2 cm of steak (α ≈ 1.4 × 10^{-7} m^{2} s^{-1})?
> t ~ L^{2}/α = (0.02)^{2}/1.4 × 10^{-7} ≈ 2900 s ≈ 48 min (order of magnitude)
!: High conductivity doesn't guarantee high diffusivity if the heat capacity per volume is large too (water conducts poorly and stores a lot).
Q: Define thermal diffusivity. | α = κ/(ρc), conductivity divided by volumetric heat capacity.
Q: How does diffusion time scale with thickness? | As thickness squared.
M1: Doubling a slab's thickness changes the time for heat to diffuse through by: | ×4 | ×2 | ×8 | ×1/2 | t ∝ L^{2}.
M2: Which has the highest thermal diffusivity? | Copper | Water | Wood | Brick | High κ, moderate ρc.

## Heat exchangers
S: Heat exchangers move heat from one fluid to another without mixing them. They're everywhere: car radiators, boilers, condensers, air conditioners, and the countercurrent blood vessels in a penguin's feet.
H: Types
- **Parallel flow**: both fluids enter at the same end; outlet temperatures approach each other.
- **Counterflow**: opposite directions; cold outlet can exceed hot outlet temperature; most efficient.
- **Crossflow**: perpendicular (car radiators).
- Shell-and-tube, plate, finned-tube designs.
H: Analysis
E: P = UAΔT_{lm}, ΔT_{lm} = (ΔT_{1} − ΔT_{2})/ln(ΔT_{1}/ΔT_{2}) :: log mean temperature difference
E: ε = P/P_{max} :: effectiveness (NTU method)
- U: overall heat transfer coefficient including both films and the wall (and fouling).
H: Nature's exchangers
P: Arctic birds' and mammals' legs use countercurrent exchange: warm arterial blood heats the cold venous blood returning from the feet, so little heat reaches the extremities. Fish gills use countercurrent flow to extract oxygen efficiently.
X: Counterflow: hot oil 150 → 90 °C; water 20 → 70 °C. Find ΔT_{lm}.
> ΔT_{1} = 150 − 70 = 80; ΔT_{2} = 90 − 20 = 70
> ΔT_{lm} = 10/ln(80/70) = 74.9 K
!: Using the arithmetic mean temperature difference instead of the log mean overestimates heat transfer when the end differences are very unequal.
Q: Why is counterflow more effective than parallel flow? | It maintains a larger temperature difference along the whole length.
Q: What is the log mean temperature difference? | (ΔT_{1} − ΔT_{2})/ln(ΔT_{1}/ΔT_{2}), the effective driving difference in an exchanger.
M1: A car radiator is mainly a: | Crossflow exchanger | Counterflow exchanger | Mixing tank | Heat engine | Air crosses the tubes.
M2: Penguins' feet stay cold because of: | Countercurrent heat exchange | Thick feathers on feet | Low blood flow only | Fat | Arterial heat passes to venous blood.

## Insulation and thermal resistance
S: Insulation slows heat flow. The idea of thermal resistance, like electrical resistance, lets you add up layers and paths to find the total heat loss of a wall, a house or a cryostat.
H: Thermal resistance
E: R = L/(κA) (K W^{-1}); P = ΔT/R
E: R_{conv} = 1/(hA)
E: U = 1/(R_{total}A) :: U-value (W m^{-2} K^{-1})
- Series layers: resistances add. Parallel paths (a wall with windows): conductances add.
H: Good insulators
- Trapped still air or gas: fibreglass, foam, wool, feathers (κ ~ 0.03–0.04).
- Aerogels: ~0.015; vacuum insulation panels: ~0.004.
- Thermal bridges (steel studs, window frames) can dominate heat loss.
H: Buildings
P: Typical U-values: single glazing ~5.8 W m^{-2} K^{-1}; double ~2.8; triple ~0.8; a modern insulated wall ~0.2. Passive-house designs combine insulation, airtightness and heat-recovery ventilation to need almost no heating.
X: A wall: 10 cm brick (κ = 0.7) + 10 cm mineral wool (κ = 0.04), area 1 m^{2}. U-value (ignoring surface films)?
> R = 0.1/0.7 + 0.1/0.04 = 0.14 + 2.5 = 2.64 K W^{-1}
> U = 0.38 W m^{-2} K^{-1}; the insulation does almost all the work
!: Insulation slows heat flow in both directions; it doesn't "add heat", and it keeps cold things cold as well as warm things warm.
Q: How do thermal resistances combine in series? | They add.
Q: Why do fluffy materials insulate well? | They trap still air, which has low conductivity and can't convect.
M1: Lower U-value means: | Better insulation | Worse insulation | Higher conductivity | More heat loss | Heat loss per area per K.
M2: A thermal bridge is: | A conductive path bypassing insulation | A type of heat exchanger | A heat pump | An insulating layer | e.g. steel through a wall.

## Blackbody and greybody radiation
S: A blackbody absorbs and emits perfectly at every wavelength; real surfaces don't. A greybody has the same emissivity at all wavelengths, a convenient approximation; truly selective surfaces vary strongly with wavelength.
H: Blackbody
- Absorptivity = emissivity = 1 at all wavelengths.
- Spectrum given by Planck's law; total by σT^{4}.
- A small hole in a cavity is an almost perfect blackbody.
H: Greybody
E: P = εσAT^{4}, 0 < ε < 1 (independent of λ)
- Approximation for many dull surfaces over a limited range.
H: Selective surfaces
- **Solar absorbers**: high absorptivity in the visible (~0.95), low emissivity in the infrared (~0.1): collectors get hotter.
- **Low-e glass**: transmits visible light, reflects thermal infrared back into the room.
- **Radiative cooling paints**: reflect sunlight and emit strongly in the 8–13 μm atmospheric window, cooling below ambient even in sunlight.
- Snow: white in the visible, almost black in the infrared.
X: Equilibrium temperature of a flat plate in sunlight (1000 W m^{-2}), insulated behind: black (ε = α = 1) vs selective (α = 0.95, ε = 0.1)?
> Black: σT^{4} = 1000 ⇒ T = 364 K
> Selective: 0.1σT^{4} = 950 ⇒ T = 634 K
!: White paint isn't low emissivity in the infrared; it's a good emitter of thermal radiation while reflecting sunlight.
Q: What is a greybody? | A surface with emissivity less than 1 but the same at all wavelengths.
Q: How does low-e glass save energy? | It transmits visible light but reflects thermal infrared back into the room.
M1: A cavity with a small hole approximates: | A blackbody | A mirror | A greybody with ε = 0.5 | A transparent body | Radiation entering is trapped.
M2: Radiative cooling works by emitting strongly in: | The 8–13 μm atmospheric window | Visible light | Ultraviolet | Microwaves | Radiation escapes to cold space.

## Emissivity and absorptivity
S: Emissivity is how well a surface emits thermal radiation compared with a blackbody; absorptivity is the fraction of incoming radiation it absorbs. Kirchhoff's law says they're equal at each wavelength in thermal equilibrium: good absorbers are good emitters.
H: Kirchhoff's law
E: ε(λ, T) = α(λ, T)
- Required by the second law: otherwise a body could heat itself above its surroundings.
- Only applies at the same wavelength (and direction, polarisation).
H: Typical emissivities (thermal infrared)
- Polished silver 0.02; aluminium foil 0.05; oxidised steel 0.8; paint (any colour) ~0.9; water 0.96; human skin 0.98.
H: Practical consequences
- Infrared thermometers need correct emissivity settings; shiny metals read far too cold.
- Emergency foil blankets reduce radiative heat loss.
- Leslie's cube (1804): faces of different finish at the same temperature radiate differently.
X: A thermal camera set for ε = 0.95 views polished aluminium (ε = 0.05) at 100 °C in a 20 °C room. What does it mostly see?
> Most "emission" from the aluminium is reflected room radiation
> It reads close to room temperature: a big error
!: Colour in the visible doesn't predict thermal infrared emissivity; black and white paint both have ε ≈ 0.9 in the infrared.
Q: State Kirchhoff's law of thermal radiation. | At each wavelength, emissivity equals absorptivity.
Q: Why do shiny metals read cold on infrared thermometers? | Their low emissivity means they emit little and mostly reflect the surroundings.
M1: A good absorber of a wavelength is also: | A good emitter at that wavelength | A poor emitter | A good reflector | Transparent | Kirchhoff.
M2: Foil emergency blankets work mainly by: | Reducing radiative heat loss | Conducting heat in | Generating heat | Blocking wind only | Low emissivity.

## Greenhouse effect
S: Greenhouse gases are transparent to most incoming sunlight but absorb and re-emit outgoing infrared. This keeps Earth's surface about 33 K warmer than it would otherwise be; adding more of these gases raises the temperature further.
H: Mechanism
- Sunlight (short wavelengths) passes through and warms the surface.
- The surface emits infrared (~10 μm).
- H_{2}O, CO_{2}, CH_{4}, N_{2}O and O_{3} absorb in particular infrared bands.
- Energy escapes to space from higher, colder layers, which radiate less; to balance incoming energy, the surface and lower atmosphere warm.
E: T_{eq} ≈ 255 K without, 288 K with (Earth)
H: Radiative forcing
E: ΔF ≈ 5.35 ln(C/C_{0}) W m^{-2} :: CO_{2}
E: ΔT = λΔF :: climate sensitivity λ ≈ 0.8 K per W m^{-2} (with feedbacks)
- Doubling CO_{2}: ΔF ≈ 3.7 W m^{-2}; equilibrium warming ~2.5–4 K (IPCC best estimate ~3 K).
- Feedbacks: water vapour (positive), ice–albedo (positive), clouds (uncertain), Planck response (negative).
H: Evidence
P: Infrared spectra from satellites show reduced outgoing radiation precisely in CO_{2} absorption bands. The stratosphere is cooling while the surface warms, the fingerprint of greenhouse warming rather than a brighter Sun. CO_{2} has risen from 280 ppm (pre-industrial) to over 420 ppm.
X: Forcing from CO_{2} rising from 280 to 420 ppm?
> ΔF = 5.35 ln(1.5) = 2.2 W m^{-2}
!: Garden greenhouses mainly work by stopping convection, not by trapping infrared; the atmospheric effect is named by loose analogy.
Q: Why are greenhouse gases transparent to sunlight but not to Earth's radiation? | Their absorption bands lie in the infrared, where Earth emits, not in the visible, where sunlight peaks.
Q: What fingerprint shows warming is greenhouse-driven? | The stratosphere cooling while the surface warms.
M1: Without the greenhouse effect, Earth's average surface temperature would be about: | −18 °C | 15 °C | 0 °C | −100 °C | 255 K.
M2: Radiative forcing from CO_{2} grows with concentration: | Logarithmically | Linearly | Exponentially | Not at all | Band saturation.

## Thermoelectric effects
S: Thermoelectric effects convert directly between heat and electricity in conducting materials. A temperature difference drives a voltage (Seebeck), a current carries heat (Peltier), and current in a temperature gradient absorbs or releases heat (Thomson).
H: The three effects
E: V = SΔT :: Seebeck: S is the Seebeck coefficient (μV K^{-1})
E: Q̇ = ΠI :: Peltier heat at a junction
E: Π = ST; dS/dT related to Thomson coefficient μ = T dS/dT :: Kelvin relations
- Metals: S ~ few μV K^{-1}; semiconductors (Bi_{2}Te_{3}): ~200 μV K^{-1}.
H: Figure of merit
E: ZT = S^{2}σT/κ
- Want high S, high electrical σ, low thermal κ: hard, because they're usually linked.
- Best materials ZT ~ 1–2; efficiency ~5–10% of heat to electricity, far below heat engines.
H: Why it works
P: Charge carriers diffuse from hot to cold, carrying both charge and heat. In open circuit, charge builds up until the electric field balances the diffusion: that's the Seebeck voltage. Peltier is the reverse: driven carriers carry heat with them.
X: A Bi_{2}Te_{3} couple (S = 400 μV K^{-1} combined) across 100 K. Open-circuit voltage?
> V = 400 × 10^{-6} × 100 = 40 mV per couple; modules wire many in series
!: Thermoelectric devices are reliable and silent but inefficient; they suit niche uses where those matter more.
Q: What is the Seebeck effect? | A voltage generated by a temperature difference across a conductor or junction.
Q: What is the thermoelectric figure of merit? | ZT = S^{2}σT/κ.
M1: Which material property should be low for a good thermoelectric? | Thermal conductivity | Seebeck coefficient | Electrical conductivity | Temperature | It shorts the temperature difference.
M2: The Kelvin relation links Peltier and Seebeck coefficients as: | Π = ST | Π = S/T | Π = S^{2} | Π = −S | Onsager reciprocity.

## Peltier and Seebeck effects
S: Seebeck and Peltier effects are two faces of thermoelectricity. Seebeck devices turn heat into electricity (thermocouples, RTGs); Peltier devices pump heat with a current (portable coolers, laser and sensor temperature control).
H: Seebeck in practice
- **Thermocouples**: two different metals joined; the voltage depends on the junction temperature difference. Type K (chromel–alumel) ~41 μV K^{-1}, range −200 to 1250 °C.
- **Radioisotope thermoelectric generators (RTGs)**: Pu-238 decay heat powers Voyager (since 1977), Curiosity and Perseverance (~110 W electrical each).
- Waste heat recovery from car exhausts and industry.
H: Peltier in practice
- n- and p-type semiconductor legs between ceramic plates; current pumps heat from one plate to the other.
- Reverse the current to switch heating and cooling.
- Max ΔT ~70 K for a single stage; multi-stage stacks cool infrared sensors.
- COP typically 0.3–0.7, lower than vapour-compression fridges.
X: A Peltier cooler pumps 20 W from its cold side using 40 W of electricity. Heat rejected at the hot side?
> Q_{h} = Q_{c} + W = 60 W (the heat sink must handle 60 W)
!: A Peltier module without a good heat sink on its hot side overheats, and its cold side warms up too.
Q: Why are RTGs used on deep-space probes? | They provide steady power for decades without sunlight, with no moving parts.
Q: How do you switch a Peltier module from cooling to heating? | Reverse the current direction.
M1: Thermocouples measure temperature using: | The Seebeck effect | The Peltier effect | Resistance change | Thermal expansion | Voltage from ΔT.
M2: A Peltier cooler's hot side must reject: | Heat pumped plus electrical power | Only the heat pumped | Nothing | Only the electrical power | Energy conservation.

## Thermal contact resistance
S: When two solid surfaces touch, they really meet only at tiny high points, so heat flow across the interface is impeded. This contact resistance can dominate heat transfer in electronics, engines and cryogenic systems.
H: Origin
- Real contact area is a small fraction of the apparent area (often < 1%).
- Gaps between asperities are filled with air (poor conductor) or vacuum.
- Phonons scatter at interfaces even with perfect contact (Kapitza resistance), important at low temperatures and nanoscales.
E: ΔT = q R_{c}" :: R_{c}" in m^{2} K W^{-1}
H: Reducing it
- Thermal interface materials: pastes, greases, pads, liquid metal, solder, phase-change materials fill the gaps.
- Higher clamping pressure enlarges real contact.
- Smoother, flatter surfaces; soft metal foils (indium) in cryogenics.
X: A CPU dissipates 100 W through 1.5 cm^{2}. Contact resistance 1 × 10^{-4} m^{2} K W^{-1} without paste, 1 × 10^{-5} with. Temperature drop?
> Without: ΔT = (100/1.5 × 10^{-4}) × 10^{-4} = 67 K
> With paste: 6.7 K
!: More thermal paste isn't better; a thick layer adds bulk resistance. A thin film that fills gaps is ideal.
Q: Why does thermal contact resistance exist? | Surfaces touch only at small high points, leaving gaps that conduct heat poorly.
Q: What is Kapitza resistance? | Interfacial thermal resistance from phonon scattering at a boundary, even with perfect contact.
M1: Thermal paste improves heat transfer by: | Filling microscopic air gaps | Being a better conductor than copper | Adding insulation | Cooling by evaporation | Air is a poor conductor.
M2: Increasing clamping pressure between surfaces: | Reduces contact resistance | Increases it | Has no effect | Melts the surfaces | Larger real contact area.

## Cryogenics
S: Cryogenics is the production and use of very low temperatures, typically below about 120 K. It liquefies gases, enables superconducting magnets and quantum computers, and preserves biological samples.
H: Coolants
- Liquid nitrogen: 77 K; cheap; cryopreservation, food, MRI pre-cooling.
- Liquid helium-4: 4.2 K (pumped to ~1.2 K); superconducting magnets.
- Helium-3: 3.2 K; ~0.3 K when pumped.
- Liquid hydrogen: 20 K; rocket fuel.
H: Producing cold
- **Joule–Thomson expansion** (Linde process).
- **Expansion engines** doing work (Claude process).
- **Cryocoolers**: Gifford–McMahon, pulse tube, Stirling: reach ~3 K without liquids.
- **Dilution refrigerators**: ~10 mK. **Adiabatic demagnetisation**: < 1 mK.
H: Engineering challenges
- Heat leaks: vacuum jackets, multilayer insulation, radiation shields, low-conductivity supports.
- Materials embrittlement; differential contraction.
- Safety: oxygen displacement, pressure build-up from boil-off, cold burns.
- Helium supply is limited and expensive; recovery systems recycle it.
X: 1 L of liquid nitrogen boils into how much gas at room temperature?
> 0.807 kg = 28.8 mol
> V = nRT/p = 28.8 × 8.31 × 293/10^{5} ≈ 0.70 m^{3}: about 700 times the volume
!: Never seal a cryogenic liquid in a closed container: boil-off generates enormous pressure.
Q: Name three ways of reaching cryogenic temperatures. | Joule–Thomson expansion, expansion engines/cryocoolers, dilution refrigeration, adiabatic demagnetisation.
Q: Why is liquid nitrogen hazardous in enclosed spaces? | Boiling releases large volumes of gas that displace oxygen.
M1: Liquid helium boils at: | 4.2 K | 77 K | 20 K | 0.3 K | At 1 atm.
M2: Multilayer insulation in cryostats reduces: | Radiative heat transfer | Conduction only | Convection only | Pressure | Many reflective layers.

## Low-temperature physics
S: Cooling matter towards absolute zero reveals quantum behaviour on a macroscopic scale: superconductivity, superfluidity, quantum Hall effects and Bose–Einstein condensates. Low temperatures silence thermal noise so quantum effects dominate.
H: Landmark phenomena
- **Superconductivity** (Onnes, 1911, mercury at 4.2 K): zero resistance and expulsion of magnetic fields (Meissner effect).
- **Superfluid ^{4}He** below 2.17 K (lambda point): flows without viscosity, climbs walls as a film, shows quantised vortices, conducts heat as "second sound".
- **Superfluid ^{3}He** below ~2.5 mK: Cooper-paired fermions with complex order.
- **Quantum Hall effects**: Hall resistance quantised as h/(ne^{2}), used as a resistance standard.
- **Kondo effect, heavy fermions, quantum phase transitions**.
H: Why cold matters
P: Quantum effects need k_{B}T small compared with relevant energy gaps or coherence energies. Superconducting gaps are ~meV (tens of K); qubit energies ~20 μeV (needs ~10 mK). Lower temperatures mean less thermal noise and longer coherence.
X: Below what temperature is the thermal energy smaller than a 1 meV superconducting gap?
> T = Δ/k_{B} = 1.6 × 10^{-22}/1.38 × 10^{-23} ≈ 12 K (in practice T well below this)
!: Superfluidity and superconductivity are macroscopic quantum states, not just "very low resistance".
Q: What is the lambda point? | The temperature (2.17 K) at which helium-4 becomes superfluid.
Q: What is the Meissner effect? | The expulsion of magnetic field from a superconductor.
M1: Superconductivity was discovered in: | 1911 | 1957 | 1986 | 1938 | Kamerlingh Onnes, mercury.
M2: The quantum Hall resistance is quantised in units of: | h/e^{2} | e^{2}/h | h/e | ħ/e | R = h/(ne^{2}).

## Heat transport in solids and fluids
S: Heat moves through matter by different carriers: phonons and electrons in solids, molecules in gases, and both conduction and convection in liquids. Understanding the carriers explains why conductivities span over five orders of magnitude.
H: Kinetic formula
E: κ = ⅓Cvl :: heat capacity per volume × carrier speed × mean free path
- Applies to phonons, electrons and gas molecules alike.
H: Phonons in insulators
- Scattered by other phonons (Umklapp, dominant at high T: κ ∝ 1/T), defects, isotopes, boundaries.
- Peak in κ at low T; pure crystals reach enormous values (isotopically pure diamond > 3000 W m^{-1} K^{-1}).
- Glasses and polymers: very short mean free paths, low κ (~0.1–1).
- Nanostructuring reduces κ (useful for thermoelectrics).
H: Electrons in metals
- Mean free paths ~10–100 nm at room temperature.
- Wiedemann–Franz law links κ_{e} to electrical conductivity.
H: Fluids
- Liquids: κ low (water 0.6, oils ~0.15); convection usually dominates.
- Gases: κ ∝ √(T/m)/d^{2}, independent of pressure (over a wide range).
- Nanofluids and ballistic transport at small scales break simple models.
X: Why does diamond conduct heat better than copper at room temperature, though it has no free electrons?
> Light, strongly bonded carbon gives very high phonon speeds (~12 km s^{-1})
> Long phonon mean free paths in pure crystals: κ ~ 2000 vs copper's 400
!: Thermal and electrical conduction aren't always linked: diamond is an electrical insulator but an exceptional heat conductor.
Q: What carries heat in electrical insulators? | Phonons (lattice vibrations).
Q: Why does phonon thermal conductivity fall at high temperature? | More phonon–phonon (Umklapp) scattering shortens mean free paths.
M1: In the kinetic formula κ = ⅓Cvl, l is: | The mean free path | The length of the sample | The latent heat | The wavelength | Distance between collisions.
M2: Glass has low thermal conductivity because: | Its disordered structure scatters phonons strongly | It has many free electrons | It's transparent | It's dense | Short mean free path.

## Thermal management in engineering
S: Thermal management keeps devices within safe temperatures: removing heat from chips, batteries, engines and spacecraft, or keeping things warm. Performance, reliability and safety all depend on it.
H: Electronics
- Heat flux of modern processors exceeds 100 W cm^{-2}.
- Path: die → thermal interface → heat spreader → heat sink → air or liquid.
- Heat pipes and vapour chambers move heat with evaporation and condensation (effective κ ~ 10 000+ W m^{-1} K^{-1}).
- Liquid cooling, immersion cooling in data centres; data centres use ~1–2% of world electricity, much for cooling.
- Reliability: failure rates roughly double per 10 K rise (Arrhenius).
H: Batteries and vehicles
- Lithium-ion cells work best at ~15–35 °C; overheating risks thermal runaway.
- EV battery packs use liquid cooling plates and heat pumps.
H: Spacecraft
- No convection; radiators, multilayer insulation, heaters and louvres.
- JWST's sunshield cools the telescope to ~40 K passively; MIRI uses a cryocooler to reach 7 K.
X: A chip dissipates 50 W; thermal resistances: junction–case 0.3, case–sink 0.2, sink–air 0.8 K W^{-1}. Junction temperature in 25 °C air?
> R_{total} = 1.3 K W^{-1}; ΔT = 65 K
> T_{j} = 90 °C
!: Thermal design must consider the worst case (hot day, dust, maximum load), not just typical conditions.
Q: How does a heat pipe move heat so effectively? | Liquid evaporates at the hot end, vapour carries latent heat to the cold end, condenses, and wicks back.
Q: Why does temperature matter for electronics reliability? | Degradation processes are thermally activated; failure rates rise steeply with temperature.
M1: Total thermal resistance of layers in series: | Adds | Multiplies | Is the smallest | Averages | Like series resistors.
M2: JWST's main mirror is kept cold mainly by: | A five-layer sunshield | Liquid helium | Its distance from the Sun alone | Peltier coolers | Passive radiative cooling.
`;
