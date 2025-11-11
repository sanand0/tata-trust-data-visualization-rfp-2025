# Part A — Dataset prioritization

## 1. Ten kinds of data likely in play

1. Grants portfolio & disbursements (project master, budgets, tranches, timelines)
2. Beneficiary reach & outcomes by district-month
3. Geographic coverage vs deprivation/need index at district level
4. Program monitoring & data quality (site visits, audits, issue logs)
5. Thematic results by program (Health, Education, Livelihoods, WASH, Skilling)
6. Partner capacity & risk (ratings, on-time reporting, audit history)
7. Financial burn & variance (planned vs actual, aging, cashflow)
8. Training & capacity building (sessions, attendance, pre/post scores)
9. Grievances & redressal (tickets, SLA, categories, outcomes)
10. Communications & adoption (dashboard usage, report downloads, stakeholder activity)

## 2. What insights they’ll seek and best visualizations

1. **Grants portfolio & disbursements**
   - Insights: burn rate; on-time disbursement; outcome vs timeliness; cost per beneficiary; risk hot spots.
   - Visuals: timeline Gantt with status; waterfall for plan→actual; small-multiple lines by theme; choropleth by disbursed per capita; bubble plot cost vs impact.
2. **Beneficiary reach & outcomes**
   - Insights: retention; dropout drivers; NPS vs funding timeliness; seasonal continuity; gender inclusion.
   - Visuals: monthly line charts; heatmaps by district×month; cohort funnels; slopegraphs for before/after; dot plots for NPS vs on-time funds.
3. **Geo coverage vs need**
   - Insights: targeting efficiency; under-served high-need districts; spend-per-capita fairness; urban bias anomalies.
   - Visuals: choropleth with bivariate legend (need vs coverage); treemap by state→district; scatter with decile bands; cluster maps.
4. **Monitoring & data quality**
   - Insights: what levers move KPIs; effect of standups/visits/templates on resolution time; early warning and severe issues.
   - Visuals: control charts; beeswarm of audit scores; Pareto of issues; lag plots of visits→data quality; funnel of kpi_met.
5. **Thematic results**
   - Insights: which theme delivers best impact per ₹; time-to-first-impact; differential outcomes by rural share.
   - Visuals: small-multiple lines; ridge plots of outcomes; bar charts with confidence intervals.
6. **Partner capacity & risk**
   - Insights: capacity→on-time reporting; budget variance by capacity; repeat selection decisions.
   - Visuals: violin plots; side-by-side boxplots; risk heatmaps.
7. **Financial burn & variance**
   - Insights: overruns; slow burners; quarter-wise slippage; cumulative variance vs outcomes.
   - Visuals: cumulative burn; variance tornado; calendar heatmap of slippages.
8. **Training & capacity building**
   - Insights: training hours→audit scores; long-term retention and errors reduced.
   - Visuals: dose–response curves; pre/post histograms; regression lines.
9. **Grievances & redressal**
   - Insights: SLA adherence; categories with recurring issues; geography with chronic backlog.
   - Visuals: stacked bars by category; SLA gauge; Sankey from category→resolution.
10. **Communications & adoption**

- Insights: which dashboards drive action; top filters; sessions before decision points.
- Visuals: usage funnels; session timelines; cohort retention curves.

## 3. Quick evaluation (1–5)

|  # | Dataset                          | Domain relevance | Ease of visualizing | Impactfulness |
| -: | -------------------------------- | :--------------: | :-----------------: | :-----------: |
|  1 | Grants portfolio & disbursements |        5         |          5          |       5       |
|  2 | Beneficiary reach & outcomes     |        5         |          4          |       5       |
|  3 | Geo coverage vs need             |        5         |          4          |       5       |
|  4 | Monitoring & data quality        |        5         |          4          |       4       |
|  5 | Thematic results                 |        4         |          4          |       4       |
|  6 | Partner capacity & risk          |        4         |          4          |       4       |
|  7 | Financial burn & variance        |        4         |          3          |       4       |
|  8 | Training & capacity building     |        3         |          4          |       3       |
|  9 | Grievances & redressal           |        3         |          4          |       3       |
| 10 | Communications & adoption        |        3         |          3          |       3       |

## 4. Top four to build now

