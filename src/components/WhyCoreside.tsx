import React from 'react';
import { MessageSquareDashed, Database } from 'lucide-react';
import { Reveal } from '@/components/site/Reveal';

export const WhyCoreside: React.FC = () => {
  return (
    <section className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-850 bg-neutral-50/50 dark:bg-neutral-950/50 transition-colors">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Why Coreside
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Most software asks you to adapt. What if your apps adapted to you?
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            Predefined apps rarely match how you actually think. Chat answers are often temporary. Coreside gives your ideas a permanent, evolving home.
          </p>
        </Reveal>

        {/* 2-Column Comparison Architecture with tactile hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: The standard friction */}
          <Reveal delay={0.1} className="h-full">
            <div className="h-full p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xs hover:shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 space-y-5">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400">
                <MessageSquareDashed className="w-5 h-5" />
              </div>

              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Disposable answers and rigid tools
              </h3>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Standard chatbots answer questions, but the output vanishes the moment you close the tab. Standard productivity software gives you complex dashboards that demand you change your workflow to fit their rules.
              </p>

              <ul className="space-y-2.5 text-xs text-neutral-500 dark:text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  Temporary chat threads that don't persist as software
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  Inflexible templates you cannot easily modify without code
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  Constant copy-pasting between disparate browser tabs
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Card 2: The Coreside solution */}
          <Reveal delay={0.2} className="h-full">
            <div className="h-full p-8 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200 space-y-5 relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>

              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Persistent apps built right in your space
              </h3>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Coreside turns your conversational requests into structured, interactive applications. They live alongside your chats, store your data locally, and continue to change whenever you ask for updates.
              </p>

              <ul className="space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white" />
                  Interactive apps rendered from declarative, verified components
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white" />
                  Local storage preserving your records across updates
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white" />
                  Transparent change proposals so you always see what changes
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
