/**
 * Lenguaje de ilustración "clínica editorial" (docs/design-references.md, D10):
 * trazo de tinta, rellenos blancos y grises con sombra desplazada, y el oro rosa del logo
 * como acento. Colores por variable CSS: al cambiar la paleta, cambian solas.
 */
export const INK = "var(--color-ink)";
export const STROKE = 2.5;
/** Desplazamiento del relleno "impreso" respecto al contorno. */
export const OFFSET = { x: 4, y: 4 };

export const FILL = {
  tooth: "var(--color-surface)",
  toothShadow: "var(--color-shade)",
  gum: "var(--color-gum)",
  metal: "var(--color-metal)",
  accent: "var(--color-brand-400)",
  soft: "var(--color-brand-200)",
  water: "var(--color-water)",
  sparkle: "var(--color-sparkle)",
};
