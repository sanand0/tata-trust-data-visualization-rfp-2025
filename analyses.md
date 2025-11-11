# Analyses

## Executive staples (most common and useful)

1. **Money → Reach → Outcomes overview** (Visual: 4. Useful: 5. Overall: 4.6. Rank: #2)
   - **What**: Aggregate by theme and by state: total budget, beneficiaries, outcomes average, cost per beneficiary, and risk mix.
   - **Why**: Leadership wants a one-page read on where money went, how many people were reached, and what changed. This guides portfolio rebalancing and messaging.
   - **Visuals**: Two small-multiple bar stacks (by theme and by state) for budget and beneficiaries. A paired column with an overlay line for outcome score. Add data labels for top two and bottom two groups and a subtitle that states the single biggest driver you see.
2. **Outcomes per rupee and beneficiaries per rupee** (Visual: 5. Useful: 5. Overall: 5.0. Rank: #1)
   - **What**: Compute outcomes per million INR and beneficiaries per million INR by theme, state, and partner_type.
   - **Why**: Shows efficiency. Highlights where to double down and where to redesign.
   - **Visuals**: Scatter with “beneficiaries per ₹” on x and “outcomes per ₹” on y. Size by budget. Color by theme. Add quadrant lines at medians and call out the outliers with labels.
3. **Targeting need: coverage vs deprivation (district)** (Visual: 5. Useful: 5. Overall: 5.0. Rank: #1)
   - **What**: Join **geo_need_coverage** to a bivariate view of `coverage_actual_per_1k` vs `deprivation_score` and `need_decile`.
   - **Why**: Confirms whether coverage reaches the people who need it most.
   - **Visuals**: Bivariate choropleth map. Add a “top 15 underserved” table filtered on `need_decile ≥ 8` and `coverage_gap_per_1k > 0`.
4. **Timeliness health check** (Visual: 3. Useful: 4. Overall: 3.6)
   - **What**: In **grants_portfolio**, review `disbursement_timeliness`, `on_time_reporting`, and `budget_variance_pct` by partner and theme. In **grant_tranches**, show rate of `paid_on_time`.
   - **Why**: Timeliness creates or kills trust with partners and beneficiaries.
   - **Visuals**: Bullet charts per partner for timeliness and reporting. A bar with confidence intervals for on-time tranche share by theme. Flag any partner below a threshold in red.
5. **KPI attainment and its drivers** (Visual: 4. Useful: 5. Overall: 4.6. Rank: #2)
   - **What**: From **monitoring_quality**, analyze what predicts `kpi_met`: `data_quality_score`, `audit_score`, `resolution_time_days`, `template_use`, `standups_per_week`, and `early_warning_active`.
   - **Why**: Shows which levers to move next week to improve results.
   - **Visuals**: A waterfall that shows the incremental lift in KPI attainment as you turn each lever on. Add a simple decision rule callout like “Visits ≥ 5 and standups ≥ 2 predicts KPI met in X% of months.”
6. **Partner performance league table** (Visual: 4. Useful: 4. Overall: 4.0)
   - **What**: Rank partners on combined score: outcomes per ₹, timeliness, and risk. Control for `need_index` so you do not penalize tough contexts.
   - **Why**: Helps with renewals and capacity investments.
   - **Visuals**: Heatmap table by partner_id with three columns and traffic-light colors. Freeze the top five and bottom five rows for quick review.
7. **Expected disbursement calendar** (Visual: 3. Useful: 4. Overall: 3.6)
   - **What**: From **grant_tranches**, lay out all scheduled tranches by month and compare planned vs on-time.
   - **Why**: Cash flow planning and early risk calls.
   - **Visuals**: Monthly stacked bars for planned vs delayed tranches. Annotate the three busiest months and the two worst delay spikes.
8. **Budget control** (Visual: 3. Useful: 4. Overall: 3.6)
   - **What**: In **grants_portfolio**, analyze `budget_variance_pct` by partner_capacity and partner_type.
   - **Why**: Confirms that capacity reduces variance and points to training needs.
   - **Visuals**: Boxplots of variance by capacity level. Add a trend line and a note that states “variance halves from capacity 2 to 4” if the slope is strong.
9. **Theme deep dives** (Visual: 3. Useful: 4. Overall: 3.6)
   - **What**: For each theme, show outcomes vs beneficiaries and cost per beneficiary spread across states.
   - **Why**: Lets each theme owner see where they over- or under-perform.
   - **Visuals**: Small multiple scatter panels, one per theme, with state labels for the top and bottom performers.
10. **Data quality governance** (Visual: 3. Useful: 4. Overall: 3.6)
    - **What**: Track `data_quality_flag` in **grants_portfolio** and `data_issue_flag` in **beneficiary_outcomes**. Compare affected rates by partner and region.
    - **Why**: Keeps the dashboard trustworthy.
    - **Visuals**: Pareto bar of issue types and a control chart of issue rate over months. Call out partners with persistent issues.

## Operational levers and learning loops

11. **Template use and standups reduce time to resolution** (Visual: 3. Useful: 4. Overall: 3.6)
    - **What**: In **monitoring_quality**, test how `template_use` and `standups_per_week` relate to `resolution_time_days` and `reporting_lag_days`.
    - **Why**: If simple routines speed resolution, scale them.
    - **Visuals**: Two violin plots by template_use for resolution time and reporting lag, with median labels. Add a slopegraph of average times by standup bucket.
12. **Early warning reduces severe issues** (Visual: 3. Useful: 4. Overall: 3.6)
    - **What**: Compare months with `early_warning_active = 1` vs 0 on `severe_issues` and `kpi_met`.
    - **Why**: Validates early warning processes.
    - **Visuals**: Dumbbell chart for average severe issues across the two groups. Add a badge that states the percentage reduction.
13. **Funds on time → NPS and dropout** (Visual: 4. Useful: 4. Overall: 4.0)
    - **What**: In **beneficiary_outcomes**, relate `funds_on_time` to `nps` and `dropout_rate`.
    - **Why**: Ties finance operations to beneficiary experience.
    - **Visuals**: Two scatter plots with fitted lines. Annotate the “sweet spot” zone where NPS is high and dropout is low.
14. **Site visits and training lift data quality** (Visual: 3. Useful: 4. Overall: 3.6)
    - **What**: In **monitoring_quality**, relate `site_visits` and `training_hours` to `data_quality_score` and `audit_score`.
    - **Why**: Justifies travel and training budgets.
    - **Visuals**: 2D bin heatmap of visits vs training with average data quality as color. Mark the “good enough” corner where returns begin to flatten.
15. **Reporting discipline and outcomes** (Visual: 3. Useful: 4. Overall: 3.6)
    - **What**: In **grants_portfolio**, compare `on_time_reporting` with `outcome_index` and `risk_rating`.
    - **Why**: Shows that good hygiene links to results and lower risk.
    - **Visuals**: Scatter with a smooth line and a color band by risk. Label the high-reporting high-outcome cluster.

## Geographic targeting and fairness

16. **Need vs coverage deciles** (Visual: 4. Useful: 5. Overall: 4.6. Rank: #2)
    - **What**: In **geo_need_coverage**, plot `coverage_actual_per_1k` by `need_decile`.
    - **Why**: Fast check that higher need gets higher coverage.
    - **Visuals**: Line chart across deciles with a target line for `coverage_target_per_1k`. Color the gap area.
17. **Underserved pockets list** (Visual: 5. Useful: 5. Overall: 5.0. Rank: #1)
    - **What**: Filter districts with `need_decile ≥ 8` and positive `coverage_gap_per_1k`.
    - **Why**: Ready-to-act list for reallocation.
    - **Visuals**: Ranked bar chart showing coverage gap. Attach a small sparkline per bar for spend per capita to spot “low spend” districts.
18. **Urban spend anomalies** (Visual: 4. Useful: 4. Overall: 4.0)
    - **What**: Identify `urban_spend_anomaly = 1` and show if outcomes justify the spend. Join to outcomes if useful.
    - **Why**: Checks for misallocation toward easier or visible urban areas.
    - **Visuals**: Scatter of `spend_per_capita_inr` vs outcomes with anomaly points in a different color and labels.
19. **State fairness dashboard** (Visual: 4. Useful: 4. Overall: 4.0)
    - **What**: For each state, compare share of budget vs share of high-need population.
    - **Why**: Fairness discussions with leadership.
    - **Visuals**: 100% stacked bars for “budget share” and “need share” side by side. Add a delta label above each pair.

## Inclusion, theme strategy, and seasonality

20. **Women in skilling and dropout** (Visual: 4. Useful: 4. Overall: 4.0)
    - **What**: In **beneficiary_outcomes**, test how `female_pct` in Skilling relates to `dropout_rate`.
    - **Why**: If higher participation reduces dropout, set targets for female inclusion.
    - **Visuals**: Scatter with bins and a trend line. Highlight the range where dropout falls fastest.
21. **Age mix and outcomes by theme** (Visual: 3. Useful: 3. Overall: 3.0)
    - **What**: Use age buckets with `theme` to see where each theme’s target group lines up with better outcomes.
    - **Why**: Confirms that programs are reaching the right cohorts.
    - **Visuals**: Small multiple stacked bars of age buckets with an overlaid dot for outcome score.
22. **Monsoon effect and pre-monsoon outreach** (Visual: 4. Useful: 4. Overall: 4.0)
    - **What**: Compare monsoon months to other months on `outcome_score` and `dropout_rate`. Also test `outreach_pre_monsoon = 1`.
    - **Why**: Plan special actions before the rains.
    - **Visuals**: Paired bars for outcome and dropout, one pair per season. Add an annotation for the uplift from pre-monsoon outreach.

## Money, risk, and partner decisions

23. **Diminishing returns at large budgets** (Visual: 4. Useful: 5. Overall: 4.6. Rank: #2)
    - **What**: In **grants_portfolio**, test whether `outcome_index` per ₹ flattens or drops at very high `budget_m_inr`.
    - **Why**: Prevent over-capitalization of individual grants.
    - **Visuals**: Scatter with a smoothed curve. Shade the “diminishing zone” and list three grants to split next year.
24. **Capacity lowers variance and risk** (Visual: 3. Useful: 5. Overall: 4.2)
    - **What**: Relate `partner_capacity` to `budget_variance_pct` and `risk_rating`.
    - **Why**: A small investment in capacity can save a lot downstream.
    - **Visuals**: Two side-by-side boxplots with a note that states the expected variance reduction across capacity bands.
25. **Timeliness ripple effect** (Visual: 4. Useful: 5. Overall: 4.6. Rank: #2)
    - **What**: Join **grant_tranches** back to **grants_portfolio** and test if tranche delays predict lower `outcome_index` at the grant level.
    - **Why**: Proves that payment systems are not “back office” but central to outcomes.
    - **Visuals**: Bar chart of average outcome for grants with “mostly on time” vs “mostly late”. Add counts and confidence ribbons.
26. **Partner tenure and learning curve** (Visual: 3. Useful: 4. Overall: 3.6)
    - **What**: See if `years_with_trust` and `prior_grants` predict better `on_time_reporting`, `budget_variance_pct`, and outcomes.
    - **Why**: Supports multi-year partnerships and frameworks.
    - **Visuals**: Trend line with shaded confidence band. Label the “learning saturation” point.

## Quality and reliability

27. **Data issue hotspots** (Visual: 3. Useful: 4. Overall: 3.6)
    - **What**: In **beneficiary_outcomes**, map `data_issue_flag = MISSING_AGE` by district and by partner where identifiable.
    - **Why**: Focus clean-up effort where it matters most.
    - **Visuals**: Choropleth with proportional symbols for issue rate. Add a right-hand table with the five worst districts.
28. **Audit vs outcomes alignment** (Visual: 3. Useful: 4. Overall: 3.6)
    - **What**: In **monitoring_quality**, correlate `audit_score` with later `kpi_met` rates.
    - **Why**: Confirms that audits reflect real performance rather than paperwork.
    - **Visuals**: Lag plot with dots sized by `training_hours`. Annotate the zone where audit > 85 predicts KPI met.

## Big, useful, and likely surprising insights

29. **High-need but low-coverage districts drive most missed outcomes** (Visual: 4. Useful: 5. Overall: 4.6. Rank: #2)
    - **What**: Combine `need_decile`, `coverage_gap_per_1k`, and outcomes. Quantify how much portfolio-level outcome would improve if you closed the top ten gaps.
    - **Why**: A small reallocation can produce a large win.
    - **Visuals**: Cumulative impact curve that shows “percent of additional outcomes unlocked” as you close gaps one by one. Label the “top ten close the majority of the gap” point if true.
30. **Urban anomalies consume spend without outcome lift** (Visual: 4. Useful: 4. Overall: 4.0)
    - **What**: In districts flagged with `urban_spend_anomaly = 1`, compare outcomes and NPS with matched non-anomaly districts.
    - **Why**: Points to prestige projects that underperform.
    - **Visuals**: Matched-pair dumbbells with lines between each pair. A note that states the average delta.
31. **Small process changes beat large budget top-ups** (Visual: 4. Useful: 5. Overall: 4.6. Rank: #2)
    - **What**: Simulate improving `standups_per_week` from 1 to 3 and `template_use` from 0 to 1. Compare predicted KPI lift to adding 15% budget to similar grants.
    - **Why**: Cheap operational levers can beat costly budget increases.
    - **Visuals**: Two bars per scenario describing expected KPI lift. Add a label “best value” on the higher bar.
32. **Pre-monsoon outreach cuts dropout significantly** (Visual: 4. Useful: 4. Overall: 4.0)
    - **What**: Estimate average treatment effect of `outreach_pre_monsoon = 1` on `dropout_rate`, controlling for `visits_per_1k` and `funds_on_time`.
    - **Why**: Makes the case for seasonal playbooks.
    - **Visuals**: A simple dot-whisker plot showing the effect size with confidence intervals. Title states the reduction as a percentage.
33. **Female participation in Skilling lowers dropout and raises NPS** (Visual: 4. Useful: 4. Overall: 4.0)
    - **What**: Within Skilling rows, relate `female_pct` to `dropout_rate` and `nps`.
    - **Why**: Inclusion improves program performance.
    - **Visuals**: Two scatter plots with bins and trend lines. Add callouts for the female_pct range where both lines are most favorable.
34. **Split the whales** (Visual: 4. Useful: 5. Overall: 4.6. Rank: #2)
    - **What**: Identify very large grants with low marginal outcomes per ₹ and propose splitting into two smaller grants in the same districts and theme.
    - **Why**: Spreading large bets can raise overall efficiency.
    - **Visuals**: Frontier chart with convex hull. Mark the “whales” in a different color and add a hypothetical split point arrow.
35. **Capacity lift plan** (Visual: 4. Useful: 5. Overall: 4.6. Rank: #2)
    - **What**: Find partners at capacity 2–3 with good need contexts but high variance. Simulate a capacity increase of one level and estimate expected variance and outcome gains.
    - **Why**: Targets a coaching program where it will pay off fastest.
    - **Visuals**: Before-after bars for variance and outcome per partner. Add a small “weeks of training” badge to make the ask tangible.

<!--

Source: https://chatgpt.com/c/6912f432-0b18-8322-befe-068cfcb333c7

-->
