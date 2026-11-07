// School 15: Graph Theory and Networks. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Graphs and their structure, classic problems and algorithms, and the mathematics of real-world networks.
export default `
## Graph Theory
S: Graph theory studies networks of points (vertices) joined by lines (edges). Starting with Euler's 1736 solution of the Königsberg bridges puzzle, it now models road maps, social networks, the internet, molecules and schedules.
O: Describe graphs using vertices, edges and degrees
O: Apply the handshake lemma
T: Graph | A set of vertices V and a set of edges E joining pairs of vertices
T: Degree | The number of edges meeting a vertex (a loop counts twice)
H: The basics
- A graph records which things are connected, not their positions: drawings can differ.
- Adjacent vertices share an edge; the neighbourhood of v is its set of neighbours.
- Variations: directed, weighted, multigraphs, hypergraphs.
H: The handshake lemma
- Σ deg(v) = 2|E|: each edge contributes 2 to the total degree.
- So the number of odd-degree vertices is always even.
- Example: 7 people can't each shake exactly 3 hands (total 21 would be odd).
H: Applications
- Transport and utility networks; scheduling with conflicts (colouring).
- Chemistry (molecular graphs), biology (food webs), computing (data structures, dependencies).
- Social and information networks (later in this school).
X: A graph has degrees 3, 3, 2, 2, 2. How many edges does it have, and could a graph have degrees 3, 3, 3, 2, 2?
> Sum of degrees = 12, so |E| = 12/2 = 6
> For 3, 3, 3, 2, 2 the sum is 13, which is odd
> So no graph has that degree list (an odd number of odd-degree vertices)
K: Graphs are vertices plus edges; Σdeg = 2|E|; odd-degree vertices come in even numbers; graphs model any pairwise connections.
!: Assuming two different drawings show different graphs.
Q: What is the sum of degrees in a graph with 10 edges? | 20.
Q: Can a graph have exactly one vertex of odd degree? | No.
SUM: Graphs model connections.
SUM: Degrees sum to twice the edges.
SRC: Wilson RJ, Introduction to Graph Theory (5th edn, Pearson 2010) | textbook | 2010 | https://www.pearson.com/
SRC: Euler L, Solutio problematis ad geometriam situs pertinentis, Commentarii Academiae Scientiarum Petropolitanae 8, 128 | journal | 1736 | https://scholarlycommons.pacific.edu/euler-works/53/
NUM1#maths-u15-01-q1@1: A graph has 8 vertices, each of degree 3. How many edges does it have? | 12 | 0 |  | Σdeg = 24 = 2|E|, so |E| = 12.
M1#maths-u15-01-q2@1: What does the degree of a vertex count? | The edges meeting it | Its distance from the centre | The number of vertices in the graph | Its label | The longest path through it | The degree counts the edges meeting a vertex, with a loop counted twice.
M2#maths-u15-01-q3@2: Why must the number of odd-degree vertices be even? | The total degree 2|E| is even, so odd degrees must pair up | Graphs are symmetric | Every vertex has even degree | Edges have two colours | Loops always add an odd amount to a vertex, which balances out | A sum with an odd number of odd terms would be odd.

## Undirected Graphs
S: In an undirected graph, edges have no direction: if A is joined to B, then B is joined to A. Simple undirected graphs (no loops or repeated edges) are the standard setting for most of graph theory.
O: Represent undirected graphs with adjacency matrices and lists
O: Recognise complete graphs, complements, subgraphs and isomorphic graphs
T: Simple graph | An undirected graph with no loops and at most one edge between any two vertices
T: Complete graph | Kₙ, with every pair of n vertices joined: n(n − 1)/2 edges
H: Representations
- Adjacency matrix A: a_{ij} = 1 if i and j are adjacent; symmetric for undirected graphs.
- Adjacency list: each vertex's neighbours (efficient for sparse graphs).
- Incidence matrix: vertices against edges.
H: Standard graphs and operations
- Kₙ (complete), Cₙ (cycle), Pₙ (path), stars and wheels.
- Complement Ḡ: join exactly the pairs not joined in G.
- Subgraphs: delete vertices or edges; induced subgraphs keep all edges among chosen vertices.
H: Isomorphism
- Two graphs are isomorphic if a relabelling of vertices maps edges to edges.
- Check invariants: numbers of vertices and edges, degree sequences, cycles.
- No general polynomial algorithm is known, but Babai (2015) found a quasi-polynomial one.
X: How many edges do K₆ and its complement have?
> K₆ has C(6, 2) = 15 edges
> Its complement has no edges (every pair is already joined in K₆)
> Any graph G on 6 vertices has |E(G)| + |E(Ḡ)| = 15
K: Undirected simple graphs have symmetric adjacency matrices; Kₙ has n(n − 1)/2 edges; complements fill the missing pairs; isomorphism means identical structure.
!: Concluding two graphs are isomorphic because they have the same number of vertices and edges.
Q: Is the adjacency matrix of an undirected graph symmetric? | Yes.
Q: How many edges are in the complement of C₅? | 5 (since K₅ has 10).
SUM: Undirected edges join both ways.
SUM: Invariants test isomorphism.
SRC: West DB, Introduction to Graph Theory (2nd edn, Pearson 2001) | textbook | 2001 | https://www.pearson.com/
SRC: Diestel R, Graph Theory (5th edn, Springer 2017) | textbook | 2017 | https://diestel-graph-theory.com/
NUM1#maths-u15-02-q1@1: How many edges does K₁₀ have? | 45 | 0 |  | C(10, 2) = 45.
M1#maths-u15-02-q2@1: Which invariant shows two graphs aren't isomorphic? | Different degree sequences | Different vertex labels | Different drawings | Different colours | Different edge lengths | Isomorphisms preserve degrees; labels and drawings don't matter.
M2#maths-u15-02-q3@2: A graph on 7 vertices has 12 edges. How many does its complement have? | 9 | 12 | 21 | 33 | 7 | K₇ has C(7, 2) = 21 edges, and the complement takes the missing ones: 21 − 12 = 9.

## Directed Graphs
S: In a directed graph (digraph), edges have directions, like one-way streets, web links or "follows" on social media. Directions change everything: reachability, connectivity and degree all split into "in" and "out".
O: Calculate in-degrees and out-degrees and use the directed handshake lemma
O: Count walks with powers of the adjacency matrix
T: Directed graph | Vertices with ordered pairs (arcs) u → v
T: In-degree and out-degree | The number of arcs entering and leaving a vertex
H: Degrees
- Σ in-degrees = Σ out-degrees = number of arcs.
- Sources have in-degree 0; sinks have out-degree 0.
- The adjacency matrix isn't symmetric in general.
H: Connectivity and walks
- Strongly connected: every vertex reaches every other along directed paths.
- Weakly connected: connected if directions are ignored.
- (Aᵏ)_{ij} counts directed walks of length k from i to j.
H: Examples
- Web pages and links (PageRank, later in this school).
- Food webs (who eats whom), citation networks, task dependencies.
- Tournaments: every pair joined by one arc (round-robin results); every tournament has a Hamiltonian path.
X: For the digraph with arcs 1→2, 1→3, 2→3, 3→1, count walks of length 2 from 1 to 3.
> A = [[0, 1, 1], [0, 0, 1], [1, 0, 0]]
> Row 1 of A^{2}: (A^{2})₁₃ = a₁₁a₁₃ + a₁₂a₂₃ + a₁₃a₃₃ = 0 + 1 + 0 = 1
> One walk: 1 → 2 → 3
K: Arcs have direction; in-degrees and out-degrees each sum to the number of arcs; strong vs weak connectivity; Aᵏ counts directed walks.
!: Treating a directed graph's adjacency matrix as symmetric.
Q: What is a sink in a digraph? | A vertex with out-degree 0.
Q: What does (A^{3})_{ij} count? | Directed walks of length 3 from i to j.
SUM: Directions split degrees and connectivity.
SUM: Matrix powers count walks.
SRC: Bang-Jensen J, Gutin G, Digraphs: Theory, Algorithms and Applications (2nd edn, Springer 2009) | textbook | 2009 | https://link.springer.com/
SRC: West DB, Introduction to Graph Theory (2nd edn, Pearson 2001) | textbook | 2001 | https://www.pearson.com/
NUM1#maths-u15-03-q1@1: A digraph has 15 arcs. What is the sum of all out-degrees? | 15 | 0 |  | Each arc leaves exactly one vertex.
M1#maths-u15-03-q2@1: Which describes a strongly connected digraph? | Every vertex can reach every other along directed paths | It has no cycles | All arcs point the same way | It's connected when directions are ignored | Every vertex has in-degree 1 | Strong connectivity respects the arc directions.
M2#maths-u15-03-q3@2: Why does every tournament contain a Hamiltonian path? | It can be built by inserting vertices one at a time into a growing path | Tournaments are complete undirected graphs | Every tournament is strongly connected | Each vertex beats exactly half of the others, forming a ring | Tournaments have no cycles | Rédei's theorem: each new vertex fits somewhere in the existing directed path.

## Weighted Graphs
S: A weighted graph attaches a number to each edge: a distance, cost, time, capacity or strength. Weights turn graphs into models of road networks, pipelines and budgets, and they're the input to shortest path and spanning tree algorithms.
O: Represent weighted graphs and compute path weights
O: Interpret weights in applications
T: Weighted graph | A graph with a weight w(e) on each edge
T: Path weight | The sum of the weights of a path's edges
H: Representing weights
- Weight matrix: w_{ij} for an edge, and ∞ (or blank) when there's no edge.
- Weighted adjacency lists.
- Directed weighted graphs model asymmetric costs (uphill vs downhill, one-way fares).
H: Interpreting weights
- Distances or travel times: minimise total weight (shortest paths).
- Capacities: limit flow (network flows).
- Costs for building links: minimise total (minimum spanning trees).
- Strengths of ties in social networks (Weighted Networks).
H: Cautions
- Negative weights break some algorithms (Dijkstra) and allow negative cycles.
- Units must be consistent across edges.
X: Routes from A to D: A–B–D with weights 4 and 5, or A–C–D with weights 2 and 8. Which is cheaper?
> A–B–D: 4 + 5 = 9
> A–C–D: 2 + 8 = 10
> A–B–D is cheaper by 1
- Example: a delivery network might weight edges by minutes, fuel cost or toll, giving different best routes.
K: Weights quantify edges; path weight is the sum; interpret them as distance, cost or capacity; watch for negative weights.
!: Comparing paths by number of edges when the question is about total weight.
Q: What weight usually represents "no edge" in a weight matrix? | ∞ (or a blank).
Q: Which algorithms fail with negative edge weights? | Dijkstra's algorithm.
SUM: Weights make graphs quantitative.
SUM: Path weight adds edge weights.
SRC: Cormen TH, Leiserson CE, Rivest RL, Stein C, Introduction to Algorithms (4th edn, MIT Press 2022) | textbook | 2022 | https://mitpress.mit.edu/
SRC: Department for Education, AS and A level further mathematics subject content: decision mathematics | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u15-04-q1@1: Find the weight of the path with edges weighted 3, 7, 2 and 6. | 18 | 0 |  | 3 + 7 + 2 + 6 = 18.
M1#maths-u15-04-q2@1: In a pipeline network, what do edge weights most naturally represent? | Capacities | Colours | Vertex degrees | Path counts | Planarity | Pipes limit how much can flow, a capacity.
M2#maths-u15-04-q3@2: Why can negative edge weights cause trouble for shortest path problems? | A negative cycle can make paths arbitrarily cheap | They make graphs undirected | They create extra vertices | They're never allowed | Algorithms must then treat every edge as undirected | Going round a negative cycle repeatedly reduces the total without limit.

## Degree Sequences
S: A graph's degree sequence lists its vertex degrees. Deciding which lists are possible, and building graphs to match them, is useful in network modelling and chemistry, and the Havel–Hakimi algorithm does it step by step.
O: Test whether a sequence is graphical using Havel–Hakimi
O: Use degree sequences as graph invariants
T: Graphical sequence | A list of non-negative integers that is the degree sequence of some simple graph
T: Havel–Hakimi algorithm | Repeatedly remove the largest degree d and subtract 1 from the next d largest; graphical iff you reach all zeros
H: Necessary conditions
- The sum must be even (handshake lemma).
- No degree can exceed n − 1 in a simple graph on n vertices.
- These aren't sufficient: (3, 3, 3, 1) has an even sum but isn't graphical.
H: Tests
- Havel–Hakimi (1955, 1962): a simple reduction.
- Erdős–Gallai inequalities give an exact criterion.
- Many different graphs can share a degree sequence.
H: Uses
- Invariant for isomorphism testing.
- Configuration model: random graphs with a given degree sequence (network science).
- Chemistry: valences constrain molecular graphs.
X: Is (3, 3, 2, 2, 2) graphical? Is (3, 3, 3, 1)?
> (3, 3, 2, 2, 2): remove 3, subtract from next three: (2, 1, 1, 2) → (2, 2, 1, 1); remove 2: (1, 0, 1) → (1, 1, 0); remove 1: (0, 0) ✓ graphical
> (3, 3, 3, 1): remove 3: (2, 2, 0); remove 2: (1, −1) ✗
> A negative degree appears, so (3, 3, 3, 1) isn't graphical
K: Degree sums must be even and degrees ≤ n − 1; Havel–Hakimi tests graphicality; many graphs share one sequence.
!: Assuming an even sum is enough for a sequence to be graphical.
Q: Is (2, 2, 2) graphical? | Yes: it's the triangle.
Q: Is (4, 1, 1, 1) graphical on 4 vertices? | No: a degree of 4 exceeds n − 1 = 3.
SUM: Degree sequences summarise graphs.
SUM: Havel–Hakimi tests if they're possible.
SRC: Hakimi SL, On realizability of a set of integers as degrees of the vertices of a linear graph, Journal of SIAM 10(3), 496 | journal | 1962 | https://doi.org/10.1137/0110037
SRC: West DB, Introduction to Graph Theory (2nd edn, Pearson 2001) | textbook | 2001 | https://www.pearson.com/
NUM1#maths-u15-05-q1@1: How many edges does a graph with degree sequence (4, 3, 3, 2, 2) have? | 7 | 0 |  | Σdeg = 14, so |E| = 7.
M1#maths-u15-05-q2@1: Which sequence is graphical? | (2, 2, 1, 1) | (3, 1, 1) | (3, 3, 1, 1) | (1, 1, 1) | (5, 1, 1, 1, 1) | (2, 2, 1, 1) is the degree sequence of a path on four vertices, so it's graphical.
M3#maths-u15-05-q3@2: Why isn't (3, 3, 1, 1) graphical? | Two degree-3 vertices on 4 vertices must each join all others, giving the others degree ≥ 2 | Repeated degrees force a multiple edge between those vertices | Degrees can't repeat | It has too few vertices for any graph | It is graphical | Each degree-3 vertex is adjacent to every other vertex, contradicting degree 1.

## Paths and Cycles
S: Paths and cycles are the routes through a graph. They measure distance, decide connectivity and bipartiteness, and underlie most graph algorithms.
O: Distinguish walks, trails, paths and cycles
O: Calculate distances, diameters and girth
T: Path | A walk with no repeated vertices
T: Diameter | The greatest distance between any two vertices of a connected graph
H: Definitions
- Walk: any sequence of adjacent vertices; trail: no repeated edges; path: no repeated vertices.
- Cycle: a closed path (returning to the start, no other repeats).
- Distance d(u, v): the length of a shortest path.
- Girth: the length of the shortest cycle.
H: Facts
- A graph is bipartite iff it has no odd cycle.
- Every graph with minimum degree ≥ 2 contains a cycle.
- A tree is a connected graph with no cycles (see Trees).
H: Standard graphs
- Cycle Cₙ: n vertices, n edges, diameter ⌊n/2⌋.
- Path Pₙ: n vertices, n − 1 edges, diameter n − 1.
- The Petersen graph has girth 5 and diameter 2.
X: Find the diameter of C₆ and of the path with 10 vertices.
> In C₆ the farthest vertex is opposite: distance 3
> In P₁₀ the ends are 9 edges apart
> Diameters: 3 and 9
- Example: the cube graph has girth 4 and diameter 3.
- Trails matter for Eulerian routes; paths for Hamiltonian ones.
K: Walks may repeat, trails don't repeat edges, paths don't repeat vertices; distance is shortest path length; diameter is the largest distance; odd cycles rule out bipartiteness.
!: Calling any walk between two vertices a path.
Q: What is the girth of K₄? | 3.
Q: What is the diameter of a complete graph Kₙ (n ≥ 2)? | 1.
SUM: Paths and cycles are routes.
SUM: Distances measure the graph.
SRC: Diestel R, Graph Theory (5th edn, Springer 2017) | textbook | 2017 | https://diestel-graph-theory.com/
SRC: Bondy JA, Murty USR, Graph Theory (Springer 2008) | textbook | 2008 | https://link.springer.com/
NUM1#maths-u15-06-q1@1: What is the diameter of the cycle C₉? | 4 | 0 |  | ⌊9/2⌋ = 4.
M1#maths-u15-06-q2@1: Which sequence is a path in a graph (assuming the edges exist)? | A–B–C–D | A–B–A–C | A–B–C–A–D | A–A–B | B–C–B | A–B–C–D visits each vertex at most once; the others repeat a vertex.
M2#maths-u15-06-q3@2: Why does a graph with an odd cycle fail to be bipartite? | Alternating two colours around an odd cycle forces two adjacent vertices to share a colour | Odd cycles have no edges | Bipartite graphs have no cycles | Any graph containing a cycle needs at least three colours | Odd cycles have loops | Two-colouring a cycle needs an even number of vertices.

## Graph Connectivity
S: Connectivity measures how well a graph holds together: whether every vertex can reach every other, and how many vertices or edges must fail before it falls apart. It's the mathematics of network reliability.
O: Identify components, cut vertices and bridges
O: Explain vertex and edge connectivity and Menger's theorem
T: Bridge | An edge whose removal disconnects its component
T: Vertex connectivity | κ(G), the fewest vertices whose removal disconnects G (or leaves one vertex)
H: Components
- A connected graph has a path between any two vertices.
- Components are the maximal connected pieces.
- A connected graph on n vertices needs at least n − 1 edges (a tree).
H: Weak points
- Cut vertex: removing it disconnects the graph.
- Bridge: removing it disconnects; an edge is a bridge iff it lies on no cycle.
- k-connected graphs survive removal of any k − 1 vertices.
H: Menger's theorem
- The minimum number of vertices separating u and v equals the maximum number of internally disjoint u–v paths.
- Edge version: minimum edge cut = maximum edge-disjoint paths (linked to max-flow min-cut).
- Redundant routes make networks robust.
X: Two triangles share a single vertex v. Identify any cut vertex or bridge.
> Removing v leaves two separate edges: v is a cut vertex
> Every edge lies on a triangle, so there are no bridges
> The vertex connectivity is 1, but the edge connectivity is 2
K: Components are maximal connected pieces; cut vertices and bridges are single points of failure; Menger relates separating sets to disjoint paths.
!: Assuming no cut vertices means no bridges (or vice versa).
Q: What is the minimum number of edges in a connected graph on 12 vertices? | 11.
Q: When is an edge a bridge? | When it lies on no cycle.
SUM: Connectivity measures robustness.
SUM: Menger links cuts and disjoint paths.
SRC: West DB, Introduction to Graph Theory (2nd edn, Pearson 2001) | textbook | 2001 | https://www.pearson.com/
SRC: Menger K, Zur allgemeinen Kurventheorie, Fundamenta Mathematicae 10, 96 | journal | 1927 | https://doi.org/10.4064/fm-10-1-96-115
NUM1#maths-u15-07-q1@1: What is the minimum number of edges in a connected graph with 20 vertices? | 19 | 0 |  | A spanning tree needs n − 1 = 19 edges.
M1#maths-u15-07-q2@1: In a tree, which edges are bridges? | All of them | None of them | Only the leaves' edges | Only the longest one | Exactly half | Trees have no cycles, so every edge is a bridge.
M2#maths-u15-07-q3@2: What does Menger's theorem say about vertices u and v? | The fewest vertices separating them equals the most internally disjoint paths between them | They're always adjacent | They have the same degree | Every path between them is shortest | Every shortest path between them passes through a cut vertex | It's the min-cut/max-paths duality for separating vertex sets.

## Trees
S: A tree is a connected graph with no cycles: the simplest connected structure. Trees have exactly one path between any two vertices, n − 1 edges on n vertices, and appear as family trees, file systems, parse trees and evolutionary trees.
O: Use the equivalent characterisations of trees
O: Count labelled trees with Cayley's formula
T: Tree | A connected acyclic graph
T: Leaf | A vertex of degree 1
H: Characterisations (for a graph on n vertices)
- Connected with no cycles.
- Connected with n − 1 edges.
- No cycles with n − 1 edges.
- Exactly one path between every pair of vertices.
H: Properties
- Every tree with at least 2 vertices has at least 2 leaves.
- Removing any edge disconnects it; adding any edge creates exactly one cycle.
- Rooted trees give parent–child structure; binary trees have at most two children.
H: Counting
- Cayley's formula: there are n^{n−2} labelled trees on n vertices.
- Prüfer codes give a bijection between labelled trees and sequences of length n − 2.
- Unlabelled trees are much harder to count.
X: How many labelled trees are there on 4 vertices, and how many edges does each have?
> Cayley: 4^{4−2} = 16 labelled trees
> Each has n − 1 = 3 edges
> They split into 12 paths and 4 stars
K: Trees are connected and acyclic with n − 1 edges and unique paths; at least two leaves; Cayley counts n^{n−2} labelled trees.
!: Assuming a graph with n − 1 edges is a tree without checking it's connected or acyclic.
Q: How many edges does a tree on 50 vertices have? | 49.
Q: What happens if you add an edge to a tree? | Exactly one cycle is created.
SUM: Trees are minimal connected graphs.
SUM: Cayley counts them.
SRC: Diestel R, Graph Theory (5th edn, Springer 2017) | textbook | 2017 | https://diestel-graph-theory.com/
SRC: Cayley A, A theorem on trees, Quarterly Journal of Pure and Applied Mathematics 23, 376 | journal | 1889 | https://archive.org/
NUM1#maths-u15-08-q1@1: Using Cayley's formula, how many labelled trees are there on 5 vertices? | 125 | 0 |  | 5^{3} = 125.
M1#maths-u15-08-q2@1: Which graph is a tree? | A path on 6 vertices | A cycle on 6 vertices | K₄ | Two disjoint edges | A triangle with a pendant edge | A path is connected and has no cycles, which is exactly the definition of a tree.
M2#maths-u15-08-q3@2: A connected graph has 10 vertices and 10 edges. What must it contain? | Exactly one cycle | No cycles | At least two cycles | A vertex of degree 10 | A bridge in every position | One more edge than a spanning tree creates exactly one cycle.

## Trees and Forests
S: A forest is a graph with no cycles: a collection of trees. Forests appear when data split into separate hierarchies, and counting their edges and components is a simple but powerful tool in algorithms such as Kruskal's.
O: Relate vertices, edges and components in forests
O: Use forests in algorithms and data structures
T: Forest | An acyclic graph; each component is a tree
T: Union–find | A data structure tracking which vertices lie in the same tree as edges are added
H: Counting
- A forest with n vertices and c components has n − c edges.
- Adding an edge between two trees merges them (components fall by 1).
- Adding an edge within a tree creates a cycle (no longer a forest).
H: Forests in practice
- Rooted forests represent multiple hierarchies (file systems on several drives, family trees).
- Decision forests in machine learning combine many trees (random forests).
- Kruskal's algorithm grows a forest until it becomes a spanning tree.
H: Union–find
- Supports "which tree is v in?" and "merge two trees".
- With union by rank and path compression, operations are almost constant time (inverse Ackermann).
- Used for connectivity, clustering and image segmentation.
X: A forest has 20 vertices and 3 components. How many edges does it have? What if one more edge joins two components?
> Edges = n − c = 20 − 3 = 17
> Joining two components merges them: 2 components, 18 edges
> It's still a forest (no cycle is created)
K: A forest is acyclic with n − c edges; edges between trees merge them; union–find tracks components efficiently.
!: Thinking adding an edge to a forest always creates a cycle (only within a tree).
Q: How many edges does a forest of 5 trees on 30 vertices have? | 25.
Q: What do random forests in machine learning combine? | Many decision trees.
SUM: Forests are collections of trees.
SUM: Edges = vertices − components.
SRC: Cormen TH, Leiserson CE, Rivest RL, Stein C, Introduction to Algorithms (4th edn, MIT Press 2022) | textbook | 2022 | https://mitpress.mit.edu/
SRC: Tarjan RE, Efficiency of a good but not linear set union algorithm, Journal of the ACM 22(2), 215 | journal | 1975 | https://doi.org/10.1145/321879.321884
NUM1#maths-u15-09-q1@1: A forest has 40 vertices and 31 edges. How many trees does it contain? | 9 | 0 |  | c = n − edges = 40 − 31 = 9.
M1#maths-u15-09-q2@1: Which graph is a forest but not a tree? | Two separate paths | A single path | A cycle | K₃ | A star | Two separate paths are acyclic, but with two components the graph isn't connected.
M3#maths-u15-09-q3@2: Why is union–find almost constant time per operation? | Union by rank and path compression keep trees extremely shallow | It uses no memory | It only works on paths | It sorts the vertices first | Sorting the vertices first makes every lookup a single step | Their combined cost grows like the inverse Ackermann function, below 5 for practical sizes.

## Spanning Trees
S: A spanning tree is a tree that includes every vertex of a graph, using some of its edges. Spanning trees give minimal connected backbones for networks, and counting them reveals deep links between graphs and linear algebra.
O: Find spanning trees and know when they exist
O: Count spanning trees with the matrix–tree theorem
T: Spanning tree | A subgraph that's a tree and contains every vertex
T: Matrix–tree theorem | The number of spanning trees equals any cofactor of the Laplacian matrix L = D − A (Kirchhoff, 1847)
H: Existence
- A graph has a spanning tree iff it's connected.
- Find one by breadth-first or depth-first search, or by deleting edges from cycles.
- It has n − 1 edges, out of the graph's |E|.
H: Counting
- Cycle Cₙ: n spanning trees (delete any one edge).
- Complete graph Kₙ: n^{n−2} (Cayley's formula again).
- General graphs: delete any row and column of the Laplacian and take the determinant.
H: Uses
- Network backbones and broadcast trees (the spanning tree protocol in Ethernet).
- Minimum spanning trees minimise total cost (later in this school).
- Electrical networks: Kirchhoff's original motivation.
X: Count the spanning trees of the cycle C₄ and of K₄.
> C₄: removing any one of its 4 edges leaves a path: 4 spanning trees
> K₄: Cayley's formula gives 4^{2} = 16
> (Each spanning tree of K₄ uses 3 of its 6 edges)
K: Spanning trees exist iff connected; Cₙ has n, Kₙ has n^{n−2}; the matrix–tree theorem counts them via the Laplacian.
!: Forgetting that a spanning tree must include every vertex.
Q: When does a graph have a spanning tree? | When it's connected.
Q: How many edges does a spanning tree of a 15-vertex graph have? | 14.
SUM: Spanning trees are minimal connected backbones.
SUM: Laplacian determinants count them.
SRC: Biggs NL, Algebraic Graph Theory (2nd edn, Cambridge University Press 1993) | textbook | 1993 | https://www.cambridge.org/
SRC: Kirchhoff G, Über die Auflösung der Gleichungen, auf welche man bei der Untersuchung der linearen Vertheilung galvanischer Ströme geführt wird, Annalen der Physik 148(12), 497 | journal | 1847 | https://doi.org/10.1002/andp.18471481202
NUM1#maths-u15-10-q1@1: How many spanning trees does the cycle C₇ have? | 7 | 0 |  | Delete any one of the 7 edges.
M1#maths-u15-10-q2@1: Which graph has no spanning tree? | A disconnected graph | A cycle | A complete graph | A star | A path | Spanning trees need every vertex connected.
M2#maths-u15-10-q3@2: What does the matrix–tree theorem compute? | The number of spanning trees, as a Laplacian cofactor | The shortest path length | The chromatic number | How many colourings exist, from the Laplacian's largest eigenvalue | The maximum flow | Kirchhoff's theorem counts spanning trees with a determinant.

## Directed Acyclic Graphs
S: A directed acyclic graph (DAG) has directed edges and no directed cycles. DAGs model dependencies (tasks, prerequisites, software builds, causal relationships), and they always admit a topological order.
O: Find a topological ordering of a DAG
O: Use DAGs for scheduling and critical path analysis
T: Topological order | An ordering of vertices so every arc points forward
T: Critical path | The longest path through a project network, determining the minimum completion time
H: Properties
- A digraph has a topological order iff it's acyclic.
- Kahn's algorithm: repeatedly remove a vertex with in-degree 0.
- Every DAG has at least one source and one sink.
- Longest paths are easy in DAGs (unlike general graphs).
H: Applications
- Course prerequisites, build systems (make), spreadsheet recalculation.
- Version control histories (Git) are DAGs of commits.
- Causal diagrams and Bayesian networks (School 13).
H: Critical path analysis
- Activities as arcs (or vertices) with durations.
- Earliest start times via a forward pass; latest via a backward pass.
- Activities with zero float are critical: delaying them delays the project.
X: Tasks: A (3 days) and B (4 days) both precede C (2 days), which precedes D (1 day). Find the minimum project time and the critical path.
> C can start when both A and B finish: after max(3, 4) = 4 days
> C finishes at day 6, and D at day 7
> Critical path B → C → D, 7 days; A has 1 day of float
K: DAGs have no directed cycles and always have topological orders; Kahn's algorithm finds one; the longest path is the critical path in scheduling.
!: Applying a topological sort to a graph with a cycle (no order exists).
Q: How does Kahn's algorithm start? | By removing a vertex with in-degree 0.
Q: What does the critical path determine? | The minimum time to complete the project.
SUM: DAGs model dependencies.
SUM: Topological order and critical paths schedule work.
SRC: Cormen TH, Leiserson CE, Rivest RL, Stein C, Introduction to Algorithms (4th edn, MIT Press 2022) | textbook | 2022 | https://mitpress.mit.edu/
SRC: Department for Education, AS and A level further mathematics subject content: decision mathematics | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u15-11-q1@1: In the example, how many days of float does task A have? | 1 | 0 | days | A can finish as late as day 4 without delaying C.
M1#maths-u15-11-q2@1: Which structure is a DAG? | A family tree of descendants with arrows from parent to child | A road network with two-way streets | A cycle of one-way streets | A complete undirected graph | A social network of friendships | Ancestry can't loop back, so parent-to-child arrows form no cycles.
M2#maths-u15-11-q3@2: Why can every DAG be topologically sorted? | It always has a source; removing it leaves another DAG, so the process repeats | Every DAG is a tree, and trees can always be listed in order | All vertices have equal degree | It can't always be sorted | DAGs have one vertex | Induction on Kahn's algorithm gives a valid order.

## Bipartite Graphs
S: A bipartite graph splits its vertices into two groups with edges only between groups: workers and jobs, students and courses, users and products. They're exactly the graphs with no odd cycles, and they're the setting for matching problems.
O: Recognise bipartite graphs and test for bipartiteness
O: Use complete bipartite graphs and bipartite models
T: Bipartite graph | A graph whose vertices split into sets X and Y with every edge joining X to Y
T: Complete bipartite graph | K_{m,n}, with all mn edges between parts of sizes m and n
H: Characterisation
- Bipartite ⇔ 2-colourable ⇔ no odd cycles (Kőnig).
- Test by breadth-first search, colouring levels alternately.
- Trees, even cycles and grid graphs are bipartite.
H: Examples and uses
- Assignment problems: workers to jobs, students to schools.
- Recommendation systems: users and items.
- Biadjacency matrices: rows for X, columns for Y.
H: Facts
- K_{m,n} has mn edges.
- Bipartite graphs satisfy |E| ≤ 2|V| − 4 when also planar.
- Matching theory is richest here (Hall, Kőnig).
X: Is the cycle C₅ bipartite? Is the 3D cube graph?
> C₅ is an odd cycle, so it isn't bipartite
> Cube vertices are binary strings of length 3; edges change one bit, so the parity of the number of 1s alternates
> Split by parity: the cube graph is bipartite
- Example: a timetable of teachers and classes is a bipartite graph.
K: Bipartite means two parts with edges across only; equivalently 2-colourable or no odd cycles; K_{m,n} has mn edges; it models assignments.
!: Thinking a graph with a triangle could be bipartite.
Q: Is every tree bipartite? | Yes.
Q: How many edges does K_{3,5} have? | 15.
SUM: Bipartite graphs have two sides.
SUM: No odd cycles is the test.
SRC: West DB, Introduction to Graph Theory (2nd edn, Pearson 2001) | textbook | 2001 | https://www.pearson.com/
SRC: Kőnig D, Theorie der endlichen und unendlichen Graphen (Akademische Verlagsgesellschaft 1936) | textbook | 1936 | https://archive.org/
NUM1#maths-u15-12-q1@1: How many edges does K_{3,4} have? | 12 | 0 |  | 3 × 4 = 12.
M1#maths-u15-12-q2@1: Which graph is bipartite? | C₆ | C₇ | K₃ | K₄ | The Petersen graph | Even cycles alternate between two parts; the others contain odd cycles.
M2#maths-u15-12-q3@2: How does breadth-first search test bipartiteness? | Colour levels alternately and check no edge joins two same-coloured vertices | It counts the vertices | It finds the longest path | It sorts edges by weight | Count the vertices and check that the total is even | An edge within one level reveals an odd cycle.

## Planar Graphs
S: A planar graph can be drawn in the plane with no edges crossing. Euler's formula links its vertices, edges and faces, and it limits how many edges a planar graph can have, which matters for circuit boards and maps.
O: Apply Euler's formula V − E + F = 2
O: Use edge bounds to show graphs are non-planar
T: Planar graph | A graph that can be drawn without edge crossings
T: Face | A region bounded by edges in a planar drawing, including the outer region
H: Euler's formula
- For a connected planar drawing: V − E + F = 2.
- Cube: 8 − 12 + 6 = 2; tetrahedron: 4 − 6 + 4 = 2.
- With c components: V − E + F = 1 + c.
H: Edge bounds
- Simple planar graphs with V ≥ 3 have E ≤ 3V − 6 (each face has at least 3 edges).
- If also triangle-free (for example bipartite): E ≤ 2V − 4.
- K₅ has 10 > 9 = 3 × 5 − 6, so it isn't planar.
H: Consequences
- Every planar graph has a vertex of degree at most 5.
- Map colouring: planar graphs are 4-colourable (later in this school).
- Platonic solids correspond to regular planar graphs: there are exactly five.
X: The cube graph has 8 vertices and 12 edges. How many faces does a planar drawing have?
> V − E + F = 2
> 8 − 12 + F = 2
> F = 6, matching the six faces of a cube
- Example: K₄ is planar (draw one vertex inside a triangle), but K₅ isn't.
- Every planar graph has a drawing with straight edges (Fáry's theorem).
K: V − E + F = 2 for connected planar graphs; E ≤ 3V − 6 (or 2V − 4 without triangles); these bounds prove non-planarity.
!: Forgetting to count the outer face.
Q: What is V − E + F for a connected planar graph? | 2.
Q: What is the maximum number of edges in a simple planar graph on 10 vertices? | 24.
SUM: Planar graphs draw without crossings.
SUM: Euler's formula constrains them.
SRC: Wilson RJ, Introduction to Graph Theory (5th edn, Pearson 2010) | textbook | 2010 | https://www.pearson.com/
SRC: Richeson DS, Euler's Gem: The Polyhedron Formula and the Birth of Topology (Princeton University Press 2008) | textbook | 2008 | https://press.princeton.edu/
NUM1#maths-u15-13-q1@1: A connected planar graph has 10 vertices and 15 edges. How many faces does it have? | 7 | 0 |  | F = 2 − V + E = 2 − 10 + 15 = 7.
M1#maths-u15-13-q2@1: Which bound proves K₅ is non-planar? | E ≤ 3V − 6, since 10 > 9 | E ≤ 2V − 4, since 10 > 6 | V ≤ E, since 5 ≤ 10 | F ≤ V | It's planar | K₅ has more edges than any simple planar graph on 5 vertices allows.
M3#maths-u15-13-q3@2: Why must every simple planar graph have a vertex of degree at most 5? | If all degrees were ≥ 6, then 2E ≥ 6V, contradicting E ≤ 3V − 6 | Planar graphs have no cycles | All planar graphs are trees | Degrees are always odd | Every planar drawing has a corner vertex touching the outer face | Summing degrees gives 2E ≥ 6V > 2(3V − 6).

## Planarity
S: Planarity testing decides whether a graph can be drawn without crossings, and if not, why not. Kuratowski's theorem pins the obstruction to two small graphs, and linear-time algorithms test planarity for circuits with millions of components.
O: State Kuratowski's and Wagner's theorems
O: Show K_{3,3} is non-planar and describe crossing numbers
T: Kuratowski's theorem | A graph is planar iff it contains no subdivision of K₅ or K_{3,3}
T: Crossing number | cr(G), the minimum number of edge crossings in any drawing of G
H: Obstructions
- K₅ and K_{3,3} are the minimal non-planar graphs.
- Subdivisions (inserting vertices on edges) don't change planarity.
- Wagner's version uses minors (deleting and contracting edges).
- The "three utilities" puzzle asks for a planar drawing of K_{3,3}: impossible.
H: K_{3,3}
- It's bipartite, so it has no triangles, so a planar drawing would need E ≤ 2V − 4 = 8.
- It has 9 edges, so it isn't planar.
H: Algorithms and crossings
- Hopcroft and Tarjan (1974) gave a linear-time planarity test.
- cr(K₅) = 1 and cr(K₆) = 3; crossing numbers of complete graphs are still not fully known.
- Circuit board and chip layout minimise crossings and layers.
X: Use the bipartite edge bound to show K_{3,3} is non-planar.
> V = 6, E = 9, and K_{3,3} has no triangles
> A planar triangle-free graph satisfies E ≤ 2V − 4 = 8
> 9 > 8, so K_{3,3} can't be planar
K: Planar iff no subdivision of K₅ or K_{3,3} (Kuratowski); minors in Wagner's version; linear-time tests exist; crossing numbers measure how non-planar a graph is.
!: Thinking a drawing with crossings proves non-planarity (another drawing might avoid them).
Q: Which two graphs are the minimal non-planar ones? | K₅ and K_{3,3}.
Q: What is the crossing number of K₅? | 1.
SUM: Planarity has two small obstructions.
SUM: It can be tested in linear time.
SRC: Kuratowski K, Sur le problème des courbes gauches en topologie, Fundamenta Mathematicae 15, 271 | journal | 1930 | https://doi.org/10.4064/fm-15-1-271-283
SRC: Hopcroft J, Tarjan R, Efficient planarity testing, Journal of the ACM 21(4), 549 | journal | 1974 | https://doi.org/10.1145/321850.321852
NUM1#maths-u15-14-q1@1: What is the maximum number of edges in a triangle-free planar graph on 6 vertices? | 8 | 0 |  | 2V − 4 = 8.
M1#maths-u15-14-q2@1: Which puzzle asks for a planar drawing of K_{3,3}? | Connecting three houses to three utilities without crossings | The Königsberg bridges | The four colour problem | The travelling salesperson | The knight's tour | Houses and utilities form the two parts of K_{3,3}.
M2#maths-u15-14-q3@2: Does subdividing an edge (adding a vertex on it) change planarity? | No: it doesn't affect whether crossings are needed | Yes: it always makes a graph planar | Yes: it always makes a graph non-planar | Only for trees | Only for K₅ | A subdivided edge can be drawn along the original edge's curve.

## Eulerian Paths
S: An Eulerian path uses every edge of a graph exactly once. Euler's 1736 analysis of the bridges of Königsberg showed exactly when such routes exist, founding graph theory and solving route-planning problems for postal and gritting services.
O: Decide whether a graph has an Eulerian circuit or path
O: Find Eulerian routes and solve the route inspection problem
T: Eulerian circuit | A closed trail using every edge exactly once
T: Route inspection (Chinese postman) problem | Find the shortest closed walk covering every edge at least once
H: Euler's theorem
- A connected graph has an Eulerian circuit iff every vertex has even degree.
- It has an Eulerian path (not closed) iff exactly two vertices have odd degree; the path runs between them.
- Königsberg's four land masses had degrees 5, 3, 3, 3: four odd vertices, so no route.
H: Finding routes
- Hierholzer's algorithm: follow edges until stuck, then splice in further cycles.
- Fleury's algorithm: avoid crossing bridges unless forced.
H: Route inspection
- With odd vertices, some edges must be repeated.
- Pair up the odd vertices to minimise the extra distance (shortest paths between them).
- Used for postal routes, street cleaning, snow ploughing and inspecting pipelines.
X: A graph has vertices with degrees 4, 3, 2, 3, 2. Does it have an Eulerian circuit or path?
> Two vertices have odd degree (the two 3s)
> So there's no circuit, but there is an Eulerian path (if connected)
> It must start at one odd vertex and end at the other
K: Eulerian circuit ⇔ connected and all degrees even; path ⇔ exactly two odd vertices; Hierholzer finds them; route inspection repeats the cheapest pairings of odd vertices.
!: Confusing Eulerian (every edge once) with Hamiltonian (every vertex once).
Q: Why was the Königsberg walk impossible? | All four land masses had odd degree.
Q: Where must an Eulerian path start? | At one of the two odd-degree vertices.
SUM: Eulerian routes use every edge once.
SUM: Degree parity decides existence.
SRC: Euler L, Solutio problematis ad geometriam situs pertinentis, Commentarii Academiae Scientiarum Petropolitanae 8, 128 | journal | 1736 | https://scholarlycommons.pacific.edu/euler-works/53/
SRC: Department for Education, AS and A level further mathematics subject content: decision mathematics | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u15-15-q1@1: How many odd-degree vertices did the Königsberg bridges graph have? | 4 | 0 |  | Degrees 5, 3, 3, 3 are all odd.
M1#maths-u15-15-q2@1: Which graph has an Eulerian circuit? | The cycle C₇ | The path P₄ | K₄ | A star with 3 leaves | K_{1,3} | Every vertex of a cycle has degree 2, which is even.
M2#maths-u15-15-q3@2: A network has odd vertices A, B, C, D with shortest distances AB = 5, CD = 4, AC = 3, BD = 7, AD = 8, BC = 6. Which pairing minimises repeated distance? | AB with CD, total 9 | AC with BD, total 10 | AD with BC, total 14 | AB alone, total 5 | No pairing is needed | Compare totals: 9, 10 and 14; the smallest is 9.

## Hamiltonian Paths
S: A Hamiltonian path visits every vertex exactly once. Unlike Eulerian paths, there's no simple test for them: deciding whether one exists is NP-complete, and it underlies the travelling salesperson problem.
O: Recognise Hamiltonian paths and cycles and apply sufficient conditions
O: Relate Hamiltonian cycles to the travelling salesperson problem
T: Hamiltonian cycle | A cycle passing through every vertex exactly once
T: Dirac's theorem | If every vertex of a graph on n ≥ 3 vertices has degree ≥ n/2, it has a Hamiltonian cycle
H: Existence
- No simple characterisation; the decision problem is NP-complete.
- Sufficient conditions: Dirac's theorem; Ore's theorem (deg u + deg v ≥ n for non-adjacent u, v).
- Necessary conditions help disprove: removing k vertices mustn't leave more than k components.
H: Examples
- Kₙ has (n − 1)!/2 distinct Hamiltonian cycles.
- The Petersen graph has none; the cube does.
- Knight's tours are Hamiltonian paths on the knight's-move graph.
H: Travelling salesperson problem
- Find the cheapest Hamiltonian cycle in a weighted complete graph.
- Exact methods (branch and bound) handle thousands of cities; heuristics handle millions.
- Lower bounds come from spanning trees; upper bounds from nearest-neighbour tours.
X: How many distinct Hamiltonian cycles does K₅ have?
> Fix the starting vertex: (5 − 1)! = 24 orderings of the rest
> Each cycle is counted twice (once in each direction)
> 24/2 = 12 distinct Hamiltonian cycles
K: Hamiltonian = every vertex once; existence is NP-complete; Dirac and Ore give sufficient conditions; TSP seeks the cheapest Hamiltonian cycle.
!: Thinking a degree-parity test (like Euler's) decides Hamiltonicity.
Q: Does the Petersen graph have a Hamiltonian cycle? | No.
Q: How many Hamiltonian cycles does K₄ have? | 3.
SUM: Hamiltonian paths visit each vertex once.
SUM: No easy test exists.
SRC: Applegate DL, Bixby RE, Chvátal V, Cook WJ, The Traveling Salesman Problem: A Computational Study (Princeton University Press 2006) | textbook | 2006 | https://press.princeton.edu/
SRC: Dirac GA, Some theorems on abstract graphs, Proceedings of the London Mathematical Society s3-2(1), 69 | journal | 1952 | https://doi.org/10.1112/plms/s3-2.1.69
NUM1#maths-u15-16-q1@1: How many distinct Hamiltonian cycles does K₆ have? | 60 | 0 |  | (6 − 1)!/2 = 120/2 = 60.
M1#maths-u15-16-q2@1: Which condition guarantees a Hamiltonian cycle on n ≥ 3 vertices? | Every vertex has degree at least n/2 | Every vertex has even degree | The graph is connected | The graph is planar | The graph is bipartite | Dirac's theorem: minimum degree at least n/2 (with n ≥ 3) forces a Hamiltonian cycle.
M2#maths-u15-16-q3@2: Why is the travelling salesperson problem hard for large n? | The number of possible tours grows like (n − 1)!/2 and no efficient exact algorithm is known | Distances are always unknown | It has no solution | Distances between cities are usually unknown in advance | It needs negative weights | Factorial growth defeats brute force, and the problem is NP-hard.

## Graph Colouring
S: Graph colouring assigns colours to vertices so that adjacent vertices differ. The fewest colours needed, the chromatic number, models scheduling exams, assigning radio frequencies and allocating computer registers, and the four colour theorem says every map needs at most four.
O: Find chromatic numbers of standard graphs
O: Apply colouring to scheduling problems
T: Proper colouring | An assignment of colours with no two adjacent vertices the same
T: Chromatic number | χ(G), the fewest colours in a proper colouring
H: Values and bounds
- χ(Kₙ) = n; χ = 2 for bipartite graphs with an edge; odd cycles need 3.
- Greedy colouring uses at most Δ + 1 colours (Δ = maximum degree).
- Brooks' theorem: χ ≤ Δ unless the graph is complete or an odd cycle.
- Computing χ is NP-hard in general.
H: The four colour theorem
- Every planar graph can be properly coloured with 4 colours.
- Proved by Appel and Haken (1976) with heavy computer use; later simplified and formally verified (2005).
- Maps become planar graphs: regions as vertices, shared borders as edges.
H: Applications
- Exam timetabling: courses as vertices, shared students as edges, time slots as colours.
- Frequency assignment, register allocation in compilers, Sudoku.
X: Five courses conflict as a cycle A–B–C–D–E–A (each shares students with its neighbours). How many exam slots are needed?
> The conflict graph is C₅, an odd cycle
> Two colours can't work (an odd cycle isn't bipartite)
> Three slots suffice: A, C in slot 1; B, D in slot 2; E in slot 3
K: χ(G) is the fewest colours; complete graphs need n, bipartite 2, odd cycles 3; greedy gives ≤ Δ + 1; planar graphs need ≤ 4; colouring schedules conflicts.
!: Assuming greedy colouring always finds the chromatic number (it depends on the order).
Q: What is χ(K₇)? | 7.
Q: What is the chromatic number of a tree with at least one edge? | 2.
SUM: Colouring separates conflicting items.
SUM: Four colours suffice for maps.
SRC: Appel K, Haken W, Every planar map is four colorable, Illinois Journal of Mathematics 21(3), 429 | journal | 1977 | https://doi.org/10.1215/ijm/1256049011
SRC: Jensen TR, Toft B, Graph Coloring Problems (Wiley 1995) | textbook | 1995 | https://www.wiley.com/
NUM1#maths-u15-17-q1@1: What is the chromatic number of the cycle C₉? | 3 | 0 |  | Odd cycles need three colours.
M1#maths-u15-17-q2@1: Which graph needs exactly 2 colours? | An even cycle | A triangle | K₄ | C₅ | The Petersen graph | An even cycle is bipartite, so alternating two colours round it works.
M3#maths-u15-17-q3@2: Greedy colouring of a graph with maximum degree 5 uses at most how many colours? | 6 | 5 | 4 | 10 | It's unbounded | Each vertex has at most 5 coloured neighbours, so one of 6 colours is always free.

## Chromatic Polynomials
S: The chromatic polynomial P(G, k) counts the proper colourings of a graph using k colours. It's always a polynomial in k, it gives the chromatic number as its smallest positive integer non-root, and deletion–contraction computes it.
O: Compute chromatic polynomials of trees, cycles and complete graphs
O: Use deletion–contraction
T: Chromatic polynomial | P(G, k), the number of proper colourings of G with at most k colours
T: Deletion–contraction | P(G, k) = P(G − e, k) − P(G/e, k) for an edge e
H: Standard formulas
- Kₙ: k(k − 1)(k − 2)…(k − n + 1).
- Any tree on n vertices: k(k − 1)^{n−1}.
- Cycle Cₙ: (k − 1)ⁿ + (−1)ⁿ(k − 1).
- Empty graph on n vertices: kⁿ.
H: Properties
- Degree n, leading coefficient 1, coefficient of k^{n−1} is −|E|.
- Coefficients alternate in sign.
- χ(G) is the smallest positive integer k with P(G, k) > 0.
H: History
- Introduced by Birkhoff (1912) to attack the four colour problem.
- Generalised by the Tutte polynomial, which also counts spanning trees and more.
X: Count proper 3-colourings of the path with 3 vertices and of the cycle C₄.
> Path (a tree, n = 3): 3 × 2 × 2 = 12
> C₄: (3 − 1)^{4} + (3 − 1) = 16 + 2 = 18
> Check C₄ with 2 colours: 1 + 1 = 2 (the two alternating colourings)
- Example: P(C₃, 3) = 2^{3} − 2 = 6, matching 3! ways to colour a triangle.
K: P(G, k) counts k-colourings; trees give k(k − 1)^{n−1}, cycles (k − 1)ⁿ + (−1)ⁿ(k − 1), Kₙ the falling factorial; deletion–contraction computes it.
!: Using the tree formula for a graph that contains a cycle.
Q: What is P(K₃, k)? | k(k − 1)(k − 2).
Q: What is the coefficient of k^{n−1} in P(G, k)? | −|E|.
SUM: Chromatic polynomials count colourings.
SUM: They encode the chromatic number.
SRC: Dong FM, Koh KM, Teo KL, Chromatic Polynomials and Chromaticity of Graphs (World Scientific 2005) | textbook | 2005 | https://www.worldscientific.com/
SRC: Birkhoff GD, A determinant formula for the number of ways of coloring a map, Annals of Mathematics 14(1), 42 | journal | 1912 | https://doi.org/10.2307/1967597
NUM1#maths-u15-18-q1@1: How many proper 3-colourings does C₄ have? | 18 | 0 |  | (3 − 1)^{4} + (3 − 1) = 18.
M1#maths-u15-18-q2@1: What is P(G, k) for a tree on 4 vertices? | k(k − 1)^{3} | k^{4} | k(k − 1)(k − 2)(k − 3) | (k − 1)^{4} | k^{3} | Colour one vertex in k ways, then each further vertex avoids its parent's colour.
M2#maths-u15-18-q3@2: P(G, 2) = 0 but P(G, 3) = 6. What is χ(G)? | 3 | 2 | 6 | 1 | 0 | The chromatic number is the smallest k with at least one proper colouring.

## Matching Theory
S: A matching pairs up vertices along edges with no vertex used twice: workers with jobs, students with places, donors with recipients. Hall's theorem says when everyone can be matched, and the Gale–Shapley algorithm finds stable matchings.
O: Apply Hall's marriage theorem
O: Run and interpret the Gale–Shapley stable matching algorithm
T: Matching | A set of edges with no shared vertices; perfect if every vertex is matched
T: Hall's condition | In a bipartite graph with parts X and Y, every subset S of X has at least |S| neighbours in Y
H: Hall's theorem
- X can be fully matched into Y iff Hall's condition holds for every S ⊆ X.
- Failing sets are easy certificates of impossibility.
- K_{n,n} has n! perfect matchings.
H: Stable matching
- Each side ranks the other; a matching is unstable if a pair would both prefer each other to their partners.
- Gale–Shapley (1962): proposers propose in order; receivers hold their best offer; repeat until stable.
- It always finds a stable matching, optimal for the proposing side.
- Used for UK junior doctor allocation, US medical residency and school choice; Roth and Shapley won the 2012 Nobel prize in economics.
H: Algorithms
- Augmenting paths find maximum matchings (Hopcroft–Karp for bipartite graphs).
- Edmonds' blossom algorithm handles general graphs.
X: Applicants A and B both accept only job 1; C accepts jobs 1, 2 and 3. Can every applicant get a job?
> Take S = {A, B}: its neighbourhood is {1}, of size 1 < 2
> Hall's condition fails
> So no matching gives every applicant a job
K: Hall's condition decides full matchings; failing sets prove impossibility; Gale–Shapley finds stable matchings optimal for proposers; augmenting paths find maximum matchings.
!: Checking Hall's condition only for single vertices rather than all subsets.
Q: How many perfect matchings does K_{4,4} have? | 24.
Q: Which side does Gale–Shapley favour? | The proposing side.
SUM: Matchings pair vertices along edges.
SUM: Hall and Gale–Shapley are the key results.
SRC: Gale D, Shapley LS, College admissions and the stability of marriage, American Mathematical Monthly 69(1), 9 | journal | 1962 | https://doi.org/10.2307/2312726
SRC: Lovász L, Plummer MD, Matching Theory (North-Holland 1986) | textbook | 1986 | https://bookstore.ams.org/
NUM1#maths-u15-19-q1@1: How many perfect matchings does K_{3,3} have? | 6 | 0 |  | Each perfect matching is a permutation: 3! = 6.
M1#maths-u15-19-q2@1: Which fact certifies that no full matching of X exists? | A subset of X with fewer neighbours than members | A vertex of degree 1 | An even number of edges | A cycle in the graph | X and Y having equal sizes | A subset of X with fewer neighbours than members violates Hall's condition.
M3#maths-u15-19-q3@2: Why is a Gale–Shapley matching stable? | Any pair preferring each other would already have matched when the proposer proposed | Everyone gets their first choice | Everyone is guaranteed their first choice by the end | Receivers can't refuse offers | It isn't always stable | A proposer only moves down their list after rejection, and receivers only trade up.

## Matching and Vertex Covers
S: A vertex cover is a set of vertices touching every edge, such as security cameras covering every corridor. In bipartite graphs the largest matching and the smallest vertex cover have the same size (Kőnig's theorem), a beautiful example of duality.
O: Find maximum matchings and minimum vertex covers in small graphs
O: Apply Kőnig's theorem and its bounds
T: Vertex cover | A set of vertices such that every edge has at least one end in it
T: Kőnig's theorem | In a bipartite graph, the size of a maximum matching equals the size of a minimum vertex cover
H: Relationships
- Any vertex cover must contain an endpoint of each matching edge, so cover ≥ matching.
- In any graph: maximum matching ≤ minimum cover ≤ 2 × maximum matching.
- Taking both ends of a maximal matching gives a cover at most twice optimal (a 2-approximation).
H: Bipartite duality
- Kőnig: equality holds in bipartite graphs.
- It's a special case of linear programming duality and max-flow min-cut.
- Both can be computed in polynomial time.
H: General graphs
- Minimum vertex cover is NP-hard in general graphs.
- Independent sets are complements of vertex covers.
- Applications: placing monitors in networks, removing conflicts, drug interaction checks.
X: Find the maximum matching and minimum vertex cover for the star K_{1,5} and the path P₄ (a–b–c–d).
> Star: any matching uses the centre, so the maximum is 1; the centre alone covers every edge: cover 1
> P₄: matching {ab, cd} has size 2; cover {b, c} has size 2
> Both are bipartite, so the sizes agree, as Kőnig predicts
K: Covers touch every edge; matching ≤ cover ≤ 2 × matching; in bipartite graphs they're equal (Kőnig); vertex cover is NP-hard in general.
!: Assuming Kőnig's equality holds in non-bipartite graphs (it fails for the triangle).
Q: What are the maximum matching and minimum cover sizes for a triangle? | 1 and 2.
Q: What is the complement of a vertex cover? | An independent set.
SUM: Covers and matchings are dual.
SUM: They're equal in bipartite graphs.
SRC: Lovász L, Plummer MD, Matching Theory (North-Holland 1986) | textbook | 1986 | https://bookstore.ams.org/
SRC: Schrijver A, Combinatorial Optimization: Polyhedra and Efficiency (Springer 2003) | textbook | 2003 | https://link.springer.com/
NUM1#maths-u15-20-q1@1: What is the size of a maximum matching in C₆? | 3 | 0 |  | Alternate edges match all 6 vertices in 3 pairs.
M1#maths-u15-20-q2@1: In any graph, how does the minimum vertex cover compare with the maximum matching? | It's at least as large | It's always smaller | They're always equal | It's always double | They're unrelated | Each matching edge needs its own cover vertex.
M2#maths-u15-20-q3@2: For which graph does the maximum matching differ from the minimum vertex cover? | A triangle | A path on 4 vertices | A star | An even cycle | K_{2,3} | The triangle isn't bipartite: matching 1, cover 2.

## Shortest Path Algorithms
S: Shortest path algorithms find the cheapest routes through weighted graphs. Breadth-first search, Dijkstra's algorithm, Bellman–Ford and Floyd–Warshall each suit different conditions, and they run inside every sat-nav and network router.
O: Run Dijkstra's algorithm on a small graph
O: Choose the right shortest path algorithm for the weights and question
T: Dijkstra's algorithm | Repeatedly finalise the unvisited vertex with the smallest tentative distance and update its neighbours (non-negative weights)
T: Relaxation | Updating d(v) to d(u) + w(u, v) if that's smaller
H: The algorithms
- Breadth-first search: unweighted graphs, O(V + E).
- Dijkstra: non-negative weights, O((V + E) log V) with a heap.
- Bellman–Ford: allows negative weights and detects negative cycles, O(VE).
- Floyd–Warshall: all pairs, O(V^{3}).
H: Dijkstra in practice
- Start with d(source) = 0 and all others ∞.
- Each step fixes one vertex permanently.
- Record predecessors to reconstruct the route.
H: Speed-ups
- A* search adds a heuristic (such as straight-line distance) to guide the search.
- Road networks use preprocessing (contraction hierarchies) to answer queries in milliseconds.
X: Edges: A–B 4, A–C 2, C–B 1, B–D 5, C–D 8. Find shortest distances from A.
> Fix A = 0; update B = 4, C = 2
> Fix C (2); update B = min(4, 2 + 1) = 3 and D = 2 + 8 = 10
> Fix B (3); update D = min(10, 3 + 5) = 8; fix D: distances C = 2, B = 3, D = 8
K: BFS for unweighted, Dijkstra for non-negative weights, Bellman–Ford for negative weights, Floyd–Warshall for all pairs; relaxation is the core step.
!: Using Dijkstra's algorithm with negative edge weights.
Q: Which algorithm detects negative cycles? | Bellman–Ford.
Q: What is the time complexity of Floyd–Warshall? | O(V^{3}).
SUM: Different algorithms suit different weights.
SUM: Relaxation drives them all.
SRC: Dijkstra EW, A note on two problems in connexion with graphs, Numerische Mathematik 1, 269 | journal | 1959 | https://doi.org/10.1007/BF01386390
SRC: Cormen TH, Leiserson CE, Rivest RL, Stein C, Introduction to Algorithms (4th edn, MIT Press 2022) | textbook | 2022 | https://mitpress.mit.edu/
NUM1#maths-u15-21-q1@1: In the example, what is the shortest distance from A to D? | 8 | 0 |  | A → C → B → D: 2 + 1 + 5 = 8.
M1#maths-u15-21-q2@1: Which algorithm is best for shortest paths in an unweighted graph? | Breadth-first search | Floyd–Warshall | Bellman–Ford | Kruskal's algorithm | Depth-first search | BFS explores in order of number of edges, which is the distance.
M2#maths-u15-21-q3@2: Why does Dijkstra's algorithm fail with negative weights? | A finalised vertex could later be reached more cheaply via a negative edge | It can't handle directed graphs | It needs integer weights | It only works on trees | It can only process edges with whole-number weights | Dijkstra assumes distances never decrease after a vertex is fixed.

## Shortest Path Problems
S: Shortest path problems come in many forms: one source or all pairs, fastest or cheapest, with constraints or alternatives. Modelling a real question as the right shortest path problem is often the hard part, from routing internet traffic to detecting currency arbitrage.
O: Model real problems as shortest path problems
O: Recognise variants and transformations such as log weights
T: Single-source problem | Shortest paths from one vertex to all others
T: Negative cycle | A cycle whose total weight is negative, making some shortest paths undefined
H: Variants
- Single-source, single-pair, all-pairs.
- k shortest paths (alternatives), constrained paths (time and cost limits).
- Bottleneck paths: maximise the smallest capacity along the route.
H: Modelling tricks
- Products become sums with logs: maximise reliability Π p_{i} by minimising Σ −ln p_{i}.
- Currency arbitrage: rates multiply round a cycle; −ln(rate) weights turn a profitable cycle into a negative cycle.
- Time-dependent networks (rush-hour travel) need special algorithms.
H: Applications
- Internet routing: OSPF runs Dijkstra; BGP uses path vectors.
- Sat-nav, logistics and public transport journey planners.
- Sequence alignment in bioinformatics as shortest paths in grids.
X: Exchanging £ → $ at 1.4, $ → € at 0.9 and € → £ at 0.8. Is there an arbitrage?
> Multiply round the cycle: 1.4 × 0.9 × 0.8 = 1.008
> More than 1: a 0.8% profit per loop
> With weights −ln(rate), the cycle's total weight is −ln 1.008 < 0: a negative cycle
K: Choose single-source, all-pairs or constrained variants; logs turn products into sums; arbitrage is a negative cycle; routing, transport and bioinformatics rely on shortest paths.
!: Modelling a reliability (product) problem by adding probabilities.
Q: Which internet routing protocol runs Dijkstra's algorithm? | OSPF.
Q: How do you maximise a product of probabilities along a path? | Minimise the sum of −ln of each probability.
SUM: Real problems hide shortest path structure.
SUM: Log weights handle products.
SRC: Ahuja RK, Magnanti TL, Orlin JB, Network Flows: Theory, Algorithms, and Applications (Prentice Hall 1993) | textbook | 1993 | https://www.pearson.com/
SRC: Moy J, OSPF Version 2, RFC 2328 | standard | 1998 | https://www.rfc-editor.org/rfc/rfc2328
NUM1#maths-u15-22-q1@1: Find the product of the exchange rates 1.4, 0.9 and 0.8, to 3 decimal places. | 1.008 | 0.001 |  | 1.4 × 0.9 = 1.26, and 1.26 × 0.8 = 1.008.
M1#maths-u15-22-q2@1: Which problem asks for shortest distances between every pair of vertices? | The all-pairs shortest path problem | The single-pair problem | The minimum spanning tree problem | The maximum flow problem | The route inspection problem | All pairs: Floyd–Warshall or repeated Dijkstra.
M2#maths-u15-22-q3@2: A route's reliability is the product of link reliabilities. How do you find the most reliable route with a shortest path algorithm? | Use weights −ln(reliability) and find the shortest path | Add the reliabilities | Use the largest single link | Multiply weights in Dijkstra directly | It can't be done | Logs turn products into sums and maximisation into minimisation.

## Minimum Spanning Trees
S: A minimum spanning tree connects all vertices of a weighted graph at the least total cost. Kruskal's and Prim's greedy algorithms find it, and it's used to design cable, pipe and road networks and in clustering.
O: Apply Kruskal's and Prim's algorithms
O: Explain why greedy choices give an optimal tree
T: Minimum spanning tree (MST) | A spanning tree of least total edge weight
T: Cut property | For any cut, the lightest edge crossing it belongs to some MST
H: Kruskal's algorithm
- Sort edges by weight; add each edge unless it creates a cycle.
- Stop after n − 1 edges.
- Union–find detects cycles efficiently.
H: Prim's algorithm
- Start from any vertex; repeatedly add the cheapest edge leaving the tree.
- Works well with a priority queue, or on a distance matrix by hand.
H: Properties and uses
- With distinct weights, the MST is unique.
- Greedy works because of the cut property (a matroid structure).
- Uses: network design, approximation for TSP (within a factor of 2 via doubling the tree), single-linkage clustering.
X: Edges: AB 1, AC 2, BC 3, CD 4, BD 5. Find the MST with Kruskal's algorithm.
> Add AB (1), then AC (2)
> BC (3) would make a cycle A–B–C: skip; add CD (4)
> MST {AB, AC, CD}, total weight 7
- Example: linking villages with cable at least cost is an MST problem.
K: Kruskal adds cheapest non-cycle edges; Prim grows from a vertex; the cut property makes greed optimal; MSTs design networks and help approximate TSP.
!: Adding an edge that creates a cycle in Kruskal's algorithm.
Q: How many edges does an MST of a 9-vertex connected graph have? | 8.
Q: When is the MST unique? | When all edge weights are distinct.
SUM: MSTs connect everything at least cost.
SUM: Greedy algorithms find them.
SRC: Kruskal JB, On the shortest spanning subtree of a graph and the traveling salesman problem, Proceedings of the American Mathematical Society 7(1), 48 | journal | 1956 | https://doi.org/10.1090/S0002-9939-1956-0078686-7
SRC: Department for Education, AS and A level further mathematics subject content: decision mathematics | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u15-23-q1@1: In the example, find the total weight of the minimum spanning tree. | 7 | 0 |  | 1 + 2 + 4 = 7.
M1#maths-u15-23-q2@1: What does Prim's algorithm add at each step? | The cheapest edge connecting the tree to a new vertex | The cheapest edge anywhere in the graph | The most expensive edge | An edge creating a cycle | A random edge | Prim grows one tree, always by its lightest outgoing edge.
M3#maths-u15-23-q3@2: Why does doubling an MST give a TSP tour at most twice optimal (for metric distances)? | Any tour minus one edge is a spanning tree, so MST ≤ optimal tour, and shortcutting the doubled tree doesn't increase length | MSTs are always tours | Doubling halves the length | TSP and MST are the same problem | It doesn't | The doubled tree costs ≤ 2 × optimum, and the triangle inequality lets repeated vertices be skipped.

## Network Flows
S: A flow network moves something (water, traffic, data, goods) from a source to a sink through edges with capacities. Flow models answer how much can get through, where the bottlenecks are, and how to route at least cost.
O: Describe flow networks and check feasibility of a flow
O: Model practical problems as flow problems
T: Flow | An assignment f(e) with 0 ≤ f(e) ≤ capacity c(e) and flow in = flow out at every vertex except the source and sink
T: Value of a flow | The net flow out of the source (equal to the net flow into the sink)
H: Rules
- Capacity constraint: no edge carries more than its capacity.
- Conservation: what enters an intermediate vertex leaves it.
- The value is what reaches the sink.
H: Modelling
- Multiple sources or sinks: add a super-source and super-sink.
- Vertex capacities: split each vertex into an in-node and out-node joined by an edge.
- Bipartite matching: unit capacities from source to X, X to Y, Y to sink.
H: Variants
- Maximum flow and minimum cut (next lessons).
- Minimum cost flow: meet demand at least cost (transport and supply chains).
- Multicommodity flows for different goods or data streams.
X: Two routes from s to t: s–a–t with capacities 3 and 4, and s–b–t with capacities 6 and 5. What is the most that can flow?
> Route via a is limited by its bottleneck: min(3, 4) = 3
> Route via b: min(6, 5) = 5
> The routes are separate, so the maximum flow is 3 + 5 = 8
K: Flows respect capacities and conservation; value is net outflow from the source; super-sources, split vertices and unit capacities model many problems.
!: Letting flow into an intermediate vertex differ from flow out.
Q: What does flow conservation require? | Flow in equals flow out at every vertex except source and sink.
Q: How do you model several sources? | Add a super-source joined to each of them.
SUM: Flow networks model movement with limits.
SUM: Many problems reduce to flows.
SRC: Ahuja RK, Magnanti TL, Orlin JB, Network Flows: Theory, Algorithms, and Applications (Prentice Hall 1993) | textbook | 1993 | https://www.pearson.com/
SRC: Department for Education, AS and A level further mathematics subject content: decision mathematics | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u15-24-q1@1: A path s–x–y–t has capacities 7, 4 and 9. How much can flow along it? | 4 | 0 |  | The bottleneck (smallest capacity) is 4.
M1#maths-u15-24-q2@1: Which flow is feasible on an edge of capacity 6? | 4 | 7 | −2 | 6.5 | 10 | Flow must lie between 0 and the capacity.
M2#maths-u15-24-q3@2: How is bipartite matching modelled as a flow? | Unit capacities from a source to one side, across allowed edges, and from the other side to a sink | By colouring the vertices | By finding shortest paths | By removing all edges | Give every edge infinite capacity and send flow both ways | Integer flows of value k correspond to matchings of size k.

## Maximum Flow
S: The maximum flow problem asks for the largest possible flow from source to sink. The Ford–Fulkerson method repeatedly finds augmenting paths in the residual network until none remain, and it solves problems from traffic planning to airline scheduling.
O: Find maximum flows with augmenting paths
O: Use residual networks, including backward edges
T: Augmenting path | A source-to-sink path in the residual network along which more flow can be pushed
T: Residual network | Edges showing remaining capacity forward and the option to cancel flow backward
H: Ford–Fulkerson
- Start with zero flow.
- Find an augmenting path; push its bottleneck amount; update residual capacities.
- Repeat until no augmenting path exists.
- Integer capacities give an integer maximum flow.
H: Backward edges
- Pushing flow "backwards" along an edge cancels earlier flow, rerouting it.
- Without them, greedy choices can get stuck below the maximum.
H: Efficiency
- Edmonds–Karp: always use a shortest augmenting path (BFS), O(VE^{2}).
- Push–relabel and newer algorithms are faster; a 2022 result reached almost-linear time.
- Applications: baseball elimination, image segmentation, scheduling.
X: Find the maximum flow with edges s→a 3, s→b 2, a→b 1, a→t 2, b→t 3.
> Push 2 along s–a–t; push 2 along s–b–t
> Residual: s→a has 1 left, a→b 1, b→t 1: push 1 along s–a–b–t
> Total 5; both edges out of s are full, so no more is possible
K: Augment along residual paths by their bottleneck; backward edges allow rerouting; stop when no path remains; Edmonds–Karp uses shortest paths.
!: Forgetting backward residual edges and getting stuck at a non-maximum flow.
Q: What does Ford–Fulkerson stop on? | No augmenting path remaining in the residual network.
Q: Are integer capacities guaranteed an integer maximum flow? | Yes.
SUM: Augmenting paths build maximum flows.
SUM: Residual networks allow rerouting.
SRC: Ford LR, Fulkerson DR, Maximal flow through a network, Canadian Journal of Mathematics 8, 399 | journal | 1956 | https://doi.org/10.4153/CJM-1956-045-5
SRC: Cormen TH, Leiserson CE, Rivest RL, Stein C, Introduction to Algorithms (4th edn, MIT Press 2022) | textbook | 2022 | https://mitpress.mit.edu/
NUM1#maths-u15-25-q1@1: In the example, what is the maximum flow? | 5 | 0 |  | 2 + 2 + 1 = 5, matching the capacity out of s.
M1#maths-u15-25-q2@1: What amount is pushed along an augmenting path? | Its smallest residual capacity | Its largest residual capacity | The total capacity of the graph | One unit always | The sink's degree | The bottleneck, the smallest residual capacity on the path, limits the extra flow.
M3#maths-u15-25-q3@2: Why are backward residual edges essential? | They let the algorithm cancel and reroute earlier flow to reach the true maximum | They double every capacity | Without them the residual network would contain cycles | They speed up BFS only | They aren't essential | Without them an early bad choice can block further augmentation.

## Minimum Cut
S: A cut splits a network into a side containing the source and a side containing the sink; its capacity is the total capacity of edges crossing from source side to sink side. The max-flow min-cut theorem says the largest flow equals the smallest cut, identifying a network's true bottleneck.
O: Calculate cut capacities and find a minimum cut
O: State and apply the max-flow min-cut theorem
T: s–t cut | A partition (S, T) of the vertices with s in S and t in T; capacity = sum of capacities of edges from S to T
T: Max-flow min-cut theorem | The maximum flow value equals the minimum cut capacity
H: Cuts
- Every flow must cross every cut, so any cut bounds the maximum flow.
- Only edges from S to T count in the capacity (not T to S).
- After Ford–Fulkerson, the vertices reachable from s in the residual network form a minimum cut.
H: Duality
- Max-flow min-cut is a case of linear programming duality.
- It implies Menger's theorem and Kőnig's theorem.
- A cut certifies that a flow is maximum.
H: Applications
- Network reliability: the weakest set of links.
- Image segmentation: separate foreground and background by a minimum cut.
- Project selection and open-pit mining as cut problems.
X: For the network s→a 3, s→b 2, a→b 1, a→t 2, b→t 3, find the capacities of the cuts S = {s} and S = {s, a}.
> S = {s}: edges s→a and s→b cross: 3 + 2 = 5
> S = {s, a}: edges s→b, a→b, a→t cross: 2 + 1 + 2 = 5
> Both equal the maximum flow 5, so both are minimum cuts
K: Cut capacity sums S-to-T edges; every cut bounds the flow; max flow = min cut; the residual-reachable set gives a minimum cut.
!: Including edges directed from T back to S in the cut capacity.
Q: What does a cut of capacity 12 tell you about the maximum flow? | It's at most 12.
Q: How do you find a minimum cut after Ford–Fulkerson? | Take the vertices reachable from s in the final residual network.
SUM: Cuts bound flows.
SUM: The smallest cut equals the largest flow.
SRC: Ford LR, Fulkerson DR, Maximal flow through a network, Canadian Journal of Mathematics 8, 399 | journal | 1956 | https://doi.org/10.4153/CJM-1956-045-5
SRC: Boykov Y, Kolmogorov V, An experimental comparison of min-cut/max-flow algorithms for energy minimization in vision, IEEE Transactions on Pattern Analysis and Machine Intelligence 26(9), 1124 | journal | 2004 | https://doi.org/10.1109/TPAMI.2004.60
NUM1#maths-u15-26-q1@1: A cut has edges from S to T with capacities 4, 7 and 2, and one edge from T to S with capacity 9. What is its capacity? | 13 | 0 |  | Only S-to-T edges count: 4 + 7 + 2 = 13.
M1#maths-u15-26-q2@1: What does the max-flow min-cut theorem state? | The maximum flow equals the minimum cut capacity | Every cut has the same capacity | The maximum flow is always zero | Flows and cuts are unrelated | The minimum cut is the source's degree | It's the central duality of network flows.
M2#maths-u15-26-q3@2: How does a minimum cut help in image segmentation? | It separates foreground from background at the lowest total boundary cost | It colours every pixel | It finds the brightest pixel | It compresses the image | Pixels are sorted by brightness and split at the median value | Pixels form a graph; a cheap cut follows strong edges between regions.

## Weighted Networks
S: Real networks have ties of different strengths: how often people call, how many passengers fly a route, how much two countries trade. Weighted network measures use those strengths rather than treating every link as equal.
O: Calculate node strength and weighted degree measures
O: Explain how weights change the analysis of real networks
T: Node strength | The sum of the weights of a node's edges
T: Thresholding | Keeping only edges above a chosen weight, which turns a weighted network into an unweighted one
H: Measures
- Strength s_{i} = Σ_{j} w_{ij} generalises degree.
- Weighted clustering and weighted shortest paths (with distance = 1/weight when weights are strengths).
- Strength often grows faster than degree: busy airports have both many and heavy routes.
H: Choices
- Are weights similarities (stronger = closer) or distances (larger = farther)? Convert carefully.
- Thresholding is simple but discards information and the result depends on the threshold.
- Normalise weights when comparing networks.
H: Examples
- Airline networks (passengers per route), trade networks (value of goods).
- Brain networks (strength of connections between regions).
- Communication networks (number of messages).
X: A node has edges with weights 5, 2, 8 and 1. Find its degree and strength, and its strength after removing edges below 3.
> Degree: 4 edges
> Strength: 5 + 2 + 8 + 1 = 16
> After thresholding at 3: edges 5 and 8 remain, degree 2, strength 13
K: Strength sums edge weights; decide whether weights are similarities or distances; thresholding simplifies but loses information.
!: Using strengths as distances in shortest path calculations without converting them.
Q: What does node strength generalise? | Degree.
Q: If weights measure tie strength, what is a natural distance? | 1/weight.
SUM: Weights capture tie strength.
SUM: Treat them as similarities or distances carefully.
SRC: Barrat A, Barthélemy M, Pastor-Satorras R, Vespignani A, The architecture of complex weighted networks, PNAS 101(11), 3747 | journal | 2004 | https://doi.org/10.1073/pnas.0400087101
SRC: Newman MEJ, Networks (2nd edn, Oxford University Press 2018) | textbook | 2018 | https://global.oup.com/
NUM1#maths-u15-27-q1@1: A node's edges have weights 3, 3, 4 and 10. What is its strength? | 20 | 0 |  | 3 + 3 + 4 + 10 = 20.
M1#maths-u15-27-q2@1: In a trade network, what does a node's strength represent? | Its total trade with all partners | Its number of partners | Its geographical size | Its population | Its distance from others | Summing trade values over links gives total trade.
M2#maths-u15-27-q3@2: Why can thresholding a weighted network mislead? | The results can change a lot with the chosen cut-off, and weak ties are discarded | It always keeps every edge | It makes weights negative | It adds edges | It never misleads | Arbitrary thresholds can create or destroy structure.

## Network Centrality
S: Centrality measures identify the most important nodes in a network, but "important" depends on the question: the most connected person, the best-placed broker, or the one closest to everyone. Different measures answer different questions.
O: Compare degree, closeness, betweenness and eigenvector centrality
O: Choose a centrality measure suited to a question
T: Centrality | A score ranking nodes by some notion of importance in a network
T: Normalised degree centrality | deg(v)/(n − 1), the fraction of other nodes v is directly linked to
H: Main measures
- Degree: number of direct links (popularity, exposure).
- Closeness: how near a node is to all others (speed of reaching everyone).
- Betweenness: how often a node lies on shortest paths (brokerage, control of flow).
- Eigenvector and PageRank: connections to well-connected nodes (influence).
H: Choosing
- Spreading information quickly: closeness.
- Controlling or interrupting flow: betweenness.
- Influence through prestige: eigenvector centrality.
- Rankings by different measures can disagree strongly.
H: Cautions
- Centrality reflects network position, not intrinsic importance.
- Missing data can change rankings.
- Large networks need efficient algorithms (Brandes for betweenness).
X: In a star network with a centre joined to 5 leaves, find each node's normalised degree centrality.
> n = 6, so divide degrees by 5
> Centre: degree 5, centrality 1
> Each leaf: degree 1, centrality 0.2
K: Degree, closeness, betweenness and eigenvector centralities capture different kinds of importance; choose by the question; rankings can disagree.
!: Assuming one centrality measure captures every kind of importance.
Q: Which centrality best identifies brokers between groups? | Betweenness.
Q: What is the normalised degree centrality of a node linked to every other node? | 1.
SUM: Centrality ranks node importance.
SUM: The right measure depends on the question.
SRC: Freeman LC, Centrality in social networks: conceptual clarification, Social Networks 1(3), 215 | journal | 1978 | https://doi.org/10.1016/0378-8733(78)90021-7
SRC: Newman MEJ, Networks (2nd edn, Oxford University Press 2018) | textbook | 2018 | https://global.oup.com/
NUM1#maths-u15-28-q1@1: In a 10-node network, a node has degree 3. What is its normalised degree centrality, to 4 decimal places? | 0.3333 | 0.0001 |  | 3/(10 − 1) = 1/3.
M1#maths-u15-28-q2@1: Which measure counts a node's direct links? | Degree centrality | Betweenness centrality | Closeness centrality | Eigenvector centrality | PageRank | Degree is simply the number of neighbours.
M2#maths-u15-28-q3@2: Why might a node with few links have high betweenness? | It bridges two otherwise separate groups | It has many neighbours | It's at the network's edge | Betweenness counts links | It can't | All paths between the groups pass through it.

## Betweenness Centrality
S: Betweenness centrality measures how often a node lies on the shortest paths between other nodes. High-betweenness nodes are brokers and bottlenecks: removing them can split a network or slow its flow.
O: Calculate betweenness for small graphs
O: Interpret betweenness in social, transport and communication networks
T: Betweenness centrality | B(v) = Σ_{s≠v≠t} σ_{st}(v)/σ_{st}, where σ_{st} counts shortest s–t paths and σ_{st}(v) those through v
T: Edge betweenness | The same idea for edges, used to find community boundaries
H: Calculating
- For each pair of other nodes, find the fraction of shortest paths passing through v; add them up.
- Brandes' algorithm computes all betweenness scores in O(VE) for unweighted graphs.
- Normalise by dividing by the number of pairs, (n − 1)(n − 2)/2 for undirected graphs.
H: Interpretation
- Brokers between communities (structural holes).
- Bottleneck stations or routers whose failure disrupts traffic.
- Gatekeepers controlling information flow.
H: Uses
- Girvan–Newman community detection removes high edge-betweenness edges.
- Identifying critical infrastructure.
- Targeted attacks on high-betweenness nodes fragment networks quickly.
X: In the path graph 1–2–3–4–5, find the betweenness of node 3.
> Pairs of other nodes whose (unique) shortest path passes through 3: (1, 4), (1, 5), (2, 4), (2, 5)
> Each contributes 1; pairs (1, 2) and (4, 5) don't use 3
> Betweenness of node 3 = 4
K: Betweenness sums the fraction of shortest paths through a node; Brandes computes it efficiently; high values mark brokers and bottlenecks.
!: Counting pairs that include the node itself.
Q: What is the betweenness of a leaf in a tree? | 0.
Q: Which algorithm computes betweenness efficiently? | Brandes' algorithm.
SUM: Betweenness finds brokers.
SUM: It reveals bottlenecks.
SRC: Freeman LC, A set of measures of centrality based on betweenness, Sociometry 40(1), 35 | journal | 1977 | https://doi.org/10.2307/3033543
SRC: Brandes U, A faster algorithm for betweenness centrality, Journal of Mathematical Sociology 25(2), 163 | journal | 2001 | https://doi.org/10.1080/0022250X.2001.9990249
NUM1#maths-u15-29-q1@1: What is the betweenness of the middle node of the path 1–2–3? | 1 | 0 |  | The only shortest path between 1 and 3 passes through 2.
M1#maths-u15-29-q2@1: In a star with 5 leaves, what is the centre's betweenness? | 10 | 5 | 0 | 25 | 1 | Every pair of the 5 leaves (C(5, 2) = 10) has its shortest path through the centre.
M2#maths-u15-29-q3@2: Why does the Girvan–Newman method remove high edge-betweenness edges? | Edges between communities carry many shortest paths, so removing them separates the groups | They're the heaviest edges | They have the most triangles | They're random | Those edges are the heaviest, so removing them lowers total weight | Inter-community bridges concentrate traffic.

## Closeness Centrality
S: Closeness centrality measures how near a node is to all others: the inverse of its average distance. Nodes with high closeness can spread information or reach resources fastest.
O: Calculate closeness and harmonic centrality
O: Handle disconnected networks with harmonic centrality
T: Closeness centrality | C(v) = (n − 1)/Σ_{u} d(v, u), the reciprocal of the average distance to other nodes
T: Harmonic centrality | H(v) = Σ_{u≠v} 1/d(v, u), which handles unreachable nodes (1/∞ = 0)
H: Calculating
- Find shortest distances from v to every other node (BFS for unweighted graphs).
- Sum them and take (n − 1)/sum.
- High closeness means short average distance.
H: Disconnected graphs
- Distances to unreachable nodes are infinite, making ordinary closeness zero.
- Harmonic centrality avoids this and is often preferred.
H: Uses and limits
- Locating facilities to minimise average travel.
- Identifying people who can spread news quickly.
- In large small-world networks, closeness values bunch together, so they discriminate less.
X: In the path 1–2–3–4–5, find the closeness of node 3 and of node 1.
> Node 3: distances 2, 1, 1, 2, sum 6: closeness 4/6 ≈ 0.667
> Node 1: distances 1, 2, 3, 4, sum 10: closeness 4/10 = 0.4
> The central node is closer to everyone
- Example: in a star, the centre has closeness 1 and each leaf (n − 1)/(2n − 3).
K: Closeness = (n − 1)/total distance; harmonic centrality sums 1/distance and copes with disconnection; it identifies nodes that reach others quickly.
!: Using ordinary closeness on a disconnected network.
Q: What is the closeness of the centre of a star with n − 1 leaves? | 1.
Q: Why use harmonic centrality? | It works when some nodes are unreachable.
SUM: Closeness rewards short distances.
SUM: Harmonic centrality handles disconnection.
SRC: Bavelas A, Communication patterns in task-oriented groups, Journal of the Acoustical Society of America 22(6), 725 | journal | 1950 | https://doi.org/10.1121/1.1906679
SRC: Boldi P, Vigna S, Axioms for centrality, Internet Mathematics 10(3–4), 222 | journal | 2014 | https://doi.org/10.1080/15427951.2013.865686
NUM1#maths-u15-30-q1@1: Find the closeness of node 3 in the path 1–2–3–4–5, to 3 decimal places. | 0.667 | 0.001 |  | 4/(2 + 1 + 1 + 2) = 4/6.
M1#maths-u15-30-q2@1: What is the harmonic centrality contribution of an unreachable node? | 0 | 1 | ∞ | −1 | Undefined | An unreachable node is at distance ∞, and 1/∞ = 0, so it adds nothing.
M2#maths-u15-30-q3@2: Why might closeness discriminate poorly in a large social network? | Average distances are short and similar for most nodes | Everyone has the same degree | Distances are infinite | It ignores edges | It discriminates well | Small-world structure compresses average distances into a narrow range.

## Eigenvector Centrality
S: Eigenvector centrality scores a node highly if it's linked to other high-scoring nodes: influence by association. It's the principal eigenvector of the adjacency matrix, and it's the idea behind PageRank and many prestige measures.
O: Define eigenvector centrality as an eigenvector of the adjacency matrix
O: Compute it for small symmetric graphs
T: Eigenvector centrality | x with λx = Ax for the largest eigenvalue λ, so x_{i} ∝ Σ_{j} a_{ij}x_{j}
T: Perron–Frobenius theorem | A connected graph's adjacency matrix has a largest eigenvalue with a positive eigenvector
H: The idea
- Your score is proportional to the sum of your neighbours' scores.
- Being connected to important nodes counts more than having many unimportant links.
- Perron–Frobenius guarantees a positive, unique (up to scale) solution for connected undirected graphs.
H: Computing
- Power iteration: start with all 1s, repeatedly multiply by A and normalise.
- For directed graphs, nodes with no incoming links score zero, which PageRank fixes.
- Katz centrality adds a baseline score to every node.
H: Uses
- Prestige in citation and social networks.
- Systemic importance in financial networks.
- Neuroscience: hub regions of the brain.
X: For the star K_{1,3} (centre c, three leaves), find the ratio of the centre's score to a leaf's.
> The largest eigenvalue of K_{1,3} is √3
> Leaf equation: √3 x_{leaf} = x_{c}; centre equation: √3 x_{c} = 3x_{leaf}
> x_{c}/x_{leaf} = √3 ≈ 1.732
K: Eigenvector centrality solves λx = Ax with the largest λ; Perron–Frobenius gives a positive solution; compute by power iteration; it rewards links to important nodes.
!: Applying plain eigenvector centrality to directed graphs with sinks, where many scores collapse to zero.
Q: Which theorem guarantees a positive eigenvector centrality in connected graphs? | Perron–Frobenius.
Q: How is eigenvector centrality usually computed? | By power iteration.
SUM: Importance comes from important neighbours.
SUM: It's an eigenvector problem.
SRC: Bonacich P, Factoring and weighting approaches to status scores and clique identification, Journal of Mathematical Sociology 2(1), 113 | journal | 1972 | https://doi.org/10.1080/0022250X.1972.9989806
SRC: Newman MEJ, Networks (2nd edn, Oxford University Press 2018) | textbook | 2018 | https://global.oup.com/
NUM1#maths-u15-31-q1@1: For K_{1,3}, find x_{centre}/x_{leaf}, to 3 decimal places. | 1.732 | 0.001 |  | √3 ≈ 1.732.
M1#maths-u15-31-q2@1: In a regular graph (all degrees equal), how do eigenvector centralities compare? | They're all equal | The first node scores highest | They're all zero | They're random | They depend on labels | The all-ones vector is the principal eigenvector of a regular graph.
M3#maths-u15-31-q3@2: Why does Katz centrality add a constant term to each node? | So nodes without incoming links in directed graphs still get a positive score | To make scores negative | To ignore the graph's edges | To speed up convergence only | It speeds up convergence but doesn't change any rankings | In directed graphs, plain eigenvector centrality gives zero to many nodes; a baseline fixes that.

## PageRank Mathematics
S: PageRank ranks web pages by imagining a random surfer who follows links and occasionally jumps to a random page. The ranking is the stationary distribution of this Markov chain, and it made Google's early search results far better than rivals'.
O: State the PageRank formula and the role of the damping factor
O: Interpret PageRank as a stationary distribution and compute it simply
T: PageRank | PR(i) = (1 − d)/N + d Σ_{j→i} PR(j)/out(j), with damping factor d (often 0.85)
T: Stationary distribution | A probability vector π with πP = π for the surfer's transition matrix P
H: The model
- With probability d the surfer follows a random outgoing link; otherwise jumps to a random page.
- Teleportation makes the chain irreducible and aperiodic, so a unique stationary distribution exists.
- Pages with no outgoing links (dangling nodes) are treated as linking to every page.
H: Computing
- Power iteration converges geometrically, at rate about d per step.
- The web graph has billions of pages, so sparse matrix methods are essential.
- PageRank values sum to 1.
H: Beyond the web
- Ranking researchers, species in food webs, proteins, sports teams.
- Personalised PageRank teleports to chosen pages for recommendations.
- Link farms tried to game it; modern search combines many signals.
X: In a network of N = 10 pages, what PageRank does a page with no incoming links have (d = 0.85)?
> It receives nothing from links
> Only the teleport term remains: (1 − d)/N
> PR = 0.15/10 = 0.015
K: PageRank is the stationary distribution of a damped random surfer; d ≈ 0.85; power iteration computes it; teleportation guarantees a unique answer.
!: Forgetting to divide a page's PageRank by its number of outgoing links when passing it on.
Q: What is the usual damping factor in PageRank? | About 0.85.
Q: What do all PageRank values add up to? | 1.
SUM: PageRank models a random surfer.
SUM: It's a stationary distribution.
SRC: Brin S, Page L, The anatomy of a large-scale hypertextual Web search engine, Computer Networks and ISDN Systems 30, 107 | journal | 1998 | https://doi.org/10.1016/S0169-7552(98)00110-X
SRC: Langville AN, Meyer CD, Google's PageRank and Beyond: The Science of Search Engine Rankings (Princeton University Press 2006) | textbook | 2006 | https://press.princeton.edu/
NUM1#maths-u15-32-q1@1: With N = 20 pages and d = 0.85, what is the PageRank of a page with no incoming links? | 0.0075 | 0.00001 |  | 0.15/20 = 0.0075.
M1#maths-u15-32-q2@1: What does the damping factor d represent? | The probability of following a link rather than jumping randomly | The number of pages | The page's quality | The fraction of pages that have no outgoing links at all | The number of links | With probability 1 − d the surfer teleports.
M2#maths-u15-32-q3@2: Why does PageRank include random teleportation? | It makes the chain irreducible, so a unique stationary distribution exists | To slow convergence | To penalise popular pages | To remove links | Teleporting lets the surfer skip slow-loading pages | Without it, the surfer can get trapped in dead ends or loops.

## Community Detection
S: Community detection finds groups of nodes more densely connected to each other than to the rest of the network: friend circles, research fields, functional modules in cells. Modularity is the most widely used measure of how good a division is.
O: Calculate modularity for a simple division
O: Describe community detection algorithms and their limits
T: Community | A set of nodes with many internal links and relatively few links to the rest
T: Modularity | Q = Σ_{c} [L_{c}/m − (d_{c}/2m)^{2}], comparing internal links L_{c} with those expected at random given total degree d_{c} (m edges)
H: Modularity
- Q near 0: no better than random; higher Q: stronger community structure (often 0.3–0.7 in real networks).
- Maximising Q exactly is NP-hard, so heuristics are used.
- Resolution limit: modularity can miss small communities in large networks.
H: Algorithms
- Louvain (2008) and Leiden: fast greedy modularity optimisation, used on millions of nodes.
- Girvan–Newman: remove high edge-betweenness edges.
- Label propagation, stochastic block models (statistical inference), spectral methods.
H: Cautions
- Different methods give different answers; there may be no single "true" partition.
- Overlapping communities (people in several circles) need special methods.
- Validate with external information.
X: Two triangles are joined by a single edge (7 edges in total). Find the modularity of splitting them into the two triangles.
> Each triangle has L_{c} = 3 internal edges and total degree d_{c} = 2 + 2 + 3 = 7
> Q = 2 × [3/7 − (7/14)^{2}] = 2 × (0.4286 − 0.25)
> Q ≈ 0.357, indicating clear community structure
K: Communities are densely connected groups; modularity compares internal links with a random baseline; Louvain and Leiden optimise it; results depend on method and resolution.
!: Treating the output of one algorithm as the unique true community structure.
Q: What modularity indicates no community structure beyond chance? | About 0.
Q: Name a fast modularity-based algorithm. | Louvain (or Leiden).
SUM: Communities are dense groups.
SUM: Modularity scores divisions.
SRC: Newman MEJ, Modularity and community structure in networks, PNAS 103(23), 8577 | journal | 2006 | https://doi.org/10.1073/pnas.0601602103
SRC: Blondel VD, Guillaume JL, Lambiotte R, Lefebvre E, Fast unfolding of communities in large networks, Journal of Statistical Mechanics P10008 | journal | 2008 | https://doi.org/10.1088/1742-5468/2008/10/P10008
NUM1#maths-u15-33-q1@1: Find the modularity of the two-triangle split in the example, to 3 decimal places. | 0.357 | 0.002 |  | 2 × (3/7 − 0.25) ≈ 0.357.
M1#maths-u15-33-q2@1: What does a high modularity score indicate? | More links within groups than expected by chance | Fewer links within groups than random | A complete graph | A tree | Random structure | Modularity measures excess internal links over a random baseline.
M3#maths-u15-33-q3@2: What is the resolution limit of modularity? | Maximising it can merge small genuine communities in large networks | It can't detect large communities | It only works on trees | It requires weighted graphs | Modularity only works when every community has the same size | The random-baseline term scales with network size, hiding small groups.

## Network Clustering
S: Clustering in networks measures how often a node's neighbours are also connected to each other: the tendency of friends to be friends. Social networks are highly clustered, unlike random graphs, which shapes how information and disease spread.
O: Calculate local and global clustering coefficients
O: Compare clustering in real and random networks
T: Local clustering coefficient | C_{i} = (links among i's neighbours)/C(k_{i}, 2)
T: Transitivity | Global clustering: 3 × (number of triangles)/(number of connected triples)
H: Calculating
- For a node with k neighbours, there are C(k, 2) possible neighbour pairs.
- C_{i} is the fraction of those pairs that are linked.
- Average clustering averages C_{i}; transitivity weights by triples.
H: In real networks
- Social networks: high clustering (triadic closure: friends of friends become friends).
- Erdős–Rényi random graphs: clustering ≈ p, tiny for large sparse networks.
- High clustering plus short paths defines small-world networks (later in this school).
H: Note on terms
- "Clustering" also means grouping nodes into clusters (community detection).
- Spectral and hierarchical clustering partition networks using similarities.
X: A node has 4 neighbours, with 2 links among them. Find its clustering coefficient.
> Possible neighbour pairs: C(4, 2) = 6
> Actual links: 2
> C = 2/6 ≈ 0.333
K: Local clustering = linked neighbour pairs / possible pairs; transitivity uses triangles and triples; real social networks are far more clustered than random graphs.
!: Dividing by k(k − 1) instead of k(k − 1)/2 for undirected graphs.
Q: What is the clustering coefficient of every node in a complete graph? | 1.
Q: What is the clustering coefficient of a node in a tree? | 0.
SUM: Clustering measures triangles.
SUM: Social networks are highly clustered.
SRC: Watts DJ, Strogatz SH, Collective dynamics of 'small-world' networks, Nature 393, 440 | journal | 1998 | https://doi.org/10.1038/30918
SRC: Newman MEJ, Networks (2nd edn, Oxford University Press 2018) | textbook | 2018 | https://global.oup.com/
NUM1#maths-u15-34-q1@1: A node has 5 neighbours with 4 links among them. Find its clustering coefficient. | 0.4 | 0.001 |  | 4/C(5, 2) = 4/10 = 0.4.
M1#maths-u15-34-q2@1: What does triadic closure mean? | Two people with a common friend tend to become friends | Networks have three components | Every node has degree 3 | Triangles are removed | Friends drift apart | Shared contacts create closing ties, raising clustering.
M2#maths-u15-34-q3@2: Why is clustering low in large sparse Erdős–Rényi graphs? | Neighbour pairs are linked with probability p, which is tiny | Random graphs have no edges | They're always trees | Clustering is always 1 | It isn't low | Each potential triangle edge appears independently with small p.

## Spectral Graph Theory
S: Spectral graph theory studies graphs through the eigenvalues and eigenvectors of their matrices, especially the Laplacian. Eigenvalues reveal connectivity, expansion and community structure, and they power spectral clustering and graph signal processing.
O: Form the graph Laplacian and interpret its eigenvalues
O: Describe the Fiedler vector and spectral clustering
T: Graph Laplacian | L = D − A, with D the diagonal matrix of degrees
T: Algebraic connectivity | λ₂, the second-smallest Laplacian eigenvalue; positive iff the graph is connected
H: Laplacian eigenvalues
- All eigenvalues are ≥ 0, and λ₁ = 0 with the all-ones eigenvector.
- The multiplicity of 0 equals the number of connected components.
- Larger λ₂ means a better-connected graph (Cheeger's inequality links it to bottlenecks).
H: Fiedler vector and clustering
- The eigenvector for λ₂ (Fiedler vector) splits the graph by sign into two well-separated parts.
- Spectral clustering uses several leading eigenvectors, then k-means.
- Works well when communities are well defined.
H: Other uses
- Counting spanning trees (matrix–tree theorem).
- Random walks: mixing times depend on the spectral gap.
- Graph signal processing and graph neural networks (later in this school).
X: Find the Laplacian of the path a–b–c and its eigenvalues.
> D = diag(1, 2, 1); L = [[1, −1, 0], [−1, 2, −1], [0, −1, 1]]
> Eigenvalues: 0, 1 and 3
> λ₂ = 1 > 0, so the path is connected; its Fiedler vector (1, 0, −1) splits a from c
K: L = D − A; eigenvalue 0's multiplicity counts components; λ₂ measures connectivity; the Fiedler vector bisects; spectral clustering uses leading eigenvectors.
!: Using the adjacency matrix's eigenvalues when the Laplacian's are needed for connectivity questions.
Q: What does the multiplicity of the Laplacian eigenvalue 0 count? | Connected components.
Q: What is the Fiedler vector? | The eigenvector for the second-smallest Laplacian eigenvalue.
SUM: Eigenvalues reveal graph structure.
SUM: The Laplacian is the key matrix.
SRC: Chung FRK, Spectral Graph Theory (American Mathematical Society 1997) | textbook | 1997 | https://bookstore.ams.org/
SRC: von Luxburg U, A tutorial on spectral clustering, Statistics and Computing 17, 395 | journal | 2007 | https://doi.org/10.1007/s11222-007-9033-z
NUM1#maths-u15-35-q1@1: For the path a–b–c, what is the second-smallest Laplacian eigenvalue? | 1 | 0 |  | The eigenvalues are 0, 1 and 3.
M1#maths-u15-35-q2@1: What is the smallest eigenvalue of any graph Laplacian? | 0 | 1 | −1 | The maximum degree | The number of vertices | Every Laplacian row sums to zero, so L·1 = 0 and the smallest eigenvalue is 0.
M2#maths-u15-35-q3@2: A graph's Laplacian has eigenvalue 0 with multiplicity 3. What can you conclude? | It has 3 connected components | It has 3 vertices | It has 3 edges | It's a triangle | Nothing | Each component contributes one independent zero eigenvector.

## Random Graphs
S: Random graph models generate networks by chance, to compare with real ones and to prove that graphs with certain properties exist. The Erdős–Rényi model shows sudden phase transitions: a giant component appears as soon as the average degree passes 1.
O: Calculate expected edges and degrees in G(n, p)
O: Describe the giant component and connectivity thresholds
T: Erdős–Rényi model | G(n, p): each of the C(n, 2) possible edges appears independently with probability p
T: Giant component | A connected component containing a positive fraction of all vertices
H: Basic properties
- Expected edges: pC(n, 2); expected degree p(n − 1) ≈ np = c.
- Degrees are approximately Poisson with mean c.
- Clustering ≈ p, and typical distances ≈ ln n/ln c.
H: Phase transitions
- c < 1: only small components (of size O(log n)).
- c > 1: a unique giant component emerges.
- p > ln n/n: the whole graph is connected with high probability.
H: Uses and limits
- Benchmarks: is a real network's clustering or degree spread unusual?
- The probabilistic method: random graphs prove existence results (Erdős, 1947).
- Real networks differ: higher clustering and heavy-tailed degrees (configuration models and others address this).
X: For n = 100 and p = 0.1, find the expected number of edges and the average degree.
> Possible edges: C(100, 2) = 4,950
> Expected edges: 0.1 × 4,950 = 495
> Average degree ≈ 0.1 × 99 = 9.9, well above 1, so a giant component exists
K: G(n, p) includes each edge independently; mean degree np; a giant component appears when np > 1 and connectivity when p > ln n/n; real networks differ in clustering and degree tails.
!: Expecting Erdős–Rényi graphs to reproduce real networks' hubs and clustering.
Q: At what average degree does a giant component emerge in G(n, p)? | Just above 1.
Q: What is the degree distribution of G(n, p) for large n? | Approximately Poisson.
SUM: Random graphs provide baselines.
SUM: They show sharp thresholds.
SRC: Erdős P, Rényi A, On the evolution of random graphs, Publications of the Mathematical Institute of the Hungarian Academy of Sciences 5, 17 | journal | 1960 | https://www.renyi.hu/~p_erdos/1960-10.pdf
SRC: Bollobás B, Random Graphs (2nd edn, Cambridge University Press 2001) | textbook | 2001 | https://www.cambridge.org/
NUM1#maths-u15-36-q1@1: For n = 100 and p = 0.1, find the expected number of edges. | 495 | 0 |  | 0.1 × C(100, 2) = 0.1 × 4,950 = 495.
M1#maths-u15-36-q2@1: In G(n, p) with average degree 0.5, what do the components look like? | All small, with no giant component | One giant component | The graph is connected | It's a complete graph | It's a tree | Below c = 1 the graph shatters into small pieces.
M2#maths-u15-36-q3@2: Why do random graphs serve as null models for real networks? | They show what structure arises by chance with the same size and density | They're always identical to real networks | They have hubs | They have high clustering | Real networks are generated by exactly this random process | Comparing with random baselines tests whether observed features are significant.

## Small-World Networks
S: In small-world networks, any two nodes are linked by a short chain, even though most links are local. The "six degrees of separation" idea and the Watts–Strogatz model explain how a few long-range shortcuts shrink a world full of clusters.
O: Describe the small-world property and the Watts–Strogatz model
O: Estimate typical path lengths in large networks
T: Small-world network | A network with short average path length (growing like log n) and high clustering
T: Watts–Strogatz model | A ring lattice in which each edge is rewired at random with probability p
H: Evidence
- Milgram's 1967 letter experiment: chains of about six acquaintances.
- Facebook (2016): average separation about 3.5 among over a billion users.
- Power grids, neural networks and film actor networks show small-world features.
H: The model
- p = 0: a regular lattice, highly clustered but with long paths.
- p = 1: a random graph, short paths but low clustering.
- Small p: a few shortcuts cut path lengths sharply while clustering stays high.
H: Consequences
- Rapid spread of information and disease.
- Synchronisation of oscillators (fireflies, neurons).
- Decentralised search: people find short chains using only local knowledge (Kleinberg).
X: Estimate the typical distance in a network of n = 10^{9} people, each with about 100 contacts.
> Distance grows like ln n/ln k
> ln 10^{9} ≈ 20.7 and ln 100 ≈ 4.6
> About 20.7/4.6 ≈ 4.5 steps
K: Small worlds combine short paths with high clustering; a few random shortcuts do it (Watts–Strogatz); distances grow like log n; spreading is fast.
!: Assuming short paths need many random links: a small fraction of shortcuts suffices.
Q: What did Milgram's experiment suggest? | People are linked by chains of about six acquaintances.
Q: What two properties define a small-world network? | Short path lengths and high clustering.
SUM: A few shortcuts make worlds small.
SUM: Paths grow only logarithmically.
SRC: Watts DJ, Strogatz SH, Collective dynamics of 'small-world' networks, Nature 393, 440 | journal | 1998 | https://doi.org/10.1038/30918
SRC: Travers J, Milgram S, An experimental study of the small world problem, Sociometry 32(4), 425 | journal | 1969 | https://doi.org/10.2307/2786545
NUM1#maths-u15-37-q1@1: Estimate ln(10^{6})/ln(50), the typical distance for a million nodes with 50 contacts each, to 1 decimal place. | 3.5 | 0.1 |  | 13.8/3.9 ≈ 3.5.
M1#maths-u15-37-q2@1: In the Watts–Strogatz model, what does a small rewiring probability achieve? | Short average paths while clustering stays high | Low clustering and long paths | A complete graph | No change at all | A tree | A few shortcuts collapse distances without destroying local structure.
M3#maths-u15-37-q3@2: Why can a disease spread across a city quickly even if most contacts are local? | A few long-range contacts act as shortcuts, creating short paths between distant groups | Local contacts are faster | Diseases ignore networks | Clustering speeds spread | Clustering itself speeds transmission between distant groups | Small-world shortcuts let infection jump between otherwise distant clusters.

## Scale-Free Networks
S: In a scale-free network, the degree distribution follows a power law: most nodes have few links but a few hubs have enormous numbers. Preferential attachment ("the rich get richer") explains them, and hubs make such networks robust to random failure but fragile to targeted attack.
O: Describe power-law degree distributions and preferential attachment
O: Explain robustness and vulnerability of scale-free networks
T: Power-law degree distribution | P(k) ∝ k^{−γ}, typically with 2 < γ < 3
T: Preferential attachment | New nodes link to existing nodes with probability proportional to their degree (Barabási–Albert)
H: Features
- Hubs: a few nodes with very high degree.
- Heavy tails: ⟨k^{2}⟩ can be very large or diverge.
- On log–log axes, the degree distribution is roughly a straight line.
H: The Barabási–Albert model
- Growth plus preferential attachment gives γ = 3.
- Explains hubs in the web, citations and some biological networks.
- Fitness and ageing variants refine it.
H: Robustness and debate
- Random failures rarely hit hubs, so the network stays connected.
- Targeted removal of hubs breaks it apart quickly.
- Debate: rigorous tests suggest strict power laws are rarer than once claimed (Broido and Clauset, 2019).
X: With γ = 2.5, how much less common are nodes of degree 100 than degree 10?
> P(k) ∝ k^{−2.5}
> P(100)/P(10) = (100/10)^{−2.5} = 10^{−2.5}
> ≈ 0.0032: about 300 times rarer, compared with an astronomically larger drop for Poisson degrees
K: Scale-free networks have power-law degrees and hubs; preferential attachment produces them; they're robust to random but fragile to targeted failures; test power laws rigorously.
!: Declaring a network scale-free from a roughly straight log–log plot without statistical testing.
Q: What exponent does the Barabási–Albert model give? | γ = 3.
Q: Why are scale-free networks robust to random failures? | Random removals usually hit low-degree nodes, not hubs.
SUM: Hubs dominate scale-free networks.
SUM: They're robust yet fragile.
SRC: Barabási AL, Albert R, Emergence of scaling in random networks, Science 286(5439), 509 | journal | 1999 | https://doi.org/10.1126/science.286.5439.509
SRC: Broido AD, Clauset A, Scale-free networks are rare, Nature Communications 10, 1017 | journal | 2019 | https://doi.org/10.1038/s41467-019-08746-5
NUM1#maths-u15-38-q1@1: With γ = 2, what is P(100)/P(10)? | 0.01 | 0.0001 |  | (10)^{−2} = 0.01.
M1#maths-u15-38-q2@1: What mechanism does the Barabási–Albert model use? | New nodes prefer to link to well-connected nodes | Every pair links with fixed probability | Edges are rewired on a ring | Nodes link only to neighbours | Links are removed over time | Preferential attachment: new nodes link to existing nodes in proportion to their degree.
M2#maths-u15-38-q3@2: Why are scale-free networks vulnerable to targeted attacks? | Removing a few hubs destroys most of the short paths | Hubs are easy to replace | Leaves hold the network together | They have no hubs | They aren't vulnerable | Hubs carry most of the short paths, so removing a few of them fragments the network.

## Network Science
S: Network science studies complex networks across physics, biology, sociology and computing using shared mathematical tools. It asks how network structure arises and how it shapes processes such as spreading, synchronisation and resilience.
O: Describe the main questions and measures of network science
O: Calculate average degree and density
T: Network density | The fraction of possible edges present: |E|/C(n, 2) for undirected networks
T: Average degree | ⟨k⟩ = 2|E|/n
H: Questions
- Structure: degree distributions, clustering, paths, communities, centrality.
- Formation: random models, preferential attachment, strategic network formation.
- Dynamics on networks: epidemics, opinions, synchronisation, cascades.
H: Data and methods
- Data from social media, transport, biology, economics.
- Null models and statistical inference (stochastic block models, exponential random graphs).
- Multilayer and temporal networks capture several relation types and timing.
H: Cautions
- Sampling and missing data distort measures.
- Correlation in network data isn't causation (homophily vs influence).
- Privacy and ethics matter for social network data.
X: A network has 1,000 nodes and 2,500 edges. Find its average degree and density.
> ⟨k⟩ = 2 × 2,500/1,000 = 5
> Possible edges: C(1,000, 2) = 499,500
> Density ≈ 2,500/499,500 ≈ 0.005: real networks are usually sparse
K: Network science links structure, formation and dynamics; ⟨k⟩ = 2|E|/n; density = |E|/C(n, 2); beware sampling, confounding and privacy.
!: Concluding influence spreads through a network when similar people may just connect (homophily).
Q: What is the average degree of a network with 50 nodes and 100 edges? | 4.
Q: Are most real networks dense or sparse? | Sparse.
SUM: Network science studies complex connections.
SUM: Structure shapes dynamics.
SRC: Barabási AL, Network Science (Cambridge University Press 2016) | textbook | 2016 | http://networksciencebook.com/
SRC: Newman MEJ, Networks (2nd edn, Oxford University Press 2018) | textbook | 2018 | https://global.oup.com/
NUM1#maths-u15-39-q1@1: A network has 1,000 nodes and 2,500 edges. What is its average degree? | 5 | 0 |  | 2 × 2,500/1,000 = 5.
M1#maths-u15-39-q2@1: Which question belongs to "dynamics on networks"? | How fast does a rumour spread through the network? | How many nodes are there? | What is the network's density? | Who has the highest degree? | How was the data collected? | Dynamics concern processes unfolding over the structure.
M2#maths-u15-39-q3@2: Why can't homophily and social influence be separated easily in network data? | Similar people link together and linked people become similar, both producing correlation | Networks have no similar people | Influence never happens | Homophily is impossible to observe | They're easily separated | Both mechanisms create the same pattern of similar neighbours.

## Percolation Theory
S: Percolation theory studies what happens when parts of a network are randomly removed or kept: at a critical threshold, a spanning cluster suddenly appears or disappears. It describes fluid through porous rock, network resilience and epidemic thresholds.
O: Describe site and bond percolation and critical thresholds
O: Apply the threshold for random removal in networks
T: Percolation threshold | p_{c}, the critical occupation probability at which a giant (spanning) cluster first appears
T: Molloy–Reed criterion | A giant component exists in a random network iff ⟨k^{2}⟩/⟨k⟩ > 2
H: On lattices
- Bond percolation on the 2D square lattice: p_{c} = ½ exactly (Kesten, 1980).
- Site percolation on the square lattice: p_{c} ≈ 0.5927 (numerical).
- Near p_{c}, quantities follow power laws with universal exponents.
H: On networks
- Removing nodes at random is site percolation.
- Erdős–Rényi with mean degree c: the giant component survives until the fraction kept falls below 1/c.
- Scale-free networks with γ < 3 have p_{c} → 0: extremely robust to random failure.
H: Applications
- Oil and water flow through rock; coffee through grounds.
- Robustness of power grids and the internet.
- Epidemics: transmission is bond percolation on the contact network.
X: An Erdős–Rényi network has mean degree 4. What fraction of nodes can be removed at random before the giant component disappears?
> The giant component survives while the kept fraction q satisfies q × 4 > 1
> Critical q = ¼
> So up to 75% of nodes can be removed
K: Percolation has a sharp threshold p_{c}; square-lattice bond p_{c} = ½; ER networks with mean degree c tolerate removing 1 − 1/c of nodes; heavy-tailed networks are very robust to random removal.
!: Expecting gradual change near the threshold: the transition is sharp.
Q: What is the bond percolation threshold on the square lattice? | ½.
Q: What is the Molloy–Reed criterion? | ⟨k^{2}⟩/⟨k⟩ > 2.
SUM: Percolation has sharp thresholds.
SUM: It measures network robustness.
SRC: Stauffer D, Aharony A, Introduction to Percolation Theory (2nd edn, Taylor & Francis 1994) | textbook | 1994 | https://www.routledge.com/
SRC: Callaway DS, Newman MEJ, Strogatz SH, Watts DJ, Network robustness and fragility: percolation on random graphs, Physical Review Letters 85(25), 5468 | journal | 2000 | https://doi.org/10.1103/PhysRevLett.85.5468
NUM1#maths-u15-40-q1@1: An Erdős–Rényi network has mean degree 4. What fraction of nodes can be randomly removed before the giant component vanishes? | 0.75 | 0.001 |  | Kept fraction must exceed 1/4, so up to 1 − ¼ = 0.75 can go.
M1#maths-u15-40-q2@1: Which process is bond percolation on a contact network? | Disease transmission along contacts with some probability | Removing all hubs | Adding random edges | Sorting nodes by degree | Colouring vertices | Each contact (bond) transmits independently with some probability.
M3#maths-u15-40-q3@2: Why are scale-free networks with γ < 3 so robust to random node removal? | ⟨k^{2}⟩ diverges, so the Molloy–Reed criterion keeps holding even after heavy removal | Hubs are removed first, leaving the robust low-degree core | Their degree distribution is Poisson | They're always complete | They aren't robust | Heavy tails keep ⟨k^{2}⟩/⟨k⟩ large, pushing the threshold towards zero.

## Social Network Analysis
S: Social network analysis studies relationships among people and organisations: who knows whom, who advises whom, who trades with whom. Its concepts (density, homophily, weak ties, structural holes) explain job searches, influence and the spread of ideas.
O: Calculate density and describe key social network concepts
O: Discuss ethical issues in social network data
T: Strength of weak ties | Granovetter's finding that acquaintances (weak ties) bridge groups and bring new information
T: Homophily | The tendency of similar people to connect
H: Concepts
- Density and ego networks (a person's own connections).
- Triadic closure and clustering.
- Structural holes: brokers between unconnected groups gain information and control (Burt).
- Dunbar's number: humans maintain about 150 stable relationships.
H: Findings
- Job information often comes through weak ties rather than close friends.
- Homophily by age, education and attitudes shapes networks.
- Networks influence health behaviours, though causal effects are debated.
H: Ethics and data
- Consent, anonymity and the risk of re-identification.
- Data from platforms reflect their design and users, not whole populations.
- UK GDPR governs personal data use.
X: A team of 12 people has 22 working ties. Find the network density.
> Possible ties: C(12, 2) = 66
> Density = 22/66
> ≈ 0.333: a third of possible ties exist
K: Density, ego networks, homophily, weak ties and structural holes describe social structure; weak ties bridge groups; data use needs consent and care.
!: Treating platform data as a representative sample of everyone's social ties.
Q: Who proposed the strength of weak ties? | Mark Granovetter (1973).
Q: What is homophily? | The tendency of similar people to form ties.
SUM: Social networks shape information and opportunity.
SUM: Weak ties bridge groups.
SRC: Granovetter MS, The strength of weak ties, American Journal of Sociology 78(6), 1360 | journal | 1973 | https://doi.org/10.1086/225469
SRC: Wasserman S, Faust K, Social Network Analysis: Methods and Applications (Cambridge University Press 1994) | textbook | 1994 | https://www.cambridge.org/
NUM1#maths-u15-41-q1@1: A group of 12 people has 22 ties. Find the density to 3 decimal places. | 0.333 | 0.001 |  | 22/C(12, 2) = 22/66.
M1#maths-u15-41-q2@1: Why do weak ties often provide job information? | They connect to groups whose information you don't already have | They're stronger than close ties | Close friends never share information | They're more numerous than strong ties always | They don't | Close friends overlap with you; acquaintances bridge to new circles.
M2#maths-u15-41-q3@2: What advantage does a broker spanning a structural hole have? | Access to non-redundant information from separate groups | More close friends | A lower degree | Less influence | No advantage | Bridging unconnected groups gives information and control benefits (Burt).

## Biological Network Analysis
S: Biological networks map interactions among genes, proteins, metabolites, neurons and species. Network analysis finds key players, recurring circuit patterns and functional modules, helping to identify drug targets and understand disease.
O: Describe the main types of biological network
O: Explain network motifs and hub analysis in biology
T: Protein interaction network | Proteins as nodes, physical interactions as edges
T: Network motif | A small subgraph pattern occurring much more often than in randomised networks, such as the feed-forward loop
H: Types
- Gene regulatory networks (directed: transcription factors regulate genes).
- Protein–protein interaction networks; metabolic networks of reactions.
- Neural connectomes: C. elegans has 302 neurons, fully mapped by 1986.
- Ecological food webs.
H: Analyses
- Hubs: highly connected proteins are more often essential (the centrality–lethality idea, debated).
- Motifs: feed-forward loops filter noise and create delays (Alon and colleagues, 2002).
- Modules: groups of genes or proteins acting together.
H: Uses and cautions
- Drug targets and repurposing via network proximity.
- Disease modules linking genes to conditions.
- Interaction data are noisy and incomplete, with study bias towards well-researched proteins.
X: A feed-forward loop has X → Y, Y → Z and X → Z. How many directed edges does it have, and why is it useful?
> Three directed edges among three nodes
> Z receives a direct signal from X and a delayed one via Y
> If Z needs both, brief pulses of X are filtered out: the loop acts as a persistence detector
K: Biological networks connect genes, proteins, metabolites, neurons and species; motifs and modules reveal function; hubs suggest targets; data are noisy and biased.
!: Treating missing interactions in biological data as confirmed absences.
Q: How many neurons does C. elegans have? | 302.
Q: What is a network motif? | A small subgraph pattern over-represented compared with random networks.
SUM: Biology is full of networks.
SUM: Motifs reveal design principles.
SRC: Milo R et al, Network motifs: simple building blocks of complex networks, Science 298(5594), 824 | journal | 2002 | https://doi.org/10.1126/science.298.5594.824
SRC: White JG, Southgate E, Thomson JN, Brenner S, The structure of the nervous system of the nematode Caenorhabditis elegans, Philosophical Transactions of the Royal Society B 314(1165), 1 | journal | 1986 | https://doi.org/10.1098/rstb.1986.0056
NUM1#maths-u15-42-q1@1: How many directed edges are in a feed-forward loop? | 3 | 0 |  | X → Y, Y → Z and X → Z.
M1#maths-u15-42-q2@1: Which network is directed? | A gene regulatory network | A protein interaction network of binding | A co-authorship network | A friendship network | A road network of two-way streets | Regulation has a direction: a transcription factor acts on a gene.
M2#maths-u15-42-q3@2: Why must biological interaction data be interpreted cautiously? | They're noisy, incomplete and biased towards well-studied molecules | They're always complete | They contain no errors | Interactions are random, so no pattern in them is meaningful | No caution is needed | Missing and false interactions are common, and research attention is uneven.

## Network Epidemiology
S: Network epidemiology models how infections spread along contacts rather than through a perfectly mixed population. Heterogeneous contact numbers create superspreaders and change epidemic thresholds, which guides targeted vaccination and contact tracing.
O: Explain how contact heterogeneity changes R₀
O: Describe targeted interventions on networks
T: Basic reproduction number on a network | For transmissibility T per contact, R₀ = T(⟨k^{2}⟩ − ⟨k⟩)/⟨k⟩
T: Superspreader | An individual who infects many more others than average, often because of many contacts
H: Why networks matter
- Well-mixed models assume everyone contacts everyone equally; networks don't.
- High-degree people are infected sooner and infect more.
- The variance of degree raises R₀: two networks with the same average degree can differ greatly.
H: Interventions
- Target vaccination at hubs: far more effective than random vaccination in heterogeneous networks.
- Acquaintance immunisation: vaccinate random friends of random people (who tend to have high degree: the friendship paradox).
- Contact tracing exploits network structure; it works best when it's fast.
H: Models
- SIR and SIS on networks; pair approximations and message passing.
- Agent-based simulations for detailed policy questions.
- Data: contact surveys (such as POLYMOD) and mobility data.
X: A network has ⟨k⟩ = 4 and ⟨k^{2}⟩ = 40, and transmissibility T = 0.2. Find R₀.
> R₀ = T(⟨k^{2}⟩ − ⟨k⟩)/⟨k⟩
> = 0.2 × (40 − 4)/4 = 0.2 × 9
> = 1.8, though a well-mixed model with 4 contacts would suggest 0.8
K: Contact heterogeneity raises R₀ through ⟨k^{2}⟩; superspreaders matter; vaccinating hubs or friends of random people is efficient; tracing exploits structure.
!: Using average contacts alone to estimate R₀ when contact numbers vary widely.
Q: What is the friendship paradox? | On average, your friends have more friends than you do.
Q: Why does targeting hubs for vaccination work well? | Hubs carry a large share of transmission.
SUM: Contact networks shape epidemics.
SUM: Heterogeneity raises R₀.
SRC: Pastor-Satorras R, Castellano C, Van Mieghem P, Vespignani A, Epidemic processes in complex networks, Reviews of Modern Physics 87(3), 925 | journal | 2015 | https://doi.org/10.1103/RevModPhys.87.925
SRC: Mossong J et al, Social contacts and mixing patterns relevant to the spread of infectious diseases, PLOS Medicine 5(3), e74 | journal | 2008 | https://doi.org/10.1371/journal.pmed.0050074
NUM1#maths-u15-43-q1@1: With ⟨k⟩ = 4, ⟨k^{2}⟩ = 40 and T = 0.2, find R₀. | 1.8 | 0.001 |  | 0.2 × 36/4 = 1.8.
M1#maths-u15-43-q2@1: Why does acquaintance immunisation reach high-degree people? | A random friend is more likely to be someone with many friends | Friends are always hubs | It vaccinates everyone | It picks people at random | It doesn't | High-degree people appear as friends more often (the friendship paradox).
M3#maths-u15-43-q3@2: Two networks have the same average degree, but one has much more variable degree. Which has the higher epidemic R₀? | The more variable one, because ⟨k^{2}⟩ is larger | The less variable one | They're equal | Neither can have an epidemic | It depends only on T | R₀ depends on ⟨k^{2}⟩/⟨k⟩, which grows with degree variance.

## Graph Neural Network Mathematics
S: Graph neural networks (GNNs) learn from data on graphs by repeatedly passing messages between neighbouring nodes. They predict molecular properties, recommend items and model traffic, and their mathematics links linear algebra, spectral graph theory and deep learning.
O: Describe message passing and the graph convolutional network update
O: Explain permutation equivariance, over-smoothing and expressive power
T: Message passing | Each node updates its feature vector by combining its own features with aggregated features of its neighbours
T: Graph convolutional network (GCN) layer | H′ = σ(D̃^{−½}ÃD̃^{−½}HW), with Ã = A + I and D̃ its degree matrix
H: The update
- Aggregate neighbours' features (sum, mean or max), transform with learned weights W, apply a non-linearity σ.
- Stacking k layers lets information travel k hops.
- Normalising by degrees keeps feature scales stable.
H: Key properties
- Permutation equivariance: relabelling nodes relabels the outputs the same way.
- Over-smoothing: many layers make all node features similar.
- Expressive power is limited by the Weisfeiler–Lehman graph isomorphism test (Xu and others, 2019).
H: Applications
- Drug discovery and materials science (molecules as graphs).
- Recommendation (users and items), traffic forecasting, fraud detection.
- Links to spectral graph theory: GCNs act as low-pass filters on graph signals.
X: Node v has neighbours with features 2, 4 and 6. Using mean aggregation including v's own feature 8, what value is aggregated before the weights are applied?
> Include v itself: values 2, 4, 6, 8
> Mean = 20/4
> = 5; the layer then computes σ(5W)
K: GNNs pass messages between neighbours; GCN layers normalise adjacency with self-loops; they're permutation-equivariant; depth causes over-smoothing; WL limits expressiveness.
!: Stacking many GNN layers expecting better results, when over-smoothing makes features indistinguishable.
Q: How far can information travel in a 3-layer GNN? | 3 hops.
Q: What does over-smoothing mean? | Node features become too similar after many layers.
SUM: GNNs learn by passing messages.
SUM: Their power and limits are mathematical.
SRC: Kipf TN, Welling M, Semi-supervised classification with graph convolutional networks, International Conference on Learning Representations | journal | 2017 | https://arxiv.org/abs/1609.02907
SRC: Hamilton WL, Graph Representation Learning (Morgan & Claypool 2020) | textbook | 2020 | https://www.cs.mcgill.ca/~wlh/grl_book/
NUM1#maths-u15-44-q1@1: Node v (feature 1) has neighbours with features 3, 5 and 7. Find the mean including v. | 4 | 0 |  | (1 + 3 + 5 + 7)/4 = 4.
M1#maths-u15-44-q2@1: Why are GNNs permutation-equivariant? | Their aggregations (sum, mean, max) don't depend on neighbour order | They sort nodes alphabetically | They use fixed node labels | They ignore the graph | They sort the nodes alphabetically before every layer | Order-independent aggregation means relabelling nodes just relabels outputs.
M2#maths-u15-44-q3@2: What limits the ability of standard message-passing GNNs to distinguish graphs? | They're at most as powerful as the Weisfeiler–Lehman test | They can't use features | They require planar graphs | They only work on trees | Nothing limits them | Two graphs WL can't tell apart get identical GNN representations.
`;
