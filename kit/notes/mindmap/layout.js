// Spidermap layouts. Each takes the map and returns { [id]: { x, y } } (node centres, root at 0,0).
// Pure, so Node can test them. To add a layout, write a function here, add it to LAYOUT_FNS and to LAYOUTS in config.js.
import { NODE_TYPES } from "./config.js";

const childrenOf = (map) => {
  const kids = new Map(map.nodes.map((n) => [n.id, []]));
  for (const n of map.nodes) if (n.parent && kids.has(n.parent)) kids.get(n.parent).push(n);
  return kids;
};
const size = (n) => NODE_TYPES[n.type] || NODE_TYPES.term;

// the spider: topics are arms around your notes, each topic's terms fan out at the end of its arm.
// Arms with more terms get a wider share of the circle, and the outer ring grows until the terms fit.
export function spider(map) {
  const kids = childrenOf(map), arms = kids.get("root") || [], pos = { root: { x: 0, y: 0 } };
  if (!arms.length) return pos;
  const weight = (a) => Math.max(1, (kids.get(a.id) || []).length);
  const total = arms.reduce((s, a) => s + weight(a), 0);
  const R1 = Math.max(250, arms.length * 48);
  let R2 = R1 + 240;
  for (const a of arms) {
    const n = (kids.get(a.id) || []).length, sector = (2 * Math.PI * weight(a)) / total;
    if (n > 1) R2 = Math.max(R2, (150 * n) / (sector * 0.86));
  }
  let angle = -Math.PI / 2 - (Math.PI * weight(arms[0])) / total;
  for (const a of arms) {
    const sector = (2 * Math.PI * weight(a)) / total, mid = angle + sector / 2;
    pos[a.id] = { x: R1 * Math.cos(mid), y: R1 * Math.sin(mid) };
    const legs = kids.get(a.id) || [];
    legs.forEach((c, k) => {
      const t = legs.length === 1 ? mid : mid - (sector * 0.86) / 2 + ((sector * 0.86) * k) / (legs.length - 1);
      const r = R2 + (legs.length > 2 && k % 2 ? 70 : 0);
      pos[c.id] = { x: r * Math.cos(t), y: r * Math.sin(t) };
      placeOutward(kids, c, pos, t);
    });
    angle += sector;
  }
  return pos;
}
// learner notes hanging off a term continue outward along the same line
function placeOutward(kids, n, pos, t) {
  (kids.get(n.id) || []).forEach((g, j) => {
    const r = 170 + j * 20, d = (j - ((kids.get(n.id).length - 1) / 2)) * 0.35;
    pos[g.id] = { x: pos[n.id].x + r * Math.cos(t + d), y: pos[n.id].y + r * Math.sin(t + d) };
    placeOutward(kids, g, pos, t + d);
  });
}

// the flow: your notes in the middle, topics flowing out to both sides, each fanning out to its terms.
// Arms go to whichever side is shorter so far, so the two sides balance.
export function flow(map) {
  const kids = childrenOf(map), arms = kids.get("root") || [], pos = { root: { x: 0, y: 0 } };
  const ROW = 124, GAP = 48, X = [0, 340, 680, 980];
  const rows = (n) => Math.max(1, leafCount(kids, n));
  const sides = [{ dir: 1, arms: [], h: 0 }, { dir: -1, arms: [], h: 0 }];
  for (const a of arms) { const s = sides[0].h <= sides[1].h ? sides[0] : sides[1]; s.arms.push(a); s.h += rows(a) * ROW + GAP; }
  for (const s of sides) {
    let y = -(s.h - GAP) / 2;
    for (const a of s.arms) {
      const h = rows(a) * ROW;
      pos[a.id] = { x: s.dir * X[1], y: y + h / 2 - ROW / 2 };
      let cy = y;
      for (const c of kids.get(a.id) || []) {
        const ch = rows(c) * ROW;
        pos[c.id] = { x: s.dir * X[2], y: cy + ch / 2 - ROW / 2 };
        (kids.get(c.id) || []).forEach((g, j) => { pos[g.id] = { x: s.dir * X[3], y: cy + j * ROW }; });
        cy += ch;
      }
      y += h + GAP;
    }
  }
  return pos;
}
const leafCount = (kids, n) => { const k = kids.get(n.id) || []; return k.length ? k.reduce((s, c) => s + Math.max(1, leafCount(kids, c)), 0) : 1; };

// the tree: a knowledge organiser, notes at the top and each topic a column of its terms
export function tree(map) {
  const kids = childrenOf(map), arms = kids.get("root") || [], pos = { root: { x: 0, y: 0 } };
  const COL = 280, width = (arms.length - 1) * COL;
  arms.forEach((a, i) => {
    const x = i * COL - width / 2;
    pos[a.id] = { x, y: 250 };
    let y = 250 + 128;
    for (const c of kids.get(a.id) || []) {
      pos[c.id] = { x, y }; y += 124;
      for (const g of kids.get(c.id) || []) { pos[g.id] = { x: x + 14, y }; y += 80; }
    }
  });
  return pos;
}

export const LAYOUT_FNS = { spider, flow, tree };

// Nudge overlapping nodes apart (simple box separation). Pinned ids (the root, anything the learner has
// dragged) stay put. Keeps every layout readable however many terms a topic has.
export function relax(map, pos, { pinned = new Set(["root"]), pad = 14, rounds = 80 } = {}) {
  const ids = map.nodes.map((n) => n.id).filter((id) => pos[id]);
  const box = Object.fromEntries(map.nodes.map((n) => [n.id, size(n)]));
  for (let r = 0; r < rounds; r++) {
    let moved = false;
    for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
      const a = ids[i], b = ids[j], A = pos[a], B = pos[b];
      const ox = (box[a].w + box[b].w) / 2 + pad - Math.abs(A.x - B.x), oy = (box[a].h + box[b].h) / 2 + pad - Math.abs(A.y - B.y);
      if (ox <= 0 || oy <= 0) continue;
      moved = true;
      const pa = pinned.has(a), pb = pinned.has(b);
      if (pa && pb) continue;
      const share = pa ? [0, 1] : pb ? [1, 0] : [0.5, 0.5];
      if (ox < oy) { const s = Math.sign(B.x - A.x) || 1; A.x -= s * ox * share[0]; B.x += s * ox * share[1]; }
      else { const s = Math.sign(B.y - A.y) || 1; A.y -= s * oy * share[0]; B.y += s * oy * share[1]; }
    }
    if (!moved) break;
  }
  return pos;
}

export function layout(map, id = "spider", o) {
  const pos = (LAYOUT_FNS[id] || spider)(map);
  return relax(map, pos, o);
}

export function bounds(map, pos, ids = map.nodes.map((n) => n.id)) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const id of ids) {
    const p = pos[id], n = map.byId.get(id);
    if (!p || !n) continue;
    const s = size(n);
    x0 = Math.min(x0, p.x - s.w / 2); x1 = Math.max(x1, p.x + s.w / 2);
    y0 = Math.min(y0, p.y - s.h / 2); y1 = Math.max(y1, p.y + s.h / 2);
  }
  return Number.isFinite(x0) ? { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 } : { x0: -100, y0: -100, x1: 100, y1: 100, w: 200, h: 200 };
}
