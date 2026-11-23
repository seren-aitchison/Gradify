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
