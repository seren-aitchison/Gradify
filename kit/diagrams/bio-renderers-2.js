// Gradify Visual Learning Engine: biology renderers, part 2 (see bio-renderers.js for part 1 and bio-core.js for the
// biology). Every renderer checks the biology it draws, the lesson tie and the layout at both widths:
//
//   bio-punnett   gametes from each parent's genotype, every offspring square, genotype and phenotype ratios and the
//                 stated dominance recomputed
//   bio-pedigree  which inheritance modes fit the family (every genotype assignment searched), the stated mode among
//                 them, any genotype the lesson says is certain is forced
//   bio-sequence  template strand, mRNA and amino acids recomputed from the coding strand with the standard codon
//                 table; a mutation's effect (silent, missense, nonsense, frameshift) recomputed
//   bio-division  chromosome and chromatid counts per cell at each stage of mitosis or meiosis, from the drawn
//                 chromosomes and from the stage table
//   bio-pathway   a cycle or chain of steps: carbon atoms conserved at every step, ATP / NADH / CO₂ … tallied
//                 against the stated totals
//   bio-foodweb   trophic levels computed from who eats whom, against the levels the lesson states; no feeding loops
import { register, line, arrow, col, f1, check, COLOURS as C } from "./renderers.js";
import { Pic, layoutChecks, named, textWidth, cross, genes, gametes, reduce, sameRatio, ratioText, dominanceProblems, pedigreeSolve, diseaseCount, MODES,
  complement, transcribe, translate, mutationEffect, hBonds, stageCounts, DIVISION_STAGES, pathwayTally, trophicLevels } from "./bio-core.js";
import { fx, spread } from "./bio-renderers.js";

