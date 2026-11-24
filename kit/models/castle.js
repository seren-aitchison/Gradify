// HistoryGradify's 3D model: a Norman castle. The site (motte, ditch and bailey) with the timber castle
// the Normans threw up after 1066, and the stone castle that replaced it (turn on "Stone castle" to see it).
// For GCSE Norman England: how castles helped William hold the country, and how they changed.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  site: { name: "The site", c: "#8fbf5a" },
  timber: { name: "Timber castle, 1066–1080s", c: "#d39a5b" },
  stone: { name: "Stone castle, 1070s on", c: "#c9c3b4", off: true },
};

const STRUCTURES = {
  motte: s("site", "Motte", "A steep mound of earth, often made from the soil dug out of the ditch around it. The lord's tower stood on top: the last place to hold out in an attack.",
    ["Mottes were built quickly with **forced English labour**: a motte-and-bailey castle could go up in a few weeks.", "The Bayeux Tapestry shows the Normans building a motte at **Hastings** in 1066.", "Some mottes are over 20 m high, but many were much smaller."],
    [["What was a motte?", "A large earth mound with a tower on top, the strongest point of the castle."], ["Where did the earth for the motte usually come from?", "The ditch dug around it."], ["Who did the hard labour of building Norman castles?", "Local English people, forced to work for the Normans."]],
    ["motte", "mound", "motte and bailey", "earthwork"]),
  ditch: s("site", "Ditch (moat)", "A deep ditch round the motte and the bailey, sometimes filled with water. It kept attackers and siege engines away from the defences.",
    ["Most Norman ditches were **dry**; water-filled moats were more common later.", "Digging the ditch and piling up the motte was one job: the spoil went straight onto the mound.", "Stakes were sometimes set in the ditch to slow attackers down."],
    [["Why did castles have a ditch?", "To keep attackers, ladders and siege engines away from the walls."], ["Were Norman castle ditches usually filled with water?", "No, most were dry."], ["What happened to the earth dug out of the ditch?", "It was piled up to make the motte and the bank under the palisade."]],
    ["ditch", "moat"]),
  bailey: s("site", "Bailey", "The enclosed courtyard below the motte, where the garrison lived and worked: the hall, stables, kitchens, stores, a chapel and a smithy.",
    ["The bailey held the soldiers, horses and supplies that let a small **garrison** control the area around it.", "In an emergency, people retreated from the bailey up to the motte.", "Some castles had two baileys."],
    [["What was the bailey?", "The enclosed courtyard of a castle, below the motte, with the hall, stables and stores."], ["Where did defenders retreat to if the bailey fell?", "The tower on the motte."], ["Name three buildings you would find in a bailey.", "Any three of: the hall, stables, kitchens, stores, a chapel, a smithy."]],
    ["bailey", "courtyard", "garrison"]),
  hall: s("site", "Hall and buildings", "The great hall, where the lord ate, did business and held court, with the chapel and stables beside it. In the timber castle these were wooden; later many were rebuilt in stone.",
    ["The hall was the centre of the lord's power: tenants paid rents and settled disputes there.", "A castle was a home and an office as well as a fort.", "Knights owed **castle-guard**: a duty to serve in the garrison for part of the year."],
    [["What happened in a castle's great hall?", "The lord ate, held court, collected rents and did business there."], ["What was castle-guard?", "A knight's duty to serve in a castle's garrison for a set time each year."], ["Why was a castle more than just a fort?", "It was also the lord's home and the centre of local government: rents, courts and business."]],
    ["hall", "chapel", "stables", "castle-guard"]),
  tower: s("timber", "Timber tower", "A wooden tower on top of the motte: a lookout and a last refuge. Wood was quick to build with but could rot or be set on fire.",
    ["Timber was used first because it was **fast**: William needed control straight after 1066.", "Fire was the great danger: attackers tried to burn timber castles.", "Many timber towers were replaced in stone from the 1070s on."],
    [["Why were the first Norman castles made of wood?", "Wood was quick to build with, and William needed control fast."], ["What was the main weakness of a timber castle?", "It could rot or be set on fire."], ["What was the tower on the motte used for?", "A lookout, and the last refuge if the bailey fell."]],
    ["tower", "timber", "wooden tower"]),
  palisade: s("timber", "Palisade", "A fence of sharpened wooden stakes round the bailey and the top of the motte, with a walkway behind it for defenders.",
    ["Palisades were made of split tree trunks set deep in an earth bank.", "Defenders stood on a fighting platform to throw spears and shoot arrows.", "Stone **curtain walls** later replaced them."],
    [["What was a palisade?", "A fence of wooden stakes round the bailey and motte."], ["What replaced palisades in stone castles?", "Curtain walls."], ["Where did defenders stand to fight from a palisade?", "On a walkway (fighting platform) behind it."]],
    ["palisade", "stakes", "fence"]),
  bridge: s("timber", "Flying bridge", "A steep wooden bridge from the bailey up to the motte. It could be cut down or pulled up to cut the motte off.",
    ["The Bayeux Tapestry shows bridges like this at Breton castles such as Dinan.", "Cutting the bridge turned the motte into an island fortress.", "A steep, narrow bridge was easy to defend: attackers could only climb it a few at a time."],
    [["How did people get from the bailey up to the motte?", "Across a steep wooden flying bridge."], ["Why could the flying bridge be destroyed?", "To cut the motte off from attackers who had taken the bailey."], ["Why was a flying bridge easy to defend?", "It was steep and narrow, so only a few attackers could climb it at once, under fire from the motte."]],
    ["bridge", "flying bridge"]),
  gate: s("timber", "Gate", "The timber gate into the bailey, over the ditch. The gate was always the weak point, so it was guarded by towers.",
    ["A drawbridge or removable bridge crossed the ditch.", "Gates were later rebuilt as stone **gatehouses** with portcullises.", "The ditch was crossed by a narrow bridge, so only a few attackers could reach the gate at once."],
    [["Why was the gate a castle's weak point?", "It was the way in, so attackers concentrated on it."], ["What replaced timber gates in later castles?", "Stone gatehouses with portcullises."], ["How did people cross the ditch to the gate?", "Over a narrow bridge or drawbridge, which could be removed or raised."]],
    ["gate", "drawbridge", "entrance"]),
  keep: s("stone", "Stone keep", "A great stone tower, the strongest building in the castle and a symbol of Norman power. The entrance was on the first floor, reached by stairs that could be defended.",
    ["The **White Tower** in London was begun in the 1070s; its walls are up to about 4.6 m thick at the base.", "Colchester's keep, begun about the same time, covers an even bigger area.", "Keeps had storerooms below, a hall above and a well inside, to survive a siege."],
    [["Why was a keep's door on the first floor?", "So attackers couldn't batter it down from the ground; the stairs could be defended."], ["Name a Norman stone keep begun in the 1070s.", "The White Tower (Tower of London) or Colchester."], ["How did a keep survive a long siege?", "Thick walls, stores in the basement and its own well."]],
    ["keep", "stone keep", "white tower", "great tower", "donjon"]),
  curtain: s("stone", "Curtain wall", "A high stone wall round the bailey, with towers sticking out so archers could shoot along the face of the wall.",
    ["The top had **battlements**: gaps (crenels) to shoot through and solid parts (merlons) to hide behind.", "Towers that project from the wall let defenders hit attackers trying to climb or mine it.", "Stone walls couldn't be burnt, but they took years and great expense to build."],
    [["What was a curtain wall?", "A stone wall around the bailey, replacing the wooden palisade."], ["Why did towers stick out from the curtain wall?", "So archers could shoot along the wall at attackers."], ["What were battlements?", "The tops of the walls, with gaps to shoot through and solid parts to shelter behind."]],
    ["curtain wall", "battlements", "crenellation", "wall"]),
  shell: s("stone", "Shell keep", "A ring of stone wall built round the top of the motte, replacing the timber palisade and tower. Buildings stood against the inside of the wall.",
    ["A motte of piled earth often couldn't take the weight of a great stone tower, so a ring wall was built instead.", "Windsor's Round Tower began as a shell keep on a Norman motte.", "Most shell keeps were built in the 12th century, replacing timber defences on mottes."],
    [["What was a shell keep?", "A ring of stone wall around the top of a motte."], ["Why build a shell keep rather than a stone tower on a motte?", "The piled earth often couldn't carry the weight of a great tower."], ["Where were the buildings in a shell keep?", "Against the inside of the ring wall, round an open courtyard."]],
    ["shell keep", "ring wall"]),
  gatehouse: s("stone", "Gatehouse", "A stone gatehouse with towers on each side, a portcullis (an iron-shod grille) and heavy doors.",
    ["Attackers caught between the portcullis and the doors could be shot at from above.", "Over time gatehouses grew into some of the strongest parts of a castle.", "**Murder holes** in the roof of the gate passage let defenders drop missiles on attackers."],
    [["What was a portcullis?", "A heavy grille that dropped down to block the gate."], ["Why did gatehouses get stronger over time?", "The gate was the weakest point, so it needed the most defence."], ["What were murder holes?", "Openings in the roof of a gate passage for dropping missiles on attackers below."]],
    ["gatehouse", "portcullis"]),
};

