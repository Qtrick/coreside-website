import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import type { ThemePreference } from '@/types';

export type ThemeOrigin =
  | React.MouseEvent
  | MouseEvent
  | { x: number; y: number }
  | HTMLElement
  | null;

interface ThemeContextType {
  themePreference: ThemePreference;
  resolvedTheme: 'light' | 'dark';
  setThemePreference: (pref: ThemePreference) => void;
  toggleTheme: (origin?: ThemeOrigin) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'coreside-theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
    // Deliberate brand choice: default to light mode for first-time visitors
    return 'light';
  });

  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const isTransitioningRef = useRef<boolean>(false);

  // Listen to OS system color-scheme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const resolvedTheme: 'light' | 'dark' =
    themePreference === 'system'
      ? systemIsDark
        ? 'dark'
        : 'light'
      : themePreference;

  // Sync class on <html> element
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedTheme]);

  const applyThemeDirectly = (pref: ThemePreference) => {
    setThemePreferenceState(pref);
    try {
      localStorage.setItem(STORAGE_KEY, pref);
    } catch {
      // localStorage may fail in privacy sandbox
    }
    if (typeof document !== 'undefined') {
      const nextResolved =
        pref === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : pref;
      if (nextResolved === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const setThemePreference = (pref: ThemePreference) => {
    applyThemeDirectly(pref);
  };

  /**
   * Unified circular AOE theme wipe originating from the toggle button
   * using the native document.startViewTransition API with graceful fallback.
   */
  const toggleTheme = (origin?: ThemeOrigin) => {
    const next: ThemePreference = resolvedTheme === 'dark' ? 'light' : 'dark';

    // Prevent rapid repeated toggle stacking
    if (isTransitioningRef.current) return;

    if (typeof window === 'undefined' || typeof document === 'undefined') {
      applyThemeDirectly(next);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasViewTransition =
      typeof (document as any).startViewTransition === 'function' && !prefersReducedMotion;

    if (!hasViewTransition) {
      applyThemeDirectly(next);
      return;
    }

    // Determine the exact origin coordinates (x, y)
    let x = window.innerWidth - 64;
    let y = 32;

    if (origin) {
      if ('clientX' in origin && typeof origin.clientX === 'number' && (origin.clientX > 0 || origin.clientY > 0)) {
        x = origin.clientX;
        y = origin.clientY;
      } else if (origin instanceof HTMLElement) {
        const rect = origin.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      } else if ('currentTarget' in origin && (origin as any).currentTarget instanceof HTMLElement) {
        const rect = ((origin as any).currentTarget as HTMLElement).getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      } else if ('target' in origin && (origin as any).target instanceof HTMLElement) {
        const rect = ((origin as any).target as HTMLElement).getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      } else if ('x' in origin && typeof origin.x === 'number') {
        x = origin.x;
        y = origin.y;
      }
    } else {
      // Fallback: look for the active theme button element
      const btn = document.querySelector('button[aria-label*="mode"]') as HTMLElement | null;
      if (btn) {
        const rect = btn.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }
    }

    // Maximum distance to the furthest viewport corner
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    isTransitioningRef.current = true;
    setIsTransitioning(true);

    try {
      const transition = (document as any).startViewTransition(() => {
        flushSync(() => {
          applyThemeDirectly(next);
        });
      });

      transition.ready
        .then(() => {
          const animation = document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 540,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              pseudoElement: '::view-transition-new(root)',
            }
          );
          return animation.finished;
        })
        .catch(() => {})
        .finally(() => {
          isTransitioningRef.current = false;
          setIsTransitioning(false);
        });
    } catch {
      applyThemeDirectly(next);
      isTransitioningRef.current = false;
      setIsTransitioning(false);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        themePreference,
        resolvedTheme,
        setThemePreference,
        toggleTheme,
        isTransitioning,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
    return {
      themePreference: isDark ? 'dark' : 'light',
      resolvedTheme: isDark ? 'dark' : 'light',
      setThemePreference: () => {},
      toggleTheme: () => {},
      isTransitioning: false,
    };
  }
  return context;
};
