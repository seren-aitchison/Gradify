// EngineerGradify's 3D model: a four-stroke petrol engine, cut away. The crankshaft turns, the
// piston and connecting rod follow, the camshaft opens the valves at the right moments and the
// spark plug fires. Notes cover mechanisms, the Otto cycle, materials and dynamics.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  mechanism: { name: "Crank mechanism", c: "#7ee0ff" },
  valvetrain: { name: "Valve train", c: "#ffb36b" },
  combustion: { name: "Combustion", c: "#ff5a4d" },
  structure: { name: "Block & materials", c: "#c0c8d8" },
};

const STRUCTURES = {
  piston: s("mechanism", "Piston", "Slides in the cylinder, sealed by piston rings. Gas pressure pushes it down in the power stroke.",
    ["Force on the piston F = p × A; peak cylinder pressures reach 60–100 bar in a petrol engine.", "Usually aluminium alloy (light, conducts heat), with steel or cast-iron rings.", "Inertial forces grow with the **square of engine speed**, limiting rev limits."],
    [["How do you calculate the force on a piston from cylinder pressure?", "F = pressure × piston area."], ["Why are pistons usually aluminium alloy?", "Low density (smaller inertial forces) and good thermal conductivity."], ["How do the piston's inertial forces scale with engine speed?", "With the square of the speed (ω²)."]],
    ["piston", "cylinder", "force", "pressure", "reciprocating"]),
  conrod: s("mechanism", "Connecting rod", "Links the piston (gudgeon pin, small end) to the crankshaft (big end), turning reciprocating motion into rotation.",
    ["The slider–crank mechanism: piston displacement x ≈ r(1 − cos θ) + (r²/2l) sin²θ.", "The rod is a two-force member, mainly in compression (power stroke) and tension (at top dead centre on the exhaust stroke).", "An I-section gives high bending stiffness for low mass."],
    [["What mechanism converts the piston's linear motion into rotation?", "The slider–crank mechanism (piston, connecting rod, crank)."], ["Why are connecting rods I-section?", "High second moment of area (bending stiffness) for low mass."], ["When is a connecting rod in tension?", "Near top dead centre at the end of the exhaust stroke, when the piston's inertia pulls on it."]],
    ["connecting rod", "con rod", "slider crank", "mechanism", "linkage"]),
  crankshaft: s("mechanism", "Crankshaft", "Turns the piston's push into torque. Counterweights balance the rotating mass.",
    ["Torque T = F × r at the crank throw (varying through the cycle); power P = T × ω.", "A single cylinder gives very uneven torque, smoothed by the **flywheel**.", "Forged steel, with hardened journals running in plain bearings on an oil film."],
    [["How is engine power related to torque?", "P = T × ω (torque × angular velocity in rad/s)."], ["Why do crankshafts have counterweights?", "To balance the rotating mass and reduce vibration and bearing loads."], ["What does the crank throw radius equal?", "Half the stroke."]],
    ["crankshaft", "torque", "power", "rotation", "balance"]),
  flywheel: s("mechanism", "Flywheel", "A heavy disc on the crankshaft that stores kinetic energy, smoothing out the speed between power strokes.",
    ["Stored energy E = ½Iω².", "Coefficient of speed fluctuation = (ωmax − ωmin)/ωmean: a bigger I means a smaller fluctuation.", "Moment of inertia of a solid disc: I = ½mr²; a rim-heavy flywheel stores more per kg."],
    [["What is the kinetic energy stored in a flywheel?", "E = ½Iω²."], ["What is the moment of inertia of a solid disc?", "I = ½mr²."], ["Why put more of a flywheel's mass at its rim?", "Moment of inertia rises with r², so it stores more energy for the same mass."]],
    ["flywheel", "inertia", "kinetic energy", "rotational"]),
  camshaft: s("valvetrain", "Camshaft", "Its lobes open the valves at precise moments. It turns at **half crankshaft speed**, since each valve opens once every two revolutions.",
    ["Driven by a timing belt or chain from the crankshaft at a 2:1 ratio.", "Cam profile sets lift and duration; overlap (both valves open) helps scavenging at high rpm.", "Variable valve timing changes cam phasing with speed and load."],
    [["Why does the camshaft turn at half crankshaft speed?", "Each valve opens once per four-stroke cycle, which takes two crank revolutions."], ["What is valve overlap?", "A period around top dead centre when inlet and exhaust valves are both open."], ["What drives the camshaft?", "A timing belt or chain (or gears) from the crankshaft."]],
    ["camshaft", "cam", "timing", "valve timing", "belt"]),
  inletValve: s("valvetrain", "Inlet valve", "Opens to let the air–fuel mixture in during the induction stroke. Larger than the exhaust valve, to fill the cylinder well.",
    ["Volumetric efficiency: the actual mass of air drawn in compared with the swept volume at atmospheric density.", "Opens slightly before top dead centre and closes after bottom dead centre to use the gas's momentum.", "Valve springs must close it fast enough to avoid valve float at high rpm."],
    [["Why is the inlet valve larger than the exhaust valve?", "To maximise filling (volumetric efficiency) with a small pressure drop."], ["What is volumetric efficiency?", "The ratio of air actually drawn in to the swept volume at ambient density."], ["What is valve float?", "At high rpm the spring can't close the valve fast enough, so it doesn't follow the cam."]],
    ["inlet valve", "intake", "induction", "volumetric efficiency"]),
  exhaustValve: s("valvetrain", "Exhaust valve", "Opens near the end of the power stroke to let burned gases out. It runs very hot (up to ~800 °C).",
    ["Often made of heat-resistant alloys; some are sodium-filled to carry heat away.", "Opening before bottom dead centre (blowdown) reduces pumping work on the exhaust stroke.", "Exhaust gas energy can drive a turbocharger."],
    [["Why do exhaust valves need special materials?", "They run at very high temperatures (up to ~800 °C) in corrosive gases."], ["Why does the exhaust valve open before bottom dead centre?", "Blowdown: most gas escapes under its own pressure, reducing pumping work."], ["How can exhaust energy be recovered?", "With a turbocharger driven by the exhaust gas."]],
    ["exhaust valve", "exhaust", "turbo"]),
  sparkPlug: s("combustion", "Spark plug", "Fires a spark just before top dead centre to ignite the compressed mixture.",
    ["Ignition timing advances with engine speed, so peak pressure occurs just after TDC.", "Knock (detonation): the end gas self-ignites, limiting compression ratio; higher octane fuel resists it.", "Diesel engines have no spark: compression heats the air enough to ignite the injected fuel."],
    [["Why is ignition advanced at higher engine speed?", "So combustion (which takes a roughly fixed time) completes with peak pressure just after TDC."], ["What is engine knock?", "Spontaneous ignition of the unburned end gas, causing pressure spikes."], ["How do diesel engines ignite their fuel?", "Compression ignition: high compression heats the air above the fuel's ignition temperature."]],
    ["spark plug", "ignition", "knock", "octane", "diesel"]),
  chamber: s("combustion", "Combustion chamber", "Where the four strokes happen: induction, compression, power, exhaust. The ideal model is the **Otto cycle**.",
    ["Otto efficiency η = 1 − 1/r^(γ−1). With r = 10 and γ = 1.4, η ≈ 60% (real engines manage about 30–40%).", "Compression ratio r = (swept + clearance volume) / clearance volume.", "Swept volume = πd²/4 × stroke × number of cylinders."],
    [["Name the four strokes in order.", "Induction, compression, power (expansion), exhaust."], ["What is the ideal Otto cycle efficiency for r = 10, γ = 1.4?", "1 − 1/10^0.4 ≈ 0.60 (60%)."], ["Define compression ratio.", "(Swept volume + clearance volume) ÷ clearance volume."]],
    ["combustion", "otto cycle", "four-stroke", "compression ratio", "efficiency", "thermodynamic"]),
  block: s("structure", "Cylinder block", "The engine's structure: it holds the cylinders, carries the crankshaft bearings and contains coolant passages.",
    ["Cast iron (strong, damping, cheap) or aluminium alloy (light, needs cylinder liners).", "Cooling removes about a third of the fuel's energy; the rest goes to work and exhaust.", "Thermal stresses: σ = EαΔT if expansion is fully constrained."],
    [["Why might a block be cast iron rather than aluminium?", "Higher strength and wear resistance, good vibration damping, lower cost (but heavier)."], ["What is the thermal stress in a fully constrained part?", "σ = E × α × ΔT."], ["Roughly where does the fuel's energy go in a petrol engine?", "About a third each to useful work, cooling and exhaust."]],
    ["cylinder block", "material", "cast iron", "aluminium", "cooling", "thermal stress"]),
};

