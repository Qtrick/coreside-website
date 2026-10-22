import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { ScrollStoryPreview, type StoryTask } from './ScrollStoryPreview';
import { Check, ArrowDown } from 'lucide-react';

const INITIAL_STORY_TASKS: StoryTask[] = [
  { id: 't-1', title: 'Molecular Genetics: Lab Synthesis', subject: 'Biology', completed: true, priority: 'Medium' },
  { id: 't-2', title: 'Calculus: Differential Equations Set 3', subject: 'Math', completed: false, priority: 'High' },
  { id: 't-3', title: 'Implement Binary Search Tree in Rust', subject: 'CS 101', completed: false, priority: 'High' },
  { id: 't-4', title: 'European Treaty Historical Analysis', subject: 'History', completed: false, priority: 'Normal' },
];

interface SceneData {
  id: 1 | 2 | 3 | 4;
  num: string;
  concept: string;
  title: string;
  caption: string;
  body: string;
  featureBullets: string[];
}

const SCENES: SceneData[] = [
  {
    id: 1,
    num: '01',
    concept: 'Start with a conversation.',
    title: 'Describe it.',
    caption: 'Tell Coreside what you need, in your own words.',
    body: 'Describe a study planner, habit tracker, or project utility in ordinary language. You don\'t need to write code, configure database schemas, or adapt to a rigid template.',
    featureBullets: [
      'Plain-language conversational prompt',
      'No template locks or manual schema configuration',
      'Instant intent analysis inside your desktop shell',
    ],
  },
  {
    id: 2,
    num: '02',
    concept: 'An app, not just another answer.',
    title: 'Watch it take shape.',
    caption: 'Coreside turns the request into an interactive app inside your workspace.',
    body: 'Rather than outputting disposable text that disappears into scroll history, Coreside produces a structured change proposal. Review the proposed app, approve it with one click, and see it render from declarative components.',
    featureBullets: [
      'Structured change proposal before anything applies',
      'Validated declarative component tree',
      'Isolated local SQLite persistence on your computer',
    ],
  },
  {
    id: 3,
    num: '03',
    concept: 'Keep changing it.',
    title: 'Make it yours.',
    caption: 'Ask for priorities and a progress summary. Your existing tasks stay.',
    body: 'When your needs change, you don\'t restart from an empty slate. Ask for follow-up additions in chat. Coreside modifies the app architecture while preserving every record and task value you entered.',
    featureBullets: [
      'Zero data loss during progressive app evolution',
      'Add priority tags, filters, and progress bars smoothly',
      'Clear visibility of newly slotted capabilities',
    ],
  },
  {
    id: 4,
    num: '04',
    concept: 'It becomes part of your workspace.',
    title: 'Keep using it.',
    caption: 'Come back, check off a task, and build on what you already made.',
    body: 'Your created app lives directly beside your ongoing conversations and projects. Check off tasks, track daily streaks, and let your personal software grow alongside you.',
    featureBullets: [
      'Always accessible in your personal apps sidebar',
      'Interactive controls respond immediately',
      'Predictable desktop routines running while Coreside is open',
    ],
  },
];

export const ScrollStory: React.FC = () => {
  const [activeScene, setActiveScene] = useState<1 | 2 | 3 | 4>(1);
  const [tasks, setTasks] = useState<StoryTask[]>(INITIAL_STORY_TASKS);
  const shouldReduceMotion = useReducedMotion();

  // Scene section references for IntersectionObserver
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleSelectScene = (sceneId: 1 | 2 | 3 | 4) => {
    setActiveScene(sceneId);
    const targetEl = sceneRefs.current[sceneId - 1];
    if (targetEl && typeof targetEl.scrollIntoView === 'function') {
      targetEl.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'center' });
    }
  };

  // Set up scroll-driven scene observer on desktop
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sceneRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveScene((index + 1) as 1 | 2 | 3 | 4);
            }
          });
        },
        {
          root: null,
          rootMargin: '-30% 0px -30% 0px', // Center-band trigger
          threshold: 0.1,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <section id="product" className="py-20 md:py-32 border-t border-neutral-200 dark:border-neutral-850 scroll-mt-16 relative">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 text-neutral-800 dark:text-neutral-200 text-xs font-mono uppercase tracking-wider">
            <span>Product Walkthrough</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Watch personal software take shape.
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            Scroll to see how Coreside translates a conversation into an interactive, evolving app inside your workspace.
          </p>

          {/* Quick Scene Selector Buttons for Touch & Keyboard */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {SCENES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSelectScene(s.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeScene === s.id
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                    : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                }`}
              >
                {s.num}. {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Sticky 2-Column Story Grid (Responsive: Stacks on mobile) */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Narrative Column (approx 42% on desktop) */}
          <div className="lg:col-span-5 space-y-24 md:space-y-40 py-8 lg:py-16">
            {SCENES.map((scene, index) => {
              const isActive = activeScene === scene.id;

              return (
                <div
                  key={scene.id}
                  ref={(el) => {
                    sceneRefs.current[index] = el;
                  }}
                  className={`transition-opacity duration-300 space-y-5 scroll-mt-36 ${
                    isActive ? 'opacity-100' : 'opacity-40 hover:opacity-75'
                  }`}
                >
                  {/* Scene Number and Concept Eyebrow */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100 px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                      Step {scene.num}
                    </span>
                    <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      {scene.concept}
                    </span>
                  </div>

                  {/* Scene Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
                    {scene.title}
                  </h3>

                  {/* Scene Caption */}
                  <p className="text-base sm:text-lg font-medium text-neutral-800 dark:text-neutral-200 leading-snug">
                    {scene.caption}
                  </p>

                  {/* Explanatory Body Copy */}
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {scene.body}
                  </p>

                  {/* Feature Bullets */}
                  <ul className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300">
                    {scene.featureBullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-neutral-100 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Mobile-only Preview Panel shown directly beneath the scene on small screens */}
                  <div className="block lg:hidden pt-4">
                    <ScrollStoryPreview
                      activeScene={scene.id}
                      tasks={tasks}
                      onToggleTask={handleToggleTask}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Sticky Column (approx 58% on desktop, hidden on small screens because mobile renders inline) */}
          <div className="hidden lg:block lg:col-span-7 sticky top-24 pt-4 pb-12 self-start">
            <ScrollStoryPreview
              activeScene={activeScene}
              tasks={tasks}
              onToggleTask={handleToggleTask}
            />

            {/* Scroll hint helper under preview */}
            <div className="mt-3 flex items-center justify-between text-xs text-neutral-400 font-mono px-2">
              <span className="flex items-center gap-1.5">
                <ArrowDown className="w-3 h-3 animate-bounce" />
                Scroll to progress through scenes
              </span>
              <span>Step {activeScene} of 4</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
