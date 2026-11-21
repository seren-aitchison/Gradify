// Gradify Visual Learning Engine: the chemistry renderers (the curly-arrow mechanisms, structures and spectra are
// drawn with RDKit by scripts/diagrams/chem.py). Each renderer draws a wide (desktop) and a narrow (phone) layout and
// recomputes the chemistry the spec states, so a drawing that says something false fails the build:
//
//   trend       values against the cited dataset (kit/diagrams/data/chemistry.js); dips, maxima, jumps and orders
//   orbitals    electron configurations from the Aufbau order with its exceptions; ions lose 4s before 3d
//   atom        protons, neutrons and electrons from Z, A and charge; shells filled 2, 8, 8
//   particles   atoms of each element conserved across a change; element, compound or mixture from the contents
//   cycle       Hess's law: every route between two states gives the same enthalpy change
//   titration   pH from the charge balance at every volume; equivalence, half-equivalence and indicator choice
//
// The diagrams sit on white glass cards (kit/styles/components.css .vx), so fixed colours are safe on them.
import { register, svg, text, line, arrow, col, f1, esc, near, check, wrap } from "./renderers.js";
import { DATA } from "./data/chemistry.js";
import { parseFormula, balanced, configuration, readConfig, sameConfig, configText, unpairedIn, shells, ORDER, CAP, Z, ascii } from "./chem-core.js";

const C = { ink: "var(--vx-ink, #151826)", soft: "var(--vx-soft, #5b6275)", line: "var(--vx-line, #8a92a8)", grid: "var(--vx-grid, #e6e8f0)", panel: "var(--vx-panel, #f4f5fb)" };
// subscript digits in formulae and superscript charges, written in the text() markup: H2O → H_{2}O, SO4^2- → SO_{4}^{2−}
export function fm(s) {
  // keeps state symbols; a bare charge after a formula (Na+, Cl−, e−) becomes a superscript too. A charge may be
  // followed by "/" in a redox couple (Fe3+/Fe2+). One element: the digit is the charge (Fe3+). Several elements: the
  // digits are counts and the sign is a charge of 1 (NH4+, MnO4−). A complex ion's charge follows "]" ([Cu(H2O)6]2+).
  const q1 = (q) => (q === "+" ? "+" : "−"), END = "(?=$|[\\s(),;:/])";
  return ascii(s, true).replace(/\^([+-]\d+)/g, (_, q) => `^{${q.replace("-", "−")}}`).replace(/\^(\d*[+-])/g, (_, q) => `^{${q.replace("-", "−")}}`).replace(/\^(\d+)/g, "^{$1}")
    .replace(new RegExp(`(^|[\\s(+/])(\\d*)([A-Z][a-z]?)(\\d)([+−-])${END}`, "g"), (_, b, c, el, n, q) => `${b}${c}${el}^{${n}${q1(q)}}`)
    .replace(new RegExp(`(^|[\\s(+/])((?:[A-Z][a-z]?\\d*|\\([^()\\s]*\\)\\d*){2,})([+−-])${END}`, "g"), (_, b, f, q) => `${b}${f}^{${q1(q)}}`)
    .replace(new RegExp(`\\](\\d*)([+−-])${END}`, "g"), (_, n, q) => `]^{${n}${q1(q)}}`)
    .replace(/([A-Za-z\]])([+−-])(?=$|[\s(,;:/])/g, (_, a, q) => `${a}^{${q1(q)}}`)
    .replace(/([A-Za-z)\]])(\d+)/g, "$1_{$2}");
}
const rng = (seed) => { let h = 2166136261; for (const c of String(seed)) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 100000) / 100000; }; };

