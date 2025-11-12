# RFP Response Build System

Simple build system using Eleventy to generate professional HTML from Markdown.

## Quick Start

```bash
# Install dependencies
npm install

# Build HTML files
npm run build

# Live preview with auto-reload
npm run serve

# Clean generated files
npm run clean
```

## Generated Files

The build generates HTML files directly in the `response/` folder:

- `index.html` ← Technical Proposal (from README.md)
- `checklist.html` ← Compliance Checklist
- `review.html` ← Review Checklist

## Creating PDFs

### Recommended: Browser Print

1. Open the HTML file (e.g., `index.html`) in Chrome or Firefox
2. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac)
3. Configure:
   - **Destination**: Save as PDF
   - **Paper**: A4
   - **Margins**: Default
   - **Background graphics**: ✓ Enabled (important!)
4. Save

This produces professional PDFs with:
- Proper fonts and colors
- Optimized typography (11pt body, scaled headings)
- Page breaks in the right places
- Tata Trusts branding colors

## Editing

1. Edit the Markdown files:
   - `README.md` → Technical Proposal
   - `checklist.md` → Compliance Checklist
   - `review.md` → Review Checklist

2. Rebuild:
   ```bash
   npm run build
   ```

3. Open `index.html` in your browser to preview

## Styling

The template (`_includes/layout.njk`) includes:

- **Professional typography**: Sans-serif system fonts
- **Brand colors**: Tata Trusts teal (#17a2b8)
- **Print-optimized CSS**: A4 pages with 2.5cm margins
- **Responsive**: Works on mobile and desktop
- **Mermaid diagrams**: Automatic rendering

## Technology

- **Static Site Generator**: [Eleventy](https://www.11ty.dev/)
- **Markdown Parser**: markdown-it
- **Template Engine**: Nunjucks
- **Diagram Support**: Mermaid (via CDN)

## Project Structure

```
response/
├── .eleventy.js          # Eleventy configuration
├── package.json          # Build scripts
├── _includes/
│   └── layout.njk       # HTML template
├── README.md            # → index.html
├── checklist.md         # → checklist.html
├── review.md            # → review.html
├── index.html          # Generated (gitignored)
├── checklist.html      # Generated (gitignored)
└── review.html         # Generated (gitignored)
```

## Notes

- HTML files are gitignored and regenerated on build
- Source of truth is the Markdown files
- Mermaid diagrams render automatically
- Print styles optimize for professional PDF output
