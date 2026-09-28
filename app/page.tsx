import { ArrowRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ArchWithBraces } from "@/components/illustrations/arch-with-braces";
import { InterdentalBrush } from "@/components/illustrations/interdental-brush";
import { OrthodonticToothbrush } from "@/components/illustrations/orthodontic-toothbrush";
import { JsonLd } from "@/components/seo/json-ld";
import { allPages, clinic } from "@/lib/content";
import { dentistJsonLd, websiteJsonLd } from "@/lib/seo";
import { clinicAddressLine, clinicMapsUrl, clinicPhoneUrl, clinicWhatsappUrl } from "@/lib/site";
import logoFull from "@/public/brand/logo-full.png";

import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const HERO_LIGATURES = Array.from({ length: 10 }, (_, index) =>
  index % 2 === 0 ? "var(--color-brand-400)" : "var(--color-accent-300)",
);

/** Guías planeadas (fase 1 y 2): se muestran como "muy pronto" hasta que existan. */
const UPCOMING = [
  { title: "Cómo cepillarse con brackets", Illustration: OrthodonticToothbrush },
  { title: "Su kit de higiene", Illustration: InterdentalBrush },
  { title: "¿Puedo comer esto?" },
  { title: "Qué hacer si algo se rompe" },
  { title: "Elija el color de sus ligas" },
];

const pad = (value: number) => String(value).padStart(2, "0");

export default function HomePage() {
  const whatsappUrl = clinicWhatsappUrl();
  const phoneUrl = clinicPhoneUrl();

  return (
    <div className="space-y-16">
      <JsonLd data={[websiteJsonLd(), dentistJsonLd()]} />

      <section className="space-y-6 pt-2">
        <p className="sticker">Para pacientes con brackets</p>
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
          Todo lo que necesita para cuidar sus brackets: explicado con dibujos, en pasos cortos y
          sin letra pequeña.
        </p>
        <ArchWithBraces
          animated
          annotated
          ligatureColors={HERO_LIGATURES}
          className="mx-auto w-full max-w-lg"
        />
        {allPages[0] && (
          <Link href={allPages[0].url} className="btn btn-primary w-full text-lg sm:w-auto">
            Empiece por aquí
            <ArrowRight aria-hidden="true" className="size-5" />
          </Link>
        )}
      </section>

      <section aria-labelledby="guias" className="space-y-2">
        <h2 id="guias" className="text-3xl">
          Las guías
        </h2>
        <ol className="divide-y-2 divide-ink border-y-2 border-ink">
          {allPages.map((page, index) => (
            <li key={page.slug}>
              <Link
                href={page.url}
                className="group flex items-center gap-4 py-5 text-ink no-underline"
              >
                <span className="font-display text-4xl font-semibold text-brand-600">
                  {pad(index + 1)}
                </span>
                <span className="flex-1">
                  <span className="block font-display text-2xl font-semibold">{page.title}</span>
                  {page.lead && <span className="block text-base text-ink-muted">{page.lead}</span>}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-7 shrink-0 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
          {UPCOMING.map(({ title, Illustration }, index) => (
            <li key={title} className="flex items-center gap-4 py-5 text-ink-muted">
              <span className="font-display text-4xl font-semibold text-line">
                {pad(allPages.length + index + 1)}
              </span>
              <span className="flex-1">
                <span className="block font-display text-2xl font-semibold">{title}</span>
                <span className="text-sm font-bold">Muy pronto</span>
              </span>
              {Illustration && <Illustration className="hidden h-10 w-auto sm:block" />}
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="consultorio"
        className="rounded-card border-2 border-ink bg-surface p-5 shadow-[var(--shadow-print)]"
      >
        <h2 id="consultorio" className="text-2xl">
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
