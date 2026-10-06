import { FILL, INK, OFFSET, STROKE } from "@/components/illustrations/style";

/**
 * Arcada superior de frente con brackets, arco y ligas.
 * Capas nombradas con data-part para el simulador de ligas (fase 2).
 * Ilustración clínica: cambios en la posición de brackets o arco requieren revisión clínica.
 */

const TEETH = [
  { width: 44, height: 78, lift: 0 }, // incisivo central
  { width: 36, height: 66, lift: 5 }, // incisivo lateral
  { width: 36, height: 72, lift: 9 }, // canino
  { width: 32, height: 60, lift: 15 }, // primer premolar
  { width: 29, height: 56, lift: 22 }, // segundo premolar
];

const CENTER_X = 200;
const GAP = 4;
const GUM_LINE = 52;
const BRACKET = 15;

type Tooth = { id: string; x: number; width: number; bottom: number; bracketY: number };

function buildTeeth(): Tooth[] {
  const teeth: Tooth[] = [];
  for (const side of [-1, 1] as const) {
    let offset = GAP / 2;
    TEETH.forEach((tooth, index) => {
      const x = side === 1 ? CENTER_X + offset : CENTER_X - offset - tooth.width;
      const bottom = GUM_LINE + tooth.height - tooth.lift;
      teeth.push({
        id: `${side === 1 ? "izq" : "der"}-${index + 1}`,
        x,
        width: tooth.width,
        bottom,
        bracketY: GUM_LINE + (bottom - GUM_LINE) * 0.48,
      });
      offset += tooth.width + GAP;
    });
  }
  // De izquierda a derecha en pantalla.
  return teeth.sort((a, b) => a.x - b.x);
}

const TEETH_LAYOUT = buildTeeth();
const FIRST = TEETH_LAYOUT[0];
const LAST = TEETH_LAYOUT[TEETH_LAYOUT.length - 1];

/** Encía con festón: baja entre dientes (papila) y sube sobre cada diente. */
const GUM_PATH = (() => {
  const left = FIRST.x - 14;
  const right = LAST.x + LAST.width + 14;
  let path = `M ${left} ${GUM_LINE - 34} L ${left} ${GUM_LINE + 4} L ${FIRST.x - GAP / 2} ${GUM_LINE + 8}`;
  for (const tooth of TEETH_LAYOUT) {
    const cx = tooth.x + tooth.width / 2;
    path += ` Q ${cx} ${GUM_LINE - 18} ${tooth.x + tooth.width + GAP / 2} ${GUM_LINE + 8}`;
  }
  return `${path} L ${right} ${GUM_LINE + 4} L ${right} ${GUM_LINE - 34} Q ${CENTER_X} ${GUM_LINE - 48} ${left} ${GUM_LINE - 34} Z`;
})();

const WIRE_PATH = (() => {
  const points = TEETH_LAYOUT.map((tooth) => [tooth.x + tooth.width / 2, tooth.bracketY]);
  const [first] = points;
  const last = points[points.length - 1];
  const through = points.map(([x, y]) => `L ${x} ${y}`).join(" ");
  return `M ${first[0] - 20} ${first[1] - 7} ${through} L ${last[0] + 20} ${last[1] - 7}`;
})();

type ArchWithBracesProps = {
  /** 10 colores de ligas, de izquierda a derecha en pantalla. */
  ligatureColors?: string[];
  /** Muestra etiquetas a mano: "bracket", "arco", "liga". */
  annotated?: boolean;
  className?: string;
  title?: string;
};

export function ArchWithBraces({
  ligatureColors,
  annotated = false,
  className,
  title = "Dientes de arriba con brackets, arco y ligas de colores",
}: ArchWithBracesProps) {
  const labelTooth = TEETH_LAYOUT[6];
  const labelX = labelTooth.x + labelTooth.width / 2;

  return (
    <svg
      viewBox={annotated ? "-24 -30 448 225" : "0 0 400 160"}
      className={className}
      role="img"
      aria-label={title}
    >
      <g data-part="teeth">
        {TEETH_LAYOUT.map((tooth) => (
          <rect
            key={`shadow-${tooth.id}`}
            x={tooth.x + OFFSET.x}
            y={GUM_LINE - 32 + OFFSET.y}
            width={tooth.width}
            height={tooth.bottom - GUM_LINE + 32}
            rx={tooth.width * 0.34}
            fill={FILL.toothShadow}
          />
        ))}
        {TEETH_LAYOUT.map((tooth) => (
          <rect
            key={tooth.id}
            data-part="tooth"
            data-tooth={tooth.id}
            x={tooth.x}
            y={GUM_LINE - 32}
            width={tooth.width}
            height={tooth.bottom - GUM_LINE + 32}
            rx={tooth.width * 0.34}
            fill={FILL.tooth}
            stroke={INK}
            strokeWidth={STROKE}
          />
        ))}
      </g>

      <path
        data-part="gum"
        d={GUM_PATH}
        fill={FILL.gum}
        stroke={INK}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />

      <g data-part="brackets">
        {TEETH_LAYOUT.map((tooth) => (
          <rect
            key={tooth.id}
            data-part="bracket"
            data-tooth={tooth.id}
            x={tooth.x + tooth.width / 2 - BRACKET / 2}
            y={tooth.bracketY - BRACKET / 2}
            width={BRACKET}
            height={BRACKET}
            rx={3.5}
            fill={FILL.metal}
            stroke={INK}
            strokeWidth={2}
          />
        ))}
      </g>

      <path
        data-part="archwire"
        d={WIRE_PATH}
        fill="none"
        stroke={INK}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g data-part="ligatures">
        {TEETH_LAYOUT.map((tooth, index) => {
          const cx = tooth.x + tooth.width / 2;
          return (
            <rect
              key={tooth.id}
              data-part="ligature"
              data-tooth={tooth.id}
              x={cx - BRACKET / 2 - 3.5}
              y={tooth.bracketY - BRACKET / 2 - 3.5}
              width={BRACKET + 7}
              height={BRACKET + 7}
              rx={8}
              fill="none"
              stroke={ligatureColors?.[index] ?? FILL.accent}
              strokeWidth={4.5}
            />
          );
        })}
      </g>

      {annotated && (
        <g data-part="labels" fontFamily="var(--font-display)" fontSize="17" fill={INK}>
          <text x={labelX - 22} y={-10}>
            bracket
          </text>
          <path
            d={`M ${labelX} -2 C ${labelX + 8} 30, ${labelX - 6} 60, ${labelX} ${labelTooth.bracketY - 13}`}
            fill="none"
            stroke={INK}
            strokeWidth={1.75}
            strokeLinecap="round"
          />
          <text x={FIRST.x - 8} y={FIRST.bottom + 44}>
            arco
          </text>
          <path
            d={`M ${FIRST.x + 12} ${FIRST.bottom + 28} C ${FIRST.x + 6} ${FIRST.bottom + 6}, ${FIRST.x - 8} ${FIRST.bracketY + 22}, ${FIRST.x - 10} ${FIRST.bracketY - 2}`}
            fill="none"
            stroke={INK}
            strokeWidth={1.75}
            strokeLinecap="round"
          />
          <text x={LAST.x - 36} y={LAST.bottom + 44}>
            liga
          </text>
          <path
            d={`M ${LAST.x - 12} ${LAST.bottom + 28} C ${LAST.x - 6} ${LAST.bottom + 6}, ${LAST.x + 6} ${LAST.bracketY + 26}, ${LAST.x + 8} ${LAST.bracketY + 13}`}
            fill="none"
            stroke={INK}
            strokeWidth={1.75}
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}
