// Physics unit 18, Electromagnetic Waves. Specs are written by scripts/diagrams/physics/u18.mjs.
//   [lessonId, renderer, diagramId, what it shows] | [lessonId, "lab", labId, what it lets you do] | [lessonId, null, reason]
const DEF = "a definition, list of properties or classification that a picture would not teach";
const FORMULA = "a one-line formula whose worked example is a single substitution; a picture would add nothing";
const LIST = "a list of uses and devices; a picture would only decorate it";
export default [
  ["u18-01", "graph", "phys-u18-spreading", "amplitude ∝ 1/r against intensity ∝ 1/r²: at twice the distance 0.5 and 0.25"],
  ["u18-02", null, "history and significance of c; the worked example is one division"],
  ["u18-03", null, "needs renderer: a plane electromagnetic wave in 3D (E and B in phase, perpendicular, along E × B) with E = cB checked"],
  ["u18-04", "graph", "phys-u18-plasma-dispersion", "ω² = ω_p² + c²k² for the ionosphere: 9 MHz cut-off, approaching the vacuum line"],
  ["u18-05", "scale", "phys-u18-spectrum", "the bands from radio to gamma rays on one wavelength scale with example sources and photon energies"],
  ["u18-06", null, LIST],
  ["u18-07", null, FORMULA],
  ["u18-08", "graph", "phys-u18-person-thermal", "Planck spectrum of a 310 K body peaking at 9.4 μm in the thermal infrared"],
  ["u18-09", "graph", "phys-u18-rayleigh", "Rayleigh scattering (700/λ)⁴ across the visible: 5.9 times at 450 nm"],
  ["u18-10", "scale", "phys-u18-uv-bands", "UVA, UVB, UVC and extreme UV on a wavelength scale with the 254 nm lamp and 13.5 nm lithography"],
  ["u18-11", "graph", "phys-u18-xray-continuum", "the bremsstrahlung continuum with its Duane–Hunt limit at 50 kV and 30 kV"],
  ["u18-12", "graph", "phys-u18-gamma-lead", "e^{−μx} in lead with μ = 0.77 cm⁻¹: 10% after 3 cm, half after 0.9 cm"],
  ["u18-13", "graph", "phys-u18-three-polarisers", "fraction transmitted by three polarisers against the middle angle: ⅛ sin²2θ, 1/8 at 45°"],
  ["u18-14", "graph", "phys-u18-reflectance-n", "R = ((n − 1)/(n + 1))² for air to water, glass, diamond and silicon"],
  ["u18-14", "graph", "phys-u18-lens-transmission", "0.96^N: ten uncoated surfaces transmit 0.66"],
  ["u18-15", "refraction", "phys-u18-water-surface", "a ray in water at 45° escapes at 70°; at 60° it is totally reflected (critical angle 48.8°)"],
  ["u18-16", null, "needs renderer: a prism with two colours and the angular separation near minimum deviation (the example gives about 0.4°)"],
  ["u18-17", "graph", "phys-u18-beer-lambert", "a solution passing half the light per cm: 0.5^x, 12.5% after 3 cm"],
  ["u18-18", null, FORMULA],
  ["u18-19", null, "needs renderer: the Poynting vector S = E × B/μ₀ round a current-carrying resistor (E along the wire, B round it, S inward)"],
  ["u18-20", null, FORMULA],
  ["u18-21", "graph", "phys-u18-wr90-velocities", "group and phase velocity in WR-90 above the 6.6 GHz cut-off, with X-band shaded"],
  ["u18-22", null, "needs renderer: a polar radiation pattern (half-wave dipole doughnut, dish beamwidth 0.58° at 12 GHz)"],
  ["u18-23", "scale", "phys-u18-field-regions", "reactive near field, radiating near field and far field for a 1 m antenna at 10 GHz (4.8 mm, 67 m)"],
  ["u18-24", null, LIST],
  ["u18-25", "graph", "phys-u18-skin-depth-aluminium", "field decaying as e^{−z/δ} with δ = 8.5 μm in aluminium at 100 MHz; 16 μm foil leaves 0.15"],
  ["u18-26", "graph", "phys-u18-reflection-coefficient", "|Γ| and Γ² against load impedance on a 50 Ω line: 0.2 and 4% at 75 Ω"],
  ["u18-27", null, FORMULA],
];
