import { FILL, INK } from "@/components/illustrations/style";

/**
 * Garabatos decorativos del folleto: estrellas, destellos, rayitas y zigzag.
 * Siempre decorativos (aria-hidden). Para moverlos con el scroll, use la clase `parallax`.
 */
type DoodleProps = { className?: string };

const line = {
  fill: "none",
  stroke: INK,
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Estrella de cinco puntas, contorno a mano. */
export function DoodleStar({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path
        d="M24 4 L29.5 17.5 L44 18.5 L33 28 L36.5 42.5 L24 34.5 L11.5 42.5 L15 28 L4 18.5 L18.5 17.5 Z"
        {...line}
      />
    </svg>
  );
}

/** Destello de cuatro puntas, relleno lavanda. */
export function DoodleSparkle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path
        d="M24 3 C26 17, 31 22, 45 24 C31 26, 26 31, 24 45 C22 31, 17 26, 3 24 C17 22, 22 17, 24 3 Z"
        {...line}
        fill={FILL.soft}
      />
    </svg>
  );
}

/** Rayitas cruzadas, como el sombreado a mano del folleto. */
export function DoodleHatch({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path
        d="M10 14 L38 10 M8 24 L40 20 M10 34 L36 31 M16 6 L13 42 M26 5 L24 43 M36 7 L34 40"
        {...line}
      />
    </svg>
  );
}

/** Rayos de "brillo" alrededor de algo. */
export function DoodleBurst({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path d="M24 4 V14 M8 12 L15 19 M40 12 L33 19 M4 28 H13 M44 28 H35" {...line} />
    </svg>
  );
}

/** Zigzag para separar bloques. */
export function DoodleZigzag({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 16" aria-hidden="true" className={className}>
      <path
        d="M3 10 L12 4 L21 12 L30 4 L39 12 L48 4 L57 12 L66 4 L75 12 L84 4 L93 12 L102 4 L111 12 L117 7"
        {...line}
      />
    </svg>
  );
}

/** Flecha curva que invita a seguir bajando. */
export function DoodleArrow({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 64" aria-hidden="true" className={className}>
      <path d="M14 4 C34 14, 38 34, 24 56 M14 46 L24 57 L34 48" {...line} />
    </svg>
  );
}
