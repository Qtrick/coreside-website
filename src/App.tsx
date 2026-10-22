import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { WhyCoreside } from '@/components/WhyCoreside';
import { HowItWorks } from '@/components/HowItWorks';
import { ExampleApps } from '@/components/ExampleApps';
import { PersistenceStory } from '@/components/PersistenceStory';
import { Personalization } from '@/components/Personalization';
import { TrustAndControl } from '@/components/TrustAndControl';
import { WhoItsFor } from '@/components/WhoItsFor';
import { FAQ } from '@/components/FAQ';
import { WaitlistSection } from '@/components/WaitlistSection';
import { Footer } from '@/components/Footer';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    return window.location.pathname;
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Intercept local anchor clicks for /privacy or home
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && (href === '/privacy' || href === '/')) {
        e.preventDefault();
        window.history.pushState({}, '', href);
        setCurrentPath(href);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  return (
    <ThemeProvider>
      {currentPath === '/privacy' ? (
        <PrivacyPage />
      ) : currentPath === '/' ? (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main id="main-content" className="flex-1">
            <Hero />
            <WhyCoreside />
            <HowItWorks />
            <ExampleApps />
            <PersistenceStory />
            <Personalization />
            <TrustAndControl />
            <WhoItsFor />
            <FAQ />
            <WaitlistSection />
          </main>
          <Footer />
        </div>
      ) : (
        <NotFoundPage />
      )}
    </ThemeProvider>
  );
};

export default App;
