# Coreside Launch Website: Design Rationale & Research Lessons

**Document date:** October 2026  
**Context:** Research synthesis and design system specification for the Coreside marketing and early-access waitlist website.

---

## 1. Transferable Lessons from Research

### Lesson 1: The Product Interface as Hero Proof (Linear)
- **Source:** [Linear.app](https://linear.app/) (Accessed October 2026)
- **Transferable Insight:** Instead of abstract 3D spheres or generic marketing slogans, leading developer tools let the product interface carry the narrative. The hero visual should be an authentic, crisp representation of the real application environment.
- **Application in Coreside:** The hero displays a split desktop window: a conversational prompt on the left and a live, structured personal app on the right. Visitors immediately understand what Coreside is within 5 seconds without reading walls of explanatory text.

### Lesson 2: Practical, Tactile Interactions (Raycast)
- **Source:** [Raycast.com](https://www.raycast.com/) (Accessed October 2026)
- **Transferable Insight:** Raycast showcases modular extensions and personalized capabilities through interactive tabs and keyboard-first badges. Micro-interactions should give visitors a tactile feel for the product.
- **Application in Coreside:** The example applications section features real interactive elements: tab switching between concrete apps (Study Planner, Habit Tracker, Focus Checklist), togglable tasks, and streak counters that respond immediately to user clicks.

### Lesson 3: The Plain-Language Inversion (Granola)
- **Source:** [Granola.ai](https://www.granola.ai/) (Accessed October 2026)
- **Transferable Insight:** "You shouldn't have to adapt to your software, your software should adapt to you." Granola succeeds by stating the pain point in everyday human terms rather than AI buzzwords.
- **Application in Coreside:** Hero headline: *"Software that takes shape around you."* Subhead: *"Tell Coreside what you need. Build personal apps right inside your workspace, then keep changing them as your needs change."* Em dashes and tech buzzwords ("supercharge", "limitless potential") are strictly banned.

### Lesson 4: Restrained Density and Structured Continuity (Tana)
- **Source:** [Tana.inc](https://tana.inc/) (Accessed October 2026)
- **Transferable Insight:** Advanced personal knowledge tools present calm, structured typography and deliberate white space. Density should feel intentional, not chaotic or overwhelming.
- **Application in Coreside:** Generous vertical pacing, clean 8px spacing rhythm, 1–2 column modular layouts, and dedicated sections that explain the 4-step workflow (Describe it, Make it, Use it, Change it).

### Lesson 5: Market Context: "A Cloud for Small Software" (Y Combinator RFS Fall 2026)
- **Source:** [Y Combinator RFS](https://www.ycombinator.com/rfs) (Fall 2026)
- **Transferable Insight:** People increasingly need bespoke, lightweight software that fits their unique daily habits, hobbies, and workflows, rather than clunky, rigid enterprise SaaS monoliths.
- **Application in Coreside:** Coreside is positioned as the consumer-first environment where anyone can turn an idea into a personal, persistent tool without knowing how to code. (Note: YC is referenced as market context only; no false affiliation or endorsement is claimed).

### Lesson 6: Portable Serverless Edge & Functions Architecture (Vercel & Vite)
- **Source:** [Vercel Frameworks: Vite](https://vercel.com/docs/frameworks/frontend/vite) & [Vercel Functions](https://vercel.com/docs/functions) (Accessed October 2026)
- **Transferable Insight:** Avoid vendor lock-in. A standard Vite frontend paired with standard root `/api/waitlist.ts` Vercel Functions offers zero-friction local development via `vercel dev` and instant production deployment on Vercel, without proprietary platform plugins.
- **Application in Coreside:** The site is structured with a pure Vite + React + TypeScript frontend, standard static export to `dist`, and a self-contained `/api/waitlist.ts` endpoint handling payload validation, honeypot protection, and database persistence.

### Lesson 7: Secret Isolation and Row Level Security (Supabase)
- **Source:** [Supabase Secure Data Guidance](https://supabase.com/docs/guides/database/secure-data) (Accessed October 2026)
- **Transferable Insight:** Browser clients should never be granted direct read access to waitlist tables containing user PII. The public `anon` key should not be exposed to secret operations. Server-side functions should use `service_role` credentials to perform validated inserts, with RLS active and public reading blocked.
- **Application in Coreside:** `supabase/migrations/001_waitlist.sql` enables RLS, enforces a unique lowercase email constraint, and grants zero public select/delete permissions. The server endpoint safely normalizes emails and returns friendly idempotency states.

### Lesson 8: Strict Contrast & Reduced-Motion Accessibility (WCAG 2.2 AA)
- **Source:** [W3C WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/) (Accessed October 2026)
- **Transferable Insight:** High contrast between text and background (>= 4.5:1 for body text, >= 3:1 for large headers and interface borders), clear visible focus rings (`:focus-visible`), aria-expanded on accordions, polite `aria-live` status regions for form submission, and respecting `@media (prefers-reduced-motion: reduce)`.
- **Application in Coreside:** Full keyboard operability on theme switcher, mobile menu, accordion FAQs, and demo pause/replay; high contrast neutral tokens in both light and dark modes; non-color indicators for all form feedback.

---

## 2. Selected Design Direction

### Monochrome Palette with Contained App Color
- **Site-level Chrome:** Strictly neutral grayscale.
  - **Dark Mode:** Base `#09090b` (Deep Zinc), Raised `#141416`, Card `#18181b`, Border `#27272a`, Text `#f4f4f5`, Secondary `#a1a1aa`.
  - **Light Mode:** Base `#ffffff` / `#fafafa`, Raised `#f4f4f5`, Card `#ffffff`, Border `#e4e4e7`, Text `#09090b`, Secondary `#71717a`.
- **The Colorful App Exception:** Accents (such as soft sapphire for study progress, sage green for habit streaks, amber for priority tags) appear **strictly within** the bordered previews of user-created apps, simulating how users customize their own tools.

### Authentic Brand Inversion
- **Dark Mode / Dark Surfaces:** `public/branding/coreside-mark-white-transparent.png`
- **Light Mode / Light Surfaces:** `public/branding/coreside-mark-black-transparent.png`
- Clean wordmark in Inter / Geist typography alongside the mark.

### Interactive Hero Experience
- A deterministic desktop window simulation showing:
  1. User prompt: *"Make me a study planner for this semester."*
  2. Coreside generates proposal card with *"What will change"* and *"What will be preserved"*.
  3. User applies proposal; interactive Study Planner appears with initial course tasks.
  4. Second prompt: *"Add priorities and a progress summary."*
  5. Planner evolves in real time: priority tags and completion bar appear, while existing task titles remain completely preserved.
- Controls: Play, Pause, and Replay buttons, plus full static fallback when reduced-motion is requested.
