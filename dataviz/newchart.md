# New Chart Template for Tata Trusts Data Visualizations

This document provides a comprehensive template and guide for creating new chart modules that integrate seamlessly with the existing data story and dashboard.

## Overview

Each chart is an **independent ES module** that exports a `render(container, props)` function. Charts are:

- **Responsive**: Adapt to container size using ResizeObserver
- **Reusable**: Can be used in both data story and dashboard
- **Interactive**: Support tooltips, highlighting, and optional filters
- **Themeable**: Follow Tata Trusts brand guidelines
- **Accessible**: Meet WCAG 2.1 AA standards

## Standard Chart Interface

```javascript
/**
 * Renders a chart into a container
 * @param {HTMLElement} container - The DOM element to render into
 * @param {Object} props - Configuration and data
 * @param {string|Array} props.data - CSV path or pre-loaded data array
 * @param {number} props.width - Chart width (defaults to container width)
 * @param {number} props.height - Chart height (default: 500px)
 * @param {string} props.theme - Theme: 'light' or 'dark' (future use)
 * @param {Function} props.onEvent - Event callback (future use)
 * @returns {Object} Control object with { update, resize, destroy }
 */
export default function render(container, props = {}) {
  // Implementation
}
```

## File Naming Convention

Use descriptive names without numbers:

- ✅ **Good**: `efficiency-scatter.js`, `partner-performance.js`, `monsoon-effect.js`
- ❌ **Bad**: `chart1.js`, `visualization-1.js`, `chart-new.js`

## Template Code

```javascript
// Chart: [Descriptive Name]
// Description: [What this chart shows and why it's valuable]
// Data source: [Primary CSV file used]

import * as Plot from "@observablehq/plot";
import { loadData, formatCurrency, formatNumber, formatPercent, COLORS } from "./core.js";

export default function render(container, props = {}) {
  const {
    data: dataSource = '../data/grants_portfolio.csv',  // Default data source
    width = container.clientWidth,
    height = props.height || 500,  // Standard height
    theme = 'light',               // Reserved for future use
    onEvent                         // Reserved for future use
  } = props;

  let chart, observer;

  async function init() {
    // 1. Show loading spinner
    container.innerHTML = '<div class="text-center my-5"><div class="spinner-border text-primary" role="status"></div></div>';

    try {
      // 2. Load and process data
      const data = typeof dataSource === 'string' ? await loadData(dataSource) : dataSource;

      // 3. Filter/transform data as needed
      const processedData = data.filter(d => /* your filters */)
                                .map(d => ({
                                  // Transform as needed
                                  ...d,
                                  computed_field: d.field1 / d.field2
                                }));

      // 4. Clear loading spinner
      container.innerHTML = '';

      // 5. Create the chart using Observable Plot
      chart = Plot.plot({
        width,
        height,
        marginBottom: 50,
        marginLeft: 60,
        marginRight: 20,
        marginTop: 20,

        // Axes configuration
        x: {
          label: "X-axis label →",
          grid: false,
          tickFormat: d => formatNumber(d, 0)
        },
        y: {
          label: "↑ Y-axis label",
          grid: true,
          tickFormat: d => formatPercent(d)
        },

        // Color scale (if needed)
        color: {
          domain: ['Category A', 'Category B'],
          range: [COLORS.teal, COLORS.red],
          legend: true
        },

        // Marks (the visual elements)
        marks: [
          // Example: scatter plot
          Plot.dot(processedData, {
            x: "x_field",
            y: "y_field",
            fill: "category",
            r: 4,
            fillOpacity: 0.6,
            tip: true,
            title: d => `${d.name}\\n${formatNumber(d.value)}`
          }),

          // Example: line
          Plot.line(processedData, {
            x: "x_field",
            y: "y_field",
            stroke: COLORS.dark,
            strokeWidth: 2
          }),

          // Example: annotations
          Plot.text([{ x: 0.5, y: 0.5, text: "Important note" }], {
            x: "x",
            y: "y",
            text: "text",
            fill: COLORS.gray,
            fontSize: 12
          })
        ]
      });

      // 6. Add chart to container
      container.appendChild(chart);

      // 7. Optional: Add subtitle/caption
      const caption = document.createElement('p');
      caption.className = 'text-muted text-center mt-2 mb-0';
      caption.style.fontSize = '14px';
      caption.innerHTML = `Key insight: <strong>statistic</strong>. Data from 2020-21.`;
      container.appendChild(caption);

      // 8. Set up responsive resizing
      observer = new ResizeObserver(() => {
        if (container.clientWidth !== width) {
          render(container, { ...props, width: container.clientWidth });
        }
      });
      observer.observe(container);

    } catch (error) {
      container.innerHTML = `<div class="alert alert-danger">Error loading chart: ${error.message}</div>`;
      console.error('Chart error:', error);
    }
  }

  // Start initialization
  init();

  // Return control interface
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
```

