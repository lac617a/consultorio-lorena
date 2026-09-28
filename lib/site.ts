import { clinic } from "@/lib/content";

export const site = {
  name: clinic.shortName,
  legalName: clinic.name,
  product: "Guía de ortodoncia",
  tagline: "Su ortodoncia, paso a paso",
  description: `Guía visual de ${clinic.name} para pacientes de ortodoncia: cómo cepillarse con brackets, qué comer, qué hacer si algo se rompe y cómo elegir los colores de sus ligas.`,
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

/** Enlace de WhatsApp del consultorio. El mensaje nunca incluye datos del paciente. */
export function clinicWhatsappUrl(
  message = "Hola, tengo una pregunta sobre mi ortodoncia.",
): string | null {
  if (!clinic.whatsapp) return null;
  return `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function clinicPhoneUrl(): string | null {
  return clinic.phone ? `tel:${clinic.phone.replace(/\s/g, "")}` : null;
}

/** Enlace "Cómo llegar": usa el de Google Business si existe; si no, busca la dirección. */
export function clinicMapsUrl(): string {
  if (clinic.mapsUrl) return clinic.mapsUrl;
  const { street, city, region } = clinic.address;
  const query = encodeURIComponent(`${clinic.name}, ${street}, ${city}, ${region}, Colombia`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
