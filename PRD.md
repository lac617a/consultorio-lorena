# PRD — Guía de ortodoncia de la Clínica Odontológica Sánchez Quintero

> Guía visual e interactiva para los pacientes de ortodoncia de la Clínica Odontológica Sánchez Quintero (Bucaramanga). Sin registro, desde un código QR.
>
> _OrtoGuía_ queda como nombre interno del proyecto (repositorio y código).

|                             |                                                                                                                                              |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Producto**                | Guía de ortodoncia de la **Clínica Odontológica Sánchez Quintero** (marca del logo: **COE Dental**, clínica de ortodoncia y estética dental) |
| **Clínica**                 | Calle 33 # 28-18, barrio La Aurora, Bucaramanga, Santander, Colombia                                                                         |
| **Versión del documento**   | 0.3 — marca oficial (COE Dental · Clínica Odontológica Sánchez Quintero) y trato de usted                                                    |
| **Fecha**                   | 2026-09-28                                                                                                                                   |
| **Estado**                  | En definición                                                                                                                                |
| **Documentos relacionados** | [roadmap.md](roadmap.md) · [CLAUDE.md](CLAUDE.md) · [docs/content-research.md](docs/content-research.md)                                     |

---

## 1. Resumen y problema

Al iniciar una ortodoncia, el paciente necesita aprender muchas cosas de golpe:

- cómo cepillarse con brackets y qué cepillo usar;
- qué puede comer y qué no;
- cómo cuidar el aparato;
- qué hacer si algo se rompe o molesta;
- qué son las ligas de colores y cómo elegirlas.

Hoy esa información se entrega en **folletos impresos que nadie lee** y **PDFs que nadie descarga**. El resultado:

- **Peor higiene:** placa alrededor de los brackets, manchas blancas permanentes (descalcificación), caries y encías inflamadas.
- **Más roturas:** brackets despegados por comer alimentos duros o pegajosos. Esto genera urgencias no programadas y **alarga el tratamiento**.
- **Llamadas y consultas repetitivas** a la clínica con preguntas que ya estaban en el folleto.
- **Ansiedad** del paciente en los primeros días: dolor, llagas, un alambre que pica.

## 2. Visión y propuesta de valor

**"Escanea, entiende y cuida tu ortodoncia en 2 minutos."**

Es un sitio web **mobile-first** de la **Clínica Odontológica Sánchez Quintero** al que el paciente llega escaneando un **código QR** que le entregan en el consultorio. El sitio:

- **No pide registro, ni app, ni datos personales.** Abre y funciona.
- **Enseña con imágenes, pasos cortos y animaciones**, no con párrafos.
- Es **útil en el momento exacto**: "me pica un alambre", "¿puedo comer esto?", "¿qué color de ligas elijo?".
- Tiene **contenido clínico respaldado por fuentes** (AAO, BOS, NHS, ADA) y **revisado por un ortodoncista**.
- Lleva la **identidad del consultorio** (nombre, logo y colores) y sus datos de contacto, para que el paciente sepa a quién escribir si algo pasa.
- Es **educativo, no publicitario**: no promociona servicios ni precios. Esto también responde a la Ley 35 de 1989 (ver §11, D3).
- La arquitectura sigue siendo configurable (datos del consultorio y parámetros clínicos en archivos), por si más adelante se quiere ofrecer a otras clínicas.

## 3. Usuarios

Pacientes de la Clínica Odontológica Sánchez Quintero en Bucaramanga y su área metropolitana, y sus familias.

| Persona                                       | Contexto                                                                   | Qué necesita                                                                                    |
| --------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Adolescente con brackets** (12–17)          | Acaba de ponerse brackets; lo que más le interesa son los colores de ligas | Contenido rápido, visual y "cool"; saber qué no comer; elegir colores                           |
| **Adulto con brackets o alineadores** (25–45) | Trabaja y come fuera; le preocupan la estética y el tiempo                 | Rutina de higiene eficiente, cuidado de alineadores, qué hacer ante una urgencia                |
| **Madre o padre de un paciente infantil**     | Supervisa la higiene de su hijo o hija                                     | Pasos claros para enseñar, lista de alimentos, cuándo llamar a la clínica                       |
| **Adulto mayor**                              | Menos familiaridad digital, vista cansada                                  | Letra grande, botones grandes, poco texto por pantalla                                          |
| **Dra. Lorena y equipo del consultorio**      | Entregan el QR al iniciar el tratamiento                                   | Menos urgencias evitables, mejor higiene y pacientes informados sin invertir tiempo de consulta |

