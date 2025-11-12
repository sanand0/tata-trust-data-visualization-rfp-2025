// Chart 4: Money → Reach → Outcomes overview
// Small-multiple bar charts by theme showing budget, beneficiaries, and outcomes

import * as Plot from "@observablehq/plot";
import { COLORS, formatCurrency, formatNumber, groupBy, loadData, meanBy, sumBy, THEME_COLORS } from "./core.js";

export default function render(container, props = {}) {
  const {
    data: dataSource = "../data/grants_portfolio.csv",
    width = container.clientWidth,
    height = props.height || 400,
    theme = "light",
    onEvent,
  } = props;

  let charts = [], observer;

  async function init() {
    container.innerHTML =
      '<div class="text-center my-5"><div class="spinner-border text-primary" role="status"></div></div>';

    try {
      const data = typeof dataSource === "string" ? await loadData(dataSource) : dataSource;

      // Group by theme
      const grouped = groupBy(data, "theme");
      const summaries = Object.entries(grouped).map(([themeName, grants]) => ({
        theme: themeName,
        budget: sumBy(grants, "budget_m_inr"),
        beneficiaries: sumBy(grants, "beneficiaries"),
        outcome: meanBy(grants, "outcome_index"),
        cost_per_beneficiary: sumBy(grants, "budget_m_inr") * 1000000 / sumBy(grants, "beneficiaries"),
        risk: meanBy(grants, "risk_rating"),
      })).sort((a, b) => b.budget - a.budget);

      container.innerHTML = "";

      // Create three side-by-side charts
      const row = document.createElement("div");
      row.className = "row g-3";
      container.appendChild(row);

      // Budget chart
      const budgetCol = document.createElement("div");
      budgetCol.className = "col-md-4";
      row.appendChild(budgetCol);

      const budgetChart = Plot.plot({
        width: width / 3 - 20,
        height: 300,
        marginBottom: 60,
        marginLeft: 100,
        x: {
          label: "Budget (₹M) →",
          grid: true,
        },
        y: {
          label: null,
          domain: summaries.map((d) => d.theme),
        },
        marks: [
          Plot.barX(summaries, {
            x: "budget",
            y: "theme",
            fill: (d) => THEME_COLORS[d.theme] || COLORS.teal,
            tip: true,
            title: (d) => `${d.theme}\nBudget: ${formatCurrency(d.budget, 1)}M`,
          }),
          Plot.text(summaries, {
            x: "budget",
            y: "theme",
            text: (d) => formatNumber(d.budget, 0),
            dx: -10,
            textAnchor: "end",
            fill: "white",
            fontSize: 11,
            fontWeight: "600",
          }),
        ],
      });
      budgetCol.appendChild(budgetChart);

      const budgetTitle = document.createElement("h6");
      budgetTitle.className = "text-center mt-2";
      budgetTitle.textContent = "Budget Allocation";
      budgetCol.appendChild(budgetTitle);

      // Beneficiaries chart
      const benefCol = document.createElement("div");
      benefCol.className = "col-md-4";
      row.appendChild(benefCol);

      const benefChart = Plot.plot({
        width: width / 3 - 20,
        height: 300,
        marginBottom: 60,
        marginLeft: 100,
        x: {
          label: "Beneficiaries →",
          grid: true,
        },
        y: {
          label: null,
          domain: summaries.map((d) => d.theme),
        },
        marks: [
          Plot.barX(summaries, {
            x: "beneficiaries",
            y: "theme",
            fill: (d) => THEME_COLORS[d.theme] || COLORS.teal,
            tip: true,
            title: (d) => `${d.theme}\nBeneficiaries: ${formatNumber(d.beneficiaries, 0)}`,
          }),
          Plot.text(summaries, {
            x: "beneficiaries",
            y: "theme",
            text: (d) => (d.beneficiaries / 1000).toFixed(0) + "K",
            dx: -10,
            textAnchor: "end",
            fill: "white",
            fontSize: 11,
            fontWeight: "600",
          }),
        ],
      });
      benefCol.appendChild(benefChart);

      const benefTitle = document.createElement("h6");
      benefTitle.className = "text-center mt-2";
      benefTitle.textContent = "People Reached";
      benefCol.appendChild(benefTitle);

      // Outcomes chart
      const outcomeCol = document.createElement("div");
      outcomeCol.className = "col-md-4";
      row.appendChild(outcomeCol);

      const outcomeChart = Plot.plot({
        width: width / 3 - 20,
        height: 300,
        marginBottom: 60,
        marginLeft: 100,
        x: {
          label: "Avg Outcome Index →",
          domain: [0, 100],
          grid: true,
        },
        y: {
          label: null,
          domain: summaries.map((d) => d.theme),
        },
        marks: [
          Plot.barX(summaries, {
            x: "outcome",
            y: "theme",
            fill: (d) => THEME_COLORS[d.theme] || COLORS.teal,
            tip: true,
            title: (d) => `${d.theme}\nOutcome: ${formatNumber(d.outcome, 1)}`,
          }),
          Plot.text(summaries, {
            x: "outcome",
            y: "theme",
            text: (d) => formatNumber(d.outcome, 0),
            dx: -10,
            textAnchor: "end",
            fill: "white",
            fontSize: 11,
            fontWeight: "600",
          }),
        ],
      });
      outcomeCol.appendChild(outcomeChart);

      const outcomeTitle = document.createElement("h6");
      outcomeTitle.className = "text-center mt-2";
      outcomeTitle.textContent = "Average Outcomes";
      outcomeCol.appendChild(outcomeTitle);

      charts = [budgetChart, benefChart, outcomeChart];

      // Summary insight
      const topTheme = summaries[0];
      const summary = document.createElement("p");
      summary.className = "text-muted text-center mt-3 mb-0";
      summary.style.fontSize = "14px";
      summary.innerHTML = `<strong>${topTheme.theme}</strong> leads with ${
        formatCurrency(topTheme.budget, 0)
      }M budget, reaching ${formatNumber(topTheme.beneficiaries / 1000, 0)}K beneficiaries at ${
        formatCurrency(topTheme.cost_per_beneficiary, 0)
      }/person.`;
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
