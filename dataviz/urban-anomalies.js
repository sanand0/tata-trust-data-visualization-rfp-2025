// Chart 12: Urban spend anomalies
// Scatter plot showing districts with urban spend anomalies vs outcomes

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { loadData, formatCurrency, formatNumber, COLORS } from "./core.js";

export default function render(container, props = {}) {
  const {
    data: dataSource = '../data/geo_need_coverage.csv',
    portfolioSource = '../data/grants_portfolio.csv',
    width = container.clientWidth,
    height = props.height || 500,
    theme = 'light',
    onEvent
  } = props;

  let chart, observer;

  async function init() {
    container.innerHTML = '<div class="text-center my-5"><div class="spinner-border text-primary" role="status"></div></div>';

    try {
      const geoData = typeof dataSource === 'string' ? await loadData(dataSource) : dataSource;
      const portfolioData = typeof portfolioSource === 'string' ? await loadData(portfolioSource) : portfolioSource;

      // Calculate average outcomes by district
      const outcomesByDistrict = {};
      portfolioData.forEach(grant => {
        const key = `${grant.district}, ${grant.state}`;
        if (!outcomesByDistrict[key]) {
          outcomesByDistrict[key] = { sum: 0, count: 0 };
        }
        outcomesByDistrict[key].sum += grant.outcome_index || 0;
        outcomesByDistrict[key].count += 1;
      });

      // Join with geo data
      const chartData = geoData.map(d => {
        const key = `${d.district}, ${d.state}`;
        const outcomeData = outcomesByDistrict[key];
        return {
          ...d,
          avg_outcome: outcomeData ? outcomeData.sum / outcomeData.count : null,
          is_anomaly: d.urban_spend_anomaly === 1
        };
      }).filter(d => d.avg_outcome != null);

      container.innerHTML = '';

      chart = Plot.plot({
        width,
        height,
        marginLeft: 60,
        marginBottom: 60,
        grid: true,
        x: {
          label: "Spend per capita (₹) →",
          type: "log"
        },
        y: {
          label: "↑ Average Outcome Index",
          domain: [0, 100]
        },
        color: {
          domain: [false, true],
          range: [COLORS.teal, COLORS.red],
          legend: true,
          label: "Urban anomaly?"
        },
        marks: [
          // Normal districts
          Plot.dot(chartData.filter(d => !d.is_anomaly), {
            x: "spend_per_capita_inr",
            y: "avg_outcome",
            fill: d => d.is_anomaly,
            r: 4,
            fillOpacity: 0.5,
            stroke: "white",
            strokeWidth: 1,
            tip: true,
            title: d => `${d.district}, ${d.state}\nSpend/capita: ${formatCurrency(d.spend_per_capita_inr, 0)}\nOutcome: ${formatNumber(d.avg_outcome, 1)}`
          }),

          // Anomaly districts
          Plot.dot(chartData.filter(d => d.is_anomaly), {
            x: "spend_per_capita_inr",
            y: "avg_outcome",
            fill: d => d.is_anomaly,
            r: 7,
            fillOpacity: 0.8,
            stroke: "white",
            strokeWidth: 2,
            tip: true,
            title: d => `${d.district}, ${d.state}\nSpend/capita: ${formatCurrency(d.spend_per_capita_inr, 0)}\nOutcome: ${formatNumber(d.avg_outcome, 1)}\n⚠️ Urban Anomaly`
          }),

          // Labels for top anomalies
          Plot.text(chartData.filter(d => d.is_anomaly).slice(0, 5), {
            x: "spend_per_capita_inr",
            y: "avg_outcome",
            text: "district",
            dy: -10,
            fontSize: 10,
            fontWeight: "600",
            fill: COLORS.red
          })
        ]
      });

      container.appendChild(chart);

      const anomalies = chartData.filter(d => d.is_anomaly);
      const avgAnomalyOutcome = anomalies.reduce((sum, d) => sum + d.avg_outcome, 0) / anomalies.length;
      const avgNormalOutcome = chartData.filter(d => !d.is_anomaly).reduce((sum, d) => sum + d.avg_outcome, 0) /
                               chartData.filter(d => !d.is_anomaly).length;
      const gap = avgAnomalyOutcome - avgNormalOutcome;

      const subtitle = document.createElement('p');
      subtitle.className = 'text-muted text-center mt-2 mb-0';
      subtitle.style.fontSize = '14px';
      subtitle.innerHTML = `Urban anomalies (red) average ${formatNumber(Math.abs(gap), 1)} ${gap > 0 ? 'higher' : 'lower'} outcomes despite high spending. Check if justified by local context.`;
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
