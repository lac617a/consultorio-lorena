import { ArrowDown, ArrowRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ArchWithBraces } from "@/components/illustrations/arch-with-braces";
import {
  DoodleArrow,
  DoodleBurst,
  DoodleHatch,
  DoodleSparkle,
  DoodleStar,
  DoodleZigzag,
} from "@/components/illustrations/doodles";
import { GuideArt } from "@/components/illustrations/guide-art";
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
  index % 2 === 0 ? "var(--color-brand-400)" : "var(--color-brand-600)",
);

/**
 * Inicio tipo folleto: portada, "Le ayudamos", un panel por guía y los datos de la clínica.
 * Solo se mueven (parallax CSS) los garabatos y las ilustraciones; el texto queda quieto.
 */
export default function HomePage() {
  const whatsappUrl = clinicWhatsappUrl();
  const phoneUrl = clinicPhoneUrl();

  return (
    <>
      <JsonLd data={[websiteJsonLd(), dentistJsonLd()]} />

      <section className="container-page grid items-center gap-10 pt-10 pb-14 md:grid-cols-2 md:pt-16 md:pb-20">
        <div className="space-y-6">
          <p className="sticker">Para pacientes de ortodoncia</p>
          <h1 className="text-[2.6rem] sm:text-6xl">
            Su ortodoncia, <span className="marker">bien cuidada</span>
          </h1>
          <p className="max-w-md text-xl text-ink-muted">
            Lo esencial para cuidar su tratamiento, en pocas palabras y con dibujos.
          </p>
          <a href="#guias" className="btn btn-primary text-lg">
            Ver las guías
            <ArrowDown aria-hidden="true" className="size-5" />
          </a>
        </div>

        <div className="relative px-2 py-6">
          <DoodleStar className="parallax absolute top-0 right-2 size-12 [--parallax:3rem]" />
          <DoodleHatch className="parallax absolute -top-2 left-4 size-10 [--parallax:1.5rem]" />
          <DoodleSparkle className="parallax absolute right-8 bottom-0 size-10 [--parallax:-2rem]" />
          <div className="blob parallax [--blob-color:var(--color-brand-200)] [--parallax:1rem]">
            <ArchWithBraces annotated ligatureColors={HERO_LIGATURES} className="w-full max-w-md" />
          </div>
        </div>
      </section>

      <section className="panel-lavender border-y-2 border-ink">
        <div className="container-text relative py-16 text-center">
          <DoodleBurst className="parallax absolute top-6 left-4 size-12 -rotate-12 [--parallax:2rem]" />
          <DoodleSparkle className="parallax absolute right-6 bottom-10 size-9 [--parallax:-1.5rem]" />
          <p className="text-lg font-bold">¡Usted puede lograrlo!</p>
          <h2 className="mt-2 text-4xl sm:text-5xl">Le ayudamos</h2>
          <p className="mx-auto mt-5 max-w-md text-lg">
            Cuidar bien sus brackets en casa es parte del tratamiento. Aquí encuentra cómo
            cepillarse, qué comer y qué hacer si algo se rompe.
          </p>
          <DoodleZigzag className="mx-auto mt-8 h-4 w-28" />
        </div>
      </section>

      <section id="guias" aria-labelledby="guias-titulo" className="container-page py-16 md:py-20">
        <h2 id="guias-titulo" className="text-center text-4xl sm:text-5xl">
          <span className="marker">Sus guías</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-lg text-ink-muted">
          Elija un tema. Cada guía se lee en pocos minutos.
        </p>
        <DoodleArrow className="mx-auto mt-4 h-12 w-9" />

        <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-14">
          {allPages.map((page, index) => (
            <li
              key={page.slug}
              className="w-full max-w-sm sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
            >
              <article className="relative flex h-full flex-col items-center text-center">
                <div
                  className={`blob parallax size-40 ${index % 2 === 0 ? "[--parallax:1.25rem]" : "[--parallax:-1.25rem]"}`}
                >
                  <GuideArt slug={page.slug} decorative className="size-28" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-normal">
                  <Link
                    href={page.url}
                    className="marker text-ink no-underline after:absolute after:inset-0 after:content-['']"
                  >
                    {page.title}
                  </Link>
                </h3>
                {page.lead && <p className="mt-3 max-w-xs text-ink-muted">{page.lead}</p>}
                <span
                  aria-hidden="true"
                  className="mt-4 inline-flex items-center gap-1 font-bold text-brand-700"
                >
                  Leer la guía
                  <ArrowRight className="size-4" />
                </span>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="clinica" className="panel-lavender border-t-2 border-ink">
        <div className="container-page grid items-center gap-10 py-16 md:grid-cols-2 md:py-20">
          <div className="relative mx-auto w-full max-w-xs">
            <DoodleStar className="parallax absolute -top-8 -left-6 size-11 [--parallax:2rem]" />
            <DoodleSparkle className="parallax absolute -right-5 -bottom-6 size-10 [--parallax:-2rem]" />
            <div className="rounded-card border-2 border-ink bg-surface p-6 shadow-[var(--shadow-print)]">
              <Image
                src={logoFull}
                alt={`${clinic.brandMark}: ${clinic.tagline}`}
                sizes="(min-width: 768px) 320px, 70vw"
                className="mx-auto h-auto w-full"
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h2 id="clinica" className="text-4xl sm:text-5xl">
              Su clínica
            </h2>
            <p className="mt-4 font-bold">{clinic.name}</p>
            <ul className="mt-1 text-ink-muted">
              {clinic.doctors.map((doctor) => (
                <li key={doctor.name}>
                  {doctor.name} · {doctor.specialty}
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-start justify-center gap-2 text-left md:justify-start">
              <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0" />
              {clinicAddressLine()}
            </p>
            {clinic.hours && (
              <p className="mt-1 flex items-start justify-center gap-2 text-left md:justify-start">
                <Clock aria-hidden="true" className="mt-1 size-5 shrink-0" />
                {clinic.hours}
              </p>
            )}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
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
          </div>
        </div>
      </section>
    </>
  );
}
