import {
  ArrowDown,
  ArrowUpRight,
  BookOpenCheck,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Siren,
  Smartphone,
  Type,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ArchWithBraces } from "@/components/illustrations/arch-with-braces";
import { ArcLine, SmileCurve } from "@/components/illustrations/decor";
import { GuideArt } from "@/components/illustrations/guide-art";
import { JsonLd } from "@/components/seo/json-ld";
import { cn } from "@/lib/cn";
import { allPages, clinic } from "@/lib/content";
import { dentistJsonLd, websiteJsonLd } from "@/lib/seo";
import { clinicAddressLine, clinicMapsUrl, clinicPhoneUrl, clinicWhatsappUrl } from "@/lib/site";
import { EMERGENCY_LINE } from "@/lib/urgency";
import logoFull from "@/public/brand/logo-full.png";

import type { Page } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const HERO_LIGATURES = Array.from({ length: 10 }, (_, index) =>
  index % 2 === 0 ? "var(--color-brand-400)" : "var(--color-ink)",
);

/** Guías planeadas (fase 2): se listan como "Próximamente" hasta que exista su página. */
const PLANNED = [
  { slug: "ligas", title: "Colores de ligas" },
  { slug: "elasticos", title: "Elásticos" },
  { slug: "alineadores", title: "Alineadores" },
  { slug: "retenedores", title: "Retenedores" },
  { slug: "citas", title: "Citas de control" },
  { slug: "deportes", title: "Deportes e instrumentos" },
  { slug: "mitos", title: "Mitos y preguntas" },
];

const publishedSlugs = new Set(allPages.map((page) => page.slug));
const UPCOMING = PLANNED.filter((guide) => !publishedSlugs.has(guide.slug));

/** Datos clave de las guías (mismas cifras y fuentes que el MDX; ver docs/content-research.md). */
const KEY_FACTS = [
  {
    value: "2 min",
    text: "Cepíllese durante al menos 2 minutos cada vez.",
    href: "/cepillado",
    link: "Cómo cepillarse",
  },
  {
    value: "3 a 5 días",
    text: "Es normal sentir molestias al principio y después de cada cita de control.",
    href: "/primeros-dias",
    link: "Primeros días",
  },
  {
    value: "1 vez al día",
    text: "Limpie bajo el arco con cepillo interdental e hilo dental, como mínimo.",
    href: "/kit-de-higiene",
    link: "Su kit de higiene",
  },
  {
    value: EMERGENCY_LINE,
    text: "Línea de emergencias, solo si tiene sangrado que no para, un golpe fuerte o dificultad para respirar.",
    href: "/urgencias",
    link: "Qué hacer en una urgencia",
  },
];

const FEATURES = [
  {
    Icon: Smartphone,
    title: "En su celular",
    text: "Ábrala desde el código QR de la clínica, sin registrarse ni descargar nada.",
  },
  {
    Icon: Type,
    title: "Letra grande",
    text: "Toque A+ en la parte de arriba para agrandar el texto.",
  },
  {
    Icon: BookOpenCheck,
    title: "Fuentes confiables",
    text: "Basada en guías de asociaciones de ortodoncia como la AAO y la BOS.",
  },
  {
    Icon: MessageCircle,
    title: "Su clínica, cerca",
    text: "Si tiene una duda o algo se rompe, escríbanos por WhatsApp.",
  },
];

/**
 * Inicio: portada oscura, presentación, las guías como protagonistas, datos para recordar,
 * cómo usar la guía y los datos de la clínica. Dirección visual D10 (docs/design-references.md).
 */
