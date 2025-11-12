// Chart 3: Underserved pockets list
// Ranked bar chart showing coverage gap for high-need districts

import * as Plot from "@observablehq/plot";
import { loadData, formatNumber, COLORS } from "./core.js";

export default function render(container, props = {}) {
  const {
    data: dataSource = '../data/geo_need_coverage.csv',
    width = container.clientWidth,
    height = props.height || 600,
    theme = 'light',
    onEvent
  } = props;

  let chart, observer;

  async function init() {
    container.innerHTML = '<div class="text-center my-5"><div class="spinner-border text-primary" role="status"></div></div>';

    try {
      const data = typeof dataSource === 'string' ? await loadData(dataSource) : dataSource;

      // Filter high-need districts with positive coverage gap
      const underserved = data
        .filter(d => d.need_decile >= 8 && d.coverage_gap_per_1k > 0)
        .sort((a, b) => b.coverage_gap_per_1k - a.coverage_gap_per_1k)
        .slice(0, 15);

      if (underserved.length === 0) {
        container.innerHTML = '<div class="alert alert-info">No underserved high-need districts found.</div>';
        return;
      }

      container.innerHTML = '';

      chart = Plot.plot({
        width,
        height,
        marginLeft: 180,
        marginBottom: 50,
        marginRight: 50,
        x: {
          label: "Coverage gap (per 1,000 population) →",
          labelAnchor: "center",
          grid: true
        },
        y: {
          label: null,
          domain: underserved.map(d => `${d.district}, ${d.state}`)
        },
        marks: [
          Plot.barX(underserved, {
            x: "coverage_gap_per_1k",
            y: d => `${d.district}, ${d.state}`,
            fill: COLORS.red,
            fillOpacity: 0.8,
            tip: true,
            title: d => `${d.district}, ${d.state}\nGap: ${formatNumber(d.coverage_gap_per_1k, 2)}/1K\nNeed Decile: ${d.need_decile}\nDeprivation: ${formatNumber(d.deprivation_score, 1)}\nSpend/capita: ${formatNumber(d.spend_per_capita_inr, 0)}`
          }),
          Plot.text(underserved, {
            x: "coverage_gap_per_1k",
            y: d => `${d.district}, ${d.state}`,
            text: d => formatNumber(d.coverage_gap_per_1k, 2),
            dx: 20,
            fontSize: 11,
            fontWeight: "600",
            fill: COLORS.dark
          })
        ]
      });

      container.appendChild(chart);

      // Summary
      const summary = document.createElement('p');
      summary.className = 'text-muted text-center mt-2 mb-0';
      summary.style.fontSize = '14px';
      const totalGap = underserved.reduce((sum, d) => sum + d.coverage_gap_per_1k, 0);
      summary.innerHTML = `Top 15 underserved districts (need decile ≥ 8). Total gap: ${formatNumber(totalGap, 1)}/1K population.`;
      container.appendChild(summary);

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