## 4. Objetivos y métricas

### Objetivos de producto

1. Que el paciente **consulte la información** (lo que no ocurre con folletos ni PDFs).
2. Que **entienda y aplique** la técnica de cepillado y las reglas de alimentación.
3. Que **sepa qué hacer ante una urgencia** sin llamar a la clínica por cosas que puede resolver en casa.

### Métricas (analítica sin cookies, por consultorio vía UTM)

| Métrica                                  | Cómo se mide                                                                                                                |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Escaneos de QR por consultorio           | Visitas con `utm_source=qr` y `utm_campaign=<consultorio>`                                                                  |
| Finalización de la guía de cepillado     | Evento `brushing_completed` (llegó al último paso)                                                                          |
| Uso del simulador de ligas               | Eventos `color_picker_used` y `color_design_shared`                                                                         |
| Uso del triage de urgencias              | Evento `emergency_option_selected` con el tipo                                                                              |
| Páginas por sesión y visitas recurrentes | Analítica estándar                                                                                                          |
| Tráfico orgánico                         | Impresiones, clics, CTR y posición media por página en Google Search Console; visitas con `referrer` de buscadores en Umami |
| Resultado clínico (piloto)               | Encuesta cualitativa a la clínica: ¿menos urgencias por roturas? ¿menos preguntas repetidas?                                |

### Objetivos técnicos

- Core Web Vitals en Android de gama baja con 4G: **LCP < 2.5 s, INP < 200 ms, CLS < 0.1**.
- JavaScript en la primera carga **menor de ~100 KB**.
- **0 formularios, 0 datos personales, 0 cookies.**
- Lighthouse de accesibilidad de **95 o más** en todas las páginas.

## 5. Alcance del MVP: módulos de contenido

Alcance: **solo ortodoncia**. Cubre brackets metálicos, estéticos y autoligables, alineadores, retenedores y elásticos. Cada módulo combina texto breve, ilustración o animación y, cuando aporta valor, una interacción. Los datos clínicos salen de [docs/content-research.md](docs/content-research.md).

### 5.1 Empieza aquí

- Pantalla de entrada desde el QR: bienvenida más la pregunta **"¿Qué tratamiento tienes?"** (brackets metálicos · estéticos · autoligables · alineadores · ya terminé, uso retenedor).
- La elección **personaliza el recorrido**: oculta lo que no aplica (por ejemplo, las ligas para autoligables y alineadores) y ordena los módulos. Se guarda en `localStorage`.
- Accesos rápidos siempre visibles: **Urgencias**, **¿Puedo comer esto?**, **Cómo cepillarme**.

### 5.2 Primeros días

- Qué es normal: sensibilidad y dientes algo flojos de **3 a 5 días**, tras la colocación y tras cada ajuste.
- Dieta blanda para esos días, con ejemplos visuales.
- **Cera de ortodoncia paso a paso** (6 pasos ilustrados).
- Llagas: enjuague de agua tibia con sal y cera sobre el bracket que roza.
- Dolor: _"Pregunte a su ortodoncista qué analgésico puede tomar."_ Sin nombres de medicamentos ni dosis.
- Cuándo **no** es normal: dolor intenso o persistente, o encías muy hinchadas → contactar a la clínica.

### 5.3 Cepillado paso a paso (módulo estrella)

- **Animación SVG de 7 pasos:**
  1. Enjuagar.
  2. Cepillo a 45° hacia la encía.
  3. Por encima del bracket.
  4. Por debajo del bracket.
  5. Cepillo interdental bajo el arco.
  6. Hilo dental con enhebrador o irrigador.
  7. Revisar en el espejo y escupir sin enjuagar.
