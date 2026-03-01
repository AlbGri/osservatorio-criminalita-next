"""Genera JSON per la sezione Persone Denunciate dal dataset DCCV_AUTVITTPS.

Input: data/raw/autvittps/autvittps_7.csv (OFFEND) e autvittps_8.csv (VICTIM)
Output:
  - public/data/autori_vittime_trend.json   (trend Italia, solo OFFEND con TOT)
  - public/data/autori_vittime_reati.json   (per reato, Italia, 2022, OFFEND+VICTIM)
  - public/data/autori_vittime_province.json (per provincia, 2022, OFFEND+VICTIM)

Uso: conda activate osservatorio && python scripts/generate_autori_vittime.py

Mappatura codici CP verificata su brocardi.it (fonte ufficiale codice penale):
  CP572    -> art. 572 c.p.     -> Maltrattamenti contro familiari o conviventi
  CP612BIS -> art. 612-bis c.p. -> Atti persecutori (= STALK, dal 2022 con breakdown completo)
  CP612TER -> art. 612-ter c.p. -> Diffusione illecita di immagini o video sessualmente espliciti
"""

import json
import logging
from pathlib import Path

import pandas as pd

log = logging.getLogger(__name__)

# Anno di riferimento (ultimo con TOT per OFFEND)
ANNO_REF = 2022

# ---------------------------------------------------------------------------
# Mappatura codici reato -> label italiane
# I codici senza prefisso sono abbreviazioni ISTAT standard.
# I codici CP*** fanno riferimento ad articoli del codice penale (verificati
# su brocardi.it). STALK e CP612BIS si sovrappongono: STALK copre 2007-2024
# con breakdown limitato, CP612BIS copre 2022+ con breakdown completo.
# ---------------------------------------------------------------------------
CRIME_NAMES = {
    "TOT": "Totale",
    # Omicidi
    "INTENHOM": "Omicidi volontari consumati",
    "ATTEMPHOM": "Tentati omicidi",
    "MANSHOM": "Omicidi preterintenzionali",
    "INFANTHOM": "Infanticidi",
    "MAFIAHOM": "Omicidi di tipo mafioso",
    "TERRORHOM": "Omicidi per terrorismo",
    "MASSMURD": "Stragi",
    "ROBBHOM": "Omicidi a scopo di rapina",
    "ROADHOM": "Omicidi stradali",
    "UNINTHOM": "Omicidi colposi",
    # Violenza contro la persona
    "CULPINJU": "Lesioni dolose",
    "BLOWS": "Percosse",
    "MENACE": "Minacce",
    "STALK": "Atti persecutori (stalking)",
    # Reati sessuali e contro minori
    "RAPE": "Violenze sessuali",
    "RAPEUN18": "Atti sessuali con minorenne",
    "CORRUPUN18": "Corruzione di minorenne",
    "PORNO": "Pornografia minorile",
    "CP572": "Maltrattamenti in famiglia",
    "CP612BIS": "Atti persecutori",
    "CP612TER": "Diffusione illecita immagini sessuali",
    "PROSTI": "Sfruttamento della prostituzione",
    # Sequestri e rapine
    "KIDNAPP": "Sequestri di persona",
    "ROBBER": "Rapine",
    "BANKROB": "Rapine in banca",
    "POSTROB": "Rapine in ufficio postale",
    "HOUSEROB": "Rapine in abitazione",
    "SHOPROB": "Rapine in esercizi commerciali",
    "STREETROB": "Rapine in pubblica via",
    # Estorsione e usura
    "EXTORT": "Estorsioni",
    "USURY": "Usura",
    # Furti
    "THEFT": "Furti",
    "PICKTHEF": "Borseggi",
    "SHOPTHEF": "Furti in esercizi commerciali",
    "BAGTHEF": "Furti con destrezza",
    "BURGTHEF": "Furti con scasso",
    "VEHITHEF": "Furti di autoveicoli",
    "CARTHEF": "Furti di autovetture",
    "MOPETHEF": "Furti di ciclomotori",
    "MOTORTHEF": "Furti di motocicli",
    "TRUCKTHEF": "Furti di autocarri",
    "ARTTHEF": "Furti di opere d'arte",
    # Ricettazione e danni
    "RECEIV": "Ricettazione",
    "DAMAGE": "Danneggiamenti",
    "DAMARS": "Incendi dolosi",
    "ARSON": "Incendi",
    # Frodi e informatica
    "SWINCYB": "Truffe e frodi informatiche",
    "CYBERCRIM": "Delitti informatici",
    "INTPROP": "Violazioni proprieta' intellettuale",
    "COUNTER": "Contraffazione",
    # Criminalita' organizzata e altro
    "SMUGGL": "Contrabbando",
    "DRUG": "Stupefacenti",
    "MONEYLAU": "Riciclaggio",
    "CRIMASS": "Associazione per delinquere",
    "MAFIASS": "Associazione di tipo mafioso",
    "FOREARS": "Porto abusivo di armi",
    "ATTACK": "Attentati",
    "OFFENCE": "Resistenza a pubblico ufficiale",
}

