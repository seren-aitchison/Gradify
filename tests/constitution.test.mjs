// The Quality Constitution (docs/QUALITY_CONSTITUTION.md): the parts a test can hold in place.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const root = new URL("../", import.meta.url);
const doc = await readFile(new URL("docs/QUALITY_CONSTITUTION.md", root), "utf8");

test("the constitution carries an agent brief with all ten articles", () => {
  const m = doc.match(/<!-- agent-brief:start -->([\s\S]*?)<!-- agent-brief:end -->/);
  assert.ok(m, "agent brief markers are missing");
  const items = m[1].match(/^\d+\. /gm) || [];
  assert.deepEqual(items.map((s) => Number.parseInt(s, 10)), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  // short enough for a small local model's context alongside its role and the task
  assert.ok(m[1].length < 3000, `brief is ${m[1].length} characters`);
});

test("every course shows learners each unit's review state, unless every unit is signed off (article 2)", async () => {
  const slugs = (await readdir(new URL("kit/courses/", root), { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name);
  assert.ok(slugs.length > 30);
  const hidden = [];
  for (const slug of slugs) {
    const cfg = (await import(new URL(`kit/courses/${slug}/course.js`, root))).default;
    const allSigned = cfg.qa && cfg.units.every((u) => cfg.qa[u.id]?.reviewed && cfg.qa[u.id]?.sources && cfg.qa[u.id]?.signoff);
    if (!cfg.reviewLine && !allSigned) hidden.push(slug);
  }
  assert.deepEqual(hidden, [], "these courses publish unreviewed units without saying so");
});

test("agents inherit the brief, can't write QA records and can't close their own file changes (article 4)", { skip: spawnSync("python3", ["--version"]).status !== 0 && "no python3" }, () => {
  const py = `
import sys; sys.path.insert(0, "department")
import agent
b = agent.load_constitution_brief()
assert b.startswith("GRADIFY QUALITY CONSTITUTION"), b[:40]
assert agent.is_protected("kit/courses/law/qa.js")
assert agent.is_protected("kit/courses/law/../maths/qa.js")
assert not agent.is_protected("kit/courses/law/notes/u01.js")
r = agent.execute_tool({"tool": "write_file", "args": {"path": "kit/courses/law/qa.js", "content": "x"}}, ".")
assert "Refused" in r.get("error", ""), r
r = agent.execute_tool({"tool": "read_file", "args": {"path": "../outside"}}, ".")
assert "denied" in r.get("error", ""), r
assert agent.FINISHING_ROLES == {"qa"}
print("ok")
`;
  const r = spawnSync("python3", ["-c", py], { cwd: new URL(".", root).pathname, encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr);
  const src = spawnSync("grep", ["-c", "load_constitution_brief() +", "department/agent.py"], { cwd: new URL(".", root).pathname, encoding: "utf8" });
  assert.equal(src.stdout.trim(), "1", "the system prompt must start with the constitution brief");
});
