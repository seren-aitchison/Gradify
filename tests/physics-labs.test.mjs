// Physics labs (kit/labs/physics/): every lab's physics is checked against textbook results, and the registry
// against the course (every linked lesson exists, every file exists, the page loads the lab styles).
import { test } from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import course from "../kit/courses/physics/course.js";
import * as projectile from "../kit/labs/physics/projectile.js";
import * as collisions from "../kit/labs/physics/collisions.js";
import * as osc from "../kit/labs/physics/oscillator.js";
import * as pend from "../kit/labs/physics/pendulum.js";
import * as orbits from "../kit/labs/physics/orbits.js";
import * as waves from "../kit/labs/physics/waves.js";
import * as interference from "../kit/labs/physics/interference.js";
import * as circuits from "../kit/labs/physics/circuits.js";
import * as transients from "../kit/labs/physics/transients.js";
import * as efield from "../kit/labs/physics/efield.js";
import * as lorentzLab from "../kit/labs/physics/lorentz.js";
import * as gas from "../kit/labs/physics/gas.js";
import * as photo from "../kit/labs/physics/photoelectric.js";
import * as decay from "../kit/labs/physics/decay.js";
import * as quantum from "../kit/labs/physics/quantum.js";
import * as rel from "../kit/labs/physics/relativity.js";
import * as optics from "../kit/labs/physics/optics.js";
import { rk4 } from "../kit/labs/lab.js";

const close = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg}: ${a} vs ${b}`);
const rel1 = (a, b, r, msg) => close(a, b, Math.abs(b) * r, msg);

test("the registry: unique ids, the model note, real lessons and files, styles on the page, offline", async () => {
  const lessons = new Set(course.units.flatMap((u) => u.lessons.map((l) => l.id))), ids = new Set();
  assert.ok(course.interactives.length >= 17);
  for (const x of course.interactives) {
    assert.ok(!ids.has(x.id), `duplicate ${x.id}`); ids.add(x.id);
    assert.ok(x.title && x.sub && x.note && x.kind === "Simulation", `${x.id}: title, sub, note and kind`);
    assert.ok(x.lessons.length, `${x.id} names its lessons`);
    for (const l of x.lessons) assert.ok(lessons.has(l), `${x.id}: lesson ${l} doesn't exist`);
    await access(new URL(`../kit/labs/physics/${x.file}`, import.meta.url));
    assert.equal(typeof (await x.load()).mount, "function", `${x.id} exports mount`);
  }
  const page = await readFile(new URL("../scigradify/physics/index.html", import.meta.url), "utf8");
  assert.match(page, /kit\/styles\/labs\.css/, "the Physics course page must load the lab styles");
  const sw = await readFile(new URL("../sw.js", import.meta.url), "utf8");
  assert.match(sw, /"kit\/courses\/physics\/interactives\.js"/, "the course imports its lab list, so it's cached for offline use");
});

test("mechanics: projectile range, best angle with drag, collisions conserve momentum", () => {
  const f = projectile.flight({ v: 20, deg: 45 });
  rel1(f.range, 400 / 9.81, 1e-4, "range v²/g at 45° in a vacuum");
  rel1(f.top, 100 / 9.81, 1e-3, "height v²sin²θ/2g");
  rel1(f.time, (2 * 20 * Math.sin(Math.PI / 4)) / 9.81, 1e-3, "time of flight");
  assert.ok(projectile.bestAngle({ v: 40, deg: 45, rho: 1.225 }) < 44, "drag lowers the best angle");
  assert.ok(projectile.bestAngle({ v: 20, deg: 45, h: 20 }) < 44, "launching from a height lowers the best angle");
  for (const [m1, u1, m2, u2, e] of [[1, 2, 1, 0, 1], [1, 3, 4, -1, 0.5], [2, 1, 3, 0, 0]]) {
    const [v1, v2] = collisions.collide(m1, u1, m2, u2, e);
    close(m1 * v1 + m2 * v2, m1 * u1 + m2 * u2, 1e-12, "momentum");
    close(v2 - v1, e * (u1 - u2), 1e-12, "restitution");
  }
  assert.deepEqual(collisions.collide(1, 2, 1, 0, 1), [0, 2], "equal masses swap velocities");
});

