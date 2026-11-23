// The Organic Notes Lab's chemistry (kit/labs/chemistry/skeletal.js): the hexagon-paper geometry, what a drawing is
// worked out to be, and the IUPAC names, checked against known answers.
import { test } from "node:test";
import assert from "node:assert/strict";
import * as K from "../kit/labs/chemistry/skeletal.js";
import { PROBLEMS } from "../kit/labs/chemistry/sketch.js";
import { EVIDENCE } from "../kit/courses/chemistry/evidence.js";

const of = (s) => K.analyse(K.graphFromSmiles(s));
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol;

test("names: alkanes, branches, halogens and every principal group in scope", () => {
  const cases = {
    C: "methane", CC: "ethane", CCO: "ethanol", "CC(C)C": "2-methylpropane", "CC(C)(C)C": "2,2-dimethylpropane", "CCC(C)CC": "3-methylpentane",
    "CC(C)CC(C)C": "2,4-dimethylpentane", "CC(C)CC(C)(C)C": "2,2,4-trimethylpentane", "CCCC(CC)CCC": "4-ethylheptane", "CC(C)C(C)C": "2,3-dimethylbutane",
    "CCCC(C(C)C)CC": "3-ethyl-2-methylhexane", "CCCC(C(C)C)CCC": "4-(1-methylethyl)heptane",
    "CC(Cl)CBr": "1-bromo-2-chloropropane", "CC(Cl)C(Br)C": "2-bromo-3-chlorobutane", "ClC(Cl)Cl": "trichloromethane", BrCCl: "bromochloromethane", BrCCBr: "1,2-dibromoethane", CCl: "chloromethane", "CC(Br)(Br)C": "2,2-dibromopropane",
    "CC(O)C": "propan-2-ol", "CC(C)(C)O": "2-methylpropan-2-ol", "CC(C)CO": "2-methylpropan-1-ol", OCCO: "ethane-1,2-diol", ClCCO: "2-chloroethan-1-ol",
    "CC(=O)C": "propan-2-one", "CC(=O)CC(=O)C": "pentane-2,4-dione", CCC: "propane", "CCC=O": "propanal", "CC=O": "ethanal", "C=O": "methanal", "O=CCC=O": "propanedial",
    "CCC(=O)O": "propanoic acid", "OC=O": "methanoic acid", "OC(=O)CC(=O)O": "propanedioic acid", "CC(O)C(=O)O": "2-hydroxypropanoic acid", "CC(=O)CCC(=O)O": "4-oxopentanoic acid",
    "C=C": "ethene", "C#C": "ethyne", "CC=CC": "but-2-ene", "C=CC=C": "buta-1,3-diene", "C#CC": "prop-1-yne", "CC(C)=C": "2-methylprop-1-ene", "C=CC#C": "but-1-en-3-yne",
    ClC: "chloromethane", "ClC=C": "chloroethene", "C=CCO": "prop-2-en-1-ol", "C=CC(=O)C": "but-3-en-2-one", "C=CC(=O)O": "prop-2-enoic acid", "C=CC(C)C": "3-methylbut-1-ene",
  };
  for (const [s, want] of Object.entries(cases)) assert.equal(of(s).name?.name, want, s);
});

test("names: rings, esters and amines come from the library, with everyday names", () => {
  assert.equal(of("c1ccccc1").name.name, "benzene");
  assert.equal(of("c1ccc2ccccc2c1").name.name, "naphthalene");
  assert.equal(of("CCOC(C)=O").name.name, "ethyl ethanoate");
  assert.equal(of("OC1CCCCC1").name.name, "cyclohexanol");
  assert.equal(of("[O-][N+](=O)c1ccccc1").name.name, "nitrobenzene");
  assert.match(of("CC(C)=O").name.aka, /acetone/);
  assert.match(of("CC(=O)O").name.aka, /acetic acid/);
  const r = of("CCOCC1CC1"); assert.equal(r.name.name, null); assert.ok(r.name.reason);
});

