import { clinic, clinicalParams, colors, emergencies, foods, pages } from "@/.velite";

import type { Page } from "@/.velite";

export type { Clinic, ClinicalParams, Emergency, Food, LigatureColor, Page } from "@/.velite";

export { clinic, clinicalParams, colors, emergencies, foods };

export const allPages: Page[] = [...pages].sort((a, b) => a.order - b.order);

export function getPage(slug: string): Page | undefined {
  return pages.find((page) => page.slug === slug);
}
