import { ChevronDown, MessageCircle, Phone, Siren } from "lucide-react";

import { clinic, emergencies } from "@/lib/content";
import { clinicPhoneUrl, clinicWhatsappUrl } from "@/lib/site";
import { EMERGENCY_ICONS, EMERGENCY_LINE, URGENCY } from "@/lib/urgency";

/**
 * Guía de urgencias (PRD §5.8). Datos de content/emergencies.json; contacto, de content/clinic.json.
 * Sin JavaScript: desplegables nativos (<details>), todo el texto en el HTML del servidor.
 */

/** Primero las emergencias médicas reales: llamar al 123. */
export function EmergencyAlert() {
  // En una emergencia médica real, primero el 123; la clínica también se entera por WhatsApp.
  const notifyClinicUrl = clinicWhatsappUrl(
    "Hola, soy paciente de ortodoncia. Tuve una emergencia y voy a urgencias.",
  );
  const medical = emergencies.filter((item) => item.urgency === "urgencias");

  return medical.map((item) => (
    <aside
      key={item.id}
      aria-labelledby={`alerta-${item.id}`}
      className="my-8 rounded-card border-2 border-stop bg-stop-soft p-5"
    >
      <p
        id={`alerta-${item.id}`}
        className="flex items-center gap-2 font-display text-2xl text-stop"
      >
        <Siren aria-hidden="true" className="size-7 shrink-0" strokeWidth={2.25} />
        ¿Es una emergencia médica?
      </p>
      {item.steps.map((step) => (
        <p key={step} className="mt-2 text-ink">
          {step}
        </p>
      ))}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <a href={`tel:${EMERGENCY_LINE}`} className="btn bg-stop text-white">
          <Phone aria-hidden="true" className="size-5" />
          Llamar al {EMERGENCY_LINE}
        </a>
        {notifyClinicUrl && (
          <a
            href={notifyClinicUrl}
            rel="noopener noreferrer"
            target="_blank"
            className="btn btn-secondary"
          >
            <MessageCircle aria-hidden="true" className="size-5" />
            Avisar a la clínica
          </a>
        )}
      </div>
    </aside>
  ));
}

/** "¿Qué le pasó?": un desplegable por problema, con qué hacer en casa y el nivel de urgencia. */
export function EmergencyGuide() {
  const phoneUrl = clinicPhoneUrl();
  const items = emergencies.filter((item) => item.urgency !== "urgencias");

  return (
    <>
      <ul className="my-6 list-none space-y-3 pl-0">
        {items.map((item) => {
          const Icon = EMERGENCY_ICONS[item.icon];
          const urgency = URGENCY[item.urgency];
          const whatsappUrl = item.whatsappMessage ? clinicWhatsappUrl(item.whatsappMessage) : null;

          return (
            <li key={item.id}>
              <details
                name="urgencias"
                className="group rounded-card border-2 border-ink bg-surface open:shadow-[var(--shadow-print)]"
              >
                <summary className="flex min-h-tap items-center gap-3 p-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-brand-100">
                    <Icon aria-hidden="true" className="size-6" strokeWidth={2.25} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-lg leading-snug font-bold">{item.title}</span>
                    <span
                      className={`mt-1 inline-flex items-center gap-1 rounded-full border-2 px-2 text-sm font-bold ${urgency.className}`}
                    >
                      <urgency.Icon aria-hidden="true" className="size-4" />
                      {urgency.label}
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className="size-6 shrink-0 transition-transform group-open:rotate-180"
                  />
                </summary>

                <div className="border-t-2 border-dashed border-line px-4 pt-3 pb-5">
                  <p className="font-bold">Qué hacer en casa</p>
                  <ol className="mt-2 list-decimal space-y-1.5 pl-6 marker:font-bold">
                    {item.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  {item.note && <p className="mt-3 text-ink-muted">{item.note}</p>}

                  {(whatsappUrl || phoneUrl) && (
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {whatsappUrl && (
                        <a
                          href={whatsappUrl}
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
                </div>
              </details>
            </li>
          );
        })}
      </ul>

      {clinic.hours && (
        <p className="text-base text-ink-muted">Horario de la clínica: {clinic.hours}</p>
      )}
    </>
  );
}
