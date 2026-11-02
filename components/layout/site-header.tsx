import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { TextSizeToggle } from "@/components/layout/text-size-toggle";
import { allPages, clinic } from "@/lib/content";
import { clinicWhatsappUrl, site } from "@/lib/site";
import logoMark from "@/public/brand/logo-mark.png";

/** Navegación de escritorio con nombres cortos (en el celular, la barra de abajo). */
const NAV = [
  { href: "/primeros-dias", label: "Primeros días" },
  { href: "/cepillado", label: "Cepillado" },
  { href: "/kit-de-higiene", label: "Kit de higiene" },
  { href: "/alimentos", label: "Alimentos" },
  { href: "/urgencias", label: "Urgencias" },
];

export function SiteHeader() {
  const whatsappUrl = clinicWhatsappUrl();
  const published = new Set(allPages.map((page) => page.url));
  const nav = NAV.filter((item) => published.has(item.href));

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="container-page flex items-center justify-between gap-4 py-2">
        <Link href="/" className="flex tap shrink-0 items-center gap-3 no-underline">
          <Image
            src={logoMark}
            alt={`${clinic.brandMark}, ${clinic.name}. Ir al inicio`}
            priority
            sizes="96px"
            className="h-10 w-auto"
          />
          <span className="hidden border-l border-line pl-3 text-sm leading-tight font-bold whitespace-nowrap text-ink-muted sm:block xl:hidden 2xl:block">
            {site.product}
          </span>
        </Link>

        <nav aria-label="Guías" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex tap items-center rounded-full px-3 text-base font-semibold whitespace-nowrap no-underline hover:bg-canvas-soft"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <TextSizeToggle />
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              rel="noopener noreferrer"
              target="_blank"
              className="btn btn-secondary hidden md:inline-flex"
            >
              <MessageCircle aria-hidden="true" className="size-5" />
              Escribir a la clínica
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
