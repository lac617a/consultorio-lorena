# Roadmap — Guía de ortodoncia de la Clínica Sánchez Quintero

> Hoja de ruta por fases. No hay fechas fijas. Una fase termina cuando cumple su **criterio de salida**.
> Alcance y requisitos: [PRD.md](PRD.md). Contenido clínico: [docs/content-research.md](docs/content-research.md).

**Estado actual:** Fase 0 casi completa. Faltan los despliegues de preview (dependen de D1, hosting) y ver el CI en verde en GitHub (falta crear el repositorio remoto).

---

## Fase 0 — Fundaciones

**Objetivo:** dejar el proyecto listo para producir contenido rápido y con calidad.

- [x] PRD, roadmap, CLAUDE.md y banco de contenido con fuentes.
- [x] Inicializar el repositorio git y definir la convención de ramas y commits.
- [x] Crear el proyecto con Next.js 16 (App Router, TypeScript estricto) y pnpm.
- [x] **Estándares de código:**
  - [x] Prettier (`prettier.config.mjs`) con `prettier-plugin-tailwindcss` y `.prettierignore`.
  - [x] ESLint flat config (`eslint.config.mjs`) con `eslint-config-next` (`core-web-vitals` y `typescript`) y `eslint-config-prettier`.
  - [x] Orden de imports con `eslint-plugin-import`: `import/order` como error (grupos, línea en blanco entre grupos, orden alfabético), además de `import/no-duplicates`, `import/first` e `import/newline-after-import`.
  - [x] Alias `@/` en `tsconfig.json`.
  - [x] Scripts `lint`, `lint:fix`, `format`, `format:check` y `typecheck`.
  - [x] Husky (script `prepare`) con tres hooks:
    - [x] `pre-commit`: lint-staged (`eslint --fix` y `prettier --write` sobre los archivos en stage).
    - [x] `commit-msg`: commitlint con `@commitlint/config-conventional` y el tipo propio `content`.
    - [x] `pre-push`: `pnpm typecheck` y `pnpm format:check`.
  - [x] `.vscode/settings.json` (format y fix al guardar) y `.vscode/extensions.json`.
  - [x] `.editorconfig` y `.gitattributes` (finales de línea LF).
- [x] Instalar Tailwind CSS v4 y definir los design tokens (color, tipografía, espaciado, radios, sombras, colores de estado accesibles).
- [x] Configurar Motion v13 (`LazyMotion` y `MotionConfig reducedMotion="user"` en el layout raíz).
- [x] Configurar Velite con las colecciones `pages` (MDX) y `foods`, `emergencies`, `colors` (JSON).
  - [x] Esquema con `review` (estado `pendiente`, o `revisado` con `reviewedBy`, `reviewedAt` y `nextReview`) y `sources` obligatorios; el build falla si faltan.
  - [x] Campos SEO en el esquema: `seoTitle` (60 caracteres o menos), `description` (120–155), `ogImage` y `related` (módulos a enlazar).
  - [x] `REQUIRE_CLINICAL_REVIEW=true` hace fallar el build si hay contenido o parámetros clínicos sin revisar (activar para el lanzamiento).
- [x] Crear `content/clinical-params.json` con los parámetros clínicos configurables y sus valores por defecto provisionales (ver la tabla de discrepancias).
- [x] Layout mobile-first con cabecera, accesos rápidos fijos (Urgencias, Alimentos, Cepillado), pie de página y `TextSizeToggle`.
- [x] Componentes base: `ClinicalDisclaimer`, `ReviewStamp`, `StepByStep`, `Checklist`.
- [x] Primeras piezas SVG con capas nombradas: arcada con brackets, cepillo de ortodoncia y cepillo interdental. Estilo provisional, a validar con quien produzca las ilustraciones (D5).
- [x] Crear `CREDITS.md` y la página `/creditos`.
- [x] **Base de SEO:**
  - [x] `metadataBase` y plantilla de `title` en el layout raíz.
  - [x] Helper para generar metadatos y JSON-LD desde el frontmatter de Velite.
  - [x] `noindex` fuera de producción (`NEXT_PUBLIC_SITE_ENV`): metadato, encabezado `X-Robots-Tag` y `robots.txt`.
  - [x] `robots.txt` y `sitemap.xml` generados.
- [x] CI: lint, verificación de formato, typecheck y build en cada PR (`.github/workflows/ci.yml`).
- [ ] Crear el repositorio remoto en GitHub y ver el CI en verde.
- [ ] Despliegues de preview (depende de D1, hosting).