1. Grants portfolio & disbursements
2. Beneficiary reach & outcomes
3. Geo coverage vs need
4. Monitoring & data quality

These four together let leadership see money→reach→need→quality in one story.

# Part B — Dataset generation

Below are the objectives, hypotheses, and what the scripts generate. All four hypotheses sets are baked into the data with strong effect sizes so analyses will be statistically convincing.

## 1. Grants portfolio & disbursements

**Columns and distributions**
`grant_id, theme, state, district, start_date, end_date, months, partner_capacity (1–5, skew to 3–4), need_index (0–1, 0.3–0.9), rural_share (0.3–0.95), budget_m_inr (log-normal), disbursement_timeliness (0–1), on_time_reporting (0–1), budget_variance_pct (-15% to +45%), beneficiaries, cost_per_beneficiary_inr, outcome_index (0–100), risk_rating (1–5).`

**Objective**
Maximize outcomes per rupee while reducing risk.

**Hypotheses encoded**

1. Higher partner capacity raises on-time reporting and lowers budget variance.
2. Better disbursement timeliness lifts outcome index.
3. Higher need boosts marginal impact but increases risk.
4. Larger budgets show diminishing returns on outcomes per spend.
5. Higher rural share in high-need areas increases beneficiaries per ₹.

## 2. Beneficiary reach & outcomes (district–month)

**Columns and distributions**
`state, district, month, theme, visits_per_1k (0.2–10), funds_on_time (0–1), data_quality (0–1), female_pct (0.25–0.75), training_sessions (0–20), outreach_pre_monsoon {0,1}, beneficiaries (Poisson), outcome_score (0–100), dropout_rate (0.01–0.45), nps (-100–100).`

**Objective**
Improve outcome score and retention while raising NPS.

**Hypotheses encoded**

1. More visits per 1k lifts outcome score.
2. In Skilling, higher female_pct reduces dropout.
3. Outreach before monsoon reduces dropout.
4. On-time funds increase NPS.
5. Better data quality reduces dropout and increases outcomes.

## 3. Geo coverage vs need

**Columns and distributions**
`state, district, population, deprivation_score (0–100), poverty_rate, literacy_rate, urbanization_rate, coverage_per_1k, spend_per_capita_inr, underserved_pocket {0,1}, urban_spend_anomaly {0,1}, theme_mismatch_flag {0,1}.`

**Objective**
Align coverage and spend to need; surface under-served pockets.

**Hypotheses encoded**

1. Coverage and spend rise with deprivation.
2. 15% of high-need districts are under-served to reveal gaps.
3. 5% urban anomalies show high spend in low-need districts.
4. Theme mismatches cluster.
5. Higher coverage deciles should correlate with better results (downstream).

## 4. Monitoring & data quality (project–month)

**Columns and distributions**
`project_id, month, site_visits, training_hours, template_use {0,1}, standups_per_week (0–7), issues_opened, severe_issues, resolution_time_days, data_quality_score (0–1), audit_score (0–100), kpi_met {0,1}, early_warning_active {0,1}.`

**Objective**
Cut resolution time and severe issues; raise data quality and audit scores; meet KPIs.

**Hypotheses encoded**

1. More site visits and training raise data quality and audit scores.
2. Template use cuts resolution time.
3. Early warning reduces severe issues.
4. More standups reduce issues and raise KPI attainment.
5. Higher data quality and audit scores drive kpi_met.

## How to run locally

With `uv` installed, any script runs like this:

```bash
uv run grants_portfolio.py
uv run beneficiary_outcomes.py
uv run geo_need_coverage.py
uv run monitoring_quality.py
```

Each script writes a CSV next to itself. Feel free to tweak themes, states, date ranges, and row counts inside the scripts to better match your demo.

# Improvements

1. Missing partner context
   - Before: No partner identity.
   - Now: Each grant links to a realistic `partner_id`, `partner_name`, `partner_type` (NGO/Academic/Government/CSR), `hq_state`, `years_with_trust`, and `prior_grants`.
2. No multi-tranche disbursement reality
   - Before: Lump-sum budgets only.
   - Now: A separate **grant_tranches** dataset with 2–6 tranches per grant, front-loaded amounts, scheduled dates over project months, `paid_on_time`, and `days_delayed` driven by the grant’s `disbursement_timeliness`.
