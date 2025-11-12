// Chart 8: Timeliness ripple effect
// Bar chart comparing outcomes for on-time vs delayed grants

import * as Plot from "@observablehq/plot";
import { COLORS, formatNumber, loadData, meanBy } from "./core.js";

export default function render(container, props = {}) {
  const {
    data: dataSource = "../data/grants_portfolio.csv",
    width = container.clientWidth,
    height = props.height || 400,
    theme = "light",
    onEvent,
  } = props;

  let chart, observer;

  async function init() {
    container.innerHTML =
      '<div class="text-center my-5"><div class="spinner-border text-primary" role="status"></div></div>';

    try {
      const data = typeof dataSource === "string" ? await loadData(dataSource) : dataSource;

      // Split into on-time (>=0.75) and delayed (<0.75) groups
      const onTime = data.filter((d) => d.disbursement_timeliness >= 0.75);
      const delayed = data.filter((d) => d.disbursement_timeliness < 0.75);

      const chartData = [
        {
          group: "On-time disbursements",
          outcome: meanBy(onTime, "outcome_index"),
          count: onTime.length,
          timeliness: meanBy(onTime, "disbursement_timeliness"),
        },
        {
          group: "Delayed disbursements",
          outcome: meanBy(delayed, "outcome_index"),
          count: delayed.length,
          timeliness: meanBy(delayed, "disbursement_timeliness"),
        },
      ];

      // Calculate standard error for confidence ribbons
      function calculateSE(arr, key) {
        const values = arr.map((d) => d[key]).filter((v) => v != null);
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
        return Math.sqrt(variance / values.length);
      }

      const onTimeSE = calculateSE(onTime, "outcome_index");
      const delayedSE = calculateSE(delayed, "outcome_index");

      const confidenceData = [
        {
          group: "On-time disbursements",
          lower: chartData[0].outcome - 1.96 * onTimeSE,
          upper: chartData[0].outcome + 1.96 * onTimeSE,
        },
        {
          group: "Delayed disbursements",
          lower: chartData[1].outcome - 1.96 * delayedSE,
          upper: chartData[1].outcome + 1.96 * delayedSE,
        },
      ];

      container.innerHTML = "";

      chart = Plot.plot({
        width,
        height,
        marginBottom: 80,
        marginLeft: 60,
        grid: true,
        x: {
          label: null,
          domain: chartData.map((d) => d.group),
        },
        y: {
          label: "↑ Average Outcome Index",
          domain: [0, 100],
        },
        marks: [
          // Confidence interval bars
          Plot.barY(confidenceData, {
            x: "group",
            y1: "lower",
            y2: "upper",
            fill: COLORS.lightGray,
            fillOpacity: 0.5,
          }),

          // Main bars
          Plot.barY(chartData, {
            x: "group",
            y: "outcome",
            fill: (d, i) => i === 0 ? COLORS.success : COLORS.red,
            tip: true,
            title: (d) =>
              `${d.group}\nAvg Outcome: ${formatNumber(d.outcome, 1)}\nGrants: ${d.count}\nAvg Timeliness: ${
                formatNumber(d.timeliness * 100, 0)
              }%`,
          }),

          // Value labels
          Plot.text(chartData, {
            x: "group",
            y: "outcome",
            text: (d) => formatNumber(d.outcome, 1),
            dy: -10,
            fontWeight: "600",
            fontSize: 14,
            fill: COLORS.dark,
          }),

          // Count labels
          Plot.text(chartData, {
            x: "group",
            y: 5,
            text: (d) => `n = ${d.count}`,
            fontSize: 11,
            fill: "white",
            fontWeight: "600",
          }),
        ],
      });

      container.appendChild(chart);

      // Calculate impact
      const outcomeDiff = chartData[0].outcome - chartData[1].outcome;
      const pctDiff = (outcomeDiff / chartData[1].outcome) * 100;

      const insight = document.createElement("p");
      insight.className = "text-muted text-center mt-2 mb-0";
      insight.style.fontSize = "14px";
      insight.innerHTML = `On-time disbursements achieve <strong>${
        formatNumber(outcomeDiff, 1)
      } points</strong> higher outcomes (${
        formatNumber(pctDiff, 0)
      }% improvement). Bars show 95% confidence intervals.`;
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
      container.innerHTML = "";
    },
  };
}
