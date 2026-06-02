# CAPTAS — Documento maestro de construcción web
### Para Cursor · Modo senior · Next.js 14 + GSAP + Lenis + Framer Motion + R3F puntual

> **Cómo usar este archivo:** pégalo completo en Cursor como contexto del proyecto (idealmente como `CAPTAS_WEB_MASTER.md` en la raíz). Cada sección de implementación está escrita como prompt ejecutable. Construye en orden. No improvises estética fuera de los tokens definidos aquí.

---

## 0. BRIEF — qué es Captas y qué debe lograr la web

**Captas es una agencia creativa full-service** con base territorial en la Región de Coquimbo (Limarí), operando a estándar global de craft. Estrategia + creatividad + producción audiovisual + diseño + desarrollo, bajo una sola voz.

**La web tiene un solo trabajo: hacer que un cliente —grande o chico— sienta en los primeros 5 segundos que está frente a algo de otro nivel, y que quiera trabajar con Captas antes de terminar de scrollear.**

Posicionamiento (la tesis que ninguna agencia top ocupa):
> *Craft de nivel mundial, nacido del territorio. La sensibilidad de un estudio de cine, la disciplina de una consultora de marca, la cercanía de un equipo que conoce su lugar.*

Referentes de nivel (no para copiar, para igualar en craft):
- **Immersive Garden** (motion cinematográfico, Agency of the Year Awwwards 2025)
- **Alright Studio** (full-service real, "no house style", cliente A24)
- **A24** (marca-como-cultura: misterio, curaduría, voz coherente)
- **Collins** (copy como diseño)
- **Aesop** (calma, lujo táctil, espacio negativo)

Audiencia dual que debe convencer:
- **Cliente grande** (minería, agroindustria, municipio, marca nacional): busca seriedad, casos, capacidad de ejecución a escala.
- **Cliente chico** (pyme, emprendedor, comercio local): busca cercanía, precio entendible, que no lo intimide.
La web resuelve esto con **base editorial sobria (autoridad) + momentos inmersivos puntuales (capacidad técnica)**. Ni frío ni saturado.

---

## 1. STACK TÉCNICO (definitivo)

```
Framework      Next.js 14 (App Router) + TypeScript
Estilos        Tailwind CSS + CSS variables (design tokens)
Motion BASE    Framer Motion (reveals, hover, microinteracciones, transiciones de página)
Smooth scroll  Lenis (inercia suave, base sobre la que viven todos los scroll effects)
Scroll FX      GSAP + ScrollTrigger — QUIRÚRGICO, solo donde Framer no llega
3D puntual     React Three Fiber + Drei (UN momento hero, no más)
Tipografía     next/font (self-hosted, sin FOUT)
Imágenes       next/image + blur placeholder
Formularios    react-hook-form + Zod + envío a Resend/Formspree
Deploy         Vercel
CMS (opcional) Sanity o contenido en /content como MDX
```

**Filosofía de stack (importante — leer antes de animar nada):**
El motor de motion por defecto es **Framer Motion**. Es lo que se usa para el 80% de las animaciones: reveals al entrar en viewport (`whileInView`), hover de cards, magnetic buttons, stagger de listas, transiciones de página (`AnimatePresence`). Limpio, declarativo, fácil de mantener.

**GSAP + ScrollTrigger se usa SOLO en los 2-3 momentos donde Framer realmente no alcanza**, y son estos:
1. **Parallax sincronizado** de las imágenes de casos (capas a distinta velocidad de scroll).
2. **Pin + scroll** de la sección Territorio (la imagen se "fija" mientras el texto pasa).
3. *(opcional)* galería horizontal o proceso pinneado si se decide incluir.
Fuera de esos casos, **no metas GSAP**. Si dudas entre Framer y GSAP para algo, usa Framer.

