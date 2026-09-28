"use client";

import * as m from "motion/react-m";

import { FILL, INK, OFFSET, STROKE } from "@/components/illustrations/style";

/**
 * Escenas de la técnica de cepillado con brackets (guía /cepillado).
 * Vista de perfil (diente superior, cara exterior a la derecha) para los ángulos del cepillo,
 * y vista de frente (dos dientes) para el cepillo interdental y el hilo dental.
 *
 * Ilustración clínica: ángulos y posiciones siguen docs/content-research.md §1–2
 * (45° hacia la encía, por encima y por debajo del bracket). Cambios requieren revisión clínica.
 *
 * Las animaciones se repiten pocas veces (< 5 s, WCAG 2.2.2) y respetan reduced motion.
 */

export type BrushingStep =
  "rinse" | "angle" | "above" | "below" | "interdental" | "floss" | "check";

const TITLES: Record<BrushingStep, string> = {
  rinse: "Agua enjuagando un diente con bracket",
  angle: "Cepillo inclinado a 45 grados hacia la línea de la encía",
  above: "Cepillo por encima del bracket, inclinado hacia abajo",
  below: "Cepillo por debajo del bracket, inclinado hacia arriba",
  interdental: "Cepillo interdental pasando por debajo del arco, entre dos brackets",
  floss: "Hilo dental pasado por debajo del arco y entre dos dientes",
  check: "Diente con bracket limpio y brillante",
};

/** Movimiento circular pequeño del cepillo, repetido pocas veces. */
const SCRUB = {
  animate: { x: [0, 2.5, 0, -2.5, 0], y: [0, -2.5, 0, 2.5, 0] },
  transition: { duration: 0.9, repeat: 4, ease: "linear" as const },
};

export function BrushingScene({ step, className }: { step: BrushingStep; className?: string }) {
  const front = step === "interdental" || step === "floss";

  return (
    <svg
      // Perfil: recorte centrado en la corona; la parte alta de la encía queda fuera de cuadro.
      viewBox={front ? "30 0 240 222" : "56 34 214 182"}
      className={className ?? "mx-auto w-full max-w-xs"}
      role="img"
      aria-label={TITLES[step]}
    >
      {front ? <FrontTeeth step={step} /> : <ProfileTooth step={step} />}
    </svg>
  );
}

/* ------------------------------------------------------------------ perfil */

const TOOTH_PATH =
  "M 118 10 C 112 70, 116 140, 150 206 C 158 204, 166 196, 172 186 C 186 150, 188 100, 180 10 Z";
/** Encía con el borde abrazando el cuello del diente por fuera (derecha) y por dentro (izquierda). */
const GUM_PATH =
  "M 0 0 H 320 V 30 C 262 32, 214 40, 192 58 C 186 63, 184 66, 183 70 C 160 76, 136 78, 116 75 C 104 64, 80 54, 0 50 Z";

/** Punta de las cerdas y ángulo (grados, sentido horario). */
const BRUSH_POSE = {
  angle: { x: 185, y: 71, rotate: 45 },
  above: { x: 191, y: 94, rotate: -45 },
  below: { x: 190, y: 134, rotate: 45 },
} as const;

function ProfileTooth({ step }: { step: BrushingStep }) {
  const pose = step in BRUSH_POSE ? BRUSH_POSE[step as keyof typeof BRUSH_POSE] : null;

  return (
    <g>
      <path
        d={TOOTH_PATH}
        fill={FILL.toothShadow}
        transform={`translate(${OFFSET.x} ${OFFSET.y})`}
      />
      <path data-part="tooth" d={TOOTH_PATH} fill={FILL.tooth} stroke={INK} strokeWidth={STROKE} />
      <path
        data-part="gum"
        d={GUM_PATH}
        fill={FILL.gum}
        stroke={INK}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />

      <g data-part="bracket">
        <rect
          x={181}
          y={100}
          width={19}
          height={26}
          rx={4}
          fill={FILL.metal}
          stroke={INK}
          strokeWidth={2}
        />
        <rect
          x={178}
          y={97}
          width={25}
          height={32}
          rx={8}
          fill="none"
          stroke={FILL.accent}
          strokeWidth={4}
        />
        <circle data-part="archwire" cx={192} cy={113} r={3.5} fill={INK} />
      </g>

      {step === "rinse" && <WaterDrops />}
      {step === "check" && <Sparkles />}
      {pose && <ToothbrushEndOn {...pose} />}
      {step === "angle" && (
        <g fontFamily="var(--font-display)" fontStyle="italic" fontSize="17" fill={INK}>
          <path
            d="M 236 72 A 30 30 0 0 0 227 51"
            fill="none"
            stroke={INK}
            strokeWidth={1.75}
            strokeLinecap="round"
          />
          <path d="M 206 72 H 248" stroke={INK} strokeWidth={1.25} strokeDasharray="3 3" />
          <text x={236} y={52}>
            45°
          </text>
        </g>
      )}
    </g>
  );
}

