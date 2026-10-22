import React, { useState } from 'react';
import { Palette, Moon, Sun, Check } from 'lucide-react';
import { Reveal } from '@/components/site/Reveal';
import { ProductStage, type StageVariant } from '@/components/marketing/ProductStage';
import { DesktopWindow } from '@/components/marketing/DesktopWindow';

type PresetId = 'paper' | 'aurora' | 'midnight';

interface AppearancePreset {
  id: PresetId;
  name: string;
  stageVariant: StageVariant;
  description: string;
  wallpaperGlowLight: string;
  wallpaperGlowDark: string;
}

const APPEARANCE_PRESETS: Record<PresetId, AppearancePreset> = {
  paper: {
    id: 'paper',
    name: 'Paper Clean',
    stageVariant: 'apricot-dusk',
    description: 'Minimal high-contrast layout with pure neutral borders and quiet surfaces.',
    wallpaperGlowLight: 'bg-gradient-to-br from-[#faf7f5] to-[#f0e9e4]',
    wallpaperGlowDark: 'bg-gradient-to-br from-[#121215] to-[#0a0a0c]',
  },
  aurora: {
    id: 'aurora',
    name: 'Aurora Atmosphere',
    stageVariant: 'aurora-pearl',
    description: 'Atmospheric desktop wallpaper with northern-lights ambient glow and translucent panels.',
    wallpaperGlowLight: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-200/50 via-emerald-100/30 to-[#f4f7f6]',
    wallpaperGlowDark: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/40 via-emerald-950/20 to-[#080c10]',
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Ink',
    stageVariant: 'mineral-night',
    description: 'Deep cobalt obsidian surfaces with illuminated edge highlights.',
    wallpaperGlowLight: 'bg-gradient-to-br from-[#eaf0f8] via-[#e2ebf5] to-[#edf3f9]',
    wallpaperGlowDark: 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-950/50 via-slate-950 to-[#05070a]',
  },
};

export const Personalization: React.FC = () => {
  const [workspaceMode, setWorkspaceMode] = useState<'dark' | 'light'>('dark');
  const [selectedPreset, setSelectedPreset] = useState<PresetId>('aurora');
  const [transparency, setTransparency] = useState<number>(20);

  const preset = APPEARANCE_PRESETS[selectedPreset];
  const isDark = workspaceMode === 'dark';

  // Explicit scoped color tokens for preview to guarantee 100% theme isolation
  // and completely eliminate white-on-white or dark-on-dark contrast failure
  const themeTokens = isDark
    ? {
        windowBg: 'bg-[#0B0C0E]',
        surface: 'bg-[#15171C]',
        surfaceTranslucent: 'bg-[#15171C]/85 backdrop-blur-md',
        surfaceMuted: 'bg-[#1D2027]',
        textPrimary: 'text-[#F5F6F8]',
        textSecondary: 'text-[#9DA4B0]',
        textMuted: 'text-[#6B7280]',
        border: 'border-[#262A34]',
        borderSubtle: 'border-[#1E222B]',
        tagBg: 'bg-[#1E222B]',
        tagText: 'text-[#D1D5DB]',
      }
    : {
        windowBg: 'bg-[#FFFFFF]',
        surface: 'bg-[#F9FAFB]',
        surfaceTranslucent: 'bg-[#FFFFFF]/90 backdrop-blur-md',
        surfaceMuted: 'bg-[#F3F4F6]',
        textPrimary: 'text-[#111827]',
        textSecondary: 'text-[#4B5563]',
        textMuted: 'text-[#9CA3AF]',
        border: 'border-[#E5E7EB]',
        borderSubtle: 'border-[#F3F4F6]',
        tagBg: 'bg-[#E5E7EB]',
        tagText: 'text-[#374151]',
      };

  return (
    <section id="appearance" className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-850 scroll-mt-16">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        {/* Section Header: Tightly integrated without massive dead zones */}
        <Reveal className="max-w-2xl mx-auto text-center space-y-3 mb-10 md:mb-12">
          <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Appearance & Workspace Customization
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Make the space yours.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            Customize your personal desktop workspace with tailored themes, living wallpapers, and interface transparency.
          </p>
        </Reveal>

        {/* Interactive Appearance Controls & Staged Window */}
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Controls Bar: Grouped with clear labels */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 backdrop-blur-md shadow-2xs">
            {/* Wallpaper Preset Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 pl-1">
                Workspace Look:
              </span>
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60">
                {(['paper', 'aurora', 'midnight'] as PresetId[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedPreset(id)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                      selectedPreset === id
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-2xs font-semibold'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                    }`}
                  >
                    {APPEARANCE_PRESETS[id].name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Theme Selector (Explicitly labeled to distinguish from website theme) */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-neutral-500">
                Preview theme:
              </span>
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60">
                <button
                  type="button"
                  onClick={() => setWorkspaceMode('light')}
                  aria-label="Preview Light Theme"
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    workspaceMode === 'light'
                      ? 'bg-white text-neutral-950 shadow-2xs font-semibold'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light</span>
                </button>
                <button
                  type="button"
                  onClick={() => setWorkspaceMode('dark')}
                  aria-label="Preview Dark Theme"
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    workspaceMode === 'dark'
                      ? 'bg-neutral-900 text-white shadow-2xs font-semibold'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Dark</span>
                </button>
              </div>
            </div>
          </div>

          {/* Staged Product Window */}
          <ProductStage
            variant={preset.stageVariant}
            badge="Personal Workspace"
            stagePadding="p-3 sm:p-6 md:p-8"
          >
            <DesktopWindow
              title="Appearance — Coreside"
              subtitle={`(${workspaceMode} • ${preset.name})`}
              rightAccessory={
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                  Illustrative Preset
                </span>
              }
            >
              {/* Workspace Canvas with Living Wallpaper Background */}
              <div
                className={`relative min-h-[380px] p-4 sm:p-6 transition-colors duration-300 ${
                  isDark ? preset.wallpaperGlowDark : preset.wallpaperGlowLight
                }`}
              >
                {/* Two-Column Personal Workspace: Settings Panel + Active Personal App */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Left Column: Appearance Settings Panel (35%) */}
                  <div
                    className={`md:col-span-5 p-4 rounded-xl border ${themeTokens.border} ${themeTokens.surfaceTranslucent} space-y-3.5 shadow-sm transition-colors duration-200`}
                  >
                    <div className="flex items-center gap-2 pb-2 border-b border-neutral-200/50 dark:border-neutral-800/50">
                      <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <Palette className="w-3.5 h-3.5" />
                      </div>
                      <span className={`text-xs font-bold ${themeTokens.textPrimary}`}>
                        Appearance & Wallpapers
                      </span>
                    </div>

                    {/* Setting Rows */}
                    <div className="space-y-2.5 text-xs">
                      {/* Theme Row */}
                      <div className="flex items-center justify-between">
                        <span className={themeTokens.textSecondary}>Color Theme</span>
                        <span className={`font-mono text-[11px] font-semibold ${themeTokens.textPrimary} capitalize`}>
                          {workspaceMode}
                        </span>
                      </div>

                      {/* Wallpaper Row */}
                      <div className="flex items-center justify-between">
                        <span className={themeTokens.textSecondary}>Wallpaper</span>
                        <span className={`font-mono text-[11px] font-semibold ${themeTokens.textPrimary}`}>
                          {preset.name}
                        </span>
                      </div>

                      {/* Transparency Slider Row */}
                      <div className="space-y-1.5 pt-1 border-t border-neutral-200/40 dark:border-neutral-800/40">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className={themeTokens.textSecondary}>Glass Transparency</span>
                          <span className={`font-mono ${themeTokens.textPrimary}`}>{transparency}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={50}
                          value={transparency}
                          onChange={(e) => setTransparency(Number(e.target.value))}
                          aria-label="Interface transparency percentage"
                          className="w-full accent-emerald-500 h-1 bg-neutral-200 dark:bg-neutral-700 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>

                    <p className={`text-[10px] ${themeTokens.textMuted} leading-relaxed pt-1`}>
                      {preset.description}
                    </p>
                  </div>

                  {/* Right Column: Simulated Personal Application (65%) */}
                  <div
                    className={`md:col-span-7 p-4 sm:p-5 rounded-xl border ${themeTokens.border} ${themeTokens.surfaceTranslucent} space-y-3.5 shadow-sm transition-colors duration-200`}
                  >
                    <div className="flex items-center justify-between pb-2.5 border-b border-neutral-200/50 dark:border-neutral-800/50">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 flex items-center justify-center font-bold text-[10px]">
                          RN
                        </div>
                        <h4 className={`text-xs font-bold ${themeTokens.textPrimary}`}>
                          Research & Reading Log
                        </h4>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${themeTokens.tagBg} ${themeTokens.tagText}`}>
                        Local App
                      </span>
                    </div>

                    {/* App Content */}
                    <div className="space-y-2 text-xs">
                      <div
                        className={`p-2.5 rounded-lg border ${themeTokens.borderSubtle} ${themeTokens.surfaceMuted} flex items-center justify-between`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                          <span className={`font-medium truncate ${themeTokens.textPrimary}`}>
                            Synthesize Distributed State Algorithms
                          </span>
                        </div>
                        <span className={`text-[10px] font-mono ${themeTokens.textMuted} shrink-0`}>
                          Done
                        </span>
                      </div>

                      <div
                        className={`p-2.5 rounded-lg border ${themeTokens.borderSubtle} ${themeTokens.surfaceMuted} flex items-center justify-between`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`w-4 h-4 rounded border ${themeTokens.border} shrink-0`} />
                          <span className={`font-medium truncate ${themeTokens.textPrimary}`}>
                            Draft Semester Capstone Thesis Outline
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-rose-500 shrink-0 font-medium">
                          Priority
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px]">
                      <span className={themeTokens.textSecondary}>
                        All workspace data stored in private SQLite storage
                      </span>
                      <span className="text-emerald-500 font-mono font-medium text-[10px]">
                        Protected
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </DesktopWindow>
          </ProductStage>
        </div>
      </div>
    </section>
  );
};