## Available Utilities from core.js

### Data Loading

```javascript
const data = await loadData("../data/grants_portfolio.csv"); // Returns array of objects
```

### Formatting Functions

```javascript
formatCurrency(1500000, 2); // "₹1.50M"
formatNumber(1234.567, 1); // "1,234.6"
formatPercent(0.456, 1); // "45.6%"
```

### Aggregation Functions

```javascript
sumBy(data, "budget_m_inr"); // Sum of budget column
meanBy(data, "outcome_index"); // Mean of outcome column
groupBy(data, "theme"); // Group by theme: { Health: [...], Education: [...] }
```

### Colors (Tata Trusts Brand)

```javascript
COLORS.dark; // '#23272b'  - Primary dark
COLORS.lightBlue; // '#9fcdff'  - Accent blue
COLORS.red; // '#d0362d'  - Alert/danger
COLORS.teal; // '#17a2b8'  - Primary teal
COLORS.success; // '#28a745'  - Success green
COLORS.purple; // '#6f42c1'  - Secondary purple
COLORS.orange; // '#fd7e14'  - Highlight orange
COLORS.warning; // '#ffc107'  - Warning yellow
COLORS.gray; // '#6c757d'  - Muted gray
```

### UI Functions

```javascript
toggleFullscreen(element); // Toggle fullscreen mode
downloadChart(container, "chart.png"); // Download chart as PNG
```

## Data Sources

Available CSV files in `../data/`:

1. **`grants_portfolio.csv`** - Main grant data
   - Fields: grant_id, theme, state, district, partner_id, budget_m_inr, beneficiaries, outcome_index, risk_rating, partner_capacity, budget_variance_pct, etc.

2. **`beneficiary_outcomes.csv`** - Monthly outcome tracking
   - Fields: grant_id, month, district, theme, beneficiaries, outcome_score, dropout_rate, female_pct, outreach_pre_monsoon, etc.

3. **`geo_need_coverage.csv`** - Geographic need/coverage
   - Fields: state, district, need_decile, deprivation_index, coverage_per_1k, coverage_gap_per_1k, population_high_need, urban_spend_anomaly, etc.

4. **`monitoring_quality.csv`** - Operational metrics
   - Fields: grant_id, monitoring_score, timeliness_days, funds_on_time, nps_score, etc.

5. **`grant_tranches.csv`** - Disbursement tracking
   - Fields: grant_id, tranche_number, amount_m_inr, planned_date, actual_date, delay_days, etc.

## Chart Types & Examples

### 1. Scatter Plot

Use for: Correlations, outliers, quadrant analysis

```javascript
Plot.dot(data, { x: "field1", y: "field2", fill: "category" });
```

### 2. Bar Chart

Use for: Comparisons, rankings, distributions

```javascript
Plot.barY(data, { x: "category", y: "value", fill: COLORS.teal });
```

### 3. Line Chart

Use for: Trends over time, cumulative patterns

```javascript
Plot.line(data, { x: "month", y: "value", stroke: COLORS.dark });
```

### 4. Area Chart

Use for: Gaps, ranges, cumulative areas

```javascript
Plot.areaY(data, { x: "x", y1: "min", y2: "max", fill: COLORS.lightBlue });
```

### 5. Heatmap

Use for: Matrix data, correlations, calendars

```javascript
Plot.cell(data, { x: "col", y: "row", fill: "value" });
```

### 6. Box Plot

Use for: Distributions, outliers, statistical summaries

```javascript
Plot.boxY(data, { x: "category", y: "value" });
```

## Best Practices

### 1. **Standardize Heights**

Always use `height = props.height || 500` for consistency across dashboard.

### 2. **Add Tooltips**

Include `tip: true` or custom `title` for interactivity:

```javascript
Plot.dot(data, {
  tip: true,
  title: (d) => `${d.name}\nValue: ${formatNumber(d.value)}`,
});
```

### 3. **Use Semantic Colors**

- **Teal**: Primary/neutral metrics
- **Red**: Alerts, risks, negative trends
- **Green**: Success, positive outcomes
- **Purple**: Secondary categories
- **Orange**: Highlights, anomalies

### 4. **Label Axes Clearly**

