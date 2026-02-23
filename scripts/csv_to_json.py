"""Converte i CSV processati del repo Streamlit in JSON per il frontend Next.js.

Output: public/data/ nel repo Next.js.
Uso: python scripts/csv_to_json.py [path_repo_streamlit]
"""

import argparse
import json
import logging
import shutil
from pathlib import Path

import pandas as pd

log = logging.getLogger(__name__)


# Mapping CSV -> nome output JSON + colonne float da arrotondare
CSV_CONFIG = {
    "delitti_italia_normalizzato_2014_2023.csv": {
        "output": "delitti_italia.json",
        "round": {"Tasso_per_1000": 2},
    },
    "delitti_totale_italia_2014_2023.csv": {
        "output": "delitti_totale_italia.json",
        "round": {},
    },
    "delitti_categorie_normalizzato_2014_2023.csv": {
        "output": "delitti_categorie.json",
        "round": {"Tasso_per_1000": 2},
    },
    "delitti_regioni_normalizzato_2014_2023.csv": {
        "output": "delitti_regioni.json",
        "round": {"Tasso_per_1000": 2},
    },
    "delitti_province_normalizzato_2014_2023.csv": {
        "output": "delitti_province.json",
        "round": {"Tasso_per_1000": 2},
    },
    "reati_allarme_sociale_2014_2023.csv": {
        "output": "reati_allarme_sociale.json",
        "round": {"Tasso_per_100k": 2},
    },
    "percezione_vs_dati_2014_2023.csv": {
        "output": "percezione_vs_dati.json",
        "round": {"Tasso_per_1000": 2, "Percezione_pct": 1},
    },
    "popolazione_regioni_province_2014_2023.csv": {
        "output": "popolazione.json",
        "round": {},
    },
}


def convert_csv_to_json(src_dir: Path, out_dir: Path) -> None:
    """Legge i CSV dal repo Streamlit e scrive JSON in public/data/."""
    out_dir.mkdir(parents=True, exist_ok=True)

    log.info("Sorgente:  %s", src_dir)
    log.info("Output:    %s", out_dir)

    for csv_name, config in CSV_CONFIG.items():
        csv_path = src_dir / "data" / "processed" / csv_name
        if not csv_path.exists():
            log.warning("SKIP  %s (non trovato)", csv_name)
            continue

        df = pd.read_csv(csv_path)
        for col, decimals in config["round"].items():
            if col in df.columns:
                df[col] = df[col].round(decimals)

        out_path = out_dir / config["output"]
        records = df.to_dict(orient="records")
        out_path.write_text(json.dumps(records, ensure_ascii=False), encoding="utf-8")

        size_kb = out_path.stat().st_size / 1024
        log.info("OK    %-40s (%5d record, %.1f KB)", config["output"], len(records), size_kb)

    geojson_src = src_dir / "data" / "raw" / "geojson_regioni_italia.geojson"
    geojson_dst = out_dir / "geojson_regioni_italia.geojson"
    if geojson_src.exists():
        shutil.copy2(geojson_src, geojson_dst)
        size_kb = geojson_dst.stat().st_size / 1024
        log.info("OK    %-40s (copia, %.1f KB)", "geojson_regioni_italia.geojson", size_kb)
    else:
        log.warning("SKIP  geojson_regioni_italia.geojson (non trovato)")


def main() -> None:
    logging.basicConfig(level=logging.INFO, format="%(message)s")

    parser = argparse.ArgumentParser(description="CSV -> JSON per Osservatorio Criminalita")
    parser.add_argument(
        "src",
        nargs="?",
        default="../osservatorio-criminalita-italia",
        help="Path al repo Streamlit (default: ../osservatorio-criminalita-italia)",
    )
    args = parser.parse_args()

    script_dir = Path(__file__).resolve().parent
    project_root = script_dir.parent
    src_dir = Path(args.src).resolve()
    out_dir = project_root / "public" / "data"

    convert_csv_to_json(src_dir, out_dir)


if __name__ == "__main__":
    main()
