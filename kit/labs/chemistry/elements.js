// Element data for the chemistry interactives, rounded from standard references:
//   atomic weight      IUPAC standard atomic weights (2021, abridged); [n] = mass number of the most stable
//                      or best-known isotope for elements with no stable isotopes
//   electronegativity  Pauling scale (null where no reliable value is established)
//   ionisation energy  first ionisation energy, kJ/mol, from NIST atomic spectra data (null where unmeasured)
//   covalent radius    pm, Cordero et al., Dalton Trans. 2008 (low-spin values for Mn, Fe, Co)
// Electron configurations follow the Madelung (n + l) order with the known exceptions listed below; those
// for elements beyond Lr are predictions. Check a primary source before quoting a value.
const RAW = `H Hydrogen 1.008 2.20 1312 31
He Helium 4.0026 - 2372 28
Li Lithium 6.94 0.98 520 128
Be Beryllium 9.0122 1.57 900 96
B Boron 10.81 2.04 801 84
C Carbon 12.011 2.55 1086 76
N Nitrogen 14.007 3.04 1402 71
O Oxygen 15.999 3.44 1314 66
F Fluorine 18.998 3.98 1681 57
Ne Neon 20.180 - 2081 58
Na Sodium 22.990 0.93 496 166
Mg Magnesium 24.305 1.31 738 141
Al Aluminium 26.982 1.61 578 121
Si Silicon 28.085 1.90 787 111
P Phosphorus 30.974 2.19 1012 107
S Sulfur 32.06 2.58 1000 105
Cl Chlorine 35.45 3.16 1251 102
Ar Argon 39.95 - 1521 106
K Potassium 39.098 0.82 419 203
Ca Calcium 40.078 1.00 590 176
Sc Scandium 44.956 1.36 633 170
Ti Titanium 47.867 1.54 659 160
V Vanadium 50.942 1.63 651 153
Cr Chromium 51.996 1.66 653 139
Mn Manganese 54.938 1.55 717 139
Fe Iron 55.845 1.83 763 132
Co Cobalt 58.933 1.88 760 126
Ni Nickel 58.693 1.91 737 124
Cu Copper 63.546 1.90 746 132
Zn Zinc 65.38 1.65 906 122
Ga Gallium 69.723 1.81 579 122
Ge Germanium 72.630 2.01 762 120
As Arsenic 74.922 2.18 947 119
Se Selenium 78.971 2.55 941 120
Br Bromine 79.904 2.96 1140 120
Kr Krypton 83.798 3.00 1351 116
Rb Rubidium 85.468 0.82 403 220
Sr Strontium 87.62 0.95 550 195
Y Yttrium 88.906 1.22 600 190
Zr Zirconium 91.224 1.33 640 175
Nb Niobium 92.906 1.6 652 164
Mo Molybdenum 95.95 2.16 684 154
Tc Technetium [97] 1.9 702 147
Ru Ruthenium 101.07 2.2 710 146
Rh Rhodium 102.91 2.28 720 142
Pd Palladium 106.42 2.20 804 139
Ag Silver 107.87 1.93 731 145
Cd Cadmium 112.41 1.69 868 144
In Indium 114.82 1.78 558 142
Sn Tin 118.71 1.96 709 139
Sb Antimony 121.76 2.05 834 139
Te Tellurium 127.60 2.1 869 138
I Iodine 126.90 2.66 1008 139
Xe Xenon 131.29 2.6 1170 140
Cs Caesium 132.91 0.79 376 244
Ba Barium 137.33 0.89 503 215
La Lanthanum 138.91 1.10 538 207
Ce Cerium 140.12 1.12 534 204
Pr Praseodymium 140.91 1.13 527 203
Nd Neodymium 144.24 1.14 533 201
Pm Promethium [145] - 540 199
Sm Samarium 150.36 1.17 545 198
Eu Europium 151.96 - 547 198
Gd Gadolinium 157.25 1.20 593 196
Tb Terbium 158.93 - 566 194
Dy Dysprosium 162.50 1.22 573 192
Ho Holmium 164.93 1.23 581 192
Er Erbium 167.26 1.24 589 189
Tm Thulium 168.93 1.25 597 190
Yb Ytterbium 173.05 - 603 187
Lu Lutetium 174.97 1.27 524 187
Hf Hafnium 178.49 1.3 659 175
Ta Tantalum 180.95 1.5 728 170
W Tungsten 183.84 2.36 759 162
Re Rhenium 186.21 1.9 756 151
Os Osmium 190.23 2.2 814 144
Ir Iridium 192.22 2.20 865 141
Pt Platinum 195.08 2.28 864 136
Au Gold 196.97 2.54 890 136
Hg Mercury 200.59 2.00 1007 132
Tl Thallium 204.38 1.62 589 145
Pb Lead 207.2 - 716 146
Bi Bismuth 208.98 2.02 703 148
Po Polonium [209] - 812 140
At Astatine [210] - 899 150
Rn Radon [222] - 1037 150
Fr Francium [223] - 393 260
Ra Radium [226] - 509 221
Ac Actinium [227] - 499 215
Th Thorium 232.04 - 587 206
Pa Protactinium 231.04 - 568 200
U Uranium 238.03 1.38 598 196
Np Neptunium [237] - 605 190
Pu Plutonium [244] - 585 187
Am Americium [243] - 578 180
Cm Curium [247] - 581 169
Bk Berkelium [247] - 601 -
Cf Californium [251] - 608 -
Es Einsteinium [252] - 619 -
Fm Fermium [257] - 627 -
Md Mendelevium [258] - 635 -
No Nobelium [259] - 642 -
Lr Lawrencium [266] - 479 -
Rf Rutherfordium [267] - - -
Db Dubnium [268] - - -
Sg Seaborgium [269] - - -
Bh Bohrium [270] - - -
Hs Hassium [269] - - -
Mt Meitnerium [278] - - -
Ds Darmstadtium [281] - - -
Rg Roentgenium [282] - - -
Cn Copernicium [285] - - -
Nh Nihonium [286] - - -
Fl Flerovium [289] - - -
Mc Moscovium [290] - - -
Lv Livermorium [293] - - -
Ts Tennessine [294] - - -
Og Oganesson [294] - - -`;

