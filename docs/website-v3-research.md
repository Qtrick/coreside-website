# Coreside Website V3 — Design & Engineering Research

## 1. Research Objectives
This document synthesizes technical and art-directional research across eight industry reference sources to guide the V3 overhaul of the Coreside launch website. Our goal is to achieve believable desktop software staging, refined editorial layout, accessible motion, and high-contrast color framing without sacrificing the monochrome marketing brand.

---

## 2. Evidence Matrix

| Source & URL | Core Principles Observed | What Works for Coreside | What Does NOT Fit Coreside | Implementation Choice |
| :--- | :--- | :--- | :--- | :--- |
| **1. Plyxl**<br>https://plyxl.com/ | Desktop software window floated in a rich, softly colored environment; soft atmospheric lighting and depth; generous margins framing the window. | The concept of a *dedicated, colored product stage* that elevates the white/dark software window. | Copying Plyxl's exact pink/lavender palette, rounded pill buttons, or HVAC tool mockups. | Implement original Coreside stage palettes: **Glacier**, **Sage**, **Warm Sandstone**, and **Midnight Aurora**. Restrict color strictly to the stage container. |
| **2. Linear Design Refresh**<br>https://linear.app/now/behind-the-latest-design-refresh | De-emphasizing supportive chrome; high contrast typography; subtle 1px dividers; disciplined density and generous inner whitespace. | Crisp 1px borders, subtle inset shadows, clean monospace labels, and editorial contrast. | Dark-only theme assumption (Coreside is light-mode default); excessive keyboard shortcut badges. | Use Linear-grade typography, subtle 1px dividers, and high-contrast neutral surfaces in both light and dark modes. |
| **3. Vercel Geist Browser Guidance**<br>https://vercel.com/geist/browser | Believable window framing, clean radius proportions, title bar height (~40–44px). Advises browser chrome for web apps. | Believable title bar spacing, double borders, realistic elevation shadows. | Generic browser address bar (Coreside is a native desktop app, not a website in a browser tab). | Implement `DesktopWindow` with macOS traffic lights and native window title instead of browser URL bars. |
| **4. Apple macOS Human Interface Guidelines (Windows)**<br>https://developer.apple.com/design/human-interface-guidelines/windows | Standard macOS window controls: Red (`#FF5F57`), Yellow (`#FEBC2E`), Green (`#28C840`) in left-to-right order; 12px circles with ~8px spacing and 0.5px subtle border. | Authentic traffic light chrome for desktop window simulations. | Interactive buttons that imply browser/OS control. | Implement `DemoWindowControls` with exact Apple hex colors, subtle inner stroke, and `aria-hidden="true"`. |
| **5. Motion Layout Animations & AnimatePresence**<br>https://motion.dev/docs/react-layout-animations | Coordinated layout transitions without remounting parent states; `AnimatePresence mode="wait"` for smooth crossfades. | Preserves user task check states and active tab data while transitioning scene layers. | Cascading layout transitions that trigger layout shifts. | Use `AnimatePresence mode="wait"` with fixed stage heights and modest durations (180–280ms). |
| **6. GSAP ScrollTrigger Reference**<br>https://gsap.com/docs/v3/Plugins/ScrollTrigger/ | Bounded sticky pinning and progress mapping. | Evaluated for sticky story track. Motion's `useScroll` is already installed and proven reliable in V2. | Adding GSAP would introduce duplicate animation runtimes and inflate bundle size. | Continue with Motion `useScroll` + single clipped stage. |
| **7. W3C WCAG 2.2 Contrast Minimum**<br>https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum | 4.5:1 minimum contrast for normal text; 3:1 for large text and UI components. | Every text and control in both light and dark preview themes must pass AA contrast. | Relying on global Tailwind `dark:` classes inside isolated mock previews. | Implement scoped CSS custom properties for preview containers so dark preview always has >7:1 contrast regardless of page mode. |
| **8. MDN prefers-reduced-motion & Visibility**<br>https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion | Respecting user motion preferences; pausing animations when backgrounded. | Instant opacity transitions for reduced motion; auto-pausing hero canvas and stage animations. | Removing interactive functionality for reduced-motion users. | Fallback to static, instant state updates for users with `prefers-reduced-motion`. |

---

## 3. ProductStage Color Architecture & Design Tokens

### Layer Separation
1. **Layer 1: Coreside Marketing Chrome (Monochrome)**
   - Page surface: `#fbfbfa` (Light) / `#0a0a0a` (Dark)
   - Text: `#171717` (Light) / `#fafafa` (Dark)
   - Dividers: `#e5e5e5` (Light) / `#262626` (Dark)
   - Background: Ultra-subtle hairline contour curves (`SiteAmbientBackground`)

2. **Layer 2: ProductStage (Art-Directed Color Environments)**
   - **Glacier (Walkthrough):**
     - Base: `linear-gradient(135deg, #0d1522 0%, #152033 50%, #0a111a 100%)`
     - Radial illumination: `radial-gradient(circle at 65% 30%, rgba(56, 189, 248, 0.15), transparent 60%)`
     - In light mode: Soft cool ice slate `linear-gradient(135deg, #eef3f8 0%, #e2ebf4 50%, #edf3f8 100%)` with soft cyan tint.
   - **Sage (Habit Tracker & Productivity Examples):**
     - Base: `linear-gradient(135deg, #0c1a16 0%, #132620 50%, #0a1512 100%)`
     - Radial illumination: `radial-gradient(circle at 70% 35%, rgba(52, 211, 153, 0.14), transparent 60%)`
     - In light mode: Soft sea-glass `linear-gradient(135deg, #eff6f3 0%, #e2efe9 50%, #eef5f2 100%)`.
   - **Warm Sandstone (Study Planner):**
     - Base: `linear-gradient(135deg, #1c1512 0%, #261c17 50%, #140f0c 100%)`
     - Radial illumination: `radial-gradient(circle at 60% 40%, rgba(251, 146, 60, 0.12), transparent 60%)`
     - In light mode: Soft terracotta blush `linear-gradient(135deg, #fbf7f4 0%, #f4eae4 50%, #faf5f1 100%)`.
   - **Aurora / Midnight (Appearance Section):**
     - Base: `linear-gradient(135deg, #07090e 0%, #0c121e 50%, #05070a 100%)`
     - Dynamic aurora glow: `radial-gradient(ellipse at 50% 0%, rgba(45, 212, 191, 0.18), rgba(99, 102, 241, 0.15), transparent 70%)`.