```javascript
x: {
  label: "Budget (₹M) →";
} // Horizontal axis with arrow
y: {
  label: "↑ Outcome Score";
} // Vertical axis with arrow
```

### 5. **Handle Missing Data**

```javascript
const cleanData = data.filter((d) =>
  d.field1 != null
  && d.field2 != null
  && !isNaN(d.field1)
  && !isNaN(d.field2)
);
```

### 6. **Add Context**

Include a caption/subtitle explaining the key insight:

```javascript
const caption = document.createElement("p");
caption.className = "text-muted text-center mt-2 mb-0";
caption.style.fontSize = "14px";
caption.innerHTML = `Finding: <strong>X% increase</strong> in Y when Z.`;
container.appendChild(caption);
```

### 7. **Test Responsiveness**

Charts automatically resize, but test at different widths:

- Desktop: 1200px+
- Tablet: 768-1199px
- Mobile: <768px

## Integration Steps

### Step 1: Create the Chart File

Save as `dataviz/descriptive-name.js`

### Step 2: Add to Dashboard

Edit `dashboard.html`:

```html
<!-- Import -->
<script type="module">
  import chartNew from './descriptive-name.js';
  // ... other imports

  // Initialize
  const chartInstances = {
    chartNew: null,
    // ... others
  };

  async function initDashboard() {
    chartInstances.chartNew = chartNew(document.getElementById('chartNew'));
    // ... others
  }
</script>

<!-- Add card in appropriate section -->
<div class="dashboard-card">
  <div class="card-header">
    <div>
      <h5 class="card-title">Chart Title</h5>
      <p class="card-subtitle">Brief description</p>
    </div>
    <div class="card-actions">
      <button class="btn-icon" title="Download"><i class="bi bi-download"></i></button>
      <button class="btn-icon" title="Fullscreen"><i class="bi bi-arrows-fullscreen"></i></button>
    </div>
  </div>
  <div id="chartNew" class="chart-container"></div>
</div>
```

### Step 3: Add to Data Story (Optional)

Edit `index.html`:

```html
<!-- Import -->
<script type="module">
  import chartNew from './descriptive-name.js';
  // ... initialize where appropriate in the narrative
  chartNew(document.getElementById('chartNew'));
</script>

<!-- Add container in narrative -->
<div id="chartNew" class="my-5"></div>
```

### Step 4: Update Filters (If Applicable)

If chart needs to respond to filters in dashboard:

```javascript
// In dashboard.html filter handler
if (chartInstances.chartNew) {
  chartInstances.chartNew.update({
    data: filteredData,
    height: chartHeight,
  });
}
```

### Step 5: Test

1. Open `dashboard.html` in browser
2. Test on different screen sizes
3. Test download and fullscreen buttons
4. Test with filters (if applicable)
5. Check console for errors

## Performance Tips

1. **Limit data points**: For >1000 points, consider aggregation
2. **Debounce resize**: ResizeObserver handles this automatically
3. **Cache data**: Use the data prop to pass pre-loaded data
4. **Optimize marks**: Use `r: 2` for large scatter plots instead of `r: 5`

## Accessibility Checklist

- [ ] Color contrast meets WCAG AA (use COLORS from core.js)
- [ ] Tooltips provide context (use `tip: true`)
- [ ] Axes are clearly labeled
- [ ] Caption explains the insight
- [ ] Works without color alone (use patterns, shapes)
- [ ] Keyboard navigable (Plot handles this)

## Common Patterns

### Multi-panel charts (faceting)

```javascript
fx: {
  domain: ['Panel 1', 'Panel 2', 'Panel 3'],
  label: null
}
```

### Annotations

```javascript
Plot.text([{ x: value, y: value, text: "annotation" }], {
  x: "x",
  y: "y",
  text: "text",
  fontSize: 11,
  fill: COLORS.gray,
});
```

### Highlight specific points

```javascript
Plot.dot(data, {
  fill: (d) => d.is_outlier ? COLORS.red : COLORS.teal,
  r: (d) => d.is_outlier ? 6 : 3,
});
```

### Add trend lines

```javascript
Plot.linearRegressionY(data, {
  x: "x",
  y: "y",
  stroke: COLORS.red,
  strokeWidth: 2,
  strokeDasharray: "4,4",
});
```

## Questions?

- Check existing charts in the `dataviz/` folder for examples
- Review Observable Plot docs: https://observablehq.com/plot/
- See D3.js docs for advanced transforms: https://d3js.org/

## License

Created for Tata Trusts RFP submission.
© 2025 Tata Trusts
