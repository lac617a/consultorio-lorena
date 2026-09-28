"use client";

import * as m from "motion/react-m";

/** Estallido de figuritas al completar algo (mecánica de juego). Decorativo. */
const PIECES = Array.from({ length: 14 }, (_, index) => {
  const angle = (index / 14) * Math.PI * 2;
  const distance = 70 + (index % 3) * 22;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    color: ["var(--color-brand-400)", "var(--color-accent-300)", "var(--color-sun)"][index % 3],
    shape: index % 2 === 0 ? "rounded-full" : "rounded-sm rotate-45",
    size: index % 3 === 0 ? "size-3.5" : "size-2.5",
  };
});

export function Celebration() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      {PIECES.map((piece, index) => (
        <m.span
          key={index}
          className={`absolute ${piece.size} ${piece.shape} border-2 border-ink`}
          style={{ backgroundColor: piece.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
          animate={{ x: piece.x, y: piece.y, opacity: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
        />
      ))}
    </div>
  );
}
