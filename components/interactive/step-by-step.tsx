"use client";

import {
  ChevronLeft,
  ChevronRight,
  Circle,
  DropletOff,
  Hand,
  HandGrab,
  List,
  ListOrdered,
  PartyPopper,
  Pointer,
  RefreshCw,
  Star,
} from "lucide-react";
import * as m from "motion/react-m";
import { Children, isValidElement, useId, useState } from "react";

import { Celebration } from "@/components/interactive/celebration";
import { cn } from "@/lib/cn";

import type { ReactElement, ReactNode } from "react";

const ICONS = {
  hand: Hand,
  "droplet-off": DropletOff,
  pinch: HandGrab,
  circle: Circle,
  "hand-pointer": Pointer,
  refresh: RefreshCw,
} as const;

export type StepIcon = keyof typeof ICONS;

type StepProps = {
  title: string;
  icon?: StepIcon;
  /** Ilustración opcional (SVG) que se muestra sobre el texto del paso. */
  illustration?: ReactNode;
  children: ReactNode;
};

/**
 * Un paso dentro de <StepByStep>. No renderiza nada por sí solo:
 * StepByStep lee sus props para construir la secuencia.
 */
export function Step(_props: StepProps) {
  return null;
}

type StepByStepProps = {
  /** Nombre accesible de la secuencia, p. ej. "Cómo poner la cera de ortodoncia". */
  label: string;
  /** Mensaje al terminar todos los pasos. */
  doneMessage?: string;
  children: ReactNode;
};

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Secuencia de pasos navegable con Anterior/Siguiente e indicador "Paso X de Y".
 * Todos los pasos están en el HTML del servidor (SEO y sin JS); con JS se muestran de uno en uno.
 * Al terminar, celebra (mecánica de juego de la dirección de diseño A + B).
 */
export function StepByStep({
  label,
  doneMessage = "¡Muy bien! Ya conoces todos los pasos.",
  children,
}: StepByStepProps) {
  const steps = Children.toArray(children)
    .filter((child): child is ReactElement<StepProps> => isValidElement(child))
    .map((child) => child.props);

  const [current, setCurrent] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [done, setDone] = useState(false);
  const headingId = useId();

  const total = steps.length;
  const paged = !showAll && !done;

  function restart() {
    setDone(false);
    setCurrent(0);
  }

  return (
    <section
      aria-labelledby={headingId}
      className="relative my-10 rounded-card border-2 border-ink bg-surface p-5 shadow-[var(--shadow-print)] sm:p-6"
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <h3 id={headingId} className="text-2xl">
          {label}
        </h3>
        <button
          type="button"
          onClick={() => {
            setShowAll((value) => !value);
            setDone(false);
          }}
          aria-pressed={showAll}
          className="inline-flex tap shrink-0 items-center gap-1 rounded-full px-3 text-sm font-bold text-brand-700 hover:bg-brand-50"
        >
          {showAll ? (
            <ListOrdered aria-hidden="true" className="size-4" />
          ) : (
            <List aria-hidden="true" className="size-4" />
          )}
          {showAll ? "De uno en uno" : "Ver todos"}
        </button>
      </div>

      {paged && (
        <div className="mb-5 flex items-center gap-2" aria-hidden="true">
          {steps.map((step, index) => (
            <span
              key={step.title}
              className={cn(
                "h-3 flex-1 rounded-full border-2 border-ink transition-colors",
                index <= current ? "bg-brand-400" : "bg-canvas",
              )}
            />
          ))}
          <Star
            className={cn("size-6 shrink-0", current === total - 1 ? "text-ink" : "text-line")}
            fill={current === total - 1 ? "var(--color-sun)" : "none"}
            strokeWidth={2.25}
          />
        </div>
      )}

      {done ? (
        <m.div
          role="status"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="relative flex flex-col items-center gap-3 py-6 text-center"
        >
          <Celebration />
          <span className="flex size-16 items-center justify-center rounded-full border-2 border-ink bg-sun">
            <PartyPopper aria-hidden="true" className="size-8" strokeWidth={2.25} />
          </span>
          <p className="font-display text-2xl font-semibold [font-variation-settings:'SOFT'_60]">
            {doneMessage}
          </p>
        </m.div>
      ) : (
        <ol className="space-y-6">
          {steps.map((step, index) => {
            const visible = showAll || index === current;
            const Icon = step.icon ? ICONS[step.icon] : null;

            return (
              <li key={step.title} hidden={!visible}>
                <m.div
                  // Cambiar la key reinicia la animación de entrada en cada paso.
                  key={showAll ? `all-${index}` : `step-${current}`}
                  initial={{ opacity: 0, x: showAll ? 0 : 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <p className="flex items-baseline gap-2 font-display text-brand-600">
                    <span className="text-6xl leading-none font-semibold [font-variation-settings:'SOFT'_100]">
                      {pad(index + 1)}
                    </span>
                    <span className="text-lg text-ink-muted">/ {pad(total)}</span>
                    <span className="sr-only">
                      Paso {index + 1} de {total}
                    </span>
                    {Icon && (
                      <Icon
                        aria-hidden="true"
                        className="ml-auto size-8 self-center text-ink"
                        strokeWidth={2}
                      />
                    )}
                  </p>
                  {step.illustration && <div className="my-3">{step.illustration}</div>}
                  <p className="mt-2 font-display text-2xl font-semibold [font-variation-settings:'SOFT'_60]">
                    {step.title}
                  </p>
                  <div className="mt-1 text-ink-muted">{step.children}</div>
                </m.div>
              </li>
            );
          })}
        </ol>
      )}

      {!showAll && (
        <div className="mt-8 grid grid-cols-2 gap-3">
          {done ? (
            <button type="button" onClick={restart} className="btn btn-secondary col-start-2 px-3">
              <RefreshCw aria-hidden="true" className="size-5" />
              Repasar
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setCurrent((value) => value - 1)}
                className={cn("btn btn-secondary px-3", current === 0 && "invisible")}
                aria-hidden={current === 0}
                tabIndex={current === 0 ? -1 : undefined}
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
                Anterior
              </button>
              {current === total - 1 ? (
                <button
                  type="button"
                  onClick={() => setDone(true)}
                  className="btn btn-primary px-3"
                >
                  ¡Terminé!
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrent((value) => value + 1)}
                  className="btn btn-primary px-3"
                >
                  Siguiente
                  <ChevronRight aria-hidden="true" className="size-5" />
                </button>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
