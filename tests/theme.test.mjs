// Light mode: every stylesheet uses theme tokens (scripts/theme-tokens.mjs finds nothing left to convert), every page
// sets the theme before it paints (kit/core/theme-boot.js), and both themes define every token.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { FILES, tokenise } from "../scripts/theme-tokens.mjs";

test("no hard-coded dark-theme colours are left in the stylesheets", () => {
  for (const f of FILES) assert.equal(tokenise(readFileSync(f, "utf8")).changed, 0, `${f}: run node scripts/theme-tokens.mjs`);
});

test("the tokeniser converts each kind of colour and leaves shadows and coloured buttons alone", () => {
  const { css } = tokenise(`.a { color: #fff; border: 1px solid rgba(255, 255, 255, .1); box-shadow: 0 0 9px rgba(0, 0, 0, .5); }
.b { background: linear-gradient(90deg, #4641ff, #f055dd); color: #fff; }
.c { background: #fff; color: #000; }
.d { background: rgba(20, 20, 20, .6); }
.e { color: #a9a6ff; }`);
  assert.match(css, /\.a \{ color: var\(--fg\); border: 1px solid rgba\(var\(--ink-rgb\), \.1\); box-shadow: 0 0 9px rgba\(0, 0, 0, \.5\)/);
  assert.match(css, /\.b \{[^}]*color: #fff/);
  assert.match(css, /\.c \{ background: var\(--invert-bg\); color: var\(--invert-fg\)/);
  assert.match(css, /rgba\(var\(--surface-rgb\), \.6\)/);
  assert.match(css, /color: #a9a6ff;\s*color: light-dark\(#[0-9a-f]{6}, #a9a6ff\)/);
  assert.equal(tokenise(css).changed, 0, "a second run changes nothing");
});

test("every page loads the theme script straight after the base stylesheet", () => {
  const pages = execSync("git ls-files '*.html'").toString().trim().split("\n");
  let n = 0;
  for (const f of pages) {
    const s = readFileSync(f, "utf8");
    if (!s.includes("kit/styles/base.css")) continue;
    n++;
    assert.match(s, /kit\/styles\/base\.css"[^>]*>\s*<script src="[^"]*kit\/core\/theme-boot\.js"><\/script>/, f);
  }
  assert.ok(n > 150);
});

test("both themes define the colour tokens", () => {
  const base = readFileSync("kit/styles/base.css", "utf8");
  const block = (sel) => base.slice(base.indexOf(sel), base.indexOf("}", base.indexOf(sel)));
  for (const t of ["--bg", "--fg", "--mute", "--faint", "--ink-rgb", "--surface-rgb", "--sink-rgb", "--invert-bg", "--invert-fg", "--panel"]) {
    assert.ok(block(":root {").includes(`${t}:`), `dark ${t}`);
    assert.ok(block(':root[data-theme="light"] {').includes(`${t}:`), `light ${t}`);
  }
});
