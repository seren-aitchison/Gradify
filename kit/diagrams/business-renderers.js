// Gradify Visual Learning Engine: business renderers (BusinessGradify). Same style as the graph renderer: soft tinted
// areas, thin strokes in the same hue, bold coloured lines, small grey labels, a wide layout for the lesson column and
// a narrow one for phones. Every renderer recomputes what the picture claims; a wrong diagram fails the build.
//
//   matrix    2×2 or n×m grids (Ansoff, BCG, power–interest, Eisenhower): each item's cell is recomputed from its
//             numbers or attributes against the axes
//   layers    pyramids and stacks (Maslow, hierarchies, funnels): order and terms compared with the lesson
//   orgchart  organisation charts: levels, spans of control and tall/flat recomputed from the tree
//   process   chains and cycles (value chain, PDCA, supply chain): cycles close, steps unique and in the lesson
//   bars      columns, waterfalls and stacks (income statement, balance sheet, cash forecast, NPV, variances):
//             every relation the lesson states ("profit = revenue − costs") is evaluated on the drawn values
//   network   project networks: forward and backward pass, float and critical path recomputed
//   blocks    canvases (business model canvas, PESTLE, scorecard): no overlaps, the expected blocks all present
//   radial    hub and spoke (five forces, stakeholders): arms counted and named as the lesson names them
import { register, text, line, arrow, col, f1, esc, near, check, wrap, COLOURS as C } from "./renderers.js";
import { evalExpr, criticalPath, band } from "./business-core.js";

// ---------------------------------------------------------------- shared helpers
const SZ = (narrow, wide = 13) => (narrow ? wide - 1 : wide);
const tw = (s, size) => String(s ?? "").replace(/[_^]\{([^}]*)\}/g, "$1").length * size * 0.56;
const norm = (s) => String(s).toLowerCase().replace(/[’‘]/g, "'").replace(/[–—−]/g, "-").replace(/\s+/g, " ");
const fit = (label, w, size) => wrap(label, Math.max(4, Math.floor((w - 14) / (size * 0.56))));
const money = (v, s = {}) => `${v < 0 ? "−" : ""}${s.prefix || ""}${Math.abs(+(+v).toFixed(2)).toLocaleString("en-GB")}${s.suffix || ""}`;
/** the terms a diagram uses must be in the lesson it sits in */
function grounded(spec, lessonText) {
  const terms = spec.terms || [], t = norm(lessonText || "");
  if (!lessonText) return check("every term on the diagram is in the lesson", terms.length > 0, `${terms.length} terms listed`);
  const miss = terms.filter((x) => !t.includes(norm(x)));
  return check("every term on the diagram is in the lesson", terms.length > 0 && !miss.length, miss.length ? `not in the lesson: ${miss.join("; ")}` : `${terms.length} terms found in the lesson text`);
}
/** a tinted box with a title and optional detail lines; returns its svg and height for a given width */
function card(x, y, w, label, sub, { colour = "a1", size = 13, fill = 0.12, weight = 700, minH = 0, h: fixedH, align = "middle", textFill } = {}) {
  const ls = fit(label, w, size), ss = sub ? fit(sub, w, size - 1.5) : [];
  const lh = size * 1.25, sh = (size - 1.5) * 1.25;
  const h = fixedH ?? Math.max(minH, ls.length * lh + ss.length * sh + (ss.length ? 6 : 0) + 16);
  const top = y + (h - (ls.length * lh + ss.length * sh + (ss.length ? 6 : 0))) / 2;
  const cx = align === "start" ? x + 9 : x + w / 2;
  let s = `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="9" fill="${col(colour)}" fill-opacity="${fill}" stroke="${col(colour)}" stroke-opacity=".55" stroke-width="1.3"/>`;
  ls.forEach((l, i) => { s += text(cx, top + lh / 2 + i * lh, l, { size, weight, anchor: align, fill: textFill || C.ink }); });
  ss.forEach((l, i) => { s += text(cx, top + ls.length * lh + 6 + sh / 2 + i * sh, l, { size: size - 1.5, weight: 500, anchor: align, fill: C.soft }); });
  return { s, h };
}
/** where the line from a box's centre towards (tx, ty) leaves the box */
function edge(cx, cy, w, h, tx, ty) {
  const dx = tx - cx, dy = ty - cy;
  if (!dx && !dy) return [cx, cy];
  const k = Math.min(dx ? w / 2 / Math.abs(dx) : Infinity, dy ? h / 2 / Math.abs(dy) : Infinity);
  return [cx + dx * k, cy + dy * k];
}
function link(a, b, o = {}) {
  const [x1, y1] = edge(a.cx, a.cy, a.w + 6, a.h + 6, b.cx, b.cy), [x2, y2] = edge(b.cx, b.cy, b.w + 6, b.h + 6, a.cx, a.cy);
  return arrow(x1, y1, x2, y2, { stroke: o.stroke || C.line, w: o.w || 2, head: o.head || 9, dash: o.dash || "" });
}
const title = (spec, W, y = 18) => (spec.heading ? text(W / 2, y, spec.heading, { size: 14, weight: 700, fill: C.soft }) : "");
const pad = (spec) => (spec.heading ? 36 : 12);

