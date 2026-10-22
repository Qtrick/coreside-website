import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Check, Sparkles, ShieldCheck, LayoutTemplate } from 'lucide-react';
import { motionTokens } from '@/lib/motion-tokens';
import { ProductStage } from '@/components/marketing/ProductStage';
import { DesktopWindow } from '@/components/marketing/DesktopWindow';
import { CoresideDemoShell } from '@/components/marketing/CoresideDemoShell';

export interface StoryTask {
  id: string;
  title: string;
  subject: string;
  completed: boolean;
  priority?: 'High' | 'Medium' | 'Normal';
  isNew?: boolean;
}

interface ScrollStoryPreviewProps {
  activeScene: 1 | 2 | 3 | 4;
  tasks: StoryTask[];
  onToggleTask: (id: string) => void;
  onResetTasks?: () => void;
  className?: string;
}

export const ScrollStoryPreview: React.FC<ScrollStoryPreviewProps> = ({
  activeScene,
  tasks,
  onToggleTask,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  // Transition settings based on reduced motion
  const transitionConfig = shouldReduceMotion
    ? { duration: 0.01 }
    : { duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth };

  // Chat panel content depending on activeScene
  const chatPanel = (
    <div className="space-y-2.5">
      <AnimatePresence mode="wait">
        {activeScene === 1 && (
          <motion.div
            key="scene-1-chat"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={transitionConfig}
            className="space-y-1.5"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span>Chat Conversation</span>
              <span>Turn 1</span>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 text-xs sm:text-[13px] text-neutral-900 dark:text-neutral-100 font-medium shadow-2xs">
              "Make me a study planner for this semester with my course tasks."
            </div>
          </motion.div>
        )}

        {activeScene === 2 && (
          <motion.div
            key="scene-2-proposal"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={transitionConfig}
            className="p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/90 space-y-1.5 text-xs shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60">
                Proposal Ready
              </span>
              <span className="text-[10px] font-mono text-neutral-500">Structured preview</span>
            </div>
            <p className="font-semibold text-neutral-900 dark:text-neutral-100">
              Create Study Planner App
            </p>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
              Creates an interactive course task checklist. Stored locally in SQLite.
            </p>
          </motion.div>
        )}

        {activeScene >= 3 && (
          <motion.div
            key="scene-3-evolution"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={transitionConfig}
            className="space-y-1.5"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span>Follow-up evolution</span>
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Data preserved
              </span>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 text-xs text-neutral-900 dark:text-neutral-100 shadow-2xs">
              "Add priorities and a completion summary. Keep my existing tasks."
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Tool canvas content
  const toolCanvas = (
    <AnimatePresence mode="wait">
      {activeScene === 1 ? (
        /* Scene 1: Empty App Placeholder */
        <motion.div
          key="empty-placeholder"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={transitionConfig}
          className="p-8 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-950/40 flex flex-col items-center justify-center text-center space-y-3 min-h-[220px]"
        >
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 flex items-center justify-center text-neutral-400 shadow-2xs">
            <LayoutTemplate className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              App Space Ready
            </p>
            <p className="text-[11px] text-neutral-500 max-w-xs mt-1">
              Your personal software interface will take shape here once the change proposal is approved.
            </p>
          </div>
        </motion.div>
      ) : (
        /* Scenes 2, 3, 4: Active Study Planner Interface */
        <motion.div
          key="active-planner-canvas"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={transitionConfig}
          className="p-4 sm:p-5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3.5 shadow-2xs"
        >
          {/* App Header */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center font-bold text-xs text-neutral-900 dark:text-neutral-100">
                SP
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-none">
                  Study Planner
                </h4>
                <p className="text-[10px] text-neutral-500 mt-1">
                  {tasks.length} course tasks • Local SQLite
                </p>
              </div>
            </div>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/80 dark:border-neutral-700/80">
              v{activeScene >= 3 ? '1.1 (Evolved)' : '1.0 (Initial)'}
            </span>
          </div>

          {/* Progress Summary: Appears in Scene 3 & 4 */}
          <AnimatePresence>
            {activeScene >= 3 && (
              <motion.div
                key="progress-bar-container"
                initial={{ opacity: 0, height: 0, y: -4 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -4 }}
                transition={transitionConfig}
                className="p-3 rounded-lg bg-neutral-50/80 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800 space-y-1.5 overflow-hidden"
              >
                <div className="flex items-center justify-between text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  <span className="font-semibold text-[11px]">Progress Summary</span>
                  <span className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                    {progressPercent}% completed
                  </span>
                </div>
                {/* Contained tasteful progress bar */}
                <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <motion.div
                    className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.35, ease: motionTokens.easing.smooth }}
                  />
                </div>
                <p className="text-[10px] text-neutral-500">
                  {completedCount} of {tasks.length} course obligations complete
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tasks List */}
          <div className="space-y-1.5">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onToggleTask(task.id)}
                className={`p-2.5 rounded-lg border flex items-center justify-between gap-3 text-xs cursor-pointer transition-all ${
                  task.completed
                    ? 'border-neutral-200/60 dark:border-neutral-850 bg-neutral-50/50 dark:bg-neutral-950/30 text-neutral-400 dark:text-neutral-500'
                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-200'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      task.completed
                        ? 'bg-neutral-900 border-neutral-900 dark:bg-neutral-100 dark:border-neutral-100 text-white dark:text-neutral-900'
                        : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950'
                    }`}
                  >
                    {task.completed && <Check className="w-3 h-3 stroke-[2.5]" />}
                  </span>
                  <span
                    className={`font-medium truncate ${
                      task.completed ? 'line-through text-neutral-400 dark:text-neutral-500' : ''
                    }`}
                  >
                    {task.title}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-mono text-neutral-400">
                    {task.subject}
                  </span>
                  {activeScene >= 3 && task.priority && (
                    <span
                      className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${
                        task.priority === 'High'
                          ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/50 dark:border-rose-900/50'
                          : task.priority === 'Medium'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/50'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {task.priority}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const footerStatus = (
    <>
      <span className="flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
        <span>Click any task to test live workspace state</span>
      </span>
      <span className="font-mono text-[10px] text-neutral-400">
        Illustrative preview
      </span>
    </>
  );

  return (
    <ProductStage
      variant="aurora-pearl"
      badge="Desktop Preview"
      stagePadding="p-3 sm:p-5 md:p-6 lg:p-7"
      className={className}
    >
      <DesktopWindow
        title="Study Planner — Coreside"
        rightAccessory={
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200/70 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-300/40 dark:border-neutral-700/40">
            {activeScene === 1 && 'Scene 1: Request'}
            {activeScene === 2 && 'Scene 2: Proposal & Creation'}
            {activeScene === 3 && 'Scene 3: Live Evolution'}
            {activeScene === 4 && 'Scene 4: Persistent Workspace'}
          </span>
        }
      >
        <CoresideDemoShell
          sidebarActiveItem={activeScene >= 2 ? 'app' : 'chat'}
          activeChatTitle="Study Planner"
          activeAppTitle="Study Planner"
          chatPanel={chatPanel}
          toolCanvas={toolCanvas}
          footerStatus={footerStatus}
        />
      </DesktopWindow>
    </ProductStage>
  );
};