# Ripartizioni geografiche
RIPARTIZIONI = {
    "IT": "Italia",
    "ITC": "Nord-ovest",
    "ITD": "Nord-est",
    "ITE": "Centro",
    "ITF": "Sud",
    "ITG": "Isole",
}

# Regioni (NUTS2)
REGIONI = {
    "ITC1": "Piemonte",
    "ITC2": "Valle d'Aosta",
    "ITC3": "Liguria",
    "ITC4": "Lombardia",
    "ITD1": "Provincia Autonoma Bolzano",
    "ITD2": "Provincia Autonoma Trento",
    "ITD3": "Veneto",
    "ITD4": "Friuli-Venezia Giulia",
    "ITD5": "Emilia-Romagna",
    "ITE1": "Toscana",
    "ITE2": "Umbria",
    "ITE3": "Marche",
    "ITE4": "Lazio",
    "ITF1": "Abruzzo",
    "ITF2": "Molise",
    "ITF3": "Campania",
    "ITF4": "Puglia",
    "ITF5": "Basilicata",
    "ITF6": "Calabria",
    "ITG1": "Sicilia",
    "ITG2": "Sardegna",
}

# Province speciali (nuove province non nel sistema NUTS3 standard)
# Codici ISTAT: 108=MB, 109=FM, 110=BT (create 2009, fuori dalla codifica NUTS3)
PROVINCE_SPECIALI = {
    "IT108": ("Monza e della Brianza", "Lombardia"),
    "IT109": ("Fermo", "Marche"),
    "IT110": ("Barletta-Andria-Trani", "Puglia"),
}


def load_territory_names(project_root: Path) -> dict[str, str]:
    """Costruisce mapping REF_AREA -> nome territorio da CSV processati."""
    names = {}
    names.update(RIPARTIZIONI)
    names.update(REGIONI)
    for code, (nome, _) in PROVINCE_SPECIALI.items():
        names[code] = nome

    # Province dai CSV processati (fonte autorevole per i nomi)
    prov_csv = project_root / "data" / "processed" / "delitti_province_normalizzato_2014_2023.csv"
    if prov_csv.exists():
        df = pd.read_csv(prov_csv, dtype={"REF_AREA": str}, usecols=["REF_AREA", "Territorio"])
        for _, row in df.drop_duplicates("REF_AREA").iterrows():
            names[row["REF_AREA"]] = row["Territorio"]

    return names


def get_region_name(ref_area: str) -> str:
    """Dato un codice NUTS3 provincia, restituisce il nome della regione."""
    if ref_area in PROVINCE_SPECIALI:
        return PROVINCE_SPECIALI[ref_area][1]
    # NUTS3: primi 4 caratteri = NUTS2 regione
    region_code = ref_area[:4] if len(ref_area) >= 5 else ref_area
    return REGIONI.get(region_code, region_code)


def is_province(ref_area: str) -> bool:
    """True se il codice e' una provincia (NUTS3 o codice speciale)."""
    if ref_area in PROVINCE_SPECIALI:
        return True
    # NUTS3 standard: 5+ caratteri (es. ITC11)
    # ITD1 e ITD2 sono regioni/province autonome: li trattiamo come regioni
    return len(ref_area) >= 5


