import { Atkinson_Hyperlegible_Next, Fraunces } from "next/font/google";

import { QuickAccessBar } from "@/components/layout/quick-access-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { textSizeInitScript } from "@/components/layout/text-size-toggle";
import { MotionProvider } from "@/components/providers/motion-provider";
import { site } from "@/lib/site";

import "./globals.css";

import type { Metadata, Viewport } from "next";

const atkinson = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  variable: "--font-atkinson",
  display: "swap",
  // Next no tiene métricas de esta fuente para ajustar el fallback; se usa la del sistema.
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.product} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.product} — ${site.name}`,
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
  // Solo producción se indexa (PRD §7 → SEO).
  robots: site.isProduction ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#fbf6ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-CO"
      className={`${atkinson.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: textSizeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col pb-24">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2"
        >
          Saltar al contenido
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="contenido" className="mx-auto w-full max-w-3xl flex-1 px-4 pt-6">
            {children}
          </main>
          <SiteFooter />
          <QuickAccessBar />
        </MotionProvider>
      </body>
    </html>
  );
}
