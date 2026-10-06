import { DoodleSparkle } from "@/components/illustrations/doodles";
import { FILL, INK, OFFSET, STROKE } from "@/components/illustrations/style";

import type { ReactNode } from "react";

/**
 * Ilustración de portada de cada guía (inicio y cabecera de la guía), estilo folleto:
 * contorno de tinta + relleno lavanda desplazado. viewBox común de 120 × 120.
 */
const outline = { stroke: INK, strokeWidth: STROKE, strokeLinejoin: "round" as const };
const shadow = (d: string) => (
  <path d={d} fill={FILL.toothShadow} transform={`translate(${OFFSET.x} ${OFFSET.y})`} />
);
const rays = { fill: "none", stroke: INK, strokeWidth: 2.5, strokeLinecap: "round" as const };

const TOOTH =
  "M38 24 C38 14 47 10 60 10 C73 10 82 14 82 24 L80 70 C79 92 71 106 60 106 C49 106 41 92 40 70 Z";
const APPLE =
  "M60 36 C48 26 22 28 22 60 C22 88 42 106 54 104 C58 103 62 103 66 104 C78 106 98 88 98 60 C98 28 72 26 60 36 Z";
const CUP = "M32 58 H88 L81 106 H39 Z";
const DOME = "M34 80 C34 52 44 38 60 38 C76 38 86 52 86 80 Z";

const ART: Record<string, { title: string; drawing: ReactNode }> = {
  "primeros-dias": {
    title: "Diente con bracket y rayitas de sensibilidad",
    drawing: (
      <>
        {shadow(TOOTH)}
        <path d={TOOTH} fill={FILL.tooth} {...outline} />
        <path d="M24 58 H96" stroke={INK} strokeWidth={3} strokeLinecap="round" />
        <rect
          x={51}
          y={49}
          width={18}
          height={18}
          rx={4}
          fill={FILL.metal}
          {...outline}
          strokeWidth={2}
        />
        <rect
          x={47}
          y={45}
          width={26}
          height={26}
          rx={9}
          fill="none"
          stroke={FILL.accent}
          strokeWidth={4.5}
        />
        <path
          d="M20 38 q-7 9 0 18 M12 34 q-9 13 0 26 M100 38 q7 9 0 18 M108 34 q9 13 0 26"
          {...rays}
        />
      </>
    ),
  },
  cepillado: {
    title: "Cepillo de ortodoncia con cerdas en forma de V",
    drawing: (
      <g transform="rotate(-35 60 60)">
        {shadow("M50 54 H110 a6 6 0 0 1 0 12 H50 Z")}
        <path d="M50 54 H110 a6 6 0 0 1 0 12 H50 Z" fill={FILL.accent} {...outline} />
        <rect x={6} y={52} width={50} height={15} rx={7.5} fill={FILL.soft} {...outline} />
        <g fill={FILL.tooth} stroke={INK} strokeWidth={2}>
          {[0, 1, 2, 3, 4].map((index) => {
            const height = 22 - Math.min(index, 4 - index) * 6;
            return (
              <rect
                key={index}
                x={10 + index * 9}
                y={52 - height}
                width={6}
                height={height}
                rx={2}
              />
            );
          })}
        </g>
      </g>
    ),
  },
  "kit-de-higiene": {
    title: "Vaso con un cepillo de dientes y un cepillo interdental",
    drawing: (
      <>
        <path d="M50 58 L38 18" stroke={INK} strokeWidth={7} strokeLinecap="round" />
        <path d="M50 58 L38 18" stroke={FILL.soft} strokeWidth={3} strokeLinecap="round" />
        <rect
          x={28}
          y={6}
          width={16}
          height={22}
          rx={5}
          fill={FILL.tooth}
          {...outline}
          transform="rotate(-16 36 17)"
        />
        <path d="M70 58 L84 22" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
        <path
          d="M80 22 L88 25 M81 18 L89 21 M82 14 L90 17 M83 10 L91 13"
          stroke={INK}
          strokeWidth={2}
          strokeLinecap="round"
        />
        {shadow(CUP)}
        <path d={CUP} fill={FILL.accent} {...outline} />
        <path d="M40 72 H80" {...rays} strokeWidth={2} />
      </>
    ),
  },
  alimentos: {
    title: "Manzana",
    drawing: (
      <>
        {shadow(APPLE)}
        <path d={APPLE} fill={FILL.accent} {...outline} />
        <path d="M60 36 C60 28 62 20 66 14" {...rays} />
        <path d="M66 24 C74 12 90 14 92 18 C86 28 74 30 66 24 Z" fill={FILL.soft} {...outline} />
        <path d="M36 58 C36 50 40 46 46 44" {...rays} stroke={FILL.tooth} strokeWidth={4} />
      </>
    ),
  },
  urgencias: {
    title: "Luz de alarma encendida",
    drawing: (
      <>
        {shadow(DOME)}
        <path d={DOME} fill={FILL.accent} {...outline} />
        <path d="M47 72 C47 60 51 52 57 48" {...rays} stroke={FILL.tooth} strokeWidth={4} />
        <rect x={26} y={80} width={68} height={16} rx={4} fill={FILL.tooth} {...outline} />
        <path d="M60 10 V24 M28 22 L37 32 M92 22 L83 32 M12 50 H24 M108 50 H96" {...rays} />
      </>
    ),
  },
};

/** `decorative`: junto a un texto que ya dice lo mismo (enlaces, tarjetas). */
type GuideArtProps = { slug: string; className?: string; decorative?: boolean };

export function GuideArt({ slug, className, decorative = false }: GuideArtProps) {
  const art = ART[slug];
  if (!art) return <DoodleSparkle className={className} />;

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": art.title })}
    >
      {art.drawing}
    </svg>
  );
}
