// Number explorer, in two modes (ctx.mode):
//   "sieve":   the sieve of Eratosthenes on 1–200, step by step, plus prime factorisation of any whole number.
//   "modular": arithmetic modulo n on a clock, with the addition or multiplication table, inverses and powers.
import { shell, slider, seg, button, panel, challenges, esc } from "../lab.js";

export function factorise(n) {
  const out = []; let m = Math.abs(Math.trunc(n));
  for (let p = 2; p * p <= m; p++) while (m % p === 0) { out.push(p); m /= p; }
  if (m > 1) out.push(m);
  return out;
}
export const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
export const mod = (a, n) => ((a % n) + n) % n;
export const powmod = (b, e, n) => { let r = 1 % n; b = mod(b, n); while (e > 0) { if (e & 1) r = (r * b) % n; b = (b * b) % n; e >>= 1; } return r; };

export function mount(el, ctx = {}) { return ctx.mode === "modular" ? modular(el, ctx) : sieve(el, ctx); }

function sieve(el, ctx) {
  const N = 200, $ = shell(el, `<div class="lab-cols"><div><div class="mg-sieve" role="grid" aria-label="Numbers 1 to ${N}"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const grid = $(".mg-sieve"), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let crossed = new Map(), p = 1, done = false, num = 84;   // 2² × 3 × 7: four prime factors, so the five-factor challenge needs a choice
  const ch = challenges(ctrl, ctx, [
    { id: "full", text: "Run the sieve to the end and find all 46 primes below 200", test: (x) => x.done },
    { id: "sqrt", text: "Notice when you can stop: no new numbers are crossed out after 13", test: (x) => x.p > 13 },
    { id: "big", text: "Factorise a number with at least five prime factors (counted with repeats)", test: (x) => x.fl >= 5 },
  ]);
  const next = () => {
    if (done) return; p++; while (p <= N && crossed.has(p)) p++;
    if (p * p > N) { done = true; } else for (let k = p * p; k <= N; k += p) if (!crossed.has(k)) crossed.set(k, p);
    paint();
  };
  button(ctrl, "Next prime: cross out its multiples", next);
  button(ctrl, "Run to the end", () => { while (!done) next(); });
  button(ctrl, "Start again", () => { crossed = new Map(); p = 1; done = false; paint(); });
  const f = document.createElement("label"); f.className = "mg-fnin"; f.innerHTML = `<span>Factorise</span><input inputmode="numeric" value="${num}" aria-label="Whole number to factorise">`; ctrl.append(f);
  const fi = f.querySelector("input"), fo = document.createElement("p"); fo.className = "mg-fact"; fo.setAttribute("role", "status"); ctrl.append(fo);
  const fact = () => {
    const n = Number(fi.value);
    if (!Number.isInteger(n) || n < 2 || n > 1e12) { fo.textContent = "Enter a whole number from 2 to 1,000,000,000,000."; return; }
    const fs = factorise(n), grouped = Object.entries(fs.reduce((m, q) => ((m[q] = (m[q] || 0) + 1), m), {}));
    fo.innerHTML = `${n.toLocaleString()} = ${grouped.map(([q, e]) => `${q}${e > 1 ? `<sup>${e}</sup>` : ""}`).join(" × ")}${fs.length === 1 ? " (prime)" : ""}`;
    ch.check({ done, p, fl: fs.length });
  };
  fi.addEventListener("input", fact); fact();
  const COLS = ["#5aa0ff", "#10b981", "#f59e0b", "#f472b6", "#a78bfa", "#14d4c4"];
  function paint() {
    grid.innerHTML = Array.from({ length: N }, (_, i) => { const n = i + 1, by = crossed.get(n), prime = n > 1 && !by && (done || n <= p);
      return `<span role="gridcell" class="${n === 1 ? "one" : by ? "x" : prime ? "pr" : ""} ${n === p && !done ? "cur" : ""}" style="${by ? `--c:${COLS[[2, 3, 5, 7, 11, 13].indexOf(by) % COLS.length] || "#888"}` : ""}" aria-label="${n}${prime ? ", prime" : by ? `, multiple of ${by}` : ""}">${n}</span>`; }).join("");
    const primes = Array.from({ length: N }, (_, i) => i + 1).filter((n) => n > 1 && !crossed.has(n));
    ch.check({ done, p, fl: 0 });
    out(done ? `<p><b>${primes.length} primes</b> below ${N}. Once p² > ${N} (after 13, since 17² = 289), every remaining number must be prime: a composite number has a prime factor no bigger than its square root.</p>` : p > 1 ? `<p>Crossing out multiples of <b>${p}</b>, starting from ${p}² = ${p * p}: smaller multiples were already crossed out by smaller primes.</p>` : `<p>1 is neither prime nor composite. Press "Next prime" to start with 2.</p>`);
  }
  paint();
  return () => {};
}