// ================================================================ matrix
// spec: cols: ["Existing products", "New products"], rows: [...], cells: [[{title, note, colour}, …], …] (row 0 on top),
//   axes: {x: {title, key, values | cuts, descending}, y: {title, key, values | cuts}}, items: [{label, cell: [r, c],
//   <key>: value}] — with values the cell is the index of the item's attribute among the axis values; with cuts a
//   high number is up (y) or right (x), or left when descending.
function matrix(spec, W, narrow) {
  const cells = derivedCells(spec);
  const R = spec.rows.length, K = spec.cols.length, size = SZ(narrow, 13);
  const lw = narrow ? 58 : 100, top0 = pad(spec) + (narrow ? 30 : 26), left = (spec.axes?.y?.title ? 22 : 4) + lw, right = 6;
  const cw = (W - left - right) / K;
  let s = title(spec, W);
  s += spec.cols.map((c, i) => text(left + cw * (i + 0.5), top0 - 14, c, { size: size - 1, weight: 700, fill: C.soft })).join("");
  const cellH = spec.rows.map((_, r) => Math.max(narrow ? 78 : 92, ...cells[r].map((c, k) => {
    const items = (spec.items || []).filter((it) => it.cell[0] === r && it.cell[1] === k);
    const n = fit(c.title, cw - 14, size).length * size * 1.25 + (c.note ? fit(c.note, cw - 14, size - 2).length * (size - 2) * 1.25 + 4 : 0) + items.reduce((a, it) => a + fit(`• ${it.label}`, cw - 14, size - 1).length * (size - 1) * 1.28, 0);
    return n + 22;
  })));
  let y = top0;
  spec.rows.forEach((rl, r) => {
    const h = cellH[r];
    wrap(rl, narrow ? 9 : 15).forEach((l, i, a) => { s += text(left - 8, y + h / 2 + (i - (a.length - 1) / 2) * size * 1.2, l, { size: size - 1, weight: 700, anchor: "end", fill: C.soft }); });
    cells[r].forEach((c, k) => {
      const x = left + cw * k, w = cw - 6;
      s += `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h - 6)}" rx="10" fill="${col(c.colour || "a1")}" fill-opacity=".1" stroke="${col(c.colour || "a1")}" stroke-opacity=".5" stroke-width="1.3"/>`;
      let ty = y + 10;
      for (const l of fit(c.title, w, size)) { s += text(x + 9, ty + size * 0.6, l, { size, weight: 700, anchor: "start", fill: col(c.colour || "a1") }); ty += size * 1.25; }
      if (c.note) for (const l of fit(c.note, w, size - 2)) { s += text(x + 9, ty + 6, l, { size: size - 2, weight: 500, anchor: "start", fill: C.soft }); ty += (size - 2) * 1.25; }
      ty += 4;
      for (const it of (spec.items || []).filter((it) => it.cell[0] === r && it.cell[1] === k)) for (const l of fit(`• ${it.label}`, w, size - 1)) { s += text(x + 9, ty + 7, l, { size: size - 1, weight: 600, anchor: "start" }); ty += (size - 1) * 1.28; }
    });
    y += h;
  });
  const H = y + (spec.axes?.x?.title ? 26 : 8);
  if (spec.axes?.x?.title) s += text(left + (cw * K) / 2, y + 12, `${spec.axes.x.title} →`, { size: size - 1, weight: 600, fill: C.soft });
  if (spec.axes?.y?.title) s += `<g transform="translate(14 ${f1((top0 + y) / 2)}) rotate(-90)">${text(0, 0, `${spec.axes.y.title} →`, { size: size - 1, weight: 600, fill: C.soft })}</g>`;
  return { s, H };
}
// a payoff matrix writes each cell's title from its payoffs, so the picture cannot disagree with them
function derivedCells(spec) {
  if (!spec.payoffs) return spec.cells;
  return spec.cells.map((row, r) => row.map((c, k) => { const [a, b] = spec.payoffs[r][k]; return { ...c, title: a === b ? `${spec.prefix || "£"}${a}${spec.suffix || "m"} each` : `A ${spec.prefix || "£"}${a}${spec.suffix || "m"}, B ${spec.prefix || "£"}${b}${spec.suffix || "m"}` }; }));
}
/** pure Nash equilibria and dominant strategies of a two-player payoff grid (rows are A's choices, columns B's) */
function solveGame(P) {
  const R = P.length, K = P[0].length, nash = [];
  for (let r = 0; r < R; r++) for (let c = 0; c < K; c++) {
    const aBest = P.every((row, r2) => P[r][c][0] >= row[c][0]), bBest = P[r].every((cell, c2) => P[r][c][1] >= cell[1]);
    if (aBest && bBest) nash.push([r, c]);
  }
  const domA = [...Array(R).keys()].filter((r) => [...Array(R).keys()].every((r2) => r2 === r || P[r].every((cell, c) => cell[0] > P[r2][c][0])));
  const domB = [...Array(K).keys()].filter((c) => [...Array(K).keys()].every((c2) => c2 === c || P.every((row) => row[c][1] > row[c2][1])));
  return { nash, domA, domB };
}
function cellOf(spec, it) {
  const pos = (ax, n, up) => {
    if (ax.values) return ax.values.indexOf(it[ax.key]);
    const b = band(it[ax.key], ax.cuts);
    return up ? n - 1 - b : ax.descending ? ax.cuts.length - b : b;
  };
  return [pos(spec.axes.y, spec.rows.length, !spec.axes.y.values), pos(spec.axes.x, spec.cols.length, false)];
}
function matrixChecks(spec, lessonText) {
  const out = [], R = spec.rows.length, K = spec.cols.length;
  out.push(check("every row has a cell for every column", spec.cells.length === R && spec.cells.every((r) => r.length === K), `${R} × ${K}`));
  for (const it of spec.items || []) {
    if (spec.axes && (spec.axes.x.values || spec.axes.x.cuts)) {
      const got = cellOf(spec, it);
      out.push(check(`${it.label}: recomputed cell matches where it is drawn`, got[0] === it.cell[0] && got[1] === it.cell[1], `computed row ${got[0] + 1}, column ${got[1] + 1}; drawn row ${it.cell[0] + 1}, column ${it.cell[1] + 1}`));
    } else out.push(check(`${it.label}: sits inside the grid`, it.cell[0] < R && it.cell[1] < K));
  }
  for (const k of spec.claims || []) {
    const c = derivedCells(spec)[k.cell[0]][k.cell[1]];
    out.push(check(k.name || `cell ${k.cell} is called ${k.title}`, norm(c.title) === norm(k.title), c.title));
  }
  if (spec.payoffs) {
    const g = solveGame(spec.payoffs), want = spec.game || {};
    if (want.nash) out.push(check(`the Nash equilibrium is row ${want.nash[0] + 1}, column ${want.nash[1] + 1}`, g.nash.length === 1 && g.nash[0][0] === want.nash[0] && g.nash[0][1] === want.nash[1], `found ${g.nash.map((x) => `(${x[0] + 1}, ${x[1] + 1})`).join(", ") || "none"}`));
    if (want.dominant) out.push(check("each firm has the stated dominant strategy", g.domA[0] === want.dominant[0] && g.domB[0] === want.dominant[1], `A: ${g.domA}, B: ${g.domB}`));
    if (want.dilemma) { const n = spec.payoffs[g.nash[0][0]][g.nash[0][1]], best = spec.payoffs[want.dilemma[0]][want.dilemma[1]]; out.push(check("both firms are worse off at the equilibrium than if both cooperated", n[0] < best[0] && n[1] < best[1], `equilibrium ${n.join(", ")} against ${best.join(", ")}`)); }
  }
  out.push(grounded(spec, lessonText));
  return out;
}

