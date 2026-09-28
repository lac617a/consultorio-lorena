import { Ban, CircleCheck, Scissors } from "lucide-react";

import type { Food } from "@/lib/content";

/**
 * Semáforo de alimentos (PRD §5.5). Siempre icono + texto, nunca solo color (WCAG 1.4.1).
 * Orden de presentación: primero lo que se evita, que es lo que el paciente más busca.
 */
export const VERDICT = {
  evitar: {
    label: "Evítelo",
    plural: "Evitar",
    Icon: Ban,
    className: "border-stop bg-stop-soft text-stop",
  },
  cuidado: {
    label: "Con cuidado",
    plural: "Con cuidado",
    Icon: Scissors,
    className: "border-caution bg-caution-soft text-caution",
  },
  si: {
    label: "Sí puede",
    plural: "Sí puede",
    Icon: CircleCheck,
    className: "border-ok bg-ok-soft text-ok",
  },
} as const satisfies Record<Food["verdict"], unknown>;

export const VERDICT_ORDER: Food["verdict"][] = ["evitar", "cuidado", "si"];

/** Normaliza para buscar sin tildes ni mayúsculas: "Maní" → "mani". */
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}
