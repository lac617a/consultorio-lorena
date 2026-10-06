import type { ReactNode } from "react";

/**
 * Tarjetas numeradas para el MDX: una idea por tarjeta, todas visibles a la vez
 * (sin carrusel ni botones). El número sale de un contador CSS del <ol>.
 */
export function Cards({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <ol
      aria-label={label}
      className="my-6 grid list-none gap-4 pl-0 [counter-reset:card] sm:grid-cols-2"
    >
      {children}
    </ol>
  );
}

type CardProps = { title: string; illustration?: ReactNode; children: ReactNode };

export function Card({ title, illustration, children }: CardProps) {
  return (
    <li className="relative rounded-card border-2 border-ink bg-surface p-4 [counter-increment:card]">
      <span
        aria-hidden="true"
        className="absolute -top-3 -left-2 grid size-10 place-items-center rounded-full border-2 border-ink bg-brand-200 font-display text-xl leading-none before:content-[counter(card)]"
      />
      {illustration && (
        <div className="mb-3 rounded-2xl bg-brand-50 px-6 py-2 [&_svg]:mx-auto [&_svg]:h-28 [&_svg]:w-auto sm:[&_svg]:h-36">
          {illustration}
        </div>
      )}
      <h3 className="m-0 text-lg">{title}</h3>
      <div className="mt-1 text-ink-muted [&>p]:m-0">{children}</div>
    </li>
  );
}
