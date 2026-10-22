import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import type { WaitlistResponse } from '@/types';

interface WaitlistFormProps {
  source?: string;
  className?: string;
  idPrefix?: string;
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({
  source = 'website',
  className = '',
  idPrefix = 'hero',
}) => {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'already_joined' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const inputId = `${idPrefix}-email-input`;
  const errorId = `${idPrefix}-error-msg`;
  const successId = `${idPrefix}-success-msg`;

  const validateEmail = (val: string): boolean => {
    const trimmed = val.trim();
    if (trimmed.length < 5 || trimmed.length > 255) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(trimmed);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: cleanEmail,
          source,
          company_website: honeypot, // Honeypot field
        }),
      });

      const data: WaitlistResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request. Please try again.');
      }

      if (data.alreadyRegistered) {
        setStatus('already_joined');
        setConfirmationMessage(data.message || "You're already on the waitlist! We'll keep you updated.");
      } else {
        setStatus('success');
        setConfirmationMessage(data.message || "You're on the list. We'll be in touch as early access opens.");
        setEmail('');
      }
    } catch (err: unknown) {
      setStatus('error');
      const msg = err instanceof Error ? err.message : 'Unable to connect to waitlist service. Please try again.';
      setErrorMessage(msg);
    }
  };

  if (status === 'success' || status === 'already_joined') {
    return (
      <div
        role="status"
        aria-live="polite"
        id={successId}
        className={`flex items-start gap-3 p-4 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/60 backdrop-blur-sm ${className}`}
      >
        <CheckCircle2 className="w-5 h-5 text-neutral-900 dark:text-neutral-100 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {confirmationMessage}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            No spam. We'll only reach out when early access invites or major updates are ready.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`w-full max-w-md ${className}`}>
      {/* Honeypot field for bot mitigation - hidden from real visitors */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor={`${idPrefix}-hp`}>Leave this empty</label>
        <input
          id={`${idPrefix}-hp`}
          type="text"
          name="company_website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <label htmlFor={inputId} className="sr-only">
            Email address
          </label>
          <input
            id={inputId}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') {
                setStatus('idle');
                setErrorMessage('');
              }
            }}
            placeholder="Enter your email"
            autoComplete="email"
            autoCapitalize="none"
            inputMode="email"
            aria-invalid={status === 'error'}
            aria-describedby={status === 'error' ? errorId : undefined}
            disabled={status === 'submitting'}
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-sm focus:outline-none focus:border-neutral-500 dark:focus:border-neutral-400 transition-colors shadow-sm disabled:opacity-60"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 transition-all shrink-0 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Joining...</span>
            </>
          ) : (
            <>
              <span>Join the waitlist</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {status === 'error' && (
        <div
          id={errorId}
          role="alert"
          aria-live="polite"
          className="mt-2.5 flex items-center gap-2 text-xs font-medium text-neutral-900 dark:text-neutral-200"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </form>
  );
};
