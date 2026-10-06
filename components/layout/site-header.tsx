import Image from "next/image";
import Link from "next/link";

import { TextSizeToggle } from "@/components/layout/text-size-toggle";
import { clinic } from "@/lib/content";
import { site } from "@/lib/site";
import logoMark from "@/public/brand/logo-mark.png";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-ink bg-canvas/90 backdrop-blur">
      <div className="container-page flex items-center justify-between gap-4 py-2">
        <Link href="/" className="flex tap items-center gap-3 no-underline">
          <Image
            src={logoMark}
            alt={`${clinic.brandMark}, ${clinic.name}. Ir al inicio`}
            priority
            sizes="96px"
            className="h-11 w-auto"
          />
          <span className="border-l-2 border-ink pl-3 font-display text-base leading-tight text-ink">
            {site.product}
          </span>
        </Link>
        <TextSizeToggle />
      </div>
    </header>
  );
}
