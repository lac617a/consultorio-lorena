import { useSyncExternalStore } from "react";

import { readStorage, writeStorage } from "@/lib/storage";

import type { Page } from "@/lib/content";

/**
 * Tratamiento del paciente ("Empieza aquí", PRD §5.1). Se guarda solo en este dispositivo
 * y personaliza qué guías y opciones se muestran. Sin elección se muestra todo.
 */
export type Treatment = Page["treatments"][number];

export const TREATMENTS: Array<{ id: Treatment; label: string; description: string }> = [
  {
    id: "metalicos",
    label: "Brackets metálicos",
    description: "Los brackets de metal, con ligas.",
  },
  {
    id: "esteticos",
    label: "Brackets estéticos",
    description: "Del color del diente o transparentes.",
  },
  {
    id: "autoligables",
    label: "Brackets autoligables",
    description: "Con una tapita que sujeta el arco, sin ligas.",
  },
  {
    id: "alineadores",
    label: "Alineadores transparentes",
    description: "Férulas que se quitan y se cambian por etapas.",
  },
  {
    id: "retenedor",
    label: "Ya terminé: uso retenedor",
    description: "Fijo o removible, para que los dientes no se muevan.",
  },
];

const STORAGE_KEY = "treatment";
const CHANGE_EVENT = "ortoguia:treatment";
const IDS = new Set<string>(TREATMENTS.map((treatment) => treatment.id));

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Treatment | null {
  const value = readStorage<string | null>(STORAGE_KEY, null);
  return value && IDS.has(value) ? (value as Treatment) : null;
}

/** En el servidor no hay preferencia: se renderiza todo (bueno para SEO y sin JavaScript). */
function getServerSnapshot(): Treatment | null {
  return null;
}

export function useTreatment(): Treatment | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setTreatment(treatment: Treatment | null) {
  writeStorage(STORAGE_KEY, treatment);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function treatmentLabel(treatment: Treatment): string {
  return TREATMENTS.find((item) => item.id === treatment)?.label ?? treatment;
}

/** ¿Aplica este contenido al tratamiento elegido? Sin elección, todo aplica. */
export function appliesTo(treatments: readonly Treatment[], treatment: Treatment | null): boolean {
  return treatment === null || treatments.includes(treatment);
}
