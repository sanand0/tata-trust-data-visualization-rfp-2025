# Tata Trusts Data Visualizations

Interactive data story and dashboard showcasing the top 9 analyses from the portfolio data.

## Files

### Core Files
- **`core.js`** - Shared utilities, data loading, formatting functions, and constants
- **`index.html`** - New York Times-style scrollytelling data story
- **`dashboard.html`** - Interactive dashboard with filters and all visualizations

### Chart Modules (ESM)

Each chart is an independent module that exports a `render(container, props)` function:

1. **`chart1-efficiency-scatter.js`** - Outcomes per rupee and beneficiaries per rupee (efficiency quadrants)
2. **`chart2-coverage-map.js`** - Targeting need: coverage vs deprivation (bivariate scatter)
3. **`chart3-underserved.js`** - Underserved pockets list (ranked bar chart)
4. **`chart4-overview.js`** - Money → Reach → Outcomes overview (small multiples)
5. **`chart5-kpi-waterfall.js`** - KPI attainment and its drivers (waterfall chart)
6. **`chart6-coverage-deciles.js`** - Need vs coverage deciles (line chart with gap area)
7. **`chart7-diminishing-returns.js`** - Diminishing returns at large budgets (scatter with trend)
8. **`chart8-timeliness-impact.js`** - Timeliness ripple effect (bar chart with confidence intervals)
9. **`chart9-coverage-impact.js`** - High-need coverage impact (cumulative impact curve)

## Features

### Data Story (`index.html`)
- Beautiful scrollytelling narrative
- 5 thematic sections with integrated visualizations
- Responsive design following Tata Trusts brand guidelines
- Smooth scrolling and professional typography
- Stat cards and pull quotes for key insights

### Dashboard (`dashboard.html`)
- Modern dashboard layout with sidebar navigation
- Interactive filters (theme, state, need decile)
- Summary stat cards that update with filters
- All 9 visualizations organized by category:
  - Efficiency & Performance
  - Geographic Targeting & Equity
  - Operational Excellence
- Download and fullscreen options for each chart
- Responsive mobile-friendly design

### Charts
- Built with Observable Plot and D3.js
- Fully responsive with ResizeObserver
- Interactive tooltips
- Accessible color schemes
- Professional styling following brand guidelines

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
  dark: '#23272b',
  lightBlue: '#9fcdff',
  red: '#d0362d',
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

1. Create a new `chartN-name.js` module
2. Import and use in `index.html` or `dashboard.html`
3. Follow the existing pattern for consistency

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

## Top 9 Analyses

The visualizations implement the top-ranked analyses from `analyses.md`:

**Rank #1:**
1. Outcomes per rupee and beneficiaries per rupee
2. Targeting need: coverage vs deprivation
3. Underserved pockets list

**Rank #2:**
4. Money → Reach → Outcomes overview
5. KPI attainment and its drivers
6. Need vs coverage deciles
7. Diminishing returns at large budgets
8. Timeliness ripple effect
9. High-need but low-coverage districts drive missed outcomes

## License

Created for Tata Trusts RFP submission.
© 2025 Tata Trusts
