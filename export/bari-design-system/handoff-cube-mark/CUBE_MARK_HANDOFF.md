# Cube mark refresh — developer handoff

Replaces the photorealistic cube PNG with a flat, on-brand vector mark and applies
the three fixes from `Cube Brand Mark Refresh.html`.

**Chosen Four-Dimensions direction:** *cube-as-metaphor* (small cube + connective line)
— makes the mark relevant instead of decorative.

---

## 0. Drop in the new assets

Copy these into `public/brand/`, replacing the existing files:

| New file (in this project) | Goes to |
|---|---|
| `public-brand/logo-cube.svg`     | `public/brand/logo-cube.svg`   *(new — preferred, crisp at any size)* |
| `public-brand/logo-icon.png`     | `public/brand/logo-icon.png`    *(256², transparent)* |
| `public-brand/logo-icon@2x.png`  | `public/brand/logo-icon@2x.png` *(512², transparent)* |

No change needed to `iconAspect` (the mark is square).

### `src/config/brand.ts` — add the SVG path
```ts
  logos: {
    horizontal: "/brand/logo-horizontal.png",
    icon: "/brand/logo-icon.png",
    icon2x: "/brand/logo-icon@2x.png",
    iconAspect: 1,
    full: "/brand/logo-full.png",
    cube: "/brand/logo-cube.svg",   // ← add this line
  },
```

---

## 1 + 2. Navbar — shrink & balance the icon

### `src/components/layout/BrandLockup.tsx`

**Icon size** — replace:
```ts
const iconSize = (compact: boolean) => (compact ? 72 : 96);
```
with:
```ts
const iconSize = (compact: boolean) => (compact ? 36 : 44);
```

**Icon className** — in `iconEl`, replace the trailing size classes:
```ts
  compact ? "h-[72px] w-[72px]" : "h-[88px] w-[88px] sm:h-[96px] sm:w-[96px]"
```
with:
```ts
  compact ? "h-9 w-9" : "h-10 w-10 sm:h-11 sm:w-11"
```
(36px when scrolled, 40→44px otherwise — aligned to the two-line wordmark's cap height.)

Optionally prefer the SVG for the icon (sharper than PNG): swap `src={brand.logos.icon}`
→ `src={brand.logos.cube}` and drop the `srcSet`/`sizes` props.

### `src/components/layout/SiteHeader.tsx` — tighten the brand zone
The lockup is now narrower, so the reserved min-width can shrink:
```tsx
{/* was: md:min-w-[300px] lg:min-w-[340px] */}
<div className="min-w-0 shrink-0 md:min-w-[220px] lg:min-w-[250px]">
  <BrandLockup variant="icon-wordmark" compact={scrolled} />
</div>
```

---

## 3. Four Dimensions — cube as metaphor

### `src/components/home/FourDimensions.tsx`

Replace the `<SectionHeading … />` line **and** the floating-cube `<div className="relative mx-auto mb-12 …">…</div>`
with:

```tsx
{/* eyebrow */}
<p className="text-center font-[family-name:var(--font-assistant)] text-xs font-bold uppercase tracking-[0.24em] text-cube-gold">
  {subtitle}
</p>
<h2 className="mx-auto mt-3 max-w-3xl text-balance text-center text-3xl font-extrabold leading-tight text-cube-navy md:text-4xl">
  {title}
</h2>

{/* the cube IS the framework — four facets, one whole */}
<div className="mt-7 flex flex-col items-center gap-3">
  <Image
    src={brand.logos.cube}
    alt=""
    width={72}
    height={72}
    className="h-[72px] w-[72px]"
    unoptimized
    aria-hidden
  />
  <p className="max-w-md text-center text-sm leading-relaxed text-cube-body">
    ארבעה ממדים — פאה אחת לכל אחד, קובייה אחת שלמה.
  </p>
</div>
```

> The connective line is what earns the cube its place. Consider moving the string into
> `content/homepage/dimensions.json` (e.g. a `frameworkLine` field) rather than hard-coding it.
> If you'd rather go fully minimal, just delete the cube `<div>` block above and keep only
> the eyebrow + title (the "Recommended" panel in the proposal).

---

## 4. Brand band above the footer

### `src/components/layout/SiteFooter.tsx`

Insert this as the **first child** of `<footer>`, before the existing
`<div className="mx-auto max-w-6xl px-4 py-14 …">`:

```tsx
{/* brand band */}
<div className="relative overflow-hidden border-b border-white/10 px-4 py-14 text-center md:px-6">
  <div
    aria-hidden
    className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full"
    style={{ background: "radial-gradient(circle, rgba(120,150,210,.18), transparent 62%)" }}
  />
  <Image
    src={brand.logos.cube}
    alt=""
    width={88}
    height={88}
    className="relative mx-auto mb-5 h-[88px] w-[88px]"
    unoptimized
    aria-hidden
  />
  <p className="relative font-[family-name:var(--font-assistant)] text-2xl tracking-[0.18em]">
    <span className="font-bold">CUBE</span>{" "}
    <span className="font-light text-white/75">FINANCIAL GROUP</span>
  </p>
  <p className="relative mt-3 text-lg font-medium text-cube-gold">{brand.tagline}</p>
</div>
```

Then, in the existing grid, **remove the inverted horizontal logo** from the first column
(the band now carries the lockup) — delete the `<Image … className="… brightness-0 invert" />`
and keep just the `{brand.tagline}` paragraph, or repurpose that column.

---

### Summary of files touched
- `public/brand/logo-icon.png`, `logo-icon@2x.png`, `logo-cube.svg` *(assets)*
- `src/config/brand.ts`
- `src/components/layout/BrandLockup.tsx`
- `src/components/layout/SiteHeader.tsx`
- `src/components/home/FourDimensions.tsx`
- `src/components/layout/SiteFooter.tsx`
