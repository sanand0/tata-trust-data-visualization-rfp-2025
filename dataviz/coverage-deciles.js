// Chart 6: Need vs coverage deciles
// Line chart showing coverage by need decile with target line

import * as Plot from "@observablehq/plot";
import { COLORS, formatNumber, groupBy, loadData, meanBy } from "./core.js";

export default function render(container, props = {}) {
  const {
    data: dataSource = "../data/geo_need_coverage.csv",
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

      // Group by need decile
      const grouped = groupBy(data, "need_decile");
      const decileData = Object.entries(grouped).map(([decile, districts]) => ({
        need_decile: parseInt(decile),
        coverage_actual: meanBy(districts, "coverage_actual_per_1k"),
        coverage_target: meanBy(districts, "coverage_target_per_1k"),
        coverage_gap: meanBy(districts, "coverage_gap_per_1k"),
      })).sort((a, b) => a.need_decile - b.need_decile);

      container.innerHTML = "";

      chart = Plot.plot({
        width,
        height,
        marginBottom: 50,
        marginLeft: 60,
        grid: true,
        x: {
          label: "Need Decile (1 = lowest need, 10 = highest need) →",
          domain: [1, 10],
          ticks: 10,
        },
        y: {
          label: "↑ Coverage (per 1,000 population)",
          zero: true,
        },
        marks: [
          // Gap area
          Plot.areaY(decileData, {
            x: "need_decile",
            y1: "coverage_actual",
            y2: "coverage_target",
            fill: COLORS.red,
            fillOpacity: 0.2,
          }),

          // Target line
          Plot.line(decileData, {
            x: "need_decile",
            y: "coverage_target",
            stroke: COLORS.mediumGray,
            strokeWidth: 2,
            strokeDasharray: "4,4",
            marker: "dot",
          }),

          // Actual coverage line
          Plot.line(decileData, {
            x: "need_decile",
            y: "coverage_actual",
            stroke: COLORS.teal,
            strokeWidth: 3,
            marker: "dot",
            tip: true,
            title: (d) =>
              `Decile ${d.need_decile}\nActual: ${formatNumber(d.coverage_actual, 2)}/1K\nTarget: ${
                formatNumber(d.coverage_target, 2)
              }/1K\nGap: ${formatNumber(d.coverage_gap, 2)}/1K`,
          }),

          // Legend text annotations
          Plot.text([decileData[decileData.length - 1]], {
            x: "need_decile",
            y: "coverage_actual",
            text: ["Actual"],
            dx: 20,
            dy: -10,
            fill: COLORS.teal,
            fontWeight: "600",
            fontSize: 12,
          }),
          Plot.text([decileData[decileData.length - 1]], {
            x: "need_decile",
            y: "coverage_target",
            text: ["Target"],
            dx: 20,
            dy: 10,
            fill: COLORS.mediumGray,
            fontWeight: "600",
            fontSize: 12,
          }),
        ],
      });

      container.appendChild(chart);

      // Insight
      const highNeedData = decileData.filter((d) => d.need_decile >= 8);
      const avgGap = highNeedData.reduce((sum, d) => sum + d.coverage_gap, 0) / highNeedData.length;

      const insight = document.createElement("p");
      insight.className = "text-muted text-center mt-2 mb-0";
      insight.style.fontSize = "14px";
      insight.innerHTML = `High-need districts (deciles 8-10) have an average coverage gap of <strong>${
        formatNumber(avgGap, 2)
      }/1K</strong>. Red area shows shortfall.`;
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
