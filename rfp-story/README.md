# Tata Trusts RFP Scrollytelling Story

An interactive, New York Times-style scrollytelling data story that explains the Tata Trusts Data Visualization Dashboard RFP in an engaging, visual format.

## Overview

This scrollytelling experience breaks down:
- **RFP Requirements** in simple, accessible language
- **Key Insights** from the November 11, 2025 pre-bid discussion
- **Timeline & Deliverables** with interactive visualizations
- **Evaluation Criteria** and proposal structure

## Files

- **`index.html`** - Main HTML structure with Bootstrap 5.3.3 layout
- **`script.js`** - JavaScript module with Chart.js and D3.js visualizations
- **`data.json`** - Structured data extracted from RFP and pre-bid meeting
- **`README.md`** - This file

## Technical Stack

### Frameworks & Libraries
- **Bootstrap 5.3.3** - Responsive layout and components
- **Chart.js 4.4.0** - Traditional charts (bar, pie, donut, line)
- **D3.js 7.8.5** - Custom data visualizations
- **Vanilla JavaScript** - ES2022+ with ESM modules

### Features
- **Responsive Design** - Mobile-first, works on all devices
- **Smooth Scrolling** - Animated transitions between sections
- **Interactive Charts** - Hover tooltips, dynamic data display
- **Tata Trusts Brand** - Follows official visual guidelines
- **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation

## Design Principles

Following Tata Trusts brand guidelines:
- **Colors**: Shark (#23272b), Anakiwa (#9fcdff), Persian Red (#d0362d)
- **Typography**: System fonts with clear hierarchy
- **Layout**: Grid-based, generous whitespace
- **Animations**: Subtle, purposeful, 200-300ms transitions

## How to Use

### Viewing Locally

1. **Simple HTTP Server** (Python):
   ```bash
   cd rfp-story
   python3 -m http.server 8000
   ```
   Open http://localhost:8000

2. **Node.js HTTP Server**:
   ```bash
   npx http-server rfp-story -p 8000
   ```
   Open http://localhost:8000

3. **VS Code Live Server**:
   - Right-click `index.html`
   - Select "Open with Live Server"

### Deploying

This is a static site that can be deployed to:
- **GitHub Pages**: Push to `gh-pages` branch
- **Netlify**: Drag & drop the `rfp-story` folder
- **Vercel**: Connect repository and deploy
- **AWS S3**: Upload files to S3 bucket with static hosting

## Code Style

Following the technical requirements:

### HTML
```html
<!-- Hyphenated class and ID names -->
<div id="user-profile" class="section-header">
```

### JavaScript
```javascript
// ES2022+ features
const data = await loadData();

// Linear happy path
async function init() {
  const data = await loadData();
  createCharts(data);
  populateContent(data);
  initAnimations();
}

// Intuitive naming
function createWorkAreasChart(workAreas) { }
```

### CSS
```css
/* Component-based with hyphenated names */
.insight-card { }
.insight-card__header { }
.insight-card--featured { }
```

## Data Structure

### `data.json` Schema

```json
{
  "meta": { "title", "issueDate", "submissionDeadline" },
  "overview": { "title", "objective", "timeline", "phases" },
  "keyRequirements": [{ "category", "requirement", "priority", "phase" }],
  "timeline": { "events": [{ "date", "event", "milestone", "status" }] },
  "deliverables": [{ "name", "description", "paymentTrigger" }],
  "evaluationCriteria": { "method", "technicalCriteria" },
  "preBidInsights": [{ "category", "insight", "impact", "surprise" }],
  "workAreas": [{ "name", "grantCount", "percentage" }]
}
```

## Customization

### Changing Colors

Edit the `COLORS` object in `script.js`:

```javascript
const COLORS = {
  dark: '#23272b',
  blue: '#9fcdff',
  red: '#d0362d',
  teal: '#17a2b8',
  // Add more colors...
};
```

Update CSS variables in `index.html`:

```css
:root {
  --tata-dark: #23272b;
  --tata-blue: #9fcdff;
  --tata-red: #d0362d;
  --tata-teal: #17a2b8;
}
```

### Adding New Sections

1. Add section to `index.html`:
   ```html
   <section id="new-section" class="story-section">
     <div class="container">
       <div class="section-number">06 / New Section</div>
       <h2 class="section-title">Section Title</h2>
       <!-- Content -->
     </div>
   </section>
   ```

2. Add navigation link:
   ```html
   <li class="nav-item">
     <a class="nav-link" href="#new-section">New Section</a>
   </li>
   ```

3. Add data to `data.json` if needed

4. Create visualization function in `script.js`

### Modifying Visualizations

Charts are created with Chart.js and D3.js. Edit the chart functions in `script.js`:

```javascript
function createCustomChart(data) {
  const ctx = document.getElementById('chart-id');
  new Chart(ctx, {
    type: 'bar', // or 'line', 'pie', 'doughnut', etc.
    data: { /* chart data */ },
    options: { /* chart options */ }
  });
}
```

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features Used**: CSS Grid, Flexbox, ES2022, Fetch API, Intersection Observer

## Performance

### Optimization Techniques
- **CDN Delivery**: Bootstrap, Chart.js, D3.js from CDN
- **Minimal CSS**: Bootstrap customization via variables
- **Lazy Loading**: Scroll-triggered animations
- **Efficient Rendering**: Chart.js hardware acceleration

### Metrics (Target)
- **First Contentful Paint**: < 1.8s
- **Time to Interactive**: < 3.8s
- **Lighthouse Score**: > 90

## Accessibility

- **WCAG 2.1 AA Compliant**
- **Keyboard Navigation**: Full support
- **Screen Readers**: Semantic HTML, ARIA labels
- **Color Contrast**: 4.5:1 minimum ratio
- **Focus Indicators**: Visible on all interactive elements

## Known Limitations

1. **Internet Required**: CDN dependencies need network access
2. **Modern Browsers Only**: Uses ES2022 features
3. **No Print Styles**: Not optimized for printing (can be added)
4. **Static Data**: No real-time updates (by design for Phase 1)

## Future Enhancements

Potential improvements for future versions:
- [ ] Dark mode toggle
- [ ] Export to PDF functionality
- [ ] Interactive data filtering
- [ ] Animation controls (play/pause)
- [ ] Multiple language support
- [ ] Print stylesheet
- [ ] Offline support with service worker

## Contributing

This is a prototype/demonstration. For modifications:
1. Follow existing code style
2. Test on multiple devices
3. Maintain accessibility standards
4. Update this README with changes

## License

Created for Tata Trusts RFP submission.
© 2025 Tata Trusts

## Contact

For questions about this RFP:
- **Email**: procurement.cci@tatatrusts.org, ankitthakur@tatatrusts.org
- **Website**: https://www.tatatrusts.org
