// Fetch Search Console performance (query × page, last 28 complete days) into data/growth/inputs/gsc-<date>.json.
//   GSC_ACCESS_TOKEN=… node scripts/growth/gsc-fetch.mjs [--site sc-domain:getgradify.com] [--days 28]
// The token is an OAuth 2 access token with the https://www.googleapis.com/auth/webmasters.readonly scope, e.g. from
// `gcloud auth print-access-token` for an account (or service account) added as a user on the Search Console property.
// Read-only: it calls searchAnalytics.query and nothing else. Without a token it says so and exits; it never invents data.
import { writeFileSync, mkdirSync } from "node:fs";
import { INPUTS } from "./sources.mjs";

/** the request body for one page of results (Search Console returns at most 25,000 rows per call) */
export function requestBody({ end, days = 28, startRow = 0, dimensions = ["query", "page"] }) {
  const e = new Date(`${end}T00:00:00Z`), s = new Date(e); s.setUTCDate(s.getUTCDate() - (days - 1));
  return { startDate: s.toISOString().slice(0, 10), endDate: e.toISOString().slice(0, 10), dimensions, rowLimit: 25000, startRow, dataState: "final" };
}

export async function fetchAll({ site, token, end, days, fetchImpl = fetch }) {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`;
  const rows = [];
  for (let startRow = 0; ; startRow += 25000) {
    const res = await fetchImpl(url, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(requestBody({ end, days, startRow })) });
    if (!res.ok) throw new Error(`Search Console said ${res.status}: ${(await res.text()).slice(0, 300)}`);
    const j = await res.json(); rows.push(...(j.rows || []));
    if (!j.rows || j.rows.length < 25000) break;
  }
  return { site, ...requestBody({ end, days }), rows };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
  const token = process.env.GSC_ACCESS_TOKEN;
  if (!token) { console.error("No GSC_ACCESS_TOKEN: nothing fetched. See the comment at the top of this file, or export Performance as CSV into data/growth/inputs/."); process.exit(2); }
  // Search Console's data is final about 3 days behind
  const end = new Date(Date.now() - 3 * 864e5).toISOString().slice(0, 10);
  const out = await fetchAll({ site: arg("--site", "sc-domain:getgradify.com"), token, end, days: Number(arg("--days", 28)) });
  mkdirSync(INPUTS, { recursive: true });
  writeFileSync(new URL(`gsc-${end}.json`, INPUTS), JSON.stringify(out));
  console.log(`${out.rows.length} rows, ${out.startDate} to ${out.endDate}, saved to data/growth/inputs/gsc-${end}.json`);
}