const rect = (x, y, w, h, { f = "panel", fo = 1, s = "line", sw = 1.4, r = 8, dash = "" } = {}) =>
  `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${r}" fill="${col(f)}" fill-opacity="${fo}" stroke="${col(s)}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
const termCheck = (terms, lessonText, what) => {
  const miss = terms.filter((t) => !named(t.name, lessonText, t.aka || []));
  return check(`every ${what} is named in the lesson`, !miss.length, miss.length ? `not in the lesson: ${miss.map((t) => t.name).join(", ")}` : `${terms.length} named`);
};
const PAL = ["a1", "a2", "a4", "a3", "a5", "good"];
const allele = (a) => a.replace(/^X([A-Za-z])$/, "X^{$1}").replace(/^I([AB])$/, "I^{$1}");
const genoText = (k) => (k.match(/X[A-Za-z]|Y|I[AB]|[A-Za-z]/g) || []).map(allele).join("");

// ======================================================================== bio-punnett
// spec: parents [p1, p2] ("Aa", "AaBb", "XHXh", or [["IA","i"]]), names [label1, label2], phenotypes (one map per gene,
//   canonical genotype → phenotype), dominance ("complete" | "incomplete" | "codominant" | {het: mode}), ratio
//   {genotypes, phenotypes} as stated in the lesson
function punnett(spec, W, narrow) {
  const p = new Pic(W), { g1, g2, grid, pheno } = cross(spec.parents[0], spec.parents[1], spec.phenotypes);
  const phs = Object.keys(pheno), colour = (ph) => col(spec.colours?.[ph] || PAL[phs.indexOf(ph) % PAL.length]);
  const n1 = g1.length, n2 = g2.length, cs = Math.min(narrow ? 72 : 78, (W - 32) / (n2 + 1)), size = n2 > 2 ? 13 : 15, gx = 16, gy = 50;
  const head = `${spec.names?.[0] || "parent 1"} ${genoText(genes(spec.parents[0]).map((q) => q.join("")).join(""))} × ${spec.names?.[1] || "parent 2"} ${genoText(genes(spec.parents[1]).map((q) => q.join("")).join(""))}`;
  p.t(gx, 18, head, { size: narrow ? 13 : 14, weight: 700, anchor: "start" });
  p.t(gx + cs + (n2 * cs) / 2, gy - 12, `gametes of ${spec.names?.[1] || "parent 2"}`, { size: 11.5, fill: C.soft });
  p.add(rect(gx, gy, cs, cs, { f: "panel", s: "line", r: 0 }));
  p.t(gx + cs / 2, gy + cs / 2, "gametes", { size: 10.5, fill: C.soft });
  g2.forEach((g, j) => { p.add(rect(gx + (j + 1) * cs, gy, cs, cs, { f: "a1", fo: 0.08, s: "line", r: 0 })); p.t(gx + (j + 1.5) * cs, gy + cs / 2, g.map(allele).join(""), { size, weight: 700, fill: col("a1") }); });
  g1.forEach((g, i) => {
    p.add(rect(gx, gy + (i + 1) * cs, cs, cs, { f: "a2", fo: 0.08, s: "line", r: 0 })); p.t(gx + cs / 2, gy + (i + 1.5) * cs, g.map(allele).join(""), { size, weight: 700, fill: col("a2") });
    grid[i].forEach((c, j) => { p.add(`<rect x="${f1(gx + (j + 1) * cs)}" y="${f1(gy + (i + 1) * cs)}" width="${f1(cs)}" height="${f1(cs)}" fill="${colour(c.ph)}" fill-opacity=".16" stroke="${C.line}" stroke-width="1.2"/>`); p.t(gx + (j + 1.5) * cs, gy + (i + 1.5) * cs, genoText(c.key), { size, weight: 600 }); });
  });
  let lx = narrow ? gx : gx + (n2 + 1) * cs + 28, ly = narrow ? gy + (n1 + 1) * cs + 26 : gy + 12;
  const total = n1 * n2, r = reduce(pheno);
  p.t(lx, ly, "offspring phenotypes", { size: 12, weight: 700, anchor: "start", fill: C.soft }); ly += 22;
  for (const ph of phs) { p.add(`<rect x="${f1(lx)}" y="${f1(ly - 7)}" width="14" height="14" rx="3" fill="${colour(ph)}" fill-opacity=".5"/>`); p.t(lx + 22, ly, `${ph}: ${pheno[ph]}/${total}`, { size: 13, weight: 600, anchor: "start" }); ly += 21; }
  p.t(lx, ly + 4, `ratio ${phs.map((ph) => r[ph]).join(" : ")}`, { size: 13, weight: 700, anchor: "start" }); ly += 26;
  const H = Math.max(gy + (n1 + 1) * cs + 16, ly + 4);
  return p.done(H);
}
function punnettChecks(spec, lessonText) {
  let res; try { res = cross(spec.parents[0], spec.parents[1], spec.phenotypes); } catch (e) { return [check("the genotypes and phenotype table can be read", false, e.message)]; }
  const out = [], het = genes(spec.parents[0]).filter(([a, b]) => a !== b).length;
  out.push(check(`parent 1 makes ${2 ** het} kinds of gamete`, new Set(res.g1.map((g) => g.join())).size === 2 ** het));
  if (spec.ratio?.genotypes) out.push(check(`genotype ratio is ${ratioText(spec.ratio.genotypes)}`, sameRatio(res.geno, spec.ratio.genotypes), `computed ${ratioText(res.geno)}`));
  if (spec.ratio?.phenotypes) out.push(check(`phenotype ratio is ${ratioText(spec.ratio.phenotypes)}`, sameRatio(res.pheno, spec.ratio.phenotypes), `computed ${ratioText(res.pheno)}`));
  if (spec.dominance) {
    const maps = Array.isArray(spec.phenotypes) ? spec.phenotypes : [spec.phenotypes], gs = [genes(spec.parents[0]), genes(spec.parents[1])];
    const bad = maps.flatMap((m, i) => dominanceProblems(m, Array.isArray(spec.dominance) ? spec.dominance[i] : spec.dominance, [...gs[0][i], ...gs[1][i]]));
    out.push(check("the phenotypes show the stated dominance", !bad.length, bad.join("; ")));
  }
  if (!spec.ratio) out.push(check("the lesson's ratio is stated", false, "give ratio.genotypes and/or ratio.phenotypes"));
  out.push(termCheck(Object.keys(res.pheno).flatMap((k) => k.split(", ")).filter((v, i, a) => a.indexOf(v) === i).map((name) => ({ name, aka: spec.aka?.[name] })), lessonText, "phenotype"));
  return [...out, ...layoutChecks(spec, punnett, [720, 380])];
}

// ======================================================================== bio-pedigree
// spec: people [{id, sex, affected, carrier?, parents?, label?}] parents first, generation from the parents (or gen),
//   mode (the lesson's conclusion), consistent [modes the lesson says fit], genotypes {id: "Aa"} the lesson says are certain
const ROMAN = ["I", "II", "III", "IV", "V"];
function gens(people) { const g = {}; for (const q of people) g[q.id] = q.gen || (q.parents ? Math.max(...q.parents.map((x) => g[x] ?? 1)) + 1 : null); for (const q of people) if (!g[q.id]) { const kid = people.find((k) => k.parents?.includes(q.id)), mate = kid?.parents.find((x) => x !== q.id); g[q.id] = (mate && g[mate]) || (kid ? g[kid.id] - 1 : 1); } return g; }
function pedigree(spec, W, narrow) {
  const p = new Pic(W), P = spec.people, G = gens(P), ng = Math.max(...Object.values(G)), row = narrow ? 84 : 96, s = narrow ? 22 : 28, top = 30;
  const rows = Array.from({ length: ng }, (_, i) => P.filter((q) => G[q.id] === i + 1)), maxN = Math.max(...rows.map((r) => r.length));
  const slot = Math.min(narrow ? 52 : 86, (W - 50) / maxN), pos = {};
  rows.forEach((r, i) => { const x0 = 34 + (W - 34 - r.length * slot) / 2; r.forEach((q, j) => (pos[q.id] = [x0 + (j + 0.5) * slot, top + i * row + s / 2])); p.t(14, top + i * row + s / 2, ROMAN[i], { size: 13, weight: 700, fill: C.soft }); });
  const couples = {};
  for (const q of P.filter((k) => k.parents)) { const key = [...q.parents].sort().join("+"); (couples[key] ||= []).push(q.id); }
  for (const [key, kids] of Object.entries(couples)) {
    const [a, b] = key.split("+").map((x) => pos[x]), mx = (a[0] + b[0]) / 2, y = a[1], yb = y + row / 2;
    p.add(line(Math.min(a[0], b[0]) + s / 2, y, Math.max(a[0], b[0]) - s / 2, y, { stroke: C.ink, w: 1.8 }) + line(mx, y, mx, yb, { stroke: C.ink, w: 1.8 }));
    const xs = kids.map((k) => pos[k][0]);
    p.add(line(Math.min(mx, ...xs), yb, Math.max(mx, ...xs), yb, { stroke: C.ink, w: 1.8 }));
    for (const k of kids) p.add(line(pos[k][0], yb, pos[k][0], pos[k][1] - s / 2, { stroke: C.ink, w: 1.8 }));
  }
  for (const q of P) {
    const [x, y] = pos[q.id], f = q.affected ? col("a2") : "#ffffff";
    p.add(q.sex === "m" ? `<rect x="${f1(x - s / 2)}" y="${f1(y - s / 2)}" width="${s}" height="${s}" fill="${f}" stroke="${C.ink}" stroke-width="1.8"/>` : `<circle cx="${f1(x)}" cy="${f1(y)}" r="${s / 2}" fill="${f}" stroke="${C.ink}" stroke-width="1.8"/>`);
    if (q.carrier) p.add(`<circle cx="${f1(x)}" cy="${f1(y)}" r="${s / 6}" fill="${C.ink}"/>`);
    p.t(x, y + s / 2 + 12, q.label || q.id, { size: narrow ? 11 : 12, fill: C.soft });
  }
  let y = top + (ng - 1) * row + s + 40;
  const key = [["affected", "a2"], ["unaffected", "#ffffff"], ...(P.some((q) => q.carrier) ? [["carrier", "dot"]] : [])];
  let x = 16;
  for (const [t, c] of key) {
    p.add(c === "dot" ? `<circle cx="${x + 8}" cy="${y}" r="8" fill="#fff" stroke="${C.ink}" stroke-width="1.6"/><circle cx="${x + 8}" cy="${y}" r="3" fill="${C.ink}"/>` : `<rect x="${x}" y="${y - 8}" width="16" height="16" fill="${col(c)}" stroke="${C.ink}" stroke-width="1.6"/>`);
    x += 22 + p.t(x + 22, y, t, { size: 12, anchor: "start" }) + 18;
  }
  p.t(x, y, "□ male  ○ female", { size: 12, anchor: "start", fill: C.soft });
  return p.done(y + 18);
}
function pedigreeChecks(spec, lessonText) {
  const out = [];
  let fits; try { fits = MODES.filter((m) => pedigreeSolve(spec.people, m).ok); } catch (e) { return [check("the family can be read", false, e.message)]; }
  out.push(check(`the stated mode (${spec.mode}) fits the family`, fits.includes(spec.mode), `fits: ${fits.join(", ") || "none"}`));
  if (spec.consistent) out.push(check("exactly the stated modes fit the family", [...spec.consistent].sort().join() === [...fits].sort().join(), `fits: ${fits.join(", ") || "none"}`));
  if (spec.genotypes) {
    const sol = pedigreeSolve(spec.people, spec.mode), bad = [];
    for (const [id, g] of Object.entries(spec.genotypes)) { const want = diseaseCount(g, spec.mode), can = [...(sol.possible[id] || [])]; if (can.length !== 1 || can[0] !== want) bad.push(`${id}: stated ${g}, possible disease-allele counts ${can.join(" or ") || "none"}`); }
    out.push(check(`the genotypes the lesson states are certain under ${spec.mode}`, !bad.length, bad.join("; ")));
  }
  const G = gens(spec.people), notAdj = [];
  for (const q of spec.people.filter((k) => k.parents)) { const r = spec.people.filter((k) => G[k.id] === G[q.parents[0]]).map((k) => k.id); if (Math.abs(r.indexOf(q.parents[0]) - r.indexOf(q.parents[1])) !== 1) notAdj.push(q.parents.join("+")); }
  out.push(check("partners are drawn side by side", !notAdj.length, [...new Set(notAdj)].join(", ")));
  out.push(termCheck([{ name: spec.mode, aka: [spec.mode.split(" ").at(-1)] }], lessonText, "inheritance mode"));
  return [...out, ...layoutChecks(spec, pedigree, [700, 380])];
}

// ======================================================================== bio-sequence
// spec: coding (DNA coding strand 5′→3′), show ["coding", "template", "mrna", "protein"], the lesson's stated
//   template (3′→5′, aligned), mrna, protein [three-letter], hbonds; mutated {coding, effect}
const BASEC = { A: "a4", T: "a3", U: "a3", G: "a5", C: "a2" };
function sequence(spec, W, narrow) {
  const p = new Pic(W), rows = [], show = spec.show || ["coding", "template", "mrna", "protein"], cod = spec.coding.toUpperCase();
  const rowOf = { coding: ["DNA coding strand", cod, "5′", "3′"], template: ["DNA template strand", complement(cod), "3′", "5′"], mrna: ["mRNA", transcribe(cod), "5′", "3′"], protein: ["amino acids", translate(transcribe(cod)), "N", "C"] };
  for (const k of show) rows.push([k, ...rowOf[k]]);
  if (spec.mutated) { const m = spec.mutated.coding.toUpperCase(); rows.push(["mcoding", "mutated coding strand", m, "5′", "3′"], ["mprotein", "mutated amino acids", translate(transcribe(m)), "N", "C"]); }
  const bs = 26, lab = narrow ? 0 : 168, x0 = 16 + lab + 34, per = narrow ? 12 : Math.floor((W - x0 - 30) / bs / 3) * 3;
  const len = Math.max(cod.length, spec.mutated?.coding.length || 0), chunks = Math.ceil(len / per), rh = narrow ? 46 : 34;
  let y = 16;
  for (let c = 0; c < chunks; c++) {
    for (const [k, name, seq, e5, e3] of rows) {
      if (narrow) { p.t(16, y + 6, name, { size: 11.5, weight: 600, anchor: "start", fill: C.soft }); y += 16; }
      else p.t(16 + lab, y + bs / 2, name, { size: 13, weight: 600, anchor: "end" });
      const yy = y, xs = narrow ? 30 : x0;
      p.t(xs - 8, yy + bs / 2, c === 0 ? e5 : "…", { size: 11, weight: 700, anchor: "end", fill: C.soft });
      if (k === "protein" || k === "mprotein") {
        const aa = seq.slice(c * (per / 3), (c + 1) * (per / 3));
        aa.forEach((a, i) => { p.add(rect(xs + i * 3 * bs + 2, yy, 3 * bs - 4, bs, { f: a === "Stop" ? "bad" : "a1", fo: 0.12, s: a === "Stop" ? "bad" : "a1", sw: 1.2, r: 12 })); p.t(xs + (i * 3 + 1.5) * bs, yy + bs / 2, a, { size: 12.5, weight: 700 }); });
        if (c === chunks - 1 && aa.length) p.t(xs + aa.length * 3 * bs + 8, yy + bs / 2, e3, { size: 11, weight: 700, anchor: "start", fill: C.soft });
      } else {
        const part = seq.slice(c * per, (c + 1) * per), ref = k === "mcoding" ? cod.slice(c * per, (c + 1) * per) : null;
        [...part].forEach((b, i) => {
          const changed = ref && ref[i] !== b;
          p.add(rect(xs + i * bs + 1, yy, bs - 2, bs, { f: BASEC[b], fo: 0.2, s: changed ? "bad" : BASEC[b], sw: changed ? 2.6 : 1, r: 4 }));
          p.t(xs + (i + 0.5) * bs, yy + bs / 2, b, { size: 13.5, weight: 700, fill: col(BASEC[b]) });
        });
        if (k === "coding" || k === "mrna" || k === "mcoding") for (let i = 3; i < part.length; i += 3) p.add(line(xs + i * bs, yy - 3, xs + i * bs, yy + bs + 3, { stroke: C.soft, w: 1.2 }));
        p.t(xs + part.length * bs + 8, yy + bs / 2, c === chunks - 1 ? e3 : "…", { size: 11, weight: 700, anchor: "start", fill: C.soft });
      }
      y += narrow ? rh - 16 : rh;
    }
    y += 12;
  }
  if (spec.mutated) { p.t(16, y + 4, `effect: ${spec.mutated.effect} mutation`, { size: 13.5, weight: 700, anchor: "start", fill: col("bad") }); y += 22; }
  if (spec.hbonds) { p.t(16, y + 4, `hydrogen bonds holding the two strands: ${spec.hbonds} (A–T 2, G–C 3)`, { size: 12.5, anchor: "start", fill: C.soft }); y += 22; }
  return p.done(y + 6);
}
function sequenceChecks(spec, lessonText) {
  const out = [], cod = spec.coding.toUpperCase();
  try { complement(cod); } catch (e) { return [check("the coding strand is DNA", false, e.message)]; }
  if (spec.template) out.push(check("template strand pairs with the coding strand (A–T, G–C)", spec.template.toUpperCase() === complement(cod), `pairs to ${complement(cod)}`));
  if (spec.mrna) out.push(check("mRNA = coding strand with U for T (complementary to the template)", spec.mrna.toUpperCase() === transcribe(cod), transcribe(cod)));
  if (spec.protein) { const t = translate(transcribe(cod)); out.push(check("amino acids read from the mRNA codons (standard genetic code)", spec.protein.join("-") === t.join("-"), t.join("-"))); }
  if ((spec.show || []).includes("protein") || spec.protein) out.push(check("the sequence is whole codons", cod.length % 3 === 0, `${cod.length} bases`));
  if (spec.hbonds != null) out.push(check("hydrogen bonds counted (A–T 2, G–C 3)", spec.hbonds === hBonds(cod), `${hBonds(cod)}`));
  if (spec.mutated) { const e = mutationEffect(cod, spec.mutated.coding.toUpperCase()); out.push(check(`the mutation is ${spec.mutated.effect}`, e === spec.mutated.effect, `recomputed: ${e}`)); }
  const terms = [{ name: "base pairing", aka: ["complementary", "base pair", "pairs with"] }];
  if ((spec.show || []).includes("mrna") || spec.mrna) terms.push({ name: "mRNA", aka: ["messenger RNA"] });
  if (spec.protein) terms.push({ name: "codon" });
  if (spec.mutated) terms.push({ name: spec.mutated.effect });
  out.push(termCheck(terms, lessonText, "key idea"));
  return [...out, ...layoutChecks(spec, sequence, [760, 380])];
}

// ======================================================================== bio-division
// spec: process "mitosis" | "meiosis", diploid (2n: 2, 4 or 6), stages [{name, chromosomes, chromatids}] per cell
function stageModel(process, stage, k) {
  const all = (c) => Array.from({ length: k }, (_, i) => [{ pair: i, mat: true, c }, { pair: i, mat: false, c }]).flat();
  const side = (left, c) => Array.from({ length: k }, (_, i) => ({ pair: i, mat: (i % 2 === 0) === left, c }));
  const M = {
    "interphase (G1)": ["nucleus", [all(1)]], "interphase (G2)": ["nucleus", [all(2)]], prophase: ["prophase", [all(2)]], "prophase I": ["prophase", [all(2)]],
    metaphase: ["plate", [all(2)]], "metaphase I": ["bivalent", [all(2)]], anaphase: ["poles", [all(1), all(1)]], "anaphase I": ["poles", [side(true, 2), side(false, 2)]],
    telophase: ["nuclei", [all(1), all(1)]], "daughter cells": ["cells", [all(1), all(1)]], "telophase I": ["nuclei", [side(true, 2), side(false, 2)]],
    "prophase II": ["prophase", [side(true, 2)]], "metaphase II": ["plate", [side(true, 2)]], "anaphase II": ["poles", [side(true, 1), side(true, 1)]],
    "telophase II": ["nuclei", [side(true, 1), side(true, 1)]], gametes: ["cells", [side(true, 1), side(true, 1), side(false, 1), side(false, 1)]],
  };
  const [layout, groups] = M[stage] || [];
  if (!layout || !DIVISION_STAGES[process].includes(stage)) throw new Error(`no stage "${stage}" in ${process}`);
  const per = layout === "poles" ? groups.flat() : groups[0];
  return { layout, groups, chromosomes: per.length, chromatids: per.reduce((s, g) => s + g.c, 0), nuclei: layout === "nuclei" || layout === "cells" ? groups.length : 1 };
}
const CHR = ["a1", "a2", "a4"];
function chrom(x, y, g, sc, vertical = true) {
  const L = (18 - g.pair * 3) * sc, c = col(CHR[g.pair % 3]), o = g.mat ? 1 : 0.5, w = 4.2 * sc;
  if (g.c === 1) return `<path d="M${f1(x)} ${f1(y - L / 2)} L${f1(x)} ${f1(y + L / 2)}" stroke="${c}" stroke-opacity="${o}" stroke-width="${f1(w)}" stroke-linecap="round"/>`;
  const d = 2.6 * sc;
  return `<path d="M${f1(x - d - L * 0.12)} ${f1(y - L / 2)} Q${f1(x)} ${f1(y)} ${f1(x - d - L * 0.12)} ${f1(y + L / 2)} M${f1(x + d + L * 0.12)} ${f1(y - L / 2)} Q${f1(x)} ${f1(y)} ${f1(x + d + L * 0.12)} ${f1(y + L / 2)}" fill="none" stroke="${c}" stroke-opacity="${o}" stroke-width="${f1(w)}" stroke-linecap="round"/>`;
}
function cluster(gs, cx, cy, r, sc) { const n = gs.length, cols = Math.ceil(Math.sqrt(n)), rowsN = Math.ceil(n / cols), dx = Math.min(16 * sc, (1.4 * r) / cols), dy = Math.min(26 * sc, (1.5 * r) / rowsN); return gs.map((g, i) => chrom(cx + ((i % cols) - (cols - 1) / 2) * dx, cy + (Math.floor(i / cols) - (rowsN - 1) / 2) * dy, g, sc)).join(""); }
function stagePanel(process, st, k, x, y, pw) {
  const m = stageModel(process, st.name, k), cx = x + pw / 2, cy = y + pw * 0.38, r = pw * 0.33, sc = Math.min(1, pw / 180) * (k > 2 ? 0.85 : 1);
  let s = "";
  const cell = (ax, ay, rr) => `<circle cx="${f1(ax)}" cy="${f1(ay)}" r="${f1(rr)}" fill="${col("a5")}" fill-opacity=".05" stroke="${C.ink}" stroke-width="1.8"/>`;
  const nuc = (ax, ay, rr, dash) => `<circle cx="${f1(ax)}" cy="${f1(ay)}" r="${f1(rr)}" fill="none" stroke="${C.soft}" stroke-width="1.4"${dash ? ' stroke-dasharray="4 4"' : ""}/>`;
  const spindle = (ys) => ys.map((yy) => line(cx - r * 0.92, cy, cx, yy, { stroke: C.grid, w: 1.2 }) + line(cx + r * 0.92, cy, cx, yy, { stroke: C.grid, w: 1.2 })).join("");
  if (m.layout === "cells") {
    const n = m.groups.length, rr = n === 2 ? r * 0.62 : r * 0.5, pts = n === 2 ? [[cx - r * 0.62, cy], [cx + r * 0.62, cy]] : [[cx - r * 0.52, cy - r * 0.52], [cx + r * 0.52, cy - r * 0.52], [cx - r * 0.52, cy + r * 0.52], [cx + r * 0.52, cy + r * 0.52]];
    pts.forEach(([a, b], i) => (s += cell(a, b, rr) + cluster(m.groups[i], a, b, rr * 0.7, sc * 0.75)));
  } else if (m.layout === "nuclei") {
    s += `<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(r * 1.25)}" ry="${f1(r * 0.85)}" fill="${col("a5")}" fill-opacity=".05" stroke="${C.ink}" stroke-width="1.8"/>` + line(cx, cy - r * 0.85, cx, cy - r * 0.55, { stroke: C.ink, w: 1.8 }) + line(cx, cy + r * 0.85, cx, cy + r * 0.55, { stroke: C.ink, w: 1.8 });
    m.groups.forEach((g, i) => { const a = cx + (i ? 1 : -1) * r * 0.6; s += nuc(a, cy, r * 0.48) + cluster(g, a, cy, r * 0.42, sc * 0.8); });
  } else {
    s += cell(cx, cy, r);
    if (m.layout === "nucleus" || m.layout === "prophase") s += nuc(cx, cy, r * 0.7, m.layout === "prophase") + cluster(m.groups[0], cx, cy, r * 0.62, sc * 0.9);
    if (m.layout === "plate" || m.layout === "bivalent") {
      const gs = m.layout === "plate" ? m.groups[0] : m.groups[0].filter((g) => g.mat), dy = Math.min(24 * sc, (1.5 * r) / gs.length), ys = gs.map((_, i) => cy + (i - (gs.length - 1) / 2) * dy);
      s += spindle(ys) + line(cx, cy - r * 0.9, cx, cy + r * 0.9, { stroke: C.line, w: 1, dash: "3 4" });
      gs.forEach((g, i) => { if (m.layout === "plate") s += chrom(cx, ys[i], g, sc * 0.75); else { s += chrom(cx - 7 * sc, ys[i], g, sc * 0.75) + chrom(cx + 7 * sc, ys[i], { ...g, mat: false }, sc * 0.75); } });
    }
    if (m.layout === "poles") m.groups.forEach((g, i) => { const dy = Math.min(22 * sc, (1.4 * r) / g.length); g.forEach((q, j) => (s += chrom(cx + (i ? 1 : -1) * r * 0.55, cy + (j - (g.length - 1) / 2) * dy, q, sc * 0.75))); s += line(cx + (i ? 1 : -1) * r * 0.92, cy, cx + (i ? 1 : -1) * r * 0.45, cy, { stroke: C.grid, w: 1.2 }); });
  }
  return { s, m, ty: y + pw * 0.78 };
}
function division(spec, W, narrow) {
  const p = new Pic(W), k = spec.diploid / 2, perRow = narrow ? 2 : Math.min(4, spec.stages.length), pw = (W - 32) / perRow, ph = pw * 0.78 + 62;
  spec.stages.forEach((st, i) => {
    const x = 16 + (i % perRow) * pw, y = 12 + Math.floor(i / perRow) * ph;
    let r; try { r = stagePanel(spec.process, st, k, x, y, pw); } catch { return; }
    p.add(r.s);
    p.t(x + pw / 2, r.ty + 4, st.name, { size: 13.5, weight: 700 });
    p.t(x + pw / 2, r.ty + 23, `${r.m.chromosomes} chromosomes${r.m.nuclei > 1 ? ` per ${r.m.layout === "cells" ? "cell" : "nucleus"}` : ""}`, { size: 12, fill: C.soft });
    p.t(x + pw / 2, r.ty + 40, `${r.m.chromatids} chromatids`, { size: 12, fill: C.soft });
  });
  const H = 12 + Math.ceil(spec.stages.length / perRow) * ph;
  const note = narrow ? [`2n = ${spec.diploid}; one colour per homologous pair,`, "dark maternal, pale paternal"] : [`2n = ${spec.diploid}; one colour per homologous pair, dark maternal, pale paternal`];
  note.forEach((s, i) => p.t(W / 2, H + 2 + i * 16, s, { size: 11.5, fill: C.soft, italic: true }));
  return p.done(H + 2 + note.length * 16);
}
function divisionChecks(spec, lessonText) {
  const out = [], k = spec.diploid / 2, bad = [], drawn = [];
  out.push(check("2n is even and small enough to draw (2–6)", Number.isInteger(k) && k >= 1 && k <= 3, `2n = ${spec.diploid}`));
  for (const st of spec.stages) {
    let want, m; try { want = stageCounts(spec.process, st.name, spec.diploid); m = stageModel(spec.process, st.name, k); } catch (e) { bad.push(e.message); continue; }
    if (m.chromosomes !== want.chromosomes || m.chromatids !== want.chromatids || m.nuclei !== want.nuclei) drawn.push(st.name);
    if ((st.chromosomes != null && st.chromosomes !== want.chromosomes) || (st.chromatids != null && st.chromatids !== want.chromatids)) bad.push(`${st.name}: stated ${st.chromosomes}/${st.chromatids}, should be ${want.chromosomes}/${want.chromatids}`);
  }
  out.push(check(`chromosome and chromatid counts at each stage of ${spec.process} (2n = ${spec.diploid})`, !bad.length, bad.join("; ")));
  out.push(check("the drawn chromosomes match the stage counts", !drawn.length, drawn.join(", ")));
  const order = DIVISION_STAGES[spec.process], idx = spec.stages.map((s) => order.indexOf(s.name));
  out.push(check("stages in the order they happen", idx.every((v, i) => !i || v > idx[i - 1])));
  out.push(termCheck([{ name: spec.process }, ...spec.stages.map((s) => ({ name: s.name.replace(/ (I|II)$/, "").replace(/ \(G[12]\)$/, ""), aka: [s.name] }))].filter((t, i, a) => a.findIndex((q) => q.name === t.name) === i), lessonText, "stage"));
  return [...out, ...layoutChecks(spec, division, [760, 380])];
}

