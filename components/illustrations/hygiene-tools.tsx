import { InterdentalBrush } from "@/components/illustrations/interdental-brush";
import { OrthodonticToothbrush } from "@/components/illustrations/orthodontic-toothbrush";
import { FILL, INK, OFFSET, STROKE } from "@/components/illustrations/style";

import type { HygieneTool } from "@/lib/content";
import type { ReactNode } from "react";

/**
 * Ilustraciones del kit de higiene, estilo cuaderno (contorno de tinta + relleno desplazado).
 * Todas comparten viewBox 240 × 80 para alinearse en las tarjetas.
 */
type ToolId = HygieneTool["id"];

const TITLES: Record<ToolId, string> = {
  "v-brush": "Cepillo de ortodoncia con cerdas en forma de V",
  "interdental-brush": "Cepillo interdental",
  threader: "Enhebrador de plástico con el hilo dental pasado por el lazo",
  toothpaste: "Tubo de crema dental con una porción del tamaño de una arveja",
  "single-tuft": "Cepillo unipenacho con un solo mechón de cerdas en punta",
  "electric-brush": "Cepillo eléctrico con cabezal redondo",
  "stiff-floss": "Hilo dental con punta rígida, tramo esponjoso y tramo de hilo normal",
  "water-flosser": "Irrigador bucal con depósito de agua, manguera y boquilla",
  mouthwash: "Frasco de enjuague bucal con su vasito medidor",
  "disclosing-tablets": "Tres pastillas reveladoras de placa",
};

const shadow = { fill: FILL.toothShadow, transform: `translate(${OFFSET.x} ${OFFSET.y})` };
const outline = { stroke: INK, strokeWidth: STROKE, strokeLinejoin: "round" as const };

/** Hilo dental: trazo blanco con contorno de tinta. */
function Floss({ d }: { d: string }) {
  return (
    <>
      <path d={d} fill="none" stroke={INK} strokeWidth={4.5} strokeLinecap="round" />
      <path d={d} fill="none" stroke={FILL.tooth} strokeWidth={1.75} strokeLinecap="round" />
    </>
  );
}

