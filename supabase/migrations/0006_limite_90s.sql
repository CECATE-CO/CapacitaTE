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
