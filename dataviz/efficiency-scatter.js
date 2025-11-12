// Chart 1: Outcomes per rupee and beneficiaries per rupee
// Scatter plot with beneficiaries per ₹ on x-axis and outcomes per ₹ on y-axis
// Size by budget, color by theme, quadrant lines at medians

import * as Plot from "@observablehq/plot";
import { COLORS, formatCurrency, formatNumber, groupBy, loadData, medianBy, sumBy, THEME_COLORS } from "./core.js";

export default function render(container, props = {}) {
  const {
    data: dataSource = "../data/grants_portfolio.csv",
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
      const rawData = typeof dataSource === "string" ? await loadData(dataSource) : dataSource;

      // Compute metrics per theme
      const grouped = groupBy(rawData, "theme");
      const chartData = Object.entries(grouped).map(([theme, grants]) => {
        const totalBudget = sumBy(grants, "budget_m_inr") * 1000000; // Convert to INR
        const totalBeneficiaries = sumBy(grants, "beneficiaries");
        const totalOutcome = sumBy(grants, (d) => (d.outcome_index || 0) * (d.beneficiaries || 0));

        return {
          theme,
          beneficiaries_per_m_inr: totalBeneficiaries / (totalBudget / 1000000),
          outcomes_per_m_inr: totalOutcome / (totalBudget / 1000000),
          budget_m_inr: totalBudget / 1000000,
          count: grants.length,
        };
      });

      // Calculate budget range for dynamic radius scaling
      const maxBudget = Math.max(...chartData.map((d) => d.budget_m_inr));
      const minBudget = Math.min(...chartData.map((d) => d.budget_m_inr));
      const budgetRange = maxBudget - minBudget || 1; // Avoid division by zero

      // Add computed radius to each data point (20-60px based on budget)
      chartData.forEach((d) => {
        const normalized = (d.budget_m_inr - minBudget) / budgetRange;
        d.radius = 20 + normalized * 40;
      });

      // Debug: Log radius values to verify scaling
      console.log("Efficiency Scatter - Budget Range:", { minBudget, maxBudget, budgetRange });
      console.log(
        "Efficiency Scatter - Radius Values:",
        chartData.map((d) => ({
          theme: d.theme,
          budget: d.budget_m_inr.toFixed(1),
          radius: d.radius.toFixed(1),
        })),
      );

      // Calculate medians for quadrant lines
      const xMedian = medianBy(chartData, "beneficiaries_per_m_inr");
      const yMedian = medianBy(chartData, "outcomes_per_m_inr");

      container.innerHTML = "";

      // Create chart using Observable Plot
      chart = Plot.plot({
        width,
        height,
        marginLeft: 60,
        marginBottom: 60,
        marginRight: 20,
        grid: true,
        x: {
          label: "Beneficiaries per million ₹ →",
          labelAnchor: "center",
        },
        y: {
          label: "↑ Outcomes per million ₹",
          labelAnchor: "center",
        },
        r: {
          type: "identity", // Disable default sqrt scale, use values directly
          range: [20, 60],
        },
        color: {
          domain: Object.keys(THEME_COLORS),
          range: Object.values(THEME_COLORS),
          legend: true,
        },
        marks: [
          // Quadrant lines
          Plot.ruleX([xMedian], { stroke: COLORS.mediumGray, strokeDasharray: "4,4", strokeWidth: 1 }),
          Plot.ruleY([yMedian], { stroke: COLORS.mediumGray, strokeDasharray: "4,4", strokeWidth: 1 }),

          // Points with dynamic radius scaling (20-60px based on budget)
          Plot.dot(chartData, {
            x: "beneficiaries_per_m_inr",
            y: "outcomes_per_m_inr",
            r: "radius", // Use pre-computed radius field
            fill: "theme",
            fillOpacity: 0.7,
            stroke: "white",
            strokeWidth: 2,
            title: (d) =>
              `${d.theme}\nBeneficiaries/₹M: ${formatNumber(d.beneficiaries_per_m_inr, 0)}\nOutcomes/₹M: ${
                formatNumber(d.outcomes_per_m_inr, 0)
              }\nBudget: ${formatCurrency(d.budget_m_inr, 1)}M\nGrants: ${d.count}`,
            tip: true,
          }),

          // Labels for all themes
          Plot.text(chartData, {
            x: "beneficiaries_per_m_inr",
            y: "outcomes_per_m_inr",
            text: "theme",
            dy: -25,
            fontSize: 12,
            fontWeight: "600",
            fill: COLORS.dark,
          }),
        ],
      });

      container.appendChild(chart);

      // Add subtitle
      const subtitle = document.createElement("p");
      subtitle.className = "text-muted text-center mt-2 mb-0";
      subtitle.style.fontSize = "14px";
      subtitle.innerHTML =
        `Median lines divide themes into efficiency quadrants. Top-right: high reach & outcomes. Size = budget.`;
      container.appendChild(subtitle);

      // Setup resize observer
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