const DRAWINGS: Partial<Record<ToolId, ReactNode>> = {
  "single-tuft": (
    <>
      <path d="M86 46 C122 43 172 41 226 47 a7 7 0 0 1 0 13 C172 64 122 60 86 58 Z" {...shadow} />
      <path
        d="M86 46 C122 43 172 41 226 47 a7 7 0 0 1 0 13 C172 64 122 60 86 58 Z"
        fill={FILL.accent}
        {...outline}
      />
      <rect x={40} y={47} width={50} height={10} rx={5} fill={FILL.soft} {...outline} />
      <rect x={20} y={42} width={28} height={19} rx={8} fill={FILL.soft} {...outline} />
      <path d="M24 42 C24 30, 30 18, 34 11 C38 18, 44 30, 44 42 Z" fill={FILL.tooth} {...outline} />
      <path d="M34 16 V40 M29 26 L30 40 M39 26 L38 40" stroke={INK} strokeWidth={1.25} />
    </>
  ),
  "electric-brush": (
    <>
      <rect x={84} y={30} width={146} height={34} rx={17} {...shadow} />
      <rect x={84} y={30} width={146} height={34} rx={17} fill={FILL.accent} {...outline} />
      <circle cx={132} cy={47} r={7} fill={FILL.tooth} {...outline} />
      <rect x={44} y={42} width={44} height={10} rx={5} fill={FILL.tooth} {...outline} />
      <circle cx={32} cy={47} r={14} fill={FILL.soft} {...outline} />
      <g fill={FILL.tooth} stroke={INK} strokeWidth={1.5}>
        {[21, 27, 33, 39].map((x) => (
          <rect key={x} x={x} y={21} width={4.5} height={13} rx={1.5} />
        ))}
      </g>
    </>
  ),
  threader: (
    <>
      <path d="M12 40 H118" stroke={INK} strokeWidth={7} strokeLinecap="round" />
      <path d="M12 40 H118" stroke={FILL.soft} strokeWidth={3.5} strokeLinecap="round" />
      <ellipse cx={138} cy={40} rx={21} ry={14} fill="none" stroke={INK} strokeWidth={7} />
      <ellipse cx={138} cy={40} rx={21} ry={14} fill="none" stroke={FILL.soft} strokeWidth={3.5} />
      <Floss d="M126 40 C150 24, 176 58, 200 42 S 226 34, 232 40" />
    </>
  ),
  "stiff-floss": (
    <>
      <path d="M10 44 H72" stroke={INK} strokeWidth={8} strokeLinecap="round" />
      <path
        d="M10 44 H72"
        stroke="var(--color-accent-500)"
        strokeWidth={4.5}
        strokeLinecap="round"
      />
      <rect x={70} y={33} width={82} height={22} rx={11} {...shadow} />
      <rect x={70} y={33} width={82} height={22} rx={11} fill={FILL.soft} {...outline} />
      <g fill={INK}>
        {[84, 98, 112, 126, 140].map((x, index) => (
          <circle key={x} cx={x} cy={index % 2 === 0 ? 41 : 47} r={1.6} />
        ))}
      </g>
      <Floss d="M152 44 C174 34, 198 56, 232 42" />
    </>
  ),
  "water-flosser": (
    <>
      <rect x={160} y={14} width={66} height={60} rx={10} {...shadow} />
      <rect x={160} y={14} width={66} height={60} rx={10} fill={FILL.tooth} />
      <path d="M162 36 C178 29, 196 43, 224 34 V70 H162 Z" fill="var(--color-accent-100)" />
      <rect x={160} y={14} width={66} height={60} rx={10} fill="none" {...outline} />
      <path
        d="M160 62 C132 76, 122 62, 114 50"
        fill="none"
        stroke={INK}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <rect x={46} y={40} width={70} height={17} rx={8.5} fill={FILL.accent} {...outline} />
      <path d="M46 48 L18 40" stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <g stroke="var(--color-accent-500)" strokeWidth={2.5} strokeLinecap="round">
        <path d="M13 37 L5 34" />
        <path d="M13 41 L4 42" />
        <path d="M14 33 L8 27" />
      </g>
    </>
  ),
  toothpaste: (
    <>
      <path d="M40 30 L186 20 H198 V60 H186 L40 50 Z" {...shadow} />
      <path d="M40 30 L186 20 H198 V60 H186 L40 50 Z" fill={FILL.tooth} {...outline} />
      <path d="M90 33 L150 29 V51 L90 47 Z" fill="var(--color-brand-300)" />
      <path d="M190 22 V58 M194 22 V58" stroke={INK} strokeWidth={1.5} />
      <rect x={18} y={33} width={22} height={14} rx={3} fill={FILL.soft} {...outline} />
      <ellipse cx={11} cy={40} rx={8} ry={6.5} fill={FILL.tooth} {...outline} />
    </>
  ),
  mouthwash: (
    <>
      <rect x={96} y={24} width={48} height={52} rx={10} {...shadow} />
      <rect x={96} y={24} width={48} height={52} rx={10} fill={FILL.metal} {...outline} />
      <rect x={108} y={14} width={24} height={12} fill={FILL.metal} {...outline} />
      <rect x={104} y={4} width={32} height={12} rx={3} fill={FILL.accent} {...outline} />
      <rect
        x={104}
        y={40}
        width={32}
        height={20}
        rx={3}
        fill={FILL.tooth}
        stroke={INK}
        strokeWidth={1.5}
      />
      <path d="M160 50 H186 L182 76 H164 Z" fill={FILL.accent} {...outline} />
    </>
  ),
  "disclosing-tablets": (
    <>
      {[70, 102, 134].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={46} r={13} {...shadow} />
          <circle cx={cx} cy={46} r={13} fill="var(--color-plaque)" {...outline} />
          <path d={`M${cx - 8} 46 H${cx + 8}`} stroke={INK} strokeWidth={1.5} />
        </g>
      ))}
    </>
  ),
};

export function HygieneToolIllustration({ tool, className }: { tool: ToolId; className?: string }) {
  if (tool === "v-brush")
    return <OrthodonticToothbrush className={className} title={TITLES[tool]} />;
  if (tool === "interdental-brush")
    return <InterdentalBrush className={className} title={TITLES[tool]} />;

  return (
    <svg viewBox="0 0 240 80" className={className} role="img" aria-label={TITLES[tool]}>
      {DRAWINGS[tool]}
    </svg>
  );
}