**Criterio de salida:** una página de ejemplo en MDX se renderiza con aviso, sello de revisión y un `StepByStep` animado; el build falla si falta un metadato de revisión; el pre-commit corrige solos los imports desordenados y el formato, y el CI falla si llegan sin corregir; CI en verde.

---

## Fase 1 — MVP de contenido núcleo

**Objetivo:** cubrir lo que el paciente necesita **la primera semana**.

**Listo para empezar:** marca (COE Dental), paleta, dirección de diseño (A + B), contacto y trato de usted ya están definidos.

- [x] **Identidad de la clínica:** logo COE Dental en la cabecera y en "Su clínica", paleta de oro rosa del logo, nombre oficial en metadatos y `content/clinic.json`.
- [x] **Rediseño según la dirección elegida** (D7): tipografía, formas, estilo de ilustración y componentes base, aplicado al inicio y a `/primeros-dias` con paleta provisional.
- [x] **Datos de la clínica** en `content/clinic.json` y bloque "Su clínica": especialistas, dirección, horario, WhatsApp, llamar y cómo llegar. Incluye el enlace del perfil de Google Maps.
- [x] **Vocabulario colombiano y trato de usted** en el contenido existente (pitillo, gaseosa, maní, mazorca, batido).
- [x] JSON-LD `Dentist` con nombre, marca, logo, dirección, teléfono y web.

- [ ] **Empieza aquí:** `TreatmentSelector`, recorrido personalizado y guardado en `localStorage`.
- [ ] **Primeros días:** molestias, dieta blanda, cera paso a paso, llagas y cuándo consultar. _Borrador creado en la fase 0 como página de ejemplo; faltan las ilustraciones de los pasos y la revisión clínica._
- [ ] **Cepillado paso a paso:** `BrushingAnimation` SVG de 7 pasos y `Timer` de 2 minutos.
- [ ] **Tu kit de higiene:** tarjetas de las 9 herramientas con su mini paso a paso.
- [ ] **Alimentos:** `FoodTrafficLight` con alimentos típicos de LATAM, bebidas y alimentos que manchan los brackets estéticos.
- [ ] **Urgencias:** `EmergencyTriage`, bloque de emergencia médica real, kit de emergencia y botón de WhatsApp del consultorio con mensaje prellenado.
- [ ] Revisión clínica preliminar de estos módulos por la Dra. Lorena.

**Criterio de salida:** desde un QR de prueba, en un Android de gama baja real, el paciente completa el recorrido "Empieza aquí → Primeros días → Cepillado → Alimentos → Urgencias" sin errores. LCP < 2.5 s en todas estas páginas.

---

## Fase 2 — Interactivos y cobertura completa

**Objetivo:** completar todos los módulos del MVP y las experiencias interactivas.

- [ ] **Ligas de colores:** `BracesColorPicker` con paleta nombrada, atajos, presets temáticos, pistas en vivo, `localStorage` y compartir por hash de URL con la Web Share API.
- [ ] **Elásticos intermaxilares:** colocación en 5 pasos ilustrados y reglas de uso.
- [ ] **Alineadores:** uso, limpieza, estuche y attachments.
- [ ] **Retenedores:** fijo y removible, pauta de uso y limpieza.
- [ ] **Deportes e instrumentos.**
- [ ] **Tus citas de control:** qué pasa en un ajuste.
- [ ] **Mitos y FAQ:** `FlipCard` y acordeón.
- [ ] **Mini-juego "¿Puedo comer esto?":** `FoodQuiz`.
- [ ] Animaciones Lottie decorativas (máximo 2), cargadas en diferido y con imagen estática de respaldo.

**Criterio de salida:** los 13 módulos del PRD (§5.1–5.13) están publicados en preview, con contenido completo y parámetros clínicos leídos desde la configuración.

---

## Fase 3 — Lanzamiento piloto

**Objetivo:** salir a producción con 1–2 consultorios reales.

