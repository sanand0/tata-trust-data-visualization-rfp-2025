# Tata Trusts Data Visualizations

Interactive data story and dashboard showcasing 16 comprehensive analyses from the portfolio data, including all top-ranked (#1 and #2) and high-value (4.0-4.2) analyses.

## Files

### Core Files

- **`core.js`** - Shared utilities, data loading, formatting functions, and constants
- **`index.html`** - New York Times-style scrollytelling data story
- **`dashboard.html`** - Interactive dashboard with filters and all visualizations

### Chart Modules (ESM)

Each chart is an independent module that exports a `render(container, props)` function:

**Rank #1 Analyses (Overall: 5.0):**

1. **`efficiency-scatter.js`** - Outcomes per rupee and beneficiaries per rupee (efficiency quadrants with dynamic circle sizing)
2. **`coverage-map.js`** - Targeting need: coverage vs deprivation (bivariate scatter)
3. **`underserved.js`** - Underserved pockets list (ranked bar chart)

**Rank #2 Analyses (Overall: 4.6):**
4. **`overview.js`** - Money → Reach → Outcomes overview (small multiples)
5. **`kpi-waterfall.js`** - KPI attainment and its drivers (waterfall chart)
6. **`coverage-deciles.js`** - Need vs coverage deciles (line chart with gap area)
7. **`diminishing-returns.js`** - Diminishing returns at large budgets (scatter with trend)
8. **`timeliness-impact.js`** - Timeliness ripple effect (bar chart with confidence intervals)
9. **`coverage-impact.js`** - High-need coverage impact (cumulative impact curve)

**Overall 4.0-4.2 Analyses:**
10. **`partner-performance.js`** - Partner performance league table (traffic-light heatmap)
11. **`funds-nps-dropout.js`** - Funds on time → NPS & dropout (dual scatter with sweet spots)
12. **`urban-anomalies.js`** - Urban spend anomalies (scatter with anomaly highlighting)
13. **`state-fairness.js`** - State fairness dashboard (grouped bars with delta labels)
14. **`women-dropout.js`** - Women in skilling & dropout (binned scatter with trend)
15. **`monsoon-effect.js`** - Monsoon effect & pre-monsoon outreach (faceted paired bars)
16. **`capacity-variance.js`** - Capacity lowers variance & risk (side-by-side boxplots)

## Features

### Data Story (`index.html`)

- Beautiful scrollytelling narrative with 6 thematic sections
- 16 visualizations seamlessly woven into the narrative
- Sections cover: Overview, Efficiency, Targeting, Operations, Partners, Conclusion
- Responsive design following Tata Trusts brand guidelines
- Smooth scrolling and professional typography
- Stat cards and pull quotes for key insights
- Fixed navbar with working dashboard link

### Dashboard (`dashboard.html`)

- Modern dashboard layout with sidebar navigation
- **Functional data filtering** by theme, state, and need decile
- **Fullscreen toggle** for all charts
- **PNG download** functionality for all charts
- Summary stat cards that update dynamically with filters
- All 16 visualizations organized by category:
  - Efficiency & Performance (3 charts)
  - Geographic Targeting & Equity (4 charts)
  - Operational Excellence (2 charts)
  - Additional Strategic Insights (7 charts)
- Download and fullscreen buttons for every chart
- Fully responsive mobile-friendly design

### Charts

- Built with Observable Plot and D3.js
- Fully responsive with ResizeObserver
- **Standardized height (500px)** across all charts
- **Enhanced efficiency scatter** with dynamic circle scaling (20-60px)
- Interactive tooltips with contextual information
- Accessible color schemes meeting WCAG AA standards
- Professional styling following Tata Trusts brand guidelines

## How to Run

### Local Development

1. **Python HTTP Server** (simplest):
   ```bash
   cd dataviz
   python3 -m http.server 8000
   ```
   Open http://localhost:8000

2. **Node.js HTTP Server**:
   ```bash
   cd dataviz
   npx http-server -p 8000
   ```
   Open http://localhost:8000

3. **VS Code Live Server**:
   - Right-click `index.html`
   - Select "Open with Live Server"

### Viewing the Visualizations

- **Data Story**: Open `index.html` for the narrative experience
- **Dashboard**: Open `dashboard.html` for interactive exploration

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styles following Tata Trusts brand
- **Bootstrap 5.3.3** - Responsive layout and components
- **JavaScript ES2022+** - Modern ESM modules
- **Observable Plot** - Declarative chart rendering
- **D3.js v7** - Data manipulation and advanced visualizations
- **Bootstrap Icons** - UI icons

## Data Sources

Charts load data from `../data/`:

- `grants_portfolio.csv` - Grants, budgets, outcomes, partners
- `beneficiary_outcomes.csv` - District-month outcomes data
- `geo_need_coverage.csv` - District-level need and coverage
- `monitoring_quality.csv` - Operational monitoring metrics
- `grant_tranches.csv` - Tranche-level disbursement data

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari 14+, Chrome Mobile 90+)

## Customization

### Changing Colors

Edit `core.js`:

```javascript
export const COLORS = {
  dark: "#23272b",
  lightBlue: "#9fcdff",
  red: "#d0362d",
  // ...
};
```

### Modifying Charts

Each chart module can be updated independently. The `render()` function signature:

```javascript
export default function render(container, props) {
  // Returns { update, resize, destroy }
}
```

### Adding New Charts

1. Create a new `chart-name.js` module (descriptive name without numbers)
2. Import and use in `index.html` or `dashboard.html`
3. Follow the existing pattern for consistency
4. See `newchart.md` for a template and best practices

## Performance

- Lazy loading with spinners
- Efficient data caching in `core.js`
- ResizeObserver for responsive updates
- Optimized SVG rendering

## Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML
- Keyboard navigation
- Screen reader friendly
- Color contrast meets guidelines

## All 16 Analyses

The visualizations implement the top-ranked and high-value analyses from `analyses.md`:

**Rank #1 (Overall 5.0):**

1. Outcomes per rupee and beneficiaries per rupee
2. Targeting need: coverage vs deprivation
3. Underserved pockets list

**Rank #2 (Overall 4.6):**
4. Money → Reach → Outcomes overview
5. KPI attainment and its drivers
6. Need vs coverage deciles
7. Diminishing returns at large budgets
8. Timeliness ripple effect
9. High-need but low-coverage districts drive missed outcomes

**Overall 4.0-4.2:**
10. Partner performance league table (4.0)
11. Funds on time → NPS and dropout (4.0)
12. Urban spend anomalies (4.0)
13. State fairness dashboard (4.0)
14. Women in skilling and dropout (4.0)
15. Monsoon effect and pre-monsoon outreach (4.0)
16. Capacity lowers variance and risk (4.2)

## License

Created for Tata Trusts RFP submission.
© 2025 Tata Trusts
