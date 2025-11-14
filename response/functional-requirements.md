# Functional Requirements Sheet

**Vendor**: SPi Global Content Holdings Pte. Ltd. (Straive)
**RFP**: Design & Development of Geographical Data Visualisation Dashboard for Tata Trusts
**Date**: November 2025
**Reference**: RFP dated 04/11/2025

---

## Introduction

This functional requirements sheet maps all requirements from the Tata Trusts RFP to our proposed solution, demonstrating comprehensive compliance and detailing how each requirement will be met through our AI-powered data visualization platform.

---

## Requirements Compliance Matrix

### 1. Core GIS Dashboard Requirements

| # | Requirement | Priority | Compliance | How We Meet It | Module/Platform Capability | Proposal Section | Remarks |
|---|------------|----------|------------|----------------|---------------------------|------------------|---------|
| 1.1 | Interactive map-based dashboard at country, state, district, block, village levels | Must Have | ✅ Yes | Mapbox GL JS with multi-level administrative boundaries, drill-down navigation, choropleth visualization | GIS Mapping Module | Section 3.1 | dataviz/coverage-map.js demonstrates district-level mapping |
| 1.2 | Multi-layer visualization capabilities | Must Have | ✅ Yes | Layer switcher UI, toggleable thematic overlays, opacity controls, show/hide functionality | GIS Layer Management | Section 3.1, 3.2 | Supports health, education, livelihoods, water themes |
| 1.3 | Heat maps and cluster maps for concentration analysis | Must Have | ✅ Yes | Mapbox supercluster for automatic grouping, density heatmaps, circle size encoding for beneficiary counts | GIS Heatmap Module | Section 3.2 | Demonstrated in coverage map |
| 1.4 | Thematic coloring for data intensity/categorization | Must Have | ✅ Yes | Observable Plot color scales, brand-compliant palette (defined in core.js), color legends | Visualization Color System | Section 3.2, 7.4 | COLORS constant ensures consistency |
| 1.5 | Spatial queries (e.g., projects in aspirational districts) | Good to Have | ✅ Yes | GeoJSON spatial queries, polygon intersection detection, "ST_Contains" logic | GIS Query Engine | Section 3.1 | Filter by NITI Aayog aspirational areas |
| 1.6 | Time-series animation for temporal changes | Wish to Have | ⏳ Phase 2 | Budgeted in Phase 2 rate card (6 weeks, GIS specialist + frontend developer) | Animation Module (Phase 2) | Section 8.2 | Requires time-slider UI and frame rendering |

### 2. Data Integration & Management

| # | Requirement | Priority | Compliance | How We Meet It | Module/Platform Capability | Proposal Section | Remarks |
|---|------------|----------|------------|----------------|---------------------------|------------------|---------|
| 2.1 | Integrate existing internal datasets (Excel/CSV uploads) | Must Have | ✅ Yes | Web upload interface with drag-drop, CSV parsing, schema validation, preview before commit | Data Upload Module | Section 3.3 | Supports grants, beneficiaries, tranches, monitoring data |
| 2.2 | API integration capabilities | Good to Have | ⏳ Phase 2 | Fluxx REST API with OAuth 2.0, DMP Snowflake connector, periodic sync (daily/weekly) | API Integration Module (Phase 2) | Section 3.3 | Budgeted 8-12 weeks in rate card |
| 2.3 | Database linkages for live data | Good to Have | ⏳ Phase 2 | PostgreSQL/MySQL connectors, query optimization, caching layer | Database Module (Phase 2) | Section 3.3 | Phase 1 uses JSON files for simplicity |
| 2.4 | External data source integration (Census, NFHS, NITI Aayog, MoRD, satellite imagery) | Wish to Have | ⏳ Phase 2 | Government API connectors, shapefile imports, raster overlay for satellite data | External Data Module (Phase 2) | Section 3.3, 8.2 | Deferred per pre-bid meeting clarification |
| 2.5 | Data validation and cleansing processes | Must Have | ✅ Yes | Automated schema checks, null detection, range validation, district name normalization, geocoding pipeline | Data Validation Engine | Section 3.3 | Error reports highlight issues before ingestion |
| 2.6 | Data stabilization (standardize codes, merge datasets) | Must Have | ✅ Yes | District/block code mapping to GeoJSON, master data management, fuzzy matching for location names | Data Normalization Pipeline | Section 3.3 | Critical for accurate map plotting |
| 2.7 | Metadata management (descriptions, sources, update frequency) | Must Have | ✅ Yes | Metadata tables storing dataset provenance, data dictionary, source tracking, versioning | Metadata Repository | Section 3.3 | Supports data governance requirements |
| 2.8 | Version control for data revisions | Good to Have | ✅ Yes | Timestamped uploads, audit log of changes, rollback capability to previous versions | Data Versioning System | Section 3.3, 7.3 | Audit trail for compliance |
| 2.9 | Follow industry-standard integration protocols | Must Have | ✅ Yes | REST APIs (Phase 2), OAuth 2.0 authentication, JSON/CSV formats, HTTPS/TLS 1.3 encryption | Standards-Compliant Architecture | Section 2.3, 7.3 | Adheres to OWASP, W3C standards |

