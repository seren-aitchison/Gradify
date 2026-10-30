// MathGradify's 3D model: maths you can walk around. The Platonic solids and Archimedes' sphere in
// a cylinder; a paraboloid with its tangent plane and a saddle for calculus; a helix and vectors;
// and the bivariate normal distribution. The tangent plane slides over the surface.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  geometry: { name: "Geometry", c: "#5ef0ff" },
  calculus: { name: "Calculus", c: "#f055dd" },
  vectors: { name: "Vectors & curves", c: "#ffe066" },
  stats: { name: "Probability", c: "#6bffb8" },
};

const STRUCTURES = {
  platonic: s("geometry", "Platonic solids", "The five convex polyhedra whose faces are identical regular polygons with the same number meeting at every vertex: tetrahedron, cube, octahedron, dodecahedron, icosahedron.",
    ["**Euler's formula** for any convex polyhedron: V − E + F = 2 (cube: 8 − 12 + 6 = 2).", "There are exactly five because the angles meeting at a vertex must total less than 360°.", "Cube and octahedron are duals (swap faces and vertices), as are dodecahedron and icosahedron; the tetrahedron is self-dual."],
    [["State Euler's formula for polyhedra.", "V − E + F = 2."], ["Why are there only five Platonic solids?", "The face angles at each vertex must sum to less than 360°, which only five combinations of regular polygons allow."], ["Which Platonic solid is dual to the cube?", "The octahedron."]],
    ["polyhedr", "platonic", "euler", "cube", "tetrahedron", "3d shape", "faces edges vertices"]),
  archimedes: s("geometry", "Sphere, cylinder and cone", "Archimedes' favourite result: a sphere has two-thirds the volume and the same surface area as the cylinder that just contains it.",
    ["Sphere: V = 4/3 πr³, A = 4πr². Cylinder: V = πr²h. Cone: V = 1/3 πr²h.", "Cone : sphere : cylinder volumes (same r, h = 2r) are 1 : 2 : 3.", "Volumes scale with the cube of length; areas with the square."],
    [["What is the volume of a sphere?", "4/3 πr³."], ["What is the ratio of volumes of a cone, sphere and cylinder with the same radius and height 2r?", "1 : 2 : 3."], ["If you double every length of a solid, what happens to its volume?", "It's multiplied by 8 (2³)."]],
    ["sphere", "cylinder", "cone", "volume", "surface area", "archimedes"]),
  paraboloid: s("calculus", "Paraboloid z = x² + y²", "A bowl-shaped surface. Each slice parallel to an axis is a parabola; horizontal slices are circles.",
    ["Partial derivatives: ∂z/∂x = 2x, ∂z/∂y = 2y. The minimum is where both are zero: (0, 0).", "The **gradient** ∇z = (2x, 2y) points uphill, perpendicular to the contour circles.", "Volume under it over a disc of radius R (by double integration in polar coordinates): πR⁴/2."],
    [["Find the partial derivatives of z = x² + y².", "∂z/∂x = 2x, ∂z/∂y = 2y."], ["What does the gradient vector tell you?", "The direction of steepest ascent; its magnitude is the steepest slope."], ["Where is the stationary point of z = x² + y²?", "At (0, 0), a minimum."]],
    ["paraboloid", "partial derivative", "gradient", "multivariable", "surface", "quadratic"]),
  tangent: s("calculus", "Tangent plane", "The flat plane that touches a surface at one point: the 2D version of a tangent line, and the best linear approximation there.",
    ["At (a, b): z ≈ f(a, b) + fₓ(a, b)(x − a) + f_y(a, b)(y − b).", "In one variable, the derivative f′(a) is the gradient of the tangent at a: lim (f(a+h) − f(a))/h as h → 0.", "Newton–Raphson uses tangents to find roots: xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ)."],
    [["Define the derivative from first principles.", "f′(x) = lim as h → 0 of (f(x + h) − f(x))/h."], ["What is the equation of the tangent plane to z = f(x, y) at (a, b)?", "z = f(a, b) + fₓ(a, b)(x − a) + f_y(a, b)(y − b)."], ["State the Newton–Raphson iteration.", "xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ)."]],
    ["tangent", "derivative", "differentiat", "linear approximation", "newton-raphson", "first principles"]),
  saddle: s("calculus", "Saddle z = x² − y²", "A surface that curves up in one direction and down in the other. Its centre is a stationary point that's neither a maximum nor a minimum.",
    ["Second derivative test: D = fₓₓf_yy − (fₓᵧ)². D < 0 → saddle; D > 0 and fₓₓ > 0 → minimum; D > 0 and fₓₓ < 0 → maximum.", "Here fₓₓ = 2, f_yy = −2, fₓᵧ = 0, so D = −4: a saddle.", "In one variable, a point of inflection is where f″ changes sign."],
    [["How do you classify a stationary point of f(x, y)?", "Compute D = fₓₓf_yy − fₓᵧ². D < 0: saddle. D > 0: minimum if fₓₓ > 0, maximum if fₓₓ < 0."], ["Why is (0, 0) a saddle point of x² − y²?", "D = (2)(−2) − 0 = −4 < 0."], ["What is a point of inflection?", "A point where the curvature changes sign (f″ changes sign)."]],
    ["saddle", "stationary point", "second derivative", "hessian", "maximum", "minimum", "inflection"]),
  helix: s("vectors", "Helix", "A parametric curve r(t) = (cos t, sin t, ct): moving round a circle while rising steadily. DNA and springs are helices.",
    ["Velocity r′(t) = (−sin t, cos t, c); speed √(1 + c²) is constant.", "Arc length over one turn: 2π√(1 + c²).", "Parametric equations describe curves that aren't functions y = f(x)."],
    [["Give a parametric equation for a helix.", "r(t) = (a cos t, a sin t, ct)."], ["What is the velocity vector of r(t) = (cos t, sin t, ct)?", "r′(t) = (−sin t, cos t, c)."], ["How long is one turn of the helix (cos t, sin t, ct)?", "2π√(1 + c²)."]],
    ["helix", "parametric", "curve", "arc length"]),
  vectors: s("vectors", "Vectors", "Quantities with size and direction, written as columns or as ai + bj + ck using the unit vectors along the axes.",
    ["Magnitude |a| = √(a₁² + a₂² + a₃²).", "**Dot product** a·b = |a||b|cos θ: zero when the vectors are perpendicular.", "**Cross product** a × b is perpendicular to both, with magnitude |a||b|sin θ (the area of the parallelogram)."],
    [["How do you find the angle between two vectors?", "cos θ = (a·b)/(|a||b|)."], ["What does a dot product of zero mean?", "The vectors are perpendicular."], ["What does the cross product give?", "A vector perpendicular to both, with magnitude equal to the area of the parallelogram they span."]],
    ["vector", "dot product", "scalar product", "cross product", "magnitude", "unit vector"]),
  axes: s("vectors", "3D coordinate axes", "Three perpendicular axes x, y, z. Every point is an ordered triple; planes and lines can be written as equations.",
    ["Distance between points: √((x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)²): Pythagoras in 3D.", "Line: r = a + λd. Plane: r·n = a·n (or ax + by + cz = d).", "Right-hand rule: x across, y up the page, z out towards you."],
    [["What is the vector equation of a line?", "r = a + λd (a point plus a multiple of a direction)."], ["Write the Cartesian equation of a plane with normal (a, b, c).", "ax + by + cz = d."], ["How do you find the distance between two points in 3D?", "√((Δx)² + (Δy)² + (Δz)²)."]],
    ["axes", "coordinate", "3d", "plane", "line", "pythagoras"]),
  normal: s("stats", "Bivariate normal distribution", "The bell curve in two variables: the height shows probability density, and the volume underneath is 1.",
    ["For one variable N(μ, σ²): about 68% within 1σ, 95% within 2σ, 99.7% within 3σ.", "Standardise with Z = (X − μ)/σ.", "Correlation ρ stretches the bell into an ellipse; ρ = 0 gives circular contours."],
    [["What proportion of a normal distribution lies within 2 standard deviations of the mean?", "About 95%."], ["How do you standardise a normal variable?", "Z = (X − μ)/σ."], ["What does correlation do to a bivariate normal's contours?", "Stretches them from circles into tilted ellipses."]],
    ["normal distribution", "bell curve", "standard deviation", "z score", "probability density", "gaussian"]),
  dice: s("stats", "Dice and probability", "Two dice: 36 equally likely outcomes. The basis for counting, probability and expected value.",
    ["P(sum = 7) = 6/36 = 1/6, the most likely total.", "Expected value of one die: (1+2+…+6)/6 = 3.5; variance 35/12.", "Independent events: P(A and B) = P(A) × P(B)."],
    [["What is the probability that two dice sum to 7?", "6/36 = 1/6."], ["What is the expected value of a fair die?", "3.5."], ["When are two events independent?", "When P(A and B) = P(A) × P(B)."]],
    ["probability", "dice", "expected value", "independent", "outcome", "variance"]),
};

