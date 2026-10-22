-- Coreside Early-Access Waitlist Schema Migration
-- Migration: 001_waitlist.sql
-- Description: Creates the waitlist table, unique index, and row-level security (RLS) policies.

-- Create table in public schema
create table if not exists public.waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  source text default 'website',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Constraint: email length bound (max 255 chars) and non-empty
  constraint waitlist_email_check check (char_length(trim(email)) > 3 and char_length(email) <= 255)
);

-- Unique index on lowercase trimmed email to guarantee case-insensitive uniqueness
create unique index if not exists waitlist_email_lower_unique_idx 
  on public.waitlist (lower(trim(email)));

-- Index for ordering by creation timestamp in administrative queries
create index if not exists waitlist_created_at_idx 
  on public.waitlist (created_at desc);

-- Enable Row Level Security (RLS)
alter table public.waitlist enable row level security;

-- Security Policy:
-- All public reads (SELECT), updates (UPDATE), and deletes (DELETE) are DENIED.
-- The server-side Vercel Function (/api/waitlist) uses SUPABASE_SERVICE_ROLE_KEY,
-- which bypasses RLS safely on the backend server.
-- This ensures that anonymous users can never list, scrape, or tamper with waitlist entries.

-- Drop any previous conflicting policies
drop policy if exists "Deny public select" on public.waitlist;
drop policy if exists "Deny public update" on public.waitlist;
drop policy if exists "Deny public delete" on public.waitlist;

-- Optional: If an owner prefers to allow direct client inserts with the anon key
-- in the future, uncomment the following policy. With our serverless backend,
-- all submissions are strictly validated through /api/waitlist using service_role.
-- create policy "Allow server insert" on public.waitlist for insert with check (true);