// ======================================================================== trend
// spec: dataset, kind: "bars" | "line" | "ladder" | "series", items: [{key, label?, value}], yLabel, log, range: [lo, hi],
//   highlight: {key: colour}, notes: [{key, text}], series: [{label, keys, colour}] with xLabels (kind "series"),
//   claims: [{type: "increasing"|"decreasing", keys} | {type: "dip", key, after} | {type: "max"|"min", key, keys?}
//            | {type: "jump", after, factor} | {type: "order", keys}]
function trendValues(spec) {
  const out = {};
  for (const it of spec.items || []) out[it.key] = it.value;
  for (const s of spec.series || []) for (const [k, v] of Object.entries(s.values || {})) out[k] = v;
  return out;
}
function trend(spec, W, narrow) {
  const H = spec.height?.[narrow ? 1 : 0] || (narrow ? 360 : 360);
  // a series key (point-labelled series) takes the bottom row; an x title then goes on the row above it
  const keyBelow = spec.kind === "series" && spec.pointLabels && (spec.series || []).some((sr) => sr.label);
  const pad = { l: narrow ? 56 : 66, r: 18, t: 34, b: spec.kind === "ladder" ? 20 : 62 + (keyBelow && spec.xTitle ? 20 : 0) };
  const vals = trendValues(spec), all = Object.values(vals);
  const log = !!spec.log;
  const [lo, hi] = spec.range || [Math.min(0, ...all), Math.max(...all) * 1.12];
  const tr = (v) => (log ? Math.log10(v) : v);
  const sy = (v) => H - pad.b - ((tr(v) - tr(lo)) / (tr(hi) - tr(lo))) * (H - pad.t - pad.b);
  let s = "";
  if (spec.kind === "ladder") return { s: ladder(spec, W, H, narrow), H };
  const items = spec.kind === "series" ? spec.xLabels.map((l) => ({ key: l, label: l })) : spec.items;
  const n = items.length, slot = (W - pad.l - pad.r) / n, sx = (i) => pad.l + slot * (i + 0.5);
  const lblSize = narrow && n > 10 ? 9.5 : n > 14 ? 10.5 : 12;
  // category labels: on one line when they fit the slot, else wrapped at spaces, else turned (and then set clear of
  // each other rather than overprinted: 'stomach acid', 'lemon' and 'vinegar' on a phone), with room made below
  const raw = items.map((it) => String(it.label ?? it.key)), cwid = (t) => ascii(t).length * lblSize * 0.52, fitN = Math.max(3, Math.floor((slot - 4) / (lblSize * 0.52)));
  const turn = narrow && n > 12 ? -60 : raw.some((t) => t.split(" ").some((w) => cwid(w) > slot - 4)) ? -40 : 0;
  if (turn === -40) pad.b = Math.max(pad.b, 26 + Math.max(...raw.map(cwid)) * 0.66 + (spec.xTitle ? 18 : 0));
  // labels wrapped onto a third line or more push the axis title (and the key) down by a line each
  else if (!turn) pad.b += 14 * Math.max(0, Math.max(...raw.map((t) => wrap(t, cwid(t) > slot - 4 ? fitN : 99).length)) - 2);
  // axes and gridlines
  const ticks = spec.ticks || (log ? [] : niceTicks(lo, hi, 5));
  for (const t of ticks) s += line(pad.l, sy(t), W - pad.r, sy(t), { stroke: C.grid, w: 1 }) + text(pad.l - 8, sy(t), fmtNum(t), { size: 11.5, anchor: "end", fill: C.soft });
  s += line(pad.l, pad.t - 6, pad.l, H - pad.b, { stroke: C.ink, w: 1.6 });
  const zeroY = sy(log ? lo : Math.max(lo, Math.min(0, hi)));
  s += line(pad.l, zeroY, W - pad.r, zeroY, { stroke: C.ink, w: 1.6 });
  s += text(pad.l - 4, pad.t - 18, spec.yLabel || "", { size: 12.5, weight: 600, anchor: "start", fill: C.soft });

  items.forEach((it, i) => {
    const lab = fm(raw[i]);
    if (turn) s += text(sx(i), H - pad.b + 14, lab, { size: lblSize, weight: narrow && n > 12 ? 500 : 600, fill: C.ink }).replace("<text", `<text transform="rotate(${turn} ${f1(sx(i))} ${f1(H - pad.b + 14)})" text-anchor="end"`).replace(/text-anchor="middle"/, "");
    else wrap(raw[i], cwid(raw[i]) > slot - 4 ? fitN : 99).forEach((l, k) => { s += text(sx(i), H - pad.b + 16 + k * 14, fm(l), { size: lblSize, weight: 600, fill: C.ink }); });
  });
  if (spec.xTitle) s += text((pad.l + W - pad.r) / 2, H - (keyBelow ? 36 : 14), spec.xTitle, { size: 12.5, weight: 600, fill: C.soft });
  const pl = [], ends = []; let keyRow = false;
  if (spec.kind === "bars") {
    const bw = Math.min(46, slot * 0.66);
    items.forEach((it, i) => {
      const v = it.value, y0 = sy(log ? lo : 0), y1 = sy(v);
      const colour = col(spec.highlight?.[it.key] || spec.colour || "a1");
      s += `<rect x="${f1(sx(i) - bw / 2)}" y="${f1(Math.min(y0, y1))}" width="${f1(bw)}" height="${f1(Math.max(1, Math.abs(y1 - y0)))}" rx="4" fill="${colour}" fill-opacity="${spec.highlight?.[it.key] ? 0.95 : 0.78}"/>`;
      // a value label that would reach the axis title goes inside the top of its bar
      const inside = (v >= 0 || log) && y1 - 9 < pad.t + 4 && Math.abs(y1 - y0) > 22;
      if (spec.showValues !== false && (!narrow || n <= 8)) s += text(sx(i), inside ? y1 + 11 : v >= 0 || log ? y1 - 9 : y1 + 11, fmtNum(v), { size: narrow ? 10.5 : 11.5, weight: 600, fill: inside ? "#fff" : C.ink });
    });
  } else {
    const series = spec.kind === "series" ? spec.series.map((sr) => ({ ...sr, pts: sr.keys.map((k, i) => (k == null ? null : [sx(i), sy(vals[k]), k])) })) : [{ colour: spec.colour || "a1", pts: items.map((it, i) => [sx(i), sy(it.value), it.key]) }];
    // point labels are set clear of each other within each column, on halos, after every line; with point labels
    // the series are named in a key under the axis instead of at their ends, where they would pile up
    keyRow = spec.kind === "series" && spec.pointLabels && series.some((sr) => sr.label);
    for (const sr of series) {
      const pts = sr.pts.filter(Boolean);
      s += `<path d="${pts.map(([x, y], i) => `${i ? "L" : "M"}${f1(x)} ${f1(y)}`).join(" ")}" fill="none" stroke="${col(sr.colour)}" stroke-width="2.6" stroke-linejoin="round"/>`;
      for (const [x, y, k] of pts) {
        s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${spec.highlight?.[k] ? 6 : 4.5}" fill="${col(spec.highlight?.[k] || sr.colour)}" stroke="#fff" stroke-width="1.5"/>`;
        if (spec.kind === "series" && spec.pointLabels) pl.push({ x, y: y - 9, k, colour: sr.colour });
      }
      // at the right edge the name goes above and left of the end point, not on it; names are set apart below
      if (sr.label && !keyRow) { const [x, y] = pts.at(-1), edge = x + 10 > W - 60; ends.push({ x: edge ? x - 8 : x + 10, y: y + (sr.labelDy || 0) - (edge ? 13 : 0), label: sr.label, colour: sr.colour, anchor: edge ? "end" : "start" }); }
    }
  }
  ends.sort((a, b) => a.y - b.y);
  for (let i = ends.length - 2; i >= 0; i--) ends[i].y = Math.min(ends[i].y, ends[i + 1].y - 15);
  for (const e of ends) s += text(e.x, e.y, e.label, { size: 12, weight: 700, anchor: e.anchor, fill: col(e.colour), halo: true });
  if (spec.kind === "series") {
    const cols = new Map(); for (const p of pl) cols.set(p.x, [...(cols.get(p.x) || []), p]);
    for (const c of cols.values()) {
      c.sort((a, b) => a.y - b.y);
      for (let i = 1; i < c.length; i++) c[i].y = Math.max(c[i].y, c[i - 1].y + 13);
      for (const p of c) s += text(p.x + 8, p.y, fm(p.k), { size: 11, weight: 600, anchor: "start", fill: col(p.colour), halo: true });
    }
    if (keyRow) {
      const named = spec.series.filter((sr) => sr.label), kw = (W - pad.l) / named.length;
      named.forEach((sr, i) => { const x = pad.l + i * kw; s += line(x, H - 16, x + 16, H - 16, { stroke: col(sr.colour), w: 3 }) + text(x + 21, H - 16, sr.label, { size: narrow ? 11 : 12, weight: 700, anchor: "start", fill: col(sr.colour) }); });
    }
  }
  for (const nt of spec.notes || []) {
    const i = items.findIndex((it) => it.key === nt.key); if (i < 0) continue;
    const v = vals[nt.key], y = sy(v) + (nt.dy ?? -26);
    s += text(sx(i) + (nt.dx || 0), y, nt.text, { size: 11.5, weight: 600, fill: col(nt.colour || "a2"), anchor: nt.anchor || "middle" });
  }
  return { s, H };
}
function ladder(spec, W, H, narrow) {
  const pad = { t: 26, b: 26 };
  const vs = spec.items.map((i) => i.value), lo = Math.min(...vs), hi = Math.max(...vs);
  const y = (v) => H - pad.b - ((v - lo) / (hi - lo || 1)) * (H - pad.t - pad.b);
  const ax = narrow ? 150 : W / 2;
  let s = arrow(ax, H - 6, ax, 8, { w: 1.8, head: 9 });
  s += text(ax + 10, 12, spec.topLabel || "", { size: 12, weight: 600, anchor: "start", fill: col("a2") });
  s += text(ax + 10, H - 8, spec.bottomLabel || "", { size: 12, weight: 600, anchor: "start", fill: col("a1") });
  const placed = [];
  for (const it of [...spec.items].sort((a, b) => a.value - b.value)) {
    let yy = y(it.value); for (const p of placed) if (Math.abs(p - yy) < 15) yy = p - 15; placed.push(yy);
    s += line(ax - 8, y(it.value), ax + 8, y(it.value), { stroke: col(spec.highlight?.[it.key] || "ink"), w: 2.2 });
    s += text(ax - 14, yy, fm(it.label ?? it.key), { size: 12.5, weight: 600, anchor: "end", fill: col(spec.highlight?.[it.key] || "ink") });
    s += text(ax + 14, yy, `${it.value > 0 ? "+" : it.value < 0 ? "−" : ""}${Math.abs(it.value).toFixed(2)} ${spec.valueUnit || ""}`, { size: 12, anchor: "start", fill: C.soft });
  }
  return s;
}
function niceTicks(lo, hi, n) {
  const span = hi - lo, raw = span / n, mag = 10 ** Math.floor(Math.log10(raw)), step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((x) => x >= raw);
  const out = []; for (let t = Math.ceil(lo / step) * step; t <= hi + 1e-9; t += step) out.push(+t.toFixed(10)); return out;
}
const fmtNum = (v) => (Math.abs(v) >= 10000 ? v.toLocaleString("en-GB") : Number.isInteger(v) ? String(v).replace("-", "−") : String(+v.toFixed(2)).replace("-", "−"));
function trendChecks(spec) {
  const out = [], vals = trendValues(spec), ds = spec.dataset && DATA[spec.dataset];
  if (spec.dataset) {
    if (!ds) return [check(`dataset ${spec.dataset} exists`, false)];
    const bad = Object.entries(vals).filter(([k, v]) => ds.values[k] == null || !near(ds.values[k], v, 1e-9));
    out.push(check(`every value matches ${ds.name} (${ds.source})`, !bad.length, bad.length ? bad.map(([k, v]) => `${k}: drawn ${v}, data ${ds.values[k]}`).join("; ") : `${Object.keys(vals).length} values`));
  }
  for (const c of spec.claims || []) {
    const ks = c.keys || spec.items?.map((i) => i.key) || [];
    if (c.type === "increasing" || c.type === "decreasing") {
      const ok = ks.every((k, i) => !i || (c.type === "increasing" ? vals[k] > vals[ks[i - 1]] : vals[k] < vals[ks[i - 1]]));
      out.push(check(`${ks[0]} → ${ks.at(-1)}: ${c.type}`, ok, ks.map((k) => `${k} ${vals[k]}`).join(", ")));
    } else if (c.type === "dip") out.push(check(`${c.key} is lower than ${c.after} before it`, vals[c.key] < vals[c.after], `${c.after} ${vals[c.after]}, ${c.key} ${vals[c.key]}`));
    else if (c.type === "max" || c.type === "min") {
      const pick = ks.reduce((a, b) => ((c.type === "max" ? vals[b] > vals[a] : vals[b] < vals[a]) ? b : a));
      out.push(check(`${c.key} has the ${c.type === "max" ? "highest" : "lowest"} value`, pick === c.key, `found ${pick}`));
    } else if (c.type === "jumps") {
      // the named positions are exactly the largest ratios between successive values (e.g. a new shell)
      const ratios = ks.slice(1).map((k, j) => [ks[j], vals[k] / vals[ks[j]]]).sort((a, b) => b[1] - a[1]);
      const top = ratios.slice(0, c.after.length).map(([k]) => k);
      out.push(check(`the largest jumps come after ${c.after.join(" and ")}`, c.after.every((k) => top.includes(k)) && ratios[c.after.length - 1][1] >= (c.factor || 1),
        ratios.slice(0, c.after.length + 1).map(([k, r]) => `after ${k}: ×${r.toFixed(2)}`).join(", ")));
    } else if (c.type === "order") out.push(check(`order ${c.keys.join(" < ")}`, c.keys.every((k, i) => !i || vals[k] > vals[c.keys[i - 1]])));
    else if (c.type === "oxstate") {
      // the oxidation state of one element from the formula: O −2, H +1, F and Cl −1, the rest balances the charge
      for (const [k, f] of Object.entries(c.formulae)) {
        const { atoms, charge } = parseFormula(f), fixed = { O: -2, H: 1, F: -1, Cl: -1 };
        const others = Object.entries(atoms).filter(([e]) => e !== c.element).reduce((a, [e, n]) => a + (fixed[e] ?? 0) * n, 0);
        const os = (charge - others) / atoms[c.element];
        out.push(check(`${c.element} in ${f} is ${os > 0 ? "+" : ""}${os}`, near(os, vals[k], 1e-9), `drawn ${vals[k]}`));
      }
    }
  }
  return out;
}

