import React from 'react';
import { Shield, CheckSquare, HardDrive, Sliders } from 'lucide-react';
import { Reveal } from '@/components/site/Reveal';

export const TrustAndControl: React.FC = () => {
  const principles = [
    {
      icon: CheckSquare,
      title: 'See what changes before you apply them',
      description:
        'Coreside presents structured change proposals that outline what will be added and what existing data will be preserved, giving you complete approval control.',
    },
    {
      icon: Shield,
      title: 'Declarative component safety',
      description:
        'Personal apps are assembled from a strict registry of declarative components. The system avoids executing arbitrary, unverified code inside your trusted shell.',
    },
    {
      icon: HardDrive,
      title: 'Local persistence on your computer',
      description:
        'Your conversations, customized apps, and task records are saved locally in SQLite on your desktop, keeping your day-to-day workspace under your own control.',
    },
    {
      icon: Sliders,
      title: 'Routines with clear boundaries',
      description:
        'Automated reminders and habit checks run only while Coreside is open on your device, with visible execution limits and clear error handling.',
    },
  ];

  return (
    <section className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-850">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Security & Philosophy
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Built for useful software, with boundaries.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            Thoughtful AI tools should be transparent and predictable. Coreside combines rapid personal creation with careful engineering limits.
          </p>
        </Reveal>

        {/* 4 Pillars Grid with staggered reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <Reveal key={idx} delay={idx * 0.08} className="h-full">
                <div className="h-full p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xs hover:shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {p.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {p.description}
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
