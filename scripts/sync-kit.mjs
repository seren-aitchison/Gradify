// The study-pack logic lives in kit/notes/pack.js and the course tutor's in kit/assess/tutor.js. Supabase only bundles files inside
// supabase/functions when it deploys, so the function gets an exact copy, and the
// single-file dashboard version is rebuilt from it. Run after editing kit/notes/pack.js:
//   npm run sync
import { copyFile } from "node:fs/promises";
await copyFile("kit/notes/pack.js", "supabase/functions/_shared/pack.js");
console.log("Copied kit/notes/pack.js to supabase/functions/_shared/pack.js");
await copyFile("kit/assess/tutor.js", "supabase/functions/_shared/tutor.js");
console.log("Copied kit/assess/tutor.js to supabase/functions/_shared/tutor.js");
await copyFile("kit/assess/canon.js", "supabase/functions/_shared/canon.js");
console.log("Copied kit/assess/canon.js to supabase/functions/_shared/canon.js");
await copyFile("kit/intel/nudges.js", "supabase/functions/_shared/nudges.js");
console.log("Copied kit/intel/nudges.js to supabase/functions/_shared/nudges.js");
await import("./build-dashboard-function.mjs");
