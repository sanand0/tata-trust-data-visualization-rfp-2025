#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.12"
# dependencies = ["numpy>=1.26","pandas>=2.2","scipy>=1.10","httpx"]
# ///
from __future__ import annotations
import numpy as np, pandas as pd, random
from datetime import datetime

def month_range(start: str="2023-01-01", end: str="2025-10-01") -> list[pd.Timestamp]:
    """Monthly timestamps inclusive of start."""
    return list(pd.date_range(start=start, end=end, freq="MS"))

def generate() -> pd.DataFrame:
    """District-month outcomes with seasonality, gender, age mix, and data flags."""
    rng = np.random.default_rng(21)
    states = ["Andhra Pradesh","Assam","Bihar","Gujarat","Jharkhand","Karnataka","Maharashtra","Odisha","Rajasthan","Tamil Nadu","Uttar Pradesh","West Bengal"]
    months = month_range()
    rows = []
    for s in states:
        for d in range(1, 9):
            district = f"{s.split()[0]}-Dist-{d:02d}"
            base_need = rng.uniform(0.35, 0.9)
            female_base = rng.uniform(0.40, 0.55)
            for m in months:
                theme = random.choice(["Health","Education","Livelihoods","WASH","Skilling"])
                monsoon = int(m.month in [6,7,8,9])
                visits_per_1k = float(max(0.2, rng.normal(3.0 + 3.2*base_need - 0.6*monsoon, 0.8)))
                funds_on_time = float(np.clip(rng.normal(0.58 + 0.22*base_need - 0.05*monsoon, 0.12), 0, 1))
                dq = float(np.clip(rng.normal(0.62 + 0.18*funds_on_time, 0.12), 0, 1))
                female_pct = float(np.clip(rng.normal(female_base + 0.10*(theme=="Skilling"), 0.05), 0.25, 0.75))
                training = int(max(0, rng.normal(5 + 2*base_need, 2)))
                outreach_pre_monsoon = int(m.month in [4,5])
                beneficiaries = int(rng.poisson(180 + 70*base_need + 10*visits_per_1k + 4*training))
                # age buckets that sum to beneficiaries
                age0_5 = int(max(0, rng.normal(0.12*beneficiaries*(theme=="Health") + 0.05*beneficiaries, 5)))
                age6_17 = int(max(0, rng.normal(0.35*beneficiaries*(theme=="Education") + 0.18*beneficiaries, 8)))
                age18_35 = int(max(0, rng.normal(0.38*beneficiaries, 10)))
                age36_plus = max(0, beneficiaries - age0_5 - age6_17 - age18_35)
                outcome = float(np.clip(48 + 8*visits_per_1k + 11*funds_on_time + 6*dq + 2*training - 3*monsoon + rng.normal(0,4), 0, 100))
                dropout = float(np.clip(0.22 - 0.04*visits_per_1k - 0.05*dq - 0.035*funds_on_time - 0.03*outreach_pre_monsoon - 0.05*(theme=="Skilling")*female_pct + rng.normal(0,0.02), 0.01, 0.50))
                nps = float(np.clip(-15 + 40*funds_on_time + 23*dq - 28*dropout + rng.normal(0,6), -100, 100))
                data_issue_flag = "OK"
                if rng.uniform() < 0.08:
                    data_issue_flag = "MISSING_AGE"
                    age0_5, age6_17, age18_35, age36_plus = 0,0,0,0
                rows.append({
                    "state": s,"district": district,"month": m.date(),"theme": theme,
                    "visits_per_1k": round(visits_per_1k,2),"funds_on_time": round(funds_on_time,3),
                    "data_quality": round(dq,3),"female_pct": round(female_pct,3),
                    "training_sessions": training,"outreach_pre_monsoon": outreach_pre_monsoon,"monsoon": monsoon,
                    "beneficiaries": beneficiaries,"age0_5": age0_5,"age6_17": age6_17,"age18_35": age18_35,"age36_plus": age36_plus,
                    "outcome_score": round(outcome,1),"dropout_rate": round(dropout,3),"nps": round(nps,1),
                    "data_issue_flag": data_issue_flag
                })
    df = pd.DataFrame(rows)
    if len(df) > 2000:
        df = df.sample(2000, random_state=1).sort_values(["state","district","month"])
    return df.reset_index(drop=True)

if __name__ == "__main__":
    df = generate()
    df.to_csv("beneficiary_outcomes.csv", index=False)
    print("beneficiary_outcomes.csv")