/**
 * Cepillo visto de punta: en el perfil del diente el mango corre a lo largo de la arcada,
 * así que solo se ven la cabeza y el mechón de cerdas. En coordenadas locales las cerdas
 * apuntan a -x con la punta en (0, 0).
 */
function ToothbrushEndOn({ x, y, rotate }: { x: number; y: number; rotate: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <m.g data-part="toothbrush" {...SCRUB}>
        <rect
          x={0}
          y={-8}
          width={18}
          height={16}
          rx={2}
          fill={FILL.tooth}
          stroke={INK}
          strokeWidth={2}
        />
        <g data-part="bristles" stroke={INK} strokeWidth={1.25}>
          {[-4, 0, 4].map((offset) => (
            <line key={offset} x1={2} y1={offset} x2={16} y2={offset} />
          ))}
        </g>
        <rect
          data-part="head"
          x={18}
          y={-11}
          width={13}
          height={22}
          rx={5}
          fill={FILL.soft}
          stroke={INK}
          strokeWidth={STROKE}
        />
      </m.g>
    </g>
  );
}

function WaterDrops() {
  const drops = [
    { x: 212, y: 60, delay: 0 },
    { x: 226, y: 96, delay: 0.3 },
    { x: 206, y: 132, delay: 0.6 },
  ];
  return (
    <g data-part="water">
      {drops.map((drop) => (
        <m.path
          key={drop.x}
          d={`M ${drop.x} ${drop.y} c -6 9, -8 14, 0 18 c 8 -4, 6 -9, 0 -18 Z`}
          fill="var(--color-accent-100)"
          stroke={INK}
          strokeWidth={2}
          animate={{ y: [0, 14], opacity: [1, 0] }}
          transition={{ duration: 1.1, repeat: 3, delay: drop.delay, ease: "easeIn" }}
        />
      ))}
    </g>
  );
}

