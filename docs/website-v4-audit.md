# Coreside Website — V4 Audit, Research Ledger & Implementation Plan

**Date:** 2026-10-22  
**Target:** https://coreside-website.vercel.app/ (Local: http://localhost:5173/)  
**Document Purpose:** Production audit, independent design research, and implementation blueprint for V4 Visual Life, Backgrounds, and Coordinated Motion.

---

## 1. Root-Cause Site Audit: Why the Persistent Ambient Background Disappeared

### Systematic Trace
We performed computed style analysis, DOM node inspection, and screenshot verification on the live running application (`http://localhost:5173/`).

| Stacking Property / Metric | Measured Value | Root Cause Diagnosis |
| :--- | :--- | :--- |
| **Parent Placement** | Inside `<div className="relative">` after `<Hero />` | Spanned only from WhyCoreside to Waitlist, leaving hero and other boundaries disjointed. |
| **SVG Dimensions** | `width: 1425px`, `height: 9382.4px` | ViewBox was `0 0 1440 900` with `preserveAspectRatio="none"`. Because the document was 9,382px tall, curves were **vertically stretched by 10.42x**, distorting organic contours into near-vertical faint hairlines that ran down thousands of pixels. |
| **Stroke Color & Opacity** | `text-neutral-900/[0.025]`, `dark:text-white/[0.028]` | Effective color on white was `rgba(18, 18, 18, 0.024)`, which is `#FAFAFA` on `#FFFFFF`—below human perceptual contrast threshold on calibrated displays. In dark mode, 2.8% white on `#080808` produced barely 1 RGB level above pitch black. |
| **Tactile Fine Grain** | `feTurbulence` with `opacity-[0.022] mix-blend-overlay` | 2.2% opacity overlay on pure white `#ffffff` or near-black `#080808` results in mathematically zero perceptible texture change. |
| **Stacking Context & Z-Index** | `-z-10` on parent div without `isolate` | Put background behind section surfaces, where sections with slight backgrounds (`bg-neutral-50/30`, cards, etc.) masked it completely. |

### Architectural Fix
1. **Mount at Application Root**: Place `<SiteAmbientBackground aria-hidden="true" className="fixed inset-0 pointer-events-none z-0" />` as a fixed viewport-stable canvas/SVG directly under `<div className="relative isolate min-h-screen bg-site">`, with foreground content in `<div className="relative z-10">`.
2. **Viewport-Stable Geometry**: Rather than stretching a 900px SVG over 9000px, use fixed viewport coordinates with multi-tiered organic contour paths that remain crisp, elegant, and visible across all scroll positions.
3. **Calibrated Perceptual Opacity**:
   - Light mode stroke: `rgba(20, 20, 25, 0.075)` with delicate secondary dashed line at `rgba(20, 20, 25, 0.045)`.
   - Dark mode stroke: `rgba(255, 255, 255, 0.085)` with dashed lines at `rgba(255, 255, 255, 0.055)`.
   - Tactile grain: fine SVG `feTurbulence` (baseFrequency 0.8) with `mix-blend-multiply` in light mode (opacity ~0.045) and `mix-blend-screen` in dark mode (opacity ~0.055) to give genuine paper/monochrome tactile depth.
   - Ultra-soft neutral depth pools: faint atmospheric radial falloffs (neutral slate) to give subtle dimension.

---

## 2. Independent Research Ledger

