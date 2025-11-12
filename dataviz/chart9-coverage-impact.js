// Chart 9: High-need but low-coverage districts drive most missed outcomes
// Cumulative impact curve showing outcomes gained by closing coverage gaps

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { loadData, formatNumber, formatPercent, COLORS } from "./core.js";

export default function render(container, props = {}) {
  const {
    data: dataSource = '../data/geo_need_coverage.csv',
    width = container.clientWidth,
    height = props.height || 450,
    theme = 'light',
    onEvent
  } = props;

  let chart, observer;

  async function init() {
    container.innerHTML = '<div class="text-center my-5"><div class="spinner-border text-primary" role="status"></div></div>';

    try {
      const data = typeof dataSource === 'string' ? await loadData(dataSource) : dataSource;

      // Filter high-need districts with gaps
      const gaps = data
        .filter(d => d.need_decile >= 7 && d.coverage_gap_per_1k > 0)
        .map(d => ({
          ...d,
          potential_impact: d.coverage_gap_per_1k * d.population / 1000 * d.deprivation_score
        }))
        .sort((a, b) => b.potential_impact - a.potential_impact);

      if (gaps.length === 0) {
        container.innerHTML = '<div class="alert alert-info">No high-need districts with coverage gaps found.</div>';
        return;
      }

      // Calculate cumulative impact
      const totalImpact = gaps.reduce((sum, d) => sum + d.potential_impact, 0);
      let cumulative = 0;

      const cumulativeData = gaps.map((d, i) => {
        cumulative += d.potential_impact;
        return {
          rank: i + 1,
          district: d.district,
          state: d.state,
          impact: d.potential_impact,
          cumulative_impact: cumulative,
          cumulative_pct: cumulative / totalImpact,
          gap: d.coverage_gap_per_1k,
          need_decile: d.need_decile
        };
      });

      container.innerHTML = '';

      chart = Plot.plot({
        width,
        height,
        marginBottom: 60,
        marginLeft: 60,
        marginRight: 20,
        grid: true,
        x: {
          label: "Number of districts prioritized →",
          labelAnchor: "center"
        },
        y: {
          label: "↑ Cumulative % of total potential outcomes",
          tickFormat: d => (d * 100).toFixed(0) + '%',
          domain: [0, 1]
        },
        marks: [
          // Reference line (linear)
          Plot.line(
            [{ x: 0, y: 0 }, { x: cumulativeData.length, y: 1 }],
            {
              x: "x",
              y: "y",
              stroke: COLORS.mediumGray,
              strokeDasharray: "4,4",
              strokeWidth: 1
            }
          ),

          // Cumulative curve
          Plot.line(cumulativeData, {
            x: "rank",
            y: "cumulative_pct",
            stroke: COLORS.teal,
            strokeWidth: 3,
            curve: "step-after"
          }),

          // Area under curve
          Plot.areaY(cumulativeData, {
            x: "rank",
            y: "cumulative_pct",
            fill: COLORS.teal,
            fillOpacity: 0.1,
            curve: "step-after"
          }),

          // Markers for key points
          Plot.dot(cumulativeData.filter((d, i) => i === 9 || i === 19 || i === cumulativeData.length - 1), {
            x: "rank",
            y: "cumulative_pct",
            fill: COLORS.red,
            r: 6,
            stroke: "white",
            strokeWidth: 2,
            tip: true,
            title: d => `Top ${d.rank} districts\nCumulative: ${formatPercent(d.cumulative_pct, 1)}\n${d.district}, ${d.state}`
          }),

          // Annotation for top 10
          ...(cumulativeData.length >= 10 ? [
            Plot.text([cumulativeData[9]], {
              x: "rank",
              y: "cumulative_pct",
              text: d => `Top 10: ${formatPercent(d.cumulative_pct, 0)}`,
              dx: 40,
              dy: -10,
              fontSize: 12,
              fontWeight: "600",
              fill: COLORS.red
            }),
            Plot.ruleY([cumulativeData[9].cumulative_pct], {
              stroke: COLORS.red,
              strokeDasharray: "2,2",
              strokeOpacity: 0.5
            })
          ] : [])
        ]
      });

      container.appendChild(chart);

      // Key insight
      const top10Pct = cumulativeData[Math.min(9, cumulativeData.length - 1)].cumulative_pct;
      const insight = document.createElement('p');
      insight.className = 'text-muted text-center mt-2 mb-0';
      insight.style.fontSize = '14px';
      insight.innerHTML = `Closing coverage gaps in just <strong>10 districts</strong> would capture <strong>${formatPercent(top10Pct, 0)}</strong> of total potential outcomes. Steep curve shows concentration of opportunity.`;
      container.appendChild(insight);

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
