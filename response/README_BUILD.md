# RFP Response Build System

This directory contains the build system for generating professional HTML and PDF versions of the RFP proposal.

## Technology Stack

- **Static Site Generator**: [MkDocs](https://www.mkdocs.org/) with [Material theme](https://squidfunk.github.io/mkdocs-material/)
- **PDF Generator**: WeasyPrint (basic) or Browser Print (recommended)

## Quick Start

```bash
# Build HTML site
npm run build

# Preview with live reload
npm run serve

# Generate PDF (basic, using WeasyPrint)
npm run pdf

# Generate all PDFs
npm run pdf:all

# Clean generated files
npm run clean
```

## Directory Structure

```
response/
├── mkdocs.yml              # MkDocs configuration
├── package.json            # Build scripts
├── stylesheets/
│   └── extra.css          # Custom print/screen styles
├── docs/                   # Source markdown (generated from root .md files)
│   ├── index.md           # Technical proposal
│   ├── checklist.md       # Compliance checklist
│   └── review.md          # Review checklist
└── site/                   # Generated HTML/PDF (gitignored)
    ├── index.html
    ├── checklist/
    ├── review/
    └── assets/
```

## Generating Professional PDFs

### Method 1: Browser Print (Recommended)

For best results with proper fonts, spacing, and layout:

1. Build the site: `npm run build`
2. Open `site/index.html` in Chrome or Firefox
3. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac)
4. Configure print settings:
   - **Destination**: Save as PDF
   - **Paper size**: A4
   - **Margins**: Default
   - **Background graphics**: ✓ Enabled (important!)
   - **Headers/footers**: ✗ Disabled
5. Click "Save"

**Why browser print?**
- Perfect font rendering (Google Fonts work correctly)
- Proper CSS print styles
- Accurate page breaks
- Professional appearance
- Consistent with modern web standards

### Method 2: WeasyPrint (Basic)

For quick automated PDF generation:

```bash
npm run pdf        # Main proposal only
npm run pdf:all    # All documents
```

**Limitations:**
- Google Fonts may not load (403 errors)
- Some modern CSS features unsupported
- Less polished appearance
- Use for drafts only

## Customization

### Styling

Edit `stylesheets/extra.css` to customize:
- Print-specific styles (page breaks, margins, font sizes)
- Screen styles (colors, spacing)
- Table formatting
- Link appearance in print

### Content

1. Edit source markdown files:
   - `README.md` → Technical Proposal
   - `checklist.md` → Compliance Checklist
   - `review.md` → Review Checklist

2. Rebuild:
   ```bash
   npm run build
   ```

### Theme Configuration

Edit `mkdocs.yml` to change:
- Color scheme (primary/accent colors)
- Navigation structure
- Markdown extensions
- Fonts
- Features

## Print-Optimized Features

The generated HTML includes professional print styles:

- ✓ A4 page size with 2.5cm margins
- ✓ Optimized font sizes (11pt body, scaled headings)
- ✓ Orphan/widow control for better pagination
- ✓ Page break avoidance for headings and tables
- ✓ Clean header/footer (navigation hidden in print)
- ✓ URL display for external links
- ✓ Tata Trusts brand colors preserved

## Deployment

To share the proposal:

1. **Static hosting**: Upload `site/` directory to any web server
2. **GitHub Pages**: Configure in repo settings (branch: gh-pages)
3. **PDF distribution**: Use browser-generated PDFs

## Troubleshooting

### Mermaid diagrams not rendering
- Ensure JavaScript is enabled
- Check browser console for errors
- Try `npm run build` again

### Fonts look wrong in PDF
- Use browser Print to PDF (not WeasyPrint)
- Ensure "Background graphics" is enabled

### Page breaks in wrong places
- Edit `stylesheets/extra.css` print section
- Add `page-break-before: always` or `page-break-after: avoid` as needed

### Links broken
- Links to `../dataviz/` and `../process/` will work when deployed alongside those directories
- For standalone distribution, these links will be external

## Dependencies

Python packages (auto-installed):
- mkdocs
- mkdocs-material
- weasyprint

## License

ISC
