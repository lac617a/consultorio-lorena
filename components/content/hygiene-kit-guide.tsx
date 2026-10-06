import { ArrowRight, ChevronDown, Clock, RefreshCw } from "lucide-react";
import Link from "next/link";

import { HygieneToolIllustration } from "@/components/illustrations/hygiene-tools";
import { fillParams, hygieneTools } from "@/lib/content";

import type { HygieneTool } from "@/lib/content";

/**
 * Herramientas del kit de higiene (PRD §5.4), en tarjetas fijas.
 * "Cómo se usa" va plegado (<details> nativo) para que la página no abrume;
 * el texto sigue en el HTML del servidor. Los {parametros} se llenan con clinical-params.json.
 */
export function HygieneKitGuide({ group }: { group: HygieneTool["group"] }) {
  const tools = hygieneTools.filter((tool) => tool.group === group);

  return (
    <ul className="my-6 grid list-none gap-4 pl-0 sm:grid-cols-2">
      {tools.map((tool) => (
        <li key={tool.id}>
          <ToolCard tool={tool} />
        </li>
      ))}
    </ul>
  );
}

function ToolCard({ tool }: { tool: HygieneTool }) {
  return (
    <article className="flex h-full flex-col rounded-card border-2 border-ink bg-surface p-4">
      <div className="flex items-center justify-center rounded-2xl bg-brand-50 px-3 py-4">
        <HygieneToolIllustration tool={tool.id} className="h-14 w-auto max-w-full" />
      </div>

      <h3 className="mt-4 mb-0 text-xl">{tool.name}</h3>
      <p className="mt-1 text-ink-muted">{fillParams(tool.purpose)}</p>

      {(tool.when || tool.replace) && (
        <dl className="mt-3 space-y-1 text-base">
          {tool.when && (
            <div>
              <dt className="inline font-bold">
                <Clock aria-hidden="true" className="mr-1.5 inline size-4 align-[-2px]" />
                Cuándo:
              </dt>{" "}
              <dd className="inline">{fillParams(tool.when)}</dd>
            </div>
          )}
          {tool.replace && (
            <div>
              <dt className="inline font-bold">
                <RefreshCw aria-hidden="true" className="mr-1.5 inline size-4 align-[-2px]" />
                Cámbielo:
              </dt>{" "}
              <dd className="inline">{fillParams(tool.replace)}</dd>
            </div>
          )}
        </dl>
      )}

      {tool.steps.length > 0 && (
        <details className="group mt-3">
          <summary className="inline-flex min-h-tap items-center gap-1 font-bold text-brand-700">
            Cómo se usa
            <ChevronDown
              aria-hidden="true"
              className="size-5 transition-transform group-open:rotate-180"
            />
          </summary>
          <ol className="mt-1 list-decimal space-y-1 pl-6 marker:font-bold">
            {tool.steps.map((step) => (
              <li key={step}>{fillParams(step)}</li>
            ))}
          </ol>
        </details>
      )}

      {tool.note && <p className="mt-3 text-base text-ink-muted">{fillParams(tool.note)}</p>}

      {tool.guide && (
        <Link
          href={tool.guide}
          className="mt-auto inline-flex min-h-tap items-center gap-1 pt-2 font-bold"
        >
          Vea cómo se usa en la guía
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      )}
    </article>
  );
}
