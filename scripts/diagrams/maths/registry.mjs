// Regenerate the maths course registry (lesson and question versions) after placing D: lines.
// Usage: node scripts/diagrams/maths/registry.mjs
import { updateRegistry } from "../../curriculum-registry.mjs";
const course = (await import("../../../kit/courses/maths/course.js")).default;
const { log } = await updateRegistry("maths", course);
console.log(`maths registry: ${log.length} change(s)${log.length ? `\n  ${log.slice(0, 40).join("\n  ")}` : ""}`);
