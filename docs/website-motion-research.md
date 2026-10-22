# Coreside Website — Motion, Background & Scroll Research

**Document Date:** October 2026  
**Scope:** Technical and design research for Visual Identity, Background & Scroll Story Overhaul (V2) on Coreside Launch Website.

---

## 1. Research Evidence Matrix

| Source / Pattern | URL / Reference | Interaction Mechanism | Useful Visual Principle | Failure Modes to Avoid | Implementation Decision |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **React Bits — Dot Grid & Dot Field** | [reactbits.dev/backgrounds/dot-grid](https://reactbits.dev/backgrounds/dot-grid)<br>[reactbits.dev/backgrounds/dot-field](https://reactbits.dev/backgrounds/dot-field) | Canvas 2D dot array with pointer distance measurement and radial falloff. | Dots stay on regular geometric pitch; only opacity/contrast changes based on cursor proximity. Extremely tactile without physics jiggle. | Jelly-like shockwaves; huge 300px halo creating a "spotlight" disk; continuous React re-renders on `pointermove`. | **Adopt for HeroDotField**: Canvas 2D, pitch ~28px, radius 1.2px, proximity reach ~120px, smooth cubic falloff. Low-amplitude independent ambient wave (~11s cycle). Zero React re-renders on move. |
| **Codrops / Phantom.land & Dash Creative** | [tympanus.net/codrops](https://tympanus.net/codrops/2025/06/30/invisible-forces-the-making-of-phantom-lands-interactive-grid-and-3d-face-particle-system/) | Localized soft falloff, monochrome tone inversion, physical restraint. | Contrast inversion: light mode darkens dots locally; dark mode brightens dots. Quiet material feeling. | Heavy WebGL runtime; colored particle trails; distracting background motion under text. | **Adopt**: Pure 2D Canvas math. Attenuate dots under text/form. Strictly monochrome. Stop rendering when hero is offscreen. |
| **React Bits — Threads (Organic Contours)** | [reactbits.dev/backgrounds/threads](https://reactbits.dev/backgrounds/threads) | Smooth flowing hairline contour curves and subtle texture. | Ultra-quiet background surface for the *rest of the site* (post-hero). Subtle 2–4% contrast hairline lines evoking paper grain and precision. | Dense topographical map appearance; moving SVG animations that distract from body text; repeating tile seams. | **Adopt for SiteAmbientBackground**: Single static SVG with art-directed hairline curves and noise texture overlay. Strictly static, zero CPU overhead, placed behind content (`-z-10`). |
| **Framer Sticky Scroll Story Pattern** | [framer.com/marketplace](https://framer.com/marketplace/components/sticky-scroll-story/) | Sticky viewport container where text steps and preview morph in lockstep. | Mutually exclusive active stage. The text narrative occupies a single bounded spatial slot; inactive scenes do NOT peek from top or bottom. | Normal-flow column where inactive steps remain visible in viewport; scroll-jacking or snap wheel interception. | **Adopt for ScrollStory**: A single bounded track with sticky frame (`calc(100svh - headerHeight)`). Left text stage is a bounded container with `AnimatePresence mode="wait"`. Inactive scenes are strictly hidden. |
| **Motion for React (`useScroll`, `AnimatePresence`)** | [motion.dev/docs/react-use-scroll](https://motion.dev/docs/react-use-scroll)<br>[motion.dev/docs/react-animate-presence](https://motion.dev/docs/react-animate-presence) | Declarative scroll progress tracking and controlled component enter/exit transitions. | Clean deterministic transition (~260ms) with small vertical drift (8–14px) and crossfade. Stable keys ensure state preservation in preview. | Jitter at threshold crossings; layout reflow during exits; memory leaks from unbound scroll listeners. | **Adopt**: Derive active scene with hysteresis bands; single keyed `motion.div` inside bounded text stage; preserve shared task state in right preview. |
| **Linear (Linear.app)** | [linear.app](https://linear.app/) | Light-mode-first product craftsmanship, high contrast, crisp typography. | Off-white surfaces (`#FBFBFB` / `#F7F7F6`), neutral borders (`#E5E5E5`), concise human copy, tight spacing rhythm, editorial splits. | Excessive decorative cards; generic SaaS feature grids; marketing buzzwords. | **Adopt for Art Direction**: Clean human copy, varied section hierarchy (asymmetric splits, full-bleed quotes, live interactive demos), removal of AI jargon. |
| **Raycast (Raycast.com)** | [raycast.com](https://raycast.com/) | Concrete personal utilities, tangible examples, fast responsive interactions. | Software interface as primary proof. Clear "what you see is what you get" demonstration without overpromising cloud magic. | Wall-of-UI cognitive overload; unreadable small screenshots. | **Adopt for Examples & Walkthrough**: Honest interactive apps (Study Planner, Habit Tracker, Quiz) with explicit "Illustrative preview" labeling. |

---

## 2. Core Architectural Decisions

1. **Light Mode as Default:**
   - First-time visitors without explicit `localStorage` preference land in crisp, polished Light Mode.
   - If user explicitly toggles theme, preference is persisted in `localStorage('coreside-theme')`.
   - Pre-paint inline script in `index.html` updated to default to light mode, eliminating theme flash/FOUC.

2. **Hero Dot Field Canvas (`HeroDotField.tsx`):**
   - Single `<canvas>` rendered within the Hero container (`pointer-events: none`).
   - Geometric grid of dots with pitch ~28px, dot radius ~1.2px.
   - Mouse tracking using ref coordinates (no React state updates per frame).
   - Localized cubic falloff within radius ~120px.
   - Independent ambient wave with low amplitude (0.025) and ~11-second cycle.
   - Automatic pause when scrolled out of view via `IntersectionObserver` or when document is hidden via Page Visibility API.
   - Full support for `prefers-reduced-motion` (static dots, no animation) and touch devices (static subtle dots).

3. **Persistent Minimalist Site Background (`SiteAmbientBackground.tsx`):**
   - Single shared component placed underneath all non-hero content (`-z-10`, `pointer-events-none`).
   - SVG-based subtle organic hairline curves with 2–4% contrast against the base background.
   - Fine, non-repeating noise grain overlay.
   - Completely static: zero continuous CPU or GPU repaints while scrolling.

4. **Exclusive Active Walkthrough Scene (`ScrollStory.tsx`):**
   - The left column is a **single, bounded, clipped stage** (`overflow: hidden; min-h-[380px]`).
   - Content rendered via `AnimatePresence mode="wait"`. Only the active scene is mounted/visible. Inactive scenes are 100% removed/hidden—zero peeking from top or bottom.
   - Height of scroll track is calculated cleanly (e.g. 320vh) with hysteresis bands to avoid boundary flicker.
   - Mobile layout cleanly stacks each scene with its corresponding preview without duplicate heavy DOM trees.
