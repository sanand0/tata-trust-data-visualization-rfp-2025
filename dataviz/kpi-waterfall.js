// Chart 5: KPI attainment and its drivers
// Waterfall chart showing incremental lift from each lever

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { loadData, formatPercent, COLORS } from "./core.js";

export default function render(container, props = {}) {
  const {
    data: dataSource = '../data/monitoring_quality.csv',
    width = container.clientWidth,
    height = props.height || 400,
    theme = 'light',
    onEvent
  } = props;

  let chart, observer;

  async function init() {
    container.innerHTML = '<div class="text-center my-5"><div class="spinner-border text-primary" role="status"></div></div>';

    try {
      const data = typeof dataSource === 'string' ? await loadData(dataSource) : dataSource;

      // Calculate KPI attainment rates for different conditions
      const baseline = data.filter(d => d.kpi_met === 1).length / data.length;

      const withTemplate = data.filter(d => d.template_use === 1 && d.kpi_met === 1).length /
                           data.filter(d => d.template_use === 1).length || 0;

      const withStandups = data.filter(d => d.standups_per_week >= 2 && d.kpi_met === 1).length /
                           data.filter(d => d.standups_per_week >= 2).length || 0;

      const withEarlyWarning = data.filter(d => d.early_warning_active === 1 && d.kpi_met === 1).length /
                               data.filter(d => d.early_warning_active === 1).length || 0;

      const withVisits = data.filter(d => d.site_visits >= 3 && d.kpi_met === 1).length /
                         data.filter(d => d.site_visits >= 3).length || 0;

      // Build waterfall data
      const waterfallData = [
        { label: 'Baseline', value: baseline, isTotal: false, start: 0, end: baseline },
        { label: '+Templates', value: withTemplate - baseline, isTotal: false, start: baseline, end: withTemplate },
        { label: '+Standups', value: withStandups - withTemplate, isTotal: false, start: withTemplate, end: withStandups },
        { label: '+Early Warning', value: withEarlyWarning - withStandups, isTotal: false, start: withStandups, end: withEarlyWarning },
        { label: '+Site Visits', value: withVisits - withEarlyWarning, isTotal: false, start: withEarlyWarning, end: withVisits },
        { label: 'Total', value: withVisits, isTotal: true, start: 0, end: withVisits }
      ];

      container.innerHTML = '';

      chart = Plot.plot({
        width,
        height,
        marginBottom: 50,
        marginLeft: 50,
        marginRight: 20,
        y: {
          label: "↑ KPI Attainment Rate",
          domain: [0, 1],
          tickFormat: d => (d * 100).toFixed(0) + '%',
          grid: true
        },
        x: {
          label: null,
          domain: waterfallData.map(d => d.label)
        },
        marks: [
          // Bars
          Plot.barY(waterfallData.filter(d => !d.isTotal), {
            x: "label",
            y1: "start",
            y2: "end",
            fill: d => d.value >= 0 ? COLORS.success : COLORS.red,
            tip: true,
            title: d => `${d.label}\nLift: ${formatPercent(d.value, 1)}\nRate: ${formatPercent(d.end, 1)}`
          }),
          // Total bar
          Plot.barY(waterfallData.filter(d => d.isTotal), {
            x: "label",
            y: "end",
            fill: COLORS.teal,
            tip: true,
            title: d => `${d.label}\nRate: ${formatPercent(d.end, 1)}`
          }),
          // Connector lines
          Plot.link(waterfallData.slice(0, -1).map((d, i) => ({
            x1: d.label,
            x2: waterfallData[i + 1].label,
            y: d.end
          })), {
            x1: "x1",
            x2: "x2",
            y1: "y",
            y2: "y",
            stroke: COLORS.mediumGray,
            strokeDasharray: "2,2"
          }),
          // Value labels
          Plot.text(waterfallData, {
            x: "label",
            y: d => d.isTotal ? d.end : (d.start + d.end) / 2,
            text: d => d.isTotal ? formatPercent(d.end, 0) : formatPercent(d.value, 1),
            fill: "white",
            fontWeight: "600",
            fontSize: 11
          })
        ]
      });

      container.appendChild(chart);

      // Insight
      const insight = document.createElement('p');
      insight.className = 'text-muted text-center mt-2 mb-0';
      insight.style.fontSize = '14px';
      const totalLift = withVisits - baseline;
      insight.innerHTML = `Implementing all operational levers increases KPI attainment by <strong>${formatPercent(totalLift, 1)}</strong>.`;
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
