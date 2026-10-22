import React, { useState } from 'react';
import { Palette, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Reveal } from '@/components/site/Reveal';
import { motionTokens } from '@/lib/motion-tokens';

type PresetId = 'minimal' | 'slate' | 'obsidian';

interface Preset {
  id: PresetId;
  name: string;
  description: string;
  bgClass: string;
  cardClass: string;
}

const PRESETS: Record<PresetId, Preset> = {
  minimal: {
    id: 'minimal',
    name: 'Paper Minimal',
    description: 'Clean high-contrast layout with pure flat borders.',
    bgClass: 'bg-white dark:bg-neutral-950',
    cardClass: 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800',
  },
  slate: {
    id: 'slate',
    name: 'Subtle Slate',
    description: 'Soft neutral undertones designed for long evening study sessions.',
    bgClass: 'bg-zinc-50 dark:bg-[#0c0c0e]',
    cardClass: 'bg-zinc-100/70 dark:bg-[#141417] border-zinc-200 dark:border-zinc-800',
  },
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian Glass',
    description: 'Deep contrast surfaces with refined hairline dividing accents.',
    bgClass: 'bg-neutral-100 dark:bg-[#060607]',
    cardClass: 'bg-white/90 dark:bg-[#111113] border-neutral-300 dark:border-neutral-800',
  },
};

export const Personalization: React.FC = () => {
  const [workspaceMode, setWorkspaceMode] = useState<'dark' | 'light'>('dark');
  const [selectedPreset, setSelectedPreset] = useState<PresetId>('slate');

  const preset = PRESETS[selectedPreset];

  return (
    <section className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-850 bg-neutral-50/50 dark:bg-neutral-950/50">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Appearance
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Make the space yours.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            Customize your personal workspace with tailored light and dark themes, clean typography, and quiet desktop wallpapers.
          </p>
        </Reveal>

        {/* Interactive In-App Theme & Wallpaper Preview */}
        <Reveal variant="scale-in" className="max-w-4xl mx-auto space-y-6">
          {/* Controls to toggle in-product preview mode & presets */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2">
            {/* Wallpaper / Preset Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-neutral-500">Preset:</span>
              <div className="flex items-center gap-1.5 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                {(['minimal', 'slate', 'obsidian'] as PresetId[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedPreset(id)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                      selectedPreset === id
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-2xs'
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
                    }`}
                  >
                    {PRESETS[id].name}
                  </button>
                ))}
              </div>
            </div>

            {/* Dark / Light in-product toggle */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <button
                type="button"
                onClick={() => setWorkspaceMode('dark')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  workspaceMode === 'dark'
                    ? 'bg-neutral-900 text-white dark:bg-neutral-800 dark:text-neutral-100 shadow-2xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>
              <button
                type="button"
                onClick={() => setWorkspaceMode('light')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  workspaceMode === 'light'
                    ? 'bg-neutral-200 text-neutral-900 shadow-2xs font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>
            </div>
          </div>

          {/* Desktop App Mockup Frame */}
          <div
            className={`rounded-2xl border transition-colors duration-300 shadow-xl overflow-hidden ${
              workspaceMode === 'dark'
                ? 'border-neutral-800 bg-neutral-950 text-neutral-100'
                : 'border-neutral-300 bg-white text-neutral-900'
            }`}
          >
            {/* Title Bar */}
            <div
              className={`h-10 px-4 border-b flex items-center justify-between text-xs ${
                workspaceMode === 'dark'
                  ? 'border-neutral-800 bg-neutral-900/80 text-neutral-400'
                  : 'border-neutral-200 bg-neutral-100/90 text-neutral-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-400/60" />
                <span className="ml-2 font-mono text-[11px]">
                  Coreside: Workspace Appearance ({workspaceMode} • {preset.name})
                </span>
              </div>
              <span className="text-[10px] font-mono">Follows macOS & Custom Modes</span>
            </div>

            {/* In-app workspace canvas with preset styling */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedPreset}-${workspaceMode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: motionTokens.duration.fast }}
                className={`p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 transition-colors duration-200 ${preset.bgClass}`}
              >
                {/* Workspace Settings panel */}
                <div
                  className={`p-4 rounded-xl border space-y-3 transition-colors ${preset.cardClass}`}
                >
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-neutral-500" />
                    <span className="text-xs font-semibold">Appearance</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-neutral-500">
                    <div className="flex justify-between py-1 border-b border-neutral-200 dark:border-neutral-800">
                      <span>Theme</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 capitalize">{workspaceMode}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-200 dark:border-neutral-800">
                      <span>Wallpaper</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200">{preset.name}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Dock Tile</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200">Adaptive</span>
                    </div>
                  </div>
                </div>

                {/* Sample personal app cards inside the mockup */}
                <div
                  className={`md:col-span-2 p-5 rounded-xl border space-y-4 transition-colors ${preset.cardClass}`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold tracking-tight uppercase">
                      Personalized Workspace Layout
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-400">
                      Protected Core Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div
                      className={`p-3.5 rounded-lg border ${
                        workspaceMode === 'dark'
                          ? 'border-neutral-800 bg-neutral-950/80'
                          : 'border-neutral-200 bg-white'
                      }`}
                    >
                      <p className="font-medium">Focus Checkpoints</p>
                      <p className="text-[11px] text-neutral-500 mt-1">
                        Custom checklist pinned to morning routine
                      </p>
                    </div>
                    <div
                      className={`p-3.5 rounded-lg border ${
                        workspaceMode === 'dark'
                          ? 'border-neutral-800 bg-neutral-950/80'
                          : 'border-neutral-200 bg-white'
                      }`}
                    >
                      <p className="font-medium">Research Log</p>
                      <p className="text-[11px] text-neutral-500 mt-1">
                        Saved web citations and synthesis notes
                      </p>
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    While personal app layouts, backgrounds, and themes adapt to your taste, Coreside's core security boundary and branding remain trusted and protected.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
