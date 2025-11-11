#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.12"
# dependencies = ["numpy>=1.26","pandas>=2.2","scipy>=1.10","httpx"]
# ///
from __future__ import annotations
import numpy as np, pandas as pd
from datetime import datetime
import math

def generate(grants_csv: str="grants_portfolio.csv") -> pd.DataFrame:
    """Multi‑tranche disbursement schedule per grant with timeliness and delays."""
    g = pd.read_csv(grants_csv, parse_dates=["start_date","end_date"])
    rows = []
    rng = np.random.default_rng(55)
    for _, r in g.iterrows():
        budget = r["budget_m_inr"] * 1_000_000
        n = int(r["n_tranches"])
        weights = rng.dirichlet(np.ones(n) + np.linspace(1.2, 0.6, n))  # front‑loaded
        tranche_amts = (weights * budget).round(0)
        months = int(r["months"])
        # schedule equally in time
        step = max(1, months // n)
        for i in range(n):
            sched_date = (r["start_date"] + pd.offsets.DateOffset(months=i*step)).date()
            on_time_prob = 0.55 + 0.35*r["disbursement_timeliness"]
            paid_on_time = int(rng.uniform() < on_time_prob)
            delay_days = 0 if paid_on_time else int(np.clip(rng.normal(12, 6), 2, 45))
            rows.append({
                "grant_id": r["grant_id"],
                "tranche_no": i+1,
                "scheduled_date": sched_date,
                "amount_inr": int(tranche_amts[i]),
                "paid_on_time": paid_on_time,
                "days_delayed": delay_days
            })
    return pd.DataFrame(rows)

if __name__ == "__main__":
    df = generate()
    df.to_csv("grant_tranches.csv", index=False)
    print("grant_tranches.csv")
