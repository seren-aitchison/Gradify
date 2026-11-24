// Real product screenshots for the feature pages: each feature opened in the actual app (served from this repository,
// no account, nothing faked), cropped to the feature, saved as assets/screens/features/<slug>.jpg and shown on its page
// (scripts/seo/features.mjs). A feature whose screen needs an account or data to look like anything is left out
// (SKIP), rather than showing an empty or signed-out screen.
//   node scripts/og/screenshots.mjs [--only <slug>]
import { existsSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { FEATURES, featureSlug } from "../../kit/data/features.js";

const root = new URL("../../", import.meta.url), R = fileURLToPath(root);
// where to open each feature when its homepage link isn't a screen of its own, and a step to show it working
const press = (label) => async (p) => { await p.getByRole("button", { name: label, exact: true }).first().click(); await p.waitForTimeout(2500); };
export const SCREENS = {
  "online-courses": { url: "scigradify/biology/" },
  "tutorials-and-simulations": { url: "scigradify/biology/#/lesson/u04-03" },
  "interim-quizzes": { url: "scigradify/biology/#/learn/u04" },
  "notes-studio": { url: "app.html#/new", step: async (p) => { await p.getByText("Try it with sample notes").click(); await p.waitForTimeout(2500); } },
  // tools that start with a picker: press their own button, so the screenshot shows what they make
  "story-posters": { url: "app.html#/tools/poster", step: press("Make the poster") },
  "key-terms-sheets": { url: "app.html#/tools/sheets", step: press("Get the resources") },
  "downloadable-resources": { url: "app.html#/tools/downloads", step: press("Get the resources") },
  "key-term-games": { url: "app.html#/tools/games", step: press("Play") },
  "audio-questions": { url: "app.html#/tools/audio", step: press("Start") },
  "explainer-videos": { url: "app.html#/tools/explain", step: press("Make the explainer") },
};
// screens that only show a sign-in prompt or an empty state without an account: no screenshot rather than a poor one
export const SKIP = new Set(["gradify-ai", "tutors", "student-mentors", "study-groups", "friends-and-school-leaderboards", "community-chats", "smart-reminders", "challenges", "reward-scheme", "xp-and-levels", "streaks", "heatmap", "gradify-tree", "projects-for-xp",
  // Pro features show the Pro panel to a visitor, and these open empty: a picture of a lock or a blank page sells nothing
  "adaptive-difficulty", "question-bank", "timed-quiz-mode", "notebook", "spidermaps"]);
export const screenFile = (slug) => `assets/screens/features/${slug}.jpg`;

export function targets() {
  return FEATURES.map((f) => { const slug = featureSlug(f), s = SCREENS[slug] || (f.href?.startsWith("app.html") ? { url: f.href } : null); return s && !SKIP.has(slug) ? { slug, name: f.n, ...s } : null; }).filter(Boolean);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { chromium } = createRequire(import.meta.url)("playwright");
  const TYPES = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".woff2": "font/woff2", ".json": "application/json", ".webmanifest": "application/manifest+json", ".wasm": "application/wasm" };
  const oi = process.argv.indexOf("--only"), only = oi > 0 ? process.argv[oi + 1] : null;
  const b = await chromium.launch(), ctx = await b.newContext({ viewport: { width: 1280, height: 820 }, deviceScaleFactor: 1.5, colorScheme: "light" });
  await ctx.route("**/*", (r) => { const u = new URL(r.request().url()); if (u.hostname !== "gradify.test") return r.abort(); let f = `${R}${decodeURIComponent(u.pathname).slice(1)}`; if (f.endsWith("/")) f += "index.html"; return existsSync(f) ? r.fulfill({ body: readFileSync(f), contentType: TYPES[f.slice(f.lastIndexOf("."))] || "application/octet-stream" }) : r.fulfill({ status: 404, body: "" }); });
  // a returning visitor who has dismissed the cookie banner and the first-run tour
  await ctx.addInitScript(() => { try { localStorage.setItem("gradify.consent", JSON.stringify({ v: 2, analytics: false, ads: false, at: "2026-11-24" })); localStorage.setItem("gradify.noanalytics", "1"); } catch {} });
  mkdirSync(new URL("assets/screens/features/", root), { recursive: true });
  const done = [];
  for (const t of targets().filter((x) => !only || x.slug === only)) {
    const p = await ctx.newPage();
    await p.goto(`http://gradify.test/${t.url}`, { waitUntil: "load" }); await p.waitForTimeout(1800);
    if (t.step) await t.step(p).catch((e) => console.error(`${t.slug}: step failed (${e.message.split("\n")[0]})`));
    // crop to the main column (the app's sidebar is the same on every screen)
    const box = await p.evaluate(() => { const m = document.querySelector("main, #view, #course, .app-main") || document.body; const r = m.getBoundingClientRect(); return { x: Math.max(0, r.left - 8), y: Math.max(0, r.top - 8), w: Math.min(innerWidth - Math.max(0, r.left - 8), 1000), h: Math.min(innerHeight, 820) - Math.max(0, r.top - 8) }; });
    const tmp = `${R}${screenFile(t.slug)}.png`;
    await p.screenshot({ path: tmp, clip: { x: box.x, y: box.y, width: box.w, height: box.h } });
    execFileSync("python3", ["-I", "-c", "import sys,os;from PIL import Image;im=Image.open(sys.argv[1]).convert('RGB');im.save(sys.argv[2],'JPEG',quality=82,optimize=True,progressive=True);os.remove(sys.argv[1])", tmp, `${R}${screenFile(t.slug)}`]);
    done.push(t.slug); await p.close();
  }
  await b.close();
  console.log(`${done.length} screenshots: ${done.join(", ")}`);
}
