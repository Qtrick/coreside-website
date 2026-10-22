import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DemoWindowControls } from '@/components/marketing/DemoWindowControls';
import { DesktopWindow } from '@/components/marketing/DesktopWindow';
import { ProductStage } from '@/components/marketing/ProductStage';
import { CoresideDemoShell } from '@/components/marketing/CoresideDemoShell';
import { Personalization } from '@/components/Personalization';

describe('DemoWindowControls Component', () => {
  it('renders authentic macOS traffic light controls marked aria-hidden', () => {
    const { container } = render(<DemoWindowControls />);
    const controlsContainer = container.querySelector('[aria-hidden="true"]');
    expect(controlsContainer).toBeInTheDocument();

    const dots = container.querySelectorAll('span');
    expect(dots.length).toBe(3);
    // Active close dot should have Apple red
    expect(dots[0].className).toContain('bg-[#FF5F57]');
    // Active minimize dot should have Apple yellow
    expect(dots[1].className).toContain('bg-[#FEBC2E]');
    // Active zoom dot should have Apple green
    expect(dots[2].className).toContain('bg-[#28C840]');
  });

  it('renders muted dots when active is false', () => {
    const { container } = render(<DemoWindowControls active={false} />);
    const dots = container.querySelectorAll('span');
    expect(dots[0].className).toContain('bg-neutral-300');
  });
});

describe('DesktopWindow Component', () => {
  it('renders window title, subtitle, and accessories', () => {
    render(
      <DesktopWindow
        title="Study Planner — Coreside"
        subtitle="v1.1"
        rightAccessory={<span>Status Active</span>}
      >
        <div>Window Interior Content</div>
      </DesktopWindow>
    );

    expect(screen.getByText('Study Planner — Coreside')).toBeInTheDocument();
    expect(screen.getByText('v1.1')).toBeInTheDocument();
    expect(screen.getByText('Status Active')).toBeInTheDocument();
    expect(screen.getByText('Window Interior Content')).toBeInTheDocument();
  });
});

describe('ProductStage Component', () => {
  it('renders colored demonstration stage with requested variant and badge', () => {
    render(
      <ProductStage variant="glacier" badge="Walkthrough Stage">
        <div>Staged App</div>
      </ProductStage>
    );

    expect(screen.getByLabelText('Product demonstration environment')).toBeInTheDocument();
    expect(screen.getByText('Walkthrough Stage')).toBeInTheDocument();
    expect(screen.getByText('Staged App')).toBeInTheDocument();
  });
});

describe('CoresideDemoShell Component', () => {
  it('renders authentic sidebar with Conversations, Apps, and Projects', () => {
    render(
      <CoresideDemoShell
        activeChatTitle="Biology Study Chat"
        activeAppTitle="Study Planner"
        chatPanel={<div>Chat Panel View</div>}
        toolCanvas={<div>Tool Canvas View</div>}
      />
    );

    expect(screen.getByText('Conversations')).toBeInTheDocument();
    expect(screen.getByText('Biology Study Chat')).toBeInTheDocument();
    expect(screen.getByText('Personal Apps')).toBeInTheDocument();
    expect(screen.getByText('Study Planner')).toBeInTheDocument();
    expect(screen.getByText('Workspace Projects')).toBeInTheDocument();
    expect(screen.getByText('Chat Panel View')).toBeInTheDocument();
    expect(screen.getByText('Tool Canvas View')).toBeInTheDocument();
  });
});

describe('Personalization Component (Appearance & Customization)', () => {
  it('toggles preview theme between light and dark with isolated tokens', () => {
    render(<Personalization />);

    // Initially in dark mode
    expect(screen.getByLabelText('Preview Dark Theme')).toBeInTheDocument();
    expect(screen.getByText('Appearance & Wallpapers')).toBeInTheDocument();

    // Toggle to Light Preview mode
    const lightBtn = screen.getByLabelText('Preview Light Theme');
    fireEvent.click(lightBtn);

    // Verify preview reflects light theme
    expect(screen.getByText('Color Theme')).toBeInTheDocument();
    expect(screen.getAllByText('light').length).toBeGreaterThan(0);
  });

  it('switches between Paper, Aurora, and Midnight presets', () => {
    render(<Personalization />);

    // Select Paper
    fireEvent.click(screen.getByRole('button', { name: 'Paper' }));
    expect(screen.getByText('Paper Clean')).toBeInTheDocument();

    // Select Midnight
    fireEvent.click(screen.getByRole('button', { name: 'Midnight' }));
    expect(screen.getByText('Midnight Ink')).toBeInTheDocument();
  });
});