// ======================================================================== orbitals
// spec: kind: "boxes" | "energy" | "diagonal", rows: [{label, symbol, charge, config, show: ["3d", "4s"], ml}]
const NBOX = { s: 1, p: 3, d: 5, f: 7 };
function fillBoxes(n, m) { const b = Array(m).fill(0); for (let k = 0; k < n; k++) b[k % m] += 1; return b; } // Hund: singly first
function boxGroup(x, y, sub, n, opt = {}) {
  const m = NBOX[sub.at(-1)], w = opt.w || 30, h = opt.h || 32, b = fillBoxes(n, m);
  let s = "";
  for (let i = 0; i < m; i++) {
    const bx = x + i * w;
    s += `<rect x="${f1(bx)}" y="${f1(y)}" width="${w}" height="${h}" fill="#fff" stroke="${C.ink}" stroke-width="1.6"/>`;
    const up = (cx) => arrow(cx, y + h - 6, cx, y + 6, { stroke: col("a1"), w: 2, head: 7 });
    const dn = (cx) => arrow(cx, y + 6, cx, y + h - 6, { stroke: col("a2"), w: 2, head: 7 });
    if (b[i] === 1) s += up(bx + w / 2);
    if (b[i] === 2) s += up(bx + w / 2 - 6) + dn(bx + w / 2 + 6);
    if (opt.ml) s += text(bx + w / 2, y - 9, String(i - (m - 1) / 2).replace("-", "−"), { size: 10.5, fill: C.soft });
  }
  s += text(x + (m * w) / 2, y + h + 15, sub, { size: 13, weight: 700, fill: C.ink });
  return { s, w: m * w };
}
function rowConfig(r) { return configuration(Z[r.symbol], r.charge || 0); }
function orbitals(spec, W, narrow) {
  if (spec.kind === "diagonal") return diagonal(spec, W, narrow);
  if (spec.kind === "energy") return energyBoxes(spec, W, narrow);
  // one row per atom or ion: on wide layouts the label sits left of its boxes, on phones above them
  const bw = narrow ? 24 : 30, gapG = narrow ? 10 : 18;
  const rows = spec.rows.map((r) => {
    const conf = rowConfig(r);
    const subs = r.show || Object.keys(conf).sort((a, b) => +a[0] - +b[0] || "spdf".indexOf(a.at(-1)) - "spdf".indexOf(b.at(-1)));
    return { r, conf, subs, w: subs.reduce((a, sb) => a + NBOX[sb.at(-1)] * bw + gapG, -gapG) };
  });
  const labelW = narrow ? 0 : Math.min(250, Math.max(...spec.rows.map((r) => (r.label || r.symbol).length * 7.6 + 24)));
  const boxesW = Math.max(...rows.map((x) => x.w)), x0 = narrow ? 14 : Math.max(16, (W - labelW - boxesW) / 2);
  let s = "", y = 16;
  for (const { r, conf, subs } of rows) {
    const ml = r.ml ? 14 : 0;
    if (narrow) { s += text(x0, y + 10, r.label || r.symbol, { size: 14, weight: 700, anchor: "start", fill: C.ink }); y += 26; }
    else s += text(x0, y + ml + 16, r.label || r.symbol, { size: 14.5, weight: 700, anchor: "start", fill: C.ink });
    if (r.note) { s += text(x0, y + ml + (narrow ? 4 : 34), r.note, { size: 11.5, anchor: "start", fill: C.soft }); if (narrow) y += 16; }
    let x = x0 + labelW, rowY = y + ml;
    for (const sub of subs) {
      const m = NBOX[sub.at(-1)];
      if (x + m * bw > W - 10) { x = x0 + labelW; rowY += 64; }
      const g = boxGroup(x, rowY, sub, conf[sub] || 0, { w: bw, ml: r.ml });
      s += g.s; x += g.w + gapG;
    }
    y = rowY + 32 + 15 + 22;
  }
  return { s, H: y };
}
function energyBoxes(spec, W, narrow) {
  const subs = spec.subshells || ORDER.slice(0, 8);
  const r = spec.rows?.[0], conf = r ? rowConfig(r) : {};
  const H = spec.height || (narrow ? 470 : 420), top = 30, bottom = H - 30;
  // heights by Aufbau order (not to scale), each n in its own column so 4s sits visibly below 3d
  const yOf = (i) => bottom - (i / (subs.length - 1)) * (bottom - top - 20);
  const colX = (sub) => (narrow ? 70 : 120) + (+sub[0] - 1) * (narrow ? 70 : 120) + ("spdf".indexOf(sub.at(-1)) ? 0 : 0);
  let s = arrow(narrow ? 30 : 50, bottom + 10, narrow ? 30 : 50, top - 10, { w: 1.6, head: 8 });
  s += text(narrow ? 22 : 40, (top + bottom) / 2, "energy", { size: 12, fill: C.soft }).replace("<text", `<text transform="rotate(-90 ${narrow ? 22 : 40} ${(top + bottom) / 2})"`);
  const bw = narrow ? 18 : 26;
  subs.forEach((sub, i) => {
    const m = NBOX[sub.at(-1)], x = colX(sub) + ("spdf".indexOf(sub.at(-1)) % 2 ? (narrow ? 0 : 10) : 0);
    const g = boxGroup(x, yOf(i) - 12, sub, conf[sub] || 0, { w: bw, h: 24 });
    s += g.s.replace(/<text([^>]*)>([^<]*)<\/text>$/, "");
    s += text(x - 8, yOf(i), sub, { size: 12.5, weight: 700, anchor: "end", fill: C.ink });
    if (m && spec.order) s += text(x + m * bw + 8, yOf(i), `${i + 1}`, { size: 11, anchor: "start", fill: col("a2"), weight: 700 });
  });
  if (r) s += text(W - 14, 18, `${r.label || r.symbol}: ${configText(conf).replace(/(\d)([spdf])(\d+)/g, "$1$2^{$3}")}`, { size: 12.5, weight: 600, anchor: "end", fill: C.ink });
  return { s, H };
}
function diagonal(spec, W, narrow) {
  const ls = "spdf", cw = narrow ? 56 : 74, rh = narrow ? 40 : 42, x0 = narrow ? 50 : W / 2 - 1.5 * cw, y0 = 30;
  const seq = madelung(19), pos = (n, l) => [x0 + l * cw, y0 + (n - 1) * rh];
  let s = "";
  // each diagonal (constant n + l) as one arrow behind the labels, from upper right to lower left
  for (let k = 1; k <= 8; k++) {
    const cells = seq.filter(([n, l]) => n + l === k);
    if (!cells.length) continue;
    const [xa, ya] = pos(...cells[0]), [xb, yb] = pos(...cells.at(-1));
    const ux = -cw, uy = rh, L = Math.hypot(ux, uy), dx = ux / L, dy = uy / L;
    s += arrow(xa - dx * 22, ya - dy * 22, xb + dx * 24, yb + dy * 24, { stroke: col("a2"), w: 1.8, head: 8 });
  }
  for (const [n, l] of seq) { const [x, y] = pos(n, l); s += `<text x="${f1(x)}" y="${f1(y)}" font-size="15" font-weight="700" text-anchor="middle" dominant-baseline="middle" fill="${C.ink}" stroke="#fff" stroke-width="6" paint-order="stroke">${n}${ls[l]}</text>`; }
  const order = seq.map(([n, l]) => `${n}${ls[l]}`);
  const yT = y0 + 7 * rh + 8;
  s += textWrap(narrow ? 14 : W / 2, yT, `Filling order: ${order.join(" → ")}`, narrow ? 44 : 84, { size: 12.5, weight: 600, anchor: narrow ? "start" : "middle", fill: C.ink });
  return { s, H: yT + (narrow ? 80 : 40) };
}
function textWrap(x, y, str, n, opt) { return wrap(str, n).map((l, i) => text(x, y + i * 17, l, opt)).join(""); }
/** The Madelung (n + l) rule, independently of ORDER: sort by n + l, then by n. */
function madelung(k) {
  const all = []; for (let n = 1; n <= 7; n++) for (let l = 0; l < Math.min(n, 4); l++) all.push([n, l]);
  return all.sort((a, b) => a[0] + a[1] - (b[0] + b[1]) || a[0] - b[0]).slice(0, k);
}
function orbitalChecks(spec) {
  const out = [];
  if (spec.kind === "diagonal" || spec.kind === "energy") {
    const m = madelung(19).map(([n, l]) => `${n}${"spdf"[l]}`);
    out.push(check("the n + l (Madelung) rule gives the filling order drawn", m.every((x, i) => x === ORDER[i]), m.join(" ")));
    if (spec.subshells) out.push(check("sub-shells are drawn in increasing energy (Aufbau) order", spec.subshells.every((x, i) => ORDER.indexOf(x) === ORDER.indexOf(spec.subshells[0]) + i), spec.subshells.join(" ")));
  }
  for (const r of spec.rows || []) {
    const conf = rowConfig(r), e = Z[r.symbol] - (r.charge || 0);
    const total = Object.values(conf).reduce((a, b) => a + b, 0);
    out.push(check(`${r.label || r.symbol}: ${e} electrons`, total === e, configText(conf)));
    if (r.config) out.push(check(`${r.label || r.symbol}: configuration ${r.config} is the ground state`, sameConfig(conf, readConfig(r.config)), `computed ${configText(conf)}`));
    if (r.unpaired != null) {
      const u = Object.entries(conf).reduce((a, [k, v]) => a + unpairedIn(v, NBOX[k.at(-1)]), 0);
      out.push(check(`${r.label || r.symbol}: ${r.unpaired} unpaired electron(s) by Hund's rule`, u === r.unpaired, `computed ${u}`));
    }
    if (r.show) out.push(check(`${r.label || r.symbol}: every occupied sub-shell is drawn`, Object.keys(conf).filter((k) => !r.hideCore || !r.hideCore.includes(k)).every((k) => r.show.includes(k) || (r.core || []).includes(k)), `occupied ${Object.keys(conf).join(" ")}`));
  }
  return out;
}