test("the working-out: formula, Mr, unsaturation, groups and their classes", () => {
  const e = of("CCO");
  assert.equal(e.formula, "C2H6O"); assert.ok(near(e.mass, 46.07, 0.01)); assert.equal(e.dou, 0); assert.equal(e.condensed, "CH3CH2OH");
  assert.deepEqual(e.groups.map((g) => g.label), ["Alcohol (primary)"]);
  assert.ok(of("CC(O)C").groups.some((g) => g.label === "Alcohol (secondary)"));
  assert.ok(of("CC(C)(C)O").groups.some((g) => g.label === "Alcohol (tertiary)"));
  const b = of("c1ccccc1"); assert.equal(b.formula, "C6H6"); assert.equal(b.dou, 4); assert.equal(b.ringCount, 1); assert.equal(b.aromaticRings, 1);
  assert.ok(!b.groups.some((g) => g.key === "alkene"), "a benzene ring's double bonds aren't alkenes");
  assert.equal(of("c1ccc2ccccc2c1").aromaticRings, 2, "both rings of naphthalene, whichever Kekulé form");
  const keys = (s) => of(s).groups.map((g) => g.key).sort();
  assert.deepEqual(keys("CC(=O)O"), ["acid"]); assert.deepEqual(keys("CC=O"), ["aldehyde"]); assert.deepEqual(keys("CC(C)=O"), ["ketone"]);
  assert.deepEqual(keys("CCOC(C)=O"), ["ester"]); assert.deepEqual(keys("CC(N)=O"), ["amide"]); assert.deepEqual(keys("CC(Cl)=O"), ["acyl-halide"]);
  assert.deepEqual(keys("CC(=O)OC(C)=O"), ["anhydride"]); assert.deepEqual(keys("CCN"), ["amine"]); assert.deepEqual(keys("CC#N"), ["nitrile"]);
  assert.deepEqual(keys("COC"), ["ether"]); assert.deepEqual(keys("Oc1ccccc1"), ["arene", "phenol"]); assert.deepEqual(keys("[O-][N+](=O)c1ccccc1"), ["arene", "nitro"]);
  assert.deepEqual(keys("CCBr"), ["haloalkane"]); assert.deepEqual(keys("Clc1ccccc1"), ["arene", "haloarene"]);
  assert.equal(of("CC(C)CC(C)(C)C").condensed, "CH3C(CH3)2CH2CH(CH3)CH3");
  assert.equal(of("CC(=O)O").condensed, "CH3COOH");
});

test("stereocentres and E/Z isomerism", () => {
  assert.equal(of("CC(O)CC").stereo.length, 1, "butan-2-ol");
  assert.equal(of("CC(O)C").stereo.length, 0, "propan-2-ol");
  assert.equal(of("CC(N)C(=O)O").stereo.length, 1, "alanine");
  assert.equal(of("CC1CCCCC1").stereo.length, 0, "methylcyclohexane: the two ring paths are the same");
  assert.equal(of("CC1CCCC(C)C1").stereo.length, 2, "1,3-dimethylcyclohexane");
  assert.equal(of("CC=CC").ez.length, 1, "but-2-ene");
  assert.equal(of("C=CC").ez.length, 0, "propene");
  assert.equal(of("CC(C)=CC").ez.length, 0, "2-methylbut-2-ene");
  assert.equal(of("C1CCC=CC1").ez.length, 0, "a C=C in a six-membered ring");
});

test("the same molecule drawn differently has the same hash; isomers differ", () => {
  assert.equal(of("OCC").hash, of("CCO").hash);
  assert.equal(of("C1=CC=CC=C1").hash, of("c1ccccc1").hash);
  assert.equal(of("C1=CC2=CC=CC=C2C=C1").hash, of("c1ccc2ccccc2c1").hash, "naphthalene's two Kekulé forms");
  const pent = new Set(["CCCCC", "CC(C)CC", "CC(C)(C)C", "CCC(C)C"].map((s) => of(s).hash));
  assert.equal(pent.size, 3);
  // explicit hydrogens drawn on a carbon are folded in
  const m = K.empty(), c = K.addAtom(m, 0, 0), o = K.addAtom(m, 1, 0, "O"); K.addBond(m, c.id, o.id); for (let k = 0; k < 3; k++) K.addBond(m, c.id, K.addAtom(m, -1, k, "H").id);
  assert.equal(K.analyse(m).hash, of("CO").hash);
});

test("valence errors and charges", () => {
  const m = K.empty(), c = K.addAtom(m, 0, 0); for (let k = 0; k < 5; k++) K.addBond(m, c.id, K.addAtom(m, k, 1).id);
  const a = K.analyse(m); assert.equal(a.problems.length, 1); assert.equal(a.problems[0].atom, c.id); assert.equal(a.name, null);
  const am = of("C[NH3+]"); assert.equal(am.formula, "CH6N"); assert.equal(am.charge, 1); assert.equal(am.problems.length, 0);
});

