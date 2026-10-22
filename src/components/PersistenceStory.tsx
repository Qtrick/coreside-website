import React from 'react';
import { ShieldCheck, FolderKanban } from 'lucide-react';
import { Reveal } from '@/components/site/Reveal';

export const PersistenceStory: React.FC = () => {
  return (
    <section id="continuity" className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-850 scroll-mt-16">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Continuity
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Keep what you build. Change what you need.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            Personal software shouldn't break when you improve it. Coreside is engineered to evolve your apps while keeping your existing notes and records intact.
          </p>
        </Reveal>

        {/* Before and After Side-by-Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Card 1: Initial App (v1.0) */}
          <Reveal delay={0.1} className="h-full">
            <div className="group h-full p-6 rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xs hover:shadow-sm hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                  <span className="text-xs font-mono font-medium text-neutral-500">
                    Initial Creation (v1.0)
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                    Simple list
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                    Study Planner
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Initial generated interface
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 flex items-center justify-center text-[9px] font-bold">✓</span>
                    <span className="line-through text-neutral-400">Read Molecular Genetics Chapter 4</span>
                  </div>
                  <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 rounded border border-neutral-300 dark:border-neutral-700" />
                    <span className="text-neutral-800 dark:text-neutral-200">Complete Differential Equations Set 3</span>
                  </div>
                  <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 rounded border border-neutral-300 dark:border-neutral-700" />
                    <span className="text-neutral-800 dark:text-neutral-200">Implement Binary Search Tree in Rust</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-500 dark:text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                User decides: "I need priority tags and a completion summary."
              </p>
            </div>
          </Reveal>

          {/* Card 2: Evolved App (v1.1) */}
          <Reveal delay={0.2} className="h-full">
            <div className="group h-full p-6 rounded-2xl border border-neutral-400 dark:border-neutral-600 bg-white dark:bg-neutral-900 shadow-md hover:shadow-lg hover:border-neutral-500 dark:hover:border-neutral-500 transition-all duration-200 flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                  <span className="text-xs font-mono font-medium text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
                    Evolved Version (v1.1)
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-medium shadow-2xs">
                    State preserved
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                    Study Planner with Priorities
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Schema updated • 3 tasks kept intact
                  </p>
                </div>

                {/* Progress Summary added */}
                <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-800 space-y-1">
                  <div className="flex justify-between text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                    <span>Completion</span>
                    <span className="font-mono">33% (1/3)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                    <div className="h-full bg-indigo-600 dark:bg-indigo-400 w-1/3 rounded-full" />
                  </div>
                </div>

                {/* Preserved tasks with new priority badges */}
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-3.5 h-3.5 rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 flex items-center justify-center text-[9px] font-bold">✓</span>
                      <span className="line-through text-neutral-400">Read Molecular Genetics Chapter 4</span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                      Medium
                    </span>
                  </div>
                  <div className="p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-3.5 h-3.5 rounded border border-neutral-300 dark:border-neutral-700" />
                      <span className="text-neutral-800 dark:text-neutral-200 font-medium">Complete Differential Equations Set 3</span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                      High
                    </span>
                  </div>
                  <div className="p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-3.5 h-3.5 rounded border border-neutral-300 dark:border-neutral-700" />
                      <span className="text-neutral-800 dark:text-neutral-200 font-medium">Implement Binary Search Tree in Rust</span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                      High
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-300 pt-2 border-t border-neutral-100 dark:border-neutral-800 font-medium">
                Every existing task was preserved without manual re-entry.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Projects highlight */}
        <Reveal delay={0.25} className="mt-12 max-w-xl mx-auto">
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/60 flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
            <FolderKanban className="w-5 h-5 text-neutral-900 dark:text-neutral-100 shrink-0" />
            <p>
              <strong className="text-neutral-900 dark:text-neutral-100">Project workspaces:</strong> Group related personal apps, notes, and research into dedicated project folders that stay clean and focused.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
