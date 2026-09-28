import type { Page } from "@/lib/content";

export function SourcesList({ sources }: { sources: Page["sources"] }) {
  return (
    <section aria-labelledby="fuentes" className="space-y-3 border-t-2 border-ink pt-6">
      <h2 id="fuentes" className="text-2xl">
        Fuentes
      </h2>
      <ul className="space-y-2 text-base text-ink-muted">
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} rel="noopener noreferrer" target="_blank">
              {source.title}
            </a>{" "}
            — {source.publisher}
          </li>
        ))}
      </ul>
    </section>
  );
}