test("hexagon paper: lattice points, hexagon centres and 120° zig-zags", () => {
  const [x, y, s] = K.snapPoint(0.1, -0.05); assert.ok(near(x, 0) && near(y, 0) && s === "A");
  assert.equal(K.siteOf(0, -1), "B"); assert.equal(K.siteOf(0.4, 0.4), null);
  // every vertex of a ring placed on the paper is a lattice point
  const m = K.empty(); const ring = K.ringPath(m, 6, { type: "point", x: 0.3, y: 0.2, snap: true });
  assert.equal(ring.length, 6); for (const [px, py] of ring) assert.ok(K.siteOf(px, py), `${px},${py} on the lattice`);
  for (let k = 0; k < 6; k++) { const [a, b] = [ring[k], ring[(k + 1) % 6]]; assert.ok(near(Math.hypot(a[0] - b[0], a[1] - b[1]), 1, 1e-9)); }
  // a chain grown atom by atom zig-zags at 120° along the paper
  const c = K.empty(); let a = K.addAtom(c, ...K.snapPoint(0, 0).slice(0, 2));
  const ids = [a.id]; for (let k = 0; k < 5; k++) { a = K.grow(c, a.id); ids.push(a.id); }
  for (const id of ids) { const p = K.atomOf(c, id); assert.ok(K.siteOf(p.x, p.y), "on the paper"); }
  for (let k = 1; k < ids.length - 1; k++) {
    const [p, q, r] = [ids[k - 1], ids[k], ids[k + 1]].map((i) => K.atomOf(c, i)), v1 = [p.x - q.x, p.y - q.y], v2 = [r.x - q.x, r.y - q.y];
    assert.ok(near(Math.acos(v1[0] * v2[0] + v1[1] * v2[1]), (2 * Math.PI) / 3, 1e-9), "120°");
  }
  assert.equal(K.analyse(c).name.name, "hexane");
  // a dragged chain: n carbons along the drag, on the paper
  const d = K.empty(), pts = K.chainPath(d, 0, 0, 4.4, 0); K.addChain(d, pts);
  assert.equal(K.analyse(d).name.name, "hexane"); for (const p of d.atoms) assert.ok(K.siteOf(p.x, p.y));
});

