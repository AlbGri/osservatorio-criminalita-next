# Osservatorio Criminalita Italia

Dati e analisi sulla criminalita in Italia con fonti ufficiali ISTAT.

Sito statico costruito con Next.js, in fase di sviluppo. Migrazione dal [progetto Streamlit](https://github.com/AlbGri/osservatorio-criminalita-italia).

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS + shadcn/ui
- Plotly.js
- Deploy: GitHub Pages (export statico)

## Sviluppo locale

```bash
npm install
npm run dev
```

Apri http://localhost:3000

## Build

```bash
npm run build
```

Genera il sito statico nella cartella `out/`.