const NOTES = {
  geometry: { title: "Geometry in three dimensions", lead: "Shapes, their surfaces and their volumes, and the patterns that connect them. 3D geometry is where algebra and visual intuition meet.",
    sections: [
      ["Polyhedra", "- Faces, edges, vertices; Euler: V − E + F = 2.", "- Tetrahedron (4, 6, 4), cube (8, 12, 6), octahedron (6, 12, 8), dodecahedron (20, 30, 12), icosahedron (12, 30, 20) as (V, E, F).", "- Prisms have a constant cross-section: V = area × length."],
      ["Areas and volumes", "- Pyramid and cone: V = ⅓ × base area × height.", "- Sphere: V = 4/3 πr³, A = 4πr². Cylinder: A = 2πr² + 2πrh.", "- Frustum: subtract the small cone from the large one.", "> Similar shapes with scale factor k: lengths × k, areas × k², volumes × k³."],
      ["Trigonometry in 3D", "- Find the angle between a line and a plane by dropping a perpendicular and using a right-angled triangle.", "- Sine rule a/sin A = b/sin B; cosine rule a² = b² + c² − 2bc cos A; area = ½ab sin C."],
      ["Proof", "- Euler's formula can be proved by removing faces one at a time while keeping V − E + F constant.", "- Why five Platonic solids: at least three faces meet at a vertex and their angles sum to under 360°: 3, 4 or 5 triangles; 3 squares; 3 pentagons."],
    ] },
  calculus: { title: "Calculus: rates, slopes and surfaces", lead: "Differentiation finds rates of change and slopes; integration finds areas, volumes and totals. In more than one variable, slopes become gradients and tangent lines become tangent planes.",
    sections: [
      ["Differentiation", "- d/dx xⁿ = nxⁿ⁻¹; d/dx eˣ = eˣ; d/dx ln x = 1/x; d/dx sin x = cos x.", "- Chain rule: dy/dx = dy/du × du/dx. Product rule: (uv)′ = u′v + uv′. Quotient rule: (u/v)′ = (u′v − uv′)/v².", "- Stationary points where f′(x) = 0; classify with f″(x)."],
      ["Integration", "- ∫xⁿ dx = xⁿ⁺¹/(n+1) + c (n ≠ −1); ∫1/x dx = ln|x| + c.", "- Definite integrals give signed area; the Fundamental Theorem links integration and differentiation.", "- Volumes of revolution: V = π∫y² dx.", "> Techniques: substitution, by parts (∫u dv = uv − ∫v du), partial fractions."],
      ["Functions of two variables", "- Surfaces z = f(x, y); contours are level curves f(x, y) = c.", "- Partial derivatives treat the other variable as constant; the gradient ∇f = (fₓ, f_y).", "- Tangent plane and linear approximation; second derivative test for stationary points.", "- Double integrals give volumes under surfaces; polar coordinates simplify circular regions (dA = r dr dθ)."],
      ["Differential equations", "- First order separable: dy/dx = f(x)g(y) → ∫1/g(y) dy = ∫f(x) dx.", "- Exponential growth and decay: dy/dt = ky → y = Ae^{kt}.", "- Second order linear with constant coefficients: auxiliary equation, complementary function plus particular integral."],
    ] },
  vectors: { title: "Vectors, lines and curves", lead: "Vectors describe position, displacement, velocity and force. In 3D they let you write lines and planes as equations and find angles and distances between them.",
    sections: [
      ["Vector basics", "- Addition head to tail; scalar multiplication stretches.", "- Position vectors OA = a; AB = b − a.", "- Unit vector â = a/|a|."],
      ["Products", "- Dot product a·b = a₁b₁ + a₂b₂ + a₃b₃ = |a||b|cos θ.", "- Cross product a × b = (a₂b₃ − a₃b₂, a₃b₁ − a₁b₃, a₁b₂ − a₂b₁).", "- Scalar triple product a·(b × c) = volume of the parallelepiped."],
      ["Lines and planes", "- Line: r = a + λd. Two lines in 3D are parallel, intersect, or are skew.", "- Plane: r·n = d; distance from a point to a plane = |ax₀ + by₀ + cz₀ − d| / |n|.", "- Angle between a line and a plane: 90° minus the angle between the line and the normal."],
      ["Parametric curves", "- x = f(t), y = g(t): dy/dx = (dy/dt)/(dx/dt).", "- Circle: (r cos t, r sin t). Helix adds a linear z. Cycloid: the path of a point on a rolling wheel.", "> Arc length L = ∫√((dx/dt)² + (dy/dt)² + (dz/dt)²) dt."],
    ] },
  stats: { title: "Probability and distributions", lead: "Probability measures uncertainty; distributions describe how values are spread. The normal distribution appears everywhere because of the central limit theorem.",
    sections: [
      ["Probability rules", "- 0 ≤ P(A) ≤ 1; P(A′) = 1 − P(A).", "- P(A or B) = P(A) + P(B) − P(A and B).", "- Conditional: P(A|B) = P(A and B)/P(B). Bayes: P(A|B) = P(B|A)P(A)/P(B).", "> Tree diagrams and two-way tables make conditional probability visible."],
      ["Discrete distributions", "- Binomial B(n, p): fixed trials, two outcomes, constant p, independent. Mean np, variance np(1 − p).", "- Poisson Po(λ): events at a constant rate. Mean = variance = λ.", "- E(X) = Σx P(X = x); Var(X) = E(X²) − (E(X))²."],
      ["The normal distribution", "- Symmetric, bell-shaped, mean = median = mode; defined by μ and σ.", "- Central limit theorem: means of large samples are approximately normal whatever the population.", "- Hypothesis testing: compare a test statistic with a critical value at a significance level (often 5%)."],
    ] },
};

