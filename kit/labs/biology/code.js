// The standard genetic code (NCBI translation table 1) and helpers shared by the gene-expression labs.
const BASES = "TCAG";
const AA = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG";
export const CODE = {};
for (let i = 0; i < 64; i++) CODE[BASES[i >> 4] + BASES[(i >> 2) & 3] + BASES[i & 3]] = AA[i];
export const NAMES = { A: "Ala", R: "Arg", N: "Asn", D: "Asp", C: "Cys", Q: "Gln", E: "Glu", G: "Gly", H: "His", I: "Ile", L: "Leu", K: "Lys", M: "Met", F: "Phe", P: "Pro", S: "Ser", T: "Thr", W: "Trp", Y: "Tyr", V: "Val", "*": "Stop" };
export const FULL = { A: "alanine", R: "arginine", N: "asparagine", D: "aspartate", C: "cysteine", Q: "glutamine", E: "glutamate", G: "glycine", H: "histidine", I: "isoleucine", L: "leucine", K: "lysine", M: "methionine", F: "phenylalanine", P: "proline", S: "serine", T: "threonine", W: "tryptophan", Y: "tyrosine", V: "valine", "*": "stop" };
// side-chain classes for colouring
export const CLASS = { A: "np", V: "np", L: "np", I: "np", M: "np", F: "np", W: "np", P: "np", G: "np", S: "p", T: "p", C: "p", Y: "p", N: "p", Q: "p", D: "neg", E: "neg", K: "pos", R: "pos", H: "pos", "*": "stop" };
export const CLASS_COL = { np: "#f59f00", p: "#40c057", neg: "#fa5252", pos: "#4dabf7", stop: "#868e96" };
const PAIR = { A: "T", T: "A", G: "C", C: "G" };
// DNA coding strand (5′→3′) → mRNA; template strand (3′→5′ as read) → mRNA
export const transcribeCoding = (dna) => dna.replace(/T/g, "U");
export const templateOf = (coding) => [...coding].map((b) => PAIR[b]).join("");
export const rnaToDna = (rna) => rna.replace(/U/g, "T");
// translate from the first AUG (or from position 0) until a stop codon
export function translate(rna, { fromStart = true } = {}) {
  const dna = rnaToDna(rna);
  let i = fromStart ? dna.indexOf("ATG") : 0;
  if (i < 0) return { start: -1, codons: [], protein: "" };
  const codons = [];
  for (; i + 3 <= dna.length; i += 3) { const c = dna.slice(i, i + 3), aa = CODE[c]; codons.push({ at: i, codon: c.replace(/T/g, "U"), aa }); if (aa === "*") break; }
  return { start: fromStart ? dna.indexOf("ATG") : 0, codons, protein: codons.map((c) => c.aa).join("") };
}
