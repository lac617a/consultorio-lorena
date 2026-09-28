import { FILL, INK, OFFSET, STROKE } from "@/components/illustrations/style";

import type { Treatment } from "@/lib/treatment";
import type { ReactNode } from "react";

/**
 * Mini ilustración de cada tratamiento: un diente de frente con lo que lo distingue.
 * Decorativa (el nombre del tratamiento va en texto al lado).
 */
export function TreatmentIcon({
  treatment,
  className,
}: {
  treatment: Treatment;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 48 56" className={className} aria-hidden="true">
      <rect
        x={6 + OFFSET.x / 2}
        y={4 + OFFSET.y / 2}
        width={36}
        height={46}
        rx={12}
        fill={FILL.toothShadow}
      />
      <rect
        x={6}
        y={4}
        width={36}
        height={46}
        rx={12}
        fill={FILL.tooth}
        stroke={INK}
        strokeWidth={STROKE}
      />
      {DETAILS[treatment]}
    </svg>
  );
}

const WIRE = <path d="M0 27 H48" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />;

const DETAILS: Record<Treatment, ReactNode> = {
  metalicos: (
    <>
      <rect
        x={16}
        y={19}
        width={16}
        height={16}
        rx={3}
        fill={FILL.metal}
        stroke={INK}
        strokeWidth={2}
      />
      {WIRE}
      <rect
        x={13}
        y={16}
        width={22}
        height={22}
        rx={7}
        fill="none"
        stroke={FILL.accent}
        strokeWidth={3.5}
      />
    </>
  ),
  esteticos: (
    <>
      <rect
        x={16}
        y={19}
        width={16}
        height={16}
        rx={3}
        fill="var(--color-canvas-deep)"
        stroke={INK}
        strokeWidth={2}
        strokeDasharray="3 2"
      />
      {WIRE}
      <rect
        x={13}
        y={16}
        width={22}
        height={22}
        rx={7}
        fill="none"
        stroke="var(--color-brand-100)"
        strokeWidth={3.5}
      />
    </>
  ),
  autoligables: (
    <>
      <rect
        x={16}
        y={19}
        width={16}
        height={16}
        rx={3}
        fill={FILL.metal}
        stroke={INK}
        strokeWidth={2}
      />
      {WIRE}
      <rect
        x={18}
        y={21}
        width={12}
        height={5}
        rx={1.5}
        fill={FILL.accent}
        stroke={INK}
        strokeWidth={1.5}
      />
    </>
  ),
  alineadores: (
    <rect
      x={2.5}
      y={1}
      width={43}
      height={52}
      rx={15}
      fill="var(--color-accent-100)"
      fillOpacity={0.55}
      stroke="var(--color-accent-500)"
      strokeWidth={2.5}
    />
  ),
  retenedor: (
    <>
      <path
        d="M0 37 C12 32, 36 32, 48 37"
        fill="none"
        stroke={INK}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <circle cx={10} cy={34.5} r={3} fill="none" stroke={INK} strokeWidth={2} />
      <circle cx={38} cy={34.5} r={3} fill="none" stroke={INK} strokeWidth={2} />
    </>
  ),
};
