import { Clock, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { allPages, clinic } from "@/lib/content";
import { clinicAddressLine, clinicMapsUrl, clinicPhoneUrl } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="surface-dark">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-display text-3xl">{clinic.name}</p>
          <p className="max-w-sm text-ink-inverse-muted">
            Esta guía es educativa. No sustituye la consulta con su ortodoncista.
          </p>
        </div>

        <nav aria-label="Guías del pie de página">
          <p className="eyebrow">Guías</p>
          <ul className="mt-3 space-y-1">
            {allPages.map((page) => (
              <li key={page.slug}>
                <Link
                  href={page.url}
                  className="inline-flex min-h-tap items-center no-underline hover:underline"
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow">Contacto</p>
          <div className="mt-4 space-y-3 text-ink-inverse-muted">
            <p className="flex items-start gap-2">
              <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-white" />
              <span>
                {clinicAddressLine()}.{" "}
                <a href={clinicMapsUrl()} rel="noopener noreferrer" target="_blank">
                  Cómo llegar
                </a>
              </span>
            </p>
            {clinic.hours && (
              <p className="flex items-start gap-2">
                <Clock aria-hidden="true" className="mt-1 size-5 shrink-0 text-white" />
                {clinic.hours}
              </p>
            )}
            {clinic.phone && (
              <p className="flex items-start gap-2">
                <Phone aria-hidden="true" className="mt-1 size-5 shrink-0 text-white" />
                <a href={clinicPhoneUrl() ?? undefined}>{clinic.phone}</a>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-line-inverse">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-5 text-base text-ink-inverse-muted">
          <p>
            © {new Date().getFullYear()} {clinic.name}
          </p>
          <Link href="/creditos" className="inline-flex tap items-center">
            Créditos
          </Link>
        </div>
      </div>
    </footer>
  );
}
