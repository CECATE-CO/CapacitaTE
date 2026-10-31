/**
 * CapacitaTE - Motor de Geração de Gráficos (Chart.js)
 * Versão: v.4.3.9
 */

class ChartEngine {
  constructor() {
    this.chartInstances = {};
    // Fonte dos textos dos gráficos (Figuras 3 a 6); definida pelo usuário na Etapa 8, mesmas opções da nuvem de palavras
    this.fontFamily = 'Plus Jakarta Sans';
    // Densidade de pixels dos gráficos: null usa a da tela; a prévia do relatório (imagens do Word/PDF) usa 3x
    this.pixelRatio = null;
  }

  /**
   * Define a densidade de pixels dos próximos gráficos (null = densidade da tela)
   */
  setPixelRatio(ratio) {
    this.pixelRatio = ratio || null;
  }

  getPixelRatio() {
    return this.pixelRatio || (typeof window !== 'undefined' && window.devicePixelRatio) || 1;
  }

  /**
   * Define a fonte usada nos próximos gráficos renderizados
   */
  setFontFamily(fontFamily) {
    this.fontFamily = fontFamily || 'Plus Jakarta Sans';
  }

  /**
   * Destrói instância anterior de um canvas para evitar vazamentos e conflitos
   */
  destroyIfExists(canvasId) {
    if (window.Chart) {
      try {
        const existing = window.Chart.getChart(canvasId);
        if (existing) existing.destroy();
      } catch (e) {}
    }
    if (this.chartInstances[canvasId]) {
      try {
        this.chartInstances[canvasId].destroy();
      } catch (e) {}
      delete this.chartInstances[canvasId];
    }
  }

  /**
   * Figura 3: Gráfico de Participação segundo tipo de representação (CACS vs Gestores)
   */
  renderFig3Participation(canvasId, presentCACS = 0, presentGestores = 0, isDark = true) {
    this.destroyIfExists(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const total = presentCACS + presentGestores;
    const hasData = total > 0;

    if (!hasData) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `600 13px "${this.fontFamily}", sans-serif`;
        ctx.fillStyle = isDark ? '#64748b' : '#94a3b8';
        ctx.fillText('Nenhuma avaliação importada no momento', canvas.width / 2, canvas.height / 2);
        ctx.restore();
      }
      return null;
    }

    if (!window.Chart) return null;
    const ctx = canvas.getContext('2d');

    const percCACS = ((presentCACS / total) * 100).toFixed(1).replace('.', ','); // vírgula decimal (padrão brasileiro)
    const percGest = ((presentGestores / total) * 100).toFixed(1).replace('.', ',');

    const chartData = [presentCACS, presentGestores];
    const bgColors = ['#06b6d4', '#6366f1'];
    const labels = [
      `Conselheiros CACS-FUNDEB (${presentCACS} - ${percCACS}%)`,
      `Gestores Municipais (${presentGestores} - ${percGest}%)`
    ];

