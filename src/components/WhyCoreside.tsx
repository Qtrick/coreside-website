import React from 'react';
import { MessageSquareDashed, Sparkles, Check } from 'lucide-react';
import { Reveal } from '@/components/site/Reveal';

export const WhyCoreside: React.FC = () => {
  return (
    <section className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-850 relative">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Thesis */}
          <Reveal className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/70 text-neutral-800 dark:text-neutral-200 text-xs font-mono uppercase tracking-wider">
              <span>Why Coreside</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.12]">
              Most software asks you to adapt.
            </h2>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
              Standard tools force your work into rigid dashboards you can't reshape. Chat tools give you great answers, but the text vanishes the moment you close the tab.
            </p>

            <div className="pt-2 border-l-2 border-neutral-900 dark:border-neutral-100 pl-4 space-y-1">
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Your software should adapt when your day does.
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Coreside bridges conversational requests and persistent desktop apps.
              </p>
            </div>
          </Reveal>

          {/* Right Column: Grounded Comparison Architecture */}
          <div className="lg:col-span-7 space-y-6">
            {/* The Friction */}
            <Reveal delay={0.1}>
              <div className="p-6 sm:p-7 rounded-2xl border border-neutral-200 dark:border-neutral-850 bg-neutral-50/50 dark:bg-neutral-950/40 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-200/70 dark:bg-neutral-850 flex items-center justify-center text-neutral-600 dark:text-neutral-400">
                    <MessageSquareDashed className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                    The Disposable Output Trap
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  You spend twenty minutes explaining a syllabus or personal habit system to an AI, only to get a markdown checklist you have to copy-paste somewhere else. Next week, you start from scratch.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-neutral-500 font-mono">
                  <div className="p-2.5 rounded-lg border border-neutral-200/70 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                    Ephemeral chat logs
                  </div>
                  <div className="p-2.5 rounded-lg border border-neutral-200/70 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                    Unsaved data states
                  </div>
                  <div className="p-2.5 rounded-lg border border-neutral-200/70 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                    Copy-paste friction
                  </div>
                </div>
              </div>
            </Reveal>

            {/* The Coreside Model */}
            <Reveal delay={0.2}>
              <div className="p-6 sm:p-7 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                      The Coreside Workspace Model
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    Living software
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Your request compiles into an interactive, structured application that lives beside your conversations. It stores your notes and tasks on your computer and evolves whenever you ask for updates.
                </p>

                <ul className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 text-neutral-950 dark:text-white shrink-0" />
                    <span>Real interactive buttons, checkboxes, and progress indicators</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 text-neutral-950 dark:text-white shrink-0" />
                    <span>Existing records and tasks remain intact when adding new capabilities</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 text-neutral-950 dark:text-white shrink-0" />
                    <span>All application state saved locally in SQLite on your desktop</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
