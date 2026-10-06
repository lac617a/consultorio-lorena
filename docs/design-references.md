# Referencias y dirección de diseño

> Estado: **folleto ilustrado** (decisión D9, 06/10/2026). Reemplaza a la mezcla A + B (D7, 28/09/2026): la clínica la encontró abrumadora (pasos, animaciones, mecánica de juego) y pidió algo más parecido a un folleto tríptico, fácil de leer y con parallax suave. Las secciones de abajo se conservan como historial.

## Diagnóstico: por qué el diseño actual se siente genérico

- **Paleta menta o turquesa:** es el color "por defecto" de lo dental. La competencia local usa azul y blanco.
- **Estructura de plantilla:** hero centrado, lista de tarjetas iguales con borde fino, íconos de librería.
- **Ilustración pequeña y sin personalidad:** no hay un estilo propio reconocible.
- **Una sola tipografía** sin contraste entre títulos y texto.

## Competencia local (Bucaramanga, septiembre 2026)

Los sitios revisados son casi todos iguales. Ninguno tiene contenido educativo para después de ponerse los brackets: cepillado, alimentos, urgencias o colores de ligas. Todo es marketing de servicios.

- **Ortodoncia Bucaramanga:** azul y blanco, fotos del consultorio, tarjetas de servicios y botón "Agendar cita".
- **Dental Center Bga:** azul, imágenes de relleno, precios y formulario de contacto.

**Oportunidad:** ser el único consultorio de la zona con una guía útil y con personalidad propia.

## Referencias

| Referencia                                                                                       | Qué tomar                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Headspace](https://www.headspace.com)                                                           | Ilustraciones suaves y redondeadas que hacen amable un tema de salud; estructura clara por secciones.                                                                              |
| [Oscar Health, sistema de ilustración](https://oscardesign.team/)                                | Ilustraciones "a mitad de camino entre ícono e ilustración": simples, directas, divertidas pero adultas y con trazo hecho a mano. Ideal para los pasos.                            |
| [Duolingo](https://www.duolingo.com)                                                             | Botones gruesos con "sombra" inferior, barras de progreso, celebración al terminar, microanimaciones. Para el quiz de alimentos, el simulador de ligas y el progreso de los pasos. |
| Instrucciones de montaje de IKEA                                                                 | Pasos casi sin palabras: una imagen, una acción. Numeración grande.                                                                                                                |
| [One Medical](https://www.onemedical.com)                                                        | Tipografía grande y mucho aire: calma y confianza para adultos.                                                                                                                    |
| [The Orthodontist & Co.](https://theorthodontistandco.com) y [Ortho Co.](https://orthoco.com.au) | Ortodoncia con estética boutique: tipografía refinada y animaciones sutiles.                                                                                                       |
| Simuladores de colores de brackets (ver `content-research.md`)                                   | Patrón "elige color y toca el bracket", atajos de relleno y temas.                                                                                                                 |

## Direcciones propuestas

### A · Cuaderno ilustrado (editorial cálido)

- **Fondo:** crema, no blanco. **Texto:** tinta oscura cálida. **Acentos:** los colores del consultorio.
- **Títulos:** serif con carácter, como Fraunces. **Texto:** sans humanista muy legible (Nunito o Atkinson Hyperlegible Next).
- **Ilustración:** contorno grueso con relleno desplazado (efecto de impresión), como un cuaderno dibujado a mano.
- **Números de paso** grandes en serif.
- **Transmite:** cercanía, confianza y algo hecho a mano, propio del consultorio. Funciona para adultos, madres y padres, y adultos mayores.

### B · Juego de sonrisas (lúdico)

- **Colores** saturados, **tipografía** redondeada (Fredoka o Baloo).
- **Botones** gruesos con sombra inferior, barra de progreso con estrellas y celebración al terminar.
- **Posible mascota** (un diente con brackets). Riesgo: es un cliché del sector y puede sentirse infantil para adultos.
- **Transmite:** diversión. Es muy atractivo para adolescentes.

### C · Clínica boutique (calma premium)

- **Fondo** blanco o gris muy claro, **tipografía** geométrica grande (Manrope), botones tipo píldora.
- **Ilustración** suave, de aspecto 3D. Requiere más trabajo de producción.
- **Transmite:** calma y prestigio. Se acerca a lo que ya hacen las clínicas grandes, así que se diferencia menos.

### Recomendación: A con las mecánicas de B

- **Base editorial cálida (A):** da confianza a todos los públicos y diferencia al consultorio.
- **Piezas interactivas con mecánica de juego (B):** simulador de ligas, "¿Puedo comer esto?", progreso y celebración al terminar el cepillado. Es donde está el público adolescente.
- **Sin mascota** al inicio. Se puede evaluar más adelante.

## Siguiente paso

1. Recibir el logo (SVG o PNG grande) y los colores del consultorio.
2. Elegir la dirección.
3. Aplicarla al inicio y a `/primeros-dias`, y revisarla en el celular antes de seguir con la fase 1.

## D9 · Folleto ilustrado (vigente)

**Referencia:** un folleto tríptico de servicios: fondo de papel gris claro, columna central lavanda, iconos dibujados a mano (contorno negro y relleno azul sobre un círculo claro), títulos en mayúsculas con trazo de resaltador, estrellas, destellos y zigzags. Mucho aire y párrafos cortos y centrados.

**Qué tomamos:**

- **Inicio de una sola página** con bandas que alternan papel y lavanda: portada → "Le ayudamos" → un panel por guía (dibujo, título resaltado, frase y enlace) → "Su clínica" (contactos).
- **Guías en paneles:** cada `##` del MDX abre un panel (blanco con borde de tinta o lavanda, alternados). Una idea por panel.
- **Nada de pasos navegables:** las secuencias van en listas numeradas o tarjetas, todas visibles.
- **Pocas animaciones:** solo parallax CSS en garabatos e ilustraciones. El texto no se mueve; con "reducir movimiento" o sin soporte, todo queda quieto.
- **Interactivos que quedan:** buscador de alimentos (cliente) y urgencias desplegables (`<details>` nativo, sin JavaScript).

**Sistema visual (`app/globals.css`):**

- **Color:** papel `canvas` #f2f2ef, tinta `ink` #1d1d22, `brand` azul lavanda: `brand-200` #c6cffb (paneles y resaltador), `brand-400` #6f82ea (ilustración, solo decoración), `brand-600` #3f4fc4 (botones, 6.7:1 con blanco), `brand-700` #323f9e (enlaces, 5.9:1 sobre lavanda). Foco en naranja (`focus` #c2410c) para que se distinga del azul.
- **Tipografía:** Permanent Marker para títulos cortos (`h1`, `h2`); Atkinson Hyperlegible Next para todo lo demás, también los `h3`.
- **Formas:** `.marker` (resaltador por línea), `.panel-lavender`, `.blob` (círculo irregular detrás de un dibujo), `.sticker`, botones píldora con contorno de tinta.
- **Ilustración:** contorno de tinta de 2,5 px y relleno lavanda desplazado 4 px (`components/illustrations/style.ts`). Portadas de guía en `guide-art.tsx`; garabatos en `doodles.tsx`.
- **Grano de papel** muy suave en el fondo (SVG en línea).
