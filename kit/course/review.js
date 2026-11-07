// Expert review status of an interactive, shown under it. A review record (kit/course/reviews.js) holds who
// reviewed it, when, and the fingerprint of the interactive's code at the time (kit/course/ix-manifest.js, built by
// scripts/ix-manifest.mjs). If the code has changed since, the interactive is "Updated since last review".
//   reviewStatus(record, fingerprint) → "unreviewed" | "reviewed" | "updated"
//   reviewLabel(record, fingerprint)  → the text shown

export function reviewStatus(record, fingerprint) {
  if (!record || !record.date || !record.role) return "unreviewed";
  return record.fingerprint && fingerprint && record.fingerprint !== fingerprint ? "updated" : "reviewed";
}

export function reviewLabel(record, fingerprint) {
  const st = reviewStatus(record, fingerprint);
  if (st === "unreviewed") return { status: st, text: "Not yet expert-reviewed" };
  if (st === "updated") return { status: st, text: `Updated since last review (reviewed by ${record.role}, ${record.date})` };
  return { status: st, text: `Expert-reviewed by ${record.role}, ${record.date}` };
}
