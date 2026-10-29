// The study-pack logic lives in kit/notes/pack.js. Supabase only bundles files inside
// supabase/functions when it deploys, so the function gets an exact copy, and the
// single-file dashboard version is rebuilt from it. Run after editing kit/notes/pack.js:
//   npm run sync
import { copyFile } from "node:fs/promises";
await copyFile("kit/notes/pack.js", "supabase/functions/_shared/pack.js");
console.log("Copied kit/notes/pack.js to supabase/functions/_shared/pack.js");
await import("./build-dashboard-function.mjs");
