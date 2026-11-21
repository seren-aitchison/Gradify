// Layout checks shared by the maths renderers: every <text> label inside the viewBox and not overprinting another,
// at both widths. Text extents are estimated from the font size and the characters (the site font is a sans-serif
// close to these proportions), so the check is a little generous rather than exact.
import { check, f1 } from "./renderers.js";

const W_CHAR = (c) => (/[il1.,:;'|!\s()]/.test(c) ? 0.32 : /[MWmw@%]/.test(c) ? 0.86 : /[A-Z0-9£$€=+−×÷<>≤≥]/.test(c) ? 0.62 : 0.54);
const unesc = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");

/** Estimated boxes of every <text> in an SVG body: {x0, y0, x1, y1, s}. */
export function textBoxes(body) {
  const out = [];
  for (const m of body.matchAll(/<text ([^>]*)>(.*?)<\/text>/g)) {
    const a = Object.fromEntries([...m[1].matchAll(/([a-z-]+)="([^"]*)"/g)].map((x) => [x[1], x[2]]));
    const size = +a["font-size"], bold = +(a["font-weight"] || 400) >= 600 ? 1.05 : 1;
    let w = 0;
    for (const part of m[2].split(/(<tspan[^>]*>.*?<\/tspan>)/)) {
      const small = part.startsWith("<tspan"), t = unesc(part.replace(/<[^>]+>/g, ""));
      for (const c of t) w += W_CHAR(c) * size * bold * (small ? 0.72 : 1);
    }
    const x = +a.x, y = +a.y, anchor = a["text-anchor"] || "start", base = a["dominant-baseline"] || "auto";
    const x0 = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
    const h = size * 0.92, y0 = base === "middle" || base === "central" ? y - h / 2 : base === "hanging" ? y : y - h * 0.8;
    out.push({ x0, y0, x1: x0 + w, y1: y0 + h, s: unesc(m[2].replace(/<[^>]+>/g, "")) });
  }
  return out;
}

/** Labels inside the W × H picture and clear of each other. */
export function layoutCheck(body, W, H, tag, warn = []) {
  const b = textBoxes(body), out = [], over = [];
  for (const t of b) if (t.x0 < -1 || t.y0 < -1 || t.x1 > W + 1 || t.y1 > H + 1) out.push(`"${t.s}" at ${f1(t.x0)},${f1(t.y0)}–${f1(t.x1)},${f1(t.y1)}`);
  for (let i = 0; i < b.length; i++) for (let j = i + 1; j < b.length; j++) {
    const p = b[i], q = b[j];
    if (Math.min(p.x1, q.x1) - Math.max(p.x0, q.x0) > 1.5 && Math.min(p.y1, q.y1) - Math.max(p.y0, q.y0) > 1.5) over.push(`"${p.s}" and "${q.s}"`);
  }
  return [
    check(`${tag}: every label inside the picture`, !out.length, out.slice(0, 4).join("; ") || `${b.length} labels in ${Math.round(W)}×${Math.round(H)}`),
    check(`${tag}: no two labels overprint`, !over.length, over.slice(0, 4).join("; ")),
    ...(warn.length ? [check(`${tag}: every label fits its shape`, false, warn.slice(0, 4).join("; "))] : []),
  ];
}

/** A renderer entry for register(): subject checks plus the layout of both widths. draw(spec, W, narrow) → {s, H}. */
export function entry(draw, subject, widths) {
  return {
    draw, widths,
    checks: (spec, lessonText) => {
      const own = subject(spec, lessonText);
      // the numbers and terms the diagram takes from the lesson are really in the lesson's notes
      if (own.length && spec.fromLesson?.length) {
        const flat = (t) => String(t).replace(/\^\{([^}]*)\}/g, "^$1").replace(/[\s,]/g, "").replace(/−/g, "-");
        const L = flat(lessonText), miss = spec.fromLesson.filter((t) => !L.includes(flat(t)));
        own.push(check(`the lesson states ${spec.fromLesson.map((t) => `"${t}"`).join(", ")}`, !miss.length, miss.length ? `not in the lesson: ${miss.join("; ")}` : ""));
      }
      const lay = widths.flatMap((W, i) => { const d = draw(spec, W, i === 1); return layoutCheck(d.s, W, d.H, i ? "narrow" : "wide", d.warn); });
      return own.length ? [...own, ...lay] : own;
    },
  };
}
