import { clinicalParams } from "@/lib/content";

import type { ClinicalParams } from "@/lib/content";

type ParamName = Exclude<keyof ClinicalParams, "status">;

/**
 * Inserta un parámetro clínico configurable en el texto (content/clinical-params.json).
 * Los valores en discusión entre fuentes nunca se escriben directo en el MDX.
 */
export function Param({ name }: { name: ParamName }) {
  return <>{String(clinicalParams[name])}</>;
}
