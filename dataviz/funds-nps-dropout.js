// Chart 11: Funds on time → NPS and dropout
// Two scatter plots showing relationship between timely funding and beneficiary experience

import * as Plot from "@observablehq/plot";
import { COLORS, formatNumber, formatPercent, loadData } from "./core.js";

export default function render(container, props = {}) {
  const {
    data: dataSource = "../data/beneficiary_outcomes.csv",
    width = container.clientWidth,
    height = props.height || 500,
    theme = "light",
    onEvent,
  } = props;

  let charts = [], observer;

  async function init() {
    container.innerHTML =
      '<div class="text-center my-5"><div class="spinner-border text-primary" role="status"></div></div>';

    try {
      const data = typeof dataSource === "string" ? await loadData(dataSource) : dataSource;

      container.innerHTML = "";

      // Create two side-by-side charts
      const row = document.createElement("div");
      row.className = "row g-3";
      container.appendChild(row);

      // NPS chart
      const npsCol = document.createElement("div");
      npsCol.className = "col-md-6";
      row.appendChild(npsCol);

      const npsChart = Plot.plot({
        width: width / 2 - 20,
        height: 350,
        marginBottom: 50,
        marginLeft: 60,
        grid: true,
        x: {
          label: "Funds on time (%) →",
          domain: [0, 1],
          tickFormat: (d) => (d * 100).toFixed(0) + "%",
        },
        y: {
          label: "↑ NPS Score",
          domain: [-100, 100],
        },
        marks: [
          // Sweet spot zone (high NPS, high timeliness)
          Plot.rect([{ x1: 0.75, x2: 1, y1: 50, y2: 100 }], {
            x1: "x1",
            x2: "x2",
            y1: "y1",
            y2: "y2",
            fill: COLORS.success,
            fillOpacity: 0.1,
          }),

          Plot.dot(data.filter((d) => d.nps != null), {
            x: "funds_on_time",
            y: "nps",
            fill: COLORS.teal,
            r: 3,
            fillOpacity: 0.5,
            tip: true,
            title: (d) =>
              `${d.district}\nFunds on time: ${formatPercent(d.funds_on_time)}\nNPS: ${formatNumber(d.nps, 0)}`,
          }),

          // Trend line
          Plot.linearRegressionY(data.filter((d) => d.nps != null), {
            x: "funds_on_time",
            y: "nps",
            stroke: COLORS.red,
            strokeWidth: 2,
          }),

          // Sweet spot label
          Plot.text([{ x: 0.875, y: 90 }], {
            x: "x",
            y: "y",
            text: ["Sweet Spot"],
            fill: COLORS.success,
            fontWeight: "600",
            fontSize: 11,
          }),
        ],
      });
      npsCol.appendChild(npsChart);

      const npsTitle = document.createElement("h6");
      npsTitle.className = "text-center mt-2";
      npsTitle.textContent = "Timeliness → Higher NPS";
      npsCol.appendChild(npsTitle);

      // Dropout chart
      const dropoutCol = document.createElement("div");
      dropoutCol.className = "col-md-6";
      row.appendChild(dropoutCol);

      const dropoutChart = Plot.plot({
        width: width / 2 - 20,
        height: 350,
        marginBottom: 50,
        marginLeft: 60,
        grid: true,
        x: {
          label: "Funds on time (%) →",
          domain: [0, 1],
          tickFormat: (d) => (d * 100).toFixed(0) + "%",
        },
        y: {
          label: "↑ Dropout Rate",
          domain: [0, 0.5],
          tickFormat: (d) => (d * 100).toFixed(0) + "%",
        },
        marks: [
          // Sweet spot zone (low dropout, high timeliness)
          Plot.rect([{ x1: 0.75, x2: 1, y1: 0, y2: 0.1 }], {
            x1: "x1",
            x2: "x2",
            y1: "y1",
            y2: "y2",
            fill: COLORS.success,
            fillOpacity: 0.1,
          }),

          Plot.dot(data.filter((d) => d.dropout_rate != null), {
            x: "funds_on_time",
            y: "dropout_rate",
            fill: COLORS.red,
            r: 3,
            fillOpacity: 0.5,
            tip: true,
            title: (d) =>
              `${d.district}\nFunds on time: ${formatPercent(d.funds_on_time)}\nDropout: ${
                formatPercent(d.dropout_rate)
              }`,
          }),

          // Trend line
          Plot.linearRegressionY(data.filter((d) => d.dropout_rate != null), {
            x: "funds_on_time",
            y: "dropout_rate",
            stroke: COLORS.dark,
            strokeWidth: 2,
          }),

          // Sweet spot label
          Plot.text([{ x: 0.875, y: 0.05 }], {
            x: "x",
            y: "y",
            text: ["Sweet Spot"],
            fill: COLORS.success,
            fontWeight: "600",
            fontSize: 11,
          }),
        ],
      });
      dropoutCol.appendChild(dropoutChart);

      const dropoutTitle = document.createElement("h6");
      dropoutTitle.className = "text-center mt-2";
      dropoutTitle.textContent = "Timeliness → Lower Dropout";
      dropoutCol.appendChild(dropoutTitle);

      charts = [npsChart, dropoutChart];

      const summary = document.createElement("p");
      summary.className = "text-muted text-center mt-3 mb-0";
      summary.style.fontSize = "14px";
      summary.innerHTML =
        `On-time funding strongly correlates with better beneficiary experience. Green zones show "sweet spot" of high timeliness.`;
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
      charts.forEach((c) => c && c.remove && c.remove());
      container.innerHTML = "";
    },
  };
}