- Controles **"Anterior / Siguiente"** con indicador **"Paso 2 de 7"**. No depende solo del scroll.
- **Temporizador de 2 minutos** opcional por cuadrantes, con feedback visual.
- Frecuencia recomendada (parámetro clínico configurable).

### 5.4 Tu kit de higiene

- Tarjetas visuales de cada herramienta:
  - cepillo ortodóntico en V;
  - cepillo interdental;
  - cepillo unipenacho;
  - cepillo eléctrico con cabezal de ortodoncia;
  - enhebrador y Superfloss;
  - irrigador bucal;
  - pasta con flúor (1 350–1 500 ppm);
  - enjuague con flúor;
  - pastillas reveladoras.
- Cada tarjeta explica **para qué sirve**, **cómo se usa** (mini paso a paso) y **cada cuánto se cambia**.
- **Sin marcas comerciales.**

### 5.5 Alimentos

- **Semáforo** 🔴 Evitar · 🟡 Con cuidado (cortar en trozos) · 🟢 Sí. Iconos de alimentos comunes en LATAM (elote, tortilla tostada, palomitas, gomitas, etc.).
- Bebidas: refrescos, jugos, agua; el popote como aliado.
- Sección para **brackets estéticos**: alimentos que manchan.
- **Mini-juego "¿Puedo comer esto?"** (fase 2): tarjeta de alimento, el paciente responde y recibe una explicación.

### 5.6 Ligas de colores

- Qué son las ligas y en qué se **diferencian de los elásticos intermaxilares**. Se cambian en cada ajuste.
- **Simulador de colores:**
  - Ilustración SVG de la sonrisa con brackets tocables (objetivos de 44 px o más).
  - Paleta con **nombre de cada color en texto**.
  - Atajos: rellenar todo, solo arriba, solo abajo, alternar, limpiar.
  - Presets temáticos: fiestas patrias, Navidad, equipos, etc.
  - **Pista en vivo:** "tus dientes se verán más blancos" o "cuidado: el blanco se mancha".
  - El diseño se guarda en `localStorage`.
  - **Compartir** con la Web Share API; el diseño va codificado en el hash de la URL (`#c=...`).
  - Mensaje final: _"Muéstraselo a tu ortodoncista en tu próximo control."_
- Consejos: colores oscuros o fríos aclaran los dientes; blanco y transparente se manchan; amarillo y naranja amarillean.
- Oculto para autoligables y alineadores.

### 5.7 Elásticos intermaxilares

- Qué son y por qué importan.
- Colocación en **5 pasos ilustrados**.
- Horas de uso, qué hacer al comer y frecuencia de cambio (parámetros clínicos configurables).
- **Llevar siempre repuestos.** No usar más de los indicados.

### 5.8 Urgencias

- Triage **"¿Qué te pasó?"** con botones grandes e ilustrados:
  - alambre que pica;
  - bracket suelto;
  - banda o aparato suelto;
  - liga perdida;
  - elástico perdido o sin repuestos;
  - alineador o retenedor roto o perdido;
  - dolor o llagas.
- Cada opción muestra **qué hacer en casa** (pasos) y un **nivel de urgencia** con icono y texto, nunca solo color:
  - Puede esperar a tu cita.
  - Llama pronto a tu clínica.
  - Ve a urgencias.
- Bloque destacado de **emergencia médica real**: sangrado que no para, dificultad para respirar o tragar, golpe fuerte en la cara, hinchazón con fiebre.
- **Kit de emergencia en casa** en formato checklist.

### 5.9 Alineadores

- Uso de 22 h al día (configurable) y cuándo quitarlos.
- Limpieza paso a paso: agua fría, cepillo suave, jabón. **Nunca** agua caliente ni pasta.
- Estuche, mascotas y attachments.
- Cambio de alineador (configurable).
- Adaptación del habla: 3–5 días.

### 5.10 Retenedores

- Retenedor fijo y removible (Hawley, Essix).
- Pauta de uso a largo plazo (configurable).
- Limpieza (lo que **nunca** hay que hacer) y cuidados.
- Mensaje clave: **"el retenedor es de por vida"**. Los dientes se mueven toda la vida.

