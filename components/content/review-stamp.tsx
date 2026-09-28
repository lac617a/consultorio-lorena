import { Clock, ShieldCheck } from "lucide-react";

import { formatDate } from "@/lib/format";

import type { Page } from "@/lib/content";

/** Sello de revisión clínica (PRD §8), con aspecto de sello de tinta. */
export function ReviewStamp({ review }: { review: Page["review"] }) {
  if (review.status === "pendiente") {
    return (
      <p className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-caution bg-caution-soft px-3 py-1 text-sm font-bold text-caution">
        <Clock aria-hidden="true" className="size-4" />
        Pendiente de revisión clínica
      </p>
    );
  }

  const { reviewedBy, reviewedAt, nextReview } = review;

  return (
    <div className="flex gap-3 rounded-2xl border-2 border-dashed border-ok bg-ok-soft p-3 text-sm text-ink">
      <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-ok" />
      <p>
        Revisado por <strong>{reviewedBy.name}</strong>, {reviewedBy.specialty} (
        {reviewedBy.license}). Última revisión:{" "}
        <time dateTime={reviewedAt}>{formatDate(reviewedAt)}</time>. Próxima revisión:{" "}
        <time dateTime={nextReview}>{formatDate(nextReview)}</time>.
      </p>
    </div>
  );
}
