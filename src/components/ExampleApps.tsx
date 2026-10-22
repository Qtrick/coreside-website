import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Check, Flame } from 'lucide-react';
import { Reveal } from '@/components/site/Reveal';
import type { ExampleAppId } from '@/types';
import { motionTokens } from '@/lib/motion-tokens';

export const ExampleApps: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ExampleAppId>('planner');
  const shouldReduceMotion = useReducedMotion();

  // Interactive state for Study Planner (persists across tab switches)
  const [plannerTasks, setPlannerTasks] = useState([
    { id: '1', title: 'Biology: Cell Division Lab Report', due: 'Tomorrow', priority: 'High', done: false },
    { id: '2', title: 'Calculus: Integration by Parts', due: 'Friday', priority: 'Medium', done: true },
    { id: '3', title: 'CS: Graph Traversal Algorithms', due: 'Next Monday', priority: 'High', done: false },
    { id: '4', title: 'History: European Treaty Review', due: 'Oct 28', priority: 'Normal', done: false },
  ]);

  // Interactive state for Habit Tracker (persists across tab switches)
  const [habits, setHabits] = useState([
    { id: '1', name: 'Morning Deep Reading (25m)', streak: 12, doneToday: true },
    { id: '2', name: 'Afternoon Workout or Run', streak: 6, doneToday: false },
    { id: '3', name: 'Review Flashcards / Quiz', streak: 19, doneToday: true },
    { id: '4', name: 'Reflect & Plan Tomorrow', streak: 4, doneToday: false },
  ]);

  // Interactive state for Quiz / Utility (persists across tab switches)
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const togglePlannerTask = (id: string) => {
    setPlannerTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const nextDone = !h.doneToday;
          return {
            ...h,
            doneToday: nextDone,
            streak: nextDone ? h.streak + 1 : Math.max(0, h.streak - 1),
          };
        }
        return h;
      })
    );
  };

  const completedPlannerCount = plannerTasks.filter((t) => t.done).length;
  const plannerPercent = Math.round((completedPlannerCount / plannerTasks.length) * 100);

  const completedHabitsCount = habits.filter((h) => h.doneToday).length;

  const tabs: { id: ExampleAppId; label: string }[] = [
    { id: 'planner', label: 'Study Planner' },
    { id: 'habits', label: 'Habit Tracker' },
    { id: 'checklist', label: 'Interactive Quiz & Checklist' },
  ];

  // ARIA keyboard navigation between tabs
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      setActiveTab(tabs[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[prevIndex].id);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveTab(tabs[0].id);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveTab(tabs[tabs.length - 1].id);
    }
  };

  return (
    <section id="examples" className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-850 scroll-mt-16 bg-neutral-50/30 dark:bg-neutral-950/30">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mx-auto text-center space-y-4 mb-12">
          <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Real Examples
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            A different app for every need.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            Every person thinks differently. Coreside lets you shape custom apps that match your exact routines and classes.
          </p>
        </Reveal>

        {/* Tab navigation buttons with animated layout pill */}
        <div className="flex justify-center mb-8">
          <div
            role="tablist"
            aria-label="Example applications"
            className="inline-flex p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xs gap-1"
          >
            {tabs.map((tab, idx) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 ${
                    isSelected
                      ? 'text-neutral-950 dark:text-white font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeExampleTabPill"
                      className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-lg -z-10 border border-neutral-200 dark:border-neutral-700 shadow-xs"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contained Preview Window with smooth height stabilization */}
        <Reveal variant="scale-in" className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg overflow-hidden min-h-[460px] flex flex-col justify-between">
            {/* Header Bar */}
            <div className="h-10 px-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-950/60 flex items-center justify-between text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span className="ml-2 font-mono text-[11px] text-neutral-500">
                  {activeTab === 'planner' && 'StudyPlanner.app'}
                  {activeTab === 'habits' && 'HabitLedger.app'}
                  {activeTab === 'checklist' && 'KnowledgeQuiz.app'}
                </span>
              </div>
              <span className="font-mono text-[10px] text-neutral-400">
                Interactive sample
              </span>
            </div>

            {/* Animated Tab Content Frame with AnimatePresence */}
            <div className="flex-1 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {activeTab === 'planner' && (
                  <motion.div
                    key="tab-planner"
                    id="panel-planner"
                    role="tabpanel"
                    aria-labelledby="tab-planner"
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
                    className="p-6 space-y-6 flex-1"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                          Fall Semester Planner
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Tasks organized by class and priority.
                        </p>
                      </div>
                      {/* Contained Soft Indigo Accent */}
                      <div className="text-right">
                        <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                          {plannerPercent}% done
                        </span>
                        <div className="w-24 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden mt-1">
                          <motion.div
                            className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${plannerPercent}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {plannerTasks.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => togglePlannerTask(t.id)}
                          role="checkbox"
                          aria-checked={t.done}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                              e.preventDefault();
                              togglePlannerTask(t.id);
                            }
                          }}
                          className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                            t.done
                              ? 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/40 text-neutral-400 dark:text-neutral-500'
                              : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 hover:border-neutral-400 hover:shadow-xs'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                t.done
                                  ? 'bg-neutral-900 dark:bg-neutral-100 border-neutral-900 dark:border-neutral-100 text-white dark:text-neutral-950'
                                  : 'border-neutral-400 dark:border-neutral-600'
                              }`}
                            >
                              {t.done && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className={`text-xs sm:text-sm ${t.done ? 'line-through' : 'font-medium'}`}>
                              {t.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-neutral-400 dark:text-neutral-500 font-mono hidden sm:inline">
                              {t.due}
                            </span>
                            {/* Contained Accent Badges */}
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                t.priority === 'High'
                                  ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                                  : t.priority === 'Medium'
                                  ? 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                              }`}
                            >
                              {t.priority}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'habits' && (
                  <motion.div
                    key="tab-habits"
                    id="panel-habits"
                    role="tabpanel"
                    aria-labelledby="tab-habits"
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
                    className="p-6 space-y-6 flex-1"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                          Daily Discipline Ledger
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {completedHabitsCount} of {habits.length} habits logged today
                        </p>
                      </div>
                      {/* Contained Muted Emerald Accent */}
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                        <Flame className="w-3.5 h-3.5 fill-current" />
                        <span>Streaks active</span>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {habits.map((h) => (
                        <div
                          key={h.id}
                          onClick={() => toggleHabit(h.id)}
                          role="checkbox"
                          aria-checked={h.doneToday}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                              e.preventDefault();
                              toggleHabit(h.id);
                            }
                          }}
                          className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-xs transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                h.doneToday
                                  ? 'bg-emerald-600 border-emerald-600 text-white'
                                  : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-400'
                              }`}
                            >
                              {h.doneToday && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <span className={`text-xs sm:text-sm font-medium ${h.doneToday ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-600 dark:text-neutral-400'}`}>
                              {h.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                            <Flame className={`w-3.5 h-3.5 ${h.doneToday ? 'text-amber-500 fill-current' : 'text-neutral-400'}`} />
                            <span>{h.streak}d</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'checklist' && (
                  <motion.div
                    key="tab-checklist"
                    id="panel-checklist"
                    role="tabpanel"
                    aria-labelledby="tab-checklist"
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
                    className="p-6 space-y-6 flex-1"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
                        Interactive Quiz Component
                      </span>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                        Quick Architecture Check: Where do Coreside apps run?
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Select an answer below to test declarative quiz evaluation.
                      </p>
                    </div>

                    <div className="space-y-2">
                      {[
                        { id: 0, text: 'In an external cloud server that requires high subscription fees', correct: false },
                        { id: 1, text: 'Locally on your desktop, rendered from declarative validated components', correct: true },
                        { id: 2, text: 'As disposable web pages generated via unverified random HTML scripts', correct: false },
                      ].map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setQuizAnswer(option.id)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            quizAnswer === option.id
                              ? option.correct
                                ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100'
                                : 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100'
                              : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 hover:shadow-xs'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option.text}</span>
                            {quizAnswer === option.id && (
                              <span className="text-xs font-bold font-mono">
                                {option.correct ? '✓ Correct' : '✕ Try again'}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    {quizAnswer !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-600 dark:text-neutral-300"
                      >
                        Coreside applications run directly in the desktop workspace using validated registry components and local SQLite persistence.
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Designation */}
              <div className="p-3.5 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                <span>Color accents remain inside the created app frame.</span>
                <span className="font-mono text-[10px]">Illustrative preview</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