const NOTES = {
  mechanism: { title: "Mechanisms and dynamics", lead: "The crank mechanism turns straight-line force into torque. Kinematics describes how the parts move; dynamics explains the forces that result.",
    sections: [
      ["Slider–crank kinematics", "- Stroke = 2r. Piston position x(θ) ≈ r(1 − cos θ) + (r²/2l)sin²θ, where l is the rod length.", "- Piston velocity peaks before mid-stroke; acceleration is highest at TDC.", "- Mean piston speed = 2 × stroke × rpm / 60 (typically under 25 m/s)."],
      ["Torque and power", "- Instantaneous torque T(θ) = F × r × (sin θ + ...) varies through the cycle; it's zero at TDC and BDC.", "- P = Tω, ω = 2πN/60. Brake power is measured at the crankshaft on a dynamometer.", "- Brake mean effective pressure (BMEP) compares engines of different size: BMEP = 4πT / V_swept (four-stroke)."],
      ["Balancing", "- Rotating masses are balanced with counterweights.", "- Reciprocating masses give primary (at crank speed) and secondary (twice crank speed) forces; an inline-four is primary-balanced but has a secondary imbalance (balance shafts).", "> Inline-six engines are inherently balanced for primary and secondary forces and couples."],
      ["Flywheels and rotational energy", "- E = ½Iω²; ΔE = I ω_mean² × Cs, where Cs is the coefficient of speed fluctuation.", "- Parallel axis theorem: I = I_G + md².", "- Angular momentum L = Iω; torque = rate of change of angular momentum."],
    ] },
  valvetrain: { title: "The valve train and gas exchange", lead: "Getting air in and exhaust out decides how much fuel an engine can burn. The camshaft, valves and their timing control this.",
    sections: [
      ["Valve timing", "- Typical: inlet opens ~10° before TDC, closes ~40° after BDC; exhaust opens ~45° before BDC, closes ~10° after TDC.", "- Overlap scavenges exhaust using the momentum of the gases (helps at high rpm, hurts idle).", "- Variable valve timing and lift optimise across the speed range."],
      ["Cams and followers", "- Cam profiles: base circle, flank, nose. Lift, duration and acceleration must be controlled to avoid noise and float.", "- Followers: flat, roller, rocker arms; hydraulic lifters take up clearance.", "- Gear and belt drives: velocity ratio = driven teeth / driver teeth (2:1 for the cam)."],
      ["Breathing", "- Volumetric efficiency of 80–90% for naturally aspirated engines; over 100% with forced induction.", "- Turbochargers use exhaust energy; superchargers are driven from the crank.", "- Intercoolers cool the compressed air, increasing its density."],
    ] },
  combustion: { title: "Thermodynamics of the engine", lead: "An engine is a heat engine: it takes in heat at high temperature, rejects some at low temperature, and turns the difference into work. The ideal cycle sets the upper limit.",
    sections: [
      ["The Otto cycle", "1→2 isentropic compression; 2→3 heat added at constant volume (combustion); 3→4 isentropic expansion (power); 4→1 heat rejected at constant volume.", "- η_Otto = 1 − 1/r^(γ−1). Efficiency rises with compression ratio, limited by knock.", "- Isentropic relations: T₂/T₁ = r^(γ−1); p₂/p₁ = r^γ.", "> Carnot efficiency 1 − T_c/T_h is the absolute ceiling for any heat engine between two temperatures."],
      ["Real engines", "- Losses: heat transfer to the walls, friction, pumping (throttling at part load), incomplete combustion, finite combustion time.", "- Indicated work = area of the p–V diagram; mechanical efficiency = brake power / indicated power.", "- Brake thermal efficiency: petrol ~30–38%, diesel ~40–45%, large marine diesels over 50%."],
      ["Fuels and emissions", "- Stoichiometric air–fuel ratio for petrol ≈ 14.7:1 by mass.", "- Three-way catalytic converter: reduces NOx, oxidises CO and unburned hydrocarbons; needs a stoichiometric mixture.", "- Diesels: particulates (DPF) and NOx (SCR with urea/AdBlue)."],
    ] },
  structure: { title: "Materials and structural design", lead: "Every engine part is a compromise between strength, stiffness, mass, temperature resistance and cost. Material selection and stress analysis make it work.",
    sections: [
      ["Stress and strain", "- σ = F/A; ε = ΔL/L; E = σ/ε in the elastic region.", "- Factor of safety = failure stress / working stress.", "- Bending: σ = My/I. Torsion: τ = Tr/J."],
      ["Fatigue", "- Engine parts see millions of load cycles: design to the fatigue (endurance) limit, not just the static strength.", "- S–N curves; stress concentrations at fillets and holes (Kt) start cracks.", "- Shot peening and surface hardening put the surface in compression, delaying fatigue cracks."],
      ["Material selection", "- Ashby charts: strength or stiffness against density, with performance indices (e.g. E^½/ρ for a light, stiff beam).", "- Pistons: Al–Si alloys. Crankshafts: forged steel. Blocks: grey cast iron or Al alloy. Exhaust valves: Ni-based alloys.", "! Thermal expansion mismatch between aluminium and steel parts must be designed in: clearances are set at operating temperature."],
    ] },
};

