import { defineCollection, defineConfig, s } from "velite";

/**
 * Esquemas de contenido de OrtoGuía.
 * Reglas clínicas: CLAUDE.md → "Reglas de contenido clínico" y PRD §8.
 */

const requireClinicalReview = process.env.REQUIRE_CLINICAL_REVIEW === "true";

const MAX_REVIEW_MONTHS = 12;

const treatment = s.enum(["metalicos", "esteticos", "autoligables", "alineadores", "retenedor"]);

const reviewer = s.object({
  name: s.string().min(3),
  specialty: s.string().min(3),
  license: s.string().min(3), // cédula profesional o n.º de colegiado
});

const review = s
  .discriminatedUnion("status", [
    s.object({ status: s.literal("pendiente") }),
    s.object({
      status: s.literal("revisado"),
      reviewedBy: reviewer,
      reviewedAt: s.isodate(),
      nextReview: s.isodate(),
    }),
  ])
  .superRefine((value, ctx) => {
    if (value.status !== "revisado") return;
    const reviewedAt = new Date(value.reviewedAt);
    const nextReview = new Date(value.nextReview);
    const limit = new Date(reviewedAt);
    limit.setMonth(limit.getMonth() + MAX_REVIEW_MONTHS);
    if (nextReview <= reviewedAt || nextReview > limit) {
      ctx.addIssue({
        code: "custom",
        message: `nextReview debe ser posterior a reviewedAt y como máximo ${MAX_REVIEW_MONTHS} meses después.`,
      });
    }
  });

const source = s.object({
  title: s.string().min(3),
  publisher: s.string().min(2),
  url: s.string().url(),
});

const pages = defineCollection({
  name: "Page",
  pattern: "pages/**/*.mdx",
  schema: s
    .object({
      slug: s.slug("pages"),
      /** h1 visible en la página */
      title: s.string().min(3).max(70),
      /** <title> para buscadores; se completa como "… | OrtoGuía" */
      seoTitle: s.string().min(10).max(60),
      description: s.string().min(120).max(155),
      /** Frase corta bajo el h1 */
      lead: s.string().max(200).optional(),
      order: s.number().int(),
      treatments: s.array(treatment).min(1),
      related: s.array(s.string()).max(3).default([]),
      ogImage: s.string().optional(),
      review,
      sources: s.array(source).min(1),
      body: s.mdx(),
    })
    .transform((data) => ({ ...data, url: `/${data.slug}` })),
});

const foods = defineCollection({
  name: "Food",
  pattern: "foods.json",
  schema: s.object({
    id: s.unique("foods"),
    name: s.string(),
    verdict: s.enum(["si", "cuidado", "evitar"]),
    reason: s.string(),
    tip: s.string().optional(),
    /** Mancha brackets estéticos o ligas claras */
    stains: s.boolean().default(false),
  }),
});

const emergencies = defineCollection({
  name: "Emergency",
  pattern: "emergencies.json",
  schema: s.object({
    id: s.unique("emergencies"),
    title: s.string(),
    urgency: s.enum(["puede-esperar", "llama-pronto", "urgencias"]),
    steps: s.array(s.string()).min(1),
    note: s.string().optional(),
    treatments: s.array(treatment).min(1),
  }),
});

const colors = defineCollection({
  name: "LigatureColor",
  pattern: "colors.json",
  schema: s.object({
    id: s.unique("colors"),
    name: s.string(),
    hex: s.string().regex(/^#[0-9a-f]{6}$/i),
    effect: s.enum(["aclara", "neutro", "amarillea", "se-mancha", "parece-comida"]),
  }),
});

const clinicalParams = defineCollection({
  name: "ClinicalParams",
  pattern: "clinical-params.json",
  single: true,
  schema: s.object({
    status: s.enum(["provisional", "validado"]),
    brushingFrequency: s.string(),
    fluorideRinseTiming: s.string(),
    chewingGum: s.string(),
    appointmentInterval: s.string(),
    bracesDuration: s.string(),
    alignerHoursPerDay: s.number().int().min(20).max(24),
    alignerChange: s.string(),
    elasticsHours: s.string(),
    elasticsWhileEating: s.string(),
    elasticsChange: s.string(),
    retainerWear: s.string(),
    waxAmount: s.string(),
  }),
});

/** Datos del consultorio. Teléfono, WhatsApp, horario y mapa pendientes (decisión D8). */
const clinic = defineCollection({
  name: "Clinic",
  pattern: "clinic.json",
  single: true,
  schema: s.object({
    name: s.string(),
    shortName: s.string(),
    address: s.object({
      street: s.string(),
      neighborhood: s.string(),
      city: s.string(),
      region: s.string(),
      country: s.string().length(2),
    }),
    phone: s.string().optional(),
    /** Solo dígitos con indicativo, p. ej. 573001234567 (para wa.me). */
    whatsapp: s
      .string()
      .regex(/^\d{10,15}$/)
      .optional(),
    hours: s.string().optional(),
    mapsUrl: s.string().url().optional(),
  }),
});

export default defineConfig({
  root: "content",
  strict: true, // la CLI lo ignora: los scripts pasan --strict
  output: {
    data: ".velite",
    assets: "public/generated",
    base: "/generated/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { pages, foods, emergencies, colors, clinicalParams, clinic },
  prepare: ({ pages, clinicalParams }) => {
    const slugs = new Set(pages.map((page) => page.slug));
    const errors: string[] = [];

    for (const page of pages) {
      for (const related of page.related) {
        if (!slugs.has(related)) errors.push(`${page.slug}: related "${related}" no existe.`);
      }
      if (requireClinicalReview && page.review.status !== "revisado") {
        errors.push(`${page.slug}: falta revisión clínica (REQUIRE_CLINICAL_REVIEW=true).`);
      }
    }

    if (requireClinicalReview && clinicalParams.status !== "validado") {
      errors.push("clinical-params.json: los parámetros clínicos no están validados.");
    }

    if (errors.length > 0) {
      throw new Error(`Contenido inválido:\n- ${errors.join("\n- ")}`);
    }
  },
});
