#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.12"
# dependencies = ["numpy>=1.26","pandas>=2.2","scipy>=1.10","httpx","faker>=19"]
# ///
from __future__ import annotations
import numpy as np, pandas as pd, random
from datetime import datetime, timedelta

def generate(n: int=900) -> pd.DataFrame:
    """Grants with partner info, budgets, outcomes, risks, tranches summary."""
    rng = np.random.default_rng(12)
    states = [
        "Andhra Pradesh","Assam","Bihar","Chhattisgarh","Gujarat","Jharkhand","Karnataka",
        "Madhya Pradesh","Maharashtra","Odisha","Rajasthan","Tamil Nadu","Telangana","Uttar Pradesh","West Bengal"
    ]
    themes = ["Health","Education","Livelihoods","WASH","Skilling"]
    partners = pd.DataFrame({
        "partner_id": [f"PARTNER-{i:03d}" for i in range(1,141)],
        "partner_name": [f"Partner {i:03d}" for i in range(1,141)],
        "partner_type": np.random.choice(["NGO","Academic","Government","CSR"], size=140, p=[0.6,0.15,0.05,0.20]),
        "hq_state": np.random.choice(states, size=140),
        "years_with_trust": np.random.randint(0, 11, size=140),
    })
    partners["prior_grants"] = (partners["years_with_trust"] * np.random.uniform(0.7,1.6, size=140)).astype(int)
    # Theme budget scales (in INR millions)
    theme_mu = {"Health": 85, "Education": 70, "Livelihoods": 45, "WASH": 55, "Skilling": 35}
    rows = []
    for gid in range(1, n+1):
        theme = random.choice(themes)
        state = random.choice(states)
        district = f"{state.split()[0]}-Dist-{rng.integers(1,21):02d}"
        p = partners.sample(1, random_state=int(rng.integers(1,10_000))).iloc[0]
        start = datetime(rng.integers(2021, 2025), rng.integers(1,13), 1)
        duration_m = int(rng.integers(8, 28))
        end = start + pd.offsets.DateOffset(months=duration_m)
        # Need and capacity
        need = float(np.clip(rng.beta(2.2, 2.2), 0.2, 0.95))
        capacity = int(np.clip(int(rng.normal(3 + 0.1*p.prior_grants, 1.0)), 1, 5))
        rural_share = float(np.clip(rng.normal(0.65, 0.15), 0.25, 0.98))
        # Budget by theme (log-normal around theme_mu)
        budget_m = float(np.clip(rng.lognormal(mean=np.log(theme_mu[theme]), sigma=0.45), 8, 250))
        # Ops performance tied to capacity & process
        timeliness = float(np.clip(0.42 + 0.10*capacity + rng.normal(0,0.06), 0, 1))
        reporting = float(np.clip(0.40 + 0.12*capacity + rng.normal(0,0.07), 0, 1))
        variance = float(np.clip(rng.normal(0.22 - 0.035*capacity, 0.05), -0.18, 0.45))
        # Outcome & beneficiaries with diminishing returns
        base = 58 + 8*(theme=="Health") + 5*(theme=="Education")
        diminish = 1.0 - 0.14*np.log1p(budget_m/90.0)
        outcome = float(np.clip(base + 30*(0.55*timeliness + 0.25*need + 0.20*rural_share)*diminish + rng.normal(0,5), 0, 100))
        beneficiaries = int(max(60, (budget_m*42) * (0.55 + 0.55*need) * (0.45 + 0.55*rural_share) * (1 - 0.16*np.log1p(budget_m/100.0)) + rng.normal(0,120)))
        cost_per_ben = int(budget_m*1_000_000 / beneficiaries)
        risk = int(np.clip(4.2 - 0.55*capacity + 0.6*need + rng.normal(0,0.6), 1, 5))
        # Tranches summary (details in grant_tranches.csv)
        n_tranches = int(np.clip(int(rng.normal(3.5, 1.1)), 2, 6))
        rows.append({
            "grant_id": f"G{gid:04d}","theme": theme,"state": state,"district": district,
            "partner_id": p.partner_id,"partner_name": p.partner_name,"partner_type": p.partner_type,"hq_state": p.hq_state,
            "years_with_trust": int(p.years_with_trust),"prior_grants": int(p.prior_grants),
            "start_date": start.date(),"end_date": end.date(),"months": duration_m,
            "budget_m_inr": round(budget_m,2),"n_tranches": n_tranches,
            "need_index": round(need,3),"rural_share": round(rural_share,3),
            "partner_capacity": capacity,"disbursement_timeliness": round(timeliness,3),
            "on_time_reporting": round(reporting,3),"budget_variance_pct": round(variance,3),
            "beneficiaries": beneficiaries,"cost_per_beneficiary_inr": cost_per_ben,
            "outcome_index": round(outcome,1),"risk_rating": risk
        })
    df = pd.DataFrame(rows)
    # Introduce small, realistic missingness flags
    mask = np.random.rand(len(df)) < 0.05
    df.loc[mask, "budget_variance_pct"] = np.nan
    df["data_quality_flag"] = np.where(df["on_time_reporting"] < 0.5, "LATE_REPORTING", "OK")
    return df

if __name__ == "__main__":
    df = generate()
    df.to_csv("grants_portfolio.csv", index=False)
    print("grants_portfolio.csv")
