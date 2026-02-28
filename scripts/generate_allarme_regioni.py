"""Genera JSON reati allarme sociale a livello regionale e provinciale.

Estrae i 6 reati dal CSV raw ISTAT, unisce con popolazione, calcola tasso per 100k.

Uso: python scripts/generate_allarme_regioni.py
"""

import json
import logging
from pathlib import Path

import pandas as pd

log = logging.getLogger(__name__)

CRIME_CODES = ["INTENHOM", "ATTEMPHOM", "RAPE", "RAPEUN18", "KIDNAPP", "HOUSEROB"]

# Codici NUTS regionali nel CSV raw (19 regioni + ITD1/ITD2 per Trentino)
RAW_REGION_CODES = [
    "ITC1", "ITC2", "ITC3", "ITC4",
    "ITD1", "ITD2",  # Bolzano e Trento, da sommare in ITD12
    "ITD3", "ITD4", "ITD5",
    "ITE1", "ITE2", "ITE3", "ITE4",
    "ITF1", "ITF2", "ITF3", "ITF4", "ITF5", "ITF6",
    "ITG1", "ITG2",
]

CRIME_NAMES = {
    "INTENHOM": "Omicidi volontari consumati",
    "ATTEMPHOM": "Tentati omicidi",
    "RAPE": "Violenze sessuali",
    "RAPEUN18": "Atti sessuali con minorenne",
    "KIDNAPP": "Sequestri di persona",
    "HOUSEROB": "Rapine in abitazione",
}


def generate_regioni(df_raw: pd.DataFrame, project_root: Path) -> None:
    """Genera reati_allarme_sociale_regioni.json."""
    pop_csv = project_root / "data" / "processed" / "delitti_regioni_normalizzato_2014_2023.csv"
    out_json = project_root / "public" / "data" / "reati_allarme_sociale_regioni.json"

    df = df_raw[
        (df_raw["TYPE_CRIME"].isin(CRIME_CODES))
        & (df_raw["REF_AREA"].isin(RAW_REGION_CODES))
    ].copy()

    df = df.rename(columns={"TIME_PERIOD": "Anno", "Osservazione": "Delitti"})
    df["Reato"] = df["TYPE_CRIME"].map(CRIME_NAMES)
    df["Delitti"] = pd.to_numeric(df["Delitti"], errors="coerce").fillna(0).astype(int)

    # Aggrega ITD1 + ITD2 -> ITD12 (Trentino-Alto Adige)
    mask_trentino = df["REF_AREA"].isin(["ITD1", "ITD2"])
    df_trentino = (
        df[mask_trentino]
        .groupby(["Anno", "Reato", "TYPE_CRIME"], as_index=False)["Delitti"]
        .sum()
    )
    df_trentino["REF_AREA"] = "ITD12"
    df = pd.concat([df[~mask_trentino], df_trentino], ignore_index=True)
    df = df[["REF_AREA", "Anno", "Reato", "Delitti"]]

    df_pop = pd.read_csv(pop_csv, dtype={"REF_AREA": str})
    pop_lookup = df_pop[["REF_AREA", "Territorio", "Anno", "Popolazione"]].drop_duplicates()
    df = df.merge(pop_lookup, on=["REF_AREA", "Anno"], how="left")
    df["Tasso_per_100k"] = ((df["Delitti"] / df["Popolazione"]) * 100_000).round(2)
    df = df.sort_values(["Reato", "Territorio", "Anno"]).reset_index(drop=True)
    df = df[["REF_AREA", "Territorio", "Anno", "Reato", "Delitti", "Popolazione", "Tasso_per_100k"]]

    records = df.to_dict(orient="records")
    out_json.write_text(json.dumps(records, ensure_ascii=False), encoding="utf-8")
    size_kb = out_json.stat().st_size / 1024
    log.info("OK    %-40s (%d record, %.1f KB) - %d regioni, %d reati, %d anni",
             out_json.name, len(records), size_kb,
             df["Territorio"].nunique(), df["Reato"].nunique(), df["Anno"].nunique())

    missing = df["Popolazione"].isna().sum()
    if missing > 0:
        log.warning("ATTENZIONE regioni: %d record senza popolazione!", missing)


def generate_province(df_raw: pd.DataFrame, project_root: Path) -> None:
    """Genera reati_allarme_sociale_province.json."""
    pop_csv = project_root / "data" / "processed" / "delitti_province_normalizzato_2014_2023.csv"
    out_json = project_root / "public" / "data" / "reati_allarme_sociale_province.json"

    # Codici provinciali: tutti i REF_AREA nel CSV province processato
    df_pop = pd.read_csv(pop_csv, dtype={"REF_AREA": str})
    province_codes = set(df_pop["REF_AREA"].unique())

    df = df_raw[
        (df_raw["TYPE_CRIME"].isin(CRIME_CODES))
        & (df_raw["REF_AREA"].isin(province_codes))
    ].copy()

    log.info("Record filtrati (reati x province raw): %d", len(df))

    df = df.rename(columns={"TIME_PERIOD": "Anno", "Osservazione": "Delitti"})
    df["Reato"] = df["TYPE_CRIME"].map(CRIME_NAMES)
    df["Delitti"] = pd.to_numeric(df["Delitti"], errors="coerce").fillna(0).astype(int)
    df = df[["REF_AREA", "Anno", "Reato", "Delitti"]]

    # Join con popolazione (include Territorio e Regione)
    pop_lookup = df_pop[["REF_AREA", "Territorio", "Regione", "Anno", "Popolazione"]].drop_duplicates()
    df = df.merge(pop_lookup, on=["REF_AREA", "Anno"], how="left")
    df["Tasso_per_100k"] = ((df["Delitti"] / df["Popolazione"]) * 100_000).round(2)
    df = df.sort_values(["Reato", "Regione", "Territorio", "Anno"]).reset_index(drop=True)
    df = df[["REF_AREA", "Territorio", "Anno", "Reato", "Delitti", "Regione", "Popolazione", "Tasso_per_100k"]]

    records = df.to_dict(orient="records")
    out_json.write_text(json.dumps(records, ensure_ascii=False), encoding="utf-8")
    size_kb = out_json.stat().st_size / 1024
    log.info("OK    %-40s (%d record, %.1f KB) - %d province, %d reati, %d anni",
             out_json.name, len(records), size_kb,
             df["Territorio"].nunique(), df["Reato"].nunique(), df["Anno"].nunique())

    missing = df["Popolazione"].isna().sum()
    if missing > 0:
        log.warning("ATTENZIONE province: %d record senza popolazione!", missing)


def main() -> None:
    logging.basicConfig(level=logging.INFO, format="%(message)s")
    project_root = Path(__file__).resolve().parent.parent
    raw_csv = project_root / "data" / "raw" / "delitti_2014_2023_istat.csv"

    log.info("Lettura %s", raw_csv)
    df_raw = pd.read_csv(
        raw_csv, sep=";", dtype={"REF_AREA": str, "TIME_PERIOD": int}, low_memory=False,
    )

    generate_regioni(df_raw, project_root)
    generate_province(df_raw, project_root)


if __name__ == "__main__":
    main()
