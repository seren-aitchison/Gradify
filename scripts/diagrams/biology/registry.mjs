// Update the biology course registry after D: lines are added (lesson versions; scripts/curriculum-registry.mjs).
//   node scripts/diagrams/biology/registry.mjs
import { updateRegistry } from "../../curriculum-registry.mjs";
const course = (await import("../../../kit/courses/biology/course.js")).default;
const { log } = await updateRegistry("biology", course);
console.log(`biology registry: ${log.length} change${log.length === 1 ? "" : "s"}`);
for (const l of log.slice(0, 40)) console.log(`  ${l}`);
