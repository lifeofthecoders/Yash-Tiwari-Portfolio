-- Secure Supabase CMS migration.
-- Existing portfolio_admins and portfolio_content tables are retained.
-- Public visitors receive access to a separate published-only table.

create table if not exists public.portfolio_public_content (
  id text primary key check (id = 'main'),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_admins enable row level security;
alter table public.portfolio_content enable row level security;
alter table public.portfolio_public_content enable row level security;

-- Remove prior policies on the two existing CMS tables, including old policies
-- that may have allowed public access to the private draft row.
do $$
declare p record;
begin
  for p in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename in ('portfolio_admins', 'portfolio_content', 'portfolio_public_content')
  loop
    execute format('drop policy if exists %I on %I.%I', p.policyname, p.schemaname, p.tablename);
  end loop;
end $$;

-- Admin allowlist: authenticated users may read only their own membership row.
revoke all on public.portfolio_admins from anon, authenticated;
grant select on public.portfolio_admins to authenticated;

create policy "admin can read own allowlist row"
on public.portfolio_admins
for select
to authenticated
using (user_id = (select auth.uid()));

-- Private drafts: only allowlisted admins may read or change draft content.
revoke all on public.portfolio_content from anon, authenticated;
grant select, insert, update, delete on public.portfolio_content to authenticated;

create policy "allowlisted admins manage private drafts"
on public.portfolio_content
for all
to authenticated
using (
  exists (
    select 1 from public.portfolio_admins a
    where a.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.portfolio_admins a
    where a.user_id = (select auth.uid())
  )
);

-- Published table: anyone can read, but only allowlisted administrators can write.
revoke all on public.portfolio_public_content from anon, authenticated;
grant select on public.portfolio_public_content to anon, authenticated;
grant insert, update, delete on public.portfolio_public_content to authenticated;

create policy "public can read published content"
on public.portfolio_public_content
for select
to anon, authenticated
using (true);

create policy "allowlisted admins manage published content"
on public.portfolio_public_content
for all
to authenticated
using (
  exists (
    select 1 from public.portfolio_admins a
    where a.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.portfolio_admins a
    where a.user_id = (select auth.uid())
  )
);

-- Publish RPC copies the private draft into the public table.
-- It verifies admin membership inside the database, independently of the UI.
create or replace function public.publish_portfolio_content()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  draft_json jsonb;
begin
  if auth.uid() is null or not exists (
    select 1 from public.portfolio_admins a
    where a.user_id = auth.uid()
  ) then
    raise exception 'Administrator access required';
  end if;

  select c.content
    into draft_json
    from public.portfolio_content c
   where c.id = 'main';

  if draft_json is null then
    raise exception 'No draft content exists to publish';
  end if;

  insert into public.portfolio_public_content (id, content, updated_at)
  values ('main', draft_json, now())
  on conflict (id) do update
    set content = excluded.content,
        updated_at = excluded.updated_at;
end;
$$;

revoke all on function public.publish_portfolio_content() from public, anon;
grant execute on function public.publish_portfolio_content() to authenticated;

-- Preserve the existing admin row and initialize the private draft from existing row
-- only if it contains data. Do not overwrite a non-empty draft.
insert into public.portfolio_content (id, content, is_published, updated_at)
values ('main', '{}'::jsonb, false, now())
on conflict (id) do nothing;
