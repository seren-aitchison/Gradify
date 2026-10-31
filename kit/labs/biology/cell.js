// Cell explorer (ctx.mode "explore") and organelle identification (ctx.mode "identify"): an animal and a
// plant cell drawn as labelled SVG. Tap an organelle for its structure and function; in identify mode,
// find the organelle you're asked for. Illustrative: not to scale, and real cells hold far more of each.
import { shell, seg, panel, challenges, esc } from "../lab.js";

export const ORGANELLES = {
  membrane: { name: "Cell (plasma) membrane", in: "both", size: "about 7–10 nm thick", fn: "A phospholipid bilayer with proteins that controls what enters and leaves the cell and carries receptors for signals.", detail: "Fluid mosaic: lipids and many proteins move laterally. Selectively permeable: small non-polar molecules cross easily; ions and polar molecules need transport proteins." },
  wall: { name: "Cell wall", in: "plant", size: "0.1–10 µm", fn: "A rigid layer of cellulose microfibrils outside the membrane that resists turgor pressure and gives the cell its shape.", detail: "Fungal walls are mostly chitin; bacterial walls are peptidoglycan. Plasmodesmata cross plant walls and connect neighbouring cells." },
  nucleus: { name: "Nucleus", in: "both", size: "about 5–10 µm across", fn: "Holds the chromosomes (DNA with histone proteins as chromatin) and is where DNA is replicated and transcribed into RNA.", detail: "Surrounded by a double-membrane nuclear envelope with nuclear pores that control traffic of RNA and proteins." },
  nucleolus: { name: "Nucleolus", in: "both", size: "1–2 µm", fn: "A dense region inside the nucleus where ribosomal RNA is transcribed and ribosome subunits are assembled.", detail: "Not membrane-bound. Large and prominent in cells making a lot of protein." },
  rer: { name: "Rough endoplasmic reticulum", in: "both", size: "flattened sacs (cisternae), continuous with the nuclear envelope", fn: "Membranes studded with ribosomes that make proteins for secretion, for membranes and for lysosomes; the proteins fold and are modified inside.", detail: "Abundant in secretory cells such as pancreatic acinar cells and plasma cells." },
  ser: { name: "Smooth endoplasmic reticulum", in: "both", size: "tubular network", fn: "Makes lipids such as phospholipids and steroids, detoxifies some drugs and stores calcium ions.", detail: "Extensive in liver cells (detoxification) and in muscle, where it is called the sarcoplasmic reticulum." },
  golgi: { name: "Golgi apparatus", in: "both", size: "stack of 4–8 cisternae, about 1 µm", fn: "Receives proteins and lipids from the ER, modifies them (for example by adding carbohydrate groups), sorts them and packages them into vesicles.", detail: "Has a cis (receiving) face and a trans (shipping) face." },
  mito: { name: "Mitochondrion", in: "both", size: "about 0.5–1 µm wide, 1–10 µm long", fn: "The site of the Krebs cycle and oxidative phosphorylation, which make most of the cell's ATP in aerobic respiration.", detail: "Double membrane; the inner membrane is folded into cristae. Has its own circular DNA and 70S ribosomes, evidence for its endosymbiotic origin." },
  chloro: { name: "Chloroplast", in: "plant", size: "about 2–10 µm", fn: "The site of photosynthesis: light-dependent reactions on the thylakoid membranes and the Calvin cycle in the stroma.", detail: "Double membrane, thylakoids stacked into grana, its own DNA and 70S ribosomes. Found in photosynthetic cells only, not in roots." },
  vacuole: { name: "Large central vacuole", in: "plant", size: "can fill up to about 90% of the cell volume", fn: "Stores water, ions, sugars and pigments; its contents push the cytoplasm against the wall, keeping the cell turgid.", detail: "Bounded by a membrane called the tonoplast." },
  lyso: { name: "Lysosome", in: "animal", size: "0.1–1 µm", fn: "A vesicle of hydrolytic enzymes that digests worn-out organelles (autophagy) and material taken in by endocytosis.", detail: "The enzymes work best at the acidic pH (about 4.5–5) maintained inside. Plant cells do similar work in their vacuole." },
  perox: { name: "Peroxisome", in: "both", size: "0.1–1 µm", fn: "Breaks down fatty acids and toxic substances, producing hydrogen peroxide, which its catalase converts to water and oxygen.", detail: "Single membrane. In plants, peroxisomes also take part in photorespiration." },
  ribo: { name: "Ribosomes", in: "both", size: "about 25–30 nm (80S in the cytoplasm of eukaryotes)", fn: "Translate messenger RNA into protein. Free ribosomes make proteins that stay in the cytosol; bound ones make proteins entering the ER.", detail: "Made of ribosomal RNA and protein, in a large and a small subunit. Not membrane-bound." },
  centro: { name: "Centrosome (centrioles)", in: "animal", size: "centrioles about 0.2 µm wide", fn: "The main microtubule-organising centre; it organises the spindle that separates chromosomes during cell division.", detail: "Most plant cells have no centrioles and organise their spindle without them." },
  cyto: { name: "Cytoskeleton", in: "both", size: "filaments 7–25 nm wide", fn: "A network of microfilaments (actin), intermediate filaments and microtubules that supports the cell, moves organelles and vesicles, and allows movement.", detail: "Motor proteins (myosin, kinesin, dynein) walk along it." },
  vesicle: { name: "Vesicles", in: "both", size: "about 50–100 nm", fn: "Small membrane sacs that carry materials between the ER, Golgi and the membrane, and release contents by exocytosis.", detail: "Coat proteins shape vesicles and target them to the right membrane." },
};

