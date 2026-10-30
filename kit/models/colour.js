// ArtGradify's 3D model: colour, light and composition. A colour solid (hue round, chroma out, value
// up) with the colour wheel and its harmonies; a still life lit from one side showing every tone
// of light on form; and a picture plane with the rule of thirds and one-point perspective.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  colour: { name: "Colour", c: "#f055dd" },
  light: { name: "Light & form", c: "#ffe066" },
  composition: { name: "Composition", c: "#5ef0ff" },
};

const STRUCTURES = {
  wheel: s("colour", "Colour wheel", "Hues arranged in a circle. In paint (subtractive) the traditional primaries are red, yellow and blue; in light (additive) they're red, green and blue.",
    ["Primary + primary = **secondary** (red + yellow = orange); primary + neighbouring secondary = tertiary.", "Printers use cyan, magenta and yellow (CMY): more accurate subtractive primaries.", "Warm colours (reds, oranges) seem to advance; cool colours (blues) recede."],
    [["What are the primary colours of light?", "Red, green and blue (additive)."], ["What is a tertiary colour?", "A mix of a primary and its neighbouring secondary, e.g. blue-green."], ["Do warm colours advance or recede?", "Advance."]],
    ["colour wheel", "primary", "secondary", "tertiary", "warm", "cool", "hue"]),
  solid: s("colour", "Colour solid", "Every colour has three dimensions: **hue** (which colour), **value** (light or dark) and **chroma/saturation** (how intense). Munsell arranged them as a solid.",
    ["Tint = hue + white; shade = hue + black; tone = hue + grey.", "Value matters most: a painting that works in greyscale works in colour.", "Each hue reaches its highest chroma at a different value: yellow is light, violet dark."],
    [["What are the three dimensions of colour?", "Hue, value and chroma (saturation)."], ["What is a tint?", "A hue mixed with white."], ["Why check a painting in greyscale?", "To judge its values (light and dark) without colour distracting you."]],
    ["value", "chroma", "saturation", "tint", "shade", "munsell", "tone"]),
  harmonies: s("colour", "Colour harmonies", "Combinations that work together: complementary, analogous, triadic and split-complementary.",
    ["**Complementary** colours sit opposite (red/green, blue/orange): maximum contrast, and they neutralise when mixed.", "Analogous colours are neighbours: calm and unified.", "Simultaneous contrast: a colour looks different depending on its neighbours (Albers, Interaction of Color)."],
    [["What are complementary colours?", "Colours opposite each other on the wheel."], ["What happens if you mix complementary paints?", "They neutralise towards a grey or brown."], ["What is simultaneous contrast?", "The way neighbouring colours change how a colour appears."]],
    ["complementary", "analogous", "triadic", "harmony", "contrast", "albers"]),
  sphere: s("light", "Light on form", "One light source creates a predictable sequence on a rounded form: highlight, light, halftone, core shadow, reflected light.",
    ["The **core shadow** is the darkest part of the form, where it turns away from the light.", "Reflected light from nearby surfaces lifts the shadow side, but stays darker than any lit area.", "Chiaroscuro: strong light–dark contrast (Caravaggio, Rembrandt)."],
    [["Name the tones on a lit sphere, from light to dark.", "Highlight, light, halftone, core shadow (then reflected light and the cast shadow)."], ["Where is the core shadow?", "Where the form turns away from the light: the darkest part of the object itself."], ["What is chiaroscuro?", "Strong contrast between light and dark to model form and create drama."]],
    ["light", "shadow", "form", "tone", "chiaroscuro", "highlight", "core shadow"]),
  castShadow: s("light", "Cast shadow", "The shadow an object throws on another surface. Darkest and sharpest where the object touches (the occlusion shadow).",
    ["Cast shadows follow the direction of the light and the shape of the surface they fall on.", "Edges soften as they move away from the object.", "Shadows contain colour: often the complement of the light's colour (Impressionists)."],
    [["Where is a cast shadow darkest and sharpest?", "Right where the object touches the surface."], ["What happens to a cast shadow's edge further from the object?", "It becomes softer."], ["What colour did the Impressionists see in shadows?", "Often cool colours, the complement of warm light."]],
    ["cast shadow", "occlusion", "shadow", "impressionism"]),
  thirds: s("composition", "Rule of thirds", "Divide the picture into a 3 × 3 grid; place key elements on the lines or where they cross.",
    ["Off-centre focal points feel more dynamic than centred ones.", "Leading lines guide the eye to the focal point.", "Other structures: the golden ratio (≈1.618), symmetry, triangular composition (High Renaissance)."],
    [["What is the rule of thirds?", "Divide the frame into thirds both ways and place key elements on the lines or intersections."], ["What are leading lines?", "Lines in the image that guide the viewer's eye to the focal point."], ["What is the golden ratio?", "About 1.618, a proportion used in composition and design."]],
    ["rule of thirds", "composition", "focal point", "golden ratio", "leading lines"]),
  perspective: s("composition", "Perspective", "Parallel lines going away from us appear to meet at a vanishing point on the horizon line (eye level).",
    ["One-point perspective: one vanishing point (a road, a corridor). Two-point: corners towards you. Three-point: looking up or down.", "Brunelleschi demonstrated linear perspective around 1415.", "Atmospheric perspective: distant things are paler, bluer and less detailed."],
    [["What is a vanishing point?", "The point on the horizon where parallel lines receding from the viewer appear to meet."], ["What is the horizon line in perspective drawing?", "The viewer's eye level."], ["What is atmospheric perspective?", "Distant objects appear paler, bluer and less distinct."]],
    ["perspective", "vanishing point", "horizon", "one-point", "two-point", "brunelleschi"]),
};

