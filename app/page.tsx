import { ArrowRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";

import { ArchWithBraces } from "@/components/illustrations/arch-with-braces";
import { StartHere } from "@/components/interactive/start-here";
import { JsonLd } from "@/components/seo/json-ld";
import { allPages, clinic } from "@/lib/content";
import { dentistJsonLd, websiteJsonLd } from "@/lib/seo";
import { clinicAddressLine, clinicMapsUrl, clinicPhoneUrl, clinicWhatsappUrl } from "@/lib/site";
import logoFull from "@/public/brand/logo-full.png";

import type { GuideSummary, UpcomingGuide } from "@/components/interactive/start-here";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const HERO_LIGATURES = Array.from({ length: 10 }, (_, index) =>
  index % 2 === 0 ? "var(--color-brand-400)" : "var(--color-accent-300)",
);

/**
 * Guías planeadas (fase 2): se muestran como "muy pronto" hasta que exista su página,
 * filtradas según el tratamiento del paciente.
 */
const PLANNED: UpcomingGuide[] = [
  { slug: "ligas", title: "Elija el color de sus ligas", treatments: ["metalicos", "esteticos"] },
  {
    slug: "elasticos",
    title: "Cómo ponerse los elásticos",
    treatments: ["metalicos", "esteticos", "autoligables", "alineadores"],
  },
  { slug: "alineadores", title: "Cuidado de sus alineadores", treatments: ["alineadores"] },
  { slug: "retenedores", title: "Cuidado de su retenedor", treatments: ["retenedor"] },
  {
    slug: "citas",
    title: "Sus citas de control",
    treatments: ["metalicos", "esteticos", "autoligables", "alineadores"],
  },
  {
    slug: "deportes",
    title: "Deportes e instrumentos",
    treatments: ["metalicos", "esteticos", "autoligables", "alineadores", "retenedor"],
  },
  {
    slug: "mitos",
    title: "Mitos y preguntas frecuentes",
    treatments: ["metalicos", "esteticos", "autoligables", "alineadores", "retenedor"],
  },
];

const publishedSlugs = new Set(allPages.map((page) => page.slug));
const UPCOMING = PLANNED.filter((guide) => !publishedSlugs.has(guide.slug));

const GUIDES: GuideSummary[] = allPages.map(({ slug, url, title, lead, treatments }) => ({
  slug,
  url,
  title,
  lead,
  treatments,
}));

export default function HomePage() {
  const whatsappUrl = clinicWhatsappUrl();
  const phoneUrl = clinicPhoneUrl();

  return (
    <div className="space-y-16">
      <JsonLd data={[websiteJsonLd(), dentistJsonLd()]} />

      <section className="space-y-6 pt-2">
        <p className="sticker">Para pacientes de ortodoncia</p>
        <h1 className="text-5xl sm:text-6xl">
          Su ortodoncia,{" "}
          <span className="relative font-medium whitespace-nowrap text-brand-600 italic">
            paso a paso
            <svg
              aria-hidden="true"
              viewBox="0 0 200 12"
              preserveAspectRatio="none"
              className="absolute -bottom-2 left-0 h-3 w-full"
            >
              <path
                d="M2 8 C 40 2, 80 11, 120 6 S 180 3, 198 7"
                fill="none"
                stroke="var(--color-brand-400)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>
        <p className="max-w-xl text-xl text-ink-muted">
          Todo lo que necesita para cuidar su tratamiento: explicado con dibujos, en pasos cortos y
          sin letra pequeña.
        </p>
        <ArchWithBraces
          animated
          annotated
          ligatureColors={HERO_LIGATURES}
          className="mx-auto w-full max-w-lg"
        />
        <a href="#tratamiento" className="btn btn-primary w-full text-lg sm:w-auto">
          Empiece aquí
          <ArrowRight aria-hidden="true" className="size-5" />
        </a>
      </section>

      <StartHere guides={GUIDES} upcoming={UPCOMING} />

      <section
        aria-labelledby="clinica"
        className="rounded-card border-2 border-ink bg-surface p-5 shadow-[var(--shadow-print)]"
      >
        <h2 id="clinica" className="text-2xl">
          Su clínica
        </h2>
        <Image
          src={logoFull}
          alt={`${clinic.brandMark}: ${clinic.tagline}`}
          sizes="(min-width: 768px) 320px, 70vw"
          className="mx-auto my-5 h-auto w-4/5 max-w-xs"
        />
        <p className="font-bold">{clinic.name}</p>
        <ul className="mt-1 text-base text-ink-muted">
          {clinic.doctors.map((doctor) => (
            <li key={doctor.name}>
              {doctor.name} · {doctor.specialty}
            </li>
          ))}
        </ul>
        <p className="mt-2 flex items-start gap-2 text-ink-muted">
          <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-ink" />
          {clinicAddressLine()}
        </p>
        {clinic.hours && (
          <p className="mt-1 flex items-start gap-2 text-ink-muted">
            <Clock aria-hidden="true" className="mt-1 size-5 shrink-0 text-ink" />
            {clinic.hours}
          </p>
        )}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              rel="noopener noreferrer"
              target="_blank"
              className="btn btn-primary"
            >
              <MessageCircle aria-hidden="true" className="size-5" />
              Escribir por WhatsApp
            </a>
          )}
          {phoneUrl && (
            <a href={phoneUrl} className="btn btn-secondary">
              <Phone aria-hidden="true" className="size-5" />
              Llamar
            </a>
          )}
          <a
            href={clinicMapsUrl()}
            rel="noopener noreferrer"
            target="_blank"
            className="btn btn-secondary"
          >
            <MapPin aria-hidden="true" className="size-5" />
            Cómo llegar
          </a>
        </div>
      </section>
    </div>
  );
}
