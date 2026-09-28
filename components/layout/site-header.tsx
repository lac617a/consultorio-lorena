import Link from "next/link";

import { TextSizeToggle } from "@/components/layout/text-size-toggle";
import { site } from "@/lib/site";

/** Cabecera. El logo del consultorio reemplaza al wordmark cuando llegue (decisión D6). */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-ink bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-2">
        <Link href="/" className="flex tap flex-col justify-center leading-tight no-underline">
          <span className="font-display text-xl font-semibold text-ink [font-variation-settings:'SOFT'_60]">
            {site.name}
          </span>
          <span className="text-sm font-bold text-brand-700">{site.product}</span>
        </Link>
        <TextSizeToggle />
      </div>
    </header>
  );
}
