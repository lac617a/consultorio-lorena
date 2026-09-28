import { MessageCircle, Phone, Siren } from "lucide-react";

import { EmergencyTriage } from "@/components/interactive/emergency-triage";
import { clinic, emergencies } from "@/lib/content";
import { clinicPhoneUrl, clinicWhatsappUrl } from "@/lib/site";
import { EMERGENCY_LINE } from "@/lib/urgency";

import type { TriageItem } from "@/components/interactive/emergency-triage";

/**
 * Guía de urgencias (PRD §5.8): primero las emergencias médicas reales, luego el triage.
 * Los datos vienen de content/emergencies.json; los enlaces de contacto, de content/clinic.json.
 */
export function EmergencyGuide() {
  // En una emergencia médica real, primero el 123; la clínica también se entera por WhatsApp.
  const notifyClinicUrl = clinicWhatsappUrl(
    "Hola, soy paciente de ortodoncia. Tuve una emergencia y voy a urgencias.",
  );
  const medical = emergencies.filter((item) => item.urgency === "urgencias");
  const items: TriageItem[] = emergencies
    .filter((item) => item.urgency !== "urgencias")
    .map(({ id, title, urgency, icon, steps, note, whatsappMessage }) => ({
      id,
      title,
      urgency,
      icon,
      steps,
      note,
      whatsappUrl: whatsappMessage ? clinicWhatsappUrl(whatsappMessage) : null,
    }));

  return (
    <>
      {medical.map((item) => (
        <aside
          key={item.id}
          aria-labelledby={`alerta-${item.id}`}
          className="my-6 rounded-card border-2 border-stop bg-stop-soft p-4"
        >
          <p
            id={`alerta-${item.id}`}
            className="flex items-center gap-2 font-display text-xl font-semibold text-stop"
          >
            <Siren aria-hidden="true" className="size-6 shrink-0" strokeWidth={2.25} />
            ¿Es una emergencia médica?
          </p>
          {item.steps.map((step) => (
            <p key={step} className="mt-2 text-base text-ink">
              {step}
            </p>
          ))}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a
              href={`tel:${EMERGENCY_LINE}`}
              className="btn border-2 border-ink bg-stop text-white shadow-[0_4px_0_var(--color-ink)]"
            >
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
      ))}

      <EmergencyTriage items={items} phoneUrl={clinicPhoneUrl()} />

      {clinic.hours && (
        <p className="text-base text-ink-muted">Horario de la clínica: {clinic.hours}</p>
      )}
    </>
  );
}
