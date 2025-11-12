// Chart 10: Partner performance league table
// Heatmap showing outcomes per rupee, timeliness, and risk by partner

import * as Plot from "@observablehq/plot";
import { COLORS, formatNumber, formatPercent, groupBy, loadData, meanBy, sumBy } from "./core.js";

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
      const data = typeof dataSource === "string" ? await loadData(dataSource) : dataSource;

      // Group by partner
      const grouped = groupBy(data, "partner_name");
      const partnerScores = Object.entries(grouped).map(([name, grants]) => {
        const efficiency = sumBy(grants, (d) => (d.outcome_index * d.beneficiaries))
          / (sumBy(grants, "budget_m_inr") * 1000000);
        const timeliness = meanBy(grants, "disbursement_timeliness");
        const risk = meanBy(grants, "risk_rating");

        return {
          partner: name,
          efficiency_score: Math.min(100, efficiency / 100),
          timeliness_score: timeliness * 100,
          risk_score: (5 - risk) * 20, // Invert risk so higher is better
          combined: (Math.min(100, efficiency / 100) + timeliness * 100 + (5 - risk) * 20) / 3,
        };
      }).sort((a, b) => b.combined - a.combined);

      // Take top 10 and bottom 10
      const topBottom = [...partnerScores.slice(0, 10), ...partnerScores.slice(-10)];

      // Reshape for heatmap
      const heatmapData = topBottom.flatMap((p) => [
        { partner: p.partner, metric: "Efficiency", score: p.efficiency_score, combined: p.combined },
        { partner: p.partner, metric: "Timeliness", score: p.timeliness_score, combined: p.combined },
        { partner: p.partner, metric: "Risk Control", score: p.risk_score, combined: p.combined },
      ]);

      container.innerHTML = "";

      chart = Plot.plot({
        width,
        height,
        marginLeft: 150,
        marginBottom: 50,
        x: {
          label: null,
          domain: ["Efficiency", "Timeliness", "Risk Control"],
        },
        y: {
          label: null,
          domain: topBottom.map((d) => d.partner),
        },
        color: {
          type: "linear",
          domain: [0, 100],
          range: [COLORS.red, COLORS.warning, COLORS.success],
          label: "Score",
        },
        marks: [
          Plot.cell(heatmapData, {
            x: "metric",
            y: "partner",
            fill: "score",
            tip: true,
            title: (d) => `${d.partner}\n${d.metric}: ${formatNumber(d.score, 0)}/100`,
          }),
          Plot.text(heatmapData, {
            x: "metric",
            y: "partner",
            text: (d) => formatNumber(d.score, 0),
            fill: (d) => d.score > 50 ? "white" : COLORS.dark,
            fontSize: 11,
            fontWeight: "600",
          }),
        ],
      });

      container.appendChild(chart);

      const subtitle = document.createElement("p");
      subtitle.className = "text-muted text-center mt-2 mb-0";
      subtitle.style.fontSize = "14px";
      subtitle.innerHTML =
        `Top 10 and bottom 10 partners by combined performance. Green = strong, red = needs attention.`;
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