// ================================================================ layers
// spec: shape: "pyramid" | "stack", items: [{label, detail, colour}] from the top down, expect: [labels top → bottom]
function layers(spec, W, narrow) {
  const n = spec.items.length, size = SZ(narrow, 14), lh = narrow ? 58 : 52, top = pad(spec) + 4;
  const shapeW = narrow ? W - 16 : Math.min(360, W * 0.52), x0 = 8, dx = narrow ? 0 : 30;
  let s = title(spec, W);
  spec.items.forEach((it, i) => {
    const y = top + i * (lh + 5), pyr = spec.shape === "pyramid";
    const inset = pyr && !narrow ? ((n - 1 - i) / n) * (shapeW * 0.32) : pyr ? ((n - 1 - i) / n) * 40 : 0;
    const w = shapeW - inset * 2, x = x0 + inset;
    const cx = x + w / 2;
    const c = col(it.colour || ["a2", "a3", "a5", "a1", "a4"][i % 5]);
    s += `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${lh}" rx="9" fill="${c}" fill-opacity=".14" stroke="${c}" stroke-opacity=".6" stroke-width="1.3"/>`;
    const ls = fit(it.label, w, size);
    if (narrow && it.detail) {
      s += text(cx, y + 18, it.label, { size, weight: 700 });
      fit(it.detail, w, size - 2.5).slice(0, 2).forEach((l, j) => { s += text(cx, y + 35 + j * 14, l, { size: size - 2.5, fill: C.soft }); });
    } else ls.forEach((l, j) => { s += text(cx, y + lh / 2 + (j - (ls.length - 1) / 2) * size * 1.2, l, { size, weight: 700 }); });
    if (!narrow && it.detail) {
      const dxx = x0 + shapeW + 22;
      s += line(x + w + 4, y + lh / 2, dxx - 6, y + lh / 2, { stroke: C.grid, w: 1.5, dash: "3 4" });
      fit(it.detail, W - dxx - 6, 12.5).forEach((l, j, a) => { s += text(dxx, y + lh / 2 + (j - (a.length - 1) / 2) * 15.5, l, { size: 12.5, anchor: "start", fill: C.soft }); });
    }
  });
  if (spec.arrowLabel) {
    const H = top + n * (lh + 5);
    s += text(W / 2, H + 12, spec.arrowLabel, { size: 12, weight: 600, fill: C.soft });
    return { s, H: H + 28 };
  }
  return { s, H: top + n * (lh + 5) + 6 };
}
function layersChecks(spec, lessonText) {
  const out = [], labels = spec.items.map((i) => i.label);
  if (spec.expect) out.push(check("layers appear in the order the lesson gives them", JSON.stringify(labels) === JSON.stringify(spec.expect), labels.join(" > ")));
  out.push(check("every layer is named and distinct", labels.every(Boolean) && new Set(labels).size === labels.length, `${labels.length} layers`));
  if (spec.count) out.push(check(`the lesson names ${spec.count} layers`, labels.length === spec.count, `${labels.length} drawn`));
  out.push(grounded(spec, lessonText));
  return out;
}