Reglas de stack:
- **Lenis es la base del scroll.** Se inicializa una sola vez en un provider raíz. Framer (`whileInView`) y GSAP ScrollTrigger se sincronizan con el scroll de Lenis — conectar ScrollTrigger a Lenis vía `lenis.on('scroll', ScrollTrigger.update)` y el `requestAnimationFrame` de Lenis. Si esto no está bien conectado, los scroll effects se desfasan; verificarlo antes de seguir.
- **R3F solo en el hero**, lazy-loaded con `dynamic(() => ..., { ssr: false })` y un fallback estático (gradiente mesh). Nunca bloquea el LCP.
- **Mobile-first siempre.** El motion pesado se degrada con `prefers-reduced-motion` y se simplifica bajo 768px (en móvil, GSAP pin/parallax se puede desactivar y dejar el contenido estático — no vale la pena el costo).
- Performance objetivo: **Lighthouse 90+ en todo**, LCP < 2.5s, CLS < 0.1.

---

## 2. DESIGN TOKENS (pegar en `globals.css` y `tailwind.config.ts`)

Territorio estético: **editorial cálido con base oscura cinematográfica.** Negro casi-negro, hueso, y un acento terracota/ocre que viene del paisaje del Limarí (tierra, no azul tech genérico).

```css
:root {
  /* — Color — */
  --c-ink:        #0A0A0A;   /* negro base, casi tinta */
  --c-ink-soft:   #16161A;   /* superficies oscuras elevadas */
  --c-bone:       #F4F0E8;   /* hueso / fondo claro editorial */
  --c-bone-dim:   #E6E0D4;   /* hueso apagado, divisores */
  --c-terra:      #C75B39;   /* acento terracota — del paisaje */
  --c-terra-deep: #9E3F25;   /* terracota profundo, hover */
  --c-clay:       #B89B7A;   /* arcilla / dorado tierra, detalles */
  --c-fog:        #8A8780;   /* gris cálido, texto secundario */
  --c-line:       rgba(244,240,232,0.12); /* líneas sobre oscuro */
  --c-line-dark:  rgba(10,10,10,0.10);    /* líneas sobre claro */

  /* — Tipografía — */
  --f-display: 'PP Editorial New', 'Times New Roman', serif; /* o Söhne/Reckless */
  --f-body:    'Söhne', 'Inter', system-ui, sans-serif;
  --f-mono:    'Söhne Mono', 'IBM Plex Mono', monospace;     /* labels, kicker */

  /* — Escala tipográfica (clamp, fluida) — */
  --t-hero:  clamp(3.5rem, 9vw, 9rem);    /* titular hero */
  --t-h1:    clamp(2.5rem, 6vw, 5.5rem);
  --t-h2:    clamp(2rem, 4vw, 3.5rem);
  --t-h3:    clamp(1.4rem, 2.4vw, 2rem);
  --t-body:  clamp(1rem, 1.15vw, 1.25rem);
  --t-small: 0.8125rem;
  --t-kicker:0.75rem;  /* mono, uppercase, tracking ancho */

  /* — Espacio (ritmo de 8) — */
  --s-section: clamp(6rem, 14vh, 12rem);   /* aire vertical entre secciones */
  --s-gutter:  clamp(1.25rem, 5vw, 6rem);  /* márgenes laterales */

  /* — Motion — */
  --ease-out:  cubic-bezier(0.16, 1, 0.3, 1);    /* expo out, el "caro" */
  --ease-io:   cubic-bezier(0.65, 0, 0.35, 1);
  --dur-fast:  0.4s;
  --dur-base:  0.8s;
  --dur-slow:  1.2s;

  /* — Grain & textura — */
  --grain-opacity: 0.04;
}
```

Notas sobre tipografía: si no tienes licencia de PP Editorial New / Söhne, alternativas gratis con el mismo carácter:
- Display serif editorial: **Fraunces** (variable, expresiva) o **Instrument Serif**.
- Body sans refinado: **Geist** o **Schibsted Grotesk** (NO Inter, NO Space Grotesk — están quemadas).
- Mono para kickers: **JetBrains Mono** o **Geist Mono**.

**Grain overlay global** (textura de película, da el toque cine/editorial). `position: fixed`, `pointer-events: none`, SVG noise o PNG tileable a `--grain-opacity`, `mix-blend-mode: overlay`.

---

## 3. ARQUITECTURA DE PÁGINAS

```
/                 Home (la pieza central — el 80% de la decisión pasa aquí)
/trabajo          Portafolio / casos (índice filtrable)
/trabajo/[slug]   Caso de estudio individual (formato editorial largo)
/estudio          Quiénes somos / filosofía / equipo / territorio
/servicios        Qué hacemos (las 5 capas full-service)
/contacto         Conversemos (form + datos)
```

