// Membrane explorer (ctx.mode "explore") and membrane identification (ctx.mode "identify"): the fluid mosaic membrane
// in cross-section. Tap a component for its structure and function; change temperature, cholesterol and fatty-acid
// saturation to see how fluidity responds. Illustrative: not to scale in the explorer (the lesson diagram is to scale).
import { shell, seg, toggle, panel, challenges, esc } from "../lab.js";

export const COMPONENTS = {
  head: { name: "Phospholipid head", fn: "The hydrophilic phosphate end of a phospholipid. Heads face the water on both sides of the bilayer.", detail: "Charged or polar, so it dissolves in water; it is the part that meets the aqueous environment." },
  tails: { name: "Fatty acid tails", fn: "Two hydrophobic hydrocarbon chains per phospholipid. They face inwards and form a core about 3–4 nm thick that blocks ions and polar molecules.", detail: "Unsaturated tails have kinks at cis double bonds, so they pack loosely and keep the membrane fluid." },
  channel: { name: "Channel protein", fn: "An integral protein with a water-filled pore: a specific ion or water crosses by facilitated diffusion, down its gradient, with no ATP.", detail: "Many are gated, opening only to a voltage change or a binding molecule, as in nerve impulses." },
  carrier: { name: "Carrier protein", fn: "An integral protein that binds a specific molecule, such as glucose, changes shape and releases it on the other side.", detail: "Slower than a channel, and its rate levels off when every carrier is busy." },
  receptor: { name: "Receptor protein", fn: "An integral protein that binds a signal, such as a hormone, on the outer surface and passes the message into the cell.", detail: "Most receptors are glycoproteins; the cell responds only to signals it has receptors for." },
  carb: { name: "Carbohydrate chain (glycocalyx)", fn: "A short chain on a protein (glycoprotein) or lipid (glycolipid), on the outer surface only. Used in cell recognition and adhesion.", detail: "ABO blood groups are different carbohydrate chains on red blood cell membranes." },
  cholesterol: { name: "Cholesterol", fn: "Sits between phospholipids in animal membranes. At body temperature it restrains their movement, making the membrane less fluid and less leaky; when cold it stops them packing tightly.", detail: "Its small hydroxyl group sits near the phospholipid heads; its rings and tail are hydrophobic." },
  peripheral: { name: "Peripheral protein", fn: "Sits on one surface of the bilayer, often attached to an integral protein, and does not cross the membrane.", detail: "Often links the membrane to the cytoskeleton on the cytosol side." },
};

// How fluid is the membrane? temp: "cold" | "body" | "warm"; cholesterol and unsaturated are booleans.
export function fluidity({ temp, cholesterol, unsaturated }) {
  let f = { cold: 1, body: 2, warm: 3 }[temp] + (unsaturated ? 1 : 0);   // heat and kinked tails loosen the packing
  if (cholesterol) f += temp === "cold" ? 1 : temp === "warm" ? -1 : 0;   // a buffer: it fluidises the cold membrane and restrains the warm one
  f = Math.max(1, Math.min(4, f));
  const label = ["", "rigid, gel-like", "fluid", "very fluid", "too fluid and leaky"][f];
  return { level: f, label };
}
const WHY = (st) => {
  const f = fluidity(st), bits = [];
  bits.push(st.temp === "cold" ? "Cold slows the phospholipids." : st.temp === "warm" ? "Warmth speeds the phospholipids up." : "At body temperature the phospholipids move freely.");
  if (st.unsaturated) bits.push("Kinked unsaturated tails pack loosely, keeping it fluid.");
  if (st.cholesterol) bits.push(st.temp === "cold" ? "Cholesterol stops the phospholipids packing tightly." : st.temp === "warm" ? "Cholesterol restrains their movement, so the membrane is less leaky." : "Cholesterol restrains their movement, making the membrane less fluid and less leaky.");
  return `<p><b>Membrane is ${f.label}.</b> ${bits.join(" ")}</p>`;
};