// ================================================================ orgchart
// spec: nodes: [{id, label, parent}], claims: {levels, spans: {id: n}, shape: "tall" | "flat"}
function tree(spec) {
  const kids = new Map(spec.nodes.map((n) => [n.id, []]));
  for (const n of spec.nodes) if (n.parent) kids.get(n.parent)?.push(n.id);
  const root = spec.nodes.filter((n) => !n.parent);
  const depth = new Map(), walk = (id, d) => { depth.set(id, d); for (const k of kids.get(id)) walk(k, d + 1); };
  if (root.length === 1) walk(root[0].id, 0);
  return { kids, root, depth, levels: depth.size ? Math.max(...depth.values()) + 1 : 0 };
}
function orgchart(spec, W, narrow) {
  const { kids, root, depth, levels } = tree(spec), by = new Map(spec.nodes.map((n) => [n.id, n])), size = SZ(narrow, 13);
  let s = title(spec, W);
  const y0 = pad(spec) + 4, pos = new Map();
  if (narrow) {
    // an indented list: one row per node, branches drawn down the left
    let row = 0;
    const rh = 36, ind = 22, walk = (id) => { pos.set(id, row++); for (const k of kids.get(id)) walk(k); };
    walk(root[0].id);
    for (const n of spec.nodes) {
      const r = pos.get(n.id), d = depth.get(n.id), x = 8 + d * ind, w = W - x - 8, y = y0 + r * rh;
      s += card(x, y, w, n.label, null, { size: size - 0.5, fill: 0.12, colour: n.colour || (d === 0 ? "a2" : d === 1 ? "a1" : "a4"), h: rh - 6, weight: 600 }).s;
      if (n.parent) { const py = y0 + pos.get(n.parent) * rh + (rh - 6), px = 8 + (d - 1) * ind + 12; s += line(px, py, px, y + (rh - 6) / 2, { stroke: C.line, w: 1.6 }) + line(px, y + (rh - 6) / 2, x, y + (rh - 6) / 2, { stroke: C.line, w: 1.6 }); }
    }
    return { s, H: y0 + spec.nodes.length * rh + 4 };
  }
  // top-down: leaves are spread evenly, a parent is centred over its children
  let leaf = 0;
  const leaves = spec.nodes.filter((n) => !kids.get(n.id).length).length, slot = (W - 16) / leaves, bw = Math.min(slot - 10, 150);
  const place = (id) => { const k = kids.get(id); if (!k.length) return (pos.set(id, 8 + slot * (leaf++ + 0.5)), pos.get(id)); const xs = k.map(place); pos.set(id, (xs[0] + xs.at(-1)) / 2); return pos.get(id); };
  place(root[0].id);
  const bh = Math.max(...spec.nodes.map((n) => fit(n.label, bw, size).length)) * size * 1.25 + 16, vg = Math.max(30, (spec.rowGap || 34));
  for (const n of spec.nodes) {
    const d = depth.get(n.id), x = pos.get(n.id), y = y0 + d * (bh + vg);
    s += card(x - bw / 2, y, bw, n.label, null, { size, fill: 0.12, colour: n.colour || (d === 0 ? "a2" : d === 1 ? "a1" : "a4"), h: bh, weight: 600 }).s;
    if (n.parent) {
      const px = pos.get(n.parent), py = y0 + (d - 1) * (bh + vg) + bh, my = y - vg / 2;
      s += `<path d="M${f1(px)} ${f1(py)} L${f1(px)} ${f1(my)} L${f1(x)} ${f1(my)} L${f1(x)} ${f1(y)}" fill="none" stroke="${C.line}" stroke-width="1.8" stroke-linejoin="round"/>`;
    }
  }
  return { s, H: y0 + levels * (bh + vg) - vg + 10 };
}
function orgChecks(spec, lessonText) {
  const { kids, root, levels, depth } = tree(spec), out = [], ids = spec.nodes.map((n) => n.id);
  out.push(check("one top node and every other node has a parent that exists", root.length === 1 && spec.nodes.every((n) => !n.parent || ids.includes(n.parent)), `${root.length} top node(s)`));
  out.push(check("every node is reachable from the top", depth.size === spec.nodes.length, `${depth.size} of ${spec.nodes.length} reached`));
  const c = spec.claims || {};
  if (c.levels != null) out.push(check(`the chart has ${c.levels} levels`, levels === c.levels, `${levels} levels`));
  for (const [id, n] of Object.entries(c.spans || {})) out.push(check(`span of control of ${id} is ${n}`, kids.get(id)?.length === n, `${kids.get(id)?.length} direct reports`));
  if (c.shape) {
    const mgr = spec.nodes.filter((n) => kids.get(n.id).length), avg = mgr.reduce((a, n) => a + kids.get(n.id).length, 0) / mgr.length;
    out.push(check(`the structure is ${c.shape} (average span ${avg.toFixed(1)}, ${levels} levels)`, c.shape === "flat" ? avg >= 4 : avg <= 3.5, `average span ${avg.toFixed(2)}`));
  }
  out.push(grounded(spec, lessonText));
  return out;
}

// ================================================================ process
// spec: kind: "chain" | "cycle", steps: [{label, note}], support: [labels] (a band above a chain), end: label
function process(spec, W, narrow) {
  const n = spec.steps.length, size = SZ(narrow, 13), cycle = spec.kind === "cycle";
  let s = title(spec, W);
  const y0 = pad(spec) + 2;
  if (narrow || (!cycle && n > 6)) {
    // vertical
    const w = W - (cycle ? 58 : 20), x = cycle ? 40 : 10;
    let y = y0;
    if (spec.support?.length) { s += card(10, y, W - 20, `Support: ${spec.support.join(" · ")}`, null, { size: size - 1, colour: "a4", fill: 0.1, weight: 600 }).s; y += 52; }
    const boxes = [];
    spec.steps.forEach((st, i) => {
      const c = card(x, y, w, st.label, st.note, { size, colour: st.colour || ["a1", "a5", "a4", "a3", "a2"][i % 5], align: "start" });
      s += c.s; boxes.push({ cx: x + w / 2, cy: y + c.h / 2, w, h: c.h, top: y, bot: y + c.h }); y += c.h + 22;
    });
    boxes.slice(1).forEach((b, i) => { s += arrow(b.cx, boxes[i].bot + 2, b.cx, b.top - 2, { stroke: C.line, w: 2, head: 8 }); });
    if (cycle) { const a = boxes[0], z = boxes.at(-1), lx = 18; s += `<path d="M${f1(x)} ${f1(z.cy)} L${lx} ${f1(z.cy)} L${lx} ${f1(a.cy)} L${f1(x - 3)} ${f1(a.cy)}" fill="none" stroke="${C.a2}" stroke-width="2.4"/><path d="M${f1(x - 2)} ${f1(a.cy)} l-9 -4.5 l0 9 z" fill="${C.a2}"/>`; }
    y -= 22;
    if (spec.end) { s += arrow(W / 2, y + 2, W / 2, y + 20, { stroke: C.line, w: 2, head: 8 }) + card(10, y + 24, W - 20, spec.end, null, { size, colour: "good", fill: 0.14 }).s; y += 24 + 40; }
    return { s, H: y + 10 };
  }
  if (cycle) {
    const R = Math.min(W * 0.34, 210), cx = W / 2, cy = y0 + R * 0.78 + 30, bw = Math.min(150, (2 * Math.PI * R) / n - 14), bw2 = Math.max(120, bw);
    const boxes = spec.steps.map((st, i) => {
      const a = -Math.PI / 2 + (2 * Math.PI * i) / n, x = cx + Math.cos(a) * Math.min(R * 1.35, W / 2 - bw2 / 2 - 14), y = cy + Math.sin(a) * R * 0.78;
      const c = card(x - bw2 / 2, y - 25, bw2, st.label, st.note, { size, colour: st.colour || ["a1", "a5", "a4", "a3", "a2"][i % 5] });
      const ls = fit(st.label, bw2, size).length, h = c.h;
      return { s: card(x - bw2 / 2, y - h / 2, bw2, st.label, st.note, { size, colour: st.colour || ["a1", "a5", "a4", "a3", "a2"][i % 5] }).s, cx: x, cy: y, w: bw2, h, ls };
    });
    boxes.forEach((b, i) => { s += link(b, boxes[(i + 1) % n], { stroke: C.a2, w: 2.4 }); });
    boxes.forEach((b) => { s += b.s; });
    if (spec.centre) s += text(cx, cy, spec.centre, { size: size + 1, weight: 700, fill: C.soft });
    return { s, H: cy + R * 0.78 + 56 };
  }
  // wide chain: one row of chevron-style boxes
  const gap = 20, w = (W - 16 - gap * (n - 1)) / n;
  let y = y0;
  if (spec.support?.length) {
    const sw = (W - 16 - 8 * (spec.support.length - 1)) / spec.support.length;
    spec.support.forEach((l, i) => { s += card(8 + i * (sw + 8), y, sw, l, null, { size: size - 0.5, colour: "a4", fill: 0.1, weight: 600 }).s; });
    s += text(W / 2, y + 66, "support activities", { size: 11.5, weight: 600, fill: C.soft });
    y += 80;
  }
  const hs = spec.steps.map((st) => card(0, 0, w, st.label, st.note, { size }).h), h = Math.max(...hs);
  const boxes = spec.steps.map((st, i) => { const x = 8 + i * (w + gap); s += card(x, y, w, st.label, st.note, { size, colour: st.colour || ["a1", "a5", "a4", "a3", "a2"][i % 5], h }).s; return { cx: x + w / 2, cy: y + h / 2, w, h }; });
  boxes.slice(1).forEach((b, i) => { s += arrow(boxes[i].cx + w / 2 + 2, y + h / 2, b.cx - w / 2 - 2, y + h / 2, { stroke: C.line, w: 2, head: 8 }); });
  y += h;
  if (spec.end) { const e = card(8, y + 16, W - 16, spec.end, null, { size, colour: "good", fill: 0.14 }); s += e.s; y += 16 + e.h; }
  return { s, H: y + 12 };
}
function processChecks(spec, lessonText) {
  const out = [], labels = spec.steps.map((x) => x.label);
  out.push(check("steps are distinct and there are at least three", new Set(labels).size === labels.length && labels.length >= 3, `${labels.length} steps`));
  if (spec.expect) out.push(check("steps are in the order the lesson gives", JSON.stringify(labels) === JSON.stringify(spec.expect), labels.join(" → ")));
  if (spec.kind === "cycle") out.push(check("a cycle returns from its last step to its first", spec.loop !== false, `${labels.at(-1)} → ${labels[0]}`));
  out.push(grounded(spec, lessonText));
  return out;
}

