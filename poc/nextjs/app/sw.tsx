"use client";
import { useEffect } from "react";
// the existing service worker, registered as kit/core/site.js does
export function ServiceWorker() { useEffect(() => { if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {}); }, []); return null; }
