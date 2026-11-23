// Every topic card on a subject site's homepage (kit/core/site-content.js, rendered by kit/core/subsite-home.js) opens
// a real destination for that topic, or is shown without a link. None falls back to the generic app (app.html): a
// student who clicks "Biology" must land in Biology, not on an unrelated notes-upload page.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { SITES_CONTENT } from "../kit/core/site-content.js";

const root = new URL("../", import.meta.url);
const exists = (p) => access(new URL(p, root)).then(() => true, () => false);
const read = (p) => readFile(new URL(p, root), "utf8");
const index = JSON.parse(await read("kit/data/search-index.json"));
const appMain = await read("kit/app/main.js"), tools = await read("kit/tools/tools.js");
// app routes: the ones in the routes object and every `routes.x =` assignment
const appRoutes = new Set([...appMain.match(/const routes = \{([^}]*)\}/)[1].matchAll(/(\w+):/g)].map((m) => m[1]).concat([...appMain.matchAll(/routes\.(\w+) =/g)].map((m) => m[1])));
const toolNames = new Set([...tools.matchAll(/tool === "(\w+)"/g)].map((m) => m[1]).concat([...tools.matchAll(/#\/tools\/(\w+)/g)].map((m) => m[1])));
const dirOf = (site) => site.toLowerCase().split(" ")[0];

/** Why a destination isn't real, or null when it is. `from` is the site's folder; href is relative to it, or /site/… */
async function problem(from, href) {
  if (/^(https?:)?\/\//.test(href)) return "external link";
  const [path, hash = ""] = href.split("#");
  const folder = path.startsWith("/") ? path.slice(1) : `${from}/${path}`;
  if (/(^|\/)app\.html$/.test(folder)) {
    const m = hash.match(/^\/(\w+)(?:\/(\w+))?/);
    if (!m) return "the generic app, not a destination";
    if (!appRoutes.has(m[1])) return `no app route #/${m[1]}`;
    if (m[1] === "tools" && m[2] && !toolNames.has(m[2])) return `no tool #/tools/${m[2]}`;
    return null;
  }
  if (!(await exists(`${folder.replace(/\/?$/, "/")}index.html`))) return `no page at /${folder}`;
  if (!hash) return null;
  // a course page: its course, then the unit, lesson or practice the hash names
  const html = await read(`${folder.replace(/\/?$/, "/")}index.html`);
  const slug = html.match(/kit\/courses\/([a-z0-9-]+)\/course\.js/)?.[1];
  if (!slug) return `/${folder} isn't a course page`;
  const course = index.courses.find((c) => c.s === slug);
  let m;
  if ((m = hash.match(/^\/learn\/(u\d+)$/))) return course.units.some((u) => u[0] === m[1]) ? null : `no unit ${m[1]} in ${slug}`;
  if ((m = hash.match(/^\/lesson\/(u\d+-\d+)$/))) return course.units.some((u) => u[3].some((l) => l[0] === m[1])) ? null : `no lesson ${m[1]} in ${slug}`;
  if (hash === "/write") return /writing:\s*WRITING/.test(await read(`kit/courses/${slug}/course.js`)) ? null : `${slug} has no written practice`;
  return `unrecognised course route #${hash}`;
}

test("every topic card has a real destination or none, never the generic app", async () => {
  const bad = [];
  let cards = 0, linked = 0;
  for (const [site, c] of Object.entries(SITES_CONTENT)) {
    for (const t of c.topics) {
      cards++;
      assert.equal(t.length, 3, `${site} "${t[0]}": [title, description, destination or null]`);
      const href = t[2];
      if (href === null) continue;
      assert.equal(typeof href, "string", `${site} "${t[0]}"`);
      linked++;
      // a card opens something; it never creates something (a tool's "new" route, or the mind map maker, which makes and saves
      // a blank map on opening and can use a free allowance)
      if (/#\/tools\/\w+\/new$|#\/tools\/map(\/|$)/.test(href)) { bad.push(`${site} "${t[0]}" → ${href}: creates something just by being opened`); continue; }
      const why = await problem(dirOf(site), href);
      if (why) bad.push(`${site} "${t[0]}" → ${href}: ${why}`);
    }
  }
  assert.deepEqual(bad, []);
  assert.ok(cards >= 186 && linked / cards > 0.9, `${linked} of ${cards} cards linked`);
});

test("the homepage template never links a topic card to the generic app", async () => {
  const src = await read("kit/core/subsite-home.js");
  const fn = src.slice(src.indexOf("function topicCard"), src.indexOf("\n}\n", src.indexOf("function topicCard")));
  assert.ok(fn.length > 0, "topicCard() renders the cards");
  assert.doesNotMatch(fn, /app\.html/);
  assert.match(src, /c\.topics\.map\(\(\[t, d, href\]\) => topicCard\(t, d, href\)\)/);
});

test("the destination check itself catches broken and generic destinations", async () => {
  assert.equal(await problem("lawgradify", "course/#/learn/u03"), null);
  assert.match(await problem("lawgradify", "app.html"), /generic app/);
  assert.match(await problem("lawgradify", "course/#/learn/u99"), /no unit u99/);
  assert.match(await problem("lawgradify", "course/#/lesson/u01-999"), /no lesson/);
  assert.match(await problem("lawgradify", "app.html#/nowhere"), /no app route/);
  assert.match(await problem("lawgradify", "app.html#/tools/nothing"), /no tool/);
  assert.match(await problem("lawgradify", "/nosuchgradify/course/"), /no page/);
});