const NOTES = {
  colour: { title: "Colour theory", lead: "Colour is relative. Understand hue, value and chroma, how colours mix and how they affect each other, and you can make colour do what you want.",
    sections: [
      ["Mixing", "- Subtractive (paint, ink): each pigment absorbs light; mixing tends towards dark.", "- Additive (light, screens): mixing tends towards white.", "- For bright mixes, use a split primary palette: warm and cool versions of each primary.", "> Mix a dull colour bright? You can't: keep your brightest colours pure and dull others around them."],
      ["Value and chroma", "- Squint to see values; make a value scale from white to black in 9 steps.", "- High-key paintings use mostly light values; low-key mostly dark.", "- Reduce chroma by adding the complement rather than black for richer shadows."],
      ["Harmony and contrast", "- Complementary (high contrast), analogous (harmony), triadic (balanced), split-complementary (contrast with less tension).", "- Itten's seven contrasts: hue, light–dark, cold–warm, complementary, simultaneous, saturation, extension.", "- Artists to study: Monet (broken colour), Matisse (Fauvism), Rothko (colour field), Albers."],
    ] },
  light: { title: "Light, tone and form", lead: "Drawing convincing three-dimensional form is about tone: where the light falls, where it turns away, and what it throws.",
    sections: [
      ["The tonal sequence", "- Highlight → light → halftone → core shadow → reflected light → cast shadow.", "- Keep the lit and shadow families separate: no shadow tone as light as any lit tone.", "- Edges: hard edges on sharp turns and near contact, soft edges on gentle turns."],
      ["Observational drawing", "- Measure with a pencil at arm's length (sight-size); check angles against verticals and horizontals.", "- Block in big shapes and values first, details last.", "- Negative space: draw the gaps between things to check proportions."],
      ["Light in art history", "- Chiaroscuro and tenebrism (Caravaggio).", "- Vermeer's soft window light; Impressionists painting changing outdoor light en plein air.", "- Photography and film borrowed 'Rembrandt lighting'."],
    ] },
  composition: { title: "Composition and space", lead: "Composition is the arrangement of everything in the frame: where the eye goes first, how it travels, and how deep the space feels.",
    sections: [
      ["Arranging the picture", "- Focal point, hierarchy, balance (symmetrical or asymmetrical), rhythm and repetition.", "- Rule of thirds, golden section, triangular and diagonal compositions.", "- Cropping changes meaning: try thumbnails before committing."],
      ["Creating depth", "- Linear perspective (one, two, three point).", "- Overlap, size change, placement higher in the picture plane.", "- Atmospheric perspective: lower contrast, paler and cooler in the distance."],
      ["Analysing artworks", "- Content (what it shows), form (how it's made: line, tone, colour, composition), process (materials and techniques), mood (how it makes you feel): Rod Taylor's model.", "- Always link observations to the artist's intentions and context.", "! In GCSE/A level art, show your research, experiments and refinement in your sketchbook: the journey earns marks."],
    ] },
};

