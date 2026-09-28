"use client";

import { Pause, Play, RotateCcw, Timer } from "lucide-react";
import * as m from "motion/react-m";
import { useEffect, useId, useState } from "react";

import { Celebration } from "@/components/interactive/celebration";
import { cn } from "@/lib/cn";

/**
 * Cronómetro de cepillado: 2 minutos en total, unos 30 segundos por cuadrante
 * (AAO y BOS: mínimo 2 minutos; Oral-B: ~30 s por cuadrante. docs/content-research.md §1).
 */
const TOTAL_SECONDS = 120;
const QUADRANT_SECONDS = 30;

const QUADRANTS = [
  { id: "arriba-derecha", label: "Arriba, lado derecho", short: "Arriba der." },
  { id: "arriba-izquierda", label: "Arriba, lado izquierdo", short: "Arriba izq." },
  { id: "abajo-izquierda", label: "Abajo, lado izquierdo", short: "Abajo izq." },
  { id: "abajo-derecha", label: "Abajo, lado derecho", short: "Abajo der." },
] as const;

/**
 * Orden en pantalla del mini mapa de la boca (2 × 2), visto de frente:
 * el lado derecho del paciente queda a la izquierda de la pantalla.
 */
const GRID_ORDER = [0, 1, 3, 2];

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

export function BrushingTimer() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const headingId = useId();

  const done = elapsed >= TOTAL_SECONDS;
  const current = Math.min(Math.floor(elapsed / QUADRANT_SECONDS), QUADRANTS.length - 1);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      setElapsed((value) => {
        const next = value + 1;
        if (next >= TOTAL_SECONDS) setRunning(false);
        return Math.min(next, TOTAL_SECONDS);
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [running]);

  function reset() {
    setRunning(false);
    setElapsed(0);
  }

  const started = elapsed > 0;

  return (
    <section
      aria-labelledby={headingId}
      className="relative my-10 rounded-card border-2 border-ink bg-surface p-5 shadow-[var(--shadow-print)] sm:p-6"
    >
      <div className="flex items-center gap-2">
        <Timer aria-hidden="true" className="size-6" strokeWidth={2.25} />
        <h3 id={headingId} className="text-2xl">
          Cronómetro de 2 minutos
        </h3>
      </div>
      <p className="mt-1 text-base text-ink-muted">
        Cepille cada parte de la boca unos 30 segundos. El cronómetro le avisa cuándo cambiar.
      </p>

      {/* Anuncio para lectores de pantalla solo al cambiar de cuadrante o al terminar. */}
      <p className="sr-only" aria-live="polite">
        {done
          ? "Terminó: dos minutos completos."
          : running
            ? `Ahora: ${QUADRANTS[current].label}.`
            : ""}
      </p>

      {done ? (
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="relative flex flex-col items-center gap-2 py-8 text-center"
        >
          <Celebration />
          <p className="font-display text-5xl font-semibold text-brand-600">2:00</p>
          <p className="font-display text-2xl font-semibold">¡Listo! Dos minutos completos.</p>
        </m.div>
      ) : (
        <div className="mt-5 grid grid-cols-[auto_1fr] items-center gap-5">
          <div className="grid grid-cols-2 gap-1.5" aria-hidden="true">
            {GRID_ORDER.map((index) => {
              const finished = elapsed >= (index + 1) * QUADRANT_SECONDS;
              const active = started && index === current;
              return (
                <span
                  key={QUADRANTS[index].id}
                  className={cn(
                    "flex size-14 items-center justify-center border-2 border-ink text-xs font-bold transition-colors",
                    index === 0 && "rounded-tl-3xl",
                    index === 1 && "rounded-tr-3xl",
                    index === 3 && "rounded-bl-3xl",
                    index === 2 && "rounded-br-3xl",
                    active ? "bg-brand-400" : finished ? "bg-accent-200" : "bg-canvas",
                  )}
                >
                  {finished ? "✓" : ""}
                </span>
              );
            })}
          </div>
          <div>
            <p className="font-display text-6xl leading-none font-semibold tabular-nums">
              {formatTime(TOTAL_SECONDS - elapsed)}
            </p>
            <p className="mt-2 font-bold text-brand-700">
              {started ? QUADRANTS[current].label : "Empiece arriba, lado derecho"}
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 flex h-3 gap-1.5" aria-hidden="true">
        {QUADRANTS.map((quadrant, index) => {
          const fill = Math.min(
            Math.max((elapsed - index * QUADRANT_SECONDS) / QUADRANT_SECONDS, 0),
            1,
          );
          return (
            <span
              key={quadrant.id}
              className="relative flex-1 overflow-hidden rounded-full border-2 border-ink bg-canvas"
            >
              <span
                className="absolute inset-y-0 left-0 bg-brand-400 transition-[width] duration-1000 ease-linear"
                style={{ width: `${fill * 100}%` }}
              />
            </span>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {done ? (
          <button type="button" onClick={reset} className="btn btn-secondary col-span-2 px-3">
            <RotateCcw aria-hidden="true" className="size-5" />
            Otra vez
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={reset}
              className={cn("btn btn-secondary px-3", !started && "invisible")}
              aria-hidden={!started}
              tabIndex={started ? undefined : -1}
            >
              <RotateCcw aria-hidden="true" className="size-5" />
              Reiniciar
            </button>
            <button
              type="button"
              onClick={() => setRunning((value) => !value)}
              className="btn btn-primary px-3"
            >
              {running ? (
                <Pause aria-hidden="true" className="size-5" />
              ) : (
                <Play aria-hidden="true" className="size-5" />
              )}
              {running ? "Pausar" : started ? "Seguir" : "Empezar"}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
