"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";

import type { ReactNode } from "react";

/**
 * Motion para todo el sitio:
 * - LazyMotion + `m` mantiene el bundle pequeño (`strict` prohíbe usar `motion.*`).
 * - reducedMotion="user" respeta la preferencia del sistema operativo.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
