import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const Footer: React.FC = () => {
  const { resolvedTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-850 bg-white dark:bg-neutral-950 py-12 transition-colors">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Mark & Description */}
          <div className="flex items-center gap-3">
            <img
              src={
                resolvedTheme === 'dark'
                  ? '/branding/coreside-mark-white-transparent.png'
                  : '/branding/coreside-mark-black-transparent.png'
              }
              alt="Coreside Mark"
              className="w-6 h-6 object-contain"
              width={24}
              height={24}
            />
            <span className="font-semibold text-sm tracking-tight text-neutral-900 dark:text-neutral-100">
              Coreside
            </span>
            <span className="text-xs text-neutral-400 dark:text-neutral-500">
              • Personal software environment
            </span>
          </div>

          {/* Navigation & Legal Links */}
          <div className="flex items-center gap-6 text-xs text-neutral-500 dark:text-neutral-400">
            <a
              href="/privacy"
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Privacy Policy
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 dark:text-neutral-500">
          <p>© {new Date().getFullYear()} Coreside. All rights reserved.</p>
          <p className="text-[11px]">
            Designed with thoughtful minimalism. Early-access waitlist.
          </p>
        </div>
      </div>
    </footer>
  );
};
