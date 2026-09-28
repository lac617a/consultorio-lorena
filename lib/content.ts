import { clinic, clinicalParams, colors, emergencies, foods, hygieneTools, pages } from "@/.velite";

import type { Page } from "@/.velite";

export type {
  Clinic,
  ClinicalParams,
  Emergency,
  Food,
  HygieneTool,
  LigatureColor,
  Page,
} from "@/.velite";

export { clinic, clinicalParams, colors, emergencies, foods, hygieneTools };

export const allPages: Page[] = [...pages].sort((a, b) => a.order - b.order);

export function getPage(slug: string): Page | undefined {
  return pages.find((page) => page.slug === slug);
}

/**
 * Reemplaza {parametro} por su valor en clinical-params.json.
 * Velite ya valida que los nombres existan; aquí se falla también por seguridad.
 */
export function fillParams(text: string): string {
  return text.replace(/\{(\w+)\}/g, (_, name: string) => {
    if (!(name in clinicalParams)) throw new Error(`Parámetro clínico desconocido: {${name}}`);
    return String(clinicalParams[name as keyof typeof clinicalParams]);
  });
}