export default {
  title: "Maths in 3D", kicker: "3D mathematics",
  intro: { title: "Explore maths in three dimensions", text: "Solids, surfaces, curves, vectors and a probability distribution you can turn and zoom into. The tangent plane slides over the paraboloid. Click anything for its key results, and read the full notes below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Key result",
  quiz: "find the object",
  motion: "Tangent plane moving",
  camera: { pos: [1.6, 1.3, 2.0], target: [0, 0.3, 0], min: 0.05, max: 6 },
  views: { All: [[1.6, 1.3, 2.0], [0, 0.3, 0]], Solids: [[-0.9, 0.6, 1.2], [-0.9, 0.2, 0]], Surfaces: [[0.3, 0.9, 1.1], [0.1, 0.2, -0.1]], Curves: [[1.3, 0.7, 0.9], [0.9, 0.35, 0]], Normal: [[0.4, 0.8, -0.3], [0.2, 0.15, -0.9]] },
  platform: { r: 1.15, y: -0.01 },
  labelMax: 3,
  explode: false,
  build(k) {
    const { THREE, V, mat, glow, limb, tube, text, line, add, decor } = k;
    const wire = (geo, c) => new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: 0.9 }));
    const glass = (c) => mat(c, { detail: "none", roughness: 0.1, clearcoat: 1, transmission: 0.55, thickness: 0.15, transparent: true, opacity: 0.8, metalness: 0 });
    // Platonic solids in a row, each with glowing edges
    const solids = [new THREE.TetrahedronGeometry(0.11), new THREE.BoxGeometry(0.15, 0.15, 0.15), new THREE.OctahedronGeometry(0.11), new THREE.DodecahedronGeometry(0.1), new THREE.IcosahedronGeometry(0.1)];
    const spin = [];
    solids.forEach((g, i) => { const grp = new THREE.Group(); grp.position.set(-1.05 + i * 0.22, 0.2 + (i % 2) * 0.05, -0.15 + (i % 2) * 0.12); grp.add(new THREE.Mesh(g, glass(["#5ef0ff", "#7ee0ff", "#a0b8ff", "#c79bff", "#f055dd"][i]))); grp.add(wire(g, "#eaffff")); add("platonic", grp); spin.push(grp); });
    // sphere inside its cylinder, and a cone, for Archimedes
    const arch = new THREE.Group(); arch.position.set(-0.75, 0.0, 0.5);
    const cylG = new THREE.CylinderGeometry(0.13, 0.13, 0.26, 64, 1, true); const cyl = new THREE.Mesh(cylG, glass("#9fd8ff")); cyl.material.side = THREE.DoubleSide; cyl.position.y = 0.13; arch.add(cyl); const cylEdges = wire(new THREE.CylinderGeometry(0.13, 0.13, 0.26, 32, 1, true), "#bfeaff"); cylEdges.position.y = 0.13; arch.add(cylEdges);
    const sph = new THREE.Mesh(new THREE.SphereGeometry(0.128, 64, 48), mat("#5ef0ff", { detail: "none", roughness: 0.15, clearcoat: 1, emissive: new THREE.Color("#0a3040") })); sph.position.y = 0.13; arch.add(sph);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.26, 64), glass("#f055dd")); cone.position.set(0.32, 0.13, 0); arch.add(cone);
    add("archimedes", arch);
    // axes with arrows and labels
    const axes = new THREE.Group(); axes.position.set(0.15, 0.0, 0.15);
    for (const [d, c, lab] of [[V(1, 0, 0), "#ff5a4d", "x"], [V(0, 1, 0), "#6bffb8", "z"], [V(0, 0, 1), "#5ab4ff", "y"]]) {
      const end = d.clone().multiplyScalar(0.62); axes.add(limb(V(0, 0, 0), end, 0.004, mat(c, { detail: "none", emissive: new THREE.Color(c).multiplyScalar(0.4) }), false));
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.014, 0.04, 16), mat(c, { detail: "none" })); tip.position.copy(end); tip.quaternion.setFromUnitVectors(V(0, 1, 0), d); axes.add(tip);
      const l = text(lab, { size: 0.05, colour: c }); l.position.copy(end.clone().add(d.clone().multiplyScalar(0.05))); axes.add(l);
    }
    add("axes", axes);
    // a paraboloid with contours, and a tangent plane that slides over it
    const surf = (f, cx, cz, n = 80, ext = 0.32, colA, colB) => {
      const g = new THREE.PlaneGeometry(ext * 2, ext * 2, n, n); g.rotateX(-Math.PI / 2);
      const p = g.attributes.position, cols = [], ca = new THREE.Color(colA), cb = new THREE.Color(colB);
      for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i), y = f(x / ext, z / ext) * ext * 0.7; p.setY(i, y); const c = ca.clone().lerp(cb, Math.min(1, Math.max(0, y / (ext * 0.9) + 0.4))); const band = Math.abs(Math.sin(y * 90)) < 0.08 ? 1.6 : 1; cols.push(c.r * band, c.g * band, c.b * band); }
      g.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3)); g.computeVertexNormals();
      const m = new THREE.Mesh(g, mat("#ffffff", { vertexColors: true, detail: "none", side: THREE.DoubleSide, roughness: 0.25, clearcoat: 0.8, transparent: true, opacity: 0.92 })); m.position.set(cx, 0.02, cz); return m;
    };
    const para = surf((x, z) => x * x + z * z, 0.35, -0.15, 90, 0.3, "#5a2fbf", "#f055dd"); add("paraboloid", para);
    const tp = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.22), mat("#ffe066", { detail: "none", transparent: true, opacity: 0.55, side: THREE.DoubleSide, emissive: new THREE.Color("#5a4a00") }));
    tp.userData.moves = true; add("tangent", tp);
    const tpDot = new THREE.Mesh(new THREE.SphereGeometry(0.012, 16, 12), glow("#ffe066", 1)); decor(tpDot, "calculus");
    const setTangent = (a, b) => {   // tangent plane to z = x² + y² (in model units) at (a, b)
      const E = 0.3, f = (x, z) => ((x / E) ** 2 + (z / E) ** 2) * E * 0.7, fx = (2 * a / (E * E)) * E * 0.7, fz = (2 * b / (E * E)) * E * 0.7;
      const P = V(0.35 + a, 0.02 + f(a, b), -0.15 + b), n = V(-fx, 1, -fz).normalize();
      tp.position.copy(P); tp.quaternion.setFromUnitVectors(V(0, 0, 1), n); tpDot.position.copy(P);
    };
    setTangent(0.15, 0.08);
    // a saddle
    add("saddle", surf((x, z) => x * x - z * z + 0.2, -0.25, -0.55, 80, 0.26, "#1f6fbf", "#6bffb8"));
    // a helix and vectors
    const hp = []; for (let i = 0; i <= 300; i++) { const t = (i / 300) * Math.PI * 8; hp.push(V(0.95 + Math.cos(t) * 0.1, 0.03 + t * 0.022, 0.25 + Math.sin(t) * 0.1)); }
    add("helix", tube(hp, 0.007, mat("#ffe066", { detail: "none", emissive: new THREE.Color("#4a3c00"), clearcoat: 1 }), 600));
    k.flow([hp], "#fff3a0", 20, 0.12, "vectors", 0.014);
    const vec = (from, to, c) => { const g = new THREE.Group(); g.add(limb(from, to, 0.006, mat(c, { detail: "none", emissive: new THREE.Color(c).multiplyScalar(0.3) }), false)); const tip = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.05, 16), mat(c, { detail: "none" })); tip.position.copy(to); tip.quaternion.setFromUnitVectors(V(0, 1, 0), to.clone().sub(from).normalize()); g.add(tip); return g; };
    const o = V(0.15, 0, 0.15), a = V(0.55, 0.25, 0.25), b = V(0.2, 0.35, 0.6), cr = o.clone().add(a.clone().sub(o).cross(b.clone().sub(o)).multiplyScalar(2.2));
    const vg = new THREE.Group(); vg.add(vec(o, a, "#ff9f40")); vg.add(vec(o, b, "#f055dd")); vg.add(vec(o, cr, "#6bffb8"));
    const para4 = new THREE.BufferGeometry().setFromPoints([o, a, a.clone().add(b).sub(o), b]); para4.setIndex([0, 1, 2, 0, 2, 3]); para4.computeVertexNormals();
    vg.add(new THREE.Mesh(para4, mat("#ff9f40", { detail: "none", transparent: true, opacity: 0.25, side: THREE.DoubleSide })));
    add("vectors", vg);
    // the bivariate normal, as a glowing wireframe bell
    const bell = surf((x, z) => Math.exp(-(x * x * 2.4 + z * z * 2.4 - 1.6 * x * z)) * 1.2 - 0.0, 0.25, -0.95, 70, 0.3, "#0d4a33", "#6bffb8");
    add("normal", bell);
    // dice
    const pipTex = (n) => { const c = document.createElement("canvas"); c.width = c.height = 128; const g = c.getContext("2d"); g.fillStyle = "#f4f6fb"; g.fillRect(0, 0, 128, 128); g.fillStyle = "#1a1f2b"; const P = { 1: [[64, 64]], 2: [[32, 32], [96, 96]], 3: [[32, 32], [64, 64], [96, 96]], 4: [[32, 32], [96, 32], [32, 96], [96, 96]], 5: [[32, 32], [96, 32], [64, 64], [32, 96], [96, 96]], 6: [[32, 32], [96, 32], [32, 64], [96, 64], [32, 96], [96, 96]] }[n]; for (const [x, y] of P) { g.beginPath(); g.arc(x, y, 11, 0, 7); g.fill(); } const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; };
    const faces = [1, 6, 2, 5, 3, 4].map((n) => new THREE.MeshPhysicalMaterial({ map: pipTex(n), roughness: 0.3, clearcoat: 1 }));
    const dice = new THREE.Group(); dice.position.set(0.8, 0.05, -0.55);
    for (const [x, rx, ry] of [[0, 0.3, 0.5], [0.13, 1.2, 2.1]]) { const d = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 0.09), faces); d.position.set(x, 0, 0); d.rotation.set(rx, ry, 0); dice.add(d); }
    add("dice", dice);
    k.tick((t, dt, motion) => {
      if (!motion) return;
      spin.forEach((g, i) => { g.rotation.y = t * 0.4 + i; g.rotation.x = Math.sin(t * 0.3 + i) * 0.3; });
      setTangent(Math.cos(t * 0.5) * 0.17, Math.sin(t * 0.7) * 0.17);
    });
  },
};
