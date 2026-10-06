import { Siren, Toothbrush, Utensils } from "lucide-react";
import Link from "next/link";

const SHORTCUTS = [
  { href: "/urgencias", label: "Tengo una urgencia", Icon: Siren },
  { href: "/cepillado", label: "Cómo cepillarme", Icon: Toothbrush },
  { href: "/alimentos", label: "¿Puedo comer esto?", Icon: Utensils },
] as const;

export default function NotFound() {
  return (
    <div className="container-text space-y-6 py-10">
      <h1 className="text-4xl">No encontramos esta página</h1>
      <p className="text-ink-muted">
        Puede que todavía la estemos preparando. Esto es lo más buscado:
      </p>
      <ul className="grid gap-3">
        {SHORTCUTS.map(({ href, label, Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex tap items-center gap-3 rounded-card border-2 border-ink bg-surface p-4 font-bold text-ink no-underline hover:bg-brand-50"
            >
              <Icon aria-hidden="true" className="size-6" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/">Volver al inicio</Link>
      </p>
    </div>
  );
}
