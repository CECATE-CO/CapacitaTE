/**
 * CapacitaTE - Formatos Compartilhados (telefone, data e data/hora no padrão Google Forms)
 * Versão: v.4.4.4
 */

(function (root) {
  const TIME_ZONE = 'America/Sao_Paulo';
  const pad = (n) => String(n).padStart(2, '0');

  /**
   * Telefone no padrão das planilhas: (DD)XXXXX-XXXX ou (DD)XXXX-XXXX, sem espaço depois do parêntese.
   * Remove o código do país (55) quando presente. Fora do padrão, devolve o texto original.
   */
  function formatPhone(value) {
    let d = String(value == null ? '' : value).replace(/\D/g, '');
    if ((d.length === 12 || d.length === 13) && d.startsWith('55')) d = d.slice(2);
    if (d.length === 11) return `(${d.slice(0, 2)})${d.slice(2, 7)}-${d.slice(7)}`;
    if (d.length === 10) return `(${d.slice(0, 2)})${d.slice(2, 6)}-${d.slice(6)}`;
    return String(value == null ? '' : value).trim();
  }

  /**
   * Partes de data/hora de um instante no fuso de Brasília (independe do fuso do computador)
   */
  function zonedParts(date) {
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return null;
    const parts = {};
    new Intl.DateTimeFormat('en-GB', {
      timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
    }).formatToParts(d).forEach(p => { parts[p.type] = p.value; });
    return parts;
  }

  /**
   * Data dd/mm/yyyy. Aceita Date, timestamp ou texto ISO "yyyy-mm-dd" (data pura, sem conversão de fuso).
   */
  function formatDate(value) {
    if (value == null || value === '') return '';
    const iso = typeof value === 'string' && value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (iso) return `${iso[3]}/${iso[2]}/${iso[1]}`;
    const p = zonedParts(value);
    return p ? `${p.day}/${p.month}/${p.year}` : '';
  }

  /**
   * Carimbo de data/hora do Google Forms: dd/mm/yyyy hh:mm:ss no fuso America/Sao_Paulo
   */
  function formatDateTime(value) {
    if (value == null || value === '') return '';
    const p = zonedParts(value);
    return p ? `${p.day}/${p.month}/${p.year} ${p.hour}:${p.minute}:${p.second}` : '';
  }

  /**
   * Lê dd/mm/yyyy (com ou sem hora) e devolve a data ISO yyyy-mm-dd, ou '' se for inválida
   */
  function parseBrDate(text) {
    const m = String(text || '').trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (!m) return '';
    const [day, month, year] = [Number(m[1]), Number(m[2]), Number(m[3])];
    const d = new Date(Date.UTC(year, month - 1, day));
    if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) return '';
    return `${year}-${pad(month)}-${pad(day)}`;
  }

  const api = { TIME_ZONE, formatPhone, formatDate, formatDateTime, parseBrDate };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) {
    root.CapacitaTE = root.CapacitaTE || {};
    root.CapacitaTE.formats = api;
  }
})(typeof window !== 'undefined' ? window : null);
