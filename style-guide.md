# Tata Trusts Visual Brand Style Guide

> Inferred from Tata Trusts website, Brandfetch brand assets, and visual design patterns

## Executive Summary

This style guide documents the visual brand guidelines for Tata Trusts based on comprehensive analysis of their digital presence, including website inspection, brand asset analysis, and live page examination. The design system emphasizes **professionalism, social impact, and accessibility** while maintaining the heritage and trust associated with the Tata brand.

**About Tata Trusts**: Founded in 1892 by Jamsetji Nusserwanji Tata with the J.N. Tata Endowment for Higher Education, Tata Trusts is one of India's oldest and largest philanthropic organizations. With over 125 years of "constructive philanthropy," the Trusts have created institutions of national significance including the Indian Institute of Science (IISC), Tata Institute of Social Sciences (TISS), and Tata Institute of Fundamental Research (TIFR). In 2020-21, Tata Trusts deployed US$136 million across social initiatives, reaching millions of households in over 100 districts across India.

## 1. Color Palette

### Primary Colors

| Color Name               | Hex Code  | RGB                | Usage                                                        |
| ------------------------ | --------- | ------------------ | ------------------------------------------------------------ |
| **Shark** (Dark)         | `#23272b` | rgb(35, 39, 43)    | Primary text, headers, navigation                            |
| **Anakiwa** (Light Blue) | `#9fcdff` | rgb(159, 205, 255) | Highlights, interactive elements, data visualization accents |
| **Persian Red**          | `#d0362d` | rgb(208, 54, 45)   | Call-to-action, alerts, important metrics                    |

### Secondary Colors

| Color Name         | Hex Code  | RGB                | Usage                                  |
| ------------------ | --------- | ------------------ | -------------------------------------- |
| **White**          | `#ffffff` | rgb(255, 255, 255) | Backgrounds, cards, negative space     |
| **Light Gray**     | `#f5f5f5` | rgb(245, 245, 245) | Section backgrounds, subtle dividers   |
| **Medium Gray**    | `#6c757d` | rgb(108, 117, 125) | Secondary text, captions               |
| **Teal/Turquoise** | `#17a2b8` | rgb(23, 162, 184)  | Links, hover states, secondary actions |

### Accent Colors for Data Visualization

| Color Name         | Hex Code  | Purpose                              |
| ------------------ | --------- | ------------------------------------ |
| **Success Green**  | `#28a745` | Positive metrics, growth indicators  |
| **Warning Orange** | `#ffc107` | Alerts, moderate priority items      |
| **Info Blue**      | `#17a2b8` | Informational elements, neutral data |
| **Muted Purple**   | `#6f42c1` | Alternative data series              |

### Color Accessibility

