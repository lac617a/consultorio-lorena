"use client";

import { Check } from "lucide-react";
import { useEffect, useId, useState } from "react";

import { cn } from "@/lib/cn";
import { readStorage, writeStorage } from "@/lib/storage";

type ChecklistProps = {
  /** Identificador estable para recordar lo marcado en este dispositivo. */
  id: string;
  title: string;
  items: string[];
};

/** Lista para marcar (kit de higiene, kit de emergencia). Se guarda solo en este dispositivo. */
export function Checklist({ id, title, items }: ChecklistProps) {
  const storageKey = `checklist:${id}`;
  const [checked, setChecked] = useState<string[]>([]);
  const headingId = useId();

  useEffect(() => {
    // localStorage solo existe en el navegador: se lee después de hidratar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChecked(readStorage<string[]>(storageKey, []));
  }, [storageKey]);

  function toggle(item: string) {
    const next = checked.includes(item)
      ? checked.filter((value) => value !== item)
      : [...checked, item];
    setChecked(next);
    writeStorage(storageKey, next);
  }

  return (
    <section
      aria-labelledby={headingId}
      className="my-10 rounded-card border-2 border-ink bg-surface p-5 shadow-[var(--shadow-print)]"
    >
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 id={headingId} className="text-2xl">
          {title}
        </h3>
        <p className="sticker">
          {checked.filter((item) => items.includes(item)).length} de {items.length}
        </p>
      </div>
      <ul className="space-y-1">
        {items.map((item) => {
          const isChecked = checked.includes(item);
          return (
            <li key={item}>
              <label className="flex tap cursor-pointer items-center gap-3 rounded-xl px-2 hover:bg-brand-50">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(item)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-lg border-2 border-ink peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus",
                    isChecked ? "bg-accent-300 text-ink" : "bg-canvas",
                  )}
                >
                  {isChecked && <Check className="size-5" strokeWidth={3} />}
                </span>
                <span className={cn(isChecked && "text-ink-muted line-through")}>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