// ======================================================================== atom
// spec: atoms: [{symbol, A, charge, label, nuclide: true, claims: {protons, neutrons, electrons, shells: [2, 8, 1]}}]
function atom(spec, W, narrow) {
  const n = spec.atoms.length, perRow = narrow ? 1 : Math.min(n, spec.perRow || 3);
  const cell = narrow ? W - 20 : (W - 20) / perRow, R0 = spec.big ? 30 : 24;
  let s = "", maxY = 0;
  spec.atoms.forEach((a, i) => {
    const z = Z[a.symbol], e = z - (a.charge || 0), sh = shells(configuration(z, a.charge || 0)).filter((x, j, arr) => x || j < arr.length);
    const nSh = sh.length, step = narrow ? 26 : 24, Rmax = R0 + nSh * step;
    const cx = 10 + (i % perRow) * cell + cell / 2, cy = 26 + Math.floor(i / perRow) * (2 * Rmax + 90) + Rmax + (a.nuclide ? 26 : 0);
    if (a.nuclide) s += nuclide(cx, cy - Rmax - 22, a.symbol, a.A, z, a.charge);
    s += `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${R0}" fill="#fde7e3" stroke="${col("a3")}" stroke-width="1.6"/>`;
    s += text(cx, cy - 7, `${z} p`, { size: 12, weight: 700, fill: "#b4231a" }) + text(cx, cy + 9, `${a.A - z} n`, { size: 12, weight: 700, fill: "#5b6275" });
    sh.forEach((k, j) => {
      const r = R0 + (j + 1) * step;
      s += `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${r}" fill="none" stroke="${C.line}" stroke-width="1.3"/>`;
      for (let q = 0; q < k; q++) {
        // pairs on the four compass points, as GCSE diagrams draw them
        const ang = (k <= 2 ? [-90, 90][q] : (Math.floor(q / 2) * (360 / Math.ceil(k / 2)) - 90 + (q % 2 ? 14 : -14))) * Math.PI / 180;
        s += `<circle cx="${f1(cx + r * Math.cos(ang))}" cy="${f1(cy + r * Math.sin(ang))}" r="4.2" fill="${col("a1")}"/>`;
      }
    });
    const lab = a.label || `${a.symbol}${a.charge ? `^{${Math.abs(a.charge) > 1 ? Math.abs(a.charge) : ""}${a.charge > 0 ? "+" : "−"}}` : ""}`;
    s += text(cx, cy + Rmax + 22, lab, { size: 14, weight: 700, fill: C.ink });
    s += text(cx, cy + Rmax + 42, `${z} protons, ${a.A - z} neutrons, ${e} electrons`, { size: 11.5, fill: C.soft });
    if (a.charge) s += text(cx, cy + Rmax + 58, `charge ${z} − ${e} = ${a.charge > 0 ? "+" : "−"}${Math.abs(a.charge)}`, { size: 11.5, fill: C.soft });
    s += `<rect x="0" y="0" width="0" height="0"/>`;
    maxY = Math.max(maxY, cy + Rmax + (a.charge ? 66 : 50));
  });
  if (spec.legend !== false) s += `<circle cx="${W - 120}" cy="14" r="4.2" fill="${col("a1")}"/>` + text(W - 110, 14, "electron", { size: 11.5, anchor: "start", fill: C.soft });
  return { s, H: maxY + 8 };
}
function nuclide(x, y, sym, A, z, charge) {
  const q = charge ? `${Math.abs(charge) > 1 ? Math.abs(charge) : ""}${charge > 0 ? "+" : "−"}` : "";
  return `<text x="${f1(x + 8)}" y="${f1(y)}" font-size="22" font-weight="700" fill="${C.ink}" text-anchor="middle" dominant-baseline="middle">${esc(sym)}${q ? `<tspan baseline-shift="super" font-size="13">${q}</tspan>` : ""}</text>` +
    text(x - 6 - sym.length * 6, y - 9, String(A), { size: 13, weight: 600, anchor: "end", fill: C.ink }) + text(x - 6 - sym.length * 6, y + 10, String(z), { size: 13, weight: 600, anchor: "end", fill: C.ink });
}
function atomChecks(spec) {
  const out = [];
  for (const a of spec.atoms) {
    const z = Z[a.symbol], e = z - (a.charge || 0), sh = shells(configuration(z, a.charge || 0)).filter(Boolean);
    const c = a.claims || {};
    out.push(check(`${a.symbol}${a.charge ? ` (${a.charge > 0 ? "+" : ""}${a.charge})` : ""}: ${z} protons, ${a.A - z} neutrons, ${e} electrons from Z = ${z}, A = ${a.A}`,
      (c.protons ?? z) === z && (c.neutrons ?? a.A - z) === a.A - z && (c.electrons ?? e) === e, JSON.stringify(c)));
    out.push(check(`${a.symbol}: shells ${sh.join(", ")}`, !c.shells || c.shells.join() === sh.join(), c.shells ? `stated ${c.shells.join(", ")}` : "drawn from the configuration"));
    if (z > 20) out.push(check(`${a.symbol}: within the 2, 8, 8 shell model (Z ≤ 20)`, false));
  }
  return out;
}

// ======================================================================== particles
// spec: species: {key: {atoms: ["O", "H", "H"], shape: "single"|"linear"|"bent"|"trigonal"|"tetra"|"ion", charge}},
//   panels: [{title, container: "box"|"beaker", arrangement: "lattice"|"liquid"|"gas"|"random"|"layer", contents: [[key, n]],
//             fill: 0..1 (beaker), volume, note, region}], steps: [label] between panels,
//   claims: [{type: "conserved", panels: [i, j]} | {type: "classify", panel, as} | {type: "count", panel, species, n}
//            | {type: "concentration", more: i, less: j} | {type: "equation", eq}]
const EL = { H: ["#ffffff", 6], C: ["#3a3f4b", 9], O: ["#e0393e", 9], N: ["#3b6fe0", 9], Cl: ["#2fa84f", 10], Na: ["#8e5bd6", 9],
  Br: ["#a0522d", 10], S: ["#e0b000", 10], Mg: ["#6b8e23", 9], Cu: ["#c87533", 9], He: ["#7fd1e8", 7], Ne: ["#f08a5d", 7], Ar: ["#9a7fd1", 8],
  Fe: ["#8a5a44", 9], I: ["#6a2c91", 11], e: ["#4f46e5", 3.2], Li: ["#c08ad8", 8], Sn: ["#8f9bb3", 11.5], Ag: ["#c7ccd6", 10], Si: ["#d9b38c", 10], K: ["#b05bd6", 10], Ca: ["#5a9e8f", 9], Zn: ["#7d8597", 9], X: ["#9aa1b5", 9] };