const NOTES = {
  site: { title: "Why the Normans built castles", lead: "In 1066 a few thousand Normans had to control about two million English people. Castles were how they did it: a strong base for a small garrison, built where it could watch over a town, a river crossing or a road.",
    sections: [
      ["Control after the Conquest", "William landed at **Pevensey** in September 1066 and built a castle inside the old Roman fort there, then another at Hastings before the battle.", "- By about 1100 the Normans had built around **500 castles**.", "- They were put in towns, at river crossings and on roads, so the garrison could ride out and control the area.", "- In towns, English houses were pulled down to make room: Domesday Book records **166 houses** destroyed for the castle at Lincoln.", "> Castles were a sign that the Normans were here to stay, and a reminder to the English that they had been conquered."],
      ["The motte-and-bailey design", "- **Motte**: an earth mound with a tower on top.", "- **Bailey**: a courtyard below it with the hall, stables and stores.", "- **Ditch** and **palisade** round both.", "The design could be built fast with local labour and materials, which was exactly what William needed."],
      ["Castles and rebellion", "After rebellions in the north, William built two castles at **York** (1068 and 1069). During the Harrying of the North (1069–70) castles gave his army bases to work from.", "> Exam tip: link castles to *control*: military (garrisons), political (the lord's power) and symbolic (Norman dominance)."],
    ] },
  timber: { title: "The timber castle", lead: "The first Norman castles were made of earth and wood. They were quick and cheap, but they burned and rotted.",
    sections: [
      ["How it worked", "- The tower on the motte was the lookout and last refuge.", "- The palisade kept attackers out of the bailey; defenders fought from a walkway behind it.", "- The flying bridge could be cut so the motte held out even if the bailey fell."],
      ["Strengths", "- **Speed**: weeks rather than years.", "- Built with local timber and forced English labour.", "- Strong enough against rebels without siege engines."],
      ["Weaknesses", "- Fire: attackers tried to burn the palisade and tower.", "- Wood rots, so it needed constant repair.", "- Not a lasting statement of power."],
    ] },
  stone: { title: "The stone castle", lead: "From the 1070s the most important castles were rebuilt in stone. Stone was slow and expensive but could not be burnt, and it showed that Norman rule was permanent.",
    sections: [
      ["Great towers", "The **White Tower** (Tower of London) and **Colchester** keeps were begun in the 1070s.", "- Entrance on the first floor, up defended stairs.", "- Thick walls, a well, stores in the basement.", "- A great hall and chapel inside: a palace as well as a fortress."],
      ["Walls and gatehouses", "- **Curtain walls** replaced the palisade, with projecting towers for archers.", "- **Gatehouses** with portcullises protected the weakest point.", "- On mottes, **shell keeps** (stone ring walls) replaced the timber tower."],
      ["Change over time", "Castles developed from earth and timber (1060s–80s) to stone keeps (from the 1070s) and, later, to strong walls and gatehouses.", "> Exam tip: when explaining change, say *why*: stone resisted fire, lasted, and showed power; but it cost more and took years."],
    ] },
};

