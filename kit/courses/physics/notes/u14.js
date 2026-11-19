// Unit 14: Heat Transfer and Thermal Physics. Format: kit/course/notes.js
export default `
## Conduction
S: Conduction transfers heat through a material without bulk motion, by collisions between neighbouring particles and, in metals, by free electrons. It's why a metal spoon in tea gets hot and why insulation works.
LV: Introductory · Foundation
O: Explain conduction by particle collisions, lattice vibrations and free electrons
O: Compare conductivities of metals, non-metals and gases
PRE: Heat and internal energy
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
T: Thermal conductivity | k, the heat flow per unit area per unit temperature gradient, in W m^{-1} K^{-1}
T: Phonon | A quantum of lattice vibration, the main heat carrier in non-metallic solids
SUM: Metals conduct well because free electrons carry heat (copper ≈ 400 W m^{-1} K^{-1}); still air is poor (≈ 0.025).
SUM: Good electrical conductors are usually good thermal conductors (Wiedemann–Franz law).
SRC: Incropera F. P., DeWitt D. P., Bergman T. L., Lavine A. S., Fundamentals of Heat and Mass Transfer, 7th edition, chapter 2, Wiley | secondary | 2011
SRC: OpenStax, University Physics Volume 2, section 1.6 "Mechanisms of Heat Transfer" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/1-6-mechanisms-of-heat-transfer
EV: established | Values quoted are typical at room temperature.
Q: Why is diamond an excellent heat conductor although it is an electrical insulator? | Its stiff, light lattice carries phonons very efficiently (k ≈ 2000 W m^{-1} K^{-1}).
M3@2,3: The Wiedemann–Franz law says k/(σT) is about the same for all metals. What does this imply? | The same electrons carry both heat and charge | Metals have the same thermal conductivity | Heat in metals is carried only by phonons | Electrical resistance doesn't depend on temperature | In metals free electrons dominate both transports, so k ∝ σT with the Lorenz number L ≈ 2.4 × 10^{−8} W Ω K^{−2}.
SA2@1,2: Explain why a tiled floor feels colder to bare feet than a carpet in the same room. | Both are at room temperature. Tile has a much higher thermal conductivity, so it draws heat from your feet quickly; carpet traps air (a poor conductor) and conducts heat away slowly. Your skin senses the rate of heat loss, not the floor's temperature. | both at the same temperature ; tile conducts better ; carpet traps insulating air ; skin senses heat flow rate

## Convection
S: Convection transfers heat by bulk movement of a fluid. Warm fluid rises because it's less dense, carrying energy with it. Convection drives weather, ocean currents, boiling, and cooling of everything from computers to stars.
LV: Introductory · Foundation
O: Distinguish natural from forced convection
O: Use the convective heat-transfer coefficient to estimate heat loss
PRE: Conduction
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
T: Natural convection | Fluid flow driven by buoyancy from temperature-induced density differences
T: Forced convection | Fluid flow driven by a fan, pump or wind
T: Heat-transfer coefficient | h in q = hAΔT, in W m^{-2} K^{-1}
SUM: Typical h: still air 5–25, moving air 10–200, water 50–10 000 W m^{-2} K^{-1}.
SUM: Wind chill is forced convection: moving air strips away the warm boundary layer.
SRC: Incropera F. P., DeWitt D. P., Bergman T. L., Lavine A. S., Fundamentals of Heat and Mass Transfer, 7th edition, chapters 6 and 9, Wiley | secondary | 2011
SRC: OpenStax, University Physics Volume 2, section 1.6 "Mechanisms of Heat Transfer" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/1-6-mechanisms-of-heat-transfer
EV: established | h values are rough ranges; real values depend on geometry and flow.
Q: Why are radiators placed under windows? | Rising warm air from the radiator meets the cold air falling from the glass, setting up circulation round the room.
M3@2,3: A person's 1.8 m^{2} of skin at 33 °C stands in still air at 20 °C (h ≈ 5 W m^{-2} K^{-1}). What is the convective heat loss? | About 120 W | About 12 W | About 1200 W | About 65 W | q = hAΔT = 5 × 1.8 × 13 ≈ 117 W, comparable to resting metabolic power (clothing reduces it).
SA2@2: Explain why stirring a hot drink cools it faster. | Stirring forces convection: it continually brings hot liquid from the middle to the surface and walls, where heat escapes by evaporation, conduction and radiation, and it thins the cooler boundary layer. The higher effective heat-transfer coefficient raises the rate of heat loss. | stirring forces convection ; hot fluid brought to the surface ; boundary layer thinned ; higher heat-transfer rate

## Thermal radiation
S: Every object above absolute zero emits electromagnetic radiation because of the thermal motion of its charges. Radiation needs no medium: it's how the Sun warms the Earth and how hot objects glow.
LV: Introductory · Foundation
O: Explain why all objects above absolute zero emit thermal radiation
O: Calculate net radiative exchange between a body and its surroundings
PRE: Conduction
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
T: Thermal radiation | Electromagnetic radiation emitted because of the thermal motion of charges
T: Net radiative power | P = εσA(T^{4} − T_{s}^{4}) for a body at T in surroundings at T_{s}
SUM: Radiation needs no medium; it is the only way heat crosses a vacuum.
SUM: Objects near room temperature radiate mainly in the infrared around 10 μm.
SRC: Incropera F. P., DeWitt D. P., Bergman T. L., Lavine A. S., Fundamentals of Heat and Mass Transfer, 7th edition, chapter 12, Wiley | secondary | 2011
SRC: OpenStax, University Physics Volume 2, section 1.6 "Mechanisms of Heat Transfer" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/1-6-mechanisms-of-heat-transfer
EV: established | Standard heat transfer.
Q: Why can thermal cameras see people in the dark? | People emit infrared radiation from their warm skin, whatever the visible light.
M3@2,3: A person (A = 1.8 m^{2}, ε = 0.97, skin 306 K) stands in a room at 293 K. What is the net radiative loss? | About 140 W | About 820 W | About 14 W | About 1.4 kW | P = 0.97 × 5.67 × 10^{−8} × 1.8 × (306^{4} − 293^{4}) ≈ 0.97 × 5.67 × 10^{−8} × 1.8 × 1.40 × 10^{9} ≈ 140 W.
SA2@1,2: Explain why you feel warm standing in sunlight on a cold day though the air is cold. | Sunlight carries energy by radiation, which doesn't need to heat the air in between. Your skin and clothes absorb it directly, warming you even while convection to the cold air removes heat. | radiation needs no medium ; absorbed directly by skin ; air needn't be warm ; radiative gain outweighs convective loss

## Fourier's law of heat conduction
S: Fourier's law states that heat flux is proportional to the temperature gradient and flows down it. Combined with energy conservation, it gives the heat equation, the model for diffusion of heat in any material.
LV: Intermediate · Application
O: Use Fourier's law q = −k dT/dx for steady conduction
O: Derive and interpret the heat equation
PRE: Conduction
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
T: Fourier's law | q = −k∇T: heat flux is proportional to the temperature gradient and flows down it
T: Heat equation | ∂T/∂t = α∇^{2}T, with α = k/(ρc)
SUM: Steady flow through a slab: P = kAΔT/L, with a linear temperature profile.
SUM: Combining Fourier's law with energy conservation gives the heat (diffusion) equation.
SRC: Fourier J. B. J., Théorie analytique de la chaleur, Paris | primary | 1822
SRC: Incropera F. P., DeWitt D. P., Bergman T. L., Lavine A. S., Fundamentals of Heat and Mass Transfer, 7th edition, chapters 2–3, Wiley | secondary | 2011
EV: established | Excellent for macroscopic conduction; fails at nanoscale and very short times.
Q: Why is there a minus sign in Fourier's law? | Heat flows from hot to cold, opposite to the direction in which temperature increases.
M3@2,3: A 0.20 m brick wall (k = 0.70 W m^{-1} K^{-1}) of area 10 m^{2} has 20 °C inside and 0 °C outside. What heat flows through it? | 700 W | 70 W | 2800 W | 140 W | P = kAΔT/L = 0.70 × 10 × 20/0.20 = 700 W.
SA2@2: Show that the steady temperature profile in a uniform slab with no heat sources is linear. | In steady state ∂T/∂t = 0, so the heat equation becomes d^{2}T/dx^{2} = 0. Integrating twice gives T = Ax + B, a straight line between the two face temperatures; the flux −k dT/dx is constant through the slab. | steady state ; d^{2}T/dx^{2} = 0 ; integrate twice ; linear profile with constant flux

## Newton's law of cooling
S: Newton's law of cooling says an object's rate of heat loss is proportional to the temperature difference between it and its surroundings. Its temperature then approaches the surroundings exponentially.
LV: Introductory · Application
O: Apply Newton's law of cooling to predict temperature against time
O: Explain its assumptions and limits
PRE: Convection
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
T: Newton's law of cooling | dT/dt = −k(T − T_{s}): heat-loss rate proportional to the temperature excess
T: Lumped-capacity model | Treating a body as having one uniform temperature, valid when its Biot number is small
SUM: T − T_{s} decays exponentially with time constant τ = mc/(hA).
SUM: Valid for modest temperature differences with convection dominating; radiation makes it less accurate at large ΔT.
SRC: Newton I., "Scala graduum caloris", Philosophical Transactions of the Royal Society 22, 824–829 | primary | 1701 | https://doi.org/10.1098/rstl.1700.0082
SRC: Incropera F. P., DeWitt D. P., Bergman T. L., Lavine A. S., Fundamentals of Heat and Mass Transfer, 7th edition, chapter 5, Wiley | secondary | 2011
EV: established | A good approximation in its regime.
Q: What is the Biot number? | Bi = hL/k, comparing surface heat transfer with internal conduction; small Bi means a uniform temperature.
M3@2,3: A forensic scientist finds a body at 31 °C in a 21 °C room; an hour later it is 29 °C. Assuming Newton's law from 37 °C, about how long before the first reading did death occur? | About 2.1 hours | About 1.0 hour | About 6 hours | About 30 minutes | The excess falls from 10 to 8 K in 1 h, so k = ln(1.25) ≈ 0.223 h^{-1}; from 16 to 10 K takes ln(1.6)/0.223 ≈ 2.1 h (a simplified model; real estimates use more factors).
SA2@1,2: Explain why Newton's law of cooling works poorly for a red-hot poker. | At high temperatures radiation dominates and its rate depends on T^{4} − T_{s}^{4}, not on T − T_{s}. Convection coefficients also change with temperature. The cooling rate is far from proportional to the excess, so the curve isn't a simple exponential. | radiation dominates at high T ; depends on T^{4} ; not proportional to excess ; non-exponential cooling

## Stefan–Boltzmann law
S: The Stefan–Boltzmann law gives the total power radiated by a blackbody: proportional to its surface area and the fourth power of its absolute temperature. It lets us find stars' sizes and planets' temperatures.
LV: Introductory · Application
O: Calculate radiated power with P = εσAT^{4}
O: Use the law to estimate stellar luminosities and planetary temperatures
PRE: Thermal radiation
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
T: Stefan–Boltzmann constant | σ = 5.67 × 10^{-8} W m^{-2} K^{-4}
T: Luminosity | The total power radiated by a star: L = 4πR^{2}σT^{4}
SUM: Radiated power ∝ T^{4}: doubling T multiplies power by 16.
SUM: A planet's equilibrium temperature: T = T_{☉}√(R_{☉}/2d)(1 − a)^{1/4}.
SRC: Stefan J., "Über die Beziehung zwischen der Wärmestrahlung und der Temperatur", Wiener Berichte 79, 391–428 | primary | 1879
SRC: Carroll B. W., Ostlie D. A., An Introduction to Modern Astrophysics, 2nd edition, chapter 3, Pearson | secondary | 2007
EV: established | Exact for a blackbody; derived from Planck's law.
Q: How does a star's luminosity depend on its radius and temperature? | L = 4πR^{2}σT^{4}.
M3@2,3: A lamp filament runs at 2500 K. By what factor does its radiated power rise if it runs at 3000 K, with the same area and emissivity? | About 2.1 | About 1.2 | About 1.44 | About 4.0 | P ∝ T^{4}: (3000/2500)^{4} = 1.2^{4} ≈ 2.07, which is why small voltage changes alter brightness so much.
SA2@1,2: Two stars have the same temperature but one has twice the radius. Compare their luminosities and explain. | L = 4πR^{2}σT^{4}. Same T means the same power per square metre, but doubling R quadruples the surface area, so the larger star is four times as luminous. | L ∝ R^{2}T^{4} ; same flux per area ; area four times larger ; four times the luminosity

## Wien's displacement law
S: Wien's law says the wavelength at which a blackbody's emission peaks is inversely proportional to its temperature. Hotter objects glow bluer; it's how we read the temperatures of stars from their colours.
LV: Introductory · Application
O: Use λ_{max}T = 2.90 × 10^{-3} m K to find temperatures from spectra
O: Explain colour changes of hot objects and choice of thermal-camera wavelengths
PRE: Stefan–Boltzmann law
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
T: Wien's constant | b = 2.898 × 10^{-3} m K
T: Colour temperature | The temperature of a blackbody whose colour matches a light source
SUM: Hotter bodies peak at shorter wavelengths: the Sun ~500 nm, a person ~10 μm, the CMB ~1 mm.
SUM: Thermal cameras work in the 8–14 μm band where room-temperature objects emit most.
SRC: Wien W., "Über die Energievertheilung im Emissionsspectrum eines schwarzen Körpers", Annalen der Physik 294, 662–669 | primary | 1896 | https://doi.org/10.1002/andp.18962940803
SRC: OpenStax, University Physics Volume 3, section 6.1 "Blackbody Radiation" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/6-1-blackbody-radiation
EV: established | Exact consequence of Planck's law.
Q: Why do "warm white" bulbs look yellower than "cool white" ones? | They have a lower colour temperature (about 2700 K vs 5000 K+), peaking at longer wavelengths.
M3@2,3: A human body at 310 K: where does its thermal emission peak? | About 9.3 μm | About 930 nm | About 93 μm | About 0.93 mm | λ = 2.90 × 10^{-3}/310 ≈ 9.4 × 10^{-6} m, in the far infrared.
SA2@1: Betelgeuse looks red and Rigel blue-white. What does Wien's law tell you about their surface temperatures? | Red light means a longer peak wavelength and so a lower temperature (about 3500 K for Betelgeuse); blue-white means a shorter peak and a higher temperature (about 11 000 K for Rigel). λ_{max}T is constant, so temperature is inversely proportional to peak wavelength. | colour shows peak wavelength ; red is cooler ; blue is hotter ; T ∝ 1/λ_{max}

## Thermal diffusivity
S: Thermal diffusivity measures how quickly temperature changes spread through a material. It combines conductivity (how well heat flows) with heat capacity per volume (how much heat is needed to warm it).
LV: Intermediate · Application
O: Define thermal diffusivity and calculate it
O: Use L ~ √(αt) to estimate how far heat penetrates in a given time
PRE: Fourier's law of heat conduction
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
T: Thermal diffusivity | α = k/(ρc), in m^{2} s^{-1}
T: Diffusion length | L ~ √(αt), the distance a temperature change spreads in time t
SUM: High α means temperature changes spread fast (metals); low α means slow (wood, soil).
SUM: Doubling the thickness quadruples the time for heat to soak through.
SRC: Incropera F. P., DeWitt D. P., Bergman T. L., Lavine A. S., Fundamentals of Heat and Mass Transfer, 7th edition, chapter 5, Wiley | secondary | 2011
SRC: Carslaw H. S., Jaeger J. C., Conduction of Heat in Solids, 2nd edition, Oxford University Press | secondary | 1959
EV: established | Standard diffusion scaling.
Q: Why do cellars stay at nearly constant temperature all year? | Soil's low diffusivity means the annual temperature wave penetrates only a few metres and is strongly damped and delayed.
M3@2,3: A steak 2.0 cm thick (α ≈ 1.3 × 10^{-7} m^{2} s^{-1}) is cooked from both sides. Roughly how long until the centre heats? | About 13 minutes | About 13 seconds | About 13 hours | About 1 minute | Heat must reach 1.0 cm: t ~ L^{2}/α = 10^{-4}/1.3 × 10^{-7} ≈ 770 s.
SA2@1,2: Explain why a large turkey takes much more than twice as long to roast as one half its size. | Heat soaks in by diffusion, with time ∝ L^{2}/α. A turkey twice as large in each dimension has L doubled, so heat takes about four times as long to reach the centre (in practice somewhat less, because shape and oven conditions matter). | conduction time ∝ L^{2} ; twice the size doubles L ; about four times longer ; practical corrections

## Heat exchangers
S: Heat exchangers move heat from one fluid to another without mixing them. They're everywhere: car radiators, boilers, condensers, air conditioners, and the countercurrent blood vessels in a penguin's feet.
LV: Intermediate · Application
O: Compare parallel-flow and counterflow heat exchangers
O: Use Q = UAΔT_{lm} to size a simple exchanger
PRE: Convection
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
T: Overall heat-transfer coefficient | U, combining convection on both sides and conduction through the wall
T: Log-mean temperature difference | ΔT_{lm} = (ΔT_{1} − ΔT_{2})/ln(ΔT_{1}/ΔT_{2})
T: Counterflow | Hot and cold fluids flowing in opposite directions
SUM: Counterflow keeps a temperature difference along the whole length and transfers more heat than parallel flow.
SUM: Fish, birds' legs and kidneys use biological counter-current exchange.
SRC: Incropera F. P., DeWitt D. P., Bergman T. L., Lavine A. S., Fundamentals of Heat and Mass Transfer, 7th edition, chapter 11, Wiley | secondary | 2011
SRC: Çengel Y. A., Ghajar A. J., Heat and Mass Transfer: Fundamentals and Applications, 5th edition, McGraw-Hill | secondary | 2015
EV: established | Standard engineering heat transfer.
Q: Why can the cold outlet be hotter than the hot outlet in a counterflow exchanger? | The cold fluid leaves next to where the hot fluid enters, so it can approach the hot inlet temperature.
M3@2,3: An exchanger has ΔT = 60 K at one end and 20 K at the other. What is the log-mean temperature difference? | About 36 K | 40 K, the arithmetic mean | 20 K, the smaller value | About 52 K | ΔT_{lm} = (60 − 20)/ln 3 ≈ 40/1.099 ≈ 36 K.
SA2@2: Explain how counter-current blood flow keeps a duck's feet from losing much heat on ice. | Warm arterial blood flowing down the leg runs alongside cold venous blood returning up it. Heat passes from the arteries to the veins all along the leg, so arterial blood reaches the feet already cool and venous blood returns to the body warmed: little heat is lost from the cold feet. | arteries and veins side by side ; opposite directions ; heat passes along the whole length ; feet stay cool, body heat retained

## Insulation and thermal resistance
S: Insulation slows heat flow. The idea of thermal resistance, like electrical resistance, lets you add up layers and paths to find the total heat loss of a wall, a house or a cryostat.
LV: Introductory · Application
O: Calculate thermal resistance of layers in series and parallel
O: Use U-values to compare building elements
PRE: Fourier's law of heat conduction
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
T: Thermal resistance | R = L/(kA) for conduction, 1/(hA) for convection, in K W^{-1}
T: U-value | Heat flow per unit area per kelvin through a building element, in W m^{-2} K^{-1}
SUM: Layers in series: resistances add, so P = ΔT/ΣR, like current through series resistors.
SUM: Good insulators trap still air or gas in small pockets (foam, fibreglass, double glazing).
SRC: Incropera F. P., DeWitt D. P., Bergman T. L., Lavine A. S., Fundamentals of Heat and Mass Transfer, 7th edition, chapter 3, Wiley | secondary | 2011
SRC: CIBSE, Guide A: Environmental Design, 8th edition | guidance | 2015
EV: established | Standard heat transfer and building practice.
Q: What does a lower U-value mean? | Better insulation: less heat flow per square metre per kelvin.
M3@2,3: A wall has a 0.10 m brick layer (k = 0.70) and 0.050 m of foam (k = 0.030 W m^{-1} K^{-1}). What is its conduction U-value? | About 0.55 W m^{-2} K^{-1} | About 7.0 W m^{-2} K^{-1}, from the brick alone | About 0.60 W m^{-2} K^{-1}, from the foam alone | About 1.3 W m^{-2} K^{-1}, from the average k | R per m^{2} = 0.10/0.70 + 0.050/0.030 = 0.143 + 1.667 = 1.81 m^{2} K W^{-1}; U = 1/1.81 ≈ 0.55 W m^{-2} K^{-1} (surface resistances would lower it a little further).
SA2@1,2: Explain why double glazing insulates better than a single pane twice as thick. | Glass conducts heat fairly well (k ≈ 1 W m^{-1} K^{-1}), so doubling its thickness only halves a small resistance. Double glazing traps a layer of still air or argon (k ≈ 0.02–0.025), whose thermal resistance is far larger than the glass's; the gap is narrow enough to limit convection. | glass conducts fairly well ; doubling glass helps little ; trapped gas has very low k ; narrow gap limits convection

## Blackbody and greybody radiation
S: A blackbody absorbs and emits perfectly at every wavelength; real surfaces don't. A greybody has the same emissivity at all wavelengths, a convenient approximation; truly selective surfaces vary strongly with wavelength.
LV: Intermediate · Foundation
O: Distinguish blackbodies, greybodies and selective surfaces
O: Explain why a cavity with a small hole approximates a blackbody
PRE: Wien's displacement law
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
T: Blackbody | A perfect absorber and emitter at every wavelength (ε = 1)
T: Greybody | A surface with the same emissivity at all wavelengths, less than 1
T: Selective surface | A surface whose emissivity changes strongly with wavelength
SUM: Real surfaces are approximately grey over limited ranges; P = εσAT^{4}.
SUM: Radiation entering a small hole in a cavity is almost all absorbed after many reflections, so the hole is nearly black.
SRC: Incropera F. P., DeWitt D. P., Bergman T. L., Lavine A. S., Fundamentals of Heat and Mass Transfer, 7th edition, chapter 12, Wiley | secondary | 2011
SRC: Kirchhoff G., "Über das Verhältniss zwischen dem Emissionsvermögen und dem Absorptionsvermögen der Körper für Wärme und Licht", Annalen der Physik 185, 275–301 | primary | 1860 | https://doi.org/10.1002/andp.18601850205
EV: established | Standard radiation physics.
Q: Why does the pupil of the eye look black? | Light entering it is absorbed inside after multiple reflections, like a cavity blackbody.
M3@2,3: Solar water-heater panels use selective coatings. What property do they need? | High absorptivity for visible light, low emissivity in the infrared | Low absorptivity for all wavelengths | Emissivity of exactly 1 at all wavelengths | High infrared emissivity, low visible absorptivity | They absorb sunlight (peaking near 0.5 μm) but radiate poorly at their own temperature (around 10 μm), so they stay hot.
SA2@2: A shiny metal teapot and a black one of the same shape hold equally hot tea. Which cools faster by radiation, and why? | The black one: its emissivity is close to 1, while polished metal's is about 0.05. By P = εσA(T^{4} − T_{s}^{4}), the black pot radiates far more power at the same temperature, so it cools faster (convection is similar for both). | black emissivity near 1 ; shiny metal much lower ; P ∝ ε ; black pot cools faster

## Emissivity and absorptivity
S: Emissivity is how well a surface emits thermal radiation compared with a blackbody; absorptivity is the fraction of incoming radiation it absorbs. Kirchhoff's law says they're equal at each wavelength in thermal equilibrium: good absorbers are good emitters.
LV: Intermediate · Application
O: State Kirchhoff's law of thermal radiation
O: Explain why infrared thermometers need the correct emissivity setting
PRE: Blackbody and greybody radiation
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
T: Emissivity | ε, the ratio of a surface's emitted radiation to a blackbody's at the same temperature
T: Absorptivity | The fraction of incident radiation a surface absorbs
T: Kirchhoff's law | At each wavelength and in equilibrium, emissivity equals absorptivity
SUM: Good absorbers are good emitters at the same wavelength; poor absorbers (shiny metals) are poor emitters.
SUM: An infrared thermometer set to ε = 0.95 reads shiny metal far too cold.
SRC: Kirchhoff G., "Über das Verhältniss zwischen dem Emissionsvermögen und dem Absorptionsvermögen der Körper für Wärme und Licht", Annalen der Physik 185, 275–301 | primary | 1860 | https://doi.org/10.1002/andp.18601850205
SRC: Incropera F. P., DeWitt D. P., Bergman T. L., Lavine A. S., Fundamentals of Heat and Mass Transfer, 7th edition, chapter 12, Wiley | secondary | 2011
EV: established | Standard radiation physics.
Q: Why are space blankets shiny? | Low emissivity means they radiate little heat; they also reflect the body's infrared back.
M3@2,3: An infrared thermometer set to ε = 1 views a surface with ε = 0.50 at 400 K (ignoring reflections). What does it read? | About 336 K | 400 K | 200 K | About 476 K | It infers T from σT_{read}^{4} = 0.5σ(400)^{4}, so T_{read} = 400 × 0.5^{1/4} ≈ 336 K.
SA2@1,2: Explain why white paint keeps a roof cool in sunshine yet still radiates heat well at night. | White paint reflects most visible sunlight (low visible absorptivity), so it gains little solar heat. In the infrared, however, most paints are nearly black (high emissivity around 0.9), so by Kirchhoff's law they radiate their heat efficiently. | low visible absorptivity ; reflects sunlight ; high infrared emissivity ; radiates heat well

## Greenhouse effect
S: Greenhouse gases are transparent to most incoming sunlight but absorb and re-emit outgoing infrared. This keeps Earth's surface about 33 K warmer than it would otherwise be; adding more of these gases raises the temperature further.
LV: Intermediate · Foundation
O: Explain the greenhouse effect using absorption and re-emission of infrared radiation
O: Distinguish the natural greenhouse effect from human-enhanced warming
PRE: Stefan–Boltzmann law
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
T: Greenhouse gas | A gas that absorbs and emits infrared radiation, such as H_{2}O, CO_{2}, CH_{4} and N_{2}O
T: Radiative forcing | A change in Earth's energy balance in W m^{-2}, caused by a change such as more CO_{2}
T: Climate sensitivity | The eventual warming for a doubling of CO_{2}
SUM: Greenhouse gases let sunlight in but absorb outgoing infrared and re-emit it from higher, colder levels, warming the surface by about 33 K.
SUM: IPCC AR6: human influence has warmed the climate by about 1.1 °C since 1850–1900; best-estimate climate sensitivity about 3 °C.
SRC: IPCC, Climate Change 2021: The Physical Science Basis, Working Group I contribution to the Sixth Assessment Report | guidance | 2021 | https://www.ipcc.ch/report/ar6/wg1/
SRC: Arrhenius S., "On the influence of carbonic acid in the air upon the temperature of the ground", Philosophical Magazine 41, 237–276 | primary | 1896 | https://doi.org/10.1080/14786449608620846
EV: established | The greenhouse effect and human-caused warming are established; the exact climate sensitivity has an uncertainty range (likely 2.5–4 °C).
Q: Why aren't N_{2} and O_{2} greenhouse gases? | Symmetric diatomic molecules have no changing dipole when they vibrate, so they hardly absorb infrared.
M3@2,3: Why does adding CO_{2} still warm the planet even though some of its absorption bands are already saturated near the surface? | Extra CO_{2} raises the effective height of emission to colder layers and widens the band edges, so less energy escapes | It doesn't: saturation means more CO_{2} has no effect | It reflects more sunlight back to space | It traps heat by blocking convection | Outgoing radiation escapes from higher, colder air (emitting less, by σT^{4}); forcing grows roughly as ln(C/C_{0}).
SA2@1,2: Explain the greenhouse effect using the energy balance of Earth's surface. | The surface absorbs sunlight and radiates infrared. Greenhouse gases absorb much of that infrared and re-emit it in all directions, including back down. The surface thus receives energy from both the Sun and the atmosphere, and must warm until its own emission balances both: about 288 K instead of about 255 K. | surface absorbs sunlight ; greenhouse gases absorb infrared ; re-emit some downwards ; surface warms to balance

## Thermoelectric effects
S: Thermoelectric effects convert directly between heat and electricity in conducting materials. A temperature difference drives a voltage (Seebeck), a current carries heat (Peltier), and current in a temperature gradient absorbs or releases heat (Thomson).
LV: Intermediate · Foundation
O: Name the Seebeck, Peltier and Thomson effects
O: Explain the figure of merit ZT for thermoelectric materials
PRE: Conduction
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
T: Seebeck coefficient | S, the voltage produced per kelvin of temperature difference
T: Figure of merit | ZT = S^{2}σT/k; good thermoelectric materials have ZT around 1 or more
T: Thomson effect | Heating or cooling in a single conductor carrying current along a temperature gradient
SUM: Good thermoelectrics conduct electricity well but heat poorly: a "phonon glass, electron crystal".
SUM: Uses: thermocouples, spacecraft RTGs, portable coolers; efficiencies are far below heat engines.
SRC: Snyder G. J., Toberer E. S., "Complex thermoelectric materials", Nature Materials 7, 105–114 | secondary | 2008 | https://doi.org/10.1038/nmat2090
SRC: Rowe D. M. (ed), Thermoelectrics Handbook: Macro to Nano, CRC Press | secondary | 2006
EV: established | Standard solid-state physics; ZT above about 2 is reported in some materials but hard to use in devices.
Q: Why do thermoelectric materials need low thermal conductivity? | Otherwise heat leaks straight across, destroying the temperature difference that produces the voltage.
M3@2,3: A material has S = 200 μV K^{-1}, σ = 1.0 × 10^{5} S m^{-1} and k = 1.5 W m^{-1} K^{-1}. What is ZT at 300 K? | 0.80 | 8.0 | 0.080 | 2.4 | ZT = S^{2}σT/k = (2 × 10^{-4})^{2} × 10^{5} × 300/1.5 = 0.80.
SA2@1,2: Explain why NASA uses thermoelectric generators for deep-space probes despite their low efficiency. | Far from the Sun, solar panels produce little power. A radioisotope thermoelectric generator turns the heat of decaying plutonium-238 directly into electricity with no moving parts, so it works reliably for decades in the cold of space; reliability matters more than efficiency. | sunlight weak far from the Sun ; radioisotope heat source ; no moving parts ; long-lasting reliability

## Peltier and Seebeck effects
S: Seebeck and Peltier effects are two faces of thermoelectricity. Seebeck devices turn heat into electricity (thermocouples, RTGs); Peltier devices pump heat with a current (portable coolers, laser and sensor temperature control).
LV: Intermediate · Application
O: Explain how a thermocouple measures temperature
O: Explain how a Peltier module pumps heat
PRE: Thermoelectric effects
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
T: Thermocouple | A junction of two different metals whose Seebeck voltage measures temperature difference
T: Peltier coefficient | Π, the heat carried per unit charge across a junction; Π = ST (Kelvin relation)
T: Cold-junction compensation | Correcting a thermocouple reading for the temperature of its reference junction
SUM: Seebeck: ΔT → voltage. Peltier: current → heat pumped across a junction.
SUM: Peltier coolers have no moving parts but low COP; Joule heating competes with cooling at high current.
SRC: Rowe D. M. (ed), Thermoelectrics Handbook: Macro to Nano, CRC Press | secondary | 2006
SRC: NIST, ITS-90 Thermocouple Database, SRD 60 | data | 2000 | https://srdata.nist.gov/its90/main/
EV: established | Standard thermoelectric physics; the Kelvin relation is an Onsager reciprocal relation.
Q: Type K thermocouples give about 41 μV K^{-1}. What voltage does a 500 K difference give? | About 20 mV.
M3@2,3: Raising the current through a Peltier cooler first improves cooling and then makes it worse. Why? | Peltier cooling rises as I, but Joule heating rises as I^{2} and eventually wins | The semiconductor melts at high current | The Seebeck voltage reverses at high current | The Kelvin relation stops holding | Net cooling ≈ ΠI − ½I^{2}R − conduction, which has a maximum at an optimum current.
SA2@2: Explain why a thermocouple measures a temperature difference, not an absolute temperature. | The Seebeck voltage depends on the temperature difference between the measuring junction and the reference junction where the wires meet the meter. To find absolute temperature you need the reference junction's temperature, measured separately (cold-junction compensation) or held at 0 °C in ice. | voltage set by the difference ; two junctions ; reference temperature needed ; cold-junction compensation

## Thermal contact resistance
S: When two solid surfaces touch, they really meet only at tiny high points, so heat flow across the interface is impeded. This contact resistance can dominate heat transfer in electronics, engines and cryogenic systems.
LV: Intermediate · Application
O: Explain why interfaces between solids resist heat flow
O: Describe ways to reduce contact resistance
PRE: Insulation and thermal resistance
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
T: Thermal contact resistance | The extra resistance to heat flow at an interface, from imperfect contact
T: Thermal interface material | A paste, pad or solder that fills gaps between surfaces
T: Kapitza resistance | Boundary resistance between different materials even with perfect contact, important at low temperature
SUM: Surfaces touch only at asperities; gaps filled with air conduct poorly.
SUM: Pressure, smoother surfaces, soft metals or thermal paste reduce contact resistance.
SRC: Incropera F. P., DeWitt D. P., Bergman T. L., Lavine A. S., Fundamentals of Heat and Mass Transfer, 7th edition, chapter 3, Wiley | secondary | 2011
SRC: Swartz E. T., Pohl R. O., "Thermal boundary resistance", Reviews of Modern Physics 61, 605–668 | secondary | 1989 | https://doi.org/10.1103/RevModPhys.61.605
EV: established | Standard heat transfer; values vary widely with surfaces and pressure.
Q: Why is thermal paste used between a CPU and its heat sink? | It fills microscopic air gaps, greatly lowering the contact resistance.
M3@2,3: A CPU dissipates 100 W through a contact resistance of 0.20 K W^{-1} and a heat sink of 0.30 K W^{-1} to 30 °C air. What is its temperature? | 80 °C | 50 °C | 60 °C | 130 °C | ΔT = P × ΣR = 100 × 0.50 = 50 K, so 30 + 50 = 80 °C.
SA2@1,2: Explain why bolting two metal blocks together more tightly improves heat flow between them. | The surfaces touch only at microscopic high points; most of the interface is air gaps that conduct poorly. Greater pressure flattens the asperities, increasing the true contact area, so more heat crosses through solid contact. | contact only at asperities ; gaps are air ; pressure enlarges true contact area ; resistance falls

## Cryogenics
S: Cryogenics is the production and use of very low temperatures, typically below about 120 K. It liquefies gases, enables superconducting magnets and quantum computers, and preserves biological samples.
LV: Intermediate · Foundation
O: Describe how gases are liquefied by compression, cooling and expansion
O: Describe cryogenic uses and hazards
SAFE: Cryogenic liquids cause cold burns and can displace oxygen as they boil off. Handle them only if trained, with face and hand protection, in ventilated spaces and following your laboratory's risk assessment.
PRE: Adiabatic processes
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
T: Joule–Thomson effect | Temperature change of a real gas expanding through a valve at constant enthalpy
T: Inversion temperature | The temperature above which Joule–Thomson expansion warms a gas instead of cooling it
T: Linde process | Liquefaction by repeated compression, counter-current cooling and Joule–Thomson expansion
SUM: Liquid nitrogen boils at 77 K and helium-4 at 4.2 K; helium must be pre-cooled below its inversion temperature (~40 K) to liquefy.
SUM: Uses: MRI superconducting magnets, food freezing, rocket propellants, preserving biological samples.
SRC: Barron R. F., Cryogenic Systems, 2nd edition, Oxford University Press | secondary | 1985
SRC: British Compressed Gases Association, Code of Practice CP30: The safe use of liquid nitrogen dewars | guidance | 2019
EV: established | Standard cryogenic engineering.
Q: Why is liquid nitrogen dangerous in a small closed room? | It boils into a large volume of nitrogen gas that can displace oxygen and cause asphyxiation.
M3@2,3: One litre of liquid nitrogen (808 g) boils to gas at room temperature. Roughly what volume of gas forms? | About 700 litres | About 7 litres | About 70 litres | About 7000 litres | 808/28 ≈ 29 mol; at 293 K and 1 atm, 29 × 24 L ≈ 690 L.
SA2@1,2: Explain why helium must be pre-cooled before Joule–Thomson expansion can liquefy it. | Joule–Thomson expansion cools a gas only below its inversion temperature, where attractive forces dominate. Helium's attractions are very weak, so its inversion temperature is only about 40 K; at room temperature expansion warms it. It must first be cooled (by liquid nitrogen, liquid hydrogen or an expansion engine) below 40 K. | JT cooling needs T below inversion ; helium's is about 40 K ; weak attractions ; pre-cooling required

## Low-temperature physics
S: Cooling matter towards absolute zero reveals quantum behaviour on a macroscopic scale: superconductivity, superfluidity, quantum Hall effects and Bose–Einstein condensates. Low temperatures silence thermal noise so quantum effects dominate.
LV: Advanced · Foundation
O: Describe macroscopic quantum phenomena seen at low temperature
O: Explain how dilution refrigerators and magnetic cooling reach millikelvin and below
PRE: Cryogenics
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
T: Superfluid | A liquid flowing with zero viscosity, as ^{4}He below 2.17 K
T: Superconductor | A material with zero electrical resistance below a critical temperature
T: Adiabatic demagnetisation | Cooling by removing a magnetic field from an aligned paramagnet slowly and without heat flow
SUM: Low temperatures reveal superconductivity, superfluidity, Bose–Einstein condensation and quantum Hall effects.
SUM: Dilution refrigerators reach a few mK; nuclear demagnetisation reaches microkelvin and below.
SRC: Pobell F., Matter and Methods at Low Temperatures, 3rd edition, Springer | secondary | 2007
SRC: Onnes H. K., "The resistance of pure mercury at helium temperatures", Communications from the Physical Laboratory of the University of Leiden 120b | primary | 1911
EV: established | Standard low-temperature physics.
Q: Who discovered superconductivity, and in what? | Heike Kamerlingh Onnes, in mercury at about 4.2 K, in 1911.
M3@2,3: Why is a dilution refrigerator, not a pumped helium-4 bath, needed below about 0.3 K? | Helium's vapour pressure becomes too low to pump; dilution uses ^{3}He crossing into ^{4}He instead | Helium-4 becomes radioactive below 1 K | Pumped helium-4 freezes into a solid at 1 K | Dilution refrigerators are cheaper to run | Evaporative cooling stalls as vapour pressure collapses; mixing ^{3}He into ^{4}He absorbs heat down to millikelvin.
SA2@1,2: Explain how adiabatic demagnetisation cools a paramagnetic salt. | Magnetise the salt in a strong field while it's in contact with a cold bath: its spins align, lowering their entropy, and the heat released flows to the bath. Isolate it thermally, then slowly remove the field. Total entropy stays constant, so the spins' disorder can only rise by taking energy from the lattice vibrations, cooling the salt. | magnetise in contact with a bath ; entropy of spins lowered ; isolate and remove field slowly ; spins take energy from the lattice, cooling it

## Heat transport in solids and fluids
S: Heat moves through matter by different carriers: phonons and electrons in solids, molecules in gases, and both conduction and convection in liquids. Understanding the carriers explains why conductivities span over five orders of magnitude.
LV: Advanced · Foundation
O: Compare heat carriers: phonons, electrons, molecules and radiation
O: Explain size effects on thermal conductivity at the nanoscale
PRE: Conduction
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
T: Phonon mean free path | The distance phonons travel between scattering events
T: Ballistic transport | Heat carried without scattering when the system is smaller than the mean free path
SUM: Kinetic theory: k ≈ ⅓Cvλ for every carrier, with C the heat capacity per volume, v speed and λ mean free path.
SUM: In thin films and nanowires, boundary scattering shortens λ and lowers k.
SRC: Chen G., Nanoscale Energy Transport and Conversion, Oxford University Press | secondary | 2005
SRC: Kittel C., Introduction to Solid State Physics, 8th edition, chapter 5, Wiley | secondary | 2005
EV: established | Kinetic theory gives correct scalings; detailed predictions need full phonon calculations.
Q: Why does a crystal's thermal conductivity rise and then fall as it is cooled? | At first fewer phonon–phonon collisions lengthen λ; at very low T, C falls as T^{3} and λ is capped by the crystal's size.
M3@2,3: A silicon nanowire 50 nm wide conducts heat much worse than bulk silicon. Why? | Phonons scatter off its surfaces, so their mean free path is limited to about its width | Silicon's heat capacity drops in thin wires | Nanowires have no free electrons | Heat in nanowires is carried only by radiation | Bulk silicon phonon mean free paths reach hundreds of nm; boundary scattering cuts λ and so k ≈ ⅓Cvλ.
SA2@1,2: Use k ≈ ⅓Cvλ to explain why gases conduct heat far less well than solids. | Gas molecules have a long mean free path but a tiny heat capacity per volume, because there are so few molecules per m^{3}, and they move only a few hundred m s^{-1}. Solids have a far higher heat capacity per volume and phonons travel at sound speed (several km s^{-1}), so their product Cvλ is much larger. | k ≈ ⅓Cvλ ; gases have low C per volume ; solids have high C and fast phonons ; product much larger in solids

## Thermal management in engineering
S: Thermal management keeps devices within safe temperatures: removing heat from chips, batteries, engines and spacecraft, or keeping things warm. Performance, reliability and safety all depend on it.
LV: Intermediate · Application
O: Use thermal resistance networks to design cooling for devices
O: Compare passive and active cooling methods
PRE: Thermal contact resistance
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
T: Heat sink | A finned conductor that increases area for convective cooling
T: Heat pipe | A sealed tube transferring heat by evaporation and condensation, far better than solid copper
T: Junction temperature | The temperature of a chip's active region, which must stay below its rated maximum
SUM: Model the path from source to ambient as resistances in series: T_{j} = T_{ambient} + PΣR.
SUM: Options: fins, fans, heat pipes, liquid cooling, phase-change materials; batteries also need limits on low temperature.
SRC: Incropera F. P., DeWitt D. P., Bergman T. L., Lavine A. S., Fundamentals of Heat and Mass Transfer, 7th edition, chapter 3, Wiley | secondary | 2011
SRC: Faghri A., "Review and advances in heat pipe science and technology", Journal of Heat Transfer 134, 123001 | secondary | 2012 | https://doi.org/10.1115/1.4007407
EV: established | Standard engineering practice.
Q: Why do heat sinks have fins? | To increase the surface area for convection to the air.
M3@2,3: An LED dissipates 3.0 W; junction-to-case 4.0 K W^{-1}, case-to-sink 1.0 K W^{-1}, sink-to-air 10 K W^{-1}, air at 25 °C. Is the 85 °C junction limit met? | Yes: T_{j} = 25 + 3.0 × 15 = 70 °C, below the limit | No: the junction reaches 115 °C | Yes, but only just, at 85 °C | No: the junction reaches 95 °C | T_{j} = 25 + 3.0 × (4 + 1 + 10) = 70 °C, below 85 °C; the sink is the largest resistance.
SA2@2: Explain why a heat pipe moves heat far better than a solid copper rod of the same size. | Inside, a liquid evaporates at the hot end, absorbing latent heat; the vapour travels quickly to the cold end, condenses and releases it; a wick returns the liquid. Latent heat transfer with a tiny temperature drop gives an effective conductivity hundreds of times that of copper. | evaporation at the hot end ; vapour moves to the cold end ; condensation releases latent heat ; wick returns liquid, very high effective conductivity
`;
