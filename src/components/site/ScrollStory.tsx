import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react';
import { ScrollStoryPreview, type StoryTask } from './ScrollStoryPreview';
import { Check, ArrowDown } from 'lucide-react';

const INITIAL_STORY_TASKS: StoryTask[] = [
  { id: 't-1', title: 'Molecular Genetics: Lab Synthesis', subject: 'Biology', completed: true, priority: 'Medium' },
  { id: 't-2', title: 'Calculus: Differential Equations Set 3', subject: 'Math', completed: false, priority: 'High' },
  { id: 't-3', title: 'Implement Binary Search Tree in Rust', subject: 'CS 101', completed: false, priority: 'High' },
  { id: 't-4', title: 'European Treaty Historical Analysis', subject: 'History', completed: false, priority: 'Normal' },
];

export interface SceneData {
  id: 1 | 2 | 3 | 4;
  num: string;
  concept: string;
  title: string;
  caption: string;
  body: string;
  featureBullets: string[];
}

export const SCENES: SceneData[] = [
  {
    id: 1,
    num: '01',
    concept: 'Start with a conversation',
    title: 'Describe it.',
    caption: 'Tell Coreside what you need, in your own words.',
    body: 'Describe a study planner, habit tracker, or project utility in ordinary language. You don\'t need to write code, configure database schemas, or adapt to an inflexible template.',
    featureBullets: [
      'Plain-language conversational requests',
      'No rigid templates or manual schema setup',
      'Clear illustrative preview before anything applies',
    ],
  },
  {
    id: 2,
    num: '02',
    concept: 'An app, not just an answer',
    title: 'Watch it take shape.',
    caption: 'Coreside turns the request into an interactive app inside your workspace.',
    body: 'Rather than outputting disposable text that disappears into scroll history, Coreside produces a structured change proposal. Review the proposed app, approve it, and see it take shape inside your space.',
    featureBullets: [
      'Structured change proposals you approve first',
      'Interactive desktop app rendered right in your workspace',
      'Data stored safely on your computer',
    ],
  },
  {
    id: 3,
    num: '03',
    concept: 'Keep changing it',
    title: 'Make it yours.',
    caption: 'Ask for priorities and a progress summary. Your existing tasks stay.',
    body: 'When your routines evolve, you don\'t start over. Ask for follow-up additions in conversation. Coreside modifies the app while keeping every task and record you already entered.',
    featureBullets: [
      'Existing tasks and records stay completely intact',
      'Slot in priority tags, progress bars, and filters',
      'Clear visibility of newly added capabilities',
    ],
  },
  {
    id: 4,
    num: '04',
    concept: 'Part of your workspace',
    title: 'Keep using it.',
    caption: 'Come back, check off a task, and build on what you already made.',
    body: 'Your created app lives directly beside your ongoing conversations and projects. Check off tasks, track daily streaks, and let your personal software grow alongside you.',
    featureBullets: [
      'Always accessible in your personal apps sidebar',
      'Immediate interactive controls and live progress',
      'Predictable desktop software that fits your day',
    ],
  },
];

