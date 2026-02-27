"""Genera reati_allarme_sociale_regioni.json dal CSV raw ISTAT.

Estrae i 6 reati di allarme sociale a livello regionale,
unisce con i dati di popolazione e calcola il tasso per 100k abitanti.

Uso: python scripts/generate_allarme_regioni.py
"""

import json
import logging
from pathlib import Path

import pandas as pd

log = logging.getLogger(__name__)

# Codici TYPE_CRIME per i 6 reati di allarme sociale
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

# Mapping TYPE_CRIME -> nome italiano (coerente con reati_allarme_sociale.json)
CRIME_NAMES = {
    "INTENHOM": "Omicidi volontari consumati",
    "ATTEMPHOM": "Tentati omicidi",
    "RAPE": "Violenze sessuali",
    "RAPEUN18": "Atti sessuali con minorenne",
    "KIDNAPP": "Sequestri di persona",
    "HOUSEROB": "Rapine in abitazione",
}


def main() -> None:
    logging.basicConfig(level=logging.INFO, format="%(message)s")

    project_root = Path(__file__).resolve().parent.parent
    raw_csv = project_root / "data" / "raw" / "delitti_2014_2023_istat.csv"
    pop_csv = project_root / "data" / "processed" / "delitti_regioni_normalizzato_2014_2023.csv"
    out_json = project_root / "public" / "data" / "reati_allarme_sociale_regioni.json"

    # Leggi CSV raw ISTAT (separatore ;)
    log.info("Lettura %s", raw_csv)
    df_raw = pd.read_csv(
        raw_csv, sep=";", dtype={"REF_AREA": str, "TIME_PERIOD": int}, low_memory=False,
    )

    # Filtra: solo 6 reati allarme + solo regioni
    df = df_raw[
        (df_raw["TYPE_CRIME"].isin(CRIME_CODES))
        & (df_raw["REF_AREA"].isin(RAW_REGION_CODES))
    ].copy()

    log.info("Record filtrati (reati x regioni raw): %d", len(df))

    # Rinomina colonne
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

    # Rimuovi ITD1/ITD2 e aggiungi ITD12
    df = pd.concat([df[~mask_trentino], df_trentino], ignore_index=True)

    # Seleziona colonne utili (Territorio verra' dal pop CSV)
    df = df[["REF_AREA", "Anno", "Reato", "Delitti"]]

    # Leggi popolazione regionale (ha nomi territorio puliti)
    log.info("Lettura popolazione da %s", pop_csv)
    df_pop = pd.read_csv(pop_csv, dtype={"REF_AREA": str})
    pop_lookup = df_pop[["REF_AREA", "Territorio", "Anno", "Popolazione"]].drop_duplicates()

    # Join con popolazione (prende anche Territorio dal pop CSV)
    df = df.merge(pop_lookup, on=["REF_AREA", "Anno"], how="left")

    # Calcola tasso per 100k
    df["Tasso_per_100k"] = ((df["Delitti"] / df["Popolazione"]) * 100_000).round(2)

    # Ordina per coerenza
    df = df.sort_values(["Reato", "Territorio", "Anno"]).reset_index(drop=True)

    # Seleziona colonne finali
    df = df[["REF_AREA", "Territorio", "Anno", "Reato", "Delitti", "Popolazione", "Tasso_per_100k"]]

    # Scrivi JSON
    records = df.to_dict(orient="records")
    out_json.write_text(json.dumps(records, ensure_ascii=False), encoding="utf-8")

    size_kb = out_json.stat().st_size / 1024
    log.info("OK    %-40s (%d record, %.1f KB)", out_json.name, len(records), size_kb)

    # Verifica completezza
    n_regioni = df["Territorio"].nunique()
    n_reati = df["Reato"].nunique()
    n_anni = df["Anno"].nunique()
    log.info("Regioni: %d, Reati: %d, Anni: %d", n_regioni, n_reati, n_anni)

    missing_pop = df["Popolazione"].isna().sum()
    if missing_pop > 0:
        log.warning("ATTENZIONE: %d record senza popolazione!", missing_pop)


if __name__ == "__main__":
    main()