function moleculeOffsets(sp) {
  const at = sp.atoms, k = at.length, r = (e) => (EL[e] || EL.X)[1];
  if (k === 1) return [[0, 0]];
  const d = (a, b) => (r(a) + r(b)) * 0.78;
  const c = at[0];
  const dirs = { linear: [0, 180], bent: [-52, 232], trigonal: [-90, 30, 150], tetra: [-45, 45, 135, 225], diatomic: [0] }[sp.shape || (k === 2 ? "diatomic" : k === 3 ? "linear" : k === 4 ? "trigonal" : "tetra")];
  if (k === 2) { const L = d(at[0], at[1]); return [[-L / 2, 0], [L / 2, 0]]; }
  if (sp.shape === "dimer" && k === 6) {
    // X2Y4 (N2O4): two bonded centres, each carrying two outer atoms
    const L = d(at[0], at[1]), M = d(at[0], at[2]);
    return [[-L / 2, 0], [L / 2, 0], [-L / 2 - M * 0.6, -M * 0.75], [-L / 2 - M * 0.6, M * 0.75], [L / 2 + M * 0.6, -M * 0.75], [L / 2 + M * 0.6, M * 0.75]];
  }
  if (k > 5) { const L = d(at[0], at[1]); return at.map((_, i) => (i ? [Math.cos((i * 2 * Math.PI) / (k - 1)) * L, Math.sin((i * 2 * Math.PI) / (k - 1)) * L] : [0, 0])); }
  return [[0, 0], ...at.slice(1).map((e, i) => { const a = (dirs[i] * Math.PI) / 180, L = d(c, e); return [Math.cos(a) * L, Math.sin(a) * L]; })];
}
function drawSpecies(spec, key, x, y, scale = 1) {
  const sp = spec.species[key], off = moleculeOffsets(sp);
  let s = "";
  const order = sp.atoms.map((e, i) => i).sort((a, b) => (sp.atoms[a] === "H") - (sp.atoms[b] === "H"));
  for (const i of [...order].reverse()) {
    const [c, r] = EL[sp.atoms[i]] || EL.X;
    s += `<circle cx="${f1(x + off[i][0] * scale)}" cy="${f1(y + off[i][1] * scale)}" r="${f1(r * scale)}" fill="${c}" stroke="#151826" stroke-width="1.1"/>`;
  }
  if (sp.charge) s += text(x + (EL[sp.atoms[0]] || EL.X)[1] * scale + 3, y - (EL[sp.atoms[0]] || EL.X)[1] * scale, `${Math.abs(sp.charge) > 1 ? Math.abs(sp.charge) : ""}${sp.charge > 0 ? "+" : "−"}`, { size: 11, weight: 800, anchor: "start", fill: C.ink });
  return s;
}
function speciesRadius(sp) { const off = moleculeOffsets(sp); return Math.max(...off.map(([x, y], i) => Math.hypot(x, y) + (EL[sp.atoms[i]] || EL.X)[1])); }
function particles(spec, W, narrow) {
  const n = spec.panels.length, perRow = narrow ? 1 : Math.min(n, spec.perRow || n);
  const gap = narrow ? 0 : spec.steps?.some(Boolean) ? 76 : 44, pw = narrow ? Math.min(W - 40, 300) : (W - 20 - (perRow - 1) * gap) / perRow, ph = spec.panelHeight || (narrow ? 200 : Math.min(200, pw * 0.9));
  let s = "", H = 0;
  const R = rng(spec.id);
  spec.panels.forEach((p, i) => {
    const row = Math.floor(i / perRow), colI = i % perRow;
    const x = narrow ? (W - pw) / 2 : 10 + colI * (pw + gap), y = 34 + row * (ph + (narrow ? 96 : 84));
    s += text(x + pw / 2, y - 14, p.title || "", { size: 13.5, weight: 700, fill: C.ink });
    const beaker = p.container === "beaker";
    let bx = x + 8, by = y + 8, bw = pw - 16, bh = ph - 16;
    if (beaker) {
      s += `<path d="M${f1(x + 4)} ${f1(y)} L${f1(x + 10)} ${f1(y + ph)} L${f1(x + pw - 10)} ${f1(y + ph)} L${f1(x + pw - 4)} ${f1(y)}" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linejoin="round"/>`;
      const fy = y + ph - (ph - 10) * (p.fill ?? 0.82);
      s += `<path d="M${f1(x + 4 + 6 * (fy - y) / ph)} ${f1(fy)} L${f1(x + 10)} ${f1(y + ph)} L${f1(x + pw - 10)} ${f1(y + ph)} L${f1(x + pw - 4 - 6 * (fy - y) / ph)} ${f1(fy)} Z" fill="#dbeafe" fill-opacity=".75"/>`;
      bx = x + 16; by = fy + 6; bw = pw - 32; bh = y + ph - fy - 12;
    } else if (p.container !== "none") s += `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(pw)}" height="${f1(ph)}" rx="12" fill="#f7f8fd" stroke="${C.line}" stroke-width="1.4"/>`;
    if (p.membrane) s += line(x + pw / 2, y + 4, x + pw / 2, y + ph - 4, { stroke: col("a5"), w: 2.4, dash: "6 5" });
    // the particle list, interleaved for an ionic lattice
    const list = [];
    if (p.arrangement === "lattice" && p.contents.length === 2 && p.contents[0][1] === p.contents[1][1] && p.alternate !== false) for (let k = 0; k < p.contents[0][1]; k++) list.push(p.contents[0][0], p.contents[1][0]);
    else for (const [k, c] of p.contents) for (let q = 0; q < c; q++) list.push(k);
    const maxR = Math.max(...list.map((k) => speciesRadius(spec.species[k])), 8);
    let pts;
    if (p.contents.some((c) => c[2])) {
      // items placed in their own region (each side of a membrane): all regions' particles avoid each other
      pts = [];
      list.length = 0;
      for (const region of ["left", "right", undefined]) {
        const items = []; for (const [k, c, rg] of p.contents) if (rg === region) for (let q = 0; q < c; q++) items.push(k);
        if (!items.length) continue;
        items.sort(() => R() - 0.5);
        const got = place(items.length, p.arrangement, bx, by, bw, bh, maxR, R, { ...p, region, avoid: pts });
        items.forEach((k, q) => { list.push(k); pts.push(got[q]); });
      }
    } else {
      // charged particles keep room for their charge labels between them
      const charged = list.some((k) => spec.species[k].charge);
      pts = place(list.length, p.arrangement, bx, by, bw, bh, maxR, R, { ...p, spacing: p.spacing ?? (charged ? 14 : 6) });
      if (p.arrangement !== "lattice" && p.arrangement !== "layer") list.sort(() => R() - 0.5);
    }
    list.forEach((k, q) => { if (pts[q]) s += drawSpecies(spec, k, pts[q][0], pts[q][1], (p.scale || 1) * (pts.scale || 1)); });
    if (p.overlay) { const R2 = rng(`${spec.id}${i}o`); for (const [k, c] of p.overlay) for (let q = 0; q < c; q++) s += drawSpecies(spec, k, bx + 6 + R2() * (bw - 12), by + 6 + R2() * (bh - 12)); }
    if (p.motion) pts.slice(0, Math.min(pts.length, 6)).forEach(([px, py], q) => { const a = R() * Math.PI * 2; s += arrow(px + Math.cos(a) * (maxR + 3), py + Math.sin(a) * (maxR + 3), px + Math.cos(a) * (maxR + 20), py + Math.sin(a) * (maxR + 20), { stroke: C.soft, w: 1.4, head: 6 }); });
    if (p.note) s += text(x + pw / 2, y + ph + 20, p.note, { size: 12, fill: C.soft });
    if (i < n - 1 && spec.steps?.[i] !== null) {
      const lab = spec.steps?.[i] || "";
      if (narrow || colI === perRow - 1) { if (narrow) { s += arrow(W / 2, y + ph + 30, W / 2, y + ph + 70, { w: 2.2, head: 9 }); if (lab) s += text(W / 2 + 12, y + ph + 50, lab, { size: 12, weight: 600, anchor: "start", fill: C.soft }); } }
      else { s += arrow(x + pw + 8, y + ph / 2, x + pw + gap - 8, y + ph / 2, { w: 2.2, head: 9, both: !!spec.reversible?.[i] }); if (lab) s += textWrap(x + pw + gap / 2, y + ph / 2 - 14 - 15 * (Math.ceil(lab.length / 11) - 1), lab, 11, { size: 11, weight: 600, fill: C.soft }); }
    }
    H = Math.max(H, y + ph + (p.note ? 34 : 16) + (narrow && i < n - 1 ? 66 : 0));
    if (narrow && i < n - 1 && spec.steps?.[i] === null) H -= 30;
  });
  // a key to the atoms used
  const els = [...new Set(Object.values(spec.species).flatMap((sp) => sp.atoms))];
  let kx = 14; const ky = H + 12;
  for (const e of els) { s += `<circle cx="${kx + 6}" cy="${ky}" r="6" fill="${(EL[e] || EL.X)[0]}" stroke="#151826" stroke-width="1"/>` + text(kx + 16, ky, e, { size: 12, weight: 600, anchor: "start", fill: C.ink }); kx += 26 + e.length * 8 + 10; }
  return { s, H: ky + 16 };
}
function place(k, arr, x, y, w, h, r, R, p) {
  const pts = [];
  if (arr === "lattice" || arr === "liquid" || arr === "layer") {
    // shrink the spacing (and so the particles) until the grid fits the box
    const d0 = 2 * r + (arr === "lattice" ? 3 : 6);
    let d = d0; while (Math.ceil(k / Math.max(1, Math.floor(w / d))) * d > h * (arr === "liquid" ? 0.92 : 1) && d > 10) d *= 0.94;
    pts.scale = d / d0;
    const cols = Math.max(1, Math.floor(w / d)), rows = Math.ceil(k / cols);
    const ox = x + (w - cols * d) / 2 + d / 2, oy = arr === "layer" ? y + h - rows * d + d / 2 : y + (h - rows * d) / 2 + d / 2;
    for (let i = 0; i < k; i++) {
      const cx = ox + (i % cols) * d, cy = oy + Math.floor(i / cols) * d;
      pts.push(arr === "liquid" ? [cx + (R() - 0.5) * 7 * pts.scale, cy + (R() - 0.5) * 7 * pts.scale + Math.max(0, h - rows * d) * 0.3] : [cx, cy]);
    }
    return pts;
  }
  // gas or random: rejection sampling, no overlaps, inside the box (or one half when `region` is left/right)
  let [x0, x1] = [x + r + 2, x + w - r - 2];
  if (p.region === "left") x1 = x + w / 2 - r - 6; if (p.region === "right") x0 = x + w / 2 + r + 6;
  for (let i = 0, tries = 0; i < k && tries < 20000; tries++) {
    const c = [x0 + R() * (x1 - x0), y + r + 2 + R() * (h - 2 * r - 4)];
    if ([...pts, ...(p.avoid || [])].every((q) => q && Math.hypot(q[0] - c[0], q[1] - c[1]) > 2 * r + (p.spacing ?? 6))) { pts.push(c); i++; }
  }
  return pts;
}
function particleChecks(spec) {
  const out = [];
  const atomsIn = (p) => { const t = {}; for (const [k, n] of p.contents) for (const e of spec.species[k].atoms) t[e] = (t[e] || 0) + n; return t; };
  const kind = (p) => {
    const sp = p.contents.filter(([, n]) => n > 0).map(([k]) => spec.species[k]);
    const elems = (s) => new Set(s.atoms);
    if (sp.length > 1) return "mixture";
    return elems(sp[0]).size === 1 ? "element" : "compound";
  };
  for (const c of spec.claims || []) {
    if (c.type === "conserved") {
      const [a, b] = c.panels.map((i) => atomsIn(spec.panels[i]));
      const els = [...new Set([...Object.keys(a), ...Object.keys(b)])];
      out.push(check(`atoms of each element are the same before and after (${els.join(", ")})`, els.every((e) => a[e] === b[e]), els.map((e) => `${e} ${a[e] || 0}→${b[e] || 0}`).join(", ")));
    } else if (c.type === "classify") {
      const p = spec.panels[c.panel], k = kind(p);
      out.push(check(`"${p.title}" is ${c.as === "pure" ? "a pure substance" : `a ${c.as}`}`, c.as === "pure" ? k !== "mixture" : k === c.as, `contents make it a ${k}`));
    } else if (c.type === "count") {
      const p = spec.panels[c.panel], got = p.contents.filter(([k]) => k === c.species).reduce((a, [, n]) => a + n, 0);
      out.push(check(`"${p.title}" has ${c.n} ${c.species}`, got === c.n, `drawn ${got}`));
    } else if (c.type === "concentration") {
      const conc = (i) => { const p = spec.panels[i]; return p.contents.filter(([k]) => k === c.solute).reduce((a, [, n]) => a + n, 0) / (p.volume ?? p.fill ?? 1); };
      out.push(check(`"${spec.panels[c.more].title}" is more concentrated than "${spec.panels[c.less].title}"`, conc(c.more) > conc(c.less), `${conc(c.more).toFixed(2)} against ${conc(c.less).toFixed(2)} particles per unit volume`));
      if (c.ratio) out.push(check(`concentration ratio ${c.ratio}`, near(conc(c.more) / conc(c.less), c.ratio, 1e-6), `${(conc(c.more) / conc(c.less)).toFixed(3)}`));
    } else if (c.type === "equation") {
      const b = balanced(c.eq); out.push(check(`${c.eq} balances`, b.ok, b.detail));
      if (c.panels) {
        // the particles drawn are the equation: each species count in proportion to its coefficient
        const tot = (i) => Object.fromEntries(spec.panels[i].contents.map(([k, n]) => [k, n]));
        out.push(check("the particles drawn match the equation's proportions", eqMatches(c.eq, tot(c.panels[0]), tot(c.panels[1]), c.leftover || {}), JSON.stringify([tot(c.panels[0]), tot(c.panels[1])])));
      }
    } else if (c.type === "region") {
      const p = spec.panels[c.panel], where = p.contents.filter(([k]) => k === c.species).map(([, , rg]) => rg);
      out.push(check(`"${p.title}": every ${c.species} is on the ${c.region} side`, where.length > 0 && where.every((rg) => rg === c.region), where.join(", ")));
    } else if (c.type === "states") {
      out.push(check(`"${spec.panels[c.panel].title}" is drawn as a ${c.as}`, ({ solid: "lattice", liquid: "liquid", gas: "gas" })[c.as] === spec.panels[c.panel].arrangement));
    }
  }
  return out;
}
function eqMatches(eq, before, after, leftover) {
  const [l, r] = eq.split(/\s*(?:→|⇌|->)\s*/).map((sd) => sd.split(/\s\+\s/).map((t) => { const m = t.trim().match(/^(\d*)\s*(.+)$/); return [m[2], m[1] ? +m[1] : 1]; }));
  const k = (sp) => Object.keys(before).find((x) => ascii(x) === ascii(sp)) ?? Object.keys(after).find((x) => ascii(x) === ascii(sp)) ?? sp;
  const ext = new Set(l.map(([sp, c]) => ((before[k(sp)] || 0) - (leftover[k(sp)] || 0)) / c).concat(r.map(([sp, c]) => ((after[k(sp)] || 0)) / c)));
  return ext.size === 1 && [...ext][0] > 0 && Object.entries(leftover).every(([sp, n]) => (after[sp] || 0) === n);
}