Navegación: header minimal fijo, fondo transparente que gana fondo sólido al scrollear. Logo izquierda, menú derecha (Trabajo · Estudio · Servicios), botón "Conversemos" en terracota. Menú móvil: overlay fullscreen con transición de cortina (clip-path o translateY con stagger de items).

---

## 4. HOME — sección por sección (el corazón)

### 4.1 — Loader / intro (primera impresión, 1.5–2s máx)
Pantalla negra (`--c-ink`). El logotipo "CAPTAS" aparece letra por letra (stagger GSAP, `--ease-out`). Un contador 0→100 sutil en mono abajo. Al completar: cortina sube (clip-path inset) revelando el hero. **Solo en primera visita** (guardar flag en sessionStorage — ojo, en artifact de Claude no, pero en Cursor/prod sí).
> Esto es puro A24: el misterio antes del contenido. No lo saltes, define el tono.

### 4.2 — HERO (el momento de "otro nivel")
Full-bleed, fondo `--c-ink`. Composición editorial rota, no centrada:
- **Titular gigante** en display serif, `--t-hero`, hueso. Texto: dos líneas con tensión, ej:
  *"Marcas que se* ***quedan.*** *Historias que se* ***mueven."***
  (la palabra clave en terracota, o en itálica del serif).
- **Kicker** arriba en mono: `AGENCIA CREATIVA — LIMARÍ, CHILE / GLOBAL`
- **Momento inmersivo R3F** detrás o al lado: una geometría sutil reactiva al mouse (NO un objeto literal — algo abstracto: un plano de partículas, una malla que ondula como dunas/cordillera, distorsión sutil tipo displacement). Lazy-loaded, fallback = gradiente mesh estático.
- Texto del titular hace **split por palabras y reveal con mask** (cada palabra sube desde detrás de una línea invisible, stagger 0.08s).
- Scroll indicator abajo, mono, que late suave.

R3F del hero — spec mínima: plano con shader de ondas (o `MeshDistortMaterial` de Drei sobre una geometría plana), color `--c-ink-soft` con highlights `--c-terra` muy tenues, reacciona a `pointer` con lerp suave. **Performance: máx 60fps, pausa cuando no está en viewport.**

### 4.3 — Manifiesto / statement (calma después del impacto)
Cambio a fondo `--c-bone` (respiro, contraste). Una sola frase grande, `--t-h1`, centrada o alineada izquierda con mucho aire:
> *"No hacemos publicidad. Construimos la forma en que una marca se siente, se mueve y se recuerda."*
Reveal por líneas al entrar en viewport (ScrollTrigger, mask reveal, `--ease-out`). Nada más en esta sección. El vacío es el diseño.

### 4.4 — TRABAJO destacado (la prueba)
Lo más importante para captar clientes grandes. Fondo `--c-ink`. 3–4 casos destacados en layout editorial alternado (imagen grande izquierda/derecha, texto al lado):
- Cada caso: imagen/video con **parallax** (la imagen se mueve más lento que el scroll, ScrollTrigger), título del proyecto en serif, cliente + categoría en mono, una línea de resultado.
- **Hover:** la imagen revela un video en loop (o se satura/escala 1.03), aparece un "Ver caso →" con underline animado.
- Cursor custom: al hover sobre un caso, el cursor crece a un círculo con texto "VER" (mix-blend-mode difference sobre la imagen).
- Al final: "Ver todo el trabajo →" hacia /trabajo.

### 4.5 — SERVICIOS (las 5 capas, para que ambos públicos se vean)
Fondo `--c-bone`. Lista editorial numerada (01–05), tipo índice de revista:
```
01  Estrategia de marca
02  Identidad y diseño
03  Producción audiovisual     ← tu diferenciador real (cine)
04  Web y producto digital
05  Contenido y social
```
Cada fila: número en mono, nombre en serif grande, descripción corta al expandir (acordeón con altura animada, o reveal al hover en desktop). Líneas divisorias `--c-line-dark` que se "dibujan" al entrar (scaleX 0→1).
> Aquí el cliente chico ve "ah, me pueden hacer el logo y la web" y el grande ve "pueden llevar toda mi marca". Mismo bloque, dos lecturas.

