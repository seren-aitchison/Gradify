import Link from "next/link";
import { ServiceWorker } from "./sw";
export default function Home() {
  return (
    <main className="ds-section">
      <span className="ds-eyebrow accent">Proof of concept</span>
      <h1 className="ds-hero">Your notes. <span className="ds-spectrum">A full course.</span></h1>
      <p className="ds-lead">This page is React, rendered at build time, styled by the same <b>--ds-*</b> tokens.</p>
      <div className="ds-actions"><Link className="ds-btn" href="/lawgradify/course/">Open the law course</Link><a className="ds-more" href="/privacy.html">Privacy</a></div>
      <ServiceWorker />
    </main>
  );
}
