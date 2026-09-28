import { FILL, INK, OFFSET, STROKE } from "@/components/illustrations/style";

/**
 * Cepillo de ortodoncia (cerdas en V), de perfil.
 * Capas: handle, head, bristles (mechones exteriores largos, centrales cortos: la V que abraza el bracket).
 */
type Props = { className?: string; title?: string };

const TUFTS = [0, 1, 2, 3, 4, 5, 6, 7];
const HANDLE = "M86 46 C122 43 172 41 226 47 a7 7 0 0 1 0 13 C172 64 122 60 86 58 Z";

export function OrthodonticToothbrush({
  className,
  title = "Cepillo de ortodoncia con cerdas en forma de V",
}: Props) {
  return (
    <svg viewBox="0 0 240 80" className={className} role="img" aria-label={title}>
      <path d={HANDLE} fill={FILL.toothShadow} transform={`translate(${OFFSET.x} ${OFFSET.y})`} />
      <path
        data-part="handle"
        d={HANDLE}
        fill={FILL.accent}
        stroke={INK}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <rect
        data-part="head"
        x="12"
        y="42"
        width="80"
        height="17"
        rx="8.5"
        fill={FILL.soft}
        stroke={INK}
        strokeWidth={STROKE}
      />
      <g data-part="bristles" fill={FILL.tooth} stroke={INK} strokeWidth={2}>
        {TUFTS.map((index) => {
          const height = 26 - Math.min(index, 7 - index) * 4.5;
          return (
            <rect key={index} x={17 + index * 9} y={42 - height} width="6" height={height} rx="2" />
          );
        })}
      </g>
    </svg>
  );
}