// ================================================================ bars
// spec: kind: "columns" | "waterfall" | "stacked", prefix/suffix for money, range [min, max] optional,
//   columns: categories: [{label, short, values: [{id, v, series}]}], series: [{name, colour}]
//   waterfall: items: [{id, label, short, v, type: "start" | "delta" | "total"}]
//   stacked: stacks: [{label, parts: [{id, label, v, colour}]}]
//   relations: [{expr: "gross_profit = revenue - cost_of_sales" written as expr + equals}] over every id
function barsVars(spec) {
  const v = {};
  for (const c of spec.categories || []) for (const x of c.values) if (x.id) v[x.id] = x.v;
  for (const i of spec.items || []) if (i.id) v[i.id] = i.v;
  for (const st of spec.stacks || []) for (const p of st.parts) if (p.id) v[p.id] = p.v;
  return v;
}
function bars(spec, W, narrow) {
  const H = spec.height?.[narrow ? 1 : 0] || (narrow ? 330 : 360), size = SZ(narrow, 12.5);
  let s = title(spec, W);
  const p = { l: narrow ? 14 : 22, r: 12, t: pad(spec) + 24, b: narrow ? 58 : 46 };
  const lab = (c) => (narrow && c.short) || c.label;
  const levels = [];
  if (spec.kind === "waterfall") { let run = 0; for (const i of spec.items) { const from = i.type === "delta" ? run : 0; run = i.type === "delta" ? run + i.v : i.type === "start" ? i.v : run; levels.push([from, i.type === "delta" ? run : i.type === "total" ? run : i.v]); } }
  const all = spec.kind === "waterfall" ? levels.flat() : spec.kind === "stacked" ? spec.stacks.flatMap((st) => [0, st.parts.reduce((a, x) => a + x.v, 0)]) : spec.categories.flatMap((c) => c.values.map((x) => x.v));
  const lo = Math.min(0, spec.range?.[0] ?? Math.min(...all)), hi = spec.range?.[1] ?? Math.max(...all) * 1.12;
  const sy = (v) => H - p.b - ((v - lo) / (hi - lo || 1)) * (H - p.b - p.t);
  const n = spec.kind === "waterfall" ? spec.items.length : spec.kind === "stacked" ? spec.stacks.length : spec.categories.length;
  const slot = (W - p.l - p.r) / n;
  s += arrow(p.l, H - p.b + 2, W - p.r + 4, H - p.b + 2, { stroke: C.ink, w: 1.4, head: 7 });
  if (lo < 0) s += line(p.l, sy(0), W - p.r, sy(0), { stroke: C.line, w: 1.2, dash: "4 4" });
  const catLabel = (i, t) => wrap(t, Math.max(5, Math.floor(slot / (size * 0.52)))).forEach((l, j) => { s += text(p.l + slot * (i + 0.5), H - p.b + 18 + j * (size + 2), l, { size: size - 0.5, weight: 600, fill: C.soft }); });
  if (spec.kind === "columns") {
    const ns = spec.series.length, bw = Math.min(46, (slot - 10) / ns);
    spec.categories.forEach((c, i) => {
      c.values.forEach((x, k) => {
        const cx = p.l + slot * (i + 0.5) + (k - (ns - 1) / 2) * (bw + 3), colr = col(x.colour || spec.series[x.series ?? k].colour);
        const y1 = sy(Math.max(0, x.v)), y2 = sy(Math.min(0, x.v));
        s += `<rect x="${f1(cx - bw / 2)}" y="${f1(y1)}" width="${f1(bw)}" height="${f1(Math.max(1, y2 - y1))}" rx="4" fill="${colr}" fill-opacity=".78"/>`;
        const stag = ns > 1 && bw < tw(money(x.v, spec), size - 1) + 4 ? (k % 2) * (size + 1) : 0;
        s += text(cx, x.v >= 0 ? y1 - 9 - stag : y2 + 11 + stag, money(x.v, spec), { size: size - 1, weight: 700, fill: colr, halo: true });
      });
      catLabel(i, lab(c));
    });
    if (ns > 1 || spec.series[0]?.name) s += legend2(spec.series.filter((x) => x.name), p.l + 8, p.t - 22, size, narrow);
  } else if (spec.kind === "waterfall") {
    const bw = Math.min(54, slot - 12);
    spec.items.forEach((it, i) => {
      const [a, b] = levels[i], cx = p.l + slot * (i + 0.5), y1 = sy(Math.max(a, b)), y2 = sy(Math.min(a, b));
      const colr = it.type === "delta" ? (it.v >= 0 ? C.good : C.bad) : it.type === "total" ? C.a1 : C.a5;
      s += `<rect x="${f1(cx - bw / 2)}" y="${f1(y1)}" width="${f1(bw)}" height="${f1(Math.max(2, y2 - y1))}" rx="4" fill="${colr}" fill-opacity=".78"/>`;
      if (i < n - 1) s += line(cx + bw / 2, sy(b), cx + slot - bw / 2, sy(b), { stroke: C.line, w: 1.2, dash: "3 3" });
      s += text(cx, y1 - 9, (it.type === "delta" && it.v > 0 ? "+" : "") + money(it.v, spec), { size: size - 0.5, weight: 700, fill: colr, halo: true });
      catLabel(i, lab(it));
    });
  } else {
    const bw = Math.min(narrow ? 120 : 170, slot - 24);
    spec.stacks.forEach((st, i) => {
      let acc = 0;
      const cx = p.l + slot * (i + 0.5), total = st.parts.reduce((a, x) => a + x.v, 0);
      st.parts.forEach((pt, k) => {
        const y1 = sy(acc + pt.v), y2 = sy(acc), colr = col(pt.colour || ["a1", "a4", "a5", "a3", "a2"][k % 5]);
        s += `<rect x="${f1(cx - bw / 2)}" y="${f1(y1)}" width="${f1(bw)}" height="${f1(y2 - y1)}" fill="${colr}" fill-opacity=".2" stroke="${colr}" stroke-width="1.3"/>`;
        s += text(cx, (y1 + y2) / 2 - (y2 - y1 > 34 ? 7 : 0), pt.label, { size: size - 0.5, weight: 700 });
        if (y2 - y1 > 34) s += text(cx, (y1 + y2) / 2 + 9, money(pt.v, spec), { size: size - 1, fill: C.soft });
        acc += pt.v;
      });
      s += text(cx, sy(total) - 10, `${st.label}: ${money(total, spec)}`, { size, weight: 700, halo: true });
    });
  }
  return { s, H };
}
function legend2(items, x, y, size, narrow) {
  let s = "", cx = x;
  items.forEach((it) => { const w = tw(it.name, size) + 46; if (narrow && cx + w > 330) { cx = x; y += 18; } s += line(cx, y, cx + 22, y, { stroke: col(it.colour), w: 4 }) + text(cx + 28, y, it.name, { size, weight: 600, anchor: "start" }); cx += w; });
  return s;
}
function barsChecks(spec, lessonText) {
  const out = [], vars = barsVars(spec);
  if (spec.kind === "waterfall") {
    let run = 0; const bad = [];
    for (const i of spec.items) { if (i.type === "start") run = i.v; else if (i.type === "delta") run += i.v; else if (!near(run, i.v, 1e-6)) bad.push(`${i.label}: drawn ${i.v}, running total ${+run.toFixed(4)}`); }
    out.push(check("every subtotal equals the running total of the steps before it", !bad.length, bad.join("; ") || `${spec.items.filter((i) => i.type === "total").length} subtotals recomputed`));
  }
  for (const r of spec.relations || []) {
    try { const a = evalExpr(r.expr, vars), b = evalExpr(r.equals, vars); out.push(check(r.name || `${r.expr} = ${r.equals}`, near(a, b, r.tol ?? 1e-6), `${+a.toFixed(4)} against ${+b.toFixed(4)}`)); }
    catch (e) { out.push(check(r.name || r.expr, false, e.message)); }
  }
  if (!(spec.relations || []).length && spec.kind !== "waterfall") out.push(check("the diagram states at least one relation to recompute", false, "none given"));
  out.push(grounded(spec, lessonText));
  return out;
}

