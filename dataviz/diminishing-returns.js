// Chart 7: Diminishing returns at large budgets
// Scatter with smoothed curve showing outcome per rupee vs budget size

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { COLORS, formatCurrency, formatNumber, loadData, THEME_COLORS } from "./core.js";

export default function render(container, props = {}) {
  const {
    data: dataSource = "../data/grants_portfolio.csv",
    width = container.clientWidth,
    height = props.height || 450,
    theme = "light",
    onEvent,
  } = props;

  let chart, observer;

  async function init() {
    container.innerHTML =
      '<div class="text-center my-5"><div class="spinner-border text-primary" role="status"></div></div>';

    try {
      const data = typeof dataSource === "string" ? await loadData(dataSource) : dataSource;

      // Calculate outcome per million rupee
      const chartData = data.map((d) => ({
        ...d,
        outcome_per_m_inr: d.beneficiaries > 0 ? (d.outcome_index * d.beneficiaries) / d.budget_m_inr : 0,
      })).filter((d) => d.outcome_per_m_inr > 0);

      // Find diminishing zone (top 20% by budget)
      const budgetThreshold = d3.quantile(chartData.map((d) => d.budget_m_inr).sort((a, b) => a - b), 0.8);

      container.innerHTML = "";

      chart = Plot.plot({
        width,
        height,
        marginBottom: 50,
        marginLeft: 70,
        grid: true,
        x: {
          label: "Grant Budget (₹ Million) →",
          type: "log",
        },
        y: {
          label: "↑ Outcomes per ₹ Million",
          zero: false,
        },
        color: {
          domain: Object.keys(THEME_COLORS),
          range: Object.values(THEME_COLORS),
          legend: true,
        },
        marks: [
          // Diminishing zone shading
          Plot.areaY([
            { x: budgetThreshold, y: 0 },
            { x: d3.max(chartData, (d) => d.budget_m_inr), y: 0 },
            { x: d3.max(chartData, (d) => d.budget_m_inr), y: d3.max(chartData, (d) => d.outcome_per_m_inr) * 1.2 },
            { x: budgetThreshold, y: d3.max(chartData, (d) => d.outcome_per_m_inr) * 1.2 },
          ], {
            x: "x",
            y: "y",
            fill: COLORS.warning,
            fillOpacity: 0.1,
          }),

          // Smoothed trend line
          Plot.line(
            chartData,
            Plot.binX(
              { y: "mean" },
              {
                x: "budget_m_inr",
                y: "outcome_per_m_inr",
                thresholds: 20,
                stroke: COLORS.dark,
                strokeWidth: 2,
                curve: "natural",
              },
            ),
          ),

          // Individual grants
          Plot.dot(chartData, {
            x: "budget_m_inr",
            y: "outcome_per_m_inr",
            fill: "theme",
            r: 4,
            fillOpacity: 0.6,
            stroke: "white",
            strokeWidth: 1,
            tip: true,
            title: (d) =>
              `${d.theme}\nBudget: ${formatCurrency(d.budget_m_inr, 1)}M\nOutcome/₹M: ${
                formatNumber(d.outcome_per_m_inr, 0)
              }\nBeneficiaries: ${formatNumber(d.beneficiaries, 0)}`,
          }),

          // Threshold line
          Plot.ruleX([budgetThreshold], {
            stroke: COLORS.warning,
            strokeWidth: 2,
            strokeDasharray: "4,4",
          }),

          // Label for diminishing zone
          Plot.text([{ x: budgetThreshold * 1.5, y: d3.max(chartData, (d) => d.outcome_per_m_inr) * 1.1 }], {
            x: "x",
            y: "y",
            text: ["Diminishing Returns Zone →"],
            fill: COLORS.warning,
            fontWeight: "600",
            fontSize: 12,
          }),
        ],
      });

      container.appendChild(chart);

      // Find "whales" to split
      const whales = chartData
        .filter((d) => d.budget_m_inr > budgetThreshold)
        .sort((a, b) => a.outcome_per_m_inr - b.outcome_per_m_inr)
        .slice(0, 3);

      const insight = document.createElement("p");
      insight.className = "text-muted text-center mt-2 mb-0";
      insight.style.fontSize = "14px";
      insight.innerHTML = `Large grants (>${
        formatCurrency(budgetThreshold, 0)
      }M) show lower efficiency. Consider splitting ${whales.length} underperforming grants.`;
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
