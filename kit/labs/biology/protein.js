// Protein structure viewer: the four levels of structure on a small designed protein. Secondary structure is
// built from ideal geometry (α-helix: 3.6 residues per turn, 0.15 nm rise per residue, Cα radius 0.23 nm;
// β-strand: about 0.33 nm per residue), so this is an idealised model, not an experimentally determined
// structure. Colour by secondary structure or by side-chain property to see the hydrophobic core form.
// Real coordinates for thousands of proteins are freely available from the Protein Data Bank (CC0).
import { shell, seg, panel, challenges, esc, C } from "../lab.js";
import { stage3d, bond, mat, THREE } from "../three.js";
import { CLASS, CLASS_COL, FULL } from "./code.js";

// a helix–strand–strand–helix design: sequence and secondary-structure string (H helix, E strand, C coil)
export const SEQ = "MSKLEELLKKAEELGKTVKVEVNGKTYEVEVDPNKSAEELLKKLAELLG";
export const SS =  "CHHHHHHHHHHHHHCCEEEEEECCCEEEEEECCCCHHHHHHHHHHHHHC";

export function backbone() {
  // build segments one after another, each starting where the last ended
  const pts = []; let origin = new THREE.Vector3(-1.2, 0.6, 0), dir = new THREE.Vector3(1, 0, 0);
  let i = 0;
  while (i < SEQ.length) {
    const t = SS[i]; let j = i; while (j < SEQ.length && SS[j] === t) j++;
    const n = j - i;
    if (t === "H") { const axis = dir.clone(), up = Math.abs(axis.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0), u = new THREE.Vector3().crossVectors(axis, up).normalize(), v = new THREE.Vector3().crossVectors(axis, u);
      for (let k = 0; k < n; k++) { const a = (k * 2 * Math.PI) / 3.6; pts.push(origin.clone().addScaledVector(axis, k * 0.15).addScaledVector(u, 0.23 * Math.cos(a)).addScaledVector(v, 0.23 * Math.sin(a))); }
      origin = origin.clone().addScaledVector(axis, n * 0.15); }
    else if (t === "E") { const zig = new THREE.Vector3(0, 0, 1);
      for (let k = 0; k < n; k++) pts.push(origin.clone().addScaledVector(dir, k * 0.33).addScaledVector(zig, k % 2 ? 0.05 : -0.05));
      origin = origin.clone().addScaledVector(dir, n * 0.33); }
    else { // coil: turn back on itself, building the fold (two strands side by side, helices packing against them)
      const turn = new THREE.Vector3(0, -0.48, 0).applyAxisAngle(new THREE.Vector3(1, 0, 0), 0.15 * (i % 3));
      for (let k = 0; k < n; k++) pts.push(origin.clone().addScaledVector(turn, (k + 1) / (n + 1)).addScaledVector(dir, 0.18 * Math.sin((Math.PI * (k + 1)) / (n + 1))));
      origin = origin.clone().add(turn); if (i > 0) dir.multiplyScalar(-1); }
    i = j;
  }
  return pts;
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div>`);
  const S = stage3d($(".lab-stage"), { distance: 6.5, aspect: 0.8 }); S.spin = 0.2;
  const ctrl = $(".lab-ctrl"), info = panel(ctrl);
  let level = "secondary", colour = "ss";
  const st = { levels: new Set(), hydro: false };
  const ch = challenges(ctrl, ctx, [
    { id: "lv", text: "View all four levels of structure", test: (x) => x.levels.size >= 4 },
    { id: "hyd", text: "Colour by side chain and find where the hydrophobic (non-polar) residues sit", test: (x) => x.hydro },
  ]);
  const pts = backbone(), centre = pts.reduce((a, p) => a.add(p.clone()), new THREE.Vector3()).multiplyScalar(1 / pts.length);
  pts.forEach((p) => p.sub(centre));
  function build() {
    S.clear(); st.levels.add(level); if (colour === "aa") st.hydro = true; ch.check(st);
    const g = new THREE.Group(), ssCol = { H: 0xf06595, E: 0xfcc419, C: 0xadb5bd };
    const colOf = (i) => (colour === "ss" ? ssCol[SS[i]] : parseInt(CLASS_COL[CLASS[SEQ[i]]].slice(1), 16));
    if (level === "primary") {
      SEQ.split("").forEach((aa, i) => { const s = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 10), mat(THREE, colOf(i))); s.position.set(-3.6 + (i % 25) * 0.3, i < 25 ? 0.4 : -0.4, 0); g.add(s); if (i % 25) g.add(bond(THREE, g.children.at(-2).position, s.position, 0.04, mat(THREE, 0x868e96))); });
    } else {
      const copies = level === "quaternary" ? [[0, 0], [Math.PI, 2.2]] : [[0, 0]];
      for (const [rot, dx] of copies) {
        const sub = new THREE.Group();
        const curve = new THREE.CatmullRomCurve3(pts);
        if (level === "secondary" || level === "tertiary" || level === "quaternary") {
          for (let i = 0; i < pts.length - 1; i++) { const seg = new THREE.CatmullRomCurve3([pts[Math.max(0, i - 1)], pts[i], pts[i + 1], pts[Math.min(pts.length - 1, i + 2)]]); const tube = new THREE.Mesh(new THREE.TubeGeometry(seg, 6, SS[i] === "H" ? 0.12 : SS[i] === "E" ? 0.1 : 0.05, 8, false), mat(THREE, colOf(i))); sub.add(tube); }
        }
        if (level !== "secondary") pts.forEach((p, i) => { const s = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), mat(THREE, colOf(i))); s.position.copy(p); sub.add(s); });
        sub.rotation.y = rot; sub.position.x = dx - (level === "quaternary" ? 1.1 : 0); g.add(sub);
        void curve;
      }
    }
    S.root.add(g);
    const txt = {
      primary: "<b>Primary structure:</b> the sequence of amino acids, joined by peptide bonds, from the N-terminus to the C-terminus. It is encoded by the gene and determines every higher level.",
      secondary: "<b>Secondary structure:</b> regular local folding held by hydrogen bonds between backbone C=O and N–H groups: α-helices (pink, 3.6 residues per turn) and β-strands (yellow), which pair into β-sheets.",
      tertiary: "<b>Tertiary structure:</b> the overall 3D fold of one chain, stabilised by side-chain interactions: the hydrophobic effect (non-polar side chains buried inside), hydrogen bonds, ionic bonds and disulfide bridges.",
      quaternary: "<b>Quaternary structure:</b> two or more folded chains (subunits) held together, as in haemoglobin's four subunits. Only proteins with more than one chain have it.",
    }[level];
    info(`<p>${txt}</p><p class="lab-seq">${SEQ.split("").map((a, i) => `<i title="${FULL[a]}" style="background:${colour === "ss" ? ["#f0659544", "#fcc41944", "#adb5bd22"]["HEC".indexOf(SS[i])] : CLASS_COL[CLASS[a]] + "44"}">${a}</i>`).join("")}</p>
      <p class="lab-msg">${colour === "aa" ? `Colours: <span style="color:${CLASS_COL.np}">non-polar</span>, <span style="color:${CLASS_COL.p}">polar</span>, <span style="color:${CLASS_COL.neg}">acidic</span>, <span style="color:${CLASS_COL.pos}">basic</span>. In the helices, the non-polar residues repeat every 3–4 positions, so they line one face of each helix: the face that packs into the core.` : "Idealised geometry for teaching; real structures come from X-ray crystallography, cryo-electron microscopy and NMR, or prediction (AlphaFold)."}</p>`);
  }
  seg($(".top"), [["primary", "Primary"], ["secondary", "Secondary"], ["tertiary", "Tertiary"], ["quaternary", "Quaternary"]], level, (v) => { level = v; build(); });
  seg($(".top"), [["ss", "Colour by structure"], ["aa", "Colour by side chain"]], colour, (v) => { colour = v; build(); });
  build();
  return () => S.stop();
}