test("rings: benzene, fused (naphthalene), spiro, and a chain that closes into a ring", () => {
  const m = K.empty(); K.addRing(m, K.ringPath(m, 6, { type: "point", x: 0, y: 0, snap: true }), true);
  let a = K.analyse(m); assert.equal(a.formula, "C6H6"); assert.equal(a.name.name, "benzene");
  const shared = m.bonds[0]; K.addRing(m, K.ringPath(m, 6, { type: "bond", id: shared.id }), true);
  a = K.analyse(m); assert.equal(a.formula, "C10H8"); assert.equal(a.name.name, "naphthalene"); assert.equal(m.atoms.length, 10, "fused rings share two atoms");
  const s = K.empty(); K.addRing(s, K.ringPath(s, 5, { type: "point", x: 0, y: 0 }));
  K.addRing(s, K.ringPath(s, 5, { type: "atom", id: s.atoms[0].id })); assert.equal(K.analyse(s).formula, "C9H16");
  assert.equal(new Set(s.atoms.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`)).size, 9, "the spiro ring doesn't overlap the first");
  // grow round a hexagon: the sixth bond lands on the first atom and closes the ring
  const h = K.empty(); const r = K.ringPath(h, 6, { type: "point", x: 0, y: 0, snap: true }); let prev = K.addAtom(h, ...r[0]);
  for (let k = 1; k <= 6; k++) { const nx = K.placeAtom(h, ...r[k % 6]); K.addBond(h, prev.id, nx.id); prev = nx; }
  assert.equal(K.analyse(h).name.name, "cyclohexane");
});

test("the lab's problems: each target is valid, and each challenge is evidence for a lesson", () => {
  for (const p of PROBLEMS) {
    assert.ok(EVIDENCE["organic-notes"][p.id], `${p.id} mapped in kit/courses/chemistry/evidence.js`);
    if (p.want) assert.ok(of(p.want).formula, p.id);
  }
  assert.ok(PROBLEMS.find((p) => p.id === "tertiary").test(of("CC(C)(C)O")));
  assert.ok(!PROBLEMS.find((p) => p.id === "tertiary").test(of("CCCCO")));
  assert.ok(PROBLEMS.find((p) => p.id === "chiral").test(of("CC(O)CC")));
  assert.ok(PROBLEMS.find((p) => p.id === "ez").test(of("CC=CC")));
  assert.ok(!PROBLEMS.find((p) => p.id === "ez").test(of("C=CCC")));
  assert.ok(PROBLEMS.find((p) => p.id === "ring-alkene").test(of("C1CCC=CC1")));
  assert.equal(of("C=CC(C)C").name.name, PROBLEMS.find((p) => p.id === "named").name);
});

test("SVG output: the drawing, the paper and the chain numbering", () => {
  const m = K.graphFromSmiles("CC(O)CC"), a = K.analyse(m);
  m.atoms.forEach((p, i) => { p.x = i; p.y = i % 2 ? 0.5 : 0; });
  const svg = K.render(m, a, { cx: 2, cy: 0, s: 30 }, [400, 240], { grid: true, showNums: true });
  assert.match(svg, /^<svg[^>]+viewBox="0 0 400 240"/); assert.match(svg, />O</); assert.match(svg, />4</, "numbered to carbon 4");
  assert.ok(K.gridPath(-2, -2, 2, 2, (x) => x, (y) => y).length > 100);
});

// Regressions from the PR #159 review, each written against chemistry known independently of the lab
test("names: a C=O carbon without a hydrogen is not an aldehyde (ethanoyl chloride is not 1-chloroethanal)", () => {
  for (const s of ["CC(=O)Cl", "CC(Cl)=O"]) assert.equal(of(s).name.name, "ethanoyl chloride", s);
  assert.equal(of("CC=O").name.name, "ethanal"); assert.equal(of("C=O").name.name, "methanal"); assert.equal(of("CCC=O").name.name, "propanal");
  const acyl = of("CCC(=O)Br"); assert.notEqual(acyl.name.name, "1-bromopropanal"); assert.ok(!acyl.name.name || !/al$/.test(acyl.name.name), "no aldehyde name for an acyl bromide");
});

test("names: a ring of any size is declined by the chain namer, without hanging", () => {
  for (let k = 3; k <= 14; k++) {
    const s = `C1${"C".repeat(k - 1)}1`, t = Date.now(), a = of(s);
    assert.ok(Date.now() - t < 2000, `${k}-ring took too long`);
    assert.ok(a.name.name === null || /^cyclo/.test(a.name.name), `${k}-ring: ${a.name.name}`);
  }
  assert.equal(K.cycleRank(K.graph(K.graphFromSmiles("CCCC"))), 0); assert.equal(K.cycleRank(K.graph(K.graphFromSmiles("C1CCCCCCCC1"))), 1);
  assert.equal(K.cycleRank(K.graph(K.graphFromSmiles("c1ccc2ccccc2c1"))), 2);
});

test("SMILES import: bracket hydrogens the drawing can't hold are refused, not turned into another molecule", () => {
  assert.throws(() => K.graphFromSmiles("[O]"), /fewer hydrogens/, "atomic oxygen is not water");
  assert.throws(() => K.graphFromSmiles("[CH3]"), /fewer hydrogens/, "a methyl radical is not methane");
  assert.equal(of("[OH2]").formula, "H2O"); assert.equal(of("O").formula, "H2O");
  assert.equal(of("[NH4+]").formula, "H4N"); assert.equal(of("CC(=O)[O-]").charge, -1); assert.equal(of("[O-][N+](=O)c1ccccc1").formula, "C6H5NO2");
});

test("identity: equal hashes mean the same molecule, including symmetric ring systems colour refinement can't separate", () => {
  // prismane and the K3,3 graph: both C6H6, every carbon CH with three carbon neighbours
  const build = (edges) => { const m = K.empty(), ids = []; for (let i = 0; i < 6; i++) ids.push(K.addAtom(m, i, 0, "C").id); for (const [a, b] of edges) K.addBond(m, ids[a], ids[b], 1); return m; };
  const prism = build([[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 3], [0, 3], [1, 4], [2, 5]]);
  const k33 = build([[0, 3], [0, 4], [0, 5], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5]]);
  assert.equal(K.analyse(prism).formula, "C6H6"); assert.equal(K.analyse(k33).formula, "C6H6");
  assert.notEqual(K.analyse(prism).hash, K.analyse(k33).hash);
  // one molecule drawn different ways keeps one hash; positional isomers stay apart
  const h = (s) => of(s).hash;
  for (const [a, b] of [["c1ccccc1", "C1=CC=CC=C1"], ["Cc1ccccc1", "c1ccc(C)cc1"], ["OC1CCCCC1", "C1CCC(O)CC1"], ["C1CC2CCC1C2", "C1CC2CC1CC2"], ["CC(=O)Oc1ccccc1C(=O)O", "OC(=O)c1ccccc1OC(C)=O"]]) assert.equal(h(a), h(b), `${a} = ${b}`);
  for (const [a, b] of [["Cc1ccccc1C", "Cc1cccc(C)c1"], ["Cc1cccc(C)c1", "Cc1ccc(C)cc1"], ["C1CCCCC1", "CC1CCCC1"]]) assert.notEqual(h(a), h(b), `${a} ≠ ${b}`);
});

test("SMILES import: aromatic atoms that can't be given a Kekulé structure are refused, not imported as single bonds", () => {
  assert.throws(() => K.graphFromSmiles("c1cccc1"), /Kekulé/, "a five-carbon 'aromatic' ring is not cyclopentane");
  for (const [s, f] of [["c1ccccc1", "C6H6"], ["c1ccncc1", "C5H5N"], ["c1ccc2ccccc2c1", "C10H8"], ["c1cc[nH]c1", "C4H5N"], ["Cn1cnc2c1c(=O)n(C)c(=O)n2C", "C8H10N4O2"]]) assert.equal(of(s).formula, f, s);
});