// ================================================================ network
// spec: activities: [{id, label, dur, after: [ids]}], claims: {duration, critical: [ids], float: {id: n}}
function network(spec, W, narrow) {
  const cp = criticalPath(spec.activities), by = new Map(spec.activities.map((a) => [a.id, a])), size = SZ(narrow, 13);
  const level = {};
  for (const id of cp.order) level[id] = Math.max(-1, ...(by.get(id).after || []).map((p) => level[p])) + 1;
  const nl = Math.max(...Object.values(level)) + 1, groups = Array.from({ length: nl }, () => []);
  for (const id of cp.order) groups[level[id]].push(id);
  const bw = narrow ? 112 : 132, bh = narrow ? 62 : 74, gx = narrow ? 14 : 0, y0 = pad(spec) + 4;
  const maxN = Math.max(...groups.map((g) => g.length));
  const pos = {};
  let H;
  if (narrow) {
    const rowH = bh + 34; H = y0 + nl * rowH - 24 + 44;
    groups.forEach((g, l) => g.forEach((id, i) => { pos[id] = { cx: W / 2 + (i - (g.length - 1) / 2) * (bw + gx), cy: y0 + bh / 2 + l * rowH }; }));
  } else {
    const colW = (W - 16) / nl, rowH = bh + 26; H = y0 + maxN * rowH + 50;
    groups.forEach((g, l) => g.forEach((id, i) => { pos[id] = { cx: 8 + colW * (l + 0.5), cy: y0 + bh / 2 + (maxN - g.length) * rowH / 2 + i * rowH }; }));
  }
  let s = title(spec, W), top = "";
  const crit = new Set(cp.critical);
  for (const a of spec.activities) for (const p of a.after || []) {
    const A = { ...pos[p], w: bw, h: bh }, B = { ...pos[a.id], w: bw, h: bh }, hot = crit.has(a.id) && crit.has(p) && cp.EF[p] === cp.ES[a.id];
    (hot ? (top += link(A, B, { stroke: C.a2, w: 3.2, head: 10 })) : (s += link(A, B, { stroke: C.line, w: 1.8 })));
  }
  s += top;
  for (const a of spec.activities) {
    const { cx, cy } = pos[a.id], hot = crit.has(a.id), colr = hot ? "a2" : "a1";
    s += `<rect x="${f1(cx - bw / 2)}" y="${f1(cy - bh / 2)}" width="${bw}" height="${bh}" rx="9" fill="${col(colr)}" fill-opacity="${hot ? 0.16 : 0.1}" stroke="${col(colr)}" stroke-width="${hot ? 2.4 : 1.3}"/>`;
    s += text(cx, cy - 17, `${a.id}: ${a.label}`.length * size * 0.56 > bw - 8 ? a.id : `${a.id} ${a.label}`, { size: size - 0.5, weight: 700 });
    s += text(cx, cy, `${a.dur} ${spec.timeUnit || "days"}`, { size: size - 1, fill: C.soft });
    s += text(cx - bw / 2 + 8, cy + 18, `${cp.ES[a.id]}`, { size: 11.5, weight: 600, anchor: "start", fill: C.soft }) + text(cx + bw / 2 - 8, cy + 18, `${cp.EF[a.id]}`, { size: 11.5, weight: 600, anchor: "end", fill: C.soft });
    s += text(cx, cy + 18, `float ${cp.float[a.id]}`, { size: 11, weight: 600, fill: hot ? C.a2 : C.soft });
  }
  s += text(W / 2, H - 26, `Critical path ${cp.critical.join(" → ")}: ${cp.duration} ${spec.timeUnit || "days"}`, { size: 12.5, weight: 700, fill: C.a2 });
  s += text(W / 2, H - 9, "corner numbers: earliest start and earliest finish", { size: 11.5, weight: 500, fill: C.soft });
  return { s, H };
}
function networkChecks(spec, lessonText) {
  const cp = criticalPath(spec.activities), c = spec.claims || {}, out = [];
  if (c.duration != null) out.push(check(`the project takes ${c.duration}`, cp.duration === c.duration, `forward pass gives ${cp.duration}`));
  if (c.critical) out.push(check(`the critical path is ${c.critical.join(" → ")}`, JSON.stringify(cp.critical) === JSON.stringify(c.critical), `found ${cp.critical.join(" → ")}`));
  for (const [id, f] of Object.entries(c.float || {})) out.push(check(`${id} has ${f} of float`, cp.float[id] === f, `found ${cp.float[id]}`));
  out.push(check("the network has no cycles and every predecessor exists", true, `${spec.activities.length} activities`));
  out.push(grounded(spec, lessonText));
  return out;
}

