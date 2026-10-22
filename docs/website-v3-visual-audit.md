# Coreside Website V3 — Visual Audit & Source Analysis

## 1. Executive Summary & Purpose
This audit analyzes the visual, compositional, and architectural deficiencies of the current Coreside launch website based on the V3 specification, user-supplied screenshots, and direct source inspection of both the website repository and the canonical desktop application source (`.references/coreside-main`).

---

## 2. Screenshot Defect Analysis

### Screenshot 1: FAQ Section Compression & Repetitive Pill Cards
- **Observed Defect:**
  - The FAQ section uses a rigid centered column with a massive heading, followed by 10 separate pill-shaped card containers (`rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60`).
  - The pills create visual clutter through repeated heavy borders.
  - The vertical rhythm feels squeezed (only ~18px padding), and the first open accordion item creates an unbalanced, crowded block of text.
  - There is a noticeable disconnect between the oversized section heading and the repetitive pill list.
- **Root Cause in Source (`src/components/FAQ.tsx`):**
  - Rigid centered container (`max-w-3xl mx-auto space-y-3`) where every single item is an independent card with thick border outlines.
  - Lack of editorial hierarchy and absence of breathing room between question title and answer body.
- **V3 Solution:**
  - Implement an asymmetric editorial layout:
    - Left column: Compact eyebrow, strong display heading ("Clear, honest answers."), and concise explanatory prose.
    - Right column: Spacious, single-enclosure accordion with clean hairline dividers (`border-b border-neutral-200 dark:border-neutral-800`), comfortable row heights (64–76px min), generous answer padding (`px-6 py-5`), and subtle chevron animation.

---

### Screenshot 2: Appearance Section Logic & Contrast Failure
- **Observed Defect:**
  - Centered heading separated from controls by an awkward, oversized vertical blank gap.
  - Segmented preset buttons ("Paper Minimal", "Subtle Slate", "Obsidian Glass") and "Dark / Light" toggle lack visual grouping and clear context (is this changing the website or the preview?).
  - **Critical Contrast Bug:** When the website is in Light mode and the preview toggle is clicked to "Dark", the cards inside the preview remain white/light gray while the text switches to near-white (`text-neutral-100`). The result is completely illegible white-on-white text!
  - Window controls are 3 nondescript gray circles rather than authentic macOS traffic lights.
  - The preview content consists of generic filler cards ("Focus Checkpoints", "Research Log") rather than authentic Coreside workspace personalization with wallpapers and themes.
- **Root Cause in Source (`src/components/Personalization.tsx`):**
  - Tailwind's `dark:` classes (`dark:bg-neutral-900`, `dark:border-neutral-800`) depend on the `.dark` class being present on `<html>` / document root. Because the site defaults to Light mode, none of the preview's `dark:` classes activate, while inline class logic toggles text color to light.
  - Lack of scoped preview theme tokens.
  - Arbitrary hardcoded card layout with no connection to the real Coreside desktop wallpaper architecture (`WALLPAPERS.md`, `LIVE_WALLPAPERS.md`).
- **V3 Solution:**
  - Redesign layout into an integrated presentation without the dead zone.
  - Explicitly label controls: "Preview theme: Light / Dark" and "Workspace Look: Paper, Aurora, Midnight".
  - Build explicit scoped theme tokens for the preview container so that choosing Dark mode inside the preview applies true charcoal/black surfaces (`#0a0a0a`, `#171717`) and crisp light text regardless of whether the surrounding website is light or dark.
  - Incorporate genuine desktop wallpaper presets (Paper/Clean, Aurora northern-lights glow, Midnight obsidian).

---

### Screenshot 3: Composition Reference (Plyxl)
- **Observed Principle:**
  - A crisp software window floated in front of a rich, soft, colored stage.
  - Soft atmospheric lighting and subtle gradient framing give the window realistic depth and dimension.
  - The window feels like the undisputed hero because of generous stage margins on all sides.
