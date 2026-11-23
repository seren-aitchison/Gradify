// IndexNow: tells Bing, Yandex, Seznam, Naver and the AI search engines that use Bing's index which pages changed, so
// they're crawled within minutes instead of weeks. The key is public by design: https://getgradify.com/<key>.txt proves
// the site owns it (scripts/seo/folders.mjs).
//   node scripts/indexnow.mjs                 every page in sitemap.xml
//   node scripts/indexnow.mjs --since <ref>   only pages whose files changed since a git ref (CI: the previous deploy)
//   node scripts/indexnow.mjs --dry-run       print what would be sent
import { execFileSync } from "node:child_process";
import { sitemapUrls } from "./build-sitemap.mjs";
import { INDEXNOW_KEY } from "./seo/folders.mjs";

const ORIGIN = "https://getgradify.com";
const arg = (n) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : null; };

/** the sitemap URLs whose source file is among `changed` (repository paths) */
export function changedUrls(urls, changed) {
  const set = new Set(changed);
  return urls.filter((u) => { let p = u.slice(ORIGIN.length + 1); if (p === "" || p.endsWith("/")) p += "index.html"; return set.has(p); });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  let urls = await sitemapUrls();
  const since = arg("--since");
  if (since) {
    let changed = [];
    try { changed = execFileSync("git", ["diff", "--name-only", since, "HEAD"], { encoding: "utf8" }).split("\n").filter(Boolean); } catch { console.log("indexnow: couldn't diff; sending nothing"); process.exit(0); }
    urls = changedUrls(urls, changed);
  }
  if (!urls.length) { console.log("indexnow: nothing changed"); process.exit(0); }
  const body = { host: "getgradify.com", key: INDEXNOW_KEY, keyLocation: `${ORIGIN}/${INDEXNOW_KEY}.txt`, urlList: urls.slice(0, 10000) };
  if (process.argv.includes("--dry-run")) { console.log(JSON.stringify(body, null, 1)); process.exit(0); }
  const res = await fetch("https://api.indexnow.org/indexnow", { method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" }, body: JSON.stringify(body) });
  console.log(`indexnow: ${urls.length} URL(s) → HTTP ${res.status}`);
  if (res.status >= 400 && res.status !== 429) process.exitCode = 1;
}
