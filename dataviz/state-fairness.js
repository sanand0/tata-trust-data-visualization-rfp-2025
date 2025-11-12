// Chart 13: State fairness dashboard
// Compare budget share vs high-need population share by state

import * as Plot from "@observablehq/plot";
import { COLORS, formatNumber, formatPercent, groupBy, loadData, sumBy } from "./core.js";

export default function render(container, props = {}) {
  const {
    portfolioSource = "../data/grants_portfolio.csv",
    geoSource = "../data/geo_need_coverage.csv",
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
      const portfolioData = await loadData(portfolioSource);
      const geoData = await loadData(geoSource);

      // Calculate budget share by state
      const totalBudget = sumBy(portfolioData, "budget_m_inr");
      const budgetByState = groupBy(portfolioData, "state");
      const budgetShares = Object.entries(budgetByState).map(([state, grants]) => ({
        state,
        budget_share: sumBy(grants, "budget_m_inr") / totalBudget,
      }));

      // Calculate high-need population share
      const highNeedData = geoData.filter((d) => d.need_decile >= 8);
      const totalHighNeedPop = sumBy(highNeedData, "population");
      const needByState = groupBy(highNeedData, "state");
      const needShares = Object.entries(needByState).map(([state, districts]) => ({
        state,
        need_share: sumBy(districts, "population") / totalHighNeedPop,
      }));

      // Join data
      const stateData = budgetShares.map((bs) => {
        const ns = needShares.find((n) => n.state === bs.state);
        return {
          state: bs.state,
          budget_share: bs.budget_share,
          need_share: ns ? ns.need_share : 0,
          delta: bs.budget_share - (ns ? ns.need_share : 0),
        };
      }).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta)).slice(0, 15);

      // Reshape for grouped bars
      const barData = stateData.flatMap((d) => [
        { state: d.state, type: "Budget Share", value: d.budget_share, delta: d.delta },
        { state: d.state, type: "Need Share", value: d.need_share, delta: d.delta },
      ]);

      container.innerHTML = "";

      chart = Plot.plot({
        width,
        height,
        marginLeft: 120,
        marginBottom: 50,
        x: {
          label: "Share (%) →",
          tickFormat: (d) => (d * 100).toFixed(0) + "%",
          grid: true,
        },
        y: {
          label: null,
          domain: stateData.map((d) => d.state),
        },
        color: {
          domain: ["Budget Share", "Need Share"],
          range: [COLORS.teal, COLORS.red],
          legend: true,
        },
        marks: [
          Plot.barX(barData, {
            x: "value",
            y: "state",
            fill: "type",
            tip: true,
            title: (d) => `${d.state}\n${d.type}: ${formatPercent(d.value, 1)}`,
            channels: { fx: "type" },
            fx: "type",
          }),

          // Delta labels
          Plot.text(stateData, {
            x: (d) => Math.max(d.budget_share, d.need_share) + 0.01,
            y: "state",
            text: (d) => (d.delta > 0 ? "+" : "") + formatPercent(d.delta, 1),
            fill: (d) => d.delta > 0 ? COLORS.success : COLORS.warning,
            fontSize: 11,
            fontWeight: "600",
            dx: 10,
          }),
        ],
      });

      container.appendChild(chart);

      const overAllocated = stateData.filter((d) => d.delta > 0.02).length;
      const underAllocated = stateData.filter((d) => d.delta < -0.02).length;

      const subtitle = document.createElement("p");
      subtitle.className = "text-muted text-center mt-2 mb-0";
      subtitle.style.fontSize = "14px";
      subtitle.innerHTML =
        `${overAllocated} states receive more than their need share, ${underAllocated} receive less. Delta labels show gap.`;
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
      container.innerHTML = "";
    },
  };
}
