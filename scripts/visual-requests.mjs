#!/usr/bin/env node
// The visual request queue (learners asking for a visual Gradify hasn't got: kit/tools/visualise.js), for the
// visualisation agent. Reads open requests from production through the Supabase Management API, groups them by
// concept, and prints them most-requested first; with --tasks, files each concept as a task for the visualisation
// agent (department/orchestrator.py create-task). Never prints who asked.
//   node scripts/visual-requests.mjs <project-ref> [--tasks]
import { execFileSync } from "node:child_process";
import { client } from "./supabase-admin.mjs";

const [ref] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const c = client(ref);
const rows = await c.sql(`select lower(btrim(concept)) as concept, count(*)::int as n, array_agg(purpose order by created_at desc) filter (where purpose <> '') as why, min(created_at) as first
  from public.visual_requests where status = 'open' group by 1 order by n desc, first limit 50`);
if (!rows.length) { console.log("No open visual requests."); process.exit(0); }
for (const r of rows) console.log(`${String(r.n).padStart(3)} × ${r.concept}${r.why?.length ? `  (${r.why.slice(0, 2).join(" / ")})` : ""}`);
if (process.argv.includes("--tasks")) for (const r of rows) {
  const desc = `Learners asked ${r.n} time(s) for a visual of "${r.concept}". What they want to understand: ${(r.why || []).slice(0, 5).join(" / ") || "not said"}. Follow docs/VISUALS.md: first check kit/api/v1/visuals.json for an existing asset; if none, choose the right kind (a molecule through scripts/visuals/build.py, a computed visual in kit/visuals/procedural.js, or a 3D model), check it against sources, and leave it for subject review.`;
  execFileSync("python3", ["department/orchestrator.py", "create-task", "--role", "visualisation", "--title", `Visual: ${r.concept}`, "--desc", desc, "--pipeline", "visual-request"], { stdio: "inherit" });
}
