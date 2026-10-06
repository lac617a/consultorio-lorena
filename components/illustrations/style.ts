/**
 * Lenguaje de ilustración "folleto" (docs/design-references.md):
 * contorno de tinta grueso + relleno plano desplazado, en azul lavanda.
 * Colores por variable CSS: al cambiar la paleta, cambian solas.
 */
export const INK = "var(--color-ink)";
export const STROKE = 2.5;
/** Desplazamiento del relleno "impreso" respecto al contorno. */
export const OFFSET = { x: 4, y: 4 };

export const FILL = {
  tooth: "var(--color-surface)",
  toothShadow: "var(--color-brand-200)",
  gum: "var(--color-gum)",
  metal: "var(--color-metal)",
  accent: "var(--color-brand-400)",
  soft: "var(--color-brand-300)",
  water: "var(--color-water)",
  sparkle: "var(--color-sparkle)",
};
