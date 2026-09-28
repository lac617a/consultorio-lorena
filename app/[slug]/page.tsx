import Link from "next/link";
import { notFound } from "next/navigation";

import { ClinicalDisclaimer } from "@/components/content/clinical-disclaimer";
import { MdxContent } from "@/components/content/mdx-content";
import { ReviewStamp } from "@/components/content/review-stamp";
import { SourcesList } from "@/components/content/sources-list";
import { JsonLd } from "@/components/seo/json-ld";
import { allPages, getPage } from "@/lib/content";
import { breadcrumbJsonLd, buildPageMetadata, medicalWebPageJsonLd } from "@/lib/seo";

import type { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return allPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const page = getPage((await params).slug);
  return page ? buildPageMetadata(page) : {};
}

export default async function ContentPage({ params }: PageProps<"/[slug]">) {
  const page = getPage((await params).slug);
  if (!page) notFound();

  const related = page.related.map(getPage).filter((item) => item !== undefined);
  const guideNumber = allPages.findIndex((item) => item.slug === page.slug) + 1;

  return (
    <article className="space-y-8">
      <JsonLd
        data={[
          medicalWebPageJsonLd(page),
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: page.title, path: page.url },
          ]),
        ]}
      />

      <header className="space-y-4">
        <nav aria-label="Ruta de navegación" className="text-sm">
          <ol className="flex gap-2 text-ink-muted">
            <li>
              <Link href="/">Inicio</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{page.title}</li>
          </ol>
        </nav>
        <p className="sticker">Guía {String(guideNumber).padStart(2, "0")}</p>
        <h1 className="text-4xl sm:text-5xl">{page.title}</h1>
        {page.lead && <p className="text-xl text-ink-muted">{page.lead}</p>}
        <ReviewStamp review={page.review} />
      </header>

      <ClinicalDisclaimer />

      <div className="content">
        <MdxContent code={page.body} />
      </div>

      {related.length > 0 && (
        <nav aria-labelledby="relacionados" className="space-y-3">
          <h2 id="relacionados" className="text-2xl">
            También te puede servir
          </h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.url}
                  className="block tap rounded-card border-2 border-ink bg-surface p-4 font-bold text-ink no-underline shadow-[var(--shadow-print)]"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <SourcesList sources={page.sources} />
    </article>
  );
}
