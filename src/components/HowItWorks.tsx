import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Describe it.',
      tagline: 'Tell Coreside what you need in your own words.',
      description:
        'Start with a simple conversation. Whether you need a course organizer, a daily habit log, or a niche checklist, describe what you want without writing a single line of code.',
      uiEvidence: (
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 font-mono text-xs space-y-2">
          <div className="text-[10px] text-neutral-400">Prompt</div>
          <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200">
            "Build me a daily habit tracker with streaks."
          </div>
        </div>
      ),
    },
    {
      number: '02',
      title: 'Make it.',
      tagline: 'Turn the request into an app inside your workspace.',
      description:
        'Coreside compiles your request into declarative, validated components. You receive a structured change proposal showing exactly what will be created, with a clear one-click approval.',
      uiEvidence: (
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
              Proposal Ready
            </span>
            <span className="text-[10px] font-mono text-neutral-400">Risk: Low</span>
          </div>
          <div className="text-neutral-800 dark:text-neutral-200 font-medium">
            Habit Tracker Surface (3 counters, 1 streak ledger)
          </div>
          <div className="pt-1 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-medium text-[11px]">
              Apply proposal
            </span>
          </div>
        </div>
      ),
    },
    {
      number: '03',
      title: 'Use it.',
      tagline: 'Keep it alongside your conversations and projects.',
      description:
        'Your new app lives directly in your workspace. Use it alongside your chats, update your tasks, and rely on local database storage to keep your state safe.',
      uiEvidence: (
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-xs space-y-2">
          <div className="flex items-center justify-between text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
            <span>Daily Habits</span>
            <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">5-day streak</span>
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-neutral-800 dark:text-neutral-200">Morning reading</span>
            <span className="w-3.5 h-3.5 rounded border border-neutral-400 flex items-center justify-center text-[10px] font-bold">✓</span>
          </div>
        </div>
      ),
    },
    {
      number: '04',
      title: 'Change it.',
      tagline: 'Ask for edits as your needs evolve.',
      description:
        'When your routine shifts, you don\'t abandon the app or start over. Ask for modifications in chat. Coreside updates the interface while carefully preserving your existing records.',
      uiEvidence: (
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-xs space-y-2">
          <div className="text-[10px] font-mono text-neutral-400">Evolution Prompt</div>
          <div className="p-2 rounded bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200">
            "Add weekend reminders and weekly completion charts."
          </div>
          <div className="text-[10px] text-neutral-500 flex items-center gap-1 font-mono">
            <CheckCircle2 className="w-3 h-3 text-neutral-500" />
            Existing habit records preserved
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-850 scroll-mt-16">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Workflow
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            How Coreside works
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            From an initial conversational prompt to a persistent personal tool that evolves over time.
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-2xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-neutral-400 dark:text-neutral-500 px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
                    Step {step.number}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {step.title}
                  </h3>
                  <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                    {step.tagline}
                  </p>
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Concrete UI Evidence Card */}
              <div className="pt-2">
                {step.uiEvidence}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
