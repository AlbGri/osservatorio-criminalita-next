"use client";

import dynamic from "next/dynamic";
import { COLORS, CHART_HEIGHT_SMALL, PLOTLY_CONFIG } from "@/lib/config";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChartFullscreenWrapper } from "@/components/charts/chart-fullscreen-wrapper";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const URL_REATI_2023 =
  "https://www.istat.it/comunicato-stampa/reati-contro-la-persona-e-contro-la-proprieta-vittime-ed-eventi-2022-2023/";
const URL_REPORT_2025 =
  "https://www.istat.it/wp-content/uploads/2025/06/Report_REATI-CONTRO-LA-PERSONA-E-LA-PROPRIETA_VITTIME-ED-EVENTI.pdf";
const URL_VIOLENZA_2025 =
  "https://www.istat.it/comunicato-stampa/la-violenza-contro-le-donne-dentro-e-fuori-la-famiglia-primi-risultati-anno-2025/";
const URL_REPORT_2019 =
  "https://www.istat.it/it/files/2019/02/Reati-contro-la-persona-e-contro-la-proprieta.pdf";

const categorie = [
  "Violenza da partner",
  "Frodi/truffe",
  "Aggressioni",
  "Scippi",
  "Furti auto/moto",
];
const pctDenunciati = [11, 24, 41, 68, 95];
const pctNonDenunciati = [89, 76, 59, 32, 5];

const catConfronto = ["Frodi/truffe", "Aggressioni", "Scippi"];
const pct2016 = [18.4, 19.9, 88.9];
const pct2023 = [24.1, 40.6, 68.2];

// Propensione denuncia per macroarea - ISTAT Tavola 6 (2022-2023)
const macroaree = ["Nord-ovest", "Nord-est", "Centro", "Sud", "Isole"];
const macroCat2023 = {
  "Reati proprieta individuale": [45.5, 34.0, 44.6, 52.6, 34.6],
  "Reati violenti": [37.3, 10.4, 65.2, 58.6, 13.0],
  "Reati abitazione": [59.7, 67.3, 48.8, 48.1, 33.9],
  "Reati veicoli": [40.1, 31.8, 43.2, 50.6, 43.4],
};
const mediaNazionale2023: Record<string, number> = {
  "Reati proprieta individuale": 44.7,
  "Reati violenti": 41.6,
  "Reati abitazione": 55.3,
  "Reati veicoli": 41.3,
};
const coloriMacro = ["#2E86AB", "#E63946", "#ff7f0e", "#9467bd"];

// Confronto storico per macroarea - singoli reati comparabili
// 2015-2016: Prospetto 6 report ISTAT 1 feb 2019
// 2022-2023: Tavola 6 report ISTAT 9 giu 2025
const reatiStorico = ["Scippi", "Rapine", "Aggressioni", "Furti abitazione"];
const storico2016: Record<string, number[]> = {
  "Scippi": [71.7, 64.4, 51.1, 46.9, 8.5],
  "Rapine": [59.9, 52.0, 32.1, 40.0, 22.5],
  "Aggressioni": [14.3, 26.2, 17.0, 9.2, 41.9],
  "Furti abitazione": [73.1, 63.3, 51.3, 54.9, 64.0],
};
const storico2023: Record<string, number[]> = {
  "Scippi": [33.9, 39.2, 63.0, 54.2, 52.9],
  "Rapine": [23.5, 23.5, 57.0, 74.7, 42.9],
  "Aggressioni": [42.3, 10.4, 69.0, 55.3, 11.1],
  "Furti abitazione": [63.5, 79.3, 61.0, 68.9, 38.5],
};

