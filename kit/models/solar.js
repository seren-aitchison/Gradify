// JuniorGradify's 3D model: the solar system for children. The Sun and eight planets orbit (not to
// scale: the real gaps are far too big to fit), the Moon goes round the Earth, and every planet has
// fun facts written for 7–11 year olds.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  star: { name: "The Sun & Moon", c: "#ffd34d" },
  rocky: { name: "Rocky planets", c: "#ff8f6b" },
  giants: { name: "Giant planets", c: "#5ef0ff" },
};

const STRUCTURES = {
  sun: s("star", "The Sun", "Our star: a giant ball of hot, glowing gas. It gives us light and warmth.",
    ["About **1.3 million Earths** could fit inside the Sun.", "Its light takes about **8 minutes** to reach us.", "Never look straight at the Sun: it can hurt your eyes."],
    [["What is the Sun?", "A star: a huge ball of hot, glowing gas."], ["How long does sunlight take to reach Earth?", "About 8 minutes."], ["Why should you never look straight at the Sun?", "It can damage your eyes."]],
    ["sun", "star", "light", "solar"]),
  moon: s("star", "The Moon", "Earth's moon goes round us about once a month. It doesn't make its own light: it reflects light from the Sun.",
    ["The Moon's shape seems to change through the month: these are its **phases** (new, crescent, half, full).", "In 1969 Neil Armstrong was the first person to walk on the Moon.", "The Moon pulls on the sea, making the tides."],
    [["Does the Moon make its own light?", "No, it reflects light from the Sun."], ["Who was the first person to walk on the Moon?", "Neil Armstrong, in 1969."], ["What are the Moon's phases?", "The changing shapes we see as it goes round the Earth: new moon, crescent, half moon, full moon."]],
    ["moon", "phases", "tides", "armstrong"]),
  mercury: s("rocky", "Mercury", "The smallest planet and the closest to the Sun. Very hot by day and freezing at night.",
    ["A year on Mercury is only **88 Earth days**.", "It has no air to keep the heat in, so nights are very cold.", "It's covered in craters, like our Moon."],
    [["Which planet is closest to the Sun?", "Mercury."], ["How long is a year on Mercury?", "88 Earth days."], ["Why are nights so cold on Mercury?", "It has no air (atmosphere) to keep the heat in."]],
    ["mercury"]),
  venus: s("rocky", "Venus", "The hottest planet, wrapped in thick clouds that trap the heat. The brightest planet in our sky.",
    ["Venus is even hotter than Mercury because its clouds trap heat, like a blanket.", "It spins backwards compared with most planets.", "It's sometimes called the 'evening star' but it's really a planet."],
    [["Which is the hottest planet?", "Venus."], ["Why is Venus so hot?", "Its thick clouds trap the Sun's heat."], ["Is the 'evening star' really a star?", "No, it's the planet Venus."]],
    ["venus"]),
  earth: s("rocky", "Earth", "Our home: the only planet we know with living things. It has air, liquid water and the right temperature.",
    ["Earth takes **365¼ days** to go round the Sun: one year (that's why we have leap years).", "It spins once every **24 hours**, giving us day and night.", "About 70% of Earth is covered by water."],
    [["How long does Earth take to orbit the Sun?", "About 365 days: one year."], ["What causes day and night?", "Earth spinning on its axis once every 24 hours."], ["How much of Earth is covered by water?", "About 70%."]],
    ["earth", "day and night", "year", "orbit", "planet"]),
  mars: s("rocky", "Mars", "The red planet: its dust is full of rusty iron. Robots called rovers are exploring it.",
    ["Mars has the biggest volcano in the solar system: **Olympus Mons**.", "It has two tiny moons, Phobos and Deimos.", "Scientists look for signs that water, and maybe life, existed there long ago."],
    [["Why is Mars red?", "Its dust and rocks contain rusty iron."], ["What is the biggest volcano in the solar system?", "Olympus Mons, on Mars."], ["What explores Mars today?", "Robot rovers, such as Perseverance."]],
    ["mars", "red planet", "rover"]),
  jupiter: s("giants", "Jupiter", "The biggest planet: a giant ball of gas with stripes of cloud and a storm bigger than Earth.",
    ["The **Great Red Spot** is a storm that has lasted hundreds of years.", "More than 1,300 Earths could fit inside Jupiter.", "It has over 90 moons."],
    [["Which is the biggest planet?", "Jupiter."], ["What is the Great Red Spot?", "A giant storm on Jupiter, bigger than Earth."], ["What is Jupiter made of?", "Mostly gas (hydrogen and helium)."]],
    ["jupiter", "gas giant", "great red spot"]),
  saturn: s("giants", "Saturn", "Famous for its beautiful rings, made of billions of pieces of ice and rock.",
    ["Saturn is so light for its size that it would **float** in a giant bath.", "Its rings are wide but very thin.", "It has more than 140 moons; Titan is bigger than Mercury."],
    [["What are Saturn's rings made of?", "Billions of pieces of ice and rock."], ["What's special about Saturn's weight for its size?", "It's so light it would float in water (if you had a big enough bath)."], ["What is Saturn's largest moon?", "Titan."]],
    ["saturn", "rings", "titan"]),
  uranus: s("giants", "Uranus", "An ice giant that spins on its side, like a ball rolling round the Sun.",
    ["Uranus is blue-green because of a gas called methane.", "Something huge probably knocked it over long ago.", "It was the first planet found with a telescope (1781)."],
    [["What's unusual about how Uranus spins?", "It's tipped on its side."], ["Why is Uranus blue-green?", "Methane gas in its atmosphere."], ["Which planet was the first discovered with a telescope?", "Uranus, in 1781."]],
    ["uranus", "ice giant"]),
  neptune: s("giants", "Neptune", "The farthest planet from the Sun: a cold, dark, windy ice giant.",
    ["Neptune has the **fastest winds** in the solar system.", "One year on Neptune is about 165 Earth years.", "It was found using maths before anyone saw it."],
    [["Which planet is farthest from the Sun?", "Neptune."], ["How long is a year on Neptune?", "About 165 Earth years."], ["Which planet has the fastest winds?", "Neptune."]],
    ["neptune", "ice giant"]),
};

