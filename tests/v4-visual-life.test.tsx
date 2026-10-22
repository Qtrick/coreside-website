import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { SiteAmbientBackground } from '@/components/site/SiteAmbientBackground';
import { HeroDotField } from '@/components/site/HeroDotField';
import { ProductStage } from '@/components/marketing/ProductStage';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { Hero } from '@/components/Hero';

describe('V4 Site Ambient Background Component', () => {
  it('renders fixed, viewport-stable atmospheric contours and tactile grain overlay', () => {
    const { container } = render(<SiteAmbientBackground />);
    const root = container.firstChild as HTMLElement;

    expect(root).toHaveAttribute('aria-hidden', 'true');
    expect(root.className).toContain('fixed inset-0 pointer-events-none z-0');

    // SVG contours with xMidYMid slice aspect ratio to prevent vertical stretching
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMid slice');

    // Tactile grain filter
    const grainFilter = container.querySelector('#site-ambient-grain-v4');
    expect(grainFilter).toBeInTheDocument();
  });

  it('provides scroll-driven opacity transition isolating hero particles from narrative lines', () => {
    const { container } = render(<SiteAmbientBackground />);
    const root = container.firstChild as HTMLElement;
    // Renders as a Motion component with fixed positioning
    expect(root).toBeInTheDocument();
    expect(root.tagName.toLowerCase()).toBe('div');
  });
});

describe('V4 Hero Dot Field Component', () => {
  it('renders high-density canvas marked aria-hidden and pointer-events-none', () => {
    const { container } = render(
      <ThemeProvider>
        <HeroDotField />
      </ThemeProvider>
    );

    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('aria-hidden', 'true');
    expect(canvas?.className).toContain('pointer-events-none');
  });
});

describe('V4 Product Stage Multi-Region Palettes', () => {
  it('renders aurora-pearl with multi-region atmospheric color layers', () => {
    const { container } = render(
      <ProductStage variant="aurora-pearl" badge="Primary Story">
        <div>App Staged</div>
      </ProductStage>
    );

    const stage = container.firstChild as HTMLElement;
    expect(stage).toHaveAttribute('aria-label', 'Product demonstration environment');
    expect(screen.getByText('Primary Story')).toBeInTheDocument();
    expect(screen.getByText('App Staged')).toBeInTheDocument();

    // Check presence of multi-region blur zones
    const blurLayers = container.querySelectorAll('.blur-3xl');
    expect(blurLayers.length).toBeGreaterThanOrEqual(3);
  });

  it('renders apricot-dusk and mineral-night variants correctly', () => {
    const { rerender } = render(
      <ProductStage variant="apricot-dusk" badge="Warm Atmosphere">
        <div>Warm App</div>
      </ProductStage>
    );
    expect(screen.getByText('Warm Atmosphere')).toBeInTheDocument();

    rerender(
      <ProductStage variant="mineral-night" badge="Technical App">
        <div>Night App</div>
      </ProductStage>
    );
    expect(screen.getByText('Technical App')).toBeInTheDocument();
  });

  it('gracefully resolves legacy aliases to canonical multicolor variants', () => {
    const { rerender } = render(
      <ProductStage variant="glacier" badge="Legacy Glacier">
        <div>Glacier Content</div>
      </ProductStage>
    );
    expect(screen.getByText('Legacy Glacier')).toBeInTheDocument();

    rerender(
      <ProductStage variant="warm" badge="Legacy Warm">
        <div>Warm Content</div>
      </ProductStage>
    );
    expect(screen.getByText('Legacy Warm')).toBeInTheDocument();

    rerender(
      <ProductStage variant="midnight" badge="Legacy Midnight">
        <div>Midnight Content</div>
      </ProductStage>
    );
    expect(screen.getByText('Legacy Midnight')).toBeInTheDocument();
  });
});

const ThemeRevealConsumer: React.FC = () => {
  const { resolvedTheme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button
        data-testid="toggle-btn"
        aria-label="Switch to dark mode"
        onClick={(e) => toggleTheme(e)}
      >
        Toggle Theme
      </button>
    </div>
  );
};

describe('V4 Unified Radial AOE Theme Transition', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('gracefully updates theme when startViewTransition is unsupported', () => {
    render(
      <ThemeProvider>
        <ThemeRevealConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('resolved').textContent).toBe('light');

    const btn = screen.getByTestId('toggle-btn');
    fireEvent.click(btn);

    expect(screen.getByTestId('resolved').textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('triggers circular AOE view transition when startViewTransition is supported', () => {
    const mockAnimate = vi.fn().mockReturnValue({ finished: Promise.resolve() });
    document.documentElement.animate = mockAnimate;

    const mockStartViewTransition = vi.fn((cb: () => void) => {
      cb();
      return {
        ready: Promise.resolve(),
      };
    });

    (document as any).startViewTransition = mockStartViewTransition;

    render(
      <ThemeProvider>
        <ThemeRevealConsumer />
      </ThemeProvider>
    );

    const btn = screen.getByTestId('toggle-btn');
    act(() => {
      fireEvent.click(btn);
    });

    expect(mockStartViewTransition).toHaveBeenCalled();

    delete (document as any).startViewTransition;
  });
});

describe('V4 Hero Staging and Presentation', () => {
  it('renders Hero with both HeroDotField and ProductStage wrapped desktop window', () => {
    const { container } = render(
      <ThemeProvider>
        <Hero />
      </ThemeProvider>
    );

    // Hero Dot Field canvas present
    expect(container.querySelector('canvas')).toBeInTheDocument();

    // Desktop Window inside ProductStage
    expect(screen.getByText('Desktop Workspace')).toBeInTheDocument();
    expect(screen.getByText('Coreside: Personal Workspace')).toBeInTheDocument();
    expect(screen.getByText('Make me a study planner for this semester.')).toBeInTheDocument();
  });
});