const svg = (st) => {
  const W = 640, H = 330, f = fluidity(st).level, gap = [0, 12.5, 15, 18, 22][f], wig = f >= 3 ? 3.2 : 0, hot = (id, inner) => `<g class="hot" data-o="${id}" tabindex="0" role="button" aria-label="${esc(COMPONENTS[id].name)}">${inner}</g>`;
  const y1 = 105, tail = 46, y2 = y1 + 2 * tail + 8 + 12, blocked = [[100, 150], [248, 306], [430, 480]].concat(st.cholesterol ? [[60, 74], [200, 214], [370, 384], [545, 559]] : []);
  let heads = "", tails = "";
  for (let x = 24, k = 0; x < W - 20; x += gap, k++) {
    if (blocked.some(([a, b]) => x > a - 6 && x < b + 6)) continue;
    for (const [yh, d] of [[y1, 1], [y2, -1]]) {
      heads += `<circle cx="${x}" cy="${yh}" r="6" fill="#f08c00" stroke="#ffc078"/>`;
      const bend = (kk) => (wig ? Math.sin((k + kk) * 1.7) * wig : 0), kink = st.unsaturated && k % 2 === 0;
      tails += `<path d="M${x - 2} ${yh + d * 6} q${bend(0)} ${d * 10} 0 ${d * 20} q${-bend(1)} ${d * 10} 0 ${d * 20}" fill="none" stroke="#868e96" stroke-width="1.4"/>`;
      tails += kink ? `<path d="M${x + 2} ${yh + d * 6} l0 ${d * 14} l-4 ${d * 6} l4 ${d * 6} l0 ${d * 14}" fill="none" stroke="#868e96" stroke-width="1.4"/>` : `<path d="M${x + 2} ${yh + d * 6} q${-bend(2)} ${d * 20} 0 ${d * 40}" fill="none" stroke="#868e96" stroke-width="1.4"/>`;
    }
  }
  const top = y1 - 12, h = y2 - y1 + 24, beads = (x, y) => [0, 1, 2, 3].map((i) => `<circle cx="${x + (i % 2 ? 4 : -4)}" cy="${y - 6 - i * 9}" r="4" fill="#faa2c1"/>`).join("");
  const chol = st.cholesterol ? hot("cholesterol", [67, 207, 377, 552].map((x) => `<rect x="${x - 4}" y="${y1 + 4}" width="8" height="30" rx="3" fill="#e599f7" stroke="#f3d9fa"/><circle cx="${x}" cy="${y1 + 1}" r="3.2" fill="#f3d9fa"/>`).join("")) : "";
  return `<svg class="lab-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Fluid mosaic membrane in cross-section">
    <rect x="0" y="0" width="${W}" height="${y1 - 8}" fill="#0b2a2a"/><rect x="0" y="${y2 + 8}" width="${W}" height="${H - y2 - 8}" fill="#16163a"/>
    <text x="14" y="22" fill="#63e6be" font-size="13" font-weight="700">extracellular fluid (water)</text><text x="14" y="${H - 12}" fill="#9ba7ff" font-size="13" font-weight="700">cytosol (water)</text>
    ${hot("tails", tails)}${hot("head", heads)}${chol}
    ${hot("channel", `<rect x="102" y="${top}" width="18" height="${h}" rx="7" fill="#7950f2" stroke="#b197fc" stroke-width="2"/><rect x="130" y="${top}" width="18" height="${h}" rx="7" fill="#7950f2" stroke="#b197fc" stroke-width="2"/>`)}
    ${hot("carrier", `<rect x="250" y="${top}" width="54" height="${h}" rx="18" fill="#12b886" stroke="#96f2d7" stroke-width="2"/><path d="M262 ${top + 14} q10 ${h / 2 - 14} 0 ${h - 28}" fill="none" stroke="#96f2d7" stroke-width="3" stroke-dasharray="4 4"/>`)}
    ${hot("receptor", `<rect x="436" y="${top - 22}" width="36" height="${h + 22}" rx="12" fill="#4263eb" stroke="#91a7ff" stroke-width="2"/>`)}
    ${hot("carb", `${beads(454, top - 22)}${beads(232, y1 - 8)}${beads(520, y1 - 8)}`)}
    ${hot("peripheral", `<ellipse cx="190" cy="${y2 + 24}" rx="30" ry="14" fill="#fcc419" stroke="#ffe066" stroke-width="2"/>`)}
  </svg>`;
};

