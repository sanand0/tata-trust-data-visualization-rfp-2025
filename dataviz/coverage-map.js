// Chart 2: Targeting need - coverage vs deprivation (district)
// Since we don't have map geometries, we'll create a bivariate scatter with color encoding

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { COLORS, formatNumber, formatPercent, loadData } from "./core.js";

export default function render(container, props = {}) {
  const {
    data: dataSource = "../data/geo_need_coverage.csv",
    width = container.clientWidth,
    height = props.height || 500,
    theme = "light",
    onEvent,
  } = props;

  let chart, observer;

  async function init() {
    container.innerHTML =
      '<div class="text-center my-5"><div class="spinner-border text-primary" role="status"></div></div>';

    try {
      const data = typeof dataSource === "string" ? await loadData(dataSource) : dataSource;

      // Bivariate color scale (deprivation vs coverage)
      const deprivationExtent = d3.extent(data, (d) => d.deprivation_score);
      const coverageExtent = d3.extent(data, (d) => d.coverage_actual_per_1k);

      // Create bivariate color function
      function getBivariateColor(deprivation, coverage) {
        const depNorm = (deprivation - deprivationExtent[0]) / (deprivationExtent[1] - deprivationExtent[0]);
        const covNorm = (coverage - coverageExtent[0]) / (coverageExtent[1] - coverageExtent[0]);

        // Low deprivation, low coverage = light
        // High deprivation, low coverage = red (problem!)
        // Low deprivation, high coverage = blue
        // High deprivation, high coverage = green (good!)

        if (depNorm > 0.5 && covNorm < 0.5) return COLORS.red; // High need, low coverage - BAD
        if (depNorm > 0.5 && covNorm > 0.5) return COLORS.success; // High need, high coverage - GOOD
        if (depNorm < 0.5 && covNorm > 0.5) return COLORS.lightBlue; // Low need, high coverage
        return COLORS.mediumGray; // Low need, low coverage
      }

      const chartData = data.map((d) => ({
        ...d,
        color: getBivariateColor(d.deprivation_score, d.coverage_actual_per_1k),
      }));

      container.innerHTML = "";

      chart = Plot.plot({
        width,
        height,
        marginLeft: 70,
        marginBottom: 60,
        marginRight: 20,
        grid: true,
        x: {
          label: "Coverage (per 1,000 population) →",
          labelAnchor: "center",
        },
        y: {
          label: "↑ Deprivation Score",
          labelAnchor: "center",
        },
        marks: [
          Plot.dot(chartData, {
            x: "coverage_actual_per_1k",
            y: "deprivation_score",
            fill: "color",
            r: 5,
            fillOpacity: 0.7,
            stroke: "white",
            strokeWidth: 1,
            title: (d) =>
              `${d.district}, ${d.state}\nDeprivation: ${formatNumber(d.deprivation_score, 1)}\nCoverage: ${
                formatNumber(d.coverage_actual_per_1k, 2)
              }/1K\nGap: ${formatNumber(d.coverage_gap_per_1k, 2)}/1K`,
            tip: true,
          }),
        ],
      });

      container.appendChild(chart);

      // Legend
      const legend = document.createElement("div");
      legend.className = "mt-3";
      legend.style.fontSize = "13px";
      legend.innerHTML = `
        <div class="d-flex justify-content-center gap-3 flex-wrap">
          <div><span style="display:inline-block;width:12px;height:12px;background:${COLORS.red};border-radius:50%;margin-right:4px;"></span> High need, low coverage</div>
          <div><span style="display:inline-block;width:12px;height:12px;background:${COLORS.success};border-radius:50%;margin-right:4px;"></span> High need, high coverage</div>
          <div><span style="display:inline-block;width:12px;height:12px;background:${COLORS.lightBlue};border-radius:50%;margin-right:4px;"></span> Low need, high coverage</div>
          <div><span style="display:inline-block;width:12px;height:12px;background:${COLORS.mediumGray};border-radius:50%;margin-right:4px;"></span> Low need, low coverage</div>
        </div>
      `;
      container.appendChild(legend);

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
