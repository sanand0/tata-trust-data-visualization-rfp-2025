# Deployment Setup

This document explains how to set up automated deployment to GitHub Pages.

## Quick Start (Local Build)

From the repository root:

```bash
npm install
npm run build
```

This generates the RFP response HTML files in `response/_site/`.

## GitHub Pages Deployment

### Option 1: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml` with the following content:

```yaml
name: Build and Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

# Sets permissions for GitHub Pages deployment
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build RFP response HTML
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Enable GitHub Pages

1. Go to your repository Settings → Pages
2. Under "Build and deployment":
   - Source: **GitHub Actions**
3. Push the workflow file to your `main` branch
4. The site will automatically deploy on every push to `main`

### Accessing the Deployed Site

Once deployed, your site will be available at:
- Landing page: `https://sanand0.github.io/tata-trust-data-visualization-rfp-2025/`
- RFP Response: `https://sanand0.github.io/tata-trust-data-visualization-rfp-2025/response/_site/index.html`
- Data Story: `https://sanand0.github.io/tata-trust-data-visualization-rfp-2025/dataviz/index.html`
- Dashboard: `https://sanand0.github.io/tata-trust-data-visualization-rfp-2025/dataviz/dashboard.html`
- Process Tutorial: `https://sanand0.github.io/tata-trust-data-visualization-rfp-2025/process/index.html`

## Option 2: Manual Deployment

If you prefer manual deployment:

1. Build locally: `npm run build`
2. Copy `response/_site/` contents to your hosting service
3. Ensure all relative paths remain intact

## Build Scripts

- `npm run build` - Build RFP response HTML
- `npm run serve` - Local development server with live reload
- `npm run clean` - Remove generated files

## CI/CD Notes

- The workflow uses Node.js 20 LTS
- Dependencies are cached for faster builds
- Build artifacts are automatically uploaded to GitHub Pages
- The deployment only runs after successful build
- Concurrent deployments are prevented

## Troubleshooting

**Build fails with "eleventy: not found"**
- Run `npm install` first

**Pages not updating**
- Check Actions tab for build/deploy status
- Verify GitHub Pages is configured correctly in Settings
- Clear browser cache

**Links broken on GitHub Pages**
- Ensure all internal links use relative paths
- The repository name is included in the URL path
