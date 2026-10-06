import { Siren, Toothbrush, Utensils } from "lucide-react";
import Link from "next/link";

const LINKS = [
  { href: "/urgencias", label: "Urgencias", Icon: Siren },
  { href: "/alimentos", label: "Alimentos", Icon: Utensils },
  { href: "/cepillado", label: "Cepillado", Icon: Toothbrush },
] as const;

/** Accesos rápidos fijos abajo: lo que el paciente busca con prisa. */
export function QuickAccessBar() {
  return (
    <nav
      aria-label="Accesos rápidos"
      className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-ink bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
    >
      <ul className="mx-auto grid max-w-xl grid-cols-3 gap-2 px-3 py-1.5">
        {LINKS.map(({ href, label, Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex tap flex-col items-center justify-center gap-0.5 rounded-xl py-1 text-sm font-bold text-ink no-underline hover:bg-brand-100"
            >
              <Icon aria-hidden="true" className="size-6" strokeWidth={2.25} />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
