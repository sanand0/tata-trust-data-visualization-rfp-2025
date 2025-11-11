#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.12"
# dependencies = ["numpy>=1.26","pandas>=2.2","scipy>=1.10","httpx"]
# ///
from __future__ import annotations
import numpy as np, pandas as pd, random

def generate(n_districts: int=220) -> pd.DataFrame:
    """District-level deprivation vs actual coverage with targets and gaps."""
    rng = np.random.default_rng(33)
    states = ["Andhra Pradesh","Assam","Bihar","Chhattisgarh","Gujarat","Jharkhand","Karnataka","Madhya Pradesh","Maharashtra","Odisha","Rajasthan","Tamil Nadu","Telangana","Uttar Pradesh","West Bengal"]
    rows = []
    for i in range(n_districts):
        state = random.choice(states)
        district = f"{state.split()[0]}-Dist-{i%25+1:02d}"
        population = int(rng.integers(250_000, 3_500_000))
        deprivation = float(np.clip(rng.normal(55, 18), 5, 98))
        poverty = float(np.clip(0.10 + 0.007*deprivation + rng.normal(0,0.03), 0.02, 0.60))
        literacy = float(np.clip(0.92 - 0.0045*deprivation + rng.normal(0,0.05), 0.40, 0.97))
        urban = float(np.clip(rng.normal(0.35 - 0.002*deprivation, 0.12), 0.05, 0.90))
        coverage_target = float(np.clip(2 + 0.10*deprivation + rng.normal(0, 0.8), 0, 140))
        actual = float(np.clip(coverage_target * np.clip(rng.normal(0.88, 0.15), 0.2, 1.4), 0, 160))
        underserved = int((deprivation > 70) and (rng.uniform() < 0.15))
        if underserved:
            actual *= 0.5
        urban_anom = int((deprivation < 40) and (rng.uniform() < 0.06))
        spend_pc = float(np.clip(28 + 1.2*deprivation + rng.normal(0,10), 8, 320))
        if urban_anom:
            spend_pc *= 1.7
        need_decile = int(np.ceil(np.interp(deprivation, [0,100],[1,10])))
        gap = round(coverage_target - actual, 1)
        rows.append({
            "state": state,"district": district,"population": population,
            "deprivation_score": round(deprivation,1),"need_decile": need_decile,
            "poverty_rate": round(poverty,3),"literacy_rate": round(literacy,3),"urbanization_rate": round(urban,3),
            "coverage_target_per_1k": round(coverage_target,1),"coverage_actual_per_1k": round(actual,1),
            "coverage_gap_per_1k": gap,"spend_per_capita_inr": round(spend_pc,1),
            "underserved_pocket": underserved,"urban_spend_anomaly": urban_anom
        })
    return pd.DataFrame(rows)

if __name__ == "__main__":
    df = generate()
    df.to_csv("geo_need_coverage.csv", index=False)
    print("geo_need_coverage.csv")
