import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

const TestComponent: React.FC = () => {
  const { themePreference, resolvedTheme, setThemePreference, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="pref">{themePreference}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setThemePreference('dark')}>Set Dark</button>
      <button onClick={() => setThemePreference('light')}>Set Light</button>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

describe('Theme System', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('initializes with light preference by default on first visit and syncs HTML class', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('pref').textContent).toBe('light');
    expect(screen.getByTestId('resolved').textContent).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('allows manual light override and updates HTML class and localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Set Light'));

    expect(screen.getByTestId('pref').textContent).toBe('light');
    expect(screen.getByTestId('resolved').textContent).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('coreside-theme')).toBe('light');
  });

  it('toggles theme seamlessly', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Initial is light -> toggle to dark
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('resolved').textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Toggle back to light
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('resolved').textContent).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
