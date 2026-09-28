import { HygieneKit } from "@/components/interactive/hygiene-kit";
import { fillParams, hygieneTools } from "@/lib/content";

import type { HygieneTool } from "@/lib/content";

/**
 * Envoltorio de servidor del kit de higiene: llena los {parametros} clínicos
 * (content/clinical-params.json) antes de pasar las herramientas al componente interactivo.
 */
export function HygieneKitGuide() {
  const tools: HygieneTool[] = hygieneTools.map((tool) => ({
    ...tool,
    purpose: fillParams(tool.purpose),
    steps: tool.steps.map(fillParams),
    when: tool.when && fillParams(tool.when),
    replace: tool.replace && fillParams(tool.replace),
    note: tool.note && fillParams(tool.note),
  }));

  return <HygieneKit tools={tools} />;
}
