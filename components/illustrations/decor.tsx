/**
 * Trazos decorativos finos (arcos y la "sonrisa" del logo), como los de la referencia.
 * Siempre decorativos (aria-hidden); toman el color de `currentColor`.
 */
type DecorProps = { className?: string };

/** Arco grande de línea fina, para envolver una ilustración o cruzar un bloque. */
export function ArcLine({ className }: DecorProps) {
  return (
    <svg viewBox="0 0 400 200" fill="none" aria-hidden="true" className={className}>
      <path
        d="M2 198 C 40 60, 140 4, 200 4 S 360 60, 398 198"
        stroke="currentColor"
        strokeWidth={1.25}
      />
    </svg>
  );
}

/** Curva de sonrisa, para cerrar un título. */
export function SmileCurve({ className }: DecorProps) {
  return (
    <svg viewBox="0 0 160 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4 4 C 40 22, 120 22, 156 4"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </svg>
  );
}
