# Coreside: Launch Website & Early-Access Waitlist

A standalone, high-polish marketing and waitlist website for **Coreside**, the consumer-first personal software environment.

---

## 1. Owner Setup & Publication Checklist

Before taking the website live in production, the founder/owner must complete the following actions:

- [ ] **1. Create Supabase Project & Run Migration**
  - Create or select an owner-controlled Supabase project (do not use the desktop app's local SQLite database).
  - Open the Supabase SQL Editor and execute [`supabase/migrations/001_waitlist.sql`](./supabase/migrations/001_waitlist.sql).
  - Verify that Row Level Security (RLS) is enabled and that anonymous `SELECT`, `UPDATE`, and `DELETE` access is denied.

- [ ] **2. Configure Vercel Environment Variables**
  - Import the repository into Vercel with the **Vite** framework preset.
  - In Vercel Project Settings → Environment Variables, add:
    - `SUPABASE_URL`: Your Supabase project URL (e.g., `https://xyzcompany.supabase.co`)
    - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase `service_role` secret key.
    - *Security Warning:* Never prefix the service role key with `VITE_` or expose it in client-side code.

- [ ] **3. Set Canonical URL & Social Metadata**
  - Set `VITE_SITE_URL` to your production domain (e.g., `https://coreside.app`).
  - Verify that [`public/robots.txt`](./public/robots.txt) and [`public/sitemap.xml`](./public/sitemap.xml) reflect your domain.

- [ ] **4. Perform End-to-End Production Smoke Verification**
  - Visit the live site on desktop and mobile.
  - Test the theme switcher (light mode and dark mode) and verify authentic mark inversion.
  - Submit a test email to the waitlist and confirm the record is created in the Supabase `waitlist` table.
  - Re-submit the same email to confirm the duplicate handler responds safely without creating duplicate records or throwing errors.
  - Verify that direct navigation to [`/privacy`](./src/pages/PrivacyPage.tsx) loads properly without 404ing on refresh.

---

## 2. Architecture & Design Direction

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS. Zero external heavy UI libraries.
- **Backend:** Vercel Serverless Function at [`api/waitlist.ts`](./api/waitlist.ts) running on Node/Edge runtime with validation, payload size bounding (10KB), honeypot anti-spam defense, and duplicate-safe handling.
- **Database:** Supabase PostgreSQL with unique lowercased email index and strict Row Level Security.
- **Aesthetic:** Strictly neutral monochrome site chrome (dark `#080808` / light `#fafafa`) with authentic transparent brand marks. Tasteful color accents are strictly contained inside created sample app windows.
- **Portability:** Fully independent of Lovable hosting. Clones, builds, and deploys directly to Vercel or any standard static + serverless platform.

---

## 3. Local Development

### Prerequisites
- Node.js >= 18 (Node 24 recommended)
- npm >= 9

### Install Dependencies
```bash
npm install
```

### Run Frontend Development Server
```bash
npm run dev
```
Open `http://localhost:5173` to view the website in your browser.

### Run Full-Stack Local Environment with Vercel CLI
To test both the Vite frontend and the serverless [`/api/waitlist`](./api/waitlist.ts) function locally:
```bash
# 1. Copy the environment template
cp .env.example .env.local

# 2. Fill in your SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local

# 3. Start Vercel dev server
npx vercel dev
```

### Run Automated Test Suite
```bash
npm run test
```
Executes 23 automated unit and integration tests covering the waitlist form, theme state, hero simulation, example apps, FAQ accordion, and backend API handler.

### Typecheck & Production Build
```bash
npm run typecheck
npm run build
npm run preview
```

---

## 4. Database Schema & Security

The SQL migration [`supabase/migrations/001_waitlist.sql`](./supabase/migrations/001_waitlist.sql) creates the waitlist structure:

```sql
create table public.waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  source text default 'website',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint waitlist_email_check check (char_length(trim(email)) > 3 and char_length(email) <= 255)
);

create unique index waitlist_email_lower_unique_idx 
  on public.waitlist (lower(trim(email)));

alter table public.waitlist enable row level security;
```

**Security Rules:**
1. Public `anon` users have **no read access** to the table, preventing scraper bots from harvesting emails.
2. The server-side API function [`api/waitlist.ts`](./api/waitlist.ts) uses `SUPABASE_SERVICE_ROLE_KEY` to insert validated entries.
3. Emails are normalized to lowercase trimmed format before insertion.
4. Database error `23505` (unique constraint violation) is handled gracefully without leaking stack traces or user counts.

---

## 5. Documentation & Brand Integrity

- [`docs/marketing-claim-ledger.md`](./docs/marketing-claim-ledger.md): Canonical ledger verifying all public marketing claims against the genuine Coreside desktop codebase and excluding unverified overclaims.
- [`docs/design-rationale.md`](./docs/design-rationale.md): Documented insights from research into Linear, Raycast, Granola, Tana, Y Combinator RFS, Vercel, Supabase, and WCAG 2.2 AA.
- [`public/branding/`](./public/branding/): Authentic monochrome marks derived from Coreside desktop branding assets.
