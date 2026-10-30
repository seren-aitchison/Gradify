// Unit 28: Semiconductor Physics and Electronics. Format: kit/course/notes.js
export default `
## Energy bands in solids
S: When atoms join into a solid, their discrete energy levels broaden into bands separated by gaps. In semiconductors the highest filled band (valence band) and the lowest empty band (conduction band) are separated by a gap of about 0.1–3 eV.
H: From levels to bands
- N atoms each contribute a level; overlap splits them into N closely spaced levels: a band.
- Wider bands from more overlap (outer orbitals); deep core levels stay narrow.
- Gaps remain where no states exist.
H: Semiconductor bands
- Valence band: bonding states, filled at T = 0.
- Conduction band: antibonding states, empty at T = 0.
- Band gap E_{g}: Si 1.12 eV, Ge 0.66, GaAs 1.42, GaN 3.4, SiC 3.3, diamond 5.5.
- Gap shrinks slightly with temperature (Varshni relation).
H: Direct and indirect gaps
P: In direct-gap materials (GaAs, GaN, InP), the conduction band minimum and valence band maximum occur at the same k, so electrons and holes recombine by emitting photons efficiently: LEDs and lasers. In indirect-gap materials (Si, Ge), a phonon must also take part, making light emission weak, so silicon is used for logic, not light sources.
X: Cut-off wavelength of a silicon photodetector?
> λ = 1240/1.12 = 1110 nm: silicon can't detect beyond ~1.1 μm
!: The band gap isn't a gap in space; it's a range of energies with no allowed electron states.
Q: Why do semiconductors have band gaps? | Atomic levels broaden into bands, and the periodic lattice leaves energy ranges with no states.
Q: Why is GaAs better than silicon for LEDs? | It has a direct band gap, allowing efficient radiative recombination.
M1: The band gap of silicon is about: | 1.12 eV | 5.5 eV | 0.01 eV | 3.4 eV | Room temperature.
M2: Wide-band-gap semiconductors like GaN suit: | High-power, high-temperature and blue-light devices | Infrared detectors only | Superconductors | Thermistors | Large E_{g}.

## Intrinsic and extrinsic semiconductors
S: An intrinsic semiconductor is pure: its few carriers come from electrons thermally excited across the gap. Extrinsic semiconductors are deliberately doped with impurities, which provide far more carriers and control whether electrons or holes dominate.
H: Intrinsic
E: n = p = n_{i} ∝ T^{3/2}e^{−E_{g}/(2k_{B}T)}
- Silicon at 300 K: n_{i} ≈ 1.0 × 10^{10} cm^{-3} (one free electron per ~5 × 10^{12} atoms).
- Conductivity rises steeply with temperature.
H: Extrinsic
- n-type: donors (P, As in Si) give electrons; electrons are majority carriers.
- p-type: acceptors (B, Ga in Si) take electrons, creating holes; holes are majority carriers.
- Typical doping 10^{14}–10^{20} cm^{-3}.
H: Temperature regimes (doped)
- **Freeze-out** (low T): carriers bound to dopants.
- **Extrinsic** (mid T, including room temperature): all dopants ionised; n ≈ N_{D}.
- **Intrinsic** (high T): thermal generation exceeds doping; devices fail. Silicon devices work up to ~150 °C; SiC and GaN much higher.
X: Silicon doped with 10^{16} cm^{-3} phosphorus at 300 K. Electron and hole densities?
> n ≈ 10^{16} cm^{-3}
> p = n_{i}^{2}/n = 10^{20}/10^{16} = 10^{4} cm^{-3}
!: Doped semiconductors are electrically neutral overall; ionised dopants balance the free carriers.
Q: What is an intrinsic semiconductor? | A pure semiconductor whose carriers come only from thermal excitation across the gap.
Q: Why do silicon devices fail at high temperature? | Intrinsic carriers swamp the dopant-controlled carriers.
M1: Boron in silicon acts as: | An acceptor (p-type) | A donor | An insulator | A metal | Group III.
M2: Intrinsic carrier density rises with temperature: | Exponentially | Linearly | Not at all | Falls | e^{−E_{g}/2k_{B}T}.

## Doping
S: Doping adds tiny amounts of impurity atoms to a semiconductor to control its conductivity and carrier type. It's what turns silicon into diodes, transistors and solar cells.
H: Donors and acceptors
- **Donors** (group V in Si: P, As, Sb): fifth electron loosely bound; ionisation energy ~45 meV: freed at room temperature.
- **Acceptors** (group III: B, Al, Ga): missing bond grabs an electron, leaving a hole.
- Hydrogen-like model: E_{d} ≈ 13.6 eV × (m*/m_{e})/ε_{r}^{2}, giving tens of meV.
H: Methods
- **Ion implantation**: accelerate dopant ions into the wafer; precise dose and depth; anneal to repair damage and activate.
- **Diffusion**: high-temperature gas or solid source.
- **In-situ doping** during epitaxial growth.
- Neutron transmutation doping: neutrons convert Si-30 to P-31 uniformly.
H: Compensation and degeneracy
P: Adding both donors and acceptors compensates: net doping is the difference. At very high doping (> ~10^{19} cm^{-3}), the Fermi level enters a band and the semiconductor behaves like a metal (degenerate), used for ohmic contacts and tunnel diodes.
X: Estimate the donor ionisation energy in silicon (m* ≈ 0.26m_{e}, ε_{r} = 11.7).
> E_{d} ≈ 13.6 × 0.26/11.7^{2} = 0.026 eV (measured P: 0.045 eV)
!: A dopant concentration of 1 part per million can raise silicon's conductivity by a factor of ~10^{5}.
Q: Why are donor electrons easily freed? | The semiconductor's high permittivity and small effective mass make their binding very weak (tens of meV).
Q: What is ion implantation? | Accelerating dopant ions into a wafer to place them at controlled doses and depths.
M1: Phosphorus in silicon has how many valence electrons? | 5 | 3 | 4 | 6 | Group V.
M2: A heavily doped, degenerate semiconductor behaves like: | A metal | An insulator | A superconductor | A dielectric | Fermi level in band.

## Electrons and holes
S: In semiconductors current is carried by electrons in the conduction band and by holes in the valence band. A hole is the absence of an electron, behaving like a positive particle with its own effective mass and mobility.
H: Holes
- When an electron leaves a nearly full band, the remaining electrons' collective motion acts like a single positive carrier.
- Charge +e, positive effective mass near the band top.
- Hall effect shows positive carriers in p-type material: direct evidence.
H: Generation and recombination
- **Generation**: thermal, optical (photons with E > E_{g}), impact ionisation.
- **Recombination**: radiative (photon; LEDs), Shockley–Read–Hall (via defect levels; dominant in Si), Auger (high densities).
- Minority carrier lifetime τ: ns (GaAs) to ms (very pure Si).
H: Mass action law
E: np = n_{i}^{2} :: in equilibrium, whatever the doping
P: More electrons mean proportionally fewer holes. Out of equilibrium (light, current injection), np exceeds n_{i}^{2}, and recombination tries to restore it. Quasi-Fermi levels describe the separate electron and hole populations.
X: Silicon p-type with N_{A} = 10^{17} cm^{-3}. Electron density?
> n = (10^{10})^{2}/10^{17} = 10^{3} cm^{-3}
!: A hole isn't a positron or a real particle; it's a collective description of many electrons' behaviour in a nearly full band.
Q: What is a hole? | The absence of an electron in the valence band, behaving as a positive charge carrier.
Q: State the mass action law. | np = n_{i}^{2} in thermal equilibrium.
M1: In n-type silicon, holes are: | Minority carriers | Majority carriers | Absent | Equal to electrons | Few holes.
M2: The dominant recombination in silicon is usually via: | Defect levels (SRH) | Photon emission | Auger always | Phonons alone | Indirect gap.

## Carrier concentration
S: The number of free electrons and holes in a semiconductor depends on temperature, band gap and doping. Calculating it from the density of states and Fermi–Dirac statistics is the starting point for every device model.
H: Formulas (non-degenerate)
E: n = N_{c}e^{−(E_{c} − E_{F})/k_{B}T}; p = N_{v}e^{−(E_{F} − E_{v})/k_{B}T}
E: N_{c} = 2(2πm_{e}*k_{B}T/h^{2})^{3/2} :: effective density of states (Si: 2.8 × 10^{19} cm^{-3})
E: n_{i} = √(N_{c}N_{v})e^{−E_{g}/(2k_{B}T)}
H: Charge neutrality
E: n + N_{A}^{−} = p + N_{D}^{+}
- With full ionisation and N_{D} ≫ n_{i}: n ≈ N_{D}, p = n_{i}^{2}/N_{D}.
H: Temperature dependence
P: Plotting ln n against 1/T for a doped sample shows three regions: freeze-out (slope gives dopant ionisation energy), extrinsic plateau, and intrinsic (slope gives E_{g}/2). Hall measurements across temperature extract these parameters.
X: Ratio of n_{i} in silicon at 400 K vs 300 K (E_{g} ≈ 1.1 eV, ignoring T^{3/2})?
> E_{g}/(2k_{B}) = 1.1/(2 × 8.62 × 10^{-5}) ≈ 6400 K; (1/300 − 1/400) = 8.3 × 10^{-4} K^{-1}
> Ratio = e^{6400 × 8.3 × 10^{-4}} = e^{5.3} ≈ 200
!: Formulas using Boltzmann statistics fail when the Fermi level gets within ~3k_{B}T of a band edge (degenerate doping).
Q: What is the effective density of states? | The equivalent number of states at a band edge for carrier statistics, ∝ T^{3/2}.
Q: What does charge neutrality require? | Free carriers and ionised dopants balance: n + N_{A}^{−} = p + N_{D}^{+}.
M1: In the extrinsic region, n ≈: | N_{D} | n_{i} | N_{c} | 0 | Full ionisation.
M2: The slope of ln n_{i} vs 1/T gives: | −E_{g}/(2k_{B}) | E_{g} | Mobility | Doping | Arrhenius.

## Fermi level
S: The Fermi level is the energy at which the probability of finding an electron is one half; it's the electrochemical potential of electrons. Its position in the gap shows whether a material is n-type or p-type, and in equilibrium it's flat across any device.
H: Position
- Intrinsic: near mid-gap.
- n-type: moves up towards the conduction band: E_{c} − E_{F} = k_{B}T ln(N_{c}/N_{D}).
- p-type: moves down towards the valence band.
- Degenerate doping: inside a band.
H: Equilibrium rule
P: When materials are joined (p–n junctions, metal contacts, heterojunctions), electrons flow until their Fermi levels line up. The bands bend to accommodate this, creating built-in fields and potential barriers. Applying a voltage splits the Fermi level into quasi-Fermi levels for electrons and holes.
H: Work function and contacts
- Work function φ = vacuum level − E_{F}.
- Metal–semiconductor contacts: Schottky barrier (rectifying) or ohmic, depending on work functions and doping.
X: Silicon doped N_{D} = 10^{16} cm^{-3} at 300 K. Fermi level below E_{c}?
> E_{c} − E_{F} = 0.0259 ln(2.8 × 10^{19}/10^{16}) = 0.0259 × 7.94 = 0.21 eV
!: In equilibrium the Fermi level is constant through a device; band edges bend instead.
Q: Where is the Fermi level in an n-type semiconductor? | Closer to the conduction band.
Q: What happens to Fermi levels when two materials contact? | They align, causing band bending and built-in fields.
M1: The Fermi level in equilibrium across a p–n junction is: | Flat | Stepped | Sloped | Absent | Equilibrium.
M2: A Schottky contact is: | Rectifying | Always ohmic | Superconducting | Insulating | Metal–semiconductor barrier.

## Drift and diffusion
S: Charge carriers move in two ways: drift, pushed by an electric field, and diffusion, spreading from high to low concentration. Together they describe current in every semiconductor device.
H: Current equations
E: J_{n} = qnμ_{n}E + qD_{n}dn/dx
E: J_{p} = qpμ_{p}E − qD_{p}dp/dx
E: D/μ = k_{B}T/q :: Einstein relation (~25.9 mV at 300 K)
H: Diffusion length
E: L = √(Dτ) :: minority carrier diffusion length
- Silicon (good quality): tens to hundreds of μm; sets solar cell and bipolar transistor design.
H: Continuity equations
E: ∂n/∂t = (1/q)∂J_{n}/∂x + G − R
P: Combining continuity, current and Poisson's equations (the drift–diffusion model) gives the basis of device simulators. In p–n junctions at equilibrium, drift and diffusion currents exactly cancel.
X: Electron diffusion coefficient in silicon (μ_{n} = 1400 cm^{2} V^{-1} s^{-1}) at 300 K?
> D = μk_{B}T/q = 1400 × 0.0259 = 36 cm^{2} s^{-1}
!: Diffusion current flows even with no electric field; it depends on concentration gradients, not on charge sign directly (signs differ for electrons and holes).
Q: State the Einstein relation. | D/μ = k_{B}T/q.
Q: What is the minority carrier diffusion length? | The average distance minority carriers diffuse before recombining, L = √(Dτ).
M1: Drift current is driven by: | Electric field | Concentration gradient | Temperature only | Light only | qnμE.
M2: In a p–n junction at equilibrium: | Drift and diffusion currents cancel | Only drift flows | Only diffusion flows | Current flows | Zero net current.

## Mobility and conductivity
S: Mobility measures how quickly carriers move in an electric field; with carrier density, it sets conductivity. It depends on effective mass and scattering, and high mobility means faster, more efficient devices.
H: Definitions
E: v_{d} = μE; μ = qτ/m*
E: σ = q(nμ_{n} + pμ_{p})
H: Values at 300 K (cm^{2} V^{-1} s^{-1})
- Si: electrons 1400, holes 450. Ge: 3900, 1900. GaAs: 8500, 400. InSb: 77 000.
- Graphene (encapsulated): > 100 000. 2DEGs at low T: > 10^{7}.
H: Scattering mechanisms
- Lattice (phonon) scattering: μ ∝ T^{−3/2}.
- Ionised impurity scattering: μ ∝ T^{3/2}/N_{I}; dominates at low T and high doping.
- Matthiessen: 1/μ = Σ1/μ_{i}.
- Velocity saturation at high fields (~10^{7} cm s^{-1} in Si).
H: Engineering mobility
P: Strained silicon (stretched by SiGe layers) raises mobility, used in modern processors. Modulation doping separates carriers from dopants. High-mobility III–V channels and 2D materials are explored for future transistors.
X: Resistivity of silicon doped with 10^{16} cm^{-3} phosphorus?
> σ = 1.6 × 10^{-19} × 10^{16} × 1400 = 2.24 S cm^{-1}
> ρ ≈ 0.45 Ω cm
!: Mobility falls with heavy doping because ionised dopants scatter carriers; more dopants don't increase conductivity proportionally.
Q: How is mobility related to scattering time? | μ = qτ/m*.
Q: Why does mobility fall at high temperature? | More phonon scattering.
M1: In silicon, electron mobility is roughly how many times hole mobility? | 3 | 1 | 10 | 0.3 | 1400 vs 450.
M2: Velocity saturation means: | Drift speed stops rising at high fields | Mobility is infinite | Carriers stop | Conductivity is zero | Hot carriers.

## p-n junctions
S: A p–n junction forms where p-type and n-type semiconductor meet. Carriers diffuse across, leaving a depletion region with a built-in electric field. This structure is the heart of diodes, solar cells, LEDs and transistors.
H: At equilibrium
- Electrons diffuse into p-side, holes into n-side, recombining.
- Uncompensated ionised dopants form a depletion region with a built-in field.
E: V_{bi} = (k_{B}T/q) ln(N_{A}N_{D}/n_{i}^{2}) :: built-in voltage (~0.7–0.9 V in Si)
E: W = √(2εV_{bi}(N_{A} + N_{D})/(qN_{A}N_{D})) :: depletion width
H: Under bias
- **Forward bias**: lowers the barrier; diffusion current grows exponentially.
- **Reverse bias**: raises the barrier; tiny saturation current from minority carriers; depletion widens.
- **Breakdown**: Zener (tunnelling, heavy doping) or avalanche (impact ionisation).
H: Capacitance
P: The depletion region acts as a voltage-dependent capacitor (C ∝ 1/√V in reverse bias): varactor diodes tune radio circuits. Measuring C–V profiles the doping concentration.
X: Built-in voltage for N_{A} = N_{D} = 10^{16} cm^{-3} in silicon?
> V_{bi} = 0.0259 ln(10^{32}/10^{20}) = 0.0259 × 27.6 = 0.72 V
!: The built-in voltage can't be measured with a voltmeter across an unbiased diode; contact potentials cancel it.
Q: What is the depletion region? | A zone near the junction emptied of free carriers, containing ionised dopants and a built-in field.
Q: What happens to the depletion width under reverse bias? | It increases.
M1: Under forward bias, current rises: | Exponentially with voltage | Linearly | Not at all | Quadratically | Lower barrier.
M2: Varactor diodes use: | Voltage-dependent depletion capacitance | Light emission | Tunnelling | Magnetism | C ∝ V^{−1/2}.

## Diodes
S: A diode lets current flow easily in one direction and blocks it in the other. Semiconductor diodes rectify AC, protect circuits, regulate voltage, emit and detect light, and switch signals.
H: The diode equation
E: I = I_{s}(e^{qV/(nk_{B}T)} − 1) :: Shockley
- n: ideality factor (1–2).
- Forward drop: ~0.6–0.7 V (Si), ~0.2–0.4 V (Schottky), 1.8–3.5 V (LEDs).
- Reverse saturation current I_{s}: ~pA to nA (silicon); doubles every ~10 K.
H: Types
- Rectifier diodes: power supplies.
- **Zener**: controlled reverse breakdown for voltage references.
- **Schottky**: metal–semiconductor; low forward drop, fast switching.
- **LEDs, photodiodes, laser diodes**.
- **Varactors**: variable capacitance.
- **PIN diodes**: RF switches and photodetectors.
- **Avalanche photodiodes**: internal gain.
H: Switching
P: Bipolar diodes store minority charge when forward-biased; switching off takes time to remove it (reverse recovery). Schottky diodes, using majority carriers only, switch much faster and dominate in switch-mode power supplies.
X: A diode's current at 0.6 V is 1 mA. Current at 0.66 V (n = 1, 300 K)?
> Ratio = e^{0.06/0.0259} = e^{2.32} ≈ 10
> 10 mA: about 60 mV per decade
!: Diode forward voltage falls ~2 mV per °C; used as a temperature sensor, but it can cause thermal runaway in parallel diodes.
Q: State the Shockley diode equation. | I = I_{s}(e^{qV/nk_{B}T} − 1).
Q: Why do Schottky diodes switch faster? | They conduct with majority carriers only, storing no minority charge.
M1: A Zener diode is used for: | Voltage regulation | Light emission | Amplification | Rectifying high frequencies only | Controlled breakdown.
M2: Forward current increases tenfold for each extra: | ~60 mV | 0.6 V | 6 V | 1 mV | At 300 K, n = 1.

## Transistors
S: A transistor uses a small signal to control a larger current, acting as an amplifier or a switch. Invented in 1947, transistors are the basic building block of all modern electronics: there are now more than 10^{22} made in total.
H: Families
- **Bipolar junction transistors (BJTs)**: current-controlled; two junctions.
- **Field-effect transistors (FETs)**: voltage-controlled; a gate field modulates a channel (MOSFETs, JFETs, HEMTs).
H: Uses
- **Amplifiers**: small input changes produce large output changes (audio, radio, sensors).
- **Switches**: on/off states for digital logic and power conversion.
- **Oscillators, mixers, memories, regulators**.
H: History and scaling
P: Bardeen, Brattain and Shockley built the point-contact transistor at Bell Labs (1947; Nobel 1956). Integrated circuits followed (Kilby, Noyce, 1958–59). Moore's law observed transistor counts doubling every ~2 years: from 2300 transistors (Intel 4004, 1971) to over 100 billion today. Scaling is slowing as features approach atomic dimensions.
X: A transistor switch: base current 1 mA with current gain 100 switches what collector current?
> I_{C} = βI_{B} = 100 mA
!: Transistors don't create energy; they control power from a supply using a small signal.
Q: What two main roles do transistors play? | Amplifiers and switches.
Q: Who invented the transistor? | Bardeen, Brattain and Shockley at Bell Labs (1947).
M1: The most common transistor type in modern chips is the: | MOSFET | BJT | Vacuum tube | JFET | CMOS logic.
M2: Moore's law describes: | Transistor counts doubling about every two years | Speed of light | Ohm's law | Battery capacity | Integration density.

## Bipolar junction transistors
S: A bipolar junction transistor (BJT) has three regions, emitter, base and collector, forming two p–n junctions. A small base current controls a much larger collector current, making BJTs excellent amplifiers.
H: Operation (npn)
- Forward-biased base–emitter junction injects electrons into a thin p-type base.
- Most electrons diffuse across the base (thinner than the diffusion length) and are swept into the collector by the reverse-biased base–collector junction.
- A few recombine in the base, forming the base current.
E: I_{C} = βI_{B}; β ~ 50–500
E: I_{C} = I_{S}e^{qV_{BE}/(k_{B}T)} :: exponential control
E: g_{m} = I_{C}/(k_{B}T/q) :: transconductance
H: Configurations
- Common emitter: voltage and current gain.
- Common collector (emitter follower): buffer.
- Common base: high frequencies.
H: Modes
- Active (amplifier), saturation (switch on), cut-off (switch off), reverse active.
H: Uses
P: BJTs offer high transconductance and good matching: analogue circuits, RF amplifiers (SiGe heterojunction bipolar transistors reach hundreds of GHz), power stages. MOSFETs replaced them in digital logic because they draw no static gate current.
X: A BJT with β = 150 and I_{C} = 3 mA. Base current and transconductance?
> I_{B} = 20 μA
> g_{m} = 3 mA/25.9 mV = 116 mS
!: β varies widely between transistors and with temperature; good circuit design makes gain depend on resistors, not on β.
Q: Why must a BJT's base be thin? | So injected carriers cross it before recombining.
Q: What is current gain β? | The ratio of collector current to base current.
M1: An emitter follower has voltage gain about: | 1 | β | 100 | 0 | Buffer.
M2: SiGe HBTs are used for: | High-frequency RF circuits | Solar cells | Memory | Power rectifiers | Fast bipolar.

## Field-effect transistors
S: A field-effect transistor controls current through a channel using the electric field from a gate voltage. Because the gate draws almost no current, FETs are efficient switches and amplifiers with very high input impedance.
H: Types
- **JFET**: reverse-biased p–n junction gate narrows the channel.
- **MOSFET**: gate insulated by oxide; most common.
- **MESFET/HEMT**: Schottky gate on compound semiconductors; RF and microwave.
- **FinFETs, gate-all-around**: 3D gates for better control in modern chips.
- **TFTs**: thin films on glass driving every display pixel.
H: Characteristics
- Enhancement mode (normally off) vs depletion mode (normally on).
- Linear (ohmic) region and saturation region.
- Transconductance g_{m} = ∂I_{D}/∂V_{GS}.
- Very high input impedance (10^{9}–10^{15} Ω).
H: Why FETs dominate
P: CMOS logic pairs n- and p-channel MOSFETs so one is always off in each steady state: almost no static power. This made integrating billions of transistors practical. Power MOSFETs and GaN HEMTs switch large currents efficiently in chargers, inverters and electric vehicles.
X: Why do FET amplifiers suit high-impedance sensors (like pH electrodes)?
> The gate draws almost no current
> It doesn't load the sensor, preserving its voltage
!: "Field effect" doesn't mean magnetic fields; it's the gate's electric field that controls the channel.
Q: Why is a MOSFET's gate current nearly zero? | The gate is insulated from the channel by an oxide layer.
Q: What is CMOS? | Logic using complementary n- and p-channel MOSFET pairs, drawing little static power.
M1: Display pixels are driven by: | Thin-film transistors | BJTs | Vacuum tubes | Relays | TFTs on glass.
M2: An enhancement-mode n-MOSFET is: | Off at zero gate voltage | On at zero gate voltage | Always on | A diode | Normally off.

## MOSFETs
S: The metal–oxide–semiconductor FET is the most manufactured device in history. A gate voltage above a threshold creates a thin inversion layer of carriers under the oxide, forming a conducting channel between source and drain.
H: Structure (n-channel)
- p-type substrate; n+ source and drain; thin gate oxide; gate electrode.
- Above threshold V_{T}, electrons gather at the surface: inversion channel.
H: Equations (long-channel)
E: I_{D} = μC_{ox}(W/L)[(V_{GS} − V_{T})V_{DS} − V_{DS}^{2}/2] :: linear region
E: I_{D} = ½μC_{ox}(W/L)(V_{GS} − V_{T})^{2} :: saturation
E: C_{ox} = ε_{ox}/t_{ox}
- Subthreshold: current falls exponentially, at best 60 mV per decade at room temperature.
H: Scaling and its limits
P: Shrinking dimensions improved speed, density and power for decades (Dennard scaling). At nanometre sizes, problems arose: gate leakage (fixed by high-κ dielectrics and metal gates), short-channel effects (fixed by FinFETs and gate-all-around nanosheets), and the 60 mV per decade limit on switching voltage. "Node" names like "3 nm" no longer correspond to a physical gate length.
X: A MOSFET with μC_{ox}W/L = 2 mA V^{-2} and V_{T} = 0.5 V at V_{GS} = 1.5 V. Saturation current?
> I_{D} = ½ × 2 × (1.0)^{2} = 1 mA
!: The 60 mV per decade subthreshold slope is a thermal limit (k_{B}T/q × ln 10); beating it needs new physics (tunnel FETs, negative capacitance).
Q: What creates the channel in a MOSFET? | An inversion layer of carriers induced by the gate voltage.
Q: Why were FinFETs introduced? | To improve gate control over short channels and reduce leakage.
M1: MOSFET saturation current depends on overdrive as: | (V_{GS} − V_{T})^{2} | Linearly | Exponentially | Not at all | Square law.
M2: The minimum subthreshold swing at room temperature is about: | 60 mV per decade | 6 mV | 600 mV | 1 V | k_{B}T ln10/q.

## Semiconductor heterojunctions
S: A heterojunction joins two different semiconductors with different band gaps. The band offsets at the interface confine carriers and steer them, enabling efficient lasers, fast transistors and high-efficiency solar cells.
H: Band offsets
- ΔE_{c} and ΔE_{v}: discontinuities in conduction and valence bands.
- Anderson's rule (electron affinities) estimates them; real interfaces need measurement.
- Lattice matching: GaAs/AlGaAs nearly perfect; strained layers possible if thin enough (critical thickness).
H: Uses
- **Double heterostructure lasers**: confine carriers and light in the active layer.
- **HEMTs**: 2D electron gas at an AlGaN/GaN or AlGaAs/GaAs interface; GaN's polarisation fields create the gas without doping.
- **HBTs**: wide-gap emitter improves injection efficiency and speed.
- **Multi-junction solar cells**: stacked junctions of different gaps absorb more of the spectrum (record > 47%).
- **SiGe** strained channels in CMOS.
X: Why does a wide-gap emitter improve a bipolar transistor?
> The valence band offset blocks holes injected back from the base
> Base can be heavily doped (fast) while keeping high current gain
!: Lattice mismatch creates dislocations that kill device performance; heterostructure design is constrained by crystal compatibility.
Q: What is a band offset? | The discontinuity in conduction or valence band energy at a heterojunction.
Q: How do GaN HEMTs form a 2D electron gas without doping? | Spontaneous and piezoelectric polarisation fields at the AlGaN/GaN interface.
M1: Multi-junction solar cells improve efficiency by: | Absorbing different parts of the spectrum in different layers | Using one gap | Reflecting light | Cooling | Stacked gaps.
M2: GaAs and AlGaAs are a good pair because they are: | Nearly lattice-matched | Identical | Both metals | Insulators | Same lattice constant.

## Photodiodes
S: Photodiodes convert light into current: photons absorbed in or near the depletion region create electron–hole pairs, which the built-in field separates. They're in cameras, optical fibre receivers, smoke detectors and scientific instruments.
H: Operation
E: I_{ph} = ηqP/(hf) :: photocurrent, η = quantum efficiency
E: R = I_{ph}/P = ηqλ/(hc) :: responsivity (A W^{-1})
- Photovoltaic mode (no bias): low noise.
- Photoconductive mode (reverse bias): faster, wider depletion.
H: Types
- PIN photodiodes: intrinsic layer widens absorption region; fast.
- Avalanche photodiodes (APDs): internal gain by impact ionisation; fibre receivers, LIDAR.
- Single-photon avalanche diodes (SPADs): Geiger mode; detect single photons (phone depth sensors).
- CMOS and CCD image sensors: arrays of photodiodes.
H: Materials and wavelengths
- Si: 400–1100 nm. Ge: to ~1.8 μm. InGaAs: 0.9–1.7 μm (telecoms). HgCdTe, InSb: mid-IR.
X: Responsivity of a silicon photodiode at 850 nm with η = 0.8?
> R = 0.8 × 1.6 × 10^{-19} × 850 × 10^{-9}/(6.63 × 10^{-34} × 3 × 10^{8})
> ≈ 0.55 A W^{-1}
!: A photodiode can't detect photons with energy below the band gap; that sets its long-wavelength cut-off.
Q: How does a photodiode generate current? | Absorbed photons create electron–hole pairs separated by the junction field.
Q: What is an avalanche photodiode? | A photodiode with internal gain from impact ionisation under high reverse bias.
M1: Telecom receivers at 1.55 μm use: | InGaAs photodiodes | Silicon | GaN | Diamond | Narrow gap.
M2: Responsivity increases with wavelength (below cut-off) because: | Each photon carries less energy, so more photons per watt | Gaps shrink | Light speeds up | Diodes heat | Photons per watt.

## Solar cells
S: Solar cells are large-area p–n junctions that turn sunlight directly into electricity. Silicon cells dominate a market that has made solar the cheapest electricity in history in many places.
H: Operation
- Photons create electron–hole pairs; the junction field separates them; current flows through an external load.
- Key parameters: short-circuit current I_{sc}, open-circuit voltage V_{oc}, fill factor FF.
E: η = V_{oc}I_{sc}FF/P_{in}
H: Efficiency limits
- **Shockley–Queisser limit** (single junction, 1 sun): ~33% at E_{g} ≈ 1.34 eV.
- Losses: photons below the gap aren't absorbed; excess energy of high-energy photons is lost as heat (thermalisation).
- Records: silicon ~27%; GaAs ~29%; perovskite–silicon tandem ~34%; multi-junction under concentration ~47%.
H: Technologies
- Monocrystalline silicon PERC and TOPCon, heterojunction cells.
- Thin films: CdTe, CIGS.
- Perovskites (rapidly improving; stability challenges).
- Bifacial modules collect reflected light.
H: Economics
P: Module prices fell more than 99% since 1976 (Swanson's law: ~20% cheaper per doubling of cumulative production). Global capacity passed 1 TW in 2022. Energy payback times are now ~1 year.
X: A 1.6 m^{2} panel under 1000 W m^{-2} at 22% efficiency. Output?
> P = 0.22 × 1000 × 1.6 = 352 W
!: Higher temperatures reduce solar cell voltage and efficiency (~0.3–0.4% per °C for silicon).
Q: What is the Shockley–Queisser limit? | The maximum efficiency (~33%) of a single-junction solar cell under unconcentrated sunlight.
Q: What two losses limit single-junction efficiency? | Non-absorption of sub-gap photons and thermalisation of excess photon energy.
M1: The optimal single-junction band gap is about: | 1.34 eV | 3.4 eV | 0.5 eV | 5.5 eV | Shockley–Queisser.
M2: Tandem cells exceed single-junction limits by: | Using multiple band gaps | Larger area | Cooling | Concentrating heat | Spectrum splitting.

## LEDs
S: Light-emitting diodes produce light when electrons and holes recombine across a direct band gap in a forward-biased junction. The gap sets the colour; efficient blue LEDs made white LED lighting possible.
H: Operation
E: hf ≈ E_{g}
- Forward bias injects carriers into an active region (often quantum wells).
- Radiative recombination emits photons.
- Internal quantum efficiency × light extraction efficiency = external quantum efficiency.
H: Materials and colours
- Infrared: GaAs (870 nm), AlGaAs.
- Red/amber: AlGaInP.
- Green/blue/UV: InGaN, AlGaN.
- White: blue InGaN LED + yellow phosphor (Ce:YAG), or RGB combinations.
H: Efficiency and impact
P: White LEDs reach > 200 lumens per watt (incandescent ~15), cutting lighting energy dramatically; lighting was ~15% of global electricity use. Challenges: efficiency droop at high current (Auger recombination), the "green gap". Micro-LEDs are emerging for displays; UV-C LEDs for disinfection.
X: Colour of an LED with E_{g} = 2.0 eV?
> λ = 1240/2.0 = 620 nm: red-orange
!: LEDs don't emit perfectly monochromatic light; their spectra are tens of nanometres wide, unlike lasers.
Q: What determines an LED's colour? | The band gap of its active semiconductor.
Q: How do white LEDs work? | A blue LED excites a yellow phosphor; the mix looks white.
M1: Blue LEDs are made from: | InGaN | Silicon | Germanium | Copper | Nobel 2014.
M2: Efficiency droop at high current is mainly attributed to: | Auger recombination | Phonons | Low temperature | Light absorption by air | Non-radiative.

## Semiconductor lasers
S: Semiconductor (diode) lasers create coherent light from a forward-biased p–n junction with an optical cavity. They're the most common lasers, in fibre optics, data centres, barcode scanners, laser pointers and LIDAR.
H: Requirements
- Population inversion: high injection current puts many electrons in the conduction band and holes in the valence band (Bernard–Duraffourg condition).
- Optical feedback: cleaved facets act as mirrors (R ≈ 0.3), or distributed Bragg gratings.
- Threshold current: below it, LED-like spontaneous emission; above, lasing.
H: Designs
- Double heterostructure and quantum well lasers (low thresholds).
- **DFB lasers**: grating gives single wavelength (telecoms).
- **VCSELs**: emit from the surface; cheap arrays for data links and face recognition.
- Quantum cascade lasers (mid-IR), interband cascade lasers.
- High-power diode bars pump fibre and solid-state lasers.
H: Modulation
P: Diode lasers can be switched on and off billions of times per second by modulating the current, carrying data through optical fibres at 10–100 Gb s^{-1} per wavelength. Wavelength-division multiplexing puts dozens of such lasers on one fibre.
X: Mode spacing of a 300 μm GaAs laser cavity (n_{g} ≈ 4)?
> Δf = c/(2n_{g}L) = 3 × 10^{8}/(2 × 4 × 3 × 10^{-4}) = 125 GHz
!: Below threshold a laser diode is just an LED; coherence and narrow linewidth appear only above threshold.
Q: What provides feedback in a simple diode laser? | Reflections from the cleaved crystal facets.
Q: What is a VCSEL? | A vertical-cavity surface-emitting laser, emitting from the chip surface.
M1: DFB lasers achieve single-mode operation using: | A built-in grating | Larger cavities | Lower current | Multiple materials | Distributed feedback.
M2: Above threshold, a diode laser's output rises: | Steeply and linearly with current | Not at all | Logarithmically | Only with temperature | Slope efficiency.

## Integrated circuits
S: An integrated circuit puts billions of transistors, resistors and interconnects on one chip of silicon. Invented in 1958–59, ICs made computers, phones and modern electronics possible.
H: Types
- **Digital**: logic and memory (CPUs, GPUs, DRAM, flash).
- **Analogue**: amplifiers, data converters, power management.
- **Mixed-signal and RF**: phones' radio chips.
- **ASICs, FPGAs, SoCs** (systems on chip).
H: Structure
- Front end: transistors in the silicon.
- Back end: up to ~15 metal layers (copper) with low-κ insulators connecting them.
- Packaging: wire bonds, flip chips, 3D stacking, chiplets.
H: Physics limits
P: As features shrink, interconnect delay and resistance, heat density (~100 W cm^{-2}), leakage, variability between transistors and quantum tunnelling become limiting. Industry responds with new transistor geometries, 3D integration, specialised accelerators (AI chips) and new materials. Landauer's limit, k_{B}T ln 2 per erased bit, is still ~10^{4} times below today's switching energies.
X: A 100 W processor on a 1.5 cm^{2} die. Heat flux?
> 100/1.5 ≈ 67 W cm^{-2}: higher than a cooking hotplate
!: Chip speed is now limited more by power and heat than by how fast transistors can switch.
Q: What did integrated circuits enable? | Mass production of complex circuits with billions of transistors on one chip.
Q: What limits modern chip performance? | Power density and heat, interconnect delays, leakage and variability.
M1: Who co-invented the integrated circuit? | Kilby and Noyce | Shockley | Einstein | Turing | 1958–59.
M2: Chiplets are: | Smaller dies combined in one package | Tiny batteries | Optical fibres | Transistor types | Modular integration.

## Quantum wells, wires and dots
S: Shrinking semiconductors to nanometre sizes in one, two or three dimensions confines electrons, quantising their energies. Quantum wells, wires and dots let engineers design electronic and optical properties by size.
H: Confinement
E: E_{n} = n^{2}π^{2}ħ^{2}/(2m*L^{2}) :: infinite-well estimate
- Wells (2D): subbands, step-like density of states.
- Wires (1D): 1D subbands; quantised conductance.
- Dots (0D): discrete atom-like levels: "artificial atoms".
H: Quantum dots
- Colloidal nanocrystals (CdSe, InP, perovskites): size-tuned emission; QLED displays, bio-labels (Nobel Chemistry 2023: Bawendi, Brus, Ekimov).
- Self-assembled dots (InAs in GaAs): single-photon sources for quantum communication.
- Gate-defined dots in silicon or GaAs: spin qubits.
H: Devices
P: Quantum-well lasers have lower thresholds and tunable wavelengths. Quantum-well infrared photodetectors, quantum cascade lasers (using intersubband transitions) and resonant tunnelling diodes all rely on engineered confinement. Single-electron transistors exploit Coulomb blockade in dots.
X: Why does shrinking a CdSe dot from 6 nm to 2 nm shift emission from red to blue?
> Confinement energy ∝ 1/L^{2}: about nine times larger for the smaller dot
> The effective gap increases, shifting emission to higher energy
!: Quantum dots aren't just small crystals; their discrete levels make them behave like tunable atoms.
Q: Why are quantum dots called artificial atoms? | Their electrons occupy discrete energy levels set by size.
Q: What are quantum dot spin qubits? | Electron spins confined in gate-defined dots, controlled electrically.
M1: Confinement energy scales with size L as: | 1/L^{2} | L | 1/L | L^{2} | Particle in a box.
M2: QLED displays use: | Colloidal quantum dots | Silicon wafers | Liquid crystals only | Vacuum tubes | Colour conversion.

## Tunnel diodes
S: A tunnel diode is a very heavily doped p–n junction so thin that electrons tunnel directly through it. Its current–voltage curve has a region of negative differential resistance, used for very fast oscillators and switches.
H: Operation
- Degenerate doping on both sides (> 10^{19} cm^{-3}); depletion width ~10 nm.
- Small forward bias aligns filled states on one side with empty states on the other: tunnelling current rises.
- Further bias misaligns them: current falls (negative resistance).
- Higher bias: normal diode diffusion current takes over.
H: History and uses
P: Leo Esaki discovered tunnelling in heavily doped germanium junctions (1957; Nobel 1973), among the first direct demonstrations of quantum tunnelling in solids. Tunnel diodes made microwave oscillators and fast switches; resonant tunnelling diodes (with quantum wells) now oscillate above 1 THz.
H: Tunnelling elsewhere
- Zener breakdown.
- Tunnel FETs (aiming below the 60 mV per decade limit).
- Flash memory, magnetic tunnel junctions, STM.
X: Why does negative differential resistance make an oscillator?
> In that region, increasing voltage decreases current: the device supplies AC power instead of absorbing it
> Placed in a resonant circuit, it cancels losses and sustains oscillation
!: Negative differential resistance doesn't mean negative total resistance; V/I stays positive.
Q: Why do tunnel diodes show negative differential resistance? | As bias increases, filled and empty states misalign, reducing tunnelling current.
Q: Who discovered the tunnel diode? | Leo Esaki (1957).
M1: Tunnel diodes are: | Very heavily doped | Lightly doped | Undoped | Superconducting | Degenerate junctions.
M2: Resonant tunnelling diodes can oscillate at: | Above 1 THz | Only 50 Hz | Only audio frequencies | DC only | Fast quantum transport.

## Spintronics
S: Spintronics uses the electron's spin as well as its charge to store and process information. It already powers hard-disk read heads and magnetic memory, and may enable lower-power computing.
H: Key effects
- **Giant magnetoresistance (GMR)**: resistance depends on relative magnetisation of layers (Fert, Grünberg, Nobel 2007).
- **Tunnelling magnetoresistance (TMR)**: magnetic tunnel junctions with MgO barriers: resistance changes > 200%.
- **Spin-transfer torque**: spin-polarised currents switch magnets.
- **Spin–orbit torque, spin Hall effect**: charge currents produce spin currents.
H: Devices
- Hard-disk read heads (GMR then TMR) enabled terabyte drives.
- **MRAM**: non-volatile memory with fast writes; used in embedded and industrial chips.
- Magnetic sensors (automotive, biosensors).
- Racetrack memory, skyrmion devices, spin-wave (magnonic) logic: research.
H: Spin qubits
P: Electron and nuclear spins in silicon, diamond (NV centres) and quantum dots are qubit candidates: long coherence times and compatibility with chip fabrication. NV centres in diamond also act as nanoscale magnetometers working at room temperature.
X: A magnetic tunnel junction has 1 kΩ (parallel) and 3 kΩ (antiparallel). TMR ratio?
> (3 − 1)/1 = 200%
!: Spin currents can flow without charge currents; spintronics isn't just magnetised electronics.
Q: What is giant magnetoresistance? | A large resistance change depending on the relative alignment of magnetic layers.
Q: What is MRAM? | Non-volatile memory storing bits in magnetic tunnel junctions.
M1: Spin-transfer torque uses: | Spin-polarised currents to switch magnets | Magnetic fields only | Light | Heat | Angular momentum transfer.
M2: NV centres are defects in: | Diamond | Silicon | GaAs | Copper | Nitrogen–vacancy.

## Semiconductor fabrication principles
S: Chips are made by repeatedly depositing, patterning and modifying thin layers on silicon wafers in ultra-clean factories. Hundreds of steps build transistors only a few nanometres across with astonishing precision and yield.
H: Main steps
- **Crystal growth**: Czochralski ingots of 99.9999999% pure silicon; 300 mm wafers.
- **Oxidation and deposition**: thermal oxide, CVD, ALD (atomic layer deposition: one atomic layer per cycle), PVD (sputtering), epitaxy.
- **Lithography**: photoresist exposed through masks; deep UV (193 nm, immersion) and EUV (13.5 nm) define features.
- **Etching**: wet chemical or plasma (reactive ion etching) for vertical walls.
- **Doping**: ion implantation and annealing.
- **Chemical–mechanical polishing**: flattens layers.
- **Metallisation**: copper interconnects (damascene process).
H: Resolution
E: CD = k_{1}λ/NA :: critical dimension (Rayleigh)
- Multiple patterning and EUV extend resolution; EUV machines (ASML) use tin plasma light sources and mirrors.
H: Cleanliness and yield
P: Fabs are cleanrooms with fewer than 10 particles per cubic metre larger than 0.1 μm. A modern leading-edge fab costs over $20 billion. Yield (fraction of working chips) depends on defect density and die area.
X: Resolution limit for 193 nm immersion lithography (NA = 1.35, k_{1} = 0.28)?
> CD = 0.28 × 193/1.35 ≈ 40 nm per single exposure
!: Today's "3 nm" process names are marketing labels; actual gate lengths and pitches are larger.
Q: What is EUV lithography? | Patterning with 13.5 nm extreme ultraviolet light to print the smallest chip features.
Q: What is atomic layer deposition? | Growing films one atomic layer per cycle using self-limiting surface reactions.
M1: Silicon wafers are grown by the: | Czochralski method | Bessemer process | Haber process | Float glass method | Crystal pulling.
M2: Plasma etching gives: | Vertical, anisotropic features | Rounded shapes only | No selectivity | Crystal growth | Reactive ions.

## Nanoscale electronic devices
S: As electronic devices shrink to nanometre sizes, quantum effects, single electrons and individual atoms matter. Nanoscale devices both extend conventional electronics and enable new ones based on quantum physics.
H: Scaling challenges
- Gate oxides of a few atoms: tunnelling leakage.
- Random dopant fluctuations: transistors vary.
- Short channels: source and drain interfere.
- Heat removal at high densities.
H: Beyond conventional CMOS
- Gate-all-around nanosheets and complementary FETs (stacked n and p).
- 2D-material channels (MoS_{2}) only atoms thick.
- Carbon nanotube transistors (a 16-bit nanotube computer built in 2019).
- Single-electron transistors (Coulomb blockade).
- Molecular electronics (single-molecule junctions).
- Memristors and phase-change memory for neuromorphic computing.
H: Quantum devices
P: Many nanoscale devices are quantum by design: superconducting qubits, semiconductor spin qubits, single-photon sources and detectors, and topological devices. Precision in fabrication now matters at the level of individual atoms: phosphorus atoms placed one by one in silicon with STM lithography form atomic-scale transistors and qubits.
X: Charging energy of a 10 nm quantum dot (C ≈ 1 aF)?
> E_{C} = e^{2}/(2C) = (1.6 × 10^{-19})^{2}/(2 × 10^{-18}) = 1.3 × 10^{-20} J ≈ 80 meV
> Above k_{B}T at room temperature: Coulomb blockade visible
!: Smaller isn't automatically better; at atomic scales, variability and quantum effects can make devices unreliable unless designed in.
Q: What is Coulomb blockade? | Suppression of current because adding one electron to a tiny island costs significant charging energy.
Q: What is a memristor? | A resistor whose resistance depends on the history of current through it, used for memory and neuromorphic computing.
M1: Gate-all-around transistors improve: | Electrostatic control of the channel | Light emission | Magnetism | Battery life only | Gate on all sides.
M2: Single-atom transistors have been made by placing: | Phosphorus atoms in silicon with an STM | Gold in glass | Carbon in copper | Helium in vacuum | Atomic precision.
`;