### 4.6 — NÚMEROS / autoridad (opcional pero potente para clientes grandes)
Banda oscura, contadores animados (GSAP, cuentan al entrar en viewport): proyectos, clientes, años, premios/reconocimientos. Mono grande. Sobrio, sin íconos cliché.

### 4.7 — TERRITORIO (el diferenciador único de Captas)
La sección que ninguna agencia global tiene. Fondo imagen full-bleed del paisaje del Limarí (valle, cielo, luz dorada — tu material de cine FX30 brilla aquí), tratada con grano y overlay oscuro. Texto encima:
> *"Desde el Limarí para el mundo. El lugar no es un límite — es nuestra ventaja."*
Parallax fuerte en la imagen de fondo. Esto humaniza y diferencia. Cliente chico se identifica, cliente grande ve una historia que vender.

### 4.8 — CTA final / contacto
Fondo `--c-ink`. Frase de cierre grande + email gigante clickeable (hover: underline que se dibuja + cambia a terracota) + botón "Conversemos". Footer integrado abajo: links, redes (sobrias), copyright, créditos.

### 4.9 — FOOTER
Editorial. Logo grande "CAPTAS" que ocupa el ancho (tipo masthead). Columnas: navegación, contacto, redes. Mono pequeño. Un detalle: hora local de Ovalle en tiempo real (`Intl.DateTimeFormat`, zona `America/Santiago`) — detalle que dice "somos reales, estamos acá".

---

## 5. CATÁLOGO DE EFECTOS (implementar transversalmente)

| Efecto | Dónde | Herramienta · cómo |
|---|---|---|
| **Smooth scroll inercial** | Global | **Lenis**, base de todo |
| **Split text reveal** | Titulares | **Framer Motion** · split manual por palabra/línea + `whileInView`, mask `overflow:hidden` + `translateY` con stagger |
| **Mask reveal por líneas** | Manifiesto, statements | **Framer** · variants con stagger, clip-path o translateY dentro de contenedor overflow hidden |
| **Reveals al entrar** | Casi todo | **Framer** · `whileInView` + `viewport={{ once: true }}` |
| **Draw-in de líneas** | Divisores, servicios | **Framer** · `scaleX: 0→1`, `transform-origin: left`, `whileInView` |
| **Scroll parallax** | Imágenes de casos, territorio | **GSAP ScrollTrigger** · `yPercent` distinto entre capas (Framer no sincroniza fino con scroll) |
| **Sticky pin + scroll** | Sección Territorio (y opc. proceso) | **GSAP ScrollTrigger** · `pin: true`, scrub |
| **Cursor custom** | Casos, links | **Framer / JS** · div que sigue mouse con lerp; crece/cambia texto en hover; `mix-blend-mode: difference` |
| **Hover video reveal** | Cards de trabajo | **Framer** · `<video muted loop>` que aparece en hover (opacity + `play()`) |
| **Contadores animados** | Sección números | **Framer** · `useInView` + animar valor con `animate()` o `useMotionValue` |
| **Magnetic buttons** | CTAs principales | **Framer** · botón que se atrae al cursor (translate hacia mouse, spring) |
| **Page transitions** | Entre rutas | **Framer** · `AnimatePresence` con cortina (clip-path o translateY) |
| **R3F hero** | Solo hero | **R3F + Drei** · malla/partículas reactivas al mouse, lazy + fallback |
| **Grain overlay** | Global | **CSS** · SVG noise fixed, blend overlay, `--grain-opacity` |

> **Regla de decisión Framer vs GSAP:** ¿el efecto se dispara *al entrar en viewport* o es un hover/transición? → **Framer**. ¿El efecto necesita estar *amarrado a la posición exacta del scroll* (parallax, pin, scrub)? → **GSAP**. Eso es todo. No hay un tercer caso.

**Regla de oro del motion:** cada efecto debe sentirse *inevitable*, no decorativo. Si un efecto no aporta a la sensación de calidad o a la narrativa, se elimina. Menos efectos ejecutados perfecto > muchos efectos a medias. Ese es el nivel "dios" de verdad.

---

## 6. ACCESIBILIDAD Y PERFORMANCE (no negociable, separa amateur de pro)

