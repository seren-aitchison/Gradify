// Source ingestion: fetch each source in data/knowledge/registry.json, split it into passages, de-duplicate them,
// and record its provenance and licence. The retrieved text stays local (data/knowledge/raw/, gitignored); the
// committed record (data/knowledge/sources/<id>.json) holds where it came from, which version, its licence and what
// that licence lets Gradify do, its fingerprint, and each passage's id and fingerprint, never the text.
//
// Source types:
//   openstax-cnxml   an OpenStax module's CNXML, pinned to a commit of its GitHub repository
//   gradify-notes    a lesson from a Gradify course (kit/courses/<course>/notes/<unit>.js)
// A new type is a parser that returns [{ id, text }].
import { readFileSync } from "node:fs";
import { at, load, save, sha256, fp, norm, today, ROOT } from "./lib.mjs";
import { LICENCES, policyOf, checkSource } from "../../kit/knowledge/schema.js";

const strip = (x) => norm(x.replace(/<[^>]+>/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#8217;|&#x2019;/g, "’")).replace(/\s+([.,;:)])/g, "$1");

export const PARSERS = {
  /** paragraphs, list items, notes and glossary meanings, by their CNXML ids */
  "openstax-cnxml": (raw) => {
    const out = [];
    for (const [, tag, id, body] of raw.matchAll(/<(para|item|meaning)\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/g)) {
      const text = strip(body); if (text.split(" ").length >= 4) out.push({ id, kind: tag, text });
    }
    const title = raw.match(/<title>([^<]*)<\/title>/)?.[1];
    return { title, passages: out };
  },
  /** one lesson of a Gradify course, line by line (each line of the notes format is one block) */
  "gradify-notes": (raw, def) => {
    const lines = raw.split("\n"), start = lines.findIndex((l) => l.trim() === `## ${def.lesson}`);
    if (start < 0) throw new Error(`${def.id}: no lesson "${def.lesson}" in ${def.url}`);
    const out = [];
    for (let i = start + 1; i < lines.length && !lines[i].startsWith("## "); i++) {
      const l = lines[i].trim(); if (!l) continue;
      out.push({ id: `L${i + 1}`, kind: l.match(/^([A-Z!]+[123]?)(?:#[a-z0-9-]+)?:/)?.[1] || "P", text: l.replace(/^[A-Z!]+[123]?(?:#[a-z0-9-]+)?(?:@[\d,]+)?:\s*/, "") });
    }
    return { title: def.lesson, passages: out };
  },
};

async function retrieve(def) {
  if (def.type === "gradify-notes") return (await import(new URL(def.url, ROOT))).default;
  const res = await fetch(def.url);
  if (!res.ok) throw new Error(`${def.url}: HTTP ${res.status}`);
  return res.text();
}

/** fetch, parse, de-duplicate and record one source; `seen` carries passage fingerprints across sources */
export async function ingest(def, seen = new Map()) {
  const lic = LICENCES[def.licence]; if (!lic) throw new Error(`${def.id}: unknown licence ${def.licence}`);
  const raw = await retrieve(def), parsed = PARSERS[def.type](raw, def);
  const passages = [], dropped = [];
  for (const p of parsed.passages) {
    const h = fp(norm(p.text).toLowerCase());
    if (seen.has(h)) { dropped.push({ id: p.id, duplicateOf: seen.get(h) }); continue; }
    seen.set(h, `${def.id}#${p.id}`); passages.push({ ...p, hash: h });
  }
  save(at(`raw/${def.id}.${def.type === "openstax-cnxml" ? "cnxml" : "txt"}`), raw);
  save(at(`raw/${def.id}.passages.json`), passages);
  const { type, ...meta } = def;
  const rec = {
    ...meta, type, retrievedOn: today(), version: def.version || (def.type === "gradify-notes" ? `as of ${today()}` : null), sha256: sha256(raw), bytes: Buffer.byteLength(raw),
    licenceName: lic.name, policy: policyOf(def.licence), ...(lic.why ? { policyReason: lic.why } : {}), attribution: lic.attribution,
    parsedTitle: parsed.title || null,
    passages: passages.map(({ id, kind, hash, text }) => ({ id, kind, hash, words: text.split(" ").length })),
    ...(dropped.length ? { duplicates: dropped } : {}),
  };
  const problems = checkSource(rec);
  if (problems.length) throw new Error(problems.join("; "));
  save(at(`sources/${def.id}.json`), rec);
  return rec;
}

export async function ingestAll() {
  const reg = load(at("registry.json")), seen = new Map(), out = [];
  for (const def of reg.sources) out.push(await ingest(def, seen));
  return out;
}
