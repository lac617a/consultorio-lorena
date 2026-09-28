import { absoluteUrl, site } from "@/lib/site";

import type { Page } from "@/lib/content";
import type { Metadata } from "next";

/** Metadatos de una página de contenido: canonical sin parámetros (UTM del QR), Open Graph. */
export function buildPageMetadata(page: Page): Metadata {
  return {
    title: page.seoTitle,
    description: page.description,
    alternates: { canonical: page.url },
    openGraph: {
      type: "article",
      url: page.url,
      title: page.seoTitle,
      description: page.description,
      siteName: site.name,
      locale: site.locale,
      ...(page.ogImage ? { images: [{ url: page.ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: { card: "summary_large_image", title: page.seoTitle, description: page.description },
  };
}

type JsonLd = Record<string, unknown>;

export function medicalWebPageJsonLd(page: Page): JsonLd {
  const reviewed =
    page.review.status === "revisado"
      ? {
          lastReviewed: page.review.reviewedAt.slice(0, 10),
          reviewedBy: {
            "@type": "Person",
            name: page.review.reviewedBy.name,
            jobTitle: page.review.reviewedBy.specialty,
          },
        }
      : {};

  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: page.title,
    headline: page.title,
    description: page.description,
    url: absoluteUrl(page.url),
    inLanguage: "es",
    audience: { "@type": "PeopleAudience", audienceType: "Pacientes de ortodoncia" },
    isPartOf: { "@type": "WebSite", name: site.name, url: absoluteUrl() },
    citation: page.sources.map((source) => source.url),
    ...reviewed,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: absoluteUrl(),
    description: site.description,
    inLanguage: "es",
  };
}
