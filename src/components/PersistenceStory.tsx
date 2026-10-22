import React from 'react';
import { ShieldCheck, FolderKanban } from 'lucide-react';
import { Reveal } from '@/components/site/Reveal';
import { ProductStage } from '@/components/marketing/ProductStage';
import { DesktopWindow } from '@/components/marketing/DesktopWindow';

export const PersistenceStory: React.FC = () => {
  return (
    <section id="continuity" className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-850 scroll-mt-16">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mx-auto text-center space-y-4 mb-12 md:mb-16">
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

        {/* Side-by-Side Comparison framed inside Warm ProductStage */}
        <Reveal variant="scale-in" className="max-w-5xl mx-auto">
          <ProductStage
            variant="apricot-dusk"
            badge="Continuity Demonstration"
            stagePadding="p-4 sm:p-6 md:p-8 lg:p-9"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Window 1: Initial App (v1.0) */}
              <DesktopWindow
                title="Study Planner"
                subtitle="v1.0 (Initial)"
                active={false}
                rightAccessory={
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-500">
                    Simple list
                  </span>
                }
                bodyClassName="p-5 flex flex-col justify-between space-y-5 h-full"
              >
                <div className="space-y-3.5">
                  <div className="pb-2.5 border-b border-neutral-100 dark:border-neutral-800">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      Study Planner
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Initial generated task checklist
                    </p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5 bg-neutral-50/50 dark:bg-neutral-900/50">
                      <span className="w-3.5 h-3.5 rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 flex items-center justify-center text-[9px] font-bold">✓</span>
                      <span className="line-through text-neutral-400">Read Molecular Genetics Chapter 4</span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5 bg-white dark:bg-neutral-900">
                      <span className="w-3.5 h-3.5 rounded border border-neutral-300 dark:border-neutral-700" />
                      <span className="text-neutral-800 dark:text-neutral-200">Complete Differential Equations Set 3</span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5 bg-white dark:bg-neutral-900">
                      <span className="w-3.5 h-3.5 rounded border border-neutral-300 dark:border-neutral-700" />
                      <span className="text-neutral-800 dark:text-neutral-200">Implement Binary Search Tree in Rust</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  User prompt: "I need priority tags and a completion summary."
                </p>
              </DesktopWindow>

              {/* Window 2: Evolved App (v1.1) */}
              <DesktopWindow
                title="Study Planner"
                subtitle="v1.1 (Evolved)"
                active={true}
                rightAccessory={
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1 border border-emerald-200/50 dark:border-emerald-900/50">
                    <ShieldCheck className="w-3 h-3" />
                    Data preserved
                  </span>
                }
                bodyClassName="p-5 flex flex-col justify-between space-y-5 h-full"
              >
                <div className="space-y-3.5">
                  <div className="pb-2.5 border-b border-neutral-100 dark:border-neutral-800">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      Study Planner with Priorities
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Schema updated • 3 tasks kept intact
                    </p>
                  </div>

                  {/* Progress Summary added */}
                  <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-800 space-y-1">
                    <div className="flex justify-between text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                      <span className="font-semibold text-[10px]">Progress Summary</span>
                      <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">33% (1/3)</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                      <div className="h-full bg-indigo-600 dark:bg-indigo-400 w-1/3 rounded-full" />
                    </div>
                  </div>

                  {/* Preserved tasks with new priority badges */}
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/50">
                      <div className="flex items-center gap-2.5">
                        <span className="w-3.5 h-3.5 rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 flex items-center justify-center text-[9px] font-bold">✓</span>
                        <span className="line-through text-neutral-400">Read Molecular Genetics Chapter 4</span>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                        Medium
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-between bg-white dark:bg-neutral-900">
                      <div className="flex items-center gap-2.5">
                        <span className="w-3.5 h-3.5 rounded border border-neutral-300 dark:border-neutral-700" />
                        <span className="text-neutral-800 dark:text-neutral-200 font-medium">Complete Differential Equations Set 3</span>
                      </div>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/60 font-medium text-[9px]">
                        High
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-between bg-white dark:bg-neutral-900">
                      <div className="flex items-center gap-2.5">
                        <span className="w-3.5 h-3.5 rounded border border-neutral-300 dark:border-neutral-700" />
                        <span className="text-neutral-800 dark:text-neutral-200 font-medium">Implement Binary Search Tree in Rust</span>
                      </div>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/60 font-medium text-[9px]">
                        High
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-600 dark:text-neutral-300 pt-3 border-t border-neutral-100 dark:border-neutral-800 font-medium">
                  Every existing task was preserved without manual re-entry.
                </p>
              </DesktopWindow>
            </div>
          </ProductStage>
        </Reveal>

        {/* Projects highlight */}
        <Reveal delay={0.25} className="mt-10 max-w-xl mx-auto">
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