- `prefers-reduced-motion: reduce` → desactiva Lenis, split reveals instantáneos, R3F a fallback estático. **Implementar desde el día 1, no al final.**
- Contraste WCAG AA: hueso sobre tinta y viceversa pasan; terracota sobre tinta verificar (usar `--c-terra` solo en texto grande o como acento, no en body largo).
- Todo navegable por teclado, focus states visibles (outline terracota), `alt` real en imágenes, headings jerárquicos.
- Lazy-load todo lo pesado. Video poster siempre. `next/image` con `sizes` correcto.
- Fuentes self-hosted con `font-display: swap` y `next/font` para cero CLS.
- Lighthouse 90+ en Performance, Accessibility, Best Practices, SEO antes de considerar "terminado".

---

## 7. SEO Y METADATA

- `metadata` por ruta (App Router), Open Graph con imagen custom por caso de estudio.
- Título home: `Captas — Agencia creativa | Limarí, Chile`
- Schema.org: `Organization` + `LocalBusiness` (dirección Ovalle, ayuda a captar cliente local en Google).
- Sitemap + robots. Idioma `es-CL`.
- Si hay blog/casos: `Article` schema.

---

## 8. ORDEN DE CONSTRUCCIÓN (sprints para Cursor)

1. **Setup**: Next 14 + TS + Tailwind + tokens en globals.css + tailwind.config + fuentes. Layout base, header, footer.
2. **Lenis provider** + sincronización con Framer y GSAP ScrollTrigger. Verificar smooth scroll antes de seguir.
3. **Home estructura** (todas las secciones en JSX estático con contenido real, sin motion aún). Validar layout y ritmo.
4. **Motion base (Framer)**: split text reveals, mask reveals, draw-in lines, contadores, todo lo de `whileInView`. Sección por sección.
5. **Scroll FX (GSAP)**: solo parallax de casos + pin de Territorio. Nada más.
6. **Interacción (Framer/JS)**: cursor custom, hover video, magnetic buttons.
7. **Hero R3F**: lazy, fallback, reactivo. Último porque es lo más frágil en performance.
8. **Páginas internas**: /trabajo (índice), /trabajo/[slug] (caso editorial), /estudio, /servicios, /contacto (form funcional).
9. **Page transitions** entre rutas (Framer AnimatePresence).
10. **Pulido**: reduced-motion (desactivar GSAP pin/parallax en móvil), accesibilidad, Lighthouse, responsive QA en móvil real. Deploy Vercel + dominio.

> Construye y valida cada sprint antes del siguiente. No acumules motion sobre un layout que no está firme.

---

## 9. PROMPT DE ARRANQUE PARA CURSOR (pegar después de este doc)

```
Actúa como un senior creative developer (nivel Immersive Garden / Active Theory).
Vamos a construir la web de CAPTAS según el documento CAPTAS_WEB_MASTER.md.

Stack y filosofía de motion (respétala estrictamente): Framer Motion es el motor
por defecto para reveals, hover y transiciones. GSAP + ScrollTrigger se usa SOLO
para parallax de casos y el pin de la sección Territorio. Lenis es el smooth scroll
base, sincronizado con Framer y GSAP. R3F solo en el hero, lazy. No metas GSAP fuera
de los casos indicados en el documento.

Empieza por el Sprint 1: inicializa el proyecto Next.js 14 (App Router, TypeScript,
Tailwind), aplica TODOS los design tokens del documento en globals.css y
tailwind.config.ts, configura next/font con las fuentes definidas (usa Fraunces +
Geist + Geist Mono como alternativas gratuitas si no especifico otras), y crea el
layout base con header transparente-a-sólido y footer editorial con la hora local
de Ovalle.

No uses Inter ni Space Grotesk. Respeta el grain overlay global. Mobile-first.
Muéstrame los archivos completos y espera mi OK antes del Sprint 2.
```

---

*Documento maestro Captas v1.1 — territorio híbrido editorial+inmersivo. Stack: Next.js 14 + Tailwind + Framer Motion (base) + Lenis (scroll) + GSAP ScrollTrigger (quirúrgico: parallax y pin) + R3F (solo hero). Basado en el estándar de craft de Immersive Garden, Alright Studio, A24, Collins y Aesop.*