export function ChartNumeroOscuro() {
  return (
    <div className="space-y-6">
      <Alert>
        <AlertDescription className="block">
          <strong>Il numero oscuro</strong> e la differenza tra reati commessi e
          reati denunciati. L&apos;Indagine ISTAT sulla Sicurezza dei Cittadini
          stima la quota di vittime che denuncia, permettendo di misurare quanto
          le statistiche ufficiali sottostimino la realta.
        </AlertDescription>
      </Alert>

      <ChartFullscreenWrapper>
        <Plot
          data={[
            {
              name: "Denunciati (dati visibili)",
              y: categorie,
              x: pctDenunciati,
              orientation: "h" as const,
              type: "bar",
              marker: { color: COLORS.primary },
              text: pctDenunciati.map((v) => `${v}%`),
              textposition: "inside" as const,
            },
            {
              name: "Non denunciati (numero oscuro)",
              y: categorie,
              x: pctNonDenunciati,
              orientation: "h" as const,
              type: "bar",
              marker: { color: "#d3d3d3" },
              text: pctNonDenunciati.map((v) => `${v}%`),
              textposition: "inside" as const,
            },
          ]}
          layout={{
            barmode: "stack",
            xaxis: { title: { text: "Percentuale (%)" }, range: [0, 100] },
            height: CHART_HEIGHT_SMALL,
            legend: { orientation: "h" as const, y: -0.22 },
            margin: { t: 20, l: 150, r: 20, b: 60 },
            dragmode: false,
            plot_bgcolor: "white",
            paper_bgcolor: "white",
          }}
          config={PLOTLY_CONFIG}
          useResizeHandler
          className="w-full"
        />
      </ChartFullscreenWrapper>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">
          Come cambia la propensione alla denuncia nel tempo
        </h3>
        <p className="text-muted-foreground">
          Confronto tra le due edizioni dell&apos;indagine ISTAT per i reati
          comparabili.
        </p>
      </div>

      <ChartFullscreenWrapper>
        <Plot
          data={[
            {
              name: "2015-2016",
              x: catConfronto,
              y: pct2016,
              type: "bar",
              marker: { color: "#b0c4de" },
              text: pct2016.map((v) => `${v}%`),
              textposition: "outside" as const,
            },
            {
              name: "2022-2023",
              x: catConfronto,
              y: pct2023,
              type: "bar",
              marker: { color: COLORS.primary },
              text: pct2023.map((v) => `${v}%`),
              textposition: "outside" as const,
            },
          ]}
          layout={{
            barmode: "group",
            yaxis: {
              title: { text: "% vittime che hanno denunciato" },
              range: [0, 100],
            },
            height: 350,
            legend: { orientation: "h" as const, y: -0.22 },
            margin: { t: 20, l: 50, r: 20, b: 60 },
            dragmode: false,
            plot_bgcolor: "white",
            paper_bgcolor: "white",
          }}
          config={PLOTLY_CONFIG}
          useResizeHandler
          className="w-full"
        />
      </ChartFullscreenWrapper>

      <p>
        Le aggressioni denunciate sono <strong>raddoppiate</strong> (da 19.9% a
        40.6%), probabilmente per maggiore fiducia nelle istituzioni e campagne
        di sensibilizzazione. Gli scippi denunciati sono invece{" "}
        <strong>calati</strong> (da 88.9% a 68.2%), forse per rassegnazione su
        reati percepiti come a basso recupero. Le frodi/truffe mostrano un{" "}
        <strong>lieve aumento</strong> (da 18.4% a 24.1%), probabilmente legato
        alla crescita delle truffe bancarie online dove c&apos;e maggiore
        consapevolezza e incentivo a denunciare.
      </p>

      <hr />

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">
          Chi denuncia di piu? La propensione per territorio (2022-2023)
        </h3>
        <p className="text-muted-foreground">
          La propensione alla denuncia varia per tipo di reato e territorio. Il
          luogo comune &quot;il Sud denuncia meno&quot; non regge all&apos;analisi
          disaggregata. La linea tratteggiata indica la media nazionale.
        </p>
      </div>

      <ChartFullscreenWrapper>
        <Plot
          data={[
            ...Object.entries(macroCat2023).map(([cat, vals], i) => ({
              name: cat,
              x: macroaree,
              y: vals,
              type: "bar" as const,
              marker: { color: coloriMacro[i] },
              text: vals.map((v) => `${v}%`),
              textposition: "outside" as const,
              textfont: { size: 10 },
            })),
          ]}
          layout={{
            barmode: "group",
            yaxis: {
              title: { text: "% vittime che hanno denunciato" },
              range: [0, 85],
            },
            height: CHART_HEIGHT_SMALL,
            legend: { orientation: "h" as const, y: -0.22 },
            margin: { t: 20, l: 50, r: 20, b: 60 },
            dragmode: false,
            plot_bgcolor: "white",
            paper_bgcolor: "white",
            shapes: Object.values(mediaNazionale2023).map((val, i) => ({
              type: "line" as const,
              xref: "paper" as const,
              yref: "y" as const,
              x0: 0,
              x1: 1,
              y0: val,
              y1: val,
              line: { color: coloriMacro[i], width: 1, dash: "dot" as const },
            })),
          }}
          config={PLOTLY_CONFIG}
          useResizeHandler
          className="w-full"
        />
      </ChartFullscreenWrapper>

      <p>
        Il <strong>Sud</strong> denuncia piu della media nazionale per reati
        contro la proprieta (52.6% vs 44.7%), reati violenti (58.6% vs 41.6%) e
        reati contro i veicoli (50.6% vs 41.3%). Sono il{" "}
        <strong>Nord-est</strong> e le <strong>Isole</strong> a denunciare meno
        per quasi tutte le categorie. Il <strong>Centro</strong> ha la
        propensione piu alta per i reati violenti (65.2%).
      </p>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">
          Come cambia la propensione per territorio nel tempo
        </h3>
        <p className="text-muted-foreground">
          Confronto tra le edizioni 2015-2016 e 2022-2023 per i reati con dati
          comparabili a livello di macroarea. I valori con asterisco (*) nel
          report ISTAT hanno errore campionario &gt;35%.
        </p>
      </div>

      {reatiStorico.map((reato) => (
        <div key={reato} className="space-y-2">
          <h4 className="text-sm font-semibold">{reato}</h4>
          <ChartFullscreenWrapper>
            <Plot
              data={[
                {
                  name: "2015-2016",
                  x: macroaree,
                  y: storico2016[reato],
                  type: "bar",
                  marker: { color: "#b0c4de" },
                  text: storico2016[reato].map((v) => `${v}%`),
                  textposition: "outside" as const,
                },
                {
                  name: "2022-2023",
                  x: macroaree,
                  y: storico2023[reato],
                  type: "bar",
                  marker: { color: COLORS.primary },
                  text: storico2023[reato].map((v) => `${v}%`),
                  textposition: "outside" as const,
                },
              ]}
              layout={{
                barmode: "group",
                yaxis: {
                  title: { text: "% denunciato" },
                  range: [0, 105],
                },
                height: 280,
                legend: { orientation: "h" as const, y: -0.28 },
                margin: { t: 10, l: 50, r: 20, b: 60 },
                dragmode: false,
                plot_bgcolor: "white",
                paper_bgcolor: "white",
              }}
              config={PLOTLY_CONFIG}
              useResizeHandler
              className="w-full"
            />
          </ChartFullscreenWrapper>
        </div>
      ))}

      <p>
        I cambiamenti piu marcati riguardano i{" "}
        <strong>reati violenti al Centro-Sud</strong>: le aggressioni denunciate
        al Sud passano da 9.2% a 55.3% (+46 punti), al Centro da 17.0% a 69.0%
        (+52 punti). Le rapine al Sud passano da 40.0% a 74.7% (+35 punti).
        Al contrario, gli scippi denunciati calano drasticamente al{" "}
        <strong>Nord-ovest</strong> (da 71.7% a 33.9%) e al{" "}
        <strong>Nord-est</strong> (da 64.4% a 39.2%).
      </p>

      <p className="text-xs text-muted-foreground">
        Fonti:{" "}
        <a
          href={URL_REPORT_2019}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          ISTAT Reati contro la persona 2015-2016 (Prospetto 6)
        </a>
        ,{" "}
        <a
          href={URL_REATI_2023}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          ISTAT Sicurezza dei Cittadini 2022-2023 (Tavola 6)
        </a>
        ,{" "}
        <a
          href={URL_REPORT_2025}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          ISTAT Report Reati 2025 (PDF)
        </a>
        ,{" "}
        <a
          href={URL_VIOLENZA_2025}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          ISTAT Violenza contro le donne 2025
        </a>
        . Violenza da partner non ha confronto storico diretto (fonte diversa).
        Furti auto/moto stabili a ~95-98% in entrambe le edizioni.
      </p>
    </div>
  );
}