def load_data(project_root: Path) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Carica DF_7 (OFFEND) e DF_8 (VICTIM)."""
    raw_dir = project_root / "data" / "raw" / "autvittps"
    cols = ["REF_AREA", "DATA_TYPE", "TYPE_CRIME", "SEX", "AGE",
            "CITIZENSHIP", "TIME_PERIOD", "OBS_VALUE"]

    log.info("Lettura autvittps_7.csv (OFFEND)...")
    df7 = pd.read_csv(
        raw_dir / "autvittps_7.csv", sep=";", usecols=cols,
        dtype={"REF_AREA": str, "SEX": str, "OBS_VALUE": float},
    )

    log.info("Lettura autvittps_8.csv (VICTIM)...")
    df8 = pd.read_csv(
        raw_dir / "autvittps_8.csv", sep=";", usecols=cols,
        dtype={"REF_AREA": str, "SEX": str, "OBS_VALUE": float},
    )

    log.info("  OFFEND: %d righe, VICTIM: %d righe", len(df7), len(df8))
    return df7, df8


def extract_metrics(df: pd.DataFrame) -> dict:
    """Da un subset filtrato per anno+reato+territorio, estrae totale/stranieri/minori.

    Gestisce due strutture dati ISTAT:
    - 2022+: matrice completa (SEX=9, AGE=TOTAL/Y_UN17, CITIZENSHIP=TOTAL/FRG/ITL)
    - 2007-2021: matrice parziale (SEX=9 ha solo CITIZENSHIP=FRG/ITL, non TOTAL;
      AGE=Y_UN17 non disponibile per tutti i reati)

    Verifica 2022: FRG(270567) + ITL(548265) = TOTAL(818832) -> FRG+ITL e' affidabile.
    """
    sex9 = df[df["SEX"] == "9"]

    # Totale: preferisci CITIZENSHIP=TOTAL, fallback su FRG+ITL
    totale_direct = sex9[
        (sex9["AGE"] == "TOTAL") & (sex9["CITIZENSHIP"] == "TOTAL")
    ]["OBS_VALUE"].sum()

    if totale_direct > 0:
        totale = totale_direct
    else:
        # Fallback: somma italiani + stranieri
        italiani = sex9[
            (sex9["AGE"] == "TOTAL") & (sex9["CITIZENSHIP"] == "ITL")
        ]["OBS_VALUE"].sum()
        stranieri_val = sex9[
            (sex9["AGE"] == "TOTAL") & (sex9["CITIZENSHIP"] == "FRG")
        ]["OBS_VALUE"].sum()
        totale = italiani + stranieri_val

    stranieri = sex9[
        (sex9["AGE"] == "TOTAL") & (sex9["CITIZENSHIP"] == "FRG")
    ]["OBS_VALUE"].sum()

    # Minori: potrebbe non esistere per tutti gli anni/reati
    minori_direct = sex9[
        (sex9["AGE"] == "Y_UN17") & (sex9["CITIZENSHIP"] == "TOTAL")
    ]["OBS_VALUE"].sum()

    if minori_direct > 0:
        minori = minori_direct
    else:
        # Fallback: somma minori FRG + ITL
        minori_frg = sex9[
            (sex9["AGE"] == "Y_UN17") & (sex9["CITIZENSHIP"] == "FRG")
        ]["OBS_VALUE"].sum()
        minori_itl = sex9[
            (sex9["AGE"] == "Y_UN17") & (sex9["CITIZENSHIP"] == "ITL")
        ]["OBS_VALUE"].sum()
        minori = minori_frg + minori_itl  # 0 se nessuna delle due esiste

    result = {
        "totale": int(totale),
        "stranieri": int(stranieri),
        "minori": int(minori),
        "pct_stranieri": round(stranieri / totale * 100, 1) if totale > 0 else 0,
    }
    # pct_minori solo se il dato minori e' disponibile
    if minori > 0:
        result["pct_minori"] = round(minori / totale * 100, 1) if totale > 0 else 0
    else:
        result["pct_minori"] = None

    return result


def generate_trend(df_offend: pd.DataFrame, out_dir: Path) -> None:
    """Genera autori_vittime_trend.json: serie storica Italia TOT (solo OFFEND)."""
    mask = (
        (df_offend["REF_AREA"] == "IT")
        & (df_offend["TYPE_CRIME"] == "TOT")
    )
    df = df_offend[mask].copy()

    records = []
    for anno in sorted(df["TIME_PERIOD"].unique()):
        year_data = df[df["TIME_PERIOD"] == anno]
        metrics = extract_metrics(year_data)
        records.append({"anno": int(anno), **metrics})

    out_path = out_dir / "autori_vittime_trend.json"
    out_path.write_text(json.dumps(records, ensure_ascii=False), encoding="utf-8")
    size_kb = out_path.stat().st_size / 1024
    log.info("OK  %-45s (%d anni, %.1f KB)", out_path.name, len(records), size_kb)


def generate_reati(
    df_offend: pd.DataFrame,
    df_victim: pd.DataFrame,
    out_dir: Path,
) -> None:
    """Genera autori_vittime_reati.json: breakdown per reato, Italia, anno ANNO_REF."""
    records = []

    for data_type, df in [("OFFEND", df_offend), ("VICTIM", df_victim)]:
        mask = (
            (df["REF_AREA"] == "IT")
            & (df["TIME_PERIOD"] == ANNO_REF)
            & (df["TYPE_CRIME"] != "TOT")
        )
        df_year = df[mask]

        for crime_code in sorted(df_year["TYPE_CRIME"].unique()):
            crime_data = df_year[df_year["TYPE_CRIME"] == crime_code]
            metrics = extract_metrics(crime_data)

            if metrics["totale"] == 0:
                continue

            records.append({
                "data_type": data_type,
                "codice_reato": crime_code,
                "reato": CRIME_NAMES.get(crime_code, crime_code),
                **metrics,
            })

    out_path = out_dir / "autori_vittime_reati.json"
    out_path.write_text(json.dumps(records, ensure_ascii=False), encoding="utf-8")
    size_kb = out_path.stat().st_size / 1024
    n_offend = sum(1 for r in records if r["data_type"] == "OFFEND")
    n_victim = sum(1 for r in records if r["data_type"] == "VICTIM")
    log.info("OK  %-45s (%d OFFEND + %d VICTIM, %.1f KB)",
             out_path.name, n_offend, n_victim, size_kb)


def generate_province(
    df_offend: pd.DataFrame,
    df_victim: pd.DataFrame,
    territory_names: dict[str, str],
    out_dir: Path,
) -> None:
    """Genera autori_vittime_province.json: dati provinciali anno ANNO_REF."""
    records = []

    for data_type, df in [("OFFEND", df_offend), ("VICTIM", df_victim)]:
        mask = (
            (df["TIME_PERIOD"] == ANNO_REF)
            & df["REF_AREA"].apply(is_province)
        )
        df_prov = df[mask]

        for (ref_area, crime_code), group in df_prov.groupby(["REF_AREA", "TYPE_CRIME"]):
            metrics = extract_metrics(group)

            if metrics["totale"] == 0:
                continue

            records.append({
                "data_type": data_type,
                "ref_area": ref_area,
                "provincia": territory_names.get(ref_area, ref_area),
                "regione": get_region_name(ref_area),
                "codice_reato": crime_code,
                "reato": CRIME_NAMES.get(crime_code, crime_code),
                **metrics,
            })

    out_path = out_dir / "autori_vittime_province.json"
    out_path.write_text(json.dumps(records, ensure_ascii=False), encoding="utf-8")
    size_kb = out_path.stat().st_size / 1024
    n_province = len({r["ref_area"] for r in records})
    n_offend = sum(1 for r in records if r["data_type"] == "OFFEND")
    n_victim = sum(1 for r in records if r["data_type"] == "VICTIM")
    log.info("OK  %-45s (%d province, %d OFFEND + %d VICTIM, %.1f KB)",
             out_path.name, n_province, n_offend, n_victim, size_kb)


def main() -> None:
    logging.basicConfig(level=logging.INFO, format="%(message)s")
    project_root = Path(__file__).resolve().parent.parent
    out_dir = project_root / "public" / "data"
    out_dir.mkdir(parents=True, exist_ok=True)

    territory_names = load_territory_names(project_root)
    log.info("Territori mappati: %d", len(territory_names))

    df_offend, df_victim = load_data(project_root)

    generate_trend(df_offend, out_dir)
    generate_reati(df_offend, df_victim, out_dir)
    generate_province(df_offend, df_victim, territory_names, out_dir)

    log.info("\nCompletato.")


if __name__ == "__main__":
    main()
