import Link from "next/link";
import * as runtime from "react/jsx-runtime";

import { Callout } from "@/components/content/callout";
import { Param } from "@/components/content/param";
import { BrushingScene } from "@/components/illustrations/brushing-scene";
import { BrushingTimer } from "@/components/interactive/brushing-timer";
import { Checklist } from "@/components/interactive/checklist";
import { Step, StepByStep } from "@/components/interactive/step-by-step";

import type { ComponentProps, ReactNode } from "react";

/** Componentes disponibles dentro de los archivos MDX de content/pages. */
const components = {
  BrushingScene,
  BrushingTimer,
  Callout,
  Checklist,
  Param,
  Step,
  StepByStep,
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
