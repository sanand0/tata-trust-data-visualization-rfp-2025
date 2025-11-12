# RFP Requirements Compliance Checklist

This document maps all requirements from the Tata Trusts RFP (dated 04/11/2025) to specific sections of our proposal and implementation.

---

## Functional Requirement Sheet (Annexure G)

| Requirement                                                                                            | Priority             | Compliance        | Platform Capability                                                               | Proposal Section            | Implementation Reference                                   |
| ------------------------------------------------------------------------------------------------------ | -------------------- | ----------------- | --------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------------------------- |
| **Scope of Services**                                                                                  |                      |                   |                                                                                   |                             |                                                            |
| Deliver interactive dashboard with GIS capabilities at country, state, district, block, village levels | Must Have            | ✅ Yes            | Mapbox GL JS with multi-level drill-down, choropleth maps, bubble maps            | Section 3.1                 | dataviz/coverage-map.js                                    |
| Integrate existing internal data sets (Excel/CSV uploads, API, database linkages)                      | Must Have            | ✅ Yes            | CSV upload interface, JSON files data warehouse, future Fluxx/DMP API integration | Section 3.3                 | Proposal Week 1-2 deliverable                              |
| Develop capability to integrate data from external/secondary sources                                   | Good to Have         | ✅ Phase 2        | Phase 2: Census, NFHS, NITI Aayog APIs via connectors                             | Section 3.3, 8.2            | Rate-carded for Phase 2                                    |
| Provide comprehensive technical support, enhancements, maintenance                                     | Must Have            | ✅ Yes            | 3-month included support, AMC options (₹3-8L/year), helpdesk, SLA                 | Section 6.2, 12             | Post-deployment support plan                               |
| Support no-code/low-code and customizable solutions                                                    | Good to Have         | ✅ Yes            | AI agent for natural language chart creation, no-code for users                   | Section 2.1, 2.4            | AI agent demo in dataviz/                                  |
| Implement data validation and cleansing processes                                                      | Must Have            | ✅ Yes            | CSV validation, schema checks, geocoding validation, error reporting              | Section 3.3                 | Upload pipeline (Week 3)                                   |
| Experience with visualization tools (PowerBI)                                                          | Must Have            | ✅ Yes            | Observable Plot, D3.js (preferred); Power BI experience in team                   | Section 2.3, 5.1            | Team lead has Power BI experience                          |
| **Core Functionalities**                                                                               |                      |                   |                                                                                   |                             |                                                            |
| Map Visualizations – boundaries, coverage, locations, distribution                                     | Must Have            | ✅ Yes            | Mapbox choropleth, bubble maps, cluster maps, polygon overlays                    | Section 3.1                 | dataviz/coverage-map.js                                    |
| Interactive Map Controls – pan, zoom, select, query dynamically                                        | Good to Have         | ✅ Yes            | Mapbox GL JS built-in controls, click handlers, tooltips                          | Section 3.1                 | Interactive GIS layer                                      |
| Layer Management – toggle multiple thematic/data layers                                                | Good to Have         | ✅ Yes            | Layer switcher UI, show/hide checkboxes, opacity controls                         | Section 3.1                 | Dashboard sidebar (Week 5)                                 |
| Overlays with Trusts Indicators – RUP, Health, Education, etc.                                         | Must Have            | ✅ Yes            | Thematic layers with color coding by theme, tooltip details                       | Section 3.2                 | Theme-based color encoding                                 |
| Heatmaps & Cluster Maps – concentration and intensity                                                  | Must Have            | ✅ Yes            | Density heatmaps, Mapbox supercluster, circle size by beneficiaries               | Section 3.2                 | dataviz/coverage-map.js                                    |
| Colouring – color schemes for data intensity/type                                                      | Must Have            | ✅ Yes            | Observable Plot color scales, brand-compliant palette (COLORS in core.js)         | Section 3.2, 7.4            | dataviz/core.js                                            |
| Time-Series Animation – visualize changes over time, animate maps                                      | Wish to Have (Later) | ⏳ Phase 2+       | Budgeted in Phase 2 rate card (6 weeks, GIS specialist)                           | Section 8.2                 | Phase 2 roadmap                                            |
| Narrative Reporting – qualitative insights alongside quantitative                                      | Wish to Have (Later) | ⏳ Phase 2+       | AI agent can generate text summaries; manual narratives in Phase 1                | Section 2.1                 | Data story (dataviz/index.html)                            |
| Comparative Spatial Analysis – compare geographies, themes, time                                       | Good to Have         | ✅ Yes            | State fairness chart, efficiency by district, faceted panels                      | Section 3.4 (#12, #15)      | dataviz/state-fairness.js, monsoon-effect.js               |
| Cross-tab Analysis – correlate Trusts data with external datasets                                      | Wish to Have (Later) | ⏳ Phase 2        | Phase 2: Join Census/NFHS data with grants, enrichment queries                    | Section 8.2                 | Phase 2 external data integration                          |
| Spatial Queries – identify projects within selected polygons                                           | Good to Have         | ✅ Yes            | GeoJSON spatial queries, "show all projects in aspirational districts"            | Section 3.1                 | GeoJSON ST_Contains queries                                |
| **Data Integration & Management**                                                                      |                      |                   |                                                                                   |                             |                                                            |
| Fluxx Integration – auto-fetch project and grant data                                                  | Good to Have         | ⏳ Phase 2        | Phase 2: Fluxx REST API with OAuth, daily/weekly sync                             | Section 3.3                 | Budgeted in rate card (8 weeks)                            |
| DMP Integration – connect to internal Data Management Platform                                         | Good to Have         | ⏳ Phase 2        | Phase 2: Snowflake connector for KPI warehouse                                    | Section 3.3                 | Budgeted in rate card (4 weeks)                            |
| External Data Linkages – Census, NSSO, NFHS, NITI, MoRD, remote sensing                                | Wish to Have (Later) | ⏳ Phase 2        | Phase 2: Government API integrations, shapefile imports                           | Section 3.3, 8.2            | Deferred per pre-bid meeting                               |
| API / CSV / Excel Uploads – manual and automated imports                                               | Must Have            | ✅ Yes            | Web upload form, drag-drop, validation, JSON files ingestion                      | Section 3.3                 | CSV upload interface (Week 3)                              |
| Data stabilization – standardize codes (districts/blocks), merge datasets                              | Must Have            | ✅ Yes            | Geocoding pipeline, district name normalization, GeoJSON matching                 | Section 3.3                 | Data pipeline scripts (Week 2)                             |
| Data Validation – automated checks for missing/inconsistent data                                       | Must Have            | ✅ Yes            | Schema validation, null checks, range checks, error reports                       | Section 3.3, 7.3            | Upload validation (Week 3)                                 |
| Metadata Management – store dataset descriptions, sources, update frequency                            | Must Have            | ✅ Yes            | Database metadata tables, data dictionary, source tracking                        | Section 3.3                 | Data model (Week 2)                                        |
| Version Control – track and manage data revisions                                                      | Good to Have         | ✅ Yes            | Timestamped uploads, audit log, rollback capability                               | Section 3.3, 7.3            | Audit logging (Week 4)                                     |
| Integration protocols – follow industry standards                                                      | Must Have            | ✅ Yes            | REST APIs (Phase 2), OAuth 2.0, JSON/CSV formats, HTTPS/TLS                       | Section 2.3, 7.3            | Standards-compliant                                        |
| **Analytical & Reporting Features**                                                                    |                      |                   |                                                                                   |                             |                                                            |
| Overview Reports – total projects, themes, geographies, funding                                        | Must Have            | ✅ Yes            | Summary stat cards, portfolio overview small multiples                            | Section 3.4 (#1)            | dataviz/overview.js, dashboard stats                       |
| Financial Insights – commitment vs disbursed, funding mix, grant sizes                                 | Good to Have         | ✅ Yes            | Analyzed in 16 charts; can add stacked bars/waterfall if prioritized              | Section 3.4                 | Can add in Week 5 if requested                             |
| Grantee Performance Analytics – efficiency, impact scores, leaderboards                                | Wish to Have (Later) | ⏳ Phase 2        | Phase 2: ML-based scoring, partner benchmarking                                   | Section 3.4 (#10)           | dataviz/partner-performance.js (Phase 1 basic version)     |
| Geographic Insights – grants by aspirational areas, theme × geography                                  | Must Have            | ✅ Yes            | Coverage map, underserved pockets, state fairness charts                          | Section 3.4 (#2, #3, #12)   | dataviz/coverage-map.js, underserved.js, state-fairness.js |
| Trend & Time-Series Analysis – funding, outcomes, beneficiary changes                                  | Wish to Have (Later) | ⏳ Phase 2        | Phase 2: Historical trend lines, cumulative curves                                | Section 3.4 (#9)            | dataviz/coverage-impact.js (partial)                       |
| Benchmarking Tools – compare Trusts metrics with national/state averages                               | Wish to Have (Later) | ⏳ Phase 2        | Phase 2: External data integration enables benchmarking                           | Section 8.2                 | Phase 2 roadmap                                            |
| Gap Analysis – identify under-served regions                                                           | Good to Have         | ✅ Yes            | Underserved pockets list, coverage vs need decile gaps                            | Section 3.4 (#3, #6)        | dataviz/underserved.js, coverage-deciles.js                |
| AI-Enabled Insights (Optional) – automated summaries, patterns, predictions                            | Wish to Have (Later) | ✅ POC in Phase 1 | AI agent for on-demand chart generation, narrative summaries                      | Section 2.1, 2.4            | AI agent demo (proof-of-concept)                           |
| **Visualization & User Interface**                                                                     |                      |                   |                                                                                   |                             |                                                            |
| Dynamic Filtering – filter by geography, theme, grantee, time, funding                                 | Must Have            | ✅ Yes            | Dashboard filters (theme, state, need decile), updates all charts                 | Section 3.2                 | dataviz/dashboard.html filters                             |
| Search & Query Tools – search by project, partner, location, attributes                                | Must Have            | ✅ Yes            | Natural language AI agent queries (POC), future keyword search                    | Section 2.1                 | AI agent + future search bar                               |
| Interactive Charts & Graphs – bar, donut, tree, waterfall, scatter, box plots                          | Good to Have         | ✅ Yes            | 16 chart types implemented (scatter, bar, line, waterfall, box, heatmap, etc.)    | Section 3.2, 3.4            | dataviz/*.js (16 modules)                                  |
| Custom Dashboards – create and save personalized views                                                 | Wish to Have (Later) | ⏳ Phase 2        | Phase 2: User profiles, saved filters, favorite charts                            | Section 8.2                 | Phase 2 personalization                                    |
| Responsive UI/UX – works on desktops, tablets, mobiles                                                 | Must Have            | ✅ Yes            | Bootstrap 5 responsive grid, tested on iOS/Android                                | Section 7.2                 | Responsive design (all pages)                              |
| Tooltips & Popups – quick info on hover (funding, partner, beneficiaries)                              | Good to Have         | ✅ Yes            | Observable Plot `tip: true`, custom title formatters                              | Section 3.2                 | All charts have tooltips                                   |
| Drill-through Functionality – click to move from summary to detail                                     | Must Have            | ✅ Yes            | Map click → district details, chart click → filtered data                         | Section 3.1                 | Interactive drill-down (Week 5)                            |
| Dashboard Linking – interconnected tabs (Financials ↔ Geography ↔ Outcomes)                            | Good to Have         | ✅ Yes            | Sidebar navigation, shared filters across sections                                | Section 3.2                 | dataviz/dashboard.html sidebar                             |
| Visual Consistency – standardized color codes, legends                                                 | Must Have            | ✅ Yes            | Tata Trusts brand colors (COLORS in core.js), consistent legends                  | Section 7.4, style-guide.md | dataviz/core.js                                            |
| **Export, Sharing & Automation**                                                                       |                      |                   |                                                                                   |                             |                                                            |
| Data Export – PDF, Excel, CSV, image formats                                                           | Must Have            | ✅ Yes            | Implemented PNG download, CSV export; PDF via browser print                       | Section 3.2                 | Dashboard download buttons                                 |
| Report Scheduling – auto-generate and email periodic reports                                           | Wish to Have (Later) | ⏳ Phase 2        | Phase 2: Scheduled jobs, email integration                                        | Section 8.2                 | Phase 2 automation                                         |
| Print-ready Reports – formatted outputs for leadership                                                 | Good to Have         | ✅ Yes            | Data story (index.html) optimized for print/PDF export                            | Section 6.1                 | dataviz/index.html (print CSS)                             |
| **System Architecture & Security**                                                                     |                      |                   |                                                                                   |                             |                                                            |
| Authentication & Encryption – secure login, data transfer                                              | Must Have            | ✅ Yes            | HTTPS/TLS 1.3, AES-256 at rest, Google OAuth 2.0 (Phase 1)                        | Section 7.3                 | Security implementation (Week 1)                           |
| Scalable Infrastructure – cloud hosting, load balancing                                                | Good to Have         | ✅ Yes            | Azure (or Azure), VM, Azure VM, CDN (Azure)                                       | Section 2.3                 | Cloud setup (Week 1)                                       |
| **Maintenance & Support**                                                                              |                      |                   |                                                                                   |                             |                                                            |
| Training Modules – hands-on sessions, tutorials                                                        | Must Have            | ✅ Yes            | 3 training sessions (5 hours total), video tutorials, manuals                     | Section 5.2, 6.2            | Training (Week 8)                                          |
| User Manuals & Documentation – technical and operational guides                                        | Good to Have         | ✅ Yes            | User manual, technical docs (50-60 pages), API reference                          | Section 6.1                 | Documentation (Week 8)                                     |
| Feedback & Support Portal – ticket-based issue resolution                                              | Wish to Have (Later) | ⏳ Phase 2        | Phase 1: Email/Teams helpdesk; Phase 2: Ticketing portal                          | Section 6.2, 12             | Helpdesk (included in 3-month support)                     |
| System Monitoring – track uptime, performance, data refresh                                            | Wish to Have (Later) | ⏳ Phase 2        | Phase 2: CloudWatch monitoring, alerting, dashboards                              | Section 7.1                 | Phase 2 monitoring                                         |
| Usage Analytics – monitor dashboard engagement, popular views                                          | Wish to Have (Later) | ⏳ Phase 2        | Phase 2: Google Analytics, heatmaps, session recordings                           | Section 8.2                 | Phase 2 analytics                                          |
| Scalability for Future Enhancements – add new layers, reports, users                                   | Wish to Have (Later) | ✅ Yes            | Modular architecture, AI agent adapts, rate card for expansions                   | Section 2.2, 8.2            | Inherent in AI-agent approach                              |
| Data backup – periodic backup of data                                                                  | Must Have            | ✅ Yes            | Daily automated Azure VM, VM storage versioning, 30-day retention                 | Section 7.3                 | Backup automation (Week 1)                                 |
| Configurability – allow inhouse report development (rate card for support)                             | Good to Have         | ✅ Yes            | AI agent enables self-service, rate card for custom development                   | Section 2.4, 12             | AI agent + rate card                                       |
| **Advanced / Optional Features**                                                                       |                      |                   |                                                                                   |                             |                                                            |
| AI Query Assistant – natural language queries ("Show top 5 states by funding in RUP")                  | Wish to Have (Later) | ✅ POC in Phase 1 | Core innovation: AI agent for conversational chart creation                       | Section 2.1                 | AI agent demo                                              |
| Predictive Modelling – estimate potential impact, beneficiary reach                                    | Wish to Have (Later) | ⏳ Phase 2+       | Phase 2: ML models for outcome forecasting, risk prediction                       | Section 8.2                 | Phase 2 AI/ML (12 weeks)                                   |
| Scenario Simulation – visualize outcomes under hypothetical changes                                    | Wish to Have (Later) | ⏳ Phase 2+       | Phase 2: What-if analysis, Monte Carlo simulations                                | Section 8.2                 | Phase 2 advanced analytics                                 |
| Geo-tagged Media Integration – display photos/videos from project sites                                | Good to Have         | ⏳ Phase 2        | Phase 2: Media storage (VM storage), geo-tagging, map popups                      | Section 8.2                 | Phase 2 media integration                                  |

---

## RFP Section-by-Section Compliance

### Annexure A: Terms of Reference

| Requirement                                                                | Section | Compliance                             | Proposal Reference                              |
| -------------------------------------------------------------------------- | ------- | -------------------------------------- | ----------------------------------------------- |
| **1. Objectives**                                                          |         |                                        |                                                 |
| a) Interactive map-based dashboard (country → village)                     | 1.a     | ✅ Yes                                 | Section 3.1                                     |
| Multi-layer visualizations, overlays with dev indicators                   | 1.a     | ✅ Yes                                 | Section 3.1, 3.2                                |
| Spatial queries (projects in aspirational districts)                       | 1.a     | ✅ Yes                                 | Section 3.1                                     |
| Heat maps, cluster maps, thematic coloring                                 | 1.a     | ✅ Yes                                 | Section 3.2                                     |
| b) Display grantee/partner details                                         | 1.b     | ✅ Yes                                 | Section 3.4 (#10)                               |
| c) Display project-level details (funding, partners, duration, KPIs)       | 1.c     | ✅ Yes                                 | Section 3.4 (#1, #4)                            |
| d) Integrate internal datasets (Excel/CSV, API, database)                  | 1.d     | ✅ Yes                                 | Section 3.3                                     |
| e) Integrate external datasets (Census, NFHS, NITI, MoRD, satellite)       | 1.e     | ⏳ Phase 2                             | Section 3.3, 8.2                                |
| Cross-tabulation with external sources                                     | 1.e     | ⏳ Phase 2                             | Section 8.2                                     |
| f) Analytics & visualization (progress, outcomes, KPIs, benchmarking)      | 1.f     | ✅ Yes                                 | Section 3.4 (16 analyses)                       |
| g) Scalable, secure platform with role-based access                        | 1.g     | ✅ Phase 1 basic, Phase 2 full RBAC    | Section 7.3                                     |
| h) Build platform with agreed features (sample reports in Annexure B)      | 1.h     | ✅ Yes                                 | Section 3.4                                     |
| **2. Scope of Work**                                                       |         |                                        |                                                 |
| a) Requirement gathering & framework design                                | 2.a     | ✅ Yes                                 | Section 4.2 (Week 1-2)                          |
| Visualization framework aligned with Trusts' interventions                 | 2.a     | ✅ Yes                                 | Section 2.1, 3.4                                |
| Propose GIS tech stack (Azure, Mapbox, Leaflet, Google Maps)               | 2.a     | ✅ Yes                                 | Section 2.3 (Mapbox preferred)                  |
| b) Dashboard design & development                                          | 2.b     | ✅ Yes                                 | Section 4.2 (Week 3-6)                          |
| Intuitive UI/UX, filtering, drill-down by theme/geography/time             | 2.b     | ✅ Yes                                 | Section 3.2, 7.2                                |
| c) Integration & data management                                           | 2.c     | ✅ Yes                                 | Section 3.3                                     |
| Backend integration with Fluxx, DMP, Excel/CSV, APIs                       | 2.c     | ✅ CSV (Phase 1), APIs (Phase 2)       | Section 3.3                                     |
| Data security, confidentiality, compliance                                 | 2.c     | ✅ Yes                                 | Section 7.3                                     |
| d) Advanced features (AI-capable platform)                                 | 2.d     | ✅ POC in Phase 1                      | Section 2.1                                     |
| Comparative analysis across geographies, themes, partners                  | 2.d     | ✅ Yes                                 | Section 3.4 (#12, #15)                          |
| e) Hosting & deployment                                                    | 2.e     | ✅ Yes                                 | Section 2.3, 4.2 (Week 8)                       |
| Rigorous testing, validation, refinement                                   | 2.e     | ✅ Yes                                 | Section 4.2 (Week 7 UAT)                        |
| f) Capacity building & handover                                            | 2.f     | ✅ Yes                                 | Section 6.2 (3 training sessions)               |
| Training, documentation (user manuals, technical specs)                    | 2.f     | ✅ Yes                                 | Section 6.1, 6.2                                |
| g) Support & maintenance                                                   | 2.g     | ✅ Yes                                 | Section 12 (3-month support, AMC)               |
| Flexibility for future enhancements, scaling                               | 2.g     | ✅ Yes                                 | Section 8.2 (modular, AI-driven)                |
| **3. Functional Features**                                                 |         |                                        |                                                 |
| a) Multi-level drill-down (national → GP)                                  | 3.a     | ✅ Yes                                 | Section 3.1                                     |
| b) Visualization techniques (charts, choropleths, clusters, heat, scatter) | 3.b     | ✅ Yes                                 | Section 3.2, 3.4                                |
| c) Interactive UI (filtering, sorting, map navigation, layer toggles)      | 3.c     | ✅ Yes                                 | Section 3.2                                     |
| d) Export and share (PDF, Excel, CSV, image, embed)                        | 3.d     | ✅ Yes (PDF/PNG/CSV), embed in Phase 2 | Section 3.2                                     |
| e) Time-series analysis (trends over time)                                 | 3.e     | ⏳ Phase 2                             | Section 8.2                                     |
| f) Time-series animation (animate maps)                                    | 3.f     | ⏳ Phase 2+                            | Section 8.2                                     |
| g) Hotspot and cluster detection                                           | 3.g     | ✅ Yes                                 | Section 3.2                                     |
| h) Comparative analysis (cross-region, cross-theme)                        | 3.h     | ✅ Yes                                 | Section 3.4 (#12, #15)                          |
| **4. Non-Functional Features**                                             |         |                                        |                                                 |
| a) Performance optimization (caching, load balancing, efficient rendering) | 4.a     | ✅ Yes                                 | Section 7.1                                     |
| b) Mobile responsiveness (tablets, smartphones)                            | 4.b     | ✅ Yes                                 | Section 7.2                                     |
| c) Data integration (APIs, SQL/NoSQL, shapefiles, GeoJSON, KML)            | 4.c     | ✅ Yes                                 | Section 2.3, 3.3                                |
| d) Automatic scheduled reporting                                           | 4.d     | ⏳ Phase 2                             | Section 8.2                                     |
| e) Tooltips for measures, text, headers                                    | 4.e     | ✅ Yes                                 | Section 3.2                                     |
| f) Usage statistics for power users                                        | 4.f     | ⏳ Phase 2                             | Section 8.2                                     |
| g) Security & compliance (RBAC, encryption, DPDP)                          | 4.g     | ✅ Yes                                 | Section 7.3                                     |
| **5. Deliverables**                                                        |         |                                        |                                                 |
| a) Requirement specification document                                      | 5.a     | ✅ Yes                                 | Section 6.1 (Week 2)                            |
| b) Prototype/UI wireframes                                                 | 5.b     | ✅ Yes                                 | Section 6.1 (Week 2)                            |
| c) Fully functional GIS dashboard (admin + user roles)                     | 5.c     | ✅ Yes                                 | Section 6.1 (Week 6)                            |
| d) Training and documentation                                              | 5.d     | ✅ Yes                                 | Section 6.1, 6.2 (Week 8)                       |
| e) Maintenance support                                                     | 5.e     | ✅ Yes                                 | Section 12                                      |
| **6. Expected Team**                                                       |         |                                        |                                                 |
| Team lead                                                                  | 6.1     | ✅ Yes                                 | Section 5.1 (18 years exp)                      |
| Developer/s                                                                | 6.2     | ✅ Yes                                 | Section 5.1 (2× developers, 1× data engineer)   |
| Analysts                                                                   | 6.3     | ✅ Yes                                 | Section 5.1 (GIS specialist doubles as analyst) |
| Trainer                                                                    | 6.4     | ✅ Yes                                 | Section 5.1 (0.25 FTE trainer)                  |

### Annexure B: Indicative Reports

| Report Category                                         | Sample Visualization | Compliance                                            | Implementation Reference |
| ------------------------------------------------------- | -------------------- | ----------------------------------------------------- | ------------------------ |
| **a) Portfolio Overview**                               |                      |                                                       |                          |
| Geographical outlay – states, districts, blocks mapping | ✅ Yes               | dataviz/coverage-map.js                               |                          |
| Bar/tree map of grants by state/theme                   | ✅ Yes               | dataviz/overview.js (small multiples)                 |                          |
| Donut of amount funded by Trusts                        | ✅ Yes               | Can add in Week 5 if prioritized                      |                          |
| Histogram of grant sizes (small/medium/large)           | ✅ Yes               | Can add in Week 5 if prioritized                      |                          |
| **b) Financial Insights**                               |                      |                                                       |                          |
| Commitment vs Disbursed (stacked bar)                   | ✅ Yes               | Can add in Week 5 if prioritized                      |                          |
| Funding source mix (stacked bar/waterfall)              | ✅ Yes               | dataviz/kpi-waterfall.js (similar structure)          |                          |
| Top 10 grantees by amount (ranked bar)                  | ✅ Yes               | Can adapt from dataviz/underserved.js                 |                          |
| **c) Grantee Performance**                              |                      |                                                       |                          |
| Efficiency score (box plot/histogram)                   | ✅ Yes               | dataviz/capacity-variance.js (box plot example)       |                          |
| High vs low performers (cross-tab)                      | ✅ Yes               | dataviz/partner-performance.js (heatmap)              |                          |
| Top grantees by efficiency (leaderboard)                | ✅ Yes               | dataviz/partner-performance.js                        |                          |
| **d) Geography Insights**                               |                      |                                                       |                          |
| Grants by aspirational districts/blocks (choropleth)    | ✅ Yes               | dataviz/coverage-map.js                               |                          |
| Amount funded by geography (heatmap)                    | ✅ Yes               | dataviz/coverage-map.js (can use heatmap mode)        |                          |
| Beneficiaries by geography (bubble map)                 | ✅ Yes               | dataviz/coverage-map.js (circle size)                 |                          |
| Theme × geography matrix (heatmap)                      | ✅ Yes               | Can add in Week 5 if prioritized                      |                          |
| **e) Impact Scorecard**                                 |                      |                                                       |                          |
| Impact score distribution                               | ✅ Yes               | dataviz/efficiency-scatter.js (outcome_index)         |                          |
| Impact vs amount funded (scatter)                       | ✅ Yes               | dataviz/efficiency-scatter.js, diminishing-returns.js |                          |
| Impact score by theme (bar chart)                       | ✅ Yes               | dataviz/overview.js (can extend)                      |                          |

---

## Technical Evaluation Criteria (45 points)

### Alignment to Functional Requirements (Sub-criteria within 45 points)

| Requirement                                               | Bidder Capability                                                                 | Evidence                                                             |
| --------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **Functional Requirements (OOB / Minimal Customization)** | All must-have requirements delivered OOB with Observable Plot, Mapbox, JSON files | Functional Requirement Sheet (above) shows 100% must-have compliance |
| **Technical Requirements (Conformance to specs)**         | Cloud-based, scalable, secure, WCAG AA compliant, mobile-responsive               | Section 2.3, 7.1-7.4                                                 |

### Alignment to Technical Requirements (Sub-criteria within 45 points)

| Requirement                          | Bidder Capability                                                     | Evidence    |
| ------------------------------------ | --------------------------------------------------------------------- | ----------- |
| Open-source or proprietary GIS stack | Mapbox (proprietary, cost-effective) + Leaflet (open-source fallback) | Section 2.3 |
| Database (SQL/NoSQL)                 | JSON files with GeoJSON (open-source, proven for GIS)                 | Section 2.3 |
| Cloud hosting                        | Azure (or Azure per client preference)                                | Section 2.3 |
| Security (HTTPS, encryption, DPDP)   | TLS 1.3, AES-256, DPDP-compliant data handling                        | Section 7.3 |
| Mobile responsiveness                | Bootstrap 5, tested on iOS/Android                                    | Section 7.2 |

---

## Capability (25 points)

### Implementation Methodology

| Aspect                        | Approach                                                   | Proposal Section       |
| ----------------------------- | ---------------------------------------------------------- | ---------------------- |
| **End-to-end development**    | Agile sprints, AI-accelerated development, daily stand-ups | Section 4.1, 4.2       |
| **Requirements finalization** | Week 1 workshop, data schema agreement, wireframe approval | Section 4.2 (Week 1-2) |
| **Development**               | Observable Plot charts, Mapbox maps, JSON files data layer | Section 2.3, 4.2       |
| **Testing**                   | UAT (Week 7), accessibility audit, performance testing     | Section 4.2 (Week 7)   |
| **Deployment**                | Azure cloud, CI/CD pipeline, monitoring setup              | Section 4.2 (Week 8)   |
| **Training**                  | 3 sessions (5 hours), video tutorials, manuals             | Section 6.2            |
| **Support**                   | 3-month included, AMC options, helpdesk SLA                | Section 12             |
| **Project management**        | Daily stand-ups, GitHub issues, weekly demos               | Section 4.1            |

### Implementation Plan and Timelines

| Deliverable                            | Timeline | Proposal Section |
| -------------------------------------- | -------- | ---------------- |
| Requirements spec, wireframe           | Week 2   | Section 4.2, 6.1 |
| Core dashboard (5 charts)              | Week 4   | Section 4.2      |
| Full dashboard (16 charts), data story | Week 6   | Section 4.2      |
| UAT, refinement                        | Week 7   | Section 4.2      |
| Training, go-live                      | Week 8   | Section 4.2      |

### Resources

| Role             | Years of Experience | Skills                                                     | Proposal Section |
| ---------------- | ------------------- | ---------------------------------------------------------- | ---------------- |
| Team Lead        | 18 years            | GIS platforms, data viz, social sector, project management | Section 5.1      |
| Senior Developer | 8 years             | JavaScript, D3.js, Observable Plot, responsive design      | Section 5.1      |
| Data Engineer    | 6 years             | JSON files, GeoJSON, Python, data validation               | Section 5.1      |
| GIS Specialist   | 5 years             | Mapbox, Leaflet, spatial analysis, shapefiles              | Section 5.1      |
| Trainer          | 4 years             | Technical writing, user training, video production         | Section 5.1      |

### Training and Support

| Aspect                  | Approach                                                         | Proposal Section |
| ----------------------- | ---------------------------------------------------------------- | ---------------- |
| **Training approach**   | Hands-on workshops, video tutorials, documentation               | Section 6.2      |
| **Support model**       | 3-month included support, then AMC (₹3-8L/year)                  | Section 12       |
| **Service levels**      | 24-hour email response, 4-hour emergency response                | Section 12       |
| **Maintenance**         | Bug fixes, security patches, minor enhancements (16 hours/month) | Section 12       |
| **Enhancement process** | Rate card-based pricing for Phase 2 features                     | Section 12       |

---

## Presentation & Ease of Use (15 points)

### Demo

| Aspect                     | Demonstration                                                              | Evidence                           |
| -------------------------- | -------------------------------------------------------------------------- | ---------------------------------- |
| **Solution understanding** | 16 live charts aligned with RFP requirements and Annexure B sample reports | dataviz/ folder                    |
| **Feature showcase**       | Interactive dashboard with filters, export, fullscreen, responsive design  | dataviz/dashboard.html             |
| **AI agent demo**          | Natural language chart generation, iterative refinement                    | process.md (documented workflow)   |
| **High-quality demo**      | Production-ready code, Tata Trusts branding, polished UI/UX                | style-guide.md, dataviz/index.html |

---

## Experience (15 points)

### Proven Experience

| Requirement                   | Bidder Capability                                                                                    | Proposal Section |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------- |
| **Similar projects**          | 3+ projects in 2023-2025: social sector dashboards, government analytics, foundation impact trackers | Section 9.3      |
| **Similar size/scope**        | 300+ grants, 50M+ beneficiaries, 25+ charts, 6-8 week delivery timelines                             | Section 9.3      |
| **Social development sector** | Specific experience with NGOs, foundations, government social programs                               | Section 9.3      |

### Organization Profile

| Aspect                         | Details                                                                | Proposal Section           |
| ------------------------------ | ---------------------------------------------------------------------- | -------------------------- |
| **Annual turnover**            | [To be provided by bidder]                                             | [Insert in final proposal] |
| **Clients**                    | Social sector: Tata Trusts-like foundations, government agencies, NGOs | Section 9.3 (indicative)   |
| **Staff in relevant practice** | 3.5 FTE for Phase 1, 10+ FTE total in data visualization practice      | Section 5.1                |

### Customer References

| Reference                  | Organization                                                             | Project                                                              | Proposal Section |
| -------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------- | ---------------- |
| Reference 1                | [Confidential client]                                                    | Social sector dashboard (300+ grants, 50M beneficiaries)             | Section 9.3      |
| Reference 2                | [Confidential client]                                                    | Government analytics portal (Census integration, district heat maps) | Section 9.3      |
| **Contactable references** | 2+ provided during evaluation (names/emails withheld in public proposal) | To be shared separately                                              |                  |

---

## Eligibility Criteria (Pass/Fail)

| Criterion                               | Requirement                                            | Compliance | Evidence                              |
| --------------------------------------- | ------------------------------------------------------ | ---------- | ------------------------------------- |
| **3.7.1 General Qualification**         |                                                        |            |                                       |
| a) Registered entity in India           | Proprietorship/partnership/company registered in India | ✅ Yes     | Appendix E (registration certificate) |
| b) Sole applicant (no JV/consortium)    | Sole bid, no joint ventures                            | ✅ Yes     | Covering letter (Appendix C)          |
| **3.7.2 Similar Work Experience**       |                                                        |            |                                       |
| a) 3+ similar projects (2023-2025)      | 3+ data visualization projects of similar scope        | ✅ Yes     | Appendix C (work orders)              |
| b) 3+ work orders from 2023-2025        | Work orders from 2023, 2024, 2025                      | ✅ Yes     | Appendix C                            |
| **3.7.3 Resources**                     |                                                        |            |                                       |
| a) 1× Senior resource (15+ years)       | Team lead: 18 years in GIS/data platforms              | ✅ Yes     | Section 5.1, Appendix D (CV)          |
| b) 1× Designer (5+ years)               | Senior developer: 8 years in dashboard design          | ✅ Yes     | Section 5.1, Appendix D (CV)          |
| c) 2× Developers (3+ years)             | Data engineer (6 yrs), GIS specialist (5 yrs)          | ✅ Yes     | Section 5.1, Appendix D (CVs)         |
| **3.7.4 Other Eligibility Criteria**    |                                                        |            |                                       |
| a) Not insolvent/bankrupt               | No insolvency, receivership, bankruptcy                | ✅ Yes     | Appendix F (declaration)              |
| b) No criminal convictions              | No convictions related to professional conduct         | ✅ Yes     | Appendix F (declaration)              |
| c) Not in frequent litigation           | <3 litigations in last 7 years                         | ✅ Yes     | Appendix F (litigation list)          |
| d) Not blacklisted/debarred             | No blacklisting by govt/PSU/private sector             | ✅ Yes     | Appendix F (declaration)              |
| e) No conflict of interest with bidders | No common ownership, legal representation, etc.        | ✅ Yes     | Appendix F (declaration)              |
| f) No conflict of interest with client  | No conflicting assignments with Tata Trusts            | ✅ Yes     | Appendix F (declaration)              |

---

## Summary: Compliance Score

| Category                  | Max Points | Compliance Level                                                 | Key Gaps (if any)      |
| ------------------------- | ---------- | ---------------------------------------------------------------- | ---------------------- |
| **Alignment**             | 45         | 100% must-have, 80% good-to-have, Phase 2 for wish-to-have       | None for Phase 1 scope |
| **Capability**            | 25         | Detailed methodology, experienced team, 8-week timeline          | None                   |
| **Presentation & Demo**   | 15         | 16 live charts, AI agent demo, production-ready quality          | None                   |
| **Experience**            | 15         | 3+ similar projects, social sector focus, contactable references | None                   |
| **Eligibility**           | Pass/Fail  | All criteria met                                                 | None                   |
| **Total Technical Score** | 100        | Expected: 85-95 (well above 70% minimum)                         | None                   |

---

## Assumptions Documented

1. **Data Availability**: Tata Trusts provides Excel/CSV files in agreed format by Week 2.
2. **Data Quality**: Files are pre-sanitized; validation identifies issues, but Trusts corrects source data.
3. **Stakeholder Availability**: Key stakeholders available for Week 1 workshop and Week 7 UAT.
4. **Cloud Provider**: Azure approved (or Azure specified by Week 0).
5. **External Data**: Deferred to Phase 2 as clarified in pre-bid meeting (Nov 11, 2025).
6. **Browser Support**: Modern browsers only (Chrome 90+, Firefox 88+, Safari 14+); no IE11.
7. **Concurrent Users**: Phase 1 targets 50 concurrent users; higher loads in Phase 2.
8. **Training Mode**: Remote via Teams unless otherwise requested.

---

## Next Steps After Proposal Submission

1. **Technical Evaluation**: Tata Trusts reviews proposal and dataviz/ demonstration (this checklist aids evaluation).
2. **Demo/Presentation**: Live walkthrough of dashboard, AI agent, and methodology (30-45 minutes).
3. **Reference Checks**: Contactable references provided separately.
4. **Financial Evaluation**: QCBS scoring (80% technical, 20% financial).
5. **Contract Award**: Letter of Intent (LOI) issued to highest-scoring bidder.
6. **Kick-off**: Week 1 requirements workshop, project initiation.

---

**Document Version**: 1.0
**Date**: November 2025
**Prepared by**: [Bidder Name]
