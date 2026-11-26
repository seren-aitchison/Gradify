// Source policy: the owner's interim decisions about how the content engine may use a source, kept apart from the
// source allowlist (kit/curriculum/sources.js) so those rows aren't changed by a policy that may be lifted.
//
//   SUSPENDED            sources the automated pipeline must not retrieve, offer to researchers or count as evidence
//                        for new research. Existing briefs and their provenance are left exactly as they are.
//   REQUIREMENT_SOURCES  allowlist rows that establish what a curriculum requires, never that a subject fact is true:
//                        they never count as an independent knowledge publisher (docs/curriculum/SOURCE-REGISTRY.md,
//                        "Two kinds of evidence"). This moves into the registry when its redesign is approved.
import { SOURCES } from "../../kit/curriculum/sources.js";

export const SUSPENDED = [
  {
    owner: "OpenStax, Rice University",
    since: "2026-11-26",
    decidedBy: "owner",
    activity: "automated retrieval, AI processing and use as evidence for new research",
    // quoted from the book pages' Citation/Attribution section (Biology 2e, 10.1 and 11.1, read 2026-11-26)
    notice: "This book may not be used in the training of large language models or otherwise be ingested into large language models or generative AI offerings without OpenStax's prior written permission.",
    reason: "A precautionary operational decision while the terms are clarified, not a conclusion that any past use infringed them.",
    clarify: [
      "Whether reading a page to check a fact, with an AI tool, counts as being \"ingested into large language models\".",
      "Whether a research brief that restates facts in Gradify's own words, written with AI assistance, is an \"AI offering\" use of the book.",
      "Whether OpenStax's reuse request form can grant permission for Gradify's research workflow, and on what terms.",
    ],
  },
];
export const REQUIREMENT_SOURCES = new Set(["aqa-specifications"]);

const rowById = new Map(SOURCES.map((r) => [r.id, r]));
/** the suspension that applies to an allowlist row, or null */
export const suspensionOf = (row) => (row ? SUSPENDED.find((s) => s.owner === row.owner) || null : null);
/** "requirement" (establishes what's required) or "knowledge" (can substantiate a subject fact) */
export const evidenceKindOf = (row) => (row && REQUIREMENT_SOURCES.has(row.id) ? "requirement" : "knowledge");
export const sourceRow = (id) => rowById.get(id) || null;
