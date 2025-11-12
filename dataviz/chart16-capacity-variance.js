// Chart 16: Capacity lowers variance and risk
// Side-by-side boxplots showing how partner capacity affects variance and risk

import * as Plot from "@observablehq/plot";
import { loadData, groupBy, formatPercent, formatNumber, COLORS } from "./core.js";

export default function render(container, props = {}) {
  const {
    data: dataSource = '../data/grants_portfolio.csv',
    width = container.clientWidth,
    height = props.height || 500,
    theme = 'light',
    onEvent
  } = props;

  let charts = [], observer;

  async function init() {
    container.innerHTML = '<div class="text-center my-5"><div class="spinner-border text-primary" role="status"></div></div>';

    try {
      const data = typeof dataSource === 'string' ? await loadData(dataSource) : dataSource;

      // Filter out nulls
      const cleanData = data.filter(d => d.partner_capacity != null && d.budget_variance_pct != null);

      container.innerHTML = '';

      // Create two side-by-side charts
      const row = document.createElement('div');
      row.className = 'row g-3';
      container.appendChild(row);

      // Variance boxplot
      const varianceCol = document.createElement('div');
      varianceCol.className = 'col-md-6';
      row.appendChild(varianceCol);

      const varianceChart = Plot.plot({
        width: width / 2 - 20,
        height: 400,
        marginBottom: 50,
        marginLeft: 60,
        x: {
          label: "Partner Capacity Level →",
          domain: [1, 2, 3, 4, 5]
        },
        y: {
          label: "↑ Budget Variance (%)",
          tickFormat: d => d.toFixed(0) + '%',
          grid: true
        },
        marks: [
          Plot.boxY(cleanData, {
            x: "partner_capacity",
            y: "budget_variance_pct",
            fill: COLORS.teal,
            fillOpacity: 0.3,
            stroke: COLORS.teal,
            strokeWidth: 2
          }),

          Plot.dot(cleanData, {
            x: "partner_capacity",
            y: "budget_variance_pct",
            fill: COLORS.teal,
            fillOpacity: 0.2,
            r: 2
          })
        ]
      });
      varianceCol.appendChild(varianceChart);

      const varianceTitle = document.createElement('h6');
      varianceTitle.className = 'text-center mt-2';
      varianceTitle.textContent = 'Capacity → Lower Budget Variance';
      varianceCol.appendChild(varianceTitle);

      // Risk boxplot
      const riskCol = document.createElement('div');
      riskCol.className = 'col-md-6';
      row.appendChild(riskCol);

      const riskChart = Plot.plot({
        width: width / 2 - 20,
        height: 400,
        marginBottom: 50,
        marginLeft: 60,
        x: {
          label: "Partner Capacity Level →",
          domain: [1, 2, 3, 4, 5]
        },
        y: {
          label: "↑ Risk Rating",
          domain: [1, 5],
          grid: true
        },
        marks: [
          Plot.boxY(cleanData, {
            x: "partner_capacity",
            y: "risk_rating",
            fill: COLORS.red,
            fillOpacity: 0.3,
            stroke: COLORS.red,
            strokeWidth: 2
          }),

          Plot.dot(cleanData, {
            x: "partner_capacity",
            y: "risk_rating",
            fill: COLORS.red,
            fillOpacity: 0.2,
            r: 2
          })
        ]
      });
      riskCol.appendChild(riskChart);

      const riskTitle = document.createElement('h6');
      riskTitle.className = 'text-center mt-2';
      riskTitle.textContent = 'Capacity → Lower Risk';
      riskCol.appendChild(riskTitle);

      charts = [varianceChart, riskChart];

      // Calculate reductions
      const grouped = groupBy(cleanData, 'partner_capacity');
      const cap2Variance = grouped[2] ? grouped[2].reduce((sum, d) => sum + Math.abs(d.budget_variance_pct), 0) / grouped[2].length : 0;
      const cap4Variance = grouped[4] ? grouped[4].reduce((sum, d) => sum + Math.abs(d.budget_variance_pct), 0) / grouped[4].length : 0;
      const varianceReduction = cap2Variance > 0 ? ((cap2Variance - cap4Variance) / cap2Variance) : 0;

      const summary = document.createElement('p');
      summary.className = 'text-muted text-center mt-3 mb-0';
      summary.style.fontSize = '14px';
      summary.innerHTML = `Budget variance drops <strong>${formatPercent(varianceReduction, 0)}</strong> from capacity 2 to 4. Box plots show median and quartiles.`;
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
      charts.forEach(c => c && c.remove && c.remove());
      container.innerHTML = '';
    }
  };
}
