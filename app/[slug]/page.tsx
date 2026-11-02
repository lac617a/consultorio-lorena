import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ClinicalDisclaimer } from "@/components/content/clinical-disclaimer";
import { MdxContent } from "@/components/content/mdx-content";
import { ReviewStamp } from "@/components/content/review-stamp";
import { SourcesList } from "@/components/content/sources-list";
import { ArcLine } from "@/components/illustrations/decor";
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
  const number = allPages.findIndex((item) => item.slug === page.slug) + 1;

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

      <header className="container-page pt-3 sm:pt-5">
        <div className="card-soft relative isolate overflow-hidden px-6 py-8 sm:px-10 sm:py-12 md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-12 md:px-14">
          <ArcLine className="pointer-events-none absolute -right-20 -bottom-16 -z-10 w-[36rem] max-w-none text-ink/15" />
          <div>
            <nav aria-label="Ruta de navegación" className="text-base">
              <ol className="flex flex-wrap gap-2 text-ink-muted">
                <li>
                  <Link href="/">Inicio</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{page.title}</li>
              </ol>
            </nav>
            <p className="eyebrow mt-6">Guía {String(number).padStart(2, "0")}</p>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl">{page.title}</h1>
            {page.lead && <p className="mt-5 max-w-xl text-xl text-ink-muted">{page.lead}</p>}
            <div className="mt-6">
              <ReviewStamp review={page.review} />
            </div>
          </div>
          <div className="mt-8 grid size-40 place-items-center rounded-full bg-white shadow-[var(--shadow-soft)] max-md:mx-auto md:mt-0 md:size-56">
            <GuideArt slug={page.slug} className="parallax size-24 [--parallax:1rem] md:size-36" />
          </div>
        </div>
      </header>

      <div className="container-text pt-10">
        <ClinicalDisclaimer />
        <div className="content mt-6">
          <MdxContent code={page.body} />
        </div>
      </div>

      {related.length > 0 && (
        <nav aria-labelledby="relacionados" className="container-page mt-10">
          <div className="border-t border-line pt-12">
            <p className="eyebrow">Siga leyendo</p>
            <h2 id="relacionados" className="mt-2 text-3xl sm:text-4xl">
              También le puede servir
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={item.url}
                    className="card-soft group flex tap items-center gap-4 p-4 font-bold no-underline transition-shadow hover:shadow-[var(--shadow-soft)]"
                  >
                    <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white">
                      <GuideArt slug={item.slug} decorative className="size-11" />
                    </span>
                    <span className="flex-1">{item.title}</span>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-ink/25 bg-white transition-colors group-hover:bg-ink group-hover:text-white">
                      <ArrowUpRight aria-hidden="true" className="size-5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      <div className="container-text mt-14 mb-16">
        <SourcesList sources={page.sources} />
      </div>
    </article>
  );
}
