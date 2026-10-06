import Link from "next/link";
import * as runtime from "react/jsx-runtime";

import { Callout } from "@/components/content/callout";
import { Card, Cards } from "@/components/content/cards";
import { EmergencyAlert, EmergencyGuide } from "@/components/content/emergency-guide";
import { FoodGuide } from "@/components/content/food-guide";
import { HygieneKitGuide } from "@/components/content/hygiene-kit-guide";
import { Param } from "@/components/content/param";
import { BrushingScene } from "@/components/illustrations/brushing-scene";

import type { ComponentProps, ReactNode } from "react";

/** Componentes disponibles dentro de los archivos MDX de content/pages. */
const components = {
  BrushingScene,
  Callout,
  Card,
  Cards,
  EmergencyAlert,
  EmergencyGuide,
  FoodGuide,
  HygieneKitGuide,
  Param,
  // Cada título de tema lleva el trazo de resaltador del folleto.
  h2: ({ children, ...props }: ComponentProps<"h2">) => (
    <h2 {...props}>
      <span className="marker">{children}</span>
    </h2>
  ),
  a: ({ href = "", ...props }: ComponentProps<"a">) =>
    href.startsWith("/") ? (
      <Link href={href} {...props} />
    ) : (
      <a href={href} rel="noopener noreferrer" target="_blank" {...props} />
    ),
};

type MdxModule = { default: (props: { components: typeof components }) => ReactNode };

// Velite compila el MDX a un cuerpo de función que recibe el runtime de JSX.
const cache = new Map<string, MdxModule["default"]>();

function getMdxComponent(code: string) {
  let component = cache.get(code);
  if (!component) {
    const mdxModule = new Function(code)({ ...runtime }) as MdxModule;
    component = mdxModule.default;
    cache.set(code, component);
  }
  return component;
}

export function MdxContent({ code }: { code: string }) {
  // Se llama como función (no como <Content />): el MDX compilado no usa hooks
  // y así no se "crea un componente durante el render".
  return getMdxComponent(code)({ components });
}