export default function HomePage() {
  const whatsappUrl = clinicWhatsappUrl();
  const phoneUrl = clinicPhoneUrl();

  return (
    <>
      <JsonLd data={[websiteJsonLd(), dentistJsonLd()]} />

      <section className="container-page pt-3 sm:pt-5">
        <div className="surface-dark relative isolate overflow-hidden rounded-[var(--radius-panel)] px-6 pt-12 pb-10 sm:px-10 md:grid md:grid-cols-[1.1fr_1fr] md:items-center md:gap-12 md:px-14 md:py-20">
          <ArcLine className="pointer-events-none absolute -bottom-10 left-1/2 -z-10 w-[160%] max-w-none -translate-x-1/2 text-white/20 md:-bottom-24 md:w-[95%]" />
          <div>
            <p className="eyebrow">Guía para pacientes de ortodoncia</p>
            <h1 className="mt-4 text-[2.75rem] italic sm:text-6xl lg:text-7xl">
              Su ortodoncia, <span className="text-brand-300">bien cuidada</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-ink-inverse-muted">
              Lo esencial para cuidar sus brackets en casa: cómo cepillarse, qué comer y qué hacer
              si algo se rompe.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#guias" className="btn btn-light">
                Ver las guías
                <ArrowDown aria-hidden="true" className="size-5" />
              </a>
              <Link href="/urgencias" className="btn btn-outline-light">
                <Siren aria-hidden="true" className="size-5" />
                Tengo una urgencia
              </Link>
            </div>
          </div>
          <div className="mt-12 md:mt-0">
            <div className="parallax rounded-[1.75rem] bg-white px-4 py-6 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.5)] [--parallax:1.25rem] sm:px-8">
              <ArchWithBraces annotated ligatureColors={HERO_LIGATURES} className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-text py-16 text-center sm:py-24">
        <h2 className="text-4xl sm:text-5xl">Lo que necesita saber, explicado con calma</h2>
        <SmileCurve className="mx-auto mt-5 h-5 w-36 text-brand-400" />
        <p className="mt-6 text-lg text-ink-muted">
          Guías cortas, con dibujos y en palabras sencillas, preparadas por su clínica para
          acompañarle entre cita y cita. Léalas en su celular cuando las necesite.
        </p>
      </section>

      <section id="guias" aria-labelledby="guias-titulo" className="container-page pb-16 sm:pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Guías</p>
            <h2 id="guias-titulo" className="mt-2 text-4xl sm:text-5xl">
              Sus guías de cuidado
            </h2>
            <p className="mt-3 max-w-lg text-lg text-ink-muted">
              Empiece por los primeros días y vuelva a las demás cuando las necesite.
            </p>
          </div>
        </div>

        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {allPages.map((page, index) => (
            <li key={page.slug} className={cn(index === 0 && "md:col-span-2")}>
              <GuideCard page={page} number={index + 1} featured={index === 0} />
            </li>
          ))}
        </ol>

        {UPCOMING.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-2">
            <p className="mr-2 font-bold">Próximamente:</p>
            {UPCOMING.map((guide) => (
              <span
                key={guide.slug}
                className="rounded-full border border-line px-4 py-1.5 text-base text-ink-muted"
              >
                {guide.title}
              </span>
            ))}
          </div>
        )}
      </section>

      <section aria-labelledby="recordar" className="container-page pb-16 sm:pb-24">
        <div className="surface-dark rounded-[var(--radius-panel)] px-6 py-12 sm:px-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <p className="eyebrow">Para recordar</p>
              <h2 id="recordar" className="mt-3 text-4xl sm:text-5xl">
                Cuatro datos que conviene tener presentes
              </h2>
            </div>
            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {KEY_FACTS.map((fact) => (
                <li key={fact.value} className="border-t border-line-inverse pt-5">
                  <p className="font-display text-5xl text-brand-300">{fact.value}</p>
                  <p className="mt-3 text-ink-inverse-muted">{fact.text}</p>
                  <Link
                    href={fact.href}
                    className="mt-3 inline-flex min-h-tap items-center gap-1 font-bold"
                  >
                    {fact.link}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="como-usar" className="container-page pb-16 sm:pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <p className="eyebrow">Cómo usarla</p>
            <h2 id="como-usar" className="mt-3 text-4xl sm:text-5xl">
              Pensada para usted
            </h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map(({ Icon, title, text }) => (
              <li key={title} className="card-soft p-6">
                <span className="grid size-12 place-items-center rounded-2xl bg-white">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-lg">{title}</h3>
                <p className="mt-1 text-ink-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="clinica" className="bg-canvas-soft py-16 sm:py-24">
        <div className="container-page grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="rounded-[var(--radius-panel)] bg-white p-8 shadow-[var(--shadow-soft)] sm:p-12">
            <Image
              src={logoFull}
              alt={`${clinic.brandMark}: ${clinic.tagline}`}
              sizes="(min-width: 768px) 480px, 90vw"
              className="mx-auto h-auto w-full max-w-sm"
            />
          </div>

          <div>
            <p className="eyebrow">Su clínica</p>
            <h2 id="clinica" className="mt-3 text-4xl sm:text-5xl">
              Estamos para ayudarle
            </h2>
            <p className="mt-5 text-lg font-bold">{clinic.name}</p>
            <ul className="mt-1 text-ink-muted">
              {clinic.doctors.map((doctor) => (
                <li key={doctor.name}>
                  {doctor.name} · {doctor.specialty}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-start gap-2">
              <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0" />
              {clinicAddressLine()}
            </p>
            {clinic.hours && (
              <p className="mt-1 flex items-start gap-2">
                <Clock aria-hidden="true" className="mt-1 size-5 shrink-0" />
                {clinic.hours}
              </p>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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

type GuideCardProps = { page: Page; number: number; featured: boolean };

/** Tarjeta de guía: toda la tarjeta es el enlace (enlace estirado sobre el título). */
function GuideCard({ page, number, featured }: GuideCardProps) {
  return (
    <article
      className={cn(
        "card-soft group relative flex h-full flex-col p-6 transition-shadow hover:shadow-[var(--shadow-soft)] sm:p-8",
        featured && "md:flex-row md:items-center md:gap-10",
      )}
    >
      <div
        className={cn(
          "grid place-items-center rounded-[1.25rem] bg-white py-6",
          featured ? "md:order-2 md:w-2/5 md:py-10" : "mb-6",
        )}
      >
        <GuideArt
          slug={page.slug}
          decorative
          className={cn("parallax size-24 [--parallax:0.75rem]", featured && "md:size-36")}
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-3">
          <span className="font-display text-xl text-brand-600">
            {String(number).padStart(2, "0")}
          </span>
          {featured && (
            <span className="rounded-full bg-ink px-3 py-0.5 text-sm font-bold text-white">
              Empiece aquí
            </span>
          )}
        </div>
        <h3
          className={cn("mt-3 text-xl", featured && "md:font-display md:text-4xl md:font-normal")}
        >
          <Link
            href={page.url}
            className="no-underline after:absolute after:inset-0 after:rounded-[var(--radius-card)] after:content-['']"
          >
            {page.title}
          </Link>
        </h3>
        {page.lead && <p className="mt-2 text-ink-muted">{page.lead}</p>}
        <span aria-hidden="true" className="mt-auto inline-flex items-center gap-2 pt-6 font-bold">
          <span className="grid size-10 place-items-center rounded-full border border-ink/25 bg-white transition-colors group-hover:bg-ink group-hover:text-white">
            <ArrowUpRight className="size-5" />
          </span>
          Leer la guía
        </span>
      </div>
    </article>
  );
}
