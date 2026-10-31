// Backward compatibility of the new assessment library with existing content and saved progress.
// Physics notes were written before question ids, options-with-explanations and new question types.
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { parseNotes } from "../kit/course/notes.js";
import { markQuestion, normalize, renderQuestion } from "../kit/assess/questions.js";
import physics from "../kit/courses/physics/course.js";

// the parser as it was before the library (the last commit), for a like-for-like comparison
const oldSrc = (p) => { try { return execFileSync("git", ["show", `HEAD:${p}`], { encoding: "utf8" }); } catch { return null; } };

test("physics: every lesson parses to the same check questions, in the same order, as before", async () => {
  const src = oldSrc("kit/course/notes.js");
  if (!src) return; // no git history available
  const { mkdtemp, writeFile, mkdir, cp } = await import("node:fs/promises");
  const dir = await mkdtemp(new URL("../.compat-", import.meta.url).pathname);
  try {
    await mkdir(`${dir}/kit/course`, { recursive: true }); await cp(new URL("../kit/core", import.meta.url).pathname, `${dir}/kit/core`, { recursive: true });
    for (const f of ["kit/course/notes.js", "kit/assess/questions.js"]) { const s = oldSrc(f); if (s) { await mkdir(`${dir}/${f.split("/").slice(0, -1).join("/")}`, { recursive: true }); await writeFile(`${dir}/${f}`, s); } }
    const old = await import(`${dir}/kit/course/notes.js`);
    for (const id of physics.written) {
      const text = await physics.notes(id), a = old.parseNotes(text), b = parseNotes(text);
      assert.equal(b.length, a.length, id);
      a.forEach((L, i) => {
        assert.equal(b[i].mcq.length, L.mcq.length, `${id} ${L.title}: same number of questions, so saved keys ${"lesson#index"} still match`);
        L.mcq.forEach((m, j) => { const n = b[i].mcq[j]; assert.equal(n.q, m.q); assert.equal(n.right, m.right); assert.deepEqual(n.wrong, m.wrong); assert.equal(n.d, m.d); });
      });
    }
  } finally { (await import("node:fs/promises")).rm(dir, { recursive: true, force: true }); }
});

test("a question in the old { right, wrong } shape renders and marks", () => {
  const Q = { q: "2 + 2?", right: "4", wrong: ["3", "5", "22"], why: "Addition.", d: 1 };
  const N = normalize(Q);
  assert.equal(N.options.length, 4); assert.ok(N.options[0].correct);
  assert.match(renderQuestion(Q, "p-u01-l01#0"), /2 \+ 2\?/);
  assert.equal(markQuestion(Q, "4").correct, true);
  assert.equal(markQuestion(Q, "5").correct, false);
});

test("physics questions keep their legacy keys (no ids), so existing solved marks still apply", async () => {
  for (const id of physics.written.slice(0, 5)) for (const L of parseNotes(await physics.notes(id))) for (const m of L.mcq) assert.equal(m.id, null);
});
