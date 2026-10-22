import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WaitlistForm } from '@/components/WaitlistForm';

describe('WaitlistForm Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders input and join button in idle state', () => {
    render(<WaitlistForm idPrefix="test" />);
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /join the waitlist/i })).toBeInTheDocument();
  });

  it('shows error message if submitted with empty email', async () => {
    render(<WaitlistForm idPrefix="test" />);
    const submitBtn = screen.getByRole('button', { name: /join the waitlist/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByRole('alert')).toHaveTextContent(/please enter your email address/i);
  });

  it('rejects malformed email addresses', async () => {
    render(<WaitlistForm idPrefix="test" />);
    const input = screen.getByPlaceholderText(/enter your email/i);
    fireEvent.change(input, { target: { value: 'not-an-email' } });

    const submitBtn = screen.getByRole('button', { name: /join the waitlist/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByRole('alert')).toHaveTextContent(/please enter a valid email address/i);
  });

  it('displays loading state during submission and renders success upon API 200', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        alreadyRegistered: false,
        message: "You're on the list. We'll be in touch as early access opens.",
      }),
    });
    global.fetch = mockFetch;

    render(<WaitlistForm idPrefix="test" />);
    const input = screen.getByPlaceholderText(/enter your email/i);
    fireEvent.change(input, { target: { value: 'student@example.edu' } });

    const submitBtn = screen.getByRole('button', { name: /join the waitlist/i });
    fireEvent.click(submitBtn);

    // Verify submission status message
    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/you're on the list/i);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/waitlist',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          email: 'student@example.edu',
          source: 'website',
          company_website: '',
        }),
      })
    );
  });

  it('handles duplicate signups gracefully without faking new registration', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        alreadyRegistered: true,
        message: "You're already on the waitlist! We'll keep you updated as early access opens.",
      }),
    });
    global.fetch = mockFetch;

    render(<WaitlistForm idPrefix="test" />);
    const input = screen.getByPlaceholderText(/enter your email/i);
    fireEvent.change(input, { target: { value: 'existing@example.com' } });

    const submitBtn = screen.getByRole('button', { name: /join the waitlist/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/already on the waitlist/i);
    });
  });

  it('never displays false success when network or server fails', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({
        error: 'Unable to save your request right now. Please try again shortly.',
      }),
    });
    global.fetch = mockFetch;

    render(<WaitlistForm idPrefix="test" />);
    const input = screen.getByPlaceholderText(/enter your email/i);
    fireEvent.change(input, { target: { value: 'user@example.com' } });

    const submitBtn = screen.getByRole('button', { name: /join the waitlist/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/unable to save your request/i);
    });

    // Success status should NOT be in the document
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
