import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const tokens = JSON.parse(await readFile(new URL("../kit/design/tokens.json", import.meta.url), "utf8"));
const css = await readFile(new URL("../kit/styles/system.css", import.meta.url), "utf8");
const block = (sel) => { const i = css.indexOf(`${sel} {`); assert.ok(i >= 0, `${sel} in system.css`); return css.slice(i, css.indexOf("}", i)); };
const val = (b, name) => b.match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1].trim();

test("system.css holds exactly the values in kit/design/tokens.json", () => {
  const root = block(":root"), light = block(':root[data-theme="light"]');
  for (const [k, v] of Object.entries(tokens.font)) assert.equal(val(root, `ds-font-${k}`), v, `font ${k}`);
  for (const [k, t] of Object.entries(tokens.type)) assert.equal(val(root, `ds-${k}`), t.size, `type ${k}`);
  for (const [k, v] of Object.entries(tokens.space)) assert.equal(val(root, `ds-space-${k}`), v, `space ${k}`);
  for (const [k, v] of Object.entries(tokens.radius)) assert.equal(val(root, `ds-radius-${k}`), v, `radius ${k}`);
  for (const [k, v] of Object.entries(tokens.width)) assert.equal(val(root, `ds-width-${k}`), v, `width ${k}`);
  for (const [k, v] of Object.entries(tokens.motion)) assert.equal(val(root, `ds-${k}`), v, `motion ${k}`);
  for (const [k, v] of Object.entries(tokens.colour.dark)) assert.equal(val(root, `ds-${k}`), v, `dark ${k}`);
  for (const [k, v] of Object.entries(tokens.colour.light)) assert.equal(val(light, `ds-${k}`), v, `light ${k}`);
});

test("the accent passes WCAG AA for white button text in both themes", () => {
  const lum = (hex) => { const c = hex.match(/\w\w/g).map((x) => { const v = parseInt(x, 16) / 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
  for (const t of ["light", "dark"]) assert.ok(1.05 / (lum(tokens.colour[t].accent) + 0.05) >= 4.5, `${t} accent`);
  assert.ok((lum("#ffffff") + 0.05) / (lum(tokens.colour.light["fg-2"]) + 0.05) >= 4.5, "secondary text on white");
});

test("status colours pass WCAG AA on their own backgrounds, and secondary text on every surface, in both themes", () => {
  const lum = (hex) => { const c = hex.match(/\w\w/g).map((x) => { const v = parseInt(x, 16) / 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  for (const t of ["light", "dark"]) {
    const c = tokens.colour[t];
    for (const s of ["success", "warning", "danger"]) assert.ok(ratio(c[s], c[`${s}-bg`]) >= 4.5, `${t} ${s}`);
    for (const bg of ["bg", "bg-alt", "surface"]) assert.ok(ratio(c["fg-2"], c[bg]) >= 4.5, `${t} fg-2 on ${bg}`);
    for (const bg of ["bg", "surface"]) assert.ok(ratio(c.link, c[bg]) >= 4.5, `${t} link on ${bg}`);
  }
});

test("components take every colour from the tokens and never need !important", () => {
  const rules = css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/:root(\[data-theme="light"\])? \{[^}]*\}/g, "");
  assert.doesNotMatch(rules, /!important/);
  // the only literal colours left are the brand spectrum (one phrase per page) and shadows
  const literal = rules.split("\n").filter((l) => /#[0-9a-f]{3,8}\b/i.test(l) && !/ds-spectrum|box-shadow|color-mix\(in srgb, var\(--ds-[a-z-]+\) \d+%, #fff\)/.test(l));
  assert.deepEqual(literal, []);
});