function Sparkles() {
  const stars = [
    { x: 212, y: 84, size: 11 },
    { x: 150, y: 150, size: 8 },
    { x: 222, y: 142, size: 7 },
  ];
  return (
    <g
      data-part="sparkles"
      fill="var(--color-sun)"
      stroke={INK}
      strokeWidth={1.75}
      strokeLinejoin="round"
    >
      {stars.map((star, index) => (
        <m.path
          key={star.x}
          d={`M ${star.x} ${star.y - star.size} L ${star.x + star.size * 0.3} ${star.y - star.size * 0.3} L ${star.x + star.size} ${star.y} L ${star.x + star.size * 0.3} ${star.y + star.size * 0.3} L ${star.x} ${star.y + star.size} L ${star.x - star.size * 0.3} ${star.y + star.size * 0.3} L ${star.x - star.size} ${star.y} L ${star.x - star.size * 0.3} ${star.y - star.size * 0.3} Z`}
          animate={{ scale: [1, 1.35, 1] }}
          transition={{ duration: 0.8, repeat: 4, delay: index * 0.25 }}
          style={{ transformOrigin: `${star.x}px ${star.y}px` }}
        />
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------- frente */

const FRONT_TEETH = [
  { x: 64, width: 76 },
  { x: 150, width: 76 },
];
/** Festón: la encía sube sobre cada diente y baja en punta (papila) entre los dos. */
const FRONT_GUM =
  "M 20 0 H 280 V 38 C 262 42, 244 46, 230 50 Q 190 18 146 60 Q 102 18 60 50 C 46 46, 34 42, 20 38 Z";
const GAP_X = 145;
const WIRE_Y = 116;

function FrontTeeth({ step }: { step: BrushingStep }) {
  return (
    <g>
      {FRONT_TEETH.map((tooth) => (
        <rect
          key={`shadow-${tooth.x}`}
          x={tooth.x + OFFSET.x}
          y={10 + OFFSET.y}
          width={tooth.width}
          height={190}
          rx={26}
          fill={FILL.toothShadow}
        />
      ))}
      {FRONT_TEETH.map((tooth) => (
        <rect
          key={tooth.x}
          data-part="tooth"
          x={tooth.x}
          y={10}
          width={tooth.width}
          height={190}
          rx={26}
          fill={FILL.tooth}
          stroke={INK}
          strokeWidth={STROKE}
        />
      ))}
      <path
        data-part="gum"
        d={FRONT_GUM}
        fill={FILL.gum}
        stroke={INK}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />

      {FRONT_TEETH.map((tooth) => (
        <rect
          key={`bracket-${tooth.x}`}
          data-part="bracket"
          x={tooth.x + tooth.width / 2 - 14}
          y={WIRE_Y - 14}
          width={28}
          height={28}
          rx={5}
          fill={FILL.metal}
          stroke={INK}
          strokeWidth={2}
        />
      ))}

      {/* El cepillo y el hilo pasan por detrás del arco: se dibujan antes que él. */}
      {step === "interdental" ? <InterdentalInGap /> : <FlossInGap />}

      <path
        data-part="archwire"
        d={`M 30 ${WIRE_Y + 4} L 270 ${WIRE_Y + 4}`}
        stroke={INK}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      {FRONT_TEETH.map((tooth) => (
        <rect
          key={`ligature-${tooth.x}`}
          data-part="ligature"
          x={tooth.x + tooth.width / 2 - 18}
          y={WIRE_Y - 18}
          width={36}
          height={36}
          rx={11}
          fill="none"
          stroke={FILL.accent}
          strokeWidth={5}
        />
      ))}
    </g>
  );
}

function InterdentalInGap() {
  return (
    <m.g
      data-part="interdental-brush"
      animate={{ y: [0, -14, 0, 10, 0] }}
      transition={{ duration: 1.2, repeat: 3, ease: "easeInOut" }}
    >
      <path d={`M ${GAP_X} 88 V 176`} stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
      <g stroke={FILL.soft} strokeWidth={2.5} strokeLinecap="round">
        {Array.from({ length: 9 }, (_, index) => {
          const y = 92 + index * 5;
          const half = 4 + index * 0.9;
          return <line key={y} x1={GAP_X - half} y1={y} x2={GAP_X + half} y2={y} />;
        })}
      </g>
      <rect
        x={GAP_X - 8}
        y={176}
        width={16}
        height={40}
        rx={8}
        fill={FILL.soft}
        stroke={INK}
        strokeWidth={STROKE}
      />
    </m.g>
  );
}

function FlossInGap() {
  return (
    <m.g
      data-part="floss"
      animate={{ x: [0, -3, 3, 0] }}
      transition={{ duration: 0.8, repeat: 5, ease: "easeInOut" }}
    >
      <path
        d={`M ${GAP_X - 30} 70 C ${GAP_X - 6} 90, ${GAP_X} 100, ${GAP_X} 130 L ${GAP_X} 200`}
        fill="none"
        stroke={INK}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <path
        d={`M ${GAP_X - 30} 70 C ${GAP_X - 6} 90, ${GAP_X} 100, ${GAP_X} 130 L ${GAP_X} 200`}
        fill="none"
        stroke={FILL.tooth}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <ellipse
        data-part="threader"
        cx={GAP_X - 34}
        cy={64}
        rx={9}
        ry={13}
        fill="none"
        stroke={FILL.accent}
        strokeWidth={3}
        transform={`rotate(-40 ${GAP_X - 34} 64)`}
      />
    </m.g>
  );
}
