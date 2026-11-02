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
    name: "Ilustraciones de dientes, brackets, cepillos y alimentos",
    author: "Equipo de OrtoGuía",
    license: "Propias",
  },
  {
    name: "Nunito Sans (tipografía del texto)",
    author: "Vernon Adams, Jacques Le Bailly, Manvel Shmavonyan y Alexei Vanyashin",
    license: "SIL Open Font License 1.1",
    url: "https://fonts.google.com/specimen/Nunito+Sans",
  },
  {
    name: "DM Serif Display (tipografía de títulos)",
    author: "Colophon Foundry",
    license: "SIL Open Font License 1.1",
    url: "https://fonts.google.com/specimen/DM+Serif+Display",
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
          <li key={credit.name} className="card-soft p-5">
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