- **Minimum Contrast Ratio**: 4.5:1 for normal text, 3:1 for large text (WCAG AA)
- **Text on Shark (#23272b)**: Use white or light colors
- **Text on White**: Use Shark or dark grays
- **Color Blindness**: Ensure data visualizations don't rely solely on color; use patterns, labels, and icons

## 2. Typography

### Primary Font Family

**Titillium Web** (official font used on Tata Trusts website)

```css
font-family: "Titillium Web", sans-serif;
```

**Source**: Available from Google Fonts
**Weights Available**: 200, 300, 400, 600, 700, 900

### Fallback System

For maximum compatibility when Titillium Web is unavailable:

```css
font-family:
  "Titillium Web", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  "Helvetica Neue", Arial, sans-serif;
```

### Loading Titillium Web

Include in HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700&display=swap" rel="stylesheet">
```

### Type Scale

| Element        | Size            | Weight    | Line Height | Usage              |
| -------------- | --------------- | --------- | ----------- | ------------------ |
| **Display**    | 3.5rem (56px)   | Bold      | 1.2         | Hero headlines     |
| **H1**         | 2.5rem (40px)   | Bold      | 1.3         | Page titles        |
| **H2**         | 2rem (32px)     | Bold      | 1.4         | Section headers    |
| **H3**         | 1.5rem (24px)   | Semi-bold | 1.5         | Subsection headers |
| **H4**         | 1.25rem (20px)  | Semi-bold | 1.5         | Card titles        |
| **Body Large** | 1.125rem (18px) | Regular   | 1.6         | Lead paragraphs    |
| **Body**       | 1rem (16px)     | Regular   | 1.6         | Main content       |
| **Small**      | 0.875rem (14px) | Regular   | 1.5         | Captions, metadata |
| **Tiny**       | 0.75rem (12px)  | Regular   | 1.4         | Labels, footnotes  |

### Font Weights

- **Regular**: 400
- **Semi-bold**: 600
- **Bold**: 700

## 3. Logo Usage

### Logo Assets

**Primary Logo**

- Format: PNG, SVG preferred
- Dark theme: Use on light backgrounds
- Minimum size: 120px width
- Clear space: Equal to the height of the "T" in Tata on all sides

**Icon**

- Format: JPEG (400x400px), PNG available
- Dominant color: #e81828 (red)
- Use: Favicons, app icons, social media profiles

### Logo Guidelines

- **DO**:
  - Maintain aspect ratio
  - Use on contrasting backgrounds
  - Provide adequate white space
  - Use official versions only

- **DON'T**:
  - Stretch or distort
  - Change colors
  - Add effects (shadows, gradients)
  - Place on busy backgrounds

## 4. Layout & Spacing

### Grid System

- **Container**: Max-width 1200px (responsive)
- **Columns**: 12-column grid (Bootstrap standard)
- **Gutter**: 24px (1.5rem) between columns
- **Responsive Breakpoints** (from Tata Trusts website):
  - Mobile Small: < 480px
  - Mobile: 480px - 600px
  - Tablet Small: 600px - 768px
  - Tablet: 768px - 992px
  - Desktop Small: 992px - 1024px
  - Desktop: > 1024px

### Spacing Scale

Based on 8px base unit:

```css
--spacing-xs: 0.5rem; /* 8px */
--spacing-sm: 1rem; /* 16px */
--spacing-md: 1.5rem; /* 24px */
--spacing-lg: 2rem; /* 32px */
--spacing-xl: 3rem; /* 48px */
--spacing-xxl: 4rem; /* 64px */
```

### Section Spacing

- **Between sections**: 4rem (64px) on desktop, 3rem (48px) on mobile
- **Within sections**: 2rem (32px) between elements
- **Card padding**: 1.5rem (24px) internal padding

## 5. Components

### Buttons

**Primary Button**

```css
background-color: #d0362d; /* Persian Red */
color: #ffffff;
padding: 0.75rem 1.5rem;
border-radius: 4px;
font-weight: 600;
border: none;
transition: background-color 0.2s ease;
```

**Primary Button Hover**

```css
background-color: #b82f27; /* Darker red */
```

**Secondary Button**

```css
background-color: transparent;
color: #23272b;
border: 2px solid #23272b;
padding: 0.75rem 1.5rem;
border-radius: 4px;
font-weight: 600;
```

**Link Button**

```css
color: #17a2b8;
text-decoration: none;
font-weight: 600;
border-bottom: 2px solid transparent;
transition: border-color 0.2s ease;
```

### Cards

**Standard Card**

```css
background: #ffffff;
border: 1px solid #e9ecef;
border-radius: 8px;
padding: 1.5rem;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
transition: box-shadow 0.2s ease;
```

**Card Hover**

```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
```

**Image Card**

- Image aspect ratio: 16:9 or 4:3
- Image position: Top
- Text overlay: Optional with gradient overlay
- Min-height: 240px

### Forms

**Input Fields**

```css
border: 1px solid #ced4da;
border-radius: 4px;
padding: 0.75rem 1rem;
font-size: 1rem;
transition: border-color 0.15s ease;
```

**Input Focus**

```css
border-color: #17a2b8;
outline: 0;
box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.25);
```

**Error State**

```css
border-color: #d0362d;
```

**Success State**

```css
border-color: #28a745;
```

## 6. Imagery Style

### Photography Guidelines

**Subject Matter**

- Real people and communities in action
- Authentic documentation over staged photography
- Focus on impact: farmers, healthcare settings, education, cultural scenes
- Diversity and inclusion in representation

**Technical Specifications**

- **Format**: JPEG for photos, PNG for graphics with transparency
- **Resolution**: Minimum 1920px width for hero images
- **Aspect Ratios**:
  - Hero banners: 16:9 or 21:9
  - Cards: 4:3 or 16:9
  - Thumbnails: 1:1 (square)
- **File size**: Optimized < 200KB per image
- **Alt text**: Always provide descriptive alternative text

**Style**

- Natural lighting preferred
- Warm, inviting color tones
- Avoid heavy filters or excessive post-processing
- Show context and environment

### Icons

**Style**: Simple, monochromatic SVG icons

- **Stroke width**: 2px
- **Size**: 24px × 24px base, scalable
- **Format**: SVG (vector)
- **Color**: Inherit from parent or use #23272b

## 7. Data Visualization Guidelines

### Chart Types

**Bar Charts**

- Use for comparisons across categories
- Primary color: #17a2b8
- Secondary colors from accent palette

**Line Charts**

- Use for trends over time
- Line width: 3px
- Points: 6px radius

**Choropleth Maps**

- Use sequential color scheme
- Light to dark: #e6f5ff → #0066cc
- Include legend with clear labels

**Donut/Pie Charts**

- Use sparingly, prefer bar charts
- Maximum 6 segments
- Label percentages directly

### Visualization Best Practices

1. **Accessibility**
   - Color + pattern/texture combinations
   - Clear labels on all axes
   - Tooltips for detailed information

2. **Typography in Charts**
   - Axis labels: 12px, Medium Gray
   - Data labels: 14px, Shark
   - Chart titles: 18px, Bold

3. **Interactivity**
   - Hover effects for detail
   - Click to drill down
   - Smooth transitions (300ms ease)

4. **Responsive Design**
   - Stack charts vertically on mobile
   - Simplify for small screens
   - Maintain readability at all sizes

## 8. Navigation Patterns

### Header Navigation

**Structure**

```
Logo (Left) | Primary Nav (Center) | CTA Button (Right)
```

**Sticky Header**

- Fixed position on scroll
- Subtle shadow: `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)`
- Background: White with slight transparency

**Mobile Navigation**

- Hamburger menu icon
- Full-screen overlay on open
- Close icon (X) top-right

### Footer

**Layout**: Three-column layout

1. About & Logo
2. Quick Links
3. Contact Information

**Social Media Icons**

- Size: 32px × 32px
- Color: #6c757d (hover: #17a2b8)
- Platforms: Facebook, Twitter, Instagram, YouTube, LinkedIn

## 9. Animation & Interaction

### Transitions

**Standard Timing**

```css
transition: all 0.2s ease-in-out;
```

**Scroll Animations**

- Fade in: Opacity 0 → 1
- Slide up: Transform translateY(30px) → 0
- Stagger delay: 100ms between elements
- Trigger: When element is 20% visible
- Intersection Observer API for performance

**Parallax Effects** (as seen on Tata Trusts website):

- Hero video/image parallax: 25% scroll rate
- Creates depth and visual interest
- Smooth transition: `transition: transform 0.3s ease`

**3D Visual Effects**:

- Tag canvas with 3D cylinder transformation
- Cylinder depth: 0.8-0.9
- Max animation speed: 50ms
- Creates engaging, interactive visual elements

**Loading States**

- Spinner color: #17a2b8
- Size: 48px
- Animation: Smooth rotation

### Hover States

**Links**

```css
text-decoration: underline;
color: #138496; /* Darker teal */
```

**Buttons**

```css
transform: translateY(-2px);
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
```

**Cards**

```css
transform: translateY(-4px);
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
```

## 10. Accessibility Standards

### WCAG 2.1 Compliance

**Level AA Requirements**

- Color contrast: Minimum 4.5:1 for normal text
- Focus indicators: Visible on all interactive elements
- Keyboard navigation: Full support, logical tab order
- Alt text: Descriptive for all meaningful images
- Form labels: Clearly associated with inputs
- Error messages: Clear and instructive

### Screen Reader Support

- Semantic HTML5 elements
- ARIA labels where needed
- Skip to main content link
- Descriptive link text (no "click here")

### Responsive Design

- Mobile-first approach
- Touch targets: Minimum 44×44px
- Readable without zoom: Base font 16px
- Flexible layouts: No horizontal scrolling

## 11. Voice & Tone

### Editorial Guidelines

**Voice Characteristics**

- **Professional** yet approachable
- **Humanitarian-focused** on social impact
- **Authentic** with real stories
- **Empowering** rather than paternalistic
- **Clear** avoiding jargon

**Writing Style**

- Active voice preferred
- Short sentences (15-20 words)
- Bullet points for scannability
- Numbers and data for credibility
- Stories for emotional connection

## 12. Bootstrap 5.3.3 Customization

### CSS Variables Override

```css
:root {
  /* Colors */
  --bs-primary: #17a2b8;
  --bs-secondary: #6c757d;
  --bs-success: #28a745;
  --bs-danger: #d0362d;
  --bs-warning: #ffc107;
  --bs-info: #17a2b8;
  --bs-light: #f5f5f5;
  --bs-dark: #23272b;

  /* Typography */
  --bs-body-font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
  --bs-body-font-size: 1rem;
  --bs-body-font-weight: 400;
  --bs-body-line-height: 1.6;
  --bs-body-color: #23272b;

  /* Spacing */
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 1.5rem;

  /* Borders */
  --bs-border-width: 1px;
  --bs-border-radius: 0.5rem;
  --bs-border-radius-sm: 0.25rem;
  --bs-border-radius-lg: 0.75rem;

  /* Shadows */
  --bs-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  --bs-box-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --bs-box-shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

### Component Customization

**Navbar**

```css
.navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 1rem 0;
}

.navbar-brand {
  font-weight: 700;
  color: #23272b;
}

.nav-link {
  color: #23272b;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #17a2b8;
}
```

**Cards**

```css
.card {
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

.card-title {
  font-weight: 700;
  color: #23272b;
}
```

## 13. Code Standards

### HTML Naming Conventions

Use hyphenated class and ID names:

```html
<!-- Correct -->
<div id="user-profile" class="section-header primary-nav">

<!-- Incorrect -->
<div id="userProfile" class="sectionHeader primaryNav">
```

### CSS Organization

```css
/* Component-based structure */
.component-name {}
.component-name__element {}
.component-name--modifier {}

/* Example */
.impact-card {}
.impact-card__image {}
.impact-card__title {}
.impact-card--featured {}
```

### JavaScript

- ES2022+ syntax
- ESM modules
- Descriptive variable names
- Linear happy path
- Minimal error handling for prototype

## 14. Performance Guidelines

### Optimization

- **Images**: WebP format with JPEG fallback
- **Lazy loading**: Images below the fold
- **Minification**: CSS and JavaScript
- **CDN**: Use for libraries (Bootstrap, Chart.js, D3.js)
- **Caching**: Leverage browser caching

### Target Metrics

- **First Contentful Paint**: < 1.8s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.8s
- **Cumulative Layout Shift**: < 0.1

## 15. Tools & Resources

### Development

- **CSS Framework**: Bootstrap 5.3.3
- **Charts**: Chart.js for standard charts
- **Data Viz**: D3.js for custom visualizations
- **Icons**: Bootstrap Icons or Font Awesome
- **Fonts**: Google Fonts or system fonts

### Testing

- **Accessibility**: WAVE, axe DevTools
- **Performance**: Lighthouse, WebPageTest
- **Browser Testing**: Chrome, Firefox, Safari, Edge
- **Mobile Testing**: Real devices + emulators

<!--

- Source: https://claude.ai/code/session_011CV231EhAijAty2v1WAChs

 -->
