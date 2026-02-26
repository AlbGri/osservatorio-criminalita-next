export default function DatiECodice() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-4 sm:py-8 space-y-8">
      <h1 className="text-2xl sm:text-4xl font-bold">
        Dati e Codice Sorgente
      </h1>

      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-semibold">Repository</h2>
        <p>
          Tutto il codice sorgente, i dati elaborati e la documentazione sono
          disponibili su GitHub:{" "}
          <a
            href="https://github.com/AlbGri/osservatorio-criminalita-next"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:no-underline"
          >
            github.com/AlbGri/osservatorio-criminalita-next
          </a>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Replicare l&apos;analisi in locale
        </h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
          <code>{`git clone https://github.com/AlbGri/osservatorio-criminalita-next.git
cd osservatorio-criminalita-next
npm install
npm run dev`}</code>
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Dataset utilizzati
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 font-semibold">File</th>
                <th className="text-left py-2 pr-4 font-semibold">
                  Descrizione
                </th>
                <th className="text-left py-2 font-semibold hidden sm:table-cell">Righe</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs break-all">
                  delitti_italia_normalizzato_2014_2023.csv
                </td>
                <td className="py-2 pr-4">
                  Totale delitti, tasso per 1.000 ab.
                </td>
                <td className="py-2 hidden sm:table-cell">10</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs break-all">
                  percezione_vs_dati_2014_2023.csv
                </td>
                <td className="py-2 pr-4">
                  Percezione + tasso + popolazione
                </td>
                <td className="py-2 hidden sm:table-cell">10</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs break-all">
                  delitti_categorie_normalizzato_2014_2023.csv
                </td>
                <td className="py-2 pr-4">
                  6 macro-categorie, tasso per 1.000 ab.
                </td>
                <td className="py-2 hidden sm:table-cell">60</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs break-all">
                  reati_allarme_sociale_2014_2023.csv
                </td>
                <td className="py-2 pr-4">
                  6 reati specifici, tasso per 100k ab.
                </td>
                <td className="py-2 hidden sm:table-cell">60</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs break-all">
                  delitti_regioni_normalizzato_2014_2023.csv
                </td>
                <td className="py-2 pr-4">
                  20 regioni, tasso per 1.000 ab.
                </td>
                <td className="py-2 hidden sm:table-cell">200</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs break-all">
                  delitti_province_normalizzato_2014_2023.csv
                </td>
                <td className="py-2 pr-4">
                  106 province, tasso per 1.000 ab.
                </td>
                <td className="py-2 hidden sm:table-cell">1060</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          I dataset processati sono nella cartella{" "}
          <code className="bg-muted px-1 rounded">data/processed/</code> del
          repository. Il dataset raw ISTAT (
          <code className="bg-muted px-1 rounded">
            delitti_2014_2023_istat.csv
          </code>
          , 74.236 righe, 56 tipologie) e in{" "}
          <code className="bg-muted px-1 rounded">data/raw/</code>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-semibold">Licenze</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Codice</strong>:{" "}
            <a
              href="https://www.gnu.org/licenses/agpl-3.0.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              AGPL-3.0
            </a>
          </li>
          <li>
            <strong>Documentazione e testi</strong>:{" "}
            <a
              href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              CC BY-NC-ND 4.0
            </a>
          </li>
          <li>
            <strong>Dati ISTAT</strong>:{" "}
            <a
              href="https://creativecommons.org/licenses/by/3.0/it/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              CC BY 3.0 IT
            </a>{" "}
            - elaborati da Osservatorio Criminalita
          </li>
        </ul>
      </section>
    </main>
  );
}
