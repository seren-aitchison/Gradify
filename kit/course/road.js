// The Gradify road and car (the homepage's motif, from assets/features.js), for every site: courses
// draw their learning path as this road, with the car parked at your current lesson. The ids are
// prefixed cr- so they never clash with the homepage's copy. Put ROAD_DEFS in one <svg> per page.
export const CAR = `
  <path d="M27 -10 L120 -40 Q128 -12 112 4 L27 -5 Z" fill="url(#cr-rd-beam)"/>
  <path d="M27 5 L112 -4 Q128 12 120 40 L27 10 Z" fill="url(#cr-rd-beam)"/>
  <ellipse cx="0" cy="4" rx="31" ry="17" fill="url(#cr-rd-shadow)"/>
  <rect x="-20" y="-17" width="13" height="6" rx="2.5" fill="#0b0b0b"/><rect x="10" y="-17" width="13" height="6" rx="2.5" fill="#0b0b0b"/>
  <rect x="-20" y="11" width="13" height="6" rx="2.5" fill="#0b0b0b"/><rect x="10" y="11" width="13" height="6" rx="2.5" fill="#0b0b0b"/>
  <path d="M-27 -6 Q-27 -14 -18 -14 H14 Q26 -14 29 -5 Q30 0 29 5 Q26 14 14 14 H-18 Q-27 14 -27 6 Z" fill="url(#cr-rd-body)" stroke="rgba(0,0,0,.25)" stroke-width=".8"/>
  <path d="M-12 -10 H8 Q12 -10 12 -6 V6 Q12 10 8 10 H-12 Q-16 10 -16 6 V-6 Q-16 -10 -12 -10 Z" fill="url(#cr-roadg)"/>
  <path d="M12 -8.5 Q19 -6 19 0 Q19 6 12 8.5 Z" fill="#141826" opacity=".9"/>
  <path d="M-16 -7.5 Q-21 -5 -21 0 Q-21 5 -16 7.5 Z" fill="#141826" opacity=".8"/>
  <path d="M-10 -9 H6" stroke="#fff" stroke-opacity=".55" stroke-width="1.2" stroke-linecap="round"/>
  <circle cx="28" cy="-7.5" r="11" fill="url(#cr-rd-lamp)"/><circle cx="28" cy="7.5" r="11" fill="url(#cr-rd-lamp)"/>
  <rect x="25" y="-11" width="5" height="6" rx="2" fill="#fffbe6"/><rect x="25" y="5" width="5" height="6" rx="2" fill="#fffbe6"/>
  <circle cx="-28" cy="-8" r="7" fill="url(#cr-rd-tail)"/><circle cx="-28" cy="8" r="7" fill="url(#cr-rd-tail)"/>
  <rect x="-29" y="-11" width="3.5" height="6" rx="1.4" fill="#ff5a4d"/><rect x="-29" y="5" width="3.5" height="6" rx="1.4" fill="#ff5a4d"/>`;
// gradients only (no filters or blend modes), so the lights show in every browser
export const ROAD_DEFS = `<defs>
    <linearGradient id="cr-roadg" x1="0" x2="1"><stop offset="0" stop-color="#4641ff"/><stop offset=".35" stop-color="#f055dd"/><stop offset=".7" stop-color="#ff5600"/><stop offset="1" stop-color="#ffc002"/></linearGradient>
    <linearGradient id="cr-roadgv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4641ff"/><stop offset=".35" stop-color="#f055dd"/><stop offset=".7" stop-color="#ff5600"/><stop offset="1" stop-color="#ffc002"/></linearGradient>
    <linearGradient id="cr-rd-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#eeeef2"/><stop offset="1" stop-color="#c9c9d2"/></linearGradient>
    <linearGradient id="cr-rd-beam" x1="0" x2="1"><stop offset="0" stop-color="#fff3b8" stop-opacity=".7"/><stop offset=".45" stop-color="#fff3b8" stop-opacity=".25"/><stop offset="1" stop-color="#fff3b8" stop-opacity="0"/></linearGradient>
    <radialGradient id="cr-rd-lamp"><stop offset="0" stop-color="#fffbe6" stop-opacity=".95"/><stop offset=".35" stop-color="#ffe9a3" stop-opacity=".55"/><stop offset="1" stop-color="#ffe9a3" stop-opacity="0"/></radialGradient>
    <radialGradient id="cr-rd-tail"><stop offset="0" stop-color="#ff5a4d" stop-opacity=".85"/><stop offset="1" stop-color="#ff5a4d" stop-opacity="0"/></radialGradient>
    <radialGradient id="cr-rd-shadow"><stop offset=".55" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
    <radialGradient id="cr-rd-halo"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  </defs>`;

// one hidden <svg> holding the gradients, so any later <svg> on the page can use them
export function roadDefs() {
  if (document.getElementById("cr-defs")) return;
  const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  s.id = "cr-defs"; s.setAttribute("width", "0"); s.setAttribute("height", "0"); s.setAttribute("aria-hidden", "true");
  s.style.position = "absolute"; s.innerHTML = ROAD_DEFS; document.body.prepend(s);
}
// the car on its own, pointing right; scale and rotate it with the wrapping <g>
export const car = (x, y, deg = 0, scale = 1) => `<g class="cr-car" transform="translate(${x} ${y}) rotate(${deg}) scale(${scale})">${CAR}</g>`;