// ======================================================================== cycle
// spec: kind: "levels" | "triangle", states: [{id, label}], steps: [{from, to, dh | null, label, col}],
//   find: {step, value}, bonds: {step, list: [[bond, count, enthalpy]]}  (a step's ΔH as a sum of bond enthalpies)
function solveCycle(spec) {
  const h = { [spec.states[0].id]: 0 }, conflicts = [];
  for (let pass = 0; pass < spec.steps.length + 2; pass++) for (const st of spec.steps) {
    if (st.dh == null) continue;
    if (h[st.from] != null && h[st.to] == null) h[st.to] = h[st.from] + st.dh;
    else if (h[st.to] != null && h[st.from] == null) h[st.from] = h[st.to] - st.dh;
    else if (h[st.to] != null && h[st.from] != null && Math.abs(h[st.to] - h[st.from] - st.dh) > 1e-6 && !conflicts.includes(st)) conflicts.push(st);
  }
  return { h, conflicts };
}
const kj = (v) => `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(Math.round(v * 10) / 10)} kJ mol^{−1}`;
function cycle(spec, W, narrow) {
  const { h } = solveCycle(spec);
  const find = spec.find ? spec.steps[spec.find.step] : null;
  const dhOf = (st) => (st.dh != null ? st.dh : h[st.to] - h[st.from]);
  if (spec.kind === "triangle") {
    const H = narrow ? 330 : 300, pos = { [spec.states[0].id]: [narrow ? 70 : 150, 50], [spec.states[1].id]: [W - (narrow ? 70 : 150), 50], [spec.states[2].id]: [W / 2, H - 50] };
    let s = "";
    for (const st of spec.states) s += boxLabel(pos[st.id][0], pos[st.id][1], st.label, narrow ? 15 : 24);
    for (const st of spec.steps) {
      const [x1, y1] = pos[st.from], [x2, y2] = pos[st.to], L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, gap = Math.abs(uy) > 0.5 ? 26 : narrow ? 54 : 74;
      s += arrow(x1 + ux * gap, y1 + uy * (Math.abs(uy) > 0.5 ? 24 : 0), x2 - ux * gap, y2 - uy * (Math.abs(uy) > 0.5 ? 24 : 0), { stroke: st === find ? col("a2") : C.ink, w: 2.2, head: 10 });
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, nx = Math.abs(uy) > 0.5 ? (x1 + x2 < W ? -1 : 1) * (narrow ? 8 : 14) : 0, ny = Math.abs(uy) > 0.5 ? 0 : -14;
      s += text(mx + nx, my + ny, `${st.label}${st.label ? " = " : ""}${st === find ? "?" : kj(dhOf(st))}`, { size: narrow ? 11 : 12.5, weight: 700, anchor: nx < 0 ? "end" : nx > 0 ? "start" : "middle", fill: st === find ? col("a2") : C.ink });
    }
    if (find) s += text(W / 2, H - 12, `${find.label} = ${kj(dhOf(find))}`, { size: 13, weight: 700, fill: col("a2") });
    return { s, H };
  }
  // enthalpy level diagram
  const hs = spec.states.map((st) => h[st.id]), lo = Math.min(...hs), hi = Math.max(...hs);
  const H = spec.height?.[narrow ? 1 : 0] || (narrow ? 520 : 440), top = 30, bot = H - 30;
  const y = (v) => bot - ((v - lo) / (hi - lo || 1)) * (bot - top);
  const lx0 = narrow ? 10 : 40, lx1 = W - 10;
  let s = arrow(lx0 - 2, bot + 10, lx0 - 2, top - 14, { w: 1.6, head: 8 }) + text(lx0 + 4, top - 18, "enthalpy", { size: 12, weight: 600, anchor: "start", fill: C.soft });
  const cols = Math.max(...spec.steps.map((st) => st.col ?? 0)) + 1, colX = (c) => lx0 + 40 + (c + 0.5) * ((narrow ? W * 0.42 : W * 0.5) / cols);
  const labelX = narrow ? W * 0.5 : W * 0.6;
  const used = [];
  let late = "";
  for (const st of spec.states) {
    let yy = y(h[st.id]); for (const u of used) if (Math.abs(u - yy) < 18) yy = u + (yy >= u ? 18 : -18); used.push(yy);
    const xs = spec.steps.filter((p) => p.from === st.id || p.to === st.id).map((p) => colX(p.col ?? 0));
    s += line(Math.min(...xs) - 26, y(h[st.id]), lx1, y(h[st.id]), { stroke: C.ink, w: 2 });
    // a label pushed down by its neighbour's goes under its own line rather than between two close lines
    s += text(labelX, yy > y(h[st.id]) ? y(h[st.id]) + 14 : yy - 10, fm(st.label), { size: narrow ? 11.5 : 12.5, weight: 600, anchor: "start", fill: C.ink });
  }
  for (const st of spec.steps) {
    const x = colX(st.col ?? 0), y1 = y(h[st.from]), y2 = y(h[st.to]), v = dhOf(st);
    s += arrow(x, y1, x, y2 + (y2 > y1 ? -2 : 2), { stroke: st === find ? col("a2") : v > 0 ? col("a3") : col("a1"), w: 2.2, head: 9 });
    // labels on halos (a level line can cross a long arrow's label); a step too short to hold its label (ΔsolH
    // between NaCl(s) and the hydrated ions) has it under the lower level, where the diagram is empty
    const lab = `${st.label}${narrow ? "" : `: ${st === find ? "?" : kj(v)}`}`, short = Math.abs(y2 - y1) < 34, ly = short ? Math.max(y1, y2) + 14 : (y1 + y2) / 2;
    late += text(x + 7, ly, lab, { size: narrow ? 10.5 : 11.5, weight: 700, anchor: "start", fill: st === find ? col("a2") : C.ink, halo: true });
    if (narrow) late += text(x + 7, ly + 13, st === find ? "?" : kj(v), { size: 10.5, anchor: "start", fill: C.soft, halo: true });
  }
  s += late;
  if (find) s += text(W - 12, H - 10, `${find.label} = ${kj(dhOf(find))}`, { size: 13, weight: 700, anchor: "end", fill: col("a2") });
  return { s, H };
}
function boxLabel(x, y, str, n) {
  const ls = wrap(fm(str), n), w = Math.max(...ls.map((l) => l.replace(/[_^]\{|\}/g, "").length)) * 7.4 + 22, h = ls.length * 17 + 14;
  return `<rect x="${f1(x - w / 2)}" y="${f1(y - h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="10" fill="#f7f8fd" stroke="${C.line}" stroke-width="1.3"/>` + ls.map((l, i) => text(x, y - ((ls.length - 1) * 17) / 2 + i * 17, l, { size: 13, weight: 600, fill: C.ink })).join("");
}
function cycleChecks(spec) {
  const out = [], { h, conflicts } = solveCycle(spec);
  out.push(check("Hess's law: every route between two states gives the same enthalpy change", !conflicts.length, conflicts.length ? conflicts.map((c) => `${c.label} ${c.dh} disagrees`).join("; ") : `${spec.steps.filter((s) => s.dh != null).length} steps consistent`));
  out.push(check("every state's enthalpy is fixed by the steps", spec.states.every((s) => h[s.id] != null)));
  if (spec.find) {
    const st = spec.steps[spec.find.step], v = h[st.to] - h[st.from];
    out.push(check(`${st.label} = ${spec.find.value} kJ mol⁻¹ from the cycle`, Math.abs(v - spec.find.value) < 0.5, `cycle gives ${Math.round(v * 10) / 10}`));
  }
  for (const b of spec.bonds || []) {
    const st = spec.steps[b.step], sum = b.list.reduce((a, [, n, e]) => a + n * e, 0) * (b.sign || 1);
    out.push(check(`${st.label}: ${b.list.map(([bd, n, e]) => `${n} × ${bd} (${e})`).join(" + ")} = ${sum}`, near(sum, st.dh, 1e-9), `step drawn as ${st.dh}`));
  }
  for (const e of spec.equations || []) { const b = balanced(e); out.push(check(`${e} balances`, b.ok, b.detail)); }
  return out;
}

