// Chart 15: Monsoon effect and pre-monsoon outreach
// Paired bars comparing outcomes and dropout across seasons

import * as Plot from "@observablehq/plot";
import { loadData, formatPercent, formatNumber, COLORS } from "./core.js";

export default function render(container, props = {}) {
  const {
    data: dataSource = '../data/beneficiary_outcomes.csv',
    width = container.clientWidth,
    height = props.height || 500,
    theme = 'light',
    onEvent
  } = props;

  let chart, observer;

  async function init() {
    container.innerHTML = '<div class="text-center my-5"><div class="spinner-border text-primary" role="status"></div></div>';

    try {
      const data = typeof dataSource === 'string' ? await loadData(dataSource) : dataSource;

      // Parse month and determine season
      const dataWithSeason = data.map(d => {
        const month = new Date(d.month + '-01').getMonth() + 1; // 1-12
        const isMonsoon = month >= 6 && month <= 9;
        return { ...d, isMonsoon, season: isMonsoon ? 'Monsoon' : 'Non-Monsoon' };
      });

      // Calculate averages by season
      const monsoonData = dataWithSeason.filter(d => d.isMonsoon);
      const nonMonsoonData = dataWithSeason.filter(d => !d.isMonsoon);

      const avgMonsoonOutcome = monsoonData.reduce((sum, d) => sum + d.outcome_score, 0) / monsoonData.length;
      const avgNonMonsoonOutcome = nonMonsoonData.reduce((sum, d) => sum + d.outcome_score, 0) / nonMonsoonData.length;

      const avgMonsoonDropout = monsoonData.reduce((sum, d) => sum + d.dropout_rate, 0) / monsoonData.length;
      const avgNonMonsoonDropout = nonMonsoonData.reduce((sum, d) => sum + d.dropout_rate, 0) / nonMonsoonData.length;

      // Pre-monsoon outreach effect
      const withPreMonsoon = dataWithSeason.filter(d => d.outreach_pre_monsoon === 1);
      const withoutPreMonsoon = dataWithSeason.filter(d => d.outreach_pre_monsoon === 0);

      const avgWithPreDropout = withPreMonsoon.length > 0 ?
        withPreMonsoon.reduce((sum, d) => sum + d.dropout_rate, 0) / withPreMonsoon.length : 0;
      const avgWithoutPreDropout = withoutPreMonsoon.length > 0 ?
        withoutPreMonsoon.reduce((sum, d) => sum + d.dropout_rate, 0) / withoutPreMonsoon.length : 0;

      const chartData = [
        { metric: 'Outcome Score', season: 'Non-Monsoon', value: avgNonMonsoonOutcome, type: 'Outcome' },
        { metric: 'Outcome Score', season: 'Monsoon', value: avgMonsoonOutcome, type: 'Outcome' },
        { metric: 'Dropout Rate (%)', season: 'Non-Monsoon', value: avgNonMonsoonDropout * 100, type: 'Dropout' },
        { metric: 'Dropout Rate (%)', season: 'Monsoon', value: avgMonsoonDropout * 100, type: 'Dropout' },
        { metric: 'Dropout w/o Pre-Monsoon', season: 'Effect', value: avgWithoutPreDropout * 100, type: 'Outreach' },
        { metric: 'Dropout w/ Pre-Monsoon', season: 'Effect', value: avgWithPreDropout * 100, type: 'Outreach' }
      ];

      container.innerHTML = '';

      chart = Plot.plot({
        width,
        height,
        marginBottom: 80,
        marginLeft: 60,
        x: {
          label: null,
          domain: chartData.map(d => d.metric)
        },
        y: {
          label: "↑ Value",
          grid: true
        },
        color: {
          domain: ['Non-Monsoon', 'Monsoon', 'Effect'],
          range: [COLORS.teal, COLORS.red, COLORS.purple],
          legend: true
        },
        fx: {
          domain: ['Outcome', 'Dropout', 'Outreach'],
          label: null
        },
        marks: [
          Plot.barY(chartData, {
            x: "metric",
            y: "value",
            fill: "season",
            fx: "type",
            tip: true,
            title: d => `${d.metric}\n${d.season}: ${formatNumber(d.value, 1)}`
          }),

          Plot.text(chartData, {
            x: "metric",
            y: "value",
            text: d => formatNumber(d.value, 0),
            dy: -5,
            fontSize: 11,
            fontWeight: "600",
            fill: COLORS.dark,
            fx: "type"
          })
        ]
      });

      container.appendChild(chart);

      const outcomeDrop = ((avgMonsoonOutcome - avgNonMonsoonOutcome) / avgNonMonsoonOutcome * 100);
      const dropoutLift = avgWithoutPreDropout - avgWithPreDropout;

      const subtitle = document.createElement('p');
      subtitle.className = 'text-muted text-center mt-2 mb-0';
      subtitle.style.fontSize = '14px';
      subtitle.innerHTML = `Monsoon reduces outcomes by ${formatNumber(Math.abs(outcomeDrop), 1)}%, but pre-monsoon outreach cuts dropout by ${formatPercent(dropoutLift, 1)}.`;
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
      container.innerHTML = '';
    }
  };
}