export function mount(el, ctx = {}) {
  const identify = ctx.mode === "identify";
  const $ = shell(el, `<div class="lab-row lab-top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"><div class="lab-q"></div><div class="lab-side"></div></div></div>`);
  const st = { temp: "body", cholesterol: true, unsaturated: false }, prog = { opened: new Set(), score: 0, streak: 0, states: new Set(), tried: false };
  let target = null, asked = 0;
  const info = panel($(".lab-side"));
  const ch = identify ? challenges($(".lab-side"), ctx, [{ id: "six", text: "Identify 6 components correctly", test: (s) => s.score >= 6 }, { id: "streak", text: "Get 5 right in a row", test: (s) => s.streak >= 5 }])
    : challenges($(".lab-side"), ctx, [{ id: "all", text: "Open all 8 components", test: (s) => s.opened.size >= 8 }, { id: "fluid", text: "See a rigid membrane and a fluid one", test: (s) => s.states.has(1) && s.states.has(2) }, { id: "chol", text: "Show how cholesterol changes the cold membrane", test: (s) => s.tried }]);
  const ids = () => [...new Set([...$.root.querySelectorAll(".lab-svg [data-o]")].map((g) => g.dataset.o))];
  const show = (id) => { const c = COMPONENTS[id]; info(`<h4>${esc(c.name)}</h4><p>${esc(c.fn)}</p><p class="lab-msg">${esc(c.detail)}</p>`); };
  function ask() { const p = ids(); target = p[Math.floor(Math.random() * p.length)]; $(".lab-q").innerHTML = `<div class="lab-info"><b>Find:</b> ${esc(COMPONENTS[target].name)}<p class="lab-msg">${asked ? `Score ${prog.score} / ${asked}.` : "Tap it in the membrane."}</p></div>`; }
  function draw() {
    $(".lab-stage").innerHTML = svg(st);
    $.all(".lab-svg [data-o]").forEach((g) => {
      const pick = () => {
        const id = g.dataset.o; $.all(".lab-svg .sel").forEach((x) => x.classList.remove("sel")); g.classList.add("sel");
        if (identify && target) { asked++; const ok = id === target; if (ok) { prog.score++; prog.streak++; } else prog.streak = 0; ch.check(prog); show(id); $(".lab-q").innerHTML = `<div class="lab-info"><b>${ok ? "Correct" : "Not quite"}.</b> ${ok ? "" : `That's the ${esc(COMPONENTS[id].name.toLowerCase())}. `}<p class="lab-msg ${ok ? "ok" : "no"}">Score ${prog.score} / ${asked}</p></div>`; setTimeout(ask, 1300); }
        else { prog.opened.add(id); ch.check(prog); show(id); }
      };
      g.addEventListener("click", pick); g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } });
    });
  }
  const refresh = () => { prog.states.add(fluidity(st).level); if (st.temp === "cold") prog.tried = true; ch.check(prog); draw(); if (!identify) info(WHY(st)); else ask(); };
  if (!identify) {
    seg($(".lab-top"), [["cold", "Cold"], ["body", "Body temperature"], ["warm", "Warm"]], st.temp, (v) => { st.temp = v; refresh(); });
    toggle($(".lab-top"), "Cholesterol", st.cholesterol, (v) => { st.cholesterol = v; refresh(); });
    toggle($(".lab-top"), "Unsaturated tails", st.unsaturated, (v) => { st.unsaturated = v; refresh(); });
  }
  draw();
  if (identify) ask(); else info("<p>Tap any component to see what it is and what it does. Change the temperature, cholesterol and tail saturation to see how fluidity responds.</p>");
}
