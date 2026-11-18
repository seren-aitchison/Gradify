// Write a generated doc only when more than its "Generated … on <date>" stamp has changed, so a run with nothing new
// (`npm test` runs scripts/qa-courses.mjs) leaves the working tree clean.
import { readFile, writeFile } from "node:fs/promises";

export const undated = (text) => text.replace(/ on \d{4}-\d{2}-\d{2}\b/g, " on DATE");

/** Writes `text` to `url` unless the file already says the same apart from its date. Returns true if it wrote. */
export async function writeDoc(url, text) {
  const old = await readFile(url, "utf8").catch(() => null);
  if (old !== null && undated(old) === undated(text)) return false;
  await writeFile(url, text);
  return true;
}