export default {
  title: "The engine in 3D", kicker: "3D engineering",
  intro: { title: "Explore a four-stroke engine", text: "A single-cylinder petrol engine, cut away and running: the crank turns, the piston follows, the cam opens the valves and the spark fires. Click any part for its engineering, and read the full notes below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Design note",
  quiz: "find the part",
  motion: "Engine running",
  camera: { pos: [0.75, 0.55, 0.95], target: [0, 0.2, 0], min: 0.03, max: 3.5 },
  views: { Front: [[0, 0.25, 1.15], [0, 0.22, 0]], Side: [[1.15, 0.25, 0.05], [0, 0.22, 0]], "Valves": [[0.3, 0.55, 0.45], [0, 0.42, 0]], "Crank": [[0.4, 0.0, 0.55], [0, -0.02, 0]] },
  sliders: [{ key: "speed", label: "Speed", value: 35 }],
  platform: { r: 0.4, y: -0.2 },
  explode: false,
  bg: ["#1a2836", "#070c12"],
  build(k) {
    const { THREE, V, mat, glow, limb, tube, box, add, decor } = k;
    const steel = mat("#c7ced8", { detail: "none", metalness: 0.9, roughness: 0.28, clearcoat: 0.4 });
    const alu = mat("#dfe5ec", { detail: "none", metalness: 0.75, roughness: 0.35 });
    const R = 0.06, ROD = 0.18, BORE = 0.085;   // crank radius (stroke 0.12), rod length, bore radius
    // the block: a glass cylinder so the piston shows, with a cutaway head
    const glass = mat("#9fd8ff", { detail: "none", transmission: 0.9, thickness: 0.01, roughness: 0.05, transparent: true, opacity: 0.35, side: THREE.DoubleSide, metalness: 0 });
    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(BORE + 0.006, BORE + 0.006, 0.2, 64, 1, true), glass); cyl.position.y = 0.25; add("chamber", cyl);
    const blockMat = mat("#5f6b7a", { detail: "bone", repeat: 3, bump: 0.3, metalness: 0.6, roughness: 0.5, transparent: true, opacity: 0.4, depthWrite: false });   // see-through, so the moving parts show
    for (const sd of [-1, 1]) { const w = box(0.05, 0.2, 0.2, blockMat, 0.01); w.position.set(sd * (BORE + 0.035), 0.25, 0); add("block", w); }
    const sump = box(0.3, 0.16, 0.2, blockMat, 0.02); sump.position.y = -0.03; add("block", sump);
    const head = box(0.25, 0.05, 0.2, blockMat, 0.01); head.position.y = 0.38; add("block", head);
    // crankshaft with counterweights
    const crank = new THREE.Group(); crank.position.set(0, 0, 0);
    crank.add(limb(V(-0.17, 0, 0), V(0.17, 0, 0), 0.018, steel, false));
    for (const x of [-0.035, 0.035]) { const web = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.018, 48, 1, false, Math.PI * 0.6, Math.PI * 0.8), steel); web.rotation.z = Math.PI / 2; web.position.x = x; crank.add(web); const arm = box(0.018, R + 0.02, 0.04, steel, 0.006); arm.position.set(x, R / 2, 0); crank.add(arm); }
    crank.add(limb(V(-0.045, R, 0), V(0.045, R, 0), 0.016, steel, false));
    add("crankshaft", crank);
    const fly = new THREE.Group(); fly.position.x = 0.19;
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.025, 64), steel); disc.rotation.z = Math.PI / 2; fly.add(disc);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.012, 16, 96), steel); rim.rotation.y = Math.PI / 2; fly.add(rim);
    for (let i = 0; i < 6; i++) { const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.03, 24), mat("#20262e", { detail: "none" })); hole.rotation.z = Math.PI / 2; const a = (i / 6) * Math.PI * 2; hole.position.set(0.001, Math.cos(a) * 0.07, Math.sin(a) * 0.07); fly.add(hole); }
    add("flywheel", fly);
    // piston with rings, and the connecting rod
    const piston = new THREE.Group();
    piston.add(new THREE.Mesh(new THREE.CylinderGeometry(BORE, BORE, 0.07, 64), alu));
    for (const y of [0.025, 0.012, -0.001]) { const ring = new THREE.Mesh(new THREE.TorusGeometry(BORE, 0.0025, 8, 64), mat("#7a828c", { detail: "none", metalness: 0.9, roughness: 0.3 })); ring.rotation.x = Math.PI / 2; ring.position.y = y; piston.add(ring); }
    add("piston", piston);
    const rod = new THREE.Group();
    rod.add(box(0.02, ROD, 0.012, steel, 0.004)); for (const y of [ROD / 2, -ROD / 2]) { const eye = new THREE.Mesh(new THREE.TorusGeometry(y > 0 ? 0.014 : 0.022, 0.007, 12, 32), steel); eye.rotation.y = Math.PI / 2; eye.position.y = y; rod.add(eye); }
    add("conrod", rod);
    // camshaft (half speed), driven by a belt; valves with springs
    const cam = new THREE.Group(); cam.position.set(0, 0.46, 0);
    cam.add(limb(V(-0.14, 0, 0), V(0.17, 0, 0), 0.01, steel, false));
    const lobeShape = new THREE.Shape(); for (let i = 0; i <= 64; i++) { const a = (i / 64) * Math.PI * 2, r = 0.022 + 0.014 * Math.max(0, Math.cos(a)) ** 3; (i ? lobeShape.lineTo : lobeShape.moveTo).call(lobeShape, Math.cos(a) * r, Math.sin(a) * r); }
    const lobes = [];
    for (const [x, ph] of [[-0.035, 0], [0.035, Math.PI * 0.75]]) { const l = new THREE.Mesh(new THREE.ExtrudeGeometry(lobeShape, { depth: 0.016, bevelEnabled: false }), steel); l.rotation.y = Math.PI / 2; l.position.x = x - 0.008; const holder = new THREE.Group(); holder.rotation.x = ph; holder.add(l); cam.add(holder); lobes.push(holder); }
    add("camshaft", cam);
    const pulleyA = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 32), steel), pulleyB = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.02, 48), steel);
    pulleyA.rotation.z = pulleyB.rotation.z = Math.PI / 2; pulleyA.position.set(-0.15, 0, 0); pulleyB.position.set(-0.15, 0.46, 0); decor(pulleyA, "valvetrain"); decor(pulleyB, "valvetrain");
    add("camshaft", tube([V(-0.15, 0.0, 0.032), V(-0.15, 0.46, 0.062), V(-0.15, 0.52, 0), V(-0.15, 0.46, -0.062), V(-0.15, 0.0, -0.032), V(-0.15, -0.035, 0)], 0.005, mat("#2a2f36", { detail: "fibre", repeat: 1 }), 96, true));
    const valves = [];
    for (const [id, x] of [["inletValve", -0.035], ["exhaustValve", 0.035]]) {
      const v = new THREE.Group(); v.position.set(x, 0.33, 0);
      const head = new THREE.Mesh(new THREE.CylinderGeometry(id === "inletValve" ? 0.026 : 0.022, 0.012, 0.008, 32), id === "exhaustValve" ? mat("#c9a27a", { detail: "none", metalness: 0.8, roughness: 0.3 }) : steel); v.add(head);
      v.add(limb(V(0, 0, 0), V(0, 0.105, 0), 0.004, steel, false));
      const spring = []; for (let i = 0; i <= 120; i++) { const a = i * 0.45; spring.push(V(Math.cos(a) * 0.012, 0.06 + i * 0.0004, Math.sin(a) * 0.012)); }
      v.add(tube(spring, 0.0018, mat("#ffb36b", { detail: "none", metalness: 0.7, roughness: 0.3 }), 300));
      add(id, v); valves.push(v);
    }
    const plug = new THREE.Group(); plug.position.set(0, 0.4, 0.045);
    plug.add(limb(V(0, -0.05, 0), V(0, 0.06, 0), 0.007, mat("#f4f1e8", { detail: "none", roughness: 0.2, clearcoat: 1 }), false));
    const hex = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.015, 6), steel); hex.position.y = 0.0; plug.add(hex);
    add("sparkPlug", plug);
    const spark = new THREE.Mesh(new THREE.SphereGeometry(0.03, 24, 16), glow("#7ee0ff", 0)); spark.position.set(0, 0.34, 0.03); decor(spark, "combustion");
    const fire = new THREE.Mesh(new THREE.CylinderGeometry(BORE * 0.98, BORE * 0.98, 0.04, 48), glow("#ff7a2a", 0)); decor(fire, "combustion");
    const fireLight = new THREE.PointLight("#ff7a2a", 0, 0.8); fireLight.position.set(0, 0.32, 0); decor(fireLight);
    // gas flows: fresh charge in (inlet) and exhaust out
    const inFlow = k.flow([[V(-0.2, 0.36, 0), V(-0.08, 0.36, 0), V(-0.035, 0.31, 0), V(-0.02, 0.24, 0)]], "#7ee0ff", 24, 0.8, "valvetrain", 0.012);
    const exFlow = k.flow([[V(0.02, 0.24, 0), V(0.035, 0.31, 0), V(0.08, 0.36, 0), V(0.22, 0.36, 0)]], "#ff9f40", 24, 0.8, "valvetrain", 0.012);
    let speed = 0.35, angle = 0.4;
    k.slider("speed", (v) => { speed = v; });
    const set = (th) => {
      crank.rotation.x = th; fly.rotation.x = th;
      const pin = V(0, Math.cos(th) * R, Math.sin(th) * R), py = pin.y + Math.sqrt(ROD * ROD - pin.z * pin.z);
      piston.position.set(0, py + 0.035, 0);
      rod.position.set(0, (py + pin.y) / 2, pin.z / 2); rod.rotation.x = Math.atan2(pin.z, py - pin.y);
      const camA = th / 2; cam.rotation.x = -camA;
      // the four strokes, each half a turn: induction, compression, power, exhaust
      const cyc = ((th % (Math.PI * 4)) + Math.PI * 4) % (Math.PI * 4), stroke = Math.floor(cyc / Math.PI);
      const lift = (open) => (open ? Math.sin((cyc % Math.PI)) * 0.012 : 0);
      valves[0].position.y = 0.33 - lift(stroke === 0); valves[1].position.y = 0.33 - lift(stroke === 3);
      inFlow.visible = stroke === 0; exFlow.visible = stroke === 3;
      const burn = stroke === 2 ? Math.max(0, 1 - (cyc % Math.PI) / Math.PI * 1.4) : 0;
      spark.material.opacity = stroke === 2 && cyc % Math.PI < 0.35 ? 1 : 0;
      fire.material.opacity = burn * 0.75; fire.position.y = py + 0.08; fireLight.intensity = burn * 3;
    };
    set(angle);
    k.tick((t, dt, motion) => { if (!motion) return; angle += dt * (1 + speed * 14); set(angle); });
  },
};
