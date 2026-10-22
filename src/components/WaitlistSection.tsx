import React from 'react';
import { WaitlistForm } from './WaitlistForm';

export const WaitlistSection: React.FC = () => {
  return (
    <section id="waitlist" className="py-24 md:py-32 border-t border-neutral-200 dark:border-neutral-850 scroll-mt-16 relative overflow-hidden">
      {/* Background soft glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[600px] h-[300px] bg-neutral-200/50 dark:bg-neutral-800/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-site mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Early Access
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Build a workspace that fits.
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-xl mx-auto">
            Get early access to Coreside as we expand our preview cohorts. We'll send thoughtful updates and invitation keys when spots open.
          </p>

          <div className="pt-4 flex flex-col items-center">
            <WaitlistForm source="footer" idPrefix="bottom" className="mx-auto" />
            <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-500">
              Zero spam. Your email will be stored safely and used only for Coreside access updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
