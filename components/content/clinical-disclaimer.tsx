import { Stethoscope } from "lucide-react";

/** Aviso clínico obligatorio en cada página de contenido (PRD §8). */
export function ClinicalDisclaimer() {
  return (
    <aside
      aria-label="Aviso importante"
      className="flex gap-3 rounded-card bg-canvas-deep p-4 text-base text-ink-muted"
    >
      <Stethoscope aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-ink" />
      <p>
        Esta información es educativa y no sustituye la consulta con su ortodoncista. Si tiene dolor
        intenso, sangrado, un alambre que lastima o un aparato suelto, contacte a su clínica.
      </p>
    </aside>
  );
}
