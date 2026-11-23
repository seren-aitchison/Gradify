// Unit 14, Discrete Mathematics. Rows: kit/diagrams/BUILDERS.md.
const SYM = "a counting or logic argument laid out in the notes' worked steps; a picture would only decorate it";
const NET = (what) => `needs renderer graph/network drawing with coloured edges: ${what}`;
export default [
  ["u14-01", null, "an overview and an induction proof; no worked quantity to draw"],
  ["u14-02", null, SYM],
  ["u14-03", "bar-model", "maths-u14-pin-repeats", "10 000 PINs split into 5 040 with all digits different and 4 960 with a repeat"],
  ["u14-04", null, SYM],
  ["u14-05", "bar-model", "maths-u14-committees", "120 committees split into 20 all-male and 100 with at least one woman"],
  ["u14-06", "barchart", "maths-u14-binomial-coefficients", "coefficients 32, 80, 80, 40, 10, 1 of (2 + x)^5, x^3 highlighted"],
  ["u14-07", null, SYM],
  ["u14-08", "venn", "maths-u14-divisible-2-3-5", "multiples of 2, 3, 5 in 1 to 100 with every region count; 74 inside, 26 outside"],
  ["u14-09", "barchart", "maths-u14-coin-ways", "6, 3 and 1 ways to make 10p with 0, 1, 2 five-pence coins"],
  ["u14-10", "barchart", "maths-u14-partitions-of-5", "the 7 partitions of 5 counted by largest part"],
  ["u14-11", null, NET("the triangle-free graph K5,5 on 10 vertices")],
  ["u14-12", null, NET("the 2-coloured complete graph K6")],
  ["u14-13", null, SYM],
  ["u14-14", null, NET("the Fano plane")],
  ["u14-15", null, SYM],
  ["u14-16", null, SYM],
  ["u14-17", null, SYM],
  ["u14-18", null, SYM],
  ["u14-19", null, SYM],
  ["u14-20", null, NET("the 3-state DFA diagram")],
  ["u14-21", null, SYM],
  ["u14-22", null, "needs renderer cellular grid: the blinker's two generations"],
  ["u14-23", null, SYM],
];