// ================================================================ blocks
// spec: cols, rows, blocks: [{label, col, row, cs, rs, note, colour}] (0-based), expect: [labels], cover: true
function blocks(spec, W, narrow) {
  const size = SZ(narrow, 13);
  let s = title(spec, W);
  const y0 = pad(spec);
  if (narrow) {
    let y = y0;
    const order = spec.narrowOrder ? spec.narrowOrder.map((l) => spec.blocks.find((b) => b.label === l) || spec.blocks[0]) : [...spec.blocks].sort((a, b) => a.row - b.row || a.col - b.col);
    for (const b of order) { const c = card(8, y, W - 16, b.label, b.note, { size, colour: b.colour || "a1", align: "start" }); s += c.s; y += c.h + 8; }
    return { s, H: y + 4 };
  }
  const cw = (W - 16 - 8 * (spec.cols - 1)) / spec.cols, rh = spec.rowH || 112;
  for (const b of spec.blocks) {
    const x = 8 + b.col * (cw + 8), y = y0 + b.row * (rh + 8), w = cw * (b.cs || 1) + 8 * ((b.cs || 1) - 1), h = rh * (b.rs || 1) + 8 * ((b.rs || 1) - 1);
    s += card(x, y, w, b.label, b.note, { size, colour: b.colour || "a1", h, align: "start" }).s;
  }
  return { s, H: y0 + spec.rows * (rh + 8) };
}
function blocksChecks(spec, lessonText) {
  const out = [], cells = new Map();
  let overlap = 0, outside = 0;
  for (const b of spec.blocks) for (let r = b.row; r < b.row + (b.rs || 1); r++) for (let c = b.col; c < b.col + (b.cs || 1); c++) {
    if (r >= spec.rows || c >= spec.cols) outside++;
    const k = `${r},${c}`; if (cells.has(k)) overlap++; cells.set(k, b.label);
  }
  out.push(check("no two blocks overlap and all fit the grid", !overlap && !outside, `${overlap} overlaps, ${outside} outside`));
  if (spec.cover) out.push(check("the blocks cover the whole grid", cells.size === spec.rows * spec.cols, `${cells.size} of ${spec.rows * spec.cols} cells`));
  if (spec.expect) { const got = spec.blocks.map((b) => b.label).sort(), want = [...spec.expect].sort(); out.push(check("the blocks are exactly those the lesson names", JSON.stringify(got) === JSON.stringify(want), got.join(", "))); }
  out.push(grounded(spec, lessonText));
  return out;
}

