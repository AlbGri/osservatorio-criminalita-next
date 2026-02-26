# Osservatorio Criminalita

Dati e analisi sulla criminalita in Italia con fonti ufficiali ISTAT (2014-2023).

**[Vai al sito](https://albgri.github.io/osservatorio-criminalita-next/)**

![Osservatorio Criminalita](public/og-image.png)

## Contenuti

- **Dashboard** - KPI nazionali, trend delitti denunciati, percezione vs dati reali, tipologie di reato
- **Analisi Territoriale** - Mappa coropletica regioni con frecce trend, ranking regioni, tabella province con filtro, numero oscuro
- **Metodologia** - Principi metodologici e trasparenza
- **Guida alla Lettura** - Come interpretare grafici e dati
- **Limitazioni** - Cosa i dati non possono dire, bias noti
- **Dati e Codice** - Dataset, istruzioni per replicare, licenze

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS + shadcn/ui
- Plotly.js (grafici interattivi con fullscreen)
- Deploy: GitHub Pages (export statico, GitHub Actions)

## Sviluppo locale

```bash
npm install
npm run dev
```

Apri http://localhost:3000

## Dati

I dati ISTAT sono in `public/data/` come JSON, pronti per il frontend.

Per rigenerarli dai CSV del [repo Streamlit](https://github.com/AlbGri/osservatorio-criminalita-italia):

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
- **Dati ISTAT**: [CC BY 3.0 IT](https://creativecommons.org/licenses/by/3.0/it/) - elaborati da Osservatorio Criminalita
