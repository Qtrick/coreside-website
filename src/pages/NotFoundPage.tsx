import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const NotFoundPage: React.FC = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col justify-between transition-colors">
      <header className="border-b border-neutral-200 dark:border-neutral-800 p-4">
        <div className="max-w-site mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
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
            <span className="font-semibold text-sm">Coreside</span>
          </a>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 text-center space-y-6 py-20">
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
          404 Error
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Page not found
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          The page you are looking for does not exist or has moved.
        </p>
        <div>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Coreside</span>
          </a>
        </div>
      </main>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 text-center text-xs text-neutral-400">
        <p>© {new Date().getFullYear()} Coreside.</p>
      </footer>
    </div>
  );
};
