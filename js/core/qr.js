/**
 * CapacitaTE - QR Code (SVG na tela, PNG 1024x1024, SVG para baixar e cartaz A4 para imprimir)
 * Usa a biblioteca local js/vendor/qrcode.min.js (qrcode-generator 1.4.4, MIT), correção de erro nível M.
 * Versão: v.4.4.4
 */

window.CapacitaTE = window.CapacitaTE || {};

(function () {
  const MARGIN = 4; // margem de 4 módulos (zona de silêncio)

  function build(text) {
    if (typeof window.qrcode !== 'function') throw new Error('Biblioteca de QR Code não carregada (js/vendor/qrcode.min.js).');
    const qr = window.qrcode(0, 'M');
    qr.addData(text);
    qr.make();
    return qr;
  }

  /**
   * SVG escalável (preto sobre branco, como o leitor do celular espera, em qualquer tema)
   */
  function svg(text, { title = 'QR Code' } = {}) {
    const qr = build(text);
    const n = qr.getModuleCount();
    const size = n + MARGIN * 2;
    let path = '';
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (qr.isDark(r, c)) path += `M${c + MARGIN} ${r + MARGIN}h1v1h-1z`;
      }
    }
    const safeTitle = String(title).replace(/[<>&"]/g, '');
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" role="img" aria-label="${safeTitle}"><title>${safeTitle}</title><rect width="100%" height="100%" fill="#ffffff"/><path d="${path}" fill="#000000"/></svg>`;
  }

  /**
   * PNG quadrado (padrão 1024 px) como data URL
   */
  function pngDataUrl(text, px = 1024) {
    const qr = build(text);
    const n = qr.getModuleCount();
    const cell = Math.floor(px / (n + MARGIN * 2));
    const offset = Math.floor((px - cell * n) / 2);
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = px;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, px, px);
    ctx.fillStyle = '#000000';
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (qr.isDark(r, c)) ctx.fillRect(offset + c * cell, offset + r * cell, cell, cell);
      }
    }
    return canvas.toDataURL('image/png');
  }

  function download(href, filename) {
    const a = document.createElement('a');
    a.href = href;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function downloadPng(text, filename) {
    download(pngDataUrl(text), filename);
  }

  function downloadSvg(text, filename) {
    const blob = new Blob([svg(text)], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    download(url, filename);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  /**
   * Cartaz A4 para imprimir: logo do CECATE, título, subtítulo, QR grande (14 cm), link e instrução
   */
  function printPoster(text, { title, subtitle = '' }) {
    const esc = (s) => String(s || '').replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
    const logo = new URL('assets/CECATE_Centro-Oeste_Logo_Colorida_Horizontal_Completa-PNG.png', window.location.href).href;
    const win = window.open('', '_blank');
    if (!win) throw new Error('O navegador bloqueou a janela do cartaz. Permita pop-ups para este site.');
    win.document.write(`<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>${esc(title)}</title>
<style>
  @page { size: A4 portrait; margin: 14mm; }
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; color: #202020; margin: 0; text-align: center; }
  .poster { border-top: 6mm solid #F6A800; padding-top: 8mm; }
  img.logo { height: 22mm; }
  h1 { font-size: 26pt; margin: 8mm 0 2mm; }
  h2 { font-size: 15pt; font-weight: normal; color: #4D4D4D; margin: 0 0 8mm; }
  .qr { width: 140mm; height: 140mm; margin: 0 auto; }
  .qr svg { width: 100%; height: 100%; }
  .hint { font-size: 18pt; font-weight: bold; margin: 8mm 0 3mm; }
  .link { font-size: 10pt; color: #4D4D4D; word-break: break-all; margin: 0 10mm; }
  .foot { margin-top: 8mm; font-size: 9pt; color: #757575; }
</style></head><body><div class="poster">
  <img class="logo" src="${esc(logo)}" alt="CECATE Centro-Oeste">
  <h1>${esc(title)}</h1>
  <h2>${esc(subtitle)}</h2>
  <div class="qr">${svg(text, { title })}</div>
  <p class="hint">Aponte a câmera do celular para o código</p>
  <p class="link">${esc(text)}</p>
  <p class="foot">Centro Colaborador de Apoio ao Transporte Escolar da Região Centro-Oeste · UFG / FNDE</p>
</div>
<script>window.onload = () => setTimeout(() => window.print(), 300);<\/script></body></html>`);
    win.document.close();
  }

  CapacitaTE.qr = { svg, pngDataUrl, downloadPng, downloadSvg, printPoster };
})();
