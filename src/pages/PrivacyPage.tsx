import React from 'react';
import { ArrowLeft, Shield, Mail, Lock, Database } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const PrivacyPage: React.FC = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col justify-between transition-colors">
      {/* Top Bar */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-site mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Coreside</span>
          </a>

          <div className="flex items-center gap-2">
            <img
              src={
                resolvedTheme === 'dark'
                  ? '/branding/coreside-mark-white-transparent.png'
                  : '/branding/coreside-mark-black-transparent.png'
              }
              alt="Coreside Mark"
              className="w-5 h-5 object-contain"
              width={20}
              height={20}
            />
            <span className="font-semibold text-sm">Coreside</span>
          </div>
        </div>
      </header>

      {/* Main Privacy Document Content */}
      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24 space-y-12">
        <div className="space-y-4">
          <p className="text-xs font-mono uppercase tracking-wider text-neutral-500">
            Legal & Privacy Notice
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Coreside Waitlist Privacy Policy
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">
            Last updated: October 2026
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-8 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-950 dark:text-neutral-100 flex items-center gap-2">
              <Mail className="w-5 h-5 text-neutral-500" />
              1. Information We Collect
            </h2>
            <p>
              When you submit your email on this launch website, we collect only the information you explicitly provide:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400">
              <li>
                <strong>Email address:</strong> Used exclusively to notify you of early-access invitations, product releases, and major engineering progress.
              </li>
              <li>
                <strong>Timestamp and referral source:</strong> A recorded UTC date and page section identifier to understand where waitlist requests originated.
              </li>
            </ul>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              We do not ask for or collect passwords, billing information, home addresses, phone numbers, or intrusive personal surveys.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-950 dark:text-neutral-100 flex items-center gap-2">
              <Database className="w-5 h-5 text-neutral-500" />
              2. How Your Information is Stored
            </h2>
            <p>
              Your waitlist record is stored in a secure cloud database managed by Supabase (PostgreSQL) with Row Level Security (RLS) enabled. Public visitors cannot query, read, or export the waitlist. Only the authenticated website owner using secure server-side credentials has administrative access to inspect entries.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-950 dark:text-neutral-100 flex items-center gap-2">
              <Lock className="w-5 h-5 text-neutral-500" />
              3. Third-Party Tracking & Cookies
            </h2>
            <p>
              This website does not load behavioral tracking pixels, third-party advertising cookies, or cross-site fingerprinting scripts. We store only your theme preference (light, dark, or system) locally in your browser's <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-xs">localStorage</code> to prevent screen flickering on subsequent visits.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-950 dark:text-neutral-100 flex items-center gap-2">
              <Shield className="w-5 h-5 text-neutral-500" />
              4. Data Retention & Your Rights
            </h2>
            <p>
              You may request that your email be permanently deleted from the early-access waitlist at any time. Simply reply to any update email you receive from Coreside, or contact the website operator at the designated project contact address. Upon verification, your entry will be removed from the database within 30 days.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xl font-bold text-neutral-950 dark:text-neutral-100">
              5. Contacting Us
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              For any questions regarding this privacy policy or your waitlist data, please reach out through the project's official repository or deployment contact channel.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8 bg-neutral-50 dark:bg-neutral-950 text-center text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} Coreside. Clear and honest data practices.</p>
      </footer>
    </div>
  );
};