### 5.11 Deportes e instrumentos

- Protector bucal: tipos, cuidado y qué hacer si se rompe.
- Instrumentos de viento: qué esperar y consejos para practicar.

### 5.12 Tus citas de control

- Qué pasa en un ajuste (6 pasos): **"aquí eliges tus colores"**.
- Molestias posteriores.
- Seguir yendo al dentista general.
- Faltar a citas alarga el tratamiento.

### 5.13 Mitos y preguntas frecuentes

- Mitos contra realidades, en formato de tarjetas que se voltean.
- Preguntas frecuentes en acordeón.

### 5.14 Tu consultorio

- Bloque presente en el inicio, en Urgencias y en el pie de página: nombre, dirección (Calle 33 # 28-18, La Aurora, Bucaramanga), enlace "Cómo llegar" (Google Maps), horario y teléfono.
- **Botón de WhatsApp** del consultorio en Urgencias, con un mensaje prellenado según la urgencia ("Hola, se me despegó un bracket"). El mensaje no incluye datos del paciente; el paciente decide qué enviar.
- Datos del consultorio en un único archivo de configuración (`content/clinic.json`), no repartidos por el código.

### 5.15 Páginas de soporte

- **Aviso de privacidad** (sin datos personales, analítica sin cookies).
- **Créditos** de ilustraciones e iconos.
- **Fuentes y revisión clínica**: metodología, revisores y bibliografía.

## 6. Fuera de alcance (MVP)

- Registro, login o cuentas de usuario.
- Agenda de citas, recordatorios, notificaciones push.
- Historial clínico, fotos del paciente, cualquier dato de salud.
- Chat o consultas en línea.
- Versión para otras clínicas (white-label): opcional en la fase 4.
- Agenda en línea, precios o promociones: el sitio es educativo (ver D3).
- Otros tratamientos (implantes, blanqueamiento, endodoncia, odontopediatría general).
- App nativa. Tampoco hay PWA con modo offline en el MVP; solo un manifest básico.
- Idiomas distintos al español.

## 7. Requisitos no funcionales

### Plataforma y rendimiento

- **Mobile-first.** Diseño base a 360 px de ancho. Escritorio como mejora progresiva.
- Probado en **Android de gama baja** con 4G y en iOS Safari.
- Páginas generadas de forma estática (SSG). El contenido se renderiza en el servidor y solo las piezas interactivas cargan JavaScript.
- Imágenes con dimensiones explícitas, AVIF/WebP y carga diferida bajo el pliegue. Las ilustraciones principales son SVG en línea.

### Accesibilidad (WCAG 2.2 AA)

- Texto base de **18 px**, interlineado de ~1.6 y sin pesos tipográficos finos.
- Control de tamaño de texto **A / A+**.
- **Objetivos táctiles de 44 px o más.**
- Contraste de 4.5:1 en texto y 3:1 en iconos y bordes.
- **Nunca comunicar solo con color.** El semáforo y la urgencia llevan icono y texto; cada color de liga lleva su nombre.
- **Respetar `prefers-reduced-motion`**: sin animaciones de desplazamiento; se muestra el estado final.
- Toda animación se puede pausar. Nada parpadea más de 3 veces por segundo.
- Texto alternativo descriptivo en cada ilustración de pasos.
- `lang="es"`, navegación por teclado y foco visible (que no quede oculto por barras fijas).

### Contenido y lenguaje

- **Español de Colombia**, con trato de **usted** (decisión de la clínica: es lo habitual en Santander, también con pacientes jóvenes).
- Vocabulario colombiano: _pitillo_ (no popote), _gaseosa_ (no refresco), _maní_, _mazorca_, _crema dental_, _seda dental_ o _hilo dental_, _cita de control_.
- Nivel de lectura de ~6.º grado: frases cortas y **una idea por tarjeta**.
- Terminología estándar: ver el glosario en [docs/content-research.md](docs/content-research.md#glosario-de-terminología-latinoamérica).
- Sin marcas comerciales de productos.

### SEO

El QR es el canal principal. La búsqueda orgánica es el **canal secundario**: da visibilidad al consultorio en Bucaramanga con contenido útil, no con publicidad.

**SEO local**

- Datos estructurados `Dentist` (subtipo de `LocalBusiness`) con nombre, dirección, teléfono, horario y coordenadas.
- Nombre, dirección y teléfono **idénticos** en el sitio, en Google Business Profile y en directorios (Doctoralia, Top Doctors).
- Enlazar el sitio desde el perfil de Google Business del consultorio.
- Búsquedas locales a considerar: "ortodoncia Bucaramanga", "brackets Bucaramanga", "ortodoncista La Aurora". Siempre con contenido educativo, no promocional.

Es contenido de salud, un tema que Google trata como YMYL ("Your Money or Your Life"), y lo evalúa con un estándar más alto de confianza (E-E-A-T).

**Intenciones de búsqueda objetivo** (hipótesis; hay que validarlas con una herramienta de palabras clave antes de la fase 3):

| Página                         | Búsquedas objetivo                                                      |
| ------------------------------ | ----------------------------------------------------------------------- |
| `/cepillado`                   | "cómo cepillarse con brackets", "cepillo para brackets"                 |
| `/alimentos`                   | "qué no puedo comer con brackets", "comida para brackets primeros días" |
| `/ligas`                       | "colores de ligas para brackets", "qué color de ligas me queda"         |
| `/urgencias`                   | "se me despegó un bracket", "me pica el alambre de los brackets"        |
| `/primeros-dias`               | "cuánto duele ponerse brackets", "cera para brackets cómo se usa"       |
| `/alineadores`, `/retenedores` | "cómo limpiar alineadores", "cuánto tiempo usar retenedor"              |

**Requisitos técnicos**

- **Metadatos por página** con la Metadata API de Next.js (`generateMetadata`):
  - `title` único de 60 caracteres o menos, con el formato "Tema | OrtoGuía";
  - `description` de 120–155 caracteres;
  - `metadataBase` global.
- **URL canónica** en cada página, sin parámetros:
  - las visitas con `utm_*` (QR) apuntan su `canonical` a la URL limpia;
  - las rutas `/q/<id>` responden con redirect 308 y nunca se indexan.
- **`robots.txt`:**
  - bloquea `/q/`;
  - apunta al `sitemap.xml`;
  - los despliegues de preview y staging llevan `noindex` (encabezado `X-Robots-Tag` o metadato).
- **`sitemap.xml`** generado desde Velite, con `lastModified` tomado de `reviewedAt`.
- **Open Graph y Twitter Cards:**
  - imagen de 1200×630 por módulo, generada con `next/og` o diseñada;
  - así los enlaces se ven bien al compartirse por **WhatsApp**, el canal habitual en Colombia;
  - `og:locale` = `es_LA`.
- **Datos estructurados (JSON-LD):**
  - `MedicalWebPage` en cada módulo, con `reviewedBy`, `lastReviewed` y `audience` = paciente;
  - `Organization` y `WebSite` en la home;
  - `BreadcrumbList` en todas las páginas;
  - `FAQPage` en mitos y preguntas frecuentes.
  - No depender de `HowTo`: Google retiró esos resultados enriquecidos.
- **Contenido indexable en el HTML inicial.** Los textos de los módulos interactivos se renderizan en el servidor: pasos del cepillado, lista de alimentos, opciones del triage y consejos de colores. La interacción es una mejora encima de ese HTML, no el único acceso al contenido.
- **Estructura semántica:**
  - un solo `h1` por página y jerarquía de encabezados correcta;
  - `alt` descriptivo en ilustraciones;
  - nombres de archivo de imagen en español (`cepillado-45-grados.svg`).
- **Enlazado interno:** cada módulo enlaza a 2–3 módulos relacionados (por ejemplo, Alimentos → Urgencias → Cera). Accesos rápidos fijos.
- **URLs** en español y minúsculas, sin barra final, estables. Si una URL cambia, se añade un redirect 301.
- **Página 404** útil, con accesos a Urgencias, Cepillado y Alimentos.
- **Core Web Vitals** dentro de objetivo: también son señal de ranking (ver §4).
- **Google Search Console:** verificar la propiedad del dominio, enviar el sitemap y vigilar la indexación y la cobertura.

**Confianza (E-E-A-T)**

- Revisor clínico con nombre, especialidad y cédula, más fechas de revisión visibles (§8).
- Fuentes citadas al pie de cada página.
- Página "Fuentes y revisión clínica" que explique la metodología.
- Contenido actualizado al menos cada 12 meses.

### Privacidad

- Sin formularios ni datos personales o de salud.
- Analítica **sin cookies** (no requiere banner de consentimiento).
- Los parámetros UTM solo identifican el **consultorio**, nunca al paciente.
- `localStorage` solo guarda preferencias locales: tratamiento elegido, tamaño de texto, diseño de ligas.
- Publicar una **política de tratamiento de datos** conforme a la Ley 1581 de 2012 (habeas data), aunque el sitio no recoja datos personales.

## 8. Gobernanza clínica del contenido

1. **Fuente única:** toda afirmación clínica debe estar en [docs/content-research.md](docs/content-research.md) o citar una fuente autorizada (AAO, BOS, NHS, ADA u otra revisada por pares).
2. **Revisión obligatoria:** cada página tiene metadatos obligatorios. El build falla si faltan.
   - `reviewedBy`: nombre, especialidad y registro profesional. Revisora: **Dra. Lorena**, ortodoncista del consultorio.
   - `reviewedAt` y `nextReview`: revisión cada 12 meses como máximo.
   - `sources`: lista de URLs.
3. **Sello visible:** "Revisado por … · Última revisión: DD/MM/AAAA".
4. **Aviso clínico en cada página:** _"Esta información es educativa y no sustituye la consulta con su ortodoncista. Si tiene dolor intenso, sangrado, un alambre que lastima o un aparato suelto, contacte a su clínica."_
5. **Parámetros clínicos configurables.** Cuando las fuentes discrepan, el valor no se escribe en el texto: vive en un archivo de configuración (`content/clinical-params.json`). Hoy tiene un único valor por defecto validado por el revisor; en la fase 4 cada clínica tendrá el suyo.
   - Frecuencia de cepillado y momento del enjuague con flúor.
   - Intervalo entre citas de control.
   - Horas de uso de alineadores y frecuencia de cambio.
   - Elásticos: horas, qué hacer al comer, frecuencia de cambio.
   - Pauta de uso del retenedor.
   - Chicle.
6. **Medicamentos:** nunca se nombran fármacos ni dosis. Siempre _"pregunta a tu ortodoncista"_.
7. **Nada de promesas ni propaganda:** sin "garantizado", sin antes y después, sin testimonios, sin precios ni promociones, sin comparaciones con otros consultorios (Ley 35 de 1989, arts. 51 a 53).
8. **Ilustraciones clínicas** (posición de brackets, ángulos de cepillado, colocación de elásticos): también pasan por revisión clínica.

## 9. Experiencia y diseño

### Principios

- **Mostrar, no contar.** Cada concepto tiene una imagen o animación.
- **Pasos cortos y numerados.**
- **Respuestas rápidas.** Urgencias y alimentos se alcanzan en un toque desde cualquier página.
- **Tono cálido, cercano y tranquilizador.** Sin tecnicismos ni tono alarmista.
- **Divertido, sin ser infantil.** Atractivo para adolescentes y respetuoso con los adultos.

### Sistema visual

- **Folleto ilustrado (D9, 06/10/2026):** papel gris claro, paneles en azul lavanda, tinta casi negra, títulos con trazo de resaltador y garabatos a mano. Simple, fácil de leer y con pocas animaciones. El lavanda claro solo decora; texto y botones usan un azul más oscuro de la misma familia. Colores de estado accesibles para el semáforo y la urgencia. Dirección visual en [docs/design-references.md](docs/design-references.md).
- Tipografía: **Permanent Marker** (marcador a mano) solo para títulos cortos y **Atkinson Hyperlegible Next** (máxima legibilidad) para el texto.
- **Ilustraciones SVG propias** estilo folleto (contorno de tinta y relleno lavanda desplazado) de dientes, brackets, arco, ligas, elásticos y herramientas, con capas nombradas.
- Personas y escenas: unDraw o Humaaans, recoloreadas a la marca.
- Iconos: Lucide para la interfaz y Healthicons o Tabler para los dentales.
- Animación: solo parallax suave con CSS (animaciones ligadas al scroll) en garabatos e ilustraciones; el texto nunca se mueve. Sin carruseles de pasos, celebraciones ni animaciones en bucle. Lottie se reserva para 1–2 animaciones decorativas.

### Componentes clave

| Componente                           | Uso                                                                                          |
| ------------------------------------ | -------------------------------------------------------------------------------------------- |
| `Cards`                              | Secuencias ilustradas en tarjetas numeradas, todas visibles (cepillado, elásticos, limpieza) |
| `BrushingScene`                      | SVG estático de cada momento de la técnica de cepillado                                      |
| `FoodTrafficLight`                   | Semáforo filtrable de alimentos                                                              |
| `FoodQuiz`                           | Mini-juego "¿Puedo comer esto?"                                                              |
| `BracesColorPicker`                  | Simulador de ligas de colores                                                                |
| `EmergencyGuide`                     | Desplegables nativos "¿Qué le pasó?" con acción y nivel de urgencia                          |
| `FlipCard`                           | Mitos contra realidades                                                                      |
| `ClinicalDisclaimer` y `ReviewStamp` | Aviso y sello de revisión en cada página                                                     |
| `TextSizeToggle`                     | Control A / A+                                                                               |

## 10. Arquitectura técnica (resumen)

| Capa                 | Elección                                                                                                                                                                                                                                                                                                                                |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework            | **Next.js 16** (App Router), páginas estáticas (SSG)                                                                                                                                                                                                                                                                                    |
| Estilos              | **Tailwind CSS v4** con design tokens                                                                                                                                                                                                                                                                                                   |
| Animación            | **Solo CSS**: parallax con `animation-timeline: view()`, desactivado con "reducir movimiento" y sin soporte del navegador. Sin librería de animación                                                                                                                                                                                    |
| Contenido            | **MDX y JSON en el repo**, tipado y validado con **Velite** (esquemas Zod; metadatos de revisión obligatorios)                                                                                                                                                                                                                          |
| Animaciones Lottie   | `@lottiefiles/dotlottie-react`, carga diferida, WASM servido desde el propio sitio. Solo decorativas                                                                                                                                                                                                                                    |
| Iconos               | `lucide-react` y Healthicons/Tabler (SVG)                                                                                                                                                                                                                                                                                               |
| Analítica            | **Umami Cloud** (sin cookies, reporta UTM, eventos personalizados)                                                                                                                                                                                                                                                                      |
| Códigos QR           | Script de build con `qrcode` que genera SVG para impresión. Rutas cortas `/q/<id>` redirigen a la URL con UTM, así se cambia el destino sin reimprimir                                                                                                                                                                                  |
| Hosting              | **Por decidir** (ver §11)                                                                                                                                                                                                                                                                                                               |
| Calidad de código    | **ESLint** (flat config con `eslint-config-next`), **orden de imports** con `eslint-plugin-import` (`import/order` como error), **Prettier** con `prettier-plugin-tailwindcss`, **Husky** con hooks `pre-commit` (lint-staged), `commit-msg` (commitlint, Conventional Commits) y `pre-push` (typecheck y formato), TypeScript estricto |
| Calidad del producto | Lighthouse CI con presupuestos de rendimiento, pruebas de componentes interactivos                                                                                                                                                                                                                                                      |

## 11. Riesgos y decisiones abiertas

| #   | Tema                            | Detalle                                                                                                                                                                                                                                                                                                                                                                               | Responsable | Estado                              |
| --- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------- |
| D1  | **Hosting**                     | Vercel Hobby prohíbe el uso comercial. Opciones: **Vercel Pro** (~US$20 al mes, mejor integración con Next.js, redirects y optimización de imágenes) o **Cloudflare Pages / Netlify** (plan gratuito que permite uso comercial, requiere más configuración). En desarrollo se puede usar Vercel Hobby para previews.                                                                  | Producto    | Abierta, antes de la fase 3         |
| D2  | **Revisor clínico**             | Resuelta: **Dra. Lorena Sánchez Lázaro**, Ortodoncia y Odontología Estética. Faltan universidad y registro profesional para el sello (la clínica aún no los tiene a mano), y que resuelva la tabla de discrepancias.                                                                                                                                                                  | Dra. Lorena | Resuelta; faltan datos              |
| D3  | **Normativa colombiana**        | Ley 35 de 1989 (ética odontológica): el art. 51 considera incompatible la propaganda; el art. 53 prohíbe avalar publicaciones sin respaldo científico o con fines de promoción personal. Por eso el sitio es educativo y cita fuentes. Datos personales: Ley 1581 de 2012. **Validar con asesoría legal o con el Tribunal de Ética Odontológica de Santander** antes del lanzamiento. | Legal       | Abierta, antes de la fase 3         |
| D4  | **Marca y dominio**             | Resuelta la marca: **Clínica Odontológica Sánchez Quintero**, nombre de su web oficial ([odontosanchezquintero.com](https://odontosanchezquintero.com), WordPress.com), con el logo **COE Dental**. Dominio sugerido: un subdominio como `guia.odontosanchezquintero.com`, que mantiene la marca y el SEO en el mismo dominio.                                                        | Producto    | Dominio abierto, antes de la fase 3 |
| D6  | **Identidad visual**            | Resuelta: logo COE Dental tomado de su web (`public/brand/`, PNG de 2117×1128 con transparencia). Paleta de oro rosa muestreada del logo; el tono del logo solo decora por contraste. Ideal a futuro: el logo en SVG.                                                                                                                                                                 | Clínica     | Resuelta                            |
| D7  | **Dirección de diseño**         | Resuelta: base editorial "Cuaderno ilustrado" (A) con la mecánica de juego (B) en los interactivos. Ver [docs/design-references.md](docs/design-references.md).                                                                                                                                                                                                                       | Producto    | Resuelta                            |
| D8  | **Datos de contacto**           | Resuelta: teléfono y WhatsApp +57 320 6243002 (el mismo número que usa su web para WhatsApp); lunes a sábado solo con cita, domingo cerrado. Perfil de Google Maps: "Odontologia Sanchez Quintero" (enlace por CID en `content/clinic.json`). **Ojo SEO local:** ese nombre difiere del de la web ("Clínica Odontológica Sánchez Quintero"); conviene unificarlos.                    | Clínica     | Resuelta                            |
| D5  | **Producción de ilustraciones** | Se necesita un set SVG propio y consistente. Opciones: ilustrador freelance, o bocetos con IA redibujados en vector. Toda ilustración clínica requiere revisión.                                                                                                                                                                                                                      | Diseño      | Abierta, fase 0–1                   |
| R1  | **Precisión clínica**           | Un error en una técnica o en una urgencia puede dañar al paciente. Mitigación: fuente única, revisión obligatoria, parámetros configurables y aviso clínico.                                                                                                                                                                                                                          | —           | Mitigado por proceso                |
| R2  | **Licencias de assets**         | Storyset y Servier exigen atribución. Mitigación: priorizar CC0 y SVG propios, y mantener `CREDITS.md`.                                                                                                                                                                                                                                                                               | —           | Mitigado por proceso                |
| R3  | **Rendimiento en gama baja**    | Las animaciones pueden degradar el INP. Mitigación: SVG en lugar de video, solo `transform` y `opacity`, islas de cliente mínimas y pruebas en dispositivo real.                                                                                                                                                                                                                      | —           | Mitigado por diseño                 |
| R4  | **Adopción**                    | Si el QR no se entrega, no hay usuarios. Mitigación: material impreso atractivo en el consultorio, entregarlo en la cita de montaje y métricas por punto de entrega (recepción, sillón, tarjeta).                                                                                                                                                                                     | Consultorio | Seguimiento en el piloto            |