3. Budgets and beneficiaries not theme-sensitive
   - Before: Similar distributions across themes.
   - Now: Theme-specific scale (e.g., Health/Education higher), log-normal budgets, diminishing returns in `outcome_index` and `beneficiaries` as budgets get very large.
4. No clear “need” vs “capacity” causal structure
   - Before: Weak relationships → flat visuals.
   - Now: `need_index` and `partner_capacity` drive `disbursement_timeliness`, `on_time_reporting`, `budget_variance_pct`, `outcome_index`, and risk. Effects are tuned to be statistically obvious yet realistic.
5. No data quality or missingness
   - Before: Perfect data.
   - Now: Minor, targeted anomalies and flags (e.g., `data_quality_flag`, occasional missing `budget_variance_pct`, age-bucket suppression for some rows in outcomes, `underserved_pocket` and `urban_spend_anomaly` in geo).
6. Seasonality and operations not reflected
   - Before: Flat across months/seasons.
   - Now: Monsoon months (Jun–Sep) reduce outcomes; pre-monsoon outreach helps; monitoring cadence (template use, standups, early warning) drives `reporting_lag_days`, `data_quality_score`, and `kpi_met`.
7. No geographic “need vs coverage” tension
   - Before: Coverage numbers lacked context.
   - Now: A geo dataset with `deprivation_score`, `need_decile`, `coverage_target_per_1k`, `coverage_actual_per_1k`, `coverage_gap_per_1k`, and `spend_per_capita_inr`. High-need districts sometimes flagged as `underserved_pocket`.
8. No realistic categorical variety for dashboards
   - Before: Few categorical pivots.
   - Now: Plenty of pivots: theme, state, partner type, need deciles, rural share, flags, etc., that make drill-downs compelling.
9. No FK/PK relationships
   - Before: Isolated tables.
   - Now: `grant_tranches.csv` references `grant_id` from `grants_portfolio.csv` for joined visuals.
10. File/script hygiene
    - Before: Scripts didn’t always match CSV names and some paths were absolute.
    - Now: Each script name matches its CSV output (e.g., `grants_portfolio.py` → `grants_portfolio.csv`). Scripts write to the current working directory (no `/mnt/data` paths in code). I executed generation here so you can download immediately.

How the improved datasets line up with the call & RFP

- Internal leadership dashboard with drill-downs: themes, states, partner types, need deciles, KPI flags.
- Phase-1 realism: CSV/Excel ingestion, dynamic visuals, no external API dependency required to demo.
- Phase-2 extensibility: `grant_tranches` and monitoring tables are structured to slot into APIs and warehouses later.
- Role-based access and AI scenarios: monitoring and outcomes tables include levers and outcomes that make “what-if” or LLM-assisted insight demos meaningful when you’re ready.

## About the scripts

Each script starts with your requested header and writes to the **current working directory** (no hardcoded paths). Script name equals CSV name:

- **[grants_portfolio.py](grants_portfolio.py) → [grants_portfolio.csv](grants_portfolio.csv)**: Grants with partner identity, budgets, capacity, need, ops metrics, outcomes, risk, and a `n_tranches` summary for the tranches table.
- **[beneficiary_outcomes.py](beneficiary_outcomes.py) → [beneficiary_outcomes.csv](beneficiary_outcomes.csv)**: District-month data with monsoon effects, funds timeliness, data quality, outreach/training levers, gender and age buckets, outcomes, dropout, NPS, and data-issue flags.
- **[geo_need_coverage.py](geo_need_coverage.py) → [geo_need_coverage.csv](geo_need_coverage.csv)**: District-level need vs coverage with gaps, spend per capita, deprivation deciles, and anomaly flags.
- **[monitoring_quality.py](monitoring_quality.py) → [monitoring_quality.csv](monitoring_quality.csv)**: Project-month monitoring levers → lag/time/quality/audit/KPI outcomes.
- **[grant_tranches.py](grant_tranches.py) → [grant_tranches.csv](grant_tranches.csv)**: One row per tranche per grant, front-loaded Dirichlet amounts, scheduled dates, timeliness and delays. Reads `grants_portfolio.csv` in the same folder.

<!--

- Dataset Generation: https://chatgpt.com/c/6912f432-0b18-8322-befe-068cfcb333c7

-->