// ======================================================================== bio-pathway
// spec: kind "cycle" | "chain", steps [{name, carbons?, n?, in?: {species: count}, out?: {…}, aka?}] (in/out are
//   taken in or given out on the way to the next step), totals {species: net out − in} as stated, per (text)
const stepText = (s) => `${(s.n || 1) > 1 ? `${s.n} × ` : ""}${s.name}${s.carbons != null ? ` (${s.carbons}C)` : ""}`;
const sideLines = (s) => [...Object.entries(s.in || {}).map(([k, v]) => [`+ ${v > 1 ? `${v} ` : ""}${fx(k)}`, "a1"]), ...Object.entries(s.out || {}).map(([k, v]) => [`→ ${v > 1 ? `${v} ` : ""}${fx(k)}`, "a2"])];
function pathway(spec, W, narrow) {
  const p = new Pic(W), S = spec.steps, n = S.length, cyc = spec.kind === "cycle";
  const bw = (s) => textWidth(stepText(s), 13.5, 700) + 22, bh = 32;
  if (cyc && !narrow) {
    const R = spec.radius || 150, cx = W / 2, cy = 30 + R + 40, pts = S.map((_, i) => { const a = -Math.PI / 2 + (2 * Math.PI * i) / n; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; });
    let maxY = cy + R;
    S.forEach((s, i) => {
      const [x0, y0] = pts[i], [x1, y1] = pts[(i + 1) % n], L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L, cut = (q, u) => Math.min(bw(q) / 2 / Math.abs(u.x || 1e-9), (bh / 2 + 6) / Math.abs(u.y || 1e-9));
      const c0 = cut(s, { x: ux, y: uy }) + 4, c1 = cut(S[(i + 1) % n], { x: ux, y: uy }) + 6;
      p.add(arrow(x0 + ux * c0, y0 + uy * c0, x1 - ux * c1, y1 - uy * c1, { stroke: C.ink, w: 2 }));
      const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, ox = mx - cx, oy = my - cy, ol = Math.hypot(ox, oy) || 1, lines = sideLines(s);
      const lx = mx + (ox / ol) * 22, ly0 = my + (oy / ol) * 22 - ((lines.length - 1) * 17) / 2 + (oy / ol) * 8 * lines.length;
      const anchor = ox / ol > 0.25 ? "start" : ox / ol < -0.25 ? "end" : "middle";
      lines.forEach(([t, c], j) => { p.t(lx, ly0 + j * 17, t, { size: 13, weight: 600, anchor, fill: col(c) }); maxY = Math.max(maxY, ly0 + j * 17 + 10); });
    });
    S.forEach((s, i) => { const [x, y] = pts[i], w = bw(s); p.add(rect(x - w / 2, y - bh / 2, w, bh, { f: "a5", fo: 0.12, s: "a5", sw: 1.6, r: 14 })); p.boxes.push({ s: `[${s.name}]`, x0: x - w / 2, x1: x + w / 2, y0: y - bh / 2, y1: y + bh / 2 }); p.t(x, y, stepText(s), { size: 13.5, weight: 700, free: true }); });
    if (spec.centre) p.t(cx, cy, spec.centre, { size: 14, weight: 700, fill: C.soft });
    return foot(p, spec, Math.max(maxY, cy + R + bh) + 26, W, narrow);
  }
  // a vertical chain (and the narrow form of a cycle, with the loop drawn back up the left)
  const x0 = cyc ? 34 : 16, gap = 30, rowH = (s) => bh + Math.max(gap, sideLines(s).length * 17 + 14);
  let y = 18; const ys = [];
  S.forEach((s, i) => {
    ys.push(y); const w = bw(s);
    p.add(rect(x0, y, w, bh, { f: "a5", fo: 0.12, s: "a5", sw: 1.6, r: 14 })); p.boxes.push({ s: `[${s.name}]`, x0, x1: x0 + w, y0: y, y1: y + bh });
    p.t(x0 + w / 2, y + bh / 2, stepText(s), { size: 13.5, weight: 700, free: true });
    const last = i === n - 1, lines = sideLines(s);
    if (!last || cyc) {
      const ax = x0 + 26, next = y + rowH(s);
      if (!last) p.add(arrow(ax, y + bh + 2, ax, next - 4, { stroke: C.ink, w: 2 }));
      lines.forEach(([t, c], j) => p.t(ax + 18, (last ? y + bh + 16 + j * 17 : y + bh + (next - y - bh) / 2 + (j - (lines.length - 1) / 2) * 17), t, { size: 13, weight: 600, anchor: "start", fill: col(c) }));
      y = next;
    } else y += bh + 12;
  });
  if (cyc) { const yl = ys.at(-1) + bh / 2, yf = ys[0] + bh / 2; p.add(line(x0, yl, 16, yl, { stroke: C.ink, w: 2 }) + line(16, yl, 16, yf, { stroke: C.ink, w: 2 }) + arrow(16, yf, x0 - 2, yf, { stroke: C.ink, w: 2, head: 9 })); y = Math.max(y, ys.at(-1) + bh + 14 + sideLines(S.at(-1)).length * 17); }
  return foot(p, spec, y + 14, W, narrow);
}
function foot(p, spec, y, W, narrow) {
  if (spec.totals) {
    const t = Object.entries(spec.totals).map(([k, v]) => `${v > 0 ? "+" : "−"}${Math.abs(v)} ${fx(k)}`), lines = [];
    let cur = `net${spec.per ? ` ${spec.per}` : ""}:`;
    for (const s of t) { if (textWidth(`${cur} ${s}`, 13, 700) > W - 32) { lines.push(cur); cur = s; } else cur += ` ${s}`; }
    lines.push(cur);
    lines.forEach((s, i) => p.t(16, y + i * 19, s, { size: 13, weight: 700, anchor: "start" }));
    y += lines.length * 19;
  }
  p.t(16, y + 4, narrow ? "+ taken in, → given out" : "+ taken in, → given out at each step", { size: 11.5, anchor: "start", fill: C.soft, italic: true });
  return p.done(y + 18);
}
function pathwayChecks(spec, lessonText) {
  const out = [], cyc = spec.kind === "cycle", { net, problems, carbon } = pathwayTally(spec.steps, cyc);
  if (carbon) out.push(check("carbon atoms conserved at every step", !problems.length, problems.join("; ") || "balanced"));
  else if (spec.steps.some((s) => s.carbons != null)) out.push(check("every step gives its carbon count", false));
  if (spec.totals) {
    const bad = Object.entries(spec.totals).filter(([k, v]) => (net[k] || 0) !== v).map(([k, v]) => `${k}: stated ${v}, tallied ${net[k] || 0}`);
    out.push(check(`stated totals${spec.per ? ` ${spec.per}` : ""} match the steps`, !bad.length, bad.join("; ") || Object.entries(spec.totals).map(([k, v]) => `${k} ${v}`).join(", ")));
  }
  if (cyc && carbon) out.push(check("the cycle regenerates its starting compound", spec.steps.length > 1 && !problems.some((q) => q.includes(`× ${spec.steps[0].name} (`) && q.includes(`→`))));
  out.push(termCheck(spec.steps.filter((s) => s.term !== false).map((s) => ({ name: s.term || s.name, aka: s.aka })), lessonText, "step"));
  return [...out, ...layoutChecks(spec, pathway, [760, 380])];
}