export default {
  title: "A Norman castle in 3D", kicker: "3D history",
  intro: { title: "Explore a Norman castle", text: "A motte-and-bailey castle as the Normans built it after 1066, on its motte, bailey and ditch. Turn on Stone castle to see how it was rebuilt in stone. Click any part to learn what it was for." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Exam tip",
  quiz: "find the part",
  motion: "Flags flying",
  trueColour: true,
  camera: { pos: [1.1, 1.05, 1.9], target: [0.02, 0.12, 0], min: 0.25, max: 4.5 },
  views: { Overview: [[1.1, 1.05, 1.9], [0.02, 0.12, 0]], "From above": [[0.05, 2.4, 0.15], [0.02, 0, 0]], "Motte": [[-0.9, 0.55, 0.75], [-0.45, 0.3, 0]], "Gate": [[1.55, 0.25, 0.3], [0.7, 0.08, 0]] },
  platform: { r: 0.55 },
  shadow: { left: -1.5, right: 1.5, top: 1.4, bottom: -1.4, near: 0.5, far: 9 },
  explode: false,
  build(k) {
    const { THREE, V, mat, text, add, decor, box, lathe, tube } = k;
    const at = (o, x, y, z) => { o.position.set(x, y, z); return o; };
    const grass = mat("#5f8a3a", { detail: "tissue", repeat: 6, bump: 0.25, roughness: 0.95, clearcoat: 0 });
    const earth = mat("#7a6a4a", { detail: "tissue", repeat: 6, bump: 0.3, roughness: 0.95, clearcoat: 0 });
    const wood = mat("#8a5a32", { detail: "fibre", repeat: 2, bump: 0.5, roughness: 0.8, clearcoat: 0 });
    const darkWood = mat("#5e3b1f", { detail: "fibre", repeat: 2, bump: 0.5, roughness: 0.85, clearcoat: 0 });
    const thatch = mat("#a88b52", { detail: "fibre", repeat: 4, bump: 0.8, roughness: 0.95, clearcoat: 0 });
    const stone = mat("#bdb6a6", { detail: "bone", repeat: 4, bump: 0.7, roughness: 0.9, clearcoat: 0 });
    const stoneDark = mat("#9c9586", { detail: "bone", repeat: 4, bump: 0.7, roughness: 0.9, clearcoat: 0 });
    const slit = mat("#1d1a16", { detail: "none", roughness: 1, clearcoat: 0 });
    const water = mat("#3d5a5c", { detail: "none", roughness: 0.25, clearcoat: 0.8, metalness: 0 });

    // the bailey is an oval east of the motte; the gate faces east
    const B = { x: 0.32, z: 0.02, rx: 0.5, rz: 0.4 }, M = { x: -0.46, z: 0, r0: 0.3, r1: 0.12, h: 0.3 };
    const oval = (t, f = 1) => V(B.x + Math.cos(t) * B.rx * f, 0, B.z + Math.sin(t) * B.rz * f);

    // ground and ditch: the ditch rings the motte and the bailey; inside it, ground level
    decor(at(new THREE.Mesh(new THREE.CircleGeometry(1.15, 96), grass), 0, -0.002, 0)).rotation.x = -Math.PI / 2;
    const ditch = new THREE.Group();
    const ring = (pts) => { const t = tube(pts, 0.05, water, 160, true, 10); t.scale.y = 0.12; return t; };
    ditch.add(ring(Array.from({ length: 40 }, (_, i) => { const a = (i / 40) * Math.PI * 2; return V(M.x + Math.cos(a) * (M.r0 + 0.07), 0.002, M.z + Math.sin(a) * (M.r0 + 0.07)); })));
    ditch.add(ring(Array.from({ length: 48 }, (_, i) => oval((i / 48) * Math.PI * 2, 1.14))));
    add("ditch", ditch);

    // motte: a lathe-turned mound with a flat top
    const motte = lathe([[0.001, M.h], [M.r1, M.h], [M.r1 + 0.03, M.h - 0.02], [M.r0 * 0.75, M.h * 0.35], [M.r0, 0.0]], grass, 96);
    add("motte", at(motte, M.x, 0, M.z));

    // bailey: a low raised oval of beaten earth
    const bailey = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.012, 96), earth); bailey.scale.set(B.rx * 1.02, 1, B.rz * 1.02);
    add("bailey", at(bailey, B.x, 0.006, B.z));

    // hall, chapel and stables in the bailey
    const building = (w, h, d, wallMat, roofMat) => {
      const g = new THREE.Group(); g.add(at(box(w, h, d, wallMat), 0, h / 2, 0));
      // a ridge roof: a triangle extruded along the building, overhanging a little
      const o = 0.008, sh = new THREE.Shape([new THREE.Vector2(-d / 2 - o, 0), new THREE.Vector2(d / 2 + o, 0), new THREE.Vector2(0, d * 0.55)]);
      const geo = new THREE.ExtrudeGeometry(sh, { depth: w + 2 * o, bevelEnabled: false }); geo.translate(0, 0, -(w + 2 * o) / 2);
      const roof = new THREE.Mesh(geo, roofMat); roof.rotation.y = Math.PI / 2; g.add(at(roof, 0, h, 0));
      return g;
    };
    const hall = new THREE.Group();
    hall.add(at(building(0.24, 0.07, 0.1, wood, thatch), 0.36, 0.012, -0.22));
    const chapel = building(0.1, 0.07, 0.07, mat("#d9cfb8", { detail: "bone", repeat: 2, bump: 0.4, roughness: 0.9, clearcoat: 0 }), thatch); chapel.rotation.y = Math.PI / 2; hall.add(at(chapel, 0.12, 0.012, 0.24));
    hall.add(at(building(0.16, 0.05, 0.07, darkWood, thatch), 0.5, 0.012, 0.22));
    add("hall", hall);

    // ---------- the timber castle ----------
    const stakes = (pts, h, r = 0.009) => {
      const g = new THREE.Group(), geo = new THREE.CylinderGeometry(r, r, h, 6), tip = new THREE.ConeGeometry(r, r * 3, 6);
      for (const p of pts) { g.add(at(new THREE.Mesh(geo, wood), p.x, p.y + h / 2, p.z)); g.add(at(new THREE.Mesh(tip, wood), p.x, p.y + h + r * 1.5, p.z)); }
      return g;
    };
    const pal = new THREE.Group(), N = 120, gap = 0.16;
    const bpts = []; for (let i = 0; i < N; i++) { const t = (i / N) * Math.PI * 2; if (Math.abs(Math.atan2(Math.sin(t), Math.cos(t))) < gap) continue; bpts.push(oval(t).setY(0.012)); }
    pal.add(stakes(bpts, 0.09));
    const mpts = []; for (let i = 0; i < 46; i++) { const a = (i / 46) * Math.PI * 2; if (Math.abs(a - 0) < 0.25 || Math.abs(a - Math.PI * 2) < 0.25) continue; mpts.push(V(M.x + Math.cos(a) * (M.r1 - 0.004), M.h, M.z + Math.sin(a) * (M.r1 - 0.004))); }
    pal.add(stakes(mpts, 0.06, 0.007));
    add("palisade", pal);

    const tower = new THREE.Group();
    tower.add(at(box(0.12, 0.17, 0.12, wood), 0, 0.085, 0));
    tower.add(at(box(0.15, 0.025, 0.15, darkWood), 0, 0.17, 0));   // the overhanging fighting gallery
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.09, 4), darkWood); roof.rotation.y = Math.PI / 4; tower.add(at(roof, 0, 0.23, 0));
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.08, 6), darkWood); tower.add(at(pole, 0, 0.31, 0));
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 0.035, 8, 2), mat("#b3262b", { detail: "none", side: THREE.DoubleSide, roughness: 0.8, clearcoat: 0 })); tower.add(at(flag, 0.03, 0.33, 0));
    add("tower", at(tower, M.x, M.h, M.z));

    // flying bridge: from the bailey's west edge up to the motte top
    const bridge = new THREE.Group(), from = V(M.x + M.r1 + 0.005, M.h - 0.005, 0), to = V(B.x - B.rx + 0.02, 0.03, 0.0), mid = from.clone().lerp(to, 0.5);
    const deck = box(from.distanceTo(to), 0.012, 0.05, wood); deck.position.copy(mid); deck.rotation.z = Math.atan2(to.y - from.y, to.x - from.x); bridge.add(deck);
    for (const f of [0.35, 0.7]) { const p = from.clone().lerp(to, f), leg = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, p.y, 6), darkWood); bridge.add(at(leg, p.x, p.y / 2, 0)); }
    add("bridge", bridge);

    const gate = new THREE.Group(), gx = B.x + B.rx;
    for (const z of [-0.07, 0.07]) gate.add(at(box(0.06, 0.15, 0.06, wood), gx, 0.075, B.z + z));
    gate.add(at(box(0.07, 0.03, 0.2, darkWood), gx, 0.16, B.z));
    gate.add(at(box(0.18, 0.01, 0.07, wood), gx + 0.1, 0.012, B.z));   // bridge over the ditch
    add("gate", gate);

    // ---------- the stone castle ----------
    const battlements = (g, w, d, y, step = 0.024) => {
      const geo = new THREE.BoxGeometry(step * 0.55, 0.018, step * 0.55);
      for (let x = -w / 2; x <= w / 2 + 1e-6; x += step) for (const z of [-d / 2, d / 2]) g.add(at(new THREE.Mesh(geo, stone), x, y, z));
      for (let z = -d / 2 + step; z < d / 2; z += step) for (const x of [-w / 2, w / 2]) g.add(at(new THREE.Mesh(geo, stone), x, y, z));
    };
    const keep = new THREE.Group(), KW = 0.24, KH = 0.34, KD = 0.2;
    keep.add(at(box(KW, KH, KD, stone), 0, KH / 2, 0));
    for (const [x, z] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) keep.add(at(box(0.045, KH + 0.05, 0.045, stoneDark), x * KW / 2, (KH + 0.05) / 2, z * KD / 2));   // corner turrets
    battlements(keep, KW, KD, KH + 0.009);
    for (const y of [0.13, 0.22, 0.29]) for (const x of [-0.06, 0, 0.06]) keep.add(at(box(0.012, 0.03, 0.004, slit), x, y, KD / 2 + 0.001));   // windows
    const fore = new THREE.Group(); fore.add(at(box(0.07, 0.12, 0.05, stoneDark), 0, 0.06, 0)); for (let i = 0; i < 5; i++) fore.add(at(box(0.05, 0.012, 0.03, stoneDark), 0, 0.006 + i * 0.024, 0.03 + i * 0.018)); fore.add(at(box(0.026, 0.04, 0.004, slit), 0, 0.14, -0.024));
    keep.add(at(fore, 0.03, 0, KD / 2 + 0.025));   // the forebuilding: stairs up to the first-floor door
    add("keep", at(keep, 0.4, 0.012, 0.02));

    const curtain = new THREE.Group(), WH = 0.13, M2 = 72;
    for (let i = 0; i < M2; i++) {
      const t0 = (i / M2) * Math.PI * 2, t1 = ((i + 1) / M2) * Math.PI * 2, tm = (t0 + t1) / 2;
      if (Math.abs(Math.atan2(Math.sin(tm), Math.cos(tm))) < gap + 0.02) continue;
      const a = oval(t0, 0.985), b = oval(t1, 0.985), c = a.clone().lerp(b, 0.5), len = a.distanceTo(b);
      const seg = box(len + 0.004, WH, 0.03, stone); seg.position.set(c.x, WH / 2 + 0.012, c.z); seg.rotation.y = -Math.atan2(b.z - a.z, b.x - a.x); curtain.add(seg);
      const m = box(0.016, 0.018, 0.034, stone); m.position.set(c.x, WH + 0.021, c.z); m.rotation.y = seg.rotation.y; curtain.add(m);
    }
    for (const t of [0.9, 1.75, 2.6, 3.45, 4.3, 5.15]) { const p = oval(t, 1.0), tw = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, WH + 0.05, 20), stoneDark); curtain.add(at(tw, p.x, (WH + 0.05) / 2 + 0.012, p.z)); }
    add("curtain", curtain);

    const shell = new THREE.Group();
    const sw = new THREE.Mesh(new THREE.CylinderGeometry(M.r1 + 0.004, M.r1 + 0.012, 0.085, 48, 1, true), stone); shell.add(at(sw, 0, 0.0425, 0));
    const inner = new THREE.Mesh(new THREE.CylinderGeometry(M.r1 - 0.016, M.r1 - 0.016, 0.085, 48, 1, true), mat("#9c9586", { detail: "bone", repeat: 4, bump: 0.7, roughness: 0.9, clearcoat: 0, side: THREE.BackSide })); shell.add(at(inner, 0, 0.0425, 0));
    const capRing = new THREE.Mesh(new THREE.RingGeometry(M.r1 - 0.016, M.r1 + 0.008, 48), stone); capRing.rotation.x = -Math.PI / 2; shell.add(at(capRing, 0, 0.085, 0));
    for (let i = 0; i < 28; i++) { const a = (i / 28) * Math.PI * 2; shell.add(at(box(0.014, 0.016, 0.022, stone), Math.cos(a) * (M.r1 - 0.004), 0.093, Math.sin(a) * (M.r1 - 0.004))); }
    add("shell", at(shell, M.x, M.h, M.z));

    const gh = new THREE.Group();
    for (const z of [-0.075, 0.075]) gh.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.2, 24), stone), gx + 0.01, 0.112, B.z + z));
    gh.add(at(box(0.08, 0.07, 0.12, stoneDark), gx + 0.01, 0.17, B.z));
    const port = new THREE.Group(); for (let i = -2; i <= 2; i++) port.add(at(box(0.004, 0.09, 0.004, slit), 0, 0, i * 0.018)); for (let j = -1; j <= 1; j++) port.add(at(box(0.004, 0.004, 0.08, slit), 0, j * 0.03, 0));
    gh.add(at(port, gx + 0.052, 0.07, B.z));   // the portcullis
    add("gatehouse", gh);

    // labels that say what you're looking at
    const tag = (str, p) => { const l = text(str, { size: 0.035 }); l.position.copy(p); return l; };
    decor(tag("Motte", V(M.x, M.h + 0.42, M.z)), "site");
    decor(tag("Bailey", V(B.x, 0.27, B.z - 0.3)), "site");

    // the flag on the timber tower
    const fp = flag.geometry.attributes.position, base = Float32Array.from(fp.array);
    k.tick((t, dt, motion) => {
      if (!motion) return;
      for (let i = 0; i < fp.count; i++) { const x = base[i * 3] + 0.03; fp.setZ(i, Math.sin(x * 70 - t * 6) * 0.006 * (x / 0.06)); }
      fp.needsUpdate = true;
    });
  },
};