- **Application to Coreside:**
  - Retain Coreside's monochrome marketing brand (white, off-white, black, charcoal) for the page chrome, navigation, headers, and body.
  - Authorize color **specifically inside `ProductStage` environments** framing simulated Coreside desktop windows.
  - Develop original, art-directed Coreside palettes:
    1. **Glacier / Blue Graphite:** Soft blue-gray, slate, pale ice (`#0e1726` / `#1e293b`).
    2. **Sage / Sea Glass:** Calm muted teal, desaturated gray-green (`#0f1f1a` / `#16332a`).
    3. **Warm Paper / Terracotta:** Natural sandstone, warm clay (`#fbf8f5` / `#231815`).
    4. **Midnight / Aurora:** Deep space obsidian with ethereal emerald/cyan aurora glow.

---

### Screenshot 4: Scene 4 & Walkthrough Preview Flatness
- **Observed Defect:**
  - The preview window is a large, flat, near-white box directly on the page surface.
  - Title bar has 3 gray circles instead of colored macOS traffic lights.
  - The layout lacks Coreside's recognizable desktop shell (sidebar with brand mark, chats, personal apps, projects).
  - Heavy repetition of technical badges ("Scene 4: Persistent Workspace", "Local SQLite").
- **Root Cause in Source (`src/components/site/ScrollStoryPreview.tsx`):**
  - Window rendered directly with `bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800` without a framing `ProductStage`.
  - Non-standard title bar (`bg-neutral-300 dark:bg-neutral-700` dots).
  - Absence of sidebar navigation rail.
- **V3 Solution:**
  - Frame the walkthrough inside `<ProductStage variant="glacier">`.
  - Mount `<DesktopWindow>` with red (`#FF5F57`), yellow (`#FEBC2E`), green (`#28C840`) macOS traffic lights.
  - Implement `<CoresideDemoShell>` featuring an authentic sidebar (brand mark, chats, apps, projects) and split conversation/tool canvas.

---

## 3. Desktop Product Source Inspection (`.references/coreside-main`)

From inspecting `.references/coreside-main`:
1. `src/styles/tokens.css`:
   - Light baseline: `--background: #f5f5f5`, `--surface: #ffffff`, `--surface-muted: #ececec`, `--text-primary: #171717`, `--border: #e4e4e4`, `--accent-primary: #2f8f63`.
   - Dark baseline: `--background: #0a0a0a`, `--surface: #171717`, `--surface-muted: #262626`, `--text-primary: #fafafa`, `--border: #3f3f3f`, `--accent-primary: #69c994`.
   - Radii: 12px default, 16px large.
2. `src/components/sidebar/Sidebar.tsx`:
   - Expanded width ~272px, collapsed width ~80px.
   - Header with `CoresideLogo`.
   - Sections: Chats (`MessageSquare`), Tools / Apps (`Wrench`), Projects (`Folder`), Bottom Settings (`Settings`).
3. `docs/WALLPAPERS.md` & `LIVE_WALLPAPERS.md`:
   - Supported wallpaper modes: `none`, `aurora`, `matrix`, `particles`, `rain`, `pulse`, plus gradient covers.
   - Preview-first architecture with interface transparency.

---

## 4. Implementation Targets & Component Plan
1. `src/components/marketing/DemoWindowControls.tsx`: Authentic macOS traffic lights.
2. `src/components/marketing/DesktopWindow.tsx`: Realistic desktop window with title bar and elevation.
3. `src/components/marketing/ProductStage.tsx`: Art-directed colored stage with original palettes and subtle noise.
4. `src/components/marketing/CoresideDemoShell.tsx`: Faithful desktop sidebar + workspace anatomy.
5. Overhaul `FAQ.tsx` into asymmetric editorial layout with clean dividers.
6. Overhaul `Personalization.tsx` with scoped theme tokens and genuine wallpaper presets (Paper, Aurora, Midnight).
7. Refactor `ScrollStory.tsx` and `ScrollStoryPreview.tsx` to embed within `ProductStage`.
8. Refactor `Hero.tsx`, `ExampleApps.tsx`, and `PersistenceStory.tsx` to adopt the new window chrome and stage systems.
