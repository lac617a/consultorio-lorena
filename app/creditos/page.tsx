import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Créditos de imágenes, iconos y tipografía",
  description:
    "Licencias y atribuciones de las ilustraciones, iconos y tipografías que usa OrtoGuía, la guía visual para pacientes de ortodoncia.",
  alternates: { canonical: "/creditos" },
};

// Mantener sincronizado con CREDITS.md.
const CREDITS = [
  {
    name: "Ilustraciones de dientes, brackets y cepillos",
    author: "Equipo de OrtoGuía",
    license: "Propias",
  },
  {
    name: "Atkinson Hyperlegible Next (tipografía)",
    author: "Braille Institute of America",
    license: "SIL Open Font License 1.1",
    url: "https://fonts.google.com/specimen/Atkinson+Hyperlegible+Next",
  },
  {
    name: "Fraunces (tipografía de títulos)",
    author: "Undercase Type (Phaedra Charles y Flavia Zimbardi)",
    license: "SIL Open Font License 1.1",
    url: "https://fonts.google.com/specimen/Fraunces",
  },
  {
    name: "Lucide (iconos)",
    author: "Lucide Contributors",
    license: "ISC",
    url: "https://lucide.dev/license",
  },
];

export default function CreditsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl">Créditos</h1>
      <p className="text-ink-muted">Estos son los recursos gráficos que usamos y sus licencias.</p>
      <ul className="space-y-4">
        {CREDITS.map((credit) => (
          <li key={credit.name} className="rounded-card border-2 border-ink bg-surface p-4">
            <p className="font-bold">
              {credit.url ? (
                <a href={credit.url} rel="noopener noreferrer" target="_blank">
                  {credit.name}
                </a>
              ) : (
                credit.name
              )}
            </p>
            <p className="text-base text-ink-muted">
              {credit.author} · {credit.license}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
