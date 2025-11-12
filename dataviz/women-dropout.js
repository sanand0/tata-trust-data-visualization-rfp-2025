// Chart 14: Women in skilling and dropout
// Scatter with trend line showing female participation vs dropout in Skilling programs

import * as Plot from "@observablehq/plot";
import { loadData, formatPercent, formatNumber, COLORS } from "./core.js";

export default function render(container, props = {}) {
  const {
    data: dataSource = '../data/beneficiary_outcomes.csv',
    width = container.clientWidth,
    height = props.height || 500,
    theme = 'light',
    onEvent
  } = props;

  let chart, observer;

  async function init() {
    container.innerHTML = '<div class="text-center my-5"><div class="spinner-border text-primary" role="status"></div></div>';

    try {
      const data = typeof dataSource === 'string' ? await loadData(dataSource) : dataSource;

      // Filter for Skilling theme
      const skillingData = data.filter(d => d.theme === 'Skilling' && d.female_pct != null && d.dropout_rate != null);

      if (skillingData.length === 0) {
        container.innerHTML = '<div class="alert alert-info">No Skilling data available with female participation metrics.</div>';
        return;
      }

      // Find the "sweet spot" range where dropout falls fastest
      const sorted = [...skillingData].sort((a, b) => a.female_pct - b.female_pct);
      const bins = [];
      const binSize = 0.1;
      for (let i = 0; i < 1; i += binSize) {
        const binData = sorted.filter(d => d.female_pct >= i && d.female_pct < i + binSize);
        if (binData.length > 0) {
          bins.push({
            female_pct: i + binSize / 2,
            avg_dropout: binData.reduce((sum, d) => sum + d.dropout_rate, 0) / binData.length,
            count: binData.length
          });
        }
      }

      const minDropout = Math.min(...bins.map(b => b.avg_dropout));
      const sweetSpotBin = bins.find(b => b.avg_dropout === minDropout);

      container.innerHTML = '';

      chart = Plot.plot({
        width,
        height,
        marginBottom: 50,
        marginLeft: 60,
        grid: true,
        x: {
          label: "Female participation (%) →",
          domain: [0, 1],
          tickFormat: d => (d * 100).toFixed(0) + '%'
        },
        y: {
          label: "↑ Dropout Rate",
          domain: [0, Math.max(...skillingData.map(d => d.dropout_rate)) * 1.1],
          tickFormat: d => (d * 100).toFixed(0) + '%'
        },
        marks: [
          // Sweet spot zone
          sweetSpotBin ? Plot.rect([{
            x1: Math.max(0, sweetSpotBin.female_pct - 0.05),
            x2: Math.min(1, sweetSpotBin.female_pct + 0.05),
            y1: 0,
            y2: Math.max(...skillingData.map(d => d.dropout_rate))
          }], {
            x1: "x1",
            x2: "x2",
            y1: "y1",
            y2: "y2",
            fill: COLORS.success,
            fillOpacity: 0.1
          }) : null,

          // Individual points
          Plot.dot(skillingData, {
            x: "female_pct",
            y: "dropout_rate",
            fill: COLORS.purple,
            r: 3,
            fillOpacity: 0.4,
            tip: true,
            title: d => `${d.district}\nFemale %: ${formatPercent(d.female_pct)}\nDropout: ${formatPercent(d.dropout_rate)}`
          }),

          // Binned averages
          Plot.dot(bins, {
            x: "female_pct",
            y: "avg_dropout",
            fill: COLORS.dark,
            r: 6,
            stroke: "white",
            strokeWidth: 2
          }),

          // Trend line through bins
          Plot.line(bins, {
            x: "female_pct",
            y: "avg_dropout",
            stroke: COLORS.red,
            strokeWidth: 3,
            curve: "natural"
          }),

          // Sweet spot annotation
          sweetSpotBin ? Plot.text([sweetSpotBin], {
            x: "female_pct",
            y: d => d.avg_dropout,
            text: ["Lowest dropout →"],
            dy: -15,
            dx: -30,
            fill: COLORS.success,
            fontWeight: "600",
            fontSize: 12
          }) : null
        ].filter(Boolean)
      });

      container.appendChild(chart);

      const subtitle = document.createElement('p');
      subtitle.className = 'text-muted text-center mt-2 mb-0';
      subtitle.style.fontSize = '14px';
      subtitle.innerHTML = `In Skilling programs, female participation of ${formatPercent(sweetSpotBin.female_pct, 0)} correlates with lowest dropout (${formatPercent(sweetSpotBin.avg_dropout, 1)}). Green zone highlights sweet spot.`;
      container.appendChild(subtitle);

      observer = new ResizeObserver(() => {
        if (container.clientWidth !== width) {
          render(container, { ...props, width: container.clientWidth });
        }
      });
      observer.observe(container);

    } catch (error) {
      container.innerHTML = `<div class="alert alert-danger">Error loading chart: ${error.message}</div>`;
    }
  }

  init();

  return {
    update(nextProps) {
      Object.assign(props, nextProps);
      if (observer) observer.disconnect();
      init();
    },
    resize() {
      if (observer) observer.disconnect();
      render(container, { ...props, width: container.clientWidth });
    },
    destroy() {
      if (observer) observer.disconnect();
      if (chart && chart.remove) chart.remove();
      container.innerHTML = '';
    }
  };
}
