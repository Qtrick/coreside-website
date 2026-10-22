import { createClient } from "@supabase/supabase-js";

export interface VercelRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: any;
}

export interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => VercelResponse;
  setHeader: (name: string, value: string) => VercelResponse;
}

// Canonical email regex conforming to standard web validation
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const MAX_PAYLOAD_BYTES = 10 * 1024; // 10KB
const ALLOWED_SOURCES = new Set(["website", "hero", "footer", "mobile", "preview"]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Method check: POST only
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      error: "Method not allowed. Expected POST.",
    });
  }

  // 2. Payload size safeguard
  const rawContentLength = req.headers["content-length"];
  const contentLengthStr = Array.isArray(rawContentLength) ? rawContentLength[0] : rawContentLength;
  const contentLength = parseInt(contentLengthStr || "0", 10);
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return res.status(413).json({
      error: "Payload too large.",
    });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (!body || typeof body !== "object") {
      return res.status(400).json({
        error: "Invalid JSON request body.",
      });
    }

    // 3. Honeypot check for automated spam bots
    // Form includes an invisible field named 'company_website'. If filled, return polite fake success.
    if (body.company_website && String(body.company_website).trim().length > 0) {
      return res.status(200).json({
        success: true,
        message: "Thank you for your interest. We'll keep you updated.",
      });
    }

    // 4. Email validation & canonicalization
    const rawEmail = body.email;
    if (typeof rawEmail !== "string") {
      return res.status(400).json({
        error: "Email address is required.",
      });
    }

    const email = rawEmail.trim().toLowerCase();

    if (email.length < 5 || email.length > 255) {
      return res.status(400).json({
        error: "Please enter a valid email address.",
      });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        error: "Please enter a valid email address.",
      });
    }

    // 5. Source parameter validation
    let source = "website";
    if (typeof body.source === "string") {
      const cleanSource = body.source.trim().toLowerCase();
      if (ALLOWED_SOURCES.has(cleanSource)) {
        source = cleanSource;
      }
    }

    // 6. Supabase Credentials Check
    const supabaseUrl = process.env.SUPABASE_URL?.trim();
    const supabaseServiceKey = (
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY
    )?.trim();

    if (!supabaseUrl || !supabaseServiceKey) {
      // In development or when credentials are not yet configured
      return res.status(503).json({
        error: "Waitlist database is not yet configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      });
    }

    // 7. Supabase client with service_role (bypasses RLS safely on server)
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // 8. Insert into waitlist
    const { error } = await supabase.from("waitlist").insert([
      {
        email,
        source,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      // Postgres error 23505 = unique constraint violation (duplicate email)
      if (error.code === "23505" || error.message.includes("duplicate key")) {
        return res.status(200).json({
          success: true,
          alreadyRegistered: true,
          message: "You're already on the waitlist! We'll keep you updated as early access opens.",
        });
      }

      console.error("Waitlist database error (redacted details)");
      return res.status(500).json({
        error: "Unable to save your request right now. Please try again shortly.",
      });
    }

    // 9. Success response
    return res.status(200).json({
      success: true,
      alreadyRegistered: false,
      message: "You're on the list. We'll be in touch as early access opens.",
    });
  } catch (err) {
    console.error("Waitlist handler unexpected error");
    return res.status(500).json({
      error: "An unexpected error occurred. Please try again.",
    });
  }
}
