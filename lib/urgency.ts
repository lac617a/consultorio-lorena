import {
  CalendarClock,
  CircleDashed,
  CircleOff,
  Frown,
  Link2Off,
  PhoneCall,
  ShieldAlert,
  Siren,
  Unlink,
  Zap,
} from "lucide-react";

import type { Emergency } from "@/lib/content";

/**
 * Niveles de urgencia del triage (PRD §5.8). Siempre se comunican con icono + texto,
 * nunca solo con color (WCAG 1.4.1).
 */
export const URGENCY = {
  "puede-esperar": {
    label: "Puede esperar a su cita",
    Icon: CalendarClock,
    className: "border-ok bg-ok-soft text-ok",
  },
  "llama-pronto": {
    label: "Llame pronto a su clínica",
    Icon: PhoneCall,
    className: "border-caution bg-caution-soft text-caution",
  },
  urgencias: {
    label: "Vaya a urgencias",
    Icon: Siren,
    className: "border-stop bg-stop-soft text-stop",
  },
} as const satisfies Record<Emergency["urgency"], unknown>;

export const EMERGENCY_ICONS = {
  wire: Zap,
  bracket: Unlink,
  band: CircleDashed,
  ligature: CircleOff,
  elastic: Link2Off,
  appliance: ShieldAlert,
  pain: Frown,
  medical: Siren,
} as const satisfies Record<Emergency["icon"], unknown>;

/** Línea única de emergencias de Colombia. */
export const EMERGENCY_LINE = "123";