function modular(el, ctx) {
  const $ = shell(el, `<div class="lab-cols"><div><svg class="mg-clock" viewBox="-120 -120 240 240" role="img"></svg></div><div class="lab-ctrl"></div></div><div class="mg-table"></div><div class="lab-out"></div>`);
  const svg = $(".mg-clock"), ctrl = $(".lab-ctrl"), tbl = $(".mg-table"), out = panel($(".lab-out"));
  const s = { n: 12, a: 7, b: 5, op: "+" };
  const ch = challenges(ctrl, ctx, [
    { id: "inv", text: "Find a multiplicative inverse: a × b ≡ 1 (mod n)", test: (x) => x.op === "×" && x.r === 1 && x.n > 2 },
    { id: "zd", text: "Find two non-zero numbers whose product is 0 mod n (a composite modulus)", test: (x) => x.op === "×" && x.r === 0 && x.a % x.n && x.b % x.n },
    { id: "fermat", text: "Check Fermat's little theorem: a^(p−1) ≡ 1 (mod p) for a prime p", test: (x) => x.op === "^" && x.prime && x.b === x.n - 1 && x.a % x.n !== 0 && x.r === 1 },
  ]);
  slider(ctrl, { label: "Modulus n", min: 2, max: 24, step: 1, value: s.n, fmt: (v) => v.toFixed(0), onInput: (v) => { s.n = v; run(); } });
  slider(ctrl, { label: "a", min: 0, max: 40, step: 1, value: s.a, fmt: (v) => v.toFixed(0), onInput: (v) => { s.a = v; run(); } });
  slider(ctrl, { label: "b", min: 0, max: 40, step: 1, value: s.b, fmt: (v) => v.toFixed(0), onInput: (v) => { s.b = v; run(); } });
  seg(ctrl, [["+", "a + b"], ["×", "a × b"], ["^", "a^b"]], s.op, (v) => { s.op = v; run(); });
  function run() {
    const { n, a, b, op } = s, r = op === "+" ? mod(a + b, n) : op === "×" ? mod(a * b, n) : powmod(a, b, n), prime = factorise(n).length === 1;
    svg.setAttribute("aria-label", `Clock for arithmetic modulo ${n}, showing ${r}`);
    svg.innerHTML = `<circle r="96" fill="none" stroke="rgba(255,255,255,.2)"/>${Array.from({ length: n }, (_, k) => { const t = (2 * Math.PI * k) / n - Math.PI / 2, x = 96 * Math.cos(t), y = 96 * Math.sin(t);
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${k === r ? 12 : k === mod(a, n) ? 9 : 7}" fill="${k === r ? "#10b981" : k === mod(a, n) ? "#5aa0ff" : "#1f2228"}"/><text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="middle" font-size="10" fill="#e8eaed">${k}</text>`; }).join("")}<text y="6" text-anchor="middle" font-size="22" fill="#e8eaed">${r}</text>`;
    const T = op === "^" ? null : Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (op === "+" ? mod(i + j, n) : mod(i * j, n))));
    tbl.innerHTML = T && n <= 13 ? `<table class="mg-mod"><caption>${op === "+" ? "Addition" : "Multiplication"} table modulo ${n}</caption><tr><th>${op}</th>${T.map((_, j) => `<th>${j}</th>`).join("")}</tr>${T.map((row, i) => `<tr><th>${i}</th>${row.map((v, j) => `<td class="${i === mod(a, n) && j === mod(b, n) ? "hit" : op === "×" && v === 1 ? "one" : ""}">${v}</td>`).join("")}</tr>`).join("")}</table>` : "";
    const inv = Array.from({ length: n }, (_, k) => k).filter((k) => gcd(k, n) === 1);
    ch.check({ n, a, b, op, r, prime });
    out(`<p>${a} ${op === "^" ? "^" : op} ${b} ≡ <b>${r}</b> (mod ${n}) ${op === "^" ? `· computed by repeated squaring` : ""}</p><p>${prime ? `${n} is prime, so every non-zero number has a multiplicative inverse mod ${n}.` : `${n} isn't prime: only the ${inv.length} numbers coprime to ${n} (${esc(inv.join(", "))}) have inverses.`} ${op === "×" && n <= 13 ? "Each 1 in the table marks an inverse pair." : ""}</p>`);
  }
  run();
  return () => {};
}
