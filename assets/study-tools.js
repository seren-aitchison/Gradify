// The free study calculators on getgradify.com/tools/: pure functions (tested in tests/seo.test.mjs), and the code that
// runs each tool on its page. Everything happens in the browser; nothing typed into a tool is sent anywhere.

// ---------- UK degree classification ----------
export const CLASSES = [[70, "First-class honours (1st)"], [60, "Upper second (2:1)"], [50, "Lower second (2:2)"], [40, "Third-class honours (3rd)"], [0, "Below honours (fail)"]];
/** credit-weighted mean of [{ mark, credits }] (rows with no mark or credits are skipped), or null */
export function creditMean(rows) {
  let sum = 0, cr = 0;
  for (const r of rows) { const m = Number(r.mark), c = Number(r.credits); if (Number.isFinite(m) && r.mark !== "" && c > 0) { sum += m * c; cr += c; } }
  return cr ? sum / cr : null;
}
/** the classification for a final average, and whether it's within `margin` marks under the next boundary */
export function classify(avg, margin = 2) {
  const i = CLASSES.findIndex(([b]) => avg >= b);
  const above = i > 0 ? CLASSES[i - 1][0] : null;
  return { label: CLASSES[i][1], boundary: CLASSES[i][0], borderline: above !== null && above - avg <= margin && above - avg > 0, next: above };
}
/** final degree average from year 2 and year 3 means and the year 3 weight (0 to 100) */
export function degreeAverage(y2, y3, w3 = 60) {
  if (y3 === null) return null;
  if (y2 === null || w3 >= 100) return y3;
  return (y2 * (100 - w3) + y3 * w3) / 100;
}

// ---------- what you need in the final ----------
/** the final exam mark needed to reach `target`, given your current mark and the final's weight (all %) */
export function neededOnFinal(current, weight, target) {
  const w = weight / 100;
  if (!(w > 0 && w <= 1)) return null;
  return (target - current * (1 - w)) / w;
}

// ---------- weighted grade ----------
/** [{ score, weight }] → { avg (over the weight entered), done (total weight entered), contribution (points banked) } */
export function weighted(rows) {
  let pts = 0, w = 0;
  for (const r of rows) { const s = Number(r.score), x = Number(r.weight); if (r.score !== "" && Number.isFinite(s) && x > 0) { pts += s * x; w += x; } }
  return w ? { avg: pts / w, done: w, contribution: pts / 100 } : null;
}

// ---------- GPA (US 4.0 scale) ----------
export const GPA_POINTS = { "A+": 4, A: 4, "A-": 3.7, "B+": 3.3, B: 3, "B-": 2.7, "C+": 2.3, C: 2, "C-": 1.7, "D+": 1.3, D: 1, "D-": 0.7, F: 0 };
export function gpa(rows) {
  let pts = 0, cr = 0;
  for (const r of rows) { const p = GPA_POINTS[r.grade], c = Number(r.credits); if (p !== undefined && c > 0) { pts += p * c; cr += c; } }
  return cr ? pts / cr : null;
}

// ---------- exam countdown ----------
const DAY = 864e5;
const midnight = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
/** whole days from `now` to the exam day, study days left (excluding `restDays` per week), and hours available */
export function countdown(exam, now = new Date(), hoursPerDay = 3, restDays = 1) {
  const days = Math.round((midnight(exam) - midnight(now)) / DAY);
  if (!(days >= 0)) return { days, studyDays: 0, hours: 0, weeks: 0 };
  const studyDays = Math.max(0, days - Math.floor(days / 7) * restDays);
  return { days, studyDays, hours: Math.round(studyDays * hoursPerDay), weeks: Math.floor(days / 7) };
}

// ---------- spaced repetition schedule ----------
export const INTERVALS = [1, 3, 7, 14, 30, 60];
/** review dates after first learning on `start`, by expanding intervals, up to and including `exam` (Date objects) */
export function reviewDates(start, exam = null, intervals = INTERVALS) {
  const s = midnight(start), out = [];
  for (const d of intervals) { const t = new Date(s.getTime() + d * DAY); if (exam && t > midnight(exam)) break; out.push(t); }
  if (exam) { const e = new Date(midnight(exam).getTime() - DAY); if (e > s && !out.some((d) => +d === +e)) out.push(e); }
  return out.sort((a, b) => a - b);
}
const ymd = (d) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
/** an iCalendar file with one all-day event per review */
export function ics(topic, dates, stamp = new Date()) {
  const clean = String(topic || "Revision").replace(/[\r\n,;\\]/g, " ").slice(0, 80);
  const ev = dates.map((d, i) => ["BEGIN:VEVENT", `UID:gradify-${ymd(d)}-${i}@getgradify.com`, `DTSTAMP:${stamp.toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "")}`, `DTSTART;VALUE=DATE:${ymd(d)}`, `SUMMARY:Review: ${clean} (${i + 1} of ${dates.length})`, "DESCRIPTION:Test yourself from memory first\\, then check. Made with getgradify.com", "END:VEVENT"].join("\r\n"));
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Gradify//Spaced repetition//EN", "CALSCALE:GREGORIAN", ...ev, "END:VCALENDAR", ""].join("\r\n");
}

