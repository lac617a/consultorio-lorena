/**
 * Lenguaje de ilustración "cuaderno" (docs/design-references.md, dirección A):
 * contorno de tinta grueso + relleno plano desplazado, como una impresión mal registrada.
 * Colores por variable CSS: al cambiar la paleta del consultorio, cambian solas.
 */
export const INK = "var(--color-ink)";
export const STROKE = 2.5;
/** Desplazamiento del relleno "impreso" respecto al contorno. */
export const OFFSET = { x: 4, y: 4 };

export const FILL = {
  tooth: "var(--color-surface)",
  toothShadow: "var(--color-brand-100)",
  gum: "var(--color-gum)",
  metal: "var(--color-accent-200)",
  accent: "var(--color-brand-400)",
  soft: "var(--color-accent-300)",
};
