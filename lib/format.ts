const dateFormatter = new Intl.DateTimeFormat("es-419", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-09-28T00:00:00.000Z" → "28/09/2026" */
export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}
