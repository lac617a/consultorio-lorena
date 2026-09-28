"use client";

import { ArrowRight, Check, Clock, Plus, RefreshCw, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

import { HygieneToolIllustration } from "@/components/illustrations/hygiene-tools";
import { Celebration } from "@/components/interactive/celebration";
import { cn } from "@/lib/cn";
import { readStorage, writeStorage } from "@/lib/storage";

import type { HygieneTool } from "@/lib/content";

const STORAGE_KEY = "kit:owned";

/**
 * Kit de higiene (PRD §5.4) con mecánica de juego: el paciente marca "Lo tengo"
 * y completa su kit básico. Lo marcado se guarda solo en este dispositivo.
 */
export function HygieneKit({ tools }: { tools: HygieneTool[] }) {
  const [owned, setOwned] = useState<string[]>([]);
  const baseId = useId();

  useEffect(() => {
    // localStorage solo existe en el navegador: se lee después de hidratar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOwned(readStorage<string[]>(STORAGE_KEY, []));
  }, []);

  function toggle(id: string) {
    // Actualización funcional: varios toques seguidos no se pisan entre sí.
    setOwned((current) => {
      const next = current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id];
      writeStorage(STORAGE_KEY, next);
      return next;
    });
  }

  const basics = tools.filter((tool) => tool.group === "basico");
  const extras = tools.filter((tool) => tool.group === "extra");
  const ownedBasics = basics.filter((tool) => owned.includes(tool.id)).length;
  const complete = ownedBasics === basics.length;

  return (
    <div className="my-10 space-y-12">
      <section
        aria-labelledby={`${baseId}-progress`}
        className="relative rounded-card border-2 border-ink bg-surface p-5 shadow-[var(--shadow-print)]"
      >
        {complete && <Celebration key={ownedBasics} />}
        <h2 id={`${baseId}-progress`} className="text-2xl">
          {complete ? "¡Kit básico completo!" : "Arme su kit básico"}
        </h2>
        <p className="mt-1 text-base text-ink-muted" aria-live="polite">
          Tiene {ownedBasics} de {basics.length} básicos.
          {!complete && " Toque «Lo tengo» en cada uno que ya tenga."}
        </p>
        <div className="mt-4 flex items-center gap-2" aria-hidden="true">
          {basics.map((tool) => (
            <span
              key={tool.id}
              className={cn(
                "h-3 flex-1 rounded-full border-2 border-ink transition-colors",
                owned.includes(tool.id) ? "bg-accent-300" : "bg-canvas",
              )}
            />
          ))}
          <Star
            className={cn("size-6 shrink-0", complete ? "text-ink" : "text-line")}
            fill={complete ? "var(--color-sun)" : "none"}
            strokeWidth={2.25}
          />
        </div>
      </section>

      <ToolGroup
        id={`${baseId}-basico`}
        title="Lo básico"
        description="Lo que necesita todos los días."
        tools={basics}
        owned={owned}
        onToggle={toggle}
      />
      <ToolGroup
        id={`${baseId}-extra`}
        title="Ayudas extra"
        description="No son obligatorias. Sirven si le cuestan algunos rincones."
        tools={extras}
        owned={owned}
        onToggle={toggle}
      />
    </div>
  );
}

type ToolGroupProps = {
  id: string;
  title: string;
  description: string;
  tools: HygieneTool[];
  owned: string[];
  onToggle: (id: string) => void;
};

function ToolGroup({ id, title, description, tools, owned, onToggle }: ToolGroupProps) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-3xl">
        {title}
      </h2>
      <p className="mt-1 text-ink-muted">{description}</p>
      <ul className="mt-5 space-y-4">
        {tools.map((tool) => (
          <li key={tool.id}>
            <ToolCard tool={tool} isOwned={owned.includes(tool.id)} onToggle={onToggle} />
          </li>
        ))}
      </ul>
    </section>
  );
}

type ToolCardProps = { tool: HygieneTool; isOwned: boolean; onToggle: (id: string) => void };

function ToolCard({ tool, isOwned, onToggle }: ToolCardProps) {
  return (
    <article className="rounded-card border-2 border-ink bg-surface p-4">
      <div className="flex items-center justify-center rounded-2xl bg-canvas-deep px-3 py-4">
        <HygieneToolIllustration tool={tool.id} className="h-16 w-auto max-w-full" />
      </div>

      <h3 className="mt-4 text-2xl">{tool.name}</h3>
      <p className="mt-1 text-ink-muted">{tool.purpose}</p>

      {tool.steps.length > 0 && (
        <>
          <p className="mt-4 font-bold">Cómo se usa</p>
          <ol className="mt-2 space-y-2">
            {tool.steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-canvas">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </>
      )}

      {(tool.when || tool.replace) && (
        <dl className="mt-4 space-y-1 text-base">
          {tool.when && (
            <div>
              <dt className="inline font-bold">
                <Clock aria-hidden="true" className="mr-1.5 inline size-4 align-[-2px]" />
                Cuándo:
              </dt>{" "}
              <dd className="inline">{tool.when}</dd>
            </div>
          )}
          {tool.replace && (
            <div>
              <dt className="inline font-bold">
                <RefreshCw aria-hidden="true" className="mr-1.5 inline size-4 align-[-2px]" />
                Cámbielo:
              </dt>{" "}
              <dd className="inline">{tool.replace}</dd>
            </div>
          )}
        </dl>
      )}

      {tool.note && <p className="mt-3 text-base text-ink-muted italic">{tool.note}</p>}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          aria-pressed={isOwned}
          onClick={() => onToggle(tool.id)}
          className={cn(
            "btn px-4",
            isOwned ? "border-2 border-ink bg-accent-200 text-ink" : "btn-secondary",
          )}
        >
          {isOwned ? (
            <Check aria-hidden="true" className="size-5" strokeWidth={3} />
          ) : (
            <Plus aria-hidden="true" className="size-5" />
          )}
          {isOwned ? "Ya lo tengo" : "Lo tengo"}
        </button>
        {tool.guide && (
          <Link href={tool.guide} className="inline-flex min-h-tap items-center gap-1 font-bold">
            Vea cómo se usa
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        )}
      </div>
    </article>
  );
}
