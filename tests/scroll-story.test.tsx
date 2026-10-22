import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScrollStory } from '@/components/site/ScrollStory';

describe('ScrollStory Centerpiece Component', () => {
  it('renders all 4 narrative scenes and headings', () => {
    render(<ScrollStory />);

    expect(screen.getByText('Describe it.')).toBeInTheDocument();
    expect(screen.getByText('Watch it take shape.')).toBeInTheDocument();
    expect(screen.getByText('Make it yours.')).toBeInTheDocument();
    expect(screen.getByText('Keep using it.')).toBeInTheDocument();
  });

  it('allows manual scene selection and displays evolved app state with progress in scene 3 and 4', () => {
    render(<ScrollStory />);

    // Click scene 3 selector button
    const scene3Buttons = screen.getAllByRole('button', { name: /03\. Make it yours/i });
    fireEvent.click(scene3Buttons[0]);

    // In scene 3, evolution copy and progress summary are visible
    expect(screen.getAllByText(/Add priorities and a completion summary/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Progress Summary/i)[0]).toBeInTheDocument();
  });

  it('allows interactive task checking in the preview and updates completion percentage', () => {
    render(<ScrollStory />);

    // Go to scene 2 or 3 where tasks appear
    const scene2Buttons = screen.getAllByRole('button', { name: /02\. Watch it take shape/i });
    fireEvent.click(scene2Buttons[0]);

    const taskCheckbox = screen.getAllByText('Calculus: Differential Equations Set 3')[0];
    expect(taskCheckbox).toBeInTheDocument();

    // Toggle task
    fireEvent.click(taskCheckbox);
    expect(taskCheckbox).toHaveClass('line-through');
  });

  it('preserves user task check states across scene navigation', () => {
    render(<ScrollStory />);

    // Navigate to scene 2 and toggle a task
    const scene2Buttons = screen.getAllByRole('button', { name: /02\. Watch it take shape/i });
    fireEvent.click(scene2Buttons[0]);

    const taskCheckbox = screen.getAllByText('Implement Binary Search Tree in Rust')[0];
    fireEvent.click(taskCheckbox);
    expect(taskCheckbox).toHaveClass('line-through');

    // Advance to scene 4
    const scene4Buttons = screen.getAllByRole('button', { name: /04\. Keep using it/i });
    fireEvent.click(scene4Buttons[0]);

    // The task should STILL be checked in scene 4!
    const taskInScene4 = screen.getAllByText('Implement Binary Search Tree in Rust')[0];
    expect(taskInScene4).toHaveClass('line-through');
  });
});
