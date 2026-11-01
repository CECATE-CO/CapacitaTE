-- CapacitaTE - estrutura da nuvem (Supabase)
-- Execute uma única vez em: Supabase > SQL Editor > New query > colar este arquivo > Run.
-- Pode ser executado novamente sem perder dados (usa "if not exists").

-- 1. Capacitações (cada linha guarda a capacitação completa no campo "data")
create table if not exists public.trainings (
  id            text primary key,
  number        integer,
  polo          text default '',
  uf            text default '',
  status        text default 'in_progress',
  is_historical boolean default false,
  data          jsonb not null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists trainings_updated_at_idx on public.trainings (updated_at desc);
create index if not exists trainings_number_idx on public.trainings (number);

-- 2. Catálogo da equipe mestra
create table if not exists public.master_team (
  id         text primary key,
  data       jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. Acesso pelo app (chave pública "publishable/anon")
-- O app não tem login: ele lê, grava e exclui com a chave pública. As políticas abaixo liberam isso
-- para quem tiver a chave do projeto. Não publique a chave em sites abertos se os dados forem sensíveis.
alter table public.trainings enable row level security;
alter table public.master_team enable row level security;

drop policy if exists "app_trainings_select" on public.trainings;
drop policy if exists "app_trainings_insert" on public.trainings;
drop policy if exists "app_trainings_update" on public.trainings;
drop policy if exists "app_trainings_delete" on public.trainings;
create policy "app_trainings_select" on public.trainings for select to anon, authenticated using (true);
create policy "app_trainings_insert" on public.trainings for insert to anon, authenticated with check (true);
create policy "app_trainings_update" on public.trainings for update to anon, authenticated using (true) with check (true);
create policy "app_trainings_delete" on public.trainings for delete to anon, authenticated using (true);

drop policy if exists "app_master_team_select" on public.master_team;
drop policy if exists "app_master_team_write" on public.master_team;
create policy "app_master_team_select" on public.master_team for select to anon, authenticated using (true);
create policy "app_master_team_write" on public.master_team for all to anon, authenticated using (true) with check (true);

grant select, insert, update, delete on public.trainings to anon, authenticated;
grant select, insert, update, delete on public.master_team to anon, authenticated;

-- ============================================================================
-- Migração 0002 (supabase/migrations/0002_auth_permissoes.sql)
-- ============================================================================

-- 1. Perfis dos usuários internos (1:1 com auth.users)
create table if not exists public.profiles (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  full_name   text not null default '',
  email       text not null default '',
  is_admin    boolean not null default false,
  is_active   boolean not null default true,
  last_seen   timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 2. Permissões por módulo/ação (training_id null = todas as capacitações)
create table if not exists public.module_permissions (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references public.profiles(user_id) on delete cascade,
  module_key  text not null,
  action      text not null,
  training_id text references public.trainings(id) on delete cascade,
  granted_by  uuid references public.profiles(user_id),
  created_at  timestamptz not null default now()
);
-- Nulos não colidem no unique comum; por isso o índice usa coalesce
create unique index if not exists module_permissions_uniq
  on public.module_permissions (user_id, module_key, action, coalesce(training_id, '*'));

-- 3. Trilha de auditoria
create table if not exists public.audit_log (
  id          bigint generated always as identity primary key,
  at          timestamptz not null default now(),
  user_id     uuid,              -- null = público (via RPC)
  module_key  text,
  training_id text,
  action      text not null,     -- 'login','perm.grant','perm.revoke','user.admin','user.active','user.invite',...
  target      text,
  details     jsonb
);
create index if not exists audit_log_at_idx on public.audit_log (at desc);

-- 4. Funções de permissão
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where user_id = auth.uid() and is_admin and is_active);
$$;

-- p_action 'view' é satisfeita por edit/export/generate
create or replace function public.has_perm(p_module text, p_action text, p_training text default null)
returns boolean language sql stable security definer set search_path = public as $$
  select public.is_admin() or exists (
    select 1 from module_permissions mp
    join profiles p on p.user_id = mp.user_id and p.is_active
    where mp.user_id = auth.uid()
      and mp.module_key = p_module
      and (mp.action = p_action or (p_action = 'view' and mp.action in ('edit','export','generate')))
      and (mp.training_id is null or mp.training_id = p_training)
  );
$$;

create or replace function public.my_permissions()
returns table(module_key text, action text, training_id text, is_admin boolean)
language sql stable security definer set search_path = public as $$
  select mp.module_key, mp.action, mp.training_id, p.is_admin
  from profiles p left join module_permissions mp on mp.user_id = p.user_id
  where p.user_id = auth.uid() and p.is_active;
$$;

-- 5. Primeiro admin (executar no SQL Editor; só funciona se ainda não houver admin)
create or replace function public.bootstrap_admin(p_email text) returns text
language plpgsql security definer set search_path = public as $$
declare v_uid uuid;
begin
  if exists (select 1 from profiles where is_admin) then
    return 'Já existe admin; use a tela Admin.';
  end if;
  select id into v_uid from auth.users where lower(email) = lower(p_email);
  if v_uid is null then return 'Usuário não encontrado em Authentication > Users.'; end if;
  insert into profiles(user_id, email, is_admin) values (v_uid, p_email, true)
    on conflict (user_id) do update set is_admin = true, is_active = true;
  return 'Admin definido: ' || p_email;
end $$;
revoke execute on function public.bootstrap_admin(text) from public, anon, authenticated;

-- Situação da configuração, para a tela de login saber se já existe admin (não expõe dados pessoais)
create or replace function public.auth_setup_status() returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object('installed', true, 'has_admin', exists (select 1 from profiles where is_admin and is_active));
$$;
grant execute on function public.auth_setup_status() to anon, authenticated;

-- 6. Triggers: perfil criado junto com o usuário, updated_at e proteção do último admin
create or replace function public.handle_new_auth_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into profiles(user_id, email, full_name)
  values (new.id, coalesce(new.email, ''), coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (user_id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_auth_user();

-- Usuários que já existiam antes desta migração também ganham perfil
insert into public.profiles(user_id, email, full_name)
select u.id, coalesce(u.email, ''), coalesce(u.raw_user_meta_data->>'full_name', '')
from auth.users u
on conflict (user_id) do nothing;

create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;
drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at before update on public.profiles
  for each row execute function public.touch_updated_at();

create or replace function public.protect_last_admin() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if old.is_admin and old.is_active and (not new.is_admin or not new.is_active) then
    if not exists (select 1 from profiles where is_admin and is_active and user_id <> old.user_id) then
      raise exception 'Não é possível rebaixar ou desativar o último admin ativo.';
    end if;
  end if;
  return new;
end $$;
drop trigger if exists profiles_protect_last_admin on public.profiles;
create trigger profiles_protect_last_admin before update on public.profiles
  for each row execute function public.protect_last_admin();

-- 7. RLS: leitura do próprio perfil (ou de todos, para admin). Escritas só pelas funções abaixo.
alter table public.profiles enable row level security;
alter table public.module_permissions enable row level security;
alter table public.audit_log enable row level security;

drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "module_permissions_select" on public.module_permissions;
create policy "module_permissions_select" on public.module_permissions for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "audit_log_select" on public.audit_log;
create policy "audit_log_select" on public.audit_log for select to authenticated
  using (public.is_admin());

revoke insert, update, delete on public.profiles, public.module_permissions, public.audit_log from anon, authenticated;
grant select on public.profiles, public.module_permissions, public.audit_log to authenticated;

-- 8. Funções usadas pelo painel (todas validam o chamador no servidor e gravam auditoria)
create or replace function public.log_event(p_action text, p_module text default null, p_training text default null,
                                            p_target text default null, p_details jsonb default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'Login necessário.'; end if;
  insert into audit_log(user_id, module_key, training_id, action, target, details)
  values (auth.uid(), p_module, p_training, left(p_action, 60), left(p_target, 200), p_details);
  if p_action = 'login' then
    update profiles set last_seen = now() where user_id = auth.uid();
  end if;
end $$;
grant execute on function public.log_event(text, text, text, text, jsonb) to authenticated;

create or replace function public.admin_set_permission(p_user uuid, p_module text, p_action text, p_grant boolean,
                                                       p_training text default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'Somente admins podem alterar permissões.'; end if;
  if p_module !~ '^[a-z][a-z0-9_]*$' or p_action !~ '^[a-z][a-z0-9_]*$' then raise exception 'Módulo ou ação inválidos.'; end if;
  if p_grant then
    insert into module_permissions(user_id, module_key, action, training_id, granted_by)
    values (p_user, p_module, p_action, p_training, auth.uid())
    on conflict (user_id, module_key, action, (coalesce(training_id, '*'))) do nothing;
  else
    delete from module_permissions
    where user_id = p_user and module_key = p_module and action = p_action
      and coalesce(training_id, '*') = coalesce(p_training, '*');
  end if;
  insert into audit_log(user_id, module_key, training_id, action, target, details)
  values (auth.uid(), p_module, p_training, case when p_grant then 'perm.grant' else 'perm.revoke' end,
          p_user::text, jsonb_build_object('action', p_action));
end $$;
grant execute on function public.admin_set_permission(uuid, text, text, boolean, text) to authenticated;

create or replace function public.admin_update_profile(p_user uuid, p_is_admin boolean default null,
                                                       p_is_active boolean default null, p_full_name text default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'Somente admins podem alterar usuários.'; end if;
  -- o trigger protect_last_admin impede rebaixar/desativar o último admin ativo
  update profiles set
    is_admin  = coalesce(p_is_admin, is_admin),
    is_active = coalesce(p_is_active, is_active),
    full_name = coalesce(p_full_name, full_name)
  where user_id = p_user;
  insert into audit_log(user_id, action, target, details)
  values (auth.uid(), 'user.update', p_user::text,
          jsonb_strip_nulls(jsonb_build_object('is_admin', p_is_admin, 'is_active', p_is_active, 'full_name', p_full_name)));
end $$;
grant execute on function public.admin_update_profile(uuid, boolean, boolean, text) to authenticated;

-- 9. Atualiza o cache da API
notify pgrst, 'reload schema';

-- ============================================================================
-- Migração 0002b (supabase/migrations/0002b_superadmin.sql)
-- ============================================================================

-- 1. Papel de superadministrador (acima de admin). Só se define por SQL, nunca pela tela.
alter table public.profiles add column if not exists is_superadmin boolean not null default false;

update public.profiles set is_superadmin = true, is_admin = true, is_active = true
where lower(email) = 'morato@ufg.br';

create or replace function public.is_superadmin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where user_id = auth.uid() and is_superadmin and is_admin and is_active);
$$;
grant execute on function public.is_superadmin() to authenticated;

-- 2. O superadministrador não pode ser rebaixado nem desativado pela tela; o papel não muda por update comum
create or replace function public.protect_last_admin() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if old.is_superadmin and (not new.is_admin or not new.is_active) then
    raise exception 'O superadministrador não pode ser rebaixado nem desativado.';
  end if;
  if new.is_superadmin is distinct from old.is_superadmin and current_user in ('authenticated', 'anon') then
    raise exception 'O papel de superadministrador só pode ser alterado no SQL Editor.';
  end if;
  if old.is_admin and old.is_active and (not new.is_admin or not new.is_active) then
    if not exists (select 1 from profiles where is_admin and is_active and user_id <> old.user_id) then
      raise exception 'Não é possível rebaixar ou desativar o último admin ativo.';
    end if;
  end if;
  return new;
end $$;

-- 3. Alterar nome: só o superadministrador
create or replace function public.admin_update_profile(p_user uuid, p_is_admin boolean default null,
                                                       p_is_active boolean default null, p_full_name text default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'Somente admins podem alterar usuários.'; end if;
  if p_full_name is not null and not public.is_superadmin() then
    raise exception 'Somente o superadministrador pode alterar o nome de usuários.';
  end if;
  if p_full_name is not null and length(btrim(p_full_name)) = 0 then
    raise exception 'O nome não pode ficar vazio.';
  end if;
  update profiles set
    is_admin  = coalesce(p_is_admin, is_admin),
    is_active = coalesce(p_is_active, is_active),
    full_name = coalesce(regexp_replace(btrim(p_full_name), '\s+', ' ', 'g'), full_name)
  where user_id = p_user;
  insert into audit_log(user_id, action, target, details)
  values (auth.uid(), 'user.update', p_user::text,
          jsonb_strip_nulls(jsonb_build_object('is_admin', p_is_admin, 'is_active', p_is_active, 'full_name', p_full_name)));
end $$;
grant execute on function public.admin_update_profile(uuid, boolean, boolean, text) to authenticated;

-- 4. Excluir usuário: só o superadministrador; não exclui a si mesmo nem outro superadministrador.
--    Remove a conta (auth.users); perfil e permissões saem em cascata. A auditoria guarda o e-mail.
alter table public.module_permissions drop constraint if exists module_permissions_granted_by_fkey;
alter table public.module_permissions add constraint module_permissions_granted_by_fkey
  foreign key (granted_by) references public.profiles(user_id) on delete set null;

create or replace function public.admin_delete_user(p_user uuid) returns void
language plpgsql security definer set search_path = public, auth as $$
declare v_email text; v_super boolean;
begin
  if not public.is_superadmin() then raise exception 'Somente o superadministrador pode excluir usuários.'; end if;
  if p_user = auth.uid() then raise exception 'Você não pode excluir a sua própria conta.'; end if;
  select email, is_superadmin into v_email, v_super from public.profiles where user_id = p_user;
  if v_email is null then raise exception 'Usuário não encontrado.'; end if;
  if v_super then raise exception 'Não é possível excluir um superadministrador.'; end if;
  insert into public.audit_log(user_id, action, target, details)
  values (auth.uid(), 'user.delete', p_user::text, jsonb_build_object('email', v_email));
  delete from auth.users where id = p_user;
end $$;
revoke execute on function public.admin_delete_user(uuid) from public, anon;
grant execute on function public.admin_delete_user(uuid) to authenticated;

notify pgrst, 'reload schema';

-- ============================================================================
-- Migração 0003 (supabase/migrations/0003_pessoas_formularios.sql)
-- ============================================================================

create extension if not exists pgcrypto with schema extensions;

-- 1. Cadastro único de pessoas (chave natural = CPF só com dígitos)
create table if not exists public.people (
  cpf            char(11) primary key check (cpf ~ '^[0-9]{11}$'),
  full_name      text not null,
  email          text,
  birth_date     date,
  phone          text,                 -- somente dígitos: DDD + número
  municipality   text,                 -- nome como exibido
  ibge_code      text,                 -- código IBGE (window.IBGE_DATA)
  uf             char(2),
  category       text check (category in ('CACS-FUNDEB','Gestão municipal')),
  role_gestao    text,                 -- "Que cargo você ocupa na gestão municipal?"
  role_cacs      text,                 -- "Que cargo você ocupa no CACS-FUNDEB?"
  institution    text,
  source         text not null default 'formulario', -- 'formulario' | 'importacao' | 'manual'
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists people_name_idx on public.people using gin (to_tsvector('portuguese', full_name));

-- 2. Instância de formulário por capacitação e módulo (presença: uma por sessão)
create table if not exists public.forms (
  id            uuid primary key default gen_random_uuid(),
  training_id   text not null references public.trainings(id) on delete cascade,
  module_key    text not null check (module_key in ('inscricao','presenca','avaliacao')),
  session_key   text not null default 'unico', -- presença: 'dia1', 'dia1-manha' etc.
  public_token  text not null unique default encode(extensions.gen_random_bytes(12), 'hex'),
  status        text not null default 'rascunho' check (status in ('rascunho','aberto','fechado')),
  opens_at      timestamptz,
  closes_at     timestamptz,
  config        jsonb not null default '{}'::jsonb,  -- título, textos, municípios, perguntas
  created_by    uuid references public.profiles(user_id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (training_id, module_key, session_key)
);

-- 3. Respostas: colunas fixas para o que vira planilha + jsonb para extras.
--    Cada resposta guarda uma cópia dos dados como foram enviados (snapshot); people guarda o mais recente.
create table if not exists public.registrations (
  id            uuid primary key default gen_random_uuid(),
  form_id       uuid not null references public.forms(id) on delete cascade,
  training_id   text not null references public.trainings(id) on delete cascade,
  cpf           char(11) not null references public.people(cpf),
  submitted_at  timestamptz not null default now(),
  email         text, full_name text, birth_date date, phone text,
  municipality  text, ibge_code text, category text,
  role_gestao   text, success_case text, role_cacs text,
  truth_confirmed boolean not null default false,
  answers       jsonb not null default '{}'::jsonb,
  status        text not null default 'valida' check (status in ('valida','cancelada')),
  updated_at    timestamptz not null default now(),
  unique (training_id, cpf)
);

create table if not exists public.attendance (
  id            uuid primary key default gen_random_uuid(),
  form_id       uuid not null references public.forms(id) on delete cascade,
  training_id   text not null references public.trainings(id) on delete cascade,
  session_key   text not null,
  cpf           char(11) not null references public.people(cpf),
  submitted_at  timestamptz not null default now(),
  full_name text, phone text, email text,
  was_registered boolean not null,     -- calculado: existe inscrição válida (não é perguntado)
  birth_date date, phone2 text, municipality text, ibge_code text, category text,
  role_gestao text, success_case text, role_cacs text,
  answers       jsonb not null default '{}'::jsonb,
  updated_at    timestamptz not null default now(),
  unique (training_id, session_key, cpf)
);
alter table public.attendance add column if not exists updated_at timestamptz not null default now();

create table if not exists public.evaluations (
  id            uuid primary key default gen_random_uuid(),
  form_id       uuid not null references public.forms(id) on delete cascade,
  training_id   text not null references public.trainings(id) on delete cascade,
  cpf           char(11) not null references public.people(cpf),
  submitted_at  timestamptz not null default now(),
  full_name text, email text, phone text, municipality text, ibge_code text, category text,
  ratings       jsonb not null,        -- {"inscricao":5,"divulgacao":5,...} (chaves = config)
  liked text, improve text, institution_type text, institution_name text,
  topics_suggestion text, heard_from text[], comments text,
  answers       jsonb not null default '{}'::jsonb,
  updated_at    timestamptz not null default now(),
  unique (training_id, cpf)
);
alter table public.evaluations add column if not exists updated_at timestamptz not null default now();

create index if not exists registrations_training_idx on public.registrations (training_id);
create index if not exists registrations_form_idx on public.registrations (form_id);
create index if not exists attendance_training_idx on public.attendance (training_id);
create index if not exists attendance_form_idx on public.attendance (form_id);
create index if not exists evaluations_training_idx on public.evaluations (training_id);
create index if not exists evaluations_form_idx on public.evaluations (form_id);
create index if not exists forms_training_idx on public.forms (training_id);

-- 4. updated_at automático (função touch_updated_at criada na 0002)
drop trigger if exists people_touch_updated_at on public.people;
create trigger people_touch_updated_at before update on public.people
  for each row execute function public.touch_updated_at();
drop trigger if exists forms_touch_updated_at on public.forms;
create trigger forms_touch_updated_at before update on public.forms
  for each row execute function public.touch_updated_at();
drop trigger if exists registrations_touch_updated_at on public.registrations;
create trigger registrations_touch_updated_at before update on public.registrations
  for each row execute function public.touch_updated_at();
drop trigger if exists attendance_touch_updated_at on public.attendance;
create trigger attendance_touch_updated_at before update on public.attendance
  for each row execute function public.touch_updated_at();
drop trigger if exists evaluations_touch_updated_at on public.evaluations;
create trigger evaluations_touch_updated_at before update on public.evaluations
  for each row execute function public.touch_updated_at();

-- 5. RLS: somente usuários logados com permissão no módulo. Nada para anon.
alter table public.people enable row level security;
alter table public.forms enable row level security;
alter table public.registrations enable row level security;
alter table public.attendance enable row level security;
alter table public.evaluations enable row level security;

-- Pode ver nomes de pessoas quem tem pessoas.view ou view em algum módulo de formulário
create or replace function public.can_view_people() returns boolean
language sql stable security definer set search_path = public as $$
  select public.has_perm('pessoas','view') or public.has_perm('inscricao','view')
      or public.has_perm('presenca','view') or public.has_perm('avaliacao','view');
$$;

drop policy if exists "people_select" on public.people;
create policy "people_select" on public.people for select to authenticated using (public.can_view_people());
drop policy if exists "people_write" on public.people;
create policy "people_write" on public.people for update to authenticated
  using (public.has_perm('pessoas','edit')) with check (public.has_perm('pessoas','edit'));

drop policy if exists "forms_select" on public.forms;
create policy "forms_select" on public.forms for select to authenticated
  using (public.has_perm(module_key, 'view', training_id));
drop policy if exists "forms_insert" on public.forms;
create policy "forms_insert" on public.forms for insert to authenticated
  with check (public.has_perm(module_key, 'edit', training_id));
drop policy if exists "forms_update" on public.forms;
create policy "forms_update" on public.forms for update to authenticated
  using (public.has_perm(module_key, 'edit', training_id)) with check (public.has_perm(module_key, 'edit', training_id));
drop policy if exists "forms_delete" on public.forms;
create policy "forms_delete" on public.forms for delete to authenticated
  using (public.has_perm(module_key, 'edit', training_id));

drop policy if exists "registrations_select" on public.registrations;
create policy "registrations_select" on public.registrations for select to authenticated
  using (public.has_perm('inscricao', 'view', training_id));
drop policy if exists "registrations_update" on public.registrations;
create policy "registrations_update" on public.registrations for update to authenticated
  using (public.has_perm('inscricao', 'edit', training_id)) with check (public.has_perm('inscricao', 'edit', training_id));

drop policy if exists "attendance_select" on public.attendance;
create policy "attendance_select" on public.attendance for select to authenticated
  using (public.has_perm('presenca', 'view', training_id));
drop policy if exists "attendance_delete" on public.attendance;
create policy "attendance_delete" on public.attendance for delete to authenticated
  using (public.has_perm('presenca', 'edit', training_id));

drop policy if exists "evaluations_select" on public.evaluations;
create policy "evaluations_select" on public.evaluations for select to authenticated
  using (public.has_perm('avaliacao', 'view', training_id));
drop policy if exists "evaluations_delete" on public.evaluations;
create policy "evaluations_delete" on public.evaluations for delete to authenticated
  using (public.has_perm('avaliacao', 'edit', training_id));

revoke all on public.people, public.forms, public.registrations, public.attendance, public.evaluations from anon;
grant select, update on public.people to authenticated;
grant select, insert, update, delete on public.forms to authenticated;
grant select, update on public.registrations to authenticated;
grant select, delete on public.attendance, public.evaluations to authenticated;

notify pgrst, 'reload schema';

-- ============================================================================
-- Migração 0004 (supabase/migrations/0004_rpc_publicas.sql)
-- ============================================================================

-- 1. Controle de tentativas (rate limit simples por janela de tempo)
create table if not exists public.public_rate_limit (
  key          text primary key,
  window_start timestamptz not null default now(),
  hits         int not null default 0
);
alter table public.public_rate_limit enable row level security;
revoke all on public.public_rate_limit from anon, authenticated;

-- 2. Auxiliares (internas; não ficam disponíveis para anon)
create or replace function public._digits(p text) returns text
language sql immutable as $$ select regexp_replace(coalesce(p, ''), '\D', '', 'g') $$;

create or replace function public._txt(p jsonb, k text) returns text
language sql immutable as $$ select nullif(regexp_replace(btrim(coalesce(p->>k, '')), '\s+', ' ', 'g'), '') $$;

create or replace function public._cpf_valid(p text) returns boolean
language plpgsql immutable as $$
declare d text := public._digits(p); s int; dv int;
begin
  if length(d) <> 11 or d ~ '^(\d)\1{10}$' then return false; end if;
  for t in 9..10 loop
    s := 0;
    for i in 1..t loop s := s + substr(d, i, 1)::int * (t + 2 - i); end loop;
    dv := (s * 10) % 11 % 10;
    if dv <> substr(d, t + 1, 1)::int then return false; end if;
  end loop;
  return true;
end $$;

-- "Fabiano Dias" → "Fa*** D***s"
create or replace function public._mask_name(p text) returns text
language sql immutable as $$
  select string_agg(case when n = 1 then left(w, 2) || '***' else left(w, 1) || '***' || right(w, 1) end, ' ' order by n)
  from unnest(regexp_split_to_array(btrim(coalesce(p, '')), '\s+')) with ordinality as x(w, n)
  where w <> '';
$$;

-- "fabiano@gmail.com" → "fab***@gmail.com"
create or replace function public._mask_email(p text) returns text
language sql immutable as $$
  select case when p is null or position('@' in p) = 0 then null
              else left(split_part(p, '@', 1), 3) || '***@' || split_part(p, '@', 2) end;
$$;

create or replace function public._when(p timestamptz) returns text
language sql stable as $$ select to_char(p at time zone 'America/Sao_Paulo', 'DD/MM/YYYY "às" HH24:MI') $$;

create or replace function public._client_ip() returns text
language sql stable as $$
  select coalesce(split_part(nullif(current_setting('request.headers', true), '')::json->>'x-forwarded-for', ',', 1), 'desconhecido');
$$;

-- Conta uma tentativa; erro quando passa do limite dentro da janela
create or replace function public._rate_hit(p_key text, p_limit int, p_window interval default interval '15 minutes')
returns void language plpgsql security definer set search_path = public as $$
declare v_hits int;
begin
  insert into public_rate_limit(key, window_start, hits) values (md5(p_key), now(), 1)
  on conflict (key) do update set
    hits = case when public_rate_limit.window_start < now() - p_window then 1 else public_rate_limit.hits + 1 end,
    window_start = case when public_rate_limit.window_start < now() - p_window then now() else public_rate_limit.window_start end
  returning hits into v_hits;
  if v_hits > p_limit then
    raise exception 'Muitas tentativas. Aguarde 15 minutos e tente novamente.';
  end if;
end $$;

-- Situação efetiva do formulário: rascunho | agendado | aberto | encerrado
create or replace function public._form_state(f public.forms) returns text
language sql stable as $$
  select case
    when f.status = 'rascunho' then 'rascunho'
    when f.status = 'fechado' then 'encerrado'
    when f.opens_at is not null and now() < f.opens_at then 'agendado'
    when f.closes_at is not null and now() >= f.closes_at then 'encerrado'
    else 'aberto' end;
$$;

create or replace function public._form_by_token(p_token text) returns public.forms
language plpgsql stable security definer set search_path = public as $$
declare f forms;
begin
  select * into f from forms where public_token = btrim(coalesce(p_token, ''));
  if f.id is null then raise exception 'Formulário não encontrado. Confira o link ou o QR Code.'; end if;
  return f;
end $$;

-- Segundo fator: data de nascimento (preferencial) ou e-mail do cadastro
create or replace function public._second_factor_ok(p public.people, p_birth date, p_email text) returns boolean
language sql immutable as $$
  select case
    when p.cpf is null then true
    when p.birth_date is not null then p_birth is not null and p_birth = p.birth_date
    when p.email is not null then lower(btrim(coalesce(p_email, ''))) = p.email
    else false end;
$$;

-- Cria a pessoa ou, se o segundo fator conferir (ou for a equipe), atualiza só com valores não vazios
create or replace function public._save_person(p_cpf text, d jsonb, p_trusted boolean, p_source text)
returns void language plpgsql security definer set search_path = public as $$
begin
  insert into people(cpf, full_name, email, birth_date, phone, municipality, ibge_code, uf, category, role_gestao, role_cacs, institution, source)
  values (p_cpf, coalesce(public._txt(d, 'full_name'), ''), lower(public._txt(d, 'email')), (public._txt(d, 'birth_date'))::date,
          nullif(public._digits(d->>'phone'), ''), public._txt(d, 'municipality'), public._txt(d, 'ibge_code'), public._txt(d, 'uf'),
          public._txt(d, 'category'), public._txt(d, 'role_gestao'), public._txt(d, 'role_cacs'), public._txt(d, 'institution'), p_source)
  on conflict (cpf) do update set
    full_name    = coalesce(nullif(excluded.full_name, ''), people.full_name),
    email        = coalesce(excluded.email, people.email),
    birth_date   = coalesce(excluded.birth_date, people.birth_date),
    phone        = coalesce(excluded.phone, people.phone),
    municipality = coalesce(excluded.municipality, people.municipality),
    ibge_code    = coalesce(excluded.ibge_code, people.ibge_code),
    uf           = coalesce(excluded.uf, people.uf),
    category     = coalesce(excluded.category, people.category),
    role_gestao  = coalesce(excluded.role_gestao, people.role_gestao),
    role_cacs    = coalesce(excluded.role_cacs, people.role_cacs),
    institution  = coalesce(excluded.institution, people.institution)
  where p_trusted;
end $$;

-- Validações comuns dos dados pessoais; devolve o payload normalizado (com ibge e uf do município)
create or replace function public._check_person(f public.forms, d jsonb, p_need_birth boolean, p_need_municipality boolean)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare v_mun jsonb; v_phone text := public._digits(d->>'phone');
begin
  if public._txt(d, 'full_name') is null or length(public._txt(d, 'full_name')) < 3 then raise exception 'Informe o nome completo.'; end if;
  if coalesce(public._txt(d, 'email'), '') !~* '^[^\s@]+@[^\s@]+\.[^\s@]+$' then raise exception 'Informe um e-mail válido.'; end if;
  if length(v_phone) not in (10, 11) then raise exception 'Informe o telefone com DDD: (XX)XXXXX-XXXX.'; end if;
  if p_need_birth then
    if public._txt(d, 'birth_date') is null then raise exception 'Informe a data de nascimento.'; end if;
    if (public._txt(d, 'birth_date'))::date not between date '1900-01-01' and current_date - interval '14 years' then
      raise exception 'Data de nascimento inválida.';
    end if;
  end if;
  if p_need_municipality then
    select m.value into v_mun from jsonb_array_elements(coalesce(f.config->'municipalities', '[]'::jsonb)) as m(value)
    where lower(m.value->>'name') = lower(coalesce(public._txt(d, 'municipality'), '')) limit 1;
    if v_mun is null then raise exception 'Escolha um município da lista.'; end if;
    if coalesce(public._txt(d, 'category'), '') not in ('CACS-FUNDEB', 'Gestão municipal') then
      raise exception 'Informe se você faz parte do CACS-FUNDEB ou da Gestão municipal.';
    end if;
    if public._txt(d, 'category') = 'Gestão municipal' and public._txt(d, 'role_gestao') is null then
      raise exception 'Informe o cargo que você ocupa na gestão municipal.';
    end if;
    if public._txt(d, 'category') = 'CACS-FUNDEB' and public._txt(d, 'role_cacs') is null then
      raise exception 'Informe o cargo que você ocupa no CACS-FUNDEB.';
    end if;
    d := d || jsonb_build_object('municipality', v_mun->>'name', 'ibge_code', v_mun->>'ibge', 'uf', v_mun->>'uf');
  end if;
  return d;
end $$;

create or replace function public._audit_submission(f public.forms, p_cpf text, p_action text, p_details jsonb default '{}'::jsonb)
returns void language sql security definer set search_path = public as $$
  insert into audit_log(user_id, module_key, training_id, action, target, details)
  values (auth.uid(), f.module_key, f.training_id, p_action, '***.' || substr(p_cpf, 4, 3) || '.' || substr(p_cpf, 7, 3) || '-**',
          p_details || jsonb_build_object('form', f.id, 'session', f.session_key));
$$;

-- 3. Núcleo das submissões (usado pelo público e pela equipe; p_staff = inclusão manual pelo painel)
create or replace function public._submit_registration(f public.forms, d jsonb, p_staff boolean) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v_cpf text := public._digits(d->>'cpf');
  v_person people; v_prev registrations; v_trusted boolean; v_wait boolean := false; v_max int; v_row registrations;
begin
  if f.module_key <> 'inscricao' then raise exception 'Este link não é de inscrição.'; end if;
  if not public._cpf_valid(v_cpf) then raise exception 'CPF inválido.'; end if;
  if not p_staff then
    if public._form_state(f) <> 'aberto' then raise exception 'Este formulário não está recebendo inscrições.'; end if;
    if coalesce((d->>'consent')::boolean, false) is not true then raise exception 'É preciso autorizar o tratamento dos dados (LGPD).'; end if;
    if coalesce((d->>'truth_confirmed')::boolean, false) is not true then raise exception 'Confirme a veracidade dos dados.'; end if;
    if lower(coalesce(public._txt(d, 'email'), '')) <> lower(coalesce(public._txt(d, 'email_confirm'), '')) then
      raise exception 'Os e-mails informados não são iguais.';
    end if;
  end if;
  d := public._check_person(f, d, true, true);

  select * into v_person from people where cpf = v_cpf;
  v_trusted := p_staff or public._second_factor_ok(v_person, (public._txt(d, 'birth_date'))::date, public._txt(d, 'email'));

  select * into v_prev from registrations where training_id = f.training_id and cpf = v_cpf;
  if v_prev.id is not null and v_prev.status = 'valida' and not p_staff then
    if not (coalesce((f.config->>'allowEdit')::boolean, false) and v_trusted) then
      raise exception 'Você já se inscreveu nesta capacitação em %.', public._when(v_prev.submitted_at);
    end if;
  end if;

  v_max := nullif(f.config->>'maxPerMunicipalityPerCategory', '')::int;
  if v_max is not null then
    v_wait := (select count(*) from registrations r where r.training_id = f.training_id and r.status = 'valida'
               and r.cpf <> v_cpf and r.municipality = public._txt(d, 'municipality') and r.category = public._txt(d, 'category')) >= v_max;
  end if;

  perform public._save_person(v_cpf, d, v_trusted, case when p_staff then 'manual' else 'formulario' end);

  insert into registrations(form_id, training_id, cpf, email, full_name, birth_date, phone, municipality, ibge_code, category,
                            role_gestao, success_case, role_cacs, truth_confirmed, answers, status)
  values (f.id, f.training_id, v_cpf, lower(public._txt(d, 'email')), public._txt(d, 'full_name'), (public._txt(d, 'birth_date'))::date,
          public._digits(d->>'phone'), public._txt(d, 'municipality'), public._txt(d, 'ibge_code'), public._txt(d, 'category'),
          case when public._txt(d, 'category') = 'Gestão municipal' then public._txt(d, 'role_gestao') end,
          case when public._txt(d, 'category') = 'Gestão municipal' then public._txt(d, 'success_case') end,
          case when public._txt(d, 'category') = 'CACS-FUNDEB' then public._txt(d, 'role_cacs') end,
          p_staff or coalesce((d->>'truth_confirmed')::boolean, false),
          jsonb_strip_nulls(jsonb_build_object('waitlist', case when v_wait then true end,
                                               'consent_at', case when not p_staff then now() end,
                                               'manual', case when p_staff then true end,
                                               'registered_by', case when p_staff then auth.uid() end)),
          'valida')
  on conflict (training_id, cpf) do update set
    form_id = excluded.form_id, email = excluded.email, full_name = excluded.full_name, birth_date = excluded.birth_date,
    phone = excluded.phone, municipality = excluded.municipality, ibge_code = excluded.ibge_code, category = excluded.category,
    role_gestao = excluded.role_gestao, success_case = excluded.success_case, role_cacs = excluded.role_cacs,
    truth_confirmed = excluded.truth_confirmed, answers = registrations.answers || excluded.answers, status = 'valida'
  returning * into v_row;

  perform public._audit_submission(f, v_cpf, case when v_prev.id is null then 'submission.create' else 'submission.update' end,
                                   jsonb_build_object('waitlist', v_wait, 'manual', p_staff));
  return jsonb_build_object('protocolo', upper(left(replace(v_row.id::text, '-', ''), 8)),
                            'submitted_at', v_row.submitted_at, 'updated', v_prev.id is not null, 'waitlist', v_wait,
                            'full_name', v_row.full_name);
end $$;

create or replace function public._submit_attendance(f public.forms, d jsonb, p_staff boolean) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v_cpf text := public._digits(d->>'cpf');
  v_reg registrations; v_person people; v_prev attendance; v_row attendance; v_trusted boolean;
begin
  if f.module_key <> 'presenca' then raise exception 'Este link não é de lista de presença.'; end if;
  if not public._cpf_valid(v_cpf) then raise exception 'CPF inválido.'; end if;
  if not p_staff then
    if public._form_state(f) <> 'aberto' then raise exception 'A lista de presença desta sessão não está aberta.'; end if;
    if coalesce((d->>'consent')::boolean, false) is not true then raise exception 'É preciso autorizar o tratamento dos dados (LGPD).'; end if;
  end if;

  select * into v_prev from attendance where training_id = f.training_id and session_key = f.session_key and cpf = v_cpf;
  if v_prev.id is not null then
    return jsonb_build_object('already', true, 'submitted_at', v_prev.submitted_at, 'full_name', v_prev.full_name,
                              'message', 'Presença já registrada às ' || to_char(v_prev.submitted_at at time zone 'America/Sao_Paulo', 'HH24:MI') || '.');
  end if;

  select * into v_reg from registrations where training_id = f.training_id and cpf = v_cpf and status = 'valida';
  select * into v_person from people where cpf = v_cpf;

  if v_reg.id is not null then
    -- Inscrito: nome, telefone e e-mail vêm da tela (pré-preenchidos) ou, se faltarem, da inscrição
    d := jsonb_build_object('full_name', coalesce(public._txt(d, 'full_name'), v_reg.full_name),
                            'email', coalesce(public._txt(d, 'email'), v_reg.email),
                            'phone', coalesce(nullif(public._digits(d->>'phone'), ''), v_reg.phone),
                            'birth_date', public._txt(d, 'birth_date'), 'cpf', v_cpf);
    d := public._check_person(f, d, false, false);
    v_trusted := p_staff or public._second_factor_ok(v_person, (public._txt(d, 'birth_date'))::date, public._txt(d, 'email'));
  else
    -- Não inscrito: exige também o bloco "Inscrição" (os mesmos campos da seção 1 do formulário de inscrição)
    d := public._check_person(f, d, true, true);
    v_trusted := p_staff or public._second_factor_ok(v_person, (public._txt(d, 'birth_date'))::date, public._txt(d, 'email'));
  end if;

  perform public._save_person(v_cpf, d, v_trusted, case when p_staff then 'manual' else 'formulario' end);

  insert into attendance(form_id, training_id, session_key, cpf, full_name, phone, email, was_registered,
                         birth_date, phone2, municipality, ibge_code, category, role_gestao, success_case, role_cacs, answers)
  values (f.id, f.training_id, f.session_key, v_cpf, public._txt(d, 'full_name'), public._digits(d->>'phone'), lower(public._txt(d, 'email')),
          v_reg.id is not null,
          case when v_reg.id is null then (public._txt(d, 'birth_date'))::date end,
          case when v_reg.id is null then nullif(public._digits(coalesce(d->>'phone2', d->>'phone')), '') end,
          coalesce(v_reg.municipality, public._txt(d, 'municipality')), coalesce(v_reg.ibge_code, public._txt(d, 'ibge_code')),
          coalesce(v_reg.category, public._txt(d, 'category')),
          case when v_reg.id is null and public._txt(d, 'category') = 'Gestão municipal' then public._txt(d, 'role_gestao') end,
          case when v_reg.id is null and public._txt(d, 'category') = 'Gestão municipal' then public._txt(d, 'success_case') end,
          case when v_reg.id is null and public._txt(d, 'category') = 'CACS-FUNDEB' then public._txt(d, 'role_cacs') end,
          jsonb_strip_nulls(jsonb_build_object('consent_at', case when not p_staff then now() end,
                                               'manual', case when p_staff then true end,
                                               'registered_by', case when p_staff then auth.uid() end)))
  returning * into v_row;

  perform public._audit_submission(f, v_cpf, 'submission.create', jsonb_build_object('was_registered', v_row.was_registered, 'manual', p_staff));
  return jsonb_build_object('already', false, 'submitted_at', v_row.submitted_at, 'full_name', v_row.full_name,
                            'was_registered', v_row.was_registered,
                            'protocolo', upper(left(replace(v_row.id::text, '-', ''), 8)));
end $$;

create or replace function public._submit_evaluation(f public.forms, d jsonb, p_staff boolean) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v_cpf text := public._digits(d->>'cpf');
  v_person people; v_prev evaluations; v_row evaluations; v_trusted boolean;
  v_item jsonb; v_ratings jsonb := '{}'::jsonb; v_val int; v_heard text[];
begin
  if f.module_key <> 'avaliacao' then raise exception 'Este link não é de avaliação.'; end if;
  if not public._cpf_valid(v_cpf) then raise exception 'CPF inválido.'; end if;
  if not p_staff then
    if public._form_state(f) <> 'aberto' then raise exception 'Esta avaliação não está recebendo respostas.'; end if;
    if coalesce((d->>'consent')::boolean, false) is not true then raise exception 'É preciso autorizar o tratamento dos dados (LGPD).'; end if;
  end if;
  if coalesce((f.config->>'onlyForAttendees')::boolean, false) and not p_staff
     and not exists (select 1 from attendance a where a.training_id = f.training_id and a.cpf = v_cpf) then
    raise exception 'A avaliação é exclusiva para quem registrou presença nesta capacitação.';
  end if;
  d := public._check_person(f, d, false, true);

  -- Notas inteiras de 1 a 5 para todos os itens da config
  for v_item in select * from jsonb_array_elements(coalesce(f.config->'ratingItems', '[]'::jsonb)) loop
    begin
      v_val := (d->'ratings'->>(v_item->>'key'))::int;
    exception when others then v_val := null;
    end;
    if v_val is null or v_val not between 1 and 5 then
      raise exception 'Dê uma nota de 1 a 5 para "%".', v_item->>'label';
    end if;
    v_ratings := v_ratings || jsonb_build_object(v_item->>'key', v_val);
  end loop;
  if public._txt(d, 'liked') is null then raise exception 'Indique os aspectos de que você mais gostou.'; end if;
  if public._txt(d, 'improve') is null then raise exception 'Indique os aspectos que poderiam ser melhorados.'; end if;
  if public._txt(d, 'institution_name') is null then raise exception 'Mencione a instituição vinculada.'; end if;
  select array_agg(btrim(x)) into v_heard from jsonb_array_elements_text(coalesce(d->'heard_from', '[]'::jsonb)) x where btrim(x) <> '';
  if public._txt(d, 'heard_other') is not null then v_heard := coalesce(v_heard, '{}') || public._txt(d, 'heard_other'); end if;
  if coalesce(array_length(v_heard, 1), 0) = 0 then raise exception 'Informe como ficou sabendo da capacitação.'; end if;

  select * into v_person from people where cpf = v_cpf;
  v_trusted := p_staff or public._second_factor_ok(v_person, null, public._txt(d, 'email'));

  select * into v_prev from evaluations where training_id = f.training_id and cpf = v_cpf;
  if v_prev.id is not null and not p_staff and not (coalesce((f.config->>'allowEdit')::boolean, false) and v_trusted) then
    raise exception 'Você já respondeu esta avaliação em %.', public._when(v_prev.submitted_at);
  end if;

  perform public._save_person(v_cpf, d || jsonb_build_object('institution', public._txt(d, 'institution_name')), v_trusted,
                              case when p_staff then 'manual' else 'formulario' end);

  insert into evaluations(form_id, training_id, cpf, full_name, email, phone, municipality, ibge_code, category, ratings,
                          liked, improve, institution_type, institution_name, topics_suggestion, heard_from, comments, answers)
  values (f.id, f.training_id, v_cpf, public._txt(d, 'full_name'), lower(public._txt(d, 'email')), public._digits(d->>'phone'),
          public._txt(d, 'municipality'), public._txt(d, 'ibge_code'), public._txt(d, 'category'), v_ratings,
          public._txt(d, 'liked'), public._txt(d, 'improve'), public._txt(d, 'institution_type'), public._txt(d, 'institution_name'),
          public._txt(d, 'topics_suggestion'), v_heard, public._txt(d, 'comments'),
          jsonb_strip_nulls(jsonb_build_object('consent_at', case when not p_staff then now() end,
                                               'manual', case when p_staff then true end,
                                               'registered_by', case when p_staff then auth.uid() end)))
  on conflict (training_id, cpf) do update set
    form_id = excluded.form_id, full_name = excluded.full_name, email = excluded.email, phone = excluded.phone,
    municipality = excluded.municipality, ibge_code = excluded.ibge_code, category = excluded.category, ratings = excluded.ratings,
    liked = excluded.liked, improve = excluded.improve, institution_type = excluded.institution_type,
    institution_name = excluded.institution_name, topics_suggestion = excluded.topics_suggestion, heard_from = excluded.heard_from,
    comments = excluded.comments, answers = evaluations.answers || excluded.answers
  returning * into v_row;

  perform public._audit_submission(f, v_cpf, case when v_prev.id is null then 'submission.create' else 'submission.update' end,
                                   jsonb_build_object('manual', p_staff));
  return jsonb_build_object('protocolo', upper(left(replace(v_row.id::text, '-', ''), 8)),
                            'submitted_at', v_row.submitted_at, 'updated', v_prev.id is not null, 'full_name', v_row.full_name);
end $$;

-- 4. Funções públicas (anon)
create or replace function public.public_get_form(p_token text) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare f forms; t trainings;
begin
  f := public._form_by_token(p_token);
  select * into t from trainings where id = f.training_id;
  return jsonb_build_object(
    'module_key', f.module_key, 'session_key', f.session_key, 'state', public._form_state(f),
    'opens_at', f.opens_at, 'closes_at', f.closes_at,
    'config', f.config - 'internal',
    'training', jsonb_build_object(
      'number', t.number, 'polo', t.polo, 'uf', t.uf,
      'startDate', t.data->>'startDate', 'endDate', t.data->>'endDate', 'datesFormatted', t.data->>'datesFormatted',
      'locationVenue', t.data->>'locationVenue', 'locationAddress', t.data->>'locationAddress'));
end $$;

create or replace function public.public_lookup_cpf(p_token text, p_cpf text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare f forms; v_cpf text := public._digits(p_cpf); p people; v_at timestamptz; v_reg boolean;
begin
  f := public._form_by_token(p_token);
  if not public._cpf_valid(v_cpf) then raise exception 'CPF inválido.'; end if;
  perform public._rate_hit('lookup:' || f.public_token || ':' || v_cpf, 10);
  perform public._rate_hit('lookup-ip:' || f.public_token || ':' || public._client_ip(), 120);
  select * into p from people where cpf = v_cpf;
  v_at := case f.module_key
    when 'inscricao' then (select submitted_at from registrations where training_id = f.training_id and cpf = v_cpf and status = 'valida')
    when 'presenca'  then (select submitted_at from attendance where training_id = f.training_id and session_key = f.session_key and cpf = v_cpf)
    when 'avaliacao' then (select submitted_at from evaluations where training_id = f.training_id and cpf = v_cpf) end;
  v_reg := exists (select 1 from registrations where training_id = f.training_id and cpf = v_cpf and status = 'valida');
  return jsonb_build_object(
    'exists', p.cpf is not null,
    'masked_name', public._mask_name(p.full_name),
    'needs_birth_date', p.birth_date is not null,
    'needs_email', p.cpf is not null and p.birth_date is null and p.email is not null,
    'masked_email', case when p.birth_date is null then public._mask_email(p.email) end,
    'already_submitted', v_at is not null,
    'submitted_at', v_at,
    'submitted_when', case when v_at is not null then public._when(v_at) end,
    'has_registration', v_reg,
    'allow_edit', coalesce((f.config->>'allowEdit')::boolean, false));
end $$;

create or replace function public.public_unlock_profile(p_token text, p_cpf text, p_birth_date date default null, p_email text default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare f forms; v_cpf text := public._digits(p_cpf); p people; r registrations;
begin
  f := public._form_by_token(p_token);
  if not public._cpf_valid(v_cpf) then raise exception 'CPF inválido.'; end if;
  perform public._rate_hit('unlock:' || v_cpf, 3);
  select * into p from people where cpf = v_cpf;
  if p.cpf is null or (p.birth_date is null and p.email is null) or not public._second_factor_ok(p, p_birth_date, p_email) then
    raise exception 'Os dados não conferem. Confira e tente novamente ou preencha manualmente.';
  end if;
  select * into r from registrations where training_id = f.training_id and cpf = v_cpf and status = 'valida';
  return jsonb_build_object(
    'full_name', p.full_name, 'email', p.email, 'birth_date', p.birth_date, 'phone', p.phone,
    'municipality', coalesce(r.municipality, p.municipality), 'category', coalesce(r.category, p.category),
    'role_gestao', coalesce(r.role_gestao, p.role_gestao), 'role_cacs', coalesce(r.role_cacs, p.role_cacs),
    'institution', p.institution);
end $$;

create or replace function public.public_submit_registration(p_token text, p_payload jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
begin
  perform public._rate_hit('submit-ip:' || btrim(coalesce(p_token, '')) || ':' || public._client_ip(), 60);
  return public._submit_registration(public._form_by_token(p_token), coalesce(p_payload, '{}'::jsonb), false);
end $$;

create or replace function public.public_submit_attendance(p_token text, p_payload jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
begin
  perform public._rate_hit('submit-ip:' || btrim(coalesce(p_token, '')) || ':' || public._client_ip(), 120);
  return public._submit_attendance(public._form_by_token(p_token), coalesce(p_payload, '{}'::jsonb), false);
end $$;

create or replace function public.public_submit_evaluation(p_token text, p_payload jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
begin
  perform public._rate_hit('submit-ip:' || btrim(coalesce(p_token, '')) || ':' || public._client_ip(), 60);
  return public._submit_evaluation(public._form_by_token(p_token), coalesce(p_payload, '{}'::jsonb), false);
end $$;

-- 5. Funções da equipe (painel): inclusão manual e troca do link público
create or replace function public.staff_submit(p_form uuid, p_payload jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
declare f forms;
begin
  select * into f from forms where id = p_form;
  if f.id is null then raise exception 'Formulário não encontrado.'; end if;
  if not public.has_perm(f.module_key, 'edit', f.training_id) then raise exception 'Você não tem permissão para incluir respostas neste módulo.'; end if;
  return case f.module_key
    when 'inscricao' then public._submit_registration(f, coalesce(p_payload, '{}'::jsonb), true)
    when 'presenca'  then public._submit_attendance(f, coalesce(p_payload, '{}'::jsonb), true)
    else public._submit_evaluation(f, coalesce(p_payload, '{}'::jsonb), true) end;
end $$;

create or replace function public.staff_rotate_token(p_form uuid) returns text
language plpgsql security definer set search_path = public as $$
declare f forms; v_token text := encode(extensions.gen_random_bytes(12), 'hex');
begin
  select * into f from forms where id = p_form;
  if f.id is null then raise exception 'Formulário não encontrado.'; end if;
  if not public.has_perm(f.module_key, 'edit', f.training_id) then raise exception 'Você não tem permissão para trocar o link.'; end if;
  update forms set public_token = v_token where id = p_form;
  insert into audit_log(user_id, module_key, training_id, action, target)
  values (auth.uid(), f.module_key, f.training_id, 'form.token', f.id::text);
  return v_token;
end $$;

-- 6. Permissões de execução: anon só executa public_* e auth_setup_status
revoke execute on all functions in schema public from public, anon;
grant execute on all functions in schema public to authenticated;
revoke execute on function public.bootstrap_admin(text) from authenticated;
grant execute on function public.auth_setup_status() to anon;
grant execute on function public.public_get_form(text) to anon;
grant execute on function public.public_lookup_cpf(text, text) to anon;
grant execute on function public.public_unlock_profile(text, text, date, text) to anon;
grant execute on function public.public_submit_registration(text, jsonb) to anon;
grant execute on function public.public_submit_attendance(text, jsonb) to anon;
grant execute on function public.public_submit_evaluation(text, jsonb) to anon;
-- Funções criadas no futuro não ficam disponíveis para anon automaticamente
alter default privileges in schema public revoke execute on functions from anon;

notify pgrst, 'reload schema';

-- ============================================================================
-- Migração 0004b (supabase/migrations/0004b_perfil_e_ajustes.sql)
-- ============================================================================
-- 1. O próprio usuário altera o seu nome (nomes de outras pessoas continuam só com o superadministrador)
create or replace function public.update_my_name(p_full_name text) returns text
language plpgsql security definer set search_path = public as $$
declare v_name text := regexp_replace(btrim(coalesce(p_full_name, '')), '\s+', ' ', 'g');
begin
  if auth.uid() is null then raise exception 'Login necessário.'; end if;
  if length(v_name) < 3 then raise exception 'Informe o nome completo.'; end if;
  update profiles set full_name = v_name where user_id = auth.uid();
  insert into audit_log(user_id, action, target, details)
  values (auth.uid(), 'profile.name', auth.uid()::text, jsonb_build_object('full_name', v_name));
  return v_name;
end $$;
grant execute on function public.update_my_name(text) to authenticated;

-- 2. Foto do perfil: imagem pequena (160x160, JPEG) guardada como data URL; limite de 200 KB
alter table public.profiles add column if not exists avatar text;

create or replace function public.update_my_avatar(p_avatar text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'Login necessário.'; end if;
  if p_avatar is not null and (p_avatar !~ '^data:image/(jpeg|png|webp);base64,' or length(p_avatar) > 200000) then
    raise exception 'Foto inválida ou grande demais.';
  end if;
  update profiles set avatar = p_avatar where user_id = auth.uid();
  insert into audit_log(user_id, action, target, details)
  values (auth.uid(), 'profile.avatar', auth.uid()::text, jsonb_build_object('removed', p_avatar is null));
end $$;
grant execute on function public.update_my_avatar(text) to authenticated;

-- 3. Troca de e-mail: feita pelo Supabase Auth (confirmação por link). Quando confirmar, o perfil acompanha.
create or replace function public.handle_auth_user_email_change() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.email is distinct from old.email then
    update profiles set email = coalesce(new.email, '') where user_id = new.id;
    insert into audit_log(user_id, action, target, details)
    values (new.id, 'profile.email', new.id::text, jsonb_build_object('from', old.email, 'to', new.email));
  end if;
  return new;
end $$;
drop trigger if exists on_auth_user_email_changed on auth.users;
create trigger on_auth_user_email_changed after update of email on auth.users
  for each row execute function public.handle_auth_user_email_change();

-- 4. Limite de tentativas da data de nascimento: a tentativa errada precisa ficar registrada.
--    Antes, o erro desfazia a contagem (rollback) e o limite de 3 tentativas nunca era atingido.
--    Agora a resposta "não confere" volta como {ok:false}, sem erro, e a contagem permanece.
create or replace function public.public_unlock_profile(p_token text, p_cpf text, p_birth_date date default null, p_email text default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare f forms; v_cpf text := public._digits(p_cpf); p people; r registrations;
begin
  f := public._form_by_token(p_token);
  if not public._cpf_valid(v_cpf) then raise exception 'CPF inválido.'; end if;
  perform public._rate_hit('unlock:' || v_cpf, 3);
  select * into p from people where cpf = v_cpf;
  if p.cpf is null or (p.birth_date is null and p.email is null) or not public._second_factor_ok(p, p_birth_date, p_email) then
    return jsonb_build_object('ok', false, 'message', 'Os dados não conferem. Confira e tente novamente ou preencha manualmente.');
  end if;
  select * into r from registrations where training_id = f.training_id and cpf = v_cpf and status = 'valida';
  return jsonb_build_object(
    'ok', true,
    'full_name', p.full_name, 'email', p.email, 'birth_date', p.birth_date, 'phone', p.phone,
    'municipality', coalesce(r.municipality, p.municipality), 'category', coalesce(r.category, p.category),
    'role_gestao', coalesce(r.role_gestao, p.role_gestao), 'role_cacs', coalesce(r.role_cacs, p.role_cacs),
    'institution', p.institution);
end $$;
grant execute on function public.public_unlock_profile(text, text, date, text) to anon;

-- 5. Papel exibido como "Administrador Chefe" (a coluna continua is_superadmin)
create or replace function public.protect_last_admin() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if old.is_superadmin and (not new.is_admin or not new.is_active) then
    raise exception 'O Administrador Chefe não pode ser rebaixado nem desativado.';
  end if;
  if new.is_superadmin is distinct from old.is_superadmin and current_user in ('authenticated', 'anon') then
    raise exception 'O papel de Administrador Chefe só pode ser alterado no SQL Editor.';
  end if;
  if old.is_admin and old.is_active and (not new.is_admin or not new.is_active) then
    if not exists (select 1 from profiles where is_admin and is_active and user_id <> old.user_id) then
      raise exception 'Não é possível rebaixar ou desativar o último admin ativo.';
    end if;
  end if;
  return new;
end $$;

create or replace function public.admin_update_profile(p_user uuid, p_is_admin boolean default null,
                                                       p_is_active boolean default null, p_full_name text default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'Somente admins podem alterar usuários.'; end if;
  if p_full_name is not null and not public.is_superadmin() then
    raise exception 'Somente o Administrador Chefe pode alterar o nome de usuários.';
  end if;
  if p_full_name is not null and length(btrim(p_full_name)) = 0 then
    raise exception 'O nome não pode ficar vazio.';
  end if;
  update profiles set
    is_admin  = coalesce(p_is_admin, is_admin),
    is_active = coalesce(p_is_active, is_active),
    full_name = coalesce(regexp_replace(btrim(p_full_name), '\s+', ' ', 'g'), full_name)
  where user_id = p_user;
  insert into audit_log(user_id, action, target, details)
  values (auth.uid(), 'user.update', p_user::text,
          jsonb_strip_nulls(jsonb_build_object('is_admin', p_is_admin, 'is_active', p_is_active, 'full_name', p_full_name)));
end $$;
grant execute on function public.admin_update_profile(uuid, boolean, boolean, text) to authenticated;

create or replace function public.admin_delete_user(p_user uuid) returns void
language plpgsql security definer set search_path = public, auth as $$
declare v_email text; v_super boolean;
begin
  if not public.is_superadmin() then raise exception 'Somente o Administrador Chefe pode excluir usuários.'; end if;
  if p_user = auth.uid() then raise exception 'Você não pode excluir a sua própria conta.'; end if;
  select email, is_superadmin into v_email, v_super from public.profiles where user_id = p_user;
  if v_email is null then raise exception 'Usuário não encontrado.'; end if;
  if v_super then raise exception 'Não é possível excluir o Administrador Chefe.'; end if;
  insert into public.audit_log(user_id, action, target, details)
  values (auth.uid(), 'user.delete', p_user::text, jsonb_build_object('email', v_email));
  delete from auth.users where id = p_user;
end $$;
grant execute on function public.admin_delete_user(uuid) to authenticated;

notify pgrst, 'reload schema';

-- ============================================================================
-- Migração 0004c (supabase/migrations/0004c_avaliacao_notas.sql)
-- ============================================================================

-- Itens de nota da avaliação: os da config ou, se faltarem, os 7 itens padrão do Google Forms (seção 10.1)
create or replace function public._rating_items(p_config jsonb) returns jsonb
language sql immutable as $$
  select case when jsonb_typeof(p_config->'ratingItems') = 'array' and jsonb_array_length(p_config->'ratingItems') > 0
              then p_config->'ratingItems'
              else '[{"key":"inscricao","label":"Inscrição"},{"key":"divulgacao","label":"Divulgação"},
                     {"key":"data","label":"Data da Formação"},{"key":"horario","label":"Horário da Formação"},
                     {"key":"local","label":"Local da Formação"},{"key":"duracao","label":"Duração da Formação"},
                     {"key":"geral","label":"Como você avalia a Formação"}]'::jsonb end;
$$;
revoke execute on function public._rating_items(jsonb) from public, anon;

create or replace function public._submit_evaluation(f public.forms, d jsonb, p_staff boolean) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v_cpf text := public._digits(d->>'cpf');
  v_person people; v_prev evaluations; v_row evaluations; v_trusted boolean;
  v_item jsonb; v_ratings jsonb := '{}'::jsonb; v_val int; v_heard text[];
begin
  if f.module_key <> 'avaliacao' then raise exception 'Este link não é de avaliação.'; end if;
  if not public._cpf_valid(v_cpf) then raise exception 'CPF inválido.'; end if;
  if not p_staff then
    if public._form_state(f) <> 'aberto' then raise exception 'Esta avaliação não está recebendo respostas.'; end if;
    if coalesce((d->>'consent')::boolean, false) is not true then raise exception 'É preciso autorizar o tratamento dos dados (LGPD).'; end if;
  end if;
  if coalesce((f.config->>'onlyForAttendees')::boolean, false) and not p_staff
     and not exists (select 1 from attendance a where a.training_id = f.training_id and a.cpf = v_cpf) then
    raise exception 'A avaliação é exclusiva para quem registrou presença nesta capacitação.';
  end if;
  d := public._check_person(f, d, false, true);

  -- Notas inteiras de 1 a 5 para todos os itens da config
  for v_item in select * from jsonb_array_elements(public._rating_items(f.config)) loop
    begin
      v_val := (d->'ratings'->>(v_item->>'key'))::int;
    exception when others then v_val := null;
    end;
    if v_val is null or v_val not between 1 and 5 then
      raise exception 'Dê uma nota de 1 a 5 para "%".', v_item->>'label';
    end if;
    v_ratings := v_ratings || jsonb_build_object(v_item->>'key', v_val);
  end loop;
  if public._txt(d, 'liked') is null then raise exception 'Indique os aspectos de que você mais gostou.'; end if;
  if public._txt(d, 'improve') is null then raise exception 'Indique os aspectos que poderiam ser melhorados.'; end if;
  if public._txt(d, 'institution_name') is null then raise exception 'Mencione a instituição vinculada.'; end if;
  select array_agg(btrim(x)) into v_heard from jsonb_array_elements_text(coalesce(d->'heard_from', '[]'::jsonb)) x where btrim(x) <> '';
  if public._txt(d, 'heard_other') is not null then v_heard := coalesce(v_heard, '{}') || public._txt(d, 'heard_other'); end if;
  if coalesce(array_length(v_heard, 1), 0) = 0 then raise exception 'Informe como ficou sabendo da capacitação.'; end if;

  select * into v_person from people where cpf = v_cpf;
  v_trusted := p_staff or public._second_factor_ok(v_person, null, public._txt(d, 'email'));

  select * into v_prev from evaluations where training_id = f.training_id and cpf = v_cpf;
  if v_prev.id is not null and not p_staff and not (coalesce((f.config->>'allowEdit')::boolean, false) and v_trusted) then
    raise exception 'Você já respondeu esta avaliação em %.', public._when(v_prev.submitted_at);
  end if;

  perform public._save_person(v_cpf, d || jsonb_build_object('institution', public._txt(d, 'institution_name')), v_trusted,
                              case when p_staff then 'manual' else 'formulario' end);

  insert into evaluations(form_id, training_id, cpf, full_name, email, phone, municipality, ibge_code, category, ratings,
                          liked, improve, institution_type, institution_name, topics_suggestion, heard_from, comments, answers)
  values (f.id, f.training_id, v_cpf, public._txt(d, 'full_name'), lower(public._txt(d, 'email')), public._digits(d->>'phone'),
          public._txt(d, 'municipality'), public._txt(d, 'ibge_code'), public._txt(d, 'category'), v_ratings,
          public._txt(d, 'liked'), public._txt(d, 'improve'), public._txt(d, 'institution_type'), public._txt(d, 'institution_name'),
          public._txt(d, 'topics_suggestion'), v_heard, public._txt(d, 'comments'),
          jsonb_strip_nulls(jsonb_build_object('consent_at', case when not p_staff then now() end,
                                               'manual', case when p_staff then true end,
                                               'registered_by', case when p_staff then auth.uid() end)))
  on conflict (training_id, cpf) do update set
    form_id = excluded.form_id, full_name = excluded.full_name, email = excluded.email, phone = excluded.phone,
    municipality = excluded.municipality, ibge_code = excluded.ibge_code, category = excluded.category, ratings = excluded.ratings,
    liked = excluded.liked, improve = excluded.improve, institution_type = excluded.institution_type,
    institution_name = excluded.institution_name, topics_suggestion = excluded.topics_suggestion, heard_from = excluded.heard_from,
    comments = excluded.comments, answers = evaluations.answers || excluded.answers
  returning * into v_row;

  perform public._audit_submission(f, v_cpf, case when v_prev.id is null then 'submission.create' else 'submission.update' end,
                                   jsonb_build_object('manual', p_staff));
  return jsonb_build_object('protocolo', upper(left(replace(v_row.id::text, '-', ''), 8)),
                            'submitted_at', v_row.submitted_at, 'updated', v_prev.id is not null, 'full_name', v_row.full_name);
end $$;

revoke execute on function public._submit_evaluation(public.forms, jsonb, boolean) from public, anon;

notify pgrst, 'reload schema';

-- ============================================================================
-- Migração 0004d (supabase/migrations/0004d_presenca_unica.sql)
-- ============================================================================

create or replace function public._attendance_session(f public.forms) returns text
language sql stable as $$
  select case when f.session_key = 'unico' then to_char(now() at time zone 'America/Sao_Paulo', 'YYYY-MM-DD') else f.session_key end;
$$;
revoke execute on function public._attendance_session(public.forms) from public, anon;

create or replace function public._submit_attendance(f public.forms, d jsonb, p_staff boolean) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v_cpf text := public._digits(d->>'cpf');
  v_reg registrations; v_person people; v_prev attendance; v_row attendance; v_trusted boolean;
  v_session text := public._attendance_session(f);
begin
  if f.module_key <> 'presenca' then raise exception 'Este link não é de lista de presença.'; end if;
  if not public._cpf_valid(v_cpf) then raise exception 'CPF inválido.'; end if;
  if not p_staff then
    if public._form_state(f) <> 'aberto' then raise exception 'A lista de presença desta sessão não está aberta.'; end if;
    if coalesce((d->>'consent')::boolean, false) is not true then raise exception 'É preciso autorizar o tratamento dos dados (LGPD).'; end if;
  end if;

  select * into v_prev from attendance where training_id = f.training_id and session_key = v_session and cpf = v_cpf;
  if v_prev.id is not null then
    return jsonb_build_object('already', true, 'submitted_at', v_prev.submitted_at, 'full_name', v_prev.full_name,
                              'message', 'Presença já registrada às ' || to_char(v_prev.submitted_at at time zone 'America/Sao_Paulo', 'HH24:MI') || '.');
  end if;

  select * into v_reg from registrations where training_id = f.training_id and cpf = v_cpf and status = 'valida';
  select * into v_person from people where cpf = v_cpf;

  if v_reg.id is not null then
    -- Inscrito: nome, telefone e e-mail vêm da tela (pré-preenchidos) ou, se faltarem, da inscrição
    d := jsonb_build_object('full_name', coalesce(public._txt(d, 'full_name'), v_reg.full_name),
                            'email', coalesce(public._txt(d, 'email'), v_reg.email),
                            'phone', coalesce(nullif(public._digits(d->>'phone'), ''), v_reg.phone),
                            'birth_date', public._txt(d, 'birth_date'), 'cpf', v_cpf);
    d := public._check_person(f, d, false, false);
    v_trusted := p_staff or public._second_factor_ok(v_person, (public._txt(d, 'birth_date'))::date, public._txt(d, 'email'));
  else
    -- Não inscrito: exige também o bloco "Inscrição" (os mesmos campos da seção 1 do formulário de inscrição)
    d := public._check_person(f, d, true, true);
    v_trusted := p_staff or public._second_factor_ok(v_person, (public._txt(d, 'birth_date'))::date, public._txt(d, 'email'));
  end if;

  perform public._save_person(v_cpf, d, v_trusted, case when p_staff then 'manual' else 'formulario' end);

  insert into attendance(form_id, training_id, session_key, cpf, full_name, phone, email, was_registered,
                         birth_date, phone2, municipality, ibge_code, category, role_gestao, success_case, role_cacs, answers)
  values (f.id, f.training_id, v_session, v_cpf, public._txt(d, 'full_name'), public._digits(d->>'phone'), lower(public._txt(d, 'email')),
          v_reg.id is not null,
          case when v_reg.id is null then (public._txt(d, 'birth_date'))::date end,
          case when v_reg.id is null then nullif(public._digits(coalesce(d->>'phone2', d->>'phone')), '') end,
          coalesce(v_reg.municipality, public._txt(d, 'municipality')), coalesce(v_reg.ibge_code, public._txt(d, 'ibge_code')),
          coalesce(v_reg.category, public._txt(d, 'category')),
          case when v_reg.id is null and public._txt(d, 'category') = 'Gestão municipal' then public._txt(d, 'role_gestao') end,
          case when v_reg.id is null and public._txt(d, 'category') = 'Gestão municipal' then public._txt(d, 'success_case') end,
          case when v_reg.id is null and public._txt(d, 'category') = 'CACS-FUNDEB' then public._txt(d, 'role_cacs') end,
          jsonb_strip_nulls(jsonb_build_object('consent_at', case when not p_staff then now() end,
                                               'manual', case when p_staff then true end,
                                               'registered_by', case when p_staff then auth.uid() end)))
  returning * into v_row;

  perform public._audit_submission(f, v_cpf, 'submission.create', jsonb_build_object('was_registered', v_row.was_registered, 'manual', p_staff));
  return jsonb_build_object('already', false, 'submitted_at', v_row.submitted_at, 'full_name', v_row.full_name,
                            'was_registered', v_row.was_registered,
                            'protocolo', upper(left(replace(v_row.id::text, '-', ''), 8)));
end $$;

create or replace function public.public_lookup_cpf(p_token text, p_cpf text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare f forms; v_cpf text := public._digits(p_cpf); p people; v_at timestamptz; v_reg boolean;
begin
  f := public._form_by_token(p_token);
  if not public._cpf_valid(v_cpf) then raise exception 'CPF inválido.'; end if;
  perform public._rate_hit('lookup:' || f.public_token || ':' || v_cpf, 10);
  perform public._rate_hit('lookup-ip:' || f.public_token || ':' || public._client_ip(), 120);
  select * into p from people where cpf = v_cpf;
  v_at := case f.module_key
    when 'inscricao' then (select submitted_at from registrations where training_id = f.training_id and cpf = v_cpf and status = 'valida')
    when 'presenca'  then (select submitted_at from attendance where training_id = f.training_id and session_key = public._attendance_session(f) and cpf = v_cpf)
    when 'avaliacao' then (select submitted_at from evaluations where training_id = f.training_id and cpf = v_cpf) end;
  v_reg := exists (select 1 from registrations where training_id = f.training_id and cpf = v_cpf and status = 'valida');
  return jsonb_build_object(
    'exists', p.cpf is not null,
    'masked_name', public._mask_name(p.full_name),
    'needs_birth_date', p.birth_date is not null,
    'needs_email', p.cpf is not null and p.birth_date is null and p.email is not null,
    'masked_email', case when p.birth_date is null then public._mask_email(p.email) end,
    'already_submitted', v_at is not null,
    'submitted_at', v_at,
    'submitted_when', case when v_at is not null then public._when(v_at) end,
    'has_registration', v_reg,
    'allow_edit', coalesce((f.config->>'allowEdit')::boolean, false));
end $$;

revoke execute on function public._submit_attendance(public.forms, jsonb, boolean) from public, anon;
grant execute on function public.public_lookup_cpf(text, text) to anon;

notify pgrst, 'reload schema';

-- ============================================================================
-- Migração 0004e (supabase/migrations/0004e_email_gatilhos.sql)
-- ============================================================================

create extension if not exists pg_net with schema extensions;

-- Configurações simples do servidor (só leitura pelo próprio banco)
create table if not exists public.app_settings (
  key   text primary key,
  value text not null
);
alter table public.app_settings enable row level security;
revoke all on public.app_settings from anon, authenticated;

insert into public.app_settings(key, value)
values ('confirmation_function_url', 'https://tjvhbkhttxbjajcznfrp.supabase.co/functions/v1/enviar-confirmacao')
on conflict (key) do nothing;

create or replace function public._request_confirmation_email() returns trigger
language plpgsql security definer set search_path = public, extensions as $$
declare v_url text;
begin
  select value into v_url from app_settings where key = 'confirmation_function_url';
  if v_url is not null and v_url <> '' then
    begin
      perform net.http_post(
        url := v_url,
        body := jsonb_build_object('table', tg_table_name, 'record', jsonb_build_object('id', new.id)),
        headers := '{"Content-Type": "application/json"}'::jsonb,
        timeout_milliseconds := 10000
      );
    exception when others then
      -- Sem rede ou pg_net indisponível: não impede a gravação da resposta
      null;
    end;
  end if;
  return new;
end $$;
revoke execute on function public._request_confirmation_email() from public, anon, authenticated;

drop trigger if exists registrations_confirmation_email on public.registrations;
create trigger registrations_confirmation_email after insert on public.registrations
  for each row execute function public._request_confirmation_email();

drop trigger if exists attendance_confirmation_email on public.attendance;
create trigger attendance_confirmation_email after insert on public.attendance
  for each row execute function public._request_confirmation_email();

drop trigger if exists evaluations_confirmation_email on public.evaluations;
create trigger evaluations_confirmation_email after insert on public.evaluations
  for each row execute function public._request_confirmation_email();

notify pgrst, 'reload schema';

-- ============================================================================
-- Migração 0004f (supabase/migrations/0004f_regras_formularios.sql)
-- ============================================================================
insert into public.app_settings(key, value) values ('rate_limit_enabled', 'false')
on conflict (key) do nothing;

-- Libera quem estava bloqueado agora
delete from public.public_rate_limit;

create or replace function public._rate_hit(p_key text, p_limit int, p_window interval default interval '15 minutes')
returns void language plpgsql security definer set search_path = public as $$
declare v_hits int;
begin
  if coalesce((select value from app_settings where key = 'rate_limit_enabled'), 'false') <> 'true' then
    return;
  end if;
  insert into public_rate_limit(key, window_start, hits) values (md5(p_key), now(), 1)
  on conflict (key) do update set
    hits = case when public_rate_limit.window_start < now() - p_window then 1 else public_rate_limit.hits + 1 end,
    window_start = case when public_rate_limit.window_start < now() - p_window then now() else public_rate_limit.window_start end
  returning hits into v_hits;
  if v_hits > p_limit then
    raise exception 'Muitas tentativas. Aguarde 15 minutos e tente novamente.';
  end if;
end $$;
revoke execute on function public._rate_hit(text, int, interval) from public, anon;

create or replace function public._check_person(f public.forms, d jsonb, p_need_birth boolean, p_need_municipality boolean)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare v_mun jsonb; v_phone text := public._digits(d->>'phone');
begin
  if public._txt(d, 'full_name') is null or array_length(regexp_split_to_array(public._txt(d, 'full_name'), '\s+'), 1) < 2 then
    raise exception 'Informe o nome completo (nome e sobrenome).';
  end if;
  if coalesce(public._txt(d, 'email'), '') !~* '^[^\s@]+@[^\s@]+\.[^\s@]+$' then raise exception 'Informe um e-mail válido.'; end if;
  if length(v_phone) not in (10, 11) then raise exception 'Informe o telefone com DDD: (XX)XXXXX-XXXX.'; end if;
  if p_need_birth then
    if public._txt(d, 'birth_date') is null then raise exception 'Informe a data de nascimento.'; end if;
    if (public._txt(d, 'birth_date'))::date not between date '1920-01-01' and current_date - interval '14 years' then
      raise exception 'Data de nascimento inválida.';
    end if;
  end if;
  if p_need_municipality then
    select m.value into v_mun from jsonb_array_elements(coalesce(f.config->'municipalities', '[]'::jsonb)) as m(value)
    where lower(m.value->>'name') = lower(coalesce(public._txt(d, 'municipality'), '')) limit 1;
    if v_mun is null then raise exception 'Escolha um município da lista.'; end if;
    if coalesce(public._txt(d, 'category'), '') not in ('CACS-FUNDEB', 'Gestão municipal') then
      raise exception 'Informe se você faz parte do CACS-FUNDEB ou da Gestão municipal.';
    end if;
    if public._txt(d, 'category') = 'Gestão municipal' and public._txt(d, 'role_gestao') is null then
      raise exception 'Informe o cargo que você ocupa na gestão municipal.';
    end if;
    if public._txt(d, 'category') = 'CACS-FUNDEB' and public._txt(d, 'role_cacs') is null then
      raise exception 'Informe o cargo que você ocupa no CACS-FUNDEB.';
    end if;
    d := d || jsonb_build_object('municipality', v_mun->>'name', 'ibge_code', v_mun->>'ibge', 'uf', v_mun->>'uf');
  end if;
  return d;
end $$;

revoke execute on function public._check_person(public.forms, jsonb, boolean, boolean) from public, anon;

notify pgrst, 'reload schema';

-- ===== 0004g_lixeira.sql =====
-- CapacitaTE - Migração 0004g: lixeira de respostas (excluir e restaurar inscrições, presenças e avaliações)
-- Execute em: Supabase > SQL Editor > New query > colar este arquivo > Run. Depende da 0003 e da 0004.
-- Idempotente: pode ser executada de novo sem erro e sem perder dados.
--
-- Excluir: a resposta é copiada inteira para public.deleted_responses e removida da tabela original.
-- Restaurar: a cópia volta para a tabela original com o mesmo id e as mesmas datas, e sai da lixeira.
-- Só quem tem permissão de edição no módulo exclui e restaura; tudo vai para a auditoria.
-- Restaurar não reenvia o e-mail de confirmação (answers.email_sent_at volta junto com o registro).

create table if not exists public.deleted_responses (
  id          uuid primary key default gen_random_uuid(),
  table_name  text not null check (table_name in ('registrations', 'attendance', 'evaluations')),
  module_key  text not null,
  record_id   uuid not null,
  training_id text,
  record      jsonb not null,
  deleted_by  uuid,
  deleted_at  timestamptz not null default now()
);
create index if not exists deleted_responses_training_idx on public.deleted_responses (training_id, table_name);

alter table public.deleted_responses enable row level security;
revoke all on public.deleted_responses from anon, authenticated;
grant select on public.deleted_responses to authenticated;
drop policy if exists "deleted_responses_select" on public.deleted_responses;
create policy "deleted_responses_select" on public.deleted_responses for select to authenticated
  using (public.has_perm(module_key, 'view', training_id));

create or replace function public._response_module(p_table text) returns text
language sql immutable as $$
  select case p_table when 'registrations' then 'inscricao' when 'attendance' then 'presenca' when 'evaluations' then 'avaliacao' end;
$$;

-- Exclui uma resposta, guardando a cópia na lixeira
create or replace function public.staff_delete_response(p_table text, p_id uuid) returns uuid
language plpgsql security definer set search_path = public as $$
declare v_module text := public._response_module(p_table); v_row jsonb; v_training text; v_bin uuid;
begin
  if v_module is null then raise exception 'Tabela inválida.'; end if;
  execute format('select to_jsonb(t) from public.%I t where id = $1', p_table) into v_row using p_id;
  if v_row is null then raise exception 'Resposta não encontrada (talvez já tenha sido excluída).'; end if;
  v_training := v_row->>'training_id';
  if not public.has_perm(v_module, 'edit', v_training) then raise exception 'Você não tem permissão para excluir respostas deste módulo.'; end if;
  insert into deleted_responses(table_name, module_key, record_id, training_id, record, deleted_by)
  values (p_table, v_module, p_id, v_training, v_row, auth.uid())
  returning id into v_bin;
  execute format('delete from public.%I where id = $1', p_table) using p_id;
  insert into audit_log(user_id, module_key, training_id, action, target, details)
  values (auth.uid(), v_module, v_training, 'submission.delete',
          '***.' || substr(v_row->>'cpf', 4, 3) || '.' || substr(v_row->>'cpf', 7, 3) || '-**', jsonb_build_object('lixeira', v_bin));
  return v_bin;
end $$;

-- Restaura uma resposta da lixeira (mesmo id e mesmas datas)
create or replace function public.staff_restore_response(p_deleted uuid) returns uuid
language plpgsql security definer set search_path = public as $$
declare d deleted_responses; v_exists boolean;
begin
  select * into d from deleted_responses where id = p_deleted;
  if d.id is null then raise exception 'Item não encontrado na lixeira.'; end if;
  if not public.has_perm(d.module_key, 'edit', d.training_id) then raise exception 'Você não tem permissão para restaurar respostas deste módulo.'; end if;
  -- Uma resposta é única por CPF (inscrição/avaliação) ou por CPF e dia (presença)
  if d.table_name = 'attendance' then
    select exists (select 1 from attendance where training_id = d.training_id and cpf = d.record->>'cpf' and session_key = d.record->>'session_key') into v_exists;
  else
    execute format('select exists (select 1 from public.%I where training_id = $1 and cpf = $2)', d.table_name) into v_exists using d.training_id, d.record->>'cpf';
  end if;
  if v_exists then raise exception 'Já existe uma resposta ativa deste CPF. Exclua-a antes de restaurar esta.'; end if;
  if not exists (select 1 from forms where id = (d.record->>'form_id')::uuid) then
    raise exception 'O formulário desta resposta foi excluído; não é possível restaurar.';
  end if;
  execute format('insert into public.%I select * from jsonb_populate_record(null::public.%I, $1)', d.table_name, d.table_name) using d.record;
  delete from deleted_responses where id = p_deleted;
  insert into audit_log(user_id, module_key, training_id, action, target, details)
  values (auth.uid(), d.module_key, d.training_id, 'submission.restore',
          '***.' || substr(d.record->>'cpf', 4, 3) || '.' || substr(d.record->>'cpf', 7, 3) || '-**', jsonb_build_object('lixeira', p_deleted));
  return d.record_id;
end $$;

revoke execute on function public._response_module(text) from public, anon;
revoke execute on function public.staff_delete_response(text, uuid) from public, anon;
revoke execute on function public.staff_restore_response(uuid) from public, anon;
grant execute on function public.staff_delete_response(text, uuid) to authenticated;
grant execute on function public.staff_restore_response(uuid) to authenticated;

notify pgrst, 'reload schema';

-- ===== 0004h_lixeira_excluir_definitivo.sql =====
-- CapacitaTE - Migração 0004h: excluir permanentemente um item da lixeira (não pode ser desfeito)
-- Execute em: Supabase > SQL Editor > New query > colar > Run. Depende da 0004g. Idempotente.

create or replace function public.staff_purge_response(p_deleted uuid) returns void
language plpgsql security definer set search_path = public as $$
declare d deleted_responses;
begin
  select * into d from deleted_responses where id = p_deleted;
  if d.id is null then raise exception 'Item não encontrado na lixeira.'; end if;
  if not public.has_perm(d.module_key, 'edit', d.training_id) then raise exception 'Você não tem permissão para excluir definitivamente neste módulo.'; end if;
  delete from deleted_responses where id = p_deleted;
  insert into audit_log(user_id, module_key, training_id, action, target, details)
  values (auth.uid(), d.module_key, d.training_id, 'submission.purge',
          '***.' || substr(d.record->>'cpf', 4, 3) || '.' || substr(d.record->>'cpf', 7, 3) || '-**', jsonb_build_object('tabela', d.table_name));
end $$;

revoke execute on function public.staff_purge_response(uuid) from public, anon;
grant execute on function public.staff_purge_response(uuid) to authenticated;
notify pgrst, 'reload schema';

-- ===== 0004i_pessoas_importacao.sql =====
-- CapacitaTE - Migração 0004i: importação da base de pessoas e histórico por pessoa (Admin > Importar base / Pessoas)
-- Execute em: Supabase > SQL Editor > New query > colar > Run. Depende da 0003. Idempotente.

-- Importa pessoas em lote (o front envia no máximo 500 linhas por chamada).
-- p_policy: 'vazios' (preenche só campos vazios) ou 'sobrescrever' (o arquivo vale). Devolve contagens.
create or replace function public.admin_import_people(p_rows jsonb, p_policy text default 'vazios') returns jsonb
language plpgsql security definer set search_path = public as $$
declare r jsonb; v_cpf text; v_new int := 0; v_upd int := 0; v_same int := 0; v_bad int := 0; v_old people; v_n people;
begin
  if not (public.is_admin() or public.has_perm('pessoas', 'edit')) then raise exception 'Sem permissão para importar pessoas.'; end if;
  if p_policy not in ('vazios', 'sobrescrever') then raise exception 'Política inválida.'; end if;
  if jsonb_typeof(p_rows) <> 'array' or jsonb_array_length(p_rows) > 500 then raise exception 'Envie no máximo 500 linhas por vez.'; end if;
  for r in select * from jsonb_array_elements(p_rows) loop
    v_cpf := regexp_replace(coalesce(r->>'cpf', ''), '\D', '', 'g');
    if v_cpf !~ '^[0-9]{11}$' or coalesce(trim(r->>'full_name'), '') = '' then v_bad := v_bad + 1; continue; end if;
    select * into v_old from people where cpf = v_cpf;
    if v_old.cpf is null then
      insert into people(cpf, full_name, email, birth_date, phone, municipality, uf, category, role_gestao, role_cacs, institution, source)
      values (v_cpf, trim(r->>'full_name'), nullif(trim(r->>'email'), ''), nullif(r->>'birth_date', '')::date,
              nullif(regexp_replace(coalesce(r->>'phone', ''), '\D', '', 'g'), ''), nullif(trim(r->>'municipality'), ''), nullif(upper(trim(r->>'uf')), ''),
              case when r->>'category' in ('CACS-FUNDEB', 'Gestão municipal') then r->>'category' end,
              nullif(trim(r->>'role_gestao'), ''), nullif(trim(r->>'role_cacs'), ''), nullif(trim(r->>'institution'), ''), 'importacao');
      v_new := v_new + 1;
    else
      v_n := v_old;
      if p_policy = 'sobrescrever' then
        v_n.full_name := coalesce(nullif(trim(r->>'full_name'), ''), v_old.full_name);
        v_n.email := coalesce(nullif(trim(r->>'email'), ''), v_old.email);
        v_n.birth_date := coalesce(nullif(r->>'birth_date', '')::date, v_old.birth_date);
        v_n.phone := coalesce(nullif(regexp_replace(coalesce(r->>'phone', ''), '\D', '', 'g'), ''), v_old.phone);
        v_n.municipality := coalesce(nullif(trim(r->>'municipality'), ''), v_old.municipality);
        v_n.uf := coalesce(nullif(upper(trim(r->>'uf')), ''), v_old.uf);
        v_n.category := coalesce(case when r->>'category' in ('CACS-FUNDEB', 'Gestão municipal') then r->>'category' end, v_old.category);
        v_n.role_gestao := coalesce(nullif(trim(r->>'role_gestao'), ''), v_old.role_gestao);
        v_n.role_cacs := coalesce(nullif(trim(r->>'role_cacs'), ''), v_old.role_cacs);
      else
        v_n.email := coalesce(v_old.email, nullif(trim(r->>'email'), ''));
        v_n.birth_date := coalesce(v_old.birth_date, nullif(r->>'birth_date', '')::date);
        v_n.phone := coalesce(v_old.phone, nullif(regexp_replace(coalesce(r->>'phone', ''), '\D', '', 'g'), ''));
        v_n.municipality := coalesce(v_old.municipality, nullif(trim(r->>'municipality'), ''));
        v_n.uf := coalesce(v_old.uf, nullif(upper(trim(r->>'uf')), ''));
        v_n.category := coalesce(v_old.category, case when r->>'category' in ('CACS-FUNDEB', 'Gestão municipal') then r->>'category' end);
        v_n.role_gestao := coalesce(v_old.role_gestao, nullif(trim(r->>'role_gestao'), ''));
        v_n.role_cacs := coalesce(v_old.role_cacs, nullif(trim(r->>'role_cacs'), ''));
      end if;
      if to_jsonb(v_n) = to_jsonb(v_old) then v_same := v_same + 1;
      else
        update people set full_name = v_n.full_name, email = v_n.email, birth_date = v_n.birth_date, phone = v_n.phone, municipality = v_n.municipality,
          uf = v_n.uf, category = v_n.category, role_gestao = v_n.role_gestao, role_cacs = v_n.role_cacs, updated_at = now() where cpf = v_cpf;
        v_upd := v_upd + 1;
      end if;
    end if;
  end loop;
  insert into audit_log(user_id, module_key, action, details)
  values (auth.uid(), 'admin', 'people.import', jsonb_build_object('novos', v_new, 'atualizados', v_upd, 'iguais', v_same, 'invalidos', v_bad, 'politica', p_policy));
  return jsonb_build_object('novos', v_new, 'atualizados', v_upd, 'iguais', v_same, 'invalidos', v_bad);
end $$;

-- Histórico de uma pessoa: capacitações em que se inscreveu, esteve presente e avaliou
create or replace function public.staff_person_history(p_cpf text) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare v_cpf text := regexp_replace(coalesce(p_cpf, ''), '\D', '', 'g');
begin
  if not public.can_view_people() then raise exception 'Sem permissão.'; end if;
  return jsonb_build_object(
    'inscricoes', coalesce((select jsonb_agg(jsonb_build_object('training_id', training_id, 'em', submitted_at, 'status', status) order by submitted_at) from registrations where cpf = v_cpf), '[]'::jsonb),
    'presencas',  coalesce((select jsonb_agg(jsonb_build_object('training_id', training_id, 'dia', session_key, 'em', submitted_at) order by submitted_at) from attendance where cpf = v_cpf), '[]'::jsonb),
    'avaliacoes', coalesce((select jsonb_agg(jsonb_build_object('training_id', training_id, 'em', submitted_at) order by submitted_at) from evaluations where cpf = v_cpf), '[]'::jsonb));
end $$;

revoke execute on function public.admin_import_people(jsonb, text) from public, anon;
revoke execute on function public.staff_person_history(text) from public, anon;
grant execute on function public.admin_import_people(jsonb, text) to authenticated;
grant execute on function public.staff_person_history(text) to authenticated;
notify pgrst, 'reload schema';

-- ===== 0004j_importar_respostas.sql =====
-- CapacitaTE - Migração 0004j: importar respostas históricas (Admin > Importar base > "Importar também como respostas")
-- Execute em: Supabase > SQL Editor > New query > colar > Run. Depende da 0003 e da 0004i. Idempotente.
--
-- Grava inscrições, presenças ou avaliações de capacitações antigas a partir das planilhas do Google Forms, mantendo o
-- carimbo de data/hora original. Quem já tem resposta (mesmo CPF, ou CPF e dia na presença) é contado como "repetida" e
-- não é alterado. A pessoa entra em people (só preenche campos vazios). Não envia e-mail de confirmação.
-- Exige is_admin() ou edição no módulo da capacitação. Máximo de 500 linhas por chamada.

create or replace function public.admin_import_responses(p_form uuid, p_rows jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  f forms; r jsonb; v_cpf text; v_at timestamptz; v_ok int := 0; v_dup int := 0; v_bad int := 0; v_rows int;
  v_name text; v_day text; v_reg boolean;
begin
  select * into f from forms where id = p_form;
  if f.id is null then raise exception 'Formulário não encontrado.'; end if;
  if not (public.is_admin() or public.has_perm(f.module_key, 'edit', f.training_id)) then raise exception 'Sem permissão para importar respostas deste módulo.'; end if;
  if jsonb_typeof(p_rows) <> 'array' or jsonb_array_length(p_rows) > 500 then raise exception 'Envie no máximo 500 linhas por vez.'; end if;

  for r in select * from jsonb_array_elements(p_rows) loop
    v_cpf := regexp_replace(coalesce(r->>'cpf', ''), '\D', '', 'g');
    v_name := trim(coalesce(r->>'full_name', ''));
    if v_cpf !~ '^[0-9]{11}$' or v_name = '' then v_bad := v_bad + 1; continue; end if;
    v_at := coalesce(nullif(r->>'submitted_at', '')::timestamptz, now());

    insert into people(cpf, full_name, email, birth_date, phone, municipality, category, role_gestao, role_cacs, source)
    values (v_cpf, v_name, nullif(trim(r->>'email'), ''), nullif(r->>'birth_date', '')::date,
            nullif(regexp_replace(coalesce(r->>'phone', ''), '\D', '', 'g'), ''), nullif(trim(r->>'municipality'), ''),
            case when r->>'category' in ('CACS-FUNDEB', 'Gestão municipal') then r->>'category' end,
            nullif(trim(r->>'role_gestao'), ''), nullif(trim(r->>'role_cacs'), ''), 'importacao')
    on conflict (cpf) do update set
      email = coalesce(people.email, excluded.email), birth_date = coalesce(people.birth_date, excluded.birth_date),
      phone = coalesce(people.phone, excluded.phone), municipality = coalesce(people.municipality, excluded.municipality),
      category = coalesce(people.category, excluded.category), role_gestao = coalesce(people.role_gestao, excluded.role_gestao),
      role_cacs = coalesce(people.role_cacs, excluded.role_cacs);

    if f.module_key = 'inscricao' then
      insert into registrations(form_id, training_id, cpf, submitted_at, email, full_name, birth_date, phone, municipality, category,
                                role_gestao, success_case, role_cacs, truth_confirmed, answers)
      values (f.id, f.training_id, v_cpf, v_at, nullif(trim(r->>'email'), ''), v_name, nullif(r->>'birth_date', '')::date,
              nullif(regexp_replace(coalesce(r->>'phone', ''), '\D', '', 'g'), ''), nullif(trim(r->>'municipality'), ''),
              case when r->>'category' in ('CACS-FUNDEB', 'Gestão municipal') then r->>'category' end,
              nullif(trim(r->>'role_gestao'), ''), nullif(trim(r->>'success_case'), ''), nullif(trim(r->>'role_cacs'), ''), true,
              jsonb_build_object('importado', true, 'email_sent_at', now()))
      on conflict (training_id, cpf) do nothing;
    elsif f.module_key = 'presenca' then
      v_day := coalesce(nullif(r->>'session_key', ''), to_char(v_at at time zone 'America/Sao_Paulo', 'YYYY-MM-DD'));
      select exists (select 1 from registrations where training_id = f.training_id and cpf = v_cpf and status = 'valida') into v_reg;
      insert into attendance(form_id, training_id, session_key, cpf, submitted_at, full_name, phone, email, was_registered, birth_date,
                             municipality, category, role_gestao, success_case, role_cacs, answers)
      values (f.id, f.training_id, v_day, v_cpf, v_at, v_name, nullif(regexp_replace(coalesce(r->>'phone', ''), '\D', '', 'g'), ''),
              nullif(trim(r->>'email'), ''), v_reg, nullif(r->>'birth_date', '')::date, nullif(trim(r->>'municipality'), ''),
              case when r->>'category' in ('CACS-FUNDEB', 'Gestão municipal') then r->>'category' end,
              nullif(trim(r->>'role_gestao'), ''), nullif(trim(r->>'success_case'), ''), nullif(trim(r->>'role_cacs'), ''),
              jsonb_build_object('importado', true, 'email_sent_at', now()))
      on conflict (training_id, session_key, cpf) do nothing;
    else
      insert into evaluations(form_id, training_id, cpf, submitted_at, full_name, email, phone, municipality, category, ratings, liked, improve,
                              institution_type, institution_name, topics_suggestion, heard_from, comments, answers)
      values (f.id, f.training_id, v_cpf, v_at, v_name, nullif(trim(r->>'email'), ''),
              nullif(regexp_replace(coalesce(r->>'phone', ''), '\D', '', 'g'), ''), nullif(trim(r->>'municipality'), ''),
              case when r->>'category' in ('CACS-FUNDEB', 'Gestão municipal') then r->>'category' end,
              coalesce(r->'ratings', '{}'::jsonb), nullif(r->>'liked', ''), nullif(r->>'improve', ''), nullif(r->>'institution_type', ''),
              nullif(r->>'institution_name', ''), nullif(r->>'topics_suggestion', ''),
              case when nullif(r->>'heard_from', '') is null then null else string_to_array(r->>'heard_from', ', ') end,
              nullif(r->>'comments', ''), jsonb_build_object('importado', true, 'email_sent_at', now()))
      on conflict (training_id, cpf) do nothing;
    end if;
    get diagnostics v_rows = row_count;
    if v_rows > 0 then v_ok := v_ok + 1; else v_dup := v_dup + 1; end if;
  end loop;

  insert into audit_log(user_id, module_key, training_id, action, details)
  values (auth.uid(), f.module_key, f.training_id, 'responses.import', jsonb_build_object('gravadas', v_ok, 'repetidas', v_dup, 'invalidas', v_bad));
  return jsonb_build_object('gravadas', v_ok, 'repetidas', v_dup, 'invalidas', v_bad);
end $$;

revoke execute on function public.admin_import_responses(uuid, jsonb) from public, anon;
grant execute on function public.admin_import_responses(uuid, jsonb) to authenticated;
notify pgrst, 'reload schema';

-- ===== 0006_limite_90s.sql =====
-- CapacitaTE - Migração 0006: limite de tentativas dos formulários públicos com bloqueio de 90 segundos
-- A mensagem traz os segundos restantes ("Aguarde 73 segundos"), que a página pública usa no contador regressivo.
-- Execute em: Supabase > SQL Editor > New query > colar > Run. Idempotente.

create or replace function public._rate_hit(p_key text, p_limit int, p_window interval default interval '90 seconds')
returns void language plpgsql security definer set search_path = public as $$
declare v_hits int; v_start timestamptz; v_wait int;
begin
  if coalesce((select value from app_settings where key = 'rate_limit_enabled'), 'false') <> 'true' then
    return;
  end if;
  insert into public_rate_limit(key, window_start, hits) values (md5(p_key), now(), 1)
  on conflict (key) do update set
    hits = case when public_rate_limit.window_start < now() - p_window then 1 else public_rate_limit.hits + 1 end,
    window_start = case when public_rate_limit.window_start < now() - p_window then now() else public_rate_limit.window_start end
  returning hits, window_start into v_hits, v_start;
  if v_hits > p_limit then
    v_wait := greatest(1, ceil(extract(epoch from (v_start + p_window - now())))::int);
    raise exception 'Muitas tentativas. Aguarde % segundos e tente novamente.', v_wait;
  end if;
end $$;
revoke execute on function public._rate_hit(text, int, interval) from public, anon;

-- Limite ligado
insert into public.app_settings(key, value) values ('rate_limit_enabled', 'true')
on conflict (key) do update set value = 'true';

notify pgrst, 'reload schema';