// ---------- on the page ----------
const fmt = (n, dp = 1) => (Math.round(n * 10 ** dp) / 10 ** dp).toLocaleString("en-GB");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const longDay = (d) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
function download(name, text, type) {
  const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
const KEY = (id) => `gradify.tool.${id}`;
const save = (id, v) => { try { localStorage.setItem(KEY(id), JSON.stringify(v)); } catch { /* private mode */ } };
const load = (id) => { try { return JSON.parse(localStorage.getItem(KEY(id))); } catch { return null; } };

/** repeating rows (module mark + credits, assessment + weight, grade + credits) */
function rowsTool(root, id, makeRow, read, compute) {
  const list = root.querySelector(".rows"), add = () => { list.insertAdjacentHTML("beforeend", makeRow()); };
  const saved = load(id);
  if (saved?.length) saved.forEach((v) => { add(); const r = list.lastElementChild; r.querySelectorAll("[name]").forEach((el) => { if (v[el.name] !== undefined) el.value = v[el.name]; }); });
  else for (let i = 0; i < 4; i++) add();
  const run = () => { const rows = [...list.children].map(read); save(id, rows); compute(rows); };
  root.addEventListener("input", run);
  root.addEventListener("click", (e) => {
    if (e.target.closest("[data-add]")) { add(); run(); }
    const del = e.target.closest("[data-del]"); if (del) { del.closest(".row").remove(); run(); }
  });
  run();
}
const val = (r) => Object.fromEntries([...r.querySelectorAll("[name]")].map((el) => [el.name, el.value]));
const del = '<button type="button" class="icon" data-del aria-label="Remove this row">✕</button>';

const TOOLS = {
  degree(root) {
    const out = root.querySelector(".result"), w = root.querySelector("[name=w3]");
    const row = () => `<div class="row"><div><label>Module mark %</label><input name="mark" type="number" min="0" max="100" step="0.1" inputmode="decimal"></div><div><label>Credits</label><input name="credits" type="number" min="0" step="5" value="20" inputmode="numeric"></div><div><label>Year</label><select name="year"><option value="2">Year 2</option><option value="3">Final year</option></select></div>${del}</div>`;
    rowsTool(root, "degree", row, val, (rows) => {
      const y2 = creditMean(rows.filter((r) => r.year === "2")), y3 = creditMean(rows.filter((r) => r.year === "3"));
      const avg = degreeAverage(y2, y3, Number(w.value));
      if (avg === null) { out.innerHTML = "Add at least one final-year module mark to see your classification."; return; }
      const c = classify(avg);
      out.innerHTML = `<span class="big">${fmt(avg)}%</span>${esc(c.label)}<br><small>Year 2 average: ${y2 === null ? "none entered" : `${fmt(y2)}%`} · Final year average: ${fmt(y3)}%</small>${c.borderline ? `<br><b>Borderline:</b> you're within ${fmt(c.next - avg)} marks of the ${c.next}% boundary. Many universities review borderline cases (often 1 to 2 marks), for example by the share of your credits above the boundary. Check your own regulations.` : ""}`;
    });
    w.addEventListener("change", () => root.dispatchEvent(new Event("input")));
  },
  needed(root) {
    const out = root.querySelector(".result"), f = (n) => Number(root.querySelector(`[name=${n}]`).value);
    const run = () => {
      const need = neededOnFinal(f("current"), f("weight"), f("target"));
      if (need === null || !Number.isFinite(need)) { out.textContent = "Enter the final's weight (more than 0%)."; return; }
      out.innerHTML = need <= 0 ? `<span class="big">0%</span>You've already reached ${f("target")}%, even with a zero on the final.` : need > 100 ? `<span class="big">${fmt(need)}%</span>That's more than 100%, so ${f("target")}% isn't reachable through the final alone. The highest overall you can reach is ${fmt(f("current") * (1 - f("weight") / 100) + f("weight"))}%.` : `<span class="big">${fmt(need)}%</span>is what you need on the final to finish on ${f("target")}%.`;
      save("needed", { current: f("current"), weight: f("weight"), target: f("target") });
    };
    const s = load("needed"); if (s) for (const k in s) root.querySelector(`[name=${k}]`).value = s[k];
    root.addEventListener("input", run); run();
  },
  weighted(root) {
    const out = root.querySelector(".result");
    const row = () => `<div class="row two"><div><label>Score %</label><input name="score" type="number" min="0" max="100" step="0.1" inputmode="decimal"></div><div><label>Weight %</label><input name="weight" type="number" min="0" max="100" step="1" inputmode="numeric"></div>${del}</div>`;
    rowsTool(root, "weighted", row, val, (rows) => {
      const r = weighted(rows);
      out.innerHTML = r ? `<span class="big">${fmt(r.avg)}%</span>average across the ${fmt(r.done, 0)}% of the module you've entered.<br><small>Banked so far: ${fmt(r.contribution)} of the 100 marks available.${r.done < 100 ? ` ${fmt(100 - r.done, 0)}% of the module is still to come.` : ""}</small>` : "Enter a score and its weight.";
    });
  },
  gpa(root) {
    const out = root.querySelector(".result");
    const opts = Object.keys(GPA_POINTS).map((g) => `<option>${g}</option>`).join("");
    const row = () => `<div class="row two"><div><label>Grade</label><select name="grade"><option value="">Grade</option>${opts}</select></div><div><label>Credits</label><input name="credits" type="number" min="0" step="0.5" value="3" inputmode="decimal"></div>${del}</div>`;
    rowsTool(root, "gpa", row, val, (rows) => { const g = gpa(rows); out.innerHTML = g === null ? "Choose a grade for at least one course." : `<span class="big">${g.toFixed(2)}</span>GPA on a 4.0 scale`; });
  },
  countdown(root) {
    const out = root.querySelector(".result"), q = (n) => root.querySelector(`[name=${n}]`), embed = root.querySelector("[data-embed]");
    const s = load("countdown"); if (s) for (const k in s) if (q(k)) q(k).value = s[k];
    if (!q("exam").value) q("exam").value = new Date(Date.now() + 42 * DAY).toISOString().slice(0, 10);
    const run = () => {
      const c = countdown(new Date(`${q("exam").value}T00:00`), new Date(), Number(q("hours").value), Number(q("rest").value));
      const name = q("label").value || "My exam";
      out.innerHTML = c.days < 0 ? "That date has passed." : `<span class="big">${c.days} days</span>until ${esc(name)}. That's ${c.studyDays} study days and about <b>${c.hours} hours</b> of revision at ${q("hours").value} hours a day. Divide them between your topics, and keep the last week for past papers.`;
      embed.value = `<iframe src="https://getgradify.com/tools/exam-countdown/embed.html?date=${q("exam").value}&label=${encodeURIComponent(name)}" title="Exam countdown" width="320" height="170" style="border:0;border-radius:14px" loading="lazy"></iframe><p style="font:12px sans-serif">Exam countdown by <a href="https://getgradify.com/tools/exam-countdown/">Gradify</a></p>`;
      save("countdown", { exam: q("exam").value, label: q("label").value, hours: q("hours").value, rest: q("rest").value });
      return { c, name };
    };
    root.addEventListener("input", run); run();
    root.querySelector("[data-copy]").addEventListener("click", async (e) => { try { await navigator.clipboard.writeText(embed.value); e.target.textContent = "Copied"; } catch { embed.select(); } });
    root.querySelector("[data-card]").addEventListener("click", () => { const { c, name } = run(); storyCard(c.days, name); });
  },
  spaced(root) {
    const out = root.querySelector(".result"), q = (n) => root.querySelector(`[name=${n}]`);
    if (!q("start").value) q("start").value = new Date().toISOString().slice(0, 10);
    let dates = [];
    const run = () => {
      const start = new Date(`${q("start").value}T00:00`), exam = q("exam").value ? new Date(`${q("exam").value}T00:00`) : null;
      if (isNaN(start)) { out.textContent = "Choose the day you first learn the topic."; return; }
      dates = reviewDates(start, exam);
      out.innerHTML = `<b>Review ${esc(q("topic").value || "this topic")} on:</b><ol>${dates.map((d) => `<li>${longDay(d)}</li>`).join("")}</ol>`;
    };
    root.addEventListener("input", run); run();
    root.querySelector("[data-ics]").addEventListener("click", () => download("gradify-reviews.ics", ics(q("topic").value, dates), "text/calendar"));
  },
};

/** a 1080×1920 story image of the countdown, with a small getgradify.com credit, for Instagram, TikTok or Snapchat */
function storyCard(days, name) {
  const c = document.createElement("canvas"); c.width = 1080; c.height = 1920;
  const g = c.getContext("2d"), grad = g.createLinearGradient(0, 0, 1080, 1920);
  grad.addColorStop(0, "#4641ff"); grad.addColorStop(.4, "#f055dd"); grad.addColorStop(.75, "#ff5600"); grad.addColorStop(1, "#ffc002");
  g.fillStyle = "#0b0b0b"; g.fillRect(0, 0, 1080, 1920);
  g.fillStyle = grad; g.globalAlpha = .9; g.beginPath(); g.arc(540, 820, 400, 0, Math.PI * 2); g.fill(); g.globalAlpha = 1;
  g.fillStyle = "#fff"; g.textAlign = "center";
  g.font = "700 300px Geist, system-ui, sans-serif"; g.fillText(String(Math.max(0, days)), 540, 900);
  g.font = "600 64px Geist, system-ui, sans-serif"; g.fillText(days === 1 ? "day to go" : "days to go", 540, 1360);
  g.font = "500 56px Geist, system-ui, sans-serif"; g.fillText(String(name).slice(0, 30), 540, 1460);
  g.font = "500 36px Geist, system-ui, sans-serif"; g.globalAlpha = .7; g.fillText("getgradify.com", 540, 1820);
  c.toBlob((b) => { const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "exam-countdown.png"; a.click(); });
}

export function mount(doc = document) {
  for (const el of doc.querySelectorAll("[data-tool]")) TOOLS[el.dataset.tool]?.(el);
}
