// Combine the study-pack function and its shared logic into one file that can be pasted
// into the Supabase dashboard's function editor: supabase/dashboard/study-pack.ts
import { readFile, writeFile, mkdir } from "node:fs/promises";

const pack = (await readFile("supabase/functions/_shared/pack.js", "utf8")).replace(/^export /gm, "");
const lines = (await readFile("supabase/functions/study-pack/index.ts", "utf8"))
  .replace(/^import \{[^}]*\} from "\.\.\/_shared\/pack\.js";\n/m, "").split("\n");
const imports = lines.filter((l) => l.startsWith("import "));
const rest = lines.filter((l) => !l.startsWith("import "));
const out = `// Gradify study-pack function: SINGLE-FILE VERSION for pasting into the Supabase dashboard.
// Generated from supabase/functions/study-pack/index.ts + kit/notes/pack.js.
// Don't edit this file by hand; edit those two and run: npm run sync
${imports.join("\n")}

// ---------- Shared pack logic ----------
${pack}
// ---------- Function ----------
${rest.join("\n")}`;
await mkdir("supabase/dashboard", { recursive: true });
await writeFile("supabase/dashboard/study-pack.ts", out);
console.log("Wrote supabase/dashboard/study-pack.ts");
