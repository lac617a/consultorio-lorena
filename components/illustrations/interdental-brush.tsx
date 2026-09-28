import { FILL, INK, OFFSET, STROKE } from "@/components/illustrations/style";

/**
 * Cepillo interdental: mango, alambre fino y cerdas en forma de cono.
 * Capas: handle, wire, bristles.
 */
type Props = { className?: string; title?: string };

const BRISTLES = Array.from({ length: 12 }, (_, index) => index);

export function InterdentalBrush({ className, title = "Cepillo interdental" }: Props) {
  return (
    <svg viewBox="0 0 240 80" className={className} role="img" aria-label={title}>
      <rect
        x={120 + OFFSET.x}
        y={33 + OFFSET.y}
        width="110"
        height="16"
        rx="8"
        fill={FILL.toothShadow}
      />
      <rect
        data-part="handle"
        x="120"
        y="33"
        width="110"
        height="16"
        rx="8"
        fill={FILL.soft}
        stroke={INK}
        strokeWidth={STROKE}
      />
      <path data-part="wire" d="M18 41 H121" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <g data-part="bristles" stroke={INK} strokeWidth="2" strokeLinecap="round">
        {BRISTLES.map((index) => {
          const x = 24 + index * 7.5;
          // Cono: cerdas más cortas en la punta.
          const half = 4 + index * 1.2;
          return <line key={index} x1={x} y1={41 - half} x2={x} y2={41 + half} />;
        })}
      </g>
    </svg>
  );
}
