import type { ReactNode } from "react";
export const metadata = { title: "Gradify (Next.js proof of concept)" };
// The existing kit stylesheets and the theme boot script, loaded exactly as the static pages load them, from /kit/…
export default function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="/kit/core/theme-boot.js" />
        <link rel="stylesheet" href="/kit/styles/base.css" precedence="base" />
        <link rel="stylesheet" href="/kit/styles/system.css" precedence="base" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body>{children}</body>
    </html>
  );
}
