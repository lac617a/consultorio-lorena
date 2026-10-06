import { Clock, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { clinic } from "@/lib/content";
import { clinicAddressLine, clinicMapsUrl, clinicPhoneUrl, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-canvas-deep">
      <div className="container-page space-y-6 py-10">
        <div className="space-y-2">
          <p className="font-display text-2xl">{clinic.name}</p>
          <p className="flex items-start gap-2 text-ink-muted">
            <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-ink" />
            <span>
              {clinicAddressLine()}.{" "}
              <a href={clinicMapsUrl()} rel="noopener noreferrer" target="_blank">
                Cómo llegar
              </a>
            </span>
          </p>
          {clinic.hours && (
            <p className="flex items-start gap-2 text-ink-muted">
              <Clock aria-hidden="true" className="mt-1 size-5 shrink-0 text-ink" />
              {clinic.hours}
            </p>
          )}
          {clinic.phone && (
            <p className="flex items-start gap-2 text-ink-muted">
              <Phone aria-hidden="true" className="mt-1 size-5 shrink-0 text-ink" />
              <a href={clinicPhoneUrl() ?? undefined}>{clinic.phone}</a>
            </p>
          )}
        </div>
        <p className="text-base text-ink-muted">
          {site.product} es una guía educativa. No sustituye la consulta con su ortodoncista.
        </p>
        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-base">
            <li>
              <Link href="/creditos" className="inline-flex tap items-center">
                Créditos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
