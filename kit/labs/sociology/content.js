// Content analysis tool: paste any text (or use an example), define coding categories by their keywords, and count how
// often each appears, per 1,000 words. The examples are short invented headlines written for practice.
import { shell, panel, challenges, button } from "../lab.js";
import { caveat, table, dataLabel } from "../social/ui.js";

export const EXAMPLE = `Benefit cheats cost taxpayers millions, says minister
Families struggle as food bank use climbs
Scroungers exposed: the street where nobody works
Charity warns child poverty rising in northern towns
Welfare reforms push disabled people into hardship
Council estate youths blamed for crime wave
Working parents skip meals to feed children
Fraud crackdown targets benefit claimants`;
export const DEFAULT_CATS = "Deviance framing: cheat, cheats, scroungers, fraud, blamed, exposed, crime\nHardship framing: struggle, poverty, hardship, food bank, skip meals, warns\nGroup named: families, parents, children, disabled, youths, claimants";
// count keyword matches per category (case-insensitive, whole words or phrases); returns rows and word count
export function analyse(text, spec) {
  const words = (text.toLowerCase().match(/[a-z']+/g) || []).length, low = ` ${text.toLowerCase().replace(/[^a-z' ]+/g, " ")} `;
  return { words, rows: spec.split("\n").map((l) => l.split(":")).filter((p) => p.length >= 2).map(([name, kws]) => { const list = kws.split(",").map((k) => k.trim().toLowerCase()).filter(Boolean); const n = list.reduce((s, k) => s + (low.split(` ${k} `).length - 1), 0); return { name: name.trim(), n, per1000: words ? (n / words) * 1000 : 0, list }; }) };
}
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="sx-panel"><label for="sx-ca-t"><b>Text to analyse</b></label><textarea id="sx-ca-t" style="min-height:140px"></textarea><label for="sx-ca-c"><b>Coding categories</b> (one per line: name: keyword, keyword…)</label><textarea id="sx-ca-c" style="min-height:90px"></textarea><div class="sx-btns sx-list"></div></div><div class="lab-ctrl"></div><div class="lab-out"></div>`);
  const [t, c] = [$("#sx-ca-t"), $("#sx-ca-c")], out = panel($(".lab-out")), ctrl = $(".lab-ctrl"), st = {};
  const lab = dataLabel(ctrl, { real: false, how: "The example headlines are invented for practice; paste in real texts (news stories, policy documents, posts) to analyse them." });
  caveat(ctrl, "Counting words is reliable and transparent, but it misses context, irony and meaning: “not a scrounger” counts as “scrounger”. Qualitative content and discourse analysis read for those.");
  const ch = challenges(ctrl, ctx, [{ id: "run", text: "Analyse the example headlines", test: (x) => x.run }, { id: "cat", text: "Add a category of your own", test: (x) => x.cats > 3 }, { id: "own", text: "Analyse a text of your own", test: (x) => x.own }]);
  button($(".sx-btns"), "Use the example", () => { t.value = EXAMPLE; c.value = DEFAULT_CATS; run(); });
  t.addEventListener("input", () => { st.own = t.value.trim() && t.value !== EXAMPLE; run(); }); c.addEventListener("input", run);
  function run() {
    const A = analyse(t.value, c.value); st.run = A.words > 0; st.cats = A.rows.length; ch.check(st);
    lab.className = `sx-data ${st.own ? "real" : "sim"}`; lab.innerHTML = st.own ? "<b>Your text</b>, analysed in your browser; nothing is uploaded." : "<b>Invented example</b> headlines written for practice.";
    out(A.words ? `${table(["Category", "Matches", "Per 1,000 words", "Keywords"], A.rows.map((r) => [r.name, r.n, r.per1000.toFixed(1), r.list.join(", ")]))}<p>${A.words} words analysed. <b>Next steps a researcher would take:</b> define each category in a coding manual, check inter-coder reliability (two people coding the same sample), and sample texts systematically (e.g. every story on welfare in two papers over a year).</p>` : "<p>Paste a text or use the example.</p>");
  }
  t.value = EXAMPLE; c.value = DEFAULT_CATS; run();
}