    this.chartInstances[canvasId] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: chartData,
          backgroundColor: bgColors,
          borderWidth: 2,
          borderColor: isDark ? '#111827' : '#ffffff',
          hoverOffset: 6
        }]
      },
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: this.getPixelRatio(),
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: isDark ? '#e2e8f0' : '#1e293b',
              font: { family: this.fontFamily, size: 12, weight: '600' },
              padding: 15
            }
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context) => ` ${context.label}: ${context.raw} participantes`
            }
          }
        },
        cutout: '62%'
      }
    });

    return this.chartInstances[canvasId];
  }

  /**
   * Figuras 4, 5 e 6: Gráfico de Avaliação em Barras Horizontais Empilhadas (100%)
   * Legendas: 1 - Ruim, 2 - Regular, 3 - Neutro, 4 - Muito Bom, 5 - Excelente
   */
  renderEvaluationStackedBarChart(canvasId, criterionPercentMatrix = [], title = 'Avaliação da Capacitação', isDark = true) {
    this.destroyIfExists(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const hasAnyData = Array.isArray(criterionPercentMatrix) && criterionPercentMatrix.some(row => Array.isArray(row) && row.some(val => val > 0));

    if (!hasAnyData) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `600 13px "${this.fontFamily}", sans-serif`;
        ctx.fillStyle = isDark ? '#64748b' : '#94a3b8';
        ctx.fillText('Nenhuma avaliação importada no momento', canvas.width / 2, canvas.height / 2);
        ctx.restore();
      }
      return null;
    }

    if (!window.Chart) return null;
    const ctx = canvas.getContext('2d');
    const labels = [
      'Inscrição',
      'Divulgação',
      'Data da Formação',
      'Horário da Formação',
      'Local da Formação',
      'Duração da Formação',
      'Como você avalia a Formação'
    ];

    // Utilizar a matriz real calculada dos dados brutos
    const safeMatrix = labels.map((_, i) => {
      if (criterionPercentMatrix && criterionPercentMatrix[i] && criterionPercentMatrix[i].length === 5) {
        return criterionPercentMatrix[i];
      }
      return [0, 0, 0, 0, 0];
    });

    const datasetLabels = ['1 - Ruim', '2 - Regular', '3 - Neutro', '4 - Muito Bom', '5 - Excelente'];
    const datasetColors = [
      '#dc2626', // Vermelho (1 - Ruim)
      '#f59e0b', // Laranja (2 - Regular)
      '#78716c', // Cinza (3 - Neutro)
      '#facc15', // Amarelo (4 - Muito Bom)
      '#10b981'  // Verde (5 - Excelente)
    ];

    // Versões escuras das cores, legíveis sobre o fundo branco (rótulos acima dos segmentos estreitos)
    const datasetColorsDark = ['#b91c1c', '#b45309', '#57534e', '#a16207', '#047857'];

    const datasets = datasetLabels.map((lbl, starIdx) => ({
      label: lbl,
      data: safeMatrix.map(row => row[starIdx] || 0),
      backgroundColor: datasetColors[starIdx],
      borderWidth: 0,
      barPercentage: 0.62,
      categoryPercentage: 0.92
    }));

    const chartFont = this.fontFamily; // dentro do plugin, this não é o ChartEngine
    const stackedPercentagePlugin = {
      id: 'stackedBarPercentage',
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const bigFont = `bold 11px "${chartFont}", sans-serif`;
        const smallFont = `bold 9.5px "${chartFont}", sans-serif`;
        const outside = new Map(); // índice da linha -> rótulos que não cabem dentro do segmento

        // Todos os percentuais aparecem: dentro do segmento quando cabem (11 px ou 9,5 px); senão, acima dele
        chart.data.datasets.forEach((dataset, dsIdx) => {
          const meta = chart.getDatasetMeta(dsIdx);
          if (meta.hidden) return;

          meta.data.forEach((element, idx) => {
            const val = dataset.data[idx];
            if (!val) return;
            const { x, y, base } = element;
            const width = Math.abs(x - base);
            const centerX = (x + base) / 2;
            const label = `${String(val).replace('.', ',')}%`;
            const color = (dsIdx === 3 || dsIdx === 1) ? '#1F1F1F' : '#ffffff';
            for (const font of [bigFont, smallFont]) {
              ctx.font = font;
              if (ctx.measureText(label).width + 6 <= width) {
                ctx.fillStyle = color;
                ctx.fillText(label, centerX, y);
                return;
              }
            }
            const barTop = y - (element.height || 0) / 2;
            if (!outside.has(idx)) outside.set(idx, []);
            outside.get(idx).push({ centerX, barTop, label, color: datasetColorsDark[dsIdx] });
          });
        });

        // Rótulos acima do segmento, afastados entre si para não se sobreporem
        ctx.font = smallFont;
        ctx.textBaseline = 'bottom';
        outside.forEach(items => {
          items.sort((a, b) => a.centerX - b.centerX);
          let lastRight = -Infinity;
          items.forEach(item => {
            const w = ctx.measureText(item.label).width;
            const left = Math.max(item.centerX - w / 2, lastRight + 4);
            ctx.fillStyle = item.color;
            ctx.fillText(item.label, left + w / 2, item.barTop - 1.5);
            lastRight = left + w;
          });
        });
        ctx.restore();
      }
    };

    this.chartInstances[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets
      },
      plugins: [stackedPercentagePlugin],
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: this.getPixelRatio(),
        indexAxis: 'y',
        layout: { padding: { top: 14, right: 8 } },
        scales: {
          x: {
            stacked: true,
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20,
              callback: (value) => value + '%',
              color: isDark ? '#94a3b8' : '#64748b',
              font: { family: this.fontFamily, size: 11 }
            },
            grid: {
              color: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'
            }
          },
          y: {
            stacked: true,
            ticks: {
              color: isDark ? '#e2e8f0' : '#1e293b',
              font: { family: this.fontFamily, size: 11, weight: '500' },
              crossAlign: 'start' // Alinha os rótulos do eixo Y à esquerda
            },
            grid: { display: false }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: isDark ? '#e2e8f0' : '#1e293b',
              font: { family: this.fontFamily, size: 11, weight: '600' },
              padding: 15,
              usePointStyle: true,
              pointStyle: 'rect'
            }
          },
          title: {
            display: false // Desativado no canvas para evitar duplicidade de título com as legendas do relatório e da UI
          },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.dataset.label}: ${String(context.raw).replace('.', ',')}%`
            }
          }
        }
      }
    });

    return this.chartInstances[canvasId];
  }

  /**
   * Compatibilidade legado
   */
  renderEvaluationBarChart(canvasId, matrixOrAverages = [], title = 'Avaliação da Capacitação', isDark = true) {
    return this.renderEvaluationStackedBarChart(canvasId, matrixOrAverages, title, isDark);
  }

  /**
   * Exporta qualquer gráfico como imagem Base64
   */
  exportChartAsDataURL(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return '';
    return canvas.toDataURL('image/png');
  }
}

window.chartEngine = new ChartEngine();

