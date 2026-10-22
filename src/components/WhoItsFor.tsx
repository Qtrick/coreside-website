import React from 'react';
import { GraduationCap, Briefcase, Wand2, Compass } from 'lucide-react';
import { Reveal } from '@/components/site/Reveal';

export const WhoItsFor: React.FC = () => {
  const audiences = [
    {
      icon: GraduationCap,
      title: 'Students',
      description:
        'Build custom semester calendars, flashcard revision drills, and subject trackers that match your course syllabi and exam deadlines.',
    },
    {
      icon: Briefcase,
      title: 'Independent workers',
      description:
        'Create lightweight project checklists, milestone logs, and focused personal utilities without juggling bloated multi-user enterprise tools.',
    },
    {
      icon: Wand2,
      title: 'Creative minds',
      description:
        'Sketch small interactive interfaces, personal trackers, and structured logs for your hobbies and curiosity without needing to write code.',
    },
    {
      icon: Compass,
      title: 'Anyone seeking software that fits',
      description:
        'Whenever an existing off-the-shelf app feels too rigid or overly complicated, describe what you actually need and let Coreside shape it.',
    },
  ];

  return (
    <section className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-850 bg-neutral-50/50 dark:bg-neutral-950/50">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Intended Audience
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Built for people who want software on their own terms.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            From focused semester study routines to personal tracking and creative utilities.
          </p>
        </Reveal>

        {/* 4 Cards Grid with staggered entrance and subtle card hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {audiences.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={idx} delay={idx * 0.06} className="h-full">
                <div className="h-full p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xs hover:shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 hover:-translate-y-1 transition-all duration-200 space-y-3.5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
