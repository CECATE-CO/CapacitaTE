/**
 * CapacitaTE - CPF: validar, normalizar, formatar e mascarar (compartilhado com as páginas públicas)
 * Versão: v.4.4.0
 */

(function (root) {
  /**
   * Mantém só os dígitos (aceita número, texto com ou sem máscara)
   */
  function normalize(value) {
    return String(value == null ? '' : value).replace(/\D/g, '');
  }

  /**
   * Valida os dígitos verificadores. Rejeita tamanho diferente de 11 e todos os dígitos iguais.
   */
  function isValid(value) {
    const cpf = normalize(value);
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    for (let t = 9; t <= 10; t++) {
      let sum = 0;
      for (let i = 0; i < t; i++) sum += Number(cpf[i]) * (t + 1 - i);
      const digit = (sum * 10) % 11 % 10;
      if (digit !== Number(cpf[t])) return false;
    }
    return true;
  }

  /**
   * Formata como 000.000.000-00. Planilhas antigas guardam o CPF como número e perdem os zeros à esquerda:
   * entradas com 9 ou 10 dígitos são completadas. Fora disso, devolve o texto original.
   */
  function format(value) {
    let cpf = normalize(value);
    if (cpf.length >= 9 && cpf.length < 11) cpf = cpf.padStart(11, '0');
    if (cpf.length !== 11) return String(value == null ? '' : value).trim();
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
  }

  /**
   * Máscara para listas: ***.456.789-** (mostra só os dígitos do meio)
   */
  function mask(value) {
    const cpf = normalize(value);
    if (cpf.length !== 11) return '';
    return `***.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-**`;
  }

  /**
   * Máscara progressiva para o campo de digitação (000.000.000-00)
   */
  function inputMask(value) {
    const d = normalize(value).slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
    if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  }

  const api = { normalize, isValid, format, mask, inputMask };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) {
    root.CapacitaTE = root.CapacitaTE || {};
    root.CapacitaTE.cpf = api;
  }
})(typeof window !== 'undefined' ? window : null);
