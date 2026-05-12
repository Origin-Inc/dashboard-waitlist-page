-- Waitlist signups: one row per email, source-tagged, idempotent on email.
create table if not exists public.waitlist_signups (
  id          bigserial primary key,
  email       text        not null,
  source      text        not null default 'unknown',
  created_at  timestamptz not null default now()
);

create unique index if not exists waitlist_signups_email_key
  on public.waitlist_signups (lower(email));

create index if not exists waitlist_signups_created_at_idx
  on public.waitlist_signups (created_at desc);

-- Lock the table from the anon/public role. Only the service role
-- (used server-side in the API route) writes. RLS denies everything by default
-- once enabled and we don't add any policies — perfect for a server-only table.
alter table public.waitlist_signups enable row level security;
