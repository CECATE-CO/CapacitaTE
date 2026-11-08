/**
 * CapacitaTE - Configuração do Núcleo (endereço e chave pública da nuvem, URL pública)
 * Versão: v.4.4.4
 */

window.CapacitaTE = window.CapacitaTE || {};

// Configuração da nuvem. Prioridade: endereço e chave salvos neste navegador (tela Configurações),
// js/env.local.js (gerado a partir do .env por atualizar-env.bat), o próprio .env (app aberto por um servidor
// local) e, por último, os valores abaixo. A chave nunca precisa ir para o código publicado.
const SUPABASE_CONFIG = {
  url: 'https://capacitate.transportesufg.eng.br',
  anonKey: 'sb_publishable_JNBDt68n9SQ-YnIdcDY9MR_Nsz9bkol'
};

/**
 * Lê KEY=VALOR de um texto no formato .env (ignora linhas vazias e comentários)
 */
function parseEnvText(text) {
  const env = {};
  String(text || '').split(/\r?\n/).forEach(line => {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m || line.trim().startsWith('#')) return;
    env[m[1]] = m[2].replace(/^['"]|['"]$/g, '').trim();
  });
  return env;
}

/**
 * Aplica SUPABASE_URL e SUPABASE_ANON_KEY do .env (via js/env.local.js ou leitura direta do .env)
 */
const CLOUD_STORAGE_KEYS = { url: 'autoreport_supabase_url', key: 'autoreport_supabase_key' }; // chave legada mantida para compatibilidade

function getSavedCloudConfig() {
  try {
    const url = localStorage.getItem(CLOUD_STORAGE_KEYS.url);
    const key = localStorage.getItem(CLOUD_STORAGE_KEYS.key);
    return url && key ? { SUPABASE_URL: url, SUPABASE_ANON_KEY: key } : null;
  } catch (e) {
    return null;
  }
}

async function loadSupabaseEnv() {
  const saved = getSavedCloudConfig();
  if (saved) {
    SUPABASE_CONFIG.url = saved.SUPABASE_URL.replace(/\/+$/, '');
    SUPABASE_CONFIG.anonKey = saved.SUPABASE_ANON_KEY;
    SUPABASE_CONFIG.source = 'navegador';
    return;
  }
  let env = (typeof window !== 'undefined' && window.APP_ENV) || null;
  if (!env && typeof location !== 'undefined' && /^https?:$/.test(location.protocol)) {
    try {
      const res = await fetch('.env', { cache: 'no-store' });
      if (res.ok) env = parseEnvText(await res.text());
    } catch (e) { /* sem .env acessível: mantém a configuração padrão */ }
  }
  if (env && env.SUPABASE_URL && env.SUPABASE_ANON_KEY) {
    SUPABASE_CONFIG.url = env.SUPABASE_URL.replace(/\/+$/, '');
    SUPABASE_CONFIG.anonKey = env.SUPABASE_ANON_KEY;
    SUPABASE_CONFIG.source = '.env';
  }
}

/**
 * URL base das páginas públicas (formulários com QR Code). Prioridade: valor salvo neste navegador,
 * PUBLIC_BASE_URL do .env (js/env.local.js), o próprio endereço do site quando publicado (Vercel, GitHub Pages)
 * e, por último, o endereço do GitHub Pages (app aberto do computador).
 */
const PUBLIC_BASE_URL_KEY = 'capacitate_public_base_url';
const DEFAULT_PUBLIC_BASE_URL = 'https://mathmorato.github.io/CapacitaTE/';

function getPublicBaseUrl() {
  let saved = '';
  try { saved = localStorage.getItem(PUBLIC_BASE_URL_KEY) || ''; } catch (e) { /* armazenamento indisponível */ }
  const env = (typeof window !== 'undefined' && window.APP_ENV) || {};
  return (saved || env.PUBLIC_BASE_URL || getHostedBaseUrl() || DEFAULT_PUBLIC_BASE_URL).trim().replace(/\/+$/, '');
}

// Endereço do site publicado (pasta do index.html); vazio quando aberto do computador (file://, localhost)
function getHostedBaseUrl() {
  if (typeof location === 'undefined' || location.protocol !== 'https:') return '';
  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return '';
  return location.origin + location.pathname.replace(/[^/]*$/, '');
}

CapacitaTE.config = {
  supabase: SUPABASE_CONFIG,
  storageKeys: CLOUD_STORAGE_KEYS,
  parseEnvText,
  getSavedCloudConfig,
  loadSupabaseEnv,
  getPublicBaseUrl
};
