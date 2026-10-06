import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Créditos de imágenes, iconos y tipografía",
  description:
    "Licencias y atribuciones de las ilustraciones, iconos y tipografías que usa la guía de ortodoncia del Consultorio Lore Odontológico.",
  alternates: { canonical: "/creditos" },
};

// Mantener sincronizado con CREDITS.md.
const CREDITS = [
  {
    name: "Ilustraciones y garabatos de dientes, brackets, cepillos y alimentos",
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
    name: "Permanent Marker (tipografía de títulos)",
    author: "Font Diner",
    license: "Apache License 2.0",
    url: "https://fonts.google.com/specimen/Permanent+Marker",
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
    <div className="container-text space-y-6 py-10">
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
