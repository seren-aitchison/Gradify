// One HTML escape for the whole kit (kit/core/text.js). Markup is built with innerHTML in hundreds of places, so the
// escape has to be right everywhere: safe in text and in attributes quoted either way, and the same in every file.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { esc } from "../kit/core/text.js";
import { esc as storeEsc } from "../kit/ui/store.js";
import { esc as kbEsc } from "../kit/notes/kb/model.js";

test("esc escapes the five characters that matter in HTML text and attributes", () => {
  assert.equal(esc(`<img src=x onerror="a('b')"> & co`), "&lt;img src=x onerror=&quot;a(&#39;b&#39;)&quot;&gt; &amp; co");
  assert.equal(esc(null), ""); assert.equal(esc(undefined), ""); assert.equal(esc(0), "0"); assert.equal(esc(12.5), "12.5");
  assert.equal(esc("&amp;"), "&amp;amp;", "escapes once, as text, every time");
});

test("the modules that re-export esc hand out the same function", () => {
  assert.equal(storeEsc, esc); assert.equal(kbEsc, esc);
});

test("no file writes its own HTML escape: each imports esc from kit/core/text.js", () => {
  const files = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "kit/*.js", "assets/*.js"], { encoding: "utf8" })
    .split("\0").filter((f) => f && !f.startsWith("kit/vendor/") && f !== "kit/core/text.js" && f !== "kit/intel/ical.js"); // ical.js escapes iCalendar text, not HTML
  const own = [];
  for (const f of files) {
    let text; try { text = readFileSync(f, "utf8"); } catch { continue; }
    if (/\bconst esc\s*=|function esc\s*\(/.test(text)) own.push(`${f}: defines esc`);
    if (/replace\(\/<\/g,\s*["']&lt;["']\)|["']<["']:\s*["']&lt;["']/.test(text)) own.push(`${f}: escapes < by hand`);
  }
  assert.deepEqual(own, []);
});
