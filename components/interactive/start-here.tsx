"use client";

import { ArrowRight, Check, Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { TreatmentIcon } from "@/components/illustrations/treatment-icon";
import { cn } from "@/lib/cn";
import { appliesTo, setTreatment, TREATMENTS, treatmentLabel, useTreatment } from "@/lib/treatment";

import type { Treatment } from "@/lib/treatment";

export type GuideSummary = {
  slug: string;
  url: string;
  title: string;
  lead?: string;
  treatments: Treatment[];
};

export type UpcomingGuide = { slug: string; title: string; treatments: Treatment[] };

type StartHereProps = { guides: GuideSummary[]; upcoming: UpcomingGuide[] };

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * "Empieza aquí" (PRD §5.1): el paciente elige su tratamiento y el inicio muestra solo
 * las guías que le aplican. Sin elección (y en el HTML del servidor) se muestran todas.
 */
export function StartHere({ guides, upcoming }: StartHereProps) {
  const treatment = useTreatment();
  const [editing, setEditing] = useState(false);

  const visibleGuides = guides.filter((guide) => appliesTo(guide.treatments, treatment));
  const visibleUpcoming = upcoming.filter((guide) => appliesTo(guide.treatments, treatment));
  const showOptions = treatment === null || editing;
  // Se sugiere empezar por una guía de cuidado, no por Urgencias.
  const firstGuide = visibleGuides.find((guide) => guide.slug !== "urgencias");

  function choose(next: Treatment) {
    setTreatment(next);
    setEditing(false);
  }

  return (
    <>
      <section
        id="tratamiento"
        aria-labelledby="tratamiento-titulo"
        className="scroll-mt-24 rounded-card border-2 border-ink bg-surface p-5 shadow-[var(--shadow-print)]"
      >
        {showOptions ? (
          <>
            <h2 id="tratamiento-titulo" className="text-3xl">
              ¿Qué tratamiento tiene?
            </h2>
            <p className="mt-1 text-ink-muted">Así le mostramos solo lo que le sirve.</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {TREATMENTS.map((option) => {
                const selected = option.id === treatment;
                return (
                  <li key={option.id}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => choose(option.id)}
                      className={cn(
                        "flex min-h-tap w-full items-center gap-3 rounded-2xl border-2 border-ink p-3 text-left transition-colors",
                        selected ? "bg-brand-100" : "bg-canvas hover:bg-brand-50",
                      )}
                    >
                      <TreatmentIcon treatment={option.id} className="h-14 w-12 shrink-0" />
                      <span className="flex-1">
                        <span className="block leading-snug font-bold">{option.label}</span>
                        <span className="block text-sm text-ink-muted">{option.description}</span>
                      </span>
                      {selected && <Check aria-hidden="true" className="size-6 shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
            {treatment !== null && (
              <button
                type="button"
                onClick={() => {
                  setTreatment(null);
                  setEditing(false);
                }}
                className="mt-4 min-h-tap font-bold text-brand-700 underline underline-offset-3"
              >
                Prefiero ver todas las guías
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-wrap items-center gap-4">
            <TreatmentIcon treatment={treatment} className="h-16 w-14 shrink-0" />
            <div className="flex-1">
              <p id="tratamiento-titulo" className="text-sm font-bold text-ink-muted">
                Su tratamiento
              </p>
              <p className="font-display text-2xl font-semibold">{treatmentLabel(treatment)}</p>
            </div>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="btn btn-secondary px-4"
            >
              <Pencil aria-hidden="true" className="size-4" />
              Cambiar
            </button>
            {firstGuide && (
              <div className="w-full border-t-2 border-dashed border-line pt-4">
                <p className="text-base text-ink-muted">
                  Le sugerimos empezar por <strong className="text-ink">{firstGuide.title}</strong>.
                </p>
                <Link href={firstGuide.url} className="btn btn-primary mt-3 w-full sm:w-auto">
                  Empezar la guía
                  <ArrowRight aria-hidden="true" className="size-5" />
                </Link>
              </div>
            )}
          </div>
        )}
      </section>

      <section aria-labelledby="guias" className="space-y-2">
        <h2 id="guias" className="text-3xl">
          {treatment ? "Sus guías" : "Las guías"}
        </h2>
        {treatment && (
          <p className="text-ink-muted">Para {treatmentLabel(treatment).toLowerCase()}.</p>
        )}
        <ol className="mt-4 divide-y-2 divide-ink border-y-2 border-ink">
          {guides.map((guide) => {
            const index = visibleGuides.indexOf(guide);
            return (
              <li key={guide.slug} hidden={index === -1}>
                <Link
                  href={guide.url}
                  className="group flex items-center gap-4 py-5 text-ink no-underline"
                >
                  <span className="font-display text-4xl font-semibold text-brand-600">
                    {pad(index + 1)}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-2xl font-semibold">{guide.title}</span>
                    {guide.lead && (
                      <span className="block text-base text-ink-muted">{guide.lead}</span>
                    )}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-7 shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </li>
            );
          })}
          {upcoming.map((guide) => {
            const index = visibleUpcoming.indexOf(guide);
            return (
              <li
                key={guide.slug}
                hidden={index === -1}
                className="flex items-center gap-4 py-5 text-ink-muted"
              >
                <span className="font-display text-4xl font-semibold text-line">
                  {pad(visibleGuides.length + index + 1)}
                </span>
                <span className="flex-1">
                  <span className="block font-display text-2xl font-semibold">{guide.title}</span>
                  <span className="text-sm font-bold">Muy pronto</span>
                </span>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}