export default {
  title: "Colour and light in 3D", kicker: "3D art",
  intro: { title: "Explore colour and light", text: "A colour solid with the wheel and its harmonies, a still life lit from one side, and a picture plane with the rule of thirds and perspective. Click anything for the theory and the artists to look at, and read the full notes below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Studio tip",
  quiz: "find it",
  motion: "Light moving",
  camera: { pos: [0.4, 1.1, 2.6], target: [0, 0.25, 0], min: 0.05, max: 5 },
  views: { Studio: [[0.4, 1.1, 2.6], [0, 0.25, 0]], "Colour solid": [[-0.6, 0.6, 0.9], [-0.6, 0.25, 0]], "Still life": [[0.25, 0.35, 0.75], [0.15, 0.12, 0.1]], Picture: [[0.75, 0.4, 0.5], [0.75, 0.3, -0.3]] },
  platform: { r: 1.1, y: -0.005 },
  labelMax: 3,
  explode: true,
  bg: ["#262230", "#0a090e"],
  build(k) {
    const { THREE, V, mat, glow, limb, box, text, add, decor } = k;
    // the colour solid: rings of hue by value, chroma outward
    const solid = new THREE.Group(); solid.position.set(-0.6, 0, 0);
    const cube = new THREE.BoxGeometry(0.026, 0.026, 0.026);
    const cells = [];
    for (let v = 1; v <= 9; v++) for (let h = 0; h < 24; h++) for (let c = 1; c <= 4; c++) {
      const best = 0.5 + 0.2 * Math.cos((h / 24) * Math.PI * 2 - 1.0);   // each hue reaches its strongest chroma at its own value (yellow light, violet dark)
      if (c > Math.max(1, Math.round(4.4 * (1 - Math.abs(v / 10 - best) * 1.8)))) continue;
      const col = new THREE.Color().setHSL(h / 24, c / 4, 0.06 + (v / 10) * 0.62);
      const a = (h / 24) * Math.PI * 2, r = 0.03 + c * 0.04;
      cells.push([Math.cos(a) * r, v * 0.04, Math.sin(a) * r, col]);
    }
    const inst = new THREE.InstancedMesh(cube, new THREE.MeshBasicMaterial(), cells.length), m4 = new THREE.Matrix4(), q = new THREE.Quaternion();   // unlit, so each swatch shows its true colour
    cells.forEach(([x, y, z, col], i) => { q.setFromAxisAngle(V(0, 1, 0), -Math.atan2(z, x)); m4.compose(V(x, y, z), q, V(1, 1, 1)); inst.setMatrixAt(i, m4); inst.setColorAt(i, col); });
    solid.add(inst);
    for (let v = 0; v <= 10; v++) { const g = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.036, 0.03), mat(new THREE.Color().setHSL(0, 0, v / 10), { detail: "none", roughness: 0.4 })); g.position.set(0, v * 0.04, 0); solid.add(g); }
    const sl = text("Hue round · chroma out · value up", { size: 0.025, bg: "rgba(0,0,0,0.55)" }); sl.position.set(0, 0.5, 0); solid.add(sl);
    add("solid", solid);
    // the colour wheel on the floor in front, with complementary and triadic lines
    const wheel = new THREE.Group(); wheel.position.set(-0.6, 0.004, 0.55);
    for (let i = 0; i < 12; i++) { const seg = new THREE.Mesh(new THREE.RingGeometry(0.1, 0.2, 24, 1, (i / 12) * Math.PI * 2, Math.PI * 2 / 12 - 0.02), new THREE.MeshBasicMaterial({ color: new THREE.Color().setHSL(i / 12, 0.9, 0.5), side: THREE.DoubleSide })); seg.rotation.x = -Math.PI / 2; wheel.add(seg); }
    add("wheel", wheel);
    const harm = new THREE.Group(); harm.position.copy(wheel.position).add(V(0, 0.01, 0));
    const pt = (i) => V(Math.cos((i + 0.5) / 12 * Math.PI * 2) * 0.15, 0.01, -Math.sin((i + 0.5) / 12 * Math.PI * 2) * 0.15);
    harm.add(limb(pt(0), pt(6), 0.004, glow("#ffffff", 0.9), false));
    for (const [a, b] of [[2, 6], [6, 10], [10, 2]]) harm.add(limb(pt(a), pt(b), 0.003, glow("#ffe066", 0.8), false));
    const hl = text("Complementary and triadic", { size: 0.022, bg: "rgba(0,0,0,0.55)" }); hl.position.set(0, 0.06, 0); harm.add(hl);
    add("harmonies", harm);
    // still life: sphere, cube and cylinder on a table, lit by one lamp
    const table = box(0.6, 0.02, 0.4, mat("#3a2c22", { detail: "fibre", repeat: 2 }), 0.006); table.position.set(0.1, 0.01, 0.1); decor(table, "light");
    const clay = mat("#c9c0b2", { detail: "tissue", repeat: 2, bump: 0.2, roughness: 0.7, clearcoat: 0 });
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.075, 64, 48), clay); sphere.position.set(0.05, 0.095, 0.12); add("sphere", sphere);
    const cubeM = box(0.1, 0.1, 0.1, clay, 0.004); cubeM.position.set(0.22, 0.07, 0.02); cubeM.rotation.y = 0.5; add("sphere", cubeM);
    // the cast shadows, painted as soft dark ellipses on the table (lit from the upper left)
    const shadowTex = (() => { const c = document.createElement("canvas"); c.width = c.height = 128; const g = c.getContext("2d"), r = g.createRadialGradient(64, 64, 4, 64, 64, 64); r.addColorStop(0, "rgba(0,0,0,0.85)"); r.addColorStop(0.5, "rgba(0,0,0,0.5)"); r.addColorStop(1, "rgba(0,0,0,0)"); g.fillStyle = r; g.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c); })();
    const shadows = new THREE.Group();
    for (const [x, z, w, d] of [[0.13, 0.15, 0.24, 0.13], [0.3, 0.06, 0.22, 0.14]]) { const sh = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })); sh.rotation.x = -Math.PI / 2; sh.position.set(x, 0.021, z); shadows.add(sh); }
    add("castShadow", shadows);
    const lamp = new THREE.SpotLight("#fff0d0", 2.5, 2, 0.6, 0.5); lamp.position.set(-0.3, 0.6, 0.35); lamp.target.position.set(0.1, 0.05, 0.1); decor(lamp); decor(lamp.target);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.02, 16, 12), glow("#fff0d0", 1)); bulb.position.copy(lamp.position); decor(bulb, "light");
    // the picture plane: an easel with the thirds grid and a one-point perspective road
    const pic = new THREE.Group(); pic.position.set(0.75, 0.32, -0.3); pic.rotation.y = -0.4;
    const canvas = document.createElement("canvas"); canvas.width = 512; canvas.height = 384; const g = canvas.getContext("2d");
    const sky = g.createLinearGradient(0, 0, 0, 200); sky.addColorStop(0, "#7ab0e8"); sky.addColorStop(1, "#f4d8b0"); g.fillStyle = sky; g.fillRect(0, 0, 512, 200);
    g.fillStyle = "#5a8a4a"; g.fillRect(0, 200, 512, 184); g.fillStyle = "#6a6058"; g.beginPath(); g.moveTo(170, 384); g.lineTo(256, 200); g.lineTo(342, 384); g.fill();
    g.fillStyle = "#3a5a8a"; g.globalAlpha = 0.6; g.beginPath(); g.moveTo(0, 200); g.lineTo(80, 150); g.lineTo(170, 200); g.fill(); g.globalAlpha = 1;
    for (let i = 0; i < 6; i++) { const y = 210 + i * 30, h = 10 + i * 12; g.fillStyle = "#2f5a2f"; g.fillRect(150 - i * 22 - h / 4, y - h, h / 2, h); g.fillRect(362 + i * 22 - h / 4, y - h, h / 2, h); }
    const tex = new THREE.CanvasTexture(canvas); tex.colorSpace = THREE.SRGBColorSpace;
    pic.add(new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.3), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8 })));
    const frameM = mat("#8a6a48", { detail: "fibre" }); for (const [w, h, x, y] of [[0.42, 0.012, 0, 0.156], [0.42, 0.012, 0, -0.156], [0.012, 0.32, 0.206, 0], [0.012, 0.32, -0.206, 0]]) { const f = box(w, h, 0.012, frameM); f.position.set(x, y, 0); pic.add(f); }
    for (let leg = -1; leg <= 1; leg += 2) pic.add(limb(V(leg * 0.15, -0.16, 0.02), V(leg * 0.18, -0.32, 0.08), 0.006, frameM, false));
    add("perspective", pic);
    const grid = new THREE.Group(); grid.position.copy(pic.position); grid.rotation.copy(pic.rotation);
    for (const x of [-0.4 / 6, 0.4 / 6]) grid.add(box(0.002, 0.3, 0.002, glow("#5ef0ff", 0.9)).translateX(x).translateZ(0.003));
    for (const y of [-0.05, 0.05]) grid.add(box(0.4, 0.002, 0.002, glow("#5ef0ff", 0.9)).translateY(y).translateZ(0.003));
    add("thirds", grid);
    const vp = new THREE.Mesh(new THREE.SphereGeometry(0.006, 12, 8), glow("#ff5a4d", 1)); vp.position.set(0, 0.04, 0.004); pic.add(vp);
    k.tick((t, dt, motion) => { if (!motion) return; const a = Math.sin(t * 0.3) * 0.5; lamp.position.set(-0.3 + a * 0.2, 0.6, 0.35 - a * 0.2); bulb.position.copy(lamp.position); solid.rotation.y = t * 0.1; });
  },
};