- [ ] **Revisión clínica firmada** por la Dra. Lorena de todo el contenido e ilustraciones, y resolución de la tabla de discrepancias. Activar `REQUIRE_CLINICAL_REVIEW=true`.
- [ ] **Resolver D1:** decisión de hosting y configuración de producción (dominio, HTTPS, redirects).
- [ ] Auditoría de accesibilidad (WCAG 2.2 AA): Lighthouse, axe y prueba con lector de pantalla y con un adulto mayor real.
- [ ] Auditoría de rendimiento en un dispositivo real y Lighthouse CI con presupuestos.
- [ ] **SEO** (ver PRD §7):
  - [ ] Validar las intenciones de búsqueda con una herramienta de palabras clave y ajustar los `title` y `h1`.
  - [ ] `title` y `description` únicos por página, revisados.
  - [ ] Canonical sin parámetros en todas las páginas.
  - [ ] `/q/<id>` con redirect 308, excluido del índice.
  - [ ] `sitemap.xml` con `lastModified` desde `reviewedAt`.
  - [ ] `robots.txt` que bloquea `/q/` y enlaza al sitemap.
  - [ ] Imágenes Open Graph por módulo, probadas al compartir en WhatsApp.
  - [ ] JSON-LD: `MedicalWebPage`, `Organization`, `WebSite`, `BreadcrumbList` y `FAQPage`, validados con la Prueba de resultados enriquecidos de Google.
  - [ ] Página 404 útil.
  - [ ] Revisión de enlazado interno.
  - [ ] Google Search Console: verificar el dominio y enviar el sitemap.
- [ ] Analítica: Umami Cloud, UTM por consultorio y eventos personalizados (ver PRD §4).
- [ ] QR: rutas cortas `/q/<id>`, script de generación de QR en SVG y prueba en varios teléfonos.
- [ ] Material impreso para el consultorio: tarjeta o sticker con el QR y un llamado a la acción.
- [ ] Páginas de **Política de tratamiento de datos** (Ley 1581 de 2012), **Créditos** y **Fuentes y revisión clínica**.
- [ ] **Resolver D3:** validar con asesoría legal que el sitio cumple la Ley 35 de 1989.
- [ ] Enlazar el sitio desde el perfil de Google Business del consultorio.
- [ ] Piloto en el Clínica Sánchez Quintero, con recolección de métricas y feedback de pacientes durante un ciclo de controles.

**Criterio de salida:** sitio en producción, contenido firmado por el revisor clínico, QR entregado a pacientes reales y primer reporte de métricas del piloto.

---

## Fase 4 — Post-MVP y crecimiento

**Objetivo:** ampliar el contenido y, si se decide, ofrecer la guía a otras clínicas.

- [ ] **(Opcional) Versión para otras clínicas:**
  - [ ] Configuración por clínica: logo, colores, nombre, WhatsApp o teléfono, horario.
  - [ ] **Parámetros clínicos propios** (`clinical-params` por clínica).
  - [ ] Rutas `/c/<clinica>/...` o subdominios.
    - [ ] SEO: las versiones por clínica apuntan su `canonical` a la página genérica, o llevan `noindex`, para evitar contenido duplicado.
  - [ ] Botón "Contactar a mi clínica" en Urgencias.
- [ ] **PWA con modo offline** para consultar sin conexión y "Añadir a pantalla de inicio".
- [ ] **Nuevos tratamientos:** odontopediatría, post-extracción, implantes, blanqueamiento, higiene general.
- [ ] Videos cortos con subtítulos (técnica real de cepillado y colocación de elásticos).
- [ ] CMS headless para que las clínicas o el equipo editen contenido sin programar, conservando el flujo de revisión clínica.
- [ ] Otros idiomas (portugués, inglés).
- [ ] Recordatorios opt-in sin cuenta: por ejemplo, un calendario `.ics` para cambiar alineadores o elásticos.

---

## Decisiones abiertas vinculadas

| ID  | Decisión                                                                   | Debe resolverse antes de        |
| --- | -------------------------------------------------------------------------- | ------------------------------- |
| D1  | Hosting: Vercel Pro o Cloudflare Pages / Netlify                           | Fase 3                          |
| D2  | Datos de la Dra. Lorena para el sello y valores de los parámetros clínicos | Fase 3 (bloquea el lanzamiento) |
| D3  | Validación legal: Ley 35 de 1989 y Ley 1581 de 2012                        | Fase 3                          |
| D4  | Dominio (sugerido: `guia.odontosanchezquintero.com`)                       | Fase 3                          |
| D5  | Producción de ilustraciones (freelance o interno)                          | Fase 1                          |
| D6  | Logo y colores: **resuelta (COE Dental)**                                  | —                               |
| D7  | Dirección de diseño: **resuelta (A + B)**                                  | —                               |
| D8  | Datos de contacto: **resuelta**                                            | —                               |