const num = (s) => (s === "-" ? null : Number(s.replace(/[[\]]/g, "")));
const GASES = new Set(["H", "He", "N", "O", "F", "Ne", "Cl", "Ar", "Kr", "Xe", "Rn"]), LIQUIDS = new Set(["Br", "Hg"]);
const METALLOIDS = new Set(["B", "Si", "Ge", "As", "Sb", "Te"]), NONMETALS = new Set(["H", "C", "N", "O", "P", "S", "Se", "F", "Cl", "Br", "I"]);
const NOBLE = new Set(["He", "Ne", "Ar", "Kr", "Xe", "Rn", "Og"]);
// group and period from Z (lanthanides and actinides in their own rows, shown as group 3 members)
function place(Z) {
  const starts = [[1, 1], [3, 2], [11, 3], [19, 4], [37, 5], [55, 6], [87, 7]];
  const period = starts.filter(([z]) => Z >= z).length, z0 = starts[period - 1][0], i = Z - z0;
  if (period === 1) return { period, group: Z === 1 ? 1 : 18 };
  if (period <= 3) return { period, group: i < 2 ? i + 1 : i + 11 };
  if (period <= 5) return { period, group: i + 1 };
  if (i < 2) return { period, group: i + 1 };
  if (i < 17) return { period, group: 3, f: i - 2 }; // La–Lu or Ac–Lr
  return { period, group: i - 13 };
}
function category(sym, Z, g) {
  if (NOBLE.has(sym)) return "noble gas";
  if (g.f != null) return Z < 89 ? "lanthanide" : "actinide";
  if (g.group === 1 && sym !== "H") return "alkali metal";
  if (g.group === 2) return "alkaline earth metal";
  if (g.group >= 3 && g.group <= 12) return "transition metal";
  if (METALLOIDS.has(sym)) return "metalloid";
  if (NONMETALS.has(sym)) return g.group === 17 ? "halogen" : "non-metal";
  if (g.group === 17) return "halogen";
  return "post-transition metal";
}
// electron configuration by the Madelung rule, with measured exceptions
const ORDER = ["1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p", "5s", "4d", "5p", "6s", "4f", "5d", "6p", "7s", "5f", "6d", "7p"];
const CAP = { s: 2, p: 6, d: 10, f: 14 };
const EXC = { 24: "[Ar] 3d5 4s1", 29: "[Ar] 3d10 4s1", 41: "[Kr] 4d4 5s1", 42: "[Kr] 4d5 5s1", 44: "[Kr] 4d7 5s1", 45: "[Kr] 4d8 5s1", 46: "[Kr] 4d10", 47: "[Kr] 4d10 5s1", 57: "[Xe] 5d1 6s2", 58: "[Xe] 4f1 5d1 6s2", 64: "[Xe] 4f7 5d1 6s2", 78: "[Xe] 4f14 5d9 6s1", 79: "[Xe] 4f14 5d10 6s1", 89: "[Rn] 6d1 7s2", 90: "[Rn] 6d2 7s2", 91: "[Rn] 5f2 6d1 7s2", 92: "[Rn] 5f3 6d1 7s2", 93: "[Rn] 5f4 6d1 7s2", 96: "[Rn] 5f7 6d1 7s2", 103: "[Rn] 5f14 7s2 7p1" };
export function aufbau(Z) { const out = []; let n = Z; for (const o of ORDER) { if (n <= 0) break; const k = Math.min(n, CAP[o[1]]); out.push([o, k]); n -= k; } return out; }
const CORES = [[86, "[Rn]"], [54, "[Xe]"], [36, "[Kr]"], [18, "[Ar]"], [10, "[Ne]"], [2, "[He]"]];
export function config(Z) {
  if (EXC[Z]) return EXC[Z];
  const full = aufbau(Z), core = CORES.find(([z]) => z < Z);
  if (!core) return full.map(([o, k]) => `${o}${k}`).join(" ");
  let left = core[0]; const rest = [];
  for (const [o, k] of full) { if (left >= k) { left -= k; continue; } rest.push([o, k]); }
  // written in order of n, then l (the usual convention: [Ar] 3d6 4s2)
  const nl = (o) => Number(o[0]) * 10 + "spdf".indexOf(o[1]);
  return `${core[1]} ${rest.sort((a, b) => nl(a[0]) - nl(b[0])).map(([o, k]) => `${o}${k}`).join(" ")}`;
}
export const ELEMENTS = RAW.split("\n").map((line, i) => {
  const [sym, name, mass, en, ie, r] = line.trim().split(/\s+/), Z = i + 1, g = place(Z);
  return { Z, sym, name, mass: num(mass), synthetic: mass.startsWith("["), en: num(en), ie: num(ie), radius: num(r), ...g, block: g.f != null ? "f" : g.group <= 2 || sym === "He" ? "s" : g.group >= 13 ? "p" : "d", category: category(sym, Z, g), state: GASES.has(sym) ? "gas" : LIQUIDS.has(sym) ? "liquid" : "solid", config: config(Z), predicted: Z > 103 };
});
export const bySym = Object.fromEntries(ELEMENTS.map((e) => [e.sym, e]));