| Source | Observed Pattern | Relevance to Coreside | Adopt / Adapt / Reject | Implementation Target |
| :--- | :--- | :--- | :--- | :--- |
| **Plyxl Marketing Stage** (`https://plyxl.com/` + screenshot) | Large elevated white desktop window floating above an expansive, multi-hue stage featuring soft coral/peach, periwinkle, lavender, and indigo pools with generous stage padding (40–80px). | Gives software presentation genuine life, warmth, and depth while keeping the product UI crisp and legible. | **Adapt**: Create original, curated multi-hue palettes (`aurora-pearl`, `apricot-dusk`, `mineral-night`) tailored to Coreside's personal software brand. Do NOT copy Plyxl's exact shapes, mascots, or UI. | `src/components/marketing/ProductStage.tsx`, `Hero.tsx`, `ScrollStoryPreview.tsx`, `ExampleApps.tsx`, `PersistenceStory.tsx`, `Personalization.tsx` |
| **Linear** (`https://linear.app/`) & **Raycast** (`https://www.raycast.com/`) | Strict brand restraint: headers, typography, marketing sections, FAQ, and CTAs remain monochrome (black/white/gray). Color is strictly contained within product staging environments and demo UI. macOS traffic lights have authentic Apple hues. | Prevents marketing pages from looking like chaotic rainbow templates while allowing product demos to feel vibrant and modern. | **Adopt**: Retain strict monochrome site narrative, use color strictly in `ProductStage` backgrounds and demo UI. | Global styles, `Header.tsx`, `WhyCoreside.tsx`, `FAQ.tsx` |
| **React Bits Dot Grid / Dot Field** (`https://reactbits.dev/backgrounds/dot-grid`, `dot-field`) | High-density canvas dot field with mouse proximity falloff (`smoothstep(1 - dist/radius)`), device pixel ratio scaling, and ambient wave modulation. | Fixes the sparse, static hero dots with responsive local cursor interaction without heavy physics or click shocks. | **Adapt**: Pitch 20–24px (1.5x–2x denser), baseline alpha 0.16–0.22, hovered alpha 0.65–0.78, radius 100–130px, smoothstep falloff, separate sinusoidal wave, DPR cap of 2, IntersectionObserver gating. | `src/components/site/HeroDotField.tsx` |
| **MDN View Transition Circular Reveal** (`developer.mozilla.org/Web/API/View_Transition_API`) | `document.startViewTransition()` with `::view-transition-new(root)` clipped to an expanding circle from the click/toggle center coordinates `(x, y)` to diagonal screen corners. | Eliminates disjointed, staggered CSS transitions across different elements during theme toggle, replacing it with a unified radial area-of-effect wave. | **Adopt**: Compute toggle center `(x, y)`, compute max hypotenuse distance to furthest viewport corner, animate `clipPath: circle(...)` over ~550ms with cubic-bezier easing. Immediate fallback for unsupported browsers and reduced motion. | `src/context/ThemeContext.tsx`, `src/styles/index.css`, `src/components/Header.tsx` |
| **Motion Scroll Synchronization** (`motion.dev/docs/react-use-scroll`) | Dedicated sticky viewport stage with discrete scene thresholds and `AnimatePresence mode="wait"`. | Guarantees scene exclusivity: only step N's copy and UI are visible at any time. Rapid scrolling does not leave overlapping or peeking text. | **Adopt**: Verify sticky container height, ensure seamless step exclusivity, and maintain interactive tasks across scene transitions. | `src/components/site/ScrollStory.tsx`, `ScrollStoryPreview.tsx` |
| **Canvas Optimization & Web Vitals** (`web.dev/articles/animations-guide`, MDN) | `requestAnimationFrame`, ref-based pointer coordinates, `IntersectionObserver` pause on off-screen, `visibilitychange` listener, zero React state updates per frame. | Ensures 60fps performance with negligible CPU/GPU consumption. | **Adopt**: Strict zero-render mouse tracking in `HeroDotField.tsx`. | `src/components/site/HeroDotField.tsx` |

---

## 3. Detailed Component Blueprint

### A. `SiteAmbientBackground.tsx`
- Viewport-fixed `<div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">`
- Elegant organic SVG paths calibrated for high visual polish in both light and dark modes.
- Micro-grain filter using `feTurbulence` with appropriate blend modes (`multiply` / `screen`).
- Gentle radial neutral falloff at edges for physical depth.

### B. `HeroDotField.tsx`
- Grid pitch: 22px (density ~1.65x higher than current 28px).
- Dot radius: 1.15px (crisp, anti-aliased with DPR scaling).
- Proximity radius: 120px with smooth cubic falloff `normalized * normalized * (3 - 2 * normalized)`.
- Light mode alpha: baseline 0.18, hovered up to 0.70.
- Dark mode alpha: baseline 0.20, hovered up to 0.82.
- Ambient wave: gentle multi-frequency sinusoidal wave with amplitude 0.035, period ~12s.
- Automatic pause when scrolled off-screen via `IntersectionObserver` or when document is hidden.

### C. `ProductStage.tsx`
Deliver 3 curated multicolor variants:
1. `aurora-pearl`:
   - Atmospheric pools: Sea-glass cyan (`#38bdf8`), periwinkle (`#818cf8`), powder blue (`#7dd3fc`), restrained lilac (`#c084fc`), deep teal border (`#0f766e`).
   - Dark mode: Luminous cyan/teal glow, violet aura, deep cobalt sheen.
2. `apricot-dusk`:
   - Atmospheric pools: Warm porcelain, soft peach (`#fdba74`), desaturated coral (`#fb7185`), rose-lavender (`#e879f9`), twilight purple (`#a855f7`).
   - Dark mode: Obsidian plum, ember peach, berry aura.
3. `mineral-night`:
   - Atmospheric pools: Smoky slate (`#0f172a`), cool violet (`#8b5cf6`), soft cyan (`#06b6d4`), subtle warm amber (`#f59e0b`).
- Staging geometry: Generous padding (`p-4 sm:p-6 md:p-8 lg:p-10`), multi-layer drop shadows, subtle breathing keyframe animation, realistic macOS window traffic lights with specular dots.
- Apply `aurora-pearl` stage to the Hero product preview, elevating it from flat to stunning!