const svgCell = (type) => {
  const plant = type === "plant", W = 640, H = 420;
  const hot = (id, shape) => `<g class="hot" data-o="${id}" tabindex="0" role="button" aria-label="${esc(ORGANELLES[id].name)}">${shape}</g>`;
  const mito = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="34" ry="15" fill="#e8743b" stroke="#ffb07a" stroke-width="2"/><path d="M-26 0 q6 -10 12 0 t12 0 t12 0 t12 0" fill="none" stroke="#ffd2b0" stroke-width="2"/></g>`;
  const chloro = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="38" ry="18" fill="#2f9e44" stroke="#8ce99a" stroke-width="2"/>${[-22, -8, 6, 20].map((dx) => `<g transform="translate(${dx} 0)">${[-8, -3, 2, 7].map((dy) => `<rect x="-5" y="${dy - 2}" width="10" height="3" rx="1.5" fill="#b2f2bb"/>`).join("")}</g>`).join("")}</g>`;
  const ribos = (pts) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#ffe066"/>`).join("");
  const body = plant
    ? `${hot("wall", `<rect x="20" y="20" width="600" height="380" rx="26" fill="#1f3d1f" stroke="#69db7c" stroke-width="10"/>`)}
       ${hot("membrane", `<rect x="34" y="34" width="572" height="352" rx="20" fill="#11201a" stroke="#a9e34b" stroke-width="3"/>`)}
       ${hot("vacuole", `<rect x="250" y="70" width="320" height="250" rx="60" fill="#1c3a5e" stroke="#74c0fc" stroke-width="3"/>`)}`
    : `${hot("membrane", `<ellipse cx="320" cy="210" rx="300" ry="190" fill="#1d1a2b" stroke="#da77f2" stroke-width="5"/>`)}`;
  const nx = plant ? 140 : 300, ny = plant ? 150 : 200;
  const nucleus = `${hot("nucleus", `<circle cx="${nx}" cy="${ny}" r="62" fill="#3b2f63" stroke="#b197fc" stroke-width="5" stroke-dasharray="14 4"/><path d="M${nx - 40} ${ny - 10} q20 -25 40 0 t40 5 M${nx - 35} ${ny + 25} q25 -15 50 5" fill="none" stroke="#9775fa" stroke-width="2"/>`)}${hot("nucleolus", `<circle cx="${nx + 12}" cy="${ny + 6}" r="17" fill="#7048e8"/>`)}`;
  const rer = hot("rer", `<g fill="none" stroke="#748ffc" stroke-width="5">${[0, 1, 2].map((i) => `<path d="M${nx + 70 + i * 12} ${ny - 70 + i * 4} q30 30 0 70 t0 70"/>`).join("")}</g>${ribos([...Array(18)].map((_, i) => [nx + 66 + (i % 3) * 12 + (Math.floor(i / 3) % 2) * 8, ny - 62 + Math.floor(i / 3) * 24]))}`);
  const ser = hot("ser", `<g fill="none" stroke="#91a7ff" stroke-width="4">${plant ? `<path d="M70 300 q20 -20 40 0 t40 0 t40 0"/><path d="M75 320 q20 -18 40 0 t40 0"/>` : `<path d="M420 300 q20 -20 40 0 t40 0 t40 0"/><path d="M425 322 q20 -18 40 0 t40 0 t40 0"/>`}</g>`);
  const gx = plant ? 200 : 470, gy = plant ? 330 : 160;
  const golgi = hot("golgi", `<g fill="none" stroke="#f783ac" stroke-width="6" stroke-linecap="round">${[0, 1, 2, 3, 4].map((i) => `<path d="M${gx - 40 + i * 2} ${gy - 18 + i * 10} q40 ${-14 + i * 2} 80 0"/>`).join("")}</g>`);
  const vesicles = hot("vesicle", `${[[gx + 54, gy - 14], [gx + 62, gy + 18], [gx + 48, gy + 42], [plant ? 560 : 560, plant ? 360 : 230]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="none" stroke="#faa2c1" stroke-width="2.5"/>`).join("")}`);
  const mitos = hot("mito", plant ? `${mito(95, 90, 20)}${mito(130, 270, -30)}${mito(560, 350, 10)}` : `${mito(140, 120, 25)}${mito(170, 300, -20)}${mito(500, 330, 15)}${mito(450, 85, -10)}`);
  const chloros = plant ? hot("chloro", `${chloro(90, 210, 70)}${chloro(220, 60, 0)}${chloro(330, 360, 10)}${chloro(470, 365, -8)}`) : "";
  const lyso = plant ? "" : hot("lyso", `<circle cx="210" cy="90" r="17" fill="#c92a2a" stroke="#ff8787" stroke-width="2"/><circle cx="560" cy="160" r="13" fill="#c92a2a" stroke="#ff8787" stroke-width="2"/>`);
  const perox = hot("perox", plant ? `<circle cx="215" cy="250" r="12" fill="#5c940d" stroke="#c0eb75" stroke-width="2"/>` : `<circle cx="110" cy="220" r="13" fill="#5c940d" stroke="#c0eb75" stroke-width="2"/><circle cx="380" cy="340" r="11" fill="#5c940d" stroke="#c0eb75" stroke-width="2"/>`);
  const freeRibo = hot("ribo", ribos(plant ? [[60, 140], [72, 150], [180, 220], [196, 214], [230, 300], [240, 290]] : [[230, 200], [236, 214], [380, 280], [394, 270], [250, 330], [262, 338], [120, 160], [130, 170]]));
  const centro = plant ? "" : hot("centro", `<g transform="translate(400 250)"><rect x="-14" y="-5" width="28" height="10" rx="3" fill="#fab005"/><rect x="-5" y="-14" width="10" height="28" rx="3" fill="#ffd43b" transform="translate(22 4)"/></g>`);
  const cyto = hot("cyto", `<g fill="none" stroke="#868e96" stroke-width="1.4" stroke-dasharray="3 3" opacity=".8">${plant ? `<path d="M50 380 L240 70"/><path d="M40 200 L240 380"/>` : `<path d="M60 250 L280 120"/><path d="M340 380 L600 230"/><path d="M380 40 L600 180"/>`}</g>`);
  return `<svg class="lab-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${plant ? "Plant" : "Animal"} cell">${body}${cyto}${nucleus}${rer}${ser}${golgi}${vesicles}${mitos}${chloros}${lyso}${perox}${freeRibo}${centro}</svg>`;
};

export function mount(el, ctx = {}) {
  const identify = ctx.mode === "identify";
  const $ = shell(el, `<div class="lab-row lab-top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"><div class="lab-q"></div><div class="lab-side"></div></div></div>`);
  let type = "animal", target = null, score = 0, asked = 0, sel = null;
  const info = panel($(".lab-side"));
  const ch = identify ? challenges($(".lab-side"), ctx, [
    { id: "five", text: "Identify 5 organelles correctly", test: (s) => s.score >= 5 },
    { id: "plant", text: "Identify a plant-only structure", test: (s) => s.plantOnly },
    { id: "streak", text: "Get 8 right in a row", test: (s) => s.streak >= 8 },
  ]) : challenges($(".lab-side"), ctx, [
    { id: "both", text: "Explore both an animal and a plant cell", test: (s) => s.seen.has("animal") && s.seen.has("plant") },
    { id: "ten", text: "Open 10 different organelles", test: (s) => s.opened.size >= 10 },
    { id: "endo", text: "Find both organelles with their own DNA (endosymbiotic origin)", test: (s) => s.opened.has("mito") && s.opened.has("chloro") },
  ]);
  const st = { seen: new Set(["animal"]), opened: new Set(), score: 0, streak: 0, plantOnly: false };
  const pool = () => [...new Set([...$.root.querySelectorAll(".lab-svg [data-o]")].map((g) => g.dataset.o))];
  function ask() {
    const ids = pool(); target = ids[Math.floor(Math.random() * ids.length)];
    $(".lab-q").innerHTML = `<div class="lab-info"><b>Find:</b> ${esc(ORGANELLES[target].name)}<p class="lab-msg">Tap it in the ${type} cell. ${asked ? `Score ${score} / ${asked}.` : ""}</p></div>`;
  }
  function show(id) {
    const o = ORGANELLES[id];
    info(`<h4>${esc(o.name)}</h4><p>${esc(o.fn)}</p><p class="lab-msg">${esc(o.detail)}</p><p><small>Found in: ${o.in === "both" ? "animal and plant cells" : `${o.in} cells`} · Size: ${esc(o.size)}</small></p>`);
  }
  function draw() {
    $(".lab-stage").innerHTML = svgCell(type);
    $.all(".lab-svg [data-o]").forEach((g) => {
      const pick = () => {
        const id = g.dataset.o;
        $.all(".lab-svg .sel").forEach((x) => x.classList.remove("sel")); g.classList.add("sel"); sel = id;
        if (identify && target) {
          asked++; const ok = id === target;
          if (ok) { score++; st.streak++; if (ORGANELLES[id].in === "plant") st.plantOnly = true; } else st.streak = 0;
          st.score = score; ch.check(st);
          show(id);
          $(".lab-q").innerHTML = `<div class="lab-info"><b>${ok ? "Correct" : "Not quite"}.</b> ${ok ? "" : `That's the ${esc(ORGANELLES[id].name.toLowerCase())}. `}<p class="lab-msg ${ok ? "ok" : "no"}">Score ${score} / ${asked}</p></div>`;
          setTimeout(ask, 1300);
        } else { st.opened.add(id); ch.check(st); show(id); }
      };
      g.addEventListener("click", pick); g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } });
    });
  }
  seg($(".lab-top"), [["animal", "Animal cell"], ["plant", "Plant cell"]], type, (v) => { type = v; st.seen.add(v); ch.check(st); draw(); if (identify) ask(); else info(`<p>Tap any structure in the ${v} cell.</p>`); });
  draw();
  if (identify) ask(); else info("<p>Tap any structure to see what it is and what it does. Switch between the animal and plant cell to compare them.</p>");
}
