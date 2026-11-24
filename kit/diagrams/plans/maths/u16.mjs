// Unit 16, Logic, Sets and Foundations. Rows: kit/diagrams/BUILDERS.md.

const DEF = "a definition or short list-and-check exercise: the notes give it in words and notation, and a picture would only repeat the set or table already written";
const PROOF = "a proof or derivation: the notes lay it out line by line and no quantity is drawn";
const LOGIC = "a logical system or formula: the worked example is a symbolic evaluation or derivation with no geometry to draw";
const FOUND = "a foundational or metamathematical argument: the notes give it in prose and symbols, with nothing numeric to draw";
const FUZZ = "three truth values combined by min, max and 1 − x: a one-line calculation with no picture beyond the numbers";
const MODAL = "a three-world Kripke model: the evaluation is two lines of symbolic checking and the notes already list the worlds";
const LTL = "a temporal formula and a classification: no quantity to draw";
const CALC = "a symbolic reduction or ordinal/recursive computation shown step by step in the notes";
export default [
  ["u16-01", null, DEF],
  ["u16-02", null, DEF],
  ["u16-03", "venn", "maths-u16-set-difference", "A = {1, 2, 3, 4} and B = {3, 4, 5}: A \\ B = {1, 2}, B \\ A = {5}, A Δ B = {1, 2, 5}"],
  ["u16-04", "number-line", "maths-u16-interval-union", "the union of [1/n, 2] is (0, 2] and the intersection of [0, 1 + 1/n] is [0, 1]"],
  ["u16-05", "venn", "maths-u16-de-morgan", "evens and multiples of 3 in {1, …, 10}: (A ∪ B)ᶜ = {1, 5, 7} = Aᶜ ∩ Bᶜ"],
  ["u16-06", null, DEF],
  ["u16-07", null, DEF],
  ["u16-08", null, DEF],
  ["u16-09", null, PROOF],
  ["u16-10", null, DEF],
  ["u16-11", "geometry", "maths-u16-circle-relation", "x² + y² = 1 gives two outputs, (0, 1) and (0, −1), at x = 0, so it is not a function"],
  ["u16-12", "graph", "maths-u16-bijection-inverse", "f(x) = 3x − 5 and its inverse (x + 5)/3 reflected in y = x"],
  ["u16-13", null, DEF],
  ["u16-14", "venn", "maths-u16-classes-mod-3", "the classes {3, 6}, {1, 4}, {2, 5} of 'same remainder mod 3' partition {1, …, 6}"],
  ["u16-15", "geometry", "maths-u16-hasse-diamond", "the Hasse diagram of divisibility on {1, 2, 3, 6}: a diamond with no edge from 1 to 6"],
  ["u16-16", null, DEF],
  ["u16-17", null, DEF],
  ["u16-18", null, DEF],
  ["u16-19", "geometry", "maths-u16-divisors-30", "the divisors of 30 as a cube matching the subsets of {2, 3, 5}, with 6 and its complement 5"],
  ["u16-20", null, LOGIC],
  ["u16-21", null, LOGIC],
  ["u16-22", null, LOGIC],
  ["u16-23", null, LOGIC],
  ["u16-24", null, LOGIC],
  ["u16-25", null, MODAL],
  ["u16-26", null, LOGIC],
  ["u16-27", null, FUZZ],
  ["u16-28", null, LTL],
  ["u16-29", null, PROOF],
  ["u16-30", null, PROOF],
  ["u16-31", null, PROOF],
  ["u16-32", null, PROOF],
  ["u16-33", "sequence", "maths-u16-triangle-sums", "1 + 2 + … + n as triangle numbers 1, 3, 6, 10, 15: each step adds a row of k + 1 dots"],
  ["u16-34", null, PROOF],
  ["u16-35", null, FOUND],
  ["u16-36", null, FOUND],
  ["u16-37", null, FOUND],
  ["u16-38", null, FOUND],
  ["u16-39", null, FOUND],
  ["u16-40", null, CALC],
  ["u16-41", null, FOUND],
  ["u16-42", null, FOUND],
  ["u16-43", null, FOUND],
  ["u16-44", null, FOUND],
  ["u16-45", null, FOUND],
  ["u16-46", null, FOUND],
  ["u16-47", null, CALC],
  ["u16-48", null, CALC],
  ["u16-49", null, FOUND],
  ["u16-50", null, FOUND],
  ["u16-51", null, FOUND],
  ["u16-52", null, FOUND],
];
