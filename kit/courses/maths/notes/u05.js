// School 5: Geometry. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// From Euclid and GCSE geometry through coordinate and vector geometry to the geometries of modern mathematics.
export default `
## Euclidean Geometry
S: Euclidean geometry is the geometry of flat space, built by Euclid around 300 BCE from a handful of definitions and axioms. It was the model of rigorous reasoning for two thousand years, and it's still the geometry of everyday measurement.
O: Describe Euclid's axiomatic approach and the parallel postulate
O: Use deductive reasoning to prove geometric results
T: Axiom | A statement accepted without proof as a starting point for reasoning
T: Parallel postulate | Euclid's fifth postulate: through a point not on a line there is exactly one parallel line (Playfair's form)
H: Euclid's Elements
- Euclid's Elements (about 300 BCE) starts from definitions (a point "has no part"), five postulates and common notions, and proves 465 propositions.
- The first four postulates: a line can be drawn between any two points; extended indefinitely; a circle can be drawn with any centre and radius; all right angles are equal.
- The fifth (parallel) postulate seemed less obvious, and attempts to prove it from the others led, in the 1800s, to non-Euclidean geometries (later in this school).
H: Proof in geometry
- A geometric proof is a chain of statements, each justified by an axiom, a definition or an earlier theorem.
- Classic results: angles in a triangle add to 180° (this needs the parallel postulate); base angles of an isosceles triangle are equal; Pythagoras' theorem.
- Hilbert (1899) gave a modern, complete set of axioms, filling gaps in Euclid's reasoning.
X: Prove that the angles in a triangle add up to 180°.
> Draw triangle ABC and a line through A parallel to BC
> The angles either side of A on the line equal angles B and C (alternate angles)
> Together with angle A they make a straight line, 180°, so A + B + C = 180°
K: Euclidean geometry deduces theorems from axioms; the parallel postulate distinguishes it from other geometries.
!: Treating a diagram as a proof: a diagram can mislead, while reasoning from axioms can't.
Q: What does the parallel postulate say (Playfair's form)? | Through a point not on a line there is exactly one line parallel to it.
Q: Which postulate is needed to prove the triangle angle sum? | The parallel postulate.
SUM: Euclid built geometry from axioms.
SUM: The parallel postulate defines flat geometry.
SRC: Heath TL (trans.), Euclid: The Thirteen Books of the Elements (Dover 1956) | textbook | 1956 | https://store.doverpublications.com/
SRC: Hartshorne R, Geometry: Euclid and Beyond (Springer 2000) | textbook | 2000 | https://link.springer.com/
M1#maths-u05-01-q1@1: Around when did Euclid write the Elements? | About 300 BCE | About 1600 CE | About 1000 BCE | About 1900 CE | About 500 CE | Euclid worked in Alexandria around 300 BCE.
M2#maths-u05-01-q2@2: Which result depends on the parallel postulate? | The angles in a triangle add to 180° | All right angles are equal | A circle can be drawn with any centre | A line can be extended | A point has no part | The angle sum proof uses a parallel line and alternate angles, which rely on the parallel postulate.

## Plane Geometry
S: Plane geometry studies two-dimensional figures (points, lines, angles, polygons and circles) and their measurements. It's the geometry of GCSE, drawing, design and architecture.
O: Identify and describe 2D shapes and their properties
O: Use properties of shapes to find missing lengths and angles
T: Plane | A flat surface extending infinitely in two dimensions
T: Polygon | A closed plane figure with straight sides
H: The objects of plane geometry
- **Points** (positions), **lines** (infinite), **line segments** (with endpoints) and **rays** (one endpoint).
- **Angles**, measured in degrees (or radians).
- **Polygons**: triangles, quadrilaterals, pentagons and so on; **circles** and their parts.
- **Properties**: side lengths, angles, symmetry, parallel and perpendicular sides, diagonals.
H: Reasoning with properties
- Combine facts: an isosceles triangle with an apex angle of 40° has base angles (180 − 40)/2 = 70°.
- Write the reason for each step in exam answers ("angles on a straight line add to 180°").
- Shapes can be described by coordinates (coordinate geometry) or vectors, linking geometry and algebra.
- Plane geometry extends to 3D (solid geometry) and to curved surfaces (later in this school).
X: In a kite ABCD, angle A = 110°, angle C = 70° and angles B and D are equal. Find angle B.
> Angles in a quadrilateral add to 360°
> B + D = 360 − 110 − 70 = 180
> B = D = 90°
K: Plane geometry studies 2D shapes; combine shape properties and angle facts, giving reasons.
!: Assuming a shape has a property (equal sides, right angles) because it looks that way in a diagram.
Q: What is a polygon? | A closed plane figure with straight sides.
Q: What do the angles in a quadrilateral add up to? | 360°.
SUM: Plane geometry is the geometry of flat shapes.
SUM: Properties and reasons solve problems.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Hartshorne R, Geometry: Euclid and Beyond (Springer 2000) | textbook | 2000 | https://link.springer.com/
M1#maths-u05-02-q1@1: An isosceles triangle has an apex angle of 50°. What is each base angle? | 65° | 50° | 130° | 75° | 40° | The base angles share 180 − 50 = 130°, so each is 65°.
M2#maths-u05-02-q2@2: Which shape always has exactly one pair of parallel sides? | A trapezium | A rectangle | A rhombus | A parallelogram | A kite | A trapezium has exactly one pair (in the UK definition); the others have two or none.

## Points, Lines and Planes
S: Points, lines and planes are the basic undefined objects of geometry. Everything else (angles, shapes, solids) is built from them, and their relationships (intersecting, parallel, skew) structure 2D and 3D space.
O: Describe how points, lines and planes relate in two and three dimensions
O: Distinguish intersecting, parallel and skew lines
T: Collinear | Points that lie on the same straight line
T: Skew lines | Lines in 3D that are neither parallel nor intersecting
H: Basic facts
- Two distinct points determine exactly one line.
- Three non-collinear points determine exactly one plane.
- Two distinct lines in a plane either intersect at exactly one point or are parallel.
- Two distinct planes either intersect in a line or are parallel.
H: In three dimensions
- Lines in 3D can also be **skew**: an edge on the top of a cube and a non-parallel edge on the bottom never meet.
- A line can lie in a plane, meet it at one point, or be parallel to it.
- The angle between a line and a plane is the angle between the line and its projection onto the plane.
- Vectors describe lines and planes precisely (School 11 and later in this school).
X: In a cube ABCDEFGH (ABCD the base, EFGH the top, with E above A), classify the pair of edges AB and GH, and AB and FG.
> AB and GH: GH is parallel to EF, which is parallel to AB, so AB and GH are parallel
> AB and FG: FG runs parallel to BC; it's on the top face and doesn't meet AB
> AB and FG aren't parallel and don't meet: they're skew
K: Two points fix a line, three non-collinear points fix a plane; in 3D, non-parallel lines can be skew.
!: Assuming that two lines that aren't parallel must meet: in 3D they may be skew.
Q: How many points determine a plane? | Three, if they aren't collinear.
Q: Can skew lines exist in a plane? | No: only in three or more dimensions.
SUM: Points, lines and planes are geometry's building blocks.
SUM: 3D adds skew lines.
SRC: Hartshorne R, Geometry: Euclid and Beyond (Springer 2000) | textbook | 2000 | https://link.springer.com/
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
M1#maths-u05-03-q1@1: What are points that lie on the same straight line called? | Collinear | Coplanar | Concurrent | Skew | Parallel | Collinear means on one line; coplanar means on one plane.
M2#maths-u05-03-q2@2: Two distinct planes that aren't parallel meet in: | A line | A point | A plane | Two points | Nothing | Two non-parallel planes always intersect along a straight line, like the pages of a book along the spine.

## Angles
S: An angle measures the amount of turn between two lines meeting at a point. Angle facts (on a line, around a point, vertically opposite) are the foundation of every geometric argument.
O: Classify angles and apply basic angle facts
O: Calculate missing angles with reasons
T: Vertically opposite angles | The equal angles opposite each other where two lines cross
T: Reflex angle | An angle between 180° and 360°
H: Types and facts
- Acute (< 90°), right (90°), obtuse (90° to 180°), straight (180°), reflex (180° to 360°), full turn (360°).
- Angles on a straight line add to 180°; angles around a point add to 360°.
- Vertically opposite angles are equal.
- Complementary angles add to 90°; supplementary angles add to 180°.
H: Measuring and naming
- Name an angle by three points with the vertex in the middle: angle ABC (or ∠ABC) has its vertex at B.
- Use a protractor from the zero line; check whether the angle is acute or obtuse first.
- Radians (School 6): a full turn is 2π radians, so 180° = π radians.
- Always state the reason for each step in a geometric argument.
X: Two straight lines cross. One of the angles is 3x + 10 and the angle next to it is 5x − 6. Find x and all four angles.
> Adjacent angles on a straight line: 3x + 10 + 5x − 6 = 180, so 8x = 176 and x = 22
> The angles are 76° and 104°
> Vertically opposite angles are equal, so the four angles are 76°, 104°, 76°, 104°
P: **Investigate with the lab.** In the cyclic quadrilateral, drag one vertex and watch the angle at A and the opposite angle change together, always adding to 180°.
IX: circles
K: Straight line 180°, around a point 360°, vertically opposite angles equal; name angles by three letters with the vertex in the middle.
!: Reading the wrong scale on a protractor.
Q: What do angles around a point add up to? | 360°.
Q: What is the supplement of 65°? | 115°.
SUM: Angle facts underpin geometry.
SUM: Give a reason for every step.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: angles | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u05-04-q1@1: Three angles around a point are 2x, 3x and 4x. Find x. | 40 | 0 | ° | 9x = 360, so x = 40°.
M1#maths-u05-04-q2@1: Which angle is reflex? | 250° | 90° | 170° | 45° | 180° | A reflex angle is more than 180° and less than 360°.
M2#maths-u05-04-q3@2: Angle ABC is formed by points A, B and C. Where is the vertex? | At B | At A | At C | Between A and C | It depends on the diagram | The middle letter always names the vertex.

## Parallel and Perpendicular Lines
S: Parallel lines never meet; perpendicular lines meet at right angles. A line crossing two parallel lines creates equal alternate and corresponding angles, a key tool in geometric proof.
O: Use alternate, corresponding and co-interior angles
O: Identify parallel and perpendicular lines, including from gradients
T: Transversal | A line crossing two or more other lines
T: Co-interior angles | Angles between parallel lines on the same side of a transversal; they add to 180°
H: Angles with parallel lines
- **Alternate** angles are equal (a "Z" shape).
- **Corresponding** angles are equal (an "F" shape).
- **Co-interior** (allied) angles add to 180° (a "C" or "U" shape).
- These work in reverse too: if alternate angles are equal, the lines are parallel.
H: Gradients
- Parallel lines have equal gradients: y = 3x + 1 and y = 3x − 4.
- Perpendicular lines have gradients that multiply to −1: m₁m₂ = −1, so y = 2x and y = −½x + 5 are perpendicular.
- A perpendicular bisector of a segment passes through its midpoint at right angles (useful in constructions and circles).
X: Two parallel lines are crossed by a transversal. One co-interior angle is 2x + 30 and the other is x + 15. Find x and the angles.
> Co-interior angles add to 180°: 3x + 45 = 180
> x = 45
> The angles are 120° and 60°
K: Alternate and corresponding angles are equal, co-interior angles add to 180°; parallel lines share a gradient and perpendicular gradients multiply to −1.
!: Calling co-interior angles equal: they add to 180°.
Q: What is the gradient of a line perpendicular to y = 4x − 1? | −1/4.
Q: What shape do alternate angles make? | A Z shape.
SUM: Parallel lines create equal angle pairs.
SUM: Gradients detect parallel and perpendicular lines.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: angles in parallel lines | guidance | 2019 | https://www.ncetm.org.uk/
M1#maths-u05-05-q1@1: Which pair of lines is perpendicular? | y = 3x + 2 and y = −x/3 | y = 3x and y = 3x + 1 | y = 2x and y = x/2 | y = x and y = x + 4 | y = 5 and y = −5 | 3 × (−1/3) = −1, so the gradients are negative reciprocals.
M2#maths-u05-05-q2@2: Corresponding angles on parallel lines are 4x − 20 and 2x + 40. What is x? | 30 | 10 | 40 | 60 | 20 | Corresponding angles are equal: 4x − 20 = 2x + 40, so x = 30.

## Triangles
S: Triangles are the simplest polygons and the building blocks of all others. Their angle facts, types and the exterior angle theorem appear in almost every geometry problem.
O: Classify triangles and use their angle properties
O: Apply the exterior angle theorem
T: Exterior angle | The angle between one side of a triangle and the extension of an adjacent side
T: Isosceles triangle | A triangle with two equal sides and two equal base angles
H: Types and facts
- By sides: equilateral (all equal, all angles 60°), isosceles (two equal, two equal angles), scalene (none equal).
- By angles: acute, right-angled, obtuse.
- Angles in a triangle add to 180°.
- The exterior angle equals the sum of the two interior opposite angles.
- The longest side is opposite the largest angle.
H: Lengths and existence
- Triangle inequality: each side is shorter than the sum of the other two, so lengths 3, 4 and 8 can't form a triangle.
- Area = ½ × base × perpendicular height (or ½ab sin C, School 6).
- Special points: the centroid (where the medians meet), the circumcentre (where the perpendicular bisectors meet) and the incentre (where the angle bisectors meet).
X: In triangle PQR, angle P = 48° and the exterior angle at R is 115°. Find angle Q.
> The exterior angle at R equals P + Q
> 115 = 48 + Q
> Q = 67°
K: Angles add to 180°, the exterior angle equals the two opposite interior angles, and sides must satisfy the triangle inequality.
!: Assuming a triangle is isosceles because two sides look equal.
Q: What is each angle in an equilateral triangle? | 60°.
Q: Can sides of 5, 6 and 12 form a triangle? | No: 5 + 6 < 12.
SUM: Triangles have angle sum 180°.
SUM: The exterior angle theorem saves steps.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Hartshorne R, Geometry: Euclid and Beyond (Springer 2000) | textbook | 2000 | https://link.springer.com/
NUM1#maths-u05-06-q1@1: A triangle has angles x, 2x and 3x. Find the largest angle. | 90 | 0 | ° | 6x = 180, so x = 30 and the largest angle is 90°.
M1#maths-u05-06-q2@1: Which set of lengths can form a triangle? | 4, 5, 8 | 2, 3, 6 | 1, 1, 3 | 5, 5, 11 | 3, 4, 7 | 4 + 5 = 9 > 8; in the others, the two shorter sides don't exceed the longest.
M2#maths-u05-06-q3@2: An isosceles triangle has one angle of 100°. What are the other two? | 40° and 40° | 100° and −20° | 80° and 0° | 50° and 30° | 100° and 100° | 100° must be the apex (two 100° angles would exceed 180°), so the base angles share 80°.

## Congruence and Similarity
S: Congruent shapes are identical in size and shape; similar shapes have the same shape but may differ in size. Similarity is the geometry of scale drawings, maps and enlargements, and links lengths, areas and volumes.
O: Prove triangles congruent using SSS, SAS, ASA and RHS
O: Use scale factors for lengths, areas and volumes of similar shapes
T: Congruent | Identical in shape and size: corresponding sides and angles are equal
T: Similar | The same shape: corresponding angles equal and corresponding sides in the same ratio
H: Congruent triangles
- Two triangles are congruent if they match by SSS (three sides), SAS (two sides and the included angle), ASA or AAS (two angles and a corresponding side) or RHS (right angle, hypotenuse, side).
- SSA isn't enough (the ambiguous case), and AAA only gives similarity.
- Congruence proofs justify properties: the diagonals of a parallelogram bisect each other.
H: Similarity and scale factors
- Triangles are similar if their angles are equal (AA is enough).
- With length scale factor k: areas scale by k^{2} and volumes by k^{3}.
- Two similar cylinders with heights 4 cm and 10 cm: k = 2.5, so areas scale by 6.25 and volumes by 15.625.
X: Two similar bottles have heights 12 cm and 18 cm. The smaller holds 400 ml. How much does the larger hold?
> Length scale factor k = 18/12 = 1.5
> Volume scale factor k^{3} = 3.375
> 400 × 3.375 = 1,350 ml
K: Congruence needs SSS, SAS, ASA/AAS or RHS; similar shapes scale lengths by k, areas by k^{2} and volumes by k^{3}.
!: Using the length scale factor for areas or volumes.
Q: Why isn't AAA a congruence condition? | Equal angles only guarantee the same shape, not the same size.
Q: If lengths double, what happens to the area? | It multiplies by 4.
SUM: Congruence means identical; similarity means scaled.
SUM: Area and volume scale by k^{2} and k^{3}.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Hartshorne R, Geometry: Euclid and Beyond (Springer 2000) | textbook | 2000 | https://link.springer.com/
NUM1#maths-u05-07-q1@1: Two similar shapes have areas 20 cm² and 45 cm². What is the length scale factor? | 1.5 | 0 |  | The area scale factor is 45/20 = 2.25, so k = √2.25 = 1.5.
M1#maths-u05-07-q2@1: Which condition does NOT prove two triangles congruent? | AAA | SSS | SAS | RHS | ASA | Equal angles alone give similar triangles of possibly different sizes.
M3#maths-u05-07-q3@2: Two similar cones have volumes 54 cm³ and 16 cm³. The larger has surface area 90 cm². What is the smaller's? | 40 cm² | 26.7 cm² | 60 cm² | 30 cm² | 10 cm² | Volume ratio 16/54 = (2/3)^{3}, so k = 2/3 and the area ratio is 4/9: 90 × 4/9 = 40.

## Quadrilaterals
S: Quadrilaterals are four-sided polygons: squares, rectangles, parallelograms, rhombuses, trapeziums and kites. Each is defined by its sides, angles, diagonals and symmetry, and they form a family tree of special cases.
O: Describe the properties of the special quadrilaterals
O: Use quadrilateral properties to solve problems
T: Parallelogram | A quadrilateral with both pairs of opposite sides parallel
T: Rhombus | A quadrilateral with four equal sides
H: The family
- **Square**: four equal sides, four right angles; diagonals equal, bisect at 90°.
- **Rectangle**: four right angles; diagonals equal and bisect each other.
- **Parallelogram**: opposite sides parallel and equal; opposite angles equal; diagonals bisect each other.
- **Rhombus**: four equal sides; diagonals bisect at right angles and bisect the angles.
- **Kite**: two pairs of adjacent equal sides; one diagonal is a line of symmetry; diagonals perpendicular.
- **Trapezium**: (in the UK) exactly one pair of parallel sides.
H: Relationships and areas
- A square is a special rectangle and a special rhombus; rectangles and rhombuses are special parallelograms.
- Angles in any quadrilateral add to 360°.
- Areas: parallelogram = base × height; trapezium = ½(a + b)h; rhombus or kite = ½ × product of diagonals.
X: A rhombus has diagonals 10 cm and 24 cm. Find its area and side length.
> Area = ½ × 10 × 24 = 120 cm^{2}
> The diagonals bisect at right angles, making four right-angled triangles with legs 5 and 12
> Side = √(25 + 144) = 13 cm
K: Learn each quadrilateral's sides, angles, diagonals and symmetry; squares are special rectangles and rhombuses.
!: Saying a rhombus's diagonals are equal (they're only equal in a square).
Q: Which quadrilaterals have diagonals that bisect at right angles? | Rhombuses and squares (and a kite's diagonals are perpendicular).
Q: What is the area of a trapezium? | ½(a + b)h, where a and b are the parallel sides.
SUM: Special quadrilaterals have defining properties.
SUM: They form a hierarchy of special cases.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: properties of shapes | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u05-08-q1@1: A trapezium has parallel sides 7 cm and 13 cm and height 6 cm. Find its area. | 60 | 0 | cm² | ½ × (7 + 13) × 6 = 60 cm^{2}.
M3#maths-u05-08-q2@1: Which quadrilateral has diagonals that are equal and bisect each other, but not necessarily at right angles? | A rectangle | A rhombus | A kite | A trapezium | A general parallelogram | A rectangle's diagonals are equal and bisect each other; they're perpendicular only if it's a square.
M2#maths-u05-08-q3@2: Which statement about the quadrilateral family is true? | Every square is a rhombus | Every rhombus is a square | Every rectangle is a square | Every kite is a rhombus | Every trapezium is a parallelogram | A square has four equal sides, so it meets the definition of a rhombus.

## Polygons
S: A polygon is a closed shape with straight sides. The angle sums of polygons follow from splitting them into triangles, and regular polygons have elegant formulas for their interior and exterior angles.
O: Calculate interior and exterior angle sums of polygons
O: Find the angles and number of sides of regular polygons
T: Regular polygon | A polygon with all sides equal and all angles equal
T: Exterior angle sum | The exterior angles of any convex polygon add to 360°
H: Angle sums
- A polygon with n sides splits into n − 2 triangles from one vertex, so the interior angles add to (n − 2) × 180°.
- Pentagon: 540°; hexagon: 720°; octagon: 1,080°.
- Exterior angles of a convex polygon add to 360° (walking round it, you turn through one full turn).
H: Regular polygons
- Each exterior angle = 360°/n; each interior angle = 180° − 360°/n.
- A regular hexagon: exterior 60°, interior 120°.
- If each exterior angle is 24°, then n = 360/24 = 15 sides.
- Interior angles must make (n − 2) × 180/n, so a regular polygon with interior angle 130° doesn't exist (n = 7.2).
X: Each interior angle of a regular polygon is 156°. How many sides does it have?
> Each exterior angle = 180 − 156 = 24°
> n = 360/24
> n = 15 sides
- Concave polygons still have interior angle sum (n − 2) × 180°, though one angle is reflex.
- Diagonals: an n-sided polygon has n(n − 3)/2 diagonals.
K: Interior sum (n − 2) × 180°; exterior sum 360°; for regular polygons use 360/n for each exterior angle.
!: Using 360° as the interior angle sum for every polygon.
Q: What is the interior angle sum of a hexagon? | 720°.
Q: What is each exterior angle of a regular decagon? | 36°.
SUM: Polygons split into triangles.
SUM: Exterior angles always total 360°.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: angles in polygons | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u05-09-q1@1: What is each interior angle of a regular octagon? | 135 | 0 | ° | The exterior angle is 360/8 = 45°, so the interior angle is 135°.
M1#maths-u05-09-q2@1: What is the sum of the interior angles of a pentagon? | 540° | 360° | 720° | 500° | 900° | A pentagon splits into 3 triangles from one vertex: (5 − 2) × 180 = 540°.
M3#maths-u05-09-q3@2: Can a regular polygon have interior angles of 145°? | No: the exterior angle 35° doesn't divide 360 exactly | Yes, with 10 sides | Yes, with 35 sides | Yes, with 145 sides | Only if it's irregular | n = 360/35 isn't a whole number, so no regular polygon has that angle.

## Pythagorean Theorem
S: Pythagoras' theorem says that in a right-angled triangle, the square on the hypotenuse equals the sum of the squares on the other two sides. It's one of the most used results in mathematics, from building to navigation to distances in coordinates.
O: Use Pythagoras' theorem to find missing sides in 2D and 3D
O: Use the converse to test for right angles
T: Hypotenuse | The longest side of a right-angled triangle, opposite the right angle
T: Pythagorean triple | Whole numbers a, b, c with a^{2} + b^{2} = c^{2}, such as 3, 4, 5 and 5, 12, 13
H: The theorem
E: a^{2} + b^{2} = c^{2} (c the hypotenuse)
- Hypotenuse: c = √(a^{2} + b^{2}). A shorter side: a = √(c^{2} − b^{2}).
- Converse: if a^{2} + b^{2} = c^{2}, the triangle has a right angle opposite c. Builders use the 3-4-5 rule to set out right angles.
- There are hundreds of proofs, including one by rearranging four copies of the triangle in a square.
H: Applications
- Distance between points: √((x₂ − x₁)^{2} + (y₂ − y₁)^{2}).
- 3D: the space diagonal of a cuboid is √(a^{2} + b^{2} + c^{2}).
- Isosceles triangles: split into two right-angled triangles to find the height.
X: A cuboid measures 3 cm by 4 cm by 12 cm. Find the length of its longest diagonal.
> The base diagonal is √(3^{2} + 4^{2}) = 5 cm
> The space diagonal is √(5^{2} + 12^{2})
> = √169 = 13 cm (or directly √(9 + 16 + 144))
P: **Investigate with the lab.** Choose Pythagoras' theorem. Decide first whether you're finding the hypotenuse (add squares) or a shorter side (subtract).
IX: practice
K: a^{2} + b^{2} = c^{2} with c the hypotenuse; subtract to find a shorter side; extends to distances and 3D.
!: Adding squares when finding a shorter side (you should subtract).
Q: Is a triangle with sides 7, 24 and 25 right-angled? | Yes: 49 + 576 = 625.
Q: What is the distance between (1, 2) and (4, 6)? | 5.
SUM: Pythagoras links the sides of right-angled triangles.
SUM: It gives distances in 2D and 3D.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Maor E, The Pythagorean Theorem: A 4,000-Year History (Princeton University Press 2007) | textbook | 2007 | https://press.princeton.edu/
NUM1#maths-u05-10-q1@1: A ladder 6.5 m long reaches 6 m up a wall. How far is its foot from the wall? | 2.5 | 0.01 | m | √(6.5^{2} − 6^{2}) = √(42.25 − 36) = √6.25 = 2.5 m.
M1#maths-u05-10-q2@1: Which is a Pythagorean triple? | 8, 15, 17 | 6, 8, 12 | 5, 6, 7 | 2, 3, 4 | 9, 12, 16 | Check a^{2} + b^{2} = c^{2}: 8^{2} + 15^{2} = 64 + 225 = 289 = 17^{2}.
M3#maths-u05-10-q3@2: What is the distance between (−2, 3) and (4, −5)? | 10 | 14 | 8 | √20 | 6 | The differences are 6 and 8, so the distance is √(6^{2} + 8^{2}) = √100 = 10.
NUM1#maths-u05-10-q4@1: A right-angled triangle has hypotenuse 13 and one side 5. How long is the other side? | 12 | 0 |  | √(13^{2} − 5^{2}) = √144 = 12.

## Circles
S: A circle is the set of points at a fixed distance from a centre. Its circumference and area involve π, the ratio of circumference to diameter, one of mathematics' most famous constants.
O: Name the parts of a circle
O: Calculate circumferences and areas of circles
T: Radius | The distance from the centre to the circle; the diameter is twice the radius
T: π (pi) | The ratio of a circle's circumference to its diameter, about 3.14159
H: Parts of a circle
- Radius, diameter, circumference, chord (a segment joining two points on the circle), arc (part of the circumference), sector (a "pizza slice"), segment (region between a chord and an arc), tangent (a line touching at one point).
H: Formulas
E: C = πd = 2πr; A = πr^{2}
- A circle of radius 5 cm: C = 10π ≈ 31.4 cm and A = 25π ≈ 78.5 cm^{2}.
- Leave answers in terms of π for exactness when asked.
- Working backwards: if A = 50 cm^{2}, then r = √(50/π) ≈ 3.99 cm.
- Semicircles and quarter circles: take the fraction, and remember the straight edges for perimeters.
- The equation of a circle with centre (a, b) and radius r is (x − a)^{2} + (y − b)^{2} = r^{2}.
X: Find the perimeter and area of a semicircle with diameter 12 cm, in terms of π.
> Curved edge = ½ × π × 12 = 6π cm; plus the diameter 12 cm
> Perimeter = 6π + 12 cm (≈ 30.8 cm)
> Area = ½ × π × 6^{2} = 18π cm^{2}
P: **Investigate with the lab.** Drag A, B and C round the circle and watch the angle at the circumference and the angle at the centre stay in the ratio 1 : 2.
IX: circles
K: C = 2πr and A = πr^{2}; include straight edges in perimeters of parts of circles; give exact answers in π when asked.
!: Using the diameter in A = πr^{2}.
Q: What is the circumference of a circle with radius 7 cm, in terms of π? | 14π cm.
Q: What is a chord? | A line segment joining two points on a circle.
SUM: Circles are defined by a centre and radius.
SUM: π links diameter, circumference and area.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Beckmann P, A History of Pi (St Martin's Press 1971) | textbook | 1971 | https://us.macmillan.com/
NUM1#maths-u05-11-q1@1: A circle has area 64π cm². What is its circumference, in terms of π? | 16 | 0 | π cm | r^{2} = 64, so r = 8 and C = 2π × 8 = 16π cm.
M1#maths-u05-11-q2@1: What is the area of a circle with diameter 10 cm? | 25π cm² | 100π cm² | 10π cm² | 5π cm² | 20π cm² | The radius is 5 cm, so the area is π × 5^{2} = 25π.
M2#maths-u05-11-q3@2: What is the region between a chord and its arc called? | A segment | A sector | A tangent | A radius | An annulus | A sector is bounded by two radii; a segment by a chord and an arc.

## Chords and Tangents
S: Chords and tangents connect lines and circles. A tangent meets a circle at exactly one point, and the radius there is perpendicular to it; the perpendicular from the centre to a chord bisects it.
O: Use properties of chords and tangents to find lengths and angles
O: Find equations of tangents to circles in coordinate geometry
T: Tangent | A straight line that touches a circle at exactly one point
T: Perpendicular bisector of a chord | The line through the midpoint of a chord at right angles; it passes through the centre
H: Properties
- A tangent is perpendicular to the radius at the point of contact.
- The two tangents from an external point are equal in length.
- The perpendicular from the centre to a chord bisects the chord; conversely, the perpendicular bisector of any chord passes through the centre.
- Equal chords are the same distance from the centre.
H: Using them
- Right angles at the point of contact mean Pythagoras and trigonometry apply.
- Finding a circle's centre from three points: intersect the perpendicular bisectors of two chords.
- In coordinates, the tangent at P has gradient −1/(gradient of the radius to P).
X: A chord of length 16 cm is 6 cm from the centre of a circle. Find the radius.
> The perpendicular from the centre bisects the chord into 8 cm halves
> The radius is the hypotenuse of a right-angled triangle with legs 6 and 8
> r = √(36 + 64) = 10 cm
P: **Investigate with the lab.** Make AB a diameter in the semicircle view and move C anywhere on the arc: the chords AC and BC always meet at 90°.
IX: circles
K: Tangent ⟂ radius; tangents from a point are equal; the centre's perpendicular bisects a chord.
!: Assuming a line touching a diagram's circle is a tangent without the perpendicular property.
Q: What angle does a tangent make with the radius at the point of contact? | 90°.
Q: How can you find the centre of a circle from a chord? | Draw the chord's perpendicular bisector: the centre lies on it.
SUM: Tangents are perpendicular to radii.
SUM: Perpendiculars from the centre bisect chords.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Department for Education, Mathematics AS and A level subject content: coordinate geometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
NUM1#maths-u05-12-q1@1: A tangent from a point P touches a circle of radius 5 cm. P is 13 cm from the centre. How long is the tangent? | 12 | 0 | cm | The radius is perpendicular to the tangent, so √(13^{2} − 5^{2}) = 12 cm.
M1#maths-u05-12-q2@1: Two tangents from an external point to a circle are: | Equal in length | Perpendicular | Parallel | Different lengths | Always 90° apart | By symmetry, tangents from the same external point are the same length.
M2#maths-u05-12-q3@2: The centre of a circle is (2, 1) and P(5, 5) is on it. What is the gradient of the tangent at P? | −3/4 | 4/3 | 3/4 | −4/3 | 0 | The radius has gradient 4/3, so the tangent's gradient is the negative reciprocal, −3/4.

## Circle Theorems
S: The circle theorems describe the angles formed by chords, tangents and radii in a circle. They're elegant, provable from basic facts, and a staple of GCSE Higher geometry.
O: State and apply the circle theorems with correct reasons
O: Prove a circle theorem using isosceles triangles
T: Cyclic quadrilateral | A quadrilateral whose four vertices lie on a circle
T: Subtended angle | The angle formed at a point by lines from the ends of an arc or chord
H: The theorems
- The angle at the centre is twice the angle at the circumference subtended by the same arc.
- The angle in a semicircle is 90°.
- Angles in the same segment are equal.
- Opposite angles of a cyclic quadrilateral add to 180°.
- The tangent is perpendicular to the radius; tangents from a point are equal.
- Alternate segment theorem: the angle between a tangent and a chord equals the angle in the alternate segment.
H: Proofs and use
- Proof of "angle at centre": join the centre to the point on the circumference, creating two isosceles triangles; the exterior angles give 2a + 2b = 2(a + b).
- In answers, name the theorem as the reason ("angle in a semicircle is 90°").
X: A, B and C lie on a circle with centre O, and angle AOC = 140°. B is on the major arc. Find angle ABC.
> The angle at the centre is twice the angle at the circumference
> Angle ABC = 140 ÷ 2
> = 70°
P: **Investigate with the lab.** Work through all four views. For each theorem, try to break it by moving the points, then explain from the readouts why you can't.
IX: circles
K: Centre angle = 2 × circumference angle; semicircle 90°; same segment equal; cyclic opposite angles 180°; alternate segment.
!: Applying the cyclic quadrilateral rule when one vertex isn't on the circle.
Q: What is the angle in a semicircle? | 90°.
Q: What do opposite angles in a cyclic quadrilateral add up to? | 180°.
SUM: Circle theorems connect angles and arcs.
SUM: State the theorem as the reason.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Heath TL (trans.), Euclid: The Thirteen Books of the Elements (Dover 1956) | textbook | 1956 | https://store.doverpublications.com/
NUM1#maths-u05-13-q1@1: In a cyclic quadrilateral, one angle is 4x and its opposite angle is 5x. Find x. | 20 | 0 | ° | Opposite angles add to 180°: 9x = 180, so x = 20.
M1#maths-u05-13-q2@1: AB is a diameter and C is on the circle. What is angle ACB? | 90° | 180° | 45° | 60° | It depends on C | The angle in a semicircle is a right angle.
M3#maths-u05-13-q3@2: The angle between a tangent and chord AB at A is 52°. What is the angle subtended by AB in the alternate segment? | 52° | 104° | 38° | 128° | 26° | By the alternate segment theorem, it equals the tangent–chord angle.

## Constructions
S: Geometric constructions use only a straight edge and compasses to draw accurate figures: perpendicular bisectors, angle bisectors, perpendiculars and triangles. They show how geometry follows from the properties of circles.
O: Construct perpendicular bisectors, angle bisectors and perpendiculars
O: Construct triangles from given information
T: Perpendicular bisector | The line at right angles to a segment through its midpoint: every point on it is equidistant from the segment's ends
T: Angle bisector | The line splitting an angle into two equal angles: every point on it is equidistant from the angle's arms
H: The standard constructions
- **Perpendicular bisector of AB**: with compasses set to more than half AB, draw arcs from A and B above and below; join the crossing points.
- **Angle bisector**: from the vertex, draw an arc cutting both arms; from these two points draw equal arcs that cross; join the vertex to the crossing.
- **Perpendicular from a point to a line**: draw an arc from the point cutting the line twice, then bisect that segment.
- Leave construction arcs visible: they show the method.
H: Triangles and angles
- SSS: draw one side, then arcs of the other two lengths from its ends.
- 60°: an equilateral triangle construction; bisect it for 30°; 90° from a perpendicular; 45° by bisecting 90°.
- Why they work: points equidistant from A and B lie on the perpendicular bisector, a property of congruent triangles.
X: Describe how to construct an angle of 45° at a point A on a line.
> Construct the perpendicular to the line at A (bisect a segment centred on A), giving 90°
> Bisect the 90° angle using equal arcs from points on each arm
> The bisector makes 45° with the line
K: Use compasses and a straight edge; keep arcs visible; bisectors give 90°, and halving equilateral angles gives 60° and 30°.
!: Changing the compass width midway through a construction that needs equal arcs.
Q: Which points lie on the perpendicular bisector of AB? | Points equidistant from A and B.
Q: How do you construct a 30° angle? | Construct 60° (an equilateral triangle), then bisect it.
SUM: Constructions use only compasses and a straight edge.
SUM: Bisectors are loci of equidistant points.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Hartshorne R, Geometry: Euclid and Beyond (Springer 2000) | textbook | 2000 | https://link.springer.com/
M1#maths-u05-14-q1@1: Which construction finds all points equidistant from two points A and B? | The perpendicular bisector of AB | The angle bisector | A circle centred on A | A line parallel to AB | The midpoint only | Every point on the perpendicular bisector is the same distance from A and B.
M2#maths-u05-14-q2@2: Which angle can't be constructed with compasses and a straight edge alone by bisecting standard angles? | 20° | 30° | 45° | 15° | 22.5° | Bisecting 60° and 90° gives 30°, 45°, 15° and 22.5°; trisecting 60° to get 20° is impossible with these tools (Wantzel, 1837).

## Loci
S: A locus is the set of all points satisfying a rule, such as "always 3 m from a tree". Loci combine with constructions to solve practical problems about regions and boundaries.
O: Draw loci for standard rules
O: Combine loci to identify regions satisfying several conditions
T: Locus | The set of points that satisfy a given condition (plural: loci)
T: Equidistant | At equal distances from two points, lines or objects
H: Standard loci
- A fixed distance from a point: a circle.
- A fixed distance from a line segment: a "running track" shape (two parallel lines joined by semicircles).
- Equidistant from two points: the perpendicular bisector.
- Equidistant from two intersecting lines: the angle bisectors.
- "Less than 3 m" gives a region inside a boundary (often shaded); "more than" gives outside.
H: Combining loci
- Shade the region satisfying all conditions: closer to A than B, and within 5 km of C.
- Use solid boundaries for "at most" and dashed for "less than" if required.
- Loci in coordinate geometry give equations: points equidistant from (0, 0) and (4, 0) satisfy x = 2.
X: A goat is tied to a corner of a 10 m by 6 m shed (outside it) with a 4 m rope. Describe the region it can graze.
> From the corner, the rope sweeps three quarters of a circle of radius 4 m (the shed blocks the other quarter)
> Its area is ¾ × π × 4^{2} = 12π
> ≈ 37.7 m^{2}
K: Points at a fixed distance from a point form a circle; equidistant from two points is the perpendicular bisector; combine loci to find regions.
!: Drawing a locus from a line segment with square corners instead of semicircular ends.
Q: What is the locus of points 2 cm from a point P? | A circle of radius 2 cm centred on P.
Q: What is the locus of points equidistant from two intersecting lines? | The bisectors of the angles between them.
SUM: Loci are sets of points obeying rules.
SUM: Intersections of loci solve practical problems.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: constructions and loci | guidance | 2019 | https://www.ncetm.org.uk/
M1#maths-u05-15-q1@1: What is the locus of points 5 m from a straight wall (on one side)? | A line parallel to the wall, 5 m away | A circle of radius 5 m | A perpendicular bisector | An angle bisector | A single point | Every point 5 m from the wall lies on a parallel line at that distance.
M2#maths-u05-15-q2@2: Points equidistant from (0, 0) and (6, 0) lie on which line? | x = 3 | y = 3 | y = x | x = 6 | y = 0 | That's the perpendicular bisector of the segment, through its midpoint (3, 0).

## Bearings
S: A bearing gives a direction as a three-figure angle measured clockwise from north. Bearings are used in navigation, orienteering, aviation and surveying, and combine with trigonometry to find distances.
O: Measure and calculate bearings
O: Find back bearings and solve bearing problems with trigonometry
T: Bearing | An angle measured clockwise from north, written with three figures, such as 045°
T: Back bearing | The bearing of the return journey: add or subtract 180°
H: The rules
- Measure from north, clockwise, and write three figures: east is 090°, south 180°, west 270°.
- "The bearing of B from A" means stand at A and measure to B.
- Back bearing: if B is on a bearing of 060° from A, then A is on a bearing of 240° from B.
H: Calculations
- North lines at different points are parallel, so co-interior and alternate angles apply.
- Combine with trigonometry: a ship sails 8 km on 040°, then 6 km on 130°; the two legs meet at 90°, so the distance from the start is 10 km.
- Find the bearing back: from the end point, use trigonometry for the angle, then convert to a three-figure bearing.
X: A plane flies 300 km due east, then 400 km due north. Find its bearing from the start.
> The angle at the start between north and the plane's position: tan θ = 300/400
> θ = 36.9°
> Bearing = 036.9° ≈ 037°
- Bearings are given to the nearest degree unless stated.
K: Bearings are clockwise from north with three figures; back bearings differ by 180°; use parallel north lines and trigonometry.
!: Measuring anticlockwise, or from the wrong point.
Q: What is the bearing of due west? | 270°.
Q: B is on a bearing of 300° from A. What is the bearing of A from B? | 120°.
SUM: Bearings measure direction from north.
SUM: Parallel north lines and trigonometry solve problems.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Ordnance Survey, Map reading made easy | guidance | 2023 | https://www.ordnancesurvey.co.uk/
NUM1#maths-u05-16-q1@1: The bearing of Q from P is 155°. What is the bearing of P from Q? | 335 | 0 | ° | Add 180° for the back bearing: 155 + 180 = 335°.
M1#maths-u05-16-q2@1: Which bearing describes south-east? | 135° | 045° | 225° | 315° | 090° | South-east is halfway between east (090°) and south (180°).
M2#maths-u05-16-q3@2: A walker goes 5 km north and 5 km east. What is her bearing from the start? | 045° | 090° | 135° | 000° | 315° | Equal north and east components give an angle of 45° clockwise from north.

## Perimeter
S: The perimeter is the total distance around the outside of a shape. It's what you'd need for fencing, edging or a frame, and calculating it carefully means accounting for every edge, including curved ones.
O: Calculate perimeters of polygons and compound shapes
O: Calculate perimeters involving arcs and circles
T: Perimeter | The total length of the boundary of a 2D shape
T: Compound shape | A shape made from simpler shapes joined together
H: Polygons and compound shapes
- Add all the side lengths, in the same units.
- For compound (L-shaped) shapes, find missing sides from the given ones: opposite sides of a rectangle-based shape add up.
- A rectangle: P = 2(l + w). A regular polygon: P = n × side.
- Perimeter and area are different: two rectangles with perimeter 20 (1 × 9 and 5 × 5) have areas 9 and 25.
H: Curved edges
- Circle: C = 2πr; semicircle: πr plus the diameter; quarter circle: ½πr plus two radii.
- Running track shapes: two straight sides plus two semicircles (one full circle).
- Algebraic perimeters: a rectangle with sides x and x + 3 has P = 4x + 6; if P = 30, x = 6.
X: A shape is a 10 cm by 6 cm rectangle with a semicircle on one 6 cm side (the side is removed). Find its perimeter.
> The straight edges are 10 + 6 + 10 = 26 cm
> The semicircle has diameter 6 cm: its arc is ½ × π × 6 = 3π ≈ 9.42 cm
> Perimeter ≈ 26 + 9.42 = 35.4 cm
K: Add every edge in the same units; find missing sides from given ones; include arcs, and exclude internal edges.
!: Including an internal edge where two shapes join, or forgetting the straight diameter of a semicircle.
Q: What is the perimeter of a regular hexagon with side 7 cm? | 42 cm.
Q: Does a larger perimeter always mean a larger area? | No: perimeter and area are independent.
SUM: Perimeter is the boundary length.
SUM: Curved edges use circle formulas.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: perimeter and area | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u05-17-q1@1: A rectangle has length 3 cm more than its width and perimeter 34 cm. What is its width? | 7 | 0 | cm | 2(w + w + 3) = 34 gives 4w + 6 = 34, so w = 7 cm.
M1#maths-u05-17-q2@1: What is the perimeter of a quarter circle of radius 4 cm, to 1 decimal place? | 14.3 cm | 6.3 cm | 12.6 cm | 8.0 cm | 25.1 cm | The arc is ¼ × 2π × 4 = 2π ≈ 6.28, plus two radii of 4: 14.3 cm.
M2#maths-u05-17-q3@2: Which rectangle with perimeter 24 cm has the largest area? | 6 cm by 6 cm | 10 cm by 2 cm | 8 cm by 4 cm | 11 cm by 1 cm | 9 cm by 3 cm | For a fixed perimeter, the square gives the largest area: 36 cm^{2}.

## Area
S: Area measures the amount of surface a 2D shape covers, in square units. Formulas for rectangles, triangles, parallelograms, trapeziums and circles combine to find the area of almost any shape.
O: Use area formulas for standard shapes
O: Find areas of compound shapes and convert area units
T: Area | The size of a 2D surface, measured in square units such as cm^{2} or m^{2}
T: Perpendicular height | The height measured at right angles to the base
H: Formulas
E: Rectangle lw; triangle ½bh; parallelogram bh; trapezium ½(a + b)h; circle πr^{2}; sector (θ/360) × πr^{2}
- Always use the perpendicular height, not a slanted side.
- Compound shapes: split into standard shapes, or subtract a cut-out from a larger shape.
H: Units
- 1 m = 100 cm, so 1 m^{2} = 100 × 100 = 10,000 cm^{2}.
- 1 cm^{2} = 100 mm^{2}; 1 hectare = 10,000 m^{2}; 1 km^{2} = 1,000,000 m^{2}.
- Areas of similar shapes scale by the square of the length scale factor.
- Real-world area problems: paint coverage, flooring, land, and costs per square metre.
X: A garden is a 12 m by 8 m rectangle with a circular pond of radius 1.5 m. Turf costs £6.50 per m². Find the cost of turfing the garden around the pond.
> Garden area = 96 m^{2}; pond area = π × 1.5^{2} ≈ 7.07 m^{2}
> Turf area ≈ 96 − 7.07 = 88.93 m^{2}
> Cost ≈ 88.93 × 6.50 ≈ £578.05
- Estimating irregular areas: count squares on a grid.
K: Use the perpendicular height; split or subtract compound shapes; 1 m^{2} = 10,000 cm^{2}.
!: Converting 1 m^{2} to 100 cm^{2} instead of 10,000 cm^{2}.
Q: What is the area of a triangle with base 9 cm and height 6 cm? | 27 cm^{2}.
Q: How many cm^{2} are in 3 m^{2}? | 30,000 cm^{2}.
SUM: Area formulas cover standard shapes.
SUM: Square the conversion factor for area units.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: perimeter and area | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u05-18-q1@1: Find the area of a sector with radius 10 cm and angle 72°, to 1 decimal place. | 62.8 | 0.05 | cm² | (72/360) × π × 100 = 20π ≈ 62.8 cm^{2}.
M1#maths-u05-18-q2@1: A parallelogram has base 8 cm, slanted side 5 cm and perpendicular height 4 cm. What is its area? | 32 cm² | 40 cm² | 20 cm² | 26 cm² | 16 cm² | Area = base × perpendicular height = 8 × 4; the slanted side isn't used.
M2#maths-u05-18-q3@2: How many mm² are in 1 m²? | 1,000,000 | 1,000 | 10,000 | 100,000 | 100 | 1 m = 1,000 mm, so 1 m^{2} = 1,000 × 1,000 mm^{2}.

## Arc Length
S: An arc is part of a circle's circumference. Its length is a fraction of the whole circumference, set by the angle at the centre, and in radians the formula is especially simple.
O: Calculate arc lengths and sector perimeters in degrees and radians
O: Find angles or radii from given arc lengths
T: Arc | A part of the circumference of a circle
T: Radian | The angle subtended at the centre by an arc equal in length to the radius; 2π radians = 360°
H: Formulas
E: Degrees: arc = (θ/360) × 2πr; radians: arc = rθ
E: Sector area: (θ/360) × πr^{2} or ½r^{2}θ (radians)
- An angle of 90° and radius 8 cm: arc = ¼ × 16π = 4π ≈ 12.6 cm.
- In radians, θ = 1.2 and r = 5 gives arc = 6 cm directly.
H: Sector perimeters and reverse problems
- A sector's perimeter is the arc plus two radii.
- Find θ from an arc: θ = arc/r (radians) or θ = 360 × arc/(2πr) (degrees).
- Arc lengths give distances on the Earth's surface along great circles (spherical geometry, later in this school).
X: A sector has radius 9 cm and perimeter 30 cm. Find the angle at the centre, in radians and degrees.
> Arc = 30 − 2 × 9 = 12 cm
> θ = 12/9 = 4/3 ≈ 1.33 radians
> In degrees: (4/3) × 180/π ≈ 76.4°
- Major and minor arcs: a 60° arc and the 300° arc make the whole circle.
- Segment area = sector area − triangle area (½r^{2}(θ − sin θ) in radians).
- Radians: π/3 is 60° and 2π/3 is 120°.
K: Arc = fraction of the circumference; in radians, arc = rθ and sector area = ½r^{2}θ; sector perimeter adds two radii.
!: Using rθ with θ in degrees.
Q: What is the arc length for r = 4 and θ = π/2? | 2π.
Q: What's the perimeter of a sector? | The arc length plus two radii.
SUM: Arcs are fractions of circumferences.
SUM: Radians make the formulas simpler.
SRC: Department for Education, Mathematics AS and A level subject content: trigonometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
NUM1#maths-u05-19-q1@1: Find the arc length of a sector with radius 6 cm and angle 2.5 radians. | 15 | 0 | cm | arc = rθ = 6 × 2.5 = 15 cm.
M1#maths-u05-19-q2@1: What fraction of the circumference is an arc subtending 45°? | 1/8 | 1/4 | 1/45 | 45/100 | 1/2 | The arc's share of the circle is its angle over 360°: 45/360 = 1/8.
M2#maths-u05-19-q3@2: What is the area of a sector with r = 4 cm and θ = 0.75 rad? | 6 cm² | 3 cm² | 12 cm² | 1.5 cm² | 24 cm² | With θ in radians, sector area = ½r^{2}θ = ½ × 16 × 0.75 = 6 cm^{2}.

## Solid Geometry
S: Solid geometry studies three-dimensional shapes: prisms, pyramids, cylinders, cones and spheres. Visualising them through nets, plans and elevations, and measuring them, is essential in design, engineering and science.
O: Name and describe common 3D solids
O: Use nets, plans and elevations to represent solids
T: Prism | A solid with the same cross-section along its length
T: Net | A 2D pattern that folds to make a 3D solid
H: Common solids
- **Prisms**: cuboid, triangular prism, cylinder (a circular "prism").
- **Pyramids**: square-based, tetrahedron (triangular-based); a cone is a circular "pyramid".
- **Sphere** and hemisphere.
- Vocabulary: faces, edges, vertices; cross-section; apex.
H: Representing solids
- **Nets**: a cube has 11 different nets.
- **Plans and elevations**: the view from above (plan), the front and the side; architects and engineers use them.
- **Cross-sections**: slicing a cube can give a triangle, square, rectangle, pentagon or hexagon.
- 3D coordinates and vectors describe solids precisely (later in this school).
X: A solid has a plan view that's a circle and front and side elevations that are both triangles. Name it.
> From above, the outline is a circle
> From the front and side, it tapers to a point
> It's a cone
K: Prisms keep the same cross-section; pyramids taper to an apex; nets, plans and elevations represent solids in 2D.
!: Confusing a plan (from above) with an elevation (from the front or side).
Q: What is a prism? | A solid with a constant cross-section along its length.
Q: How many different nets does a cube have? | 11.
SUM: Solids are classified by their shapes and faces.
SUM: 2D views represent 3D solids.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Coxeter HSM, Introduction to Geometry (2nd edn, Wiley 1989) | textbook | 1989 | https://www.wiley.com/
M1#maths-u05-20-q1@1: Which solid has a constant circular cross-section? | A cylinder | A cone | A sphere | A pyramid | A hemisphere | A cylinder is a prism with a circular cross-section.
M3#maths-u05-20-q2@2: Which cross-section is impossible when slicing a cube with a flat plane? | A heptagon | A triangle | A hexagon | A pentagon | A rectangle | A cube has 6 faces, so a plane can cut at most 6 of them: at most a hexagon.

## Polyhedra
S: A polyhedron is a solid with flat polygonal faces. The five Platonic solids are the regular polyhedra, and Euler's formula V − E + F = 2 links the numbers of vertices, edges and faces of every convex polyhedron.
O: Identify the Platonic solids
O: Use Euler's formula to find vertices, edges or faces
T: Polyhedron | A solid bounded by flat polygonal faces (plural: polyhedra)
T: Euler's formula | V − E + F = 2 for any convex polyhedron
H: The Platonic solids
- Tetrahedron (4 triangles), cube (6 squares), octahedron (8 triangles), dodecahedron (12 pentagons), icosahedron (20 triangles).
- They're the only convex polyhedra with identical regular faces and the same arrangement at every vertex, and there are exactly five (Euclid proved it).
H: Euler's formula
- Cube: V = 8, E = 12, F = 6: 8 − 12 + 6 = 2.
- Square-based pyramid: 5 − 8 + 5 = 2.
- Use it to find a missing count: a polyhedron with 12 vertices and 20 faces has 30 edges (an icosahedron).
- It's a first result in topology (School 17): it depends only on how faces connect, not on lengths.
X: A polyhedron has 10 faces, all quadrilaterals or triangles, and 16 edges. How many vertices does it have?
> Euler: V − E + F = 2
> V − 16 + 10 = 2
> V = 8
- Archimedean solids (like the truncated icosahedron, a football) have regular faces of more than one type.
- Prisms and pyramids satisfy Euler's formula too.
K: There are five Platonic solids; V − E + F = 2 for every convex polyhedron.
!: Counting edges twice (each edge is shared by two faces).
Q: How many faces does an octahedron have? | 8.
Q: Check Euler's formula for a tetrahedron. | 4 − 6 + 4 = 2.
SUM: Polyhedra have flat polygonal faces.
SUM: Euler's formula holds for all convex polyhedra.
SRC: Coxeter HSM, Introduction to Geometry (2nd edn, Wiley 1989) | textbook | 1989 | https://www.wiley.com/
SRC: Richeson DS, Euler's Gem: The Polyhedron Formula and the Birth of Topology (Princeton University Press 2008) | textbook | 2008 | https://press.princeton.edu/
NUM1#maths-u05-21-q1@1: A convex polyhedron has 12 faces and 20 vertices. How many edges does it have? | 30 | 0 |  | V − E + F = 2 gives 20 − E + 12 = 2, so E = 30 (a dodecahedron).
M1#maths-u05-21-q2@1: How many Platonic solids are there? | 5 | 3 | 4 | 6 | Infinitely many | Only five convex regular polyhedra exist: tetrahedron, cube, octahedron, dodecahedron and icosahedron.
M2#maths-u05-21-q3@2: Which Platonic solid has pentagonal faces? | Dodecahedron | Icosahedron | Octahedron | Tetrahedron | Cube | The dodecahedron has 12 regular pentagonal faces.

## Surface Area
S: The surface area of a solid is the total area of all its faces or curved surfaces. It matters for packaging, painting, heat loss and biology, where the surface-area-to-volume ratio is crucial.
O: Calculate surface areas of prisms, pyramids, cylinders, cones and spheres
O: Use nets to find surface areas
T: Surface area | The total area of the outer surface of a 3D shape
T: Slant height | The distance from the apex of a cone or pyramid to the edge of its base along its surface
H: Formulas
E: Cylinder 2πr^{2} + 2πrh; cone πr^{2} + πrl (l the slant height); sphere 4πr^{2}; hemisphere 3πr^{2} (including the flat face)
- Prisms and pyramids: add the areas of all the faces (a net helps).
- Cuboid: 2(lw + lh + wh).
- The cone's slant height: l = √(r^{2} + h^{2}).
H: Surface area to volume
- As objects grow, volume grows faster (k^{3}) than surface area (k^{2}), so large animals lose heat more slowly, and cells stay small.
- Closed or open shapes: check whether to include a lid or base.
X: Find the total surface area of a cone with radius 6 cm and perpendicular height 8 cm, in terms of π.
> Slant height l = √(36 + 64) = 10 cm
> Curved surface = πrl = 60π cm^{2}; base = πr^{2} = 36π cm^{2}
> Total = 96π cm^{2}
- Composite solids: add the outer surfaces and leave out hidden joins, such as where a hemisphere sits on a cylinder.
- A cuboid's net has three pairs of equal rectangles.
K: Add all faces (nets help); use slant height for cones; sphere 4πr^{2}; check for open faces.
!: Using the perpendicular height instead of the slant height in πrl.
Q: What is the surface area of a sphere of radius 3 cm? | 36π cm^{2}.
Q: What is the curved surface area of a cylinder? | 2πrh.
SUM: Surface area adds up every face.
SUM: Slant height is needed for cones and pyramids.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: 3D shapes | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u05-22-q1@1: Find the surface area of a 4 cm by 5 cm by 6 cm cuboid. | 148 | 0 | cm² | 2(20 + 24 + 30) = 2 × 74 = 148 cm^{2}.
M1#maths-u05-22-q2@1: What is the total surface area of a closed cylinder with r = 2 cm and h = 5 cm? | 28π cm² | 20π cm² | 24π cm² | 14π cm² | 40π cm² | Two circular ends 2πr^{2} = 8π plus the curved surface 2πrh = 20π gives 28π.
M2#maths-u05-22-q3@2: What is the curved surface area of a hemisphere of radius 5 cm? | 50π cm² | 100π cm² | 75π cm² | 25π cm² | 125π cm² | Half of 4πr^{2} = 2π × 25 = 50π (add 25π for the flat face if it's included).

## Volume
S: Volume measures the space a 3D object occupies, in cubic units. Formulas for prisms, pyramids, cones and spheres let us compute capacities, masses (with density) and costs.
O: Calculate volumes of prisms, cylinders, pyramids, cones and spheres
O: Convert volume and capacity units
T: Volume | The amount of space inside a 3D shape, measured in cubic units
T: Capacity | The amount a container holds, often in litres: 1 litre = 1,000 cm^{3}
H: Formulas
E: Prism (including cylinder): area of cross-section × length; pyramid and cone: ⅓ × base area × height; sphere: (4/3)πr^{3}
- Cylinder: πr^{2}h. Cone: ⅓πr^{2}h. Hemisphere: (2/3)πr^{3}.
- A cone is exactly one third of the cylinder with the same base and height.
H: Units and uses
- 1 m^{3} = 1,000,000 cm^{3} = 1,000 litres; 1 ml = 1 cm^{3}.
- Density = mass ÷ volume: a 200 cm^{3} block of aluminium (density 2.7 g/cm^{3}) has mass 540 g.
- Frustums: subtract a small cone from a large one.
X: A water tank is a cylinder of radius 0.5 m and height 1.2 m. How many litres does it hold?
> V = π × 0.5^{2} × 1.2 = 0.3π ≈ 0.942 m^{3}
> 1 m^{3} = 1,000 litres
> Capacity ≈ 942 litres
- Composite solids: add or subtract volumes, such as a hemisphere on a cylinder.
- Volumes of similar solids scale by k^{3}.
- Cavalieri's principle: solids with equal cross-sections at every height have equal volumes.
K: Prisms: cross-section × length; pyramids and cones: one third base × height; spheres (4/3)πr^{3}; 1 m^{3} = 1,000 litres.
!: Forgetting the ⅓ for pyramids and cones.
Q: What is the volume of a cone with r = 3 cm and h = 4 cm? | 12π cm^{3}.
Q: How many cm^{3} are in a litre? | 1,000.
SUM: Volume formulas cover standard solids.
SUM: Cube the conversion factor for volume units.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: National Centre for Excellence in the Teaching of Mathematics, Secondary mastery professional development materials: 3D shapes | guidance | 2019 | https://www.ncetm.org.uk/
NUM1#maths-u05-23-q1@1: Find the volume of a sphere of radius 3 cm, in terms of π. | 36 | 0 | π cm³ | (4/3)π × 27 = 36π cm^{3}.
M1#maths-u05-23-q2@1: A triangular prism has a cross-section of area 15 cm² and length 8 cm. What is its volume? | 120 cm³ | 60 cm³ | 23 cm³ | 40 cm³ | 1,800 cm³ | Volume of a prism = area of cross-section × length.
M3#maths-u05-23-q3@2: A cone and a cylinder have the same radius and the same volume. How do their heights compare? | The cone is three times as tall | They're equal | The cylinder is three times as tall | The cone is twice as tall | The cone is √3 times as tall | Equal volumes: ⅓πr^{2}h₁ = πr^{2}h₂, so the cone's height is h₁ = 3h₂.

## Geometric Transformations
S: Transformations move or change shapes: translations, reflections, rotations and enlargements. Describing them precisely, and combining them, links geometry with vectors, matrices and symmetry.
O: Perform and describe the four basic transformations
O: Describe combined transformations as single transformations where possible
T: Isometry | A transformation preserving lengths and angles (translation, reflection, rotation)
T: Centre of enlargement | The fixed point from which an enlargement scales distances
H: The four transformations
- **Translation**: slide by a vector (3, −2); the shape keeps its orientation.
- **Reflection**: in a mirror line (such as y = x or x = 2); the image is reversed.
- **Rotation**: by an angle, in a direction, about a centre (90° clockwise about (0, 0)).
- **Enlargement**: by a scale factor from a centre; factors between 0 and 1 shrink, negative factors put the image on the other side of the centre.
- Full descriptions need all the details: "rotation 90° anticlockwise about (1, 2)".
H: Combining and matrices
- Two reflections in parallel lines make a translation; in intersecting lines, a rotation.
- Isometries give congruent images; enlargements give similar images.
- In coordinates, transformations are matrices (School 11): reflection in y = x swaps x and y.
X: Triangle A has vertices (1, 1), (3, 1), (1, 2). Enlarge it by scale factor −2 about the origin.
> Multiply each coordinate by −2
> (1, 1) → (−2, −2); (3, 1) → (−6, −2); (1, 2) → (−2, −4)
> The image is twice the size, on the opposite side of the origin and turned through 180°
P: **Investigate with the lab.** Build matrices for a rotation, a reflection and an enlargement, and note each one's determinant.
IX: matrix
K: Describe every transformation fully (vector; mirror line; angle, direction and centre; scale factor and centre).
!: Describing a rotation without its centre or direction.
Q: Which transformations produce congruent images? | Translations, reflections and rotations.
Q: What does a negative scale factor do in an enlargement? | It places the image on the opposite side of the centre, inverted.
SUM: Transformations move and resize shapes.
SUM: Full descriptions need every detail.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Coxeter HSM, Introduction to Geometry (2nd edn, Wiley 1989) | textbook | 1989 | https://www.wiley.com/
M1#maths-u05-24-q1@1: Where does (4, 1) go after reflection in the line y = x? | (1, 4) | (−4, 1) | (4, −1) | (−1, −4) | (1, −4) | Reflection in y = x swaps the coordinates.
M2#maths-u05-24-q2@2: Where does (2, 5) go after a 90° clockwise rotation about the origin? | (5, −2) | (−5, 2) | (−2, 5) | (2, −5) | (−5, −2) | A 90° clockwise rotation maps (x, y) to (y, −x).
M2#maths-u05-24-q3@2: What does the matrix [[3, 0], [0, 3]] do to shapes? | Enlarges them by scale factor 3 about the origin, multiplying areas by 9 | Rotates them by 3° | Reflects them in y = x | Translates them by 3 | Enlarges by 9 and areas by 3 | Both coordinates triple, so lengths ×3 and areas ×9 = det.

## Transformations and Symmetry
S: A shape has symmetry if a transformation maps it onto itself. Line (reflection) and rotational symmetry describe the shapes of letters, logos, crystals and molecules, and lead to group theory.
O: Identify lines of symmetry and the order of rotational symmetry
O: Connect symmetry with transformations
T: Line of symmetry | A mirror line that reflects a shape onto itself
T: Order of rotational symmetry | The number of times a shape fits onto itself in one full turn
H: Types of symmetry
- **Line symmetry**: a square has 4 lines; a rectangle 2; an isosceles triangle 1; a regular n-gon has n.
- **Rotational symmetry**: a square has order 4; an equilateral triangle order 3; a parallelogram order 2; a shape with no rotational symmetry has order 1.
- **Plane symmetry** in 3D: a cube has 9 planes of symmetry.
H: Symmetry and structure
- The set of symmetries of a shape forms a group (School 4): the square's 8 symmetries (4 rotations, 4 reflections) form the dihedral group D₄.
- Symmetry simplifies problems: if f is even, its graph is symmetric in the y-axis.
- Nature and science: snowflakes (order 6), crystals, the symmetry of physical laws.
X: State the lines of symmetry and order of rotational symmetry of a regular hexagon.
> It has 6 lines of symmetry: 3 through opposite vertices and 3 through midpoints of opposite sides
> It fits onto itself after rotations of 60°, 120°, …, 360°
> Order of rotational symmetry 6
K: Count mirror lines and the turns that map a shape onto itself; a regular n-gon has n of each.
!: Saying a parallelogram has lines of symmetry: it has rotational symmetry of order 2 but no mirror lines (unless it's a rhombus or rectangle).
Q: What is the order of rotational symmetry of an equilateral triangle? | 3.
Q: How many lines of symmetry does a rectangle (not a square) have? | 2.
SUM: Symmetry is invariance under transformation.
SUM: Symmetries form groups.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Armstrong MA, Groups and Symmetry (Springer 1988) | textbook | 1988 | https://link.springer.com/
M1#maths-u05-25-q1@1: How many lines of symmetry does a regular pentagon have? | 5 | 1 | 2 | 10 | 0 | A regular n-sided polygon has n lines of symmetry.
M2#maths-u05-25-q2@2: Which shape has rotational symmetry of order 2 but no lines of symmetry? | A (non-rectangular, non-rhombus) parallelogram | A square | A kite | An isosceles trapezium | An equilateral triangle | A general parallelogram looks the same after a half turn, but no mirror line maps it onto itself.

## Tessellations
S: A tessellation is a pattern of shapes covering a plane with no gaps or overlaps. Tessellations appear in tiling, brickwork, honeycombs and art, and their mathematics explains which shapes can tile.
O: Determine which regular polygons tessellate
O: Explain tessellation using angles at a vertex
T: Tessellation | A tiling of the plane by shapes with no gaps or overlaps
T: Regular tessellation | A tessellation using one regular polygon, with the same arrangement at every vertex
H: Which shapes tessellate?
- At each vertex the angles must add to 360°.
- Regular polygons: only triangles (6 × 60°), squares (4 × 90°) and hexagons (3 × 120°) tessellate alone. Pentagons (108°) don't: 360/108 isn't whole.
- Every triangle and every quadrilateral tessellates (rotate copies by 180° about side midpoints).
- Semi-regular tessellations mix regular polygons, such as octagons and squares (135 + 135 + 90 = 360).
H: Beyond
- Bees use hexagons: the shape that tiles with the least perimeter for a given area.
- Escher's artworks use transformations of tessellating shapes.
- Penrose tilings cover the plane without ever repeating periodically, and a single "aperiodic monotile" (the "hat") was discovered in 2023.
X: Can regular octagons tessellate on their own? Can they with squares?
> Each interior angle of a regular octagon is 135°; 360/135 isn't a whole number, so not alone
> Two octagons and a square at a vertex: 135 + 135 + 90 = 360
> So octagons tessellate with squares (as on many bathroom floors)
K: Angles at each vertex must total 360°; only equilateral triangles, squares and regular hexagons tile alone among regular polygons.
!: Assuming every regular polygon tessellates.
Q: Why don't regular pentagons tessellate? | Their 108° angles can't add to exactly 360° at a vertex.
Q: Does every quadrilateral tessellate? | Yes.
SUM: Tessellations need angles summing to 360°.
SUM: Only three regular polygons tile alone.
SRC: Grünbaum B, Shephard GC, Tilings and Patterns (2nd edn, Dover 2016) | textbook | 2016 | https://store.doverpublications.com/
SRC: Smith D, Myers JS, Kaplan CS, Goodman-Strauss C, An aperiodic monotile, Combinatorial Theory 4(1) | journal | 2024 | https://doi.org/10.5070/C64163843
M1#maths-u05-26-q1@1: Which regular polygon tessellates on its own? | Hexagon | Pentagon | Octagon | Heptagon | Decagon | Three hexagons meet at a vertex: 3 × 120° = 360°.
M2#maths-u05-26-q2@2: Which combination of regular polygons fits exactly around a vertex? | Two octagons and a square | Two pentagons and a square | Three pentagons | Two hexagons and a square | An octagon and two triangles | The angles at the vertex must total 360°: 135° + 135° + 90° = 360°.

## Coordinate Geometry
S: Coordinate geometry describes points, lines and shapes with numbers, so geometric problems can be solved with algebra. It was Descartes' great idea, and it underlies graphs, computer graphics and GPS.
O: Find midpoints, distances and gradients of line segments
O: Find and use equations of straight lines
T: Gradient | The steepness of a line: change in y ÷ change in x
T: Midpoint | The point halfway between two points: ((x₁ + x₂)/2, (y₁ + y₂)/2)
H: Points and segments
E: Gradient m = (y₂ − y₁)/(x₂ − x₁); distance √((x₂ − x₁)^{2} + (y₂ − y₁)^{2})
- For A(1, 3) and B(7, 11): gradient 8/6 = 4/3, midpoint (4, 7), length √(36 + 64) = 10.
H: Equations of lines
- y = mx + c: gradient m, y-intercept c.
- Through a point (x₁, y₁) with gradient m: y − y₁ = m(x − x₁).
- ax + by + c = 0 is the general form; rearrange to find the gradient.
- Parallel lines share m; perpendicular gradients multiply to −1.
- Intersections: solve simultaneous equations.
X: Find the equation of the perpendicular bisector of A(2, 5) and B(6, −3).
> Midpoint (4, 1); gradient of AB = −8/4 = −2
> Perpendicular gradient = 1/2
> y − 1 = ½(x − 4), so y = ½x − 1 (or x − 2y − 2 = 0)
- Area of a triangle from coordinates: ½|x₁(y₂ − y₃) + x₂(y₃ − y₁) + x₃(y₁ − y₂)|.
- Collinear points have equal gradients between them.
K: Gradient, midpoint and distance formulas; y − y₁ = m(x − x₁) for lines; parallel and perpendicular through gradients.
!: Subtracting coordinates in inconsistent orders when finding a gradient.
Q: What is the midpoint of (−2, 4) and (6, 0)? | (2, 2).
Q: What is the gradient of 3x + 2y = 6? | −3/2.
SUM: Coordinates turn geometry into algebra.
SUM: Lines are described by gradient and a point.
SRC: Department for Education, Mathematics AS and A level subject content: coordinate geometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
NUM1#maths-u05-27-q1@1: Find the gradient of the line through (−1, 4) and (3, −8). | -3 | 0 |  | (−8 − 4)/(3 − (−1)) = −12/4 = −3.
M1#maths-u05-27-q2@1: Which line passes through (2, 7) with gradient 3? | y = 3x + 1 | y = 3x + 7 | y = 2x + 3 | y = 3x − 1 | y = 7x + 2 | Use y − y₁ = m(x − x₁): y − 7 = 3(x − 2), which gives y = 3x + 1.
M2#maths-u05-27-q3@2: Where do y = 2x + 1 and y = −x + 7 meet? | (2, 5) | (1, 3) | (3, 4) | (2, 3) | (6, 13) | Set the expressions equal: 2x + 1 = −x + 7 gives x = 2, so y = 5.

## Analytic Geometry
S: Analytic geometry studies curves through their equations: lines, circles and the conics, in two and three dimensions. It answers geometric questions (tangents, intersections, distances) with algebra.
O: Use the equation of a circle and find tangents and intersections
O: Find the distance from a point to a line
T: Analytic geometry | Geometry using coordinates and equations, also called Cartesian geometry
T: Locus equation | The equation satisfied by all points of a locus
H: Circles
E: (x − a)^{2} + (y − b)^{2} = r^{2}: centre (a, b), radius r
- Complete the square: x^{2} + y^{2} − 6x + 4y − 12 = 0 gives (x − 3)^{2} + (y + 2)^{2} = 25: centre (3, −2), radius 5.
- A line meets a circle where substituting gives a quadratic: two, one (tangent) or no solutions, decided by the discriminant.
H: Distances and loci
- Distance from (x₀, y₀) to ax + by + c = 0: |ax₀ + by₀ + c|/√(a^{2} + b^{2}).
- Loci as equations: points twice as far from A as from B form a circle (a circle of Apollonius).
- Descartes and Fermat founded the subject in the 1630s, joining algebra and geometry.
X: Find the distance from (2, 3) to the line 3x + 4y − 8 = 0.
> Substitute: |3(2) + 4(3) − 8| = |6 + 12 − 8| = 10
> Divide by √(9 + 16) = 5
> Distance = 2
- Tangent to a circle at P: perpendicular to the radius CP.
K: Complete the square to read off circles; use the discriminant for line–circle intersections; use the point–line distance formula.
!: Forgetting the absolute value (or the square root) in the distance formula.
Q: What are the centre and radius of x^{2} + y^{2} = 49? | Centre (0, 0), radius 7.
Q: How do you test whether a line is tangent to a circle? | Substitute and check the quadratic has a repeated root.
SUM: Equations describe curves.
SUM: Algebra answers geometric questions.
SRC: Department for Education, Mathematics AS and A level subject content: coordinate geometry | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Coxeter HSM, Introduction to Geometry (2nd edn, Wiley 1989) | textbook | 1989 | https://www.wiley.com/
NUM1#maths-u05-28-q1@1: What is the radius of x^{2} + y^{2} + 8x − 2y − 8 = 0? | 5 | 0 |  | (x + 4)^{2} + (y − 1)^{2} = 8 + 16 + 1 = 25, so r = 5.
M1#maths-u05-28-q2@1: What is the centre of (x + 2)^{2} + (y − 5)^{2} = 9? | (−2, 5) | (2, −5) | (2, 5) | (−2, −5) | (5, −2) | (x − a)^{2} + (y − b)^{2}: here a = −2 and b = 5.
M3#maths-u05-28-q3@2: Does the line y = x + 5 meet the circle x^{2} + y^{2} = 4? | No | Yes, twice | Yes, once (tangent) | Only at the origin | It lies inside | Substituting gives 2x^{2} + 10x + 21 = 0, with discriminant 100 − 168 < 0.

## Vectors in Geometry
S: Vectors have size and direction, and they make geometric proofs remarkably clean. Representing points and directions as vectors turns geometry into algebra with arrows.
O: Add, subtract and scale vectors, and find magnitudes
O: Use vectors to prove geometric results such as parallel lines and ratios
T: Vector | A quantity with magnitude and direction, written a, AB or as a column (x, y)
T: Position vector | The vector from the origin to a point
H: Vector arithmetic
- AB = b − a (position vector of B minus that of A).
- Adding vectors follows paths: AC = AB + BC. Scaling changes length: 2a is twice as long.
- Magnitude of (x, y): √(x^{2} + y^{2}).
- Parallel vectors are scalar multiples: (2, 6) and (1, 3).
H: Geometric proofs
- To show points are collinear: show AB = kBC.
- To find a point dividing a segment in a ratio: the point P with AP : PB = 1 : 2 has p = a + ⅓(b − a).
- Midpoint theorem: the segment joining the midpoints of two sides of a triangle is parallel to the third side and half its length.
X: In triangle OAB, OA = a and OB = b. M is the midpoint of OA and N the midpoint of OB. Show that MN is parallel to AB.
> MN = ON − OM = ½b − ½a = ½(b − a)
> AB = b − a
> MN = ½AB, so MN is parallel to AB and half its length
- Unit vectors i and j: (3, 4) = 3i + 4j.
- The zero vector has magnitude 0 and no direction.
- Vectors are equal if they have the same magnitude and direction, wherever they start.
K: AB = b − a; parallel means a scalar multiple; collinear means parallel with a shared point.
!: Writing AB = a − b (the wrong order).
Q: What is the magnitude of (5, −12)? | 13.
Q: How do you show two vectors are parallel? | Show one is a scalar multiple of the other.
SUM: Vectors combine geometry and algebra.
SUM: Scalar multiples show parallel lines.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Department for Education, Mathematics AS and A level subject content: vectors | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
NUM1#maths-u05-29-q1@1: Find the magnitude of the vector (6, 8). | 10 | 0 |  | √(36 + 64) = √100 = 10.
M1#maths-u05-29-q2@1: A = (2, 1) and B = (5, 5). What is the vector AB? | (3, 4) | (−3, −4) | (7, 6) | (5, 5) | (2.5, 3) | AB = b − a: subtract A's coordinates from B's to get (5 − 2, 5 − 1) = (3, 4).
M2#maths-u05-29-q3@2: Which vector is parallel to (2, −3)? | (−4, 6) | (3, −2) | (2, 3) | (−2, −2) | (6, 4) | Parallel vectors are scalar multiples, and (−4, 6) = −2 × (2, −3).

## 3D Coordinate Geometry
S: 3D coordinate geometry extends coordinates to (x, y, z). Distances, midpoints, lines and planes in space describe everything from molecular structures to flight paths and video game worlds.
O: Find distances and midpoints in three dimensions
O: Write vector equations of lines and planes in 3D
T: Vector equation of a line | r = a + λd: a point a plus multiples of a direction d
T: Normal vector | A vector perpendicular to a plane
H: Points in 3D
- Distance between (x₁, y₁, z₁) and (x₂, y₂, z₂): √((Δx)^{2} + (Δy)^{2} + (Δz)^{2}).
- Midpoint: average each coordinate.
- The axes are perpendicular and follow the right-hand rule.
H: Lines and planes
- A line through (1, 2, 3) in direction (2, −1, 4): r = (1, 2, 3) + λ(2, −1, 4).
- A plane with normal n through point a: r · n = a · n, or ax + by + cz = d with n = (a, b, c).
- The angle between lines uses the scalar product of their directions: cos θ = (d₁ · d₂)/(|d₁||d₂|).
- Lines in 3D may intersect, be parallel, or be skew.
X: Find the distance between A(1, −2, 3) and B(4, 2, 15).
> Differences: 3, 4, 12
> Distance = √(9 + 16 + 144)
> = √169 = 13
- The scalar product a · b = a₁b₁ + a₂b₂ + a₃b₃ is zero exactly when the vectors are perpendicular.
- A plane ax + by + cz = d is perpendicular to its normal (a, b, c).
- Coordinates in 3D are written (x, y, z).
K: Extend distance and midpoint formulas with z; lines are r = a + λd; planes use a normal vector.
!: Treating two non-parallel lines in 3D as necessarily intersecting.
Q: What is the midpoint of (0, 2, 4) and (6, 4, −2)? | (3, 3, 1).
Q: What is the normal vector to the plane 2x − y + 3z = 7? | (2, −1, 3).
SUM: Coordinates extend naturally to 3D.
SUM: Vectors describe lines and planes.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Anton H, Rorres C, Elementary Linear Algebra (12th edn, Wiley 2019) | textbook | 2019 | https://www.wiley.com/
M1#maths-u05-30-q1@1: What is the distance from the origin to (2, 3, 6)? | 7 | 11 | 5 | √11 | 49 | The 3D distance formula gives √(2^{2} + 3^{2} + 6^{2}) = √49 = 7.
M2#maths-u05-30-q2@2: Which point lies on the line r = (1, 0, 2) + λ(1, 2, −1)? | (3, 4, 0) | (2, 2, 3) | (1, 2, 1) | (0, 0, 0) | (3, 4, 4) | λ = 2 gives (1 + 2, 0 + 4, 2 − 2) = (3, 4, 0).

## Conic Sections
S: Conic sections are the curves formed by slicing a double cone with a plane: circles, ellipses, parabolas and hyperbolas. Studied since ancient Greece, they describe planetary orbits, satellite dishes and the paths of comets.
O: Identify the conic sections and how they arise
O: Classify conics from their equations
T: Conic section | A curve formed by the intersection of a plane with a double cone
T: Eccentricity | A number e describing a conic's shape: circle e = 0, ellipse 0 < e < 1, parabola e = 1, hyperbola e > 1
H: The family
- **Circle**: plane perpendicular to the cone's axis.
- **Ellipse**: plane tilted, cutting all the way across one cone.
- **Parabola**: plane parallel to a slanted side of the cone.
- **Hyperbola**: plane steep enough to cut both halves of the double cone.
- Degenerate cases: a point, a line or two crossing lines.
H: Equations and focus–directrix
- General second-degree equation Ax^{2} + Bxy + Cy^{2} + Dx + Ey + F = 0; with B = 0, the signs of A and C classify it: same sign (ellipse), one zero (parabola), opposite signs (hyperbola).
- Each conic (except the circle) is the locus of points whose distance from a focus is e times the distance from a directrix line.
- Apollonius of Perga named them (about 200 BCE); Kepler showed planets move in ellipses (1609).
X: Classify the conic 4x^{2} − 9y^{2} = 36.
> Divide by 36: x^{2}/9 − y^{2}/4 = 1
> The x^{2} and y^{2} terms have opposite signs
> It's a hyperbola, with vertices at (±3, 0)
K: Slicing a cone gives circles, ellipses, parabolas and hyperbolas; eccentricity and the signs of the squared terms classify them.
!: Confusing a parabola (one squared term) with a hyperbola (two squared terms of opposite sign).
Q: What is the eccentricity of a circle? | 0.
Q: Which conic do planets follow? | Ellipses.
SUM: Conics come from slicing a cone.
SUM: Their equations and eccentricity classify them.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Coxeter HSM, Introduction to Geometry (2nd edn, Wiley 1989) | textbook | 1989 | https://www.wiley.com/
M1#maths-u05-31-q1@1: Which conic is x^{2}/25 + y^{2}/9 = 1? | An ellipse | A hyperbola | A parabola | A circle | Two lines | Both squared terms are positive with different denominators: an ellipse.
M2#maths-u05-31-q2@2: What eccentricity does a parabola have? | 1 | 0 | Between 0 and 1 | Greater than 1 | Infinite | A parabola is the boundary case between ellipses (e < 1) and hyperbolas (e > 1).

## Parabolas
S: A parabola is the set of points equidistant from a point (the focus) and a line (the directrix). Every quadratic graph is a parabola, and its reflective property is why satellite dishes and car headlights are parabolic.
O: Use the focus–directrix definition of a parabola
O: Find the focus and directrix of y^{2} = 4ax
T: Focus | The fixed point in the focus–directrix definition
T: Directrix | The fixed line in the focus–directrix definition
H: Equations
- Standard form: y^{2} = 4ax has focus (a, 0) and directrix x = −a.
- x^{2} = 4ay (equivalently y = x^{2}/(4a)) has focus (0, a): y = x^{2} has a = ¼, so focus (0, ¼).
- Parametric form: x = at^{2}, y = 2at.
- Quadratic graphs y = ax^{2} + bx + c are parabolas with vertical axes.
H: The reflective property
- Rays parallel to the axis reflect off the parabola through the focus, and vice versa.
- Satellite dishes and radio telescopes collect signals at the focus; headlights put the bulb at the focus to send out a parallel beam.
- Projectiles (ignoring air resistance) follow parabolic paths (School 20).
X: Find the focus and directrix of y^{2} = 12x, and check that (3, 6) is equidistant from them.
> 4a = 12, so a = 3: focus (3, 0), directrix x = −3
> Distance from (3, 6) to the focus is √(0 + 36) = 6
> Distance to the directrix is 3 − (−3) = 6 ✓
K: y^{2} = 4ax has focus (a, 0) and directrix x = −a; parabolas reflect parallel rays to the focus.
!: Mixing up a and 4a when reading the focus from y^{2} = 4ax.
Q: What is the focus of y^{2} = 8x? | (2, 0).
Q: Why are satellite dishes parabolic? | Signals parallel to the axis reflect to the focus.
SUM: Parabolas balance focus and directrix distances.
SUM: Their reflective property has many uses.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Coxeter HSM, Introduction to Geometry (2nd edn, Wiley 1989) | textbook | 1989 | https://www.wiley.com/
NUM1#maths-u05-32-q1@1: The parabola y^{2} = 4ax has focus (5, 0). What is a? | 5 | 0 |  | The focus of y^{2} = 4ax is (a, 0), so a = 5 (the equation is y^{2} = 20x).
M1#maths-u05-32-q2@1: What is the directrix of y^{2} = 16x? | x = −4 | x = 4 | y = −4 | x = −16 | y = 4 | 4a = 16 gives a = 4, and the directrix is x = −a.
M2#maths-u05-32-q3@2: Where should a bulb be placed in a parabolic headlight to make a parallel beam? | At the focus | At the vertex | On the directrix | At the rim | Anywhere on the axis | Rays from the focus reflect off the parabola parallel to its axis.

## Ellipses
S: An ellipse is a stretched circle: the set of points whose distances to two foci add to a constant. Planets, comets and satellites travel in ellipses, as Kepler discovered.
O: Use the standard equation of an ellipse
O: Find the foci and eccentricity of an ellipse
T: Foci | The two fixed points of an ellipse; the sum of distances to them is constant (2a)
T: Semi-major axis | Half the longest diameter, a
H: The standard ellipse
E: x^{2}/a^{2} + y^{2}/b^{2} = 1 (a > b): foci (±c, 0) with c^{2} = a^{2} − b^{2}; eccentricity e = c/a
- x^{2}/25 + y^{2}/9 = 1: a = 5, b = 3, c = 4, foci (±4, 0), e = 0.8.
- Parametric form: x = a cos t, y = b sin t.
- Area = πab (a circle is the case a = b).
H: Drawing and applications
- The "gardener's method": pin a loop of string at the two foci and trace with a pencil, keeping the string taut.
- Kepler's first law: planets orbit the Sun in ellipses with the Sun at one focus. Earth's orbit has e ≈ 0.017 (nearly circular); Halley's comet e ≈ 0.97.
- Whispering galleries: sound from one focus reflects to the other.
X: Find the area and eccentricity of the ellipse 4x^{2} + 9y^{2} = 36.
> Divide by 36: x^{2}/9 + y^{2}/4 = 1, so a = 3 and b = 2
> Area = π × 3 × 2 = 6π
> c = √(9 − 4) = √5, so e = √5/3 ≈ 0.745
- An ellipse's eccentricity lies strictly between 0 and 1.
K: x^{2}/a^{2} + y^{2}/b^{2} = 1; c^{2} = a^{2} − b^{2}; e = c/a; area πab; distances to the foci add to 2a.
!: Using c^{2} = a^{2} + b^{2} (that's for hyperbolas).
Q: What is the area of x^{2}/16 + y^{2}/4 = 1? | 8π.
Q: Where is the Sun in a planet's elliptical orbit? | At one focus.
SUM: Ellipses have constant total distance to two foci.
SUM: Orbits are ellipses.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: NASA, Planetary fact sheet | data | 2024 | https://nssdc.gsfc.nasa.gov/planetary/factsheet/
NUM1#maths-u05-33-q1@1: For x^{2}/100 + y^{2}/36 = 1, find the distance from the centre to each focus. | 8 | 0 |  | c^{2} = 100 − 36 = 64, so c = 8.
M1#maths-u05-33-q2@1: What is the sum of the distances from any point on x^{2}/49 + y^{2}/24 = 1 to its foci? | 14 | 7 | 10 | 49 | 2√24 | The sum of the distances to the foci is 2a, and a = √49 = 7, so 14.
M2#maths-u05-33-q3@2: Which orbit is most nearly circular? | Eccentricity 0.02 | Eccentricity 0.5 | Eccentricity 0.9 | Eccentricity 0.97 | Eccentricity 1 | Eccentricity close to 0 means close to a circle.

## Hyperbolas
S: A hyperbola is the set of points whose distances to two foci differ by a constant. It has two branches and two asymptotes, and appears in navigation systems, the paths of fast-moving comets and the graph of y = 1/x.
O: Use the standard equation of a hyperbola
O: Find foci, asymptotes and eccentricity
T: Asymptote of a hyperbola | A line the branches approach: y = ±(b/a)x for x^{2}/a^{2} − y^{2}/b^{2} = 1
T: Rectangular hyperbola | A hyperbola with perpendicular asymptotes, such as xy = c^{2}
H: The standard hyperbola
E: x^{2}/a^{2} − y^{2}/b^{2} = 1: vertices (±a, 0), foci (±c, 0) with c^{2} = a^{2} + b^{2}; e = c/a > 1
- x^{2}/16 − y^{2}/9 = 1: a = 4, b = 3, c = 5, asymptotes y = ±¾x, e = 1.25.
- Parametric form: x = a cosh t, y = b sinh t (or a sec θ, b tan θ).
- xy = 4 is a rectangular hyperbola with the axes as asymptotes: y = 4/x.
H: Applications
- Difference in arrival times of signals from two stations places a receiver on a hyperbola: the basis of LORAN navigation.
- Objects passing the Sun too fast to be captured follow hyperbolic paths.
- Boyle's law pV = constant gives a rectangular hyperbola.
X: Find the foci and asymptotes of 9x^{2} − 16y^{2} = 144.
> Divide by 144: x^{2}/16 − y^{2}/9 = 1, so a = 4, b = 3
> c^{2} = 16 + 9 = 25, so the foci are (±5, 0)
> Asymptotes y = ±(3/4)x
- The closer e is to 1, the narrower the hyperbola's branches.
K: x^{2}/a^{2} − y^{2}/b^{2} = 1; c^{2} = a^{2} + b^{2}; asymptotes y = ±(b/a)x; e > 1.
!: Using c^{2} = a^{2} − b^{2} as for ellipses.
Q: What are the asymptotes of x^{2}/4 − y^{2}/25 = 1? | y = ±(5/2)x.
Q: Is y = 1/x a hyperbola? | Yes: a rectangular hyperbola, xy = 1.
SUM: Hyperbolas have constant difference of distances to two foci.
SUM: They have two branches and two asymptotes.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Coxeter HSM, Introduction to Geometry (2nd edn, Wiley 1989) | textbook | 1989 | https://www.wiley.com/
NUM1#maths-u05-34-q1@1: For x^{2}/9 − y^{2}/16 = 1, find c, the distance from the centre to each focus. | 5 | 0 |  | c^{2} = a^{2} + b^{2} = 9 + 16 = 25, so c = 5.
M1#maths-u05-34-q2@1: Which equation is a hyperbola? | x^{2}/4 − y^{2}/9 = 1 | x^{2}/4 + y^{2}/9 = 1 | y = x^{2} | x^{2} + y^{2} = 9 | y = 2x + 1 | A hyperbola has x^{2} and y^{2} terms with opposite signs, as in the first option.
M2#maths-u05-34-q3@2: What is the eccentricity of x^{2}/16 − y^{2}/9 = 1? | 5/4 | 4/5 | 3/4 | 5/3 | 1 | c^{2} = 16 + 9 = 25, so c = 5 and a = 4, giving e = c/a = 5/4.

## Non-Euclidean Geometry
S: Non-Euclidean geometries keep Euclid's first four postulates but replace the parallel postulate. Discovered in the 1800s, they showed that more than one consistent geometry exists, and one of them describes the curved space-time of general relativity.
O: Explain how non-Euclidean geometries differ from Euclidean geometry
O: Compare the three classical geometries by curvature and angle sum
T: Curvature | A measure of how a space bends: zero (flat), positive (sphere-like) or negative (saddle-like)
T: Model | A concrete space in which a geometry's axioms hold, such as the sphere or the Poincaré disc
H: Three geometries
- **Euclidean** (zero curvature): exactly one parallel through a point; triangle angles sum to 180°.
- **Spherical/elliptic** (positive curvature): no parallels (all "lines" meet); angle sum more than 180°.
- **Hyperbolic** (negative curvature): infinitely many parallels through a point; angle sum less than 180°.
H: History and significance
- Gauss, Bolyai (1832) and Lobachevsky (1829) independently developed hyperbolic geometry after centuries of failed attempts to prove the parallel postulate.
- Beltrami (1868) gave models showing hyperbolic geometry is as consistent as Euclidean geometry.
- Riemann (1854) generalised geometry to curved spaces of any dimension, which Einstein used in general relativity (1915).
- On small scales, all three look nearly Euclidean, which is why flat geometry works for everyday measurement.
X: A triangle drawn on a sphere has angles 90°, 90° and 50°. Which geometry is it in, and what is its angle excess?
> The angle sum is 230°, more than 180°
> So the geometry is spherical (positive curvature)
> The excess is 230 − 180 = 50° (proportional to the triangle's area)
K: Changing the parallel postulate gives spherical (angle sum > 180°) and hyperbolic (< 180°) geometries, distinguished by curvature.
!: Thinking non-Euclidean geometry is "wrong" geometry: it's equally consistent, and describes curved spaces.
Q: How many parallels through a point does hyperbolic geometry allow? | Infinitely many.
Q: Which physical theory uses non-Euclidean geometry? | Einstein's general relativity.
SUM: Non-Euclidean geometries replace the parallel postulate.
SUM: Curvature distinguishes them.
SRC: Greenberg MJ, Euclidean and Non-Euclidean Geometries (4th edn, WH Freeman 2008) | textbook | 2008 | https://www.macmillanlearning.com/
SRC: Hartshorne R, Geometry: Euclid and Beyond (Springer 2000) | textbook | 2000 | https://link.springer.com/
M1#maths-u05-35-q1@1: In which geometry do triangles have angle sums less than 180°? | Hyperbolic | Spherical | Euclidean | Projective | Affine | Negative curvature makes triangles "thin", with angle sums below 180°.
M2#maths-u05-35-q2@2: Who independently developed hyperbolic geometry in the 1820s and 1830s? | Bolyai and Lobachevsky (and Gauss, unpublished) | Euclid and Archimedes | Newton and Leibniz | Descartes and Fermat | Einstein and Minkowski | Bolyai and Lobachevsky published; Gauss had the ideas but didn't publish them.

## Spherical Geometry
S: Spherical geometry is geometry on the surface of a sphere, where the "straight lines" are great circles. It's the geometry of navigation, flight paths and astronomy, and its triangles have angle sums greater than 180°.
O: Identify great circles as the geodesics of a sphere
O: Use the angle excess to find areas of spherical triangles
T: Great circle | The intersection of a sphere with a plane through its centre; the shortest path between two points lies along one
T: Angle excess | The amount by which a spherical triangle's angles exceed 180° (π radians)
H: Lines, distances and triangles
- Great circles (the equator, lines of longitude) are the spherical "lines". Lines of latitude other than the equator aren't.
- Any two great circles meet in two antipodal points: there are no parallels.
- Distance along a great circle = R × central angle (in radians).
- Flights from London to Los Angeles curve north over Greenland because that's the great circle route.
H: Girard's theorem
E: Area of a spherical triangle = R^{2} × (A + B + C − π)
- A triangle with three right angles (one eighth of the sphere) has excess π/2, so area πR^{2}/2 = 4πR^{2}/8 ✓.
- The larger the triangle, the bigger the excess; tiny triangles are almost flat.
X: On the Earth (R ≈ 6,371 km), two places on the equator differ in longitude by 30°. How far apart are they along the equator?
> The central angle is 30° = π/6 radians
> Distance = Rθ = 6,371 × π/6
> ≈ 3,336 km
K: Great circles are the straight lines of the sphere; distances are Rθ; triangle area is R^{2} × angle excess.
!: Treating lines of latitude as great circles (only the equator is).
Q: Are lines of longitude great circles? | Yes.
Q: What is the area of a spherical triangle with angle excess E (radians) on a sphere of radius R? | R^{2}E.
SUM: Great circles are spherical lines.
SUM: Angle excess measures area.
SRC: Greenberg MJ, Euclidean and Non-Euclidean Geometries (4th edn, WH Freeman 2008) | textbook | 2008 | https://www.macmillanlearning.com/
SRC: Todhunter I, Spherical Trigonometry (Macmillan 1886) | textbook | 1886 | https://archive.org/
NUM1#maths-u05-36-q1@1: A spherical triangle on a unit sphere has angles 100°, 80° and 90°. What is its area, as a multiple of π? | 0.5 | 0.001 | π | The excess is 270 − 180 = 90° = π/2, so the area is π/2 = 0.5π.
M1#maths-u05-36-q2@1: Which of these is a great circle on the Earth? | The equator | The Arctic Circle | The Tropic of Cancer | Latitude 51.5°N | The Tropic of Capricorn | Only the equator, among lines of latitude, has its centre at the Earth's centre.
M2#maths-u05-36-q3@2: How many points do two distinct great circles share? | Two (antipodal points) | None | One | Infinitely many | Four | Two planes through the centre meet in a line through the centre, which hits the sphere twice.

## Hyperbolic Geometry
S: Hyperbolic geometry has constant negative curvature: through a point not on a line there are infinitely many parallels, and triangles are "thin", with angle sums less than 180°. It's visualised with models such as the Poincaré disc.
O: Describe the main features of hyperbolic geometry
O: Use the angle defect to find areas of hyperbolic triangles
T: Poincaré disc | A model of the hyperbolic plane inside a disc, where lines are arcs meeting the boundary at right angles
T: Angle defect | π minus the angle sum of a triangle; in curvature −1 it equals the area
H: Features
- Infinitely many parallels through a point, and lines that diverge from each other.
- Triangle area = defect (for curvature −1): area = π − (A + B + C). So no triangle has area greater than π.
- An "ideal" triangle with vertices on the boundary has all angles 0 and area π.
- Circles have circumference greater than 2πr, growing exponentially with r.
H: Models and uses
- Poincaré disc and half-plane models; Escher's Circle Limit prints show hyperbolic tilings.
- Saddle shapes, coral and crocheted surfaces show negative curvature physically.
- Hyperbolic geometry appears in complex analysis, the geometry of 3-manifolds (Thurston, Perelman), and data embeddings for hierarchies in machine learning.
X: A hyperbolic triangle (curvature −1) has angles π/4, π/6 and π/12. Find its area.
> Angle sum = π/4 + π/6 + π/12 = 3π/12 + 2π/12 + π/12 = π/2
> Defect = π − π/2 = π/2
> Area = π/2 ≈ 1.57
K: Hyperbolic geometry has many parallels and angle sums below 180°; area equals the angle defect (curvature −1).
!: Picturing hyperbolic lines in the Poincaré disc as straight chords: they're arcs at right angles to the boundary (except diameters).
Q: What is the largest possible area of a hyperbolic triangle (curvature −1)? | π (an ideal triangle).
Q: How do hyperbolic triangles' angle sums compare with 180°? | They're less than 180°.
SUM: Hyperbolic geometry is negatively curved.
SUM: Area equals the angle defect.
SRC: Greenberg MJ, Euclidean and Non-Euclidean Geometries (4th edn, WH Freeman 2008) | textbook | 2008 | https://www.macmillanlearning.com/
SRC: Anderson JW, Hyperbolic Geometry (2nd edn, Springer 2005) | textbook | 2005 | https://link.springer.com/
NUM1#maths-u05-37-q1@1: A hyperbolic triangle (curvature −1) has angles π/3, π/4 and π/6. Find its area as a multiple of π. | 0.25 | 0.001 | π | The angles sum to 3π/4, so the defect and area are π/4 = 0.25π.
M1#maths-u05-37-q2@1: What do lines look like in the Poincaré disc model? | Arcs meeting the boundary at right angles, or diameters | Straight chords only | Concentric circles | Spirals | Points | Hyperbolic lines are represented by circular arcs orthogonal to the boundary circle.
M2#maths-u05-37-q3@2: How does a circle's circumference grow in the hyperbolic plane compared with 2πr? | Faster (exponentially) | Slower | The same | It shrinks | It's constant | Negative curvature makes space "spread out", so circumference grows exponentially with radius.

## Affine Geometry
S: Affine geometry studies the properties preserved by affine transformations: those that keep straight lines straight and parallel lines parallel, though not lengths or angles. It's the geometry of shears, stretches and perspective-free drawing.
O: Identify properties preserved by affine transformations
O: Apply affine maps in coordinates
T: Affine transformation | A map x ↦ Ax + b, with A an invertible matrix and b a vector
T: Affine invariant | A property unchanged by affine maps, such as parallelism or ratios of lengths along a line
H: What's preserved
- Straight lines, parallelism, ratios of lengths along a line (so midpoints), and ratios of areas.
- Not preserved: lengths, angles, circles (they become ellipses).
- Any triangle can be mapped to any other by an affine map, so a theorem about ratios proved for an equilateral triangle holds for all triangles.
H: Uses
- The medians of any triangle meet at the centroid, dividing each in the ratio 2 : 1: easy for an equilateral triangle, so true for all by affine invariance.
- Computer graphics uses affine maps (scale, rotate, shear, translate) with 3 × 3 matrices in homogeneous coordinates.
- Area scale factor = |det A|.
X: An affine map sends (x, y) to (2x + y, y + 3). Find the image of the midpoint of A(0, 0) and B(4, 2), and check it's the midpoint of the images.
> Midpoint of AB is (2, 1), which maps to (5, 4)
> A maps to (0, 3) and B maps to (10, 5); their midpoint is (5, 4)
> They agree: affine maps preserve midpoints
K: Affine maps preserve lines, parallelism and ratios along lines, but not lengths or angles; area scales by |det A|.
!: Assuming affine maps preserve angles or circles.
Q: Do affine maps preserve parallel lines? | Yes.
Q: What does an affine map do to a circle? | It maps it to an ellipse (or a circle).
SUM: Affine geometry keeps lines and parallelism.
SUM: Ratios along lines are invariant.
SRC: Coxeter HSM, Introduction to Geometry (2nd edn, Wiley 1989) | textbook | 1989 | https://www.wiley.com/
SRC: Brannan DA, Esplen MF, Gray JJ, Geometry (2nd edn, Cambridge University Press 2011) | textbook | 2011 | https://www.cambridge.org/
NUM1#maths-u05-38-q1@1: An affine map has matrix A = [[3, 1], [0, 2]]. By what factor does it scale areas? | 6 | 0 |  | The area scale factor is |det A| = 3 × 2 − 1 × 0 = 6.
M1#maths-u05-38-q2@1: Which property is preserved by every affine transformation? | Parallelism | Lengths | Angles | Circles | Perpendicularity | Affine maps keep parallel lines parallel but can change lengths and angles.
M3#maths-u05-38-q3@2: Why can a ratio theorem proved for an equilateral triangle be applied to every triangle? | Any triangle is the affine image of an equilateral triangle, and ratios along lines are preserved | All triangles are similar | All triangles are congruent | Angles are preserved | It can't | Affine maps carry any triangle to any other while keeping ratios along lines.

## Projective Geometry
S: Projective geometry is the geometry of perspective: what stays the same when a scene is projected onto a canvas or a camera. Parallel lines meet "at infinity", and every two lines meet in exactly one point.
O: Describe points at infinity and homogeneous coordinates
O: Identify projective invariants such as incidence and the cross-ratio
T: Point at infinity | An ideal point where parallel lines meet, added to the plane to form the projective plane
T: Cross-ratio | (A, B; C, D) = (AC × BD)/(BC × AD), a ratio preserved by projections
H: The projective plane
- Add one point at infinity for each direction: parallel lines meet there. Together they form the line at infinity.
- Now any two distinct lines meet in exactly one point, and any two points lie on exactly one line: a beautiful duality between points and lines.
- Homogeneous coordinates: (x, y) becomes [x : y : 1]; [x : y : 0] are the points at infinity.
H: Invariants and theorems
- Projections preserve incidence (which points lie on which lines) and the cross-ratio, but not lengths, angles or ratios.
- Desargues' theorem and Pascal's theorem are projective results.
- All non-degenerate conics are equivalent projectively: a circle viewed in perspective can look like an ellipse, parabola or hyperbola.
- Applications: perspective drawing (developed in the Renaissance), computer vision and camera calibration.
X: Points A, B, C, D on a line have coordinates 0, 1, 3 and 4. Find the cross-ratio (A, B; C, D).
> AC = 3, BD = 3, BC = 2, AD = 4
> (A, B; C, D) = (3 × 3)/(2 × 4)
> = 9/8 (and any projection of the line keeps this value)
K: The projective plane adds points at infinity so any two lines meet; projections preserve incidence and the cross-ratio.
!: Expecting projections to preserve ratios of lengths: only the cross-ratio survives.
Q: Where do parallel lines meet in the projective plane? | At a point at infinity.
Q: Which quantity is preserved by projection? | The cross-ratio.
SUM: Projective geometry is the geometry of perspective.
SUM: Points at infinity make every pair of lines meet.
SRC: Coxeter HSM, Projective Geometry (2nd edn, Springer 1987) | textbook | 1987 | https://link.springer.com/
SRC: Brannan DA, Esplen MF, Gray JJ, Geometry (2nd edn, Cambridge University Press 2011) | textbook | 2011 | https://www.cambridge.org/
M1#maths-u05-39-q1@1: In the projective plane, how many points do two distinct lines share? | Exactly one | None or one | Two | Infinitely many | It depends | Parallel lines meet at a point at infinity, so every pair of distinct lines meets exactly once.
M2#maths-u05-39-q2@2: What are the homogeneous coordinates of the Euclidean point (3, 5)? | [3 : 5 : 1] (or any multiple) | [3 : 5 : 0] | [1 : 3 : 5] | [5 : 3 : 1] | [0 : 3 : 5] | Append 1; any non-zero multiple, such as [6 : 10 : 2], is the same point.

## Fractal Geometry
S: Fractals are shapes with detail at every scale, often self-similar: zoom in and you see copies of the whole. Coastlines, ferns, clouds and blood vessels are fractal-like, and fractals have dimensions that aren't whole numbers.
O: Describe self-similarity and construct simple fractals
O: Calculate similarity dimensions
T: Self-similar | Made of smaller copies of itself
T: Similarity dimension | D = log N / log(1/r), for a shape made of N copies scaled by r
H: Classic fractals
- **Koch curve**: replace each segment's middle third with two sides of an equilateral triangle; repeat forever. Each step multiplies the length by 4/3, so the length is infinite.
- **Sierpiński triangle**: remove the middle triangle repeatedly; its area tends to zero.
- **Cantor set**: remove middle thirds of a segment repeatedly.
- **Mandelbrot set**: points c for which z ↦ z^{2} + c stays bounded from z = 0.
H: Dimension
- A line made of N = 2 halves (r = ½) has D = 1; a square made of 4 quarters has D = 2.
- Koch curve: N = 4, r = 1/3, so D = log 4/log 3 ≈ 1.26: more than a line, less than an area.
- Sierpiński triangle: N = 3, r = ½, so D = log 3/log 2 ≈ 1.58.
- Mandelbrot coined "fractal" (1975); fractals model natural shapes and are used in graphics and antenna design.
X: Find the similarity dimension of the Cantor set.
> Each step keeps N = 2 pieces, each scaled by r = 1/3
> D = log 2 / log 3
> ≈ 0.631: less than a line, more than a point
K: Fractals repeat their structure at every scale; similarity dimension D = log N / log(1/r) is often not a whole number.
!: Assuming every irregular shape is a fractal: fractals have structure repeating across scales.
Q: What is the dimension of the Koch curve? | log 4/log 3 ≈ 1.26.
Q: What happens to the Koch curve's length after infinitely many steps? | It becomes infinite.
SUM: Fractals have detail at all scales.
SUM: Their dimensions can be fractional.
SRC: Mandelbrot BB, The Fractal Geometry of Nature (WH Freeman 1982) | textbook | 1982 | https://www.macmillanlearning.com/
SRC: Falconer K, Fractal Geometry: Mathematical Foundations and Applications (3rd edn, Wiley 2014) | textbook | 2014 | https://www.wiley.com/
NUM1#maths-u05-40-q1@1: A fractal is made of 8 copies of itself, each scaled by 1/2. Find its similarity dimension. | 3 | 0 |  | D = log 8/log 2 = 3 (like a solid cube made of 8 half-size cubes).
M1#maths-u05-40-q2@1: What is the similarity dimension of the Sierpiński triangle? | log 3/log 2 ≈ 1.58 | 2 | 1 | log 2/log 3 ≈ 0.63 | 3/2 exactly | It's made of N = 3 copies scaled by r = 1/2.
M2#maths-u05-40-q3@2: After each step of the Koch construction, the curve's length is multiplied by: | 4/3 | 3/4 | 2 | 1/3 | 3 | Each segment is replaced by 4 segments each a third as long.

## Discrete Geometry
S: Discrete geometry studies finite or countable sets of geometric objects: points, lines, polygons and lattices, and how they're arranged. Packing, covering, counting lattice points and arranging points are its central problems.
O: Use Pick's theorem to find areas of lattice polygons
O: Describe classic problems of packing and arrangement
T: Lattice point | A point with integer coordinates
T: Pick's theorem | For a polygon with vertices on lattice points: area = I + B/2 − 1, where I is the number of interior and B the number of boundary lattice points
H: Pick's theorem
- A polygon with 7 interior lattice points and 8 boundary points has area 7 + 4 − 1 = 10.
- It only works for polygons whose vertices are lattice points (and without holes).
H: Packing and arrangements
- **Circle packing**: hexagonal packing covers π/(2√3) ≈ 90.7% of the plane, the best possible (Thue, Fejes Tóth).
- **Sphere packing**: the best density in 3D is π/(3√2) ≈ 74% (Kepler's conjecture, proved by Hales in 1998, formally verified in 2014); Viazovska solved dimensions 8 and 24 (2016).
- **Erdős problems**: how many distinct distances must n points determine? Arrangements of lines and points.
- Applications: crystallography, coding theory, wireless networks.
X: Find the area of the triangle with vertices (0, 0), (4, 0) and (0, 3) using Pick's theorem, and check it.
> Boundary points: 5 on the base, 4 on the vertical side, and the hypotenuse adds none besides its ends: B = 4 + 3 + 1 = 8
> Interior points: (1, 1), (2, 1), (1, 2): I = 3
> Area = 3 + 4 − 1 = 6, matching ½ × 4 × 3 = 6
K: Pick's theorem: area = I + B/2 − 1 for lattice polygons; packing problems ask for the densest arrangements.
!: Applying Pick's theorem to a polygon whose vertices aren't lattice points.
Q: What is the densest packing of equal circles in the plane? | The hexagonal packing (about 90.7%).
Q: Who proved the Kepler conjecture? | Thomas Hales (1998; formally verified 2014).
SUM: Discrete geometry studies arrangements of objects.
SUM: Pick's theorem counts lattice points to find area.
SRC: Matoušek J, Lectures on Discrete Geometry (Springer 2002) | textbook | 2002 | https://link.springer.com/
SRC: Hales TC et al, A formal proof of the Kepler conjecture, Forum of Mathematics, Pi 5 | journal | 2017 | https://doi.org/10.1017/fmp.2017.1
NUM1#maths-u05-41-q1@1: A lattice polygon has 10 interior points and 6 boundary points. Find its area. | 12 | 0 |  | Pick's theorem: 10 + 6/2 − 1 = 12.
M1#maths-u05-41-q2@1: What fraction of space do equal spheres fill in the densest packing? | About 74% | About 52% | About 90.7% | 100% | About 50% | Kepler's conjecture, proved by Hales: π/(3√2) ≈ 0.7405.
M2#maths-u05-41-q3@2: When does Pick's theorem apply? | To polygons whose vertices are all lattice points (no holes) | To any polygon | To circles | To 3D polyhedra | Only to triangles | It needs integer-coordinate vertices and a simple polygon.

## Convex Geometry
S: A convex set contains the whole segment between any two of its points: discs, triangles and filled polygons are convex; crescents aren't. Convexity makes problems tractable, which is why it's central to optimisation.
O: Decide whether a set is convex and find convex hulls
O: State key results such as Helly's theorem
T: Convex set | A set containing the line segment between any two of its points
T: Convex hull | The smallest convex set containing a given set, like a rubber band stretched around points
H: Convex sets
- Intersections of convex sets are convex: polygons defined by linear inequalities (feasible regions) are convex.
- Unions usually aren't.
- A function is convex if the region above its graph is convex (link to calculus).
- The convex hull of a finite point set is a convex polygon with some of the points as vertices.
H: Theorems
- **Helly's theorem** (plane): if every three of a finite family of convex sets intersect, they all have a common point.
- **Separating hyperplane theorem**: two disjoint convex sets can be separated by a line (or hyperplane): the basis of support vector machines (School 24).
- **Brunn–Minkowski** and isoperimetric inequalities: among shapes with given perimeter, the circle has the largest area.
X: Is the region {(x, y) : x^{2} + y^{2} ≤ 4 and y ≥ x} convex?
> x^{2} + y^{2} ≤ 4 is a disc, which is convex
> y ≥ x is a half-plane, which is convex
> Their intersection is convex
K: Convex means every segment between points stays inside; intersections of convex sets are convex; convex hulls wrap points tightly.
!: Assuming the union of two convex sets is convex.
Q: Is a star shape convex? | No: segments between some points leave the shape.
Q: What is the convex hull of a set of points? | The smallest convex set containing them.
SUM: Convex sets contain all their connecting segments.
SUM: Convexity underpins optimisation.
SRC: Boyd S, Vandenberghe L, Convex Optimization (Cambridge University Press 2004) | textbook | 2004 | https://web.stanford.edu/~boyd/cvxbook/
SRC: Matoušek J, Lectures on Discrete Geometry (Springer 2002) | textbook | 2002 | https://link.springer.com/
M1#maths-u05-42-q1@1: Which set is convex? | A filled triangle | A crescent moon shape | An annulus (ring) | Two separate discs | A star | Any segment between two points of a triangle stays inside it.
M2#maths-u05-42-q2@2: Which operation always preserves convexity? | Intersection | Union | Complement | Removing a point from the interior | Taking the boundary | The intersection of convex sets is convex, but unions and complements usually aren't.

## Computational Geometry
S: Computational geometry designs efficient algorithms for geometric problems: convex hulls, intersections, nearest neighbours, triangulations and Voronoi diagrams. It powers computer graphics, mapping, robotics and computer-aided design.
O: Use the orientation test to decide turn direction
O: Describe standard algorithms such as convex hulls and Voronoi diagrams
T: Orientation test | The sign of the cross product (b − a) × (c − a) decides whether a → b → c turns left, right or is straight
T: Voronoi diagram | The partition of the plane into regions closest to each of a set of sites
H: Basic tools
- Orientation: for points a, b, c, compute (b_{x} − a_{x})(c_{y} − a_{y}) − (b_{y} − a_{y})(c_{x} − a_{x}); positive means a left (anticlockwise) turn.
- Segment intersection, point-in-polygon tests (ray casting) and polygon area (the shoelace formula) all follow.
H: Algorithms
- **Convex hull**: Graham scan or Andrew's monotone chain in O(n log n) time.
- **Voronoi diagrams** (Fortune's algorithm, O(n log n)) and their dual, **Delaunay triangulations**, used in meshing and nearest-neighbour search.
- **Range searching** and **kd-trees** for spatial databases.
- Robust implementations must handle floating-point errors and degenerate cases (collinear points).
X: Do the points a(0, 0), b(4, 1), c(2, 3) make a left or right turn?
> (b_{x} − a_{x})(c_{y} − a_{y}) − (b_{y} − a_{y})(c_{x} − a_{x}) = 4 × 3 − 1 × 2
> = 12 − 2 = 10
> Positive, so a → b → c turns left (anticlockwise)
K: The orientation test is the basic primitive; convex hulls take O(n log n); Voronoi diagrams partition by nearest site.
!: Using exact equality tests with floating-point coordinates.
Q: What does a zero orientation value mean? | The three points are collinear.
Q: What is a Voronoi region? | The set of points closer to one site than to any other.
SUM: Computational geometry makes geometry algorithmic.
SUM: Simple primitives build efficient algorithms.
SRC: de Berg M, Cheong O, van Kreveld M, Overmars M, Computational Geometry: Algorithms and Applications (3rd edn, Springer 2008) | textbook | 2008 | https://link.springer.com/
SRC: O'Rourke J, Computational Geometry in C (2nd edn, Cambridge University Press 1998) | textbook | 1998 | https://www.cambridge.org/
NUM1#maths-u05-43-q1@1: Use the shoelace formula to find the area of the triangle (0, 0), (5, 0), (2, 4). | 10 | 0 |  | ½|0 × 0 − 5 × 0 + 5 × 4 − 2 × 0 + 2 × 0 − 0 × 4| = ½ × 20 = 10.
M1#maths-u05-43-q2@1: What is the time complexity of the best general convex hull algorithms? | O(n log n) | O(n^{2}) | O(n^{3}) | O(log n) | O(2^{n}) | Sorting the points is the bottleneck, giving O(n log n), which is optimal in general.
M2#maths-u05-43-q3@2: What is the dual structure of a Voronoi diagram? | The Delaunay triangulation | The convex hull | A spanning tree | A kd-tree | A grid | Joining sites whose Voronoi regions share an edge gives the Delaunay triangulation.

## Integral Geometry
S: Integral geometry measures sets of geometric objects (lines, needles, planes) using integrals, often with probability. Its most famous result, Buffon's needle, estimates π by dropping needles on lined paper.
O: Solve Buffon's needle problem
O: Describe how integral geometry measures sets of lines
T: Buffon's needle | Dropping a needle of length l on lines d apart (l ≤ d); the probability it crosses a line is 2l/(πd)
T: Crofton formula | The length of a curve equals a constant times the measure of the set of lines meeting it, counted with multiplicity
H: Buffon's needle
- Comte de Buffon posed it in 1777: the answer involves π, so repeated drops estimate π.
- With l = d, the probability is 2/π ≈ 0.637.
- Derivation: integrate over the needle's angle θ and its centre's distance from the nearest line.
H: Measuring lines
- Lines in the plane can be parameterised by an angle and a distance, with a natural measure invariant under rigid motions.
- Crofton's formula: the length of a curve is half the measure of the set of lines that meet it (counted with multiplicity), so length can be found by counting intersections.
- Applications: stereology (estimating volumes and surface areas of tissues from slices), tomography and image analysis.
X: A needle of length 1 cm is dropped on lines 2 cm apart. What is the probability it crosses a line?
> P = 2l/(πd) = 2 × 1/(π × 2)
> = 1/π
> ≈ 0.318
K: Buffon's needle: P = 2l/(πd) for l ≤ d; integral geometry measures sets of lines, giving formulas for lengths and areas.
!: Using Buffon's formula for needles longer than the line spacing (it changes).
Q: Who posed the needle problem? | Georges-Louis Leclerc, Comte de Buffon (1777).
Q: What does stereology use integral geometry for? | Estimating 3D quantities from 2D slices.
SUM: Integral geometry measures sets of geometric objects.
SUM: Buffon's needle links probability and π.
SRC: Santaló LA, Integral Geometry and Geometric Probability (2nd edn, Cambridge University Press 2004) | textbook | 2004 | https://www.cambridge.org/
SRC: Klain DA, Rota GC, Introduction to Geometric Probability (Cambridge University Press 1997) | textbook | 1997 | https://www.cambridge.org/
NUM1#maths-u05-44-q1@1: A needle of length 3 cm is dropped on lines 4 cm apart. Find the probability it crosses a line, to 3 decimal places. | 0.477 | 0.0005 |  | 2 × 3/(π × 4) = 6/(4π) ≈ 0.477.
M1#maths-u05-44-q2@1: If needles equal in length to the line spacing are dropped, about what fraction cross a line? | 2/π ≈ 0.64 | 1/2 | 1/π ≈ 0.32 | π/4 ≈ 0.79 | 1 | With needle length equal to the spacing, P = 2l/(πd) = 2/π ≈ 0.64.
M3#maths-u05-44-q3@2: In 1,000 drops with l = d, 640 needles cross a line. What is the estimate of π? | About 3.125 | About 3.2 | About 1.56 | About 0.64 | About 6.4 | The observed proportion 0.64 estimates 2/π, so π ≈ 2/0.64 = 3.125.

## Differential Geometry
S: Differential geometry uses calculus to study curves and surfaces: how they bend and twist. Curvature is its central idea, and Gauss's remarkable theorem shows a surface's curvature can be measured from within it.
O: Calculate the curvature of plane curves
O: Describe Gaussian curvature and the Theorema Egregium
T: Curvature of a curve | κ = |y″|/(1 + y′^{2})^{3/2}; for a circle of radius R it's 1/R
T: Gaussian curvature | K = κ₁κ₂, the product of a surface's principal curvatures at a point
H: Curves
- A straight line has curvature 0; a circle of radius R has curvature 1/R everywhere.
- The osculating circle is the best-fitting circle at a point; its radius is 1/κ.
- Space curves also have torsion (twisting out of a plane): the Frenet–Serret formulas.
- Roads and railways use transition curves (clothoids) whose curvature changes gradually.
H: Surfaces
- Gaussian curvature: positive for a sphere (K = 1/R^{2}), zero for a plane or cylinder, negative for a saddle.
- **Theorema Egregium** (Gauss, 1827): K is intrinsic, measurable by beings living on the surface without leaving it. That's why a flat map of the Earth must distort distances (the sphere has K > 0, the map K = 0), but a cylinder can be unrolled flat.
X: Find the curvature of y = x^{2} at x = 0 and at x = 1.
> y′ = 2x and y″ = 2
> At x = 0: κ = 2/(1 + 0)^{3/2} = 2 (osculating circle radius ½)
> At x = 1: κ = 2/(1 + 4)^{3/2} = 2/5^{3/2} ≈ 0.179
K: κ = |y″|/(1 + y′^{2})^{3/2}, circle 1/R; Gaussian curvature is intrinsic, so spheres can't be mapped flat without distortion.
!: Thinking a cylinder is curved in Gauss's sense: its Gaussian curvature is zero.
Q: What is the curvature of a circle of radius 4? | 1/4.
Q: Why can't a perfect flat map of the Earth exist? | Gaussian curvature is intrinsic, and a sphere's (positive) differs from a plane's (zero).
SUM: Curvature measures bending.
SUM: Gaussian curvature is intrinsic.
SRC: do Carmo MP, Differential Geometry of Curves and Surfaces (2nd edn, Dover 2016) | textbook | 2016 | https://store.doverpublications.com/
SRC: Pressley A, Elementary Differential Geometry (2nd edn, Springer 2010) | textbook | 2010 | https://link.springer.com/
NUM1#maths-u05-45-q1@1: What is the curvature of a circle of radius 0.25 m? | 4 | 0 | m⁻¹ | κ = 1/R = 1/0.25 = 4 m^{−1}.
M1#maths-u05-45-q2@1: What is the Gaussian curvature of a cylinder? | Zero | Positive | Negative | Infinite | It varies | One principal curvature is zero (along the axis), so their product is zero: a cylinder can be unrolled flat.
M2#maths-u05-45-q3@2: Which surface has negative Gaussian curvature at its centre? | A saddle (y^{2} − x^{2}) | A sphere | A plane | A cylinder | An egg | At a saddle, the surface curves up in one direction and down in the other.

## Riemannian Geometry
S: Riemannian geometry studies curved spaces of any dimension using a metric that measures lengths and angles at every point. It's the mathematics of general relativity, where gravity is the curvature of space-time.
O: Describe metrics, geodesics and curvature in Riemannian geometry
O: Apply the Gauss–Bonnet theorem
T: Riemannian metric | A smoothly varying inner product on tangent spaces, giving lengths and angles
T: Geodesic | A locally shortest path; the generalisation of a straight line
H: Core ideas
- A metric ds^{2} = g_{ij} dx^{i} dx^{j} defines lengths: in the plane ds^{2} = dx^{2} + dy^{2}; on a sphere of radius R, ds^{2} = R^{2}(dθ^{2} + sin^{2} θ dφ^{2}).
- Geodesics: great circles on spheres; straight lines in the plane.
- Curvature (the Riemann tensor) measures how geodesics converge or diverge, and how vectors rotate when carried around loops.
H: Gauss–Bonnet and relativity
- **Gauss–Bonnet**: for a closed surface, ∫ K dA = 2πχ, linking geometry (curvature) and topology (the Euler characteristic χ). A sphere: K = 1/R^{2}, area 4πR^{2}, so ∫ K dA = 4π = 2π × 2.
- **General relativity** (Einstein, 1915): matter curves space-time (a 4D Lorentzian manifold), and free objects follow geodesics. GPS satellites must correct for it.
- Perelman's proof of the Poincaré conjecture (2003) used Riemannian geometry (Ricci flow).
X: Verify the Gauss–Bonnet theorem for a sphere of radius 3.
> K = 1/R^{2} = 1/9 everywhere, and area = 4π × 9 = 36π
> ∫ K dA = (1/9) × 36π = 4π
> A sphere has χ = 2, and 2πχ = 4π ✓
K: A metric defines geometry; geodesics are straightest paths; Gauss–Bonnet links total curvature to topology; relativity is Riemannian geometry.
!: Thinking total curvature depends on a surface's size: for a sphere it's always 4π.
Q: What are the geodesics on a sphere? | Great circles.
Q: What does the Gauss–Bonnet theorem relate? | Total curvature and the Euler characteristic.
SUM: Riemannian geometry measures curved spaces.
SUM: It underpins general relativity.
SRC: do Carmo MP, Riemannian Geometry (Birkhäuser 1992) | textbook | 1992 | https://link.springer.com/
SRC: Carroll SM, Spacetime and Geometry (Cambridge University Press 2019) | textbook | 2019 | https://www.cambridge.org/
NUM1#maths-u05-46-q1@1: A closed surface has Euler characteristic 0 (a torus). What is its total Gaussian curvature? | 0 | 0 |  | By Gauss–Bonnet, ∫ K dA = 2πχ = 0: positive and negative curvature cancel.
M1#maths-u05-46-q2@1: In general relativity, what do freely falling objects follow? | Geodesics of space-time | Straight lines in space | Circles | Parabolas only | Great circles on the Earth | Gravity is curvature, and free motion is along geodesics.
M2#maths-u05-46-q3@2: What is the total Gaussian curvature of any sphere, whatever its radius? | 4π | 4πR^{2} | 2π | 1/R^{2} | 0 | Curvature 1/R^{2} times area 4πR^{2} always gives 4π.

## Symplectic Geometry
S: Symplectic geometry is the geometry of classical mechanics' phase space, where positions and momenta live together. Its structure measures oriented areas rather than lengths, and Hamiltonian flows preserve it.
O: Describe phase space and the symplectic form
O: Explain why Hamiltonian flows preserve phase-space area
T: Phase space | The space of positions q and momenta p of a system
T: Symplectic form | A non-degenerate, closed 2-form ω (in 2D, ω = dq ∧ dp) measuring oriented area
H: Mechanics in phase space
- Hamilton's equations: dq/dt = ∂H/∂p, dp/dt = −∂H/∂q, where H is the total energy.
- A harmonic oscillator H = (p^{2} + q^{2})/2 moves round circles in phase space.
- **Liouville's theorem**: Hamiltonian flows preserve phase-space volume, the foundation of statistical mechanics.
H: Symplectic maps
- A map is symplectic if it preserves ω; in 2D, that means preserving oriented area (Jacobian determinant 1).
- Gromov's non-squeezing theorem (1985): a symplectic map can't squeeze a ball through a smaller hole, even though volume is preserved: a symplectic "uncertainty principle".
- Symplectic integrators are numerical methods for long-term simulations of planets and molecules that respect this structure (School 19).
X: Show that the map (q, p) ↦ (q + p, p) preserves area in phase space.
> The Jacobian matrix is [[1, 1], [0, 1]]
> Its determinant is 1 × 1 − 1 × 0 = 1
> So it preserves oriented area: it's a symplectic map (a shear)
K: Phase space pairs positions and momenta; the symplectic form measures oriented area; Hamiltonian flows preserve it.
!: Thinking symplectic geometry measures lengths: it measures oriented areas instead.
Q: What does Liouville's theorem say? | Hamiltonian flows preserve phase-space volume.
Q: In 2D, when is a map symplectic? | When its Jacobian determinant is 1 everywhere.
SUM: Symplectic geometry is mechanics' natural geometry.
SUM: Hamiltonian motion preserves its structure.
SRC: Arnold VI, Mathematical Methods of Classical Mechanics (2nd edn, Springer 1989) | textbook | 1989 | https://link.springer.com/
SRC: McDuff D, Salamon D, Introduction to Symplectic Topology (3rd edn, Oxford University Press 2017) | textbook | 2017 | https://global.oup.com/
M1#maths-u05-47-q1@1: What does phase space combine? | Positions and momenta | Time and energy only | Mass and charge | Length and area | Velocity and acceleration only | Each point records the system's state: where it is and how it's moving.
M3#maths-u05-47-q2@2: Which 2D linear map is symplectic? | [[2, 3], [1, 2]] | [[2, 0], [0, 2]] | [[1, 1], [1, 1]] | [[3, 0], [0, 1]] | [[0, 2], [1, 0]] | Its determinant is 4 − 3 = 1, so it preserves oriented area.

## Algebraic Geometry
S: Algebraic geometry studies the shapes defined by polynomial equations, called varieties. It joins algebra and geometry deeply, and its ideas solved Fermat's Last Theorem and power modern cryptography.
O: Describe algebraic varieties as solution sets of polynomials
O: Apply Bézout's theorem to count intersections
T: Algebraic variety | The set of common solutions of a system of polynomial equations
T: Bézout's theorem | Two plane curves of degrees m and n with no common component meet in exactly mn points, counted with multiplicity, in the complex projective plane
H: Varieties
- A line ax + by = c (degree 1), conics (degree 2), elliptic curves y^{2} = x^{3} + ax + b (degree 3).
- Studying solutions over different number systems: real points, complex points, rational points, points modulo p.
- Rational points on curves: the circle x^{2} + y^{2} = 1 has infinitely many (Pythagorean triples), while x^{n} + y^{n} = 1 has none non-trivial for n ≥ 3 (Fermat's Last Theorem, proved by Wiles in 1995).
H: Bézout and modern theory
- A line and a conic meet in at most 2 points; two conics in at most 4.
- Grothendieck's schemes (1960s) rebuilt the subject with commutative algebra (Schools 4 and 17).
- Elliptic curve cryptography (School 2) uses algebraic geometry over finite fields.
X: At most how many points can the circle x^{2} + y^{2} = 25 and the parabola y = x^{2} − 5 share? Find them.
> Degrees 2 and 2, so Bézout allows at most 4
> Substitute x^{2} = y + 5: y + 5 + y^{2} = 25, so y^{2} + y − 20 = 0 and y = 4 or −5
> y = 4: x = ±3; y = −5: x = 0. Points (3, 4), (−3, 4) and (0, −5) (the last counts twice: a tangency)
K: Varieties are polynomial solution sets; Bézout counts intersections (mn, with multiplicity, over the complex projective plane).
!: Expecting exactly mn real intersection points: some may be complex, at infinity or repeated.
Q: In how many points can two conics meet? | At most 4 (exactly 4 counting complex, infinite and repeated points).
Q: Which famous theorem was proved using algebraic geometry? | Fermat's Last Theorem.
SUM: Algebraic geometry studies polynomial shapes.
SUM: Bézout's theorem counts intersections.
SRC: Reid M, Undergraduate Algebraic Geometry (Cambridge University Press 1988) | textbook | 1988 | https://www.cambridge.org/
SRC: Hartshorne R, Algebraic Geometry (Springer 1977) | textbook | 1977 | https://link.springer.com/
M1#maths-u05-48-q1@1: At most how many points can a line and a cubic curve share? | 3 | 2 | 1 | 6 | 9 | Bézout: degrees 1 and 3 give at most 1 × 3 = 3.
M2#maths-u05-48-q2@2: Who proved Fermat's Last Theorem? | Andrew Wiles (with Richard Taylor) | Pierre de Fermat | Leonhard Euler | Alexander Grothendieck | Grigori Perelman | Wiles's 1995 proof used elliptic curves and modular forms.

## Topological Geometry
S: Topological geometry studies the properties of shapes that survive stretching and bending without tearing or gluing. To a topologist, a coffee mug and a doughnut are the same shape, because each has one hole.
O: Classify surfaces by their Euler characteristic and genus
O: Distinguish topological properties from geometric ones
T: Homeomorphic | Topologically equivalent: one shape can be continuously deformed into the other
T: Genus | The number of "handles" (holes) of a closed orientable surface
H: Topological properties
- Preserved by continuous deformation: connectedness, number of holes, orientability.
- Not preserved: lengths, angles, curvature.
- Euler characteristic χ = V − E + F: 2 for a sphere, 0 for a torus, 2 − 2g for a surface of genus g.
H: Classifying surfaces
- Every closed orientable surface is a sphere with some number g of handles (the classification theorem).
- Non-orientable surfaces: the Möbius strip has only one side; the Klein bottle can't be built in 3D without self-intersection.
- Topology underlies network analysis, data analysis (persistent homology), robotics and physics (topological phases of matter, Nobel Prize 2016).
- Full treatment: School 17.
X: A surface is built from 16 vertices, 32 edges and 16 faces. What is its Euler characteristic and genus (if orientable)?
> χ = 16 − 32 + 16 = 0
> χ = 2 − 2g gives 0 = 2 − 2g
> g = 1: it's a torus
K: Topology studies properties unchanged by continuous deformation; χ = 2 − 2g classifies closed orientable surfaces.
!: Treating geometric measurements (like area) as topological properties.
Q: What is the genus of a sphere? | 0.
Q: Why are a mug and a doughnut topologically the same? | Each has exactly one hole and can be deformed into the other.
SUM: Topology ignores lengths and angles.
SUM: Holes and orientability classify surfaces.
SRC: Armstrong MA, Basic Topology (Springer 1983) | textbook | 1983 | https://link.springer.com/
SRC: Richeson DS, Euler's Gem: The Polyhedron Formula and the Birth of Topology (Princeton University Press 2008) | textbook | 2008 | https://press.princeton.edu/
NUM1#maths-u05-49-q1@1: What is the Euler characteristic of a closed orientable surface of genus 3? | -4 | 0 |  | χ = 2 − 2g = 2 − 6 = −4.
M1#maths-u05-49-q2@1: Which shape is homeomorphic to a doughnut (torus)? | A coffee mug with one handle | A sphere | A disc | A figure eight | A solid ball | Both have one hole, so one can be continuously deformed into the other.
M2#maths-u05-49-q3@2: Which surface has only one side? | A Möbius strip | A torus | A sphere | A cylinder | A disc | A Möbius strip is non-orientable: you can travel from one "side" to the other without crossing an edge.

## Knot Theory
S: A mathematical knot is a closed loop in 3D space that can't pass through itself. Knot theory asks when two knots are the same, using invariants that don't change under deformation. It has applications in DNA biology and physics.
O: Describe knots, diagrams and Reidemeister moves
O: Use simple invariants such as tricolourability to distinguish knots
T: Knot | A closed loop embedded in 3D space, considered up to continuous deformation without cutting
T: Knot invariant | A quantity unchanged by deformation, used to tell knots apart
H: Knots and diagrams
- The **unknot** is a simple loop; the **trefoil** is the simplest true knot (3 crossings); the figure-eight knot has 4.
- Knots are drawn as diagrams with over- and under-crossings.
- **Reidemeister's theorem** (1927): two diagrams show the same knot exactly when they're related by three types of local move.
H: Invariants
- **Crossing number**: the fewest crossings in any diagram.
- **Tricolourability**: colour the strands with three colours so that at each crossing all three or only one colour meet, using at least two colours. The trefoil can be tricoloured; the unknot can't, so they're different.
- Polynomial invariants: Alexander (1928), Jones (1984, Fields Medal 1990).
- Applications: enzymes (topoisomerases) knot and unknot DNA; knotted molecules; quantum field theory.
X: Explain why the trefoil can't be untied into the unknot.
> The trefoil diagram can be tricoloured: its three arcs each get a different colour, and at every crossing all three colours meet
> The unknot's diagram has one arc, so it can only use one colour: not tricolourable
> Tricolourability is invariant under Reidemeister moves, so the trefoil isn't the unknot
K: Knots are loops in 3D up to deformation; Reidemeister moves relate diagrams; invariants such as tricolourability and polynomials distinguish knots.
!: Thinking a messy diagram must be a complicated knot: it may simplify to the unknot.
Q: What is the crossing number of the trefoil? | 3.
Q: Why are invariants useful? | If two knots have different invariant values, they can't be the same knot.
SUM: Knot theory classifies loops in space.
SUM: Invariants tell knots apart.
SRC: Adams CC, The Knot Book (American Mathematical Society 2004) | textbook | 2004 | https://bookstore.ams.org/
SRC: Lickorish WBR, An Introduction to Knot Theory (Springer 1997) | textbook | 1997 | https://link.springer.com/
M1#maths-u05-50-q1@1: What is the simplest non-trivial knot? | The trefoil | The figure-eight knot | The unknot | The granny knot | The square knot | The trefoil, with crossing number 3, is the simplest knot that can't be untied.
M2#maths-u05-50-q2@2: What do Reidemeister moves do? | Change a knot diagram without changing the knot | Cut and rejoin the strands | Count the crossings | Colour the arcs | Turn a knot into a link | Any two diagrams of the same knot are related by a sequence of these three local moves.
`;
