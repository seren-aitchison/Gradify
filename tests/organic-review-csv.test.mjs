// The review pack (scripts/organic-review.mjs) is opened in spreadsheets: text that a spreadsheet would run as a
// formula (= + - @, also after leading whitespace or control characters, or a leading tab/CR) is written with a
// leading apostrophe, so it shows as text. Plain numbers, negative ones included, and ordinary text are unchanged.
import { test } from "node:test";
import assert from "node:assert/strict";
import { csv, cell, neutralise, mergeReviews, referenceRows } from "../scripts/organic-review.mjs";
import { REFERENCE, expectKey } from "./data/organic-reference.mjs";

test("formula-like cells are neutralised, whatever precedes the formula character", () => {
  for (const v of ["=1+1", "+SUM(A1:A9)", "-2+3", "@SUM(A1)", '=HYPERLINK("http://x","y")', "=cmd|' /C calc'!A0", " =1", "   +1", "\t=1", "\r=1", "\n=1", "\u0000=1", "\u001f@x", "\tplain", "\rplain", "-", "- see note", "＝1+1", "＋1"]) {
    assert.ok(neutralise(v).startsWith("'"), JSON.stringify(v));
    assert.equal(neutralise(v).slice(1), v, "only an apostrophe is added");
  }
});

test("plain numbers, negative ones included, and ordinary text are left as they are", () => {
  for (const v of ["-3", "-0.5", "+1.5", "-2.5e3", "12", "0", ".5", "1e-3", "ethanol", "C2H5OH", "H₃O⁺", "Br⁻", "Markovnikov: H adds to the carbon with more H", "but-2-ene (CC=CC)", "", "2-methylpropan-2-ol", "e.g. =", "a@b"]) assert.equal(neutralise(v), v, JSON.stringify(v));
  assert.equal(cell(-7), "-7"); assert.equal(cell(3.25), "3.25"); assert.equal(cell(null), ""); assert.equal(cell("-3"), "-3");
});

test("a neutralised cell is still valid CSV, and the row reads back with the apostrophe as text", () => {
  assert.equal(cell("=1,2"), `"'=1,2"`); assert.equal(cell('=A1&"x"'), `"'=A1&""x"""`); assert.equal(cell("\r=1"), `"'\r=1"`);
  const text = csv([["id", "verdict (agree / disagree / unsure)", "correction", "comment", "reviewer", "date"], [REFERENCE[0].id, "agree", "=1+1", "-3", "@me", "2026-11-23"]]);
  assert.match(text, /'=1\+1,-3,'@me/);
  const back = mergeReviews({}, text, new Set([REFERENCE[0].id]));
  assert.deepEqual(back.bad, []);
  assert.deepEqual([back.reviews[REFERENCE[0].id].correction, back.reviews[REFERENCE[0].id].note, back.reviews[REFERENCE[0].id].reviewer], ["'=1+1", "-3", "'@me"]);
});

test("the real export neutralises a malicious recorded review but keeps the expectation key importable", () => {
  const r = { ...REFERENCE[0], review: { verdict: "disagree", reviewer: "=HYPERLINK(\"http://x\")", note: "x" }, stale: false };
  const rows = referenceRows([r]), text = csv(rows), at = (n) => rows[0].findIndex((h) => h.startsWith(n));
  assert.match(rows[1][at("recorded review")], /^disagree by =HYPERLINK/, "the recorded review starts with the verdict, so it's safe already");
  const evil = csv([["comment"], ["=HYPERLINK(\"http://x\")"], [" -1+2"], ["-1"]]);
  assert.equal(evil, `comment\n"'=HYPERLINK(""http://x"")"\n' -1+2\n-1\n`);
  // every cell of the full export: none starts (after whitespace/control characters) with a formula character unless
  // it's a plain number, and the expectation keys are written unchanged, so returned sheets still match
  const all = referenceRows();
  for (const row of all) for (const v of row) { const c = cell(v); if (/^[\s\0-\x1f]*[=+\-@]/.test(c.replace(/^"/, ""))) assert.match(c, /^-?\d/, c); }
  for (const [k, row] of all.slice(1).entries()) assert.equal(cell(row[at("expectation key")]).replace(/^"|"$/g, "").replace(/""/g, '"'), expectKey(REFERENCE[k].expect));
  assert.ok(text.length > 0);
});

test("a field with a carriage return keeps its boundaries through export and import (M57)", () => {
  const id = REFERENCE[0].id;
  const text = csv([["id", "verdict (agree / disagree / unsure)", "correction", "comment", "reviewer", "date"], [id, "disagree", "", "first\rsecond", "Dr R", ""]]);
  const back = mergeReviews({}, text, new Set([id]));
  assert.deepEqual(back.bad, []); assert.equal(back.reviews[id].note, "first\rsecond"); assert.equal(back.reviews[id].date, "");
});