// ======================================================================== titration
// spec: flask: {acids: [{c, pKa: [..]} | {c, strong: true}], bases: [...], V}, titrant: {acid|base, strong, pKa|pKb, c},
//   curves: [{label, flask, titrant, colour}] (several on one axes), vmax, indicators: [{name, range, colour}],
//   marks: {eq, half, buffer}, claims: [{type: "veq", curve, value} | {type: "phEq", curve, rel: ">"|"<"|"=", value: 7}
//   | {type: "halfPh", curve, value} | {type: "suitable", curve, indicator, ok} | {type: "startPh", curve, value}]
const KW = 1e-14;
function phAt(cv, vt) {
  const V0 = cv.flask.V, Vt = V0 + vt, dil = (c, v) => (c * v) / Vt;
  const items = [];
  for (const a of cv.flask.acids || []) items.push({ ...a, kind: "acid", C: dil(a.c, V0) });
  for (const b of cv.flask.bases || []) items.push({ ...b, kind: "base", C: dil(b.c, V0) });
  const t = cv.titrant; items.push({ ...t, kind: t.acid ? "acid" : "base", C: dil(t.c, vt) });
  const f = (pH) => {
    const H = 10 ** -pH; let pos = H, neg = KW / H;
    for (const it of items) {
      if (it.kind === "acid") {
        if (it.strong) { neg += it.C; continue; }
        const K = it.pKa.map((p) => 10 ** -p); let num = 0, den = 1, prod = 1;
        K.forEach((k, i) => { prod *= k / H; den += prod; num += (i + 1) * prod; });
        neg += (it.C * num) / den;
      } else {
        if (it.strong) { pos += it.C * (it.n || 1); continue; }
        const Ka = KW / 10 ** -it.pKb; pos += (it.C * H) / (H + Ka);
      }
    }
    return pos - neg;
  };
  let lo = -1, hi = 15;
  for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (f(m) > 0) lo = m; else hi = m; }
  return (lo + hi) / 2;
}
const veqOf = (cv) => {
  const nA = (cv.flask.acids || []).reduce((a, x) => a + x.c * cv.flask.V * (x.strong ? 1 : x.pKa.length), 0), nB = (cv.flask.bases || []).reduce((a, x) => a + x.c * cv.flask.V, 0);
  return (cv.titrant.acid ? nB : nA) / cv.titrant.c;
};
function titration(spec, W, narrow) {
  if (spec.panels && spec.curves.length > 1) {
    // one small chart per curve, so curves that coincide over part of their range stay readable
    const per = narrow ? 1 : 2, pw = W / per, ph = narrow ? 250 : 240;
    let s = "";
    spec.curves.forEach((cv, i) => {
      const sub = titration({ ...spec, panels: false, curves: [{ ...cv, label: null }], marks: spec.marks, small: true }, pw, true);
      const x = (i % per) * pw, y = Math.floor(i / per) * (ph + 30);
      s += `<g transform="translate(${f1(x)} ${f1(y + 24)})">${sub.s}</g>` + text(x + pw / 2 + 10, y + 14, cv.label, { size: 13, weight: 700, fill: col(cv.colour || "a1") });
    });
    return { s, H: Math.ceil(spec.curves.length / per) * (ph + 30) };
  }
  const H = spec.small ? 240 : narrow ? 340 : 360, pad = { l: 46, r: narrow ? 14 : 130, t: 26, b: 46 };
  const vmax = spec.vmax, sx = (v) => pad.l + (v / vmax) * (W - pad.l - pad.r), sy = (p) => H - pad.b - (p / 14) * (H - pad.t - pad.b);
  let s = "";
  for (const ind of spec.indicators || []) {
    s += `<rect x="${f1(pad.l)}" y="${f1(sy(ind.range[1]))}" width="${f1(W - pad.l - pad.r)}" height="${f1(sy(ind.range[0]) - sy(ind.range[1]))}" fill="${col(ind.colour || "a5")}" fill-opacity=".13"/>`;
    s += text(narrow ? W - pad.r - 4 : W - pad.r + 8, (sy(ind.range[0]) + sy(ind.range[1])) / 2, ind.name, { size: 11.5, weight: 700, anchor: narrow ? "end" : "start", fill: col(ind.colour || "a5") });
  }
  for (let p = 0; p <= 14; p += 2) s += line(pad.l, sy(p), W - pad.r, sy(p), { stroke: C.grid, w: 1 }) + text(pad.l - 8, sy(p), String(p), { size: 11.5, anchor: "end", fill: C.soft });
  const vstep = vmax <= 30 ? 5 : 10;
  for (let v = 0; v <= vmax + 1e-9; v += vstep) s += text(sx(v), H - pad.b + 16, String(v), { size: 11.5, fill: C.soft });
  s += line(pad.l, sy(0), W - pad.r, sy(0), { stroke: C.ink, w: 1.6 }) + line(pad.l, sy(0), pad.l, sy(14) - 6, { stroke: C.ink, w: 1.6 });
  s += text(pad.l - 4, pad.t - 14, "pH", { size: 12.5, weight: 600, anchor: "start", fill: C.soft });
  s += text((pad.l + W - pad.r) / 2, H - 10, spec.xLabel || "volume of titrant added / cm^{3}", { size: 12.5, weight: 600, fill: C.soft });
  for (const cv of spec.curves) {
    const pts = []; for (let i = 0; i <= 600; i++) { const v = (vmax * i) / 600; pts.push([sx(v), sy(Math.max(0, Math.min(14, phAt(cv, v))))]); }
    s += `<path d="${pts.map(([x, y], i) => `${i ? "L" : "M"}${f1(x)} ${f1(y)}`).join(" ")}" fill="none" stroke="${col(cv.colour || "a1")}" stroke-width="3" stroke-linejoin="round"/>`;
    const ve = veqOf(cv);
    if (spec.marks?.eq) { const pe = phAt(cv, ve); s += `<circle cx="${f1(sx(ve))}" cy="${f1(sy(pe))}" r="5" fill="${col(cv.colour || "a1")}" stroke="#fff" stroke-width="2"/>`; if (spec.curves.length === 1) s += line(sx(ve), sy(pe), sx(ve), sy(0), { stroke: C.line, w: 1.2, dash: "4 4" }) + text(sx(ve) + 6, sy(pe) + 2, `equivalence, pH ${pe.toFixed(1)}`, { size: 11.5, weight: 600, anchor: "start", fill: C.ink }); }
    if (spec.marks?.half) { const ph = phAt(cv, ve / 2); s += line(sx(ve / 2), sy(0), sx(ve / 2), sy(ph), { stroke: col("a2"), w: 1.4, dash: "4 4" }) + line(pad.l, sy(ph), sx(ve / 2), sy(ph), { stroke: col("a2"), w: 1.4, dash: "4 4" }) + text(pad.l + 6, sy(ph) - 9, `pH = pKa = ${ph.toFixed(2)}`, { size: 11.5, weight: 700, anchor: "start", fill: col("a2") }) + text(sx(ve / 2), sy(0) - 8, "½ V_{eq}", { size: 11, weight: 600, fill: col("a2") }); }
    if (spec.marks?.buffer) s += `<rect x="${f1(sx(ve * 0.1))}" y="${f1(sy(14))}" width="${f1(sx(ve * 0.9) - sx(ve * 0.1))}" height="${f1(sy(0) - sy(14))}" fill="${col("a4")}" fill-opacity=".08"/>` + text((sx(ve * 0.1) + sx(ve * 0.9)) / 2, sy(13), "buffer region", { size: 12, weight: 700, fill: col("a4") });
    if (cv.label) { const v = cv.labelAt?.[0] ?? vmax * 0.98, p = cv.labelAt?.[1] ?? phAt(cv, v); s += text(narrow ? sx(v) : sx(vmax) + 8, sy(p) + (cv.labelDy || 0), cv.label, { size: 11.5, weight: 700, anchor: narrow ? "end" : "start", fill: col(cv.colour || "a1") }); }
  }
  return { s, H };
}
function vertical(cv, half = 0.2) { const ve = veqOf(cv); return [phAt(cv, ve - half), phAt(cv, ve + half)]; }
function titrationChecks(spec) {
  const out = [];
  for (const c of spec.claims || []) {
    const cv = spec.curves[c.curve || 0], ve = veqOf(cv), name = cv.label || "the curve";
    if (c.type === "veq") out.push(check(`${name}: equivalence at ${c.value} cm³ from the moles`, near(ve, c.value, 1e-6), `computed ${ve.toFixed(2)} cm³`));
    if (c.type === "phEq") { const p = phAt(cv, ve); out.push(check(`${name}: pH at equivalence ${c.rel} ${c.value}`, c.rel === ">" ? p > c.value + 0.3 : c.rel === "<" ? p < c.value - 0.3 : Math.abs(p - c.value) < 0.3, `pH ${p.toFixed(2)}`)); }
    if (c.type === "halfPh") { const p = phAt(cv, ve / 2); out.push(check(`${name}: pH at half-equivalence is ${c.value}`, Math.abs(p - c.value) < 0.06, `pH ${p.toFixed(3)}`)); }
    if (c.type === "startPh") { const p = phAt(cv, 0); out.push(check(`${name}: starting pH ${c.value}`, Math.abs(p - c.value) < 0.06, `pH ${p.toFixed(3)}`)); }
    if (c.type === "suitable") {
      const ind = spec.indicators.find((i) => i.name === c.indicator), [a, b] = vertical(cv), mid = (ind.range[0] + ind.range[1]) / 2;
      const ok = mid > Math.min(a, b) && mid < Math.max(a, b);
      out.push(check(`${c.indicator} is ${c.ok ? "" : "not "}suitable for ${name}: its end point (pH ${mid.toFixed(2)}) ${c.ok ? "lies" : "does not lie"} in the steep section`, ok === c.ok, `steep section pH ${Math.min(a, b).toFixed(1)}–${Math.max(a, b).toFixed(1)} (V_eq ± 0.2 cm³)`));
    }
    if (c.type === "points") {
      const n = []; let prev = phAt(cv, 0), prevSlope = 0, rising = false;
      for (let i = 1; i <= 2000; i++) { const v = (spec.vmax * i) / 2000, p = phAt(cv, v), sl = (p - prev) / (spec.vmax / 2000); if (sl > 2 && !rising) { rising = true; n.push(v); } if (sl < 0.5) rising = false; prev = p; prevSlope = sl; }
      out.push(check(`${name}: ${c.value} steep rise(s)`, n.length === c.value, `found at ${n.map((v) => v.toFixed(1)).join(", ")} cm³`));
    }
  }
  return out;
}

register({
  trend: { draw: trend, checks: trendChecks, widths: [680, 380] },
  orbitals: { draw: orbitals, checks: orbitalChecks, widths: [680, 380] },
  atom: { draw: atom, checks: atomChecks, widths: [680, 380] },
  particles: { draw: particles, checks: particleChecks, widths: [700, 380] },
  cycle: { draw: cycle, checks: cycleChecks, widths: [700, 380] },
  titration: { draw: titration, checks: titrationChecks, widths: [700, 380] },
});
export { phAt, veqOf, solveCycle, madelung, trendValues, textWrap, boxLabel, EL, drawSpecies, rng, C as CC, niceTicks, fmtNum };
