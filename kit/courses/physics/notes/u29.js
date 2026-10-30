// Unit 29: Plasma Physics. Format: kit/course/notes.js
export default `
## Plasma as a state of matter
S: A plasma is an ionised gas of free electrons and ions that behaves collectively through long-range electric and magnetic forces. It's the most common state of visible matter in the universe: stars, nebulae, lightning, auroras and fusion reactors.
H: What makes a plasma
- Enough ionisation that collective electromagnetic effects dominate.
- **Quasineutral**: nearly equal positive and negative charge on scales larger than the Debye length.
- Many particles within a Debye sphere (N_{D} ≫ 1).
- Collective oscillations faster than collisions (ω_{p}τ > 1).
H: The range of plasmas
- Interstellar medium: n ~ 10^{6} m^{-3}, T ~ 10^{4} K.
- Solar wind: 10^{7} m^{-3}, 10^{5} K.
- Ionosphere: 10^{11}–10^{12} m^{-3}.
- Fluorescent tube: 10^{16} m^{-3}, electrons ~10^{4} K.
- Tokamak core: 10^{20} m^{-3}, 10^{8} K.
- Solar core: 10^{32} m^{-3}, 1.5 × 10^{7} K.
H: Why it's different
P: Unlike neutral gases, where molecules interact only in collisions, every plasma particle feels the fields of many others at once. Plasmas conduct electricity, respond strongly to magnetic fields, support many wave types, and are prone to instabilities. Langmuir named "plasma" in 1928.
X: Is a candle flame a plasma?
> Weakly ionised (fraction ~10^{-8}); collective effects are weak
> Usually considered a hot gas with a few ions, not a true plasma
!: Ionisation alone doesn't make a plasma; collective behaviour does.
Q: What is quasineutrality? | Near-equality of positive and negative charge densities over scales larger than the Debye length.
Q: Why is plasma called the "fourth state of matter"? | It has distinct collective electromagnetic behaviour unlike solids, liquids or gases.
M1: Most visible matter in the universe is: | Plasma | Solid | Liquid | Neutral gas | Stars.
M2: A plasma requires many particles within: | A Debye sphere | A metre | An atom | A molecule | N_{D} ≫ 1.

## Ionisation and recombination
S: Plasmas form when atoms lose electrons through collisions, radiation or strong fields, and they're maintained by a balance between ionisation and recombination. The degree of ionisation depends on temperature and density.
H: Ionisation mechanisms
- **Electron impact**: fast electrons knock out bound ones (gas discharges).
- **Photoionisation**: UV and X-rays (ionosphere, nebulae, H II regions).
- **Thermal**: high temperatures (stars, arcs).
- **Field ionisation**: strong electric fields (lasers, sharp tips).
H: Recombination
- Radiative: electron captured with photon emission (emission lines in nebulae).
- Three-body: dominant at high density.
- Dielectronic: important in hot plasmas.
H: The Saha equation
E: n_{i}n_{e}/n_{0} = (2πm_{e}k_{B}T/h^{2})^{3/2}(2g_{i}/g_{0})e^{−E_{ion}/(k_{B}T)}
P: Saha's equation (1920) gives the ionisation balance in thermal equilibrium. Even at temperatures well below E_{ion}/k_{B}, significant ionisation occurs because of the huge phase-space factor. It explained stellar spectral classes as a temperature sequence (Payne-Gaposchkin, 1925) and predicts when the early universe became neutral (recombination at ~3000 K).
X: Why did the universe become transparent at ~3000 K although hydrogen's ionisation energy is 13.6 eV (~158 000 K)?
> There were ~10^{9} photons per baryon
> Only when k_{B}T fell to ~0.26 eV were there few enough ionising photons in the Wien tail
!: Ionisation fraction depends on density too: lower density favours ionisation at a given temperature.
Q: What does the Saha equation describe? | The degree of ionisation of a gas in thermal equilibrium.
Q: How do photons ionise the ionosphere? | Solar UV and X-ray photoionisation.
M1: Recombination in nebulae produces: | Emission lines | Absorption lines | Continuous radio only | Nothing | Radiative recombination.
M2: Saha's equation explained: | Stellar spectral classes as a temperature sequence | Fusion | Superconductivity | Gravity | Payne-Gaposchkin.

## Debye shielding
S: In a plasma, free charges rearrange to screen out any electric potential, so the field of a charge falls off exponentially beyond a short distance. Debye shielding is why plasmas are quasineutral on large scales.
H: The screened potential
E: φ(r) = (q/(4πε_{0}r))e^{−r/λ_{D}}
- Electrons crowd around a positive charge, ions are pushed away (or vice versa).
- Beyond a few Debye lengths, the charge is effectively invisible.
H: Derivation outline
P: Poisson's equation with Boltzmann-distributed electrons, n_{e} = n_{0}e^{eφ/k_{B}T}, linearised for small φ, gives ∇^{2}φ = φ/λ_{D}^{2}. Thermal motion limits how tightly electrons can pack, setting λ_{D}.
H: Consequences
- External fields penetrate only a short distance into a plasma.
- **Sheaths** form at walls and probes: thin regions of strong field a few λ_{D} thick, controlling plasma–surface interactions in etching and fusion.
- Similar screening occurs in electrolytes (Debye–Hückel theory) and in metals (Thomas–Fermi screening).
X: A Langmuir probe inserted in a plasma: what forms around it?
> A sheath a few Debye lengths thick
> Its current–voltage curve reveals electron temperature and density
!: Shielding is statistical; individual charges still move through the plasma and interact.
Q: What is Debye shielding? | The screening of a charge's field by the surrounding plasma charges, making it decay exponentially.
Q: What is a plasma sheath? | A thin non-neutral boundary layer, a few Debye lengths thick, between a plasma and a surface.
M1: Beyond several Debye lengths, a charge's field is: | Effectively screened | Stronger | Unchanged | Oscillating | e^{−r/λ_{D}}.
M2: Debye–Hückel theory applies screening to: | Electrolytes | Superconductors | Photons | Neutron stars | Ionic solutions.

## Debye length
S: The Debye length is the distance over which charges in a plasma screen each other. It sets the smallest scale on which a plasma can be non-neutral and is a key criterion for whether an ionised gas behaves as a plasma.
H: Formula
E: λ_{D} = √(ε_{0}k_{B}T_{e}/(n_{e}e^{2})) ≈ 7430√(T_{e}[eV]/n_{e}[m^{-3}]) m
- Larger for hotter, thinner plasmas.
- Plasma parameter N_{D} = (4/3)πn λ_{D}^{3}: number of particles in a Debye sphere.
H: Typical values
- Tokamak (10^{20} m^{-3}, 10 keV): ~0.07 mm.
- Ionosphere (10^{12} m^{-3}, 0.1 eV): ~2 mm.
- Solar wind (5 × 10^{6} m^{-3}, 10 eV): ~10 m.
- Interstellar medium: ~10 m.
- Laboratory glow discharge: ~0.1 mm.
H: Plasma criteria
P: An ionised gas is a plasma if (1) its size L ≫ λ_{D}, (2) N_{D} ≫ 1 (collective rather than individual behaviour), and (3) ω_{p}τ_{collision} > 1. These separate true plasmas from merely ionised gases.
X: Debye length in the ionosphere (n = 10^{12} m^{-3}, T_{e} = 0.1 eV)?
> λ_{D} = 7430√(0.1/10^{12}) = 7430 × 3.2 × 10^{-7} ≈ 2.3 mm
!: The Debye length uses the electron temperature (in most cases); hot electrons and cold ions are common in labs.
Q: How does the Debye length depend on temperature and density? | λ_{D} ∝ √(T/n).
Q: What is the plasma parameter? | The number of particles in a Debye sphere; must be large for collective behaviour.
M1: Doubling density changes λ_{D} by: | ×1/√2 | ×2 | ×½ | No change | ∝ n^{−1/2}.
M2: A plasma must be much larger than: | Its Debye length | Its atoms | 1 m | Its temperature | L ≫ λ_{D}.

## Plasma frequency
S: The plasma frequency is the natural oscillation frequency of electrons displaced in a plasma. It sets which electromagnetic waves can travel through a plasma: lower frequencies are reflected, higher ones pass.
H: Formula
E: ω_{p} = √(n_{e}e^{2}/(ε_{0}m_{e})); f_{p} ≈ 9√n_{e} Hz
- Ion plasma frequency is smaller by √(m_{i}/m_{e}).
H: Waves in a plasma
E: ω^{2} = ω_{p}^{2} + c^{2}k^{2} :: EM waves (unmagnetised)
E: n = √(1 − ω_{p}^{2}/ω^{2}) :: refractive index
- ω < ω_{p}: evanescent; waves reflect.
- ω > ω_{p}: propagate with phase velocity > c, group velocity < c.
H: Examples
- Ionosphere (f_{p} ~ 1–10 MHz): reflects AM and shortwave radio round the world; FM and satellite signals pass through.
- Metals (f_{p} ~ 10^{15} Hz, UV): reflect visible light (shiny); transparent to UV above f_{p} (alkali metals).
- Spacecraft re-entry blackout: plasma sheath blocks radio.
- Pulsar dispersion: lower frequencies arrive later; measures electron column density.
X: Plasma frequency of the ionosphere's F-layer (n = 10^{12} m^{-3})?
> f_{p} = 9 × 10^{6} Hz = 9 MHz
!: Metals' shininess and the ionosphere's radio reflection are the same physics at very different frequencies.
Q: What is the plasma frequency? | The natural oscillation frequency of electrons in a plasma, ω_{p} = √(ne^{2}/ε_{0}m).
Q: Why does the ionosphere reflect shortwave radio but not FM? | Shortwave is below the plasma frequency; FM is above it.
M1: Metals reflect visible light because: | Visible frequencies are below their plasma frequency | They're dense | They're cold | They emit light | ω < ω_{p}.
M2: Pulsar signals at lower radio frequencies arrive: | Later | Earlier | At the same time | Never | Dispersion.

## Charged-particle motion
S: Understanding how individual charged particles move in electric and magnetic fields is the starting point of plasma physics. In magnetic fields they gyrate; combined with other forces they drift in characteristic ways.
H: Gyration
E: ω_{c} = qB/m; r_{L} = mv_{⊥}/(qB) :: cyclotron frequency and Larmor radius
- Electrons gyrate much faster and in smaller circles than ions.
- Motion along B is free: helical paths.
H: Drifts (guiding-centre motion)
E: v_{E} = E × B/B^{2} :: E × B drift: same for all charges
E: v_{∇B} = (mv_{⊥}^{2}/(2qB^{3}))B × ∇B :: gradient drift
- Curvature drift along curved field lines.
- Polarisation drift in time-varying E.
H: Adiabatic invariants
- Magnetic moment μ = mv_{⊥}^{2}/(2B) conserved when fields change slowly.
- **Magnetic mirrors**: particles reflect where B increases, if their pitch angle is large enough.
- Van Allen belts: particles bounce between Earth's polar mirror points and drift around the planet.
X: Larmor radius of a 1 keV proton in 1 T?
> v = √(2 × 1.6 × 10^{-16}/1.67 × 10^{-27}) = 4.4 × 10^{5} m s^{-1}
> r_{L} = 1.67 × 10^{-27} × 4.4 × 10^{5}/(1.6 × 10^{-19} × 1) = 4.6 mm
!: The E × B drift is perpendicular to both fields and independent of charge: electrons and ions drift together, so no current flows from it.
Q: What is the E × B drift? | A drift of all charged particles perpendicular to both E and B at speed E/B.
Q: How does a magnetic mirror trap particles? | Conservation of magnetic moment reflects particles moving into stronger field.
M1: Electron gyrofrequency compared with ion gyrofrequency is: | Much higher | Lower | Equal | Zero | ∝ 1/m.
M2: The Van Allen belts trap particles by: | Magnetic mirroring in Earth's dipole field | Gravity | Electric fields | Solar wind pressure | Bounce motion.

## Plasma oscillations
S: Displace electrons slightly in a plasma and the resulting charge separation pulls them back, so they oscillate at the plasma frequency. With thermal motion, these oscillations travel as Langmuir waves, and they can be damped even without collisions.
H: Cold oscillation
E: ω = ω_{p} :: electrons overshoot and oscillate
- Not a travelling wave if the plasma is cold (no pressure).
H: Langmuir waves (warm plasma)
E: ω^{2} = ω_{p}^{2} + 3k^{2}v_{th}^{2} :: Bohm–Gross dispersion
- Electron thermal pressure lets oscillations propagate.
H: Landau damping
P: Landau (1946) showed that plasma waves can decay without any collisions. Particles moving slightly slower than the wave gain energy from it; slightly faster ones give energy. In a Maxwellian distribution there are more slower particles, so the wave loses energy. It's a subtle, purely kinetic effect, confirmed experimentally (1964), and it underlies wave–particle interactions in space and fusion plasmas.
H: Uses
- Plasma wakefield accelerators ride electrons on huge plasma wave fields (~100 GV m^{-1}, ~1000× conventional cavities).
- Type III solar radio bursts come from Langmuir waves excited by electron beams.
X: Accelerating field of a plasma wave in n = 10^{24} m^{-3}?
> E_{max} ≈ m_{e}cω_{p}/e; ω_{p} = 5.6 × 10^{13} s^{-1}
> E ≈ 9.1 × 10^{-31} × 3 × 10^{8} × 5.6 × 10^{13}/1.6 × 10^{-19} ≈ 10^{11} V m^{-1}
!: Landau damping doesn't dissipate energy as heat directly; it transfers energy from the wave to resonant particles.
Q: What is Landau damping? | Collisionless damping of plasma waves through energy exchange with resonant particles.
Q: Why can plasma wakefield accelerators be so compact? | Plasma waves sustain accelerating fields ~1000 times stronger than conventional RF cavities.
M1: In a cold plasma, electron oscillations occur at: | The plasma frequency | The cyclotron frequency | Zero | The ion frequency | ω_{p}.
M2: Langmuir waves propagate because of: | Electron thermal pressure | Magnetic fields | Ion motion only | Gravity | Bohm–Gross.

## Magnetised plasmas
S: In a magnetic field, plasma behaviour becomes strongly directional: particles move freely along field lines but are tied to them across. Magnetised plasmas fill space, power solar activity and are confined in fusion devices.
H: Key parameters
E: β = nk_{B}T/(B^{2}/2μ_{0}) :: plasma pressure / magnetic pressure
- β ≪ 1: field dominates (solar corona, tokamaks ~ few %).
- β ≫ 1: plasma pushes the field around (solar interior, galaxy clusters).
- Gyroradius and gyrofrequency compared with system size and wave frequencies.
H: Anisotropy
- Conductivity, thermal conduction and viscosity much larger along B than across.
- Pressure can differ parallel and perpendicular to B.
- Field lines act like elastic strings with tension B^{2}/μ_{0}.
H: Frozen-in flux
P: In highly conducting plasmas, magnetic field lines move with the fluid (Alfvén's theorem). Solar plasma drags field lines into twisted structures; the solar wind carries the Sun's field outward as the Parker spiral. When frozen-in conditions break down locally, magnetic reconnection releases stored energy explosively.
X: β for a tokamak with n = 10^{20} m^{-3}, T = 10 keV, B = 5 T?
> p = 2nk_{B}T (electrons + ions) = 2 × 10^{20} × 1.6 × 10^{-15} = 3.2 × 10^{5} Pa
> B^{2}/2μ_{0} = 25/(2.5 × 10^{-6}) ≈ 10^{7} Pa ⇒ β ≈ 3%
!: Magnetised plasma isn't the same as a magnetic material; the field is external or self-generated by currents, not by aligned spins.
Q: What is plasma beta? | The ratio of plasma thermal pressure to magnetic pressure.
Q: What is the frozen-in flux theorem? | In a perfectly conducting plasma, magnetic field lines move with the fluid.
M1: In the solar corona, β is: | Much less than 1 | Much greater than 1 | Exactly 1 | Zero | Field-dominated.
M2: Magnetic reconnection occurs when: | Frozen-in conditions break down locally | β = 0 | Temperature falls | Density is zero | Field lines reconnect.

## Magnetohydrodynamics
S: Magnetohydrodynamics (MHD) treats a plasma as an electrically conducting fluid interacting with magnetic fields. It describes large-scale plasma behaviour in stars, planets, fusion devices and liquid metals.
H: The equations (ideal MHD)
E: ρ Dv/Dt = −∇p + J × B
E: ∂B/∂t = ∇ × (v × B) :: induction (ideal)
E: J = ∇ × B/μ_{0}; ∇·B = 0
- Plus mass conservation and an energy equation.
- Resistive MHD adds η∇^{2}B: magnetic diffusion.
H: Magnetic forces
E: J × B = −∇(B^{2}/2μ_{0}) + (B·∇)B/μ_{0} :: magnetic pressure + tension
H: Magnetic Reynolds number
E: R_{m} = μ_{0}σvL
- R_{m} ≫ 1: field frozen in (astrophysics).
- R_{m} ≪ 1: field diffuses (lab liquid metals).
H: Applications
P: MHD explains the geodynamo (convection in Earth's liquid iron core sustaining its magnetic field), solar flares and coronal mass ejections, accretion discs (the magnetorotational instability drives turbulence and accretion), and stability limits in tokamaks. Engineering uses include electromagnetic pumps for liquid metals and MHD generators.
X: Why does Earth's magnetic field persist for billions of years?
> Ohmic decay time of the core field is only ~20 000 years
> A dynamo (convection plus rotation) continually regenerates it
!: MHD assumes the plasma behaves as one fluid; it fails at small scales or low collisionality, where kinetic or two-fluid models are needed.
Q: What does MHD describe? | Plasma as a conducting fluid coupled to magnetic fields.
Q: What is the geodynamo? | The self-sustaining generation of Earth's magnetic field by convection in its liquid outer core.
M1: Magnetic tension acts to: | Straighten curved field lines | Increase pressure | Heat plasma | Remove fields | (B·∇)B/μ_{0}.
M2: A high magnetic Reynolds number means: | Field is frozen into the flow | Field diffuses quickly | No field | Low conductivity | R_{m} ≫ 1.

## Plasma waves
S: Plasmas support a rich variety of waves: electrostatic and electromagnetic, involving electrons, ions or both, with magnetic fields adding more modes. They heat fusion plasmas, carry energy in space, and diagnose plasma properties.
H: Unmagnetised waves
- **Langmuir (electron plasma) waves**: ω^{2} = ω_{p}^{2} + 3k^{2}v_{th,e}^{2}.
- **Ion acoustic waves**: v ≈ √(k_{B}T_{e}/m_{i}): sound waves driven by electron pressure, carried by ion inertia.
- **EM waves**: ω^{2} = ω_{p}^{2} + c^{2}k^{2}.
H: Magnetised waves
- **Alfvén waves**: along B, v_{A} = B/√(μ_{0}ρ).
- **Magnetosonic waves**: fast and slow modes.
- **Whistlers**: electron cyclotron waves; lightning-generated radio signals descending in tone heard by VLF receivers.
- **Ion and electron cyclotron waves**; **upper and lower hybrid waves**.
- **Ordinary and extraordinary modes** (O and X) for EM waves across B.
H: Uses
P: Fusion devices heat plasmas with RF waves resonant with ion or electron cyclotron motion (ICRH, ECRH, ~MW of power at ~50 MHz or ~170 GHz). Reflectometry and interferometry use waves to measure density. In space, wave–particle interactions accelerate radiation-belt electrons and scatter them into the atmosphere.
X: Ion acoustic speed in a hydrogen plasma with T_{e} = 10 eV?
> v = √(10 × 1.6 × 10^{-19}/1.67 × 10^{-27}) ≈ 31 km s^{-1}
!: Plasma "sound" depends on electron temperature but ion mass; cold electrons mean no ion acoustic waves.
Q: What are whistlers? | Low-frequency electromagnetic waves guided along Earth's field, often from lightning, with descending tones.
Q: How are fusion plasmas heated with waves? | By RF waves resonant with ion or electron cyclotron motion.
M1: Ion acoustic waves depend on electron temperature and: | Ion mass | Electron mass | Magnetic field only | Light speed | √(k_{B}T_{e}/m_{i}).
M2: ECRH heats electrons using waves at: | The electron cyclotron frequency | Plasma frequency only | Sound frequencies | 50 Hz | Resonance.

## Alfvén waves
S: Alfvén waves are transverse oscillations of magnetic field lines and plasma, like waves on a plucked string, with the field's tension providing the restoring force. They carry energy in the Sun's corona, the solar wind and Earth's magnetosphere.
H: Properties
E: v_{A} = B/√(μ_{0}ρ) :: Alfvén speed
- Propagate along B; magnetic field and velocity perturbations perpendicular.
- Incompressible; non-dispersive in ideal MHD.
- Predicted by Hannes Alfvén (1942; Nobel 1970), initially doubted, confirmed in liquid metals and space.
H: Typical speeds
- Solar corona: ~1000 km s^{-1}.
- Solar wind at Earth: ~50 km s^{-1}.
- Earth's magnetosphere: ~1000 km s^{-1}.
- Tokamak: ~10^{7} m s^{-1}.
H: Importance
P: The solar corona is ~1–2 million K while the surface is ~5800 K; Alfvén waves carrying energy from the convecting surface and dissipating in the corona are a leading explanation, along with small reconnection events ("nanoflares"). Parker Solar Probe has measured "switchbacks", sudden kinks in the field that may be Alfvénic structures. In tokamaks, energetic fusion alphas can drive Alfvén eigenmodes unstable, losing fast particles.
X: Alfvén speed in the solar wind (B = 5 nT, n = 5 × 10^{6} m^{-3} protons)?
> ρ = 8.4 × 10^{-21} kg m^{-3}
> v_{A} = 5 × 10^{-9}/√(1.26 × 10^{-6} × 8.4 × 10^{-21}) ≈ 49 km s^{-1}
!: Alfvén waves don't compress the plasma; they bend field lines, unlike sound or magnetosonic waves.
Q: What is the Alfvén speed? | v_{A} = B/√(μ_{0}ρ).
Q: Why are Alfvén waves linked to coronal heating? | They can carry energy from the solar surface into the corona and dissipate it there.
M1: The restoring force for Alfvén waves is: | Magnetic tension | Gas pressure | Gravity | Surface tension | Field lines like strings.
M2: Doubling plasma density changes the Alfvén speed by: | ×1/√2 | ×2 | ×½ | No change | ∝ ρ^{−1/2}.

## Plasma instabilities
S: Plasmas store energy in gradients of density, temperature, current and velocity, and often release it through instabilities that grow rapidly. Instabilities limit fusion confinement and drive dramatic events in space.
H: Classes
- **Macroscopic (MHD)**: kink, sausage, interchange, ballooning, tearing modes: whole-plasma distortions.
- **Microinstabilities**: drift waves, ion and electron temperature gradient modes: drive turbulent transport.
- **Velocity-space**: two-stream, beam–plasma, Weibel: from non-Maxwellian distributions.
- **Rayleigh–Taylor**: dense plasma supported against gravity or acceleration (inertial fusion capsules, supernova remnants).
H: Examples
- **Kink instability** limits current in tokamaks (Kruskal–Shafranov limit).
- **Disruptions**: sudden loss of tokamak confinement; must be avoided in reactors.
- **Edge-localised modes (ELMs)**: periodic eruptions from the tokamak edge.
- **Tearing modes**: break and reconnect field lines into magnetic islands.
H: Turbulence
P: Small-scale drift-wave turbulence carries heat out of tokamaks far faster than collisions alone (anomalous transport). Gyrokinetic supercomputer simulations predict it; discovering high-confinement modes (H-mode, 1982) with transport barriers made reactor designs like ITER feasible.
X: Why does a straight current-carrying plasma column kink?
> A slight bend strengthens the field on the inside of the bend
> Extra magnetic pressure pushes the bend further out: the instability grows
!: Not all instabilities are bad; some (magnetorotational instability) are essential to astrophysical accretion.
Q: What is a disruption in a tokamak? | A sudden loss of plasma confinement, releasing energy and current onto the walls.
Q: What is anomalous transport? | Heat and particle loss from turbulence, much faster than collisional (classical) transport.
M1: The kink instability is driven by: | Plasma current | Temperature only | Gravity | Neutral gas | Current-driven MHD.
M2: H-mode in tokamaks provides: | Improved confinement with an edge transport barrier | Disruptions | Lower temperatures | No plasma | Discovered at ASDEX 1982.

## Magnetic confinement
S: Magnetic confinement holds a hot plasma away from material walls using magnetic fields, since charged particles spiral along field lines. It's the leading route to fusion power, with tokamaks and stellarators the main designs.
H: Principles
- Particles are tied to field lines; closed field configurations prevent losses along them.
- A simple solenoid leaks at its ends; magnetic mirrors leak particles with small pitch angles.
- Toroidal geometry closes field lines but creates drifts (∇B and curvature) that separate charges.
- Twisting field lines (rotational transform) averages out drifts: tokamaks drive plasma current; stellarators twist coils.
H: Confinement figures of merit
E: nτ_{E}T :: triple product
E: τ_{E} = W/P_{loss} :: energy confinement time
- ITER aims for Q = P_{fusion}/P_{heating} = 10 (500 MW from 50 MW).
- Record triple products from JET, JT-60U; JET's 69 MJ of fusion energy (2023).
H: Other concepts
- Spherical tokamaks (MAST-U, NSTX): compact.
- Reversed-field pinches, field-reversed configurations, magnetic mirrors (revived with high-field magnets).
- High-temperature superconducting magnets (~20 T) enable smaller devices (SPARC).
X: Why does confinement improve with stronger magnets?
> Plasma pressure limit ∝ B^{2}: fusion power density ∝ β^{2}B^{4}
> Doubling B allows ~16× the fusion power density at the same β
!: Magnetic fields don't stop all losses: collisions, turbulence and radiation still leak energy across field lines.
Q: Why is toroidal confinement needed? | To close field lines so particles don't escape along them at the ends.
Q: What is the energy confinement time? | Stored plasma energy divided by the rate of energy loss.
M1: ITER's goal is: | Q = 10 | Q = 1 | Net electricity to the grid | Q = 0.1 | 500 MW from 50 MW.
M2: Rotational transform in a tokamak comes from: | Plasma current | Twisted coils only | Gravity | Neutral beams | Poloidal field.

## Tokamaks and stellarators
S: Tokamaks and stellarators are the two main toroidal magnetic confinement designs for fusion. Tokamaks use a large plasma current to twist the field; stellarators twist it with complex external coils.
H: Tokamaks
- Toroidal field from external coils + poloidal field from plasma current (driven inductively by a central solenoid).
- Simple, symmetric, good confinement; the most advanced fusion concept.
- Challenges: pulsed operation (unless current is driven non-inductively), disruptions.
- Examples: JET, JT-60SA, KSTAR, EAST, DIII-D, ITER (under construction in France), SPARC.
H: Stellarators
- 3D twisted coils produce all confining fields; no plasma current needed.
- Inherently steady-state; no current-driven disruptions.
- Complex design needs supercomputer optimisation and precise coils.
- Wendelstein 7-X (Germany, 2015) demonstrated optimised confinement and long pulses.
H: Shared challenges
P: Both need plasmas over 100 million K, materials that survive 14 MeV neutrons and intense heat at the divertor (~10 MW m^{-2}), tritium breeding in lithium blankets, and reliable remote handling. Private companies are pursuing compact high-field tokamaks, stellarators and alternative concepts.
X: Why does a tokamak need a central solenoid?
> Changing current in the solenoid induces a toroidal electric field (transformer action)
> This drives the plasma current that creates the poloidal field
!: A tokamak can't run forever on inductive current drive; the solenoid's flux runs out, so steady state needs other current-drive methods.
Q: What's the main difference between tokamaks and stellarators? | Tokamaks twist the field using plasma current; stellarators use twisted external coils.
Q: What is a divertor? | A region that removes heat and impurities by guiding edge field lines to target plates.
M1: Wendelstein 7-X is a: | Stellarator | Tokamak | Laser fusion facility | Mirror machine | Germany.
M2: ITER is being built in: | France | Japan | USA | UK | Cadarache.

## Inertial confinement fusion
S: Inertial confinement fusion compresses a tiny fuel capsule so fast and hard that it fuses before it can fly apart. Powerful lasers or particle beams implode the capsule to densities and temperatures exceeding the Sun's core.
H: Approach
- Deuterium–tritium fuel in a ~2 mm capsule.
- **Direct drive**: lasers hit the capsule directly.
- **Indirect drive**: lasers heat a gold hohlraum, producing X-rays that implode the capsule uniformly.
- Implosion compresses fuel to ~1000 times liquid density; a central hot spot ignites (~50 million K) and a burn wave spreads.
H: Ignition
- Lawson-type criterion in terms of areal density ρR (~0.3 g cm^{-2} for the hot spot) and temperature.
- NIF (National Ignition Facility, USA): 192 lasers, ~2 MJ of UV light.
- December 2022: 3.15 MJ fusion yield from 2.05 MJ of laser energy: first ignition (target gain > 1). Later shots exceeded 5 MJ.
H: Challenges
P: The lasers are inefficient (wall-plug energy ~300 MJ), so overall gain is far below 1. A power plant would need ~10 shots per second, cheap targets and high-gain designs. Hydrodynamic instabilities (Rayleigh–Taylor) during implosion are a major obstacle. ICF also supports nuclear weapons research (stockpile stewardship).
X: Target gain of the December 2022 NIF shot?
> G = 3.15/2.05 ≈ 1.5
!: NIF's ignition milestone means fusion yield exceeded laser energy on target, not that the facility produced net electricity.
Q: How does indirect-drive ICF work? | Lasers heat a hohlraum, whose X-rays uniformly compress the fuel capsule.
Q: What did NIF achieve in December 2022? | Fusion ignition: more fusion energy out than laser energy delivered to the target.
M1: The main instability limiting ICF implosions is: | Rayleigh–Taylor | Kink | Tearing | Two-stream | Interface between dense and light.
M2: NIF uses how many laser beams? | 192 | 12 | 1 | 1000 | National Ignition Facility.

## Fusion energy
S: Fusion energy aims to generate electricity from the same reactions that power the Sun, using abundant fuels and producing no carbon emissions or long-lived high-level waste. It's scientifically demonstrated but not yet commercially viable.
H: Fuels and reactions
- D–T: easiest; deuterium from seawater; tritium bred from lithium (n + ⁶Li → T + ⁴He).
- D–D, D–³He, p–¹¹B (aneutronic): harder, need higher temperatures.
- 1 kg of D–T fusion ≈ 3.4 × 10^{14} J (~10 million kg of coal).
H: Advantages
- Abundant fuel, no CO_{2}, no chain reaction (inherently safe: plasma stops if disturbed).
- Activation of structures produces radioactive waste, but shorter-lived than fission products.
H: Challenges
- Sustained net energy gain, including all plant power.
- Materials surviving neutron damage (displacements per atom, helium embrittlement).
- Tritium breeding ratio > 1; tritium handling.
- Heat exhaust; reliability; cost.
H: Timeline
P: ITER aims for D–T operation in the late 2030s. Demonstration plants (DEMO, STEP in the UK, China's CFETR) are planned for the 2040s–50s. Dozens of private companies, attracted by high-temperature superconducting magnets and new designs, target pilot plants in the 2030s.
X: Energy from 1 g of D–T fuel fully fused?
> 17.6 MeV per 5 u: 3.4 × 10^{14} J kg^{-1}
> 1 g ⇒ 3.4 × 10^{11} J ≈ 94 MWh
!: Fusion reactors can't run away like fission reactors; but they're not entirely free of radioactive waste.
Q: Why is fusion inherently safe from runaway reactions? | The plasma conditions are so hard to maintain that any disturbance stops fusion.
Q: How is tritium supplied in a D–T reactor? | By breeding it from lithium in a blanket using fusion neutrons.
M1: Deuterium is obtained from: | Seawater | Lithium | Uranium | Air | Abundant.
M2: The main radioactive waste in fusion comes from: | Neutron activation of structures | Spent fuel rods | Fission products | Alpha particles | Structural activation.

## Solar and astrophysical plasmas
S: Almost all visible matter in the universe is plasma. The Sun's plasma generates magnetic fields, flares and the solar wind; beyond, plasmas form nebulae, accretion discs, jets and the hot gas filling galaxy clusters.
H: The Sun
- Core: fusion at 15 million K; dense plasma.
- Convection zone: turbulent plasma drives the solar dynamo; 11-year sunspot cycle (22-year magnetic cycle).
- Photosphere (~5800 K), chromosphere, corona (1–3 million K: the coronal heating problem).
- Solar flares: magnetic reconnection releasing up to ~10^{25} J in minutes.
- Coronal mass ejections: billions of tonnes of plasma.
H: Beyond the Sun
- **Interstellar medium**: multiphase plasma; supernova shocks accelerate cosmic rays.
- **Accretion discs**: magnetorotational instability drives accretion onto black holes and young stars.
- **Relativistic jets** from active galaxies, launched magnetically.
- **Pulsar magnetospheres** and wind nebulae (Crab Nebula).
- **Intracluster medium**: 10^{7}–10^{8} K gas emitting X-rays; holds more mass than the galaxies' stars.
H: Radiation from plasmas
P: Plasmas emit thermal bremsstrahlung (X-rays from clusters), synchrotron radiation from relativistic electrons spiralling in fields (radio galaxies), line emission and cyclotron radiation. Interpreting these spectra reveals temperatures, densities and magnetic fields across the cosmos.
X: Why does the Sun's magnetic polarity reverse every 11 years?
> The dynamo, driven by differential rotation and convection, cycles the field
> Full magnetic cycle: 22 years
!: The corona's high temperature doesn't mean it radiates much energy; it's extremely thin.
Q: What is the coronal heating problem? | Explaining why the corona is millions of degrees hotter than the photosphere.
Q: What powers solar flares? | Magnetic reconnection releasing stored magnetic energy.
M1: The intracluster medium is seen mainly in: | X-rays | Radio only | Visible light | Gamma rays | Hot thermal bremsstrahlung.
M2: The magnetorotational instability drives: | Turbulence and accretion in discs | Sunspots | Fusion | Solar wind only | Angular momentum transport.

## Space plasma physics
S: Space plasma physics studies plasmas in the solar system: the solar wind, planetary magnetospheres and ionospheres. It underpins space weather, which can damage satellites, disrupt communications and black out power grids.
H: The solar wind
- Supersonic plasma flow from the Sun at 300–800 km s^{-1}.
- Carries the interplanetary magnetic field in a Parker spiral.
- Ends at the heliopause (~120 AU), crossed by Voyager 1 (2012) and 2 (2018).
H: Earth's magnetosphere
- Bow shock and magnetopause (~10 Earth radii on the dayside); long magnetotail on the night side.
- Van Allen radiation belts.
- Reconnection at the magnetopause and in the tail drives substorms and auroras (electrons accelerated into the atmosphere excite oxygen (green, red) and nitrogen (blue)).
H: Space weather
- Geomagnetic storms from coronal mass ejections.
- Effects: satellite drag and charging, GPS errors, radio blackouts, induced currents in power grids (Quebec blackout 1989), radiation risks for astronauts.
- The 1859 Carrington event: auroras at the tropics, telegraph fires; a repeat today could cost trillions.
- The May 2024 storm produced auroras at unusually low latitudes worldwide.
H: Missions
P: Spacecraft such as Cluster, THEMIS and MMS (measuring reconnection at the electron scale), Parker Solar Probe (flying through the corona) and Solar Orbiter study space plasmas directly: the only natural plasmas we can sample in situ.
X: How long does a CME at 1000 km s^{-1} take to reach Earth?
> t = 1.5 × 10^{11}/10^{6} = 1.5 × 10^{5} s ≈ 1.7 days
!: Auroras aren't caused by solar wind particles hitting the atmosphere directly; magnetospheric processes accelerate the electrons.
Q: What causes geomagnetic storms? | Coronal mass ejections and fast solar wind interacting with Earth's magnetosphere.
Q: What was the Carrington event? | An extreme geomagnetic storm in 1859, causing auroras at low latitudes and telegraph disruption.
M1: The magnetopause on Earth's dayside is at about: | 10 Earth radii | 1 Earth radius | 100 Earth radii | The Moon's orbit | Pressure balance.
M2: Green auroral light comes mainly from: | Atomic oxygen | Nitrogen | Hydrogen | Helium | 557.7 nm.

## Plasma diagnostics
S: Plasma diagnostics measure temperatures, densities, fields and flows in plasmas that are too hot or remote for ordinary instruments. They combine probes, lasers, spectroscopy and electromagnetic waves.
H: Methods
- **Langmuir probes**: current–voltage curves give n_{e} and T_{e} (edges and cool plasmas).
- **Magnetic probes and loops**: currents, field fluctuations, plasma position.
- **Thomson scattering**: laser light scattered by electrons; Doppler broadening gives T_{e}, intensity gives n_{e}.
- **Interferometry and reflectometry**: phase shifts and cut-offs of microwaves or lasers measure density.
- **Spectroscopy**: line Doppler widths (ion temperature), Doppler shifts (flows), Stark broadening (density), Zeeman splitting (field).
- **Charge-exchange recombination spectroscopy**: ion temperature and rotation from neutral beam interactions.
- **Electron cyclotron emission**: T_{e} profiles.
- **Neutron and gamma diagnostics**: fusion reaction rates.
H: Challenges
P: Fusion plasmas reach 100 million K with intense neutron and heat fluxes, so diagnostics must be remote, radiation-hard and fast. Astrophysical diagnostics rely entirely on emitted radiation and in-situ spacecraft data.
X: Thomson-scattered light from electrons at 10 keV: why is the spectrum so broad?
> Electron thermal speeds ~6 × 10^{7} m s^{-1} (0.2c)
> Doppler shifts of ~20%: broad, slightly asymmetric relativistic spectra
!: Probes perturb plasmas; in hot cores, non-invasive optical and microwave methods are essential.
Q: What does Thomson scattering measure? | Electron temperature (from spectral width) and density (from intensity).
Q: How does a Langmuir probe work? | Its current–voltage characteristic reveals electron temperature and density.
M1: Interferometry measures plasma density using: | Phase shifts of waves passing through | Magnetic coils | Neutrons | Thermometers | Refractive index.
M2: Ion temperature is often measured by: | Doppler broadening of spectral lines | Voltmeters | Langmuir probes only | Weighing | Spectroscopy.

## Industrial and technological plasmas
S: Low-temperature plasmas are essential industrial tools: they etch and deposit layers on every computer chip, light our streets, cut and weld metals, sterilise medical equipment and treat surfaces.
H: Non-thermal (cold) plasmas
- Electrons hot (~1–10 eV), ions and gas near room temperature.
- **Plasma etching** (reactive ion etching): anisotropic etching of nanoscale features in chips.
- **Plasma-enhanced CVD**: deposit films at low temperature (solar cells, displays).
- **Sputtering**: coatings on glass, tools, mirrors.
- **Plasma medicine**: wound healing, sterilisation.
- **Surface treatment**: improving adhesion of plastics; plasma cleaning.
- **Ozone generation** and pollution control.
H: Thermal plasmas
- Arc welding, plasma cutting (~20 000 K jets).
- Plasma torches for waste treatment and spraying coatings.
- Arc furnaces for steelmaking.
H: Lighting and displays
P: Fluorescent lamps excite mercury vapour whose UV light makes phosphors glow; neon signs use neon's red glow; high-pressure sodium and metal-halide lamps light streets and stadiums. Plasma TVs used tiny discharge cells (now replaced by LCD and OLED). Plasma thrusters (Hall effect, ion engines) propel spacecraft efficiently.
X: Why are plasmas essential for etching chips with vertical walls?
> Ions accelerated across the sheath bombard the surface vertically
> Combined with reactive radicals, they etch straight down (anisotropic)
!: Cold plasmas aren't cold in their electrons; it's the heavy particles that stay near room temperature.
Q: What is reactive ion etching? | Plasma etching combining chemical radicals and directional ion bombardment.
Q: How do Hall thrusters work? | Electrons trapped in a magnetic field ionise propellant; an electric field accelerates the ions out.
M1: Non-thermal plasmas have: | Hot electrons and cool ions | Hot ions and cold electrons | Equal temperatures | No electrons | Non-equilibrium.
M2: Neon signs glow red because of: | Neon's emission lines | Phosphors | Incandescence | Mercury | Gas discharge.
`;