// ======================================================================== bio-foodweb
// spec: organisms [{name, level?: n | [min, max], producer?}], eats [[eater, eaten]], decomposers? [names]
function foodweb(spec, W, narrow) {
  const p = new Pic(W);
  let lv; try { lv = trophicLevels(spec.organisms, spec.eats); } catch { return p.done(40); } // the checks report why
  const top = Math.max(...Object.values(lv).map((v) => v[1])), rowH = narrow ? 78 : 88, size = narrow ? 12.5 : 14;
  const NAMES = ["producers", "primary consumers", "secondary consumers", "tertiary consumers", "quaternary consumers"];
  const pos = {};
  for (let l = 1; l <= top; l++) {
    const row = spec.organisms.filter((o) => lv[o.name][1] === l), y = 34 + (top - l) * rowH + 18;
    p.t(16, y - 30, `${l}: ${NAMES[l - 1] || `level ${l}`}`, { size: 11.5, weight: 600, anchor: "start", fill: C.soft });
    const ws = row.map((o) => textWidth(o.name, size, 600) + 18), total = ws.reduce((a, b) => a + b, 0), g = Math.max(8, (W - 32 - total) / (row.length + 1));
    let x = 16 + g;
    row.forEach((o, i) => { pos[o.name] = [x + ws[i] / 2, y, ws[i]]; x += ws[i] + g; });
  }
  const H = 34 + top * rowH;
  for (const [a, b] of spec.eats) {
    const [xa, ya, wa] = pos[a], [xb, yb, wb] = pos[b], eaters = spec.eats.filter((e) => e[1] === b), eaten = spec.eats.filter((e) => e[0] === a);
    const sx = xb + (eaters.findIndex((e) => e[0] === a) - (eaters.length - 1) / 2) * Math.min(16, wb / (eaters.length + 1)), tx = xa + (eaten.findIndex((e) => e[1] === b) - (eaten.length - 1) / 2) * Math.min(16, wa / (eaten.length + 1));
    p.add(arrow(sx, yb - 14, tx, ya + 16, { stroke: col("a1"), w: 1.6, head: 8 }));
  }
  for (const o of spec.organisms) { const [x, y, w] = pos[o.name], k = lv[o.name][1] === 1 ? "good" : ["a4", "a3", "a2", "a5"][Math.min(3, lv[o.name][1] - 2)]; p.add(rect(x - w / 2, y - 13, w, 26, { f: k, fo: 0.14, s: k, sw: 1.5, r: 13 })); p.t(x, y, o.name, { size, weight: 600 }); }
  p.t(W - 16, H + 4, narrow ? "arrows: energy flows from food to feeder" : "arrows show the direction energy flows: from food to feeder", { size: 11.5, anchor: "end", fill: C.soft, italic: true });
  return p.done(H + 18);
}
function foodwebChecks(spec, lessonText) {
  let lv; try { lv = trophicLevels(spec.organisms, spec.eats); } catch (e) { return [check("who eats whom has no loops and names only listed organisms", false, e.message)]; }
  const out = [], bad = [];
  for (const o of spec.organisms.filter((q) => q.level != null)) { const s = Array.isArray(o.level) ? o.level : [o.level, o.level], c = lv[o.name]; if (s[0] !== c[0] || s[1] !== c[1]) bad.push(`${o.name}: stated ${s.join("–")}, computed ${c[0] === c[1] ? c[0] : c.join("–")}`); }
  out.push(check("trophic levels follow from who eats whom", !bad.length, bad.join("; ") || spec.organisms.map((o) => `${o.name} ${lv[o.name].join("–")}`).join(", ")));
  const prod = spec.organisms.filter((o) => o.producer);
  out.push(check("producers eat nothing and every organism that eats nothing is a producer", spec.organisms.every((o) => !!o.producer === (lv[o.name][1] === 1)), prod.map((o) => o.name).join(", ")));
  out.push(check("every consumer is linked to the web", spec.organisms.every((o) => o.producer || spec.eats.some((e) => e[0] === o.name))));
  out.push(termCheck(spec.organisms.map((o) => ({ name: o.name, aka: o.aka })), lessonText, "organism"));
  return [...out, ...layoutChecks(spec, foodweb, [720, 380])];
}

register({
  "bio-punnett": { draw: punnett, checks: punnettChecks, widths: [720, 380] },
  "bio-pedigree": { draw: pedigree, checks: pedigreeChecks, widths: [700, 380] },
  "bio-sequence": { draw: sequence, checks: sequenceChecks, widths: [760, 380] },
  "bio-division": { draw: division, checks: divisionChecks, widths: [760, 380] },
  "bio-pathway": { draw: pathway, checks: pathwayChecks, widths: [760, 380] },
  "bio-foodweb": { draw: foodweb, checks: foodwebChecks, widths: [720, 380] },
});
export { punnett, pedigree, sequence, division, pathway, foodweb, stageModel, punnettChecks, pedigreeChecks, sequenceChecks, divisionChecks, pathwayChecks, foodwebChecks, gametes };
