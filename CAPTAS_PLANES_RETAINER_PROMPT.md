# CURSOR PROMPT — Sección Planes Retainer / Captas Web
# Archivo: `components/sections/PlanesRetainer.tsx`
# Ubicación sugerida: sección `Servicios` del home (después de la grilla de servicios generales)

---

## CONTEXTO DEL PROYECTO

Estás trabajando en la web de **Captas**, agencia creativa territorial con base en Ovalle, Coquimbo.
Stack: **Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion + Lenis**.

**Paleta de colores (usar exactamente estos valores):**
```
tinta:     #0A0A0A   → fondo oscuro, texto principal dark
hueso:     #F4F0E8   → fondo claro, texto sobre oscuro
terracota: #C75B39   → acento, CTA, highlights
gris:      #8A8880   → texto secundario, bordes sutiles
borde:     rgba(244,240,232,0.12)  → bordes en fondo oscuro
borde-claro: rgba(10,10,10,0.10)  → bordes en fondo claro
```

**Tipografía:**
```
Display/headings: font-serif → 'Fraunces' o 'PP Editorial New' (variable, ya instalada)
Body/UI:          font-sans  → 'Geist' (ya instalada)
Kickers/labels:   font-mono  → 'Geist Mono' (ya instalada)
NUNCA usar: Inter, Space Grotesk, Roboto
```

---

## TAREA

Crea el componente `PlanesRetainer.tsx` en `components/sections/`.

Es una **sección completa del home** que presenta los planes de retainer mensual (modelo de arriendo de servicios) con compromiso de 6 meses. Debe integrarse visualmente con el resto de la web: fondo hueso `#F4F0E8`, tipografía editorial, estética sobria con momentos de acento terracota.

---

## ESTRUCTURA DEL COMPONENTE

### Header de sección
```
— kicker en font-mono uppercase tracking-widest, color terracota, tamaño 11px:
  "RETAINER MENSUAL · COMPROMISO 6 MESES"

— Título principal en font-serif, ~48–56px, color tinta, peso normal:
  "Tu marca, en manos de un equipo completo."

— Bajada en font-sans, ~18px, color gris, max-width 520px, centrado:
  "Un valor fijo mensual que incluye todo lo que necesitas para
   construir presencia real: identidad, contenido, web y video."
```

### Grid de planes
4 tarjetas en grid responsivo: `1 col mobile → 2 col tablet → 4 col desktop`

**Datos de los planes (hardcodeados en el componente):**

```typescript
const planes = [
  {
    id: "semilla",
    nombre: "Semilla",
    tagline: "Emprendimientos y marcas nuevas",
    precio: 390000,
    total6m: 2340000,
    featured: false,
    activacion: 150000,
    servicios: [
      { incluido: true,  texto: "Diseño de logo + paleta" },
      { incluido: true,  texto: "Manual de marca básico" },
      { incluido: true,  texto: "8 posts redes sociales / mes" },
      { incluido: true,  texto: "1 sesión de fotos / mes" },
      { incluido: true,  texto: "Calendario editorial" },
      { incluido: false, texto: "Videos" },
      { incluido: false, texto: "Sitio web" },
      { incluido: false, texto: "Pauta digital" },
    ],
  },
  {
    id: "marca",
    nombre: "Marca",
    tagline: "Pymes que ya operan",
    precio: 690000,
    total6m: 4140000,
    featured: false,
    activacion: 150000,
    servicios: [
      { incluido: true,  texto: "Identidad visual completa" },
      { incluido: true,  texto: "16 posts redes sociales / mes" },
      { incluido: true,  texto: "2 sesiones de fotos / mes" },
      { incluido: true,  texto: "2 reels / mes (Sony FX30)" },
      { incluido: true,  texto: "Landing page incluida" },
      { incluido: true,  texto: "Informe mensual" },
      { incluido: false, texto: "Sitio web completo" },
      { incluido: false, texto: "Pauta digital" },
    ],
  },
  {
    id: "presencia",
    nombre: "Presencia",
    tagline: "Marcas que quieren crecer",
    precio: 990000,
    total6m: 5940000,
    featured: true,  // ← CARD DESTACADA
    activacion: 200000,
    servicios: [
      { incluido: true, texto: "Identidad visual completa" },
      { incluido: true, texto: "20 posts redes sociales / mes" },
      { incluido: true, texto: "Sesiones de fotos ilimitadas" },
      { incluido: true, texto: "4 reels + 1 video largo / mes" },
      { incluido: true, texto: "Sitio web completo (hasta 5 págs)" },
      { incluido: true, texto: "Gestión pauta Meta / Google" },
      { incluido: true, texto: "Informe quincenal" },
      { incluido: true, texto: "Reunión estratégica mensual" },
    ],
  },
  {
    id: "territorio",
    nombre: "Territorio",
    tagline: "Empresas medianas y proyectos",
    precio: 1490000,
    total6m: 8940000,
    featured: false,
    activacion: 250000,
    servicios: [
      { incluido: true, texto: "Todo lo de Presencia" },
      { incluido: true, texto: "Estrategia de contenido anual" },
      { incluido: true, texto: "Producción audiovisual premium" },
      { incluido: true, texto: "Web avanzada + e-commerce" },
      { incluido: true, texto: "Gestión de pauta con presupuesto" },
      { incluido: true, texto: "Account manager dedicado" },
      { incluido: true, texto: "Reportes semanales" },
      { incluido: true, texto: "2 reuniones estratégicas / mes" },
    ],
  },
]
```