test("oscillations: damping regimes, resonance, the exact pendulum period", () => {
  close(osc.zeta(1, 10, 2 * Math.sqrt(10)), 1, 1e-12, "critical damping b = 2√(km)");
  assert.equal(osc.regime(0.2), "underdamped"); assert.equal(osc.regime(3), "overdamped");
  const w0 = osc.omega0(1, 10), peak = osc.steady(1, 10, 0.2, 1, w0);
  close(peak.phase, Math.PI / 2, 1e-12, "90° lag at ω₀"); rel1(peak.A, 1 / (0.2 * w0), 1e-12, "amplitude F₀/bω₀ at ω₀");
  const tr = osc.trace({ m: 1, k: 10, b: 0, T: 2 * Math.PI / w0, h: 0.001 });
  close(tr.at(-1)[1], 1, 0.02, "an undamped oscillator returns after one period");
  rel1(pend.period(1, 9.81, Math.PI / 2) / pend.smallPeriod(1, 9.81), 1.18034, 1e-4, "T(90°)/T₀ = 1.18034");
  rel1(pend.period(1, 9.81, 0.01), pend.smallPeriod(1, 9.81), 1e-5, "small angles agree with 2π√(L/g)");
  const f = pend.doubleDeriv(1, 1, 1, 1, 9.81); let s = [2, 2, 0, 0]; const E0 = pend.doubleEnergy(1, 1, 1, 1, 9.81, s);
  for (let i = 0; i < 4000; i++) s = rk4(f, s, 0, 0.0005);
  rel1(pend.doubleEnergy(1, 1, 1, 1, 9.81, s), E0, 1e-4, "the double pendulum conserves energy");
});

test("gravity: circular and escape speeds, Kepler's third law, energy kept by the integrator", () => {
  const c = orbits.elements([1, 0], [0, 2 * Math.PI]); close(c.e, 0, 1e-6, "Earth's orbit is circular"); close(c.T, 1, 1e-9, "1 year at 1 AU");
  assert.equal(orbits.elements([1, 0], [0, 2 * Math.PI * Math.SQRT2 * 1.0001]).bound, false, "escape at √2 × circular speed");
  const e = orbits.elements([2, 0], [0, 3]); close(e.T ** 2, e.a ** 3, 1e-9, "T² = a³");
  let s = { x: 1, y: 0, vx: 0, vy: 5 }; const E = (q) => (q.vx ** 2 + q.vy ** 2) / 2 - orbits.GM / Math.hypot(q.x, q.y), E0 = E(s);
  for (let i = 0; i < 20000; i++) s = orbits.verlet(s, 1, 1e-4);
  rel1(E(s), E0, 1e-5, "energy after two orbits");
});

test("waves and optics: harmonics, beats, fringe spacing, Snell, total internal reflection, lenses", () => {
  rel1(waves.harmonic(1, 1, 100, 0.01), 50, 1e-12, "f₁ = √(T/μ)/2L"); rel1(waves.harmonic(3, 1, 100, 0.01), 150, 1e-12, "f₃ = 3f₁"); close(waves.beat(440, 442), 2, 1e-12, "beats");
  close(interference.fringeSpacing(600e-9, 2, 100e-6), 0.012, 1e-12, "λL/d");
  const o = { lambda: 600e-9, a: 20e-6, d: 60e-6, N: 2 };
  close(interference.intensity(Math.asin(600e-9 / 60e-6), o), interference.intensity(0, o) * interference.intensity(Math.asin(600e-9 / 60e-6), { ...o, N: 1 }), 1e-9, "first order sits on the envelope");
  close(interference.intensity(Math.asin((3 * 600e-9) / 60e-6), o), 0, 1e-9, "d = 3a: the third order is missing");
  close(optics.refract(30, 1, 1.5), (Math.asin(1 / 3) * 180) / Math.PI, 1e-9, "Snell's law");
  close(optics.critical(1.52, 1), (Math.asin(1 / 1.52) * 180) / Math.PI, 1e-9, "critical angle"); assert.equal(optics.refract(50, 1.52, 1), null, "total internal reflection beyond it");
  const im = optics.image(20, 10); close(im.v, 20, 1e-9, "u = 2f gives v = 2f"); close(im.m, -1, 1e-9, "same size, inverted");
  assert.ok(optics.image(5, 10).v < 0 && optics.image(5, 10).m > 1, "inside f: virtual and magnified");
  const d = optics.image(20, -10); assert.ok(d.v < 0 && d.m > 0 && d.m < 1, "a diverging lens: virtual, upright, smaller");
});

