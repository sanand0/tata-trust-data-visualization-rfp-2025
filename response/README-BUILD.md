# RFP Response Build System

Simple build system using Eleventy to generate professional HTML from Markdown.

## Quick Start

**Note:** All commands should be run from the repository root (not from the `response/` directory).

```bash
# Install dependencies (from root)
npm install

# Build HTML files
npm run build

# Live preview with auto-reload
npm run serve

# Clean generated files
npm run clean
```

## Generated Files

The build generates HTML files in `response/_site/`:

- `response/_site/index.html` ← Technical Proposal (from README.md)
- `response/_site/checklist.html` ← Compliance Checklist
- `response/_site/review.html` ← Review Checklist

## Creating PDFs

### Recommended: Browser Print

1. Open the HTML file (e.g., `response/_site/index.html`) in Chrome or Firefox
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

1. Edit the Markdown files in `response/`:
   - `response/README.md` → Technical Proposal
   - `response/checklist.md` → Compliance Checklist
   - `response/review.md` → Review Checklist

2. Rebuild (from repository root):
   ```bash
   npm run build
   ```

3. Open `response/_site/index.html` in your browser to preview

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
repository-root/
├── package.json          # Build scripts (moved from response/)
├── response/
│   ├── .eleventy.js      # Eleventy configuration
│   ├── _includes/
│   │   └── layout.njk   # HTML template
│   ├── README.md        # → _site/index.html
│   ├── checklist.md     # → _site/checklist.html
│   ├── review.md        # → _site/review.html
│   └── _site/           # Generated output (gitignored)
│       ├── index.html
│       ├── checklist.html
│       └── review.html
└── (other project files...)
```

## Notes

- `package.json` is now in the repository root for easier CI/CD integration
- HTML files are generated in `response/_site/` and gitignored
- Source of truth is the Markdown files in `response/`
- Mermaid diagrams render automatically
- Print styles optimize for professional PDF output
- GitHub Actions automatically builds and deploys to GitHub Pages
