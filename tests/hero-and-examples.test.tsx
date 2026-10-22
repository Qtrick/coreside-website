import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from '@/components/Hero';
import { ExampleApps } from '@/components/ExampleApps';

describe('Hero Interactive Demonstration', () => {
  it('renders headline, subhead, and simulation steps', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/software that takes shape around you/i);
    expect(screen.getByText(/4. Evolved with Data Kept/i)).toBeInTheDocument();
  });

  it('allows manual step selection and displays evolution state in step 4', () => {
    render(<Hero />);
    const step4Btn = screen.getByRole('button', { name: /4. Evolved with Data Kept/i });
    fireEvent.click(step4Btn);

    expect(screen.getByText(/add priorities and a progress summary/i)).toBeInTheDocument();
    expect(screen.getByText(/0 data lost/i)).toBeInTheDocument();
  });

  it('allows user to interact with the course tasks in the hero window', () => {
    render(<Hero />);
    const taskItem = screen.getByText(/Complete Differential Equations Set 3/i);
    expect(taskItem).toBeInTheDocument();

    // Click to complete
    fireEvent.click(taskItem);
    expect(taskItem).toHaveClass('line-through');
  });
});

describe('ExampleApps Component', () => {
  it('switches tabs between Study Planner, Habit Tracker, and Quiz', async () => {
    render(<ExampleApps />);

    // Initially on Study Planner
    expect(screen.getByText(/Fall Semester Planner/i)).toBeInTheDocument();

    // Switch to Habit Tracker
    fireEvent.click(screen.getByRole('tab', { name: /habit tracker/i }));
    expect(await screen.findByText(/Daily Discipline Ledger/i)).toBeInTheDocument();

    // Switch to Quiz
    fireEvent.click(screen.getByRole('tab', { name: /interactive quiz & checklist/i }));
    expect(await screen.findByText(/Where do Coreside apps run\?/i)).toBeInTheDocument();
  });

  it('evaluates quiz choices interactively and provides feedback', async () => {
    render(<ExampleApps />);
    fireEvent.click(screen.getByRole('tab', { name: /interactive quiz & checklist/i }));

    const correctChoice = await screen.findByText(/locally on your desktop, rendered from declarative validated components/i);
    fireEvent.click(correctChoice);

    expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
  });
});
