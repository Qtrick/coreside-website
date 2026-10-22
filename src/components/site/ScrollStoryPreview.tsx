import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Check, Sparkles, ShieldCheck, LayoutTemplate } from 'lucide-react';
import { motionTokens } from '@/lib/motion-tokens';

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

  return (
    <div
      className={`rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden flex flex-col justify-between ${className}`}
      aria-label="Interactive Coreside application preview"
    >
      {/* Desktop Window Titlebar */}
      <div className="h-10 px-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-950/60 flex items-center justify-between text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          <span className="ml-2 font-mono text-[11px] text-neutral-600 dark:text-neutral-400">
            Coreside: Personal Workspace
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
            {activeScene === 1 && 'Scene 1: Request'}
            {activeScene === 2 && 'Scene 2: Proposal & Creation'}
            {activeScene === 3 && 'Scene 3: Live Evolution'}
            {activeScene === 4 && 'Scene 4: Persistent Workspace'}
          </span>
        </div>
      </div>

      {/* Main Workspace Frame */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5 min-h-[440px]">
        {/* Top Chat & Intent Banner */}
        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {activeScene === 1 && (
              <motion.div
                key="scene-1-chat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={transitionConfig}
                className="space-y-2.5"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Chat Conversation</span>
                  <span>Turn 1</span>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 font-medium">
                  "Make me a study planner for this semester with my course tasks."
                </div>
              </motion.div>
            )}

            {activeScene === 2 && (
              <motion.div
                key="scene-2-proposal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={transitionConfig}
                className="p-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-950/70 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                    Proposal Ready
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">Risk: Low</span>
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={transitionConfig}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Follow-up evolution</span>
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Data preserved
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-neutral-100">
                  "Add priorities and a completion summary. Keep my existing tasks."
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Central App Canvas */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {activeScene === 1 ? (
              /* Scene 1: Empty App Placeholder */
              <motion.div
                key="empty-placeholder"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={transitionConfig}
                className="p-8 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/30 flex flex-col items-center justify-center text-center space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
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
                className="p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-4"
              >
                {/* App Header */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center font-bold text-xs text-neutral-900 dark:text-neutral-100">
                      SP
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        Study Planner
                      </h4>
                      <p className="text-[10px] text-neutral-500">
                        {tasks.length} course tasks • Local SQLite
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                    v{activeScene >= 3 ? '1.1 (Evolved)' : '1.0 (Initial)'}
                  </span>
                </div>

                {/* Progress Summary: Appears in Scene 3 & 4 */}
                <AnimatePresence>
                  {activeScene >= 3 && (
                    <motion.div
                      key="progress-bar-container"
                      initial={{ opacity: 0, height: 0, y: -6 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -6 }}
                      transition={transitionConfig}
                      className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1.5 overflow-hidden"
                    >
                      <div className="flex items-center justify-between text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        <span>Progress Summary</span>
                        <span className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                          {progressPercent}% completed
                        </span>
                      </div>
                      {/* Contained tasteful indigo progress bar */}
                      <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                        <motion.div
                          className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.4, ease: motionTokens.easing.smooth }}
                        />
                      </div>
                      <p className="text-[10px] text-neutral-500">
                        {completedCount} of {tasks.length} course obligations complete
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tasks List */}
                <div className="space-y-2">
                  {tasks.map((task, idx) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.2 }}
                      onClick={() => onToggleTask(task.id)}
                      role="checkbox"
                      aria-checked={task.completed}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault();
                          onToggleTask(task.id);
                        }
                      }}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                        task.completed
                          ? 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/20 text-neutral-400 dark:text-neutral-500'
                          : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 hover:border-neutral-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            task.completed
                              ? 'bg-neutral-900 border-neutral-900 dark:bg-neutral-100 dark:border-neutral-100 text-white dark:text-neutral-950'
                              : 'border-neutral-400 dark:border-neutral-600'
                          }`}
                        >
                          {task.completed && <Check className="w-3 h-3 stroke-[2.5]" />}
                        </div>
                        <span className={`${task.completed ? 'line-through text-neutral-400' : 'font-medium'}`}>
                          {task.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-neutral-500 px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
                          {task.subject}
                        </span>

                        {/* Priority Badge appears in Scene 3 & 4 */}
                        {activeScene >= 3 && task.priority && (
                          <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                              task.priority === 'High'
                                ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                                : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                            }`}
                          >
                            {task.priority}
                          </motion.span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Subtext */}
        <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
            <span>Click any task to test live workspace state</span>
          </div>
          <span className="font-mono text-[10px] text-neutral-400">
            Illustrative preview
          </span>
        </div>
      </div>
    </div>
  );
};
