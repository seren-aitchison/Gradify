// Synthetic catalogue bundles for the performance harness (scripts/catalogue/harness.cjs). FICTIONAL providers in one
// region, with realistic name lengths and some closed ones, at a chosen volume. Deterministic for a given size and seed.
import { newId } from "../../kit/data/catalogue-ids.js";

const A = ["North", "South", "East", "West", "Upper", "Lower", "Old", "New", "Great", "Little", "Saint", "Royal", "King", "Queen", "Abbey", "Bridge", "Brook", "Castle", "Church", "Cliff", "Cross", "Dale", "Field", "Ford", "Forest", "Green", "Hill", "Lake", "Lea", "Marsh", "Meadow", "Mill", "Moor", "Oak", "Park", "Pine", "River", "Rose", "Stone", "Vale", "Water", "Well", "Wood", "Ash", "Elm", "Birch", "Hazel", "Willow", "Holly", "Ivy"];
const B = ["ton", "ham", "ley", "field", "bury", "worth", "stead", "wick", "by", "thorpe", "mouth", "port", "minster", "combe", "hurst", "den", "dale", "brook", "well", "ford"];
const K = [["Primary School", "school"], ["Academy", "school"], ["High School", "school"], ["Junior School", "school"], ["Infant School", "school"], ["Secondary School", "school"], ["College", "college"], ["Community College", "college"], ["Sixth Form College", "college"], ["University", "university"], ["Grammar School", "school"], ["C of E Primary School", "school"], ["Catholic Primary School", "school"], ["Free School", "school"]];

export function synthBundle(n, { country = "GB", region = "ENG", seed = 7, closedShare = 0.12 } = {}) {
  let s = seed;
  const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
  const D = "2026-11-24", SRC = "src_fixture";
  const records = [];
  for (let i = 0; i < n; i++) {
    const town = pick(A) + pick(B);
    const [suffix, kind] = pick(K);
    const name = `${rnd() < 0.3 ? `${pick(A)} ` : ""}${town} ${suffix}`;
    const data = { name, kind, town };
    records.push({ id: newId("provider", { now: Date.UTC(2026, 10, 24) + i, random: rnd }), type: "provider", country, region, lifecycle: rnd() < closedShare ? "closed" : "open", fixture: true,
      data, fields: { name: { status: "unverified", source: SRC }, kind: { status: "unverified", source: SRC }, town: { status: "unverified", source: SRC } },
      provenance: { source: SRC, source_url: "https://example.org/fixture", retrieved_at: D, last_checked: D, next_review: "2027-11-24" } });
  }
  return {
    schema_version: 1, kind: "fixture", note: `SYNTHETIC: ${n} fictional providers for performance testing.`,
    sources: [{ id: SRC, name: "Gradify test fixtures (fictional)", owner: "Gradify", url: "https://example.org/fixture", verdict: "fixture", licence: null, rights: { ingest: true, publish: true, evidence: true, archive: true }, fields_allowed: {}, checked_at: D }],
    reviewers: [], evidence: [], records, edges: [], aliases: [], tombstones: [],
  };
}
