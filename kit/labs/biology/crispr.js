// CRISPR–Cas9 gene editing (educational): find NGG PAM sites for Streptococcus pyogenes Cas9, choose a
// 20-nucleotide guide next to one, see where Cas9 cuts (3 bp upstream of the PAM), then repair the break by
// non-homologous end joining (small random insertions or deletions, often a frameshift knockout) or by
// homology-directed repair with a template (a precise edit). Simplified: forward strand only, one cut, no
// off-target search, and repair outcomes drawn from a simple distribution.
import { shell, panel, challenges, button, esc, C } from "../lab.js";
import { translate, transcribeCoding, NAMES } from "./code.js";

const GENE = "ATGACCGAGCTGAAGTTCCGCAGCGGTGAAGCTTGGATCAGCGTGCTGGTGTACGAGATCCTGTCCCAGGCATGGTAA";
export const pams = (s) => { const out = []; for (let i = 21; i + 3 <= s.length; i++) if (s[i + 1] === "G" && s[i + 2] === "G") out.push(i); return out; }; // i = PAM start; guide = s[i−20, i)
const gcOf = (s) => [...s].filter((b) => b === "G" || b === "C").length / s.length;

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-info seqbox"></div><div class="lab-row tools"></div><div class="lab-cols"><div class="lab-out"></div><div class="lab-ctrl"></div></div>`);
  const out = panel($(".lab-out")), ctrl = $(".lab-ctrl");
  let seq = GENE, pick = null, edited = null, note = "";
  const st = { pam: false, gc: false, ko: false, hdr: false };
  const ch = challenges(ctrl, ctx, [
    { id: "pam", text: "Pick a PAM site (NGG) for your guide", test: (x) => x.pam },
    { id: "gc", text: "Choose a guide with 40–80% GC content", test: (x) => x.gc },
    { id: "ko", text: "Knock the gene out: NHEJ repair that causes a frameshift", test: (x) => x.ko },
    { id: "hdr", text: "Make a precise edit with homology-directed repair", test: (x) => x.hdr },
  ]);
  const P = () => pams(seq);
  function paint() {
    const ps = P(), guideAt = pick != null ? [pick - 20, pick] : null, cut = pick != null ? pick - 3 : null;
    const bases = [...seq].map((b, i) => {
      const isPam = ps.some((p) => i >= p && i < p + 3), inPick = pick != null && i >= pick && i < pick + 3, inGuide = guideAt && i >= guideAt[0] && i < guideAt[1];
      const bg = inPick ? `${C.red}66` : inGuide ? `${C.green}55` : isPam ? `${C.gold}33` : "transparent";
      return `${i === cut ? `<b style="color:${C.red}">|</b>` : ""}<i data-i="${i}" style="background:${bg};${isPam ? "cursor:pointer;" : ""}">${b}</i>`;
    }).join("");
    $(".seqbox").innerHTML = `<p><b>Target gene (coding strand, 5′→3′).</b> Gold: NGG PAM sites. Tap one to place a guide.</p><div class="lab-seq">${bases}</div>`;
    $.all(".seqbox i[data-i]").forEach((x) => x.addEventListener("click", () => {
      const i = Number(x.dataset.i), p = ps.find((q) => i >= q && i < q + 3); if (p == null) return;
      pick = p; edited = null; note = ""; st.pam = true; if (gcOf(seq.slice(p - 20, p)) >= 0.4 && gcOf(seq.slice(p - 20, p)) <= 0.8) st.gc = true; ch.check(st); paint();
    }));
    const prot0 = translate(transcribeCoding(GENE)).protein;
    let html = `<p>Original protein: <span class="lab-seq">${prot0.split("").map((a) => NAMES[a]).join("-")}</span></p>`;
    if (pick != null) {
      const guide = seq.slice(pick - 20, pick), gcv = gcOf(guide);
      html += `<p><b>Guide RNA</b> (spacer, 5′→3′): <span class="lab-seq">${guide.replace(/T/g, "U")}</span><br><small>PAM ${seq.slice(pick, pick + 3)} · GC ${Math.round(gcv * 100)}% ${gcv < 0.4 || gcv > 0.8 ? "(outside the 40–80% usually recommended)" : "(good)"} · Cas9 cuts between bases ${pick - 3} and ${pick - 2}, 3 bp upstream of the PAM, making a blunt double-strand break.</small></p>`;
    }
    if (edited) {
      const p1 = translate(transcribeCoding(edited)).protein;
      html += `<p><b>After repair:</b> <span class="lab-seq">${p1.split("").map((a) => NAMES[a]).join("-")}</span></p><p class="lab-msg">${note}</p>`;
    }
    out(html);
  }
  button($(".tools"), "Repair by NHEJ", () => {
    if (pick == null) { note = "Choose a guide first."; return paint(); }
    const cut = pick - 3, r = Math.random(), size = 1 + Math.floor(Math.random() * 4);
    if (r < 0.55) { edited = GENE.slice(0, cut) + GENE.slice(cut + size); note = `NHEJ deleted ${size} bp at the cut.`; }
    else { const ins = Array.from({ length: size }, () => "ATGC"[Math.floor(Math.random() * 4)]).join(""); edited = GENE.slice(0, cut) + ins + GENE.slice(cut); note = `NHEJ inserted ${size} bp (${ins}) at the cut.`; }
    const shift = (edited.length - GENE.length) % 3 !== 0;
    note += shift ? " The indel isn't a multiple of 3, so the reading frame shifts: the amino acids after it change and a premature stop codon usually follows. This is how CRISPR knocks genes out." : " The indel is a multiple of 3, so the frame is kept: amino acids are lost or added but the rest of the protein is unchanged. NHEJ outcomes vary between cells, so researchers screen for the edit they want.";
    if (shift) st.ko = true; ch.check(st); paint();
  });
  button($(".tools"), "Repair by HDR (template: Leu→Pro)", () => {
    if (pick == null) { note = "Choose a guide first."; return paint(); }
    // the template changes the first CTG (Leu) codon near the cut to CCG (Pro) and alters the PAM so Cas9 can't cut again
    const tr = translate(transcribeCoding(GENE)).codons, near = tr.filter((c) => c.aa === "L").sort((a, b) => Math.abs(a.at - pick) - Math.abs(b.at - pick))[0];
    if (!near) { note = "No leucine codon near this cut."; return paint(); }
    edited = GENE.slice(0, near.at) + "CCG" + GENE.slice(near.at + 3);
    note = `Homology-directed repair copied the donor template: codon ${near.at / 3 + 1} changed from CTG (Leu) to CCG (Pro), a single precise change. In practice the template also carries a silent change to the PAM so the repaired DNA isn't cut again. HDR is much less frequent than NHEJ and mainly works in dividing cells.`;
    st.hdr = true; ch.check(st); paint();
  });
  button($(".tools"), "Reset", () => { pick = null; edited = null; note = ""; paint(); });
  paint();
}
