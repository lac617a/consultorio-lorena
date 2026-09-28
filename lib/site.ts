import { clinic } from "@/lib/content";

export const site = {
  name: clinic.shortName,
  legalName: clinic.name,
  product: "Guía de ortodoncia",
  tagline: "Tu ortodoncia, paso a paso",
  description: `Guía visual de ${clinic.name} para pacientes de ortodoncia: cómo cepillarte con brackets, qué comer, qué hacer si algo se rompe y cómo elegir los colores de tus ligas.`,
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "es_CO",
  isProduction: process.env.NEXT_PUBLIC_SITE_ENV === "production",
} as const;

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path === "/" ? "" : path}`;
}

export function clinicAddressLine(): string {
  const { street, neighborhood, city } = clinic.address;
  return `${street}, ${neighborhood}, ${city}`;
}

/** Enlace "Cómo llegar": usa el de Google Business si existe; si no, busca la dirección. */
export function clinicMapsUrl(): string {
  if (clinic.mapsUrl) return clinic.mapsUrl;
  const { street, city, region } = clinic.address;
  const query = encodeURIComponent(`${clinic.name}, ${street}, ${city}, ${region}, Colombia`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
