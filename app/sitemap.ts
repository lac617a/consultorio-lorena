import { allPages } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/") },
    ...allPages.map((page) => ({
      url: absoluteUrl(page.url),
      // La fecha de la última revisión clínica es la última modificación relevante.
      ...(page.review.status === "revisado" ? { lastModified: page.review.reviewedAt } : {}),
    })),
    { url: absoluteUrl("/creditos") },
  ];
}
