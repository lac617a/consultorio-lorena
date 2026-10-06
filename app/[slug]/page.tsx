import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ClinicalDisclaimer } from "@/components/content/clinical-disclaimer";
import { MdxContent } from "@/components/content/mdx-content";
import { ReviewStamp } from "@/components/content/review-stamp";
import { SourcesList } from "@/components/content/sources-list";
import { DoodleSparkle, DoodleStar } from "@/components/illustrations/doodles";
import { GuideArt } from "@/components/illustrations/guide-art";
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

  return (
    <article>
      <JsonLd
        data={[
          medicalWebPageJsonLd(page),
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: page.title, path: page.url },
          ]),
        ]}
      />

      <header className="container-text grid items-center gap-6 pt-6 pb-8 sm:grid-cols-[1fr_auto]">
        <nav aria-label="Ruta de navegación" className="text-sm sm:col-span-2">
          <ol className="flex gap-2 text-ink-muted">
            <li>
              <Link href="/">Inicio</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{page.title}</li>
          </ol>
        </nav>
        <div className="order-2 space-y-4 sm:order-none">
          <h1 className="text-4xl sm:text-5xl">{page.title}</h1>
          {page.lead && <p className="text-xl text-ink-muted">{page.lead}</p>}
          <ReviewStamp review={page.review} />
        </div>
        <div className="relative order-1 mx-auto sm:order-none">
          <DoodleStar className="parallax absolute -top-2 -right-4 size-9 [--parallax:1.5rem]" />
          <DoodleSparkle className="parallax absolute bottom-0 -left-4 size-8 [--parallax:-1.5rem]" />
          <div className="blob size-32 [--blob-color:var(--color-brand-200)] sm:size-44">
            <GuideArt slug={page.slug} className="size-20 sm:size-32" />
          </div>
        </div>
      </header>

      <div className="container-text">
        <ClinicalDisclaimer />
        <div className="content">
          <MdxContent code={page.body} />
        </div>
      </div>

      {related.length > 0 && (
        <nav aria-labelledby="relacionados" className="container-text mt-12">
          <h2 id="relacionados" className="text-3xl">
            También le puede servir
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.url}
                  className="flex tap items-center gap-3 rounded-card border-2 border-ink bg-surface p-3 font-bold text-ink no-underline hover:bg-brand-50"
                >
                  <span className="blob size-14 shrink-0">
                    <GuideArt slug={item.slug} decorative className="size-10" />
                  </span>
                  <span className="flex-1">{item.title}</span>
                  <ArrowRight aria-hidden="true" className="size-5 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="container-text mt-12 mb-16">
        <SourcesList sources={page.sources} />
      </div>
    </article>
  );
}
