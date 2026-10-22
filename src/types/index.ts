export type ThemePreference = 'system' | 'light' | 'dark';

export interface WaitlistFormData {
  email: string;
  source?: string;
  company_website?: string; // Honeypot field
}

export interface WaitlistResponse {
  success?: boolean;
  message?: string;
  alreadyRegistered?: boolean;
  error?: string;
}

export type ExampleAppId = 'planner' | 'habits' | 'checklist';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