const NOTES = {
  star: { title: "The Sun and the Moon", lead: "The Sun is the star at the centre of our solar system. Everything goes round it. The Moon goes round the Earth.",
    sections: [
      ["The Sun", "The Sun is a star. It looks bigger than other stars because it's much closer to us.", "- It gives us light and heat. Plants need its light to grow.", "- The Sun doesn't move across the sky: the Earth is spinning, so it looks as if the Sun moves.", "! Never look straight at the Sun, even with sunglasses."],
      ["Day and night", "The Earth spins round once every 24 hours.", "- When our side faces the Sun, it's day.", "- When our side faces away from the Sun, it's night.", "> Try it: shine a torch at a ball and turn the ball slowly."],
      ["The Moon", "The Moon goes round the Earth about once every 28 days.", "- It reflects the Sun's light, like a mirror.", "- Its shape seems to change: new moon, crescent, half moon, gibbous, full moon, then back again.", "- There's no air on the Moon, so astronauts need spacesuits."],
    ] },
  rocky: { title: "The rocky planets", lead: "The four planets closest to the Sun are small and made of rock: Mercury, Venus, Earth and Mars.",
    sections: [
      ["Remember the order", "My Very Easy Method Just Speeds Up Naming: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.", "> Make up your own silly sentence with the same first letters!"],
      ["What makes Earth special", "- Liquid water on the surface.", "- Air we can breathe, with oxygen.", "- Not too hot and not too cold: the 'Goldilocks zone'.", "- Living things: plants, animals and us."],
      ["Years and orbits", "An orbit is the path a planet takes round the Sun. A year is how long one trip takes.", "- Closer planets have shorter years: Mercury's is 88 days.", "- Earth's year is 365 days, with an extra day every four years (a leap year)."],
    ] },
  giants: { title: "The giant planets", lead: "The four outer planets are huge. Jupiter and Saturn are gas giants; Uranus and Neptune are ice giants.",
    sections: [
      ["Gas giants", "- Jupiter and Saturn are made mostly of gas: you couldn't stand on them.", "- Jupiter is the biggest planet; Saturn has the most famous rings.", "- They have lots of moons."],
      ["Ice giants", "- Uranus and Neptune are very cold and far away.", "- They look blue because of methane gas.", "- Only one spacecraft, Voyager 2, has visited them."],
      ["Exploring space", "- Telescopes help us see far away: the James Webb Space Telescope sees in infrared.", "- Probes and rovers travel to planets and send back pictures.", "- Astronauts live on the International Space Station, going round Earth every 90 minutes."],
    ] },
};