### D. Radial AOE View Transition (`ThemeContext.tsx` & `index.css`)
- Extend `toggleTheme` to accept an optional trigger event or DOM element coordinate.
- Implement `executeThemeTransition(newTheme, origin)`:
  - Check `document.startViewTransition` support and `prefers-reduced-motion`.
  - Calculate `(x, y)` from toggle center.
  - Calculate `Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))`.
  - Execute `document.startViewTransition(() => { flushSync(() => setTheme(newTheme)); })`.
  - Animate `::view-transition-new(root)` with circular clip path.
  - Disable default root crossfades in CSS to prevent double-imaging.

### E. Coordinated Motion & Interaction Polish
- Hero entrance: Clean 3-beat arrival (eyebrow, title/subtitle, waitlist + elevated stage).
- Waitlist button: Enhanced tactile hover with arrow glide.
- Walkthrough: Maintained scene exclusivity with smooth crossfades and task state persistence.
- Example apps: Spring pill tab indicator with smooth app transition.
- Appearance: Isolated internal theme & wallpaper switcher with immediate visible transformations.

---

## 4. Verification & QA Matrix

### Verification Evidence & Artifacts

| Category | Target / Requirement | Verification Method | Status | Captured Artifact |
| :--- | :--- | :--- | :--- | :--- |
| **Site Ambient Background** | Visibly restored across entire non-hero narrative; non-grid, minimalist contour linework + tactile micrograin. | Full viewport inspection at 1440x900 in light and dark mode across Walkthrough, Examples, FAQ, and Waitlist. | **PASSED** | `v4-walkthrough-scene1-light.png`, `v4-appearance-light-dark.png`, `v4-faq-waitlist-light.png`, `v4-whycoreside-dark.png` |
| **Hero Dot Field Density** | ~1.62x higher density (22px pitch vs 28px); localized cursor proximity shading; independent subtle ambient wave. | Viewport comparison of pointer absent vs pointer hovering; light and dark mode contrast testing. | **PASSED** | `v4-hero-light-nohover.png`, `v4-hero-light-hover.png`, `v4-hero-dark.png` |
| **Product Stages Multicolor Depth** | 3 curated multi-hue palettes (`aurora-pearl`, `apricot-dusk`, `mineral-night`) with multi-region atmospheric pools framing elevated macOS desktop windows. | Component testing across Hero, Walkthrough, Examples (Planner, Habits, Quiz), and Persistence. | **PASSED** | `v4-walkthrough-scene1-light.png`, `v4-examples-planner.png`, `v4-examples-habits.png`, `v4-examples-quiz.png` |
| **Radial AOE Theme Reveal** | Single circular wave expanding from toggle button over entire viewport via `startViewTransition` with zero island lag. | Screencast recording of full-speed light→dark and dark→light transitions; automated unit tests for transition & fallback. | **PASSED** | `coreside-v4-theme-transition.mp4`, `tests/v4-visual-life.test.tsx` |
| **Walkthrough Exclusivity & Persistence** | Strictly active scene copy visible (no peek-through); task state preserved across step evolution; interactive checkbox toggling. | Direct scene navigation across steps 01, 02, 03, 04 and clicking Calculus task in step 04 to update progress bar. | **PASSED** | `v4-walkthrough-scene1-light.png`, `v4-walkthrough-scene2-light.png`, `v4-walkthrough-scene3-light.png`, `v4-walkthrough-scene4-light.png` |
| **Appearance Demo Isolation** | Internal wallpaper and dark/light preview toggles change the desktop window without mutating global site theme. | Toggled "Dark" inside `#appearance` demo; confirmed document site theme remained "light". | **PASSED** | `v4-appearance-light-dark.png` |
| **Responsive Layouts** | Stable layout across desktop (1440x900), tablet (768x1024), and mobile (390x844). No horizontal overflow. | Viewport resizing via DevTools protocol; touch-friendly spacing and segmented step control verified. | **PASSED** | `v4-mobile-hero.png`, `v4-mobile-walkthrough.png`, `v4-tablet-walkthrough.png` |
| **Waitlist Form & Validation** | Client-side validation for empty/invalid email; honeypot spam protection; keyboard accessibility. | Live browser submission of empty and invalid email; verified accessibility alert messages. | **PASSED** | Verified in browser + `tests/waitlist-form.test.tsx` |
| **Automated Test Suite** | 100% green tests; 0 TypeScript errors; clean production build bundle. | `npm test`, `npm run typecheck`, `npm run build`. | **PASSED** | 8/8 test files (42/42 tests passing), 0 lint/type errors, production bundle built in 1.39s. |

