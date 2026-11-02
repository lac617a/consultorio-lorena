import { DM_Serif_Display, Nunito_Sans } from "next/font/google";

import { QuickAccessBar } from "@/components/layout/quick-access-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { textSizeInitScript } from "@/components/layout/text-size-toggle";
import { site } from "@/lib/site";

import "./globals.css";

import type { Metadata, Viewport } from "next";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

/** Serif de títulos, en sintonía con la serif del logo COE Dental. */
const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
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
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className={`${nunito.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: textSizeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col pb-20 xl:pb-0">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido" className="w-full flex-1">
          {children}
        </main>
        <SiteFooter />
        <QuickAccessBar />
      </body>
    </html>
  );
}
