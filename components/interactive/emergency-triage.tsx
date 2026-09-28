"use client";

import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import * as m from "motion/react-m";
import Link from "next/link";
import { useId, useState } from "react";

import { cn } from "@/lib/cn";
import { appliesTo, treatmentLabel, useTreatment } from "@/lib/treatment";
import { EMERGENCY_ICONS, URGENCY } from "@/lib/urgency";

import type { Emergency } from "@/lib/content";

export type TriageItem = Pick<
  Emergency,
  "id" | "title" | "urgency" | "icon" | "steps" | "note" | "treatments"
> & {
  whatsappUrl: string | null;
};

type EmergencyTriageProps = {
  items: TriageItem[];
  phoneUrl: string | null;
};

/**
 * Triage "¿Qué le pasó?": una opción abierta a la vez. Todas las respuestas están en el HTML
 * del servidor (paneles con `hidden`), así funcionan sin JavaScript y las indexa Google.
 */
export function EmergencyTriage({ items, phoneUrl }: EmergencyTriageProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();
  const treatment = useTreatment();
  const hiddenCount = items.filter((item) => !appliesTo(item.treatments, treatment)).length;

  return (
    <section aria-labelledby={`${baseId}-title`} className="my-10">
      <h2 id={`${baseId}-title`} className="text-3xl">
        ¿Qué le pasó?
      </h2>
      <p className="mt-1 text-ink-muted">Toque lo que le pasó para ver qué hacer.</p>
      {treatment && hiddenCount > 0 && (
        <p className="mt-2 text-base text-ink-muted">
          Mostrando lo que aplica a {treatmentLabel(treatment).toLowerCase()}.{" "}
          <Link href="/#tratamiento">Cambiar tratamiento</Link>
        </p>
      )}

      <ul className="mt-5 space-y-3">
        {items.map((item) => {
          const open = openId === item.id;
          const Icon = EMERGENCY_ICONS[item.icon];
          const urgency = URGENCY[item.urgency];
          const panelId = `${baseId}-${item.id}`;

          return (
            <li
              key={item.id}
              hidden={!appliesTo(item.treatments, treatment)}
              className={cn(
                "rounded-card border-2 border-ink bg-surface transition-shadow",
                open && "shadow-[var(--shadow-print)]",
              )}
            >
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex min-h-tap w-full items-center gap-3 p-3 text-left"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-brand-100">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={2.25} />
                </span>
                <span className="flex-1">
                  <span className="block text-lg leading-snug font-bold">{item.title}</span>
                  {!open && (
                    <span className="mt-0.5 flex items-center gap-1 text-sm font-bold text-ink-muted">
                      <urgency.Icon aria-hidden="true" className="size-4" />
                      {urgency.label}
                    </span>
                  )}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn("size-6 shrink-0 transition-transform", open && "rotate-180")}
                />
              </button>

              <div id={panelId} hidden={!open} className="px-4 pb-5">
                <m.div
                  key={open ? "open" : "closed"}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border-2 px-3 py-1 text-sm font-bold",
                      urgency.className,
                    )}
                  >
                    <urgency.Icon aria-hidden="true" className="size-4" />
                    {urgency.label}
                  </p>

                  <p className="mt-4 font-bold">Qué hacer en casa</p>
                  <ol className="mt-2 space-y-2">
                    {item.steps.map((step, index) => (
                      <li key={step} className="flex gap-3">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-canvas">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  {item.note && <p className="mt-3 text-ink-muted">{item.note}</p>}

                  {(item.whatsappUrl || phoneUrl) && (
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {item.whatsappUrl && (
                        <a
                          href={item.whatsappUrl}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="btn btn-primary"
                        >
                          <MessageCircle aria-hidden="true" className="size-5" />
                          Escribir a la clínica
                        </a>
                      )}
                      {phoneUrl && (
                        <a href={phoneUrl} className="btn btn-secondary">
                          <Phone aria-hidden="true" className="size-5" />
                          Llamar a la clínica
                        </a>
                      )}
                    </div>
                  )}
                </m.div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