### Diseño de cada tarjeta

**Tarjeta normal:**
- Fondo: `white` o `#FFFFFF`
- Border: `1px solid rgba(10,10,10,0.10)`
- Border-radius: `12px`
- Padding: `28px 24px`

**Tarjeta featured (`id: "presencia"`):**
- Fondo: `#0A0A0A` (tinta)
- Border: `none`
- Texto principal: `#F4F0E8` (hueso)
- Badge superior: "El más elegido" — pill pequeño, fondo terracota `#C75B39`, texto hueso, font-mono uppercase 10px
- El check de ítems incluidos: color terracota `#C75B39`

**Contenido interno de cada tarjeta:**
```
1. Nombre del plan — font-serif 20px, peso normal
2. Tagline — font-sans 13px, color gris
3. Precio — font-sans 32px peso 500: "$990.000" + "/mes" en 14px gris
4. Nota activación — font-mono 11px gris: "* + $200.000 activación única"
5. Separador — 1px línea sutil
6. Lista de servicios — 13px font-sans
   - incluido: ícono check (✓) color terracota + texto normal
   - no incluido: ícono guión (—) color gris + texto con opacity 0.4
7. CTA button:
   - Normal: outline, borde tinta, texto tinta, hover fondo tinta texto hueso
   - Featured: fondo terracota, texto hueso, hover darkens terracota
   - Texto: "Cotizar este plan →"
   - onClick: abre mailto:hola@captas.cl con subject pre-llenado con el nombre del plan
```

### Footer de sección
Row de 5 pills informativos (font-mono 11px, fondo levemente gris, borde sutil):
```
✓ Precio fijo mensual   |   ↺ Renovación automática   |   ◎ Producción en Coquimbo   |   ✉ Factura incluida   |   ◉ Video Sony FX30
```

### Bloque add-ons
Justo debajo del grid, fondo `rgba(10,10,10,0.04)`, border-radius 12px, padding 24px:

```
Título: "Servicios adicionales" — font-mono 11px uppercase terracota

Grid 3 columnas (2 en tablet, 1 en mobile):
- Pauta Meta Ads desde $150.000
- Video institucional desde $290.000
- Sesión extra de fotos $80.000
- E-mail marketing desde $120.000
- Fotografía de producto $150.000
- Sitio web adicional desde $490.000

Cada ítem: "+" prefix en terracota + font-sans 13px gris
```

---

## ANIMACIONES (Framer Motion)

Usar `motion.div` con `viewport={{ once: true }}`:

```typescript
// Entrada del header
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}

// Stagger de tarjetas (usar variants con staggerChildren: 0.08)
// Cada tarjeta: opacity 0→1, y 32→0

// Hover en tarjetas normales:
whileHover={{ y: -4 }}
transition={{ duration: 0.2 }}
// (NO aplicar hover a la featured card, ya está destacada)
```

---

## FORMATEO DE PRECIOS

Usar esta función helper:
```typescript
const formatPrecio = (n: number) =>
  "$" + n.toLocaleString("es-CL")
// Resultado: "$990.000"
```

---

## SECCIÓN EN EL HOME

Agregar en `app/page.tsx` (o donde vivan las secciones del home) después de la sección de servicios generales:

```tsx
import PlanesRetainer from "@/components/sections/PlanesRetainer"

// Dentro del JSX del home:
<PlanesRetainer />
```

La sección lleva `id="planes"` para que el nav pueda hacer scroll directo:
```tsx
<section id="planes" className="...">
```

---

## NOTAS FINALES PARA CURSOR

- NO usar shadcn/ui — construir todo con Tailwind puro + clases custom si es necesario
- NO usar colores fuera de la paleta definida arriba
- NO usar íconos de librerías externas — usar caracteres unicode simples (✓, —, +) o SVG inline minimal
- El componente debe ser 100% client-side safe (sin `use client` innecesario — solo agregar si se usan hooks)
- Si se necesita `useRef` para el scroll de Lenis, mantenerlo en el layout padre, no aquí
- Mobile-first: el grid colapsa a 1 columna en `< 640px`
- Accesibilidad: los botones CTA deben tener `aria-label` descriptivo con el nombre del plan
