// The pharmacy adapter (PharmaGradify).
const srcYear = (L) => Math.max(0, ...L.sources.map((x) => Number(String(x.date).slice(0, 4)) || 0));
function pharmacyRules(unit, L, text) {
  const w = [], lower = text.toLowerCase();
  const clinical = [7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18].includes(unit.n);
  if (clinical && !/\bbnf\b|\bspc\b|nice|local guid|local polic|refer|prescriber|monitor|counsel/.test(lower)) w.push("clinical lesson without a pointer to the BNF, SPC, guidance, referral or monitoring");
  if (clinical && /\b\d+(\.\d+)?\s?(mg|micrograms?|mcg|units)\b/i.test(text) && !/illustrative|check the (current )?bnf|see the (current )?bnf|bnf(c)? for (the )?dose|spc/i.test(text)) w.push("a dose is stated without marking it illustrative or pointing to the BNF or SPC");
  if (unit.n === 16 && !/regulations \d{4}|act \d{4}|gphc|misuse of drugs|human medicines/i.test(text)) w.push("law lesson without the legislation or GPhC standard it rests on");
  return w;
}
function pharmacyFlags(L, text) {
  const f = [];
  if (/\b\d+(\.\d+)?\s?(mg|micrograms?|mcg|mmol|units)\b/i.test(text)) f.push("doses or quantities: check against the current BNF and SPC");
  if (/schedule [1-5]|controlled drug|\bcd\b/i.test(text)) f.push("controlled drugs law");
  if (srcYear(L) >= 2024 || /\bmhra\b|drug safety update|from (april|october) 202[5-7]|being reformed|consultation/i.test(text)) f.push("recent or changing guidance");
  if (/cockcroft|creatinine clearance|egfr|mg\/kg|body surface area|mg\/m/i.test(text)) f.push("calculations or renal dosing");
  if (L.authorities?.length) f.push(`${L.authorities.length} drug card${L.authorities.length > 1 ? "s" : ""}: check against the BNF and SPC`);
  return f;
}

export default {
  id: "pharmacy", name: "Pharmacy",
  defaults: {},
  questionTypes: [],
  qa: { expert: "a registered pharmacist educator", rules: pharmacyRules, flags: pharmacyFlags },
};
