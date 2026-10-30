// Unit 33: Atmospheric Physics and Climate. Format: kit/course/notes.js
export default `
## Atmospheric structure
S: Earth's atmosphere is divided into layers by how temperature changes with height. Each layer has distinct physics: weather in the troposphere, ozone in the stratosphere, meteors in the mesosphere and aurorae in the thermosphere.
H: Layers
- **Troposphere** (0–~12 km; 8 at poles, 17 at equator): temperature falls ~6.5 K per km; contains ~80% of the mass and nearly all weather.
- **Stratosphere** (to ~50 km): temperature rises with height from ozone absorbing UV; stable; jets cruise in its lower part.
- **Mesosphere** (to ~85 km): temperature falls again; coldest region (~−90 °C); meteors burn up; noctilucent clouds.
- **Thermosphere** (to ~600 km): heated by solar UV and X-rays; ~1000 K+; very thin; ISS orbits here; aurorae.
- **Exosphere**: atoms escape to space.
- Ionosphere overlaps mesosphere and thermosphere.
H: Boundaries
- Tropopause, stratopause, mesopause.
- Kármán line (100 km): conventional edge of space.
H: Why temperatures vary
P: The troposphere is heated from the ground, so it's warmest at the bottom and convects. The stratosphere is heated from within by ozone absorbing UV, so it's warmest at the top and stable (inversion). The thermosphere absorbs the most energetic solar radiation, but its gas is so thin that "1000 K" wouldn't feel hot.
X: Temperature at 8 km if the surface is 15 °C and the lapse rate is 6.5 K km^{-1}?
> T = 15 − 6.5 × 8 = −37 °C
!: The thermosphere's high temperature means fast molecules, not much heat: you'd freeze there because there's too little gas to warm you.
Q: Why does stratospheric temperature increase with height? | Ozone absorbs solar UV, heating it from within.
Q: Where does most weather occur? | In the troposphere.
M1: The ozone layer is in the: | Stratosphere | Troposphere | Mesosphere | Thermosphere | 15–35 km.
M2: The Kármán line is at about: | 100 km | 10 km | 1000 km | 36 000 km | Edge of space.

## Atmospheric pressure and temperature
S: Atmospheric pressure is the weight of air above per unit area; it falls roughly exponentially with height. Temperature, pressure and density are linked by the gas law and by the vertical balance of forces.
H: Pressure
- Sea-level average 1013.25 hPa (101 325 Pa).
- Falls ~12 hPa per 100 m near the surface; halves every ~5.5 km.
E: p(z) = p_{0}e^{−z/H}, H = RT/(Mg) ≈ 8 km :: scale height
H: Measuring
- Mercury and aneroid barometers; electronic sensors; altimeters convert pressure to height.
- Pressure maps (isobars) show highs and lows driving winds.
H: Temperature profiles
- Environmental lapse rate (measured profile) ~6.5 K km^{-1} average.
- Inversions: temperature increasing with height (night-time ground cooling, subsidence), trapping pollution (smog).
H: Effects on life
P: At 5500 m, air pressure is half that at sea level, so each breath has half the oxygen; climbers acclimatise or use oxygen above ~8000 m. Water boils at ~70 °C on Everest's summit. Aircraft cabins are pressurised to ~2000–2400 m equivalent.
X: Pressure at 3000 m (H = 8 km)?
> p = 1013 × e^{−3/8} = 1013 × 0.69 ≈ 700 hPa
!: Pressure differences, not absolute pressure, drive winds; a "high" is only a few per cent above average.
Q: What is the atmospheric scale height? | The height over which pressure falls by a factor of e, about 8 km.
Q: What is a temperature inversion? | A layer where temperature increases with height, suppressing convection.
M1: Standard sea-level pressure is about: | 1013 hPa | 100 hPa | 10 000 hPa | 760 hPa | 101 kPa.
M2: Pressure halves roughly every: | 5.5 km | 1 km | 50 km | 100 m | Exponential decrease.

## Gas laws in the atmosphere
S: Air behaves almost as an ideal gas, so its pressure, density and temperature obey the gas law. Combining it with hydrostatic balance and adiabatic expansion explains how air cools as it rises and why clouds form.
H: Ideal gas law for air
E: p = ρR_{d}T :: R_{d} = 287 J kg^{-1} K^{-1} (dry air)
E: T_{v} = T(1 + 0.61q) :: virtual temperature (moist air)
- Moist air is less dense than dry air at the same p and T (water molecules are lighter than N_{2} and O_{2}).
H: Hydrostatic balance
E: dp/dz = −ρg
- Combined with the gas law gives the hypsometric equation: thickness between pressure levels ∝ mean temperature.
H: Adiabatic processes
E: Γ_{d} = g/c_{p} ≈ 9.8 K km^{-1} :: dry adiabatic lapse rate
E: θ = T(p_{0}/p)^{R/c_{p}} :: potential temperature (conserved in dry adiabatic motion)
- Moist adiabatic lapse rate ~4–7 K km^{-1} (latent heat release).
H: Uses
P: Potential temperature lets meteorologists compare air at different heights; if θ increases with height, the atmosphere is stable. Thickness charts (e.g. 1000–500 hPa) track warm and cold air masses and forecast snow.
X: Density of air at 1000 hPa and 288 K?
> ρ = p/(R_{d}T) = 10^{5}/(287 × 288) = 1.21 kg m^{-3}
!: Humid air is lighter, not heavier, than dry air at the same temperature and pressure.
Q: What is potential temperature? | The temperature air would have if brought adiabatically to 1000 hPa.
Q: What is the dry adiabatic lapse rate? | About 9.8 K per km, g/c_{p}.
M1: Humid air compared with dry air at the same T and p is: | Less dense | Denser | The same density | Liquid | Water vapour lighter.
M2: The hypsometric equation relates layer thickness to: | Mean temperature | Wind speed | Humidity only | Altitude | Warmer layers thicker.

## Radiative transfer
S: Radiative transfer describes how radiation is absorbed, emitted and scattered as it passes through the atmosphere. It determines Earth's energy balance, the greenhouse effect and what satellites see.
H: The equation
E: dI_{λ}/ds = −κ_{λ}ρI_{λ} + κ_{λ}ρB_{λ}(T) :: absorption and emission (Schwarzschild)
E: τ = ∫κρ ds :: optical depth
E: I = I_{0}e^{−τ} :: Beer–Lambert (no emission)
- Kirchhoff: emission = absorption × Planck function at local T.
H: Scattering
- Rayleigh (molecules, ∝ λ^{−4}): blue sky.
- Mie (droplets, aerosols): white clouds, haze.
- Multiple scattering in clouds.
H: Emission height
P: At a given wavelength, radiation escaping to space comes mainly from where optical depth (from the top) ≈ 1. In strongly absorbing CO_{2} bands, that's high and cold, so less energy escapes. Adding CO_{2} raises the emission height further: the core mechanism of the enhanced greenhouse effect.
H: Line-by-line models
- Thousands of absorption lines (HITRAN database); band models for climate models.
X: Light passes through an atmosphere with optical depth 0.3. Fraction transmitted?
> e^{−0.3} = 0.74
!: An atmosphere opaque at a wavelength still emits at it; what escapes comes from the upper layers.
Q: What is optical depth? | A measure of how much radiation is attenuated along a path: I = I_{0}e^{−τ}.
Q: How does adding CO_{2} enhance the greenhouse effect? | It raises the effective emission height to colder levels, reducing outgoing radiation.
M1: The sky is blue mainly due to: | Rayleigh scattering | Mie scattering | Absorption by ozone | Reflection from oceans | λ^{−4}.
M2: Radiation escaping to space originates mainly near optical depth: | 1 | 0 | 100 | 0.001 | Emission level.

## Solar and terrestrial radiation
S: Earth receives short-wavelength radiation from the hot Sun and emits long-wavelength infrared from its cool surface and atmosphere. The two hardly overlap, which lets greenhouse gases treat them very differently.
H: Solar (shortwave)
- Total solar irradiance ~1361 W m^{-2}; average over the sphere ~340 W m^{-2}.
- Peak ~500 nm; ~99% at 0.2–4 μm.
- ~30% reflected (albedo 0.3): clouds, ice, aerosols, surface.
- Varies ~0.1% over the 11-year solar cycle.
H: Terrestrial (longwave)
- Peak ~10 μm; 4–100 μm.
- Surface emits ~398 W m^{-2} (288 K); only ~240 W m^{-2} escapes to space at the top.
- Atmospheric window (8–13 μm) lets some radiation escape directly.
H: Earth's energy budget (approximate global averages, W m^{-2})
- Incoming solar 340; reflected 100; absorbed 240 (surface ~160, atmosphere ~80).
- Outgoing longwave 239.
- Current imbalance ~+0.5–1 W m^{-2} (energy accumulating, mostly in oceans), measured by CERES satellites and ocean floats.
H: Insolation patterns
P: Insolation varies with latitude and season (axial tilt 23.4°); polar regions receive less per area, driving heat transport by atmosphere and oceans. Milankovitch orbital cycles change seasonal insolation over tens of thousands of years, pacing ice ages.
X: Average solar input over Earth's sphere from 1361 W m^{-2}?
> Disc area πR^{2}, sphere area 4πR^{2}: 1361/4 ≈ 340 W m^{-2}
!: Solar variability is too small to explain recent warming; satellite measurements show no upward trend in solar output since the 1980s.
Q: Why do solar and terrestrial radiation hardly overlap? | The Sun (~5800 K) emits short wavelengths; Earth (~255–288 K) emits long infrared.
Q: What is Earth's albedo? | About 0.3: the fraction of sunlight reflected.
M1: Earth's emission peaks near: | 10 μm | 500 nm | 1 mm | 100 nm | Wien.
M2: Earth's current energy imbalance is about: | +0.5–1 W m^{-2} | −10 W m^{-2} | 0 | +100 W m^{-2} | Warming.

## Greenhouse gases
S: Greenhouse gases absorb and emit infrared radiation, warming the surface. Water vapour and CO_{2} are the most important; human activity has raised CO_{2}, methane and nitrous oxide sharply since industrialisation.
H: Why some gases absorb IR
- Molecules must have vibrations that change their dipole moment.
- CO_{2} (bending mode at 15 μm), H_{2}O (many bands), CH_{4}, N_{2}O, O_{3}, CFCs.
- N_{2}, O_{2} and Ar: no dipole change, transparent to IR.
H: Concentrations (approximate)
- CO_{2}: 280 ppm pre-industrial → over 420 ppm today (highest in at least 800 000 years; ice cores).
- CH_{4}: 0.7 → 1.9 ppm.
- N_{2}O: 270 → 335 ppb.
H: Global warming potential
- Per kg over 100 years relative to CO_{2}: CH_{4} ~28–30, N_{2}O ~265, SF_{6} ~23 500.
- Lifetimes: CH_{4} ~12 years; CO_{2} cycles quickly but a large fraction persists for centuries to millennia.
H: Water vapour
P: Water vapour is the largest greenhouse contributor but acts as a feedback, not a driver: its concentration is set by temperature (Clausius–Clapeyron: ~7% more per K). Warming from CO_{2} increases water vapour, roughly doubling the warming.
X: Radiative forcing from doubling CO_{2}?
> ΔF = 5.35 ln 2 ≈ 3.7 W m^{-2}
!: Water vapour isn't ignored in climate science; it's included as a feedback amplifying CO_{2}-driven warming.
Q: Why are N_{2} and O_{2} not greenhouse gases? | Their vibrations don't change their dipole moment, so they don't absorb infrared.
Q: Why is water vapour a feedback, not a forcing? | Its concentration is controlled by temperature; it adjusts quickly to changes.
M1: Pre-industrial CO_{2} was about: | 280 ppm | 420 ppm | 1000 ppm | 100 ppm | Ice cores.
M2: Methane's 100-year global warming potential is about: | 28–30 | 1 | 300 | 10 000 | Per kg vs CO_{2}.

## Atmospheric energy balance
S: Earth's climate settles where absorbed sunlight balances emitted infrared. Changing either side (albedo, greenhouse gases, solar output) shifts the balance until temperatures adjust.
H: Simple models
E: (1 − α)S/4 = σT_{e}^{4} :: radiative equilibrium; T_{e} ≈ 255 K
E: T_{s} = 2^{1/4}T_{e} ≈ 303 K :: one-layer greenhouse (overestimates)
- Real surface 288 K: partial absorption, convection and weather.
H: Fluxes
- Surface loses energy by longwave radiation, latent heat (evaporation ~80 W m^{-2}) and sensible heat (~20 W m^{-2}).
- Atmosphere radiates both up and down (back radiation ~340 W m^{-2}).
- Convection carries heat up, setting the lapse rate (radiative–convective equilibrium; Manabe and Wetherald, 1967, Nobel 2021).
H: Forcing and response
E: ΔT = λΔF :: climate sensitivity parameter
P: A positive forcing (more CO_{2}) creates an imbalance; Earth warms until outgoing radiation rises to match. The oceans' heat capacity slows the response: transient warming is less than equilibrium. Current observed imbalance confirms the planet is still warming.
X: With α = 0.3 and S = 1361 W m^{-2}, effective temperature?
> T_{e} = [0.7 × 1361/(4 × 5.67 × 10^{-8})]^{1/4} = 255 K
!: Back radiation doesn't violate the second law; net heat still flows from the warmer surface to the cooler atmosphere.
Q: What is Earth's effective radiating temperature? | About 255 K.
Q: What is radiative–convective equilibrium? | Balance in which radiation and convection together set the atmosphere's temperature profile.
M1: Without an atmosphere, Earth's mean temperature would be about: | 255 K | 288 K | 0 K | 373 K | Radiative equilibrium.
M2: Most surface energy loss to the atmosphere (besides radiation) is via: | Evaporation (latent heat) | Conduction to space | Wind kinetic energy | Lightning | ~80 W m^{-2}.

## Convection and atmospheric stability
S: Whether a rising parcel of air keeps rising or sinks back depends on how its temperature compares with its surroundings. Stability controls thunderstorms, cloud types and pollution dispersion.
H: Parcel theory
- A rising parcel cools at the dry adiabatic rate (9.8 K km^{-1}) until saturated, then at the moist rate (~6 K km^{-1}).
- Compare with the environmental lapse rate (Γ_{e}).
H: Stability
- **Absolutely stable**: Γ_{e} < Γ_{moist}.
- **Absolutely unstable**: Γ_{e} > Γ_{dry} (rare except near hot ground).
- **Conditionally unstable**: between: unstable only if the parcel saturates (common; leads to thunderstorms).
E: N^{2} = (g/θ)dθ/dz :: buoyancy (Brunt–Väisälä) frequency; N^{2} < 0 unstable
H: Convective indices
- CAPE (convective available potential energy): energy for rising parcels; large CAPE → severe storms.
- Lifting condensation level: cloud base.
- Level of free convection; equilibrium level (anvil top).
H: Applications
P: Forecasters use radiosonde soundings (skew-T diagrams) to predict thunderstorms, hail and tornado risk. Stable layers trap pollution and fog; unstable afternoons mix the boundary layer and build cumulus clouds. Gliders and birds ride thermals.
X: Maximum updraft from CAPE = 2000 J kg^{-1}?
> w = √(2 × CAPE) = √4000 ≈ 63 m s^{-1} (real updrafts ~30–50 m s^{-1})
!: A stable atmosphere can still have clouds; they're layered (stratus) rather than towering.
Q: What is conditional instability? | Stable for dry air but unstable once a rising parcel becomes saturated.
Q: What does CAPE measure? | The potential energy available to accelerate rising air parcels.
M1: Large CAPE indicates potential for: | Severe thunderstorms | Fog | Calm weather | Snow only | Strong updrafts.
M2: An inversion makes the atmosphere: | Very stable | Unstable | Neutral | Turbulent | Warm air above.

## Cloud formation and microphysics
S: Clouds form when rising air cools to its dew point and water vapour condenses on tiny particles. Cloud microphysics explains how microscopic droplets and ice crystals form, grow, and eventually fall as rain or snow.
H: Saturation
E: e_{s}(T) ≈ 611 Pa × exp(17.27T_{C}/(T_{C} + 237.3)) :: saturation vapour pressure
- Clausius–Clapeyron: ~7% more water vapour capacity per K.
- Relative humidity = e/e_{s}.
H: Nucleation
- Pure water needs huge supersaturation to form droplets (curvature: Kelvin effect).
- **Cloud condensation nuclei** (CCN: salt, sulfate, dust) let droplets form at ~0.1–1% supersaturation (Köhler theory).
- **Ice nuclei** are rarer; supercooled liquid water persists to −38 °C.
H: Cloud types
- Cumulus (convective), stratus (layered), cirrus (ice, high), cumulonimbus (thunderstorms), nimbostratus.
- Droplets ~10 μm; ~10^{8} per m^{3}.
H: Clouds and climate
P: Clouds cool by reflecting sunlight (especially low stratocumulus) and warm by trapping infrared (especially high cirrus); net ~−20 W m^{-2} today. How clouds change with warming is the largest uncertainty in climate sensitivity. Aerosols change droplet numbers and cloud brightness (Twomey effect): ship tracks show this vividly.
X: Saturation vapour pressure at 20 °C?
> e_{s} = 611 × exp(17.27 × 20/257.3) = 611 × e^{1.342} ≈ 2340 Pa
!: Clouds aren't water vapour (invisible); they're liquid droplets or ice crystals.
Q: What are cloud condensation nuclei? | Small particles on which water vapour condenses to form cloud droplets.
Q: Why does supercooled water exist in clouds? | Ice formation needs ice nuclei, which are scarce; pure droplets can stay liquid to −38 °C.
M1: Water vapour capacity increases with temperature by about: | 7% per K | 1% per K | 50% per K | Not at all | Clausius–Clapeyron.
M2: Ship tracks in satellite images show: | Aerosols brightening clouds | Rain | Lightning | Ozone | Twomey effect.

## Precipitation physics
S: Cloud droplets are too small to fall; precipitation requires them to grow a million-fold in volume. Two processes do this: collisions between droplets in warm clouds and ice-crystal growth in cold clouds.
H: Warm rain (collision–coalescence)
- Larger droplets fall faster, collide with smaller ones and merge.
- Needs some drops > ~20 μm to start; maritime clouds (few, large droplets) rain more easily than polluted continental ones.
- Raindrops ~1–5 mm; larger ones break up.
H: Cold rain (Bergeron–Findeisen process)
- Saturation vapour pressure over ice is lower than over water.
- In mixed clouds, ice crystals grow at the expense of evaporating droplets.
- Crystals fall, collect droplets (riming: graupel, hail) and may melt into rain.
- Most mid-latitude rain starts as snow.
H: Precipitation types
- Rain, drizzle, snow, sleet, freezing rain, graupel, hail (layered ice grown in strong updrafts; can exceed 15 cm).
- Snowflake shape depends on temperature and humidity (Nakaya diagram).
H: Measurement and modification
P: Weather radars measure reflectivity (∝ D^{6} of drops); dual-polarisation radars distinguish rain, hail and snow. Cloud seeding with silver iodide (ice nuclei) aims to enhance precipitation; evidence of effectiveness is modest.
X: Terminal speed of a 2 mm raindrop compared with a 10 μm droplet?
> Raindrop ~6.5 m s^{-1}
> Droplet ~3 mm s^{-1}: it effectively floats
!: Raindrops aren't teardrop-shaped; small ones are spherical, larger ones flatten into hamburger-bun shapes.
Q: What is the Bergeron process? | Ice crystals growing at the expense of supercooled droplets in mixed-phase clouds.
Q: Why do polluted clouds rain less easily? | Many small droplets form, slowing collision–coalescence.
M1: Most mid-latitude rain begins as: | Ice crystals (snow) | Hail | Dew | Fog | Bergeron.
M2: Hail forms in: | Strong updrafts of thunderstorms | Fog | Stable clouds | Clear air | Repeated cycling.

## Atmospheric circulation
S: The atmosphere moves heat from the tropics to the poles. Earth's rotation breaks this flow into three circulation cells per hemisphere, producing trade winds, westerlies, jet streams, deserts and rain belts.
H: The three-cell model
- **Hadley cell** (0–30°): air rises at the equator (ITCZ, rainforests), flows poleward aloft, sinks at ~30° (subtropical highs, deserts), returns as trade winds.
- **Ferrel cell** (30–60°): indirect; surface westerlies.
- **Polar cell** (60–90°): cold air sinks at the poles; polar easterlies.
H: Jet streams
- Subtropical jet (~30°) and polar-front jet (~60°): 100–400 km h^{-1} near the tropopause.
- Thermal wind balance with temperature gradients.
- Meanders (Rossby waves) steer weather systems; blocking patterns cause persistent heat waves or cold spells.
H: Other features
- Monsoons: seasonal reversal from land–sea heating contrasts.
- Walker circulation across the Pacific (linked to ENSO).
- Stratospheric polar vortex; sudden stratospheric warmings bring cold outbreaks.
H: Climate change effects
P: The Hadley cell is expanding poleward, shifting dry zones; warming in the Arctic faster than elsewhere may alter jet stream behaviour (an active research question).
X: Why are many deserts near 30° latitude?
> Hadley cell air sinks there, warming by compression and drying
> Persistent high pressure suppresses rain (Sahara, Arabian, Australian deserts)
!: The three-cell model is idealised; real circulation includes waves, monsoons and land–sea effects.
Q: What is the Hadley cell? | The tropical circulation with rising air at the equator and sinking air near 30° latitude.
Q: What causes jet streams? | Strong temperature gradients and Earth's rotation (thermal wind balance) near the tropopause.
M1: Trade winds blow: | Towards the equator, deflected westward | From west to east at mid-latitudes | From the poles | Vertically | Surface Hadley flow.
M2: The ITCZ is associated with: | Rising air and heavy rain near the equator | Deserts | Polar highs | Jet streams | Convergence zone.

## Fluid dynamics of the atmosphere
S: The atmosphere is a thin, rotating, stratified fluid. Its motion obeys the Navier–Stokes equations with rotation, gravity and heating, and simplified balances explain winds and the growth of weather systems.
H: Primitive equations
- Momentum (with Coriolis), continuity, thermodynamic energy, hydrostatic balance, gas law, moisture.
- Solved numerically in weather and climate models.
H: Key balances
E: f × v_{g} = −(1/ρ)∇p :: geostrophic wind
E: ∂v_{g}/∂z ∝ ∇T :: thermal wind
- Gradient wind includes curvature (faster around highs than lows).
- Near the surface, friction makes wind cross isobars towards low pressure.
H: Vorticity and potential vorticity
P: Vorticity measures spin; potential vorticity (PV) combines spin and stratification and is conserved following adiabatic, frictionless flow. PV thinking explains cyclogenesis, Rossby waves and how disturbances at the tropopause trigger storms below.
H: Instabilities
- Baroclinic instability: horizontal temperature gradients release energy as mid-latitude cyclones (scale ~1000 km).
- Barotropic, convective and symmetric instabilities.
X: Geostrophic wind with a pressure gradient of 1 hPa per 100 km at 45° (ρ = 1.2)?
> v = (1/(ρf))(Δp/Δx) = (1/(1.2 × 10^{-4})) × (100/10^{5})
> ≈ 8.3 m s^{-1}
!: Winds around a low in the northern hemisphere blow anticlockwise, not straight in; rotation dominates large-scale flows.
Q: What is potential vorticity? | A quantity combining rotation and stratification, conserved in adiabatic frictionless flow.
Q: What causes mid-latitude cyclones? | Baroclinic instability of horizontal temperature gradients.
M1: Near the ground, friction makes wind: | Cross isobars towards low pressure | Flow parallel to isobars | Stop | Reverse | Ekman layer.
M2: Weather forecast models solve the: | Primitive equations | Schrödinger equation | Maxwell's equations | Einstein's equations | Fluid dynamics.

## Weather systems
S: Weather systems are the moving patterns of pressure, wind, cloud and precipitation that make daily weather: mid-latitude cyclones and fronts, anticyclones, tropical cyclones and thunderstorms.
H: Mid-latitude cyclones
- Low pressure, anticlockwise winds (northern hemisphere).
- Warm and cold fronts; occlusion.
- Norwegian cyclone model (Bjerknes, 1919).
- Bring most rain and wind to mid-latitudes; scale ~1000 km, lifetime days.
H: Anticyclones
- High pressure, sinking air, light winds, clear skies; can block weather patterns (heat waves, fog).
H: Tropical cyclones
- Form over oceans warmer than ~26.5 °C; powered by latent heat release.
- Eye, eyewall, spiral rainbands; winds up to ~300 km h^{-1}.
- Hurricanes (Atlantic), typhoons (NW Pacific), cyclones (Indian Ocean).
- Storm surges are often the deadliest hazard.
H: Mesoscale systems
- Thunderstorms, supercells (rotating updrafts: mesocyclones), tornadoes (winds > 400 km h^{-1}), squall lines, sea breezes.
H: Forecasting
P: Numerical weather prediction now gives useful forecasts ~7–10 days ahead; ensemble forecasts express uncertainty. Machine-learning models (e.g. GraphCast) now rival traditional models for some variables. Chaos limits deterministic forecasts to about two weeks.
X: Why do tropical cyclones weaken over land?
> They lose their energy source (warm ocean evaporation)
> Friction increases; dry air enters
!: Forecast probability of rain refers to the chance of measurable rain at a point, not the fraction of an area or time.
Q: What powers a tropical cyclone? | Latent heat released when water vapour from warm oceans condenses.
Q: What limits weather forecasts to about two weeks? | Chaos: small errors in initial conditions grow exponentially.
M1: Tropical cyclones need sea surface temperatures above about: | 26.5 °C | 10 °C | 40 °C | 0 °C | Warm water.
M2: A cold front is where: | Cold air advances under warm air | Warm air advances over cold | Pressure is high | Nothing happens | Frontal lifting.

## Atmospheric waves
S: The atmosphere supports many kinds of waves, from sound to planetary-scale Rossby waves. They transport energy and momentum, shape weather patterns, and couple the lower and upper atmosphere.
H: Types
- **Sound and infrasound**: compressional; volcanic and nuclear test detection.
- **Gravity (buoyancy) waves**: in stable air; mountain lee waves, wave clouds; frequency up to N (~0.01 s^{-1}).
- **Rossby (planetary) waves**: from Earth's rotation varying with latitude; wavelengths thousands of km; drift westward relative to the flow.
- **Kelvin waves**: equatorial and coastal trapped waves.
- **Atmospheric tides**: daily heating cycles.
H: Effects
- Lee waves create rotors (turbulence hazard for aircraft) and lenticular clouds.
- Breaking gravity waves deposit momentum high up, driving the upper atmosphere's circulation (and the quasi-biennial oscillation in the tropical stratosphere).
- Rossby wave breaking and blocking shape weather extremes.
- Madden–Julian Oscillation: eastward-moving tropical disturbance affecting monsoons.
H: Observing waves
P: Satellites, radar and airglow imagers reveal gravity waves; infrasound arrays monitor explosions. The Hunga Tonga eruption (2022) sent Lamb waves around the globe several times, measured by barometers worldwide.
X: Rossby wave westward phase speed relative to the mean flow for wavelength 6000 km at 45° (β ≈ 1.6 × 10^{-11} m^{-1} s^{-1})?
> c = −β/k^{2} with k = 2π/(6 × 10^{6}) = 1.05 × 10^{-6} m^{-1}
> c ≈ −14.5 m s^{-1} (westward relative to the wind)
!: Waves transport energy and momentum without transporting the air far; parcels oscillate.
Q: What restores atmospheric gravity waves? | Buoyancy in a stably stratified atmosphere.
Q: What causes Rossby waves? | The change of the Coriolis parameter with latitude.
M1: Lenticular clouds indicate: | Mountain lee waves | Hurricanes | Fronts | Fog | Standing gravity waves.
M2: The quasi-biennial oscillation is driven by: | Breaking waves in the tropical stratosphere | Ocean tides | Solar flares | Volcanoes | Wave momentum.

## Turbulence and boundary layers
S: The atmospheric boundary layer is the lowest ~1–2 km of air, directly influenced by the surface. Turbulence there mixes heat, moisture, momentum and pollutants, and controls wind energy, fog and air quality.
H: Structure
- Surface layer (~10% of the boundary layer): strong gradients; logarithmic wind profile.
- Mixed layer (daytime, convective): well-mixed by thermals.
- Stable nocturnal boundary layer: weak turbulence, inversions, low-level jets.
- Entrainment zone at the top.
H: Wind profile
E: u(z) = (u_{*}/κ) ln(z/z_{0}) :: log law (neutral), κ = 0.4 (von Kármán constant)
- z_{0}: roughness length (water ~0.0002 m; grass ~0.03; city ~1 m).
H: Turbulence
- Generated by wind shear (mechanical) and buoyancy (convective).
- Richardson number Ri = N^{2}/(du/dz)^{2}: turbulence suppressed when Ri > ~0.25.
- Monin–Obukhov similarity theory describes surface-layer fluxes.
- Eddy covariance towers measure fluxes of heat, water and CO_{2}.
H: Applications
P: Wind turbines sit in the boundary layer; wind speed increases with height, and turbines create wakes affecting neighbours. Urban heat islands, smog episodes and fog formation depend on boundary-layer stability. Clear-air turbulence at jet stream levels is a separate aviation hazard, increasing with climate change.
X: Wind at 10 m is 5 m s^{-1} over grass (z_{0} = 0.03 m). Wind at 100 m (neutral)?
> u(100)/u(10) = ln(100/0.03)/ln(10/0.03) = 8.11/5.81 = 1.40
> ≈ 7 m s^{-1}
!: Nights are often less windy at the surface because a stable layer decouples the surface from faster winds aloft.
Q: What is the atmospheric boundary layer? | The lowest part of the atmosphere directly influenced by the surface, typically 1–2 km.
Q: What does the Richardson number measure? | The balance of stability against shear, predicting turbulence.
M1: Wind speed near the surface increases with height roughly: | Logarithmically | Linearly | Exponentially | Not at all | Log law.
M2: Eddy covariance towers measure: | Surface fluxes of heat, water and CO_{2} | Temperature only | Lightning | Ozone layer | Turbulent fluxes.

## Aerosols and atmospheric optics
S: Aerosols are tiny particles suspended in air, from sea salt and dust to soot and sulfate. They affect health, cloud formation and climate, and together with molecules and ice crystals they create the sky's optical phenomena.
H: Aerosols
- Sources: sea spray, desert dust, volcanoes, wildfires, combustion, industry, organic vapours.
- Sizes ~0.01–10 μm; PM2.5 (< 2.5 μm) penetrates deep into lungs (millions of premature deaths per year).
- Lifetimes ~days to weeks in the troposphere; years in the stratosphere (volcanic).
H: Climate effects
- **Direct**: scattering sunlight (cooling), absorbing (black carbon warming).
- **Indirect**: more cloud droplets, brighter, longer-lived clouds (cooling).
- Net aerosol forcing ~−1 W m^{-2}, masking part of greenhouse warming; uncertain.
- Pinatubo (1991) cooled the globe ~0.5 °C for ~2 years.
H: Optical phenomena
- Blue sky and red sunsets (Rayleigh scattering; aerosols enhance reds).
- Rainbows (refraction in drops), glories, coronas (diffraction).
- Haloes (22°) and sundogs from hexagonal ice crystals.
- Mirages (refraction in temperature gradients), green flash.
- Crepuscular rays; noctilucent clouds.
X: Why is a halo around the Sun at 22°?
> Light refracts through 60° prism faces of hexagonal ice crystals
> Minimum deviation ≈ 22° for ice (n = 1.31), concentrating light there
!: Reducing aerosol pollution improves health but can unmask some greenhouse warming, slightly accelerating temperature rise.
Q: How do aerosols affect climate? | Directly by scattering and absorbing sunlight, and indirectly by changing clouds.
Q: Why do volcanic eruptions cool the climate? | Stratospheric sulfate aerosols reflect sunlight for a year or two.
M1: The 22° halo is caused by: | Hexagonal ice crystals | Raindrops | Dust | Ozone | Refraction.
M2: PM2.5 refers to: | Particles smaller than 2.5 μm | 2.5 ppm | 2.5 km visibility | Ozone | Particulate matter.

## Climate modelling
S: Climate models simulate the physics of the atmosphere, oceans, ice and land on computers, solving equations for fluid motion, radiation and chemistry. They project how climate responds to greenhouse gases and test our understanding.
H: Model types
- Energy balance models: global or zonal averages.
- General circulation models (GCMs): 3D atmosphere and ocean grids (~25–100 km).
- Earth system models: plus carbon cycle, vegetation, ice sheets, chemistry.
- Regional models for local detail; storm-resolving models at ~1–5 km.
H: Components
- Dynamical core (primitive equations).
- Parameterisations for sub-grid processes: clouds, convection, turbulence, aerosols.
- Coupling atmosphere, ocean, sea ice, land surface.
H: Testing models
P: Models are checked against observations: the 20th-century temperature record, seasonal cycles, response to volcanic eruptions (Pinatubo forecast correctly in advance), paleoclimates (ice ages, warm periods), and satellite data. Projections from the 1970s and 1980s (e.g. Hansen 1988, Manabe) matched later warming well. CMIP coordinates hundreds of models worldwide for IPCC assessments.
H: Uncertainties
- Cloud feedbacks; aerosol effects; ice-sheet dynamics; tipping points.
- Scenario uncertainty (future emissions) dominates late-century projections.
X: Why can models project climate decades ahead but not weather?
> Weather depends on initial conditions (chaos)
> Climate is the statistics of weather, set by boundary conditions like forcing
!: Models aren't fitted to reproduce warming trends; they're built from physics and tested against observations.
Q: What are parameterisations? | Approximate representations of processes smaller than a model's grid, like clouds.
Q: How are climate models tested? | Against historical records, volcanic responses, paleoclimates and satellite observations.
M1: CMIP is: | An international model intercomparison project | A satellite | A type of cloud | A gas | Coupled Model Intercomparison.
M2: The largest source of uncertainty in climate sensitivity is: | Cloud feedbacks | CO_{2} radiative properties | Solar constant | Gravity | Clouds.

## Climate feedback mechanisms
S: Feedbacks amplify or dampen the climate's response to a forcing. Positive feedbacks (water vapour, ice albedo) roughly double or triple the warming from CO_{2} alone; the Planck response ultimately stabilises it.
H: Main feedbacks (W m^{-2} K^{-1}, approximate)
- **Planck** (−3.2): warmer bodies radiate more: stabilising.
- **Water vapour** (+1.8): more vapour in warmer air.
- **Lapse rate** (−0.5): upper troposphere warms more in the tropics, radiating more.
- **Surface albedo** (+0.35): melting ice and snow reveal darker surfaces.
- **Clouds** (+0.4, uncertain): changes in low clouds dominate the uncertainty.
H: Feedback sum
E: ΔT = ΔF/(−Σλ_{i})
- Net feedback ~−1.2 W m^{-2} K^{-1}: doubling CO_{2} (3.7 W m^{-2}) gives ~3 K.
H: Carbon cycle feedbacks
P: Warming reduces ocean CO_{2} uptake and may release carbon from permafrost, wetlands (methane) and forests (fires, dieback). Tipping points (Greenland and West Antarctic ice sheets, Amazon, AMOC) could produce large, potentially irreversible changes beyond certain warming levels.
X: Without feedbacks (Planck only), warming from doubled CO_{2}?
> ΔT = 3.7/3.2 ≈ 1.2 K
> With feedbacks ~3 K
!: A positive feedback doesn't mean runaway warming; as long as the net feedback is negative (stabilising), the climate settles at a new equilibrium.
Q: What is the Planck feedback? | The increase in outgoing radiation as temperature rises; the main stabilising feedback.
Q: Why is ice–albedo feedback positive? | Melting ice exposes darker surfaces that absorb more sunlight, causing more warming.
M1: The largest positive feedback is: | Water vapour | Clouds | Ice albedo | Lapse rate | ~+1.8 W m^{-2} K^{-1}.
M2: Without any feedbacks, doubling CO_{2} warms Earth by about: | 1.2 K | 3 K | 10 K | 0 K | Planck only.

## Ocean-atmosphere interactions
S: The ocean and atmosphere exchange heat, water, momentum and gases, coupling them into one system. Their interactions produce climate patterns like El Niño and drive weather extremes worldwide.
H: Exchanges
- Wind stress drives ocean currents and mixing.
- Evaporation transfers latent heat to the atmosphere (fuel for storms).
- Ocean absorbs ~25–30% of human CO_{2}; pH has dropped by ~0.1 (30% more acidic).
- Sea spray aerosols; heat flux sets sea surface temperatures.
H: El Niño–Southern Oscillation (ENSO)
- Normal: trade winds pile warm water in the western Pacific; cold upwelling off South America.
- **El Niño**: trades weaken, warm water spreads east; heavy rain in Peru, drought in Australia and Indonesia; global temperature rises ~0.1–0.2 °C.
- **La Niña**: stronger trades, colder eastern Pacific.
- Bjerknes feedback couples winds and SST; cycle every 2–7 years.
H: Other modes
- North Atlantic Oscillation, Pacific Decadal Oscillation, Indian Ocean Dipole, Atlantic Multidecadal Variability.
- Monsoons.
H: Marine heatwaves and sea level
P: Ocean warming expands water (thermal expansion) and melts ice, raising sea level ~4 mm per year (accelerating). Marine heatwaves bleach corals and harm fisheries. Warmer oceans intensify rainfall and tropical cyclones.
X: Why does El Niño raise global average temperatures?
> Warm water spreads over a large area of the eastern Pacific surface
> The ocean releases heat to the atmosphere
!: El Niño doesn't cause global warming; it adds year-to-year variability on top of the long-term trend.
Q: What is El Niño? | A periodic warming of the eastern tropical Pacific with weakened trade winds, affecting global weather.
Q: How has ocean pH changed since industrialisation? | Dropped by about 0.1 (about 30% more acidic).
M1: El Niño events typically occur every: | 2–7 years | Every year | 50 years | 100 years | ENSO cycle.
M2: Sea level rise comes mainly from: | Thermal expansion and melting land ice | Melting sea ice | Rain | Tides | Ocean volume increase.

## Climate sensitivity
S: Equilibrium climate sensitivity is how much global temperature eventually rises for a doubling of atmospheric CO_{2}. It's the key number in climate science, constrained by physics, observations and past climates to about 2.5–4 °C.
H: Definitions
- **ECS** (equilibrium climate sensitivity): long-term warming for 2 × CO_{2}. IPCC AR6 likely range 2.5–4 °C, best estimate 3 °C.
- **TCR** (transient climate response): warming at the time of doubling with a 1% per year increase: ~1.4–2.2 °C.
- **TCRE**: warming per unit cumulative CO_{2} emitted (~0.45 °C per 1000 GtCO_{2}): basis of carbon budgets.
H: Lines of evidence
- Process understanding (feedback physics).
- Historical warming (with aerosol and ocean heat uncertainties).
- Paleoclimate: last glacial maximum (~6 °C colder), warm periods (Pliocene, ~400 ppm CO_{2}, 2–3 °C warmer).
- Combined in a Bayesian assessment (Sherwood et al., 2020).
H: Carbon budgets
P: Because warming is roughly proportional to cumulative emissions, limiting warming to 1.5 °C requires keeping total future emissions to a few hundred gigatonnes of CO_{2}, only a few years at current rates (~40 GtCO_{2} per year). Net zero emissions halt further CO_{2}-driven warming.
X: Equilibrium warming at 560 ppm CO_{2} (doubling from 280) with ECS = 3 °C?
> ΔT ≈ 3 °C (plus effects of other gases and aerosols)
!: Climate sensitivity isn't the warming we'll see by 2100; that depends on emissions and the slower transient response.
Q: What is equilibrium climate sensitivity? | The eventual global warming from a doubling of atmospheric CO_{2}.
Q: What is TCRE? | The transient warming per unit of cumulative CO_{2} emissions.
M1: IPCC's best estimate of ECS is: | 3 °C | 1 °C | 6 °C | 10 °C | AR6.
M2: Warming is roughly proportional to: | Cumulative CO_{2} emissions | Annual emissions | Population | Solar output | Carbon budget.

## Remote sensing of the atmosphere
S: Satellites and ground instruments measure the atmosphere remotely by analysing radiation it emits, absorbs or scatters. Remote sensing provides global data on temperature, gases, clouds, aerosols and winds for forecasting and climate monitoring.
H: Passive sensing
- **Infrared sounders** (IASI, AIRS, CrIS): temperature and humidity profiles from emission at different wavelengths.
- **Microwave sounders**: through clouds; key for weather forecasts; long-term temperature records.
- **Imagers**: visible and IR images of clouds and surfaces (geostationary: every 10 min).
- **Spectrometers** for gases: ozone (TOMS, OMI), CO_{2} (OCO-2), methane (TROPOMI, MethaneSAT detecting plumes from individual facilities).
H: Active sensing
- Radar: precipitation (GPM), clouds (CloudSat).
- Lidar: aerosols and cloud layers (CALIPSO), winds (Aeolus).
- GPS radio occultation: precise temperature profiles from signal bending.
H: Retrievals
P: Converting measured radiances into atmospheric quantities is an inverse problem, solved with radiative transfer models and prior information. Data assimilation feeds billions of observations daily into weather models; satellite records track climate change (sea ice decline, ozone hole recovery, energy imbalance).
X: How do infrared sounders get vertical profiles?
> Channels with different absorption strengths "see" to different heights
> Combining channels reconstructs temperature at many levels
!: Satellite measurements are indirect; they need careful calibration and validation against ground-based and balloon data.
Q: How does GPS radio occultation measure temperature? | From the bending of GPS signals passing through the atmosphere, which depends on density.
Q: What does TROPOMI measure? | Trace gases like methane, NO_{2} and ozone at high resolution.
M1: Microwave sounders are useful because: | They see through most clouds | They see colours | They measure gravity | They're cheap | Cloud-penetrating.
M2: Data assimilation combines: | Observations with model forecasts | Two satellites | Ocean and land only | Rain gauges only | Initial conditions.

## Atmospheric electricity and lightning
S: The atmosphere carries a global electric circuit: thunderstorms charge the ionosphere, and current leaks back through fair-weather air. Lightning discharges billions of joules in a fraction of a second, producing thunder, radio waves and even gamma rays.
H: The global circuit
- Ionosphere at ~+250 kV relative to the ground.
- Fair-weather field ~100 V m^{-1} downward; current density ~2 pA m^{-2}; total ~1 kA.
- Maintained by ~2000 thunderstorms active at any time.
H: Charging thunderclouds
- Collisions between graupel and ice crystals in the presence of supercooled water transfer charge (non-inductive charging).
- Typical tripole: positive top, negative middle, small positive bottom.
H: Lightning
- Stepped leader descends in ~50 m steps; upward streamers meet it; return stroke ~30 kA, ~30 000 K (five times the Sun's surface).
- ~1.4 billion flashes per year globally (~45 per second).
- Thunder from rapid air expansion; distance ≈ 340 m × seconds delay.
- Cloud-to-ground, intracloud, cloud-to-cloud; sprites, elves and blue jets above storms.
- Terrestrial gamma-ray flashes: electron runaway acceleration produces gamma rays (and even antimatter).
H: Effects
P: Lightning fixes nitrogen into NO_{x} (fertilising soils, affecting ozone), starts wildfires, and kills ~2000 people a year globally. Lightning rods (Franklin) provide a safe path to ground. Satellites (GOES Geostationary Lightning Mapper) track flashes continuously.
X: Thunder heard 9 s after a flash. Distance?
> d ≈ 343 × 9 ≈ 3.1 km
!: Lightning can strike the same place twice; tall objects like the Empire State Building are struck ~20–25 times a year.
Q: How do thunderclouds become charged? | Collisions between graupel and ice crystals transfer charge.
Q: What maintains the global electric circuit? | Thunderstorms worldwide charging the ionosphere.
M1: A lightning return stroke reaches about: | 30 000 K | 3000 K | 300 K | 3 million K | Hotter than the Sun's surface.
M2: Terrestrial gamma-ray flashes are produced by: | Runaway electrons accelerated in thunderstorm fields | Radioactive rocks | The Sun | Cosmic rays only | Relativistic electrons.
`;
