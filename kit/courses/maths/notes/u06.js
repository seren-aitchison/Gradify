// School 6: Trigonometry. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// From right-angled triangles at GCSE to identities, equations, hyperbolic functions and Fourier series.
export default `
## Basic Trigonometry
S: Trigonometry studies the relationships between the angles and sides of triangles. It began with astronomy and surveying, and today it underpins navigation, engineering, physics, music and signal processing.
O: Label the sides of a right-angled triangle relative to an angle
O: Explain what trigonometry is used for
T: Hypotenuse | The longest side of a right-angled triangle, opposite the right angle
T: Opposite and adjacent | The side across from the angle θ, and the side next to θ (not the hypotenuse)
H: Labelling
- In a right-angled triangle, pick the angle θ you're working with (not the right angle).
- **Hypotenuse (H)**: opposite the right angle, always the longest side.
- **Opposite (O)**: the side across from θ.
- **Adjacent (A)**: the side next to θ that isn't the hypotenuse.
- Labels depend on which angle you choose: the opposite for one acute angle is the adjacent for the other.
H: What trigonometry does
- It links angles to ratios of sides, so we can find unknown lengths and angles without measuring them directly.
- Ancient astronomers (Hipparchus, Ptolemy) built tables of chords; Indian mathematicians introduced the sine; the modern functions date from the 1700s (Euler).
- Uses: heights of buildings and mountains, distances to ships, roof pitches, forces in structures, waves and oscillations.
X: In triangle ABC, the right angle is at C, AB = 13, BC = 5 and AC = 12. For the angle at A, name the hypotenuse, opposite and adjacent.
> The hypotenuse is opposite the right angle: AB = 13
> Opposite angle A is side BC = 5
> Adjacent to angle A (not the hypotenuse) is AC = 12
K: Label H, O and A relative to the chosen angle; trigonometry links angles to ratios of sides.
!: Labelling sides before choosing the angle, or calling the hypotenuse the adjacent side.
Q: Which side is always the longest in a right-angled triangle? | The hypotenuse.
Q: Does the opposite side depend on which angle you choose? | Yes: it's the side across from your chosen angle.
SUM: Trigonometry links angles and side ratios.
SUM: Label sides relative to the angle.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Maor E, Trigonometric Delights (Princeton University Press 2013) | textbook | 2013 | https://press.princeton.edu/
M1#maths-u06-01-q1@1: In a right-angled triangle, which side is opposite the right angle? | The hypotenuse | The adjacent | The opposite | The base | The shortest side | The hypotenuse is always opposite the right angle and is the longest side.
M2#maths-u06-01-q2@2: For the other acute angle of the same triangle, what does the "opposite" side become? | The adjacent side | The hypotenuse | It stays the opposite | It disappears | The shortest side always | Swapping the acute angle swaps which leg is opposite and which is adjacent.

## Trigonometric Ratios
S: The trigonometric ratios sine, cosine and tangent compare pairs of sides in a right-angled triangle. Because similar triangles have equal ratios, each ratio depends only on the angle.
O: Use sin, cos and tan to find missing sides and angles
O: Recall exact values for 0°, 30°, 45°, 60° and 90°
T: SOHCAHTOA | sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent
T: Inverse ratio | Using sin^{−1}, cos^{−1} or tan^{−1} to find an angle from a ratio
H: Using the ratios
E: sin θ = O/H; cos θ = A/H; tan θ = O/A
- Missing side: choose the ratio that contains the known side and the unknown. Hypotenuse 10, angle 35°, opposite? O = 10 sin 35° ≈ 5.74.
- Missing angle: O = 4, A = 7 gives tan θ = 4/7, so θ = tan^{−1}(4/7) ≈ 29.7°.
- Make sure your calculator is in degree mode.
H: Exact values
- sin 30° = ½, cos 30° = √3/2, tan 30° = 1/√3.
- sin 45° = cos 45° = √2/2, tan 45° = 1.
- sin 60° = √3/2, cos 60° = ½, tan 60° = √3.
- From an equilateral triangle of side 2 split in half, and an isosceles right-angled triangle with legs 1.
X: A ramp rises 1.2 m over a horizontal distance of 8 m. Find the angle of the ramp, and the length of its slope.
> tan θ = 1.2/8 = 0.15, so θ = tan^{−1}(0.15) ≈ 8.5°
> Slope length = √(8^{2} + 1.2^{2}) = √65.44
> ≈ 8.09 m
- Rounding too early spoils later steps: keep the full calculator value until the final answer.
P: **Investigate with the lab.** Choose Right-angled trigonometry. Label opposite, adjacent and hypotenuse before choosing sin, cos or tan.
IX: practice
K: SOHCAHTOA: choose the ratio with the known and unknown sides; inverse functions give angles; learn the exact values.
!: Using degree values in a calculator set to radians.
Q: What is cos 60°? | 1/2.
Q: Which ratio uses opposite and adjacent? | Tangent.
SUM: Sin, cos and tan compare sides.
SUM: Exact values come from special triangles.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: trigonometry | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u06-02-q1@1: A ladder 5 m long makes an angle of 70° with the ground. How high up the wall does it reach, to 2 decimal places? | 4.7 | 0.01 | m | Height = 5 sin 70° ≈ 5 × 0.9397 = 4.70 m.
M1#maths-u06-02-q2@1: What is tan 45°? | 1 | 0 | √2/2 | √3 | 1/2 | In an isosceles right-angled triangle the opposite and adjacent sides are equal, so their ratio is 1.
M2#maths-u06-02-q3@2: In a right-angled triangle, the adjacent side is 9 and the hypotenuse is 15. What is the angle? | About 53.1° | About 36.9° | About 31.0° | About 59.0° | About 0.6° | cos θ = 9/15 = 0.6, so θ = cos^{−1}(0.6) ≈ 53.1°.
NUM1#maths-u06-02-q4@1: In a right-angled triangle the side opposite 30° is 4 cm. How long is the hypotenuse in cm? | 8 | 0 | cm | sin 30° = 4/h, so h = 4/0.5 = 8 cm.

## Sine
S: The sine of an angle starts as a ratio in a right-angled triangle and becomes a function defined for every angle, using the unit circle. Its smooth repeating graph describes waves, oscillations and anything periodic.
O: Define sine for any angle using the unit circle
O: Use the symmetry of sine to find angles with the same sine
T: Sine function | sin θ, the y-coordinate of the point at angle θ on the unit circle
T: Amplitude | The maximum distance of a wave from its centre line; for sin θ it's 1
H: Beyond right angles
- For angles beyond 90°, sin θ is the y-coordinate of the point on the unit circle at angle θ from the positive x-axis.
- sin θ is positive for 0° < θ < 180° and negative for 180° < θ < 360°.
- Range: −1 ≤ sin θ ≤ 1; period 360° (2π radians).
H: Symmetry and solving
- sin(180° − θ) = sin θ: sin 150° = sin 30° = ½.
- sin(−θ) = −sin θ: sine is an odd function.
- So sin x = 0.5 has solutions 30° and 150° between 0° and 360°: the calculator gives only one (the principal value).
- Small angles in radians: sin x ≈ x.
X: Solve sin x = −0.6 for 0° ≤ x < 360°.
> The principal value is sin^{−1}(−0.6) ≈ −36.9°, outside the range
> Sine is negative in the third and fourth quadrants: x = 180° + 36.9° and x = 360° − 36.9°
> x ≈ 216.9° or x ≈ 323.1°
- On the graph, a horizontal line y = k (with −1 < k < 1) crosses each cycle twice: that's why there are two solutions per period.
- Sound waves, alternating current and pendulum swings are all described by sine curves.
P: **Investigate with the lab.** Turn P round the circle and watch its height trace the sine graph. Find every angle between 0° and 360° where sin θ = 1/2.
IX: trig
K: sin θ is the unit circle's y-coordinate; it repeats every 360°; sin(180° − θ) = sin θ gives a second solution.
!: Giving only the calculator's principal value when an equation has several solutions in the range.
Q: What is sin 210°? | −1/2.
Q: What is the period of sin x? | 360° (2π radians).
SUM: Sine extends to all angles via the unit circle.
SUM: Symmetry gives multiple solutions.
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Maor E, Trigonometric Delights (Princeton University Press 2013) | textbook | 2013 | https://press.princeton.edu/
M1#maths-u06-03-q1@1: What is the maximum value of 5 sin x? | 5 | 1 | 0 | 10 | 5π | sin x is at most 1, so 5 sin x is at most 5: the amplitude is 5.
M2#maths-u06-03-q2@2: Which angle between 0° and 360° has the same sine as 40°? | 140° | 220° | 320° | 50° | 400° | sin(180° − θ) = sin θ, so sin 140° = sin 40°.

## Cosine
S: The cosine is the x-coordinate of the point at angle θ on the unit circle. It's the sine shifted by 90°, and it describes horizontal positions in circular motion and the phase of waves.
O: Define cosine for any angle using the unit circle
O: Use the symmetry of cosine to solve equations
T: Cosine function | cos θ, the x-coordinate of the point at angle θ on the unit circle
T: Even function | A function with f(−x) = f(x); cosine is even
H: Properties
- Range −1 ≤ cos θ ≤ 1; period 360°; cos 0° = 1, cos 90° = 0, cos 180° = −1.
- Positive in the first and fourth quadrants, negative in the second and third.
- cos θ = sin(θ + 90°): its graph is the sine graph shifted left by 90°.
- cos(−θ) = cos θ: cosine is even.
H: Symmetry and solving
- cos(360° − θ) = cos θ, so cos x = 0.5 has solutions 60° and 300° in 0° to 360°.
- cos(180° − θ) = −cos θ: cos 120° = −cos 60° = −½.
- In circular motion of radius r, x = r cos θ and y = r sin θ.
X: Solve 2 cos x + 1 = 0 for 0° ≤ x < 360°.
> cos x = −½
> The reference angle is 60°; cosine is negative in the second and third quadrants
> x = 180° − 60° = 120° or x = 180° + 60° = 240°
- On the graph, cos x = k crosses each 360° cycle twice, symmetrically about 0° and 360°.
- In a right-angled triangle cos θ = adjacent/hypotenuse, which matches the unit circle definition for acute angles.
- Engineers use the cosine to find the horizontal component of a force: F cos θ.
P: **Investigate with the lab.** Turn P round the circle and watch its horizontal position trace the cosine graph. Find an angle between 90° and 180° where cos θ = −1/2.
IX: trig
K: cos θ is the unit circle's x-coordinate; cosine is even; cos(360° − θ) = cos θ gives the second solution.
!: Assuming cos x = −0.5 means x = −60°, which isn't in the usual range.
Q: What is cos 180°? | −1.
Q: Is cosine odd or even? | Even: cos(−θ) = cos θ.
SUM: Cosine is the horizontal coordinate on the unit circle.
SUM: Its symmetry gives pairs of solutions.
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Maor E, Trigonometric Delights (Princeton University Press 2013) | textbook | 2013 | https://press.princeton.edu/
M1#maths-u06-04-q1@1: What is cos 300°? | 1/2 | −1/2 | √3/2 | −√3/2 | 0 | cos 300° = cos(360° − 60°) = cos 60° = 1/2.
M3#maths-u06-04-q2@2: How many solutions does cos x = 0.3 have for 0° ≤ x < 720°? | 4 | 2 | 1 | 3 | 8 | Two solutions per 360° period, over two periods, gives four.

## Tangent
S: The tangent of an angle is sin θ/cos θ, the gradient of the line at angle θ to the horizontal. Unlike sine and cosine, it's unbounded, with asymptotes where cos θ = 0, and it repeats every 180°.
O: Define tangent as sin θ/cos θ and interpret it as a gradient
O: Sketch tan θ and solve tangent equations
T: Tangent function | tan θ = sin θ/cos θ, undefined where cos θ = 0
T: Asymptote | A line the graph approaches but never reaches; tan θ has asymptotes at 90°, 270°, …
H: Properties
- tan θ is the gradient of a line making angle θ with the positive x-axis: a line at 45° has gradient 1.
- Period 180°: tan(θ + 180°) = tan θ.
- Range: all real numbers; asymptotes at θ = 90° + 180°n.
- Positive in the first and third quadrants.
- Odd: tan(−θ) = −tan θ.
H: Solving
- tan x = √3: x = 60° and 60° + 180° = 240° in 0° to 360°.
- Equations like sin x = 2 cos x become tan x = 2 (divide by cos x, which isn't zero at the solutions).
- Small angles in radians: tan x ≈ x.
X: Solve 3 sin x = 4 cos x for 0° ≤ x < 360°.
> Divide by cos x: tan x = 4/3
> Principal value: tan^{−1}(4/3) ≈ 53.1°
> Add 180°: x ≈ 53.1° or x ≈ 233.1°
- In a right-angled triangle tan θ = opposite/adjacent, matching sin θ/cos θ for acute angles.
- Road signs give gradients as percentages: a 10% hill rises 10 m per 100 m horizontally, so tan θ = 0.1 and θ ≈ 5.7°.
- tan θ grows without limit as θ approaches 90°, which is why a vertical line has no gradient.
K: tan θ = sin θ/cos θ is a gradient; period 180°; asymptotes where cos θ = 0; add 180° to find further solutions.
!: Adding 360° instead of 180° to find the second solution of a tangent equation.
Q: What is the period of tan x? | 180° (π radians).
Q: Where is tan x undefined? | Where cos x = 0: at 90°, 270°, and so on.
SUM: Tangent is a ratio and a gradient.
SUM: It repeats every 180° with asymptotes.
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Maor E, Trigonometric Delights (Princeton University Press 2013) | textbook | 2013 | https://press.princeton.edu/
M1#maths-u06-05-q1@1: What is the gradient of a line at 60° to the positive x-axis? | √3 | 1/2 | √3/2 | 1/√3 | 60 | The gradient of a line equals the tangent of its angle to the x-axis: tan 60° = √3 ≈ 1.73.
M2#maths-u06-05-q2@2: Solve tan x = −1 for 0° ≤ x < 360°. | 135° and 315° | 45° and 225° | 135° only | 225° and 315° | −45° | Tangent is negative in the second and fourth quadrants: 180° − 45° and 360° − 45°.

## Radians and Degrees
S: Radians measure angles by arc length: one radian is the angle subtended by an arc equal to the radius. They make calculus formulas simple, so they're the standard unit at A level and beyond.
O: Convert between radians and degrees
O: Explain why radians are used in calculus
T: Radian | The angle at the centre of a circle subtended by an arc equal in length to the radius
T: Exact radian values | Angles written as multiples of π, such as π/6 = 30°
H: Converting
- 2π radians = 360°, so π radians = 180°.
- Degrees to radians: multiply by π/180. 45° = π/4; 120° = 2π/3.
- Radians to degrees: multiply by 180/π. 1 radian ≈ 57.3°.
- Common angles: π/6 = 30°, π/4 = 45°, π/3 = 60°, π/2 = 90°.
H: Why radians?
- Arc length s = rθ and sector area ½r^{2}θ have no awkward factors.
- d/dx sin x = cos x only when x is in radians; in degrees there'd be an extra factor of π/180.
- Small angle approximations sin x ≈ x, cos x ≈ 1 − x^{2}/2 and tan x ≈ x need radians.
- Angular speed in physics is measured in radians per second.
X: Convert 150° to radians and 2.5 radians to degrees.
> 150 × π/180 = 5π/6
> 2.5 × 180/π
> ≈ 143.2°
- A full circle is 2π ≈ 6.28 radians: just over six radius-lengths of arc fit round the circumference.
- Calculators have a DEG/RAD mode: check it every time you start a calculation.
- In radians, the angle swept by a wheel turning through arc s is s/r, which links rolling distance and rotation directly.
P: **Investigate with the lab.** Switch between degrees and radians and turn P to 90°, 180° and 360°. Read each angle as a fraction of π.
IX: trig
K: π radians = 180°; multiply by π/180 or 180/π; calculus needs radians.
!: Leaving a calculator in degree mode for calculus or radian questions.
Q: What is π/3 in degrees? | 60°.
Q: Roughly how many degrees is 1 radian? | About 57.3°.
SUM: Radians measure angles by arc length.
SUM: They make calculus clean.
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
NUM1#maths-u06-06-q1@1: Convert 3π/4 radians to degrees. | 135 | 0 | ° | 3π/4 × 180/π = 135°.
M1#maths-u06-06-q2@1: What is 270° in radians? | 3π/2 | 3π/4 | 2π/3 | 3π | π/2 | Multiply degrees by π/180: 270 × π/180 = 3π/2, three quarters of a full turn.
M2#maths-u06-06-q3@2: Why is d/dx sin x = cos x only true in radians? | In degrees the derivative gains a factor of π/180 | It's true in any unit | Degrees aren't real angles | Sine isn't differentiable in degrees | Calculators require it | The limit (sin x)/x = 1 as x → 0 holds only when x is measured in radians.

## Unit Circle
S: The unit circle (radius 1, centred at the origin) defines sine and cosine for every angle: the point at angle θ is (cos θ, sin θ). It explains signs, symmetries and identities at a glance.
O: Use the unit circle to define trigonometric functions for any angle
O: Determine signs and exact values in each quadrant
T: Unit circle | The circle x^{2} + y^{2} = 1
T: Quadrant | One of four regions of the plane divided by the axes
H: Definitions
- The point at angle θ (anticlockwise from the positive x-axis) is (cos θ, sin θ).
- tan θ = sin θ/cos θ is the gradient of the radius.
- Since the point lies on x^{2} + y^{2} = 1: cos^{2} θ + sin^{2} θ = 1.
- Negative angles go clockwise; angles beyond 360° wrap around.
H: Signs and reference angles
- First quadrant: all positive. Second: sine positive. Third: tangent positive. Fourth: cosine positive ("All Students Take Calculus" or CAST, read anticlockwise from the fourth).
- Reference angle: the acute angle to the x-axis. sin 225° = −sin 45° = −√2/2.
- Exact points: at 30° the point is (√3/2, ½); at 135° it's (−√2/2, √2/2).
X: Find the exact values of sin, cos and tan of 240°.
> 240° is in the third quadrant, with reference angle 60°
> sin 240° = −sin 60° = −√3/2; cos 240° = −cos 60° = −½
> tan 240° = sin/cos = √3 (positive in the third quadrant)
P: **Investigate with the lab.** Visit all four quadrants and note the signs of sin θ and cos θ in each. Check that the exact values repeat with sign changes.
IX: trig
K: The point at angle θ is (cos θ, sin θ); use reference angles and quadrant signs (CAST) for exact values.
!: Forgetting the sign when using a reference angle.
Q: What are the coordinates on the unit circle at 90°? | (0, 1).
Q: Which functions are positive in the second quadrant? | Sine (and cosecant).
SUM: The unit circle defines trig functions for all angles.
SUM: Quadrants set the signs.
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Maor E, Trigonometric Delights (Princeton University Press 2013) | textbook | 2013 | https://press.princeton.edu/
M1#maths-u06-07-q1@1: Which point on the unit circle corresponds to 180°? | (−1, 0) | (1, 0) | (0, −1) | (0, 1) | (−1, −1) | Half a turn from (1, 0) reaches (−1, 0): cos 180° = −1 and sin 180° = 0.
M3#maths-u06-07-q2@2: What is the exact value of cos 330°? | √3/2 | −√3/2 | 1/2 | −1/2 | √2/2 | 330° is in the fourth quadrant, where cosine is positive, with reference angle 30°.

## Trigonometric Geometry
S: Trigonometry solves geometric problems: heights, distances, angles of elevation and depression, and 3D problems such as the angle between a line and a plane. It's how surveyors and engineers measure what they can't reach.
O: Solve problems with angles of elevation and depression
O: Use trigonometry in three-dimensional problems
T: Angle of elevation | The angle above the horizontal from an observer to an object
T: Angle of depression | The angle below the horizontal from an observer to an object
H: Elevation and depression
- Draw a diagram with the horizontal line and the right angle.
- The angle of depression from A to B equals the angle of elevation from B to A (alternate angles).
- Standing 40 m from a tower, the top is at an elevation of 32°: height = 40 tan 32° ≈ 25.0 m.
H: Three dimensions
- Find a right-angled triangle containing the line and its projection onto a plane.
- The angle between the space diagonal of a cuboid and its base: use the base diagonal as the adjacent side.
- Combine Pythagoras and trigonometry step by step, keeping full accuracy until the end.
X: A cuboid is 6 cm by 8 cm by 5 cm tall. Find the angle between a space diagonal and the base.
> The base diagonal is √(36 + 64) = 10 cm
> The space diagonal rises 5 cm over 10 cm horizontally: tan θ = 5/10
> θ = tan^{−1}(0.5) ≈ 26.6°
K: Draw the horizontal and the right angle; depression from A to B equals elevation from B to A; in 3D, find the right-angled triangle with the projection.
!: Measuring the angle of depression from the vertical instead of the horizontal.
Q: How are angles of elevation and depression between two points related? | They're equal (alternate angles).
Q: In 3D, which line do you use to find the angle between a line and a plane? | The line's projection onto the plane.
SUM: Trigonometry finds inaccessible lengths and angles.
SUM: 3D problems reduce to right-angled triangles.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Ordnance Survey, A guide to coordinate systems in Great Britain | guidance | 2020 | https://www.ordnancesurvey.co.uk/
NUM1#maths-u06-08-q1@1: From a cliff 80 m high, a boat is at an angle of depression of 15°. How far is it from the foot of the cliff, to the nearest metre? | 299 | 1 | m | tan 15° = 80/d, so d = 80/tan 15° ≈ 298.6 m.
M1#maths-u06-08-q2@1: A kite string 50 m long makes 40° with the ground. How high is the kite (ignoring sag)? | About 32.1 m | About 38.3 m | About 42.0 m | About 59.6 m | About 30.0 m | The string is the hypotenuse and the height is opposite 40°: 50 sin 40° ≈ 32.1 m.
M2#maths-u06-08-q3@2: The angle of elevation from A to B is 25°. What is the angle of depression from B to A? | 25° | 65° | 155° | 115° | 50° | They're alternate angles between parallel horizontal lines, so they're equal.

## Sine Rule
S: The sine rule relates the sides of any triangle to the sines of their opposite angles. It finds missing sides and angles when you know an angle and its opposite side, and it has an "ambiguous case" to watch.
O: Use the sine rule to find sides and angles
O: Recognise and solve the ambiguous case
T: Sine rule | a/sin A = b/sin B = c/sin C (sides a, b, c opposite angles A, B, C)
T: Ambiguous case | When two different triangles fit the given information (two sides and a non-included angle)
H: Using the rule
E: a/sin A = b/sin B = c/sin C (= 2R, the circumcircle's diameter)
- Finding a side: use the version with sides on top. A = 40°, B = 65°, a = 8: b = 8 sin 65°/sin 40° ≈ 11.3.
- Finding an angle: use sin A/a = sin B/b.
- Use it when you know a side and its opposite angle.
H: The ambiguous case
- Given a = 7, b = 10, A = 35°: sin B = 10 sin 35°/7 ≈ 0.819, so B ≈ 55.0° or B ≈ 125.0°.
- Both are valid if the angle sum stays under 180° (35 + 125 = 160 ✓), giving two triangles.
- Always check whether the obtuse option works.
X: In triangle PQR, P = 52°, Q = 71° and r = 15 cm. Find p.
> R = 180 − 52 − 71 = 57°
> p/sin 52° = 15/sin 57°
> p = 15 sin 52°/sin 57° ≈ 14.1 cm
- The rule follows from dropping a perpendicular from one vertex: the height equals b sin A and also a sin B, so a sin B = b sin A.
- Surveyors use it in triangulation: measure one baseline and two angles, then compute distances to far points.
- If sin B comes out greater than 1, no triangle fits the data.
K: Pair each side with its opposite angle; sides on top to find a side; check the ambiguous case when finding an angle.
!: Missing the obtuse solution in the ambiguous case.
Q: When do you use the sine rule? | When you know a side and its opposite angle.
Q: Why can the sine rule give two answers for an angle? | sin θ = sin(180° − θ), so an acute and an obtuse angle share a sine.
SUM: The sine rule works in any triangle.
SUM: Watch for the ambiguous case.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
NUM1#maths-u06-09-q1@1: In a triangle, A = 30°, a = 6 and B = 90°. Find b. | 12 | 0 |  | b = 6 sin 90°/sin 30° = 6/0.5 = 12.
M1#maths-u06-09-q2@1: Which information makes the sine rule the right tool? | Two angles and any side | Three sides | Two sides and the included angle | Three angles only | One side only | Knowing two angles gives the third, and every side then pairs with its opposite angle.
M3#maths-u06-09-q3@2: For a = 5, b = 8, A = 30°, how many triangles are possible? | Two | One | None | Three | Infinitely many | sin B = 8 × 0.5/5 = 0.8, so B ≈ 53.1° or 126.9°; both give valid angle sums.

## Cosine Rule
S: The cosine rule generalises Pythagoras' theorem to any triangle. It finds a side from two sides and the included angle, or an angle from three sides.
O: Use the cosine rule to find sides and angles
O: Choose between the sine and cosine rules
T: Cosine rule | a^{2} = b^{2} + c^{2} − 2bc cos A
T: Included angle | The angle between two given sides
H: The rule
E: a^{2} = b^{2} + c^{2} − 2bc cos A; cos A = (b^{2} + c^{2} − a^{2})/(2bc)
- With A = 90°, cos A = 0 and it becomes Pythagoras.
- Side: b = 7, c = 9, A = 50°: a^{2} = 49 + 81 − 126 cos 50° ≈ 49.0, so a ≈ 7.0.
- Angle: sides 5, 7, 8: cos C = (25 + 49 − 64)/(2 × 5 × 7) = 10/70, so C ≈ 81.8°.
H: Choosing a rule
- Two sides and the included angle, or three sides: the cosine rule.
- A side with its opposite angle: the sine rule.
- An obtuse angle gives a negative cosine: the cosine rule handles it with no ambiguity.
- Navigation: ships on different bearings, with the angle between their paths.
X: Two ships leave a port. One sails 12 km on a bearing of 040°, the other 15 km on a bearing of 110°. How far apart are they?
> The angle between their paths is 110° − 40° = 70°
> d^{2} = 12^{2} + 15^{2} − 2 × 12 × 15 × cos 70° = 144 + 225 − 123.1
> d^{2} ≈ 245.9, so d ≈ 15.7 km
K: a^{2} = b^{2} + c^{2} − 2bc cos A; use it for SAS (a side) or SSS (an angle); it reduces to Pythagoras at 90°.
!: Calculating b^{2} + c^{2} − 2bc and then multiplying by cos A (do the multiplication first).
Q: What does the cosine rule become when A = 90°? | Pythagoras' theorem.
Q: Which rule finds an angle from three sides? | The cosine rule.
SUM: The cosine rule generalises Pythagoras.
SUM: Use it for SAS and SSS triangles.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
NUM1#maths-u06-10-q1@1: A triangle has sides 3, 5 and 7. Find its largest angle in degrees. | 120 | 0.1 | ° | cos C = (9 + 25 − 49)/30 = −1/2, so C = 120°.
M1#maths-u06-10-q2@1: Which rule finds a side from two sides and the included angle? | The cosine rule | The sine rule | Pythagoras only | SOHCAHTOA only | The area rule | With SAS there's no side–angle opposite pair, so the cosine rule is needed.
M2#maths-u06-10-q3@2: In a triangle, cos A is negative. What does that tell you? | A is obtuse | A is acute | A is a right angle | The triangle doesn't exist | A is 0° | Cosine is negative for angles between 90° and 180°.

## Area of a Triangle
S: The area of any triangle can be found from two sides and the included angle: ½ab sin C. It extends ½ × base × height to triangles whose height you don't know.
O: Use area = ½ab sin C
O: Find sides or angles from a given area
T: Included angle | The angle between the two sides used in the formula
T: Heron's formula | Area = √(s(s − a)(s − b)(s − c)), where s is half the perimeter
H: The formula
E: Area = ½ab sin C
- It comes from ½ × base × height with height = b sin C.
- a = 8, b = 11, C = 40°: area = ½ × 8 × 11 × sin 40° ≈ 28.3.
- Reverse: if the area is 20, a = 6 and b = 10, then sin C = 40/60 = ⅔, so C ≈ 41.8° or 138.2°.
H: Other methods
- Heron's formula for three sides: sides 13, 14, 15 give s = 21 and area = √(21 × 8 × 7 × 6) = 84.
- Coordinates: area = ½|x₁(y₂ − y₃) + x₂(y₃ − y₁) + x₃(y₁ − y₂)|.
- Segments: sector area minus triangle area, ½r^{2}(θ − sin θ) in radians.
X: Find the area of a triangle with sides 7 cm and 9 cm enclosing an angle of 120°.
> Area = ½ × 7 × 9 × sin 120°
> sin 120° = √3/2
> Area = 63√3/4 ≈ 27.3 cm^{2}
- Any side can be the base: use the two sides that meet at the known angle.
- Land surveyors split irregular fields into triangles and add their areas.
- For an equilateral triangle of side s, the formula gives (√3/4)s^{2}.
- The formula is greatest when C = 90°: for fixed sides a and b, a right angle gives the largest area.
K: Area = ½ab sin C with C the included angle; Heron's formula uses three sides.
!: Using an angle that isn't between the two sides.
Q: What is the area of a triangle with sides 4 and 5 and included angle 30°? | 5.
Q: Why can a given area lead to two possible angles? | sin C = sin(180° − C).
SUM: ½ab sin C finds areas without heights.
SUM: Heron's formula uses three sides.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Maor E, Trigonometric Delights (Princeton University Press 2013) | textbook | 2013 | https://press.princeton.edu/
NUM1#maths-u06-11-q1@1: Find the area of an equilateral triangle with side 10 cm, to 1 decimal place. | 43.3 | 0.05 | cm² | ½ × 10 × 10 × sin 60° = 50 × √3/2 = 25√3 ≈ 43.3 cm^{2}.
M1#maths-u06-11-q2@1: Which pieces of information does ½ab sin C need? | Two sides and the angle between them | Three sides | Two angles and a side | One side and its opposite angle | Three angles | C must be the included angle between sides a and b.
M2#maths-u06-11-q3@2: Using Heron's formula, what is the area of a 5, 12, 13 triangle? | 30 | 60 | 15 | 65 | 39 | s = 15, so √(15 × 10 × 3 × 2) = √900 = 30 (it's right-angled: ½ × 5 × 12).

## Spherical Trigonometry
S: Spherical trigonometry solves triangles drawn on a sphere, whose sides are arcs of great circles. It's the mathematics of navigation, astronomy and geodesy, and it differs from plane trigonometry because the sphere is curved.
O: Use the spherical cosine rule
O: Calculate great-circle distances between places on the Earth
T: Spherical triangle | A triangle on a sphere whose sides are arcs of great circles
T: Haversine formula | A numerically stable formula for the great-circle distance between two latitude–longitude points
H: Formulas
- Sides are measured as angles at the sphere's centre (a, b, c), with angles A, B, C between the sides.
- Spherical cosine rule: cos a = cos b cos c + sin b sin c cos A.
- Spherical sine rule: sin a/sin A = sin b/sin B = sin c/sin C.
- Angles add to more than 180°; the excess gives the area (School 5).
H: Distances on the Earth
- For points with latitudes φ₁, φ₂ and longitude difference Δλ: cos d = sin φ₁ sin φ₂ + cos φ₁ cos φ₂ cos Δλ, where d is the central angle; distance = Rd.
- The haversine formula avoids rounding problems for nearby points: GPS and mapping software use it.
- Celestial navigation uses the same formulas with the stars.
X: Find the great-circle distance between two points on the equator at longitudes 0° and 90° (R = 6,371 km).
> φ₁ = φ₂ = 0, so cos d = 0 + 1 × 1 × cos 90° = 0
> d = 90° = π/2 radians
> Distance = 6,371 × π/2 ≈ 10,008 km
K: Spherical triangles have arc sides measured as angles; the spherical cosine rule gives great-circle distances.
!: Using plane trigonometry over long distances on the Earth.
Q: What are the sides of a spherical triangle? | Arcs of great circles, measured by central angles.
Q: Which formula do GPS systems use for distances? | The haversine formula (or a more accurate ellipsoidal version).
SUM: Spherical trigonometry handles triangles on spheres.
SUM: It gives great-circle distances.
SRC: Todhunter I, Spherical Trigonometry (Macmillan 1886) | textbook | 1886 | https://archive.org/
SRC: Ordnance Survey, A guide to coordinate systems in Great Britain | guidance | 2020 | https://www.ordnancesurvey.co.uk/
M1#maths-u06-12-q1@1: In spherical trigonometry, what do the angles of a triangle add up to? | More than 180° | Exactly 180° | Less than 180° | Exactly 360° | 90° | Positive curvature gives an angle excess.
M2#maths-u06-12-q2@2: Two places on the same meridian are at latitudes 10°N and 40°N. What is the central angle between them? | 30° | 50° | 40° | 10° | 400° | Along a meridian, the central angle is the difference in latitude.

## Trigonometric Graphs
S: The graphs of sine, cosine and tangent show their periodic behaviour. Transforming them, with amplitude, period, phase shift and vertical shift, models waves, tides and cycles.
O: Sketch the graphs of sin, cos and tan
O: Describe transformations of trigonometric graphs
T: Period | The length of one complete cycle: 360° for sin and cos, 180° for tan
T: Phase shift | A horizontal translation of a periodic graph
H: The basic graphs
- y = sin x: starts at 0, maximum 1 at 90°, back to 0 at 180°, minimum −1 at 270°.
- y = cos x: starts at 1, the sine graph shifted left by 90°.
- y = tan x: through the origin, asymptotes at ±90°, period 180°.
H: Transformations
- y = a sin x: amplitude |a|.
- y = sin bx: period 360°/b (or 2π/b in radians).
- y = sin(x + c): shift left by c.
- y = sin x + d: shift up by d (the centre line moves to y = d).
- y = 3 sin 2x + 1: amplitude 3, period 180°, oscillating between −2 and 4.
X: Describe y = 2 cos(x − 30°) − 1 and state its maximum and minimum.
> Amplitude 2, period 360°, shifted right 30° and down 1
> Maximum 2 − 1 = 1, at x = 30°
> Minimum −2 − 1 = −3, at x = 210°
- Read graphs from key points: zeros, maxima and minima every quarter period.
- Graphing software and the graph explorer let you change a, b, c and d and watch each effect separately.
- Apply horizontal changes in the right order: for sin(2x + 60°), factorise to sin 2(x + 30°), a shift of 30°, not 60°.
P: **Investigate with the lab.** Do the sine-wave challenge: change a, b and c one at a time and note what happens to the amplitude, period and midline.
IX: grapher
P: **Investigate with the lab.** Make y = 3 sin(2x) + 1 one transformation at a time: amplitude, then period, then the vertical shift. Predict each change before you make it.
IX: trig
K: Amplitude |a|, period 360°/b, phase shift −c, vertical shift d for y = a sin(bx + c) + d.
!: Thinking sin 2x has period 720° (it's 180°: the 2 speeds the cycle up).
Q: What is the period of y = cos 3x? | 120°.
Q: What is the range of y = 4 sin x − 1? | −5 ≤ y ≤ 3.
SUM: Trig graphs repeat periodically.
SUM: Four parameters transform them.
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
NUM1#maths-u06-13-q1@1: What is the period, in degrees, of y = sin(x/2)? | 720 | 0 | ° | Period = 360°/b with b = 1/2, giving 720°.
M1#maths-u06-13-q2@1: What is the amplitude of y = −5 sin x? | 5 | −5 | 1 | 10 | 0 | Amplitude is |a|: the negative sign reflects the graph but doesn't change its height.
M2#maths-u06-13-q3@2: Which describes y = sin(x + 90°)? | It's the same as y = cos x | It's y = sin x shifted right 90° | It has period 90° | It has amplitude 90 | It's y = −sin x | Adding 90° inside the bracket shifts sine left by 90°, which gives the cosine graph.
NUM1#maths-u06-13-q4@1: What is the period of y = 3 sin(2x) + 1, in radians, to 3 decimal places? | 3.142 | 0.001 |  | The period is 2π/b = 2π/2 = π ≈ 3.142.

## Periodic Functions
S: A periodic function repeats its values at regular intervals. Tides, seasons, heartbeats, sound and alternating current are all periodic, and trigonometric functions are the building blocks for modelling them.
O: Identify the period of a periodic function
O: Describe real-world periodic phenomena with functions
T: Periodic function | A function with f(x + T) = f(x) for all x, for some T > 0
T: Fundamental period | The smallest positive T that works
H: Periods
- sin and cos: 2π; tan: π; |sin x|: π; sin 3x: 2π/3.
- A sum of periodic functions is periodic if the ratio of their periods is rational: sin 2x + sin 3x has period 2π.
- sin x + sin(√2 x) isn't periodic (an irrational ratio), though it looks almost periodic.
H: Real-world cycles
- Frequency f = 1/T (cycles per unit time); angular frequency ω = 2πf, so y = A sin(ωt).
- UK mains electricity: 50 Hz, so the period is 0.02 s.
- Tides: about 12 hours 25 minutes between high tides.
- Non-sinusoidal periodic signals (square, sawtooth waves) are sums of sines: Fourier series (later in this school).
X: Water depth in a harbour is d = 5 + 3 sin(πt/6) metres, with t in hours. Find the period and the maximum depth.
> Period = 2π ÷ (π/6) = 12 hours
> Maximum when sin = 1: d = 5 + 3
> = 8 m
- Non-trigonometric examples: the fractional part of x has period 1; a square wave alternates between two values.
P: **Investigate with the lab.** Change the frequency B and read the period as 360°/B. Find the B that gives a period of 180°.
IX: trig
K: Periodic means f(x + T) = f(x); period 2π/ω for sin ωt; frequency is 1/period.
!: Confusing frequency with period: one is the reciprocal of the other.
Q: What is the period of a 50 Hz signal? | 0.02 s.
Q: What is the period of |sin x|? | π.
SUM: Periodic functions repeat.
SUM: Many natural and technical cycles are periodic.
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stroud KA, Booth DJ, Engineering Mathematics (8th edn, Bloomsbury 2020) | textbook | 2020 | https://www.bloomsbury.com/
NUM1#maths-u06-14-q1@1: A wave has angular frequency 4π rad/s. What is its period in seconds? | 0.5 | 0 | s | T = 2π/ω = 2π/4π = 0.5 s.
M1#maths-u06-14-q2@1: What is the frequency of a wave with period 0.25 s? | 4 Hz | 0.25 Hz | 25 Hz | 2 Hz | 40 Hz | Frequency is the reciprocal of the period: f = 1/T = 1/0.25 = 4 cycles per second.
M3#maths-u06-14-q3@2: What is the period of sin 2x + cos 3x? | 2π | π | 2π/3 | 6π | It isn't periodic | The periods π and 2π/3 have least common multiple 2π.

## Cosecant
S: Cosecant is the reciprocal of sine: cosec θ = 1/sin θ. It appears in identities, calculus and some physics formulas, and its graph has asymptotes wherever sin θ = 0.
O: Evaluate cosec θ and sketch its graph
O: Solve equations involving cosec θ
T: Cosecant | cosec θ = 1/sin θ (also written csc θ)
T: Reciprocal function | 1/f(x), large where f is small, with asymptotes where f = 0
H: Properties
- Undefined where sin θ = 0: at 0°, 180°, 360°, ….
- Range: cosec θ ≤ −1 or cosec θ ≥ 1 (it's never between −1 and 1).
- Period 360°; minimum branches of 1 where sin θ = 1, maximum branches of −1 where sin θ = −1.
- Exact values: cosec 30° = 2; cosec 45° = √2; cosec 60° = 2/√3.
H: Identities and calculus
- 1 + cot^{2} θ = cosec^{2} θ (divide sin^{2} θ + cos^{2} θ = 1 by sin^{2} θ).
- d/dx cosec x = −cosec x cot x.
- Solve cosec x = k by turning it into sin x = 1/k.
X: Solve cosec x = −2 for 0° ≤ x < 360°.
> sin x = −1/2
> Reference angle 30°; sine is negative in the third and fourth quadrants
> x = 210° or x = 330°
- Sketch cosec x from the sine graph: where sin x is small the reciprocal is large, and where sin x = ±1 the curves touch ±1.
- Each branch is U-shaped (above the axis) or an upside-down U (below), between consecutive asymptotes.
- Physics example: in Snell's law and the critical angle, cosec appears as 1/sin.
- Many calculators have no cosec button: calculate 1/sin x instead.
K: cosec θ = 1/sin θ; never between −1 and 1; convert to sine to solve equations.
!: Writing cosec θ = sin^{−1} θ (the inverse sine is a different thing).
Q: What is cosec 90°? | 1.
Q: Where is cosec θ undefined? | Where sin θ = 0.
SUM: Cosecant is the reciprocal of sine.
SUM: Convert to sine to solve.
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stroud KA, Booth DJ, Engineering Mathematics (8th edn, Bloomsbury 2020) | textbook | 2020 | https://www.bloomsbury.com/
M1#maths-u06-15-q1@1: What is the exact value of cosec 30°? | 2 | 1/2 | √3 | 2/√3 | √2 | Cosecant is the reciprocal of sine; sin 30° = 1/2, so cosec 30° = 2.
M2#maths-u06-15-q2@2: Which value can cosec θ never take? | 0.5 | 1 | −1 | 2 | −3 | |sin θ| ≤ 1, so |cosec θ| ≥ 1: values strictly between −1 and 1 are impossible.

## Secant
S: Secant is the reciprocal of cosine: sec θ = 1/cos θ. It's essential in calculus, where d/dx tan x = sec^{2} x, and in identities linking tan and sec.
O: Evaluate sec θ and sketch its graph
O: Use the identity 1 + tan^{2} θ = sec^{2} θ
T: Secant | sec θ = 1/cos θ
T: Pythagorean identity for secant | 1 + tan^{2} θ = sec^{2} θ
H: Properties
- Undefined where cos θ = 0: at 90°, 270°, ….
- Range: sec θ ≤ −1 or sec θ ≥ 1; period 360°; even function.
- Exact values: sec 0° = 1; sec 60° = 2; sec 45° = √2; sec 30° = 2/√3.
H: Identities and calculus
- Divide sin^{2} θ + cos^{2} θ = 1 by cos^{2} θ: tan^{2} θ + 1 = sec^{2} θ.
- d/dx tan x = sec^{2} x; d/dx sec x = sec x tan x.
- ∫ sec^{2} x dx = tan x + c; ∫ sec x dx = ln|sec x + tan x| + c.
- Use the identity to solve equations mixing tan and sec: turn sec^{2} x into 1 + tan^{2} x.
X: Solve 2 sec^{2} x − 3 tan x − 3 = 0 for 0° ≤ x < 180°.
> Replace sec^{2} x: 2(1 + tan^{2} x) − 3 tan x − 3 = 0, so 2 tan^{2} x − 3 tan x − 1 = 0
> tan x = (3 ± √17)/4: tan x ≈ 1.781 or tan x ≈ −0.281
> x ≈ 60.7° or x ≈ 164.3°
- Sketch sec x from the cosine graph: asymptotes where cos x = 0, touching ±1 where cos x = ±1.
- Calculators have no sec button: compute 1/cos x.
- The name comes from the Latin secare, to cut: in the unit circle, sec θ is the length of a line cutting the circle.
K: sec θ = 1/cos θ; 1 + tan^{2} θ = sec^{2} θ turns sec equations into tan quadratics.
!: Writing sec θ = cos^{−1} θ.
Q: What is sec 60°? | 2.
Q: Write sec^{2} θ in terms of tan θ. | 1 + tan^{2} θ.
SUM: Secant is the reciprocal of cosine.
SUM: 1 + tan^{2} = sec^{2} links them.
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stroud KA, Booth DJ, Engineering Mathematics (8th edn, Bloomsbury 2020) | textbook | 2020 | https://www.bloomsbury.com/
NUM1#maths-u06-16-q1@1: If tan θ = 3/4, find sec^{2} θ. | 1.5625 | 0.0001 |  | sec^{2} θ = 1 + tan^{2} θ = 1 + 9/16 = 25/16 = 1.5625.
M1#maths-u06-16-q2@1: What is d/dx (tan x)? | sec^{2} x | sec x tan x | cos^{2} x | −cosec^{2} x | 1/(1 + x^{2}) | By the quotient rule, (cos^{2} x + sin^{2} x)/cos^{2} x = 1/cos^{2} x = sec^{2} x.
M3#maths-u06-16-q3@2: Solve sec x = 2 for 0 ≤ x < 2π. | x = π/3 or x = 5π/3 | x = π/6 or 5π/6 | x = π/3 only | x = 2π/3 or 4π/3 | x = π/4 or 7π/4 | cos x = 1/2 gives π/3 and 2π − π/3 = 5π/3.

## Cotangent
S: Cotangent is the reciprocal of tangent: cot θ = cos θ/sin θ. It's the gradient of the radius measured from the y-axis, and it completes the set of six trigonometric functions.
O: Evaluate cot θ and sketch its graph
O: Use the identity 1 + cot^{2} θ = cosec^{2} θ
T: Cotangent | cot θ = 1/tan θ = cos θ/sin θ
T: Complementary angle | 90° − θ; cot θ = tan(90° − θ)
H: Properties
- Undefined where sin θ = 0: at 0°, 180°, …; zero where cos θ = 0: at 90°, 270°, ….
- Period 180°; decreasing on each branch; range all real numbers.
- cot 45° = 1; cot 30° = √3; cot 60° = 1/√3.
- Co-functions: cot θ = tan(90° − θ), just as cos θ = sin(90° − θ) and cosec θ = sec(90° − θ).
H: Identities and calculus
- 1 + cot^{2} θ = cosec^{2} θ.
- d/dx cot x = −cosec^{2} x; ∫ cot x dx = ln|sin x| + c.
- Solve by converting to tan: cot x = 3 means tan x = 1/3.
X: Solve 3 cot^{2} x = 1 for 0° ≤ x < 360°.
> cot^{2} x = 1/3, so tan^{2} x = 3, so tan x = ±√3
> tan x = √3: x = 60°, 240°; tan x = −√3: x = 120°, 300°
> x = 60°, 120°, 240°, 300°
- Sketch cot x from the tan graph: where tan x has an asymptote, cot x is zero, and vice versa.
- Each branch decreases from +∞ to −∞ between asymptotes at multiples of 180°.
- Calculators have no cot button: compute 1/tan x, or cos x/sin x when tan x is undefined.
- In surveying, cot appears as horizontal distance per unit of height.
K: cot θ = cos θ/sin θ; 1 + cot^{2} θ = cosec^{2} θ; convert to tan to solve.
!: Writing cot θ = tan^{−1} θ.
Q: What is cot 45°? | 1.
Q: Where is cot θ equal to 0? | Where cos θ = 0: 90°, 270°, …
SUM: Cotangent is the reciprocal of tangent.
SUM: Its identity links it with cosecant.
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stroud KA, Booth DJ, Engineering Mathematics (8th edn, Bloomsbury 2020) | textbook | 2020 | https://www.bloomsbury.com/
M1#maths-u06-17-q1@1: What is cot 30°? | √3 | 1/√3 | 1/2 | 2 | √3/2 | Cotangent is the reciprocal of tangent; tan 30° = 1/√3, so cot 30° = √3.
M2#maths-u06-17-q2@2: Which identity is correct? | 1 + cot^{2} θ = cosec^{2} θ | 1 + cot^{2} θ = sec^{2} θ | cot^{2} θ − 1 = cosec^{2} θ | cot^{2} θ + sec^{2} θ = 1 | cot θ + tan θ = 1 | Dividing sin^{2} θ + cos^{2} θ = 1 by sin^{2} θ gives 1 + cot^{2} θ = cosec^{2} θ.

## Inverse Trigonometric Functions
S: The inverse trigonometric functions arcsin, arccos and arctan give an angle from a ratio. Because sine and the others aren't one-to-one, their inverses use restricted ranges called principal values.
O: State the domains and ranges of arcsin, arccos and arctan
O: Evaluate inverse trig functions and use them in calculus
T: Principal value | The single value an inverse function returns, from its restricted range
T: Arcsin | sin^{−1} x: the angle in [−π/2, π/2] whose sine is x
H: Domains and ranges
- arcsin x: domain [−1, 1], range [−π/2, π/2].
- arccos x: domain [−1, 1], range [0, π].
- arctan x: domain all reals, range (−π/2, π/2).
- Their graphs are reflections of the restricted sin, cos and tan graphs in y = x.
H: Evaluating and calculus
- arcsin(½) = π/6; arccos(−½) = 2π/3; arctan(1) = π/4.
- sin(arcsin x) = x always, but arcsin(sin x) = x only for x in [−π/2, π/2]: arcsin(sin π) = 0.
- d/dx arcsin x = 1/√(1 − x^{2}); d/dx arctan x = 1/(1 + x^{2}).
- So ∫ 1/(1 + x^{2}) dx = arctan x + c, and ∫_{0}^{1} 1/(1 + x^{2}) dx = π/4.
X: Find the exact value of cos(arcsin(3/5)).
> Let θ = arcsin(3/5), so sin θ = 3/5 with θ in [−π/2, π/2], where cos θ ≥ 0
> cos θ = √(1 − 9/25) = √(16/25)
> = 4/5
- On a calculator, sin^{−1} means arcsin, not 1/sin: the notation is easy to misread.
- Navigation and robotics use atan2(y, x), a two-argument arctan that returns the angle in the correct quadrant.
K: Inverse trig functions return principal values in restricted ranges; know their derivatives for calculus.
!: Confusing sin^{−1} x (arcsin) with 1/sin x (cosec).
Q: What is the range of arctan x? | −π/2 < y < π/2.
Q: What is arccos(0)? | π/2.
SUM: Inverse trig functions give angles from ratios.
SUM: Restricted ranges make them functions.
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stewart J, Clegg D, Watson S, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.co.uk/
M1#maths-u06-18-q1@1: What is arcsin(1)? | π/2 | π | 0 | π/4 | 1 | sin(π/2) = 1, and π/2 lies in arcsin's range.
M3#maths-u06-18-q2@2: What is arccos(cos(5π/3))? | π/3 | 5π/3 | −π/3 | 2π/3 | 4π/3 | cos(5π/3) = 1/2, and arccos returns the value in [0, π], which is π/3.

## Sinusoidal Modelling
S: Sinusoidal models y = A sin(B(t − C)) + D describe repeating real-world patterns: tides, daylight hours, temperatures, sound and populations. Fitting one means reading off amplitude, period, phase and midline from data.
O: Build a sinusoidal model from maximum, minimum and period
O: Use a model to make predictions and interpret its parameters
T: Midline | The horizontal centre line of the wave, y = D = (max + min)/2
T: Phase | The horizontal position of a wave: where in its cycle it is at t = 0
H: Building a model
- Amplitude A = (max − min)/2; midline D = (max + min)/2.
- B = 2π/period (in radians).
- C: the time of a reference point (sin starts at the midline going up; cos starts at a maximum).
- Choose cos for data that starts at a maximum: y = A cos(B(t − t_{max})) + D.
H: Using and judging models
- Daylight in London: about 16.5 hours in June and 7.8 in December: amplitude about 4.35 hours, midline about 12.15 hours, period 365 days.
- Check predictions against data; real cycles may drift or have unequal halves.
- Combining sinusoids models more complex patterns (Fourier, later in this school).
X: A Ferris wheel of diameter 40 m has its centre 22 m above the ground and turns once every 10 minutes. A rider starts at the bottom. Find h(t).
> Amplitude 20, midline 22, period 10, so B = 2π/10 = π/5
> At t = 0 the rider is at the minimum, so use −cos
> h(t) = 22 − 20 cos(πt/5) metres
K: Amplitude is half the range, the midline is the average of max and min, B = 2π/period; choose sin or cos to match the start.
!: Using the full range (max − min) as the amplitude instead of half of it.
Q: A wave varies between 3 and 11. What are its amplitude and midline? | Amplitude 4, midline y = 7.
Q: A cycle takes 24 hours. What is B (in radians per hour)? | π/12.
SUM: Sinusoidal models capture cycles.
SUM: Four parameters fit the data.
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: HM Nautical Almanac Office, Sunrise and sunset times | data | 2025 | https://www.gov.uk/government/organisations/uk-hydrographic-office
NUM1#maths-u06-19-q1@1: For h(t) = 22 − 20 cos(πt/5), what is the height at t = 5 minutes? | 42 | 0 | m | cos(π) = −1, so h = 22 + 20 = 42 m: the top of the wheel.
M1#maths-u06-19-q2@1: Temperature varies from 4°C to 20°C over a year. What is the amplitude of a sinusoidal model? | 8°C | 16°C | 12°C | 4°C | 20°C | The amplitude is half the range between maximum and minimum: (20 − 4)/2 = 8°C.
M2#maths-u06-19-q3@2: Which function starts at its maximum when t = 0? | y = 3 cos(2t) + 1 | y = 3 sin(2t) + 1 | y = −3 cos(2t) + 1 | y = 3 sin(2t − π) | y = −3 sin(2t) | cos(0) = 1, so y = 3 cos 2t + 1 starts at its maximum of 4.

## Harmonic Functions
S: Harmonic motion is motion described by sines and cosines: springs, pendulums, vibrating strings and AC circuits. Combining waves of the same frequency always gives another wave of that frequency, written R sin(x + α).
O: Express a sin x + b cos x as R sin(x + α)
O: Use the harmonic form to find maxima and solve equations
T: Harmonic form | a sin x + b cos x = R sin(x + α), with R = √(a^{2} + b^{2}) and tan α = b/a
T: Simple harmonic motion | Motion with acceleration proportional and opposite to displacement: x = A cos(ωt + φ)
H: The R form
- Expand R sin(x + α) = R cos α sin x + R sin α cos x and match coefficients: R cos α = a, R sin α = b.
- 3 sin x + 4 cos x = 5 sin(x + 53.1°): R = 5, tan α = 4/3.
- Maximum value R when x + α = 90°; minimum −R.
- Similar forms: R cos(x − α) and R sin(x − α), chosen to match the signs.
H: Physics
- Simple harmonic motion solves d^{2}x/dt^{2} = −ω^{2}x, giving x = A cos(ωt) + B sin(ωt) = R cos(ωt − φ).
- Musical notes: a fundamental frequency with harmonics at whole-number multiples.
- (In higher maths, "harmonic function" also means a solution of Laplace's equation: School 10.)
X: Solve 3 sin x + 4 cos x = 2 for 0° ≤ x < 360°.
> Write as 5 sin(x + 53.13°) = 2, so sin(x + 53.13°) = 0.4
> x + 53.13° = 23.58° + 360° = 383.58°, or 180° − 23.58° = 156.42°
> x ≈ 103.3° or x ≈ 330.4°
- The angle α is called the phase shift: it tells you how far the combined wave is ahead of a pure sine wave.
K: a sin x + b cos x = R sin(x + α) with R = √(a^{2} + b^{2}); maximum R; use it to solve equations.
!: Taking R = a + b instead of √(a^{2} + b^{2}).
Q: What is the maximum value of 5 sin x + 12 cos x? | 13.
Q: What equation describes simple harmonic motion? | d^{2}x/dt^{2} = −ω^{2}x.
SUM: Waves of one frequency combine into one wave.
SUM: The R form gives maxima and solves equations.
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stroud KA, Booth DJ, Engineering Mathematics (8th edn, Bloomsbury 2020) | textbook | 2020 | https://www.bloomsbury.com/
NUM1#maths-u06-20-q1@1: Find R when 8 sin x − 6 cos x is written as R sin(x − α). | 10 | 0 |  | R = √(64 + 36) = 10.
M1#maths-u06-20-q2@1: What is the minimum value of 7 sin x + 24 cos x? | −25 | −31 | −7 | 0 | −24 | R = √(49 + 576) = 25, so the minimum is −25.
M2#maths-u06-20-q3@2: What is the period of x = 3 cos(4t + 1)? | π/2 | 4 | 2π | π/4 | 8π | For cos(ωt + φ) the period is 2π/ω; here ω = 4, so the period is π/2.

## Trigonometric Identities
S: Trigonometric identities are equations true for every angle. They simplify expressions, prove results and turn hard equations into solvable ones, and they're essential for integration.
O: Use the fundamental identities to simplify and prove
O: Write clear identity proofs working from one side
T: Identity | An equation true for all values of the variable, written with ≡
T: Pythagorean identity | sin^{2} θ + cos^{2} θ ≡ 1
H: The fundamentals
E: tan θ ≡ sin θ/cos θ; sin^{2} θ + cos^{2} θ ≡ 1; 1 + tan^{2} θ ≡ sec^{2} θ; 1 + cot^{2} θ ≡ cosec^{2} θ
- Rearranged forms: sin^{2} θ ≡ 1 − cos^{2} θ; cos^{2} θ ≡ 1 − sin^{2} θ.
- Use them to replace one function with another, so an equation has only one trig function.
H: Proving identities
- Start with one side (usually the more complicated) and transform it into the other; don't work on both sides at once.
- Useful moves: write everything in sin and cos; combine fractions; factorise; use the Pythagorean identity.
- Prove (1 − cos^{2} θ)/sin θ ≡ sin θ: LHS = sin^{2} θ/sin θ = sin θ ✓.
X: Prove that (sin θ + cos θ)^{2} ≡ 1 + 2 sin θ cos θ.
> LHS = sin^{2} θ + 2 sin θ cos θ + cos^{2} θ
> = (sin^{2} θ + cos^{2} θ) + 2 sin θ cos θ
> = 1 + 2 sin θ cos θ = RHS
- Check a claimed identity numerically first: if it fails at θ = 30°, it isn't an identity.
K: Learn tan = sin/cos and the three Pythagorean identities; prove by transforming one side into the other.
!: Treating an identity as an equation and "solving" both sides together.
Q: Simplify cos^{2} θ + sin^{2} θ. | 1.
Q: Write sin^{2} θ in terms of cos θ. | 1 − cos^{2} θ.
SUM: Identities hold for all angles.
SUM: Prove them from one side to the other.
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Maor E, Trigonometric Delights (Princeton University Press 2013) | textbook | 2013 | https://press.princeton.edu/
M1#maths-u06-21-q1@1: Simplify sin θ/tan θ. | cos θ | sin^{2} θ | 1 | tan θ | sec θ | Dividing by tan θ means multiplying by cos θ/sin θ: sin θ × cos θ/sin θ = cos θ.
M2#maths-u06-21-q2@2: Simplify (1 − sin^{2} θ)/cos θ. | cos θ | sin θ | 1 | sec θ | tan θ | 1 − sin^{2} θ = cos^{2} θ, and cos^{2} θ/cos θ = cos θ.

## Compound Angle Formulas
S: The compound angle formulas give the sine, cosine and tangent of a sum or difference of angles. They derive exact values like sin 75° and underlie the double angle and harmonic forms.
O: State and use the addition formulas
O: Find exact values of non-standard angles
T: Compound angle | An angle written as a sum or difference, such as A + B
T: Addition formulas | sin(A ± B), cos(A ± B) and tan(A ± B) in terms of A and B
H: The formulas
E: sin(A ± B) = sin A cos B ± cos A sin B
E: cos(A ± B) = cos A cos B ∓ sin A sin B
E: tan(A ± B) = (tan A ± tan B)/(1 ∓ tan A tan B)
- Note the sign flip in the cosine formula.
- They can be proved geometrically or from rotation matrices (or Euler's formula).
H: Exact values
- sin 75° = sin(45° + 30°) = (√2/2)(√3/2) + (√2/2)(½) = (√6 + √2)/4.
- cos 15° = cos(45° − 30°) = (√6 + √2)/4.
- tan 105° = tan(60° + 45°) = (√3 + 1)/(1 − √3) = −2 − √3.
- sin(A + B) ≠ sin A + sin B: sin(30° + 60°) = 1, but sin 30° + sin 60° ≈ 1.37.
X: Find the exact value of cos 75°.
> cos(45° + 30°) = cos 45° cos 30° − sin 45° sin 30°
> = (√2/2)(√3/2) − (√2/2)(½)
> = (√6 − √2)/4
- Setting A = B gives the double angle formulas (next lesson).
- Setting A = 90° gives the co-function rules: sin(90° − B) = cos B and cos(90° − B) = sin B.
- The tan formula is undefined when tan A tan B = 1, where A + B = 90°.
- In physics, adding two waves uses the same formulas to combine phases.
K: sin(A ± B) keeps the sign, cos(A ± B) flips it; use them for exact values like 15° and 75°.
!: Writing sin(A + B) = sin A + sin B.
Q: Expand cos(A − B). | cos A cos B + sin A sin B.
Q: What is sin 75° exactly? | (√6 + √2)/4.
SUM: Addition formulas handle sums of angles.
SUM: They give exact values of many angles.
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Maor E, Trigonometric Delights (Princeton University Press 2013) | textbook | 2013 | https://press.princeton.edu/
M1#maths-u06-22-q1@1: Which is the correct expansion of sin(A − B)? | sin A cos B − cos A sin B | sin A cos B + cos A sin B | cos A cos B − sin A sin B | sin A − sin B | sin A sin B − cos A cos B | The sine formula keeps the sign of the compound angle.
M3#maths-u06-22-q2@2: If tan A = 1/2 and tan B = 1/3, what is A + B (for acute A and B)? | 45° | 30° | 60° | 90° | 75° | tan(A + B) = (½ + ⅓)/(1 − ⅙) = (5/6)/(5/6) = 1, so A + B = 45°.

## Double Angle Formulas
S: The double angle formulas express sin 2A, cos 2A and tan 2A in terms of A. They come straight from the addition formulas, and they're vital for solving equations and integrating sin^{2} x and cos^{2} x.
O: State and derive the double angle formulas
O: Use them to solve equations and rewrite powers
T: Double angle formula | A formula for a trig function of 2A in terms of A
T: Power-reduction | Writing sin^{2} A or cos^{2} A in terms of cos 2A
H: The formulas
E: sin 2A = 2 sin A cos A; tan 2A = 2 tan A/(1 − tan^{2} A)
E: cos 2A = cos^{2} A − sin^{2} A = 2 cos^{2} A − 1 = 1 − 2 sin^{2} A
- Put B = A in the addition formulas.
- Choose the form of cos 2A that matches the rest of the equation.
H: Uses
- Power reduction: sin^{2} A = ½(1 − cos 2A) and cos^{2} A = ½(1 + cos 2A), for integration.
- Equations: sin 2x = sin x becomes 2 sin x cos x − sin x = 0, so sin x(2 cos x − 1) = 0.
- Projectile range on level ground: R = (u^{2} sin 2θ)/g, maximised at θ = 45°.
X: Solve cos 2x = cos x for 0° ≤ x < 360°.
> Use cos 2x = 2 cos^{2} x − 1: 2 cos^{2} x − cos x − 1 = 0
> (2 cos x + 1)(cos x − 1) = 0, so cos x = −½ or cos x = 1
> x = 0°, 120° or 240°
- Write sin 2x as 2 sin x cos x to factorise equations; never divide away a common factor.
- Triple angle formulas follow too: sin 3A = 3 sin A − 4 sin^{3} A.
K: sin 2A = 2 sin A cos A; cos 2A has three forms; use power reduction for integrals.
!: Dividing sin 2x = sin x by sin x and losing the solutions where sin x = 0.
Q: Write sin 2A in terms of A. | 2 sin A cos A.
Q: Which form of cos 2A helps if the equation has only sin x? | 1 − 2 sin^{2} x.
SUM: Double angle formulas come from addition formulas.
SUM: They reduce powers and solve equations.
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Maor E, Trigonometric Delights (Princeton University Press 2013) | textbook | 2013 | https://press.princeton.edu/
NUM1#maths-u06-23-q1@1: If sin A = 3/5 and A is acute, find sin 2A. | 0.96 | 0.001 |  | cos A = 4/5, so sin 2A = 2 × 3/5 × 4/5 = 24/25 = 0.96.
M1#maths-u06-23-q2@1: Which expression equals cos^{2} x − sin^{2} x? | cos 2x | sin 2x | 1 | 2 cos x | cos^{2} 2x | This is one form of the double angle formula for cosine.
M2#maths-u06-23-q3@2: Which launch angle maximises a projectile's range on level ground? | 45° | 30° | 60° | 90° | 15° | R = u^{2} sin 2θ/g is largest when sin 2θ = 1, at 2θ = 90°.

## Half Angle Formulas
S: The half angle formulas give the trig functions of A/2 in terms of A. They follow from the double angle formulas and provide exact values such as sin 22.5°, plus the useful "t-substitution".
O: Derive and use the half angle formulas
O: Use the t = tan(x/2) substitution
T: Half angle formula | A formula for sin(A/2), cos(A/2) or tan(A/2) in terms of A
T: t-formulae | With t = tan(x/2): sin x = 2t/(1 + t^{2}), cos x = (1 − t^{2})/(1 + t^{2})
H: The formulas
E: sin^{2}(A/2) = (1 − cos A)/2; cos^{2}(A/2) = (1 + cos A)/2; tan(A/2) = sin A/(1 + cos A)
- The sign of sin(A/2) and cos(A/2) depends on the quadrant of A/2.
- sin 22.5° = √((1 − cos 45°)/2) = √(2 − √2)/2.
H: The t-substitution
- With t = tan(x/2), every trig function of x becomes a rational function of t.
- It turns integrals like ∫ 1/(1 + cos x) dx into rational integrals: the answer is tan(x/2) + c.
- It also solves equations like 3 cos x + 4 sin x = 2 algebraically.
X: Find the exact value of cos 15° using a half angle formula.
> cos^{2} 15° = (1 + cos 30°)/2 = (1 + √3/2)/2 = (2 + √3)/4
> 15° is acute, so cos 15° is positive
> cos 15° = √(2 + √3)/2 (equal to (√6 + √2)/4)
- Example: tan 22.5° = sin 45°/(1 + cos 45°) = √2 − 1.
- The half angle formulas are just the double angle formulas read backwards, with A replaced by A/2.
K: Half angle formulas come from cos 2A; choose the sign by the quadrant; t = tan(x/2) rationalises trig expressions.
!: Forgetting that the half angle formula gives a square: you must choose the correct sign.
Q: What is sin^{2}(A/2) in terms of cos A? | (1 − cos A)/2.
Q: With t = tan(x/2), what is cos x? | (1 − t^{2})/(1 + t^{2}).
SUM: Half angle formulas give exact values.
SUM: The t-substitution rationalises trig expressions.
SRC: Maor E, Trigonometric Delights (Princeton University Press 2013) | textbook | 2013 | https://press.princeton.edu/
SRC: Stroud KA, Booth DJ, Engineering Mathematics (8th edn, Bloomsbury 2020) | textbook | 2020 | https://www.bloomsbury.com/
M1#maths-u06-24-q1@1: Which formula gives cos^{2}(A/2)? | (1 + cos A)/2 | (1 − cos A)/2 | 2 cos^{2} A − 1 | 1 − 2 sin^{2} A | cos A/2 | Rearranging the double angle formula cos A = 2 cos^{2}(A/2) − 1 gives (1 + cos A)/2.
M2#maths-u06-24-q2@2: With t = tan(x/2), what is sin x? | 2t/(1 + t^{2}) | (1 − t^{2})/(1 + t^{2}) | 2t/(1 − t^{2}) | t/(1 + t) | 1/(1 + t^{2}) | sin x = 2 sin(x/2) cos(x/2) = 2 tan(x/2) cos^{2}(x/2) = 2t/(1 + t^{2}).

## Trigonometric Equations
S: Trigonometric equations usually have many solutions, because trig functions repeat. Solving them means finding every solution in a given interval, using identities, factorising and the symmetry of the graphs.
O: Solve trigonometric equations in a given interval
O: Solve equations involving multiple angles and identities
T: General solution | A formula for all solutions: for sin x = k, x = θ + 360°n or 180° − θ + 360°n
T: Multiple angle | An angle like 2x or 3x, giving more solutions in a fixed interval
H: Strategy
- Get one trig function of one angle: use identities to replace others.
- Quadratics: 2 sin^{2} x − sin x − 1 = 0 factorises to (2 sin x + 1)(sin x − 1) = 0.
- Find the principal value, then the other solutions from the graph or CAST diagram.
- Never divide by an expression that might be zero; factorise instead.
H: Multiple angles and shifts
- sin 2x = ½ in 0° ≤ x < 360°: solve for 2x in 0° to 720° (30°, 150°, 390°, 510°), then halve: 15°, 75°, 195°, 255°.
- cos(x − 30°) = 0.5: let u = x − 30° and adjust the interval.
- Radians: give answers as multiples of π where exact.
X: Solve 2 cos^{2} x + 3 sin x = 3 for 0° ≤ x < 360°.
> Replace cos^{2} x: 2(1 − sin^{2} x) + 3 sin x = 3, so 2 sin^{2} x − 3 sin x + 1 = 0
> (2 sin x − 1)(sin x − 1) = 0, so sin x = ½ or sin x = 1
> x = 30°, 90° or 150°
K: Reduce to one function of one angle, factorise, find all solutions in the interval; adjust the interval for multiple angles.
!: Solving sin 2x = k and halving only the first solution, missing the others.
Q: How many solutions does sin 3x = 0.2 have in 0° ≤ x < 360°? | 6.
Q: What should you do instead of dividing by sin x? | Factorise sin x out.
SUM: Trig equations have many solutions.
SUM: Identities reduce them to one function.
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Maor E, Trigonometric Delights (Princeton University Press 2013) | textbook | 2013 | https://press.princeton.edu/
M1#maths-u06-25-q1@1: How many solutions does tan x = 2 have for 0° ≤ x < 360°? | 2 | 1 | 4 | 0 | 3 | tan has period 180°, so there are two solutions in 360°.
M3#maths-u06-25-q2@2: Solve sin x cos x = 0 for 0° ≤ x < 360°. How many solutions are there? | 4 | 2 | 3 | 1 | 6 | sin x = 0 gives 0° and 180°; cos x = 0 gives 90° and 270°.

## Trigonometric Inequalities
S: Trigonometric inequalities ask where a trig function is above or below a value. Solve the matching equation for the boundary points, then use the graph to choose the intervals.
O: Solve trigonometric inequalities using graphs
O: Write solution sets as intervals
T: Boundary points | The solutions of the corresponding equation, where the inequality switches
T: Interval notation | Writing a set of values as (a, b), [a, b] and so on
H: Method
- Solve the equation to find boundary points in the interval.
- Sketch the graph and the horizontal line, and read off where the graph is above or below.
- Include or exclude boundaries according to < or ≤.
H: Examples
- sin x > ½ for 0° ≤ x < 360°: boundaries 30° and 150°; the graph is above ½ between them: 30° < x < 150°.
- cos x ≤ 0: 90° ≤ x ≤ 270°.
- With harmonic forms: 3 sin x + 4 cos x > 4 becomes 5 sin(x + 53.1°) > 4.
- Inequalities model questions like "when is the tide deep enough for a ship?"
X: Solve tan x < 1 for 0° ≤ x < 180°, x ≠ 90°.
> The boundary is tan x = 1 at x = 45°
> On 0° ≤ x < 90°, tan x < 1 when x < 45°; on 90° < x < 180°, tan x is negative, so always < 1
> 0° ≤ x < 45° or 90° < x < 180°
- In radians, give interval ends as exact multiples of π where possible.
- A sketch avoids most mistakes: mark the line y = k and shade where the curve is above or below.
K: Find boundaries from the equation, then use the graph; watch asymptotes and include boundaries only for ≤ or ≥.
!: Ignoring the asymptote of tan x when choosing intervals.
Q: Solve cos x > 0 for 0° ≤ x < 360°. | 0° ≤ x < 90° or 270° < x < 360°.
Q: What is the first step in solving a trig inequality? | Solve the corresponding equation to find the boundary points.
SUM: Boundaries come from equations.
SUM: Graphs choose the intervals.
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Stroud KA, Booth DJ, Engineering Mathematics (8th edn, Bloomsbury 2020) | textbook | 2020 | https://www.bloomsbury.com/
M1#maths-u06-26-q1@1: For 0° ≤ x < 360°, where is sin x < 0? | 180° < x < 360° | 0° < x < 180° | 90° < x < 270° | 0° < x < 90° | Everywhere | Sine is negative in the third and fourth quadrants.
M2#maths-u06-26-q2@2: Solve 2 sin x ≥ √3 for 0° ≤ x < 360°. | 60° ≤ x ≤ 120° | 0° ≤ x ≤ 60° | 120° ≤ x ≤ 240° | 60° ≤ x ≤ 300° | x = 60° only | sin x ≥ √3/2 between the boundaries 60° and 120°.

## Hyperbolic Functions
S: The hyperbolic functions sinh, cosh and tanh are built from exponentials. They behave like trig functions in many ways, describe hanging cables (catenaries), and appear in relativity and engineering.
O: Define sinh, cosh and tanh and sketch their graphs
O: Use hyperbolic identities, including Osborn's rule
T: Hyperbolic sine and cosine | sinh x = (e^{x} − e^{−x})/2; cosh x = (e^{x} + e^{−x})/2
T: Osborn's rule | Turn a trig identity into a hyperbolic one by replacing each function and changing the sign of any product of two sines
H: Definitions and graphs
- tanh x = sinh x/cosh x, with range −1 < tanh x < 1.
- cosh x ≥ 1, an even function shaped like a hanging chain (a catenary); sinh x is odd, increasing, through the origin.
- (cosh t, sinh t) lies on the hyperbola x^{2} − y^{2} = 1, just as (cos t, sin t) lies on the circle.
H: Identities and calculus
- cosh^{2} x − sinh^{2} x = 1 (note the minus sign).
- sinh 2x = 2 sinh x cosh x; cosh 2x = cosh^{2} x + sinh^{2} x.
- d/dx sinh x = cosh x and d/dx cosh x = sinh x (no minus sign).
- Applications: the Gateway Arch, suspension cables under their own weight, special relativity's rapidity.
X: Solve cosh x = 2.
> (e^{x} + e^{−x})/2 = 2, so e^{x} + e^{−x} = 4
> Let u = e^{x}: u^{2} − 4u + 1 = 0, so u = 2 ± √3
> x = ln(2 ± √3) = ±ln(2 + √3) ≈ ±1.317
- Unlike trig functions, hyperbolic functions aren't periodic for real x.
K: sinh and cosh are combinations of e^{x} and e^{−x}; cosh^{2} − sinh^{2} = 1; derivatives have no minus signs.
!: Using cos^{2} + sin^{2} = 1 for hyperbolic functions instead of cosh^{2} − sinh^{2} = 1.
Q: What is cosh 0? | 1.
Q: What is d/dx (cosh x)? | sinh x.
SUM: Hyperbolic functions are exponential combinations.
SUM: Their identities mirror trig with sign changes.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Stroud KA, Booth DJ, Engineering Mathematics (8th edn, Bloomsbury 2020) | textbook | 2020 | https://www.bloomsbury.com/
NUM1#maths-u06-27-q1@1: Find sinh(ln 3). | 1.3333 | 0.0001 |  | (3 − 1/3)/2 = (8/3)/2 = 4/3 ≈ 1.333.
M1#maths-u06-27-q2@1: Which identity holds for hyperbolic functions? | cosh^{2} x − sinh^{2} x = 1 | cosh^{2} x + sinh^{2} x = 1 | sinh^{2} x − cosh^{2} x = 1 | tanh^{2} x + 1 = sech^{2} x | cosh x − sinh x = 1 | Expanding the exponentials gives cosh^{2} x − sinh^{2} x = 1.
M2#maths-u06-27-q3@2: What shape does a uniform cable hanging under its own weight form? | A catenary (a cosh curve) | A parabola | A circle | A sine wave | A hyperbola | Galileo thought it was a parabola; it's y = a cosh(x/a).

## Inverse Hyperbolic Functions
S: The inverse hyperbolic functions arsinh, arcosh and artanh undo sinh, cosh and tanh. Because hyperbolic functions are made of exponentials, their inverses are logarithms, and they appear as standard integrals.
O: Express inverse hyperbolic functions as logarithms
O: Use them to evaluate integrals
T: Arsinh | sinh^{−1} x = ln(x + √(x^{2} + 1)), defined for all x
T: Arcosh | cosh^{−1} x = ln(x + √(x^{2} − 1)), for x ≥ 1 (the principal, non-negative value)
H: Logarithmic forms
- arsinh x = ln(x + √(x^{2} + 1)).
- arcosh x = ln(x + √(x^{2} − 1)), x ≥ 1.
- artanh x = ½ ln((1 + x)/(1 − x)), −1 < x < 1.
- Derivation: solve y = sinh x for x by writing it as a quadratic in e^{x}.
H: Calculus
- d/dx arsinh x = 1/√(x^{2} + 1); d/dx arcosh x = 1/√(x^{2} − 1); d/dx artanh x = 1/(1 − x^{2}).
- So ∫ 1/√(x^{2} + a^{2}) dx = arsinh(x/a) + c, and ∫ 1/√(x^{2} − a^{2}) dx = arcosh(x/a) + c.
- Compare ∫ 1/√(a^{2} − x^{2}) dx = arcsin(x/a) + c.
X: Find the exact value of arsinh(3/4).
> arsinh x = ln(x + √(x^{2} + 1))
> √(9/16 + 1) = √(25/16) = 5/4
> arsinh(3/4) = ln(3/4 + 5/4) = ln 2
- Example: arcosh 2 = ln(2 + √3) ≈ 1.317, matching the solution of cosh x = 2.
- Calculators label these sinh^{−1}, cosh^{−1} and tanh^{−1}.
- In special relativity, rapidity is artanh(v/c), which makes velocities add simply.
K: Inverse hyperbolic functions are logarithms; their derivatives give standard integrals of 1/√(x^{2} ± a^{2}).
!: Forgetting arcosh is only defined for x ≥ 1.
Q: Write arsinh x as a logarithm. | ln(x + √(x^{2} + 1)).
Q: What is ∫ 1/√(x^{2} + 9) dx? | arsinh(x/3) + c.
SUM: Inverse hyperbolic functions are logarithms.
SUM: They give standard integrals.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Stroud KA, Booth DJ, Engineering Mathematics (8th edn, Bloomsbury 2020) | textbook | 2020 | https://www.bloomsbury.com/
NUM1#maths-u06-28-q1@1: Find arcosh(5/4) as a decimal, to 3 decimal places. | 0.693 | 0.0005 |  | ln(5/4 + √(25/16 − 1)) = ln(5/4 + 3/4) = ln 2 ≈ 0.693.
M1#maths-u06-28-q2@1: What is the domain of arcosh x? | x ≥ 1 | All real x | −1 < x < 1 | x > 0 | x ≤ 1 | cosh x ≥ 1, so its inverse is only defined for x ≥ 1.
M2#maths-u06-28-q3@2: What is d/dx (artanh x)? | 1/(1 − x^{2}) | 1/(1 + x^{2}) | 1/√(1 − x^{2}) | −1/(1 − x^{2}) | sech^{2} x | Differentiating ½ ln((1 + x)/(1 − x)) gives ½(1/(1 + x) + 1/(1 − x)) = 1/(1 − x^{2}).

## Fourier Series
S: A Fourier series writes a periodic function as a sum of sines and cosines of increasing frequencies. Almost any repeating signal (square waves, sound, heat patterns) can be built from simple waves.
O: Calculate Fourier coefficients for simple functions
O: Interpret a Fourier series as a sum of harmonics
T: Fourier series | f(x) = a₀/2 + Σ (a_{n} cos nx + b_{n} sin nx) for a 2π-periodic function
T: Fourier coefficients | a_{n} = (1/π) ∫_{−π}^{π} f(x) cos nx dx and b_{n} = (1/π) ∫_{−π}^{π} f(x) sin nx dx
H: Computing coefficients
- Orthogonality: ∫_{−π}^{π} sin mx sin nx dx = 0 for m ≠ n (and similarly for cos), so each coefficient is found separately.
- Even functions have only cosine terms; odd functions only sine terms.
- Square wave (−1 on (−π, 0), 1 on (0, π)): f(x) = (4/π)(sin x + sin 3x/3 + sin 5x/5 + …).
H: Behaviour
- Partial sums approximate f, better with more terms.
- At a jump, the series converges to the midpoint; near jumps, partial sums overshoot by about 9% (the Gibbs phenomenon).
- Joseph Fourier (1807) introduced them to solve the heat equation (School 10).
- Musical timbre is the mix of harmonics; sound synthesis and compression use these ideas.
X: For f(x) = x on (−π, π), find b₁.
> f is odd, so a_{n} = 0
> b₁ = (1/π) ∫_{−π}^{π} x sin x dx; by parts, ∫ x sin x dx = −x cos x + sin x
> [−x cos x + sin x]_{−π}^{π} = (π + 0) − (−π + 0) = 2π
> So b₁ = 2π/π = 2
K: Coefficients come from integrals against cos nx and sin nx; even functions give cosines, odd functions sines; partial sums converge except for overshoot at jumps.
!: Integrating over the wrong interval or forgetting the 1/π factor.
Q: Which terms appear in the Fourier series of an odd function? | Only sine terms.
Q: What is the Gibbs phenomenon? | The overshoot of partial sums near a jump discontinuity.
SUM: Fourier series build periodic functions from waves.
SUM: Orthogonality isolates each coefficient.
SRC: Kreyszig E, Advanced Engineering Mathematics (10th edn, Wiley 2011) | textbook | 2011 | https://www.wiley.com/
SRC: Körner TW, Fourier Analysis (Cambridge University Press 1988) | textbook | 1988 | https://www.cambridge.org/
M1#maths-u06-29-q1@1: Which terms does the Fourier series of an even function contain? | Cosines (and a constant) only | Sines only | Both sines and cosines always | Exponentials only | No terms | Even functions are symmetric, matching the even cosine terms.
M2#maths-u06-29-q2@2: In the square wave series (4/π)(sin x + sin 3x/3 + sin 5x/5 + …), what is the coefficient of sin 5x? | 4/(5π) | 1/5 | 4/π | 5 | 0 | Each term is (4/π) × sin(nx)/n for odd n, so n = 5 gives 4/(5π).

## Fourier Analysis
S: Fourier analysis decomposes signals into their frequencies. Extending Fourier series to non-periodic functions gives the Fourier transform, the foundation of signal processing, image compression, MRI and quantum mechanics.
O: Describe the Fourier transform and frequency spectrum
O: Explain applications of Fourier analysis
T: Fourier transform | F(ω) = ∫ f(t)e^{−iωt} dt, giving the amount of each frequency ω in a signal
T: Spectrum | The distribution of a signal's energy across frequencies
H: From series to transforms
- A periodic signal has a discrete spectrum (multiples of a fundamental frequency); a non-periodic signal has a continuous spectrum.
- Complex form: e^{iωt} = cos ωt + i sin ωt combines sines and cosines.
- The transform turns differentiation into multiplication by iω, which simplifies differential equations.
- The uncertainty principle: a signal can't be sharply localised in both time and frequency.
H: Applications
- The fast Fourier transform (FFT, Cooley and Tukey 1965) computes spectra in O(n log n) time: one of the most important algorithms ever.
- Audio equalisers, MP3 and JPEG compression (via the related discrete cosine transform), MRI and CT image reconstruction, spectroscopy.
- Convolution in time becomes multiplication in frequency, which is how filters work (School 23).
X: A signal is s(t) = 3 sin(2π × 50t) + sin(2π × 120t). Describe its spectrum.
> It's a sum of two pure sine waves
> One at 50 Hz with amplitude 3 and one at 120 Hz with amplitude 1
> The spectrum has two spikes, at 50 Hz and 120 Hz, the first three times as tall
K: Fourier analysis decomposes signals into frequencies; the FFT computes spectra fast; it underpins signal processing and imaging.
!: Expecting a short pulse to have a narrow spectrum: short in time means wide in frequency.
Q: What does the FFT compute? | The discrete Fourier transform, in O(n log n) time.
Q: What happens to convolution under the Fourier transform? | It becomes multiplication.
SUM: Fourier analysis reveals frequency content.
SUM: It powers modern signal processing.
SRC: Körner TW, Fourier Analysis (Cambridge University Press 1988) | textbook | 1988 | https://www.cambridge.org/
SRC: Cooley JW, Tukey JW, An algorithm for the machine calculation of complex Fourier series, Mathematics of Computation 19(90) 297 | journal | 1965 | https://doi.org/10.1090/S0025-5718-1965-0178586-1
M1#maths-u06-30-q1@1: What does the spectrum of a pure 440 Hz tone look like? | A single spike at 440 Hz | Spikes at every frequency | A flat line | A spike at 0 Hz | A spike at 220 Hz | A pure sine wave contains only its own frequency.
M2#maths-u06-30-q2@2: Which technology relies on the Fourier transform to build images? | MRI scanning | Barcode reading | Thermometers | Mechanical clocks | Abacuses | MRI measures spatial frequency data and reconstructs the image with an inverse Fourier transform.
`;
