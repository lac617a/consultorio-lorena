# CLAUDE.md — OrtoGuía

@AGENTS.md

## Qué es este proyecto

Guía web mobile-first para los pacientes de **ortodoncia** de la **Clínica Odontológica Sánchez Quintero** (logo: COE Dental) (Calle 33 # 28-18, La Aurora, Bucaramanga, Colombia). _OrtoGuía_ es el nombre interno del proyecto. El paciente llega escaneando un **código QR** en el consultorio y ve, **sin registrarse**, cómo:

- cepillarse con brackets;
- qué cepillos usar;
- qué comer y qué no;
- qué hacer ante una urgencia;
- cuidar alineadores y retenedores;
- elegir colores de ligas.

Reemplaza los folletos y PDFs que nadie lee. Es **educativa, no publicitaria** (Ley 35 de 1989): nada de precios, promociones ni comparaciones.

- **Dirección visual:** [docs/design-references.md](docs/design-references.md). La identidad (logo y colores) es la del consultorio.

- **Qué construir y por qué:** [PRD.md](PRD.md)
- **Orden de trabajo y fase actual:** [roadmap.md](roadmap.md)
- **Fuente única de datos clínicos:** [docs/content-research.md](docs/content-research.md)

Antes de empezar una tarea, revisa la fase actual en `roadmap.md` y marca las casillas al completar.

## Stack

| Capa               | Tecnología                                                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Framework          | Next.js 16, App Router, TypeScript estricto, páginas estáticas (SSG)                                                                                                     |
| Estilos            | Tailwind CSS v4 con design tokens                                                                                                                                        |
| Animación          | Motion v13: paquete `motion`, importar desde `motion/react` y `motion/react-m` (**no** `framer-motion`)                                                                  |
| Contenido          | MDX y JSON en `content/`, tipados con Velite y esquemas Zod                                                                                                              |
| Lottie             | `@lottiefiles/dotlottie-react` (solo decorativo, WASM servido desde `/public`)                                                                                           |
| Iconos             | `lucide-react` y Healthicons/Tabler (SVG)                                                                                                                                |
| Analítica          | Umami Cloud (sin cookies)                                                                                                                                                |
| Gestor de paquetes | pnpm                                                                                                                                                                     |
| Calidad de código  | ESLint (flat config, `eslint-config-next`), `eslint-plugin-import` para el orden de imports, Prettier con `prettier-plugin-tailwindcss`, Husky, lint-staged y commitlint |

## Comandos

```bash
pnpm install       # dependencias (instala también los hooks de Husky)
pnpm dev           # servidor de desarrollo; Velite en modo watch
pnpm build         # valida el contenido (velite --strict) y genera el build de producción
pnpm content       # solo valida y genera el contenido (.velite/)
pnpm lint          # ESLint (incluye orden de imports), 0 advertencias permitidas
pnpm lint:fix      # ESLint con autocorrección
pnpm format        # Prettier: formatea todo el repo
pnpm format:check  # Prettier en modo verificación (usado en CI)
pnpm typecheck     # velite + next typegen + tsc --noEmit
```

- Copia `.env.example` a `.env.local` para desarrollar. Variables: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_ENV` (solo `production` se indexa) y `REQUIRE_CLINICAL_REVIEW` (`true` hace fallar el build con contenido sin revisar).
- Velite necesita `--strict` en la CLI para que un error de esquema haga fallar el proceso (la opción `strict` del config no basta). Los scripts ya lo incluyen.
- `pnpm qr` (generador de QR) llega en la fase 3.

## Estructura

```
app/
  [slug]/page.tsx       # renderiza cada página MDX de content/pages (SSG)
  creditos/             # página de créditos (sincronizada con CREDITS.md)
  layout.tsx            # fuente, metadatos base, MotionProvider, cabecera, accesos rápidos
  globals.css           # design tokens (@theme) y estilos base
  robots.ts, sitemap.ts # SEO; robots bloquea todo fuera de producción
  q/[id]/               # (fase 3) rutas cortas del QR → redirect con UTM
components/
  content/              # MdxContent, ClinicalDisclaimer, ReviewStamp, SourcesList, Callout, Param
  interactive/          # islas de cliente: StepByStep, Checklist (luego BracesColorPicker, EmergencyTriage…)
  illustrations/        # SVG con capas nombradas (ArchWithBraces, OrthodonticToothbrush, InterdentalBrush)
  layout/               # SiteHeader, SiteFooter, QuickAccessBar, TextSizeToggle
  providers/            # MotionProvider
  seo/                  # JsonLd
content/
  pages/*.mdx           # contenido de cada módulo, con metadatos de revisión y SEO
  foods.json            # semáforo de alimentos
  emergencies.json      # opciones del triage
  colors.json           # paleta de ligas con nombres
  clinical-params.json  # parámetros clínicos configurables
lib/                    # content (acceso a .velite), seo, site, storage, format, cn
velite.config.ts        # esquemas de contenido (Zod) y validaciones clínicas
docs/                   # investigación y documentación
```

`.velite/` es generado: no se edita ni se versiona. Importa el contenido siempre desde `@/lib/content`.

## Estándares de código: formato, lint e imports

El código se formatea y se valida de forma automática. **No discutas estilo a mano: lo decide la herramienta.**

- **Prettier** es la única fuente de formato.
  - Config en `prettier.config.mjs`: `semi: true`, `singleQuote: false`, `trailingComma: "all"`, `printWidth: 100`, `tabWidth: 2`.
  - `prettier-plugin-tailwindcss` ordena las clases de Tailwind.
  - Formatea también MDX, JSON y Markdown.
- **ESLint** con flat config (`eslint.config.mjs`).
  - Base: `eslint-config-next` (`core-web-vitals` y `typescript`).
  - `eslint-config-prettier` al final, para desactivar las reglas que chocan con Prettier.
  - Next.js 16 ya no incluye `next lint`: se ejecuta `eslint .` directamente.
- **Orden de imports** con `eslint-plugin-import` (viene con `eslint-config-next`). La regla `import/order` es un **error**, no una advertencia:
  - grupos en este orden: `builtin` → `external` → `internal` (alias `@/`) → `parent` → `sibling` → `index` → `type`;
  - una línea en blanco entre grupos (`newlines-between: "always"`);
  - orden alfabético dentro de cada grupo (`alphabetize: { order: "asc", caseInsensitive: true }`);
  - también son error `import/no-duplicates`, `import/first` e `import/newline-after-import`;
  - usa el alias `@/` para importar desde la raíz, no rutas relativas largas (`../../../`).
- **Husky** gestiona los hooks de Git en `.husky/`. Se instala solo con el script `prepare` al hacer `pnpm install`. **Nunca uses `--no-verify`**: si un hook falla, corrige la causa.

  | Hook         | Qué ejecuta                                                                         | Para qué                                                    |
  | ------------ | ----------------------------------------------------------------------------------- | ----------------------------------------------------------- |
  | `pre-commit` | `lint-staged`: `eslint --fix` y `prettier --write` solo sobre los archivos en stage | Nada desordenado ni sin formato llega al repo               |
  | `commit-msg` | `commitlint` con `@commitlint/config-conventional`                                  | Mensajes de commit con formato estándar (ver "Git")         |
  | `pre-push`   | `pnpm typecheck` y `pnpm format:check`                                              | Detectar errores de tipos antes de subir, sin esperar al CI |
  - `lint-staged` se configura en `lint-staged.config.mjs`: `*.{ts,tsx,js,mjs}` pasa por ESLint y Prettier; `*.{md,mdx,json,css}` pasa por Prettier.
  - Los hooks deben ser rápidos. El build completo y Lighthouse se quedan en el CI.

- **CI:** `pnpm lint`, `pnpm format:check`, `pnpm typecheck` y `pnpm build` deben pasar para hacer merge.
- **Editor:** `.vscode/settings.json` activa "format on save" con Prettier y "fix on save" con ESLint. `.vscode/extensions.json` recomienda las extensiones.
- Antes de dar una tarea por terminada, ejecuta `pnpm lint:fix` y `pnpm format`.

## Reglas de contenido clínico (críticas)

1. **Nunca inventes datos clínicos.** Toda cifra, técnica o recomendación debe estar en `docs/content-research.md` o citar una fuente autorizada (AAO, BOS, NHS, ADA, literatura revisada por pares). Si falta algo, agrégalo primero a `docs/content-research.md` con su fuente.
2. **Valores discutidos, nunca en el texto.** Si un valor está marcado con ⚠ en la tabla de discrepancias, léelo de `content/clinical-params.json` con `<Param name="…" />` en el MDX. Ejemplos: horas de alineador, intervalo entre citas, cambio de elásticos, pauta del retenedor.
3. **Medicamentos:** no nombres fármacos ni dosis. Usa siempre _"Pregunte a su ortodoncista qué analgésico puede tomar."_
4. **Metadatos obligatorios en cada página MDX:** `review` y `sources`. No los desactives ni pongas valores falsos.
   - Contenido sin revisar: `review: { status: pendiente }`. La página muestra "Pendiente de revisión clínica".
   - Contenido revisado: `status: revisado` con `reviewedBy` (`name`, `specialty`, `license`), `reviewedAt` y `nextReview` (máximo 12 meses después).
   - Solo la revisora clínica (Dra. Lorena Sánchez Lázaro) cambia una página a `revisado` o `clinical-params.json` a `validado`.
5. **Cada página muestra** `ClinicalDisclaimer` y `ReviewStamp`.
6. **Sin promesas ni publicidad:** nada de "garantizado", antes y después, testimonios, precios, promociones, comparaciones con otros consultorios ni marcas comerciales de productos (Ley 35 de 1989, arts. 51 a 53).
7. **No copies texto literal de las fuentes.** Reescribe con palabras propias.
8. Todo cambio en contenido clínico o ilustraciones clínicas (ángulos, posición de brackets, elásticos) requiere **revisión clínica**. Indícalo en el PR.

## Estilo de redacción

- **Español de Colombia**, con trato de **usted** ("Lávese las manos", "su ortodoncista"). Nunca tuteo. Tono cálido, claro y tranquilizador.
- Vocabulario colombiano: _pitillo_ (no popote), _gaseosa_ (no refresco), _maní_ (no cacahuate), _mazorca_ (no elote), _crema dental_, _batido_ (no licuado).
- Frases cortas, nivel de lectura de ~6.º grado y **una idea por tarjeta**.
- Pasos siempre numerados y empezando con un verbo ("Seque el bracket…").
- **Terminología estándar:**
  - brackets;
  - arco;
  - ligas (las de color) y elásticos intermaxilares (los de la mordida). No los confundas;
  - cera de ortodoncia;
  - cepillo interdental;
  - hilo dental;
  - enhebrador;
  - irrigador bucal;
  - retenedor;
  - alineadores;
  - cita de control.
- Glosario completo en `docs/content-research.md`.

## Reglas de UI e implementación

- **Mobile-first.** Diseña a 360 px y mejora hacia escritorio.
- **Lenguaje visual** (dirección A + B, ver `docs/design-references.md`):
  - usa los tokens de `app/globals.css`; nunca colores sueltos. `brand` es el dorado del logo: `brand-400` solo para decorar, `brand-600`/`700` para texto y botones;
  - títulos con `font-display` (Fraunces); texto con la sans por defecto;
  - bordes de tinta (`border-2 border-ink`), `shadow-[var(--shadow-print)]` en tarjetas destacadas, `.sticker` para etiquetas;
  - botones: `.btn` + `.btn-primary` o `.btn-secondary`. Una sola acción primaria por bloque;
  - la mecánica de juego (progreso, estrellas, `Celebration`) va solo en los interactivos, no en el texto;
  - ilustraciones con las constantes de `components/illustrations/style.ts`.
- **Server Components por defecto.** Solo las piezas interactivas llevan `"use client"`. Mantén la primera carga por debajo de ~100 KB de JavaScript.
- **Motion:**
  - usa `LazyMotion` con `domAnimation` y el componente `m` (`motion/react-m`);
  - anima **solo `opacity` y `transform`**;
  - `MotionConfig reducedMotion="user"` ya está en el layout raíz. Usa `useReducedMotion()` en casos especiales, por ejemplo para mostrar el último frame de una animación;
  - el scroll-linking (`useScroll`) se usa con moderación.
- **Pasos navegables** con botones Anterior/Siguiente e indicador "Paso X de Y". No dependas solo del scroll.
- **Accesibilidad (WCAG 2.2 AA):**
  - objetivos táctiles de 44 px o más;
  - contraste de 4.5:1;
  - texto base de 18 px;
  - **nunca comunicar solo con color**: icono y texto en el semáforo y la urgencia, nombre de cada color de liga;
  - `alt` descriptivo en cada ilustración de pasos;
  - foco visible.
- **Ilustraciones:**
  - SVG en línea con capas nombradas (`id`/`data-part`) para poder animarlas;
  - una ilustración Lottie nunca puede ser el elemento LCP;
  - todo Lottie tiene imagen estática de respaldo.
- Imágenes rasterizadas con `next/image`, `width`/`height` explícitos y `sizes`.
- URLs en español y en minúsculas: `/cepillado`, `/primeros-dias`, `/ligas`, `/urgencias`.

## SEO

Requisitos completos en el PRD §7. Al crear o modificar una página:

- **Metadatos:**
  - exporta `generateMetadata` (o `metadata`) usando el helper compartido, que lee el frontmatter de Velite;
  - `title` de 60 caracteres o menos y `description` de 120–155, ambos **únicos**;
  - agrega los campos SEO al frontmatter del MDX y no los inventes en el componente.
- **Canonical sin parámetros** en todas las páginas. Nunca indexes URLs con `utm_*` ni las rutas `/q/<id>`, que responden con redirect 308.
- **JSON-LD:**
  - `MedicalWebPage` en cada módulo, con `reviewedBy` y `lastReviewed` tomados del frontmatter;
  - `BreadcrumbList` en todas las páginas;
  - `FAQPage` solo en mitos y preguntas frecuentes.
  - No uses `HowTo`.
- **El contenido debe estar en el HTML del servidor.** Los componentes interactivos (triage, semáforo, simulador, pasos) reciben sus textos como props desde un Server Component. Nunca cargues el texto solo del lado del cliente.
- **Estructura:**
  - un `h1` por página y jerarquía de encabezados sin saltos;
  - `alt` descriptivo;
  - nombres de archivo de imagen en español y con guiones.
- **Enlazado interno:** cada módulo enlaza a 2–3 módulos relacionados.
- **URLs:** en español, minúsculas, sin barra final. Si renombras una ruta, agrega el redirect 301 en `next.config`.
- **Sitemap:** una página nueva aparece sola en `sitemap.xml` si está en la colección de Velite. Verifícalo.
- **Imagen Open Graph** de 1200×630 por módulo.

## Assets y licencias

- Registra **toda** fuente externa (ilustración, icono o animación) en `CREDITS.md` con su licencia, y en `/creditos` si requiere atribución.
- Prioriza, en este orden: SVG propio, CC0 (Healthicons, Humaaans), unDraw, Lucide o Tabler. Evita Storyset y Noun Project salvo licencia de pago.
- Ilustraciones con IA: solo como boceto. Hay que redibujarlas en vector y pasar revisión clínica antes de usarlas.

## Privacidad

- **No agregues formularios, cuentas, cookies ni captura de datos personales o de salud.**
- `localStorage` solo guarda preferencias locales (tratamiento elegido, tamaño de texto, diseño de ligas), envuelto en `try/catch`.
- Los parámetros UTM y las rutas `/q/<id>` identifican **consultorios**, nunca pacientes.
- La analítica es solo Umami, sin cookies. No añadas otros scripts de terceros sin actualizar el PRD.

## Git

- Ramas: `feat/…`, `fix/…`, `content/…` (cambios de contenido clínico) y `docs/…`.
- Commits con **Conventional Commits**; `commitlint` lo valida en el hook `commit-msg`:
  - formato `tipo(ámbito opcional): descripción`;
  - descripción en español, en imperativo, en minúscula y sin punto final;
  - ejemplos: `feat(urgencias): agrega triage de urgencias`, `content(alimentos): corrige lista de alimentos duros`, `fix: corrige contraste del semáforo`;
  - tipos permitidos: `feat`, `fix`, `content` (tipo propio para cambios de contenido clínico), `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.
- Los PR de contenido clínico indican qué fuentes se usaron y si falta revisión clínica.
