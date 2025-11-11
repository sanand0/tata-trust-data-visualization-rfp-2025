#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.12"
# dependencies = ["numpy>=1.26","pandas>=2.2","scipy>=1.10","httpx"]
# ///
from __future__ import annotations
import numpy as np, pandas as pd, random
from datetime import datetime

def month_range(start: str="2024-01-01", end: str="2024-12-01") -> list[pd.Timestamp]:
    """Monthly timestamps for a year."""
    return list(pd.date_range(start=start, end=end, freq="MS"))

def generate(n_projects: int=160) -> pd.DataFrame:
    """Project-month monitoring with levers, lags, and KPI attainment."""
    rng = np.random.default_rng(44)
    months = month_range()
    rows = []
    for pid in range(1, n_projects+1):
        maturity = rng.uniform(0.3, 0.85)
        template_use = int(rng.uniform() < (0.35 + 0.45*maturity))
        standups = int(np.clip(rng.normal(2.2 + 1.6*maturity, 0.7), 0, 7))
        early_warning = int(rng.uniform() < 0.6)
        for m in months:
            visits = int(max(0, rng.normal(3 + 4*maturity, 1.2)))
            training = float(np.clip(rng.normal(6 + 4*maturity, 2.0), 0, 30))
            issues = int(max(0, rng.normal(7 - 2.5*maturity, 2.0)))
            severe = int(np.clip(0.6*issues - 1.4*early_warning - 0.4*standups + rng.normal(0,1.0), 0, issues))
            res_time = float(np.clip(9 - 2.8*template_use - 0.7*standups + rng.normal(0,1.1), 1, 25))
            dq = float(np.clip(0.56 + 0.06*visits + 0.02*training - 0.03*severe - 0.01*issues + 0.03*early_warning + 0.02*standups + rng.normal(0,0.04), 0, 1))
            audit = float(np.clip(60 + 14*dq + 0.7*training - 1.2*issues + 3*standups + 2*template_use + rng.normal(0,4), 0, 100))
            lag = float(np.clip(3.5 - 1.0*template_use - 0.4*standups + rng.normal(0,0.8), 0, 10))
            kpi_met = int((dq > 0.75) or (audit > 85) or (res_time < 5))
            rows.append({
              "project_id": f"P{pid:04d}","month": m.date(),
              "site_visits": visits,"training_hours": round(training,1),
              "template_use": template_use,"standups_per_week": standups,"early_warning_active": early_warning,
              "issues_opened": issues,"severe_issues": severe,
              "resolution_time_days": round(res_time,1),"reporting_lag_days": round(lag,1),
              "data_quality_score": round(dq,3),"audit_score": round(audit,1),"kpi_met": kpi_met
            })
    df = pd.DataFrame(rows)
    if len(df) > 2000:
        df = df.sample(1900, random_state=2).sort_values(["project_id","month"])
    return df.reset_index(drop=True)

if __name__ == "__main__":
    df = generate()
    df.to_csv("monitoring_quality.csv", index=False)
    print("monitoring_quality.csv")
