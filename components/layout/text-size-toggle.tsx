"use client";

import { useSyncExternalStore } from "react";

import { cn } from "@/lib/cn";
import { writeStorage } from "@/lib/storage";

type TextSize = "normal" | "large";

const STORAGE_KEY = "text-size";
const CHANGE_EVENT = "ortoguia:text-size";

/**
 * Script en línea que aplica el tamaño guardado antes del primer pintado (evita saltos).
 * Debe coincidir con STORAGE_KEY y el prefijo de lib/storage.
 */
export const textSizeInitScript = `try{var v=JSON.parse(localStorage.getItem("ortoguia:${STORAGE_KEY}"));if(v==="large")document.documentElement.dataset.textSize="large"}catch(e){}`;

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

function getSnapshot(): TextSize {
  return document.documentElement.dataset.textSize === "large" ? "large" : "normal";
}

function getServerSnapshot(): TextSize {
  return "normal";
}

function applyTextSize(next: TextSize) {
  if (next === "large") document.documentElement.dataset.textSize = "large";
  else delete document.documentElement.dataset.textSize;
  writeStorage(STORAGE_KEY, next);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function TextSizeToggle() {
  const size = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div
      role="group"
      aria-label="Tamaño del texto"
      className="flex rounded-full border-2 border-ink bg-surface p-0.5"
    >
      {(["normal", "large"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => applyTextSize(option)}
          aria-pressed={size === option}
          aria-label={option === "normal" ? "Texto normal" : "Texto grande"}
          className={cn(
            "tap rounded-full px-3 font-bold transition-colors",
            size === option ? "bg-ink text-canvas" : "text-ink hover:bg-brand-50",
          )}
        >
          <span aria-hidden="true" className={option === "large" ? "text-lg" : "text-sm"}>
            {option === "normal" ? "A" : "A+"}
          </span>
        </button>
      ))}
    </div>
  );
}
