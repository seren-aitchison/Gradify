// Gradify Next.js proof of concept: static export, served by any static host (GitHub Pages today).
// trailingSlash: true so folder URLs (/lawgradify/course/) stay folders; postbuild.mjs writes the legacy .html files.
const TS = process.env.TS === "1";
export default { output: "export", trailingSlash: TS, images: { unoptimized: true }, reactStrictMode: true };