// ================================================================ radial
// spec: centre: {label, note}, arms: [{label, note, dir: "top" | "bottom" | "left" | "right" | angle}], inward: true
function radial(spec, W, narrow) {
  const size = SZ(narrow, 13), arms = spec.arms, cross = arms.length === 4 && arms.every((a) => typeof a.dir === "string");
  let s = title(spec, W);
  const y0 = pad(spec) + 2, inward = spec.inward !== false;
  const hub = (cx, cy, w) => { const c = card(cx - w / 2, cy, w, spec.centre.label, spec.centre.note, { size: size + 0.5, colour: "a2", fill: 0.16, minH: 70 }); return { ...c, cx, cy: cy + c.h / 2, w }; };
  const arm = (a, cx, cy, w, i) => { const c = card(cx - w / 2, cy, w, a.label, a.note, { size, colour: a.colour || ["a1", "a5", "a4", "a3"][i % 4], minH: 60 }); return { ...c, cx, cy: cy + c.h / 2, w }; };
  if (cross && !narrow) {
    const aw = 190, hw = 190, side = (W - 16 - hw - 2 * 70) / 2, sw = Math.min(190, Math.max(150, side + 40));
    const top = arms.findIndex((a) => a.dir === "top"), bot = arms.findIndex((a) => a.dir === "bottom"), lef = arms.findIndex((a) => a.dir === "left"), rig = arms.findIndex((a) => a.dir === "right");
    const cx = W / 2, T = arm(arms[top], cx, y0, aw, top), cy0 = y0 + T.h + 40, Hh = hub(cx, cy0, hw);
    const L = arm(arms[lef], 8 + sw / 2, Hh.cy - 35, sw, lef), Rr = arm(arms[rig], W - 8 - sw / 2, Hh.cy - 35, sw, rig), B = arm(arms[bot], cx, cy0 + Hh.h + 40, aw, bot);
    const dir = (from, to) => (inward ? link(from, to, { stroke: C.a2, w: 2.6, head: 10 }) : link(to, from, { stroke: C.a2, w: 2.6, head: 10 }));
    s += dir(T, Hh) + dir(B, Hh) + dir(L, Hh) + dir(Rr, Hh) + T.s + B.s + L.s + Rr.s + Hh.s;
    return { s, H: B.cy + B.h / 2 + 14 };
  }
  if (cross && narrow) {
    const T = arm(arms.find((a) => a.dir === "top"), W / 2, y0, W - 80, 0), w3 = (W - 16 - 20) / 3;
    const cy0 = y0 + T.h + 28, lA = arms.find((a) => a.dir === "left"), rA = arms.find((a) => a.dir === "right");
    const Hh = hub(W / 2, cy0, w3 + 8), L = arm(lA, 8 + w3 / 2, cy0, w3, 1), Rr = arm(rA, W - 8 - w3 / 2, cy0, w3, 2), B = arm(arms.find((a) => a.dir === "bottom"), W / 2, cy0 + Math.max(Hh.h, L.h, Rr.h) + 28, W - 80, 3);
    const rowH = Math.max(Hh.h, L.h, Rr.h);
    for (const b of [Hh, L, Rr]) { b.cy = cy0 + rowH / 2; }
    const dir = (from, to) => (inward ? link(from, to, { stroke: C.a2, w: 2.4, head: 9 }) : link(to, from, { stroke: C.a2, w: 2.4, head: 9 }));
    s += dir(T, Hh) + dir(B, Hh) + dir(L, Hh) + dir(Rr, Hh) + T.s + B.s + L.s + Rr.s + Hh.s;
    return { s, H: B.cy + B.h / 2 + 14 };
  }
  if (!narrow) {
    const R = Math.min(W * 0.36, 250), cx = W / 2, cy = y0 + R * 0.62 + 40, aw = 170;
    const Hh = hub(cx, cy - 35, 170);
    const bs = arms.map((a, i) => { const ang = (typeof a.dir === "number" ? a.dir : (360 * i) / arms.length) * Math.PI / 180 - Math.PI / 2; return arm(a, cx + Math.cos(ang) * R * 1.15, cy + Math.sin(ang) * R * 0.62 - 28, aw, i); });
    for (const b of bs) s += inward ? link(b, Hh, { stroke: C.a2, w: 2.4 }) : link(Hh, b, { stroke: C.a2, w: 2.4 });
    for (const b of bs) s += b.s;
    return { s: s + Hh.s, H: cy + R * 0.62 + 80 };
  }
  let y = y0;
  const Hh = hub(W / 2, y, W - 120); y += Hh.h + 26;
  const placed = arms.map((a, i) => { const b = arm(a, W / 2, y, W - 30, i); y += b.h + 22; return b; });
  for (const b of placed) s += inward ? arrow(b.cx, b.cy - b.h / 2 - 2, b.cx, b.cy - b.h / 2 - 20, { stroke: C.a2, w: 2.4, head: 9 }) : arrow(b.cx, b.cy - b.h / 2 - 20, b.cx, b.cy - b.h / 2 - 2, { stroke: C.a2, w: 2.4, head: 9 });
  for (const b of placed) s += b.s;
  return { s: s + Hh.s, H: y };
}
function radialChecks(spec, lessonText) {
  const out = [], labels = spec.arms.map((a) => a.label);
  if (spec.count) out.push(check(`${spec.count} elements including the hub`, labels.length + 1 === spec.count, `${labels.length} arms plus the hub`));
  out.push(check("arms are distinct and none repeats the hub", new Set([...labels, spec.centre.label]).size === labels.length + 1, labels.join(", ")));
  const dirs = spec.arms.filter((a) => typeof a.dir === "string").map((a) => a.dir);
  out.push(check("no two arms share a side", new Set(dirs).size === dirs.length));
  out.push(grounded(spec, lessonText));
  return out;
}

register({
  matrix: { draw: matrix, checks: matrixChecks, widths: [700, 380] },
  layers: { draw: layers, checks: layersChecks, widths: [700, 380] },
  orgchart: { draw: orgchart, checks: orgChecks, widths: [700, 380] },
  process: { draw: process, checks: processChecks, widths: [700, 380] },
  bars: { draw: bars, checks: barsChecks, widths: [680, 400] },
  network: { draw: network, checks: networkChecks, widths: [700, 380] },
  blocks: { draw: blocks, checks: blocksChecks, widths: [700, 380] },
  radial: { draw: radial, checks: radialChecks, widths: [700, 380] },
});
