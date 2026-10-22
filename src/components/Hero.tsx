import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Check, Sparkles, ChevronRight } from 'lucide-react';
import { WaitlistForm } from './WaitlistForm';

interface TaskItem {
  id: string;
  title: string;
  subject: string;
  completed: boolean;
  priority?: 'High' | 'Medium' | 'Normal';
}

const INITIAL_TASKS: TaskItem[] = [
  { id: '1', title: 'Read Molecular Genetics Chapter 4', subject: 'Biology', completed: true, priority: 'Medium' },
  { id: '2', title: 'Complete Differential Equations Set 3', subject: 'Calculus', completed: false, priority: 'High' },
  { id: '3', title: 'Implement Binary Search Tree in Rust', subject: 'CS 101', completed: false, priority: 'High' },
];

export const Hero: React.FC = () => {
  // Step 1: Initial conversation request
  // Step 2: Change proposal generated
  // Step 3: First app applied and running
  // Step 4: Follow-up prompt and evolved app with preserved tasks
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance demo when playing
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setStep((prev) => (prev < 4 ? ((prev + 1) as 1 | 2 | 3 | 4) : 1));
    }, 4200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background radial gradient spotlight */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-neutral-200/40 dark:bg-neutral-800/15 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-site mx-auto px-4 sm:px-6">
        {/* Hero Copy & Value Proposition */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-12 md:mb-16">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 text-neutral-800 dark:text-neutral-200 text-xs font-medium tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
            <span>Personal software, reimagined</span>
          </div>

          {/* Headline H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.08]">
            Software that takes shape around you.
          </h1>

          {/* Subhead */}
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Tell Coreside what you need. Build personal apps right inside your workspace, then keep changing them as your needs change.
          </p>

          {/* Waitlist Form Component */}
          <div className="pt-2 flex flex-col items-center">
            <WaitlistForm source="hero" idPrefix="hero" className="mx-auto" />
            <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-500">
              Early access is coming. Join the waitlist for updates.
            </p>
          </div>
        </div>

        {/* Hero Product Narrative: Desktop Window Simulation */}
        <div id="hero-demo" className="scroll-mt-24 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden transition-all">
            {/* Window Title Bar */}
            <div className="h-11 px-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-950/60 flex items-center justify-between">
              {/* Traffic Lights */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span className="ml-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 hidden sm:inline">
                  Coreside: Personal Workspace
                </span>
              </div>

              {/* Step indicator and playback controls */}
              <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                <span className="font-mono text-[11px] hidden md:inline">
                  {step === 1 && '1. Describing need'}
                  {step === 2 && '2. Reviewing proposal'}
                  {step === 3 && '3. App created'}
                  {step === 4 && '4. Evolved with data kept'}
                </span>

                <div className="flex items-center gap-1 pl-2 border-l border-neutral-200 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? 'Pause demonstration' : 'Play demonstration'}
                    className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setIsPlaying(true);
                    }}
                    aria-label="Replay demonstration from start"
                    className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Split Window Workspace: Chat Stream on Left, Live App Canvas on Right */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
              {/* Left Column: Conversational AI & Change Proposals */}
              <div className="md:col-span-5 p-5 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  {/* Chat Message 1 */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                      <span>You</span>
                      <span>Just now</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 shadow-2xs">
                      Make me a study planner for this semester.
                    </div>
                  </div>

                  {/* Coreside Change Proposal Card (matches Coreside ChangeProposalCard.tsx) */}
                  <div className="p-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/90 space-y-2.5 text-xs shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                        {step === 1 ? 'Generating plan...' : 'Proposal Ready'}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">Risk: Low</span>
                    </div>

                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                        Create Study Planner App
                      </p>
                      <div className="mt-1.5 space-y-1 text-[11px] text-neutral-600 dark:text-neutral-400">
                        <p>
                          <span className="font-medium text-neutral-700 dark:text-neutral-300">Changes:</span> Interactive task checklist with subjects.
                        </p>
                        <p>
                          <span className="font-medium text-neutral-700 dark:text-neutral-300">Preserved:</span> Workspace data isolated locally.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          step >= 3
                            ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500 cursor-default'
                            : 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:opacity-90'
                        }`}
                      >
                        {step >= 3 ? 'Applied' : 'Apply changes'}
                      </button>
                    </div>
                  </div>

                  {/* Follow-up turn: evolution prompt in step 4 */}
                  {step === 4 && (
                    <div className="space-y-3 pt-2 border-t border-neutral-200 dark:border-neutral-800 animate-fadeIn">
                      <div className="space-y-1">
                        <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">You</div>
                        <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100">
                          Add priorities and a progress summary.
                        </div>
                      </div>

                      <div className="p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/90 text-xs space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-medium text-neutral-500">
                          <span>Evolved: Study Planner</span>
                          <span className="text-neutral-400">0 data lost</span>
                        </div>
                        <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                          Existing course tasks preserved. Added priority tags and completion summary.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Simulated chat composer */}
                <div className="pt-2">
                  <div className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-between text-xs text-neutral-400">
                    <span>Ask Coreside to change or expand...</span>
                    <span className="p-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: In-Workspace Personal App Canvas */}
              <div className="md:col-span-7 p-6 bg-white dark:bg-neutral-900 flex flex-col justify-between">
                <div>
                  {/* App Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-neutral-100 font-semibold text-xs border border-neutral-200 dark:border-neutral-700">
                        SP
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          Study Planner
                        </h3>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                          Semester Sprint 1 • 3 Course Tasks
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                      Personal App
                    </span>
                  </div>

                  {/* Progress Summary: Appears in evolved Step 4 (or always interactive) */}
                  <div className="mt-5 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50 space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      <span>Progress Summary</span>
                      <span className="font-mono text-[11px]">{progressPercent}% complete</span>
                    </div>
                    {/* Contained tasteful color progress bar */}
                    <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      {completedCount} of {tasks.length} study tasks finished
                    </div>
                  </div>

                  {/* Interactive Tasks Checklist */}
                  <div className="mt-5 space-y-2.5">
                    <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 tracking-wider uppercase">
                      Course Tasks
                    </p>

                    <div className="space-y-2">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          onClick={() => toggleTask(task.id)}
                          role="checkbox"
                          aria-checked={task.completed}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                              e.preventDefault();
                              toggleTask(task.id);
                            }
                          }}
                          className={`group flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                            task.completed
                              ? 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/20 text-neutral-400 dark:text-neutral-500'
                              : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs hover:border-neutral-400 dark:hover:border-neutral-600'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                                task.completed
                                  ? 'bg-neutral-900 border-neutral-900 dark:bg-neutral-100 dark:border-neutral-100 text-white dark:text-neutral-950'
                                  : 'border-neutral-400 dark:border-neutral-600 group-hover:border-neutral-600'
                              }`}
                            >
                              {task.completed && <Check className="w-3 h-3 stroke-[2.5]" />}
                            </div>
                            <span className={`text-xs sm:text-sm ${task.completed ? 'line-through' : 'font-medium'}`}>
                              {task.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-neutral-500 px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
                              {task.subject}
                            </span>

                            {/* Contained Priority Badge (in evolved step 4) */}
                            {task.priority && (
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                  task.priority === 'High'
                                    ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                                    : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                                }`}
                              >
                                {task.priority}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer annotation inside demo */}
                <div className="pt-4 mt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Click any item to interact with local app state</span>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                    Illustrative preview
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Step selector pills underneath demo */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 1, label: '1. Request' },
              { id: 2, label: '2. Review Proposal' },
              { id: 3, label: '3. Created App' },
              { id: 4, label: '4. Evolved with Data Kept' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setStep(s.id as 1 | 2 | 3 | 4);
                  setIsPlaying(false);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  step === s.id
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                    : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
