import { describe, it, expect, vi, beforeEach } from 'vitest';
import handler from '../api/waitlist';
import type { VercelRequest, VercelResponse } from '../api/waitlist';

function createMockReqRes(options: {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}) {
  const req: VercelRequest = {
    method: options.method || 'POST',
    headers: options.headers || {},
    body: options.body || {},
  };

  const resState = {
    statusCode: 200,
    headers: {} as Record<string, string>,
    body: null as any,
  };

  const res: VercelResponse = {
    status: (code: number) => {
      resState.statusCode = code;
      return res;
    },
    json: (data: any) => {
      resState.body = data;
      return res;
    },
    setHeader: (name: string, value: string) => {
      resState.headers[name] = value;
      return res;
    },
  };

  return { req, res, resState };
}

describe('Waitlist API Endpoint (/api/waitlist)', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    vi.restoreAllMocks();
  });

  it('rejects non-POST requests with 405 Method Not Allowed', async () => {
    const { req, res, resState } = createMockReqRes({ method: 'GET' });
    await handler(req, res);

    expect(resState.statusCode).toBe(405);
    expect(resState.headers['Allow']).toBe('POST');
    expect(resState.body.error).toContain('Method not allowed');
  });

  it('rejects oversized payloads with 413', async () => {
    const { req, res, resState } = createMockReqRes({
      method: 'POST',
      headers: { 'content-length': '20000' }, // 20KB > 10KB
      body: { email: 'test@example.com' },
    });

    await handler(req, res);
    expect(resState.statusCode).toBe(413);
    expect(resState.body.error).toContain('Payload too large');
  });

  it('catches bots via honeypot and returns polite response without invoking database', async () => {
    const { req, res, resState } = createMockReqRes({
      method: 'POST',
      body: {
        email: 'bot@spam.com',
        company_website: 'http://spam-link.ru', // Honeypot filled
      },
    });

    await handler(req, res);
    expect(resState.statusCode).toBe(200);
    expect(resState.body.success).toBe(true);
  });

  it('rejects missing or malformed email address with 400', async () => {
    const { req, res, resState } = createMockReqRes({
      method: 'POST',
      body: { email: 'not-an-email' },
    });

    await handler(req, res);
    expect(resState.statusCode).toBe(400);
    expect(resState.body.error).toContain('valid email');
  });

  it('returns 503 with honest explanation when Supabase credentials are not configured', async () => {
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.SUPABASE_SECRET_KEY;

    const { req, res, resState } = createMockReqRes({
      method: 'POST',
      body: { email: 'hello@example.com' },
    });

    await handler(req, res);
    expect(resState.statusCode).toBe(503);
    expect(resState.body.error).toContain('Waitlist database is not yet configured');
  });
});
