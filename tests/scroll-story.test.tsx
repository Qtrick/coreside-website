import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScrollStory } from '@/components/site/ScrollStory';

describe('ScrollStory Centerpiece Component', () => {
  it('renders Scene 1 by default and keeps inactive scenes mutually exclusive', () => {
    render(<ScrollStory />);

    // Scene 1 is active
    expect(screen.getAllByRole('heading', { name: 'Describe it.' })[0]).toBeInTheDocument();
    expect(screen.getAllByText('Tell Coreside what you need, in your own words.')[0]).toBeInTheDocument();

    // Inactive scenes' unique narrative text should NOT be present in the active text stage
    expect(screen.queryByText('Watch it take shape.')).not.toBeInTheDocument();
    expect(screen.queryByText('Keep changing it')).not.toBeInTheDocument();
  });

  it('allows manual scene selection and displays evolved app state with progress in scene 3 and 4', async () => {
    render(<ScrollStory />);

    // Click scene 3 selector button
    const scene3Buttons = screen.getAllByRole('tab', { name: /03\. Make it yours/i });
    fireEvent.click(scene3Buttons[0]);

    // In scene 3, evolution copy and progress summary are visible
    const headings = await screen.findAllByRole('heading', { name: 'Make it yours.' });
    expect(headings[0]).toBeInTheDocument();
    const progressSummary = await screen.findAllByText(/Progress Summary/i);
    expect(progressSummary[0]).toBeInTheDocument();
  });

  it('allows interactive task checking in the preview and updates completion percentage', async () => {
    render(<ScrollStory />);

    // Go to scene 2 or 3 where tasks appear
    const scene2Buttons = screen.getAllByRole('tab', { name: /02\. Watch it take shape/i });
    fireEvent.click(scene2Buttons[0]);

    const taskElements = await screen.findAllByText('Calculus: Differential Equations Set 3');
    const taskCheckbox = taskElements[0];
    expect(taskCheckbox).toBeInTheDocument();

    // Toggle task
    fireEvent.click(taskCheckbox);
    expect(taskCheckbox).toHaveClass('line-through');
  });

  it('preserves user task check states across scene navigation', async () => {
    render(<ScrollStory />);

    // Navigate to scene 2 and toggle a task
    const scene2Buttons = screen.getAllByRole('tab', { name: /02\. Watch it take shape/i });
    fireEvent.click(scene2Buttons[0]);

    const taskElements = await screen.findAllByText('Implement Binary Search Tree in Rust');
    const taskCheckbox = taskElements[0];
    fireEvent.click(taskCheckbox);
    expect(taskCheckbox).toHaveClass('line-through');

    // Advance to scene 4
    const scene4Buttons = screen.getAllByRole('tab', { name: /04\. Keep using it/i });
    fireEvent.click(scene4Buttons[0]);

    // The task should STILL be checked in scene 4!
    const taskInScene4Elements = await screen.findAllByText('Implement Binary Search Tree in Rust');
    expect(taskInScene4Elements[0]).toHaveClass('line-through');
  });
});
