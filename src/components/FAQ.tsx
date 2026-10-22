import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Reveal } from '@/components/site/Reveal';
import type { FAQItem } from '@/types';
import { motionTokens } from '@/lib/motion-tokens';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const shouldReduceMotion = useReducedMotion();

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'What is Coreside?',
      answer:
        'Coreside is a personal software environment for your desktop. Rather than giving you disposable text responses, it turns conversational requests into interactive personal applications that live right inside your workspace.',
    },
    {
      id: 'faq-2',
      question: 'How is it different from an AI chatbot?',
      answer:
        'Standard chatbots produce transient conversations that disappear into scroll history. Coreside creates persistent, structured software surfaces (like study planners, habit boards, and project utilities) that store your data locally and continue to evolve through follow-up conversations.',
    },
    {
      id: 'faq-3',
      question: 'Does it build standalone websites or mobile apps?',
      answer:
        'No. Coreside is not an external website builder or general SaaS exporter. All created applications live and run directly within your personal Coreside desktop workspace.',
    },
    {
      id: 'faq-4',
      question: 'Do I need to know how to code?',
      answer:
        'No. You describe what you need in plain everyday language. Coreside translates your request into safe declarative components and presents an approval card before applying any changes.',
    },
    {
      id: 'faq-5',
      question: 'Is Coreside available for download today?',
      answer:
        'Not as a general public release. Coreside is currently in active pre-launch development. Joining the waitlist ensures you receive access invitations and major engineering progress updates.',
    },
    {
      id: 'faq-6',
      question: 'What devices and operating systems does it support?',
      answer:
        'Coreside is designed desktop-first. Verified supported desktop release platforms will be announced as early-access enrollment begins.',
    },
    {
      id: 'faq-7',
      question: 'Will my created apps and records be saved?',
      answer:
        'Yes. Coreside utilizes local SQLite database persistence on your computer. When you request updates to an existing app, the system is designed to apply structural improvements while keeping your existing rows, notes, and task states preserved.',
    },
    {
      id: 'faq-8',
      question: 'Can it run automations while closed?',
      answer:
        'No. Local recurring routines and reminders execute only while Coreside is open on your desktop. Overdue tasks catch up at most once on reopen without overwhelming your system.',
    },
    {
      id: 'faq-9',
      question: 'How much will Coreside cost?',
      answer:
        'Pricing and tier structures have not yet been finalized. We will share clear, transparent pricing details directly with waitlist members prior to general availability.',
    },
    {
      id: 'faq-10',
      question: 'What happens after I join the waitlist?',
      answer:
        'You will receive an email confirmation and periodic announcements as early-access cohorts open. We do not spam or share your contact information with third-party advertisers.',
    },
  ];

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-850 scroll-mt-16">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        {/* Asymmetric Editorial Grid: Left Sticky Column + Right Spacious Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Editorial Summary */}
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Questions & Answers
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
              Clear, honest answers.
            </h2>
            <p className="text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-md">
              Everything you need to know about the product, local persistence, safety boundaries, and early-access rollout.
            </p>

            <div className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80 text-xs text-neutral-500 space-y-2">
              <p>Have an unlisted question? Reach our team directly during early access enrollment.</p>
            </div>
          </Reveal>

          {/* Right Column: Clean Divided Accordion (No Heavy Repeating Pill Borders) */}
          <div className="lg:col-span-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 divide-y divide-neutral-200/70 dark:divide-neutral-800/70 shadow-2xs overflow-hidden">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              const contentId = `${faq.id}-content`;
              const headerId = `${faq.id}-header`;

              return (
                <div key={faq.id} className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-850/20">
                  <button
                    type="button"
                    id={headerId}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleItem(faq.id)}
                    className="w-full py-5 px-6 sm:px-7 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 cursor-pointer min-h-[64px]"
                  >
                    <span className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 pr-6 leading-snug">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth }}
                      className="shrink-0 w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 transition-colors"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={contentId}
                        role="region"
                        aria-labelledby={headerId}
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth }}
                        className="overflow-hidden bg-neutral-50/30 dark:bg-neutral-950/20"
                      >
                        <div className="px-6 sm:px-7 pb-6 pt-1 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-prose">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
