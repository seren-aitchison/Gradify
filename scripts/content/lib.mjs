// Shared paths, config and small helpers for the content engine (docs/CONTENT-ENGINE.md).
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";

export const ROOT = new URL("../../", import.meta.url);
export const CONFIG = JSON.parse(readFileSync(new URL("scripts/content/config.json", ROOT), "utf8"));
export const at = (p) => new URL(p, ROOT);
export const load = (u, d = null) => (existsSync(u) ? JSON.parse(readFileSync(u, "utf8")) : d);
export const save = (u, data, { min = false } = {}) => { mkdirSync(new URL("./", u), { recursive: true }); writeFileSync(u, typeof data === "string" ? data : `${min ? JSON.stringify(data) : JSON.stringify(data, null, 1)}\n`); };
export const fp = (x) => createHash("sha256").update(typeof x === "string" ? x : JSON.stringify(x)).digest("hex").slice(0, 16);
export const slug = (s) => String(s).toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
export const today = () => new Date().toISOString().slice(0, 10);

// where the engine writes: the repository, or GRADIFY_OUT (tests) so a test run never touches real files
export const out = (p) => (process.env.GRADIFY_OUT ? new URL(p, pathToFileURL(`${process.env.GRADIFY_OUT.replace(/\/$/, "")}/`)) : at(p));
// where everything lives
export const briefPath = (topic) => out(`content/research/${topic}.txt`);                 // content/research/<subject>/<topic>.txt
export const draftPath = (subject, fw, topicSlug) => out(`content/drafts/${subject}/${fw}/${topicSlug}.txt`);
export const ledgerPath = (subject) => out(`content/ledger/${subject}.json`);              // one per subject: parallel jobs never collide
export const inboxDir = out("content/inbox/");
export const signalsPath = (subject) => out(`content/signals/${subject}.json`);

/** the subject's ledger: per topic, what happened last and why. Status is generated from this and the files. */
export const loadLedger = (subject) => load(ledgerPath(subject), { subject, topics: {} });
export const saveLedger = (L) => save(ledgerPath(L.subject), L);