export const ScrollStory: React.FC = () => {
  const [activeScene, setActiveScene] = useState<1 | 2 | 3 | 4>(1);
  const [tasks, setTasks] = useState<StoryTask[]>(INITIAL_STORY_TASKS);
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Scroll tracking on desktop bounded container
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    let targetScene: 1 | 2 | 3 | 4 = 1;
    if (latest < 0.25) targetScene = 1;
    else if (latest < 0.50) targetScene = 2;
    else if (latest < 0.75) targetScene = 3;
    else targetScene = 4;

    if (targetScene !== activeScene) {
      setActiveScene(targetScene);
    }
  });

  const handleSelectScene = (sceneId: 1 | 2 | 3 | 4) => {
    setActiveScene(sceneId);
    if (!trackRef.current || typeof window === 'undefined') return;

    const rect = trackRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const trackTop = rect.top + scrollTop;
    const scrollableHeight = trackRef.current.offsetHeight - window.innerHeight;

    if (scrollableHeight > 0) {
      // Center of scene's quadrant (0.125, 0.375, 0.625, 0.875)
      const targetProgress = (sceneId - 0.5) / 4;
      const targetY = trackTop + targetProgress * scrollableHeight;
      window.scrollTo({
        top: targetY,
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
      });
    }
  };

  const currentScene = SCENES[activeScene - 1];

  return (
    <section id="product" className="relative border-t border-neutral-200 dark:border-neutral-850 scroll-mt-16">
      {/* Outer Scroll Track for Desktop Sticky Story */}
      <div ref={trackRef} className="relative min-h-[100vh] lg:min-h-[320vh]">
        {/* Sticky Viewport Stage (Desktop) */}
        <div className="hidden lg:flex sticky top-16 md:top-20 z-10 w-full h-[calc(100svh-80px)] max-h-[740px] flex-col justify-between py-6">
          <div className="max-w-site mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-between">
            {/* Top Bar: Section Title + Direct Scene Jump Selector */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Product Walkthrough
                </span>
                <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span className="text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200">
                  Step 0{activeScene} of 04
                </span>
              </div>

              {/* Direct Scene Selectors (Keyboard & Click Reachable) */}
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Walkthrough steps">
                {SCENES.map((s) => {
                  const isSelected = activeScene === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-label={`Step ${s.num}: ${s.title}`}
                      onClick={() => handleSelectScene(s.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs font-semibold'
                          : 'bg-neutral-100 dark:bg-neutral-850 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                      }`}
                    >
                      {s.num}. {s.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main 2-Column Split: Single Exclusive Left Text Stage + Right Stable Preview */}
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center flex-1 py-4">
              {/* Left Column: Bounded Clipped Stage (Strictly Only the Active Scene is Visible) */}
              <div className="col-span-5 relative h-[380px] overflow-hidden flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScene}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-4"
                  >
                    {/* Scene Concept Eyebrow */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-neutral-900 dark:text-neutral-100 px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                        {currentScene.num}
                      </span>
                      <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        {currentScene.concept}
                      </span>
                    </div>

                    {/* Scene Title */}
                    <h3 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
                      {currentScene.title}
                    </h3>

                    {/* Scene Caption */}
                    <p className="text-base font-semibold text-neutral-800 dark:text-neutral-200 leading-snug">
                      {currentScene.caption}
                    </p>

                    {/* Explanatory Body Copy */}
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                      {currentScene.body}
                    </p>

                    {/* Feature Bullets */}
                    <ul className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300">
                      {currentScene.featureBullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-neutral-100 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: Pinned Coreside Desktop Workspace Preview */}
              <div className="col-span-7 flex flex-col justify-center">
                <ScrollStoryPreview
                  activeScene={activeScene}
                  tasks={tasks}
                  onToggleTask={handleToggleTask}
                />
              </div>
            </div>

            {/* Bottom Progress Rail */}
            <div className="pt-3 border-t border-neutral-200/70 dark:border-neutral-800/70 flex items-center justify-between text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-1.5 w-48">
                {SCENES.map((s) => (
                  <div
                    key={s.id}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      activeScene >= s.id
                        ? 'bg-neutral-900 dark:bg-white'
                        : 'bg-neutral-200 dark:bg-neutral-800'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[11px]">
                  <ArrowDown className="w-3 h-3 animate-bounce" />
                  Scroll to evolve the application
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Layout (Stacked, High-Density Walkthrough) */}
        <div className="block lg:hidden py-16 px-4 sm:px-6">
          <div className="max-w-xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                Product Walkthrough
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
                Watch personal software take shape.
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Step through how Coreside translates a conversational request into an interactive app.
              </p>
            </div>

            {/* Segmented Controls for Mobile */}
            <div className="flex justify-center">
              <div className="inline-flex p-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 gap-1" role="tablist">
                {SCENES.map((s) => {
                  const isSelected = activeScene === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveScene(s.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs font-semibold'
                          : 'text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {s.num}. {s.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Active Scene Card */}
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  Step {currentScene.num}
                </span>
                <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
                  {currentScene.concept}
                </span>
              </div>

              <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                {currentScene.title}
              </h3>

              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                {currentScene.caption}
              </p>

              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {currentScene.body}
              </p>

              <ul className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-300">
                {currentScene.featureBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-neutral-100 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Single Interactive Preview */}
            <ScrollStoryPreview
              activeScene={activeScene}
              tasks={tasks}
              onToggleTask={handleToggleTask}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
