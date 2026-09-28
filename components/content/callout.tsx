import { Info, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/cn";

import type { ReactNode } from "react";

const TONES = {
  info: {
    Icon: Info,
    label: "Importante",
    className: "bg-accent-50",
    iconClass: "text-accent-700",
  },
  warning: {
    Icon: TriangleAlert,
    label: "Atención",
    className: "bg-caution-soft",
    iconClass: "text-caution",
  },
} as const;

type CalloutProps = { tone?: keyof typeof TONES; children: ReactNode };

/** Nota destacada estilo "papel pegado". El tono se comunica con icono + etiqueta. */
export function Callout({ tone = "info", children }: CalloutProps) {
  const { Icon, label, className, iconClass } = TONES[tone];

  return (
    <div
      className={cn(
        "my-8 flex gap-3 rounded-card border-2 border-ink p-4 shadow-[var(--shadow-print)]",
        className,
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn("mt-1 size-6 shrink-0", iconClass)}
        strokeWidth={2.25}
      />
      <div>
        <p className="font-bold">{label}</p>
        <div className="[&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}
