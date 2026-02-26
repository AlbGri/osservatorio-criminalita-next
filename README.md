# Osservatorio Criminalita Italia

Dati e analisi sulla criminalita in Italia con fonti ufficiali ISTAT (2014-2023).

**[Vai al sito](https://albgri.github.io/osservatorio-criminalita-next/)**

## Contenuti

- **Dashboard** - Trend nazionale delitti denunciati, percezione vs dati, tipologie di reato
- **Analisi Territoriale** - Mappa coropletica regioni, tabella province, numero oscuro
- **Metodologia** - Principi metodologici e trasparenza
- **Guida alla Lettura** - Come interpretare grafici e dati
- **Limitazioni** - Cosa i dati non possono dire, bias noti
- **Dati e Codice** - Dataset, istruzioni per replicare, licenze

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS + shadcn/ui
- Plotly.js
- Deploy: GitHub Pages (export statico, GitHub Actions)

## Sviluppo locale

```bash
npm install
npm run dev
```

Apri http://localhost:3000

## Dati

I dati ISTAT sono inclusi nel repository:

- `data/raw/` - Dataset originali scaricati da ISTAT
- `data/processed/` - CSV elaborati (normalizzati per popolazione)
- `public/data/` - JSON per il frontend (generati da `scripts/csv_to_json.py`)

Per rigenerare i JSON dai CSV:

```bash
python scripts/csv_to_json.py
```

## Build

```bash
npm run build
```

Genera il sito statico nella cartella `out/`.

## Licenze

- **Codice**: [AGPL-3.0](LICENSE)
- **Documentazione e testi**: [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/)
- **Dati ISTAT**: [CC BY 3.0 IT](https://creativecommons.org/licenses/by/3.0/it/) - elaborati da Osservatorio Criminalita Italia