test("electricity and magnetism: Kirchhoff, time constants, Coulomb, the Lorentz force", () => {
  const ser = circuits.solve(4, [[1, 2, 10], [2, 3, 20], [3, 0, 30]], { E: 12, r: 2 });
  rel1(ser.battery, 12 / (60 + 2), 1e-12, "series: I = E/(ΣR + r)"); rel1(ser.V[1], 12 - 2 * ser.battery, 1e-12, "terminal voltage E − Ir");
  const par = circuits.solve(2, [[1, 0, 10], [1, 0, 20], [1, 0, 20]], { E: 10, r: 1 }); rel1(par.battery, 10 / (5 + 1), 1e-12, "parallel: 1/R = Σ1/R");
  const br = circuits.solve(4, [[1, 2, 10], [1, 3, 20], [2, 0, 30], [3, 0, 60], [2, 3, 50]], { E: 12, r: 2 }); close(br.currents[4], 0, 1e-12, "a balanced bridge passes no current");
  const kcl = circuits.solve(3, [[1, 2, 10], [2, 0, 20], [2, 0, 30]], { E: 12, r: 2 }); close(kcl.currents[0], kcl.currents[1] + kcl.currents[2], 1e-12, "Kirchhoff's current law");
  close(transients.approach(0, 10, 1, 1), 10 * (1 - Math.exp(-1)), 1e-12, "63% after one time constant"); close(transients.tauRC(10e3, 100e-6), 1, 1e-12, "τ = RC"); close(transients.tauRL(10, 2), 0.2, 1e-12, "τ = L/R");
  rel1(efield.field([{ x: 0, y: 0, q: 1e-9 }], 1, 0).E, 8.9875, 1e-4, "E = kq/r²");
  close(efield.field([{ x: -1, y: 0, q: 1e-9 }, { x: 1, y: 0, q: 1e-9 }], 0, 0).E, 0, 1e-6, "the null point between like charges");
  const p = { q: 1.602e-19, m: 1.6726e-27, B: 0.01 };
  rel1(lorentzLab.radius(p.m, 4e5, p.q, p.B), 0.4176, 1e-3, "r = mv/qB");
  let s = { x: 0, y: 0, vx: 4e5, vy: 0 }; const T = lorentzLab.cyclotronPeriod(p.m, p.q, p.B);
  for (let i = 0; i < 1000; i++) s = lorentzLab.boris(s, p, T / 1000);
  close(Math.hypot(s.x, s.y), 0, 0.01, "back where it started after one period"); rel1(Math.hypot(s.vx, s.vy), 4e5, 1e-9, "a magnetic field never changes the speed");
  let sel = { x: 0, y: 0, vx: 4e5, vy: 0 }; for (let i = 0; i < 500; i++) sel = lorentzLab.boris(sel, { ...p, Ey: 4e5 * 0.01 }, T / 500);
  close(sel.y, 0, 1e-9, "E = vB: straight through the velocity selector");
});

test("thermal and modern physics: Maxwell–Boltzmann, photons, decay, quantum levels, relativity", () => {
  let area = 0; for (let v = 0; v < 20; v += 0.001) area += gas.mb2d(v, 1.5) * 0.001; close(area, 1, 1e-3, "the speed distribution is normalised");
  close(gas.idealPressure(100, 2, 0.5), 400, 1e-12, "PA = NkT");
  rel1(photo.photonEV(500), 2.4797, 1e-4, "hc/λ at 500 nm"); close(photo.kmax(700, 2.36), 0, 0, "red light frees no electrons from sodium");
  rel1(photo.kmax(300, 2.36), photo.photonEV(300) - 2.36, 1e-12, "KE = hf − φ"); assert.equal(photo.current(-5, 300, 2.36, 50), 0, "a big enough reverse voltage stops the current");
  close(decay.remaining(1000, 10, 10), 500, 1e-9, "half after one half-life");
  const tmax = Math.log(decay.lambdaOf(4) / decay.lambdaOf(10)) / (decay.lambdaOf(4) - decay.lambdaOf(10)), dd = (t) => decay.daughter(1000, t, 10, 4);
  assert.ok(dd(tmax) > dd(tmax - 0.5) && dd(tmax) > dd(tmax + 0.5), "the daughter peaks where Bateman says");
  const L = 1, n = 400, dx = L / (n + 1), box = quantum.boundStates(new Array(n).fill(0), dx, 3);
  box.E.forEach((E, i) => rel1(E, quantum.boxLevel(i + 1, L), 1e-4, `infinite well level ${i + 1}`));
  for (const E of [0.3, 0.8, 1.5]) { const t = quantum.transmission((x) => (x >= 0 && x <= 0.5 ? 1 : 0), 0.5, E); rel1(t.T, quantum.barrierT(1, 0.5, E), 1e-3, `tunnelling at ${E} eV`); close(t.T + t.R.re ** 2 + t.R.im ** 2, 1, 1e-6, "probability is conserved"); }
  close(rel.gamma(0.6), 1.25, 1e-12, "γ(0.6c) = 1.25"); close(rel.gamma(Math.sqrt(3) / 2), 2, 1e-12, "γ = 2 at 0.866c");
  assert.ok(rel.addVelocities(0.9, 0.9) < 1, "velocities never add past c"); close(rel.addVelocities(1, 0.5), 1, 1e-12, "light is c in every frame");
  const [ct, x] = rel.lorentz(2, 2, 0.6); close(ct * ct - x * x, 0, 1e-12, "the interval of a light-like event is invariant");
});