export default {
  title: "The solar system in 3D", kicker: "3D space",
  intro: { title: "Explore the solar system", text: "The Sun and all eight planets going round it, with the Moon going round the Earth. Tap any planet to learn amazing facts and make your own flashcards. (The planets are much further apart really!)" },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Remember",
  quiz: "find the planet",
  motion: "Planets moving",
  camera: { pos: [0.5, 1.8, 3.6], target: [0, 0, 0], min: 0.05, max: 6 },
  views: { "Whole system": [[0.5, 1.8, 3.6], [0, 0, 0]], Above: [[0, 3.0, 0.05], [0, 0, 0]], "Close to the Sun": [[0.3, 0.4, 0.9], [0, 0, 0]], Edge: [[2.6, 0.15, 0.2], [0, 0, 0]] },
  platform: false,
  explode: false,
  bg: ["#141a3a", "#020308"],
  envIntensity: 0.15,
  bloom: 0.6,
  build(k) {
    const { THREE, V, mat, glow, text, add, decor } = k;
    const rnd = (() => { let x = 3; return () => (x = (x * 16807) % 2147483647) / 2147483647; })();
    // stars in the background
    const sp = []; for (let i = 0; i < 1500; i++) { const v = V(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize().multiplyScalar(12 + rnd() * 6); sp.push(v.x, v.y, v.z); }
    const sg = new THREE.BufferGeometry(); sg.setAttribute("position", new THREE.Float32BufferAttribute(sp, 3)); decor(new THREE.Points(sg, new THREE.PointsMaterial({ color: "#ffffff", size: 0.04, sizeAttenuation: true })));
    // a planet texture from bands and spots, drawn on a canvas
    const tex = (base, bands, spot) => { const c = document.createElement("canvas"); c.width = 512; c.height = 256; const g = c.getContext("2d"); g.fillStyle = base; g.fillRect(0, 0, 512, 256); bands.forEach(([col, y, h]) => { g.fillStyle = col; g.globalAlpha = 0.55; g.fillRect(0, y, 512, h); }); g.globalAlpha = 0.25; for (let i = 0; i < 200; i++) { g.fillStyle = rnd() > 0.5 ? "#ffffff" : "#000000"; g.beginPath(); g.arc(rnd() * 512, rnd() * 256, rnd() * 6, 0, 7); g.fill(); } if (spot) { g.globalAlpha = 0.9; g.fillStyle = spot; g.beginPath(); g.ellipse(330, 160, 34, 18, 0, 0, 7); g.fill(); } const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; };
    const sun = new THREE.Mesh(new THREE.SphereGeometry(0.22, 64, 48), new THREE.MeshBasicMaterial({ map: tex("#ffb000", [["#ff7a00", 40, 30], ["#ffd34d", 120, 40], ["#ff9000", 200, 20]]) })); add("sun", sun);
    decor(new THREE.Mesh(new THREE.SphereGeometry(0.3, 48, 32), glow("#ffd080", 0.07)), "star");
    const light = new THREE.PointLight("#fff2d0", 6, 0, 1.2); decor(light);
    const P = [
      ["mercury", 0.035, 0.42, 4.1, "#a8a29a", [["#7a746c", 60, 20]]],
      ["venus", 0.055, 0.6, 1.6, "#e8c27a", [["#f2d9a0", 80, 50], ["#c99a50", 170, 30]]],
      ["earth", 0.058, 0.8, 1.0, "#2a6fd6", [["#3fa04a", 70, 40], ["#3fa04a", 150, 30], ["#ffffff", 0, 14], ["#ffffff", 242, 14]]],
      ["mars", 0.045, 1.0, 0.53, "#c1502e", [["#8a3418", 90, 30], ["#e07a50", 160, 20]]],
      ["jupiter", 0.15, 1.38, 0.084, "#d9b38c", [["#a0603a", 70, 20], ["#f2e0c8", 100, 25], ["#a0603a", 140, 18], ["#c9925a", 180, 20]], "#c0402a"],
      ["saturn", 0.125, 1.82, 0.034, "#e3cf9a", [["#c9a860", 80, 20], ["#f2e6c0", 120, 30], ["#b89850", 170, 15]]],
      ["uranus", 0.085, 2.2, 0.012, "#9fe3e8", [["#bff2f4", 100, 40]]],
      ["neptune", 0.082, 2.55, 0.006, "#3a64e0", [["#2a48b0", 90, 30], ["#6a90f0", 150, 20]], "#1a2a80"],
    ];
    const planets = [];
    P.forEach(([id, r, d, speed, base, bands, spot], i) => {
      const orbit = new THREE.Mesh(new THREE.RingGeometry(d - 0.002, d + 0.002, 256), glow("#5ef0ff", 0.18)); orbit.rotation.x = -Math.PI / 2; orbit.material.side = THREE.DoubleSide; decor(orbit, STRUCTURES[id].group);
      const g = new THREE.Group(); const a0 = i * 1.7;
      const ball = new THREE.Mesh(new THREE.SphereGeometry(r, 64, 48), mat("#ffffff", { detail: "tissue", repeat: 2, bump: 0.3, roughness: 0.75, clearcoat: id === "earth" ? 0.6 : 0, map: tex(base, bands, spot) }));
      ball.rotation.z = id === "uranus" ? 1.6 : 0.4; g.add(ball);
      if (id === "earth") { const atm = new THREE.Mesh(new THREE.SphereGeometry(r * 1.08, 48, 32), glow("#7ec8ff", 0.2)); g.add(atm); }
      if (id === "saturn") { const ring = new THREE.Mesh(new THREE.RingGeometry(r * 1.35, r * 2.3, 128), mat("#e8d8a8", { detail: "none", transparent: true, opacity: 0.8, side: THREE.DoubleSide, roughness: 0.6 })); ring.rotation.x = -Math.PI / 2 + 0.45; g.add(ring); }
      const l = text(STRUCTURES[id].name, { size: 0.05, bg: "rgba(0,0,0,0.5)" }); l.position.y = r + 0.07; g.add(l);
      g.position.set(Math.cos(a0) * d, 0, Math.sin(a0) * d); g.userData = { d, speed, a0, ball, moves: true };
      add(id, g); planets.push(g);
    });
    const earth = planets[2];
    const moon = new THREE.Mesh(new THREE.SphereGeometry(0.018, 32, 24), mat("#d8d8d8", { detail: "bone", repeat: 2, bump: 0.6, roughness: 0.9 })); moon.userData.moves = true; add("moon", moon);
    const place = (t) => {
      planets.forEach((p) => { const a = p.userData.a0 + t * p.userData.speed * 0.35; p.position.set(Math.cos(a) * p.userData.d, 0, -Math.sin(a) * p.userData.d); p.userData.ball.rotation.y = t * 0.8; });
      const ma = t * 3; moon.position.set(earth.position.x + Math.cos(ma) * 0.11, 0.01, earth.position.z + Math.sin(ma) * 0.11);
    };
    place(0);
    k.tick((t, dt, motion) => { sun.rotation.y = t * 0.05; if (motion) place(t); });
  },
};
