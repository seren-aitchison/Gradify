// Gradify-owned catalogue identifiers (docs/CATALOGUE.md, Proposal 5 section 3.1). Every catalogue entity has an
// opaque, permanent ID: a type prefix plus a ULID (26 Crockford base-32 characters). External register numbers
// (UKPRN, URN, IPEDS UNITID, NCES IDs…) are aliases, never identity. IDs are never reused: a merged or split record
// leaves a tombstone. Pure, so Node can test it (tests/catalogue.test.mjs).

export const PREFIX = {
  system: "gy", provider: "gp", offering: "go", structure: "gs", unit: "gu", assessment: "ga", curriculum: "gc", rule: "gr",
};
export const TYPE_OF_PREFIX = Object.fromEntries(Object.entries(PREFIX).map(([t, p]) => [p, t]));
const CROCKFORD = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
export const ID_RE = /^(gy|gp|go|gs|gu|ga|gc|gr)_[0-9A-HJKMNP-TV-Z]{26}$/;

/** A new ID for a record type. `now` (ms) and `random` (a function returning 0–1) can be fixed for tests. */
export function newId(type, { now = Date.now(), random = Math.random } = {}) {
  const p = PREFIX[type];
  if (!p) throw new Error(`Unknown catalogue type: ${type}`);
  let t = now, time = "";
  for (let i = 0; i < 10; i++) { time = CROCKFORD[t % 32] + time; t = Math.floor(t / 32); }
  let rand = "";
  for (let i = 0; i < 16; i++) rand += CROCKFORD[Math.floor(random() * 32) % 32];
  return `${p}_${time}${rand}`;
}
export const isId = (id) => ID_RE.test(String(id || ""));
export const typeOfId = (id) => (isId(id) ? TYPE_OF_PREFIX[id.slice(0, 2)] : null);
/** The shard a record lives in: the last two characters of its ID (1,024 buckets per type). */
export const bucketOf = (id) => id.slice(-2);

/**
 * Follow tombstones to the live record: a merged ID resolves to the survivor; a split ID can't be resolved on its own
 * (the student chooses), so it returns { split: [ids] }. Loops and missing targets return { missing: true }.
 */
export function resolveId(id, tombstones) {
  const seen = new Set();
  let cur = id;
  for (;;) {
    if (seen.has(cur)) return { id: null, missing: true, loop: true };
    seen.add(cur);
    const t = tombstones.get ? tombstones.get(cur) : tombstones[cur];
    if (!t) return { id: cur };
    if (t.split_into?.length) return { id: null, split: t.split_into };
    if (!t.merged_into) return { id: null, missing: true };
    cur = t.merged_into;
  }
}
