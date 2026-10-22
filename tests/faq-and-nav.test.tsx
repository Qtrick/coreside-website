import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FAQ } from '@/components/FAQ';
import { Header } from '@/components/Header';
import { ThemeProvider } from '@/context/ThemeContext';

describe('FAQ Accordion', () => {
  it('renders all canonical product questions', () => {
    render(<FAQ />);
    expect(screen.getByText('What is Coreside?')).toBeInTheDocument();
    expect(screen.getByText('How is it different from an AI chatbot?')).toBeInTheDocument();
    expect(screen.getByText('Does it build standalone websites or mobile apps?')).toBeInTheDocument();
    expect(screen.getByText('Can it run automations while closed?')).toBeInTheDocument();
  });

  it('toggles question expansion and updates aria-expanded', () => {
    render(<FAQ />);
    const button = screen.getByRole('button', { name: /Does it build standalone websites or mobile apps\?/i });

    // Initially collapsed
    expect(button).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/No\. Coreside is not an external website builder/i)).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('Header Component', () => {
  it('renders brand mark, wordmark, and desktop nav links', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    expect(screen.getByText('Coreside')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('How it works')).toBeInTheDocument();
    expect(screen.getByText('Examples')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('toggles mobile menu drawer when mobile button is clicked', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const toggleBtn = screen.getByRole('button', { name: /open navigation menu/i });
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggleBtn);
    expect(screen.getByRole('button', { name: /close navigation menu/i })).toHaveAttribute('aria-expanded', 'true');
  });
});