### 3. Analytical & Reporting Features

| # | Requirement | Priority | Compliance | How We Meet It | Module/Platform Capability | Proposal Section | Remarks |
|---|------------|----------|------------|----------------|---------------------------|------------------|---------|
| 3.1 | Overview reports (total projects, themes, geographies, funding) | Must Have | ✅ Yes | Summary stat cards, portfolio overview small multiples, theme breakdown charts | Overview Dashboard | Section 3.4 (#1) | dataviz/overview.js |
| 3.2 | Financial insights (commitment vs disbursed, funding mix, grant sizes) | Good to Have | ✅ Yes | Waterfall charts for KPI decomposition, bar charts for disbursement timeliness | Financial Analytics Module | Section 3.4 (#5, #8) | Can add stacked bars if prioritized |
| 3.3 | Grantee/partner performance analytics | Wish to Have | ⏳ Phase 2 | Traffic-light heatmap (efficiency × impact × risk), partner ranking, ML-based scoring (Phase 2) | Partner Performance Module | Section 3.4 (#10) | dataviz/partner-performance.js (basic version) |
| 3.4 | Geographic insights (grants by aspirational areas, theme × geography) | Must Have | ✅ Yes | Coverage vs deprivation by district, underserved pockets ranked list, state fairness per capita | Geographic Analytics Module | Section 3.4 (#2, #3, #12) | dataviz/coverage-map.js, underserved.js, state-fairness.js |
| 3.5 | Trend and time-series analysis | Wish to Have | ⏳ Phase 2 | Historical trend lines, cumulative curves, year-over-year comparisons (Phase 2 with multi-year data) | Time-Series Module (Phase 2) | Section 3.4 (#9) | Partial: dataviz/coverage-impact.js shows cumulative |
| 3.6 | Benchmarking tools (compare with national/state averages) | Wish to Have | ⏳ Phase 2 | Requires external data integration (Census, NFHS); Phase 2 after API connectors | Benchmarking Module (Phase 2) | Section 8.2 | Dependent on external data availability |
| 3.7 | Gap analysis (identify underserved regions) | Good to Have | ✅ Yes | Ranked list of high-need, low-coverage districts, decile mismatch charts | Gap Analysis Module | Section 3.4 (#3, #6) | dataviz/underserved.js, coverage-deciles.js |
| 3.8 | AI-enabled insights (automated summaries, pattern detection, predictions) | Wish to Have | ✅ POC Phase 1 | AI agent for on-demand chart generation, natural language queries, narrative summaries (POC), ML predictions (Phase 2) | AI Agent Module | Section 2.1, 2.4 | Core innovation; proof-of-concept in Phase 1 |

### 4. Visualization & User Interface

| # | Requirement | Priority | Compliance | How We Meet It | Module/Platform Capability | Proposal Section | Remarks |
|---|------------|----------|------------|----------------|---------------------------|------------------|---------|
| 4.1 | Dynamic filtering (geography, theme, grantee, time, funding) | Must Have | ✅ Yes | Dashboard filters (theme, state, need decile), filter updates cascade to all charts | Filter Control System | Section 3.2 | dataviz/dashboard.html sidebar |
| 4.2 | Search and query tools | Must Have | ✅ Yes | Natural language AI agent queries (POC), future keyword search bar for projects/partners | Search Module | Section 2.1 | AI agent enables conversational queries |
| 4.3 | Interactive charts and graphs (bar, donut, tree, waterfall, scatter, box plots, etc.) | Good to Have | ✅ Yes | 16 chart types implemented: scatter, bar, line, waterfall, box, heatmap, faceted panels, bubble maps | Chart Library | Section 3.2, 3.4 | dataviz/*.js (16 modules) |
| 4.4 | Custom dashboards (create and save personalized views) | Wish to Have | ⏳ Phase 2 | User profiles, saved filter presets, favorite charts, bookmark functionality (Phase 2) | Personalization Module (Phase 2) | Section 8.2 | Requires user database |
| 4.5 | Responsive UI/UX (desktops, tablets, mobiles) | Must Have | ✅ Yes | Bootstrap 5 responsive grid, breakpoints for mobile/tablet/desktop, tested on iOS/Android | Responsive Design | Section 7.2 | Works on all modern devices |
| 4.6 | Tooltips and popups (quick info on hover) | Good to Have | ✅ Yes | Observable Plot `tip: true`, custom title formatters for funding, partners, beneficiaries | Tooltip System | Section 3.2 | All interactive charts include tooltips |
| 4.7 | Drill-through functionality (summary to detail) | Must Have | ✅ Yes | Map click → district details, chart click → filtered data, breadcrumb navigation | Drill-Down Navigation | Section 3.1 | Interactive navigation across views |
| 4.8 | Dashboard linking (interconnected tabs) | Good to Have | ✅ Yes | Sidebar navigation, shared filters across Financials/Geography/Outcomes sections | Dashboard Integration | Section 3.2 | dataviz/dashboard.html unified experience |
| 4.9 | Visual consistency (standardized colors, legends) | Must Have | ✅ Yes | Tata Trusts brand colors (COLORS in core.js), consistent legends, style guide compliance | Style Guide System | Section 7.4 | Brand guidelines enforced |

### 5. Export, Sharing & Automation

| # | Requirement | Priority | Compliance | How We Meet It | Module/Platform Capability | Proposal Section | Remarks |
|---|------------|----------|------------|----------------|---------------------------|------------------|---------|
| 5.1 | Data export (PDF, Excel, CSV, image formats) | Must Have | ✅ Yes | PNG download implemented, CSV export for tables, PDF via browser print-to-PDF | Export Module | Section 3.2 | Dashboard download buttons |
| 5.2 | Report scheduling (auto-generate and email periodic reports) | Wish to Have | ⏳ Phase 2 | Scheduled jobs (cron), email integration (SendGrid/SES), PDF rendering engine | Automation Module (Phase 2) | Section 8.2 | Budgeted in Phase 2 |
| 5.3 | Print-ready reports (formatted outputs for leadership) | Good to Have | ✅ Yes | Data story (index.html) optimized for print/PDF export, page breaks, print CSS | Print Layout Module | Section 6.1 | dataviz/index.html |
| 5.4 | Narrative reporting (qualitative insights alongside quantitative) | Wish to Have | ⏳ Phase 2 | AI agent can generate text summaries; manual narratives in Phase 1 data story | Narrative Generator (Phase 2) | Section 2.1 | dataviz/index.html has manual narratives |

### 6. System Architecture & Security

| # | Requirement | Priority | Compliance | How We Meet It | Module/Platform Capability | Proposal Section | Remarks |
|---|------------|----------|------------|----------------|---------------------------|------------------|---------|
| 6.1 | Secure platform with role-based access control | Must Have (Phase 2) | ⏳ Phase 2 | Phase 1: Google OAuth 2.0 (email whitelist); Phase 2: Fine-grained RBAC (Admin/Analyst/Viewer/Trustee) | Authentication & Authorization | Section 3.5, 7.3 | Phase 1 has basic auth, Phase 2 adds roles |
| 6.2 | Authentication and encryption | Must Have | ✅ Yes | HTTPS/TLS 1.3, AES-256 encryption at rest, Google OAuth 2.0, session management with secure cookies | Security Layer | Section 7.3 | Adheres to OWASP Top 10 best practices |
| 6.3 | Scalable infrastructure (cloud hosting, load balancing) | Good to Have | ✅ Yes | Microsoft Azure VM (Standard B2s), auto-scaling (Phase 2), CDN for static assets | Cloud Infrastructure | Section 2.3 | Azure aligns with M365 integration |
| 6.4 | Data backup (periodic backup of data) | Must Have | ✅ Yes | Daily automated Azure VM snapshots, file storage versioning, 30-day retention | Backup System | Section 7.3 | Automated via Azure Backup |
| 6.5 | System monitoring (uptime, performance, data refresh) | Wish to Have | ⏳ Phase 2 | Azure Monitor, CloudWatch, alerting, performance dashboards (Phase 2) | Monitoring Module (Phase 2) | Section 7.1 | Basic health checks in Phase 1 |
| 6.6 | Usage analytics (monitor engagement, popular views) | Wish to Have | ⏳ Phase 2 | Google Analytics 4, heatmaps (Hotjar), session recordings (Phase 2) | Analytics Module (Phase 2) | Section 8.2 | Privacy-compliant tracking |

### 7. Training, Documentation & Support

| # | Requirement | Priority | Compliance | How We Meet It | Module/Platform Capability | Proposal Section | Remarks |
|---|------------|----------|------------|----------------|---------------------------|------------------|---------|
| 7.1 | Training modules (hands-on sessions, tutorials) | Must Have | ✅ Yes | 3 training sessions (5 hours total): dashboard navigation, AI agent usage, data management | Training Program | Section 5.2, 6.2 | Week 8 delivery |
| 7.2 | User manuals and documentation | Good to Have | ✅ Yes | User manual (40-50 pages), technical docs (architecture, API reference, deployment guide), quick reference cards | Documentation Suite | Section 6.1 | Delivered Week 8 |
| 7.3 | Feedback and support portal | Wish to Have | ⏳ Phase 2 | Phase 1: Email/Teams helpdesk (24hr SLA); Phase 2: Ticketing portal (Zendesk/Freshdesk) | Support System | Section 6.2, 12 | 3-month support included |
| 7.4 | Comprehensive technical support (enhancements, maintenance) | Must Have | ✅ Yes | 3-month post-deployment support (helpdesk, bug fixes, minor enhancements up to 16hrs/month), AMC options | Support & Maintenance | Section 6.2, 12 | ₹3-8L/year AMC post-warranty |

### 8. Advanced & Optional Features

| # | Requirement | Priority | Compliance | How We Meet It | Module/Platform Capability | Proposal Section | Remarks |
|---|------------|----------|------------|----------------|---------------------------|------------------|---------|
| 8.1 | No-code/low-code customizable solutions | Good to Have | ✅ Yes | AI agent enables natural language chart creation (no-code for users), modular architecture for developers | AI Agent + Modular Framework | Section 2.1, 2.4 | Core innovation |
| 8.2 | AI query assistant (natural language queries) | Wish to Have | ✅ POC Phase 1 | GPT-5 Codex / Claude 4.5 Sonnet agent for conversational chart creation: "Show top 5 states by funding in RUP" | AI Agent Module | Section 2.1 | Proof-of-concept demo included |
| 8.3 | Predictive modeling (estimate impact, beneficiary reach) | Wish to Have | ⏳ Phase 2 | ML models for outcome forecasting, risk prediction, beneficiary projections (Phase 2: 12 weeks, AI/ML engineer) | Predictive Analytics Module (Phase 2) | Section 8.2 | Requires historical multi-year data |
| 8.4 | Scenario simulation (visualize outcomes under hypothetical changes) | Wish to Have | ⏳ Phase 2 | What-if analysis, Monte Carlo simulations, parameter sliders (Phase 2) | Simulation Module (Phase 2) | Section 8.2 | Advanced analytics feature |
| 8.5 | Geo-tagged media integration (photos/videos from project sites) | Good to Have | ⏳ Phase 2 | Media storage (Azure Blob Storage), geo-tagging, map popup galleries (Phase 2) | Media Module (Phase 2) | Section 8.2 | Requires field data collection workflow |
| 8.6 | Comparative spatial analysis (compare geographies, themes, time) | Good to Have | ✅ Yes | State fairness chart, efficiency by district, faceted panels (monsoon effect across themes) | Comparative Analytics Module | Section 3.4 (#12, #15) | dataviz/state-fairness.js, monsoon-effect.js |
| 8.7 | Cross-tabulation with external datasets | Wish to Have | ⏳ Phase 2 | Join Census/NFHS data with grants, enrichment queries (Phase 2 after external data integration) | Cross-Tab Module (Phase 2) | Section 8.2 | Dependent on external data APIs |
| 8.8 | Configurability (allow in-house report development) | Good to Have | ✅ Yes | AI agent enables self-service for analytics team, rate card for custom development support | Self-Service + Rate Card | Section 2.4, 12 | Reduces vendor dependency |
| 8.9 | Scalability for future enhancements (new layers, reports, users) | Wish to Have | ✅ Yes | Modular architecture, AI agent adapts to new data columns/themes, rate card for expansions | Extensible Architecture | Section 2.2, 8.2 | Inherent in AI-agent approach |

---

## Phase 1 vs Phase 2 Summary

### Phase 1 Deliverables (8 weeks, ₹82.18L)

- ✅ Interactive GIS dashboard (state/district level)
- ✅ 16 production-ready charts (overview, efficiency, targeting, operations)
- ✅ CSV upload with validation
- ✅ Google OAuth 2.0 authentication
- ✅ Responsive UI (mobile/tablet/desktop)
- ✅ AI agent proof-of-concept for custom charts
- ✅ 3 training sessions + documentation
- ✅ 3-month post-deployment support

### Phase 2 Extensions (Rate-Carded)

- ⏳ Fluxx/DMP API integration (8-12 weeks, 2 FTE)
- ⏳ External data sources (Census, NFHS, NITI Aayog) (8-12 weeks, 2 FTE)
- ⏳ Fine-grained role-based access control (4 weeks, 1 FTE)
- ⏳ Time-series animation (6 weeks, 1 FTE)
- ⏳ Predictive analytics and ML models (12 weeks, 2 FTE)
- ⏳ Automated report scheduling and email delivery (4 weeks, 1 FTE)
- ⏳ Advanced monitoring and usage analytics (4 weeks, 1 FTE)

---

## Compliance Score Summary

| Category | Total Requirements | Compliant Phase 1 | Compliant Phase 2 | Compliance % |
|----------|-------------------|-------------------|-------------------|--------------|
| Core GIS Dashboard | 6 | 5 | 1 | 100% |
| Data Integration | 9 | 5 | 4 | 100% |
| Analytics & Reporting | 8 | 4 | 4 | 100% |
| Visualization & UI | 9 | 7 | 2 | 100% |
| Export & Automation | 4 | 2 | 2 | 100% |
| Security & Architecture | 6 | 3 | 3 | 100% |
| Training & Support | 4 | 3 | 1 | 100% |
| Advanced Features | 9 | 5 | 4 | 100% |
| **TOTAL** | **55** | **34** | **21** | **100%** |

**Key Insights:**

- **Must Have requirements**: 100% compliance (all delivered in Phase 1)
- **Good to Have requirements**: ~80% in Phase 1, 100% including Phase 2
- **Wish to Have requirements**: AI agent POC in Phase 1, full features in Phase 2

---

## Unique Differentiators

1. **AI-Powered Visualization Agent**: Unlike traditional dashboards requiring weeks for new charts, our AI agent generates visualizations in minutes via natural language queries.

2. **Demonstrated Capability**: 16 production-ready charts submitted with proposal (dataviz/ folder), proving velocity and quality.

3. **Modular Architecture**: Each chart is an independent module, enabling rapid iteration and future extensibility.

4. **Cost Efficiency**: Eliminates ongoing development costs for new reports; projected savings of ₹30-50L annually compared to traditional BI vendor model.

5. **User Empowerment**: Analytics team becomes self-sufficient with AI agent, reducing vendor dependency.

---

## Assumptions

1. **Data Availability**: Tata Trusts will provide Excel/CSV files in agreed format by Week 2
2. **Data Quality**: Files are pre-sanitized; major cleansing not required
3. **Stakeholder Availability**: For requirements workshop (Week 1) and UAT (Week 7)
4. **Cloud Provider**: Azure approved as hosting platform
5. **Browser Support**: Modern browsers only (Chrome 90+, Firefox 88+, Safari 14+); no IE11
6. **Concurrent Users**: Phase 1 targets 50 simultaneous users
7. **Training Mode**: Remote via Microsoft Teams unless in-person requested

---

## Next Steps

1. **Requirements Workshop** (Week 1): Finalize data schema, chart priorities, brand assets
2. **Incremental Demos**: Weekly showcases of new charts for feedback
3. **UAT** (Week 7): Stakeholder validation with 3-5 users
4. **Training & Handover** (Week 8): 3 sessions, documentation, go-live support

---

**Prepared by:**
SPi Global Content Holdings Pte. Ltd. (Straive)
**Contact:** Swapnil Ranadive — swapnil.ranadive@straive.com, +44-795-8400469
**Authorized Signatory:** Anand S — s.anand@gramener.com

**Date:** November 14, 2025
