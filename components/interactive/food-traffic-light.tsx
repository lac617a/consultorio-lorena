"use client";

import { Droplet, Search, X } from "lucide-react";
import { useId, useMemo, useState } from "react";

import { cn } from "@/lib/cn";
import { normalize, VERDICT, VERDICT_ORDER } from "@/lib/food";

import type { Food } from "@/lib/content";

type Filter = Food["verdict"] | "todos" | "manchan";

const FILTERS: Array<{ id: Filter; label: string }> = [
  { id: "todos", label: "Todos" },
  ...VERDICT_ORDER.map((verdict) => ({ id: verdict, label: VERDICT[verdict].plural })),
  { id: "manchan", label: "Manchan" },
];

/**
 * Semáforo de alimentos con buscador ("¿Puedo comer esto?").
 * La lista completa se renderiza en el servidor; buscar y filtrar solo ocultan elementos.
 */
export function FoodTrafficLight({ foods }: { foods: Food[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("todos");
  const baseId = useId();

  const sorted = useMemo(
    () =>
      [...foods].sort(
        (a, b) => VERDICT_ORDER.indexOf(a.verdict) - VERDICT_ORDER.indexOf(b.verdict),
      ),
    [foods],
  );

  const needle = normalize(query);
  const visible = sorted.filter((food) => {
    if (needle && !normalize(food.name).includes(needle)) return false;
    if (filter === "manchan") return food.stains;
    if (filter !== "todos") return food.verdict === filter;
    return true;
  });

  function count(id: Filter) {
    if (id === "todos") return foods.length;
    if (id === "manchan") return foods.filter((food) => food.stains).length;
    return foods.filter((food) => food.verdict === id).length;
  }

  return (
    <section aria-labelledby={`${baseId}-title`} className="my-10">
      <h2 id={`${baseId}-title`} className="text-3xl">
        Busque un alimento
      </h2>

      <label htmlFor={`${baseId}-search`} className="sr-only">
        Nombre del alimento
      </label>
      <div className="relative mt-4">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2"
        />
        <input
          id={`${baseId}-search`}
          type="text"
          inputMode="search"
          enterKeyHint="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Por ejemplo: mazorca, maní, pizza"
          autoComplete="off"
          className="min-h-tap w-full rounded-2xl border-2 border-ink bg-surface py-3 pr-12 pl-12 text-lg placeholder:text-ink-muted focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Borrar búsqueda"
            className="absolute top-1/2 right-1 flex tap -translate-y-1/2 items-center justify-center rounded-full"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        )}
      </div>

      <div role="group" aria-label="Filtrar alimentos" className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
            className={cn(
              "min-h-tap rounded-full border-2 border-ink px-4 text-base font-bold transition-colors",
              filter === id ? "bg-ink text-canvas" : "bg-surface text-ink hover:bg-brand-50",
            )}
          >
            {label} <span className="font-normal">({count(id)})</span>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length === 1 ? "1 alimento" : `${visible.length} alimentos`}
      </p>

      <ul className="mt-6 space-y-3">
        {sorted.map((food) => {
          const shown = visible.includes(food);
          const verdict = VERDICT[food.verdict];
          return (
            <li key={food.id} hidden={!shown}>
              <article className="rounded-card border-2 border-ink bg-surface p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-xl">{food.name}</h3>
                  <p
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 px-3 py-0.5 text-sm font-bold",
                      verdict.className,
                    )}
                  >
                    <verdict.Icon aria-hidden="true" className="size-4" strokeWidth={2.5} />
                    {verdict.label}
                  </p>
                </div>
                <p className="mt-1 text-ink-muted">{food.reason}</p>
                {food.tip && (
                  <p className="mt-2 rounded-xl bg-canvas-deep px-3 py-2 text-base">
                    <strong>Consejo:</strong> {food.tip}
                  </p>
                )}
                {food.stains && (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700">
                    <Droplet aria-hidden="true" className="size-4" />
                    Mancha brackets estéticos y ligas claras
                  </p>
                )}
              </article>
            </li>
          );
        })}
      </ul>

      {visible.length === 0 && (
        <div className="mt-6 rounded-card border-2 border-dashed border-ink p-5">
          <p className="font-bold">No encontramos «{query}» en la lista.</p>
          <p className="mt-1 text-ink-muted">
            Como regla general, evite lo duro y lo pegajoso, y corte en trozos pequeños lo que tenga
            que morder. Si tiene dudas, pregunte en su clínica.
          </p>
        </div>
      )}
    </section>
  );
}
